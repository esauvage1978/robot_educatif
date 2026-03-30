/**
 * Vérifie que les visuels du tutoriel mBlock sont bien dans public/
 * (SVG pour la plupart des étapes ; PNG pour les captures réelles).
 */
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, '..', 'public', 'images', 'blog', 'installer-mblock');

const svgFiles = [
	'ecran-02-explorateur-exe.svg',
	'ecran-03-uac.svg',
	'ecran-04-langue.svg',
	'ecran-05-dossier-destination.svg',
	'ecran-06-menu-demarrer.svg',
	'ecran-07-raccourci-bureau.svg',
	'ecran-08-pret-installer.svg',
];

const pngFiles = [
	'ecran-01-page-makeblock.png',
	'ecran-09-progression.png',
	'ecran-10-termine.png',
];

let ok = true;
for (const f of pngFiles) {
	const p = path.join(dir, f);
	if (!existsSync(p)) {
		console.error(`[verify] Manquant : ${p}`);
		ok = false;
	}
}
for (const f of svgFiles) {
	const p = path.join(dir, f);
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
if (!ok) {
	process.exit(1);
}
console.log(`[verify] OK — ${pngFiles.length} PNG + ${svgFiles.length} SVG dans public/images/blog/installer-mblock/`);
