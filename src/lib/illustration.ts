/**
 * Illustrations uniques par article (générées par IA, 960×540 WebP).
 * Fichiers : /public/images/illustrations/<slug>.webp — alts : src/data/illustrations.json
 */
import alts from '../data/illustrations.json';
import { articleSlugFromId } from './articleSlug';

const ALTS = alts as Record<string, string>;

export const ILLUSTRATION_WIDTH = 960;
export const ILLUSTRATION_HEIGHT = 540;

export function getIllustration(slugOrId: string): { src: string; alt: string } | null {
	const slug = articleSlugFromId(slugOrId);
	const alt = ALTS[slug];
	if (!alt) return null;
	return { src: `/images/illustrations/${slug}.webp`, alt };
}
