/**
 * Résolution og:image pour articles (blog, domotique, pages MD i18n) : photos produit réelles uniquement.
 */
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { withImageVersion } from './imageVersion';
import { findPair, slugOf } from './i18n.mjs';

const PRESET_IMAGES = {
	general: '/images/products/mbot2.webp',
	mbot: '/images/products/mbot.webp',
	mbot2: '/images/products/mbot2.webp',
	mbotVs: '/images/products/mbot2.webp',
	matatalab: '/images/products/tale-bot-pro-kit.webp',
	sansEcran: '/images/products/tale-bot-pro-kit.webp',
	codeyRocky: '/images/products/codey-rocky.webp',
	cyberpi: '/images/products/cyberpi.webp',
	raspberry: '/images/products/raspberry-pi-5-4gb.webp',
	eilik: '/images/products/mbot2.webp',
	scratch: '/images/products/mbot.webp',
	lego: '/images/products/mbot2.webp',
	pythonTests: '/images/products/mbot2.webp',
};

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
	'deballage-et-premier-pas-du-robot-tale-bot-de-chez-matatalab': 'matatalab',
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
	'thymio-3-nouveautes-prix-avis-comparatif-mbot2': 'mbot2',
	'sphero-blueprint-robotics-presentation-avis-robot-modulaire': 'mbot2',
	'programmation-enfant-a-quel-age-commencer': 'matatalab',
	'when-to-start-coding-with-kids': 'matatalab',
};

const EXTRA_SLUG_IMAGES = {
	'homey-mini': '/images/products/homey-pro-mini.webp',
	'homey-pro': '/images/products/homey-pro.webp',
	matatalab: '/images/products/tale-bot-pro-kit.webp',
};

function publicExists(pathname) {
	const clean = pathname.split('?')[0].replace(/^\//, '');
	return existsSync(join(process.cwd(), 'public', clean));
}

function accept(path) {
	if (!path || typeof path !== 'string') return undefined;
	const bare = path.split('?')[0];
	if (bare.includes('blog-placeholder')) return undefined;
	if (bare.includes('/images/illustrations/')) return undefined;
	if (bare.includes('/images/blog-thumbnails/')) return undefined;
	if (/\.svg$/i.test(bare)) return undefined;
	if (!bare.startsWith('/')) return undefined;
	if (!publicExists(bare)) return undefined;
	return withImageVersion(bare);
}

function inferFromSlug(slug) {
	if (!slug) return undefined;
	const s = slug.toLowerCase();
	if (PRODUCT_BY_SLUG[slug]) {
		const key = PRODUCT_BY_SLUG[slug];
		const fromExtra = EXTRA_SLUG_IMAGES[key];
		if (fromExtra) return accept(fromExtra);
		const fromPreset = PRESET_IMAGES[key];
		if (fromPreset) return accept(fromPreset);
	}
	if (s.includes('homey-pro-mini') || s.includes('homey-mini')) return accept(EXTRA_SLUG_IMAGES['homey-mini']);
	if (s.includes('homey')) return accept(EXTRA_SLUG_IMAGES['homey-pro']);
	if (s.includes('osoyoo')) {
		const cand = accept('/images/blog/osoyoo-sport-car-v1-unboxing/boite-osoyoo-sport-car-v1.webp');
		if (cand) return cand;
	}
	if (s.includes('codey')) return accept(PRESET_IMAGES.codeyRocky);
	if (s.includes('cyberpi')) return accept(PRESET_IMAGES.cyberpi);
	if (s.includes('raspberry')) return accept(PRESET_IMAGES.raspberry);
	if (s.includes('mbot2') || s.includes('mbot-2')) return accept(PRESET_IMAGES.mbot2);
	if (s.includes('mbot') || s.includes('mblock') || s.includes('makeblock')) return accept(PRESET_IMAGES.mbot);
	if (s.includes('esp32') || s.includes('esphome')) return accept('/images/products/esp32-c6-devkitc.webp');
	if (
		s.includes('temperature-sensor') ||
		s.includes('temperatursensor') ||
		s.includes('capteur-temperature') ||
		s.includes('sensore-temperatura') ||
		s.includes('sensor-temperatura')
	)
		return accept('/images/products/sonoff-snzb-02d.webp');
	if (s.includes('vacuum') || s.includes('aspirateur') || s.includes('saugroboter') || s.includes('aspirapolvere'))
		return accept('/images/products/roborock-q7-m5.webp');
	if (s.includes('dongle') || s.includes('zigbee-stick') || s.includes('chiavetta-zigbee') || s.includes('bester-zigbee'))
		return accept('/images/products/sonoff-zbdongle-e.webp');
	if (
		s.includes('begin-smart-home') ||
		s.includes('debuter-en-domotique') ||
		s.includes('einstieg-kompletter') ||
		s.includes('guida-completa') ||
		s.includes('guia-completa') ||
		s.includes('quel-box-domotique') ||
		s.includes('which-smart-home-hub') ||
		s.includes('welche-smart-home')
	)
		return accept('/images/products/home-assistant-green.webp');
	if (s.includes('homey')) return accept(EXTRA_SLUG_IMAGES['homey-pro']);
	if (
		s.includes('home-assistant') ||
		s.includes('smart-home') ||
		s.includes('domotique') ||
		s.includes('domotica') ||
		s.includes('shelly')
	)
		return accept('/images/products/home-assistant-green.webp');
	if (s.includes('zigbee')) return accept('/images/products/sonoff-zbdongle-e.webp');
	if (s.includes('lego') || s.includes('spike')) return accept(PRESET_IMAGES.lego);
	if (s.includes('scratch') || s.includes('mblock')) return accept(PRESET_IMAGES.scratch);
	if (s.includes('python') || s.includes('pendu') || s.includes('puissance-4') || s.includes('bataille'))
		return accept(PRESET_IMAGES.mbot2);
	if (/robot|mbot|arduino|elegoo|cyberpi|codey|matatalab|tale-bot|cadeau|gift|noel|christmas/i.test(s))
		return accept(PRESET_IMAGES.mbot2);
	if (/programmation|programmier|programming|codierung/i.test(s) && /enfant|kind|kids|ninos|bambini/i.test(s))
		return accept(PRESET_IMAGES.matatalab);
	return undefined;
}

/**
 * @param {{ heroImage?: string, articleSlug?: string, amazonPreset?: string, pathname?: string }} opts
 */
export function resolveArticleOgImage(opts) {
	const hero = typeof opts.heroImage === 'string' ? opts.heroImage.trim() : '';
	const fromHero = accept(hero);
	if (fromHero) return fromHero;
	if (opts.amazonPreset && PRESET_IMAGES[opts.amazonPreset]) {
		const fromPreset = accept(PRESET_IMAGES[opts.amazonPreset]);
		if (fromPreset) return fromPreset;
	}
	const slug = opts.articleSlug ?? '';
	const fromSlug = inferFromSlug(slug);
	if (fromSlug) return fromSlug;
	const path = opts.pathname ?? '';
	if (path) {
		const normalized = path.endsWith('/') ? path : `${path}/`;
		const pair = findPair(normalized);
		if (pair?.fr) {
			const frSlug = slugOf(pair.fr);
			const mapped = PRODUCT_BY_SLUG[frSlug];
			if (mapped && PRESET_IMAGES[mapped]) return accept(PRESET_IMAGES[mapped]);
			if (mapped && EXTRA_SLUG_IMAGES[mapped]) return accept(EXTRA_SLUG_IMAGES[mapped]);
			const fromFr = inferFromSlug(frSlug);
			if (fromFr) return fromFr;
		}
	}
	return undefined;
}