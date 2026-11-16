#!/usr/bin/env node
/**
 * Audit local barème Manu — page marque LEGO Education (8 langues).
 * Usage: node scripts/audit-lego-brand-page.mjs [dist]
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'node-html-parser';

const dist = process.argv[2] || 'dist';
const site = 'https://robot-educatif.info';

const PAGES = {
	fr: 'marque-lego/index.html',
	en: 'en/lego-education-brand/index.html',
	uk: 'uk/lego-education-brand/index.html',
	ca: 'ca/lego-education-brand/index.html',
	de: 'de/marke-lego-education/index.html',
	it: 'it/marchio-lego-education/index.html',
	es: 'es/marca-lego-education/index.html',
	nl: 'nl/lego-education-merk/index.html',
};

const WEIGHTS = {
	seo: 14,
	maillage: 12,
	depth: 14,
	images: 12,
	affiliation: 10,
	structure: 8,
	freshness: 6,
	reliability: 8,
	intention: 8,
	hreflang: 4,
};

function wordCount(html) {
	const text = html
		.replace(/<script[\s\S]*?<\/script>/gi, '')
		.replace(/<style[\s\S]*?<\/style>/gi, '')
		.replace(/<[^>]+>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
	return text.split(' ').filter(Boolean).length;
}

function scorePage(lang, relPath) {
	const abs = join(dist, relPath);
	const report = { lang, path: relPath, score: 0, max: 0, details: [], missing: [] };
	if (!existsSync(abs)) {
		report.missing.push('fichier HTML absent');
		return report;
	}
	const raw = readFileSync(abs, 'utf8');
	const root = parse(raw);
	const headEnd = raw.search(/<\/head>/i);
	const head = headEnd < 0 ? raw : raw.slice(0, headEnd);
	const main = root.querySelector('main article') || root.querySelector('article') || root.querySelector('main') || root;
	const mainHtml = main?.innerHTML || '';

	const add = (key, ok, pts, note) => {
		report.max += WEIGHTS[key];
		if (ok) report.score += pts;
		else report.details.push(`${key}: ${note}`);
	};

	const title = (root.querySelector('title')?.text || '').trim();
	const desc = root.querySelector('meta[name="description"]')?.getAttribute('content') || '';
	const canon = root.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
	const canonNorm = canon.replace(site, '');
	const pathUrl = '/' + relPath.replace(/index\.html$/, '');
	const h1s = root.querySelectorAll('h1');
	const noindex = /<meta[^>]+noindex/i.test(head);

	const seoOk =
		title.length >= 30 &&
		title.length <= 65 &&
		desc.length >= 145 &&
		desc.length <= 160 &&
		h1s.length === 1 &&
		(canon.includes(pathUrl.replace(/\/$/, '')) || canonNorm.includes(pathUrl.replace(/\/$/, ''))) &&
		!noindex &&
		/"@type"\s*:\s*"Brand"/i.test(raw) &&
		/"@type"\s*:\s*"ItemList"/i.test(raw) &&
		/"@type"\s*:\s*"FAQPage"/i.test(raw);
	add('seo', seoOk, seoOk ? WEIGHTS.seo : 0, `title=${title.length}, meta=${desc.length}, h1=${h1s.length}`);

	const internalLinks = new Set();
	for (const a of main.querySelectorAll('a[href^="/"]')) {
		const h = a.getAttribute('href') || '';
		if (!h.startsWith('/go/')) internalLinks.add(h.split('#')[0]);
	}
	add('maillage', internalLinks.size >= 5, internalLinks.size >= 5 ? WEIGHTS.maillage : 0, `liens=${internalLinks.size}`);

	const words = wordCount(mainHtml);
	const h2 = main.querySelectorAll('h2').length;
	const depthOk = words >= 700 && h2 >= 6;
	add('depth', depthOk, depthOk ? WEIGHTS.depth : Math.round(WEIGHTS.depth * Math.min(1, words / 700) * 0.85), `mots=${words}, h2=${h2}`);

	const imgs = main.querySelectorAll('img');
	let imgOk = imgs.length >= 3;
	for (const img of imgs) {
		const alt = img.getAttribute('alt');
		const w = img.getAttribute('width');
		const h = img.getAttribute('height');
		if (!alt || !w || !h) imgOk = false;
	}
	add('images', imgOk, imgOk ? WEIGHTS.images : 0, `images=${imgs.length}`);

	const goOrAmazon = [...main.querySelectorAll('a')].filter(
		(a) => /rel=.*sponsored/i.test(a.rawAttrs || '') || (a.getAttribute('href') || '').startsWith('/go/'),
	);
	const hasTable = main.querySelectorAll('table').length >= 1;
	const affOk = goOrAmazon.length >= 1 && hasTable;
	add('affiliation', affOk, affOk ? WEIGHTS.affiliation : 0, `go/sponsored=${goOrAmazon.length}`);

	const toc = main.querySelector('.article-toc');
	const faqVisible = main.querySelectorAll('h2, h3').length >= 8;
	const structOk = Boolean(toc) && hasTable && faqVisible;
	add('structure', structOk, structOk ? WEIGHTS.structure : 0, `toc=${!!toc}, tables=${main.querySelectorAll('table').length}`);

	const freshOk = /mis à jour|last updated|aktualisiert|aggiornato|actualizado|bijgewerkt/i.test(mainHtml) && /dateModified/i.test(raw);
	add('freshness', freshOk, freshOk ? WEIGHTS.freshness : 0, `date visible + JSON-LD`);

	const visibleText = main.text.replace(/\s+/g, ' ');
	const bad = /TODO|photo à fournir|à compléter par Manu|\bManu\b/i.test(visibleText);
	add('reliability', !bad, !bad ? WEIGHTS.reliability : 0, bad ? 'texte interne' : 'ok');

	const intro = main.querySelector('p')?.text || '';
	const intentOk =
		/LEGO Education/i.test(title) &&
		/LEGO Education/i.test(h1s[0]?.text || '') &&
		/LEGO Education/i.test(intro.slice(0, 400));
	add('intention', intentOk, intentOk ? WEIGHTS.intention : 0, 'title/h1/intro');

	const need = ['fr', 'en', 'en-GB', 'en-CA', 'de', 'it', 'es', 'nl', 'x-default'];
	const hreflangs = [...root.querySelectorAll('link[rel="alternate"][hreflang]')].map((l) => ({
		hl: l.getAttribute('hreflang'),
		href: l.getAttribute('href') || '',
	}));
	const selfHl =
		lang === 'uk' ? 'en-GB' : lang === 'ca' ? 'en-CA' : lang === 'en' ? 'en' : lang;
	const hasSelf = hreflangs.some((x) => x.hl === selfHl && x.href.includes(pathUrl.replace(/^\//, '').replace(/\/$/, '')));
	const hasAll = need.every((hl) => hreflangs.some((x) => x.hl === hl));
	const hrefOk = hasSelf && hasAll && hreflangs.length >= 8;
	add('hreflang', hrefOk, hrefOk ? WEIGHTS.hreflang : 0, `tags=${hreflangs.length}, self=${hasSelf}`);

	report.pct = report.max ? Math.round((report.score / report.max) * 100) : 0;
	report.words = words;
	report.images = imgs.length;
	report.internalLinks = internalLinks.size;
	report.tables = main.querySelectorAll('table').length;
	report.toc = Boolean(toc);
	report.faq = /FAQ/i.test(mainHtml) && /"@type":"FAQPage"/.test(raw.replace(/\s/g, ''));
	return report;
}

const results = Object.entries(PAGES).map(([lang, p]) => scorePage(lang, p));
console.log(JSON.stringify(results, null, 2));
const fails = results.filter((r) => r.pct < 90 || r.missing.length);
process.exit(fails.length ? 1 : 0);