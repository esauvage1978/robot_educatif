import { amazonDpUrl, MARKET_CONFIG } from './amazonMarket.mjs';
import { catalogForMarket } from './marketProducts.mjs';

const KEYS = ['mbot', 'mbot2', 'codey-rocky', 'elegoo-penguin'];

/** Cartes « Les plus populaires » avec prix Amazon et liens /dp/ (pas de recherche). */
export async function buildHomePopularProducts(market, locale) {
	const { catalog } = await catalogForMarket(market, locale);
	const cfg = MARKET_CONFIG[market] || MARKET_CONFIG.fr;
	const rel = 'sponsored nofollow noopener';
	const out = [];
	for (const key of KEYS) {
		const p = catalog[key];
		if (!p || p.amazonIndispo || !p.asin) continue;
		const href = amazonDpUrl(p.asin, market);
		out.push({
			name: p.shortName || p.name,
			asin: p.asin,
			href,
			rel,
			price: cfg.showPrices ? p.priceRange || '' : '',
			imageAmazon: p.imageAmazon || '',
		});
	}
	return out;
}
