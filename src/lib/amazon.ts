import { AMAZON_AFFILIATE_TAG } from '../consts';

export { AMAZON_AFFILIATE_TAG };

/** URL de recherche Amazon.fr avec suivi d’affiliation. */
export function amazonSearchUrl(keywords: string): string {
	const params = new URLSearchParams({
		k: keywords,
		tag: AMAZON_AFFILIATE_TAG,
	});
	return `https://www.amazon.fr/s?${params.toString()}`;
}

const hasAffiliateTag = (url: string) =>
	/[?&]tag=/.test(url) || url.includes(`tag%3D${encodeURIComponent(AMAZON_AFFILIATE_TAG)}`);

/**
 * Ajoute le paramètre `tag` affilié aux liens amazon.fr / amzn.to s’il manque.
 * (Les liens courts amzn.to acceptent en général `?tag=…` en redirection.)
 */
export function affiliateAmazonUrl(url: string): string {
	const trimmed = url.trim();
	if (!trimmed.includes('amazon.') && !trimmed.includes('amzn.to')) return trimmed;
	if (hasAffiliateTag(trimmed)) return trimmed;
	return trimmed.includes('?') ? `${trimmed}&tag=${AMAZON_AFFILIATE_TAG}` : `${trimmed}?tag=${AMAZON_AFFILIATE_TAG}`;
}
