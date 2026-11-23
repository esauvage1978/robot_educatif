#!/usr/bin/env node
/**
 * Balise les HTML du dist pour filtrer la recherche UK/CA/EN (Pagefind `data-pagefind-filter`).
 */
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = process.argv[2] || 'dist';

const PREFIXES = [
	{ prefix: 'uk', market: 'uk' },
	{ prefix: 'ca', market: 'ca' },
	{ prefix: 'en', market: 'en' },
];

function walkHtml(dir, out = []) {
	if (!existsSync(dir)) return out;
	for (const name of readdirSync(dir)) {
		const p = join(dir, name);
		if (statSync(p).isDirectory()) walkHtml(p, out);
		else if (name.endsWith('.html')) out.push(p);
	}
	return out;
}

function tagFile(file, market) {
	let html = readFileSync(file, 'utf8');
	if (html.includes(`data-pagefind-filter="market:${market}"`)) return false;
	const filterAttr = `data-pagefind-filter="market:${market}"`;
	if (/<html\b[^>]*data-pagefind-filter=/i.test(html)) return false;
	const next = html.replace(/<html\b/i, `<html ${filterAttr}`);
	if (next === html) return false;
	writeFileSync(file, next);
	return true;
}

let touched = 0;
for (const { prefix, market } of PREFIXES) {
	const root = join(dist, prefix);
	for (const file of walkHtml(root)) {
		if (tagFile(file, market)) touched++;
	}
}

console.log(`[tag-pagefind-market-dist] ${touched} fichiers balisés (market en/uk/ca)`);