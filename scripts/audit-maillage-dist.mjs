#!/usr/bin/env node
/**
 * Mesure B08 (liens sortants dans article .prose) et B09 (liens entrants) sur dist/.
 * Usage: node scripts/audit-maillage-dist.mjs [dist]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';
import { MAILLAGE_EXCLUDE_PATHS } from '../src/lib/maillageLocales.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.resolve(root, process.argv[2] || 'dist');

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

if (!fs.existsSync(dist)) {
	console.error(`dist introuvable: ${dist}`);
	process.exit(1);
}

const files = walkHtml(dist);
const pages = [];
const inbound = new Map();

for (const file of files) {
	const urlPath = urlPathFromFile(file);
	if (!isEditorialPath(urlPath)) continue;
	const html = fs.readFileSync(file, 'utf8');
	const { count, links } = extractProseLinks(html, urlPath);
	pages.push({ path: urlPath, outCount: count });
	for (const target of links) {
		if (!inbound.has(target)) inbound.set(target, new Set());
		inbound.get(target).add(urlPath);
	}
}

const b08Low = pages.filter((p) => p.outCount < 3);
const b08Ok = pages.filter((p) => p.outCount >= 3);
const orphans = pages.filter((p) => (inbound.get(p.path)?.size ?? 0) < 1);

const report = {
	dist,
	totalEditorial: pages.length,
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
	`${JSON.stringify({ summary: report, orphans: orphans.map((p) => p.path), b08Low: b08Low.map((p) => p.path) }, null, 2)}\n`,
);
console.log(JSON.stringify(report, null, 2));