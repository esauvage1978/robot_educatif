/** Titres document ≤ 60 caractères (65 max absolu) pour Bing / SERP. */

export const PAGE_TITLE_TARGET = 60;
export const PAGE_TITLE_MAX = 65;

const BRAND_SUFFIXES = [
	/\s*[|–—-]\s*ROBOT\s+éducatif\s*$/i,
	/\s*[|–—-]\s*robot-educatif\.info\s*$/i,
	/\s*[|–—-]\s*Bibliothèque\s+\d+\s+projets\s*$/i,
	/\s*[|–—-]\s*Projet domotique\s*$/i,
];

function normalize(text: string): string {
	return (text || '').replace(/\s+/g, ' ').trim();
}

function truncateAtWord(text: string, maxLen: number): string {
	if (text.length <= maxLen) return text;
	let cut = text.slice(0, maxLen);
	const lastSpace = cut.lastIndexOf(' ');
	if (lastSpace > maxLen - 20) cut = cut.slice(0, lastSpace);
	return cleanTail(cut);
}

const DANGLING = new Set(('et ou de du des la le les un une à au aux avec pour par en sur sans son sa ses ce cette dans qui que '+
	'and or of the a an to for with in on by from vs ' +
	'und oder der die das den dem des ein eine mit für von zu im am ' +
	'e o di del della dei il lo la le un una con per da in su ' +
	'y o de del la el los las un una con para por en sin').split(/\s+/));

function cleanTail(text: string): string {
	let t = text.replace(/[\s,.;:!—–\-|/(«“"']+$/u, '').trim();
	for (let i = 0; i < 4; i++) {
		const open = (t.match(/\(/g) || []).length, close = (t.match(/\)/g) || []).length;
		if (open > close) { t = t.slice(0, t.lastIndexOf('(')); }
		const words = t.split(' ');
		const last = (words[words.length - 1] || '').toLowerCase().replace(/[’']$/, '');
		if (words.length > 2 && (DANGLING.has(last) || /^(l|d|qu)[’']?$/.test(last))) { words.pop(); t = words.join(' '); }
		t = t.replace(/[\s,.;:!—–\-|/(«“"']+$/u, '').trim();
	}
	return t;
}

/** Raccourcit un titre sans couper un mot (sauf mot unique trop long). */
export function fitPageTitle(raw: string, maxLen: number = PAGE_TITLE_TARGET): string {
	let t = normalize(raw);
	for (const re of BRAND_SUFFIXES) t = t.replace(re, '').trim();
	if (t.length <= maxLen) return t;
	t = truncateAtWord(t, maxLen);
	if (t.length > PAGE_TITLE_MAX) t = truncateAtWord(t, PAGE_TITLE_MAX);
	return t;
}

/** Titre SEO fiche projet domotique (mot-clé en tête, sans suffixe gabarit). */
export function buildSmartHomeProjectSeoTitle(useCaseTitle: string): string {
	const base = normalize(useCaseTitle.replace(/\([^)]*\)/g, ''));
	return fitPageTitle(base);
}

/** Titre SEO page code erreur domotique / robot. */
export function buildErrorCodeSeoTitle(
	errorCode: string,
	titleFr: string,
	productLabel: string,
	brandSlug: string,
): string {
	if (brandSlug === 'arduino') {
		return fitPageTitle(`${titleFr} — dépannage Arduino`);
	}
	const shortTitle = truncateAtWord(normalize(titleFr), 38);
	let candidate = `${errorCode} — ${shortTitle}`;
	if (candidate.length <= PAGE_TITLE_TARGET) return candidate;
	candidate = `${errorCode} — ${truncateAtWord(productLabel, 28)}`;
	return fitPageTitle(candidate);
}
