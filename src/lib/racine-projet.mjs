/**
 * Dossier du site, que le module tourne depuis src/ ou depuis le bundle
 * dist/.prerender/chunks/ produit par astro build.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

function contientLeSite(dir) {
  return fs.existsSync(path.join(dir, 'PARTENAIRES.md')) && fs.existsSync(path.join(dir, 'astro.config.mjs'));
}

function remonter(depart) {
  let dir = depart;
  for (let i = 0; i < 8; i++) {
    if (contientLeSite(dir)) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return '';
}

export function racineProjet() {
  const ici = path.dirname(fileURLToPath(import.meta.url));
  return remonter(ici) || remonter(process.cwd()) || process.cwd();
}
