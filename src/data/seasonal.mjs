/**
 * Mise en avant saisonnière unique (accueil + bandeau). Une seule saison active à la fois.
 * Hors saison : l'accueil affiche un bloc permanent (guides par budget), le bandeau disparaît.
 */
export const SEASONS = [
	{ id: 'noel-2026', start: '2026-11-01T00:00:00', end: '2026-12-31T23:59:59' },
];

export function activeSeason(now = new Date()) {
	return SEASONS.find((s) => now >= new Date(s.start) && now <= new Date(s.end)) || null;
}

/** Accueils : la mise en avant saisonnière est intégrée à la page, pas de bandeau en plus. */
export const HOME_PATHS = new Set(['/', '/en/', '/uk/', '/ca/', '/us/', '/de/', '/it/', '/es/', '/nl/']);
