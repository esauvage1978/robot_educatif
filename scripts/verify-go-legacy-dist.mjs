#!/usr/bin/env node
/**
 * Vérifie que chaque slug /go/ du dist f41bd1e a une page dist/go/<id>/index.html
 * pointant vers la même URL Amazon/Awin que dans go-table f41.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
	defaultF41DistDir,
	loadLegacyAliases,
	readF41GoTable,
	slugsFromDist,
} from './go-legacy-lib.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.resolve(process.argv[2] || 'dist');
const f41Dist = process.argv[3] || defaultF41DistDir();

const f41Table = readF41GoTable(ROOT);
const f41links = f41Table.links || f41Table;

const f41s = slugsFromDist(f41Dist);
const legacy = loadLegacyAliases();
const curS = slugsFromDist(dist);

let missingPages = [];
let wrongUrl = [];
let lostSlugs = [];

for (const id of f41s) {
	if (curS.has(id)) continue;
	const expect = f41links[id]?.url;
	if (!expect) continue;
	const page = path.join(dist, 'go', id, 'index.html');
	if (!fs.existsSync(page)) {
		missingPages.push(id);
		continue;
	}
	const html = fs.readFileSync(page, 'utf8');
	const amp = expect.replace(/&/g, '&amp;');
	if (!html.includes(expect) && !html.includes(amp)) wrongUrl.push(id);
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

const report = {
	f41DistSlugs: f41s.size,
	curDistSlugs: curS.size,
	legacyAliases: legacy.size,
	lostSlugs: lostSlugs.length,
	missingGoPages: missingPages.length,
	wrongRedirectUrl: wrongUrl.length,
	missingInGoTable: missingTable,
};
console.log(JSON.stringify(report, null, 2));

if (lostSlugs.length || missingPages.length || wrongUrl.length || missingTable) {
	if (lostSlugs.length) console.error('[verify-go-legacy] slugs perdus:', lostSlugs.slice(0, 20));
	if (missingPages.length) console.error('[verify-go-legacy] pages manquantes:', missingPages.slice(0, 20));
	process.exit(1);
}