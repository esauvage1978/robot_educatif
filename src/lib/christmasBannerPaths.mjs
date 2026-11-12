/** Chemins des guides Noël 2026 (barre oblique finale) — pas de bandeau promo sur ces pages. */
export const NOEL_GUIDE_PATHS = new Set([
	'/robot-educatif-cadeau-noel-2026/',
	'/en/educational-robot-christmas-gifts-2026/',
	'/uk/educational-robot-christmas-gifts-2026/',
	'/us/educational-robot-christmas-gifts-2026/',
	'/ca/educational-robot-christmas-gifts-2026/',
	'/de/lernroboter-weihnachtsgeschenke-2026/',
	'/it/regalo-natale-robot-educativo-2026/',
	'/es/regalo-navidad-robot-educativo-2026/',
]);

export function normalizePathname(pathname) {
	let p = pathname.replace(/^\/site_vitrine\/robot_educatif/, '');
	if (!p.startsWith('/')) p = `/${p}`;
	if (p !== '/' && !p.endsWith('/')) p = `${p}/`;
	return p;
}

export function isNoelGuidePage(pathname) {
	return NOEL_GUIDE_PATHS.has(normalizePathname(pathname));
}
