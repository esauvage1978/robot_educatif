import { amazonSearchUrl, shellyUrl } from '../lib/amazonAffiliate.mjs';
import { fmtMarketPrice } from '../lib/amazonMarket.mjs';
import { amazonOffer } from '../lib/amazonPriceStore.mjs';
import { USE_CASES } from './smartHomeUseCases.mjs';
import { getWiringGuide } from './smartHomeWiringGuides.mjs';

/** Prix Amazon relevé, ou estimation marquée comme telle. */
export function formatBillAmount(amount, exact) {
	if (amount == null || Number.isNaN(Number(amount))) return '—';
	if (exact) return fmtMarketPrice(amount, 'fr');
	return `≈ ${Math.round(Number(amount))}\u00A0€`;
}

export { USE_CASES };

const IEGEEK_AWIN =
	'https://www.awin1.com/cread.php?awinmid=128847&awinaffid=3126073&ued=';

function amazonDp(asin) {
	return `https://www.amazon.fr/dp/${asin}?tag=manuso06-21`;
}

function iegeekUrl(path) {
	return `${IEGEEK_AWIN}${encodeURIComponent(`https://fr.iegeek.com${path}`)}`;
}

export const PAGE = {
	title: 'Configurateur de projet domotique par cas d’usage',
	description:
		'100 projets domotiques concrets (accès, volets, éclairage, chauffage, énergie, sécurité) : schémas SVG NFC 15-100, configurateur budget, tutoriel 8 étapes et Home Assistant.',
};

export const USE_CASE_CATEGORIES = [
	{ id: 'all', label: 'Tous' },
	{ id: 'acces-garage', label: 'Accès & Garage' },
	{ id: 'volets-rideaux', label: 'Volets & Rideaux' },
	{ id: 'eclairage', label: 'Éclairage' },
	{ id: 'chauffage-vmc', label: 'Chauffage & VMC' },
	{ id: 'energie-conso', label: 'Énergie & Conso' },
	{ id: 'securite-box', label: 'Sécurité & Box' },
];

export const ECOSYSTEMS = [
	{
		id: 'wifi-sans-box',
		label: 'Sans box domotique (Wi-Fi direct via application Shelly / smartphone, le plus simple)',
	},
	{
		id: 'ha-zigbee',
		label: 'Avec Home Assistant / Zigbee (100 % local, évolutif, multi-marques)',
	},
	{
		id: 'maker-esp32',
		label: 'Version Maker DIY (ESP32 / ESPHome / Raspberry Pi — budget mini)',
	},
];

export const QTY_OPTIONS = [
	{ id: '1', label: '1', multiplier: 1 },
	{ id: '2', label: '2', multiplier: 2 },
	{ id: '3-5', label: '3 à 5', multiplier: 4 },
	{ id: '6+', label: '6 ou plus', multiplier: 8 },
];

/** Profils budget catalogue / fiche projet (alignés sur les écosystèmes). */
export const BUDGET_TIERS = [
	{ id: 'economique', label: 'Économique', ecosystem: 'wifi-sans-box' },
	{ id: 'recommande', label: 'Recommandé', ecosystem: 'ha-zigbee' },
	{ id: 'evolutif', label: 'Évolutif', ecosystem: 'maker-esp32' },
];

/** @type {Record<string, { id: string, label: string, priceEur: number, image: string, buyUrl: string, buyLabel?: string }>} */
export const PRODUCTS = {
	'shelly-1-mini-gen3': {
		id: 'shelly-1-mini-gen3',
		label: 'Shelly 1 Mini Gen3',
		priceEur: 15,
		image: '/images/models/shelly-1-mini-gen3.webp',
		buyUrl: shellyUrl('/products/shelly-1-mini-gen3'),
		buyLabel: 'Voir sur Shelly',
	},
	'shelly-plus-2pm': {
		id: 'shelly-plus-2pm',
		label: 'Shelly Plus 2PM',
		priceEur: 38,
		image: '/images/models/shelly-plus-2pm.webp',
		buyUrl: shellyUrl('/products/shelly-plus-2pm'),
		buyLabel: 'Voir sur Shelly',
	},
	'shelly-plus-1pm': {
		id: 'shelly-plus-1pm',
		label: 'Shelly Plus 1PM',
		priceEur: 22,
		image: '/images/models/shelly-plus-1pm.webp',
		buyUrl: shellyUrl('/products/shelly-plus-1pm'),
		buyLabel: 'Voir sur Shelly',
	},
	'shelly-dimmer-2': {
		id: 'shelly-dimmer-2',
		label: 'Shelly Dimmer 2',
		priceEur: 28,
		image: '/images/models/shelly-dimmer-2.webp',
		buyUrl: shellyUrl('/products/shelly-dimmer-2'),
		buyLabel: 'Voir sur Shelly',
	},
	'shelly-pro-3em': {
		id: 'shelly-pro-3em',
		label: 'Shelly Pro 3EM',
		priceEur: 95,
		image: '/images/models/shelly-pro-3em.webp',
		buyUrl: shellyUrl('/products/shelly-pro-3em'),
		buyLabel: 'Voir sur Shelly',
	},
	'shelly-plug-s-gen3': {
		id: 'shelly-plug-s-gen3',
		label: 'Shelly Plug S Gen3',
		priceEur: 18,
		image: '/images/products/nous-a1z.webp',
		buyUrl: shellyUrl('/products/shelly-plug-s-gen3'),
		buyLabel: 'Voir sur Shelly',
	},
	'aqara-door-p2': {
		id: 'aqara-door-p2',
		label: 'Aqara Door & Window Sensor P2',
		priceEur: 22,
		image: '/images/models/aqara-door-window-p2.webp',
		buyUrl: amazonSearchUrl('fr', 'Aqara Door Window Sensor P2'),
	},
	'aqara-motion-p2': {
		id: 'aqara-motion-p2',
		label: 'Aqara Motion Sensor P2',
		priceEur: 28,
		image: '/images/models/aqara-motion-p2.webp',
		buyUrl: amazonSearchUrl('fr', 'Aqara Motion Sensor P2'),
	},
	'aqara-thermostat-t1': {
		id: 'aqara-thermostat-t1',
		label: 'Aqara Radiator Thermostat T1',
		priceEur: 55,
		image: '/images/models/aqara-thermostat-t1.webp',
		buyUrl: amazonSearchUrl('fr', 'Aqara Radiator Thermostat T1'),
	},
	'sonoff-zbmini-l2': {
		id: 'sonoff-zbmini-l2',
		label: 'Sonoff ZBMini-L2 Extreme (sans neutre)',
		priceEur: 12,
		image: '/images/models/sonoff-zbmini-l2.webp',
		buyUrl: amazonSearchUrl('fr', 'Sonoff ZBMini-L2'),
	},
	'sonoff-snzb-02d': {
		id: 'sonoff-snzb-02d',
		label: 'SONOFF SNZB-02D (température / humidité LCD)',
		priceEur: 14,
		image: '/images/products/sonoff-snzb-02d.webp',
		buyUrl: amazonDp('B0BYZP8NK2'),
	},
	'zbdongle-e': {
		id: 'zbdongle-e',
		label: 'SONOFF ZBDongle-E',
		priceEur: 25,
		image: '/images/models/sonoff-zbdongle-e.webp',
		buyUrl: amazonDp('B0B6P22YJC'),
	},
	'ha-connect-zbt2': {
		id: 'ha-connect-zbt2',
		label: 'Home Assistant Connect ZBT-2',
		priceEur: 55,
		image: '/images/models/sonoff-zbdongle-e.webp',
		buyUrl: amazonDp('B0G34ZTW51'),
	},
	'ha-green': {
		id: 'ha-green',
		label: 'Home Assistant Green',
		priceEur: 115,
		image: '/images/models/home-assistant-green.webp',
		buyUrl: amazonDp('B0CXVKSG19'),
	},
	'rpi5-4gb': {
		id: 'rpi5-4gb',
		label: 'Raspberry Pi 5 (4 Go)',
		priceEur: 75,
		image: '/images/products/raspberry-pi-5-4gb.webp',
		buyUrl: amazonDp('B0CK3L9WD3'),
	},
	'rpi5-8gb': {
		id: 'rpi5-8gb',
		label: 'Raspberry Pi 5 (8 Go)',
		priceEur: 95,
		image: '/images/products/raspberry-pi-5-8gb.webp',
		buyUrl: amazonDp('B0CK2FCG1K'),
	},
	'rpi5-psu': {
		id: 'rpi5-psu',
		label: 'Alimentation USB-C 27 W (Raspberry Pi 5)',
		priceEur: 12,
		image: '/images/products/raspberry-pi-5.webp',
		buyUrl: amazonSearchUrl('fr', 'Raspberry Pi 5 power supply 27W'),
	},
	'tapo-p110': {
		id: 'tapo-p110',
		label: 'Tapo P110 (lot de 4 prises mesure conso)',
		priceEur: 45,
		image: '/images/models/tapo-p110.webp',
		buyUrl: amazonDp('B0CJC8WMXV'),
	},
	'switchbot-curtain-3': {
		id: 'switchbot-curtain-3',
		label: 'SwitchBot Curtain 3',
		priceEur: 89,
		image: '/images/models/switchbot-curtain-3.webp',
		buyUrl: amazonSearchUrl('fr', 'SwitchBot Curtain 3'),
	},
	'esp32-devkit': {
		id: 'esp32-devkit',
		label: 'ESP32 DevKit',
		priceEur: 8,
		image: '/images/products/esp32-c6-devkitc.webp',
		buyUrl: amazonSearchUrl('fr', 'ESP32 DevKit'),
	},
	'relay-3v3': {
		id: 'relay-3v3',
		label: 'Module relais 1 canal 3,3 V',
		priceEur: 4,
		image: '/images/products/esp32-c6-devkitc.webp',
		buyUrl: amazonSearchUrl('fr', 'module relais 1 canal 3.3V'),
	},
	'reed-garage': {
		id: 'reed-garage',
		label: 'Capteur magnétique reed filaire (porte garage)',
		priceEur: 6,
		image: '/images/models/aqara-door-window-p2.webp',
		buyUrl: amazonSearchUrl('fr', 'capteur magnétique porte garage filaire'),
	},
	'wago-221': {
		id: 'wago-221',
		label: 'Bornes de connexion rapides Wago 221 (assortiment)',
		priceEur: 12,
		image: '/images/products/arduino-starter-kit.webp',
		buyUrl: amazonSearchUrl('fr', 'Wago 221 assortiment'),
	},
	'iegeek-zs-gx4s': {
		id: 'iegeek-zs-gx4s',
		label: 'Caméra extérieure solaire ieGeek ZS-GX4S',
		priceEur: 120,
		image: '/images/models/tapo-c220.webp',
		buyUrl: iegeekUrl('/products/battery-camera-zs-gx4s-with-panel-5mp'),
		buyLabel: 'Voir chez ieGeek',
	},
	'iegeek-s7': {
		id: 'iegeek-s7',
		label: 'Caméra solaire ieGeek S7 (24/7 AOV)',
		priceEur: 130,
		image: '/images/models/tapo-c220.webp',
		buyUrl: iegeekUrl('/products/wireless-24-7-recording-camera-s7'),
		buyLabel: 'Voir chez ieGeek',
	},
	'shelly-plus-1': {
		id: 'shelly-plus-1',
		label: 'Shelly Plus 1',
		priceEur: 18,
		image: '/images/models/shelly-plus-1pm.webp',
		buyUrl: shellyUrl('/products/shelly-plus-1'),
		buyLabel: 'Voir sur Shelly',
	},
	'tapo-c220': {
		id: 'tapo-c220',
		label: 'Tapo C220 (caméra intérieure rotative)',
		priceEur: 35,
		image: '/images/models/tapo-c220.webp',
		buyUrl: amazonSearchUrl('fr', 'Tapo C220'),
	},
	'switchbot-hub-2': {
		id: 'switchbot-hub-2',
		label: 'SwitchBot Hub 2',
		priceEur: 75,
		image: '/images/models/switchbot-curtain-3.webp',
		buyUrl: amazonSearchUrl('fr', 'SwitchBot Hub 2'),
	},
	'weather-zigbee': {
		id: 'weather-zigbee',
		label: 'Capteur météo Zigbee (luminosité / vent)',
		priceEur: 45,
		image: '/images/models/aqara-motion-p2.webp',
		buyUrl: amazonSearchUrl('fr', 'capteur météo Zigbee soleil vent'),
	},
	'allpowers-ups': {
		id: 'allpowers-ups',
		label: 'Station électrique ALLPOWERS (fonction UPS)',
		priceEur: 350,
		image: '/images/products/raspberry-pi-5.webp',
		buyUrl: 'https://www.awin1.com/cread.php?awinmid=98667&awinaffid=3126073',
		buyLabel: 'Voir ALLPOWERS',
	},
	'ups-usb-nut': {
		id: 'ups-usb-nut',
		label: 'Onduleur ligne interactive USB (NUT / HID)',
		priceEur: 85,
		image: '/images/products/raspberry-pi-5.webp',
		buyUrl: amazonSearchUrl('fr', 'onduleur USB HID NUT'),
	},
	'galaxy-tab-a9-plus': {
		id: 'galaxy-tab-a9-plus',
		label: 'Samsung Galaxy Tab A9+ (11", Wi-Fi)',
		priceEur: 189,
		image: '/images/models/home-assistant-green.webp',
		buyUrl: amazonSearchUrl('fr', 'Samsung Galaxy Tab A9+ 11 pouces Wi-Fi'),
		buyLabel: 'Voir le prix de la tablette',
	},
	'support-mural-tablette': {
		id: 'support-mural-tablette',
		label: 'Support mural tablette 10–11" (profil plat)',
		priceEur: 19,
		image: '/images/models/home-assistant-green.webp',
		buyUrl: amazonSearchUrl('fr', 'support mural tablette 10 11 pouces'),
		buyLabel: 'Choisir un support mural',
	},
	'cable-usbc-coude-90': {
		id: 'cable-usbc-coude-90',
		label: 'Câble USB-C coudé 90° plat (2 m) + chargeur USB 5 V',
		priceEur: 14,
		image: '/images/products/raspberry-pi-5.webp',
		buyUrl: amazonSearchUrl('fr', 'cable USB C coude 90 degres plat 2m'),
		buyLabel: 'Voir le câble coudé 90°',
	},
	'sonoff-snzb-03p': {
		id: 'sonoff-snzb-03p',
		label: 'Capteur de mouvement PIR Zigbee SONOFF SNZB-03P',
		priceEur: 16,
		image: '/images/products/sonoff-snzb-03p.webp',
		buyUrl: amazonSearchUrl('fr', 'SONOFF SNZB-03P capteur mouvement Zigbee'),
		buyLabel: 'Comparer les capteurs de présence',
	},
	'aqara-fp2': {
		id: 'aqara-fp2',
		label: 'Radar de présence mmWave Aqara Presence Sensor FP2',
		priceEur: 69,
		image: '/images/products/aqara-presence-fp2.webp',
		buyUrl: amazonSearchUrl('fr', 'Aqara Presence Sensor FP2 mmWave'),
		buyLabel: 'Comparer les capteurs de présence',
	},
	'bme280-module': {
		id: 'bme280-module',
		label: 'Module BME280 (température / humidité I2C)',
		priceEur: 5,
		image: '/images/products/esp32-c6-devkitc.webp',
		buyUrl: amazonSearchUrl('fr', 'module BME280 I2C'),
	},
	'sonoff-snzb-61d1': {
		id: 'sonoff-snzb-61d1',
		label: 'SONOFF SNZB-61D1 sonde humidité sol Zigbee',
		priceEur: 18,
		image: '/images/products/sonoff-snzb-02d.webp',
		buyUrl: amazonSearchUrl('fr', 'SONOFF SNZB-61D1 humidité sol Zigbee'),
	},
	'heiman-smoke-hs1sa': {
		id: 'heiman-smoke-hs1sa',
		label: 'Heiman HS1SA-E détecteur fumée Zigbee',
		priceEur: 35,
		image: '/images/products/sonoff-snzb-03p.webp',
		buyUrl: amazonSearchUrl('fr', 'Heiman HS1SA-E détecteur fumée Zigbee'),
	},
	'aqara-vibration-v1': {
		id: 'aqara-vibration-v1',
		label: 'Aqara Vibration Sensor',
		priceEur: 18,
		image: '/images/models/aqara-door-window-p2.webp',
		buyUrl: amazonSearchUrl('fr', 'Aqara Vibration Sensor Zigbee'),
	},
	'aqara-wireless-mini-switch': {
		id: 'aqara-wireless-mini-switch',
		label: 'Aqara Wireless Mini Switch',
		priceEur: 15,
		image: '/images/models/aqara-door-window-p2.webp',
		buyUrl: amazonSearchUrl('fr', 'Aqara Wireless Mini Switch Zigbee'),
	},
	'nabu-casa-sub': {
		id: 'nabu-casa-sub',
		label: 'Nabu Casa Home Assistant Cloud',
		priceEur: 6.5,
		image: '/images/models/home-assistant-green.webp',
		buyUrl: 'https://www.nabucasa.com',
		buyLabel: 'Voir sur Nabu Casa',
	},
};

/**
 * @param {{ useCaseId: string, ecosystem: string, qtyId: string, techId: string }} input
 */
export function computeBill(input) {
	const uc = USE_CASES.find((u) => u.id === input.useCaseId);
	if (!uc) return null;
	const qtyOpt = QTY_OPTIONS.find((q) => q.id === input.qtyId) ?? QTY_OPTIONS[0];
	const mult = qtyOpt.multiplier;
	const eco = input.ecosystem;
	const tech = input.techId || uc.techOptions[0]?.id;

	const recipe = uc.recipes[eco];
	if (!recipe) return null;

	const lines = [];
	const push = (productId, qty, role, note = '') => {
		const p = PRODUCTS[productId];
		if (!p || qty < 1) return;
		const dp = /\/dp\/([A-Z0-9]{10})/i.exec(p.buyUrl || '');
		const offer = dp ? amazonOffer('fr', dp[1]) : null;
		const unit = offer ? offer.prix : p.priceEur;
		const exact = Boolean(offer);
		lines.push({
			productId,
			qty,
			role,
			note,
			label: p.label,
			priceEur: unit,
			priceExact: exact,
			unitText: formatBillAmount(unit, exact),
			lineTotal: unit * qty,
			lineText: formatBillAmount(unit * qty, exact),
			image: p.image,
			buyUrl: p.buyUrl,
			buyLabel: p.buyLabel ?? (p.buyUrl.includes('amazon') ? 'Voir le prix du jour sur Amazon' : 'Acheter'),
		});
	};

	const mainId = recipe.main({ tech, eco });
	const mainQty = recipe.mainQty ? recipe.mainQty(mult) : mult;
	push(mainId, mainQty, 'main', recipe.mainNote?.(tech) ?? uc.mainRole);

	for (const acc of recipe.accessories ?? []) {
		if (acc.when && !acc.when({ tech, eco, mult })) continue;
		const q = typeof acc.qty === 'function' ? acc.qty(mult) : acc.qty;
		push(acc.productId, q, 'accessory', acc.note ?? '');
	}

	const wiring = typeof uc.wiring === 'function' ? uc.wiring({ tech, eco }) : uc.wiring;
	const meta = { ...uc.meta };
	if (recipe.metaAdjust) Object.assign(meta, recipe.metaAdjust({ tech, mult }));

	const budget = lines.reduce((s, l) => s + l.lineTotal, 0);
	const mainLines = lines.filter((l) => l.role === 'main');
	const accLines = lines.filter((l) => l.role !== 'main');
	const allExact = lines.length > 0 && lines.every((l) => l.priceExact);
	meta.budgetText = formatBillAmount(budget, allExact);
	meta.mainText = formatBillAmount(
		mainLines.reduce((s, l) => s + l.lineTotal, 0),
		mainLines.length > 0 && mainLines.every((l) => l.priceExact),
	);
	meta.accText = formatBillAmount(
		accLines.reduce((s, l) => s + l.lineTotal, 0),
		accLines.length > 0 && accLines.every((l) => l.priceExact),
	);

	const guide = getWiringGuide({
		useCaseId: input.useCaseId,
		ecosystem: eco,
		techId: tech,
		useCaseTitle: uc.title,
	});

	return {
		useCaseTitle: uc.title,
		tutorialHref: uc.tutorialHref,
		tutorialLabel: uc.tutorialLabel,
		wiring,
		guide,
		meta: { ...meta, budgetEur: budget },
		lines,
	};
}

/** @param {string} useCaseId @param {string} [qtyId] */
export function computeBudgetRange(useCaseId, qtyId = '1') {
	const uc = USE_CASES.find((u) => u.id === useCaseId);
	if (!uc) return { min: 0, max: 0 };
	let min = Infinity;
	let max = 0;
	for (const eco of ['wifi-sans-box', 'ha-zigbee', 'maker-esp32']) {
		const tech = uc.techOptions?.[0]?.id ?? null;
		const bill = computeBill({ useCaseId, ecosystem: eco, qtyId, techId: tech });
		if (!bill) continue;
		min = Math.min(min, bill.meta.budgetEur);
		max = Math.max(max, bill.meta.budgetEur);
	}
	if (min === Infinity) return { min: 0, max: 0 };
	return { min: Math.round(min), max: Math.round(max) };
}

