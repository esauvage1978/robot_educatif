#!/usr/bin/env node
/**
 * Duplique dist/en → dist/uk et dist/ca (pages HTML + assets relatifs).
 * Corrige canonical / og:url / hreflang self vers le marché cible.
 * Sans cette étape, le sitemap et le sélecteur UK/CA pointent vers des 404.
 */
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

/** Pages UK/CA déjà construites par Astro : ne pas les écraser par la copie anglaise. */
const KEEP_IF_PRESENT = new Set(['black-friday/index.html', 'black-friday.html', 'index.html']);

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

function mirror(market) {
	const dest = join(dist, market);
	mkdirSync(dest, { recursive: true });
	copyEn(enRoot, dest);
	const files = walkHtml(dest);
	let n = 0;
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
				if (!q) return full;
				const href = `https://www.amazon.ca/s?k=${encodeURIComponent(q[1])}&tag=roboteducat03-20`;
				return `<a${attrs.replace(/href="[^"]*"/, `href="${href}"`)}>`;
			});
		}
		if (html !== before) {
			writeFileSync(file, html);
			n++;
		}
	}
	console.log(`[mirror-en-to-uk-ca] ${market}: ${files.length} html, ${n} patched (${relative(process.cwd(), dest)})`);
}

mirror('uk');
mirror('ca');
