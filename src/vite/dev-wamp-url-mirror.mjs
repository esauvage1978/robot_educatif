/**
 * En `astro dev` sans ASTRO_BASE, le site est servi à la racine (/).
 * Les URLs avec le préfixe WAMP habituel (/site_vitrine/robot_educatif/...) renvoient 404.
 * Ce plugin réécrit req.url en retirant ce préfixe pour que les mêmes liens fonctionnent.
 *
 * En `npm run dev:wamp` (ASTRO_BASE = sous-dossier), Astro ne sert que sous ce préfixe :
 * une URL du type http://localhost:4321/python-types-et-saisie/ renvoie 404.
 * On réécrit ces chemins « à la racine » vers base + chemin pour retrouver le même confort qu’en dev sans base.
 */

import { normalizeAstroBase } from '../lib/astroBase.mjs';

const WAMP_PREFIX = '/site_vitrine/robot_educatif';

/** @param {string} pathOnly */
function shouldRewriteRootPathToBase(pathOnly) {
	if (pathOnly === '/' || pathOnly === '') return false;
	if (pathOnly.startsWith('/@')) return false;
	if (pathOnly.startsWith('/node_modules') || pathOnly.startsWith('/src')) return false;
	if (pathOnly.startsWith('/_astro')) return false;
	if (
		pathOnly.startsWith('/fonts') ||
		pathOnly.startsWith('/images') ||
		pathOnly.startsWith('/capture') ||
		pathOnly.startsWith('/programmes')
	)
		return false;
	if (pathOnly.startsWith('/pagefind')) return false;
	const clean = pathOnly.split('?')[0] ?? '';
	/* Fichiers statiques / assets */
	if (/\.(ico|png|svg|jpg|jpeg|gif|webp|woff2?|txt|xml|json|js|map|html|mblock)$/i.test(clean)) return false;
	return true;
}

/** @returns {import('vite').Plugin} */
export function vitePluginDevWampUrlMirror() {
	return {
		name: 'dev-wamp-url-mirror',
		apply: 'serve',
		configureServer(server) {
			const base = normalizeAstroBase(process.env.ASTRO_BASE);
			const baseNoSlash = base === '/' ? '' : base.replace(/\/$/, '');

			server.middlewares.use((req, _res, next) => {
				const raw = req.url ?? '';
				const pathOnly = raw.split('?')[0] ?? '';

				/* Dev avec base WAMP : /slug/ → /site_vitrine/robot_educatif/slug/ */
				if (base !== '/' && baseNoSlash) {
					if (!pathOnly.startsWith(`${baseNoSlash}/`) && pathOnly !== baseNoSlash) {
						if (shouldRewriteRootPathToBase(pathOnly)) {
							req.url = raw.replace(pathOnly, `${baseNoSlash}${pathOnly}`);
						}
					}
					return next();
				}

				/* Dev sans base : URLs complètes WAMP → racine */
				if (!pathOnly.startsWith(`${WAMP_PREFIX}/`) && pathOnly !== WAMP_PREFIX) {
					return next();
				}
				req.url = raw.replace(WAMP_PREFIX, '') || '/';
				next();
			});
		},
	};
}
