import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const listPath = path.join(root, 'REECRITURE90_LOT5_PUBLIE_DIST_PATHS.txt');
const outPath = path.join(root, 'REECRITURE90_LOT6_PUBLIE_DIST_PATHS.txt');

function resolveAsset(htmlRel, url) {
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return null;
  const clean = url.split('?')[0].split('#')[0];
  if (!/(^|\/)_astro\//.test(clean) && !/(^|\/)images\//.test(clean) && !/(^|\/)capture\//.test(clean)) {
    return null;
  }
  const htmlAbs = path.join(root, htmlRel);
  const baseDir = path.dirname(htmlAbs);
  let abs = path.normalize(path.join(baseDir, clean.replace(/^\//, '')));
  if (!abs.startsWith(path.join(root, 'dist'))) return null;
  return path.relative(root, abs).replace(/\\/g, '/');
}

const htmlPaths = fs.readFileSync(listPath, 'utf8').trim().split(/\r?\n/).filter(Boolean);
const assets = new Set();

for (const rel of htmlPaths) {
  const html = fs.readFileSync(path.join(root, rel), 'utf8');
  for (const m of html.matchAll(/(?:src|srcset|href)="([^"]+)"/g)) {
    const resolved = resolveAsset(rel, m[1].split(/\s+/)[0]);
    if (resolved && fs.existsSync(path.join(root, resolved))) assets.add(resolved);
  }
  for (const m of html.matchAll(/_astro\/[A-Za-z0-9._-]+\.(webp|png|jpg|svg|jpeg)/g)) {
    const candidate = `dist/${m[0]}`;
    if (fs.existsSync(path.join(root, candidate))) assets.add(candidate);
  }
}

const required = [
  'dist/images/lot3/leds-activite1-clignotement.webp',
  'dist/images/lot3/leds-activite2-rgb.webp',
  'dist/images/lot3/leds-activite3-progressif.webp',
  'dist/images/lot3/mblock5-download-hero.webp',
  'dist/images/models/makeblock-mbot-mcore.webp',
  'dist/images/models/makeblock-mbot2.webp',
  'dist/images/blog/raspberry-pi-comparatif-2026/pi-5-sbc-opt.jpg',
];
for (const r of required) {
  if (fs.existsSync(path.join(root, r))) assets.add(r);
}

const all = [...new Set([...htmlPaths, ...assets])].sort();
fs.writeFileSync(outPath, `${all.join('\n')}\n`);
console.log(`html=${htmlPaths.length} assets=${assets.size} total=${all.length}`);
