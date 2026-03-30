/**
 * Rehype : préfixe la base Astro pour les `img[src^="/images/"]` et `img[src^="/capture/"]`
 * quand `astro.config.base` n’est pas `/` (ASTRO_BASE / sous-dossier WAMP).
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

export function rehypePrependBaseForPublicImages() {
	const base = normalizeAstroBase(process.env.ASTRO_BASE);
	const baseNoSlash = base === '/' ? '' : base.replace(/\/$/, '');

	return (tree) => {
		if (base === '/') return;
		walk(tree, (node) => {
			if (node.type !== 'element' || node.tagName !== 'img') return;
			const src = node.properties?.src;
			if (typeof src !== 'string' || (!src.startsWith('/images/') && !src.startsWith('/capture/'))) return;
			if (baseNoSlash && src.startsWith(`${baseNoSlash}/`)) return;
			node.properties = node.properties || {};
			node.properties.src = `${baseNoSlash}${src}`;
		});
	};
}
