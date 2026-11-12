export const QUIZ_PAGE = {
	title: 'Quel robot éducatif pour quel âge ?',
	description:
		'Quiz en 3 questions (âge, écran ou sans écran, budget) : recommandation immédiate, liens vers nos guides d’achat et boutons partenaires Amazon.',
	intro:
		'**Réponse directe** — Indiquez l’âge, si vous préférez le codage **sans écran** (boutons, cartes) ou avec **tablette / ordinateur** (Scratch, mBlock, Python), et votre budget. Le quiz propose un robot principal, des alternatives et des liens vers nos [guides d’achat 2026](/meilleur-robot-programmable-enfant-2026/) avec prix indicatifs et comparatifs.',
};

export const QUIZ_QUESTIONS = {
	age: {
		label: 'Âge de l’enfant',
		options: [
			{ id: '4-6', label: '4 à 6 ans' },
			{ id: '7-9', label: '7 à 9 ans' },
			{ id: '10-13', label: '10 à 13 ans' },
			{ id: '14+', label: '14 ans et +' },
		],
	},
	screen: {
		label: 'Écran ou sans écran ?',
		options: [
			{ id: 'no-screen', label: 'Sans écran (codage physique / blocs sur robot)' },
			{ id: 'tablet', label: 'Avec tablette ou ordinateur (Scratch, mBlock…)' },
			{ id: 'either', label: 'Les deux me conviennent' },
		],
	},
	budget: {
		label: 'Budget approximatif',
		options: [
			{ id: 'lt100', label: 'Moins de 100 €' },
			{ id: '100-200', label: '100 à 200 €' },
			{ id: '200-500', label: '200 à 500 €' },
			{ id: '500+', label: 'Plus de 500 €' },
		],
	},
};

/** Résultats : ids produits products.json + liens internes */
export const QUIZ_RESULTS = {
	'tale-bot': {
		productId: null,
		name: 'Tale-Bot Pro (Matatalab)',
		ages: '4–8 ans',
		langs: 'Boutons / scénarios',
		href: '/le-robot-tale-bot-de-chez-matatalab-un-outil-educatif-pour-enfants/',
		asin: 'B09LYTM5BC',
		summary: 'Idéal maternelle–CP : programmation sans écran, histoires et cartes.',
	},
	'code-and-go': {
		productId: 'code-and-go-souris',
		name: 'Code & Go (souris robot)',
		ages: 'Dès 4 ans',
		langs: 'Boutons directionnels',
		href: '/robot-enfant-4-ans/',
		summary: 'Premier pas logique et déplacements, sans logiciel.',
	},
	botley: {
		productId: 'botley-2',
		name: 'Botley 2.0',
		ages: '5–9 ans',
		langs: 'Télécommande / cartes',
		href: '/robot-educatif-sans-ecran-guide/',
		summary: 'Robot de codage sans écran, obstacles et ligne.',
	},
	'codey-rocky': {
		productId: 'codey-rocky',
		name: 'Makeblock Codey Rocky',
		ages: '6–12 ans',
		langs: 'Scratch / Python',
		href: '/robot-educatif-codey-rocky-makeblock/',
		summary: 'Ludique, capteurs intégrés, bon pont vers Scratch.',
	},
	mbot: {
		productId: 'mbot',
		name: 'Makeblock mBot',
		ages: '8–12 ans',
		langs: 'Scratch / Arduino',
		href: '/mbot-mon-premier-robot-educatif/',
		summary: 'Classique école : montage rapide, nombreux projets mBlock.',
	},
	mbot2: {
		productId: 'mbot2',
		name: 'Makeblock mBot2',
		ages: '10–14 ans',
		langs: 'Scratch / Python',
		href: '/mbot2-de-makeblock-le-robot-educatif-pour-apprendre-la-robotique/',
		summary: 'CyberPi, Wi-Fi, capteurs mBuild : idéal collège et Python.',
	},
	cyberpi: {
		productId: 'cyberpi',
		name: 'Makeblock CyberPi',
		ages: '10+ ans',
		langs: 'Scratch / Python',
		href: '/decouvrez-makeblock-cyberpi-une-carte-de-developpement-electronique-polyvalente/',
		summary: 'Carte polyvalente IoT si l’enfant a déjà un châssis ou un projet fixe.',
	},
	'elegoo-car': {
		productId: 'elegoo-robot-car',
		name: 'ELEGOO kit voiture robot',
		ages: '13+ ans',
		langs: 'Arduino C',
		href: '/meilleur-robot-educatif-arduino-kit-choisir/',
		summary: 'Montage plus long, C sur Arduino, excellent pour lycée.',
	},
	'rpi5': {
		productId: 'raspberry-pi-5-4gb',
		name: 'Raspberry Pi 5 (4 Go)',
		ages: '12+ ans',
		langs: 'Python / Linux',
		href: '/raspberry-pi-ou-kit-robot-ado-guide/',
		summary: 'Pour ados autonomes : domotique, IA légère, projets serveur.',
	},
};
