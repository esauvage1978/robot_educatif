// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import { rehypeAmazonExternalLinks } from './src/rehype/rehype-amazon-external-links.mjs';
import { rehypePrependBaseForInternalLinks } from './src/rehype/rehype-prepend-base-internal-links.mjs';
import { rehypePrependBaseForPublicImages } from './src/rehype/rehype-prepend-base-public-images.mjs';
import { normalizeAstroBase } from './src/lib/astroBase.mjs';
import { vitePluginDevWampUrlMirror } from './src/vite/dev-wamp-url-mirror.mjs';
import { buildSitemapMetadata } from './src/lib/sitemapMetadata.mjs';

// Build metadata synchronously at config time
const { articleDates, thinCategories, latestDate } = buildSitemapMetadata();

// https://astro.build/config
// ASTRO_BASE : sous-dossier WAMP uniquement (npm run dev:wamp / build:wamp).
// Production (robot-educatif.info) : `npm run build` force base = / (voir package.json).
export default defineConfig({
	site: 'https://robot-educatif.info',
	base: normalizeAstroBase(process.env.ASTRO_BASE),
	integrations: [
		mdx(),
		sitemap({
			filter: (page) => {
				const url = new URL(page);
				const path = url.pathname;
				
				// Exclude internal pages, 404, and search
				if (path.includes('/stats-articles-interne') || path.endsWith('/404') || path.endsWith('/recherche/')) {
					return false;
				}
				
				// Exclude thin category pages (<3 articles, same threshold as noindex in [slug].astro)
				if (path.startsWith('/categorie/') && path !== '/categorie/') {
					const catSlug = path.replace(/^\/categorie\/|\/$/g, '');
					if (thinCategories.has(catSlug)) {
						return false;
					}
				}
				
				return true;
			},
			serialize: (item) => {
				const url = new URL(item.url);
				const path = url.pathname;
				
				// Add lastmod for blog articles
				if (path.match(/^\/[a-z0-9-]+\/$/) && 
				    !path.match(/^\/(blog|categorie|programmation|recherche|about|contact|partenariat|mentions-legales|politique-de-confidentialite|gestion-des-cookies)\//)) {
					const slug = path.replace(/^\/|\/$/g, '');
					const date = articleDates.get(slug);
					if (date) {
						return {
							...item,
							lastmod: date,
						};
					}
				}
				
				// Add lastmod for home and category pages (latest article date)
				if (path === '/' || path.startsWith('/categorie/')) {
					return {
						...item,
						lastmod: latestDate,
					};
				}
				
				return item;
			},
		}),
	],
	// Évite 2 requêtes CSS bloquantes sur le chemin critique (LCP / FCP en lab 4G).
	build: {
		inlineStylesheets: 'always',
	},
	markdown: {
		rehypePlugins: [rehypeAmazonExternalLinks, rehypePrependBaseForPublicImages, rehypePrependBaseForInternalLinks],
	},
	vite: {
		plugins: [vitePluginDevWampUrlMirror()],
	},
});
