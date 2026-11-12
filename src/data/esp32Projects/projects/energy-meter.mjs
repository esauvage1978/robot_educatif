import { esphomeHeader } from '../shared.mjs';

const yaml =
	esphomeHeader('compteur-energie', 'Energy meter') +
	`
sensor:
  - platform: pulse_meter
    name: "Power"
    pin:
      number: GPIO10               # pulse input (S0 output or optical sensor)
      mode: INPUT_PULLUP
    internal_filter: 10ms          # ignore bounces shorter than the real pulse (check your meter's datasheet)
    timeout: 5min                  # report 0 W after 5 minutes without a pulse
    unit_of_measurement: "W"
    device_class: power
    state_class: measurement
    accuracy_decimals: 0
    filters:
      # CHANGE with the imp/kWh printed on your meter.
      # pulses per minute x 60000 / imp-per-kWh = watts  ->  1000 imp/kWh: x60 | 500 imp/kWh: x120 | 2000 imp/kWh: x30
      - multiply: 60
    total:
      name: "Energy"
      unit_of_measurement: "kWh"
      device_class: energy
      state_class: total_increasing
      accuracy_decimals: 3
      filters:
        # CHANGE: kWh per pulse = 1 / imp-per-kWh  ->  1000 imp/kWh: 0.001 | 500: 0.002 | 2000: 0.0005
        - multiply: 0.001

  - platform: wifi_signal
    name: "WiFi signal"
    update_interval: 120s
    entity_category: diagnostic
`;

const frPins = [
	{ gpio: '3V3', signal: 'VCC', color: 'power' },
	{ gpio: 'GND', signal: 'GND', color: 'ground' },
	{ gpio: 'GPIO10', signal: 'DO', color: 'data' },
];
const s0Pins = [
	{ gpio: 'GPIO10', signal: 'S0 +', color: 'data' },
	{ gpio: 'GND', signal: 'S0 −', color: 'ground' },
];

export const project = {
	id: 'energy-meter',
	level: 'advanced',
	durationHours: '2–4',
	budgetRange: {
		fr: 'environ 15–45 € selon vendeur',
		en: 'about €15–45 depending on the seller (meter not included)',
		de: 'ca. 15–45 € je nach Händler (Zähler nicht enthalten)',
		it: 'circa 15–45 € a seconda del venditore (contatore escluso)',
		es: 'unos 15–45 € según el vendedor (contador no incluido)',
	},
	slugs: {
		fr: 'compteur-linky-tic',
		en: 'energy-meter-pulse',
		de: 'stromzaehler-impulse',
		it: 'contatore-energia-impulsi',
		es: 'contador-energia-impulsos',
	},
	fullGuide: null,
	productIds: ['esp32-c6-devkitc'],
	searchQueries: {
		fr: 'module capteur de lumière LM393 phototransistor sortie numérique',
		en: 'DIN rail kWh meter S0 pulse output',
		de: 'Hutschienen Stromzähler S0 Impulsausgang',
		it: 'contatore energia guida DIN uscita impulsi S0',
		es: 'contador energía carril DIN salida impulsos S0',
	},
	smallMaterialIds: ['usb', 'psu', 'dupont', 'breadboard', 'enclosure'],
	flashAfter: 1,
	wiring: {
		sensorName: {
			fr: 'Capteur optique LED',
			en: 'S0 meter output',
			de: 'S0-Zählerausgang',
			it: 'Uscita S0 contatore',
			es: 'Salida S0 contador',
		},
		pins: frPins,
		pinsByLang: { fr: frPins, en: s0Pins, de: s0Pins, it: s0Pins, es: s0Pins },
		principleBoxes: {
			fr: [
				{ title: `Linky (LED)`, s: 'Linky (LED)', a: 'Le voyant clignote : 1 éclair = 1 Wh*', b: '*à vérifier sur votre compteur' },
				{ title: 'Capteur optique', s: 'Capteur optique', a: 'Phototransistor + comparateur LM393', b: 'Posé devant la LED, sans contact électrique', via: 'Lumière' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Compte les impulsions (pulse_meter)', b: 'Calcule la puissance et l’énergie', via: 'Signal DO sur GPIO10' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Entités Power (W) et Energy (kWh)', b: 'Compatible avec le tableau de bord Énergie', via: 'Wi-Fi 2,4 GHz + API chiffrée' },
			],
			en: [
				{ title: 'Energy meter (S0)', s: 'Meter (S0)', a: 'Isolated pulse output (S0)', b: 'Pulses per kWh printed on the meter' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Counts pulses (pulse_meter)', b: 'Computes power and energy', via: 'S0 + on GPIO10, S0 − on GND' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Power (W) and Energy (kWh) entities', b: 'Works with the Energy dashboard', via: '2.4 GHz Wi-Fi + encrypted API' },
			],
			de: [
				{ title: 'Stromzähler (S0)', s: 'Zähler (S0)', a: 'Potenzialfreier Impulsausgang (S0)', b: 'Impulse pro kWh stehen auf dem Zähler' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Zählt Impulse (pulse_meter)', b: 'Berechnet Leistung und Energie', via: 'S0 + an GPIO10, S0 − an GND' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Entitäten Power (W) und Energy (kWh)', b: 'Passt zum Energie-Dashboard', via: '2,4-GHz-WLAN + verschlüsselte API' },
			],
			it: [
				{ title: 'Contatore (S0)', s: 'Contatore (S0)', a: 'Uscita a impulsi isolata (S0)', b: 'Impulsi per kWh indicati sul contatore' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Conta gli impulsi (pulse_meter)', b: 'Calcola potenza ed energia', via: 'S0 + su GPIO10, S0 − su GND' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Entità Power (W) ed Energy (kWh)', b: 'Compatibile con la dashboard Energia', via: 'Wi-Fi 2,4 GHz + API cifrata' },
			],
			es: [
				{ title: `Sensor óptico de impulsos`, s: 'Contador (S0)', a: 'Salida de impulsos aislada (S0)', b: 'Impulsos por kWh indicados en el contador' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Cuenta impulsos (pulse_meter)', b: 'Calcula potencia y energía', via: 'S0 + en GPIO10, S0 − en GND' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Entidades Power (W) y Energy (kWh)', b: 'Compatible con el panel de Energía', via: 'Wi-Fi 2,4 GHz + API cifrada' },
			],
		},
	},
	yaml,
	locales: {
		fr: {
			title: `Compteur Linky ESP32 ESPHome (LED/TIC)`,
			description:
				
				
				`Suivez puissance et énergie Linky dans Home Assistant : capteur optique ou TIC, ESP32-C6, YAML et précautions. Matériel, schéma GPIO, YAML ESPHome et Home`,
			h1: 'Compteur Linky (impulsions LED et TIC)',
			objective:
				'Vous allez suivre la consommation électrique de votre maison dans Home Assistant, le logiciel qui réunit vos appareils connectés, sans jamais toucher au courant 230 V. Le Linky, le compteur communicant des foyers français, clignote à chaque fraction de kilowattheure consommée ; un capteur optique posé devant cette petite LED d’impulsions envoie ces éclairs à un ESP32, une petite carte électronique équipée du Wi-Fi. La carte en déduit la puissance instantanée en watts (W) et l’énergie cumulée en kilowattheures (kWh), directement utilisables dans le tableau de bord Énergie.',
			usefulness:
				'Ce suivi sert à repérer les appareils qui consomment en veille, à suivre la consommation heure par heure et à déclencher une alerte en cas de dépassement. La méthode de la LED est la plus sûre, car elle ne demande aucun contact électrique. La sortie TIC du Linky (les bornes I1 et I2), la liaison de données du compteur, donne en plus les index par tarif et la puissance apparente, mais elle exige une interface spécifique, qui sort du cadre de cette fiche.',
			prerequisites: [
				'Un compteur Linky avec LED d’impulsions : lisez sur la façade le nombre d’impulsions par kWh (souvent 1000 imp/kWh, à vérifier sur votre compteur).',
				'Un Home Assistant avec ESPHome, et le Wi-Fi 2,4 GHz jusqu’au compteur.',
				'Savoir régler un potentiomètre de sensibilité avec un petit tournevis.',
			],
			safety:
				'La méthode LED n’exige aucun contact avec le compteur ni avec le 230 V : posez simplement le capteur devant la LED. N’ouvrez jamais le capot plombé ni les borniers du compteur. La sortie TIC est un signal très basse tension mais elle se trouve à proximité immédiate de la tension secteur : ne la raccordez qu’avec une interface TIC prête à l’emploi et isolée, en suivant sa notice, ou faites appel à un électricien.',
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Carte de commande (voir l’encadré plus haut).', productId: 'esp32-c6-devkitc' },
				{ name: 'Module capteur de lumière à phototransistor ou LDR, sortie numérique DO (comparateur LM393)', qty: 1, note: 'Sa sensibilité se règle avec un potentiomètre ; le voyant du module s’allume à chaque impulsion de la LED du Linky.', q: true },
				{ name: 'Tube noir, mousse ou pâte à fixer opaque', qty: 1, note: 'Isole le capteur de la lumière ambiante pour éviter les faux comptages.' },
				{ name: 'Interface TIC prête à l’emploi (optionnel)', qty: '0–1', note: 'Seulement pour lire les index et la puissance apparente via I1/I2. Choisissez un module isolé et documenté ; le décodage des trames TIC passe par un composant ESPHome communautaire dont la compatibilité est à vérifier (non testé ici).' },
			],
			smallMaterials: [{ name: 'Rallonge de fil 3 conducteurs (0,25 mm²)', qty: '1 à 3 m', note: 'Entre le capteur sur le compteur et la carte ESP32, posée à distance du coffret.' }],
			steps: [
				{
					title: 'Câbler le capteur optique',
					actions: [
						'Avec trois fils Dupont, des fils souples dont les extrémités s’enfichent sans soudure, reliez le capteur optique à la carte, alimentation USB débranchée : VCC (l’alimentation) à la broche 3V3, GND (la masse) à une broche GND et DO (la sortie numérique du capteur) à GPIO10, l’une des broches métalliques alignées sur le bord de la carte, appelées GPIO.',
						'Posez le capteur sans le fixer devant la LED d’impulsions du Linky et masquez la lumière ambiante avec le tube.',
						'Tournez le potentiomètre jusqu’à ce que le voyant du module s’allume à chaque éclair de la LED et s’éteigne entre deux éclairs.',
					],
					observe: 'Le voyant du module suit exactement le clignotement de la LED du Linky.',
					check: 'Aucune impulsion supplémentaire n’apparaît quand vous allumez ou éteignez la lumière de la pièce.',
				},
				{
					title: 'Régler les facteurs de conversion',
					actions: [
						'Lisez d’abord sur la façade du Linky le nombre d’impulsions par kWh, souvent 1000 (« 1000 imp/kWh »), car les calculs de puissance et d’énergie en dépendent.',
						'Dans le YAML, ajustez « multiply: 60 » (puissance en W) et « multiply: 0.001 » (énergie en kWh) selon les formules données en commentaire.',
						'Installez en Wi-Fi, puis allumez une charge connue (bouilloire de 2 kW, par exemple) et comparez avec l’affichage du Linky.',
					],
					observe: 'La puissance monte en quelques secondes après l’allumage ; elle retombe à 0 après 5 minutes sans impulsion.',
					check: 'L’écart avec la consommation instantanée du Linky reste de quelques pour cent.',
				},
			],
			haIntegration: [
				'Les entités « Power » (W) et « Energy » (kWh, total croissant) apparaissent sous l’appareil ESPHome.',
				'Dans Paramètres → Tableaux de bord → Énergie, ajoutez « Energy » comme « Consommation du réseau » : l’historique et le coût s’affichent après la première heure complète.',
				'Cette mesure est indicative et ne remplace pas votre facture : le Linky reste le compteur de référence.',
			],
			troubleshooting: [
				{ problem: 'La puissance reste à 0 W', solution: 'Le capteur ne voit pas la LED : réglez le potentiomètre, rapprochez le capteur, vérifiez que le voyant du module clignote. Contrôlez aussi que DO est bien sur GPIO10.' },
				{ problem: 'Valeurs trop élevées ou erratiques', solution: 'De la lumière ambiante déclenche le capteur. Ajoutez le tube opaque, baissez la sensibilité et augmentez internal_filter (par exemple 30 ms).' },
				{ problem: 'L’énergie ne s’affiche pas dans le tableau de bord Énergie', solution: 'L’entité doit avoir la classe énergie et l’état « total_increasing » (déjà indiquée dans le YAML), avec l’unité kWh.' },
				{ problem: 'Le capteur se décale ou tombe', solution: 'Utilisez un support rigide ou une pâte à fixer ; une dérive de quelques millimètres change la détection.' },
			],
			faq: [
				{ question: 'LED d’impulsions ou TIC : quelle méthode choisir ?', answer: 'La LED est la plus simple et la plus sûre pour obtenir puissance et énergie. La TIC donne plus d’informations (index par tarif, abonnement), mais impose une interface isolée adaptée et un composant de décodage ESPHome à vérifier.' },
				{ question: 'Puis-je faire la même chose avec un compteur d’eau ou de gaz ?', answer: 'Oui si le compteur fournit des impulsions (contact sec ou capteur optique) : le même principe pulse_meter s’applique en changeant l’unité et le facteur.' },
				{ question: 'Les valeurs sont-elles exactes ?', answer: 'Elles reflètent les impulsions du compteur : l’énergie cumulée est fiable si aucune impulsion n’est perdue ; la puissance est une moyenne sur l’intervalle entre deux impulsions.' },
			],
		},
		en: {
			title: `Energy meter pulses ESP32 ESPHome`,
			description:
				
				
				`Track power and energy in Home Assistant with S0 pulses, ESP32-C6 and ESPHome: wiring, YAML and safety notes. Parts list, GPIO wiring, ESPHome YAML and Hom`,
			h1: 'Energy meter (pulse output)',
			objective:
				'You will follow your home’s electricity use in Home Assistant, the software that gathers your connected devices, without ever touching the 230 V mains. The Linky, the communicating meter installed in French homes, blinks for every fraction of a kilowatt-hour consumed; an optical sensor placed in front of this small pulse LED sends these flashes to an ESP32, a small electronic board with Wi-Fi. The board works out the instantaneous power in watts (W) and the accumulated energy in kilowatt-hours (kWh), ready to use in the Energy dashboard.',
			usefulness:
				'This tracking helps you spot appliances that draw power on standby, follow consumption hour by hour and trigger an alert when you go over a limit. The LED method is the safest because it needs no electrical contact. The Linky’s TIC output (the I1 and I2 terminals), the meter’s data link, also gives the readings per tariff and the apparent power, but it needs a specific interface, which is beyond the scope of this page.',
			prerequisites: [
				'A meter with an S0 output (DIN-rail meters often have one) or a pulse LED; read the pulses per kWh (imp/kWh) on its front.',
				'Home Assistant with ESPHome and 2.4 GHz Wi-Fi up to the meter location.',
				'A qualified electrician if the meter is not installed yet or if you must open the consumer unit.',
			],
			safety:
				'The S0 terminals are isolated and extra-low voltage, but they sit inside an electrical panel next to mains terminals. Do not open the panel or touch L/N terminals: have an electrician fit the meter and, if in doubt, connect the S0 wires too. Never use a meter owned by your utility without their authorisation.',
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Control board (see the box above).', productId: 'esp32-c6-devkitc' },
				{ name: 'kWh meter with S0 pulse output (if you do not have one)', qty: '0–1', note: 'Price varies widely and installation belongs to an electrician. Note its imp/kWh value.', q: true },
				{ name: '2-core low-voltage cable (0.25 mm²)', qty: '1 to 5 m', note: 'From the S0 terminals to the ESP32, routed away from mains cables.' },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Connect the S0 output to the ESP32',
					actions: [
						'With three Dupont wires, flexible wires whose ends plug in without soldering, connect the optical sensor to the board with the USB power unplugged: VCC (the power) to the 3V3 pin, GND (the ground) to a GND pin and DO (the sensor’s digital output) to GPIO10, one of the metal pins lined up along the edge of the board, called GPIO.',
						'Connect S0 + to GPIO10 and S0 − to GND with a two-core cable.',
						'The ESP32’s internal pull-up (INPUT_PULLUP in the YAML) is enough for most S0 outputs; check your meter’s datasheet for its minimum voltage.',
					],
					observe: 'With the load on, the pulse indicator of the meter blinks and the S0 contact closes briefly each time.',
					check: 'Use a multimeter in continuity mode on S0 +/−: it beeps for each pulse.',
				},
				{
					title: 'Set the conversion factors',
					actions: [
						'First read on the front of the Linky the number of pulses per kWh, often 1000 (“1000 imp/kWh”), because the power and energy calculations depend on it.',
						'In the YAML adjust “multiply: 60” (power in W) and “multiply: 0.001” (energy in kWh) using the formulas in the comments.',
						'Install over Wi-Fi, switch on a known load (a 2 kW kettle, for example) and compare with the meter’s display.',
					],
					observe: 'Power rises a few seconds after switching on and returns to 0 after 5 minutes without pulses.',
					check: 'The difference with the meter’s instantaneous reading stays within a few percent.',
				},
			],
			haIntegration: [
				'The “Power” (W) and “Energy” (kWh, total increasing) entities appear under the ESPHome device.',
				'In Settings → Dashboards → Energy add “Energy” as “Grid consumption”: history and cost appear after the first full hour.',
				'This measurement is indicative and does not replace your bill: the utility meter remains the reference.',
			],
			troubleshooting: [
				{ problem: 'Power stays at 0 W', solution: 'No pulses reach GPIO10. Check the S0 polarity, test continuity with a multimeter and confirm the meter really has an active S0 output.' },
				{ problem: 'Values far too high', solution: 'The conversion factor does not match imp/kWh. Recompute the multipliers; also raise internal_filter if contact bounce is counted.' },
				{ problem: 'Energy does not show in the Energy dashboard', solution: 'The entity must have the energy device class and the total_increasing state class (already set in the YAML), with unit kWh.' },
				{ problem: 'The counter resets after a reboot', solution: 'The “total” of pulse_meter is stored in memory: Home Assistant keeps the history, and the total_increasing class handles resets without losing statistics.' },
			],
			faq: [
				{ question: 'What if my meter only has a pulse LED?', answer: 'Use an optical sensor (phototransistor with a digital output) in front of the LED, shielded from ambient light, and keep the same code.' },
				{ question: 'Can I measure a water or gas meter the same way?', answer: 'Yes, if it provides pulses (dry contact or optical): change the unit and the factor, and add the entity to the Energy dashboard if relevant.' },
				{ question: 'How accurate are the values?', answer: 'Energy is as reliable as the pulse counting (no missed pulse); power is the average over the interval between two pulses.' },
			],
		},
		de: {
			title: `Stromzähler Impulse ESP32 ESPHome`,
			description:
				
				
				`Leistung und Energie in Home Assistant: S0-Impulse, ESP32-C6 und ESPHome — Verdrahtung, YAML und Sicherheit. Material, GPIO-Plan, ESPHome-YAML und Home Ass`,
			h1: 'Stromzähler (S0-Impulse)',
			objective:
				'Sie verfolgen den Stromverbrauch Ihres Hauses in Home Assistant, der Software, die Ihre vernetzten Geräte vereint, ohne jemals die 230 Volt des Netzes anzufassen. Der Linky, der kommunikationsfähige Stromzähler französischer Haushalte, blinkt bei jedem Bruchteil einer verbrauchten Kilowattstunde; ein optischer Sensor vor dieser kleinen Impuls-LED leitet die Lichtblitze an einen ESP32 weiter, eine kleine Elektronikplatine mit WLAN. Die Platine errechnet daraus die momentane Leistung in Watt (W) und die aufsummierte Energie in Kilowattstunden (kWh), direkt nutzbar im Energie-Dashboard.',
			usefulness:
				'So erkennen Sie Geräte, die im Standby Strom ziehen, verfolgen den Verbrauch Stunde für Stunde und lassen sich bei Überschreitung warnen. Die LED-Methode ist die sicherste, denn sie braucht keinerlei elektrischen Kontakt. Der TIC-Ausgang des Linky (die Klemmen I1 und I2), die Datenschnittstelle des Zählers, liefert zusätzlich die Zählerstände je Tarif und die Scheinleistung, erfordert aber eine eigene Schnittstelle, die diese Seite nicht behandelt.',
			prerequisites: [
				'Ein Zähler mit S0-Ausgang (Hutschienenzähler haben ihn oft) oder mit Impuls-LED; die Impulse pro kWh (Imp/kWh) stehen auf der Front.',
				'Home Assistant mit ESPHome und 2,4-GHz-WLAN bis zum Zählerplatz.',
				'Eine Elektrofachkraft, falls der Zähler noch nicht eingebaut ist oder der Zählerschrank geöffnet werden muss.',
			],
			safety:
				'Die S0-Klemmen sind potenzialfrei und Kleinspannung, sitzen aber im Zählerschrank neben Netzklemmen. Öffnen Sie den Schrank nicht und berühren Sie keine L/N-Klemmen: Lassen Sie den Zähler von einer Elektrofachkraft einbauen und im Zweifel auch die S0-Leitung anschließen. Einen Zähler des Netzbetreibers dürfen Sie nicht ohne dessen Erlaubnis verändern.',
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Steuerplatine (siehe Kasten oben).', productId: 'esp32-c6-devkitc' },
				{ name: 'kWh-Zähler mit S0-Impulsausgang (falls noch nicht vorhanden)', qty: '0–1', note: 'Preise schwanken stark; der Einbau gehört in die Hand einer Elektrofachkraft. Imp/kWh-Wert notieren.', q: true },
				{ name: 'Zweiadriges Kleinspannungskabel (0,25 mm²)', qty: '1 bis 5 m', note: 'Von den S0-Klemmen zum ESP32, getrennt von Netzleitungen verlegt.' },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'S0-Ausgang mit dem ESP32 verbinden',
					actions: [
						'Verbinden Sie den optischen Sensor mit drei Dupont-Kabeln (flexible Kabel, deren Enden sich ohne Löten aufstecken lassen) bei abgezogener USB-Stromversorgung mit der Platine: VCC (die Stromversorgung) an den Pin 3V3, GND (die Masse) an einen GND-Pin und DO (den digitalen Ausgang des Sensors) an GPIO10, einen der metallenen Pins am Rand der Platine, die GPIO heißen.',
						'S0 + an GPIO10 und S0 − an GND legen, mit einem zweiadrigen Kabel.',
						'Der interne Pull-up des ESP32 (INPUT_PULLUP im YAML) genügt für die meisten S0-Ausgänge; die Mindestspannung im Datenblatt des Zählers prüfen.',
					],
					observe: 'Bei Last blinkt die Impulsanzeige des Zählers, und der S0-Kontakt schließt jedes Mal kurz.',
					check: 'Mit dem Multimeter im Durchgangsmodus an S0 +/−: Es piept bei jedem Impuls.',
				},
				{
					title: 'Umrechnungsfaktoren einstellen',
					actions: [
						'Lesen Sie zuerst auf der Vorderseite des Linky die Anzahl der Impulse pro kWh ab, oft 1000 („1000 imp/kWh“), denn die Berechnung von Leistung und Energie hängt davon ab.',
						'Im YAML „multiply: 60“ (Leistung in W) und „multiply: 0.001“ (Energie in kWh) anhand der Formeln in den Kommentaren anpassen.',
						'Per WLAN installieren, eine bekannte Last einschalten (z. B. Wasserkocher mit 2 kW) und mit der Anzeige des Zählers vergleichen.',
					],
					observe: 'Die Leistung steigt wenige Sekunden nach dem Einschalten und fällt nach 5 Minuten ohne Impuls auf 0.',
					check: 'Die Abweichung zur Momentanwertanzeige des Zählers bleibt im niedrigen Prozentbereich.',
				},
			],
			haIntegration: [
				'Die Entitäten „Power“ (W) und „Energy“ (kWh, total ansteigend) erscheinen unter dem ESPHome-Gerät.',
				'Unter Einstellungen → Dashboards → Energie „Energy“ als „Netzverbrauch“ hinzufügen: Verlauf und Kosten erscheinen nach der ersten vollen Stunde.',
				'Die Messung ist indikativ und ersetzt nicht Ihre Abrechnung: Maßgeblich bleibt der Zähler des Versorgers.',
			],
			troubleshooting: [
				{ problem: 'Leistung bleibt bei 0 W', solution: 'Keine Impulse erreichen GPIO10. S0-Polung prüfen, Durchgang mit dem Multimeter testen und sicherstellen, dass der Zähler wirklich einen aktiven S0-Ausgang hat.' },
				{ problem: 'Werte viel zu hoch', solution: 'Der Umrechnungsfaktor passt nicht zu Imp/kWh. Multiplikatoren neu berechnen; internal_filter erhöhen, falls Kontaktprellen mitgezählt wird.' },
				{ problem: 'Energie erscheint nicht im Energie-Dashboard', solution: 'Die Entität braucht die Geräteklasse Energie und die Zustandsklasse total_increasing (im YAML gesetzt) mit Einheit kWh.' },
				{ problem: 'Zählerstand nach Neustart zurückgesetzt', solution: 'Der „total“-Wert von pulse_meter liegt im Speicher: Home Assistant behält den Verlauf, die Klasse total_increasing fängt Rücksetzer ohne Statistikverlust ab.' },
			],
			faq: [
				{ question: 'Was, wenn mein Zähler nur eine Impuls-LED hat?', answer: 'Einen optischen Sensor (Fototransistor mit Digitalausgang) vor die LED setzen, gegen Umgebungslicht abschirmen und denselben Code behalten.' },
				{ question: 'Geht das auch mit Wasser- oder Gaszähler?', answer: 'Ja, wenn er Impulse liefert (potenzialfreier Kontakt oder optisch): Einheit und Faktor ändern und die Entität ggf. dem Energie-Dashboard hinzufügen.' },
				{ question: 'Wie genau sind die Werte?', answer: 'Die Energie ist so zuverlässig wie die Impulszählung (kein verpasster Impuls); die Leistung ist der Mittelwert zwischen zwei Impulsen.' },
			],
		},
		it: {
			title: `Contatore energia impulsi ESP32 ESPHome`,
			description:
				
				
				`Monitorate potenza ed energia in Home Assistant con impulsi S0, ESP32-C6 e ESPHome: cablaggio, YAML e sicurezza. Materiale, schema GPIO, YAML ESPHome e Hom`,
			h1: 'Contatore di energia (impulsi S0)',
			objective:
				'Seguirete il consumo elettrico della vostra casa in Home Assistant, il software che riunisce i vostri dispositivi connessi, senza mai toccare i 230 V di rete. Il Linky, il contatore comunicante installato nelle case francesi, lampeggia a ogni frazione di chilowattora consumata; un sensore ottico posto davanti a questo piccolo LED di impulsi invia i lampi a un ESP32, una piccola scheda elettronica con Wi-Fi. La scheda ne ricava la potenza istantanea in watt (W) e l’energia accumulata in chilowattora (kWh), subito utilizzabili nella dashboard Energia.',
			usefulness:
				'Questo monitoraggio serve a individuare gli apparecchi che consumano in standby, a seguire il consumo ora per ora e a ricevere un avviso in caso di superamento. Il metodo del LED è il più sicuro perché non richiede alcun contatto elettrico. L’uscita TIC del Linky (i morsetti I1 e I2), il collegamento dati del contatore, fornisce in più gli indici per tariffa e la potenza apparente, ma richiede un’interfaccia specifica, fuori dall’ambito di questa scheda.',
			prerequisites: [
				'Un contatore con uscita S0 (i contatori su guida DIN ce l’hanno spesso) o con LED a impulsi; leggete gli impulsi per kWh (imp/kWh) sul frontale.',
				'Home Assistant con ESPHome e Wi-Fi a 2,4 GHz fino al contatore.',
				'Un elettricista qualificato se il contatore non è ancora installato o se bisogna aprire il quadro.',
			],
			safety:
				'I morsetti S0 sono isolati e a bassissima tensione, ma si trovano nel quadro elettrico accanto ai morsetti di rete. Non aprite il quadro e non toccate i morsetti L/N: fate installare il contatore da un elettricista e, nel dubbio, fate collegare anche i fili S0. Non intervenite su un contatore del distributore senza la sua autorizzazione.',
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Scheda di comando (vedi il riquadro sopra).', productId: 'esp32-c6-devkitc' },
				{ name: 'Contatore kWh con uscita a impulsi S0 (se non lo avete)', qty: '0–1', note: 'Il prezzo varia molto e l’installazione spetta a un elettricista. Annotate il valore imp/kWh.', q: true },
				{ name: 'Cavo a 2 conduttori per bassa tensione (0,25 mm²)', qty: 'da 1 a 5 m', note: 'Dai morsetti S0 all’ESP32, lontano dai cavi di rete.' },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Collegare l’uscita S0 all’ESP32',
					actions: [
						'Con tre cavetti Dupont, fili flessibili con estremità da innestare senza saldare, collegate il sensore ottico alla scheda con l’alimentazione USB scollegata: VCC (l’alimentazione) al pin 3V3, GND (la massa) a un pin GND e DO (l’uscita digitale del sensore) a GPIO10, uno dei pin metallici allineati sul bordo della scheda, chiamati GPIO.',
						'Collegate S0 + a GPIO10 e S0 − a GND con un cavo a due conduttori.',
						'Il pull-up interno dell’ESP32 (INPUT_PULLUP nello YAML) basta per la maggior parte delle uscite S0; verificate la tensione minima nella scheda tecnica del contatore.',
					],
					observe: 'Con un carico acceso l’indicatore a impulsi del contatore lampeggia e il contatto S0 si chiude brevemente ogni volta.',
					check: 'Con il multimetro in continuità su S0 +/−: suona a ogni impulso.',
				},
				{
					title: 'Impostare i fattori di conversione',
					actions: [
						'Leggete prima sulla facciata del Linky il numero di impulsi per kWh, spesso 1000 («1000 imp/kWh»), perché i calcoli di potenza e di energia dipendono da questo valore.',
						'Nello YAML regolate «multiply: 60» (potenza in W) e «multiply: 0.001» (energia in kWh) con le formule dei commenti.',
						'Installate via Wi-Fi, accendete un carico noto (un bollitore da 2 kW, per esempio) e confrontate con il display del contatore.',
					],
					observe: 'La potenza sale pochi secondi dopo l’accensione e torna a 0 dopo 5 minuti senza impulsi.',
					check: 'Lo scarto con la lettura istantanea del contatore resta entro pochi punti percentuali.',
				},
			],
			haIntegration: [
				'Le entità «Power» (W) ed «Energy» (kWh, totale crescente) compaiono sotto il dispositivo ESPHome.',
				'In Impostazioni → Dashboard → Energia aggiungete «Energy» come «Consumo dalla rete»: storico e costo compaiono dopo la prima ora piena.',
				'La misura è indicativa e non sostituisce la bolletta: il contatore del distributore resta il riferimento.',
			],
			troubleshooting: [
				{ problem: 'La potenza resta a 0 W', solution: 'Nessun impulso arriva a GPIO10. Verificate la polarità S0, provate la continuità con un multimetro e controllate che il contatore abbia un’uscita S0 attiva.' },
				{ problem: 'Valori molto troppo alti', solution: 'Il fattore di conversione non corrisponde a imp/kWh. Ricalcolate i moltiplicatori; aumentate internal_filter se si contano i rimbalzi del contatto.' },
				{ problem: 'L’energia non compare nella dashboard Energia', solution: 'L’entità deve avere classe dispositivo energia e classe di stato total_increasing (già nello YAML), con unità kWh.' },
				{ problem: 'Il totale si azzera dopo un riavvio', solution: 'Il «total» di pulse_meter è in memoria: Home Assistant conserva lo storico e la classe total_increasing gestisce gli azzeramenti senza perdere statistiche.' },
			],
			faq: [
				{ question: 'E se il mio contatore ha solo un LED a impulsi?', answer: 'Usate un sensore ottico (fototransistor con uscita digitale) davanti al LED, schermato dalla luce ambiente, e mantenete lo stesso codice.' },
				{ question: 'Posso fare lo stesso con un contatore d’acqua o gas?', answer: 'Sì, se fornisce impulsi (contatto pulito o ottico): cambiate unità e fattore e, se serve, aggiungete l’entità alla dashboard Energia.' },
				{ question: 'Quanto sono precisi i valori?', answer: 'L’energia è affidabile quanto il conteggio degli impulsi (nessuno perso); la potenza è la media tra due impulsi.' },
			],
		},
		es: {
			title: `Contador energía impulsos ESP32 ESPHome`,
			description:
				
				
				`Sigue potencia y energía en Home Assistant con impulsos S0, ESP32-C6 y ESPHome: cableado, YAML y seguridad. Material, esquema GPIO, YAML ESPHome y Home Ass`,
			h1: 'Contador de energía (impulsos S0)',
			objective:
				'Vas a seguir el consumo eléctrico de tu casa en Home Assistant, el software que reúne tus dispositivos conectados, sin tocar nunca los 230 V de la red. El Linky, el contador comunicante instalado en los hogares franceses, parpadea a cada fracción de kilovatio hora consumida; un sensor óptico colocado delante de ese pequeño LED de impulsos envía los destellos a un ESP32, una pequeña placa electrónica con Wi-Fi. La placa calcula la potencia instantánea en vatios (W) y la energía acumulada en kilovatios hora (kWh), listas para usar en el panel de Energía.',
			usefulness:
				'Este seguimiento sirve para detectar los aparatos que consumen en espera, seguir el consumo hora a hora y recibir una alerta si se supera un límite. El método del LED es el más seguro, porque no requiere ningún contacto eléctrico. La salida TIC del Linky (los bornes I1 e I2), la conexión de datos del contador, da además los índices por tarifa y la potencia aparente, pero exige una interfaz específica, fuera del alcance de esta ficha.',
			prerequisites: [
				'Un contador con salida S0 (los de carril DIN suelen tenerla) o con LED de impulsos; lee los impulsos por kWh (imp/kWh) en el frontal.',
				'Home Assistant con ESPHome y Wi-Fi de 2,4 GHz hasta el contador.',
				'Un electricista cualificado si el contador aún no está instalado o hay que abrir el cuadro eléctrico.',
			],
			safety:
				'Los bornes S0 están aislados y son de muy baja tensión, pero están dentro del cuadro eléctrico junto a bornes de red. No abras el cuadro ni toques los bornes L/N: que un electricista instale el contador y, en caso de duda, conecte también los cables S0. No manipules un contador de la distribuidora sin su autorización.',
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Placa de control (véase el recuadro de arriba).', productId: 'esp32-c6-devkitc' },
				{ name: 'Contador kWh con salida de impulsos S0 (si no tienes)', qty: '0–1', note: 'El precio varía mucho y la instalación corresponde a un electricista. Anota el valor imp/kWh.', q: true },
				{ name: 'Cable de 2 conductores de baja tensión (0,25 mm²)', qty: '1 a 5 m', note: 'De los bornes S0 al ESP32, lejos de los cables de red.' },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Conectar la salida S0 al ESP32',
					actions: [
						'Con tres cables Dupont, cables flexibles cuyos extremos se enchufan sin soldar, conecta el sensor óptico a la placa con la alimentación USB desconectada: VCC (la alimentación) al pin 3V3, GND (la masa) a un pin GND y DO (la salida digital del sensor) a GPIO10, uno de los pines metálicos alineados en el borde de la placa, llamados GPIO.',
						'Conecta S0 + a GPIO10 y S0 − a GND con un cable de dos conductores.',
						'El pull-up interno del ESP32 (INPUT_PULLUP en el YAML) basta para la mayoría de salidas S0; comprueba la tensión mínima en la hoja de datos del contador.',
					],
					observe: 'Con una carga encendida, el indicador de impulsos del contador parpadea y el contacto S0 se cierra brevemente cada vez.',
					check: 'Con el multímetro en continuidad en S0 +/−: pita con cada impulso.',
				},
				{
					title: 'Ajustar los factores de conversión',
					actions: [
						'Lee primero en el frontal del Linky el número de impulsos por kWh, a menudo 1000 («1000 imp/kWh»), porque los cálculos de potencia y de energía dependen de él.',
						'En el YAML ajusta «multiply: 60» (potencia en W) y «multiply: 0.001» (energía en kWh) con las fórmulas de los comentarios.',
						'Instala por Wi-Fi, enciende una carga conocida (un hervidor de 2 kW, por ejemplo) y compara con la pantalla del contador.',
					],
					observe: 'La potencia sube unos segundos tras encender y vuelve a 0 después de 5 minutos sin impulsos.',
					check: 'La diferencia con la lectura instantánea del contador se queda en pocos puntos porcentuales.',
				},
			],
			haIntegration: [
				'Las entidades «Power» (W) y «Energy» (kWh, total creciente) aparecen bajo el dispositivo ESPHome.',
				'En Ajustes → Paneles → Energía añade «Energy» como «Consumo de la red»: historial y coste aparecen tras la primera hora completa.',
				'La medida es orientativa y no sustituye a tu factura: el contador de la distribuidora sigue siendo la referencia.',
			],
			troubleshooting: [
				{ problem: 'La potencia se queda en 0 W', solution: 'Ningún impulso llega a GPIO10. Revisa la polaridad S0, prueba la continuidad con un multímetro y comprueba que el contador tenga una salida S0 activa.' },
				{ problem: 'Valores mucho más altos', solution: 'El factor de conversión no coincide con imp/kWh. Recalcula los multiplicadores; sube internal_filter si se cuentan los rebotes del contacto.' },
				{ problem: 'La energía no aparece en el panel de Energía', solution: 'La entidad debe tener clase de dispositivo energía y clase de estado total_increasing (ya en el YAML), con unidad kWh.' },
				{ problem: 'El total se reinicia tras un reinicio', solution: 'El «total» de pulse_meter está en memoria: Home Assistant conserva el historial y la clase total_increasing gestiona los reinicios sin perder estadísticas.' },
			],
			faq: [
				{ question: '¿Y si mi contador solo tiene un LED de impulsos?', answer: 'Usa un sensor óptico (fototransistor con salida digital) delante del LED, protegido de la luz ambiente, y conserva el mismo código.' },
				{ question: '¿Puedo hacer lo mismo con un contador de agua o gas?', answer: 'Sí, si da impulsos (contacto seco u óptico): cambia la unidad y el factor y, si procede, añade la entidad al panel de Energía.' },
				{ question: '¿Qué precisión tienen los valores?', answer: 'La energía es tan fiable como el recuento de impulsos (sin pérdidas); la potencia es la media entre dos impulsos.' },
			],
		},
	},
};
