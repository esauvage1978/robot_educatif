import { getAllCatalogEntries } from './unifiedErrorCatalog.mjs';
import { listProjects, projectPath, ESP32_HUB_PATHS } from './esp32Projects/index.mjs';
import { UI } from './esp32Projects/ui.mjs';
import { SMART_HOME_TOOL_PATHS } from '../lib/smartHomeToolPaths.mjs';

/** Chemins des index « dossier » (403 DirectoryIndex) — hreflang réciproques. */
export const SECTION_INDEX_PATHS = {
	'code-error': {
		fr: '/domotique/code-erreur/',
		en: '/en/smart-home/error/',
		de: '/de/smart-home/error/',
		it: '/it/domotica/error/',
		es: '/es/domotica/error/',
		nl: '/nl/smart-home/error/',
	},
	'esp32-projects': {
		fr: '/domotique/projets-esp32/',
		en: '/en/smart-home/esp32-projects/',
		de: '/de/smart-home/projekte/',
		it: '/it/domotica/progetti/',
		es: '/es/domotica/proyectos/',
		nl: '/nl/smart-home/esp32-projects/',
	},
	rubrique: {
		fr: '/domotique/rubrique/',
		en: '/en/smart-home/topics/',
		de: '/de/smart-home/themen/',
		it: '/it/domotica/temi/',
		es: '/es/domotica/temas/',
		nl: '/nl/smart-home/topics/',
	},
};

/** Paires hreflang à fusionner dans LANG_PAIRS. */
export const SECTION_INDEX_LANG_PAIRS = Object.keys(SECTION_INDEX_PATHS).map((key) => ({
	...SECTION_INDEX_PATHS[key],
}));

const LANGS_PAGE = ['fr', 'en', 'de', 'it', 'es', 'nl'];

function pick(obj, lang) {
	if (!obj) return '';
	if (typeof obj === 'string') return obj;
	return obj[lang] || obj.fr || obj.en || '';
}

/** @param {'fr'|'en'|'de'|'it'|'es'|'nl'} lang */
function detailLangForErrors(lang) {
	if (lang === 'fr') return 'fr';
	return 'en';
}

/** @param {'fr'|'en'|'de'|'it'|'es'|'nl'} lang */
export function errorCodeDetailBase(lang) {
	const d = detailLangForErrors(lang);
	return d === 'fr' ? '/domotique/code-erreur/' : '/en/smart-home/error/';
}

const COPY = {
	fr: {
		codeError: {
			title: 'Codes erreur et dépannage domotique',
			description:
				'Index des fiches code erreur et symptômes (Zigbee, Home Assistant, Shelly, robots éducatifs, etc.) publiées sur le site.',
			hubLabel: 'Catalogue interactif (filtres)',
			lead: 'Chaque lien mène vers une fiche détaillée : symptômes, diagnostic et correctifs documentés.',
		},
		esp32: {
			title: 'Projets ESP32 et ESPHome',
			description: 'Les projets domotique ESP32 publiés avec tutoriel ESPHome et intégration Home Assistant.',
			hubLabel: 'Hub idées de projets',
			lead: 'Onze projets pas à pas : capteurs, garage, arrosage, énergie, présence mmWave, etc.',
		},
		rubrique: {
			title: 'Rubriques domotique',
			description: 'Les cinq rubriques éditoriales domotique : débuter, Home Assistant, ESP32, guides d’achat, robots aspirateurs.',
			hubLabel: 'Accueil domotique',
			lead: 'Sélectionnez une rubrique pour voir les guides associés.',
		},
	},
	en: {
		codeError: {
			title: 'Smart home error codes index',
			description: 'Index of published error-code and troubleshooting articles (Zigbee, Home Assistant, Shelly, educational robots, and more).',
			hubLabel: 'Interactive troubleshooting catalog',
			lead: 'Each link opens a full article with symptoms, diagnosis, and documented fixes.',
		},
		esp32: {
			title: 'ESP32 and ESPHome project guides',
			description: 'Published ESP32 smart-home projects with ESPHome walkthroughs and Home Assistant integration.',
			hubLabel: 'ESP32 project ideas hub',
			lead: 'Eleven step-by-step builds: sensors, garage door, irrigation, energy, mmWave presence, and more.',
		},
		rubrique: {
			title: 'Smart home guide sections',
			description: 'Five editorial sections: getting started, Home Assistant, ESP32, buying guides, and robot vacuums.',
			hubLabel: 'Smart home home',
			lead: 'Open a section to browse its guides.',
		},
	},
	de: {
		codeError: {
			title: 'Fehlercodes Smart Home',
			description: 'Übersicht der veröffentlichten Fehlercode- und Störungsartikel (Zigbee, Home Assistant, Shelly, Lernroboter).',
			hubLabel: 'Interaktiver Fehlerkatalog',
			lead: 'Die Detailseiten sind auf Französisch oder Englisch verlinkt — Inhalte unverändert vom Redaktionsteam.',
		},
		esp32: {
			title: 'ESP32-Projekte',
			description: 'Veröffentlichte ESP32-/ESPHome-Projekte mit Home-Assistant-Anbindung.',
			hubLabel: 'ESP32-Projektideen',
			lead: 'Elf Schritt-für-Schritt-Projekte aus dem Projektregister.',
		},
		rubrique: {
			title: 'Smart-Home-Rubriken',
			description: 'Fünf Rubriken: Einstieg, Home Assistant, ESP32, Kaufberatung, Saugroboter.',
			hubLabel: 'Smart-Home-Start',
			lead: 'Rubrik wählen, um die verknüpften Artikel zu öffnen.',
		},
	},
	it: {
		codeError: {
			title: 'Codici errore domotica',
			description: 'Indice delle schede errori e risoluzione problemi pubblicate (Zigbee, Home Assistant, Shelly, robot educativi).',
			hubLabel: 'Catalogo interattivo',
			lead: 'Ogni scheda dettagliata è collegata nella versione francese o inglese disponibile sul sito.',
		},
		esp32: {
			title: 'Progetti ESP32',
			description: 'Progetti domotici ESP32 pubblicati con ESPHome e Home Assistant.',
			hubLabel: 'Hub idee ESP32',
			lead: 'Undici progetti dal registro editoriale.',
		},
		rubrique: {
			title: 'Sezioni domotica',
			description: 'Cinque sezioni: iniziare, Home Assistant, ESP32, guide acquisto, robot aspirapolvere.',
			hubLabel: 'Home domotica',
			lead: 'Apri una sezione per i guide collegati.',
		},
	},
	es: {
		codeError: {
			title: 'Códigos de error domótica',
			description: 'Índice de fichas de códigos de error y resolución publicadas (Zigbee, Home Assistant, Shelly, robots educativos).',
			hubLabel: 'Catálogo interactivo',
			lead: 'Cada enlace abre la ficha en francés o inglés según la versión publicada.',
		},
		esp32: {
			title: 'Proyectos ESP32',
			description: 'Proyectos domóticos ESP32 publicados con ESPHome e integración en Home Assistant.',
			hubLabel: 'Hub de ideas ESP32',
			lead: 'Once proyectos del registro editorial.',
		},
		rubrique: {
			title: 'Secciones domótica',
			description: 'Cinco secciones: empezar, Home Assistant, ESP32, guías de compra, robots aspiradores.',
			hubLabel: 'Inicio domótica',
			lead: 'Elija una sección para ver las guías asociadas.',
		},
	},
	nl: {
		codeError: {
			title: 'Smart home foutcodes',
			description: 'Overzicht van gepubliceerde foutcode- en storingsartikelen (Zigbee, Home Assistant, Shelly).',
			hubLabel: 'Interactieve catalogus',
			lead: 'Detailpagina’s zijn gelinkt in het Frans of Engels, zoals op de site gepubliceerd.',
		},
		esp32: {
			title: 'ESP32-projecten',
			description: 'Gepubliceerde ESP32-projecten met ESPHome en Home Assistant.',
			hubLabel: 'ESP32-projectideeën',
			lead: 'Elf projecten; links wijzen naar de gelokaliseerde of Engelse versie.',
		},
		rubrique: {
			title: 'Smart home onderwerpen',
			description: 'Vijf rubrieken: starten, Home Assistant, ESP32, koopgidsen, robotstofzuigers.',
			hubLabel: 'Smart home',
			lead: 'Kies een rubriek om de gekoppelde gidsen te openen.',
		},
	},
};

/** @param {'fr'|'en'|'de'|'it'|'es'|'nl'} lang */
export function sectionCopy(lang, section) {
	const L = COPY[lang] || COPY.en;
	if (section === 'code-error') return L.codeError;
	if (section === 'esp32-projects') return L.esp32;
	return L.rubrique;
}

/** @param {'fr'|'en'|'de'|'it'|'es'|'nl'} lang */
export function hubPathForSection(lang, section) {
	const domBase =
		lang === 'fr'
			? '/domotique/'
			: lang === 'de'
				? '/de/smart-home/'
				: lang === 'it'
					? '/it/domotica/'
					: lang === 'es'
						? '/es/domotica/'
						: lang === 'nl'
							? '/nl/smart-home/'
							: '/en/smart-home/';
	if (section === 'code-error') {
		return SMART_HOME_TOOL_PATHS.troubleshooting[lang === 'fr' ? 'fr' : lang === 'de' ? 'de' : lang === 'it' ? 'it' : lang === 'es' ? 'es' : 'en'];
	}
	if (section === 'esp32-projects') {
		return ESP32_HUB_PATHS[lang === 'nl' ? 'en' : lang] || ESP32_HUB_PATHS.en;
	}
	return domBase;
}

/** @param {'fr'|'en'|'de'|'it'|'es'|'nl'} lang */
export function buildCodeErrorIndexItems(lang) {
	const displayLang = ['fr', 'en', 'de', 'it', 'es', 'nl'].includes(lang) ? lang : 'en';
	const linkLang = detailLangForErrors(lang);
	const base = errorCodeDetailBase(lang);
	return getAllCatalogEntries()
		.map((e) => ({
			href: `${base}${e.slug}/`,
			title: pick(e.title, displayLang),
			meta: e.error_code ? String(e.error_code) : e.slug,
		}))
		.sort((a, b) => a.title.localeCompare(b.title, linkLang === 'fr' ? 'fr' : 'en'));
}

/** @param {'fr'|'en'|'de'|'it'|'es'|'nl'} lang */
export function buildEsp32IndexItems(lang) {
	const projectLang = LANGS_PAGE.includes(lang) && lang !== 'nl' ? lang : 'en';
	const ui = UI[projectLang] || UI.en;
	return listProjects().map((p) => {
		const slug = p.slugs[projectLang];
		const loc = p.locales[projectLang] || p.locales.en;
		return {
			href: projectPath(projectLang, slug),
			title: loc.h1,
			meta: ui.levels[p.level],
		};
	});
}

const RUBRIQUE_CHILD_PATHS = {
	debuter: {
		fr: '/domotique/rubrique/debuter/',
		en: '/en/smart-home/getting-started-guides/',
		de: '/de/smart-home/smart-home-einstieg-kompletter-leitfaden/',
		it: '/it/domotica/iniziare-domotica-guida-completa/',
		es: '/es/domotica/empezar-domotica-guia-completa/',
		nl: '/en/smart-home/getting-started-guides/',
	},
	'home-assistant': {
		fr: '/domotique/rubrique/home-assistant/',
		en: '/en/smart-home/home-assistant/',
		de: '/de/smart-home/',
		it: '/it/domotica/',
		es: '/es/domotica/',
		nl: '/en/smart-home/home-assistant/',
	},
	esp32: {
		fr: '/domotique/rubrique/esp32/',
		en: '/en/smart-home/esp32-projects/',
		de: '/de/smart-home/esp32-smart-home-projektideen/',
		it: '/it/domotica/progetti-esp32-domotica/',
		es: '/es/domotica/proyectos-esp32-domotica/',
		nl: '/en/smart-home/esp32-projects/',
	},
	'guides-achat': {
		fr: '/domotique/rubrique/guides-achat/',
		en: '/en/smart-home/buying-guides/',
		de: '/de/smart-home/',
		it: '/it/domotica/',
		es: '/es/domotica/',
		nl: '/en/smart-home/buying-guides/',
	},
	'robots-aspirateurs': {
		fr: '/domotique/rubrique/robots-aspirateurs/',
		en: '/en/smart-home/robot-vacuums/',
		de: '/de/smart-home/',
		it: '/it/domotica/',
		es: '/es/domotica/',
		nl: '/en/smart-home/robot-vacuums/',
	},
};

const RUBRIQUE_TITLES = {
	debuter: {
		fr: 'Débuter en domotique',
		en: 'Getting started with smart home',
		de: 'Smart Home Einstieg',
		it: 'Iniziare con la domotica',
		es: 'Empezar en domótica',
		nl: 'Starten met smart home',
	},
	'home-assistant': {
		fr: 'Home Assistant',
		en: 'Home Assistant',
		de: 'Home Assistant',
		it: 'Home Assistant',
		es: 'Home Assistant',
		nl: 'Home Assistant',
	},
	esp32: {
		fr: 'Projets ESP32',
		en: 'ESP32 projects',
		de: 'ESP32-Projekte',
		it: 'Progetti ESP32',
		es: 'Proyectos ESP32',
		nl: 'ESP32-projecten',
	},
	'guides-achat': {
		fr: "Guides d'achat domotique",
		en: 'Smart home buying guides',
		de: 'Kaufberatung Smart Home',
		it: 'Guide acquisto domotica',
		es: 'Guías de compra domótica',
		nl: 'Koopgidsen smart home',
	},
	'robots-aspirateurs': {
		fr: 'Robots aspirateurs',
		en: 'Robot vacuums',
		de: 'Saugroboter',
		it: 'Robot aspirapolvere',
		es: 'Robots aspiradores',
		nl: 'Robotstofzuigers',
	},
};

/** @param {'fr'|'en'|'de'|'it'|'es'|'nl'} lang */
export function buildRubriqueIndexItems(lang) {
	const L = lang === 'nl' ? 'en' : lang;
	return Object.keys(RUBRIQUE_CHILD_PATHS).map((key) => ({
		href: RUBRIQUE_CHILD_PATHS[key][lang] || RUBRIQUE_CHILD_PATHS[key].en,
		title: RUBRIQUE_TITLES[key][lang] || RUBRIQUE_TITLES[key][L],
		meta: key,
	}));
}

/** @param {'code-error'|'esp32-projects'|'rubrique'} section @param {'fr'|'en'|'de'|'it'|'es'|'nl'} lang */
export function buildSectionIndexItems(section, lang) {
	if (section === 'code-error') return buildCodeErrorIndexItems(lang);
	if (section === 'esp32-projects') return buildEsp32IndexItems(lang);
	return buildRubriqueIndexItems(lang);
}

/** @param {'code-error'|'esp32-projects'|'rubrique'} section @param {'fr'|'en'|'de'|'it'|'es'|'nl'} lang */
export function articlePathForSection(section, lang) {
	return SECTION_INDEX_PATHS[section][lang];
}