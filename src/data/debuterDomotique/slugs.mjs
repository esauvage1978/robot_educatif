/**
 * Slugs du pilier « Débuter en domotique » (FR → locales).
 * Utilisé pour DOMOTIQUE_SLUGS, hreflang et pages connexes.
 */
export const PILIER_FR_SLUG = 'debuter-en-domotique-guide-complet';

export const DEBUTER_DOMOTIQUE_SLUGS = {
	'debuter-en-domotique-guide-complet': {
		en: 'begin-smart-home-complete-guide',
		de: 'smart-home-einstieg-kompletter-leitfaden',
		it: 'iniziare-domotica-guida-completa',
		es: 'empezar-domotica-guia-completa',
	},
	'quelle-box-domotique-choisir-debutant': {
		en: 'which-smart-home-hub-for-beginners',
		de: 'welche-smart-home-zentrale-fuer-einsteiger',
		it: 'quale-box-domotica-per-principianti',
		es: 'que-box-domotica-elegir-principiante',
	},
	'premiers-appareils-domotique-acheter': {
		en: 'first-smart-home-devices-to-buy',
		de: 'erste-smart-home-geraete-kaufen',
		it: 'primi-dispositivi-domotica-da-comprare',
		es: 'primeros-dispositivos-domotica-comprar',
	},
	'glossaire-domotique': {
		en: 'smart-home-glossary',
		de: 'smart-home-glossar',
		it: 'glossario-domotica',
		es: 'glosario-domotica',
	},
	'premieres-automatisations-domotique': {
		en: 'first-smart-home-automations',
		de: 'erste-smart-home-automatisierungen',
		it: 'prime-automazioni-domotica',
		es: 'primeras-automatizaciones-domotica',
	},
	'erreurs-debutant-domotique-faq': {
		en: 'smart-home-beginner-mistakes-faq',
		de: 'smart-home-anfaengerfehler-faq',
		it: 'errori-principianti-domotica-faq',
		es: 'errores-principiante-domotica-faq',
	},
};

/** Chemins absolus FR des pages du pilier (et pages intégrées). */
export const PILIER_LINKS_FR = {
	pilier: {
		href: '/domotique/debuter-en-domotique-guide-complet/',
		label: 'Débuter en domotique : le guide complet',
	},
	parOuCommencer: {
		href: '/domotique/debuter-domotique-par-ou-commencer/',
		label: 'Par où commencer (parcours court)',
	},
	box: {
		href: '/domotique/quelle-box-domotique-choisir-debutant/',
		label: 'Quelle box domotique choisir',
	},
	systemes: {
		href: '/domotique/home-assistant-jeedom-homey-quel-systeme-choisir/',
		label: 'Home Assistant, Jeedom, Homey : comparatif',
	},
	protocoles: {
		href: '/domotique/protocoles-domotique-zigbee-wifi-thread-matter/',
		label: 'Les protocoles expliqués simplement',
	},
	protocoles2027: {
		href: '/domotique/matter-thread-zigbee-wifi-differences-quel-protocole-choisir-2027/',
		label: 'Matter, Thread, Zigbee, Wi-Fi en 2027',
	},
	appareils: {
		href: '/domotique/premiers-appareils-domotique-acheter/',
		label: 'Les premiers appareils à acheter',
	},
	glossaire: {
		href: '/domotique/glossaire-domotique/',
		label: 'Glossaire de la domotique',
	},
	auto: {
		href: '/domotique/premieres-automatisations-domotique/',
		label: 'Ses premières automatisations',
	},
	erreurs: {
		href: '/domotique/erreurs-debutant-domotique-faq/',
		label: 'Erreurs de débutant et zones floues',
	},
	location: {
		href: '/domotique/domotique-location-sans-travaux/',
		label: 'Domotique en location, sans travaux',
	},
	haInstall: {
		href: '/domotique/home-assistant-raspberry-pi-5-installation/',
		label: 'Installer Home Assistant sur Raspberry Pi 5',
	},
	haGreen: {
		href: '/domotique/home-assistant-green-vs-raspberry-pi-5/',
		label: 'Home Assistant Green vs Raspberry Pi 5',
	},
	homey: {
		href: '/domotique/test-homey-pro-mini-deballage-installation/',
		label: 'Homey Pro mini : déballage et installation',
	},
	esp32: {
		href: '/domotique/projets-esp32-domotique/',
		label: 'Projets ESP32 / ESPHome',
	},
	configurateur: {
		href: '/domotique/configurateur-projet-domotique/',
		label: 'Configurateur de projet domotique',
	},
	matrice: {
		href: '/domotique/matrice-compatibilite-home-assistant-homey-zigbee-matter/',
		label: 'Matrice de compatibilité',
	},
	dongle: {
		href: '/domotique/meilleur-dongle-zigbee-home-assistant/',
		label: 'Quelle clé Zigbee choisir',
	},
	rubrique: {
		href: '/domotique/rubrique/debuter/',
		label: 'Rubrique Débuter',
	},
};

export function relatedExcept(keysToExclude = []) {
	const all = [
		'box',
		'protocoles',
		'appareils',
		'glossaire',
		'auto',
		'erreurs',
		'parOuCommencer',
	];
	return all
		.filter((k) => !keysToExclude.includes(k))
		.map((k) => PILIER_LINKS_FR[k]);
}
