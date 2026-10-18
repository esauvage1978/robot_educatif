import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		amazonPreset: z.string().optional(),
		categories: z.array(z.string()).default([]),
		relatedLinks: z.array(z.object({ title: z.string(), href: z.string() })).optional(),
	}),
});

const domotique = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		category: z.enum(['debuter', 'home-assistant', 'esp32', 'guides-achat', 'robots-aspirateurs']),
		products: z.array(z.string()).optional(),
		priority: z.number().optional(),
	}),
});

export const collections = { blog, domotique };
