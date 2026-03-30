/**
 * Même logique que `astro.config.mjs` : base de déploiement (sous-dossier WAMP).
 * Export partagé pour que les plugins markdown utilisent exactement `defineConfig().base`.
 */
/** @param {string | undefined} raw */
export function normalizeAstroBase(raw) {
	if (raw == null || String(raw).trim() === '' || raw === '/') return '/';
	let b = String(raw).trim();
	if (!b.startsWith('/')) b = `/${b}`;
	if (!b.endsWith('/')) b = `${b}/`;
	return b;
}
