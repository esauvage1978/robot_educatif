#!/usr/bin/env node
/**
 * Mesure B08 (liens sortants dans article .prose) et B09 (liens entrants) sur dist/.
 * Usage: node scripts/audit-maillage-dist.mjs [dist] [--strict]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';
import { MAILLAGE_EXCLUDE_PATHS } from '../src/lib/maillageLocales.mjs';
import { isInvalidAnchorTitle, normalizeMaillageHref } from '../src/lib/maillagePageTitles.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const strict = argv.includes('--strict');
const distArg = argv.find((a) => a !== '--strict');
const dist = path.resolve(root, distArg || 'dist');

function walkHtml(dir, out = []) {
	if (!fs.existsSync(dir)) return out;
	for (const name of fs.readdirSync(dir)) {
		const p = path.join(dir, name);
		if (fs.statSync(p).isDirectory()) walkHtml(p, out);
		else if (name.endsWith('.html')) out.push(p);
	}
	return out;
}

function urlPathFromFile(file) {
	const rel = path.relative(dist, file).replace(/\\/g, '/');
	if (rel === 'index.html') return '/';
	if (rel.endsWith('/index.html')) return `/${rel.replace(/\/index\.html$/, '')}/`;
	return `/${rel}`;
}

function isEditorialPath(urlPath) {
	if (MAILLAGE_EXCLUDE_PATHS.has(urlPath)) return false;
	if (urlPath.startsWith('/go/')) return false;
	if (urlPath.includes('/partenaires/') && urlPath !== '/partenaires/') return false;
	return true;
}

function extractProseLinks(html, pagePath) {
	const $ = cheerio.load(html);
	const prose = $('article .prose, main article .prose, main .prose').first();
	if (!prose.length) return { count: 0, links: [] };
	const pageLang = pagePath.match(/^\/(en|de|it|es|nl|uk|ca)(\/|$)/)?.[1] ?? 'fr';
	const links = [];
	prose.find('a[href]').each((_, el) => {
		let h = $(el).attr('href') || '';
		if (!h || h.startsWith('#') || /^mailto:|^tel:|^javascript:/i.test(h)) return;
		if (h.startsWith('http')) {
			try {
				const u = new URL(h);
				if (u.hostname.replace(/^www\./, '') !== 'robot-educatif.info') return;
				h = u.pathname;
			} catch {
				return;
			}
		}
		if (!h.startsWith('/')) return;
		if (h.startsWith('/go/')) return;
		const norm = h.endsWith('/') ? h : `${h}/`;
		const linkLang = norm.match(/^\/(en|de|it|es|nl|uk|ca)(\/|$)/)?.[1] ?? 'fr';
		if (linkLang !== pageLang) return;
		links.push(norm);
	});
	return { count: new Set(links).size, links: [...new Set(links)] };
}

function auditEditorialBlocks(html, pagePath) {
	const $ = cheerio.load(html);
	const block = $('#editorial-read-also-title').closest('section.editorial-read-also');
	if (!block.length) return { rendered: false, linkCount: 0, anchors: [] };
	const anchors = [];
	block.find('a[href]').each((_, el) => {
		const text = $(el).text().replace(/\s+/g, ' ').trim();
		const href = $(el).attr('href') || '';
		anchors.push({ text, href });
	});
	return { rendered: true, linkCount: anchors.length, anchors };
}

function looksLikeUrlAnchor(text) {
	return isInvalidAnchorTitle(text);
}

function collectValidDistPaths(distDir) {
	const valid = new Set(['/']);
	function walk(dir) {
		for (const name of fs.readdirSync(dir)) {
			const p = path.join(dir, name);
			if (fs.statSync(p).isDirectory()) {
				walk(p);
				continue;
			}
			const rel = path.relative(distDir, p).replace(/\\/g, '/');
			if (name.endsWith('.html')) {
				valid.add(urlPathFromFile(p));
				continue;
			}
			valid.add(`/${rel}`);
		}
	}
	walk(distDir);
	return valid;
}

function normalizeCheckingHref(href) {
	if (!href?.startsWith('/')) return '';
	let h = href.split('#')[0].split('?')[0];
	if (h.startsWith('/go/')) return '';
	h = normalizeMaillageHref(h);
	if (/\.\w{2,5}$/i.test(h)) return h;
	if (!h.endsWith('/')) h = `${h}/`;
	return h;
}

function auditInternalHrefs(html, pagePath, validPaths, deadLinks) {
	const $ = cheerio.load(html);
	const selector = 'section.editorial-read-also a[href], .pp-grille a.pp-carte[href], .pp-fil a[href]';
	$(selector).each((_, el) => {
		let h = $(el).attr('href') || '';
		if (!h.startsWith('/')) return;
		const norm = normalizeCheckingHref(h);
		if (!norm) return;
		if (!validPaths.has(norm)) {
			deadLinks.push({ from: pagePath, href: norm, text: $(el).text().replace(/\s+/g, ' ').trim().slice(0, 80) });
		}
	});
}

if (!fs.existsSync(dist)) {
	console.error(`dist introuvable: ${dist}`);
	process.exit(1);
}

const files = walkHtml(dist);
const validPaths = collectValidDistPaths(dist);
const pages = [];
const inbound = new Map();
const deadLinks = [];
let blocksRendered = 0;
let blocksUnder3Links = 0;
const badAnchors = [];
const ukCaEnInText = [];

for (const file of files) {
	const urlPath = urlPathFromFile(file);
	const html = fs.readFileSync(file, 'utf8');
	auditInternalHrefs(html, urlPath, validPaths, deadLinks);
	if (!isEditorialPath(urlPath)) continue;
	const { count, links } = extractProseLinks(html, urlPath);
	const block = auditEditorialBlocks(html, urlPath);
	pages.push({ path: urlPath, outCount: count, block });
	for (const target of links) {
		if (!inbound.has(target)) inbound.set(target, new Set());
		inbound.get(target).add(urlPath);
	}
	if (block.rendered) {
		blocksRendered += 1;
		if (block.linkCount < 3) blocksUnder3Links += 1;
		for (const a of block.anchors) {
			if (looksLikeUrlAnchor(a.text)) {
				badAnchors.push({ page: urlPath, text: a.text, href: a.href });
			}
		}
	}
	if ((urlPath.startsWith('/uk/') || urlPath.startsWith('/ca/')) && html.includes('editorial-read-also')) {
		const $ = cheerio.load(html);
		const section = $('section.editorial-read-also');
		const visible = section.text();
		if (/\/en\//.test(visible)) {
			ukCaEnInText.push(urlPath);
		}
		for (const a of section.find('a').toArray()) {
			const t = $(a).text();
			if (t.includes('/en/')) ukCaEnInText.push(`${urlPath} (ancre: ${t.slice(0, 80)})`);
		}
	}
}

const b08Low = pages.filter((p) => p.outCount < 3);
const b08Ok = pages.filter((p) => p.outCount >= 3);
const orphans = pages.filter((p) => (inbound.get(p.path)?.size ?? 0) < 1);

const report = {
	dist,
	totalEditorial: pages.length,
	editorialReadAlso: {
		blocksRendered,
		blocksUnder3Links,
		badAnchorCount: badAnchors.length,
		ukCaVisibleEnPaths: [...new Set(ukCaEnInText)].length,
		deadInternalLinks: deadLinks.length,
	},
	b08: {
		below3: b08Low.length,
		atLeast3: b08Ok.length,
	},
	b09: {
		zeroInbound: orphans.length,
		atLeast3Inbound: pages.filter((p) => (inbound.get(p.path)?.size ?? 0) >= 3).length,
	},
};

const outPath = path.join(root, 'audit', 'maillage-dist-report.json');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(
	outPath,
	`${JSON.stringify(
		{
			summary: report,
			badAnchors: badAnchors.slice(0, 50),
			deadLinks: deadLinks.slice(0, 50),
			ukCaEnInText: [...new Set(ukCaEnInText)].slice(0, 50),
			orphans: orphans.map((p) => p.path),
			b08Low: b08Low.map((p) => p.path),
		},
		null,
		2,
	)}\n`,
);
console.log(JSON.stringify(report, null, 2));

if (strict) {
	const errors = [];
	if (badAnchors.length) {
		errors.push(`${badAnchors.length} ancre(s) ressemblent à un chemin/URL (ex. ${badAnchors[0].page}: « ${badAnchors[0].text} »)`);
	}
	if (blocksUnder3Links) {
		errors.push(`${blocksUnder3Links} bloc(s) « À lire aussi » avec moins de 3 liens`);
	}
	if (ukCaEnInText.length) {
		errors.push(`${[...new Set(ukCaEnInText)].length} page(s) /uk/ ou /ca/ avec « /en/ » visible dans le bloc`);
	}
	if (deadLinks.length) {
		errors.push(
			`${deadLinks.length} lien(s) interne(s) vers une page absente de dist/ (ex. ${deadLinks[0].from} → ${deadLinks[0].href})`,
		);
	}
	if (errors.length) {
		console.error('[audit-maillage-dist] Échec strict:\n' + errors.map((e) => `  - ${e}`).join('\n'));
		process.exit(1);
	}
}