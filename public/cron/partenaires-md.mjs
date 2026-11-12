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
