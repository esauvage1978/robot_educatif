/** Titres du bloc de maillage éditorial en fin d’article (contenu principal). */
export const READ_ALSO_HEADING = {
	fr: 'À lire aussi',
	en: 'Further reading',
	de: 'Weiterführende Artikel',
	it: 'Da leggere anche',
	es: 'También te puede interesar',
	nl: 'Meer lezen',
	uk: 'Further reading',
	ca: 'Further reading',
};

export const LANG_PREFIXES = new Set(['en', 'de', 'it', 'es', 'nl', 'uk', 'ca']);

/** Pages exclues du maillage automatique (technique, légal interne). */
export const MAILLAGE_EXCLUDE_PATHS = new Set([
	'/404/',
	'/404.html',
	'/gestion-des-cookies/',
	'/stats-articles-interne/',
	'/recherche/',
	'/en/search/',
	'/uk/search/',
	'/ca/search/',
	'/de/suche/',
	'/it/cerca/',
	'/es/buscar/',
	'/nl/zoeken/',
	'/mentions-legales/',
	'/politique-de-confidentialite/',
	'/contact/',
]);

export function detectContentLang(urlPath) {
	const m = urlPath.match(/^\/(en|de|it|es|nl|uk|ca)(\/|$)/);
	if (m) return m[1] === 'uk' || m[1] === 'ca' ? m[1] : m[1];
	return 'fr';
}

export function isSameContentLang(linkPath, pagePath) {
	const pageLang = detectContentLang(pagePath);
	const linkLang = detectContentLang(linkPath);
	return pageLang === linkLang;
}