import { esphomeHeader } from '../shared.mjs';

const RELAY = { fr: 'Module relais', en: 'Relay module', de: 'Relaismodul', it: 'Modulo relè', es: 'Módulo de relé' };
const SOIL = { fr: 'Sonde d’humidité du sol', en: 'Soil moisture probe', de: 'Bodenfeuchtesensor', it: 'Sensore umidità del suolo', es: 'Sensor de humedad del suelo' };

const yaml =
	esphomeHeader('arrosage-auto', 'Automatic irrigation') +
	`
switch:
  - platform: gpio
    id: valve_relay
    name: "Irrigation valve"
    icon: mdi:sprinkler
    pin:
      number: GPIO18
      inverted: false            # many relay boards are active-LOW: set true if the logic is reversed
    restore_mode: ALWAYS_OFF     # the valve stays closed after a reboot or power cut
    on_turn_on:
      - delay: 20min             # hard stop, even if Wi-Fi or Home Assistant is down
      - switch.turn_off: valve_relay

sensor:
  - platform: adc
    id: soil_moisture
    name: "Soil moisture"
    pin: GPIO2
    attenuation: 12db
    update_interval: 60s
    unit_of_measurement: "%"
    accuracy_decimals: 0
    filters:
      - median:
          window_size: 5
          send_every: 1
      - calibrate_linear:
          - 2.60 -> 0.0          # CHANGE: voltage with the probe dry (in air)
          - 1.20 -> 100.0        # CHANGE: voltage with the probe in water
      - clamp:
          min_value: 0
          max_value: 100

  - platform: wifi_signal
    name: "WiFi signal"
    update_interval: 120s
    entity_category: diagnostic
`;

export const project = {
	id: 'irrigation',
	level: 'advanced',
	durationHours: '3–5',
	budgetRange: {
		fr: 'environ 35–70 € selon vendeur et vanne',
		en: 'about €35–70 depending on the seller and valve',
		de: 'ca. 35–70 € je nach Händler und Ventil',
		it: 'circa 35–70 € a seconda del venditore e della valvola',
		es: 'unos 35–70 € según el vendedor y la válvula',
	},
	slugs: {
		fr: 'arrosage-automatique',
		en: 'automatic-irrigation',
		de: 'automatische-bewaesserung',
		it: 'irrigazione-automatica',
		es: 'riego-automatico',
	},
	fullGuide: null,
	productIds: ['esp32-c6-devkitc'],
	searchQueries: {
		fr: 'module relais 1 canal 5V optocoupleur Arduino',
		en: '1 channel 5V relay module optocoupler Arduino',
		de: 'Relaismodul 1 Kanal 5V Optokoppler Arduino',
		it: 'modulo relè 1 canale 5V optoisolato Arduino',
		es: 'módulo relé 1 canal 5V optoacoplador Arduino',
	},
	smallMaterialIds: ['usb', 'psu', 'dupont', 'terminals', 'heatshrink', 'enclosure'],
	flashAfter: 1,
	wiring: {
		sensorName: { fr: 'Relais + sonde sol', en: 'Relay + soil probe', de: 'Relais + Bodensonde', it: 'Relè + sonda suolo', es: 'Relé + sonda suelo' },
		pins: [
			{ gpio: '5V', signal: 'VCC', color: 'power', device: RELAY },
			{ gpio: 'GND', signal: 'GND', color: 'ground', device: RELAY },
			{ gpio: 'GPIO18', signal: 'IN', color: 'aux', device: RELAY },
			{ gpio: '3V3', signal: 'VCC', color: 'power', device: SOIL },
			{ gpio: 'GND', signal: 'GND', color: 'ground', device: SOIL },
			{ gpio: 'GPIO2', signal: 'AOUT', color: 'data', device: SOIL },
		],
		principleBoxes: {
			fr: [
				{ title: `Home Assistant`, s: 'Home Assistant', tone: 'ha', a: 'Horaires, humidité du sol, météo', b: 'Ouvre la vanne puis la referme' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Lit la sonde d’humidité (GPIO2)', b: 'Commande le relais (GPIO18), arrêt de sécurité à 20 min', via: 'Wi-Fi 2,4 GHz + API chiffrée' },
				{ title: 'Relais + électrovanne', s: 'Relais + vanne', tone: 'power', a: 'Le relais ne commute que le circuit basse tension de la vanne', b: 'Adaptateur CE 12 V ou 24 V', via: 'Signal GPIO18, bobine du relais en 5 V' },
			],
			en: [
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Schedule, soil moisture, weather', b: 'Opens the valve then closes it' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Reads the moisture probe (GPIO2)', b: 'Drives the relay (GPIO18), 20 min safety stop', via: '2.4 GHz Wi-Fi + encrypted API' },
				{ title: 'Relay + solenoid valve', s: 'Relay + valve', tone: 'power', a: 'The relay only switches the valve’s low-voltage circuit', b: 'CE-marked 12 V or 24 V adapter', via: 'GPIO18 signal, 5 V relay coil' },
			],
			de: [
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Zeitplan, Bodenfeuchte, Wetter', b: 'Öffnet das Ventil und schließt es wieder' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Liest die Bodensonde (GPIO2)', b: 'Steuert das Relais (GPIO18), Sicherheitsstopp nach 20 min', via: '2,4-GHz-WLAN + verschlüsselte API' },
				{ title: 'Relais + Magnetventil', s: 'Relais + Ventil', tone: 'power', a: 'Das Relais schaltet nur den Kleinspannungskreis des Ventils', b: 'CE-Netzteil 12 V oder 24 V', via: 'Signal GPIO18, 5-V-Relaisspule' },
			],
			it: [
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Orari, umidità del suolo, meteo', b: 'Apre la valvola e poi la richiude' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Legge la sonda di umidità (GPIO2)', b: 'Comanda il relè (GPIO18), arresto di sicurezza a 20 min', via: 'Wi-Fi 2,4 GHz + API cifrata' },
				{ title: 'Relè + elettrovalvola', s: 'Relè + valvola', tone: 'power', a: 'Il relè commuta solo il circuito a bassa tensione della valvola', b: 'Alimentatore CE 12 V o 24 V', via: 'Segnale GPIO18, bobina relè a 5 V' },
			],
			es: [
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Horarios, humedad del suelo, tiempo', b: 'Abre la válvula y la vuelve a cerrar' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Lee la sonda de humedad (GPIO2)', b: 'Controla el relé (GPIO18), parada de seguridad a 20 min', via: 'Wi-Fi 2,4 GHz + API cifrada' },
				{ title: 'Relé + electroválvula', s: 'Relé + válvula', tone: 'power', a: 'El relé solo conmuta el circuito de baja tensión de la válvula', b: 'Adaptador CE de 12 V o 24 V', via: 'Señal GPIO18, bobina del relé a 5 V' },
			],
		},
	},
	yaml,
	locales: {
		fr: {
			title: `Arrosage automatique ESP32 ESPHome`,
			description:
				
				
				`Arrosez selon l’humidité du sol : ESP32-C6, sonde, vanne 12/24 V, ESPHome, sécurité et Home Assistant. Matériel, schéma GPIO, YAML ESPHome et Home Assistan`,
			h1: 'Arrosage automatique',
			objective:
				'Vous allez ouvrir une électrovanne, une vanne qu’un courant électrique ouvre ou ferme, pour arroser un massif ou un potager, la refermer automatiquement et décider d’arroser selon l’heure et l’humidité du sol. Home Assistant, le logiciel qui réunit vos appareils connectés, donne l’ordre à un ESP32, une petite carte électronique équipée du Wi-Fi, qui commande un relais, un interrupteur électrique. Tout le circuit autour du relais reste en basse tension : le secteur 230 V n’est utilisé que dans un adaptateur déjà fabriqué et certifié.',
			usefulness:
				'Un arrosage programmé gaspille de l’eau quand il a plu. Avec une mesure de l’humidité du sol, Home Assistant n’ouvre la vanne que lorsque la terre est vraiment sèche, et la vanne se referme toute seule après une durée maximale, même si le Wi-Fi tombe en panne. Vous économisez l’eau et vous évitez un arrosage qui ne s’arrête jamais.',
			prerequisites: [
				'Home Assistant avec ESPHome, et un Wi-Fi qui couvre l’endroit où se trouve la vanne (ou un point d’accès extérieur).',
				'Une électrovanne normalement fermée 12 V DC ou 24 V AC (selon votre réseau d’arrosage), avec sa fiche technique : tension, courant et pression minimale.',
				'Un adaptateur secteur CE de même tension que la vanne, dont le courant dépasse celui de la vanne.',
				'Un abri étanche (IP65 ou mieux) pour l’électronique, et un raccordement hydraulique conforme (clapet anti-retour si le réseau est relié à l’eau potable).',
			],
			safety:
				'Ne câblez jamais le 230 V vous-même dans ce projet : l’adaptateur secteur doit être un bloc certifié CE, branché sur une prise protégée par un différentiel 30 mA, hors de portée de l’eau. Le relais ne commute que la sortie basse tension de l’adaptateur (12 V ou 24 V). Une vanne 230 V relève d’un électricien. Prévoyez un arrêt de sécurité (inclus dans le YAML) et fermez l’arrivée d’eau en cas d’absence prolongée.',
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Carte de commande (voir l’encadré plus haut).', productId: 'esp32-c6-devkitc' },
				{ name: 'Module relais 1 canal à optocoupleur, bobine 5 V', qty: 1, note: 'Choisissez un modèle dont l’entrée IN fonctionne avec un signal 3,3 V et dont les contacts supportent la tension et le courant de la vanne.', q: true },
				{ name: 'Électrovanne normalement fermée 12 V DC ou 24 V AC', qty: 1, note: 'Prenez-la de la tension de votre installation. Vérifiez la pression minimale de fonctionnement et le diamètre de raccord.', q: true },
				{ name: 'Adaptateur secteur CE basse tension (12 V DC ou 24 V AC)', qty: 1, note: 'Même tension que la vanne ; courant supérieur à celui de la vanne. Bloc fermé, jamais ouvert ni modifié.', q: true },
				{ name: 'Sonde d’humidité du sol capacitive (type v1.2)', qty: 1, note: 'Sortie analogique ; plus durable qu’une sonde résistive. Gardez l’électronique de la sonde hors de la terre.', q: true },
				{ name: 'Diode 1N4007 (vanne en courant continu uniquement)', qty: 1, note: 'Montée en inverse aux bornes de la vanne pour absorber les pics de tension à l’ouverture du relais.' },
				{ name: 'Porte-fusible en ligne et fusible adapté à la vanne', qty: 1, note: 'Protège le fil de la vanne en cas de court-circuit.' },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Câbler le relais côté commande',
					actions: [
						'Alimentation USB débranchée, reliez les trois fils du côté « commande » du relais, celui que pilote la carte : VCC (l’alimentation du module) à la broche 5V de la carte, GND (la masse) à une broche GND et IN (le fil d’ordre) à GPIO18, l’une des broches métalliques alignées sur le bord de la carte, appelées GPIO.',
						'Laissez les bornes de contact du relais libres pour l’instant : rien n’est encore raccordé à la vanne.',
					],
					observe: 'La carte n’a que trois fils vers le relais ; aucun adaptateur n’est branché.',
					check: 'IN est bien sur GPIO18 et VCC sur 5V, pas sur 3V3.',
				},
				{
					title: 'Raccorder la vanne sur le circuit basse tension',
					actions: [
						'Avant de raccorder quoi que ce soit à la vanne, vérifiez que le relais obéit. Dans Home Assistant, activez l’interrupteur « Irrigation valve » : le relais doit cliquer, puis se relâcher à la désactivation (sinon, basculez « inverted » dans le fichier YAML et réinstallez).',
						'Débranchez l’adaptateur secteur de la prise.',
						'Sur un fil de l’adaptateur, passez par le relais : adaptateur (+ ou l’un des deux fils de sortie) → borne COM, borne NO → un fil de la vanne ; l’autre fil de la vanne revient directement à l’adaptateur.',
						'En courant continu, montez la diode 1N4007 en inverse (bande côté +) aux bornes de la vanne ; insérez le fusible sur le fil d’alimentation.',
						'Isolez chaque connexion avec une gaine ou un bornier, puis rebranchez l’adaptateur.',
					],
					observe: 'La vanne reste fermée tant que le relais est au repos.',
					check: 'Activez l’interrupteur 5 secondes : la vanne s’ouvre avec un petit clac, puis se referme à la désactivation.',
				},
				{
					title: 'Installer la sonde et calibrer l’humidité',
					actions: [
						'Reliez la sonde d’humidité du sol : VCC (son alimentation) à 3V3, GND (la masse) à GND et AOUT (sa sortie analogique, une tension qui varie avec l’humidité) à GPIO2.',
						'Lisez « Soil moisture » avec la sonde dans l’air (valeur sèche), puis avec la lame dans un verre d’eau (valeur mouillée) : relevez les deux tensions dans le journal ESPHome.',
						'Remplacez 2,60 et 1,20 dans calibrate_linear par vos mesures, puis réinstallez en OTA.',
					],
					observe: 'L’humidité passe d’environ 0 % dans l’air à environ 100 % dans l’eau.',
					check: 'Plantez la sonde dans la terre arrosée puis sèche : la valeur varie de façon cohérente.',
				},
				{
					title: 'Créer l’automatisation d’arrosage',
					actions: [
						'Une automatisation est une règle du type « si… alors… » que Home Assistant applique seul. Ouvrez Paramètres → Automatisations et scènes → Créer une automatisation.',
						'Déclencheur : une heure de matin ou de soir. Condition : humidité du sol inférieure à votre seuil (par exemple 35 %). Action : activer « Irrigation valve », attendre la durée choisie, puis la désactiver.',
						'Lancez-la à la main et mesurez le temps nécessaire à un arrosage correct.',
					],
					observe: 'La vanne s’ouvre à l’heure prévue seulement si la terre est sèche.',
					check: 'Simulez une panne : coupez le Wi-Fi pendant l’arrosage ; la vanne doit se fermer d’elle-même après 20 minutes.',
				},
			],
			haIntegration: [
				'L’interrupteur « Irrigation valve » et la mesure « Soil moisture » deviennent des entités standard : vous les ajoutez à un tableau de bord, un calendrier ou une automatisation.',
				'Combinez la condition d’humidité avec une prévision de pluie (intégration météo) pour éviter d’arroser avant un orage.',
				'Prévoyez une alerte si la vanne reste ouverte plus longtemps que prévu : une notification sur l’entité en état « on » depuis plus de 25 minutes.',
			],
			troubleshooting: [
				{ problem: 'Le relais clique mais la vanne ne s’ouvre pas', solution: 'Vérifiez la tension et le courant de l’adaptateur, la pression d’eau minimale de la vanne, et que les fils passent bien par COM et NO.' },
				{ problem: 'La vanne reste ouverte', solution: 'Le relais est collé ou la logique est inversée. Coupez l’adaptateur et fermez l’arrivée d’eau, puis vérifiez « inverted » et le relais.' },
				{ problem: 'Valeur d’humidité qui bouge sans arrêt', solution: 'La sonde est mal alimentée ou la masse flotte. Vérifiez GND commun, gardez les fils courts et laissez le filtre médian actif.' },
				{ problem: 'La vanne s’ouvre brièvement au démarrage', solution: 'Certains modules relais s’activent quelques instants pendant le démarrage de la carte. Prévoyez une vanne de sécurité manuelle sur l’arrivée d’eau.' },
			],
			faq: [
				{ question: 'Puis-je piloter une vanne 230 V ?', answer: 'Pas dans ce projet : le 230 V ne doit pas être câblé en DIY. Choisissez une vanne basse tension, ou confiez le raccordement à un électricien.' },
				{ question: 'Relais ou prise connectée ?', answer: 'Une prise connectée commandée par Home Assistant est plus simple pour un adaptateur basse tension, mais le relais ESPHome ajoute l’arrêt de sécurité local en cas de coupure Wi-Fi.' },
				{ question: 'Que faire en hiver ?', answer: 'Videz la tuyauterie et la vanne avant le gel, sinon l’eau peut les fissurer.' },
			],
		},
		en: {
			title: `Automatic irrigation ESP32 ESPHome`,
			description:
				
				
				`Water by soil moisture: ESP32-C6, probe, 12/24 V valve, ESPHome, fail-safe limits and Home Assistant. Parts list, GPIO wiring, ESPHome YAML and Home Assist`,
			h1: 'Automatic irrigation',
			objective:
				'You will open a solenoid valve, a valve that an electric current opens or closes, to water a flower bed or a vegetable garden, close it again automatically and decide when to water according to the time and the soil moisture. Home Assistant, the software that gathers your connected devices, gives the order to an ESP32, a small electronic board with Wi-Fi, which drives a relay, an electric switch. The whole circuit around the relay stays low voltage: the 230 V mains is used only inside a ready-made, certified adapter.',
			usefulness:
				'A timed watering schedule wastes water when it has rained. With a soil moisture reading, Home Assistant opens the valve only when the soil is really dry, and the valve closes by itself after a maximum duration, even if the Wi-Fi goes down. You save water and avoid a watering that never stops.',
			prerequisites: [
				'Home Assistant with ESPHome, and Wi-Fi covering where the valve sits (or an outdoor access point).',
				'A normally closed 12 V DC or 24 V AC solenoid valve (matching your irrigation network), with its datasheet: voltage, current and minimum pressure.',
				'A CE/UKCA-marked mains adapter with the same voltage as the valve and a current above the valve’s.',
				'A waterproof enclosure (IP65 or better) for the electronics, and compliant plumbing (a check valve if the network connects to drinking water).',
			],
			safety:
				'Never wire 230 V yourself in this project: the mains adapter must be a certified sealed block, plugged into an outlet protected by a 30 mA RCD, out of reach of water. The relay switches only the adapter’s low-voltage output (12 V or 24 V). A 230 V valve is a job for an electrician. Keep the safety timeout (included in the YAML) and shut the water supply during long absences.',
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Control board (see the box above).', productId: 'esp32-c6-devkitc' },
				{ name: '1-channel optocoupler relay module, 5 V coil', qty: 1, note: 'Pick a model whose IN input works with a 3.3 V signal and whose contacts handle the valve’s voltage and current.', q: true },
				{ name: 'Normally closed solenoid valve 12 V DC or 24 V AC', qty: 1, note: 'Match your installation’s voltage. Check minimum operating pressure and fitting size.', q: true },
				{ name: 'Low-voltage CE-marked mains adapter (12 V DC or 24 V AC)', qty: 1, note: 'Same voltage as the valve; current above the valve’s. Sealed block, never opened or modified.', q: true },
				{ name: 'Capacitive soil moisture probe (v1.2 type)', qty: 1, note: 'Analog output; lasts longer than a resistive probe. Keep the probe’s electronics out of the soil.', q: true },
				{ name: '1N4007 diode (DC valve only)', qty: 1, note: 'Fitted in reverse across the valve to absorb voltage spikes when the relay opens.' },
				{ name: 'In-line fuse holder and a fuse sized for the valve', qty: 1, note: 'Protects the valve wiring in case of a short circuit.' },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Wire the relay on the control side',
					actions: [
						'With the USB power unplugged, connect the three wires on the “control” side of the relay, the side the board drives: VCC (the module’s power) to the board’s 5V pin, GND (the ground) to a GND pin and IN (the order wire) to GPIO18, one of the metal pins lined up along the edge of the board, called GPIO.',
						'Leave the relay’s contact terminals free for now: nothing is connected to the valve yet.',
					],
					observe: 'The board has only three wires to the relay; no adapter is plugged in.',
					check: 'IN is on GPIO18 and VCC on 5V, not on 3V3.',
				},
				{
					title: 'Connect the valve to the low-voltage circuit',
					actions: [
						'Before connecting anything to the valve, check that the relay obeys. In Home Assistant, turn on the “Irrigation valve” switch: the relay must click, then release when turned off (if not, toggle “inverted” in the YAML file and reinstall).',
						'Unplug the mains adapter from the outlet.',
						'On one adapter wire, go through the relay: adapter (+ or one of the two output conductors) → COM terminal, NO terminal → one valve wire; the other valve wire goes straight back to the adapter.',
						'With DC, fit the 1N4007 in reverse (stripe toward +) across the valve; put the fuse on the supply wire.',
						'Insulate every connection with heat-shrink or a terminal block, then plug the adapter back in.',
					],
					observe: 'The valve stays closed while the relay is at rest.',
					check: 'Turn the switch on for 5 seconds: the valve opens with a small click, then closes when switched off.',
				},
				{
					title: 'Install the probe and calibrate moisture',
					actions: [
						'Connect the soil moisture probe: VCC (its power) to 3V3, GND (the ground) to GND and AOUT (its analogue output, a voltage that varies with the moisture) to GPIO2.',
						'Read “Soil moisture” with the probe in air (dry value), then with the blade in a glass of water (wet value): note both voltages in the ESPHome log.',
						'Replace 2.60 and 1.20 in calibrate_linear with your measurements, then reinstall over OTA.',
					],
					observe: 'Moisture goes from about 0 % in air to about 100 % in water.',
					check: 'Push the probe into watered then dry soil: the value changes consistently.',
				},
				{
					title: 'Create the watering automation',
					actions: [
						'An automation is an “if… then…” rule that Home Assistant applies by itself. Open Settings → Automations & scenes → Create automation.',
						'Trigger: a morning or evening time. Condition: soil moisture below your threshold (for example 35 %). Action: turn on “Irrigation valve”, wait the chosen duration, then turn it off.',
						'Run it by hand and measure how long a proper watering takes.',
					],
					observe: 'The valve opens at the planned time only if the soil is dry.',
					check: 'Simulate a failure: cut Wi-Fi during watering; the valve must close by itself after 20 minutes.',
				},
			],
			haIntegration: [
				'The “Irrigation valve” switch and the “Soil moisture” reading become standard entities: add them to a dashboard, calendar or automation.',
				'Combine the moisture condition with a rain forecast (weather integration) to avoid watering before a storm.',
				'Set an alert if the valve stays open longer than planned: a notification on the entity in the “on” state for more than 25 minutes.',
			],
			troubleshooting: [
				{ problem: 'The relay clicks but the valve does not open', solution: 'Check the adapter’s voltage and current, the valve’s minimum water pressure, and that the wires go through COM and NO.' },
				{ problem: 'The valve stays open', solution: 'The relay is stuck or the logic is inverted. Unplug the adapter and close the water supply, then check “inverted” and the relay.' },
				{ problem: 'Moisture value keeps jumping', solution: 'The probe is badly powered or the ground floats. Check the common GND, keep wires short and keep the median filter on.' },
				{ problem: 'The valve opens briefly at boot', solution: 'Some relay modules energise for a moment while the board starts. Fit a manual safety valve on the water inlet.' },
			],
			faq: [
				{ question: 'Can I drive a 230 V valve?', answer: 'Not in this project: 230 V must not be wired DIY. Choose a low-voltage valve, or have an electrician do the connection.' },
				{ question: 'Relay or smart plug?', answer: 'A smart plug controlled by Home Assistant is simpler for a low-voltage adapter, but the ESPHome relay adds the local safety timeout if Wi-Fi drops.' },
				{ question: 'What about winter?', answer: 'Drain the pipes and the valve before frost, otherwise the water can crack them.' },
			],
		},
		de: {
			title: `Bewässerung ESP32 ESPHome automatisch`,
			description:
				
				
				`Gießen nach Bodenfeuchte: ESP32-C6, Sonde, 12/24-V-Ventil, ESPHome, Sicherheitslimits und Home Assistant. Material, GPIO-Plan, ESPHome-YAML und Home Assist`,
			h1: 'Automatische Bewässerung',
			objective:
				'Sie öffnen ein Magnetventil, ein Ventil, das ein elektrischer Strom öffnet oder schließt, um ein Beet oder einen Gemüsegarten zu bewässern, schließen es automatisch wieder und entscheiden nach Uhrzeit und Bodenfeuchte, ob bewässert wird. Home Assistant, die Software, die Ihre vernetzten Geräte vereint, gibt den Befehl an einen ESP32, eine kleine Elektronikplatine mit WLAN, die ein Relais steuert, einen elektrischen Schalter. Der gesamte Stromkreis um das Relais bleibt Kleinspannung: Die 230 V des Netzes werden nur in einem fertigen, zertifizierten Netzteil verwendet.',
			usefulness:
				'Eine zeitgesteuerte Bewässerung verschwendet Wasser, wenn es geregnet hat. Mit einer Bodenfeuchtemessung öffnet Home Assistant das Ventil nur, wenn die Erde wirklich trocken ist, und das Ventil schließt nach einer Höchstdauer von selbst, auch wenn das WLAN ausfällt. So sparen Sie Wasser und vermeiden eine Bewässerung, die nie aufhört.',
			prerequisites: [
				'Home Assistant mit ESPHome und WLAN, das den Ventilstandort erreicht (oder ein Outdoor-Access-Point).',
				'Ein stromlos geschlossenes 12-V-DC- oder 24-V-AC-Magnetventil (passend zu Ihrer Bewässerungsanlage) mit Datenblatt: Spannung, Strom und Mindestdruck.',
				'Ein CE-gekennzeichnetes Netzteil mit der Spannung des Ventils und einem höheren Strom als das Ventil.',
				'Ein wasserdichtes Gehäuse (IP65 oder besser) für die Elektronik und ein normgerechter Wasseranschluss (Rückflussverhinderer, wenn das Netz am Trinkwasser hängt).',
			],
			safety:
				'Verdrahten Sie in diesem Projekt niemals selbst 230 V: Das Netzteil muss ein zertifizierter, geschlossener Block sein, an einer mit 30-mA-FI geschützten Steckdose und außerhalb der Reichweite von Wasser. Das Relais schaltet nur den Kleinspannungsausgang des Netzteils (12 V oder 24 V). Ein 230-V-Ventil ist Sache einer Elektrofachkraft. Die Sicherheitsabschaltung (im YAML enthalten) beibehalten und bei längerer Abwesenheit die Wasserzufuhr schließen.',
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Steuerplatine (siehe Kasten oben).', productId: 'esp32-c6-devkitc' },
				{ name: 'Relaismodul 1 Kanal mit Optokoppler, 5-V-Spule', qty: 1, note: 'Ein Modell wählen, dessen IN-Eingang mit 3,3-V-Signal arbeitet und dessen Kontakte Spannung und Strom des Ventils verkraften.', q: true },
				{ name: 'Magnetventil stromlos geschlossen, 12 V DC oder 24 V AC', qty: 1, note: 'Spannung der Anlage beachten. Mindestbetriebsdruck und Anschlussgröße prüfen.', q: true },
				{ name: 'CE-Kleinspannungsnetzteil (12 V DC oder 24 V AC)', qty: 1, note: 'Gleiche Spannung wie das Ventil, mehr Strom als das Ventil. Geschlossener Block, nie geöffnet oder verändert.', q: true },
				{ name: 'Kapazitiver Bodenfeuchtesensor (Typ v1.2)', qty: 1, note: 'Analogausgang; langlebiger als ein resistiver Sensor. Die Elektronik des Sensors aus der Erde heraushalten.', q: true },
				{ name: 'Diode 1N4007 (nur bei Gleichstromventil)', qty: 1, note: 'In Sperrrichtung über dem Ventil, um Spannungsspitzen beim Öffnen des Relais aufzunehmen.' },
				{ name: 'Sicherungshalter und passende Sicherung für das Ventil', qty: 1, note: 'Schützt die Ventilleitung bei Kurzschluss.' },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Das Relais auf der Steuerseite verdrahten',
					actions: [
						'Verbinden Sie bei abgezogener USB-Stromversorgung die drei Leitungen auf der „Steuerseite“ des Relais, also der Seite, die die Platine ansteuert: VCC (die Versorgung des Moduls) mit dem Pin 5V der Platine, GND (die Masse) mit einem GND-Pin und IN (die Befehlsleitung) mit GPIO18, einem der metallenen Pins am Rand der Platine, die GPIO heißen.',
						'Die Kontaktklemmen des Relais vorerst frei lassen: Am Ventil hängt noch nichts.',
					],
					observe: 'Die Platine hat nur drei Leitungen zum Relais; kein Netzteil ist eingesteckt.',
					check: 'IN liegt an GPIO18 und VCC an 5V, nicht an 3V3.',
				},
				{
					title: 'Das Ventil an den Kleinspannungskreis anschließen',
					actions: [
						'Prüfen Sie, bevor Sie irgendetwas am Ventil anschließen, ob das Relais gehorcht. Schalten Sie in Home Assistant den Schalter „Irrigation valve“ ein: Das Relais muss klicken und beim Ausschalten wieder abfallen (andernfalls „inverted“ in der YAML-Datei umschalten und neu installieren).',
						'Das Netzteil aus der Steckdose ziehen.',
						'Eine Netzteilleitung über das Relais führen: Netzteil (+ bzw. einer der beiden Ausgangsleiter) → Klemme COM, Klemme NO → eine Ventilleitung; die andere Ventilleitung geht direkt zum Netzteil zurück.',
						'Bei Gleichstrom die Diode 1N4007 in Sperrrichtung (Ring zu +) über dem Ventil einbauen; die Sicherung in die Versorgungsleitung setzen.',
						'Jede Verbindung mit Schrumpfschlauch oder Klemme isolieren und dann das Netzteil wieder einstecken.',
					],
					observe: 'Das Ventil bleibt geschlossen, solange das Relais in Ruhe ist.',
					check: 'Den Schalter 5 Sekunden einschalten: Das Ventil öffnet mit leisem Klacken und schließt beim Ausschalten.',
				},
				{
					title: 'Sensor einbauen und Feuchte kalibrieren',
					actions: [
						'Schließen Sie die Bodenfeuchtesonde an: VCC (ihre Versorgung) an 3V3, GND (die Masse) an GND und AOUT (ihren analogen Ausgang, eine Spannung, die mit der Feuchte schwankt) an GPIO2.',
						'„Soil moisture“ mit dem Sensor in der Luft (Trockenwert) und dann mit der Platine im Wasserglas (Nasswert) lesen: beide Spannungen im ESPHome-Log notieren.',
						'2,60 und 1,20 in calibrate_linear durch die eigenen Messwerte ersetzen und per OTA neu installieren.',
					],
					observe: 'Die Feuchte wechselt von etwa 0 % in der Luft auf etwa 100 % im Wasser.',
					check: 'Den Sensor in gegossene und dann trockene Erde stecken: Der Wert ändert sich stimmig.',
				},
				{
					title: 'Die Bewässerungsautomatisierung anlegen',
					actions: [
						'Eine Automatisierung ist eine „Wenn … dann …“-Regel, die Home Assistant selbstständig anwendet. Öffnen Sie Einstellungen → Automatisierungen & Szenen → Automatisierung erstellen.',
						'Auslöser: eine Uhrzeit am Morgen oder Abend. Bedingung: Bodenfeuchte unter Ihrem Schwellwert (z. B. 35 %). Aktion: „Irrigation valve“ einschalten, die gewählte Dauer warten, dann ausschalten.',
						'Von Hand starten und messen, wie lange eine ordentliche Bewässerung dauert.',
					],
					observe: 'Das Ventil öffnet zur geplanten Zeit nur bei trockener Erde.',
					check: 'Einen Ausfall simulieren: Das WLAN während der Bewässerung kappen; das Ventil muss nach 20 Minuten selbst schließen.',
				},
			],
			haIntegration: [
				'Der Schalter „Irrigation valve“ und die Messung „Soil moisture“ werden zu Standardentitäten: in Dashboard, Kalender oder Automatisierung einsetzbar.',
				'Die Feuchtebedingung mit einer Regenvorhersage (Wetter-Integration) kombinieren, um vor einem Gewitter nicht zu gießen.',
				'Eine Warnung einrichten, falls das Ventil länger als geplant offen bleibt: eine Benachrichtigung, wenn die Entität länger als 25 Minuten „an“ ist.',
			],
			troubleshooting: [
				{ problem: 'Das Relais klickt, das Ventil öffnet nicht', solution: 'Spannung und Strom des Netzteils, den Mindestwasserdruck des Ventils und den Verlauf der Drähte über COM und NO prüfen.' },
				{ problem: 'Das Ventil bleibt offen', solution: 'Das Relais klebt oder die Logik ist invertiert. Netzteil ziehen und Wasserzufuhr schließen, dann „inverted“ und das Relais prüfen.' },
				{ problem: 'Feuchtewert springt ständig', solution: 'Der Sensor ist schlecht versorgt oder die Masse schwebt. Gemeinsame GND prüfen, Leitungen kurz halten und den Median-Filter aktiv lassen.' },
				{ problem: 'Das Ventil öffnet beim Start kurz', solution: 'Manche Relaismodule ziehen während des Starts der Platine kurz an. Ein manuelles Sicherheitsventil in die Wasserzufuhr einbauen.' },
			],
			faq: [
				{ question: 'Kann ich ein 230-V-Ventil steuern?', answer: 'Nicht in diesem Projekt: 230 V gehören nicht in DIY-Verdrahtung. Ein Kleinspannungsventil wählen oder den Anschluss einer Elektrofachkraft überlassen.' },
				{ question: 'Relais oder smarte Steckdose?', answer: 'Eine von Home Assistant gesteuerte smarte Steckdose ist für ein Kleinspannungsnetzteil einfacher, doch das ESPHome-Relais bringt die lokale Sicherheitsabschaltung bei WLAN-Ausfall mit.' },
				{ question: 'Und im Winter?', answer: 'Leitungen und Ventil vor dem Frost entleeren, sonst kann das Wasser sie sprengen.' },
			],
		},
		it: {
			title: `Irrigazione automatica ESP32 ESPHome`,
			description:
				
				
				`Irrigate secondo l’umidità del suolo: ESP32-C6, sonda, valvola 12/24 V, ESPHome, sicurezza e Home Assistant. Materiale, schema GPIO, YAML ESPHome e Home As`,
			h1: 'Irrigazione automatica',
			objective:
				'Aprirete un’elettrovalvola, una valvola che una corrente elettrica apre o chiude, per irrigare un’aiuola o un orto, la richiuderete automaticamente e deciderete se irrigare in base all’ora e all’umidità del terreno. Home Assistant, il software che riunisce i vostri dispositivi connessi, dà l’ordine a un ESP32, una piccola scheda elettronica con Wi-Fi, che comanda un relè, un interruttore elettrico. Tutto il circuito attorno al relè resta a bassa tensione: la rete a 230 V è usata solo in un alimentatore già fabbricato e certificato.',
			usefulness:
				'Un’irrigazione programmata spreca acqua quando ha piovuto. Con una misura dell’umidità del terreno, Home Assistant apre la valvola solo quando la terra è davvero asciutta, e la valvola si chiude da sola dopo una durata massima, anche se il Wi-Fi cade. Risparmiate acqua ed evitate un’irrigazione che non si ferma mai.',
			prerequisites: [
				'Home Assistant con ESPHome e un Wi-Fi che raggiunga la valvola (o un access point esterno).',
				'Un’elettrovalvola normalmente chiusa 12 V DC o 24 V AC (secondo il vostro impianto) con la scheda tecnica: tensione, corrente e pressione minima.',
				'Un alimentatore con marchio CE della stessa tensione della valvola e con corrente superiore a quella della valvola.',
				'Un contenitore stagno (IP65 o migliore) per l’elettronica e un raccordo idraulico conforme (valvola di non ritorno se la rete è collegata all’acqua potabile).',
			],
			safety:
				'Non cablate mai voi stessi i 230 V in questo progetto: l’alimentatore deve essere un blocco certificato e chiuso, inserito in una presa protetta da differenziale da 30 mA e lontano dall’acqua. Il relè commuta solo l’uscita a bassa tensione dell’alimentatore (12 V o 24 V). Una valvola a 230 V spetta a un elettricista. Mantenete l’arresto di sicurezza (incluso nello YAML) e chiudete l’acqua in caso di assenza prolungata.',
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Scheda di comando (vedi il riquadro sopra).', productId: 'esp32-c6-devkitc' },
				{ name: 'Modulo relè 1 canale con optoisolatore, bobina 5 V', qty: 1, note: 'Scegliete un modello il cui ingresso IN funzioni con un segnale a 3,3 V e i cui contatti reggano tensione e corrente della valvola.', q: true },
				{ name: 'Elettrovalvola normalmente chiusa 12 V DC o 24 V AC', qty: 1, note: 'Prendetela della tensione del vostro impianto. Verificate pressione minima di funzionamento e diametro del raccordo.', q: true },
				{ name: 'Alimentatore CE a bassa tensione (12 V DC o 24 V AC)', qty: 1, note: 'Stessa tensione della valvola; corrente superiore a quella della valvola. Blocco chiuso, mai aperto né modificato.', q: true },
				{ name: 'Sonda capacitiva di umidità del suolo (tipo v1.2)', qty: 1, note: 'Uscita analogica; dura più di una sonda resistiva. Tenete l’elettronica della sonda fuori dalla terra.', q: true },
				{ name: 'Diodo 1N4007 (solo valvola in corrente continua)', qty: 1, note: 'Montato in inversa ai capi della valvola per assorbire i picchi quando il relè si apre.' },
				{ name: 'Portafusibile in linea e fusibile adatto alla valvola', qty: 1, note: 'Protegge il cavo della valvola in caso di cortocircuito.' },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Cablare il relè lato comando',
					actions: [
						'Con l’alimentazione USB scollegata, collegate i tre fili del lato «comando» del relè, quello pilotato dalla scheda: VCC (l’alimentazione del modulo) al pin 5V della scheda, GND (la massa) a un pin GND e IN (il filo dell’ordine) a GPIO18, uno dei pin metallici allineati sul bordo della scheda, chiamati GPIO.',
						'Lasciate per ora liberi i morsetti di contatto del relè: nulla è ancora collegato alla valvola.',
					],
					observe: 'La scheda ha solo tre fili verso il relè; nessun alimentatore è collegato.',
					check: 'IN è su GPIO18 e VCC su 5V, non su 3V3.',
				},
				{
					title: 'Collegare la valvola al circuito a bassa tensione',
					actions: [
						'Prima di collegare qualsiasi cosa alla valvola, verificate che il relè obbedisca. In Home Assistant attivate l’interruttore «Irrigation valve»: il relè deve scattare e poi rilasciarsi alla disattivazione (altrimenti invertite «inverted» nel file YAML e reinstallate).',
						'Scollegate l’alimentatore dalla presa.',
						'Su un filo dell’alimentatore passate dal relè: alimentatore (+ o uno dei due conduttori d’uscita) → morsetto COM, morsetto NO → un filo della valvola; l’altro filo della valvola torna direttamente all’alimentatore.',
						'In corrente continua montate il diodo 1N4007 in inversa (banda verso il +) ai capi della valvola; inserite il fusibile sul filo di alimentazione.',
						'Isolate ogni collegamento con guaina o morsettiera, poi ricollegate l’alimentatore.',
					],
					observe: 'La valvola resta chiusa finché il relè è a riposo.',
					check: 'Attivate l’interruttore per 5 secondi: la valvola si apre con un piccolo clic e si richiude alla disattivazione.',
				},
				{
					title: 'Installare la sonda e calibrare l’umidità',
					actions: [
						'Collegate la sonda di umidità del terreno: VCC (la sua alimentazione) a 3V3, GND (la massa) a GND e AOUT (la sua uscita analogica, una tensione che varia con l’umidità) a GPIO2.',
						'Leggete «Soil moisture» con la sonda in aria (valore secco) e poi con la lama in un bicchiere d’acqua (valore bagnato): annotate le due tensioni nel log di ESPHome.',
						'Sostituite 2,60 e 1,20 in calibrate_linear con le vostre misure e reinstallate via OTA.',
					],
					observe: 'L’umidità passa da circa 0 % in aria a circa 100 % in acqua.',
					check: 'Infilate la sonda in terra innaffiata e poi asciutta: il valore cambia in modo coerente.',
				},
				{
					title: 'Creare l’automazione di irrigazione',
					actions: [
						'Un’automazione è una regola del tipo «se… allora…» che Home Assistant applica da solo. Aprite Impostazioni → Automazioni e scene → Crea automazione.',
						'Attivatore: un orario del mattino o della sera. Condizione: umidità del suolo sotto la vostra soglia (ad esempio 35 %). Azione: attivare «Irrigation valve», attendere la durata scelta e poi disattivarla.',
						'Avviatela a mano e misurate quanto serve per un’irrigazione corretta.',
					],
					observe: 'La valvola si apre all’ora prevista solo se la terra è asciutta.',
					check: 'Simulate un guasto: togliete il Wi-Fi durante l’irrigazione; la valvola deve chiudersi da sola dopo 20 minuti.',
				},
			],
			haIntegration: [
				'L’interruttore «Irrigation valve» e la misura «Soil moisture» diventano entità standard: potete aggiungerle a una dashboard, a un calendario o a un’automazione.',
				'Combinate la condizione di umidità con una previsione di pioggia (integrazione meteo) per non irrigare prima di un temporale.',
				'Impostate un avviso se la valvola resta aperta più del previsto: una notifica quando l’entità è «on» da più di 25 minuti.',
			],
			troubleshooting: [
				{ problem: 'Il relè scatta ma la valvola non si apre', solution: 'Controllate tensione e corrente dell’alimentatore, la pressione minima dell’acqua della valvola e che i fili passino da COM e NO.' },
				{ problem: 'La valvola resta aperta', solution: 'Il relè è incollato o la logica è invertita. Scollegate l’alimentatore e chiudete l’acqua, poi verificate «inverted» e il relè.' },
				{ problem: 'Il valore di umidità salta di continuo', solution: 'La sonda è alimentata male o la massa fluttua. Verificate la GND comune, tenete i fili corti e lasciate attivo il filtro mediano.' },
				{ problem: 'La valvola si apre brevemente all’avvio', solution: 'Alcuni moduli relè si eccitano per un istante durante l’avvio della scheda. Montate una valvola di sicurezza manuale sull’ingresso dell’acqua.' },
			],
			faq: [
				{ question: 'Posso comandare una valvola a 230 V?', answer: 'Non in questo progetto: i 230 V non vanno cablati fai da te. Scegliete una valvola a bassa tensione o affidate il collegamento a un elettricista.' },
				{ question: 'Relè o presa smart?', answer: 'Una presa smart comandata da Home Assistant è più semplice per un alimentatore a bassa tensione, ma il relè ESPHome aggiunge l’arresto di sicurezza locale se cade il Wi-Fi.' },
				{ question: 'E in inverno?', answer: 'Svuotate tubi e valvola prima del gelo, altrimenti l’acqua può spaccarli.' },
			],
		},
		es: {
			title: `Riego automático ESP32 ESPHome`,
			description:
				
				
				`Riega según la humedad del suelo: ESP32-C6, sonda, válvula 12/24 V, ESPHome, seguridad y Home Assistant. Material, esquema GPIO, YAML ESPHome y Home Assist`,
			h1: 'Riego automático',
			objective:
				'Vas a abrir una electroválvula, una válvula que una corriente eléctrica abre o cierra, para regar un parterre o un huerto, cerrarla de nuevo automáticamente y decidir si regar según la hora y la humedad del suelo. Home Assistant, el software que reúne tus dispositivos conectados, da la orden a un ESP32, una pequeña placa electrónica con Wi-Fi, que controla un relé, un interruptor eléctrico. Todo el circuito alrededor del relé sigue en baja tensión: los 230 V de la red solo se usan dentro de un adaptador ya fabricado y certificado.',
			usefulness:
				'Un riego programado malgasta agua cuando ha llovido. Con una medición de la humedad del suelo, Home Assistant abre la válvula solo cuando la tierra está realmente seca, y la válvula se cierra sola tras una duración máxima, incluso si se cae el Wi-Fi. Ahorras agua y evitas un riego que nunca se detiene.',
			prerequisites: [
				'Home Assistant con ESPHome y un Wi-Fi que llegue a la válvula (o un punto de acceso exterior).',
				'Una electroválvula normalmente cerrada de 12 V DC o 24 V AC (según tu red de riego) con su ficha técnica: tensión, corriente y presión mínima.',
				'Un adaptador de red con marcado CE de la misma tensión que la válvula y con más corriente que ella.',
				'Una caja estanca (IP65 o mejor) para la electrónica y una conexión hidráulica conforme (válvula antirretorno si la red se conecta al agua potable).',
			],
			safety:
				'No cablees nunca los 230 V tú mismo en este proyecto: el adaptador debe ser un bloque certificado y cerrado, conectado a un enchufe protegido por diferencial de 30 mA y fuera del alcance del agua. El relé solo conmuta la salida de baja tensión del adaptador (12 V o 24 V). Una válvula de 230 V es cosa de un electricista. Mantén la parada de seguridad (incluida en el YAML) y cierra el agua si te ausentas mucho tiempo.',
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Placa de control (véase el recuadro de arriba).', productId: 'esp32-c6-devkitc' },
				{ name: 'Módulo de relé de 1 canal con optoacoplador, bobina de 5 V', qty: 1, note: 'Elige un modelo cuya entrada IN funcione con señal de 3,3 V y cuyos contactos soporten la tensión y la corriente de la válvula.', q: true },
				{ name: 'Electroválvula normalmente cerrada de 12 V DC o 24 V AC', qty: 1, note: 'Toma la tensión de tu instalación. Comprueba la presión mínima de funcionamiento y el diámetro de la conexión.', q: true },
				{ name: 'Adaptador de red CE de baja tensión (12 V DC o 24 V AC)', qty: 1, note: 'Misma tensión que la válvula; corriente superior a la de la válvula. Bloque cerrado, nunca abierto ni modificado.', q: true },
				{ name: 'Sonda capacitiva de humedad del suelo (tipo v1.2)', qty: 1, note: 'Salida analógica; dura más que una sonda resistiva. Mantén la electrónica de la sonda fuera de la tierra.', q: true },
				{ name: 'Diodo 1N4007 (solo válvula de corriente continua)', qty: 1, note: 'Montado en inversa en los bornes de la válvula para absorber los picos al abrirse el relé.' },
				{ name: 'Portafusibles en línea y fusible adecuado a la válvula', qty: 1, note: 'Protege el cable de la válvula en caso de cortocircuito.' },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Cablear el relé en el lado de control',
					actions: [
						'Con la alimentación USB desconectada, une los tres cables del lado de «control» del relé, el que gobierna la placa: VCC (la alimentación del módulo) al pin 5V de la placa, GND (la masa) a un pin GND e IN (el cable de la orden) a GPIO18, uno de los pines metálicos alineados en el borde de la placa, llamados GPIO.',
						'Deja libres por ahora los bornes de contacto del relé: aún no hay nada conectado a la válvula.',
					],
					observe: 'La placa tiene solo tres cables hacia el relé; no hay ningún adaptador enchufado.',
					check: 'IN está en GPIO18 y VCC en 5V, no en 3V3.',
				},
				{
					title: 'Conectar la válvula al circuito de baja tensión',
					actions: [
						'Antes de conectar nada a la válvula, comprueba que el relé obedece. En Home Assistant activa el interruptor «Irrigation valve»: el relé debe chasquear y después soltarse al desactivarlo (si no, cambia «inverted» en el archivo YAML y vuelve a instalar).',
						'Desenchufa el adaptador de la toma.',
						'En un cable del adaptador pasa por el relé: adaptador (+ o uno de los dos conductores de salida) → borne COM, borne NO → un cable de la válvula; el otro cable de la válvula vuelve directo al adaptador.',
						'En corriente continua, monta el diodo 1N4007 en inversa (banda hacia el +) en los bornes de la válvula; pon el fusible en el cable de alimentación.',
						'Aísla cada conexión con termorretráctil o regleta y vuelve a enchufar el adaptador.',
					],
					observe: 'La válvula permanece cerrada mientras el relé está en reposo.',
					check: 'Activa el interruptor 5 segundos: la válvula se abre con un pequeño clic y se cierra al desactivarlo.',
				},
				{
					title: 'Instalar la sonda y calibrar la humedad',
					actions: [
						'Conecta la sonda de humedad del suelo: VCC (su alimentación) a 3V3, GND (la masa) a GND y AOUT (su salida analógica, una tensión que varía con la humedad) a GPIO2.',
						'Lee «Soil moisture» con la sonda al aire (valor seco) y luego con la lámina en un vaso de agua (valor mojado): anota las dos tensiones en el log de ESPHome.',
						'Sustituye 2,60 y 1,20 en calibrate_linear por tus mediciones y reinstala por OTA.',
					],
					observe: 'La humedad pasa de cerca de 0 % al aire a cerca de 100 % en agua.',
					check: 'Clava la sonda en tierra regada y luego seca: el valor cambia de forma coherente.',
				},
				{
					title: 'Crear la automatización de riego',
					actions: [
						'Una automatización es una regla del tipo «si… entonces…» que Home Assistant aplica por sí solo. Abre Ajustes → Automatizaciones y escenas → Crear automatización.',
						'Disparador: una hora de mañana o de tarde. Condición: humedad del suelo por debajo de tu umbral (por ejemplo 35 %). Acción: activar «Irrigation valve», esperar la duración elegida y desactivarla.',
						'Lánzala a mano y mide cuánto tarda un riego correcto.',
					],
					observe: 'La válvula se abre a la hora prevista solo si la tierra está seca.',
					check: 'Simula una avería: corta el Wi-Fi durante el riego; la válvula debe cerrarse sola a los 20 minutos.',
				},
			],
			haIntegration: [
				'El interruptor «Irrigation valve» y la medida «Soil moisture» pasan a ser entidades estándar: puedes añadirlas a un panel, un calendario o una automatización.',
				'Combina la condición de humedad con una previsión de lluvia (integración meteorológica) para no regar antes de una tormenta.',
				'Configura una alerta si la válvula queda abierta más de lo previsto: una notificación cuando la entidad esté en «on» más de 25 minutos.',
			],
			troubleshooting: [
				{ problem: 'El relé hace clic pero la válvula no se abre', solution: 'Revisa la tensión y la corriente del adaptador, la presión mínima de agua de la válvula y que los cables pasen por COM y NO.' },
				{ problem: 'La válvula se queda abierta', solution: 'El relé está pegado o la lógica está invertida. Desenchufa el adaptador y cierra el agua; luego revisa «inverted» y el relé.' },
				{ problem: 'El valor de humedad salta sin parar', solution: 'La sonda está mal alimentada o la masa flota. Revisa el GND común, mantén los cables cortos y deja activo el filtro de mediana.' },
				{ problem: 'La válvula se abre un instante al arrancar', solution: 'Algunos módulos de relé se activan un momento mientras arranca la placa. Instala una válvula de seguridad manual en la entrada de agua.' },
			],
			faq: [
				{ question: '¿Puedo controlar una válvula de 230 V?', answer: 'No en este proyecto: los 230 V no deben cablearse por cuenta propia. Elige una válvula de baja tensión o encarga la conexión a un electricista.' },
				{ question: '¿Relé o enchufe inteligente?', answer: 'Un enchufe inteligente controlado por Home Assistant es más sencillo para un adaptador de baja tensión, pero el relé de ESPHome añade la parada de seguridad local si cae el Wi-Fi.' },
				{ question: '¿Y en invierno?', answer: 'Vacía las tuberías y la válvula antes de las heladas; si no, el agua puede romperlas.' },
			],
		},
	},
};
