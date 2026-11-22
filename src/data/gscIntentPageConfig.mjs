/** Config CTA conversion GSC (pick, tableau, conclusion) par clé logique de page. */

const PICK_UI = {
	fr: { title: 'Notre choix', tableTitle: 'Comparatif rapide avec offres', conclusionTitle: 'Notre conclusion' },
	en: { title: 'Our pick', tableTitle: 'Quick comparison', conclusionTitle: 'Bottom line' },
	de: { title: 'Unsere Wahl', tableTitle: 'Kurzvergleich mit Angeboten', conclusionTitle: 'Fazit' },
	it: { title: 'La nostra scelta', tableTitle: 'Confronto rapido con offerte', conclusionTitle: 'In sintesi' },
	es: { title: 'Nuestra elección', tableTitle: 'Comparativa rápida', conclusionTitle: 'Conclusión' },
	nl: { title: 'Onze keuze', tableTitle: 'Snelle vergelijking', conclusionTitle: 'Conclusie' },
};

export { PICK_UI };

/** @typedef {{ locale: string, market: string, pick: {id:string,badge?:string}[], table: {id:string,badge?:string}[], conclusion: {id:string,badge?:string}, skipInjectTable?: boolean }} GscIntentConfig */

/** @type {Record<string, GscIntentConfig>} */
export const GSC_INTENT_KEYS = {
	'guide-10': {
		locale: 'fr',
		market: 'fr',
		pick: [
			{ id: 'mbot2', badge: 'Notre choix n°1' },
			{ id: 'elegoo-robot-car', badge: 'Budget intermédiaire' },
		],
		table: [
			{ id: 'mbot2', badge: '10–14 ans' },
			{ id: 'mbot', badge: '8–12 ans' },
			{ id: 'elegoo-robot-car', badge: 'Ado avec adulte' },
		],
		conclusion: { id: 'mbot2', badge: 'Notre recommandation 10 ans' },
	},
	'guide-5': {
		locale: 'fr',
		market: 'fr',
		pick: [
			{ id: 'botley-2', badge: 'Sans écran' },
			{ id: 'codey-rocky', badge: 'Dès 6 ans' },
		],
		table: [
			{ id: 'botley-2', badge: '4–7 ans' },
			{ id: 'code-and-go-souris', badge: 'Montessori' },
			{ id: 'codey-rocky', badge: '6–9 ans' },
		],
		conclusion: { id: 'botley-2', badge: 'Cadeau 5 ans' },
	},
	'guide-12': {
		locale: 'fr',
		market: 'fr',
		pick: [
			{ id: 'mbot2', badge: 'Scratch puis Python' },
			{ id: 'elegoo-robot-car', badge: 'Arduino' },
		],
		table: [
			{ id: 'mbot2', badge: 'Collège' },
			{ id: 'elegoo-robot-car', badge: '13+ avec adulte' },
			{ id: 'raspberry-pi-5-8gb', badge: 'Projet Linux' },
		],
		conclusion: { id: 'mbot2', badge: 'Notre choix 12 ans' },
	},
	'guide-8': {
		locale: 'fr',
		market: 'fr',
		pick: [
			{ id: 'mbot', badge: 'Choix sûr 8 ans' },
			{ id: 'codey-rocky', badge: 'Tout-en-un' },
		],
		table: [
			{ id: 'mbot', badge: '8–12 ans' },
			{ id: 'codey-rocky', badge: 'Scratch' },
			{ id: 'mbot2', badge: 'Si budget large' },
		],
		conclusion: { id: 'mbot', badge: 'Notre recommandation 8 ans' },
	},
	'hub-best-robot': {
		locale: 'fr',
		market: 'fr',
		pick: [
			{ id: 'mbot', badge: '8–12 ans' },
			{ id: 'mbot2', badge: '10–14 ans' },
			{ id: 'botley-2', badge: '5–7 ans' },
		],
		table: [
			{ id: 'botley-2', badge: '5–7 ans' },
			{ id: 'mbot', badge: '8–12 ans' },
			{ id: 'mbot2', badge: '10–14 ans' },
			{ id: 'codey-rocky', badge: 'Scratch' },
			{ id: 'elegoo-robot-car', badge: 'Ado' },
		],
		conclusion: { id: 'mbot', badge: 'Hub — premier achat' },
	},
	'raspberry-compare': {
		locale: 'fr',
		market: 'fr',
		pick: [
			{ id: 'raspberry-pi-5-8gb', badge: 'Usage maker / IA' },
			{ id: 'raspberry-pi-5-4gb', badge: 'Premier Pi 5' },
		],
		table: [
			{ id: 'raspberry-pi-5-4gb', badge: '4 Go' },
			{ id: 'raspberry-pi-5-8gb', badge: '8 Go' },
		],
		conclusion: { id: 'raspberry-pi-5-8gb', badge: 'Choix long terme' },
	},
	'robot-4': {
		locale: 'fr',
		market: 'fr',
		pick: [
			{ id: 'code-and-go-souris', badge: 'Sans écran' },
			{ id: 'botley-2', badge: 'Robustesse' },
		],
		table: [
			{ id: 'code-and-go-souris', badge: '3–5 ans' },
			{ id: 'botley-2', badge: '4–7 ans' },
			{ id: 'tale-bot-pro', badge: 'Matatalab' },
		],
		conclusion: { id: 'code-and-go-souris', badge: 'Notre choix 4 ans' },
	},
	'mbot-review': {
		locale: 'fr',
		market: 'fr',
		pick: [
			{ id: 'mbot', badge: 'Produit du test' },
			{ id: 'mbot2', badge: 'Montée en gamme' },
		],
		table: [
			{ id: 'mbot', badge: '8–12 ans' },
			{ id: 'mbot2', badge: '10–14 ans' },
		],
		conclusion: { id: 'mbot', badge: 'Oui si 8–12 ans' },
	},
	'vacuum-nav': {
		locale: 'en',
		market: 'uk',
		pick: [{ id: 'roborock-q7-m5', badge: 'LiDAR budget pick' }],
		table: [{ id: 'roborock-q7-m5', badge: 'LiDAR + HA' }],
		conclusion: { id: 'roborock-q7-m5', badge: 'Best LiDAR value' },
	},
};

/** Chemins (slash final) → clé logique. */
export const GSC_INTENT_PATHS = {
	'/quel-robot-acheter-enfant-10-ans-guide-achat/': 'guide-10',
	'/de/lernroboter-10-jahre/': 'guide-10',
	'/it/robot-programmabile-10-anni/': 'guide-10',
	'/es/robot-programable-10-anos/': 'guide-10',
	'/en/best-robot-for-a-10-year-old/': 'guide-10',
	'/quel-robot-acheter-enfant-5-ans-guide-achat/': 'guide-5',
	'/de/lernroboter-5-jahre/': 'guide-5',
	'/it/robot-programmabile-5-anni/': 'guide-5',
	'/es/robot-programable-5-anos/': 'guide-5',
	'/en/best-robot-for-a-5-year-old/': 'guide-5',
	'/quel-robot-acheter-enfant-12-ans-guide-achat/': 'guide-12',
	'/de/lernroboter-12-jahre/': 'guide-12',
	'/it/robot-programmabile-12-anni/': 'guide-12',
	'/es/robot-programable-12-anos/': 'guide-12',
	'/en/best-robot-for-a-12-year-old/': 'guide-12',
	'/quel-robot-acheter-enfant-8-ans-guide-achat/': 'guide-8',
	'/de/lernroboter-8-jahre/': 'guide-8',
	'/it/robot-programmabile-8-anni/': 'guide-8',
	'/es/robot-programable-8-anos/': 'guide-8',
	'/en/best-robot-for-an-8-year-old/': 'guide-8',
	'/meilleur-robot-programmable-enfant-2026/': 'hub-best-robot',
	'/de/bester-programmierbarer-roboter-fuer-kinder/': 'hub-best-robot',
	'/it/miglior-robot-programmabile-per-bambini/': 'hub-best-robot',
	'/es/mejor-robot-programable-para-ninos/': 'hub-best-robot',
	'/en/best-programmable-robot-for-kids/': 'hub-best-robot',
	'/uk/best-programmable-robot-for-kids/': 'hub-best-robot',
	'/ca/best-programmable-robot-for-kids/': 'hub-best-robot',
	'/raspberry-pi-3-vs-4-vs-5-comparatif-2026/': 'raspberry-compare',
	'/de/raspberry-pi-3-vs-4-vs-5/': 'raspberry-compare',
	'/it/raspberry-pi-3-vs-4-vs-5/': 'raspberry-compare',
	'/es/raspberry-pi-3-vs-4-vs-5/': 'raspberry-compare',
	'/en/raspberry-pi-3-vs-4-vs-5/': 'raspberry-compare',
	'/uk/raspberry-pi-3-vs-4-vs-5/': 'raspberry-compare',
	'/ca/raspberry-pi-3-vs-4-vs-5/': 'raspberry-compare',
	'/robot-enfant-4-ans/': 'robot-4',
	'/de/lernroboter-4-jahre/': 'robot-4',
	'/it/robot-programmabile-4-anni/': 'robot-4',
	'/es/robot-programable-4-anos/': 'robot-4',
	'/en/best-robot-for-a-4-year-old/': 'robot-4',
	'/mbot-avis-faut-il-acheter-pour-un-enfant/': 'mbot-review',
	'/de/mbot-test-kaufen/': 'mbot-review',
	'/it/mbot-recensione-vale-la-pena/': 'mbot-review',
	'/en/mbot-review-worth-buying/': 'mbot-review',
	'/domotique/robot-aspirateur-navigation-lidar-camera-gyroscope/': 'vacuum-nav',
	'/en/smart-home/robot-vacuum-navigation-lidar-camera-gyro/': 'vacuum-nav',
};