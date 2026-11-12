export const BUDGET_PAGE = {
	title: 'Calculateur budget robotique pour la classe',
	description:
		'Estimez le coût pour équiper une classe (5 à 30 élèves) : nombre de robots, piles, rangement et coût par élève selon mBot2, mBot, CyberPi, Raspberry Pi 5 ou kit Arduino.',
	intro:
		'Les montants sont des ordres de grandeur 2026 (kits neufs, hors remises éducation). Ajustez selon vos devis fournisseur ou achats groupés.',
};

/** Prix unitaire kit robot en € (TTC indicatif) */
export const CLASS_MODELS = [
	{
		id: 'mbot2',
		label: 'Makeblock mBot2',
		unitEur: 149,
		asin: 'B0919F9CKS',
		perRobotExtras: { sparePartsEur: 8, batteryPackEur: 14 },
	},
	{
		id: 'mbot',
		label: 'Makeblock mBot',
		unitEur: 89,
		asin: 'B07XR98YYQ',
		perRobotExtras: { sparePartsEur: 6, batteryPackEur: 12 },
	},
	{
		id: 'cyberpi',
		label: 'Makeblock CyberPi (carte seule)',
		unitEur: 79,
		asin: 'B0BBZY9L59',
		perRobotExtras: { sparePartsEur: 5, batteryPackEur: 10 },
		note: 'Prévoir châssis ou support si chaque binôme n’a pas de mBot2.',
	},
	{
		id: 'raspberry-pi-5',
		label: 'Raspberry Pi 5 (kit débutant domotique)',
		unitEur: 155,
		asin: 'B0CK3L9WD3',
		perRobotExtras: { sparePartsEur: 10, batteryPackEur: 0 },
		note: 'Carte 4 Go + alimentation 27 W + boîtier + micro-SD.',
	},
	{
		id: 'arduino',
		label: 'Kit voiture robot Arduino (ELEGOO V4)',
		unitEur: 69,
		asin: 'B078Y9RYM2',
		perRobotExtras: { sparePartsEur: 7, batteryPackEur: 0 },
	},
];

export const CLASS_FIXED = {
	storageBoxEur: 35,
	chargerSharedEur: 28,
};
