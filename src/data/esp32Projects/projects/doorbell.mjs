import { esphomeHeader } from '../shared.mjs';

const BUTTON = { fr: 'Bouton poussoir', en: 'Push button', de: 'Taster', it: 'Pulsante', es: 'Pulsador' };
const BUZZER = { fr: 'Buzzer passif', en: 'Passive buzzer', de: 'Passiver Buzzer', it: 'Buzzer passivo', es: 'Zumbador pasivo' };

const yaml =
	esphomeHeader('sonnette-connectee', 'Smart doorbell') +
	`
output:
  - platform: ledc
    pin: GPIO18                  # passive buzzer, driven by PWM
    id: buzzer_out

rtttl:
  output: buzzer_out
  id: doorbell_tone
  gain: 0.6                      # volume, from 0.0 to 1.0

switch:
  - platform: template
    name: "Doorbell mute"
    id: doorbell_mute
    optimistic: true
    restore_mode: RESTORE_DEFAULT_OFF

binary_sensor:
  - platform: gpio
    name: "Doorbell button"
    id: doorbell_button
    pin:
      number: GPIO10
      mode: INPUT_PULLUP         # button between GPIO10 and GND
      inverted: true             # pressed = ON
    filters:
      - delayed_on: 50ms         # ignores contact bounce and brief noise
      - delayed_off: 50ms
    on_press:
      - if:
          condition:
            switch.is_off: doorbell_mute
          then:
            - rtttl.play: "doorbell:d=4,o=5,b=160:e6,c6,e6,2c6"

  - platform: status
    name: "Doorbell status"

sensor:
  - platform: wifi_signal
    name: "WiFi signal"
    update_interval: 120s
    entity_category: diagnostic
`;

export const project = {
	id: 'doorbell',
	level: 'beginner',
	durationHours: '1–2',
	budgetRange: {
		fr: 'environ 15–30 € selon vendeur',
		en: 'about €15–30 depending on the seller',
		de: 'ca. 15–30 € je nach Händler',
		it: 'circa 15–30 € a seconda del venditore',
		es: 'unos 15–30 € según el vendedor',
	},
	slugs: {
		fr: 'sonnette-connectee',
		en: 'smart-doorbell',
		de: 'smarte-tuerklingel',
		it: 'campanello-connesso',
		es: 'timbre-conectado',
	},
	fullGuide: null,
	productIds: ['esp32-c6-devkitc'],
	searchQueries: {
		fr: 'bouton poussoir étanche IP65 12mm',
		en: 'waterproof momentary push button IP65 12mm',
		de: 'wasserdichter Taster IP65 12mm',
		it: 'pulsante impermeabile IP65 12mm momentaneo',
		es: 'pulsador impermeable IP65 12mm momentáneo',
	},
	smallMaterialIds: ['usb', 'psu', 'dupont', 'breadboard', 'resistors', 'heatshrink', 'enclosure'],
	flashAfter: 1,
	wiring: {
		sensorName: { fr: 'Bouton + buzzer', en: 'Button + buzzer', de: 'Taster + Buzzer', it: 'Pulsante + buzzer', es: 'Pulsador + zumbador' },
		pins: [
			{ gpio: 'GPIO10', signal: 'Contact A', color: 'data', device: BUTTON },
			{ gpio: 'GND', signal: 'Contact B', color: 'ground', device: BUTTON },
			{ gpio: 'GPIO18', signal: '+', color: 'aux', device: BUZZER },
			{ gpio: 'GND', signal: '−', color: 'ground', device: BUZZER },
		],
		principleBoxes: {
			fr: [
				{ title: `Bouton`, s: 'Bouton', a: 'Contact sec : ferme GPIO10 sur GND', b: 'Câble basse tension, quelques mètres' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Antirebond 50 ms, joue la mélodie sur le buzzer', b: 'Interrupteur « Doorbell mute »', via: 'Entrée GPIO10, sortie GPIO18' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Entité « Doorbell button »', b: 'Notification, lumière, annonce vocale', via: 'Wi-Fi 2,4 GHz + API chiffrée' },
			],
			en: [
				{ title: 'Outdoor button', s: 'Button', a: 'Dry contact: ties GPIO10 to GND', b: 'Low-voltage cable, a few metres' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: '50 ms debounce, plays the tune on the buzzer', b: '“Doorbell mute” switch', via: 'GPIO10 input, GPIO18 output' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: '“Doorbell button” entity', b: 'Notification, light, voice announcement', via: '2.4 GHz Wi-Fi + encrypted API' },
			],
			de: [
				{ title: 'Außentaster', s: 'Taster', a: 'Trockener Kontakt: legt GPIO10 auf GND', b: 'Kleinspannungskabel, wenige Meter' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: '50 ms Entprellung, spielt die Melodie auf dem Buzzer', b: 'Schalter „Doorbell mute“', via: 'Eingang GPIO10, Ausgang GPIO18' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Entität „Doorbell button“', b: 'Benachrichtigung, Licht, Sprachansage', via: '2,4-GHz-WLAN + verschlüsselte API' },
			],
			it: [
				{ title: 'Pulsante esterno', s: 'Pulsante', a: 'Contatto pulito: collega GPIO10 a GND', b: 'Cavo a bassa tensione, pochi metri' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Antirimbalzo 50 ms, suona la melodia sul buzzer', b: 'Interruttore «Doorbell mute»', via: 'Ingresso GPIO10, uscita GPIO18' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Entità «Doorbell button»', b: 'Notifica, luce, annuncio vocale', via: 'Wi-Fi 2,4 GHz + API cifrata' },
			],
			es: [
				{ title: 'Pulsador exterior', s: 'Pulsador', a: 'Contacto seco: une GPIO10 a GND', b: 'Cable de baja tensión, unos metros' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Antirrebote de 50 ms, toca la melodía en el zumbador', b: 'Interruptor «Doorbell mute»', via: 'Entrada GPIO10, salida GPIO18' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Entidad «Doorbell button»', b: 'Notificación, luz, anuncio de voz', via: 'Wi-Fi 2,4 GHz + API cifrada' },
			],
		},
	},
	yaml,
	locales: {
		fr: {
			title: `Sonnette connectée ESP32 ESPHome`,
			description:
				
				
				`Sonnette Wi-Fi pour Home Assistant : bouton, ESP32-C6, ESPHome, notification mobile, sans 230 V. Matériel, schéma GPIO, YAML ESPHome et Home Assistant.`,
			h1: 'Sonnette connectée',
			objective:
				'Vous allez fabriquer une sonnette connectée : un bouton posé à la porte d’entrée fait sonner un buzzer, un petit haut-parleur électronique, dans la maison et envoie en même temps une notification à votre téléphone par Home Assistant, le logiciel qui réunit vos appareils connectés. Le bouton est un simple contact basse tension, relié par un petit câble à un ESP32, une petite carte électronique équipée du Wi-Fi.',
			usefulness:
				'Vous êtes prévenu même au jardin ou au garage. Vous pouvez couper la sonnerie pendant la sieste d’un bébé grâce à un interrupteur « muet », et le même bouton peut aussi allumer une lumière ou lancer une annonce dans la maison.',
			prerequisites: [
				'Home Assistant avec ESPHome, la carte placée dans un endroit couvert par le Wi-Fi.',
				'Un bouton poussoir (contact normalement ouvert) adapté à l’extérieur, au moins IP44.',
				'Un câble basse tension de quelques mètres entre le bouton et la carte (câble d’alarme 2 ou 4 conducteurs).',
			],
			safety:
				'Ce montage fonctionne en 3,3 V : le bouton ne porte aucune tension dangereuse. Ne branchez jamais sur l’ESP32 le circuit d’une sonnette existante (transformateur 8 à 12 V alternatif ou carillon 230 V) : une broche du microcontrôleur ne supporte que 3,3 V. Pour la réutiliser, passez par un module d’entrée isolé prévu pour cet usage ou faites-le poser par un électricien.',
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Carte de commande (voir l’encadré plus haut).', productId: 'esp32-c6-devkitc' },
				{ name: 'Bouton poussoir étanche à contact momentané (IP65)', qty: 1, note: 'Contact normalement ouvert ; un modèle métallique de 12 mm résiste bien à l’extérieur.', q: true },
				{ name: 'Buzzer passif piézo', qty: 1, note: 'Passif : il lui faut un signal pour jouer une mélodie, contrairement à un buzzer actif qui n’émet qu’un son fixe.', q: true },
				{ name: 'Câble d’alarme 2 ou 4 conducteurs', qty: '2 à 10 m', note: 'Liaison entre le bouton et la carte ; en extérieur, choisissez un câble résistant aux UV ou protégez-le par une gaine.', q: true },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Câbler le bouton et le buzzer',
					actions: [
						'Alimentation USB débranchée, reliez l’un des deux contacts du bouton à GPIO10, l’une des broches métalliques alignées sur le bord de la carte (GPIO signifie « entrée-sortie à usage général »), et l’autre contact à GND, la masse ; le sens n’a pas d’importance, car un bouton se contente de fermer un circuit.',
						'Reliez le + du buzzer à GPIO18 et son − à GND.',
						'Pour un test, branchez le bouton et le buzzer sur une plaque d’essai avant le câblage définitif.',
					],
					observe: 'Aucun composant n’est alimenté en dehors de l’USB de la carte.',
					check: 'Le bouton est entre GPIO10 et GND, le buzzer entre GPIO18 et GND.',
				},
				{
					title: 'Tester la sonnerie et l’entité',
					actions: [
						'Appuyez sur le bouton : le buzzer joue la mélodie, ce qui prouve que la carte a bien détecté l’appui.',
						'Dans Home Assistant, ouvrez l’appareil ESPHome : « Doorbell button » passe sur « on » pendant l’appui.',
						'Activez « Doorbell mute » puis appuyez : le buzzer reste silencieux alors que l’entité réagit toujours.',
					],
					observe: 'Une pression brève donne une seule mélodie, sans répétition parasite.',
					check: 'Si le buzzer ne joue pas, vérifiez qu’il est passif et que GPIO18 est bien relié à son +.',
				},
				{
					title: 'Installer le bouton à la porte',
					actions: [
						'Fixez le bouton sur le montant de la porte, à l’abri des projections directes de pluie, et faites une boucle de câble vers le bas : l’eau qui ruisselle le long du câble gouttera au point le plus bas au lieu de pénétrer dans le bouton.',
						'Passez le câble jusqu’à la carte et raccordez-le avec un bornier.',
						'Appuyez à la porte depuis l’extérieur et vérifiez que le buzzer joue.',
					],
					observe: 'Aucune sonnerie intempestive après la pose, y compris par temps humide.',
					check: 'Si le bouton déclenche seul, raccourcissez le câble ou ajoutez une résistance de rappel externe de 10 kΩ entre GPIO10 et 3V3.',
				},
				{
					title: 'Créer l’automatisation de notification',
					actions: [
						'Une automatisation est une règle du type « si… alors… » que Home Assistant applique seul : ici, si quelqu’un sonne, votre téléphone reçoit un message. Ouvrez Paramètres → Automatisations et scènes → Créer une automatisation.',
						'Déclencheur : l’entité « Doorbell button » passe à « on ». Action : notification sur l’application mobile Home Assistant, avec le texte de votre choix.',
						'Ajoutez si vous le souhaitez une action qui allume une lumière ou lance une annonce vocale sur un haut-parleur connecté.',
					],
					observe: 'Une notification arrive sur le téléphone en quelques secondes après l’appui.',
					check: 'Testez avec le téléphone sur le réseau mobile : la notification doit arriver aussi hors du Wi-Fi si l’accès distant est configuré.',
				},
			],
			haIntegration: [
				'L’entité « Doorbell button » est un simple capteur binaire : n’importe quelle automatisation peut s’y brancher (notification, lumière, scène).',
				'L’interrupteur « Doorbell mute » apparaît dans le tableau de bord ; il permet de couper la sonnerie locale tout en conservant la notification.',
				'Pour voir le visiteur, associez à l’automatisation une caméra IP existante : Home Assistant peut joindre une image de la caméra à la notification.',
			],
			troubleshooting: [
				{ problem: 'Le buzzer ne fait aucun son', solution: 'Vous avez peut-être un buzzer actif ou la polarité est inversée. Vérifiez le + sur GPIO18 et testez avec un autre buzzer passif.' },
				{ problem: 'Sonneries fantômes', solution: 'Le câble est long ou capte des parasites. Ajoutez une résistance de rappel externe de 10 kΩ vers 3V3, éloignez le câble des lignes secteur et augmentez le filtre delayed_on.' },
				{ problem: 'La notification n’arrive pas', solution: 'Vérifiez que l’entité change bien d’état, puis l’action de notification et le service de l’application mobile.' },
				{ problem: 'La mélodie est trop forte ou faible', solution: 'Réglez « gain » entre 0.0 et 1.0 dans le YAML, puis réinstallez en OTA.' },
			],
			faq: [
				{ question: 'Puis-je réutiliser ma sonnette existante ?', answer: 'Ne la branchez jamais directement sur l’ESP32. Un module d’entrée isolé conçu pour cela, ou un électricien, est nécessaire.' },
				{ question: 'Est-ce une sonnette vidéo ?', answer: 'Non : ce projet n’ajoute ni image ni son. Vous pouvez y associer une caméra IP que Home Assistant joindra à la notification.' },
				{ question: 'Le bouton peut-il être sans fil ?', answer: 'Pas dans ce montage, qui utilise un câble. Un bouton sans fil Zigbee du commerce serait une alternative.' },
			],
		},
		en: {
			title: `Smart doorbell ESP32 ESPHome`,
			description:
				
				
				`Wi-Fi doorbell for Home Assistant: button, ESP32-C6, ESPHome, phone notification, no mains wiring. Parts list, GPIO wiring, ESPHome YAML and Home Assistant`,
			h1: 'Smart doorbell',
			objective:
				'You will build a connected doorbell: a button at the front door sounds a buzzer, a small electronic speaker, inside the house and at the same time sends a notification to your phone through Home Assistant, the software that gathers your connected devices. The button is a simple low-voltage contact, linked by a small cable to an ESP32, a small electronic board with Wi-Fi.',
			usefulness:
				'You are alerted even in the garden or the garage. You can silence the bell during a baby’s nap with a “mute” switch, and the same button can also turn on a light or trigger an announcement in the house.',
			prerequisites: [
				'Home Assistant with ESPHome, the board placed where Wi-Fi reaches.',
				'A push button (normally open contact) suited to outdoors, at least IP44.',
				'A low-voltage cable a few metres long between the button and the board (2- or 4-core alarm cable).',
			],
			safety:
				'This build runs at 3.3 V: the button carries no dangerous voltage. Never connect an existing doorbell circuit (8–12 V AC transformer or 230 V chime) to the ESP32: a microcontroller pin only tolerates 3.3 V. To reuse it, use an isolated input module made for that or have an electrician fit it.',
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Control board (see the box above).', productId: 'esp32-c6-devkitc' },
				{ name: 'Waterproof momentary push button (IP65)', qty: 1, note: 'Normally open contact; a 12 mm metal model holds up outdoors.', q: true },
				{ name: 'Passive piezo buzzer', qty: 1, note: 'Passive: it needs a signal to play a tune, unlike an active buzzer that only makes one fixed tone.', q: true },
				{ name: '2- or 4-core alarm cable', qty: '2 to 10 m', note: 'Link between button and board; outdoors choose a UV-resistant cable or protect it with a sleeve.', q: true },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Wire the button and the buzzer',
					actions: [
						'With the USB power unplugged, connect one of the button’s two contacts to GPIO10, one of the metal pins lined up along the edge of the board (GPIO means “general purpose input output”), and the other contact to GND, the ground; the direction does not matter, because a button simply closes a circuit.',
						'Connect the buzzer’s + to GPIO18 and its − to GND.',
						'For a test, plug the button and buzzer on a breadboard before the final wiring.',
					],
					observe: 'Nothing is powered apart from the board’s USB.',
					check: 'The button is between GPIO10 and GND, the buzzer between GPIO18 and GND.',
				},
				{
					title: 'Test the ring and the entity',
					actions: [
						'Press the button: the buzzer plays the tune, which proves the board has detected the press.',
						'In Home Assistant open the ESPHome device: “Doorbell button” turns “on” while pressed.',
						'Turn on “Doorbell mute” then press: the buzzer stays silent while the entity still reacts.',
					],
					observe: 'A short press gives a single tune, with no stray repeats.',
					check: 'If the buzzer does not play, check that it is passive and that GPIO18 is on its +.',
				},
				{
					title: 'Install the button at the door',
					actions: [
						'Fix the button on the door frame, out of direct rain, and make a cable loop pointing down: water running along the cable will drip off at the lowest point instead of getting into the button.',
						'Run the cable to the board and connect it with a terminal block.',
						'Press at the door from outside and check that the buzzer plays.',
					],
					observe: 'No unwanted ringing after installation, even in damp weather.',
					check: 'If the button triggers by itself, shorten the cable or add a 10 kΩ external pull-up between GPIO10 and 3V3.',
				},
				{
					title: 'Create the notification automation',
					actions: [
						'An automation is an “if… then…” rule that Home Assistant applies by itself: here, if someone rings, your phone receives a message. Open Settings → Automations & scenes → Create automation.',
						'Trigger: the “Doorbell button” entity turns “on”. Action: notification through the Home Assistant mobile app, with the text you like.',
						'If you wish, add an action that turns on a light or plays a voice announcement on a connected speaker.',
					],
					observe: 'A notification reaches the phone a few seconds after the press.',
					check: 'Test with the phone on mobile data: the notification must also arrive off Wi-Fi if remote access is configured.',
				},
			],
			haIntegration: [
				'The “Doorbell button” entity is a plain binary sensor: any automation can hook into it (notification, light, scene).',
				'The “Doorbell mute” switch appears on the dashboard; it silences the local ring while keeping the notification.',
				'To see the visitor, add an existing IP camera to the automation: Home Assistant can attach a camera image to the notification.',
			],
			troubleshooting: [
				{ problem: 'The buzzer makes no sound', solution: 'You may have an active buzzer or reversed polarity. Check the + on GPIO18 and try another passive buzzer.' },
				{ problem: 'Phantom rings', solution: 'The cable is long or picks up noise. Add a 10 kΩ external pull-up to 3V3, keep the cable away from mains lines and raise the delayed_on filter.' },
				{ problem: 'The notification does not arrive', solution: 'Check that the entity changes state, then the notification action and the mobile app service.' },
				{ problem: 'Tune too loud or too quiet', solution: 'Set “gain” between 0.0 and 1.0 in the YAML, then reinstall over OTA.' },
			],
			faq: [
				{ question: 'Can I reuse my existing doorbell?', answer: 'Never connect it directly to the ESP32. An isolated input module made for it, or an electrician, is required.' },
				{ question: 'Is it a video doorbell?', answer: 'No: this project adds neither image nor sound. You can add an IP camera that Home Assistant attaches to the notification.' },
				{ question: 'Can the button be wireless?', answer: 'Not in this build, which uses a cable. A commercial Zigbee wireless button would be an alternative.' },
			],
		},
		de: {
			title: `Smarte Türklingel ESP32 ESPHome`,
			description:
				
				
				`WLAN-Türklingel für Home Assistant: Taster, ESP32-C6, ESPHome, Handy-Benachrichtigung, ohne 230 V. Material, GPIO-Plan, ESPHome-YAML und Home Assistant.`,
			h1: 'Smarte Türklingel',
			objective:
				'Sie bauen eine vernetzte Türklingel: Ein Taster an der Haustür lässt im Haus einen Buzzer, einen kleinen elektronischen Lautsprecher, ertönen und schickt gleichzeitig über Home Assistant, die Software, die Ihre vernetzten Geräte vereint, eine Nachricht auf Ihr Handy. Der Taster ist ein einfacher Kleinspannungskontakt, der über ein kleines Kabel mit einem ESP32 verbunden ist, einer kleinen Elektronikplatine mit WLAN.',
			usefulness:
				'Sie werden auch im Garten oder in der Garage benachrichtigt. Mit einem Schalter „Stumm“ können Sie die Klingel während des Mittagsschlafs eines Babys abstellen, und derselbe Taster kann auch ein Licht einschalten oder eine Durchsage im Haus auslösen.',
			prerequisites: [
				'Home Assistant mit ESPHome, die Platine an einem Ort mit WLAN-Empfang.',
				'Ein Taster (Schließer) für den Außenbereich, mindestens IP44.',
				'Ein Kleinspannungskabel von einigen Metern zwischen Taster und Platine (2- oder 4-adriges Alarmkabel).',
			],
			safety:
				'Der Aufbau läuft mit 3,3 V: Der Taster führt keine gefährliche Spannung. Schließen Sie niemals den Stromkreis einer vorhandenen Klingel (Trafo 8–12 V AC oder 230-V-Gong) an den ESP32 an: Ein Mikrocontroller-Pin verträgt nur 3,3 V. Zur Weiterverwendung ein dafür gebautes, galvanisch getrenntes Eingangsmodul nutzen oder eine Elektrofachkraft beauftragen.',
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Steuerplatine (siehe Kasten oben).', productId: 'esp32-c6-devkitc' },
				{ name: 'Wasserdichter Taster mit Tastfunktion (IP65)', qty: 1, note: 'Schließer; ein 12-mm-Metallmodell hält draußen gut durch.', q: true },
				{ name: 'Passiver Piezo-Buzzer', qty: 1, note: 'Passiv: Er braucht ein Signal für eine Melodie, anders als ein aktiver Buzzer mit nur einem festen Ton.', q: true },
				{ name: 'Alarmkabel 2- oder 4-adrig', qty: '2 bis 10 m', note: 'Verbindung zwischen Taster und Platine; draußen UV-beständiges Kabel wählen oder mit Schutzschlauch führen.', q: true },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Taster und Buzzer verdrahten',
					actions: [
						'Verbinden Sie bei abgezogener USB-Stromversorgung einen der beiden Kontakte des Tasters mit GPIO10, einem der metallenen Pins am Rand der Platine (GPIO bedeutet „General Purpose Input Output“), und den anderen Kontakt mit GND, der Masse; die Richtung ist egal, denn ein Taster schließt einfach einen Stromkreis.',
						'Das + des Buzzers an GPIO18 und sein − an GND legen.',
						'Zum Testen Taster und Buzzer vor der endgültigen Verdrahtung auf ein Breadboard stecken.',
					],
					observe: 'Außer dem USB der Platine ist nichts bestromt.',
					check: 'Der Taster liegt zwischen GPIO10 und GND, der Buzzer zwischen GPIO18 und GND.',
				},
				{
					title: 'Klingelton und Entität testen',
					actions: [
						'Drücken Sie den Taster: Der Buzzer spielt die Melodie, ein Beweis dafür, dass die Platine den Tastendruck erkannt hat.',
						'In Home Assistant das ESPHome-Gerät öffnen: „Doorbell button“ wechselt während des Drückens auf „an“.',
						'„Doorbell mute“ einschalten und drücken: Der Buzzer bleibt still, die Entität reagiert weiterhin.',
					],
					observe: 'Ein kurzer Druck ergibt genau eine Melodie, ohne Wiederholungen.',
					check: 'Spielt der Buzzer nicht, prüfen, ob er passiv ist und GPIO18 an seinem + liegt.',
				},
				{
					title: 'Den Taster an der Tür montieren',
					actions: [
						'Befestigen Sie den Taster am Türrahmen außerhalb des direkten Regens und führen Sie das Kabel in einer Schleife nach unten: Wasser, das am Kabel entlangläuft, tropft dann an der tiefsten Stelle ab, statt in den Taster zu gelangen.',
						'Das Kabel zur Platine verlegen und mit einer Klemme anschließen.',
						'Draußen an der Tür drücken und prüfen, ob der Buzzer spielt.',
					],
					observe: 'Nach dem Einbau kein ungewolltes Klingeln, auch bei feuchtem Wetter.',
					check: 'Löst der Taster von selbst aus, das Kabel kürzen oder einen externen 10-kΩ-Pull-up zwischen GPIO10 und 3V3 setzen.',
				},
				{
					title: 'Die Benachrichtigungs-Automatisierung anlegen',
					actions: [
						'Eine Automatisierung ist eine „Wenn … dann …“-Regel, die Home Assistant selbstständig anwendet: Hier bekommt Ihr Handy eine Nachricht, wenn jemand klingelt. Öffnen Sie Einstellungen → Automatisierungen & Szenen → Automatisierung erstellen.',
						'Auslöser: Die Entität „Doorbell button“ wechselt auf „an“. Aktion: Benachrichtigung über die Home-Assistant-App mit einem Text Ihrer Wahl.',
						'Optional eine Aktion hinzufügen, die ein Licht einschaltet oder auf einem vernetzten Lautsprecher eine Ansage abspielt.',
					],
					observe: 'Wenige Sekunden nach dem Drücken trifft eine Benachrichtigung auf dem Handy ein.',
					check: 'Mit dem Handy im Mobilfunknetz testen: Die Benachrichtigung muss auch außerhalb des WLAN ankommen, wenn der Fernzugriff eingerichtet ist.',
				},
			],
			haIntegration: [
				'Die Entität „Doorbell button“ ist ein einfacher Binärsensor: Jede Automatisierung kann daran anknüpfen (Benachrichtigung, Licht, Szene).',
				'Der Schalter „Doorbell mute“ erscheint im Dashboard; er schaltet das lokale Klingeln stumm und behält die Benachrichtigung.',
				'Um den Besucher zu sehen, eine vorhandene IP-Kamera in die Automatisierung einbinden: Home Assistant kann der Benachrichtigung ein Kamerabild beifügen.',
			],
			troubleshooting: [
				{ problem: 'Der Buzzer macht kein Geräusch', solution: 'Vielleicht ein aktiver Buzzer oder falsche Polung. Das + an GPIO18 prüfen und einen anderen passiven Buzzer testen.' },
				{ problem: 'Geisterklingeln', solution: 'Das Kabel ist lang oder fängt Störungen ein. Einen externen 10-kΩ-Pull-up nach 3V3 setzen, das Kabel von Netzleitungen fernhalten und den Filter delayed_on erhöhen.' },
				{ problem: 'Die Benachrichtigung kommt nicht an', solution: 'Prüfen, ob die Entität den Zustand wechselt, dann die Benachrichtigungsaktion und den Dienst der mobilen App.' },
				{ problem: 'Melodie zu laut oder zu leise', solution: '„gain“ im YAML zwischen 0.0 und 1.0 einstellen und per OTA neu installieren.' },
			],
			faq: [
				{ question: 'Kann ich meine vorhandene Klingel weiterverwenden?', answer: 'Niemals direkt an den ESP32 anschließen. Nötig ist ein dafür gebautes, galvanisch getrenntes Eingangsmodul oder eine Elektrofachkraft.' },
				{ question: 'Ist das eine Video-Türklingel?', answer: 'Nein: Das Projekt bringt weder Bild noch Ton. Sie können eine IP-Kamera ergänzen, deren Bild Home Assistant der Benachrichtigung beifügt.' },
				{ question: 'Kann der Taster kabellos sein?', answer: 'Nicht in diesem Aufbau, der ein Kabel nutzt. Ein handelsüblicher Zigbee-Funktaster wäre eine Alternative.' },
			],
		},
		it: {
			title: `Campanello connesso ESP32 ESPHome`,
			description:
				
				
				`Campanello Wi-Fi per Home Assistant: pulsante, ESP32-C6, ESPHome, notifica sullo smartphone, senza 230 V. Materiale, schema GPIO, YAML ESPHome e Home Assis`,
			h1: 'Campanello connesso',
			objective:
				'Costruirete un campanello connesso: un pulsante alla porta d’ingresso fa suonare in casa un buzzer, un piccolo altoparlante elettronico, e allo stesso tempo invia una notifica al vostro telefono tramite Home Assistant, il software che riunisce i vostri dispositivi connessi. Il pulsante è un semplice contatto a bassa tensione, collegato con un piccolo cavo a un ESP32, una piccola scheda elettronica con Wi-Fi.',
			usefulness:
				'Siete avvisati anche in giardino o in garage. Potete silenziare il campanello durante il sonnellino di un neonato con un interruttore «muto», e lo stesso pulsante può anche accendere una luce o far partire un annuncio in casa.',
			prerequisites: [
				'Home Assistant con ESPHome, la scheda in un punto coperto dal Wi-Fi.',
				'Un pulsante (contatto normalmente aperto) adatto all’esterno, almeno IP44.',
				'Un cavo a bassa tensione di qualche metro tra pulsante e scheda (cavo antifurto a 2 o 4 conduttori).',
			],
			safety:
				'Il montaggio funziona a 3,3 V: il pulsante non porta alcuna tensione pericolosa. Non collegate mai all’ESP32 il circuito di un campanello esistente (trasformatore 8–12 V alternata o suoneria a 230 V): un pin del microcontrollore tollera solo 3,3 V. Per riutilizzarlo servono un modulo d’ingresso isolato fatto per questo o un elettricista.',
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Scheda di comando (vedi il riquadro sopra).', productId: 'esp32-c6-devkitc' },
				{ name: 'Pulsante impermeabile a contatto momentaneo (IP65)', qty: 1, note: 'Contatto normalmente aperto; un modello metallico da 12 mm regge bene all’esterno.', q: true },
				{ name: 'Buzzer passivo piezo', qty: 1, note: 'Passivo: serve un segnale per suonare una melodia, a differenza di un buzzer attivo che emette un solo tono fisso.', q: true },
				{ name: 'Cavo antifurto a 2 o 4 conduttori', qty: 'da 2 a 10 m', note: 'Collegamento tra pulsante e scheda; all’esterno scegliete un cavo resistente ai raggi UV o proteggetelo con una guaina.', q: true },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Cablare pulsante e buzzer',
					actions: [
						'Con l’alimentazione USB scollegata, collegate uno dei due contatti del pulsante a GPIO10, uno dei pin metallici allineati sul bordo della scheda (GPIO significa «General Purpose Input Output»), e l’altro contatto a GND, la massa; il verso non conta, perché un pulsante si limita a chiudere un circuito.',
						'Collegate il + del buzzer a GPIO18 e il − a GND.',
						'Per una prova, montate pulsante e buzzer su una breadboard prima del cablaggio definitivo.',
					],
					observe: 'Nulla è alimentato oltre all’USB della scheda.',
					check: 'Il pulsante è tra GPIO10 e GND, il buzzer tra GPIO18 e GND.',
				},
				{
					title: 'Provare la suoneria e l’entità',
					actions: [
						'Premete il pulsante: il buzzer suona la melodia, prova che la scheda ha rilevato la pressione.',
						'In Home Assistant aprite il dispositivo ESPHome: «Doorbell button» passa a «on» durante la pressione.',
						'Attivate «Doorbell mute» e premete: il buzzer resta muto mentre l’entità reagisce comunque.',
					],
					observe: 'Una pressione breve dà una sola melodia, senza ripetizioni parassite.',
					check: 'Se il buzzer non suona, verificate che sia passivo e che GPIO18 sia sul suo +.',
				},
				{
					title: 'Installare il pulsante alla porta',
					actions: [
						'Fissate il pulsante sullo stipite, al riparo dalla pioggia diretta, e fate un’ansa nel cavo verso il basso: l’acqua che scorre lungo il cavo gocciolerà nel punto più basso invece di entrare nel pulsante.',
						'Portate il cavo fino alla scheda e collegatelo con un morsetto.',
						'Premete dall’esterno alla porta e verificate che il buzzer suoni.',
					],
					observe: 'Nessuna suoneria indesiderata dopo la posa, nemmeno con tempo umido.',
					check: 'Se il pulsante scatta da solo, accorciate il cavo o aggiungete una resistenza pull-up esterna da 10 kΩ tra GPIO10 e 3V3.',
				},
				{
					title: 'Creare l’automazione di notifica',
					actions: [
						'Un’automazione è una regola del tipo «se… allora…» che Home Assistant applica da solo: qui, se qualcuno suona, il vostro telefono riceve un messaggio. Aprite Impostazioni → Automazioni e scene → Crea automazione.',
						'Attivatore: l’entità «Doorbell button» passa a «on». Azione: notifica tramite l’app mobile di Home Assistant, con il testo che preferite.',
						'Se volete, aggiungete un’azione che accende una luce o riproduce un annuncio vocale su un altoparlante connesso.',
					],
					observe: 'Una notifica arriva sul telefono pochi secondi dopo la pressione.',
					check: 'Provate con il telefono sulla rete mobile: la notifica deve arrivare anche fuori dal Wi-Fi se l’accesso remoto è configurato.',
				},
			],
			haIntegration: [
				'L’entità «Doorbell button» è un semplice sensore binario: qualsiasi automazione può agganciarsi (notifica, luce, scena).',
				'L’interruttore «Doorbell mute» appare nella dashboard; silenzia la suoneria locale mantenendo la notifica.',
				'Per vedere il visitatore, associate all’automazione una telecamera IP esistente: Home Assistant può allegare un’immagine della telecamera alla notifica.',
			],
			troubleshooting: [
				{ problem: 'Il buzzer non emette alcun suono', solution: 'Potreste avere un buzzer attivo o la polarità invertita. Verificate il + su GPIO18 e provate con un altro buzzer passivo.' },
				{ problem: 'Suonerie fantasma', solution: 'Il cavo è lungo o capta disturbi. Aggiungete un pull-up esterno da 10 kΩ verso 3V3, allontanate il cavo dalle linee di rete e aumentate il filtro delayed_on.' },
				{ problem: 'La notifica non arriva', solution: 'Verificate che l’entità cambi stato, poi l’azione di notifica e il servizio dell’app mobile.' },
				{ problem: 'Melodia troppo forte o debole', solution: 'Regolate «gain» tra 0.0 e 1.0 nello YAML e reinstallate via OTA.' },
			],
			faq: [
				{ question: 'Posso riutilizzare il campanello esistente?', answer: 'Mai collegarlo direttamente all’ESP32. Servono un modulo d’ingresso isolato fatto per questo o un elettricista.' },
				{ question: 'È un videocitofono?', answer: 'No: il progetto non aggiunge né immagine né audio. Potete associare una telecamera IP che Home Assistant allega alla notifica.' },
				{ question: 'Il pulsante può essere senza fili?', answer: 'Non in questo montaggio, che usa un cavo. Un pulsante wireless Zigbee in commercio sarebbe un’alternativa.' },
			],
		},
		es: {
			title: `Timbre conectado ESP32 ESPHome`,
			description:
				
				
				`Timbre Wi-Fi para Home Assistant: botón, ESP32-C6, ESPHome, aviso al móvil, sin cableado a 230 V. Material, esquema GPIO, YAML ESPHome y Home Assistant.`,
			h1: 'Timbre conectado',
			objective:
				'Vas a construir un timbre conectado: un pulsador en la puerta de entrada hace sonar dentro de casa un zumbador, un pequeño altavoz electrónico, y a la vez envía una notificación a tu teléfono mediante Home Assistant, el software que reúne tus dispositivos conectados. El pulsador es un simple contacto de baja tensión, unido con un pequeño cable a un ESP32, una pequeña placa electrónica con Wi-Fi.',
			usefulness:
				'Te avisan incluso en el jardín o en el garaje. Puedes silenciar el timbre durante la siesta de un bebé con un interruptor «silencio», y el mismo pulsador puede además encender una luz o lanzar un anuncio en casa.',
			prerequisites: [
				'Home Assistant con ESPHome, con la placa en un lugar cubierto por el Wi-Fi.',
				'Un pulsador (contacto normalmente abierto) apto para exterior, al menos IP44.',
				'Un cable de baja tensión de unos metros entre el pulsador y la placa (cable de alarma de 2 o 4 conductores).',
			],
			safety:
				'El montaje funciona a 3,3 V: el pulsador no lleva ninguna tensión peligrosa. No conectes nunca al ESP32 el circuito de un timbre existente (transformador de 8–12 V alterna o carillón de 230 V): un pin del microcontrolador solo tolera 3,3 V. Para reutilizarlo hace falta un módulo de entrada aislado hecho para ello o un electricista.',
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Placa de control (véase el recuadro de arriba).', productId: 'esp32-c6-devkitc' },
				{ name: 'Pulsador impermeable de contacto momentáneo (IP65)', qty: 1, note: 'Contacto normalmente abierto; un modelo metálico de 12 mm aguanta bien en exterior.', q: true },
				{ name: 'Zumbador pasivo piezo', qty: 1, note: 'Pasivo: necesita una señal para tocar una melodía, a diferencia de un zumbador activo que emite un solo tono fijo.', q: true },
				{ name: 'Cable de alarma de 2 o 4 conductores', qty: '2 a 10 m', note: 'Enlace entre pulsador y placa; en exterior elige un cable resistente a los UV o protégelo con una funda.', q: true },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Cablear el pulsador y el zumbador',
					actions: [
						'Con la alimentación USB desconectada, une uno de los dos contactos del pulsador a GPIO10, uno de los pines metálicos alineados en el borde de la placa (GPIO significa «General Purpose Input Output»), y el otro contacto a GND, la masa; el sentido no importa, porque un pulsador solo cierra un circuito.',
						'Conecta el + del zumbador a GPIO18 y su − a GND.',
						'Para probar, monta el pulsador y el zumbador en una placa de pruebas antes del cableado definitivo.',
					],
					observe: 'Nada recibe alimentación aparte del USB de la placa.',
					check: 'El pulsador está entre GPIO10 y GND, el zumbador entre GPIO18 y GND.',
				},
				{
					title: 'Probar el timbre y la entidad',
					actions: [
						'Pulsa el botón: el zumbador toca la melodía, prueba de que la placa ha detectado la pulsación.',
						'En Home Assistant abre el dispositivo ESPHome: «Doorbell button» pasa a «on» mientras pulsas.',
						'Activa «Doorbell mute» y pulsa: el zumbador queda en silencio mientras la entidad sigue reaccionando.',
					],
					observe: 'Una pulsación breve da una sola melodía, sin repeticiones parásitas.',
					check: 'Si el zumbador no suena, comprueba que sea pasivo y que GPIO18 esté en su +.',
				},
				{
					title: 'Instalar el pulsador en la puerta',
					actions: [
						'Fija el pulsador en el marco de la puerta, lejos de la lluvia directa, y haz un bucle en el cable hacia abajo: el agua que resbale por el cable goteará en el punto más bajo en lugar de entrar en el pulsador.',
						'Lleva el cable hasta la placa y conéctalo con una regleta.',
						'Pulsa desde fuera en la puerta y comprueba que el zumbador suene.',
					],
					observe: 'No hay timbrazos no deseados tras la instalación, ni siquiera con tiempo húmedo.',
					check: 'Si el pulsador se activa solo, acorta el cable o añade una resistencia pull-up externa de 10 kΩ entre GPIO10 y 3V3.',
				},
				{
					title: 'Crear la automatización de notificación',
					actions: [
						'Una automatización es una regla del tipo «si… entonces…» que Home Assistant aplica por sí solo: aquí, si alguien llama, tu teléfono recibe un mensaje. Abre Ajustes → Automatizaciones y escenas → Crear automatización.',
						'Disparador: la entidad «Doorbell button» pasa a «on». Acción: notificación mediante la app móvil de Home Assistant, con el texto que quieras.',
						'Si quieres, añade una acción que encienda una luz o reproduzca un anuncio de voz en un altavoz conectado.',
					],
					observe: 'Llega una notificación al móvil unos segundos después de pulsar.',
					check: 'Prueba con el móvil en datos móviles: la notificación debe llegar también fuera del Wi-Fi si el acceso remoto está configurado.',
				},
			],
			haIntegration: [
				'La entidad «Doorbell button» es un simple sensor binario: cualquier automatización puede engancharse (notificación, luz, escena).',
				'El interruptor «Doorbell mute» aparece en el panel; silencia el timbre local y mantiene la notificación.',
				'Para ver al visitante, asocia una cámara IP existente a la automatización: Home Assistant puede adjuntar una imagen de la cámara a la notificación.',
			],
			troubleshooting: [
				{ problem: 'El zumbador no hace ningún sonido', solution: 'Puede que sea un zumbador activo o que la polaridad esté invertida. Comprueba el + en GPIO18 y prueba otro zumbador pasivo.' },
				{ problem: 'Timbrazos fantasma', solution: 'El cable es largo o capta ruido. Añade una pull-up externa de 10 kΩ hacia 3V3, aleja el cable de las líneas de red y aumenta el filtro delayed_on.' },
				{ problem: 'La notificación no llega', solution: 'Comprueba que la entidad cambia de estado y luego la acción de notificación y el servicio de la app móvil.' },
				{ problem: 'Melodía demasiado fuerte o floja', solution: 'Ajusta «gain» entre 0.0 y 1.0 en el YAML y reinstala por OTA.' },
			],
			faq: [
				{ question: '¿Puedo reutilizar mi timbre existente?', answer: 'No lo conectes nunca directamente al ESP32. Hace falta un módulo de entrada aislado hecho para ello o un electricista.' },
				{ question: '¿Es un videoportero?', answer: 'No: el proyecto no añade imagen ni sonido. Puedes asociar una cámara IP cuya imagen Home Assistant adjunta a la notificación.' },
				{ question: '¿Puede ser inalámbrico el pulsador?', answer: 'No en este montaje, que usa un cable. Un pulsador inalámbrico Zigbee del mercado sería una alternativa.' },
			],
		},
	},
};
