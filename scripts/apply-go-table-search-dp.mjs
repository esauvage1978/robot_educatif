#!/usr/bin/env node
/**
 * Remplace les URL /s?k= dans go-table.json par /dp/ASIN quand un produit est identifiable.
 * Supprime les entrées sans produit réel (sauf alias legacy).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { legacyIdSet } from './go-legacy-lib.mjs';
import {
	buildSearchAsinIndex,
	resolveSearchQuery,
	isGenericPythonBookQuery,
} from './lib/amazon-search-resolve.mjs';

const LEGACY_IDS = legacyIdSet();
const TABLE_FILE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'go-table.json');
const TAGS = {
	'www.amazon.fr': 'manuso06-21',
	'www.amazon.co.uk': 'roboteducatif-21',
	'www.amazon.com': 'roboteducatif-20',
	'www.amazon.ca': 'roboteducat03-20',
	'www.amazon.de': 'roboteducat00-21',
	'www.amazon.it': 'roboteducat0f-21',
	'www.amazon.es': 'roboteducat07-21',
	'www.amazon.nl': 'manuso0607-21',
};

const data = JSON.parse(fs.readFileSync(TABLE_FILE, 'utf8'));
const links = data.links || data;
const index = buildSearchAsinIndex();
const stats = { converted: 0, removed: 0, keptSearch: 0 };

function dpUrl(hostname, asin, tag) {
	const h = hostname.startsWith('www.') ? hostname : `www.${hostname}`;
	const t = tag || TAGS[h] || '';
	return `https://${h}/dp/${encodeURIComponent(asin)}${t ? `?tag=${encodeURIComponent(t)}` : ''}`;
}

for (const [id, entry] of Object.entries({ ...links })) {
	if (entry?.legacyAlias) continue;
	const isLegacy = LEGACY_IDS.has(id);
	const url = entry?.url || '';
	if (!/\/s\?k=/i.test(url)) continue;
	const k = decodeURIComponent((url.match(/[?&]k=([^&#]+)/i) || [])[1] || '');
	const asin = resolveSearchQuery(k, index);
	let host;
	try {
		host = new URL(url).hostname;
	} catch {
		continue;
	}
	if (asin && !isGenericPythonBookQuery(k)) {
		const tag = entry.tag || TAGS[host.startsWith('www.') ? host : `www.${host}`] || '';
		entry.url = dpUrl(host, asin, tag);
		if (tag) entry.tag = tag;
		stats.converted++;
		continue;
	}

	delete links[id];
	stats.removed++;
}

if (stats.removed > 0) {
	console.warn(`[apply-go-table-search-dp] ${stats.removed} ids supprimés (sans ASIN)`);
}

data.updated = new Date().toISOString();
data.count = Object.keys(links).length;
if (!data.links) data.links = links;
fs.writeFileSync(TABLE_FILE, JSON.stringify(data, null, 1) + '\n');

let searchLeft = 0;
for (const e of Object.values(links)) {
	if (/\/s\?k=/i.test(e?.url || '')) searchLeft++;
}
stats.keptSearch = searchLeft;
console.log(JSON.stringify(stats, null, 2));
if (searchLeft > 0) {
	console.error('[apply-go-table-search-dp] URL recherche restantes:', searchLeft);
	process.exit(1);
}