import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

/**
 * Build metadata maps from blog posts at config time (synchronous).
 * Returns:
 * - articleDates: Map<slug, Date> for lastmod
 * - thinCategories: Set<categorySlug> with <3 articles
 */
export function buildSitemapMetadata() {
	const blogDir = join(process.cwd(), 'src/content/blog');
	// .md ET .mdx (les articles .mdx n'avaient pas de lastmod)
	const files = readdirSync(blogDir).filter(f => /\.mdx?$/.test(f));
	
	const articleDates = new Map();
	const categoryIndex = new Map();
	
	for (const file of files) {
		const slug = file.replace(/\.mdx?$/, '');
		const content = readFileSync(join(blogDir, file), 'utf-8');
		const { data } = matter(content);
		
		// Store date for lastmod
		const date = data.updatedDate || data.pubDate;
		if (date) {
			articleDates.set(slug, new Date(date));
		}
		
		// Build category index
		const categories = data.categories || [];
		for (const cat of categories) {
			const label = String(cat).trim();
			if (!label) continue;
			
			// Same slug logic as src/lib/categories.ts
			const catSlug = label
				.normalize('NFD')
				.replace(/\p{M}/gu, '')
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/^-+|-+$/g, '');
			
			if (!categoryIndex.has(catSlug)) {
				categoryIndex.set(catSlug, { label, slugs: [] });
			}
			categoryIndex.get(catSlug).slugs.push(slug);
		}
	}
	
	// Articles domotique : clé « domotique/<slug> » (URL /domotique/<slug>/)
	const domotiqueDir = join(process.cwd(), 'src/content/domotique');
	let domotiqueLatest = null;
	try {
		for (const file of readdirSync(domotiqueDir).filter(f => /\.mdx?$/.test(f))) {
			const { data } = matter(readFileSync(join(domotiqueDir, file), 'utf-8'));
			const date = data.updatedDate || data.pubDate;
			if (!date) continue;
			const d = new Date(date);
			articleDates.set(`domotique/${file.replace(/\.mdx?$/, '')}`, d);
			if (!domotiqueLatest || d > domotiqueLatest) domotiqueLatest = d;
		}
	} catch {
		// pas de dossier domotique
	}

	// Find thin categories (<3 articles)
	const thinCategories = new Set();
	for (const [catSlug, data] of categoryIndex.entries()) {
		if (data.slugs.length < 3) {
			thinCategories.add(catSlug);
		}
	}
	
	// Latest article date for home/category pages
	const latestDate = articleDates.size > 0
		? new Date(Math.max(...Array.from(articleDates.values()).map(d => d.getTime())))
		: new Date();
	
	return {
		articleDates,
		domotiqueLatest,
		thinCategories,
		latestDate,
	};
}
