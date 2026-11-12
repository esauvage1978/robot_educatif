export const KIT_PAGE = {
	title: 'Configurateur kit robotique de classe',
	description:
		'Composez un kit pour établissement (mBot2, mBot, CyberPi, capteurs mBuild/RJ25, tapis de piste, pièces de rechange, chargeurs) avec devis estimatif exportable pour appel d’offres ou CSE.',
	intro:
		'Indiquez le nombre de binômes ou de kits, puis ajustez les quantités. Les montants sont des ordres de grandeur TTC 2026 (hors remise éducation). Exportez le devis en texte pour votre dossier d’achat.',
};

/** @typedef {'base'|'sensors'|'track'|'spares'|'chargers'} KitCategory */

export const KIT_CATEGORIES = {
	base: 'Robots & cartes',
	sensors: 'Packs capteurs (mBuild / RJ25)',
	track: 'Tapis de piste & terrain',
	spares: 'Pièces de rechange',
	chargers: 'Chargeurs & alimentation',
};

/**
 * @type {Array<{ id: string, category: KitCategory, label: string, unitEur: number, defaultQty: number, maxQty: number, note?: string, asin?: string, search?: string, scalesWithRobots?: boolean }>}
 */
export const KIT_ITEMS = [
	{
		id: 'mbot2',
		category: 'base',
		label: 'Makeblock mBot2 (kit complet)',
		unitEur: 149,
		defaultQty: 12,
		maxQty: 30,
		scalesWithRobots: true,
		asin: 'B0919F9CKS',
	},
	{
		id: 'mbot',
		category: 'base',
		label: 'Makeblock mBot (kit classique)',
		unitEur: 89,
		defaultQty: 0,
		maxQty: 30,
		scalesWithRobots: true,
		asin: 'B07XR98YYQ',
	},
	{
		id: 'cyberpi',
		category: 'base',
		label: 'CyberPi (carte seule, extension ou atelier)',
		unitEur: 79,
		defaultQty: 0,
		maxQty: 20,
		note: 'Prévoir châssis ou mBot2 pour chaque poste mobile.',
		asin: 'B0BBZY9L59',
	},
	{
		id: 'mbuild-starter',
		category: 'sensors',
		label: 'Pack capteurs mBuild (ultrason, lumière, 2× entrées)',
		unitEur: 68,
		defaultQty: 0,
		maxQty: 15,
		search: 'Makeblock mBuild sensor pack',
		note: 'Compatible mBot2 et CyberPi (bus mBuild).',
	},
	{
		id: 'rj25-pack',
		category: 'sensors',
		label: 'Pack capteurs RJ25 (ligne, lumière, ultrason)',
		unitEur: 52,
		defaultQty: 0,
		maxQty: 15,
		search: 'Makeblock RJ25 sensor pack mBot',
		note: 'Pour mBot classique (ports RJ25).',
	},
	{
		id: 'mbuild-hub',
		category: 'sensors',
		label: 'Hub mBuild (multi-capteurs sur un robot)',
		unitEur: 24,
		defaultQty: 0,
		maxQty: 12,
		search: 'Makeblock mBuild hub',
	},
	{
		id: 'track-makeblock',
		category: 'track',
		label: 'Tapis de piste Makeblock (réversible noir/blanc)',
		unitEur: 35,
		defaultQty: 2,
		maxQty: 6,
		search: 'Makeblock line follower track mat',
	},
	{
		id: 'track-tape',
		category: 'track',
		label: 'Rouleau ruban piste + repères (DIY classe)',
		unitEur: 18,
		defaultQty: 1,
		maxQty: 4,
		search: 'ruban adhésif piste robot noir blanc',
	},
	{
		id: 'spare-wheels',
		category: 'spares',
		label: 'Lot roues & axes mBot / mBot2',
		unitEur: 12,
		defaultQty: 0,
		maxQty: 30,
		scalesWithRobots: true,
		search: 'Makeblock mBot replacement wheel',
	},
	{
		id: 'spare-rj25-cable',
		category: 'spares',
		label: 'Câbles RJ25 de rechange (lot 4)',
		unitEur: 14,
		defaultQty: 0,
		maxQty: 10,
		search: 'Makeblock RJ25 cable',
	},
	{
		id: 'spare-screws',
		category: 'spares',
		label: 'Kit visserie & outils Makeblock',
		unitEur: 9,
		defaultQty: 1,
		maxQty: 5,
		search: 'Makeblock screw kit mBot',
	},
	{
		id: 'battery-pack',
		category: 'chargers',
		label: 'Batterie rechargeable Makeblock (par robot)',
		unitEur: 22,
		defaultQty: 0,
		maxQty: 30,
		scalesWithRobots: true,
		search: 'Makeblock rechargeable battery mBot2',
	},
	{
		id: 'multi-charger',
		category: 'chargers',
		label: 'Chargeur multi-batteries / station USB classe',
		unitEur: 38,
		defaultQty: 2,
		maxQty: 6,
		search: 'chargeur piles AA USB 8 slots',
		note: 'Pour piles AA des mBot classiques ou batteries LiPo selon modèle.',
	},
	{
		id: 'storage-box',
		category: 'chargers',
		label: 'Mallette de rangement classe (robots + câbles)',
		unitEur: 42,
		defaultQty: 1,
		maxQty: 4,
		search: 'mallette rangement robot éducatif',
	},
];

export const KIT_FIXED = {
	establishmentLabel: 'Établissement',
	projectLabel: 'Projet / référence AO',
};
