import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { articleSlugFromId } from '../lib/articleSlug';
import { ARTICLE_AUTHOR, SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const posts = await getCollection('blog');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/${articleSlugFromId(post.id)}/`,
			customData: `<author>${ARTICLE_AUTHOR}</author>`,
		})),
	});
}
