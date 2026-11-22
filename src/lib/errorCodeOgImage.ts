/**
 * Image Open Graph pour les fiches code erreur domotique : photo produit réelle (public/), pas SVG.
 */
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { withImageVersion } from './imageVersion';

type ErrorCatalogEntry = {
	product_slug: string | null;
	applicable_products?: string[];
};

function publicImageExists(pathname: string): boolean {
	const clean = pathname.split('?')[0].replace(/^\//, '');
	return existsSync(join(process.cwd(), 'public', clean));
}

/**
 * Choisit la première photo produit disponible (products/ puis models/) pour l’entrée catalogue.
 */
export function resolveErrorCodeOgImage(
	entry: ErrorCatalogEntry,
	productBySlug: Record<string, { image_url?: string } | undefined>,
): string | undefined {
	const slugs = [
		...(entry.product_slug ? [entry.product_slug] : []),
		...(entry.applicable_products ?? []),
	];
	for (const slug of slugs) {
		const fromCatalog = productBySlug[slug]?.image_url;
		const candidates = [
			...(fromCatalog ? [fromCatalog.split('?')[0]] : []),
			`/images/products/${slug}.webp`,
			`/images/models/${slug}.webp`,
		];
		for (const path of candidates) {
			if (publicImageExists(path)) {
				return withImageVersion(path);
			}
		}
	}
	return undefined;
}