#!/usr/bin/env node
/**
 * Compte les blocs CTA GSC (pick / table / conclusion) par page dans dist.
 * Usage: node scripts/count-gsc-intent-ctas.mjs [dist]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GSC_INTENT_PATHS } from '../src/data/gscIntentPageConfig.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.resolve(root, process.argv[2] || 'dist');

function walk(dir, acc = []) {
	for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, ent.name);
		if (ent.isDirectory()) walk(full, acc);
		else if (ent.name === 'index.html') acc.push(full);
	}
	return acc;
}

const paths = Object.keys(GSC_INTENT_PATHS);
const rows = [];

for (const urlPath of paths) {
	const rel = urlPath.replace(/^\//, '').replace(/\/$/, '');
	const file = path.join(dist, rel, 'index.html');
	if (!fs.existsSync(file)) {
		rows.push({ path: urlPath, pick: 0, table: 0, conclusion: 0, note: 'missing' });
		continue;
	}
	const html = fs.readFileSync(file, 'utf8');
	const pick = (html.match(/class="gsc-intent-pick"/g) || []).length;
	const table =
		(html.match(/class="gsc-intent-table"/g) || []).length +
		(html.match(/class="comparison-container"/g) || []).length;
	const conclusion = (html.match(/class="gsc-intent-conclusion"/g) || []).length;
	rows.push({ path: urlPath, pick, table, conclusion, note: 'ok' });
}

console.log(JSON.stringify({ totalPaths: paths.length, rows }, null, 2));