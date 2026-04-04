/**
 * Vérifie les visuels référencés par installer-mblock-5-sous-windows-10.md
 * (page + UAC dans public/images/blog/installer-mblock ; captures + exe optionnel dans public/capture/...).
 */
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..', 'public');
const imgDir = path.join(root, 'images', 'blog', 'installer-mblock');
const captureDir = path.join(root, 'capture', 'installer-mblock-5-sous-windows-10');

const pngBlog = ['ecran-01-page-makeblock.png'];
const svgBlog = ['ecran-03-uac.svg'];
const pngCapture = [
	'explorateur_telechargement.png',
	'installation_fin.png',
	'taille-dossier-mblock-apres-install.png',
];

let ok = true;
for (const f of pngBlog) {
	const p = path.join(imgDir, f);
	if (!existsSync(p)) {
		console.error(`[verify] Manquant : ${p}`);
		ok = false;
	}
}
for (const f of pngCapture) {
	const p = path.join(captureDir, f);
	if (!existsSync(p)) {
		console.error(`[verify] Manquant : ${p}`);
		ok = false;
	}
}
for (const f of svgBlog) {
	const p = path.join(imgDir, f);
	if (!existsSync(p)) {
		console.error(`[verify] Manquant : ${p}`);
		ok = false;
		continue;
	}
	const buf = readFileSync(p);
	for (let i = 0; i < buf.length; i++) {
		const b = buf[i];
		if (b < 32 && b !== 9 && b !== 10 && b !== 13) {
			console.error(`[verify] Octet XML interdit 0x${b.toString(16)} dans ${f} (offset ${i}) — lancer node scripts/fix-svg-control-chars.mjs`);
			ok = false;
			break;
		}
	}
	if (!ok) continue;
	try {
		new TextDecoder('utf-8', { fatal: true }).decode(buf);
	} catch {
		console.error(`[verify] UTF-8 invalide dans ${f} — lancer node scripts/normalize-svg-utf8.mjs`);
		ok = false;
	}
}

const exePath = path.join(captureDir, 'V5.6.0.exe');
if (!existsSync(exePath)) {
	console.warn(`[verify] Optionnel absent (lien secours article) : ${exePath}`);
}

if (!ok) {
	process.exit(1);
}
console.log(
	`[verify] OK — ${pngBlog.length} PNG + ${svgBlog.length} SVG (installer-mblock) + ${pngCapture.length} PNG (capture/installer-mblock-5-sous-windows-10).`,
);
