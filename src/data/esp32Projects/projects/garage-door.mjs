import { esphomeHeader, fullGuideFor } from '../shared.mjs';

const yaml =
	esphomeHeader('porte-garage', 'Garage door') +
	`
switch:
  - platform: gpio
    id: garage_relay
    pin:
      number: GPIO18            # relay IN pin
      inverted: true            # CHANGE: most opto-isolated relay boards trigger on LOW
    restore_mode: ALWAYS_OFF    # never leave the contact closed after a reboot
    internal: true              # hidden from Home Assistant: only the cover is exposed
    on_turn_on:
      - delay: 500ms            # 0.5 s pulse = one press of the wall button
      - switch.turn_off: garage_relay

binary_sensor:
  - platform: gpio
    id: garage_closed
    name: "Garage door closed"
    device_class: garage_door
    pin:
      number: GPIO19            # reed contact between this pin and GND
      mode: INPUT_PULLUP
      inverted: true            # contact closed (magnet near) = door closed = ON
    filters:
      - delayed_on_off: 100ms   # debounce

cover:
  - platform: template
    name: "Garage door"
    device_class: garage
    lambda: |-
      return id(garage_closed).state ? COVER_CLOSED : COVER_OPEN;
    open_action:
      - if:
          condition:
            binary_sensor.is_on: garage_closed
          then:
            - switch.turn_on: garage_relay
    close_action:
      - if:
          condition:
            binary_sensor.is_off: garage_closed
          then:
            - switch.turn_on: garage_relay
    stop_action:
      - switch.turn_on: garage_relay   # most openers stop on a new press while moving

sensor:
  - platform: wifi_signal
    name: "WiFi signal"
    update_interval: 120s
    entity_category: diagnostic
`;

export const project = {
	id: 'garage-door',
	level: 'intermediate',
	durationHours: '2–4',
	budgetRange: {
		fr: 'environ 20–45 € selon vendeur',
		en: 'about €20–45 depending on the seller',
		de: 'ca. 20–45 € je nach Händler',
		it: 'circa 20–45 € a seconda del venditore',
		es: 'unos 20–45 € según el vendedor',
	},
	slugs: {
		fr: 'porte-garage',
		en: 'garage-door',
		de: 'garagentor-esp32',
		it: 'porta-garage-esp32',
		es: 'puerta-garaje-esp32',
	},
	fullGuide: fullGuideFor('ouvrir-porte-garage-smartphone-esp32-esphome'),
	productIds: ['esp32-c6-devkitc'],
	searchQueries: {
		fr: 'module relais 1 canal 5V optocoupleur Arduino',
		en: '1 channel 5V relay module optocoupler Arduino',
		de: '1-Kanal Relais Modul 5V Optokoppler Arduino',
		it: 'modulo relè 1 canale 5V optoisolato Arduino',
		es: 'módulo relé 1 canal 5V optoacoplado Arduino',
	},
	smallMaterialIds: ['usb', 'psu', 'dupont', 'breadboard', 'terminals', 'heatshrink', 'enclosure'],
	flashAfter: 2,
	wiring: {
		sensorName: { fr: 'Relais 1 canal', en: '1-channel relay', de: '1-Kanal-Relais', it: 'Relè 1 canale', es: 'Relé 1 canal' },
		pins: [
			{ gpio: '5V', signal: 'VCC', color: 'power' },
			{ gpio: 'GND', signal: 'GND', color: 'ground' },
			{ gpio: 'GPIO18', signal: 'IN', color: 'aux' },
			{ gpio: 'GPIO19', signal: 'Contact A', color: 'data', device: { fr: 'Contact reed', en: 'Reed contact', de: 'Reed-Kontakt', it: 'Contatto reed', es: 'Contacto reed' } },
			{ gpio: 'GND', signal: 'Contact B', color: 'ground', device: { fr: 'Contact reed', en: 'Reed contact', de: 'Reed-Kontakt', it: 'Contatto reed', es: 'Contacto reed' } },
		],
		principleBoxes: {
			fr: [
				{ title: `Home Assistant`, s: 'Home Assistant', tone: 'ha', a: 'Entité « Garage door » : ouvrir, fermer, état', b: 'Notification si la porte reste ouverte' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Impulsion de 0,5 s sur le relais', b: 'Lit le contact reed (porte fermée ou non)', via: 'Wi-Fi 2,4 GHz + API chiffrée' },
				{ title: 'Relais 1 canal', s: 'Relais', a: 'Contact sec en parallèle du bouton mural', via: 'GPIO18 (commande)' },
				{ title: 'Entrée « bouton » de la motorisation', s: 'Motorisation', tone: 'aside', a: 'Très basse tension, notice du fabricant', b: 'On ne touche jamais au 230 V', via: 'Deux fils (NO + COM)' },
			],
			en: [
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: '“Garage door” entity: open, close, state', b: 'Notification if the door stays open' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: '0.5 s pulse on the relay', b: 'Reads the reed contact (door closed or not)', via: '2.4 GHz Wi-Fi + encrypted API' },
				{ title: '1-channel relay', s: 'Relay', a: 'Dry contact in parallel with the wall button', via: 'GPIO18 (control)' },
				{ title: 'Opener “button” input', s: 'Opener', tone: 'aside', a: 'Extra-low voltage, see manufacturer manual', b: 'Mains 230 V is never touched', via: 'Two wires (NO + COM)' },
			],
			de: [
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Entität „Garage door“: öffnen, schließen, Status', b: 'Benachrichtigung, wenn das Tor offen bleibt' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: '0,5-s-Impuls auf das Relais', b: 'Liest den Reed-Kontakt (Tor zu oder nicht)', via: '2,4-GHz-WLAN + verschlüsselte API' },
				{ title: '1-Kanal-Relais', s: 'Relais', a: 'Potenzialfreier Kontakt parallel zum Wandtaster', via: 'GPIO18 (Ansteuerung)' },
				{ title: 'Taster-Eingang des Antriebs', s: 'Antrieb', tone: 'aside', a: 'Kleinspannung, siehe Herstellerhandbuch', b: '230 V wird nie berührt', via: 'Zwei Drähte (NO + COM)' },
			],
			it: [
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Entità «Garage door»: apri, chiudi, stato', b: 'Notifica se la porta resta aperta' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Impulso di 0,5 s sul relè', b: 'Legge il contatto reed (porta chiusa o no)', via: 'Wi-Fi 2,4 GHz + API cifrata' },
				{ title: 'Relè 1 canale', s: 'Relè', a: 'Contatto pulito in parallelo al pulsante a muro', via: 'GPIO18 (comando)' },
				{ title: 'Ingresso «pulsante» dell’automazione', s: 'Automazione', tone: 'aside', a: 'Bassissima tensione, vedi manuale del produttore', b: 'Il 230 V non si tocca mai', via: 'Due fili (NO + COM)' },
			],
			es: [
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Entidad «Garage door»: abrir, cerrar, estado', b: 'Notificación si la puerta sigue abierta' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Pulso de 0,5 s en el relé', b: 'Lee el contacto reed (puerta cerrada o no)', via: 'Wi-Fi 2,4 GHz + API cifrada' },
				{ title: 'Relé 1 canal', s: 'Relé', a: 'Contacto seco en paralelo al pulsador de pared', via: 'GPIO18 (control)' },
				{ title: 'Entrada «pulsador» del motor', s: 'Motor', tone: 'aside', a: 'Muy baja tensión, ver manual del fabricante', b: 'Nunca se toca la red de 230 V', via: 'Dos cables (NO + COM)' },
			],
		},
	},
	yaml,
	locales: {
		fr: {
			title: `Porte de garage ESP32 ESPHome (relais)`,
			description:
				
				
				`Pilotez une porte de garage depuis Home Assistant : ESP32-C6, relais contact sec, reed, YAML et sécurité. Matériel, schéma GPIO, YAML ESPHome et Home Assis`,
			h1: 'Porte de garage connectée',
			objective:
				'Vous allez ajouter un « bouton virtuel » en parallèle du bouton mural de votre motorisation de garage. Depuis Home Assistant, le logiciel qui réunit tous vos appareils connectés, vous envoyez une impulsion à un ESP32, une petite carte électronique équipée du Wi-Fi ; la carte la transmet à un relais, un interrupteur qu’elle commande, qui imite l’appui sur le bouton. Un contact reed, un minuscule interrupteur déclenché par un aimant, indique si la porte est réellement fermée : vous obtenez une entité « Garage door » qui affiche l’état de la porte, l’ouvre et la ferme.',
			usefulness:
				'Vous ouvrez la porte sans télécommande, vous savez si elle est restée ouverte, vous recevez une alerte au bout de 15 minutes et vous pouvez la refermer à distance après avoir vérifié à vue que rien ne gêne le passage. Cette fiche donne le montage de base ; le guide complet détaille les différentes marques de motorisations. Comme le relais se contente de simuler un appui sur le bouton existant, la motorisation continue d’appliquer ses propres sécurités.',
			prerequisites: [
				'Une motorisation de garage avec une entrée « bouton » à contact sec (consultez la notice : bornes souvent nommées bouton, start, PP ou BP).',
				'Un Home Assistant avec ESPHome et une couverture Wi-Fi 2,4 GHz jusqu’au garage.',
				'Un multimètre pour tester le relais avant de le raccorder.',
			],
			safety:
				'Vous ne raccordez que l’entrée « bouton » de la motorisation, en très basse tension, hors tension (disjoncteur ouvert). N’ouvrez jamais le bloc d’alimentation 230 V : cette partie relève d’un électricien. Ne fermez pas la porte à distance sans la voir : vérifiez que les photocellules et la détection d’obstacle de la motorisation fonctionnent, conformément à sa notice et aux règles de sécurité applicables aux portes motorisées (par exemple la norme EN 12453).',
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Carte de commande (voir l’encadré plus haut).', productId: 'esp32-c6-devkitc' },
				{ name: 'Module relais 1 canal 5 V avec optocoupleur', qty: 1, note: 'Utilisé seulement en contact sec (COM + NO). Choisissez un module dont l’entrée accepte un signal 3,3 V ; contacts donnés pour 250 V mais ici on ne commute que de la très basse tension.', q: true },
				{ name: 'Contact magnétique (reed) pour porte, filaire', qty: 1, note: 'Aimant sur la porte, contact sur le rail ou le montant ; indique « fermée » quand les deux sont face à face.' },
				{ name: 'Fil 2 conducteurs (0,5 mm²)', qty: '2 à 10 m', note: 'Entre le relais et les bornes de la motorisation, puis vers le contact reed.' },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Monter le relais et le contact sur la breadboard',
					actions: [
						'Montez d’abord le relais, un interrupteur qui se ferme quand la carte le lui commande, sur la breadboard (une plaque d’essai à trous qui permet de câbler sans soudure), l’alimentation USB débranchée. Reliez son entrée VCC, qui l’alimente, à la broche 5V de la carte, GND à une broche GND et IN, le fil de commande, à GPIO18, l’une des broches métalliques alignées sur le bord de la carte (GPIO signifie « entrée-sortie à usage général »).',
						'Branchez ensuite le contact reed entre GPIO19 et GND ; ses deux fils sont interchangeables, aucun sens n’est à respecter.',
						'Ne raccordez pas encore la motorisation.',
					],
					observe: 'Le module relais ne doit pas claquer quand vous branchez l’USB (LED rouge d’alimentation seule).',
					check: 'Aucun fil libre n’est en contact avec un autre ; le fil 5 V ne touche pas GPIO18 ni GPIO19.',
				},
				{
					title: 'Tester le relais et le contact avec un multimètre',
					actions: [
						'Avant de toucher à la motorisation, testez le relais seul. Dans Home Assistant, ouvrez l’entité « Garage door » et appuyez sur « Ouvrir » : vous devez entendre le relais claquer pendant une demi-seconde, ce qui prouve que l’ordre est bien arrivé jusqu’à la carte.',
						'Placez le multimètre en continuité sur COM et NO : il bipe pendant l’impulsion seulement.',
						'Approchez l’aimant du contact reed : l’entité « Garage door closed » passe sur « Fermée » ; éloignez-le, elle passe sur « Ouverte ».',
					],
					observe: 'L’impulsion dure environ 0,5 s et le relais retombe seul, même si vous coupez la connexion Wi-Fi.',
					check: 'Si le relais reste enclenché, inversez « inverted » dans le YAML (module actif sur niveau haut).',
				},
				{
					title: 'Raccorder le relais à l’entrée « bouton » de la motorisation',
					actions: [
						'Coupez d’abord le courant de la motorisation au disjoncteur, l’interrupteur de protection de votre tableau électrique : même si le montage est en basse tension, la motorisation elle-même est alimentée par le secteur. Repérez ensuite dans la notice les deux bornes du bouton mural.',
						'Raccordez COM et NO du relais en parallèle de ces bornes, sans retirer le bouton existant.',
						'Fixez le contact reed et l’aimant, rétablissez le courant et testez porte dégagée, en la regardant.',
					],
					observe: 'Une impulsion dans Home Assistant déclenche le même cycle que le bouton mural ; l’état passe sur « Ouverte » dès que la porte quitte la position fermée.',
					check: 'Testez aussi l’arrêt en cours de mouvement et la détection d’obstacle de la motorisation.',
				},
			],
			haIntegration: [
				'L’entité « Garage door » (type garage) apparaît avec les boutons ouvrir, fermer, arrêter ; ajoutez-la au tableau de bord avec une carte « Tuile ».',
				'Automatisation d’alerte : déclencheur « État » sur l’entité, valeur « open » pendant 15 minutes, action : notification sur le téléphone.',
				'N’automatisez jamais l’ouverture à l’arrivée sans confirmation, et si vous exposez la porte à un assistant vocal, activez la confirmation par code lorsque c’est proposé.',
			],
			troubleshooting: [
				{ problem: 'Le relais s’enclenche au démarrage de la carte', solution: 'Module actif au niveau haut ou broche instable au boot : inversez « inverted », essayez un autre GPIO libre ou un module dont l’entrée supporte le 3,3 V.' },
				{ problem: 'La porte ne réagit pas', solution: 'Le contact est peut-être sur la mauvaise paire de bornes (alimentation de cellule, par exemple). Vérifiez avec la notice que les bornes sont bien « bouton » et mesurez la continuité du relais.' },
				{ problem: 'L’état est inversé', solution: 'Le contact reed est normalement ouvert ou fermé selon le modèle : changez « inverted » sur le binary_sensor.' },
				{ problem: 'L’état clignote ouvert/fermé', solution: 'Fixez mieux l’aimant, rapprochez-le du contact (quelques millimètres) et augmentez le filtre delayed_on_off.' },
			],
			faq: [
				{ question: 'Puis-je ouvrir ma porte sans toucher au câblage de la motorisation ?', answer: 'Oui : un module prêt à l’emploi à contact sec (relais Wi-Fi) remplace le montage maison. Le guide complet compare ces solutions et leurs limites.' },
				{ question: 'Est-ce sûr de piloter une porte à distance ?', answer: 'Oui si les sécurités de la motorisation fonctionnent et si vous ne fermez que porte visible. Ce montage ne remplace aucune sécurité : il ne fait qu’appuyer sur le bouton.' },
				{ question: 'Que se passe-t-il si le Wi-Fi tombe ?', answer: 'La télécommande et le bouton mural continuent de fonctionner puisque le relais est en parallèle. Seule la commande par Home Assistant est indisponible.' },
			],
		},
		en: {
			title: `ESP32 ESPHome garage door (relay + reed)`,
			description:
				
				
				`Control a garage door from Home Assistant with ESP32-C6, dry-contact relay, reed sensor, YAML and safety notes. Parts list, GPIO wiring, ESPHome YAML and H`,
			h1: 'Connected garage door',
			objective:
				'You will add a “virtual button” in parallel with the wall button of your garage door opener. From Home Assistant, the software that gathers all your connected devices, you send a pulse to an ESP32, a small electronic board with Wi-Fi; the board passes it to a relay, a switch it controls, which imitates a press of the button. A reed contact, a tiny switch triggered by a magnet, tells you whether the door is really closed: you end up with a “Garage door” entity that shows the door state, opens it and closes it.',
			usefulness:
				'You open the door without a remote, you know whether it was left open, you get an alert after 15 minutes and you can close it remotely once you have checked by eye that nothing is in the way. This page gives the basic build; the full guide goes into the different opener brands. Because the relay only imitates a press of the existing button, the opener keeps applying its own safety features.',
			prerequisites: [
				'A garage opener with a dry-contact “button” input (check the manual: terminals are often labelled button, start, PP or BP).',
				'Home Assistant with ESPHome and 2.4 GHz Wi-Fi coverage in the garage.',
				'A multimeter to test the relay before wiring it in.',
			],
			safety:
				'You only connect the opener’s “button” input, an extra-low-voltage circuit, with the power off (breaker open). Never open the 230 V power unit: that belongs to an electrician. Do not close the door remotely without seeing it: check that the opener’s photocells and obstacle detection work, according to its manual and the safety rules for powered doors (for example the EN 12453 standard).',
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Control board (see the box above).', productId: 'esp32-c6-devkitc' },
				{ name: '1-channel 5 V relay module with optocoupler', qty: 1, note: 'Used only as a dry contact (COM + NO). Pick a module whose input accepts a 3.3 V signal; contacts are rated 250 V, but here only extra-low voltage is switched.', q: true },
				{ name: 'Wired magnetic (reed) door contact', qty: 1, note: 'Magnet on the door, contact on the rail or frame; reports “closed” when they face each other.' },
				{ name: '2-core cable (0.5 mm²)', qty: '2 to 10 m', note: 'Between the relay and the opener terminals, then to the reed contact.' },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Build the relay and contact on the breadboard',
					actions: [
						'First mount the relay, a switch that closes when the board tells it to, on the breadboard (a plate with holes that lets you wire without soldering), with the USB power unplugged. Connect its VCC input, which powers it, to the 5V pin of the board, GND to a GND pin and IN, the control wire, to GPIO18, one of the metal pins lined up along the edge of the board (GPIO means “general purpose input output”).',
						'Then connect the reed contact between GPIO19 and GND; its two wires are interchangeable, so no direction has to be respected.',
						'Do not connect the opener yet.',
					],
					observe: 'The relay must not click when you plug USB in (only the red power LED lights).',
					check: 'No loose wire touches another; the 5 V wire does not touch GPIO18 or GPIO19.',
				},
				{
					title: 'Test the relay and contact with a multimeter',
					actions: [
						'Before touching the opener, test the relay on its own. In Home Assistant, open the “Garage door” entity and press “Open”: you should hear the relay click for half a second, which proves the order reached the board.',
						'Set the multimeter to continuity on COM and NO: it beeps only during the pulse.',
						'Bring the magnet near the reed contact: “Garage door closed” turns on; move it away and it turns off.',
					],
					observe: 'The pulse lasts about 0.5 s and the relay releases by itself, even if you cut the Wi-Fi.',
					check: 'If the relay stays on, flip “inverted” in the YAML (module is active-high).',
				},
				{
					title: 'Connect the relay to the opener’s “button” input',
					actions: [
						'Cut the power to the opener at the circuit breaker, the protective switch in your electrical panel, first: even though the build is low voltage, the opener itself runs on mains power. Then find the two terminals of the wall button in the manual.',
						'Wire COM and NO of the relay in parallel with those terminals, keeping the existing button.',
						'Mount the reed contact and magnet, restore power and test with the door clear, watching it.',
					],
					observe: 'A pulse from Home Assistant starts the same cycle as the wall button; the state changes to open as soon as the door leaves the closed position.',
					check: 'Also test stopping mid-travel and the opener’s obstacle detection.',
				},
			],
			haIntegration: [
				'The “Garage door” entity (garage type) appears with open, close and stop buttons; add it to a dashboard with a “Tile” card.',
				'Alert automation: “State” trigger on the entity, value “open” for 15 minutes, action: phone notification.',
				'Never automate opening on arrival without confirmation, and if you expose the door to a voice assistant, enable the passcode confirmation when offered.',
			],
			troubleshooting: [
				{ problem: 'The relay clicks when the board boots', solution: 'Active-high module or unstable pin at boot: flip “inverted”, try another free GPIO or a module whose input supports 3.3 V.' },
				{ problem: 'The door does not react', solution: 'The contact may be on the wrong pair of terminals (photocell power, for example). Check in the manual that they are the “button” terminals and test the relay’s continuity.' },
				{ problem: 'The state is inverted', solution: 'The reed contact is normally open or closed depending on the model: change “inverted” on the binary_sensor.' },
				{ problem: 'The state flickers open/closed', solution: 'Mount the magnet more firmly, bring it within a few millimetres of the contact and raise the delayed_on_off filter.' },
			],
			faq: [
				{ question: 'Can I open the door without touching the opener’s wiring?', answer: 'Yes: a ready-made dry-contact Wi-Fi relay replaces the DIY build. The full guide compares these options and their limits.' },
				{ question: 'Is it safe to control a door remotely?', answer: 'Yes if the opener’s safety devices work and you only close with the door in view. This build replaces no safety device: it only presses the button.' },
				{ question: 'What happens if Wi-Fi drops?', answer: 'The remote and wall button keep working because the relay is in parallel. Only control through Home Assistant is unavailable.' },
			],
		},
		de: {
			title: `Garagentor ESP32 ESPHome (Relais)`,
			description:
				
				
				`Garagentor per Home Assistant: ESP32-C6, potenzialfreies Relais, Reed-Kontakt, YAML und Sicherheitshinweise. Material, GPIO-Plan, ESPHome-YAML und Home Ass`,
			h1: 'Smartes Garagentor',
			objective:
				'Sie ergänzen den Wandtaster Ihres Garagentorantriebs um einen „virtuellen Taster“, der parallel dazu arbeitet. Aus Home Assistant, der Software, die alle Ihre vernetzten Geräte vereint, schicken Sie einen Impuls an einen ESP32, eine kleine Elektronikplatine mit WLAN; sie gibt ihn an ein Relais weiter, einen von der Platine gesteuerten Schalter, der einen Tastendruck nachahmt. Ein Reedkontakt, ein winziger, von einem Magneten ausgelöster Schalter, meldet, ob das Tor wirklich geschlossen ist: So entsteht eine Entität „Garage door“, die den Torzustand anzeigt sowie das Tor öffnet und schließt.',
			usefulness:
				'Sie öffnen das Tor ohne Fernbedienung, wissen, ob es offen geblieben ist, erhalten nach 15 Minuten eine Warnung und können es aus der Ferne schließen, nachdem Sie sich vergewissert haben, dass nichts im Weg ist. Diese Seite zeigt den Grundaufbau; der ausführliche Ratgeber geht auf die verschiedenen Antriebsmarken ein. Da das Relais nur einen Druck auf den vorhandenen Taster nachahmt, wendet der Antrieb weiterhin seine eigenen Sicherheitsfunktionen an.',
			prerequisites: [
				'Ein Garagentorantrieb mit potenzialfreiem Taster-Eingang (Handbuch prüfen: Klemmen oft mit Taster, Start, PP oder BP bezeichnet).',
				'Home Assistant mit ESPHome und 2,4-GHz-WLAN bis in die Garage.',
				'Ein Multimeter, um das Relais vor dem Anschluss zu testen.',
			],
			safety:
				'Sie schließen nur den Taster-Eingang des Antriebs an, einen Kleinspannungskreis, und zwar spannungsfrei (Sicherung aus). Öffnen Sie niemals das 230-V-Netzteil des Antriebs: Das ist Sache einer Elektrofachkraft. Schließen Sie das Tor nie aus der Ferne, ohne es zu sehen: Prüfen Sie, dass Lichtschranken und Hinderniserkennung gemäß Handbuch und den Sicherheitsregeln für kraftbetätigte Tore (z. B. Norm EN 12453) funktionieren.',
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Steuerplatine (siehe Kasten oben).', productId: 'esp32-c6-devkitc' },
				{ name: '1-Kanal-Relaismodul 5 V mit Optokoppler', qty: 1, note: 'Nur als potenzialfreier Kontakt genutzt (COM + NO). Ein Modul wählen, dessen Eingang 3,3 V akzeptiert; Kontakte sind für 250 V ausgelegt, hier wird aber nur Kleinspannung geschaltet.', q: true },
				{ name: 'Magnetkontakt (Reed) für Tür, kabelgebunden', qty: 1, note: 'Magnet am Tor, Kontakt an Schiene oder Zarge; meldet „geschlossen“, wenn beide sich gegenüberstehen.' },
				{ name: 'Zweiadriges Kabel (0,5 mm²)', qty: '2 bis 10 m', note: 'Zwischen Relais und Antriebsklemmen, dann zum Reed-Kontakt.' },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Relais und Kontakt auf dem Breadboard aufbauen',
					actions: [
						'Montieren Sie zuerst das Relais, einen Schalter, der schließt, wenn die Platine es verlangt, auf dem Breadboard (einer Platte mit Steckplätzen, auf der man ohne Löten verdrahtet), bei abgezogenem USB-Kabel. Verbinden Sie den Eingang VCC, der es mit Strom versorgt, mit dem Pin 5V der Platine, GND mit einem GND-Pin und IN, die Steuerleitung, mit GPIO18, einem der metallenen Pins am Rand der Platine (GPIO bedeutet „General Purpose Input Output“).',
						'Schließen Sie danach den Reedkontakt zwischen GPIO19 und GND an; seine beiden Drähte sind austauschbar, eine Polarität muss nicht beachtet werden.',
						'Den Antrieb noch nicht anschließen.',
					],
					observe: 'Das Relais darf beim Einstecken von USB nicht klicken (nur die rote Betriebs-LED leuchtet).',
					check: 'Kein loses Kabel berührt ein anderes; die 5-V-Leitung berührt weder GPIO18 noch GPIO19.',
				},
				{
					title: 'Relais und Kontakt mit dem Multimeter testen',
					actions: [
						'Testen Sie das Relais allein, bevor Sie den Antrieb anfassen. Öffnen Sie in Home Assistant die Entität „Garage door“ und tippen Sie auf „Öffnen“: Das Relais muss eine halbe Sekunde lang klicken, ein Beweis dafür, dass der Befehl bei der Platine ankommt.',
						'Multimeter auf Durchgang an COM und NO: Es piept nur während des Impulses.',
						'Magnet an den Reed-Kontakt halten: „Garage door closed“ wird aktiv; wieder entfernen, sie wird inaktiv.',
					],
					observe: 'Der Impuls dauert etwa 0,5 s, das Relais fällt von selbst ab, auch wenn Sie das WLAN trennen.',
					check: 'Bleibt das Relais angezogen, „inverted“ im YAML umkehren (Modul ist High-aktiv).',
				},
				{
					title: 'Relais an den Taster-Eingang des Antriebs anschließen',
					actions: [
						'Schalten Sie zuerst den Strom des Antriebs an der Sicherung ab, dem Schutzschalter in Ihrem Sicherungskasten: Auch wenn der Aufbau mit Kleinspannung arbeitet, hängt der Antrieb selbst am Netz. Suchen Sie dann in der Anleitung die beiden Klemmen des Wandtasters.',
						'COM und NO des Relais parallel zu diesen Klemmen anschließen, der vorhandene Taster bleibt.',
						'Reed-Kontakt und Magnet befestigen, Strom wieder einschalten und bei freiem Tor testen, mit Blick darauf.',
					],
					observe: 'Ein Impuls aus Home Assistant löst denselben Zyklus aus wie der Wandtaster; der Status wechselt auf offen, sobald das Tor die Schließstellung verlässt.',
					check: 'Auch das Stoppen mitten in der Fahrt und die Hinderniserkennung des Antriebs testen.',
				},
			],
			haIntegration: [
				'Die Entität „Garage door“ (Typ Garage) erscheint mit Öffnen, Schließen und Stopp; mit einer „Kachel“-Karte ins Dashboard setzen.',
				'Warn-Automatisierung: Auslöser „Zustand“ der Entität, Wert „open“ für 15 Minuten, Aktion: Benachrichtigung aufs Handy.',
				'Das Öffnen bei Ankunft nie ohne Bestätigung automatisieren; wird das Tor einem Sprachassistenten bereitgestellt, die Code-Abfrage aktivieren, sofern angeboten.',
			],
			troubleshooting: [
				{ problem: 'Das Relais klickt beim Start der Platine', solution: 'High-aktives Modul oder instabiler Pin beim Booten: „inverted“ umkehren, anderen freien GPIO testen oder ein Modul mit 3,3-V-tauglichem Eingang nehmen.' },
				{ problem: 'Das Tor reagiert nicht', solution: 'Der Kontakt liegt eventuell an falschen Klemmen (z. B. Lichtschranken-Versorgung). Im Handbuch prüfen, dass es die Taster-Klemmen sind, und den Relais-Durchgang messen.' },
				{ problem: 'Der Status ist vertauscht', solution: 'Je nach Modell ist der Reed-Kontakt Öffner oder Schließer: „inverted“ am binary_sensor ändern.' },
				{ problem: 'Der Status flackert offen/geschlossen', solution: 'Magnet fester anbringen, auf wenige Millimeter an den Kontakt rücken und den Filter delayed_on_off erhöhen.' },
			],
			faq: [
				{ question: 'Kann ich das Tor öffnen, ohne die Antriebsverkabelung anzufassen?', answer: 'Ja: Ein fertiges WLAN-Relais mit potenzialfreiem Kontakt ersetzt den Eigenbau. Der ausführliche Ratgeber vergleicht diese Lösungen samt Grenzen.' },
				{ question: 'Ist Fernsteuerung eines Tors sicher?', answer: 'Ja, wenn die Sicherheitseinrichtungen des Antriebs funktionieren und Sie nur bei Sicht aufs Tor schließen. Der Aufbau ersetzt keine Sicherheitseinrichtung: Er drückt nur den Taster.' },
				{ question: 'Was passiert bei WLAN-Ausfall?', answer: 'Fernbedienung und Wandtaster funktionieren weiter, da das Relais parallel liegt. Nur die Steuerung über Home Assistant fällt aus.' },
			],
		},
		it: {
			title: `Porta garage ESP32 ESPHome (relè)`,
			description:
				
				
				`Comandate la porta garage da Home Assistant: ESP32-C6, relè a contatto pulito, reed, YAML e note di sicurezza. Materiale, schema GPIO, YAML ESPHome e Home`,
			h1: 'Porta garage connessa',
			objective:
				'Aggiungerete un «pulsante virtuale» in parallelo al pulsante a muro della vostra motorizzazione del garage. Da Home Assistant, il software che riunisce tutti i vostri dispositivi connessi, inviate un impulso a un ESP32, una piccola scheda elettronica con Wi-Fi; la scheda lo passa a un relè, un interruttore comandato da lei che simula la pressione del pulsante. Un contatto reed, un minuscolo interruttore azionato da un magnete, indica se la porta è davvero chiusa: otterrete un’entità «Garage door» che mostra lo stato della porta, la apre e la chiude.',
			usefulness:
				'Aprite la porta senza telecomando, sapete se è rimasta aperta, ricevete un avviso dopo 15 minuti e potete richiuderla da remoto dopo aver controllato a vista che nulla ostacoli il passaggio. Questa scheda mostra il montaggio di base; la guida completa approfondisce le diverse marche di motorizzazioni. Poiché il relè si limita a simulare la pressione del pulsante esistente, la motorizzazione continua ad applicare le proprie sicurezze.',
			prerequisites: [
				'Un’automazione per garage con ingresso «pulsante» a contatto pulito (vedi manuale: morsetti spesso chiamati pulsante, start, PP o BP).',
				'Home Assistant con ESPHome e copertura Wi-Fi a 2,4 GHz fino al garage.',
				'Un multimetro per provare il relè prima del collegamento.',
			],
			safety:
				'Collegate solo l’ingresso «pulsante» dell’automazione, un circuito a bassissima tensione, senza tensione (interruttore aperto). Non aprite mai l’alimentatore a 230 V: spetta a un elettricista. Non chiudete la porta a distanza senza vederla: verificate che fotocellule e rilevamento ostacoli funzionino, secondo il manuale e le regole di sicurezza per porte motorizzate (ad esempio la norma EN 12453).',
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Scheda di comando (vedi il riquadro sopra).', productId: 'esp32-c6-devkitc' },
				{ name: 'Modulo relè 1 canale 5 V con optoisolatore', qty: 1, note: 'Usato solo come contatto pulito (COM + NO). Scegliete un modulo il cui ingresso accetti un segnale a 3,3 V; i contatti sono dati per 250 V, ma qui si commuta solo bassissima tensione.', q: true },
				{ name: 'Contatto magnetico (reed) per porta, cablato', qty: 1, note: 'Magnete sulla porta, contatto su guida o montante; segnala «chiusa» quando sono uno di fronte all’altro.' },
				{ name: 'Cavo a 2 conduttori (0,5 mm²)', qty: 'da 2 a 10 m', note: 'Tra relè e morsetti dell’automazione, poi verso il contatto reed.' },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Montare relè e contatto sulla breadboard',
					actions: [
						'Montate prima il relè, un interruttore che si chiude quando la scheda glielo ordina, sulla breadboard (una basetta forata che permette di cablare senza saldare), con l’alimentazione USB scollegata. Collegate il suo ingresso VCC, che lo alimenta, al pin 5V della scheda, GND a un pin GND e IN, il filo di comando, a GPIO18, uno dei pin metallici allineati lungo il bordo della scheda (GPIO significa «General Purpose Input Output»).',
						'Collegate poi il contatto reed tra GPIO19 e GND; i suoi due fili sono intercambiabili, quindi non c’è un verso da rispettare.',
						'Non collegate ancora l’automazione.',
					],
					observe: 'Il relè non deve scattare quando collegate l’USB (si accende solo il LED rosso di alimentazione).',
					check: 'Nessun filo libero tocca un altro; il filo 5 V non tocca GPIO18 né GPIO19.',
				},
				{
					title: 'Provare relè e contatto con un multimetro',
					actions: [
						'Prima di toccare la motorizzazione, provate il relè da solo. In Home Assistant aprite l’entità «Garage door» e premete «Apri»: dovete sentire il relè scattare per mezzo secondo, prova che il comando è arrivato alla scheda.',
						'Mettete il multimetro in continuità su COM e NO: suona solo durante l’impulso.',
						'Avvicinate il magnete al contatto reed: «Garage door closed» si attiva; allontanatelo e si disattiva.',
					],
					observe: 'L’impulso dura circa 0,5 s e il relè ricade da solo, anche se togliete il Wi-Fi.',
					check: 'Se il relè resta eccitato, invertite «inverted» nello YAML (modulo attivo a livello alto).',
				},
				{
					title: 'Collegare il relè all’ingresso «pulsante» dell’automazione',
					actions: [
						'Togliete prima la corrente alla motorizzazione dall’interruttore magnetotermico, l’interruttore di protezione del quadro elettrico: anche se il montaggio è a bassa tensione, la motorizzazione è alimentata dalla rete. Poi individuate nel manuale i due morsetti del pulsante a muro.',
						'Collegate COM e NO del relè in parallelo a quei morsetti, mantenendo il pulsante esistente.',
						'Fissate contatto reed e magnete, ridate corrente e provate a porta libera, guardandola.',
					],
					observe: 'Un impulso da Home Assistant avvia lo stesso ciclo del pulsante a muro; lo stato passa ad aperto appena la porta lascia la posizione di chiusura.',
					check: 'Provate anche l’arresto a metà corsa e il rilevamento ostacoli dell’automazione.',
				},
			],
			haIntegration: [
				'L’entità «Garage door» (tipo garage) compare con i pulsanti apri, chiudi e stop; aggiungetela alla dashboard con una scheda «Riquadro».',
				'Automazione di avviso: trigger «Stato» sull’entità, valore «open» per 15 minuti, azione: notifica sul telefono.',
				'Non automatizzate mai l’apertura all’arrivo senza conferma e, se esponete la porta a un assistente vocale, attivate la conferma con codice quando disponibile.',
			],
			troubleshooting: [
				{ problem: 'Il relè scatta all’avvio della scheda', solution: 'Modulo attivo a livello alto o pin instabile al boot: invertite «inverted», provate un altro GPIO libero o un modulo con ingresso compatibile 3,3 V.' },
				{ problem: 'La porta non reagisce', solution: 'Il contatto potrebbe essere sui morsetti sbagliati (ad esempio alimentazione fotocellule). Verificate nel manuale che siano i morsetti «pulsante» e misurate la continuità del relè.' },
				{ problem: 'Lo stato è invertito', solution: 'Il contatto reed è normalmente aperto o chiuso a seconda del modello: cambiate «inverted» sul binary_sensor.' },
				{ problem: 'Lo stato lampeggia aperto/chiuso', solution: 'Fissate meglio il magnete, avvicinatelo al contatto (pochi millimetri) e aumentate il filtro delayed_on_off.' },
			],
			faq: [
				{ question: 'Posso aprire la porta senza toccare il cablaggio dell’automazione?', answer: 'Sì: un relè Wi-Fi pronto all’uso a contatto pulito sostituisce il montaggio fai da te. La guida completa confronta queste soluzioni e i loro limiti.' },
				{ question: 'È sicuro comandare una porta a distanza?', answer: 'Sì se i dispositivi di sicurezza dell’automazione funzionano e chiudete solo con la porta in vista. Il montaggio non sostituisce alcuna sicurezza: si limita a premere il pulsante.' },
				{ question: 'Cosa succede se cade il Wi-Fi?', answer: 'Telecomando e pulsante a muro continuano a funzionare perché il relè è in parallelo. Manca solo il comando da Home Assistant.' },
			],
		},
		es: {
			title: `Puerta de garaje ESP32 ESPHome (relé)`,
			description:
				
				
				`Controla la puerta del garaje desde Home Assistant: ESP32-C6, relé de contacto seco, reed, YAML y seguridad. Material, esquema GPIO, YAML ESPHome y Home As`,
			h1: 'Puerta de garaje conectada',
			objective:
				'Vas a añadir un «botón virtual» en paralelo con el pulsador de pared de tu motor de garaje. Desde Home Assistant, el software que reúne todos tus dispositivos conectados, envías un impulso a un ESP32, una pequeña placa electrónica con Wi-Fi; la placa lo pasa a un relé, un interruptor que ella controla, que imita la pulsación del botón. Un contacto reed, un diminuto interruptor accionado por un imán, indica si la puerta está realmente cerrada: obtienes una entidad «Garage door» que muestra el estado de la puerta, la abre y la cierra.',
			usefulness:
				'Abres la puerta sin mando a distancia, sabes si se ha quedado abierta, recibes un aviso a los 15 minutos y puedes cerrarla a distancia tras comprobar a simple vista que nada estorba el paso. Esta ficha muestra el montaje básico; la guía completa detalla las distintas marcas de motores. Como el relé solo imita la pulsación del botón existente, el motor sigue aplicando sus propias medidas de seguridad.',
			prerequisites: [
				'Un motor de garaje con entrada de «pulsador» de contacto seco (revisa el manual: los bornes suelen llamarse pulsador, start, PP o BP).',
				'Home Assistant con ESPHome y cobertura Wi-Fi de 2,4 GHz hasta el garaje.',
				'Un multímetro para probar el relé antes de conectarlo.',
			],
			safety:
				'Solo conectas la entrada de «pulsador» del motor, un circuito de muy baja tensión, sin corriente (magnetotérmico abierto). No abras nunca la fuente de 230 V: eso corresponde a un electricista. No cierres la puerta a distancia sin verla: comprueba que las fotocélulas y la detección de obstáculos funcionan, según el manual y las normas de seguridad de puertas motorizadas (por ejemplo la norma EN 12453).',
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Placa de control (véase el recuadro de arriba).', productId: 'esp32-c6-devkitc' },
				{ name: 'Módulo relé 1 canal 5 V con optoacoplador', qty: 1, note: 'Se usa solo como contacto seco (COM + NO). Elige un módulo cuya entrada acepte señal de 3,3 V; los contactos se anuncian para 250 V, pero aquí solo se conmuta muy baja tensión.', q: true },
				{ name: 'Contacto magnético (reed) para puerta, cableado', qty: 1, note: 'Imán en la puerta, contacto en el carril o el marco; indica «cerrada» cuando están enfrentados.' },
				{ name: 'Cable de 2 conductores (0,5 mm²)', qty: '2 a 10 m', note: 'Entre el relé y los bornes del motor, y después hasta el contacto reed.' },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Montar el relé y el contacto en la breadboard',
					actions: [
						'Monta primero el relé, un interruptor que se cierra cuando la placa se lo ordena, en la breadboard (una placa con agujeros que permite cablear sin soldar), con la alimentación USB desconectada. Une su entrada VCC, que lo alimenta, al pin 5V de la placa, GND a un pin GND e IN, el cable de control, a GPIO18, uno de los pines metálicos alineados en el borde de la placa (GPIO significa «General Purpose Input Output»).',
						'Conecta después el contacto reed entre GPIO19 y GND; sus dos cables son intercambiables, así que no hay un sentido que respetar.',
						'No conectes todavía el motor.',
					],
					observe: 'El relé no debe sonar al enchufar el USB (solo se enciende el LED rojo de alimentación).',
					check: 'Ningún cable suelto toca a otro; el cable de 5 V no toca GPIO18 ni GPIO19.',
				},
				{
					title: 'Probar el relé y el contacto con un multímetro',
					actions: [
						'Antes de tocar el motor, prueba el relé solo. En Home Assistant abre la entidad «Garage door» y pulsa «Abrir»: debes oír el relé chasquear medio segundo, prueba de que la orden llegó a la placa.',
						'Pon el multímetro en continuidad en COM y NO: pita solo durante el pulso.',
						'Acerca el imán al contacto reed: «Garage door closed» se activa; aléjalo y se desactiva.',
					],
					observe: 'El pulso dura unos 0,5 s y el relé se suelta solo, incluso si cortas el Wi-Fi.',
					check: 'Si el relé se queda activado, invierte «inverted» en el YAML (módulo activo en nivel alto).',
				},
				{
					title: 'Conectar el relé a la entrada de «pulsador» del motor',
					actions: [
						'Corta primero la corriente del motor en el magnetotérmico, el interruptor de protección del cuadro eléctrico: aunque el montaje sea de baja tensión, el motor funciona con la red eléctrica. Después localiza en el manual los dos bornes del pulsador de pared.',
						'Conecta COM y NO del relé en paralelo con esos bornes, manteniendo el pulsador existente.',
						'Fija el contacto reed y el imán, restablece la corriente y prueba con la puerta despejada, mirándola.',
					],
					observe: 'Un pulso desde Home Assistant inicia el mismo ciclo que el pulsador de pared; el estado pasa a abierta en cuanto la puerta sale de la posición cerrada.',
					check: 'Prueba también la parada a mitad de recorrido y la detección de obstáculos del motor.',
				},
			],
			haIntegration: [
				'La entidad «Garage door» (tipo garaje) aparece con los botones abrir, cerrar y parar; añádela al panel con una tarjeta «Mosaico».',
				'Automatización de aviso: disparador «Estado» de la entidad, valor «open» durante 15 minutos, acción: notificación en el móvil.',
				'No automatices nunca la apertura al llegar sin confirmación y, si expones la puerta a un asistente de voz, activa la confirmación con código cuando se ofrezca.',
			],
			troubleshooting: [
				{ problem: 'El relé suena al arrancar la placa', solution: 'Módulo activo en nivel alto o pin inestable en el arranque: invierte «inverted», prueba otro GPIO libre o un módulo con entrada compatible con 3,3 V.' },
				{ problem: 'La puerta no reacciona', solution: 'Puede que el contacto esté en bornes equivocados (alimentación de fotocélulas, por ejemplo). Comprueba en el manual que son los bornes de «pulsador» y mide la continuidad del relé.' },
				{ problem: 'El estado está invertido', solution: 'El contacto reed es normalmente abierto o cerrado según el modelo: cambia «inverted» en el binary_sensor.' },
				{ problem: 'El estado parpadea abierto/cerrado', solution: 'Fija mejor el imán, acércalo al contacto (unos milímetros) y aumenta el filtro delayed_on_off.' },
			],
			faq: [
				{ question: '¿Puedo abrir la puerta sin tocar el cableado del motor?', answer: 'Sí: un relé Wi-Fi listo para usar con contacto seco sustituye al montaje casero. La guía completa compara estas soluciones y sus límites.' },
				{ question: '¿Es seguro controlar una puerta a distancia?', answer: 'Sí si los dispositivos de seguridad del motor funcionan y solo cierras con la puerta a la vista. Este montaje no sustituye ninguna seguridad: solo pulsa el botón.' },
				{ question: '¿Qué pasa si falla el Wi-Fi?', answer: 'El mando y el pulsador de pared siguen funcionando porque el relé está en paralelo. Solo se pierde el control desde Home Assistant.' },
			],
		},
	},
};
