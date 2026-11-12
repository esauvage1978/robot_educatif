#!/usr/bin/env node
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mapping = JSON.parse(readFileSync(resolve(root, 'RAPPORT-TRAD-MAPPING-20261030.json'), 'utf8'));

function bodyLen(path) {
	const full = resolve(root, path);
	if (!existsSync(full)) return 0;
	let body = readFileSync(full, 'utf8').replace(/^---[\s\S]*?---\s*/, '');
	if (path.endsWith('.astro')) {
		body = body
			.replace(/<style[\s\S]*?<\/style>/gi, '')
			.replace(/<\/?(?:html|head|body|main|nav|header|footer|div|span|ol|ul|li|table|thead|tbody|tr|th|td|img|pre|code|a|p|h[1-6]|blockquote|strong|em)[^>]*>/gi, ' ')
			.replace(/\{[\s\S]*?\}/g, ' ')
			.replace(/\s+/g, ' ')
			.trim();
	}
	return body.length;
}

const rows = [];
for (const e of mapping) {
	const fr = bodyLen(e.fr);
	for (const lang of ['en', 'de', 'it', 'es']) {
		if (!e[lang]) continue;
		const tr = bodyLen(e[lang]);
		const ratio = fr ? Math.round((1000 * tr) / fr) / 10 : 0;
		const rel = e[lang].replace(/\\/g, '/').replace(/^src\/pages\//, '').replace(/\.md$/, '');
		rows.push({
			lang,
			url: `https://robot-educatif.info/${rel}/`,
			ratio,
			fr,
			tr,
			path: e[lang],
		});
	}
}

rows.sort((a, b) => a.lang.localeCompare(b.lang) || a.url.localeCompare(b.url));
const avg = Math.round((10 * rows.reduce((s, r) => s + r.ratio, 0)) / rows.length) / 10;
const min = Math.min(...rows.map((r) => r.ratio));

let md = '';
for (const lang of ['en', 'de', 'it', 'es']) {
	const subset = rows.filter((r) => r.lang === lang);
	md += `\n### ${lang.toUpperCase()} (${subset.length})\n\n| URL | Ratio |\n|---|---:|\n`;
	for (const r of subset) md += `| ${r.url} | ${r.ratio} % |\n`;
}

writeFileSync(resolve(root, '_ratios-table.md'), md);
writeFileSync(resolve(root, '_ratios-rows.json'), JSON.stringify({ avg, min, count: rows.length, rows }, null, 2));
console.log(`pages=${rows.length} avg=${avg} min=${min}`);
