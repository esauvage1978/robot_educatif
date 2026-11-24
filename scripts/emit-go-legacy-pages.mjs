#!/usr/bin/env node
/**
 * Génère dist/go/<id>/index.html pour chaque alias legacy (redirection via meta refresh).
 * Complète aussi tout slug /go/ présent dans le dist f41bd1e mais absent du HTML courant.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
	defaultF41DistDir,
	legacyGoPageHtml,
	loadLegacyAliases,
	readF41GoTable,
	slugsFromDist,
} from './go-legacy-lib.mjs';
import {
	buildSearchAsinIndex,
	isGenericPythonBookQuery,
	resolveSearchQuery,
} from './lib/amazon-search-resolve.mjs';

const SEARCH_INDEX = buildSearchAsinIndex();
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

function legacyUrlToDp(url) {
	if (!/\/s\?k=/i.test(url)) return url;
	try {
		const u = new URL(url);
		const k = decodeURIComponent(u.searchParams.get('k') || '');
		if (!k || isGenericPythonBookQuery(k)) return null;
		const asin = resolveSearchQuery(k, SEARCH_INDEX);
		if (!asin) return null;
		const host = u.hostname;
		const tag = u.searchParams.get('tag') || TAGS[host] || '';
		u.pathname = `/dp/${asin}`;
		u.search = tag ? `?tag=${encodeURIComponent(tag)}` : '';
		return u.toString();
	} catch {
		return url;
	}
}

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.resolve(process.argv[2] || 'dist');
const f41Dist = process.argv[3] || defaultF41DistDir();
const legacy = loadLegacyAliases();

const f41Table = readF41GoTable(ROOT);
const f41links = f41Table.links || f41Table;

const f41s = slugsFromDist(f41Dist);
const curS = slugsFromDist(dist);
const toEmit = new Map(legacy);
for (const id of f41s) {
	if (curS.has(id) || toEmit.has(id)) continue;
	const e = f41links[id];
	if (e?.url) toEmit.set(id, { ...e, legacyAlias: true });
}

let written = 0;
for (const [id, entry] of toEmit) {
	if (!entry?.url || !/^https:\/\//i.test(entry.url)) continue;
	const dp = legacyUrlToDp(entry.url);
	if (dp === null) continue;
	if (dp !== entry.url) entry.url = dp;
	const dir = path.join(dist, 'go', id);
	fs.mkdirSync(dir, { recursive: true });
	fs.writeFileSync(path.join(dir, 'index.html'), legacyGoPageHtml(id));
	written++;
}

// Réinjecte les entrées manquantes dans scripts/go-table.json et dist/go-table.php
const tablePath = path.join(ROOT, 'scripts/go-table.json');
const table = JSON.parse(fs.readFileSync(tablePath, 'utf8'));
const links = table.links || table;
let patched = 0;
for (const [id, entry] of toEmit) {
	if (!entry?.url) continue;
	if (/\/s\?k=/i.test(entry.url)) continue;
	const cur = links[id];
	if (cur?.url && /\/dp\//i.test(cur.url) && /\/s\?k=/i.test(entry.url)) continue;
	if (links[id]?.url === entry.url) continue;
	const row = { ...entry };
	delete row.legacyAlias;
	links[id] = row;
	patched++;
}
if (patched) {
	table.links = links;
	table.count = Object.keys(links).length;
	table.updated = new Date().toISOString();
	fs.writeFileSync(tablePath, JSON.stringify(table, null, 1) + '\n');
	const phpPath = path.join(dist, 'go-table.php');
	if (fs.existsSync(phpPath)) {
		let php = fs.readFileSync(phpPath, 'utf8');
		for (const [id, entry] of toEmit) {
			if (!links[id]) continue;
			const row = { ...links[id] };
			const snippet =
				`  '${id.replace(/'/g, "\\'")}' => [` +
				Object.entries(row)
					.map(([k, v]) => `'${k}' => '${String(v).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`)
					.join(', ') +
				']';
			if (!php.includes(`'${id}'`)) php = php.replace(/\n];\n$/, `,\n${snippet}\n];\n`);
		}
		fs.writeFileSync(phpPath, php);
	}
}

console.log(`[emit-go-legacy-pages] ${written} pages, ${patched} entrée(s) table patchées`);