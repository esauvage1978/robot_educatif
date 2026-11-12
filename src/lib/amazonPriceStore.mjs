import amazonLatestFr from '../data/amazon-latest.json';
import amazonLatestUk from '../data/amazon-latest-uk.json';
import amazonLatestDe from '../data/amazon-latest-de.json';
import amazonLatestIt from '../data/amazon-latest-it.json';
import amazonLatestEs from '../data/amazon-latest-es.json';
import amazonLatestCa from '../data/amazon-latest-ca.json';
import { fmtMarketPrice, MARKET_CONFIG } from './amazonMarket.mjs';

export {
	CHECK_PRICE,
	isPriceCellText,
	isPriceColumnLabel,
	localeForMarket,
	resolveRowAsin,
} from './amazonPriceMatch.mjs';

const BY_MARKET = {
	fr: amazonLatestFr,
	uk: amazonLatestUk,
	de: amazonLatestDe,
	it: amazonLatestIt,
	es: amazonLatestEs,
	ca: amazonLatestCa,
};

const PRIX_JOUR_MS = 24 * 60 * 60 * 1000;
function releveFrais(iso) {
	const age = Date.now() - Date.parse(iso || '');
	return Number.isFinite(age) && age >= 0 && age <= PRIX_JOUR_MS;
}

/** Marché dont le fichier de relevé porte la devise affichée. /en/ suit le Royaume-Uni. */
export function priceMarket(market) {
	if (market === 'en') return 'uk';
	if (market === 'uk' || market === 'de' || market === 'it' || market === 'es' || market === 'fr' || market === 'ca') return market;
	return null;
}

export function amazonSnapshot(market) {
	const key = priceMarket(market);
	if (!key) return null;
	return BY_MARKET[key] || null;
}

/**
 * Prix unitaire relevé par l’API Creators pour cet ASIN et ce marché.
 * Retourne null si le relevé n’a pas de prix dans la devise du marché.
 */
export function amazonOffer(market, asin) {
	const key = priceMarket(market);
	const snap = key ? BY_MARKET[key] : null;
	if (!snap || !asin || !releveFrais(snap.releve)) return null;
	const row = snap.items?.[String(asin).toUpperCase()];
	if (!row || row.dispo === false || row.prix == null || Number.isNaN(Number(row.prix))) return null;
	const cfg = MARKET_CONFIG[key];
	if (row.devise && cfg && row.devise !== cfg.currency) return null;
	return {
		prix: Number(row.prix),
		devise: row.devise || cfg.currency,
		label: fmtMarketPrice(row.prix, key),
		releve: snap.releveAffichage || '',
		market: key,
		titre: row.titre || '',
	};
}

