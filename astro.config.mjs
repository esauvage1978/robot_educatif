// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import { rehypeAmazonExternalLinks } from './src/rehype/rehype-amazon-external-links.mjs';
import { rehypeRepairMarkdownLinks } from './src/rehype/rehype-repair-markdown-links.mjs';
import { rehypePrependBaseForInternalLinks } from './src/rehype/rehype-prepend-base-internal-links.mjs';
import { rehypePrependBaseForPublicImages } from './src/rehype/rehype-prepend-base-public-images.mjs';
import { rehypeImageSize } from './src/lib/rehype-image-size.mjs';
import { rehypeFaqSchema } from './src/rehype/rehype-faq-schema.mjs';
import { remarkReadingTime } from './src/lib/remark-reading-time.mjs';
import { normalizeAstroBase } from './src/lib/astroBase.mjs';
import { vitePluginDevWampUrlMirror } from './src/vite/dev-wamp-url-mirror.mjs';
import { buildSitemapMetadata } from './src/lib/sitemapMetadata.mjs';

// Build metadata synchronously at config time
const { articleDates, thinCategories, latestDate, domotiqueLatest } = buildSitemapMetadata();

// URLs redirected via .htaccess (301) — exclude from sitemap
const redirectedPaths = new Set([
	'/activite-mbot-mesure-des-distances/',
	'/meilleur-robot-programmable-enfants-2026/',
	'/installer-mblock-windows-11-guide-facile/',
	'/projets-mbot-classe/',
	'/robot-par-age/',
	'/robots-budget/',
	'/10-projets-mbot-classe-faciles/',
	'/meilleur-robot-programmable-2026/',
	'/quel-acheter-enfant-5-ans-guide-achat/',
	'/quel-acheter-enfant-10-ans-guide-achat/',
	'/mbot-vs-mbot2-comparaison-des-robots-educatifs-for-enfants/',
	'/activite-mbot-faire-colignoter-les-leds/',
	'/kit-robot-arduino-enfant/',
	'/domotique/codes-erreurs-domotique/',
	'/domotique/pieces-detachees-sav-domotique/',
	'/outils/quel-robot-educatif-choisir/',
	'/domotique/100-projets-domotique-utiles-2026/',
	'/domotique/maison-connectee-sans-cloud-100-pourcent-locale/',
	'/domotique/automatiser-porte-garage-homey/',
	'/domotique/suivre-consommation-electrique-prise-connectee/',
	'/domotique/volet-roulant-sans-neutral/',
	'/python-listes-et-boucles-for/',
	'/meilleur-robot-educatif-6-ans/',
	'/en/robot-for-8-year-old/',
	'/en/robot-for-10-year-old/',
	'/en/robot-for-12-year-old/',
	'/en/best-screen-free-coding-toys/',
	'/uk/educational-robot-christmas-gifts-2026/',
	'/en/smart-home/esp32-smart-home-projects/',
	'/uk/smart-home/esp32-smart-home-projects/',
	'/ca/smart-home/esp32-smart-home-projects/',
]);

// https://astro.build/config
// ASTRO_BASE : sous-dossier WAMP uniquement (npm run dev:wamp / build:wamp).
// Production (robot-educatif.info) : `npm run build` force base = / (voir package.json).
const outDir = process.env.ASTRO_OUT_DIR || 'dist';

export default defineConfig({
	site: 'https://robot-educatif.info',
	// Port fixe : un `npm run dev` par site, sans se marcher dessus.
	server: { port: 4321 },
	base: normalizeAstroBase(process.env.ASTRO_BASE),
	outDir,
	// Une seule clé par chemin (avec slash final) : Astro traite /x et /x/ comme la même
	// route statique — déclarer les deux provoque les collisions de build.
	redirects: {
		'/domotique/codes-erreurs-domotique/': '/domotique/codes-erreurs-depannage-zigbee-home-assistant-shelly/',
		'/domotique/pieces-detachees-sav-domotique/': '/domotique/pieces-detachees-capteurs-compatibles-moins-cher/',
		'/outils/quel-robot-educatif-choisir/': '/outil-quel-robot-enfant/',
		'/domotique/100-projets-domotique-utiles-2026/': '/domotique/configurateur-projet-domotique/',
		'/domotique/maison-connectee-sans-cloud-100-pourcent-locale/': '/domotique/debuter-en-domotique-guide-complet/',
		'/domotique/automatiser-porte-garage-homey/': '/domotique/ouvrir-porte-garage-smartphone-esp32-esphome/',
		'/domotique/suivre-consommation-electrique-prise-connectee/': '/domotique/projets/suivi-consommation-electrique/',
		'/domotique/volet-roulant-sans-neutral/': '/domotique/projets/volet-roulant-connecte/',
		'/python-listes-et-boucles-for/': '/python-boucles-for-while/',
		'/meilleur-robot-educatif-6-ans/': '/quel-robot-acheter-enfant-6-ans-guide-achat/',
		'/en/robot-for-8-year-old/': '/en/best-robot-for-an-8-year-old/',
		'/en/robot-for-10-year-old/': '/en/best-robot-for-a-10-year-old/',
		'/en/robot-for-12-year-old/': '/en/best-robot-for-a-12-year-old/',
		'/en/best-screen-free-coding-toys/': '/en/best-robot-for-a-6-year-old/',
		'/uk/educational-robot-christmas-gifts-2026/': '/en/educational-robot-christmas-gifts-2026/',
	},
	integrations: [
		mdx(),
		sitemap({
			customPages: [
				'https://robot-educatif.info/downloads/mbot/10-projets-mbot-classe.pdf',
				'https://robot-educatif.info/downloads/mbot/corriges-diagrammes.pdf',
			],
			filter: (page) => {
				const url = new URL(page);
				const path = url.pathname;
				
				// Exclude 301 redirected pages
				if (redirectedPaths.has(path)) {
					return false;
				}
				
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
				
				// Articles domotique : /domotique/<slug>/
				const domo = path.match(/^\/domotique\/([a-z0-9-]+)\/$/);
				if (domo) {
					const date = articleDates.get(`domotique/${domo[1]}`);
					if (date) return { ...item, lastmod: date };
				}
				if (path === '/domotique/' && domotiqueLatest) {
					return { ...item, lastmod: domotiqueLatest };
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
		remarkPlugins: [remarkReadingTime],
		rehypePlugins: [rehypeRepairMarkdownLinks, rehypeAmazonExternalLinks, rehypePrependBaseForPublicImages, rehypePrependBaseForInternalLinks, rehypeImageSize, rehypeFaqSchema],
	},
	vite: {
		plugins: [vitePluginDevWampUrlMirror()],
		server: { strictPort: true },
		preview: { strictPort: true },
	},
});
