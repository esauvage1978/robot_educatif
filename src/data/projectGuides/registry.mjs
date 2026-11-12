const modules = import.meta.glob('./files/*.mjs', { eager: true });

/** @type {Record<string, { id: string, paths: Record<string, string>, fr: object, en: object, de: object, it: object, es: object }>} */
export const PROJECT_GUIDES = Object.fromEntries(
	Object.values(modules)
		.map((mod) => mod.guide)
		.filter((guide) => guide?.id)
		.map((guide) => [guide.id, guide]),
);

/** @param {string} useCaseId */
export function getProjectGuide(useCaseId) {
	return PROJECT_GUIDES[useCaseId] ?? null;
}

/** @param {'en' | 'de' | 'it' | 'es'} lang @param {string} slug */
export function getProjectGuideBySlug(lang, slug) {
	const pathTail = `/${slug}/`;
	return (
		Object.values(PROJECT_GUIDES).find((guide) => {
			const path = guide.paths?.[lang] ?? '';
			return path.endsWith(pathTail);
		}) ?? null
	);
}

/** @param {'en' | 'de' | 'it' | 'es'} lang */
export function projectGuideSlugs(lang) {
	return Object.values(PROJECT_GUIDES)
		.map((guide) => {
			const path = guide.paths?.[lang];
			if (!path) return null;
			const parts = path.split('/').filter(Boolean);
			return parts[parts.length - 1];
		})
		.filter(Boolean);
}

export const PROJECT_GUIDE_LANG_PAIRS = Object.values(PROJECT_GUIDES)
	.filter((guide) => guide.paths?.fr && guide.paths?.en)
	.map((guide) => ({
		fr: guide.paths.fr,
		en: guide.paths.en,
		de: guide.paths.de,
		it: guide.paths.it,
		es: guide.paths.es,
	}));
