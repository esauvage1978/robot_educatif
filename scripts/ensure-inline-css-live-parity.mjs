#!/usr/bin/env node
/**
 * Pages locales (DePost, EnPost, etc.) : parité CSS inline avec la prod si build incomplet.
 *
 * Usage: node scripts/ensure-inline-css-live-parity.mjs [distDir] [liveDir] [relList]
 * Env: LIVE_DIR, REL_LIST — snapshots locaux (ex. re-ab-20261104/live + rel.txt)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { stripHtmlBodyPageOverflow } from './strip-html-body-overflow.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const distDir = path.resolve(process.argv[2] ?? path.join(ROOT, 'dist'));
const liveDir = path.resolve(process.argv[3] ?? process.env.LIVE_DIR ?? '');
const relListPath = path.resolve(
	process.argv[4] ?? process.env.REL_LIST ?? path.join(__dirname, '../../re-ab-20261104/rel.txt'),
);
const SITE = 'https://robot-educatif.info';
const MIN_RATIO = 0.95;
const TABLE_PAGES_EXTRA = ['comparison-table-global.css', 'noel-class-bridge.css', 'tableau-empile.css'];
const LOCALE_PREFIXES = ['de', 'en', 'es', 'it', 'uk', 'ca'];

/** Pages FR à la racine de dist/ (build Astro incomplet vs XtremCache prod). */
const FR_ROOT_SLUGS = [
	'meilleur-robot-programmable-enfant-2026',
	'mbot-vs-mbot2-comparaison-des-robots-educatifs-pour-enfants',
	'equiper-classe-robots-budget-packs-2026',
	'robot-educatif-cadeau-noel-2026',
	'robot-pedagogique-ecole',
	'10-projets-mbot-gratuits-classe-faciles',
	'installer-mblock-5-sous-windows-10',
	'premier-pas-avec-mblock-5',
	'accessoires-mbot-par-ou-commencer',
	'mblock-vs-scratch-lequel-choisir',
	'idees-projets-mbot-rapides-une-heure',
	'cadeau-robot-enfant-8-ans',
];

const FRAGMENTS_DIR = path.join(__dirname, 'fragments');
const NOEL_GUIDE_SLUGS = [
	'robot-educatif-cadeau-noel-2026',
	'en/educational-robot-christmas-gifts-2026',
	'uk/educational-robot-christmas-gifts-2026',
	'ca/educational-robot-christmas-gifts-2026',
	'de/lernroboter-weihnachtsgeschenke-2026',
	'it/regalo-natale-robot-educativo-2026',
	'es/regalo-navidad-robot-educativo-2026',
];
const NOEL_CSS_LIVE_FALLBACK = '/robot-educatif-cadeau-noel-2026/';

const EXTRA_CSS_BY_SLUG = Object.fromEntries(
	NOEL_GUIDE_SLUGS.map((s) => [s, ['comparison-table-global.css', 'noel-class-bridge.css']]),
);

const HOME_INDEX_RELPATHS = [
	'index.html',
	'en/index.html',
	'de/index.html',
	'it/index.html',
	'es/index.html',
	'uk/index.html',
	'ca/index.html',
	'us/index.html',
	'categorie/noel/index.html',
];
for (const rel of HOME_INDEX_RELPATHS) {
	const slug = rel.replace(/\/index\.html$/, '') || '__home__';
	if (!EXTRA_CSS_BY_SLUG[slug]) EXTRA_CSS_BY_SLUG[slug] = ['noel-class-bridge.css'];
}

function extractHeadStyleBlocks(html) {
	const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
	const chunk = head ? head[1] : html;
	return extractInlineStyleBlocks(chunk);
}

function extractInlineStyleBlocks(html) {
	const re = /<style[^>]*>([\s\S]*?)<\/style>/gi;
	const blocks = [];
	let m;
	while ((m = re.exec(html))) blocks.push(m[0]);
	return blocks;
}

function inlineStyleCharLen(html) {
	const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
	const chunk = head ? head[1] : html;
	return extractInlineStyleBlocks(chunk).reduce((n, b) => n + b.length, 0);
}

function stripRestoredGoCss(css) {
	return css.replace(/\.restored-go\s*\{[^}]*\}\s*/gi, '');
}

function descopeAstroCss(css) {
	return stripRestoredGoCss(
		stripHtmlBodyPageOverflow(css.replace(/\[data-astro-cid-[a-z0-9]+\]/gi, '')),
	);
}

function extractDistStyleInners(distHtml) {
	const head = distHtml.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
	const chunk = head ? head[1] : distHtml;
	const inners = [];
	const re = /<style([^>]*)>([\s\S]*?)<\/style>/gi;
	let m;
	while ((m = re.exec(chunk))) {
		const attrs = m[1];
		const css = m[2];
		if (/data-live-parity|data-build-extra|data-build-scoped/.test(attrs)) continue;
		if (!/\[data-astro-cid-/.test(css) && css.length > 8000) continue;
		inners.push(css);
	}
	return inners;
}

function replaceOrInsertStyles(distHtml, liveBlocks, extraCss = '') {
	if (!liveBlocks.length && !extraCss) return distHtml;
	const distInners = extractDistStyleInners(distHtml);
	const liveMerged = liveBlocks
		.map((tag) => {
			const inner = tag.replace(/^<style[^>]*>/i, '').replace(/<\/style>$/i, '');
			return `<style data-live-parity="1">${descopeAstroCss(inner)}</style>`;
		})
		.join('');
	const distScoped = distInners
		.map((css) => `<style data-build-scoped="1">${css}</style>`)
		.join('');
	const extraBlock = extraCss ? `<style data-build-extra="comparison-table">${extraCss}</style>` : '';
	const inject = liveMerged + distScoped + extraBlock;
	return distHtml.replace(/<head([^>]*)>([\s\S]*?)<\/head>/i, (full, attrs, inner) => {
		let h = inner.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
		const anchor = /<meta charset="utf-8"\s*\/?>/i;
		if (anchor.test(h)) h = h.replace(anchor, (a) => `${a}${inject}`);
		else h = inject + h;
		return `<head${attrs}>${h}</head>`;
	});
}

const MIN_NOEL_CSS_BYTES = 130 * 1024;

function appendExtraCssOnly(distHtml, extraCss) {
	if (!extraCss || distHtml.includes('data-build-extra="comparison-table"')) return distHtml;
	const extraBlock = `<style data-build-extra="comparison-table">${extraCss}</style>`;
	return distHtml.replace(/<head([^>]*)>([\s\S]*?)<\/head>/i, (full, attrs, inner) => {
		const anchor = /<meta charset="utf-8"\s*\/?>/i;
		const h = anchor.test(inner) ? inner.replace(anchor, (a) => `${a}${extraBlock}`) : extraBlock + inner;
		return `<head${attrs}>${h}</head>`;
	});
}

function readExtraCssForSlug(slug) {
	const key = slug || '__home__';
	const entry = EXTRA_CSS_BY_SLUG[key] ?? EXTRA_CSS_BY_SLUG[slug];
	if (!entry) return '';
	const files = Array.isArray(entry) ? entry : [entry];
	return files
		.map((f) => {
			const p = path.isAbsolute(f) ? f : path.join(FRAGMENTS_DIR, f);
			return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
		})
		.filter(Boolean)
		.join('\n');
}

function liveSnapshotPath(relPath) {
	const rel = relPath.replace(/\/index\.html$/, '').replace(/\/$/, '');
	return path.join(liveDir, `${rel.replace(/\//g, '_')}_index.html`);
}

async function fetchLive(pathname, relForLocal = '') {
	if (liveDir && relForLocal) {
		const snap = liveSnapshotPath(relForLocal.replace(/\/index\.html$/, '/'));
		if (fs.existsSync(snap)) return fs.readFileSync(snap, 'utf8');
	}
	const url = `${SITE}${pathname.endsWith('/') ? pathname : `${pathname}/`}`;
	const res = await fetch(url, {
		redirect: 'follow',
		headers: { 'User-Agent': 'ManusoCssParity/1.0' },
	});
	if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
	return res.text();
}

function loadRelListFiles() {
	if (!fs.existsSync(relListPath)) return [];
	return fs
		.readFileSync(relListPath, 'utf8')
		.split(/\s+/)
		.filter(Boolean)
		.map((rel) => path.join(distDir, rel, 'index.html'))
		.filter((f) => fs.existsSync(f));
}

function walkLocaleHtml(dir, base = dir) {
	/** @type {string[]} */
	const out = [];
	for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, ent.name);
		if (ent.isDirectory()) out.push(...walkLocaleHtml(full, base));
		else if (ent.isFile() && ent.name === 'index.html') out.push(full);
	}
	return out;
}

async function main() {
	let patched = 0;
	let skipped = 0;
	const files = LOCALE_PREFIXES.flatMap((loc) => {
		const d = path.join(distDir, loc);
		return fs.existsSync(d) ? walkLocaleHtml(d) : [];
	});

	for (const extra of ['codes-promo/index.html']) {
		const f = path.join(distDir, extra);
		if (fs.existsSync(f)) files.push(f);
	}

	for (const slug of FR_ROOT_SLUGS) {
		const f = path.join(distDir, slug, 'index.html');
		if (fs.existsSync(f)) files.push(f);
	}

	for (const rel of HOME_INDEX_RELPATHS) {
		const f = path.join(distDir, rel);
		if (fs.existsSync(f)) files.push(f);
	}

	for (const f of loadRelListFiles()) {
		if (!files.includes(f)) files.push(f);
	}

	// Quand la liste cible est rel.txt, ne pas lancer la parité sur tout le dist multilingue.
	if (path.basename(relListPath) === 'rel.txt') {
		const relOnly = loadRelListFiles();
		files.splice(0, files.length, ...relOnly);
	}

	for (const f of loadRelListFiles()) {
		const slug = path.relative(distDir, f).replace(/\\/g, '/').replace(/\/index\.html$/, '');
		if (!EXTRA_CSS_BY_SLUG[slug]) EXTRA_CSS_BY_SLUG[slug] = TABLE_PAGES_EXTRA;
	}

	files.sort((a, b) => {
		const af = a.includes('robot-educatif-cadeau-noel-2026');
		const bf = b.includes('robot-educatif-cadeau-noel-2026');
		if (af && !bf) return -1;
		if (!af && bf) return 1;
		return 0;
	});

	const frNoelDist = path.join(distDir, 'robot-educatif-cadeau-noel-2026/index.html');

	for (const file of files) {
		if (!fs.existsSync(file)) {
			skipped++;
			continue;
		}
		const rel = path.relative(distDir, file).replace(/\\/g, '/');
		const pathname = `/${rel.replace(/index\.html$/, '')}`;
		const distHtml = fs.readFileSync(file, 'utf8');
		const distLen = inlineStyleCharLen(distHtml);
		let liveHtml;
		try {
			liveHtml = await fetchLive(pathname, rel);
		} catch {
			const slugEarly = rel.replace(/\/index\.html$/, '');
			if (NOEL_GUIDE_SLUGS.includes(slugEarly)) {
				try {
					liveHtml = await fetchLive(NOEL_CSS_LIVE_FALLBACK);
				} catch {
					skipped++;
					continue;
				}
			} else {
				skipped++;
				continue;
			}
		}
		const liveLen = inlineStyleCharLen(liveHtml);
		if (liveLen < 1000) {
			skipped++;
			continue;
		}
		const slug = rel.replace(/\/index\.html$/, '');
		const extraCss = readExtraCssForSlug(slug);
		const needsExtra = extraCss.length > 0;
		const isNoelGuide = NOEL_GUIDE_SLUGS.includes(slug);
		const isHome = HOME_INDEX_RELPATHS.includes(rel);
		const onRelList = loadRelListFiles().includes(file);

		if (onRelList && (distLen < liveLen * MIN_RATIO || !distHtml.includes('data-live-parity="1"'))) {
			const liveBlocks = extractHeadStyleBlocks(liveHtml);
			const next = replaceOrInsertStyles(distHtml, liveBlocks, extraCss);
			if (next !== distHtml) {
				fs.writeFileSync(file, next, 'utf8');
				patched++;
				console.log(`[css-parity] ${rel}: rel ${distLen} → ${inlineStyleCharLen(next)} (live ${liveLen})`);
			} else skipped++;
			continue;
		}

		if (isHome && distLen < liveLen) {
			const liveBlocks = extractHeadStyleBlocks(liveHtml);
			const next = replaceOrInsertStyles(distHtml, liveBlocks, extraCss);
			if (next !== distHtml) {
				fs.writeFileSync(file, next, 'utf8');
				patched++;
				console.log(`[css-parity] ${rel}: home ${distLen} → ${inlineStyleCharLen(next)} (live ${liveLen})`);
			} else skipped++;
			continue;
		}

		if (needsExtra && distLen >= MIN_NOEL_CSS_BYTES && distHtml.includes('data-build-extra="comparison-table"') && !onRelList) {
			skipped++;
			continue;
		}
		if (needsExtra && distLen >= MIN_NOEL_CSS_BYTES && !onRelList) {
			const next = appendExtraCssOnly(distHtml, extraCss);
			if (next !== distHtml) {
				fs.writeFileSync(file, next, 'utf8');
				patched++;
				console.log(`[css-parity] ${rel}: append extra ${distLen} → ${inlineStyleCharLen(next)}`);
			} else skipped++;
			continue;
		}

		if (isNoelGuide && slug !== 'robot-educatif-cadeau-noel-2026' && fs.existsSync(frNoelDist)) {
			const frLen = inlineStyleCharLen(fs.readFileSync(frNoelDist, 'utf8'));
			if (frLen >= MIN_NOEL_CSS_BYTES) {
				liveHtml = fs.readFileSync(frNoelDist, 'utf8');
			}
		}

		if (needsExtra && distLen >= liveLen * MIN_RATIO && distLen >= liveLen && !onRelList) {
			skipped++;
			continue;
		}

		if (distLen >= liveLen * MIN_RATIO && !needsExtra && !onRelList) {
			skipped++;
			continue;
		}
		if (onRelList && distLen >= liveLen && distHtml.includes('data-live-parity="1"') && distHtml.includes('data-build-extra="comparison-table"')) {
			skipped++;
			continue;
		}
		const liveBlocks = extractHeadStyleBlocks(liveHtml);
		const next = replaceOrInsertStyles(distHtml, liveBlocks, extraCss);
		if (next !== distHtml) {
			fs.writeFileSync(file, next, 'utf8');
			patched++;
			console.log(`[css-parity] ${rel}: ${distLen} → ${inlineStyleCharLen(next)} (live ${liveLen})`);
		}
	}

	console.log(`[css-parity] ${patched} fichier(s) corrigé(s), ${skipped} ignoré(s), dist=${distDir}`);
	if (patched === 0) {
		const probe = path.join(distDir, 'de/smart-home/bester-zigbee-stick-home-assistant/index.html');
		if (fs.existsSync(probe)) {
			const len = inlineStyleCharLen(fs.readFileSync(probe, 'utf8'));
			if (len < 30000) {
				console.error('[css-parity] ERREUR: page Zigbee DE toujours sous le seuil CSS.');
				process.exit(1);
			}
		}
	}
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
