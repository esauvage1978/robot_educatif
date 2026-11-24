import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ASIN_SEARCH } from '../asin-search-queries.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

export function normSearchQuery(s) {
	return decodeURIComponent(String(s))
		.replace(/\+/g, ' ')
		.toLowerCase()
		.replace(/[^a-z0-9\s]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

function loadJson(rel) {
	return JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
}

/** @returns {Map<string,string>} normalized query → ASIN */
export function buildSearchAsinIndex() {
	const q2a = new Map();
	const add = (q, a) => {
		if (!q || !a) return;
		const n = normSearchQuery(q);
		if (n) q2a.set(n, String(a).toUpperCase());
	};

	for (const [asin, q] of Object.entries(ASIN_SEARCH)) add(q, asin);

	const mapping = loadJson('src/data/product-asin-mapping.json');
	for (const [asin, slug] of Object.entries(mapping)) add(slug.replace(/-/g, ' '), asin);

	const products = loadJson('src/data/products.json');
	for (const [key, p] of Object.entries(products)) {
		if (!p?.asin) continue;
		add(key.replace(/-/g, ' '), p.asin);
		add(p.name, p.asin);
		if (p.amazonSearchQuery) add(p.amazonSearchQuery, p.asin);
	}

	const extraPath = path.join(ROOT, 'src/data/amazon-search-asin.json');
	if (fs.existsSync(extraPath)) {
		for (const [q, a] of Object.entries(loadJson('src/data/amazon-search-asin.json'))) add(q, a);
	}

	const dataDir = path.join(ROOT, 'src/data');
	for (const f of fs.readdirSync(dataDir)) {
		if (!f.startsWith('amazon-latest') || !f.endsWith('.json')) continue;
		const j = loadJson(`src/data/${f}`);
		for (const [asin, item] of Object.entries(j.items || {})) {
			add(item.titre, asin);
		}
	}

	return q2a;
}

/** @param {Map<string,string>} index */
export function resolveSearchQuery(k, index) {
	const nk = normSearchQuery(k);
	if (index.get(nk)) return index.get(nk);
	const words = nk.split(' ').filter((w) => w.length > 2);
	if (!words.length) return null;
	let best = null;
	let bestScore = 0;
	for (const [q, asin] of index) {
		const hits = words.filter((w) => q.includes(w)).length;
		const need = Math.min(3, Math.max(2, Math.ceil(words.length * 0.55)));
		if (hits >= need && hits > bestScore) {
			bestScore = hits;
			best = asin;
		}
	}
	return best;
}

export function isGenericPythonBookQuery(k) {
	const n = normSearchQuery(k);
	if (/\b(book|books|exercises|box set|learn)\b/.test(n) && /\b(python|scratch|programming|raspberry)\b/.test(n)) {
		return true;
	}
	if (/\bpython\b/.test(n) && /\b(packaging|advanced|practices|typing|journal|cli|planner|hangman|battleship|asyncio|deployment|patterns)\b/.test(n)) {
		return true;
	}
	return /\b(clean code|beginner book|algorithms beginner)\b/.test(n);
}