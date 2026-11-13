/**
 * Lecture de PARTENAIRES.md.
 * Le relevé retient les programmes Awin acceptés du compte du site.
 * Amazon est exclu. Un « Non » dans la colonne Comparateur prix aussi.
 * Si cette colonne ne l’interdit pas, la comparaison est autorisée.
 * Un programme « à vérifier » est lu dans le flux,
 * mais il n’autorise pas un lien sponsorisé dans les articles.
 */
export const AWIN_AFFID_SITE = '3131609';

export function comparaisonAutorisee(cellule) {
  const t = String(cellule || '').replace(/\s+/g, ' ').trim();
  if (!t || t === '?') return true;
  if (/^non\b/i.test(t)) return false;
  if (/comparateur de prix\s*:\s*non/i.test(t)) return false;
  if (/interdit explicitement/i.test(t)) return false;
  if (/pas de stockage historique/i.test(t)) return false;
  return true;
}

export function exclusionsProduits(cellule) {
  const m = String(cellule || '').match(/exclure tous les produits\s+([A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9'-]*)/i);
  if (!m) return [];
  const mot = m[1].replace(/[.\s]+$/, '').trim().toLowerCase();
  return mot ? [mot] : [];
}

const CONNUS = {
  124706: { id: 'sovol', marque: 'sovol', pages: 'toutes', nom: 'Sovol' },
  48247: { id: '3dmakerpro', marque: '3dmakerpro', pages: 'toutes', nom: '3DMakerpro' },
  70050: { id: '3dmakerpro-eu', marque: '3dmakerpro', pages: 'toutes', nom: '3DMakerpro EU' },
  61127: { id: 'elegoo', marque: 'elegoo', pages: 'toutes', nom: 'Elegoo' },
  69360: { id: 'anycubic', marque: 'anycubic', pages: 'toutes', nom: 'Anycubic' },
  129417: { id: 'anycubic-us', marque: 'anycubic', pages: 'en', nom: 'Anycubic US' },
  95665: { id: 'biqu', marque: 'biqu', pages: 'toutes', nom: 'BIQU' },
  106471: { id: 'azurefilm', marque: 'azurefilm', pages: 'toutes', nom: 'AzureFilm' },
  96873: { id: 'mintion', marque: 'mintion', pages: 'toutes', nom: 'Mintion' },
  117285: { id: 'toolchest', marque: 'toolchest', pages: 'de', nom: 'Toolchest.de' },
  75738: { id: 'longer', marque: 'longer', pages: 'toutes', nom: 'Longer' },
  127141: { id: 'layerline', marque: 'layerline', pages: 'toutes', nom: 'Layerline' },
  97013: { id: 'creality', marque: 'creality', pages: 'toutes', nom: 'Creality' },
  105805: { id: 'einstar', marque: 'einstar', pages: 'toutes', nom: 'EINSTAR' },
  32419: { id: 'creality-global', marque: 'creality', pages: 'toutes' },
};

function midDe(liens) {
  const s = String(liens || '');
  const precis = s.match(/awinmid=(\d+)/i);
  if (precis) return precis[1];
  const simple = s.match(/(?:^|[^a-z])mid=(\d+)/i);
  return simple ? simple[1] : '';
}

function affidDe(liens) {
  const s = String(liens || '');
  const precis = s.match(/awinaffid=(\d+)/i);
  if (precis) return precis[1];
  const simple = s.match(/(?:^|[^a-z])id=(\d+)/i);
  return simple ? simple[1] : '';
}

function slug(nom, mid) {
  const s = nom.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 42);
  return s || `mid-${mid}`;
}

function pagesDe(nom, mid) {
  if (CONNUS[mid]?.pages) return CONNUS[mid].pages;
  const n = nom.toLowerCase();
  if (/\(us\)|\bus store\b/.test(n)) return 'en';
  if (/\bde\b|\.de\b|deutschland/.test(n)) return 'de';
  return 'toutes';
}

export function lireRegistre(markdown) {
  const aIntegrer = new Set();
  const aVerifier = new Set();
  const bloc = String(markdown).split('<!-- A_INTEGRER_DEBUT -->')[1]?.split('<!-- A_INTEGRER_FIN -->')[0] || '';
  let mode = 'integrer';
  for (const line of bloc.split(/\r?\n/)) {
    if (/^### /.test(line) && /v[ée]rifier/i.test(line)) {
      mode = 'verifier';
      continue;
    }
    const item = line.match(/^- Awin : (.+)$/);
    if (!item) continue;
    const nom = item[1].trim().toLowerCase();
    if (mode === 'verifier') aVerifier.add(nom);
    else aIntegrer.add(nom);
  }
  const lignes = [];
  let idxComparateur = -1;
  for (const line of String(markdown).split(/\r?\n/)) {
    if (!line.startsWith('|')) continue;
    const cells = line.split('|').slice(1, -1).map((c) => c.trim());
    if (cells.length < 7) continue;
    if (/^:?-+:?$/.test(cells[0])) continue;
    if (cells[0] === 'Plateforme') {
      idxComparateur = cells.findIndex((c) => /comparateur/i.test(c));
      continue;
    }
    lignes.push({
      plateforme: cells[0],
      marque: cells[1].replace(/&#124;/g, '|').replace(/&amp;/g, '&'),
      statut: cells[2],
      date: cells[3] || '',
      liens: cells[5],
      integre: cells[6],
      comparateur: idxComparateur >= 0 ? (cells[idxComparateur] || '') : '',
    });
  }
  return { lignes, aIntegrer, aVerifier };
}

export function affidDuSite(registre) {
  const freq = new Map();
  for (const ligne of registre.lignes) {
    if (ligne.plateforme.toLowerCase() !== 'awin' || ligne.statut !== 'acceptée') continue;
    const id = affidDe(ligne.liens);
    if (!id) continue;
    freq.set(id, (freq.get(id) || 0) + 1);
  }
  let best = '';
  let n = 0;
  for (const [id, c] of freq) if (c > n) { best = id; n = c; }
  return best;
}

export function partenairesPrix(registre, affid = affidDuSite(registre)) {
  const vus = new Set();
  const out = [];
  if (!affid) return out;
  for (const ligne of registre.lignes) {
    if (ligne.plateforme.toLowerCase() !== 'awin') continue;
    if (ligne.statut !== 'acceptée') continue;
    if (/amazon/i.test(ligne.marque)) continue;
    if (!comparaisonAutorisee(ligne.comparateur)) continue;
    const mid = midDe(ligne.liens);
    if (!mid || affidDe(ligne.liens) !== affid || vus.has(mid)) continue;
    vus.add(mid);
    const connu = CONNUS[mid];
    const cle = ligne.marque.trim().toLowerCase();
    const aVerifier = registre.aVerifier.has(cle);
    out.push({
      id: connu?.id || slug(ligne.marque, mid),
      mid,
      nom: connu?.nom || ligne.marque,
      marque: connu?.marque || ligne.marque,
      pages: pagesDe(ligne.marque, mid),
      liensSite: !aVerifier,
      aIntegrer: registre.aIntegrer.has(cle),
      aVerifier,
      comparaisonPrix: true,
      exclure: exclusionsProduits(ligne.comparateur),
    });
  }
  const parNom = new Map();
  for (const p of out) parNom.set(p.nom, (parNom.get(p.nom) || 0) + 1);
  const ids = new Set();
  for (const p of out) {
    if (parNom.get(p.nom) > 1 && !CONNUS[p.mid]?.nom) p.nom = `${p.nom} (${p.mid})`;
    if (ids.has(p.id)) p.id = `${p.id}-${p.mid}`;
    ids.add(p.id);
  }
  return out.sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));
}

export function ecrireMidsClient(source, partenaires) {
  const corps = partenaires.map((p) => `'${p.mid}':1`).join(',');
  const remplacement = `/* MIDS_REGISTRE */{${corps}}/* MIDS_REGISTRE */`;
  const suivant = source.replace(
    /\/\* MIDS_REGISTRE \*\/[\s\S]*?\/\* MIDS_REGISTRE \*\//,
    remplacement,
  );
  if (!suivant.includes(remplacement)) {
    throw new Error('balises MIDS_REGISTRE absentes de baisses.js');
  }
  return suivant;
}

function estAccepte(statut) {
  const t = String(statut || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  return t === 'acceptee' || t === 'accepte';
}

function marcheDe(nom) {
  const n = String(nom || '').toLowerCase();
  if (n.includes('amazon')) {
    if (/\bnl\b|\.nl\b/.test(n)) return 'nl';
    if (/\buk\b|co\.uk|royaume-uni/.test(n)) return 'uk';
    if (/\bca\b|canada/.test(n)) return 'ca';
    if (/\bde\b|\.de\b|allemagne/.test(n)) return 'de';
    if (/\bit\b|\.it\b|ital/.test(n)) return 'it';
    if (/\bes\b|\.es\b|espagn/.test(n)) return 'es';
    if (/\bfr\b|\.fr\b|france/.test(n)) return 'fr';
    if (/\bus\b|\.com\b|états|etats/.test(n) && !n.includes('.com.be')) return 'us';
    return 'international';
  }
  const fin = n.match(/(?:^|\s|\()(fr|de|uk|us|it|es|nl|ca|eu)\)?\s*$/);
  if (fin) return fin[1];
  if (/\.fr\b|\(fr\)|\bfrance\b/.test(n)) return 'fr';
  if (/\.de\b|\(de\)|\ballemagne\b|\bdeutschland\b/.test(n)) return 'de';
  if (/\.co\.uk\b|\(uk\)|\broyaume-uni\b/.test(n)) return 'uk';
  if (/\(us\)|\bétats-unis\b|\betats-unis\b|\busa\b/.test(n)) return 'us';
  if (/\.it\b|\(it\)|\bitalie\b|\bitalia\b/.test(n)) return 'it';
  if (/\.es\b|\(es\)|\bespagne\b/.test(n)) return 'es';
  if (/\.nl\b|\(nl\)|\bpays-bas\b/.test(n)) return 'nl';
  if (/\(ca\)|\bcanada\b/.test(n)) return 'ca';
  if (/\(eu\)|\beurope\b/.test(n)) return 'eu';
  if (/international|\bglobal\b/.test(n)) return 'international';
  return 'international';
}

function slugifier(nom) {
  return String(nom || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);
}

const NOMS_AMAZON = {
  fr: 'Amazon.fr',
  de: 'Amazon.de',
  it: 'Amazon.it',
  es: 'Amazon.es',
  uk: 'Amazon.co.uk',
  us: 'Amazon.com',
  ca: 'Amazon.ca',
  nl: 'Amazon.nl',
};

const DOMAINES_AMAZON = {
  fr: 'www.amazon.fr',
  de: 'www.amazon.de',
  it: 'www.amazon.it',
  es: 'www.amazon.es',
  uk: 'www.amazon.co.uk',
  us: 'www.amazon.com',
  ca: 'www.amazon.ca',
  nl: 'www.amazon.nl',
};

function nomAffiche(marque, marche) {
  if (/^amazon/i.test(marque) && NOMS_AMAZON[marche]) return NOMS_AMAZON[marche];
  return String(marque || '').replace(/\s*\(compte commun\)/gi, '').trim();
}

function familleDe(marque) {
  return /amazon|jake|conrad|shop|store|magasin|boutique/i.test(marque) ? 'revendeur' : 'marque';
}

function groupeDe(slug, marque) {
  if (/^amazon/i.test(marque)) return 'amazon';
  return slug.replace(/-(fr|de|uk|us|it|es|nl|eu|ca|global)$/, '') || slug;
}

function urlsDe(ligne, marche) {
  const texte = String(ligne.liens || '');
  const trouves = [...texte.matchAll(/https?:\/\/[^\s)|]+/g)].map((m) => m[0].replace(/[.,;]+$/, ''));
  const awin = trouves.find((u) => /awin1\.com|awin\.com/i.test(u)) || '';
  const amazon = trouves.find((u) => /amazon\./i.test(u) && !/amazon\.com\.be/i.test(u)) || '';
  const officiel = trouves.find((u) => !/awin1\.com|awin\.com|amazon\./i.test(u)) || '';
  let bouton = awin;
  if (!bouton && String(ligne.plateforme || '').toLowerCase() === 'awin') {
    const mid = (texte.match(/awinmid=(\d+)/i) || texte.match(/\bmid=(\d+)/i) || [])[1];
    const affid = (texte.match(/awinaffid=(\d+)/i) || texte.match(/\baffid=(\d+)/i) || [])[1];
    if (mid && affid) bouton = `https://www.awin1.com/cread.php?awinmid=${mid}&awinaffid=${affid}`;
  }
  const amazonien = /amazon/i.test(`${ligne.plateforme} ${ligne.marque}`);
  if (amazonien) {
    const tag = (texte.match(/\b((?:manuso|roboteducat)[a-z0-9-]*-\d+)\b/i) || texte.match(/[?&]tag=([A-Za-z0-9-]+)/) || [])[1];
    const domaine = DOMAINES_AMAZON[marche];
    if (amazon && !/amazon\.com\.be/i.test(amazon)) bouton = amazon;
    else if (tag && domaine) bouton = `https://${domaine}/?tag=${tag}`;
    else bouton = '';
  }
  return { bouton, officiel };
}

export function partenairesPublies(registre) {
  const pris = new Set();
  const out = [];
  for (const ligne of registre.lignes || []) {
    if (!estAccepte(ligne.statut)) continue;
    const marche = marcheDe(ligne.marque);
    let slug = /^amazon/i.test(ligne.marque) && NOMS_AMAZON[marche] ? `amazon-${marche}` : slugifier(nomAffiche(ligne.marque, marche));
    if (!slug) slug = 'partenaire';
    const mid = (String(ligne.liens || '').match(/awinmid=(\d+)/i) || [])[1] || '';
    if (pris.has(slug)) slug = `${slug}-${mid || '2'}`.slice(0, 60);
    let n = 2;
    while (pris.has(slug)) {
      slug = `${slug.replace(/-\d+$/, '')}-${n++}`;
    }
    pris.add(slug);
    const urls = urlsDe(ligne, marche);
    const bloque = registre.aVerifier && registre.aVerifier.has(String(ligne.marque || '').trim().toLowerCase());
    out.push({
      slug,
      marque: ligne.marque,
      liens: ligne.liens || '',
      plateforme: ligne.plateforme || '',
      nom: nomAffiche(ligne.marque, marche),
      marche,
      famille: familleDe(ligne.marque),
      groupe: groupeDe(slug, ligne.marque),
      date: ligne.date || '',
      bouton: bloque ? '' : urls.bouton,
      officiel: urls.officiel,
      amazon: /amazon/i.test(`${ligne.plateforme} ${ligne.marque}`),
    });
  }
  return out.sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));
}
