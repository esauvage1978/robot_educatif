import {
	AMAZON_SIDEBAR_PRESETS,
	type AmazonSidebarLink,
	type AmazonSidebarPreset,
} from './amazonSidebarPresets';

/** Liens Amazon contextualisés — CyberPi / Makeblock */
const CYBERPI_LINKS: AmazonSidebarLink[] = [
	{ label: 'CyberPi — carte Makeblock', query: 'CyberPi Makeblock' },
	{ label: 'Kits et extensions Makeblock', query: 'Makeblock robot kit électronique' },
	{ label: 'Livres — Python & robotique jeunes', query: 'Python robotique débutant livre enfants' },
];

/** Raspberry Pi 3 / kits */
const RASPBERRY_LINKS: AmazonSidebarLink[] = [
	{ label: 'Raspberry Pi — cartes et kits', query: 'Raspberry Pi 3 4 kit débutant' },
	{ label: 'Cartes micro SD pour Raspberry Pi', query: 'carte micro SD Raspberry Pi 32 Go' },
	{ label: 'Livres — Raspberry Pi débutant', query: 'Raspberry Pi livre débutant français' },
];

/** Robot compagnon type Eilik */
const EILIK_LINKS: AmazonSidebarLink[] = [
	{ label: 'Eilik — robot compagnon', query: 'Eilik robot compagnon' },
	{ label: 'Robots interactifs de bureau', query: 'robot interactif bureau enfant STEM' },
	{ label: 'Cadeaux tech & robotique 8–14 ans', query: 'robot éducatif cadeau ado STEM' },
];

/** Scratch (sans mBot forcé) */
const SCRATCH_LINKS: AmazonSidebarLink[] = [
	{ label: 'Livres Scratch — enfants & débutants', query: 'Scratch programmation livre enfant' },
	{ label: 'Robots compatibles Scratch', query: 'robot éducatif Scratch programmable' },
	{ label: 'Kits découverte codage', query: 'kit programmation enfant robot' },
];

/** Comparaison mBot / mBot2 */
const MBOT_VS_LINKS: AmazonSidebarLink[] = [
	{ label: 'mBot — kits Makeblock', query: 'mBot Makeblock robot éducatif kit' },
	{ label: 'mBot2 — Makeblock', query: 'mBot2 Makeblock robot éducatif' },
	{ label: 'Accessoires mBot / mBot2', query: 'mBot Makeblock accessoires capteur' },
];

const DEFAULT_AMAZON_SIDEBAR: AmazonSidebarLink[] = [
	{ label: 'Robots éducatifs programmables', query: 'robot éducatif programmable enfant' },
	{ label: 'Kits robotique & STEM', query: 'kit robotique STEM enfant' },
	{ label: 'Livres — programmation & robotique', query: 'livre programmation robotique enfant' },
];

function inferFromSlug(slug: string): AmazonSidebarLink[] | null {
	if (!slug) return null;
	const s = slug.toLowerCase();
	if (s.includes('cyberpi')) return CYBERPI_LINKS;
	if (s.includes('raspberry')) return RASPBERRY_LINKS;
	if (s.includes('eilik')) return EILIK_LINKS;
	if (s.includes('scratch')) return SCRATCH_LINKS;
	if (s.includes('tale-bot') || s.includes('matatalab')) {
		return [...AMAZON_SIDEBAR_PRESETS.matatalab];
	}
	if (s.includes('mbot-vs')) return MBOT_VS_LINKS;
	if (s.includes('mbot2')) return [...AMAZON_SIDEBAR_PRESETS.mbot2];
	if (s.includes('mbot') || s.includes('mblock')) return [...AMAZON_SIDEBAR_PRESETS.mbot];
	return null;
}

/**
 * Propositions Amazon pour la colonne 1/3 : `amazonPreset` dans le frontmatter prime,
 * sinon déduction à partir du slug de l’article, sinon suggestions générales STEM.
 */
export function resolveAmazonSidebarLinks(
	slug: string | undefined | null,
	preset?: AmazonSidebarPreset | null,
): AmazonSidebarLink[] {
	if (preset && AMAZON_SIDEBAR_PRESETS[preset]) {
		return [...AMAZON_SIDEBAR_PRESETS[preset]];
	}
	const normalized = typeof slug === 'string' ? slug : '';
	const inferred = inferFromSlug(normalized);
	if (inferred) return inferred;
	return DEFAULT_AMAZON_SIDEBAR;
}
