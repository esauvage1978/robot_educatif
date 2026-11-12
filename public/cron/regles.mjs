/**
 * Règles du relevé de prix scan3dlab.
 * Source unique : flux produit Awin des programmes au statut « actif ».
 * Amazon est refusé (prix, URL, nom de marchand). Aucun prix conseillé seul.
 * Aucune lecture du HTML des boutiques.
 */
import { concerneLeSite } from './theme.mjs';

export let AWIN_AFFID = '3131609';
export const SEUIL_RATIO = 0.05;
export const SEUIL_ABSOLU = 10;
export const SEUIL_RATIO_PLANCHER = 0.02;
export const RATIO_MAX = 0.9;
export const JOURS_FRAIS = 2;
export const HISTORIQUE_JOURS = 35;
export const MAX_HISTORIQUE_MID = 20000;
export const MAX_PAR_MARCHE = { eu: 80, de: 40, us: 40 };

/** Aligné sur src/config/affiliation.ts : statut actif, plus la boutique US Anycubic. */
export const PARTENAIRES = [
  { id: 'sovol', mid: '124706', nom: 'Sovol', marque: 'sovol', pages: 'toutes' },
  { id: '3dmakerpro', mid: '48247', nom: '3DMakerpro', marque: '3dmakerpro', pages: 'toutes' },
  { id: '3dmakerpro-eu', mid: '70050', nom: '3DMakerpro EU', marque: '3dmakerpro', pages: 'toutes' },
  { id: 'elegoo', mid: '61127', nom: 'Elegoo', marque: 'elegoo', pages: 'toutes' },
  { id: 'anycubic', mid: '69360', nom: 'Anycubic', marque: 'anycubic', pages: 'toutes' },
  { id: 'anycubic-us', mid: '129417', nom: 'Anycubic US', marque: 'anycubic', pages: 'en' },
  { id: 'biqu', mid: '95665', nom: 'BIQU', marque: 'biqu', pages: 'toutes' },
  { id: 'azurefilm', mid: '106471', nom: 'AzureFilm', marque: 'azurefilm', pages: 'toutes' },
  { id: 'mintion', mid: '96873', nom: 'Mintion', marque: 'mintion', pages: 'toutes' },
  { id: 'toolchest', mid: '117285', nom: 'Toolchest.de', marque: 'toolchest', pages: 'de' },
  { id: 'longer', mid: '75738', nom: 'Longer', marque: 'longer', pages: 'toutes' },
  { id: 'layerline', mid: '127141', nom: 'Layerline', marque: 'layerline', pages: 'toutes' },
];

const MIDS = new Set(PARTENAIRES.map((p) => p.mid));
const PAR_MID = new Map(PARTENAIRES.map((p) => [p.mid, p]));

/** Remplace la liste par celle lue dans PARTENAIRES.md. Les fonctions suivantes voient la nouvelle liste. */
export function appliquerPartenaires(liste, affid) {
  if (affid) AWIN_AFFID = String(affid);
  if (!Array.isArray(liste) || !liste.length) return;
  PARTENAIRES.length = 0;
  PARTENAIRES.push(...liste);
  MIDS.clear();
  PAR_MID.clear();
  for (const p of PARTENAIRES) {
    MIDS.add(String(p.mid));
    PAR_MID.set(String(p.mid), p);
  }
}
const LOCALES = { fr: 'fr-FR', en: 'en-GB', de: 'de-DE', it: 'it-IT', es: 'es-ES', nl: 'nl-NL' };
const COULEURS = /\b(black|white|red|blue|grey|gray|green|yellow|orange|purple|pink|silver|gold|transparent|clear|natural|noir|blanc|rouge|bleu|blu|gris|vert|jaune|violet|rose|argent|schwarz|weiss|weiß|rot|blau|grau|grun|grün|gelb|lila|nero|bianco|rosso|grigio|verde|giallo|rosa|negro|blanco|azul|amarillo|morado)\b/g;

export function partenaireParMid(mid) {
  return PAR_MID.get(String(mid));
}

export function dateParis(d = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
}

export function ajouterJours(iso, n) {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export function compacter(iso) {
  return Number(iso.replace(/-/g, ''));
}

export function dateIso(compact) {
  const s = String(compact);
  return `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}`;
}

export function frais(releve, aujourdhui) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(releve || '') || !/^\d{4}-\d{2}-\d{2}$/.test(aujourdhui || '')) return false;
  const jours = (Date.parse(`${aujourdhui}T00:00:00Z`) - Date.parse(`${releve}T00:00:00Z`)) / 86400000;
  return jours >= 0 && jours <= JOURS_FRAIS;
}

export function assez(prix, reference) {
  if (typeof prix !== 'number' || typeof reference !== 'number') return false;
  if (!(reference > prix) || prix < 0.5) return false;
  const ecart = Math.round((reference - prix) * 100) / 100;
  const ratio = ecart / reference;
  if (ratio > RATIO_MAX) return false;
  return ratio >= SEUIL_RATIO || (ecart >= SEUIL_ABSOLU && ratio >= SEUIL_RATIO_PLANCHER);
}

export function estAmazon(valeur) {
  const s = String(valeur || '');
  let host = '';
  try {
    host = new URL(s).hostname;
  } catch {
    host = s;
  }
  host = host.toLowerCase().replace(/\.$/, '').replace(/^www\./, '');
  if (host === 'amazon' || host.startsWith('amazon.') || host.includes('.amazon.')) return true;
  if (host === 'amzn.to' || host.endsWith('.amzn.to') || host === 'amzn.com' || host.endsWith('.amzn.com') || host === 'amzn.eu' || host.endsWith('.amzn.eu')) return true;
  if (/\bamazon\b/i.test(s) && /\/dp\/[A-Z0-9]{10}/i.test(s)) return true;
  return false;
}

export function imageFiable(url) {
  try {
    const u = new URL(String(url || ''));
    if (u.protocol !== 'https:' || estAmazon(u.href) || u.hostname.toLowerCase().includes('amazon')) return null;
    return u.toString();
  } catch {
    return null;
  }
}

export function urlMarchande(url) {
  try {
    const u = new URL(String(url));
    if (u.protocol !== 'https:') return null;
    const host = u.hostname.toLowerCase();
    if (estAmazon(u.href)) return null;
    if (/(^|\.)awin1\.com$/.test(host) || /(^|\.)awin\.com$/.test(host)) return null;
    return u.toString();
  } catch {
    return null;
  }
}

export function hrefAwin(mid, url) {
  const propre = urlMarchande(url);
  if (!propre || !MIDS.has(String(mid))) return null;
  return `https://www.awin1.com/cread.php?awinmid=${mid}&awinaffid=${AWIN_AFFID}&ued=${encodeURIComponent(propre)}`;
}

export function hrefFiable(href) {
  try {
    const u = new URL(href);
    if (u.protocol !== 'https:' || u.hostname !== 'www.awin1.com') return false;
    if (u.searchParams.get('awinaffid') !== AWIN_AFFID) return false;
    if (!MIDS.has(u.searchParams.get('awinmid') || '')) return false;
    const dest = u.searchParams.get('ued');
    return Boolean(dest && urlMarchande(dest));
  } catch {
    return false;
  }
}

export function visibleLang(produit, lang) {
  if (produit.marche === 'de') return lang === 'de';
  if (produit.marche === 'us') return lang === 'en';
  return produit.marche === 'eu';
}

const MARQUEURS_LANGUE = {
  fr: ['aspirateur', 'laveur', 'ecouteur', 'enceinte', 'capteur', 'brosse', 'educatif', 'programmable', 'domotique'],
  de: ['bausatz', 'halterung', 'saugroboter', 'staubsauger', 'speicher', 'balkonkraftwerk', 'erweiterung', 'für', 'fuer', 'ohne', 'akku'],
  it: ['auricolare', 'auricolari', 'cuffie', 'altoparlante', 'aspirapolvere', 'lavaggio', 'bianco', 'nero', 'senza'],
  es: ['aspiradora', 'auricular', 'auriculares', 'altavoz'],
  nl: ['stofzuiger', 'zonder'],
  en: ['vacuum', 'earbuds', 'printer', 'filament'],
};

export function langueDuTexte(nom) {
  const s = String(nom || '').toLowerCase().normalize('NFD').replace(/\p{M}/gu, '');
  const scores = [];
  for (const [code, mots] of Object.entries(MARQUEURS_LANGUE)) {
    const n = mots.filter((mot) => s.includes(mot.normalize('NFD').replace(/\p{M}/gu, ''))).length;
    if (n) scores.push([code, n]);
  }
  scores.sort((a, b) => b[1] - a[1]);
  if (!scores.length || (scores[1] && scores[0][1] === scores[1][1])) return '';
  return scores[0][0];
}

export function langueDuPartenaire(marque) {
  const trouve = String(marque || '').match(/\b(FR|DE|IT|ES|NL|AT|UK|US)\b/i);
  if (!trouve) return '';
  const code = trouve[1].toUpperCase();
  if (code === 'AT' || code === 'DE') return 'de';
  if (code === 'UK' || code === 'US') return 'en';
  return code.toLowerCase();
}

export function langueDeLaPage(produit, lang) {
  const connue = ['fr', 'en', 'de', 'it', 'es', 'nl'].includes(produit?.langue) ? produit.langue : langueDuTexte(produit?.nom);
  if (!connue) return true;
  return connue === lang;
}

export function marcheDe(mid, url, devise) {
  let host = '';
  try {
    host = new URL(url).hostname.toLowerCase();
  } catch {
    host = '';
  }
  if (mid === '117285' || host === 'www.toolchest.de' || host === 'toolchest.de') return devise === 'EUR' ? 'de' : null;
  if (mid === '129417' || host === 'us.anycubic3d.com') return devise === 'USD' ? 'us' : null;
  if (devise === 'USD') return 'us';
  if (devise === 'EUR') return 'eu';
  return null;
}

export function marcheDuPartenaire(partenaire, devise, marche) {
  if (!marche) return null;
  if (partenaire?.pages === 'de' && devise === 'EUR') return 'de';
  if (partenaire?.pages === 'en' && devise === 'USD') return 'us';
  return marche;
}

export function parserPrix(valeur) {
  if (valeur == null) return null;
  let s = String(valeur).trim();
  if (!s) return null;
  const devise = (s.match(/\b(EUR|USD|GBP|CHF)\b/i) || [])[1]?.toUpperCase() || null;
  s = s.replace(/\b(EUR|USD|GBP|CHF)\b/gi, '').replace(/[€$£]/g, '').trim();
  if (!s) return null;
  if (s.includes(',') && s.includes('.')) {
    if (s.lastIndexOf(',') > s.lastIndexOf('.')) s = s.replace(/\./g, '').replace(',', '.');
    else s = s.replace(/,/g, '');
  } else if (s.includes(',')) s = s.replace(',', '.');
  const n = Number(s);
  if (!Number.isFinite(n) || n < 0.5 || n > 100000) return null;
  return { montant: Math.round(n * 100) / 100, devise };
}

export function parserCsv(texte) {
  const lignes = [];
  let row = [];
  let cur = '';
  let quote = false;
  const src = String(texte || '').replace(/^\uFEFF/, '');
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (quote) {
      if (c === '"') {
        if (src[i + 1] === '"') {
          cur += '"';
          i += 1;
        } else quote = false;
      } else cur += c;
    } else if (c === '"') quote = true;
    else if (c === ',') {
      row.push(cur);
      cur = '';
    } else if (c === '\n') {
      row.push(cur);
      lignes.push(row);
      row = [];
      cur = '';
    } else if (c !== '\r') cur += c;
  }
  if (cur.length || row.length) {
    row.push(cur);
    lignes.push(row);
  }
  return lignes.filter((r) => r.some((c) => String(c).trim() !== ''));
}

function champ(row, ...cles) {
  for (const cle of cles) {
    if (row[cle] != null && String(row[cle]).trim() !== '') return String(row[cle]).trim();
  }
  return '';
}

function dateChamp(valeur) {
  const s = String(valeur || '').trim();
  const iso = s.match(/^(\d{4}-\d{2}-\d{2})/);
  if (iso) return iso[1];
  const fr = s.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
  if (fr) return `${fr[3]}-${fr[2]}-${fr[1]}`;
  return '';
}

export function destination(row) {
  const direct = champ(row, 'merchant_deep_link', 'link', 'aw_deep_link');
  if (direct && !/awin1\.com/i.test(direct)) return urlMarchande(direct);
  const aw = champ(row, 'aw_deep_link', 'link');
  if (!aw) return null;
  try {
    const u = new URL(aw);
    if (!/(^|\.)awin1\.com$/i.test(u.hostname)) return urlMarchande(aw);
    return urlMarchande(u.searchParams.get('ued') || '');
  } catch {
    return null;
  }
}

function enStock(row) {
  const present = 'in_stock' in row || 'availability' in row;
  if (!present) return 'inconnu';
  const brut = champ(row, 'in_stock', 'availability').toLowerCase();
  if (!brut || brut === '0' || brut === 'no' || brut === 'false' || /out of stock|rupture|nicht verf|non disponib|agotad|sin stock/.test(brut)) return null;
  return '1';
}

export function normaliserLigne(row, midFeed) {
  const mid = (champ(row, 'merchant_id') || midFeed || '').replace(/\s/g, '');
  const partenaire = PAR_MID.get(mid);
  if (!partenaire) return null;
  if (/\bamazon\b/i.test(champ(row, 'merchant_name'))) return null;
  const stock = enStock(row);
  if (!stock) return null;
  if ('is_for_sale' in row) {
    const vente = champ(row, 'is_for_sale').toLowerCase();
    if (vente === '0' || vente === 'no' || vente === 'false') return null;
  }
  const fin = dateChamp(champ(row, 'valid_to'));
  if (fin && fin < dateParis()) return null;
  const url = destination(row);
  if (!url) return null;

  const search = parserPrix(champ(row, 'search_price'));
  const sale = parserPrix(champ(row, 'sale_price'));
  const price = parserPrix(champ(row, 'price'));
  const oldField = parserPrix(champ(row, 'product_price_old'));
  const rrp = parserPrix(champ(row, 'rrp_price'));
  const deviseCol = champ(row, 'currency').toUpperCase();
  let prix = null;
  let devise = '';
  let ancien = null;
  if (search) {
    prix = search.montant;
    devise = search.devise || deviseCol;
  } else if (sale) {
    prix = sale.montant;
    devise = sale.devise || price?.devise || deviseCol;
    if (price && assez(prix, price.montant)) ancien = { montant: price.montant, signal: 'sale_price' };
  } else if (price) {
    prix = price.montant;
    devise = price.devise || deviseCol;
  }
  if (prix == null) return null;
  if (!ancien && oldField && assez(prix, oldField.montant)) {
    const memeRrp = rrp && Math.abs(oldField.montant - rrp.montant) <= 0.01;
    if (!memeRrp) ancien = { montant: oldField.montant, signal: 'product_price_old' };
  }
  if (deviseCol && devise && deviseCol !== devise) return null;
  if (!devise) devise = deviseCol;
  if (devise !== 'EUR' && devise !== 'USD') return null;
  const marche = marcheDuPartenaire(partenaire, devise, marcheDe(mid, url, devise));
  if (!marche) return null;

  let id = champ(row, 'merchant_product_id', 'aw_product_id', 'id', 'ean', 'product_gtin').replace(/[^\w.:-]+/g, '').slice(0, 80);
  if (!id) return null;
  let nom = champ(row, 'product_name', 'title').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 180);
  if (nom.length < 2) return null;
  const image = imageFiable(champ(row, 'merchant_image_url', 'aw_image_url', 'aw_thumb_url'));
  const brutLangue = champ(row, 'language').trim();
  const langue = brutLangue ? langueFeed(brutLangue) : '';
  return { mid, id, nom, url, devise, marque: partenaire.marque, marche, stock, ancien, prix, image, langue };
}

export function lignesDepuisCsv(texte, midFeed, langueFlux = '') {
  const rows = parserCsv(texte);
  if (rows.length < 2) return [];
  const headers = rows[0].map((h) => h.replace(/^\uFEFF/, '').trim().toLowerCase());
  const out = [];
  for (const cells of rows.slice(1)) {
    const row = {};
    headers.forEach((h, i) => {
      row[h] = cells[i] ?? '';
    });
    const ligne = normaliserLigne(row, midFeed);
    if (!ligne) continue;
    if (!ligne.langue && langueFlux) ligne.langue = langueFlux;
    out.push(ligne);
  }
  return out;
}

function langueFeed(valeur) {
  const map = { french: 'fr', english: 'en', german: 'de', deutsch: 'de', italian: 'it', italiano: 'it', spanish: 'es', espanol: 'es', dutch: 'nl', fr: 'fr', en: 'en', de: 'de', it: 'it', es: 'es', nl: 'nl' };
  const s = String(valeur || '').trim().toLowerCase().replace('_', '-');
  if (!s) return '';
  if (map[s]) return map[s];
  return map[s.slice(0, 2)] || '';
}

function membreActif(valeur) {
  const s = String(valeur || '').trim().toLowerCase();
  if (!s) return true;
  if (/not\s|refus|declin|pending|suspend|reject/.test(s)) return false;
  return /active|join|approved|accepted/.test(s);
}

export function fluxDuTableau(texte) {
  const table = parserCsv(texte);
  if (table.length < 2) return [];
  const headers = table[0].map((h) => h.trim().toLowerCase().replace(/\s+/g, ' '));
  const idx = (pred) => headers.findIndex((h) => pred(h));
  const iAdv = idx((h) => h.includes('advertiser id') || h === 'merchant id');
  const iFeed = idx((h) => h === 'feed id' || h.includes('feed id'));
  const iLang = idx((h) => h === 'language' || h.includes('language'));
  const iMem = idx((h) => h.includes('membership'));
  const iNum = idx((h) => h.includes('no of products') || h.includes('number of products') || h === 'products');
  const iNom = idx((h) => h === 'advertiser name' || h === 'feed name');
  if (iAdv < 0 || iFeed < 0) return [];
  const feeds = [];
  for (const cells of table.slice(1)) {
    const mid = String(cells[iAdv] || '').trim();
    const fid = String(cells[iFeed] || '').trim();
    if (!MIDS.has(mid) || !/^\d+$/.test(fid)) continue;
    if (iMem >= 0 && !membreActif(cells[iMem])) continue;
    feeds.push({
      mid,
      fid,
      langue: langueFeed(iLang >= 0 ? cells[iLang] : ''),
      nom: iNom >= 0 ? String(cells[iNom] || '').trim() : '',
      produits: iNum >= 0 ? Number(String(cells[iNum] || '').replace(/[^\d]/g, '')) || 0 : 0,
    });
  }
  return feeds;
}

export function baseNom(nom) {
  const brut = nom.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const sans = brut.replace(COULEURS, ' ').replace(/\s+/g, ' ').trim();
  return sans.length < 8 ? brut : sans;
}

function prixChange(points) {
  if (!points || points.length < 2) return 0;
  return points[points.length - 1][1] === points[points.length - 2][1] ? 0 : 1;
}

export function integrer(historique, lignes, date, midsComplets) {
  const produits = { ...(historique?.produits || {}) };
  const vus = new Set();
  const min = compacter(ajouterJours(date, -HISTORIQUE_JOURS));
  const jour = compacter(date);
  for (const ligne of lignes) {
    const cle = `${ligne.mid}|${ligne.id}`;
    vus.add(cle);
    const avant = produits[cle];
    const points = (avant?.points || []).filter((p) => p[0] !== jour && p[0] >= min);
    points.push([jour, ligne.prix]);
    produits[cle] = {
      mid: ligne.mid,
      id: ligne.id,
      nom: ligne.nom,
      url: ligne.url,
      devise: ligne.devise,
      marque: ligne.marque,
      marche: ligne.marche,
      stock: ligne.stock,
      ancien: ligne.ancien,
      image: ligne.image || null,
      langue: ligne.langue || '',
      points,
    };
  }
  const complets = new Set(midsComplets);
  for (const cle of Object.keys(produits)) {
    const mid = produits[cle].mid;
    if (complets.has(mid) && !vus.has(cle)) delete produits[cle];
    else produits[cle].points = (produits[cle].points || []).filter((p) => p[0] >= min);
    if (produits[cle] && produits[cle].points.length === 0) delete produits[cle];
  }
  for (const mid of complets) {
    const cles = Object.keys(produits).filter((c) => produits[c].mid === mid);
    if (cles.length <= MAX_HISTORIQUE_MID) continue;
    cles.sort((a, b) => {
      const pa = produits[a];
      const pb = produits[b];
      return (pb.ancien ? 1 : 0) - (pa.ancien ? 1 : 0) || prixChange(pb.points) - prixChange(pa.points);
    });
    for (const cle of cles.slice(MAX_HISTORIQUE_MID)) delete produits[cle];
  }
  return { maj: date, produits };
}

export function selectionner(historique, aujourdhui) {
  const bruts = [];
  for (const p of Object.values(historique?.produits || {})) {
    const points = [...(p.points || [])].sort((a, b) => a[0] - b[0]);
    const dernier = points[points.length - 1];
    if (!dernier) continue;
    const releve = dateIso(dernier[0]);
    if (!frais(releve, aujourdhui)) continue;
    const prix = dernier[1];
    const precedent = points.length > 1 ? points[points.length - 2] : null;
    let choix = null;
    if (precedent && assez(prix, precedent[1])) {
      choix = { reference: precedent[1], signal: 'releve', dateReference: dateIso(precedent[0]), type: 'baisse-constatee' };
    } else if (p.ancien && assez(prix, p.ancien.montant)) {
      choix = { reference: p.ancien.montant, signal: p.ancien.signal, dateReference: null, type: 'origine-boutique' };
    }
    if (!choix) continue;
    const href = hrefAwin(p.mid, p.url);
    if (!hrefFiable(href)) continue;
    const ecart = Math.round((choix.reference - prix) * 100) / 100;
    bruts.push({
      id: `${p.mid}:${p.id}`,
      mid: p.mid,
      marque: p.marque,
      nom: p.nom,
      href,
      devise: p.devise,
      marche: p.marche,
      prix,
      reference: choix.reference,
      ecart,
      ratio: ecart / choix.reference,
      type: choix.type,
      signal: choix.signal,
      dateReference: choix.dateReference,
      releve,
      stock: p.stock,
      image: p.image || null,
      langue: p.langue || langueDuTexte(p.nom) || langueDuPartenaire(p.marque),
      base: baseNom(p.nom),
    });
  }
  const groupes = new Map();
  for (const item of bruts) {
    const cle = [item.mid, item.devise, item.signal, item.prix, item.reference, item.base].join('|');
    const deja = groupes.get(cle);
    if (!deja) groupes.set(cle, { ...item, variantes: 1 });
    else {
      deja.variantes += 1;
      if (item.nom.length > deja.nom.length && item.langue) deja.langue = item.langue;
      if (item.nom.length < deja.nom.length) deja.nom = item.nom;
      if (item.stock !== '1') deja.stock = 'inconnu';
      if (!deja.image && item.image) deja.image = item.image;
    }
  }
  const parGroupe = new Map();
  for (const item of groupes.values()) {
    delete item.base;
    if (!concerneLeSite(item.nom) && !concerneLeSite(item.marque)) continue;
    const cle = `${item.marche}|${item.langue || '*'}`;
    if (!parGroupe.has(cle)) parGroupe.set(cle, []);
    parGroupe.get(cle).push(item);
  }
  const tri = (a, b) => b.ratio - a.ratio || b.ecart - a.ecart || a.nom.localeCompare(b.nom, 'fr');
  return [...parGroupe.entries()].flatMap(([cle, items]) => {
    const marche = cle.slice(0, cle.indexOf('|'));
    return items.sort(tri).slice(0, MAX_PAR_MARCHE[marche] || 80);
  });
}

export function produitsVisibles(publication, lang, aujourdhui) {
  if (!publication || publication.amazonExclu !== true || publication.version !== 1) return [];
  return (publication.produits || []).filter((p) => frais(p.releve, aujourdhui) && visibleLang(p, lang) && langueDeLaPage(p, lang) && (concerneLeSite(p.nom) || concerneLeSite(p.marque)) && hrefFiable(p.href));
}

export function formaterDate(iso, lang) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso || '')) return '';
  return new Intl.DateTimeFormat(LOCALES[lang] || 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`));
}

export function formaterMontant(n, devise, lang) {
  return new Intl.NumberFormat(LOCALES[lang] || 'fr-FR', { style: 'currency', currency: devise }).format(n);
}

export function formaterPourcent(ratio, lang) {
  const pct = Math.round(ratio * 1000) / 10;
  const s = Number.isInteger(pct) ? String(pct) : pct.toFixed(1);
  return lang === 'en' ? s : s.replace('.', ',');
}

export function publicationInitiale() {
  return {
    version: 1,
    genereLe: null,
    amazonExclu: true,
    seuil: { ratio: SEUIL_RATIO, absolu: SEUIL_ABSOLU, ratioPlancher: SEUIL_RATIO_PLANCHER, ratioMax: RATIO_MAX },
    produits: [],
    partenaires: PARTENAIRES.map((p) => ({ id: p.id, mid: p.mid, nom: p.nom, marque: p.marque, pages: p.pages, flux: 'non-interroge', lus: null, retenus: null })),
    erreur: null,
  };
}

export function assertAucunAmazon(publication) {
  for (const p of publication.produits || []) {
    if (estAmazon(p.href) || !hrefFiable(p.href)) throw new Error('lien-refuse');
  }
}
