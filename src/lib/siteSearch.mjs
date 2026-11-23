/**
 * Recherche interne Pagefind — chemins, langues d’index et libellés UI (8 locales).
 * Les index Pagefind sont séparés par la balise <html lang> (pas de --force-language).
 */

/** @typedef {'fr'|'en'|'uk'|'ca'|'de'|'it'|'es'|'nl'} SearchLocale */

/** @type {Record<SearchLocale, { path: string, pagefindLang: string, htmlLang: string }>} */
export const SEARCH_LOCALES = {
	fr: { path: '/recherche/', pagefindLang: 'fr', htmlLang: 'fr' },
	en: { path: '/en/search/', pagefindLang: 'en', htmlLang: 'en' },
	uk: { path: '/uk/search/', pagefindLang: 'en', htmlLang: 'en-GB' },
	ca: { path: '/ca/search/', pagefindLang: 'en', htmlLang: 'en-CA' },
	de: { path: '/de/suche/', pagefindLang: 'de', htmlLang: 'de' },
	it: { path: '/it/cerca/', pagefindLang: 'it', htmlLang: 'it' },
	es: { path: '/es/buscar/', pagefindLang: 'es', htmlLang: 'es' },
	nl: { path: '/nl/zoeken/', pagefindLang: 'nl', htmlLang: 'nl' },
};

/** Segments d’URL de page recherche (exclusion sitemap / maillage). */
export const SEARCH_PATH_SEGMENTS = new Set(['recherche', 'search', 'suche', 'cerca', 'buscar', 'zoeken']);

/**
 * @param {string} pathname
 * @returns {boolean}
 */
export function isSearchPagePath(pathname) {
	const p = pathname.replace(/\/+$/, '') || '/';
	const last = p.split('/').filter(Boolean).pop();
	return last != null && SEARCH_PATH_SEGMENTS.has(last);
}

/**
 * Déduit la locale recherche depuis le chemin courant (header, 404).
 * @param {string} pathname
 * @returns {SearchLocale}
 */
export function searchLocaleFromPath(pathname) {
	const p = pathname.replace(/^\/site_vitrine\/robot_educatif/, '');
	if (p === '/uk' || p.startsWith('/uk/')) return 'uk';
	if (p === '/ca' || p.startsWith('/ca/')) return 'ca';
	if (p === '/us' || p.startsWith('/us/')) return 'en';
	if (p === '/en' || p.startsWith('/en/')) return 'en';
	if (p === '/de' || p.startsWith('/de/')) return 'de';
	if (p === '/it/' || p.startsWith('/it/')) return 'it';
	if (p === '/es/' || p.startsWith('/es/')) return 'es';
	if (p === '/nl/' || p.startsWith('/nl/')) return 'nl';
	return 'fr';
}

/**
 * @param {SearchLocale} locale
 */
export function getSearchConfig(locale) {
	const base = SEARCH_LOCALES[locale] ?? SEARCH_LOCALES.fr;
	const labels = SEARCH_LABELS[locale] ?? SEARCH_LABELS.fr;
	return { ...base, locale, ...labels };
}

/** @type {Record<SearchLocale, { title: string, description: string, lead: string, navLabel: string, openLabel: string, closeLabel: string, translations: Record<string, string> }>} */
const SEARCH_LABELS = {
	fr: {
		title: 'Recherche',
		description:
			'Recherche sur robot-educatif.info : articles, tutoriels mBlock, guides Scratch et Python, comparatifs de robots éducatifs.',
		lead: 'Tapez un mot-clé pour parcourir le contenu du site (articles, guides, pages pratiques).',
		navLabel: 'Rechercher',
		fullPageLabel: 'Page complète',
		openLabel: 'Ouvrir la recherche',
		closeLabel: 'Fermer la recherche',
		translations: {
			placeholder: 'Rechercher sur le site…',
			zero_results: 'Aucun résultat pour « [SEARCH_TERM] »',
			many_results: '[COUNT] résultats pour « [SEARCH_TERM] »',
			one_result: '1 résultat pour « [SEARCH_TERM] »',
			load_more: 'Charger plus de résultats',
			alt_search: 'Aucun résultat direct. Résultats proches pour « [SEARCH_TERM] »',
		},
	},
	en: {
		title: 'Search',
		description: 'Search robot-educatif.info: educational robotics guides, mBot tutorials, Scratch and Python lessons.',
		lead: 'Type a keyword to browse articles, guides and tools on this site.',
		navLabel: 'Search',
		fullPageLabel: 'Full page',
		openLabel: 'Open search',
		closeLabel: 'Close search',
		pagefindFilters: { market: 'en' },
		translations: {
			placeholder: 'Search this site…',
			zero_results: 'No results for “[SEARCH_TERM]”',
			many_results: '[COUNT] results for “[SEARCH_TERM]”',
			one_result: '1 result for “[SEARCH_TERM]”',
			load_more: 'Load more results',
			alt_search: 'No exact match. Showing close results for “[SEARCH_TERM]”',
		},
	},
	uk: {
		title: 'Search',
		description: 'Search robot-educatif.info (UK): robotics guides, mBot projects and smart-home tutorials.',
		lead: 'Type a keyword to browse UK pages, guides and tools.',
		navLabel: 'Search',
		fullPageLabel: 'Full page',
		openLabel: 'Open search',
		closeLabel: 'Close search',
		pagefindFilters: { market: 'uk' },
		translations: {
			placeholder: 'Search this site…',
			zero_results: 'No results for “[SEARCH_TERM]”',
			many_results: '[COUNT] results for “[SEARCH_TERM]”',
			one_result: '1 result for “[SEARCH_TERM]”',
			load_more: 'Load more results',
			alt_search: 'No exact match. Showing close results for “[SEARCH_TERM]”',
		},
	},
	ca: {
		title: 'Search',
		description: 'Search robot-educatif.info (Canada): educational robotics guides and programming tutorials.',
		lead: 'Type a keyword to browse Canadian English pages on this site.',
		navLabel: 'Search',
		fullPageLabel: 'Full page',
		openLabel: 'Open search',
		closeLabel: 'Close search',
		pagefindFilters: { market: 'ca' },
		translations: {
			placeholder: 'Search this site…',
			zero_results: 'No results for “[SEARCH_TERM]”',
			many_results: '[COUNT] results for “[SEARCH_TERM]”',
			one_result: '1 result for “[SEARCH_TERM]”',
			load_more: 'Load more results',
			alt_search: 'No exact match. Showing close results for “[SEARCH_TERM]”',
		},
	},
	de: {
		title: 'Suche',
		description: 'Suche auf robot-educatif.info: Lernroboter, mBot-Anleitungen und Programmierguides.',
		lead: 'Suchbegriff eingeben, um Artikel und Anleitungen auf der deutschen Website zu finden.',
		navLabel: 'Suche',
		fullPageLabel: 'Vollständige Seite',
		openLabel: 'Suche öffnen',
		closeLabel: 'Suche schließen',
		translations: {
			placeholder: 'Website durchsuchen…',
			zero_results: 'Keine Treffer für „[SEARCH_TERM]“',
			many_results: '[COUNT] Treffer für „[SEARCH_TERM]“',
			one_result: '1 Treffer für „[SEARCH_TERM]“',
			load_more: 'Weitere Ergebnisse laden',
			alt_search: 'Keine exakten Treffer. Ähnliche Ergebnisse für „[SEARCH_TERM]“',
		},
	},
	it: {
		title: 'Cerca',
		description: 'Cerca su robot-educatif.info: robot educativi, tutorial mBot e guide Scratch/Python.',
		lead: 'Digita una parola chiave per scorrere articoli e guide in italiano.',
		navLabel: 'Cerca',
		fullPageLabel: 'Pagina intera',
		openLabel: 'Apri la ricerca',
		closeLabel: 'Chiudi la ricerca',
		translations: {
			placeholder: 'Cerca nel sito…',
			zero_results: 'Nessun risultato per «[SEARCH_TERM]»',
			many_results: '[COUNT] risultati per «[SEARCH_TERM]»',
			one_result: '1 risultato per «[SEARCH_TERM]»',
			load_more: 'Altri risultati',
			alt_search: 'Nessuna corrispondenza esatta. Risultati simili per «[SEARCH_TERM]»',
		},
	},
	es: {
		title: 'Buscar',
		description: 'Busca en robot-educatif.info: robots educativos, tutoriales mBot y guías de programación.',
		lead: 'Escribe una palabra clave para explorar artículos y guías en español.',
		navLabel: 'Buscar',
		fullPageLabel: 'Página completa',
		openLabel: 'Abrir búsqueda',
		closeLabel: 'Cerrar búsqueda',
		translations: {
			placeholder: 'Buscar en el sitio…',
			zero_results: 'Sin resultados para «[SEARCH_TERM]»',
			many_results: '[COUNT] resultados para «[SEARCH_TERM]»',
			one_result: '1 resultado para «[SEARCH_TERM]»',
			load_more: 'Cargar más resultados',
			alt_search: 'Sin coincidencia exacta. Resultados cercanos para «[SEARCH_TERM]»',
		},
	},
	nl: {
		title: 'Zoeken',
		description: 'Zoek op robot-educatif.info: educatieve robots, tutorials en koopgidsen.',
		lead: 'Typ een zoekterm om artikelen en pagina’s op de site te vinden.',
		navLabel: 'Zoeken',
		fullPageLabel: 'Volledige pagina',
		openLabel: 'Zoeken openen',
		closeLabel: 'Zoeken sluiten',
		translations: {
			placeholder: 'Doorzoek de site…',
			zero_results: 'Geen resultaten voor “[SEARCH_TERM]”',
			many_results: '[COUNT] resultaten voor “[SEARCH_TERM]”',
			one_result: '1 resultaat voor “[SEARCH_TERM]”',
			load_more: 'Meer resultaten laden',
			alt_search: 'Geen exacte treffers. Vergelijkbare resultaten voor “[SEARCH_TERM]”',
		},
	},
};