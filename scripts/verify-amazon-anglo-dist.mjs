#!/usr/bin/env node
/** Contrôles post-go-links sur dist/en, dist/uk, dist/ca (CONSIGNES PR41 v2 + v3). */
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve(process.argv[2] || 'dist');
const roots = ['en', 'uk', 'ca'].map((m) => path.join(dist, m)).filter((d) => fs.existsSync(d));
const tablePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'go-table.json');
const table = JSON.parse(fs.readFileSync(tablePath, 'utf8'));
const links = table.links || table;
const prod = new Set(Object.keys(links));

const HOST_LABEL = {
	'amazon.com': /Amazon\.com(?![.\w-])/i,
	'amazon.co.uk': /Amazon\.co\.uk|Amazon UK/i,
	'amazon.ca': /Amazon\.ca(?![.\w-])/i,
};

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
};
const samples = {
	caDp: [],
	comDp: [],
	frHost: [],
	amazonComLabel: [],
	euro: [],
	servedCaDp: [],
	servedComDp: [],
	labelMismatch: [],
	noAffiliateTag: [],
	ukDollarPrice: [],
	caPoundPrice: [],
};

const UK_DOLLAR_PRICE =
	/(?:~|around|about|roughly|often)\s*\$[\d]|~\$[\d]|\$[\d][\d.,]*\s*–\s*\$[\d]|(?<=[\s(>~])\$[\d]{2,}(?:–[\d]+)?/;
const CA_POUND_PRICE = /(?:~|around|about|roughly|often)\s*£[\d]|~£[\d]|£[\d][\d.,]*\s*–\s*£[\d]|(?<=[\s(>~])£[\d]{2,}/;

function hostFromHref(href) {
	const m = href.match(/amazon\.(com|co\.uk|ca)/i);
	return m ? `amazon.${m[1].toLowerCase()}` : null;
}

function labelForHost(host) {
	if (host === 'amazon.com') return 'Amazon.com';
	if (host === 'amazon.co.uk') return /Amazon\.co\.uk|Amazon UK/i;
	if (host === 'amazon.ca') return /Amazon\.ca/i;
	return null;
}

for (const root of roots) {
	const market = path.basename(root);
	for (const file of walk(root)) {
		const rel = path.relative(dist, file);
		if (/\/partners\//.test(rel)) continue;
		const html = fs.readFileSync(file, 'utf8');
		if (/amazon\.ca\/dp\//i.test(html)) {
			counts.caDp++;
			if (samples.caDp.length < 3) samples.caDp.push(rel);
		}
		if (/amazon\.com\/dp\//i.test(html)) {
			counts.comDp++;
			if (samples.comDp.length < 3) samples.comDp.push(rel);
		}
		if (/amazon\.fr/i.test(html)) {
			counts.frHost++;
			if (samples.frHost.length < 3) samples.frHost.push(rel);
		}
		if (market !== 'en' && /Amazon\.com(?![.\w-])/i.test(html)) {
			counts.amazonComLabel++;
			if (samples.amazonComLabel.length < 3) samples.amazonComLabel.push(rel);
		}
		if (/€|&euro;|&#8364;/i.test(html)) {
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
		if (market === 'uk' && UK_DOLLAR_PRICE.test(html)) {
			counts.ukDollarPrice++;
			if (samples.ukDollarPrice.length < 3) samples.ukDollarPrice.push(rel);
		}
		if (market === 'ca' && CA_POUND_PRICE.test(html)) {
			counts.caPoundPrice++;
			if (samples.caPoundPrice.length < 3) samples.caPoundPrice.push(rel);
		}
	}
}

console.log(JSON.stringify({ counts, samples }, null, 2));
const bad =
	counts.caDp ||
	counts.comDp ||
	counts.frHost ||
	counts.amazonComLabel ||
	counts.euro ||
	counts.oneAround ||
	counts.missingGo ||
	counts.servedCaDp ||
	counts.servedComDp ||
	counts.labelMismatch ||
	counts.noAffiliateTag ||
	counts.ukDollarPrice ||
	counts.caPoundPrice;
if (bad) process.exit(1);