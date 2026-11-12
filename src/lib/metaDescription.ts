/** Meta descriptions SEO : cible Bing/Google (≈148–160 caractères). */

export const META_MIN = 148;
export const META_MAX = 160;
export const META_ENRICH_BELOW = 135;
export const META_HARD_MAX = 165;

const SITE_TAIL = ' — robot-educatif.info';
const SITE_TAIL_SHORT = ' sur robot-educatif.info.';

function normalize(text: string): string {
	return (text || '').replace(/[<>"']/g, ' ').replace(/\s+/g, ' ').trim();
}

function truncateAtWord(text: string, maxLen: number): string {
	if (text.length <= maxLen) return text;
	let cut = text.slice(0, maxLen);
	const lastSpace = cut.lastIndexOf(' ');
	if (lastSpace > maxLen - 24) cut = cut.slice(0, lastSpace);
	return cut.replace(/[\s,.;:!—–-]+$/u, '').trim();
}

function enrichersForPath(pathname: string): string[] {
	const p = pathname.replace(/\/+$/, '') || '/';
	if (p.startsWith('/en') || p.startsWith('/uk') || p.startsWith('/ca')) {
		return [
			' Tutorials, comparisons and practical guides for educational robotics.',
			' Programming tips, Makeblock kits and activities for kids and teachers.',
			SITE_TAIL_SHORT,
			SITE_TAIL,
		];
	}
	if (p.startsWith('/de')) {
		return [
			' Tutorials, Vergleiche und praktische Ratgeber zur Lernrobotik.',
			' Programmiertipps, Makeblock-Kits und Aktivitäten für Kinder und Lehrkräfte.',
			SITE_TAIL_SHORT,
			SITE_TAIL,
		];
	}
	if (p.startsWith('/it')) {
		return [
			' Tutorial, confronti e guide pratiche sulla robotica educativa.',
			' Consigli di programmazione, kit Makeblock e attività per bambini e insegnanti.',
			SITE_TAIL_SHORT,
			SITE_TAIL,
		];
	}
	if (p.startsWith('/es')) {
		return [
			' Tutoriales, comparativas y guías prácticas de robótica educativa.',
			' Consejos de programación, kits Makeblock y actividades para niños y docentes.',
			SITE_TAIL_SHORT,
			SITE_TAIL,
		];
	}
	return [
		' Tutoriels, comparatifs et guides pratiques pour la robotique éducative.',
		' Conseils programmation, kits Makeblock et activités pour enfants et enseignants.',
		SITE_TAIL_SHORT,
		SITE_TAIL,
	];
}

/** Ajuste une description entre minLen et maxLen (mots entiers). */
export function fitMetaDescription(
	description: string,
	minLen: number = META_MIN,
	maxLen: number = META_MAX,
	pathname: string = '',
): string {
	let d = normalize(description);
	if (d.length > maxLen) d = truncateAtWord(d, maxLen);
	const enrichers = enrichersForPath(pathname);
	for (const suffix of enrichers) {
		if (d.length >= minLen) break;
		const candidate = normalize(d + suffix);
		if (candidate.length <= maxLen) d = candidate;
	}
	if (d.length < minLen) {
		const pad = ` Guides robotique et programmation${SITE_TAIL_SHORT}`;
		const candidate = normalize(d + pad);
		if (candidate.length <= maxLen) d = candidate;
	}
	if (d.length > maxLen) d = truncateAtWord(d, maxLen);
	return d;
}

function sectionHint(pathname: string): string | null {
	const p = pathname.replace(/\/+$/, '') || '/';
	if (p === '/categorie') return 'Index des thèmes du blog robotique et programmation.';
	if (p.startsWith('/categorie/')) return 'Articles classés par thème : tutoriels, comparatifs et guides pratiques.';
	if (p === '/blog') return 'Publications, tests terrain et idées d’activités robotiques.';
	if (p === '/recherche') return 'Moteur de recherche interne des articles et guides du site.';
	if (p === '/contact') return 'Formulaire pour questions robotique, Scratch, mBlock ou partenariat école.';
	if (p === '/gestion-des-cookies') return 'Cookies, traceurs et Consent Mode Google Analytics 4.';
	if (p === '/mentions-legales') return 'Éditeur, hébergement o2switch, propriété intellectuelle et affiliation.';
	if (p === '/politique-de-confidentialite') return 'Données personnelles, droits RGPD et mesure d’audience GA4.';
	if (p.startsWith('/domotique')) return 'Guides domotique, Home Assistant, Zigbee et projets connectés.';
	if (p.startsWith('/programmation')) return 'Parcours Python, Scratch et projets de programmation pas à pas.';
	if (p.startsWith('/en') || p.startsWith('/uk') || p.startsWith('/ca')) return 'Educational robotics guides in English.';
	if (p.startsWith('/de')) return 'Ratgeber zu Lernrobotern und Programmierung für Kinder.';
	if (p.startsWith('/it')) return 'Guide alla robotica educativa e programmazione per ragazzi.';
	if (p.startsWith('/es')) return 'Guías de robótica educativa y programación para niños.';
	return null;
}

/** Garde-fou global : enrichit les descriptions trop courtes (< 135 car.) avec le contexte de section. */
export function ensureMetaDescription(
	raw: string,
	ctx?: { title?: string; pathname?: string },
): string {
	let d = normalize(raw);
	const path = ctx?.pathname?.replace(/^\/site_vitrine\/robot_educatif/, '') ?? '';
	if (d.length < META_ENRICH_BELOW) {
		const hint = sectionHint(path);
		if (hint) d = normalize(`${d} ${hint}`);
		else if (ctx?.title) d = normalize(`${d} ${ctx.title}${SITE_TAIL}.`);
	}
	if (d.length > META_HARD_MAX) d = truncateAtWord(d, META_MAX);
	if (d.length >= META_MIN && d.length <= META_MAX) return d;
	return fitMetaDescription(d, META_MIN, META_MAX, path);
}

const CATEGORY_TAILS = [
	' Utile en classe.',
	' Utile à la maison.',
	' Idéal pour l’école.',
	' Idéal pour la classe.',
	' Avec des exemples concrets.',
	' Pensé pour la maison et l’école.',
	' Pensé pour débuter sans se perdre.',
	' Pensé pour un premier projet guidé.',
	' Clair pour choisir puis programmer.',
	' Clair pour un atelier, pas à pas.',
];

/** Phrase complète, 150 à 160 caractères, sans suffixe coupé. */
export function buildCategoryMetaDescription(label: string, articleCount: number): string {
	const count = articleCount === 1 ? '1 article' : `${articleCount} articles`;
	const sentences = [
		`Rubrique ${label} : ${count} pour choisir un robot, programmer en blocs ou en Python, et mener une activité en classe.`,
		`${count} sur ${label} : tutoriels, comparatifs et guides pour programmer un robot éducatif à la maison ou en classe.`,
		`Guides ${label}, ${count} : activités, comparatifs de robots et premiers pas en programmation, à la maison ou en classe.`,
		`${label} : ${count} du blog, des tutoriels mBlock aux comparatifs, pour débuter la robotique sans jargon inutile.`,
		`Sélection ${label} (${count}) : parcours robotique, programmation et idées d’activités pour enfants et enseignants.`,
		`${count} dans ${label} : tutoriels, comparatifs et projets pour apprendre la robotique éducative pas à pas, en classe.`,
		`Tous les guides ${label} (${count}) : choisir un kit, coder un premier programme et vérifier le résultat en classe.`,
		`Parcours ${label} : ${count} pour comprendre, choisir et programmer un robot éducatif, de la maison jusqu’à la classe.`,
	];
	const candidates: string[] = [];
	for (const sentence of sentences) {
		const base = normalize(sentence);
		if (!base.endsWith('.')) continue;
		candidates.push(base);
		for (const tail of CATEGORY_TAILS) candidates.push(normalize(`${base}${tail}`));
	}
	const inRange = candidates.find((c) => c.length >= 150 && c.length <= META_MAX);
	if (inRange) return inRange;
	const shorter = candidates
		.filter((c) => c.length < 150)
		.sort((a, b) => b.length - a.length)[0];
	return shorter ?? truncateAtWord(candidates[0] ?? `${count} sur ${label}.`, META_MAX);
}
