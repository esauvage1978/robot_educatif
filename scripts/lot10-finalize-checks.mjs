#!/usr/bin/env node
/**
 * Contrôle visuel Playwright + maillage interne — lot 10 réécriture90.
 * Usage: node scripts/lot10-finalize-checks.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http';
import { chromium } from 'playwright';
import * as cheerio from 'cheerio';

const PORT = 8767;
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
const capturesDir = path.join(root, '_reecriture_lot10', 'captures');
const listFile = path.join(root, 'REECRITURE90_LOT10_DIST_PATHS.txt');

/** Pilier(s) attendus dans `.prose` (au moins un). */
const PILLARS = {
	'/python-puissance-4-1-cahier-grille/': ['/programmation/puissance-4/', '/programmation/python/'],
	'/en/python-connect-four-1-grid-setup/': ['/en/python-connect-four-6-complete-game/', '/programmation/puissance-4/'],
	'/de/python-vier-gewinnt-1-gitter/': ['/de/python-vier-gewinnt-6-komplettspiel/', '/programmation/puissance-4/'],
	'/it/python-forza-4-1-griglia/': ['/it/python-forza-4-6-gioco-completo/', '/programmation/puissance-4/'],
	'/es/python-conecta-4-1-cuadricula/': ['/es/python-conecta-4-6-juego-completo/', '/programmation/puissance-4/'],
	'/robot-moins-de-100-euros/': ['/meilleur-robot-programmable-enfant-2026/'],
	'/en/educational-robot-under-100/': ['/en/best-programmable-robot-for-kids/'],
	'/de/lernroboter-unter-100-euro/': ['/de/bester-programmierbarer-roboter-fuer-kinder/'],
	'/it/robot-educativo-sotto-100-euro/': ['/it/miglior-robot-programmabile-per-bambini/'],
	'/es/robot-educativo-menos-de-100-euros/': ['/es/mejor-robot-programable-para-ninos/'],
	'/installer-les-blocs-du-mbot/': ['/telecharger-mblock-5-gratuit-guide-2026/', '/mon-premier-programme-mbot/'],
	'/en/install-mbot-blocks/': ['/en/download-mblock-5-free/', '/en/first-mbot-program/'],
	'/de/mbot-bloecke-installieren/': ['/de/mblock-5-kostenlos-herunterladen/', '/de/erstes-mbot-programm/'],
	'/it/installare-blocchi-mbot/': ['/it/scaricare-mblock-5-gratis/', '/it/primo-programma-mbot/'],
	'/es/instalar-bloques-mbot/': ['/es/descargar-mblock-5-gratis/', '/es/primer-programa-mbot/'],
	'/programmation-enfant-a-quel-age-commencer/': ['/meilleur-robot-programmable-enfant-2026/', '/programmation/'],
	'/en/when-to-start-coding-with-kids/': ['/en/best-programmable-robot-for-kids/'],
	'/de/ab-welchem-alter-programmieren-kinder/': ['/de/bester-programmierbarer-roboter-fuer-kinder/'],
	'/it/a-che-eta-iniziare-programmazione-bambini/': ['/it/miglior-robot-programmabile-per-bambini/'],
	'/es/a-que-edad-empezar-programacion-ninos/': ['/es/mejor-robot-programable-para-ninos/'],
	'/python-conditions-if-else/': ['/programmation/python/'],
	'/en/python-conditions-if-else/': ['/en/python-types-and-input/', '/programmation/python/'],
	'/de/python-bedingungen-if-else/': ['/de/python-typen-und-eingabe/', '/programmation/python/'],
	'/it/python-condizioni-if-else/': ['/it/python-tipi-e-input/', '/programmation/python/'],
	'/es/python-condiciones-if-else/': ['/es/python-tipos-y-entrada/', '/programmation/python/'],
	'/quel-robot-acheter-enfant-5-ans-guide-achat/': ['/meilleur-robot-programmable-enfant-2026/'],
	'/en/best-robot-for-a-5-year-old/': ['/en/best-programmable-robot-for-kids/'],
	'/de/lernroboter-5-jahre/': ['/de/bester-programmierbarer-roboter-fuer-kinder/'],
	'/it/robot-programmabile-5-anni/': ['/it/miglior-robot-programmabile-per-bambini/'],
	'/es/robot-programable-5-anos/': ['/es/mejor-robot-programable-para-ninos/'],
	'/scratch-ecole-maison-par-ou-commencer/': ['/programmation/', '/mblock-vs-scratch-lequel-choisir/'],
	'/en/scratch-school-home-getting-started/': ['/en/mblock-vs-scratch/', '/en/best-programmable-robot-for-kids/'],
	'/de/scratch-schule-zuhause-einstieg/': ['/de/mblock-vs-scratch/', '/de/bester-programmierbarer-roboter-fuer-kinder/'],
	'/it/scratch-scuola-casa-inizio/': ['/it/mblock-vs-scratch/', '/it/miglior-robot-programmabile-per-bambini/'],
	'/es/scratch-escuela-casa-empezar/': ['/es/mblock-vs-scratch/', '/es/mejor-robot-programable-para-ninos/'],
	'/raspberry-pi-4-quelle-version-memoire-acheter/': ['/raspberry-pi-3-vs-4-vs-5-comparatif-2026/'],
	'/en/raspberry-pi-4-which-ram/': ['/en/raspberry-pi-3-vs-4-vs-5/'],
	'/de/raspberry-pi-4-welcher-ram/': ['/de/raspberry-pi-3-vs-4-vs-5/'],
	'/it/raspberry-pi-4-quale-ram/': ['/it/raspberry-pi-3-vs-4-vs-5/'],
	'/es/raspberry-pi-4-que-ram/': ['/es/raspberry-pi-3-vs-4-vs-5/'],
	'/python-puissance-4-6-jeu-complet/': ['/programmation/puissance-4/', '/programmation/python/'],
	'/en/python-connect-four-6-complete-game/': ['/en/python-connect-four-1-grid-setup/', '/programmation/puissance-4/'],
	'/de/python-vier-gewinnt-6-komplettspiel/': ['/de/python-vier-gewinnt-1-gitter/', '/programmation/puissance-4/'],
	'/it/python-forza-4-6-gioco-completo/': ['/it/python-forza-4-1-griglia/', '/programmation/puissance-4/'],
	'/es/python-conecta-4-6-juego-completo/': ['/es/python-conecta-4-1-cuadricula/', '/programmation/puissance-4/'],
	'/installer-mblock-5-sous-windows-10/': ['/telecharger-mblock-5-gratuit-guide-2026/'],
	'/en/install-mblock-5-windows/': ['/en/download-mblock-5-free/'],
	'/de/mblock-5-installieren-windows/': ['/de/mblock-5-kostenlos-herunterladen/'],
	'/it/installare-mblock-5-windows/': ['/it/scaricare-mblock-5-gratis/'],
	'/es/instalar-mblock-5-windows/': ['/es/descargar-mblock-5-gratis/'],
};

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

function normPath(h) {
	if (!h || h.startsWith('#') || /^mailto:|^tel:|^javascript:/i.test(h)) return null;
	if (h.startsWith('http')) {
		try {
			const u = new URL(h);
			if (u.hostname.replace(/^www\./, '') !== 'robot-educatif.info') return null;
			h = u.pathname;
		} catch {
			return null;
		}
	}
	if (!h.startsWith('/')) return null;
	return h.endsWith('/') ? h : h + '/';
}

function proseHtml(html) {
	const $ = cheerio.load(html);
	const prose = $('article .prose').first();
	if (prose.length) return prose.html() || '';
	const alt = $('.prose').first();
	return alt.html() || '';
}

function countInternalLinksInProse(html) {
	const $ = cheerio.load(`<div>${proseHtml(html)}</div>`);
	const links = new Set();
	$('a[href]').each((_, a) => {
		const n = normPath($(a).attr('href') || '');
		if (!n || n.startsWith('/go/')) return;
		links.add(n);
	});
	return links.size;
}

function hasPilier(html, urlPath) {
	const pillars = PILLARS[urlPath];
	if (!pillars?.length) return { ok: true, note: '—' };
	const $ = cheerio.load(`<div>${proseHtml(html)}</div>`);
	const hrefs = new Set();
	$('a[href]').each((_, a) => {
		const n = normPath($(a).attr('href') || '');
		if (n) hrefs.add(n);
	});
	const hit = pillars.some((p) => hrefs.has(p.endsWith('/') ? p : p + '/'));
	return { ok: hit, note: hit ? 'oui' : `manque (${pillars.join(' ou ')})` };
}

function collectInbound(targetPath) {
	const needle = targetPath.replace(/^\//, '');
	const sources = [];
	const walk = (dir) => {
		for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
			const full = path.join(dir, ent.name);
			if (ent.isDirectory()) walk(full);
			else if (ent.name === 'index.html') {
				const relDir = path.relative(dist, path.dirname(full)).replace(/\\/g, '/');
				const from = '/' + (relDir ? relDir + '/' : '');
				if (from === targetPath) continue;
				const html = fs.readFileSync(full, 'utf8');
				if (html.includes(`href="${targetPath}"`) || html.includes(`href="${targetPath.slice(0, -1)}"`)) {
					sources.push(from);
				} else if (html.includes(`/${needle}`)) {
					if (new RegExp(`href=["'][^"']*${needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(html)) {
						sources.push(from);
					}
				}
			}
		}
	};
	walk(dist);
	return sources;
}

const inboundCache = new Map();
function inboundFor(urlPath) {
	if (!inboundCache.has(urlPath)) inboundCache.set(urlPath, collectInbound(urlPath));
	return inboundCache.get(urlPath);
}

const maillageLines = [
	'# Maillage interne (corps `.prose`) — lot 10',
	'',
	'Seuil bloquant : **&lt; 3** liens internes éditoriaux (hors `/go/`). Avertissement : **&lt; 5**.',
	'Orpheline = aucune page entrante dans `dist/`. Pilier = au moins un lien vers la page pilier de rubrique.',
	'',
	'| URL | Liens | Pilier | Entrantes | Statut |',
	'|-----|------:|:------:|-----------|--------|',
];

for (const p of pages) {
	if (!fs.existsSync(p.file)) {
		maillageLines.push(`| ${p.urlPath} | — | — | — | **ABSENT dist** |`);
		continue;
	}
	const html = fs.readFileSync(p.file, 'utf8');
	const count = countInternalLinksInProse(html);
	const pilier = hasPilier(html, p.urlPath);
	const inbound = inboundFor(p.urlPath);
	const warn = count < 5 && count >= 3;
	const ko = count < 3 || !pilier.ok || inbound.length === 0;
	let stat = 'OK';
	if (ko) stat = '**KO**';
	else if (warn) stat = 'OK (⚠ &lt;5 liens)';
	maillageLines.push(
		`| ${p.urlPath} | ${count} | ${pilier.ok ? 'oui' : '**non**'} | ${inbound.length} | ${stat} |`,
	);
}

fs.writeFileSync(path.join(root, '_reecriture_lot10', 'MAILLAGE.md'), maillageLines.join('\n') + '\n');

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
			assets: true,
			svgIllustrative: true,
		};
		const errors = [];
		if (!fs.existsSync(p.file)) {
			visuelRows.push({ path: p.urlPath, status: 'KO', detail: 'fichier dist absent' });
			continue;
		}
		const fileUrl = `${baseUrl}${p.urlPath}`;
		const failedReq = [];
		for (const vp of viewports) {
			const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
			const page = await context.newPage();
			const pageErrors = [];
			page.on('pageerror', (e) => {
				if (!NON_BLOCKING_JS.test(e.message)) pageErrors.push(e.message);
			});
			page.on('response', (res) => {
				const u = res.url();
				const st = res.status();
				if (st >= 400 && /(\.css|\.woff2?|\.js)(\?|$)/i.test(u) && u.includes('127.0.0.1')) {
					failedReq.push(`${st}:${u.split('/').pop()}`);
				}
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
				const heroImg = document.querySelector(
					'.hero-article-media img, .hero-article img, article .prose img, .prose img',
				);
				const imgs = [...document.querySelectorAll('img')];
				const broken = imgs.filter((i) => {
					const src = i.currentSrc || i.src || i.getAttribute('src') || '';
					if (/^data:/.test(src)) return false;
					if (/\.svg(\?|$)/i.test(src) && i.complete) return false;
					return !i.complete || i.naturalWidth === 0;
				}).map((i) => i.src || i.getAttribute('src'));
				const overflow = document.documentElement.scrollWidth > document.documentElement.clientWidth + 2;
				const badSvg = [...document.querySelectorAll('article img[src*=".svg"], .prose img[src*=".svg"]')].filter(
					(i) => {
						const src = i.getAttribute('src') || '';
						return !/logo|favicon|icon/i.test(src);
					},
				);
				return {
					hasHero: Boolean(heroImg && heroImg.naturalWidth > 0),
					broken,
					overflow,
					badSvg: badSvg.map((i) => i.getAttribute('src')),
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
			if (metrics.badSvg.length) {
				checks.svgIllustrative = false;
				errors.push(`svg-illustratif:${metrics.badSvg[0]}`);
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
		if (failedReq.length) {
			checks.assets = false;
			errors.push(`404-asset:${[...new Set(failedReq)].slice(0, 2).join('; ')}`);
		}
		const ok =
			checks.hero &&
			checks.images &&
		 checks.menuMobile &&
			checks.overflow &&
			checks.scripts &&
			checks.assets &&
			checks.svgIllustrative;
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
	'# Contrôle visuel headless — lot 10',
	'',
	`Playwright, serveur statique local (\`http://127.0.0.1:${PORT}/\` → \`dist/\`), viewports 390×844 et 1366×900.`,
	'Captures : `_reecriture_lot10/captures/`',
	'',
	'| URL | Résultat | Détail |',
	'|-----|:--------:|--------|',
	...visuelRows.map((r) => `| ${r.path} | **${r.status}** | ${r.detail} |`),
	'',
].join('\n');

fs.writeFileSync(path.join(root, '_reecriture_lot10', 'VISUEL.md'), visuelMd);

const koMaillage = maillageLines.filter((l) => l.includes('**KO**')).length;
const koVisuel = visuelRows.filter((r) => r.status === 'KO').length;
console.log(`[lot10-checks] maillage KO=${koMaillage}, visuel KO=${koVisuel}, pages=${pages.length}`);
process.exit(koMaillage || koVisuel ? 1 : 0);
