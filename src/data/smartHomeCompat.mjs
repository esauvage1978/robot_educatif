export const HUBS = [
	{ id: 'zha', label: { fr: 'Home Assistant ZHA', en: 'Home Assistant ZHA', de: 'Home Assistant ZHA', it: 'Home Assistant ZHA', es: 'Home Assistant ZHA' } },
	{ id: 'z2m', label: { fr: 'Zigbee2MQTT', en: 'Zigbee2MQTT', de: 'Zigbee2MQTT', it: 'Zigbee2MQTT', es: 'Zigbee2MQTT' } },
	{ id: 'homey', label: { fr: 'Homey Pro / Mini', en: 'Homey Pro / Mini', de: 'Homey Pro / Mini', it: 'Homey Pro / Mini', es: 'Homey Pro / Mini' } },
	{ id: 'jeedom', label: { fr: 'Jeedom', en: 'Jeedom', de: 'Jeedom', it: 'Jeedom', es: 'Jeedom' } },
	{ id: 'voice', label: { fr: 'Alexa / Apple Home', en: 'Alexa / Apple Home', de: 'Alexa / Apple Home', it: 'Alexa / Apple Home', es: 'Alexa / Apple Home' } },
];

/** status: native | plugin | no */
export const COMPAT_ROWS = [
	{
		id: 'shelly-1-mini-gen3',
		name: 'Shelly 1 Mini Gen3',
		protocol: 'wifi',
		powerW: '0,4 W veille',
		hubs: { zha: 'no', z2m: 'no', homey: 'native', jeedom: 'plugin', voice: 'plugin' },
		notes: {
			fr: 'Wi-Fi local Shelly ; intégration HA native. Alexa/Home via cloud Shelly.',
			en: 'Wi-Fi Shelly local API; HA native integration. Alexa/Home via Shelly cloud.',
		},
	},
	{
		id: 'shelly-plus-2pm',
		name: 'Shelly Plus 2PM',
		protocol: 'wifi',
		powerW: '0,5 W veille',
		hubs: { zha: 'no', z2m: 'no', homey: 'native', jeedom: 'plugin', voice: 'plugin' },
		notes: { fr: 'Mesure conso ; couverture roller shutter.', en: 'Power metering; shutter mode.' },
	},
	{
		id: 'sonoff-zbmini-l2',
		name: 'Sonoff ZBMini-L2 (sans neutre)',
		protocol: 'zigbee',
		powerW: '< 1 W',
		hubs: { zha: 'native', z2m: 'native', homey: 'native', jeedom: 'plugin', voice: 'plugin' },
		notes: {
			fr: 'Zigbee 3.0 ; routeur si alimenté. Vérifiez charge minimale ampoule.',
			en: 'Zigbee 3.0 router when powered. Check minimum load.',
		},
	},
	{
		id: 'sonoff-snzb-02d',
		name: 'SONOFF SNZB-02D',
		protocol: 'zigbee',
		powerW: 'Pile CR2450 ~1 an',
		hubs: { zha: 'native', z2m: 'native', homey: 'native', jeedom: 'plugin', voice: 'plugin' },
		notes: { fr: 'Capteur température/humidité ; pas routeur.', en: 'Temp/humidity sensor; not a router.' },
	},
	{
		id: 'aqara-fp2',
		name: 'Aqara FP2',
		protocol: 'wifi',
		powerW: '5 W USB',
		hubs: { zha: 'no', z2m: 'no', homey: 'plugin', jeedom: 'plugin', voice: 'native' },
		notes: {
			fr: 'mmWave Wi-Fi ; intégration HA via HomeKit Controller ou cloud Aqara selon config.',
			en: 'mmWave Wi-Fi; HA via HomeKit Controller or Aqara cloud.',
		},
	},
	{
		id: 'tuya-zigbee',
		name: 'Prise / capteur Tuya Zigbee (générique)',
		protocol: 'zigbee',
		powerW: 'Variable',
		hubs: { zha: 'plugin', z2m: 'native', homey: 'plugin', jeedom: 'plugin', voice: 'plugin' },
		notes: {
			fr: 'Souvent OK en Z2M ; ZHA peut nécessiter un quirk. Évitez passerelle Tuya cloud si objectif local.',
			en: 'Often fine on Z2M; ZHA may need a quirk. Skip Tuya cloud gateway for local control.',
		},
	},
];

export const COMPAT_UI = {
	fr: {
		title: 'Matrice compatibilité domotique',
		filterHub: 'Filtrer par box',
		filterProto: 'Protocole',
		all: 'Toutes',
		equipment: 'Équipement',
		consumption: 'Conso typique',
		status: 'Statut',
		native: '✅ Natif',
		plugin: '⚠️ Plugin / dongle',
		no: '❌ Non supporté',
		proto: { wifi: 'Wi-Fi', zigbee: 'Zigbee', matter: 'Matter' },
	},
	en: {
		title: 'Smart home compatibility matrix',
		filterHub: 'Filter by hub',
		filterProto: 'Protocol',
		all: 'All',
		equipment: 'Device',
		consumption: 'Typical draw',
		status: 'Status',
		native: '✅ Native',
		plugin: '⚠️ Plugin / dongle',
		no: '❌ Not supported',
		proto: { wifi: 'Wi-Fi', zigbee: 'Zigbee', matter: 'Matter' },
	},
	de: {
		title: 'Smart-Home-Kompatibilitätsmatrix',
		filterHub: 'Nach Zentrale filtern',
		filterProto: 'Protokoll',
		all: 'Alle',
		equipment: 'Gerät',
		consumption: 'Typ. Verbrauch',
		status: 'Status',
		native: '✅ Nativ',
		plugin: '⚠️ Plugin / Stick',
		no: '❌ Nicht unterstützt',
		proto: { wifi: 'WLAN', zigbee: 'Zigbee', matter: 'Matter' },
	},
	it: {
		title: 'Matrice compatibilità domotica',
		filterHub: 'Filtra per hub',
		filterProto: 'Protocollo',
		all: 'Tutti',
		equipment: 'Dispositivo',
		consumption: 'Consumo tipico',
		status: 'Stato',
		native: '✅ Nativo',
		plugin: '⚠️ Plugin / dongle',
		no: '❌ Non supportato',
		proto: { wifi: 'Wi-Fi', zigbee: 'Zigbee', matter: 'Matter' },
	},
	es: {
		title: 'Matriz compatibilidad domótica',
		filterHub: 'Filtrar por central',
		filterProto: 'Protocolo',
		all: 'Todos',
		equipment: 'Equipo',
		consumption: 'Consumo típico',
		status: 'Estado',
		native: '✅ Nativo',
		plugin: '⚠️ Plugin / dongle',
		no: '❌ No compatible',
		proto: { wifi: 'Wi-Fi', zigbee: 'Zigbee', matter: 'Matter' },
	},
};

export const COMPAT_PAGE_META = {
	fr: {
		title: 'Matrice compat domotique : HA, Homey, Zigbee, Matter',
		description:
			'Grille interactive Protocole × Box × Module : Shelly, Sonoff, Aqara, Tuya. Statuts natif, plugin ou non supporté, avec consommation indicative.',
		intro:
			'Filtrez par box (ZHA, Zigbee2MQTT, Homey, Jeedom, Alexa/Apple Home) et par protocole. Les statuts reflètent une utilisation locale courante en octobre 2026 — vérifiez toujours la fiche fabricant avant achat.',
	},
	en: {
		title: 'Smart home compatibility matrix: Home Assistant, Homey, Zigbee, Matter',
		description:
			'Interactive grid: protocol × hub × device for Shelly, Sonoff, Aqara, Tuya with native, plugin or unsupported status.',
		intro:
			'Filter by hub and protocol. Status reflects typical local setups in October 2026 — confirm on the vendor page before buying.',
	},
	de: {
		title: 'Kompatibilitätsmatrix Smart Home: Home Assistant, Homey, Zigbee, Matter',
		description:
			'Interaktive Tabelle Protokoll × Zentrale × Gerät mit Status und typischem Verbrauch.',
		intro:
			'Nach Zentrale und Protokoll filtern. Stand Oktober 2026 — Herstellerseite vor dem Kauf prüfen.',
	},
	it: {
		title: 'Matrice compatibilità: Home Assistant, Homey, Zigbee, Matter',
		description:
			'Griglia interattiva protocollo × hub × modulo con stati e consumo indicativo.',
		intro:
			'Filtrate per hub e protocollo. Riferimento ottobre 2026 — verificate la scheda produttore.',
	},
	es: {
		title: 'Matriz compatibilidad: Home Assistant, Homey, Zigbee, Matter',
		description:
			'Cuadrícula interactiva protocolo × central × módulo con estados y consumo.',
		intro:
			'Filtrad por central y protocolo. Referencia octubre 2026 — comprobad la ficha del fabricante.',
	},
};
