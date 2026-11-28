/**
 * Accueil refondu (28/11/2026) : textes et destinations par langue.
 * Toutes les URL pointent vers des pages existantes (vérifiées au build par tools/verif-liens-accueil).
 * Images éditoriales : /images/editorial/re-<clé>-{480,800,1200}.webp (illustrations Canva, pas des photos de test).
 */
import { NOEL_PATHS } from './noelGuideI18n.mjs';

const ED = (k) => `/images/editorial/re-${k}`;

export const AGE_IMG = ['age-4-5', 'age-5-7', 'age-8-9', 'age-10-12', 'age-12-14', 'age-14-plus'].map(ED);
export const PROJECT_IMG = ['projet-mbot', 'projet-scratch', 'projet-arduino', 'projet-python'].map(ED);

export const HOME_RE = {
	fr: {
		ill: 'Illustration',
		photo: 'Photo du fabricant',
		hero: {
			kicker: 'Robotique éducative pour les 4 à 15 ans',
			lead: 'Des guides par âge, des comparatifs et des tutoriels pour choisir un robot programmable adapté au niveau de l’enfant, à la maison comme en classe.',
			cta1: 'Trouver le bon robot',
			cta1Href: '/outil-quel-robot-enfant/',
			cta2: 'Voir les guides par âge',
			guidesLabel: 'guides et tutoriels publiés',
			methodLabel: 'Notre méthode',
			methodHref: '/about/',
			imgAlt: 'Illustration : un parcours dessiné sur papier, une tablette avec des blocs de programmation et des pièces de robot',
			productCaption: 'Photo produit',
		},
		intents: {
			title: 'Par où commencer ?',
			items: [
				{ title: 'Choisir un robot pour un enfant', text: 'Le quiz propose des modèles selon l’âge et le niveau, puis renvoie vers le guide détaillé.', cta: 'Faire le quiz', href: '/outil-quel-robot-enfant/' },
				{ title: 'Réaliser un projet ou apprendre à programmer', text: 'Activités mBot, Scratch, Arduino et cours Python pas à pas.', cta: 'Voir les projets', href: '#projets' },
				{ title: 'Équiper une classe', text: 'Budget, kit robotique, fiches de séance et ressources techniques.', cta: 'Ressources enseignants', href: '#enseignants' },
			],
		},
		ages: {
			title: 'Choisir selon l’âge et l’accompagnement',
			lead: 'Repères indicatifs : le niveau de l’enfant et l’aide disponible comptent autant que l’âge.',
			activity: 'Activité',
			help: 'Accompagnement',
			cta: 'Lire le guide',
			items: [
				{ age: '4-5 ans', title: 'Découvrir la logique sans écran', activity: 'Cartes, boutons et parcours au sol', help: 'Adulte présent', href: '/robot-enfant-4-ans/' },
				{ age: '5-7 ans', title: 'Premières séquences', activity: 'Robots à boutons, blocs visuels très simples', help: 'Adulte à proximité', href: '/quel-robot-acheter-enfant-5-ans-guide-achat/' },
				{ age: '8-9 ans', title: 'Programmer par blocs avec des capteurs', activity: 'Suivi de ligne, obstacles, lumières', help: 'Aide au démarrage', href: '/quel-robot-acheter-enfant-8-ans-guide-achat/' },
				{ age: '10-12 ans', title: 'Des projets plus longs', activity: 'Blocs puis premiers pas en code écrit selon l’aisance', help: 'Autonomie croissante', href: '/quel-robot-acheter-enfant-10-ans-guide-achat/' },
				{ age: '12-14 ans', title: 'Électronique et montage', activity: 'Kits à câbler, cartes type Arduino', help: 'Autonome avec la documentation', href: '/quel-robot-acheter-enfant-12-ans-guide-achat/' },
				{ age: '14 ans et +', title: 'Projets autonomes', activity: 'Raspberry Pi, Linux, vision, objets connectés', help: 'Autonome', href: '/robot-programmable-14-ans-ado/' },
			],
		},
		season: {
			noel: { kicker: 'Noël 2026', title: 'Le guide cadeaux robotique par âge et par budget', text: 'Une sélection mise à jour pour la saison, avec les mêmes repères d’âge que nos guides permanents. Vérifiez le prix du jour chez le marchand.', cta: 'Ouvrir le guide de Noël', href: NOEL_PATHS.fr, img: '/images/illustrations/robot-educatif-cadeau-noel-2026.webp', imgAlt: 'Illustration : des enfants découvrent un petit robot au pied du sapin' },
			off: { kicker: 'Guides par budget', title: 'Choisir un robot selon son budget', text: 'Des repères de prix pour comparer avant d’acheter.', cta: 'Robots autour de 200 €', href: '/quel-robot-educatif-autour-de-200-euros-guide-2026/' },
		},
		products: {
			title: 'Des robots expliqués avant l’achat',
			lead: 'Quatre modèles très présents dans nos guides, avec ce qu’il faut savoir avant de choisir.',
			ages: 'Âge indiqué',
			code: 'Programmation',
			guide: 'Lire l’analyse',
			buy: 'Voir sur Amazon',
			priceOn: 'Prix relevé le',
			disclosure: 'Liens marchands affiliés : un achat peut nous rapporter une commission, sans surcoût pour vous. Le prix qui compte est celui affiché chez le marchand.',
			all: 'Comparer tous les robots par âge',
			allHref: '/meilleur-robot-programmable-enfant-2026/',
			tags: { scratch: 'Pour découvrir Scratch', python: 'Passage à Python possible', arduino: 'Code Arduino', build: 'À monter soi-même', screen: 'Écran intégré' },
			guides: { mbot: '/mbot-avis-faut-il-acheter-pour-un-enfant/', mbot2: '/mbot2-de-makeblock-le-robot-educatif-pour-apprendre-la-robotique/', 'codey-rocky': '/mbot-vs-codey-rocky-comparatif/', 'elegoo-penguin': '/marque-elegoo/' },
		},
		projects: {
			title: 'Projets pour apprendre et créer',
			lead: 'Des activités guidées, de la première séquence au programme complet.',
			items: [
				{ kicker: 'mBot', title: '10 projets mBot gratuits', text: 'Suivi de ligne, obstacles, sons : des séances prêtes à l’emploi.', href: '/10-projets-mbot-gratuits-classe-faciles/' },
				{ kicker: 'Scratch', title: 'Premiers programmes par blocs', text: 'Une activité courte pour comprendre boucles et déplacements.', href: '/activite-scratch-le-carre/' },
				{ kicker: 'Arduino', title: 'Le C Arduino pas à pas', text: 'Structure d’un sketch, variables, capteurs et actionneurs.', href: '/programmation/arduino-c/' },
				{ kicker: 'Python', title: 'Cours Python et mini-jeux', text: 'Variables, boucles, puis jeux complets en console.', href: '/programmation/python/' },
			],
			more: 'Tous les parcours de programmation',
			moreHref: '/programmation/',
		},
		teachers: {
			title: 'Ressources pour les enseignants',
			lead: 'Préparer une séquence, chiffrer un équipement et réutiliser des supports.',
			imgAlt: 'Illustration : une séance de robotique en classe avec des bacs de pièces et des tablettes',
			items: [
				{ title: 'Budget classe', text: 'Estimez le coût selon l’effectif et le modèle de robot.', cta: 'Calculer le budget', href: '/calculateur-budget-robot-classe/' },
				{ title: 'Kit robotique', text: 'Composez un kit et exportez un devis pour l’établissement.', cta: 'Configurer le kit', href: '/configurateur-kit-robotique-classe/' },
				{ title: 'Fiches de séance', text: 'Générez une fiche PDF : déroulé, compétences, évaluation.', cta: 'Créer une fiche', href: '/generateur-fiche-seance-robotique-pdf/' },
				{ title: 'Ressources techniques', text: 'Schémas SVG des capteurs mBot, réglages et dépannage.', cta: 'Voir les schémas', href: '/ressources-svg-schemas-mbot-capteurs/' },
			],
			guide: 'Guide : équiper une classe en robots',
			guideHref: '/equiper-classe-robots-budget-packs-2026/',
		},
		tools: {
			title: 'Outils pour les utilisateurs de robots',
			items: [
				{ title: 'Réglages capteurs mBot2', text: 'Valeurs de départ et pistes de dépannage.', href: '/tableau-reglages-capteurs-mbot2-depannage/' },
				{ title: 'Compatibilité Makeblock', text: 'Quels accessoires avec quel robot.', href: '/compatibilite-makeblock/' },
				{ title: 'Dépannage mBlock', text: 'Codes d’erreur et problèmes de connexion.', href: '/mblock-depannage-codes-erreurs-mbot-arduino/' },
			],
		},
		domo: {
			imgAlt: 'Illustration : un salon familial avec des capteurs discrets et une tablette murale',
		},
		latest: { title: 'Derniers guides et articles', series: 'Dossier', articles: 'articles', all: 'Voir tous les articles', allHref: '/blog/' },
		author: {
			title: 'Qui écrit ces guides ?',
			text: 'Robot Éducatif est rédigé par Emmanuel Sauvage. Les articles indiquent clairement s’il s’agit d’un essai réalisé avec le matériel (montage, premiers programmes, photos) ou d’une analyse documentaire fondée sur les fiches des fabricants.',
			cta: 'Notre méthode et nos critères',
			href: '/about/',
		},
		partners: { title: 'Vous êtes une marque ?', text: 'Tests produits, tutoriels et présence sur YouTube et Pinterest.', cta: 'Découvrir le partenariat', href: '/partenariat/' },
	},
};

const EN_BASE = {
	ill: 'Illustration',
	photo: 'Manufacturer photo',
	hero: {
		kicker: 'Educational robotics for ages 4 to 15',
		lead: 'Age-based guides, comparisons and tutorials to choose a coding robot that fits the child’s level, at home or in the classroom.',
		cta1: 'Find the right robot',
		cta1Href: '/en/which-educational-robot-by-age/',
		cta2: 'Guides by age',
		guidesLabel: 'guides and tutorials in English',
		methodLabel: null,
		imgAlt: 'Illustration: a track drawn on paper, a tablet with coding blocks and robot parts',
		productCaption: 'Product photo',
	},
	intents: {
		title: 'Where to start?',
		items: [
			{ title: 'Choose a robot for a child', text: 'The quiz suggests models by age and level, then links to the full guide.', cta: 'Take the quiz', href: '/en/which-educational-robot-by-age/' },
			{ title: 'Build a project or learn to code', text: 'mBot activities, Scratch, Arduino and step-by-step Python.', cta: 'See projects', href: '#projets' },
			{ title: 'Equip a classroom', text: 'Budget, robot packs, class projects and technical resources.', cta: 'Teacher resources', href: '#enseignants' },
		],
	},
	ages: {
		title: 'Choose by age and support',
		lead: 'Indicative milestones: the child’s level and the help available matter as much as age.',
		activity: 'Activity',
		help: 'Support',
		cta: 'Read the guide',
		items: [
			{ age: 'Ages 4-5', title: 'Logic without a screen', activity: 'Cards, buttons and floor tracks', help: 'Adult present', href: '/en/best-robot-for-a-4-year-old/' },
			{ age: 'Ages 5-7', title: 'First sequences', activity: 'Button robots, very simple visual blocks', help: 'Adult nearby', href: '/en/best-robot-for-a-5-year-old/' },
			{ age: 'Ages 8-9', title: 'Block coding with sensors', activity: 'Line following, obstacles, lights', help: 'Help to get started', href: '/en/best-robot-for-an-8-year-old/' },
			{ age: 'Ages 10-12', title: 'Longer projects', activity: 'Blocks, then first typed code when ready', help: 'Growing independence', href: '/en/best-robot-for-a-10-year-old/' },
			{ age: 'Ages 12-14', title: 'Electronics and building', activity: 'Wiring kits, Arduino-type boards', help: 'Independent with docs', href: '/en/best-robot-for-a-12-year-old/' },
			{ age: 'Ages 14+', title: 'Independent projects', activity: 'Raspberry Pi, Linux, vision, IoT', help: 'Independent', href: '/en/best-robot-for-a-14-year-old/' },
		],
	},
	season: {
		noel: { kicker: 'Christmas 2026', title: 'The robotics gift guide by age and budget', text: 'A seasonal selection that uses the same age milestones as our permanent guides. Always check today’s price at the shop.', cta: 'Open the Christmas guide', href: NOEL_PATHS.en, img: '/images/illustrations/robot-educatif-cadeau-noel-2026.webp', imgAlt: 'Illustration: children discovering a small robot under the Christmas tree' },
		off: { kicker: 'Budget guides', title: 'Choose a robot by budget', text: 'Price milestones to compare before you buy.', cta: 'Robots under 100', href: '/en/educational-robot-under-100/' },
	},
	products: {
		title: 'Robots explained before you buy',
		lead: 'Four models that appear often in our guides, with what to know before choosing.',
		ages: 'Stated age',
		code: 'Coding',
		guide: 'Read the analysis',
		buy: 'See on Amazon',
		priceOn: 'Price checked on',
		disclosure: 'Affiliate shop links: a purchase may earn us a commission at no extra cost to you. The price that counts is the one shown by the retailer.',
		all: 'Compare all robots by age',
		allHref: '/en/best-programmable-robot-for-kids/',
		tags: { scratch: 'Scratch-style blocks', python: 'Python path', arduino: 'Arduino code', build: 'You build it', screen: 'Built-in screen' },
		guides: { mbot: '/en/mbot-my-first-educational-robot/', mbot2: '/en/mbot2-makeblock-what-it-teaches/', 'codey-rocky': '/en/codey-rocky-makeblock/', 'elegoo-penguin': '/en/elegoo-brand/' },
	},
	projects: {
		title: 'Projects to learn and create',
		lead: 'Guided activities, from a first sequence to a complete program.',
		items: [
			{ kicker: 'mBot', title: '10 free mBot projects', text: 'Line following, obstacles, sounds: ready-to-run sessions.', href: '/en/10-free-mbot-classroom-projects/' },
			{ kicker: 'Scratch', title: 'First block programs', text: 'A short activity on loops and movement.', href: '/en/scratch-activity-square/' },
			{ kicker: 'Arduino', title: 'Arduino C step by step', text: 'Sketch structure, variables, sensors and actuators.', href: '/en/arduino-c/' },
			{ kicker: 'Python', title: 'Python course and mini-games', text: 'Variables and loops, then complete console games.', href: '/en/python-course/' },
		],
		more: 'All coding paths',
		moreHref: '/en/learn-to-code/',
	},
	teachers: {
		title: 'Resources for teachers',
		lead: 'Plan a session, cost the equipment and reuse materials.',
		imgAlt: 'Illustration: a classroom robotics session with parts trays and tablets',
		items: [
			{ title: 'Class budget', text: 'Estimate the cost by class size and robot model.', cta: 'Calculate the budget', href: '/en/class-robot-budget-calculator/' },
			{ title: 'Robot packs', text: 'Which packs to buy for a class, and in what quantity.', cta: 'See the packs', href: '/en/equip-a-classroom-robot-packs-2026/' },
			{ title: 'Class projects', text: 'Ten ready-made mBot sessions for the classroom.', cta: 'See the projects', href: '/en/10-free-mbot-classroom-projects/' },
			{ title: 'Technical resources', text: 'Robots for middle-school technology lessons.', cta: 'Read the guide', href: '/en/robots-for-middle-school-technology/' },
		],
		guide: 'Guide: robots for school',
		guideHref: '/en/robots-for-school/',
	},
	tools: {
		title: 'Tools for robot owners',
		items: [
			{ title: 'mBlock Bluetooth issues', text: 'Pairing and connection checks.', href: '/en/mblock-bluetooth-troubleshooting/' },
			{ title: 'mBlock upload errors', text: 'Arduino upload error messages explained.', href: '/en/mblock-arduino-upload-errors/' },
		],
	},
	domo: { imgAlt: 'Illustration: a family living room with discreet sensors and a wall tablet' },
	latest: { title: 'Latest guides', series: 'Series', articles: 'articles', all: 'All guides', allHref: '/en/buying-guides/' },
	author: {
		title: 'Who writes these guides?',
		text: 'Robot Éducatif is written by Emmanuel Sauvage. Articles say clearly whether they are a hands-on test with the hardware (assembly, first programs, photos) or a documentary analysis based on manufacturer specifications.',
		cta: null,
	},
	partners: null,
};

HOME_RE.en = EN_BASE;
HOME_RE.uk = { ...EN_BASE, season: { ...EN_BASE.season, noel: { ...EN_BASE.season.noel, href: NOEL_PATHS.uk } }, products: { ...EN_BASE.products, allHref: '/uk/best-programmable-robot-for-kids/' } };
HOME_RE.ca = { ...EN_BASE, season: { ...EN_BASE.season, noel: { ...EN_BASE.season.noel, href: NOEL_PATHS.ca } }, products: { ...EN_BASE.products, allHref: '/ca/best-programmable-robot-for-kids/' } };

HOME_RE.de = {
	ill: 'Illustration',
	photo: 'Herstellerfoto',
	hero: {
		kicker: 'Lernroboter für 4- bis 15-Jährige',
		lead: 'Ratgeber nach Alter, Vergleiche und Anleitungen, um einen Programmierroboter passend zum Niveau des Kindes zu wählen, zu Hause oder in der Schule.',
		cta1: 'Den passenden Roboter finden',
		cta1Href: '/de/bester-programmierbarer-roboter-fuer-kinder/',
		cta2: 'Ratgeber nach Alter',
		guidesLabel: 'Ratgeber auf Deutsch',
		methodLabel: null,
		imgAlt: 'Illustration: eine auf Papier gezeichnete Strecke, ein Tablet mit Programmierblöcken und Roboterteile',
		productCaption: 'Produktfoto',
	},
	intents: {
		title: 'Wo anfangen?',
		items: [
			{ title: 'Einen Roboter für ein Kind wählen', text: 'Der Kaufberater ordnet Modelle nach Alter und Niveau ein.', cta: 'Zum Kaufberater', href: '/de/bester-programmierbarer-roboter-fuer-kinder/' },
			{ title: 'Ein Projekt bauen oder programmieren lernen', text: 'mBot-Aktivitäten, Scratch, Arduino und Python Schritt für Schritt.', cta: 'Projekte ansehen', href: '#projets' },
			{ title: 'Eine Klasse ausstatten', text: 'Klassenprojekte, Scratch in der Schule und Altersempfehlungen.', cta: 'Für Lehrkräfte', href: '#enseignants' },
		],
	},
	ages: {
		title: 'Nach Alter und Begleitung wählen',
		lead: 'Richtwerte: Niveau des Kindes und verfügbare Hilfe zählen so viel wie das Alter.',
		activity: 'Aktivität',
		help: 'Begleitung',
		cta: 'Zum Ratgeber',
		items: [
			{ age: '4-5 Jahre', title: 'Logik ohne Bildschirm', activity: 'Karten, Tasten und Bodenstrecken', help: 'Erwachsene dabei', href: '/de/lernroboter-4-jahre/' },
			{ age: '5-7 Jahre', title: 'Erste Abfolgen', activity: 'Tastenroboter, sehr einfache Blöcke', help: 'Erwachsene in der Nähe', href: '/de/lernroboter-5-jahre/' },
			{ age: '8-9 Jahre', title: 'Blöcke und Sensoren', activity: 'Linienfolger, Hindernisse, Lichter', help: 'Hilfe beim Start', href: '/de/lernroboter-8-jahre/' },
			{ age: '10-12 Jahre', title: 'Längere Projekte', activity: 'Blöcke, dann erster getippter Code', help: 'Wachsende Selbstständigkeit', href: '/de/lernroboter-10-jahre/' },
			{ age: '12-14 Jahre', title: 'Elektronik und Aufbau', activity: 'Bausätze zum Verkabeln, Arduino-Boards', help: 'Selbstständig mit Doku', href: '/de/lernroboter-12-jahre/' },
			{ age: 'Ab 14 Jahren', title: 'Eigene Projekte', activity: 'Raspberry Pi, Linux, Kamera, IoT', help: 'Selbstständig', href: '/de/lernroboter-14-jahre/' },
		],
	},
	season: {
		noel: { kicker: 'Weihnachten 2026', title: 'Der Geschenke-Ratgeber nach Alter und Budget', text: 'Eine saisonale Auswahl mit denselben Altersstufen wie unsere Ratgeber. Tagespreis immer beim Händler prüfen.', cta: 'Zum Weihnachtsratgeber', href: NOEL_PATHS.de, img: '/images/illustrations/robot-educatif-cadeau-noel-2026.webp', imgAlt: 'Illustration: Kinder entdecken einen kleinen Roboter unter dem Weihnachtsbaum' },
		off: { kicker: 'Nach Budget', title: 'Einen Roboter nach Budget wählen', text: 'Preisstufen zum Vergleichen vor dem Kauf.', cta: 'Lernroboter unter 100 €', href: '/de/lernroboter-unter-100-euro/' },
	},
	products: {
		title: 'Roboter vor dem Kauf erklärt',
		lead: 'Vier Modelle aus unseren Ratgebern, mit dem Wichtigsten vor der Wahl.',
		ages: 'Altersangabe',
		code: 'Programmierung',
		guide: 'Zur Analyse',
		buy: 'Bei Amazon.de ansehen',
		priceOn: 'Preis erfasst am',
		disclosure: 'Werbelinks: Bei einem Kauf erhalten wir eine Provision, für Sie ändert sich der Preis nicht. Maßgeblich ist der Preis beim Händler.',
		all: 'Alle Roboter nach Alter vergleichen',
		allHref: '/de/bester-programmierbarer-roboter-fuer-kinder/',
		tags: { scratch: 'Scratch-Blöcke', python: 'Python möglich', arduino: 'Arduino-Code', build: 'Zum Selberbauen', screen: 'Eingebauter Bildschirm' },
		guides: { mbot: '/de/mbot-vs-mbot2/', mbot2: '/de/mbot-vs-mbot2/', 'codey-rocky': '/de/mbot-vs-codey-rocky/', 'elegoo-penguin': '/de/marke-elegoo/' },
	},
	projects: {
		title: 'Projekte zum Lernen und Gestalten',
		lead: 'Angeleitete Aktivitäten, vom ersten Ablauf bis zum fertigen Programm.',
		items: [
			{ kicker: 'mBot', title: '10 kostenlose mBot-Projekte', text: 'Linienfolger, Hindernisse, Töne: fertige Einheiten.', href: '/de/10-kostenlose-mbot-klassenprojekte/' },
			{ kicker: 'Scratch', title: 'Erste Blockprogramme', text: 'Eine kurze Aktivität zu Schleifen und Bewegung.', href: '/de/scratch-aktivitaet-quadrat/' },
			{ kicker: 'Arduino', title: 'Arduino C Schritt für Schritt', text: 'Sketch-Aufbau, Variablen, Sensoren.', href: '/de/arduino-c/' },
			{ kicker: 'Python', title: 'Vier gewinnt in Python', text: 'Ein komplettes Konsolenspiel in sechs Schritten.', href: '/de/vier-gewinnt-python/' },
		],
		more: 'Alle Anleitungen',
		moreHref: '/de/anleitungen/',
	},
	teachers: {
		title: 'Für Lehrkräfte',
		lead: 'Einheiten vorbereiten und Materialien wiederverwenden.',
		imgAlt: 'Illustration: eine Robotikstunde in der Klasse mit Teilekisten und Tablets',
		items: [
			{ title: 'Klassenprojekte', text: 'Zehn fertige mBot-Einheiten für den Unterricht.', cta: 'Projekte ansehen', href: '/de/10-kostenlose-mbot-klassenprojekte/' },
			{ title: 'Scratch in Schule und Zuhause', text: 'Einstieg in die Blockprogrammierung.', cta: 'Zum Einstieg', href: '/de/scratch-schule-zuhause-einstieg/' },
			{ title: 'Ab welchem Alter?', text: 'Wann Kinder mit dem Programmieren beginnen können.', cta: 'Weiterlesen', href: '/de/ab-welchem-alter-programmieren-kinder/' },
		],
		guide: null,
	},
	tools: null,
	domo: { imgAlt: 'Illustration: ein Familienwohnzimmer mit unauffälligen Sensoren und einem Wandtablet' },
	latest: { title: 'Neueste Ratgeber', series: 'Dossier', articles: 'Artikel', all: 'Alle Ratgeber', allHref: '/de/kaufberater/' },
	author: {
		title: 'Wer schreibt diese Ratgeber?',
		text: 'Robot Éducatif wird von Emmanuel Sauvage geschrieben. Jeder Artikel zeigt, ob es sich um einen Praxistest mit der Hardware oder um eine dokumentarische Analyse auf Basis der Herstellerangaben handelt.',
		cta: null,
	},
	partners: null,
};

HOME_RE.it = {
	ill: 'Illustrazione',
	photo: 'Foto del produttore',
	hero: {
		kicker: 'Robotica educativa dai 4 ai 15 anni',
		lead: 'Guide per età, confronti e tutorial per scegliere un robot programmabile adatto al livello del bambino, a casa o in classe.',
		cta1: 'Trova il robot giusto',
		cta1Href: '/it/miglior-robot-programmabile-per-bambini/',
		cta2: 'Guide per età',
		guidesLabel: 'guide in italiano',
		methodLabel: null,
		imgAlt: 'Illustrazione: un percorso disegnato su carta, un tablet con blocchi di programmazione e parti di robot',
		productCaption: 'Foto prodotto',
	},
	intents: {
		title: 'Da dove iniziare?',
		items: [
			{ title: 'Scegliere un robot per un bambino', text: 'La guida confronta i modelli per età e livello.', cta: 'Apri la guida', href: '/it/miglior-robot-programmabile-per-bambini/' },
			{ title: 'Fare un progetto o imparare a programmare', text: 'Attività mBot, Scratch, Arduino e Python passo per passo.', cta: 'Vedi i progetti', href: '#projets' },
			{ title: 'Attrezzare una classe', text: 'Progetti per la classe, Scratch a scuola e consigli per età.', cta: 'Per gli insegnanti', href: '#enseignants' },
		],
	},
	ages: {
		title: 'Scegliere per età e accompagnamento',
		lead: 'Riferimenti indicativi: il livello del bambino e l’aiuto disponibile contano quanto l’età.',
		activity: 'Attività',
		help: 'Accompagnamento',
		cta: 'Leggi la guida',
		items: [
			{ age: '4-5 anni', title: 'Logica senza schermo', activity: 'Carte, pulsanti e percorsi a terra', help: 'Adulto presente', href: '/it/robot-programmabile-4-anni/' },
			{ age: '5-7 anni', title: 'Prime sequenze', activity: 'Robot a pulsanti, blocchi molto semplici', help: 'Adulto vicino', href: '/it/robot-programmabile-5-anni/' },
			{ age: '8-9 anni', title: 'Blocchi e sensori', activity: 'Segui-linea, ostacoli, luci', help: 'Aiuto all’avvio', href: '/it/robot-programmabile-8-anni/' },
			{ age: '10-12 anni', title: 'Progetti più lunghi', activity: 'Blocchi, poi primo codice scritto', help: 'Autonomia crescente', href: '/it/robot-programmabile-10-anni/' },
			{ age: '12-14 anni', title: 'Elettronica e montaggio', activity: 'Kit da cablare, schede tipo Arduino', help: 'Autonomo con la documentazione', href: '/it/robot-programmabile-12-anni/' },
			{ age: '14 anni e +', title: 'Progetti autonomi', activity: 'Raspberry Pi, Linux, visione, IoT', help: 'Autonomo', href: '/it/robot-programmabile-14-anni/' },
		],
	},
	season: {
		noel: { kicker: 'Natale 2026', title: 'La guida ai regali di robotica per età e budget', text: 'Una selezione stagionale con gli stessi riferimenti di età delle nostre guide. Controlla sempre il prezzo del giorno.', cta: 'Apri la guida di Natale', href: NOEL_PATHS.it, img: '/images/illustrations/robot-educatif-cadeau-noel-2026.webp', imgAlt: 'Illustrazione: bambini scoprono un piccolo robot sotto l’albero di Natale' },
		off: { kicker: 'Per budget', title: 'Scegliere un robot per budget', text: 'Fasce di prezzo per confrontare prima di acquistare.', cta: 'Robot sotto 100 €', href: '/it/robot-educativo-sotto-100-euro/' },
	},
	products: {
		title: 'Robot spiegati prima dell’acquisto',
		lead: 'Quattro modelli presenti nelle nostre guide, con ciò che conta prima di scegliere.',
		ages: 'Età indicata',
		code: 'Programmazione',
		guide: 'Leggi l’analisi',
		buy: 'Vedi su Amazon.it',
		priceOn: 'Prezzo rilevato il',
		disclosure: 'Link affiliati: un acquisto può farci guadagnare una commissione, senza costi aggiuntivi per te. Vale il prezzo mostrato dal venditore.',
		all: 'Confronta tutti i robot per età',
		allHref: '/it/miglior-robot-programmabile-per-bambini/',
		tags: { scratch: 'Blocchi stile Scratch', python: 'Python possibile', arduino: 'Codice Arduino', build: 'Da montare', screen: 'Schermo integrato' },
		guides: { mbot: '/it/mbot-recensione-vale-la-pena/', mbot2: '/it/mbot-vs-mbot2/', 'codey-rocky': '/it/marchio-makeblock/', 'elegoo-penguin': '/it/marchio-elegoo/' },
	},
	projects: {
		title: 'Progetti per imparare e creare',
		lead: 'Attività guidate, dalla prima sequenza al programma completo.',
		items: [
			{ kicker: 'mBot', title: '10 progetti mBot gratuiti', text: 'Segui-linea, ostacoli, suoni: sessioni pronte.', href: '/it/10-progetti-mbot-gratis-classe/' },
			{ kicker: 'Scratch', title: 'Primi programmi a blocchi', text: 'Un’attività breve su cicli e movimenti.', href: '/it/attivita-scratch-il-quadrato/' },
			{ kicker: 'Arduino', title: 'Arduino C passo per passo', text: 'Struttura dello sketch, variabili, sensori.', href: '/it/arduino-c/' },
			{ kicker: 'Python', title: 'Forza quattro in Python', text: 'Un gioco completo in console in sei tappe.', href: '/it/forza-quattro-python/' },
		],
		more: null,
	},
	teachers: {
		title: 'Per gli insegnanti',
		lead: 'Preparare una sessione e riutilizzare i materiali.',
		imgAlt: 'Illustrazione: una lezione di robotica in classe con vaschette di componenti e tablet',
		items: [
			{ title: 'Progetti per la classe', text: 'Dieci sessioni mBot pronte all’uso.', cta: 'Vedi i progetti', href: '/it/10-progetti-mbot-gratis-classe/' },
			{ title: 'Scratch a scuola e a casa', text: 'Primi passi nella programmazione a blocchi.', cta: 'Inizia', href: '/it/scratch-scuola-casa-inizio/' },
			{ title: 'A che età iniziare?', text: 'Quando i bambini possono iniziare a programmare.', cta: 'Leggi', href: '/it/a-che-eta-iniziare-programmazione-bambini/' },
		],
		guide: null,
	},
	tools: null,
	domo: { imgAlt: 'Illustrazione: un soggiorno di famiglia con sensori discreti e un tablet a parete' },
	latest: null,
	author: {
		title: 'Chi scrive queste guide?',
		text: 'Robot Éducatif è scritto da Emmanuel Sauvage. Ogni articolo indica se si tratta di una prova con l’hardware o di un’analisi documentale basata sulle schede dei produttori.',
		cta: null,
	},
	partners: null,
};

HOME_RE.es = {
	ill: 'Ilustración',
	photo: 'Foto del fabricante',
	hero: {
		kicker: 'Robótica educativa de 4 a 15 años',
		lead: 'Guías por edad, comparativas y tutoriales para elegir un robot programable adaptado al nivel del niño, en casa o en clase.',
		cta1: 'Encontrar el robot adecuado',
		cta1Href: '/es/mejor-robot-programable-para-ninos/',
		cta2: 'Guías por edad',
		guidesLabel: 'guías en español',
		methodLabel: null,
		imgAlt: 'Ilustración: un recorrido dibujado en papel, una tableta con bloques de programación y piezas de robot',
		productCaption: 'Foto del producto',
	},
	intents: {
		title: '¿Por dónde empezar?',
		items: [
			{ title: 'Elegir un robot para un niño', text: 'La guía compara modelos por edad y nivel.', cta: 'Abrir la guía', href: '/es/mejor-robot-programable-para-ninos/' },
			{ title: 'Hacer un proyecto o aprender a programar', text: 'Actividades mBot, Scratch, Arduino y Python paso a paso.', cta: 'Ver proyectos', href: '#projets' },
			{ title: 'Equipar una clase', text: 'Proyectos para clase, Scratch en la escuela y consejos por edad.', cta: 'Para docentes', href: '#enseignants' },
		],
	},
	ages: {
		title: 'Elegir según la edad y el acompañamiento',
		lead: 'Referencias orientativas: el nivel del niño y la ayuda disponible cuentan tanto como la edad.',
		activity: 'Actividad',
		help: 'Acompañamiento',
		cta: 'Leer la guía',
		items: [
			{ age: '4-5 años', title: 'Lógica sin pantalla', activity: 'Tarjetas, botones y recorridos en el suelo', help: 'Adulto presente', href: '/es/robot-programable-4-anos/' },
			{ age: '5-7 años', title: 'Primeras secuencias', activity: 'Robots de botones, bloques muy sencillos', help: 'Adulto cerca', href: '/es/robot-programable-5-anos/' },
			{ age: '8-9 años', title: 'Bloques y sensores', activity: 'Sigue-líneas, obstáculos, luces', help: 'Ayuda para empezar', href: '/es/robot-programable-8-anos/' },
			{ age: '10-12 años', title: 'Proyectos más largos', activity: 'Bloques y luego primer código escrito', help: 'Autonomía creciente', href: '/es/robot-programable-10-anos/' },
			{ age: '12-14 años', title: 'Electrónica y montaje', activity: 'Kits para cablear, placas tipo Arduino', help: 'Autónomo con la documentación', href: '/es/robot-programable-12-anos/' },
			{ age: '14 años y +', title: 'Proyectos autónomos', activity: 'Raspberry Pi, Linux, visión, IoT', help: 'Autónomo', href: '/es/robot-programable-14-anos/' },
		],
	},
	season: {
		noel: { kicker: 'Navidad 2026', title: 'La guía de regalos de robótica por edad y presupuesto', text: 'Una selección de temporada con las mismas referencias de edad que nuestras guías. Comprueba siempre el precio del día.', cta: 'Abrir la guía de Navidad', href: NOEL_PATHS.es, img: '/images/illustrations/robot-educatif-cadeau-noel-2026.webp', imgAlt: 'Ilustración: niños descubren un pequeño robot bajo el árbol de Navidad' },
		off: { kicker: 'Por presupuesto', title: 'Elegir un robot según el presupuesto', text: 'Rangos de precio para comparar antes de comprar.', cta: 'Robots por menos de 100 €', href: '/es/robot-educativo-menos-de-100-euros/' },
	},
	products: {
		title: 'Robots explicados antes de comprar',
		lead: 'Cuatro modelos presentes en nuestras guías, con lo que hay que saber antes de elegir.',
		ages: 'Edad indicada',
		code: 'Programación',
		guide: 'Leer el análisis',
		buy: 'Ver en Amazon.es',
		priceOn: 'Precio registrado el',
		disclosure: 'Enlaces de afiliado: una compra puede generarnos una comisión, sin coste adicional para ti. Vale el precio que muestra el vendedor.',
		all: 'Comparar todos los robots por edad',
		allHref: '/es/mejor-robot-programable-para-ninos/',
		tags: { scratch: 'Bloques estilo Scratch', python: 'Python posible', arduino: 'Código Arduino', build: 'Para montar', screen: 'Pantalla integrada' },
		guides: { mbot: '/es/mbot-opinion-vale-la-pena/', mbot2: '/es/mbot-vs-mbot2/', 'codey-rocky': '/es/marca-makeblock/', 'elegoo-penguin': '/es/marca-elegoo/' },
	},
	projects: {
		title: 'Proyectos para aprender y crear',
		lead: 'Actividades guiadas, de la primera secuencia al programa completo.',
		items: [
			{ kicker: 'mBot', title: '10 proyectos mBot gratis', text: 'Sigue-líneas, obstáculos, sonidos: sesiones listas.', href: '/es/10-proyectos-mbot-gratis-clase/' },
			{ kicker: 'Scratch', title: 'Primeros programas con bloques', text: 'Una actividad corta sobre bucles y movimientos.', href: '/es/actividad-scratch-el-cuadrado/' },
			{ kicker: 'Arduino', title: 'Arduino C paso a paso', text: 'Estructura del sketch, variables, sensores.', href: '/es/arduino-c/' },
			{ kicker: 'Python', title: 'Conecta 4 en Python', text: 'Un juego completo en consola en seis etapas.', href: '/es/conecta-4-python/' },
		],
		more: null,
	},
	teachers: {
		title: 'Para docentes',
		lead: 'Preparar una sesión y reutilizar materiales.',
		imgAlt: 'Ilustración: una sesión de robótica en clase con bandejas de piezas y tabletas',
		items: [
			{ title: 'Proyectos para clase', text: 'Diez sesiones mBot listas para usar.', cta: 'Ver proyectos', href: '/es/10-proyectos-mbot-gratis-clase/' },
			{ title: 'Scratch en la escuela y en casa', text: 'Primeros pasos en programación por bloques.', cta: 'Empezar', href: '/es/scratch-escuela-casa-empezar/' },
			{ title: '¿A qué edad empezar?', text: 'Cuándo pueden empezar a programar los niños.', cta: 'Leer', href: '/es/a-que-edad-empezar-programacion-ninos/' },
		],
		guide: null,
	},
	tools: null,
	domo: { imgAlt: 'Ilustración: un salón familiar con sensores discretos y una tableta de pared' },
	latest: null,
	author: {
		title: '¿Quién escribe estas guías?',
		text: 'Robot Éducatif lo escribe Emmanuel Sauvage. Cada artículo indica si se trata de una prueba con el hardware o de un análisis documental basado en las fichas de los fabricantes.',
		cta: null,
	},
	partners: null,
};
