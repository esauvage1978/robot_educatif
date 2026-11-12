import { domotiquePath, frDomotiquePath } from './domotiqueI18n.mjs';
import { SMART_HOME_TOOL_PATHS } from './smartHomeToolPaths.mjs';

const L = (fr, en, de, it, es) => ({ fr, en, de, it, es });

function article(slug, labels) {
	return { slug, labels };
}

function onlyFr(href, labels) {
	return { href: { fr: href }, labels };
}

function paths(href, labels) {
	return { href, labels };
}

const GROUPS = [
	{
		title: L('Débuter', 'Getting started', 'Einstieg', 'Iniziare', 'Empezar'),
		links: [
			paths(
				{
					fr: '/domotique/',
					en: '/en/smart-home/',
					de: '/de/smart-home/',
					it: '/it/domotica/',
					es: '/es/domotica/',
				},
				L('Toute la domotique', 'Smart home hub', 'Smart-Home-Überblick', 'Hub domotica', 'Hub de domótica'),
			),
			onlyFr('/domotique/rubrique/debuter/', L('Rubrique Débuter', '', '', '', '')),
			article('debuter-domotique-par-ou-commencer', L('Par où commencer', 'Where to start', 'Wo anfangen', 'Da dove iniziare', 'Por dónde empezar')),
			onlyFr('/domotique/debuter-en-domotique-guide-complet/', L('Guide complet', '', '', '', '')),
			onlyFr('/domotique/quelle-box-domotique-choisir-debutant/', L('Quelle box choisir', '', '', '', '')),
			onlyFr('/domotique/premiers-appareils-domotique-acheter/', L('Premiers appareils', '', '', '', '')),
			onlyFr('/domotique/premieres-automatisations-domotique/', L('Premières automatisations', '', '', '', '')),
			article('protocoles-domotique-zigbee-wifi-thread-matter', L('Zigbee, Wi-Fi, Matter', 'Zigbee, Wi-Fi, Matter', 'Zigbee, WLAN, Matter', 'Zigbee, Wi-Fi, Matter', 'Zigbee, Wi-Fi, Matter')),
			article('home-assistant-jeedom-homey-quel-systeme-choisir', L('Home Assistant, Jeedom ou Homey', 'Which hub', 'Welche Zentrale', 'Quale sistema', 'Qué sistema')),
			article('domotique-location-sans-travaux', L('En location, sans travaux', 'Renting, no drilling', 'Mietwohnung, ohne Bohren', 'In affitto, senza lavori', 'De alquiler, sin obras')),
			onlyFr('/domotique/glossaire-domotique/', L('Glossaire', '', '', '', '')),
			onlyFr('/domotique/erreurs-debutant-domotique-faq/', L('Erreurs de débutant', '', '', '', '')),
			article('test-homey-pro-deballage-installation', L('Test Homey Pro', 'Homey Pro review', 'Homey-Pro-Test', 'Test Homey Pro', 'Prueba Homey Pro')),
			article('maison-connectee-2027-comparatif-home-assistant-homey-jeedom-alexa', L('Comparatif 2027', '2027 comparison', 'Vergleich 2027', 'Confronto 2027', 'Comparativa 2027')),
			article('matter-thread-zigbee-wifi-differences-quel-protocole-choisir-2027', L('Protocole en 2027', 'Protocol in 2027', 'Protokoll 2027', 'Protocollo nel 2027', 'Protocolo en 2027')),
		],
	},
	{
		title: L('Home Assistant', 'Home Assistant', 'Home Assistant', 'Home Assistant', 'Home Assistant'),
		links: [
			onlyFr('/domotique/rubrique/home-assistant/', L('Toute la rubrique', '', '', '', '')),
			article('home-assistant-raspberry-pi-5-installation', L('Installer sur Pi 5', 'Install on Pi 5', 'Auf dem Pi 5 installieren', 'Installare sul Pi 5', 'Instalar en la Pi 5')),
			article('home-assistant-green-vs-raspberry-pi-5', L('Green ou Pi 5', 'Green or Pi 5', 'Green oder Pi 5', 'Green o Pi 5', 'Green o Pi 5')),
			article('home-assistant-zigbee2mqtt-ou-zha', L('Zigbee2MQTT ou ZHA', 'Zigbee2MQTT or ZHA', 'Zigbee2MQTT oder ZHA', 'Zigbee2MQTT o ZHA', 'Zigbee2MQTT o ZHA')),
			article('matter-1-6-nouveautes-nfc-maison-connectee', L('Matter 1.6', 'Matter 1.6', 'Matter 1.6', 'Matter 1.6', 'Matter 1.6')),
			article('home-assistant-2026-10-nouveautes-matter-reolink-tuya-batteries', L('Version 2026.10', 'Release 2026.10', 'Version 2026.10', 'Versione 2026.10', 'Versión 2026.10')),
			article('secours-electrique-home-assistant-onduleur-station', L('Secours électrique', 'Backup power', 'Notstrom', 'Alimentazione di riserva', 'Respaldo eléctrico')),
			onlyFr('/domotique/secours-electrique-home-assistant-onduleur-station-ecoflow-shelly/', L('Autonomie et coupure', '', '', '', '')),
			onlyFr('/domotique/piloter-chauffage-electrique-fil-pilote-zigbee-shelly-home-assistant/', L('Radiateur fil pilote', '', '', '', '')),
			article('raspberry-pi-capteur-co2-scd41-home-assistant', L('Capteur CO2', 'CO2 sensor', 'CO2-Sensor', 'Sensore CO2', 'Sensor de CO2')),
			article('raspberry-pi-capteur-ouverture-porte-notification', L('Ouverture de porte', 'Door sensor', 'Türsensor', 'Sensore porta', 'Sensor de puerta')),
			article('raspberry-pi-detecteur-presence-pir-eclairage', L('Présence et lumière', 'Motion and lights', 'Bewegung und Licht', 'Movimento e luci', 'Movimiento y luces')),
			article('raspberry-pi-station-meteo-bme280-historique', L('Station météo', 'Weather station', 'Wetterstation', 'Stazione meteo', 'Estación meteorológica')),
			article('tendances-domotique-2027-ces-mmwave-ia-locale-energie-sans-abonnement', L('Tendances 2027', 'Trends 2027', 'Trends 2027', 'Tendenze 2027', 'Tendencias 2027')),
		],
	},
	{
		title: L('ESP32', 'ESP32', 'ESP32', 'ESP32', 'ESP32'),
		links: [
			onlyFr('/domotique/rubrique/esp32/', L('Toute la rubrique', '', '', '', '')),
			article('quelle-carte-esp32-choisir-domotique', L('Quelle carte choisir', 'Which board', 'Welche Platine', 'Quale scheda', 'Qué placa')),
			onlyFr('/domotique/bases-cablage-esp32-gpio/', L('Câblage GPIO', '', '', '', '')),
			onlyFr('/domotique/installer-esphome-home-assistant/', L('Installer ESPHome', '', '', '', '')),
			onlyFr('/domotique/flasher-code-esp32-esphome/', L('Flasher en USB', '', '', '', '')),
			onlyFr('/domotique/mises-a-jour-ota-esphome/', L('Mises à jour OTA', '', '', '', '')),
			article('esp32-esphome-capteur-temperature', L('Capteur de température', 'Temperature sensor', 'Temperatursensor', 'Sensore di temperatura', 'Sensor de temperatura')),
			article('ouvrir-porte-garage-smartphone-esp32-esphome', L('Porte de garage', 'Garage door', 'Garagentor', 'Porta del garage', 'Puerta del garaje')),
			article('projets-esp32-domotique', L('Idées de projets', 'Project ideas', 'Projektideen', 'Idee di progetti', 'Ideas de proyectos')),
		],
	},
	{
		title: L('Acheter', 'Buying', 'Kaufen', 'Acquistare', 'Comprar'),
		links: [
			onlyFr('/domotique/rubrique/guides-achat/', L('Guides d’achat', '', '', '', '')),
			article('meilleur-dongle-zigbee-home-assistant', L('Clé Zigbee', 'Zigbee dongle', 'Zigbee-Stick', 'Chiavetta Zigbee', 'Dongle Zigbee')),
			article('prise-connectee-zigbee-home-assistant', L('Prise connectée', 'Smart plug', 'Smarte Steckdose', 'Presa smart', 'Enchufe inteligente')),
			article('capteur-temperature-zigbee', L('Capteur Zigbee', 'Zigbee sensor', 'Zigbee-Sensor', 'Sensore Zigbee', 'Sensor Zigbee')),
			article('camera-surveillance-exterieure-solaire-iegeek', L('Caméra solaire', 'Solar camera', 'Solarkamera', 'Telecamera solare', 'Cámara solar')),
			article('test-homey-pro-mini-deballage-installation', L('Test Homey Pro mini', 'Homey Pro mini', 'Homey Pro mini', 'Homey Pro mini', 'Homey Pro mini')),
			paths(
				{ it: '/it/shelly-gen4-quale-modulo-scegliere/', es: '/es/shelly-gen4-que-modulo-elegir/' },
				L('', '', '', 'Moduli Shelly Gen4', 'Módulos Shelly Gen4'),
			),
			onlyFr('/domotique/rubrique/robots-aspirateurs/', L('Robots aspirateurs', '', '', '', '')),
			article('robot-aspirateur-moins-de-200-euros', L('Aspirateur moins de 200 €', 'Vacuum under 200', 'Saugroboter unter 200 €', 'Aspirapolvere sotto 200 €', 'Aspirador por menos de 200 €')),
			article('robot-aspirateur-compatible-home-assistant', L('Compatible Home Assistant', 'Works with Home Assistant', 'Mit Home Assistant', 'Con Home Assistant', 'Con Home Assistant')),
			article('robot-aspirateur-navigation-lidar-camera-gyroscope', L('LiDAR, caméra ou gyro', 'LiDAR, camera or gyro', 'LiDAR, Kamera oder Gyro', 'LiDAR, camera o giro', 'LiDAR, cámara o giro')),
			article('robot-aspirateur-laveur-serpilliere-station', L('Laveur et station', 'Mop and dock', 'Wischen und Station', 'Lavaggio e stazione', 'Fregado y estación')),
		],
	},
	{
		title: L('Outils', 'Tools', 'Werkzeuge', 'Strumenti', 'Herramientas'),
		links: [
			onlyFr('/domotique/configurateur-projet-domotique/', L('Configurateur de projet', '', '', '', '')),
			onlyFr('/domotique/diagnostic-par-symptome/', L('Diagnostic par symptôme', '', '', '', '')),
			onlyFr('/domotique/tableau-raspberry-hat/', L('Raspberry Pi et HAT', '', '', '', '')),
			paths(SMART_HOME_TOOL_PATHS.troubleshooting, L('Codes erreurs', 'Error codes', 'Fehlercodes', 'Codici errore', 'Códigos de error')),
			paths(SMART_HOME_TOOL_PATHS.compatMatrix, L('Matrice de compatibilité', 'Compatibility matrix', 'Kompatibilitätsmatrix', 'Matrice di compatibilità', 'Matriz de compatibilidad')),
			paths(SMART_HOME_TOOL_PATHS.spareParts, L('Pièces et capteurs', 'Spare parts and sensors', 'Ersatzteile und Sensoren', 'Ricambi e sensori', 'Repuestos y sensores')),
		],
	},
];

function langOf(pathname) {
	const p = pathname.replace(/^\/site_vitrine\/robot_educatif/, '');
	if (p === '/de' || p.startsWith('/de/')) return 'de';
	if (p === '/it' || p.startsWith('/it/')) return 'it';
	if (p === '/es' || p.startsWith('/es/')) return 'es';
	if (
		p === '/en' ||
		p.startsWith('/en/') ||
		p === '/uk' ||
		p.startsWith('/uk/') ||
		p === '/ca' ||
		p.startsWith('/ca/') ||
		p === '/us' ||
		p.startsWith('/us/')
	) {
		return 'en';
	}
	return 'fr';
}

function hrefOf(item, lang) {
	if (item.slug) {
		return lang === 'fr' ? frDomotiquePath(item.slug) : domotiquePath(lang, item.slug);
	}
	return item.href?.[lang] || null;
}

export function navDomotiqueForPath(pathname) {
	const lang = langOf(pathname);
	const trigger = { fr: 'Domotique', en: 'Smart home', de: 'Smart Home', it: 'Domotica', es: 'Domótica' }[lang];
	const groups = GROUPS.map((group) => ({
		title: group.title[lang],
		links: group.links
			.map((item) => {
				const href = hrefOf(item, lang);
				const label = item.labels[lang];
				if (!href || !label) return null;
				return { href, label, hint: '' };
			})
			.filter(Boolean),
	})).filter((group) => group.links.length > 0);
	return { trigger, cols: groups.length, groups };
}
