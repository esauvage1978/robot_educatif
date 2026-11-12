#!/usr/bin/env node
// Écrit dans les tableaux HTML le prix du relevé Amazon (src/data/amazon-latest*.json).
import fs from 'node:fs';
import path from 'node:path';
import { amazonDpUrl, fmtMarketPrice } from '../src/lib/amazonMarket.mjs';
import {
	CHECK_PRICE,
	isPriceCellText,
	isPriceColumnLabel,
	localeForMarket,
	resolveRowAsin,
} from '../src/lib/amazonPriceMatch.mjs';

const SNAP = {
	fr: 'amazon-latest.json',
	uk: 'amazon-latest-uk.json',
	de: 'amazon-latest-de.json',
	it: 'amazon-latest-it.json',
	es: 'amazon-latest-es.json',
};
const CURRENCY = { fr: 'EUR', uk: 'GBP', de: 'EUR', it: 'EUR', es: 'EUR' };
const ROOT = process.cwd();
const snapCache = {};

function amazonOffer(market, asin) {
	const file = SNAP[market];
	if (!file || !asin) return null;
	if (!snapCache[market]) {
		snapCache[market] = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data', file), 'utf8'));
	}
	const row = snapCache[market].items?.[String(asin).toUpperCase()];
	if (!row || row.dispo === false || row.prix == null) return null;
	if (row.devise && row.devise !== CURRENCY[market]) return null;
	return { label: fmtMarketPrice(row.prix, market) };
}

function marketOf(file) {
	const rel = file.replace(/\\/g, '/');
	if (rel.includes('/src/pages/de/') || rel.includes('/src/content/de/')) return 'de';
	if (rel.includes('/src/pages/it/') || rel.includes('/src/content/it/')) return 'it';
	if (rel.includes('/src/pages/es/') || rel.includes('/src/content/es/')) return 'es';
	if (rel.includes('/src/pages/en/') || rel.includes('/src/content/en/')) return 'uk';
	if (rel.includes('/src/pages/ca/') || rel.includes('/src/pages/us/')) return null;
	return 'fr';
}

function firstCellText(row) {
	const m = /<td\b[^>]*>([\s\S]*?)<\/td>/i.exec(row);
	return m ? m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 80) : '';
}

export function rewriteHtmlPrices(html, market) {
	if (!market || !html.includes('<tr')) return html;
	const locale = localeForMarket(market);
	return html.replace(/<tr\b[\s\S]*?<\/tr>/gi, (row) => {
		const plain = row.replace(/<[^>]+>/g, ' ');
		if (/mbot\s*2\s*rover|mbot2 rover/i.test(plain)) {
			const check = CHECK_PRICE[locale] || CHECK_PRICE.fr;
			const host = { fr: 'www.amazon.fr', uk: 'www.amazon.co.uk', de: 'www.amazon.de', nl: 'www.amazon.nl', it: 'www.amazon.it', es: 'www.amazon.es' }[market];
			const tag = { fr: 'manuso06-21', uk: 'roboteducatif-21', de: 'roboteducat00-21', nl: 'manuso0607-21', it: 'roboteducat0f-21', es: 'roboteducat07-21' }[market];
			let fixed = row.replace(
				/(data-amazon-price="1">)[^<]+/,
				`$1${check}`,
			);
			fixed = fixed.replace(
				/href="https:\/\/www\.amazon\.[^"]*"/,
				`href="https://${host}/s?k=${encodeURIComponent('Makeblock mBot2 Rover')}&tag=${tag}"`,
			);
			return fixed;
		}
		const asin = resolveRowAsin(plain);
		if (!asin) return row;
		const offer = amazonOffer(market, asin);
		const label = offer ? offer.label : CHECK_PRICE[locale] || CHECK_PRICE.fr;
		let next = row.replace(/<td(\s[^>]*)>([\s\S]*?)<\/td>/gi, (full, attrs, inner) => {
			const dataLabel = /data-label="([^"]*)"/i.exec(attrs)?.[1] || '';
			const plain = inner.replace(/<[^>]+>/g, ' ');
			if (!isPriceColumnLabel(dataLabel) && !isPriceCellText(plain)) return full;
			if (plain.includes(label) && /data-amazon-price="1"/.test(inner)) return full;
			return `<td${attrs}><span class="td-val" data-amazon-price="1">${label}</span></td>`;
		});
		if (offer) {
			const query = firstCellText(row).replace(/"/g, '');
			next = next.replace(/href="https:\/\/www\.amazon\.[^"]*"/gi, (hrefAttr) => {
				const same = new RegExp(asin, 'i').test(hrefAttr) || /\/s\?/.test(hrefAttr);
				if (!same) return hrefAttr;
				const q = query ? ` data-amazon-query="${query}"` : '';
				return `href="${amazonDpUrl(asin, market)}"${q}`;
			});
		}
		return next;
	});
}

function walk(dir, out = []) {
	for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
		if (['node_modules', 'dist', '.git', '.astro'].includes(ent.name)) continue;
		const p = path.join(dir, ent.name);
		if (ent.isDirectory()) walk(p, out);
		else if (/\.(md|mdx|astro|html)$/.test(ent.name)) out.push(p);
	}
	return out;
}

const files = walk(path.join(ROOT, 'src'));
let changed = 0;
let cells = 0;
for (const file of files) {
	const market = marketOf(file);
	if (!market) continue;
	const before = fs.readFileSync(file, 'utf8');
	const after = rewriteHtmlPrices(before, market);
	if (after !== before) {
		cells += (after.match(/data-amazon-price="1"/g) || []).length - (before.match(/data-amazon-price="1"/g) || []).length;
		fs.writeFileSync(file, after);
		changed += 1;
	}
}
console.log(`[apply-amazon-prices] ${changed} fichiers, ${cells} cellules`);
