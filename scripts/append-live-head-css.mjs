#!/usr/bin/env node
/** Accueils + hub Noël : ajoute le CSS inline prod (head) + noel-class-bridge si sous-dimensionné. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(process.argv[2] ?? path.join(__dirname, '../dist'));
const SITE = 'https://robot-educatif.info';
const bridge = fs.readFileSync(path.join(__dirname, 'fragments/noel-class-bridge.css'), 'utf8');

const PAGES = [
	{ rel: 'index.html', live: '/' },
	{ rel: 'en/index.html', live: '/en/' },
	{ rel: 'de/index.html', live: '/de/' },
	{ rel: 'it/index.html', live: '/it/' },
	{ rel: 'es/index.html', live: '/es/' },
	{ rel: 'uk/index.html', live: '/uk/' },
	{ rel: 'ca/index.html', live: '/ca/' },
	{ rel: 'us/index.html', live: '/us/' },
	{ rel: 'categorie/noel/index.html', live: '/categorie/noel/' },
];

function headStyleLen(html) {
	const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
	const chunk = head ? head[1] : html;
	const re = /<style[^>]*>([\s\S]*?)<\/style>/gi;
	let n = 0;
	let m;
	while ((m = re.exec(chunk))) n += m[0].length;
	return n;
}

function extractHeadStyles(html) {
	const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
	const chunk = head ? head[1] : html;
	const re = /<style[^>]*>([\s\S]*?)<\/style>/gi;
	const blocks = [];
	let m;
	while ((m = re.exec(chunk))) blocks.push(m[0]);
	return blocks;
}

async function fetchLive(pathname) {
	const url = `${SITE}${pathname.endsWith('/') ? pathname : `${pathname}/`}`;
	const res = await fetch(url, { headers: { 'User-Agent': 'AppendLiveCss/1.0' } });
	if (!res.ok) throw new Error(`${url} HTTP ${res.status}`);
	return res.text();
}

function injectAfterCharset(html, inject) {
	if (html.includes('data-live-head-append="1"')) {
		return html.replace(/<style data-live-head-append="1"[^>]*>[\s\S]*?<\/style>/gi, '').replace(
			/(<meta charset="utf-8"\s*\/?>)/i,
			`$1${inject}`,
		);
	}
	return html.replace(/<head([^>]*)>([\s\S]*?)<\/head>/i, (full, attrs, inner) => {
		const anchor = /<meta charset="utf-8"\s*\/?>/i;
		const h = anchor.test(inner) ? inner.replace(anchor, (a) => `${a}${inject}`) : inject + inner;
		return `<head${attrs}>${h}</head>`;
	});
}

async function main() {
	for (const { rel, live } of PAGES) {
		const file = path.join(distDir, rel);
		if (!fs.existsSync(file)) continue;
		const distHtml = fs.readFileSync(file, 'utf8');
		let liveHtml;
		try {
			liveHtml = await fetchLive(live);
		} catch (e) {
			console.warn('[append-live]', rel, e.message);
			continue;
		}
		const liveLen = headStyleLen(liveHtml);
		const distLen = headStyleLen(distHtml);
		if (distLen >= liveLen && distHtml.includes('noel-class-bridge') && !extractHeadStyles(distHtml).some((b) => b.includes('christmas-banner-inner'))) {
			/* bridge already covers christmas-* */
		}
		if (distLen >= liveLen && distHtml.includes('data-live-head-append="1"')) {
			console.log(`[append-live] ${rel}: skip (${distLen} >= ${liveLen})`);
			continue;
		}
		const liveBlocks = extractHeadStyles(liveHtml)
			.map((tag) => tag.replace(/^<style/i, '<style data-live-head-append="1"'))
			.join('');
		const bridgeBlock = distHtml.includes('christmas-banner-inner')
			? ''
			: `<style data-build-extra="comparison-table">${bridge}</style>`;
		const inject = liveBlocks + bridgeBlock;
		const next = injectAfterCharset(distHtml, inject);
		if (next !== distHtml) {
			fs.writeFileSync(file, next, 'utf8');
			console.log(`[append-live] ${rel}: ${distLen} → ${headStyleLen(next)} (live ${liveLen})`);
		}
	}
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
