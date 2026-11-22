#!/usr/bin/env node
/**
 * Vérifie pages /go/ legacy, routage via /go/<id>/ (sans URL marchande en dur) et tables.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
	countDirectAmazonTagLinks,
	defaultF41DistDir,
	loadLegacyAliases,
	legacyIdSet,
	readF41GoTable,
	slugsFromDist,
} from './go-legacy-lib.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.resolve(process.argv[2] || 'dist');
const f41Dist = process.argv[3] || defaultF41DistDir();
const AMAZON_TAG_MAX = 5;

const f41Table = readF41GoTable(ROOT);
const f41links = f41Table.links || f41Table;

const f41s = slugsFromDist(f41Dist);
const legacy = loadLegacyAliases();
const legacyIds = legacyIdSet();
const curS = slugsFromDist(dist);

let missingPages = [];
let wrongRedirect = [];
let lostSlugs = [];
const legacyLeaks = [];
const goPath = (id) => `/go/${id}/`;

for (const id of f41s) {
	if (curS.has(id)) continue;
	const page = path.join(dist, 'go', id, 'index.html');
	if (!fs.existsSync(page)) {
		missingPages.push(id);
		continue;
	}
	const html = fs.readFileSync(page, 'utf8');
	const route = goPath(id);
	const routeAmp = route.replace(/\//g, '&#x2F;'); // unlikely
	if (!html.includes(route) && !html.includes(route.slice(0, -1))) {
		wrongRedirect.push(id);
	}
	if (/tag=/i.test(html) || /amazon\./i.test(html)) legacyLeaks.push(id);
}

for (const id of legacyIds) {
	const page = path.join(dist, 'go', id, 'index.html');
	if (!fs.existsSync(page)) continue;
	const html = fs.readFileSync(page, 'utf8');
	if (/tag=/i.test(html) || /amazon\./i.test(html)) {
		if (!legacyLeaks.includes(id)) legacyLeaks.push(id);
	}
	const route = goPath(id);
	if (!html.includes(route)) wrongRedirect.push(id);
}

for (const id of f41s) {
	if (!curS.has(id) && !fs.existsSync(path.join(dist, 'go', id, 'index.html'))) {
		lostSlugs.push(id);
	}
}

const tablePath = path.join(ROOT, 'scripts/go-table.json');
const curTable = JSON.parse(fs.readFileSync(tablePath, 'utf8'));
const curlinks = curTable.links || curTable;
let missingTable = 0;
for (const id of f41s) {
	if (!curlinks[id] && !legacy.has(id)) missingTable++;
}
for (const id of legacy.keys()) {
	if (!curlinks[id]?.url || curlinks[id].url !== legacy.get(id).url) missingTable++;
}

const destinationSamples = {};
for (const prefix of ['az-ca-', 'az-gb-', 'az-us-']) {
	const id = [...legacyIds].find((k) => k.startsWith(prefix));
	if (!id) continue;
	destinationSamples[id] = {
		tableUrl: curlinks[id]?.url || null,
		legacyUrl: legacy.get(id)?.url || null,
		match: curlinks[id]?.url === legacy.get(id)?.url,
	};
}

const directAmazon = countDirectAmazonTagLinks(dist);

const report = {
	f41DistSlugs: f41s.size,
	curDistSlugs: curS.size,
	legacyAliases: legacy.size,
	lostSlugs: lostSlugs.length,
	missingGoPages: missingPages.length,
	wrongRedirectUrl: [...new Set(wrongRedirect)].length,
	legacyMerchantLeak: legacyLeaks.length,
	directAmazonTagLinks: directAmazon.count,
	directAmazonTagMax: AMAZON_TAG_MAX,
	destinationSamples,
	missingInGoTable: missingTable,
	directAmazonSamples: directAmazon.samples,
};
console.log(JSON.stringify(report, null, 2));

const fail =
	lostSlugs.length ||
	missingPages.length ||
	wrongRedirect.length ||
	legacyLeaks.length ||
	missingTable ||
	directAmazon.count > AMAZON_TAG_MAX;

if (fail) {
	if (lostSlugs.length) console.error('[verify-go-legacy] slugs perdus:', lostSlugs.slice(0, 20));
	if (missingPages.length) console.error('[verify-go-legacy] pages manquantes:', missingPages.slice(0, 20));
	if (legacyLeaks.length) console.error('[verify-go-legacy] fuite marchande alias:', legacyLeaks.slice(0, 20));
	if (directAmazon.count > AMAZON_TAG_MAX) {
		console.error('[verify-go-legacy] liens Amazon ?tag= directs:', directAmazon.count);
	}
	process.exit(1);
}