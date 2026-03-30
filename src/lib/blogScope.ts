import type { CollectionEntry } from 'astro:content';

/**
 * Articles rattachés aux parcours /programmation (champ `series` : Python, projets guidés, jeux terminal…).
 * À exclure de l’index `/blog/` pour laisser la vedette aux contenus robotique / matériel / guides généraux.
 * Recherche (Pagefind), catégories et flux RSS restent sur l’ensemble des articles.
 */
export function isProgrammingSeriesArticle(post: CollectionEntry<'blog'>): boolean {
	const s = post.data.series;
	return typeof s === 'string' && s.trim().length > 0;
}
