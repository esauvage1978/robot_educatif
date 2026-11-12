import productsData from '../data/products.json';
import amazonLatestFr from '../data/amazon-latest.json';
import amazonLatestUk from '../data/amazon-latest-uk.json';
import amazonLatestDe from '../data/amazon-latest-de.json';
import amazonLatestIt from '../data/amazon-latest-it.json';
import amazonLatestEs from '../data/amazon-latest-es.json';
import amazonLatestCa from '../data/amazon-latest-ca.json';
import { NOEL_PRODUCT_COPY } from '../data/noelGuideI18n.mjs';
import { fmtMarketPrice, MARKET_CONFIG } from './amazonMarket.mjs';

const AMAZON_BY_FILE = {
	'amazon-latest.json': amazonLatestFr,
	'amazon-latest-uk.json': amazonLatestUk,
	'amazon-latest-de.json': amazonLatestDe,
	'amazon-latest-it.json': amazonLatestIt,
	'amazon-latest-es.json': amazonLatestEs,
	'amazon-latest-ca.json': amazonLatestCa,
};

const PRIX_JOUR_MS = 24 * 60 * 60 * 1000;
function releveFrais(iso) {
	const age = Date.now() - Date.parse(iso || '');
	return Number.isFinite(age) && age >= 0 && age <= PRIX_JOUR_MS;
}

function loadAmazonMeta(market) {
	const cfg = MARKET_CONFIG[market];
	if (!cfg?.dataFile) return { items: {}, releveAffichage: '' };
	return AMAZON_BY_FILE[cfg.dataFile] || { items: {}, releveAffichage: '' };
}

/** Fusionne products.json avec le relevé Amazon du marché. */
export async function catalogForMarket(market, locale) {
	const meta = loadAmazonMeta(market);
	const items = meta.items || {};
	const cfg = MARKET_CONFIG[market] || MARKET_CONFIG.fr;
	const loc = locale || (market === 'de' ? 'de' : market === 'it' ? 'it' : market === 'es' ? 'es' : market === 'fr' ? 'fr' : 'en');
	const copyLayer = NOEL_PRODUCT_COPY[loc] || {};
	const base = productsData;
	const out = {};

	for (const [key, prod] of Object.entries(base)) {
		if (!prod || typeof prod !== 'object') continue;
		const clone = { ...prod, ...(copyLayer[key] || {}) };
		const asin = (clone.asin || '').toUpperCase();
		const row = asin ? items[asin] : null;
		if (row) {
			if (row.dispo === false) {
				clone.amazonIndispo = true;
			}
			const currencyOk = !row.devise || row.devise === cfg.currency;
			if (!releveFrais(meta.releve)) {
				clone.priceRange = '';
			} else if (cfg.showPrices && currencyOk) {
				if (!clone.amazonIndispo && row.prix != null) {
					clone.priceRange = fmtMarketPrice(row.prix, market);
					clone.prixReleveLe = meta.releveAffichage || clone.prixReleveLe;
				} else if (market !== 'fr') {
					clone.priceRange = '';
				}
			} else if (!currencyOk) {
				clone.priceRange = '';
			}
			if (row.image && !clone.amazonIndispo) {
				clone.imageAmazon = row.image;
			}
			if (row.titre) {
				clone.amazonTitle = row.titre;
			}
		} else if (market === 'us' || market === 'ca') {
			clone.priceRange = '';
		}
		out[key] = clone;
	}
	return { catalog: out, releveAffichage: meta.releveAffichage || '' };
}
