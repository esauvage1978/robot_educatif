/** Marchés Amazon affiliés robot-educatif.info (tags depuis sources / addendum-marches). */

export const MARKET_CONFIG = {
	fr: {
		host: 'www.amazon.fr',
		tag: 'manuso06-21',
		currency: 'EUR',
		symbol: '€',
		dataFile: 'amazon-latest.json',
		showCultura: true,
		showPrices: true,
	},
	uk: {
		host: 'www.amazon.co.uk',
		tag: 'roboteducatif-21',
		currency: 'GBP',
		symbol: '£',
		dataFile: 'amazon-latest-uk.json',
		showCultura: false,
		showPrices: true,
	},
	de: {
		host: 'www.amazon.de',
		tag: 'roboteducat00-21',
		currency: 'EUR',
		symbol: '€',
		dataFile: 'amazon-latest-de.json',
		showCultura: false,
		showPrices: true,
	},
	it: {
		host: 'www.amazon.it',
		tag: 'roboteducat0f-21',
		currency: 'EUR',
		symbol: '€',
		dataFile: 'amazon-latest-it.json',
		showCultura: false,
		showPrices: true,
	},
	es: {
		host: 'www.amazon.es',
		tag: 'roboteducat07-21',
		currency: 'EUR',
		symbol: '€',
		dataFile: 'amazon-latest-es.json',
		showCultura: false,
		showPrices: true,
	},
	us: {
		host: 'www.amazon.com',
		tag: 'roboteducatif-20',
		currency: 'USD',
		symbol: '$',
		dataFile: null,
		showCultura: false,
		showPrices: false,
	},
	ca: {
		host: 'www.amazon.ca',
		tag: 'roboteducat03-20',
		currency: 'CAD',
		symbol: '$',
		dataFile: 'amazon-latest-ca.json',
		showCultura: false,
		showPrices: true,
	},
	nl: {
		host: 'www.amazon.nl',
		tag: 'manuso0607-21',
		currency: 'EUR',
		symbol: '€',
		dataFile: null,
		showCultura: false,
		showPrices: false,
	},
};

/** Déduit le marché depuis le chemin de la page (/en/, /de/, …). */
export function marketFromPathname(pathname) {
	const p = pathname.replace(/^\/site_vitrine\/robot_educatif/, '');
	if (p.startsWith('/de/')) return 'de';
	if (p.startsWith('/it/')) return 'it';
	if (p.startsWith('/es/')) return 'es';
	if (p.startsWith('/us/')) return 'us';
	if (p.startsWith('/uk/')) return 'uk';
	if (p.startsWith('/ca/')) return 'ca';
	if (p.startsWith('/nl/')) return 'nl';
	if (p.startsWith('/en/')) return 'uk';
	return 'fr';
}

const PRICE_NBSP = '\u00A0';

export function fmtMarketPrice(value, market) {
	const cfg = MARKET_CONFIG[market] || MARKET_CONFIG.fr;
	if (value == null || Number.isNaN(Number(value))) return '';
	const v = Number(value);
	const sym = cfg.symbol;
	const sp = PRICE_NBSP;
	const cents = Math.round(v * 100);
	const whole = cents % 100 === 0;
	const euros = (cents / 100).toFixed(2).replace('.', ',');
	const dot = (cents / 100).toFixed(2);
	if (cfg.currency === 'GBP') {
		return whole ? `${sym}${cents / 100}` : `${sym}${dot}`;
	}
	if (cfg.currency === 'CAD') {
		return whole ? `${sym}${cents / 100}${sp}CAD` : `${sym}${dot}${sp}CAD`;
	}
	if (cfg.currency === 'USD') {
		return whole ? `${sym}${cents / 100}` : `${sym}${dot}`;
	}
	return whole ? `${cents / 100}${sp}${sym}` : `${euros}${sp}${sym}`;
}

const MENTION_BY_LOCALE = {
	fr: (d) => `Prix et disponibilité au ${d}, susceptibles de changer.`,
	en: (d) => `Prices and availability as of ${d}; subject to change.`,
	de: (d) => `Preise und Verfügbarkeit am ${d}; können sich ändern.`,
	it: (d) => `Prezzi e disponibilità al ${d}; soggetti a variazioni.`,
	es: (d) => `Precios y disponibilidad a ${d}; pueden cambiar.`,
};

/** Affichage relevé API (jj/mm/aaaa HH:MM) → mention localisée. */
export function priceMentionForLocale(releveAffichage, locale = 'fr') {
	if (!releveAffichage) return '';
	const fn = MENTION_BY_LOCALE[locale] || MENTION_BY_LOCALE.fr;
	if (locale === 'en') {
		const [datePart, timePart] = releveAffichage.split(/\s+/);
		const [d, m, y] = (datePart || '').split('/');
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		const mi = Math.max(0, Math.min(11, parseInt(m, 10) - 1));
		const formatted = `${parseInt(d, 10)} ${months[mi]} ${y}${timePart ? `, ${timePart}` : ''}`;
		return fn(formatted);
	}
	return fn(releveAffichage);
}

export function amazonDpUrl(asin, market) {
	const cfg = MARKET_CONFIG[market] || MARKET_CONFIG.fr;
	return `https://${cfg.host}/dp/${encodeURIComponent(asin)}?tag=${encodeURIComponent(cfg.tag)}`;
}

export function comparisonLabels(locale) {
	const L = {
		fr: {
			age: 'Âge',
			langs: 'Langages',
			model: 'Modèle',
			price: 'Tarif indicatif',
			pros: 'Points forts',
			offers: 'Offres marchands',
			unavailable: 'Indisponible',
			checkPrice: 'Voir prix du jour',
			amazonBtn: '🛒 Amazon →',
			culturaBtn: '🎨 Cultura →',
		},
		en: {
			age: 'Age',
			langs: 'Languages',
			model: 'Model',
			price: 'Indicative price',
			pros: 'Highlights',
			offers: 'Where to buy',
			unavailable: 'Unavailable',
			checkPrice: "See today's price",
			amazonBtn: '🛒 Amazon →',
			culturaBtn: '🎨 Cultura →',
		},
		de: {
			age: 'Alter',
			langs: 'Sprachen',
			model: 'Modell',
			price: 'Richtpreis',
			pros: 'Stärken',
			offers: 'Händler',
			unavailable: 'Nicht verfügbar',
			checkPrice: 'Tagespreis prüfen',
			amazonBtn: '🛒 Amazon →',
			culturaBtn: '🎨 Cultura →',
		},
		it: {
			age: 'Età',
			langs: 'Linguaggi',
			model: 'Modello',
			price: 'Prezzo indicativo',
			pros: 'Punti di forza',
			offers: 'Dove comprare',
			unavailable: 'Non disponibile',
			checkPrice: 'Vedi prezzo del giorno',
			amazonBtn: '🛒 Amazon →',
			culturaBtn: '🎨 Cultura →',
		},
		es: {
			age: 'Edad',
			langs: 'Lenguajes',
			model: 'Modelo',
			price: 'Precio orientativo',
			pros: 'Puntos fuertes',
			offers: 'Tiendas',
			unavailable: 'No disponible',
			checkPrice: 'Ver precio del día',
			amazonBtn: '🛒 Amazon →',
			culturaBtn: '🎨 Cultura →',
		},
	};
	return L[locale] || L.fr;
}
