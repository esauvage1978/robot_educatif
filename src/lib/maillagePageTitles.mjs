/**
 * Résolution de titres éditoriaux pour le plan de maillage (jamais un chemin URL).
 */

import matter from 'gray-matter';

const SITE_SUFFIX = /\s*\|\s*Robot\s*[ÉE]ducatif.*$/i;

/** Compare titres pour l’audit (sans suffixe site). */
export function titlesMatchForAnchor(anchor, canonical) {
	if (!anchor?.trim() || !canonical?.trim()) return !anchor?.trim();
	const a = cleanPageTitle(anchor).toLowerCase();
	const c = cleanPageTitle(canonical).toLowerCase();
	return a === c;
}

export function isTruncatedAnchorTitle(anchor, canonical = '') {
	if (!anchor || typeof anchor !== 'string') return false;
	const t = anchor.trim();
	if (!t) return true;
	if (/[''']\s*$/.test(t)) return true;
	const c = cleanPageTitle(canonical);
	if (!c || titlesMatchForAnchor(t, c)) return false;
	const tl = t.toLowerCase();
	const cl = c.toLowerCase();
	if (!cl.startsWith(tl)) return false;
	// Apostrophe typographique coupée dans le YAML (ex. « pour l' » / « Guides d' »)
	if (/\s(l|d|n|s|m|t|c|j|qu)[''']?\s*$/i.test(t)) return true;
	return false;
}

export function cleanPageTitle(raw) {
	if (!raw || typeof raw !== 'string') return '';
	return raw.replace(SITE_SUFFIX, '').replace(/\s+/g, ' ').trim();
}

export function isPathLikeTitle(title) {
	if (!title || typeof title !== 'string') return true;
	const s = title.trim();
	if (!s) return true;
	if (s.startsWith('/')) return true;
	if (/^https?:\/\//i.test(s)) return true;
	if (/^\/[a-z]{2}(\/|$)/i.test(s)) return true;
	return false;
}

/** Identifiant de code (HOME_TITLE), expression {…}, etc. — interdit comme ancre. */
export function isIdentifierLikeTitle(title) {
	if (!title || typeof title !== 'string') return true;
	const s = title.trim();
	if (!s) return true;
	if (/^[A-Z][A-Z0-9_]*$/.test(s)) return true;
	if (/^\{[^}]+\}$/.test(s)) return true;
	if (/^(title|href|pathname)$/i.test(s)) return true;
	return false;
}

export function isInvalidAnchorTitle(title) {
	return isPathLikeTitle(title) || isIdentifierLikeTitle(title);
}

/** Canonise les href internes du plan (ex. /index/ → /). */
export function normalizeMaillageHref(href) {
	if (!href || typeof href !== 'string') return href;
	let s = href.trim();
	if (!s.startsWith('/')) return href;
	const bare = s.split('#')[0].split('?')[0];
	if (/\.\w{2,5}$/i.test(bare)) return bare;
	if (!s.endsWith('/')) s = `${s}/`;
	if (s === '/index/') return '/';
	return s;
}

export function humanizeUrlPath(urlPath) {
	const parts = urlPath.replace(/^\/|\/$/g, '').split('/').filter(Boolean);
	const seg = parts[parts.length - 1] || 'accueil';
	return seg
		.split('-')
		.filter(Boolean)
		.map((w) => (w.length <= 3 ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
		.join(' ');
}

function yamlFrontmatterTitle(raw) {
	if (!raw.startsWith('---')) return '';
	try {
		const { data } = matter(raw);
		if (data?.title != null && String(data.title).trim()) {
			return cleanPageTitle(String(data.title));
		}
	} catch {
		/* ignore */
	}
	return '';
}

function resolveAstroStringConst(raw, varName) {
	const re = new RegExp(`const\\s+${varName}\\s*=\\s*([\"'\`])([\\s\\S]*?)\\1`, 'm');
	const m = raw.match(re);
	return m ? cleanPageTitle(m[2]) : '';
}

function astroEmbeddedTitle(raw) {
	for (const name of ['HOME_TITLE', 'TITLE']) {
		const val = resolveAstroStringConst(raw, name);
		if (val && new RegExp(`title\\s*=\\s*\\{${name}\\}`).test(raw)) return val;
	}

	const headVar = raw.match(/<BaseHead[^>]*\s+title=\{([A-Za-z_][A-Za-z0-9_]*)\}/);
	if (headVar) {
		const resolved = resolveAstroStringConst(raw, headVar[1]);
		if (resolved && !isInvalidAnchorTitle(resolved)) return resolved;
	}

	const patterns = [
		/BaseHead[^>]*\s+title=\{?["']([^"'$]+)["']\}?/,
		/<h1[^>]*>\s*\{title\}\s*<\/h1>/,
		/<h1[^>]*>\s*\{t\.title\}\s*<\/h1>/,
		/<h1[^>]*>\s*([^<{][^<]{2,120})\s*<\/h1>/,
	];
	for (const re of patterns) {
		const m = raw.match(re);
		if (!m?.[1]) continue;
		if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(m[1].trim())) {
			const resolved = resolveAstroStringConst(raw, m[1].trim());
			if (resolved && !isInvalidAnchorTitle(resolved)) return resolved;
			continue;
		}
		if (m[1].includes('{')) continue;
		const t = cleanPageTitle(m[1]);
		if (t && !isInvalidAnchorTitle(t)) return t;
	}
	return '';
}

/** Titres connus pour pages hub / wrappers sans frontmatter exploitable. */
export const KNOWN_PAGE_TITLES = new Map(
	Object.entries({
		'/': "Robot programmable enfant : guides d'achat, mBlock et tutos 2026",
		'/en/': 'Coding robots & smart home — guides for UK, US & Canada',
		'/uk/': 'Coding robots & smart home — guides for UK, US & Canada',
		'/ca/': 'Coding robots & smart home — guides for Canada',
		'/de/': 'Robot Éducatif: Ratgeber zu Programmierrobotern, Arduino und Raspberry Pi für Kinder',
		'/it/': 'Robot programmabili per bambini: guide Arduino e Raspberry Pi',
		'/es/': 'Robots programables para niños — guías en español',
		'/accessoires/': 'Accessoires des robots et cartes déjà présentés',
		'/en/accessories/': 'Accessories for the boards and robots already covered',
		'/uk/accessories/': 'Accessories for the boards and robots already covered',
		'/ca/accessories/': 'Accessories for the boards and robots already covered',
		'/de/zubehoer/': 'Zubehör für die bereits vorgestellten Roboter und Boards',
		'/it/accessori/': 'Accessori per i robot e le schede già presentati',
		'/es/accesorios/': 'Accesorios de los robots y placas ya presentados',
		'/black-friday/': 'Black Friday 2026 : robots, domotique et codes promo',
		'/en/black-friday/': 'Black Friday 2026 — educational robots and smart home',
		'/uk/black-friday/': 'Black Friday 2026 — educational robots and smart home',
		'/ca/black-friday/': 'Black Friday 2026 — educational robots and smart home',
		'/de/black-friday/': 'Black Friday 2026 — Lernroboter und Smart Home',
		'/it/black-friday/': 'Black Friday 2026 — robot educativi e domotica',
		'/es/black-friday/': 'Black Friday 2026 — robots educativos y domótica',
		'/blog/': 'Blog — guides robots et programmation',
		'/programmation/': 'Programmation — Python, Arduino et projets',
		'/domotique/': 'Domotique — guides et projets',
		'/en/smart-home/': 'Smart home — guides and projects',
		'/de/lernroboter-unter-100-euro/': 'Lernroboter unter 100 €: beste Kits 2026',
		'/it/python-forza-4-1-griglia/': 'Forza 4 in Python (1/6) — griglia 6×7 e modello dati',
		'/nl/lego-education-merk/': 'LEGO Education: merkgids SPIKE, WeDo en BricQ',
		'/nl/partners/': 'Partners — samenwerkingen per markt',
		'/nl/prijsdalingen/': 'Prijsdalingen bij partners',
		'/nl/prijsdalingen/hoe-we-meten/': 'Hoe prijsdalingen worden gemeten',
	}).map(([p, t]) => [p.endsWith('/') ? p : `${p}/`, t]),
);

/**
 * @param {string} urlPath
 * @param {string} raw  contenu source ou corps markdown
 */
export function titleFromSource(urlPath, raw = '') {
	const known = KNOWN_PAGE_TITLES.get(urlPath);
	if (known) return known;

	let t = '';
	try {
		// gray-matter peut échouer sur .astro ; on tente le YAML en tête de fichier
		t = yamlFrontmatterTitle(raw);
	} catch {
		/* ignore */
	}
	if (!t) t = yamlFrontmatterTitle(raw);
	if (!t && raw.includes('BaseHead')) t = astroEmbeddedTitle(raw);

	if (isPathLikeTitle(t) || isIdentifierLikeTitle(t)) t = humanizeUrlPath(urlPath);
	return t;
}

/**
 * Lit dist/…/index.html si présent (régénération locale ou CI avec artefact).
 */
export function titleFromDistHtml(html) {
	if (!html) return '';
	const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
	if (titleMatch) {
		const t = cleanPageTitle(titleMatch[1]);
		if (t && !isPathLikeTitle(t)) return t;
	}
	const h1Match = html.match(/<article[^>]*>[\s\S]*?<h1[^>]*>([^<]+)</i) || html.match(/<main[^>]*>[\s\S]*?<h1[^>]*>([^<]+)</i);
	if (h1Match) {
		const t = cleanPageTitle(h1Match[1]);
		if (t && !isPathLikeTitle(t)) return t;
	}
	return '';
}

export function distHtmlPath(root, urlPath) {
	if (urlPath === '/' || urlPath === '') return `${root}/dist/index.html`;
	const rel = urlPath.replace(/^\//, '').replace(/\/$/, '');
	return `${root}/dist/${rel}/index.html`;
}