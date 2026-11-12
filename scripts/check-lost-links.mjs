#!/usr/bin/env node
// Contrôle anti-perte de liens (31/10/2026) : compare chaque page buildée (dist) à la version EN LIGNE
// et signale tout lien unique disparu (/go/, internes, externes, ancres #, fichiers .mblock...).
// Usage : node check-lost-links.mjs --dist ./dist --site https://robot-educatif.info --list PATHS.txt [--allow allow.json] [--out rapport.json]
//   PATHS.txt : une ligne par fichier (dist/xx/slug/index.html ou xx/slug/) ; les lignes non-HTML sont ignorées.
//   allow.json : { "<chemin page>": { "<lien>": "raison (ex. ASIN 404 sur amazon.it, remplacé par ...)" } }
// Code de sortie 1 si un lien a disparu sans justification -> NE PAS DÉPLOYER.
import fs from 'node:fs';
import path from 'node:path';
const a = process.argv.slice(2);
const opt = (k, d) => { const i = a.indexOf('--' + k); return i >= 0 ? a[i + 1] : d; };
const dist = path.resolve(opt('dist', 'dist'));
const site = opt('site', 'https://robot-educatif.info').replace(/\/$/, '');
const listFile = opt('list');
const allow = opt('allow') && fs.existsSync(opt('allow')) ? JSON.parse(fs.readFileSync(opt('allow'), 'utf8')) : {};
if (!listFile) { console.error('--list obligatoire'); process.exit(2); }
const pages = fs.readFileSync(listFile, 'utf8').split(/\r?\n/).map((l) => l.trim().replace(/\\/g, '/')).filter(Boolean)
  .filter((l) => /index\.html$|\/$/.test(l)).map((l) => l.replace(/^dist\//, '').replace(/index\.html$/, '').replace(/^\/?/, ''));
const norm = (h, base) => {
  h = h.replace(/&amp;/g, '&').trim();
  if (!/^(mailto:|tel:|javascript:|#)/i.test(h)) { try { h = new URL(h, base).href; } catch {} }
  if (h.startsWith(site)) h = h.slice(site.length) || '/';
  if (/^(mailto:|tel:|javascript:)/i.test(h)) return null;
  return h.replace(/\/index\.html$/, '/');
};
const links = (html, base) => {
  const s = new Set();
  for (const m of html.matchAll(/<a\b[^>]*?\shref\s*=\s*(["'])(.*?)\1/gi)) { const n = norm(m[2], base); if (n) s.add(n); }
  return s;
};
let lost = 0; const report = {};
for (const p of pages) {
  const file = path.join(dist, p, 'index.html');
  if (!fs.existsSync(file)) { console.warn('[lost-links] absent du dist : ' + p); continue; }
  const after = links(fs.readFileSync(file, 'utf8'), site + '/' + p);
  let res;
  try { res = await fetch(site + '/' + p, { headers: { 'user-agent': 'robot-educatif-linkcheck/1.0' }, redirect: 'follow' }); }
  catch (e) { console.warn('[lost-links] en ligne injoignable : ' + p + ' (' + e.message + ')'); continue; }
  if (res.status === 404) { report[p] = { new: true }; continue; } // nouvelle page : rien à comparer
  if (!res.ok) { console.warn('[lost-links] HTTP ' + res.status + ' : ' + p); continue; }
  const before = links(await res.text(), site + '/' + p);
  const missing = [...before].filter((h) => !after.has(h));
  const ok = allow['/' + p] || allow[p] || {};
  const unjust = missing.filter((h) => !ok[h]);
  report[p] = { before: before.size, after: after.size, missing, justified: missing.filter((h) => ok[h]).map((h) => ({ h, why: ok[h] })) };
  if (unjust.length) { lost += unjust.length; console.error('[lost-links] ' + p + ' : ' + unjust.length + ' lien(s) disparu(s) -> ' + unjust.join('  ')); }
  else console.log('[lost-links] ' + p + ' OK (uniques en ligne=' + before.size + ', après=' + after.size + (missing.length ? ', ' + missing.length + ' justifié(s)' : '') + ')');
}
const out = opt('out'); if (out) fs.writeFileSync(out, JSON.stringify({ site, generated: new Date().toISOString(), lost, report }, null, 1));
console.log('[lost-links] total disparus non justifiés = ' + lost + (lost ? '  => NE PAS DÉPLOYER' : ''));
process.exit(lost ? 1 : 0);
