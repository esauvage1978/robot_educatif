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
	matatalab: [
		{ label: 'Tale-Bot Pro — Matatalab', query: 'Tale-Bot Pro Matatalab robot' },
		{ label: 'Accessoires Matatalab', query: 'Matatalab Tale-Bot accessoires' },
		{ label: 'Livres — robotique sans écran, 3-8 ans', query: 'robotique enfant sans écran livre' },
	],
} as const satisfies Record<string, AmazonSidebarLink[]>;
