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
				return !u.includes('/stats-articles-interne') && !u.endsWith('/404');
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
