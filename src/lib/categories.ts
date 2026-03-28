import { articleSlugFromId } from './articleSlug';

/**
 * Catégories d’articles : libellé affiché → segment d’URL stable (sans accents, kebab-case).
 */

export function categoryToSlug(label: string): string {
	const s = label
		.trim()
		.normalize('NFD')
		.replace(/\p{M}/gu, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
	return s || 'categorie';
}

export type CategoryIndexEntry = {
	slug: string;
	label: string;
	posts: { slug: string; title: string; pubDate: Date }[];
};

/** Registre slug → libellé canonique (premier libellé rencontré pour ce slug). */
export function buildCategoryIndex(
	posts: { id: string; data: { title: string; pubDate: Date; categories: string[] } }[],
): Map<string, CategoryIndexEntry> {
	const map = new Map<string, CategoryIndexEntry>();

	for (const post of posts) {
		const fileSlug = articleSlugFromId(post.id);
		for (const raw of post.data.categories) {
			const label = raw.trim();
			if (!label) continue;
			const slug = categoryToSlug(label);
			let entry = map.get(slug);
			if (!entry) {
				entry = { slug, label, posts: [] };
				map.set(slug, entry);
			}
			if (!entry.posts.some((p) => p.slug === fileSlug)) {
				entry.posts.push({
					slug: fileSlug,
					title: post.data.title,
					pubDate: post.data.pubDate,
				});
			}
		}
	}

	for (const entry of map.values()) {
		entry.posts.sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());
	}

	return map;
}

export type TopCategory = {
	slug: string;
	label: string;
	count: number;
};

/** Les N catégories avec le plus d’articles (tri par nombre décroissant). */
export function topCategoriesByCount(
	posts: { id: string; data: { title: string; pubDate: Date; categories: string[] } }[],
	limit = 15,
): TopCategory[] {
	const map = buildCategoryIndex(posts);
	return [...map.values()]
		.map((e) => ({ slug: e.slug, label: e.label, count: e.posts.length }))
		.sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'fr'))
		.slice(0, limit);
}
