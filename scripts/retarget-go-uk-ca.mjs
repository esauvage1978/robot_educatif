#!/usr/bin/env node
/**
 * Après go-links (uk/ca) : remplace les /go/az-us-*, /go/az-fr-*, etc. par l’id du marché
 * local quand la table go-table.json a la fiche, et réécrit tout Amazon direct restant en /go/<id>/.
 * Jamais de /s?k= ni de href Amazon brut dans le HTML.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import {
	buildSearchAsinIndex,
	isGenericPythonBookQuery,
	resolveSearchQuery,
} from './lib/amazon-search-resolve.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.resolve(process.argv[2] || 'dist');
const TABLE_FILE = path.join(ROOT, 'scripts/go-table.json');

const LOCS = {
	uk: { cc: 'gb', host: 'www.amazon.co.uk', tag: 'roboteducatif-21', prefix: 'az-gb' },
	ca: { cc: 'ca', host: 'www.amazon.ca', tag: 'roboteducat03-20', prefix: 'az-ca' },
};

const SEARCH_INDEX = buildSearchAsinIndex();
const raw = JSON.parse(fs.readFileSync(TABLE_FILE, 'utf8'));
const links = raw.links || raw;
const urlToId = new Map();
for (const [id, e] of Object.entries(links)) {
	if (e?.url && !urlToId.has(e.url)) urlToId.set(e.url, id);
}

const TLD_COUNTRY = {
	fr: 'FR',
	de: 'DE',
	it: 'IT',
	es: 'ES',
	nl: 'NL',
	'co.uk': 'GB',
	com: 'US',
	ca: 'CA',
};

function classifyPrefix(url) {
	try {
		const u = new URL(url);
		const m = u.hostname.toLowerCase().match(/amazon\.(fr|de|it|es|nl|co\.uk|com|ca)$/);
		if (!m) return 'az-xx';
		const cc = (TLD_COUNTRY[m[1]] || 'xx').toLowerCase();
		return cc === 'us' ? 'az-us' : `az-${cc}`;
	} catch {
		return 'az-xx';
	}
}

function idFor(url) {
	const existing = urlToId.get(url);
	if (existing) return existing;
	const prefix = classifyPrefix(url);
	return prefix + '-' + crypto.createHash('sha1').update(url).digest('hex').slice(0, 10);
}

function retargetAmazonUrl(url, loc) {
	const cfg = LOCS[loc];
	try {
		const u = new URL(url);
		if (!/amazon\./i.test(u.hostname)) return null;
		let asin = u.pathname.match(/\/dp\/([^/]+)/i)?.[1];
		if (!asin && /\/s\?k=/i.test(url)) {
			const k = decodeURIComponent(u.searchParams.get('k') || '');
			if (k && !isGenericPythonBookQuery(k)) asin = resolveSearchQuery(k, SEARCH_INDEX);
		}
		if (asin) {
			return `https://${cfg.host}/dp/${encodeURIComponent(asin)}?tag=${encodeURIComponent(cfg.tag)}`;
		}
		u.hostname = cfg.host;
		u.searchParams.set('tag', cfg.tag);
		u.searchParams.delete('k');
		if (/\/s\?/i.test(u.pathname + u.search)) return null;
		return u.toString();
	} catch {
		return null;
	}
}

function ensureGoId(targetUrl) {
	if (!targetUrl) return null;
	let id = urlToId.get(targetUrl);
	if (!id) {
		id = idFor(targetUrl);
		try {
			const u = new URL(targetUrl);
			const m = u.hostname.match(/amazon\.(fr|de|it|es|nl|co\.uk|com|ca)/i);
			const country = m ? (TLD_COUNTRY[m[1].toLowerCase()] || '') : '';
			links[id] = {
				url: targetUrl,
				merchant: 'amazon',
				country,
				tag: u.searchParams.get('tag') || '',
			};
			urlToId.set(targetUrl, id);
		} catch {
			return null;
		}
	}
	return id;
}

function targetAmazonForLoc(oldId, loc) {
	const entry = links[oldId];
	if (!entry?.url) return null;
	return retargetAmazonUrl(entry.url, loc);
}

function goIdForLoc(oldId, loc) {
	const target = targetAmazonForLoc(oldId, loc);
	if (!target) return null;
	const existing = urlToId.get(target);
	return existing && links[existing] ? existing : ensureGoId(target);
}

function walkHtml(dir, acc = []) {
	if (!fs.existsSync(dir)) return acc;
	for (const name of fs.readdirSync(dir)) {
		const p = path.join(dir, name);
		const st = fs.statSync(p);
		if (st.isDirectory()) walkHtml(p, acc);
		else if (name.endsWith('.html')) acc.push(p);
	}
	return acc;
}

function patchFile(file, loc) {
	let html = fs.readFileSync(file, 'utf8');
	const before = html;

	html = html.replace(
		/href=(["'])(\/go\/(az-(?:gb|ca|us|fr|de|it|es|nl|be)-[\w-]+)\/?)\1/gi,
		(full, q, hrefPath, oldId) => {
			const cfg = LOCS[loc];
			const cur = oldId.match(/^az-(\w+)/)?.[1];
			if (cur === cfg.cc) return full;
			const newId = goIdForLoc(oldId, loc);
			if (newId) return `href=${q}/go/${newId}/${q}`;
			return full;
		},
	);

	html = html.replace(
		/href=(["'])(https?:\/\/[^"']*amazon\.[^"']*)\1/gi,
		(full, q, url) => {
			const target = retargetAmazonUrl(url, loc);
			if (!target) return full;
			const id = ensureGoId(target);
			return id ? `href=${q}/go/${id}/${q}` : full;
		},
	);

	html = html.replace(/#x26;tag=[^"'&\s<>#]*/gi, '');
	html = html.replace(
		/(https?:\/\/[^"'\s<>]*amazon\.[^"'\s<>]*?)#x26;tag=[^"'&\s<>#]*/gi,
		'$1',
	);

	if (html !== before) fs.writeFileSync(file, html);
	return html !== before;
}

let total = 0;
let tableDirty = false;
for (const loc of ['uk', 'ca']) {
	const root = path.join(dist, loc);
	const files = walkHtml(root);
	let n = 0;
	for (const f of files) {
		total++;
		if (patchFile(f, loc)) n++;
	}
	console.log(`[retarget-go-uk-ca] ${loc}: ${files.length} html, ${n} patched`);
}

const beforeCount = raw.count ?? Object.keys(raw.links || raw).length;
if (Object.keys(links).length !== beforeCount) tableDirty = true;
if (tableDirty) {
	raw.links = links;
	raw.count = Object.keys(links).length;
	raw.updated = new Date().toISOString();
	fs.writeFileSync(TABLE_FILE, JSON.stringify(raw, null, 1) + '\n');
}

if (!total) console.warn('[retarget-go-uk-ca] aucun HTML sous dist/uk ou dist/ca');