/**
 * ItemList JSON-LD pour les guides d’achat (noms + URL internes uniquement).
 * Pas de Product/Offer/AggregateRating : prix non numériques vérifiés, pas d’avis inventés.
 */
export type GuideItemList = {
	name: string;
	items: { name: string; url: string }[];
};

export const GUIDE_ITEM_LISTS: Record<string, GuideItemList> = {
	'meilleur-robot-programmable-enfant-2026': {
		name: 'Robots programmables pour enfants par âge',
		items: [
			{ name: 'Robot enfant 5 ans', url: '/quel-robot-acheter-enfant-5-ans-guide-achat/' },
			{ name: 'Robot enfant 8 ans', url: '/quel-robot-acheter-enfant-8-ans-guide-achat/' },
			{ name: 'Robot enfant 10 ans', url: '/quel-robot-acheter-enfant-10-ans-guide-achat/' },
			{ name: 'Robot programmable 12 ans', url: '/quel-robot-acheter-enfant-12-ans-guide-achat/' },
		],
	},
	'quel-robot-acheter-enfant-5-ans-guide-achat': {
		name: 'Robots éducatifs pour 5 ans',
		items: [
			{ name: 'Botley 2.0', url: '/quel-robot-acheter-enfant-5-ans-guide-achat/' },
			{ name: 'Tale-Bot Pro Matatalab', url: '/le-robot-tale-bot-de-chez-matatalab-un-outil-educatif-pour-enfants/' },
			{ name: 'Guide robot 8 ans', url: '/quel-robot-acheter-enfant-8-ans-guide-achat/' },
		],
	},
	'quel-robot-acheter-enfant-10-ans-guide-achat': {
		name: 'Robots programmables pour 10 ans',
		items: [
			{ name: 'Makeblock mBot2', url: '/mbot2-de-makeblock-le-robot-educatif-pour-apprendre-la-robotique/' },
			{ name: 'Makeblock mBot', url: '/mbot-mon-premier-robot-educatif/' },
			{ name: 'Guide robot 12 ans', url: '/quel-robot-acheter-enfant-12-ans-guide-achat/' },
		],
	},
	'quel-robot-acheter-enfant-12-ans-guide-achat': {
		name: 'Robots programmables pour 12 ans',
		items: [
			{ name: 'Makeblock mBot2', url: '/mbot2-de-makeblock-le-robot-educatif-pour-apprendre-la-robotique/' },
			{ name: 'ELEGOO Robot Car', url: '/meilleur-robot-educatif-arduino-kit-choisir/' },
			{ name: 'Raspberry Pi 5', url: '/raspberry-pi-5-quelle-version-memoire-acheter/' },
		],
	},
};
