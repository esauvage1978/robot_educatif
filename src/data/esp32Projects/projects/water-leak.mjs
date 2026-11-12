import { esphomeHeader } from '../shared.mjs';

const yaml =
	esphomeHeader('detecteur-fuite', 'Water leak detector') +
	`
switch:
  - platform: gpio
    id: probe_power
    pin: GPIO18                  # powers the probe only while measuring (limits corrosion)
    restore_mode: ALWAYS_OFF
    internal: true

sensor:
  - platform: adc
    id: leak_level
    pin: GPIO2                   # ADC1 channel on the ESP32-C6
    name: "Leak probe level"
    update_interval: never       # read on demand by the interval below
    attenuation: 12db            # full 0-3.3 V range
    accuracy_decimals: 2
    entity_category: diagnostic

  - platform: wifi_signal
    name: "WiFi signal"
    update_interval: 120s
    entity_category: diagnostic

interval:
  - interval: 30s
    then:
      - switch.turn_on: probe_power
      - delay: 300ms             # let the probe settle before reading
      - component.update: leak_level
      - switch.turn_off: probe_power

binary_sensor:
  - platform: analog_threshold
    name: "Water leak"
    device_class: moisture
    sensor_id: leak_level
    threshold:
      upper: 1.2                 # CHANGE after measuring your probe dry and wet
      lower: 0.8                 # hysteresis: back to dry below this value
`;

export const project = {
	id: 'water-leak',
	level: 'intermediate',
	durationHours: '1–3',
	budgetRange: {
		fr: 'environ 12–30 € selon vendeur',
		en: 'about €12–30 depending on the seller',
		de: 'ca. 12–30 € je nach Händler',
		it: 'circa 12–30 € a seconda del venditore',
		es: 'unos 12–30 € según el vendedor',
	},
	slugs: {
		fr: 'detecteur-fuite-eau',
		en: 'water-leak-detector',
		de: 'wasserleckagesensor',
		it: 'sensore-perdita-acqua',
		es: 'detector-fuga-agua',
	},
	fullGuide: null,
	productIds: ['esp32-c6-devkitc'],
	searchQueries: {
		fr: 'module capteur niveau eau analogique Arduino',
		en: 'water level sensor module analog Arduino',
		de: 'Wassersensor Modul analog Arduino',
		it: 'modulo sensore livello acqua analogico Arduino',
		es: 'módulo sensor nivel de agua analógico Arduino',
	},
	smallMaterialIds: ['usb', 'psu', 'dupont', 'breadboard', 'heatshrink', 'enclosure'],
	flashAfter: 1,
	wiring: {
		sensorName: { fr: 'Sonde d’eau', en: 'Water probe', de: 'Wassersonde', it: 'Sonda acqua', es: 'Sonda de agua' },
		pins: [
			{ gpio: 'GPIO18', signal: 'VCC (+)', color: 'power' },
			{ gpio: 'GND', signal: 'GND (−)', color: 'ground' },
			{ gpio: 'GPIO2', signal: 'AO (S)', color: 'data' },
		],
		principleBoxes: {
			fr: [
				{ title: `Sonde d’eau`, s: 'Sonde d’eau', a: 'Pistes nues : l’eau les relie', b: 'Alimentée seulement pendant la mesure' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Mesure toutes les 30 s (ADC)', b: 'Compare à un seuil réglable', via: 'AO sur GPIO2' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Entité « Water leak » (humidité)', b: 'Notification et coupure d’une prise', via: 'Wi-Fi 2,4 GHz + API chiffrée' },
			],
			en: [
				{ title: 'Water probe', s: 'Water probe', a: 'Bare traces: water bridges them', b: 'Powered only while measuring' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Measures every 30 s (ADC)', b: 'Compares with an adjustable threshold', via: 'AO on GPIO2' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: '“Water leak” entity (moisture)', b: 'Notification and plug cut-off', via: '2.4 GHz Wi-Fi + encrypted API' },
			],
			de: [
				{ title: 'Wassersonde', s: 'Wassersonde', a: 'Blanke Leiterbahnen: Wasser überbrückt sie', b: 'Nur während der Messung bestromt' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Misst alle 30 s (ADC)', b: 'Vergleicht mit einstellbarem Schwellwert', via: 'AO an GPIO2' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Entität „Water leak“ (Feuchtigkeit)', b: 'Benachrichtigung und Steckdose aus', via: '2,4-GHz-WLAN + verschlüsselte API' },
			],
			it: [
				{ title: 'Sonda acqua', s: 'Sonda acqua', a: 'Piste nude: l’acqua le collega', b: 'Alimentata solo durante la misura' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Misura ogni 30 s (ADC)', b: 'Confronta con una soglia regolabile', via: 'AO su GPIO2' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Entità «Water leak» (umidità)', b: 'Notifica e spegnimento di una presa', via: 'Wi-Fi 2,4 GHz + API cifrata' },
			],
			es: [
				{ title: 'Sonda de agua', s: 'Sonda de agua', a: 'Pistas desnudas: el agua las une', b: 'Alimentada solo al medir' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Mide cada 30 s (ADC)', b: 'Compara con un umbral ajustable', via: 'AO en GPIO2' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Entidad «Water leak» (humedad)', b: 'Notificación y corte de un enchufe', via: 'Wi-Fi 2,4 GHz + API cifrada' },
			],
		},
	},
	yaml,
	locales: {
		fr: {
			title: `Détecteur fuite d’eau ESP32 ESPHome`,
			description:
				
				
				`Alertez Home Assistant en cas de fuite : sonde d’eau, ESP32-C6, ESPHome, câblage, YAML et automatisations. Matériel, schéma GPIO, YAML ESPHome et Home Assi`,
			h1: 'Détecteur de fuite d’eau',
			objective:
				'Vous allez poser une sonde au sol sous un lave-linge, un chauffe-eau ou un évier, et recevoir une alerte dans Home Assistant, le logiciel qui réunit vos appareils connectés, dès que de l’eau relie les pistes de la sonde. Un ESP32, une petite carte électronique équipée du Wi-Fi, ne la consulte que toutes les 30 secondes et ne l’alimente que pendant la lecture, ce qui retarde l’oxydation des pistes métalliques.',
			usefulness:
				'Une fuite lente sous un appareil passe souvent inaperçue pendant des jours, le temps d’abîmer le meuble ou le sol. Ce montage vous prévient avant les dégâts importants, et une automatisation peut même couper une prise connectée, par exemple celle du lave-linge, dès que l’alerte se déclenche.',
			prerequisites: [
				'Un Home Assistant avec ESPHome et une prise de courant à proximité du lieu de pose (alimentation USB 5 V).',
				'Un module capteur d’eau analogique à trois broches (S, + et −), de type « water sensor » pour microcontrôleur.',
				'Un verre d’eau et un multimètre ou le journal ESPHome pour calibrer le seuil.',
			],
			safety:
				'Le capteur est alimenté en 3,3 V ; il ne doit jamais être relié à une tension secteur ni servir à surveiller une cuve sous tension. L’électronique (carte et alimentation USB) doit rester au sec, en hauteur : seule la sonde est posée au sol. Pour une zone critique (chaudière, cave inondable), complétez par un détecteur de fuite du commerce certifié.',
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Carte de commande (voir l’encadré plus haut).', productId: 'esp32-c6-devkitc' },
				{ name: 'Module sonde d’eau analogique (pistes nues)', qty: 1, note: 'Sortie analogique AO : la valeur change quand l’eau relie les pistes. Les pistes finissent par s’oxyder : prévoir de remplacer la sonde.', q: true },
				{ name: 'Rallonge de fil 3 conducteurs', qty: '1 à 3 m', note: 'Permet de poser la sonde au sol et la carte en hauteur, à l’abri des éclaboussures.' },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Câbler la sonde',
					actions: [
						'Alimentation USB débranchée, reliez la broche + de la sonde à GPIO18, l’une des broches métalliques alignées sur le bord de la carte (GPIO signifie « entrée-sortie à usage général »). La sonde n’est donc pas alimentée en permanence : la carte ne lui donne du courant que pendant la mesure, ce qui ralentit l’oxydation de ses pistes.',
						'Reliez ensuite la broche − à une broche GND, la masse, et la sortie de la sonde, notée S ou AO (sortie analogique, qui fournit une tension variable), à GPIO2.',
						'Prolongez le fil de la sonde si la carte doit rester en hauteur.',
					],
					observe: 'La sonde est hors tension entre deux mesures : son éventuelle LED ne reste pas allumée.',
					check: 'Le fil de signal est bien sur GPIO2, une broche d’entrée analogique de la carte.',
				},
				{
					title: 'Calibrer les valeurs sec et mouillé',
					actions: [
						'Calibrer, c’est apprendre à la carte à distinguer « sec » de « mouillé ». Dans Home Assistant, ouvrez « Leak probe level », la tension lue sur la sonde, et notez la valeur avec la sonde sèche (par exemple 0,0 V).',
						'Trempez la pointe de la sonde dans un fond d’eau et notez la valeur mouillée (par exemple 1,8 V).',
						'Placez le seuil « upper » à mi-chemin et le seuil « lower » un peu plus bas dans le YAML, puis réinstallez en OTA.',
					],
					observe: '« Water leak » passe sur « Humide » avec un fond d’eau et revient sur « Sec » quand la sonde est séchée.',
					check: 'Testez trois fois : les bascules sont nettes, sans clignotement.',
				},
				{
					title: 'Installer et tester en conditions réelles',
					actions: [
						'Posez la sonde à plat au point le plus bas sous l’appareil à surveiller, pistes vers le haut, car l’eau s’écoule toujours vers l’endroit le plus bas, puis fixez le fil pour qu’il ne déplace pas la sonde.',
						'Versez un peu d’eau à côté : l’alerte doit arriver en moins d’une minute.',
						'Essuyez, séchez la sonde et vérifiez le retour à l’état normal.',
					],
					observe: 'Une notification sur le téléphone arrive après la détection.',
					check: 'Refaites ce test tous les trois mois : il détecte aussi une sonde oxydée.',
				},
			],
			haIntegration: [
				'L’entité « Water leak » (classe humidité) fonctionne comme un détecteur de fuite : elle déclenche des alertes standard et s’affiche en rouge sur la carte du tableau de bord.',
				'Automatisation type : à la détection, envoyer une notification prioritaire au téléphone et couper la prise connectée du lave-linge ou du lave-vaisselle.',
				'Ajoutez « Leak probe level » au tableau de bord pour suivre la dérive de la sonde et détecter l’oxydation.',
			],
			troubleshooting: [
				{ problem: 'Fausse alerte permanente', solution: 'Le seuil est trop bas ou les pistes sont humides ou oxydées. Séchez et nettoyez la sonde, relevez de nouveau la valeur sèche et augmentez « upper ».' },
				{ problem: 'La valeur ne change pas', solution: 'La broche S/AO n’est pas sur GPIO2, ou la sonde n’est pas alimentée pendant la mesure. Vérifiez GPIO18 sur le + et augmentez le délai à 500 ms.' },
				{ problem: 'Alerte tardive', solution: 'Réduisez l’intervalle de 30 s à 10 s ; la sonde reste peu sollicitée grâce à l’alimentation pulsée.' },
				{ problem: 'La sonde se corrode au bout de quelques semaines', solution: 'C’est normal pour des pistes nues : remplacez-la ou passez à un capteur à contacts inox ou à un détecteur de fuite Zigbee scellé.' },
			],
			faq: [
				{ question: 'Pourquoi alimenter la sonde par un GPIO ?', answer: 'Un courant continu dans l’eau électrolyse les pistes. Ne l’alimenter que 300 ms toutes les 30 s divise fortement le temps sous tension et ralentit l’oxydation. Le courant du module doit rester inférieur à la limite d’une broche du microcontrôleur.' },
				{ question: 'Puis-je fonctionner sur pile ?', answer: 'Pas avec ce montage : le Wi-Fi reste actif. Pour une pile, un détecteur Zigbee de fuite du commerce est plus adapté.' },
				{ question: 'Puis-je en poser plusieurs ?', answer: 'Oui : un ESP32 gère plusieurs entrées analogiques (GPIO0 à GPIO6) ; répétez le bloc sensor et alimentez chaque sonde sur son propre GPIO.' },
			],
		},
		en: {
			title: `Water leak detector ESP32 ESPHome`,
			description:
				
				
				`Alert Home Assistant on a water leak: probe, ESP32-C6, ESPHome, wiring, YAML and simple automations. Parts list, GPIO wiring, ESPHome YAML and Home Assista`,
			h1: 'Water leak detector',
			objective:
				'You will lay a probe on the floor under a washing machine, a water heater or a sink, and get an alert in Home Assistant, the software that gathers your connected devices, as soon as water bridges the probe’s tracks. An ESP32, a small electronic board with Wi-Fi, checks it only every 30 seconds and powers it only during the reading, which delays the corrosion of the metal tracks.',
			usefulness:
				'A slow leak under an appliance often goes unnoticed for days, long enough to ruin the cabinet or the floor. This build warns you before serious damage is done, and an automation can even switch off a smart plug, for example the washing machine’s, as soon as the alert fires.',
			prerequisites: [
				'Home Assistant with ESPHome and a power outlet near the install spot (5 V USB supply).',
				'A three-pin analog water sensor module (S, + and −), the “water sensor” type sold for microcontrollers.',
				'A glass of water and a multimeter or the ESPHome log to calibrate the threshold.',
			],
			safety:
				'The sensor runs at 3.3 V; never connect it to mains voltage or use it to monitor a live tank. The electronics (board and USB supply) must stay dry and high up: only the probe sits on the floor. For a critical area (boiler, floodable cellar) add a certified commercial leak detector.',
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Control board (see the box above).', productId: 'esp32-c6-devkitc' },
				{ name: 'Analog water probe module (bare traces)', qty: 1, note: 'Analog AO output: the value changes when water bridges the traces. Bare traces eventually oxidise: plan to replace the probe.', q: true },
				{ name: '3-core extension wire', qty: '1 to 3 m', note: 'Lets you put the probe on the floor and the board higher, away from splashes.' },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Wire the probe',
					actions: [
						'With the USB power unplugged, connect the probe’s + pin to GPIO18, one of the metal pins lined up along the edge of the board (GPIO means “general purpose input output”). The probe is therefore not powered all the time: the board gives it current only during the reading, which slows the corrosion of its tracks.',
						'Then connect the − pin to a GND pin, the ground, and the probe’s output, marked S or AO (analogue output, which gives a varying voltage), to GPIO2.',
						'Extend the probe wire if the board must stay high.',
					],
					observe: 'The probe is unpowered between measurements: any LED on it does not stay lit.',
					check: 'The signal wire is on GPIO2, an analog input pin of the board.',
				},
				{
					title: 'Calibrate dry and wet values',
					actions: [
						'Calibrating means teaching the board to tell “dry” from “wet”. In Home Assistant, open “Leak probe level”, the voltage read on the probe, and note the value with the probe dry (for example 0.0 V).',
						'Dip the probe tip in a little water and note the wet value (for example 1.8 V).',
						'Set the “upper” threshold halfway and the “lower” one a bit below in the YAML, then reinstall over OTA.',
					],
					observe: '“Water leak” turns to “Wet” with a little water and back to “Dry” once the probe is dried.',
					check: 'Test three times: the changes are clean, without flicker.',
				},
				{
					title: 'Install and test in real conditions',
					actions: [
						'Lay the probe flat at the lowest point under the appliance you want to watch, tracks facing up, because water always runs to the lowest spot, then fix the wire so it does not move the probe.',
						'Pour a little water next to it: the alert must arrive in under a minute.',
						'Wipe, dry the probe and check the return to normal.',
					],
					observe: 'A phone notification arrives after the detection.',
					check: 'Repeat this test every three months: it also reveals an oxidised probe.',
				},
			],
			haIntegration: [
				'The “Water leak” entity (moisture class) behaves like a leak detector: it triggers standard alerts and turns red on the dashboard card.',
				'Typical automation: on detection, send a priority phone notification and cut the smart plug of the washing machine or dishwasher.',
				'Add “Leak probe level” to a dashboard to follow probe drift and spot oxidation.',
			],
			troubleshooting: [
				{ problem: 'Permanent false alarm', solution: 'The threshold is too low or the traces are damp or oxidised. Dry and clean the probe, re-measure the dry value and raise “upper”.' },
				{ problem: 'The value never changes', solution: 'The S/AO pin is not on GPIO2, or the probe is not powered while measuring. Check GPIO18 on the + and raise the delay to 500 ms.' },
				{ problem: 'Late alert', solution: 'Reduce the 30 s interval to 10 s; the probe stays lightly stressed thanks to the pulsed supply.' },
				{ problem: 'The probe corrodes after a few weeks', solution: 'This is normal for bare traces: replace it or move to a stainless-contact sensor or a sealed Zigbee leak detector.' },
			],
			faq: [
				{ question: 'Why power the probe from a GPIO?', answer: 'A continuous current in water electrolyses the traces. Powering it only 300 ms every 30 s greatly cuts the time under voltage and slows oxidation. The module’s current must stay below the pin’s limit.' },
				{ question: 'Can it run on a battery?', answer: 'Not with this build: Wi-Fi stays on. For a battery a commercial Zigbee leak sensor is a better fit.' },
				{ question: 'Can I fit several?', answer: 'Yes: an ESP32 handles several analog inputs (GPIO0 to GPIO6); repeat the sensor block and power each probe from its own GPIO.' },
			],
		},
		de: {
			title: `Wasserlecksensor ESP32 ESPHome`,
			description:
				
				
				`Wasserleck an Home Assistant melden: Sonde, ESP32-C6, ESPHome, Verdrahtung, YAML und Automatisierungen. Material, GPIO-Plan, ESPHome-YAML und Home Assistan`,
			h1: 'Wasserleckagesensor',
			objective:
				'Sie legen eine Sonde auf den Boden unter eine Waschmaschine, einen Warmwasserspeicher oder ein Spülbecken und erhalten in Home Assistant, der Software, die Ihre vernetzten Geräte vereint, eine Warnung, sobald Wasser die Leiterbahnen der Sonde überbrückt. Ein ESP32, eine kleine Elektronikplatine mit WLAN, fragt sie nur alle 30 Sekunden ab und versorgt sie nur während der Messung mit Strom, was das Korrodieren der Metallbahnen hinauszögert.',
			usefulness:
				'Ein schleichendes Leck unter einem Gerät bleibt oft tagelang unbemerkt, lange genug, um Möbel oder Boden zu ruinieren. Dieser Aufbau warnt Sie, bevor große Schäden entstehen, und eine Automatisierung kann sogar eine Steckdose abschalten, etwa die der Waschmaschine, sobald der Alarm auslöst.',
			prerequisites: [
				'Home Assistant mit ESPHome und eine Steckdose nahe dem Einbauort (5-V-USB-Netzteil).',
				'Ein analoges Wassersensor-Modul mit drei Pins (S, + und −), wie für Mikrocontroller verkauft.',
				'Ein Glas Wasser und ein Multimeter oder das ESPHome-Log zum Kalibrieren des Schwellwerts.',
			],
			safety:
				'Der Sensor läuft mit 3,3 V; niemals an Netzspannung anschließen oder zur Überwachung eines spannungsführenden Behälters verwenden. Die Elektronik (Platine und USB-Netzteil) bleibt trocken und erhöht: Nur die Sonde liegt am Boden. In kritischen Bereichen (Heizkessel, überflutbarer Keller) zusätzlich einen zertifizierten Leckagemelder aus dem Handel einsetzen.',
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Steuerplatine (siehe Kasten oben).', productId: 'esp32-c6-devkitc' },
				{ name: 'Analoges Wassersonden-Modul (blanke Leiterbahnen)', qty: 1, note: 'Analogausgang AO: Der Wert ändert sich, wenn Wasser die Bahnen überbrückt. Blanke Bahnen oxidieren irgendwann: Ersatz einplanen.', q: true },
				{ name: 'Dreiadrige Verlängerungsleitung', qty: '1 bis 3 m', note: 'Sonde am Boden, Platine höher und spritzwassergeschützt.' },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Sonde verdrahten',
					actions: [
						'Verbinden Sie bei abgezogener USB-Stromversorgung den Pin + der Sonde mit GPIO18, einem der metallenen Pins am Rand der Platine (GPIO bedeutet „General Purpose Input Output“). Die Sonde hängt also nicht dauerhaft unter Strom: Die Platine versorgt sie nur während der Messung, was die Korrosion ihrer Bahnen verlangsamt.',
						'Verbinden Sie dann den Pin − mit einem GND-Pin, der Masse, und den Ausgang der Sonde, mit S oder AO beschriftet (analoger Ausgang, der eine veränderliche Spannung liefert), mit GPIO2.',
						'Die Sondenleitung verlängern, wenn die Platine höher bleiben soll.',
					],
					observe: 'Zwischen den Messungen ist die Sonde stromlos: Eine eventuelle LED bleibt nicht dauerhaft an.',
					check: 'Die Signalleitung liegt an GPIO2, einem analogen Eingang der Platine.',
				},
				{
					title: 'Trocken- und Nasswert kalibrieren',
					actions: [
						'Kalibrieren heißt, der Platine beizubringen, „trocken“ von „nass“ zu unterscheiden. Öffnen Sie in Home Assistant „Leak probe level“, die an der Sonde gemessene Spannung, und notieren Sie den Wert bei trockener Sonde (zum Beispiel 0,0 V).',
						'Die Sondenspitze in etwas Wasser tauchen und den Nasswert notieren (z. B. 1,8 V).',
						'Im YAML den Schwellwert „upper“ in die Mitte und „lower“ etwas darunter setzen, dann per OTA neu installieren.',
					],
					observe: '„Water leak“ wechselt mit etwas Wasser auf „Feucht“ und nach dem Trocknen zurück auf „Trocken“.',
					check: 'Dreimal testen: Die Wechsel sind sauber, ohne Flackern.',
				},
				{
					title: 'Einbauen und unter realen Bedingungen testen',
					actions: [
						'Legen Sie die Sonde flach an die tiefste Stelle unter dem zu überwachenden Gerät, Bahnen nach oben, denn Wasser läuft immer zur tiefsten Stelle, und fixieren Sie das Kabel, damit es die Sonde nicht verschiebt.',
						'Etwas Wasser daneben gießen: Der Alarm muss in unter einer Minute kommen.',
						'Abwischen, Sonde trocknen und die Rückkehr in den Normalzustand prüfen.',
					],
					observe: 'Nach der Erkennung trifft eine Benachrichtigung auf dem Handy ein.',
					check: 'Den Test alle drei Monate wiederholen: Er deckt auch eine oxidierte Sonde auf.',
				},
			],
			haIntegration: [
				'Die Entität „Water leak“ (Klasse Feuchtigkeit) verhält sich wie ein Leckagemelder: Sie löst Standard-Alarme aus und wird auf der Dashboard-Karte rot.',
				'Typische Automatisierung: Bei Erkennung eine priorisierte Handy-Benachrichtigung senden und die smarte Steckdose von Waschmaschine oder Geschirrspüler abschalten.',
				'„Leak probe level“ ins Dashboard legen, um die Drift der Sonde zu verfolgen und Oxidation zu erkennen.',
			],
			troubleshooting: [
				{ problem: 'Dauerhafter Fehlalarm', solution: 'Der Schwellwert ist zu niedrig oder die Bahnen sind feucht oder oxidiert. Sonde trocknen und reinigen, den Trockenwert neu messen und „upper“ erhöhen.' },
				{ problem: 'Wert ändert sich nie', solution: 'Der Pin S/AO liegt nicht an GPIO2 oder die Sonde wird während der Messung nicht versorgt. GPIO18 am + prüfen und die Wartezeit auf 500 ms erhöhen.' },
				{ problem: 'Alarm kommt spät', solution: 'Das Intervall von 30 s auf 10 s verkürzen; durch die gepulste Versorgung bleibt die Belastung der Sonde gering.' },
				{ problem: 'Sonde korrodiert nach einigen Wochen', solution: 'Bei blanken Bahnen normal: ersetzen oder auf einen Sensor mit Edelstahlkontakten bzw. einen versiegelten Zigbee-Leckagemelder umsteigen.' },
			],
			faq: [
				{ question: 'Warum die Sonde über einen GPIO versorgen?', answer: 'Dauerstrom im Wasser elektrolysiert die Bahnen. Nur 300 ms alle 30 s zu bestromen verkürzt die Spannungszeit stark und bremst die Oxidation. Der Modulstrom muss unter dem Limit des Pins bleiben.' },
				{ question: 'Geht Batteriebetrieb?', answer: 'Nicht mit diesem Aufbau: Das WLAN bleibt aktiv. Für Batterie passt ein handelsüblicher Zigbee-Leckagemelder besser.' },
				{ question: 'Kann ich mehrere einsetzen?', answer: 'Ja: Ein ESP32 hat mehrere analoge Eingänge (GPIO0 bis GPIO6); den sensor-Block wiederholen und jede Sonde über einen eigenen GPIO versorgen.' },
			],
		},
		it: {
			title: `Sensore perdita acqua ESP32 ESPHome`,
			description:
				
				
				`Avvisate Home Assistant in caso di perdita: sonda, ESP32-C6, ESPHome, cablaggio, YAML e automazioni. Materiale, schema GPIO, YAML ESPHome e Home Assistant.`,
			h1: 'Sensore di perdite d’acqua',
			objective:
				'Poserete una sonda sul pavimento sotto una lavatrice, uno scaldabagno o un lavello e riceverete un avviso in Home Assistant, il software che riunisce i vostri dispositivi connessi, non appena l’acqua collega le piste della sonda. Un ESP32, una piccola scheda elettronica con Wi-Fi, la interroga solo ogni 30 secondi e la alimenta soltanto durante la lettura, cosa che ritarda l’ossidazione delle piste metalliche.',
			usefulness:
				'Una perdita lenta sotto un apparecchio passa spesso inosservata per giorni, abbastanza a lungo da rovinare il mobile o il pavimento. Questo montaggio vi avverte prima dei danni seri, e un’automazione può perfino spegnere una presa connessa, per esempio quella della lavatrice, appena scatta l’allarme.',
			prerequisites: [
				'Home Assistant con ESPHome e una presa di corrente vicino al punto di posa (alimentatore USB 5 V).',
				'Un modulo sensore d’acqua analogico a tre pin (S, + e −), il tipo «water sensor» per microcontrollori.',
				'Un bicchiere d’acqua e un multimetro o il log di ESPHome per calibrare la soglia.',
			],
			safety:
				'Il sensore funziona a 3,3 V; non va mai collegato alla tensione di rete né usato per sorvegliare un serbatoio in tensione. L’elettronica (scheda e alimentatore USB) deve restare all’asciutto e in alto: solo la sonda sta a terra. Per una zona critica (caldaia, cantina allagabile) aggiungete un rilevatore di perdite certificato in commercio.',
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Scheda di comando (vedi il riquadro sopra).', productId: 'esp32-c6-devkitc' },
				{ name: 'Modulo sonda d’acqua analogica (piste nude)', qty: 1, note: 'Uscita analogica AO: il valore cambia quando l’acqua collega le piste. Le piste prima o poi si ossidano: prevedete la sostituzione.', q: true },
				{ name: 'Prolunga a 3 conduttori', qty: 'da 1 a 3 m', note: 'Permette di mettere la sonda a terra e la scheda più in alto, al riparo dagli schizzi.' },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Cablare la sonda',
					actions: [
						'Con l’alimentazione USB scollegata, collegate il pin + della sonda a GPIO18, uno dei pin metallici allineati sul bordo della scheda (GPIO significa «General Purpose Input Output»). La sonda quindi non è alimentata di continuo: la scheda le dà corrente solo durante la misura, il che rallenta l’ossidazione delle piste.',
						'Collegate poi il pin − a un pin GND, la massa, e l’uscita della sonda, indicata con S o AO (uscita analogica, che fornisce una tensione variabile), a GPIO2.',
						'Allungate il filo della sonda se la scheda deve restare in alto.',
					],
					observe: 'La sonda non è alimentata tra una misura e l’altra: un eventuale LED non resta acceso.',
					check: 'Il filo di segnale è su GPIO2, un pin d’ingresso analogico della scheda.',
				},
				{
					title: 'Calibrare i valori asciutto e bagnato',
					actions: [
						'Calibrare significa insegnare alla scheda a distinguere «asciutto» da «bagnato». In Home Assistant aprite «Leak probe level», la tensione letta sulla sonda, e annotate il valore con la sonda asciutta (ad esempio 0,0 V).',
						'Immergete la punta della sonda in un po’ d’acqua e annotate il valore bagnato (ad esempio 1,8 V).',
						'Nello YAML mettete la soglia «upper» a metà e «lower» un po’ più in basso, poi reinstallate via OTA.',
					],
					observe: '«Water leak» passa a «Umido» con un po’ d’acqua e torna a «Asciutto» quando la sonda è asciutta.',
					check: 'Provate tre volte: i cambi sono netti, senza sfarfallio.',
				},
				{
					title: 'Installare e provare in condizioni reali',
					actions: [
						'Posate la sonda in piano nel punto più basso sotto l’apparecchio da sorvegliare, con le piste verso l’alto, perché l’acqua scorre sempre verso il punto più basso, e fissate il filo in modo che non sposti la sonda.',
						'Versate un po’ d’acqua accanto: l’allarme deve arrivare in meno di un minuto.',
						'Asciugate, asciugate la sonda e verificate il ritorno alla normalità.',
					],
					observe: 'Dopo il rilevamento arriva una notifica sul telefono.',
					check: 'Ripetete la prova ogni tre mesi: rivela anche una sonda ossidata.',
				},
			],
			haIntegration: [
				'L’entità «Water leak» (classe umidità) si comporta come un rilevatore di perdite: attiva gli avvisi standard e diventa rossa sulla scheda della dashboard.',
				'Automazione tipica: al rilevamento inviare una notifica prioritaria al telefono e spegnere la presa smart di lavatrice o lavastoviglie.',
				'Aggiungete «Leak probe level» alla dashboard per seguire la deriva della sonda e accorgervi dell’ossidazione.',
			],
			troubleshooting: [
				{ problem: 'Falso allarme permanente', solution: 'La soglia è troppo bassa o le piste sono umide o ossidate. Asciugate e pulite la sonda, rimisurate il valore a secco e alzate «upper».' },
				{ problem: 'Il valore non cambia mai', solution: 'Il pin S/AO non è su GPIO2 o la sonda non è alimentata durante la misura. Controllate GPIO18 sul + e portate il ritardo a 500 ms.' },
				{ problem: 'Allarme in ritardo', solution: 'Riducete l’intervallo da 30 s a 10 s; la sonda resta poco sollecitata grazie all’alimentazione a impulsi.' },
				{ problem: 'La sonda si corrode dopo qualche settimana', solution: 'È normale con piste nude: sostituitela o passate a un sensore con contatti in inox o a un rilevatore di perdite Zigbee sigillato.' },
			],
			faq: [
				{ question: 'Perché alimentare la sonda da un GPIO?', answer: 'Una corrente continua nell’acqua elettrolizza le piste. Alimentarla solo 300 ms ogni 30 s riduce molto il tempo sotto tensione e rallenta l’ossidazione. La corrente del modulo deve restare sotto il limite del pin.' },
				{ question: 'Posso usarlo a batteria?', answer: 'Non con questo montaggio: il Wi-Fi resta attivo. Per la batteria è più adatto un rilevatore di perdite Zigbee in commercio.' },
				{ question: 'Posso installarne più di uno?', answer: 'Sì: un ESP32 gestisce più ingressi analogici (da GPIO0 a GPIO6); ripetete il blocco sensor e alimentate ogni sonda da un GPIO dedicato.' },
			],
		},
		es: {
			title: `Detector fuga de agua ESP32 ESPHome`,
			description:
				
				
				`Avisa a Home Assistant ante una fuga: sonda, ESP32-C6, ESPHome, cableado, YAML y automatizaciones. Material, esquema GPIO, YAML ESPHome y Home Assistant.`,
			h1: 'Detector de fugas de agua',
			objective:
				'Vas a colocar una sonda en el suelo bajo una lavadora, un termo de agua caliente o un fregadero, y recibirás una alerta en Home Assistant, el software que reúne tus dispositivos conectados, en cuanto el agua una las pistas de la sonda. Un ESP32, una pequeña placa electrónica con Wi-Fi, la consulta solo cada 30 segundos y la alimenta únicamente durante la lectura, lo que retrasa la oxidación de las pistas metálicas.',
			usefulness:
				'Una fuga lenta bajo un aparato suele pasar inadvertida durante días, el tiempo suficiente para estropear el mueble o el suelo. Este montaje te avisa antes de que haya daños graves, y una automatización puede incluso cortar un enchufe conectado, por ejemplo el de la lavadora, en cuanto salta la alerta.',
			prerequisites: [
				'Home Assistant con ESPHome y un enchufe cerca del lugar de colocación (fuente USB de 5 V).',
				'Un módulo sensor de agua analógico de tres pines (S, + y −), del tipo «water sensor» para microcontroladores.',
				'Un vaso de agua y un multímetro o el log de ESPHome para calibrar el umbral.',
			],
			safety:
				'El sensor funciona a 3,3 V; no debe conectarse nunca a la tensión de red ni usarse para vigilar un depósito con tensión. La electrónica (placa y fuente USB) debe quedar seca y en alto: solo la sonda va en el suelo. Para una zona crítica (caldera, sótano inundable) añade un detector de fugas certificado del mercado.',
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Placa de control (véase el recuadro de arriba).', productId: 'esp32-c6-devkitc' },
				{ name: 'Módulo sonda de agua analógica (pistas desnudas)', qty: 1, note: 'Salida analógica AO: el valor cambia cuando el agua une las pistas. Las pistas acaban oxidándose: prevé cambiar la sonda.', q: true },
				{ name: 'Alargador de 3 conductores', qty: '1 a 3 m', note: 'Permite poner la sonda en el suelo y la placa en alto, a salvo de salpicaduras.' },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Cablear la sonda',
					actions: [
						'Con la alimentación USB desconectada, une el pin + de la sonda a GPIO18, uno de los pines metálicos alineados en el borde de la placa (GPIO significa «General Purpose Input Output»). La sonda no está alimentada de forma permanente: la placa solo le da corriente durante la medición, lo que frena la oxidación de sus pistas.',
						'Une después el pin − a un pin GND, la masa, y la salida de la sonda, marcada como S o AO (salida analógica, que da una tensión variable), a GPIO2.',
						'Alarga el cable de la sonda si la placa debe quedar en alto.',
					],
					observe: 'La sonda queda sin tensión entre medidas: un posible LED no permanece encendido.',
					check: 'El cable de señal está en GPIO2, un pin de entrada analógica de la placa.',
				},
				{
					title: 'Calibrar los valores seco y mojado',
					actions: [
						'Calibrar significa enseñar a la placa a distinguir «seco» de «mojado». En Home Assistant abre «Leak probe level», la tensión leída en la sonda, y anota el valor con la sonda seca (por ejemplo 0,0 V).',
						'Moja la punta de la sonda en un poco de agua y anota el valor mojado (por ejemplo 1,8 V).',
						'En el YAML pon el umbral «upper» a medio camino y «lower» algo por debajo, y reinstala por OTA.',
					],
					observe: '«Water leak» pasa a «Húmedo» con un poco de agua y vuelve a «Seco» cuando la sonda se seca.',
					check: 'Prueba tres veces: los cambios son nítidos, sin parpadeo.',
				},
				{
					title: 'Instalar y probar en condiciones reales',
					actions: [
						'Coloca la sonda plana en el punto más bajo bajo el aparato que quieres vigilar, con las pistas hacia arriba, porque el agua siempre corre hacia el punto más bajo, y fija el cable para que no mueva la sonda.',
						'Vierte un poco de agua al lado: la alerta debe llegar en menos de un minuto.',
						'Seca, seca la sonda y comprueba la vuelta a la normalidad.',
					],
					observe: 'Tras la detección llega una notificación al móvil.',
					check: 'Repite la prueba cada tres meses: también delata una sonda oxidada.',
				},
			],
			haIntegration: [
				'La entidad «Water leak» (clase humedad) se comporta como un detector de fugas: dispara alertas estándar y se pone roja en la tarjeta del panel.',
				'Automatización típica: al detectar, enviar una notificación prioritaria al móvil y cortar el enchufe inteligente de la lavadora o del lavavajillas.',
				'Añade «Leak probe level» al panel para seguir la deriva de la sonda y detectar la oxidación.',
			],
			troubleshooting: [
				{ problem: 'Falsa alarma permanente', solution: 'El umbral es demasiado bajo o las pistas están húmedas u oxidadas. Seca y limpia la sonda, vuelve a medir el valor en seco y sube «upper».' },
				{ problem: 'El valor no cambia nunca', solution: 'El pin S/AO no está en GPIO2 o la sonda no recibe alimentación durante la medida. Revisa GPIO18 en el + y sube el retardo a 500 ms.' },
				{ problem: 'Alerta tardía', solution: 'Reduce el intervalo de 30 s a 10 s; la sonda sigue poco exigida gracias a la alimentación por pulsos.' },
				{ problem: 'La sonda se corroe tras unas semanas', solution: 'Es normal con pistas desnudas: sustitúyela o pasa a un sensor de contactos de acero inoxidable o a un detector de fugas Zigbee sellado.' },
			],
			faq: [
				{ question: '¿Por qué alimentar la sonda desde un GPIO?', answer: 'Una corriente continua en el agua electroliza las pistas. Alimentarla solo 300 ms cada 30 s reduce mucho el tiempo bajo tensión y frena la oxidación. La corriente del módulo debe quedar por debajo del límite del pin.' },
				{ question: '¿Puede funcionar con batería?', answer: 'No con este montaje: el Wi-Fi permanece activo. Para batería encaja mejor un detector de fugas Zigbee comercial.' },
				{ question: '¿Puedo instalar varios?', answer: 'Sí: un ESP32 gestiona varias entradas analógicas (GPIO0 a GPIO6); repite el bloque sensor y alimenta cada sonda desde su propio GPIO.' },
			],
		},
	},
};
