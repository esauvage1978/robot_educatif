/**
 * Préfixe un chemin interne avec `import.meta.env.BASE_URL`
 * (déploiement sous-dossier : définir `ASTRO_BASE`, ex. `/site_vitrine/robot_educatif/`).
 */
export function withBase(path: string): string {
	if (!path) return import.meta.env.BASE_URL;
	if (/^https?:\/\//i.test(path) || path.startsWith('mailto:') || path.startsWith('tel:') || path.startsWith('#')) {
		return path;
	}
	const base = import.meta.env.BASE_URL;
	if (path === '/' || path === '') return base;
	const p = path.startsWith('/') ? path.slice(1) : path;
	return `${base}${p}`;
}
