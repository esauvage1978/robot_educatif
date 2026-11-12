#!/usr/bin/env node
/**
 * Duplique les entrées /en/ du sitemap vers /uk/ et /en-CA (/ca/) pour l’indexation UK/CA.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dist = process.argv[2] || 'dist';
const site = 'https://robot-educatif.info';

function patchFile(filePath) {
	let xml = readFileSync(filePath, 'utf8');
	const inserts = [];
	const re = /<loc>(https:\/\/robot-educatif\.info\/en\/[^<]+)<\/loc>/g;
	let m;
	while ((m = re.exec(xml)) !== null) {
		const enUrl = m[1];
		const ukUrl = enUrl.replace('/en/', '/uk/');
		const caUrl = enUrl.replace('/en/', '/ca/');
		if (!xml.includes(`<loc>${ukUrl}</loc>`)) {
			inserts.push(`  <url><loc>${ukUrl}</loc></url>`);
		}
		if (!xml.includes(`<loc>${caUrl}</loc>`)) {
			inserts.push(`  <url><loc>${caUrl}</loc></url>`);
		}
	}
	if (inserts.length) {
		xml = xml.replace('</urlset>', inserts.join('\n') + '\n</urlset>');
		writeFileSync(filePath, xml);
		console.log(filePath, '+', inserts.length, 'urls');
	}
}

for (const name of readdirSync(dist)) {
	if (name.startsWith('sitemap') && name.endsWith('.xml')) {
		patchFile(join(dist, name));
	}
}
