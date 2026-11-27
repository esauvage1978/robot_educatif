import { PRODUCT_GO_BY_MARKET } from '../data/productGoByMarket.mjs';
import { marketFromPathname } from './amazonMarket.mjs';

/** Chemin /go/ pour un produit sur un marché, ou null. */
export function productGoPath(productId, market) {
	if (!productId || !market) return null;
	const map = PRODUCT_GO_BY_MARKET[productId];
	if (!map) return null;
	return map[market] || null;
}

/** Marché affilié pour ProductBox selon id produit dérivé des champs page ou catalogue. */
export function affiliateMarketForPath(pathname, marketOverride) {
	if (marketOverride) return marketOverride;
	return marketFromPathname(pathname);
}

/** URL de sortie : /go/ si connu, sinon URL Amazon / partenaire fournie. */
export function productAffiliateHref({ productId, market, fallbackHref }) {
	const go = productGoPath(productId, market);
	if (go) return go;
	return fallbackHref || '';
}