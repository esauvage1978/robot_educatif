#!/usr/bin/env node
/**
 * Duplique dist/en → dist/uk et dist/ca (pages HTML + assets relatifs).
 * Corrige canonical / og:url / hreflang self vers le marché cible.
 * Sans cette étape, le sitemap et le sélecteur UK/CA pointent vers des 404.
 */
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import {
	buildSearchAsinIndex,
	isGenericPythonBookQuery,
	resolveSearchQuery,
} from './lib/amazon-search-resolve.mjs';

const SEARCH_INDEX = buildSearchAsinIndex();

/**
 * Pages UK/CA déjà construites par Astro : ne pas les écraser par la copie anglaise.
 * Ajouter ici tout slug dont la variante EN/UK/CA est différenciée dans src/pages/{uk,ca}/.
 */
const KEEP_IF_PRESENT = new Set([
	'black-friday/index.html',
	'black-friday.html',
	'index.html',
	'search/index.html',
	'educational-robot-christmas-gifts-2026/index.html',
	'best-programmable-robot-for-kids/index.html',
	'smart-home/esp32-smart-home-project-ideas/index.html',
	'smart-home/gmktec-m6-ultra-home-assistant-server/index.html',
]);

const dist = process.argv[2] || 'dist';
const enRoot = join(dist, 'en');
if (!existsSync(enRoot)) {
	console.warn('[mirror-en-to-uk-ca] pas de dist/en — ignoré');
	process.exit(0);
}

function walkHtml(dir, out = []) {
	for (const name of readdirSync(dir)) {
		const p = join(dir, name);
		if (statSync(p).isDirectory()) walkHtml(p, out);
		else if (name.endsWith('.html')) out.push(p);
	}
	return out;
}

function copyEn(src, dest) {
	mkdirSync(dest, { recursive: true });
	for (const name of readdirSync(src)) {
		const from = join(src, name);
		const to = join(dest, name);
		if (statSync(from).isDirectory()) {
			copyEn(from, to);
			continue;
		}
		const rel = relative(dest, to).replaceAll('\\', '/');
		if (KEEP_IF_PRESENT.has(rel) && existsSync(to)) continue;
		cpSync(from, to);
	}
}

const MARKET_AMAZON = {
	uk: { lang: 'en-GB', host: 'www.amazon.co.uk', tag: 'roboteducatif-21' },
	ca: { lang: 'en-CA', host: 'www.amazon.ca', tag: 'roboteducat03-20' },
};

const EU_AMAZON_HOST =
	/(?:www\.)?amazon\.(?:co\.uk|ca|com|fr|de|it|es|nl)(?![.\w-])/gi;
const AFFILIATE_TAGS =
	/\b(?:roboteducatif-2[01]|roboteducat03-20|manuso06-21|manuso0607-21|roboteducat00-21|roboteducat0f-21|roboteducat07-21)\b/g;

/** Liens Amazon du miroir : boutique et tag du marché, y compris dans les attributs data-*. */
function retargetAmazonAttrs(html, market) {
	const { host, tag } = MARKET_AMAZON[market];
	return html.replace(/=\s*(["'])([^"']*amazon\.[^"']*)\1/gi, (full, q, url) => {
		const next = url
			.replace(EU_AMAZON_HOST, (m) =>
				m.toLowerCase().startsWith('www.') ? host : host.replace(/^www\./, ''),
			)
			.replace(AFFILIATE_TAGS, tag)
			.replace(/#x26;tag=[^#&'"]*/gi, '');
		return `=${q}${next}${q}`;
	});
}

function mirror(market) {
	const dest = join(dist, market);
	mkdirSync(dest, { recursive: true });
	copyEn(enRoot, dest);
	const files = walkHtml(dest);
	let n = 0;
	const { lang } = MARKET_AMAZON[market];
	for (const file of files) {
		let html = readFileSync(file, 'utf8');
		const before = html;
		html = html
			.replaceAll('https://robot-educatif.info/en/', `https://robot-educatif.info/${market}/`)
			.replaceAll('href="/en/', `href="/${market}/`)
			.replaceAll("href='/en/", `href='/${market}/`)
			.replaceAll('content="/en/', `content="/${market}/`);
		html = html.replace(/<link\b[^>]*>/gi, (tag) => {
			if (!/\bhreflang\s*=\s*["']en["']/i.test(tag)) return tag;
			return tag
				.replaceAll(`https://robot-educatif.info/${market}/`, 'https://robot-educatif.info/en/')
				.replaceAll(`href="/${market}/`, 'href="/en/')
				.replaceAll(`href='/${market}/`, "href='/en/");
		});
		html = html.replace(/<html\b([^>]*)\blang="en(?:-[A-Za-z]+)?"/i, `<html$1lang="${lang}"`);
		html = html.replace(/("inLanguage"\s*:\s*")en(?:-[A-Za-z]+)?"/g, `$1${lang}"`);
		// og:locale
		if (market === 'uk') {
			html = html.replace(/og:locale" content="en_US"/g, 'og:locale" content="en_GB"');
			html = html.replace(/og:locale" content="en_CA"/g, 'og:locale" content="en_GB"');
		} else if (market === 'ca') {
			html = html.replace(/og:locale" content="en_US"/g, 'og:locale" content="en_CA"');
			html = html.replace(/og:locale" content="en_GB"/g, 'og:locale" content="en_CA"');
			// Pas de relevé Amazon.ca : ne pas recopier le prix amazon.co.uk comme prix canadien.
			html = html.replace(
				/<(p|span|td|b)\b([^>]*\sdata-amazon-price="1"[^>]*)>[\s\S]*?<\/\1>/gi,
				'<$1$2>See today\'s price</$1>',
			);
			html = html.replace(/<p\b([^>]*\sdata-amazon-note="uk"[^>]*)>[\s\S]*?<\/p>/gi, '');
			html = html.replace(/<a\b([^>]*?)>/gi, (full, attrs) => {
				if (!/amazon\.co\.uk/i.test(attrs)) return full;
				const q = /data-amazon-query="([^"]*)"/.exec(attrs);
				if (!q || isGenericPythonBookQuery(q[1])) return full;
				const asin = resolveSearchQuery(q[1], SEARCH_INDEX);
				if (!asin) return full;
				const href = `https://www.amazon.ca/dp/${encodeURIComponent(asin)}?tag=roboteducat03-20`;
				return `<a${attrs.replace(/href="[^"]*"/, `href="${href}"`)}>`;
			});
		}
		html = retargetAmazonAttrs(html, market);
		const amazonShop = market === 'uk' ? 'Amazon.co.uk' : 'Amazon.ca';
		html = html
			.replace(/Amazon\.com(?![.\w-])/g, amazonShop)
			.replace(/UK shoppers on Amazon\.co\.uk/gi, 'UK shoppers')
			.replace(/UK shoppers on Amazon\.com/gi, 'UK shoppers')
			.replace(/Live Amazon\.com prices/gi, `Live ${amazonShop} prices`)
			.replace(/Amazon\.com is the default shop/gi, `${amazonShop} is the default shop`)
			.replace(/on Amazon\.com/gi, `on ${amazonShop}`)
			.replace(/Amazon\.com ·/g, `${amazonShop} ·`)
			.replace(/Check price on Amazon\.com/gi, `Check price on ${amazonShop}`)
			.replace(/Search on Amazon\.com/gi, `Search on ${amazonShop}`)
			.replace(/(?:about|around)\s*€[\d.,\s–-]+/gi, 'check today’s price on ' + amazonShop)
			.replace(
				/<code>amazon\.com<\/code>/gi,
				`<code>${market === 'uk' ? 'amazon.co.uk' : 'amazon.ca'}</code>`,
			)
			.replace(/https:\/\/www\.amazon\.com\//gi, `https://www.${MARKET_AMAZON[market].host}/`)
			.replace(/\blisting on Amazon\.co\.uk showed/gi, `listing on ${amazonShop} showed`)
			.replace(/(?<!media-)\bamazon\.com\b/gi, market === 'uk' ? 'amazon.co.uk' : 'amazon.ca'); // ne pas toucher m.media-amazon.com (CDN d'images, seul hôte valide)
		if (html !== before) {
			writeFileSync(file, html);
			n++;
		}
	}
	console.log(`[mirror-en-to-uk-ca] ${market}: ${files.length} html, ${n} patched (${relative(process.cwd(), dest)})`);
}

mirror('uk');
mirror('ca');
