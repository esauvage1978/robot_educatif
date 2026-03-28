/**
 * Régénère favicon.png et apple-touch-icon.png à partir de public/favicon.svg
 * (après modification du SVG : npm run generate:favicon)
 */
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const svg = readFileSync(join(root, 'public', 'favicon.svg'));

await sharp(svg).resize(32, 32).png().toFile(join(root, 'public', 'favicon.png'));
await sharp(svg).resize(180, 180).png().toFile(join(root, 'public', 'apple-touch-icon.png'));

console.log('public/favicon.png (32) et public/apple-touch-icon.png (180) mis à jour.');
