// 100 cas d'usage — généré par scripts/generate-100-domotique.mjs
export const USE_CASES = [
	{
			id: "garage-porte-smartphone",
			emoji: "🚗",
			title: "Ouvrir et fermer une porte de garage motorisée au smartphone",
			shortDesc: "Contact sec sur bornier poussoir + capteur reed d’état fermé/ouvert.",
			tutorialHref: "/domotique/ouvrir-porte-garage-smartphone-esp32-esphome/",
			tutorialLabel: "Tutoriel porte de garage (ESP32 / Shelly)",
			mainRole: "Relais contact sec sur bornier « bouton poussoir » de la motorisation (8 A max).",
			qtyLabel: "Nombre de portes de garage",
			meta: {
				difficulty: 3,
				time: "1 h 30",
				tools: "Tournevis, testeur, Wago"
			},
			techOptions: [
				{
					id: "contact-sec",
					label: "Motorisation avec bornier bouton poussoir (contact sec)"
				},
				{
					id: "dry-only",
					label: "Entrée « dry contact » uniquement (pas de 230 V sur le module)"
				}
			],
			wiring: ({ eco }) => [
					'Coupez le disjoncteur du tableau avant toute ouverture de boîtier motorisation.',
					eco === 'maker-esp32'
						? 'Branchez le relais ESP32 sur les bornes du bouton mural (contact sec) — jamais en parallèle du 230 V moteur.'
						: 'Reliez les sorties I/O du Shelly 1 Mini aux bornes « + / − » du bouton poussoir (fils faible courant).',
					'Ajoutez un capteur d’ouverture sur le battant pour confirmer l’état fermé sur le smartphone.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-1-mini-gen3',
					accessories: [
						{
							productId: "wago-221",
							qty: 1,
							note: "Connexions propres dans le boîtier motorisation."
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-1-mini-gen3',
					accessories: [
						{
							productId: "aqara-door-p2",
							qty: (m) => m,
							note: "Retour d’état ouvert/fermé dans Home Assistant."
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							when: ({ eco }) => eco === 'ha-zigbee',
							note: "Si vous n’avez pas encore de coordinateur Zigbee."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'esp32-devkit',
					mainQty: () => 1,
					mainNote: () => 'ESP32 + firmware ESPHome ou Arduino — pilotage relais contact sec.',
					accessories: [
						{
							productId: "relay-3v3",
							qty: 1
						},
						{
							productId: "reed-garage",
							qty: 1,
							note: "Retour d’état filaire sur GPIO."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					],
					metaAdjust: () => ({ difficulty: 4, time: '2 h 30' })
				}
			},
			category: "acces-garage",
			keywords: "garage motorisé smartphone reed contact sec poussoir shelly ouvert fermé"
		},
	{
			id: "portail-electrique",
			emoji: "🚪",
			title: "Commander un portail électrique battant ou coulissant à distance",
			shortDesc: "Shelly 1 Mini Gen3 / Shelly Plus 1 en contact sec + capteur d’ouverture étanche.",
			tutorialHref: "/domotique/ouvrir-porte-garage-smartphone-esp32-esphome/",
			tutorialLabel: "Tutoriel porte de garage (ESP32 / Shelly)",
			mainRole: "Relais contact sec sur bornier « bouton poussoir » de la motorisation (8 A max).",
			qtyLabel: "Nombre de portails",
			meta: {
				difficulty: 3,
				time: "1 h 30",
				tools: "Tournevis, testeur, Wago"
			},
			techOptions: [
				{
					id: "shelly-mini",
					label: "Shelly 1 Mini Gen3 (coffret compact)"
				},
				{
					id: "shelly-plus1",
					label: "Shelly Plus 1 dans le coffret moteur"
				}
			],
			wiring: ({ tech }) => [
					'Coupez l’alimentation du coffret automate.',
					tech === 'shelly-plus1'
						? 'Shelly Plus 1 en contact sec sur entrée poussoir (pas sur le 230 V moteur).'
						: 'Shelly 1 Mini sur bornes + / − du poussoir.',
					'Capteur d’ouverture étanche pour l’état ouvert/fermé sur smartphone.',
				],
			recipes: {
				"wifi-sans-box": {
					main: ({ tech }) => (tech === 'shelly-plus1' ? 'shelly-plus-1' : 'shelly-1-mini-gen3'),
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: ({ tech }) => (tech === 'shelly-plus1' ? 'shelly-plus-1' : 'shelly-1-mini-gen3'),
					accessories: [
						{
							productId: "aqara-door-p2",
							qty: (m) => m,
							note: "Ouverture portail dans HA."
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'esp32-devkit',
					mainQty: () => 1,
					mainNote: () => 'ESP32 + firmware ESPHome ou Arduino — pilotage relais contact sec.',
					accessories: [
						{
							productId: "relay-3v3",
							qty: 1
						},
						{
							productId: "reed-garage",
							qty: 1,
							note: "Retour d’état filaire sur GPIO."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					],
					metaAdjust: () => ({ difficulty: 4, time: '2 h 30' })
				}
			},
			category: "acces-garage",
			keywords: "portail battant coulissant shelly plus 1 coffret moteur étanche"
		},
	{
			id: "boite-lettres-colis",
			emoji: "📬",
			title: "Recevoir une notification quand le facteur dépose courrier ou colis",
			shortDesc: "Capteur Aqara Door and Window Sensor P2 collé sur le volet. Pile, Thread et Matter : aucun fil.",
			tutorialHref: "/domotique/protocoles-domotique-zigbee-wifi-thread-matter/",
			tutorialLabel: "Zigbee, Wi-Fi, Thread et Matter",
			mainRole: "Le volet écarte l’aimant. Le téléphone reçoit l’ouverture. Rien n’est commandé.",
			qtyLabel: "Nombre de boîtes aux lettres",
			meta: {
				difficulty: 2,
				time: "30 à 45 min",
				tools: "Adhésif fourni, aucun outil électrique"
			},
			techOptions: [
				{
					id: "zigbee-ha",
					label: "Home Assistant via Matter"
				},
				{
					id: "notif-simple",
					label: "Notification dans une app Matter"
				}
			],
			wiring: () => [
					'Aucun fil et aucun disjoncteur : le capteur vit sur sa pile CR123A.',
					'Alignez le boîtier et l’aimant sur la ligne d’alignement de la notice, de part et d’autre du jour du volet.',
					'Associez-le avec le QR Matter. Un dongle Zigbee ne le voit pas.',
					'Une notification à l’ouverture, avec une pause pour ne pas sonner deux fois.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'aqara-door-p2',
					mainNote: () => 'Capteur seul. Il faut déjà un routeur de bordure Thread (Apple TV 4K, HomePod mini, Nest Hub, Echo compatible ou Home Assistant). L’app Shelly ne sert pas.',
					accessories: []
				},
				"ha-zigbee": {
					main: () => 'aqara-door-p2',
					mainNote: () => 'Même capteur. Le profil du configurateur s’appelle Zigbee, mais le P2 parle Thread et Matter : le SONOFF ZBDongle-E ne l’associe pas.',
					accessories: []
				},
				"maker-esp32": {
					main: () => 'aqara-door-p2',
					mainNote: () => 'Pas d’ESP32, pas de Raspberry Pi et pas de dongle dans cette liste. Un Pi ne devient routeur Thread qu’avec une radio Thread séparée.',
					accessories: []
				}
			},
			category: "acces-garage",
			keywords: "boîte aux lettres facteur colis notification aqara p2 matter thread"
		},
	{
			id: "sonnette-carillon-photo",
			emoji: "🔔",
			title: "Portier / sonnette connectée sur carillon filaire avec alerte photo",
			shortDesc: "Module impulsion sur carillon + caméra Tapo C220 ou ieGeek.",
			tutorialHref: "/domotique/camera-surveillance-exterieure-solaire-iegeek/",
			tutorialLabel: "Caméras & alertes (ieGeek / Tapo)",
			mainRole: "Impulsion bouton + capture image à la sonnerie.",
			qtyLabel: "Nombre d’accès (porte d’entrée)",
			meta: {
				difficulty: 3,
				time: "1 h",
				tools: "Tournevis, testeur"
			},
			techOptions: [
				{
					id: "cam-tapo",
					label: "Caméra intérieure Tapo C220"
				},
				{
					id: "cam-iegeek",
					label: "Caméra extérieure ieGeek (porche)"
				}
			],
			wiring: ({ tech }) => [
					'Repérez les fils du bouton sonnette (contact sec ou faible tension).',
					'Shelly 1 Mini en impulsion — respectez la notice du carillon.',
					tech === 'cam-iegeek'
						? 'Caméra ieGeek : scène sonnerie → notification avec clip.'
						: 'Tapo C220 dans le hall : enregistrement à la sonnerie.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-1-mini-gen3',
					accessories: [
						{
							productId: "tapo-c220",
							qty: 1,
							when: ({ tech }) => tech === 'cam-tapo'
						},
						{
							productId: "iegeek-zs-gx4s",
							qty: 1,
							when: ({ tech }) => tech === 'cam-iegeek'
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-1-mini-gen3',
					accessories: [
						{
							productId: "tapo-c220",
							qty: 1,
							when: ({ tech }) => tech === 'cam-tapo'
						},
						{
							productId: "iegeek-s7",
							qty: 1,
							when: ({ tech }) => tech === 'cam-iegeek'
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'esp32-devkit',
					mainQty: () => 1,
					mainNote: () => 'ESP32 + relais sur bouton sonnette.',
					accessories: [
						{
							productId: "relay-3v3",
							qty: 1
						},
						{
							productId: "tapo-c220",
							qty: 1
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				}
			},
			category: "acces-garage",
			keywords: "sonnette portier carillon filaire tapo c220 iegeek photo alerte"
		},
	{
			id: "volets-roulants-filaires",
			emoji: "🪟",
			title: "Contrôler volets roulants électriques filaires existants (4 fils)",
			shortDesc: "Shelly Plus 2PM en mode Roller Shutter + calibration fins de course.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Guide modules connectés & Home Assistant",
			mainRole: "Module 2 canaux en mode « shutter » avec calibration automatique.",
			qtyLabel: "Nombre de volets",
			meta: {
				difficulty: 4,
				time: "2 h / volet",
				tools: "Tournevis, pince, Wago, escabeau"
			},
			techOptions: [
				{
					id: "motor-4wire",
					label: "Moteur Montée / Descente / Neutre / Terre"
				}
			],
			wiring: () => [
					'Coupez le disjoncteur du circuit volets.',
					'Câblez le Shelly Plus 2PM selon le schéma shutter.',
					'Calibration automatique des butées haut/bas.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-plus-2pm',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-plus-2pm',
					accessories: [
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'shelly-plus-2pm',
					accessories: [
						{
							productId: "wago-221",
							qty: 2
						}
					],
					metaAdjust: () => ({ difficulty: 4 })
				}
			},
			category: "volets-rideaux",
			keywords: "volet roulant 4 fils shelly plus 2pm roller shutter calibration"
		},
	{
			id: "store-banne-soleil-vent",
			emoji: "☀️",
			title: "Automatiser un store banne selon le soleil et le vent",
			shortDesc: "Shelly Plus 2PM + capteur météo / scénario vent.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Guide modules connectés & Home Assistant",
			mainRole: "Module 2 canaux en mode « shutter » avec calibration automatique.",
			qtyLabel: "Nombre de stores banne",
			meta: {
				difficulty: 4,
				time: "2 h / volet",
				tools: "Tournevis, pince, Wago, escabeau"
			},
			techOptions: [
				{
					id: "sun-only",
					label: "Ensoleillement uniquement"
				},
				{
					id: "sun-wind",
					label: "Ensoleillement + repli si vent fort"
				}
			],
			wiring: ({ tech }) => [
					'Coupez le disjoncteur du circuit store.',
					'Shelly Plus 2PM sur moteur banne (mode shutter ou relais).',
					tech === 'sun-wind'
						? 'Capteur météo Zigbee : seuil vent → rentrer le store.'
						: 'Scénario lever/coucher soleil dans Home Assistant.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-plus-2pm',
					accessories: [
						{
							productId: "weather-zigbee",
							qty: 1,
							when: ({ tech }) => tech === 'sun-wind'
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-plus-2pm',
					accessories: [
						{
							productId: "weather-zigbee",
							qty: 1,
							when: ({ tech }) => tech === 'sun-wind'
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'shelly-plus-2pm',
					accessories: [
						{
							productId: "wago-221",
							qty: 2
						}
					]
				}
			},
			category: "volets-rideaux",
			keywords: "store banne terrasse soleil vent météo shelly 2pm"
		},
	{
			id: "rideaux-switchbot",
			emoji: "🛋️",
			title: "Motoriser des rideaux existants (tringle ou rail) sans travaux",
			shortDesc: "SwitchBot Curtain 3 + SwitchBot Hub 2.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Guide modules connectés & Home Assistant",
			mainRole: "Moteur sur tringle + hub pour scénarios.",
			qtyLabel: "Nombre de rideaux",
			meta: {
				difficulty: 2,
				time: "30 min / rideau",
				tools: "Tournevis, smartphone"
			},
			techOptions: [
				{
					id: "curtain-rail",
					label: "Tringle ou rail standard"
				}
			],
			wiring: () => [
					'Fixez le Curtain 3 selon la notice SwitchBot.',
					'Calibrez course ouverte / fermée dans l’app.',
					'Hub 2 en Wi-Fi : Matter ou intégration Home Assistant.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'switchbot-curtain-3',
					accessories: [
						{
							productId: "switchbot-hub-2",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'switchbot-curtain-3',
					accessories: [
						{
							productId: "switchbot-hub-2",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'switchbot-curtain-3',
					accessories: [
						{
							productId: "switchbot-hub-2",
							qty: 1
						}
					]
				}
			},
			category: "volets-rideaux",
			keywords: "rideau tringle rail switchbot curtain 3 hub sans câblage"
		},
	{
			id: "eclairage-sans-neutre",
			emoji: "💡",
			title: "Connecter un interrupteur d’éclairage SANS fil neutre",
			shortDesc: "Sonoff ZBMini-L2 Extreme ou Shelly Dimmer 2 + Wago 221.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises & modules connectés pour Home Assistant",
			mainRole: "Commande derrière interrupteur ou variateur selon câblage.",
			qtyLabel: "Nombre de points lumineux / interrupteurs",
			meta: {
				difficulty: 3,
				time: "45 min / point",
				tools: "Tournevis testeur, Wago"
			},
			techOptions: [
				{
					id: "zigbee-no-n",
					label: "Sonoff ZBMini-L2 (Zigbee, sans neutre)"
				},
				{
					id: "wifi-dimmer",
					label: "Shelly Dimmer 2 (Wi-Fi, bypass LED si besoin)"
				}
			],
			wiring: ({ tech }) => [
					'Coupez le disjoncteur — confirmez l’absence de neutre.',
					tech === 'wifi-dimmer'
						? 'Shelly Dimmer 2 + bypass si spots LED basse conso.'
						: 'Sonoff ZBMini-L2 selon schéma « no neutral ».',
					'Connexions Wago 221 pour un boîtier propre.',
				],
			recipes: {
				"wifi-sans-box": {
					main: ({ tech }) => (tech === 'wifi-dimmer' ? 'shelly-dimmer-2' : 'sonoff-zbmini-l2'),
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: ({ tech }) => (tech === 'wifi-dimmer' ? 'shelly-dimmer-2' : 'sonoff-zbmini-l2'),
					accessories: [
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'shelly-dimmer-2',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				}
			},
			category: "eclairage",
			keywords: "sans neutre sonoff zbmini shelly dimmer wago interrupteur"
		},
	{
			id: "va-et-vient-domotise",
			emoji: "🔀",
			title: "Domotiser un va-et-vient (couloir / escalier) en gardant les boutons",
			shortDesc: "Shelly 1 Mini ou Sonoff ZBMini-L2 derrière retour lampe.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises & modules connectés pour Home Assistant",
			mainRole: "Commande derrière interrupteur ou variateur selon câblage.",
			qtyLabel: "Nombre de points lumineux / interrupteurs",
			meta: {
				difficulty: 3,
				time: "45 min / point",
				tools: "Tournevis testeur, Wago"
			},
			techOptions: [
				{
					id: "at-light",
					label: "Neutre au plafonnier / DCL"
				},
				{
					id: "at-switch",
					label: "Module derrière interrupteur (avec neutre)"
				}
			],
			wiring: () => [
					'Coupez le disjoncteur — repérez navettes du va-et-vient.',
					'Module où neutre + phase sont accessibles (souvent au luminaire).',
					'Boutons muraux conservés selon mode du module.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-1-mini-gen3',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'sonoff-zbmini-l2',
					accessories: [
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'shelly-1-mini-gen3',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				}
			},
			category: "eclairage",
			keywords: "va et vient couloir escalier shelly sonoff retour lampe"
		},
	{
			id: "presence-couloir-wc",
			emoji: "🚶",
			title: "Allumer automatiquement couloir, WC, cellier ou escalier (présence)",
			shortDesc: "Aqara Motion Sensor P2 + micromodule éclairage.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises & modules connectés pour Home Assistant",
			mainRole: "Détecteur présence + commande lumière.",
			qtyLabel: "Nombre de points lumineux / interrupteurs",
			meta: {
				difficulty: 2,
				time: "45 min / zone",
				tools: "Piles, tournevis"
			},
			techOptions: [
				{
					id: "motion-light",
					label: "Détecteur + module éclairage"
				}
			],
			wiring: () => [
					'Placez le détecteur pour couvrir le passage.',
					'Mouvement → ON, délai sans mouvement → OFF.',
					'Réglage extinction 30 s à 5 min selon pièce.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-1-mini-gen3',
					accessories: [
						{
							productId: "aqara-motion-p2",
							qty: (m) => m
						}
					]
				},
				"ha-zigbee": {
					main: () => 'sonoff-zbmini-l2',
					accessories: [
						{
							productId: "aqara-motion-p2",
							qty: (m) => m
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						}
					]
				},
				"maker-esp32": {
					main: () => 'aqara-motion-p2',
					accessories: [
						{
							productId: "rpi5-4gb",
							qty: 1
						},
						{
							productId: "rpi5-psu",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "shelly-1-mini-gen3",
							qty: (m) => m
						}
					]
				}
			},
			category: "eclairage",
			keywords: "présence couloir wc escalier aqara motion détecteur"
		},
	{
			id: "dimmer-spots-led",
			emoji: "🌙",
			title: "Varier l’intensité de spots LED dimmables (salon / chambre)",
			shortDesc: "Shelly Dimmer 2 avec calibration charge LED.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises & modules connectés pour Home Assistant",
			mainRole: "Variateur compatible LED dimmable.",
			qtyLabel: "Nombre de points lumineux / interrupteurs",
			meta: {
				difficulty: 3,
				time: "45 min / point",
				tools: "Tournevis testeur, Wago"
			},
			techOptions: [
				{
					id: "dimmable-led",
					label: "Spots LED dimmables"
				}
			],
			wiring: () => [
					'Coupez le disjoncteur — ampoules « dimmable » obligatoires.',
					'Branchement phase / neutre / sortie lampe.',
					'Calibration charge dans l’app Shelly.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-dimmer-2',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-dimmer-2',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'shelly-dimmer-2',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				}
			},
			category: "eclairage",
			keywords: "dimmer variateur spots led salon chambre shelly dimmer 2"
		},
	{
			id: "radiateurs-robinets",
			emoji: "🌡️",
			title: "Piloter radiateurs à eau pièce par pièce (robinets thermostatiques)",
			shortDesc: "Aqara Radiator Thermostat T1 + sonde SONOFF SNZB-02D.",
			tutorialHref: "/domotique/capteur-temperature-zigbee/",
			tutorialLabel: "Capteurs température Zigbee & automatisations",
			mainRole: "Une tête ou relais par radiateur + sonde de référence pièce.",
			qtyLabel: "Nombre de pièces / radiateurs à réguler",
			meta: {
				difficulty: 3,
				time: "30 min / pièce",
				tools: "Piles AAA, tournevis"
			},
			techOptions: [
				{
					id: "radiator-water",
					label: "Radiateurs à eau (vannes M30)"
				}
			],
			wiring: () => [
					'Sur radiateur à eau : vissez la tête thermostatique après avoir retiré l’ancienne tête mécanique.',
					'Placez une sonde température à hauteur d’habillage, loin du radiateur direct.',
					'Créez une automatisation « consigne −1 °C la nuit » dans l’app ou Home Assistant.',
				],
			recipes: {
				"wifi-sans-box": {
					main: ({ tech }) => (tech === 'radiator-electric' ? 'shelly-plug-s-gen3' : 'aqara-thermostat-t1'),
					accessories: [
						{
							productId: "sonoff-snzb-02d",
							qty: (m) => Math.max(1, Math.ceil(m / 2)),
							note: "Sonde de référence pièce."
						}
					]
				},
				"ha-zigbee": {
					main: ({ tech }) => (tech === 'radiator-electric' ? 'shelly-plug-s-gen3' : 'aqara-thermostat-t1'),
					accessories: [
						{
							productId: "sonoff-snzb-02d",
							qty: (m) => Math.max(1, Math.ceil(m / 2))
						},
						{
							productId: "zbdongle-e",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'sonoff-snzb-02d',
					mainNote: () => 'Capteurs Zigbee + box locale — têtes Aqara en option.',
					accessories: [
						{
							productId: "rpi5-4gb",
							qty: 1
						},
						{
							productId: "rpi5-psu",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1
						}
					],
					metaAdjust: () => ({ difficulty: 4, time: '3 h' })
				}
			},
			category: "chauffage-vmc",
			keywords: "radiateur eau robinet thermostatique aqara t1 sonde snzb"
		},
	{
			id: "radiateur-fil-pilote-electric",
			emoji: "♨️",
			title: "Piloter un radiateur électrique fil pilote (4/6 ordres) sous Home Assistant",
			shortDesc: "Shelly Plus 1PM + diode 1N4007 ou module fil pilote Zigbee + sonde température.",
			tutorialHref: "/domotique/piloter-chauffage-electrique-fil-pilote-zigbee-shelly-home-assistant/",
			tutorialLabel: "Fil pilote Zigbee / Shelly & Versatile Thermostat",
			mainRole: "Commutation phase + ordre fil pilote (Arrêt / Hors-gel) + sonde pièce.",
			qtyLabel: "Nombre de radiateurs fil pilote",
			meta: {
				difficulty: 4,
				time: "2 h / radiateur",
				tools: "Tournevis, multimètre, Wago — électricien si doute"
			},
			techOptions: [
				{
					id: "diode-shelly",
					label: "Shelly Plus 1PM + diode 1N4007 (2 ordres)"
				},
				{
					id: "module-fp-zigbee",
					label: "Module fil pilote Zigbee 4/6 ordres (sans diode)"
				}
			],
			wiring: ({ tech }) => [
					'Coupez le disjoncteur du radiateur — contrôle VAT.',
					tech === 'module-fp-zigbee'
						? 'Module fil pilote sur L, N et fil pilote noir radiateur — respecter les 6 fils de la notice.'
						: 'Sortie Shelly vers anode 1N4007, cathode vers fil pilote noir (ordre Arrêt / Hors-gel).',
					'Sonde SNZB-02D ou Zigbee dans Versatile Thermostat pour la consigne pièce.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-plus-1pm',
					accessories: [
						{
							productId: "sonoff-snzb-02d",
							qty: (m) => Math.max(1, Math.ceil(m / 2)),
							note: "Sonde pièce pour consigne."
						},
						{
							productId: "wago-221",
							qty: 1,
							note: "Inclure diode 1N4007 en série fil pilote si montage Shelly."
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-plus-1pm',
					accessories: [
						{
							productId: "sonoff-snzb-02d",
							qty: (m) => Math.max(1, Math.ceil(m / 2))
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							when: ({ eco }) => eco === 'ha-zigbee'
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'esp32-devkit',
					mainNote: () => 'ESP32 + relais SSR fil pilote — réservé experts.',
					accessories: [
						{
							productId: "relay-3v3",
							qty: 1
						},
						{
							productId: "bme280-module",
							qty: 1
						},
						{
							productId: "wago-221",
							qty: 1
						}
					],
					metaAdjust: () => ({ difficulty: 5, time: '3 h' })
				}
			},
			category: "chauffage-vmc",
			keywords: "fil pilote radiateur électrique 1N4007 shelly versatile thermostat zigbee"
		},
	{
			id: "chaudiere-contact-sec",
			emoji: "🔥",
			title: "Commander chaudière gaz / granulés ou poêle via contact sec thermostat",
			shortDesc: "Shelly 1 Mini Gen3 contact sec + sonde SONOFF SNZB-02D.",
			tutorialHref: "/domotique/capteur-temperature-zigbee/",
			tutorialLabel: "Capteurs température Zigbee & automatisations",
			mainRole: "Relais sur entrée thermostat chaudière.",
			qtyLabel: "Nombre de pièces / radiateurs à réguler",
			meta: {
				difficulty: 4,
				time: "2 h",
				tools: "Tournevis — électricien si doute"
			},
			techOptions: [
				{
					id: "dry-contact",
					label: "Bornier contact sec chaudière (RT)"
				}
			],
			wiring: () => [
					'Coupez alimentation chaudière — lisez le schéma thermostat.',
					'Shelly en contact sec uniquement sur entrée RT.',
					'Sonde SNZB-02D : consigne dans Home Assistant.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-1-mini-gen3',
					accessories: [
						{
							productId: "sonoff-snzb-02d",
							qty: 1
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-1-mini-gen3',
					accessories: [
						{
							productId: "sonoff-snzb-02d",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'esp32-devkit',
					mainQty: () => 1,
					mainNote: () => 'ESP32 + relais + BME280 ou Zigbee.',
					accessories: [
						{
							productId: "relay-3v3",
							qty: 1
						},
						{
							productId: "bme280-module",
							qty: 1
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				}
			},
			category: "chauffage-vmc",
			keywords: "chaudière gaz granulés poêle thermostat contact sec shelly"
		},
	{
			id: "chauffe-eau-heures-creuses",
			emoji: "🚿",
			title: "Automatiser le ballon d’eau chaude (Heures Creuses ou surplus solaire)",
			shortDesc: "Shelly Plus 1PM sur bobine contacteur jour/nuit + mesure conso.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises connectées & suivi conso",
			mainRole: "Commande contacteur HC + mesure puissance.",
			qtyLabel: "Nombre de circuits / appareils à surveiller",
			meta: {
				difficulty: 4,
				time: "2 h",
				tools: "Gants, testeur"
			},
			techOptions: [
				{
					id: "hc-grid",
					label: "Heures Creuses classiques"
				},
				{
					id: "solar-surplus",
					label: "Surplus photovoltaïque"
				}
			],
			wiring: () => [
					'Coupure générale — bobine contacteur eau chaude.',
					'Shelly Plus 1PM selon schéma validé par électricien.',
					'Automatisation plages HC ou injection solaire.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-plus-1pm',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-plus-1pm',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'shelly-plus-1pm',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				}
			},
			category: "chauffage-vmc",
			keywords: "chauffe-eau ballon heures creuses solaire shelly 1pm contacteur"
		},
	{
			id: "vmc-humidite-sdb",
			emoji: "💨",
			title: "Déclencher VMC ou extracteur SdB quand humidité dépasse 70 %",
			shortDesc: "SONOFF SNZB-02D + relais Shelly Plus 1PM.",
			tutorialHref: "/domotique/capteur-temperature-zigbee/",
			tutorialLabel: "Capteurs température Zigbee & automatisations",
			mainRole: "Hygrométrie + relais extracteur.",
			qtyLabel: "Nombre de salles de bain",
			meta: {
				difficulty: 3,
				time: "30 min / pièce",
				tools: "Piles AAA, tournevis"
			},
			techOptions: [
				{
					id: "extract-standalone",
					label: "Extracteur ou VMC commandée"
				}
			],
			wiring: () => [
					'Sonde à hauteur, loin du jet de douche direct.',
					'Relais sur circuit extracteur.',
					'Seuil 70 % ON, 55 % OFF avec anti-rebond.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-plus-1pm',
					accessories: [
						{
							productId: "sonoff-snzb-02d",
							qty: (m) => m
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-plus-1pm',
					accessories: [
						{
							productId: "sonoff-snzb-02d",
							qty: (m) => m
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'sonoff-snzb-02d',
					accessories: [
						{
							productId: "shelly-plus-1pm",
							qty: (m) => m
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				}
			},
			category: "chauffage-vmc",
			keywords: "vmc salle de bain humidité 70 extracteur shelly sonoff"
		},
	{
			id: "conso-tableau-solaire",
			emoji: "⚡",
			title: "Suivre la consommation globale au tableau (et production solaire)",
			shortDesc: "Shelly Pro 3EM avec pinces ampèremétriques sur rail DIN.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises connectées & suivi conso",
			mainRole: "Mesure globale + suivi injection.",
			qtyLabel: "Nombre de circuits / appareils à surveiller",
			meta: {
				difficulty: 4,
				time: "2 h",
				tools: "Tournevis isolé, testeur, gants"
			},
			techOptions: [
				{
					id: "din-global",
					label: "Compteur rail DIN arrivée générale"
				},
				{
					id: "tri",
					label: "Triphasé (3 pinces)"
				}
			],
			wiring: () => [
					'Coupure générale — clipsez le 3EM sur rail DIN.',
					'Pinces sur câbles d’arrivée (sens respecté).',
					'Courbes conso + production dans Home Assistant.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-pro-3em',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-pro-3em',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'shelly-pro-3em',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				}
			},
			category: "energie-conso",
			keywords: "consommation tableau shelly pro 3em pinces solaire production"
		},
	{
			id: "alerte-lave-linge",
			emoji: "🧺",
			title: "Alerte smartphone quand lave-linge ou sèche-linge a terminé",
			shortDesc: "Shelly Plug S Gen3 ou Tapo P110 — chute sous 3 W = fin de cycle.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises connectées & suivi conso",
			mainRole: "Prise mesure de puissance.",
			qtyLabel: "Nombre d’appareils",
			meta: {
				difficulty: 2,
				time: "15 min",
				tools: "Aucun"
			},
			techOptions: [
				{
					id: "shelly-plug",
					label: "Shelly Plug S Gen3"
				},
				{
					id: "tapo-plug",
					label: "Tapo P110"
				}
			],
			wiring: () => [
					'Prise entre mur et appareil (respectez Imax).',
					'Relevez la puissance pendant un cycle.',
					'Puissance < 3 W pendant 2 min → notification.',
				],
			recipes: {
				"wifi-sans-box": {
					main: ({ tech }) => (tech === 'tapo-plug' ? 'tapo-p110' : 'shelly-plug-s-gen3')
				},
				"ha-zigbee": {
					main: ({ tech }) => (tech === 'tapo-plug' ? 'tapo-p110' : 'shelly-plug-s-gen3')
				},
				"maker-esp32": {
					main: () => 'shelly-plug-s-gen3'
				}
			},
			category: "energie-conso",
			keywords: "lave-linge sèche-linge fin cycle alerte shelly plug tapo p110"
		},
	{
			id: "coupure-veilles",
			emoji: "🔌",
			title: "Couper automatiquement les veilles (TV, console, bureau) la nuit",
			shortDesc: "Pack Tapo P110 (lot de 4) ou Shelly Plug S Gen3.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises connectées & suivi conso",
			mainRole: "Coupure programmée ou mode absence.",
			qtyLabel: "Nombre de circuits / appareils à surveiller",
			meta: {
				difficulty: 4,
				time: "2 h",
				tools: "Tournevis isolé, testeur, gants"
			},
			techOptions: [
				{
					id: "pack-tapo",
					label: "Lot Tapo P110 (4 prises)"
				},
				{
					id: "shelly-multi",
					label: "Shelly Plug S (une par poste)"
				}
			],
			wiring: () => [
					'Branchez TV / box / console (pas le frigo).',
					'Scénario 23h–7h ou géolocalisation.',
					'Vérifiez compatibilité coupure totale.',
				],
			recipes: {
				"wifi-sans-box": {
					main: ({ tech }) => (tech === 'pack-tapo' ? 'tapo-p110' : 'shelly-plug-s-gen3'),
					mainQty: (m) => (m > 2 ? 1 : m)
				},
				"ha-zigbee": {
					main: ({ tech }) => (tech === 'pack-tapo' ? 'tapo-p110' : 'shelly-plug-s-gen3')
				},
				"maker-esp32": {
					main: () => 'shelly-plug-s-gen3',
					mainQty: (m) => Math.min(m, 4)
				}
			},
			category: "energie-conso",
			keywords: "veille tv console bureau nuit absence tapo shelly plug lot"
		},
	{
			id: "secours-ups-box",
			emoji: "🔋",
			title: "Protéger box Internet et box domotique contre les coupures (UPS)",
			shortDesc: "Station ALLPOWERS ou onduleur USB NUT + HA Green / Raspberry Pi 5.",
			tutorialHref: "/domotique/secours-electrique-home-assistant-onduleur-station/",
			tutorialLabel: "Secours électrique Home Assistant",
			mainRole: "Alimentation secourue box + serveur.",
			qtyLabel: "Nombre de circuits / appareils à surveiller",
			meta: {
				difficulty: 3,
				time: "1 h 30",
				tools: "Ethernet, test coupure"
			},
			techOptions: [
				{
					id: "station-ups",
					label: "Station ALLPOWERS (UPS)"
				},
				{
					id: "nut-ups",
					label: "Onduleur USB (NUT)"
				}
			],
			wiring: ({ tech }) => [
					'Secourez box fibre, switch et serveur HA uniquement.',
					tech === 'station-ups'
						? 'Vérifiez temps de bascule UPS sur fiche ALLPOWERS.'
						: 'USB vers Pi/Green + add-on NUT.',
					'Test : débranchez la prise murale 30 min.',
				],
			recipes: {
				"wifi-sans-box": {
					main: ({ tech }) => (tech === 'station-ups' ? 'allpowers-ups' : 'ups-usb-nut'),
					accessories: [
						{
							productId: "ha-green",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: ({ tech }) => (tech === 'station-ups' ? 'allpowers-ups' : 'ups-usb-nut'),
					accessories: [
						{
							productId: "ha-green",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						}
					]
				},
				"maker-esp32": {
					main: () => 'ups-usb-nut',
					accessories: [
						{
							productId: "rpi5-4gb",
							qty: 1
						},
						{
							productId: "rpi5-psu",
							qty: 1
						}
					]
				}
			},
			category: "energie-conso",
			keywords: "ups onduleur allpowers home assistant green raspberry coupure"
		},
	{
			id: "alerte-congelateur-cave",
			emoji: "❄️",
			title: "Alerte panne congélateur ou suivi T°/hygro cave, serre, chambre bébé",
			shortDesc: "SONOFF SNZB-02D ou BME280 + alerte seuil.",
			tutorialHref: "/domotique/capteur-temperature-zigbee/",
			tutorialLabel: "Capteur température Zigbee (guide complet)",
			mainRole: "Sondes sans fil + seuils d’alerte.",
			qtyLabel: "Nombre de zones à surveiller",
			meta: {
				difficulty: 2,
				time: "20 min / zone",
				tools: "Piles, ruban adhésif"
			},
			techOptions: [
				{
					id: "indoor-room",
					label: "SONOFF SNZB-02D (Zigbee)"
				},
				{
					id: "cold-storage",
					label: "Congélateur / cave (longue autonomie)"
				}
			],
			wiring: () => [
					'Fixez la sonde à l’air libre (pas contre un mur chauffant).',
					'Définissez une alerte si T° ou hygrométrie sort des seuils.',
					'Pour congélateur : testez d’abord la portée radio avant collage définitif.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'sonoff-snzb-02d',
					accessories: []
				},
				"ha-zigbee": {
					main: () => 'sonoff-snzb-02d',
					accessories: [
						{
							productId: "zbdongle-e",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'sonoff-snzb-02d',
					accessories: [
						{
							productId: "rpi5-4gb",
							qty: 1
						},
						{
							productId: "rpi5-psu",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1
						}
					]
				}
			},
			category: "securite-box",
			keywords: "congélateur cave vin serre bébé température sonoff bme280 alerte"
		},
	{
			id: "camera-solaire-exterieure",
			emoji: "🛡️",
			title: "Surveillance extérieure sans fil ni prise (jardin, allée, abri)",
			shortDesc: "Caméra solaire ieGeek ZS-GX4S ou S7 avec panneau.",
			tutorialHref: "/domotique/camera-surveillance-exterieure-solaire-iegeek/",
			tutorialLabel: "Caméra solaire extérieure ieGeek",
			mainRole: "Caméra autonome batterie + solaire.",
			qtyLabel: "Nombre de points à surveiller (portes / zones)",
			meta: {
				difficulty: 2,
				time: "1 h",
				tools: "Adhésif, vis, smartphone"
			},
			techOptions: [
				{
					id: "motion-outdoor",
					label: "ieGeek ZS-GX4S (détection)"
				},
				{
					id: "doors-windows",
					label: "ieGeek S7 (24/7 AOV)"
				}
			],
			wiring: ({ tech }) => [
					'Panneau solaire bien exposé.',
					'Test Wi-Fi 2,4 GHz sur place.',
					tech === 'doors-windows' ? 'S7 pour allée avec passage continu.' : 'ZS-GX4S : bon compromis autonomie.',
				],
			recipes: {
				"wifi-sans-box": {
					main: ({ tech }) => (tech === 'doors-windows' ? 'iegeek-s7' : 'iegeek-zs-gx4s')
				},
				"ha-zigbee": {
					main: ({ tech }) => (tech === 'doors-windows' ? 'iegeek-s7' : 'iegeek-zs-gx4s')
				},
				"maker-esp32": {
					main: () => 'iegeek-zs-gx4s'
				}
			},
			category: "securite-box",
			keywords: "caméra solaire jardin allée iegeek zs-gx4s s7 sans fil"
		},
	{
			id: "box-home-assistant-locale",
			emoji: "🤖",
			title: "Créer sa box domotique locale complète sans abonnement (Home Assistant)",
			shortDesc: "Home Assistant Green ou Raspberry Pi 5 + SONOFF ZBDongle-E / ZBT-2.",
			tutorialHref: "/domotique/home-assistant-green-vs-raspberry-pi-5/",
			tutorialLabel: "Home Assistant Green vs Raspberry Pi 5",
			mainRole: "Box locale prête à l’emploi ou montage Pi 5.",
			qtyLabel: "Nombre de pièces / appareils prévus la 1re année",
			meta: {
				difficulty: 2,
				time: "1 h",
				tools: "Câble Ethernet, clé USB"
			},
			techOptions: [
				{
					id: "plug-play-green",
					label: "Home Assistant Green"
				},
				{
					id: "diy-pi5",
					label: "Raspberry Pi 5 + dongle"
				},
				{
					id: "zbt2",
					label: "Dongle officiel ZBT-2"
				}
			],
			wiring: () => [
					'Branchez la box en Ethernet sur la box internet (évitez le Wi-Fi pour le serveur).',
					'Insérez le dongle Zigbee USB sur un port ou une extension courte.',
					'Créez votre compte local Home Assistant — pas d’abonnement cloud obligatoire.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'ha-green',
					mainQty: () => 1,
					mainNote: () => 'Même sans Zigbee au départ, la Green gère Wi-Fi Shelly.',
					accessories: [
						{
							productId: "shelly-plug-s-gen3",
							qty: 1,
							note: "Premier module Wi-Fi pour tester."
						}
					]
				},
				"ha-zigbee": {
					main: ({ tech }) => (tech === 'diy-pi5' ? 'rpi5-4gb' : 'ha-green'),
					mainQty: () => 1,
					accessories: [
						{
							productId: "zbdongle-e",
							qty: 1,
							when: ({ tech }) => tech !== 'zbt2'
						},
						{
							productId: "ha-connect-zbt2",
							qty: 1,
							when: ({ tech }) => tech === 'zbt2'
						},
						{
							productId: "rpi5-psu",
							qty: 1,
							when: ({ tech }) => tech === 'diy-pi5'
						},
						{
							productId: "sonoff-snzb-02d",
							qty: 1,
							note: "Premier capteur de test."
						}
					]
				},
				"maker-esp32": {
					main: () => 'rpi5-4gb',
					mainQty: () => 1,
					accessories: [
						{
							productId: "rpi5-psu",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1
						},
						{
							productId: "esp32-devkit",
							qty: 1,
							note: "Pour projets ESPHome en parallèle."
						}
					]
				}
			},
			category: "securite-box",
			keywords: "home assistant green raspberry pi 5 zigbee dongle zbt-2 sans abonnement"
		},
	{
			id: "portillon-gache-electrique-connectee",
			emoji: "🚧",
			title: "Gâche électrique / portillon connecté par badge NFC ou smartphone",
			shortDesc: "Relais contact sec sur gâche 12 V + lecteur NFC ou impulsion app.",
			tutorialHref: "/domotique/ouvrir-porte-garage-smartphone-esp32-esphome/",
			tutorialLabel: "Tutoriel porte de garage (ESP32 / Shelly)",
			mainRole: "Relais impulsion sur gâche ou ventouse électrique (faible courant).",
			qtyLabel: "Nombre de portillons / gâches",
			meta: {
				difficulty: 3,
				time: "1 h 30",
				tools: "Tournevis, testeur, Wago"
			},
			techOptions: [
				{
					id: "contact-sec",
					label: "Motorisation avec bornier bouton poussoir (contact sec)"
				},
				{
					id: "dry-only",
					label: "Entrée « dry contact » uniquement (pas de 230 V sur le module)"
				}
			],
			wiring: ({ eco }) => [
					'Coupez le disjoncteur du tableau avant toute ouverture de boîtier motorisation.',
					eco === 'maker-esp32'
						? 'Branchez le relais ESP32 sur les bornes du bouton mural (contact sec) — jamais en parallèle du 230 V moteur.'
						: 'Reliez les sorties I/O du Shelly 1 Mini aux bornes « + / − » du bouton poussoir (fils faible courant).',
					'Ajoutez un capteur d’ouverture sur le battant pour confirmer l’état fermé sur le smartphone.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-1-mini-gen3',
					accessories: [
						{
							productId: "wago-221",
							qty: 1,
							note: "Connexions propres dans le boîtier motorisation."
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-1-mini-gen3',
					accessories: [
						{
							productId: "aqara-door-p2",
							qty: (m) => m,
							note: "Retour d’état ouvert/fermé dans Home Assistant."
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							when: ({ eco }) => eco === 'ha-zigbee',
							note: "Si vous n’avez pas encore de coordinateur Zigbee."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'esp32-devkit',
					mainQty: () => 1,
					mainNote: () => 'ESP32 + firmware ESPHome ou Arduino — pilotage relais contact sec.',
					accessories: [
						{
							productId: "relay-3v3",
							qty: 1
						},
						{
							productId: "reed-garage",
							qty: 1,
							note: "Retour d’état filaire sur GPIO."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					],
					metaAdjust: () => ({ difficulty: 4, time: '2 h 30' })
				}
			},
			category: "acces-garage",
			keywords: "portillon gâche électrique nfc shelly contact sec badge"
		},
	{
			id: "serrure-connectee-cylindre-europeen",
			emoji: "🔐",
			title: "Serrure connectée motorisée sur cylindre européen sans percer",
			shortDesc: "Cylindre motorisé Nuki / SwitchBot Lock Pro + bridge ou Zigbee.",
			tutorialHref: "/domotique/capteur-temperature-zigbee/",
			tutorialLabel: "Capteur température Zigbee (guide complet)",
			mainRole: "Moteur cylindre + retour état verrouillé.",
			qtyLabel: "Nombre de portes d’entrée",
			meta: {
				difficulty: 2,
				time: "20 min / zone",
				tools: "Piles, ruban adhésif"
			},
			techOptions: [
				{
					id: "zigbee-ha",
					label: "Home Assistant / Zigbee"
				},
				{
					id: "notif-simple",
					label: "Notification smartphone (intégration Aqara)"
				}
			],
			wiring: () => [
					'Fixez capteur sur volet et aimant sur le corps de la boîte.',
					'Testez la portée Zigbee (boîtier parfois métallique).',
					'Automatisation : notification à chaque ouverture en journée.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'aqara-door-p2',
					accessories: []
				},
				"ha-zigbee": {
					main: () => 'aqara-door-p2',
					accessories: [
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						}
					]
				},
				"maker-esp32": {
					main: () => 'aqara-door-p2',
					accessories: [
						{
							productId: "rpi5-4gb",
							qty: 1
						},
						{
							productId: "rpi5-psu",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						}
					]
				}
			},
			category: "acces-garage",
			keywords: "serrure connectée cylindre européen nuki switchbot sans perçage"
		},
	{
			id: "clavier-code-exterieur-connecte",
			emoji: "🔢",
			title: "Clavier à code et lecteur d’empreinte extérieur Zigbee / Wi-Fi",
			shortDesc: "Clavier IP65 sur contact sec portail ou serrure compatible.",
			tutorialHref: "/domotique/ouvrir-porte-garage-smartphone-esp32-esphome/",
			tutorialLabel: "Tutoriel porte de garage (ESP32 / Shelly)",
			mainRole: "Relais contact sec sur bornier « bouton poussoir » de la motorisation (8 A max).",
			qtyLabel: "Nombre de claviers",
			meta: {
				difficulty: 3,
				time: "1 h 30",
				tools: "Tournevis, testeur, Wago"
			},
			techOptions: [
				{
					id: "contact-sec",
					label: "Motorisation avec bornier bouton poussoir (contact sec)"
				},
				{
					id: "dry-only",
					label: "Entrée « dry contact » uniquement (pas de 230 V sur le module)"
				}
			],
			wiring: ({ eco }) => [
					'Coupez le disjoncteur du tableau avant toute ouverture de boîtier motorisation.',
					eco === 'maker-esp32'
						? 'Branchez le relais ESP32 sur les bornes du bouton mural (contact sec) — jamais en parallèle du 230 V moteur.'
						: 'Reliez les sorties I/O du Shelly 1 Mini aux bornes « + / − » du bouton poussoir (fils faible courant).',
					'Ajoutez un capteur d’ouverture sur le battant pour confirmer l’état fermé sur le smartphone.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-1-mini-gen3',
					accessories: [
						{
							productId: "wago-221",
							qty: 1,
							note: "Connexions propres dans le boîtier motorisation."
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-1-mini-gen3',
					accessories: [
						{
							productId: "aqara-door-p2",
							qty: (m) => m,
							note: "Retour d’état ouvert/fermé dans Home Assistant."
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							when: ({ eco }) => eco === 'ha-zigbee',
							note: "Si vous n’avez pas encore de coordinateur Zigbee."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'esp32-devkit',
					mainQty: () => 1,
					mainNote: () => 'ESP32 + firmware ESPHome ou Arduino — pilotage relais contact sec.',
					accessories: [
						{
							productId: "relay-3v3",
							qty: 1
						},
						{
							productId: "reed-garage",
							qty: 1,
							note: "Retour d’état filaire sur GPIO."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					],
					metaAdjust: () => ({ difficulty: 4, time: '2 h 30' })
				}
			},
			category: "acces-garage",
			keywords: "clavier code extérieur empreinte zigbee portail shelly"
		},
	{
			id: "domotiser-interphone-existant",
			emoji: "📞",
			title: "Interphone / visiophone ancien domotisé en contact sec",
			shortDesc: "Shelly sur bouton platine + notification HA à la sonnerie.",
			tutorialHref: "/domotique/camera-surveillance-exterieure-solaire-iegeek/",
			tutorialLabel: "Caméras & alertes (ieGeek / Tapo)",
			mainRole: "Impulsion bouton + capture image à la sonnerie.",
			qtyLabel: "Nombre de platines",
			meta: {
				difficulty: 3,
				time: "1 h",
				tools: "Tournevis, testeur"
			},
			techOptions: [
				{
					id: "cam-tapo",
					label: "Caméra intérieure Tapo C220"
				},
				{
					id: "cam-iegeek",
					label: "Caméra extérieure ieGeek (porche)"
				}
			],
			wiring: ({ tech }) => [
					'Repérez les fils du bouton sonnette (contact sec ou faible tension).',
					'Shelly 1 Mini en impulsion — respectez la notice du carillon.',
					tech === 'cam-iegeek'
						? 'Caméra ieGeek : scène sonnerie → notification avec clip.'
						: 'Tapo C220 dans le hall : enregistrement à la sonnerie.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-1-mini-gen3',
					accessories: [
						{
							productId: "tapo-c220",
							qty: 1,
							when: ({ tech }) => tech === 'cam-tapo'
						},
						{
							productId: "iegeek-zs-gx4s",
							qty: 1,
							when: ({ tech }) => tech === 'cam-iegeek'
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-1-mini-gen3',
					accessories: [
						{
							productId: "tapo-c220",
							qty: 1,
							when: ({ tech }) => tech === 'cam-tapo'
						},
						{
							productId: "iegeek-s7",
							qty: 1,
							when: ({ tech }) => tech === 'cam-iegeek'
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'esp32-devkit',
					mainQty: () => 1,
					mainNote: () => 'ESP32 + relais sur bouton sonnette.',
					accessories: [
						{
							productId: "relay-3v3",
							qty: 1
						},
						{
							productId: "tapo-c220",
							qty: 1
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				}
			},
			category: "acces-garage",
			keywords: "interphone visiophone filaire domotiser contact sec shelly"
		},
	{
			id: "ouverture-portail-approche-voiture",
			emoji: "📍",
			title: "Ouverture automatique du portail à l’approche voiture (beacon BLE / géolocalisation)",
			shortDesc: "Géolocalisation HA ou beacon BLE avec confirmation vitesse / sens.",
			tutorialHref: "/domotique/ouvrir-porte-garage-smartphone-esp32-esphome/",
			tutorialLabel: "Tutoriel porte de garage (ESP32 / Shelly)",
			mainRole: "Relais contact sec sur bornier « bouton poussoir » de la motorisation (8 A max).",
			qtyLabel: "Nombre de véhicules / portails",
			meta: {
				difficulty: 3,
				time: "1 h 30",
				tools: "Tournevis, testeur, Wago"
			},
			techOptions: [
				{
					id: "shelly-mini",
					label: "Shelly 1 Mini Gen3 (coffret compact)"
				},
				{
					id: "shelly-plus1",
					label: "Shelly Plus 1 dans le coffret moteur"
				}
			],
			wiring: ({ tech }) => [
					'Coupez l’alimentation du coffret automate.',
					tech === 'shelly-plus1'
						? 'Shelly Plus 1 en contact sec sur entrée poussoir (pas sur le 230 V moteur).'
						: 'Shelly 1 Mini sur bornes + / − du poussoir.',
					'Capteur d’ouverture étanche pour l’état ouvert/fermé sur smartphone.',
				],
			recipes: {
				"wifi-sans-box": {
					main: ({ tech }) => (tech === 'shelly-plus1' ? 'shelly-plus-1' : 'shelly-1-mini-gen3'),
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: ({ tech }) => (tech === 'shelly-plus1' ? 'shelly-plus-1' : 'shelly-1-mini-gen3'),
					accessories: [
						{
							productId: "aqara-door-p2",
							qty: (m) => m,
							note: "Ouverture portail dans HA."
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'esp32-devkit',
					mainQty: () => 1,
					mainNote: () => 'ESP32 + firmware ESPHome ou Arduino — pilotage relais contact sec.',
					accessories: [
						{
							productId: "relay-3v3",
							qty: 1
						},
						{
							productId: "reed-garage",
							qty: 1,
							note: "Retour d’état filaire sur GPIO."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					],
					metaAdjust: () => ({ difficulty: 4, time: '2 h 30' })
				}
			},
			category: "acces-garage",
			keywords: "portail automatique approche voiture beacon ble geofencing home assistant"
		},
	{
			id: "eclairage-allee-ouverture-portail",
			emoji: "💡",
			title: "Éclairage d’allée et de garage couplé à l’ouverture du portail",
			shortDesc: "Scénario : portail ouvert → allumage allée 5 min puis extinction.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises & modules connectés pour Home Assistant",
			mainRole: "Détecteur présence + commande lumière.",
			qtyLabel: "Zones lumineuses extérieures",
			meta: {
				difficulty: 2,
				time: "45 min / zone",
				tools: "Piles, tournevis"
			},
			techOptions: [
				{
					id: "motion-light",
					label: "Détecteur + module éclairage"
				}
			],
			wiring: () => [
					'Placez le détecteur pour couvrir le passage.',
					'Mouvement → ON, délai sans mouvement → OFF.',
					'Réglage extinction 30 s à 5 min selon pièce.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-1-mini-gen3',
					accessories: [
						{
							productId: "aqara-motion-p2",
							qty: (m) => m
						}
					]
				},
				"ha-zigbee": {
					main: () => 'sonoff-zbmini-l2',
					accessories: [
						{
							productId: "aqara-motion-p2",
							qty: (m) => m
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						}
					]
				},
				"maker-esp32": {
					main: () => 'aqara-motion-p2',
					accessories: [
						{
							productId: "rpi5-4gb",
							qty: 1
						},
						{
							productId: "rpi5-psu",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "shelly-1-mini-gen3",
							qty: (m) => m
						}
					]
				}
			},
			category: "acces-garage",
			keywords: "éclairage allée garage portail ouvert shelly scénario"
		},
	{
			id: "detecteur-place-parking-garage",
			emoji: "🅿️",
			title: "Détection de véhicule garé dans le garage par capteur ultrason / laser ToF",
			shortDesc: "Capteur distance ESPHome ou Zigbee + indicateur place libre.",
			tutorialHref: "/domotique/capteur-temperature-zigbee/",
			tutorialLabel: "Capteur température Zigbee (guide complet)",
			mainRole: "Détection ouverture / inclinaison du volet.",
			qtyLabel: "Nombre de places",
			meta: {
				difficulty: 2,
				time: "20 min / zone",
				tools: "Piles, ruban adhésif"
			},
			techOptions: [
				{
					id: "zigbee-ha",
					label: "Home Assistant / Zigbee"
				},
				{
					id: "notif-simple",
					label: "Notification smartphone (intégration Aqara)"
				}
			],
			wiring: () => [
					'Fixez capteur sur volet et aimant sur le corps de la boîte.',
					'Testez la portée Zigbee (boîtier parfois métallique).',
					'Automatisation : notification à chaque ouverture en journée.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'aqara-door-p2',
					accessories: []
				},
				"ha-zigbee": {
					main: () => 'aqara-door-p2',
					accessories: [
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						}
					]
				},
				"maker-esp32": {
					main: () => 'aqara-door-p2',
					accessories: [
						{
							productId: "rpi5-4gb",
							qty: 1
						},
						{
							productId: "rpi5-psu",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						}
					]
				}
			},
			category: "acces-garage",
			keywords: "parking garage ultrason tof place libre zigbee esphome"
		},
	{
			id: "alerte-portillon-jardin-ouvert",
			emoji: "⚠️",
			title: "Alerte portillon ou porte de service restée entrouverte",
			shortDesc: "Aqara Door P2 + notification si ouvert > 10 min.",
			tutorialHref: "/domotique/capteur-temperature-zigbee/",
			tutorialLabel: "Capteur température Zigbee (guide complet)",
			mainRole: "Détection ouverture / inclinaison du volet.",
			qtyLabel: "Nombre de portillons",
			meta: {
				difficulty: 2,
				time: "20 min / zone",
				tools: "Piles, ruban adhésif"
			},
			techOptions: [
				{
					id: "zigbee-ha",
					label: "Home Assistant / Zigbee"
				},
				{
					id: "notif-simple",
					label: "Notification smartphone (intégration Aqara)"
				}
			],
			wiring: () => [
					'Fixez capteur sur volet et aimant sur le corps de la boîte.',
					'Testez la portée Zigbee (boîtier parfois métallique).',
					'Automatisation : notification à chaque ouverture en journée.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'aqara-door-p2',
					accessories: []
				},
				"ha-zigbee": {
					main: () => 'aqara-door-p2',
					accessories: [
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						}
					]
				},
				"maker-esp32": {
					main: () => 'aqara-door-p2',
					accessories: [
						{
							productId: "rpi5-4gb",
							qty: 1
						},
						{
							productId: "rpi5-psu",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						}
					]
				}
			},
			category: "acces-garage",
			keywords: "portillon jardin alerte ouvert aqara porte service"
		},
	{
			id: "verrouillage-nocturne-porte-garage",
			emoji: "🌙",
			title: "Bouton d’ouverture de secours et coupure alimentation garage la nuit",
			shortDesc: "Contact sec + coupure relais moteur 23h–6h (sécurité enfants).",
			tutorialHref: "/domotique/ouvrir-porte-garage-smartphone-esp32-esphome/",
			tutorialLabel: "Tutoriel porte de garage (ESP32 / Shelly)",
			mainRole: "Relais contact sec sur bornier « bouton poussoir » de la motorisation (8 A max).",
			qtyLabel: "Portes de garage",
			meta: {
				difficulty: 3,
				time: "1 h 30",
				tools: "Tournevis, testeur, Wago"
			},
			techOptions: [
				{
					id: "contact-sec",
					label: "Motorisation avec bornier bouton poussoir (contact sec)"
				},
				{
					id: "dry-only",
					label: "Entrée « dry contact » uniquement (pas de 230 V sur le module)"
				}
			],
			wiring: ({ eco }) => [
					'Coupez le disjoncteur du tableau avant toute ouverture de boîtier motorisation.',
					eco === 'maker-esp32'
						? 'Branchez le relais ESP32 sur les bornes du bouton mural (contact sec) — jamais en parallèle du 230 V moteur.'
						: 'Reliez les sorties I/O du Shelly 1 Mini aux bornes « + / − » du bouton poussoir (fils faible courant).',
					'Ajoutez un capteur d’ouverture sur le battant pour confirmer l’état fermé sur le smartphone.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-1-mini-gen3',
					accessories: [
						{
							productId: "wago-221",
							qty: 1,
							note: "Connexions propres dans le boîtier motorisation."
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-1-mini-gen3',
					accessories: [
						{
							productId: "aqara-door-p2",
							qty: (m) => m,
							note: "Retour d’état ouvert/fermé dans Home Assistant."
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							when: ({ eco }) => eco === 'ha-zigbee',
							note: "Si vous n’avez pas encore de coordinateur Zigbee."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'esp32-devkit',
					mainQty: () => 1,
					mainNote: () => 'ESP32 + firmware ESPHome ou Arduino — pilotage relais contact sec.',
					accessories: [
						{
							productId: "relay-3v3",
							qty: 1
						},
						{
							productId: "reed-garage",
							qty: 1,
							note: "Retour d’état filaire sur GPIO."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					],
					metaAdjust: () => ({ difficulty: 4, time: '2 h 30' })
				}
			},
			category: "acces-garage",
			keywords: "garage nuit verrouillage coupure moteur shelly sécurité"
		},
	{
			id: "boite-a-colis-connectee-livraison",
			emoji: "📦",
			title: "Coffre à clés / boîte à colis connectée pour livraisons et locations",
			shortDesc: "Capteur ouverture + code temporaire ou notification hôte.",
			tutorialHref: "/domotique/capteur-temperature-zigbee/",
			tutorialLabel: "Capteur température Zigbee (guide complet)",
			mainRole: "Capteur contact sur le couvercle de boîte à colis ou coffre (ouvert / fermé).",
			qtyLabel: "Boîtes / coffres",
			meta: {
				difficulty: 2,
				time: "20 min / zone",
				tools: "Piles, ruban adhésif"
			},
			techOptions: [
				{
					id: "zigbee-ha",
					label: "Home Assistant / Zigbee (ZHA ou Zigbee2MQTT)"
				},
				{
					id: "notif-simple",
					label: "Application Aqara Home (notification directe)"
				}
			],
			wiring: () => [
					'Collez le capteur sur le couvercle intérieur et l’aimant sur le cadre fixe de la boîte à colis.',
					'Vérifiez que le couvercle ouvre assez pour séparer contact et aimant (≥ 5 mm).',
					'Testez la portée Zigbee depuis le porche : ajoutez une prise routeur si la tôle bloque le signal.',
					'Automatisation : notification immédiate à l’ouverture + rappel si restée ouverte plus de 10 min.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'aqara-door-p2',
					accessories: []
				},
				"ha-zigbee": {
					main: () => 'aqara-door-p2',
					accessories: [
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						}
					]
				},
				"maker-esp32": {
					main: () => 'aqara-door-p2',
					accessories: [
						{
							productId: "rpi5-4gb",
							qty: 1
						},
						{
							productId: "rpi5-psu",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						}
					]
				}
			},
			category: "securite-box",
			keywords: "boîte colis connectée livraison airbnb coffre clés capteur"
		},
	{
			id: "centraliser-volets-roulants-bouton-unique",
			emoji: "🎛️",
			title: "Centralisation générale de tous les volets roulants sur un seul bouton mural",
			shortDesc: "Groupe Home Assistant ou scène multi-cover Shelly 2PM.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Guide modules connectés & Home Assistant",
			mainRole: "Module 2 canaux en mode « shutter » avec calibration automatique.",
			qtyLabel: "Nombre de volets",
			meta: {
				difficulty: 4,
				time: "2 h / volet",
				tools: "Tournevis, pince, Wago, escabeau"
			},
			techOptions: [
				{
					id: "motor-4wire",
					label: "Moteur Montée / Descente / Neutre / Terre"
				}
			],
			wiring: () => [
					'Coupez le disjoncteur du circuit volets.',
					'Câblez le Shelly Plus 2PM selon le schéma shutter.',
					'Calibration automatique des butées haut/bas.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-plus-2pm',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-plus-2pm',
					accessories: [
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'shelly-plus-2pm',
					accessories: [
						{
							productId: "wago-221",
							qty: 2
						}
					],
					metaAdjust: () => ({ difficulty: 4 })
				}
			},
			category: "volets-rideaux",
			keywords: "centraliser volets roulants bouton unique scène home assistant"
		},
	{
			id: "volets-automatiques-canicule-soleil",
			emoji: "🌡️",
			title: "Fermeture automatique des volets en été selon l’ensoleillement (gestion thermique)",
			shortDesc: "Capteur luminosité / soleil + fermeture partielle anti-surchauffe.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Guide modules connectés & Home Assistant",
			mainRole: "Module 2 canaux en mode « shutter » avec calibration automatique.",
			qtyLabel: "Façades / volets",
			meta: {
				difficulty: 4,
				time: "2 h / volet",
				tools: "Tournevis, pince, Wago, escabeau"
			},
			techOptions: [
				{
					id: "sun-only",
					label: "Ensoleillement uniquement"
				},
				{
					id: "sun-wind",
					label: "Ensoleillement + repli si vent fort"
				}
			],
			wiring: ({ tech }) => [
					'Coupez le disjoncteur du circuit store.',
					'Shelly Plus 2PM sur moteur banne (mode shutter ou relais).',
					tech === 'sun-wind'
						? 'Capteur météo Zigbee : seuil vent → rentrer le store.'
						: 'Scénario lever/coucher soleil dans Home Assistant.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-plus-2pm',
					accessories: [
						{
							productId: "weather-zigbee",
							qty: 1,
							when: ({ tech }) => tech === 'sun-wind'
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-plus-2pm',
					accessories: [
						{
							productId: "weather-zigbee",
							qty: 1,
							when: ({ tech }) => tech === 'sun-wind'
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'shelly-plus-2pm',
					accessories: [
						{
							productId: "wago-221",
							qty: 2
						}
					]
				}
			},
			category: "volets-rideaux",
			keywords: "volets canicule soleil luminosité fermeture automatique"
		},
	{
			id: "motoriser-volet-sangle-manivelle",
			emoji: "🔄",
			title: "Motoriser un volet roulant à sangle ou manivelle existant",
			shortDesc: "Kit motorisation filaire ou Zigbee selon diamètre axe.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Guide modules connectés & Home Assistant",
			mainRole: "Moteur sur tringle + hub pour scénarios.",
			qtyLabel: "Volets à motoriser",
			meta: {
				difficulty: 2,
				time: "30 min / rideau",
				tools: "Tournevis, smartphone"
			},
			techOptions: [
				{
					id: "curtain-rail",
					label: "Tringle ou rail standard"
				}
			],
			wiring: () => [
					'Fixez le Curtain 3 selon la notice SwitchBot.',
					'Calibrez course ouverte / fermée dans l’app.',
					'Hub 2 en Wi-Fi : Matter ou intégration Home Assistant.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'switchbot-curtain-3',
					accessories: [
						{
							productId: "switchbot-hub-2",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'switchbot-curtain-3',
					accessories: [
						{
							productId: "switchbot-hub-2",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'switchbot-curtain-3',
					accessories: [
						{
							productId: "switchbot-hub-2",
							qty: 1
						}
					]
				}
			},
			category: "volets-rideaux",
			keywords: "motoriser volet sangle manivelle kit domotique"
		},
	{
			id: "velux-fenetre-toit-pluie-connectee",
			emoji: "🌧️",
			title: "Fenêtre de toit / Velux motorisé et fermeture automatique en cas de pluie",
			shortDesc: "Capteur pluie Zigbee + commande KLF ou contact sec Velux IO.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Guide modules connectés & Home Assistant",
			mainRole: "Module 2 canaux en mode « shutter » avec calibration automatique.",
			qtyLabel: "Fenêtres de toit",
			meta: {
				difficulty: 4,
				time: "2 h / volet",
				tools: "Tournevis, pince, Wago, escabeau"
			},
			techOptions: [
				{
					id: "sun-only",
					label: "Ensoleillement uniquement"
				},
				{
					id: "sun-wind",
					label: "Ensoleillement + repli si vent fort"
				}
			],
			wiring: ({ tech }) => [
					'Coupez le disjoncteur du circuit store.',
					'Shelly Plus 2PM sur moteur banne (mode shutter ou relais).',
					tech === 'sun-wind'
						? 'Capteur météo Zigbee : seuil vent → rentrer le store.'
						: 'Scénario lever/coucher soleil dans Home Assistant.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-plus-2pm',
					accessories: [
						{
							productId: "weather-zigbee",
							qty: 1,
							when: ({ tech }) => tech === 'sun-wind'
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-plus-2pm',
					accessories: [
						{
							productId: "weather-zigbee",
							qty: 1,
							when: ({ tech }) => tech === 'sun-wind'
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'shelly-plus-2pm',
					accessories: [
						{
							productId: "wago-221",
							qty: 2
						}
					]
				}
			},
			category: "volets-rideaux",
			keywords: "velux pluie automatique capteur météo zigbee klf"
		},
	{
			id: "pergola-bioclimatique-connectee",
			emoji: "🏡",
			title: "Pergola bioclimatique : orienter les lames selon soleil, pluie et vent",
			shortDesc: "Shelly 2PM ou API fabricant + capteurs météo locaux.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Guide modules connectés & Home Assistant",
			mainRole: "Module 2 canaux en mode « shutter » avec calibration automatique.",
			qtyLabel: "Pergolas",
			meta: {
				difficulty: 4,
				time: "2 h / volet",
				tools: "Tournevis, pince, Wago, escabeau"
			},
			techOptions: [
				{
					id: "sun-only",
					label: "Ensoleillement uniquement"
				},
				{
					id: "sun-wind",
					label: "Ensoleillement + repli si vent fort"
				}
			],
			wiring: ({ tech }) => [
					'Coupez le disjoncteur du circuit store.',
					'Shelly Plus 2PM sur moteur banne (mode shutter ou relais).',
					tech === 'sun-wind'
						? 'Capteur météo Zigbee : seuil vent → rentrer le store.'
						: 'Scénario lever/coucher soleil dans Home Assistant.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-plus-2pm',
					accessories: [
						{
							productId: "weather-zigbee",
							qty: 1,
							when: ({ tech }) => tech === 'sun-wind'
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-plus-2pm',
					accessories: [
						{
							productId: "weather-zigbee",
							qty: 1,
							when: ({ tech }) => tech === 'sun-wind'
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'shelly-plus-2pm',
					accessories: [
						{
							productId: "wago-221",
							qty: 2
						}
					]
				}
			},
			category: "volets-rideaux",
			keywords: "pergola bioclimatique lames connectée soleil vent pluie"
		},
	{
			id: "store-enrouleur-interieur-motorise",
			emoji: "🪟",
			title: "Store vénitien / store enrouleur intérieur motorisé Zigbee",
			shortDesc: "Moteur tube Zigbee Tuya / Aqara + calibration haut/bas.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Guide modules connectés & Home Assistant",
			mainRole: "Moteur sur tringle + hub pour scénarios.",
			qtyLabel: "Stores",
			meta: {
				difficulty: 2,
				time: "30 min / rideau",
				tools: "Tournevis, smartphone"
			},
			techOptions: [
				{
					id: "curtain-rail",
					label: "Tringle ou rail standard"
				}
			],
			wiring: () => [
					'Fixez le Curtain 3 selon la notice SwitchBot.',
					'Calibrez course ouverte / fermée dans l’app.',
					'Hub 2 en Wi-Fi : Matter ou intégration Home Assistant.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'switchbot-curtain-3',
					accessories: [
						{
							productId: "switchbot-hub-2",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'switchbot-curtain-3',
					accessories: [
						{
							productId: "switchbot-hub-2",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'switchbot-curtain-3',
					accessories: [
						{
							productId: "switchbot-hub-2",
							qty: 1
						}
					]
				}
			},
			category: "volets-rideaux",
			keywords: "store enrouleur intérieur motorisé zigbee tuya aqara"
		},
	{
			id: "arrosage-automatique-jardin-meteo",
			emoji: "💧",
			title: "Arrosage automatique de jardin goutte-à-goutte piloté par météo locale",
			shortDesc: "Programmateur + pluie / sécheresse via HA ou sonde sol.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Guide modules connectés & Home Assistant",
			mainRole: "Module 2 canaux en mode « shutter » avec calibration automatique.",
			qtyLabel: "Zones de jardin",
			meta: {
				difficulty: 4,
				time: "2 h / volet",
				tools: "Tournevis, pince, Wago, escabeau"
			},
			techOptions: [
				{
					id: "sun-only",
					label: "Ensoleillement uniquement"
				},
				{
					id: "sun-wind",
					label: "Ensoleillement + repli si vent fort"
				}
			],
			wiring: ({ tech }) => [
					'Coupez le disjoncteur du circuit store.',
					'Shelly Plus 2PM sur moteur banne (mode shutter ou relais).',
					tech === 'sun-wind'
						? 'Capteur météo Zigbee : seuil vent → rentrer le store.'
						: 'Scénario lever/coucher soleil dans Home Assistant.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-plus-2pm',
					accessories: [
						{
							productId: "weather-zigbee",
							qty: 1,
							when: ({ tech }) => tech === 'sun-wind'
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-plus-2pm',
					accessories: [
						{
							productId: "weather-zigbee",
							qty: 1,
							when: ({ tech }) => tech === 'sun-wind'
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'shelly-plus-2pm',
					accessories: [
						{
							productId: "wago-221",
							qty: 2
						}
					]
				}
			},
			category: "volets-rideaux",
			keywords: "arrosage goutte à goutte météo home assistant zigbee"
		},
	{
			id: "electrovanne-arrosage-multizone-connectee",
			emoji: "🚿",
			title: "Électrovanne d’arrosage multizone 24 V sur programmateur connecté",
			shortDesc: "Relais multicanaux + transformateur 24 V AC — une zone à la fois.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Guide modules connectés & Home Assistant",
			mainRole: "Module 2 canaux en mode « shutter » avec calibration automatique.",
			qtyLabel: "Zones d’arrosage",
			meta: {
				difficulty: 4,
				time: "2 h / volet",
				tools: "Tournevis, pince, Wago, escabeau"
			},
			techOptions: [
				{
					id: "motor-4wire",
					label: "Moteur Montée / Descente / Neutre / Terre"
				}
			],
			wiring: () => [
					'Coupez le disjoncteur du circuit volets.',
					'Câblez le Shelly Plus 2PM selon le schéma shutter.',
					'Calibration automatique des butées haut/bas.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-plus-2pm',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-plus-2pm',
					accessories: [
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'shelly-plus-2pm',
					accessories: [
						{
							productId: "wago-221",
							qty: 2
						}
					],
					metaAdjust: () => ({ difficulty: 4 })
				}
			},
			category: "volets-rideaux",
			keywords: "electrovanne arrosage multizone 24v shelly relais programmateur"
		},
	{
			id: "sonde-humidite-sol-potager-zigbee",
			emoji: "🌱",
			title: "Sonde d’humidité du sol Zigbee pour potager et pelouse",
			shortDesc: "Capteur sol + seuil arrosage dans Home Assistant.",
			tutorialHref: "/domotique/capteur-temperature-zigbee/",
			tutorialLabel: "Capteur température Zigbee (guide complet)",
			mainRole: "Sonde capacitive sol Zigbee (humidité % + température) pour zones de culture.",
			qtyLabel: "Sondes",
			meta: {
				difficulty: 2,
				time: "30 min / zone",
				tools: "Piles, bêche ou dible, ruban adhésif"
			},
			techOptions: [
				{
					id: "potager",
					label: "Potager / bac surélevé (sonde SNZB-61D1)"
				},
				{
					id: "pelouse",
					label: "Pelouse ou massif (plusieurs sondes + moyenne HA)"
				}
			],
			wiring: () => [
					'Enterrez la tige de la sonde à mi-profondeur racinaire (5–8 cm potager, 10–15 cm pelouse).',
					'Arrosez une première fois pour calibrer le contact sol–capteur, puis laissez stabiliser 24 h.',
					'Appairez la sonde au coordinateur Zigbee (ZHA) depuis Home Assistant.',
					'Créez un helper « seuil arrosage » (ex. < 25 %) et une alerte avant stress hydrique.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'sonoff-snzb-61d1',
					accessories: []
				},
				"ha-zigbee": {
					main: () => 'sonoff-snzb-61d1',
					accessories: [
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						}
					]
				},
				"maker-esp32": {
					main: () => 'sonoff-snzb-61d1',
					accessories: [
						{
							productId: "rpi5-4gb",
							qty: 1
						},
						{
							productId: "rpi5-psu",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						}
					]
				}
			},
			category: "energie-conso",
			keywords: "sonde humidité sol zigbee potager pelouse arrosage"
		},
	{
			id: "serre-jardin-temperature-ouverture",
			emoji: "🏠",
			title: "Abri de jardin et serre : aération et suivi température / gel",
			shortDesc: "SNZB-02D + ouvre-porte motorisé si T° > seuil.",
			tutorialHref: "/domotique/capteur-temperature-zigbee/",
			tutorialLabel: "Capteur température Zigbee (guide complet)",
			mainRole: "Sondes sans fil + seuils d’alerte.",
			qtyLabel: "Serres / abris",
			meta: {
				difficulty: 2,
				time: "20 min / zone",
				tools: "Piles, ruban adhésif"
			},
			techOptions: [
				{
					id: "indoor-room",
					label: "SONOFF SNZB-02D (Zigbee)"
				},
				{
					id: "cold-storage",
					label: "Congélateur / cave (longue autonomie)"
				}
			],
			wiring: () => [
					'Fixez la sonde à l’air libre (pas contre un mur chauffant).',
					'Définissez une alerte si T° ou hygrométrie sort des seuils.',
					'Pour congélateur : testez d’abord la portée radio avant collage définitif.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'sonoff-snzb-02d',
					accessories: []
				},
				"ha-zigbee": {
					main: () => 'sonoff-snzb-02d',
					accessories: [
						{
							productId: "zbdongle-e",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'sonoff-snzb-02d',
					accessories: [
						{
							productId: "rpi5-4gb",
							qty: 1
						},
						{
							productId: "rpi5-psu",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1
						}
					]
				}
			},
			category: "volets-rideaux",
			keywords: "serre abri jardin température aération zigbee gel"
		},
	{
			id: "porte-poulailler-automatique-connectee",
			emoji: "🐔",
			title: "Porte de poulailler automatique solaire / crépusculaire connectée",
			shortDesc: "Crépusculaire + notification si bloquée ouverte.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Guide modules connectés & Home Assistant",
			mainRole: "Module 2 canaux en mode « shutter » avec calibration automatique.",
			qtyLabel: "Poulaillers",
			meta: {
				difficulty: 4,
				time: "2 h / volet",
				tools: "Tournevis, pince, Wago, escabeau"
			},
			techOptions: [
				{
					id: "sun-only",
					label: "Ensoleillement uniquement"
				},
				{
					id: "sun-wind",
					label: "Ensoleillement + repli si vent fort"
				}
			],
			wiring: ({ tech }) => [
					'Coupez le disjoncteur du circuit store.',
					'Shelly Plus 2PM sur moteur banne (mode shutter ou relais).',
					tech === 'sun-wind'
						? 'Capteur météo Zigbee : seuil vent → rentrer le store.'
						: 'Scénario lever/coucher soleil dans Home Assistant.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-plus-2pm',
					accessories: [
						{
							productId: "weather-zigbee",
							qty: 1,
							when: ({ tech }) => tech === 'sun-wind'
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-plus-2pm',
					accessories: [
						{
							productId: "weather-zigbee",
							qty: 1,
							when: ({ tech }) => tech === 'sun-wind'
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'shelly-plus-2pm',
					accessories: [
						{
							productId: "wago-221",
							qty: 2
						}
					]
				}
			},
			category: "volets-rideaux",
			keywords: "poulailler porte automatique crépusculaire connectée"
		},
	{
			id: "robot-tondeuse-meteo-home-assistant",
			emoji: "🤖",
			title: "Robot tondeuse connecté : inhiber la tonte en cas de pluie ou gel",
			shortDesc: "Capteur météo + webhook ou intégration fabricant (Husqvarna, Worx).",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Guide modules connectés & Home Assistant",
			mainRole: "Module 2 canaux en mode « shutter » avec calibration automatique.",
			qtyLabel: "Tondeuses",
			meta: {
				difficulty: 4,
				time: "2 h / volet",
				tools: "Tournevis, pince, Wago, escabeau"
			},
			techOptions: [
				{
					id: "sun-only",
					label: "Ensoleillement uniquement"
				},
				{
					id: "sun-wind",
					label: "Ensoleillement + repli si vent fort"
				}
			],
			wiring: ({ tech }) => [
					'Coupez le disjoncteur du circuit store.',
					'Shelly Plus 2PM sur moteur banne (mode shutter ou relais).',
					tech === 'sun-wind'
						? 'Capteur météo Zigbee : seuil vent → rentrer le store.'
						: 'Scénario lever/coucher soleil dans Home Assistant.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-plus-2pm',
					accessories: [
						{
							productId: "weather-zigbee",
							qty: 1,
							when: ({ tech }) => tech === 'sun-wind'
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-plus-2pm',
					accessories: [
						{
							productId: "weather-zigbee",
							qty: 1,
							when: ({ tech }) => tech === 'sun-wind'
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'shelly-plus-2pm',
					accessories: [
						{
							productId: "wago-221",
							qty: 2
						}
					]
				}
			},
			category: "volets-rideaux",
			keywords: "robot tondeuse pluie gel home assistant météo inhibition"
		},
	{
			id: "domotiser-telerupteur-tableau-electrique",
			emoji: "⚡",
			title: "Télérupteur au tableau électrique remplacé ou domotisé (Shelly Pro 1 / ZBMINI)",
			shortDesc: "Shelly Pro 1 en télérupteur ou remplacement relais classique.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises & modules connectés pour Home Assistant",
			mainRole: "Commande derrière interrupteur ou variateur selon câblage.",
			qtyLabel: "Circuits éclairage",
			meta: {
				difficulty: 3,
				time: "45 min / point",
				tools: "Tournevis testeur, Wago"
			},
			techOptions: [
				{
					id: "at-light",
					label: "Neutre au plafonnier / DCL"
				},
				{
					id: "at-switch",
					label: "Module derrière interrupteur (avec neutre)"
				}
			],
			wiring: () => [
					'Coupez le disjoncteur — repérez navettes du va-et-vient.',
					'Module où neutre + phase sont accessibles (souvent au luminaire).',
					'Boutons muraux conservés selon mode du module.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-1-mini-gen3',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'sonoff-zbmini-l2',
					accessories: [
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'shelly-1-mini-gen3',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				}
			},
			category: "eclairage",
			keywords: "télérupteur tableau électrique shelly pro domotiser"
		},
	{
			id: "ruban-led-cuisine-detection-mouvement",
			emoji: "✨",
			title: "Ruban LED blanc chaud / RGBW sous meubles de cuisine avec détection main",
			shortDesc: "Capteur présence + alimentation 24 V ou Zigbee LED controller.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises & modules connectés pour Home Assistant",
			mainRole: "Détecteur présence + commande lumière.",
			qtyLabel: "Plans de travail",
			meta: {
				difficulty: 2,
				time: "45 min / zone",
				tools: "Piles, tournevis"
			},
			techOptions: [
				{
					id: "motion-light",
					label: "Détecteur + module éclairage"
				}
			],
			wiring: () => [
					'Placez le détecteur pour couvrir le passage.',
					'Mouvement → ON, délai sans mouvement → OFF.',
					'Réglage extinction 30 s à 5 min selon pièce.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-1-mini-gen3',
					accessories: [
						{
							productId: "aqara-motion-p2",
							qty: (m) => m
						}
					]
				},
				"ha-zigbee": {
					main: () => 'sonoff-zbmini-l2',
					accessories: [
						{
							productId: "aqara-motion-p2",
							qty: (m) => m
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						}
					]
				},
				"maker-esp32": {
					main: () => 'aqara-motion-p2',
					accessories: [
						{
							productId: "rpi5-4gb",
							qty: 1
						},
						{
							productId: "rpi5-psu",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "shelly-1-mini-gen3",
							qty: (m) => m
						}
					]
				}
			},
			category: "eclairage",
			keywords: "ruban led cuisine détection mouvement sous meuble zigbee"
		},
	{
			id: "eclairage-escalier-automatique-nuit",
			emoji: "🪜",
			title: "Balisage lumineux automatique d’escalier marche par marche la nuit",
			shortDesc: "Détecteurs par marche ou ruban LED progressif avec lux faible.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises & modules connectés pour Home Assistant",
			mainRole: "Détecteur présence + commande lumière.",
			qtyLabel: "Escaliers",
			meta: {
				difficulty: 2,
				time: "45 min / zone",
				tools: "Piles, tournevis"
			},
			techOptions: [
				{
					id: "motion-light",
					label: "Détecteur + module éclairage"
				}
			],
			wiring: () => [
					'Placez le détecteur pour couvrir le passage.',
					'Mouvement → ON, délai sans mouvement → OFF.',
					'Réglage extinction 30 s à 5 min selon pièce.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-1-mini-gen3',
					accessories: [
						{
							productId: "aqara-motion-p2",
							qty: (m) => m
						}
					]
				},
				"ha-zigbee": {
					main: () => 'sonoff-zbmini-l2',
					accessories: [
						{
							productId: "aqara-motion-p2",
							qty: (m) => m
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						}
					]
				},
				"maker-esp32": {
					main: () => 'aqara-motion-p2',
					accessories: [
						{
							productId: "rpi5-4gb",
							qty: 1
						},
						{
							productId: "rpi5-psu",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "shelly-1-mini-gen3",
							qty: (m) => m
						}
					]
				}
			},
			category: "eclairage",
			keywords: "escalier éclairage automatique nuit marche détecteur"
		},
	{
			id: "detecteur-presence-radar-mmwave",
			emoji: "📡",
			title: "Détecteur de présence radar mmWave (immobile sur canapé ou bureau)",
			shortDesc: "Aqara FP2 ou Apollo RPro — détection présence assise.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises & modules connectés pour Home Assistant",
			mainRole: "Détecteur présence + commande lumière.",
			qtyLabel: "Pièces à vivre",
			meta: {
				difficulty: 2,
				time: "45 min / zone",
				tools: "Piles, tournevis"
			},
			techOptions: [
				{
					id: "motion-light",
					label: "Détecteur + module éclairage"
				}
			],
			wiring: () => [
					'Placez le détecteur pour couvrir le passage.',
					'Mouvement → ON, délai sans mouvement → OFF.',
					'Réglage extinction 30 s à 5 min selon pièce.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-1-mini-gen3',
					accessories: [
						{
							productId: "aqara-motion-p2",
							qty: (m) => m
						}
					]
				},
				"ha-zigbee": {
					main: () => 'sonoff-zbmini-l2',
					accessories: [
						{
							productId: "aqara-motion-p2",
							qty: (m) => m
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						}
					]
				},
				"maker-esp32": {
					main: () => 'aqara-motion-p2',
					accessories: [
						{
							productId: "rpi5-4gb",
							qty: 1
						},
						{
							productId: "rpi5-psu",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "shelly-1-mini-gen3",
							qty: (m) => m
						}
					]
				}
			},
			category: "eclairage",
			keywords: "radar mmwave présence immobile aqara fp2 home assistant"
		},
	{
			id: "projecteur-exterieur-detecteur-connecte",
			emoji: "🔦",
			title: "Éclairage extérieur de façade crépusculaire et détection de mouvement",
			shortDesc: "Micromodule + détecteur ou projecteur Zigbee IP65.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises & modules connectés pour Home Assistant",
			mainRole: "Détecteur présence + commande lumière.",
			qtyLabel: "Projecteurs",
			meta: {
				difficulty: 2,
				time: "45 min / zone",
				tools: "Piles, tournevis"
			},
			techOptions: [
				{
					id: "motion-light",
					label: "Détecteur + module éclairage"
				}
			],
			wiring: () => [
					'Placez le détecteur pour couvrir le passage.',
					'Mouvement → ON, délai sans mouvement → OFF.',
					'Réglage extinction 30 s à 5 min selon pièce.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-1-mini-gen3',
					accessories: [
						{
							productId: "aqara-motion-p2",
							qty: (m) => m
						}
					]
				},
				"ha-zigbee": {
					main: () => 'sonoff-zbmini-l2',
					accessories: [
						{
							productId: "aqara-motion-p2",
							qty: (m) => m
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						}
					]
				},
				"maker-esp32": {
					main: () => 'aqara-motion-p2',
					accessories: [
						{
							productId: "rpi5-4gb",
							qty: 1
						},
						{
							productId: "rpi5-psu",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "shelly-1-mini-gen3",
							qty: (m) => m
						}
					]
				}
			},
			category: "eclairage",
			keywords: "projecteur extérieur détecteur crépusculaire zigbee shelly"
		},
	{
			id: "eclairage-circadien-biologique-home-assistant",
			emoji: "🌅",
			title: "Éclairage circadien (température de couleur automatique du matin au soir)",
			shortDesc: "Ampoules Zigbee tunable white + courbe circadienne HA.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises & modules connectés pour Home Assistant",
			mainRole: "Variateur compatible LED dimmable.",
			qtyLabel: "Pièces principales",
			meta: {
				difficulty: 3,
				time: "45 min / point",
				tools: "Tournevis testeur, Wago"
			},
			techOptions: [
				{
					id: "dimmable-led",
					label: "Spots LED dimmables"
				}
			],
			wiring: () => [
					'Coupez le disjoncteur — ampoules « dimmable » obligatoires.',
					'Branchement phase / neutre / sortie lampe.',
					'Calibration charge dans l’app Shelly.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-dimmer-2',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-dimmer-2',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'shelly-dimmer-2',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				}
			},
			category: "eclairage",
			keywords: "éclairage circadien home assistant température couleur zigbee"
		},
	{
			id: "interrupteur-mode-decouple-ampoule-zigbee",
			emoji: "🔗",
			title: "Conserver ampoules Zigbee sous tension avec interrupteur mural (mode découplé)",
			shortDesc: "Binding ZHA ou Smart Bulb mode — pas de coupure totale.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises & modules connectés pour Home Assistant",
			mainRole: "Commande derrière interrupteur ou variateur selon câblage.",
			qtyLabel: "Points lumineux",
			meta: {
				difficulty: 3,
				time: "45 min / point",
				tools: "Tournevis testeur, Wago"
			},
			techOptions: [
				{
					id: "zigbee-no-n",
					label: "Sonoff ZBMini-L2 (Zigbee, sans neutre)"
				},
				{
					id: "wifi-dimmer",
					label: "Shelly Dimmer 2 (Wi-Fi, bypass LED si besoin)"
				}
			],
			wiring: ({ tech }) => [
					'Coupez le disjoncteur — confirmez l’absence de neutre.',
					tech === 'wifi-dimmer'
						? 'Shelly Dimmer 2 + bypass si spots LED basse conso.'
						: 'Sonoff ZBMini-L2 selon schéma « no neutral ».',
					'Connexions Wago 221 pour un boîtier propre.',
				],
			recipes: {
				"wifi-sans-box": {
					main: ({ tech }) => (tech === 'wifi-dimmer' ? 'shelly-dimmer-2' : 'sonoff-zbmini-l2'),
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: ({ tech }) => (tech === 'wifi-dimmer' ? 'shelly-dimmer-2' : 'sonoff-zbmini-l2'),
					accessories: [
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'shelly-dimmer-2',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				}
			},
			category: "eclairage",
			keywords: "mode découplé ampoule zigbee interrupteur binding zha"
		},
	{
			id: "creer-va-et-vient-sans-fil-zigbee",
			emoji: "📲",
			title: "Bouton sans fil Zigbee pour créer un va-et-vient sans tirer de câble",
			shortDesc: "Sonoff SNZB-01 ou Aqara switch + module derrière lampe.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises & modules connectés pour Home Assistant",
			mainRole: "Commande derrière interrupteur ou variateur selon câblage.",
			qtyLabel: "Paires bouton / lampe",
			meta: {
				difficulty: 3,
				time: "45 min / point",
				tools: "Tournevis testeur, Wago"
			},
			techOptions: [
				{
					id: "at-light",
					label: "Neutre au plafonnier / DCL"
				},
				{
					id: "at-switch",
					label: "Module derrière interrupteur (avec neutre)"
				}
			],
			wiring: () => [
					'Coupez le disjoncteur — repérez navettes du va-et-vient.',
					'Module où neutre + phase sont accessibles (souvent au luminaire).',
					'Boutons muraux conservés selon mode du module.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-1-mini-gen3',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'sonoff-zbmini-l2',
					accessories: [
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'shelly-1-mini-gen3',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				}
			},
			category: "eclairage",
			keywords: "va et vient sans fil zigbee bouton aqara sonoff"
		},
	{
			id: "eclairage-automatique-placard-dressing",
			emoji: "👔",
			title: "Éclairage automatique de dressing ou placard à l’ouverture de porte",
			shortDesc: "Contact porte + ruban LED ou spot 12 V.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises & modules connectés pour Home Assistant",
			mainRole: "Détecteur présence + commande lumière.",
			qtyLabel: "Placards",
			meta: {
				difficulty: 2,
				time: "45 min / zone",
				tools: "Piles, tournevis"
			},
			techOptions: [
				{
					id: "motion-light",
					label: "Détecteur + module éclairage"
				}
			],
			wiring: () => [
					'Placez le détecteur pour couvrir le passage.',
					'Mouvement → ON, délai sans mouvement → OFF.',
					'Réglage extinction 30 s à 5 min selon pièce.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-1-mini-gen3',
					accessories: [
						{
							productId: "aqara-motion-p2",
							qty: (m) => m
						}
					]
				},
				"ha-zigbee": {
					main: () => 'sonoff-zbmini-l2',
					accessories: [
						{
							productId: "aqara-motion-p2",
							qty: (m) => m
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						}
					]
				},
				"maker-esp32": {
					main: () => 'aqara-motion-p2',
					accessories: [
						{
							productId: "rpi5-4gb",
							qty: 1
						},
						{
							productId: "rpi5-psu",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "shelly-1-mini-gen3",
							qty: (m) => m
						}
					]
				}
			},
			category: "eclairage",
			keywords: "placard dressing éclairage automatique porte contact led"
		},
	{
			id: "minuterie-cave-couloir-connectee",
			emoji: "⏱️",
			title: "Minuterie de cage d’escalier ou cave connectée avec préavis d’extinction",
			shortDesc: "Notification 1 min avant extinction + bouton prolongation.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises & modules connectés pour Home Assistant",
			mainRole: "Détecteur présence + commande lumière.",
			qtyLabel: "Circulations",
			meta: {
				difficulty: 2,
				time: "45 min / zone",
				tools: "Piles, tournevis"
			},
			techOptions: [
				{
					id: "motion-light",
					label: "Détecteur + module éclairage"
				}
			],
			wiring: () => [
					'Placez le détecteur pour couvrir le passage.',
					'Mouvement → ON, délai sans mouvement → OFF.',
					'Réglage extinction 30 s à 5 min selon pièce.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-1-mini-gen3',
					accessories: [
						{
							productId: "aqara-motion-p2",
							qty: (m) => m
						}
					]
				},
				"ha-zigbee": {
					main: () => 'sonoff-zbmini-l2',
					accessories: [
						{
							productId: "aqara-motion-p2",
							qty: (m) => m
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						}
					]
				},
				"maker-esp32": {
					main: () => 'aqara-motion-p2',
					accessories: [
						{
							productId: "rpi5-4gb",
							qty: 1
						},
						{
							productId: "rpi5-psu",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "shelly-1-mini-gen3",
							qty: (m) => m
						}
					]
				}
			},
			category: "eclairage",
			keywords: "minuterie cave couloir connectée préavis extinction"
		},
	{
			id: "simulation-presence-eclairage-vacances",
			emoji: "🏖️",
			title: "Simulation de présence lumineuse réaliste pendant les vacances",
			shortDesc: "Scénarios aléatoires multi-pièces + volets partiels.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises & modules connectés pour Home Assistant",
			mainRole: "Variateur compatible LED dimmable.",
			qtyLabel: "Pièces simulées",
			meta: {
				difficulty: 3,
				time: "45 min / point",
				tools: "Tournevis testeur, Wago"
			},
			techOptions: [
				{
					id: "dimmable-led",
					label: "Spots LED dimmables"
				}
			],
			wiring: () => [
					'Coupez le disjoncteur — ampoules « dimmable » obligatoires.',
					'Branchement phase / neutre / sortie lampe.',
					'Calibration charge dans l’app Shelly.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-dimmer-2',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-dimmer-2',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'shelly-dimmer-2',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				}
			},
			category: "eclairage",
			keywords: "simulation présence vacances éclairage aléatoire home assistant"
		},
	{
			id: "eclairage-salle-de-bain-mode-nuit",
			emoji: "🛁",
			title: "Éclairage de miroir de salle de bain anti-éblouissement nocturne",
			shortDesc: "Variation 5 % la nuit + motion faible lux.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises & modules connectés pour Home Assistant",
			mainRole: "Variateur compatible LED dimmable.",
			qtyLabel: "Salles de bain",
			meta: {
				difficulty: 3,
				time: "45 min / point",
				tools: "Tournevis testeur, Wago"
			},
			techOptions: [
				{
					id: "dimmable-led",
					label: "Spots LED dimmables"
				}
			],
			wiring: () => [
					'Coupez le disjoncteur — ampoules « dimmable » obligatoires.',
					'Branchement phase / neutre / sortie lampe.',
					'Calibration charge dans l’app Shelly.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-dimmer-2',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-dimmer-2',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'shelly-dimmer-2',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				}
			},
			category: "eclairage",
			keywords: "salle de bain miroir éclairage nuit dimmer motion"
		},
	{
			id: "eclairage-jardin-basse-tension-connecte",
			emoji: "🌳",
			title: "Éclairage de terrasse et jardin basse tension 12 V / 24 V connecté",
			shortDesc: "Relais sur transformateur + crépusculaire ou Zigbee driver LED.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises & modules connectés pour Home Assistant",
			mainRole: "Détecteur présence + commande lumière.",
			qtyLabel: "Circuits BT",
			meta: {
				difficulty: 2,
				time: "45 min / zone",
				tools: "Piles, tournevis"
			},
			techOptions: [
				{
					id: "motion-light",
					label: "Détecteur + module éclairage"
				}
			],
			wiring: () => [
					'Placez le détecteur pour couvrir le passage.',
					'Mouvement → ON, délai sans mouvement → OFF.',
					'Réglage extinction 30 s à 5 min selon pièce.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-1-mini-gen3',
					accessories: [
						{
							productId: "aqara-motion-p2",
							qty: (m) => m
						}
					]
				},
				"ha-zigbee": {
					main: () => 'sonoff-zbmini-l2',
					accessories: [
						{
							productId: "aqara-motion-p2",
							qty: (m) => m
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						}
					]
				},
				"maker-esp32": {
					main: () => 'aqara-motion-p2',
					accessories: [
						{
							productId: "rpi5-4gb",
							qty: 1
						},
						{
							productId: "rpi5-psu",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "shelly-1-mini-gen3",
							qty: (m) => m
						}
					]
				}
			},
			category: "eclairage",
			keywords: "jardin basse tension 12v 24v connecté shelly relais"
		},
	{
			id: "piloter-climatisation-pac-air-air",
			emoji: "❄️",
			title: "Climatisation réversible / PAC air-air pilotée par infrarouge ou Wi-Fi local",
			shortDesc: "Broadlink RM4 ou intégration API locale + sonde pièce.",
			tutorialHref: "/domotique/capteur-temperature-zigbee/",
			tutorialLabel: "Capteurs température Zigbee & automatisations",
			mainRole: "Relais sur entrée thermostat chaudière.",
			qtyLabel: "Splits / PAC",
			meta: {
				difficulty: 4,
				time: "2 h",
				tools: "Tournevis — électricien si doute"
			},
			techOptions: [
				{
					id: "dry-contact",
					label: "Bornier contact sec chaudière (RT)"
				}
			],
			wiring: () => [
					'Coupez alimentation chaudière — lisez le schéma thermostat.',
					'Shelly en contact sec uniquement sur entrée RT.',
					'Sonde SNZB-02D : consigne dans Home Assistant.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-1-mini-gen3',
					accessories: [
						{
							productId: "sonoff-snzb-02d",
							qty: 1
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-1-mini-gen3',
					accessories: [
						{
							productId: "sonoff-snzb-02d",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'esp32-devkit',
					mainQty: () => 1,
					mainNote: () => 'ESP32 + relais + BME280 ou Zigbee.',
					accessories: [
						{
							productId: "relay-3v3",
							qty: 1
						},
						{
							productId: "bme280-module",
							qty: 1
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				}
			},
			category: "chauffage-vmc",
			keywords: "climatisation pac air air home assistant broadlink wifi local"
		},
	{
			id: "connecter-poele-a-granules",
			emoji: "🔥",
			title: "Poêle à granulés connecté par contact sec ou module dédié",
			shortDesc: "Shelly sur thermostat poêle + sonde ambiante.",
			tutorialHref: "/domotique/capteur-temperature-zigbee/",
			tutorialLabel: "Capteurs température Zigbee & automatisations",
			mainRole: "Relais sur entrée thermostat chaudière.",
			qtyLabel: "Poêles",
			meta: {
				difficulty: 4,
				time: "2 h",
				tools: "Tournevis — électricien si doute"
			},
			techOptions: [
				{
					id: "dry-contact",
					label: "Bornier contact sec chaudière (RT)"
				}
			],
			wiring: () => [
					'Coupez alimentation chaudière — lisez le schéma thermostat.',
					'Shelly en contact sec uniquement sur entrée RT.',
					'Sonde SNZB-02D : consigne dans Home Assistant.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-1-mini-gen3',
					accessories: [
						{
							productId: "sonoff-snzb-02d",
							qty: 1
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-1-mini-gen3',
					accessories: [
						{
							productId: "sonoff-snzb-02d",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'esp32-devkit',
					mainQty: () => 1,
					mainNote: () => 'ESP32 + relais + BME280 ou Zigbee.',
					accessories: [
						{
							productId: "relay-3v3",
							qty: 1
						},
						{
							productId: "bme280-module",
							qty: 1
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				}
			},
			category: "chauffage-vmc",
			keywords: "poêle granulés pellets contact sec shelly thermostat"
		},
	{
			id: "plancher-chauffant-hydraulique-connecte",
			emoji: "🌡️",
			title: "Plancher chauffant hydraulique : piloter les actionneurs de collecteur (nourrice)",
			shortDesc: "Têtes ou servomoteurs 230 V par zone + sonde pièce.",
			tutorialHref: "/domotique/capteur-temperature-zigbee/",
			tutorialLabel: "Capteurs température Zigbee & automatisations",
			mainRole: "Une tête ou relais par radiateur + sonde de référence pièce.",
			qtyLabel: "Zones plancher",
			meta: {
				difficulty: 3,
				time: "30 min / pièce",
				tools: "Piles AAA, tournevis"
			},
			techOptions: [
				{
					id: "radiator-water",
					label: "Radiateurs à eau (vannes M30)"
				}
			],
			wiring: () => [
					'Sur radiateur à eau : vissez la tête thermostatique après avoir retiré l’ancienne tête mécanique.',
					'Placez une sonde température à hauteur d’habillage, loin du radiateur direct.',
					'Créez une automatisation « consigne −1 °C la nuit » dans l’app ou Home Assistant.',
				],
			recipes: {
				"wifi-sans-box": {
					main: ({ tech }) => (tech === 'radiator-electric' ? 'shelly-plug-s-gen3' : 'aqara-thermostat-t1'),
					accessories: [
						{
							productId: "sonoff-snzb-02d",
							qty: (m) => Math.max(1, Math.ceil(m / 2)),
							note: "Sonde de référence pièce."
						}
					]
				},
				"ha-zigbee": {
					main: ({ tech }) => (tech === 'radiator-electric' ? 'shelly-plug-s-gen3' : 'aqara-thermostat-t1'),
					accessories: [
						{
							productId: "sonoff-snzb-02d",
							qty: (m) => Math.max(1, Math.ceil(m / 2))
						},
						{
							productId: "zbdongle-e",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'sonoff-snzb-02d',
					mainNote: () => 'Capteurs Zigbee + box locale — têtes Aqara en option.',
					accessories: [
						{
							productId: "rpi5-4gb",
							qty: 1
						},
						{
							productId: "rpi5-psu",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1
						}
					],
					metaAdjust: () => ({ difficulty: 4, time: '3 h' })
				}
			},
			category: "chauffage-vmc",
			keywords: "plancher chauffant hydraulique collecteur servomoteur zigbee"
		},
	{
			id: "thermostat-plancher-chauffant-electrique",
			emoji: "♨️",
			title: "Plancher chauffant électrique : thermostat connecté avec sonde de sol NTC",
			shortDesc: "Regulation sonde sol + fil pilote ou contacteur.",
			tutorialHref: "/domotique/piloter-chauffage-electrique-fil-pilote-zigbee-shelly-home-assistant/",
			tutorialLabel: "Fil pilote Zigbee / Shelly & Versatile Thermostat",
			mainRole: "Commutation phase + ordre fil pilote (Arrêt / Hors-gel) + sonde pièce.",
			qtyLabel: "Zones",
			meta: {
				difficulty: 4,
				time: "2 h / radiateur",
				tools: "Tournevis, multimètre, Wago — électricien si doute"
			},
			techOptions: [
				{
					id: "diode-shelly",
					label: "Shelly Plus 1PM + diode 1N4007 (2 ordres)"
				},
				{
					id: "module-fp-zigbee",
					label: "Module fil pilote Zigbee 4/6 ordres (sans diode)"
				}
			],
			wiring: ({ tech }) => [
					'Coupez le disjoncteur du radiateur — contrôle VAT.',
					tech === 'module-fp-zigbee'
						? 'Module fil pilote sur L, N et fil pilote noir radiateur — respecter les 6 fils de la notice.'
						: 'Sortie Shelly vers anode 1N4007, cathode vers fil pilote noir (ordre Arrêt / Hors-gel).',
					'Sonde SNZB-02D ou Zigbee dans Versatile Thermostat pour la consigne pièce.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-plus-1pm',
					accessories: [
						{
							productId: "sonoff-snzb-02d",
							qty: (m) => Math.max(1, Math.ceil(m / 2)),
							note: "Sonde pièce pour consigne."
						},
						{
							productId: "wago-221",
							qty: 1,
							note: "Inclure diode 1N4007 en série fil pilote si montage Shelly."
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-plus-1pm',
					accessories: [
						{
							productId: "sonoff-snzb-02d",
							qty: (m) => Math.max(1, Math.ceil(m / 2))
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							when: ({ eco }) => eco === 'ha-zigbee'
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'esp32-devkit',
					mainNote: () => 'ESP32 + relais SSR fil pilote — réservé experts.',
					accessories: [
						{
							productId: "relay-3v3",
							qty: 1
						},
						{
							productId: "bme280-module",
							qty: 1
						},
						{
							productId: "wago-221",
							qty: 1
						}
					],
					metaAdjust: () => ({ difficulty: 5, time: '3 h' })
				}
			},
			category: "chauffage-vmc",
			keywords: "plancher chauffant électrique sonde sol ntc thermostat"
		},
	{
			id: "seche-serviettes-connecte-programmation",
			emoji: "🛁",
			title: "Sèche-serviettes salle de bain : programmation boost avant la douche",
			shortDesc: "Prise connectée ou fil pilote + bouton douche / motion.",
			tutorialHref: "/domotique/piloter-chauffage-electrique-fil-pilote-zigbee-shelly-home-assistant/",
			tutorialLabel: "Fil pilote Zigbee / Shelly & Versatile Thermostat",
			mainRole: "Commutation phase + ordre fil pilote (Arrêt / Hors-gel) + sonde pièce.",
			qtyLabel: "Sèche-serviettes",
			meta: {
				difficulty: 4,
				time: "2 h / radiateur",
				tools: "Tournevis, multimètre, Wago — électricien si doute"
			},
			techOptions: [
				{
					id: "diode-shelly",
					label: "Shelly Plus 1PM + diode 1N4007 (2 ordres)"
				},
				{
					id: "module-fp-zigbee",
					label: "Module fil pilote Zigbee 4/6 ordres (sans diode)"
				}
			],
			wiring: ({ tech }) => [
					'Coupez le disjoncteur du radiateur — contrôle VAT.',
					tech === 'module-fp-zigbee'
						? 'Module fil pilote sur L, N et fil pilote noir radiateur — respecter les 6 fils de la notice.'
						: 'Sortie Shelly vers anode 1N4007, cathode vers fil pilote noir (ordre Arrêt / Hors-gel).',
					'Sonde SNZB-02D ou Zigbee dans Versatile Thermostat pour la consigne pièce.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-plus-1pm',
					accessories: [
						{
							productId: "sonoff-snzb-02d",
							qty: (m) => Math.max(1, Math.ceil(m / 2)),
							note: "Sonde pièce pour consigne."
						},
						{
							productId: "wago-221",
							qty: 1,
							note: "Inclure diode 1N4007 en série fil pilote si montage Shelly."
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-plus-1pm',
					accessories: [
						{
							productId: "sonoff-snzb-02d",
							qty: (m) => Math.max(1, Math.ceil(m / 2))
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							when: ({ eco }) => eco === 'ha-zigbee'
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'esp32-devkit',
					mainNote: () => 'ESP32 + relais SSR fil pilote — réservé experts.',
					accessories: [
						{
							productId: "relay-3v3",
							qty: 1
						},
						{
							productId: "bme280-module",
							qty: 1
						},
						{
							productId: "wago-221",
							qty: 1
						}
					],
					metaAdjust: () => ({ difficulty: 5, time: '3 h' })
				}
			},
			category: "chauffage-vmc",
			keywords: "sèche serviettes connecté programmation douche shelly"
		},
	{
			id: "couper-chauffage-fenetre-ouverte",
			emoji: "🪟",
			title: "Coupure automatique du chauffage lorsqu’une fenêtre est ouverte",
			shortDesc: "Capteurs contact + baisse consigne ou coupure radiateur.",
			tutorialHref: "/domotique/capteur-temperature-zigbee/",
			tutorialLabel: "Capteurs température Zigbee & automatisations",
			mainRole: "Une tête ou relais par radiateur + sonde de référence pièce.",
			qtyLabel: "Pièces / fenêtres",
			meta: {
				difficulty: 3,
				time: "30 min / pièce",
				tools: "Piles AAA, tournevis"
			},
			techOptions: [
				{
					id: "radiator-water",
					label: "Radiateurs à eau (vannes M30)"
				}
			],
			wiring: () => [
					'Sur radiateur à eau : vissez la tête thermostatique après avoir retiré l’ancienne tête mécanique.',
					'Placez une sonde température à hauteur d’habillage, loin du radiateur direct.',
					'Créez une automatisation « consigne −1 °C la nuit » dans l’app ou Home Assistant.',
				],
			recipes: {
				"wifi-sans-box": {
					main: ({ tech }) => (tech === 'radiator-electric' ? 'shelly-plug-s-gen3' : 'aqara-thermostat-t1'),
					accessories: [
						{
							productId: "sonoff-snzb-02d",
							qty: (m) => Math.max(1, Math.ceil(m / 2)),
							note: "Sonde de référence pièce."
						}
					]
				},
				"ha-zigbee": {
					main: ({ tech }) => (tech === 'radiator-electric' ? 'shelly-plug-s-gen3' : 'aqara-thermostat-t1'),
					accessories: [
						{
							productId: "sonoff-snzb-02d",
							qty: (m) => Math.max(1, Math.ceil(m / 2))
						},
						{
							productId: "zbdongle-e",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'sonoff-snzb-02d',
					mainNote: () => 'Capteurs Zigbee + box locale — têtes Aqara en option.',
					accessories: [
						{
							productId: "rpi5-4gb",
							qty: 1
						},
						{
							productId: "rpi5-psu",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1
						}
					],
					metaAdjust: () => ({ difficulty: 4, time: '3 h' })
				}
			},
			category: "chauffage-vmc",
			keywords: "fenêtre ouverte couper chauffage aqara thermostat"
		},
	{
			id: "circulateur-bouclage-ecs-connecte",
			emoji: "🚿",
			title: "Bouclage d’eau chaude sanitaire sur détection de présence salle de bain",
			shortDesc: "Relais circulateur + motion ou bouton boost.",
			tutorialHref: "/domotique/capteur-temperature-zigbee/",
			tutorialLabel: "Capteurs température Zigbee & automatisations",
			mainRole: "Hygrométrie + relais extracteur.",
			qtyLabel: "Circuits ECS",
			meta: {
				difficulty: 3,
				time: "30 min / pièce",
				tools: "Piles AAA, tournevis"
			},
			techOptions: [
				{
					id: "extract-standalone",
					label: "Extracteur ou VMC commandée"
				}
			],
			wiring: () => [
					'Sonde à hauteur, loin du jet de douche direct.',
					'Relais sur circuit extracteur.',
					'Seuil 70 % ON, 55 % OFF avec anti-rebond.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-plus-1pm',
					accessories: [
						{
							productId: "sonoff-snzb-02d",
							qty: (m) => m
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-plus-1pm',
					accessories: [
						{
							productId: "sonoff-snzb-02d",
							qty: (m) => m
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'sonoff-snzb-02d',
					accessories: [
						{
							productId: "shelly-plus-1pm",
							qty: (m) => m
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				}
			},
			category: "chauffage-vmc",
			keywords: "bouclage ecs circulateur présence salle de bain shelly"
		},
	{
			id: "capteur-co2-qualite-air-interieur",
			emoji: "🌬️",
			title: "Capteur de CO2, COV et humidité pour alerte d’aération chambre / bureau",
			shortDesc: "Aranet4 / Zigbee CO2 + automation VMC ou fenêtre.",
			tutorialHref: "/domotique/capteur-temperature-zigbee/",
			tutorialLabel: "Capteur température Zigbee (guide complet)",
			mainRole: "Sondes sans fil + seuils d’alerte.",
			qtyLabel: "Pièces surveillées",
			meta: {
				difficulty: 2,
				time: "20 min / zone",
				tools: "Piles, ruban adhésif"
			},
			techOptions: [
				{
					id: "indoor-room",
					label: "SONOFF SNZB-02D (Zigbee)"
				},
				{
					id: "cold-storage",
					label: "Congélateur / cave (longue autonomie)"
				}
			],
			wiring: () => [
					'Fixez la sonde à l’air libre (pas contre un mur chauffant).',
					'Définissez une alerte si T° ou hygrométrie sort des seuils.',
					'Pour congélateur : testez d’abord la portée radio avant collage définitif.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'sonoff-snzb-02d',
					accessories: []
				},
				"ha-zigbee": {
					main: () => 'sonoff-snzb-02d',
					accessories: [
						{
							productId: "zbdongle-e",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'sonoff-snzb-02d',
					accessories: [
						{
							productId: "rpi5-4gb",
							qty: 1
						},
						{
							productId: "rpi5-psu",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1
						}
					]
				}
			},
			category: "chauffage-vmc",
			keywords: "co2 cov qualité air intérieur capteur zigbee vmc"
		},
	{
			id: "deshumidificateur-automatique-cave-buanderie",
			emoji: "💧",
			title: "Déshumidificateur électrique piloté automatiquement par hygromètre Zigbee",
			shortDesc: "Prise connectée + SNZB-02D seuil 65 % ON / 55 % OFF.",
			tutorialHref: "/domotique/capteur-temperature-zigbee/",
			tutorialLabel: "Capteurs température Zigbee & automatisations",
			mainRole: "Hygrométrie + relais extracteur.",
			qtyLabel: "Caves / buanderies",
			meta: {
				difficulty: 3,
				time: "30 min / pièce",
				tools: "Piles AAA, tournevis"
			},
			techOptions: [
				{
					id: "extract-standalone",
					label: "Extracteur ou VMC commandée"
				}
			],
			wiring: () => [
					'Sonde à hauteur, loin du jet de douche direct.',
					'Relais sur circuit extracteur.',
					'Seuil 70 % ON, 55 % OFF avec anti-rebond.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-plus-1pm',
					accessories: [
						{
							productId: "sonoff-snzb-02d",
							qty: (m) => m
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-plus-1pm',
					accessories: [
						{
							productId: "sonoff-snzb-02d",
							qty: (m) => m
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'sonoff-snzb-02d',
					accessories: [
						{
							productId: "shelly-plus-1pm",
							qty: (m) => m
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				}
			},
			category: "chauffage-vmc",
			keywords: "déshumidificateur cave hygromètre zigbee prise connectée"
		},
	{
			id: "ventilateur-automatique-temperature-ete",
			emoji: "🌀",
			title: "Ventilateur de plafond ou sur pied asservi à la température de la chambre",
			shortDesc: "Prise connectée + sonde > 24 °C la nuit.",
			tutorialHref: "/domotique/capteur-temperature-zigbee/",
			tutorialLabel: "Capteurs température Zigbee & automatisations",
			mainRole: "Hygrométrie + relais extracteur.",
			qtyLabel: "Ventilateurs",
			meta: {
				difficulty: 3,
				time: "30 min / pièce",
				tools: "Piles AAA, tournevis"
			},
			techOptions: [
				{
					id: "extract-standalone",
					label: "Extracteur ou VMC commandée"
				}
			],
			wiring: () => [
					'Sonde à hauteur, loin du jet de douche direct.',
					'Relais sur circuit extracteur.',
					'Seuil 70 % ON, 55 % OFF avec anti-rebond.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-plus-1pm',
					accessories: [
						{
							productId: "sonoff-snzb-02d",
							qty: (m) => m
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-plus-1pm',
					accessories: [
						{
							productId: "sonoff-snzb-02d",
							qty: (m) => m
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'sonoff-snzb-02d',
					accessories: [
						{
							productId: "shelly-plus-1pm",
							qty: (m) => m
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				}
			},
			category: "chauffage-vmc",
			keywords: "ventilateur automatique température chambre prise connectée"
		},
	{
			id: "chauffage-hors-gel-residence-secondaire",
			emoji: "🏔️",
			title: "Hors-gel intelligent de résidence secondaire avec suivi à distance",
			shortDesc: "Sonde + consigne minimale + alerte panne.",
			tutorialHref: "/domotique/capteur-temperature-zigbee/",
			tutorialLabel: "Capteur température Zigbee (guide complet)",
			mainRole: "Sondes sans fil + seuils d’alerte.",
			qtyLabel: "Logements secondaires",
			meta: {
				difficulty: 2,
				time: "20 min / zone",
				tools: "Piles, ruban adhésif"
			},
			techOptions: [
				{
					id: "indoor-room",
					label: "SONOFF SNZB-02D (Zigbee)"
				},
				{
					id: "cold-storage",
					label: "Congélateur / cave (longue autonomie)"
				}
			],
			wiring: () => [
					'Fixez la sonde à l’air libre (pas contre un mur chauffant).',
					'Définissez une alerte si T° ou hygrométrie sort des seuils.',
					'Pour congélateur : testez d’abord la portée radio avant collage définitif.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'sonoff-snzb-02d',
					accessories: []
				},
				"ha-zigbee": {
					main: () => 'sonoff-snzb-02d',
					accessories: [
						{
							productId: "zbdongle-e",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'sonoff-snzb-02d',
					accessories: [
						{
							productId: "rpi5-4gb",
							qty: 1
						},
						{
							productId: "rpi5-psu",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1
						}
					]
				}
			},
			category: "chauffage-vmc",
			keywords: "hors gel résidence secondaire surveillance température distance"
		},
	{
			id: "chauffage-multizone-sonde-deportee",
			emoji: "🏠",
			title: "Thermostat multi-zones avec équilibrage des pièces froides / chaudes",
			shortDesc: "Versatile Thermostat + sondes Zigbee par pièce.",
			tutorialHref: "/domotique/capteur-temperature-zigbee/",
			tutorialLabel: "Capteurs température Zigbee & automatisations",
			mainRole: "Une tête ou relais par radiateur + sonde de référence pièce.",
			qtyLabel: "Zones",
			meta: {
				difficulty: 3,
				time: "30 min / pièce",
				tools: "Piles AAA, tournevis"
			},
			techOptions: [
				{
					id: "radiator-water",
					label: "Radiateurs à eau (vannes M30)"
				}
			],
			wiring: () => [
					'Sur radiateur à eau : vissez la tête thermostatique après avoir retiré l’ancienne tête mécanique.',
					'Placez une sonde température à hauteur d’habillage, loin du radiateur direct.',
					'Créez une automatisation « consigne −1 °C la nuit » dans l’app ou Home Assistant.',
				],
			recipes: {
				"wifi-sans-box": {
					main: ({ tech }) => (tech === 'radiator-electric' ? 'shelly-plug-s-gen3' : 'aqara-thermostat-t1'),
					accessories: [
						{
							productId: "sonoff-snzb-02d",
							qty: (m) => Math.max(1, Math.ceil(m / 2)),
							note: "Sonde de référence pièce."
						}
					]
				},
				"ha-zigbee": {
					main: ({ tech }) => (tech === 'radiator-electric' ? 'shelly-plug-s-gen3' : 'aqara-thermostat-t1'),
					accessories: [
						{
							productId: "sonoff-snzb-02d",
							qty: (m) => Math.max(1, Math.ceil(m / 2))
						},
						{
							productId: "zbdongle-e",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'sonoff-snzb-02d',
					mainNote: () => 'Capteurs Zigbee + box locale — têtes Aqara en option.',
					accessories: [
						{
							productId: "rpi5-4gb",
							qty: 1
						},
						{
							productId: "rpi5-psu",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1
						}
					],
					metaAdjust: () => ({ difficulty: 4, time: '3 h' })
				}
			},
			category: "chauffage-vmc",
			keywords: "multizone chauffage sonde déportée versatile thermostat"
		},
	{
			id: "filtration-piscine-temperature-eau-connectee",
			emoji: "🏊",
			title: "Pompe à chaleur piscine et filtration asservies à la température de l’eau",
			shortDesc: "Sonde température + contact sec pompe / PAC piscine.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises connectées & suivi conso",
			mainRole: "Commande contacteur HC + mesure puissance.",
			qtyLabel: "Bassins",
			meta: {
				difficulty: 4,
				time: "2 h",
				tools: "Gants, testeur"
			},
			techOptions: [
				{
					id: "hc-grid",
					label: "Heures Creuses classiques"
				},
				{
					id: "solar-surplus",
					label: "Surplus photovoltaïque"
				}
			],
			wiring: () => [
					'Coupure générale — bobine contacteur eau chaude.',
					'Shelly Plus 1PM selon schéma validé par électricien.',
					'Automatisation plages HC ou injection solaire.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-plus-1pm',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-plus-1pm',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'shelly-plus-1pm',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				}
			},
			category: "chauffage-vmc",
			keywords: "piscine filtration température eau pompe connectée shelly"
		},
	{
			id: "routeur-solaire-surplus-chauffe-eau",
			emoji: "☀️",
			title: "Routeur solaire / délestage vers chauffe-eau en cas de surplus photovoltaïque",
			shortDesc: "Shelly 3EM + contacteur ballon ou routeur Shelly.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises connectées & suivi conso",
			mainRole: "Commande contacteur HC + mesure puissance.",
			qtyLabel: "Installations PV",
			meta: {
				difficulty: 4,
				time: "2 h",
				tools: "Gants, testeur"
			},
			techOptions: [
				{
					id: "hc-grid",
					label: "Heures Creuses classiques"
				},
				{
					id: "solar-surplus",
					label: "Surplus photovoltaïque"
				}
			],
			wiring: () => [
					'Coupure générale — bobine contacteur eau chaude.',
					'Shelly Plus 1PM selon schéma validé par électricien.',
					'Automatisation plages HC ou injection solaire.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-plus-1pm',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-plus-1pm',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'shelly-plus-1pm',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				}
			},
			category: "energie-conso",
			keywords: "routeur solaire surplus photovoltaïque chauffe eau shelly"
		},
	{
			id: "suivre-production-kit-solaire-balcon",
			emoji: "🌞",
			title: "Suivi de production kit solaire plug & play (panneau de balcon) sur prise connectée",
			shortDesc: "Prise mesure injection négative ou capteur clamp micro-onduleur.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises connectées & suivi conso",
			mainRole: "Prise mesure de puissance.",
			qtyLabel: "Kits balcon",
			meta: {
				difficulty: 2,
				time: "15 min",
				tools: "Aucun"
			},
			techOptions: [
				{
					id: "shelly-plug",
					label: "Shelly Plug S Gen3"
				},
				{
					id: "tapo-plug",
					label: "Tapo P110"
				}
			],
			wiring: () => [
					'Prise entre mur et appareil (respectez Imax).',
					'Relevez la puissance pendant un cycle.',
					'Puissance < 3 W pendant 2 min → notification.',
				],
			recipes: {
				"wifi-sans-box": {
					main: ({ tech }) => (tech === 'tapo-plug' ? 'tapo-p110' : 'shelly-plug-s-gen3')
				},
				"ha-zigbee": {
					main: ({ tech }) => (tech === 'tapo-plug' ? 'tapo-p110' : 'shelly-plug-s-gen3')
				},
				"maker-esp32": {
					main: () => 'shelly-plug-s-gen3'
				}
			},
			category: "energie-conso",
			keywords: "panneau solaire balcon plug play suivi production prise connectée"
		},
	{
			id: "delestage-electrique-automatique-linky",
			emoji: "⚡",
			title: "Délestage électrique intelligent pour éviter de faire disjoncter l’abonnement Linky",
			shortDesc: "Shelly 3EM + coupure prises prioritaires si puissance max.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises connectées & suivi conso",
			mainRole: "Mesure globale + suivi injection.",
			qtyLabel: "Circuits délestables",
			meta: {
				difficulty: 4,
				time: "2 h",
				tools: "Tournevis isolé, testeur, gants"
			},
			techOptions: [
				{
					id: "din-global",
					label: "Compteur rail DIN arrivée générale"
				},
				{
					id: "tri",
					label: "Triphasé (3 pinces)"
				}
			],
			wiring: () => [
					'Coupure générale — clipsez le 3EM sur rail DIN.',
					'Pinces sur câbles d’arrivée (sens respecté).',
					'Courbes conso + production dans Home Assistant.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-pro-3em',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-pro-3em',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'shelly-pro-3em',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				}
			},
			category: "energie-conso",
			keywords: "délestage linky abonnement disjonction shelly 3em"
		},
	{
			id: "prise-renforcee-recharge-voiture-heures-creuses",
			emoji: "🔌",
			title: "Borne de recharge véhicule électrique / prise renforcée Green’Up pilotée en heures creuses",
			shortDesc: "Contact sec ou prise connectée selon borne — plages HC.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises connectées & suivi conso",
			mainRole: "Commande contacteur HC + mesure puissance.",
			qtyLabel: "Points de charge",
			meta: {
				difficulty: 4,
				time: "2 h",
				tools: "Gants, testeur"
			},
			techOptions: [
				{
					id: "hc-grid",
					label: "Heures Creuses classiques"
				},
				{
					id: "solar-surplus",
					label: "Surplus photovoltaïque"
				}
			],
			wiring: () => [
					'Coupure générale — bobine contacteur eau chaude.',
					'Shelly Plus 1PM selon schéma validé par électricien.',
					'Automatisation plages HC ou injection solaire.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-plus-1pm',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-plus-1pm',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'shelly-plus-1pm',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				}
			},
			category: "energie-conso",
			keywords: "recharge voiture électrique heures creuses green up shelly"
		},
	{
			id: "alerte-fin-seche-linge-lave-vaisselle",
			emoji: "🍽️",
			title: "Alerte de fin de cycle sèche-linge et lave-vaisselle par mesure de puissance",
			shortDesc: "Même principe que lave-linge : < 3 W pendant 2 min.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises connectées & suivi conso",
			mainRole: "Prise mesure de puissance.",
			qtyLabel: "Appareils",
			meta: {
				difficulty: 2,
				time: "15 min",
				tools: "Aucun"
			},
			techOptions: [
				{
					id: "shelly-plug",
					label: "Shelly Plug S Gen3"
				},
				{
					id: "tapo-plug",
					label: "Tapo P110"
				}
			],
			wiring: () => [
					'Prise entre mur et appareil (respectez Imax).',
					'Relevez la puissance pendant un cycle.',
					'Puissance < 3 W pendant 2 min → notification.',
				],
			recipes: {
				"wifi-sans-box": {
					main: ({ tech }) => (tech === 'tapo-plug' ? 'tapo-p110' : 'shelly-plug-s-gen3')
				},
				"ha-zigbee": {
					main: ({ tech }) => (tech === 'tapo-plug' ? 'tapo-p110' : 'shelly-plug-s-gen3')
				},
				"maker-esp32": {
					main: () => 'shelly-plug-s-gen3'
				}
			},
			category: "energie-conso",
			keywords: "sèche linge lave vaisselle fin cycle alerte prise connectée"
		},
	{
			id: "compteur-eau-connecte-impulsions",
			emoji: "🚰",
			title: "Compteur d’eau connecté par capteur d’impulsions sur compteur divisionnaire",
			shortDesc: "Impulse meter + ESPHome ou compteur Zigbee.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises connectées & suivi conso",
			mainRole: "Prise mesure de puissance.",
			qtyLabel: "Compteurs",
			meta: {
				difficulty: 2,
				time: "15 min",
				tools: "Aucun"
			},
			techOptions: [
				{
					id: "shelly-plug",
					label: "Shelly Plug S Gen3"
				},
				{
					id: "tapo-plug",
					label: "Tapo P110"
				}
			],
			wiring: () => [
					'Prise entre mur et appareil (respectez Imax).',
					'Relevez la puissance pendant un cycle.',
					'Puissance < 3 W pendant 2 min → notification.',
				],
			recipes: {
				"wifi-sans-box": {
					main: ({ tech }) => (tech === 'tapo-plug' ? 'tapo-p110' : 'shelly-plug-s-gen3')
				},
				"ha-zigbee": {
					main: ({ tech }) => (tech === 'tapo-plug' ? 'tapo-p110' : 'shelly-plug-s-gen3')
				},
				"maker-esp32": {
					main: () => 'shelly-plug-s-gen3'
				}
			},
			category: "energie-conso",
			keywords: "compteur eau impulsions esphome home assistant fuite"
		},
	{
			id: "niveau-cuve-eau-pluie-ultrason",
			emoji: "🛢️",
			title: "Compteur gaz (Gazpar) ou suivi de niveau de cuve fioul / eau de pluie par ultrason",
			shortDesc: "Capteur niveau ultrason + alerte seuil bas.",
			tutorialHref: "/domotique/capteur-temperature-zigbee/",
			tutorialLabel: "Capteur température Zigbee (guide complet)",
			mainRole: "Sondes sans fil + seuils d’alerte.",
			qtyLabel: "Cuves",
			meta: {
				difficulty: 2,
				time: "20 min / zone",
				tools: "Piles, ruban adhésif"
			},
			techOptions: [
				{
					id: "indoor-room",
					label: "SONOFF SNZB-02D (Zigbee)"
				},
				{
					id: "cold-storage",
					label: "Congélateur / cave (longue autonomie)"
				}
			],
			wiring: () => [
					'Fixez la sonde à l’air libre (pas contre un mur chauffant).',
					'Définissez une alerte si T° ou hygrométrie sort des seuils.',
					'Pour congélateur : testez d’abord la portée radio avant collage définitif.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'sonoff-snzb-02d',
					accessories: []
				},
				"ha-zigbee": {
					main: () => 'sonoff-snzb-02d',
					accessories: [
						{
							productId: "zbdongle-e",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'sonoff-snzb-02d',
					accessories: [
						{
							productId: "rpi5-4gb",
							qty: 1
						},
						{
							productId: "rpi5-psu",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1
						}
					]
				}
			},
			category: "energie-conso",
			keywords: "cuve eau pluie fioul niveau ultrason capteur zigbee"
		},
	{
			id: "automatisation-edf-tempo-jours-rouges",
			emoji: "📊",
			title: "Optimisation Tempo EDF (alerte jours Blanc / Rouge et réduction automatique du chauffage)",
			shortDesc: "Intégration Tempo + baisse consigne radiateurs jours rouges.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises connectées & suivi conso",
			mainRole: "Mesure globale + suivi injection.",
			qtyLabel: "Contrats Tempo",
			meta: {
				difficulty: 4,
				time: "2 h",
				tools: "Tournevis isolé, testeur, gants"
			},
			techOptions: [
				{
					id: "din-global",
					label: "Compteur rail DIN arrivée générale"
				},
				{
					id: "tri",
					label: "Triphasé (3 pinces)"
				}
			],
			wiring: () => [
					'Coupure générale — clipsez le 3EM sur rail DIN.',
					'Pinces sur câbles d’arrivée (sens respecté).',
					'Courbes conso + production dans Home Assistant.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-pro-3em',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-pro-3em',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'shelly-pro-3em',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				}
			},
			category: "energie-conso",
			keywords: "edf tempo jours rouges home assistant linky chauffage"
		},
	{
			id: "mesurer-consommation-pompe-a-chaleur",
			emoji: "📈",
			title: "Suivi de consommation dédié pompe à chaleur / climatisation au tableau",
			shortDesc: "Pinces CT circuit dédié PAC sur Shelly 3EM ou Pro EM.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises connectées & suivi conso",
			mainRole: "Mesure globale + suivi injection.",
			qtyLabel: "Circuits PAC",
			meta: {
				difficulty: 4,
				time: "2 h",
				tools: "Tournevis isolé, testeur, gants"
			},
			techOptions: [
				{
					id: "din-global",
					label: "Compteur rail DIN arrivée générale"
				},
				{
					id: "tri",
					label: "Triphasé (3 pinces)"
				}
			],
			wiring: () => [
					'Coupure générale — clipsez le 3EM sur rail DIN.',
					'Pinces sur câbles d’arrivée (sens respecté).',
					'Courbes conso + production dans Home Assistant.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-pro-3em',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-pro-3em',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'shelly-pro-3em',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				}
			},
			category: "energie-conso",
			keywords: "mesure consommation pompe à chaleur shelly pince ampère"
		},
	{
			id: "piscine-filtration-surplus-solaire",
			emoji: "🏊",
			title: "Programmation automatique de la pompe de filtration piscine selon surplus solaire",
			shortDesc: "Injection > 500 W → prolonger filtration.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises connectées & suivi conso",
			mainRole: "Commande contacteur HC + mesure puissance.",
			qtyLabel: "Piscines",
			meta: {
				difficulty: 4,
				time: "2 h",
				tools: "Gants, testeur"
			},
			techOptions: [
				{
					id: "hc-grid",
					label: "Heures Creuses classiques"
				},
				{
					id: "solar-surplus",
					label: "Surplus photovoltaïque"
				}
			],
			wiring: () => [
					'Coupure générale — bobine contacteur eau chaude.',
					'Shelly Plus 1PM selon schéma validé par électricien.',
					'Automatisation plages HC ou injection solaire.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-plus-1pm',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-plus-1pm',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'shelly-plus-1pm',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				}
			},
			category: "energie-conso",
			keywords: "piscine filtration surplus solaire photovoltaïque shelly"
		},
	{
			id: "prise-connectee-exterieure-etanche-jardin",
			emoji: "🌧️",
			title: "Prise connectée extérieure étanche IP44 / IP55 pour spa, bassin ou outillage",
			shortDesc: "Shelly Outdoor Plug ou Tapo extérieur — respect IP.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises connectées & suivi conso",
			mainRole: "Prise mesure de puissance.",
			qtyLabel: "Prises extérieures",
			meta: {
				difficulty: 2,
				time: "15 min",
				tools: "Aucun"
			},
			techOptions: [
				{
					id: "shelly-plug",
					label: "Shelly Plug S Gen3"
				},
				{
					id: "tapo-plug",
					label: "Tapo P110"
				}
			],
			wiring: () => [
					'Prise entre mur et appareil (respectez Imax).',
					'Relevez la puissance pendant un cycle.',
					'Puissance < 3 W pendant 2 min → notification.',
				],
			recipes: {
				"wifi-sans-box": {
					main: ({ tech }) => (tech === 'tapo-plug' ? 'tapo-p110' : 'shelly-plug-s-gen3')
				},
				"ha-zigbee": {
					main: ({ tech }) => (tech === 'tapo-plug' ? 'tapo-p110' : 'shelly-plug-s-gen3')
				},
				"maker-esp32": {
					main: () => 'shelly-plug-s-gen3'
				}
			},
			category: "energie-conso",
			keywords: "prise connectée extérieure étanche ip55 jardin spa shelly"
		},
	{
			id: "couper-chargeur-velo-trottinette-fin-charge",
			emoji: "🛴",
			title: "Coupure automatique du chargeur vélo / trottinette électrique en fin de charge",
			shortDesc: "Puissance < 5 W pendant 10 min → OFF prise.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises connectées & suivi conso",
			mainRole: "Prise mesure de puissance.",
			qtyLabel: "Chargeurs",
			meta: {
				difficulty: 2,
				time: "15 min",
				tools: "Aucun"
			},
			techOptions: [
				{
					id: "shelly-plug",
					label: "Shelly Plug S Gen3"
				},
				{
					id: "tapo-plug",
					label: "Tapo P110"
				}
			],
			wiring: () => [
					'Prise entre mur et appareil (respectez Imax).',
					'Relevez la puissance pendant un cycle.',
					'Puissance < 3 W pendant 2 min → notification.',
				],
			recipes: {
				"wifi-sans-box": {
					main: ({ tech }) => (tech === 'tapo-plug' ? 'tapo-p110' : 'shelly-plug-s-gen3')
				},
				"ha-zigbee": {
					main: ({ tech }) => (tech === 'tapo-plug' ? 'tapo-p110' : 'shelly-plug-s-gen3')
				},
				"maker-esp32": {
					main: () => 'shelly-plug-s-gen3'
				}
			},
			category: "energie-conso",
			keywords: "chargeur vélo trottinette coupure fin charge prise connectée"
		},
	{
			id: "detecter-talon-consommation-electrique",
			emoji: "📉",
			title: "Bilan énergétique mensuel et alerte de dérive de talon de consommation",
			shortDesc: "Statistiques HA Energy + alerte + 20 % vs mois précédent.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises connectées & suivi conso",
			mainRole: "Mesure globale + suivi injection.",
			qtyLabel: "Logements",
			meta: {
				difficulty: 4,
				time: "2 h",
				tools: "Tournevis isolé, testeur, gants"
			},
			techOptions: [
				{
					id: "din-global",
					label: "Compteur rail DIN arrivée générale"
				},
				{
					id: "tri",
					label: "Triphasé (3 pinces)"
				}
			],
			wiring: () => [
					'Coupure générale — clipsez le 3EM sur rail DIN.',
					'Pinces sur câbles d’arrivée (sens respecté).',
					'Courbes conso + production dans Home Assistant.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-pro-3em',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-pro-3em',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'shelly-pro-3em',
					accessories: [
						{
							productId: "wago-221",
							qty: 1
						}
					]
				}
			},
			category: "energie-conso",
			keywords: "talons consommation électrique alerte dérive home assistant energy"
		},
	{
			id: "detecteur-fuite-eau-zigbee-alerte",
			emoji: "💦",
			title: "Détecteur de fuite d’eau Zigbee sous évier, lave-linge et chauffe-eau",
			shortDesc: "Capteurs Aqara / Sonoff + notification immédiate.",
			tutorialHref: "/domotique/capteur-temperature-zigbee/",
			tutorialLabel: "Capteur température Zigbee (guide complet)",
			mainRole: "Sondes sans fil + seuils d’alerte.",
			qtyLabel: "Points à risque",
			meta: {
				difficulty: 2,
				time: "20 min / zone",
				tools: "Piles, ruban adhésif"
			},
			techOptions: [
				{
					id: "indoor-room",
					label: "SONOFF SNZB-02D (Zigbee)"
				},
				{
					id: "cold-storage",
					label: "Congélateur / cave (longue autonomie)"
				}
			],
			wiring: () => [
					'Fixez la sonde à l’air libre (pas contre un mur chauffant).',
					'Définissez une alerte si T° ou hygrométrie sort des seuils.',
					'Pour congélateur : testez d’abord la portée radio avant collage définitif.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'sonoff-snzb-02d',
					accessories: []
				},
				"ha-zigbee": {
					main: () => 'sonoff-snzb-02d',
					accessories: [
						{
							productId: "zbdongle-e",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'sonoff-snzb-02d',
					accessories: [
						{
							productId: "rpi5-4gb",
							qty: 1
						},
						{
							productId: "rpi5-psu",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1
						}
					]
				}
			},
			category: "securite-box",
			keywords: "détecteur fuite eau zigbee évier lave linge aqara"
		},
	{
			id: "vanne-eau-motorisee-coupure-fuite",
			emoji: "🚰",
			title: "Vanne d’arrêt d’eau motorisée automatique sur détection de fuite",
			shortDesc: "Electrovanne 12 V + capteurs fuite — coupure générale.",
			tutorialHref: "/domotique/ouvrir-porte-garage-smartphone-esp32-esphome/",
			tutorialLabel: "Tutoriel porte de garage (ESP32 / Shelly)",
			mainRole: "Relais contact sec sur bornier « bouton poussoir » de la motorisation (8 A max).",
			qtyLabel: "Vannes",
			meta: {
				difficulty: 3,
				time: "1 h 30",
				tools: "Tournevis, testeur, Wago"
			},
			techOptions: [
				{
					id: "contact-sec",
					label: "Motorisation avec bornier bouton poussoir (contact sec)"
				},
				{
					id: "dry-only",
					label: "Entrée « dry contact » uniquement (pas de 230 V sur le module)"
				}
			],
			wiring: ({ eco }) => [
					'Coupez le disjoncteur du tableau avant toute ouverture de boîtier motorisation.',
					eco === 'maker-esp32'
						? 'Branchez le relais ESP32 sur les bornes du bouton mural (contact sec) — jamais en parallèle du 230 V moteur.'
						: 'Reliez les sorties I/O du Shelly 1 Mini aux bornes « + / − » du bouton poussoir (fils faible courant).',
					'Ajoutez un capteur d’ouverture sur le battant pour confirmer l’état fermé sur le smartphone.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-1-mini-gen3',
					accessories: [
						{
							productId: "wago-221",
							qty: 1,
							note: "Connexions propres dans le boîtier motorisation."
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-1-mini-gen3',
					accessories: [
						{
							productId: "aqara-door-p2",
							qty: (m) => m,
							note: "Retour d’état ouvert/fermé dans Home Assistant."
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							when: ({ eco }) => eco === 'ha-zigbee',
							note: "Si vous n’avez pas encore de coordinateur Zigbee."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'esp32-devkit',
					mainQty: () => 1,
					mainNote: () => 'ESP32 + firmware ESPHome ou Arduino — pilotage relais contact sec.',
					accessories: [
						{
							productId: "relay-3v3",
							qty: 1
						},
						{
							productId: "reed-garage",
							qty: 1,
							note: "Retour d’état filaire sur GPIO."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					],
					metaAdjust: () => ({ difficulty: 4, time: '2 h 30' })
				}
			},
			category: "securite-box",
			keywords: "vanne eau motorisée coupure fuite domotique electrovanne"
		},
	{
			id: "detecteur-fumee-connecte-zigbee",
			emoji: "🚨",
			title: "Détecteur de fumée interconnecté Zigbee avec alerte smartphone à distance",
			shortDesc: "Heiman / Ajax Zigbee + sirène HA si fumée.",
			tutorialHref: "/domotique/capteur-temperature-zigbee/",
			tutorialLabel: "Capteur température Zigbee (guide complet)",
			mainRole: "Détecteur optique de fumée Zigbee (alarme locale + remontée Home Assistant).",
			qtyLabel: "Détecteurs",
			meta: {
				difficulty: 2,
				time: "25 min / appareil",
				tools: "Vis, perceuse, escabeau"
			},
			techOptions: [
				{
					id: "heiman-zha",
					label: "Heiman HS1SA-E via ZHA / Zigbee2MQTT"
				},
				{
					id: "interconnect-ha",
					label: "Interconnexion sirène + lumières HA si fumée"
				}
			],
			wiring: () => [
					'Fixez le détecteur au plafond à ≥ 30 cm des murs (notice Heiman), jamais au-dessus d’une hotte.',
					'Appuyez sur test 5 s : la sirène intégrée doit sonner avant l’appairage Zigbee.',
					'Inscrivez le capteur dans ZHA (mode appairage) puis vérifiez l’entité binary_sensor.smoke.',
					'Automatisation critique : notify mobile + allumage lumières + journal si alarme fumée > 10 s.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'heiman-smoke-hs1sa',
					accessories: []
				},
				"ha-zigbee": {
					main: () => 'heiman-smoke-hs1sa',
					accessories: [
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						}
					]
				},
				"maker-esp32": {
					main: () => 'heiman-smoke-hs1sa',
					accessories: [
						{
							productId: "rpi5-4gb",
							qty: 1
						},
						{
							productId: "rpi5-psu",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						}
					]
				}
			},
			category: "securite-box",
			keywords: "détecteur fumée zigbee interconnecté home assistant alerte"
		},
	{
			id: "detecteur-monoxyde-carbone-connecte",
			emoji: "☠️",
			title: "Détecteur de monoxyde de carbone (CO) près de la chaudière ou du poêle",
			shortDesc: "CO Zigbee ou Nest + notification critique HA.",
			tutorialHref: "/domotique/capteur-temperature-zigbee/",
			tutorialLabel: "Capteur température Zigbee (guide complet)",
			mainRole: "Sondes sans fil + seuils d’alerte.",
			qtyLabel: "Détecteurs CO",
			meta: {
				difficulty: 2,
				time: "20 min / zone",
				tools: "Piles, ruban adhésif"
			},
			techOptions: [
				{
					id: "indoor-room",
					label: "SONOFF SNZB-02D (Zigbee)"
				},
				{
					id: "cold-storage",
					label: "Congélateur / cave (longue autonomie)"
				}
			],
			wiring: () => [
					'Fixez la sonde à l’air libre (pas contre un mur chauffant).',
					'Définissez une alerte si T° ou hygrométrie sort des seuils.',
					'Pour congélateur : testez d’abord la portée radio avant collage définitif.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'sonoff-snzb-02d',
					accessories: []
				},
				"ha-zigbee": {
					main: () => 'sonoff-snzb-02d',
					accessories: [
						{
							productId: "zbdongle-e",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'sonoff-snzb-02d',
					accessories: [
						{
							productId: "rpi5-4gb",
							qty: 1
						},
						{
							productId: "rpi5-psu",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1
						}
					]
				}
			},
			category: "securite-box",
			keywords: "détecteur monoxyde carbone co connecté chaudière poêle"
		},
	{
			id: "alarme-maison-home-assistant-alarmo",
			emoji: "🛡️",
			title: "Alarme maison DIY sous Home Assistant (clavier, sirène intérieure et capteurs d’ouverture)",
			shortDesc: "Add-on Alarmo + capteurs Aqara + sirène.",
			tutorialHref: "/domotique/home-assistant-green-vs-raspberry-pi-5/",
			tutorialLabel: "Home Assistant Green vs Raspberry Pi 5",
			mainRole: "Box locale prête à l’emploi ou montage Pi 5.",
			qtyLabel: "Zones alarme",
			meta: {
				difficulty: 2,
				time: "1 h",
				tools: "Câble Ethernet, clé USB"
			},
			techOptions: [
				{
					id: "plug-play-green",
					label: "Home Assistant Green"
				},
				{
					id: "diy-pi5",
					label: "Raspberry Pi 5 + dongle"
				},
				{
					id: "zbt2",
					label: "Dongle officiel ZBT-2"
				}
			],
			wiring: () => [
					'Branchez la box en Ethernet sur la box internet (évitez le Wi-Fi pour le serveur).',
					'Insérez le dongle Zigbee USB sur un port ou une extension courte.',
					'Créez votre compte local Home Assistant — pas d’abonnement cloud obligatoire.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'ha-green',
					mainQty: () => 1,
					mainNote: () => 'Même sans Zigbee au départ, la Green gère Wi-Fi Shelly.',
					accessories: [
						{
							productId: "shelly-plug-s-gen3",
							qty: 1,
							note: "Premier module Wi-Fi pour tester."
						}
					]
				},
				"ha-zigbee": {
					main: ({ tech }) => (tech === 'diy-pi5' ? 'rpi5-4gb' : 'ha-green'),
					mainQty: () => 1,
					accessories: [
						{
							productId: "zbdongle-e",
							qty: 1,
							when: ({ tech }) => tech !== 'zbt2'
						},
						{
							productId: "ha-connect-zbt2",
							qty: 1,
							when: ({ tech }) => tech === 'zbt2'
						},
						{
							productId: "rpi5-psu",
							qty: 1,
							when: ({ tech }) => tech === 'diy-pi5'
						},
						{
							productId: "sonoff-snzb-02d",
							qty: 1,
							note: "Premier capteur de test."
						}
					]
				},
				"maker-esp32": {
					main: () => 'rpi5-4gb',
					mainQty: () => 1,
					accessories: [
						{
							productId: "rpi5-psu",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1
						},
						{
							productId: "esp32-devkit",
							qty: 1,
							note: "Pour projets ESPHome en parallèle."
						}
					]
				}
			},
			category: "securite-box",
			keywords: "alarme maison home assistant alarmo diy capteurs zigbee"
		},
	{
			id: "sirene-connectee-zigbee-alarme",
			emoji: "📢",
			title: "Sirène extérieure / intérieure Zigbee et flash lumineux sur intrusion",
			shortDesc: "Neo / Heiman sirène + scénario Alarmo.",
			tutorialHref: "/domotique/capteur-temperature-zigbee/",
			tutorialLabel: "Capteur température Zigbee (guide complet)",
			mainRole: "Sondes sans fil + seuils d’alerte.",
			qtyLabel: "Sirènes",
			meta: {
				difficulty: 2,
				time: "20 min / zone",
				tools: "Piles, ruban adhésif"
			},
			techOptions: [
				{
					id: "indoor-room",
					label: "SONOFF SNZB-02D (Zigbee)"
				},
				{
					id: "cold-storage",
					label: "Congélateur / cave (longue autonomie)"
				}
			],
			wiring: () => [
					'Fixez la sonde à l’air libre (pas contre un mur chauffant).',
					'Définissez une alerte si T° ou hygrométrie sort des seuils.',
					'Pour congélateur : testez d’abord la portée radio avant collage définitif.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'sonoff-snzb-02d',
					accessories: []
				},
				"ha-zigbee": {
					main: () => 'sonoff-snzb-02d',
					accessories: [
						{
							productId: "zbdongle-e",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'sonoff-snzb-02d',
					accessories: [
						{
							productId: "rpi5-4gb",
							qty: 1
						},
						{
							productId: "rpi5-psu",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1
						}
					]
				}
			},
			category: "securite-box",
			keywords: "sirène zigbee alarme flash intrusion home assistant"
		},
	{
			id: "capteur-vibration-bris-vitre-zigbee",
			emoji: "🪟",
			title: "Capteur de vibration bris de vitre ou tentative de forçage de serrure",
			shortDesc: "Capteur vibration vitre + alerte immédiate.",
			tutorialHref: "/domotique/capteur-temperature-zigbee/",
			tutorialLabel: "Capteur température Zigbee (guide complet)",
			mainRole: "Capteur de vibration Zigbee collé sur vitre ou dormant (choc / bris).",
			qtyLabel: "Ouvertures vitrées",
			meta: {
				difficulty: 2,
				time: "20 min / vitre",
				tools: "Piles, alcool ménager, ruban double face 3M"
			},
			techOptions: [
				{
					id: "vitre-fixe",
					label: "Vitre fixe ou baie coulissante (Aqara Vibration)"
				},
				{
					id: "serrure",
					label: "Porte d’entrée (vibration sur dormant + contact porte)"
				}
			],
			wiring: () => [
					'Dégraissez la vitre ou le dormant métallique, collez le capteur Aqara au centre du vitrage.',
					'Effectuez un test de vibration léger (coups de poing simulés) : l’événement doit remonter en < 3 s.',
					'Réglez la sensibilité dans ZHA si fausses alertes (pluie, camion) — ajoutez une condition « alarme armée ».',
					'Automatisation : notification prioritaire + sirène intérieure si vibration et mode absence.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'aqara-vibration-v1',
					accessories: []
				},
				"ha-zigbee": {
					main: () => 'aqara-vibration-v1',
					accessories: [
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						}
					]
				},
				"maker-esp32": {
					main: () => 'aqara-vibration-v1',
					accessories: [
						{
							productId: "rpi5-4gb",
							qty: 1
						},
						{
							productId: "rpi5-psu",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						}
					]
				}
			},
			category: "securite-box",
			keywords: "capteur vibration bris vitre zigbee forçage serrure"
		},
	{
			id: "sauvegarde-automatique-home-assistant",
			emoji: "💾",
			title: "Sauvegarde automatique chiffrée de Home Assistant vers le cloud ou un NAS",
			shortDesc: "Add-on backup + Synology / Google Drive chiffré.",
			tutorialHref: "/domotique/home-assistant-green-vs-raspberry-pi-5/",
			tutorialLabel: "Home Assistant Green vs Raspberry Pi 5",
			mainRole: "Box locale prête à l’emploi ou montage Pi 5.",
			qtyLabel: "Instances HA",
			meta: {
				difficulty: 2,
				time: "1 h",
				tools: "Câble Ethernet, clé USB"
			},
			techOptions: [
				{
					id: "plug-play-green",
					label: "Home Assistant Green"
				},
				{
					id: "diy-pi5",
					label: "Raspberry Pi 5 + dongle"
				},
				{
					id: "zbt2",
					label: "Dongle officiel ZBT-2"
				}
			],
			wiring: () => [
					'Branchez la box en Ethernet sur la box internet (évitez le Wi-Fi pour le serveur).',
					'Insérez le dongle Zigbee USB sur un port ou une extension courte.',
					'Créez votre compte local Home Assistant — pas d’abonnement cloud obligatoire.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'ha-green',
					mainQty: () => 1,
					mainNote: () => 'Même sans Zigbee au départ, la Green gère Wi-Fi Shelly.',
					accessories: [
						{
							productId: "shelly-plug-s-gen3",
							qty: 1,
							note: "Premier module Wi-Fi pour tester."
						}
					]
				},
				"ha-zigbee": {
					main: ({ tech }) => (tech === 'diy-pi5' ? 'rpi5-4gb' : 'ha-green'),
					mainQty: () => 1,
					accessories: [
						{
							productId: "zbdongle-e",
							qty: 1,
							when: ({ tech }) => tech !== 'zbt2'
						},
						{
							productId: "ha-connect-zbt2",
							qty: 1,
							when: ({ tech }) => tech === 'zbt2'
						},
						{
							productId: "rpi5-psu",
							qty: 1,
							when: ({ tech }) => tech === 'diy-pi5'
						},
						{
							productId: "sonoff-snzb-02d",
							qty: 1,
							note: "Premier capteur de test."
						}
					]
				},
				"maker-esp32": {
					main: () => 'rpi5-4gb',
					mainQty: () => 1,
					accessories: [
						{
							productId: "rpi5-psu",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1
						},
						{
							productId: "esp32-devkit",
							qty: 1,
							note: "Pour projets ESPHome en parallèle."
						}
					]
				}
			},
			category: "securite-box",
			keywords: "sauvegarde home assistant automatique nas cloud chiffré"
		},
	{
			id: "acces-distance-securise-home-assistant",
			emoji: "🔒",
			title: "Accès à distance sécurisé à Home Assistant (Nabu Casa, VPN WireGuard ou Tailscale)",
			shortDesc: "Tailscale ou Nabu Casa — pas d’ouverture port 8123 brut.",
			tutorialHref: "/domotique/home-assistant-green-vs-raspberry-pi-5/",
			tutorialLabel: "Home Assistant Green vs Raspberry Pi 5",
			mainRole: "Tunnel chiffré ou abonnement Nabu Casa vers votre instance Home Assistant (HA).",
			qtyLabel: "Installations",
			meta: {
				difficulty: 3,
				time: "45 min à 1 h",
				tools: "Navigateur, accès admin routeur (lecture seule)"
			},
			techOptions: [
				{
					id: "nabu-casa",
					label: "Nabu Casa Home Assistant Cloud"
				},
				{
					id: "tailscale",
					label: "Tailscale (VPN mesh, gratuit perso)"
				},
				{
					id: "wireguard",
					label: "Add-on WireGuard sur Home Assistant"
				}
			],
			wiring: () => [
					'Ne redirigez jamais le port 8123 en NAT brut : privilégiez Nabu Casa, Tailscale ou WireGuard.',
					'Branchez Home Assistant en Ethernet fixe ; réservez une IP DHCP pour retrouver le serveur.',
					'Activez l’authentification à deux facteurs (2FA) sur le compte administrateur HA.',
					'Testez l’accès distant en 4G (Wi-Fi coupé) : le dashboard doit s’ouvrir sans exposer votre box.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'nabu-casa-sub',
					mainQty: () => 1,
					mainNote: () => 'Abonnement Nabu Casa : accès distant chiffré sans ouvrir votre box (instance HA requise).',
					accessories: []
				},
				"ha-zigbee": {
					main: ({ tech }) => (tech === 'wireguard' || tech === 'tailscale' ? 'ha-green' : 'ha-green'),
					mainQty: () => 1,
					mainNote: (tech) =>
						tech === 'nabu-casa'
							? 'Home Assistant local + lien Nabu Casa dans Paramètres → Nabu Casa.'
							: tech === 'tailscale'
								? 'Home Assistant Green + add-on Tailscale (ou conteneur sur le réseau HA).'
								: 'Home Assistant Green + add-on WireGuard (clés générées dans HA).',
					accessories: [
						{
							productId: "nabu-casa-sub",
							qty: 1,
							when: ({ tech }) => tech === 'nabu-casa',
							note: "Active l’accès distant officiel et le relais Alexa/Google optionnel."
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Optionnel : Zigbee en parallèle, sans lien avec l’accès distant.",
							when: ({ tech }) => tech !== 'nabu-casa'
						}
					]
				},
				"maker-esp32": {
					main: () => 'rpi5-4gb',
					mainQty: () => 1,
					mainNote: () => 'Raspberry Pi 5 + Home Assistant OS : Tailscale ou WireGuard en add-on.',
					accessories: [
						{
							productId: "rpi5-psu",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Optionnel pour capteurs Zigbee."
						}
					]
				}
			},
			category: "securite-box",
			keywords: "accès distance home assistant tailscale wireguard nabu casa"
		},
	{
			id: "tablette-murale-dashboard-home-assistant",
			emoji: "📱",
			title: "Tablette murale Home Assistant : dashboard et allumage automatique",
			shortDesc: "Tablette Android / iPad au mur, Fully Kiosk Browser, alimentation USB coudée 90° et réveil écran par présence PIR ou mmWave.",
			tutorialHref: "/domotique/home-assistant-green-vs-raspberry-pi-5/",
			tutorialLabel: "Home Assistant Green vs Raspberry Pi 5 : quel serveur choisir ?",
			mainRole: "Tablette d’affichage mural + support plat + alimentation USB sécurisée.",
			qtyLabel: "Tablettes murales",
			meta: {
				difficulty: 2,
				time: "1 h 30",
				tools: "Niveau à bulle, tournevis, câble USB-C coudé 90°"
			},
			techOptions: [
				{
					id: "tablette-recyclee",
					label: "Tablette recyclée (déjà possédée)"
				},
				{
					id: "tablette-android-neuve",
					label: "Tablette Android 11\" neuve (Galaxy Tab A9+ / Lenovo M11)"
				},
				{
					id: "reveil-mmwave",
					label: "Tablette 11\" + radar de présence mmWave (Aqara FP2)"
				}
			],
			wiring: () => [
				"Fixez le support mural à hauteur des yeux (145–155 cm) en ménageant 2 à 3 mm d’aération au dos de la tablette.",
				"Branchez un câble USB-C coudé à 90° relié à un chargeur 5 V certifié CE (aucun bricolage 230 V encastré) et limitez la charge à 80 %.",
				"Connectez Fully Kiosk Browser à l’IP locale fixe de Home Assistant et liez le réveil d’écran au capteur PIR ou mmWave."
			],
			recipes: {
				"wifi-sans-box": {
					main: () => "support-mural-tablette",
					mainQty: (mult) => mult,
					mainNote: () => "Recyclage d’une tablette existante : support mural plat + alimentation USB coudée.",
					accessories: [
						{
							productId: "cable-usbc-coude-90",
							qty: (mult) => mult,
							note: "Câble USB-C coudé 90° pour ne pas plier le connecteur dans le cadre."
						},
						{
							productId: "tapo-p110",
							qty: 1,
							note: "Coupe le chargeur à 80 % et relance à 25 % sur tablette recyclée sans limiteur natif."
						}
					]
				},
				"ha-zigbee": {
					main: ({ tech }) => (tech === "tablette-recyclee" ? "support-mural-tablette" : "galaxy-tab-a9-plus"),
					mainQty: (mult) => mult,
					mainNote: (tech) =>
						tech === "tablette-recyclee"
							? "Support mural pour votre tablette existante."
							: "Tablette 11 pouces Wi-Fi avec limite de batterie 80 % native et compatibilité Fully Kiosk.",
					accessories: [
						{
							productId: "support-mural-tablette",
							qty: (mult) => mult,
							when: ({ tech }) => tech !== "tablette-recyclee",
							note: "Support mural profil plat (pinces ou VESA)."
						},
						{
							productId: "cable-usbc-coude-90",
							qty: (mult) => mult,
							note: "Câble USB-C coudé 90° plat + chargeur USB 5 V."
						},
						{
							productId: "sonoff-snzb-03p",
							qty: (mult) => mult,
							when: ({ tech }) => tech !== "reveil-mmwave",
							note: "Capteur PIR Zigbee pour allumer l’écran dès l’approche dans le couloir."
						},
						{
							productId: "aqara-fp2",
							qty: (mult) => mult,
							when: ({ tech }) => tech === "reveil-mmwave",
							note: "Radar mmWave multi-zones : maintient l’écran allumé même immobile devant."
						}
					]
				},
				"maker-esp32": {
					main: () => "galaxy-tab-a9-plus",
					mainQty: (mult) => mult,
					mainNote: () => "Configuration complète : tablette 11\" + détection radar mmWave.",
					accessories: [
						{
							productId: "support-mural-tablette",
							qty: (mult) => mult,
							note: "Support mural plat ou cadre."
						},
						{
							productId: "cable-usbc-coude-90",
							qty: (mult) => mult,
							note: "Alimentation USB-C coudée 90° basse tension."
						},
						{
							productId: "aqara-fp2",
							qty: (mult) => mult,
							note: "Radar de présence mmWave Aqara FP2 (Wi-Fi local HomeKit Controller)."
						}
					]
				}
			},
			category: "securite-box",
			keywords: "tablette murale home assistant dashboard fully kiosk allumage écran détection mouvement support mural"
		},
	{
			id: "bouton-urgence-senior-maintien-domicile",
			emoji: "🆘",
			title: "Bouton d’urgence / appel d’aide sans fil pour personne âgée à domicile",
			shortDesc: "Aqara bouton triple clic → notify famille + appel.",
			tutorialHref: "/domotique/capteur-temperature-zigbee/",
			tutorialLabel: "Capteur température Zigbee (guide complet)",
			mainRole: "Bouton Zigbee sans fil (simple / double / triple clic) pour alerte aidants.",
			qtyLabel: "Boutons",
			meta: {
				difficulty: 2,
				time: "25 min",
				tools: "Piles, ruban adhésif, smartphone famille"
			},
			techOptions: [
				{
					id: "triple-clic",
					label: "Triple clic = alerte urgente (Aqara Mini Switch)"
				},
				{
					id: "double-clic",
					label: "Double clic = rappel doux, simple clic = acquittement"
				}
			],
			wiring: () => [
					'Fixez le bouton à portée de main du lit ou de la douche (hauteur 90–110 cm).',
					'Appairez le bouton dans ZHA ; notez les événements single / double / triple dans Outils développeur.',
					'Créez une automatisation triple clic → notify.mobile_app (priorité haute) + SMS si intégration disponible.',
					'Test mensuel avec la personne : simuler une chute fictive et vérifier la réception en < 30 s.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'aqara-wireless-mini-switch',
					accessories: []
				},
				"ha-zigbee": {
					main: () => 'aqara-wireless-mini-switch',
					accessories: [
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						}
					]
				},
				"maker-esp32": {
					main: () => 'aqara-wireless-mini-switch',
					accessories: [
						{
							productId: "rpi5-4gb",
							qty: 1
						},
						{
							productId: "rpi5-psu",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						}
					]
				}
			},
			category: "securite-box",
			keywords: "bouton urgence senior domicile aqara alerte famille"
		},
	{
			id: "veilleuse-automatique-pied-de-lit",
			emoji: "🌙",
			title: "Veilleuse automatique de couloir la nuit pour enfants ou seniors (détection pied de lit)",
			shortDesc: "Motion bas lux + ruban LED sol 2 %.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises & modules connectés pour Home Assistant",
			mainRole: "Détecteur présence + commande lumière.",
			qtyLabel: "Chambres",
			meta: {
				difficulty: 2,
				time: "45 min / zone",
				tools: "Piles, tournevis"
			},
			techOptions: [
				{
					id: "motion-light",
					label: "Détecteur + module éclairage"
				}
			],
			wiring: () => [
					'Placez le détecteur pour couvrir le passage.',
					'Mouvement → ON, délai sans mouvement → OFF.',
					'Réglage extinction 30 s à 5 min selon pièce.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-1-mini-gen3',
					accessories: [
						{
							productId: "aqara-motion-p2",
							qty: (m) => m
						}
					]
				},
				"ha-zigbee": {
					main: () => 'sonoff-zbmini-l2',
					accessories: [
						{
							productId: "aqara-motion-p2",
							qty: (m) => m
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						}
					]
				},
				"maker-esp32": {
					main: () => 'aqara-motion-p2',
					accessories: [
						{
							productId: "rpi5-4gb",
							qty: 1
						},
						{
							productId: "rpi5-psu",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "shelly-1-mini-gen3",
							qty: (m) => m
						}
					]
				}
			},
			category: "securite-box",
			keywords: "veilleuse automatique nuit couloir pied de lit motion"
		},
	{
			id: "detection-presence-famille-ble-home-assistant",
			emoji: "👨‍👩‍👧",
			title: "Suivi de présence familiale précis (Wi-Fi, Bluetooth BLE proxy ESPHome, géolocalisation)",
			shortDesc: "Companions + BLE room presence + zones.",
			tutorialHref: "/domotique/home-assistant-green-vs-raspberry-pi-5/",
			tutorialLabel: "Home Assistant Green vs Raspberry Pi 5",
			mainRole: "Box locale prête à l’emploi ou montage Pi 5.",
			qtyLabel: "Personnes",
			meta: {
				difficulty: 2,
				time: "1 h",
				tools: "Câble Ethernet, clé USB"
			},
			techOptions: [
				{
					id: "plug-play-green",
					label: "Home Assistant Green"
				},
				{
					id: "diy-pi5",
					label: "Raspberry Pi 5 + dongle"
				},
				{
					id: "zbt2",
					label: "Dongle officiel ZBT-2"
				}
			],
			wiring: () => [
					'Branchez la box en Ethernet sur la box internet (évitez le Wi-Fi pour le serveur).',
					'Insérez le dongle Zigbee USB sur un port ou une extension courte.',
					'Créez votre compte local Home Assistant — pas d’abonnement cloud obligatoire.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'ha-green',
					mainQty: () => 1,
					mainNote: () => 'Même sans Zigbee au départ, la Green gère Wi-Fi Shelly.',
					accessories: [
						{
							productId: "shelly-plug-s-gen3",
							qty: 1,
							note: "Premier module Wi-Fi pour tester."
						}
					]
				},
				"ha-zigbee": {
					main: ({ tech }) => (tech === 'diy-pi5' ? 'rpi5-4gb' : 'ha-green'),
					mainQty: () => 1,
					accessories: [
						{
							productId: "zbdongle-e",
							qty: 1,
							when: ({ tech }) => tech !== 'zbt2'
						},
						{
							productId: "ha-connect-zbt2",
							qty: 1,
							when: ({ tech }) => tech === 'zbt2'
						},
						{
							productId: "rpi5-psu",
							qty: 1,
							when: ({ tech }) => tech === 'diy-pi5'
						},
						{
							productId: "sonoff-snzb-02d",
							qty: 1,
							note: "Premier capteur de test."
						}
					]
				},
				"maker-esp32": {
					main: () => 'rpi5-4gb',
					mainQty: () => 1,
					accessories: [
						{
							productId: "rpi5-psu",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1
						},
						{
							productId: "esp32-devkit",
							qty: 1,
							note: "Pour projets ESPHome en parallèle."
						}
					]
				}
			},
			category: "securite-box",
			keywords: "présence famille ble esphome home assistant companion"
		},
	{
			id: "buanderie-sechage-linge-humidite-connectee",
			emoji: "👕",
			title: "Buanderie : calculer le temps de séchage du linge et piloter VMC / ventilateur",
			shortDesc: "Hygrométrie + estimation séchage + boost VMC.",
			tutorialHref: "/domotique/capteur-temperature-zigbee/",
			tutorialLabel: "Capteurs température Zigbee & automatisations",
			mainRole: "Hygrométrie + relais extracteur.",
			qtyLabel: "Buanderies",
			meta: {
				difficulty: 3,
				time: "30 min / pièce",
				tools: "Piles AAA, tournevis"
			},
			techOptions: [
				{
					id: "extract-standalone",
					label: "Extracteur ou VMC commandée"
				}
			],
			wiring: () => [
					'Sonde à hauteur, loin du jet de douche direct.',
					'Relais sur circuit extracteur.',
					'Seuil 70 % ON, 55 % OFF avec anti-rebond.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'shelly-plus-1pm',
					accessories: [
						{
							productId: "sonoff-snzb-02d",
							qty: (m) => m
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"ha-zigbee": {
					main: () => 'shelly-plus-1pm',
					accessories: [
						{
							productId: "sonoff-snzb-02d",
							qty: (m) => m
						},
						{
							productId: "zbdongle-e",
							qty: 1,
							note: "Coordinateur Zigbee USB."
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				},
				"maker-esp32": {
					main: () => 'sonoff-snzb-02d',
					accessories: [
						{
							productId: "shelly-plus-1pm",
							qty: (m) => m
						},
						{
							productId: "wago-221",
							qty: 1
						}
					]
				}
			},
			category: "securite-box",
			keywords: "buanderie séchage linge humidité vmc home assistant"
		},
	{
			id: "redemarrage-automatique-box-internet-watchdog",
			emoji: "🔄",
			title: "Redémarrage automatique de la box Internet en cas de perte prolongée de connexion",
			shortDesc: "Ping 8.8.8.8 + prise connectée box — reboot 30 s OFF.",
			tutorialHref: "/domotique/prise-connectee-zigbee-home-assistant/",
			tutorialLabel: "Prises connectées & suivi conso",
			mainRole: "Prise mesure de puissance.",
			qtyLabel: "Box / routeurs",
			meta: {
				difficulty: 2,
				time: "15 min",
				tools: "Aucun"
			},
			techOptions: [
				{
					id: "shelly-plug",
					label: "Shelly Plug S Gen3"
				},
				{
					id: "tapo-plug",
					label: "Tapo P110"
				}
			],
			wiring: () => [
					'Prise entre mur et appareil (respectez Imax).',
					'Relevez la puissance pendant un cycle.',
					'Puissance < 3 W pendant 2 min → notification.',
				],
			recipes: {
				"wifi-sans-box": {
					main: ({ tech }) => (tech === 'tapo-plug' ? 'tapo-p110' : 'shelly-plug-s-gen3')
				},
				"ha-zigbee": {
					main: ({ tech }) => (tech === 'tapo-plug' ? 'tapo-p110' : 'shelly-plug-s-gen3')
				},
				"maker-esp32": {
					main: () => 'shelly-plug-s-gen3'
				}
			},
			category: "securite-box",
			keywords: "redémarrage box internet watchdog ping prise connectée"
		},
	{
			id: "etendre-portee-reseau-zigbee-routeurs",
			emoji: "📶",
			title: "Réseau maillé Zigbee ultra-stable : placer des prises routeurs pour couvrir garage et jardin",
			shortDesc: "Prises Zigbee always-on + carte mesh ZHA.",
			tutorialHref: "/domotique/home-assistant-green-vs-raspberry-pi-5/",
			tutorialLabel: "Home Assistant Green vs Raspberry Pi 5",
			mainRole: "Box locale prête à l’emploi ou montage Pi 5.",
			qtyLabel: "Routeurs Zigbee",
			meta: {
				difficulty: 2,
				time: "1 h",
				tools: "Câble Ethernet, clé USB"
			},
			techOptions: [
				{
					id: "plug-play-green",
					label: "Home Assistant Green"
				},
				{
					id: "diy-pi5",
					label: "Raspberry Pi 5 + dongle"
				},
				{
					id: "zbt2",
					label: "Dongle officiel ZBT-2"
				}
			],
			wiring: () => [
					'Branchez la box en Ethernet sur la box internet (évitez le Wi-Fi pour le serveur).',
					'Insérez le dongle Zigbee USB sur un port ou une extension courte.',
					'Créez votre compte local Home Assistant — pas d’abonnement cloud obligatoire.',
				],
			recipes: {
				"wifi-sans-box": {
					main: () => 'ha-green',
					mainQty: () => 1,
					mainNote: () => 'Même sans Zigbee au départ, la Green gère Wi-Fi Shelly.',
					accessories: [
						{
							productId: "shelly-plug-s-gen3",
							qty: 1,
							note: "Premier module Wi-Fi pour tester."
						}
					]
				},
				"ha-zigbee": {
					main: ({ tech }) => (tech === 'diy-pi5' ? 'rpi5-4gb' : 'ha-green'),
					mainQty: () => 1,
					accessories: [
						{
							productId: "zbdongle-e",
							qty: 1,
							when: ({ tech }) => tech !== 'zbt2'
						},
						{
							productId: "ha-connect-zbt2",
							qty: 1,
							when: ({ tech }) => tech === 'zbt2'
						},
						{
							productId: "rpi5-psu",
							qty: 1,
							when: ({ tech }) => tech === 'diy-pi5'
						},
						{
							productId: "sonoff-snzb-02d",
							qty: 1,
							note: "Premier capteur de test."
						}
					]
				},
				"maker-esp32": {
					main: () => 'rpi5-4gb',
					mainQty: () => 1,
					accessories: [
						{
							productId: "rpi5-psu",
							qty: 1
						},
						{
							productId: "zbdongle-e",
							qty: 1
						},
						{
							productId: "esp32-devkit",
							qty: 1,
							note: "Pour projets ESPHome en parallèle."
						}
					]
				}
			},
			category: "securite-box",
			keywords: "étendre portée zigbee routeur prise garage jardin zha"
		}
];
