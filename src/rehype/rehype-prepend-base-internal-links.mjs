/**
 * Rehype : préfixe `import.meta.env.BASE_URL` pour les liens `a[href^="/"]`
 * (Markdown internes) quand `base` n’est pas `/`.
 */
import { normalizeAstroBase } from '../lib/astroBase.mjs';

function walk(node, fn) {
	if (!node || typeof node !== 'object') return;
	fn(node);
	const children = node.children;
	if (Array.isArray(children)) {
		for (const child of children) walk(child, fn);
	}
}

export function rehypePrependBaseForInternalLinks() {
	const base = normalizeAstroBase(process.env.ASTRO_BASE);
	const baseNoSlash = base === '/' ? '' : base.replace(/\/$/, '');

	return (tree) => {
		if (base === '/') return;
		walk(tree, (node) => {
			if (node.type !== 'element' || node.tagName !== 'a') return;
			const href = node.properties?.href;
			if (typeof href !== 'string' || !href.startsWith('/') || href.startsWith('//')) return;
			if (baseNoSlash && href.startsWith(`${baseNoSlash}/`)) return;
			node.properties = node.properties || {};
			node.properties.href = `${baseNoSlash}${href}`;
		});
	};
}
