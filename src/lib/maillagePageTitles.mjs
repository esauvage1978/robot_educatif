/**
 * Résolution de titres éditoriaux pour le plan de maillage (jamais un chemin URL).
 */

const SITE_SUFFIX = /\s*\|\s*Robot\s*[ÉE]ducatif.*$/i;

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
	const end = raw.indexOf('\n---', 4);
	if (end < 0) return '';
	const yaml = raw.slice(4, end);
	const quoted = yaml.match(/^title:\s*["']([^"']+)["']/m);
	if (quoted) return cleanPageTitle(quoted[1]);
	const plain = yaml.match(/^title:\s*([^\n]+)/m);
	if (plain) return cleanPageTitle(plain[1].trim());
	return '';
}

function astroEmbeddedTitle(raw) {
	const patterns = [
		/BaseHead[^>]*\s+title=\{?["']([^"'$]+)["']\}?/,
		/<BaseHead[^>]*title=\{([^}]+)\}/,
		/const\s+title\s*=\s*["']([^"']+)["']/,
		/<h1[^>]*>\s*\{title\}\s*<\/h1>/,
		/<h1[^>]*>\s*\{t\.title\}\s*<\/h1>/,
		/<h1[^>]*>\s*([^<{][^<]{2,120})\s*<\/h1>/,
	];
	for (const re of patterns) {
		const m = raw.match(re);
		if (m?.[1] && !m[1].includes('{')) {
			const t = cleanPageTitle(m[1]);
			if (t && !isPathLikeTitle(t)) return t;
		}
	}
	return '';
}

/** Titres connus pour pages hub / wrappers sans frontmatter exploitable. */
export const KNOWN_PAGE_TITLES = new Map(
	Object.entries({
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
		'/nl/partners/': 'Partners — affiliate programs by market',
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

	if (isPathLikeTitle(t)) t = humanizeUrlPath(urlPath);
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
	const rel = urlPath.replace(/^\//, '').replace(/\/$/, '');
	return `${root}/dist/${rel}/index.html`;
}