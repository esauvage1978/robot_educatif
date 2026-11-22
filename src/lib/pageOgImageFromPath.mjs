/**
 * Dernière chance : og:image à partir du pathname seul (pages sans layout dédié).
 */
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { withImageVersion } from './imageVersion';
import { resolveArticleOgImage } from './articleOgImage.mjs';
import { resolveToolOrHubPathOg } from './toolPageOgImage.mjs';

function publicExists(pathname) {
	const clean = pathname.split('?')[0].replace(/^\//, '');
	return existsSync(join(process.cwd(), 'public', clean));
}

function accept(path) {
	if (!path) return undefined;
	const bare = path.split('?')[0];
	if (!publicExists(bare)) return undefined;
	return withImageVersion(bare);
}

const CATEGORY_IMAGES = {
	makeblock: '/images/products/mbot2.webp',
	guide: '/images/products/mbot2.webp',
	domotique: '/images/products/sonoff-zbdongle-e.webp',
	python: '/images/products/mbot2.webp',
	scratch: '/images/products/mbot.webp',
	arduino: '/images/products/elegoo-uno-super-starter.webp',
};

const HOME_LOCALE_IMAGE = '/mbot2-hero-v2.webp';

function slugFromPath(path) {
	const parts = path.replace(/^\/|\/$/g, '').split('/').filter(Boolean);
	if (parts[0] === 'blog' && parts[1]) return parts[1];
	const locales = new Set(['en', 'de', 'it', 'es', 'nl', 'uk', 'ca', 'us']);
	if (locales.has(parts[0]) && parts[1]) return parts[1];
	if (parts[0] === 'domotique' && parts[1]) return parts[1];
	if (parts.length === 1) return parts[0];
	if (!locales.has(parts[0])) return parts[parts.length - 1];
	return parts[parts.length - 1] ?? '';
}

/**
 * @param {string} pathname sans préfixe WAMP
 */
export function resolvePageOgImageFromPath(pathname) {
	const path = (pathname ?? '').replace(/\/$/, '') || '/';
	const normalized = path === '' ? '/' : path.startsWith('/') ? path : `/${path}`;

	if (normalized === '/' || /^\/(en|de|it|es|nl|uk|ca|us)$/.test(normalized)) {
		return accept(HOME_LOCALE_IMAGE);
	}

	const tool = resolveToolOrHubPathOg(`${normalized}/`);
	if (tool) return tool;

	const cat = normalized.match(/^\/categorie\/([^/]+)$/);
	if (cat) return accept(CATEGORY_IMAGES[cat[1]] ?? '/images/products/mbot.webp');

	if (/^\/programmation(\/|$)/.test(normalized)) return accept('/images/products/mbot2.webp');

	if (/\/blog\/?$/.test(normalized)) return accept('/images/products/mbot2.webp');
	if (/baisses-de-prix|price-drops|preissenkungen|ribassi-prezzo|bajadas-de-precio|prijsdalingen/.test(normalized))
		return accept('/images/products/mbot2.webp');
	if (/black-friday|codes-promo|noel|christmas/.test(normalized)) return accept('/images/products/mbot2.webp');
	if (/^\/accessoires\/?$/.test(normalized)) return accept('/images/products/mbot.webp');
	if (/^\/(meilleur-robot|best-educational|bester-programmierbarer|miglior-robot|mejor-robot)/.test(normalized))
		return accept('/images/products/mbot2.webp');
	if (
		/\/(tutorials|anleitungen|tutoriels|buying-guides|kaufberater|comparisons|comparatifs|comparaciones|confronti|brands|marken|marques|accessories|accessoires|zubehoer)\/?$/i.test(
			normalized,
		)
	)
		return accept('/images/products/mbot2.webp');
	if (/sonoff|shelly-brand|marque-sonoff|marke-sonoff/i.test(normalized))
		return accept('/images/products/sonoff-zbdongle-e.webp');
	if (/raspberry-pi-brand|marque-raspberry|lego-education|marque-lego/i.test(normalized))
		return accept('/images/products/raspberry-pi-5-4gb.webp');
	if (/^\/(belgique|suisse|luxembourg|monaco)\/?$/i.test(normalized))
		return accept('/images/products/mbot2.webp');

	if (/^\/(partenaires|partners|partner|de\/partner)\//.test(normalized)) return undefined;

	const slug = slugFromPath(`${normalized}/`);
	const article = resolveArticleOgImage({ articleSlug: slug });
	if (article) return article;

	if (/^\/domotique\/?$/.test(normalized)) return accept('/images/products/home-assistant-green.webp');
	if (/^\/(en|de|it|es)\/smart-home\/?$|^\/domotica\/?$/.test(normalized))
		return accept('/images/products/home-assistant-green.webp');

	return undefined;
}