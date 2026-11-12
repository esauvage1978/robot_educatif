/**
 * Génère les 22 cas d'usage dans src/data/smartHomeUseCases.mjs
 * node scripts/expand-use-cases.mjs
 */
import { writeFileSync } from 'node:fs';
import { USE_CASES as legacy } from '../src/data/smartHomeUseCases.mjs';

const z = (note) => ({ productId: 'zbdongle-e', qty: 1, note: note ?? 'Coordinateur Zigbee USB.' });
const w = (n = 1) => ({ productId: 'wago-221', qty: n });

function clone(uc, patch) {
	return {
		...uc,
		...patch,
		meta: { ...uc.meta, ...(patch.meta ?? {}) },
		techOptions: patch.techOptions ?? uc.techOptions,
		recipes: patch.recipes ?? uc.recipes,
	};
}

const [g0, v0, e0, h0, c0, s0, t0, b0] = legacy;

const cases = [
	clone(g0, {
		id: 'garage-porte-smartphone',
		category: 'acces-garage',
		keywords:
			'garage motorisé smartphone reed contact sec poussoir shelly ouvert fermé',
		emoji: '🚗',
		title: 'Ouvrir et fermer une porte de garage motorisée au smartphone',
		shortDesc: 'Contact sec sur bornier poussoir + capteur reed d’état fermé/ouvert.',
		qtyLabel: 'Nombre de portes de garage',
	}),
	clone(g0, {
		id: 'portail-electrique',
		category: 'acces-garage',
		keywords: 'portail battant coulissant shelly plus 1 coffret moteur étanche',
		emoji: '🚪',
		title: 'Commander un portail électrique battant ou coulissant à distance',
		shortDesc:
			'Shelly 1 Mini Gen3 / Shelly Plus 1 en contact sec + capteur d’ouverture étanche.',
		qtyLabel: 'Nombre de portails',
		techOptions: [
			{ id: 'shelly-mini', label: 'Shelly 1 Mini Gen3 (coffret compact)' },
			{ id: 'shelly-plus1', label: 'Shelly Plus 1 dans le coffret moteur' },
		],
		wiring: ({ tech }) => [
			'Coupez l’alimentation du coffret automate.',
			tech === 'shelly-plus1'
				? 'Shelly Plus 1 en contact sec sur entrée poussoir (pas sur le 230 V moteur).'
				: 'Shelly 1 Mini sur bornes + / − du poussoir.',
			'Capteur d’ouverture étanche pour l’état ouvert/fermé sur smartphone.',
		],
		recipes: {
			'wifi-sans-box': {
				main: ({ tech }) => (tech === 'shelly-plus1' ? 'shelly-plus-1' : 'shelly-1-mini-gen3'),
				accessories: [w()],
			},
			'ha-zigbee': {
				main: ({ tech }) => (tech === 'shelly-plus1' ? 'shelly-plus-1' : 'shelly-1-mini-gen3'),
				accessories: [
					{ productId: 'aqara-door-p2', qty: (m) => m, note: 'Ouverture portail dans HA.' },
					z(),
					w(),
				],
			},
			'maker-esp32': g0.recipes['maker-esp32'],
		},
	}),
	clone(t0, {
		id: 'boite-lettres-colis',
		category: 'acces-garage',
		keywords: 'boîte aux lettres facteur colis notification aqara p2 inclinaison',
		emoji: '📬',
		title: 'Recevoir une notification quand le facteur dépose courrier ou colis',
		shortDesc: 'Capteur Aqara Door & Window P2 sur volet de boîte aux lettres.',
		mainRole: 'Détection ouverture / inclinaison du volet.',
		qtyLabel: 'Nombre de boîtes aux lettres',
		techOptions: [
			{ id: 'zigbee-ha', label: 'Home Assistant / Zigbee' },
			{ id: 'notif-simple', label: 'Notification smartphone (intégration Aqara)' },
		],
		wiring: () => [
			'Fixez capteur sur volet et aimant sur le corps de la boîte.',
			'Testez la portée Zigbee (boîtier parfois métallique).',
			'Automatisation : notification à chaque ouverture en journée.',
		],
		recipes: {
			'wifi-sans-box': { main: () => 'aqara-door-p2', accessories: [] },
			'ha-zigbee': { main: () => 'aqara-door-p2', accessories: [z()] },
			'maker-esp32': {
				main: () => 'aqara-door-p2',
				accessories: [{ productId: 'rpi5-4gb', qty: 1 }, { productId: 'rpi5-psu', qty: 1 }, z()],
			},
		},
	}),
	clone(g0, {
		id: 'sonnette-carillon-photo',
		category: 'acces-garage',
		keywords: 'sonnette portier carillon filaire tapo c220 iegeek photo alerte',
		emoji: '🔔',
		title: 'Portier / sonnette connectée sur carillon filaire avec alerte photo',
		shortDesc: 'Module impulsion sur carillon + caméra Tapo C220 ou ieGeek.',
		tutorialHref: '/domotique/camera-surveillance-exterieure-solaire-iegeek/',
		tutorialLabel: 'Caméras & alertes (ieGeek / Tapo)',
		mainRole: 'Impulsion bouton + capture image à la sonnerie.',
		qtyLabel: 'Nombre d’accès (porte d’entrée)',
		meta: { difficulty: 3, time: '1 h', tools: 'Tournevis, testeur' },
		techOptions: [
			{ id: 'cam-tapo', label: 'Caméra intérieure Tapo C220' },
			{ id: 'cam-iegeek', label: 'Caméra extérieure ieGeek (porche)' },
		],
		wiring: ({ tech }) => [
			'Repérez les fils du bouton sonnette (contact sec ou faible tension).',
			'Shelly 1 Mini en impulsion — respectez la notice du carillon.',
			tech === 'cam-iegeek'
				? 'Caméra ieGeek : scène sonnerie → notification avec clip.'
				: 'Tapo C220 dans le hall : enregistrement à la sonnerie.',
		],
		recipes: {
			'wifi-sans-box': {
				main: () => 'shelly-1-mini-gen3',
				accessories: [
					{ productId: 'tapo-c220', qty: 1, when: ({ tech }) => tech === 'cam-tapo' },
					{ productId: 'iegeek-zs-gx4s', qty: 1, when: ({ tech }) => tech === 'cam-iegeek' },
					w(),
				],
			},
			'ha-zigbee': {
				main: () => 'shelly-1-mini-gen3',
				accessories: [
					{ productId: 'tapo-c220', qty: 1, when: ({ tech }) => tech === 'cam-tapo' },
					{ productId: 'iegeek-s7', qty: 1, when: ({ tech }) => tech === 'cam-iegeek' },
					z(),
					w(),
				],
			},
			'maker-esp32': {
				main: () => 'esp32-devkit',
				mainQty: () => 1,
				mainNote: () => 'ESP32 + relais sur bouton sonnette.',
				accessories: [{ productId: 'relay-3v3', qty: 1 }, { productId: 'tapo-c220', qty: 1 }, w()],
			},
		},
	}),
	clone(v0, {
		id: 'volets-roulants-filaires',
		category: 'volets-rideaux',
		keywords: 'volet roulant 4 fils shelly plus 2pm roller shutter calibration',
		emoji: '🪟',
		title: 'Contrôler volets roulants électriques filaires existants (4 fils)',
		shortDesc: 'Shelly Plus 2PM en mode Roller Shutter + calibration fins de course.',
		qtyLabel: 'Nombre de volets',
		techOptions: [{ id: 'motor-4wire', label: 'Moteur Montée / Descente / Neutre / Terre' }],
		wiring: () => [
			'Coupez le disjoncteur du circuit volets.',
			'Câblez le Shelly Plus 2PM selon le schéma shutter.',
			'Calibration automatique des butées haut/bas.',
		],
		recipes: {
			'wifi-sans-box': { main: () => 'shelly-plus-2pm', accessories: [w()] },
			'ha-zigbee': { main: () => 'shelly-plus-2pm', accessories: [z(), w()] },
			'maker-esp32': v0.recipes['maker-esp32'],
		},
	}),
	clone(v0, {
		id: 'store-banne-soleil-vent',
		category: 'volets-rideaux',
		keywords: 'store banne terrasse soleil vent météo shelly 2pm',
		emoji: '☀️',
		title: 'Automatiser un store banne selon le soleil et le vent',
		shortDesc: 'Shelly Plus 2PM + capteur météo / scénario vent.',
		qtyLabel: 'Nombre de stores banne',
		techOptions: [
			{ id: 'sun-only', label: 'Ensoleillement uniquement' },
			{ id: 'sun-wind', label: 'Ensoleillement + repli si vent fort' },
		],
		wiring: ({ tech }) => [
			'Coupez le disjoncteur du circuit store.',
			'Shelly Plus 2PM sur moteur banne (mode shutter ou relais).',
			tech === 'sun-wind'
				? 'Capteur météo Zigbee : seuil vent → rentrer le store.'
				: 'Scénario lever/coucher soleil dans Home Assistant.',
		],
		recipes: {
			'wifi-sans-box': {
				main: () => 'shelly-plus-2pm',
				accessories: [
					{ productId: 'weather-zigbee', qty: 1, when: ({ tech }) => tech === 'sun-wind' },
					w(),
				],
			},
			'ha-zigbee': {
				main: () => 'shelly-plus-2pm',
				accessories: [
					{ productId: 'weather-zigbee', qty: 1, when: ({ tech }) => tech === 'sun-wind' },
					z(),
					w(),
				],
			},
			'maker-esp32': { main: () => 'shelly-plus-2pm', accessories: [w(2)] },
		},
	}),
	clone(v0, {
		id: 'rideaux-switchbot',
		category: 'volets-rideaux',
		keywords: 'rideau tringle rail switchbot curtain 3 hub sans câblage',
		emoji: '🛋️',
		title: 'Motoriser des rideaux existants (tringle ou rail) sans travaux',
		shortDesc: 'SwitchBot Curtain 3 + SwitchBot Hub 2.',
		mainRole: 'Moteur sur tringle + hub pour scénarios.',
		qtyLabel: 'Nombre de rideaux',
		meta: { difficulty: 2, time: '30 min / rideau', tools: 'Tournevis, smartphone' },
		techOptions: [{ id: 'curtain-rail', label: 'Tringle ou rail standard' }],
		wiring: () => [
			'Fixez le Curtain 3 selon la notice SwitchBot.',
			'Calibrez course ouverte / fermée dans l’app.',
			'Hub 2 en Wi-Fi : Matter ou intégration Home Assistant.',
		],
		recipes: {
			'wifi-sans-box': {
				main: () => 'switchbot-curtain-3',
				accessories: [{ productId: 'switchbot-hub-2', qty: 1 }],
			},
			'ha-zigbee': {
				main: () => 'switchbot-curtain-3',
				accessories: [{ productId: 'switchbot-hub-2', qty: 1 }],
			},
			'maker-esp32': {
				main: () => 'switchbot-curtain-3',
				accessories: [{ productId: 'switchbot-hub-2', qty: 1 }],
			},
		},
	}),
	clone(e0, {
		id: 'eclairage-sans-neutre',
		category: 'eclairage',
		keywords: 'sans neutre sonoff zbmini shelly dimmer wago interrupteur',
		emoji: '💡',
		title: 'Connecter un interrupteur d’éclairage SANS fil neutre',
		shortDesc: 'Sonoff ZBMini-L2 Extreme ou Shelly Dimmer 2 + Wago 221.',
		techOptions: [
			{ id: 'zigbee-no-n', label: 'Sonoff ZBMini-L2 (Zigbee, sans neutre)' },
			{ id: 'wifi-dimmer', label: 'Shelly Dimmer 2 (Wi-Fi, bypass LED si besoin)' },
		],
		wiring: ({ tech }) => [
			'Coupez le disjoncteur — confirmez l’absence de neutre.',
			tech === 'wifi-dimmer'
				? 'Shelly Dimmer 2 + bypass si spots LED basse conso.'
				: 'Sonoff ZBMini-L2 selon schéma « no neutral ».',
			'Connexions Wago 221 pour un boîtier propre.',
		],
		recipes: {
			'wifi-sans-box': {
				main: ({ tech }) => (tech === 'wifi-dimmer' ? 'shelly-dimmer-2' : 'sonoff-zbmini-l2'),
				accessories: [w()],
			},
			'ha-zigbee': {
				main: ({ tech }) => (tech === 'wifi-dimmer' ? 'shelly-dimmer-2' : 'sonoff-zbmini-l2'),
				accessories: [z(), w()],
			},
			'maker-esp32': { main: () => 'shelly-dimmer-2', accessories: [w()] },
		},
	}),
	clone(e0, {
		id: 'va-et-vient-domotise',
		category: 'eclairage',
		keywords: 'va et vient couloir escalier shelly sonoff retour lampe',
		emoji: '🔀',
		title: 'Domotiser un va-et-vient (couloir / escalier) en gardant les boutons',
		shortDesc: 'Shelly 1 Mini ou Sonoff ZBMini-L2 derrière retour lampe.',
		techOptions: [
			{ id: 'at-light', label: 'Neutre au plafonnier / DCL' },
			{ id: 'at-switch', label: 'Module derrière interrupteur (avec neutre)' },
		],
		wiring: () => [
			'Coupez le disjoncteur — repérez navettes du va-et-vient.',
			'Module où neutre + phase sont accessibles (souvent au luminaire).',
			'Boutons muraux conservés selon mode du module.',
		],
		recipes: {
			'wifi-sans-box': { main: () => 'shelly-1-mini-gen3', accessories: [w()] },
			'ha-zigbee': { main: () => 'sonoff-zbmini-l2', accessories: [z(), w()] },
			'maker-esp32': { main: () => 'shelly-1-mini-gen3', accessories: [w()] },
		},
	}),
	clone(e0, {
		id: 'presence-couloir-wc',
		category: 'eclairage',
		keywords: 'présence couloir wc escalier aqara motion détecteur',
		emoji: '🚶',
		title: 'Allumer automatiquement couloir, WC, cellier ou escalier (présence)',
		shortDesc: 'Aqara Motion Sensor P2 + micromodule éclairage.',
		mainRole: 'Détecteur présence + commande lumière.',
		meta: { difficulty: 2, time: '45 min / zone', tools: 'Piles, tournevis' },
		techOptions: [{ id: 'motion-light', label: 'Détecteur + module éclairage' }],
		wiring: () => [
			'Placez le détecteur pour couvrir le passage.',
			'Mouvement → ON, délai sans mouvement → OFF.',
			'Réglage extinction 30 s à 5 min selon pièce.',
		],
		recipes: {
			'wifi-sans-box': {
				main: () => 'shelly-1-mini-gen3',
				accessories: [{ productId: 'aqara-motion-p2', qty: (m) => m }],
			},
			'ha-zigbee': {
				main: () => 'sonoff-zbmini-l2',
				accessories: [{ productId: 'aqara-motion-p2', qty: (m) => m }, z()],
			},
			'maker-esp32': {
				main: () => 'aqara-motion-p2',
				accessories: [
					{ productId: 'rpi5-4gb', qty: 1 },
					{ productId: 'rpi5-psu', qty: 1 },
					z(),
					{ productId: 'shelly-1-mini-gen3', qty: (m) => m },
				],
			},
		},
	}),
	clone(e0, {
		id: 'dimmer-spots-led',
		category: 'eclairage',
		keywords: 'dimmer variateur spots led salon chambre shelly dimmer 2',
		emoji: '🌙',
		title: 'Varier l’intensité de spots LED dimmables (salon / chambre)',
		shortDesc: 'Shelly Dimmer 2 avec calibration charge LED.',
		mainRole: 'Variateur compatible LED dimmable.',
		techOptions: [{ id: 'dimmable-led', label: 'Spots LED dimmables' }],
		wiring: () => [
			'Coupez le disjoncteur — ampoules « dimmable » obligatoires.',
			'Branchement phase / neutre / sortie lampe.',
			'Calibration charge dans l’app Shelly.',
		],
		recipes: {
			'wifi-sans-box': { main: () => 'shelly-dimmer-2', accessories: [w()] },
			'ha-zigbee': { main: () => 'shelly-dimmer-2', accessories: [w()] },
			'maker-esp32': { main: () => 'shelly-dimmer-2', accessories: [w()] },
		},
	}),
	clone(h0, {
		id: 'radiateurs-robinets',
		category: 'chauffage-vmc',
		keywords: 'radiateur eau robinet thermostatique aqara t1 sonde snzb',
		emoji: '🌡️',
		title: 'Piloter radiateurs à eau pièce par pièce (robinets thermostatiques)',
		shortDesc: 'Aqara Radiator Thermostat T1 + sonde SONOFF SNZB-02D.',
		techOptions: [{ id: 'radiator-water', label: 'Radiateurs à eau (vannes M30)' }],
	}),
	clone(h0, {
		id: 'chaudiere-contact-sec',
		category: 'chauffage-vmc',
		keywords: 'chaudière gaz granulés poêle thermostat contact sec shelly',
		emoji: '🔥',
		title: 'Commander chaudière gaz / granulés ou poêle via contact sec thermostat',
		shortDesc: 'Shelly 1 Mini Gen3 contact sec + sonde SONOFF SNZB-02D.',
		mainRole: 'Relais sur entrée thermostat chaudière.',
		meta: { difficulty: 4, time: '2 h', tools: 'Tournevis — électricien si doute' },
		techOptions: [{ id: 'dry-contact', label: 'Bornier contact sec chaudière (RT)' }],
		wiring: () => [
			'Coupez alimentation chaudière — lisez le schéma thermostat.',
			'Shelly en contact sec uniquement sur entrée RT.',
			'Sonde SNZB-02D : consigne dans Home Assistant.',
		],
		recipes: {
			'wifi-sans-box': {
				main: () => 'shelly-1-mini-gen3',
				accessories: [{ productId: 'sonoff-snzb-02d', qty: 1 }, w()],
			},
			'ha-zigbee': {
				main: () => 'shelly-1-mini-gen3',
				accessories: [{ productId: 'sonoff-snzb-02d', qty: 1 }, z(), w()],
			},
			'maker-esp32': {
				main: () => 'esp32-devkit',
				mainQty: () => 1,
				mainNote: () => 'ESP32 + relais + BME280 ou Zigbee.',
				accessories: [{ productId: 'relay-3v3', qty: 1 }, { productId: 'bme280-module', qty: 1 }, w()],
			},
		},
	}),
	clone(c0, {
		id: 'chauffe-eau-heures-creuses',
		category: 'chauffage-vmc',
		keywords: 'chauffe-eau ballon heures creuses solaire shelly 1pm contacteur',
		emoji: '🚿',
		title: 'Automatiser le ballon d’eau chaude (Heures Creuses ou surplus solaire)',
		shortDesc: 'Shelly Plus 1PM sur bobine contacteur jour/nuit + mesure conso.',
		mainRole: 'Commande contacteur HC + mesure puissance.',
		meta: { difficulty: 4, time: '2 h', tools: 'Gants, testeur' },
		techOptions: [
			{ id: 'hc-grid', label: 'Heures Creuses classiques' },
			{ id: 'solar-surplus', label: 'Surplus photovoltaïque' },
		],
		wiring: () => [
			'Coupure générale — bobine contacteur eau chaude.',
			'Shelly Plus 1PM selon schéma validé par électricien.',
			'Automatisation plages HC ou injection solaire.',
		],
		recipes: {
			'wifi-sans-box': { main: () => 'shelly-plus-1pm', accessories: [w()] },
			'ha-zigbee': { main: () => 'shelly-plus-1pm', accessories: [w()] },
			'maker-esp32': { main: () => 'shelly-plus-1pm', accessories: [w()] },
		},
	}),
	clone(h0, {
		id: 'vmc-humidite-sdb',
		category: 'chauffage-vmc',
		keywords: 'vmc salle de bain humidité 70 extracteur shelly sonoff',
		emoji: '💨',
		title: 'Déclencher VMC ou extracteur SdB quand humidité dépasse 70 %',
		shortDesc: 'SONOFF SNZB-02D + relais Shelly Plus 1PM.',
		mainRole: 'Hygrométrie + relais extracteur.',
		qtyLabel: 'Nombre de salles de bain',
		techOptions: [{ id: 'extract-standalone', label: 'Extracteur ou VMC commandée' }],
		wiring: () => [
			'Sonde à hauteur, loin du jet de douche direct.',
			'Relais sur circuit extracteur.',
			'Seuil 70 % ON, 55 % OFF avec anti-rebond.',
		],
		recipes: {
			'wifi-sans-box': {
				main: () => 'shelly-plus-1pm',
				accessories: [{ productId: 'sonoff-snzb-02d', qty: (m) => m }, w()],
			},
			'ha-zigbee': {
				main: () => 'shelly-plus-1pm',
				accessories: [{ productId: 'sonoff-snzb-02d', qty: (m) => m }, z(), w()],
			},
			'maker-esp32': {
				main: () => 'sonoff-snzb-02d',
				accessories: [{ productId: 'shelly-plus-1pm', qty: (m) => m }, w()],
			},
		},
	}),
	clone(c0, {
		id: 'conso-tableau-solaire',
		category: 'energie-conso',
		keywords: 'consommation tableau shelly pro 3em pinces solaire production',
		emoji: '⚡',
		title: 'Suivre la consommation globale au tableau (et production solaire)',
		shortDesc: 'Shelly Pro 3EM avec pinces ampèremétriques sur rail DIN.',
		mainRole: 'Mesure globale + suivi injection.',
		techOptions: [
			{ id: 'din-global', label: 'Compteur rail DIN arrivée générale' },
			{ id: 'tri', label: 'Triphasé (3 pinces)' },
		],
		wiring: () => [
			'Coupure générale — clipsez le 3EM sur rail DIN.',
			'Pinces sur câbles d’arrivée (sens respecté).',
			'Courbes conso + production dans Home Assistant.',
		],
		recipes: {
			'wifi-sans-box': { main: () => 'shelly-pro-3em', accessories: [w()] },
			'ha-zigbee': { main: () => 'shelly-pro-3em', accessories: [w()] },
			'maker-esp32': { main: () => 'shelly-pro-3em', accessories: [w()] },
		},
	}),
	clone(c0, {
		id: 'alerte-lave-linge',
		category: 'energie-conso',
		keywords: 'lave-linge sèche-linge fin cycle alerte shelly plug tapo p110',
		emoji: '🧺',
		title: 'Alerte smartphone quand lave-linge ou sèche-linge a terminé',
		shortDesc: 'Shelly Plug S Gen3 ou Tapo P110 — chute sous 3 W = fin de cycle.',
		mainRole: 'Prise mesure de puissance.',
		qtyLabel: 'Nombre d’appareils',
		meta: { difficulty: 2, time: '15 min', tools: 'Aucun' },
		techOptions: [
			{ id: 'shelly-plug', label: 'Shelly Plug S Gen3' },
			{ id: 'tapo-plug', label: 'Tapo P110' },
		],
		wiring: () => [
			'Prise entre mur et appareil (respectez Imax).',
			'Relevez la puissance pendant un cycle.',
			'Puissance < 3 W pendant 2 min → notification.',
		],
		recipes: {
			'wifi-sans-box': {
				main: ({ tech }) => (tech === 'tapo-plug' ? 'tapo-p110' : 'shelly-plug-s-gen3'),
			},
			'ha-zigbee': {
				main: ({ tech }) => (tech === 'tapo-plug' ? 'tapo-p110' : 'shelly-plug-s-gen3'),
			},
			'maker-esp32': { main: () => 'shelly-plug-s-gen3' },
		},
	}),
	clone(c0, {
		id: 'coupure-veilles',
		category: 'energie-conso',
		keywords: 'veille tv console bureau nuit absence tapo shelly plug lot',
		emoji: '🔌',
		title: 'Couper automatiquement les veilles (TV, console, bureau) la nuit',
		shortDesc: 'Pack Tapo P110 (lot de 4) ou Shelly Plug S Gen3.',
		mainRole: 'Coupure programmée ou mode absence.',
		techOptions: [
			{ id: 'pack-tapo', label: 'Lot Tapo P110 (4 prises)' },
			{ id: 'shelly-multi', label: 'Shelly Plug S (une par poste)' },
		],
		wiring: () => [
			'Branchez TV / box / console (pas le frigo).',
			'Scénario 23h–7h ou géolocalisation.',
			'Vérifiez compatibilité coupure totale.',
		],
		recipes: {
			'wifi-sans-box': {
				main: ({ tech }) => (tech === 'pack-tapo' ? 'tapo-p110' : 'shelly-plug-s-gen3'),
				mainQty: (m) => (m > 2 ? 1 : m),
			},
			'ha-zigbee': {
				main: ({ tech }) => (tech === 'pack-tapo' ? 'tapo-p110' : 'shelly-plug-s-gen3'),
			},
			'maker-esp32': { main: () => 'shelly-plug-s-gen3', mainQty: (m) => Math.min(m, 4) },
		},
	}),
	clone(c0, {
		id: 'secours-ups-box',
		category: 'energie-conso',
		keywords: 'ups onduleur allpowers home assistant green raspberry coupure',
		emoji: '🔋',
		title: 'Protéger box Internet et box domotique contre les coupures (UPS)',
		shortDesc: 'Station ALLPOWERS ou onduleur USB NUT + HA Green / Raspberry Pi 5.',
		tutorialHref: '/domotique/secours-electrique-home-assistant-onduleur-station/',
		tutorialLabel: 'Secours électrique Home Assistant',
		mainRole: 'Alimentation secourue box + serveur.',
		meta: { difficulty: 3, time: '1 h 30', tools: 'Ethernet, test coupure' },
		techOptions: [
			{ id: 'station-ups', label: 'Station ALLPOWERS (UPS)' },
			{ id: 'nut-ups', label: 'Onduleur USB (NUT)' },
		],
		wiring: ({ tech }) => [
			'Secourez box fibre, switch et serveur HA uniquement.',
			tech === 'station-ups'
				? 'Vérifiez temps de bascule UPS sur fiche ALLPOWERS.'
				: 'USB vers Pi/Green + add-on NUT.',
			'Test : débranchez la prise murale 30 min.',
		],
		recipes: {
			'wifi-sans-box': {
				main: ({ tech }) => (tech === 'station-ups' ? 'allpowers-ups' : 'ups-usb-nut'),
				accessories: [{ productId: 'ha-green', qty: 1 }],
			},
			'ha-zigbee': {
				main: ({ tech }) => (tech === 'station-ups' ? 'allpowers-ups' : 'ups-usb-nut'),
				accessories: [{ productId: 'ha-green', qty: 1 }, z()],
			},
			'maker-esp32': {
				main: () => 'ups-usb-nut',
				accessories: [{ productId: 'rpi5-4gb', qty: 1 }, { productId: 'rpi5-psu', qty: 1 }],
			},
		},
	}),
	clone(t0, {
		id: 'alerte-congelateur-cave',
		category: 'securite-box',
		keywords: 'congélateur cave vin serre bébé température sonoff bme280 alerte',
		emoji: '❄️',
		title: 'Alerte panne congélateur ou suivi T°/hygro cave, serre, chambre bébé',
		shortDesc: 'SONOFF SNZB-02D ou BME280 + alerte seuil.',
		techOptions: [
			{ id: 'indoor-room', label: 'SONOFF SNZB-02D (Zigbee)' },
			{ id: 'cold-storage', label: 'Congélateur / cave (longue autonomie)' },
		],
	}),
	clone(s0, {
		id: 'camera-solaire-exterieure',
		category: 'securite-box',
		keywords: 'caméra solaire jardin allée iegeek zs-gx4s s7 sans fil',
		emoji: '🛡️',
		title: 'Surveillance extérieure sans fil ni prise (jardin, allée, abri)',
		shortDesc: 'Caméra solaire ieGeek ZS-GX4S ou S7 avec panneau.',
		mainRole: 'Caméra autonome batterie + solaire.',
		techOptions: [
			{ id: 'motion-outdoor', label: 'ieGeek ZS-GX4S (détection)' },
			{ id: 'doors-windows', label: 'ieGeek S7 (24/7 AOV)' },
		],
		wiring: ({ tech }) => [
			'Panneau solaire bien exposé.',
			'Test Wi-Fi 2,4 GHz sur place.',
			tech === 'doors-windows' ? 'S7 pour allée avec passage continu.' : 'ZS-GX4S : bon compromis autonomie.',
		],
		recipes: {
			'wifi-sans-box': {
				main: ({ tech }) => (tech === 'doors-windows' ? 'iegeek-s7' : 'iegeek-zs-gx4s'),
			},
			'ha-zigbee': {
				main: ({ tech }) => (tech === 'doors-windows' ? 'iegeek-s7' : 'iegeek-zs-gx4s'),
			},
			'maker-esp32': { main: () => 'iegeek-zs-gx4s' },
		},
	}),
	clone(b0, {
		id: 'box-home-assistant-locale',
		category: 'securite-box',
		keywords: 'home assistant green raspberry pi 5 zigbee dongle zbt-2 sans abonnement',
		emoji: '🤖',
		title: 'Créer sa box domotique locale complète sans abonnement (Home Assistant)',
		shortDesc: 'Home Assistant Green ou Raspberry Pi 5 + SONOFF ZBDongle-E / ZBT-2.',
		techOptions: [
			{ id: 'plug-play-green', label: 'Home Assistant Green' },
			{ id: 'diy-pi5', label: 'Raspberry Pi 5 + dongle' },
			{ id: 'zbt2', label: 'Dongle officiel ZBT-2' },
		],
		recipes: {
			'wifi-sans-box': b0.recipes['wifi-sans-box'],
			'ha-zigbee': {
				main: ({ tech }) => (tech === 'diy-pi5' ? 'rpi5-4gb' : 'ha-green'),
				mainQty: () => 1,
				accessories: [
					{ productId: 'zbdongle-e', qty: 1, when: ({ tech }) => tech !== 'zbt2' },
					{ productId: 'ha-connect-zbt2', qty: 1, when: ({ tech }) => tech === 'zbt2' },
					{ productId: 'rpi5-psu', qty: 1, when: ({ tech }) => tech === 'diy-pi5' },
					{ productId: 'sonoff-snzb-02d', qty: 1, note: 'Premier capteur de test.' },
				],
			},
			'maker-esp32': b0.recipes['maker-esp32'],
		},
	}),
];

if (cases.length !== 22) {
	throw new Error(`Expected 22 cases, got ${cases.length}`);
}

function serialise(value, depth = 0) {
	const pad = '\t'.repeat(depth);
	const padIn = '\t'.repeat(depth + 1);
	if (typeof value === 'function') {
		return value.toString();
	}
	if (Array.isArray(value)) {
		if (value.length === 0) return '[]';
		return (
			'[\n' +
			value.map((v) => padIn + serialise(v, depth + 1)).join(',\n') +
			'\n' +
			pad +
			']'
		);
	}
	if (value && typeof value === 'object') {
		const entries = Object.entries(value);
		const keyStr = (k) => /^[a-zA-Z_$][\w$]*$/.test(k) ? k : JSON.stringify(k);
		return (
			'{\n' +
			entries.map(([k, v]) => padIn + keyStr(k) + ': ' + serialise(v, depth + 1)).join(',\n') +
			'\n' +
			pad +
			'}'
		);
	}
	return JSON.stringify(value);
}

const out = `// 22 cas d'usage — généré par scripts/expand-use-cases.mjs\nexport const USE_CASES = [\n${cases
	.map((c) => pad(serialise(c, 1)))
	.join(',\n')}\n];\n`;

function pad(block) {
	return block
		.split('\n')
		.map((line) => '\t' + line)
		.join('\n');
}

writeFileSync(new URL('../src/data/smartHomeUseCases.mjs', import.meta.url), out);
console.log('Wrote', cases.length, 'use cases to smartHomeUseCases.mjs');
