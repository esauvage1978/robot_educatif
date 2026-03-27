import { AMAZON_AFFILIATE_TAG } from '../consts';

/** URL de recherche Amazon.fr avec suivi d’affiliation. */
export function amazonSearchUrl(keywords: string): string {
	const params = new URLSearchParams({
		k: keywords,
		tag: AMAZON_AFFILIATE_TAG,
	});
	return `https://www.amazon.fr/s?${params.toString()}`;
}
