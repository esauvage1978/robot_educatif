#!/usr/bin/env node
/**
 * Contrôles pré-publication GSC (src + dist).
 * Usage:
 *   node scripts/verify-gsc-publication.mjs           # src + go-table ; dist si présent
 *   node scripts/verify-gsc-publication.mjs src-only    # src + go-table uniquement (prebuild)
 *   node scripts/verify-gsc-publication.mjs dist        # contrôle complet du build
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { expandLangPair, findPair, LANG_PAIRS } from '../src/lib/i18n.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mode = process.argv[2];
const distOnlySrc = mode === 'src-only';
const dist = distOnlySrc
	? null
	: path.resolve(ROOT, mode && mode !== 'src-only' ? mode : 'dist');

const HREFLANG_HEAD = { fr: 'fr', en: 'en', uk: 'en-GB', ca: 'en-CA', de: 'de', it: 'it', es: 'es', nl: 'nl', us: 'en-US' };
const HREFLANG_EXPECTED = new Set(Object.values(HREFLANG_HEAD));

/**
 * Mentions légales d’affiliation Amazon (obligatoires sur toute page avec lien Amazon).
 * Ne pas confondre avec les avis clients Amazon (voir AMAZON_CUSTOMER_REVIEW_RE).
 */
const AFFILIATE_DISCLOSURE_RE =
	/affiliate-disclosure|partenaire\s+amazon|amazon\s+associate|associate\s+amazon|amazon-partner|als\s+amazon-partner|qualifizierten\s+verkäufen|asociado\s+de\s+amazon|afiliado\s+de\s+amazon|affiliat[oi]\s+amazon|percev(?:o|e)(?:m|z)(?:o|mos)\s+.*commission.*amazon|earn\s+from\s+qualifying\s+purchases|commission\s+sur\s+les\s+achats\s+éligibles/i;

/** Avis clients Amazon recopiés / embarqués (interdits — pas la mention Partenaire Amazon). */
const AMAZON_CUSTOMER_REVIEW_RE =
	/acr-customer-review|customer-reviews-carousel|data-hook="review"|verified\s+purchase|achat\s+vérifié|out\s+of\s+5\s+stars.*amazon|amazon\.com\/gp\/customer-reviews/i;

/** Notes éditoriales internes visibles (hors mentions affiliation). */
const INTERNAL_NOTE_RE = [
	/\bconsolidation\s+interne\b/i,
	/\bnotification\s+push\s+à\s+manu\b/i,
	/\bTBD\s+premium\b/i,
	/##\s+[^\n]*\(\s*brouillon\s*\)/i,
	/##\s+[^\n]*\(\s*draft\s*\)/i,
];

const errors = [];
const SRC_EXT = /\.(md|mdx|astro|mjs|ts|tsx|html)$/i;

function walkSrc(dir, acc = []) {
	for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
		if (e.name === 'node_modules' || e.name === 'dist' || e.name === '.git') continue;
		const p = path.join(dir, e.name);
		if (e.isDirectory()) walkSrc(p, acc);
		else if (SRC_EXT.test(e.name)) acc.push(p);
	}
	return acc;
}

function walkDistHtml(dir, acc = []) {
	if (!fs.existsSync(dir)) return acc;
	for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
		const p = path.join(dir, e.name);
		if (e.isDirectory()) walkDistHtml(p, acc);
		else if (e.name.endsWith('.html')) acc.push(p);
	}
	return acc;
}

function rel(p) {
	return path.relative(ROOT, p).replace(/\\/g, '/');
}

// ——— src: /s?k=, notes internes ———
const srcDir = path.join(ROOT, 'src');
for (const file of walkSrc(srcDir)) {
	const text = fs.readFileSync(file, 'utf8');
	if (/\/s\?k=/i.test(text) && !text.includes('plus de recherche /s?k=')) {
		errors.push(`src_amazon_search: ${rel(file)} contient /s?k=`);
	}
	for (const re of INTERNAL_NOTE_RE) {
		if (re.test(text)) errors.push(`src_internal_note: ${rel(file)} — ${re}`);
	}
}

// ——— go-table: boucles ———
const goTable = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/go-table.json'), 'utf8'));
const links = goTable.links || goTable;
for (const [id, entry] of Object.entries(links)) {
	const u = entry?.url || '';
	if (u.includes(`/go/${id}/`) || u.includes(`/go/${id}`)) {
		errors.push(`go_self_redirect: scripts/go-table.json id=${id}`);
	}
}

// ——— dist (si présent et non src-only) ———
if (dist && fs.existsSync(dist)) {
	const cheerio = await import('cheerio');
	for (const htmlPath of walkDistHtml(dist)) {
		const urlPath =
			htmlPath === path.join(dist, 'index.html')
				? '/'
				: `/${path.relative(dist, htmlPath).replace(/\\/g, '/').replace(/index\.html$/, '')}`;
		const html = fs.readFileSync(htmlPath, 'utf8');
		const $ = cheerio.load(html);
		const head = html.split(/<\/head>/i)[0] || html.slice(0, 65536);
		if (/<meta[^>]+name=["']robots["'][^>]+noindex/i.test(head)) continue;

		const hasAmazon =
			/amazon\./i.test(html) ||
			/href=["'][^"']*\/go\/az-/i.test(html) ||
			/data-go=["']amazon/i.test(html);
		if (hasAmazon && !AFFILIATE_DISCLOSURE_RE.test(html)) {
			errors.push(`missing_affiliate_disclosure: ${urlPath} (lien Amazon sans mention Partenaire Amazon)`);
		}
		if (AMAZON_CUSTOMER_REVIEW_RE.test(html)) {
			errors.push(`amazon_customer_review: ${urlPath}`);
		}
		for (const re of INTERNAL_NOTE_RE) {
			const bodyText = $('main').text() || $('article').text() || $.root().text();
			if (re.test(bodyText)) errors.push(`dist_internal_note: ${urlPath} — ${re}`);
		}
		if (/\/s\?k=/i.test(html)) {
			errors.push(`dist_amazon_search: ${urlPath}`);
		}

		const pair = expandLangPair(findPair(urlPath));
		if (pair) {
			const declared = new Set();
			for (const m of head.matchAll(/<link[^>]+rel=["']alternate["'][^>]*>/gi)) {
				const tag = m[0];
				const hl = (tag.match(/hreflang=["']([^"']+)["']/i) || [])[1];
				if (hl) declared.add(hl.toLowerCase());
			}
			const presentLocales = Object.entries(pair).filter(([, v]) => v);
			const missing = [];
			for (const [loc, href] of presentLocales) {
				const code = HREFLANG_HEAD[loc];
				if (!code) continue;
				const target = path.join(dist, decodeURIComponent(href).replace(/^\//, ''), 'index.html');
				if (!fs.existsSync(target)) continue;
				if (!declared.has(code.toLowerCase())) missing.push(code);
			}
			if (pair.fr || pair.en || pair.it) {
				if (!declared.has('x-default')) missing.push('x-default');
			}
			if (missing.length) {
				errors.push(`hreflang_incomplete: ${urlPath} manque ${missing.join(', ')}`);
			}
		}

		// Pages alias /go/<id>/ ne doivent pas exposer l’URL marchande
		if (/\/go\/[a-z0-9-]+\//.test(urlPath) && /tag=roboteducat|www\.amazon\./i.test(html)) {
			errors.push(`go_merchant_leak: ${urlPath}`);
		}
	}

	// Boucles runtime: HTML refresh vers le même /go/id/
	for (const htmlPath of walkDistHtml(path.join(dist, 'go'))) {
		const m = htmlPath.match(/[/\\]go[/\\]([a-z0-9-]+)[/\\]index\.html$/i);
		if (!m) continue;
		const id = m[1];
		const html = fs.readFileSync(htmlPath, 'utf8');
		const canon = (html.match(/rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) || [])[1] || '';
		if (canon.includes(`/go/${id}`) && !links[id]?.url?.startsWith('http')) {
			errors.push(`go_redirect_loop: /go/${id}/ (pas de destination go-table)`);
		}
	}
}

// Paires i18n sans fichier (sanity léger, échantillon nl)
for (const pair of LANG_PAIRS) {
	for (const [loc, href] of Object.entries(pair)) {
		if (!href || loc === 'us') continue;
		const page = path.join(ROOT, 'src/pages', href.replace(/^\//, '').replace(/\/$/, ''));
		const candidates = [
			`${page}.astro`,
			`${page}.md`,
			`${page}.mdx`,
			path.join(page, 'index.astro'),
		];
		if (loc === 'fr' && href.startsWith('/domotique/')) {
			const slug = href.replace(/^\/domotique\//, '').replace(/\/$/, '');
			candidates.push(path.join(ROOT, `src/content/domotique/${slug}.mdx`), path.join(ROOT, `src/content/domotique/${slug}.md`));
		}
		if (!candidates.some((c) => fs.existsSync(c))) continue;
	}
}

const report = {
	ok: errors.length === 0,
	errorCount: errors.length,
	errors: errors.slice(0, 120),
	truncated: errors.length > 120,
};
console.log(JSON.stringify(report, null, 2));
process.exit(errors.length ? 1 : 0);