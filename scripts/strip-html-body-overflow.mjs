#!/usr/bin/env node
/**
 * Retire overflow-x clip/hidden et overflow:hidden des règles html/body dans le CSS inline du dist.
 * Usage: node scripts/strip-html-body-overflow.mjs [distDir] [relListPath]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(process.argv[2] ?? path.join(__dirname, '../dist'));
const relListPath = path.resolve(
	process.argv[3] ?? path.join(__dirname, '../../re-ab-20261104/rel.txt'),
);

const OVERFLOW = /\boverflow-x\s*:\s*(?:clip|hidden)\s*;?|\boverflow\s*:\s*hidden\s*;?/gi;

function stripSelectorBlock(css, selector) {
	const re = new RegExp(`(${selector})\\s*\\{([^}]*)\\}`, 'gi');
	return css.replace(re, (_, sel, inner) => {
		const cleaned = inner.replace(OVERFLOW, '').replace(/;\s*;+/g, ';');
		return `${sel}{${cleaned}}`;
	});
}

export function stripHtmlBodyPageOverflow(css) {
	let next = stripSelectorBlock(css, 'html');
	next = stripSelectorBlock(next, 'body');
	return next;
}

function stripHtmlFile(html) {
	return html.replace(/<style([^>]*)>([\s\S]*?)<\/style>/gi, (full, attrs, inner) => {
		const next = stripHtmlBodyPageOverflow(inner);
		return next === inner ? full : `<style${attrs}>${next}</style>`;
	});
}

function main() {
	const rels = fs.readFileSync(relListPath, 'utf8').split(/\s+/).filter(Boolean);
	let n = 0;
	for (const rel of rels) {
		const f = path.join(distDir, rel, 'index.html');
		if (!fs.existsSync(f)) continue;
		const html = fs.readFileSync(f, 'utf8');
		const next = stripHtmlFile(html);
		if (next !== html) {
			fs.writeFileSync(f, next, 'utf8');
			n++;
		}
	}
	console.log(`[strip-html-body-overflow] ${n} fichier(s) nettoyé(s), dist=${distDir}`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
	main();
}
