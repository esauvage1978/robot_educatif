#!/usr/bin/env node
/**
 * Remplace les liens Amazon /s?k= dans src par /dp/ASIN, ou retire le lien si aucun produit.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
	buildSearchAsinIndex,
	resolveSearchQuery,
	isGenericPythonBookQuery,
} from './lib/amazon-search-resolve.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src');
const INDEX = buildSearchAsinIndex();
const TAGS = {
	'amazon.fr': 'manuso06-21',
	'amazon.co.uk': 'roboteducatif-21',
	'amazon.com': 'roboteducatif-20',
	'amazon.ca': 'roboteducat03-20',
	'amazon.de': 'roboteducat00-21',
	'amazon.it': 'roboteducat0f-21',
	'amazon.es': 'roboteducat07-21',
	'amazon.nl': 'manuso0607-21',
};

const SEARCH_LINK =
	/<a\b([^>]*)\bhref=(["'])(https?:\/\/[^"']*amazon\.[a-z.]+\/s\?k=[^"']+)\2([^>]*)>([\s\S]*?)<\/a>/gi;

function walk(dir, acc = []) {
	for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
		const p = path.join(dir, e.name);
		if (e.name === 'node_modules' || e.name === 'dist') continue;
		if (e.isDirectory()) walk(p, acc);
		else if (/\.(md|mdx|astro|mjs|ts|tsx)$/i.test(e.name)) acc.push(p);
	}
	return acc;
}

function fixUrl(href) {
	let u;
	try {
		u = new URL(href);
	} catch {
		return null;
	}
	const k = decodeURIComponent(u.searchParams.get('k') || '');
	if (!k) return null;
	if (isGenericPythonBookQuery(k)) return null;
	const asin = resolveSearchQuery(k, INDEX);
	if (!asin) return null;
	const host = u.hostname;
	const tld = host.replace(/^www\./, '');
	const tag = u.searchParams.get('tag') || TAGS[tld] || '';
	const pathAsin = `/dp/${asin}`;
	u.pathname = pathAsin;
	u.search = tag ? `?tag=${encodeURIComponent(tag)}` : '';
	return u.toString();
}

let filesChanged = 0;
let converted = 0;
let stripped = 0;

for (const file of walk(SRC)) {
	let text = fs.readFileSync(file, 'utf8');
	const before = text;
	text = text.replace(SEARCH_LINK, (full, _a, _q, href, _b, inner) => {
		const next = fixUrl(href);
		if (next) {
			converted++;
			return `<a href="${next}" rel="sponsored nofollow noopener" target="_blank">${inner}</a>`;
		}
		stripped++;
		return inner.trim() || '';
	});
	text = text.replace(
		/\[([^\]]*)\]\((https?:\/\/[^)\s]*amazon\.[^)\s]*\/s\?k=[^)]+)\)/gi,
		(full, label, href) => {
			const next = fixUrl(href);
			if (next) {
				converted++;
				return `[${label}](${next})`;
			}
			stripped++;
			return label;
		},
	);
	if (text !== before) {
		fs.writeFileSync(file, text, 'utf8');
		filesChanged++;
	}
}

console.log(JSON.stringify({ filesChanged, converted, stripped }, null, 2));