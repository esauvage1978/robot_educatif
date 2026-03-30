import type { CollectionEntry } from 'astro:content';
import { articleSlugFromId } from './articleSlug';

/**
 * Ordre « derniers articles publiés » : `pubDate` décroissant d’abord,
 * puis `updatedDate` si même jour de publication, puis slug (ordre stable).
 */
export function compareBlogPostsByPublicationDesc(
	a: CollectionEntry<'blog'>,
	b: CollectionEntry<'blog'>,
): number {
	const pubA = a.data.pubDate.valueOf();
	const pubB = b.data.pubDate.valueOf();
	if (pubB !== pubA) return pubB - pubA;
	const updA = a.data.updatedDate?.valueOf() ?? pubA;
	const updB = b.data.updatedDate?.valueOf() ?? pubB;
	if (updB !== updA) return updB - updA;
	return articleSlugFromId(b.id).localeCompare(articleSlugFromId(a.id), 'fr');
}

/** Dernière activité affichable : mise à jour si renseignée, sinon publication. */
export function blogPostActivityDate(post: CollectionEntry<'blog'>): Date {
	return post.data.updatedDate ?? post.data.pubDate;
}

/**
 * Ordre pour l’index blog : date de **dernière mise à jour** (ou publication) décroissante,
 * puis date de publication, puis slug (ordre stable).
 */
export function compareBlogPostsByLastActivityDesc(
	a: CollectionEntry<'blog'>,
	b: CollectionEntry<'blog'>,
): number {
	const actA = blogPostActivityDate(a).valueOf();
	const actB = blogPostActivityDate(b).valueOf();
	if (actB !== actA) return actB - actA;
	const pubA = a.data.pubDate.valueOf();
	const pubB = b.data.pubDate.valueOf();
	if (pubB !== pubA) return pubB - pubA;
	return articleSlugFromId(b.id).localeCompare(articleSlugFromId(a.id), 'fr');
}
