/**
 * Résolution requête → ASIN pour le site (sans fs : utilisable par Astro).
 */
import { ASIN_SEARCH } from '../../scripts/asin-search-queries.mjs';
import productAsinMapping from '../data/product-asin-mapping.json' with { type: 'json' };
import products from '../data/products.json' with { type: 'json' };
import amazonSearchAsin from '../data/amazon-search-asin.json' with { type: 'json' };
import amazonLatestFr from '../data/amazon-latest.json' with { type: 'json' };
import amazonLatestUk from '../data/amazon-latest-uk.json' with { type: 'json' };
import amazonLatestDe from '../data/amazon-latest-de.json' with { type: 'json' };
import amazonLatestIt from '../data/amazon-latest-it.json' with { type: 'json' };
import amazonLatestEs from '../data/amazon-latest-es.json' with { type: 'json' };
import amazonLatestCa from '../data/amazon-latest-ca.json' with { type: 'json' };

export function normSearchQuery(s) {
	return decodeURIComponent(String(s))
		.replace(/\+/g, ' ')
		.toLowerCase()
		.replace(/[^a-z0-9\s]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

const LATEST_FILES = [
	amazonLatestFr,
	amazonLatestUk,
	amazonLatestDe,
	amazonLatestIt,
	amazonLatestEs,
	amazonLatestCa,
];

let cachedIndex;

export function buildSearchAsinIndex() {
	if (cachedIndex) return cachedIndex;
	const q2a = new Map();
	const add = (q, a) => {
		if (!q || !a) return;
		const n = normSearchQuery(q);
		if (n) q2a.set(n, String(a).toUpperCase());
	};

	for (const [asin, q] of Object.entries(ASIN_SEARCH)) add(q, asin);
	for (const [asin, slug] of Object.entries(productAsinMapping)) add(slug.replace(/-/g, ' '), asin);
	for (const [key, p] of Object.entries(products)) {
		if (!p?.asin) continue;
		add(key.replace(/-/g, ' '), p.asin);
		add(p.name, p.asin);
		if (p.amazonSearchQuery) add(p.amazonSearchQuery, p.asin);
	}
	for (const [q, a] of Object.entries(amazonSearchAsin)) add(q, a);
	for (const meta of LATEST_FILES) {
		for (const [asin, item] of Object.entries(meta.items || {})) {
			add(item.titre, asin);
		}
	}
	cachedIndex = q2a;
	return q2a;
}

export function resolveSearchQuery(k, index = buildSearchAsinIndex()) {
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
	if (
		/\bpython\b/.test(n) &&
		/\b(packaging|advanced|practices|typing|journal|cli|planner|hangman|battleship|asyncio|deployment|patterns)\b/.test(n)
	) {
		return true;
	}
	return /\b(clean code|beginner book|algorithms beginner)\b/.test(n);
}