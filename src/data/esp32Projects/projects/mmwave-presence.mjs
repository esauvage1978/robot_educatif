import { esphomeHeader } from '../shared.mjs';

const yaml =
	esphomeHeader('presence-ld2410', 'mmWave presence') +
	`
uart:
  id: ld2410_uart
  tx_pin: GPIO20               # ESP32 TX -> LD2410 RX
  rx_pin: GPIO19               # ESP32 RX <- LD2410 TX
  baud_rate: 256000            # fixed by the LD2410 firmware
  data_bits: 8
  stop_bits: 1
  parity: NONE

ld2410:
  uart_id: ld2410_uart

binary_sensor:
  - platform: ld2410
    has_target:
      name: "Presence"
      device_class: occupancy
    has_moving_target:
      name: "Moving target"
    has_still_target:
      name: "Still target"

sensor:
  - platform: ld2410
    detection_distance:
      name: "Detection distance"
    moving_distance:
      name: "Moving distance"
    still_distance:
      name: "Still distance"
    moving_energy:
      name: "Moving energy"
    still_energy:
      name: "Still energy"

number:
  - platform: ld2410
    timeout:
      name: "Hold time"               # seconds the sensor keeps "presence" after the last detection
    max_move_distance_gate:
      name: "Max moving gate"         # each gate is about 0.75 m: lower it to ignore far areas
    max_still_distance_gate:
      name: "Max still gate"

switch:
  - platform: ld2410
    bluetooth:
      name: "LD2410 Bluetooth"        # CHANGE: switch it OFF once configured (public default password)
`;

export const project = {
	id: 'mmwave-presence',
	level: 'intermediate',
	durationHours: '1–2',
	budgetRange: {
		fr: 'environ 15–35 € selon vendeur',
		en: 'about €15–35 depending on the seller',
		de: 'ca. 15–35 € je nach Händler',
		it: 'circa 15–35 € a seconda del venditore',
		es: 'unos 15–35 € según el vendedor',
	},
	slugs: {
		fr: 'detecteur-presence-mmwave-ld2410',
		en: 'mmwave-presence-ld2410',
		de: 'praesenzmelder-mmwave-ld2410',
		it: 'rilevatore-presenza-mmwave-ld2410',
		es: 'detector-presencia-mmwave-ld2410',
	},
	fullGuide: null,
	productIds: ['esp32-c6-devkitc'],
	searchQueries: {
		fr: 'HLK-LD2410C radar présence mmWave 24 GHz',
		en: 'HLK-LD2410C 24GHz mmWave presence sensor',
		de: 'HLK-LD2410C 24GHz mmWave Präsenzsensor',
		it: 'HLK-LD2410C sensore di presenza mmWave 24GHz',
		es: 'HLK-LD2410C sensor de presencia mmWave 24GHz',
	},
	smallMaterialIds: ['usb', 'psu', 'dupont', 'breadboard', 'enclosure'],
	flashAfter: 1,
	wiring: {
		sensorName: { fr: 'Radar LD2410C', en: 'LD2410C radar', de: 'LD2410C-Radar', it: 'Radar LD2410C', es: 'Radar LD2410C' },
		pins: [
			{ gpio: '5V', signal: '5V', color: 'power' },
			{ gpio: 'GND', signal: 'GND', color: 'ground' },
			{ gpio: 'GPIO19 (RX)', signal: 'TX', color: 'data' },
			{ gpio: 'GPIO20 (TX)', signal: 'RX', color: 'data' },
		],
		principleBoxes: {
			fr: [
				{ title: `LD2410C`, s: 'LD2410C', a: 'Radar 24 GHz : mouvement et immobilité', b: 'Envoie ses mesures en série (UART)' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Décode distance, énergie, présence', via: 'UART 256000 bauds' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Entité « Presence » et réglages de portée', b: 'Allume la lumière, coupe le chauffage', via: 'Wi-Fi 2,4 GHz + API chiffrée' },
			],
			en: [
				{ title: 'LD2410C radar', s: 'LD2410C', a: '24 GHz radar: motion and stillness', b: 'Sends measurements over serial (UART)' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Decodes distance, energy, presence', via: 'UART 256000 baud' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: '“Presence” entity and range settings', b: 'Switches lights, cuts heating', via: '2.4 GHz Wi-Fi + encrypted API' },
			],
			de: [
				{ title: 'LD2410C-Radar', s: 'LD2410C', a: '24-GHz-Radar: Bewegung und Stillstand', b: 'Sendet Messwerte seriell (UART)' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Dekodiert Abstand, Energie, Präsenz', via: 'UART 256000 Baud' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Entität „Presence“ und Reichweiten-Einstellungen', b: 'Schaltet Licht, senkt Heizung', via: '2,4-GHz-WLAN + verschlüsselte API' },
			],
			it: [
				{ title: 'Radar LD2410C', s: 'LD2410C', a: 'Radar a 24 GHz: movimento e immobilità', b: 'Invia le misure in seriale (UART)' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Decodifica distanza, energia, presenza', via: 'UART 256000 baud' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Entità «Presence» e impostazioni di portata', b: 'Accende la luce, spegne il riscaldamento', via: 'Wi-Fi 2,4 GHz + API cifrata' },
			],
			es: [
				{ title: 'Radar LD2410C', s: 'LD2410C', a: 'Radar de 24 GHz: movimiento e inmovilidad', b: 'Envía las medidas en serie (UART)' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Decodifica distancia, energía, presencia', via: 'UART 256000 baudios' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Entidad «Presence» y ajustes de alcance', b: 'Enciende la luz, baja la calefacción', via: 'Wi-Fi 2,4 GHz + API cifrada' },
			],
		},
	},
	yaml,
	locales: {
		fr: {
			title: `Présence mmWave LD2410 ESP32 ESPHome`,
			description:
				
				
				`Détectez une présence même immobile avec LD2410C, ESP32-C6 et ESPHome : UART, YAML, portée et Home Assistant. Matériel, schéma GPIO, YAML ESPHome et Home A`,
			h1: 'Détecteur de présence mmWave (LD2410)',
			objective:
				'Vous allez construire un détecteur de présence qui reste « occupé » tant que quelqu’un se trouve dans la pièce, même s’il est assis sans bouger. Le radar LD2410C, un petit capteur qui émet des ondes millimétriques (« mmWave ») et mesure à la fois le mouvement et l’immobilité, est relié à un ESP32, une petite carte électronique équipée du Wi-Fi. La carte transmet à Home Assistant, le logiciel qui réunit vos appareils connectés, la présence, les distances et l’intensité du signal détecté.',
			usefulness:
				'Un détecteur infrarouge classique, dit PIR, ne voit que les mouvements : il éteint la lumière pendant que vous lisez ou travaillez sans bouger. Le radar mmWave évite ce défaut, ce qui le rend très utile dans un bureau, une salle de bain, une chambre ou des toilettes. Il permet aussi de couper le chauffage d’une pièce réellement vide, au lieu de se fier à un programme horaire.',
			prerequisites: [
				'Un Home Assistant avec ESPHome et une alimentation 5 V à proximité du lieu d’installation.',
				'Un module LD2410C (ou LD2410B) : la carte radar est alimentée en 5 V ; sa liaison série reste en 3,3 V, compatible avec l’ESP32.',
				'Savoir identifier TX et RX : le TX du radar va sur le RX de l’ESP32, et inversement.',
			],
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Carte de commande (voir l’encadré plus haut).', productId: 'esp32-c6-devkitc' },
				{ name: 'Module radar HLK-LD2410C (24 GHz)', qty: 1, note: 'Livré avec un petit connecteur à pas réduit : prévoyez le câble adaptateur ou des broches à souder. Alimenté en 5 V.', q: true },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Câbler le radar en liaison série',
					actions: [
						'Câblez le radar avec l’alimentation USB débranchée. Le radar parle à la carte par une liaison série, c’est-à-dire deux fils qui transmettent des données chacun dans un sens, appelés TX (émission) et RX (réception). Reliez d’abord le 5V du radar à la broche 5V de la carte et le GND du radar à une broche GND.',
						'Croisez ensuite les fils de données, comme deux personnes qui se parlent : le TX du radar va sur GPIO19, la broche de réception (RX) de la carte, et le RX du radar va sur GPIO20, la broche d’émission (TX) de la carte. GPIO désigne les broches métalliques alignées sur le bord de la carte.',
						'Laissez la broche OUT libre : elle n’est pas utilisée ici, l’état de présence passe par la liaison série.',
					],
					observe: 'Rien ne clignote sur le module au branchement : le radar est silencieux tant qu’il n’est pas sous tension.',
					check: 'TX et RX ne sont pas du même côté : le fil TX→RX est bien croisé.',
				},
				{
					title: 'Régler la portée et le délai de maintien',
					actions: [
						'Dans Home Assistant, ouvrez l’appareil ESPHome pour découvrir les réglages du radar : les entités « Max moving gate » (portée maximale pour le mouvement), « Max still gate » (portée maximale pour l’immobilité) et « Hold time » (durée pendant laquelle la présence est maintenue) apparaissent.',
						'Chaque « porte » correspond à environ 0,75 m. Réduisez-les pour ne pas détecter le couloir voisin.',
						'Mettez « Hold time » à 10–30 s pour une lumière, plus long pour du chauffage.',
					],
					observe: 'Quand vous quittez la pièce, « Presence » reste actif jusqu’à la fin du délai puis passe sur « Aucune présence ».',
					check: 'Asseyez-vous immobile pendant 2 minutes : la présence reste détectée (énergie « Still energy » > 0).',
				},
				{
					title: 'Choisir l’emplacement et désactiver le Bluetooth',
					actions: [
						'Fixez le radar face à la zone à couvrir, en l’éloignant des ventilateurs, des rideaux qui bougent et des climatiseurs : ces objets créent des mouvements que le radar interprète à tort comme une présence.',
						'Évitez de le placer derrière une plaque métallique : le métal bloque les ondes.',
						'Une fois réglé, mettez l’interrupteur « LD2410 Bluetooth » sur Off : le mot de passe par défaut est public.',
					],
					observe: 'Aucune fausse détection pendant 24 heures dans une pièce vide.',
					check: 'Testez avec les portes ouvertes : le radar traverse certaines cloisons légères, il faut parfois réduire la portée.',
				},
			],
			haIntegration: [
				'L’entité « Presence » (type occupation) est un capteur binaire exploitable directement par les automatisations de lumière ; « Moving target » et « Still target » affinent la décision.',
				'Automatisation type : présence ON et luminosité faible → allumer la lumière ; présence OFF pendant 2 minutes → éteindre. Combinez avec un capteur de luminosité pour éviter d’allumer en plein jour.',
				'Pour l’étalonnage, tracez « Moving distance » et « Still energy » dans l’historique pendant quelques jours et ajustez les portées.',
			],
			troubleshooting: [
				{ problem: 'Aucune donnée, entités indisponibles', solution: 'TX et RX sont probablement inversés, ou le radar n’est pas alimenté en 5 V. Vérifiez les fils ; si les journaux (« Logs ») n’affichent aucune mesure du radar, la liaison série est coupée ou inversée.' },
				{ problem: 'Présence détectée en permanence', solution: 'Un ventilateur ou un rideau bouge dans le champ. Réduisez les portées, orientez le radar ailleurs ou masquez la zone.' },
				{ problem: 'Présence perdue quand je suis immobile', solution: 'Augmentez la sensibilité d’immobilité (seuils « still ») dans l’application constructeur ou rapprochez le radar ; la détection d’une personne immobile est plus courte que celle d’un mouvement.' },
				{ problem: 'Erreurs de réception UART', solution: 'Raccourcissez les fils, alimentez en 5 V stable (pas depuis un port USB faible) et vérifiez que le baud rate est bien 256000.' },
			],
			faq: [
				{ question: 'mmWave ou PIR : lequel choisir ?', answer: 'Le PIR est moins cher et suffit pour un couloir. Le mmWave détecte aussi l’immobilité, ce qui convient aux pièces de vie, mais demande un réglage et une alimentation 5 V.' },
				{ question: 'Le radar est-il dangereux pour la santé ?', answer: 'Il émet à très faible puissance (module vendu pour usage domestique) ; consultez la fiche du fabricant et la déclaration de conformité CE du module acheté pour les valeurs exactes.' },
				{ question: 'Peut-on alimenter l’ensemble sur batterie ?', answer: 'Non : le radar consomme en continu et le Wi-Fi reste actif. Prévoyez une alimentation USB 5 V permanente.' },
			],
		},
		en: {
			title: `mmWave LD2410 presence sensor ESPHome`,
			description:
				
				
				`Detect presence even when still with LD2410C, ESP32-C6 and ESPHome: UART wiring, YAML, range and Home Assistant. Parts list, GPIO wiring, ESPHome YAML and`,
			h1: 'mmWave presence sensor (LD2410)',
			objective:
				'You will build a presence detector that stays “occupied” as long as someone is in the room, even if they sit without moving. The LD2410C radar, a small sensor that emits millimetre waves (“mmWave”) and measures both movement and stillness, is wired to an ESP32, a small electronic board with Wi-Fi. The board passes the presence, the distances and the strength of the detected signal to Home Assistant, the software that gathers your connected devices.',
			usefulness:
				'A classic infrared detector, known as a PIR, only sees movement: it turns the light off while you read or work without moving. The mmWave radar avoids this flaw, which makes it very useful in an office, a bathroom, a bedroom or a toilet. It also lets you switch off the heating in a room that is really empty, instead of relying on a timetable.',
			prerequisites: [
				'Home Assistant with ESPHome and a 5 V supply near the install spot.',
				'An LD2410C (or LD2410B) module: the radar board runs on 5 V while its serial link stays 3.3 V, compatible with the ESP32.',
				'Knowing TX from RX: the radar’s TX goes to the ESP32’s RX, and vice versa.',
			],
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Control board (see the box above).', productId: 'esp32-c6-devkitc' },
				{ name: 'HLK-LD2410C radar module (24 GHz)', qty: 1, note: 'Ships with a small fine-pitch connector: plan an adapter cable or pin headers to solder. Powered at 5 V.', q: true },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Wire the radar over serial',
					actions: [
						'Wire the radar with the USB power unplugged. The radar talks to the board through a serial link, that is two wires that each carry data in one direction, called TX (transmit) and RX (receive). First connect the radar’s 5V to the 5V pin of the board and the radar’s GND to a GND pin.',
						'Then cross the data wires, like two people talking to each other: the radar’s TX goes to GPIO19, the board’s receive pin (RX), and the radar’s RX goes to GPIO20, the board’s transmit pin (TX). GPIO refers to the metal pins lined up along the edge of the board.',
						'Leave the OUT pin unconnected: it is not used here, presence comes over the serial link.',
					],
					observe: 'Nothing blinks on the module when you plug it in: the radar is silent until it is powered.',
					check: 'TX and RX are not on the same side: the TX→RX wire is crossed.',
				},
				{
					title: 'Set the range and hold time',
					actions: [
						'In Home Assistant, open the ESPHome device to find the radar settings: the entities “Max moving gate” (maximum range for movement), “Max still gate” (maximum range for stillness) and “Hold time” (how long presence is kept) appear.',
						'Each “gate” is about 0.75 m. Lower them so the neighbouring corridor is not detected.',
						'Set “Hold time” to 10–30 s for a light, longer for heating.',
					],
					observe: 'When you leave the room, “Presence” stays on until the delay ends, then turns off.',
					check: 'Sit still for 2 minutes: presence remains detected (“Still energy” > 0).',
				},
				{
					title: 'Choose the position and disable Bluetooth',
					actions: [
						'Fix the radar facing the area to cover, away from fans, moving curtains and air conditioners: these objects create movement that the radar wrongly reads as presence.',
						'Avoid putting it behind a metal plate: metal blocks the waves.',
						'Once tuned, switch “LD2410 Bluetooth” off: the default password is public.',
					],
					observe: 'No false detection for 24 hours in an empty room.',
					check: 'Test with doors open: the radar passes through some light partitions, so you may need a shorter range.',
				},
			],
			haIntegration: [
				'The “Presence” entity (occupancy type) is a binary sensor ready for lighting automations; “Moving target” and “Still target” refine the decision.',
				'Typical automation: presence ON and low brightness → turn the light on; presence OFF for 2 minutes → turn it off. Combine with an illuminance sensor to avoid lighting in daytime.',
				'For tuning, graph “Moving distance” and “Still energy” in history for a few days and adjust the ranges.',
			],
			troubleshooting: [
				{ problem: 'No data, entities unavailable', solution: 'TX and RX are probably swapped, or the radar is not powered at 5 V. Check the wires; if the “Logs” show no radar data, the serial link is broken or reversed.' },
				{ problem: 'Presence detected all the time', solution: 'A fan or curtain moves in the field. Lower the ranges, aim the radar elsewhere or mask the area.' },
				{ problem: 'Presence lost when I sit still', solution: 'Raise the stillness sensitivity (“still” thresholds) in the manufacturer’s app or move the radar closer; still-person detection range is shorter than for motion.' },
				{ problem: 'UART receive errors', solution: 'Shorten the wires, use a stable 5 V supply (not a weak USB port) and check that the baud rate is 256000.' },
			],
			faq: [
				{ question: 'mmWave or PIR: which one?', answer: 'PIR is cheaper and enough for a corridor. mmWave also detects stillness, which suits living spaces, but needs tuning and a 5 V supply.' },
				{ question: 'Is the radar a health risk?', answer: 'It transmits at very low power (module sold for home use); check the manufacturer datasheet and the CE declaration of the module you buy for exact values.' },
				{ question: 'Can the assembly run on a battery?', answer: 'No: the radar draws power continuously and Wi-Fi stays on. Plan a permanent 5 V USB supply.' },
			],
		},
		de: {
			title: `mmWave-Präsenz LD2410 ESP32 ESPHome`,
			description:
				
				
				`Präsenz auch ohne Bewegung: LD2410C, ESP32-C6 und ESPHome — UART, YAML, Reichweite und Home Assistant. Material, GPIO-Plan, ESPHome-YAML und Home Assistant`,
			h1: 'mmWave-Präsenzmelder (LD2410)',
			objective:
				'Sie bauen einen Anwesenheitsmelder, der „belegt“ meldet, solange sich jemand im Raum aufhält, auch wenn die Person ruhig sitzt. Das Radar LD2410C, ein kleiner Sensor, der Millimeterwellen („mmWave“) aussendet und sowohl Bewegung als auch Stillstand misst, wird mit einem ESP32 verbunden, einer kleinen Elektronikplatine mit WLAN. Die Platine gibt Anwesenheit, Entfernungen und die Stärke des erkannten Signals an Home Assistant weiter, die Software, die Ihre vernetzten Geräte vereint.',
			usefulness:
				'Ein klassischer Infrarotmelder, ein sogenannter PIR, sieht nur Bewegung: Er schaltet das Licht aus, während Sie ruhig lesen oder arbeiten. Das mmWave-Radar vermeidet diesen Fehler und ist deshalb im Büro, im Bad, im Schlafzimmer oder auf der Toilette sehr nützlich. Außerdem können Sie damit die Heizung in einem wirklich leeren Raum abschalten, statt sich auf einen Zeitplan zu verlassen.',
			prerequisites: [
				'Home Assistant mit ESPHome und eine 5-V-Versorgung nahe dem Einbauort.',
				'Ein LD2410C- (oder LD2410B-)Modul: Die Radarplatine läuft mit 5 V, ihre serielle Schnittstelle bleibt bei 3,3 V und passt zum ESP32.',
				'TX und RX unterscheiden können: TX des Radars geht an RX des ESP32 und umgekehrt.',
			],
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Steuerplatine (siehe Kasten oben).', productId: 'esp32-c6-devkitc' },
				{ name: 'Radarmodul HLK-LD2410C (24 GHz)', qty: 1, note: 'Wird mit einem kleinen Feinraster-Stecker geliefert: Adapterkabel oder Stiftleisten zum Anlöten einplanen. Versorgung 5 V.', q: true },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Radar seriell verdrahten',
					actions: [
						'Verdrahten Sie das Radar bei abgezogener USB-Stromversorgung. Das Radar spricht über eine serielle Verbindung mit der Platine, also über zwei Leitungen, die Daten jeweils in eine Richtung übertragen und TX (Senden) und RX (Empfangen) heißen. Verbinden Sie zuerst 5V des Radars mit dem Pin 5V der Platine und GND des Radars mit einem GND-Pin.',
						'Kreuzen Sie dann die Datenleitungen wie zwei Menschen, die miteinander sprechen: TX des Radars geht an GPIO19, den Empfangspin (RX) der Platine, und RX des Radars an GPIO20, den Sendepin (TX) der Platine. GPIO nennt man die metallenen Pins am Rand der Platine.',
						'Den Pin OUT unbeschaltet lassen: Er wird nicht benutzt, die Präsenz kommt über die serielle Leitung.',
					],
					observe: 'Am Modul blinkt beim Einstecken nichts: Das Radar bleibt still, bis es Spannung hat.',
					check: 'TX und RX liegen nicht auf derselben Seite: Die Leitung TX→RX ist gekreuzt.',
				},
				{
					title: 'Reichweite und Haltezeit einstellen',
					actions: [
						'Öffnen Sie in Home Assistant das ESPHome-Gerät, um die Radar-Einstellungen zu finden: Die Entitäten „Max moving gate“ (maximale Reichweite für Bewegung), „Max still gate“ (maximale Reichweite für Stillstand) und „Hold time“ (wie lange die Anwesenheit gehalten wird) erscheinen.',
						'Jedes „Gate“ entspricht etwa 0,75 m. Verkleinern Sie sie, damit der Nachbarflur nicht erfasst wird.',
						'„Hold time“ auf 10–30 s für Licht, länger für Heizung setzen.',
					],
					observe: 'Verlassen Sie den Raum, bleibt „Presence“ bis zum Ende der Zeit aktiv und fällt dann ab.',
					check: 'Setzen Sie sich 2 Minuten ruhig hin: Die Präsenz bleibt erkannt („Still energy“ > 0).',
				},
				{
					title: 'Standort wählen und Bluetooth abschalten',
					actions: [
						'Befestigen Sie das Radar mit Blick auf den zu überwachenden Bereich, abseits von Ventilatoren, bewegten Vorhängen und Klimageräten: Diese Dinge erzeugen Bewegungen, die das Radar fälschlich als Anwesenheit deutet.',
						'Nicht hinter einer Metallplatte montieren: Metall blockiert die Wellen.',
						'Nach dem Einstellen „LD2410 Bluetooth“ auf Aus stellen: Das Standardpasswort ist öffentlich bekannt.',
					],
					observe: 'Keine Fehlerkennung über 24 Stunden in einem leeren Raum.',
					check: 'Mit offenen Türen testen: Das Radar durchdringt manche leichten Wände, die Reichweite muss eventuell kleiner sein.',
				},
			],
			haIntegration: [
				'Die Entität „Presence“ (Typ Belegung) ist ein Binärsensor, direkt für Licht-Automatisierungen nutzbar; „Moving target“ und „Still target“ verfeinern die Entscheidung.',
				'Typische Automatisierung: Präsenz EIN und wenig Helligkeit → Licht an; Präsenz AUS seit 2 Minuten → Licht aus. Mit einem Helligkeitssensor kombinieren, um tagsüber nicht einzuschalten.',
				'Zum Feinabgleich „Moving distance“ und „Still energy“ einige Tage im Verlauf darstellen und die Reichweiten anpassen.',
			],
			troubleshooting: [
				{ problem: 'Keine Daten, Entitäten nicht verfügbar', solution: 'TX und RX sind vermutlich vertauscht oder das Radar bekommt keine 5 V. Kabel prüfen; zeigen die „Logs“ keine Radardaten, ist die serielle Leitung unterbrochen oder vertauscht.' },
				{ problem: 'Dauerhaft Präsenz erkannt', solution: 'Ein Ventilator oder Vorhang bewegt sich im Erfassungsfeld. Reichweiten verringern, das Radar anders ausrichten oder den Bereich ausblenden.' },
				{ problem: 'Präsenz geht verloren, wenn ich still sitze', solution: 'Ruhe-Empfindlichkeit („still“-Schwellen) in der Hersteller-App erhöhen oder das Radar näher platzieren; die Reichweite für ruhende Personen ist kürzer als für Bewegung.' },
				{ problem: 'UART-Empfangsfehler', solution: 'Kabel kürzen, stabile 5-V-Versorgung (kein schwacher USB-Port) nutzen und prüfen, dass die Baudrate 256000 beträgt.' },
			],
			faq: [
				{ question: 'mmWave oder PIR: was nehmen?', answer: 'PIR ist günstiger und reicht für einen Flur. mmWave erkennt auch Stillstand, passend für Wohnräume, braucht aber Abgleich und 5 V.' },
				{ question: 'Ist das Radar gesundheitlich bedenklich?', answer: 'Es sendet mit sehr geringer Leistung (Modul für Heimgebrauch); genaue Werte stehen im Datenblatt des Herstellers und in der CE-Konformitätserklärung des gekauften Moduls.' },
				{ question: 'Geht Batteriebetrieb?', answer: 'Nein: Das Radar verbraucht dauerhaft Strom und das WLAN bleibt aktiv. Eine dauerhafte 5-V-USB-Versorgung einplanen.' },
			],
		},
		it: {
			title: `Presenza mmWave LD2410 ESP32 ESPHome`,
			description:
				
				
				`Rilevate presenza anche da fermi con LD2410C, ESP32-C6 e ESPHome: UART, YAML, portata e Home Assistant. Materiale, schema GPIO, YAML ESPHome e Home Assista`,
			h1: 'Rilevatore di presenza mmWave (LD2410)',
			objective:
				'Costruirete un rilevatore di presenza che resta «occupato» finché qualcuno si trova nella stanza, anche se sta seduto fermo. Il radar LD2410C, un piccolo sensore che emette onde millimetriche («mmWave») e misura sia il movimento sia l’immobilità, viene collegato a un ESP32, una piccola scheda elettronica con Wi-Fi. La scheda trasmette a Home Assistant, il software che riunisce i vostri dispositivi connessi, la presenza, le distanze e l’intensità del segnale rilevato.',
			usefulness:
				'Un rilevatore a infrarossi classico, detto PIR, vede solo i movimenti: spegne la luce mentre leggete o lavorate stando fermi. Il radar mmWave evita questo difetto, ed è quindi molto utile in uno studio, in un bagno, in una camera o in un servizio igienico. Permette anche di spegnere il riscaldamento di una stanza davvero vuota, invece di affidarsi a un programma orario.',
			prerequisites: [
				'Home Assistant con ESPHome e un’alimentazione 5 V vicino al punto di installazione.',
				'Un modulo LD2410C (o LD2410B): la scheda radar va a 5 V, la sua seriale resta a 3,3 V, compatibile con l’ESP32.',
				'Saper distinguere TX e RX: il TX del radar va sull’RX dell’ESP32 e viceversa.',
			],
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Scheda di comando (vedi il riquadro sopra).', productId: 'esp32-c6-devkitc' },
				{ name: 'Modulo radar HLK-LD2410C (24 GHz)', qty: 1, note: 'Fornito con un piccolo connettore a passo ridotto: prevedete un cavo adattatore o pin da saldare. Alimentato a 5 V.', q: true },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Cablare il radar in seriale',
					actions: [
						'Cablate il radar con l’alimentazione USB scollegata. Il radar parla con la scheda tramite un collegamento seriale, cioè due fili che trasportano dati ciascuno in una direzione, chiamati TX (trasmissione) e RX (ricezione). Collegate prima il 5V del radar al pin 5V della scheda e il GND del radar a un pin GND.',
						'Poi incrociate i fili dei dati, come due persone che si parlano: il TX del radar va a GPIO19, il pin di ricezione (RX) della scheda, e l’RX del radar va a GPIO20, il pin di trasmissione (TX) della scheda. GPIO indica i pin metallici allineati sul bordo della scheda.',
						'Lasciate libero il pin OUT: qui non serve, la presenza passa dalla seriale.',
					],
					observe: 'Sul modulo non lampeggia nulla al collegamento: il radar è silenzioso finché non è alimentato.',
					check: 'TX e RX non sono dallo stesso lato: il filo TX→RX è incrociato.',
				},
				{
					title: 'Regolare portata e tempo di mantenimento',
					actions: [
						'In Home Assistant aprite il dispositivo ESPHome per trovare le impostazioni del radar: compaiono le entità «Max moving gate» (portata massima per il movimento), «Max still gate» (portata massima per l’immobilità) e «Hold time» (per quanto tempo si mantiene la presenza).',
						'Ogni «porta» vale circa 0,75 m. Riducetele per non rilevare il corridoio vicino.',
						'Impostate «Hold time» a 10–30 s per una luce, di più per il riscaldamento.',
					],
					observe: 'Quando lasciate la stanza «Presence» resta attivo fino alla fine del ritardo, poi si disattiva.',
					check: 'Sedetevi immobili per 2 minuti: la presenza resta rilevata («Still energy» > 0).',
				},
				{
					title: 'Scegliere la posizione e disattivare il Bluetooth',
					actions: [
						'Fissate il radar rivolto verso la zona da coprire, lontano da ventilatori, tende che si muovono e condizionatori: questi oggetti creano movimenti che il radar interpreta per errore come presenza.',
						'Evitate di metterlo dietro una piastra metallica: il metallo blocca le onde.',
						'A regolazione finita portate «LD2410 Bluetooth» su Off: la password predefinita è pubblica.',
					],
					observe: 'Nessun falso rilevamento per 24 ore in una stanza vuota.',
					check: 'Provate con le porte aperte: il radar attraversa alcune pareti leggere, può servire ridurre la portata.',
				},
			],
			haIntegration: [
				'L’entità «Presence» (tipo occupazione) è un sensore binario utilizzabile subito nelle automazioni luci; «Moving target» e «Still target» affinano la decisione.',
				'Automazione tipica: presenza ON e luminosità bassa → accendere la luce; presenza OFF per 2 minuti → spegnere. Combinate con un sensore di luminosità per non accendere di giorno.',
				'Per la messa a punto, tracciate «Moving distance» e «Still energy» nello storico per qualche giorno e regolate le portate.',
			],
			troubleshooting: [
				{ problem: 'Nessun dato, entità non disponibili', solution: 'TX e RX sono probabilmente invertiti o il radar non è alimentato a 5 V. Controllate i fili; se i «Logs» non mostrano dati del radar, la seriale è interrotta o invertita.' },
				{ problem: 'Presenza rilevata di continuo', solution: 'Un ventilatore o una tenda si muove nel campo. Riducete le portate, orientate altrove il radar o mascherate la zona.' },
				{ problem: 'La presenza si perde se resto immobile', solution: 'Aumentate la sensibilità all’immobilità (soglie «still») nell’app del produttore o avvicinate il radar; la portata per una persona ferma è minore di quella per il movimento.' },
				{ problem: 'Errori di ricezione UART', solution: 'Accorciate i fili, usate un’alimentazione 5 V stabile (non una porta USB debole) e verificate che il baud rate sia 256000.' },
			],
			faq: [
				{ question: 'mmWave o PIR: quale scegliere?', answer: 'Il PIR costa meno e basta per un corridoio. Il mmWave rileva anche l’immobilità, adatto alle stanze vissute, ma richiede regolazione e 5 V.' },
				{ question: 'Il radar è pericoloso per la salute?', answer: 'Emette a potenza molto bassa (modulo venduto per uso domestico); i valori esatti sono nella scheda del produttore e nella dichiarazione CE del modulo acquistato.' },
				{ question: 'Si può alimentare a batteria?', answer: 'No: il radar consuma di continuo e il Wi-Fi resta attivo. Prevedete un’alimentazione USB 5 V permanente.' },
			],
		},
		es: {
			title: `Presencia mmWave LD2410 ESP32 ESPHome`,
			description:
				
				
				`Detecta presencia aunque esté quieto con LD2410C, ESP32-C6 y ESPHome: UART, YAML, alcance y Home Assistant. Material, esquema GPIO, YAML ESPHome y Home Ass`,
			h1: 'Detector de presencia mmWave (LD2410)',
			objective:
				'Vas a construir un detector de presencia que sigue «ocupado» mientras haya alguien en la habitación, aunque esté sentado sin moverse. El radar LD2410C, un pequeño sensor que emite ondas milimétricas («mmWave») y mide tanto el movimiento como la inmovilidad, se conecta a un ESP32, una pequeña placa electrónica con Wi-Fi. La placa transmite a Home Assistant, el software que reúne tus dispositivos conectados, la presencia, las distancias y la intensidad de la señal detectada.',
			usefulness:
				'Un detector infrarrojo clásico, llamado PIR, solo ve los movimientos: apaga la luz mientras lees o trabajas sin moverte. El radar mmWave evita ese defecto, por lo que resulta muy útil en un despacho, un baño, un dormitorio o un aseo. También permite apagar la calefacción de una habitación realmente vacía, en lugar de fiarse de un horario programado.',
			prerequisites: [
				'Home Assistant con ESPHome y una alimentación de 5 V cerca del lugar de instalación.',
				'Un módulo LD2410C (o LD2410B): la placa del radar funciona a 5 V, su enlace serie sigue a 3,3 V, compatible con el ESP32.',
				'Distinguir TX de RX: el TX del radar va al RX del ESP32 y viceversa.',
			],
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Placa de control (véase el recuadro de arriba).', productId: 'esp32-c6-devkitc' },
				{ name: 'Módulo radar HLK-LD2410C (24 GHz)', qty: 1, note: 'Se entrega con un pequeño conector de paso reducido: prevé un cable adaptador o pines para soldar. Alimentado a 5 V.', q: true },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Cablear el radar por serie',
					actions: [
						'Cablea el radar con la alimentación USB desconectada. El radar habla con la placa mediante una conexión serie, es decir, dos cables que transportan datos cada uno en un sentido y se llaman TX (transmisión) y RX (recepción). Une primero el 5V del radar al pin 5V de la placa y el GND del radar a un pin GND.',
						'Cruza después los cables de datos, como dos personas que se hablan: el TX del radar va a GPIO19, el pin de recepción (RX) de la placa, y el RX del radar va a GPIO20, el pin de transmisión (TX) de la placa. GPIO designa los pines metálicos alineados en el borde de la placa.',
						'Deja libre el pin OUT: aquí no se usa, la presencia llega por el enlace serie.',
					],
					observe: 'En el módulo no parpadea nada al conectarlo: el radar es silencioso hasta que recibe tensión.',
					check: 'TX y RX no están del mismo lado: el cable TX→RX está cruzado.',
				},
				{
					title: 'Ajustar el alcance y el tiempo de retención',
					actions: [
						'En Home Assistant abre el dispositivo ESPHome para encontrar los ajustes del radar: aparecen las entidades «Max moving gate» (alcance máximo para el movimiento), «Max still gate» (alcance máximo para la inmovilidad) y «Hold time» (cuánto tiempo se mantiene la presencia).',
						'Cada «puerta» equivale a unos 0,75 m. Redúcelas para no detectar el pasillo contiguo.',
						'Pon «Hold time» en 10–30 s para una luz, más largo para calefacción.',
					],
					observe: 'Al salir de la habitación, «Presence» sigue activa hasta que acaba el retardo y luego se desactiva.',
					check: 'Siéntate quieto 2 minutos: la presencia sigue detectada («Still energy» > 0).',
				},
				{
					title: 'Elegir la ubicación y desactivar el Bluetooth',
					actions: [
						'Fija el radar frente a la zona que quieres cubrir, lejos de ventiladores, cortinas que se mueven y aparatos de aire acondicionado: esos objetos crean movimientos que el radar interpreta por error como presencia.',
						'Evita ponerlo detrás de una placa metálica: el metal bloquea las ondas.',
						'Una vez ajustado, pon «LD2410 Bluetooth» en Off: la contraseña por defecto es pública.',
					],
					observe: 'Ninguna falsa detección durante 24 horas en una habitación vacía.',
					check: 'Prueba con las puertas abiertas: el radar atraviesa algunas paredes ligeras, quizá debas reducir el alcance.',
				},
			],
			haIntegration: [
				'La entidad «Presence» (tipo ocupación) es un sensor binario aprovechable directamente en automatizaciones de luz; «Moving target» y «Still target» afinan la decisión.',
				'Automatización típica: presencia ON y poca luminosidad → encender la luz; presencia OFF durante 2 minutos → apagar. Combínala con un sensor de luminosidad para no encender de día.',
				'Para afinar, representa «Moving distance» y «Still energy» en el historial unos días y ajusta los alcances.',
			],
			troubleshooting: [
				{ problem: 'Sin datos, entidades no disponibles', solution: 'TX y RX probablemente están invertidos o el radar no recibe 5 V. Revisa los cables; si los «Logs» no muestran datos del radar, el enlace serie está cortado o invertido.' },
				{ problem: 'Presencia detectada todo el tiempo', solution: 'Un ventilador o una cortina se mueve en el campo. Reduce los alcances, orienta el radar a otro sitio o enmascara la zona.' },
				{ problem: 'Se pierde la presencia si estoy quieto', solution: 'Aumenta la sensibilidad a la inmovilidad (umbrales «still») en la app del fabricante o acerca el radar; el alcance para una persona quieta es menor que para el movimiento.' },
				{ problem: 'Errores de recepción UART', solution: 'Acorta los cables, usa una alimentación de 5 V estable (no un puerto USB débil) y comprueba que el baud rate sea 256000.' },
			],
			faq: [
				{ question: '¿mmWave o PIR?', answer: 'El PIR es más barato y basta para un pasillo. El mmWave detecta también la inmovilidad, ideal para estancias de uso, pero requiere ajuste y 5 V.' },
				{ question: '¿Es peligroso para la salud?', answer: 'Emite a muy baja potencia (módulo vendido para uso doméstico); los valores exactos están en la ficha del fabricante y en la declaración CE del módulo que compres.' },
				{ question: '¿Se puede alimentar con batería?', answer: 'No: el radar consume continuamente y el Wi-Fi sigue activo. Prevé una alimentación USB de 5 V permanente.' },
			],
		},
	},
};
