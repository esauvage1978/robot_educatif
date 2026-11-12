import { HA_REMOTE, HA_SHELLY, guidePath, marketSearch } from '../../garageDoorLocales/links.mjs';

const p = (...parts) => ({ type: 'p', parts });
const h2 = (id, toc, text) => ({ type: 'h2', id, toc, text });
const h3 = (text) => ({ type: 'h3', text });
const link = (a, href, sponsored = false) => ({ a, href, sponsored });

const PLUS_DOC = 'https://www.shelly.com/blogs/documentation/shelly-plus-1/';
const MINI_DOC = 'https://www.shelly.com/products/shelly-1-mini-gen3';
const AQARA_P2 = 'https://www.aqara.com/en/product/door-and-window-sensor-p2/';
const SONOFF_SNZB = 'https://help.sonoff.tech/docs/snzb-04p';

function pulse(name, entity) {
	return `alias: ${name}
mode: single
sequence:
  - action: switch.turn_on
    target:
      entity_id: ${entity}
  - delay:
      milliseconds: 500
  - action: switch.turn_off
    target:
      entity_id: ${entity}
`;
}

function localeShell({ lang, inLanguage, title, description, howToDescription, articleDescription, tocAria, stepWord, whereWord, checkWord, summaries, qtyLabels, techNotes, steps, faq, blocks }) {
	return {
		lang,
		inLanguage,
		title,
		description,
		howToDescription,
		articleDescription,
		tocAria,
		stepWord,
		whereWord,
		checkWord,
		summaries,
		qtyLabels,
		techNotes,
		steps,
		faq,
		blocks,
	};
}

const frSteps = [
	{
		title: 'Lire la notice avant d’ouvrir le coffret',
		why: 'Le téléphone ne fait que reproduire un bouton déjà prévu. Si ce bouton n’existe pas sur la carte, le projet s’arrête là.',
		where: 'La notice du coffret, pas le capot.',
		actions: [
			'Cherchez l’entrée du bouton mural : start, pas à pas, PP, commande, ou un libellé équivalent. Le schéma montre alors deux bornes.',
			'Si la notice sépare ouverture et fermeture en deux entrées, un seul module ne remplace qu’un bouton. Le pas à pas ci-dessous décrit une entrée unique, celle qui fait partir puis s’arrêter comme le bouton que vous utilisez déjà.',
			'Repérez les cellules, l’entrée d’arrêt et la détection d’obstacle. Ces bornes ne reçoivent pas le relais.',
			'Si la commande ne passe que par une télécommande radio, sans bornier de bouton, n’inventez pas une entrée sur la carte.',
		],
		observe: 'Vous pouvez nommer les deux bornes du bouton que le module devra copier.',
		check: 'Zone dégagée, un appui sur le bouton existant fait partir le portail, un second appui pendant la course l’arrête. C’est le geste que l’impulsion devra refaire.',
	},
	{
		title: 'Couper le circuit, puis seulement ouvrir le coffret',
		why: 'Le bouton est souvent un contact sec, mais le coffret contient le 230 V du moteur.',
		where: 'Le tableau, puis le coffret. Le raccordement fixe au 230 V se fait hors tension, par une personne qualifiée, selon la NF C 15-100.',
		actions: [
			'Identifiez le disjoncteur du portail. S’il n’est pas repéré, ne devinez pas.',
			'Coupez-le. Le bouton et la lampe de signalisation ne doivent plus réagir.',
			'Ouvrez le coffret et photographiez le bornier avant de déplacer un fil. Laissez en place les fils du moteur, de la terre et des cellules.',
			'Si vous ne savez pas contrôler l’absence de tension sur les bornes 230 V, limitez-vous à la photo. Le raccordement de l’alimentation du module se fera par quelqu’un qui sait le faire.',
		],
		observe: 'La photo montre deux bornes de bouton, distinctes de l’alimentation du moteur.',
		check: 'Aucun fil de cellule ni de moteur n’a été retiré.',
	},
	{
		title: 'Choisir le module, puis nommer ses bornes',
		why: 'Le Mini Gen3 et le Plus 1 ont tous les deux un contact libre de potentiel, mais leur alimentation n’est pas la même. Les mélanger envoie le secteur sur la carte du portail.',
		where: 'Le module sur une table, notice ouverte. Fiches : Shelly Plus 1 et Shelly 1 Mini Gen3, sur shelly.com.',
		actions: [
			'Plus 1 : I et O sont le contact. L et N, le 12 V stabilisé, ou le 24–48 V sont trois alimentations différentes. La fiche indique 12 V continu ±10 % sur la borne 12 V, et 24–48 V continu sur la borne +. On ne met pas du 24 V sur la borne 12 V. Couple de serrage : 0,4 N·m. Ambiance : −20 °C à 40 °C, humidité 30 à 70 %.',
			'Mini Gen3 : I et O sont le contact, L et N l’alimentation en 110–240 V seulement. Il n’a pas d’entrée 12 V. La fiche du Mini Gen3 utilisée pour la porte de garage du site indique aussi −20 °C à 40 °C, 30 à 70 % d’humidité, et 0,4 N·m.',
			'SW est une entrée pour un interrupteur du module. Le bouton du portail ne s’y raccorde pas.',
			'Un coffret en plein soleil ou sous la pluie sort de cette fiche. Le module reste dans un volume sec, pas sur le poteau.',
		],
		observe: 'Vous montrez I, O et l’alimentation choisie sans hésiter, et vous savez lequel des deux modules est dans la boîte.',
		check: 'Aucun fil du bouton n’est prévu sur L, N, SW, 12 V ou +.',
	},
	{
		title: 'Raccorder I et O, et alimenter le module à part',
		why: 'Le bouton déjà en place doit continuer de fonctionner. Le module s’ajoute à côté.',
		where: 'Hors tension : les deux bornes du bouton, puis l’alimentation du module.',
		actions: [
			'Deux conducteurs partent de I et de O vers les deux bornes du bouton, en parallèle des fils déjà là. Le sens n’a pas d’importance. Ces deux fils ne transportent pas le 230 V du moteur.',
			'N’envoyez ni la phase ni le neutre sur ces bornes. Ne placez pas le moteur entre I et O : la fiche du Plus 1 parle d’un circuit de charge, ce n’est pas le moteur du portail.',
			'Alimentez le module sur son propre circuit. Plus 1 : 110–240 V sur L et N, ou 12 V stabilisé, ou 24–48 V, seulement après avoir mesuré la sortie accessoire du coffret. Mini Gen3 : 110–240 V sur L et N uniquement. Ce raccordement fixe est du travail électrique.',
			'Si une borne n’accepte pas deux conducteurs, une borne de connexion rapide reprend les deux fils. Sinon elle n’est pas nécessaire. Refermez le coffret avant de réenclencher.',
		],
		observe: 'Le coffret est fermé, le disjoncteur est réenclenché, rien ne chauffe.',
		check: 'Le bouton d’origine fait encore partir et arrêter le portail, zone dégagée, avant tout essai depuis le téléphone.',
	},
	{
		title: 'Régler une impulsion courte, puis essayer une fois',
		why: 'Sans minuteur, le contact peut rester fermé. La carte voit alors un doigt qui ne lâche pas le bouton.',
		where: 'Le Wi-Fi 2,4 GHz, l’interface du Shelly, portail dégagé.',
		actions: [
			'Les deux modules parlent en 2,4 GHz. Un réseau seulement en 5 GHz ne les voit pas. Au coffret, la page du module doit s’ouvrir. Sinon le Wi-Fi du portail est trop faible : rapprochez un point d’accès avant de refermer pour de bon.',
			'Activez l’arrêt automatique de la sortie, vers 0,5 s. Le libellé dépend du firmware : c’est le minuteur de la sortie.',
			'Réservez l’adresse du module dans la box.',
			'Une seule impulsion, personne dans le passage. Si rien ne bouge, passez à 1 s. Si le portail part puis s’arrête tout de suite, l’impulsion est trop longue.',
			'Le cloud Shelly peut rester coupé. Home Assistant parle au module sur le réseau local.',
		],
		observe: 'Le relais colle brièvement, le portail part, un second essai pendant la course l’arrête.',
		check: 'Le bouton d’origine et la télécommande d’origine fonctionnent encore.',
	},
	{
		title: 'Ajouter le module à Home Assistant, sans inventer l’état du vantail',
		why: 'Home Assistant doit voir un interrupteur qui donne l’impulsion. Il ne sait pas, avec cette liste, si le portail est ouvert.',
		where: 'Paramètres, Appareils et services, puis Scripts.',
		actions: [
			'Ajoutez l’intégration Shelly. S’il n’apparaît pas, indiquez l’adresse réservée. Documentation : home-assistant.io/integrations/shelly.',
			'Notez l’identifiant de l’interrupteur dans Outils de développement, États.',
			'Créez un script : allumer, attendre 0,5 s, éteindre, mode single. L’exemple plus bas n’a pas été exécuté sur une installation du site.',
			'Laissez l’arrêt automatique dans le Shelly : il lâche le contact même si le script s’interrompt.',
			'N’ajoutez pas de modèle « portail ouvert » tant que vous n’avez pas un capteur dont vous avez vérifié les états. Un capteur de fenêtre d’intérieur collé sur le vantail n’en est pas un.',
		],
		observe: 'Lancer le script, une fois, passage dégagé, fait le même mouvement que le bouton.',
		check: 'Le script ne part pas tout seul quand vous ouvrez avec la télécommande.',
	},
	{
		title: 'Décider de l’état ouvert, sans capteur d’intérieur dehors',
		why: 'Sans capteur, le téléphone sait qu’il a envoyé une impulsion. Il ne sait pas si le vantail a bougé. Le SONOFF SNZB-04P et l’Aqara P2 ne règlent pas ce point sur un portail.',
		where: 'La notice du coffret, puis la fiche des capteurs.',
		actions: [
			'La fiche Sonoff du SNZB-04P le réserve à l’intérieur, avec un écart d’au plus 20 mm. Un vantail dehors, sous la pluie, sort de cette fiche.',
			'L’Aqara Door and Window Sensor P2 parle en Thread et en Matter, pas en Zigbee. Sa notice le destine à l’intérieur. Il ne s’associe pas à un dongle Zigbee, et il ne se colle pas sur le portail.',
			'Certaines cartes ont une sortie de fin de course en contact sec, décrite dans la notice. C’est la seule piste d’état à suivre ici, et seulement si le schéma la nomme. On ne la devine pas.',
			'Le reed du profil ESP32 n’est pas annoncé étanche. Il reste dans un endroit sec, si sa propre notice le permet.',
		],
		observe: 'Vous savez si la notice du coffret offre une sortie d’état, ou si le téléphone n’affichera que l’impulsion.',
		check: 'Aucun aimant de capteur de fenêtre n’est collé sur le vantail.',
	},
	{
		title: 'Demander confirmation, et ne pas refermer tout seul',
		why: 'Une fermeture automatique peut coincer une personne, un animal ou un véhicule. Les cellules réduisent ce risque. Elles ne le suppriment pas.',
		where: 'Le tableau de bord, puis les automatisations.',
		actions: [
			'Carte bouton avec confirmation, sur le script d’impulsion. Le texte demande si l’on commande bien le portail. Documentation : home-assistant.io/dashboards/actions.',
			'Depuis l’extérieur, passez par un accès distant déjà en place. Ne redirigez pas le port 8123. Note officielle : home-assistant.io/docs/configuration/remote.',
			'Une notification « resté ouvert » n’est possible que le jour où un vrai capteur d’état existe. Elle ne contient aucune action de fermeture.',
			'Pas de fermeture à heure fixe, au départ de la maison, ni « si la voiture est passée ».',
		],
		observe: 'Le téléphone demande confirmation avant d’envoyer l’impulsion.',
		check: 'Un appui annulé ne fait pas bouger le portail. L’historique du Shelly ne montre pas de commande au moment d’une simple notification.',
	},
];

const frFaq = [
	{
		question: 'Peut-on couper le 230 V du moteur pour ouvrir le portail ?',
		answer:
			'Non. Le moteur, les fins de course et la détection d’obstacle restent ceux du coffret. I et O imitent le bouton, un court instant. L’alimentation du module est un autre circuit.',
	},
	{
		question: 'Le Shelly Plus 1 peut-il se nourrir sur le 12 V ou le 24 V du coffret ?',
		answer:
			'Seulement après mesure, et sur la bonne borne. La documentation Shelly Plus 1 indique 12 V continu ±10 % sur la borne 12 V, et 24–48 V continu sur la borne +. Le 24 V ne va pas sur la borne 12 V. Le Mini Gen3, lui, se nourrit en 110–240 V sur L et N, pas en 12 V.',
	},
	{
		question: 'Faut-il un coordinateur Zigbee ?',
		answer:
			'Non pour cette liste. La commande est en Wi-Fi. Le capteur Zigbee d’intérieur n’est pas retenu pour un vantail extérieur, donc le dongle n’a rien à associer ici.',
	},
	{
		question: 'Pourquoi pas l’Aqara P2 sur le portail ?',
		answer:
			'C’est un capteur Thread et Matter, prévu pour l’intérieur par Aqara. Il ne s’associe pas à un dongle Zigbee, et un vantail dehors sort de cet usage.',
	},
	{
		question: 'Peut-on fermer le portail automatiquement le soir ?',
		answer:
			'Non dans ce guide. Une impulsion non surveillée peut coincer ce qui se trouve dans le passage. Les cellules ne rendent pas ce scénario acceptable ici.',
	},
];

const fr = localeShell({
	lang: 'fr',
	inLanguage: 'fr-FR',
	title: 'Commander un portail électrique depuis le téléphone',
	description:
		'Contact sec sur le bouton du coffret. Le 230 V du moteur n’est pas commuté. Pas de capteur d’intérieur collé sur le vantail.',
	howToDescription:
		'Trouver le bouton du coffret, raccorder un contact sec, régler une impulsion courte, et ne pas afficher un état ouvert inventé.',
	articleDescription:
		'Le module copie le bouton du coffret. Il ne coupe pas le 230 V du moteur. Un détecteur de fenêtre d’intérieur ne se monte pas sur le vantail.',
	tocAria: 'Sommaire',
	stepWord: 'Étape',
	whereWord: 'Où :',
	checkWord: 'Vérification :',
	summaries: {
		'ha-zigbee':
			'Situation A, profil Recommandé, {qty}. {tech} Home Assistant est supposé déjà en place. Le module est en Wi-Fi. Aucun capteur Zigbee dans la liste.',
		'maker-esp32':
			'Situation B, profil Évolutif, {qty}. {tech} La liste montre la carte ESP32. Le relais à contact sec est dans le tutoriel ESPHome. Le reed n’est pas annoncé étanche.',
		'wifi-sans-box':
			'Situation C, profil Économique, {qty}. {tech} L’application Shelly envoie l’impulsion. Home Assistant n’est pas dans la liste, et l’état ouvert non plus.',
	},
	qtyLabels: {
		'1': 'un portail',
		'2': 'deux portails',
		'3-5': 'le palier 3 à 5 portails',
		'6+': 'le palier 6 portails ou plus',
	},
	techNotes: {
		'shelly-mini': 'Variante Mini Gen3 : alimentation seulement en 110–240 V.',
		'shelly-plus1': 'Variante Plus 1 : alimentation 110–240 V, 12 V stabilisé ou 24–48 V, après mesure.',
		default: 'Variante Mini Gen3 : alimentation seulement en 110–240 V.',
	},
	steps: frSteps,
	faq: frFaq,
	blocks: [
		p(
			'Le portail s’ouvre déjà avec un bouton et une télécommande. Le téléphone sert à refaire ce geste. Il ne remplace pas le coffret : le moteur, les cellules et l’arrêt sur obstacle restent ceux d’origine. Le module relie deux bornes déjà prévues pour le bouton, le temps d’un appui.',
		),
		p(
			'Texte revu le 29 octobre 2026. Les bornes du Shelly Plus 1 viennent de la documentation Shelly Europe. Celles du Mini Gen3 sont celles déjà utilisées pour la porte de garage du site, fiche shelly.com. Les exemples YAML n’ont pas été chargés sur une installation du site.',
		),
		h2('a-quoi-ca-sert', 'À quoi ça sert', 'À quoi sert le téléphone'),
		p(
			'Le boîtier de télécommande reste dans la voiture, ou à la maison. Le téléphone permet d’ouvrir pour un livreur ou de vérifier qu’une impulsion est bien partie, à condition d’être sur un accès distant sûr. Il ne voit pas le vantail tant qu’aucun capteur adapté ne le dit.',
		),
		h2('ce-que-vous-obtenez', 'Ce que vous obtenez', 'Ce que vous allez obtenir'),
		p(
			'Une impulsion identique au bouton, depuis l’application Shelly ou depuis Home Assistant, avec une demande de confirmation. Le bouton mural et la télécommande d’origine restent en service. Vous n’obtenez pas, avec le matériel de cette liste, un voyant fiable « ouvert » ou « fermé ».',
		),
		{
			type: 'table',
			headers: ['Point', 'Détail'],
			rows: [
				['Objectif', 'Envoyer la même impulsion que le bouton du coffret.'],
				['Difficulté', 'Intermédiaire. Le 230 V du coffret est un travail électrique.'],
				['Temps', 'Une demi-journée. Estimation, non chronométrée.'],
				['Budget', 'Indicatif catalogue : environ 27 à 30 € selon le profil. Le configurateur détaille la liste.'],
				['Matériel', 'Un Shelly 1 Mini Gen3 ou un Shelly Plus 1 par coffret. Bornes de connexion seulement si une borne n’accepte pas deux fils.'],
				['Logiciels', 'Application Shelly, ou Home Assistant et son intégration Shelly. ESPHome pour la carte nue, dans un autre guide.'],
				['Prérequis', 'Un portail déjà motorisé, un bouton qui le fait bouger, le Wi-Fi 2,4 GHz au coffret, la notice.'],
				['Risques', '230 V dans le coffret. Écrasement si une commande part passage non surveillé. Ne jamais ponter les cellules. Ne pas ouvrir le port 8123. Ne pas fermer par une automatisation horaire.'],
			],
		},
		h2('situations', 'Trois situations', 'Trois façons d’arriver à la même impulsion'),
		p(
			'Le geste est le même. Ce qui change, c’est ce que vous possédez déjà. L’adresse peut contenir tier, eco, qty et tech. Ce sont des réglages d’affichage. L’URL canonique reste celle sans paramètres.',
		),
		{
			type: 'summary',
			text: 'Réglage décrit par défaut : profil Recommandé, situation A, un portail, Shelly 1 Mini Gen3. Home Assistant n’est pas dans les achats.',
		},
		{
			type: 'sit',
			eco: 'ha-zigbee',
			current: true,
			title: 'Situation A — Home Assistant tourne déjà',
			parts: [
				'C’est le profil Recommandé. Vous n’achetez pas un second serveur, ni un dongle. Le module envoie l’impulsion en Wi-Fi. La variante Mini Gen3 se nourrit en 110–240 V. La variante Plus 1 accepte aussi une alimentation basse tension, après mesure. Aucun capteur d’ouverture n’est dans la liste.',
			],
		},
		{
			type: 'sit',
			eco: 'maker-esp32',
			title: 'Situation B — Vous flashez une carte ESP32',
			parts: [
				'Le profil Évolutif remplace le Shelly par une carte et un relais dont le contact sec se commande en 3,3 V. Le 230 V du moteur ne va pas plus sur ce relais. Le pas à pas de cette page décrit le Shelly. Le flash est dans le ',
				link('tutoriel ESPHome de la porte de garage', '/domotique/ouvrir-porte-garage-smartphone-esp32-esphome/'),
				', le principe du contact sec est le même, le coffret de portail n’est pas le plafond de garage.',
			],
		},
		{
			type: 'sit',
			eco: 'wifi-sans-box',
			title: 'Situation C — L’application Shelly suffit',
			parts: [
				'Le profil Économique n’installe pas Home Assistant. L’application envoie l’impulsion, après l’arrêt automatique de la sortie. Elle ne prouve pas que le vantail a bougé.',
			],
		},
		h3('Ce que la quantité et la variante changent'),
		{
			type: 'table',
			headers: ['Réglage', 'Effet sur la liste'],
			rows: [
				['Un portail', 'Un module pour un coffret, même si le portail a deux vantaux sur la même carte.'],
				['Plusieurs portails', 'Un module par coffret. Home Assistant reste unique.'],
				['Mini Gen3', 'Alimentation 110–240 V seulement. Coffret compact.'],
				['Plus 1', 'Même contact I et O. Alimentation au choix après mesure : 110–240 V, 12 V stabilisé, ou 24–48 V.'],
			],
		},
		{ type: 'config', noscript: 'Sans JavaScript, les boutons ne mettent pas la liste à jour. Les trois situations ci-dessus restent valables.' },
		p(
			'Le lien Shelly de la liste ouvre la fiche du module ; les prix catalogue apparaissent dans le configurateur. Les bornes Wago ne servent que si une vis du coffret n’accepte pas deux conducteurs.',
		),
		h2('architecture', 'Comment ça commande', 'Comment l’ordre arrive au portail'),
		p(
			'Le téléphone demande, Home Assistant appelle le Shelly, le Shelly imite le bouton. Les cellules et la carte décident encore si le vantail a le droit de bouger.',
		),
		{
			type: 'flow',
			caption: 'La commande passe par le contact du bouton. L’alimentation du module et le 230 V du moteur sont à part.',
			title: 'Commande d’un portail par contact sec',
			desc: 'Téléphone, Home Assistant, module Wi-Fi, bornes du bouton, coffret d’origine. L’alimentation du module est séparée. Aucun capteur d’intérieur sur le vantail.',
			boxes: [
				{ title: '1. Téléphone', a: 'Demande une impulsion', b: 'Confirmation avant l’envoi' },
				{ title: '2. Home Assistant', a: 'Sur le réseau local', b: 'Script de 0,5 s' },
				{ title: '3. Shelly, Wi-Fi 2,4 GHz', a: 'I et O se ferment un instant', b: 'SW ne reçoit pas le bouton' },
				{ title: '4. Bouton du coffret', a: 'Deux bornes, en parallèle', b: 'Les noms sont dans la notice' },
				{ title: '5. Coffret d’origine', a: 'Moteur, fins de course, cellules', b: 'Télécommande inchangée' },
				{ title: '6. Alimentation du module', a: 'À part du bouton', b: '110–240 V, ou basse tension mesurée', tone: 'power' },
				{ title: '7. Pas de capteur de fenêtre', a: 'Pas sur le vantail dehors', b: 'L’état ouvert n’est pas dans la liste', tone: 'aside' },
			],
		},
		p(
			'Le Wi-Fi ne transporte que l’ordre vers le module. I et O ne portent pas l’alimentation du Shelly. La même logique vaut pour une ',
			link('porte de garage motorisée', '/domotique/projets/porte-garage-connectee/'),
			' : là, un capteur d’intérieur peut convenir si l’écart se mesure. Ici, le vantail est dehors.',
		),
		h2('quel-materiel', 'Quel matériel', 'Quel module pour le cas suivi par les étapes'),
		{
			type: 'table',
			headers: ['Besoin', 'Choix dans ce guide', 'Limite'],
			rows: [
				['Envoyer l’impulsion, coffret étroit', 'Shelly 1 Mini Gen3, contact sec, Wi-Fi 2,4 GHz', 'Alimentation 110–240 V seulement. Ambiance −20 °C à 40 °C, humidité 30 à 70 %.'],
				['Envoyer l’impulsion, et peut-être le 12 ou le 24 V du coffret', 'Shelly Plus 1, contact libre de potentiel', '12 V ±10 % sur la borne 12 V, ou 24–48 V sur la borne +. Pas l’un sur l’autre. Même limite d’ambiance.'],
				['Joindre deux fils dans une borne trop petite', 'Bornes de connexion, seulement alors', 'Inutiles si la vis accepte déjà le fil du bouton et celui du module.'],
				['Savoir si le vantail est ouvert', 'Pas dans cette liste', 'SNZB-04P et Aqara P2 : intérieur. Une sortie de fin de course ne se branche que si la notice la nomme.'],
				['Rester sans serveur', 'Le même Shelly, dans son application', 'Pas d’historique Home Assistant.'],
			],
		},
		h2('tutoriel', 'Pas à pas', 'Raccorder et essayer'),
		p(
			'Les huit étapes décrivent la situation A : Home Assistant déjà là, un coffret, bouton unique. Si l’observation attendue n’arrive pas, arrêtez-vous. Passage dégagé à chaque essai.',
		),
		{ type: 'steps' },
		h3('Cellules : elles gardent la course'),
		p(
			'Si le portail refuse de se fermer, on nettoie et on réaligne les cellules. On ne ponte pas leurs fils pour « finir l’essai du Shelly ». Une impulsion pendant la course arrête le mouvement. Il en faut une autre pour repartir. Le module ne distingue pas ouvert, en train de s’ouvrir, et en train de se fermer.',
		),
		h2('verifier', 'Vérifier', 'Vérifier que ça commande vraiment'),
		{
			type: 'ul',
			items: [
				'Le bouton d’origine fait encore partir et arrêter le portail.',
				'Une impulsion Shelly fait le même geste, une fois, passage dégagé.',
				'Une confirmation annulée ne fait rien bouger.',
				'Les cellules, sales ou masquées, empêchent encore la fermeture.',
				'Aucun fil du moteur n’est sur I ou O.',
			],
		},
		h2('depannage', 'Dépannage', 'Quand ça ne part pas'),
		p(
			'Rien ne bouge : l’impulsion est trop courte, I et O ne sont pas sur les bornes du bouton, ou le Wi-Fi ne joint pas le module au coffret. Le portail part puis s’arrête : l’impulsion compte pour deux appuis, raccourcissez-la. Le bouton mural est mort : le module est en série, ou un fil d’origine a été retiré. Recoupez le courant et reprenez la photo.',
		),
		p(
			'Le module ne s’allume pas sur une sortie « 12 V » du coffret : mesurez d’abord. Beaucoup de cartes sont en 24 V. Le Mini Gen3 refuse les deux. Le Plus 1 n’accepte le 24 V que sur la borne prévue, pas sur la borne 12 V.',
		),
		h2('aller-plus-loin', 'Aller plus loin', 'Aller plus loin'),
		p(
			'Le même contact sec, sur une porte de garage intérieure, est décrit dans le guide ',
			link('porte de garage', '/domotique/projets/porte-garage-connectee/'),
			'. L’accès depuis l’extérieur de la maison est dans le guide ',
			link('accès distant', '/domotique/projets/acces-distance-securise-home-assistant-vpn/'),
			'. Le script d’impulsion :',
		),
		{ type: 'pre', code: pulse('Impulsion portail', 'switch.remplacer_shelly') },
		p('Remplacez l’identifiant. Ce YAML n’a pas été exécuté ici. L’arrêt automatique réglé dans le Shelly reste en place.'),
		h2('questions', 'Questions', 'Questions fréquentes'),
		{ type: 'faq' },
		h2('sources', 'Sources', 'Sources'),
		{
			type: 'sources',
			items: [
				{ href: PLUS_DOC, text: 'Documentation Shelly Plus 1', note: '— bornes I, O, 12 V, 24–48 V, ambiance, couple 0,4 N·m.' },
				{ href: MINI_DOC, text: 'Fiche Shelly 1 Mini Gen3', note: '— module retenu pour le coffret compact, alimentation 110–240 V.' },
				{ href: HA_SHELLY, text: 'Intégration Shelly dans Home Assistant' },
				{ href: HA_REMOTE, text: 'Accès distant Home Assistant', note: '— ne pas exposer le port 8123.' },
				{ href: SONOFF_SNZB, text: 'Notice SONOFF SNZB-04P', note: '— intérieur, écart 20 mm : non retenu pour le vantail.' },
				{ href: AQARA_P2, text: 'Aqara Door and Window Sensor P2', note: '— Thread et Matter, intérieur : non retenu.' },
				{ href: '/domotique/ouvrir-porte-garage-smartphone-esp32-esphome/', text: 'Tutoriel ESPHome, contact sec et reed' },
			],
		},
	],
});

function otherLocale(lang, spec) {
	const esp = guidePath(lang, 'ouvrir-porte-garage-smartphone-esp32-esphome');
	const garage = guidePath(lang, 'ouvrir-porte-garage-smartphone-esp32-esphome');
	return localeShell({
		...spec,
		lang,
		blocks: spec.blocks(esp, garage),
	});
}

const en = otherLocale('en', {
	inLanguage: 'en-GB',
	title: 'Operate an electric gate from your phone',
	description:
		'Dry contact on the control-board button. The motor mains are not switched. An indoor sensor is not stuck on the outdoor leaf.',
	howToDescription:
		'Find the gate button terminals, wire a dry contact, set a short pulse, and do not invent an open or closed state.',
	articleDescription:
		'The module copies the control-board button. It does not switch the motor mains. An indoor window sensor does not belong on the leaf.',
	tocAria: 'Contents',
	stepWord: 'Step',
	whereWord: 'Where:',
	checkWord: 'Check:',
	summaries: {
		'ha-zigbee':
			'Case A, recommended profile, {qty}. {tech} Home Assistant is assumed to be running. The module is Wi-Fi. No Zigbee sensor is in the list.',
		'maker-esp32':
			'Case B, ESP32 profile, {qty}. {tech} The list shows the ESP32 board. The dry-contact relay is in the ESPHome tutorial. The reed is not sold as weatherproof.',
		'wifi-sans-box':
			'Case C, Shelly app only, {qty}. {tech} The app sends the pulse. Home Assistant is not in the list, and neither is an open or closed state.',
	},
	qtyLabels: {
		'1': 'one gate',
		'2': 'two gates',
		'3-5': 'the 3-to-5 gate band',
		'6+': 'the 6-or-more gate band',
	},
	techNotes: {
		'shelly-mini': 'Mini Gen3: 110–240 V supply only.',
		'shelly-plus1': 'Plus 1: 110–240 V, regulated 12 V, or 24–48 V, after you measure.',
		default: 'Mini Gen3: 110–240 V supply only.',
	},
	steps: [
		{
			title: 'Read the manual before you open the cabinet',
			why: 'The phone only repeats a button the board already has. If that button is not there, this project stops.',
			where: 'The control-board manual, not the lid.',
			actions: [
				'Find the wall-button input: start, step-by-step, PP, or the local equivalent. The drawing then shows two terminals.',
				'If open and close are two separate inputs, one module replaces only one button. The steps below are for a single input, the one your existing button already uses.',
				'Find the photocells, the stop input and obstacle detection. The relay does not land on those terminals.',
				'If the gate is radio-only, with no button terminals, do not invent an input on the board.',
			],
			observe: 'You can name the two terminals the module will copy.',
			check: 'With the way clear, one press starts the gate and a second press during travel stops it.',
		},
		{
			title: 'Switch off the circuit, then open the cabinet',
			why: 'The button is often a dry contact, but the cabinet holds the motor mains.',
			where: 'The consumer unit, then the cabinet. Fixed mains wiring is done dead, by someone qualified for that work.',
			actions: [
				'Identify the gate breaker. If it is not labelled, do not guess.',
				'Switch it off. The button and the warning lamp must stop responding.',
				'Open the cabinet and photograph the terminal strip before you move a wire. Leave the motor, earth and photocell wires where they are.',
				'If you cannot prove the mains terminals are dead, stop at the photograph. Someone who can do that check connects the module supply.',
			],
			observe: 'The photo shows two button terminals, separate from the motor supply.',
			check: 'No motor or photocell wire has been removed.',
		},
		{
			title: 'Name the module terminals before you tighten them',
			why: 'The Mini Gen3 and the Plus 1 both have a potential-free contact. Their supplies are not the same. Mixing them puts mains onto the gate board.',
			where: 'The module on a table, with the Shelly page open.',
			actions: [
				'Plus 1: I and O are the contact. Live and neutral, regulated 12 V, and 24–48 V are three different supplies. Shelly’s European page puts 12 V DC ±10 % on the 12 V terminal and 24–48 V DC on the + terminal. Do not put 24 V on the 12 V terminal. Torque is 0.4 N·m. Ambient range is −20 °C to 40 °C, humidity 30 to 70 %.',
				'Mini Gen3: I and O are the contact, L and N are a 110–240 V supply only. It has no 12 V input. The same ambient limits and 0.4 N·m torque are the figures already used for the garage-door guide on this site.',
				'SW is an input for a switch on the module. The gate button does not go there.',
				'A cabinet in full sun or in the rain is outside that sheet. Keep the module in a dry enclosure, not on the post.',
			],
			observe: 'You can point to I, O and the supply you chose, and you know which module is in the box.',
			check: 'No button wire is planned for L, N, SW, 12 V or +.',
		},
		{
			title: 'Wire I and O, and power the module on its own',
			why: 'The existing button has to keep working. The module sits beside it.',
			where: 'Dead: the two button terminals, then the module supply.',
			actions: [
				'Two conductors run from I and O to the two button terminals, in parallel with the wires already there. Polarity does not matter. Those two wires do not carry the motor mains.',
				'Do not put live or neutral on those terminals. Do not put the motor between I and O. The Plus 1 page talks about a load circuit: that is not the gate motor.',
				'Power the module on its own circuit. Plus 1: 110–240 V on L and N, or regulated 12 V, or 24–48 V, only after you measure the accessory output. Mini Gen3: 110–240 V on L and N only. Fixed mains wiring is electrical work.',
				'If a terminal cannot take two conductors, a lever connector joins them. Otherwise you do not need one. Close the cabinet before you switch the breaker back on.',
			],
			observe: 'The cabinet is closed, the breaker is on, nothing is hot.',
			check: 'The original button still starts and stops the gate, way clear, before any test from the phone.',
		},
		{
			title: 'Set a short pulse, then try once',
			why: 'Without a timer the contact can stay closed. The board then sees a finger that never leaves the button.',
			where: '2.4 GHz Wi-Fi, the Shelly page, gate area clear.',
			actions: [
				'Both modules are 2.4 GHz only. A 5 GHz-only network will not see them. At the cabinet, the module page has to open. If it does not, the Wi-Fi at the gate is too weak.',
				'Turn on auto-off for the output, around 0.5 s. The label depends on the firmware. It is the output timer.',
				'Reserve the module’s address in the router.',
				'One pulse, nobody in the way. If nothing moves, try 1 s. If the gate starts and stops at once, the pulse is too long.',
				'Shelly Cloud can stay off. Home Assistant talks to the module on the local network.',
			],
			observe: 'The relay clicks briefly, the gate starts, and a second try during travel stops it.',
			check: 'The original button and the original remote still work.',
		},
		{
			title: 'Add the module to Home Assistant without inventing the leaf position',
			why: 'Home Assistant should see a switch that sends the pulse. With this shopping list it does not know whether the gate is open.',
			where: 'Settings, Devices and services, then Scripts.',
			actions: [
				'Add the Shelly integration. If it does not appear, enter the reserved address. Documentation: home-assistant.io/integrations/shelly.',
				'Copy the switch entity id from Developer tools, States.',
				'Create a script: turn on, wait 0.5 s, turn off, mode single. The example further down was not run on a site install.',
				'Leave auto-off in the Shelly. It releases the contact even if the script stops halfway.',
				'Do not add an “open gate” template until you have a sensor whose states you have checked. An indoor window sensor on the leaf is not that sensor.',
			],
			observe: 'Running the script once, way clear, does the same movement as the button.',
			check: 'The script does not start by itself when you use the remote.',
		},
		{
			title: 'Decide about open or closed without an indoor sensor outdoors',
			why: 'Without a sensor the phone knows it sent a pulse. It does not know whether the leaf moved. The SNZB-04P and the Aqara P2 do not fix that on a gate.',
			where: 'The control-board manual, then the sensor sheets.',
			actions: [
				'Sonoff’s SNZB-04P page keeps it indoors, with a gap of 20 mm at most. An outdoor leaf in the rain is outside that sheet.',
				'The Aqara Door and Window Sensor P2 speaks Thread and Matter, not Zigbee. Aqara keeps it indoors. It does not pair with a Zigbee dongle, and it does not go on the gate.',
				'Some boards have a limit-switch output as a dry contact, drawn in the manual. That is the only state path to follow here, and only if the drawing names it.',
				'The reed in the ESP32 profile is not sold as weatherproof. It stays somewhere dry, if its own sheet allows it.',
			],
			observe: 'You know whether the board manual offers a state output, or whether the phone will only show the pulse.',
			check: 'No window-sensor magnet is stuck on the leaf.',
		},
		{
			title: 'Ask for confirmation, and do not close the gate by itself',
			why: 'An automatic close can trap a person, an animal or a vehicle. Photocells reduce that risk. They do not remove it.',
			where: 'The dashboard, then automations.',
			actions: [
				'A button card with confirmation, on the pulse script. The text asks whether you really mean to operate the gate.',
				'From outside the house, use remote access you already trust. Do not forward port 8123. The official note is home-assistant.io/docs/configuration/remote.',
				'A “left open” notification is possible only once a real state sensor exists. It contains no close action.',
				'No close at a fixed time, when you leave, or “after the car has passed”.',
			],
			observe: 'The phone asks for confirmation before it sends the pulse.',
			check: 'A cancelled tap does not move the gate. The Shelly history shows no command at the moment of a notification alone.',
		},
	],
	faq: [
		{
			question: 'Can the Shelly switch the motor mains to open the gate?',
			answer:
				'No. The motor, the limits and obstacle detection stay with the control board. I and O copy the button for a short moment. The module supply is another circuit.',
		},
		{
			question: 'Can the Shelly Plus 1 run from the board’s 12 V or 24 V?',
			answer:
				'Only after you measure, and only on the matching terminal. Shelly’s Plus 1 page states 12 V DC ±10 % on the 12 V terminal and 24–48 V DC on the + terminal. 24 V does not go on the 12 V terminal. The Mini Gen3 is 110–240 V on L and N, not 12 V.',
		},
		{
			question: 'Do you need a Zigbee coordinator?',
			answer:
				'Not for this list. The command is Wi-Fi. The indoor Zigbee sensor is not used on an outdoor leaf, so the dongle has nothing to pair here.',
		},
		{
			question: 'Why not the Aqara P2 on the gate?',
			answer:
				'It is a Thread and Matter sensor, and Aqara keeps it indoors. It does not pair with a Zigbee dongle, and an outdoor leaf is outside that use.',
		},
		{
			question: 'Can the gate close by itself in the evening?',
			answer:
				'Not in this guide. An unwatched pulse can trap whatever is in the way. Photocells do not make that scene acceptable here.',
		},
	],
	blocks: (esp) => [
		p(
			'The gate already opens with a button and a remote. The phone repeats that gesture. It does not replace the control board: the motor, the photocells and the obstacle stop stay as they are. The module joins two terminals already meant for the button, for the length of a press.',
		),
		p(
			'Text revised on 29 October 2026. Plus 1 terminals come from Shelly’s European documentation. Mini Gen3 figures are the ones already used for the garage-door guide on this site. The YAML examples were not loaded on a site install.',
		),
		h2('why', 'What it is for', 'What the phone is for'),
		p(
			'The remote stays in the car, or in the house. The phone can open for a delivery, or show that a pulse was sent, once you already have a safe remote login. It does not see the leaf until a suitable sensor says so.',
		),
		h2('result', 'What you get', 'What you will get'),
		p(
			'The same pulse as the button, from the Shelly app or from Home Assistant, with a confirmation. The wall button and the original remote stay in service. This shopping list does not give a reliable open or closed lamp.',
		),
		{
			type: 'table',
			headers: ['Point', 'Detail'],
			rows: [
				['Aim', 'Send the same pulse as the control-board button.'],
				['Difficulty', 'Intermediate. Mains inside the cabinet is electrical work.'],
				['Time', 'Half a day. An estimate, not a timed install.'],
				['Budget', 'Catalogue estimate: about €27–30 depending on the profile. The configurator details the list.'],
				['Hardware', 'One Shelly 1 Mini Gen3 or one Shelly Plus 1 per control board. Lever connectors only if a terminal cannot take two wires.'],
				['Software', 'The Shelly app, or Home Assistant and its Shelly integration. ESPHome for the bare board, in another guide.'],
				['Before you start', 'A gate that is already powered, a button that moves it, 2.4 GHz Wi-Fi at the cabinet, and the manual.'],
				['Risks', 'Mains in the cabinet. Crushing if a command is sent with the way unwatched. Never bridge the photocells. Do not open port 8123. Do not close from a time automation.'],
			],
		},
		h2('situations', 'Three cases', 'Three ways to the same pulse'),
		p(
			'The gesture is the same. What changes is what you already own. The address may contain tier, eco, qty and tech. Those are display settings. The canonical URL is the one without parameters. The live list is on the French page, because the configurator is still in French. The three cases below are the same choices.',
		),
		{
			type: 'summary',
			text: 'Default reading: recommended profile, case A, one gate, Shelly 1 Mini Gen3. Home Assistant is not a purchase.',
		},
		{
			type: 'sit',
			eco: 'ha-zigbee',
			current: true,
			title: 'Case A — Home Assistant is already running',
			parts: [
				'You do not buy a second server, or a dongle. The module sends the pulse over Wi-Fi. The Mini Gen3 runs on 110–240 V. The Plus 1 can also take a low-voltage supply, after you measure it. No open sensor is in the list.',
			],
		},
		{
			type: 'sit',
			eco: 'maker-esp32',
			title: 'Case B — You flash an ESP32 board',
			parts: [
				'An ESP32 and a relay whose dry contact is driven at 3.3 V replace the Shelly. The motor mains do not land on that relay either. These steps describe the Shelly. The flash is in the ',
				link('ESPHome garage-door tutorial', esp),
				'. The dry-contact idea is the same. A gate cabinet is not a garage-door head unit.',
			],
		},
		{
			type: 'sit',
			eco: 'wifi-sans-box',
			title: 'Case C — The Shelly app is enough',
			parts: [
				'This profile does not install Home Assistant. The app sends the pulse, after auto-off is set. It does not prove the leaf moved.',
			],
		},
		h3('What quantity and the variant change'),
		{
			type: 'table',
			headers: ['Setting', 'Effect on the list'],
			rows: [
				['One gate', 'One module for one control board, even if two leaves share that board.'],
				['Several gates', 'One module per board. Home Assistant stays one server.'],
				['Mini Gen3', '110–240 V supply only. The smaller case.'],
				['Plus 1', 'The same I and O contact. Supply after measurement: 110–240 V, regulated 12 V, or 24–48 V.'],
			],
		},
		{
			type: 'config',
			noscript: 'Without JavaScript, the buttons do not refresh the parts list. The three situations above still apply.',
		},
		p(
			'Catalogue prices appear in the configurator. A Shelly search on Amazon.co.uk, with this site’s partner tag, is a name search and does not guarantee the exact model or stock: ',
			link('Shelly Plus 1', marketSearch('en', 'Shelly Plus 1'), true),
			'. The official sheet is the source for the terminals, not the search page.',
		),
		h2('architecture', 'How the command travels', 'How the command reaches the gate'),
		p('The phone asks, Home Assistant calls the Shelly, the Shelly copies the button. The photocells and the board still decide whether the leaf may move.'),
		{
			type: 'flow',
			caption: 'The command uses the button contact. The module supply and the motor mains stay separate.',
			title: 'Electric gate, dry-contact command',
			desc: 'Phone, Home Assistant, Wi-Fi module, button terminals, original board. The module supply is separate. No indoor sensor on the leaf.',
			boxes: [
				{ title: '1. Phone', a: 'Asks for a pulse', b: 'Confirmation first' },
				{ title: '2. Home Assistant', a: 'On the local network', b: '0.5 s script' },
				{ title: '3. Shelly, 2.4 GHz', a: 'I and O close briefly', b: 'SW is not the gate button' },
				{ title: '4. Board button', a: 'Two terminals, in parallel', b: 'Names are in the manual' },
				{ title: '5. Original board', a: 'Motor, limits, photocells', b: 'Remote unchanged' },
				{ title: '6. Module supply', a: 'Not the button pair', b: '110–240 V, or measured low voltage', tone: 'power' },
				{ title: '7. No window sensor', a: 'Not on the outdoor leaf', b: 'Open state is not in the list', tone: 'aside' },
			],
		},
		h2('hardware', 'What to buy', 'Which module the steps follow'),
		{
			type: 'table',
			headers: ['Need', 'Choice in this guide', 'Limit'],
			rows: [
				['Send the pulse, tight cabinet', 'Shelly 1 Mini Gen3, dry contact, 2.4 GHz', '110–240 V only. Ambient −20 °C to 40 °C, humidity 30 to 70 %.'],
				['Send the pulse, and maybe the board’s 12 or 24 V', 'Shelly Plus 1, potential-free contact', '12 V ±10 % on the 12 V terminal, or 24–48 V on +. Not one on the other. Same ambient limits.'],
				['Join two wires in a small terminal', 'Lever connectors, only then', 'Not needed if the screw already takes both wires.'],
				['Know whether the leaf is open', 'Not in this list', 'SNZB-04P and Aqara P2 are indoor. A limit output is wired only if the manual names it.'],
				['Stay without a server', 'The same Shelly, in its app', 'No Home Assistant history.'],
			],
		},
		h2('steps', 'Step by step', 'Wire it and try it'),
		p('The eight steps are case A: Home Assistant already there, one board, one button input. Stop if the expected observation does not happen. Keep the way clear at every test.'),
		{ type: 'steps' },
		h3('Photocells still own the travel'),
		p('If the gate will not close, clean and line up the photocells. Do not bridge their wires to finish the Shelly test. A pulse during travel stops the movement. Another pulse is needed to start again. The module cannot tell open, opening and closing apart.'),
		h2('check', 'Check', 'Check that it really commands the gate'),
		{
			type: 'ul',
			items: [
				'The original button still starts and stops the gate.',
				'One Shelly pulse does the same gesture, way clear.',
				'A cancelled confirmation does nothing.',
				'Dirty or blocked photocells still prevent closing.',
				'No motor wire is on I or O.',
			],
		},
		h2('troubles', 'If it does not start', 'When it does not start'),
		p('Nothing moves: the pulse is too short, I and O are not on the button terminals, or Wi-Fi does not reach the cabinet. The gate starts then stops: the pulse counts as two presses, shorten it. The wall button is dead: the module is in series, or an original wire was removed. Switch off and use the photo.'),
		p('The module stays dark on a “12 V” output: measure first. Many boards are 24 V. The Mini Gen3 accepts neither. The Plus 1 accepts 24 V only on the terminal meant for it, not on the 12 V terminal.'),
		h2('further', 'Go further', 'Go further'),
		p('The pulse script replaces the entity id. It was not run here. Auto-off in the Shelly stays on.'),
		{ type: 'pre', code: pulse('Gate pulse', 'switch.replace_shelly') },
		h2('questions', 'Questions', 'Common questions'),
		{ type: 'faq' },
		h2('sources', 'Sources', 'Sources'),
		{
			type: 'sources',
			items: [
				{ href: PLUS_DOC, text: 'Shelly Plus 1 documentation', note: '— I, O, 12 V, 24–48 V, ambient range, 0.4 N·m.' },
				{ href: MINI_DOC, text: 'Shelly 1 Mini Gen3 product page', note: '— compact module, 110–240 V supply.' },
				{ href: HA_SHELLY, text: 'Shelly integration in Home Assistant' },
				{ href: HA_REMOTE, text: 'Home Assistant remote access', note: '— do not expose port 8123.' },
				{ href: SONOFF_SNZB, text: 'SONOFF SNZB-04P manual', note: '— indoors, 20 mm gap: not used on the leaf.' },
				{ href: AQARA_P2, text: 'Aqara Door and Window Sensor P2', note: '— Thread and Matter, indoors: not used.' },
				{ href: esp, text: 'ESPHome tutorial: dry contact and reed' },
			],
		},
	],
});

const de = otherLocale('de', {
	inLanguage: 'de-DE',
	title: 'Ein elektrisches Tor vom Telefon aus bedienen',
	description:
		'Trockenkontakt an der Tasterklemme der Steuerung. Die Motorspannung wird nicht geschaltet. Kein Innensensor auf dem Torflügel.',
	howToDescription:
		'Tasterklemmen finden, einen Trockenkontakt anschließen, einen kurzen Impuls einstellen und keinen erfundenen Offen-Zustand anzeigen.',
	articleDescription:
		'Das Modul ahmt den Taster der Steuerung nach. Es schaltet nicht die Motorspannung. Ein Fensterkontakt für innen gehört nicht auf den Flügel.',
	tocAria: 'Inhalt',
	stepWord: 'Schritt',
	whereWord: 'Wo:',
	checkWord: 'Prüfung:',
	summaries: {
		'ha-zigbee':
			'Fall A, empfohlenes Profil, {qty}. {tech} Home Assistant läuft bereits. Das Modul ist WLAN. Kein Zigbee-Sensor in der Liste.',
		'maker-esp32':
			'Fall B, ESP32-Profil, {qty}. {tech} Die Liste zeigt die ESP32-Platine. Das Relais mit Trockenkontakt steht in der ESPHome-Anleitung. Der Reedkontakt gilt nicht als wetterfest.',
		'wifi-sans-box':
			'Fall C, nur Shelly-App, {qty}. {tech} Die App sendet den Impuls. Home Assistant und ein Offen-Zustand fehlen in der Liste.',
	},
	qtyLabels: {
		'1': 'ein Tor',
		'2': 'zwei Tore',
		'3-5': 'die Stufe 3 bis 5 Tore',
		'6+': 'die Stufe 6 Tore oder mehr',
	},
	techNotes: {
		'shelly-mini': 'Mini Gen3: Versorgung nur 110–240 V.',
		'shelly-plus1': 'Plus 1: 110–240 V, stabilisierte 12 V oder 24–48 V, nach Messung.',
		default: 'Mini Gen3: Versorgung nur 110–240 V.',
	},
	steps: [
		{
			title: 'Die Anleitung lesen, bevor der Kasten aufgeht',
			why: 'Das Telefon wiederholt nur einen Taster, den die Steuerung schon hat. Fehlt er, endet das Vorhaben hier.',
			where: 'Die Anleitung der Steuerung, nicht der Deckel.',
			actions: [
				'Suchen Sie den Wandtaster: Start, Schrittbetrieb, PP oder die Bezeichnung in der Anleitung. Die Zeichnung zeigt dann zwei Klemmen.',
				'Gibt es getrennte Eingänge für Auf und Zu, ersetzt ein Modul nur einen Taster. Die Schritte gelten für einen einzigen Eingang, den Ihr vorhandener Taster schon benutzt.',
				'Lichtschranken, Stopp und Hinderniserkennung bleiben unberührt.',
				'Gibt es nur eine Funkfernbedienung und keinen Tasterklemmenblock, erfinden Sie keinen Eingang auf der Platine.',
			],
			observe: 'Sie können die beiden Klemmen benennen, die das Modul nachbilden soll.',
			check: 'Bei freier Bahn startet ein Druck das Tor, ein zweiter während der Fahrt stoppt es.',
		},
		{
			title: 'Den Stromkreis trennen, dann erst öffnen',
			why: 'Der Taster ist oft ein Trockenkontakt, im Kasten liegt aber die Motorspannung.',
			where: 'Der Verteiler, dann der Kasten. Fest angeschlossene 230-V-Leitungen legt eine fachkundige Person im spannungsfreien Zustand.',
			actions: [
				'Den Leitungsschutzschalter des Tors bestimmen. Ist er nicht beschriftet, nicht raten.',
				'Abschalten. Taster und Warnleuchte dürfen nicht mehr reagieren.',
				'Kasten öffnen und die Klemmleiste fotografieren, bevor ein Draht wandert. Motor, Schutzleiter und Lichtschranken bleiben liegen.',
				'Wer die Spannungsfreiheit an den 230-V-Klemmen nicht prüfen kann, bleibt beim Foto. Die Versorgung des Moduls schließt dann jemand an, der das kann.',
			],
			observe: 'Das Foto zeigt zwei Tasterklemmen, getrennt von der Motorversorgung.',
			check: 'Kein Motor- und kein Lichtschrankendraht wurde gezogen.',
		},
		{
			title: 'Die Klemmen benennen, bevor sie angezogen werden',
			why: 'Mini Gen3 und Plus 1 haben einen potentialfreien Kontakt, aber nicht dieselbe Versorgung. Eine Verwechslung legt Netzspannung an die Torplatine.',
			where: 'Das Modul auf dem Tisch, Shelly-Seite offen.',
			actions: [
				'Plus 1: I und O sind der Kontakt. Außenleiter und Neutralleiter, stabilisierte 12 V und 24–48 V sind drei Versorgungen. Die europäische Shelly-Seite nennt 12 V DC ±10 % an der Klemme 12 V und 24–48 V DC an der Klemme +. 24 V gehören nicht auf die 12-V-Klemme. Anzugsmoment 0,4 N·m. Umgebung −20 °C bis 40 °C, Feuchte 30 bis 70 %.',
				'Mini Gen3: I und O sind der Kontakt, L und N nur 110–240 V. Keine 12-V-Einspeisung. Dieselben Umgebungsgrenzen und 0,4 N·m stehen schon im Garagentor-Guide dieser Website.',
				'SW ist ein Eingang für einen Schalter am Modul. Der Tortaster kommt dort nicht hin.',
				'Ein Kasten in praller Sonne oder im Regen liegt außerhalb dieses Datenblatts. Das Modul bleibt trocken, nicht am Pfosten.',
			],
			observe: 'Sie zeigen auf I, O und die gewählte Versorgung und wissen, welches Modul in der Schachtel liegt.',
			check: 'Kein Tasterdraht ist für L, N, SW, 12 V oder + vorgesehen.',
		},
		{
			title: 'I und O anschließen, das Modul getrennt versorgen',
			why: 'Der vorhandene Taster muss weiter funktionieren. Das Modul kommt daneben.',
			where: 'Spannungsfrei: die beiden Tasterklemmen, dann die Versorgung des Moduls.',
			actions: [
				'Zwei Adern von I und O zu den beiden Tasterklemmen, parallel zu den vorhandenen Drähten. Die Richtung ist egal. Diese beiden Adern führen nicht die Motorspannung.',
				'Kein Außenleiter und kein Neutralleiter auf diese Klemmen. Der Motor liegt nicht zwischen I und O. Die Plus-1-Seite spricht von einem Lastkreis: das ist nicht der Tormotor.',
				'Das Modul an seinem eigenen Kreis versorgen. Plus 1: 110–240 V an L und N, oder stabilisierte 12 V, oder 24–48 V, erst nach Messung des Zubehörausgangs. Mini Gen3: nur 110–240 V an L und N.',
				'Nimmt eine Klemme keine zwei Adern auf, verbindet eine Hebelklemme. Sonst ist sie unnötig. Kasten schließen, bevor der Schalter wieder ein geht.',
			],
			observe: 'Der Kasten ist zu, der Schalter ist ein, nichts wird heiß.',
			check: 'Der ursprüngliche Taster startet und stoppt das Tor noch, Bahn frei, vor jedem Versuch vom Telefon.',
		},
		{
			title: 'Einen kurzen Impuls einstellen und einmal probieren',
			why: 'Ohne Zeitglied kann der Kontakt geschlossen bleiben. Die Steuerung sieht dann einen Finger, der den Taster nicht loslässt.',
			where: 'WLAN 2,4 GHz, Shelly-Oberfläche, Bahn frei.',
			actions: [
				'Beide Module funken nur mit 2,4 GHz. Ein reines 5-GHz-Netz sieht sie nicht. Am Kasten muss die Modulseite aufgehen, sonst ist das WLAN am Tor zu schwach.',
				'Auto-Aus der Ausgangs ein, etwa 0,5 s. Die Bezeichnung hängt von der Firmware ab.',
				'Die Adresse des Moduls im Router fest vergeben.',
				'Ein Impuls, niemand im Weg. Bewegt sich nichts, 1 s versuchen. Startet das Tor und hält sofort an, ist der Impuls zu lang.',
				'Die Shelly-Cloud kann aus bleiben. Home Assistant spricht das Modul im lokalen Netz an.',
			],
			observe: 'Das Relais zieht kurz an, das Tor fährt los, ein zweiter Versuch während der Fahrt stoppt.',
			check: 'Taster und Originalfernbedienung gehen noch.',
		},
		{
			title: 'Das Modul in Home Assistant aufnehmen, ohne die Flügelstellung zu erfinden',
			why: 'Home Assistant soll einen Schalter sehen, der den Impuls gibt. Mit dieser Liste weiß es nicht, ob das Tor offen ist.',
			where: 'Einstellungen, Geräte und Dienste, dann Skripte.',
			actions: [
				'Shelly-Integration hinzufügen. Erscheint sie nicht, die reservierte Adresse eintragen.',
				'Die Schalter-Kennung unter Entwicklerwerkzeuge, Zustände, notieren.',
				'Skript: einschalten, 0,5 s warten, ausschalten, Modus single. Das Beispiel unten lief hier nicht.',
				'Auto-Aus im Shelly lassen. Es öffnet den Kontakt auch, wenn das Skript abbricht.',
				'Keine Vorlage „Tor offen“, solange kein Sensor mit geprüften Zuständen da ist. Ein Innen-Fensterkontakt auf dem Flügel ist keiner.',
			],
			observe: 'Das Skript einmal, Bahn frei, macht dieselbe Bewegung wie der Taster.',
			check: 'Das Skript startet nicht von allein, wenn die Fernbedienung öffnet.',
		},
		{
			title: 'Offen oder geschlossen klären, ohne Innensensor im Freien',
			why: 'Ohne Sensor weiß das Telefon, dass ein Impuls wegging. Es weiß nicht, ob der Flügel fuhr. SNZB-04P und Aqara P2 lösen das an einem Tor nicht.',
			where: 'Die Anleitung der Steuerung, dann die Sensorblätter.',
			actions: [
				'Die Sonoff-Seite zum SNZB-04P hält ihn in Innenräumen, Spalt höchstens 20 mm. Ein Flügel im Regen liegt außerhalb.',
				'Der Aqara Door and Window Sensor P2 spricht Thread und Matter, nicht Zigbee. Aqara sieht ihn für innen. Er koppelt nicht an einen Zigbee-Stick und kommt nicht ans Tor.',
				'Manche Steuerungen haben einen Endlagenausgang als Trockenkontakt, gezeichnet in der Anleitung. Nur den anschließen, und nur wenn die Zeichnung ihn benennt.',
				'Der Reedkontakt im ESP32-Profil gilt nicht als wetterfest. Er bleibt trocken, wenn sein eigenes Blatt das erlaubt.',
			],
			observe: 'Sie wissen, ob die Steuerung einen Zustandsausgang hat oder das Telefon nur den Impuls zeigt.',
			check: 'Kein Fenstermagnet klebt auf dem Flügel.',
		},
		{
			title: 'Bestätigung verlangen und nicht von selbst schließen',
			why: 'Ein automatisches Schließen kann Person, Tier oder Fahrzeug einklemmen. Lichtschranken mindern das. Sie heben es nicht auf.',
			where: 'Die Übersicht, dann Automatisierungen.',
			actions: [
				'Schaltfläche mit Bestätigung auf dem Impulsskript. Der Text fragt, ob das Tor wirklich fahren soll.',
				'Von außen nur über einen schon eingerichteten Fernzugang. Port 8123 nicht freigeben.',
				'Eine Meldung „offen geblieben“ gibt es erst mit einem echten Zustandssensor. Sie enthält keine Schließaktion.',
				'Kein Schließen um eine Uhrzeit, beim Verlassen oder „wenn das Auto durch ist“.',
			],
			observe: 'Das Telefon fragt nach, bevor der Impuls geht.',
			check: 'Ein abgebrochener Tipp bewegt das Tor nicht.',
		},
	],
	faq: [
		{
			question: 'Kann das Shelly die Motorspannung schalten, um das Tor zu öffnen?',
			answer:
				'Nein. Motor, Endlagen und Hinderniserkennung bleiben bei der Steuerung. I und O ahmen den Taster kurz nach. Die Versorgung des Moduls ist ein anderer Kreis.',
		},
		{
			question: 'Darf das Shelly Plus 1 an 12 V oder 24 V der Steuerung?',
			answer:
				'Nur nach Messung und nur an der passenden Klemme. Shelly nennt 12 V DC ±10 % an der Klemme 12 V und 24–48 V DC an der Klemme +. 24 V gehören nicht auf die 12-V-Klemme. Der Mini Gen3 nimmt 110–240 V an L und N, kein 12 V.',
		},
		{
			question: 'Braucht es einen Zigbee-Koordinator?',
			answer:
				'Für diese Liste nicht. Der Befehl geht über WLAN. Der Innen-Zigbee-Sensor kommt nicht an den Flügel, der Stick hätte hier nichts zu koppeln.',
		},
		{
			question: 'Warum nicht der Aqara P2 am Tor?',
			answer:
				'Er ist ein Thread- und Matter-Sensor, von Aqara für innen vorgesehen. Er koppelt nicht an einen Zigbee-Stick, und ein Außenflügel liegt außerhalb dieser Nutzung.',
		},
		{
			question: 'Darf das Tor abends von selbst zugehen?',
			answer:
				'In dieser Anleitung nicht. Ein unbeaufsichtigter Impuls kann einklemmen, was im Weg steht. Lichtschranken machen diese Szene hier nicht zulässig.',
		},
	],
	blocks: (esp) => [
		p('Das Tor öffnet schon mit Taster und Handsender. Das Telefon wiederholt diese Geste. Motor, Lichtschranken und Hindernisstopp bleiben die der Steuerung. Das Modul verbindet zwei Klemmen, die schon für den Taster da sind, für die Dauer eines Drucks.'),
		p('Text vom 29. Oktober 2026. Die Plus-1-Klemmen stehen in der europäischen Shelly-Dokumentation. Die Mini-Gen3-Werte sind dieselben wie im Garagentor-Guide dieser Website. Die YAML-Beispiele liefen hier nicht.'),
		h2('warum', 'Wozu', 'Wozu das Telefon'),
		p('Der Handsender bleibt im Auto oder im Haus. Das Telefon kann für eine Lieferung öffnen oder zeigen, dass ein Impuls wegging, sobald ein sicherer Fernzugang schon steht. Den Flügel sieht es nicht, solange kein passender Sensor das sagt.'),
		h2('ergebnis', 'Was Sie bekommen', 'Was am Ende gehen soll'),
		p('Denselben Impuls wie der Taster, aus der Shelly-App oder aus Home Assistant, mit Rückfrage. Wandtaster und Originalsender bleiben. Eine verlässliche Anzeige offen oder geschlossen liefert diese Liste nicht.'),
		{
			type: 'table',
			headers: ['Punkt', 'Detail'],
			rows: [
				['Ziel', 'Denselben Impuls senden wie der Taster der Steuerung.'],
				['Schwierigkeit', 'Mittel. 230 V im Kasten ist Elektroarbeit.'],
				['Dauer', 'Ein halber Tag. Schätzung, nicht gestoppt.'],
				['Budget', 'Katalogrichtwert: etwa 27–30 € je nach Profil. Der Konfigurator detailliert die Liste.'],
				['Material', 'Ein Shelly 1 Mini Gen3 oder ein Shelly Plus 1 je Steuerung. Hebelklemmen nur, wenn eine Klemme keine zwei Adern nimmt.'],
				['Software', 'Shelly-App, oder Home Assistant mit Shelly-Integration. ESPHome für die nackte Platine in einer anderen Anleitung.'],
				['Voraussetzungen', 'Ein schon motorisiertes Tor, ein Taster, der es bewegt, WLAN 2,4 GHz am Kasten, die Anleitung.'],
				['Risiken', '230 V im Kasten. Quetschen, wenn ein Befehl bei besetzter Bahn geht. Lichtschranken nie brücken. Port 8123 nicht öffnen. Nicht per Uhrzeit schließen.'],
			],
		},
		h2('situationen', 'Drei Fälle', 'Drei Wege zum selben Impuls'),
		p('Die Geste ist dieselbe. Es ändert sich, was schon da ist. Die Adresse kann tier, eco, qty und tech enthalten. Das sind Anzeigeparameter. Die kanonische URL bleibt ohne Parameter. Die live Liste steht auf der französischen Seite, der Konfigurator ist noch französisch. Die drei Fälle sind dieselben Entscheidungen.'),
		{ type: 'summary', text: 'Standard: empfohlenes Profil, Fall A, ein Tor, Shelly 1 Mini Gen3. Home Assistant ist kein Kauf.' },
		{
			type: 'sit',
			eco: 'ha-zigbee',
			current: true,
			title: 'Fall A — Home Assistant läuft schon',
			parts: ['Kein zweiter Server, kein Stick. Das Modul sendet den Impuls per WLAN. Der Mini Gen3 nimmt 110–240 V. Der Plus 1 kann nach Messung auch Kleinspannung. Kein Öffnungssensor in der Liste.'],
		},
		{
			type: 'sit',
			eco: 'maker-esp32',
			title: 'Fall B — Eine ESP32-Platine',
			parts: [
				'Eine ESP32 und ein Relais, dessen Trockenkontakt mit 3,3 V angesteuert wird, ersetzen das Shelly. Die Motorspannung liegt auch dort nicht an. Diese Schritte beschreiben das Shelly. Das Flashen steht in der ',
				link('ESPHome-Anleitung zum Garagentor', esp),
				'. Die Idee des Trockenkontakts ist dieselbe. Ein Torkasten ist kein Garagentorantrieb an der Decke.',
			],
		},
		{
			type: 'sit',
			eco: 'wifi-sans-box',
			title: 'Fall C — Die Shelly-App genügt',
			parts: ['Dieses Profil installiert kein Home Assistant. Die App sendet den Impuls, nachdem Auto-Aus gesetzt ist. Sie beweist nicht, dass der Flügel fuhr.'],
		},
		h3('Was Menge und Variante ändern'),
		{
			type: 'table',
			headers: ['Einstellung', 'Wirkung auf die Liste'],
			rows: [
				['Ein Tor', 'Ein Modul für eine Steuerung, auch wenn zwei Flügel an derselben Karte hängen.'],
				['Mehrere Tore', 'Ein Modul je Steuerung. Home Assistant bleibt ein Server.'],
				['Mini Gen3', 'Nur 110–240 V. Der kleinere Kasten.'],
				['Plus 1', 'Derselbe Kontakt I und O. Versorgung nach Messung: 110–240 V, stabilisierte 12 V oder 24–48 V.'],
			],
		},
		{
			type: 'config',
			noscript: 'Ohne JavaScript aktualisieren die Schaltflächen die Materialliste nicht. Die drei Situationen oben gelten weiterhin.',
		},
		p(
			'Katalogpreise stehen im Konfigurator. Eine Suche bei Amazon.de mit der Partnerkennung dieser Website ist eine Namenssuche und garantiert weder das genaue Modell noch den Bestand: ',
			link('Shelly Plus 1', marketSearch('de', 'Shelly Plus 1'), true),
			'. Die Klemmen stehen im Datenblatt, nicht auf der Suchseite.',
		),
		h2('architektur', 'Wie der Befehl läuft', 'Wie der Befehl zum Tor kommt'),
		p('Das Telefon fragt, Home Assistant ruft das Shelly, das Shelly ahmt den Taster nach. Lichtschranken und Steuerung entscheiden weiter, ob der Flügel fahren darf.'),
		{
			type: 'flow',
			caption: 'Der Befehl nutzt den Tasterkontakt. Modulversorgung und Motorspannung bleiben getrennt.',
			title: 'Torsteuerung über Trockenkontakt',
			desc: 'Telefon, Home Assistant, WLAN-Modul, Tasterklemmen, ursprüngliche Steuerung. Die Modulversorgung ist getrennt. Kein Innensensor auf dem Flügel.',
			boxes: [
				{ title: '1. Telefon', a: 'Fordert einen Impuls', b: 'Erst die Rückfrage' },
				{ title: '2. Home Assistant', a: 'Im lokalen Netz', b: 'Skript 0,5 s' },
				{ title: '3. Shelly, 2,4 GHz', a: 'I und O schließen kurz', b: 'SW ist nicht der Tortaster' },
				{ title: '4. Taster der Steuerung', a: 'Zwei Klemmen, parallel', b: 'Namen stehen in der Anleitung' },
				{ title: '5. Ursprüngliche Steuerung', a: 'Motor, Endlagen, Lichtschranken', b: 'Sender unverändert' },
				{ title: '6. Versorgung des Moduls', a: 'Nicht das Tasterpaar', b: '110–240 V oder gemessene Kleinspannung', tone: 'power' },
				{ title: '7. Kein Fenstersensor', a: 'Nicht auf dem Flügel draußen', b: 'Offen-Zustand fehlt in der Liste', tone: 'aside' },
			],
		},
		h2('material', 'Welches Material', 'Welches Modul die Schritte meinen'),
		{
			type: 'table',
			headers: ['Bedarf', 'Wahl in diesem Guide', 'Grenze'],
			rows: [
				['Impuls, enger Kasten', 'Shelly 1 Mini Gen3, Trockenkontakt, 2,4 GHz', 'Nur 110–240 V. Umgebung −20 °C bis 40 °C, Feuchte 30 bis 70 %.'],
				['Impuls, vielleicht 12 oder 24 V der Steuerung', 'Shelly Plus 1, potentialfreier Kontakt', '12 V ±10 % an 12 V, oder 24–48 V an +. Nicht vertauschen. Dieselbe Umgebung.'],
				['Zwei Adern in einer kleinen Klemme', 'Hebelklemmen, nur dann', 'Unnötig, wenn die Schraube beide Adern schon nimmt.'],
				['Wissen, ob der Flügel offen ist', 'Nicht in dieser Liste', 'SNZB-04P und Aqara P2 sind für innen. Ein Endlagenausgang nur, wenn die Anleitung ihn benennt.'],
				['Ohne Server bleiben', 'Dasselbe Shelly, in der App', 'Keine Home-Assistant-Historie.'],
			],
		},
		h2('schritte', 'Schritt für Schritt', 'Anschließen und prüfen'),
		p('Die acht Schritte sind Fall A: Home Assistant ist da, eine Steuerung, ein Tastereingang. Stopp, wenn die erwartete Beobachtung ausbleibt. Bahn bei jedem Versuch frei halten.'),
		{ type: 'steps' },
		h3('Die Lichtschranken behalten die Fahrt'),
		p('Schließt das Tor nicht, Lichtschranken reinigen und ausrichten. Die Drähte nicht brücken, um den Shelly-Test zu Ende zu bringen. Ein Impuls während der Fahrt stoppt. Ein weiterer startet wieder. Das Modul unterscheidet nicht offen, öffnend und schließend.'),
		h2('pruefen', 'Prüfen', 'Prüfen, dass es wirklich steuert'),
		{
			type: 'ul',
			items: [
				'Der ursprüngliche Taster startet und stoppt das Tor noch.',
				'Ein Shelly-Impuls macht dieselbe Geste, Bahn frei.',
				'Eine abgebrochene Rückfrage bewegt nichts.',
				'Verschmutzte oder verdeckte Lichtschranken verhindern das Schließen noch.',
				'Kein Motordraht liegt an I oder O.',
			],
		},
		h2('stoerung', 'Wenn nichts fährt', 'Wenn nichts fährt'),
		p('Nichts bewegt sich: Impuls zu kurz, I und O nicht auf den Tasterklemmen, oder das WLAN erreicht den Kasten nicht. Das Tor startet und stoppt: der Impuls zählt als zwei Drücke, kürzer stellen. Der Wandtaster ist tot: das Modul liegt in Reihe, oder ein Originaldraht fehlt. Strom aus, Foto zur Hand.'),
		p('Das Modul bleibt dunkel an einem „12-V“-Ausgang: erst messen. Viele Karten sind 24 V. Der Mini Gen3 nimmt beides nicht. Der Plus 1 nimmt 24 V nur an der dafür vorgesehenen Klemme, nicht an 12 V.'),
		h2('weiter', 'Weiter', 'Weiter'),
		p('Das Impulsskript tauscht die Kennung aus. Es lief hier nicht. Auto-Aus im Shelly bleibt an.'),
		{ type: 'pre', code: pulse('Torimpuls', 'switch.shelly_ersetzen') },
		h2('fragen', 'Fragen', 'Häufige Fragen'),
		{ type: 'faq' },
		h2('quellen', 'Quellen', 'Quellen'),
		{
			type: 'sources',
			items: [
				{ href: PLUS_DOC, text: 'Dokumentation Shelly Plus 1', note: '— I, O, 12 V, 24–48 V, Umgebung, 0,4 N·m.' },
				{ href: MINI_DOC, text: 'Produktseite Shelly 1 Mini Gen3', note: '— kompaktes Modul, Versorgung 110–240 V.' },
				{ href: HA_SHELLY, text: 'Shelly-Integration in Home Assistant' },
				{ href: HA_REMOTE, text: 'Fernzugriff Home Assistant', note: '— Port 8123 nicht freigeben.' },
				{ href: SONOFF_SNZB, text: 'Anleitung SONOFF SNZB-04P', note: '— innen, 20 mm: nicht am Flügel.' },
				{ href: AQARA_P2, text: 'Aqara Door and Window Sensor P2', note: '— Thread und Matter, innen: nicht verwendet.' },
				{ href: esp, text: 'ESPHome-Anleitung: Trockenkontakt und Reed' },
			],
		},
	],
});

const it = otherLocale('it', {
	inLanguage: 'it-IT',
	title: 'Aprire un cancello elettrico dal telefono',
	description:
		'Contatto pulito sul pulsante della centrale. I 230 V del motore non vengono interrotti. Nessun sensore da interno sul battente.',
	howToDescription:
		'Trovare i morsetti del pulsante, collegare un contatto pulito, impostare un impulso breve e non inventare lo stato aperto.',
	articleDescription:
		'Il modulo copia il pulsante della centrale. Non interrompe i 230 V del motore. Un sensore da finestra per interni non va sul battente.',
	tocAria: 'Sommario',
	stepWord: 'Passo',
	whereWord: 'Dove:',
	checkWord: 'Verifica:',
	summaries: {
		'ha-zigbee':
			'Caso A, profilo consigliato, {qty}. {tech} Home Assistant è già in funzione. Il modulo è Wi-Fi. Nessun sensore Zigbee nell’elenco.',
		'maker-esp32':
			'Caso B, profilo ESP32, {qty}. {tech} L’elenco mostra la scheda ESP32. Il relè a contatto pulito è nel tutorial ESPHome. Il reed non è dato per esterno.',
		'wifi-sans-box':
			'Caso C, solo app Shelly, {qty}. {tech} L’app invia l’impulso. Home Assistant e lo stato aperto non sono nell’elenco.',
	},
	qtyLabels: {
		'1': 'un cancello',
		'2': 'due cancelli',
		'3-5': 'la fascia da 3 a 5 cancelli',
		'6+': 'la fascia da 6 cancelli in su',
	},
	techNotes: {
		'shelly-mini': 'Mini Gen3: alimentazione solo 110–240 V.',
		'shelly-plus1': 'Plus 1: 110–240 V, 12 V stabilizzati o 24–48 V, dopo la misura.',
		default: 'Mini Gen3: alimentazione solo 110–240 V.',
	},
	steps: [
		{
			title: 'Leggere il manuale prima di aprire la centrale',
			why: 'Il telefono ripete solo un pulsante che la scheda ha già. Se non c’è, il progetto si ferma.',
			where: 'Il manuale della centrale, non il coperchio.',
			actions: [
				'Cercate l’ingresso del pulsante a muro: start, passo-passo, PP o il nome del manuale. Lo schema mostra allora due morsetti.',
				'Se apertura e chiusura sono due ingressi, un solo modulo sostituisce un solo pulsante. I passi valgono per un ingresso unico, quello che usate già.',
				'Fotocellule, stop e rilevamento ostacolo non ricevono il relè.',
				'Se il cancello si comanda solo via radio, senza morsetti pulsante, non inventate un ingresso sulla scheda.',
			],
			observe: 'Sapete nominare i due morsetti che il modulo deve copiare.',
			check: 'Con il passaggio libero, una pressione fa partire il cancello e una seconda durante la corsa lo ferma.',
		},
		{
			title: 'Togliere corrente, poi aprire',
			why: 'Il pulsante è spesso un contatto pulito, ma nella centrale c’è la tensione del motore.',
			where: 'Il quadro, poi la centrale. Il collegamento fisso a 230 V si fa fuori tensione, da una persona qualificata.',
			actions: [
				'Individuate l’interruttore del cancello. Se non è segnato, non indovinate.',
				'Staccatelo. Pulsante e lampeggiante non devono più rispondere.',
				'Aprite e fotografate la morsettiera prima di spostare un filo. Lasciate motore, terra e fotocellule dov’erano.',
				'Se non sapete verificare l’assenza di tensione sui morsetti 230 V, fermatevi alla foto.',
			],
			observe: 'La foto mostra due morsetti pulsante, distinti dall’alimentazione del motore.',
			check: 'Nessun filo di motore o di fotocellula è stato tolto.',
		},
		{
			title: 'Dare un nome ai morsetti prima di serrarli',
			why: 'Mini Gen3 e Plus 1 hanno un contatto libero da potenziale, ma l’alimentazione non è la stessa. Confonderli manda la rete sulla scheda del cancello.',
			where: 'Il modulo sul tavolo, pagina Shelly aperta.',
			actions: [
				'Plus 1: I e O sono il contatto. Fase e neutro, 12 V stabilizzati e 24–48 V sono tre alimentazioni. La pagina europea Shelly indica 12 V DC ±10 % sul morsetto 12 V e 24–48 V DC sul morsetto +. I 24 V non vanno sul morsetto 12 V. Coppia 0,4 N·m. Ambiente da −20 °C a 40 °C, umidità dal 30 al 70 %.',
				'Mini Gen3: I e O sono il contatto, L e N solo 110–240 V. Non ha ingresso a 12 V. Gli stessi limiti e la coppia 0,4 N·m sono quelli già usati per la porta del garage su questo sito.',
				'SW è un ingresso per un interruttore del modulo. Il pulsante del cancello non ci va.',
				'Una centrale al sole o sotto la pioggia esce da questa scheda. Il modulo resta all’asciutto, non sul palo.',
			],
			observe: 'Indicate I, O e l’alimentazione scelta, e sapete quale modulo è nella scatola.',
			check: 'Nessun filo del pulsante è previsto su L, N, SW, 12 V o +.',
		},
		{
			title: 'Collegare I e O, alimentare il modulo a parte',
			why: 'Il pulsante già presente deve continuare a funzionare. Il modulo si aggiunge accanto.',
			where: 'Fuori tensione: i due morsetti del pulsante, poi l’alimentazione del modulo.',
			actions: [
				'Due conduttori da I e O ai due morsetti del pulsante, in parallelo ai fili già lì. Il verso non conta. Quei due fili non portano la tensione del motore.',
				'Né fase né neutro su quei morsetti. Il motore non va tra I e O. La pagina del Plus 1 parla di un circuito di carico: non è il motore del cancello.',
				'Alimentate il modulo sul suo circuito. Plus 1: 110–240 V su L e N, oppure 12 V stabilizzati, oppure 24–48 V, solo dopo aver misurato l’uscita accessoria. Mini Gen3: solo 110–240 V su L e N.',
				'Se un morsetto non accetta due conduttori, serve un morsetto a leva. Altrimenti no. Chiudete prima di ridare corrente.',
			],
			observe: 'La centrale è chiusa, l’interruttore è inserito, niente scalda.',
			check: 'Il pulsante originale fa ancora partire e fermare il cancello, passaggio libero, prima di ogni prova dal telefono.',
		},
		{
			title: 'Impostare un impulso breve e provare una volta',
			why: 'Senza timer il contatto può restare chiuso. La centrale vede un dito che non lascia il pulsante.',
			where: 'Wi-Fi 2,4 GHz, interfaccia Shelly, passaggio libero.',
			actions: [
				'Entrambi i moduli usano solo i 2,4 GHz. Una rete solo a 5 GHz non li vede. Alla centrale la pagina del modulo deve aprirsi, altrimenti il Wi-Fi al cancello è troppo debole.',
				'Attivate lo spegnimento automatico dell’uscita, verso 0,5 s.',
				'Riservate l’indirizzo del modulo nel router.',
				'Un solo impulso, nessuno nel passaggio. Se non si muove nulla, provate 1 s. Se parte e si ferma subito, l’impulso è troppo lungo.',
				'Il cloud Shelly può restare spento. Home Assistant parla al modulo in rete locale.',
			],
			observe: 'Il relè scatta un attimo, il cancello parte, una seconda prova durante la corsa lo ferma.',
			check: 'Pulsante e telecomando originali funzionano ancora.',
		},
		{
			title: 'Aggiungere il modulo a Home Assistant senza inventare la posizione',
			why: 'Home Assistant deve vedere un interruttore che dà l’impulso. Con questo elenco non sa se il cancello è aperto.',
			where: 'Impostazioni, Dispositivi e servizi, poi Script.',
			actions: [
				'Aggiungete l’integrazione Shelly. Se non compare, indicate l’indirizzo riservato.',
				'Annotate l’identificativo dell’interruttore in Strumenti per sviluppatori, Stati.',
				'Create uno script: accendi, attendi 0,5 s, spegni, modo single. L’esempio più sotto non è stato eseguito qui.',
				'Lasciate lo spegnimento automatico nello Shelly.',
				'Non aggiungete un modello « cancello aperto » finché non avete un sensore di cui avete verificato gli stati. Un sensore da finestra per interni sul battente non lo è.',
			],
			observe: 'Lanciare lo script una volta, passaggio libero, fa lo stesso movimento del pulsante.',
			check: 'Lo script non parte da solo quando usate il telecomando.',
		},
		{
			title: 'Decidere lo stato aperto senza un sensore da interno all’aperto',
			why: 'Senza sensore il telefono sa di aver inviato un impulso. Non sa se il battente si è mosso. SNZB-04P e Aqara P2 non risolvono il punto su un cancello.',
			where: 'Il manuale della centrale, poi le schede dei sensori.',
			actions: [
				'La pagina Sonoff dello SNZB-04P lo tiene in interni, con uno scarto di al massimo 20 mm. Un battente sotto la pioggia ne esce.',
				'L’Aqara Door and Window Sensor P2 parla Thread e Matter, non Zigbee. Aqara lo destina agli interni. Non si associa a una chiavetta Zigbee e non va sul cancello.',
				'Alcune centrali hanno un’uscita di finecorsa a contatto pulito, disegnata nel manuale. È l’unica pista di stato, e solo se lo schema la nomina.',
				'Il reed del profilo ESP32 non è dato per esterno. Resta in un luogo asciutto, se la sua scheda lo consente.',
			],
			observe: 'Sapete se il manuale offre un’uscita di stato, o se il telefono mostrerà solo l’impulso.',
			check: 'Nessun magnete di sensore finestra è incollato sul battente.',
		},
		{
			title: 'Chiedere conferma e non richiudere da soli',
			why: 'Una chiusura automatica può schiacciare una persona, un animale o un veicolo. Le fotocellule riducono il rischio. Non lo tolgono.',
			where: 'La plancia, poi le automazioni.',
			actions: [
				'Scheda pulsante con conferma, sullo script dell’impulso. Il testo chiede se si comanda davvero il cancello.',
				'Dall’esterno usate un accesso remoto già affidabile. Non aprite la porta 8123.',
				'Un avviso « rimasto aperto » è possibile solo quando esiste un vero sensore di stato. Non contiene alcuna chiusura.',
				'Niente chiusura a orario fisso, all’uscita di casa o « dopo il passaggio dell’auto ».',
			],
			observe: 'Il telefono chiede conferma prima di inviare l’impulso.',
			check: 'Un tocco annullato non muove il cancello.',
		},
	],
	faq: [
		{
			question: 'Si possono interrompere i 230 V del motore per aprire il cancello?',
			answer:
				'No. Motore, finecorsa e rilevamento ostacolo restano della centrale. I e O imitano il pulsante per un attimo. L’alimentazione del modulo è un altro circuito.',
		},
		{
			question: 'Lo Shelly Plus 1 può alimentarsi a 12 V o 24 V della centrale?',
			answer:
				'Solo dopo la misura, e sul morsetto giusto. Shelly indica 12 V DC ±10 % sul morsetto 12 V e 24–48 V DC sul morsetto +. I 24 V non vanno sul morsetto 12 V. Il Mini Gen3 prende 110–240 V su L e N, non 12 V.',
		},
		{
			question: 'Serve un coordinatore Zigbee?',
			answer:
				'No per questo elenco. Il comando è in Wi-Fi. Il sensore Zigbee da interno non va sul battente, quindi la chiavetta non ha nulla da associare qui.',
		},
		{
			question: 'Perché non l’Aqara P2 sul cancello?',
			answer:
				'È un sensore Thread e Matter, previsto da Aqara per gli interni. Non si associa a una chiavetta Zigbee, e un battente all’aperto esce da questo uso.',
		},
		{
			question: 'Si può chiudere il cancello da solo la sera?',
			answer:
				'Non in questa guida. Un impulso non sorvegliato può schiacciare chi è nel passaggio. Le fotocellule non rendono accettabile questa scena.',
		},
	],
	blocks: (esp) => [
		p('Il cancello si apre già con un pulsante e un telecomando. Il telefono ripete quel gesto. Motore, fotocellule e stop ostacolo restano quelli della centrale. Il modulo unisce due morsetti già previsti per il pulsante, per la durata di una pressione.'),
		p('Testo rivisto il 29 ottobre 2026. I morsetti del Plus 1 vengono dalla documentazione europea Shelly. I dati del Mini Gen3 sono quelli già usati per la porta del garage su questo sito. Gli esempi YAML non sono stati caricati qui.'),
		h2('perche', 'A che serve', 'A che serve il telefono'),
		p('Il telecomando resta in auto o in casa. Il telefono può aprire per una consegna o mostrare che un impulso è partito, se esiste già un accesso remoto sicuro. Non vede il battente finché un sensore adatto non lo dice.'),
		h2('risultato', 'Che cosa ottenete', 'Che cosa funzionerà'),
		p('Lo stesso impulso del pulsante, dall’app Shelly o da Home Assistant, con una conferma. Pulsante a muro e telecomando originale restano. Questo elenco non dà una spia affidabile aperto o chiuso.'),
		{
			type: 'table',
			headers: ['Punto', 'Dettaglio'],
			rows: [
				['Obiettivo', 'Inviare lo stesso impulso del pulsante della centrale.'],
				['Difficoltà', 'Intermedia. I 230 V nella centrale sono un lavoro elettrico.'],
				['Tempo', 'Mezza giornata. Stima, non cronometrata.'],
				['Budget', 'Stima catalogo: circa 27–30 € secondo il profilo. Il configuratore dettaglia l’elenco.'],
				['Materiale', 'Uno Shelly 1 Mini Gen3 o uno Shelly Plus 1 per centrale. Morsetti a leva solo se una vite non accetta due fili.'],
				['Software', 'App Shelly, oppure Home Assistant e l’integrazione Shelly. ESPHome per la scheda nuda, in un’altra guida.'],
				['Prima di iniziare', 'Un cancello già motorizzato, un pulsante che lo muove, Wi-Fi 2,4 GHz alla centrale, il manuale.'],
				['Rischi', '230 V nella centrale. Schiacciamento se un comando parte a passaggio occupato. Non ponticellare le fotocellule. Non aprire la porta 8123. Non chiudere con un orario.'],
			],
		},
		h2('situazioni', 'Tre casi', 'Tre modi per lo stesso impulso'),
		p('Il gesto è lo stesso. Cambia ciò che avete già. L’indirizzo può contenere tier, eco, qty e tech. Sono impostazioni di visualizzazione. L’URL canonico resta senza parametri. L’elenco dal vivo è sulla pagina francese: il configuratore è ancora in francese. I tre casi sono le stesse scelte.'),
		{ type: 'summary', text: 'Lettura predefinita: profilo consigliato, caso A, un cancello, Shelly 1 Mini Gen3. Home Assistant non è un acquisto.' },
		{
			type: 'sit',
			eco: 'ha-zigbee',
			current: true,
			title: 'Caso A — Home Assistant è già in funzione',
			parts: ['Non comprate un secondo server, né una chiavetta. Il modulo invia l’impulso in Wi-Fi. Il Mini Gen3 si alimenta a 110–240 V. Il Plus 1 accetta anche una bassa tensione, dopo la misura. Nessun sensore di apertura nell’elenco.'],
		},
		{
			type: 'sit',
			eco: 'maker-esp32',
			title: 'Caso B — Flashate una scheda ESP32',
			parts: [
				'Una ESP32 e un relè il cui contatto pulito si comanda a 3,3 V sostituiscono lo Shelly. I 230 V del motore non vanno nemmeno lì. Questi passi descrivono lo Shelly. Il flash è nel ',
				link('tutorial ESPHome della porta garage', esp),
				'. L’idea del contatto pulito è la stessa. La centrale di un cancello non è il motore a soffitto di un garage.',
			],
		},
		{
			type: 'sit',
			eco: 'wifi-sans-box',
			title: 'Caso C — Basta l’app Shelly',
			parts: ['Questo profilo non installa Home Assistant. L’app invia l’impulso dopo lo spegnimento automatico. Non dimostra che il battente si sia mosso.'],
		},
		h3('Che cosa cambiano quantità e variante'),
		{
			type: 'table',
			headers: ['Impostazione', 'Effetto sull’elenco'],
			rows: [
				['Un cancello', 'Un modulo per una centrale, anche se due ante condividono la stessa scheda.'],
				['Più cancelli', 'Un modulo per centrale. Home Assistant resta uno.'],
				['Mini Gen3', 'Solo 110–240 V. Contenitore più piccolo.'],
				['Plus 1', 'Lo stesso contatto I e O. Alimentazione dopo la misura: 110–240 V, 12 V stabilizzati o 24–48 V.'],
			],
		},
		{
			type: 'config',
			noscript: 'Senza JavaScript, i pulsanti non aggiornano l’elenco materiale. Le tre situazioni sopra restano valide.',
		},
		p(
			'I prezzi di catalogo compaiono nel configuratore. Una ricerca su Amazon.it con il codice partner del sito è una ricerca per nome e non garantisce il modello esatto né la disponibilità: ',
			link('Shelly Plus 1', marketSearch('it', 'Shelly Plus 1'), true),
			'. I morsetti stanno nella scheda tecnica, non nella pagina di ricerca.',
		),
		h2('architettura', 'Come arriva il comando', 'Come il comando arriva al cancello'),
		p('Il telefono chiede, Home Assistant chiama lo Shelly, lo Shelly imita il pulsante. Fotocellule e centrale decidono ancora se il battente può muoversi.'),
		{
			type: 'flow',
			caption: 'Il comando usa il contatto del pulsante. L’alimentazione del modulo e i 230 V del motore restano a parte.',
			title: 'Cancello elettrico, comando a contatto pulito',
			desc: 'Telefono, Home Assistant, modulo Wi-Fi, morsetti del pulsante, centrale originale. L’alimentazione del modulo è separata. Nessun sensore da interno sul battente.',
			boxes: [
				{ title: '1. Telefono', a: 'Chiede un impulso', b: 'Prima la conferma' },
				{ title: '2. Home Assistant', a: 'Sulla rete locale', b: 'Script di 0,5 s' },
				{ title: '3. Shelly, 2,4 GHz', a: 'I e O si chiudono un attimo', b: 'SW non è il pulsante' },
				{ title: '4. Pulsante della centrale', a: 'Due morsetti, in parallelo', b: 'I nomi sono nel manuale' },
				{ title: '5. Centrale originale', a: 'Motore, finecorsa, fotocellule', b: 'Telecomando invariato' },
				{ title: '6. Alimentazione del modulo', a: 'Non la coppia del pulsante', b: '110–240 V o bassa tensione misurata', tone: 'power' },
				{ title: '7. Nessun sensore finestra', a: 'Non sul battente fuori', b: 'Lo stato aperto non è in elenco', tone: 'aside' },
			],
		},
		h2('materiale', 'Quale materiale', 'Quale modulo seguono i passi'),
		{
			type: 'table',
			headers: ['Bisogno', 'Scelta in questa guida', 'Limite'],
			rows: [
				['Inviare l’impulso, centrale stretta', 'Shelly 1 Mini Gen3, contatto pulito, 2,4 GHz', 'Solo 110–240 V. Ambiente da −20 °C a 40 °C, umidità dal 30 al 70 %.'],
				['Inviare l’impulso, e magari i 12 o 24 V della centrale', 'Shelly Plus 1, contatto libero da potenziale', '12 V ±10 % sul morsetto 12 V, o 24–48 V su +. Non uno sull’altro. Stessi limiti.'],
				['Unire due fili in un morsetto piccolo', 'Morsetti a leva, solo allora', 'Inutili se la vite accetta già entrambi i fili.'],
				['Sapere se il battente è aperto', 'Non in questo elenco', 'SNZB-04P e Aqara P2 sono da interno. Un’uscita di finecorsa solo se il manuale la nomina.'],
				['Restare senza server', 'Lo stesso Shelly, nella sua app', 'Nessuno storico Home Assistant.'],
			],
		},
		h2('passi', 'Passo per passo', 'Collegare e provare'),
		p('Gli otto passi sono il caso A: Home Assistant già presente, una centrale, un ingresso pulsante. Fermatevi se l’osservazione attesa non arriva. Passaggio libero a ogni prova.'),
		{ type: 'steps' },
		h3('Le fotocellule restano padrone della corsa'),
		p('Se il cancello non si chiude, pulite e riallineate le fotocellule. Non ponticellate i fili per finire la prova dello Shelly. Un impulso durante la corsa ferma il movimento. Ne serve un altro per ripartire. Il modulo non distingue aperto, in apertura e in chiusura.'),
		h2('verifica', 'Verificare', 'Verificare che comandi davvero'),
		{
			type: 'ul',
			items: [
				'Il pulsante originale fa ancora partire e fermare il cancello.',
				'Un impulso Shelly fa lo stesso gesto, passaggio libero.',
				'Una conferma annullata non muove nulla.',
				'Fotocellule sporche o coperte impediscono ancora la chiusura.',
				'Nessun filo del motore è su I o O.',
			],
		},
		h2('guasti', 'Se non parte', 'Quando non parte'),
		p('Non si muove nulla: impulso troppo corto, I e O non sui morsetti del pulsante, oppure il Wi-Fi non arriva alla centrale. Parte e si ferma: l’impulso conta come due pressioni, accorciatelo. Il pulsante a muro è morto: il modulo è in serie, o è stato tolto un filo originale. Togliete corrente e riprendete la foto.'),
		p('Il modulo resta spento su un’uscita « 12 V »: misurate prima. Molte schede sono a 24 V. Il Mini Gen3 non accetta nessuno dei due. Il Plus 1 accetta i 24 V solo sul morsetto previsto, non sul morsetto 12 V.'),
		h2('oltre', 'Per andare oltre', 'Per andare oltre'),
		p('Lo script dell’impulso sostituisce l’identificativo. Non è stato eseguito qui. Lo spegnimento automatico nello Shelly resta attivo.'),
		{ type: 'pre', code: pulse('Impulso cancello', 'switch.sostituire_shelly') },
		h2('domande', 'Domande', 'Domande frequenti'),
		{ type: 'faq' },
		h2('fonti', 'Fonti', 'Fonti'),
		{
			type: 'sources',
			items: [
				{ href: PLUS_DOC, text: 'Documentazione Shelly Plus 1', note: '— I, O, 12 V, 24–48 V, ambiente, 0,4 N·m.' },
				{ href: MINI_DOC, text: 'Scheda Shelly 1 Mini Gen3', note: '— modulo compatto, alimentazione 110–240 V.' },
				{ href: HA_SHELLY, text: 'Integrazione Shelly in Home Assistant' },
				{ href: HA_REMOTE, text: 'Accesso remoto Home Assistant', note: '— non esporre la porta 8123.' },
				{ href: SONOFF_SNZB, text: 'Manuale SONOFF SNZB-04P', note: '— interni, 20 mm: non usato sul battente.' },
				{ href: AQARA_P2, text: 'Aqara Door and Window Sensor P2', note: '— Thread e Matter, interni: non usato.' },
				{ href: esp, text: 'Tutorial ESPHome: contatto pulito e reed' },
			],
		},
	],
});

const es = otherLocale('es', {
	inLanguage: 'es-ES',
	title: 'Abrir un portón eléctrico desde el teléfono',
	description:
		'Contacto seco en el pulsador del cuadro. Los 230 V del motor no se conmutan. Ningún sensor de interior pegado en la hoja.',
	howToDescription:
		'Localizar el pulsador del cuadro, conectar un contacto seco, ajustar un impulso corto y no inventar el estado abierto.',
	articleDescription:
		'El módulo copia el pulsador del cuadro. No corta los 230 V del motor. Un sensor de ventana de interior no va en la hoja.',
	tocAria: 'Contenido',
	stepWord: 'Paso',
	whereWord: 'Dónde:',
	checkWord: 'Comprobación:',
	summaries: {
		'ha-zigbee':
			'Caso A, perfil recomendado, {qty}. {tech} Home Assistant ya está en marcha. El módulo es Wi-Fi. No hay sensor Zigbee en la lista.',
		'maker-esp32':
			'Caso B, perfil ESP32, {qty}. {tech} La lista muestra la placa ESP32. El relé de contacto seco está en el tutorial ESPHome. El reed no se vende como estanco.',
		'wifi-sans-box':
			'Caso C, solo la aplicación Shelly, {qty}. {tech} La aplicación envía el impulso. Home Assistant y el estado abierto no están en la lista.',
	},
	qtyLabels: {
		'1': 'un portón',
		'2': 'dos portones',
		'3-5': 'el tramo de 3 a 5 portones',
		'6+': 'el tramo de 6 portones o más',
	},
	techNotes: {
		'shelly-mini': 'Mini Gen3: alimentación solo a 110–240 V.',
		'shelly-plus1': 'Plus 1: 110–240 V, 12 V estabilizados o 24–48 V, después de medir.',
		default: 'Mini Gen3: alimentación solo a 110–240 V.',
	},
	steps: [
		{
			title: 'Leer el manual antes de abrir el cuadro',
			why: 'El teléfono solo repite un pulsador que la placa ya tiene. Si no existe, el proyecto se detiene.',
			where: 'El manual del cuadro, no la tapa.',
			actions: [
				'Busque la entrada del pulsador de pared: start, paso a paso, PP o el nombre del manual. El esquema muestra entonces dos bornes.',
				'Si apertura y cierre son dos entradas, un solo módulo sustituye un solo pulsador. Los pasos valen para una entrada única, la que ya usa.',
				'Las fotocélulas, la parada y la detección de obstáculo no reciben el relé.',
				'Si el portón solo se manda por radio, sin bornes de pulsador, no invente una entrada en la placa.',
			],
			observe: 'Puede nombrar los dos bornes que el módulo debe copiar.',
			check: 'Con el paso libre, una pulsación arranca el portón y una segunda durante la carrera lo para.',
		},
		{
			title: 'Cortar el circuito y solo entonces abrir',
			why: 'El pulsador suele ser un contacto seco, pero el cuadro contiene la tensión del motor.',
			where: 'El cuadro eléctrico de la casa, luego el del portón. La conexión fija a 230 V se hace sin tensión, por una persona cualificada.',
			actions: [
				'Identifique el magnetotérmico del portón. Si no está rotulado, no lo adivine.',
				'Córtelo. El pulsador y el destellador no deben responder.',
				'Abra y fotografíe la regleta antes de mover un cable. Deje el motor, la tierra y las fotocélulas donde estaban.',
				'Si no sabe comprobar la ausencia de tensión en los bornes de 230 V, quédese en la foto.',
			],
			observe: 'La foto muestra dos bornes de pulsador, distintos de la alimentación del motor.',
			check: 'No se ha retirado ningún cable de motor ni de fotocélula.',
		},
		{
			title: 'Nombrar los bornes antes de apretarlos',
			why: 'El Mini Gen3 y el Plus 1 tienen un contacto libre de potencial, pero la alimentación no es la misma. Mezclarlos manda la red a la placa del portón.',
			where: 'El módulo en la mesa, con la ficha Shelly abierta.',
			actions: [
				'Plus 1: I y O son el contacto. Fase y neutro, 12 V estabilizados y 24–48 V son tres alimentaciones. La página europea de Shelly indica 12 V CC ±10 % en el borne 12 V y 24–48 V CC en el borne +. Los 24 V no van al borne de 12 V. Par de apriete 0,4 N·m. Ambiente de −20 °C a 40 °C, humedad del 30 al 70 %.',
				'Mini Gen3: I y O son el contacto, L y N solo 110–240 V. No tiene entrada de 12 V. Los mismos límites y el par de 0,4 N·m son los ya usados para la puerta de garaje en este sitio.',
				'SW es una entrada para un interruptor del módulo. El pulsador del portón no se conecta ahí.',
				'Un cuadro a pleno sol o bajo la lluvia sale de esa ficha. El módulo se queda en seco, no en el poste.',
			],
			observe: 'Señala I, O y la alimentación elegida, y sabe qué módulo hay en la caja.',
			check: 'Ningún cable del pulsador está previsto en L, N, SW, 12 V o +.',
		},
		{
			title: 'Conectar I y O, y alimentar el módulo aparte',
			why: 'El pulsador que ya está debe seguir funcionando. El módulo se añade al lado.',
			where: 'Sin tensión: los dos bornes del pulsador, luego la alimentación del módulo.',
			actions: [
				'Dos conductores de I y O a los dos bornes del pulsador, en paralelo con los cables que ya hay. El sentido no importa. Esos dos hilos no llevan la tensión del motor.',
				'Ni fase ni neutro en esos bornes. El motor no va entre I y O. La ficha del Plus 1 habla de un circuito de carga: no es el motor del portón.',
				'Alimente el módulo en su propio circuito. Plus 1: 110–240 V en L y N, o 12 V estabilizados, o 24–48 V, solo después de medir la salida de accesorios. Mini Gen3: solo 110–240 V en L y N.',
				'Si un borne no admite dos conductores, hace falta un borne de palanca. Si no, no. Cierre antes de rearmar.',
			],
			observe: 'El cuadro está cerrado, el magnetotérmico está arriba y nada se calienta.',
			check: 'El pulsador original sigue arrancando y parando el portón, paso libre, antes de cualquier prueba desde el teléfono.',
		},
		{
			title: 'Ajustar un impulso corto y probar una vez',
			why: 'Sin temporizador el contacto puede quedar cerrado. La placa ve entonces un dedo que no suelta el pulsador.',
			where: 'Wi-Fi de 2,4 GHz, interfaz Shelly, paso libre.',
			actions: [
				'Los dos módulos solo hablan en 2,4 GHz. Una red solo de 5 GHz no los ve. En el cuadro, la página del módulo tiene que abrirse. Si no, el Wi-Fi del portón es demasiado débil.',
				'Active el apagado automático de la salida, hacia 0,5 s.',
				'Reserve la dirección del módulo en el router.',
				'Un solo impulso, nadie en el paso. Si no se mueve nada, pruebe 1 s. Si arranca y se para enseguida, el impulso es demasiado largo.',
				'La nube Shelly puede quedar apagada. Home Assistant habla con el módulo en la red local.',
			],
			observe: 'El relé pega un instante, el portón arranca y una segunda prueba durante la carrera lo para.',
			check: 'El pulsador y el mando originales siguen funcionando.',
		},
		{
			title: 'Añadir el módulo a Home Assistant sin inventar la posición de la hoja',
			why: 'Home Assistant debe ver un interruptor que da el impulso. Con esta lista no sabe si el portón está abierto.',
			where: 'Ajustes, Dispositivos y servicios, luego Scripts.',
			actions: [
				'Añada la integración Shelly. Si no aparece, indique la dirección reservada.',
				'Anote el identificador del interruptor en Herramientas para desarrolladores, Estados.',
				'Cree un script: encender, esperar 0,5 s, apagar, modo single. El ejemplo de más abajo no se ha ejecutado aquí.',
				'Deje el apagado automático en el Shelly.',
				'No añada un modelo « portón abierto » hasta tener un sensor cuyos estados haya comprobado. Un sensor de ventana de interior en la hoja no lo es.',
			],
			observe: 'Lanzar el script una vez, paso libre, hace el mismo movimiento que el pulsador.',
			check: 'El script no arranca solo cuando usa el mando.',
		},
		{
			title: 'Decidir el estado abierto sin un sensor de interior en el exterior',
			why: 'Sin sensor, el teléfono sabe que envió un impulso. No sabe si la hoja se movió. El SNZB-04P y el Aqara P2 no lo resuelven en un portón.',
			where: 'El manual del cuadro y luego las fichas de los sensores.',
			actions: [
				'La ficha Sonoff del SNZB-04P lo reserva al interior, con una separación de 20 mm como máximo. Una hoja a la lluvia queda fuera.',
				'El Aqara Door and Window Sensor P2 habla Thread y Matter, no Zigbee. Aqara lo destina al interior. No se asocia a un dongle Zigbee y no va en el portón.',
				'Algunas placas tienen una salida de fin de carrera en contacto seco, dibujada en el manual. Es la única vía de estado, y solo si el esquema la nombra.',
				'El reed del perfil ESP32 no se vende como estanco. Se queda en un sitio seco, si su propia ficha lo permite.',
			],
			observe: 'Sabe si el manual ofrece una salida de estado, o si el teléfono solo mostrará el impulso.',
			check: 'Ningún imán de sensor de ventana está pegado en la hoja.',
		},
		{
			title: 'Pedir confirmación y no cerrar solo',
			why: 'Un cierre automático puede atrapar a una persona, un animal o un vehículo. Las fotocélulas reducen el riesgo. No lo eliminan.',
			where: 'El panel y luego las automatizaciones.',
			actions: [
				'Tarjeta de botón con confirmación, sobre el script del impulso. El texto pregunta si de verdad se acciona el portón.',
				'Desde fuera, use un acceso remoto que ya confíe. No abra el puerto 8123.',
				'Un aviso de « quedó abierto » solo es posible cuando existe un sensor de estado de verdad. No contiene ninguna acción de cierre.',
				'Nada de cierre a una hora fija, al salir de casa ni « cuando ha pasado el coche ».',
			],
			observe: 'El teléfono pide confirmación antes de enviar el impulso.',
			check: 'Una pulsación cancelada no mueve el portón.',
		},
	],
	faq: [
		{
			question: '¿Se pueden cortar los 230 V del motor para abrir el portón?',
			answer:
				'No. El motor, los finales de carrera y la detección de obstáculo siguen en el cuadro. I y O imitan el pulsador un instante. La alimentación del módulo es otro circuito.',
		},
		{
			question: '¿El Shelly Plus 1 puede alimentarse con los 12 V o los 24 V del cuadro?',
			answer:
				'Solo después de medir, y en el borne correcto. Shelly indica 12 V CC ±10 % en el borne de 12 V y 24–48 V CC en el borne +. Los 24 V no van al borne de 12 V. El Mini Gen3 se alimenta a 110–240 V en L y N, no a 12 V.',
		},
		{
			question: '¿Hace falta un coordinador Zigbee?',
			answer:
				'No para esta lista. La orden va por Wi-Fi. El sensor Zigbee de interior no se usa en una hoja exterior, así que el dongle no tiene nada que asociar aquí.',
		},
		{
			question: '¿Por qué no el Aqara P2 en el portón?',
			answer:
				'Es un sensor Thread y Matter, previsto por Aqara para interior. No se asocia a un dongle Zigbee, y una hoja a la intemperie queda fuera de ese uso.',
		},
		{
			question: '¿Puede cerrarse el portón solo por la noche?',
			answer:
				'No en esta guía. Un impulso sin vigilancia puede atrapar lo que haya en el paso. Las fotocélulas no hacen aceptable esa escena aquí.',
		},
	],
	blocks: (esp) => [
		p('El portón ya se abre con un pulsador y un mando. El teléfono repite ese gesto. El motor, las fotocélulas y la parada por obstáculo siguen siendo los del cuadro. El módulo une dos bornes ya previstos para el pulsador, el tiempo de una pulsación.'),
		p('Texto revisado el 29 de octubre de 2026. Los bornes del Plus 1 salen de la documentación europea de Shelly. Las cifras del Mini Gen3 son las ya usadas para la puerta de garaje en este sitio. Los ejemplos YAML no se han cargado aquí.'),
		h2('para-que', 'Para qué sirve', 'Para qué sirve el teléfono'),
		p('El mando se queda en el coche o en casa. El teléfono puede abrir para un reparto o mostrar que un impulso salió, si ya hay un acceso remoto seguro. No ve la hoja hasta que un sensor adecuado lo dice.'),
		h2('resultado', 'Qué obtiene', 'Qué va a obtener'),
		p('El mismo impulso que el pulsador, desde la aplicación Shelly o desde Home Assistant, con una confirmación. El pulsador de pared y el mando original siguen en servicio. Esta lista no da un piloto fiable de abierto o cerrado.'),
		{
			type: 'table',
			headers: ['Punto', 'Detalle'],
			rows: [
				['Objetivo', 'Enviar el mismo impulso que el pulsador del cuadro.'],
				['Dificultad', 'Intermedia. Los 230 V del cuadro son un trabajo eléctrico.'],
				['Tiempo', 'Media jornada. Estimación, no cronometrada.'],
				['Presupuesto', 'Estimación de catálogo: unos 27–30 € según el perfil. El configurador detalla la lista.'],
				['Material', 'Un Shelly 1 Mini Gen3 o un Shelly Plus 1 por cuadro. Bornes de palanca solo si un tornillo no admite dos hilos.'],
				['Programas', 'Aplicación Shelly, o Home Assistant y su integración Shelly. ESPHome para la placa desnuda, en otra guía.'],
				['Antes de empezar', 'Un portón ya motorizado, un pulsador que lo mueve, Wi-Fi de 2,4 GHz en el cuadro y el manual.'],
				['Riesgos', '230 V en el cuadro. Aplastamiento si una orden sale con el paso ocupado. No puentear las fotocélulas. No abrir el puerto 8123. No cerrar con un horario.'],
			],
		},
		h2('situaciones', 'Tres casos', 'Tres maneras de llegar al mismo impulso'),
		p('El gesto es el mismo. Cambia lo que ya tiene. La dirección puede llevar tier, eco, qty y tech. Son ajustes de visualización. La URL canónica es la que no lleva parámetros. La lista en vivo está en la página francesa: el configurador sigue en francés. Los tres casos son las mismas decisiones.'),
		{ type: 'summary', text: 'Lectura por defecto: perfil recomendado, caso A, un portón, Shelly 1 Mini Gen3. Home Assistant no es una compra.' },
		{
			type: 'sit',
			eco: 'ha-zigbee',
			current: true,
			title: 'Caso A — Home Assistant ya está en marcha',
			parts: ['No compra un segundo servidor ni un dongle. El módulo envía el impulso por Wi-Fi. El Mini Gen3 se alimenta a 110–240 V. El Plus 1 también admite baja tensión, después de medir. No hay sensor de apertura en la lista.'],
		},
		{
			type: 'sit',
			eco: 'maker-esp32',
			title: 'Caso B — Graba una placa ESP32',
			parts: [
				'Una ESP32 y un relé cuyo contacto seco se manda a 3,3 V sustituyen al Shelly. Los 230 V del motor tampoco van ahí. Estos pasos describen el Shelly. La grabación está en el ',
				link('tutorial ESPHome de la puerta de garaje', esp),
				'. La idea del contacto seco es la misma. El cuadro de un portón no es el motor de techo de un garaje.',
			],
		},
		{
			type: 'sit',
			eco: 'wifi-sans-box',
			title: 'Caso C — Basta la aplicación Shelly',
			parts: ['Este perfil no instala Home Assistant. La aplicación envía el impulso después del apagado automático. No demuestra que la hoja se haya movido.'],
		},
		h3('Qué cambian la cantidad y la variante'),
		{
			type: 'table',
			headers: ['Ajuste', 'Efecto en la lista'],
			rows: [
				['Un portón', 'Un módulo para un cuadro, aunque dos hojas compartan la misma placa.'],
				['Varios portones', 'Un módulo por cuadro. Home Assistant sigue siendo uno.'],
				['Mini Gen3', 'Solo 110–240 V. Caja más pequeña.'],
				['Plus 1', 'El mismo contacto I y O. Alimentación tras medir: 110–240 V, 12 V estabilizados o 24–48 V.'],
			],
		},
		{
			type: 'config',
			noscript: 'Sin JavaScript, los botones no actualizan la lista de material. Las tres situaciones de arriba siguen valiendo.',
		},
		p(
			'Los precios de catálogo aparecen en el configurador. Una búsqueda en Amazon.es con el identificador de afiliado del sitio es una búsqueda por nombre y no garantiza el modelo exacto ni el stock: ',
			link('Shelly Plus 1', marketSearch('es', 'Shelly Plus 1'), true),
			'. Los bornes están en la ficha, no en la página de búsqueda.',
		),
		h2('arquitectura', 'Cómo viaja la orden', 'Cómo llega la orden al portón'),
		p('El teléfono pide, Home Assistant llama al Shelly y el Shelly imita el pulsador. Las fotocélulas y la placa deciden todavía si la hoja puede moverse.'),
		{
			type: 'flow',
			caption: 'La orden usa el contacto del pulsador. La alimentación del módulo y los 230 V del motor van aparte.',
			title: 'Portón eléctrico, mando por contacto seco',
			desc: 'Teléfono, Home Assistant, módulo Wi-Fi, bornes del pulsador, cuadro original. La alimentación del módulo está separada. Ningún sensor de interior en la hoja.',
			boxes: [
				{ title: '1. Teléfono', a: 'Pide un impulso', b: 'Primero la confirmación' },
				{ title: '2. Home Assistant', a: 'En la red local', b: 'Script de 0,5 s' },
				{ title: '3. Shelly, 2,4 GHz', a: 'I y O se cierran un instante', b: 'SW no es el pulsador' },
				{ title: '4. Pulsador del cuadro', a: 'Dos bornes, en paralelo', b: 'Los nombres están en el manual' },
				{ title: '5. Cuadro original', a: 'Motor, finales, fotocélulas', b: 'Mando sin cambios' },
				{ title: '6. Alimentación del módulo', a: 'No el par del pulsador', b: '110–240 V o baja tensión medida', tone: 'power' },
				{ title: '7. Sin sensor de ventana', a: 'No en la hoja exterior', b: 'El estado abierto no está en la lista', tone: 'aside' },
			],
		},
		h2('material', 'Qué material', 'Qué módulo siguen los pasos'),
		{
			type: 'table',
			headers: ['Necesidad', 'Elección en esta guía', 'Límite'],
			rows: [
				['Enviar el impulso, cuadro estrecho', 'Shelly 1 Mini Gen3, contacto seco, 2,4 GHz', 'Solo 110–240 V. Ambiente de −20 °C a 40 °C, humedad del 30 al 70 %.'],
				['Enviar el impulso, y quizá los 12 o 24 V del cuadro', 'Shelly Plus 1, contacto libre de potencial', '12 V ±10 % en el borne de 12 V, o 24–48 V en +. No uno en el otro. Mismos límites.'],
				['Unir dos hilos en un borne pequeño', 'Bornes de palanca, solo entonces', 'Inútiles si el tornillo ya admite los dos hilos.'],
				['Saber si la hoja está abierta', 'No en esta lista', 'SNZB-04P y Aqara P2 son de interior. Una salida de fin de carrera solo si el manual la nombra.'],
				['Seguir sin servidor', 'El mismo Shelly, en su aplicación', 'Sin historial de Home Assistant.'],
			],
		},
		h2('pasos', 'Paso a paso', 'Conectar y probar'),
		p('Los ocho pasos son el caso A: Home Assistant ya está, un cuadro, una entrada de pulsador. Deténgase si no aparece lo que debía observar. Paso libre en cada prueba.'),
		{ type: 'steps' },
		h3('Las fotocélulas siguen mandando en la carrera'),
		p('Si el portón no cierra, limpie y realinee las fotocélulas. No puentee sus cables para terminar la prueba del Shelly. Un impulso durante la carrera para el movimiento. Hace falta otro para volver a arrancar. El módulo no distingue abierto, abriendo y cerrando.'),
		h2('comprobar', 'Comprobar', 'Comprobar que de verdad manda'),
		{
			type: 'ul',
			items: [
				'El pulsador original sigue arrancando y parando el portón.',
				'Un impulso Shelly hace el mismo gesto, paso libre.',
				'Una confirmación cancelada no mueve nada.',
				'Unas fotocélulas sucias o tapadas siguen impidiendo el cierre.',
				'Ningún cable del motor está en I o en O.',
			],
		},
		h2('averias', 'Si no arranca', 'Cuando no arranca'),
		p('No se mueve nada: el impulso es demasiado corto, I y O no están en los bornes del pulsador, o el Wi-Fi no llega al cuadro. Arranca y se para: el impulso cuenta como dos pulsaciones, acórtelo. El pulsador de pared está muerto: el módulo está en serie, o se quitó un cable original. Corte la corriente y vuelva a la foto.'),
		p('El módulo no se enciende en una salida de « 12 V »: mida antes. Muchas placas son de 24 V. El Mini Gen3 no acepta ninguna de las dos. El Plus 1 acepta 24 V solo en el borne previsto, no en el de 12 V.'),
		h2('seguir', 'Ir más lejos', 'Ir más lejos'),
		p('El script del impulso sustituye el identificador. No se ha ejecutado aquí. El apagado automático del Shelly sigue activo.'),
		{ type: 'pre', code: pulse('Impulso del portón', 'switch.sustituir_shelly') },
		h2('preguntas', 'Preguntas', 'Preguntas frecuentes'),
		{ type: 'faq' },
		h2('fuentes', 'Fuentes', 'Fuentes'),
		{
			type: 'sources',
			items: [
				{ href: PLUS_DOC, text: 'Documentación Shelly Plus 1', note: '— I, O, 12 V, 24–48 V, ambiente, 0,4 N·m.' },
				{ href: MINI_DOC, text: 'Ficha Shelly 1 Mini Gen3', note: '— módulo compacto, alimentación 110–240 V.' },
				{ href: HA_SHELLY, text: 'Integración Shelly en Home Assistant' },
				{ href: HA_REMOTE, text: 'Acceso remoto de Home Assistant', note: '— no exponer el puerto 8123.' },
				{ href: SONOFF_SNZB, text: 'Manual SONOFF SNZB-04P', note: '— interior, 20 mm: no se usa en la hoja.' },
				{ href: AQARA_P2, text: 'Aqara Door and Window Sensor P2', note: '— Thread y Matter, interior: no se usa.' },
				{ href: esp, text: 'Tutorial ESPHome: contacto seco y reed' },
			],
		},
	],
});

export const guide = {
	id: 'portail-electrique',
	paths: {
		fr: '/domotique/projets/portail-electrique-connecte/',
		en: '/en/smart-home/projects/electric-gate-from-phone/',
		de: '/de/smart-home/projekte/elektrisches-tor-vom-telefon/',
		it: '/it/domotica/progetti/cancello-elettrico-dal-telefono/',
		es: '/es/domotica/proyectos/porton-electrico-desde-el-telefono/',
	},
	fr,
	en,
	de,
	it,
	es,
};
