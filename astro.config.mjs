// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import { rehypeAmazonExternalLinks } from './src/rehype/rehype-amazon-external-links.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://robot-educatif.info',
	// WAMP / sous-dossier : décommenter et adapter pour que les images et le JS se chargent.
	// base: '/site_vitrine/robot_educatif/',
	integrations: [mdx(), sitemap()],
	markdown: {
		rehypePlugins: [rehypeAmazonExternalLinks],
	},
});
