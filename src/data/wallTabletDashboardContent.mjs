import { amazonSearchUrl } from '../lib/amazonAffiliate.mjs';

function amzDp(asin) {
	return `https://www.amazon.fr/dp/${asin}?tag=manuso06-21`;
}

function amzSearch(q) {
	return amazonSearchUrl('fr', q);
}

export const WALL_TABLET_META = {
	h1: 'Tablette murale Home Assistant : guide complet pour créer un dashboard avec allumage automatique',
	metaTitle: 'Tablette murale Home Assistant : guide complet dashboard et allumage auto',
	metaDescription:
		'Créer une tablette murale Home Assistant : choix tablette, fixation, charge USB, Fully Kiosk, détection présence PIR/mmWave et 3 dashboards YAML.',
	canonicalPath: '/domotique/projets/tablette-murale-dashboard-home-assistant/',
	geoAnswer:
		'Pour créer une tablette murale Home Assistant fiable, associez un serveur Home Assistant existant (Green ou Raspberry Pi) en réseau local Wi-Fi à une tablette Android (Samsung Galaxy Tab A9+, Lenovo Tab M10/M11 ou tablette recyclée) fixée au mur avec un câble USB-C coudé et une prise connectée de gestion de charge (20–80 %). Affichez votre tableau de bord Lovelace via Fully Kiosk Browser (Android) ou l’application Home Assistant Companion, puis déclenchez le réveil automatique de l’écran par la caméra frontale, un capteur PIR Zigbee (SONOFF SNZB-03P, Aqara P1/P2) ou un radar mmWave (Aqara FP2).',
	shortSummary: {
		difficulty: '2 / 5 (Débutant à Intermédiaire)',
		time: '1 h 30 à 2 h 30 (pose + logiciel)',
		budgetRecycle: '25 à 55 € (tablette déjà possédée)',
		budgetNeuf: '185 à 260 € (tablette Android neuve + support + capteur)',
		serverNote: 'Hors serveur Home Assistant (0 € si déjà en place, ~115 € avec Home Assistant Green)',
	},
};

export const TOP_AFFILIATE_HIGHLIGHTS = [
	{
		badge: 'Tablette 11" recommandée',
		title: 'Samsung Galaxy Tab A9+ (11", Wi-Fi) ou Lenovo Tab M11',
		role: 'Écran 11 pouces confortable au mur, Android standard compatible Fully Kiosk Browser et Home Assistant Companion.',
		budgetIndicatif: 'Voir tarif actuel selon capacité (64 / 128 Go)',
		ctaLabel: 'Voir le prix de la tablette sur Amazon →',
		url: amzSearch('Samsung Galaxy Tab A9+ 11 pouces Wi-Fi'),
		secondaryUrl: amzSearch('Lenovo Tab M11 11 pouces'),
		secondaryLabel: 'Comparer avec la Lenovo Tab M11 →',
	},
	{
		badge: 'Fixation & alimentation propre',
		title: 'Support mural tablette + câble USB-C coudé 90° plat',
		role: 'Maintien affleurant au mur sans écraser le connecteur de charge, câble ruban discret le long d’une goulotte.',
		budgetIndicatif: 'Support mural + câble coudé 90°',
		ctaLabel: 'Choisir un support mural sur Amazon →',
		url: amzSearch('support mural tablette 10 11 pouces'),
		secondaryUrl: amzSearch('cable USB C coude 90 degres plat 2m'),
		secondaryLabel: 'Voir les câbles USB-C coudés 90° →',
	},
	{
		badge: 'Réveil écran automatique',
		title: 'Capteur de présence : PIR Zigbee (SNZB-03P) ou radar mmWave (Aqara FP2)',
		role: 'Allume l’écran dès votre approche dans le couloir ou maintient l’affichage actif tant que vous restez devant.',
		budgetIndicatif: 'PIR sur pile ou radar mmWave USB-C',
		ctaLabel: 'Comparer les capteurs de présence →',
		url: amzSearch('Aqara Presence Sensor FP2 mmWave'),
		secondaryUrl: amzSearch('SONOFF SNZB-03P capteur mouvement Zigbee'),
		secondaryLabel: 'Voir le capteur PIR SONOFF SNZB-03P →',
	},
];

export const SYSTEM_ROLES = [
	{
		component: 'Tablette murale (client d’affichage)',
		role: 'Affiche l’interface graphique (dashboard Lovelace) et capte vos appuis tactiles.',
		doesNot: 'Ne stocke pas vos automatisations critiques et ne remplace pas la box domotique.',
		protocol: 'Wi-Fi local (HTTP/WebSocket vers l’IP de Home Assistant)',
	},
	{
		component: 'Serveur Home Assistant (cerveau domotique)',
		role: 'Tourne 24h/24 (Home Assistant Green, Raspberry Pi 5, mini-PC), exécute les scénarios, centralise les capteurs et sert les pages web du dashboard.',
		doesNot: 'N’a pas d’écran intégré : il se pilote par le réseau.',
		protocol: 'Ethernet recommandé sur la box Internet / routeur',
	},
	{
		component: 'Application kiosk (Fully Kiosk Browser / Companion)',
		role: 'Verrouille la tablette sur le dashboard en plein écran, empêche la mise en veille sauvage et expose l’écran comme une entité pilotable dans Home Assistant.',
		doesNot: 'Ne fonctionne pas de la même façon sur Android (contrôle complet) et sur iPadOS (Accès guidé plus fermé).',
		protocol: 'API REST locale / intégration native Fully Kiosk dans HA',
	},
	{
		component: 'Détecteur d’approche (Caméra, PIR ou mmWave)',
		role: 'Signale qu’une personne s’approche du mur pour réveiller la dalle en moins d’une seconde et l’éteindre après départ.',
		doesNot: 'La caméra frontale ne voit rien dans le noir complet ; un capteur PIR ou mmWave reste fiable de nuit.',
		protocol: 'Local (caméra tablette), Zigbee (PIR) ou Wi-Fi local HomeKit (Aqara FP2)',
	},
	{
		component: 'Prise connectée de charge (gestion batterie)',
		role: 'Coupe le chargeur USB à 80 % de batterie et le rallume sous 25 % grâce à la remontée du niveau de batterie dans Home Assistant.',
		doesNot: 'Optionnelle si la tablette intègre une limite de charge matérielle (ex. Protection de la batterie Samsung à 80/85 %).',
		protocol: 'Zigbee ou Wi-Fi local',
	},
];

export const TABLET_COMPARISON = [
	{
		type: 'Ancienne tablette Android recyclée',
		examples: 'Galaxy Tab A7/A8, Huawei/Lenovo 2019–2022 (Android 9+)',
		screen: '8" à 10,4" LCD (luminosité moyenne)',
		power: 'Micro-USB ou USB-C + prise connectée 20–80 % obligatoire',
		mount: 'Support universel à pinces ou impression 3D sur mesure',
		kiosk: 'Fully Kiosk Browser + Android System WebView à jour',
		sensors: 'Caméra frontale parfois lente, préférez un PIR externe',
		limitations: 'WebView obsolète sur Android < 8 (cartes Lovelace modernes lentes ou incompatibles), batterie parfois fatiguée.',
		verdict: 'Idéal pour tester à 0 € avant d’investir dans un cadre définitif.',
	},
	{
		type: 'Samsung Galaxy Tab (neuve ou récente)',
		examples: 'Galaxy Tab A9+ (11", 4 ou 8 Go RAM)',
		screen: '11" LCD 1920×1200, bon angle de vision en couloir',
		power: 'USB-C + fonction native « Protection de la batterie » (limite à 80 % sans prise connectée)',
		mount: 'Large choix de cadres muraux dédiés et supports VESA',
		kiosk: 'Fully Kiosk Browser (APK direct) + intégration HA officielle',
		sensors: 'Caméra frontale + capteur de luminosité ambiante exploitable',
		limitations: 'Dalle TFT (noirs légèrement gris la nuit si l’écran n’est pas totalement éteint).',
		verdict: 'Le meilleur compromis actuel : limite de charge native et compatibilité totale Fully Kiosk.',
	},
	{
		type: 'Lenovo Tab',
		examples: 'Lenovo Tab M10 Plus (3e gén.) / Tab M11 (11")',
		screen: '10,6" ou 11" IPS lumineux et bien contrasté',
		power: 'USB-C + mode protection de batterie intégré dans les paramètres Lenovo',
		mount: 'Supports universels, magnétiques ou cadres imprimés en 3D',
		kiosk: 'Fully Kiosk Browser + Home Assistant Companion sans restriction',
		sensors: 'Caméra frontale + détection de mouvement Fully Kiosk fluide',
		limitations: 'Gestion agressive de l’économie d’énergie par défaut (à désactiver pour Fully Kiosk et Companion).',
		verdict: 'Excellente alternative à Samsung, dalle IPS très agréable de biais.',
	},
	{
		type: 'Amazon Fire HD',
		examples: 'Fire HD 10 (modèles 2021 / 2023)',
		screen: '10,1" 1080p correct',
		power: 'USB-C + prise connectée indispensable (pas de seuil 80 % natif)',
		mount: 'Supports muraux courants',
		kiosk: 'Fully Kiosk Browser (version Fire OS dédiée sur le site officiel)',
		sensors: 'Caméra frontale fonctionnelle avec Fully Kiosk',
		limitations: 'Fire OS fermé : publicités sur l’écran de verrouillage selon version, absence du Play Store par défaut, mises à jour qui réactivent parfois les écrans Amazon.',
		verdict: 'Intéressante uniquement si vous en possédez déjà une ; en achat neuf, une Galaxy Tab A9+ ou Lenovo M11 évite tout bricolage Fire OS.',
	},
	{
		type: 'Apple iPad',
		examples: 'iPad 9e / 10e génération ou iPad Air recyclé',
		screen: '10,2" à 10,9" Retina très lisible, excellente réactivité tactile',
		power: 'Lightning ou USB-C (limite 80 % native seulement sur iPad récents M2/A16, sinon prise connectée)',
		mount: 'Très grand choix de cadres muraux aluminium ou encastrés',
		kiosk: 'Application Home Assistant Companion en mode « Accès guidé » iPadOS',
		sensors: 'Pas d’accès à la caméra en arrière-plan pour réveiller l’écran automatiquement',
		limitations: 'Pas de Fully Kiosk Browser sur iOS. Pour réveiller l’écran automatiquement sans toucher la vitre, il faut envoyer une notification push silencieuse ou utiliser un raccourci/capteur externe avec Accès guidé.',
		verdict: 'Parfait si vous recyclez un iPad existant, mais moins souple qu’Android pour l’allumage sur approche.',
	},
	{
		type: 'Écran tactile dédié + Raspberry Pi / Mini-PC',
		examples: 'Écran tactile HDMI/USB 10–15" + Raspberry Pi 4/5 ou client léger',
		screen: '10" à 15,6" IPS, format large pour dashboard avancé',
		power: 'Alimentation secteur/USB-C directe — aucune batterie au lithium à surveiller',
		mount: 'Fixation VESA 75×75 ou intégration en cloison sèche',
		kiosk: 'Chromium en mode kiosk sous Linux + extinction écran par commande DPMS/CEC ou relais',
		sensors: 'Capteur PIR GPIO ou capteur Zigbee/mmWave via Home Assistant',
		limitations: 'Plus épais qu’une tablette (écran + câbles HDMI/USB), consommation électrique supérieure (8 à 15 W en continu).',
		verdict: 'Le choix durable pour un poste fixe sans batterie (zéro risque de gonflement sur 5 à 10 ans).',
	},
];

export const MOUNTING_SOLUTIONS = [
	{
		title: 'Support mural apparent à pinces ou bras plat',
		level: 'Débutant — 15 min',
		description: 'Se visse au mur (2 chevilles adaptée au support : placo Molly ou brique) et serre la tablette sur les tranches.',
		pros: 'Universel, réversible si vous changez de tablette, laisse circuler l’air au dos.',
		cons: 'Surépaisseur de 15 à 25 mm, câble de charge visible sur le côté si non goulotté.',
	},
	{
		title: 'Fixation magnétique murale (plaques métal + aimants néodyme)',
		level: 'Débutant — 20 min',
		description: 'Deux supports aimantés vissés au mur et une plaque fine collée au dos de la tablette (ou d’une coque fine).',
		pros: 'Tablette décrochable en une seconde pour l’utiliser dans le canapé, rendu très épuré.',
		cons: 'Nécessite de débrancher le câble USB (ou d’utiliser un connecteur USB-C coudé bien guidé).',
	},
	{
		title: 'Support ou cadre mural imprimé en 3D (PLA / PETG)',
		level: 'Intermédiaire — sur mesure',
		description: 'Cadre glissière imprimé aux cotes exactes de la tablette (nombreux modèles gratuits sur Printables/MakerWorld pour Tab A9+, Lenovo M10/M11, Fire HD 10) avec logement prévu pour un connecteur USB-C coudé à 90°.',
		pros: 'Cache totalement la prise USB, épaisseur minimale (~12 mm), coût de revient de quelques euros de filament PETG.',
		cons: 'Spécifique à un modèle précis de tablette ; préférez le PETG au PLA si la tablette est exposée au soleil derrière une baie vitrée.',
	},
	{
		title: 'Cadre mural commercial (aluminium ou acrylique)',
		level: 'Débutant à Intermédiaire — 30 min',
		description: 'Boîtier mural fermé qui encadre les bords de l’écran comme un véritable afficheur domotique.',
		pros: 'Finition très propre dans une entrée ou un salon, protège le connecteur.',
		cons: 'Vérifiez que l’ouverture laisse libre la caméra frontale et le capteur de luminosité si vous utilisez Fully Kiosk.',
	},
	{
		title: 'Intégration encastrée avec alimentation en cloison (par un professionnel)',
		level: 'Avancé / Électricien — sur chantier ou rénovation',
		description: 'Boîtier d’encastrement mural derrière la tablette, avec convertisseur USB-C encastré ou prise en retrait alimentée depuis le circuit électrique.',
		pros: 'Aucun câble visible, tablette affleurante au mur.',
		cons: 'Toute intervention sur le réseau 230 V encastré doit respecter la norme NF C 15-100 (boîtier d’encastrement adapté, protection divisionnaire, dissipation thermique) et être confiée à un électricien qualifié.',
	},
];

export const BATTERY_SAFETY_RULES = [
	{
		title: 'Ne laissez jamais une batterie lithium à 100 % en permanence',
		detail: 'Une tablette branchée 24h/24 à 100 % finit souvent par voir sa batterie gonfler après 12 à 24 mois, ce qui pousse l’écran et crée un risque thermique. Deux parades fiables : activer la limite matérielle du constructeur (80 % sur Samsung One UI / Lenovo) OU piloter le chargeur via une prise connectée entre 25 % et 80 % grâce au capteur sensor.<tablette>_battery_level de Home Assistant.',
	},
	{
		title: 'Utilisez un câble USB-C coudé à 90° et un chargeur 10–18 W de marque',
		detail: 'Un câble droit plié contre un cadre mural fatigue le port USB-C de la tablette. Prenez un connecteur coudé 90° (profil bas) et un bloc secteur USB certifié CE (Anker, Ugreen, Samsung) sans chercher la charge ultra-rapide : une charge lente chauffe beaucoup moins.',
	},
	{
		title: 'Ménagez 2 à 3 mm de ventilation au dos',
		detail: 'Ne collez jamais le dos d’une tablette directement sur un isolant ou avec un adhésif double-face plein. L’air doit pouvoir circuler derrière la batterie et le processeur, surtout lorsque l’écran reste allumé longtemps.',
	},
	{
		title: 'Pas de bricolage 230 V dans une boîte d’encastrement fermée',
		detail: 'N’enfermez jamais un chargeur USB de téléphone standard noyé dans de la laine de verre ou scotché sur des dominos 230 V derrière la cloison. En l’absence de prise murale existante, tirez un câble basse tension USB (5 V) en goulotte fine jusqu’à une prise accessible, ou faites poser une prise encastrée conforme par un électricien.',
	},
];

export const WAKE_METHODS_COMPARISON = [
	{
		method: 'Caméra frontale via Fully Kiosk Browser (Motion Detection)',
		hardware: 'Tablette Android uniquement (aucun matériel externe)',
		integration: 'Interne à Fully Kiosk Browser (locale sur la tablette)',
		pros: 'Gratuit (hors licence Fully Kiosk PLUS ~7,90 €), aucun capteur à fixer au mur, déclenchement immédiat face à l’écran.',
		cons: 'Inefficace dans l’obscurité totale ; sollicite le processeur et fait légèrement tiédir la tablette (consommation supérieure).',
		bestFor: 'Pièce de vie éclairée ou entrée avec veilleuse nocturne.',
	},
	{
		method: 'Capteur de mouvement PIR Zigbee (ex. SONOFF SNZB-03P, Aqara P1)',
		hardware: 'Capteur infrarouge passif sur pile CR2450/CR2477 (~15–25 €) + coordinateur Zigbee sur HA',
		integration: 'ZHA ou Zigbee2MQTT → automatisation Home Assistant → service button.press / switch.turn_on de l’écran Fully Kiosk',
		pros: 'Consommation nulle sur la tablette, fonctionne dans le noir complet, peut être placé en amont dans le couloir pour que l’écran soit déjà allumé quand vous arrivez devant.',
		cons: 'Ne détecte que le mouvement franc : si vous restez immobile à lire un graphique devant la tablette, le PIR repasse à off au bout de son délai (30 à 60 s).',
		bestFor: 'Couloir, entrée, cuisine : le meilleur rapport simplicité / réactivité.',
	},
	{
		method: 'Radar de présence mmWave (ex. Aqara FP2 ou LD2410 ESPHome)',
		hardware: 'Capteur radar 24/60 GHz alimenté en USB-C (~35–75 €)',
		integration: 'HomeKit Controller local (Aqara FP2) ou ESPHome natif → automatisation Home Assistant',
		pros: 'Détecte la micro-respiration : l’écran ne s’éteint jamais tant que vous êtes devant, et permet de définir une sous-zone précise (ex. « à moins de 1,2 m de la tablette »).',
		cons: 'Nécessite une alimentation USB pour le capteur ; demande un réglage des zones pour ignorer un ventilateur ou un animal.',
		bestFor: 'Salon ou pièce ouverte où l’on passe souvent sans vouloir allumer la tablette à 4 mètres.',
	},
];

export const WAKE_AUTOMATIONS_SCENARIOS = [
	{
		id: 'scenario-fk-camera',
		title: 'Scénario 1 — Réveil autonome par caméra frontale + extinction nocturne (Android + Fully Kiosk)',
		summary:
			'La tablette gère elle-même le réveil à l’approche grâce à sa caméra frontale en journée, mais Home Assistant coupe la détection et baisse la luminosité la nuit pour ne pas éblouir le couloir.',
		prerequisites: [
			'Tablette Android avec Fully Kiosk Browser (licence PLUS activée pour Remote Admin).',
			'Intégration officielle « Fully Kiosk Browser » ajoutée dans Home Assistant (Paramètres → Appareils et services).',
			'Dans Fully Kiosk : Motion Detection → Activer « Visual Motion Detection » et « Turn Screen On on Motion », Screen Off Timer réglé à 45 secondes.',
		],
		yaml: `alias: "Tablette murale - Mode jour/nuit et luminosité intelligente"
description: "Ajuste la luminosité de la tablette et coupe le réveil caméra pendant la nuit"
mode: single
trigger:
  - platform: time
    at: "22:30:00"
    id: "nuit"
  - platform: time
    at: "07:00:00"
    id: "jour"
condition: []
action:
  - choose:
      - conditions:
          - condition: trigger
            id: "nuit"
        sequence:
          - action: number.set_value
            target:
              entity_id: number.tablette_entree_screen_brightness
            data:
              value: 15
          - action: switch.turn_off
            target:
              entity_id: switch.tablette_entree_screensaver
          - action: switch.turn_off
            target:
              entity_id: switch.tablette_entree_Parcours_motion_detection
            enabled: false
          - action: switch.turn_off
            target:
              entity_id: switch.tablette_entree_screen
      - conditions:
          - condition: trigger
            id: "jour"
        sequence:
          - action: number.set_value
            target:
              entity_id: number.tablette_entree_screen_brightness
            data:
              value: 180
          - action: switch.turn_on
            target:
              entity_id: switch.tablette_entree_screen`,
		notes: [
			'Remplacez tablette_entree par le nom de votre appareil créé par l’intégration Fully Kiosk Browser.',
			'number.tablette_entree_screen_brightness accepte une valeur de 0 à 255.',
			'Le Screen Off Timer interne de Fully Kiosk (ex. 45 s) se charge d’éteindre l’écran dès qu’il n’y a plus personne devant la tablette.',
		],
	},
	{
		id: 'scenario-ha-pir-mmwave',
		title: 'Scénario 2 — Allumage sur approche par capteur PIR ou zone mmWave + protection batterie 25–80 %',
		summary:
			'Zéro sollicitation de la caméra : un capteur PIR Zigbee ou une zone radar mmWave allume l’écran dès que vous approchez à moins de 1,5 m, ajuste la luminosité selon l’heure et l’éteint 60 secondes après votre départ.',
		prerequisites: [
			'Capteur binary_sensor.presence_couloir_occupancy (PIR Zigbee SNZB-03P ou zone Aqara FP2).',
			'Intégration Fully Kiosk Browser exposant switch.tablette_entree_screen et number.tablette_entree_screen_brightness.',
			'Optionnel : prise connectée switch.prise_chargeur_tablette pour maintenir la batterie entre 25 % et 80 %.',
		],
		yaml: `alias: "Tablette murale - Allumage sur présence et extinction temporisée"
description: "Allume l'écran sur détection PIR/mmWave avec luminosité adaptée jour/nuit, éteint après 60 s sans présence"
mode: restart
trigger:
  - platform: state
    entity_id: binary_sensor.presence_couloir_occupancy
    to: "on"
    id: "approche"
  - platform: state
    entity_id: binary_sensor.presence_couloir_occupancy
    to: "off"
    for: "00:01:00"
    id: "depart"
condition: []
action:
  - choose:
      - conditions:
          - condition: trigger
            id: "approche"
        sequence:
          - action: number.set_value
            target:
              entity_id: number.tablette_entree_screen_brightness
            data:
              value: >
                {{ 25 if (now().hour >= 22 or now().hour < 7) else 200 }}
          - action: switch.turn_on
            target:
              entity_id: switch.tablette_entree_screen
      - conditions:
          - condition: trigger
            id: "depart"
        sequence:
          - action: switch.turn_off
            target:
              entity_id: switch.tablette_entree_screen`,
		batteryYaml: `alias: "Tablette murale - Protection batterie 25-80%"
description: "Coupe le chargeur à 80 % et le rallume sous 25 % pour éviter le gonflement de la batterie"
mode: single
trigger:
  - platform: numeric_state
    entity_id: sensor.tablette_entree_battery
    above: 80
    id: "charge_haute"
  - platform: numeric_state
    entity_id: sensor.tablette_entree_battery
    below: 25
    id: "charge_basse"
action:
  - choose:
      - conditions:
          - condition: trigger
            id: "charge_haute"
        sequence:
          - action: switch.turn_off
            target:
              entity_id: switch.prise_chargeur_tablette
      - conditions:
          - condition: trigger
            id: "charge_basse"
        sequence:
          - action: switch.turn_on
            target:
              entity_id: switch.prise_chargeur_tablette`,
		notes: [
			'Le mode restart garantit que si vous revenez devant la tablette avant la fin de la minute, l’écran reste allumé sans coupure.',
			'Pour éviter les réveils intempestifs la nuit (ex. chat ou passage vers les chambres), ajoutez une condition horaire (06:30–23:30) ou baissez la luminosité nocturne à 20/255.',
		],
	},
];

export const REPRODUCIBLE_DASHBOARDS = [
	{
		id: 'debutant',
		badge: 'Niveau 1 — 100 % natif (sans add-on tiers)',
		title: 'Dashboard Débutant : Entrée & essentiels du quotidien',
		target: 'Une seule vue lisible à 1,5 mètre, sans ascenseur vertical (no-scroll), utilisant uniquement les cartes natives Sections et Tuiles (Tile) de Home Assistant.',
		preview: {
			layout: 'Grille 2 colonnes (paysage 10–11")',
			cards: [
				{ title: 'Météo & Extérieur', value: '18,4 °C · Ensoleillé', sub: 'weather.maison · Prévisions 4 jours', accent: 'teal' },
				{ title: 'Mode Maison', value: 'Présent · Salon 20,6 °C', sub: 'Boutons rapides : Tout éteindre · Départ', accent: 'blue' },
				{ title: 'Éclairages principaux', value: 'Entrée (Allumé) · Salon (Éteint) · Cuisine (Éteint)', sub: 'Tuiles tactiles larges avec retour d’état', accent: 'amber' },
				{ title: 'Accès & Ouvertures', value: 'Porte d’entrée : Fermée · Garage : Fermé', sub: 'Capteurs d’ouverture binary_sensor.*', accent: 'emerald' },
			],
		},
		componentsUsed: [
			'Vue de type Sections (grille moderne introduite dans Home Assistant 2024+)',
			'Cartes Tuile (type: tile) avec boutons d’action rapide intégrés',
			'Carte Météo (type: weather-forecast)',
		],
		integrationsRequired: [
			'Météo (Météo-France ou Met.no intégré par défaut)',
			'Vos entités d’éclairage (light.*) et capteurs de température (sensor.*)',
		],
		dependencies: 'Aucune carte HACS requise : fonctionne immédiatement sur toute installation Home Assistant.',
		paramsToCustomize: [
			'weather.maison → votre entité météo',
			'light.plafonnier_entree, light.salon, light.cuisine → vos lampes principales',
			'sensor.salon_temperature → votre sonde de température',
			'script.tout_eteindre → script ou scène d’extinction générale',
		],
		yaml: `title: Tablette Entrée
views:
  - title: Accueil
    path: accueil
    type: sections
    max_columns: 2
    sections:
      - type: grid
        cards:
          - type: heading
            heading: Météo & ambiance
            icon: mdi:weather-partly-cloudy
          - type: weather-forecast
            entity: weather.maison
            show_forecast: true
            forecast_type: daily
          - type: tile
            entity: sensor.salon_temperature
            name: Température Salon
            icon: mdi:thermometer
          - type: tile
            entity: script.tout_eteindre
            name: Tout éteindre
            icon: mdi:power
             tap_action:
              action: toggle
      - type: grid
        cards:
          - type: heading
            heading: Éclairages rapides
            icon: mdi:lightbulb-group
          - type: tile
            entity: light.plafonnier_entree
            name: Entrée
            features:
              - type: light-brightness
          - type: tile
            entity: light.salon
            name: Salon
            features:
              - type: light-brightness
          - type: tile
            entity: light.cuisine
            name: Cuisine
          - type: tile
            entity: binary_sensor.porte_entree_contact
            name: Porte d'entrée
            icon: mdi:door-closed`,
	},
	{
		id: 'familial',
		badge: 'Niveau 2 — Confort, volets & agenda',
		title: 'Dashboard Familial : Chauffage, volets, pièces et scénarios',
		target: 'Pensé pour toute la famille dans la pièce de vie : pilotage des volets roulants, consigne de chauffage, agenda du jour et consommation électrique instantanée.',
		preview: {
			layout: 'Grille 3 colonnes (paysage 11")',
			cards: [
				{ title: 'Chauffage & Climat', value: 'Consigne 20,0 °C (Mesuré 20,4 °C)', sub: 'Thermostat + mode Éco / Confort', accent: 'amber' },
				{ title: 'Volets roulants', value: 'Séjour 100 % · Chambres 0 %', sub: 'Boutons Monter / Stop / Descendre', accent: 'blue' },
				{ title: 'Scénarios famille', value: 'Soirée cinéma · Nuit · Télétravail · Absence', sub: 'Grille de boutons scènes 1 tap', accent: 'teal' },
				{ title: 'Agenda & Énergie', value: '14h00 Dentiste · Conso : 640 W', sub: 'calendar.famille + sensor.puissance_maison', accent: 'emerald' },
			],
		},
		componentsUsed: [
			'Carte Thermostat (type: thermostat) et tuiles avec curseur de volet (cover-position)',
			'Carte Calendrier (type: calendar) en vue liste journalière',
			'Carte Jauge (type: gauge) pour la puissance électrique en temps réel',
		],
		integrationsRequired: [
			'Intégration Climate / Thermostat (Versatile Thermostat, fil pilote ou têtes thermostatiques)',
			'Volets roulants (cover.*)',
			'Calendrier local Home Assistant, Google Calendar ou CalDAV',
			'Capteur de puissance en watts (Linky TIC, Shelly EM ou prise connectée)',
		],
		dependencies: '100 % natif Home Assistant (compatible avec Mushroom Cards via HACS si vous souhaitez des puces d’état en haut de page).',
		paramsToCustomize: [
			'climate.chauffage_sejour → votre thermostat principal',
			'cover.volets_sejour, cover.volet_cuisine → vos volets roulants',
			'calendar.famille → votre calendrier partagé',
			'sensor.puissance_instantanee_w → votre capteur de puissance (W)',
		],
		yaml: `title: Tablette Famille
views:
  - title: Maison
    path: maison
    type: sections
    max_columns: 3
    sections:
      - type: grid
        cards:
          - type: heading
            heading: Chauffage & Volets
            icon: mdi:home-thermometer
          - type: thermostat
            entity: climate.chauffage_sejour
            name: Séjour
          - type: tile
            entity: cover.volets_sejour
            name: Volets Séjour
            features:
              - type: cover-open-close
              - type: cover-position
          - type: tile
            entity: cover.volet_cuisine
            name: Volet Cuisine
            features:
              - type: cover-open-close
      - type: grid
        cards:
          - type: heading
            heading: Pièces & Scénarios
            icon: mdi:sofa
          - type: tile
            entity: scene.soiree_cinema
            name: Soirée cinéma
            icon: mdi:movie-open
            tap_action:
              action: toggle
          - type: tile
            entity: scene.mode_nuit
            name: Bonne nuit
            icon: mdi:weather-night
            tap_action:
              action: toggle
          - type: tile
            entity: light.groupe_sejour
            name: Lumières Séjour
            features:
              - type: light-brightness
          - type: tile
            entity: light.groupe_chambres
            name: Lumières Chambres
      - type: grid
        cards:
          - type: heading
            heading: Agenda & Conso
            icon: mdi:calendar-clock
          - type: gauge
            entity: sensor.puissance_instantanee_w
            name: Puissance maison
            min: 0
            max: 6000
            severity:
              green: 0
              yellow: 2500
              red: 4500
          - type: calendar
            entities:
              - calendar.famille
            initial_view: listWeek`,
	},
	{
		id: 'avance',
		badge: 'Niveau 3 — Supervision complète',
		title: 'Dashboard Avancé : Caméras, énergie, alarme Alarmo et présence',
		target: 'Poste de supervision complet : flux vidéo de l’entrée, armement de l’alarme avec pavé numérique, suivi photovoltaïque/Linky et état des présences par pièce.',
		preview: {
			layout: 'Grille 3 colonnes + sous-vue Caméras',
			cards: [
				{ title: 'Caméra Entrée / Portail', value: 'Flux WebRTC / RTSP en direct', sub: 'camera.portail_fluent · Prévisualisation live', accent: 'blue' },
				{ title: 'Alarme Maison', value: 'Désarmée · Code PIN sur écran', sub: 'alarm_control_panel.alarmo · Modes Nuit / Absent', accent: 'amber' },
				{ title: 'Bilan Énergie 24 h', value: 'Soutirage 4,2 kWh · Solaire 6,8 kWh', sub: 'energy-distribution + graphique 24 h', accent: 'emerald' },
				{ title: 'Présence & Santé système', value: 'Salon occupé · Batterie tablette 76 %', sub: 'Capteurs mmWave + supervision charge', accent: 'teal' },
			],
		},
		componentsUsed: [
			'Carte Picture Glance / Picture Entity (type: picture-entity) pour la caméra',
			'Carte Panneau d’alarme (type: alarm-panel) avec code PIN tactile',
			'Carte Graphique de statistiques (type: statistics-graph) et distribution d’énergie',
		],
		integrationsRequired: [
			'Caméra compatible RTSP/ONVIF ou Reolink/Tapo intégrée dans HA (WebRTC go2rtc natif HA)',
			'Panneau d’alarme (Alarmo ou Manual Alarm Control Panel)',
			'Tableau Énergie configuré + entités de présence',
		],
		dependencies: 'Fonctionne avec les cartes natives HA. Optionnel via HACS : Advanced Camera Card (ex-Frigate Card) ou Alarmo Card pour un pavé numérique agrandi.',
		paramsToCustomize: [
			'camera.entree_fluent → flux secondaire (substream) de votre caméra pour ne pas saturer le processeur de la tablette',
			'alarm_control_panel.alarmo → votre entité d’alarme',
			'sensor.puissance_instantanee_w, sensor.tablette_entree_battery → vos capteurs de suivi',
		],
		yaml: `title: Supervision Murale
views:
  - title: Supervision
    path: supervision
    type: sections
    max_columns: 3
    sections:
      - type: grid
        cards:
          - type: heading
            heading: Sécurité & Accès
            icon: mdi:shield-home
          - type: picture-entity
            entity: camera.entree_fluent
            name: Caméra Entrée
            camera_view: live
            show_state: false
          - type: alarm-panel
            entity: alarm_control_panel.alarmo
            name: Alarme Maison
            states:
              - arm_home
              - arm_away
              - arm_night
      - type: grid
        cards:
          - type: heading
            heading: Énergie & Courbes
            icon: mdi:solar-power-variant
          - type: statistics-graph
            title: Puissance (24 h)
            entities:
              - sensor.puissance_instantanee_w
            chart_type: line
            period: hour
            days_to_show: 1
          - type: energy-distribution
            link_dashboard: true
      - type: grid
        cards:
          - type: heading
            heading: Présence & Tablette
            icon: mdi:radar
          - type: tile
            entity: binary_sensor.presence_salon_occupancy
            name: Présence Salon (mmWave)
          - type: tile
            entity: sensor.tablette_entree_battery
            name: Batterie Tablette
          - type: tile
            entity: switch.prise_chargeur_tablette
            name: Chargeur 25-80 %`,
	},
];

const F = 'system-ui,-apple-system,Segoe UI,Roboto,sans-serif';

export const WALL_TABLET_SVGS = [
	{
		id: 'svg-architecture',
		title: '1. Architecture globale : Tablette murale ↔ Wi-Fi local ↔ Home Assistant ↔ Équipements',
		legend:
			'Distinction des flux : en orange pointillé l’alimentation basse tension 5 V USB-C de la tablette ; en bleu/vert continu la communication réseau local (Wi-Fi / Ethernet / Zigbee). La tablette n’exécute que l’affichage : le serveur Home Assistant centralise toute l’intelligence.',
		svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 340" role="img" aria-label="Schéma architecture tablette murale Home Assistant sur réseau Wi-Fi local">
  <defs>
    <marker id="wt-arr-comm" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#0f766e"/></marker>
    <marker id="wt-arr-pwr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#ea580c"/></marker>
  </defs>
  <rect x="0" y="0" width="820" height="340" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="410" y="26" text-anchor="middle" font-family="${F}" font-size="14" font-weight="700" fill="#0f172a">Architecture locale : Tablette d'affichage, Routeur Wi-Fi, Serveur HA et Équipements</text>

  <!-- 1. Tablette murale -->
  <rect x="24" y="54" width="168" height="126" rx="10" fill="#ffffff" stroke="#0f766e" stroke-width="2"/>
  <rect x="24" y="54" width="168" height="28" rx="8" fill="#0f766e"/>
  <text x="108" y="73" text-anchor="middle" font-family="${F}" font-size="11.5" font-weight="700" fill="#ffffff">1. Tablette murale</text>
  <text x="108" y="98" text-anchor="middle" font-family="${F}" font-size="10.5" font-weight="600" fill="#1e293b">Fully Kiosk / Companion</text>
  <text x="108" y="116" text-anchor="middle" font-family="${F}" font-size="10" fill="#475569">Affiche le dashboard</text>
  <text x="108" y="134" text-anchor="middle" font-family="${F}" font-size="10" fill="#475569">IP fixe : 192.168.1.50</text>
  <text x="108" y="154" text-anchor="middle" font-family="${F}" font-size="9.5" font-weight="700" fill="#0f766e">Client d'affichage</text>

  <!-- 2. Routeur Wi-Fi / LAN -->
  <rect x="236" y="54" width="154" height="126" rx="10" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
  <rect x="236" y="54" width="154" height="28" rx="8" fill="#0284c7"/>
  <text x="313" y="73" text-anchor="middle" font-family="${F}" font-size="11.5" font-weight="700" fill="#ffffff">2. Réseau local LAN</text>
  <text x="313" y="98" text-anchor="middle" font-family="${F}" font-size="10.5" font-weight="600" fill="#1e293b">Routeur Wi-Fi / Box</text>
  <text x="313" y="116" text-anchor="middle" font-family="${F}" font-size="10" fill="#475569">Wi-Fi 5 GHz (tablette)</text>
  <text x="313" y="134" text-anchor="middle" font-family="${F}" font-size="10" fill="#475569">Ethernet RJ45 (serveur)</text>
  <text x="313" y="154" text-anchor="middle" font-family="${F}" font-size="9.5" font-weight="700" fill="#0284c7">100 % hors cloud</text>

  <!-- 3. Serveur Home Assistant -->
  <rect x="434" y="54" width="172" height="126" rx="10" fill="#ffffff" stroke="#0f766e" stroke-width="2"/>
  <rect x="434" y="54" width="172" height="28" rx="8" fill="#0f766e"/>
  <text x="520" y="73" text-anchor="middle" font-family="${F}" font-size="11.5" font-weight="700" fill="#ffffff">3. Serveur Home Assistant</text>
  <text x="520" y="98" text-anchor="middle" font-family="${F}" font-size="10.5" font-weight="600" fill="#1e293b">HA Green / RPi 5 / Mini-PC</text>
  <text x="520" y="116" text-anchor="middle" font-family="${F}" font-size="10" fill="#475569">Port :8123 (WebSocket)</text>
  <text x="520" y="134" text-anchor="middle" font-family="${F}" font-size="10" fill="#475569">Automatisations &amp; états</text>
  <text x="520" y="154" text-anchor="middle" font-family="${F}" font-size="9.5" font-weight="700" fill="#0f766e">Cerveau 24h/24</text>

  <!-- 4. Équipements & Capteurs -->
  <rect x="650" y="54" width="146" height="126" rx="10" fill="#ffffff" stroke="#334155" stroke-width="2"/>
  <rect x="650" y="54" width="146" height="28" rx="8" fill="#334155"/>
  <text x="723" y="73" text-anchor="middle" font-family="${F}" font-size="11.5" font-weight="700" fill="#ffffff">4. Équipements</text>
  <text x="723" y="98" text-anchor="middle" font-family="${F}" font-size="10" font-weight="600" fill="#1e293b">Capteur PIR / mmWave</text>
  <text x="723" y="116" text-anchor="middle" font-family="${F}" font-size="10" fill="#475569">Lumières, volets, climat</text>
  <text x="723" y="134" text-anchor="middle" font-family="${F}" font-size="10" fill="#475569">Prise chargeur 25–80 %</text>
  <text x="723" y="154" text-anchor="middle" font-family="${F}" font-size="9.5" font-weight="700" fill="#334155">Zigbee / Wi-Fi / Thread</text>

  <!-- Liaisons communication -->
  <line x1="192" y1="115" x2="234" y2="115" stroke="#0f766e" stroke-width="2.5" marker-end="url(#wt-arr-comm)"/>
  <text x="213" y="106" text-anchor="middle" font-family="${F}" font-size="9.5" font-weight="700" fill="#0f766e">Wi-Fi</text>

  <line x1="390" y1="115" x2="432" y2="115" stroke="#0f766e" stroke-width="2.5" marker-end="url(#wt-arr-comm)"/>
  <text x="411" y="106" text-anchor="middle" font-family="${F}" font-size="9.5" font-weight="700" fill="#0f766e">RJ45</text>

  <line x1="606" y1="115" x2="648" y2="115" stroke="#0f766e" stroke-width="2.5" marker-end="url(#wt-arr-comm)"/>
  <text x="627" y="106" text-anchor="middle" font-family="${F}" font-size="9.5" font-weight="700" fill="#0f766e">Radio</text>

  <!-- Bloc Alimentation USB séparé en bas -->
  <rect x="24" y="216" width="290" height="68" rx="10" fill="#fff7ed" stroke="#ea580c" stroke-width="1.8"/>
  <text x="169" y="238" text-anchor="middle" font-family="${F}" font-size="11" font-weight="700" fill="#9a3412">Alimentation : Prise connectée + Chargeur USB 5 V</text>
  <text x="169" y="256" text-anchor="middle" font-family="${F}" font-size="10" fill="#7c2d12">Câble USB-C coudé 90° vers la tablette (cycle 25 % – 80 %)</text>
  <text x="169" y="272" text-anchor="middle" font-family="${F}" font-size="9.5" fill="#9a3412">Pilotée par Home Assistant selon sensor.tablette_battery</text>

  <!-- Liaison alimentation 5V -->
  <path d="M 108 216 V 184" fill="none" stroke="#ea580c" stroke-width="2.5" stroke-dasharray="5 3" marker-end="url(#wt-arr-pwr)"/>
  <rect x="116" y="190" width="76" height="18" rx="4" fill="#ffedd5"/>
  <text x="154" y="203" text-anchor="middle" font-family="${F}" font-size="9.5" font-weight="700" fill="#c2410c">5 V USB-C</text>

  <!-- Liaison contrôle prise chargeur depuis HA -->
  <path d="M 520 180 V 250 H 316" fill="none" stroke="#0f766e" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#wt-arr-comm)"/>
  <rect x="356" y="238" width="142" height="20" rx="4" fill="#ecfdf5" stroke="#99f6e4" stroke-width="1"/>
  <text x="427" y="252" text-anchor="middle" font-family="${F}" font-size="9.5" font-weight="700" fill="#0f766e">Coupe à 80 % / ON à 25 %</text>

  <!-- Légende -->
  <rect x="24" y="304" width="14" height="10" fill="#0f766e"/>
  <text x="44" y="313" font-family="${F}" font-size="10.5" fill="#334155">Communication données (Wi-Fi / RJ45 / Zigbee)</text>
  <rect x="330" y="304" width="14" height="10" fill="#ea580c"/>
  <text x="350" y="313" font-family="${F}" font-size="10.5" fill="#334155">Alimentation électrique basse tension (5 V USB)</text>
</svg>`,
	},
	{
		id: 'svg-power-usb',
		title: '2. Alimentation USB sécurisée et préservation de la batterie (cycle 25 % – 80 %)',
		legend:
			'Aucun raccordement 230 V improvisé : la prise gigogne se branche sur une prise murale existante, le chargeur USB délivre du 5 V en sécurité via un câble ruban et une fiche coudée à 90° logée dans le cadre.',
		svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 310" role="img" aria-label="Schéma alimentation USB tablette murale avec prise connectée et connecteur coudé 90 degrés">
  <defs>
    <marker id="wt-p2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#ea580c"/></marker>
    <marker id="wt-c2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#0f766e"/></marker>
  </defs>
  <rect x="0" y="0" width="820" height="310" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="410" y="26" text-anchor="middle" font-family="${F}" font-size="14" font-weight="700" fill="#0f172a">Chaîne d'alimentation basse tension 5 V USB et gestion de charge</text>

  <!-- Prise murale + Prise connectée -->
  <rect x="24" y="56" width="176" height="114" rx="10" fill="#ffffff" stroke="#475569" stroke-width="2"/>
  <rect x="24" y="56" width="176" height="28" rx="8" fill="#334155"/>
  <text x="112" y="75" text-anchor="middle" font-family="${F}" font-size="11.5" font-weight="700" fill="#ffffff">1. Prise murale + Smart Plug</text>
  <text x="112" y="100" text-anchor="middle" font-family="${F}" font-size="10" font-weight="600" fill="#1e293b">Prise 230 V existante</text>
  <text x="112" y="118" text-anchor="middle" font-family="${F}" font-size="10" fill="#475569">+ Prise connectée gigogne</text>
  <text x="112" y="136" text-anchor="middle" font-family="${F}" font-size="9.5" fill="#0f766e" font-weight="700">Aucun fil 230 V à dénuder</text>

  <!-- Chargeur USB 5V -->
  <rect x="238" y="56" width="164" height="114" rx="10" fill="#ffffff" stroke="#ea580c" stroke-width="2"/>
  <rect x="238" y="56" width="164" height="28" rx="8" fill="#ea580c"/>
  <text x="320" y="75" text-anchor="middle" font-family="${F}" font-size="11.5" font-weight="700" fill="#ffffff">2. Chargeur USB 5 V</text>
  <text x="320" y="100" text-anchor="middle" font-family="${F}" font-size="10" font-weight="600" fill="#1e293b">Bloc secteur CE 10–18 W</text>
  <text x="320" y="118" text-anchor="middle" font-family="${F}" font-size="10" fill="#475569">5 V / 2 A (charge douce)</text>
  <text x="320" y="136" text-anchor="middle" font-family="${F}" font-size="9.5" fill="#c2410c" font-weight="700">Évite toute surchauffe</text>

  <!-- Câble plat + coude 90 -->
  <rect x="440" y="56" width="164" height="114" rx="10" fill="#ffffff" stroke="#ea580c" stroke-width="2"/>
  <rect x="440" y="56" width="164" height="28" rx="8" fill="#ea580c"/>
  <text x="522" y="75" text-anchor="middle" font-family="${F}" font-size="11.5" font-weight="700" fill="#ffffff">3. Câble plat + coudé 90°</text>
  <text x="522" y="100" text-anchor="middle" font-family="${F}" font-size="10" font-weight="600" fill="#1e293b">Goulotte fine ou plinthe</text>
  <text x="522" y="118" text-anchor="middle" font-family="${F}" font-size="10" fill="#475569">Fiche USB-C coudée 90°</text>
  <text x="522" y="136" text-anchor="middle" font-family="${F}" font-size="9.5" fill="#c2410c" font-weight="700">Zéro torsion sur le port</text>

  <!-- Tablette + ventilation -->
  <rect x="642" y="56" width="154" height="114" rx="10" fill="#ffffff" stroke="#0f766e" stroke-width="2"/>
  <rect x="642" y="56" width="154" height="28" rx="8" fill="#0f766e"/>
  <text x="719" y="75" text-anchor="middle" font-family="${F}" font-size="11.5" font-weight="700" fill="#ffffff">4. Tablette au mur</text>
  <text x="719" y="100" text-anchor="middle" font-family="${F}" font-size="10" font-weight="600" fill="#1e293b">Espace 2–3 mm au dos</text>
  <text x="719" y="118" text-anchor="middle" font-family="${F}" font-size="10" fill="#475569">Batterie 25 % ↔ 80 %</text>
  <text x="719" y="136" text-anchor="middle" font-family="${F}" font-size="9.5" fill="#0f766e" font-weight="700">Pas de gonflement</text>

  <!-- Flèches puissance -->
  <line x1="200" y1="113" x2="236" y2="113" stroke="#ea580c" stroke-width="2.5" marker-end="url(#wt-p2)"/>
  <line x1="402" y1="113" x2="438" y2="113" stroke="#ea580c" stroke-width="2.5" marker-end="url(#wt-p2)"/>
  <line x1="604" y1="113" x2="640" y2="113" stroke="#ea580c" stroke-width="2.5" marker-end="url(#wt-p2)"/>

  <!-- Boucle retour niveau batterie via HA -->
  <path d="M 719 170 V 228 H 112 V 172" fill="none" stroke="#0f766e" stroke-width="2.2" stroke-dasharray="6 4" marker-end="url(#wt-c2)"/>
  <rect x="215" y="214" width="390" height="28" rx="6" fill="#ecfdf5" stroke="#5eead4" stroke-width="1.5"/>
  <text x="410" y="232" text-anchor="middle" font-family="${F}" font-size="10.5" font-weight="700" fill="#0f766e">Boucle Home Assistant : sensor.tablette_battery → OFF à 80 % / ON à 25 %</text>

  <text x="410" y="284" text-anchor="middle" font-family="${F}" font-size="10.5" fill="#475569">Astuce Samsung / Lenovo : si la tablette intègre l'option « Protection de la batterie (80 %) », la prise connectée devient facultative.</text>
</svg>`,
	},
	{
		id: 'svg-wake-flow',
		title: '3. Séquence d’allumage automatique : Détection de présence → Home Assistant → Réveil écran',
		legend:
			'Lorsqu’une personne entre dans le champ du capteur PIR ou mmWave, l’événement est transmis en moins de 300 ms à Home Assistant, qui ajuste la luminosité selon l’heure (jour/nuit) et réveille l’écran de Fully Kiosk.',
		svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 290" role="img" aria-label="Séquence détection de présence vers Home Assistant et réveil écran tablette">
  <defs>
    <marker id="wt-w3" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#0f766e"/></marker>
  </defs>
  <rect x="0" y="0" width="820" height="290" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="410" y="26" text-anchor="middle" font-family="${F}" font-size="14" font-weight="700" fill="#0f172a">Boucle de réveil automatique sur approche et extinction temporisée</text>

  <!-- Étape 1 -->
  <rect x="24" y="56" width="172" height="108" rx="10" fill="#ffffff" stroke="#0f766e" stroke-width="2"/>
  <rect x="24" y="56" width="172" height="28" rx="8" fill="#0f766e"/>
  <text x="110" y="75" text-anchor="middle" font-family="${F}" font-size="11.5" font-weight="700" fill="#ffffff">1. Approche (1 à 2 m)</text>
  <text x="110" y="100" text-anchor="middle" font-family="${F}" font-size="10" font-weight="600" fill="#1e293b">Capteur PIR ou mmWave</text>
  <text x="110" y="118" text-anchor="middle" font-family="${F}" font-size="10" fill="#475569">Passe à l'état « on »</text>
  <text x="110" y="138" text-anchor="middle" font-family="${F}" font-size="9.5" fill="#0f766e" font-weight="700">Même dans le noir complet</text>

  <!-- Étape 2 -->
  <rect x="232" y="56" width="172" height="108" rx="10" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
  <rect x="232" y="56" width="172" height="28" rx="8" fill="#0284c7"/>
  <text x="318" y="75" text-anchor="middle" font-family="${F}" font-size="11.5" font-weight="700" fill="#ffffff">2. Automatisation HA</text>
  <text x="318" y="100" text-anchor="middle" font-family="${F}" font-size="10" font-weight="600" fill="#1e293b">Vérifie l'heure (Jour/Nuit)</text>
  <text x="318" y="118" text-anchor="middle" font-family="${F}" font-size="10" fill="#475569">Jour : luminosité 200/255</text>
  <text x="318" y="138" text-anchor="middle" font-family="${F}" font-size="9.5" fill="#0284c7" font-weight="700">Nuit : luminosité douce 25</text>

  <!-- Étape 3 -->
  <rect x="440" y="56" width="172" height="108" rx="10" fill="#ffffff" stroke="#0f766e" stroke-width="2"/>
  <rect x="440" y="56" width="172" height="28" rx="8" fill="#0f766e"/>
  <text x="526" y="75" text-anchor="middle" font-family="${F}" font-size="11.5" font-weight="700" fill="#ffffff">3. API Fully Kiosk</text>
  <text x="526" y="100" text-anchor="middle" font-family="${F}" font-size="10" font-weight="600" fill="#1e293b">switch.tablette_screen ON</text>
  <text x="526" y="118" text-anchor="middle" font-family="${F}" font-size="10" fill="#475569">Réveil instantané (&lt; 0,5 s)</text>
  <text x="526" y="138" text-anchor="middle" font-family="${F}" font-size="9.5" fill="#0f766e" font-weight="700">Dashboard prêt au toucher</text>

  <!-- Étape 4 -->
  <rect x="648" y="56" width="148" height="108" rx="10" fill="#ffffff" stroke="#475569" stroke-width="2"/>
  <rect x="648" y="56" width="148" height="28" rx="8" fill="#475569"/>
  <text x="722" y="75" text-anchor="middle" font-family="${F}" font-size="11.5" font-weight="700" fill="#ffffff">4. Extinction auto</text>
  <text x="722" y="100" text-anchor="middle" font-family="${F}" font-size="10" font-weight="600" fill="#1e293b">Absence &gt; 60 secondes</text>
  <text x="722" y="118" text-anchor="middle" font-family="${F}" font-size="10" fill="#475569">switch.tablette_screen OFF</text>
  <text x="722" y="138" text-anchor="middle" font-family="${F}" font-size="9.5" fill="#334155" font-weight="700">Économie d'écran</text>

  <line x1="196" y1="110" x2="230" y2="110" stroke="#0f766e" stroke-width="2.5" marker-end="url(#wt-w3)"/>
  <line x1="404" y1="110" x2="438" y2="110" stroke="#0f766e" stroke-width="2.5" marker-end="url(#wt-w3)"/>
  <line x1="612" y1="110" x2="646" y2="110" stroke="#0f766e" stroke-width="2.5" marker-end="url(#wt-w3)"/>

  <!-- Bandeau anti-faux positifs -->
  <rect x="24" y="192" width="772" height="68" rx="8" fill="#ecfdf5" stroke="#99f6e4" stroke-width="1.5"/>
  <text x="410" y="216" text-anchor="middle" font-family="${F}" font-size="11" font-weight="700" fill="#0f766e">Protection contre les réveils intempestifs (mode restart)</text>
  <text x="410" y="236" text-anchor="middle" font-family="${F}" font-size="10" fill="#1e293b">Tant qu'une présence reste détectée, le compte à rebours de 60 s est réinitialisé. La nuit, l'allumage peut être limité à 10 % de luminosité ou désactivé.</text>
</svg>`,
	},
	{
		id: 'svg-camera-vs-external',
		title: '4. Comparatif visuel : Détection par caméra intégrée vs Capteur externe (PIR / mmWave)',
		legend:
			'La caméra frontale de la tablette (à gauche) ne voit que de face et échoue dans le noir, tandis qu’un capteur PIR ou mmWave déporté (à droite) détecte votre arrivée latérale dans le couloir sans faire chauffer la tablette.',
		svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 300" role="img" aria-label="Comparaison entre détection par caméra frontale de tablette et capteur externe PIR ou mmWave">
  <rect x="0" y="0" width="820" height="300" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="410" y="26" text-anchor="middle" font-family="${F}" font-size="14" font-weight="700" fill="#0f172a">Détection intégrée (Caméra tablette) vs Capteur externe (PIR Zigbee / Radar mmWave)</text>

  <!-- Colonne Gauche : Caméra intégrée -->
  <rect x="24" y="48" width="372" height="226" rx="10" fill="#ffffff" stroke="#d97706" stroke-width="2"/>
  <rect x="24" y="48" width="372" height="30" rx="8" fill="#d97706"/>
  <text x="210" y="68" text-anchor="middle" font-family="${F}" font-size="12" font-weight="700" fill="#ffffff">Option A — Caméra frontale (Fully Kiosk)</text>

  <rect x="44" y="96" width="110" height="70" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
  <text x="99" y="124" text-anchor="middle" font-family="${F}" font-size="10.5" font-weight="700" fill="#92400e">Tablette Android</text>
  <text x="99" y="142" text-anchor="middle" font-family="${F}" font-size="9.5" fill="#78350f">Caméra active 24/7</text>

  <polygon points="154,131 366,92 366,170" fill="#fde68a" fill-opacity="0.45" stroke="#d97706" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="278" y="126" text-anchor="middle" font-family="${F}" font-size="10.5" font-weight="700" fill="#92400e">Cône étroit (face à l'écran)</text>
  <text x="278" y="144" text-anchor="middle" font-family="${F}" font-size="9.5" fill="#78350f">Aveugle dans l'obscurité</text>

  <text x="44" y="196" font-family="${F}" font-size="10.5" font-weight="700" fill="#0f766e">+ 0 € de matériel supplémentaire</text>
  <text x="44" y="216" font-family="${F}" font-size="10.5" fill="#b45309">− Consomme 1,5 à 3 W de plus (tiédeur au dos)</text>
  <text x="44" y="236" font-family="${F}" font-size="10.5" fill="#b45309">− Ne s'allume qu'une fois arrêté face à la tablette</text>
  <text x="44" y="256" font-family="${F}" font-size="10.5" fill="#b45309">− Indisponible sur iPad (restriction iPadOS)</text>

  <!-- Colonne Droite : Capteur externe -->
  <rect x="424" y="48" width="372" height="226" rx="10" fill="#ffffff" stroke="#0f766e" stroke-width="2"/>
  <rect x="424" y="48" width="372" height="30" rx="8" fill="#0f766e"/>
  <text x="610" y="68" text-anchor="middle" font-family="${F}" font-size="12" font-weight="700" fill="#ffffff">Option B — Capteur externe PIR ou mmWave</text>

  <rect x="444" y="96" width="110" height="70" rx="6" fill="#ecfdf5" stroke="#0f766e" stroke-width="1.5"/>
  <text x="499" y="124" text-anchor="middle" font-family="${F}" font-size="10.5" font-weight="700" fill="#0f766e">PIR / mmWave</text>
  <text x="499" y="142" text-anchor="middle" font-family="${F}" font-size="9.5" fill="#115e59">Couloir ou cadre</text>

  <polygon points="554,131 772,82 772,180" fill="#99f6e4" fill-opacity="0.45" stroke="#0f766e" stroke-width="1.5"/>
  <text x="680" y="124" text-anchor="middle" font-family="${F}" font-size="10.5" font-weight="700" fill="#0f766e">Anticipation dans le couloir</text>
  <text x="680" y="142" text-anchor="middle" font-family="${F}" font-size="9.5" fill="#115e59">Fonctionne à 0 lux (nuit)</text>

  <text x="444" y="196" font-family="${F}" font-size="10.5" font-weight="700" fill="#0f766e">+ Zéro charge CPU sur la tablette (reste froide)</text>
  <text x="444" y="216" font-family="${F}" font-size="10.5" font-weight="700" fill="#0f766e">+ Écran déjà allumé quand vous arrivez devant</text>
  <text x="444" y="236" font-family="${F}" font-size="10.5" font-weight="700" fill="#0f766e">+ Le radar mmWave maintient l'écran si vous lisez immobile</text>
  <text x="444" y="256" font-family="${F}" font-size="10.5" fill="#475569">− Coût de 15 à 25 € (PIR Zigbee) ou ~65 € (mmWave FP2)</text>
</svg>`,
	},
];

export const WALL_TABLET_TUTORIAL_STEPS = [
	{
		stepNum: 1,
		title: 'Vérifier le serveur Home Assistant et fixer son adresse IP locale',
		duration: '10 min',
		level: 'Débutant',
		objective:
			'S’assurer que votre serveur Home Assistant est joignable en permanence sur une adresse IP locale fixe afin que la tablette ne perde jamais la connexion après un redémarrage de la box Internet.',
		prerequisites: [
			'Un serveur Home Assistant opérationnel (Home Assistant Green, Raspberry Pi 4/5 ou mini-PC).',
			'Accès à l’interface d’administration de votre box Internet ou routeur Wi-Fi.',
		],
		actions: [
			'Dans Home Assistant, ouvrez Paramètres → Système → Réseau et relevez l’adresse IPv4 locale (ex. 192.168.1.40) et l’adresse MAC Ethernet.',
			'Sur votre box Internet ou routeur, créez une réservation DHCP (bail statique) pour le serveur Home Assistant et pour la tablette (ex. 192.168.1.50).',
			'Depuis le navigateur de la tablette, ouvrez http://192.168.1.40:8123 (préférez l’IP directe à homeassistant.local car mDNS échoue parfois après une mise en veille Android).',
		],
		illustrationNote:
			'Repère visuel : Paramètres → Système → Réseau → IPv4 → sélectionnez « Statique » ou vérifiez le bail DHCP réservé sur le routeur.',
		expectedResult:
			'La page de connexion Home Assistant s’affiche en moins d’une seconde depuis le navigateur de la tablette en utilisant l’adresse IP locale.',
		validationTest:
			'Désactivez puis réactivez le Wi-Fi de la tablette : elle récupère immédiatement la même IP (192.168.1.50) et charge http://192.168.1.40:8123.',
		commonIssues:
			'Si la page ne répond pas : vérifiez que la tablette n’est pas connectée sur un réseau « Wi-Fi Invité » isolé du réseau LAN principal.',
	},
	{
		stepNum: 2,
		title: 'Créer un compte utilisateur local dédié à la tablette',
		duration: '10 min',
		level: 'Débutant',
		objective:
			'Isoler la session de la tablette murale avec un profil local (« Tablette Entrée ») sans droits administrateur si un invité ou un enfant touche l’écran.',
		prerequisites: ['Être connecté à Home Assistant avec votre compte Propriétaire / Administrateur.'],
		actions: [
			'Allez dans Paramètres → Personnes → onglet Utilisateurs → bouton « Ajouter un utilisateur ».',
			'Nommez-le « Tablette Murale », cochez « Autoriser uniquement la connexion depuis le réseau local » et laissez décochée l’option « Administrateur ».',
			'Connectez-vous avec ce compte sur la tablette, ouvrez le profil en bas à gauche de la barre latérale et activez « Toujours masquer la barre latérale ».',
		],
		illustrationNote:
			'Repère visuel : Paramètres → Personnes → Utilisateurs → coche « Accès local uniquement » activée, « Administrateur » désactivé.',
		expectedResult:
			'La session tablette n’affiche plus le menu « Paramètres » ni « Outils de développement » et reste cantonnée au réseau domestique.',
		validationTest:
			'Vérifiez que les menus d’administration sont absents de la barre latérale sur la tablette.',
		commonIssues:
			'La barre latérale réapparaît après redémarrage : activez le masquage dans le profil utilisateur local ou via le mode plein écran de Fully Kiosk.',
	},
	{
		stepNum: 3,
		title: 'Construire un dashboard Lovelace pensé pour le mur (sans défilement)',
		duration: '25 min',
		level: 'Débutant à Intermédiaire',
		objective:
			'Créer un tableau de bord dédié aux dimensions de votre écran (10 ou 11 pouces en paysage) avec de gros boutons tactiles et l’essentiel sur un seul écran.',
		prerequisites: ['Au moins 3 ou 4 entités configurées dans Home Assistant (lumières, météo, température, volets).'],
		actions: [
			'Depuis votre ordinateur, ouvrez Paramètres → Tableaux de bord → « Ajouter un tableau de bord » → choisissez « Nouveau tableau de bord à partir de zéro ».',
			'Donnez-lui le titre « Tablette » (URL : dashboard-tablette), puis ouvrez-le en mode édition.',
			'Passez la vue en type « Sections » (2 ou 3 colonnes max) et collez l’un des 3 modèles YAML reproductibles fournis plus haut sur cette page.',
			'Dans les paramètres des cartes Tuiles (Tile), activez le retour d’état clair et ajoutez une confirmation sur les commandes sensibles (alarme, portail).',
		],
		illustrationNote:
			'Repère visuel : Vue en mode « Sections » (2 ou 3 colonnes) — toutes les cartes tiennent dans la hauteur de la dalle sans barre de défilement.',
		expectedResult:
			'L’URL locale http://192.168.1.40:8123/dashboard-tablette/accueil affiche toutes vos commandes essentielles d’un seul coup d’œil.',
		validationTest:
			'À 1,5 mètre de la tablette, vous lisez la température et l’état des ouvrants sans plisser les yeux, et chaque bouton répond au premier appui.',
		commonIssues:
			'Cartes coupées en bas d’écran : réduisez le nombre de lignes à 3 par colonne ou utilisez des sous-vues (navigation par boutons vers une vue Caméras ou Énergie).',
	},
	{
		stepNum: 4,
		title: 'Préparer la tablette Android ou iPad (veille, batterie, WebView)',
		duration: '15 min',
		level: 'Débutant',
		objective:
			'Désactiver les mises en veille agressives du constructeur et activer la protection de batterie pour un fonctionnement 24h/24 sans blocage.',
		prerequisites: ['Tablette connectée au Wi-Fi domestique (5 GHz recommandé si le routeur est proche).'],
		actions: [
			'Sur Android : mettez à jour « Android System WebView » via le Play Store — c’est le moteur d’affichage des cartes Lovelace modernes.',
			'Sur Samsung Galaxy Tab : ouvrez Paramètres → Batterie → « Protection de la batterie » → activez « Maximale (80 %) ». Sur Lenovo Tab : Paramètres → Batterie → « Mode de protection de la batterie ».',
			'Dans Paramètres → Applications → Fully Kiosk Browser (et Home Assistant Companion) → Batterie : sélectionnez « Non restreinte ».',
			'Désactivez le verrouillage par code de l’écran d’accueil Android (« Aucun » ou « Balayage ») afin que Fully Kiosk puisse réveiller l’écran directement sur le dashboard.',
		],
		illustrationNote:
			'Repère visuel : Paramètres Android → Batterie → Protection de la batterie (80 %) ON + Optimisation batterie Fully Kiosk : Non restreinte.',
		expectedResult:
			'La tablette s’allume directement sur le dashboard et plafonne sa charge à 80 % (ou via la prise connectée).',
		validationTest:
			'Éteignez l’écran avec le bouton physique puis rallumez-le : la tablette affiche immédiatement le tableau de bord.',
		commonIssues:
			'Sur Amazon Fire HD : Fire OS réactive parfois l’écran d’accueil publicitaire ; une tablette Android standard (Samsung/Lenovo) évite cette limitation.',
	},
	{
		stepNum: 5,
		title: 'Installer et configurer Fully Kiosk Browser + l’intégration Home Assistant',
		duration: '20 min',
		level: 'Intermédiaire',
		objective:
			'Afficher le dashboard en plein écran intégral et permettre à Home Assistant de piloter l’écran, la luminosité et de lire le niveau de batterie.',
		prerequisites: ['Tablette Android (ou Home Assistant Companion en mode Accès guidé sur iPad).'],
		actions: [
			'Installez Fully Kiosk Browser sur la tablette Android.',
			'Dans Web Content Settings → Start URL : saisissez http://192.168.1.40:8123/dashboard-tablette/accueil.',
			'Dans Web Auto Reload : activez « Auto Reload on Idle » (3600 s) et « Reload on Network Reconnect ».',
			'Dans Remote Administration (licence Fully Kiosk PLUS ~7,90 €) : activez « Enable Remote Admin » et définissez un code d’administration local.',
			'Dans Home Assistant : Paramètres → Appareils et services → Ajouter une intégration → « Fully Kiosk Browser », puis renseignez l’IP 192.168.1.50.',
		],
		illustrationNote:
			'Repère visuel : Dans HA, l’appareil Fully Kiosk expose switch.<tablette>_screen, number.<tablette>_screen_brightness et sensor.<tablette>_battery.',
		expectedResult:
			'Vous pouvez allumer/éteindre l’écran de la tablette et régler sa luminosité directement depuis Home Assistant.',
		validationTest:
			'Basculez switch.<tablette>_screen sur OFF dans Home Assistant : la dalle de la tablette s’éteint aussitôt.',
		commonIssues:
			'Connexion refusée : vérifiez que l’option Remote Admin From Local Network est activée dans Fully Kiosk et que la tablette est sur le même sous-réseau.',
	},
	{
		stepNum: 6,
		title: 'Fixer la tablette au mur et passer le câble USB en sécurité',
		duration: '25 min',
		level: 'Débutant à Intermédiaire',
		objective:
			'Installer le support mural à hauteur des yeux (145 à 155 cm du sol) avec une alimentation basse tension propre et ventilée.',
		prerequisites: [
			'Support mural (apparent, magnétique ou cadre 3D), niveau à bulle, chevilles adaptées au mur.',
			'Câble USB-C coudé à 90° + chargeur USB 5 V certifié CE (+ prise connectée si nécessaire).',
		],
		actions: [
			'Présentez la tablette à blanc sur le mur : la hauteur idéale se situe entre 145 et 155 cm du sol.',
			'Vérifiez la qualité du signal Wi-Fi à cet endroit précis (au moins -65 dBm) avant de percer.',
			'Fixez le support mural au niveau à bulle en conservant 2 à 3 mm d’espace à l’arrière pour la dissipation thermique.',
			'Branchez le connecteur USB-C coudé à 90° sans forcer sur le port, acheminez le câble plat dans une goulotte fine et raccordez le chargeur 5 V.',
		],
		illustrationNote:
			'Règle de sécurité : n’enfermez jamais un chargeur 230 V dans une cloison non ventilée ; acheminez uniquement le 5 V USB ou faites poser une prise conforme par un électricien.',
		expectedResult:
			'La tablette est horizontale, stable sous le doigt lorsqu’on appuie sur les coins, et le câble USB ne subit aucune pliure.',
		validationTest:
			'Après 1 heure d’affichage continu, touchez le dos de la tablette : elle doit rester tempérée (moins de 35 °C).',
		commonIssues:
			'Tiédeur excessive en été : baissez la luminosité maximale à 180/255 et réduisez le délai d’extinction d’écran à 45 secondes.',
	},
	{
		stepNum: 7,
		title: 'Configurer l’allumage automatique sur approche (Caméra, PIR ou mmWave)',
		duration: '20 min',
		level: 'Intermédiaire',
		objective:
			'Maintenir l’écran éteint quand la pièce est vide et l’allumer en moins d’une seconde dès qu’une personne s’approche.',
		prerequisites: ['Intégration Fully Kiosk active dans Home Assistant (ou capteur PIR / mmWave appairé).'],
		actions: [
			'Option Caméra interne (Android) : dans Fully Kiosk → Motion Detection → activez « Enable Visual Motion Detection », Sensitivity 75 et « Turn Screen On on Motion », puis « Screen Off Timer » sur 45 secondes.',
			'Option Capteur externe (recommandée) : placez votre capteur PIR Zigbee (SONOFF SNZB-03P) ou radar mmWave (Aqara FP2) pour couvrir la zone à 1,5 mètre devant la tablette.',
			'Dans Home Assistant : Paramètres → Automatisations et scènes → Créer une automatisation → Modifier en YAML, puis collez le Scénario 2 de ce guide.',
			'Si votre tablette n’a pas de limite de charge native à 80 %, activez l’automatisation de protection batterie (25 % – 80 %) sur la prise connectée.',
		],
		illustrationNote:
			'Astuce placement PIR : orientez le capteur PIR pour qu’il ne détecte que le passage à proximité de la tablette.',
		expectedResult:
			'L’écran s’allume dès que vous marchez vers la tablette, adapte sa luminosité jour/nuit, et s’éteint 60 secondes après votre départ.',
		validationTest:
			'Éloignez-vous pendant 90 secondes jusqu’à l’extinction complète, puis revenez dans l’axe : le dashboard apparaît sans toucher la vitre.',
		commonIssues:
			'L’écran se rallume seul la nuit : désactivez « Turn Screen On on Darkness Change » dans Fully Kiosk.',
	},
	{
		stepNum: 8,
		title: 'Tester la reprise automatique après redémarrage ou coupure Wi-Fi',
		duration: '10 min',
		level: 'Intermédiaire',
		objective:
			'Valider que la tablette murale retrouve son dashboard automatiquement après une mise à jour de Home Assistant ou une coupure réseau.',
		prerequisites: ['Étapes 1 à 7 terminées.'],
		actions: [
			'Dans Fully Kiosk → Kiosk Mode : activez « Enable Kiosk Mode » et « Launch on Boot ».',
			'Dans Web Auto Reload : activez « Auto Reload on Network Reconnect » et « Auto Reload on Page Error » (délai 15 s).',
			'Redémarrez Home Assistant et vérifiez que la tablette recharge automatiquement les tuiles dès que le serveur est de nouveau disponible.',
			'Redémarrez la tablette : elle doit lancer automatiquement Fully Kiosk Browser et ouvrir le dashboard.',
		],
		illustrationNote:
			'Contrôle final : vérifiez que vous connaissez le geste de sortie du mode Kiosk pour accéder aux réglages Android en cas de besoin.',
		expectedResult:
			'Votre tablette murale fonctionne comme un afficheur domotique autonome et stable.',
		validationTest:
			'Coupez puis rallumez le Wi-Fi : le dashboard se resynchronise tout seul en quelques secondes.',
		commonIssues:
			'Page d’erreur après coupure électrique : la box Internet et Home Assistant mettent ~60 s à redémarrer ; le réglage « Auto Reload on Page Error (15 s) » recharge la page dès que le serveur répond.',
	},
];

export const WALL_TABLET_AFFILIATE_CATEGORIES = [
	{
		id: 'cat-tablettes',
		title: '1. Tablettes recommandées pour un dashboard mural',
		ctaText: 'Voir le prix de la tablette',
		items: [
			{
				name: 'Samsung Galaxy Tab A9+ (11", Wi-Fi, 64 ou 128 Go)',
				why: 'Écran 11 pouces confortable, Android standard compatible Fully Kiosk Browser et fonction native « Protection de la batterie (80 %) » qui évite l’achat d’une prise connectée.',
				config: 'Idéale en configuration Recommandée ou Familiale (entrée, salon, couloir).',
				ctaLabel: 'Voir le prix de la tablette sur Amazon →',
				url: amzSearch('Samsung Galaxy Tab A9+ 11 pouces Wi-Fi'),
			},
			{
				name: 'Lenovo Tab M11 (11", IPS) / Lenovo Tab M10 Plus (3e gén.)',
				why: 'Dalle IPS aux angles de vision très larges (lisible même de biais dans un couloir) et mode de protection batterie intégré dans les paramètres Lenovo.',
				config: 'Excellente alternative Android 10–11 pouces pour Fully Kiosk Browser.',
				ctaLabel: 'Voir le prix de la tablette sur Amazon →',
				url: amzSearch('Lenovo Tab M11 11 pouces'),
			},
			{
				name: 'Écran tactile HDMI/USB 10,1" à 15,6" (pour Raspberry Pi / Mini-PC)',
				why: 'Aucune batterie lithium intégrée : conçu pour rester sous tension 24h/24 pendant des années sans risque de gonflement.',
				config: 'Configuration Écran dédié (supervision avancée avec Raspberry Pi 4/5 ou mini-PC).',
				ctaLabel: 'Voir les écrans tactiles HDMI sur Amazon →',
				url: amzSearch('ecran tactile 10.1 pouces HDMI USB Raspberry Pi VESA'),
			},
		],
	},
	{
		id: 'cat-supports',
		title: '2. Supports muraux & matériaux pour impression 3D',
		ctaText: 'Choisir un support mural',
		items: [
			{
				name: 'Support mural tablette universel profil bas (pinces ou VESA)',
				why: 'Permet de fixer une tablette de 8 à 11 pouces à plat contre le mur tout en laissant 2 à 3 mm de circulation d’air au dos.',
				config: 'Adapté aux tablettes recyclées ou neuves sans besoin d’imprimante 3D.',
				ctaLabel: 'Choisir un support mural sur Amazon →',
				url: amzSearch('support mural tablette 10 11 pouces plat'),
			},
			{
				name: 'Support mural magnétique (plaques métal + aimants néodyme)',
				why: 'Permet de décrocher la tablette du mur en une seconde pour consulter un graphique dans le canapé.',
				config: 'Fixation magnétique polyvalente (entrée ou pièce de vie).',
				ctaLabel: 'Choisir un support magnétique sur Amazon →',
				url: amzSearch('support mural magnetique tablette'),
			},
			{
				name: 'Bobine de filament PETG 1,75 mm (noir ou blanc mat)',
				why: 'Pour imprimer votre propre cadre mural sur mesure (modèles gratuits Printables/MakerWorld). Le PETG résiste mieux à la chaleur et aux UV que le PLA.',
				config: 'Fixation imprimée en 3D sur mesure.',
				ctaLabel: 'Voir le filament PETG sur Amazon →',
				url: amzSearch('filament PETG 1.75mm 1kg blanc mat noir'),
			},
		],
	},
	{
		id: 'cat-alimentation',
		title: '3. Chargeurs USB, câbles coudés 90° & gestion de batterie',
		ctaText: 'Voir le matériel complet',
		items: [
			{
				name: 'Câble USB-C coudé à 90° (profil plat, 2 m ou 3 m)',
				why: 'Indispensable pour que le connecteur ne dépasse pas sur la tranche de la tablette et puisse rentrer dans un cadre mural ou une goulotte fine.',
				config: 'Toutes les configurations avec tablette USB-C.',
				ctaLabel: 'Voir les câbles USB-C coudés 90° →',
				url: amzSearch('cable USB C coude 90 degres plat 2m'),
			},
			{
				name: 'Chargeur secteur USB 5 V (12 à 20 W certifié CE, Anker / Ugreen)',
				why: 'Une charge douce (10–18 W) maintient la tablette froide et alimente l’écran en continu sans stress thermique.',
				config: 'Toutes les configurations sur prise secteur existante.',
				ctaLabel: 'Voir les chargeurs USB compacts →',
				url: amzSearch('chargeur USB C 20W compact Anker Ugreen'),
			},
			{
				name: 'Prise connectée Tapo P110 (lot) ou prise Zigbee avec mesure',
				why: 'Coupe automatiquement la charge à 80 % et la relance à 25 % via Home Assistant lorsque la tablette ne possède pas de limiteur natif (ancienne Android, Fire HD, iPad).',
				config: 'Indispensable pour une tablette recyclée, Fire HD ou iPad.',
				ctaLabel: 'Voir la prise connectée sur Amazon →',
				url: amzDp('B0CJC8WMXV'),
			},
		],
	},
	{
		id: 'cat-capteurs',
		title: '4. Capteurs de mouvement PIR & radars de présence mmWave',
		ctaText: 'Comparer les capteurs de présence',
		items: [
			{
				name: 'Capteur de mouvement PIR Zigbee SONOFF SNZB-03P (ou Aqara P1)',
				why: 'Fonctionne sur pile pendant 2 à 3 ans, détecte votre approche même dans le noir complet et soulage le processeur de la tablette.',
				config: 'Allumage automatique PIR (couloir, entrée, escalier).',
				ctaLabel: 'Comparer les capteurs PIR sur Amazon →',
				url: amzSearch('SONOFF SNZB-03P capteur mouvement Zigbee'),
			},
			{
				name: 'Radar de présence mmWave Aqara Presence Sensor FP2',
				why: 'Détecte la présence humaine immobile au centimètre près (jusqu’à 30 sous-zones dans Home Assistant via HomeKit Controller local) et intègre un capteur de luminosité.',
				config: 'Allumage automatique mmWave haut de gamme (salon, cuisine ouverte).',
				ctaLabel: 'Comparer le radar mmWave Aqara FP2 →',
				url: amzSearch('Aqara Presence Sensor FP2 mmWave'),
			},
		],
	},
	{
		id: 'cat-serveur-reseau',
		title: '5. Serveur Home Assistant (uniquement si vous n’en avez pas encore) & Réseau',
		ctaText: 'Voir le matériel complet',
		items: [
			{
				name: 'Home Assistant Green (box officielle prête à l’emploi)',
				why: 'Serveur officiel basse consommation (~3 W) avec Home Assistant OS préinstallé. Ne l’achetez que si vous n’avez pas encore de serveur domotique chez vous.',
				config: 'Débutants qui démarrent de zéro sans serveur existant.',
				ctaLabel: 'Voir Home Assistant Green sur Amazon →',
				url: amzDp('B0CXVKSG19'),
			},
			{
				name: 'Raspberry Pi 5 (4 Go ou 8 Go) + Alimentation officielle 27 W',
				why: 'Alternative évolutive et puissante si vous souhaitez faire tourner Home Assistant OS ainsi que des modules gourmands (flux caméras, reconnaissance vocale locale).',
				config: 'Utilisateurs souhaitant assembler leur propre serveur HA.',
				ctaLabel: 'Voir le Raspberry Pi 5 sur Amazon →',
				url: amzDp('B0CK3L9WD3'),
			},
		],
	},
];

export const WALL_TABLET_CONFIGURATOR_OPTIONS = {
	materiel: [
		{ id: 'recyclee', label: 'Tablette Android déjà possédée (recyclée)', costEur: 0, needsSmartPlug: true, isIos: false },
		{ id: 'android-neuve', label: 'Tablette Android neuve 11" (Galaxy Tab A9+ / Lenovo M11)', costEur: 189, needsSmartPlug: false, isIos: false },
		{ id: 'ipad', label: 'Apple iPad (déjà possédé ou reconditionné)', costEur: 0, needsSmartPlug: true, isIos: true },
		{ id: 'ecran-dedie', label: 'Écran tactile HDMI 10–15" + Raspberry Pi client', costEur: 165, needsSmartPlug: false, isIos: false, isDedicated: true },
	],
	fixation: [
		{ id: 'apparente', label: 'Support mural apparent (pinces / VESA)', costEur: 19, timeMin: 20, diffDelta: 0 },
		{ id: 'magnetique', label: 'Fixation magnétique (décrochable)', costEur: 22, timeMin: 20, diffDelta: 0 },
		{ id: 'imprime-3d', label: 'Cadre imprimé en 3D (bobine PETG)', costEur: 21, timeMin: 35, diffDelta: 1 },
		{ id: 'encastree', label: 'Cadre mural + intégration encastrée (par un pro)', costEur: 65, timeMin: 90, diffDelta: 2, isPro: true },
	],
	alimentation: [
		{ id: 'chargeur-existant', label: 'Chargeur existant + câble USB-C coudé 90°', costEur: 9, isPro: false },
		{ id: 'cable-dissimule', label: 'Chargeur 20 W + câble plat 2 m coudé 90° + goulotte', costEur: 24, isPro: false },
		{ id: 'installation-pro', label: 'Alimentation encastrée 5 V en cloison (électricien)', costEur: 85, isPro: true },
	],
	serveurHa: [
		{ id: 'deja-dispo', label: 'Serveur Home Assistant déjà en place (0 €)', costEur: 0 },
		{ id: 'ha-green', label: 'Ajouter une box Home Assistant Green', costEur: 115 },
		{ id: 'rpi5', label: 'Ajouter un kit Raspberry Pi 5 (4 Go + alim 27 W)', costEur: 87 },
	],
	allumage: [
		{ id: 'manuel', label: 'Manuel au toucher (ou horaires fixes)', costEur: 0 },
		{ id: 'camera-integree', label: 'Caméra frontale de la tablette (Fully Kiosk PLUS)', costEur: 8, requiresAndroid: true },
		{ id: 'pir', label: 'Capteur de mouvement PIR externe (SONOFF / Aqara)', costEur: 19, requiresZigbeeNote: true },
		{ id: 'mmwave', label: 'Radar de présence mmWave (Aqara FP2 Wi-Fi local)', costEur: 69 },
	],
	budget: [
		{ id: 'economique', label: 'Économique (recyclage & essentiel)' },
		{ id: 'recommande', label: 'Recommandé (confort 11" & PIR)' },
		{ id: 'premium', label: 'Premium (cadre affleurant & radar mmWave)' },
	],
};

export const WALL_TABLET_FAQ = [
	{
		question: 'Une tablette murale peut-elle remplacer le serveur Home Assistant ?',
		shortAnswer:
			'Non : la tablette sert uniquement d’écran d’affichage et de télécommande tactile, tandis que le serveur Home Assistant doit tourner 24h/24 sur un boîtier dédié.',
		detail:
			'Home Assistant (OS, Core ou Container) nécessite un serveur toujours allumé en arrière-plan (Home Assistant Green, Raspberry Pi 4/5, mini-PC ou NAS) pour dialoguer avec vos capteurs, enregistrer l’historique et exécuter les automatisations. La tablette murale se connecte simplement à l’adresse IP locale de ce serveur (port 8123) via le Wi-Fi.',
	},
	{
		question: 'Quelle est la meilleure tablette pour un dashboard Home Assistant en 2026 ?',
		shortAnswer:
			'Les Samsung Galaxy Tab A9+ (11") et Lenovo Tab M11 offrent le meilleur rapport qualité/prix grâce à leur grand écran, leur Android standard compatible Fully Kiosk et leur limiteur de charge à 80 % intégré.',
		detail:
			'Contrairement aux tablettes Amazon Fire HD (bridées par Fire OS et les écrans sponsorisés) ou aux iPad (où iPadOS bloque l’accès à la caméra en arrière-plan et ne supporte pas Fully Kiosk Browser), une tablette Android standard permet de verrouiller le mode kiosk, de réveiller l’écran par API locale et de préserver la batterie sans accessoire supplémentaire.',
	},
	{
		question: 'Comment éviter que la batterie de la tablette murale ne gonfle avec le temps ?',
		shortAnswer:
			'Activez la limite de charge à 80 % dans les paramètres Android (Samsung/Lenovo) ou pilotez le chargeur avec une prise connectée entre 25 % et 80 % via Home Assistant.',
		detail:
			'C’est le maintien permanent à 100 % sous tension et la chaleur qui dégradent les cellules lithium-polymère. En plafonnant la charge à 80 %, en utilisant un chargeur doux (10–18 W) et en laissant 2 à 3 mm d’air derrière la tablette, vous éliminez le risque de gonflement sur le long terme.',
	},
	{
		question: 'Comment allumer l’écran de la tablette automatiquement quand on s’approche ?',
		shortAnswer:
			'Soit via la détection de mouvement de la caméra frontale dans Fully Kiosk Browser (en journée), soit via un capteur PIR Zigbee ou radar mmWave qui commande l’entité switch.<tablette>_screen dans Home Assistant.',
		detail:
			'La caméra frontale ne nécessite aucun capteur externe mais ne fonctionne pas dans le noir complet et tiédit légèrement la tablette. Un capteur PIR externe (SONOFF SNZB-03P) ou un radar mmWave (Aqara FP2) fonctionne à 0 lux, consomme zéro CPU sur la tablette et allume l’écran dès votre entrée dans le couloir.',
	},
	{
		question: 'Peut-on recycler une vieille tablette Android ou un ancien iPad ?',
		shortAnswer:
			'Oui à partir d’Android 9+ (en mettant à jour Android System WebView) ou d’iPadOS 15+, en ajoutant impérativement une prise connectée pour gérer les cycles de batterie 25–80 %.',
		detail:
			'Sur une tablette Android antérieure à Android 8, le composant WebView est trop ancien pour afficher les cartes Lovelace récentes (Sections, Tile). Sur un ancien iPad, utilisez l’application Home Assistant Companion verrouillée avec la fonction native « Accès guidé » d’iPadOS.',
	},
	{
		question: 'Faut-il obligatoirement acheter la licence Fully Kiosk Browser PLUS ?',
		shortAnswer:
			'La version gratuite suffit pour l’affichage plein écran, mais la licence PLUS (~7,90 € paiement unique par appareil, sans abonnement) est requise pour l’intégration Home Assistant (Remote Admin) et le réveil par caméra.',
		detail:
			'Si vous préférez une solution 100 % gratuite et open source, l’application officielle Home Assistant Companion pour Android permet aussi de garder l’écran allumé et de recevoir des commandes d’allumage d’écran par notification locale, bien que Fully Kiosk offre un contrôle beaucoup plus fin du mode kiosk et du rechargement automatique.',
	},
	{
		question: 'Faut-il une clé Zigbee ou un module relais Shelly pour installer une tablette murale ?',
		shortAnswer:
			'Non : la tablette communique directement en Wi-Fi avec votre serveur Home Assistant. Aucun relais électrique ni clé Zigbee n’est requis pour l’affichage.',
		detail:
			'Vous n’aurez besoin d’un coordinateur Zigbee que si vous choisissez un capteur de mouvement Zigbee (comme le SONOFF SNZB-03P) et que votre serveur n’en possède pas encore. Si vous utilisez la caméra frontale ou un radar Wi-Fi (Aqara FP2) et la limite de batterie 80 % native Samsung/Lenovo, aucun périphérique Zigbee ni relais n’est nécessaire.',
	},
];

export const WALL_TABLET_TROUBLESHOOTING = [
	{
		symptom: 'L’écran affiche « Web page not available » après une coupure de courant',
		causes: 'La tablette et le Wi-Fi redémarrent en 30 secondes alors que le serveur Home Assistant met 60 à 90 secondes à être prêt.',
		checks: 'Vérifier les paramètres Web Auto Reload dans Fully Kiosk Browser.',
		solution: 'Activez « Auto Reload on Page Error » avec un délai de 15 secondes et « Auto Reload on Network Reconnect » dans Fully Kiosk.',
	},
	{
		symptom: 'L’écran ne se réveille plus à l’approche dans la soirée ou la nuit',
		causes: 'La caméra frontale de la tablette ne distingue plus les mouvements sous un faible éclairement.',
		checks: 'Tester la détection en allumant le plafonnier du couloir.',
		solution: 'Ajoutez un capteur PIR externe (SONOFF SNZB-03P) ou un radar mmWave (Aqara FP2) qui détecte dans l’obscurité totale via le Scénario 2.',
	},
	{
		symptom: 'Certaines cartes Lovelace restent vides ou affichent une erreur rouge sur une vieille tablette',
		causes: 'Version d’Android System WebView trop ancienne sur la tablette recyclée.',
		checks: 'Ouvrir Play Store → chercher « Android System WebView » et vérifier la version installée.',
		solution: 'Mettez à jour Android System WebView et Chrome sur la tablette ; privilégiez le dashboard Débutant (cartes natives légères) sans cartes HACS lourdes.',
	},
	{
		symptom: 'La tablette chauffe au dos et consomme beaucoup d’énergie',
		causes: 'Luminosité poussée à 100 % en continu + détection vidéo caméra frontale active 24h/24.',
		checks: 'Vérifier la température batterie dans Home Assistant ou Fully Kiosk.',
		solution: 'Baissez la luminosité de jour à 180/255, passez l’extinction d’écran (Screen Off Timer) à 45 secondes et préférez un capteur PIR externe.',
	},
	{
		symptom: 'Home Assistant perd la connexion avec Fully Kiosk au bout de quelques heures',
		causes: 'L’adresse IP de la tablette a changé (bail DHCP expiré) ou Android a mis Fully Kiosk en veille profonde.',
		checks: 'Vérifier l’IP dans Fully Kiosk (Remote Admin) et l’état d’optimisation batterie Android.',
		solution: 'Fixez l’IP de la tablette sur votre routeur (bail DHCP statique) et réglez la batterie de l’application Fully Kiosk sur « Non restreinte ».',
	},
];

export const WALL_TABLET_INTERNAL_LINKS = [
	{
		href: '/domotique/home-assistant-green-vs-raspberry-pi-5/',
		title: 'Home Assistant Green vs Raspberry Pi 5 : quel serveur choisir ?',
		desc: 'Comparatif détaillé si vous n’avez pas encore de box domotique pour alimenter votre dashboard.',
	},
	{
		href: '/domotique/home-assistant-raspberry-pi-5-installation/',
		title: 'Installer Home Assistant OS sur Raspberry Pi 5 (guide pas à pas)',
		desc: 'Préparer le serveur local, fixer l’IP et sécuriser les sauvegardes avant de brancher la tablette.',
	},
	{
		href: '/domotique/projets/detecteur-presence-radar-mmwave-immobile/',
		title: 'Projet : Détecteur de présence radar mmWave (Aqara FP2 / LD2410)',
		desc: 'Approfondir le placement et le découpage en zones d’un radar mmWave pour réveiller la tablette.',
	},
	{
		href: '/domotique/meilleur-dongle-zigbee-home-assistant/',
		title: 'Quel dongle Zigbee choisir pour Home Assistant (ZBDongle-E, ZBT-2) ?',
		desc: 'Utile uniquement si vous ajoutez des capteurs PIR Zigbee sur pile dans vos couloirs.',
	},
	{
		href: '/domotique/prise-connectee-zigbee-home-assistant/',
		title: 'Prises connectées pour Home Assistant : comparatif et automatisations',
		desc: 'Pour piloter le chargeur USB de la tablette entre 25 % et 80 % de batterie.',
	},
	{
		href: '/domotique/configurateur-projet-domotique/',
		title: 'Configurateur de projets domotiques (catalogue complet)',
		desc: 'Explorer tous les autres projets compatibles avec votre nouveau dashboard mural (volets, chauffage, énergie).',
	},
];
