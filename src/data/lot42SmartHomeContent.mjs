import { PROJECT_INTRODUCTIONS } from './smartHomeProjectTutorials.mjs';
import { slugForUseCase } from './smartHomeProjectSlugs.mjs';

/** @param {string} useCaseId */
function defaultYamlNotes(useCaseId) {
	const slug = slugForUseCase(useCaseId);
	return [
		`entity_id : nom technique HA (ex. sensor.${useCaseId.replace(/-/g, '_')}).`,
		`trigger: platform state ou device — page /domotique/projets/${slug}/`,
		`condition: évite les boucles et les fausses alertes (mode alarme, cooldown).`,
		`action: notify.mobile_app, sirène ou arrosage selon le projet.`,
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
	const tutorialSteps = fields.tutorialSteps;
	if (!tutorialSteps || tutorialSteps.length !== 8) {
		throw new Error(`Lot42 projet ${id} : attendu 8 tutorialSteps, reçu ${tutorialSteps?.length ?? 0}`);
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
		requires230v: fields.requires230v ?? false,
		safetyNote: fields.safetyNote,
	};
}

/** @type {Record<string, ReturnType<typeof defineProject>>} */
export const LOT42_PROJECT_CONTENT = {
	'sonde-humidite-sol-potager-zigbee': defineProject('sonde-humidite-sol-potager-zigbee', {
		requires230v: false,
		h1: 'Comment mesurer l’humidité du sol du potager en Zigbee avec Home Assistant ?',
		geoAnswer:
			'Une sonde capacitive Zigbee (SONOFF SNZB-61D1) envoie le pourcentage d’humidité du sol et la température à Home Assistant (HA) via un coordinateur USB (ZHA). Vous fixez un seuil d’arrosage dans HA et recevez une alerte avant que les plants ne soient en stress hydrique — sans câble ni travail au tableau électrique.',
		expectedOutcomes: [
			'Graphique humidité sol par zone (potager, bac, pelouse)',
			'Notification si humidité sous le seuil choisi',
			'Pilotage optionnel d’une électrovanne ou prise d’arrosage',
			'Historique saisonnier pour ajuster les arrosages',
		],
		limits: [
			'Sonde adaptée aux sols meubles ; pierre ou gravier faussent la mesure',
			'Portée Zigbee limitée en plein jardin sans routeur alimenté',
			'Ne remplace pas une sonde agronomique professionnelle',
		],
		scenarios: [
			scen('Vacances', 'Seuil bas → notification aux voisins ou coupure arrosage si fuite.'),
			scen('Canicule', 'Alerte précoce avant flétrissement visible des tomates.'),
			scen('Pelouse', 'Moyenne de deux sondes pour éviter arrosage si une zone est ombragée.'),
		],
		prerequisites: [
			pre('Coordinateur', 'Home Assistant + ZBDongle-E ou hub Zigbee équivalent.'),
			pre('Sonde', 'SNZB-61D1 ou compatible sol Zigbee 3.0.'),
			pre('Sol', 'Zone accessible pour enterrer la tige sans racines majeures.'),
		],
		incompatibilities: [
			'Sol totalement sec non compacté au premier jour (mesures erratiques)',
			'Capteurs Wi-Fi sol sans intégration HA locale',
		],
		prePurchaseChecks: [
			'Mesurer la distance jardin ↔ serveur HA (< 15 m avec routeur Zigbee)',
			'Prévoir pile CR2032 ou modèle rechargeable selon fiche',
			'Vérifier compatibilité ZHA dans la communauté HA',
		],
		troubleshooting: [
			ts(
				'Humidité bloquée à 0 % ou 100 %',
				['Sonde mal enterrée', 'Sol cimenté', 'Défaut capteur'],
				['Retirer et ré-enfoncer à 8 cm', 'Tester dans terreau humide'],
				'Repositionner ; remplacer si valeur fixe après 24 h.',
			),
			ts(
				'Pas de remontée Zigbee',
				['Hors couverture', 'Pile faible'],
				['LQI dans ZHA', 'Batterie %'],
				'Rapprocher d’une prise routeur Zigbee ; changer pile.',
			),
			ts(
				'Arrosage en boucle',
				['Automation sans hysteresis', 'Électrovanne coincée'],
				['Trace HA', 'État switch vanne'],
				'Ajouter seuil haut (ex. 45 %) avant nouvel arrosage.',
			),
			ts(
				'Écart entre zones',
				['Ensoleillement différent', 'Une seule sonde'],
				['Comparer graphiques HA'],
				'Ajouter une sonde par micro-climat.',
			),
		],
		faq: [
			faq('SNZB-61D1 ou sonde air SNZB-02D ?', 'Le 61D1 est conçu pour le sol ; le 02D mesure l’air ambiant.'),
			faq('Profondeur d’enfouissement ?', '5–8 cm en potager, 10–15 cm en pelouse selon racines.'),
			faq('Arrosage automatique obligatoire ?', 'Non : l’alerte seule suffit pour arroser manuellement.'),
			faq('Gel hivernal ?', 'Retirez ou protégez la sonde si température < −5 °C prolongée.'),
			faq('Calibration ?', 'Arrosez à saturation puis notez 100 % ; laissez sécher 48 h pour le minimum.'),
			faq('Zigbee2MQTT ou ZHA ?', 'Les deux conviennent ; ZHA est le plus simple sur Home Assistant Green.'),
		],
		automations: [
			auto('Potager — alerte sécheresse', 'Notifier si humidité < 25 % 30 min', 'numeric_state below', 'notify.mobile_app'),
			auto('Potager — arrosage', 'Activer vanne 8 min si seuil bas et soleil', 'numeric_state + sun', 'switch.electrovanne'),
			auto('Potager — journal', 'Logbook à chaque arrosage', 'switch turn_on', 'logbook.log'),
			auto('Potager — pluie', 'Inhiber arrosage si pluie > 2 mm/h', 'weather + numeric_state', 'condition weather'),
		],
		tutorialSteps: [
			step(
				'Choisir l’emplacement de la sonde',
				'Repérer la zone racinaire représentative.',
				['Plan du potager', 'Accès sans piétiner les plants'],
				['Éviter bord de bac sec', 'Viser centre massif tomates ou salades', 'Noter GPS ou repère sur plan'],
				'Emplacement validé à la main (sol meuble).',
				'Sol rocailleux : préférer bac dédié avec terreau homogène.',
			),
			step(
				'Enterrer la sonde SNZB-61D1',
				'Assurer contact sol–électrodes.',
				['Sonde', 'Dible ou tuteur'],
				['Perforer vertical 8 cm', 'Insérer tige sans inclinaison', 'Tasser légèrement autour'],
				'Tige entièrement dans sol humide.',
				'Ne pas laisser la tête électronique dans l’eau stagnante.',
			),
			step(
				'Appairer en Zigbee (ZHA)',
				'Obtenir entités sensor.* dans HA.',
				['HA ouvert', 'ZHA → Appareils → Appairer'],
				['Maintenir reset sonde 5 s', 'Attendre apparition device', 'Renommer « potager_sonde_1 »'],
				'Deux entités humidité % et température visibles.',
				'Échec : rapprocher dongle USB avec extension courte.',
			),
			step(
				'Stabiliser les mesures 24 h',
				'Laisser le sol se compacter.',
				['Arrosage initial fait'],
				['Arroser modérément', 'Attendre 24 h sans déplacer', 'Observer courbe Historique HA'],
				'Courbe continue sans sauts > 20 %/h.',
				'Sauts : vérifier fuite ou contact intermittent.',
			),
			step(
				'Créer le helper de seuil',
				'Définir quand alerter.',
				['Accès Paramètres → Helpers'],
				['Créer input_number seuil_humidite_potager = 28', 'Documenter dans note HA'],
				'Helper modifiable depuis le dashboard.',
				'Adapter selon plante (cactus vs salades).',
			),
			step(
				'Automatisation notification',
				'Push smartphone si trop sec.',
				['App mobile HA configurée'],
				['Nouvelle automation YAML ou UI', 'Trigger numeric_state < helper', 'Action notify avec titre urgent'],
				'Test manuel : baisser seuil temporairement → push reçu.',
				'Pas de push : vérifier canal notify.mobile_app.',
			),
			step(
				'Option : piloter l’arrosage',
				'Relier à vanne ou prise connectée.',
				['Module Shelly ou électrovanne 24 V documentée'],
				['Automation : seuil bas → ON 8 min', 'Condition : pas de pluie', 'Sécurité max 2 cycles/jour'],
				'Arrosage test sans inonder.',
				'Toujours garder bouton manuel d’arrêt.',
			),
			step(
				'Contrôle saisonnier',
				'Ajuster seuils et piles.',
				['Calendrier rappel mensuel'],
				['Revoir graphique 7 jours', 'Tester pile si LQI baisse', 'Ajouter routeur Zigbee si besoin'],
				'Projet documenté dans note HA + photo emplacement.',
				'Hiver : retirer sonde ou désactiver automations gel.',
			),
		],
		haIntegrations: ['Home Assistant', 'Zigbee Home Automation (ZHA)', 'Zigbee2MQTT'],
		safetyNote:
			'Électrovanne et pompe : respecter pression réseau et disjoncteur dédié si branchement 230 V — hors scope de la sonde seule.',
	}),
	'detecteur-fumee-connecte-zigbee': defineProject('detecteur-fumee-connecte-zigbee', {
		requires230v: false,
		h1: 'Comment alerter son smartphone en cas de fumée avec un détecteur Zigbee ?',
		geoAnswer:
			'Un détecteur optique Heiman HS1SA-E Zigbee déclenche sa sirène locale puis remonte l’alarme fumée vers Home Assistant (HA). Couplé à l’app mobile HA (via Nabu Casa ou VPN), vous êtes prévenu à distance ; le détecteur reste conforme à son rôle principal même si HA est hors ligne.',
		expectedOutcomes: [
			'Alarme sonore locale + notification smartphone',
			'Scénario HA : lumières allumées, sirènes, SMS optionnel',
			'Historique des tests mensuels dans le logbook',
			'Interconnexion virtuelle entre plusieurs détecteurs HA',
		],
		limits: [
			'Ne détecte pas le CO (projet distinct)',
			'Zigbee ne remplace pas l’interconnexion filaire NF si imposée',
			'Faux positifs possibles (vapeur cuisine) selon placement',
		],
		scenarios: [
			scen('Nuit', 'Fumée détectée → lumières couloir 100 % + notify famille.'),
			scen('Absence', 'Push prioritaire + caméra snapshot si intégration Frigate.'),
			scen('Test mensuel', 'Bouton test → notification « test OK » sans appeler les pompiers.'),
		],
		prerequisites: [
			pre('Plafond', 'Fixation visée ou adhésif selon notice Heiman.'),
			pre('HA', 'Instance locale + coordinateur Zigbee.'),
			pre('Accès distant', 'Nabu Casa, Tailscale ou WireGuard pour push hors domicile.'),
		],
		incompatibilities: [
			'Placement au-dessus cuisinière sans hotte efficace',
			'Détecteurs uniquement Wi-Fi cloud sans intégration HA',
		],
		prePurchaseChecks: [
			'Vérifier compatibilité Heiman HS1SA-E avec ZHA',
			'Compter un détecteur par niveau (réglementation française)',
			'Prévoir pile ou autonomie selon fiche produit',
		],
		troubleshooting: [
			ts('Sirène locale OK, pas HA', ['Appairage perdu', 'ZHA arrêté'], ['État device ZHA', 'Redémarrer ZHA'], 'Ré-appairer ; vérifier entité binary_sensor.smoke.'),
			ts('Faux alarmes cuisine', ['Vapeur', 'Fumée grill'], ['Déplacer > 3 m cuisinière'], 'Ajouter condition délai 30 s ou capteur humidité cuisine.'),
			ts('Pas de notify distant', ['Pas de VPN/Nabu Casa', 'Téléphone DND'], ['Test 4G', 'Canal notify'], 'Activer accès distant sécurisé.'),
			ts('Batterie faible ignorée', ['Pas d’automation batterie'], ['Entité battery_level'], 'Alerte si < 15 %.'),
		],
		faq: [
			faq('Remplace un détecteur filaire ?', 'Non en rénovation stricte ; complète un système existant.'),
			faq('Obligation interconnectée ?', 'La loi impose détecteurs ; l’interconnexion Zigbee HA est un plus logiciel.'),
			faq('Pompiers automatiques ?', 'Non — composez le 18/112 vous-même après vérification.'),
			faq('Heiman ou Ajax ?', 'Heiman HS1SA-E bien documenté en ZHA ; vérifier la fiche communautaire.'),
			faq('Test sans alerte famille ?', 'Automation séparée avec input_boolean mode_test.'),
			faq('Couper avec HA ?', 'Jamais — la sirène matérielle reste autonome.'),
		],
		automations: [
			auto('Fumée — alerte critique', 'Notify priorité + tts', 'binary_sensor smoke on', 'notify.mobile_app'),
			auto('Fumée — éclairage secours', 'Allumer toutes lumières', 'smoke on', 'light.turn_on all'),
			auto('Fumée — fin', 'Journal fin alarme', 'smoke off 2 min', 'logbook.log'),
		],
		tutorialSteps: [
			step('Planifier les emplacements', 'Couvrir chaque niveau.', ['Plan maison'], ['Repérer plafonds centraux', 'Éviter coins morts', 'Lister qty détecteurs'], 'Liste pièces validée.', 'Cuisine : lateral pas au-dessus plaques.'),
			step('Fixer le Heiman HS1SA-E', 'Montage sécurisé.', ['Vis ou adhésif notice'], ['Percer si besoin', 'Visser base', 'Clipser détecteur'], 'Appareil stable au plafond.', 'Ne pas peindre le capteur.'),
			step('Test bouton matériel', 'Valider sirène locale.', [], ['Appuyer test 5 s', 'Entendre sirène', 'Noter date test'], 'Sirène audible.', 'Silence : pile ou défaut.'),
			step('Appairage ZHA', 'Créer entité fumée.', ['Mode appairage ZHA'], ['Reset détecteur selon notice', 'Attendre device', 'Renommer par pièce'], 'binary_sensor disponible.', 'Répéter par appareil.'),
			step('Automation notification', 'Push immédiat.', ['notify configuré'], ['Créer automation smoke → notify', 'data push priority high', 'Tester avec bouton test'], 'Push reçu < 10 s.', 'Hors maison : vérifier Nabu Casa.'),
			step('Scénario lumières', 'Faciliter évacuation.', ['Lumières HA'], ['Action light.turn_on area', 'Condition night', 'Exclure mode test'], 'Lumières s’allument au test.', 'Limiter flash stroboscope.'),
			step('Mode test mensuel', 'Éviter panique.', ['Helper mode_test'], ['Condition not mode_test', 'Rappel calendrier 1er du mois'], 'Test documenté logbook.', 'Informer famille avant test.'),
			step('Documenter maintenance', 'Piles et dates.', ['Note HA'], ['Entrer date installation', 'Rappel pile annuel', 'Photo QR device ZHA'], 'Fiche maintenance à jour.', 'Remplacer si > 10 ans selon norme.'),
		],
		haIntegrations: ['Home Assistant', 'Zigbee Home Automation (ZHA)', 'Mobile App'],
		safetyNote:
			'En cas de fumée réelle : évacuer, appeler les secours. Le domotique assiste, ne remplace pas les détecteurs certifiés ni votre jugement.',
	}),
	'capteur-vibration-bris-vitre-zigbee': defineProject('capteur-vibration-bris-vitre-zigbee', {
		requires230v: false,
		h1: 'Comment détecter un bris de vitre ou un choc avec un capteur Zigbee ?',
		geoAnswer:
			'Le capteur Aqara Vibration se colle sur la vitre ou le dormant : il envoie un événement Zigbee à Home Assistant (HA) dès choc ou vibration anormale. Couplé à une alarme « armée » ou à une notification prioritaire, vous réagissez avant une intrusion aboutie — sans fil ni perçage de la vitre.',
		expectedOutcomes: [
			'Alerte immédiate sur choc vitre ou porte',
			'Réduction fausses alertes via mode alarme Alarmo',
			'Couplage sirène intérieure ou flash lumineux',
			'Historique des événements dans le logbook',
		],
		limits: [
			'Trafic routier ou orage peuvent déclencher si sensibilité haute',
			'Ne remplace pas un détecteur d’ouverture seul',
			'Vitre très épaisse ou film anti-effraction : tester avant achat',
		],
		scenarios: [
			scen('Intrusion', 'Vibration + contact porte → sirène + notify.'),
			scen('Vitrine pro', 'Alerte sécurité + snapshot caméra.'),
			scen('Nuit', 'Uniquement si alarme armée « nuit ».'),
		],
		prerequisites: [
			pre('Surface', 'Vitre ou métal propre, sec.'),
			pre('Zigbee', 'Routeur alimenté à moins de 10 m.'),
			pre('HA', 'Alarmo ou automatisation avec condition mode.'),
		],
		incompatibilities: [
			'Vitrage avec film réfléchissant mal préparé (adhésif)',
			'Hub propriétaire sans ZHA/Z2M',
		],
		prePurchaseChecks: [
			'Tester adhérence sur chute d’eau 24 h',
			'Vérifier compatibilité Aqara Vibration ZHA',
			'Prévoir capteur contact porte en complément',
		],
		troubleshooting: [
			ts('Trop de fausses alertes', ['Sensibilité max', 'Camion'], ['Baisser sensibilité ZHA', 'Condition alarme armée'], 'Ajouter cooldown 60 s.'),
			ts('Aucun événement', ['Adhésif', 'Pile'], ['Secouer test', 'LQI'], 'Recoller avec 3M VHB ; changer pile.'),
			ts('Alerte sans vibration réelle', ['Bruit air / porte'], ['Journal corréler capteurs'], 'Exiger double condition contact + vibration.'),
			ts('Désarmement lent', ['Automation lourde'], ['Trace HA'], 'Prioriser notify en premier action.'),
		],
		faq: [
			faq('Vitre ou dormant ?', 'Vitre pour bris ; dormant pour forçage serrure.'),
			faq('Compatible Alarmo ?', 'Oui en déclencheur device ou binary_sensor.'),
			faq('Extérieur ?', 'Capteur conçu intérieur ; protéger de la pluie directe.'),
			faq('Avec caméra ?', 'Automation snapshot sur trigger vibration si Frigate/Tapo.'),
			faq('Sensibilité réglable ?', 'Via ZHA clusters ou paramètres device selon firmware.'),
			faq('Un par fenêtre ?', 'Une vitre représentative par pièce exposée suffit souvent.'),
		],
		automations: [
			auto('Vibration — intrusion', 'Notify + sirène si alarme armée', 'device vibration + alarm armed', 'notify + siren'),
			auto('Vibration — journal', 'Logbook événement', 'vibration', 'logbook.log'),
			auto('Vibration — lumière', 'Flash lumière salon', 'vibration', 'light.flash'),
		],
		tutorialSteps: [
			step('Choisir la vitre cible', 'Surface représentative.', ['Liste ouvertures'], ['Prioriser RDC', 'Éviter vibration récurrente volet'], 'Vitre identifiée.', 'Baie coulissante : coller sur vitre fixe.'),
			step('Préparer la surface', 'Adhésif durable.', ['Alcool isopropylique'], ['Nettoyer vitre', 'Sécher 5 min'], 'Surface sans graisse.', 'Ne pas toucher pad adhésif.'),
			step('Coller le Aqara Vibration', 'Fixation centrale.', ['Capteur', 'Guide position'], ['Coller centre vitre', 'Presser 30 s'], 'Capteur tient sans jeu.', 'Reposer 24 h avant test violent.'),
			step('Appairage ZHA', 'Entité vibration.', ['ZHA appairage'], ['Maintenir reset', 'Renommer vibration_salon'], 'Events device visibles.', 'Tester « vibration » dans dev tools.'),
			step('Réglage sensibilité', 'Limiter faux positifs.', ['Paramètres device'], ['Baisser sensibilité d’un cran', 'Tester coups légers'], 'Seuil acceptable.', 'Documenter réglage dans note.'),
			step('Lier Alarmo ou mode', 'Armer avant alerte.', ['Alarmo installé'], ['Ajouter capteur en déclencheur', 'Tester armé/désarmé'], 'Pas d’alerte si désarmé.', 'Mode nuit seul si besoin.'),
			step('Notification et sirène', 'Chaîne d’alerte.', ['notify OK'], ['Automation vibration → notify critical', 'Sirène Zigbee option'], 'Push reçu au test.', 'Cooldown anti-spam.'),
			step('Test intrusion simulée', 'Validation finale.', ['Famille prévenue'], ['Frapper vitre simulé', 'Vérifier délai < 5 s', 'Journal logbook'], 'Chaîne validée.', 'Répéter trimestriellement.'),
		],
		haIntegrations: ['Home Assistant', 'Zigbee Home Automation (ZHA)', 'Alarmo'],
		safetyNote: 'Ne confondez pas alerte domotique et télésurveillance pro ; composez le 17 si intrusion confirmée.',
	}),
	'bouton-urgence-senior-maintien-domicile': defineProject('bouton-urgence-senior-maintien-domicile', {
		requires230v: false,
		h1: 'Comment installer un bouton d’appel d’aide Zigbee pour une personne âgée à domicile ?',
		geoAnswer:
			'L’Aqara Wireless Mini Switch envoie des clics simples, doubles ou triples en Zigbee vers Home Assistant (HA). Un triple clic déclenche une notification prioritaire sur les smartphones des aidants (application mobile HA) ; aucun fil ni travail électrique, pile CR2032 incluse.',
		expectedOutcomes: [
			'Alerte aidants en moins de 30 s',
			'Différencier rappel doux (double clic) et urgence (triple)',
			'Historique des appels dans le logbook',
			'Extension possible vers téléassistance ou appel SIP',
		],
		limits: [
			'Ne remplace pas un bracelet médical homologué téléassistance',
			'Nécessite HA joignable (local + accès distant)',
			'Personne doit comprendre le geste triple clic',
		],
		scenarios: [
			scen('Chute', 'Triple clic → notify tous les aidants + appel automatique si intégration.'),
			scen('Rappel', 'Double clic → « besoin d’aide non urgent ».'),
			scen('Test hebdo', 'Simple clic → message « je vais bien ».'),
		],
		prerequisites: [
			pre('Bouton', 'Aqara Mini Switch Zigbee 3.0.'),
			pre('Aidants', 'App mobile HA installée et connectée.'),
			pre('Emplacement', 'Accessible depuis lit et salle de bain.'),
		],
		incompatibilities: [
			'Hub Aqara seul sans scénario triple notify famille',
			'Bouton Wi-Fi incompatible HA locale',
		],
		prePurchaseChecks: [
			'Lister numéros / comptes notify aidants',
			'Tester portée Zigbee depuis chambre',
			'Expliquer le geste à la personne aidée',
		],
		troubleshooting: [
			ts('Pas de notify', ['Mauvais event', 'App déconnectée'], ['Outils dev → événements', 'Test notify'], 'Filtrer event triple_click uniquement.'),
			ts('Clics accidentels', ['Position', 'Sensibilité'], ['Repositionner', 'Exiger triple'], 'Délai max entre clics 1 s.'),
			ts('Pile faible', ['CR2032 usée'], ['Batterie % ZHA'], 'Remplacer ; alerte < 20 %.'),
			ts('Aidant absent', ['DND', 'Pas 4G'], ['Liste notify multiple'], 'Ajouter 2e aidant + SMS Twilio option.'),
		],
		faq: [
			faq('Téléassistance classique ?', 'Complément possible ; ne remplace pas contrat 24/7 certifié.'),
			faq('Un ou plusieurs boutons ?', 'Chambre + salle de bain recommandés.'),
			faq('Enfants qui jouent ?', 'Placer hors portée enfants ou désactiver nuit.'),
			faq('Appel automatique 15 ?', 'Possible via intégration SIP/Twilio avancée — hors fiche de base.'),
			faq('Batterie durée ?', '12–18 mois usage modéré ; tester mensuellement.'),
			faq('Sans Internet ?', 'Notify local LAN seulement ; hors domicile nécessite VPN/Nabu Casa.'),
		],
		automations: [
			auto('Urgence — triple clic', 'Notify tous aidants critical', 'device triple click', 'notify.mobile_app multi'),
			auto('Rappel — double clic', 'Notify standard', 'double click', 'notify.mobile_app'),
			auto('Acquittement — simple clic', 'Logbook OK', 'single click', 'logbook.log'),
		],
		tutorialSteps: [
			step('Réunion famille', 'Définir qui reçoit quoi.', ['Liste aidants'], ['Valider triple = urgence', 'Partager app HA'], 'Charte écrite.', 'Numéros à jour.'),
			step('Fixer le bouton', 'Accessibilité.', ['Ruban 3M'], ['Coller hauteur lit', 'Tester portée main'], 'Bouton reachable allongé.', 'Salle de bain : version étanche si disponible.'),
			step('Appairage ZHA', 'Device events.', ['ZHA'], ['Appairer Mini Switch', 'Renommer bouton_maman'], 'Events single/double/triple visibles.', 'Noter entity_id.'),
			step('Automation triple clic', 'Urgence.', ['notify aidants'], ['Trigger event triple', 'Action notify data priority', 'Message GPS optionnel'], 'Push test reçu.', 'Vérifier sonnerie DND bypass si Android.'),
			step('Automation double clic', 'Non urgent.', [], ['Message calme', 'Pas sirène'], 'Différenciation claire.', 'Éviter confusion personne âgée.'),
			step('Test avec la personne', 'Pédagogie.', ['Présence aidée'], ['Simuler triple', 'Confirmer compréhension', 'Répéter après 1 semaine'], 'Gesture acquis.', 'Affiche pictogramme à côté.'),
			step('Accès distant aidants', 'Push hors maison.', ['Nabu Casa ou Tailscale'], ['Configurer accès HA', 'Tester en 4G'], 'Aidant reçoit push dehors.', 'Voir projet accès distance.'),
			step('Maintenance', 'Pile et tests.', ['Rappel calendrier'], ['Test mensuel', 'Changer pile si < 20 %', 'Journal logbook'], 'Suivi documenté.', 'Remplacer bouton si clicks manqués.'),
		],
		haIntegrations: ['Home Assistant', 'Zigbee Home Automation (ZHA)', 'Mobile App'],
		safetyNote:
			'Composez le 15/112 en parallèle de toute alerte vitale ; le bouton facilite l’alerte des proches, pas la prise en charge médicale.',
	}),
	'boite-a-colis-connectee-livraison': defineProject('boite-a-colis-connectee-livraison', {
		requires230v: false,
		h1: 'Comment être alerté à chaque ouverture de boîte à colis ou coffre à clés ?',
		geoAnswer:
			'Un capteur de contact Aqara Door P2 sur le couvercle de boîte à colis signale ouverture et fermeture en Zigbee vers Home Assistant (HA) ou l’app Aqara. Vous recevez une notification à chaque livraison ou retrait de clés Airbnb, sans caméra ni abonnement cloud obligatoire.',
		expectedOutcomes: [
			'Notification instantanée ouverture / fermeture',
			'Rappel si couvercle resté ouvert',
			'Historique horodaté pour litiges livreurs',
			'Couplage code boîte ou serrure connectée (option)',
		],
		limits: [
			'Boîtier métallique épais peut bloquer Zigbee',
			'Ne filme pas l’intérieur (capteur contact seul)',
			'Pluie directe sur capteur : choisir boîte étanche',
		],
		scenarios: [
			scen('Livraison', 'Ouverture 14 h → notify « colis déposé ».'),
			scen('Airbnb', 'Ouverture + code expiré → alerte hôte.'),
			scen('Vol', 'Ouverture inattendue la nuit → sirène ou lumière.'),
		],
		prerequisites: [
			pre('Boîte', 'Couvercle avec jeu ≥ 5 mm pour aimant.'),
			pre('Capteur', 'Aqara P2 + pile.'),
			pre('Réseau', 'Routeur Zigbee proche ou prise extérieure routeur.'),
		],
		incompatibilities: [
			'Boîte 100 % métal sans trou pour antenne',
			'Capteur non étanche exposé pluie',
		],
		prePurchaseChecks: [
			'Tester Zigbee boîte fermée avec téléphone ZHA map',
			'Mesurer écart couvercle/ cadre',
			'Vérifier légalité enregistrement notifications copropriété',
		],
		troubleshooting: [
			ts('Pas d’événement', ['Aimant mal aligné', 'Pile'], ['Ouvrir/fermer manuellement', 'État contact ZHA'], 'Realigner ; coller aimant sur cadre fixe.'),
			ts('Ouvertures fantômes', ['Vibration vent', 'Jeu excessif'], ['Ajouter condition 2 s ouvert'], 'Cooldown 30 s.'),
			ts('Hors ligne hiver', ['Pile froid'], ['Température', 'LQI'], 'Pile lithium ; routeur plus proche.'),
			ts('Notify retard', ['HA lent'], ['Trace automation'], 'Simplifier automation ; notify en première action.'),
		],
		faq: [
			faq('Aqara seul sans HA ?', 'Oui via app Aqara Home et hub M2/M3 — moins flexible.'),
			faq('Plusieurs boîtes ?', 'Un capteur par boîte ; nommer entities distinctement.'),
			faq('Code temporaire serrure ?', 'Automation séparée avec serrure Nuki/Tedee si compatible.'),
			faq('GDPR / voisins ?', 'Capteur contact sans image ; informer locataires si boîte commune.'),
			faq('Batterie ?', 'CR1632 typique Aqara ; vérifier fiche P2.'),
			faq('Extérieur ?', 'Boîte étanche IP65 recommandée ; capteur à l’abri direct pluie.'),
		],
		automations: [
			auto('Colis — dépôt', 'Notify ouverture jour', 'contact open', 'notify.mobile_app'),
			auto('Colis — ouvert prolongée', 'Rappel 10 min ouvert', 'open 10 min', 'notify'),
			auto('Colis — nuit', 'Alerte si ouvert 22h-6h', 'time + contact', 'notify critical'),
		],
		tutorialSteps: [
			step('Choisir l’emplacement capteur', 'Couvercle vs cadre.', ['Boîte installée'], ['Coller capteur sous couvercle', 'Aimant sur cadre fixe'], 'Contact change état à l’ouverture.', 'Éviter flex excessif du couvercle.'),
			step('Test mécanique', 'Jeu aimant.', [], ['Ouvrir/fermer 10 fois', 'Vérifier clic net'], 'État stable open/closed.', 'Ajouter cales si jeu trop faible.'),
			step('Appairage Zigbee', 'Entity contact.', ['ZHA'], ['Appairer P2', 'Renommer boite_colis'], 'binary_sensor contact OK.', 'Boîte métal : laisser couvercle entrouvert appairage.'),
			step('Routeur Zigbee extérieur', 'Couverture.', ['Prise étanche'], ['Installer prise routeur sous porche', 'Retester LQI boîte fermée'], 'LQI > 40 boîte fermée.', 'Extension USB dongle si HA dans garage.'),
			step('Automation livraison', 'Notify standard.', ['notify'], ['Trigger open', 'Condition sun daytime option', 'Message horodaté'], 'Push à l’ouverture test.', 'Photo livreur : caméra séparée si besoin.'),
			step('Rappel couvercle ouvert', 'Anti-oubli.', [], ['Trigger open > 10 min', 'Notify rappel'], 'Rappel reçu si laissé ouvert.', 'Utile après livraison distraite.'),
			step('Scénario nuit', 'Sécurité.', ['Mode alarme option'], ['22h-6h open → critical', 'Lumière porche ON'], 'Test horaire simulé.', 'Informer voisins si sirène.'),
			step('Historique litiges', 'Preuve.', ['Logbook'], ['Logger chaque open/close', 'Export mensuel'], 'Journal exploitable.', 'Ne remplace pas preuve vidéo légale.'),
		],
		haIntegrations: ['Home Assistant', 'Zigbee Home Automation (ZHA)', 'Mobile App'],
		safetyNote: 'Boîte mal fixée peut chuter : visser le coffre au mur selon charge colis prévue.',
	}),
	'acces-distance-securise-home-assistant': defineProject('acces-distance-securise-home-assistant', {
		requires230v: false,
		h1: 'Comment accéder à Home Assistant à distance sans ouvrir le port 8123 sur Internet ?',
		geoAnswer:
			'Utilisez un tunnel chiffré : abonnement Nabu Casa (~6,50 €/mois), VPN Tailscale (réseau mesh) ou add-on WireGuard sur Home Assistant (HA). Aucune redirection NAT du port 8123 n’est nécessaire ; l’accès reste chiffré de bout en bout avec authentification HA (mot de passe + 2FA recommandée).',
		expectedOutcomes: [
			'Dashboard HA accessible en 4G comme au Wi-Fi maison',
			'Notifications mobile_app hors domicile',
			'Pas d’exposition directe de la box Internet',
			'Choix entre abonnement simple (Nabu Casa) ou VPN self-hosted',
		],
		limits: [
			'Nabu Casa : abonnement mensuel',
			'Tailscale/WireGuard : courbe d’apprentissage réseau',
			'Performance limitée par uplink box (ADSL/fibre)',
		],
		scenarios: [
			scen('Voyage', 'Vérifier alarme et caméras via app HA 4G.'),
			scen('Famille', 'Aidants accèdent au bouton urgence notify config.'),
			scen('Maintenance', 'Mise à jour HA à distance via tunnel.'),
		],
		prerequisites: [
			pre('HA', 'Instance stable Ethernet (Green ou Pi 5).'),
			pre('Compte', 'Admin HA + 2FA activable.'),
			pre('Routeur', 'Accès lecture config (pas de DMZ HA).'),
		],
		incompatibilities: [
			'Double NAT opérateur sans bridge',
			'CG-NAT sans solution relay (Tailscale/Nabu Casa OK)',
		],
		prePurchaseChecks: [
			'Vérifier uplink upload > 1 Mbit/s',
			'Choisir Nabu Casa vs Tailscale (budget vs contrôle)',
			'Sauvegarde HA avant activation tunnel',
		],
		troubleshooting: [
			ts('Timeout 4G', ['Tunnel down', 'HA arrêté'], ['Ping Nabu Casa status', 'Redémarrer HA'], 'Reconnecter compte Nabu Casa ; vérifier DNS.'),
			ts('Tailscale no peer', ['App non login', 'Subnet route'], ['Admin Tailscale', 'HA add-on logs'], 'Reconnecter compte ; activer subnet routes si besoin.'),
			ts('WireGuard handshake fail', ['Port UDP bloqué FAI', 'Mauvaise clé'], ['Regénérer paires clés', 'Tester autre réseau'], 'Utiliser Tailscale si UDP filtré.'),
			ts('2FA boucle login', ['Horloge HA', 'App auth'], ['Sync NTP HA'], 'Resynchroniser heure ; codes secours.'),
		],
		faq: [
			faq('Nabu Casa obligatoire ?', 'Non : Tailscale ou WireGuard gratuits possibles avec HA.'),
			faq('Port 8123 forward safe ?', 'Non recommandé : scans automatiques et brute-force.'),
			faq('Tailscale gratuit ?', 'Oui usage personnel limité ; suffisant pour famille.'),
			faq('WireGuard sur HA OS ?', 'Add-on communautaire ou officiel selon version ; générer clés dans UI.'),
			faq('Alexa/Google ?', 'Nabu Casa simplifie ; sinon cloud manuel complexe.'),
			faq('Plusieurs utilisateurs ?', 'Comptes HA distincts ; Tailscale ACL pour restreindre.'),
		],
		automations: [
			auto('Accès — alerte login', 'Notify nouvelle connexion externe', 'logbook login success', 'notify.mobile_app'),
			auto('Accès — tunnel down', 'Notify si Nabu Casa disconnect', 'sensor status unavailable', 'notify'),
		],
		tutorialSteps: [
			step('Inventaire réseau', 'Comprendre la box.', ['IP HA locale'], ['Noter IP fixe HA', 'Vérifier pas de DMZ', 'Désactiver forward 8123 si existant'], 'Aucun port 8123 exposé WAN.', 'Réserver IP DHCP MAC HA.'),
			step('Activer 2FA Home Assistant', 'Sécuriser comptes.', ['Compte admin'], ['Profil → Authentification → TOTP', 'Sauver codes secours'], 'Login exige TOTP.', 'Codes papier hors ligne.'),
			step('Option Nabu Casa', 'Tunnel officiel.', ['Compte nabucasa.com'], ['Paramètres HA → Nabu Casa → Activer', 'Lier abonnement'], 'Statut Connected vert.', 'Soutient développement HA.'),
			step('Option Tailscale', 'VPN mesh.', ['Compte Tailscale'], ['Installer add-on Tailscale sur HA', 'Login device', 'Installer app mobile Tailscale'], 'Ping HA IP Tailscale OK.', 'MagicDNS simplifie URLs.'),
			step('Option WireGuard', 'VPN classique.', ['Add-on WireGuard'], ['Générer clés serveur/client', 'Exporter config QR mobile'], 'Handshake réussi logs.', 'Ouvrir UDP choisi si routeur contrôlé.'),
			step('Test accès 4G', 'Validation réelle.', ['Smartphone 4G only'], ['Couper Wi-Fi', 'Ouvrir app HA ou URL tunnel', 'Login 2FA'], 'Dashboard charge < 5 s.', 'Latence normale uplink.'),
			step('Notifications distance', 'mobile_app remote.', ['App HA'], ['Envoyer notify test hors maison', 'Vérifier priorité Android/iOS'], 'Push reçu en 4G.', 'Réinstaller app si token expiré.'),
			step('Documenter procédure', 'Reprise après panne.', ['Note HA'], ['Noter solution choisie', 'Contacts support', 'Sauvegarde config VPN'], 'Fiche reprise à jour.', 'Révoquer anciens clients WireGuard inutilisés.'),
		],
		haIntegrations: ['Home Assistant', 'Nabu Casa', 'Tailscale', 'WireGuard'],
		safetyNote:
			'Ne partagez jamais mots de passe admin ; révoquez accès invités Tailscale/WireGuard dès qu’inutiles.',
	}),
};

export const LOT42_USE_CASE_IDS = Object.keys(LOT42_PROJECT_CONTENT);
