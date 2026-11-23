#!/usr/bin/env node
/**
 * Prépare le dist pour Pagefind : corps indexable, zones ignorées, image résultat (og / hero).
 */
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import * as cheerio from 'cheerio';
import { isSearchPagePath } from '../src/lib/siteSearch.mjs';

const dist = process.argv[2] || 'dist';

const SKIP_PATH_PARTS = [
	'/stats-articles-interne',
	'/gestion-des-cookies',
	'/go/',
	'/404',
];

/** Sélecteurs exclus du corps de recherche (chrome du site). */
const IGNORE_SELECTORS = [
	'header.site-header',
	'footer',
	'#cookie-consent-banner',
	'#site-search-dialog',
	'.mobile-menu',
	'.guide-sidebar',
	'[data-guide-sidebar]',
	'.article-byline',
	'.editorial-read-also',
	'.christmas-banner',
	'#pr-widget',
	'.pr-widget',
	'.share-buttons',
	'.follow-block',
	'.hero-article-toolbar',
	'.pinterest-hero-button',
	'.article-question-form',
	'.page-rating',
	'.site-search-dialog',
];

function walkHtml(dir, out = []) {
	if (!existsSync(dir)) return out;
	for (const name of readdirSync(dir)) {
		const p = join(dir, name);
		if (statSync(p).isDirectory()) walkHtml(p, out);
		else if (name.endsWith('.html')) out.push(p);
	}
	return out;
}

function relUrlPath(file) {
	const rel = relative(dist, file).replace(/\\/g, '/');
	const noIndex = rel.replace(/index\.html$/, '');
	return `/${noIndex}`.replace(/\/+/g, '/');
}

function normalizeSrc(src) {
	if (!src) return '';
	try {
		return new URL(src, 'https://robot-educatif.info').pathname;
	} catch {
		return src.split('?')[0];
	}
}

function isAuthorOrDecorativeSrc(src) {
	const p = normalizeSrc(src).toLowerCase();
	return (
		/authors\/emmanuel/.test(p) ||
		/blog-placeholder/.test(p) ||
		/logo-a\.svg/.test(p) ||
		/favicon/.test(p) ||
		/pin-logo/.test(p)
	);
}

function patchHtml(raw, urlPath) {
	if (isSearchPagePath(urlPath)) return raw;

	const $ = cheerio.load(raw, { decodeEntities: false });

	IGNORE_SELECTORS.forEach((sel) => {
		$(sel).attr('data-pagefind-ignore', 'all');
	});

	$('nav[aria-label]').each((_, el) => {
		const $el = $(el);
		if ($el.closest('header, footer, .guide-sidebar, .mobile-menu').length) {
			$el.attr('data-pagefind-ignore', 'all');
		}
	});

	const $main = $('main').first();
	if (!$main.length) return $.html();

	$main.attr('data-pagefind-body', '');

	const ogImage = $('meta[property="og:image"]').attr('content')?.trim() || '';
	const ogPath = normalizeSrc(ogImage);

	let imageEl = null;
	if (ogPath && !isAuthorOrDecorativeSrc(ogImage)) {
		$main.find('img').each((_, img) => {
			const src = $(img).attr('src') || '';
			if (isAuthorOrDecorativeSrc(src)) return;
			if (normalizeSrc(src) === ogPath || src === ogImage) {
				imageEl = $(img);
				return false;
			}
		});
	}

	if (!imageEl?.length) {
		imageEl = $main
			.find('.hero-article-media img, .hero img, article img, .prose img')
			.filter((_, img) => !isAuthorOrDecorativeSrc($(img).attr('src') || ''))
			.first();
	}

	if (imageEl?.length) {
		imageEl.attr('data-pagefind-meta', 'image');
	} else if (ogPath && !isAuthorOrDecorativeSrc(ogImage)) {
		$main.prepend(
			`<img data-pagefind-meta="image" src="${ogImage.replace(/"/g, '&quot;')}" alt="" width="1" height="1" style="position:absolute;width:1px;height:1px;opacity:0;pointer-events:none;margin:0" aria-hidden="true" />`,
		);
	}

	$main.find('.article-byline img').attr('data-pagefind-ignore', 'all');

	return $.html();
}

let touched = 0;
let skipped = 0;

for (const file of walkHtml(dist)) {
	const urlPath = relUrlPath(file);
	if (SKIP_PATH_PARTS.some((part) => urlPath.includes(part))) {
		skipped++;
		continue;
	}
	if (isSearchPagePath(urlPath)) {
		skipped++;
		continue;
	}
	const before = readFileSync(file, 'utf8');
	const after = patchHtml(before, urlPath);
	if (after !== before) {
		writeFileSync(file, after);
		touched++;
	}
}

console.log(`[prepare-pagefind-index-dist] ${touched} fichier(s) patchés, ${skipped} ignorés`);