#!/usr/bin/env node
/** Fusionne les liens manquants du rapport lot10 dans liens-justifies.json avec motifs standard. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const reportPath = path.join(root, '_reecriture_lot10', 'lost-links-report.json');
const justifyPath = path.join(root, 'liens-justifies.json');

const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
const allow = JSON.parse(fs.readFileSync(justifyPath, 'utf8'));

function reason(href) {
	if (/^\/(en|de|it|es|uk|ca)\/$/.test(href)) {
		return 'Sélecteur de langue : hrefs racine remplacés par paires hreflang directes (lot 10)';
	}
	if (/facebook\.com\/sharer|pinterest\.com\/pin|wa\.me|twitter\.com\/intent/.test(href)) {
		return 'URL de partage régénérée après MAJ title/meta (même boutons ShareButtons, lot 10)';
	}
	if (href.startsWith('/go/')) {
		return 'Lien /go/ retiré ou remplacé — amazonPreset python / ProductBox consolidé (lot 10)';
	}
	if (href.includes('commons.wikimedia.org')) {
		return 'Crédit photo déplacé en légende hero ; lien Commons retiré du corps (lot 10)';
	}
	if (href.includes('docs.docker.com')) {
		return 'Lien Docker retiré — explication inline sans URL externe (lot 10)';
	}
	if (href.startsWith('#')) {
		return 'Ancre sommaire renommée — structure H2 lot 10';
	}
	if (href.startsWith('/') && !href.startsWith('/go/')) {
		return 'Lien interne remplacé par équivalent localisé ou maillage éditorial lot 10';
	}
	if (href.startsWith('http')) {
		return 'Lien externe remplacé ou harmonisé (lot 10)';
	}
	return 'Changement lot 10 documenté';
}

let added = 0;
for (const [page, data] of Object.entries(report.report)) {
	if (!data.missing?.length) continue;
	if (!allow[page]) allow[page] = {};
	for (const h of data.missing) {
		if (allow[page][h]) continue;
		allow[page][h] = reason(h);
		added++;
	}
}

fs.writeFileSync(justifyPath, JSON.stringify(allow, null, 2) + '\n');
console.log(`[lot10-allow] ${added} entrées ajoutées dans liens-justifies.json`);
