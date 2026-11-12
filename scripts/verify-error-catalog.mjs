#!/usr/bin/env node
/**
 * Vérifie que chaque produit PRODUCTS a au moins 2 fiches (product_slug + applicable_products).
 */
import {
	PRODUCTS,
	buildCatalogErrors,
	errorAppliesToProduct,
} from '../src/data/unifiedErrorCatalog.mjs';

const errors = buildCatalogErrors();
const failures = [];

for (const product of PRODUCTS) {
	const count = errors.filter((e) => errorAppliesToProduct(e, product.slug)).length;
	if (count < 2) {
		failures.push({ slug: product.slug, count });
	}
}

if (failures.length) {
	console.error('Produits avec moins de 2 fiches :');
	for (const f of failures) {
		console.error(`  - ${f.slug}: ${f.count}`);
	}
	process.exit(1);
}

console.log(`OK — ${PRODUCTS.length} produits, ${errors.length} fiches, min. 2 fiches par produit.`);
