export type AmazonSidebarPreset = keyof typeof AMAZON_SIDEBAR_PRESETS;

export type AmazonSidebarLink = {
	label: string;
	/** ASIN produit direct (si disponible) */
	asin?: string;
	/** Mots-clés passés au paramètre de recherche Amazon `k` (si pas d'ASIN) */
	query?: string;
};

/** Blocs proposés dans la colonne 1/3 : produit, accessoires, livres (recherches contextualisées). */
export const AMAZON_SIDEBAR_PRESETS = {
	mbot: [
		{ label: 'mBot — robots et kits Makeblock', asin: 'B07XR98YYQ' },
		{ label: 'Accessoires mBot (capteurs, pièces)', query: 'mBot Makeblock accessoires capteur' },
		{ label: 'Livres — Scratch, robotique, mBot', query: 'mBot Scratch programmation robotique livre' },
	],
	mbot2: [
		{ label: 'mBot2 — kits Makeblock', asin: 'B0919F9CKS' },
		{ label: 'Accessoires et options mBot2', query: 'mBot2 Makeblock accessoires' },
		{ label: 'Livres — Python, robotique, éducation', query: 'Python robotique débutant livre enfants' },
	],
	mbotVs: [
		{ label: 'mBot — kits Makeblock', asin: 'B07XR98YYQ' },
		{ label: 'mBot2 — Makeblock', asin: 'B0919F9CKS' },
		{ label: 'Accessoires mBot / mBot2', query: 'mBot Makeblock accessoires capteur' },
	],
	matatalab: [
		{ label: 'Tale-Bot Pro — Matatalab', query: 'Tale-Bot Pro Matatalab robot' },
		{ label: 'Accessoires Matatalab', query: 'Matatalab Tale-Bot accessoires' },
		{ label: 'Livres — robotique sans écran, 3-8 ans', query: 'robotique enfant sans écran livre' },
	],
	codeyRocky: [
		{ label: 'Codey Rocky — Makeblock', asin: 'B07CGH8NZ7' },
		{ label: 'Robots Makeblock mBlock', asin: 'B07XR98YYQ' },
		{ label: 'Livres — Scratch & robotique', query: 'Scratch robot éducatif livre enfant' },
	],
	cyberpi: [
		{ label: 'CyberPi — carte Makeblock', asin: 'B0BBZY9L59' },
		{ label: 'Kits et extensions Makeblock', asin: 'B0919F9CKS' },
		{ label: 'Livres — Python & robotique jeunes', query: 'Python robotique débutant livre enfants' },
	],
	raspberry: [
		{ label: 'Raspberry Pi — cartes et kits', asin: 'B0CK3L9WD3' },
		{ label: 'Cartes micro SD pour Raspberry Pi', query: 'carte micro SD Raspberry Pi 32 Go' },
		{ label: 'Livres — Raspberry Pi débutant', query: 'Raspberry Pi livre débutant français' },
	],
	eilik: [
		{ label: 'Eilik — robot compagnon', query: 'Eilik robot compagnon' },
		{ label: 'Robots interactifs de bureau', query: 'robot interactif bureau enfant STEM' },
		{ label: 'Cadeaux tech & robotique 8–14 ans', asin: 'B0919F9CKS' },
	],
	scratch: [
		{ label: 'Livres Scratch — enfants & débutants', query: 'Scratch programmation livre enfant' },
		{ label: 'Robots compatibles Scratch', asin: 'B07XR98YYQ' },
		{ label: 'Kits découverte codage', asin: 'B078Y9RYM2' },
	],
	general: [
		{ label: 'Robots éducatifs programmables', asin: 'B0919F9CKS' },
		{ label: 'Kits robotique & STEM', asin: 'B078Y9RYM2' },
		{ label: 'Livres — programmation & robotique', query: 'livre programmation robotique enfant' },
	],
	lego: [
		{ label: 'LEGO SPIKE Prime (stocks revendeurs)', query: 'LEGO SPIKE Prime robot éducation' },
		{ label: 'LEGO SPIKE Essential (stocks revendeurs)', query: 'LEGO Education SPIKE Essential' },
		{ label: 'mBot Makeblock (alternative STEM)', asin: 'B07XR98YYQ' },
	],
} as const satisfies Record<string, AmazonSidebarLink[]>;
