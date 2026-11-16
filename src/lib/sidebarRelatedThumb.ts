import type { ImageMetadata } from 'astro';
import type { CollectionEntry } from 'astro:content';
import fs from 'node:fs';
import path from 'node:path';
import { articleSlugFromId } from './articleSlug';
import { resolveArticleThumbnail, getGeneratedThumbnailPath } from './articleThumbnail';
import { resolveHeroImage } from './contentHeroImage';
import { getIllustration } from './illustration';
import { findPair, slugOf } from './i18n.mjs';
import { withImageVersion } from './imageVersion';

/** Hubs qui ne sont pas des articles : photo réelle déjà publiée. */
const HUB_THUMB: Record<string, string> = {
	'arduino-c': '/images/products/arduino-starter-kit.webp',
	arduino: '/images/products/arduino-starter-kit.webp',
};

function publicExists(urlPath: string): boolean {
	const clean = urlPath.split('?')[0].replace(/^\//, '');
	try {
		return fs.existsSync(path.join(process.cwd(), 'public', clean));
	} catch {
		return false;
	}
}

function firstPublic(candidates: Array<string | undefined>): string | null {
	for (const candidate of candidates) {
		if (candidate && publicExists(candidate)) return candidate;
	}
	return null;
}

function thumbForSlug(slug: string): string | null {
	const png = getGeneratedThumbnailPath(slug);
	const webp = png.replace(/\.png$/i, '.webp');
	return firstPublic([webp, png, HUB_THUMB[slug]]);
}

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
			const found = thumbForSlug(slug);
			if (found) {
				return { href, title: item.title, imgSrc: withImageVersion(found), imgAlt: item.title };
			}
		}

		const ill = getIllustration(slug);
		if (ill && publicExists(ill.src)) {
			return {
				href,
				title: item.title,
				imgSrc: withImageVersion(ill.src),
				imgAlt: ill.alt || item.title,
			};
		}

		const found = thumbForSlug(slug);
		if (found) {
			return { href, title: item.title, imgSrc: withImageVersion(found), imgAlt: item.title };
		}
		return { href, title: item.title, imgSrc: '', imgAlt: item.title };
	});
}
