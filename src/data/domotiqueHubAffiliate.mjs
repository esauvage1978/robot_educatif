/** Cartes d’affiliation pour les rubriques hub Domotique (photos produit réelles). */

/**
 * @typedef {{ image: string, alt: string, name: Record<string,string>, blurb: Record<string,string>, asin?: string, searchQuery?: string, guide: Record<string,string> }} HubAffiliateItem
 */

/** @type {Record<'guides-achat'|'robots-aspirateurs', HubAffiliateItem[]>} */
export const DOMOTIQUE_HUB_AFFILIATE = {
	'guides-achat': [
		{
			image: '/images/products/sonoff-zbdongle-e.webp',
			alt: 'SONOFF ZBDongle-E, clé USB Zigbee pour Home Assistant',
			asin: 'B0B6P22YJC',
			name: {
				fr: 'SONOFF ZBDongle-E',
				en: 'SONOFF ZBDongle-E',
				de: 'SONOFF ZBDongle-E',
				it: 'SONOFF ZBDongle-E',
				es: 'SONOFF ZBDongle-E',
			},
			blurb: {
				fr: 'Coordonnateur Zigbee USB — point de départ pour capteurs et prises locales.',
				en: 'USB Zigbee coordinator — the usual first step for local sensors and plugs.',
				de: 'USB-Zigbee-Koordinator — üblicher Einstieg für lokale Sensoren und Steckdosen.',
				it: 'Coordinatore Zigbee USB — primo passo per sensori e prese in locale.',
				es: 'Coordinador Zigbee USB — primer paso para sensores y enchufes en local.',
			},
			guide: {
				fr: '/domotique/meilleur-dongle-zigbee-home-assistant/',
				en: '/en/smart-home/best-zigbee-dongle-home-assistant/',
				de: '/de/smart-home/bester-zigbee-stick-home-assistant/',
				it: '/it/domotica/miglior-chiavetta-zigbee-home-assistant/',
				es: '/es/domotica/mejor-dongle-zigbee-home-assistant/',
			},
		},
		{
			image: '/images/products/sonoff-snzb-02d.webp',
			alt: 'Capteur Zigbee SONOFF SNZB-02D avec écran température et humidité',
			asin: 'B0BYZP8NK2',
			name: {
				fr: 'SONOFF SNZB-02D',
				en: 'SONOFF SNZB-02D',
				de: 'SONOFF SNZB-02D',
				it: 'SONOFF SNZB-02D',
				es: 'SONOFF SNZB-02D',
			},
			blurb: {
				fr: 'Température et humidité Zigbee avec afficheur — pile longue durée.',
				en: 'Zigbee temperature and humidity with on-device display.',
				de: 'Zigbee Temperatur/Luftfeuchte mit Display.',
				it: 'Temperatura e umidità Zigbee con display integrato.',
				es: 'Temperatura y humedad Zigbee con pantalla.',
			},
			guide: {
				fr: '/domotique/capteur-temperature-zigbee/',
				en: '/en/smart-home/zigbee-temperature-sensor/',
				de: '/de/smart-home/zigbee-temperatursensor/',
				it: '/it/domotica/sensore-temperatura-zigbee/',
				es: '/es/domotica/sensor-temperatura-zigbee/',
			},
		},
		{
			image: '/images/products/nous-a1z.webp',
			alt: 'Prise connectée Zigbee NOUS A1Z avec mesure de consommation',
			asin: 'B0CP9Q8V7G',
			name: {
				fr: 'NOUS A1Z (Zigbee)',
				en: 'NOUS A1Z (Zigbee)',
				de: 'NOUS A1Z (Zigbee)',
				it: 'NOUS A1Z (Zigbee)',
				es: 'NOUS A1Z (Zigbee)',
			},
			blurb: {
				fr: 'Prise Zigbee 16 A avec mesure W/kWh pour automatisations Home Assistant.',
				en: '16 A Zigbee plug with energy metering for Home Assistant.',
				de: 'Zigbee-Steckdose 16 A mit Verbrauchsmessung.',
				it: 'Presa Zigbee 16 A con misura dei consumi.',
				es: 'Enchufe Zigbee 16 A con medición de consumo.',
			},
			guide: {
				fr: '/domotique/prise-connectee-zigbee-home-assistant/',
				en: '/en/smart-home/smart-plugs-uk-us/',
				de: '/de/smart-home/smarte-steckdosen/',
				it: '/it/domotica/prese-smart/',
				es: '/es/domotica/enchufes-inteligentes/',
			},
		},
	],
	'robots-aspirateurs': [
		{
			image: '/images/products/roborock-q7-m5.webp',
			alt: 'Robot aspirateur Roborock Q7 M5 avec navigation LiDAR',
			asin: 'B0DT4FJJXM',
			name: {
				fr: 'Roborock Q7 M5',
				en: 'Roborock Q7 M5',
				de: 'Roborock Q7 M5',
				it: 'Roborock Q7 M5',
				es: 'Roborock Q7 M5',
			},
			blurb: {
				fr: 'Notre repère petit budget : LiDAR et intégration Home Assistant documentée.',
				en: 'Our budget pick: LiDAR mapping and documented Home Assistant support.',
				de: 'Budget-Tipp: LiDAR-Kartierung und Home-Assistant-Anbindung.',
				it: 'Scelta economica: LiDAR e integrazione Home Assistant.',
				es: 'Opción ajustada: LiDAR e integración con Home Assistant.',
			},
			guide: {
				fr: '/domotique/robot-aspirateur-moins-de-200-euros/',
				en: '/en/smart-home/robot-vacuum-under-200/',
				de: '/de/smart-home/saugroboter-unter-200-euro/',
				it: '/it/domotica/robot-aspirapolvere-sotto-200-euro/',
				es: '/es/domotica/robot-aspirador-menos-200-euros/',
			},
		},
		{
			image: '/images/products/roborock-qrevo-s5v.webp',
			alt: 'Robot aspirateur laveur Roborock avec station',
			asin: 'B0CQRWCN6D',
			name: {
				fr: 'Roborock (série Qrevo)',
				en: 'Roborock (Qrevo series)',
				de: 'Roborock (Qrevo-Serie)',
				it: 'Roborock (serie Qrevo)',
				es: 'Roborock (serie Qrevo)',
			},
			blurb: {
				fr: 'Pour comparer serpillières, stations et lavage — voir notre guide laveurs.',
				en: 'Compare mops, docks and washing — see our mop robot guide.',
				de: 'Wischstationen vergleichen — siehe Saug-/Wischroboter-Guide.',
				it: 'Confronto tra mop e stazioni — guida robot lava pavimenti.',
				es: 'Comparar mop y estaciones — guía de robots fregasuelos.',
			},
			guide: {
				fr: '/domotique/robot-aspirateur-laveur-serpilliere-station/',
				en: '/en/smart-home/robot-vacuum-mop-self-cleaning-dock/',
				de: '/de/smart-home/saugroboter-wischstation-selbstreinigung/',
				it: '/it/domotica/robot-lavapavimenti-stazione-autopulente/',
				es: '/es/domotica/robot-fregasuelos-estacion-autolimpieza/',
			},
		},
	],
};

export const HUB_AFFILIATE_COPY = {
	fr: {
		title: 'Produits cités dans nos comparatifs',
		lead: 'Ces modèles reviennent dans les tableaux ci-dessous ; liens partenaires, prix du jour chez le marchand.',
		compare: 'Lire le comparatif',
		amazon: 'Voir sur Amazon',
	},
	en: {
		title: 'Products from our buying guides',
		lead: 'Models we actually compare in the table — affiliate links, check today’s price at the shop.',
		compare: 'Read the guide',
		amazon: 'View on Amazon',
	},
	de: {
		title: 'Produkte aus unseren Kaufberatern',
		lead: 'Modelle aus den Tabellen — Werbelinks, Tagespreis beim Händler prüfen.',
		compare: 'Zum Vergleich',
		amazon: 'Bei Amazon ansehen',
	},
	it: {
		title: 'Prodotti dei nostri confronti',
		lead: 'Modelli citati nelle tabelle — link affiliati, prezzo del giorno sul negozio.',
		compare: 'Leggi la guida',
		amazon: 'Vedi su Amazon',
	},
	es: {
		title: 'Productos de nuestras guías',
		lead: 'Modelos de las tablas — enlaces afiliados, precio del día en la tienda.',
		compare: 'Ver la guía',
		amazon: 'Ver en Amazon',
	},
};