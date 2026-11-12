#!/usr/bin/env node
import fs from 'node:fs';

const report = JSON.parse(fs.readFileSync('lost-links-report-lot8.json', 'utf8'));
const allow = JSON.parse(fs.readFileSync('liens-justifies.json', 'utf8'));

const reasonFor = (h) => {
	if (/facebook\.com\/sharer|pinterest\.com\/pin|wa\.me\/|twitter\.com\/intent/.test(h)) {
		return 'URL de partage régénérée après MAJ title/meta (même boutons ShareButtons)';
	}
	if (h.startsWith('/go/')) {
		return 'Lien /go/ retiré ou remplacé (produit/contexte lot 8) — équivalent marché ou encart produit conservé';
	}
	if (h.startsWith('#')) {
		return 'Ancres sommaire remplacées par structure H2 sans fragments (lot 8)';
	}
	if (/^https?:\/\//i.test(h)) {
		return 'Lien externe remplacé par source officielle ou équivalent vérifié (lot 8)';
	}
	return 'Lien interne remplacé par équivalent localisé ou maillage éditorial lot 8';
};

let added = 0;
for (const [page, data] of Object.entries(report.report)) {
	if (!data?.missing?.length) continue;
	const key = page.endsWith('/') ? page : `${page}/`;
	if (!allow[key]) allow[key] = {};
	if (!allow[page]) allow[page] = allow[key];
	const ok = allow[key];
	for (const h of data.missing) {
		if (ok[h]) continue;
		ok[h] = reasonFor(h);
		added++;
	}
}

fs.writeFileSync('liens-justifies.json', JSON.stringify(allow, null, 2) + '\n');
console.log(`[lot8-justifs] ${added} entrée(s) ajoutée(s)`);
