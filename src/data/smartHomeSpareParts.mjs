import { amazonSearchUrl, shellyUrl } from '../lib/amazonAffiliate.mjs';

/** @param {'fr'|'en'|'de'|'it'|'es'} lang */
export function sparePartsRows(lang) {
	return [
		{
			category: {
				fr: 'Alimentation Raspberry Pi 5 (27 W)',
				en: 'Raspberry Pi 5 PSU (27 W)',
				de: 'Raspberry Pi 5 Netzteil (27 W)',
				it: 'Alimentatore Raspberry Pi 5 (27 W)',
				es: 'Fuente Raspberry Pi 5 (27 W)',
			},
			official: { fr: 'Officielle 27 W USB-C (~15 €)', en: 'Official 27 W USB-C (~£15)', de: 'Offiziell 27 W USB-C (~15 €)', it: 'Ufficiale 27 W USB-C (~15 €)', es: 'Oficial 27 W USB-C (~15 €)' },
			compat: { fr: 'USB-C PD 5 V/5 A certifiée (~9–12 €)', en: 'Certified 5 V/5 A USB-C PD (~£9–12)', de: 'USB-C PD 5 V/5 A (~9–12 €)', it: 'USB-C PD 5 V/5 A (~9–12 €)', es: 'USB-C PD 5 V/5 A (~9–12 €)' },
			note: {
				fr: 'Évitez les chargeurs téléphone 18 W : sous-alimentation = reboots.',
				en: 'Skip 18 W phone chargers — undervoltage causes reboots.',
				de: 'Keine 18-W-Handyladegeräte — Unterspannung.',
				it: 'Evitate caricabatterie da 18 W.',
				es: 'Evitad cargadores de 18 W.',
			},
			links: [
				{ label: { fr: 'Recherche alim 27 W Pi 5', en: 'Pi 5 27 W PSU search', de: 'Netzteil Pi 5', it: 'Alimentatore Pi 5', es: 'Fuente Pi 5' }, url: amazonSearchUrl(lang, 'Raspberry Pi 5 power supply 27W') },
			],
		},
		{
			category: {
				fr: 'Dongle Zigbee USB',
				en: 'Zigbee USB coordinator',
				de: 'Zigbee USB Coordinator',
				it: 'Coordinatore Zigbee USB',
				es: 'Coordinador Zigbee USB',
			},
			official: { fr: 'Home Assistant Connect ZBT-2 (~55 €)', en: 'Home Assistant Connect ZBT-2 (~£55)', de: 'Connect ZBT-2 (~55 €)', it: 'Connect ZBT-2 (~55 €)', es: 'Connect ZBT-2 (~55 €)' },
			compat: { fr: 'SONOFF ZBDongle-E (~25 €)', en: 'SONOFF ZBDongle-E (~£25)', de: 'SONOFF ZBDongle-E (~25 €)', it: 'SONOFF ZBDongle-E (~25 €)', es: 'SONOFF ZBDongle-E (~25 €)' },
			note: {
				fr: 'Même puce Silicon Labs sur beaucoup de modèles ; flashez le firmware adapté (Ember / zStack).',
				en: 'Flash Ember or zStack firmware per stick model.',
				de: 'Firmware Ember oder zStack je nach Modell.',
				it: 'Firmware Ember o zStack secondo modello.',
				es: 'Firmware Ember o zStack según modelo.',
			},
			links: [
				{ label: { fr: 'SONOFF ZBDongle-E', en: 'SONOFF ZBDongle-E', de: 'SONOFF ZBDongle-E', it: 'SONOFF ZBDongle-E', es: 'SONOFF ZBDongle-E' }, url: amazonSearchUrl(lang, 'SONOFF ZBDongle-E') },
			],
		},
		{
			category: {
				fr: 'Sonde température DS18B20 / BME280',
				en: 'DS18B20 / BME280 sensors',
				de: 'DS18B20 / BME280 Sensoren',
				it: 'Sensori DS18B20 / BME280',
				es: 'Sensores DS18B20 / BME280',
			},
			official: { fr: 'Module Adafruit / Pimoroni (~8–15 €)', en: 'Adafruit / Pimoroni module (~£8–15)', de: 'Adafruit Modul (~8–15 €)', it: 'Modulo Adafruit (~8–15 €)', es: 'Módulo Adafruit (~8–15 €)' },
			compat: { fr: 'Lot 5× DS18B20 étanches (~12 €)', en: 'Pack of 5 waterproof DS18B20 (~£12)', de: '5× DS18B20 wasserdicht (~12 €)', it: 'Pack 5 DS18B20 (~12 €)', es: 'Pack 5 DS18B20 (~12 €)' },
			note: {
				fr: 'Vérifiez résistance pull-up 4,7 kΩ sur bus 1-Wire.',
				en: 'Use 4.7 kΩ pull-up on 1-Wire bus.',
				de: '4,7-kΩ-Pull-up am 1-Wire-Bus.',
				it: 'Pull-up 4,7 kΩ sul bus 1-Wire.',
				es: 'Pull-up 4,7 kΩ en bus 1-Wire.',
			},
			links: [
				{ label: { fr: 'BME280 module', en: 'BME280 module', de: 'BME280 Modul', it: 'Modulo BME280', es: 'Módulo BME280' }, url: amazonSearchUrl(lang, 'BME280 module I2C') },
				{ label: { fr: 'DS18B20', en: 'DS18B20', de: 'DS18B20', it: 'DS18B20', es: 'DS18B20' }, url: amazonSearchUrl(lang, 'DS18B20 waterproof') },
			],
		},
		{
			category: {
				fr: 'Câbles Dupont / RJ25 mBot',
				en: 'Dupont / mBot RJ25 cables',
				de: 'Dupont- / mBot-RJ25-Kabel',
				it: 'Cavi Dupont / RJ25 mBot',
				es: 'Cables Dupont / RJ25 mBot',
			},
			official: { fr: 'Pack Makeblock RJ25 (~12 €)', en: 'Makeblock RJ25 pack (~£12)', de: 'Makeblock RJ25 (~12 €)', it: 'Pack Makeblock RJ25 (~12 €)', es: 'Pack Makeblock RJ25 (~12 €)' },
			compat: { fr: 'Fils Dupont M-M 20 cm (~4 €)', en: 'Dupont M-M 20 cm (~£4)', de: 'Dupont M-M (~4 €)', it: 'Dupont M-M (~4 €)', es: 'Dupont M-M (~4 €)' },
			note: {
				fr: 'RJ25 Makeblock = broches réordonnées : ne pas brancher un capteur Arduino brut sans adaptateur.',
				en: 'Makeblock RJ25 pinout differs — don’t plug raw Arduino sensors without adapter.',
				de: 'RJ25-Pinbelegung beachten.',
				it: 'Pinout RJ25 Makeblock specifico.',
				es: 'Pinout RJ25 específico de Makeblock.',
			},
			links: [
				{ label: { fr: 'Câbles RJ25 Makeblock', en: 'Makeblock RJ25 cables', de: 'Makeblock RJ25', it: 'Cavi RJ25 Makeblock', es: 'Cables RJ25 Makeblock' }, url: amazonSearchUrl(lang, 'Makeblock RJ25 cable') },
				{ label: { fr: 'Servomoteur micro SG90', en: 'SG90 micro servo', de: 'SG90 Servo', it: 'Servo SG90', es: 'Servo SG90' }, url: amazonSearchUrl(lang, 'SG90 micro servo') },
			],
		},
		{
			category: {
				fr: 'Relais / modules Shelly',
				en: 'Shelly relays',
				de: 'Shelly Relais',
				it: 'Relè Shelly',
				es: 'Relés Shelly',
			},
			official: { fr: 'Shelly 1 Mini Gen3 (~15 €)', en: 'Shelly 1 Mini Gen3 (~£15)', de: 'Shelly 1 Mini Gen3 (~15 €)', it: 'Shelly 1 Mini Gen3 (~15 €)', es: 'Shelly 1 Mini Gen3 (~15 €)' },
			compat: { fr: 'Sonoff MINIR4 Wi-Fi (~9 €) — autre écosystème', en: 'Sonoff MINIR4 Wi-Fi (~£9) — different stack', de: 'Sonoff MINIR4 (~9 €)', it: 'Sonoff MINIR4 (~9 €)', es: 'Sonoff MINIR4 (~9 €)' },
			note: {
				fr: 'Shelly : API locale et intégration HA native. Lien vers la boutique officielle Shelly.',
				en: 'Shelly: local API and native HA. Link to the official Shelly store.',
				de: 'Shelly: lokale API.',
				it: 'Shelly: API locale.',
				es: 'Shelly: API local.',
			},
			links: [{ label: { fr: 'Shelly FR', en: 'Shelly store', de: 'Shelly Shop', it: 'Shelly shop', es: 'Shelly tienda' }, url: shellyUrl('/products/shelly-1-mini-gen3') }],
		},
		{
			category: {
				fr: 'Batteries / piles mBot & Arduino',
				en: 'mBot & Arduino batteries',
				de: 'mBot & Arduino Batterien',
				it: 'Batterie mBot & Arduino',
				es: 'Pilas mBot & Arduino',
			},
			official: { fr: 'Pack piles Makeblock (~8 €)', en: 'Makeblock battery pack (~£8)', de: 'Makeblock Akku (~8 €)', it: 'Batteria Makeblock (~8 €)', es: 'Batería Makeblock (~8 €)' },
			compat: { fr: '4× AA rechargeables Eneloop (~12 €)', en: '4× Eneloop AA (~£12)', de: '4× Eneloop AA (~12 €)', it: '4× Eneloop AA (~12 €)', es: '4× Eneloop AA (~12 €)' },
			note: {
				fr: 'Pour mBot classique : 4× AA ; évitez alcalines bon marché (chute de tension = resets).',
				en: 'Classic mBot uses 4× AA; avoid cheap alkalines (voltage sag).',
				de: '4× AA, gute NiMH verwenden.',
				it: '4× AA NiMH di qualità.',
				es: '4× AA NiMH de calidad.',
			},
			links: [
				{ label: { fr: 'Elegoo kit Arduino', en: 'Elegoo Arduino kit', de: 'Elegoo Arduino Kit', it: 'Kit Elegoo Arduino', es: 'Kit Elegoo Arduino' }, url: amazonSearchUrl(lang, 'Elegoo Arduino kit') },
				{ label: { fr: 'Makeblock mBot', en: 'Makeblock mBot', de: 'Makeblock mBot', it: 'Makeblock mBot', es: 'Makeblock mBot' }, url: amazonSearchUrl(lang, 'Makeblock mBot') },
			],
		},
	];
}

export const SPARE_PARTS_META = {
	fr: {
		title: 'Pièces détachées & capteurs domotique / robotique : officiel vs compatible',
		description:
			'Où trouver alimentations Pi 5 27 W, dongles Zigbee, DS18B20, BME280, câbles RJ25 mBot, relais Shelly/Sonoff : prix constructeur vs alternatives fiables et liens affiliés.',
		intro:
			'Nous comparons le prix constructeur (ou officiel) à des équivalents compatibles testés par la communauté — sans sacrifier la sécurité électrique. Liens vers des revendeurs partenaires ; prix indicatifs octobre 2026.',
		table: { cat: 'Catégorie', official: 'Prix constructeur', compat: 'Compatible vérifié', note: 'Note fiabilité' },
	},
	en: {
		title: 'Spare parts & sensors: official vs budget-compatible (smart home & robotics)',
		description:
			'Pi 5 27 W PSU, Zigbee dongles, DS18B20, BME280, mBot RJ25 cables, Shelly relays — official vs verified compatible prices and affiliate links.',
		intro:
			'We compare official pricing with community-trusted alternatives. Amazon affiliate tags per locale; indicative prices October 2026.',
		table: { cat: 'Category', official: 'Official price', compat: 'Verified compatible', note: 'Reliability note' },
	},
	de: {
		title: 'Ersatzteile & Sensoren: Original vs günstige kompatible Alternativen',
		description:
			'Pi-5-Netzteil, Zigbee-Stick, DS18B20, BME280, mBot-Kabel, Shelly — Preisvergleich mit Affiliate-Links.',
		intro:
			'Vergleich Herstellerpreis vs bewährte Alternativen. Preise Oktober 2026, Affiliate-Links.',
		table: { cat: 'Kategorie', official: 'Hersteller', compat: 'Kompatible Alternative', note: 'Hinweis' },
	},
	it: {
		title: 'Ricambi e sensori: originale vs compatibile economico',
		description:
			'Alimentatore Pi 5, dongle Zigbee, DS18B20, BME280, cavi mBot, Shelly — confronto prezzi e link affiliati.',
		intro:
			'Prezzi indicativi ottobre 2026. Link Amazon.it affiliati.',
		table: { cat: 'Categoria', official: 'Prezzo ufficiale', compat: 'Compatibile verificato', note: 'Nota' },
	},
	es: {
		title: 'Repuestos y sensores: oficial vs compatible económico',
		description:
			'Fuente Pi 5, dongle Zigbee, DS18B20, BME280, cables mBot, Shelly — comparativa de precios y enlaces afiliados.',
		intro:
			'Precios orientativos octubre 2026. Enlaces Amazon.es afiliados.',
		table: { cat: 'Categoría', official: 'Precio oficial', compat: 'Compatible verificado', note: 'Nota' },
	},
};
