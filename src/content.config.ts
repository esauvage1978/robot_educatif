import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** URL file: stable sous Windows / POSIX pour le loader glob. */
const blogContentDir = new URL('./content/blog', import.meta.url);

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: blogContentDir, pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			/** Titre document (<title>, SEO). Si absent du hero, utiliser `headline`. */
			title: z.string(),
			/** Titre affiché en H1 dans le hero (optionnel — sinon `title`). */
			headline: z.string().optional(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			/** Liens Amazon (recherches affiliées) affichés dans la colonne latérale de l’article */
			amazonPreset: z
				.enum([
					'general',
					'mbot',
					'mbot2',
					'mbotVs',
					'matatalab',
					'codeyRocky',
					'cyberpi',
					'raspberry',
					'eilik',
					'scratch',
					'lego',
				])
				.optional(),
			/** Maillage interne : articles mis en avant dans la colonne 1/3 */
			relatedLinks: z
				.array(
					z.object({
						title: z.string(),
						href: z.string(),
					}),
				)
				.optional(),
			/** Série pédagogique (ex. « Python », « Bataille navale ») — hubs /programmation/… */
			series: z.string().optional(),
			/** Ordre dans la série (1, 2, …) */
			seriesOrder: z.number().int().optional(),
			/** Étiquettes (affichage / filtrage futur) */
			tags: z.array(z.string()).optional(),
			/** Quatre catégories par article — liens vers /categorie/[slug]/ */
			categories: z.array(z.string()).length(4),
			/** Données FAQ structurées (JSON-LD FAQPage) — le Markdown ne conserve pas les &lt;script&gt; */
			faqSchema: z
				.array(
					z.object({
						question: z.string(),
						answer: z.string(),
					}),
				)
				.optional(),
		}),
});

export const collections = { blog };
