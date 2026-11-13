#!/usr/bin/env node
/**
 * uk-ca-geo v1 (13/11/2026) : etape postbuild commune aux sites affilies (apres les miroirs /uk/ /ca/, avant go-links).
 * Usage : node scripts/uk-ca-geo.mjs dist --site https://exemple.fr
 *
 * 1. Charge /geo-amazon.js (boutique Amazon selon le pays du visiteur) sur chaque page HTML.
 * 2. hreflang du <head> : casse normalisee (en-gb -> en-GB), doublons retires,
 *    en-US ajoute a cote de "en" (et "en" a cote de en-US) vers la meme page /en/,
 *    en-GB / en-CA ajoutes vers /uk/X et /ca/X quand ces pages existent.
 * 3. Pages /uk/ et /ca/ : canonical vers la page /en/ equivalente -> canonical vers elle-meme.
 * Rapport : uk-ca-geo-report.json a cote du dossier dist.
 */
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';

const args = process.argv.slice(2);
const DIST = resolve(args[0] && !args[0].startsWith('--') ? args[0] : 'dist');
const si = args.indexOf('--site');
if (si < 0 || !args[si + 1]) { console.error('[uk-ca-geo] --site https://domaine requis'); process.exit(1); }
const SITE = args[si + 1].replace(/\/$/, '').replace(/^(?!https?:)/, 'https://');
const ORIGIN = new URL(SITE).origin;
if (!existsSync(DIST)) { console.error('[uk-ca-geo] dossier introuvable : ' + DIST); process.exit(1); }

const SCRIPT_TAG = '<script src="/geo-amazon.js" defer></script>';
const LINK_RE = /<link\b[^>]*>/gi;

function walk(dir, out = []) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (n.endsWith('.html')) out.push(p);
  }
  return out;
}
const attr = (tag, name) => { const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*(["'])(.*?)\\1`, 'i')); return m ? m[2] : ''; };
const isAlt = (tag) => attr(tag, 'rel').toLowerCase().split(/\s+/).includes('alternate') && attr(tag, 'hreflang');
function normCode(code) {
  const p = code.trim().split(/[-_]/);
  if (p[0].toLowerCase() === 'x') return 'x-default';
  return p.length > 1 ? `${p[0].toLowerCase()}-${p[1].toUpperCase()}` : p[0].toLowerCase();
}
function pathOf(href) {
  try { const u = new URL(href, ORIGIN); return u.origin === ORIGIN ? u.pathname : null; } catch { return null; }
}
function pageExists(pathname) {
  const p = pathname.replace(/^\//, '');
  if (p === '' || p.endsWith('/')) return existsSync(join(DIST, p, 'index.html'));
  return existsSync(join(DIST, p)) || existsSync(join(DIST, p, 'index.html')) || existsSync(join(DIST, `${p}.html`));
}
function publicPath(file) {
  let rel = relative(DIST, file).split(sep).join('/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -10)}`;
  return `/${rel}`;
}
const withCode = (tag, code) => tag.replace(/(\shreflang\s*=\s*)(["'])[^"']*\2/i, `$1"${code}"`);
const withHref = (tag, href) => tag.replace(/(\shref\s*=\s*)(["'])[^"']*\2/i, `$1"${href}"`);

const stats = { pages: 0, script: 0, hreflangPages: 0, casing: 0, dupRemoved: 0, enUS: 0, en: 0, enGB: 0, enCA: 0, canonicalFixed: 0 };
const issues = { ukCaCanonicalOther: [], noXDefault: 0, noSelfCanonical: 0 };

for (const file of walk(DIST)) {
  stats.pages++;
  const raw = readFileSync(file, 'utf8');
  const end = raw.search(/<\/head>/i);
  if (end < 0) continue;
  let head = raw.slice(0, end);
  const self = publicPath(file);
  const loc = self.split('/')[1] || '';

  // 2. hreflang
  const seen = new Set();
  let firstAlt = null;
  head = head.replace(LINK_RE, (tag) => {
    if (!isAlt(tag)) return tag;
    const code = attr(tag, 'hreflang');
    const nc = normCode(code);
    let t = tag;
    if (nc !== code) { t = withCode(tag, nc); stats.casing++; }
    const key = nc.toLowerCase();
    if (seen.has(key)) { stats.dupRemoved++; return ''; }
    seen.add(key);
    return t;
  });
  const alts = (head.match(LINK_RE) || []).filter(isAlt);
  if (alts.length) {
    const byCode = new Map(alts.map((t) => [attr(t, 'hreflang').toLowerCase(), t]));
    const enTag = byCode.get('en') || byCode.get('en-us');
    const enHref = enTag ? attr(enTag, 'href') : '';
    const enPath = enHref ? pathOf(enHref) : null;
    const add = [];
    if (enTag && enPath && /^\/en(\/|$)/.test(enPath)) {
      if (!byCode.has('en-us')) { add.push(withCode(enTag, 'en-US')); stats.enUS++; }
      if (!byCode.has('en')) { add.push(withCode(enTag, 'en')); stats.en++; }
      for (const [l, code, k] of [['uk', 'en-GB', 'enGB'], ['ca', 'en-CA', 'enCA']]) {
        if (byCode.has(code.toLowerCase())) continue;
        const target = enPath.replace(/^\/en(\/|$)/, `/${l}$1`);
        if (!pageExists(target)) continue;
        add.push(withCode(withHref(enTag, enHref.replace(enPath, target)), code));
        stats[k]++;
      }
    }
    if (add.length) {
      const anchor = enTag;
      head = head.replace(anchor, [anchor, ...add].join(''));
      stats.hreflangPages++;
    }
    if (!byCode.has('x-default')) issues.noXDefault++;
  }

  // 3. canonical des pages /uk/ et /ca/
  const canTag = (head.match(LINK_RE) || []).find((t) => attr(t, 'rel').toLowerCase() === 'canonical');
  if (canTag) {
    const cHref = attr(canTag, 'href');
    const cPath = pathOf(cHref);
    if ((loc === 'uk' || loc === 'ca') && cPath && cPath.replace(/\/$/, '') !== self.replace(/\/$/, '')) {
      const enEquiv = self.replace(/^\/(uk|ca)(\/|$)/, '/en$2');
      if (cPath.replace(/\/$/, '') === enEquiv.replace(/\/$/, '')) {
        head = head.replace(canTag, withHref(canTag, cHref.replace(cPath, self.endsWith('/') || self.endsWith('.html') ? self : `${self}/`)));
        stats.canonicalFixed++;
      } else if (issues.ukCaCanonicalOther.length < 50) issues.ukCaCanonicalOther.push(`${self} -> ${cHref}`);
    }
  } else if (!/noindex/i.test(head)) issues.noSelfCanonical++;

  // 1. script geo
  if (!head.includes('/geo-amazon.js')) { head += SCRIPT_TAG; stats.script++; }

  const next = head + raw.slice(end);
  if (next !== raw) writeFileSync(file, next);
}
const report = { site: SITE, generated: new Date().toISOString(), stats, issues };
writeFileSync(join(dirname(DIST), 'uk-ca-geo-report.json'), JSON.stringify(report, null, 1));
console.log(`[uk-ca-geo] ${SITE} : ${stats.pages} pages, script ajoute sur ${stats.script}, hreflang completes sur ${stats.hreflangPages} (en-US ${stats.enUS}, en ${stats.en}, en-GB ${stats.enGB}, en-CA ${stats.enCA}), casse ${stats.casing}, doublons ${stats.dupRemoved}, canonical UK/CA corriges ${stats.canonicalFixed}, sans x-default ${issues.noXDefault}`);
