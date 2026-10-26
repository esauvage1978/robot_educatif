#!/usr/bin/env node
/**
 * Garde-fou « Extraits de produits » (Google Search Console).
 *
 * Parcourt tous les .html du dossier de build (par défaut `dist`, ou le 1er argument,
 * ex. `node scripts/check-product-jsonld.mjs dist23`) et échoue (exit 1) si :
 *  - un nœud JSON-LD `"@type": "Product"` (même imbriqué : ItemList, @graph…) n'a pas
 *    de `offers` contenant au moins une Offer avec un `price` numérique ;
 *  - un bloc JSON-LD est invalide (JSON non parsable) ;
 *  - une page utilise un balisage microdata `itemtype=".../Product"` (non vérifiable ici).
 *
 * Règle éditoriale : ne jamais inventer de prix, d'avis (review) ni de note (aggregateRating).
 * Si le prix n'est pas connu, ne pas émettre de Product.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import { existsSync } from 'node:fs';

const root = resolve(process.argv[2] || 'dist');
if (!existsSync(root)) {
	console.error(`[check-product-jsonld] Dossier introuvable : ${root}`);
	process.exit(1);
}

async function* walk(dir) {
	for (const e of await readdir(dir, { withFileTypes: true })) {
		const p = join(dir, e.name);
		if (e.isDirectory()) yield* walk(p);
		else if (e.isFile() && e.name.endsWith('.html')) yield p;
	}
}

const hasType = (node, t) => {
	const v = node?.['@type'];
	return Array.isArray(v) ? v.includes(t) : v === t;
};

const isNumericPrice = (v) =>
	(typeof v === 'number' && Number.isFinite(v)) ||
	(typeof v === 'string' && /^\d+(\.\d+)?$/.test(v.trim()));

function offerOk(offers) {
	const list = Array.isArray(offers) ? offers : offers ? [offers] : [];
	return list.some(
		(o) => o && typeof o === 'object' && isNumericPrice(o.price) && typeof o.priceCurrency === 'string' && o.priceCurrency.length === 3,
	);
}

function collectProducts(node, out) {
	if (Array.isArray(node)) node.forEach((n) => collectProducts(n, out));
	else if (node && typeof node === 'object') {
		if (hasType(node, 'Product')) out.push(node);
		for (const v of Object.values(node)) collectProducts(v, out);
	}
}

const LD_RE = /<script[^>]*type=["']?application\/ld\+json["']?[^>]*>([\s\S]*?)<\/script>/gi;
const MICRO_RE = /itemtype=["'][^"']*schema\.org\/Product["']/i;

let files = 0;
let productCount = 0;
const errors = [];

for await (const file of walk(root)) {
	files++;
	const html = await readFile(file, 'utf8');
	const rel = relative(root, file);
	if (MICRO_RE.test(html)) errors.push(`${rel} : microdata itemtype Product (non autorisé)`);
	for (const m of html.matchAll(LD_RE)) {
		let data;
		try {
			data = JSON.parse(m[1]);
		} catch (e) {
			errors.push(`${rel} : JSON-LD invalide (${e.message})`);
			continue;
		}
		const products = [];
		collectProducts(data, products);
		for (const p of products) {
			productCount++;
			if (!offerOk(p.offers)) errors.push(`${rel} : Product « ${p.name ?? '?'} » sans offers.price numérique`);
		}
	}
}

if (errors.length) {
	console.error(`[check-product-jsonld] ÉCHEC : ${errors.length} problème(s) sur ${files} pages HTML :`);
	for (const e of errors) console.error('  - ' + e);
	process.exit(1);
}
console.log(`[check-product-jsonld] OK : ${files} pages HTML, ${productCount} Product JSON-LD, tous avec offers.price numérique.`);
