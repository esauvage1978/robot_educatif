/** Tags Amazon Partenaires par marché (guides EN/DE/IT/ES). */
import { buildSearchAsinIndex, resolveSearchQuery, isGenericPythonBookQuery } from './amazonSearchResolve.mjs';
import { amazonDpUrl } from './amazonMarket.mjs';

export const AMAZON_TAG_BY_LANG = {
	fr: 'manuso06-21',
	en: 'roboteducatif-20',
	de: 'roboteducat00-21',
	it: 'roboteducat0f-21',
	es: 'roboteducat07-21',
	nl: 'manuso0607-21',
};

const LANG_TO_MARKET = {
	fr: 'fr',
	en: 'us',
	de: 'de',
	it: 'it',
	es: 'es',
	nl: 'nl',
};

let _index;
function index() {
	if (!_index) _index = buildSearchAsinIndex();
	return _index;
}

/** URL produit Amazon (fiche /dp/ uniquement — plus de recherche /s?k=). */
export function amazonSearchUrl(lang, query) {
	if (!query || isGenericPythonBookQuery(query)) return '';
	const market = LANG_TO_MARKET[lang] ?? 'fr';
	const asin = resolveSearchQuery(query, index());
	if (!asin) return '';
	return amazonDpUrl(asin, market);
}

export const SHELLY_AWIN =
	'https://www.awin1.com/cread.php?awinmid=121790&awinaffid=3126073&ued=';

export function shellyUrl(path) {
	return `${SHELLY_AWIN}${encodeURIComponent(`https://www.shelly.com/fr${path}`)}`;
}