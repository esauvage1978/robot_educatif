/**
 * Préfixe un chemin interne avec `import.meta.env.BASE_URL`
 * (déploiement sous-dossier : définir `ASTRO_BASE`, ex. `/site_vitrine/robot_educatif/`).
 */
function baseUrlPrefix(): string {
	const b = import.meta.env.BASE_URL;
	if (b == null || b === '') return '/';
	return b;
}

export function withBase(path: string): string {
	const base = baseUrlPrefix();
	if (!path) return base;
	if (/^https?:\/\//i.test(path) || path.startsWith('mailto:') || path.startsWith('tel:') || path.startsWith('#')) {
		return path;
	}
	if (path === '/' || path === '') return base;
	const p = path.startsWith('/') ? path.slice(1) : path;
	const prefix = base.endsWith('/') ? base : `${base}/`;
	return `${prefix}${p}`;
}
