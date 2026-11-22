/**
 * Image Open Graph pour les fiches code erreur domotique : photo produit réelle (public/), pas SVG.
 */
import { withImageVersion } from './imageVersion';
import { publicImageExists } from './publicImageExists';

export type ErrorCatalogEntry = {
	product_slug: string | null;
	applicable_products?: string[];
};

/**
 * Choisit la première photo produit disponible (catalogue, products/, models/) pour l’entrée catalogue.
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