#!/usr/bin/env node
/**
 * Avant go-links : corrige les URL dans scripts/go-table.json sans supprimer d'id.
 * — tag ES roboteducat0c-21 → roboteducat07-21
 * — amazon.com.be → amazon.fr (même id)
 * — débris JSON (#x26;tag, "}, etc.) sur les URL Amazon
 * — conversion /s?k= → /dp/ (apply-go-table-search-dp.mjs)
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { legacyIdSet } from './go-legacy-lib.mjs';

const LEGACY_IDS = legacyIdSet();
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

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
	if (LEGACY_IDS.has(id) || entry?.legacyAlias) continue;
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
		const next = `https://${host}/dp/${encodeURIComponent(asin)}?tag=${encodeURIComponent(tag)}`;
		if (next !== entry.url) {
			entry.url = next;
			entry.tag = tag;
			fixed++;
		}
	}
}

data.updated = new Date().toISOString();
data.count = Object.keys(links).length;
if (!data.links) data.links = links;
fs.writeFileSync(TABLE_FILE, JSON.stringify(data, null, 1) + '\n');

const apply = spawnSync(process.execPath, ['scripts/apply-go-table-search-dp.mjs'], {
	cwd: ROOT,
	encoding: 'utf8',
});
if (apply.status !== 0) {
	console.error(apply.stdout || apply.stderr);
	process.exit(apply.status ?? 1);
}

const after = JSON.parse(fs.readFileSync(TABLE_FILE, 'utf8'));
const idCountAfter = Object.keys(after.links || after).length;
if (idCountAfter + removed < idCountBefore - 500) {
	console.error('[sanitize-go-table] ERREUR : perte massive d’ids');
	process.exit(1);
}
const MIN_IDS = 1400;
if (idCountAfter < MIN_IDS) {
	console.error(`[sanitize-go-table] ERREUR : count ${idCountAfter} < ${MIN_IDS}`);
	process.exit(1);
}

let searchLeft = 0;
for (const e of Object.values(after.links || after)) {
	if (/\/s\?k=/i.test(e?.url || '')) searchLeft++;
}
if (searchLeft) {
	console.error(`[sanitize-go-table] ERREUR : ${searchLeft} URL recherche restantes`);
	process.exit(1);
}

console.log(`[sanitize-go-table] ${fixed} entrées corrigées, ${idCountAfter} ids, recherche restante 0`);