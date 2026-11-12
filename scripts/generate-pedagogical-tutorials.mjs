#!/usr/bin/env node
/**
 * Génère src/data/smartHomeProjectTutorials.mjs (8 étapes riches × 100 projets + introductions).
 * node scripts/generate-pedagogical-tutorials.mjs
 */
import { writeFileSync } from 'node:fs';
import { USE_CASES } from '../src/data/smartHomeUseCases.mjs';

/** @param {Record<string, unknown>} p */
function richStep(p) {
	return {
		title: p.title,
		duration: p.duration,
		level: p.level,
		intro: p.intro,
		outcome: p.outcome,
		beforeStart: p.beforeStart,
		actions: p.actions,
		verify: p.verify,
		tip: p.tip,
	};
}

/** @param {typeof USE_CASES[0]} uc @param {number} n */
function stepTitle(uc, n, label) {
	return `Étape ${n} — ${label}`;
}

/** @param {typeof USE_CASES[0]} uc */
function garageSteps(uc) {
	return [
		richStep({
			title: stepTitle(uc, 1, 'Couper l’alimentation et sécuriser la zone de travail'),
			duration: '10 min',
			level: 'Débutant — sécurité 230 V',
			intro:
				'Avant d’ouvrir le boîtier de la motorisation ou de toucher aux bornes du bouton poussoir, nous allons nous assurer qu’aucune tension dangereuse n’est présente sur le circuit alimentant le moteur. Cette étape protège votre installation et évite les chocs électriques lors du branchement du module Shelly ou équivalent.',
			outcome: 'Le disjoncteur garage est identifié, coupé, et vous avez vérifié l’absence de tension avec un testeur.',
			beforeStart:
				'Testeur de tension CAT III, gants isolants si boîtier humide, accès au tableau électrique, notice de la motorisation.',
			actions: [
				'Repérez sur le tableau le disjoncteur qui alimente la prise ou le circuit du garage (souvent étiqueté « garage » ou « porte »).',
				'Basculez ce disjoncteur sur OFF et verrouillez-le si plusieurs personnes travaillent sur l’installation.',
				'Attendez trente secondes puis mesurez entre phase et neutre au bornier moteur : le testeur ne doit pas s’allumer.',
				'Notez sur une photo l’emplacement du disjoncteur pour le réenclencher facilement après les tests.',
			],
			verify:
				'Le voyant du testeur reste éteint sur L/N au bornier ; le bouton mural ne provoque plus de mouvement tant que le disjoncteur est coupé.',
			tip: 'Ne confondez pas le circuit éclairage du garage avec celui du moteur : deux disjoncteurs distincts sont fréquents.',
		}),
		richStep({
			title: stepTitle(uc, 2, 'Repérer le bornier « bouton poussoir » en contact sec'),
			duration: '15 min',
			level: 'Débutant — sans modifier le 230 V moteur',
			intro:
				'La motorisation accepte une impulsion sur des bornes basse tension ou contact sec (souvent libellées PB, START, ou +/− poussoir). Nous allons les identifier sans jamais couper la phase qui alimente directement le moteur, car le module domotique se câble en parallèle du bouton mural existant.',
			outcome: 'Vous avez une photo claire des bornes poussoir et la confirmation qu’il s’agit bien d’un contact sec.',
			beforeStart: 'Notice constructeur (Somfy, Nice, Hörmann…), appareil photo, multimètre en mode continuité si besoin.',
			actions: [
				'Ouvrez le capot de la motorisation selon la notice (vis cruciforme ou clips).',
				'Localisez le bornier distinct du raccordement 230 V moteur (L/N moteur ne doivent pas être utilisés pour le Shelly).',
				'Photographiez les bornes PB/START ou +/− du poussoir mural filaire s’il existe.',
				'Vérifiez avec la notice que ces bornes acceptent un contact sec en parallèle du bouton (courant faible).',
			],
			verify:
				'En appuyant sur le bouton mural (disjoncteur réenclenché), la porte bouge : vous savez que ces bornes sont les bonnes pour le parallèle.',
			tip: 'Si seules des télécommandes radio existent sans fils poussoir, il faudra une interface radio compatible — pas un simple relais sur le 230 V.',
		}),
		richStep({
			title: stepTitle(uc, 3, 'Monter le module relais en parallèle du bouton poussoir'),
			duration: '25 min',
			level: 'Électricité 230 V — hors tension',
			intro:
				'Nous installons le Shelly 1 Mini Gen3 (ou Sonoff ZBMINI-R2) pour que ses bornes I et O se comportent comme un second bouton poussoir. L’alimentation L/N du module vient du tableau ou d’une dérivation propre ; les bornes I/O restent libres de potentiel sur le circuit moteur.',
			outcome: 'Le module est fixé, câblé en Wago, et le bouton mural fonctionne toujours comme avant.',
			beforeStart: 'Shelly 1 Mini Gen3, Wago 221, tournevis isolé, repères de fils, schéma électrique de la page.',
			actions: [
				'Coupez à nouveau le disjoncteur garage avant de serrer les bornes du module.',
				'Amenez une phase L et un neutre N vers les entrées L In et N du Shelly (depuis le même circuit protégé, pas depuis les bornes poussoir).',
				'Raccordez la borne I du Shelly sur la même borne « + » ou PB que le fil du bouton mural.',
				'Raccordez la borne O du Shelly sur la borne « − » ou START complémentaire, en parallèle du bouton.',
				'Serrez les vis à 0,5 N·m et repoussez les fils sans écraser les isolants.',
			],
			verify:
				'Multimètre en continuité : appuyer sur le bouton mural ferme toujours le contact ; le câblage I/O du Shelly est bien en parallèle, pas en série.',
			tip: 'Contact sec libre de potentiel (0 V envoyé) : les télécommandes et cellules photoélectriques d’origine restent actives.',
		}),
		richStep({
			title: stepTitle(uc, 4, 'Alimenter le module et le connecter au Wi-Fi 2,4 GHz'),
			duration: '20 min',
			level: 'Débutant — configuration logicielle',
			intro:
				'Une fois le câblage terminé, nous remettons le disjoncteur sous tension pour alimenter le Shelly, puis nous l’ajoutons au réseau local. Sans cette connexion, impossible de piloter la porte depuis le smartphone.',
			outcome: 'Le module apparaît en ligne dans l’application Shelly Smart Control (ou dans Home Assistant si vous choisissez cette voie).',
			beforeStart: 'Smartphone, mot de passe Wi-Fi 2,4 GHz, application Shelly installée, disjoncteur prêt à être réenclenché.',
			actions: [
				'Réenclenchez le disjoncteur garage et attendez que la LED du Shelly clignote (mode inclusion).',
				'Ouvrez Shelly Smart Control et ajoutez un appareil « Shelly 1 Mini Gen3 » via Bluetooth puis Wi-Fi.',
				'Choisissez votre réseau 2,4 GHz (le 5 GHz seul n’est pas supporté par le module).',
				'Attendez l’indication « Online » et notez l’adresse IP locale affichée dans l’app.',
			],
			verify: 'Dans l’app, l’interrupteur répond : un clic fait entendre le relais claquer sans forcément bouger la porte si Auto-Off n’est pas encore réglé.',
			tip: 'N’alimentez jamais le Shelly depuis les bornes poussoir du moteur : il lui faut une vraie L/N 230 V.',
		}),
		richStep({
			title: stepTitle(uc, 5, 'Régler l’impulsion Auto-Off et tester un cycle complet'),
			duration: '15 min',
			level: 'Débutant — réglage crucial',
			intro:
				'Une porte de garage attend une impulsion brève, identique à un appui du doigt sur le bouton mural. Nous configurons le mode Momentary / Auto-Off entre 0,5 et 1 seconde pour éviter d’inverser le sens ou de bloquer la motorisation.',
			outcome: 'Un appui dans l’app déclenche exactement un cycle d’ouverture ou de fermeture, comme le bouton mural.',
			beforeStart: 'Accès visuel à la porte, personne hors de la trajectoire du battant, réglages Shelly ouverts.',
			actions: [
				'Dans Shelly → Paramètres du relais → Type de switch : choisissez « Momentary » ou « Impulse ».',
				'Réglez Auto-Off sur 0,5 s à 1 s maximum (commencez par 0,5 s).',
				'Depuis l’app, commandez une ouverture en gardant la porte visible.',
				'Recommencez pour une fermeture et vérifiez que le bouton mural fonctionne toujours.',
			],
			verify: 'Chaque commande distante produit un seul mouvement ; le relais se rouvre automatiquement après l’impulsion (audible).',
			tip: 'Une impulsion trop longue peut être interprétée comme un appui long (inversion de sens sur certaines cartes).',
		}),
		richStep({
			title: stepTitle(uc, 6, 'Installer un capteur pour connaître la position réelle de la porte'),
			duration: '20 min',
			level: 'Débutant — sans 230 V',
			intro:
				'Le relais ne dit pas si la porte est ouverte ou fermée : il envoie seulement une impulsion. Nous fixons un capteur magnétique (reed) ou Aqara Door P2 pour afficher l’état réel sur le smartphone et sécuriser les alertes.',
			outcome: 'L’état Ouvert/Fermé dans l’app correspond à la position réelle du battant.',
			beforeStart: 'Capteur reed ou Aqara P2, aimant, adhésif ou vis, pile si Zigbee, coordinateur si profil HA.',
			actions: [
				'Fixez la partie reed sur le montant fixe et l’aimant sur le battant, alignés quand la porte est fermée.',
				'Pour Aqara P2 : ouvrez l’appairage Zigbee (ZHA ou Zigbee2MQTT) ou Shelly BLU selon votre profil.',
				'Testez en ouvrant manuellement : l’état doit basculer immédiatement dans l’application.',
				'Reculez l’aimant si l’état « fermé » clignote quand la porte est entrouverte.',
			],
			verify: 'Fermeture manuelle → état Fermé ; ouverture à 10 cm → état Ouvert ; cohérent sur plusieurs cycles.',
			tip: 'Un seul reed confirme surtout la position fermée ; les positions intermédiaires ne sont pas toujours détectées.',
		}),
		richStep({
			title: stepTitle(uc, 7, 'Configurer le smartphone (et optionnellement Home Assistant)'),
			duration: '25 min',
			level: 'Intermédiaire — logiciel',
			intro:
				'Nous organisons l’interface quotidienne : widget d’ouverture, état de la porte, et si vous le souhaitez une intégration Home Assistant locale pour automatiser des notifications sans cloud obligatoire.',
			outcome: 'Vous commandez la porte depuis l’app principale et voyez l’état reed ; HA reçoit les entités si activé.',
			beforeStart: 'Compte Shelly ou serveur HA, noms d’entités clairs, accès réseau local.',
			actions: [
				'Parcours A (sans box) : créez un raccourci Shelly Smart Control sur l’écran d’accueil et partagez l’accès en lecture seule à la famille.',
				'Parcours B (HA) : ajoutez l’intégration Shelly ou ZHA, renommez switch.porte_garage et binary_sensor.porte_garage_contact.',
				'Créez un tableau de bord avec bouton impulsion + tuile état porte.',
				'Désactivez toute automatisation qui ouvrirait la porte sur simple changement de capteur.',
			],
			verify: 'Commande manuelle depuis le widget ; état reed mis à jour ; journal HA sans erreur de connexion.',
			tip: 'Home Assistant est un parcours évolutif facultatif en profil Wi-Fi sans box : l’app Shelly suffit pour débuter.',
		}),
		richStep({
			title: stepTitle(uc, 8, 'Automatisations sécurisées et alertes d’oubli'),
			duration: '20 min',
			level: 'Intermédiaire — automatisations',
			intro:
				'Pour finir, nous mettons en place des alertes utiles (porte ouverte trop longtemps le soir) sans jamais déclencher le moteur automatiquement quand le capteur change — ce serait dangereux.',
			outcome: 'Vous recevez une notification si la porte reste ouverte 15 minutes ; le moteur ne part que sur action explicite.',
			beforeStart: 'Entités capteur et switch nommées, application mobile HA ou Shelly pour notifications.',
			actions: [
				'Créez une automatisation « Porte ouverte > 15 min » : déclencheur état ouvert pendant for: 00:15:00, action notify ou persistent_notification.',
				'Ne liez jamais le capteur à switch.turn_on du relais moteur.',
				'Option : script « Impulsion garage » appelé uniquement par bouton ou voix confirmée.',
				'Testez en laissant la porte ouverte : la notification arrive sans mouvement moteur spontané.',
			],
			verify: 'Ouverture prolongée → notification ; capteur seul → aucune impulsion moteur dans le journal.',
			tip: 'Anti-boucle : si une automatisation commande le relais, ajoutez une condition « capteur fermé » ou mode single.',
		}),
	];
}

/** @param {typeof USE_CASES[0]} uc */
function genericSteps(uc, theme) {
	const labels = [
		['Préparer la sécurité et repérer les points de câblage', '10 min', 'Débutant — sécurité'],
		['Vérifier la compatibilité matérielle avec votre installation', '15 min', 'Débutant'],
		['Monter le module principal selon le schéma électrique', '30 min', 'Électricité 230 V — hors tension'],
		['Mettre sous tension et connecter au réseau (Wi-Fi ou Zigbee)', '20 min', 'Débutant — logiciel'],
		['Régler les paramètres indispensables du module', '15 min', 'Intermédiaire'],
		['Ajouter capteurs ou retour d’état si prévu', '20 min', 'Débutant'],
		['Configurer smartphone et parcours Home Assistant optionnel', '25 min', 'Intermédiaire'],
		['Tester, automatiser prudemment et documenter', '20 min', 'Intermédiaire'],
	];
	return labels.map(([label, duration, level], i) => {
		const n = i + 1;
		return richStep({
			title: stepTitle(uc, n, label),
			duration,
			level,
			intro: `Dans cette étape du projet « ${uc.title} », nous ${label.toLowerCase()}. ${theme} Cette progression fait partie des huit étapes structurées pour obtenir un résultat fiable, testable et compréhensible même si vous débutez en domotique.`,
			outcome: `À la fin de l’étape ${n}, vous pouvez cocher cette partie du projet : ${label.toLowerCase()} est validée avec un contrôle concret.`,
			beforeStart: `${uc.meta.tools} ; matériel listé dans le configurateur ; notice fabricant ; coupure disjoncteur si le schéma implique du 230 V.`,
			actions: [
				`Relisez le schéma électrique et la variante technique choisie dans l’URL (?tech=) pour ce projet.`,
				`Appliquez la procédure détaillée du fabricant (Shelly, Sonoff, Aqara…) en respectant les couleurs de fils L/N/terre ou contact sec.`,
				`Notez les repères de fils (Wago 221) et prenez une photo avant fermeture du boîtier.`,
				`Passez au contrôle décrit ci-dessous avant d’enchaîner sur l’étape ${n + 1 <= 8 ? n + 1 : 'suivante'}.`,
			],
			verify:
				'LED module ou état dans l’application cohérent avec l’action réalisée ; aucun disjoncteur ne disjoncte ; comportement manuel d’origine conservé si applicable.',
			tip: 'En cas de doute sur une borne, coupez le disjoncteur et mesurez (VAT) plutôt que d’essayer sous tension.',
		});
	});
}

/** @param {typeof USE_CASES[0]} uc */
function stepsFor(uc) {
	if (uc.id === 'garage-porte-smartphone' || uc.id === 'portail-electrique') return garageSteps(uc);
	const theme =
		uc.category === 'eclairage'
			? 'Respectez la présence ou l’absence de neutre en boîte DCL.'
			: uc.category === 'chauffage-eau'
				? 'Respectez fil pilote ou contact sec chaudière selon le schéma.'
				: 'Suivez le schéma fonctionnel puis le schéma électrique de la page.';
	return genericSteps(uc, theme);
}

/** @param {typeof USE_CASES[0]} uc */
function introductionFor(uc) {
	const daily =
		uc.id === 'garage-porte-smartphone'
			? 'Vous rentrez en voiture sous la pluie : un appui sur le smartphone ouvre la porte sans sortir du véhicule. Plus tard, depuis le salon, vous vérifiez que le battant est bien fermé grâce au capteur reed.'
			: `Situation concrète : vous gagnez du temps au quotidien sur « ${uc.title.toLowerCase()} » sans refaire toute l’installation — le module s’ajoute à l’existant quand le schéma le permet.`;
	return {
		why: `Ce projet répond au besoin : ${uc.shortDesc} Vous gardez la maîtrise locale (sans abonnement cloud obligatoire) et vous choisissez entre application mobile simple ou Home Assistant avancé.`,
		smartphone:
			'Depuis le smartphone, vous commandez via l’application du module (Wi-Fi sans box) ou via Home Assistant (profil Zigbee/HA). Les widgets et notifications restent sur votre réseau local.',
		manualControls:
			'Les interrupteurs muraux, télécommandes radio ou boutons poussoir d’origine restent en général actifs si le câblage est fait en parallèle ou en respectant le mode impulsion/contact sec.',
		subscription:
			'Aucun abonnement n’est requis pour Shelly, Sonoff ou Home Assistant self-hosted. Seules les apps fabricant peuvent proposer des options cloud facultatives.',
		homeAssistant:
			'Home Assistant n’est pas obligatoire en profil Économique Wi-Fi : l’app Shelly Smart Control suffit. HA devient pertinent pour automatiser plusieurs pièces et croiser capteurs.',
		stateFeedback:
			'Le retour d’état passe par capteurs (reed, contact, puissance) : ne confondez pas la commande (relais) et la confirmation réelle.',
		safety: uc.mainRole.includes('230') || uc.id.includes('fil-pilote')
			? 'Coupez le disjoncteur concerné, vérifiez l’absence de tension (VAT) et respectez la section NFC 15-100.'
			: 'Respectez les notices, courants max des relais (8 A contact sec) et ne shuntez jamais les sécurités motorisation.',
		dailyCase: daily,
	};
}

/** @type {Record<string, ReturnType<typeof richStep>[]>>} */
const TUTORIAL_STEPS = {};
/** @type {Record<string, ReturnType<typeof introductionFor>>} */
const PROJECT_INTRODUCTIONS = {};

for (const uc of USE_CASES) {
	TUTORIAL_STEPS[uc.id] = stepsFor(uc);
	PROJECT_INTRODUCTIONS[uc.id] = introductionFor(uc);
}

const out = `/** Généré par scripts/generate-pedagogical-tutorials.mjs — ne pas éditer à la main */
export const TUTORIAL_STEPS = ${JSON.stringify(TUTORIAL_STEPS, null, '\t')};

export const PROJECT_INTRODUCTIONS = ${JSON.stringify(PROJECT_INTRODUCTIONS, null, '\t')};
`;

writeFileSync(new URL('../src/data/smartHomeProjectTutorials.mjs', import.meta.url), out);
console.log('Wrote smartHomeProjectTutorials.mjs for', USE_CASES.length, 'projects');
