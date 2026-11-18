#!/usr/bin/env node
/**
 * Génère src/data/maillage-plan.json : liens « À lire aussi » pour B08/B09.
 * Usage : node scripts/generate-maillage-plan.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import matter from 'gray-matter';
import { MAILLAGE_EXCLUDE_PATHS, detectContentLang, isSameContentLang } from '../src/lib/maillageLocales.mjs';
import {
	titleFromSource,
	titleFromDistHtml,
	distHtmlPath,
	isPathLikeTitle,
	humanizeUrlPath,
	KNOWN_PAGE_TITLES,
} from '../src/lib/maillagePageTitles.mjs';
import { getAllCatalogEntries } from '../src/data/unifiedErrorCatalog.mjs';
import { B09_ORPHAN_PATHS } from '../src/data/b09-orphan-paths.mjs';

const MIN_BLOCK_LINKS = 3;
const MAX_BLOCK_LINKS = 5;

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function loadProjectGuides() {
	const dir = path.join(root, 'src/data/projectGuides/files');
	const guides = [];
	for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.mjs'))) {
		const mod = await import(pathToFileURL(path.join(dir, file)).href);
		if (mod.guide) guides.push(mod.guide);
	}
	return guides;
}

const PROJECT_GUIDES_LIST = await loadProjectGuides();
const outFile = path.join(root, 'src/data/maillage-plan.json');

const B09_ORPHANS = B09_ORPHAN_PATHS.map(normalizePath);

/** Anciennes URL B09 → canonique éditoriale (redirections Astro). */
const B09_REDIRECT_CANONICAL = new Map(
	Object.entries({
		'/domotique/100-projets-domotique-utiles-2026/': '/domotique/configurateur-projet-domotique/',
		'/domotique/automatiser-porte-garage-homey/': '/domotique/ouvrir-porte-garage-smartphone-esp32-esphome/',
		'/domotique/codes-erreurs-domotique/': '/domotique/codes-erreurs-depannage-zigbee-home-assistant-shelly/',
		'/domotique/maison-connectee-sans-cloud-100-pourcent-locale/': '/domotique/debuter-en-domotique-guide-complet/',
		'/domotique/pieces-detachees-sav-domotique/': '/domotique/pieces-detachees-capteurs-compatibles-moins-cher/',
		'/domotique/suivre-consommation-electrique-prise-connectee/': '/domotique/projets/suivi-consommation-electrique/',
		'/domotique/volet-roulant-sans-neutral/': '/domotique/projets/volet-roulant-connecte/',
		'/python-listes-et-boucles-for/': '/python-boucles-for-while/',
		'/meilleur-robot-educatif-6-ans/': '/quel-robot-acheter-enfant-6-ans-guide-achat/',
		'/outils/quel-robot-educatif-choisir/': '/outil-quel-robot-enfant/',
		'/en/robot-for-8-year-old/': '/en/best-robot-for-an-8-year-old/',
		'/en/robot-for-10-year-old/': '/en/best-robot-for-a-10-year-old/',
		'/en/robot-for-12-year-old/': '/en/best-robot-for-a-12-year-old/',
		'/en/best-screen-free-coding-toys/': '/en/best-robot-for-a-6-year-old/',
		'/en/smart-home/esp32-smart-home-projects/': '/en/smart-home/esp32-smart-home-project-ideas/',
		'/uk/smart-home/esp32-smart-home-projects/': '/uk/smart-home/esp32-smart-home-project-ideas/',
		'/ca/smart-home/esp32-smart-home-projects/': '/ca/smart-home/esp32-smart-home-project-ideas/',
		'/ca/robot-for-8-year-old/': '/ca/best-robot-for-an-8-year-old/',
		'/ca/robot-for-10-year-old/': '/ca/best-robot-for-a-10-year-old/',
		'/ca/robot-for-12-year-old/': '/ca/best-robot-for-a-12-year-old/',
		'/ca/best-screen-free-coding-toys/': '/ca/best-robot-for-a-6-year-old/',
		'/uk/robot-for-8-year-old/': '/uk/best-robot-for-an-8-year-old/',
		'/uk/robot-for-10-year-old/': '/uk/best-robot-for-a-10-year-old/',
		'/uk/robot-for-12-year-old/': '/uk/best-robot-for-a-12-year-old/',
		'/uk/best-screen-free-coding-toys/': '/uk/best-robot-for-a-6-year-old/',
	}).map(([a, b]) => [normalizePath(a), normalizePath(b)]),
);

const ACCESSORIES_PATHS = new Map(
	[
		['/accessoires/', 'Accessoires des robots et cartes déjà présentés'],
		['/en/accessories/', 'Accessories for the boards and robots already covered'],
		['/uk/accessories/', 'Accessories for the boards and robots already covered'],
		['/ca/accessories/', 'Accessories for the boards and robots already covered'],
		['/de/zubehoer/', 'Zubehör für die bereits vorgestellten Roboter und Boards'],
		['/it/accessori/', 'Accessori per i robot e le schede già presentati'],
		['/es/accesorios/', 'Accesorios de los robots y placas ya presentados'],
	].map(([p, t]) => [normalizePath(p), t]),
);

function normalizePath(p) {
	let s = p.trim();
	if (!s.startsWith('/')) s = `/${s}`;
	if (!s.endsWith('/')) s = `${s}/`;
	return s;
}

function walkFiles(dir, acc = []) {
	if (!fs.existsSync(dir)) return acc;
	for (const name of fs.readdirSync(dir)) {
		const p = path.join(dir, name);
		const st = fs.statSync(p);
		if (st.isDirectory()) {
			if (name === 'node_modules' || name === 'dist') continue;
			walkFiles(p, acc);
		} else if (/\.(md|mdx|astro)$/.test(name)) {
			acc.push(p);
		}
	}
	return acc;
}

function urlPathFromSource(filePath) {
	const rel = path.relative(path.join(root, 'src/pages'), filePath).replace(/\\/g, '/');
	if (rel.endsWith('/index.astro')) {
		return normalizePath(`/${rel.replace(/\/index\.astro$/, '')}/`);
	}
	const base = rel.replace(/\.(md|mdx|astro)$/, '');
	if (base.endsWith('/index')) {
		return normalizePath(`/${base.replace(/\/index$/, '')}/`);
	}
	return normalizePath(`/${base}/`);
}

function collectInternalLinks(text) {
	const links = new Set();
	for (const m of text.matchAll(/\]\((\/[^)\s#?]+)/g)) links.add(normalizePath(m[1]));
	for (const m of text.matchAll(/href\s*=\s*["'](\/[^"'#?]+)["']/gi)) links.add(normalizePath(m[1]));
	return links;
}

function clusterKey(urlPath) {
	const lang = detectContentLang(urlPath);
	const stripped = urlPath.replace(/^\/|\/$/g, '');
	const parts = stripped ? stripped.split('/') : [];
	if (lang !== 'fr' && parts[0] === lang) parts.shift();
	const topic = parts.slice(0, 2).join('/') || 'site';
	return `${lang}::${topic}`;
}

function broaderClusterKey(urlPath) {
	const lang = detectContentLang(urlPath);
	const stripped = urlPath.replace(/^\/|\/$/g, '');
	const parts = stripped ? stripped.split('/') : [];
	if (lang !== 'fr' && parts[0] === lang) parts.shift();
	const topic = parts[0] || 'site';
	return `${lang}::${topic}`;
}

function hashPick(seed, arr, n) {
	const scored = arr.map((item, i) => ({
		item,
		score: simpleHash(`${seed}:${item.path}:${i}`),
	}));
	scored.sort((a, b) => a.score - b.score);
	return scored.slice(0, n).map((x) => x.item);
}

function simpleHash(s) {
	let h = 0;
	for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
	return h;
}

function titleForPath(urlPath, raw = '') {
	let t = titleFromSource(urlPath, raw);
	if (isPathLikeTitle(t)) {
		const distFile = distHtmlPath(root, urlPath);
		if (fs.existsSync(distFile)) {
			const fromDist = titleFromDistHtml(fs.readFileSync(distFile, 'utf8'));
			if (fromDist) t = fromDist;
		}
	}
	if (isPathLikeTitle(t) && KNOWN_PAGE_TITLES.has(urlPath)) {
		t = KNOWN_PAGE_TITLES.get(urlPath);
	}
	if (isPathLikeTitle(t)) t = humanizeUrlPath(urlPath);
	return t;
}

function resolvePageTitle(page) {
	if (page.file && page.file !== '' && fs.existsSync(page.file)) {
		return titleForPath(page.path, fs.readFileSync(page.file, 'utf8'));
	}
	return titleForPath(page.path, '');
}

function linkEntry(href, titleByPath) {
	const path = normalizePath(href);
	return { href: path, title: titleByPath.get(path) || titleForPath(path) };
}

function assertNoPathLikeTitles(outboundMap) {
	for (const [src, links] of Object.entries(outboundMap)) {
		for (const l of links) {
			if (isPathLikeTitle(l.title)) {
				throw new Error(`[maillage-plan] Ancre invalide (chemin) sur ${src} → ${l.href} : « ${l.title} »`);
			}
		}
	}
}

const pages = [];
const knownPaths = new Set();

for (const file of walkFiles(path.join(root, 'src/pages'))) {
	if (file.includes('[...') || file.includes('[slug]') || file.includes('[partenaire]')) continue;
	const urlPath = urlPathFromSource(file);
	if (MAILLAGE_EXCLUDE_PATHS.has(urlPath)) continue;
	if (urlPath.startsWith('/partenaires/') && urlPath !== '/partenaires/') continue;
	const raw = fs.readFileSync(file, 'utf8');
	let body = raw;
	let title = urlPath;
	try {
		const { data, content } = matter(raw);
		body = content;
		if (data.title) title = String(data.title).trim();
	} catch {
		const t = raw.match(/title:\s*["']([^"']+)["']/);
		if (t) title = t[1];
	}
	const outLinks = [...collectInternalLinks(body)].filter(
		(h) => !h.startsWith('/go/') && isSameContentLang(h, urlPath),
	);
	pages.push({ path: urlPath, title, cluster: clusterKey(urlPath), broad: broaderClusterKey(urlPath), outCount: outLinks.size, file });
	knownPaths.add(urlPath);
}

for (const coll of ['blog', 'domotique']) {
	const dir = path.join(root, 'src/content', coll);
	if (!fs.existsSync(dir)) continue;
	for (const name of fs.readdirSync(dir).filter((f) => /\.mdx?$/.test(f))) {
		const slug = name.replace(/\.mdx?$/, '');
		const urlPath = coll === 'domotique' ? normalizePath(`/domotique/${slug}/`) : normalizePath(`/${slug}/`);
		const raw = fs.readFileSync(path.join(dir, name), 'utf8');
		const { data, content } = matter(raw);
		const outLinks = [...collectInternalLinks(content)].filter(
			(h) => !h.startsWith('/go/') && isSameContentLang(h, urlPath),
		);
		pages.push({
			path: urlPath,
			title: String(data.title || slug),
			cluster: clusterKey(urlPath),
			broad: broaderClusterKey(urlPath),
			outCount: outLinks.size,
			file: path.join(dir, name),
		});
		knownPaths.add(urlPath);
	}
}

for (const guide of PROJECT_GUIDES_LIST) {
	for (const [lang, rawPath] of Object.entries(guide.paths || {})) {
		if (!rawPath) continue;
		const urlPath = normalizePath(rawPath);
		if (knownPaths.has(urlPath)) continue;
		const title =
			guide[lang]?.title || guide.en?.title || guide.fr?.title || urlPath;
		pages.push({
			path: urlPath,
			title,
			cluster: clusterKey(urlPath),
			broad: broaderClusterKey(urlPath),
			outCount: 0,
			file: '',
		});
		knownPaths.add(urlPath);
	}
}

for (const entry of getAllCatalogEntries()) {
	const title =
		entry.title?.fr || entry.title?.en || entry.error_code || entry.slug;
	for (const { lang, prefix } of [
		{ lang: 'fr', prefix: `/domotique/code-erreur/${entry.slug}/` },
		{ lang: 'en', prefix: `/en/smart-home/error/${entry.slug}/` },
	]) {
		const urlPath = normalizePath(prefix);
		if (knownPaths.has(urlPath)) continue;
		pages.push({
			path: urlPath,
			title,
			cluster: clusterKey(urlPath),
			broad: broaderClusterKey(urlPath),
			outCount: 0,
			file: '',
		});
		knownPaths.add(urlPath);
	}
}

/** Titres éditoriaux (jamais un chemin URL brut). */
const titleByPath = new Map();
for (const p of pages) {
	const resolved = resolvePageTitle(p);
	p.title = resolved;
	titleByPath.set(p.path, resolved);
}

const byCluster = new Map();
const byBroad = new Map();
for (const p of pages) {
	if (!byCluster.has(p.cluster)) byCluster.set(p.cluster, []);
	byCluster.get(p.cluster).push(p);
	if (!byBroad.has(p.broad)) byBroad.set(p.broad, []);
	byBroad.get(p.broad).push(p);
}

const outbound = {};
const inboundCount = new Map();

function ensureOutbound(pagePath, targets) {
	if (!outbound[pagePath]) outbound[pagePath] = [];
	const existing = new Set(outbound[pagePath].map((t) => t.href));
	for (const t of targets) {
		if (t.href === pagePath) continue;
		if (!knownPaths.has(t.href)) continue;
		if (existing.has(t.href)) continue;
		if (outbound[pagePath].length >= MAX_BLOCK_LINKS) break;
		outbound[pagePath].push(t);
		existing.add(t.href);
		inboundCount.set(t.href, (inboundCount.get(t.href) || 0) + 1);
	}
}

function pickTargets(source, count, preferPaths = []) {
	const same = (byCluster.get(source.cluster) || []).filter((p) => p.path !== source.path);
	let pool = same.length >= count ? same : (byBroad.get(source.broad) || []).filter((p) => p.path !== source.path);
	if (pool.length < count) {
		const lang = detectContentLang(source.path);
		pool = pages.filter((p) => p.path !== source.path && detectContentLang(p.path) === lang);
	}
	const prefer = preferPaths
		.map(normalizePath)
		.filter((h) => h !== source.path && knownPaths.has(h))
		.map((h) => pages.find((p) => p.path === h))
		.filter(Boolean);
	const picked = [];
	for (const p of prefer) {
		if (picked.length >= count) break;
		if (!picked.some((x) => x.path === p.path)) picked.push(p);
	}
	const rest = hashPick(source.path, pool.filter((p) => !picked.some((x) => x.path === p.path)), count - picked.length);
	const all = [...picked, ...rest].slice(0, count);
	return all.map((p) => linkEntry(p.path, titleByPath));
}

for (const page of pages) {
	// Seuil volontairement prudent : le markdown source sous-estime souvent les liens comptés dans dist/.
	if (page.outCount >= MAX_BLOCK_LINKS) continue;
	const need = Math.min(MAX_BLOCK_LINKS, Math.max(MIN_BLOCK_LINKS, MAX_BLOCK_LINKS - page.outCount));
	const targets = pickTargets(page, need);
	ensureOutbound(page.path, targets);
}

for (const orphanPath of B09_ORPHANS) {
	const targetPath = B09_REDIRECT_CANONICAL.get(orphanPath) || orphanPath;
	if (!knownPaths.has(orphanPath) && !knownPaths.has(targetPath)) continue;
	const current = inboundCount.get(targetPath) || inboundCount.get(orphanPath) || 0;
	if (current >= 3) continue;
	const need = 3 - current;
	const lang = detectContentLang(targetPath);
	const orphanPage = pages.find((p) => p.path === targetPath) || pages.find((p) => p.path === orphanPath);
	const cluster = orphanPage?.cluster ?? clusterKey(targetPath);
	let candidates = (byCluster.get(cluster) || []).filter((p) => p.path !== targetPath && p.path !== orphanPath);
	if (candidates.length < need) {
		const broad = orphanPage?.broad ?? broaderClusterKey(targetPath);
		candidates = (byBroad.get(broad) || []).filter((p) => p.path !== targetPath && p.path !== orphanPath);
	}
	if (candidates.length < need) {
		candidates = pages.filter((p) => p.path !== targetPath && p.path !== orphanPath && detectContentLang(p.path) === lang);
	}
	candidates = hashPick(targetPath, candidates, Math.max(need * 3, 12));
	const targetPage = orphanPage;
	for (const src of candidates) {
		const cur = inboundCount.get(targetPath) || inboundCount.get(orphanPath) || 0;
		if (cur >= 3) break;
		const prefer = [linkEntry(targetPath, titleByPath)];
		const extra = pickTargets(src, 2, [targetPath]);
		ensureOutbound(src.path, [...prefer, ...extra]);
	}
}

const ERROR_HUBS = [
	'/domotique/codes-erreurs-depannage-zigbee-home-assistant-shelly/',
	'/en/smart-home/error-codes-troubleshooting-zigbee-home-assistant-shelly/',
];
for (const hub of ERROR_HUBS) {
	if (!knownPaths.has(hub)) continue;
	const hubPage = pages.find((p) => p.path === hub);
	if (!hubPage) continue;
	const lang = detectContentLang(hub);
	const errors = pages.filter(
		(p) =>
			detectContentLang(p.path) === lang &&
			(p.path.includes('/error/') || p.path.includes('/code-erreur/')),
	);
	const picks = hashPick(hub, errors, 8);
	ensureOutbound(hub, picks.map((p) => linkEntry(p.path, titleByPath)));
}

for (const [accPath, accTitle] of ACCESSORIES_PATHS) {
	if (!knownPaths.has(accPath)) continue;
	const accPage = pages.find((p) => p.path === accPath) || { path: accPath, title: accTitle, cluster: clusterKey(accPath), broad: broaderClusterKey(accPath) };
	accPage.title = accTitle;
	ensureOutbound(accPath, pickTargets(accPage, 5));
}

const B09_PUSH_TAIL = [
	'/accessoires/',
	'/de/lernroboter-unter-100-euro/',
	'/it/python-forza-4-1-griglia/',
	'/nl/lego-education-merk/',
].map(normalizePath);

for (const orphanPath of [...B09_ORPHANS, ...B09_PUSH_TAIL]) {
	if (orphanPath.includes('404') || orphanPath.includes('gestion-des-cookies') || orphanPath.includes('stats-articles')) continue;
	const targetPath = B09_REDIRECT_CANONICAL.get(orphanPath) || orphanPath;
	const exists = knownPaths.has(targetPath) || knownPaths.has(orphanPath);
	if (!exists) continue;
	const targetPage = pages.find((p) => p.path === targetPath) || pages.find((p) => p.path === orphanPath);
	const lang = detectContentLang(targetPath);
	let guard = 0;
	while ((inboundCount.get(targetPath) || 0) < 3 && guard < 32) {
		guard += 1;
		const pool = pages.filter(
			(p) => p.path !== targetPath && detectContentLang(p.path) === lang,
		);
		const src = hashPick(`${targetPath}:${guard}`, pool, 1)[0];
		if (!src) break;
		ensureOutbound(src.path, [linkEntry(targetPath, titleByPath)]);
	}
}

/** Chaque page du plan : au moins MIN_BLOCK_LINKS liens « À lire aussi ». */
for (const pagePath of Object.keys(outbound)) {
	const links = outbound[pagePath];
	if (links.length >= MIN_BLOCK_LINKS) continue;
	const page = pages.find((p) => p.path === pagePath);
	if (!page) continue;
	const extra = pickTargets(page, MIN_BLOCK_LINKS + 2).filter(
		(t) => !links.some((l) => l.href === t.href) && t.href !== pagePath,
	);
	ensureOutbound(pagePath, extra.slice(0, MIN_BLOCK_LINKS - links.length));
}

/** UK/CA : la plupart des pages viennent du miroir EN — dupliquer le plan avec préfixes /uk/ et /ca/. */
function enToMarket(pathname, market) {
	if (!pathname.startsWith('/en/')) return pathname;
	return pathname.replace(/^\/en\//, `/${market}/`);
}

const expanded = { ...outbound };
for (const [srcPath, links] of Object.entries(outbound)) {
	if (!srcPath.startsWith('/en/')) continue;
	for (const market of ['uk', 'ca']) {
		const destPath = enToMarket(srcPath, market);
		if (expanded[destPath]) continue;
		const mirrored = links.map((l) => {
			const href = l.href.startsWith('/en/') ? enToMarket(l.href, market) : l.href;
			return linkEntry(href, titleByPath);
		});
		if (mirrored.length) expanded[destPath] = mirrored;
	}
}

for (const market of ['uk', 'ca']) {
	for (const page of pages) {
		if (!page.path.startsWith('/en/')) continue;
		const destPath = enToMarket(page.path, market);
		if (expanded[destPath] || !outbound[page.path]?.length) continue;
		expanded[destPath] = outbound[page.path].map((l) => {
			const href = l.href.startsWith('/en/') ? enToMarket(l.href, market) : l.href;
			return linkEntry(href, titleByPath);
		});
	}
}

function topUpExpanded(map) {
	for (const pagePath of Object.keys(map)) {
		const links = map[pagePath];
		if (!links?.length || links.length >= MIN_BLOCK_LINKS) continue;
		const page = pages.find((p) => p.path === pagePath);
		if (!page) continue;
		let guard = 0;
		while (links.length < MIN_BLOCK_LINKS && guard < 16) {
			guard += 1;
			const candidates = pickTargets(page, MIN_BLOCK_LINKS + 4).filter(
				(t) => t.href !== pagePath && !links.some((l) => l.href === t.href),
			);
			if (!candidates.length) break;
			links.push(candidates[0]);
		}
		map[pagePath] = links;
	}
}

/** Langues à catalogue réduit (ex. NL) : maille complète entre pairs + minimum 3 liens. */
const nlPages = pages.filter((p) => detectContentLang(p.path) === 'nl');
if (nlPages.length > 1) {
	for (const p of nlPages) {
		const others = nlPages.filter((x) => x.path !== p.path).map((x) => linkEntry(x.path, titleByPath));
		ensureOutbound(p.path, others);
		if (outbound[p.path]?.length) {
			const list = expanded[p.path] || [...outbound[p.path]];
			for (const t of others) {
				if (list.length >= MIN_BLOCK_LINKS) break;
				if (list.some((l) => l.href === t.href)) continue;
				list.push(t);
			}
			expanded[p.path] = list;
		}
	}
}

topUpExpanded(expanded);

assertNoPathLikeTitles(expanded);

const plan = {
	generatedAt: new Date().toISOString(),
	pageCount: pages.length,
	outbound: expanded,
	stats: {
		pagesWithSupplement: Object.keys(expanded).length,
		b09InKnown: B09_ORPHANS.filter((p) => knownPaths.has(p)).length,
	},
};

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, `${JSON.stringify(plan, null, 2)}\n`, 'utf8');
console.log(
	`[maillage-plan] ${plan.stats.pagesWithSupplement} pages avec liens injectés, ${pages.length} pages indexées`,
);