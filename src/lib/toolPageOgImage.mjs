/**
 * og:image pour pages outils domotique (DomotiqueToolLayout) et hubs techniques.
 */
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { withImageVersion } from './imageVersion';
import { ESP32_PROJECT_BASES, ESP32_HUB_PATHS, getProjectBySlug } from '../data/esp32Projects/index.mjs';
import { PRODUCTS as ESP32_PRODUCTS } from '../data/esp32Projects/shared.mjs';
import { getProjectGuideBySlug } from '../data/projectGuides/registry.mjs';
import { SLUG_TO_USE_CASE_ID } from '../data/smartHomeProjectSlugs.mjs';
import { USE_CASES } from '../data/smartHomeUseCases.mjs';
import { PRODUCTS as CONFIG_PRODUCTS } from '../data/smartHomeUseCaseConfigurator.mjs';

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

/** Segments de chemin (toutes locales) → photo produit hub. */
const HUB_SEGMENT_IMAGES = [
	{ test: /configurateur-projet-domotique|smart-home-project-catalog|proyecto-domotico|configuratore-progetto-domotica/i, image: '/images/products/home-assistant-green.webp' },
	{ test: /diagnostic-par-symptome|symptom-diagnostic|diagnostico-sintoma|diagnostica-sintomo|stoerungssuche-symptom/i, image: '/images/products/sonoff-zbdongle-e.webp' },
	{ test: /matrice-compatibilite|compatibility-matrix|kompatibilitaetsmatrix|matriz-compatibilidad|matrice-compatibilita/i, image: '/images/products/homey-pro-mini.webp' },
	{ test: /pieces-detachees|spare-parts|ersatzteile|ricambi|repuestos/i, image: '/images/products/sonoff-snzb-02d.webp' },
	{ test: /codes-erreurs|error-codes-troubleshooting|fehlercodes-stoerungen|codici-errore-risoluzione|codigos-error-solucion/i, image: '/images/products/sonoff-zbdongle-e.webp' },
	{ test: /tableau-raspberry-hat|raspberry-hat/i, image: '/images/products/raspberry-pi-5-4gb.webp' },
	{ test: /porte-garage|garage-door|garagentor|puerta-garaje|porta-garage/i, image: '/images/domotique/porte-garage-nodon-homey/nodon-sin-4-1-20-produit.webp' },
	{ test: /projets-esp32-domotique|esp32-smart-home-project|esp32-smart-home-projekt|progetti-esp32|proyectos-esp32/i, image: '/images/products/esp32-c6-devkitc.webp' },
];

const ROBOT_TOOL_IMAGES = {
	'outil-quel-robot-enfant': '/images/models/makeblock-mbot2.webp',
	'calculateur-budget-robot-classe': '/images/models/makeblock-mbot-mcore.webp',
	'configurateur-kit-robotique-classe': '/images/models/makeblock-mbot2.webp',
	'compatibilite-makeblock': '/images/models/makeblock-mbot2.webp',
	'parcours-scratch-python-6-semaines': '/images/models/makeblock-mbot-mcore.webp',
	'generateur-fiche-seance-robotique-pdf': '/images/models/makeblock-mbot2.webp',
	'tableau-reglages-capteurs-mbot2-depannage': '/images/models/makeblock-mbot2.webp',
	'ressources-svg-schemas-mbot-capteurs': '/images/models/makeblock-mbot2.webp',
};

function productImageFromUseCaseId(useCaseId) {
	const uc = USE_CASES.find((u) => u.id === useCaseId);
	if (!uc?.recipes) return undefined;
	for (const key of ['ha-zigbee', 'wifi-sans-box', 'maker-esp32']) {
		const recipe = uc.recipes[key];
		if (!recipe) continue;
		let mainId = typeof recipe.main === 'string' ? recipe.main : null;
		if (!mainId && typeof recipe.main === 'function') {
			try {
				mainId = recipe.main({ tech: 'contact-sec', eco: key });
			} catch {
				mainId = null;
			}
		}
		if (mainId && CONFIG_PRODUCTS[mainId]?.image) {
			const img = accept(CONFIG_PRODUCTS[mainId].image);
			if (img) return img;
		}
		for (const acc of recipe.accessories ?? []) {
			const pid = acc.productId;
			if (pid && CONFIG_PRODUCTS[pid]?.image) {
				const img = accept(CONFIG_PRODUCTS[pid].image);
				if (img) return img;
			}
		}
	}
	return undefined;
}

function esp32OgFromPath(path) {
	for (const lang of Object.keys(ESP32_PROJECT_BASES)) {
		const base = ESP32_PROJECT_BASES[lang];
		if (!path.includes(base.replace(/^\/|\/$/g, ''))) continue;
		const slug = path.split(base)[1]?.replace(/\/$/, '').split('/')[0];
		if (!slug) {
			for (const hub of Object.values(ESP32_HUB_PATHS)) {
				if (path.includes(hub.replace(/^\/|\/$/g, ''))) {
					return accept('/images/products/esp32-c6-devkitc.webp');
				}
			}
			continue;
		}
		const project = getProjectBySlug(lang, slug);
		if (!project) continue;
		const boardId = project.productIds?.[0];
		const boardImg = boardId && ESP32_PRODUCTS[boardId]?.image;
		if (boardImg) return accept(boardImg);
		for (const loc of Object.values(project.locales ?? {})) {
			for (const photo of loc.installation?.photos ?? []) {
				if (photo?.src && !photo.src.endsWith('.svg')) {
					const img = accept(photo.src);
					if (img) return img;
				}
			}
		}
	}
	return undefined;
}

function smartHomeProjectOg(path) {
	const m = path.match(/\/(?:domotique\/projets|smart-home\/projects|smart-home\/projekte|domotica\/proyectos|domotica\/progetti)\/([^/]+)\/?$/i);
	const slug = m?.[1];
	if (!slug) return undefined;
	let useCaseId = SLUG_TO_USE_CASE_ID[slug];
	if (!useCaseId) {
		for (const lang of ['en', 'de', 'it', 'es']) {
			const pack = getProjectGuideBySlug(lang, slug);
			if (pack?.id) {
				useCaseId = pack.id;
				break;
			}
		}
	}
	if (!useCaseId) return undefined;
	return productImageFromUseCaseId(useCaseId);
}

/** @param {string} articlePath chemin canonique type /domotique/diagnostic-par-symptome/ */
export function resolveDomotiqueToolOgImage(articlePath) {
	const path = (articlePath ?? '').toLowerCase();
	if (!path) return undefined;
	for (const row of HUB_SEGMENT_IMAGES) {
		if (row.test.test(path)) return accept(row.image);
	}
	const esp = esp32OgFromPath(path);
	if (esp) return esp;
	const sh = smartHomeProjectOg(path);
	if (sh) return sh;
	const slug = path.replace(/^\/|\/$/g, '').split('/').pop();
	if (slug && ROBOT_TOOL_IMAGES[slug]) return accept(ROBOT_TOOL_IMAGES[slug]);
	return undefined;
}

/** Résolution pour BaseHead (pathname complet). */
export function resolveToolOrHubPathOg(pathname) {
	const path = (pathname ?? '').toLowerCase().replace(/\/$/, '') + '/';
	const dom = resolveDomotiqueToolOgImage(path);
	if (dom) return dom;
	const seg = path.replace(/^\/|\/$/g, '').split('/').pop();
	if (seg && ROBOT_TOOL_IMAGES[seg]) return accept(ROBOT_TOOL_IMAGES[seg]);
	return undefined;
}