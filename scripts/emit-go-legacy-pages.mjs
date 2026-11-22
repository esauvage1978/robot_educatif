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
	loadLegacyAliases,
	readF41GoTable,
	slugsFromDist,
} from './go-legacy-lib.mjs';

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

function esc(s) {
	return String(s)
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/</g, '&lt;');
}

let written = 0;
for (const [id, entry] of toEmit) {
	if (!entry?.url || !/^https:\/\//i.test(entry.url)) continue;
	const dir = path.join(dist, 'go', id);
	fs.mkdirSync(dir, { recursive: true });
	const url = entry.url;
	const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="refresh" content="0;url=${esc(url)}">
<link rel="canonical" href="${esc(url)}">
<meta name="robots" content="noindex,nofollow">
<title>Redirect</title>
<style>body{font-family:system-ui,sans-serif;margin:2rem}a{word-break:break-all}</style>
</head>
<body><p><a href="${esc(url)}" rel="nofollow sponsored noopener">Continue</a></p></body>
</html>
`;
	fs.writeFileSync(path.join(dir, 'index.html'), html);
	written++;
}

// Réinjecte les entrées manquantes dans scripts/go-table.json et dist/go-table.php
const tablePath = path.join(ROOT, 'scripts/go-table.json');
const table = JSON.parse(fs.readFileSync(tablePath, 'utf8'));
const links = table.links || table;
let patched = 0;
for (const [id, entry] of toEmit) {
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