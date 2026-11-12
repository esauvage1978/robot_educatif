export const PI_MODELS = [
	{ id: 'pi3', label: 'Pi 3 B+' },
	{ id: 'pi4', label: 'Pi 4' },
	{ id: 'pi5', label: 'Pi 5' },
	{ id: 'zero2w', label: 'Zero 2 W' },
];

export const HAT_PAGE = {
	title: 'Compatibilité Raspberry Pi × HAT, Zigbee et alimentation',
	description:
		'Tableau filtrable : Pi 3, Pi 4, Pi 5 et Zero 2 W face aux HAT courants, dongles Zigbee et kits alimentation / boîtiers, avec liens vers nos tutoriels domotique.',
	intro:
		'Ce tableau filtrable croise les modèles Raspberry Pi (3 B+, 4, 5, Zero 2 W) avec les HAT (cartes empilées), dongles Zigbee (réseau maillé pour capteurs) et kits d’alimentation. Les statuts reflètent l’usage domotique courant avec Home Assistant ; vérifiez la fiche constructeur avant d’acheter.',
};

/** @type {Array<{ id: string, name: string, category: 'hat'|'zigbee'|'power', note?: string, guide?: string, asin?: string, search?: string, models: Record<string, 'ok'|'warn'|'no'> }>} */
export const HAT_ROWS = [
	{
		id: 'bme280-hat',
		name: 'Capteur BME280 (I2C / HAT météo)',
		category: 'hat',
		note: 'Station météo + historique SQLite.',
		guide: '/domotique/raspberry-pi-station-meteo-bme280-historique/',
		search: 'Raspberry Pi BME280 HAT',
		models: { pi3: 'ok', pi4: 'ok', pi5: 'ok', zero2w: 'warn' },
	},
	{
		id: 'pir-gpio',
		name: 'Détecteur PIR (GPIO + MQTT)',
		category: 'hat',
		guide: '/domotique/raspberry-pi-detecteur-presence-pir-eclairage/',
		models: { pi3: 'ok', pi4: 'ok', pi5: 'ok', zero2w: 'ok' },
	},
	{
		id: 'scd41-co2',
		name: 'Capteur CO₂ SCD41 (I2C)',
		category: 'hat',
		guide: '/domotique/raspberry-pi-capteur-co2-scd41-home-assistant/',
		search: 'SCD41 Raspberry Pi',
		models: { pi3: 'ok', pi4: 'ok', pi5: 'ok', zero2w: 'warn' },
	},
	{
		id: 'reed-door',
		name: 'Capteur ouverture porte (reed GPIO)',
		category: 'hat',
		guide: '/domotique/raspberry-pi-capteur-ouverture-porte-notification/',
		models: { pi3: 'ok', pi4: 'ok', pi5: 'ok', zero2w: 'ok' },
	},
	{
		id: 'nvme-hat-pi5',
		name: 'HAT M.2 NVMe (boot SSD Pi 5)',
		category: 'hat',
		note: 'Recommandé pour Home Assistant 24/7.',
		guide: '/domotique/home-assistant-raspberry-pi-5-installation/',
		search: 'Raspberry Pi 5 M.2 HAT',
		models: { pi3: 'no', pi4: 'no', pi5: 'ok', zero2w: 'no' },
	},
	{
		id: 'poep-hat-plus',
		name: 'PoE+ HAT (alim réseau)',
		category: 'power',
		models: { pi3: 'warn', pi4: 'ok', pi5: 'warn', zero2w: 'no' },
		note: 'Pi 5 : HAT PoE spécifique ; switch PoE+ requis.',
		search: 'Raspberry Pi PoE HAT',
	},
	{
		id: 'psu-27w-pi5',
		name: 'Alimentation officielle 27 W USB-C (Pi 5)',
		category: 'power',
		guide: '/domotique/home-assistant-raspberry-pi-5-installation/',
		search: 'Raspberry Pi 5 power supply 27W',
		models: { pi3: 'no', pi4: 'no', pi5: 'ok', zero2w: 'no' },
	},
	{
		id: 'psu-15w-pi4',
		name: 'Alimentation USB-C 15 W (Pi 4)',
		category: 'power',
		search: 'Raspberry Pi 4 power supply',
		models: { pi3: 'no', pi4: 'ok', pi5: 'no', zero2w: 'no' },
	},
	{
		id: 'case-pi5-active',
		name: 'Boîtier actif officiel Pi 5',
		category: 'power',
		search: 'Raspberry Pi 5 case fan',
		models: { pi3: 'no', pi4: 'no', pi5: 'ok', zero2w: 'no' },
	},
	{
		id: 'sonoff-dongle-e',
		name: 'Sonoff ZBDongle-E (Zigbee USB)',
		category: 'zigbee',
		guide: '/domotique/meilleur-dongle-zigbee-home-assistant/',
		search: 'Sonoff ZBDongle-E',
		models: { pi3: 'ok', pi4: 'ok', pi5: 'ok', zero2w: 'warn' },
	},
	{
		id: 'sonoff-dongle-p',
		name: 'Sonoff ZBDongle-P (Zigbee + routeur)',
		category: 'zigbee',
		guide: '/domotique/home-assistant-zigbee2mqtt-ou-zha/',
		search: 'Sonoff ZBDongle-P',
		models: { pi3: 'ok', pi4: 'ok', pi5: 'ok', zero2w: 'warn' },
	},
	{
		id: 'conbee-3',
		name: 'ConBee III / deCONZ',
		category: 'zigbee',
		search: 'ConBee III Zigbee',
		models: { pi3: 'ok', pi4: 'ok', pi5: 'ok', zero2w: 'warn' },
	},
	{
		id: 'ha-green',
		name: 'Home Assistant Green (box dédiée)',
		category: 'zigbee',
		note: 'Alternative au Pi ; Zigbee via dongle USB.',
		guide: '/domotique/home-assistant-green-vs-raspberry-pi-5/',
		models: { pi3: 'no', pi4: 'no', pi5: 'no', zero2w: 'no' },
	},
];

export const HAT_CATEGORIES = {
	hat: 'HAT / capteurs GPIO',
	zigbee: 'Dongles Zigbee',
	power: 'Alimentation & boîtiers',
};
