/**
 * Relevé quotidien des prix Awin pour scan3dlab.
 * Cron o2switch : php cron/releve-prix.php
 * Clé : variable AWIN_FEED_API_KEY, ou ../../prive/awin-product-feed.key
 * (en local : scan3dlab/prive/ ; sur le serveur : un cran au-dessus de la racine du site).
 * Amazon et le HTML des boutiques ne sont pas lus.
 */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { affidDuSite, lireRegistre, partenairesPrix } from './partenaires-md.mjs';
import {
  PARTENAIRES,
  appliquerPartenaires,
  assertAucunAmazon,
  dateParis,
  fluxDuTableau,
  integrer,
  lignesDepuisCsv,
  selectionner,
} from './regles.mjs';

const ici = path.dirname(fileURLToPath(import.meta.url));
const fichierPrix = path.join(ici, '..', 'prix-du-jour.json');
const fichierHistorique = path.join(ici, 'historique.json');
const fichierSrc = path.join(ici, '..', '..', 'src', 'data', 'promos', 'publication.json');
const COLONNES = [
  'aw_deep_link', 'product_name', 'aw_product_id', 'merchant_product_id', 'merchant_id', 'merchant_name',
  'search_price', 'currency', 'merchant_deep_link', 'in_stock', 'is_for_sale', 'product_price_old', 'rrp_price',
  'colour', 'language', 'valid_to', 'brand_name', 'ean', 'merchant_image_url', 'aw_image_url', 'aw_thumb_url',
].join(',');

function ecrire(fichier, data) {
  fs.mkdirSync(path.dirname(fichier), { recursive: true });
  const tmp = `${fichier}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2) + '\n');
  fs.renameSync(tmp, fichier);
}

function lireCle() {
  const env = (process.env.AWIN_FEED_API_KEY || '').trim();
  if (env) return env;
  const chemin = path.join(ici, '..', '..', 'prive', 'awin-product-feed.key');
  if (!fs.existsSync(chemin)) return '';
  return fs.readFileSync(chemin, 'utf8').replace(/^\uFEFF/, '').split(/\r?\n/).map((l) => l.trim()).find((l) => l && !l.startsWith('#')) || '';
}

function rediger(texte, cle) {
  return String(texte || '').replaceAll(cle, '***').replace(/apikey\/[^/\s]+/g, 'apikey/***').slice(0, 180);
}

async function lire(url, cle) {
  const u = new URL(url);
  if (u.hostname !== 'productdata.awin.com') throw new Error('hote-refuse');
  const res = await fetch(url, {
    redirect: 'manual',
    signal: AbortSignal.timeout(180000),
    headers: { 'User-Agent': 'scan3dlab-releve-prix/1 (+https://scan3dlab.com/baisses-de-prix/)', Accept: 'text/csv,application/gzip,*/*' },
  });
  if (res.status >= 300 && res.status < 400) {
    const loc = res.headers.get('location');
    if (!loc) throw new Error(`http-${res.status}`);
    const next = new URL(loc, url);
    if (next.hostname !== 'productdata.awin.com') throw new Error('redirection-refusee');
    return lire(next.toString(), cle);
  }
  if (!res.ok) throw new Error(`http-${res.status} ${rediger(await res.text(), cle)}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length > 40_000_000) throw new Error('fichier-trop-gros');
  const brut = buf.length > 2 && buf[0] === 0x1f && buf[1] === 0x8b ? zlib.gunzipSync(buf) : buf;
  if (brut.length > 80_000_000) throw new Error('fichier-trop-gros');
  return brut.toString('utf8');
}

function urlFlux(cle, feed) {
  return `https://productdata.awin.com/datafeed/download/apikey/${encodeURIComponent(cle)}/language/${feed.langue}/fid/${feed.fid}/columns/${COLONNES}/format/csv/delimiter/%2C/compression/gzip/adultcontent/0/`;
}

function urlFluxComplet(cle, feed) {
  return `https://productdata.awin.com/datafeed/download/apikey/${encodeURIComponent(cle)}/language/${feed.langue}/fid/${feed.fid}/format/csv/delimiter/%2C/compression/gzip/adultcontent/0/`;
}

async function telechargerFlux(cle, feed) {
  try {
    return await lire(urlFlux(cle, feed), cle);
  } catch (err) {
    if (String(err.message || '').startsWith('http-')) return lire(urlFluxComplet(cle, feed), cle);
    throw err;
  }
}

function historiqueLu() {
  if (!fs.existsSync(fichierHistorique)) return { maj: null, produits: {} };
  try {
    return JSON.parse(fs.readFileSync(fichierHistorique, 'utf8'));
  } catch {
    const sauve = `${fichierHistorique}.corrompu`;
    fs.renameSync(fichierHistorique, sauve);
    console.error(`historique illisible, déplacé vers ${path.basename(sauve)}`);
    return { maj: null, produits: {} };
  }
}

function chargerPartenaires() {
  const md = path.join(ici, '..', '..', 'PARTENAIRES.md');
  const json = path.join(ici, 'partenaires-actifs.json');
  if (fs.existsSync(md)) {
    const registre = lireRegistre(fs.readFileSync(md, 'utf8'));
    const affid = affidDuSite(registre);
    const prix = partenairesPrix(registre, affid);
    if (prix.length) {
      appliquerPartenaires(prix, affid);
      return;
    }
  }
  if (!fs.existsSync(json)) return;
  const data = JSON.parse(fs.readFileSync(json, 'utf8'));
  if (Array.isArray(data.prix) && data.prix.length) appliquerPartenaires(data.prix, data.affid);
}

async function main() {
  chargerPartenaires();
  const cle = lireCle();
  if (cle.length < 8) {
    console.error('Clé de flux produit Awin absente. Rien n’a été modifié.');
    process.exitCode = 1;
    return;
  }
  const listeSeule = process.argv.includes('--liste');
  const aujourdhui = dateParis();
  let texteListe = '';
  try {
    texteListe = await lire(`https://productdata.awin.com/datafeed/list/apikey/${encodeURIComponent(cle)}`, cle);
  } catch (err) {
    console.error(`Liste des flux indisponible : ${rediger(err.message, cle)}`);
    process.exitCode = 1;
    return;
  }
  const feeds = fluxDuTableau(texteListe);
  const parMid = new Map(PARTENAIRES.map((p) => [p.mid, []]));
  for (const feed of feeds) {
    const liste = parMid.get(feed.mid);
    if (liste) liste.push(feed);
  }
  for (const liste of parMid.values()) {
    const meilleur = new Map();
    for (const feed of liste) {
      const deja = meilleur.get(feed.langue || '*');
      if (!deja || feed.produits > deja.produits) meilleur.set(feed.langue || '*', feed);
    }
    liste.length = 0;
    liste.push(...meilleur.values());
  }
  if (listeSeule) {
    for (const p of PARTENAIRES) {
      const liste = parMid.get(p.mid) || [];
      console.log(`${p.nom} ${p.mid} : ${liste.length ? liste.map((f) => `${f.fid}/${f.langue}/${f.produits}`).join(', ') : 'aucun flux'}`);
    }
    return;
  }

  const partenaires = PARTENAIRES.map((p) => ({
    id: p.id, mid: p.mid, nom: p.nom, marque: p.marque, pages: p.pages,
    flux: (parMid.get(p.mid) || []).length ? 'erreur' : 'absent', lus: 0, retenus: 0,
  }));
  const etat = new Map(partenaires.map((p) => [p.mid, p]));
  let lignes = [];
  const complets = [];
  for (const p of PARTENAIRES) {
    const liste = parMid.get(p.mid) || [];
    if (!liste.length) continue;
    let ok = true;
    let lus = 0;
    const duMid = [];
    for (const feed of liste) {
      try {
        const csv = await telechargerFlux(cle, feed);
        const rows = lignesDepuisCsv(csv, p.mid, feed.langue);
        const mots = (p.exclure || []).map((mot) => String(mot).toLowerCase());
        const gardes = mots.length
          ? rows.filter((ligne) => !mots.some((mot) => String(ligne.nom || '').toLowerCase().includes(mot)))
          : rows;
        duMid.push(...gardes);
        lus += gardes.length;
      } catch (err) {
        ok = false;
        etat.get(p.mid).code = rediger(err.message, cle).slice(0, 80);
        console.error(`${p.nom} flux ${feed.fid} : ${rediger(err.message, cle)}`);
      }
    }
    etat.get(p.mid).lus = lus;
    if (ok) {
      complets.push(p.mid);
      etat.get(p.mid).flux = 'ok';
      lignes.push(...duMid);
    }
  }

  const historique = integrer(historiqueLu(), lignes, aujourdhui, complets);
  const produits = selectionner(historique, aujourdhui);
  for (const produit of produits) {
    const e = etat.get(produit.mid);
    if (e) e.retenus += 1;
  }
  const publication = {
    version: 1,
    genereLe: aujourdhui,
    amazonExclu: true,
    seuil: { ratio: 0.05, absolu: 10, ratioPlancher: 0.02, ratioMax: 0.9 },
    produits,
    partenaires,
    erreur: complets.length ? null : 'aucun-flux',
  };
  assertAucunAmazon(publication);
  ecrire(fichierHistorique, historique);
  ecrire(fichierPrix, publication);
  if (fs.existsSync(path.dirname(fichierSrc))) ecrire(fichierSrc, publication);
  console.log(`${aujourdhui} : ${lignes.length} lignes, ${produits.length} produits affichés, ${complets.length} programmes lus.`);
}

const lance = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (lance) main();
