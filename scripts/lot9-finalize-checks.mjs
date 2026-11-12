#!/usr/bin/env node
/**
 * Contrôle visuel Playwright + maillage interne — lot 9 réécriture90.
 * Usage: node scripts/lot9-finalize-checks.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http';
import { chromium } from 'playwright';
import * as cheerio from 'cheerio';

const PORT = 8766;
const baseUrl = `http://127.0.0.1:${PORT}`;
const NON_BLOCKING_JS = /Failed to fetch|Unexpected token '<'|NetworkError|Load failed|rating_api|googletagmanager/i;

function mime(filePath) {
	if (filePath.endsWith('.html')) return 'text/html; charset=utf-8';
	if (filePath.endsWith('.webp')) return 'image/webp';
	if (filePath.endsWith('.png')) return 'image/png';
	if (filePath.endsWith('.svg')) return 'image/svg+xml';
	if (filePath.endsWith('.css')) return 'text/css';
	if (filePath.endsWith('.js')) return 'application/javascript';
	if (filePath.endsWith('.woff2')) return 'font/woff2';
	return 'application/octet-stream';
}

function startStaticServer() {
	return new Promise((resolve) => {
		const server = createServer((req, res) => {
			let p = decodeURIComponent(req.url?.split('?')[0] || '/');
			if (p.endsWith('/')) p += 'index.html';
			const filePath = path.join(dist, p.replace(/^\//, '').replace(/\//g, path.sep));
			if (!filePath.startsWith(dist) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
				res.writeHead(404);
				res.end('Not found');
				return;
			}
			const buf = fs.readFileSync(filePath);
			res.writeHead(200, { 'Content-Type': mime(filePath) });
			res.end(buf);
		});
		server.listen(PORT, '127.0.0.1', () => resolve(server));
	});
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const capturesDir = path.join(root, '_reecriture_lot9', 'captures');
const listFile = path.join(root, 'REECRITURE90_LOT9_DIST_PATHS.txt');

const pages = fs
	.readFileSync(listFile, 'utf8')
	.split(/\r?\n/)
	.map((l) => l.trim())
	.filter((l) => l.endsWith('index.html'))
	.map((l) => {
		const rel = l.replace(/^dist\//, '').replace(/index\.html$/, '');
		const urlPath = '/' + rel;
		return { rel, urlPath, file: path.join(dist, rel, 'index.html') };
	});

fs.mkdirSync(capturesDir, { recursive: true });

function countInternalLinksInProse(html, urlPath) {
	const $ = cheerio.load(html);
	const prose = $('article .prose').first();
	if (!prose.length) {
		const alt = $('.prose').first();
		if (!alt.length) return { count: 0, note: 'prose absent' };
		return countLinks($, alt, urlPath);
	}
	return countLinks($, prose, urlPath);
}

function countLinks($, el, urlPath) {
	const links = new Set();
	el.find('a[href]').each((_, a) => {
		let h = $(a).attr('href') || '';
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
		links.add(h.endsWith('/') ? h : h + '/');
	});
	return { count: links.size, note: '' };
}

const maillageLines = [
	'# Maillage interne (corps `.prose`) — lot 9',
	'',
	'Seuil bloquant : **&lt; 3** liens internes éditoriaux (hors `/go/`).',
	'',
	'| URL | Liens | Statut |',
	'|-----|------:|--------|',
];

for (const p of pages) {
	if (!fs.existsSync(p.file)) {
		maillageLines.push(`| ${p.urlPath} | — | **ABSENT dist** |`);
		continue;
	}
	const html = fs.readFileSync(p.file, 'utf8');
	const { count, note } = countInternalLinksInProse(html, p.urlPath);
	const ok = count >= 3;
	maillageLines.push(`| ${p.urlPath} | ${count} | ${ok ? 'OK' : `**KO** ${note}`} |`);
}

fs.writeFileSync(path.join(root, '_reecriture_lot9', 'MAILLAGE.md'), maillageLines.join('\n') + '\n');

const viewports = [
	{ tag: 'mobile', width: 390, height: 844 },
	{ tag: 'desktop', width: 1366, height: 900 },
];

const visuelRows = [];
let browser;
let server;
try {
	server = await startStaticServer();
	browser = await chromium.launch({ headless: true });
	for (const p of pages) {
		const checks = {
			hero: false,
			images: true,
			menuMobile: true,
			overflow: true,
			scripts: true,
		};
		const errors = [];
		if (!fs.existsSync(p.file)) {
			visuelRows.push({ path: p.urlPath, status: 'KO', detail: 'fichier dist absent' });
			continue;
		}
		const fileUrl = `${baseUrl}${p.urlPath}`;
		for (const vp of viewports) {
			const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
			const page = await context.newPage();
			const pageErrors = [];
			page.on('pageerror', (e) => {
				if (!NON_BLOCKING_JS.test(e.message)) pageErrors.push(e.message);
			});
			await page.goto(fileUrl, { waitUntil: 'load', timeout: 60000 });
			await page.evaluate(async () => {
				document.querySelectorAll('img').forEach((img) => {
					img.loading = 'eager';
				});
				window.scrollTo(0, document.body.scrollHeight);
				await new Promise((r) => setTimeout(r, 400));
				window.scrollTo(0, 0);
				await Promise.all([...document.images].map((i) => i.decode?.().catch(() => {})));
			});
			await page.waitForTimeout(300);
			const slug = p.urlPath.replace(/\//g, '_').replace(/^_|_$/g, '') || 'root';
			await page.screenshot({
				path: path.join(capturesDir, `${slug}--${vp.tag}.png`),
				fullPage: false,
			});
			const metrics = await page.evaluate(() => {
				const heroImg = document.querySelector('.hero-article-media img, .hero-article img, article .prose img, .prose img');
				const imgs = [...document.querySelectorAll('img')];
				const broken = imgs.filter((i) => {
					const src = i.currentSrc || i.src || i.getAttribute('src') || '';
					if (/^data:/.test(src)) return false;
					if (/\.svg(\?|$)/i.test(src) && i.complete) return false;
					return !i.complete || i.naturalWidth === 0;
				}).map((i) => i.src || i.getAttribute('src'));
				const overflow = document.documentElement.scrollWidth > document.documentElement.clientWidth + 2;
				return {
					hasHero: Boolean(heroImg && heroImg.naturalWidth > 0),
					broken,
					overflow,
				};
			});
			if (metrics.hasHero) checks.hero = true;
			if (metrics.broken.length) {
				checks.images = false;
				errors.push(`images:${vp.tag} ${metrics.broken.slice(0, 2).join(', ')}`);
			}
			if (metrics.overflow) {
				checks.overflow = false;
				errors.push(`overflow:${vp.tag}`);
			}
			if (vp.tag === 'mobile') {
				const toggle = page.locator('#mobile-menu-toggle');
				if ((await toggle.count()) > 0) {
					await toggle.click();
					await page.waitForTimeout(350);
					const open = await page.locator('#mobile-menu[aria-hidden="false"]').count();
					if (open === 0) {
						checks.menuMobile = false;
						errors.push('menu-mobile');
					}
				}
			}
			if (pageErrors.length) {
				checks.scripts = false;
				errors.push(`js:${pageErrors[0].slice(0, 80)}`);
			}
			await context.close();
		}
		const ok = checks.hero && checks.images && checks.menuMobile && checks.overflow && checks.scripts;
		visuelRows.push({
			path: p.urlPath,
			status: ok ? 'OK' : 'KO',
			detail: ok ? 'hero, images, menu mobile, pas de débordement' : [...new Set(errors)].join('; '),
		});
	}
} finally {
	if (browser) await browser.close();
	if (server) await new Promise((r) => server.close(r));
}

const visuelMd = [
	'# Contrôle visuel headless — lot 9',
	'',
	`Playwright, serveur statique local (\`http://127.0.0.1:${PORT}/\` → \`dist/\`), viewports 390×844 et 1366×900.`,
	'Captures : `_reecriture_lot9/captures/`',
	'',
	'| URL | Résultat | Détail |',
	'|-----|:--------:|--------|',
	...visuelRows.map((r) => `| ${r.path} | **${r.status}** | ${r.detail} |`),
	'',
].join('\n');

fs.writeFileSync(path.join(root, '_reecriture_lot9', 'VISUEL.md'), visuelMd);

const koMaillage = maillageLines.filter((l) => l.includes('**KO**')).length;
const koVisuel = visuelRows.filter((r) => r.status === 'KO').length;
console.log(`[lot9-checks] maillage KO=${koMaillage}, visuel KO=${koVisuel}, pages=${pages.length}`);
process.exit(koMaillage || koVisuel ? 1 : 0);
