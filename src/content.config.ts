import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			/** Liens Amazon (recherches affiliées) affichés dans la colonne latérale de l’article */
			amazonPreset: z.enum(['mbot', 'mbot2', 'matatalab']).optional(),
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
		}),
});

export const collections = { blog };
