/**
 * Routine quotidienne scan3dlab.
 * 1. Relit PARTENAIRES.md et publie la liste des programmes Awin acceptés.
 * 2. Met à jour l’allowlist du navigateur.
 * 3. Lance le relevé de prix. Amazon n’est pas lu.
 * Cron : php public/cron/releve-prix.php
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { affidDuSite, ecrireMidsClient, lireRegistre, partenairesPrix } from './partenaires-md.mjs';
import { appliquerPartenaires, dateParis } from './regles.mjs';

const ici = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(ici, '..', '..');
const fichierMd = path.join(root, 'PARTENAIRES.md');
const fichierJson = path.join(ici, 'partenaires-actifs.json');
const fichierSrc = path.join(root, 'src', 'data', 'promos', 'partenaires-actifs.json');
const fichierPrix = path.join(ici, '..', 'prix-du-jour.json');
const fichierPublication = path.join(root, 'src', 'data', 'promos', 'publication.json');
const fichierClient = path.join(ici, '..', 'baisses.js');
const fichierEcarts = path.join(ici, 'ecarts-liens.json');

function ecrire(fichier, data) {
  fs.mkdirSync(path.dirname(fichier), { recursive: true });
  const tmp = `${fichier}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2) + '\n');
  fs.renameSync(tmp, fichier);
}

function lireJson(fichier, secours) {
  if (!fs.existsSync(fichier)) return secours;
  try {
    return JSON.parse(fs.readFileSync(fichier, 'utf8'));
  } catch {
    return secours;
  }
}

function fichiersSrc(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === 'node_modules' || ent.name === 'dist' || ent.name.startsWith('.')) continue;
    const cible = path.join(dir, ent.name);
    if (ent.isDirectory()) fichiersSrc(cible, acc);
    else if (/\.(astro|ts|mjs|js)$/.test(ent.name)) acc.push(cible);
  }
  return acc;
}

function ecrireAffidClient(source, affid) {
  const remplacement = `/* AFFID_REGISTRE */'${affid}'/* AFFID_REGISTRE */`;
  const suivant = source.replace(/\/\* AFFID_REGISTRE \*\/[\s\S]*?\/\* AFFID_REGISTRE \*\//, remplacement);
  if (!suivant.includes(remplacement)) throw new Error('balises AFFID_REGISTRE absentes de baisses.js');
  return suivant;
}

function publierRegistre() {
  if (!fs.existsSync(fichierMd)) throw new Error('PARTENAIRES.md introuvable');
  const registre = lireRegistre(fs.readFileSync(fichierMd, 'utf8'));
  const affid = affidDuSite(registre);
  const prix = partenairesPrix(registre, affid);
  if (prix.length) appliquerPartenaires(prix, affid);
  const doc = {
    version: 1,
    source: 'PARTENAIRES.md',
    genereLe: dateParis(),
    affid,
    amazonExclu: true,
    comparaisonParDefaut: true,
    prix,
  };
  ecrire(fichierJson, doc);
  ecrire(fichierSrc, doc);
  const client = fs.readFileSync(fichierClient, 'utf8');
  let suivant = ecrireMidsClient(client, prix);
  suivant = ecrireAffidClient(suivant, affid);
  if (suivant !== client) fs.writeFileSync(fichierClient, suivant);

  const flux = new Map();
  for (const fichier of [fichierPublication, fichierPrix]) {
    const pub = lireJson(fichier, null);
    for (const p of pub?.partenaires || []) flux.set(p.mid, p);
  }
  const partenaires = prix.map((p) => {
    const deja = flux.get(p.mid) || {};
    return {
      id: p.id, mid: p.mid, nom: p.nom, marque: p.marque, pages: p.pages,
      flux: deja.flux || 'non-interroge', lus: deja.lus ?? null, retenus: deja.retenus ?? null,
    };
  });
  for (const fichier of [fichierPublication, fichierPrix]) {
    const pub = lireJson(fichier, { version: 1, genereLe: null, produits: [], erreur: null });
    pub.version = 1;
    pub.amazonExclu = true;
    pub.partenaires = partenaires;
    if (!pub.seuil) pub.seuil = { ratio: 0.05, absolu: 10, ratioPlancher: 0.02, ratioMax: 0.9 };
    if (!Array.isArray(pub.produits)) pub.produits = [];
    ecrire(fichier, pub);
  }

  const acceptes = new Set(prix.map((p) => p.mid));
  const hors = [];
  for (const fichier of fichiersSrc(path.join(root, 'src'))) {
    const texte = fs.readFileSync(fichier, 'utf8');
    for (const match of texte.matchAll(/awinmid=(\d+)/g)) {
      if (!acceptes.has(match[1])) hors.push({ mid: match[1], fichier: path.relative(root, fichier).replaceAll('\\', '/') });
    }
  }
  const uniques = [];
  const vus = new Set();
  for (const ligne of hors) {
    const cle = `${ligne.mid}:${ligne.fichier}`;
    if (vus.has(cle)) continue;
    vus.add(cle);
    uniques.push(ligne);
  }
  ecrire(fichierEcarts, {
    genereLe: doc.genereLe,
    programmes: prix.length,
    aIntegrer: prix.filter((p) => p.aIntegrer).map((p) => p.nom),
    aVerifier: prix.filter((p) => p.aVerifier).map((p) => p.nom),
    liensHorsRegistre: uniques,
  });
  console.log(`${doc.genereLe} : ${prix.length} programmes Awin acceptés, ${prix.filter((p) => p.aIntegrer).length} encore à intégrer dans les pages, ${uniques.length} liens dont le programme n’est pas accepté.`);
}

function registrePourReleve() {
  if (fs.existsSync(fichierMd)) {
    publierRegistre();
    return true;
  }
  const doc = lireJson(fichierJson, null);
  if (!doc?.prix?.length) {
    console.error('PARTENAIRES.md absent et partenaires-actifs.json vide.');
    return false;
  }
  console.log('PARTENAIRES.md absent : relevé avec partenaires-actifs.json déployé.');
  return true;
}

function main() {
  if (!registrePourReleve()) {
    process.exitCode = 1;
    return;
  }
  if (process.argv.includes('--sans-releve')) return;
  const doc = JSON.parse(fs.readFileSync(fichierJson, 'utf8'));
  if (!doc.prix?.length) {
    console.log('Aucun programme Awin accepté et autorisé pour la comparaison. Relevé non lancé.');
    return;
  }
  const enfant = spawnSync(process.execPath, [path.join(ici, 'releve-prix.mjs')], { stdio: 'inherit' });
  process.exitCode = enfant.status === 0 ? 0 : enfant.status || 1;
}

const lance = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (lance) main();
