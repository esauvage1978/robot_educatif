#!/usr/bin/env node
/**
 * Avant go-links : corrige les URL dans scripts/go-table.json sans supprimer d'id.
 * — tag ES roboteducat0c-21 → roboteducat07-21
 * — amazon.com.be → amazon.fr (même id)
 * — débris JSON (#x26;tag, "}, etc.) sur les URL Amazon
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const TABLE_FILE = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	'go-table.json',
);

const data = JSON.parse(fs.readFileSync(TABLE_FILE, 'utf8'));
const links = data.links || data;
const idCountBefore = Object.keys(links).length;
let fixed = 0;

function cleanAmazonUrl(url) {
	let u = url;
	let changed = false;
	if (u.includes('roboteducat0c-21')) {
		u = u.replaceAll('roboteducat0c-21', 'roboteducat07-21');
		changed = true;
	}
	if (/amazon\.com\.be/i.test(u)) {
		u = u.replace(/(?:www\.)?amazon\.com\.be/gi, 'www.amazon.fr');
		changed = true;
	}
	if (/#x26;tag=/i.test(u)) {
		u = u.replace(/#x26;tag=[^#&]*/gi, '');
		changed = true;
	}
	const tagIdx = u.search(/([?&]tag=)/);
	if (tagIdx >= 0) {
		const head = u.slice(0, tagIdx);
		const tail = u.slice(tagIdx);
		const tm = tail.match(/^([?&]tag=)([^&#"'}\s]+)/);
		if (tm && /["},]/.test(tm[2])) {
			u = head + tm[1] + tm[2].split(/["},]/)[0] + tail.slice(tm[0].length);
			changed = true;
		}
	}
	return { url: u, changed };
}

for (const [id, entry] of Object.entries(links)) {
	if (!entry?.url) continue;
	const { url, changed } = cleanAmazonUrl(entry.url);
	if (!changed) continue;
	entry.url = url;
	if (entry.tag === 'roboteducat0c-21') entry.tag = 'roboteducat07-21';
	fixed++;
}

const idCountAfter = Object.keys(links).length;
if (idCountAfter < idCountBefore) {
	console.error('[sanitize-go-table] ERREUR : perte d’ids');
	process.exit(1);
}
if (idCountAfter < 2052) {
	console.error(`[sanitize-go-table] ERREUR : count ${idCountAfter} < 2052`);
	process.exit(1);
}

data.updated = new Date().toISOString();
data.count = idCountAfter;
if (!data.links) data.links = links;
fs.writeFileSync(TABLE_FILE, JSON.stringify(data, null, 1) + '\n');
console.log(`[sanitize-go-table] ${fixed} entrées corrigées, ${idCountAfter} ids (min 2052)`);