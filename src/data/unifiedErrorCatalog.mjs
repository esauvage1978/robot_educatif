import { TROUBLE_ENTRIES } from './smartHomeTroubleshooting.mjs';
import { FORUM_ERROR_ENTRIES } from './forumErrorEntries.mjs';

/** @typedef {{ slug: string, category_slug: string, brand_slug: string, product_slug: string|null, applicable_products?: string[], error_code: string, difficulty: number, time: string, cost: string, tools: Record<string,string>, ecosystem: string[], title: Record<string,string>, symptoms: Record<string,string>, fix: Record<string,string>, caution?: Record<string,string>, savNote?: Record<string,string> }} CatalogErrorEntry */

/** @typedef {'fr'|'en'|'de'|'it'|'es'} Lang */

export const DEVICE_CATEGORIES = [
	{
		slug: 'micromodules-relais',
		sort_order: 10,
		name_fr: 'Micromodules & Relais encastrables',
		name_en: 'In-wall modules & relays',
		name_de: 'Unterputzmodule & Relais',
		name_it: 'Micromoduli & relè a incasso',
		name_es: 'Micromódulos y relés empotrados',
	},
	{
		slug: 'coordinateurs-cles',
		sort_order: 20,
		name_fr: 'Coordinateurs & Clés Zigbee/Thread',
		name_en: 'Zigbee/Thread coordinators & sticks',
		name_de: 'Zigbee/Thread-Coordinators & Sticks',
		name_it: 'Coordinatori e chiavette Zigbee/Thread',
		name_es: 'Coordinadores y dongles Zigbee/Thread',
	},
	{
		slug: 'box-passerelles',
		sort_order: 30,
		name_fr: 'Box & Passerelles Domotiques',
		name_en: 'Smart home hubs & gateways',
		name_de: 'Smart-Home-Boxen & Gateways',
		name_it: 'Box e gateway domotici',
		name_es: 'Centrales y pasarelas domóticas',
	},
	{
		slug: 'capteurs-detecteurs',
		sort_order: 40,
		name_fr: 'Capteurs & Détecteurs',
		name_en: 'Sensors & detectors',
		name_de: 'Sensoren & Detektoren',
		name_it: 'Sensori e rilevatori',
		name_es: 'Sensores y detectores',
	},
	{
		slug: 'tetes-thermostatiques',
		sort_order: 50,
		name_fr: 'Têtes thermostatiques & Chauffage',
		name_en: 'Thermostatic heads & heating',
		name_de: 'Thermostatköpfe & Heizung',
		name_it: 'Teste termostatiche e riscaldamento',
		name_es: 'Cabezales termostáticos y calefacción',
	},
	{
		slug: 'robots-educatifs',
		sort_order: 60,
		name_fr: 'Robots éducatifs & Cartes mBot/Arduino',
		name_en: 'Educational robots & mBot/Arduino boards',
		name_de: 'Lernroboter & mBot/Arduino-Karten',
		name_it: 'Robot educativi e schede mBot/Arduino',
		name_es: 'Robots educativos y placas mBot/Arduino',
	},
];

export const BRANDS = [
	{
		slug: 'shelly',
		name: 'Shelly',
		is_affiliate_partner: 1,
		priority_rank: 1,
		official_site_url: 'https://www.shelly.com',
		support_url: 'https://support.shelly.cloud',
		support_email: null,
		support_phone: null,
		affiliate_default_url: 'https://www.shelly.com',
	},
	{
		slug: 'makeblock',
		name: 'Makeblock',
		is_affiliate_partner: 1,
		priority_rank: 2,
		official_site_url: 'https://www.makeblock.com',
		support_url: 'https://support.makeblock.com',
		support_email: 'support@makeblock.com',
		support_phone: '+86 755 2639 2228',
		affiliate_default_url: 'https://www.makeblock.com',
	},
	{
		slug: 'sonoff',
		name: 'Sonoff (ITEAD)',
		is_affiliate_partner: 1,
		priority_rank: 3,
		official_site_url: 'https://sonoff.tech',
		support_url: 'https://itead.cc/contact/',
		support_email: 'support@itead.cc',
		support_phone: null,
		affiliate_default_url: 'https://sonoff.tech',
	},
	{
		slug: 'aqara',
		name: 'Aqara',
		is_affiliate_partner: 1,
		priority_rank: 4,
		official_site_url: 'https://www.aqara.com',
		support_url: 'https://www.aqara.com/fr/support/',
		support_email: 'support@aqara.com',
		support_phone: null,
		affiliate_default_url: 'https://www.aqara.com',
	},
	{
		slug: 'homey',
		name: 'Homey (Athom)',
		is_affiliate_partner: 1,
		priority_rank: 5,
		official_site_url: 'https://homey.app',
		support_url: 'https://support.homey.app',
		support_email: null,
		support_phone: null,
		affiliate_default_url: 'https://homey.app',
	},
	{
		slug: 'home-assistant',
		name: 'Home Assistant / Nabu Casa',
		is_affiliate_partner: 1,
		priority_rank: 8,
		official_site_url: 'https://www.home-assistant.io',
		support_url: 'https://www.home-assistant.io/docs/',
		support_email: null,
		support_phone: null,
		affiliate_default_url: 'https://www.nabucasa.com',
	},
	{
		slug: 'arduino',
		name: 'Arduino',
		is_affiliate_partner: 0,
		priority_rank: 15,
		official_site_url: 'https://www.arduino.cc',
		support_url: 'https://support.arduino.cc',
		support_email: null,
		support_phone: null,
		affiliate_default_url: null,
	},
	{
		slug: 'tapo',
		name: 'Tapo (TP-Link)',
		is_affiliate_partner: 0,
		priority_rank: 40,
		official_site_url: 'https://www.tapo.com',
		support_url: 'https://www.tapo.com/fr/support/',
		support_email: null,
		support_phone: null,
		affiliate_default_url: null,
	},
	{
		slug: 'switchbot',
		name: 'SwitchBot',
		is_affiliate_partner: 0,
		priority_rank: 41,
		official_site_url: 'https://www.switch-bot.com',
		support_url: 'https://support.switch-bot.com',
		support_email: null,
		support_phone: null,
		affiliate_default_url: null,
	},
	{
		slug: 'philips-hue',
		name: 'Philips Hue',
		is_affiliate_partner: 0,
		priority_rank: 42,
		official_site_url: 'https://www.philips-hue.com',
		support_url: 'https://www.philips-hue.com/fr-fr/support',
		support_email: null,
		support_phone: null,
		affiliate_default_url: null,
	},
];

export const PRODUCT_IMAGE_CREDIT =
	'Wikimedia Commons / Open Source (CC-BY-SA / GPL-3.0 / Photo atelier)';

/** @type {{ slug: string, brand_slug: string, category_slug: string, name: string, protocol: string, official_doc_url?: string, image_url: string, image_credit: string }[]} */
const RAW_PRODUCTS = [
	{ slug: 'shelly-1-mini-gen3', brand_slug: 'shelly', category_slug: 'micromodules-relais', name: 'Shelly 1 Mini Gen3', protocol: 'Wi-Fi' },
	{ slug: 'shelly-plus-2pm', brand_slug: 'shelly', category_slug: 'micromodules-relais', name: 'Shelly Plus 2PM', protocol: 'Wi-Fi' },
	{ slug: 'shelly-pro-3em', brand_slug: 'shelly', category_slug: 'micromodules-relais', name: 'Shelly Pro 3EM', protocol: 'Wi-Fi' },
	{ slug: 'shelly-plus-1pm', brand_slug: 'shelly', category_slug: 'micromodules-relais', name: 'Shelly Plus 1PM', protocol: 'Wi-Fi' },
	{ slug: 'shelly-dimmer-2', brand_slug: 'shelly', category_slug: 'micromodules-relais', name: 'Shelly Dimmer 2', protocol: 'Wi-Fi' },
	{ slug: 'sonoff-zbdongle-p', brand_slug: 'sonoff', category_slug: 'coordinateurs-cles', name: 'Sonoff ZBDongle-P', protocol: 'Zigbee' },
	{ slug: 'sonoff-zbdongle-e', brand_slug: 'sonoff', category_slug: 'coordinateurs-cles', name: 'Sonoff ZBDongle-E', protocol: 'Zigbee' },
	{ slug: 'sonoff-zbmini-l2', brand_slug: 'sonoff', category_slug: 'micromodules-relais', name: 'Sonoff ZBMini-L2', protocol: 'Zigbee' },
	{ slug: 'sonoff-zigbee-bridge-pro', brand_slug: 'sonoff', category_slug: 'box-passerelles', name: 'Sonoff Zigbee Bridge Pro', protocol: 'Zigbee' },
	{ slug: 'aqara-door-window-p2', brand_slug: 'aqara', category_slug: 'capteurs-detecteurs', name: 'Aqara Door & Window Sensor P2', protocol: 'Zigbee' },
	{ slug: 'aqara-motion-p2', brand_slug: 'aqara', category_slug: 'capteurs-detecteurs', name: 'Aqara Motion Sensor P2', protocol: 'Zigbee' },
	{ slug: 'aqara-hub-m3', brand_slug: 'aqara', category_slug: 'box-passerelles', name: 'Aqara Hub M3', protocol: 'Matter' },
	{ slug: 'homey-pro-2023', brand_slug: 'homey', category_slug: 'box-passerelles', name: 'Homey Pro (2023)', protocol: 'Zigbee' },
	{ slug: 'homey-pro-2026', brand_slug: 'homey', category_slug: 'box-passerelles', name: 'Homey Pro (2026)', protocol: 'Zigbee' },
	{ slug: 'homey-mini', brand_slug: 'homey', category_slug: 'box-passerelles', name: 'Homey Mini', protocol: 'Wi-Fi' },
	{ slug: 'home-assistant-green', brand_slug: 'home-assistant', category_slug: 'box-passerelles', name: 'Home Assistant Green', protocol: 'Wi-Fi' },
	{ slug: 'home-assistant-yellow', brand_slug: 'home-assistant', category_slug: 'box-passerelles', name: 'Home Assistant Yellow', protocol: 'Zigbee' },
	{ slug: 'makeblock-mbot2', brand_slug: 'makeblock', category_slug: 'robots-educatifs', name: 'Makeblock mBot2', protocol: 'Bluetooth/USB' },
	{ slug: 'makeblock-mbot-mcore', brand_slug: 'makeblock', category_slug: 'robots-educatifs', name: 'Makeblock mBot (mCore)', protocol: 'Bluetooth/USB' },
	{ slug: 'makeblock-cyberpi', brand_slug: 'makeblock', category_slug: 'robots-educatifs', name: 'Makeblock CyberPi', protocol: 'Wi-Fi' },
	{ slug: 'arduino-uno-r3', brand_slug: 'arduino', category_slug: 'robots-educatifs', name: 'Arduino Uno R3', protocol: 'USB' },
	{ slug: 'arduino-uno-r4', brand_slug: 'arduino', category_slug: 'robots-educatifs', name: 'Arduino Uno R4', protocol: 'USB' },
	{ slug: 'tapo-p110', brand_slug: 'tapo', category_slug: 'micromodules-relais', name: 'Tapo P110', protocol: 'Wi-Fi' },
	{ slug: 'tapo-c220', brand_slug: 'tapo', category_slug: 'capteurs-detecteurs', name: 'Tapo C220', protocol: 'Wi-Fi' },
	{ slug: 'switchbot-hub-2', brand_slug: 'switchbot', category_slug: 'box-passerelles', name: 'SwitchBot Hub 2', protocol: 'Matter' },
	{ slug: 'switchbot-curtain-3', brand_slug: 'switchbot', category_slug: 'capteurs-detecteurs', name: 'SwitchBot Curtain 3', protocol: 'Bluetooth/USB' },
	{ slug: 'philips-hue-bridge', brand_slug: 'philips-hue', category_slug: 'box-passerelles', name: 'Philips Hue Bridge', protocol: 'Zigbee' },
	{ slug: 'philips-hue-motion', brand_slug: 'philips-hue', category_slug: 'capteurs-detecteurs', name: 'Philips Hue Motion Sensor', protocol: 'Zigbee' },
	{ slug: 'aqara-thermostat-t1', brand_slug: 'aqara', category_slug: 'tetes-thermostatiques', name: 'Aqara Radiator Thermostat T1', protocol: 'Zigbee' },
];

export const PRODUCTS = RAW_PRODUCTS.map((p) => ({
	...p,
	image_url: `/images/models/${p.slug}.webp`,
	image_credit: PRODUCT_IMAGE_CREDIT,
}));

/** Liaison des fiches domotique existantes vers catégorie / marque / produit */
export const TROUBLE_ENTRY_BINDINGS = {
	'z2m-205': {
		category_slug: 'coordinateurs-cles',
		brand_slug: 'sonoff',
		product_slug: 'sonoff-zbdongle-e',
		applicable_products: ['sonoff-zbdongle-p'],
		error_code: 'Z2M Error 205',
	},
	'z2m-no-route': {
		category_slug: 'capteurs-detecteurs',
		brand_slug: 'aqara',
		product_slug: 'aqara-door-window-p2',
		applicable_products: [
			'aqara-motion-p2',
			'sonoff-zbdongle-e',
			'sonoff-zbdongle-p',
			'sonoff-zbmini-l2',
			'sonoff-zigbee-bridge-pro',
			'philips-hue-motion',
		],
		error_code: 'No network route',
	},
	'z2m-interview-failed': {
		category_slug: 'capteurs-detecteurs',
		brand_slug: 'aqara',
		product_slug: 'aqara-motion-p2',
		applicable_products: ['aqara-door-window-p2', 'aqara-hub-m3'],
		error_code: 'Interview failed',
	},
	'zha-probe-failed': {
		category_slug: 'box-passerelles',
		brand_slug: 'home-assistant',
		product_slug: 'home-assistant-green',
		applicable_products: ['home-assistant-yellow'],
		error_code: 'Failed to probe',
	},
	'shelly-offline': {
		category_slug: 'micromodules-relais',
		brand_slug: 'shelly',
		product_slug: 'shelly-plus-2pm',
		applicable_products: [
			'shelly-1-mini-gen3',
			'shelly-plus-1pm',
			'shelly-pro-3em',
			'shelly-dimmer-2',
		],
		error_code: 'Device offline',
	},
	'shelly-wifi-24': {
		category_slug: 'micromodules-relais',
		brand_slug: 'shelly',
		product_slug: 'shelly-1-mini-gen3',
		applicable_products: ['shelly-plus-1pm', 'shelly-plus-2pm', 'shelly-pro-3em', 'shelly-dimmer-2'],
		error_code: 'Wi-Fi 2.4GHz Offline',
	},
	'sonoff-dongle-ezsp-ember': {
		category_slug: 'coordinateurs-cles',
		brand_slug: 'sonoff',
		product_slug: 'sonoff-zbdongle-p',
		applicable_products: ['sonoff-zbdongle-e'],
		error_code: 'EZSP / Ember driver mismatch',
	},
	'homey-zigbee-full': {
		category_slug: 'box-passerelles',
		brand_slug: 'homey',
		product_slug: 'homey-pro-2023',
		applicable_products: ['homey-pro-2026', 'homey-mini'],
		error_code: 'Zigbee network full',
	},
	'homey-matter-failed': {
		category_slug: 'box-passerelles',
		brand_slug: 'homey',
		product_slug: 'homey-pro-2026',
		applicable_products: ['homey-pro-2023', 'homey-mini'],
		error_code: 'Matter Pairing Failed',
	},
};

/** Traductions FR → EN pour champs outils / coût / libellés filtre (hub codes erreurs). */
const TOOLS_FR_EN = {
	'Navigateur web': 'Web browser',
	'Carte réseau Z2M': 'Z2M network map',
	'Home Assistant': 'Home Assistant',
	'Câble USB': 'USB cable',
	'Gestionnaire de périphériques': 'Device Manager',
	Aucun: 'None',
	Tournevis: 'Screwdriver',
	Terminal: 'Terminal shell',
	'Appli Tapo': 'Tapo app',
	Routeur: 'Router',
	'Routeur / DNS': 'Router / DNS',
	'Routeur Wi-Fi': 'Wi-Fi router',
	Thermomètre: 'Thermometer',
	'Appli SwitchBot': 'SwitchBot app',
	'App Homey': 'Homey app',
	'Chargeur USB-C 5 V 2 A': 'USB-C 5 V 2 A charger',
	'PC + USB Recovery Tool': 'PC + USB recovery tool',
	'Box / IPv6': 'Router / IPv6',
	'Appli Shelly': 'Shelly app',
	'Pince ampèremétrique': 'Clamp meter',
	'Ampoule test': 'Test bulb',
	'Bypass Sonoff': 'Sonoff bypass module',
	eWeLink: 'eWeLink app',
	'PC + Z2M': 'PC + Zigbee2MQTT',
	'Hub Thread': 'Thread border router',
	Zigbee2MQTT: 'Zigbee2MQTT',
	'Aqara Home': 'Aqara Home app',
	'Cavalier UART / PoE': 'UART jumper / PoE',
	'Home Assistant OS': 'Home Assistant OS',
	'Zigbee dongle': 'Zigbee USB dongle',
	'App Hue': 'Hue app',
	'Rail / tringle': 'Curtain rail',
	'Appli Shelly / navigateur': 'Shelly app / web browser',
	'Box internet': 'Home router',
	'PC + câble USB': 'PC + USB cable',
};

const COST_FR_EN = {
	'0 €': '€0',
	'0–12 €': '€0–12',
	'0–15 €': '€0–15',
	'0–25 €': '€0–25',
	'0–25 € (prise routeur)': '€0–25 (mains-powered Zigbee plug)',
	'0–5 €': '€0–5',
};

const ERROR_CODE_FR_EN = {
	'Port COM invisible': 'COM port missing',
	'Moteur à l’envers': 'Motor wired backwards',
	'Moteur à l\'envers': 'Motor wired backwards',
	'Anneau rouge respirant': 'Pulsing red ring',
	'Puissance négative': 'Negative power reading',
	'LED rouge fixe / bootloop': 'Solid red LED / boot loop',
	'LED clignote sans neutre': 'Blinking LED without neutral',
	'LED jaune fixe': 'Solid yellow LED',
	'LED rouge passage': 'Red LED when passing',
	'Erreur 1002': 'Error 1002',
	'Ultrason 0 / 400 cm': 'Ultrasonic stuck at 0 or 400 cm',
};

export function pickLocalized(value, lang) {
	if (value == null) return '';
	if (typeof value === 'object') {
		const v = value[lang] ?? value.en ?? value.fr;
		return v ?? '';
	}
	if (lang === 'fr') return String(value);
	if (lang === 'en') {
		return ERROR_CODE_FR_EN[value] ?? TOOLS_FR_EN[value] ?? COST_FR_EN[value] ?? String(value);
	}
	return value.en ?? ERROR_CODE_FR_EN[value] ?? TOOLS_FR_EN[value] ?? String(value);
}

const toolI18n = (fr) => {
	const en = TOOLS_FR_EN[fr] ?? fr;
	return { fr, en, de: en, it: en, es: en };
};

const costI18n = (fr) => {
	const en = COST_FR_EN[fr] ?? fr;
	return { fr, en, de: en, it: en, es: en };
};

function errorCodeForLang(code, lang) {
	if (lang === 'fr') return code;
	return ERROR_CODE_FR_EN[code] ?? code;
}

/** Fiches robotique éducative (mBlock / Arduino) */
export const MBLOCK_ERROR_ENTRIES = [
	{
		slug: 'mbot-stk500-getsync',
		category_slug: 'robots-educatifs',
		brand_slug: 'makeblock',
		product_slug: 'makeblock-mbot-mcore',
		applicable_products: ['makeblock-mbot2', 'arduino-uno-r3'],
		error_code: 'stk500_getsync()',
		difficulty: 2,
		time: '10–20 min',
		cost: '0 €',
		tools: toolI18n('Câble USB'),
		ecosystem: ['makeblock', 'arduino'],
		title: {
			fr: 'mBlock / Arduino — stk500_getsync(): not in sync',
			en: 'mBlock / Arduino — stk500_getsync(): not in sync',
			de: 'mBlock / Arduino — stk500_getsync(): not in sync',
			it: 'mBlock / Arduino — stk500_getsync(): not in sync',
			es: 'mBlock / Arduino — stk500_getsync(): not in sync',
		},
		symptoms: {
			fr: 'À la fin du téléversement : avrdude stk500_getsync() ou « programmer not responding ».',
			en: 'Upload ends with avrdude stk500_getsync() or « programmer not responding ».',
			de: 'Upload endet mit stk500_getsync() oder « programmer not responding ».',
			it: 'Upload con stk500_getsync() o « programmer not responding ».',
			es: 'Carga termina con stk500_getsync() o « programmer not responding ».',
		},
		fix: {
			fr: 'Branchez en USB direct, choisissez le bon port COM dans mBlock, fermez le moniteur série, redémarrez le mBot. Testez un autre câble données (pas charge seule).',
			en: 'Use direct USB, pick the correct COM port in mBlock, close serial monitor, reboot mBot. Try a data USB cable.',
			de: 'Direktes USB, richtigen COM-Port wählen, Serial Monitor schließen, mBot neu starten, Datenkabel testen.',
			it: 'USB diretto, porta COM corretta, chiudere monitor seriale, riavviare mBot, cavo dati.',
			es: 'USB directo, puerto COM correcto, cerrar monitor serie, reiniciar mBot, cable de datos.',
		},
		caution: {
			fr: "Carte mCore endommagée sous garantie : SAV Makeblock — n'ouvrez pas le châssis.",
			en: 'Damaged mCore under warranty: Makeblock support — do not open the chassis.',
			de: 'Defekte mCore in Garantie: Makeblock-Support — Gehäuse nicht öffnen.',
			it: 'mCore danneggiata in garanzia: supporto Makeblock — non aprite il telaio.',
			es: 'mCore dañada en garantía: soporte Makeblock — no abra el chasis.',
		},
	},
	{
		slug: 'mbot-com-port-missing',
		category_slug: 'robots-educatifs',
		brand_slug: 'makeblock',
		product_slug: 'makeblock-mbot2',
		applicable_products: ['makeblock-mbot-mcore', 'makeblock-cyberpi', 'arduino-uno-r3', 'arduino-uno-r4'],
		error_code: 'Port COM invisible',
		difficulty: 3,
		time: '15–30 min',
		cost: '0–12 €',
		tools: toolI18n('Gestionnaire de périphériques'),
		ecosystem: ['makeblock'],
		title: {
			fr: 'mBlock — port COM invisible (Windows / macOS)',
			en: 'mBlock — COM port missing (Windows / macOS)',
			de: 'mBlock — COM-Port fehlt',
			it: 'mBlock — porta COM assente',
			es: 'mBlock — puerto COM no visible',
		},
		symptoms: {
			fr: 'Aucun port série dans mBlock quand le robot est branché.',
			en: 'No serial port listed in mBlock when the robot is plugged in.',
			de: 'Kein serieller Port in mBlock sichtbar.',
			it: 'Nessuna porta seriale in mBlock.',
			es: 'Sin puerto serie en mBlock.',
		},
		fix: {
			fr: 'Installez le pilote CH340/CP2102, port USB arrière PC, autorisez USB sur macOS pour mBlock Web.',
			en: 'Install CH340/CP2102 driver, rear USB port, grant USB on macOS for mBlock Web.',
			de: 'CH340/CP2102-Treiber installieren, USB hinten am PC.',
			it: 'Driver CH340/CP2102, porta USB posteriore.',
			es: 'Driver CH340/CP2102, puerto USB trasero.',
		},
	},
	{
		slug: 'mbot-motor-reverse',
		category_slug: 'robots-educatifs',
		brand_slug: 'makeblock',
		product_slug: 'makeblock-mbot-mcore',
		error_code: 'Moteur à l’envers',
		difficulty: 1,
		time: '5 min',
		cost: '0 €',
		tools: toolI18n('Aucun'),
		ecosystem: ['makeblock'],
		title: {
			fr: 'mBot — moteur qui tourne à l’envers',
			en: 'mBot — motor runs backward',
			de: 'mBot — Motor dreht rückwärts',
			it: 'mBot — motore al contrario',
			es: 'mBot — motor al revés',
		},
		symptoms: {
			fr: 'Le robot recule quand le programme demande d’avancer, ou tourne dans le mauvais sens en classe.',
			en: 'Robot moves backward when code says forward.',
			de: 'Roboter fährt rückwärts bei Vorwärts-Befehl.',
			it: 'Il robot va indietro invece che avanti.',
			es: 'El robot retrocede al pedir avance.',
		},
		fix: {
			fr: 'Dans mBlock, inversez le signe de la vitesse moteur (bloc « moteur M1/M2 » en négatif) ou permutez les connecteurs RJ25 sur la carte mCore. Vérifiez aussi que le bloc « avancer » cible bien M1 et M2 avec la même polarité.',
			en: 'Negate motor speed or swap M1/M2 connectors.',
			de: 'Geschwindigkeit negieren oder M1/M2 tauschen.',
			it: 'Velocità negativa o invertire M1/M2.',
			es: 'Velocidad negativa o intercambiar M1/M2.',
		},
	},
	{
		slug: 'mbot-ultrasonic-stuck',
		category_slug: 'robots-educatifs',
		brand_slug: 'makeblock',
		product_slug: 'makeblock-mbot2',
		error_code: 'Ultrason 0 / 400 cm',
		difficulty: 2,
		time: '10 min',
		cost: '0 €',
		tools: toolI18n('Tournevis'),
		ecosystem: ['makeblock'],
		title: {
			fr: 'mBot — capteur ultrason bloqué à 0 ou 400 cm',
			en: 'mBot — ultrasonic stuck at 0 or 400 cm',
			de: 'mBot — Ultraschall bleibt bei 0 oder 400 cm',
			it: 'mBot — ultrasuoni fissi a 0 o 400 cm',
			es: 'mBot — ultrasonido fijo en 0 o 400 cm',
		},
		symptoms: {
			fr: 'La variable distance ne change plus.',
			en: 'Distance variable never changes.',
			de: 'Distanzwert ändert sich nicht.',
			it: 'La distanza non cambia.',
			es: 'La distancia no cambia.',
		},
		fix: {
			fr: 'Vérifiez le câble RJ25, éloignez du mur (<2 cm), mettez à jour le firmware mBot.',
			en: 'Check RJ25 cable, move away from wall, update mBot firmware.',
			de: 'RJ25 prüfen, Abstand zur Wand, Firmware aktualisieren.',
			it: 'Cavo RJ25, distanza dal muro, firmware.',
			es: 'Cable RJ25, distancia a la pared, firmware.',
		},
		caution: {
			fr: 'Moteur ou mCore défectueux : SAV Makeblock uniquement.',
			en: 'Failed motor or mCore: official Makeblock warranty only.',
			de: 'Defekter Motor/mCore: nur Makeblock-SAV.',
			it: 'Motore o mCore guasti: solo SAV Makeblock.',
			es: 'Motor o mCore defectuosos: solo SAV Makeblock.',
		},
	},
	{
		slug: 'arduino-permission-denied-linux',
		category_slug: 'robots-educatifs',
		brand_slug: 'arduino',
		product_slug: 'arduino-uno-r4',
		error_code: 'Permission denied (port)',
		difficulty: 3,
		time: '15 min',
		cost: '0 €',
		tools: toolI18n('Terminal'),
		ecosystem: ['arduino'],
		title: {
			fr: 'Arduino / mBlock — permission denied sur le port série (Linux)',
			en: 'Arduino / mBlock — permission denied on serial port (Linux)',
			de: 'Arduino — permission denied (Linux)',
			it: 'Arduino — permission denied (Linux)',
			es: 'Arduino — permission denied (Linux)',
		},
		symptoms: {
			fr: 'Téléversement refusé : accès au port /dev/ttyUSB0 refusé.',
			en: 'Upload fails: cannot open /dev/ttyUSB0.',
			de: 'Upload scheitert: kein Zugriff auf /dev/ttyUSB0.',
			it: 'Upload fallito: accesso negato a /dev/ttyUSB0.',
			es: 'Carga fallida: acceso denegado a /dev/ttyUSB0.',
		},
		fix: {
			fr: 'Ajoutez l’utilisateur au groupe dialout (`sudo usermod -aG dialout $USER`), déconnectez-vous complètement de la session Linux, reconnectez le câble USB, choisissez le bon port série dans Arduino IDE ou mBlock. Ne lancez jamais l’IDE en root.',
			en: 'Add user to dialout group (`sudo usermod -aG dialout $USER`), fully log out of Linux session, reconnect USB, pick correct serial port in Arduino IDE or mBlock. Never run the IDE as root.',
			de: 'Benutzer zu dialout hinzufügen, Session neu anmelden, USB-Port wählen, nicht als root starten.',
			it: 'Aggiungere utente a dialout, nuovo login, porta seriale corretta, non avviare come root.',
			es: 'Añadir usuario a dialout, cerrar sesión, puerto serie correcto, no ejecutar como root.',
		},
	},
];

/** Fiches supplémentaires produits */
export const EXTRA_DOMOTIC_ERRORS = [
	{
		slug: 'tapo-p110-offline',
		category_slug: 'micromodules-relais',
		brand_slug: 'tapo',
		product_slug: 'tapo-p110',
		applicable_products: ['tapo-c220'],
		error_code: 'Device unreachable',
		difficulty: 2,
		time: '10 min',
		cost: '0 €',
		tools: toolI18n('Appli Tapo'),
		ecosystem: ['wifi'],
		title: {
			fr: 'Tapo P110 — prise injoignable dans Home Assistant',
			en: 'Tapo P110 — plug unreachable in Home Assistant',
			de: 'Tapo P110 — Steckdose nicht erreichbar',
			it: 'Tapo P110 — presa non raggiungibile',
			es: 'Tapo P110 — enchufe inalcanzable',
		},
		symptoms: {
			fr: 'Entité « unavailable » dans Home Assistant alors que la prise répond au ping ou à l’app Tapo. Les automatisations ne basculent plus l’état.',
			en: 'Entity unavailable despite ping.',
			de: 'Entität unavailable trotz Ping.',
			it: 'Entità unavailable.',
			es: 'Entidad unavailable.',
		},
		fix: {
			fr: 'Étape 1 : ouvrez l’app Tapo sur le téléphone — la prise doit être en ligne. Étape 2 : notez l’IP locale (routeur ou app) et réservez-la en DHCP statique. Étape 3 : dans Home Assistant, Paramètres → Appareils → intégration Tapo → Recharger. Étape 4 : sur le routeur Wi-Fi, désactivez l’isolement AP / « client isolation » pour le VLAN IoT. Étape 5 : si le compte cloud Tapo a changé de mot de passe, reconnectez l’intégration avec le nouveau compte.',
			en: 'Refresh Tapo cloud account, static IP, reload Tapo integration, disable AP isolation.',
			de: 'Tapo-Konto, feste IP, Integration neu laden.',
			it: 'Account Tapo, IP fissa, integrazione ricaricata.',
			es: 'Cuenta Tapo, IP fija, recargar integración.',
		},
	},
	{
		slug: 'hue-bridge-unreachable',
		category_slug: 'box-passerelles',
		brand_slug: 'philips-hue',
		product_slug: 'philips-hue-bridge',
		error_code: 'Bridge unreachable',
		difficulty: 2,
		time: '15 min',
		cost: '0 €',
		tools: toolI18n('Routeur'),
		ecosystem: ['zigbee2mqtt', 'home-assistant'],
		title: {
			fr: 'Philips Hue Bridge — pont injoignable',
			en: 'Philips Hue Bridge — bridge unreachable',
			de: 'Hue Bridge — nicht erreichbar',
			it: 'Hue Bridge — non raggiungibile',
			es: 'Hue Bridge — inalcanzable',
		},
		symptoms: {
			fr: 'Home Assistant ou Z2M ne découvre plus le Bridge.',
			en: 'HA or Z2M cannot discover the bridge.',
			de: 'Bridge wird nicht gefunden.',
			it: 'Bridge non scoperto.',
			es: 'Bridge no detectado.',
		},
		fix: {
			fr: 'Câble Ethernet direct, même sous-réseau, bouton pairing sur le Bridge, redémarrez le routeur.',
			en: 'Direct Ethernet, same subnet, press link button, reboot router.',
			de: 'Ethernet direkt, gleiches Subnetz, Link-Taste.',
			it: 'Ethernet diretto, stessa subnet.',
			es: 'Ethernet directo, misma subred.',
		},
	},
	{
		slug: 'aqara-thermostat-calibration',
		category_slug: 'tetes-thermostatiques',
		brand_slug: 'aqara',
		product_slug: 'aqara-thermostat-t1',
		error_code: 'Temperature offset',
		difficulty: 2,
		time: '20 min',
		cost: '0 €',
		tools: toolI18n('Thermomètre'),
		ecosystem: ['zigbee2mqtt', 'homey'],
		title: {
			fr: 'Aqara T1 — écart de température / vanne qui claque',
			en: 'Aqara T1 — temperature offset / valve chatter',
			de: 'Aqara T1 — Temperaturabweichung',
			it: 'Aqara T1 — scostamento temperatura',
			es: 'Aqara T1 — desviación de temperatura',
		},
		symptoms: {
			fr: 'Pièce trop chaude ou froide malgré consigne correcte.',
			en: 'Room too hot/cold despite setpoint.',
			de: 'Raum zu warm/kalt trotz Sollwert.',
			it: 'Stanza troppo calda/fredda.',
			es: 'Habitación demasiado caliente/fría.',
		},
		fix: {
			fr: 'Calibrage offset dans Aqara Home / Z2M, mode vanne adapté (NC/NO), recalibrage après purge radiateur.',
			en: 'Set offset in Aqara Home / Z2M, correct valve mode, recalibrate after radiator bleed.',
			de: 'Offset in App setzen, Ventilmodus prüfen.',
			it: 'Offset in app, modalità valvola.',
			es: 'Offset en app, modo válvula.',
		},
	},
	{
		slug: 'switchbot-curtain-timeout',
		category_slug: 'capteurs-detecteurs',
		brand_slug: 'switchbot',
		product_slug: 'switchbot-curtain-3',
		applicable_products: ['switchbot-hub-2'],
		error_code: 'Motor timeout',
		difficulty: 3,
		time: '25 min',
		cost: '0 €',
		tools: toolI18n('Appli SwitchBot'),
		ecosystem: ['matter', 'homey'],
		title: {
			fr: 'SwitchBot Curtain — timeout moteur',
			en: 'SwitchBot Curtain — motor timeout',
			de: 'SwitchBot Curtain — Motor-Timeout',
			it: 'SwitchBot Curtain — timeout motore',
			es: 'SwitchBot Curtain — timeout motor',
		},
		symptoms: {
			fr: 'Rideau s’arrête à mi-course, erreur dans l’app.',
			en: 'Curtain stops mid-travel, app error.',
			de: 'Vorhang stoppt mittig.',
			it: 'Tenda si ferma a metà.',
			es: 'Cortina se detiene a mitad.',
		},
		fix: {
			fr: 'Recalibrage des limites dans l’app, vérifiez rail et charge, Hub 2 à portée Bluetooth.',
			en: 'Recalibrate limits in app, check rail load, Hub 2 in Bluetooth range.',
			de: 'Grenzen neu kalibrieren, Hub-Reichweite.',
			it: 'Ricalibrare limiti, Hub vicino.',
			es: 'Recalibrar límites, Hub cercano.',
		},
	},
];

export function productSlugsForError(entry) {
	const slugs = new Set();
	if (entry.product_slug) slugs.add(entry.product_slug);
	for (const s of entry.applicable_products || []) slugs.add(s);
	return [...slugs];
}

export function errorAppliesToProduct(entry, productSlug) {
	return productSlugsForError(entry).includes(productSlug);
}

function troubleEntryToCatalog(entry) {
	const bind = TROUBLE_ENTRY_BINDINGS[entry.id] || {
		category_slug: 'capteurs-detecteurs',
		brand_slug: 'home-assistant',
		product_slug: null,
		error_code: entry.title.fr.split('—')[0]?.trim() || entry.id,
	};
	return {
		slug: entry.id,
		category_slug: bind.category_slug,
		brand_slug: bind.brand_slug,
		product_slug: bind.product_slug,
		applicable_products: bind.applicable_products || [],
		error_code: bind.error_code,
		difficulty: entry.difficulty,
		time: entry.time,
		cost: costI18n(entry.cost),
		tools: toolI18n(entry.tools),
		ecosystem: entry.ecosystem,
		title: entry.title,
		symptoms: entry.symptoms,
		fix: entry.fix,
		caution: entry.caution,
		savNote: entry.savNote,
	};
}

function normalizeTools(tools) {
	if (typeof tools === 'object' && tools !== null && 'fr' in tools) {
		if (tools.en !== tools.fr) return tools;
		return toolI18n(tools.fr);
	}
	return toolI18n(String(tools || ''));
}

function normalizeCost(cost) {
	if (typeof cost === 'object' && cost !== null && 'fr' in cost) {
		if (cost.en !== cost.fr) return cost;
		return costI18n(cost.fr);
	}
	return costI18n(String(cost || '0 €'));
}

function normalizeExtra(entry) {
	return {
		...entry,
		tools: normalizeTools(entry.tools),
		cost: normalizeCost(entry.cost),
		savNote: entry.savNote,
		caution: entry.caution,
	};
}

/** Alias documenté pour les pages statiques par code erreur */
export function getAllCatalogEntries() {
	return buildCatalogErrors();
}

/** Toutes les fiches pour rendu Astro + API fallback */
export function buildCatalogErrors() {
	const fromTrouble = TROUBLE_ENTRIES.map(troubleEntryToCatalog);
	const extras = [...MBLOCK_ERROR_ENTRIES, ...EXTRA_DOMOTIC_ERRORS, ...FORUM_ERROR_ENTRIES].map(normalizeExtra);
	return [...fromTrouble, ...extras];
}

/** Entrées pour TroubleshootingCatalog.astro (compatibilité affichage) */
export function buildRenderEntries(lang = 'fr') {
	return buildCatalogErrors().map((e) => ({
		id: e.slug,
		slug: e.slug,
		ecosystem: e.ecosystem || [],
		difficulty: e.difficulty,
		time: e.time,
		cost: pickLocalized(e.cost, lang),
		tools: pickLocalized(e.tools, lang),
		title: e.title,
		symptoms: e.symptoms,
		fix: e.fix,
		caution: e.caution,
		savNote: e.savNote,
		category_slug: e.category_slug,
		brand_slug: e.brand_slug,
		product_slug: e.product_slug,
		applicable_products: e.applicable_products || [],
		error_code: errorCodeForLang(e.error_code, lang),
		error_code_key: e.error_code,
	}));
}
