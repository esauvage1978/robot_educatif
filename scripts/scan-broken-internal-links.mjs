/**
 * Liste les liens internes des contenus qui ne correspondent à aucune route connue.
 * Usage : node scripts/scan-broken-internal-links.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { DOMOTIQUE_SLUGS, domotiquePath, frDomotiquePath } from '../src/lib/domotiqueI18n.mjs';
import { PROJECT_SLUGS, projectPagePath } from '../src/data/smartHomeProjectSlugs.mjs';
import { ESP32_PROJECTS, ESP32_TUTORIALS, ESP32_HUB_PATHS } from '../src/data/esp32Projects/index.mjs';
import { getAllCatalogEntries } from '../src/data/unifiedErrorCatalog.mjs';

const root = path.resolve(import.meta.dirname, '..');
const routes = new Set(['/']);

function addRoute(urlPath) {
	if (!urlPath || typeof urlPath !== 'string') return;
	let p = urlPath.split('?')[0].split('#')[0].trim();
	if (!p.startsWith('/')) return;
	if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
	routes.add(p === '' ? '/' : p);
}

function walk(dir, acc = []) {
	if (!fs.existsSync(dir)) return acc;
	for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
		if (ent.name === 'node_modules' || ent.name === 'dist' || ent.name.startsWith('.')) continue;
		const p = path.join(dir, ent.name);
		if (ent.isDirectory()) walk(p, acc);
		else acc.push(p);
	}
	return acc;
}

const pagesDir = path.join(root, 'src/pages');
for (const file of walk(pagesDir)) {
	if (!/\.(astro|md|mdx)$/.test(file)) continue;
	let rel = path.relative(pagesDir, file).replace(/\\/g, '/');
	if (rel.includes('[')) continue;
	rel = rel.replace(/\.(astro|mdx|md)$/, '');
	if (rel.endsWith('/index')) rel = rel.slice(0, -'/index'.length);
	else if (rel === 'index') rel = '';
	addRoute('/' + rel);
}

for (const file of walk(path.join(root, 'src/content/blog'))) {
	if (!/\.mdx?$/.test(file)) continue;
	addRoute('/' + path.basename(file).replace(/\.mdx?$/, ''));
}
for (const file of walk(path.join(root, 'src/content/domotique'))) {
	if (!/\.mdx?$/.test(file)) continue;
	addRoute('/domotique/' + path.basename(file).replace(/\.mdx?$/, ''));
}

for (const frSlug of Object.keys(DOMOTIQUE_SLUGS)) {
	addRoute(frDomotiquePath(frSlug));
	for (const lang of ['en', 'de', 'it', 'es']) addRoute(domotiquePath(lang, frSlug));
}
for (const slug of PROJECT_SLUGS) addRoute(projectPagePath(slug));
for (const project of ESP32_PROJECTS) {
	for (const p of Object.values(project.paths)) addRoute(p);
}
for (const tutorial of ESP32_TUTORIALS) {
	for (const p of Object.values(tutorial.paths)) addRoute(p);
}
for (const p of Object.values(ESP32_HUB_PATHS)) addRoute(p);
for (const entry of getAllCatalogEntries()) addRoute('/domotique/code-erreur/' + entry.slug + '/');

const ht = fs.readFileSync(path.join(root, 'public/.htaccess'), 'utf8');
for (const m of ht.matchAll(/RewriteRule \^([^$?\s]+)\??\$?\s+(\/[^ \[]+)/g)) {
	const src = m[1].replace(/\\/g, '').replace(/\(\/\.\*\)\?/, '').replace(/\/\?$/, '');
	if (src.includes('(') || src.includes('[') || src.includes('.')) continue;
	addRoute('/' + src);
	addRoute(m[2]);
}
addRoute('/domotique/codes-erreurs-domotique/');
addRoute('/domotique/pieces-detachees-sav-domotique/');
addRoute('/outils/quel-robot-educatif-choisir/');

function categoryToSlug(label) {
	return label
		.trim()
		.normalize('NFD')
		.replace(/\p{M}/gu, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '') || 'categorie';
}

const publicRoot = path.join(root, 'public');
function publicFileExists(urlPath) {
	const rel = decodeURIComponent(urlPath.split('?')[0].split('#')[0]).replace(/^\//, '');
	if (!rel || rel.includes('..')) return false;
	return fs.existsSync(path.join(publicRoot, rel));
}

function normalizeHref(raw) {
	let h = raw.trim().replace(/&amp;/g, '&');
	if (!h || h.startsWith('#') || h.startsWith('mailto:') || h.startsWith('tel:') || h.startsWith('javascript:')) return null;
	try {
		if (/^https?:\/\//i.test(h)) {
			const u = new URL(h);
			if (!/^(www\.)?robot-educatif\.info$/i.test(u.hostname) && !/^localhost$/i.test(u.hostname)) return null;
			h = u.pathname;
		}
	} catch {
		return null;
	}
	if (h.startsWith('//')) return null;
	if (!h.startsWith('/')) return null;
	h = h.split('?')[0].split('#')[0];
	if (h.length > 1 && h.endsWith('/')) h = h.slice(0, -1);
	return h || '/';
}

const cfg = fs.readFileSync(path.join(root, 'astro.config.mjs'), 'utf8');
for (const m of cfg.matchAll(/'([^']+)':\s*'([^']+)'/g)) {
	if (m[1].startsWith('/') && m[2].startsWith('/')) {
		addRoute(m[1]);
		addRoute(m[2]);
	}
}

const linkRe = /(?<!!)\[([^\]\n]+)\]\(\s*<?([^>\s)]+)>?/g;
const hrefRe = /href\s*=\s*["']([^"']+)["']/gi;
const missing = new Map();

function note(href, file) {
	const key = href;
	if (!missing.has(key)) missing.set(key, new Set());
	missing.get(key).add(path.relative(root, file).replace(/\\/g, '/'));
}

const scanDirs = [
	path.join(root, 'src/content'),
	path.join(root, 'src/pages'),
	path.join(root, 'src/components'),
	path.join(root, 'src/data'),
];
const allowPrefix = ['/go/', '/_image', '/fonts/', '/images/', '/pinterest/', '/downloads/', '/favicon'];

for (const dir of scanDirs) {
	for (const file of walk(dir)) {
		if (!/\.(md|mdx|astro|mjs|js|ts)$/.test(file)) continue;
		const text = fs.readFileSync(file, 'utf8');
		const found = new Set();
		for (const m of text.matchAll(linkRe)) found.add(m[2]);
		for (const m of text.matchAll(hrefRe)) found.add(m[1]);
		for (const raw of found) {
			const href = normalizeHref(raw);
			if (!href) continue;
			if (allowPrefix.some((p) => href === p.replace(/\/$/, '') || href.startsWith(p))) {
				if (href.startsWith('/downloads/') || href.startsWith('/images/') || href.startsWith('/pinterest/')) {
					if (!publicFileExists(href) && !href.endsWith('/')) note(href, file);
				}
				continue;
			}
			if (href.startsWith('/categorie/')) {
				continue;
			}
			if (publicFileExists(href)) continue;
			if (!routes.has(href)) note(href, file);
		}
	}
}

const rows = [...missing.entries()].sort((a, b) => a[0].localeCompare(b[0]));
console.log('routes', routes.size);
console.log('missing', rows.length);
for (const [href, files] of rows) {
	const list = [...files].slice(0, 6).join(', ');
	console.log(href + '  ←  ' + list + (files.size > 6 ? ` (+${files.size - 6})` : ''));
}
