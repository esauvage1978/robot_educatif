/**
 * Registre des projets ESP32 / ESPHome (data-driven).
 * Ajouter un projet = créer projects/<id>.mjs (export `project`) puis l'importer ci-dessous :
 * les pages FR/EN/DE/IT/ES, les hubs, les paires hreflang et le sitemap suivent automatiquement.
 */
import { LANGS, commonSteps, smallMaterialRows } from './shared.mjs';
import { ESP32_TUTORIALS, esp32TutorialLangPairs, tutorialPath } from './tutorials.mjs';

import { project as temperatureHumidity } from './projects/temperature-humidity.mjs';
import { project as garageDoor } from './projects/garage-door.mjs';
import { project as mmwavePresence } from './projects/mmwave-presence.mjs';
import { project as energyMeter } from './projects/energy-meter.mjs';
import { project as waterLeak } from './projects/water-leak.mjs';
import { project as weatherStation } from './projects/weather-station.mjs';
import { project as irrigation } from './projects/irrigation.mjs';
import { project as doorbell } from './projects/doorbell.mjs';
import { project as doorWindowSensor } from './projects/door-window-sensor.mjs';
import { project as ledLighting } from './projects/led-lighting.mjs';
import { project as softenerSaltLevel } from './projects/softener-salt-level.mjs';

export { ESP32_TUTORIALS, esp32TutorialLangPairs, tutorialPath };

/** Pages hub (déjà publiées, URL inchangées). */
export const ESP32_HUB_PATHS = {
	fr: '/domotique/projets-esp32-domotique/',
	en: '/en/smart-home/esp32-smart-home-project-ideas/',
	de: '/de/smart-home/esp32-smart-home-projektideen/',
	it: '/it/domotica/progetti-esp32-domotica/',
	es: '/es/domotica/proyectos-esp32-domotica/',
};

/** Dossier des pages projet, par langue. */
export const ESP32_PROJECT_BASES = {
	fr: '/domotique/projets-esp32/',
	en: '/en/smart-home/esp32-projects/',
	de: '/de/smart-home/projekte/',
	it: '/it/domotica/progetti/',
	es: '/es/domotica/proyectos/',
};

const LEVEL_ORDER = { beginner: 0, intermediate: 1, advanced: 2 };
const DEFAULT_TUTORIALS = ['install-esphome', 'flash-esp32', 'wiring-gpio', 'ota-esphome'];
const REQUIRED_TEXT = ['title', 'description', 'h1', 'objective', 'usefulness'];
const REQUIRED_LIST = ['prerequisites', 'materials', 'steps', 'haIntegration', 'troubleshooting', 'faq'];

/** @param {'fr'|'en'|'de'|'it'|'es'} lang @param {string} slug */
export function projectPath(lang, slug) {
	return `${ESP32_PROJECT_BASES[lang]}${slug}/`;
}

function deviceNameFromYaml(yaml) {
	const match = /^esphome:\s*\n\s+name:\s*([^\s#]+)/m.exec(yaml);
	return match ? match[1] : 'esp32-device';
}

function normalize(raw) {
	const deviceName = deviceNameFromYaml(raw.yaml);
	const paths = Object.fromEntries(LANGS.map((lang) => [lang, projectPath(lang, raw.slugs[lang])]));
	const locales = {};
	for (const lang of LANGS) {
		const src = raw.locales[lang];
		if (!src) throw new Error(`[esp32Projects] ${raw.id}: langue ${lang} manquante`);
		for (const key of REQUIRED_TEXT) {
			if (!src[key]) throw new Error(`[esp32Projects] ${raw.id}/${lang}: champ « ${key} » manquant`);
		}
		for (const key of REQUIRED_LIST) {
			if (!Array.isArray(src[key]) || src[key].length === 0) throw new Error(`[esp32Projects] ${raw.id}/${lang}: liste « ${key} » vide`);
		}
		const common = commonSteps(lang, deviceName);
		const flashAfter = raw.flashAfter ?? 1;
		const own = src.steps;
		locales[lang] = {
			...src,
			smallMaterials: [...smallMaterialRows(lang, raw.smallMaterialIds), ...(src.smallMaterials ?? [])],
			steps: [common.prepare, ...own.slice(0, flashAfter), common.flash, ...own.slice(flashAfter)],
			relatedTutorialIds: src.relatedTutorialIds ?? raw.relatedTutorialIds ?? DEFAULT_TUTORIALS,
		};
	}
	return { ...raw, paths, locales, deviceName, relatedTutorialIds: raw.relatedTutorialIds ?? DEFAULT_TUTORIALS };
}

export const ESP32_PROJECTS = [
	temperatureHumidity,
	garageDoor,
	mmwavePresence,
	energyMeter,
	waterLeak,
	weatherStation,
	irrigation,
	doorbell,
	doorWindowSensor,
	ledLighting,
	softenerSaltLevel,
].map(normalize);

// Garde-fous au chargement : ids et slugs uniques par langue.
{
	const ids = new Set();
	for (const project of ESP32_PROJECTS) {
		if (ids.has(project.id)) throw new Error(`[esp32Projects] id en double : ${project.id}`);
		ids.add(project.id);
	}
	for (const lang of LANGS) {
		const seen = new Set();
		for (const project of ESP32_PROJECTS) {
			const slug = project.slugs[lang];
			if (seen.has(slug)) throw new Error(`[esp32Projects] slug en double (${lang}) : ${slug}`);
			seen.add(slug);
		}
	}
}

/** Liste triée du plus simple au plus avancé (ordre du registre conservé à niveau égal). */
export function listProjects() {
	return [...ESP32_PROJECTS].sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level]);
}

/** @param {string} id */
export function getProjectById(id) {
	return ESP32_PROJECTS.find((p) => p.id === id) ?? null;
}

/** @param {'fr'|'en'|'de'|'it'|'es'} lang @param {string} slug */
export function getProjectBySlug(lang, slug) {
	return ESP32_PROJECTS.find((p) => p.slugs[lang] === slug) ?? null;
}

/** @param {'fr'|'en'|'de'|'it'|'es'} lang */
export function projectSlugs(lang) {
	return ESP32_PROJECTS.map((p) => p.slugs[lang]);
}

/** Paires de chemins {fr,en,de,it,es} des projets, pour hreflang et sélecteur de langue. */
export function esp32ProjectLangPairs() {
	return ESP32_PROJECTS.map((p) => ({ ...p.paths }));
}
