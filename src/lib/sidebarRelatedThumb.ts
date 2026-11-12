import type { ImageMetadata } from 'astro';
import type { CollectionEntry } from 'astro:content';
import { articleSlugFromId } from './articleSlug';
import { resolveArticleThumbnail, getGeneratedThumbnailPath } from './articleThumbnail';
import { resolveHeroImage } from './contentHeroImage';
import { getIllustration } from './illustration';
import { findPair, slugOf } from './i18n.mjs';
import { withImageVersion } from './imageVersion';

export type RelatedThumb = {
	href: string;
	title: string;
	imgSrc: string;
	imgAlt: string;
};

function slugFromHref(href: string): string {
	return href.replace(/^\/|\/$/g, '').split('/').pop() ?? '';
}

export function resolveRelatedThumbs(
	related: { title: string; href: string }[] | undefined,
	pathname: string,
	posts: CollectionEntry<'blog'>[],
	domotiquePosts: CollectionEntry<'domotique'>[] = [],
): RelatedThumb[] {
	if (!related?.length) return [];
	const bySlug = new Map(posts.map((p) => [articleSlugFromId(p.id), p]));
	const byDomSlug = new Map(domotiquePosts.map((p) => [articleSlugFromId(p.id), p]));

	return related.slice(0, 5).map((item) => {
		const href = item.href;
		let slug = slugFromHref(href);
		let post = bySlug.get(slug);
		let domPost = byDomSlug.get(slug);
		if (!post && !domPost) {
			const pair = findPair(href);
			if (pair?.fr) slug = slugOf(pair.fr);
			post = bySlug.get(slug);
			domPost = byDomSlug.get(slug);
		}

		if (domPost?.data.heroImage) {
			const src = withImageVersion(domPost.data.heroImage.replace(/\.png$/i, '.webp'));
			return { href, title: item.title, imgSrc: src, imgAlt: item.title };
		}

		if (post) {
			const hero = resolveHeroImage(post.data.heroImage);
			const thumb = resolveArticleThumbnail(post, hero);
			if (thumb.type === 'illustration') {
				return {
					href,
					title: item.title,
					imgSrc: withImageVersion(thumb.src),
					imgAlt: thumb.alt || item.title,
				};
			}
			if (thumb.type === 'image') {
				const src = (thumb.src as ImageMetadata).src;
				return { href, title: item.title, imgSrc: src, imgAlt: item.title };
			}
			if (thumb.type === 'pinterest') {
				const p = `/pinterest/${thumb.slug}-1.jpg`;
				return { href, title: item.title, imgSrc: withImageVersion(p), imgAlt: item.title };
			}
			const gen = getGeneratedThumbnailPath(slug);
			return {
				href,
				title: item.title,
				imgSrc: withImageVersion(gen.replace('.png', '.webp')),
				imgAlt: item.title,
			};
		}

		const ill = getIllustration(slug);
		if (ill) {
			return {
				href,
				title: item.title,
				imgSrc: withImageVersion(ill.src),
				imgAlt: ill.alt || item.title,
			};
		}

		const gen = getGeneratedThumbnailPath(slug);
		return {
			href,
			title: item.title,
			imgSrc: withImageVersion(gen.replace('.png', '.webp')),
			imgAlt: item.title,
		};
	});
}
