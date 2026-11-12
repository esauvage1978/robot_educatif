import { USE_CASES } from './smartHomeUseCases.mjs';
import { slugForUseCase } from './smartHomeProjectSlugs.mjs';
import { TUTORIAL_STEPS, PROJECT_INTRODUCTIONS } from './smartHomeProjectTutorials.mjs';
import { LOT42_PROJECT_CONTENT } from './lot42SmartHomeContent.mjs';

/** @param {string} useCaseId */
function defaultYamlNotes(useCaseId) {
	const slug = slugForUseCase(useCaseId);
	return [
		`entity_id : nom technique HA (ex. switch.${useCaseId.replace(/-/g, '_')}).`,
		`trigger: platform state avec entity_id — page /domotique/projets/${slug}/`,
		`condition: évite les boucles si capteur et action pilotent la même entité.`,
		`action: service homeassistant.turn_on/off, cover.* ou notify.* selon le cas.`,
	];
}

function step(title, objective, prerequisites, actions, expectedResult, errors) {
	return { title, objective, prerequisites, actions, expectedResult, errors };
}

function faq(question, answer) {
	return { question, answer };
}

function scen(title, description) {
	return { title, description };
}

function pre(label, detail) {
	return { label, detail };
}

function auto(title, goal, trigger, devices) {
	return { title, goal, trigger, devices };
}

function ts(symptom, causes, checks, solution) {
	return { symptom, causes, checks, solution };
}

/** @param {string} id @param {Record<string, unknown>} fields */
function defineProject(id, fields) {
	const tutorialSteps = TUTORIAL_STEPS[id] ?? fields.tutorialSteps;
	if (tutorialSteps.length !== 8) {
		throw new Error(`Projet ${id} : attendu 8 tutorialSteps, reçu ${tutorialSteps.length}`);
	}
	return {
		h1: fields.h1,
		introduction: PROJECT_INTRODUCTIONS[id] ?? fields.introduction ?? null,
		geoAnswer: fields.geoAnswer,
		expectedOutcomes: fields.expectedOutcomes,
		limits: fields.limits,
		scenarios: fields.scenarios,
		prerequisites: fields.prerequisites,
		incompatibilities: fields.incompatibilities,
		prePurchaseChecks: fields.prePurchaseChecks,
		troubleshooting: fields.troubleshooting,
		faq: fields.faq,
		automations: fields.automations,
		tutorialSteps,
		haIntegrations: fields.haIntegrations,
		yamlNotes: fields.yamlNotes ?? defaultYamlNotes(id),
		requires230v: fields.requires230v,
		safetyNote: fields.safetyNote,
		schemaHeading: fields.schemaHeading,
		schemaLead: fields.schemaLead,
		bornierHeaders: fields.bornierHeaders,
		bridgeAfterConfig: fields.bridgeAfterConfig,
		softwarePaths: fields.softwarePaths,
		glossary: fields.glossary,
		helpLinks: fields.helpLinks,
		prePurchaseTitle: fields.prePurchaseTitle,
		materielAnchor: fields.materielAnchor,
		tocSchema: fields.tocSchema,
		tutorialBridge: fields.tutorialBridge,
	};
}

/** @type {Record<string, ReturnType<typeof defineProject>>} */
const CONTENT = {
	"garage-porte-smartphone": defineProject("garage-porte-smartphone", {
		"requires230v": false,
		"h1": "Comment ouvrir une porte de garage motorisée depuis son smartphone en toute sécurité ?",
		"geoAnswer": "Branchez un relais en contact sec sur le bornier « bouton poussoir » de la motorisation, jamais sur le 230 V moteur. Ajoutez un capteur reed sur le battant pour afficher ouvert/fermé. Vous déclenchez la même impulsion qu’un bouton mural, avec historique dans Home Assistant.",
		"expectedOutcomes": [
				"Impulsion ouverture/fermeture à distance",
				"État reed ouvert/fermé",
				"Alerte porte ouverte le soir",
				"Scripts invités limités",
			],
		"limits": [
				"Sans bornier poussoir sec impossible",
				"Impulsion longue peut inverser le sens",
				"433 MHz non géré sans interface",
			],
		"scenarios": [
				{
				"title": "Voiture",
				"description": "Widget d’ouverture à l’approche.",
				},
				{
				"title": "Oubli",
				"description": "Push si ouvert après 22 h.",
				},
				{
				"title": "Livraison",
				"description": "Webhook une impulsion.",
				},
			],
		"prerequisites": [
				{
				"label": "Motorisation",
				"detail": "Bornier + / − poussoir.",
				},
				{
				"label": "Module",
				"detail": "Shelly 1 Mini ou ESP32.",
				},
				{
				"label": "Reed",
				"detail": "Retour d’état recommandé.",
				},
			],
		"incompatibilities": [
				"Bus propriétaire sans sec",
				"Relais sur phase moteur",
			],
		"prePurchaseChecks": [
				"Photo bornier",
				"Tension faible courant poussoir",
				"Test bouton mural",
			],
		"troubleshooting": [
				{
				"symptom": "Impulsion sans mouvement",
				"causes": [
						"Bornes",
						"Relais",
					],
				"checks": [
						"Poussoir mural",
						"Contact relais",
					],
				"solution": "Recâbler ; 0,5 s impulsion.",
				},
				{
				"symptom": "Reed faux",
				"causes": [
						"Aimant",
						"Jeu battant",
					],
				"checks": [
						"Fermeture manuelle",
					],
				"solution": "Repositionner aimant.",
				},
				{
				"symptom": "Offline",
				"causes": [
						"Wi-Fi garage",
					],
				"checks": [
						"Ping Shelly",
					],
				"solution": "IP fixe DHCP.",
				},
				{
				"symptom": "Double cycle",
				"causes": [
						"Boucle HA",
					],
				"checks": [
						"Journal",
					],
				"solution": "Condition reed fermé.",
				},
			],
		"faq": [
				{
				"question": "Couper le 230 V moteur avec Shelly ?",
				"answer": "Non : contact sec poussoir uniquement.",
				},
				{
				"question": "Durée impulsion Somfy ?",
				"answer": "0,3–0,8 s comme un doigt.",
				},
				{
				"question": "Reed obligatoire ?",
				"answer": "Non pour commander ; oui pour sécurité d’état.",
				},
				{
				"question": "ESP32 au froid ?",
				"answer": "Boîtier étanche + alim 5 V stable.",
				},
				{
				"question": "Sans cloud ?",
				"answer": "Shelly local ou ESPHome.",
				},
				{
				"question": "Deux portes ?",
				"answer": "Un relais par moteur.",
				},
			],
		"automations": [
				{
				"title": "Garage — notification",
				"goal": "Informer l’utilisateur",
				"trigger": "state change",
				"devices": "notify.mobile_app",
				},
				{
				"title": "Garage — journal",
				"goal": "Tracer dans le logbook",
				"trigger": "event",
				"devices": "logbook.log",
				},
				{
				"title": "Garage — nuit",
				"goal": "Réduire bruit nocturne",
				"trigger": "time 22:00-07:00",
				"devices": "condition time",
				},
				{
				"title": "Garage — absence",
				"goal": "Activer si personne absente",
				"trigger": "zone not_home",
				"devices": "condition zone",
				},
			],
		"tutorialSteps": [
				{
				"title": "Disjoncteur",
				"objective": "Hors tension moteur",
				"prerequisites": [
						"Testeur",
					],
				"actions": [
						"Couper circuit",
					],
				"expectedResult": "Safe",
				"errors": "Confondre éclairage/garage.",
				},
				{
				"title": "Bornier poussoir",
				"objective": "Repérer sec",
				"prerequisites": [
						"Notice",
					],
				"actions": [
						"Photo +/−",
					],
				"expectedResult": "OK",
				"errors": "230 V moteur.",
				},
				{
				"title": "Relais",
				"objective": "Parallèle poussoir",
				"prerequisites": [
						"Shelly",
					],
				"actions": [
						"Câbler sec",
					],
				"expectedResult": "Mural OK",
				"errors": "Inversion sens.",
				},
				{
				"title": "Alim module",
				"objective": "Wi-Fi",
				"prerequisites": [
						"Prise",
					],
				"actions": [
						"Config Shelly",
					],
				"expectedResult": "Online",
				"errors": "Alim depuis poussoir interdit.",
				},
				{
				"title": "Test impulsion",
				"objective": "Cycle",
				"prerequisites": [
						"App",
					],
				"actions": [
						"0,5 s",
					],
				"expectedResult": "Mouvement",
				"errors": "Durée excessive.",
				},
				{
				"title": "Reed",
				"objective": "État",
				"prerequisites": [
						"Capteur",
					],
				"actions": [
						"Fixer",
					],
				"expectedResult": "Cohérent",
				"errors": "Aimant loin.",
				},
				{
				"title": "Home Assistant",
				"objective": "Entités",
				"prerequisites": [
						"HA",
					],
				"actions": [
						"Découvrir",
					],
				"expectedResult": "Dashboard",
				"errors": "entity_id clair.",
				},
				{
				"title": "Automations",
				"objective": "Alertes",
				"prerequisites": [
						"UI",
					],
				"actions": [
						"Porte ouverte",
					],
				"expectedResult": "Stable",
				"errors": "Anti-boucle.",
				},
			],
		"haIntegrations": [
				"Shelly",
				"ESPHome",
				"Zigbee Home Automation",
			],
		"safetyNote": "Contact sec seulement ; garder stop photoélectrique.",
		}),
	"portail-electrique": defineProject("portail-electrique", {
		"requires230v": false,
		"h1": "Comment commander un portail électrique battant ou coulissant au smartphone ?",
		"geoAnswer": "Shelly en contact sec sur l’entrée poussoir du coffret automate ouvre ou ferme comme une clé. Capteur d’ouverture étanche sur le vantail pour l’état réel. Reste en faible courant sur l’entrée télécommande filaire.",
		"expectedOutcomes": [
				"Impulsion distante",
				"État ouvert/fermé",
				"Snapshot caméra entrée",
				"Fermeture auto temporisée",
			],
		"limits": [
				"Entrée sec requise",
				"8 A max relais",
				"Vent : prudence fermeture auto",
			],
		"scenarios": [
				{
				"title": "Visite",
				"description": "Ouvrir salon + fermer 5 min.",
				},
				{
				"title": "Jardinier",
				"description": "Alerte ouvert jour.",
				},
				{
				"title": "Nuit",
				"description": "Blocage distant 23 h.",
				},
			],
		"prerequisites": [
				{
				"label": "Coffret",
				"detail": "Bornes poussoir.",
				},
				{
				"label": "Shelly",
				"detail": "Plus 1 ou Mini sec.",
				},
				{
				"label": "Capteur",
				"detail": "IP65 sur vantail.",
				},
			],
		"incompatibilities": [
				"Sans poussoir sec",
				"Radio seule sans fil",
			],
		"prePurchaseChecks": [
				"Schéma coffret",
				"Test clé",
				"Wi-Fi extérieur",
			],
		"troubleshooting": [
				{
				"symptom": "Course incomplète",
				"causes": [
						"Impulsion",
						"Fin course",
					],
				"checks": [
						"Durée relais",
					],
				"solution": "Ajuster 0,2 s.",
				},
				{
				"symptom": "Faux ouvert",
				"causes": [
						"Jeu",
						"Capteur",
					],
				"checks": [
						"Manual",
					],
				"solution": "Fixer sur montant.",
				},
				{
				"symptom": "Humidité",
				"causes": [
						"IP",
						"Condensation",
					],
				"checks": [
						"Boîtier",
					],
				"solution": "Shelly étanche.",
				},
				{
				"symptom": "Ouverture seule",
				"causes": [
						"Script public",
					],
				"checks": [
						"Log",
					],
				"solution": "PIN sur script.",
				},
			],
		"faq": [
				{
				"question": "Plus 1 dans coffret ?",
				"answer": "Oui avec alim module et sorties sec.",
				},
				{
				"question": "Coulissant ?",
				"answer": "Même câblage sec.",
				},
				{
				"question": "Photocellules ?",
				"answer": "Ne pas shunter.",
				},
				{
				"question": "Multi users ?",
				"answer": "HA users + journal.",
				},
				{
				"question": "Fermeture auto piétons ?",
				"answer": "Vérifier réglementation locale.",
				},
				{
				"question": "Coupure secteur ?",
				"answer": "Déverrouillage manuel d’origine.",
				},
			],
		"automations": [
				{
				"title": "Portail — notification",
				"goal": "Informer l’utilisateur",
				"trigger": "state change",
				"devices": "notify.mobile_app",
				},
				{
				"title": "Portail — journal",
				"goal": "Tracer dans le logbook",
				"trigger": "event",
				"devices": "logbook.log",
				},
				{
				"title": "Portail — nuit",
				"goal": "Réduire bruit nocturne",
				"trigger": "time 22:00-07:00",
				"devices": "condition time",
				},
				{
				"title": "Portail — absence",
				"goal": "Activer si personne absente",
				"trigger": "zone not_home",
				"devices": "condition zone",
				},
			],
		"tutorialSteps": [
				{
				"title": "Couper automate",
				"objective": "Sécurité",
				"prerequisites": [
						"Disjoncteur",
					],
				"actions": [
						"Off",
					],
				"expectedResult": "HT",
				"errors": "Attendre condos.",
				},
				{
				"title": "Poussoir sec",
				"objective": "Repérage",
				"prerequisites": [
						"MM",
					],
				"actions": [
						"Photo",
					],
				"expectedResult": "OK",
				"errors": "Triphasé moteur.",
				},
				{
				"title": "Shelly sec",
				"objective": "Câble",
				"prerequisites": [
						"Wago",
					],
				"actions": [
						"Série sec",
					],
				"expectedResult": "OK",
				"errors": "Serrage.",
				},
				{
				"title": "Wi-Fi",
				"objective": "Réseau",
				"prerequisites": [
						"2,4 GHz",
					],
				"actions": [
						"App",
					],
				"expectedResult": "Online",
				"errors": "Répéteur.",
				},
				{
				"title": "Capteur",
				"objective": "État",
				"prerequisites": [
						"P2 IP",
					],
				"actions": [
						"Coller",
					],
				"expectedResult": "OK",
				"errors": "UV.",
				},
				{
				"title": "Cycles",
				"objective": "Test",
				"prerequisites": [
						"App",
					],
				"actions": [
						"×3",
					],
				"expectedResult": "OK",
				"errors": "Fin course.",
				},
				{
				"title": "HA",
				"objective": "Intégration",
				"prerequisites": [
						"Shelly",
					],
				"actions": [
						"Entités",
					],
				"expectedResult": "UI",
				"errors": "Noms.",
				},
				{
				"title": "Scénarios",
				"objective": "Auto-close",
				"prerequisites": [
						"UI",
					],
				"actions": [
						"3 min",
					],
				"expectedResult": "OK",
				"errors": "Vent.",
				},
			],
		"haIntegrations": [
				"Shelly",
				"Tapo",
				"Generic Camera",
			],
		"safetyNote": "Tester photocellules après intervention.",
		}),
	"boite-lettres-colis": defineProject("boite-lettres-colis", {
		"requires230v": false,
		"h1": "Comment savoir immédiatement quand courrier ou colis arrive dans la boîte aux lettres ?",
		"geoAnswer": "Un Aqara Door and Window Sensor P2 collé sur le volet détecte l’ouverture et prévient le téléphone. C’est un capteur à pile CR123A, en Thread et Matter : aucun fil, aucun disjoncteur, et il ne s’associe pas à un dongle Zigbee. La notice le réserve à l’intérieur, au sec.",
		"expectedOutcomes": [
				"Une notification quand le volet s’ouvre",
				"L’état ouvert ou fermé visible dans l’app Matter ou Home Assistant",
				"Une pause de deux minutes pour ne pas sonner à l’ouverture puis à la fermeture",
				"Le volet reste un volet mécanique : rien ne le verrouille ni ne l’ouvre",
			],
		"limits": [
				"La notice interdit l’extérieur et les lieux humides. Une boîte de rue sous la pluie sort de cet usage.",
				"La même notice déconseille un lieu clos mal ventilé. Une boîte étanche fermée en permanence n’est pas le bon emplacement.",
				"Le métal affaiblit le Thread. Il faut un essai volet fermé avant de compter dessus.",
				"Sans routeur de bordure Thread déjà en place, le capteur ne rejoint aucune app.",
				"Ce n’est pas une alarme : la notice le destine à un usage domestique de confort, pas à la protection des biens.",
			],
		"scenarios": [
				{
				"title": "Le facteur passe",
				"description": "Le volet s’écarte, l’aimant quitte le capteur, le téléphone affiche « boîte aux lettres ». Vous descendez une fois, pas à chaque bruit dans la cage d’escalier.",
				},
				{
				"title": "Vous ouvrez vous-même",
				"description": "Récupérer le courrier déclenche la même ouverture. La pause de deux minutes évite une seconde notification quand vous refermez.",
				},
				{
				"title": "La nuit",
				"description": "Une condition horaire tait la notification entre 21 h et 7 h. L’état reste consultable dans l’app : seul le push est filtré.",
				},
			],
		"prerequisites": [
				{
				"label": "Capteur",
				"detail": "Aqara Door and Window Sensor P2 (DW-S02E ou DW-S02D), pile CR123A et aimant fournis.",
				},
				{
				"label": "Radio",
				"detail": "Un routeur de bordure Thread compatible Matter, déjà chez vous. Le P2 ne parle pas Zigbee.",
				},
				{
				"label": "Boîte",
				"detail": "Un volet qui s’ouvre franchement, dans un volume sec et abrité. Pas une boîte de rue exposée à la pluie.",
				},
			],
		"incompatibilities": [
				"Coordinateur Zigbee (ZBDongle-E, ZHA, Zigbee2MQTT) : le P2 n’y apparaît pas.",
				"Hubs Aqara uniquement Zigbee (M2, M1S, E1) : il leur faut un routeur de bordure Thread, par exemple le Hub M3 pour l’app Aqara Home.",
				"Boîte mouillée, givrée ou en plein soleil : hors notice.",
			],
		"prePurchaseChecks": [
				"Le volet, fermé, laisse deux faces qui se font face et se séparent à l’ouverture.",
				"L’intérieur du volume reste sec. Sinon, ne collez pas ce capteur.",
				"Vous savez déjà quel appareil fera routeur de bordure Thread.",
			],
		"prePurchaseTitle": "Avant achat",
		"materielAnchor": "↓ Voir le capteur : il n’y a rien à câbler",
		"tocSchema": "Liaison radio",
		"schemaHeading": "Comment l’ouverture arrive au téléphone",
		"schemaLead": "Le dessin montre le trajet radio : le volet écarte l’aimant, le capteur parle en Thread, l’app Matter affiche l’ouverture.",
		"bornierHeaders": ["Élément", "Liaison", "Rôle"],
		"bridgeAfterConfig": "Le matériel de cette page se limite au capteur. La suite décrit le trajet de l’ouverture jusqu’au téléphone, puis le collage et l’appairage Matter. Aucun fil à repérer.",
		"tutorialBridge": "Le capteur est associé et collé dans les étapes qui suivent. Il n’y a pas de borne à serrer entre le dessin et le premier essai.",
		"troubleshooting": [
				{
				"symptom": "Le capteur n’apparaît pas dans ZHA ou Zigbee2MQTT",
				"causes": [
						"Le P2 n’est pas un appareil Zigbee",
						"Recherche lancée sur le mauvais réseau",
					],
				"checks": [
						"La notice indique Thread et BLE, pas Zigbee",
						"Le QR Matter est celui de la boîte, pas un appairage « Permit join »",
					],
				"solution": "Arrêtez la recherche Zigbee. Ajoutez l’appareil depuis l’app Matter, avec un routeur de bordure Thread allumé.",
				},
				{
				"symptom": "La diode ne respire pas après le retrait de la languette",
				"causes": [
						"Languette encore en place",
						"Pile non réveillée",
					],
				"checks": [
						"La languette isolante est bien sortie",
						"Le bouton de réinitialisation est accessible",
					],
				"solution": "Maintenez le bouton de réinitialisation 5 secondes, jusqu’au clignotement, puis relâchez. La notice décrit ainsi l’entrée en appairage.",
				},
				{
				"symptom": "L’état reste « ouvert » volet fermé",
				"causes": [
						"Aimant trop loin ou mal aligné",
						"Volet qui ne plaque pas",
					],
				"checks": [
						"Les lignes d’alignement du boîtier et de l’aimant se font face",
						"Écarter l’aimant à la main change l’état, le refermer le ramène",
					],
				"solution": "Décollez tant que l’adhésif n’a pas pris et réalignez. Si même aimant contre le boîtier l’état ne bouge pas, le souci est l’appairage, pas la boîte.",
				},
				{
				"symptom": "Deux notifications pour un seul passage",
				"causes": [
						"L’ouverture puis la fermeture comptent chacune",
						"Aucune pause dans l’automatisation",
					],
				"checks": [
						"Une seule automatisation vise ce capteur",
						"Le mode est single et une attente de 2 minutes suit la notification",
					],
				"solution": "Gardez le déclencheur sur le passage à ouvert, puis un délai avant la fin de l’automatisation. Le second front est ignoré pendant ce délai.",
				},
			],
		"faq": [
				{
				"question": "Faut-il un dongle Zigbee ou un coordinateur Home Assistant ?",
				"answer": "Non. L’Aqara Door and Window Sensor P2 (DW-S02E / DW-S02D) parle Thread et Bluetooth, avec Matter. Un SONOFF ZBDongle-E, ZHA ou Zigbee2MQTT ne le voient pas. Il faut un routeur de bordure Thread déjà compatible Matter.",
				},
				{
				"question": "Puis-je le coller sur une boîte aux lettres dehors ?",
				"answer": "La notice dit de ne l’utiliser qu’à l’intérieur, pas dehors et pas dans un environnement humide. Elle déconseille aussi un lieu clos mal ventilé. Une boîte de rue sous la pluie sort de cet usage. Le collage ne se justifie que dans un volume sec : hall, porche abrité, boîte intérieure.",
				},
				{
				"question": "L’app Aqara suffit-elle sans Home Assistant ?",
				"answer": "Oui, si vous avez une app Matter et un routeur de bordure Thread. Pour les fonctions supplémentaires de l’app Aqara Home, Aqara indique son propre routeur, le Hub M3. Les hubs seulement Zigbee (M2, M1S, E1) ne reçoivent pas ce capteur.",
				},
				{
				"question": "Le métal de la boîte bloque-t-il le signal ?",
				"answer": "Il peut l’affaiblir, comme tout boîtier métallique autour d’une radio 2,4 GHz. Faites l’essai volet fermé, capteur déjà collé, avant de vous fier à la notification. S’il décroche seulement une fois la porte en tôle refermée, cet emplacement ne convient pas.",
				},
				{
				"question": "Quelle pile, et faut-il percer ?",
				"answer": "Pile CR123A, fournie avec le capteur. La fixation de la notice est adhésive, avec l’aimant plat livré (le modèle DW-S02D ajoute deux autocollants). Pas de vis, pas de trou, pas de domino.",
				},
				{
				"question": "Où est décrite la panne d’appairage Matter ?",
				"answer": "Le code « PASE timeout » de ce capteur est traité à part : le délai vient souvent du routeur de bordure ou du code Matter, pas d’un fil.",
				},
			],
		"automations": [
				{
				"title": "Prévenir à l’ouverture",
				"goal": "Recevoir un message quand le volet passe à ouvert",
				"trigger": "binary_sensor du capteur Matter, vers ouvert",
				"devices": "notify du téléphone, rien d’autre",
				},
				{
				"title": "Ignorer le second front",
				"goal": "Ne pas sonner aussi quand le volet se referme juste après",
				"trigger": "La même ouverture, puis une attente de 2 minutes",
				"devices": "mode single : un second déclenchement pendant l’attente est ignoré",
				},
				{
				"title": "Taire la nuit",
				"goal": "Garder l’état visible sans réveiller le téléphone",
				"trigger": "Condition horaire, par exemple de 7 h à 21 h",
				"devices": "La condition filtre le push. Elle n’éteint pas le capteur.",
				},
			],
		"softwarePaths": [
				{
				"id": "wifi-sans-box",
				"title": "Application Matter, sans box Shelly",
				"steps": [
						"Oubliez Shelly Smart Control : ce capteur n’a pas de Wi-Fi et pas de compte Shelly.",
						"Allumez le routeur de bordure Thread déjà chez vous (Apple TV 4K, HomePod mini, Nest Hub, Echo compatible, ou Home Assistant).",
						"Retirez la languette. La diode doit respirer. Sinon, maintenez le bouton de réinitialisation 5 secondes jusqu’au clignotement.",
						"Dans l’app Matter, scannez le QR de la notice ou saisissez le code chiffré imprimé sur le produit.",
						"Ouvrez et fermez le volet : l’app doit changer d’état. Réglez ensuite la notification de cette app. Les conditions disponibles dépendent de l’écosystème, Aqara le précise sur la fiche du P2.",
					],
				},
				{
				"id": "ha-zigbee",
				"title": "Home Assistant, par Matter et non par Zigbee",
				"steps": [
						"Ne lancez pas « Ajouter un appareil » dans ZHA ou Zigbee2MQTT pour ce capteur : il n’y viendra pas.",
						"Home Assistant doit déjà avoir un routeur de bordure Thread. Le dongle Zigbee de vos autres appareils ne le remplace pas.",
						"Ajoutez l’intégration Matter : Paramètres, Appareils et services, Ajouter une intégration. Le code est le QR Matter, pas une touche d’appairage Zigbee.",
						"Dans Outils de développement, États, notez l’identifiant réel et si « on » veut dire ouvert. C’est le cas le plus courant pour un binary_sensor de porte, à confirmer chez vous.",
						"L’exemple YAML plus bas n’a pas été chargé sur une installation du site. Remplacez l’entity_id avant de l’enregistrer.",
					],
				},
				{
				"id": "maker-esp32",
				"title": "Pas de montage ESP32",
				"steps": [
						"Ce projet n’a pas de carte, pas de GPIO et pas de firmware à flasher.",
						"Un Raspberry Pi qui fait tourner Home Assistant ne parle au P2 que s’il dispose déjà d’une radio Thread. Cette fiche n’en ajoute pas une.",
						"Reprenez le parcours Home Assistant via Matter, ou l’app Matter si le routeur de bordure est ailleurs dans la maison.",
					],
				},
			],
		"glossary": [
				{ "term": "Capteur à effet Hall", "def": "Il voit l’aimant sans contact électrique. Quand l’aimant s’éloigne, l’état passe à ouvert." },
				{ "term": "Thread", "def": "Réseau radio maillé, basse consommation, utilisé par le P2. Ce n’est pas du Zigbee." },
				{ "term": "Matter", "def": "Le langage commun qui permet à l’app (Apple Maison, Google Home, Alexa, SmartThings, Home Assistant, Aqara Home) de lire ce capteur." },
				{ "term": "Routeur de bordure Thread", "def": "L’appareil qui relie le réseau Thread au reste de la maison. Sans lui, le QR Matter ne mène nulle part." },
				{ "term": "Ligne d’alignement", "def": "Le repère imprimé sur le boîtier et sur l’aimant. La notice demande de les poser face à face." },
				{ "term": "binary_sensor", "def": "L’entité Home Assistant qui vaut ouvert ou fermé. Ce n’est pas un switch : elle ne commande rien." },
			],
		"helpLinks": [
				{ "href": "/domotique/protocoles-domotique-zigbee-wifi-thread-matter/", "label": "Zigbee, Wi-Fi, Thread et Matter" },
				{ "href": "/domotique/code-erreur/aqara-p2-matter-pase-timeout/", "label": "P2 Matter : délai d’appairage" },
				{ "href": "/domotique/diagnostic-par-symptome/", "label": "diagnostic par symptôme" },
			],
		"tutorialSteps": [
				{
				"title": "Boîte — étape 1",
				"objective": "Poser/tester volet 1",
				"prerequisites": [
						"P2",
					],
				"actions": [
						"Action 1",
					],
				"expectedResult": "OK",
				"errors": "Métal",
				},
				{
				"title": "Boîte — étape 2",
				"objective": "Poser/tester volet 2",
				"prerequisites": [
						"P2",
					],
				"actions": [
						"Action 2",
					],
				"expectedResult": "OK",
				"errors": "Métal",
				},
				{
				"title": "Boîte — étape 3",
				"objective": "Poser/tester volet 3",
				"prerequisites": [
						"P2",
					],
				"actions": [
						"Action 3",
					],
				"expectedResult": "OK",
				"errors": "Métal",
				},
				{
				"title": "Boîte — étape 4",
				"objective": "Poser/tester volet 4",
				"prerequisites": [
						"P2",
					],
				"actions": [
						"Action 4",
					],
				"expectedResult": "OK",
				"errors": "Métal",
				},
				{
				"title": "Boîte — étape 5",
				"objective": "Poser/tester volet 5",
				"prerequisites": [
						"P2",
					],
				"actions": [
						"Action 5",
					],
				"expectedResult": "OK",
				"errors": "Métal",
				},
				{
				"title": "Boîte — étape 6",
				"objective": "Poser/tester volet 6",
				"prerequisites": [
						"P2",
					],
				"actions": [
						"Action 6",
					],
				"expectedResult": "OK",
				"errors": "Métal",
				},
				{
				"title": "Boîte — étape 7",
				"objective": "Poser/tester volet 7",
				"prerequisites": [
						"P2",
					],
				"actions": [
						"Action 7",
					],
				"expectedResult": "OK",
				"errors": "Métal",
				},
				{
				"title": "Boîte — étape 8",
				"objective": "Poser/tester volet 8",
				"prerequisites": [
						"P2",
					],
				"actions": [
						"Action 8",
					],
				"expectedResult": "OK",
				"errors": "Métal",
				},
			],
		"haIntegrations": [
				"Matter",
				"Thread (routeur de bordure)",
			],
		"yamlNotes": [
				"entity_id : celui créé par l’intégration Matter, visible dans Outils de développement → États. L’exemple utilise binary_sensor.boite_aux_lettres comme nom à remplacer.",
				"to: \"on\" suppose qu’ouvert vaut on. Vérifiez-le en écartant l’aimant avant d’enregistrer l’automatisation.",
				"mode: single et le delay de 2 minutes ignorent un second front (la fermeture juste après l’ouverture).",
				"La condition horaire filtre le push. Elle n’éteint pas le capteur.",
				"Aucune action switch, cover ou relais : ce projet ne commande rien.",
				"L’exemple n’a pas été chargé sur une installation du site.",
			],
		"safetyNote": "Le capteur reste sur sa pile : rien à couper au tableau. La notice le réserve à l’intérieur, hors humidité, et le destine à un usage de confort, pas à la protection des biens. La pile CR123A se remplace par le même type et se jette selon la consigne du fabricant.",
		}),
	"sonnette-carillon-photo": defineProject("sonnette-carillon-photo", {
		"requires230v": false,
		"h1": "Comment associer sonnette filaire et capture photo instantanée ?",
		"geoAnswer": "Module impulsion sur carillon + caméra Tapo C220 ou ieGeek déclenchée par Home Assistant à la sonnerie. Le carillon conserve son volume d’origine. Notification mobile avec miniature.",
		"expectedOutcomes": [
				"Photo à chaque sonnerie",
				"Historique visiteurs",
				"Annonce Alexa optionnelle",
				"Enregistrement clip court",
			],
		"limits": [
				"Carillon sans bornier sec",
				"Caméra hors champ porte",
				"Latence Wi-Fi",
			],
		"scenarios": [
				{
				"title": "Livraison",
				"description": "Photo + TTS « colis ».",
				},
				{
				"title": "Nuit",
				"description": "Lumière entrée + photo.",
				},
				{
				"title": "Absent",
				"description": "Push prioritaire.",
				},
			],
		"prerequisites": [
				{
				"label": "Carillon",
				"detail": "Bornes bouton accessibles.",
				},
				{
				"label": "Caméra",
				"detail": "Champ couvrant porte.",
				},
				{
				"label": "HA",
				"detail": "Serveur local.",
				},
			],
		"incompatibilities": [
				"Sonnettes purement RF sans fil sec",
			],
		"prePurchaseChecks": [
				"Schéma carillon",
				"Wi-Fi porte",
				"Hauteur caméra",
			],
		"troubleshooting": [
				{
				"symptom": "Pas de photo",
				"causes": [
						"Automation",
						"Caméra offline",
					],
				"checks": [
						"Trace HA",
					],
				"solution": "Trigger sur binary_sensor sonnette.",
				},
				{
				"symptom": "Retard image",
				"causes": [
						"Wi-Fi",
						"RTSP",
					],
				"checks": [
						"Ping cam",
					],
				"solution": "Snapshot local Tapo.",
				},
				{
				"symptom": "Carillon muet",
				"causes": [
						"Câblage relais",
					],
				"checks": [
						"Test bouton",
					],
				"solution": "Impulsion parallèle correcte.",
				},
				{
				"symptom": "Fausses sonneries",
				"causes": [
						"Vibration",
						"Orage",
					],
				"checks": [
						"Sensibilité",
					],
				"solution": "Debounce 2 s.",
				},
			],
		"faq": [
				{
				"question": "Shelly sur carillon 230 V ?",
				"answer": "Entrée bouton sec si disponible ; sinon module dédié portier.",
				},
				{
				"question": "Tapo sans cloud ?",
				"answer": "Intégration HA Tapo locale partielle selon firmware.",
				},
				{
				"question": "ieGeek la nuit ?",
				"answer": "IR ou projecteur ; régler sensibilité.",
				},
				{
				"question": "RGPD visiteurs ?",
				"answer": "Afficher pictogramme caméra ; rétention limitée.",
				},
				{
				"question": "Deux sonnettes ?",
				"answer": "Deux entrées ou capteurs vibration distincts.",
				},
				{
				"question": "Interphone existant ?",
				"answer": "Ne pas couper alimentation interphone sans doc.",
				},
			],
		"automations": [
				{
				"title": "Sonnette — notification",
				"goal": "Informer l’utilisateur",
				"trigger": "state change",
				"devices": "notify.mobile_app",
				},
				{
				"title": "Sonnette — journal",
				"goal": "Tracer dans le logbook",
				"trigger": "event",
				"devices": "logbook.log",
				},
				{
				"title": "Sonnette — nuit",
				"goal": "Réduire bruit nocturne",
				"trigger": "time 22:00-07:00",
				"devices": "condition time",
				},
				{
				"title": "Sonnette — absence",
				"goal": "Activer si personne absente",
				"trigger": "zone not_home",
				"devices": "condition zone",
				},
			],
		"tutorialSteps": [
				{
				"title": "Sonnette étape 1",
				"objective": "Photo liée",
				"prerequisites": [
						"Caméra",
					],
				"actions": [
						"Câblage/test 1",
					],
				"expectedResult": "OK",
				"errors": "RGPD",
				},
				{
				"title": "Sonnette étape 2",
				"objective": "Photo liée",
				"prerequisites": [
						"Caméra",
					],
				"actions": [
						"Câblage/test 2",
					],
				"expectedResult": "OK",
				"errors": "RGPD",
				},
				{
				"title": "Sonnette étape 3",
				"objective": "Photo liée",
				"prerequisites": [
						"Caméra",
					],
				"actions": [
						"Câblage/test 3",
					],
				"expectedResult": "OK",
				"errors": "RGPD",
				},
				{
				"title": "Sonnette étape 4",
				"objective": "Photo liée",
				"prerequisites": [
						"Caméra",
					],
				"actions": [
						"Câblage/test 4",
					],
				"expectedResult": "OK",
				"errors": "RGPD",
				},
				{
				"title": "Sonnette étape 5",
				"objective": "Photo liée",
				"prerequisites": [
						"Caméra",
					],
				"actions": [
						"Câblage/test 5",
					],
				"expectedResult": "OK",
				"errors": "RGPD",
				},
				{
				"title": "Sonnette étape 6",
				"objective": "Photo liée",
				"prerequisites": [
						"Caméra",
					],
				"actions": [
						"Câblage/test 6",
					],
				"expectedResult": "OK",
				"errors": "RGPD",
				},
				{
				"title": "Sonnette étape 7",
				"objective": "Photo liée",
				"prerequisites": [
						"Caméra",
					],
				"actions": [
						"Câblage/test 7",
					],
				"expectedResult": "OK",
				"errors": "RGPD",
				},
				{
				"title": "Sonnette étape 8",
				"objective": "Photo liée",
				"prerequisites": [
						"Caméra",
					],
				"actions": [
						"Câblage/test 8",
					],
				"expectedResult": "OK",
				"errors": "RGPD",
				},
			],
		"haIntegrations": [
				"Tapo",
				"Generic Camera",
				"Shelly",
			],
		"safetyNote": "Couper disjoncteur carillon avant câblage ; respect vie privée.",
		}),
	"volets-roulants-filaires": defineProject("volets-roulants-filaires", {
		"requires230v": true,
		"h1": "Comment domotiser des volets roulants filaires 4 fils existants ?",
		"geoAnswer": "Shelly Plus 2PM en mode roller shutter calibre butées haut/bas après câblage Montée/Descente. Pilotage smartphone et scénarios lever de soleil. Coupez le disjoncteur volet avant intervention tableau ou boîtier.",
		"expectedOutcomes": [
				"Piloter Volets depuis smartphone",
				"Automatisations locales HA",
				"Historique et graphiques",
				"Notifications ciblées",
			],
		"limits": [
				"Compatibilité matérielle Volets à vérifier",
				"Couverture radio/Wi-Fi",
			],
		"scenarios": [
				{
				"title": "Matin",
				"description": "Scénario Volets lever.",
				},
				{
				"title": "Absence",
				"description": "Alerte Volets.",
				},
				{
				"title": "Manuel",
				"description": "Boutons d’origine Volets.",
				},
			],
		"prerequisites": [
				{
				"label": "Matériel",
				"detail": "Équipement compatible Volets.",
				},
			],
		"incompatibilities": [
				"Versions fermées sans intégration HA pour Volets",
			],
		"prePurchaseChecks": [
				"Checklist pré-achat Volets",
				"Portée réseau",
			],
		"troubleshooting": [
				{
				"symptom": "Volets ne répond plus",
				"causes": [
						"Pile ou alimentation",
						"Hors ligne",
					],
				"checks": [
						"État batterie",
						"Ping IP",
					],
				"solution": "Remplacer piles ou redémarrer module.",
				},
				{
				"symptom": "Notifications absentes",
				"causes": [
						"Automation désactivée",
						"Téléphone DND",
					],
				"checks": [
						"Trace HA",
						"Canal notify",
					],
				"solution": "Tester notify.test ; vérifier app mobile.",
				},
				{
				"symptom": "État incohérent",
				"causes": [
						"Capteur mal fixé",
						"Interférences",
					],
				"checks": [
						"Manual test",
						"RSSI",
					],
				"solution": "Repositionner capteur ou ajouter routeur Zigbee.",
				},
				{
				"symptom": "Doublons d’alertes",
				"causes": [
						"Triggers multiples",
						"Pas de cooldown",
					],
				"checks": [
						"Liste automations",
					],
				"solution": "Ajouter mode single ou délai 120 s.",
				},
			],
		"faq": [
				{
				"question": "Shelly Plus 2PM en mode shutter est-il obligatoire ?",
				"answer": "C’est la solution la plus documentée pour 4 fils avec calibration ; d’autres modules shutter existent si compatibles fins de course.",
				},
				{
				"question": "Dois-je resserrer les butées mécaniques ?",
				"answer": "Non si calibration électronique réussit ; les butées d’origine restent la sécurité mécanique.",
				},
				{
				"question": "Un volet sans neutre au boîtier ?",
				"answer": "Le 2PM a besoin de neutre et phase au boîtier applique — vérifiez avant achat.",
				},
				{
				"question": "Plusieurs volets sur un module ?",
				"answer": "Un module par moteur ; synchronisez les scénarios dans Home Assistant.",
				},
				{
				"question": "Commande murale existante ?",
				"answer": "Souvent conservée en parallèle selon câblage ; photo avant démontage.",
				},
				{
				"question": "Bruit anormal après calibration ?",
				"answer": "Relancez calibration sans charge anormale ; vérifiez jeu lame.",
				},
			],
		"automations": [
				{
				"title": "Volets — notification",
				"goal": "Informer l’utilisateur",
				"trigger": "state change",
				"devices": "notify.mobile_app",
				},
				{
				"title": "Volets — journal",
				"goal": "Tracer dans le logbook",
				"trigger": "event",
				"devices": "logbook.log",
				},
				{
				"title": "Volets — nuit",
				"goal": "Réduire bruit nocturne",
				"trigger": "time 22:00-07:00",
				"devices": "condition time",
				},
				{
				"title": "Volets — absence",
				"goal": "Activer si personne absente",
				"trigger": "zone not_home",
				"devices": "condition zone",
				},
			],
		"tutorialSteps": [
				{
				"title": "Volets — préparation 1",
				"objective": "Objectif étape 1",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 1 pour volets-roulants-filaires",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Volets — préparation 2",
				"objective": "Objectif étape 2",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 2 pour volets-roulants-filaires",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Volets — préparation 3",
				"objective": "Objectif étape 3",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 3 pour volets-roulants-filaires",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Volets — préparation 4",
				"objective": "Objectif étape 4",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 4 pour volets-roulants-filaires",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Volets — préparation 5",
				"objective": "Objectif étape 5",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 5 pour volets-roulants-filaires",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Volets — préparation 6",
				"objective": "Objectif étape 6",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 6 pour volets-roulants-filaires",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Volets — préparation 7",
				"objective": "Objectif étape 7",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 7 pour volets-roulants-filaires",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Volets — préparation 8",
				"objective": "Objectif étape 8",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 8 pour volets-roulants-filaires",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
			],
		"haIntegrations": [
				"Home Assistant",
				"Shelly",
				"Zigbee Home Automation",
			],
		"safetyNote": "Coupez disjoncteur concerné si travail 230 V ; suivez notice fabricant.",
		}),
	"store-banne-soleil-vent": defineProject("store-banne-soleil-vent", {
		"requires230v": true,
		"h1": "Comment automatiser un store banne selon soleil et vent ?",
		"geoAnswer": "Shelly Plus 2PM sur moteur banne plus capteur météo Zigbee si vent fort. Home Assistant replie le store au-delà du seuil vent. Scénarios ensoleillement sans surchauffer terrasse.",
		"expectedOutcomes": [
				"Piloter Store banne depuis smartphone",
				"Automatisations locales HA",
				"Historique et graphiques",
				"Notifications ciblées",
			],
		"limits": [
				"Compatibilité matérielle Store banne à vérifier",
				"Couverture radio/Wi-Fi",
			],
		"scenarios": [
				{
				"title": "Matin",
				"description": "Scénario Store banne lever.",
				},
				{
				"title": "Absence",
				"description": "Alerte Store banne.",
				},
				{
				"title": "Manuel",
				"description": "Boutons d’origine Store banne.",
				},
			],
		"prerequisites": [
				{
				"label": "Matériel",
				"detail": "Équipement compatible Store banne.",
				},
			],
		"incompatibilities": [
				"Versions fermées sans intégration HA pour Store banne",
			],
		"prePurchaseChecks": [
				"Checklist pré-achat Store banne",
				"Portée réseau",
			],
		"troubleshooting": [
				{
				"symptom": "Store banne ne répond plus",
				"causes": [
						"Pile ou alimentation",
						"Hors ligne",
					],
				"checks": [
						"État batterie",
						"Ping IP",
					],
				"solution": "Remplacer piles ou redémarrer module.",
				},
				{
				"symptom": "Notifications absentes",
				"causes": [
						"Automation désactivée",
						"Téléphone DND",
					],
				"checks": [
						"Trace HA",
						"Canal notify",
					],
				"solution": "Tester notify.test ; vérifier app mobile.",
				},
				{
				"symptom": "État incohérent",
				"causes": [
						"Capteur mal fixé",
						"Interférences",
					],
				"checks": [
						"Manual test",
						"RSSI",
					],
				"solution": "Repositionner capteur ou ajouter routeur Zigbee.",
				},
				{
				"symptom": "Doublons d’alertes",
				"causes": [
						"Triggers multiples",
						"Pas de cooldown",
					],
				"checks": [
						"Liste automations",
					],
				"solution": "Ajouter mode single ou délai 120 s.",
				},
			],
		"faq": [
				{
				"question": "Capteur vent sans fil suffit-il ?",
				"answer": "Un capteur météo Zigbee fiable évite de laisser le store déployé par tempête.",
				},
				{
				"question": "Peut-on n’automatiser que le soleil ?",
				"answer": "Oui via entité sun.sun et azimut/élévation dans HA sans capteur vent.",
				},
				{
				"question": "Store lourd : quel module ?",
				"answer": "Respectez courant moteur ; 2PM adapté aux motorisations classiques banne.",
				},
				{
				"question": "Repli manuel d’urgence ?",
				"answer": "La manivelle ou commande d’origine reste prioritaire en cas de panne module.",
				},
				{
				"question": "Gel ou neige sur toile ?",
				"answer": "Automatisation vent ne remplace pas déneigement manuel avant déploiement.",
				},
				{
				"question": "Intégration avec volets maison ?",
				"answer": "Scénario unique « tempête » peut replier store et fermer volets sud.",
				},
			],
		"automations": [
				{
				"title": "Store banne — notification",
				"goal": "Informer l’utilisateur",
				"trigger": "state change",
				"devices": "notify.mobile_app",
				},
				{
				"title": "Store banne — journal",
				"goal": "Tracer dans le logbook",
				"trigger": "event",
				"devices": "logbook.log",
				},
				{
				"title": "Store banne — nuit",
				"goal": "Réduire bruit nocturne",
				"trigger": "time 22:00-07:00",
				"devices": "condition time",
				},
				{
				"title": "Store banne — absence",
				"goal": "Activer si personne absente",
				"trigger": "zone not_home",
				"devices": "condition zone",
				},
			],
		"tutorialSteps": [
				{
				"title": "Store banne — préparation 1",
				"objective": "Objectif étape 1",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 1 pour store-banne-soleil-vent",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Store banne — préparation 2",
				"objective": "Objectif étape 2",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 2 pour store-banne-soleil-vent",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Store banne — préparation 3",
				"objective": "Objectif étape 3",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 3 pour store-banne-soleil-vent",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Store banne — préparation 4",
				"objective": "Objectif étape 4",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 4 pour store-banne-soleil-vent",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Store banne — préparation 5",
				"objective": "Objectif étape 5",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 5 pour store-banne-soleil-vent",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Store banne — préparation 6",
				"objective": "Objectif étape 6",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 6 pour store-banne-soleil-vent",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Store banne — préparation 7",
				"objective": "Objectif étape 7",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 7 pour store-banne-soleil-vent",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Store banne — préparation 8",
				"objective": "Objectif étape 8",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 8 pour store-banne-soleil-vent",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
			],
		"haIntegrations": [
				"Home Assistant",
				"Shelly",
				"Zigbee Home Automation",
			],
		"safetyNote": "Coupez disjoncteur concerné si travail 230 V ; suivez notice fabricant.",
		}),
	"rideaux-switchbot": defineProject("rideaux-switchbot", {
		"requires230v": false,
		"h1": "Comment motoriser des rideaux existants sans tirer de câbles ?",
		"geoAnswer": "SwitchBot Curtain 3 sur tringle + Hub 2 Wi-Fi pour app et Home Assistant. Calibration ouvert/fermé dans l’app. Idéal locataire sans perçage mural électrique.",
		"expectedOutcomes": [
				"Piloter Rideaux SwitchBot depuis smartphone",
				"Automatisations locales HA",
				"Historique et graphiques",
				"Notifications ciblées",
			],
		"limits": [
				"Compatibilité matérielle Rideaux SwitchBot à vérifier",
				"Couverture radio/Wi-Fi",
			],
		"scenarios": [
				{
				"title": "Matin",
				"description": "Scénario Rideaux SwitchBot lever.",
				},
				{
				"title": "Absence",
				"description": "Alerte Rideaux SwitchBot.",
				},
				{
				"title": "Manuel",
				"description": "Boutons d’origine Rideaux SwitchBot.",
				},
			],
		"prerequisites": [
				{
				"label": "Matériel",
				"detail": "Équipement compatible Rideaux SwitchBot.",
				},
			],
		"incompatibilities": [
				"Versions fermées sans intégration HA pour Rideaux SwitchBot",
			],
		"prePurchaseChecks": [
				"Checklist pré-achat Rideaux SwitchBot",
				"Portée réseau",
			],
		"troubleshooting": [
				{
				"symptom": "Rideaux SwitchBot ne répond plus",
				"causes": [
						"Pile ou alimentation",
						"Hors ligne",
					],
				"checks": [
						"État batterie",
						"Ping IP",
					],
				"solution": "Remplacer piles ou redémarrer module.",
				},
				{
				"symptom": "Notifications absentes",
				"causes": [
						"Automation désactivée",
						"Téléphone DND",
					],
				"checks": [
						"Trace HA",
						"Canal notify",
					],
				"solution": "Tester notify.test ; vérifier app mobile.",
				},
				{
				"symptom": "État incohérent",
				"causes": [
						"Capteur mal fixé",
						"Interférences",
					],
				"checks": [
						"Manual test",
						"RSSI",
					],
				"solution": "Repositionner capteur ou ajouter routeur Zigbee.",
				},
				{
				"symptom": "Doublons d’alertes",
				"causes": [
						"Triggers multiples",
						"Pas de cooldown",
					],
				"checks": [
						"Liste automations",
					],
				"solution": "Ajouter mode single ou délai 120 s.",
				},
			],
		"faq": [
				{
				"question": "Curtain 3 sur rail U-rail ?",
				"answer": "Vérifiez kit de fixation SwitchBot pour votre type de tringle.",
				},
				{
				"question": "Hub 2 est-il obligatoire ?",
				"answer": "Oui pour Wi-Fi/Matter et intégration HA via SwitchBot API locale limitée.",
				},
				{
				"question": "Piles : autonomie réelle ?",
				"answer": "1 à 3 mois selon usage ; prévoyez recharge USB périodique.",
				},
				{
				"question": "Rideau lourd blackout ?",
				"answer": "Poids max indiqué par SwitchBot — au-delà, moteur force excessive.",
				},
				{
				"question": "Locataire : traces mur ?",
				"answer": "Fixation sur tringle sans percer le linteau électrique.",
				},
				{
				"question": "Home Assistant Cloud SwitchBot ?",
				"answer": "Préférez Hub local ; cloud SwitchBot optionnel selon intégration.",
				},
			],
		"automations": [
				{
				"title": "Rideaux SwitchBot — notification",
				"goal": "Informer l’utilisateur",
				"trigger": "state change",
				"devices": "notify.mobile_app",
				},
				{
				"title": "Rideaux SwitchBot — journal",
				"goal": "Tracer dans le logbook",
				"trigger": "event",
				"devices": "logbook.log",
				},
				{
				"title": "Rideaux SwitchBot — nuit",
				"goal": "Réduire bruit nocturne",
				"trigger": "time 22:00-07:00",
				"devices": "condition time",
				},
				{
				"title": "Rideaux SwitchBot — absence",
				"goal": "Activer si personne absente",
				"trigger": "zone not_home",
				"devices": "condition zone",
				},
			],
		"tutorialSteps": [
				{
				"title": "Rideaux SwitchBot — préparation 1",
				"objective": "Objectif étape 1",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 1 pour rideaux-switchbot",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Rideaux SwitchBot — préparation 2",
				"objective": "Objectif étape 2",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 2 pour rideaux-switchbot",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Rideaux SwitchBot — préparation 3",
				"objective": "Objectif étape 3",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 3 pour rideaux-switchbot",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Rideaux SwitchBot — préparation 4",
				"objective": "Objectif étape 4",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 4 pour rideaux-switchbot",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Rideaux SwitchBot — préparation 5",
				"objective": "Objectif étape 5",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 5 pour rideaux-switchbot",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Rideaux SwitchBot — préparation 6",
				"objective": "Objectif étape 6",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 6 pour rideaux-switchbot",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Rideaux SwitchBot — préparation 7",
				"objective": "Objectif étape 7",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 7 pour rideaux-switchbot",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Rideaux SwitchBot — préparation 8",
				"objective": "Objectif étape 8",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 8 pour rideaux-switchbot",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
			],
		"haIntegrations": [
				"Home Assistant",
				"Shelly",
				"Zigbee Home Automation",
			],
		"safetyNote": "Coupez disjoncteur concerné si travail 230 V ; suivez notice fabricant.",
		}),
	"eclairage-sans-neutre": defineProject("eclairage-sans-neutre", {
		"requires230v": true,
		"h1": "Comment rendre connecté un interrupteur sans fil neutre au boîtier ?",
		"geoAnswer": "Sonoff ZBMini-L2 Zigbee ou Shelly Dimmer 2 avec bypass LED selon charge. Module derrière interrupteur sans neutre. Coupure disjoncteur obligatoire.",
		"expectedOutcomes": [
				"Piloter Sans neutre depuis smartphone",
				"Automatisations locales HA",
				"Historique et graphiques",
				"Notifications ciblées",
			],
		"limits": [
				"Compatibilité matérielle Sans neutre à vérifier",
				"Couverture radio/Wi-Fi",
			],
		"scenarios": [
				{
				"title": "Matin",
				"description": "Scénario Sans neutre lever.",
				},
				{
				"title": "Absence",
				"description": "Alerte Sans neutre.",
				},
				{
				"title": "Manuel",
				"description": "Boutons d’origine Sans neutre.",
				},
			],
		"prerequisites": [
				{
				"label": "Matériel",
				"detail": "Équipement compatible Sans neutre.",
				},
			],
		"incompatibilities": [
				"Versions fermées sans intégration HA pour Sans neutre",
			],
		"prePurchaseChecks": [
				"Checklist pré-achat Sans neutre",
				"Portée réseau",
			],
		"troubleshooting": [
				{
				"symptom": "Sans neutre ne répond plus",
				"causes": [
						"Pile ou alimentation",
						"Hors ligne",
					],
				"checks": [
						"État batterie",
						"Ping IP",
					],
				"solution": "Remplacer piles ou redémarrer module.",
				},
				{
				"symptom": "Notifications absentes",
				"causes": [
						"Automation désactivée",
						"Téléphone DND",
					],
				"checks": [
						"Trace HA",
						"Canal notify",
					],
				"solution": "Tester notify.test ; vérifier app mobile.",
				},
				{
				"symptom": "État incohérent",
				"causes": [
						"Capteur mal fixé",
						"Interférences",
					],
				"checks": [
						"Manual test",
						"RSSI",
					],
				"solution": "Repositionner capteur ou ajouter routeur Zigbee.",
				},
				{
				"symptom": "Doublons d’alertes",
				"causes": [
						"Triggers multiples",
						"Pas de cooldown",
					],
				"checks": [
						"Liste automations",
					],
				"solution": "Ajouter mode single ou délai 120 s.",
				},
			],
		"faq": [
				{
				"question": "ZBMini-L2 scintille avec mes spots ?",
				"answer": "Charge minimale LED parfois insuffisante — bypass ou ampoules compatibles.",
				},
				{
				"question": "Shelly Dimmer sans neutre ?",
				"answer": "Dimmer 2 exige neutre ; sans neutre préférez ZBMini-L2 ou L1.",
				},
				{
				"question": "Combien de W minimum ?",
				"answer": "Consultez fiche fabricant ; souvent 3–5 W LED cumulés.",
				},
				{
				"question": "Interrupteur va-et-vient sans neutre ?",
				"answer": "Cas difficile — parfois neutre au plafonnier seulement.",
				},
				{
				"question": "Couleur fils : que mesurer ?",
				"answer": "Phase entrante/sortante avec testeur hors tension puis sous tension prudente.",
				},
				{
				"question": "Boîtier DCL ?",
				"answer": "Module dans DCL possible si place et neutre absent confirmé.",
				},
			],
		"automations": [
				{
				"title": "Sans neutre — notification",
				"goal": "Informer l’utilisateur",
				"trigger": "state change",
				"devices": "notify.mobile_app",
				},
				{
				"title": "Sans neutre — journal",
				"goal": "Tracer dans le logbook",
				"trigger": "event",
				"devices": "logbook.log",
				},
				{
				"title": "Sans neutre — nuit",
				"goal": "Réduire bruit nocturne",
				"trigger": "time 22:00-07:00",
				"devices": "condition time",
				},
				{
				"title": "Sans neutre — absence",
				"goal": "Activer si personne absente",
				"trigger": "zone not_home",
				"devices": "condition zone",
				},
			],
		"tutorialSteps": [
				{
				"title": "Sans neutre — préparation 1",
				"objective": "Objectif étape 1",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 1 pour eclairage-sans-neutre",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Sans neutre — préparation 2",
				"objective": "Objectif étape 2",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 2 pour eclairage-sans-neutre",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Sans neutre — préparation 3",
				"objective": "Objectif étape 3",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 3 pour eclairage-sans-neutre",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Sans neutre — préparation 4",
				"objective": "Objectif étape 4",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 4 pour eclairage-sans-neutre",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Sans neutre — préparation 5",
				"objective": "Objectif étape 5",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 5 pour eclairage-sans-neutre",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Sans neutre — préparation 6",
				"objective": "Objectif étape 6",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 6 pour eclairage-sans-neutre",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Sans neutre — préparation 7",
				"objective": "Objectif étape 7",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 7 pour eclairage-sans-neutre",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Sans neutre — préparation 8",
				"objective": "Objectif étape 8",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 8 pour eclairage-sans-neutre",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
			],
		"haIntegrations": [
				"Home Assistant",
				"Shelly",
				"Zigbee Home Automation",
			],
		"safetyNote": "Coupez disjoncteur concerné si travail 230 V ; suivez notice fabricant.",
		}),
	"va-et-vient-domotise": defineProject("va-et-vient-domotise", {
		"requires230v": true,
		"h1": "Comment domotiser un va-et-vient en gardant les deux boutons ?",
		"geoAnswer": "Module Shelly ou Sonoff au point lumineux où neutre et phase sont accessibles. Mode switch conserve va-et-vient. Commande app en parallèle.",
		"expectedOutcomes": [
				"Piloter Va-et-vient depuis smartphone",
				"Automatisations locales HA",
				"Historique et graphiques",
				"Notifications ciblées",
			],
		"limits": [
				"Compatibilité matérielle Va-et-vient à vérifier",
				"Couverture radio/Wi-Fi",
			],
		"scenarios": [
				{
				"title": "Matin",
				"description": "Scénario Va-et-vient lever.",
				},
				{
				"title": "Absence",
				"description": "Alerte Va-et-vient.",
				},
				{
				"title": "Manuel",
				"description": "Boutons d’origine Va-et-vient.",
				},
			],
		"prerequisites": [
				{
				"label": "Matériel",
				"detail": "Équipement compatible Va-et-vient.",
				},
			],
		"incompatibilities": [
				"Versions fermées sans intégration HA pour Va-et-vient",
			],
		"prePurchaseChecks": [
				"Checklist pré-achat Va-et-vient",
				"Portée réseau",
			],
		"troubleshooting": [
				{
				"symptom": "Va-et-vient ne répond plus",
				"causes": [
						"Pile ou alimentation",
						"Hors ligne",
					],
				"checks": [
						"État batterie",
						"Ping IP",
					],
				"solution": "Remplacer piles ou redémarrer module.",
				},
				{
				"symptom": "Notifications absentes",
				"causes": [
						"Automation désactivée",
						"Téléphone DND",
					],
				"checks": [
						"Trace HA",
						"Canal notify",
					],
				"solution": "Tester notify.test ; vérifier app mobile.",
				},
				{
				"symptom": "État incohérent",
				"causes": [
						"Capteur mal fixé",
						"Interférences",
					],
				"checks": [
						"Manual test",
						"RSSI",
					],
				"solution": "Repositionner capteur ou ajouter routeur Zigbee.",
				},
				{
				"symptom": "Doublons d’alertes",
				"causes": [
						"Triggers multiples",
						"Pas de cooldown",
					],
				"checks": [
						"Liste automations",
					],
				"solution": "Ajouter mode single ou délai 120 s.",
				},
			],
		"faq": [
				{
				"question": "Où placer le module ?",
				"answer": "Là où neutre + phase alimentent la lampe, souvent au plafonnier.",
				},
				{
				"question": "Les deux boutons restent-ils actifs ?",
				"answer": "Oui en mode switch multiway du module compatible.",
				},
				{
				"question": "Sonoff ou Shelly ici ?",
				"answer": "Sonoff ZBMini si neutre absent au boîtier ; Shelly si neutre présent.",
				},
				{
				"question": "LED faible consommation au plafond ?",
				"answer": "Vérifiez compatibilité charge minimale du module.",
				},
				{
				"question": "Peut-on ajouter détecteur présence ?",
				"answer": "Oui via automation HA sur entité lumière.",
				},
				{
				"question": "Retour en arrière facile ?",
				"answer": "Rebranchez navettes d’origine avec photos prises avant.",
				},
			],
		"automations": [
				{
				"title": "Va-et-vient — notification",
				"goal": "Informer l’utilisateur",
				"trigger": "state change",
				"devices": "notify.mobile_app",
				},
				{
				"title": "Va-et-vient — journal",
				"goal": "Tracer dans le logbook",
				"trigger": "event",
				"devices": "logbook.log",
				},
				{
				"title": "Va-et-vient — nuit",
				"goal": "Réduire bruit nocturne",
				"trigger": "time 22:00-07:00",
				"devices": "condition time",
				},
				{
				"title": "Va-et-vient — absence",
				"goal": "Activer si personne absente",
				"trigger": "zone not_home",
				"devices": "condition zone",
				},
			],
		"tutorialSteps": [
				{
				"title": "Va-et-vient — préparation 1",
				"objective": "Objectif étape 1",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 1 pour va-et-vient-domotise",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Va-et-vient — préparation 2",
				"objective": "Objectif étape 2",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 2 pour va-et-vient-domotise",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Va-et-vient — préparation 3",
				"objective": "Objectif étape 3",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 3 pour va-et-vient-domotise",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Va-et-vient — préparation 4",
				"objective": "Objectif étape 4",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 4 pour va-et-vient-domotise",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Va-et-vient — préparation 5",
				"objective": "Objectif étape 5",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 5 pour va-et-vient-domotise",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Va-et-vient — préparation 6",
				"objective": "Objectif étape 6",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 6 pour va-et-vient-domotise",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Va-et-vient — préparation 7",
				"objective": "Objectif étape 7",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 7 pour va-et-vient-domotise",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Va-et-vient — préparation 8",
				"objective": "Objectif étape 8",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 8 pour va-et-vient-domotise",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
			],
		"haIntegrations": [
				"Home Assistant",
				"Shelly",
				"Zigbee Home Automation",
			],
		"safetyNote": "Coupez disjoncteur concerné si travail 230 V ; suivez notice fabricant.",
		}),
	"presence-couloir-wc": defineProject("presence-couloir-wc", {
		"requires230v": true,
		"h1": "Comment éclairer couloir ou WC automatiquement à la présence ?",
		"geoAnswer": "Aqara Motion P2 + micromodule éclairage : mouvement allume, délai sans mouvement éteint. Réglage 30 s à 5 min selon pièce.",
		"expectedOutcomes": [
				"Piloter Présence couloir depuis smartphone",
				"Automatisations locales HA",
				"Historique et graphiques",
				"Notifications ciblées",
			],
		"limits": [
				"Compatibilité matérielle Présence couloir à vérifier",
				"Couverture radio/Wi-Fi",
			],
		"scenarios": [
				{
				"title": "Matin",
				"description": "Scénario Présence couloir lever.",
				},
				{
				"title": "Absence",
				"description": "Alerte Présence couloir.",
				},
				{
				"title": "Manuel",
				"description": "Boutons d’origine Présence couloir.",
				},
			],
		"prerequisites": [
				{
				"label": "Matériel",
				"detail": "Équipement compatible Présence couloir.",
				},
			],
		"incompatibilities": [
				"Versions fermées sans intégration HA pour Présence couloir",
			],
		"prePurchaseChecks": [
				"Checklist pré-achat Présence couloir",
				"Portée réseau",
			],
		"troubleshooting": [
				{
				"symptom": "Présence couloir ne répond plus",
				"causes": [
						"Pile ou alimentation",
						"Hors ligne",
					],
				"checks": [
						"État batterie",
						"Ping IP",
					],
				"solution": "Remplacer piles ou redémarrer module.",
				},
				{
				"symptom": "Notifications absentes",
				"causes": [
						"Automation désactivée",
						"Téléphone DND",
					],
				"checks": [
						"Trace HA",
						"Canal notify",
					],
				"solution": "Tester notify.test ; vérifier app mobile.",
				},
				{
				"symptom": "État incohérent",
				"causes": [
						"Capteur mal fixé",
						"Interférences",
					],
				"checks": [
						"Manual test",
						"RSSI",
					],
				"solution": "Repositionner capteur ou ajouter routeur Zigbee.",
				},
				{
				"symptom": "Doublons d’alertes",
				"causes": [
						"Triggers multiples",
						"Pas de cooldown",
					],
				"checks": [
						"Liste automations",
					],
				"solution": "Ajouter mode single ou délai 120 s.",
				},
			],
		"faq": [
				{
				"question": "Délai extinction recommandé WC ?",
				"answer": "30–90 s ; couloir 2–5 min selon longueur.",
				},
				{
				"question": "Capteur P2 pile ou secteur ?",
				"answer": "P2 sur piles — placez-le à hauteur hanche, pas face fenêtre.",
				},
				{
				"question": "Lumière trop faible la nuit ?",
				"answer": "Scénario luminosité 20 % la nuit via dimmer si disponible.",
				},
				{
				"question": "Faux déclenchements chien ?",
				"answer": "Orientez capteur ou montez seuil temporisation.",
				},
				{
				"question": "Plusieurs zones un capteur ?",
				"answer": "Possible si champ couvre couloir + WC adjacent.",
				},
				{
				"question": "Module sans neutre couloir ?",
				"answer": "Combinez avec projet éclairage sans neutre si besoin.",
				},
			],
		"automations": [
				{
				"title": "Présence couloir — notification",
				"goal": "Informer l’utilisateur",
				"trigger": "state change",
				"devices": "notify.mobile_app",
				},
				{
				"title": "Présence couloir — journal",
				"goal": "Tracer dans le logbook",
				"trigger": "event",
				"devices": "logbook.log",
				},
				{
				"title": "Présence couloir — nuit",
				"goal": "Réduire bruit nocturne",
				"trigger": "time 22:00-07:00",
				"devices": "condition time",
				},
				{
				"title": "Présence couloir — absence",
				"goal": "Activer si personne absente",
				"trigger": "zone not_home",
				"devices": "condition zone",
				},
			],
		"tutorialSteps": [
				{
				"title": "Présence couloir — préparation 1",
				"objective": "Objectif étape 1",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 1 pour presence-couloir-wc",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Présence couloir — préparation 2",
				"objective": "Objectif étape 2",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 2 pour presence-couloir-wc",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Présence couloir — préparation 3",
				"objective": "Objectif étape 3",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 3 pour presence-couloir-wc",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Présence couloir — préparation 4",
				"objective": "Objectif étape 4",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 4 pour presence-couloir-wc",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Présence couloir — préparation 5",
				"objective": "Objectif étape 5",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 5 pour presence-couloir-wc",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Présence couloir — préparation 6",
				"objective": "Objectif étape 6",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 6 pour presence-couloir-wc",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Présence couloir — préparation 7",
				"objective": "Objectif étape 7",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 7 pour presence-couloir-wc",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Présence couloir — préparation 8",
				"objective": "Objectif étape 8",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 8 pour presence-couloir-wc",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
			],
		"haIntegrations": [
				"Home Assistant",
				"Shelly",
				"Zigbee Home Automation",
			],
		"safetyNote": "Coupez disjoncteur concerné si travail 230 V ; suivez notice fabricant.",
		}),
	"dimmer-spots-led": defineProject("dimmer-spots-led", {
		"requires230v": true,
		"h1": "Comment varier des spots LED dimmables depuis Home Assistant ?",
		"geoAnswer": "Shelly Dimmer 2 avec calibration charge pour LEDs dimmables compatibles. Évite scintillement basse luminosité. Neutre requis au Dimmer 2.",
		"expectedOutcomes": [
				"Piloter Dimmer LED depuis smartphone",
				"Automatisations locales HA",
				"Historique et graphiques",
				"Notifications ciblées",
			],
		"limits": [
				"Compatibilité matérielle Dimmer LED à vérifier",
				"Couverture radio/Wi-Fi",
			],
		"scenarios": [
				{
				"title": "Matin",
				"description": "Scénario Dimmer LED lever.",
				},
				{
				"title": "Absence",
				"description": "Alerte Dimmer LED.",
				},
				{
				"title": "Manuel",
				"description": "Boutons d’origine Dimmer LED.",
				},
			],
		"prerequisites": [
				{
				"label": "Matériel",
				"detail": "Équipement compatible Dimmer LED.",
				},
			],
		"incompatibilities": [
				"Versions fermées sans intégration HA pour Dimmer LED",
			],
		"prePurchaseChecks": [
				"Checklist pré-achat Dimmer LED",
				"Portée réseau",
			],
		"troubleshooting": [
				{
				"symptom": "Dimmer LED ne répond plus",
				"causes": [
						"Pile ou alimentation",
						"Hors ligne",
					],
				"checks": [
						"État batterie",
						"Ping IP",
					],
				"solution": "Remplacer piles ou redémarrer module.",
				},
				{
				"symptom": "Notifications absentes",
				"causes": [
						"Automation désactivée",
						"Téléphone DND",
					],
				"checks": [
						"Trace HA",
						"Canal notify",
					],
				"solution": "Tester notify.test ; vérifier app mobile.",
				},
				{
				"symptom": "État incohérent",
				"causes": [
						"Capteur mal fixé",
						"Interférences",
					],
				"checks": [
						"Manual test",
						"RSSI",
					],
				"solution": "Repositionner capteur ou ajouter routeur Zigbee.",
				},
				{
				"symptom": "Doublons d’alertes",
				"causes": [
						"Triggers multiples",
						"Pas de cooldown",
					],
				"checks": [
						"Liste automations",
					],
				"solution": "Ajouter mode single ou délai 120 s.",
				},
			],
		"faq": [
				{
				"question": "Spots non dimmables ?",
				"answer": "Interdit — remplacez par spots « dimmable » explicites.",
				},
				{
				"question": "Scintillement bas niveau ?",
				"answer": "Recalibrez charge Shelly ; augmentez min brightness.",
				},
				{
				"question": "Plus de 150 W LED ?",
				"answer": "Respectez max Dimmer 2 ; divisez circuits si besoin.",
				},
				{
				"question": "Bouton mural fonctionne encore ?",
				"answer": "Oui en mode switch ; double appui parfois requis selon firmware.",
				},
				{
				"question": "Couleur blanc variable ?",
				"answer": "CCT dimmable parfois incompatible — testez une ampoule.",
				},
				{
				"question": "Home Assistant courbe lumière ?",
				"answer": "Utilisez light.turn_on avec brightness_pct progressive.",
				},
			],
		"automations": [
				{
				"title": "Dimmer LED — notification",
				"goal": "Informer l’utilisateur",
				"trigger": "state change",
				"devices": "notify.mobile_app",
				},
				{
				"title": "Dimmer LED — journal",
				"goal": "Tracer dans le logbook",
				"trigger": "event",
				"devices": "logbook.log",
				},
				{
				"title": "Dimmer LED — nuit",
				"goal": "Réduire bruit nocturne",
				"trigger": "time 22:00-07:00",
				"devices": "condition time",
				},
				{
				"title": "Dimmer LED — absence",
				"goal": "Activer si personne absente",
				"trigger": "zone not_home",
				"devices": "condition zone",
				},
			],
		"tutorialSteps": [
				{
				"title": "Dimmer LED — préparation 1",
				"objective": "Objectif étape 1",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 1 pour dimmer-spots-led",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Dimmer LED — préparation 2",
				"objective": "Objectif étape 2",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 2 pour dimmer-spots-led",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Dimmer LED — préparation 3",
				"objective": "Objectif étape 3",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 3 pour dimmer-spots-led",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Dimmer LED — préparation 4",
				"objective": "Objectif étape 4",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 4 pour dimmer-spots-led",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Dimmer LED — préparation 5",
				"objective": "Objectif étape 5",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 5 pour dimmer-spots-led",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Dimmer LED — préparation 6",
				"objective": "Objectif étape 6",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 6 pour dimmer-spots-led",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Dimmer LED — préparation 7",
				"objective": "Objectif étape 7",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 7 pour dimmer-spots-led",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Dimmer LED — préparation 8",
				"objective": "Objectif étape 8",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 8 pour dimmer-spots-led",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
			],
		"haIntegrations": [
				"Home Assistant",
				"Shelly",
				"Zigbee Home Automation",
			],
		"safetyNote": "Coupez disjoncteur concerné si travail 230 V ; suivez notice fabricant.",
		}),
	"radiateurs-robinets": defineProject("radiateurs-robinets", {
		"requires230v": false,
		"h1": "Comment réguler radiateurs eau chaude pièce par pièce ?",
		"geoAnswer": "Têtes Aqara T1 sur vannes M30 plus sonde température pièce. Consigne nocturne −1 °C via automations. Piles AAA à prévoir.",
		"expectedOutcomes": [
				"Piloter Robinets T1 depuis smartphone",
				"Automatisations locales HA",
				"Historique et graphiques",
				"Notifications ciblées",
			],
		"limits": [
				"Compatibilité matérielle Robinets T1 à vérifier",
				"Couverture radio/Wi-Fi",
			],
		"scenarios": [
				{
				"title": "Matin",
				"description": "Scénario Robinets T1 lever.",
				},
				{
				"title": "Absence",
				"description": "Alerte Robinets T1.",
				},
				{
				"title": "Manuel",
				"description": "Boutons d’origine Robinets T1.",
				},
			],
		"prerequisites": [
				{
				"label": "Matériel",
				"detail": "Équipement compatible Robinets T1.",
				},
			],
		"incompatibilities": [
				"Versions fermées sans intégration HA pour Robinets T1",
			],
		"prePurchaseChecks": [
				"Checklist pré-achat Robinets T1",
				"Portée réseau",
			],
		"troubleshooting": [
				{
				"symptom": "Robinets T1 ne répond plus",
				"causes": [
						"Pile ou alimentation",
						"Hors ligne",
					],
				"checks": [
						"État batterie",
						"Ping IP",
					],
				"solution": "Remplacer piles ou redémarrer module.",
				},
				{
				"symptom": "Notifications absentes",
				"causes": [
						"Automation désactivée",
						"Téléphone DND",
					],
				"checks": [
						"Trace HA",
						"Canal notify",
					],
				"solution": "Tester notify.test ; vérifier app mobile.",
				},
				{
				"symptom": "État incohérent",
				"causes": [
						"Capteur mal fixé",
						"Interférences",
					],
				"checks": [
						"Manual test",
						"RSSI",
					],
				"solution": "Repositionner capteur ou ajouter routeur Zigbee.",
				},
				{
				"symptom": "Doublons d’alertes",
				"causes": [
						"Triggers multiples",
						"Pas de cooldown",
					],
				"checks": [
						"Liste automations",
					],
				"solution": "Ajouter mode single ou délai 120 s.",
				},
			],
		"faq": [
				{
				"question": "Vanne M30 non compatible ?",
				"answer": "Adaptateur M30×1,5 ou autre selon marque radiateur.",
				},
				{
				"question": "Sonde pièce obligatoire ?",
				"answer": "Fortement recommandée — sans elle la tête mesure mal près du corps chaud.",
				},
				{
				"question": "Une tête par radiateur même pièce ?",
				"answer": "Une référence température pièce pour plusieurs têtes synchronisées.",
				},
				{
				"question": "Bruit de vissage tête ?",
				"answer": "Réglage hebdomadaire lente — pas un clapet instantané.",
				},
				{
				"question": "Chaudière ancienne ?",
				"answer": "Vérifiez que fermeture têtes n’endommage pas chaudière non modulante.",
				},
				{
				"question": "Piles T1 durée ?",
				"answer": "6–12 mois ; alerte batterie HA évite gel pièce.",
				},
			],
		"automations": [
				{
				"title": "Robinets T1 — notification",
				"goal": "Informer l’utilisateur",
				"trigger": "state change",
				"devices": "notify.mobile_app",
				},
				{
				"title": "Robinets T1 — journal",
				"goal": "Tracer dans le logbook",
				"trigger": "event",
				"devices": "logbook.log",
				},
				{
				"title": "Robinets T1 — nuit",
				"goal": "Réduire bruit nocturne",
				"trigger": "time 22:00-07:00",
				"devices": "condition time",
				},
				{
				"title": "Robinets T1 — absence",
				"goal": "Activer si personne absente",
				"trigger": "zone not_home",
				"devices": "condition zone",
				},
			],
		"tutorialSteps": [
				{
				"title": "Robinets T1 — préparation 1",
				"objective": "Objectif étape 1",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 1 pour radiateurs-robinets",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Robinets T1 — préparation 2",
				"objective": "Objectif étape 2",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 2 pour radiateurs-robinets",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Robinets T1 — préparation 3",
				"objective": "Objectif étape 3",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 3 pour radiateurs-robinets",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Robinets T1 — préparation 4",
				"objective": "Objectif étape 4",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 4 pour radiateurs-robinets",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Robinets T1 — préparation 5",
				"objective": "Objectif étape 5",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 5 pour radiateurs-robinets",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Robinets T1 — préparation 6",
				"objective": "Objectif étape 6",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 6 pour radiateurs-robinets",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Robinets T1 — préparation 7",
				"objective": "Objectif étape 7",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 7 pour radiateurs-robinets",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Robinets T1 — préparation 8",
				"objective": "Objectif étape 8",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 8 pour radiateurs-robinets",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
			],
		"haIntegrations": [
				"Home Assistant",
				"Shelly",
				"Zigbee Home Automation",
			],
		"safetyNote": "Coupez disjoncteur concerné si travail 230 V ; suivez notice fabricant.",
		}),
	"radiateur-fil-pilote-electric": defineProject("radiateur-fil-pilote-electric", {
		"requires230v": true,
		"h1": "Comment piloter un radiateur électrique fil pilote ?",
		"geoAnswer": "Shelly Plus 1 ou module Zigbee fil pilote avec diode si nécessaire sur sortie contact sec. Modes confort/éco/hors gel selon créneaux HC.",
		"expectedOutcomes": [
				"Piloter Fil pilote depuis smartphone",
				"Automatisations locales HA",
				"Historique et graphiques",
				"Notifications ciblées",
			],
		"limits": [
				"Compatibilité matérielle Fil pilote à vérifier",
				"Couverture radio/Wi-Fi",
			],
		"scenarios": [
				{
				"title": "Matin",
				"description": "Scénario Fil pilote lever.",
				},
				{
				"title": "Absence",
				"description": "Alerte Fil pilote.",
				},
				{
				"title": "Manuel",
				"description": "Boutons d’origine Fil pilote.",
				},
			],
		"prerequisites": [
				{
				"label": "Matériel",
				"detail": "Équipement compatible Fil pilote.",
				},
			],
		"incompatibilities": [
				"Versions fermées sans intégration HA pour Fil pilote",
			],
		"prePurchaseChecks": [
				"Checklist pré-achat Fil pilote",
				"Portée réseau",
			],
		"troubleshooting": [
				{
				"symptom": "Fil pilote ne répond plus",
				"causes": [
						"Pile ou alimentation",
						"Hors ligne",
					],
				"checks": [
						"État batterie",
						"Ping IP",
					],
				"solution": "Remplacer piles ou redémarrer module.",
				},
				{
				"symptom": "Notifications absentes",
				"causes": [
						"Automation désactivée",
						"Téléphone DND",
					],
				"checks": [
						"Trace HA",
						"Canal notify",
					],
				"solution": "Tester notify.test ; vérifier app mobile.",
				},
				{
				"symptom": "État incohérent",
				"causes": [
						"Capteur mal fixé",
						"Interférences",
					],
				"checks": [
						"Manual test",
						"RSSI",
					],
				"solution": "Repositionner capteur ou ajouter routeur Zigbee.",
				},
				{
				"symptom": "Doublons d’alertes",
				"causes": [
						"Triggers multiples",
						"Pas de cooldown",
					],
				"checks": [
						"Liste automations",
					],
				"solution": "Ajouter mode single ou délai 120 s.",
				},
			],
		"faq": [
				{
				"question": "Diode sur fil pilote : pourquoi ?",
				"answer": "Certains radiateurs exigent polarisation — schéma Shelly fil pilote.",
				},
				{
				"question": "Modes confort/éco via HA ?",
				"answer": "Automations sur contact sec simulant positions fil pilote.",
				},
				{
				"question": "Linky et HC ?",
				"answer": "Combinez créneaux HC avec consigne éco sur fil pilote.",
				},
				{
				"question": "Puissance radiateur max ?",
				"answer": "Le relais commande signal fil pilote, pas la puissance — vérifiez compatibilité.",
				},
				{
				"question": "Zigbee ou Shelly ?",
				"answer": "Les deux existent ; Shelly Wi-Fi si pas de Zigbee.",
				},
				{
				"question": "Sécurité enfant ?",
				"answer": "Ne pas laisser bornier fil pilote accessible.",
				},
			],
		"automations": [
				{
				"title": "Fil pilote — notification",
				"goal": "Informer l’utilisateur",
				"trigger": "state change",
				"devices": "notify.mobile_app",
				},
				{
				"title": "Fil pilote — journal",
				"goal": "Tracer dans le logbook",
				"trigger": "event",
				"devices": "logbook.log",
				},
				{
				"title": "Fil pilote — nuit",
				"goal": "Réduire bruit nocturne",
				"trigger": "time 22:00-07:00",
				"devices": "condition time",
				},
				{
				"title": "Fil pilote — absence",
				"goal": "Activer si personne absente",
				"trigger": "zone not_home",
				"devices": "condition zone",
				},
			],
		"tutorialSteps": [
				{
				"title": "Fil pilote — préparation 1",
				"objective": "Objectif étape 1",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 1 pour radiateur-fil-pilote-electric",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Fil pilote — préparation 2",
				"objective": "Objectif étape 2",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 2 pour radiateur-fil-pilote-electric",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Fil pilote — préparation 3",
				"objective": "Objectif étape 3",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 3 pour radiateur-fil-pilote-electric",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Fil pilote — préparation 4",
				"objective": "Objectif étape 4",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 4 pour radiateur-fil-pilote-electric",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Fil pilote — préparation 5",
				"objective": "Objectif étape 5",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 5 pour radiateur-fil-pilote-electric",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Fil pilote — préparation 6",
				"objective": "Objectif étape 6",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 6 pour radiateur-fil-pilote-electric",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Fil pilote — préparation 7",
				"objective": "Objectif étape 7",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 7 pour radiateur-fil-pilote-electric",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Fil pilote — préparation 8",
				"objective": "Objectif étape 8",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 8 pour radiateur-fil-pilote-electric",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
			],
		"haIntegrations": [
				"Home Assistant",
				"Shelly",
				"Zigbee Home Automation",
			],
		"safetyNote": "Coupez disjoncteur concerné si travail 230 V ; suivez notice fabricant.",
		}),
	"chaudiere-contact-sec": defineProject("chaudiere-contact-sec", {
		"requires230v": true,
		"h1": "Comment relier une chaudière gaz à un thermostat connecté en contact sec ?",
		"geoAnswer": "Relais sec sur bornes thermostat chaudière plus sonde température pièce. Ne pas couper sécurité chaudière. Planification horaire HA.",
		"expectedOutcomes": [
				"Piloter Chaudière sec depuis smartphone",
				"Automatisations locales HA",
				"Historique et graphiques",
				"Notifications ciblées",
			],
		"limits": [
				"Compatibilité matérielle Chaudière sec à vérifier",
				"Couverture radio/Wi-Fi",
			],
		"scenarios": [
				{
				"title": "Matin",
				"description": "Scénario Chaudière sec lever.",
				},
				{
				"title": "Absence",
				"description": "Alerte Chaudière sec.",
				},
				{
				"title": "Manuel",
				"description": "Boutons d’origine Chaudière sec.",
				},
			],
		"prerequisites": [
				{
				"label": "Matériel",
				"detail": "Équipement compatible Chaudière sec.",
				},
			],
		"incompatibilities": [
				"Versions fermées sans intégration HA pour Chaudière sec",
			],
		"prePurchaseChecks": [
				"Checklist pré-achat Chaudière sec",
				"Portée réseau",
			],
		"troubleshooting": [
				{
				"symptom": "Chaudière sec ne répond plus",
				"causes": [
						"Pile ou alimentation",
						"Hors ligne",
					],
				"checks": [
						"État batterie",
						"Ping IP",
					],
				"solution": "Remplacer piles ou redémarrer module.",
				},
				{
				"symptom": "Notifications absentes",
				"causes": [
						"Automation désactivée",
						"Téléphone DND",
					],
				"checks": [
						"Trace HA",
						"Canal notify",
					],
				"solution": "Tester notify.test ; vérifier app mobile.",
				},
				{
				"symptom": "État incohérent",
				"causes": [
						"Capteur mal fixé",
						"Interférences",
					],
				"checks": [
						"Manual test",
						"RSSI",
					],
				"solution": "Repositionner capteur ou ajouter routeur Zigbee.",
				},
				{
				"symptom": "Doublons d’alertes",
				"causes": [
						"Triggers multiples",
						"Pas de cooldown",
					],
				"checks": [
						"Liste automations",
					],
				"solution": "Ajouter mode single ou délai 120 s.",
				},
			],
		"faq": [
				{
				"question": "Remplace-t-on le thermostat filaire ?",
				"answer": "Le relais sec remplace les contacts thermostat chaudière, pas la sonde si déportée.",
				},
				{
				"question": "Chaudière biomasse ?",
				"answer": "Vérifiez entrée contact compatible ; délai minimum marche/arrêt.",
				},
				{
				"question": "Plancher chauffant ?",
				"answer": "Sonde dédiée plus lente — PID ou consigne modérée.",
				},
				{
				"question": "Coupure été ?",
				"answer": "Automation mode été coupe appels chaudière.",
				},
				{
				"question": "Sécurité chaudière intégrée ?",
				"answer": "Ne shuntez jamais pressostat ou sécurité flux.",
				},
				{
				"question": "OpenTherm ?",
				"answer": "Projet différent — ici contact sec ON/OFF classique.",
				},
			],
		"automations": [
				{
				"title": "Chaudière sec — notification",
				"goal": "Informer l’utilisateur",
				"trigger": "state change",
				"devices": "notify.mobile_app",
				},
				{
				"title": "Chaudière sec — journal",
				"goal": "Tracer dans le logbook",
				"trigger": "event",
				"devices": "logbook.log",
				},
				{
				"title": "Chaudière sec — nuit",
				"goal": "Réduire bruit nocturne",
				"trigger": "time 22:00-07:00",
				"devices": "condition time",
				},
				{
				"title": "Chaudière sec — absence",
				"goal": "Activer si personne absente",
				"trigger": "zone not_home",
				"devices": "condition zone",
				},
			],
		"tutorialSteps": [
				{
				"title": "Chaudière sec — préparation 1",
				"objective": "Objectif étape 1",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 1 pour chaudiere-contact-sec",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Chaudière sec — préparation 2",
				"objective": "Objectif étape 2",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 2 pour chaudiere-contact-sec",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Chaudière sec — préparation 3",
				"objective": "Objectif étape 3",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 3 pour chaudiere-contact-sec",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Chaudière sec — préparation 4",
				"objective": "Objectif étape 4",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 4 pour chaudiere-contact-sec",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Chaudière sec — préparation 5",
				"objective": "Objectif étape 5",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 5 pour chaudiere-contact-sec",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Chaudière sec — préparation 6",
				"objective": "Objectif étape 6",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 6 pour chaudiere-contact-sec",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Chaudière sec — préparation 7",
				"objective": "Objectif étape 7",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 7 pour chaudiere-contact-sec",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Chaudière sec — préparation 8",
				"objective": "Objectif étape 8",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 8 pour chaudiere-contact-sec",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
			],
		"haIntegrations": [
				"Home Assistant",
				"Shelly",
				"Zigbee Home Automation",
			],
		"safetyNote": "Coupez disjoncteur concerné si travail 230 V ; suivez notice fabricant.",
		}),
	"chauffe-eau-heures-creuses": defineProject("chauffe-eau-heures-creuses", {
		"requires230v": true,
		"h1": "Comment optimiser un chauffe-eau sur heures creuses ou surplus solaire ?",
		"geoAnswer": "Contact sec ou relais sur commande HC plus capteur conso ou production PV. Home Assistant décale cycle selon tarif ou surplus.",
		"expectedOutcomes": [
				"Piloter Chauffe-eau depuis smartphone",
				"Automatisations locales HA",
				"Historique et graphiques",
				"Notifications ciblées",
			],
		"limits": [
				"Compatibilité matérielle Chauffe-eau à vérifier",
				"Couverture radio/Wi-Fi",
			],
		"scenarios": [
				{
				"title": "Matin",
				"description": "Scénario Chauffe-eau lever.",
				},
				{
				"title": "Absence",
				"description": "Alerte Chauffe-eau.",
				},
				{
				"title": "Manuel",
				"description": "Boutons d’origine Chauffe-eau.",
				},
			],
		"prerequisites": [
				{
				"label": "Matériel",
				"detail": "Équipement compatible Chauffe-eau.",
				},
			],
		"incompatibilities": [
				"Versions fermées sans intégration HA pour Chauffe-eau",
			],
		"prePurchaseChecks": [
				"Checklist pré-achat Chauffe-eau",
				"Portée réseau",
			],
		"troubleshooting": [
				{
				"symptom": "Chauffe-eau ne répond plus",
				"causes": [
						"Pile ou alimentation",
						"Hors ligne",
					],
				"checks": [
						"État batterie",
						"Ping IP",
					],
				"solution": "Remplacer piles ou redémarrer module.",
				},
				{
				"symptom": "Notifications absentes",
				"causes": [
						"Automation désactivée",
						"Téléphone DND",
					],
				"checks": [
						"Trace HA",
						"Canal notify",
					],
				"solution": "Tester notify.test ; vérifier app mobile.",
				},
				{
				"symptom": "État incohérent",
				"causes": [
						"Capteur mal fixé",
						"Interférences",
					],
				"checks": [
						"Manual test",
						"RSSI",
					],
				"solution": "Repositionner capteur ou ajouter routeur Zigbee.",
				},
				{
				"symptom": "Doublons d’alertes",
				"causes": [
						"Triggers multiples",
						"Pas de cooldown",
					],
				"checks": [
						"Liste automations",
					],
				"solution": "Ajouter mode single ou délai 120 s.",
				},
			],
		"faq": [
				{
				"question": "Contact sec sur cumulus ?",
				"answer": "Sur entrée programmateur ou contact HC selon schéma électrique.",
				},
				{
				"question": "Surplus solaire ?",
				"answer": "Automation si export > X W pendant Y min alors relance chauffe.",
				},
				{
				"question": "Désinfection légionelle ?",
				"answer": "Programmez montée température hebdo même avec HC.",
				},
				{
				"question": "Cumulus timer mécanique ?",
				"answer": "Peut rester en parallèle ou être remplacé par HA.",
				},
				{
				"question": "Sonde température ballon ?",
				"answer": "Optionnelle pour graphe ; pas toujours facile sans sonde résistance.",
				},
				{
				"question": "Coupe si fuite détectée ?",
				"answer": "Combinez vanne motorisée si projet plomberie séparé.",
				},
			],
		"automations": [
				{
				"title": "Chauffe-eau — notification",
				"goal": "Informer l’utilisateur",
				"trigger": "state change",
				"devices": "notify.mobile_app",
				},
				{
				"title": "Chauffe-eau — journal",
				"goal": "Tracer dans le logbook",
				"trigger": "event",
				"devices": "logbook.log",
				},
				{
				"title": "Chauffe-eau — nuit",
				"goal": "Réduire bruit nocturne",
				"trigger": "time 22:00-07:00",
				"devices": "condition time",
				},
				{
				"title": "Chauffe-eau — absence",
				"goal": "Activer si personne absente",
				"trigger": "zone not_home",
				"devices": "condition zone",
				},
			],
		"tutorialSteps": [
				{
				"title": "Chauffe-eau — préparation 1",
				"objective": "Objectif étape 1",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 1 pour chauffe-eau-heures-creuses",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Chauffe-eau — préparation 2",
				"objective": "Objectif étape 2",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 2 pour chauffe-eau-heures-creuses",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Chauffe-eau — préparation 3",
				"objective": "Objectif étape 3",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 3 pour chauffe-eau-heures-creuses",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Chauffe-eau — préparation 4",
				"objective": "Objectif étape 4",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 4 pour chauffe-eau-heures-creuses",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Chauffe-eau — préparation 5",
				"objective": "Objectif étape 5",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 5 pour chauffe-eau-heures-creuses",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Chauffe-eau — préparation 6",
				"objective": "Objectif étape 6",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 6 pour chauffe-eau-heures-creuses",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Chauffe-eau — préparation 7",
				"objective": "Objectif étape 7",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 7 pour chauffe-eau-heures-creuses",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Chauffe-eau — préparation 8",
				"objective": "Objectif étape 8",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 8 pour chauffe-eau-heures-creuses",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
			],
		"haIntegrations": [
				"Home Assistant",
				"Shelly",
				"Zigbee Home Automation",
			],
		"safetyNote": "Coupez disjoncteur concerné si travail 230 V ; suivez notice fabricant.",
		}),
	"vmc-humidite-sdb": defineProject("vmc-humidite-sdb", {
		"requires230v": true,
		"h1": "Comment commander une VMC selon humidité salle de bain ?",
		"geoAnswer": "Relais sur VMC plus sonde hygro SONOFF ou Aqara. Seuil hygro déclenche vitesse 2. Respect câblage permanent VMC.",
		"expectedOutcomes": [
				"Piloter VMC hygro depuis smartphone",
				"Automatisations locales HA",
				"Historique et graphiques",
				"Notifications ciblées",
			],
		"limits": [
				"Compatibilité matérielle VMC hygro à vérifier",
				"Couverture radio/Wi-Fi",
			],
		"scenarios": [
				{
				"title": "Matin",
				"description": "Scénario VMC hygro lever.",
				},
				{
				"title": "Absence",
				"description": "Alerte VMC hygro.",
				},
				{
				"title": "Manuel",
				"description": "Boutons d’origine VMC hygro.",
				},
			],
		"prerequisites": [
				{
				"label": "Matériel",
				"detail": "Équipement compatible VMC hygro.",
				},
			],
		"incompatibilities": [
				"Versions fermées sans intégration HA pour VMC hygro",
			],
		"prePurchaseChecks": [
				"Checklist pré-achat VMC hygro",
				"Portée réseau",
			],
		"troubleshooting": [
				{
				"symptom": "VMC hygro ne répond plus",
				"causes": [
						"Pile ou alimentation",
						"Hors ligne",
					],
				"checks": [
						"État batterie",
						"Ping IP",
					],
				"solution": "Remplacer piles ou redémarrer module.",
				},
				{
				"symptom": "Notifications absentes",
				"causes": [
						"Automation désactivée",
						"Téléphone DND",
					],
				"checks": [
						"Trace HA",
						"Canal notify",
					],
				"solution": "Tester notify.test ; vérifier app mobile.",
				},
				{
				"symptom": "État incohérent",
				"causes": [
						"Capteur mal fixé",
						"Interférences",
					],
				"checks": [
						"Manual test",
						"RSSI",
					],
				"solution": "Repositionner capteur ou ajouter routeur Zigbee.",
				},
				{
				"symptom": "Doublons d’alertes",
				"causes": [
						"Triggers multiples",
						"Pas de cooldown",
					],
				"checks": [
						"Liste automations",
					],
				"solution": "Ajouter mode single ou délai 120 s.",
				},
			],
		"faq": [
				{
				"question": "Modifier câblage VMC SF ?",
				"answer": "Respectez tableau VMC ; relais sur commande permanent/impulsion selon modèle.",
				},
				{
				"question": "Seuil hygro conseillé ?",
				"answer": "65–75 % relatif en SdB après douche.",
				},
				{
				"question": "VMC bruyante vitesse 2 ?",
				"answer": "Programmez retour vitesse 1 après 20 min sous seuil.",
				},
				{
				"question": "Fenêtre ouverte ?",
				"answer": "Désactivez boost VMC si capteur fenêtre ouvert.",
				},
				{
				"question": "Plusieurs SdB ?",
				"answer": "Une sonde principale ou une par pièce selon gaines.",
				},
				{
				"question": "Obligation RT2012 ?",
				"answer": "Automatisation ne remplace pas entretien bouches.",
				},
			],
		"automations": [
				{
				"title": "VMC hygro — notification",
				"goal": "Informer l’utilisateur",
				"trigger": "state change",
				"devices": "notify.mobile_app",
				},
				{
				"title": "VMC hygro — journal",
				"goal": "Tracer dans le logbook",
				"trigger": "event",
				"devices": "logbook.log",
				},
				{
				"title": "VMC hygro — nuit",
				"goal": "Réduire bruit nocturne",
				"trigger": "time 22:00-07:00",
				"devices": "condition time",
				},
				{
				"title": "VMC hygro — absence",
				"goal": "Activer si personne absente",
				"trigger": "zone not_home",
				"devices": "condition zone",
				},
			],
		"tutorialSteps": [
				{
				"title": "VMC hygro — préparation 1",
				"objective": "Objectif étape 1",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 1 pour vmc-humidite-sdb",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "VMC hygro — préparation 2",
				"objective": "Objectif étape 2",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 2 pour vmc-humidite-sdb",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "VMC hygro — préparation 3",
				"objective": "Objectif étape 3",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 3 pour vmc-humidite-sdb",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "VMC hygro — préparation 4",
				"objective": "Objectif étape 4",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 4 pour vmc-humidite-sdb",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "VMC hygro — préparation 5",
				"objective": "Objectif étape 5",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 5 pour vmc-humidite-sdb",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "VMC hygro — préparation 6",
				"objective": "Objectif étape 6",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 6 pour vmc-humidite-sdb",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "VMC hygro — préparation 7",
				"objective": "Objectif étape 7",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 7 pour vmc-humidite-sdb",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "VMC hygro — préparation 8",
				"objective": "Objectif étape 8",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 8 pour vmc-humidite-sdb",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
			],
		"haIntegrations": [
				"Home Assistant",
				"Shelly",
				"Zigbee Home Automation",
			],
		"safetyNote": "Coupez disjoncteur concerné si travail 230 V ; suivez notice fabricant.",
		}),
	"conso-tableau-solaire": defineProject("conso-tableau-solaire", {
		"requires230v": true,
		"h1": "Comment suivre consommation tableau et production solaire ?",
		"geoAnswer": "Shelly Pro 3EM en tête de tableau avec pinces ampèremétriques. Dashboard HA kW instantané et kWh jour. Travail tableau sous disjoncteur général.",
		"expectedOutcomes": [
				"Piloter Conso tableau depuis smartphone",
				"Automatisations locales HA",
				"Historique et graphiques",
				"Notifications ciblées",
			],
		"limits": [
				"Compatibilité matérielle Conso tableau à vérifier",
				"Couverture radio/Wi-Fi",
			],
		"scenarios": [
				{
				"title": "Matin",
				"description": "Scénario Conso tableau lever.",
				},
				{
				"title": "Absence",
				"description": "Alerte Conso tableau.",
				},
				{
				"title": "Manuel",
				"description": "Boutons d’origine Conso tableau.",
				},
			],
		"prerequisites": [
				{
				"label": "Matériel",
				"detail": "Équipement compatible Conso tableau.",
				},
			],
		"incompatibilities": [
				"Versions fermées sans intégration HA pour Conso tableau",
			],
		"prePurchaseChecks": [
				"Checklist pré-achat Conso tableau",
				"Portée réseau",
			],
		"troubleshooting": [
				{
				"symptom": "Conso tableau ne répond plus",
				"causes": [
						"Pile ou alimentation",
						"Hors ligne",
					],
				"checks": [
						"État batterie",
						"Ping IP",
					],
				"solution": "Remplacer piles ou redémarrer module.",
				},
				{
				"symptom": "Notifications absentes",
				"causes": [
						"Automation désactivée",
						"Téléphone DND",
					],
				"checks": [
						"Trace HA",
						"Canal notify",
					],
				"solution": "Tester notify.test ; vérifier app mobile.",
				},
				{
				"symptom": "État incohérent",
				"causes": [
						"Capteur mal fixé",
						"Interférences",
					],
				"checks": [
						"Manual test",
						"RSSI",
					],
				"solution": "Repositionner capteur ou ajouter routeur Zigbee.",
				},
				{
				"symptom": "Doublons d’alertes",
				"causes": [
						"Triggers multiples",
						"Pas de cooldown",
					],
				"checks": [
						"Liste automations",
					],
				"solution": "Ajouter mode single ou délai 120 s.",
				},
			],
		"faq": [
				{
				"question": "Shelly Pro 3EM sur triphasé ?",
				"answer": "Oui avec pinces CT adaptées ; paramétrez type réseau.",
				},
				{
				"question": "Production PV séparée ?",
				"answer": "Pinces sur sortie onduleur ou compteur production selon schéma.",
				},
				{
				"question": "Précision mesure ?",
				"answer": "Calibrage CT dans Shelly ; pas substitut compteur Enedis.",
				},
				{
				"question": "Sous-disjoncteur obligatoire ?",
				"answer": "Respect norme ; travail tableau par personne compétente.",
				},
				{
				"question": "Dashboard Energy HA ?",
				"answer": "Intégration Shelly alimente energy dashboard après config entités.",
				},
				{
				"question": "Alerte soutirage fort ?",
				"answer": "Automation si puissance > seuil kW pendant 5 min.",
				},
			],
		"automations": [
				{
				"title": "Conso tableau — notification",
				"goal": "Informer l’utilisateur",
				"trigger": "state change",
				"devices": "notify.mobile_app",
				},
				{
				"title": "Conso tableau — journal",
				"goal": "Tracer dans le logbook",
				"trigger": "event",
				"devices": "logbook.log",
				},
				{
				"title": "Conso tableau — nuit",
				"goal": "Réduire bruit nocturne",
				"trigger": "time 22:00-07:00",
				"devices": "condition time",
				},
				{
				"title": "Conso tableau — absence",
				"goal": "Activer si personne absente",
				"trigger": "zone not_home",
				"devices": "condition zone",
				},
			],
		"tutorialSteps": [
				{
				"title": "Conso tableau — préparation 1",
				"objective": "Objectif étape 1",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 1 pour conso-tableau-solaire",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Conso tableau — préparation 2",
				"objective": "Objectif étape 2",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 2 pour conso-tableau-solaire",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Conso tableau — préparation 3",
				"objective": "Objectif étape 3",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 3 pour conso-tableau-solaire",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Conso tableau — préparation 4",
				"objective": "Objectif étape 4",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 4 pour conso-tableau-solaire",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Conso tableau — préparation 5",
				"objective": "Objectif étape 5",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 5 pour conso-tableau-solaire",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Conso tableau — préparation 6",
				"objective": "Objectif étape 6",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 6 pour conso-tableau-solaire",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Conso tableau — préparation 7",
				"objective": "Objectif étape 7",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 7 pour conso-tableau-solaire",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Conso tableau — préparation 8",
				"objective": "Objectif étape 8",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 8 pour conso-tableau-solaire",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
			],
		"haIntegrations": [
				"Home Assistant",
				"Shelly",
				"Zigbee Home Automation",
			],
		"safetyNote": "Coupez disjoncteur concerné si travail 230 V ; suivez notice fabricant.",
		}),
	"alerte-lave-linge": defineProject("alerte-lave-linge", {
		"requires230v": false,
		"h1": "Comment être prévenu quand le lave-linge a terminé ?",
		"geoAnswer": "Prise Shelly Plug S ou Tapo P110 mesure puissance : sous 3 W pendant 2 min déclenche notification fin de cycle.",
		"expectedOutcomes": [
				"Piloter Lave-linge depuis smartphone",
				"Automatisations locales HA",
				"Historique et graphiques",
				"Notifications ciblées",
			],
		"limits": [
				"Compatibilité matérielle Lave-linge à vérifier",
				"Couverture radio/Wi-Fi",
			],
		"scenarios": [
				{
				"title": "Matin",
				"description": "Scénario Lave-linge lever.",
				},
				{
				"title": "Absence",
				"description": "Alerte Lave-linge.",
				},
				{
				"title": "Manuel",
				"description": "Boutons d’origine Lave-linge.",
				},
			],
		"prerequisites": [
				{
				"label": "Matériel",
				"detail": "Équipement compatible Lave-linge.",
				},
			],
		"incompatibilities": [
				"Versions fermées sans intégration HA pour Lave-linge",
			],
		"prePurchaseChecks": [
				"Checklist pré-achat Lave-linge",
				"Portée réseau",
			],
		"troubleshooting": [
				{
				"symptom": "Lave-linge ne répond plus",
				"causes": [
						"Pile ou alimentation",
						"Hors ligne",
					],
				"checks": [
						"État batterie",
						"Ping IP",
					],
				"solution": "Remplacer piles ou redémarrer module.",
				},
				{
				"symptom": "Notifications absentes",
				"causes": [
						"Automation désactivée",
						"Téléphone DND",
					],
				"checks": [
						"Trace HA",
						"Canal notify",
					],
				"solution": "Tester notify.test ; vérifier app mobile.",
				},
				{
				"symptom": "État incohérent",
				"causes": [
						"Capteur mal fixé",
						"Interférences",
					],
				"checks": [
						"Manual test",
						"RSSI",
					],
				"solution": "Repositionner capteur ou ajouter routeur Zigbee.",
				},
				{
				"symptom": "Doublons d’alertes",
				"causes": [
						"Triggers multiples",
						"Pas de cooldown",
					],
				"checks": [
						"Liste automations",
					],
				"solution": "Ajouter mode single ou délai 120 s.",
				},
			],
		"faq": [
				{
				"question": "Seuil 3 W universel ?",
				"answer": "Ajustez après un cycle test ; essorage peut descendre puis remonter.",
				},
				{
				"question": "Lave-linge avec eco off ?",
				"answer": "Fin de cycle parfois 8–15 W veille — augmentez délai OFF.",
				},
				{
				"question": "Prise mesure seule suffit ?",
				"answer": "Oui ; pas besoin de modifier l’appareil.",
				},
				{
				"question": "Tapo ou Shelly ?",
				"answer": "Les deux mesurent ; Shelly intégration locale simple.",
				},
				{
				"question": "Faux positif pause cycle ?",
				"answer": "Allongez durée sous seuil à 3–5 min.",
				},
				{
				"question": "Notifier plusieurs phones ?",
				"answer": "Groupe notify ou plusieurs services mobile_app.",
				},
			],
		"automations": [
				{
				"title": "Lave-linge — notification",
				"goal": "Informer l’utilisateur",
				"trigger": "state change",
				"devices": "notify.mobile_app",
				},
				{
				"title": "Lave-linge — journal",
				"goal": "Tracer dans le logbook",
				"trigger": "event",
				"devices": "logbook.log",
				},
				{
				"title": "Lave-linge — nuit",
				"goal": "Réduire bruit nocturne",
				"trigger": "time 22:00-07:00",
				"devices": "condition time",
				},
				{
				"title": "Lave-linge — absence",
				"goal": "Activer si personne absente",
				"trigger": "zone not_home",
				"devices": "condition zone",
				},
			],
		"tutorialSteps": [
				{
				"title": "Lave-linge — préparation 1",
				"objective": "Objectif étape 1",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 1 pour alerte-lave-linge",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Lave-linge — préparation 2",
				"objective": "Objectif étape 2",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 2 pour alerte-lave-linge",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Lave-linge — préparation 3",
				"objective": "Objectif étape 3",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 3 pour alerte-lave-linge",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Lave-linge — préparation 4",
				"objective": "Objectif étape 4",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 4 pour alerte-lave-linge",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Lave-linge — préparation 5",
				"objective": "Objectif étape 5",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 5 pour alerte-lave-linge",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Lave-linge — préparation 6",
				"objective": "Objectif étape 6",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 6 pour alerte-lave-linge",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Lave-linge — préparation 7",
				"objective": "Objectif étape 7",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 7 pour alerte-lave-linge",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Lave-linge — préparation 8",
				"objective": "Objectif étape 8",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 8 pour alerte-lave-linge",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
			],
		"haIntegrations": [
				"Home Assistant",
				"Shelly",
				"Zigbee Home Automation",
			],
		"safetyNote": "Coupez disjoncteur concerné si travail 230 V ; suivez notice fabricant.",
		}),
	"coupure-veilles": defineProject("coupure-veilles", {
		"requires230v": false,
		"h1": "Comment couper veilles TV et bureau la nuit automatiquement ?",
		"geoAnswer": "Prises connectées sur TV/box/console avec coupure 23h–7h ou mode absence. Ne pas couper frigo ni alarme.",
		"expectedOutcomes": [
				"Piloter Veilles depuis smartphone",
				"Automatisations locales HA",
				"Historique et graphiques",
				"Notifications ciblées",
			],
		"limits": [
				"Compatibilité matérielle Veilles à vérifier",
				"Couverture radio/Wi-Fi",
			],
		"scenarios": [
				{
				"title": "Matin",
				"description": "Scénario Veilles lever.",
				},
				{
				"title": "Absence",
				"description": "Alerte Veilles.",
				},
				{
				"title": "Manuel",
				"description": "Boutons d’origine Veilles.",
				},
			],
		"prerequisites": [
				{
				"label": "Matériel",
				"detail": "Équipement compatible Veilles.",
				},
			],
		"incompatibilities": [
				"Versions fermées sans intégration HA pour Veilles",
			],
		"prePurchaseChecks": [
				"Checklist pré-achat Veilles",
				"Portée réseau",
			],
		"troubleshooting": [
				{
				"symptom": "Veilles ne répond plus",
				"causes": [
						"Pile ou alimentation",
						"Hors ligne",
					],
				"checks": [
						"État batterie",
						"Ping IP",
					],
				"solution": "Remplacer piles ou redémarrer module.",
				},
				{
				"symptom": "Notifications absentes",
				"causes": [
						"Automation désactivée",
						"Téléphone DND",
					],
				"checks": [
						"Trace HA",
						"Canal notify",
					],
				"solution": "Tester notify.test ; vérifier app mobile.",
				},
				{
				"symptom": "État incohérent",
				"causes": [
						"Capteur mal fixé",
						"Interférences",
					],
				"checks": [
						"Manual test",
						"RSSI",
					],
				"solution": "Repositionner capteur ou ajouter routeur Zigbee.",
				},
				{
				"symptom": "Doublons d’alertes",
				"causes": [
						"Triggers multiples",
						"Pas de cooldown",
					],
				"checks": [
						"Liste automations",
					],
				"solution": "Ajouter mode single ou délai 120 s.",
				},
			],
		"faq": [
				{
				"question": "Couper la box Internet ?",
				"answer": "Déconseillé la nuit si vous voulez HA en ligne — excluez box domotique.",
				},
				{
				"question": "TV OLED : coupures répétées ?",
				"answer": "Vérifiez usure ; certaines veilles réseau utiles pour MAJ.",
				},
				{
				"question": "Console en mise à jour ?",
				"answer": "Condition puissance > 20 W avant coupure forcée.",
				},
				{
				"question": "Lot Tapo P110 ?",
				"answer": "Économique pour 4 postes ; une automation groupe.",
				},
				{
				"question": "Réveil télécommande ?",
				"answer": "Allumage matin via automation avant usage.",
				},
				{
				"question": "Enfants contournent prise ?",
				"answer": "Prise inaccessible ou mot de passe parental TV.",
				},
			],
		"automations": [
				{
				"title": "Veilles — notification",
				"goal": "Informer l’utilisateur",
				"trigger": "state change",
				"devices": "notify.mobile_app",
				},
				{
				"title": "Veilles — journal",
				"goal": "Tracer dans le logbook",
				"trigger": "event",
				"devices": "logbook.log",
				},
				{
				"title": "Veilles — nuit",
				"goal": "Réduire bruit nocturne",
				"trigger": "time 22:00-07:00",
				"devices": "condition time",
				},
				{
				"title": "Veilles — absence",
				"goal": "Activer si personne absente",
				"trigger": "zone not_home",
				"devices": "condition zone",
				},
			],
		"tutorialSteps": [
				{
				"title": "Veilles — préparation 1",
				"objective": "Objectif étape 1",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 1 pour coupure-veilles",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Veilles — préparation 2",
				"objective": "Objectif étape 2",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 2 pour coupure-veilles",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Veilles — préparation 3",
				"objective": "Objectif étape 3",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 3 pour coupure-veilles",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Veilles — préparation 4",
				"objective": "Objectif étape 4",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 4 pour coupure-veilles",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Veilles — préparation 5",
				"objective": "Objectif étape 5",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 5 pour coupure-veilles",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Veilles — préparation 6",
				"objective": "Objectif étape 6",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 6 pour coupure-veilles",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Veilles — préparation 7",
				"objective": "Objectif étape 7",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 7 pour coupure-veilles",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Veilles — préparation 8",
				"objective": "Objectif étape 8",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 8 pour coupure-veilles",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
			],
		"haIntegrations": [
				"Home Assistant",
				"Shelly",
				"Zigbee Home Automation",
			],
		"safetyNote": "Coupez disjoncteur concerné si travail 230 V ; suivez notice fabricant.",
		}),
	"secours-ups-box": defineProject("secours-ups-box", {
		"requires230v": false,
		"h1": "Comment tenir box Internet et Home Assistant pendant une coupure ?",
		"geoAnswer": "Station ALLPOWERS ou onduleur NUT USB alimente box fibre, switch et serveur HA. Test coupure 30 min.",
		"expectedOutcomes": [
				"Piloter UPS box depuis smartphone",
				"Automatisations locales HA",
				"Historique et graphiques",
				"Notifications ciblées",
			],
		"limits": [
				"Compatibilité matérielle UPS box à vérifier",
				"Couverture radio/Wi-Fi",
			],
		"scenarios": [
				{
				"title": "Matin",
				"description": "Scénario UPS box lever.",
				},
				{
				"title": "Absence",
				"description": "Alerte UPS box.",
				},
				{
				"title": "Manuel",
				"description": "Boutons d’origine UPS box.",
				},
			],
		"prerequisites": [
				{
				"label": "Matériel",
				"detail": "Équipement compatible UPS box.",
				},
			],
		"incompatibilities": [
				"Versions fermées sans intégration HA pour UPS box",
			],
		"prePurchaseChecks": [
				"Checklist pré-achat UPS box",
				"Portée réseau",
			],
		"troubleshooting": [
				{
				"symptom": "UPS box ne répond plus",
				"causes": [
						"Pile ou alimentation",
						"Hors ligne",
					],
				"checks": [
						"État batterie",
						"Ping IP",
					],
				"solution": "Remplacer piles ou redémarrer module.",
				},
				{
				"symptom": "Notifications absentes",
				"causes": [
						"Automation désactivée",
						"Téléphone DND",
					],
				"checks": [
						"Trace HA",
						"Canal notify",
					],
				"solution": "Tester notify.test ; vérifier app mobile.",
				},
				{
				"symptom": "État incohérent",
				"causes": [
						"Capteur mal fixé",
						"Interférences",
					],
				"checks": [
						"Manual test",
						"RSSI",
					],
				"solution": "Repositionner capteur ou ajouter routeur Zigbee.",
				},
				{
				"symptom": "Doublons d’alertes",
				"causes": [
						"Triggers multiples",
						"Pas de cooldown",
					],
				"checks": [
						"Liste automations",
					],
				"solution": "Ajouter mode single ou délai 120 s.",
				},
			],
		"faq": [
				{
				"question": "Quelle autonomie viser ?",
				"answer": "15–30 min pour box + switch + Green suffisent à la plupart des coupures.",
				},
				{
				"question": "NUT sur Green ?",
				"answer": "Add-on NUT si onduleur USB compatible liste Home Assistant.",
				},
				{
				"question": "Station ALLPOWERS sans USB ?",
				"answer": "Pas de stats NUT ; bascule simple sans graceful shutdown.",
				},
				{
				"question": "Éteindre HA proprement ?",
				"answer": "Automation on_battery → shutdown après X min si batterie faible.",
				},
				{
				"question": "PoE caméras aussi ?",
				"answer": "UPS séparé ou switch PoE alimenté par UPS.",
				},
				{
				"question": "Test régulier ?",
				"answer": "Simulez coupure trimestrielle et notez autonomie réelle.",
				},
			],
		"automations": [
				{
				"title": "UPS box — notification",
				"goal": "Informer l’utilisateur",
				"trigger": "state change",
				"devices": "notify.mobile_app",
				},
				{
				"title": "UPS box — journal",
				"goal": "Tracer dans le logbook",
				"trigger": "event",
				"devices": "logbook.log",
				},
				{
				"title": "UPS box — nuit",
				"goal": "Réduire bruit nocturne",
				"trigger": "time 22:00-07:00",
				"devices": "condition time",
				},
				{
				"title": "UPS box — absence",
				"goal": "Activer si personne absente",
				"trigger": "zone not_home",
				"devices": "condition zone",
				},
			],
		"tutorialSteps": [
				{
				"title": "UPS box — préparation 1",
				"objective": "Objectif étape 1",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 1 pour secours-ups-box",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "UPS box — préparation 2",
				"objective": "Objectif étape 2",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 2 pour secours-ups-box",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "UPS box — préparation 3",
				"objective": "Objectif étape 3",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 3 pour secours-ups-box",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "UPS box — préparation 4",
				"objective": "Objectif étape 4",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 4 pour secours-ups-box",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "UPS box — préparation 5",
				"objective": "Objectif étape 5",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 5 pour secours-ups-box",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "UPS box — préparation 6",
				"objective": "Objectif étape 6",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 6 pour secours-ups-box",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "UPS box — préparation 7",
				"objective": "Objectif étape 7",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 7 pour secours-ups-box",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "UPS box — préparation 8",
				"objective": "Objectif étape 8",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 8 pour secours-ups-box",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
			],
		"haIntegrations": [
				"Home Assistant",
				"Shelly",
				"Zigbee Home Automation",
			],
		"safetyNote": "Coupez disjoncteur concerné si travail 230 V ; suivez notice fabricant.",
		}),
	"alerte-congelateur-cave": defineProject("alerte-congelateur-cave", {
		"requires230v": false,
		"h1": "Comment être alerté si congélateur ou cave chauffe anormalement ?",
		"geoAnswer": "Sonde SONOFF SNZB-02D Zigbee seuil température/hygro. Notification avant décongélation produits.",
		"expectedOutcomes": [
				"Piloter Congélateur depuis smartphone",
				"Automatisations locales HA",
				"Historique et graphiques",
				"Notifications ciblées",
			],
		"limits": [
				"Compatibilité matérielle Congélateur à vérifier",
				"Couverture radio/Wi-Fi",
			],
		"scenarios": [
				{
				"title": "Matin",
				"description": "Scénario Congélateur lever.",
				},
				{
				"title": "Absence",
				"description": "Alerte Congélateur.",
				},
				{
				"title": "Manuel",
				"description": "Boutons d’origine Congélateur.",
				},
			],
		"prerequisites": [
				{
				"label": "Matériel",
				"detail": "Équipement compatible Congélateur.",
				},
			],
		"incompatibilities": [
				"Versions fermées sans intégration HA pour Congélateur",
			],
		"prePurchaseChecks": [
				"Checklist pré-achat Congélateur",
				"Portée réseau",
			],
		"troubleshooting": [
				{
				"symptom": "Congélateur ne répond plus",
				"causes": [
						"Pile ou alimentation",
						"Hors ligne",
					],
				"checks": [
						"État batterie",
						"Ping IP",
					],
				"solution": "Remplacer piles ou redémarrer module.",
				},
				{
				"symptom": "Notifications absentes",
				"causes": [
						"Automation désactivée",
						"Téléphone DND",
					],
				"checks": [
						"Trace HA",
						"Canal notify",
					],
				"solution": "Tester notify.test ; vérifier app mobile.",
				},
				{
				"symptom": "État incohérent",
				"causes": [
						"Capteur mal fixé",
						"Interférences",
					],
				"checks": [
						"Manual test",
						"RSSI",
					],
				"solution": "Repositionner capteur ou ajouter routeur Zigbee.",
				},
				{
				"symptom": "Doublons d’alertes",
				"causes": [
						"Triggers multiples",
						"Pas de cooldown",
					],
				"checks": [
						"Liste automations",
					],
				"solution": "Ajouter mode single ou délai 120 s.",
				},
			],
		"faq": [
				{
				"question": "Sonde dans congélateur ?",
				"answer": "Capteur à l’air libre dans compartiment, pas collé paroi.",
				},
				{
				"question": "Portée Zigbee congélateur ?",
				"answer": "Testez avant fixation ; répéteur proche cuisine.",
				},
				{
				"question": "Seuil alerte ?",
				"answer": "−15 °C congélo ou +12 °C cave vin selon usage.",
				},
				{
				"question": "Faux alerte ouverture porte ?",
				"answer": "Capteur porte combiné si ouverture prolongée.",
				},
				{
				"question": "Batterie faible hiver ?",
				"answer": "Alerte batterie HA prioritaire haute.",
				},
				{
				"question": "Cave humide ?",
				"answer": "SNZB-02D hygro + ventilation manuelle conseillée.",
				},
			],
		"automations": [
				{
				"title": "Congélateur — notification",
				"goal": "Informer l’utilisateur",
				"trigger": "state change",
				"devices": "notify.mobile_app",
				},
				{
				"title": "Congélateur — journal",
				"goal": "Tracer dans le logbook",
				"trigger": "event",
				"devices": "logbook.log",
				},
				{
				"title": "Congélateur — nuit",
				"goal": "Réduire bruit nocturne",
				"trigger": "time 22:00-07:00",
				"devices": "condition time",
				},
				{
				"title": "Congélateur — absence",
				"goal": "Activer si personne absente",
				"trigger": "zone not_home",
				"devices": "condition zone",
				},
			],
		"tutorialSteps": [
				{
				"title": "Congélateur — préparation 1",
				"objective": "Objectif étape 1",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 1 pour alerte-congelateur-cave",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Congélateur — préparation 2",
				"objective": "Objectif étape 2",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 2 pour alerte-congelateur-cave",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Congélateur — préparation 3",
				"objective": "Objectif étape 3",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 3 pour alerte-congelateur-cave",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Congélateur — préparation 4",
				"objective": "Objectif étape 4",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 4 pour alerte-congelateur-cave",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Congélateur — préparation 5",
				"objective": "Objectif étape 5",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 5 pour alerte-congelateur-cave",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Congélateur — préparation 6",
				"objective": "Objectif étape 6",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 6 pour alerte-congelateur-cave",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Congélateur — préparation 7",
				"objective": "Objectif étape 7",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 7 pour alerte-congelateur-cave",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Congélateur — préparation 8",
				"objective": "Objectif étape 8",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 8 pour alerte-congelateur-cave",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
			],
		"haIntegrations": [
				"Home Assistant",
				"Shelly",
				"Zigbee Home Automation",
			],
		"safetyNote": "Coupez disjoncteur concerné si travail 230 V ; suivez notice fabricant.",
		}),
	"camera-solaire-exterieure": defineProject("camera-solaire-exterieure", {
		"requires230v": false,
		"h1": "Comment surveiller jardin sans tirer de câble électrique ?",
		"geoAnswer": "Caméra solaire ieGeek ZS-GX4S ou S7 avec panneau orienté sud. Wi-Fi 2,4 GHz testé sur site.",
		"expectedOutcomes": [
				"Piloter Caméra solaire depuis smartphone",
				"Automatisations locales HA",
				"Historique et graphiques",
				"Notifications ciblées",
			],
		"limits": [
				"Compatibilité matérielle Caméra solaire à vérifier",
				"Couverture radio/Wi-Fi",
			],
		"scenarios": [
				{
				"title": "Matin",
				"description": "Scénario Caméra solaire lever.",
				},
				{
				"title": "Absence",
				"description": "Alerte Caméra solaire.",
				},
				{
				"title": "Manuel",
				"description": "Boutons d’origine Caméra solaire.",
				},
			],
		"prerequisites": [
				{
				"label": "Matériel",
				"detail": "Équipement compatible Caméra solaire.",
				},
			],
		"incompatibilities": [
				"Versions fermées sans intégration HA pour Caméra solaire",
			],
		"prePurchaseChecks": [
				"Checklist pré-achat Caméra solaire",
				"Portée réseau",
			],
		"troubleshooting": [
				{
				"symptom": "Caméra solaire ne répond plus",
				"causes": [
						"Pile ou alimentation",
						"Hors ligne",
					],
				"checks": [
						"État batterie",
						"Ping IP",
					],
				"solution": "Remplacer piles ou redémarrer module.",
				},
				{
				"symptom": "Notifications absentes",
				"causes": [
						"Automation désactivée",
						"Téléphone DND",
					],
				"checks": [
						"Trace HA",
						"Canal notify",
					],
				"solution": "Tester notify.test ; vérifier app mobile.",
				},
				{
				"symptom": "État incohérent",
				"causes": [
						"Capteur mal fixé",
						"Interférences",
					],
				"checks": [
						"Manual test",
						"RSSI",
					],
				"solution": "Repositionner capteur ou ajouter routeur Zigbee.",
				},
				{
				"symptom": "Doublons d’alertes",
				"causes": [
						"Triggers multiples",
						"Pas de cooldown",
					],
				"checks": [
						"Liste automations",
					],
				"solution": "Ajouter mode single ou délai 120 s.",
				},
			],
		"faq": [
				{
				"question": "ZS-GX4S vs S7 ?",
				"answer": "GX4S économise batterie ; S7 filme en continu si panneau suffisant.",
				},
				{
				"question": "Wi-Fi 5 GHz ?",
				"answer": "La plupart n’acceptent que 2,4 GHz — SSID dédié possible.",
				},
				{
				"question": "Stockage local ?",
				"answer": "Carte microSD ou NVR selon modèle ; cloud optionnel.",
				},
				{
				"question": "Home Assistant Frigate ?",
				"answer": "RTSP si caméra l’expose ; sinon intégration app.",
				},
				{
				"question": "Hiver faible ensoleillement ?",
				"answer": "Réduisez sensibilité ou batterie auxiliaire recharge.",
				},
				{
				"question": "RGPD voie publique ?",
				"answer": "Masquez trottoir dans app si possible.",
				},
			],
		"automations": [
				{
				"title": "Caméra solaire — notification",
				"goal": "Informer l’utilisateur",
				"trigger": "state change",
				"devices": "notify.mobile_app",
				},
				{
				"title": "Caméra solaire — journal",
				"goal": "Tracer dans le logbook",
				"trigger": "event",
				"devices": "logbook.log",
				},
				{
				"title": "Caméra solaire — nuit",
				"goal": "Réduire bruit nocturne",
				"trigger": "time 22:00-07:00",
				"devices": "condition time",
				},
				{
				"title": "Caméra solaire — absence",
				"goal": "Activer si personne absente",
				"trigger": "zone not_home",
				"devices": "condition zone",
				},
			],
		"tutorialSteps": [
				{
				"title": "Caméra solaire — préparation 1",
				"objective": "Objectif étape 1",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 1 pour camera-solaire-exterieure",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Caméra solaire — préparation 2",
				"objective": "Objectif étape 2",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 2 pour camera-solaire-exterieure",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Caméra solaire — préparation 3",
				"objective": "Objectif étape 3",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 3 pour camera-solaire-exterieure",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Caméra solaire — préparation 4",
				"objective": "Objectif étape 4",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 4 pour camera-solaire-exterieure",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Caméra solaire — préparation 5",
				"objective": "Objectif étape 5",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 5 pour camera-solaire-exterieure",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Caméra solaire — préparation 6",
				"objective": "Objectif étape 6",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 6 pour camera-solaire-exterieure",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Caméra solaire — préparation 7",
				"objective": "Objectif étape 7",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 7 pour camera-solaire-exterieure",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Caméra solaire — préparation 8",
				"objective": "Objectif étape 8",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 8 pour camera-solaire-exterieure",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
			],
		"haIntegrations": [
				"Home Assistant",
				"Shelly",
				"Zigbee Home Automation",
			],
		"safetyNote": "Coupez disjoncteur concerné si travail 230 V ; suivez notice fabricant.",
		}),
	"box-home-assistant-locale": defineProject("box-home-assistant-locale", {
		"requires230v": false,
		"h1": "Comment installer une box domotique locale Home Assistant sans abonnement ?",
		"geoAnswer": "Home Assistant Green ou Raspberry Pi 5 Ethernet plus dongle Zigbee ZBDongle-E ou ZBT-2. Compte local, pas de cloud obligatoire.",
		"expectedOutcomes": [
				"Piloter Box HA depuis smartphone",
				"Automatisations locales HA",
				"Historique et graphiques",
				"Notifications ciblées",
			],
		"limits": [
				"Compatibilité matérielle Box HA à vérifier",
				"Couverture radio/Wi-Fi",
			],
		"scenarios": [
				{
				"title": "Matin",
				"description": "Scénario Box HA lever.",
				},
				{
				"title": "Absence",
				"description": "Alerte Box HA.",
				},
				{
				"title": "Manuel",
				"description": "Boutons d’origine Box HA.",
				},
			],
		"prerequisites": [
				{
				"label": "Matériel",
				"detail": "Équipement compatible Box HA.",
				},
			],
		"incompatibilities": [
				"Versions fermées sans intégration HA pour Box HA",
			],
		"prePurchaseChecks": [
				"Checklist pré-achat Box HA",
				"Portée réseau",
			],
		"troubleshooting": [
				{
				"symptom": "Box HA ne répond plus",
				"causes": [
						"Pile ou alimentation",
						"Hors ligne",
					],
				"checks": [
						"État batterie",
						"Ping IP",
					],
				"solution": "Remplacer piles ou redémarrer module.",
				},
				{
				"symptom": "Notifications absentes",
				"causes": [
						"Automation désactivée",
						"Téléphone DND",
					],
				"checks": [
						"Trace HA",
						"Canal notify",
					],
				"solution": "Tester notify.test ; vérifier app mobile.",
				},
				{
				"symptom": "État incohérent",
				"causes": [
						"Capteur mal fixé",
						"Interférences",
					],
				"checks": [
						"Manual test",
						"RSSI",
					],
				"solution": "Repositionner capteur ou ajouter routeur Zigbee.",
				},
				{
				"symptom": "Doublons d’alertes",
				"causes": [
						"Triggers multiples",
						"Pas de cooldown",
					],
				"checks": [
						"Liste automations",
					],
				"solution": "Ajouter mode single ou délai 120 s.",
				},
			],
		"faq": [
				{
				"question": "Green ou Pi 5 ?",
				"answer": "Green plug-and-play ; Pi 5 flexible mais maintenance SD/NVMe.",
				},
				{
				"question": "ZBDongle-E ou ZBT-2 ?",
				"answer": "ZBT-2 officiel 2024+ ; ZBDongle-E très répandu et fiable.",
				},
				{
				"question": "Wi-Fi pour HA ?",
				"answer": "Ethernet fortement recommandé pour serveur.",
				},
				{
				"question": "Sauvegardes ?",
				"answer": "Snapshot hebdo vers NAS ou clé USB automatique.",
				},
				{
				"question": "Mises à jour ?",
				"answer": "Planifiez fenêtre mensuelle ; lisez release notes.",
				},
				{
				"question": "Compte Nabu Casa obligatoire ?",
				"answer": "Non — uniquement pour accès distant simplifié.",
				},
			],
		"automations": [
				{
				"title": "Box HA — notification",
				"goal": "Informer l’utilisateur",
				"trigger": "state change",
				"devices": "notify.mobile_app",
				},
				{
				"title": "Box HA — journal",
				"goal": "Tracer dans le logbook",
				"trigger": "event",
				"devices": "logbook.log",
				},
				{
				"title": "Box HA — nuit",
				"goal": "Réduire bruit nocturne",
				"trigger": "time 22:00-07:00",
				"devices": "condition time",
				},
				{
				"title": "Box HA — absence",
				"goal": "Activer si personne absente",
				"trigger": "zone not_home",
				"devices": "condition zone",
				},
			],
		"tutorialSteps": [
				{
				"title": "Box HA — préparation 1",
				"objective": "Objectif étape 1",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 1 pour box-home-assistant-locale",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Box HA — préparation 2",
				"objective": "Objectif étape 2",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 2 pour box-home-assistant-locale",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Box HA — préparation 3",
				"objective": "Objectif étape 3",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 3 pour box-home-assistant-locale",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Box HA — préparation 4",
				"objective": "Objectif étape 4",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 4 pour box-home-assistant-locale",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Box HA — préparation 5",
				"objective": "Objectif étape 5",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 5 pour box-home-assistant-locale",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Box HA — préparation 6",
				"objective": "Objectif étape 6",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 6 pour box-home-assistant-locale",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Box HA — préparation 7",
				"objective": "Objectif étape 7",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 7 pour box-home-assistant-locale",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
				{
				"title": "Box HA — préparation 8",
				"objective": "Objectif étape 8",
				"prerequisites": [
						"Outils",
					],
				"actions": [
						"Réaliser action 8 pour box-home-assistant-locale",
					],
				"expectedResult": "Étape validée",
				"errors": "Consulter notice",
				},
			],
		"haIntegrations": [
				"Home Assistant",
				"Shelly",
				"Zigbee Home Automation",
			],
		"safetyNote": "Coupez disjoncteur concerné si travail 230 V ; suivez notice fabricant.",
		}),
	...LOT42_PROJECT_CONTENT,
};

/** Contenu pédagogique généré pour les projets au-delà des 23 fiches historiques. */
function buildDynamicProjectContent(useCaseId) {
	const uc = USE_CASES.find((u) => u.id === useCaseId);
	if (!uc) return null;

	const slug = slugForUseCase(useCaseId);
	const shortTitle = uc.title.replace(/\?$/, '').trim();
	const h1 = shortTitle.endsWith('?') ? shortTitle : `Comment réaliser : ${shortTitle} ?`;
	const geoAnswer = `${uc.shortDesc} Vous suivez le schéma fonctionnel puis le schéma électrique NFC 15-100 de la fiche /domotique/projets/${slug}/, vous configurez le matériel via le configurateur (profils Économique, Recommandé, Évolutif) et vous validez chaque étape du tutoriel avant d’activer les automatisations Home Assistant.`;

	const requires230v =
		uc.category === 'eclairage' ||
		uc.category === 'chauffage-vmc' ||
		uc.id.includes('fil-pilote') ||
		uc.id.includes('tableau') ||
		uc.id.includes('telerupteur') ||
		uc.id.includes('electrovanne') ||
		uc.mainRole?.includes('230');

	const projectLabel = uc.title.split('(')[0].trim();

	return defineProject(useCaseId, {
		requires230v,
		h1,
		geoAnswer,
		expectedOutcomes: [
			`Piloter ou surveiller « ${projectLabel} » depuis le smartphone ou Home Assistant`,
			'Conserver les commandes manuelles d’origine lorsque le câblage le permet',
			'Recevoir des notifications utiles (fin de cycle, seuil, oubli, alerte)',
			'Documenter entity_id et scénarios pour faire évoluer le projet sans repartir de zéro',
		],
		limits: [
			'Compatibilité à valider sur site avant achat (neutre, fil pilote, contact sec, puissance moteur)',
			'Portée Wi-Fi 2,4 GHz ou mesh Zigbee à tester dans la pièce concernée',
			'Automatisations agressives désactivées : pas de commande moteur/chauffage sans action explicite',
		],
		scenarios: [
			scen('Quotidien', `Scénario matin/soir : déclenchement manuel ou capteur pour ${projectLabel.toLowerCase()}.`),
			scen('Absence', 'Notification ou coupure si personne absent du domicile (zone not_home).'),
			scen('Manuel', 'Interrupteurs, télécommandes ou boutons d’origine conservés selon le schéma.'),
		],
		prerequisites: [
			pre('Matériel', uc.mainRole ?? 'Modules listés dans le configurateur URL.'),
			pre('Outils', uc.meta.tools ?? 'Tournevis, testeur, Wago 221.'),
			pre('Logiciel', 'Application Shelly/Sonoff ou Home Assistant + coordinateur Zigbee si profil Recommandé.'),
		],
		incompatibilities: [
			'Installations sans neutre en boîte alors qu’un module avec neutre est requis',
			'Motorisations ou chaudières sans entrée contact sec documentée',
			'Cloud fabricant obligatoire sans intégration locale alternative',
		],
		prePurchaseChecks: [
			'Photographier le câblage existant et mesurer la profondeur de boîte (50 mm minimum)',
			'Vérifier puissance maximale (W / A) de prises et relais',
			'Tester la portée radio depuis l’emplacement final du capteur ou du module',
		],
		troubleshooting: [
			ts(
				'Module hors ligne dans l’application',
				['Wi-Fi 2,4 GHz faible', 'Mot de passe erroné', 'VLAN isolé'],
				['Ping IP locale', 'RSSI Shelly', 'Routeur même SSID 2,4 GHz'],
				'Rapprocher le routeur, réserver une IP DHCP, désactiver isolation AP.',
			),
			ts(
				'Automatisation ne se déclenche pas',
				['entity_id incorrect', 'Mode single bloqué', 'Condition horaire'],
				['Trace HA', 'Outil développeur → États', 'Journal automatisations'],
				'Corriger les noms d’entités ; tester le YAML fourni sur la page section Home Assistant.',
			),
			ts(
				'Capteur Zigbee ne remonte plus',
				['Pile faible', 'Routeur Zigbee absent', 'Canal Wi-Fi saturé'],
				['Batterie %', 'LQI dans ZHA', 'Changer canal Zigbee 25→15'],
				'Remplacer piles ; ajouter une prise routeur Zigbee always-on.',
			),
			ts(
				'Comportement instable (clignotements, reboot)',
				['Charge LED trop faible', 'Neutre emprunté', 'Surchauffe module'],
				['Bypass Shelly dimmer', 'Mesure VAT', 'Température boîtier'],
				'Respecter notice charge minimale ; faire valider le câblage par un électricien si doute.',
			),
		],
		faq: [
			faq(
				'Faut-il Home Assistant pour ce projet ?',
				'Non en profil Économique Wi-Fi : l’application du module suffit souvent. Home Assistant devient pertinent pour croiser capteurs, alertes avancées et YAML de la page.',
			),
			faq(
				'Quel budget prévoir pour démarrer ?',
				'Utilisez le configurateur en haut de page : les trois profils (Économique, Recommandé, Évolutif) listent des produits réels avec liens d’achat et total estimatif.',
			),
			faq(
				'Puis-je installer moi-même sans électricien ?',
				'Les capteurs sur pile et prises connectées oui. Dès que vous ouvrez un boîtier 230 V ou le tableau, coupez le disjoncteur, vérifiez l’absence de tension et faites appel à un professionnel si le câblage est incertain.',
			),
			faq(
				'Les automatisations fonctionnent-elles sans Internet ?',
				'Oui en local : Shelly, Zigbee et Home Assistant self-hosted continuent sur le LAN. Seules les notifications mobile hors domicile nécessitent un accès distant (Nabu Casa, VPN).',
			),
			faq(
				'Comment adapter le YAML Home Assistant ?',
				'Copiez le bloc section Home Assistant, remplacez les entity_id par les vôtres (Outils développeur → États), puis enregistrez en mode YAML dans une automatisation.',
			),
			faq(
				'Que faire si le schéma ne correspond pas à mon installation ?',
				'Choisissez une autre variante technique dans le configurateur (?tech=) ou consultez un projet proche via le maillage en bas de page ; ne forcez jamais un câblage non documenté.',
			),
		],
		automations: [
			auto(`${useCaseId} — notification`, 'Informer sur un événement utile', 'state ou seuil capteur', 'notify.mobile_app'),
			auto(`${useCaseId} — journal`, 'Tracer dans le logbook Home Assistant', 'trigger idempotent', 'logbook.log'),
			auto(`${useCaseId} — sécurité`, 'Bloquer les actions dangereuses la nuit', 'time 22:00–07:00', 'condition time'),
		],
		haIntegrations: ['Home Assistant', 'Shelly', 'Zigbee Home Automation'],
		safetyNote: requires230v
			? 'Coupez le disjoncteur divisionnaire, contrôlez l’absence de tension (VAT) et respectez la NFC 15-100. Ne dépassez jamais le courant nominal du module.'
			: 'Respectez les courants max des relais contact sec (8 A typique) et les notices fabricant motorisation / VMC.',
	});
}

export function getProjectPageContent(useCaseId) {
	return CONTENT[useCaseId] ?? buildDynamicProjectContent(useCaseId);
}

/** @param {string} useCaseId @param {number} [limit=4] */
export function getRelatedProjectIds(useCaseId, limit = 4) {
	const current = USE_CASES.find((u) => u.id === useCaseId);
	if (!current) return [];
	return USE_CASES.filter((u) => u.category === current.category && u.id !== useCaseId)
		.slice(0, limit)
		.map((u) => u.id);
}
