import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { amazonDpUrl, MARKET_CONFIG } from './amazonMarket.mjs';
import { catalogForMarket } from './marketProducts.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

const KEYS = ['mbot', 'mbot2', 'codey-rocky', 'elegoo-penguin'];

/** Cartes « Les plus populaires » avec prix Amazon et liens /dp/ (pas de recherche). */
export async function buildHomePopularProducts(market, locale) {
	const { catalog } = await catalogForMarket(market, locale);
	const cfg = MARKET_CONFIG[market] || MARKET_CONFIG.fr;
	const rel = 'sponsored nofollow noopener';
	const out = [];
	for (const key of KEYS) {
		const p = catalog[key];
		if (!p || p.amazonIndispo || !p.asin) continue;
		const localRel = (p.image || '').replace(/^\//, '');
		const localRaster =
			localRel &&
			/\.(webp|jpe?g|png|gif)$/i.test(localRel) &&
			fs.existsSync(path.join(ROOT, 'public', localRel));
		if (!p.imageAmazon && !localRaster) continue;
		const href = amazonDpUrl(p.asin, market);
		out.push({
			name: p.shortName || p.name,
			asin: p.asin,
			href,
			rel,
			price: cfg.showPrices ? p.priceRange || '' : '',
			imageAmazon: p.imageAmazon || '',
		});
	}
	return out;
}

const AGE_UNIT = { fr: 'ans', en: 'years', de: 'Jahre', it: 'anni', es: 'años', nl: 'jaar' };

/**
 * Cartes produits de l'accueil refondu : mêmes modèles et mêmes liens /dp/ que « Les plus populaires »,
 * enrichies avec les données existantes (âge, langages, points forts, date du relevé de prix).
 */
export async function buildHomeProductCards(market, locale) {
	const { catalog } = await catalogForMarket(market, locale);
	const cfg = MARKET_CONFIG[market] || MARKET_CONFIG.fr;
	const lang = ['fr', 'de', 'it', 'es', 'nl'].includes(locale) ? locale : 'en';
	const out = [];
	for (const key of KEYS) {
		const p = catalog[key];
		if (!p || p.amazonIndispo || !p.asin) continue;
		const localRel = (p.image || '').replace(/^\//, '');
		const localRaster =
			localRel && /\.(webp|jpe?g|png)$/i.test(localRel) && fs.existsSync(path.join(ROOT, 'public', localRel));
		if (!p.imageAmazon && !localRaster) continue;
		let ages = String(p.ages || '');
		if (lang !== 'fr' && /\bans\b/.test(ages)) ages = ages.replace(/\s*ans\b/, ` ${AGE_UNIT[lang]}`);
		const langs = Array.isArray(p.languages) ? p.languages : [];
		const pros = Array.isArray(p.pros) ? p.pros : [];
		const prosText = pros.join(' ').toLowerCase();
		const tags = [];
		if (langs.some((l) => /scratch/i.test(l))) tags.push('scratch');
		if (langs.some((l) => /python/i.test(l))) tags.push('python');
		if (!tags.length && langs.some((l) => /arduino/i.test(l))) tags.push('arduino');
		if (/(assembl|montage|monter|aufbau|montaggio|montaje|build)/.test(prosText)) tags.push('build');
		if (/(écran|screen|bildschirm|schermo|pantalla)/.test(prosText) && !/(sans écran|screen-free|bildschirmfrei|senza schermo|sin pantalla)/.test(prosText)) tags.push('screen');
		const price = cfg.showPrices ? p.priceRange || '' : '';
		out.push({
			key,
			name: p.shortName || p.name,
			href: amazonDpUrl(p.asin, market),
			rel: 'sponsored nofollow noopener',
			image: localRaster ? `/${localRel}` : p.imageAmazon,
			ages,
			langs,
			// NL : pas de texte néerlandais dans les données produits, on n'affiche pas de texte d'une autre langue.
			summary: lang === 'nl' ? '' : lang === 'fr' ? p.description || pros[0] || '' : pros[0] || '',
			facts: lang === 'nl' ? [] : (lang === 'fr' ? pros.slice(0, 2) : pros.slice(1, 3)).filter(Boolean),
			tags: tags.slice(0, 2),
			price,
			priceDate: price ? p.prixReleveLe || '' : '',
		});
	}
	return out;
}
