/**
 * Normalise tous les SVG (public/ + src/) : déclaration XML UTF-8 + texte en entités numériques
 * pour tout caractère > U+007F. Évite les erreurs « Encoding error » des parseurs XML stricts.
 *
 * Usage : node scripts/normalize-all-svg-xml.mjs
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

/** @param {string} dir */
function collectSvgFiles(dir, out = []) {
	for (const name of readdirSync(dir)) {
		const p = path.join(dir, name);
		if (statSync(p).isDirectory()) collectSvgFiles(p, out);
		else if (name.endsWith('.svg')) out.push(p);
	}
	return out;
}

/** @param {string} s */
function toAsciiNumericEntities(s) {
	let out = '';
	for (let i = 0; i < s.length; ) {
		const cp = s.codePointAt(i);
		if (cp === undefined) break;
		const w = cp > 0xffff ? 2 : 1;
		if (cp < 128) out += s.slice(i, i + w);
		else out += `&#${cp};`;
		i += w;
	}
	return out;
}

const files = [...collectSvgFiles(path.join(root, 'public')), ...collectSvgFiles(path.join(root, 'src'))].sort();

let changed = 0;
for (const p of files) {
	let raw = readFileSync(p, 'utf8');
	const hadBom = raw.charCodeAt(0) === 0xfeff;
	if (hadBom) raw = raw.slice(1);

	let body = raw;
	if (!raw.trimStart().startsWith('<?xml')) {
		body = '<?xml version="1.0" encoding="UTF-8"?>\n' + raw;
	}

	const next = toAsciiNumericEntities(body);

	const unchanged = next === raw && !hadBom && raw.trimStart().startsWith('<?xml');
	if (!unchanged) {
		writeFileSync(p, next, 'utf8');
		changed++;
		console.log('[normalize-all-svg]', path.relative(root, p));
	}
}

console.log(`[normalize-all-svg] ${files.length} fichier(s), ${changed} mis à jour.`);
