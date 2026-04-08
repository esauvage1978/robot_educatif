import { AMAZON_SIDEBAR_PRESETS, type AmazonSidebarLink, type AmazonSidebarPreset } from './amazonSidebarPresets';

function inferPresetFromSlug(slug: string): AmazonSidebarPreset | null {
	if (!slug) return null;
	const s = slug.toLowerCase();
	if (s.includes('codey')) return 'codeyRocky';
	if (s.includes('cyberpi')) return 'cyberpi';
	if (s.includes('raspberry')) return 'raspberry';
	if (s.includes('eilik')) return 'eilik';
	if (s.includes('scratch')) return 'scratch';
	if (s.includes('lego')) return 'lego';
	if (s.includes('tale-bot') || s.includes('matatalab')) return 'matatalab';
	if (s.includes('mbot-vs')) return 'mbotVs';
	if (s.includes('mbot2')) return 'mbot2';
	if (s.includes('mbot') || s.includes('mblock')) return 'mbot';
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
	const inferred = inferPresetFromSlug(normalized);
	if (inferred) return [...AMAZON_SIDEBAR_PRESETS[inferred]];
	return [...AMAZON_SIDEBAR_PRESETS.general];
}
