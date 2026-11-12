import { esphomeHeader } from '../shared.mjs';

const yaml =
	esphomeHeader('station-meteo', 'Weather station') +
	`
i2c:
  sda: GPIO6                     # I2C bus shared by both sensors
  scl: GPIO7
  scan: true                     # lists detected addresses in the log
  frequency: 100kHz

sensor:
  - platform: bme280_i2c
    address: 0x76                # 0x77 if the SDO pin is tied to 3.3 V
    update_interval: 60s
    temperature:
      name: "Temperature"
      oversampling: 16x
    pressure:
      name: "Pressure"
    humidity:
      name: "Humidity"

  - platform: bh1750
    name: "Illuminance"
    address: 0x23                # 0x5C if the ADDR pin is tied to 3.3 V
    update_interval: 60s

  - platform: wifi_signal
    name: "WiFi signal"
    update_interval: 120s
    entity_category: diagnostic
`;

export const project = {
	id: 'weather-station',
	level: 'intermediate',
	durationHours: '2–3',
	budgetRange: {
		fr: 'environ 20–40 € selon vendeur',
		en: 'about €20–40 depending on the seller',
		de: 'ca. 20–40 € je nach Händler',
		it: 'circa 20–40 € a seconda del venditore',
		es: 'unos 20–40 € según el vendedor',
	},
	slugs: {
		fr: 'station-meteo-bme280-bh1750',
		en: 'weather-station-bme280-bh1750',
		de: 'wetterstation-bme280-bh1750',
		it: 'stazione-meteo-bme280-bh1750',
		es: 'estacion-meteo-bme280-bh1750',
	},
	fullGuide: null,
	productIds: ['esp32-c6-devkitc'],
	searchQueries: {
		fr: 'BME280 module I2C pression température humidité',
		en: 'BME280 I2C module pressure temperature humidity',
		de: 'BME280 Modul I2C Luftdruck Temperatur Luftfeuchtigkeit',
		it: 'BME280 modulo I2C pressione temperatura umidità',
		es: 'BME280 módulo I2C presión temperatura humedad',
	},
	smallMaterialIds: ['usb', 'psu', 'dupont', 'breadboard', 'solder', 'heatshrink', 'enclosure'],
	flashAfter: 1,
	wiring: {
		sensorName: { fr: 'BME280 + BH1750', en: 'BME280 + BH1750', de: 'BME280 + BH1750', it: 'BME280 + BH1750', es: 'BME280 + BH1750' },
		pins: [
			{ gpio: '3V3', signal: 'VIN', color: 'power', device: { fr: 'BME280', en: 'BME280', de: 'BME280', it: 'BME280', es: 'BME280' } },
			{ gpio: 'GND', signal: 'GND', color: 'ground', device: { fr: 'BME280', en: 'BME280', de: 'BME280', it: 'BME280', es: 'BME280' } },
			{ gpio: 'GPIO6', signal: 'SDA', color: 'data', device: { fr: 'BME280', en: 'BME280', de: 'BME280', it: 'BME280', es: 'BME280' } },
			{ gpio: 'GPIO7', signal: 'SCL', color: 'data', device: { fr: 'BME280', en: 'BME280', de: 'BME280', it: 'BME280', es: 'BME280' } },
			{ gpio: '3V3', signal: 'VCC', color: 'power', device: { fr: 'BH1750', en: 'BH1750', de: 'BH1750', it: 'BH1750', es: 'BH1750' } },
			{ gpio: 'GND', signal: 'GND', color: 'ground', device: { fr: 'BH1750', en: 'BH1750', de: 'BH1750', it: 'BH1750', es: 'BH1750' } },
			{ gpio: 'GPIO6', signal: 'SDA', color: 'data', device: { fr: 'BH1750', en: 'BH1750', de: 'BH1750', it: 'BH1750', es: 'BH1750' } },
			{ gpio: 'GPIO7', signal: 'SCL', color: 'data', device: { fr: 'BH1750', en: 'BH1750', de: 'BH1750', it: 'BH1750', es: 'BH1750' } },
		],
		principleBoxes: {
			fr: [
				{ title: `BME280 + BH1750`, s: 'BME280 + BH1750', a: 'BME280 : température, humidité, pression', b: 'BH1750 : luminosité' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Lit les deux capteurs toutes les 60 s', via: 'Bus I²C : GPIO6 (SDA), GPIO7 (SCL)' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: '4 entités : °C, %, hPa, lx', b: 'Historique et automatisations', via: 'Wi-Fi 2,4 GHz + API chiffrée' },
			],
			en: [
				{ title: `BME280 + BH1750`, s: 'BME280 + BH1750', a: 'BME280: temperature, humidity, pressure', b: 'BH1750: light level' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Reads both sensors every 60 s', via: 'I²C bus: GPIO6 (SDA), GPIO7 (SCL)' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: '4 entities: °C, %, hPa, lx', b: 'History and automations', via: '2.4 GHz Wi-Fi + encrypted API' },
			],
			de: [
				{ title: `BME280 + BH1750`, s: 'BME280 + BH1750', a: 'BME280: Temperatur, Feuchte, Luftdruck', b: 'BH1750: Helligkeit' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Liest beide Sensoren alle 60 s', via: 'I²C-Bus: GPIO6 (SDA), GPIO7 (SCL)' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: '4 Entitäten: °C, %, hPa, lx', b: 'Verlauf und Automatisierungen', via: '2,4-GHz-WLAN + verschlüsselte API' },
			],
			it: [
				{ title: `BME280 + BH1750`, s: 'BME280 + BH1750', a: 'BME280: temperatura, umidità, pressione', b: 'BH1750: luminosità' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Legge i due sensori ogni 60 s', via: 'Bus I²C: GPIO6 (SDA), GPIO7 (SCL)' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: '4 entità: °C, %, hPa, lx', b: 'Storico e automazioni', via: 'Wi-Fi 2,4 GHz + API cifrata' },
			],
			es: [
				{ title: `BME280 + BH1750`, s: 'BME280 + BH1750', a: 'BME280: temperatura, humedad, presión', b: 'BH1750: luminosidad' },
				{ title: 'ESP32-C6 + ESPHome', s: 'ESP32-C6', a: 'Lee los dos sensores cada 60 s', via: 'Bus I²C: GPIO6 (SDA), GPIO7 (SCL)' },
				{ title: 'Home Assistant', s: 'Home Assistant', tone: 'ha', a: '4 entidades: °C, %, hPa, lx', b: 'Historial y automatizaciones', via: 'Wi-Fi 2,4 GHz + API cifrada' },
			],
		},
	},
	yaml,
	locales: {
		fr: {
			title: `Station météo BME280 ESP32 ESPHome`,
			description:
				
				
				`Température, humidité, pression et lumière : BME280 + BH1750 sur ESP32-C6 avec ESPHome et Home Assistant. Matériel, schéma GPIO, YAML ESPHome et Home Assis`,
			h1: 'Station météo BME280 + BH1750',
			objective:
				'Vous allez mesurer la température, l’humidité, la pression atmosphérique et la luminosité avec deux petits capteurs, un BME280 et un BH1750, et envoyer le tout à Home Assistant, le logiciel qui réunit vos appareils connectés. Les deux capteurs se partagent les mêmes deux fils, ce qu’on appelle un « bus I²C », sur un ESP32, une petite carte électronique équipée du Wi-Fi. Le montage fonctionne à l’intérieur et, une fois abrité de la pluie et du soleil, à l’extérieur.',
			usefulness:
				'La pression atmosphérique annonce les changements de temps, la luminosité peut commander les volets et l’éclairage, et la température extérieure alimente le chauffage et l’arrosage. Un seul ESP32 remplace ainsi plusieurs capteurs du commerce, et toutes les mesures arrivent au même endroit.',
			prerequisites: [
				'Home Assistant avec ESPHome et un Wi-Fi qui atteint l’endroit de pose.',
				'Un module BME280 (3,3 V, I²C) et un module BH1750 (« GY-302 »). Attention aux BMP280 vendus sous le même aspect : ils ne mesurent pas l’humidité.',
				'Pour l’extérieur : une alimentation USB protégée de la pluie et un abri ventilé de type écran de Stevenson.',
			],
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Carte de commande (voir l’encadré plus haut).', productId: 'esp32-c6-devkitc' },
				{ name: 'Module BME280 I²C (adresse 0x76 ou 0x77)', qty: 1, note: 'Température, humidité et pression. Vérifiez qu’il s’agit bien d’un BME280 et pas d’un BMP280.', q: true },
				{ name: 'Module BH1750 (GY-302)', qty: 1, note: 'Mesure la lumière de 1 à 65 535 lx, ce qui sature en plein soleil direct : prévoir un diffuseur à l’extérieur.', q: true },
				{ name: 'Abri anti-rayonnement (écran de Stevenson imprimé ou du commerce)', qty: '0–1', note: 'Indispensable à l’extérieur : sans abri, le soleil fausse la température de plusieurs degrés.' },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Câbler les deux capteurs sur le bus I²C',
					actions: [
						'Alimentation USB débranchée, reliez la broche 3V3 de la carte à la broche VIN du BME280 et à la broche VCC du BH1750, puis une broche GND de la carte aux broches GND des deux capteurs : le 3V3 est l’alimentation en 3,3 volts et le GND la masse.',
						'Reliez SDA des deux modules à GPIO6 et SCL des deux modules à GPIO7 : SDA transporte les données et SCL le rythme (l’horloge) de l’échange, deux fils partagés par les deux capteurs, que la carte distingue grâce à leur adresse. GPIO désigne les broches métalliques alignées sur le bord de la carte.',
						'Laissez la broche ADDR du BH1750 non connectée (adresse 0x23) et SDO du BME280 à GND ou libre selon votre module (adresse 0x76).',
					],
					observe: 'Aucun composant ne chauffe ; les modules sont alimentés en 3,3 V.',
					check: 'Chaque fil est sur la bonne broche : SDA sur SDA et SCL sur SCL, jamais croisés.',
				},
				{
					title: 'Vérifier la détection des adresses',
					actions: [
						'Installez sur la carte le YAML, le fichier de configuration de cette page : l’option « scan: true » liste dans le journal les adresses I²C trouvées, c’est-à-dire la « plaque d’immatriculation » de chaque capteur sur le bus.',
						'Ouvrez les journaux du périphérique dans ESPHome.',
						'Cherchez les lignes « Found i2c device at address 0x23 » et « 0x76 » (ou 0x77).',
					],
					observe: 'Les deux adresses apparaissent dans le journal.',
					check: 'Si 0x77 apparaît à la place de 0x76, corrigez « address » dans le YAML.',
				},
				{
					title: 'Contrôler les mesures dans Home Assistant',
					actions: [
						'Dans Home Assistant, ouvrez l’appareil ESPHome : quatre mesures y ont été créées, « Temperature », « Humidity », « Pressure » et « Illuminance » (la luminosité).',
						'Comparez la température avec un thermomètre fiable dans la même pièce.',
						'Masquez le BH1750 avec la main : la valeur chute.',
					],
					observe: 'Les valeurs sont plausibles : pression autour de 1 000 hPa, humidité entre 20 et 80 % en intérieur.',
					check: 'L’écart de température reste inférieur à environ 1 °C ; sinon éloignez le capteur de la carte qui chauffe.',
				},
				{
					title: 'Installer à l’extérieur (optionnel)',
					actions: [
						'Placez le BME280 dans l’abri ventilé, à l’ombre et loin d’un mur exposé au soleil, à environ 1,5 m du sol : à cette hauteur et à l’abri du soleil direct, la mesure reflète la vraie température de l’air et non celle d’un mur chaud.',
						'Mettez le BH1750 à l’air libre sous un diffuseur translucide, le capteur vers le haut.',
						'Protégez la carte et l’alimentation dans un boîtier étanche ; laissez sortir uniquement les fils de capteurs.',
					],
					observe: 'La température extérieure suit celle d’une station de référence proche, avec un léger écart.',
					check: 'Contrôlez la condensation dans le boîtier après une nuit froide.',
				},
			],
			haIntegration: [
				'Les quatre entités se présentent comme un appareil unique ; Home Assistant conserve leur historique et les trace sur le tableau de bord (carte historique ou jauge).',
				'La pression mesurée est absolue, à votre altitude. Pour la comparer à une prévision, convertissez-la au niveau de la mer (environ 12 hPa de plus pour 100 m d’altitude près du niveau de la mer).',
				'Automatisations utiles : fermer les volets quand la luminosité dépasse un seuil, ou démarrer la ventilation lorsque l’humidité intérieure dépasse 65 %.',
			],
			troubleshooting: [
				{ problem: 'Aucune adresse détectée dans le journal', solution: 'SDA et SCL sont inversés, un module n’est pas alimenté ou une soudure de broche est mauvaise. Vérifiez les fils un à un.' },
				{ problem: 'Humidité à 0 % ou absente', solution: 'Vous avez probablement un BMP280 (pas d’humidité). Vérifiez la référence imprimée sur la puce ; il faut un BME280.' },
				{ problem: 'Température trop haute de plusieurs degrés', solution: 'Le capteur est trop près de la carte ou en plein soleil. Éloignez-le avec un fil plus long et protégez-le avec un abri.' },
				{ problem: 'Luminosité bloquée à 65 535', solution: 'Le BH1750 est saturé en plein soleil. Ajoutez un diffuseur translucide devant le capteur.' },
			],
			faq: [
				{ question: 'Puis-je brancher plus de capteurs sur le même bus ?', answer: 'Oui, tant que les adresses sont différentes ; le bus I²C peut accueillir plusieurs modules avec les mêmes deux fils.' },
				{ question: 'Faut-il un BME280 ou un BMP280 ?', answer: 'Un BME280 si vous voulez l’humidité ; le BMP280 mesure seulement température et pression.' },
				{ question: 'Les capteurs sont-ils précis ?', answer: 'Les valeurs sont suffisantes pour la domotique ; pour une valeur de référence, comparez à un instrument étalonné, car la précision dépend du module et de son échauffement.' },
			],
		},
		en: {
			title: `BME280 weather station ESP32 ESPHome`,
			description:
				
				
				`Temperature, humidity, pressure and light: BME280 + BH1750 on ESP32-C6 with ESPHome and Home Assistant. Parts list, GPIO wiring, ESPHome YAML and Home Assi`,
			h1: 'BME280 + BH1750 weather station',
			objective:
				'You will measure temperature, humidity, atmospheric pressure and light level with two small sensors, a BME280 and a BH1750, and send everything to Home Assistant, the software that gathers your connected devices. Both sensors share the same two wires, what is called an “I²C bus”, on an ESP32, a small electronic board with Wi-Fi. The build works indoors and, once sheltered from rain and sun, outdoors.',
			usefulness:
				'Atmospheric pressure announces changes in the weather, light level can drive shutters and lighting, and the outdoor temperature feeds heating and watering. One ESP32 therefore replaces several off-the-shelf sensors, and every reading arrives in the same place.',
			prerequisites: [
				'Home Assistant with ESPHome and Wi-Fi reaching the install spot.',
				'A BME280 module (3.3 V, I²C) and a BH1750 module (“GY-302”). Beware of BMP280 boards that look the same: they do not measure humidity.',
				'Outdoors: a rain-protected USB supply and a vented shelter such as a Stevenson screen.',
			],
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Control board (see the box above).', productId: 'esp32-c6-devkitc' },
				{ name: 'BME280 I²C module (address 0x76 or 0x77)', qty: 1, note: 'Temperature, humidity and pressure. Check it is a BME280, not a BMP280.', q: true },
				{ name: 'BH1750 module (GY-302)', qty: 1, note: 'Measures light from 1 to 65,535 lx, which saturates in direct sun: use a diffuser outdoors.', q: true },
				{ name: 'Radiation shield (printed or commercial Stevenson screen)', qty: '0–1', note: 'Essential outdoors: without a shelter, the sun skews temperature by several degrees.' },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Wire both sensors on the I²C bus',
					actions: [
						'With the USB power unplugged, connect the board’s 3V3 pin to the BME280’s VIN pin and the BH1750’s VCC pin, then a GND pin of the board to the GND pins of both sensors: 3V3 is the 3.3-volt power supply and GND is the ground.',
						'Connect SDA of both modules to GPIO6 and SCL of both modules to GPIO7: SDA carries the data and SCL the rhythm (the clock) of the exchange, two wires shared by both sensors, which the board tells apart by their address. GPIO refers to the metal pins lined up along the edge of the board.',
						'Leave the BH1750 ADDR pin unconnected (address 0x23) and the BME280 SDO pin at GND or free depending on your module (address 0x76).',
					],
					observe: 'Nothing gets hot; the modules run on 3.3 V.',
					check: 'Every wire is on the right pin: SDA to SDA and SCL to SCL, never crossed.',
				},
				{
					title: 'Check that both addresses are detected',
					actions: [
						'Install the YAML, the configuration file from this page, on the board: the “scan: true” option lists the I²C addresses found in the log, that is the “number plate” of each sensor on the bus.',
						'Open the device logs in ESPHome.',
						'Look for the lines “Found i2c device at address 0x23” and “0x76” (or 0x77).',
					],
					observe: 'Both addresses appear in the log.',
					check: 'If 0x77 appears instead of 0x76, fix “address” in the YAML.',
				},
				{
					title: 'Check the readings in Home Assistant',
					actions: [
						'In Home Assistant, open the ESPHome device: four readings have been created there, “Temperature”, “Humidity”, “Pressure” and “Illuminance” (the light level).',
						'Compare the temperature with a reliable thermometer in the same room.',
						'Cover the BH1750 with your hand: the value drops.',
					],
					observe: 'Values are plausible: pressure around 1,000 hPa, indoor humidity between 20 and 80 %.',
					check: 'The temperature gap stays under about 1 °C; otherwise move the sensor away from the warm board.',
				},
				{
					title: 'Install outdoors (optional)',
					actions: [
						'Place the BME280 in the ventilated shelter, in the shade and away from a wall exposed to the sun, about 1.5 m above the ground: at that height and out of direct sun, the reading reflects the real air temperature rather than that of a hot wall.',
						'Put the BH1750 in open air under a translucent diffuser, sensor facing up.',
						'Protect the board and supply in a waterproof enclosure; let only the sensor wires leave it.',
					],
					observe: 'Outdoor temperature follows a nearby reference station with a small offset.',
					check: 'Check for condensation inside the enclosure after a cold night.',
				},
			],
			haIntegration: [
				'The four entities appear as one device; Home Assistant keeps their history and plots them on the dashboard (history card or gauge).',
				'Measured pressure is absolute, at your altitude. To compare with a forecast, convert it to sea level (roughly 12 hPa more per 100 m of altitude near sea level).',
				'Useful automations: close blinds when light passes a threshold, or start ventilation when indoor humidity exceeds 65 %.',
			],
			troubleshooting: [
				{ problem: 'No address detected in the log', solution: 'SDA and SCL are swapped, a module is not powered or a pin solder joint is bad. Check the wires one by one.' },
				{ problem: 'Humidity at 0 % or missing', solution: 'You probably have a BMP280 (no humidity). Check the reference printed on the chip; you need a BME280.' },
				{ problem: 'Temperature several degrees too high', solution: 'The sensor is too close to the board or in direct sun. Move it away with a longer wire and shelter it.' },
				{ problem: 'Light stuck at 65,535', solution: 'The BH1750 is saturated in direct sun. Add a translucent diffuser in front of the sensor.' },
			],
			faq: [
				{ question: 'Can I add more sensors on the same bus?', answer: 'Yes, as long as addresses differ; the I²C bus can host several modules on the same two wires.' },
				{ question: 'Do I need a BME280 or a BMP280?', answer: 'A BME280 if you want humidity; the BMP280 only measures temperature and pressure.' },
				{ question: 'Are the sensors accurate?', answer: 'Values are good enough for home automation; for a reference value compare with a calibrated instrument, as accuracy depends on the module and its self-heating.' },
			],
		},
		de: {
			title: `Wetterstation BME280 ESP32 ESPHome`,
			description:
				
				
				`Temperatur, Feuchte, Druck und Licht: BME280 + BH1750 an ESP32-C6 mit ESPHome und Home Assistant. Material, GPIO-Plan, ESPHome-YAML und Home Assistant.`,
			h1: 'Wetterstation BME280 + BH1750',
			objective:
				'Sie messen Temperatur, Luftfeuchte, Luftdruck und Helligkeit mit zwei kleinen Sensoren, einem BME280 und einem BH1750, und senden alles an Home Assistant, die Software, die Ihre vernetzten Geräte vereint. Beide Sensoren teilen sich dieselben zwei Leitungen, einen sogenannten „I²C-Bus“, an einem ESP32, einer kleinen Elektronikplatine mit WLAN. Der Aufbau funktioniert drinnen und, sobald er vor Regen und Sonne geschützt ist, auch draußen.',
			usefulness:
				'Der Luftdruck kündigt Wetterwechsel an, die Helligkeit kann Rollläden und Beleuchtung steuern, und die Außentemperatur speist Heizung und Bewässerung. Ein einziger ESP32 ersetzt so mehrere fertige Sensoren, und alle Messwerte laufen an einer Stelle zusammen.',
			prerequisites: [
				'Home Assistant mit ESPHome und WLAN, das den Einbauort erreicht.',
				'Ein BME280-Modul (3,3 V, I²C) und ein BH1750-Modul („GY-302“). Vorsicht bei BMP280-Platinen, die gleich aussehen: Sie messen keine Feuchte.',
				'Im Außenbereich: ein regengeschütztes USB-Netzteil und ein belüfteter Schutz wie eine Wetterhütte.',
			],
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Steuerplatine (siehe Kasten oben).', productId: 'esp32-c6-devkitc' },
				{ name: 'BME280-I²C-Modul (Adresse 0x76 oder 0x77)', qty: 1, note: 'Temperatur, Feuchte und Luftdruck. Prüfen, dass es ein BME280 und kein BMP280 ist.', q: true },
				{ name: 'BH1750-Modul (GY-302)', qty: 1, note: 'Misst Licht von 1 bis 65.535 lx, was in direkter Sonne sättigt: draußen einen Diffusor verwenden.', q: true },
				{ name: 'Strahlungsschutz (gedruckte oder handelsübliche Wetterhütte)', qty: '0–1', note: 'Draußen unverzichtbar: Ohne Schutz verfälscht die Sonne die Temperatur um mehrere Grad.' },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Beide Sensoren am I²C-Bus verdrahten',
					actions: [
						'Verbinden Sie bei abgezogener USB-Stromversorgung den Pin 3V3 der Platine mit dem Pin VIN des BME280 und dem Pin VCC des BH1750, dann einen GND-Pin der Platine mit den GND-Pins beider Sensoren: 3V3 ist die 3,3-Volt-Stromversorgung, GND die Masse.',
						'Verbinden Sie SDA beider Module mit GPIO6 und SCL beider Module mit GPIO7: SDA überträgt die Daten, SCL den Takt des Austauschs, zwei Leitungen, die sich beide Sensoren teilen und die die Platine an ihrer Adresse unterscheidet. GPIO nennt man die metallenen Pins am Rand der Platine.',
						'Den ADDR-Pin des BH1750 offen lassen (Adresse 0x23) und SDO des BME280 je nach Modul an GND oder offen (Adresse 0x76).',
					],
					observe: 'Nichts wird heiß; die Module laufen mit 3,3 V.',
					check: 'Jede Leitung sitzt am richtigen Pin: SDA an SDA, SCL an SCL, nie vertauscht.',
				},
				{
					title: 'Prüfen, ob beide Adressen erkannt werden',
					actions: [
						'Installieren Sie das YAML, die Konfigurationsdatei dieser Seite, auf der Platine: Die Option „scan: true“ listet im Protokoll die gefundenen I²C-Adressen auf, gewissermaßen das „Kennzeichen“ jedes Sensors am Bus.',
						'In ESPHome die Logs des Geräts öffnen.',
						'Nach den Zeilen „Found i2c device at address 0x23“ und „0x76“ (oder 0x77) suchen.',
					],
					observe: 'Beide Adressen erscheinen im Log.',
					check: 'Erscheint 0x77 statt 0x76, „address“ im YAML korrigieren.',
				},
				{
					title: 'Messwerte in Home Assistant prüfen',
					actions: [
						'Öffnen Sie in Home Assistant das ESPHome-Gerät: Dort wurden vier Messwerte angelegt, „Temperature“, „Humidity“, „Pressure“ und „Illuminance“ (die Helligkeit).',
						'Die Temperatur mit einem zuverlässigen Thermometer im selben Raum vergleichen.',
						'Den BH1750 mit der Hand abdecken: Der Wert fällt.',
					],
					observe: 'Die Werte sind plausibel: Luftdruck um 1.000 hPa, Raumfeuchte zwischen 20 und 80 %.',
					check: 'Die Temperaturabweichung bleibt unter etwa 1 °C; sonst den Sensor von der warmen Platine entfernen.',
				},
				{
					title: 'Im Außenbereich installieren (optional)',
					actions: [
						'Setzen Sie den BME280 in den belüfteten Wetterschutz, im Schatten und abseits einer sonnenbeschienenen Wand, etwa 1,5 m über dem Boden: In dieser Höhe und ohne direkte Sonne gibt die Messung die echte Lufttemperatur wieder und nicht die einer heißen Wand.',
						'Den BH1750 im Freien unter einen lichtdurchlässigen Diffusor legen, Sensor nach oben.',
						'Platine und Netzteil in einem wasserdichten Gehäuse schützen; nur die Sensorleitungen herausführen.',
					],
					observe: 'Die Außentemperatur folgt einer nahen Referenzstation mit kleinem Versatz.',
					check: 'Nach einer kalten Nacht das Gehäuse auf Kondenswasser prüfen.',
				},
			],
			haIntegration: [
				'Die vier Entitäten erscheinen als ein Gerät; Home Assistant speichert ihren Verlauf und zeichnet sie im Dashboard (Verlaufskarte oder Messanzeige).',
				'Der gemessene Luftdruck ist absolut, auf Ihrer Höhe. Für den Vergleich mit einer Vorhersage auf Meereshöhe umrechnen (nahe Meereshöhe etwa 12 hPa mehr pro 100 m Höhe).',
				'Nützliche Automatisierungen: Jalousien schließen, wenn die Helligkeit einen Schwellwert überschreitet, oder die Lüftung starten, wenn die Raumfeuchte über 65 % liegt.',
			],
			troubleshooting: [
				{ problem: 'Keine Adresse im Log erkannt', solution: 'SDA und SCL sind vertauscht, ein Modul hat keinen Strom oder eine Pin-Lötstelle ist schlecht. Die Leitungen einzeln prüfen.' },
				{ problem: 'Feuchte bei 0 % oder fehlt', solution: 'Vermutlich ein BMP280 (keine Feuchte). Die aufgedruckte Bezeichnung auf dem Chip prüfen; benötigt wird ein BME280.' },
				{ problem: 'Temperatur mehrere Grad zu hoch', solution: 'Der Sensor sitzt zu nah an der Platine oder in direkter Sonne. Mit längerer Leitung entfernen und beschatten.' },
				{ problem: 'Helligkeit hängt bei 65.535', solution: 'Der BH1750 ist in der Sonne gesättigt. Einen lichtdurchlässigen Diffusor davor setzen.' },
			],
			faq: [
				{ question: 'Kann ich weitere Sensoren am selben Bus betreiben?', answer: 'Ja, solange die Adressen verschieden sind; der I²C-Bus nimmt mehrere Module an denselben zwei Leitungen auf.' },
				{ question: 'BME280 oder BMP280?', answer: 'Ein BME280, wenn Sie die Feuchte brauchen; der BMP280 misst nur Temperatur und Luftdruck.' },
				{ question: 'Sind die Sensoren genau?', answer: 'Für die Hausautomation reichen die Werte; als Referenz mit einem kalibrierten Gerät vergleichen, denn die Genauigkeit hängt vom Modul und seiner Eigenerwärmung ab.' },
			],
		},
		it: {
			title: `Stazione meteo BME280 ESP32 ESPHome`,
			description:
				
				
				`Temperatura, umidità, pressione e luce: BME280 + BH1750 su ESP32-C6 con ESPHome e Home Assistant. Materiale, schema GPIO, YAML ESPHome e Home Assistant.`,
			h1: 'Stazione meteo BME280 + BH1750',
			objective:
				'Misurerete temperatura, umidità, pressione atmosferica e luminosità con due piccoli sensori, un BME280 e un BH1750, e invierete tutto a Home Assistant, il software che riunisce i vostri dispositivi connessi. I due sensori condividono gli stessi due fili, un cosiddetto «bus I²C», su un ESP32, una piccola scheda elettronica con Wi-Fi. Il montaggio funziona in casa e, una volta riparato da pioggia e sole, anche all’aperto.',
			usefulness:
				'La pressione atmosferica annuncia i cambi di tempo, la luminosità può comandare tapparelle e illuminazione, e la temperatura esterna alimenta riscaldamento e irrigazione. Un solo ESP32 sostituisce così diversi sensori già pronti, e tutte le misure arrivano nello stesso posto.',
			prerequisites: [
				'Home Assistant con ESPHome e un Wi-Fi che raggiunga il punto di posa.',
				'Un modulo BME280 (3,3 V, I²C) e un modulo BH1750 («GY-302»). Attenzione ai BMP280 venduti con lo stesso aspetto: non misurano l’umidità.',
				'All’esterno: un alimentatore USB protetto dalla pioggia e un riparo ventilato tipo schermo di Stevenson.',
			],
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Scheda di comando (vedi il riquadro sopra).', productId: 'esp32-c6-devkitc' },
				{ name: 'Modulo BME280 I²C (indirizzo 0x76 o 0x77)', qty: 1, note: 'Temperatura, umidità e pressione. Verificate che sia un BME280 e non un BMP280.', q: true },
				{ name: 'Modulo BH1750 (GY-302)', qty: 1, note: 'Misura la luce da 1 a 65.535 lx, quindi satura al sole diretto: all’esterno usate un diffusore.', q: true },
				{ name: 'Schermo anti-irraggiamento (schermo di Stevenson stampato o commerciale)', qty: '0–1', note: 'Indispensabile all’esterno: senza riparo il sole falsa la temperatura di diversi gradi.' },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Cablare i due sensori sul bus I²C',
					actions: [
						'Con l’alimentazione USB scollegata, collegate il pin 3V3 della scheda al pin VIN del BME280 e al pin VCC del BH1750, poi un pin GND della scheda ai pin GND di entrambi i sensori: 3V3 è l’alimentazione a 3,3 volt, GND la massa.',
						'Collegate SDA di entrambi i moduli a GPIO6 e SCL di entrambi a GPIO7: SDA trasporta i dati e SCL il ritmo (il clock) dello scambio, due fili condivisi dai due sensori, che la scheda distingue dall’indirizzo. GPIO indica i pin metallici allineati sul bordo della scheda.',
						'Lasciate scollegato il pin ADDR del BH1750 (indirizzo 0x23) e SDO del BME280 a GND o libero secondo il modulo (indirizzo 0x76).',
					],
					observe: 'Nulla si scalda; i moduli lavorano a 3,3 V.',
					check: 'Ogni filo è sul pin giusto: SDA su SDA e SCL su SCL, mai incrociati.',
				},
				{
					title: 'Verificare il rilevamento degli indirizzi',
					actions: [
						'Installate sulla scheda lo YAML, il file di configurazione di questa pagina: l’opzione «scan: true» elenca nel log gli indirizzi I²C trovati, cioè la «targa» di ciascun sensore sul bus.',
						'Aprite i log del dispositivo in ESPHome.',
						'Cercate le righe «Found i2c device at address 0x23» e «0x76» (o 0x77).',
					],
					observe: 'Entrambi gli indirizzi compaiono nel log.',
					check: 'Se compare 0x77 invece di 0x76, correggete «address» nello YAML.',
				},
				{
					title: 'Controllare le misure in Home Assistant',
					actions: [
						'In Home Assistant aprite il dispositivo ESPHome: vi sono state create quattro misure, «Temperature», «Humidity», «Pressure» e «Illuminance» (la luminosità).',
						'Confrontate la temperatura con un termometro affidabile nella stessa stanza.',
						'Coprite il BH1750 con la mano: il valore scende.',
					],
					observe: 'I valori sono plausibili: pressione intorno a 1.000 hPa, umidità interna tra 20 e 80 %.',
					check: 'Lo scarto di temperatura resta sotto circa 1 °C; altrimenti allontanate il sensore dalla scheda che scalda.',
				},
				{
					title: 'Installare all’esterno (opzionale)',
					actions: [
						'Mettete il BME280 nel riparo ventilato, all’ombra e lontano da un muro esposto al sole, a circa 1,5 m da terra: a quell’altezza e fuori dal sole diretto, la misura riflette la vera temperatura dell’aria e non quella di un muro caldo.',
						'Mettete il BH1750 all’aria aperta sotto un diffusore traslucido, sensore rivolto verso l’alto.',
						'Proteggete scheda e alimentatore in un contenitore stagno; fate uscire solo i fili dei sensori.',
					],
					observe: 'La temperatura esterna segue quella di una stazione di riferimento vicina, con un piccolo scarto.',
					check: 'Controllate la condensa nel contenitore dopo una notte fredda.',
				},
			],
			haIntegration: [
				'Le quattro entità appaiono come un unico dispositivo; Home Assistant ne conserva lo storico e le traccia sulla dashboard (scheda storico o indicatore).',
				'La pressione misurata è assoluta, alla vostra quota. Per confrontarla con una previsione convertitela al livello del mare (circa 12 hPa in più ogni 100 m di quota vicino al livello del mare).',
				'Automazioni utili: chiudere le tapparelle quando la luminosità supera una soglia, o avviare la ventilazione quando l’umidità interna supera il 65 %.',
			],
			troubleshooting: [
				{ problem: 'Nessun indirizzo rilevato nel log', solution: 'SDA e SCL sono invertiti, un modulo non è alimentato o una saldatura di un pin è difettosa. Controllate i fili uno a uno.' },
				{ problem: 'Umidità a 0 % o assente', solution: 'Probabilmente avete un BMP280 (senza umidità). Controllate la sigla stampata sul chip; serve un BME280.' },
				{ problem: 'Temperatura troppo alta di diversi gradi', solution: 'Il sensore è troppo vicino alla scheda o al sole diretto. Allontanatelo con un filo più lungo e riparatelo.' },
				{ problem: 'Luminosità bloccata a 65.535', solution: 'Il BH1750 è saturo al sole diretto. Aggiungete un diffusore traslucido davanti al sensore.' },
			],
			faq: [
				{ question: 'Posso aggiungere altri sensori sullo stesso bus?', answer: 'Sì, purché gli indirizzi siano diversi; il bus I²C ospita più moduli sugli stessi due fili.' },
				{ question: 'Serve un BME280 o un BMP280?', answer: 'Un BME280 se volete l’umidità; il BMP280 misura solo temperatura e pressione.' },
				{ question: 'I sensori sono precisi?', answer: 'Per la domotica i valori bastano; per un valore di riferimento confrontate con uno strumento tarato, perché la precisione dipende dal modulo e dal suo autoriscaldamento.' },
			],
		},
		es: {
			title: `Estación meteo BME280 ESP32 ESPHome`,
			description:
				
				
				`Temperatura, humedad, presión y luz: BME280 + BH1750 en ESP32-C6 con ESPHome y Home Assistant. Material, esquema GPIO, YAML ESPHome y Home Assistant.`,
			h1: 'Estación meteorológica BME280 + BH1750',
			objective:
				'Vas a medir la temperatura, la humedad, la presión atmosférica y la luminosidad con dos pequeños sensores, un BME280 y un BH1750, y enviarlo todo a Home Assistant, el software que reúne tus dispositivos conectados. Los dos sensores comparten los mismos dos cables, lo que se llama un «bus I²C», en un ESP32, una pequeña placa electrónica con Wi-Fi. El montaje funciona en interior y, una vez protegido de la lluvia y del sol, también en exterior.',
			usefulness:
				'La presión atmosférica anuncia los cambios de tiempo, la luminosidad puede gobernar persianas e iluminación, y la temperatura exterior alimenta la calefacción y el riego. Un solo ESP32 sustituye así a varios sensores comerciales, y todas las medidas llegan al mismo sitio.',
			prerequisites: [
				'Home Assistant con ESPHome y un Wi-Fi que llegue al lugar de colocación.',
				'Un módulo BME280 (3,3 V, I²C) y un módulo BH1750 («GY-302»). Cuidado con los BMP280 que se venden con el mismo aspecto: no miden la humedad.',
				'En exterior: una fuente USB protegida de la lluvia y un refugio ventilado tipo pantalla de Stevenson.',
			],
			materials: [
				{ name: 'ESP32-C6-DevKitC-1', qty: 1, note: 'Placa de control (véase el recuadro de arriba).', productId: 'esp32-c6-devkitc' },
				{ name: 'Módulo BME280 I²C (dirección 0x76 o 0x77)', qty: 1, note: 'Temperatura, humedad y presión. Comprueba que sea un BME280 y no un BMP280.', q: true },
				{ name: 'Módulo BH1750 (GY-302)', qty: 1, note: 'Mide luz de 1 a 65.535 lx, por lo que se satura a pleno sol: en exterior usa un difusor.', q: true },
				{ name: 'Protector contra radiación (pantalla de Stevenson impresa o comercial)', qty: '0–1', note: 'Imprescindible en exterior: sin refugio el sol falsea la temperatura varios grados.' },
			],
			smallMaterials: [],
			steps: [
				{
					title: 'Cablear los dos sensores en el bus I²C',
					actions: [
						'Con la alimentación USB desconectada, une el pin 3V3 de la placa al pin VIN del BME280 y al pin VCC del BH1750, y después un pin GND de la placa a los pines GND de ambos sensores: 3V3 es la alimentación de 3,3 voltios y GND la masa.',
						'Une SDA de ambos módulos a GPIO6 y SCL de ambos módulos a GPIO7: SDA transporta los datos y SCL el ritmo (el reloj) del intercambio, dos cables compartidos por los dos sensores, que la placa distingue por su dirección. GPIO designa los pines metálicos alineados en el borde de la placa.',
						'Deja sin conectar el pin ADDR del BH1750 (dirección 0x23) y SDO del BME280 a GND o libre según tu módulo (dirección 0x76).',
					],
					observe: 'Nada se calienta; los módulos funcionan a 3,3 V.',
					check: 'Cada cable está en el pin correcto: SDA con SDA y SCL con SCL, nunca cruzados.',
				},
				{
					title: 'Comprobar que se detectan las dos direcciones',
					actions: [
						'Instala en la placa el YAML, el archivo de configuración de esta página: la opción «scan: true» lista en el registro las direcciones I²C encontradas, es decir, la «matrícula» de cada sensor en el bus.',
						'Abre los logs del dispositivo en ESPHome.',
						'Busca las líneas «Found i2c device at address 0x23» y «0x76» (o 0x77).',
					],
					observe: 'Las dos direcciones aparecen en el log.',
					check: 'Si aparece 0x77 en lugar de 0x76, corrige «address» en el YAML.',
				},
				{
					title: 'Comprobar las medidas en Home Assistant',
					actions: [
						'En Home Assistant abre el dispositivo ESPHome: se han creado cuatro medidas, «Temperature», «Humidity», «Pressure» e «Illuminance» (la luminosidad).',
						'Compara la temperatura con un termómetro fiable en la misma habitación.',
						'Tapa el BH1750 con la mano: el valor baja.',
					],
					observe: 'Los valores son plausibles: presión en torno a 1.000 hPa, humedad interior entre 20 y 80 %.',
					check: 'La diferencia de temperatura queda por debajo de 1 °C aproximadamente; si no, aleja el sensor de la placa que se calienta.',
				},
				{
					title: 'Instalar en exterior (opcional)',
					actions: [
						'Coloca el BME280 en el abrigo ventilado, a la sombra y lejos de una pared expuesta al sol, a unos 1,5 m del suelo: a esa altura y sin sol directo, la medida refleja la temperatura real del aire y no la de una pared caliente.',
						'Pon el BH1750 al aire libre bajo un difusor translúcido, con el sensor hacia arriba.',
						'Protege la placa y la fuente en una caja estanca; deja salir solo los cables de los sensores.',
					],
					observe: 'La temperatura exterior sigue la de una estación de referencia cercana, con un pequeño desfase.',
					check: 'Revisa la condensación dentro de la caja tras una noche fría.',
				},
			],
			haIntegration: [
				'Las cuatro entidades aparecen como un único dispositivo; Home Assistant guarda su historial y las dibuja en el panel (tarjeta de historial o indicador).',
				'La presión medida es absoluta, a tu altitud. Para compararla con una previsión, conviértela al nivel del mar (aproximadamente 12 hPa más por cada 100 m de altitud cerca del nivel del mar).',
				'Automatizaciones útiles: cerrar persianas cuando la luminosidad supera un umbral, o arrancar la ventilación cuando la humedad interior pasa del 65 %.',
			],
			troubleshooting: [
				{ problem: 'No se detecta ninguna dirección en el log', solution: 'SDA y SCL están invertidos, un módulo no recibe alimentación o hay una mala soldadura en un pin. Revisa los cables uno a uno.' },
				{ problem: 'Humedad al 0 % o ausente', solution: 'Probablemente tienes un BMP280 (sin humedad). Comprueba la referencia impresa en el chip; necesitas un BME280.' },
				{ problem: 'Temperatura varios grados demasiado alta', solution: 'El sensor está muy cerca de la placa o a pleno sol. Aléjalo con un cable más largo y protégelo con un refugio.' },
				{ problem: 'Luminosidad bloqueada en 65.535', solution: 'El BH1750 está saturado a pleno sol. Añade un difusor translúcido delante del sensor.' },
			],
			faq: [
				{ question: '¿Puedo añadir más sensores al mismo bus?', answer: 'Sí, mientras las direcciones sean distintas; el bus I²C admite varios módulos en los mismos dos hilos.' },
				{ question: '¿Necesito un BME280 o un BMP280?', answer: 'Un BME280 si quieres la humedad; el BMP280 solo mide temperatura y presión.' },
				{ question: '¿Son precisos los sensores?', answer: 'Para domótica los valores bastan; para un valor de referencia compara con un instrumento calibrado, porque la precisión depende del módulo y de su autocalentamiento.' },
			],
		},
	},
};
