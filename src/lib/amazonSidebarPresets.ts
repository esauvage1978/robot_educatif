export type AmazonSidebarPreset = keyof typeof AMAZON_SIDEBAR_PRESETS;

export type AmazonSidebarLink = {
	label: string;
	/** Mots-clés passés au paramètre de recherche Amazon `k` */
	query: string;
};

/** Blocs proposés dans la colonne 1/3 : produit, accessoires, livres (recherches contextualisées). */
export const AMAZON_SIDEBAR_PRESETS = {
	mbot: [
		{ label: 'mBot — robots et kits Makeblock', query: 'mBot Makeblock robot éducatif' },
		{ label: 'Accessoires mBot (capteurs, pièces)', query: 'mBot Makeblock accessoires capteur' },
		{ label: 'Livres — Scratch, robotique, mBot', query: 'mBot Scratch programmation robotique livre' },
	],
	mbot2: [
		{ label: 'mBot2 — kits Makeblock', query: 'mBot2 Makeblock robot éducatif' },
		{ label: 'Accessoires et options mBot2', query: 'mBot2 Makeblock accessoires' },
		{ label: 'Livres — Python, robotique, éducation', query: 'Python robotique débutant livre enfants' },
	],
	mbotVs: [
		{ label: 'mBot — kits Makeblock', query: 'mBot Makeblock robot éducatif kit' },
		{ label: 'mBot2 — Makeblock', query: 'mBot2 Makeblock robot éducatif' },
		{ label: 'Accessoires mBot / mBot2', query: 'mBot Makeblock accessoires capteur' },
	],
	matatalab: [
		{ label: 'Tale-Bot Pro — Matatalab', query: 'Tale-Bot Pro Matatalab robot' },
		{ label: 'Accessoires Matatalab', query: 'Matatalab Tale-Bot accessoires' },
		{ label: 'Livres — robotique sans écran, 3-8 ans', query: 'robotique enfant sans écran livre' },
	],
	codeyRocky: [
		{ label: 'Codey Rocky — Makeblock', query: 'Codey Rocky Makeblock robot' },
		{ label: 'Robots Makeblock mBlock', query: 'Makeblock robot éducatif mBlock' },
		{ label: 'Livres — Scratch & robotique', query: 'Scratch robot éducatif livre enfant' },
	],
	cyberpi: [
		{ label: 'CyberPi — carte Makeblock', query: 'CyberPi Makeblock' },
		{ label: 'Kits et extensions Makeblock', query: 'Makeblock robot kit électronique' },
		{ label: 'Livres — Python & robotique jeunes', query: 'Python robotique débutant livre enfants' },
	],
	raspberry: [
		{ label: 'Raspberry Pi — cartes et kits', query: 'Raspberry Pi 3 4 kit débutant' },
		{ label: 'Cartes micro SD pour Raspberry Pi', query: 'carte micro SD Raspberry Pi 32 Go' },
		{ label: 'Livres — Raspberry Pi débutant', query: 'Raspberry Pi livre débutant français' },
	],
	eilik: [
		{ label: 'Eilik — robot compagnon', query: 'Eilik robot compagnon' },
		{ label: 'Robots interactifs de bureau', query: 'robot interactif bureau enfant STEM' },
		{ label: 'Cadeaux tech & robotique 8–14 ans', query: 'robot éducatif cadeau ado STEM' },
	],
	scratch: [
		{ label: 'Livres Scratch — enfants & débutants', query: 'Scratch programmation livre enfant' },
		{ label: 'Robots compatibles Scratch', query: 'robot éducatif Scratch programmable' },
		{ label: 'Kits découverte codage', query: 'kit programmation enfant robot' },
	],
	general: [
		{ label: 'Robots éducatifs programmables', query: 'robot éducatif programmable enfant' },
		{ label: 'Kits robotique & STEM', query: 'kit robotique STEM enfant' },
		{ label: 'Livres — programmation & robotique', query: 'livre programmation robotique enfant' },
	],
} as const satisfies Record<string, AmazonSidebarLink[]>;
