import { esphomeHeader } from '../shared.mjs';
import { amazonSearchUrl } from '../../../lib/amazonAffiliate.mjs';

const SENSOR = {
	fr: 'JSN-SR04T (sonde)',
	en: 'JSN-SR04T (probe)',
	de: 'JSN-SR04T (Sonde)',
	it: 'JSN-SR04T (sonda)',
	es: 'JSN-SR04T (sonda)',
};
const DIVIDER = {
	fr: 'Diviseur 1 kΩ / 2 kΩ',
	en: '1 kΩ / 2 kΩ divider',
	de: 'Teiler 1 kΩ / 2 kΩ',
	it: 'Divisore 1 kΩ / 2 kΩ',
	es: 'Divisor 1 kΩ / 2 kΩ',
};

const yaml =
	esphomeHeader('niveau-sel-adoucisseur', 'Softener salt level') +
	`
# Ultrasonic JSN-SR04T (waterproof probe). Keep the driver board dry outside the salt bin.
# Echo is 5 V when the module is powered at 5 V: use a 1 kΩ / 2 kΩ divider into GPIO18.
# CHANGE the empty_m / full_m values after calibration on YOUR softener.

sensor:
  - platform: ultrasonic
    trigger_pin: GPIO5
    echo_pin: GPIO18
    name: "Salt distance"
    id: salt_distance
    update_interval: 60s
    pulse_time: 10us
    timeout: 2.0m
    unit_of_measurement: "m"
    accuracy_decimals: 3
    filters:
      - median:
          window_size: 5
          send_every: 1
      - clamp:
          min_value: 0.20          # JSN-SR04T blind zone ~20 cm
          max_value: 1.20

  - platform: template
    name: "Salt level percent"
    id: salt_percent
    unit_of_measurement: "%"
    device_class: battery
    accuracy_decimals: 0
    update_interval: 60s
    lambda: |-
      // CHANGE after measuring your tank with salt empty then full
      const float empty_m = 0.55;  // sensor-to-salt when nearly empty
      const float full_m  = 0.25;  // sensor-to-salt when full (stay above blind zone)
      float d = id(salt_distance).state;
      if (isnan(d) || empty_m <= full_m) return {};
      float pct = (empty_m - d) / (empty_m - full_m) * 100.0f;
      if (pct < 0.0f) pct = 0.0f;
      if (pct > 100.0f) pct = 100.0f;
      return pct;

  - platform: wifi_signal
    name: "WiFi signal"
    update_interval: 120s
    entity_category: diagnostic

text_sensor:
  - platform: template
    name: "Salt state"
    id: salt_state
    icon: mdi:water-percent
    update_interval: 60s
    lambda: |-
      float p = id(salt_percent).state;
      if (isnan(p)) return {"unknown"};
      if (p >= 66.0f) return {"full"};       // plein
      if (p >= 33.0f) return {"half"};       // à moitié
      return {"refill"};                     // à recharger

binary_sensor:
  - platform: template
    name: "Salt needs refill"
    device_class: problem
    lambda: |-
      return id(salt_state).state == "refill";
`;

const haYamlFr = `alias: Adoucisseur — commander du sel
description: Alerte téléphone quand le bac à sel est à recharger
triggers:
  - trigger: state
    entity_id:
      - binary_sensor.niveau_sel_adoucisseur_salt_needs_refill
    from: "off"
    to: "on"
    for:
      hours: 0
      minutes: 15
      seconds: 0
conditions: []
actions:
  - action: notify.mobile_app_VOTRE_TELEPHONE
    data:
      title: Adoucisseur d'eau
      message: "Le bac à sel est bas. Pensez à racheter des pastilles et à remplir le bac."
mode: single`;

const haYamlEn = `alias: Softener — order salt
description: Phone alert when the salt bin needs a refill
triggers:
  - trigger: state
    entity_id:
      - binary_sensor.niveau_sel_adoucisseur_salt_needs_refill
    from: "off"
    to: "on"
    for:
      hours: 0
      minutes: 15
      seconds: 0
conditions: []
actions:
  - action: notify.mobile_app_YOUR_PHONE
    data:
      title: Water softener
      message: "Salt is low. Buy salt pellets and refill the bin."
mode: single`;

const haYamlDe = `alias: Enthärter — Salz nachbestellen
description: Handy-Benachrichtigung, wenn der Salzbehälter nachgefüllt werden muss
triggers:
  - trigger: state
    entity_id:
      - binary_sensor.niveau_sel_adoucisseur_salt_needs_refill
    from: "off"
    to: "on"
    for:
      hours: 0
      minutes: 15
      seconds: 0
conditions: []
actions:
  - action: notify.mobile_app_IHR_TELEFON
    data:
      title: Wasserenthärter
      message: "Salzstand niedrig. Salztabletten kaufen und den Behälter füllen."
mode: single`;

const haYamlIt = `alias: Addolcitore — ordinare il sale
description: Avviso sul telefono quando il bacino del sale va rifornito
triggers:
  - trigger: state
    entity_id:
      - binary_sensor.niveau_sel_adoucisseur_salt_needs_refill
    from: "off"
    to: "on"
    for:
      hours: 0
      minutes: 15
      seconds: 0
conditions: []
actions:
  - action: notify.mobile_app_IL_TUO_TELEFONO
    data:
      title: Addolcitore d'acqua
      message: "Il sale è basso. Compra pastiglie di sale e riempi il bacino."
mode: single`;

const haYamlEs = `alias: Descalcificador — pedir sal
description: Aviso al teléfono cuando el depósito de sal necesita recarga
triggers:
  - trigger: state
    entity_id:
      - binary_sensor.niveau_sel_adoucisseur_salt_needs_refill
    from: "off"
    to: "on"
    for:
      hours: 0
      minutes: 15
      seconds: 0
conditions: []
actions:
  - action: notify.mobile_app_TU_TELEFONO
    data:
      title: Descalcificador
      message: "La sal está baja. Compra pastillas de sal y rellena el depósito."
mode: single`;

function amz(lang, query) {
	return amazonSearchUrl(lang, query);
}

export const project = {
	id: 'softener-salt-level',
	level: 'intermediate',
	durationHours: '2–4',
	budgetRange: {
		fr: '0 € (sans électronique) à environ 25–90 € selon la solution',
		en: '€0 (no electronics) to about €25–90 depending on the approach',
		de: '0 € (ohne Elektronik) bis ca. 25–90 € je nach Lösung',
		it: '0 € (senza elettronica) fino a circa 25–90 € a seconda della soluzione',
		es: '0 € (sin electrónica) hasta unos 25–90 € según la solución',
	},
	slugs: {
		fr: 'niveau-sel-adoucisseur-capteur-connecte',
		en: 'water-softener-salt-level-sensor',
		de: 'enthaerter-salzstand-sensor',
		it: 'livello-sale-addolcitore-sensore',
		es: 'nivel-sal-descalcificador-sensor',
	},
	fullGuide: null,
	productIds: ['esp32-c6-devkitc'],
	searchQueries: {
		fr: 'JSN-SR04T capteur ultrason étanche',
		en: 'JSN-SR04T waterproof ultrasonic sensor',
		de: 'JSN-SR04T wasserdichter Ultraschallsensor',
		it: 'JSN-SR04T sensore ultrasonico impermeabile',
		es: 'JSN-SR04T sensor ultrasónico impermeable',
	},
	smallMaterialIds: ['usb', 'psu', 'dupont', 'resistors', 'heatshrink', 'enclosure'],
	flashAfter: 2,
	wiring: {
		sensorName: SENSOR,
		pins: [
			{ gpio: '5V / VIN', signal: 'VCC', color: 'power', device: SENSOR },
			{ gpio: 'GND', signal: 'GND', color: 'ground', device: SENSOR },
			{ gpio: 'GPIO5', signal: 'TRIG', color: 'aux', device: SENSOR },
			{ gpio: 'GPIO18', signal: 'ECHO (via 1k/2k)', color: 'data', device: SENSOR },
			{ gpio: '1 kΩ + 2 kΩ', signal: 'divider on ECHO', color: 'data', device: DIVIDER },
		],
		principleBoxes: {
			fr: [
				{ title: 'Bac à sel', s: 'Pastilles de sel', a: 'Le niveau baisse sans qu’on le voie', b: 'Mesure sans contact depuis le couvercle' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Lit la distance (ultrason ou ToF)', b: 'Calcule % et état plein / moitié / à recharger', via: 'TRIG GPIO5, ECHO GPIO18' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Affiche le niveau et l’état', b: 'Notification pour racheter du sel', via: 'Wi-Fi 2,4 GHz + API chiffrée' },
			],
			en: [
				{ title: 'Salt bin', s: 'Salt pellets', a: 'Level drops out of sight', b: 'Contactless reading from under the lid' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Reads distance (ultrasonic or ToF)', b: 'Computes % and full / half / refill', via: 'TRIG GPIO5, ECHO GPIO18' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Shows level and state', b: 'Notification to reorder salt', via: '2.4 GHz Wi-Fi + encrypted API' },
			],
			de: [
				{ title: 'Salzbehälter', s: 'Salztabletten', a: 'Stand sinkt unsichtbar', b: 'Kontaktlose Messung unter dem Deckel' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Misst Distanz (Ultraschall oder ToF)', b: 'Berechnet % und voll / halb / nachfüllen', via: 'TRIG GPIO5, ECHO GPIO18' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Zeigt Stand und Zustand', b: 'Benachrichtigung zum Nachbestellen', via: '2,4-GHz-WLAN + verschlüsselte API' },
			],
			it: [
				{ title: 'Bacino sale', s: 'Pastiglie di sale', a: 'Il livello scende senza vedersi', b: 'Misura senza contatto sotto il coperchio' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Legge la distanza (ultrasonico o ToF)', b: 'Calcola % e pieno / metà / da riempire', via: 'TRIG GPIO5, ECHO GPIO18' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Mostra livello e stato', b: 'Notifica per riordinare il sale', via: 'Wi-Fi 2,4 GHz + API cifrata' },
			],
			es: [
				{ title: 'Depósito de sal', s: 'Pastillas de sal', a: 'El nivel baja sin verse', b: 'Medida sin contacto bajo la tapa' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Lee la distancia (ultrasonidos o ToF)', b: 'Calcula % y lleno / mitad / recargar', via: 'TRIG GPIO5, ECHO GPIO18' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Muestra nivel y estado', b: 'Aviso para pedir sal', via: 'Wi-Fi 2,4 GHz + API cifrada' },
			],
		},
	},
	yaml,
	locales: {
		fr: {
			title: 'Niveau de sel adoucisseur : capteur connecté',
			description:
				'Surveiller le sel de l’adoucisseur : jauge visuelle, capteur Zigbee/Wi-Fi, pesée ou ESP32 + JSN-SR04T/ToF, ESPHome, alerte Home Assistant.',
			h1: 'Niveau de sel de l’adoucisseur',
			objective:
				'Vous allez savoir si le bac à sel de votre adoucisseur d’eau est plein, à moitié ou à recharger, sans devoir ouvrir le couvercle à chaque fois. Quatre approches sont présentées, de la plus simple (repère visuel et rappel calendrier) à un montage ESP32 — une petite carte électronique équipée du Wi-Fi — avec un capteur de distance, le logiciel ESPHome qui prépare son programme, et Home Assistant, le logiciel libre qui réunit vos appareils connectés, pour une alerte sur le téléphone.',
			usefulness:
				'Sur beaucoup d’adoucisseurs, le couvercle opaque cache complètement le niveau de sel : on ne découvre le bac vide qu’en l’ouvrant. C’est le cas de l’installation de l’auteur (Emmanuel Sauvage) : le bac était presque vide, et cela ne se voyait qu’après ouverture. Un niveau approximatif (plein / moitié / à recharger) suffit pour racheter des pastilles à temps et éviter que l’eau redevienne dure.',
			takeaway:
				'Commencez par un repère visuel et un rappel calendrier si vous consommez peu de sel. Passez à un capteur Zigbee ou Wi-Fi du commerce si vous voulez une alerte sans souder. Réservez l’ESP32 + ultrason étanche (ou ToF) si vous voulez un pourcentage dans Home Assistant, en protégeant toute l’électronique hors du bac humide et salé.',
			goodToKnow:
				'Le sel et l’humidité corrodent vite l’électronique : la sonde peut regarder les pastilles, mais la carte de commande, l’alimentation et l’ESP32 restent hors du bac, dans un boîtier sec. Un HC-SR04 « nu » n’est pas adapté à ce milieu ; préférez un JSN-SR04T (sonde étanche) ou un ToF VL53L0X/VL53L1X sous le couvercle.',
			prerequisites: [
				'Un adoucisseur d’eau avec un bac à pastilles de sel accessible en ouvrant le couvercle.',
				'Pour les solutions connectées : un Home Assistant déjà en service, et pour le Zigbee un coordinateur (clé USB ou box compatible).',
				'Pour le montage ESP32 : ESPHome installé, un réseau Wi-Fi 2,4 GHz à portée de l’adoucisseur, et une prise pour l’alimentation USB 5 V.',
			],
			safety:
				'Ne touchez jamais au 230 V ni aux canalisations sous pression. Coupez l’alimentation de la vanne de commande avant d’ouvrir le couvercle si la notice le demande. Le sel et la saumure sont corrosifs : gants recommandés, rincez les outils, et n’immergez jamais la carte électronique. Ce guide ne remplace pas la notice de votre adoucisseur.',
			photos: [
				{
					src: '/images/domotique/adoucisseur/adoucisseur-1-couvercle.webp',
					alt: 'Adoucisseur d’eau fermé, couvercle bleu avec fenêtre : le niveau de sel n’est pas visible',
					caption: 'Couvercle fermé : sans ouvrir, impossible de voir s’il reste des pastilles.',
				},
				{
					src: '/images/domotique/adoucisseur/adoucisseur-2-ouvert.webp',
					alt: 'Adoucisseur ouvert : vanne avec écran, bouteille de résine bleue et puits à saumure avec pastilles',
					caption: 'Couvercle ouvert : vanne à écran, bouteille de résine bleue, puits à saumure (tube) et pastilles. C’est ici qu’il faut placer le capteur au-dessus du sel.',
				},
				{
					src: '/images/domotique/adoucisseur/adoucisseur-3-bac-vide.webp',
					alt: 'Vue de dessus du bac à sel presque vide',
					caption: 'Bac presque vide sur l’installation de l’auteur : situation réelle qui motive ce guide (pas d’autre essai inventé).',
				},
			],
			placement: {
				title: 'Où placer le capteur',
				intro:
					'Le capteur se fixe sous le couvercle, au-dessus du bac à pastilles, en visant la surface du sel. Il doit éviter la vanne de commande (écran), la bouteille de résine bleue et le puits à saumure (tube vertical). L’ESP32, l’alimentation USB et la carte électronique du module ultrason restent hors de la zone humide, reliés par un câble.',
				image: '/images/domotique/adoucisseur/placement-capteur.svg',
				alt: 'Schéma de placement : capteur au-dessus des pastilles, électronique hors du bac',
				caption: 'Repère de placement (vue de dessus simplifiée), à croiser avec la photo du bac ouvert.',
			},
			alternatives: [
				{
					title: 'A — Sans électronique : jauge visuelle et rappel calendrier',
					difficulty: 'Débutant',
					budget: '0 €',
					body: 'Ouvrez le couvercle, collez un repère (crayon indélébile ou réglette plastique) à trois hauteurs : plein, moitié, à recharger. Notez combien de kilos de pastilles vous ajoutez et, sur quelques semaines, estimez votre rythme (selon dureté de l’eau et consommation). Créez un rappel calendrier dans le téléphone ou une automatisation Home Assistant purement temporelle (« tous les X jours, vérifier le sel »).',
					install: 'Aucun câblage. Vérifiez le niveau à chaque rappel et ajustez l’intervalle après deux ou trois cycles de remplissage.',
					alert: 'Rappel calendrier ou notification Home Assistant sur timer — pas de mesure automatique.',
					linkLabel: null,
					linkHref: null,
				},
				{
					title: 'B — Capteur du commerce Zigbee ou Wi-Fi (niveau de cuve)',
					difficulty: 'Débutant à intermédiaire',
					budget: 'environ 40–90 € selon modèle et coordinateur (à vérifier chez le vendeur)',
					body: 'Des capteurs ultrasoniques de niveau de cuve existent vraiment, par exemple le Tuya / EPTTECH TLC2206 (variante Zigbee TLC2206-ZB, reconnue par Zigbee2MQTT comme capteur de niveau avec pourcentage). Ils mesurent la distance à la surface et exposent un pourcentage. Attention : ils sont conçus pour des liquides en cuve ; sur des pastilles de sel la surface est irrégulière, donc le résultat reste approximatif (plein / moitié / bas). Une autre piste simple, documentée par des utilisateurs Home Assistant : un détecteur de fuite Zigbee filaire posé au fond — il signale seulement « trop bas » quand l’eau/saumure atteint la sonde, pas un vrai pourcentage.',
					install: 'Fixez la tête sous le couvercle au-dessus du sel, configurez la hauteur d’installation dans l’app ou Zigbee2MQTT, appairage au coordinateur, puis automatisation d’alerte dans Home Assistant.',
					alert: 'Seuil bas → notification mobile (entité liquid_level_percent ou liquid_state).',
					linkLabel: 'Rechercher un capteur de niveau Zigbee / ultrason cuve',
					linkHref: amz('fr', 'capteur niveau cuve ultrason Zigbee Tuya TLC2206'),
				},
				{
					title: 'C — Balance / pesée',
					difficulty: 'Intermédiaire',
					budget: 'variable ; souvent peu pratique sous un adoucisseur',
					body: 'Peser le bac ou les sacs de sel peut sembler logique, mais un adoucisseur posé au sol, branché aux canalisations, se prête mal à une balance continue : le poids du bac, de l’eau de saumure et de la résine fausse la mesure, et l’environnement humide/salé endommage les capteurs de charge (type HX711). Une balance de cuisine pour peser les sacs au remplissage reste utile pour tenir un carnet de consommation, pas pour une alerte automatique fiable.',
					install: 'Non recommandé comme surveillance permanente sous le bac. Limitez la pesée au moment où vous ajoutez des pastilles, pour estimer votre rythme.',
					alert: 'Pas d’alerte automatique fiable dans ce contexte.',
					linkLabel: null,
					linkHref: null,
				},
				{
					title: 'D — ESP32 + ultrason étanche JSN-SR04T (ou ToF) + ESPHome',
					difficulty: 'Intermédiaire',
					budget: 'environ 25–55 € selon vendeur (ESP32 + sonde + boîtier)',
					body: 'Un ESP32 mesure la distance jusqu’aux pastilles avec un JSN-SR04T (sonde ultrason étanche sur câble ; la carte électronique du module n’est pas étanche) ou, en alternative, un ToF VL53L0X / VL53L1X (Time of Flight : mesure de distance par lumière, portée plus courte, souvent plus adapté aux petits bacs). ESPHome convertit la distance en pourcentage et en état plein / moitié / à recharger. Un HC-SR04 classique n’a pas de sonde étanche : il corrode rapidement dans ce milieu.',
					install: 'Suivez le montage détaillé ci-dessous : câblage, flash, calibrage empty_m / full_m, puis automatisation Home Assistant.',
					alert: 'binary_sensor « Salt needs refill » → notification (YAML fourni).',
					linkLabel: 'Rechercher JSN-SR04T',
					linkHref: amz('fr', 'JSN-SR04T capteur ultrason étanche'),
				},
			],
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Carte de commande Wi-Fi (voir l’encadré).', productId: 'esp32-c6-devkitc' },
				{
					name: 'JSN-SR04T (sonde ultrason étanche)',
					qty: 1,
					note: 'Sonde sur câble pour viser le sel ; carte du module hors du bac. Alternative : module ToF VL53L0X ou VL53L1X sous le couvercle.',
					q: true,
					searchQuery: 'JSN-SR04T capteur ultrason étanche',
				},
				{
					name: 'Résistances 1 kΩ et 2 kΩ',
					qty: '1 de chaque',
					note: 'Diviseur de tension sur Echo (5 V → ~3,3 V) avant GPIO18.',
					searchQuery: 'résistance 1/4W assortiment',
				},
				{
					name: 'Boîtier plastique + presse-étoupe',
					qty: 1,
					note: 'Protège l’ESP32 et la carte du module hors zone humide ; vernis de tropicalisation optionnel sur les soudures.',
					searchQuery: 'boîtier électronique étanche presse étoupe',
				},
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Repérer la zone de mesure dans le bac',
					actions: [
						'Ouvrez le couvercle et photographiez ou notez : vanne de commande, bouteille de résine, puits à saumure, surface des pastilles.',
						'Choisissez un point sous le couvercle qui vise uniquement les pastilles, sans obstacle.',
						'Mesurez à la règle la distance approximate « capteur → sel plein » et « capteur → fond / sel vide » : ce seront empty_m et full_m.',
					],
					observe: 'La photo du bac ouvert et le schéma de placement correspondent à votre installation.',
					check: 'Aucun objet (tube, résine) ne coupe le faisceau prévu.',
				},
				{
					title: 'Câbler le JSN-SR04T avec protection 3,3 V',
					actions: [
						'Alimentation USB débranchée. Reliez VCC du module à 5V/VIN de l’ESP32, GND à GND, TRIG à GPIO5.',
						'Sur Echo : série 1 kΩ vers GPIO18, et 2 kΩ entre GPIO18 et GND (diviseur). Ne branchez jamais Echo 5 V directement sur une broche GPIO de l’ESP32.',
						'Placez uniquement la sonde métallique/étanche sous le couvercle ; la carte du module et l’ESP32 restent dans le boîtier sec à l’extérieur.',
					],
					observe: 'Le câble de la sonde sort du bac sans coincer le couvercle.',
					check: 'Continuity et polarité vérifiées ; aucun fil dénudé dans le sel.',
				},
				{
					title: 'Calibrer empty_m / full_m et les états',
					actions: [
						'Après le flash, lisez « Salt distance » bac presque vide, puis après un remplissage (ou avec un carton à la hauteur plein).',
						'Modifiez empty_m et full_m dans le YAML, validez, puis mettez à jour en OTA (mise à jour sans câble).',
						'Vérifiez que « Salt state » affiche full, half ou refill de façon stable pendant quelques minutes.',
					],
					observe: 'Le pourcentage monte quand vous ajoutez des pastilles.',
					check: 'L’entité « Salt needs refill » passe à ON sous le seuil 33 %.',
				},
			],
			haIntegration: [
				'Les entités « Salt level percent », « Salt state » et « Salt needs refill » apparaissent sous Appareils ESPHome.',
				'Ajoutez une jauge ou une carte entité sur le tableau de bord pour voir le niveau d’un coup d’œil.',
				'Utilisez l’automatisation ci-dessous (remplacez notify.mobile_app_VOTRE_TELEPHONE) pour être alerté et penser à racheter des pastilles.',
			],
			haAutomationYaml: haYamlFr,
			troubleshooting: [
				{ problem: 'Distance figée ou aberrante', solution: 'Sonde mal orientée, zone morte (< 20 cm), ou Echo sans diviseur. Reculez le capteur, vérifiez le câblage 1 kΩ/2 kΩ, augmentez le median.' },
				{ problem: 'Pourcentage qui saute', solution: 'Surface de pastilles irrégulière : normal. Gardez les états plein/moitié/recharger ; allongez l’update_interval à 120 s.' },
				{ problem: 'Corrosion rapide', solution: 'La carte du module ou l’ESP32 était dans le bac. Sortez toute l’électronique ; ne laissez que la sonde étanche ; boîtier + presse-étoupe.' },
				{ problem: 'Pas de notification', solution: 'Vérifiez l’entity_id réelle dans Paramètres → Entités, et que l’app Companion est liée au service notify.' },
			],
			faq: [
				{
					question: 'Zigbee, Wi-Fi, ESP32, ESPHome, ToF, MQTT, GPIO : de quoi parle-t-on ?',
					answer:
						'Zigbee est un réseau radio basse consommation pour capteurs (il faut un coordinateur). Le Wi-Fi est le réseau sans fil de la maison (2,4 GHz pour l’ESP32). Un ESP32 est une petite carte programmable avec Wi-Fi. ESPHome prépare son programme à partir d’un fichier YAML. ToF (Time of Flight) mesure une distance avec de la lumière. MQTT est un protocole de messages souvent utilisé avec Zigbee2MQTT. GPIO désigne les broches d’entrée/sortie de la carte.',
				},
				{
					question: 'Puis-je utiliser un HC-SR04 classique ?',
					answer:
						'Déconseillé ici : pas de sonde étanche, corrosion rapide dans le sel et l’humidité. Préférez le JSN-SR04T ou un ToF protégé.',
				},
				{
					question: 'Le pourcentage sera-t-il exact ?',
					answer:
						'Non : les pastilles ne forment pas une surface plane. L’objectif utile est plein / moitié / à recharger, avec un calibrage sur votre bac.',
				},
				{
					question: 'Faut-il un coordinateur Zigbee pour la solution ESP32 ?',
					answer:
						'Non : l’ESP32 parle en Wi-Fi directement à Home Assistant via ESPHome. Un coordinateur n’est nécessaire que pour les capteurs Zigbee du commerce.',
				},
			],
		},
		en: {
			title: 'Water softener salt level: connected sensor',
			description:
				'Monitor softener salt: visual gauge, Zigbee/Wi-Fi tank sensor, weighing limits, or ESP32 + JSN-SR04T/ToF with ESPHome and Home Assistant alerts.',
			h1: 'Water softener salt level',
			objective:
				'You will know whether your water softener’s salt bin is full, half full or needs a refill, without opening the lid every time. Four approaches are covered, from the simplest (visual mark and calendar reminder) to an ESP32 — a small electronic board with Wi-Fi — plus a distance sensor, ESPHome software that prepares its program, and Home Assistant, the free software that gathers your connected devices, for a phone alert.',
			usefulness:
				'On many softeners the opaque lid completely hides the salt level: you only discover an empty bin when you open it. That is the author’s (Emmanuel Sauvage) situation: the bin was nearly empty, and it only showed after opening. An approximate level (full / half / refill) is enough to buy pellets in time and avoid hard water returning.',
			takeaway:
				'Start with a visual mark and a calendar reminder if you use little salt. Move to a commercial Zigbee or Wi-Fi sensor if you want an alert without soldering. Keep the ESP32 + waterproof ultrasonic (or ToF) build when you want a percentage in Home Assistant, with all electronics kept out of the wet, salty bin.',
			goodToKnow:
				'Salt and moisture corrode electronics quickly: the probe may look at the pellets, but the driver board, power supply and ESP32 stay outside the bin in a dry enclosure. A bare HC-SR04 is not suitable here; prefer a JSN-SR04T (waterproof probe) or a VL53L0X/VL53L1X ToF under the lid.',
			prerequisites: [
				'A water softener with a salt-pellet bin you can open.',
				'For connected options: a running Home Assistant, and for Zigbee a coordinator (USB stick or compatible hub).',
				'For the ESP32 build: ESPHome installed, 2.4 GHz Wi-Fi within range, and a socket for a 5 V USB supply.',
			],
			safety:
				'Never touch 230 V mains or pressurised plumbing. Power down the control valve if the manual requires it before opening the lid. Salt and brine are corrosive: use gloves, rinse tools, and never immerse the electronics. This guide does not replace your softener’s manual.',
			photos: [
				{
					src: '/images/domotique/adoucisseur/adoucisseur-1-couvercle.webp',
					alt: 'Closed water softener, blue lid with window: salt level not visible',
					caption: 'Lid closed: without opening, you cannot see whether pellets remain.',
				},
				{
					src: '/images/domotique/adoucisseur/adoucisseur-2-ouvert.webp',
					alt: 'Open softener: valve with display, blue resin bottle and brine well with pellets',
					caption: 'Lid open: display valve, blue resin bottle, brine well (tube) and pellets. Place the sensor above the salt here.',
				},
				{
					src: '/images/domotique/adoucisseur/adoucisseur-3-bac-vide.webp',
					alt: 'Top view of a nearly empty salt bin',
					caption: 'Nearly empty bin on the author’s installation: a real situation that motivates this guide (no other invented test).',
				},
			],
			placement: {
				title: 'Where to place the sensor',
				intro:
					'Mount the sensor under the lid, above the pellet bin, aiming at the salt surface. Avoid the control valve (display), the blue resin bottle and the brine well (vertical tube). Keep the ESP32, USB supply and ultrasonic driver board outside the wet zone, linked by a cable.',
				image: '/images/domotique/adoucisseur/placement-capteur.svg',
				alt: 'Placement diagram: sensor above pellets, electronics outside the bin',
				caption: 'Placement sketch (simplified top view), to be read with the open-bin photo.',
			},
			alternatives: [
				{
					title: 'A — No electronics: visual gauge and calendar reminder',
					difficulty: 'Beginner',
					budget: '€0',
					body: 'Open the lid and mark three heights (permanent marker or plastic ruler): full, half, refill. Note how many kilos you add and, over a few weeks, estimate your pace (water hardness and usage). Create a phone calendar reminder or a time-only Home Assistant automation (“every X days, check the salt”).',
					install: 'No wiring. Check the level at each reminder and adjust the interval after two or three refill cycles.',
					alert: 'Calendar reminder or timer notification — no automatic measurement.',
					linkLabel: null,
					linkHref: null,
				},
				{
					title: 'B — Commercial Zigbee or Wi-Fi tank level sensor',
					difficulty: 'Beginner to intermediate',
					budget: 'about €40–90 depending on model and coordinator (check with the seller)',
					body: 'Real ultrasonic tank-level sensors exist, for example Tuya / EPTTECH TLC2206 (Zigbee TLC2206-ZB, supported in Zigbee2MQTT with a percentage). They measure distance to a surface and expose a percentage. They are designed for liquids; on salt pellets the surface is uneven, so treat readings as approximate (full / half / low). Another simple path used with Home Assistant: a wired Zigbee leak sensor at the bottom — it only reports “too low” when brine reaches the probe, not a true percentage.',
					install: 'Fix the head under the lid above the salt, set installation height in the app or Zigbee2MQTT, pair it, then add a Home Assistant alert.',
					alert: 'Low threshold → mobile notification (liquid_level_percent or liquid_state).',
					linkLabel: 'Search for a Zigbee / ultrasonic tank level sensor',
					linkHref: amz('en', 'Zigbee ultrasonic tank level sensor Tuya TLC2206'),
				},
				{
					title: 'C — Scale / weighing',
					difficulty: 'Intermediate',
					budget: 'variable; often impractical under a softener',
					body: 'Weighing the bin or salt bags sounds logical, but a floor-standing softener tied into plumbing is a poor fit for a continuous scale: brine water and resin weight confuse the reading, and the wet/salty environment damages load cells (HX711 type). A kitchen scale when you add bags helps track consumption, not a reliable automatic alert.',
					install: 'Not recommended as permanent monitoring under the bin. Weigh only when adding pellets to estimate your pace.',
					alert: 'No reliable automatic alert in this context.',
					linkLabel: null,
					linkHref: null,
				},
				{
					title: 'D — ESP32 + waterproof ultrasonic JSN-SR04T (or ToF) + ESPHome',
					difficulty: 'Intermediate',
					budget: 'about €25–55 depending on seller (ESP32 + probe + enclosure)',
					body: 'An ESP32 measures distance to the pellets with a JSN-SR04T (waterproof ultrasonic probe on a cable; the module’s PCB is not waterproof) or, alternatively, a VL53L0X / VL53L1X ToF sensor (Time of Flight: light-based distance, shorter range, often better for small bins). ESPHome turns distance into a percentage and full / half / refill. A classic HC-SR04 has no waterproof probe and corrodes quickly here.',
					install: 'Follow the detailed build below: wiring, flash, empty_m / full_m calibration, then the Home Assistant automation.',
					alert: 'binary_sensor “Salt needs refill” → notification (YAML provided).',
					linkLabel: 'Search for JSN-SR04T',
					linkHref: amz('en', 'JSN-SR04T waterproof ultrasonic sensor'),
				},
			],
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Wi-Fi control board (see the box above).', productId: 'esp32-c6-devkitc' },
				{
					name: 'JSN-SR04T (waterproof ultrasonic probe)',
					qty: 1,
					note: 'Cable probe aimed at the salt; keep the module PCB outside the bin. Alternative: VL53L0X or VL53L1X ToF under the lid.',
					q: true,
					searchQuery: 'JSN-SR04T waterproof ultrasonic sensor',
				},
				{
					name: '1 kΩ and 2 kΩ resistors',
					qty: '1 of each',
					note: 'Voltage divider on Echo (5 V → ~3.3 V) into GPIO18.',
					searchQuery: '1/4W resistor assortment',
				},
				{
					name: 'Plastic enclosure + cable gland',
					qty: 1,
					note: 'Keeps the ESP32 and module board dry; optional conformal coating on solder joints.',
					searchQuery: 'electronics enclosure cable gland',
				},
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Locate the measurement zone in the bin',
					actions: [
						'Open the lid and note: control valve, resin bottle, brine well, pellet surface.',
						'Pick a point under the lid that aims only at the pellets, with no obstacle.',
						'Measure roughly “sensor → full salt” and “sensor → empty / bottom”: these become full_m and empty_m.',
					],
					observe: 'The open-bin photo and placement diagram match your unit.',
					check: 'No tube or resin bottle crosses the planned beam.',
				},
				{
					title: 'Wire the JSN-SR04T with 3.3 V protection',
					actions: [
						'USB unplugged. Connect module VCC to ESP32 5V/VIN, GND to GND, TRIG to GPIO5.',
						'On Echo: 1 kΩ in series to GPIO18, and 2 kΩ from GPIO18 to GND. Never feed 5 V Echo straight into an ESP32 GPIO.',
						'Only the waterproof probe goes under the lid; the module PCB and ESP32 stay in the dry enclosure outside.',
					],
					observe: 'The probe cable leaves the bin without blocking the lid.',
					check: 'Polarity checked; no bare wire in the salt.',
				},
				{
					title: 'Calibrate empty_m / full_m and the states',
					actions: [
						'After flashing, read “Salt distance” nearly empty, then after a refill (or with a card at full height).',
						'Edit empty_m and full_m in the YAML, Validate, then update over OTA (no cable).',
						'Check that “Salt state” shows full, half or refill steadily for a few minutes.',
					],
					observe: 'The percentage rises when you add pellets.',
					check: '“Salt needs refill” turns ON below the 33 % threshold.',
				},
			],
			haIntegration: [
				'Entities “Salt level percent”, “Salt state” and “Salt needs refill” appear under ESPHome devices.',
				'Add a gauge or entity card to the dashboard for a quick glance.',
				'Use the automation below (replace notify.mobile_app_YOUR_PHONE) to get a refill reminder.',
			],
			haAutomationYaml: haYamlEn,
			troubleshooting: [
				{ problem: 'Frozen or wild distance', solution: 'Probe mis-aimed, blind zone (< 20 cm), or Echo without divider. Move the sensor back, check 1 kΩ/2 kΩ wiring, increase the median window.' },
				{ problem: 'Jumpy percentage', solution: 'Uneven pellet surface: expected. Rely on full/half/refill states; set update_interval to 120 s.' },
				{ problem: 'Fast corrosion', solution: 'Module PCB or ESP32 was inside the bin. Move all electronics out; leave only the waterproof probe; use an enclosure + gland.' },
				{ problem: 'No notification', solution: 'Check the real entity_id under Settings → Entities, and that the Companion app is linked to notify.' },
			],
			faq: [
				{
					question: 'Zigbee, Wi-Fi, ESP32, ESPHome, ToF, MQTT, GPIO — what do they mean?',
					answer:
						'Zigbee is a low-power radio network for sensors (needs a coordinator). Wi-Fi is the home wireless network (2.4 GHz for the ESP32). An ESP32 is a small programmable board with Wi-Fi. ESPHome builds its program from a YAML file. ToF (Time of Flight) measures distance with light. MQTT is a messaging protocol often used with Zigbee2MQTT. GPIO means the board’s input/output pins.',
				},
				{
					question: 'Can I use a classic HC-SR04?',
					answer: 'Not recommended here: no waterproof probe, fast corrosion in salt and moisture. Prefer JSN-SR04T or a protected ToF.',
				},
				{
					question: 'Will the percentage be exact?',
					answer: 'No: pellets are not a flat surface. The useful goal is full / half / refill, calibrated on your bin.',
				},
				{
					question: 'Do I need a Zigbee coordinator for the ESP32 option?',
					answer: 'No: the ESP32 talks Wi-Fi straight to Home Assistant via ESPHome. A coordinator is only needed for commercial Zigbee sensors.',
				},
			],
		},
		de: {
			title: 'Salzstand Enthärter: vernetzter Sensor',
			description:
				'Salzstand im Enthärter überwachen: Sichtmarke, Zigbee/Wi-Fi-Füllstand, Waage-Grenzen oder ESP32 + JSN-SR04T/ToF mit ESPHome und Home-Assistant-Alarm.',
			h1: 'Salzstand des Wasserenthärters',
			objective:
				'Sie erfahren, ob der Salzbehälter Ihres Wasserenthärters voll, halb voll oder nachzufüllen ist, ohne jedes Mal den Deckel zu öffnen. Vier Wege: von der Sichtmarke mit Kalendererinnerung bis zum ESP32 — einer kleinen Elektronikplatine mit WLAN — plus Abstandssensor, ESPHome und Home Assistant für eine Handy-Benachrichtigung.',
			usefulness:
				'Bei vielen Enthärtern verdeckt der opake Deckel den Salzstand völlig: Ein leerer Behälter fällt erst beim Öffnen auf. So war es bei der Anlage des Autors (Emmanuel Sauvage): Der Behälter war fast leer — sichtbar erst nach dem Öffnen. Ein ungefährer Stand (voll / halb / nachfüllen) reicht, um rechtzeitig Tabletten zu kaufen.',
			takeaway:
				'Beginnen Sie mit Sichtmarke und Kalender, wenn Sie wenig Salz verbrauchen. Nutzen Sie einen fertigen Zigbee- oder Wi-Fi-Sensor für eine Meldung ohne Löten. Den ESP32 mit wasserdichtem Ultraschall (oder ToF) wählen Sie, wenn Sie Prozentwerte in Home Assistant wollen — Elektronik außerhalb des feuchten, salzigen Behälters.',
			goodToKnow:
				'Salz und Feuchte korrodieren Elektronik schnell: Die Sonde darf auf die Tabletten schauen, Platine, Netzteil und ESP32 bleiben im trockenen Gehäuse außerhalb. Ein offener HC-SR04 ist ungeeignet; besser JSN-SR04T oder ToF VL53L0X/VL53L1X unter dem Deckel.',
			prerequisites: [
				'Ein Wasserenthärter mit zugänglichem Salztabletten-Behälter.',
				'Für vernetzte Lösungen: laufendes Home Assistant; für Zigbee ein Koordinator.',
				'Für den ESP32-Aufbau: ESPHome, 2,4-GHz-WLAN in Reichweite, USB-5-V-Netzteil.',
			],
			safety:
				'Niemals 230 V oder druckführende Leitungen berühren. Steuern Sie das Steuerventil ab, wenn die Anleitung es vor dem Öffnen verlangt. Salz und Sole sind ätzend: Handschuhe, Werkzeug spülen, Elektronik nie eintauchen.',
			photos: [
				{
					src: '/images/domotique/adoucisseur/adoucisseur-1-couvercle.webp',
					alt: 'Geschlossener Wasserenthärter, blauer Deckel mit Fenster: Salzstand nicht sichtbar',
					caption: 'Deckel zu: Ohne Öffnen sieht man keine Tabletten.',
				},
				{
					src: '/images/domotique/adoucisseur/adoucisseur-2-ouvert.webp',
					alt: 'Offener Enthärter: Ventil mit Display, blaue Harzflasche und Solebrunnen mit Tabletten',
					caption: 'Deckel offen: Display-Ventil, blaue Harzflasche, Solebrunnen (Rohr) und Tabletten. Hier den Sensor über dem Salz platzieren.',
				},
				{
					src: '/images/domotique/adoucisseur/adoucisseur-3-bac-vide.webp',
					alt: 'Aufsicht auf einen fast leeren Salzbehälter',
					caption: 'Fast leerer Behälter in der Anlage des Autors: reale Ausgangslage (kein weiterer erfundener Test).',
				},
			],
			placement: {
				title: 'Wo den Sensor platzieren',
				intro:
					'Sensor unter dem Deckel über den Tabletten, auf die Salzoberfläche gerichtet. Steuerventil (Display), blaue Harzflasche und Solebrunnen (senkrechtes Rohr) meiden. ESP32, USB-Netzteil und Ultraschall-Platine außerhalb der Feuchtzone, per Kabel verbunden.',
				image: '/images/domotique/adoucisseur/placement-capteur.svg',
				alt: 'Platzierungsskizze: Sensor über den Tabletten, Elektronik außerhalb',
				caption: 'Platzierungsübersicht (vereinfachte Draufsicht), zusammen mit dem Foto des offenen Behälters lesen.',
			},
			alternatives: [
				{
					title: 'A — Ohne Elektronik: Sichtmarke und Kalender',
					difficulty: 'Einsteiger',
					budget: '0 €',
					body: 'Deckel öffnen, drei Höhen markieren: voll, halb, nachfüllen. Verbrauch notieren und Intervall schätzen. Kalendererinnerung oder zeitgesteuerte Home-Assistant-Automation.',
					install: 'Keine Verdrahtung. Intervall nach zwei bis drei Füllungen anpassen.',
					alert: 'Kalender oder Timer — keine automatische Messung.',
					linkLabel: null,
					linkHref: null,
				},
				{
					title: 'B — Fertiger Zigbee- oder Wi-Fi-Füllstandssensor',
					difficulty: 'Einsteiger bis fortgeschritten',
					budget: 'ca. 40–90 € je nach Modell und Koordinator (beim Händler prüfen)',
					body: 'Ultraschall-Füllstandssensoren wie Tuya/EPTTECH TLC2206 (Zigbee TLC2206-ZB, in Zigbee2MQTT mit Prozent) existieren. Für Flüssigkeiten gebaut; bei Salztabletten nur grob auswerten. Alternative: Zigbee-Leckagesensor am Boden meldet nur „zu niedrig“.',
					install: 'Kopf unter dem Deckel montieren, Installationshöhe setzen, koppeln, Automation in Home Assistant.',
					alert: 'Unterer Schwellwert → Handy-Benachrichtigung.',
					linkLabel: 'Zigbee-/Ultraschall-Füllstandssensor suchen',
					linkHref: amz('de', 'Zigbee Ultraschall Füllstandssensor Tuya TLC2206'),
				},
				{
					title: 'C — Waage / Wiegen',
					difficulty: 'Fortgeschritten',
					budget: 'variabel; unter dem Enthärter oft unpraktisch',
					body: 'Dauerhaftes Wiegen unter einem angeschlossenen Enthärter ist unzuverlässig (Sole, Harz, Korrosion an Wägezellen). Küchenwaage beim Nachfüllen hilft nur bei der Verbrauchsnotiz.',
					install: 'Nicht als Dauerüberwachung unter dem Behälter empfohlen.',
					alert: 'Keine zuverlässige Automatik.',
					linkLabel: null,
					linkHref: null,
				},
				{
					title: 'D — ESP32 + wasserdichter Ultraschall JSN-SR04T (oder ToF) + ESPHome',
					difficulty: 'Fortgeschritten',
					budget: 'ca. 25–55 € je nach Händler',
					body: 'ESP32 misst mit JSN-SR04T (wasserdichte Sonde; Modulplatine nicht wasserdicht) oder ToF VL53L0X/VL53L1X. ESPHome liefert Prozent und voll/halb/nachfüllen. HC-SR04 ohne wasserdichte Sonde korrodiert schnell.',
					install: 'Verdrahtung, Flash, Kalibrierung empty_m/full_m, dann Automation.',
					alert: 'binary_sensor „Salt needs refill“ → Benachrichtigung.',
					linkLabel: 'JSN-SR04T suchen',
					linkHref: amz('de', 'JSN-SR04T wasserdichter Ultraschallsensor'),
				},
			],
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'WLAN-Steuerplatine (siehe Kasten).', productId: 'esp32-c6-devkitc' },
				{
					name: 'JSN-SR04T (wasserdichte Ultraschallsonde)',
					qty: 1,
					note: 'Sonde auf das Salz richten; Modulplatine außerhalb. Alternative: ToF VL53L0X/VL53L1X.',
					q: true,
					searchQuery: 'JSN-SR04T wasserdichter Ultraschallsensor',
				},
				{
					name: 'Widerstände 1 kΩ und 2 kΩ',
					qty: 'je 1',
					note: 'Spannungsteiler am Echo (5 V → ~3,3 V) nach GPIO18.',
					searchQuery: 'Widerstand Sortiment 1/4W',
				},
				{
					name: 'Kunststoffgehäuse + Kabelverschraubung',
					qty: 1,
					note: 'Hält ESP32 und Modulplatine trocken.',
					searchQuery: 'Elektronik Gehäuse Kabelverschraubung',
				},
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Messzone im Behälter festlegen',
					actions: [
						'Deckel öffnen und Ventil, Harzflasche, Solebrunnen, Tablettenfläche notieren.',
						'Punkt unter dem Deckel wählen, der nur die Tabletten trifft.',
						'Abstände „Sensor → voll“ und „Sensor → leer“ messen: full_m und empty_m.',
					],
					observe: 'Foto und Platzierungsskizze passen zu Ihrer Anlage.',
					check: 'Kein Rohr schneidet den Messstrahl.',
				},
				{
					title: 'JSN-SR04T mit 3,3-V-Schutz verdrahten',
					actions: [
						'USB getrennt. VCC an 5V/VIN, GND an GND, TRIG an GPIO5.',
						'Echo: 1 kΩ in Reihe nach GPIO18, 2 kΩ von GPIO18 nach GND. Nie 5-V-Echo direkt an GPIO.',
						'Nur die wasserdichte Sonde unter dem Deckel; Platinen im trockenen Gehäuse.',
					],
					observe: 'Sondenkabel blockiert den Deckel nicht.',
					check: 'Polarität ok; keine blanken Adern im Salz.',
				},
				{
					title: 'empty_m / full_m und Zustände kalibrieren',
					actions: [
						'Nach dem Flashen Distanz leer und voll ablesen.',
						'YAML anpassen, Validate, OTA-Update.',
						'Prüfen, dass Salt state stabil full/half/refill zeigt.',
					],
					observe: 'Prozent steigt beim Nachfüllen.',
					check: '„Salt needs refill“ wird unter 33 % aktiv.',
				},
			],
			haIntegration: [
				'Entitäten „Salt level percent“, „Salt state“ und „Salt needs refill“ unter ESPHome.',
				'Gauge-Karte auf dem Dashboard hinzufügen.',
				'Automation unten nutzen (notify.mobile_app_IHR_TELEFON ersetzen).',
			],
			haAutomationYaml: haYamlDe,
			troubleshooting: [
				{ problem: 'Distanz eingefroren oder unsinnig', solution: 'Sonde falsch ausgerichtet, Blindzone (< 20 cm) oder Echo ohne Teiler. Ausrichten, 1-kΩ/2-kΩ prüfen, Median erhöhen.' },
				{ problem: 'Prozent springt', solution: 'Unebene Tablettenfläche — normal. Auf Zustände setzen; update_interval 120 s.' },
				{ problem: 'Schnelle Korrosion', solution: 'Elektronik war im Behälter. Nur Sonde innen; Gehäuse + Verschraubung.' },
				{ problem: 'Keine Benachrichtigung', solution: 'Echte entity_id prüfen; Companion-App mit notify verknüpfen.' },
			],
			faq: [
				{
					question: 'Was bedeuten Zigbee, Wi-Fi, ESP32, ESPHome, ToF, MQTT, GPIO?',
					answer:
						'Zigbee ist ein sparsame Funknetz für Sensoren (braucht Koordinator). Wi-Fi ist das Heimnetz (2,4 GHz für ESP32). ESP32 ist eine kleine programmierbare WLAN-Platine. ESPHome erzeugt ihr Programm aus YAML. ToF misst Distanz mit Licht. MQTT ist ein Nachrichtenprotokoll (oft mit Zigbee2MQTT). GPIO sind die Ein-/Ausgangspins.',
				},
				{
					question: 'Darf ich einen klassischen HC-SR04 verwenden?',
					answer: 'Nein, nicht empfohlen: keine wasserdichte Sonde, schnelle Korrosion. Besser JSN-SR04T oder geschützter ToF.',
				},
				{
					question: 'Ist der Prozentsatz exakt?',
					answer: 'Nein. Ziel ist voll / halb / nachfüllen, kalibriert an Ihrem Behälter.',
				},
				{
					question: 'Brauche ich für ESP32 einen Zigbee-Koordinator?',
					answer: 'Nein. Der ESP32 spricht per WLAN mit Home Assistant. Ein Koordinator ist nur für Zigbee-Fertiggeräte nötig.',
				},
			],
		},
		it: {
			title: 'Livello sale addolcitore: sensore connesso',
			description:
				'Controllare il sale dell’addolcitore: marca visiva, sensore Zigbee/Wi-Fi, limiti della pesatura oppure ESP32 + JSN-SR04T/ToF con ESPHome e avvisi Home Assistant.',
			h1: 'Livello del sale nell’addolcitore',
			objective:
				'Saprete se il bacino del sale del vostro addolcitore è pieno, a metà o da riempire, senza aprire ogni volta il coperchio. Quattro soluzioni: dalla marca visiva con promemoria calendario fino a un ESP32 — piccola scheda con Wi-Fi — più sensore di distanza, ESPHome e Home Assistant per un avviso sul telefono.',
			usefulness:
				'Su molti addolcitori il coperchio opaco nasconde del tutto il livello: il bacino vuoto si scopre solo aprendolo. È il caso dell’impianto dell’autore (Emmanuel Sauvage): il bacino era quasi vuoto, visibile solo dopo l’apertura. Un livello approssimativo (pieno / metà / da riempire) basta per comprare le pastiglie in tempo.',
			takeaway:
				'Iniziate con marca visiva e calendario se consumate poco sale. Passate a un sensore Zigbee o Wi-Fi commerciale per un avviso senza saldare. Scegliete ESP32 + ultrasuoni impermeabile (o ToF) se volete una percentuale in Home Assistant, con tutta l’elettronica fuori dal bacino umido e salato.',
			goodToKnow:
				'Sale e umidità corrodono in fretta l’elettronica: la sonda può guardare le pastiglie, ma scheda, alimentazione ed ESP32 restano fuori, in un contenitore asciutto. Un HC-SR04 nudo non è adatto; preferite JSN-SR04T o ToF VL53L0X/VL53L1X sotto il coperchio.',
			prerequisites: [
				'Un addolcitore con bacino del sale accessibile.',
				'Per le soluzioni connesse: Home Assistant attivo; per Zigbee un coordinatore.',
				'Per il montaggio ESP32: ESPHome, Wi-Fi 2,4 GHz a portata, alimentatore USB 5 V.',
			],
			safety:
				'Non toccate mai la 230 V né le tubazioni in pressione. Se il manuale lo richiede, togliete tensione alla valvola prima di aprire. Sale e salamoia sono corrosivi: guanti, risciacquate gli utensili, non immergete l’elettronica.',
			photos: [
				{
					src: '/images/domotique/adoucisseur/adoucisseur-1-couvercle.webp',
					alt: 'Addolcitore chiuso, coperchio blu con finestra: livello sale non visibile',
					caption: 'Coperchio chiuso: senza aprire non si vedono le pastiglie.',
				},
				{
					src: '/images/domotique/adoucisseur/adoucisseur-2-ouvert.webp',
					alt: 'Addolcitore aperto: valvola con display, bottiglia di resina blu e pozzo salamoia con pastiglie',
					caption: 'Coperchio aperto: valvola con display, resina blu, pozzo salamoia (tubo) e pastiglie. Qui va il sensore sopra il sale.',
				},
				{
					src: '/images/domotique/adoucisseur/adoucisseur-3-bac-vide.webp',
					alt: 'Vista dall’alto di un bacino del sale quasi vuoto',
					caption: 'Bacino quasi vuoto sull’impianto dell’autore: situazione reale (nessun altro test inventato).',
				},
			],
			placement: {
				title: 'Dove posizionare il sensore',
				intro:
					'Fissate il sensore sotto il coperchio, sopra le pastiglie, mirando la superficie del sale. Evitate la valvola di comando (display), la bottiglia di resina blu e il pozzo salamoia (tubo verticale). ESP32, alimentazione USB e scheda del modulo ultrasonico restano fuori dalla zona umida.',
				image: '/images/domotique/adoucisseur/placement-capteur.svg',
				alt: 'Schema di posizionamento: sensore sopra le pastiglie, elettronica fuori',
				caption: 'Schema di posizionamento (vista dall’alto semplificata), da confrontare con la foto del bacino aperto.',
			},
			alternatives: [
				{
					title: 'A — Senza elettronica: marca visiva e calendario',
					difficulty: 'Principiante',
					budget: '0 €',
					body: 'Aprite il coperchio e segnate tre altezze: pieno, metà, da riempire. Annotate i chili aggiunti e stimate il ritmo. Promemoria calendario o automazione Home Assistant a tempo.',
					install: 'Nessun cablaggio. Regolate l’intervallo dopo due o tre rifornimenti.',
					alert: 'Calendario o timer — nessuna misura automatica.',
					linkLabel: null,
					linkHref: null,
				},
				{
					title: 'B — Sensore commerciale Zigbee o Wi-Fi per livello serbatoio',
					difficulty: 'Principiante o intermedio',
					budget: 'circa 40–90 € a seconda del modello e del coordinatore (da verificare)',
					body: 'Esistono sensori ultrasonici di livello (es. Tuya/EPTTECH TLC2206, variante Zigbee TLC2206-ZB supportata da Zigbee2MQTT con percentuale). Pensati per liquidi; sulle pastiglie il risultato è approssimativo. Alternativa: sensore perdite Zigbee sul fondo che segnala solo «troppo basso».',
					install: 'Testa sotto il coperchio, altezza di installazione, accoppiamento, automazione in Home Assistant.',
					alert: 'Soglia bassa → notifica mobile.',
					linkLabel: 'Cercare un sensore di livello Zigbee / ultrasonico',
					linkHref: amz('it', 'sensore livello serbatoio ultrasonico Zigbee Tuya TLC2206'),
				},
				{
					title: 'C — Bilancia / pesatura',
					difficulty: 'Intermedio',
					budget: 'variabile; spesso poco pratico sotto l’addolcitore',
					body: 'Pesare in continuo un addolcitore collegato alle tubazioni è inaffidabile (salamoia, resina, corrosione sulle celle di carico). Una bilancia da cucina al rifornimento serve solo a tenere il consumo.',
					install: 'Non consigliata come monitoraggio permanente sotto il bacino.',
					alert: 'Nessun avviso automatico affidabile.',
					linkLabel: null,
					linkHref: null,
				},
				{
					title: 'D — ESP32 + ultrasonico impermeabile JSN-SR04T (o ToF) + ESPHome',
					difficulty: 'Intermedio',
					budget: 'circa 25–55 € a seconda del venditore',
					body: 'L’ESP32 misura con JSN-SR04T (sonda impermeabile; la PCB del modulo non lo è) oppure ToF VL53L0X/VL53L1X. ESPHome calcola percentuale e pieno/metà/da riempire. L’HC-SR04 classico corrode in fretta.',
					install: 'Cablaggio, flash, calibrazione empty_m/full_m, poi automazione.',
					alert: 'binary_sensor «Salt needs refill» → notifica.',
					linkLabel: 'Cercare JSN-SR04T',
					linkHref: amz('it', 'JSN-SR04T sensore ultrasonico impermeabile'),
				},
			],
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Scheda di controllo Wi-Fi (vedi riquadro).', productId: 'esp32-c6-devkitc' },
				{
					name: 'JSN-SR04T (sonda ultrasonica impermeabile)',
					qty: 1,
					note: 'Sonda sul sale; PCB del modulo fuori. Alternativa: ToF VL53L0X/VL53L1X.',
					q: true,
					searchQuery: 'JSN-SR04T sensore ultrasonico impermeabile',
				},
				{
					name: 'Resistenze 1 kΩ e 2 kΩ',
					qty: '1 per valore',
					note: 'Partitore su Echo (5 V → ~3,3 V) verso GPIO18.',
					searchQuery: 'assortimento resistenze 1/4W',
				},
				{
					name: 'Contenitore plastica + passacavo',
					qty: 1,
					note: 'Mantiene asciutti ESP32 e scheda del modulo.',
					searchQuery: 'contenitore elettronica passacavo',
				},
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Individuare la zona di misura',
					actions: [
						'Aprite il coperchio e annotate valvola, resina, pozzo salamoia, superficie delle pastiglie.',
						'Scegliete un punto sotto il coperchio che miri solo alle pastiglie.',
						'Misurate «sensore → pieno» e «sensore → vuoto»: full_m e empty_m.',
					],
					observe: 'Foto e schema di posizionamento corrispondono al vostro impianto.',
					check: 'Nessun tubo taglia il fascio previsto.',
				},
				{
					title: 'Cablare il JSN-SR04T con protezione 3,3 V',
					actions: [
						'USB scollegato. VCC su 5V/VIN, GND su GND, TRIG su GPIO5.',
						'Echo: 1 kΩ in serie verso GPIO18, 2 kΩ da GPIO18 a GND. Mai Echo a 5 V diretto sul GPIO.',
						'Solo la sonda impermeabile sotto il coperchio; le schede nel contenitore asciutto.',
					],
					observe: 'Il cavo non blocca il coperchio.',
					check: 'Polarità ok; nessun filo nudo nel sale.',
				},
				{
					title: 'Calibrare empty_m / full_m e gli stati',
					actions: [
						'Dopo il flash, leggete la distanza a vuoto e a pieno.',
						'Modificate lo YAML, Validate, poi OTA.',
						'Verificate che Salt state sia stabile su full/half/refill.',
					],
					observe: 'La percentuale sale aggiungendo pastiglie.',
					check: '«Salt needs refill» si attiva sotto il 33 %.',
				},
			],
			haIntegration: [
				'Le entità «Salt level percent», «Salt state» e «Salt needs refill» compaiono in ESPHome.',
				'Aggiungete una gauge sul cruscotto.',
				'Usate l’automazione sotto (sostituite notify.mobile_app_IL_TUO_TELEFONO).',
			],
			haAutomationYaml: haYamlIt,
			troubleshooting: [
				{ problem: 'Distanza bloccata o assurda', solution: 'Sonda mal orientata, zona cieca (< 20 cm) o Echo senza partitore. Riorientare, controllare 1 kΩ/2 kΩ, aumentare il median.' },
				{ problem: 'Percentuale che salta', solution: 'Superficie irregolare: normale. Affidatevi agli stati; update_interval 120 s.' },
				{ problem: 'Corrosione rapida', solution: 'Elettronica nel bacino. Solo sonda dentro; contenitore + passacavo.' },
				{ problem: 'Nessuna notifica', solution: 'Controllare entity_id reale e app Companion collegata a notify.' },
			],
			faq: [
				{
					question: 'Cosa significano Zigbee, Wi-Fi, ESP32, ESPHome, ToF, MQTT, GPIO?',
					answer:
						'Zigbee è una rete radio a basso consumo per sensori (serve un coordinatore). Il Wi-Fi è la rete di casa (2,4 GHz per ESP32). L’ESP32 è una piccola scheda programmabile con Wi-Fi. ESPHome prepara il suo programma da un file YAML. ToF misura la distanza con la luce. MQTT è un protocollo di messaggi (spesso con Zigbee2MQTT). GPIO sono i pin di ingresso/uscita.',
				},
				{
					question: 'Posso usare un HC-SR04 classico?',
					answer: 'Sconsigliato: niente sonda impermeabile, corrosione rapida. Preferite JSN-SR04T o ToF protetto.',
				},
				{
					question: 'La percentuale sarà esatta?',
					answer: 'No. L’obiettivo utile è pieno / metà / da riempire, calibrato sul vostro bacino.',
				},
				{
					question: 'Serve un coordinatore Zigbee per la soluzione ESP32?',
					answer: 'No: l’ESP32 parla in Wi-Fi con Home Assistant via ESPHome. Il coordinatore serve solo ai sensori Zigbee commerciali.',
				},
			],
		},
		es: {
			title: 'Nivel de sal del descalcificador: sensor conectado',
			description:
				'Vigilar la sal del descalcificador: marca visual, sensor Zigbee/Wi-Fi, límites de la báscula o ESP32 + JSN-SR04T/ToF con ESPHome y avisos en Home Assistant.',
			h1: 'Nivel de sal del descalcificador',
			objective:
				'Sabrás si el depósito de sal de tu descalcificador está lleno, a mitad o hay que recargarlo, sin abrir la tapa cada vez. Cuatro enfoques: desde la marca visual con recordatorio de calendario hasta un ESP32 — pequeña placa con Wi-Fi — más sensor de distancia, ESPHome y Home Assistant para un aviso en el teléfono.',
			usefulness:
				'En muchos descalcificadores la tapa opaca oculta por completo el nivel: solo descubres el depósito vacío al abrirlo. Es el caso de la instalación del autor (Emmanuel Sauvage): el depósito estaba casi vacío y solo se veía tras abrirlo. Un nivel aproximado (lleno / mitad / recargar) basta para comprar pastillas a tiempo.',
			takeaway:
				'Empieza por una marca visual y un recordatorio si consumes poca sal. Pasa a un sensor Zigbee o Wi-Fi comercial si quieres un aviso sin soldar. Reserva el ESP32 + ultrasonidos impermeable (o ToF) si quieres un porcentaje en Home Assistant, con toda la electrónica fuera del depósito húmedo y salado.',
			goodToKnow:
				'La sal y la humedad corroen rápido la electrónica: la sonda puede mirar las pastillas, pero la placa, la alimentación y el ESP32 se quedan fuera, en una caja seca. Un HC-SR04 descubierto no sirve; prefiere JSN-SR04T o ToF VL53L0X/VL53L1X bajo la tapa.',
			prerequisites: [
				'Un descalcificador con depósito de pastillas accesible.',
				'Para opciones conectadas: Home Assistant en marcha; para Zigbee un coordinador.',
				'Para el montaje ESP32: ESPHome, Wi-Fi 2,4 GHz al alcance y fuente USB 5 V.',
			],
			safety:
				'No toques nunca 230 V ni tuberías a presión. Corta la válvula de mando si el manual lo pide antes de abrir. La sal y la salmuera son corrosivas: guantes, enjuaga herramientas y no sumerjas la electrónica.',
			photos: [
				{
					src: '/images/domotique/adoucisseur/adoucisseur-1-couvercle.webp',
					alt: 'Descalcificador cerrado, tapa azul con ventana: el nivel de sal no se ve',
					caption: 'Tapa cerrada: sin abrir no se ven las pastillas.',
				},
				{
					src: '/images/domotique/adoucisseur/adoucisseur-2-ouvert.webp',
					alt: 'Descalcificador abierto: válvula con pantalla, botella de resina azul y pozo de salmuera con pastillas',
					caption: 'Tapa abierta: válvula con pantalla, resina azul, pozo de salmuera (tubo) y pastillas. Aquí va el sensor encima de la sal.',
				},
				{
					src: '/images/domotique/adoucisseur/adoucisseur-3-bac-vide.webp',
					alt: 'Vista superior de un depósito de sal casi vacío',
					caption: 'Depósito casi vacío en la instalación del autor: situación real (sin otro ensayo inventado).',
				},
			],
			placement: {
				title: 'Dónde colocar el sensor',
				intro:
					'Fija el sensor bajo la tapa, encima de las pastillas, apuntando a la superficie de la sal. Evita la válvula de mando (pantalla), la botella de resina azul y el pozo de salmuera (tubo vertical). El ESP32, la alimentación USB y la placa del módulo ultrasónico se quedan fuera de la zona húmeda.',
				image: '/images/domotique/adoucisseur/placement-capteur.svg',
				alt: 'Esquema de colocación: sensor sobre las pastillas, electrónica fuera',
				caption: 'Esquema de colocación (vista superior simplificada), a cruzar con la foto del depósito abierto.',
			},
			alternatives: [
				{
					title: 'A — Sin electrónica: marca visual y calendario',
					difficulty: 'Principiante',
					budget: '0 €',
					body: 'Abre la tapa y marca tres alturas: lleno, mitad, recargar. Anota los kilos y estima el ritmo. Recordatorio de calendario o automatización Home Assistant por tiempo.',
					install: 'Sin cableado. Ajusta el intervalo tras dos o tres recargas.',
					alert: 'Calendario o temporizador — sin medida automática.',
					linkLabel: null,
					linkHref: null,
				},
				{
					title: 'B — Sensor comercial Zigbee o Wi-Fi de nivel de depósito',
					difficulty: 'Principiante a intermedio',
					budget: 'unos 40–90 € según modelo y coordinador (verificar con el vendedor)',
					body: 'Existen sensores ultrasónicos de nivel (p. ej. Tuya/EPTTECH TLC2206, variante Zigbee TLC2206-ZB en Zigbee2MQTT con porcentaje). Pensados para líquidos; con pastillas el resultado es aproximado. Alternativa: sensor de fugas Zigbee en el fondo que solo avisa «demasiado bajo».',
					install: 'Cabezal bajo la tapa, altura de instalación, emparejado y automatización en Home Assistant.',
					alert: 'Umbral bajo → notificación móvil.',
					linkLabel: 'Buscar sensor de nivel Zigbee / ultrasónico',
					linkHref: amz('es', 'sensor nivel depósito ultrasónico Zigbee Tuya TLC2206'),
				},
				{
					title: 'C — Báscula / pesaje',
					difficulty: 'Intermedio',
					budget: 'variable; a menudo poco práctico bajo el descalcificador',
					body: 'Pesar en continuo un descalcificador conectado a la fontanería es poco fiable (salmuera, resina, corrosión en celdas de carga). Una báscula de cocina al rellenar solo ayuda a anotar el consumo.',
					install: 'No recomendado como vigilancia permanente bajo el depósito.',
					alert: 'Sin aviso automático fiable.',
					linkLabel: null,
					linkHref: null,
				},
				{
					title: 'D — ESP32 + ultrasónico impermeable JSN-SR04T (o ToF) + ESPHome',
					difficulty: 'Intermedio',
					budget: 'unos 25–55 € según el vendedor',
					body: 'El ESP32 mide con JSN-SR04T (sonda impermeable; la PCB del módulo no lo es) o ToF VL53L0X/VL53L1X. ESPHome calcula porcentaje y lleno/mitad/recargar. El HC-SR04 clásico se corroe rápido.',
					install: 'Cableado, flasheo, calibración empty_m/full_m y automatización.',
					alert: 'binary_sensor «Salt needs refill» → notificación.',
					linkLabel: 'Buscar JSN-SR04T',
					linkHref: amz('es', 'JSN-SR04T sensor ultrasónico impermeable'),
				},
			],
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Placa de control Wi-Fi (ver recuadro).', productId: 'esp32-c6-devkitc' },
				{
					name: 'JSN-SR04T (sonda ultrasónica impermeable)',
					qty: 1,
					note: 'Sonda hacia la sal; PCB del módulo fuera. Alternativa: ToF VL53L0X/VL53L1X.',
					q: true,
					searchQuery: 'JSN-SR04T sensor ultrasónico impermeable',
				},
				{
					name: 'Resistencias 1 kΩ y 2 kΩ',
					qty: '1 de cada',
					note: 'Divisor en Echo (5 V → ~3,3 V) hacia GPIO18.',
					searchQuery: 'surtido resistencias 1/4W',
				},
				{
					name: 'Caja de plástico + prensaestopas',
					qty: 1,
					note: 'Mantiene secos el ESP32 y la placa del módulo.',
					searchQuery: 'caja electrónica prensaestopas',
				},
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Localizar la zona de medida',
					actions: [
						'Abre la tapa y anota válvula, resina, pozo de salmuera y superficie de pastillas.',
						'Elige un punto bajo la tapa que apunte solo a las pastillas.',
						'Mide «sensor → lleno» y «sensor → vacío»: full_m y empty_m.',
					],
					observe: 'La foto y el esquema coinciden con tu instalación.',
					check: 'Ningún tubo corta el haz previsto.',
				},
				{
					title: 'Cablear el JSN-SR04T con protección 3,3 V',
					actions: [
						'USB desconectado. VCC a 5V/VIN, GND a GND, TRIG a GPIO5.',
						'Echo: 1 kΩ en serie a GPIO18, 2 kΩ de GPIO18 a GND. Nunca Echo a 5 V directo al GPIO.',
						'Solo la sonda impermeable bajo la tapa; las placas en la caja seca.',
					],
					observe: 'El cable no bloquea la tapa.',
					check: 'Polaridad correcta; ningún hilo pelado en la sal.',
				},
				{
					title: 'Calibrar empty_m / full_m y los estados',
					actions: [
						'Tras flashear, lee la distancia casi vacío y lleno.',
						'Edita el YAML, Validate y actualiza por OTA.',
						'Comprueba que Salt state sea estable en full/half/refill.',
					],
					observe: 'El porcentaje sube al añadir pastillas.',
					check: '«Salt needs refill» se activa por debajo del 33 %.',
				},
			],
			haIntegration: [
				'Las entidades «Salt level percent», «Salt state» y «Salt needs refill» aparecen en ESPHome.',
				'Añade un gauge en el panel.',
				'Usa la automatización de abajo (sustituye notify.mobile_app_TU_TELEFONO).',
			],
			haAutomationYaml: haYamlEs,
			troubleshooting: [
				{ problem: 'Distancia fija o absurda', solution: 'Sonda mal orientada, zona ciega (< 20 cm) o Echo sin divisor. Reorienta, revisa 1 kΩ/2 kΩ, sube el median.' },
				{ problem: 'Porcentaje que salta', solution: 'Superficie irregular: normal. Confía en los estados; update_interval 120 s.' },
				{ problem: 'Corrosión rápida', solution: 'Electrónica dentro del depósito. Solo la sonda dentro; caja + prensaestopas.' },
				{ problem: 'Sin notificación', solution: 'Revisa la entity_id real y que la app Companion esté enlazada a notify.' },
			],
			faq: [
				{
					question: '¿Qué significan Zigbee, Wi-Fi, ESP32, ESPHome, ToF, MQTT, GPIO?',
					answer:
						'Zigbee es una red de radio de bajo consumo para sensores (hace falta un coordinador). El Wi-Fi es la red de casa (2,4 GHz para el ESP32). Un ESP32 es una pequeña placa programable con Wi-Fi. ESPHome prepara su programa desde un YAML. ToF mide distancia con luz. MQTT es un protocolo de mensajes (a menudo con Zigbee2MQTT). GPIO son los pines de entrada/salida.',
				},
				{
					question: '¿Puedo usar un HC-SR04 clásico?',
					answer: 'Desaconsejado: sin sonda impermeable, corrosión rápida. Prefiere JSN-SR04T o ToF protegido.',
				},
				{
					question: '¿El porcentaje será exacto?',
					answer: 'No. El objetivo útil es lleno / mitad / recargar, calibrado en tu depósito.',
				},
				{
					question: '¿Necesito un coordinador Zigbee para la opción ESP32?',
					answer: 'No: el ESP32 habla por Wi-Fi con Home Assistant vía ESPHome. El coordinador solo hace falta para sensores Zigbee comerciales.',
				},
			],
		},
	},
};
