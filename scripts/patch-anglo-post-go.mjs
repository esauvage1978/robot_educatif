#!/usr/bin/env node
/**
 * Après go-links : un seul lien boutique par marché, libellés cohérents, devises UK/CA,
 * suppression du texte « no affiliate tag » (CONSIGNES PR41 v3).
 */
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve(process.argv[2] || 'dist');
const TABLE = JSON.parse(
	fs.readFileSync(path.join(path.dirname(new URL(import.meta.url).pathname), 'go-table.json'), 'utf8'),
);
const links = TABLE.links || TABLE;

const SHOP = {
	en: { prefix: 'az-us', label: 'Amazon.com', drop: ['az-gb', 'az-ca'] },
	uk: { prefix: 'az-gb', label: 'Amazon.co.uk', drop: ['az-us', 'az-ca'] },
	ca: { prefix: 'az-ca', label: 'Amazon.ca', drop: ['az-us', 'az-gb'] },
};

function walk(d, acc = []) {
	for (const e of fs.readdirSync(d, { withFileTypes: true })) {
		const p = path.join(d, e.name);
		if (e.isDirectory()) walk(p, acc);
		else if (e.name.endsWith('.html')) acc.push(p);
	}
	return acc;
}

function stripForeignGoLinks(html, market) {
	const { drop } = SHOP[market];
	for (const p of drop) {
		const re = new RegExp(
			`\\s*(?:·|,)\\s*<a\\b[^>]*href=(["'])/go/${p}-[a-f0-9]{10}/?\\1[^>]*>[\\s\\S]*?</a>`,
			'gi',
		);
		html = html.replace(re, '');
		html = html.replace(
			new RegExp(`<a\\b[^>]*href=(["'])/go/${p}-[a-f0-9]{10}/?\\1[^>]*>[\\s\\S]*?</a>\\s*(?:·|,)\\s*`, 'gi'),
			'',
		);
	}
	return html;
}

function relabelGoAmazonLinks(html, market) {
	const { label, prefix } = SHOP[market];
	return html.replace(
		/<a\b([^>]*href=(["'])\/go\/(az-(?:gb|ca|us)-[a-f0-9]{10})\/?\2[^>]*)>([\s\S]*?)<\/a>/gi,
		(full, attrs, _q, goPath, inner) => {
			const id = goPath.replace(/^\/go\//, '').replace(/\/$/, '');
			if (!id.startsWith(prefix)) return full;
			const text = inner.replace(/<[^>]+>/g, '').trim();
			if (/Amazon\.(com|co\.uk|ca)|Amazon UK/i.test(text) && text !== label) {
				return `<a${attrs}>${label}</a>`;
			}
			if (!/Amazon/i.test(text)) return full;
			return `<a${attrs}>${label}</a>`;
		},
	);
}

function relabelDirectAmazon(html, market) {
	const host =
		market === 'uk' ? 'amazon.co.uk' : market === 'ca' ? 'amazon.ca' : 'amazon.com';
	const label = SHOP[market].label;
	return html.replace(
		/<a\b([^>]*href=(["'])https?:\/\/[^"']*amazon\.[^"']*\2[^>]*)>([\s\S]*?)<\/a>/gi,
		(full, attrs, _q, inner) => {
			const href = attrs.match(/href=(["'])([^"']+)\1/i)?.[2] || '';
			if (!new RegExp(host, 'i').test(href)) return full;
			const plain = inner.replace(/<[^>]+>/g, '');
			if (/Amazon\.(com|co\.uk|ca)|Amazon UK/i.test(plain) && plain !== label) {
				return `<a${attrs}>${label}</a>`;
			}
			return full;
		},
	);
}

/** Devises crédibles sans conversion fine (v3). */
function localizeMoney(html, market) {
	html = html.replace(/, no affiliate tag/gi, '');
	const inScript = (s, fn) =>
		s.replace(/<script\b[\s\S]*?<\/script>/gi, (block) =>
			block.replace(/"(?:[^"\\]|\\.)*"/g, (str) => fn(str)),
		);
	if (market === 'uk') {
		const toPound = (s) =>
			s
				.replace(/\b(around|about|roughly|often)\s+\$(\d[\d.,]*)/gi, '$1 £$2')
				.replace(/~\$(\d[\d.,]*)/g, '~£$1')
				.replace(/\$(\d[\d.,]*)\s*–\s*\$(\d[\d.,]*)/g, '£$1–£$2')
				.replace(/(?<=[>~(\s])\$(\d[\d.,]+)/g, '£$1')
				.replace(/\$200–500/g, '£200–500')
				.replace(/\$([\d]{2,})\b/g, '£$1');
		html = toPound(html);
		html = inScript(html, toPound);
	}
	if (market === 'ca') {
		const toCad = (s) =>
			s
				.replace(/£(\d[\d.,]*)\s*\/\s*\$(\d[\d.,]*)/gi, 'CA$$2')
				.replace(/\b(around|about|roughly|often)\s+£(\d[\d.,]*)/gi, '$1 CA$$2')
				.replace(/\b(around|about|roughly|often)\s+\$(\d[\d.,]*)/gi, '$1 CA$$2')
				.replace(/~£(\d[\d.,]*)/g, 'CA$$$1')
				.replace(/~\$(\d[\d.,]*)/g, 'CA$$$1')
				.replace(/£(\d[\d.,]*)\s*–\s*£(\d[\d.,]*)/g, 'CA$$1–CA$$2')
				.replace(/(?<=[>~(\s])£(\d[\d.,]+)/g, 'CA$$$1');
		html = toCad(html);
		html = inScript(html, toCad);
	}
	return html;
}

function patchMarket(market) {
	const root = path.join(dist, market);
	if (!fs.existsSync(root)) return 0;
	let n = 0;
	for (const file of walk(root)) {
		let html = fs.readFileSync(file, 'utf8');
		const before = html;
		html = stripForeignGoLinks(html, market);
		html = relabelGoAmazonLinks(html, market);
		html = relabelDirectAmazon(html, market);
		html = localizeMoney(html, market);
		if (html !== before) {
			fs.writeFileSync(file, html);
			n++;
		}
	}
	console.log(`[patch-anglo-post-go] ${market}: ${n} html patched`);
	return n;
}

for (const m of ['en', 'uk', 'ca']) patchMarket(m);