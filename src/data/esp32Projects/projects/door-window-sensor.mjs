import { esphomeHeader } from '../shared.mjs';

const DOOR = { fr: 'Contact porte', en: 'Door contact', de: 'Türkontakt', it: 'Contatto porta', es: 'Contacto puerta' };
const WIN1 = { fr: 'Contact fenêtre 1', en: 'Window contact 1', de: 'Fensterkontakt 1', it: 'Contatto finestra 1', es: 'Contacto ventana 1' };
const WIN2 = { fr: 'Contact fenêtre 2', en: 'Window contact 2', de: 'Fensterkontakt 2', it: 'Contatto finestra 2', es: 'Contacto ventana 2' };

const yaml =
	esphomeHeader('capteur-ouvertures', 'Door and window sensor') +
	`
binary_sensor:
  - platform: gpio
    name: "Front door"
    pin:
      number: GPIO10
      mode: INPUT_PULLUP         # contact between GPIO10 and GND
    device_class: door           # ON = open, OFF = closed
    filters:
      - delayed_on: 100ms        # ignores contact bounce
      - delayed_off: 100ms

  - platform: gpio
    name: "Window 1"
    pin:
      number: GPIO11
      mode: INPUT_PULLUP
    device_class: window
    filters:
      - delayed_on: 100ms
      - delayed_off: 100ms

  - platform: gpio
    name: "Window 2"
    pin:
      number: GPIO18
      mode: INPUT_PULLUP
    device_class: window
    filters:
      - delayed_on: 100ms
      - delayed_off: 100ms

  - platform: status
    name: "Openings sensor status"

sensor:
  - platform: wifi_signal
    name: "WiFi signal"
    update_interval: 120s
    entity_category: diagnostic
`;

export const project = {
	id: 'door-window-sensor',
	level: 'beginner',
	durationHours: '1–2',
	budgetRange: {
		fr: 'environ 15–35 € selon vendeur',
		en: 'about €15–35 depending on the seller',
		de: 'ca. 15–35 € je nach Händler',
		it: 'circa 15–35 € a seconda del venditore',
		es: 'unos 15–35 € según el vendedor',
	},
	slugs: {
		fr: 'capteur-ouverture-porte-fenetre',
		en: 'door-window-sensor',
		de: 'tuer-fenster-oeffnungssensor',
		it: 'sensore-apertura-porta-finestra',
		es: 'sensor-apertura-puerta-ventana',
	},
	fullGuide: null,
	productIds: ['esp32-c6-devkitc'],
	searchQueries: {
		fr: 'contact magnétique filaire porte fenêtre ILS NO',
		en: 'wired magnetic door window contact reed switch normally open',
		de: 'Magnetkontakt Tür Fenster Reedkontakt Schließer kabelgebunden',
		it: 'contatto magnetico porta finestra filare reed normalmente aperto',
		es: 'contacto magnético cableado puerta ventana reed normalmente abierto',
	},
	smallMaterialIds: ['usb', 'psu', 'dupont', 'terminals', 'resistors', 'enclosure'],
	flashAfter: 1,
	wiring: {
		sensorName: { fr: 'Contacts magnétiques', en: 'Magnetic contacts', de: 'Magnetkontakte', it: 'Contatti magnetici', es: 'Contactos magnéticos' },
		pins: [
			{ gpio: 'GPIO10', signal: 'Contact A', color: 'data', device: DOOR },
			{ gpio: 'GND', signal: 'Contact B', color: 'ground', device: DOOR },
			{ gpio: 'GPIO11', signal: 'Contact A', color: 'data', device: WIN1 },
			{ gpio: 'GND', signal: 'Contact B', color: 'ground', device: WIN1 },
			{ gpio: 'GPIO18', signal: 'Contact A', color: 'data', device: WIN2 },
			{ gpio: 'GND', signal: 'Contact B', color: 'ground', device: WIN2 },
		],
		principleBoxes: {
			fr: [
				{ title: `Contacts`, s: 'Contacts', a: 'Un contact sec par ouverture', b: 'Fermé près de l’aimant, ouvert sinon' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Entrées avec résistance de rappel interne', b: 'Antirebond 100 ms', via: 'GPIO10, GPIO11 et GPIO18 vers GND' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Entités porte et fenêtre (ouvert ou fermé)', b: 'Alerte et coupure du chauffage', via: 'Wi-Fi 2,4 GHz + API chiffrée' },
			],
			en: [
				{ title: 'Magnetic contacts', s: 'Contacts', a: 'One dry contact per opening', b: 'Closed near the magnet, open otherwise' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Inputs with internal pull-up', b: '100 ms debounce', via: 'GPIO10, GPIO11 and GPIO18 to GND' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Door and window entities (open or closed)', b: 'Alert and heating cut-off', via: '2.4 GHz Wi-Fi + encrypted API' },
			],
			de: [
				{ title: 'Magnetkontakte', s: 'Kontakte', a: 'Ein trockener Kontakt pro Öffnung', b: 'Geschlossen am Magneten, sonst offen' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Eingänge mit internem Pull-up', b: '100 ms Entprellung', via: 'GPIO10, GPIO11 und GPIO18 gegen GND' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Tür- und Fensterentitäten (offen oder geschlossen)', b: 'Warnung und Heizung aus', via: '2,4-GHz-WLAN + verschlüsselte API' },
			],
			it: [
				{ title: 'Contatti magnetici', s: 'Contatti', a: 'Un contatto pulito per apertura', b: 'Chiuso vicino al magnete, aperto altrimenti' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Ingressi con pull-up interno', b: 'Antirimbalzo 100 ms', via: 'GPIO10, GPIO11 e GPIO18 verso GND' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Entità porta e finestra (aperto o chiuso)', b: 'Avviso e spegnimento del riscaldamento', via: 'Wi-Fi 2,4 GHz + API cifrata' },
			],
			es: [
				{ title: 'Contactos magnéticos', s: 'Contactos', a: 'Un contacto seco por apertura', b: 'Cerrado junto al imán, abierto si no' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Entradas con pull-up interno', b: 'Antirrebote de 100 ms', via: 'GPIO10, GPIO11 y GPIO18 hacia GND' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Entidades puerta y ventana (abierto o cerrado)', b: 'Alerta y corte de calefacción', via: 'Wi-Fi 2,4 GHz + API cifrada' },
			],
		},
	},
	yaml,
	locales: {
		fr: {
			title: `Capteur ouverture porte ESP32 ESPHome`,
			description:
				
				
				`Surveillez porte ou fenêtre : contact reed, ESP32-C6, ESPHome, câblage, YAML et alerte Home Assistant. Matériel, schéma GPIO, YAML ESPHome et Home Assistan`,
			h1: 'Capteur d’ouverture de porte et fenêtre',
			objective:
				'Vous allez relier jusqu’à trois contacts magnétiques, un pour une porte et deux pour des fenêtres, à un seul ESP32, une petite carte électronique équipée du Wi-Fi, et voir leur état ouvert ou fermé dans Home Assistant, le logiciel qui réunit vos appareils connectés. Un contact magnétique est un petit interrupteur que l’approche d’un aimant referme. Le montage est alimenté par USB : il convient à une pièce où l’on peut tirer un câble depuis la carte jusqu’aux ouvrants.',
			usefulness:
				'Vous savez si une fenêtre est restée ouverte alors que le chauffage tourne, vous êtes prévenu à l’ouverture d’une porte et vous pouvez même déclencher une lumière. Le contact magnétique est pour cela la source d’information la plus simple et la plus fiable : il ne dépend ni de la lumière ni du bruit, seulement de la position réelle de la porte ou de la fenêtre.',
			prerequisites: [
				'Home Assistant avec ESPHome, et une prise USB à proximité de la carte.',
				'Des contacts magnétiques d’alarme filaires à contact normalement ouvert (fermé quand l’aimant est en face), avec leur notice pour la distance maximale.',
				'Du câble de signal à deux conducteurs jusqu’à chaque ouvrant (quelques mètres).',
			],
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Carte de commande (voir l’encadré plus haut).', productId: 'esp32-c6-devkitc' },
				{ name: 'Contact magnétique filaire (ILS) à contact normalement ouvert', qty: '1 à 3', note: 'Un par porte ou fenêtre. Vérifiez la distance maximale entre l’aimant et le contact dans la notice.', q: true },
				{ name: 'Câble de signal 2 conducteurs', qty: '2 à 10 m par contact', note: 'Basse tension uniquement ; évitez de le faire cheminer au contact des câbles du secteur.', q: true },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Câbler les contacts',
					actions: [
						'Alimentation USB débranchée, reliez l’un des deux fils de chaque contact à GND, la masse, ou à un fil commun qui rejoint GND, ce qui économise du câble.',
						'Reliez l’autre fil du contact de la porte à GPIO10, celui de la fenêtre 1 à GPIO11 et celui de la fenêtre 2 à GPIO18 : ce sont des GPIO, les broches métalliques alignées sur le bord de la carte, et chaque contact en occupe une.',
						'Pour le test, posez chaque contact sur le bureau avec son aimant.',
					],
					observe: 'Chaque contact est un simple interrupteur sec, sans tension propre.',
					check: 'Chaque contact est branché entre une broche GPIO et GND, jamais sur 3V3 ni sur 5V.',
				},
				{
					title: 'Tester l’état de chaque contact',
					actions: [
						'Dans Home Assistant, ouvrez l’appareil ESPHome : « Front door », « Window 1 » et « Window 2 » apparaissent, un par contact.',
						'Approchez l’aimant d’un contact : l’état passe à « Fermé » ; éloignez-le : « Ouvert ».',
						'Répétez pour chacun des trois contacts.',
					],
					observe: 'L’état change instantanément, sans rebond visible.',
					check: 'Si l’état est inversé (contact normalement fermé), ajoutez « inverted: true » à la broche concernée.',
				},
				{
					title: 'Fixer les contacts sur les ouvrants',
					actions: [
						'Fixez le contact sur le cadre fixe et l’aimant sur la partie mobile, face à face avec un écart de quelques millimètres quand la porte ou la fenêtre est fermée : au-delà de la distance indiquée dans la notice, le contact ne détecterait plus l’aimant.',
						'Fermez l’ouvrant et vérifiez que l’entité passe à « Fermé » ; ouvrez-le de quelques centimètres : « Ouvert ».',
						'Fixez et protégez le câble, puis reliez-le à la carte par un bornier.',
					],
					observe: 'L’entité change d’état dès l’ouverture de quelques centimètres.',
					check: 'Si la détection est capricieuse, rapprochez l’aimant ou vérifiez l’alignement : l’écart maximal dépend du modèle.',
				},
				{
					title: 'Créer l’alerte « fenêtre oubliée »',
					actions: [
						'Une automatisation est une règle du type « si… alors… » que Home Assistant applique seul. Ouvrez Paramètres → Automatisations et scènes → Créer une automatisation.',
						'Déclencheur : « Window 1 » reste « on » pendant 10 minutes. Condition (facultative) : température extérieure inférieure à 10 °C. Action : notification sur le téléphone.',
						'Testez en laissant la fenêtre ouverte plus de 10 minutes.',
					],
					observe: 'La notification arrive après 10 minutes d’ouverture seulement.',
					check: 'Fermez la fenêtre : aucune notification ne doit arriver ensuite.',
				},
			],
			haIntegration: [
				'Avec la classe « porte » ou « fenêtre », Home Assistant affiche « Ouvert » ou « Fermé » et la bonne icône, sans configuration supplémentaire.',
				'Utilisez ces entités comme conditions : par exemple, ne pas allumer le chauffage d’une pièce tant que sa fenêtre est ouverte.',
				'Le tableau de bord peut regrouper les trois entités dans une carte « Ouvertures » pour voir l’état de la maison d’un coup d’œil.',
			],
			troubleshooting: [
				{ problem: 'L’état est inversé', solution: 'Votre contact est normalement fermé : ajoutez « inverted: true » à la broche ou changez de contact.' },
				{ problem: 'Changements d’état intempestifs', solution: 'Le câble capte des parasites. Rapprochez la carte, éloignez le câble des lignes secteur, ajoutez une résistance de rappel externe de 10 kΩ vers 3V3 et augmentez delayed_on.' },
				{ problem: 'Le contact ne détecte pas l’aimant', solution: 'L’écart est trop grand ou l’aimant est mal orienté. Consultez la notice du contact et rapprochez les deux éléments.' },
				{ problem: 'Aucune entité dans Home Assistant', solution: 'Contrôlez la connexion Wi-Fi de la carte et le journal ESPHome pour les erreurs de configuration.' },
			],
			faq: [
				{ question: 'Puis-je l’alimenter par pile ?', answer: 'Pas avec ce montage : le Wi-Fi consomme beaucoup. Pour une ouverture sans fil sur pile, un capteur Zigbee du commerce est plus adapté.' },
				{ question: 'Combien de contacts puis-je brancher ?', answer: 'Autant que de broches d’entrée libres sur la carte ; trois sont montrés ici, mais l’ESP32-C6 en a d’autres, hors broches réservées au démarrage.' },
				{ question: 'Ce système sert-il d’alarme ?', answer: 'Il informe, mais il ne remplace pas une alarme certifiée : il dépend du Wi-Fi, du serveur et de l’alimentation.' },
			],
		},
		en: {
			title: `Door/window sensor ESP32 ESPHome`,
			description:
				
				
				`Monitor a door or window: reed switch, ESP32-C6, ESPHome, wiring, YAML and Home Assistant alerts. Parts list, GPIO wiring, ESPHome YAML and Home Assistant.`,
			h1: 'Door and window opening sensor',
			objective:
				'You will connect up to three magnetic contacts, one for a door and two for windows, to a single ESP32, a small electronic board with Wi-Fi, and see their open or closed state in Home Assistant, the software that gathers your connected devices. A magnetic contact is a small switch that closes when a magnet comes near. The build is powered over USB: it suits a room where you can run a cable from the board to the doors and windows.',
			usefulness:
				'You know whether a window was left open while the heating is on, you are alerted when a door opens and you can even trigger a light. The magnetic contact is the simplest and most reliable source of information for this: it depends neither on light nor on noise, only on the real position of the door or window.',
			prerequisites: [
				'Home Assistant with ESPHome, and a USB outlet near the board.',
				'Wired alarm-type magnetic contacts with a normally open contact (closed when the magnet is in front), with their datasheet for the maximum gap.',
				'Two-conductor signal cable to each opening (a few metres).',
			],
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Control board (see the box above).', productId: 'esp32-c6-devkitc' },
				{ name: 'Wired magnetic contact (reed) with normally open contact', qty: '1 to 3', note: 'One per door or window. Check the maximum magnet-to-contact gap in the datasheet.', q: true },
				{ name: '2-conductor signal cable', qty: '2 to 10 m per contact', note: 'Low voltage only; avoid running it alongside mains cables.', q: true },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Wire the contacts',
					actions: [
						'With the USB power unplugged, connect one of each contact’s two wires to GND, the ground, or to a common wire that joins GND, which saves cable.',
						'Connect the other wire of the door contact to GPIO10, window 1’s to GPIO11 and window 2’s to GPIO18: these are GPIOs, the metal pins lined up along the edge of the board, and each contact uses one.',
						'For the test, place each contact on the desk with its magnet.',
					],
					observe: 'Each contact is a plain dry switch, with no voltage of its own.',
					check: 'Each contact is wired between a GPIO pin and GND, never on 3V3 or 5V.',
				},
				{
					title: 'Test every contact’s state',
					actions: [
						'In Home Assistant, open the ESPHome device: “Front door”, “Window 1” and “Window 2” appear, one per contact.',
						'Bring the magnet near a contact: the state goes “Closed”; move it away: “Open”.',
						'Repeat for each of the three contacts.',
					],
					observe: 'The state changes instantly, with no visible bounce.',
					check: 'If the state is inverted (normally closed contact), add “inverted: true” to that pin.',
				},
				{
					title: 'Fix the contacts on the openings',
					actions: [
						'Fix the contact on the fixed frame and the magnet on the moving part, face to face with a gap of a few millimetres when the door or window is closed: beyond the distance given in the instructions, the contact would no longer sense the magnet.',
						'Close the opening and check the entity goes “Closed”; open it a few centimetres: “Open”.',
						'Fix and protect the cable, then connect it to the board with a terminal block.',
					],
					observe: 'The entity changes state as soon as the opening moves a few centimetres.',
					check: 'If detection is erratic, bring the magnet closer or check alignment: the maximum gap depends on the model.',
				},
				{
					title: 'Create the “forgotten window” alert',
					actions: [
						'An automation is an “if… then…” rule that Home Assistant applies by itself. Open Settings → Automations & scenes → Create automation.',
						'Trigger: “Window 1” stays “on” for 10 minutes. Condition (optional): outdoor temperature below 10 °C. Action: phone notification.',
						'Test by leaving the window open for more than 10 minutes.',
					],
					observe: 'The notification arrives only after 10 minutes open.',
					check: 'Close the window: no notification must follow.',
				},
			],
			haIntegration: [
				'With the “door” or “window” class, Home Assistant shows “Open” or “Closed” and the right icon with no extra setup.',
				'Use these entities as conditions: for example, do not turn on a room’s heating while its window is open.',
				'A dashboard card “Openings” can group the three entities to see the state of the house at a glance.',
			],
			troubleshooting: [
				{ problem: 'The state is inverted', solution: 'Your contact is normally closed: add “inverted: true” to the pin or change the contact.' },
				{ problem: 'Spurious state changes', solution: 'The cable picks up noise. Move the board closer, keep the cable away from mains lines, add a 10 kΩ external pull-up to 3V3 and raise delayed_on.' },
				{ problem: 'The contact does not detect the magnet', solution: 'The gap is too large or the magnet is badly oriented. Check the contact datasheet and bring both parts closer.' },
				{ problem: 'No entity in Home Assistant', solution: 'Check the board’s Wi-Fi connection and the ESPHome log for configuration errors.' },
			],
			faq: [
				{ question: 'Can I power it with a battery?', answer: 'Not with this build: Wi-Fi uses a lot of power. For a wireless battery-powered opening sensor a commercial Zigbee sensor is a better fit.' },
				{ question: 'How many contacts can I connect?', answer: 'As many as there are free input pins on the board; three are shown here, but the ESP32-C6 has more, apart from boot-reserved pins.' },
				{ question: 'Does it work as an alarm?', answer: 'It informs but does not replace a certified alarm: it depends on Wi-Fi, the server and power.' },
			],
		},
		de: {
			title: `Tür-/Fenstersensor ESP32 ESPHome`,
			description:
				
				
				`Tür oder Fenster überwachen: Reed-Kontakt, ESP32-C6, ESPHome, Verdrahtung, YAML und Home-Assistant-Alarm. Material, GPIO-Plan, ESPHome-YAML und Home Assist`,
			h1: 'Tür- und Fensteröffnungssensor',
			objective:
				'Sie verbinden bis zu drei Magnetkontakte, einen für eine Tür und zwei für Fenster, mit einem einzigen ESP32, einer kleinen Elektronikplatine mit WLAN, und sehen ihren Zustand offen oder geschlossen in Home Assistant, der Software, die Ihre vernetzten Geräte vereint. Ein Magnetkontakt ist ein kleiner Schalter, der schließt, wenn sich ein Magnet nähert. Der Aufbau wird per USB versorgt: Er passt in einen Raum, in dem Sie von der Platine aus ein Kabel zu Türen und Fenstern ziehen können.',
			usefulness:
				'Sie wissen, ob ein Fenster bei laufender Heizung offen geblieben ist, werden beim Öffnen einer Tür benachrichtigt und können sogar ein Licht auslösen. Der Magnetkontakt ist dafür die einfachste und zuverlässigste Informationsquelle: Er hängt weder von Licht noch von Geräuschen ab, sondern allein von der tatsächlichen Stellung von Tür oder Fenster.',
			prerequisites: [
				'Home Assistant mit ESPHome und eine USB-Steckdose nahe der Platine.',
				'Kabelgebundene Alarm-Magnetkontakte mit Schließer (geschlossen, wenn der Magnet gegenübersteht), samt Datenblatt für den maximalen Abstand.',
				'Zweiadriges Signalkabel zu jeder Öffnung (einige Meter).',
			],
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Steuerplatine (siehe Kasten oben).', productId: 'esp32-c6-devkitc' },
				{ name: 'Kabelgebundener Magnetkontakt (Reed) mit Schließer', qty: '1 bis 3', note: 'Einer pro Tür oder Fenster. Den maximalen Abstand zwischen Magnet und Kontakt im Datenblatt prüfen.', q: true },
				{ name: 'Zweiadriges Signalkabel', qty: '2 bis 10 m pro Kontakt', note: 'Nur Kleinspannung; nicht neben Netzleitungen verlegen.', q: true },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Kontakte verdrahten',
					actions: [
						'Verbinden Sie bei abgezogener USB-Stromversorgung jeweils eine der beiden Adern jedes Kontakts mit GND, der Masse, oder mit einer gemeinsamen Ader, die zu GND führt und Kabel spart.',
						'Verbinden Sie die andere Ader des Türkontakts mit GPIO10, die von Fenster 1 mit GPIO11 und die von Fenster 2 mit GPIO18: Das sind GPIOs, die metallenen Pins am Rand der Platine, und jeder Kontakt belegt einen davon.',
						'Für den Test jeden Kontakt mit seinem Magneten auf den Schreibtisch legen.',
					],
					observe: 'Jeder Kontakt ist ein einfacher trockener Schalter ohne eigene Spannung.',
					check: 'Jeder Kontakt liegt zwischen einem GPIO-Pin und GND, nie an 3V3 oder 5V.',
				},
				{
					title: 'Zustand jedes Kontakts testen',
					actions: [
						'Öffnen Sie in Home Assistant das ESPHome-Gerät: „Front door“, „Window 1“ und „Window 2“ erscheinen, eines pro Kontakt.',
						'Den Magneten an einen Kontakt halten: Der Zustand wechselt auf „Geschlossen“; wegnehmen: „Offen“.',
						'Für alle drei Kontakte wiederholen.',
					],
					observe: 'Der Zustand wechselt sofort, ohne sichtbares Prellen.',
					check: 'Ist der Zustand invertiert (Öffner-Kontakt), „inverted: true“ am betreffenden Pin ergänzen.',
				},
				{
					title: 'Kontakte an den Öffnungen befestigen',
					actions: [
						'Befestigen Sie den Kontakt am festen Rahmen und den Magneten am beweglichen Teil, gegenüber mit wenigen Millimetern Abstand bei geschlossener Tür oder geschlossenem Fenster: Jenseits des in der Anleitung genannten Abstands würde der Kontakt den Magneten nicht mehr erkennen.',
						'Die Öffnung schließen und prüfen, dass die Entität auf „Geschlossen“ geht; einige Zentimeter öffnen: „Offen“.',
						'Das Kabel befestigen und schützen und dann mit einer Klemme an die Platine anschließen.',
					],
					observe: 'Die Entität wechselt, sobald sich die Öffnung einige Zentimeter bewegt.',
					check: 'Erkennt der Kontakt unzuverlässig, den Magneten näher setzen oder die Ausrichtung prüfen: Der maximale Abstand hängt vom Modell ab.',
				},
				{
					title: 'Die Warnung „Fenster vergessen“ anlegen',
					actions: [
						'Eine Automatisierung ist eine „Wenn … dann …“-Regel, die Home Assistant selbstständig anwendet. Öffnen Sie Einstellungen → Automatisierungen & Szenen → Automatisierung erstellen.',
						'Auslöser: „Window 1“ bleibt 10 Minuten „an“. Bedingung (optional): Außentemperatur unter 10 °C. Aktion: Handy-Benachrichtigung.',
						'Testen, indem das Fenster länger als 10 Minuten offen bleibt.',
					],
					observe: 'Die Benachrichtigung kommt erst nach 10 Minuten offen.',
					check: 'Das Fenster schließen: Danach darf keine Benachrichtigung folgen.',
				},
			],
			haIntegration: [
				'Mit der Klasse „Tür“ oder „Fenster“ zeigt Home Assistant „Offen“ oder „Geschlossen“ und das passende Symbol ohne weitere Einrichtung.',
				'Diese Entitäten als Bedingungen nutzen: etwa die Heizung eines Raums nicht einschalten, solange sein Fenster offen ist.',
				'Eine Dashboard-Karte „Öffnungen“ kann die drei Entitäten bündeln und den Zustand des Hauses auf einen Blick zeigen.',
			],
			troubleshooting: [
				{ problem: 'Der Zustand ist invertiert', solution: 'Ihr Kontakt ist ein Öffner: „inverted: true“ am Pin ergänzen oder den Kontakt tauschen.' },
				{ problem: 'Ungewollte Zustandswechsel', solution: 'Das Kabel fängt Störungen ein. Die Platine näher setzen, das Kabel von Netzleitungen fernhalten, einen externen 10-kΩ-Pull-up nach 3V3 setzen und delayed_on erhöhen.' },
				{ problem: 'Der Kontakt erkennt den Magneten nicht', solution: 'Der Abstand ist zu groß oder der Magnet falsch ausgerichtet. Das Datenblatt prüfen und beide Teile näher bringen.' },
				{ problem: 'Keine Entität in Home Assistant', solution: 'Die WLAN-Verbindung der Platine und das ESPHome-Log auf Konfigurationsfehler prüfen.' },
			],
			faq: [
				{ question: 'Geht Batteriebetrieb?', answer: 'Nicht mit diesem Aufbau: Das WLAN braucht viel Strom. Für einen funkenden Batteriesensor passt ein handelsüblicher Zigbee-Sensor besser.' },
				{ question: 'Wie viele Kontakte kann ich anschließen?', answer: 'So viele, wie freie Eingangspins auf der Platine sind; hier sind drei gezeigt, der ESP32-C6 hat mehr, abgesehen von den beim Start reservierten Pins.' },
				{ question: 'Taugt das System als Alarm?', answer: 'Es informiert, ersetzt aber keine zertifizierte Alarmanlage: Es hängt von WLAN, Server und Strom ab.' },
			],
		},
		it: {
			title: `Sensore apertura porta ESP32 ESPHome`,
			description:
				
				
				`Monitorate porta o finestra: contatto reed, ESP32-C6, ESPHome, cablaggio, YAML e avviso Home Assistant. Materiale, schema GPIO, YAML ESPHome e Home Assista`,
			h1: 'Sensore di apertura porta e finestra',
			objective:
				'Collegherete fino a tre contatti magnetici, uno per una porta e due per finestre, a un solo ESP32, una piccola scheda elettronica con Wi-Fi, e vedrete il loro stato aperto o chiuso in Home Assistant, il software che riunisce i vostri dispositivi connessi. Un contatto magnetico è un piccolo interruttore che si chiude quando si avvicina un magnete. Il montaggio è alimentato via USB: va bene per una stanza in cui si può tirare un cavo dalla scheda fino a porte e finestre.',
			usefulness:
				'Sapete se una finestra è rimasta aperta mentre il riscaldamento è acceso, siete avvisati all’apertura di una porta e potete perfino far accendere una luce. Il contatto magnetico è la fonte di informazione più semplice e affidabile per questo scopo: non dipende né dalla luce né dal rumore, ma solo dalla posizione reale di porta o finestra.',
			prerequisites: [
				'Home Assistant con ESPHome e una presa USB vicino alla scheda.',
				'Contatti magnetici d’allarme cablati con contatto normalmente aperto (chiuso quando il magnete è di fronte), con la scheda tecnica per la distanza massima.',
				'Cavo di segnale a due conduttori fino a ogni infisso (qualche metro).',
			],
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Scheda di comando (vedi il riquadro sopra).', productId: 'esp32-c6-devkitc' },
				{ name: 'Contatto magnetico cablato (reed) con contatto normalmente aperto', qty: 'da 1 a 3', note: 'Uno per porta o finestra. Verificate nella scheda tecnica la distanza massima tra magnete e contatto.', q: true },
				{ name: 'Cavo di segnale a 2 conduttori', qty: 'da 2 a 10 m per contatto', note: 'Solo bassa tensione; evitate di farlo correre accanto ai cavi di rete.', q: true },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Cablare i contatti',
					actions: [
						'Con l’alimentazione USB scollegata, collegate uno dei due fili di ogni contatto a GND, la massa, oppure a un filo comune che raggiunge GND, così risparmiate cavo.',
						'Collegate l’altro filo del contatto della porta a GPIO10, quello della finestra 1 a GPIO11 e quello della finestra 2 a GPIO18: sono GPIO, i pin metallici allineati sul bordo della scheda, e ogni contatto ne occupa uno.',
						'Per la prova, appoggiate ogni contatto sulla scrivania con il suo magnete.',
					],
					observe: 'Ogni contatto è un semplice interruttore pulito, senza tensione propria.',
					check: 'Ogni contatto è collegato tra un pin GPIO e GND, mai su 3V3 o 5V.',
				},
				{
					title: 'Provare lo stato di ogni contatto',
					actions: [
						'In Home Assistant aprite il dispositivo ESPHome: compaiono «Front door», «Window 1» e «Window 2», uno per contatto.',
						'Avvicinate il magnete a un contatto: lo stato passa a «Chiuso»; allontanatelo: «Aperto».',
						'Ripetete per ciascuno dei tre contatti.',
					],
					observe: 'Lo stato cambia subito, senza rimbalzi visibili.',
					check: 'Se lo stato è invertito (contatto normalmente chiuso), aggiungete «inverted: true» al pin interessato.',
				},
				{
					title: 'Fissare i contatti sugli infissi',
					actions: [
						'Fissate il contatto sul telaio fisso e il magnete sulla parte mobile, uno di fronte all’altro con qualche millimetro di distanza a porta o finestra chiusa: oltre la distanza indicata nelle istruzioni, il contatto non rileverebbe più il magnete.',
						'Chiudete l’infisso e verificate che l’entità passi a «Chiuso»; apritelo di qualche centimetro: «Aperto».',
						'Fissate e proteggete il cavo, poi collegatelo alla scheda con un morsetto.',
					],
					observe: 'L’entità cambia stato appena l’infisso si sposta di qualche centimetro.',
					check: 'Se il rilevamento è incostante, avvicinate il magnete o verificate l’allineamento: la distanza massima dipende dal modello.',
				},
				{
					title: 'Creare l’avviso «finestra dimenticata»',
					actions: [
						'Un’automazione è una regola del tipo «se… allora…» che Home Assistant applica da solo. Aprite Impostazioni → Automazioni e scene → Crea automazione.',
						'Attivatore: «Window 1» resta «on» per 10 minuti. Condizione (facoltativa): temperatura esterna sotto i 10 °C. Azione: notifica sul telefono.',
						'Provate lasciando la finestra aperta più di 10 minuti.',
					],
					observe: 'La notifica arriva solo dopo 10 minuti di apertura.',
					check: 'Chiudete la finestra: non deve arrivare alcuna notifica dopo.',
				},
			],
			haIntegration: [
				'Con la classe «porta» o «finestra», Home Assistant mostra «Aperto» o «Chiuso» e l’icona giusta senza altra configurazione.',
				'Usate queste entità come condizioni: ad esempio non accendere il riscaldamento di una stanza finché la sua finestra è aperta.',
				'Una scheda della dashboard «Aperture» può raggruppare le tre entità per vedere lo stato della casa a colpo d’occhio.',
			],
			troubleshooting: [
				{ problem: 'Lo stato è invertito', solution: 'Il vostro contatto è normalmente chiuso: aggiungete «inverted: true» al pin o cambiate contatto.' },
				{ problem: 'Cambi di stato intempestivi', solution: 'Il cavo capta disturbi. Avvicinate la scheda, allontanate il cavo dalle linee di rete, aggiungete un pull-up esterno da 10 kΩ verso 3V3 e aumentate delayed_on.' },
				{ problem: 'Il contatto non rileva il magnete', solution: 'La distanza è troppo grande o il magnete è orientato male. Consultate la scheda tecnica e avvicinate i due elementi.' },
				{ problem: 'Nessuna entità in Home Assistant', solution: 'Controllate la connessione Wi-Fi della scheda e il log di ESPHome per errori di configurazione.' },
			],
			faq: [
				{ question: 'Posso alimentarlo a batteria?', answer: 'Non con questo montaggio: il Wi-Fi consuma molto. Per un sensore di apertura wireless a batteria è più adatto un sensore Zigbee in commercio.' },
				{ question: 'Quanti contatti posso collegare?', answer: 'Tanti quanti sono i pin d’ingresso liberi sulla scheda; qui ne sono mostrati tre, ma l’ESP32-C6 ne ha altri, esclusi i pin riservati all’avvio.' },
				{ question: 'Funziona come allarme?', answer: 'Informa, ma non sostituisce un allarme certificato: dipende da Wi-Fi, server e alimentazione.' },
			],
		},
		es: {
			title: `Sensor apertura puerta ESP32 ESPHome`,
			description:
				
				
				`Vigila puerta o ventana: contacto reed, ESP32-C6, ESPHome, cableado, YAML y alerta en Home Assistant. Material, esquema GPIO, YAML ESPHome y Home Assistant`,
			h1: 'Sensor de apertura de puerta y ventana',
			objective:
				'Vas a conectar hasta tres contactos magnéticos, uno para una puerta y dos para ventanas, a un solo ESP32, una pequeña placa electrónica con Wi-Fi, y verás su estado abierto o cerrado en Home Assistant, el software que reúne tus dispositivos conectados. Un contacto magnético es un pequeño interruptor que se cierra cuando se acerca un imán. El montaje se alimenta por USB: sirve para una estancia en la que se pueda tender un cable desde la placa hasta puertas y ventanas.',
			usefulness:
				'Sabes si una ventana se ha quedado abierta con la calefacción encendida, recibes un aviso cuando se abre una puerta e incluso puedes activar una luz. El contacto magnético es para ello la fuente de información más sencilla y fiable: no depende de la luz ni del ruido, solo de la posición real de la puerta o la ventana.',
			prerequisites: [
				'Home Assistant con ESPHome y una toma USB cerca de la placa.',
				'Contactos magnéticos de alarma cableados con contacto normalmente abierto (cerrado cuando el imán está enfrente), con su ficha para la distancia máxima.',
				'Cable de señal de dos conductores hasta cada abertura (unos metros).',
			],
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Placa de control (véase el recuadro de arriba).', productId: 'esp32-c6-devkitc' },
				{ name: 'Contacto magnético cableado (reed) con contacto normalmente abierto', qty: '1 a 3', note: 'Uno por puerta o ventana. Comprueba en la ficha la distancia máxima entre imán y contacto.', q: true },
				{ name: 'Cable de señal de 2 conductores', qty: '2 a 10 m por contacto', note: 'Solo baja tensión; evita tenderlo junto a cables de red.', q: true },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Cablear los contactos',
					actions: [
						'Con la alimentación USB desconectada, une uno de los dos cables de cada contacto a GND, la masa, o a un cable común que llegue a GND, con lo que ahorras cable.',
						'Une el otro cable del contacto de la puerta a GPIO10, el de la ventana 1 a GPIO11 y el de la ventana 2 a GPIO18: son GPIO, los pines metálicos alineados en el borde de la placa, y cada contacto ocupa uno.',
						'Para la prueba, deja cada contacto sobre la mesa con su imán.',
					],
					observe: 'Cada contacto es un simple interruptor seco, sin tensión propia.',
					check: 'Cada contacto está entre un pin GPIO y GND, nunca en 3V3 ni en 5V.',
				},
				{
					title: 'Probar el estado de cada contacto',
					actions: [
						'En Home Assistant abre el dispositivo ESPHome: aparecen «Front door», «Window 1» y «Window 2», uno por contacto.',
						'Acerca el imán a un contacto: el estado pasa a «Cerrado»; aléjalo: «Abierto».',
						'Repite con cada uno de los tres contactos.',
					],
					observe: 'El estado cambia al instante, sin rebote visible.',
					check: 'Si el estado está invertido (contacto normalmente cerrado), añade «inverted: true» al pin correspondiente.',
				},
				{
					title: 'Fijar los contactos en las aberturas',
					actions: [
						'Fija el contacto en el marco fijo y el imán en la parte móvil, enfrentados con unos milímetros de separación con la puerta o la ventana cerrada: más allá de la distancia indicada en las instrucciones, el contacto dejaría de detectar el imán.',
						'Cierra la abertura y comprueba que la entidad pase a «Cerrado»; ábrela unos centímetros: «Abierto».',
						'Fija y protege el cable y conéctalo a la placa con una regleta.',
					],
					observe: 'La entidad cambia de estado en cuanto la abertura se mueve unos centímetros.',
					check: 'Si la detección es irregular, acerca el imán o revisa la alineación: la distancia máxima depende del modelo.',
				},
				{
					title: 'Crear la alerta «ventana olvidada»',
					actions: [
						'Una automatización es una regla del tipo «si… entonces…» que Home Assistant aplica por sí solo. Abre Ajustes → Automatizaciones y escenas → Crear automatización.',
						'Disparador: «Window 1» permanece «on» durante 10 minutos. Condición (opcional): temperatura exterior inferior a 10 °C. Acción: notificación al móvil.',
						'Prueba dejando la ventana abierta más de 10 minutos.',
					],
					observe: 'La notificación llega solo tras 10 minutos abierta.',
					check: 'Cierra la ventana: después no debe llegar ninguna notificación.',
				},
			],
			haIntegration: [
				'Con la clase «puerta» o «ventana», Home Assistant muestra «Abierto» o «Cerrado» y el icono correcto sin configuración adicional.',
				'Usa estas entidades como condiciones: por ejemplo, no encender la calefacción de una habitación mientras su ventana esté abierta.',
				'Una tarjeta del panel «Aberturas» puede agrupar las tres entidades para ver el estado de la casa de un vistazo.',
			],
			troubleshooting: [
				{ problem: 'El estado está invertido', solution: 'Tu contacto es normalmente cerrado: añade «inverted: true» al pin o cambia de contacto.' },
				{ problem: 'Cambios de estado intempestivos', solution: 'El cable capta ruido. Acerca la placa, aleja el cable de las líneas de red, añade una pull-up externa de 10 kΩ hacia 3V3 y aumenta delayed_on.' },
				{ problem: 'El contacto no detecta el imán', solution: 'La distancia es demasiado grande o el imán está mal orientado. Consulta la ficha del contacto y acerca ambas piezas.' },
				{ problem: 'No aparece ninguna entidad en Home Assistant', solution: 'Revisa la conexión Wi-Fi de la placa y el log de ESPHome en busca de errores de configuración.' },
			],
			faq: [
				{ question: '¿Puedo alimentarlo con pilas?', answer: 'No con este montaje: el Wi-Fi consume mucho. Para un sensor de apertura inalámbrico con pila encaja mejor un sensor Zigbee comercial.' },
				{ question: '¿Cuántos contactos puedo conectar?', answer: 'Tantos como pines de entrada libres tenga la placa; aquí se muestran tres, pero el ESP32-C6 tiene más, salvo los pines reservados al arranque.' },
				{ question: '¿Sirve como alarma?', answer: 'Informa, pero no sustituye a una alarma certificada: depende del Wi-Fi, del servidor y de la alimentación.' },
			],
		},
	},
};
