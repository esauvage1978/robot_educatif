import { GSC_INTENT_KEYS, GSC_INTENT_PATHS, PICK_UI } from '../data/gscIntentPageConfig.mjs';
import { MARKET_CONFIG, marketFromPathname } from './amazonMarket.mjs';

export function normalizePath(pathname) {
	let p = pathname.replace(/^\/site_vitrine\/robot_educatif/, '');
	if (!p.startsWith('/')) p = `/${p}`;
	if (p !== '/' && !p.endsWith('/')) p = `${p}/`;
	try {
		p = decodeURI(p);
	} catch {
		/* keep */
	}
	return p;
}

const LOCALE_PREFIX = {
	fr: 'fr',
	en: 'en',
	de: 'de',
	it: 'it',
	es: 'es',
	nl: 'nl',
};

/** @param {string} pathname */
export function gscIntentForPath(pathname) {
	const path = normalizePath(pathname);
	const key = GSC_INTENT_PATHS[path];
	if (!key) return null;
	const base = GSC_INTENT_KEYS[key];
	if (!base) return null;
	const market = marketFromPathname(path);
	const locale =
		market === 'de'
			? 'de'
			: market === 'it'
				? 'it'
				: market === 'es'
					? 'es'
					: market === 'fr'
						? 'fr'
						: path.startsWith('/nl/')
							? 'nl'
							: 'en';
	const intent = {
		key,
		...base,
		market,
		locale,
		ui: PICK_UI[locale] || PICK_UI.fr,
		cfg: MARKET_CONFIG[market] || MARKET_CONFIG.fr,
	};
	if (
		[
			'quel-robot-acheter-enfant-10-ans-guide-achat',
			'quel-robot-acheter-enfant-12-ans-guide-achat',
		].some((s) => path.includes(s))
	) {
		intent.skipInjectTable = true;
	}
	if (
		key === 'hub-best-robot' &&
		(path.includes('/best-programmable-robot-for-kids') || path.includes('/miglior-robot-programmabile-per-bambini'))
	) {
		intent.skipInjectTable = true;
	}
	return intent;
}

export function gscIntentForSlug(slug) {
	const path = `/${slug}/`;
	return gscIntentForPath(path);
}