/** @typedef {'line'|'ultrasonic'|'gyro'|'light'} SensorKind */
/** @typedef {'mbot'|'mbot2'|'both'} RobotTarget */

export const SENSOR_CALIB_PAGE = {
	title: 'Étalonnage et dépannage capteurs mBot / mBot2',
	description:
		'Tableau interactif : suiveur de ligne Quad RGB, ultrason, gyroscope CyberPi, capteur de lumière — réglages mBlock, valeurs types et pistes de dépannage en classe.',
	intro:
		'Filtrez par robot et par capteur. Les indicateurs donnent une idée du temps et du matériel nécessaires ; testez toujours sur tapis propre et batterie chargée avant un cours.',
};

export const SENSOR_KINDS = {
	line: 'Suiveur de ligne (Quad RGB)',
	ultrasonic: 'Capteur ultrason',
	gyro: 'Gyroscope (CyberPi / mBot2)',
	light: 'Capteur de lumière',
};

export const ROBOT_FILTERS = {
	mbot: 'mBot (RJ25)',
	mbot2: 'mBot2 / CyberPi',
	both: 'Commun',
};

/**
 * @type {Array<{ id: string, sensor: SensorKind, robots: RobotTarget, symptom: string, calibration: string, mblock: string, values: string, difficulty: 1|2|3|4|5, time: string, cost: string, tools: string, caution?: string, guide?: string }>}
 */
export const SENSOR_ROWS = [
	{
		id: 'line-drift',
		sensor: 'line',
		robots: 'mbot2',
		symptom: 'Le robot dérape sur la ligne ou part en courbe',
		calibration:
			'Nettoyer les 4 capteurs RGB ; recalibrer le fond (blanc) et la ligne (noir) via bloc « Quad RGB line follower » en mBlock 5.',
		mblock: 'Extension CyberPi → Capteur ligne → « calibrer » avec robot sur zone unie puis sur trait.',
		values: 'Écart seuil recommandé : 15–35 % entre fond et ligne sur tapis Makeblock.',
		difficulty: 2,
		time: '10–15 min',
		cost: '0 €',
		tools: 'Tapis piste, chiffon microfibre',
		guide: '/serie-capteur-ultrason-mbot-1-mesurer-distance/',
	},
	{
		id: 'line-rj25',
		sensor: 'line',
		robots: 'mbot',
		symptom: 'Suiveur RJ25 ne voit pas la ligne',
		calibration:
			'Vérifier câble RJ25 (broche 1) ; ajuster potentiomètre sur le module si présent ; distance capteur–sol 5–15 mm.',
		mblock: 'Capteur suiveur de ligne (RJ25) : lire valeur analogique, ajuster seuil dans le programme.',
		values: 'Analogique typique : > 500 sur noir, < 300 sur blanc (échelle 0–1023).',
		difficulty: 2,
		time: '10 min',
		cost: '0–14 € (câble RJ25)',
		tools: 'mBlock, tapis',
	},
	{
		id: 'line-ambient',
		sensor: 'line',
		robots: 'both',
		symptom: 'Fonctionne en classe mais pas près de la fenêtre',
		calibration: 'Recalibrer sous la même lumière que l’épreuve ; éviter ombre stroboscopique des néons.',
		mblock: 'Relancer calibration au début de séance ou utiliser seuil adaptatif (moyenne fond).',
		values: '—',
		difficulty: 1,
		time: '5 min',
		cost: '0 €',
		tools: 'Tapis, lumière stable',
	},
	{
		id: 'us-stuck',
		sensor: 'ultrasonic',
		robots: 'both',
		symptom: 'Distance bloquée à 0 ou 300+ cm',
		calibration:
			'Vérifier connecteur (RJ25 port 3 ou mBuild) ; retirer autocollant transport ; orienter la tête vers zone dégagée.',
		mblock: 'Bloc ultrason : afficher distance en continu ; tester main à 10 cm puis 50 cm.',
		values: 'Lecture stable 2–200 cm selon obstacle ; au-delà : -1 ou valeur max selon bloc.',
		difficulty: 2,
		time: '10 min',
		cost: '0 €',
		tools: 'mBlock, règle',
		guide: '/domotique/code-erreur/mbot-ultrasonic-stuck/',
	},
	{
		id: 'us-echo',
		sensor: 'ultrasonic',
		robots: 'mbot2',
		symptom: 'Mesures erratiques sur bureau métallique',
		calibration: 'Incliner légèrement le robot ou ajouter carton sous ultrason intégré CyberPi pour éviter écho.',
		mblock: 'Filtrer avec moyenne sur 3 mesures ou ignorer valeurs < 5 cm.',
		values: 'Latence entre impulsions ≥ 60 ms dans boucle rapide.',
		difficulty: 3,
		time: '15 min',
		cost: '0 €',
		tools: 'Support carton, code mBlock',
	},
	{
		id: 'gyro-drift',
		sensor: 'gyro',
		robots: 'mbot2',
		symptom: 'Rotation imprécise (tourne trop ou pas assez)',
		calibration:
			'CyberPi immobile au démarrage 2 s pour zéro gyro ; bouton C pour reset si disponible dans le programme.',
		mblock: 'Événement démarrage → « réinitialiser gyroscope » ; utiliser angles relatifs plutôt que absolus longue durée.',
		values: 'Dérive < 2°/min acceptable en atelier ; au-delà : reboot carte.',
		difficulty: 3,
		time: '15–20 min',
		cost: '0 €',
		tools: 'mBlock 5, surface plane',
	},
	{
		id: 'gyro-shake',
		sensor: 'gyro',
		robots: 'mbot2',
		symptom: 'Valeurs qui sautent quand les moteurs tournent',
		calibration: 'Réduire vitesse moteurs ; isoler vibrations (joints serrés, roues propres).',
		mblock: 'Limiter accélération dans bloc moteur ; lisser angle avec moyenne glissante.',
		values: '—',
		difficulty: 2,
		time: '10 min',
		cost: '0 €',
		tools: 'Clé Allen fournie',
	},
	{
		id: 'light-threshold',
		sensor: 'light',
		robots: 'mbot',
		symptom: 'Lampe / LED ne s’allume pas au bon seuil',
		calibration: 'Ajuster seuil lumière dans le code ; vérifier port RJ25 et orientation du capteur.',
		mblock: 'Lire « luminosité » ; comparer main au-dessus vs lumière classe.',
		values: '0–100 % ou 0–1023 : seuil courant 40–60 % en salle éclairée.',
		difficulty: 1,
		time: '5–10 min',
		cost: '0 €',
		tools: 'mBlock',
	},
	{
		id: 'light-cyberpi',
		sensor: 'light',
		robots: 'mbot2',
		symptom: 'Capteur lumière intégré CyberPi incohérent',
		calibration: 'Éviter LED RGB allumée face au capteur ; étalonner au début du projet.',
		mblock: 'Bloc lumière carte principale ; désactiver effets LED pendant la mesure.',
		values: 'Différence ombre/main : > 20 points sur échelle mBlock.',
		difficulty: 2,
		time: '10 min',
		cost: '0 €',
		tools: 'mBlock 5',
	},
	{
		id: 'line-dirty',
		sensor: 'line',
		robots: 'both',
		symptom: 'Un seul côté du robot détecte mal',
		calibration: 'Comparer les 4 (mBot2) ou 2 (RJ25) cellules ; remplacer module si une cellule morte.',
		mblock: 'Mode debug : afficher chaque valeur capteur à l’écran CyberPi.',
		values: 'Écart max entre cellules < 10 % après calibration.',
		difficulty: 3,
		time: '20 min',
		cost: '0–52 € (module remplacement)',
		tools: 'Tapis, module spare',
		caution: 'Couper robot avant débranchement capteur.',
	},
];
