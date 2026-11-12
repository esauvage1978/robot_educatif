#!/usr/bin/env node
/** Compare body length of FR sources vs EN/DE/IT/ES targets from RAPPORT-TRAD-MAPPING-20261030.json */
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mapping = JSON.parse(readFileSync(resolve(root, 'RAPPORT-TRAD-MAPPING-20261030.json'), 'utf8'));

function bodyLen(path) {
	const full = resolve(root, path);
	if (!existsSync(full)) return { ok: false, len: 0 };
	let body = readFileSync(full, 'utf8').replace(/^---[\s\S]*?---\s*/, '');
	// Hub Astro FR : ignorer CSS / imports pour comparer le contenu pédagogique
	if (path.endsWith('.astro')) {
		body = body
			.replace(/<style[\s\S]*?<\/style>/gi, '')
			.replace(/<\/?(?:html|head|body|main|nav|header|footer|div|span|ol|ul|li|table|thead|tbody|tr|th|td|img|pre|code|a|p|h[1-6]|blockquote|strong|em)[^>]*>/gi, ' ')
			.replace(/\{[\s\S]*?\}/g, ' ')
			.replace(/\s+/g, ' ')
			.trim();
	}
	return { ok: true, len: body.length };
}

const rows = [];
for (const entry of mapping) {
	const fr = bodyLen(entry.fr);
	for (const lang of ['en', 'de', 'it', 'es']) {
		if (!entry[lang]) continue;
		const tr = bodyLen(entry[lang]);
		const ratio = fr.len ? Math.round((1000 * tr.len) / fr.len) / 10 : 0;
		rows.push({
			lang,
			path: entry[lang],
			frLen: fr.len,
			trLen: tr.len,
			ratio,
			ok: tr.ok && ratio >= 85,
		});
	}
}

rows.sort((a, b) => a.ratio - b.ratio);
const fail = rows.filter((r) => !r.ok);
console.log(`Total: ${rows.length} | OK≥85%: ${rows.length - fail.length} | FAIL: ${fail.length}`);
console.log('\nWorst 30:');
for (const r of rows.slice(0, 30)) {
	console.log(`${String(r.ratio).padStart(6)}%  ${r.trLen}/${r.frLen}  ${r.path}`);
}
if (fail.length) {
	console.log('\nFAIL list:');
	for (const r of fail) console.log(`${r.ratio}%  ${r.path}`);
}
process.exit(fail.length ? 1 : 0);
