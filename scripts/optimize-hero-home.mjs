/**
 * Recompresse public/hero-home.webp (LCP accueil) pour gagner quelques Ko sans changer le rendu visible.
 * Exécuter après mise à jour du visuel : npm run optimize:hero
 */
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const target = join(root, 'public', 'hero-home.webp');

if (!existsSync(target)) {
	console.log('[optimize:hero] public/hero-home.webp absent — rien à faire.');
	process.exit(0);
}

const input = await readFile(target);
const beforeSize = input.byteLength;
const buf = await sharp(input)
	.webp({ quality: 78, effort: 6, smartSubsample: true })
	.toBuffer();

await writeFile(target, buf);
console.log(`[optimize:hero] public/hero-home.webp réécrit (${beforeSize} → ${buf.byteLength} octets).`);
