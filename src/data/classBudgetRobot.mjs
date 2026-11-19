export const BUDGET_PAGE = {
	title: 'Calculateur budget robotique pour la classe (dès ~110 €)',
	description:
		'Estimez le coût pour équiper une classe (5 à 30 élèves) : robots dès ~110 € par kit mBot, piles, rangement et coût par élève (mBot2, CyberPi, Raspberry Pi 5, Arduino).',
	intro:
		'Pour une classe en binômes avec des mBot neufs, comptez souvent autour de 110 € par kit robot avant piles et rangement (ordre de grandeur 2026, hors remises éducation). Ajustez selon vos devis fournisseur ou achats groupés.',
};

export const BUDGET_FAQ = [
	{
		question: 'Le calculateur part de quel prix par robot ?',
		answer:
			'Les barèmes intégrés reprennent des ordres de grandeur TTC 2026 : mBot classique ~89 €, mBot2 ~149 €, etc. Le coût par élève descend si vous partagez un robot entre deux ou trois.',
	},
	{
		question: 'Les liens Amazon sont-ils sponsorisés ?',
		answer:
			'Oui : les boutons vers Amazon utilisent des liens partenaires (rel="sponsored nofollow"). Le prix affiché sur le site marchand peut varier — vérifiez la fiche au moment de la commande.',
	},
];

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
