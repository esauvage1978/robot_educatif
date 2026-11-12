import frFeed from '../data/amazon-latest.json';
import deFeed from '../data/amazon-latest-de.json';
import itFeed from '../data/amazon-latest-it.json';
import esFeed from '../data/amazon-latest-es.json';
import ukFeed from '../data/amazon-latest-uk.json';
import caFeed from '../data/amazon-latest-ca.json';
import { MARKET_CONFIG, fmtMarketPrice, marketFromPathname } from './amazonMarket.mjs';

const FEEDS = { fr: frFeed, de: deFeed, it: itFeed, es: esFeed, uk: ukFeed, ca: caFeed };

const PRIX_JOUR_MS = 24 * 60 * 60 * 1000;
function releveFrais(iso) {
	const age = Date.now() - Date.parse(iso || '');
	return Number.isFinite(age) && age >= 0 && age <= PRIX_JOUR_MS;
}

/** Pages de test : le slug suffit, quelle que soit la langue. */
const PRODUCT_BY_SLUG = {
	'mbot-avis-faut-il-acheter-pour-un-enfant': 'mbot',
	'mbot-test-kaufen': 'mbot',
	'mbot-recensione-vale-la-pena': 'mbot',
	'mbot-review-worth-buying': 'mbot',
	'mbot-opinion-vale-la-pena': 'mbot',
	'mbot2-de-makeblock-le-robot-educatif-pour-apprendre-la-robotique': 'mbot2',
	'decouvrez-makeblock-cyberpi-une-carte-de-developpement-electronique-polyvalente': 'cyberpi',
	'makeblock-cyberpi-ueberblick': 'cyberpi',
	'makeblock-cyberpi-panoramica': 'cyberpi',
	'makeblock-cyberpi-overview': 'cyberpi',
	'makeblock-cyberpi-resumen': 'cyberpi',
	'deballage-et-premier-pas-du-robot-tale-bot-de-chez-matatalab': 'tale-bot',
	'matatalab-tale-bot-lernroboter': 'tale-bot',
	'matatalab-tale-bot-educational-robot': 'tale-bot',
	'matatalab-tale-bot-robot-educativo': 'tale-bot',
	'test-homey-pro-deballage-installation': 'homey-pro',
	'homey-pro-unboxing-setup': 'homey-pro',
	'homey-pro-auspacken-einrichtung': 'homey-pro',
	'test-homey-pro-unboxing-installazione': 'homey-pro',
	'test-homey-pro-unboxing-instalacion': 'homey-pro',
	'test-homey-pro-mini-deballage-installation': 'homey-mini',
	'homey-pro-mini-unboxing-setup': 'homey-mini',
	'homey-pro-mini-auspacken-einrichtung': 'homey-mini',
	'test-homey-pro-mini-unboxing-installazione': 'homey-mini',
	'test-homey-pro-mini-unboxing-instalacion': 'homey-mini',
};

const REVIEW_SLUGS = new Set([
	...Object.keys(PRODUCT_BY_SLUG),
	'thymio-3-nouveautes-prix-avis-comparatif-mbot2',
	'thymio-3-test-preis-vs-mbot2',
	'thymio-3-recensione-prezzo-vs-mbot2',
	'thymio-3-opinion-precio-vs-mbot2',
	'thymio-3-review-price-vs-mbot2',
	'sphero-blueprint-robotics-presentation-avis-robot-modulaire',
	'sphero-blueprint-robotics-test-modularer-roboter',
	'sphero-blueprint-robotics-recensione-robot-modulare',
	'sphero-blueprint-robotics-opinion-robot-modular',
	'sphero-blueprint-robotics-review-modular-robot',
]);

const AMAZON = {
	mbot: { asin: 'B07XR98YYQ', image: '/images/products/mbot.webp', name: 'Makeblock mBot' },
	mbot2: { asin: 'B0919F9CKS', image: '/images/products/mbot2.webp', name: 'Makeblock mBot2' },
	cyberpi: { asin: 'B0BBZY9L59', image: '/images/products/cyberpi.webp', name: 'Makeblock CyberPi' },
	'tale-bot': { asin: 'B09LYTM5BC', image: '', name: 'Matatalab Tale-Bot Pro' },
	/**
	 * Homey Pro (2026). Chaque ASIN a été ouvert sur la boutique du marché
	 * le 7 novembre 2026. Le modèle Royaume-Uni n'a pas le même ASIN que l'UE.
	 * Pas de fiche vérifiée pour Amazon.ca ni Amazon.com : ces marchés restent
	 * sur la page du fabricant.
	 */
	'homey-pro': {
		image: '/images/products/homey-pro.webp',
		name: 'Homey Pro',
		asins: {
			fr: 'B0G1ZJHG9Y',
			de: 'B0G1ZJHG9Y',
			it: 'B0G1ZJHG9Y',
			es: 'B0G1ZJHG9Y',
			uk: 'B0G599J4YH',
		},
	},
};

/**
 * Prix vus sur la fiche Amazon du marché, hors flux amazon-latest.
 * Allemagne : 418,31 €, prix affiché (liste 449 €). Les autres fiches EU
 * et la fiche UK affichaient 449 dans leur devise.
 */
const MANUAL = {
	fr: { 'homey-pro': { prix: 449, releve: '2026-11-07T10:45:00Z' } },
	de: { 'homey-pro': { prix: 418.31, releve: '2026-11-07T10:45:00Z' } },
	it: { 'homey-pro': { prix: 449, releve: '2026-11-07T10:45:00Z' } },
	es: { 'homey-pro': { prix: 449, releve: '2026-11-07T10:45:00Z' } },
	uk: { 'homey-pro': { prix: 449, releve: '2026-11-07T10:45:00Z' } },
};

const COPY = {
	fr: {
		priceLabel: 'Prix indicatif',
		seePrice: 'Consulter le prix',
		amazonCta: 'Voir le prix sur Amazon',
		makerCta: 'Voir le prix chez le fabricant',
		tested: 'Produit de ce test',
		checked: (date) => `Prix relevé le ${date}`,
		affiliate: 'Lien affilié, sans surcoût',
		makerLine: 'Fiche du fabricant',
		aria: (name) => `Où voir ${name}`,
		noted: (shop, date) => `Prix constaté sur ${shop} le ${date}, susceptible de changer.`,
		missing: (shop, date) => `Pas de prix au relevé du ${date}. Le bouton ouvre ${shop}.`,
		makerNote: 'Le montant du jour est indiqué sur la boutique du fabricant.',
		sub: {
			mbot: '8-12 ans',
			mbot2: '10-14 ans',
			cyberpi: 'Dès 10 ans',
			'tale-bot': 'Dès 4-5 ans',
			'homey-pro': 'Centrale de la maison',
			'homey-mini': 'Centrale compacte',
		},
	},
	en: {
		priceLabel: 'Indicative price',
		seePrice: "See today's price",
		amazonCta: 'See the price on Amazon',
		makerCta: 'See the price on the maker site',
		tested: 'Product in this review',
		checked: (date) => `Price checked on ${date}`,
		affiliate: 'Affiliate link, no extra cost',
		makerLine: 'Manufacturer page',
		aria: (name) => `Where to see ${name}`,
		noted: (shop, date) => `Price seen on ${shop} on ${date}. It can change.`,
		missing: (shop, date) => `No price in the ${date} check. The button opens ${shop}.`,
		makerNote: "Today's price is on the manufacturer's shop.",
		sub: {
			mbot: 'Ages 8–12',
			mbot2: 'Ages 10–14',
			cyberpi: 'Ages 10+',
			'tale-bot': 'Ages 4–5 and up',
			'homey-pro': 'Whole-home hub',
			'homey-mini': 'Compact hub',
		},
	},
	de: {
		priceLabel: 'Richtpreis',
		seePrice: 'Preis ansehen',
		amazonCta: 'Preis bei Amazon ansehen',
		makerCta: 'Preis beim Hersteller ansehen',
		tested: 'Produkt dieses Tests',
		checked: (date) => `Preis geprüft am ${date}`,
		affiliate: 'Affiliate-Link, ohne Aufpreis',
		makerLine: 'Herstellerseite',
		aria: (name) => `Wo man ${name} sieht`,
		noted: (shop, date) => `Preis auf ${shop} am ${date}, kann sich ändern.`,
		missing: (shop, date) => `Kein Preis in der Erhebung vom ${date}. Der Button öffnet ${shop}.`,
		makerNote: 'Der Tagespreis steht im Shop des Herstellers.',
		sub: {
			mbot: '8–12 Jahre',
			mbot2: '10–14 Jahre',
			cyberpi: 'Ab 10 Jahren',
			'tale-bot': 'Ab 4–5 Jahren',
			'homey-pro': 'Zentrale fürs Haus',
			'homey-mini': 'Kompakte Zentrale',
		},
	},
	it: {
		priceLabel: 'Prezzo indicativo',
		seePrice: 'Vedi il prezzo',
		amazonCta: 'Vedi il prezzo su Amazon',
		makerCta: 'Vedi il prezzo dal produttore',
		tested: 'Prodotto di questa prova',
		checked: (date) => `Prezzo rilevato il ${date}`,
		affiliate: 'Link affiliato, senza sovrapprezzo',
		makerLine: 'Scheda del produttore',
		aria: (name) => `Dove vedere ${name}`,
		noted: (shop, date) => `Prezzo visto su ${shop} il ${date}, può cambiare.`,
		missing: (shop, date) => `Nessun prezzo nel rilievo del ${date}. Il pulsante apre ${shop}.`,
		makerNote: 'Il prezzo del giorno è sul sito del produttore.',
		sub: {
			mbot: '8-12 anni',
			mbot2: '10-14 anni',
			cyberpi: 'Dai 10 anni',
			'tale-bot': 'Dai 4-5 anni',
			'homey-pro': 'Centrale di casa',
			'homey-mini': 'Centrale compatta',
		},
	},
	es: {
		priceLabel: 'Precio orientativo',
		seePrice: 'Consultar el precio',
		amazonCta: 'Ver el precio en Amazon',
		makerCta: 'Ver el precio en el fabricante',
		tested: 'Producto de esta prueba',
		checked: (date) => `Precio consultado el ${date}`,
		affiliate: 'Enlace de afiliado, sin sobrecoste',
		makerLine: 'Ficha del fabricante',
		aria: (name) => `Dónde ver ${name}`,
		noted: (shop, date) => `Precio visto en ${shop} el ${date}; puede cambiar.`,
		missing: (shop, date) => `Sin precio en la consulta del ${date}. El botón abre ${shop}.`,
		makerNote: 'El precio del día está en la tienda del fabricante.',
		sub: {
			mbot: '8-12 años',
			mbot2: '10-14 años',
			cyberpi: 'Desde 10 años',
			'tale-bot': 'Desde 4-5 años',
			'homey-pro': 'Central de la casa',
			'homey-mini': 'Central compacta',
		},
	},
};

const HOMEY = {
	'homey-pro': {
		name: 'Homey Pro',
		image: '/images/models/homey-pro-2026.webp',
		href: {
			fr: 'https://homey.app/fr-fr/homey-pro/',
			en: 'https://homey.app/en-gb/homey-pro/',
			de: 'https://homey.app/de-de/homey-pro/',
			it: 'https://homey.app/it-it/homey-pro/',
			es: 'https://homey.app/es-es/homey-pro/',
		},
	},
	'homey-mini': {
		name: 'Homey Pro mini',
		image: '/images/domotique/homey/homey-pro-mini-boite-v2.webp',
		href: {
			fr: 'https://homey.app/fr-fr/homey-pro-mini/',
			en: 'https://homey.app/en-gb/homey-pro-mini/',
			de: 'https://homey.app/de-de/homey-pro-mini/',
			it: 'https://homey.app/it-it/homey-pro-mini/',
			es: 'https://homey.app/es-es/homey-pro-mini/',
		},
	},
};

function localeFromPath(pathname) {
	const p = pathname.replace(/^\/site_vitrine\/robot_educatif/, '');
	if (p.startsWith('/de/')) return 'de';
	if (p.startsWith('/it/')) return 'it';
	if (p.startsWith('/es/')) return 'es';
	if (p.startsWith('/en/') || p.startsWith('/uk/') || p.startsWith('/ca/') || p.startsWith('/us/')) return 'en';
	return 'fr';
}

function slugFromPath(pathname) {
	const p = pathname.replace(/^\/site_vitrine\/robot_educatif/, '').replace(/\/$/, '');
	const parts = p.split('/').filter(Boolean);
	return parts[parts.length - 1] || '';
}

function formatDate(iso, locale) {
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return '';
	const tag = locale === 'en' ? 'en-GB' : locale;
	return new Intl.DateTimeFormat(tag, { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
}

function amazonHref(asin, market) {
	const cfg = MARKET_CONFIG[market] || MARKET_CONFIG.fr;
	return `https://${cfg.host}/dp/${asin}?tag=${cfg.tag}`;
}

function shopLabel(market) {
	const host = (MARKET_CONFIG[market] || MARKET_CONFIG.fr).host;
	return host.replace(/^www\./, '');
}

function listingAsin(spec, market) {
	if (!spec) return '';
	if (spec.asins) return spec.asins[market] || '';
	return spec.asin || '';
}

function makerOffer(productKey, locale, copy) {
	const h = HOMEY[productKey];
	const href = h.href[locale] || h.href.fr;
	return {
		name: h.name,
		subtitle: copy.sub[productKey] || '',
		image: h.image,
		href,
		price: '',
		priceLabel: copy.seePrice,
		cta: copy.makerCta,
		trust: [copy.tested, copy.makerLine],
		note: copy.makerNote,
		sponsored: false,
		aria: copy.aria(h.name),
	};
}

/**
 * Mise en page « test » et, quand un produit est sourcé, la carte de droite.
 * @returns {{ review: true, offer: object | null } | null}
 */
export function reviewPageForPath(pathname) {
	const slug = slugFromPath(pathname || '');
	if (!REVIEW_SLUGS.has(slug)) return null;
	const productKey = PRODUCT_BY_SLUG[slug];
	if (!productKey) return { review: true, offer: null };

	const locale = localeFromPath(pathname);
	const copy = COPY[locale] || COPY.fr;
	const market = marketFromPathname(pathname);

	const spec = AMAZON[productKey];
	const asin = listingAsin(spec, market);
	if (!asin) {
		if (HOMEY[productKey]) return { review: true, offer: makerOffer(productKey, locale, copy) };
		return { review: true, offer: null };
	}

	const feed = FEEDS[market] || null;
	const row = feed?.items?.[asin];
	const currencyOk = row && row.devise && row.devise === (MARKET_CONFIG[market] || MARKET_CONFIG.fr).currency;
	const manual = MANUAL[market]?.[productKey] || null;
	const useFeed = Boolean(currencyOk && row.prix != null && row.dispo !== false && releveFrais(feed?.releve));
	const manualFrais = Boolean(manual && releveFrais(manual.releve));
	const price = useFeed ? fmtMarketPrice(row.prix, market) : manualFrais ? fmtMarketPrice(manual.prix, market) : '';
	const date = formatDate(useFeed ? feed?.releve : manual?.releve || feed?.releve, locale);
	const shop = shopLabel(market);
	const image = spec.image || (row?.image ? String(row.image).replace('_SL160_', '_SL500_') : '');

	return {
		review: true,
		offer: {
			name: spec.name,
			subtitle: copy.sub[productKey] || '',
			image,
			href: amazonHref(asin, market),
			price,
			priceLabel: price ? copy.priceLabel : copy.seePrice,
			cta: copy.amazonCta,
			trust: [copy.tested, date ? copy.checked(date) : '', copy.affiliate].filter(Boolean),
			note: price ? copy.noted(shop, date) : copy.missing(shop, date),
			sponsored: true,
			amazonQuery: spec.asins ? `${spec.name} (2026)` : '',
			aria: copy.aria(spec.name),
		},
	};
}
