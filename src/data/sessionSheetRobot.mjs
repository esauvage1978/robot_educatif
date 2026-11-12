export const SESSION_PAGE = {
	title: 'Générateur de fiche de séance robotique (PDF imprimable)',
	description:
		'Composez une fiche de séance pédagogique Robotique & Programmation pour le Cycle 2, 3, 4 ou le lycée : matériel mBot / mBot2 / CyberPi, compétences Éduscol, déroulé minuté, blocs Scratch ou Python et grille d’évaluation — à imprimer ou enregistrer en PDF.',
	intro:
		'Renseignez le cycle, le robot et la durée : la fiche se met à jour en direct. Utilisez « Imprimer » pour obtenir un PDF via votre navigateur (Ctrl+P). Les compétences s’alignent sur les attendus du socle et des programmes de technologie / NSI.',
};

export const CYCLES = [
	{
		id: 'c2',
		label: 'Cycle 2 (CP–CM2)',
		competencies: [
			'Identifier une suite d’instructions et la mettre en ordre (logique séquentielle).',
			'Tester un programme simple et corriger une erreur évidente (débogage guidé).',
			'Utiliser un robot ou un simulateur pour représenter un déplacement ou un effet (LED, son).',
			'Travailler en binôme : écouter, reformuler, partager l’écran ou le robot.',
		],
	},
	{
		id: 'c3',
		label: 'Cycle 3 (6e–3e)',
		competencies: [
			'Écrire et modifier un algorithme avec boucles et conditions (Scratch / mBlock).',
			'Relier capteurs et actionneurs (distance, ligne, moteurs) dans un programme.',
			'Documenter les tests : valeurs lues, comportement attendu vs observé.',
			'Pratiquer la pensée informatique : décomposer un problème, réutiliser des blocs.',
		],
	},
	{
		id: 'c4',
		label: 'Cycle 4 (4e–3e technologie)',
		competencies: [
			'Concevoir une solution robotique simple en respectant des contraintes (temps, sécurité).',
			'Passer du mode blocs au mode texte (Python dans mBlock ou script court).',
			'Analyser le rôle des capteurs dans une chaîne d’information / énergie (technologie).',
			'Évaluer la fiabilité du programme (cas limites, seuils, calibrage).',
		],
	},
	{
		id: 'lycee',
		label: 'Lycée (2de – NSI / STI2D)',
		competencies: [
			'Structurer un programme (fonctions, variables, entrées/sorties capteurs).',
			'Lire une documentation constructeur (broches, protocole série, API mBlock).',
			'Justifier des choix d’algorithmes (suivi de ligne, évitement, régulation).',
			'Présenter une démo reproductible et un mini-rapport (hypothèse, mesures, conclusion).',
		],
	},
];

export const ROBOTS = [
	{
		id: 'mbot2',
		label: 'Makeblock mBot2',
		software: 'mBlock 5 (blocs ou Python)',
		material: [
			'1 mBot2 par binôme (batterie chargée)',
			'1 PC ou tablette avec mBlock 5',
			'Câble USB-C ou Bluetooth appairé',
			'Tapis de ligne ou parcours au sol (ruban noir)',
			'Option : capteur ultrason ou mBuild (selon séance)',
		],
		scratchBlocks: [
			'événement « drapeau vert » / démarrer',
			'moteurs : avancer, reculer, tourner (vitesse %)',
			'afficher sur matrice LED / jouer un son',
			'lire capteur ultrason ou suiveur de ligne',
			'condition « si … alors … sinon »',
			'boucle « répéter » ou « répéter jusqu’à »',
		],
		pythonHints: [
			'from mbot2 import * (ou API mBlock Python)',
			'motor.forward(speed, duration)',
			'ultrasonic.get_distance()',
			'if distance < 15: motor.turn(...)',
		],
	},
	{
		id: 'mbot',
		label: 'Makeblock mBot (mCore)',
		software: 'mBlock 5',
		material: [
			'1 mBot par binôme (piles ou batterie)',
			'PC avec mBlock 5 + câble USB',
			'Capteur ultrason ou suiveur de ligne (ports RJ25)',
			'Parcours ou feuilles pour noter les consignes',
		],
		scratchBlocks: [
			'quand drapeau vert cliqué',
			'porter moteur gauche/droite (PWM)',
			'lire broche analogique / ultrason RJ25',
			'opérateurs de comparaison (<, >)',
			'broadcast et recevoir message (option multi-robots)',
		],
		pythonHints: [
			'import time — boucle while True',
			'lecture port analogique (suiveur)',
			'ajuster seuil line_sensor > 500',
		],
	},
	{
		id: 'cyberpi',
		label: 'Makeblock CyberPi',
		software: 'mBlock 5 (mode CyberPi)',
		material: [
			'1 CyberPi + câble USB par élève ou binôme',
			'Support châssis ou mBot2 si robot complet',
			'Écran CyberPi pour retour utilisateur',
		],
		scratchBlocks: [
			'boutons A/B, écran LED 5×12',
			'gyroscope / accéléromètre intégré',
			'Wi-Fi : envoyer valeur (projet avancé)',
			'contrôle moteurs via hub mBot2',
		],
		pythonHints: [
			'cyberpi.display.show_label(...)',
			'cyberpi.get_pitch_roll_yaw()',
		],
	},
	{
		id: 'codey-rocky',
		label: 'Codey Rocky',
		software: 'mBlock 5 (Codey)',
		material: [
			'1 Codey Rocky par groupe',
			'Tablette ou PC mBlock',
			'Parcours au sol, obstacles légers',
		],
		scratchBlocks: [
			'déplacements précis (cm / degrés)',
			'capteurs couleur et distance intégrés',
			'émoticônes sur la matrice',
			'événements « secouer », « incliner »',
		],
		pythonHints: ['API Codey dans mBlock — scripts courts en mode texte'],
	},
	{
		id: 'tale-bot',
		label: 'Tale-Bot Pro',
		software: 'application Tale-Bot (sans mBlock)',
		material: [
			'1 Tale-Bot par petit groupe',
			'Cartes de commandes ou plateau de codage',
			'Espace dégagé au sol',
		],
		scratchBlocks: [
			'séquences de boutons (avancer, reculer, tourner, enregistrer)',
			'boucles via cartes « répéter »',
			'fonctions / sous-programmes enregistrés',
			'pas de code texte — initiation algorithmique',
		],
		pythonHints: ['Non applicable — séance unplugged ou semi-déconnectée uniquement.'],
	},
];

export const DURATION_OPTIONS = [45, 60, 90, 120];

/** Phases type ; les minutes sont recalculées selon la durée totale. */
export const LESSON_PHASES = [
	{ key: 'hook', label: 'Accroche & rappel des consignes', ratio: 0.12, detail: 'Question de départ, consignes sécurité, distribution du matériel.' },
	{ key: 'demo', label: 'Démonstration / modélisation', ratio: 0.18, detail: 'Enseignant ou élève volontaire : objectif du programme, blocs clés.' },
	{ key: 'practice', label: 'Pratique en binômes', ratio: 0.4, detail: 'Codage, tests sur parcours, feuille de piste ou cahier de bord.' },
	{ key: 'debrief', label: 'Mise en commun & débogage', ratio: 0.18, detail: 'Erreurs fréquentes, échanges, amélioration d’un critère (vitesse, fiabilité).' },
	{ key: 'eval', label: 'Évaluation formative & rangement', ratio: 0.12, detail: 'Grille rapide, auto-évaluation, extinction des robots et rangement.' },
];

export const RUBRIC_CRITERIA = [
	{ id: 'algo', label: 'Algorithme / programme', levels: ['Programme absent ou non fonctionnel', 'Séquence partielle, aide nécessaire', 'Programme fonctionnel avec petites erreurs', 'Programme fiable, optimisé ou commenté'] },
	{ id: 'capteurs', label: 'Utilisation des capteurs', levels: ['Capteur non branché ou ignoré', 'Lecture sans exploitation', 'Condition simple correcte', 'Seuils calibrés, cas limites gérés'] },
	{ id: 'team', label: 'Coopération & démarche', levels: ['Participation passive', 'Répartition inégale', 'Binôme efficace, tests documentés', 'Entraide, débogage argumenté'] },
	{ id: 'oral', label: 'Expression orale (option)', levels: ['Pas d’explication', 'Vocabulaire imprécis', 'Explique le rôle des blocs', 'Présentation structurée avec démo'] },
];

export const DEFAULT_SESSION_TITLES = {
	mbot2: 'Déplacements et capteur ultrason sur mBot2',
	mbot: 'Suivi de ligne avec le mBot',
	cyberpi: 'Gyroscope et affichage sur CyberPi',
	'codey-rocky': 'Parcours à obstacles avec Codey Rocky',
	'tale-bot': 'Séquences et boucles avec Tale-Bot',
};
