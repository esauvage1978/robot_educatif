/** Tags Amazon Partenaires par marché (guides EN/DE/IT/ES). */
export const AMAZON_TAG_BY_LANG = {
	fr: 'manuso06-21',
	en: 'roboteducatif-21',
	de: 'roboteducat00-21',
	it: 'roboteducat0f-21',
	es: 'roboteducat07-21',
	nl: 'manuso0607-21',
};

export function amazonSearchUrl(lang, query) {
	const tag = AMAZON_TAG_BY_LANG[lang] ?? AMAZON_TAG_BY_LANG.fr;
	const host =
		lang === 'en'
			? 'www.amazon.co.uk'
			: lang === 'de'
				? 'www.amazon.de'
				: lang === 'it'
					? 'www.amazon.it'
					: lang === 'es'
						? 'www.amazon.es'
						: lang === 'nl'
							? 'www.amazon.nl'
							: 'www.amazon.fr';
	return `https://${host}/s?k=${encodeURIComponent(query)}&tag=${tag}`;
}

export const SHELLY_AWIN =
	'https://www.awin1.com/cread.php?awinmid=121790&awinaffid=3126073&ued=';

export function shellyUrl(path) {
	return `${SHELLY_AWIN}${encodeURIComponent(`https://www.shelly.com/fr${path}`)}`;
}
