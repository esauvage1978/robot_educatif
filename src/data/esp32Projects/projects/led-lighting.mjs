import { esphomeHeader } from '../shared.mjs';

const yaml =
	esphomeHeader('eclairage-led', 'LED lighting') +
	`
light:
  - platform: esp32_rmt_led_strip
    id: led_strip
    name: "LED strip"
    pin: GPIO18                  # data through a 330 ohm resistor to the first LED (DIN)
    num_leds: 30                 # CHANGE: number of LEDs on your strip
    chipset: WS2812
    rgb_order: GRB               # change it if red and green are swapped
    default_transition_length: 1s
    restore_mode: RESTORE_DEFAULT_OFF
    effects:
      - addressable_rainbow:
          name: "Rainbow"
          speed: 10
          width: 50
      - pulse:
          name: "Slow pulse"
          transition_length: 1500ms
          update_interval: 2s
      - random:
          name: "Random colours"
          transition_length: 3s
          update_interval: 4s

sensor:
  - platform: wifi_signal
    name: "WiFi signal"
    update_interval: 120s
    entity_category: diagnostic
`;

export const project = {
	id: 'led-lighting',
	level: 'intermediate',
	durationHours: '2–3',
	budgetRange: {
		fr: 'environ 25–60 € selon vendeur et longueur de bande',
		en: 'about €25–60 depending on the seller and strip length',
		de: 'ca. 25–60 € je nach Händler und Streifenlänge',
		it: 'circa 25–60 € a seconda del venditore e della lunghezza della striscia',
		es: 'unos 25–60 € según el vendedor y la longitud de la tira',
	},
	slugs: {
		fr: 'eclairage-led-ws2812',
		en: 'ws2812-led-lighting',
		de: 'led-beleuchtung-ws2812',
		it: 'illuminazione-led-ws2812',
		es: 'iluminacion-led-ws2812',
	},
	fullGuide: null,
	productIds: ['esp32-c6-devkitc'],
	searchQueries: {
		fr: 'bande LED WS2812B 5V 30 LED/m adressable',
		en: 'WS2812B 5V addressable LED strip 30 LEDs/m',
		de: 'WS2812B 5V adressierbarer LED-Streifen 30 LEDs/m',
		it: 'striscia LED WS2812B 5V indirizzabile 30 LED/m',
		es: 'tira LED WS2812B 5V direccionable 30 LED/m',
	},
	smallMaterialIds: ['usb', 'dupont', 'resistors', 'terminals', 'heatshrink', 'solder'],
	flashAfter: 1,
	wiring: {
		sensorName: { fr: 'Bande WS2812B', en: 'WS2812B strip', de: 'WS2812B-Streifen', it: 'Striscia WS2812B', es: 'Tira WS2812B' },
		pins: [
			{ gpio: 'GPIO18', signal: 'DIN (330 Ω)', color: 'data' },
			{ gpio: 'GND', signal: 'GND', color: 'ground' },
		],
		principleBoxes: {
			fr: [
				{ title: `Home Assistant`, s: 'Home Assistant', tone: 'ha', a: 'Entité lumière avec effets', b: 'Scènes, horaires, lever du soleil' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Calcule les couleurs et les effets', b: 'Reste alimentée par son propre câble USB', via: 'Wi-Fi 2,4 GHz + API chiffrée' },
				{ title: 'Bande WS2812B', s: 'Bande LED', tone: 'power', a: 'Alimentation 5 V CE dédiée, 3 A pour 30 LED', b: 'Condensateur 1000 µF sur l’alimentation', via: 'Données GPIO18 via 330 Ω, masse commune' },
			],
			en: [
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Light entity with effects', b: 'Scenes, schedules, sunrise' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Computes colours and effects', b: 'Stays powered by its own USB cable', via: '2.4 GHz Wi-Fi + encrypted API' },
				{ title: 'WS2812B strip', s: 'LED strip', tone: 'power', a: 'Dedicated CE-marked 5 V supply, 3 A for 30 LEDs', b: '1000 µF capacitor on the supply', via: 'Data GPIO18 via 330 Ω, common ground' },
			],
			de: [
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Lichtentität mit Effekten', b: 'Szenen, Zeitpläne, Sonnenaufgang' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Berechnet Farben und Effekte', b: 'Bleibt über ein eigenes USB-Kabel versorgt', via: '2,4-GHz-WLAN + verschlüsselte API' },
				{ title: 'WS2812B-Streifen', s: 'LED-Streifen', tone: 'power', a: 'Eigenes CE-5-V-Netzteil, 3 A für 30 LEDs', b: '1000-µF-Kondensator an der Versorgung', via: 'Daten GPIO18 über 330 Ω, gemeinsame Masse' },
			],
			it: [
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Entità luce con effetti', b: 'Scene, orari, alba' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Calcola colori ed effetti', b: 'Resta alimentata dal proprio cavo USB', via: 'Wi-Fi 2,4 GHz + API cifrata' },
				{ title: 'Striscia WS2812B', s: 'Striscia LED', tone: 'power', a: 'Alimentatore 5 V CE dedicato, 3 A per 30 LED', b: 'Condensatore da 1000 µF sull’alimentazione', via: 'Dati GPIO18 tramite 330 Ω, massa comune' },
			],
			es: [
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Entidad de luz con efectos', b: 'Escenas, horarios, amanecer' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Calcula colores y efectos', b: 'Sigue alimentada por su propio cable USB', via: 'Wi-Fi 2,4 GHz + API cifrada' },
				{ title: 'Tira WS2812B', s: 'Tira LED', tone: 'power', a: 'Fuente CE de 5 V dedicada, 3 A para 30 LED', b: 'Condensador de 1000 µF en la alimentación', via: 'Datos GPIO18 mediante 330 Ω, masa común' },
			],
		},
	},
	yaml,
	locales: {
		fr: {
			title: `Éclairage LED WS2812 ESP32 ESPHome`,
			description:
				
				
				`Bande LED adressable sur ESP32-C6 avec ESPHome : alimentation 5 V, résistance, YAML et effets Home Assistant. Matériel, schéma GPIO, YAML ESPHome et Home A`,
			h1: 'Éclairage LED WS2812',
			objective:
				'Vous allez allumer une bande de LED adressables WS2812B, une bande dont chaque diode se commande individuellement, choisir ses couleurs et lancer des effets depuis Home Assistant, le logiciel qui réunit vos appareils connectés. Le pilote est un ESP32, une petite carte électronique équipée du Wi-Fi. Le projet insiste sur ce qui sépare un montage qui scintille d’un montage fiable : l’alimentation, la masse commune, la résistance et le condensateur.',
			usefulness:
				'Vous créez un éclairage d’ambiance sous un meuble, derrière un téléviseur ou sur un bureau, avec des scènes préréglées (film, lecture), un allumage progressif au lever du jour et une couleur d’alerte, le tout piloté par votre installation domotique.',
			prerequisites: [
				'Home Assistant avec ESPHome et un Wi-Fi à l’endroit de pose.',
				'Une bande WS2812B en 5 V (et non 12 V ou 24 V) avec ses trois fils : 5V, DIN et GND, et le nombre de LED connu.',
				'Une alimentation 5 V certifiée CE dimensionnée pour la bande (calcul plus bas).',
			],
			safety:
				'5 V est une basse tension sans danger de choc, mais l’intensité peut être forte : à pleine puissance, 1 m de bande en 30 LED tire environ 1,8 A. Un fil trop fin ou une alimentation sous-dimensionnée chauffe. Utilisez une alimentation CE fermée avec fusible, ne l’ouvrez pas, gardez-la au sec, et ne laissez pas la bande enroulée sur elle-même à pleine puissance.',
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Carte de commande (voir l’encadré plus haut).', productId: 'esp32-c6-devkitc' },
				{ name: 'Bande LED WS2812B 5 V (30 LED/m)', qty: '1 m ou plus', note: 'Prenez la version sans silicone pour l’intérieur ou IP65 pour un lieu humide. Chaque LED consomme environ 60 mA au maximum (3 × 20 mA).', q: true },
				{ name: 'Alimentation 5 V à découpage certifiée CE, 3 A pour 30 LED', qty: 1, note: 'Prévoyez 20 % de marge sur l’intensité : voir le calcul dans les étapes.', q: true },
				{ name: 'Condensateur électrolytique 1000 µF 6,3 V ou plus', qty: 1, note: 'Monté sur l’alimentation de la bande, polarité respectée, pour amortir les appels de courant à l’allumage.', q: true },
				{ name: 'Résistance 330 Ω', qty: 1, note: 'En série sur la ligne de données, près de la première LED.' },
				{ name: 'Convertisseur de niveau 3,3 V vers 5 V (74AHCT125) — optionnel', qty: '0–1', note: 'La broche DIN en 5 V attend un signal au-dessus d’environ 3,5 V. Le 3,3 V de l’ESP32 fonctionne souvent sur un fil court, mais le convertisseur évite les LED capricieuses.', q: true },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Calculer l’alimentation nécessaire',
					actions: [
						'Pour savoir quelle alimentation acheter, comptez d’abord le nombre de LED de la bande : par exemple 30 LED sur 1 mètre.',
						'Multipliez par 60 mA : 30 × 0,06 A = 1,8 A au maximum, blanc pleine puissance.',
						'Ajoutez 20 % de marge : 1,8 × 1,2 ≈ 2,2 A, donc une alimentation 5 V de 3 A convient.',
					],
					observe: 'Le courant utile est la valeur pleine puissance ; en pratique, les couleurs vives en consomment moins.',
					check: 'Au-delà de 2 mètres de bande, prévoyez de réalimenter la bande en un second point pour éviter la baisse de luminosité.',
				},
				{
					title: 'Câbler la bande',
					actions: [
						'Alimentation 5 V débranchée, reliez-la à la bande : le + sur le fil 5V, le − sur le fil GND, avec des fils assez épais pour supporter le courant, et placez le condensateur de 1000 µF, un petit réservoir qui lisse les à-coups de courant, entre + et − au départ de la bande. Respectez le sens du condensateur : la bande marquée sur son boîtier indique le côté −.',
						'Reliez GPIO18, l’une des broches métalliques alignées sur le bord de la carte (GPIO signifie « entrée-sortie à usage général »), à l’entrée de données DIN de la bande en intercalant la résistance de 330 Ω, le plus près possible de la première LED : elle protège cette première LED des pointes de signal.',
						'Reliez le GND de la bande au GND de la carte : sans masse commune, la bande ne comprend pas les données.',
						'Alimentez la carte par son propre câble USB, pas par la bande.',
					],
					observe: 'Aucune LED ne s’allume pour l’instant : la bande attend les données.',
					check: 'Contrôlez le sens de la bande : la flèche imprimée suit le sens des données, de DIN vers DOUT.',
				},
				{
					title: 'Tester les couleurs et les effets',
					actions: [
						'Dans Home Assistant, ouvrez l’appareil ESPHome et allumez l’entité « LED strip » : la bande doit s’éclairer, ce qui confirme que la carte, l’alimentation et le fil de données fonctionnent ensemble.',
						'Choisissez une couleur puis lancez l’effet « Rainbow ».',
						'Si le rouge et le vert sont inversés, changez rgb_order de GRB à RGB dans le YAML et réinstallez.',
					],
					observe: 'Toutes les LED s’allument selon la couleur choisie, sans scintillement.',
					check: 'Si la première LED seule clignote ou si les couleurs sont fausses, vérifiez la masse commune, le sens de la bande et la résistance sur DIN.',
				},
				{
					title: 'Fixer la bande et créer une scène',
					actions: [
						'Fixez la bande sur son support ; ne la coupez qu’aux repères prévus à cet effet, souvent un trait ou de petites pastilles de cuivre, car une coupe ailleurs détruit une LED et interrompt la chaîne.',
						'Dans Home Assistant, créez une scène « Soirée » avec la couleur et la luminosité souhaitées.',
						'Programmez un allumage progressif au lever du jour avec une automatisation à l’heure voulue.',
					],
					observe: 'La scène se rappelle d’un clic et la bande réagit sans retard visible.',
					check: 'Contrôlez la température de l’alimentation et des fils après 30 minutes à luminosité élevée.',
				},
			],
			haIntegration: [
				'L’entité « LED strip » est une lumière standard : couleur, luminosité, effets, et appartenance à des scènes ou des groupes.',
				'Les effets du YAML apparaissent dans la liste des effets de la carte de lumière dans le tableau de bord.',
				'Automatisations utiles : allumage progressif au lever du jour, retour à une couleur calme à minuit, ou clignotement de la bande lorsque la sonnette retentit.',
			],
			troubleshooting: [
				{ problem: 'La bande ne s’allume pas', solution: 'Vérifiez l’alimentation 5 V, le sens de la bande (DIN vers DOUT), la masse commune et la broche GPIO18 dans le YAML.' },
				{ problem: 'Couleurs incorrectes', solution: 'L’ordre des couleurs de votre modèle diffère. Essayez rgb_order: RGB à la place de GRB.' },
				{ problem: 'Scintillement ou LED parasites', solution: 'Ajoutez la résistance de 330 Ω, le condensateur sur l’alimentation, un convertisseur de niveau 3,3 V vers 5 V et raccourcissez le fil de données.' },
				{ problem: 'Baisse de luminosité en fin de bande', solution: 'La chute de tension est trop forte. Réalimentez la bande à son extrémité ou utilisez des fils plus épais.' },
			],
			faq: [
				{ question: 'Puis-je alimenter la bande par la carte ?', answer: 'Seulement quelques LED. Au-delà, le courant dépasse ce que la carte et son câble USB peuvent fournir : utilisez une alimentation 5 V dédiée.' },
				{ question: 'ESPHome ou WLED ?', answer: 'ESPHome intègre la lumière dans un appareil que vous maîtrisez entièrement ; WLED propose en plus une riche bibliothèque d’effets prête à l’emploi, que Home Assistant sait aussi piloter.' },
				{ question: 'Puis-je utiliser une bande 12 V ?', answer: 'Les bandes adressables en 12 V ont un autre brochage et une autre alimentation ; ce montage concerne les WS2812B en 5 V.' },
			],
		},
		en: {
			title: `WS2812 LED lighting ESP32 ESPHome`,
			description:
				
				
				`Addressable LED strip on ESP32-C6 with ESPHome: 5 V supply, resistor, YAML and Home Assistant effects. Parts list, GPIO wiring, ESPHome YAML and Home Assis`,
			h1: 'WS2812 LED lighting',
			objective:
				'You will light a WS2812B addressable LED strip, a strip whose every diode can be controlled individually, choose its colours and run effects from Home Assistant, the software that gathers your connected devices. The driver is an ESP32, a small electronic board with Wi-Fi. The project insists on what separates a build that flickers from a reliable one: the power supply, the common ground, the resistor and the capacitor.',
			usefulness:
				'You create ambient lighting under a cabinet, behind a television or on a desk, with preset scenes (movie, reading), a gradual wake-up at sunrise and an alert colour, all driven by your smart home setup.',
			prerequisites: [
				'Home Assistant with ESPHome and Wi-Fi where the strip goes.',
				'A 5 V WS2812B strip (not 12 V or 24 V) with its three wires: 5V, DIN and GND, and the known LED count.',
				'A CE/UKCA-marked 5 V power supply sized for the strip (calculation below).',
			],
			safety:
				'5 V is a low voltage with no shock risk, but the current can be high: at full power, 1 m of 30-LED strip draws about 1.8 A. A wire that is too thin or an undersized supply heats up. Use a sealed, fused CE-marked supply, do not open it, keep it dry, and do not leave the strip coiled on itself at full power.',
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Control board (see the box above).', productId: 'esp32-c6-devkitc' },
				{ name: 'WS2812B 5 V LED strip (30 LEDs/m)', qty: '1 m or more', note: 'Take the non-silicone version indoors or IP65 in a damp place. Each LED draws about 60 mA at most (3 × 20 mA).', q: true },
				{ name: 'CE-marked 5 V switching power supply, 3 A for 30 LEDs', qty: 1, note: 'Leave 20 % current margin: see the calculation in the steps.', q: true },
				{ name: '1000 µF electrolytic capacitor, 6.3 V or higher', qty: 1, note: 'Fitted on the strip supply, polarity respected, to absorb the switch-on current surge.', q: true },
				{ name: '330 Ω resistor', qty: 1, note: 'In series on the data line, close to the first LED.' },
				{ name: '3.3 V to 5 V level shifter (74AHCT125) — optional', qty: '0–1', note: 'The DIN pin on 5 V expects a signal above about 3.5 V. The ESP32’s 3.3 V often works on a short wire, but the shifter avoids temperamental LEDs.', q: true },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Calculate the supply you need',
					actions: [
						'To know which power supply to buy, first count the LEDs on the strip: for example 30 LEDs over 1 metre.',
						'Multiply by 60 mA: 30 × 0.06 A = 1.8 A maximum, white at full power.',
						'Add 20 % margin: 1.8 × 1.2 ≈ 2.2 A, so a 3 A 5 V supply fits.',
					],
					observe: 'The useful current is the full-power value; in practice vivid colours draw less.',
					check: 'Beyond 2 metres of strip, plan to feed the strip again at a second point to avoid dimming.',
				},
				{
					title: 'Wire the strip',
					actions: [
						'With the 5 V supply unplugged, connect it to the strip: + to the 5V wire, − to the GND wire, using wires thick enough to carry the current, and place the 1000 µF capacitor, a small reservoir that smooths out surges of current, between + and − at the start of the strip. Mind the capacitor’s direction: the stripe marked on its body shows the − side.',
						'Connect GPIO18, one of the metal pins lined up along the edge of the board (GPIO means “general purpose input output”), to the strip’s DIN data input through the 330 Ω resistor, as close as possible to the first LED: it protects that first LED from signal spikes.',
						'Connect the strip’s GND to the board’s GND: without a common ground, the strip cannot read the data.',
						'Power the board from its own USB cable, not from the strip.',
					],
					observe: 'No LED lights yet: the strip is waiting for data.',
					check: 'Check the strip direction: the printed arrow follows the data flow, from DIN to DOUT.',
				},
				{
					title: 'Test colours and effects',
					actions: [
						'In Home Assistant, open the ESPHome device and turn on the “LED strip” entity: the strip should light up, which confirms that the board, the power supply and the data wire work together.',
						'Pick a colour then run the “Rainbow” effect.',
						'If red and green are swapped, change rgb_order from GRB to RGB in the YAML and reinstall.',
					],
					observe: 'All LEDs light in the chosen colour, with no flicker.',
					check: 'If only the first LED blinks or colours are wrong, check the common ground, strip direction and the resistor on DIN.',
				},
				{
					title: 'Mount the strip and create a scene',
					actions: [
						'Mount the strip on its support; cut it only at the marks provided for that purpose, often a line or small copper pads, because a cut anywhere else destroys an LED and breaks the chain.',
						'In Home Assistant create an “Evening” scene with the colour and brightness you want.',
						'Schedule a gradual sunrise wake-up with an automation at the time you want.',
					],
					observe: 'The scene is recalled in one click and the strip reacts with no visible delay.',
					check: 'Check the temperature of the supply and wires after 30 minutes at high brightness.',
				},
			],
			haIntegration: [
				'The “LED strip” entity is a standard light: colour, brightness, effects, and membership in scenes or groups.',
				'The YAML effects appear in the effect list of the light card on the dashboard.',
				'Useful automations: gradual sunrise, return to a calm colour at midnight, or flashing the strip when the doorbell rings.',
			],
			troubleshooting: [
				{ problem: 'The strip does not light', solution: 'Check the 5 V supply, strip direction (DIN to DOUT), common ground and the GPIO18 pin in the YAML.' },
				{ problem: 'Wrong colours', solution: 'Your model’s colour order differs. Try rgb_order: RGB instead of GRB.' },
				{ problem: 'Flicker or stray LEDs', solution: 'Add the 330 Ω resistor, the capacitor on the supply, a 3.3 V to 5 V level shifter and shorten the data wire.' },
				{ problem: 'Dimming at the end of the strip', solution: 'Voltage drop is too high. Feed the strip again at its far end or use thicker wires.' },
			],
			faq: [
				{ question: 'Can I power the strip from the board?', answer: 'Only a few LEDs. Beyond that, the current exceeds what the board and its USB cable can supply: use a dedicated 5 V supply.' },
				{ question: 'ESPHome or WLED?', answer: 'ESPHome folds the light into a device you fully control; WLED adds a rich ready-made effect library, which Home Assistant can also drive.' },
				{ question: 'Can I use a 12 V strip?', answer: '12 V addressable strips have a different pinout and supply; this build covers 5 V WS2812B.' },
			],
		},
		de: {
			title: `LED-Beleuchtung WS2812 ESP32 ESPHome`,
			description:
				
				
				`Adressierbarer LED-Streifen an ESP32-C6 mit ESPHome: 5-V-Netzteil, Widerstand, YAML und Home-Assistant-Effekte. Material, GPIO-Plan, ESPHome-YAML und Home`,
			h1: 'WS2812-LED-Beleuchtung',
			objective:
				'Sie bringen einen adressierbaren LED-Streifen WS2812B zum Leuchten, einen Streifen, dessen Dioden sich einzeln ansteuern lassen, wählen seine Farben und starten Effekte aus Home Assistant, der Software, die Ihre vernetzten Geräte vereint. Die Steuerung übernimmt ein ESP32, eine kleine Elektronikplatine mit WLAN. Das Projekt betont, was einen flackernden Aufbau von einem zuverlässigen trennt: Stromversorgung, gemeinsame Masse, Widerstand und Kondensator.',
			usefulness:
				'Sie schaffen eine Stimmungsbeleuchtung unter einem Möbel, hinter dem Fernseher oder am Schreibtisch, mit vorgegebenen Szenen (Film, Lesen), sanftem Aufhellen bei Sonnenaufgang und einer Alarmfarbe, alles gesteuert von Ihrem Smart Home.',
			prerequisites: [
				'Home Assistant mit ESPHome und WLAN am Einbauort.',
				'Ein 5-V-WS2812B-Streifen (nicht 12 V oder 24 V) mit seinen drei Adern: 5V, DIN und GND, und bekannter LED-Zahl.',
				'Ein CE-gekennzeichnetes 5-V-Netzteil, passend dimensioniert für den Streifen (Rechnung unten).',
			],
			safety:
				'5 V ist Kleinspannung ohne Stromschlaggefahr, doch der Strom kann hoch sein: Bei voller Leistung zieht 1 m Streifen mit 30 LEDs etwa 1,8 A. Eine zu dünne Ader oder ein zu schwaches Netzteil wird heiß. Ein geschlossenes, abgesichertes CE-Netzteil nutzen, nicht öffnen, trocken halten und den Streifen bei voller Leistung nicht aufgewickelt lassen.',
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Steuerplatine (siehe Kasten oben).', productId: 'esp32-c6-devkitc' },
				{ name: 'WS2812B-LED-Streifen 5 V (30 LEDs/m)', qty: '1 m oder mehr', note: 'Innen die Version ohne Silikon, in feuchten Räumen IP65 wählen. Jede LED zieht höchstens etwa 60 mA (3 × 20 mA).', q: true },
				{ name: 'CE-gekennzeichnetes 5-V-Schaltnetzteil, 3 A für 30 LEDs', qty: 1, note: '20 % Strommarge einplanen: Rechnung siehe Schritte.', q: true },
				{ name: 'Elko 1000 µF, 6,3 V oder mehr', qty: 1, note: 'An der Versorgung des Streifens, polrichtig, um den Einschaltstrom abzufangen.', q: true },
				{ name: 'Widerstand 330 Ω', qty: 1, note: 'In Reihe in der Datenleitung, nahe der ersten LED.' },
				{ name: 'Pegelwandler 3,3 V auf 5 V (74AHCT125) – optional', qty: '0–1', note: 'Der DIN-Pin bei 5 V erwartet ein Signal über etwa 3,5 V. Die 3,3 V des ESP32 funktionieren auf kurzer Leitung oft, doch der Wandler vermeidet zickige LEDs.', q: true },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Benötigtes Netzteil berechnen',
					actions: [
						'Um zu wissen, welches Netzteil Sie kaufen müssen, zählen Sie zuerst die LEDs des Streifens: zum Beispiel 30 LEDs auf 1 Meter.',
						'Mit 60 mA multiplizieren: 30 × 0,06 A = 1,8 A maximal, weiß bei voller Leistung.',
						'20 % Marge addieren: 1,8 × 1,2 ≈ 2,2 A, also passt ein 5-V-Netzteil mit 3 A.',
					],
					observe: 'Der nützliche Strom ist der Wert bei voller Leistung; bunte Farben ziehen in der Praxis weniger.',
					check: 'Bei mehr als 2 Metern Streifen an einer zweiten Stelle erneut einspeisen, um Helligkeitsverlust zu vermeiden.',
				},
				{
					title: 'Streifen verdrahten',
					actions: [
						'Verbinden Sie bei abgezogenem 5-V-Netzteil den Streifen mit der Versorgung: + an die Ader 5V, − an die Ader GND, mit ausreichend dicken Adern für den Strom, und setzen Sie den 1000-µF-Kondensator, einen kleinen Speicher, der Stromstöße glättet, am Streifenanfang zwischen + und −. Achten Sie auf die Richtung des Kondensators: Der aufgedruckte Streifen am Gehäuse zeigt die −-Seite.',
						'Verbinden Sie GPIO18, einen der metallenen Pins am Rand der Platine (GPIO bedeutet „General Purpose Input Output“), über den 330-Ω-Widerstand mit dem Dateneingang DIN des Streifens, möglichst nah an der ersten LED: Er schützt diese erste LED vor Signalspitzen.',
						'GND des Streifens mit GND der Platine verbinden: Ohne gemeinsame Masse versteht der Streifen die Daten nicht.',
						'Die Platine über ihr eigenes USB-Kabel versorgen, nicht über den Streifen.',
					],
					observe: 'Noch leuchtet keine LED: Der Streifen wartet auf Daten.',
					check: 'Die Streifenrichtung prüfen: Der aufgedruckte Pfeil folgt dem Datenfluss, von DIN nach DOUT.',
				},
				{
					title: 'Farben und Effekte testen',
					actions: [
						'Öffnen Sie in Home Assistant das ESPHome-Gerät und schalten Sie die Entität „LED strip“ ein: Der Streifen muss aufleuchten, ein Beweis dafür, dass Platine, Netzteil und Datenleitung zusammenarbeiten.',
						'Eine Farbe wählen und den Effekt „Rainbow“ starten.',
						'Sind Rot und Grün vertauscht, rgb_order im YAML von GRB auf RGB ändern und neu installieren.',
					],
					observe: 'Alle LEDs leuchten in der gewählten Farbe, ohne Flackern.',
					check: 'Blinkt nur die erste LED oder stimmen die Farben nicht, gemeinsame Masse, Streifenrichtung und den Widerstand an DIN prüfen.',
				},
				{
					title: 'Streifen montieren und Szene anlegen',
					actions: [
						'Befestigen Sie den Streifen auf seinem Träger; schneiden Sie ihn nur an den dafür vorgesehenen Markierungen, oft ein Strich oder kleine Kupferflächen, denn ein Schnitt an anderer Stelle zerstört eine LED und unterbricht die Kette.',
						'In Home Assistant eine Szene „Abend“ mit der gewünschten Farbe und Helligkeit anlegen.',
						'Per Automatisierung zur gewünschten Zeit ein sanftes Aufwachen bei Sonnenaufgang programmieren.',
					],
					observe: 'Die Szene lässt sich mit einem Klick abrufen und der Streifen reagiert ohne sichtbare Verzögerung.',
					check: 'Die Temperatur von Netzteil und Adern nach 30 Minuten bei hoher Helligkeit prüfen.',
				},
			],
			haIntegration: [
				'Die Entität „LED strip“ ist ein Standardlicht: Farbe, Helligkeit, Effekte und Zugehörigkeit zu Szenen oder Gruppen.',
				'Die Effekte aus dem YAML erscheinen in der Effektliste der Lichtkarte im Dashboard.',
				'Nützliche Automatisierungen: sanftes Aufwachen, Rückkehr zu einer ruhigen Farbe um Mitternacht oder Blinken des Streifens, wenn es klingelt.',
			],
			troubleshooting: [
				{ problem: 'Der Streifen leuchtet nicht', solution: '5-V-Netzteil, Streifenrichtung (DIN nach DOUT), gemeinsame Masse und den Pin GPIO18 im YAML prüfen.' },
				{ problem: 'Falsche Farben', solution: 'Die Farbreihenfolge Ihres Modells weicht ab. rgb_order: RGB statt GRB versuchen.' },
				{ problem: 'Flackern oder verirrte LEDs', solution: 'Den 330-Ω-Widerstand, den Kondensator an der Versorgung und einen Pegelwandler 3,3 V auf 5 V ergänzen und die Datenleitung kürzen.' },
				{ problem: 'Helligkeitsverlust am Streifenende', solution: 'Der Spannungsabfall ist zu groß. Den Streifen am fernen Ende erneut einspeisen oder dickere Adern verwenden.' },
			],
			faq: [
				{ question: 'Kann ich den Streifen über die Platine versorgen?', answer: 'Nur wenige LEDs. Darüber hinaus übersteigt der Strom, was Platine und USB-Kabel liefern können: ein eigenes 5-V-Netzteil nutzen.' },
				{ question: 'ESPHome oder WLED?', answer: 'ESPHome bindet das Licht in ein Gerät ein, das Sie vollständig kontrollieren; WLED bietet zusätzlich eine reiche, fertige Effektbibliothek, die Home Assistant ebenfalls steuern kann.' },
				{ question: 'Kann ich einen 12-V-Streifen verwenden?', answer: 'Adressierbare 12-V-Streifen haben eine andere Belegung und Versorgung; dieser Aufbau betrifft 5-V-WS2812B.' },
			],
		},
		it: {
			title: `Illuminazione LED WS2812 ESP32 ESPHome`,
			description:
				
				
				`Striscia LED indirizzabile su ESP32-C6 con ESPHome: alimentazione 5 V, resistenza, YAML ed effetti HA. Materiale, schema GPIO, YAML ESPHome e Home Assistan`,
			h1: 'Illuminazione LED WS2812',
			objective:
				'Accenderete una striscia di LED indirizzabili WS2812B, una striscia in cui ogni diodo si comanda singolarmente, sceglierete i colori e farete partire effetti da Home Assistant, il software che riunisce i vostri dispositivi connessi. A pilotarla è un ESP32, una piccola scheda elettronica con Wi-Fi. Il progetto insiste su ciò che separa un montaggio che sfarfalla da uno affidabile: l’alimentazione, la massa comune, la resistenza e il condensatore.',
			usefulness:
				'Create un’illuminazione d’atmosfera sotto un mobile, dietro il televisore o sulla scrivania, con scene preimpostate (film, lettura), un’accensione graduale all’alba e un colore d’allarme, il tutto comandato dalla vostra domotica.',
			prerequisites: [
				'Home Assistant con ESPHome e Wi-Fi nel punto di posa.',
				'Una striscia WS2812B a 5 V (non 12 V o 24 V) con i suoi tre fili: 5V, DIN e GND, e il numero di LED noto.',
				'Un alimentatore 5 V con marchio CE dimensionato per la striscia (calcolo qui sotto).',
			],
			safety:
				'5 V è una bassa tensione senza rischio di scossa, ma la corrente può essere alta: a piena potenza 1 m di striscia da 30 LED assorbe circa 1,8 A. Un filo troppo sottile o un alimentatore sottodimensionato si scalda. Usate un alimentatore CE chiuso e con fusibile, non apritelo, tenetelo all’asciutto e non lasciate la striscia arrotolata su se stessa a piena potenza.',
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Scheda di comando (vedi il riquadro sopra).', productId: 'esp32-c6-devkitc' },
				{ name: 'Striscia LED WS2812B 5 V (30 LED/m)', qty: '1 m o più', note: 'Prendete la versione senza silicone in casa o IP65 in un luogo umido. Ogni LED assorbe al massimo circa 60 mA (3 × 20 mA).', q: true },
				{ name: 'Alimentatore switching 5 V con marchio CE, 3 A per 30 LED', qty: 1, note: 'Prevedete il 20 % di margine sulla corrente: vedi il calcolo nei passaggi.', q: true },
				{ name: 'Condensatore elettrolitico 1000 µF 6,3 V o più', qty: 1, note: 'Montato sull’alimentazione della striscia, con polarità rispettata, per assorbire il picco di corrente all’accensione.', q: true },
				{ name: 'Resistenza 330 Ω', qty: 1, note: 'In serie sulla linea dati, vicino al primo LED.' },
				{ name: 'Convertitore di livello da 3,3 V a 5 V (74AHCT125) — opzionale', qty: '0–1', note: 'Il pin DIN a 5 V si aspetta un segnale sopra circa 3,5 V. I 3,3 V dell’ESP32 spesso funzionano su un filo corto, ma il convertitore evita LED capricciosi.', q: true },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Calcolare l’alimentazione necessaria',
					actions: [
						'Per sapere quale alimentatore comprare, contate prima i LED della striscia: ad esempio 30 LED su 1 metro.',
						'Moltiplicate per 60 mA: 30 × 0,06 A = 1,8 A al massimo, bianco a piena potenza.',
						'Aggiungete il 20 % di margine: 1,8 × 1,2 ≈ 2,2 A, quindi va bene un alimentatore 5 V da 3 A.',
					],
					observe: 'La corrente utile è il valore a piena potenza; in pratica i colori vivi assorbono meno.',
					check: 'Oltre 2 metri di striscia, prevedete di rialimentarla in un secondo punto per evitare cali di luminosità.',
				},
				{
					title: 'Cablare la striscia',
					actions: [
						'Con l’alimentatore a 5 V scollegato, collegatelo alla striscia: il + al filo 5V, il − al filo GND, con fili abbastanza spessi da reggere la corrente, e mettete il condensatore da 1000 µF, un piccolo serbatoio che leviga gli sbalzi di corrente, tra + e − all’inizio della striscia. Rispettate il verso del condensatore: la fascia marcata sul suo corpo indica il lato −.',
						'Collegate GPIO18, uno dei pin metallici allineati sul bordo della scheda (GPIO significa «General Purpose Input Output»), all’ingresso dati DIN della striscia interponendo la resistenza da 330 Ω, il più vicino possibile al primo LED: protegge quel primo LED dai picchi di segnale.',
						'Collegate il GND della striscia al GND della scheda: senza massa comune la striscia non capisce i dati.',
						'Alimentate la scheda con il proprio cavo USB, non dalla striscia.',
					],
					observe: 'Nessun LED si accende per ora: la striscia attende i dati.',
					check: 'Controllate il verso della striscia: la freccia stampata segue il flusso dei dati, da DIN a DOUT.',
				},
				{
					title: 'Provare colori ed effetti',
					actions: [
						'In Home Assistant aprite il dispositivo ESPHome e accendete l’entità «LED strip»: la striscia deve illuminarsi, a conferma che scheda, alimentatore e filo dei dati lavorano insieme.',
						'Scegliete un colore e avviate l’effetto «Rainbow».',
						'Se rosso e verde sono invertiti, cambiate rgb_order da GRB a RGB nello YAML e reinstallate.',
					],
					observe: 'Tutti i LED si accendono nel colore scelto, senza sfarfallio.',
					check: 'Se lampeggia solo il primo LED o i colori sono sbagliati, controllate massa comune, verso della striscia e resistenza su DIN.',
				},
				{
					title: 'Fissare la striscia e creare una scena',
					actions: [
						'Fissate la striscia sul suo supporto; tagliatela solo ai segni previsti a questo scopo, spesso una linea o piccole piazzole di rame, perché un taglio altrove distrugge un LED e interrompe la catena.',
						'In Home Assistant create una scena «Sera» con il colore e la luminosità desiderati.',
						'Programmate un risveglio graduale all’alba con un’automazione all’ora voluta.',
					],
					observe: 'La scena si richiama con un clic e la striscia reagisce senza ritardo visibile.',
					check: 'Controllate la temperatura di alimentatore e fili dopo 30 minuti ad alta luminosità.',
				},
			],
			haIntegration: [
				'L’entità «LED strip» è una luce standard: colore, luminosità, effetti e appartenenza a scene o gruppi.',
				'Gli effetti dello YAML compaiono nell’elenco effetti della scheda luce nella dashboard.',
				'Automazioni utili: risveglio graduale all’alba, ritorno a un colore calmo a mezzanotte o lampeggio della striscia quando suona il campanello.',
			],
			troubleshooting: [
				{ problem: 'La striscia non si accende', solution: 'Controllate l’alimentatore 5 V, il verso della striscia (da DIN a DOUT), la massa comune e il pin GPIO18 nello YAML.' },
				{ problem: 'Colori sbagliati', solution: 'L’ordine dei colori del vostro modello è diverso. Provate rgb_order: RGB al posto di GRB.' },
				{ problem: 'Sfarfallio o LED parassiti', solution: 'Aggiungete la resistenza da 330 Ω, il condensatore sull’alimentazione e un convertitore di livello da 3,3 V a 5 V, e accorciate il filo dati.' },
				{ problem: 'Calo di luminosità a fine striscia', solution: 'La caduta di tensione è eccessiva. Rialimentate la striscia all’estremità opposta o usate fili più spessi.' },
			],
			faq: [
				{ question: 'Posso alimentare la striscia dalla scheda?', answer: 'Solo pochi LED. Oltre, la corrente supera ciò che scheda e cavo USB possono fornire: usate un alimentatore 5 V dedicato.' },
				{ question: 'ESPHome o WLED?', answer: 'ESPHome integra la luce in un dispositivo che controllate interamente; WLED offre in più una ricca libreria di effetti pronti, che Home Assistant sa comandare.' },
				{ question: 'Posso usare una striscia a 12 V?', answer: 'Le strisce indirizzabili a 12 V hanno piedinatura e alimentazione diverse; questo montaggio riguarda le WS2812B a 5 V.' },
			],
		},
		es: {
			title: `Iluminación LED WS2812 ESP32 ESPHome`,
			description:
				
				
				`Tira LED direccionable en ESP32-C6 con ESPHome: alimentación 5 V, resistencia, YAML y efectos en HA. Material, esquema GPIO, YAML ESPHome y Home Assistant.`,
			h1: 'Iluminación LED WS2812',
			objective:
				'Vas a encender una tira de LED direccionables WS2812B, una tira en la que cada diodo se controla por separado, elegir sus colores y lanzar efectos desde Home Assistant, el software que reúne tus dispositivos conectados. La controla un ESP32, una pequeña placa electrónica con Wi-Fi. El proyecto insiste en lo que separa un montaje que parpadea de uno fiable: la alimentación, la masa común, la resistencia y el condensador.',
			usefulness:
				'Creas una iluminación ambiental bajo un mueble, detrás del televisor o en un escritorio, con escenas predefinidas (película, lectura), un encendido gradual al amanecer y un color de alerta, todo controlado por tu domótica.',
			prerequisites: [
				'Home Assistant con ESPHome y Wi-Fi en el lugar de colocación.',
				'Una tira WS2812B de 5 V (no 12 V ni 24 V) con sus tres cables: 5V, DIN y GND, y el número de LED conocido.',
				'Una fuente de 5 V con marcado CE dimensionada para la tira (cálculo más abajo).',
			],
			safety:
				'5 V es baja tensión sin riesgo de descarga, pero la intensidad puede ser alta: a plena potencia, 1 m de tira de 30 LED consume unos 1,8 A. Un cable demasiado fino o una fuente corta se calienta. Usa una fuente CE cerrada y con fusible, no la abras, mantenla seca y no dejes la tira enrollada sobre sí misma a plena potencia.',
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Placa de control (véase el recuadro de arriba).', productId: 'esp32-c6-devkitc' },
				{ name: 'Tira LED WS2812B de 5 V (30 LED/m)', qty: '1 m o más', note: 'Toma la versión sin silicona en interior o IP65 en un lugar húmedo. Cada LED consume como máximo unos 60 mA (3 × 20 mA).', q: true },
				{ name: 'Fuente conmutada de 5 V con marcado CE, 3 A para 30 LED', qty: 1, note: 'Prevé un 20 % de margen de corriente: véase el cálculo en los pasos.', q: true },
				{ name: 'Condensador electrolítico de 1000 µF a 6,3 V o más', qty: 1, note: 'Montado en la alimentación de la tira, respetando la polaridad, para absorber el pico de corriente al encender.', q: true },
				{ name: 'Resistencia de 330 Ω', qty: 1, note: 'En serie en la línea de datos, cerca del primer LED.' },
				{ name: 'Convertidor de nivel de 3,3 V a 5 V (74AHCT125) — opcional', qty: '0–1', note: 'El pin DIN a 5 V espera una señal por encima de unos 3,5 V. Los 3,3 V del ESP32 suelen funcionar con un cable corto, pero el convertidor evita LED caprichosos.', q: true },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Calcular la alimentación necesaria',
					actions: [
						'Para saber qué fuente de alimentación comprar, cuenta primero los LED de la tira: por ejemplo 30 LED en 1 metro.',
						'Multiplica por 60 mA: 30 × 0,06 A = 1,8 A como máximo, blanco a plena potencia.',
						'Añade un 20 % de margen: 1,8 × 1,2 ≈ 2,2 A, por lo que sirve una fuente de 5 V y 3 A.',
					],
					observe: 'La corriente útil es el valor a plena potencia; en la práctica los colores vivos consumen menos.',
					check: 'Más allá de 2 metros de tira, prevé realimentarla en un segundo punto para evitar la pérdida de brillo.',
				},
				{
					title: 'Cablear la tira',
					actions: [
						'Con la fuente de 5 V desconectada, únela a la tira: el + al cable 5V, el − al cable GND, con cables lo bastante gruesos para soportar la corriente, y coloca el condensador de 1000 µF, un pequeño depósito que suaviza los picos de corriente, entre + y − al inicio de la tira. Respeta el sentido del condensador: la franja marcada en su cuerpo indica el lado −.',
						'Une GPIO18, uno de los pines metálicos alineados en el borde de la placa (GPIO significa «General Purpose Input Output»), a la entrada de datos DIN de la tira intercalando la resistencia de 330 Ω, lo más cerca posible del primer LED: protege ese primer LED de los picos de señal.',
						'Conecta el GND de la tira al GND de la placa: sin masa común, la tira no entiende los datos.',
						'Alimenta la placa con su propio cable USB, no desde la tira.',
					],
					observe: 'Ningún LED se enciende todavía: la tira espera los datos.',
					check: 'Comprueba el sentido de la tira: la flecha impresa sigue el flujo de datos, de DIN a DOUT.',
				},
				{
					title: 'Probar colores y efectos',
					actions: [
						'En Home Assistant abre el dispositivo ESPHome y enciende la entidad «LED strip»: la tira debe iluminarse, lo que confirma que la placa, la fuente y el cable de datos trabajan juntos.',
						'Elige un color y lanza el efecto «Rainbow».',
						'Si el rojo y el verde están invertidos, cambia rgb_order de GRB a RGB en el YAML y reinstala.',
					],
					observe: 'Todos los LED se encienden del color elegido, sin parpadeo.',
					check: 'Si solo parpadea el primer LED o los colores son erróneos, revisa la masa común, el sentido de la tira y la resistencia en DIN.',
				},
				{
					title: 'Fijar la tira y crear una escena',
					actions: [
						'Fija la tira en su soporte; córtala solo por las marcas previstas para ello, a menudo una línea o pequeñas almohadillas de cobre, porque un corte en otro sitio destruye un LED e interrumpe la cadena.',
						'En Home Assistant crea una escena «Tarde» con el color y el brillo deseados.',
						'Programa un despertar gradual al amanecer con una automatización a la hora que quieras.',
					],
					observe: 'La escena se activa con un clic y la tira reacciona sin retraso visible.',
					check: 'Comprueba la temperatura de la fuente y de los cables tras 30 minutos con brillo alto.',
				},
			],
			haIntegration: [
				'La entidad «LED strip» es una luz estándar: color, brillo, efectos y pertenencia a escenas o grupos.',
				'Los efectos del YAML aparecen en la lista de efectos de la tarjeta de luz del panel.',
				'Automatizaciones útiles: despertar gradual, volver a un color tranquilo a medianoche o parpadeo de la tira cuando suena el timbre.',
			],
			troubleshooting: [
				{ problem: 'La tira no se enciende', solution: 'Revisa la fuente de 5 V, el sentido de la tira (de DIN a DOUT), la masa común y el pin GPIO18 en el YAML.' },
				{ problem: 'Colores incorrectos', solution: 'El orden de colores de tu modelo es distinto. Prueba rgb_order: RGB en lugar de GRB.' },
				{ problem: 'Parpadeo o LED sueltos', solution: 'Añade la resistencia de 330 Ω, el condensador en la alimentación y un convertidor de nivel de 3,3 V a 5 V, y acorta el cable de datos.' },
				{ problem: 'Pérdida de brillo al final de la tira', solution: 'La caída de tensión es excesiva. Realimenta la tira por el extremo opuesto o usa cables más gruesos.' },
			],
			faq: [
				{ question: '¿Puedo alimentar la tira desde la placa?', answer: 'Solo unos pocos LED. Más allá, la corriente supera lo que la placa y su cable USB pueden dar: usa una fuente de 5 V dedicada.' },
				{ question: '¿ESPHome o WLED?', answer: 'ESPHome integra la luz en un dispositivo que controlas por completo; WLED ofrece además una rica biblioteca de efectos ya hechos, que Home Assistant también sabe controlar.' },
				{ question: '¿Puedo usar una tira de 12 V?', answer: 'Las tiras direccionables de 12 V tienen otra distribución de pines y otra alimentación; este montaje es para WS2812B de 5 V.' },
			],
		},
	},
};
