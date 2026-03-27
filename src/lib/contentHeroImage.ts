import type { ImageMetadata } from 'astro';

const images = import.meta.glob<ImageMetadata>('../assets/**/*.{jpeg,jpg,png,gif,webp}', {
	eager: true,
	import: 'default',
});

/**
 * Les entrées de collection avec `image()` exposent parfois une chaîne `../../assets/...`
 * (relative au .md) : `<Image />` exige un import. On retrouve le module via glob.
 */
export function resolveHeroImage(hero: unknown): ImageMetadata | undefined {
	if (hero == null) return undefined;
	if (typeof hero === 'object' && hero !== null && 'src' in hero && 'width' in hero) {
		return hero as ImageMetadata;
	}
	if (typeof hero !== 'string') return undefined;
	const raw = hero.replace(/^__ASTRO_IMAGE_/, '');
	const key = raw.replace(/^\.\.\/\.\.\//, '../');
	return images[key];
}
