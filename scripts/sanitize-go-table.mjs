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
import { searchUrlForAsin } from './asin-search-queries.mjs';

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
	if (/amazon\.it/i.test(u)) {
		const prev = u;
		u = u.replace(/([?&]tag=)roboteducatif-21/g, '$1roboteducat0f-21');
		u = u.replace(/([?&]tag=)roboteducat00-21/g, '$1roboteducat0f-21');
		if (u !== prev) changed = true;
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

/** Ids US hors prod, suppression explicite autorisée (revue v3). */
const REMOVABLE_IDS = ['az-us-1ff0be97a8'];
let removed = 0;
for (const id of REMOVABLE_IDS) {
	if (links[id]) {
		delete links[id];
		removed++;
		fixed++;
	}
}

for (const [id, entry] of Object.entries(links)) {
	if (!entry?.url) continue;
	const { url, changed } = cleanAmazonUrl(entry.url);
	if (changed) {
		entry.url = url;
		if (entry.tag === 'roboteducat0c-21') entry.tag = 'roboteducat07-21';
		if (/amazon\.it/i.test(entry.url) && (entry.tag === 'roboteducatif-21' || entry.tag === 'roboteducat00-21')) {
			entry.tag = 'roboteducat0f-21';
		}
		fixed++;
	}
	if (/k=product%20B0/i.test(entry.url)) {
		const asin = decodeURIComponent(entry.url.match(/k=product%20([^&]+)/i)?.[1] || '');
		const host = /amazon\.ca/i.test(entry.url) ? 'www.amazon.ca' : 'www.amazon.com';
		const tag = /amazon\.ca/i.test(entry.url) ? 'roboteducat03-20' : 'roboteducatif-20';
		const next = searchUrlForAsin(host, tag, asin);
		if (next && next !== entry.url) {
			entry.url = next;
			entry.tag = tag;
			fixed++;
		}
	}
	if (!/^az-(us|ca)-/.test(id) || !/\/dp\//i.test(entry.url)) continue;
	const m = entry.url.match(/\/\/(www\.)?amazon\.(com|ca)\/dp\/([^?/]+)/i);
	if (!m) continue;
	const host = `www.amazon.${m[2].toLowerCase()}`;
	const tag = m[2].toLowerCase() === 'ca' ? 'roboteducat03-20' : 'roboteducatif-20';
	const next = searchUrlForAsin(host, tag, m[3]);
	if (next !== entry.url) {
		entry.url = next;
		entry.tag = tag;
		fixed++;
	}
}

const idCountAfter = Object.keys(links).length;
if (idCountAfter + removed < idCountBefore) {
	console.error('[sanitize-go-table] ERREUR : perte d’ids inattendue');
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