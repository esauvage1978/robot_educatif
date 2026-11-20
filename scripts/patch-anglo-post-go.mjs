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

function patchJsonStrings(html, fn) {
	return html.replace(/<script\b[\s\S]*?<\/script>/gi, (block) =>
		block.replace(/"(?:[^"\\]|\\.)*"/g, (str) => fn(str)),
	);
}

/** Devises crédibles sans conversion fine (revue devises v4). */
function localizeMoney(html, market) {
	html = html.replace(/, no affiliate tag/gi, '');
	html = html.replace(/about \$about/gi, 'about');
	html = html.replace(/\b(about|around|roughly|often)\s+\1\b/gi, '$1');
	const fixGluedMoney = (s) =>
		s
			.replace(/snapshot\$(\d[\d.,]*)/gi, (_, n) => `snapshot, around $${n}`)
			.replace(/([a-z])\.(\$\d[\d.,]*)/gi, (_, letter, amt) => `${letter}. ${amt}`)
			.replace(/([a-z])(\$\d[\d.,]*)/g, (_, letter, amt) => `${letter} ${amt}`);
	if (market === 'uk') {
		const toPound = (s) => {
			let t = fixGluedMoney(s)
				.replace(/<strong>Cost:<\/strong>\s*\$0\b/gi, '<strong>Cost:</strong> No extra parts cost')
				.replace(/<strong>Budget<\/strong>\s*\$0\b/gi, '<strong>Budget</strong> £0')
				.replace(/\bCost:\s*\$0\b/gi, 'Cost: No extra parts cost')
				.replace(/\bBudget\s+\$0\b/gi, 'Budget £0')
				.replace(/about £(\d[\d.,]*)\s*–\s*\$(\d[\d.,]*)/gi, (_, a, b) => `about £${a}–£${b}`)
				.replace(/\b(around|about|roughly|often)\s+\$(\d[\d.,]*)/gi, (_, lead, n) => `${lead} £${n}`)
				.replace(/~\$(\d[\d.,]*)/g, (_, n) => `~£${n}`)
				.replace(/\$(\d[\d.,]*)\s*–\s*\$(\d[\d.,]*)/g, (_, a, b) => `£${a}–£${b}`)
				.replace(/\$200–500/g, '£200–500')
				.replace(/(?<![A-Za-z/])\$(\d[\d.,]+)/g, (_, n) => `£${n}`);
			return t;
		};
		html = toPound(html);
		html = patchJsonStrings(html, toPound);
	}
	if (market === 'ca') {
		const toCad = (s) => {
			let t = fixGluedMoney(s)
				.replace(/<strong>£0<\/strong>/gi, '<strong>No cost</strong>')
				.replace(/\b£0\b/g, 'CA$0')
				.replace(/<title>([^<]*)<\/title>/gi, (_, title) => {
					const nt = title
						.replace(/\bunder \$110\b/gi, 'under CA$110')
						.replace(/\bunder \$55\b/gi, 'under CA$55')
						.replace(/\bunder \$([\d]+)/gi, (_, n) => `under CA$${n}`);
					return `<title>${nt}</title>`;
				})
				.replace(/content="([^"]*)"\s*\/?>/gi, (full, content) => {
					if (!/description|og:title|twitter:title/i.test(full)) return full;
					const nc = content
						.replace(/\bunder \$110\b/gi, 'under CA$110')
						.replace(/\bunder \$55\b/gi, 'under CA$55');
					return full.replace(content, nc);
				})
				.replace(/£(\d[\d.,]*)\s*\/\s*\$(\d[\d.,]*)/gi, (_, _a, b) => `CA$${b}`)
				.replace(/CA\$(\d[\d.,]*)–£(\d[\d.,]*)/gi, (_, a, b) => `CA$${a}–CA$${b}`)
				.replace(/CA\$(\d[\d.,]*)–\$(\d[\d.,]*)/gi, (_, a, b) => `CA$${a}–CA$${b}`)
				.replace(/\+\s*£(\d[\d.,]*)–(\d[\d.,]*)/gi, (_, a, b) => `+CA$${a}–${b}`)
				.replace(/budget\s*\+\s*£/gi, 'budget +CA$')
				.replace(/\$(\d{1,3}(?:,\d{3})+)(?!\d)/g, (_, n) => `CA$${n}`)
				.replace(/\b(around|about|roughly|often)\s+£(\d[\d.,]*)/gi, (_, lead, n) => `${lead} CA$${n}`)
				.replace(/\b(around|about|roughly|often)\s+\$(\d[\d.,]*)/gi, (_, lead, n) => `${lead} CA$${n}`)
				.replace(/~£(\d[\d.,]*)/g, (_, n) => `CA$${n}`)
				.replace(/~\$(\d[\d.,]*)/g, (_, n) => `CA$${n}`)
				.replace(/£(\d[\d.,]*)\s*–\s*£(\d[\d.,]*)/g, (_, a, b) => `CA$${a}–CA$${b}`)
				.replace(/£(\d[\d.,]*)\s*–\s*\$(\d[\d.,]*)/g, (_, a, b) => `CA$${a}–CA$${b}`)
				.replace(/(?<![A-Za-z/])£(\d[\d.,]+)/g, (_, n) => `CA$${n}`)
				.replace(/(?<![A-Za-z/])\$(\d[\d.,]+)/g, (_, n) => `CA$${n}`);
			return t;
		};
		html = toCad(html);
		html = patchJsonStrings(html, toCad);
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