/**
 * Ajoute `headline:` juste après `title:` pour les articles sans headline.
 * Heuristique : retirer préfixes série connus pour un H1 plus court ; sinon titre tronqué.
 */
import fs from 'node:fs';
import path from 'node:path';

const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');

const PREFIXES = [
	/^Python — /,
	/^Arduino C — /,
	/^Projet .+? \(\d+\/\d+\) — /,
	/^Projet avancé — Journal CLI — /,
	/^Projet intermédiaire — Agenda CLI — /,
];

function deriveHeadline(title) {
	let h = title.trim();
	for (const re of PREFIXES) {
		if (re.test(h)) {
			h = h.replace(re, '').trim();
			break;
		}
	}
	/* Garder une longueur raisonnable pour le hero */
	if (h.length > 95) {
		const cut = h.slice(0, 92).lastIndexOf(' ');
		h = (cut > 40 ? h.slice(0, cut) : h.slice(0, 92)) + '…';
	}
	return h;
}

function extractTitleLine(fm) {
	const m = fm.match(/^title:\s*(.*)$/m);
	if (!m) return null;
	let v = m[1].trim();
	if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
		v = v.slice(1, -1);
	}
	return v;
}

let updated = 0;
for (const file of fs.readdirSync(blogDir).filter((f) => f.endsWith('.md'))) {
	const fp = path.join(blogDir, file);
	let raw = fs.readFileSync(fp, 'utf8');
	const normalized = raw.replace(/\r\n/g, '\n');
	const match = normalized.match(/^---\n([\s\S]*?)\n---/);
	if (!match) continue;
	const fm = match[1];
	if (/^headline:/m.test(fm)) continue;
	const title = extractTitleLine(fm);
	if (!title) continue;
	const headline = deriveHeadline(title);
	const newFm = fm.replace(/^(title:\s*.+)$/m, `$1\nheadline: "${headline.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`);
	const newRaw = normalized.replace(/^---\n[\s\S]*?\n---/, `---\n${newFm}\n---`);
	if (newRaw !== normalized) {
		fs.writeFileSync(fp, raw.includes('\r\n') ? newRaw.replace(/\n/g, '\r\n') : newRaw, 'utf8');
		updated++;
	}
}

console.log(`Headlines ajoutés : ${updated} fichier(s).`);
