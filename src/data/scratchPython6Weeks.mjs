export const PARCOURS_PAGE = {
	title: 'Passer de Scratch / mBlock à Python en 6 semaines',
	description:
		'Programme progressif pour une classe ou un club : checklist semaine par semaine, activités mBot et parcours Python du site, version imprimable.',
	intro:
		'Chaque case correspond à une séance d’environ 1 h (ajustez selon votre niveau). Cochez au fil de l’eau : la progression est enregistrée dans votre navigateur.',
};

export const PARCOURS_WEEKS = [
	{
		week: 1,
		title: 'Scratch & logique (sans robot)',
		goal: 'Séquences, boucles, variables dans Scratch.',
		items: [
			{ id: 'w1-scratch-jeu', label: 'Créer un mini-jeu Scratch (mouvements + score)', href: '/scratch-creer-un-jeu-video-premiere-partie/' },
			{ id: 'w1-scratch-carre', label: 'Activité « le carré » (géométrie et répétitions)', href: '/activite-scratch-le-carre/' },
			{ id: 'w1-mblock-vs', label: 'Lire : mBlock vs Scratch (quand passer au robot)', href: '/mblock-vs-scratch-lequel-choisir/' },
		],
	},
	{
		week: 2,
		title: 'Premiers pas mBlock & mBot',
		goal: 'Connexion, téléversement, LED et déplacements.',
		items: [
			{ id: 'w2-install', label: 'Installer mBlock 5 (Windows / Mac)', href: '/installer-mblock-5-sous-windows-10/' },
			{ id: 'w2-premiers-pas', label: 'Premiers pas avec mBlock 5', href: '/premier-pas-avec-mblock-5/' },
			{ id: 'w2-leds', label: 'Activité : faire clignoter les LED', href: '/activite-mbot-faire-clignoter-les-leds/' },
			{ id: 'w2-premier-prog', label: 'Mon premier programme mBot', href: '/mon-premier-programme-mbot/' },
		],
	},
	{
		week: 3,
		title: 'Capteurs & projets guidés',
		goal: 'Ultrason, conditions, mini-projets en binôme.',
		items: [
			{ id: 'w3-distance', label: 'Mesurer des distances (ultrason)', href: '/activite-mbot-mesurer-des-distances/' },
			{ id: 'w3-serie-1', label: 'Série ultrason (1/4) : mesurer', href: '/serie-capteur-ultrason-mbot-1-mesurer-distance/' },
			{ id: 'w3-intrusion', label: 'Détecteur d’intrusion', href: '/activite-mbot-detecteur-dintrusion/' },
			{ id: 'w3-projets', label: '10 projets mBot gratuits pour la classe', href: '/10-projets-mbot-gratuits-classe-faciles/' },
		],
	},
	{
		week: 4,
		title: 'Pont vers le texte (Python en mBlock)',
		goal: 'Mode Python dans mBlock, syntaxe de base.',
		items: [
			{ id: 'w4-logiciel', label: 'Logiciel mBlock : quel choix pour mBot ?', href: '/logiciel-mblock-makeblock-mbot-quel-choisir/' },
			{ id: 'w4-python-intro', label: 'Robot programmable et Python (panorama)', href: '/robot-programmable-python/' },
			{ id: 'w4-py-vars', label: 'Python : variables et affichage', href: '/python-variables-affichage/' },
			{ id: 'w4-py-conditions', label: 'Python : conditions if / else', href: '/python-conditions-if-else/' },
		],
	},
	{
		week: 5,
		title: 'Python autonome (terminal)',
		goal: 'Boucles, fonctions, mini-jeu sans robot.',
		items: [
			{ id: 'w5-boucles', label: 'Python : boucles for et while', href: '/python-boucles-for-while/' },
			{ id: 'w5-fonctions', label: 'Python : fonctions', href: '/python-fonctions/' },
			{ id: 'w5-listes', label: 'Python : listes et chaînes', href: '/python-listes-et-chaines/' },
			{ id: 'w5-mini-jeu', label: 'Mini-jeu au terminal', href: '/python-mini-jeu-terminal/' },
		],
	},
	{
		week: 6,
		title: 'Projet final & consolidation',
		goal: 'Projet choisi (robot ou Python) et bilan.',
		items: [
			{ id: 'w6-pendu', label: 'Projet pendu (série complète)', href: '/programmation/pendu/' },
			{ id: 'w6-mbot2', label: 'Découvrir mBot2 / CyberPi (si évolution)', href: '/mbot2-vs-cyberpi-comparatif/' },
			{ id: 'w6-college', label: 'Robots et technologie au collège', href: '/robots-technologie-college-guide/' },
			{ id: 'w6-budget', label: 'Budget classe (calculateur)', href: '/calculateur-budget-robot-classe/' },
		],
	},
];
