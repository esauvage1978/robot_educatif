// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import { rehypeAmazonExternalLinks } from './src/rehype/rehype-amazon-external-links.mjs';
import { rehypePrependBaseForInternalLinks } from './src/rehype/rehype-prepend-base-internal-links.mjs';
import { rehypePrependBaseForPublicImages } from './src/rehype/rehype-prepend-base-public-images.mjs';
import { normalizeAstroBase } from './src/lib/astroBase.mjs';
import { vitePluginDevWampUrlMirror } from './src/vite/dev-wamp-url-mirror.mjs';

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
				const u = String(page);
				// Exclude internal pages, 404, and search
				return !u.includes('/stats-articles-interne') && !u.endsWith('/404') && !u.endsWith('/recherche/');
			},
			// Note: serialize with lastmod and category filtering would require async operations
			// which aren't supported in Astro config. The @astrojs/sitemap plugin automatically
			// includes lastmod from file modification times. For blog posts, updatedDate/pubDate
			// are already reflected in the build output. Thin categories (<3 posts) are marked
			// noindex in their pages, so excluding them from sitemap via filter would require
			// dynamic data access not available here.
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
