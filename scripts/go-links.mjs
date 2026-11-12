#!/usr/bin/env node
/**
 * go-links v1 : réécrit en postbuild tous les liens affiliés Amazon et Awin du HTML final
 * en /go/<id>/ et génère la table id -> URL d'origine (liste blanche lue par go.php).
 *
 * Usage (dernière étape de "npm run build") :
 *   node scripts/go-links.mjs dist --site robot-educatif.info [--base /] [--check]
 *
 * Fichier partagé : /workspace/shared/go-links/go-links.mjs — à copier tel quel sur chaque site.
 * Aucune dépendance (Node >= 18).
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const dist = path.resolve(args.find((a) => !a.startsWith('--')) || 'dist');
const opt = (k, d) => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : d; };
const SITE = opt('site', '');
let BASE = opt('base', process.env.ASTRO_BASE || '/');
if (!BASE.startsWith('/')) BASE = '/' + BASE;
if (!BASE.endsWith('/')) BASE += '/';
const CHECK_ONLY = args.includes('--check');
if (!SITE) { console.error('[go-links] --site obligatoire'); process.exit(1); }
if (!fs.existsSync(dist)) { console.error('[go-links] dossier introuvable : ' + dist); process.exit(1); }

const AMAZON_HOST = /(^|\.)amazon\.(fr|de|it|es|nl|se|pl|com\.be|com\.tr|co\.uk|com|ca|com\.mx|com\.br|com\.au|co\.jp|in|ae|sa|sg|eg)$/i;
const AMZN_SHORT = /^(amzn\.to|amzn\.eu|amzn\.asia|a\.co)$/i;
const AWIN_HOST = /(^|\.)awin1\.com$/i;
const TLD_COUNTRY = { fr: 'FR', de: 'DE', it: 'IT', es: 'ES', nl: 'NL', se: 'SE', pl: 'PL', 'com.be': 'BE', 'com.tr': 'TR', 'co.uk': 'GB', com: 'US', ca: 'CA', 'com.mx': 'MX', 'com.br': 'BR', 'com.au': 'AU', 'co.jp': 'JP', in: 'IN', ae: 'AE', sa: 'SA', sg: 'SG', eg: 'EG' };

/** Décode les entités HTML d'une valeur d'attribut ; répète si l'URL est doublement encodée (&#38;amp; / &amp;amp;). */
function decodeEntities(s) {
  const once = (x) => x
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&quot;/g, '"').replace(/&apos;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
  let out = once(s), repaired = false;
  for (let i = 0; i < 4 && /&(amp|#38|#x26);/i.test(out); i++) { out = once(out); repaired = true; }
  // caractères non ASCII / espaces : encodés en %XX (même URL pour Amazon, en-tête Location valide)
  return { url: out.trim().replace(/[^\x21-\x7E]/gu, (c) => encodeURIComponent(c)), repaired };
}
const escAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

function classify(url) {
  let u;
  try { u = new URL(url); } catch { return null; }
  if (!/^https?:$/.test(u.protocol)) return null;
  const h = u.hostname.toLowerCase();
  const m = h.match(AMAZON_HOST);
  if (m) return { merchant: 'amazon', country: TLD_COUNTRY[m[2].toLowerCase()] || '', tag: u.searchParams.get('tag') || '', prefix: 'az-' + (TLD_COUNTRY[m[2].toLowerCase()] || 'xx').toLowerCase() };
  if (AMZN_SHORT.test(h)) return { merchant: 'amazon', country: '', tag: '', prefix: 'az-short' };
  if (AWIN_HOST.test(h)) {
    const mid = (u.searchParams.get('awinmid') || u.searchParams.get('mid') || '').replace(/\D/g, '');
    let country = '', dest = '';
    const ued = u.searchParams.get('ued') || u.searchParams.get('p') || '';
    try { if (ued) { const d = new URL(ued); dest = d.hostname; const t = d.hostname.split('.').pop().toUpperCase(); country = t.length === 2 ? (t === 'UK' ? 'GB' : t) : ''; } } catch {}
    return { merchant: 'awin', mid, dest, country, affid: u.searchParams.get('awinaffid') || '', prefix: 'aw-' + (mid || 'x') };
  }
  return null;
}
const idFor = (prefix, url) => prefix + '-' + crypto.createHash('sha1').update(url).digest('hex').slice(0, 10);

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc); else if (e.name.endsWith('.html')) acc.push(p);
  }
  return acc;
}

const table = new Map(); // id -> {url, merchant, country, ...}
// Table CUMULATIVE (31/10/2026) : on recharge la table versionnée, on garde tous les ids existants,
// on ajoute les nouveaux et on ne supprime jamais rien. Une même URL garde toujours le même id.
const TABLE_FILE = path.resolve(opt('table', path.join(path.dirname(fileURLToPath(import.meta.url)), 'go-table.json')));
const urlToId = new Map();
let prevCount = 0;
if (fs.existsSync(TABLE_FILE)) {
  const old = JSON.parse(fs.readFileSync(TABLE_FILE, 'utf8'));
  const links = old.links || old;
  for (const [id, e] of Object.entries(links)) { table.set(id, e); if (e && e.url && !urlToId.has(e.url)) urlToId.set(e.url, id); }
  prevCount = table.size;
} else console.warn('[go-links] ATTENTION : table précédente absente (' + TABLE_FILE + '), elle sera créée');
const usedIds = new Set();
const stats = { files: 0, filesChanged: 0, amazon: 0, awin: 0, repaired: 0, relFixed: 0, collisions: 0, invalid: 0 };
const A_TAG = /<a\b[^>]*>/gi;
const HREF = /(\shref\s*=\s*)(["'])(.*?)\2/i;
// Toute URL Amazon/Awin encore présente hors <a href> (JSON-LD, script, autre attribut).
const LOOSE = /https?:(?:\\\/|\/){2}(?:[^"'\\\s<>]|\\\/)+/g;

function take(url, repaired) {
  const c = classify(url);
  if (!c) return null;
  const id = urlToId.get(url) || idFor(c.prefix, url);
  const prev = table.get(id);
  if (prev && prev.url !== url) { stats.collisions++; console.error('[go-links] COLLISION ' + id); return null; }
  usedIds.add(id);
  if (!prev) urlToId.set(url, id);
  if (!prev) table.set(id, { url, merchant: c.merchant, country: c.country, ...(c.tag ? { tag: c.tag } : {}), ...(c.mid ? { mid: c.mid, dest: c.dest, affid: c.affid } : {}) });
  if (repaired) stats.repaired++;
  stats[c.merchant]++;
  return id;
}

for (const file of walk(dist)) {
  stats.files++;
  const html = fs.readFileSync(file, 'utf8');
  let changed = false;
  A_TAG.lastIndex = 0;
  LOOSE.lastIndex = 0;
  let out = html.replace(A_TAG, (tag) => {
    const hm = tag.match(HREF);
    if (!hm) return tag;
    const { url, repaired } = decodeEntities(hm[3]);
    const id = take(url, repaired);
    if (!id) return tag;
    let t = tag.replace(HREF, `$1"${BASE}go/${id}/"`);
    // rel : garantit sponsored nofollow noopener (sans toucher aux autres tokens)
    const rm = t.match(/\srel\s*=\s*(["'])(.*?)\1/i);
    const need = ['sponsored', 'nofollow', 'noopener'];
    if (rm) {
      const toks = rm[2].split(/\s+/).filter(Boolean);
      const add = need.filter((n) => !toks.includes(n));
      if (add.length) { stats.relFixed++; t = t.replace(rm[0], ` rel="${[...toks, ...add].join(' ')}"`); }
    } else { stats.relFixed++; t = t.replace(/^<a\b/i, '<a rel="sponsored nofollow noopener"'); }
    // garde l'info marchand pour le tracker JS (lecture seule, n'influe pas sur la redirection)
    if (!/\sdata-go=/.test(t)) t = t.replace(/^<a\b/i, `<a data-go="${table.get(id).merchant}"`);
    changed = true;
    return t;
  });
  out = out.replace(LOOSE, (raw) => {
    let core = raw, trail = '';
    const tm = raw.match(/^(.*?)([)\].,;:]+)$/);
    if (tm) { core = tm[1]; trail = tm[2]; }
    const plain = core.replace(/\\\//g, '/');
    const { url, repaired } = decodeEntities(plain);
    const id = take(url, repaired);
    if (!id) return raw;
    changed = true;
    return `${BASE}go/${id}/${trail}`;
  });
  if (changed) { stats.filesChanged++; if (!CHECK_ONLY) fs.writeFileSync(file, out); }
}

// Table : PHP (non lisible depuis le web) + JSON de contrôle hors dist
const ids = [...table.keys()].sort();
const php = '<?php\n// Généré par go-links.mjs le ' + new Date().toISOString() + ' pour ' + SITE + ' — NE PAS MODIFIER À LA MAIN\nif (!defined(\'GO_LINKS\')) { http_response_code(404); exit; }\nreturn ' +
  '[\n' + ids.map((id) => '  ' + JSON.stringify(id).replace(/\$/g, '\\$') + ' => ' + phpArr(table.get(id))).join(',\n') + '\n];\n';
function phpStr(s) { return "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'"; }
function phpArr(o) { return '[' + Object.entries(o).map(([k, v]) => phpStr(k) + ' => ' + phpStr(v)).join(', ') + ']'; }
if (!CHECK_ONLY) {
  fs.writeFileSync(path.join(dist, 'go-table.php'), php);
  fs.writeFileSync(TABLE_FILE, JSON.stringify({ site: SITE, updated: new Date().toISOString(), count: ids.length, links: Object.fromEntries(ids.map((i) => [i, table.get(i)])) }, null, 1));
  fs.writeFileSync(path.join(path.dirname(dist), 'go-links-report.json'), JSON.stringify({ site: SITE, generated: new Date().toISOString(), stats, links: Object.fromEntries(ids.map((i) => [i, table.get(i)])) }, null, 1));
}

// Contrôle : plus aucune URL Amazon/Awin dans le HTML (lien, JSON-LD, script).
let left = 0;
if (!CHECK_ONLY) for (const file of walk(dist)) {
  const h = fs.readFileSync(file, 'utf8');
  const seen = new Set();
  LOOSE.lastIndex = 0;
  for (const raw of h.match(LOOSE) || []) {
    let core = raw;
    const tm = raw.match(/^(.*?)([)\].,;:]+)$/);
    if (tm) core = tm[1];
    const url = decodeEntities(core.replace(/\\\//g, '/')).url;
    if (!classify(url) || seen.has(url)) continue;
    seen.add(url);
    left++;
    if (left < 10) console.error('[go-links] lien direct restant : ' + path.relative(dist, file) + ' ' + url.slice(0, 140));
  }
}
console.log(`[go-links] ${SITE} : ${stats.files} pages, ${stats.filesChanged} modifiées, ${stats.amazon} liens Amazon + ${stats.awin} liens Awin réécrits, ${table.size} ids uniques, ${stats.repaired} URL réparées (double encodage), ${stats.relFixed} rel complétés, collisions=${stats.collisions}, restants=${left}, table=${table.size} (avant ${prevCount}, nouveaux ${table.size - prevCount}, utilisés ${usedIds.size})`);
if (table.size < prevCount) { console.error('[go-links] ERREUR : la table a perdu des ids'); process.exit(3); }
if (stats.collisions || left) process.exit(2);
