import { esphomeHeader, fullGuideFor } from '../shared.mjs';

const yaml =
	esphomeHeader('capteur-temperature', 'Temperature sensor') +
	`
sensor:
  - platform: dht
    pin: GPIO10                 # CHANGE if you use another free GPIO
    model: DHT22                # AM2302 modules use the same protocol
    update_interval: 30s        # DHT22 needs at least 2 s between reads
    temperature:
      name: "Temperature"
      filters:
        - offset: 0.0           # CHANGE after comparing with a reference thermometer
    humidity:
      name: "Humidity"

  - platform: wifi_signal       # Wi-Fi quality, handy to diagnose a bad location
    name: "WiFi signal"
    update_interval: 120s
    entity_category: diagnostic

binary_sensor:
  - platform: status            # online / offline in Home Assistant
    name: "Status"
`;

export const project = {
	id: 'temperature-humidity',
	level: 'beginner',
	durationHours: '1–2',
	budgetRange: {
		fr: 'environ 10–25 € selon vendeur',
		en: 'about €10–25 depending on the seller',
		de: 'ca. 10–25 € je nach Händler',
		it: 'circa 10–25 € a seconda del venditore',
		es: 'unos 10–25 € según el vendedor',
	},
	slugs: {
		fr: 'capteur-temperature-humidite',
		en: 'temperature-humidity-sensor',
		de: 'temperatur-feuchtigkeitssensor',
		it: 'sensore-temperatura-umidita',
		es: 'sensor-temperatura-humedad',
	},
	fullGuide: fullGuideFor('esp32-esphome-capteur-temperature'),
	productIds: ['esp32-c6-devkitc'],
	searchQueries: {
		fr: 'DHT22 AM2302 module capteur température humidité',
		en: 'DHT22 AM2302 temperature humidity sensor module',
		de: 'DHT22 AM2302 Temperatur Feuchtigkeit Sensor Modul',
		it: 'DHT22 AM2302 modulo sensore temperatura umidità',
		es: 'DHT22 AM2302 módulo sensor temperatura humedad',
	},
	smallMaterialIds: ['usb', 'psu', 'dupont', 'breadboard', 'enclosure'],
	wiring: {
		sensorName: { fr: 'DHT22 (module)', en: 'DHT22 (module)', de: 'DHT22 (Modul)', it: 'DHT22 (modulo)', es: 'DHT22 (módulo)' },
		pins: [
			{ gpio: '3V3', signal: 'VCC (+)', color: 'power' },
			{ gpio: 'GPIO10', signal: 'DATA (OUT)', color: 'data' },
			{ gpio: 'GND', signal: 'GND (−)', color: 'ground' },
		],
		principleBoxes: {
			fr: [
				{ title: `DHT22`, s: 'DHT22', a: 'Mesure température et humidité', b: 'Signal numérique sur 1 fil' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Lit le capteur toutes les 30 s', b: 'Publie les valeurs sur le réseau local', via: 'GPIO10' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Entités Temperature et Humidity', b: 'Historique, tableau de bord, automatisations', via: 'Wi-Fi 2,4 GHz + API chiffrée' },
			],
			en: [
				{ title: 'DHT22', s: 'DHT22', a: 'Measures temperature and humidity', b: 'One-wire digital signal' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Reads the sensor every 30 s', b: 'Publishes values on the local network', via: 'GPIO10' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Temperature and Humidity entities', b: 'History, dashboard, automations', via: '2.4 GHz Wi-Fi + encrypted API' },
			],
			de: [
				{ title: 'DHT22', s: 'DHT22', a: 'Misst Temperatur und Luftfeuchte', b: 'Digitales Eindraht-Signal' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Liest den Sensor alle 30 s', b: 'Veröffentlicht die Werte im lokalen Netz', via: 'GPIO10' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Entitäten Temperature und Humidity', b: 'Verlauf, Dashboard, Automatisierungen', via: '2,4-GHz-WLAN + verschlüsselte API' },
			],
			it: [
				{ title: 'DHT22', s: 'DHT22', a: 'Misura temperatura e umidità', b: 'Segnale digitale a un filo' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Legge il sensore ogni 30 s', b: 'Pubblica i valori sulla rete locale', via: 'GPIO10' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Entità Temperature e Humidity', b: 'Storico, dashboard, automazioni', via: 'Wi-Fi 2,4 GHz + API cifrata' },
			],
			es: [
				{ title: 'DHT22', s: 'DHT22', a: 'Mide temperatura y humedad', b: 'Señal digital de un solo hilo' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Lee el sensor cada 30 s', b: 'Publica los valores en la red local', via: 'GPIO10' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: 'Entidades Temperature y Humidity', b: 'Historial, panel, automatizaciones', via: 'Wi-Fi 2,4 GHz + API cifrada' },
			],
		},
	},
	yaml,
	locales: {
		fr: {
			title: `Capteur température humidité ESP32 ESPHome`,
			description:
				
				
				`Montez un DHT22 sur ESP32-C6 avec ESPHome : câblage, YAML, Home Assistant et dépannage. Projet débutant, 1 à 2 h. Matériel, schéma GPIO, YAML ESPHome et Ho`,
			h1: 'Capteur de température et d’humidité',
			objective:
				'Vous allez construire un petit capteur qui mesure la température et l’humidité d’une pièce et les envoie toutes les 30 secondes à Home Assistant, le logiciel libre qui réunit tous vos appareils connectés sur un seul écran. Le cerveau du montage est un ESP32, une petite carte électronique équipée du Wi-Fi, programmée avec ESPHome, un outil qui prépare son programme à partir d’un simple fichier de réglages. Pas besoin de passerelle Zigbee ni d’abonnement : à la fin, deux nouvelles mesures, Temperature et Humidity, s’affichent sur votre tableau de bord, gardent leur historique et peuvent déclencher des automatisations.',
			usefulness:
				'Ce capteur vous aide à surveiller une chambre de bébé, une cave, une serre ou une pièce sujette aux moisissures. Vous pouvez aussi allumer un déshumidificateur quand l’air devient trop humide, ou comparer la température réelle avec celle que votre thermostat croit mesurer. C’est enfin le meilleur premier projet avec un ESP32 : il n’y a qu’un seul composant à brancher, avec trois fils, et chaque étape se vérifie en quelques secondes.',
			prerequisites: [
				'Un Home Assistant fonctionnel avec le module complémentaire ESPHome (voir le tuto d’installation).',
				'Un réseau Wi-Fi 2,4 GHz à portée de la pièce.',
				'Un ordinateur avec Chrome ou Edge pour le premier flash par USB.',
			],
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Carte de développement (voir l’encadré plus haut). Le XIAO ESP32C6 convient aussi en adaptant les broches.', productId: 'esp32-c6-devkitc' },
				{ name: 'Module DHT22 (AM2302) 3 broches', qty: 1, note: 'Précision annoncée par le fabricant : environ ±0,5 °C et ±2 à 5 % d’humidité. La version « module » intègre la résistance de rappel.', q: true },
				{ name: 'Module BME280 I²C (alternative)', qty: '0–1', note: 'Plus précis et ajoute la pression ; le câblage I²C est détaillé dans le guide complet.' },
			],
			smallMaterials: [{ name: 'Résistance 4,7 à 10 kΩ', qty: '0–1', note: 'Seulement si votre DHT22 est un composant nu à 4 broches (entre DATA et 3,3 V).' }],
			steps: [
				{
					title: 'Câbler le DHT22 sur la breadboard',
					actions: [
						'Débranchez le câble USB pour travailler sans courant : un fil mal placé sur une carte alimentée peut l’abîmer. Repérez ensuite les trois broches du module DHT22, le capteur lui-même : VCC (ou +) reçoit l’alimentation, DATA (ou OUT) transmet les mesures et GND (ou −) est la masse, le chemin de retour du courant. Ces noms sont souvent imprimés sur le circuit.',
						'Avec trois fils Dupont (des fils souples dont les extrémités s’enfichent sans soudure), reliez VCC à la broche 3V3 de la carte, DATA à la broche GPIO10 et GND à une broche GND. Les GPIO, pour « General Purpose Input Output », sont les broches métalliques alignées sur le bord de la carte : le numéro qui suit GPIO permet de distinguer chacune d’elles.',
						'Placez le capteur à quelques centimètres de la carte, à l’écart du port USB qui chauffe.',
					],
					observe: 'Le module n’a aucune LED obligatoire ; le contrôle se fait visuellement, fil par fil, avant de brancher l’alimentation.',
					check: 'Le fil rouge (3,3 V) n’est pas sur la broche 5V, et DATA est bien sur GPIO10 comme dans le schéma.',
				},
				{
					title: 'Contrôler les mesures et corriger l’écart',
					actions: [
						'Ouvrez l’onglet « Logs » d’ESPHome pour voir en direct ce que la carte raconte : une ligne « Got Temperature=… Humidity=… » doit apparaître toutes les 30 secondes, ce qui prouve que le capteur répond.',
						'Posez un thermomètre de référence à côté du capteur pendant 30 minutes et notez l’écart.',
						'Reportez l’écart dans le filtre « offset » du YAML (par exemple -0.8), puis cliquez sur « Install » > « Wirelessly ».',
					],
					observe: 'La température se stabilise sans dérive rapide ; l’humidité varie si vous soufflez doucement près du capteur.',
					check: 'L’écart avec le thermomètre de référence est inférieur à 1 °C après correction.',
				},
			],
			haIntegration: [
				'Les entités « Temperature » et « Humidity » apparaissent dans Paramètres → Appareils et services → ESPHome → votre appareil. Cliquez sur « Ajouter au tableau de bord » pour créer la carte.',
				'Le graphique d’historique est disponible dès la première heure ; pour des courbes sur plusieurs mois, gardez l’enregistreur par défaut (10 jours) ou configurez des statistiques à long terme.',
				'Automatisation type : si l’humidité dépasse 65 % pendant 10 minutes, allumer une prise connectée de déshumidificateur ; si la température passe sous 16 °C, envoyer une notification.',
			],
			troubleshooting: [
				{ problem: 'La valeur est « Indisponible » ou NaN', solution: 'Vérifiez DATA sur GPIO10, l’alimentation 3,3 V et la résistance de rappel (4,7–10 kΩ sur un DHT22 nu). Testez un autre GPIO libre et augmentez update_interval.' },
				{ problem: 'La carte ne rejoint pas le Wi-Fi', solution: 'L’ESP32 n’utilise que le 2,4 GHz. Séparez le SSID 2,4 GHz sur la box, évitez les caractères spéciaux dans le mot de passe ou testez le point d’accès de secours.' },
				{ problem: 'Température plus élevée que la pièce', solution: 'Éloignez le capteur de la carte et de l’USB, ou utilisez un fil plus long. Le filtre offset corrige un écart constant mais pas un échauffement variable.' },
				{ problem: 'Erreur de compilation sur la carte', solution: 'Mettez à jour ESPHome : le support de l’ESP32-C6 est récent et exige le framework ESP-IDF (déjà indiqué dans le YAML).' },
			],
			faq: [
				{ question: 'DHT22 ou BME280 : lequel choisir ?', answer: 'Le DHT22 est le plus simple (3 fils) pour débuter. Le BME280 est plus précis et mesure aussi la pression, mais utilise le bus I²C et demande de choisir l’adresse 0x76 ou 0x77. Le guide complet détaille les deux.' },
				{ question: 'Puis-je alimenter le capteur sur pile ?', answer: 'Un ESP32 en Wi-Fi permanent vide une pile en quelques jours. Pour une pile, il faut le mode deep sleep d’ESPHome et une carte à faible veille, ou choisir un capteur Zigbee.' },
				{ question: 'Combien de capteurs sur une seule carte ?', answer: 'Autant que de GPIO libres : chaque DHT22 prend un GPIO. Les capteurs I²C (BME280, BH1750…) partagent deux fils.' },
			],
		},
		en: {
			title: `ESP32 temperature humidity sensor (ESPHome)`,
			description:
				
				
				`Build a DHT22 on ESP32-C6 with ESPHome: wiring, YAML, Home Assistant and troubleshooting. Beginner, 1–2 hours. Parts list, GPIO wiring, ESPHome YAML and Ho`,
			h1: 'Temperature and humidity sensor',
			objective:
				'You will build a small sensor that measures the temperature and humidity of a room and sends both to Home Assistant every 30 seconds, the free software that gathers all your connected devices on one screen. The brain of the build is an ESP32, a small electronic board with built-in Wi-Fi, programmed with ESPHome, a tool that prepares the board’s program from a simple settings file. You need no Zigbee gateway and no subscription: at the end, two new readings, Temperature and Humidity, show up on your dashboard, keep their history and can trigger automations.',
			usefulness:
				'This sensor lets you keep an eye on a nursery, a cellar, a greenhouse or a room prone to mould. You can also switch on a dehumidifier when the air gets too damp, or compare the real temperature with what your thermostat believes it is. It is also the best first project with an ESP32: there is only one component to connect, with three wires, and every step can be checked within seconds.',
			prerequisites: [
				'A working Home Assistant with the ESPHome add-on (see the install tutorial).',
				'A 2.4 GHz Wi-Fi network reaching the room.',
				'A computer with Chrome or Edge for the first USB flash.',
			],
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Development board (see the box above). The XIAO ESP32C6 works too if you adapt the pins.', productId: 'esp32-c6-devkitc' },
				{ name: 'DHT22 (AM2302) module, 3 pins', qty: 1, note: 'Manufacturer-stated accuracy: about ±0.5 °C and ±2–5 % humidity. The “module” version includes the pull-up resistor.', q: true },
				{ name: 'BME280 I²C module (alternative)', qty: '0–1', note: 'More accurate and adds pressure; the I²C wiring is covered in the full guide.' },
			],
			smallMaterials: [{ name: '4.7 to 10 kΩ resistor', qty: '0–1', note: 'Only if your DHT22 is a bare 4-pin part (between DATA and 3.3 V).' }],
			steps: [
				{
					title: 'Wire the DHT22 on the breadboard',
					actions: [
						'Unplug the USB cable so you work with the power off: a wire placed wrongly on a live board can damage it. Then find the three pins of the DHT22 module, the sensor itself: VCC (or +) receives the power, DATA (or OUT) carries the readings and GND (or −) is the ground, the return path of the current. These names are usually printed on the circuit.',
						'With three Dupont wires (flexible wires whose ends plug in without soldering), connect VCC to the 3V3 pin of the board, DATA to the GPIO10 pin and GND to a GND pin. GPIO stands for “General Purpose Input Output”: these are the metal pins lined up along the edge of the board, and the number after GPIO tells them apart.',
						'Place the sensor a few centimetres from the board, away from the USB port which warms up.',
					],
					observe: 'The module has no mandatory LED; check visually, wire by wire, before powering up.',
					check: 'The red wire (3.3 V) is not on the 5V pin, and DATA is on GPIO10 as in the diagram.',
				},
				{
					title: 'Check the readings and correct the offset',
					actions: [
						'Open the “Logs” tab in ESPHome to watch live what the board reports: a “Got Temperature=… Humidity=…” line should appear every 30 seconds, which proves the sensor answers.',
						'Put a reference thermometer next to the sensor for 30 minutes and note the difference.',
						'Enter the difference in the YAML “offset” filter (for example -0.8), then click “Install” > “Wirelessly”.',
					],
					observe: 'The temperature settles without fast drift; humidity rises if you gently breathe near the sensor.',
					check: 'The gap with the reference thermometer is under 1 °C after correction.',
				},
			],
			haIntegration: [
				'The “Temperature” and “Humidity” entities appear under Settings → Devices & services → ESPHome → your device. Click “Add to dashboard” to create the card.',
				'The history graph is available after the first hour; for multi-month curves keep the default recorder (10 days) or set up long-term statistics.',
				'Typical automation: if humidity stays above 65 % for 10 minutes, switch on a dehumidifier plug; if the temperature drops below 16 °C, send a notification.',
			],
			troubleshooting: [
				{ problem: 'The value is “Unavailable” or NaN', solution: 'Check DATA on GPIO10, the 3.3 V supply and the pull-up resistor (4.7–10 kΩ on a bare DHT22). Try another free GPIO and raise update_interval.' },
				{ problem: 'The board does not join Wi-Fi', solution: 'The ESP32 only uses 2.4 GHz. Keep a 2.4 GHz SSID on your router, avoid special characters in the password or try the fallback hotspot.' },
				{ problem: 'Temperature reads higher than the room', solution: 'Move the sensor away from the board and USB, or use a longer wire. The offset filter fixes a constant error, not a variable self-heating.' },
				{ problem: 'Compilation error for the board', solution: 'Update ESPHome: ESP32-C6 support is recent and needs the ESP-IDF framework (already set in the YAML).' },
			],
			faq: [
				{ question: 'DHT22 or BME280: which one?', answer: 'The DHT22 is simplest (3 wires) for a first build. The BME280 is more accurate and also measures pressure, but uses the I²C bus and needs address 0x76 or 0x77. The full guide covers both.' },
				{ question: 'Can I power the sensor with a battery?', answer: 'An ESP32 with permanent Wi-Fi empties a battery in days. For a battery build you need ESPHome deep sleep and a low-sleep-current board, or choose a Zigbee sensor.' },
				{ question: 'How many sensors on one board?', answer: 'As many as you have free GPIOs: each DHT22 takes one. I²C sensors (BME280, BH1750…) share two wires.' },
			],
		},
		de: {
			title: `ESP32 Temperatur-Feuchtesensor mit ESPHome`,
			description:
				
				
				`DHT22 an ESP32-C6 mit ESPHome: Verdrahtung, YAML, Home Assistant und Fehlersuche. Einsteiger, 1–2 Stunden. Material, GPIO-Plan, ESPHome-YAML und Home Assis`,
			h1: 'Temperatur- und Feuchtigkeitssensor',
			objective:
				'Sie bauen einen kleinen Sensor, der Temperatur und Luftfeuchte eines Raums misst und beides alle 30 Sekunden an Home Assistant meldet, die freie Software, die alle Ihre vernetzten Geräte auf einer Oberfläche vereint. Das Gehirn des Aufbaus ist ein ESP32, eine kleine Elektronikplatine mit eingebautem WLAN, die Sie mit ESPHome programmieren, einem Werkzeug, das das Programm der Platine aus einer einfachen Einstellungsdatei erzeugt. Ein Zigbee-Gateway oder ein Abo brauchen Sie nicht: Am Ende erscheinen die beiden neuen Messwerte Temperature und Humidity auf Ihrem Dashboard, behalten ihren Verlauf und können Automatisierungen auslösen.',
			usefulness:
				'Mit diesem Sensor behalten Sie ein Kinderzimmer, einen Keller, ein Gewächshaus oder einen schimmelgefährdeten Raum im Blick. Sie können außerdem einen Entfeuchter einschalten, sobald die Luft zu feucht wird, oder die echte Temperatur mit dem vergleichen, was Ihr Thermostat annimmt. Zugleich ist es das beste erste Projekt mit einem ESP32: Es gibt nur ein Bauteil anzuschließen, mit drei Drähten, und jeder Schritt lässt sich in wenigen Sekunden überprüfen.',
			prerequisites: [
				'Ein laufendes Home Assistant mit dem ESPHome-Add-on (siehe Installationsanleitung).',
				'Ein 2,4-GHz-WLAN, das den Raum erreicht.',
				'Ein Computer mit Chrome oder Edge für das erste Flashen per USB.',
			],
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Entwicklungsplatine (siehe Kasten oben). Das XIAO ESP32C6 geht ebenfalls, wenn Sie die Pins anpassen.', productId: 'esp32-c6-devkitc' },
				{ name: 'DHT22-(AM2302-)Modul, 3 Pins', qty: 1, note: 'Herstellerangabe: etwa ±0,5 °C und ±2–5 % Luftfeuchte. Die Modulversion hat den Pull-up-Widerstand bereits an Bord.', q: true },
				{ name: 'BME280-I²C-Modul (Alternative)', qty: '0–1', note: 'Genauer und misst zusätzlich den Luftdruck; die I²C-Verdrahtung steht im ausführlichen Ratgeber.' },
			],
			smallMaterials: [{ name: 'Widerstand 4,7 bis 10 kΩ', qty: '0–1', note: 'Nur wenn Ihr DHT22 ein nacktes Bauteil mit 4 Beinen ist (zwischen DATA und 3,3 V).' }],
			steps: [
				{
					title: 'DHT22 auf dem Breadboard verdrahten',
					actions: [
						'Ziehen Sie das USB-Kabel ab, damit Sie ohne Strom arbeiten: Ein falsch gesteckter Draht an einer eingeschalteten Platine kann sie beschädigen. Suchen Sie dann die drei Pins des DHT22-Moduls, also des eigentlichen Sensors: VCC (oder +) bekommt den Strom, DATA (oder OUT) überträgt die Messwerte und GND (oder −) ist die Masse, der Rückweg des Stroms. Diese Namen sind meist auf die Platine gedruckt.',
						'Verbinden Sie mit drei Dupont-Kabeln (flexible Kabel, deren Enden sich ohne Löten aufstecken lassen) VCC mit dem Pin 3V3 der Platine, DATA mit GPIO10 und GND mit einem GND-Pin. GPIO steht für „General Purpose Input Output“: So heißen die metallenen Pins am Rand der Platine, die Zahl hinter GPIO unterscheidet sie.',
						'Den Sensor einige Zentimeter von der Platine entfernt platzieren, abseits des warm werdenden USB-Anschlusses.',
					],
					observe: 'Das Modul hat keine Pflicht-LED; prüfen Sie vor dem Einschalten Draht für Draht mit dem Auge.',
					check: 'Das rote Kabel (3,3 V) hängt nicht am 5V-Pin, und DATA liegt wie im Plan an GPIO10.',
				},
				{
					title: 'Messwerte prüfen und Abweichung korrigieren',
					actions: [
						'Öffnen Sie in ESPHome den Reiter „Logs“, um live zu sehen, was die Platine meldet: Alle 30 Sekunden muss eine Zeile „Got Temperature=… Humidity=…“ erscheinen, der Beweis, dass der Sensor antwortet.',
						'Ein Referenzthermometer 30 Minuten neben den Sensor legen und die Abweichung notieren.',
						'Abweichung im YAML-Filter „offset“ eintragen (z. B. -0.8) und „Install“ > „Wirelessly“ wählen.',
					],
					observe: 'Die Temperatur stabilisiert sich ohne schnelle Drift; die Luftfeuchte steigt, wenn Sie sanft in Sensornähe hauchen.',
					check: 'Nach der Korrektur liegt die Abweichung zum Referenzthermometer unter 1 °C.',
				},
			],
			haIntegration: [
				'Die Entitäten „Temperature“ und „Humidity“ erscheinen unter Einstellungen → Geräte & Dienste → ESPHome → Ihr Gerät. Mit „Zum Dashboard hinzufügen“ erzeugen Sie die Karte.',
				'Der Verlaufsgraph steht nach der ersten Stunde bereit; für mehrmonatige Kurven den Standard-Recorder (10 Tage) behalten oder Langzeitstatistiken einrichten.',
				'Typische Automatisierung: Bleibt die Luftfeuchte 10 Minuten über 65 %, einen Entfeuchter über eine Steckdose einschalten; fällt die Temperatur unter 16 °C, eine Benachrichtigung senden.',
			],
			troubleshooting: [
				{ problem: 'Wert „Nicht verfügbar“ oder NaN', solution: 'DATA an GPIO10, 3,3-V-Versorgung und Pull-up (4,7–10 kΩ beim nackten DHT22) prüfen. Anderen freien GPIO testen und update_interval erhöhen.' },
				{ problem: 'Platine verbindet sich nicht mit dem WLAN', solution: 'Der ESP32 nutzt nur 2,4 GHz. Am Router eine 2,4-GHz-SSID bereithalten, Sonderzeichen im Passwort vermeiden oder den Fallback-Hotspot testen.' },
				{ problem: 'Temperatur höher als im Raum', solution: 'Sensor von Platine und USB wegrücken oder ein längeres Kabel nehmen. „offset“ korrigiert einen konstanten Fehler, keine wechselnde Eigenerwärmung.' },
				{ problem: 'Kompilierfehler für die Platine', solution: 'ESPHome aktualisieren: Der ESP32-C6 wird erst seit Kurzem unterstützt und braucht das ESP-IDF-Framework (im YAML schon gesetzt).' },
			],
			faq: [
				{ question: 'DHT22 oder BME280 – was nehmen?', answer: 'Der DHT22 ist mit 3 Drähten am einfachsten. Der BME280 ist genauer und misst auch den Luftdruck, nutzt aber den I²C-Bus und braucht die Adresse 0x76 oder 0x77. Der ausführliche Ratgeber behandelt beide.' },
				{ question: 'Geht der Betrieb mit Batterie?', answer: 'Ein ESP32 mit dauerhaftem WLAN leert eine Batterie in wenigen Tagen. Für Batteriebetrieb braucht es den Deep Sleep von ESPHome und eine Platine mit niedrigem Ruhestrom – oder einen Zigbee-Sensor.' },
				{ question: 'Wie viele Sensoren an einer Platine?', answer: 'So viele, wie freie GPIOs vorhanden sind: Jeder DHT22 belegt einen. I²C-Sensoren (BME280, BH1750 …) teilen sich zwei Leitungen.' },
			],
		},
		it: {
			title: `Sensore temperatura umidità ESP32 ESPHome`,
			description:
				
				
				`Collegate un DHT22 a ESP32-C6 con ESPHome: cablaggio, YAML, Home Assistant e problemi comuni. Principianti, 1–2 ore. Materiale, schema GPIO, YAML ESPHome e`,
			h1: 'Sensore di temperatura e umidità',
			objective:
				'Costruirete un piccolo sensore che misura temperatura e umidità di una stanza e le invia ogni 30 secondi a Home Assistant, il software libero che riunisce tutti i vostri dispositivi connessi in un’unica schermata. Il cervello del montaggio è un ESP32, una piccola scheda elettronica con Wi-Fi integrato, programmata con ESPHome, uno strumento che prepara il programma della scheda partendo da un semplice file di impostazioni. Non servono né un gateway Zigbee né un abbonamento: alla fine due nuove misure, Temperature e Humidity, compaiono nella vostra dashboard, conservano lo storico e possono far partire delle automazioni.',
			usefulness:
				'Questo sensore vi permette di tenere d’occhio una cameretta, una cantina, una serra o una stanza soggetta a muffa. Potete anche accendere un deumidificatore quando l’aria diventa troppo umida, oppure confrontare la temperatura reale con quella che crede di misurare il termostato. È inoltre il miglior primo progetto con un ESP32: c’è un solo componente da collegare, con tre fili, e ogni passo si controlla in pochi secondi.',
			prerequisites: [
				'Un Home Assistant funzionante con il componente aggiuntivo ESPHome (vedi il tutorial di installazione).',
				'Una rete Wi-Fi a 2,4 GHz che raggiunga la stanza.',
				'Un computer con Chrome o Edge per il primo flash via USB.',
			],
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Scheda di sviluppo (vedi il riquadro sopra). Va bene anche la XIAO ESP32C6 adattando i pin.', productId: 'esp32-c6-devkitc' },
				{ name: 'Modulo DHT22 (AM2302) a 3 pin', qty: 1, note: 'Precisione dichiarata dal produttore: circa ±0,5 °C e ±2–5 % di umidità. La versione «modulo» include la resistenza di pull-up.', q: true },
				{ name: 'Modulo BME280 I²C (alternativa)', qty: '0–1', note: 'Più preciso e misura anche la pressione; il cablaggio I²C è nella guida completa.' },
			],
			smallMaterials: [{ name: 'Resistenza da 4,7 a 10 kΩ', qty: '0–1', note: 'Solo se il vostro DHT22 è un componente nudo a 4 piedini (tra DATA e 3,3 V).' }],
			steps: [
				{
					title: 'Cablare il DHT22 sulla breadboard',
					actions: [
						'Scollegate il cavo USB per lavorare senza tensione: un filo messo male su una scheda alimentata può danneggiarla. Poi individuate i tre pin del modulo DHT22, cioè del sensore vero e proprio: VCC (o +) riceve l’alimentazione, DATA (o OUT) trasporta le misure e GND (o −) è la massa, il percorso di ritorno della corrente. Questi nomi sono di solito stampati sul circuito.',
						'Con tre cavetti Dupont (fili flessibili le cui estremità si innestano senza saldare) collegate VCC al pin 3V3 della scheda, DATA a GPIO10 e GND a un pin GND. GPIO sta per «General Purpose Input Output»: sono i pin metallici allineati sul bordo della scheda, e il numero dopo GPIO li distingue.',
						'Posizionate il sensore a qualche centimetro dalla scheda, lontano dalla porta USB che si scalda.',
					],
					observe: 'Il modulo non ha un LED obbligatorio; controllate a vista, filo per filo, prima di dare tensione.',
					check: 'Il filo rosso (3,3 V) non è sul pin 5V e DATA è su GPIO10 come nello schema.',
				},
				{
					title: 'Controllare le misure e correggere lo scarto',
					actions: [
						'Aprite la scheda «Logs» di ESPHome per vedere in diretta ciò che la scheda comunica: ogni 30 secondi deve comparire una riga «Got Temperature=… Humidity=…», segno che il sensore risponde.',
						'Mettete un termometro di riferimento accanto al sensore per 30 minuti e annotate lo scarto.',
						'Inserite lo scarto nel filtro «offset» dello YAML (ad esempio -0.8), poi «Install» > «Wirelessly».',
					],
					observe: 'La temperatura si stabilizza senza derive rapide; l’umidità sale se soffiate delicatamente vicino al sensore.',
					check: 'Dopo la correzione lo scarto con il termometro di riferimento è inferiore a 1 °C.',
				},
			],
			haIntegration: [
				'Le entità «Temperature» e «Humidity» compaiono in Impostazioni → Dispositivi e servizi → ESPHome → il vostro dispositivo. Con «Aggiungi alla dashboard» create la scheda.',
				'Il grafico dello storico è disponibile dopo la prima ora; per curve su più mesi mantenete il recorder predefinito (10 giorni) o configurate le statistiche a lungo termine.',
				'Automazione tipica: se l’umidità resta sopra il 65 % per 10 minuti, accendere una presa del deumidificatore; se la temperatura scende sotto 16 °C, inviare una notifica.',
			],
			troubleshooting: [
				{ problem: 'Il valore è «Non disponibile» o NaN', solution: 'Verificate DATA su GPIO10, l’alimentazione a 3,3 V e il pull-up (4,7–10 kΩ su un DHT22 nudo). Provate un altro GPIO libero e aumentate update_interval.' },
				{ problem: 'La scheda non si collega al Wi-Fi', solution: 'L’ESP32 usa solo i 2,4 GHz. Tenete un SSID a 2,4 GHz sul router, evitate caratteri speciali nella password o provate l’hotspot di emergenza.' },
				{ problem: 'Temperatura più alta della stanza', solution: 'Allontanate il sensore da scheda e USB o usate un filo più lungo. «offset» corregge un errore costante, non un autoriscaldamento variabile.' },
				{ problem: 'Errore di compilazione per la scheda', solution: 'Aggiornate ESPHome: il supporto all’ESP32-C6 è recente e richiede il framework ESP-IDF (già indicato nello YAML).' },
			],
			faq: [
				{ question: 'DHT22 o BME280: quale scegliere?', answer: 'Il DHT22 è il più semplice (3 fili) per cominciare. Il BME280 è più preciso e misura anche la pressione, ma usa il bus I²C e richiede l’indirizzo 0x76 o 0x77. La guida completa tratta entrambi.' },
				{ question: 'Posso alimentarlo a batteria?', answer: 'Un ESP32 con Wi-Fi sempre attivo scarica una batteria in pochi giorni. Servono il deep sleep di ESPHome e una scheda a basso consumo, oppure un sensore Zigbee.' },
				{ question: 'Quanti sensori su una sola scheda?', answer: 'Quanti GPIO liberi avete: ogni DHT22 ne occupa uno. I sensori I²C (BME280, BH1750…) condividono due fili.' },
			],
		},
		es: {
			title: `Sensor temperatura humedad ESP32 ESPHome`,
			description:
				
				
				`Conecta un DHT22 a ESP32-C6 con ESPHome: cableado, YAML, Home Assistant y solución de problemas. Principiantes, 1–2 h. Material, esquema GPIO, YAML ESPHome`,
			h1: 'Sensor de temperatura y humedad',
			objective:
				'Vas a construir un pequeño sensor que mide la temperatura y la humedad de una habitación y envía ambas a Home Assistant cada 30 segundos, el software libre que reúne todos tus dispositivos conectados en una sola pantalla. El cerebro del montaje es un ESP32, una pequeña placa electrónica con Wi-Fi integrado, programada con ESPHome, una herramienta que prepara el programa de la placa a partir de un sencillo archivo de ajustes. No necesitas pasarela Zigbee ni suscripción: al final, dos nuevas mediciones, Temperature y Humidity, aparecen en tu panel, guardan su historial y pueden activar automatizaciones.',
			usefulness:
				'Este sensor te permite vigilar la habitación de un bebé, un sótano, un invernadero o una estancia propensa al moho. También puedes encender un deshumidificador cuando el aire se humedece demasiado, o comparar la temperatura real con la que cree medir el termostato. Además es el mejor primer proyecto con un ESP32: solo hay un componente que conectar, con tres cables, y cada paso se comprueba en unos segundos.',
			prerequisites: [
				'Un Home Assistant en marcha con el complemento ESPHome (consulta el tutorial de instalación).',
				'Una red Wi-Fi de 2,4 GHz que llegue a la habitación.',
				'Un ordenador con Chrome o Edge para el primer flasheo por USB.',
			],
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Placa de desarrollo (véase el recuadro de arriba). La XIAO ESP32C6 también sirve adaptando los pines.', productId: 'esp32-c6-devkitc' },
				{ name: 'Módulo DHT22 (AM2302) de 3 pines', qty: 1, note: 'Precisión declarada por el fabricante: unos ±0,5 °C y ±2–5 % de humedad. La versión «módulo» incluye la resistencia pull-up.', q: true },
				{ name: 'Módulo BME280 I²C (alternativa)', qty: '0–1', note: 'Más preciso y mide también la presión; el cableado I²C está en la guía completa.' },
			],
			smallMaterials: [{ name: 'Resistencia de 4,7 a 10 kΩ', qty: '0–1', note: 'Solo si tu DHT22 es un componente suelto de 4 patillas (entre DATA y 3,3 V).' }],
			steps: [
				{
					title: 'Cablear el DHT22 en la breadboard',
					actions: [
						'Desconecta el cable USB para trabajar sin corriente: un cable mal puesto en una placa alimentada puede dañarla. Después localiza los tres pines del módulo DHT22, el sensor propiamente dicho: VCC (o +) recibe la alimentación, DATA (u OUT) transporta las lecturas y GND (o −) es la masa, el camino de retorno de la corriente. Estos nombres suelen estar impresos en el circuito.',
						'Con tres cables Dupont (cables flexibles cuyos extremos se enchufan sin soldar) une VCC al pin 3V3 de la placa, DATA a GPIO10 y GND a un pin GND. GPIO significa «General Purpose Input Output»: son los pines metálicos alineados en el borde de la placa, y el número que sigue a GPIO distingue a cada uno.',
						'Coloca el sensor a unos centímetros de la placa, lejos del puerto USB, que se calienta.',
					],
					observe: 'El módulo no tiene un LED obligatorio; revisa a simple vista, cable por cable, antes de dar corriente.',
					check: 'El cable rojo (3,3 V) no está en el pin 5V y DATA está en GPIO10 como en el esquema.',
				},
				{
					title: 'Comprobar las lecturas y corregir la desviación',
					actions: [
						'Abre la pestaña «Logs» de ESPHome para ver en directo lo que cuenta la placa: cada 30 segundos debe aparecer una línea «Got Temperature=… Humidity=…», señal de que el sensor responde.',
						'Deja un termómetro de referencia junto al sensor durante 30 minutos y anota la diferencia.',
						'Introduce la diferencia en el filtro «offset» del YAML (por ejemplo -0.8) y pulsa «Install» > «Wirelessly».',
					],
					observe: 'La temperatura se estabiliza sin derivas rápidas; la humedad sube si soplas con suavidad cerca del sensor.',
					check: 'Tras la corrección, la diferencia con el termómetro de referencia es inferior a 1 °C.',
				},
			],
			haIntegration: [
				'Las entidades «Temperature» y «Humidity» aparecen en Ajustes → Dispositivos y servicios → ESPHome → tu dispositivo. Pulsa «Añadir al panel» para crear la tarjeta.',
				'El gráfico de historial está disponible tras la primera hora; para curvas de varios meses mantén el recorder por defecto (10 días) o configura estadísticas a largo plazo.',
				'Automatización típica: si la humedad supera el 65 % durante 10 minutos, encender un enchufe con deshumidificador; si la temperatura baja de 16 °C, enviar una notificación.',
			],
			troubleshooting: [
				{ problem: 'El valor es «No disponible» o NaN', solution: 'Revisa DATA en GPIO10, la alimentación de 3,3 V y la resistencia pull-up (4,7–10 kΩ en un DHT22 suelto). Prueba otro GPIO libre y aumenta update_interval.' },
				{ problem: 'La placa no se conecta al Wi-Fi', solution: 'El ESP32 solo usa 2,4 GHz. Mantén un SSID de 2,4 GHz en el router, evita caracteres especiales en la contraseña o prueba el punto de acceso de emergencia.' },
				{ problem: 'La temperatura sale más alta que la de la habitación', solution: 'Aleja el sensor de la placa y del USB o usa un cable más largo. «offset» corrige un error constante, no un calentamiento variable.' },
				{ problem: 'Error de compilación para la placa', solution: 'Actualiza ESPHome: el soporte del ESP32-C6 es reciente y exige el framework ESP-IDF (ya indicado en el YAML).' },
			],
			faq: [
				{ question: '¿DHT22 o BME280?', answer: 'El DHT22 es el más sencillo (3 cables) para empezar. El BME280 es más preciso y mide también la presión, pero usa el bus I²C y necesita la dirección 0x76 o 0x77. La guía completa trata los dos.' },
				{ question: '¿Puedo alimentarlo con pila?', answer: 'Un ESP32 con Wi-Fi permanente vacía una pila en pocos días. Para pila se necesita el deep sleep de ESPHome y una placa de bajo consumo, o elegir un sensor Zigbee.' },
				{ question: '¿Cuántos sensores caben en una placa?', answer: 'Tantos como GPIO libres: cada DHT22 ocupa uno. Los sensores I²C (BME280, BH1750…) comparten dos cables.' },
			],
		},
	},
};
