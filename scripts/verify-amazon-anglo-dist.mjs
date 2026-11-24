#!/usr/bin/env node
/** Contrôles post-go-links sur dist/en, dist/uk, dist/ca (+ table + DE/IT/ES devises). */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { relPosix } from './rel-posix.mjs';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(process.argv[2] || 'dist');
const roots = ['en', 'uk', 'ca'].map((m) => path.join(dist, m)).filter((d) => fs.existsSync(d));
const tablePath = path.join(SCRIPT_DIR, 'go-table.json');
const table = JSON.parse(fs.readFileSync(tablePath, 'utf8'));
const links = table.links || table;
const prod = new Set(Object.keys(links));

function walk(d, acc = []) {
	for (const e of fs.readdirSync(d, { withFileTypes: true })) {
		const p = path.join(d, e.name);
		if (e.isDirectory()) walk(p, acc);
		else if (e.name.endsWith('.html')) acc.push(p);
	}
	return acc;
}

const counts = {
	caDp: 0,
	comDp: 0,
	frHost: 0,
	amazonComLabel: 0,
	euro: 0,
	oneAround: 0,
	missingGo: 0,
	servedCaDp: 0,
	servedComDp: 0,
	labelMismatch: 0,
	noAffiliateTag: 0,
	ukDollarPrice: 0,
	caPoundPrice: 0,
	aboutAbout: 0,
	caBrokenCad: 0,
	caMixedCurrency: 0,
	caDollarPrice: 0,
	productB0Query: 0,
	euLangDollarCost: 0,
	gluedCurrencyUk: 0,
	gluedCurrencyCa: 0,
	aboutDuplicate: 0,
	ukVisibleDollar: 0,
	caVisibleDollar: 0,
};
const samples = Object.fromEntries(Object.keys(counts).map((k) => [k, []]));

function visibleText(html) {
	return html
		.replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
		.replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
		.replace(/<[^>]+>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

/** £ ou $ collé à une lettre/chiffre (hors préfixe CA$). */
const GLUED_POUND = /[A-Za-z]£\d|\d£\d/;
const GLUED_DOLLAR = /[a-z]\$\d|\d\$\d/;
/** $ visible : pas CA$, pas domaine amazon.com. */
const VISIBLE_DOLLAR_UK = /(?<!CA)\$[\d]/;
const VISIBLE_DOLLAR_CA = /(?<!CA)\$[\d]/;
const ABOUT_DUP = /\b(about|around|roughly|often)\s+\1\b/i;

/** $ seul sur UK (hors « CA$ » sur pages EN importées). */
const UK_DOLLAR_BAD =
	/\$about|about \$about|(?:Cost|Budget)[^<]{0,24}\$[\d]|(?:~|around|about|roughly|often)\s+\$[\d]|(?<![A-Za-z/])\$[\d]{2,}/;

/** £ ou $ seul sur CA (CA$ permis). */
const CA_POUND_BAD = /£[\d]|(?:~|around|about|roughly|often)\s+£[\d]/;
/** £ en CA hors « No cost » déjà corrigé. */
const CA_POUND_STRICT = /<strong>£|\b£[\d]/;
const CA_DOLLAR_BAD = /(?<!CA)(?:~|around|about|roughly|often)\s+\$(?!\d{3})[\d]|(?<!CA)\$[\d]{2,}\s*–/;
/** Artefact historique « CA$2 » ou « mBot around CA$2 » (montant tronqué), pas CA$0–15 ni CA$2,540. */
const CA_BROKEN_CAD =
	/\b(?:around|about|roughly|often)\s+CA\$2\b(?!\d|,)|\bmBot2?\s+around\s+CA\$2\b/;
const CA_MIXED = /CA\$[\d.,]+\s*–\s*£|CA\$[\d.,]+\s*–\s*\$(?![\d]{2})|£[\d]+\s*–\s*CA\$/;

function hostFromHref(href) {
	const m = href.match(/amazon\.(com|co\.uk|ca)/i);
	return m ? `amazon.${m[1].toLowerCase()}` : null;
}

function labelForHost(host) {
	if (host === 'amazon.com') return /Amazon\.com(?![.\w-])/i;
	if (host === 'amazon.co.uk') return /Amazon\.co\.uk|Amazon UK/i;
	if (host === 'amazon.ca') return /Amazon\.ca(?![.\w-])/i;
	return null;
}

for (const [id, entry] of Object.entries(links)) {
	if (/k=product%20B0/i.test(entry?.url || '')) {
		counts.productB0Query++;
		if (samples.productB0Query.length < 3) samples.productB0Query.push(id);
	}
}

for (const root of roots) {
	const market = path.basename(root);
	for (const file of walk(root)) {
		const rel = relPosix(dist, file);
		if (/\/partners?\//.test(rel) || /\/socios\//.test(rel) || /\/partenaires\//.test(rel)) continue;
		const html = fs.readFileSync(file, 'utf8');
		const body = html.replace(/<script\b[\s\S]*?<\/script>/gi, ' ');
		const visible = visibleText(html);
		if (/amazon\.ca\/dp\//i.test(html)) {
			counts.caDp++;
			if (samples.caDp.length < 3) samples.caDp.push(rel);
		}
		if (/amazon\.com\/dp\//i.test(html)) {
			counts.comDp++;
			if (samples.comDp.length < 3) samples.comDp.push(rel);
		}
		if (market !== 'en' && /amazon\.fr/i.test(html)) {
			counts.frHost++;
			if (samples.frHost.length < 3) samples.frHost.push(rel);
		}
		if (market !== 'en' && /Amazon\.com(?![.\w-])/i.test(html)) {
			counts.amazonComLabel++;
			if (samples.amazonComLabel.length < 3) samples.amazonComLabel.push(rel);
		}
		if (/€|&euro;|&#8364;/i.test(html) && /en|uk|ca/.test(market)) {
			counts.euro++;
			if (samples.euro.length < 3) samples.euro.push(rel);
		}
		if (/1around/i.test(html)) counts.oneAround++;
		for (const m of html.matchAll(/\/go\/(az-[a-z]{2}-[a-f0-9]{10}|aw-\d+-[a-f0-9]{10})\//g)) {
			if (!prod.has(m[1])) counts.missingGo++;
			const u = links[m[1]]?.url || '';
			if (m[1].startsWith('az-ca-') && /\/dp\//i.test(u)) {
				counts.servedCaDp++;
				if (samples.servedCaDp.length < 3) samples.servedCaDp.push(`${rel} → ${m[1]}`);
			}
			if (m[1].startsWith('az-us-') && /\/dp\//i.test(u)) {
				counts.servedComDp++;
				if (samples.servedComDp.length < 3) samples.servedComDp.push(`${rel} → ${m[1]}`);
			}
		}
		if (/no affiliate tag/i.test(html)) {
		 counts.noAffiliateTag++;
		 if (samples.noAffiliateTag.length < 3) samples.noAffiliateTag.push(rel);
		}
		if (/\$about|about \$about/i.test(body)) {
			counts.aboutAbout++;
			if (samples.aboutAbout.length < 3) samples.aboutAbout.push(rel);
		}
		if (ABOUT_DUP.test(visible)) {
			counts.aboutDuplicate++;
			if (samples.aboutDuplicate.length < 3) samples.aboutDuplicate.push(rel);
		}
		for (const m of html.matchAll(/<a\b([^>]*href=(["'])([^"']+)\2[^>]*)>([\s\S]*?)<\/a>/gi)) {
			const href = m[3];
			const host = hostFromHref(href);
			if (!host) continue;
			const plain = m[4].replace(/<[^>]+>/g, '').trim();
			if (!/Amazon/i.test(plain)) continue;
			const want = labelForHost(host);
			if (want && !want.test(plain)) {
				counts.labelMismatch++;
				if (samples.labelMismatch.length < 3) samples.labelMismatch.push(`${rel}: « ${plain.slice(0, 40)} » → ${host}`);
			}
		}
		if (market === 'uk' && UK_DOLLAR_BAD.test(body)) {
			counts.ukDollarPrice++;
			if (samples.ukDollarPrice.length < 3) samples.ukDollarPrice.push(rel);
		}
		if (market === 'uk') {
			if (GLUED_POUND.test(visible) || GLUED_DOLLAR.test(visible)) {
				counts.gluedCurrencyUk++;
				if (samples.gluedCurrencyUk.length < 3) samples.gluedCurrencyUk.push(rel);
			}
			if (VISIBLE_DOLLAR_UK.test(visible)) {
				counts.ukVisibleDollar++;
				if (samples.ukVisibleDollar.length < 3) samples.ukVisibleDollar.push(rel);
			}
		}
		if (market === 'ca') {
			if (GLUED_POUND.test(visible) || GLUED_DOLLAR.test(visible)) {
				counts.gluedCurrencyCa++;
				if (samples.gluedCurrencyCa.length < 3) samples.gluedCurrencyCa.push(rel);
			}
			if (VISIBLE_DOLLAR_CA.test(visible)) {
				counts.caVisibleDollar++;
				if (samples.caVisibleDollar.length < 3) samples.caVisibleDollar.push(rel);
			}
			if (CA_POUND_STRICT.test(body)) {
				counts.caPoundPrice++;
				if (samples.caPoundPrice.length < 3) samples.caPoundPrice.push(rel);
			}
			if (CA_DOLLAR_BAD.test(body)) {
				counts.caDollarPrice++;
				if (samples.caDollarPrice.length < 3) samples.caDollarPrice.push(rel);
			}
			if (CA_BROKEN_CAD.test(body)) {
				counts.caBrokenCad++;
				if (samples.caBrokenCad.length < 3) samples.caBrokenCad.push(rel);
			}
			if (CA_MIXED.test(body)) {
			 counts.caMixedCurrency++;
			 if (samples.caMixedCurrency.length < 3) samples.caMixedCurrency.push(rel);
			}
		}
	}
}

for (const market of ['de', 'it', 'es']) {
	const root = path.join(dist, market);
	if (!fs.existsSync(root)) continue;
	for (const file of walk(root)) {
		const rel = relPosix(dist, file);
		const html = fs.readFileSync(file, 'utf8');
		if (/about \$0|about \$[\d]–\$[\d]/.test(html)) {
			counts.euLangDollarCost++;
			if (samples.euLangDollarCost.length < 3) samples.euLangDollarCost.push(rel);
		}
	}
}

/** Compteurs de santé (liens /go/ → /dp/ attendus), ne font pas échouer le build. */
const INFO_ONLY = new Set(['servedCaDp', 'servedComDp']);

console.log(JSON.stringify({ counts, samples, infoOnly: [...INFO_ONLY] }, null, 2));
const bad = Object.entries(counts).some(([k, n]) => n > 0 && !INFO_ONLY.has(k));
if (bad) process.exit(1);