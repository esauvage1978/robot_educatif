#!/usr/bin/env node
/**
 * Après mirror-en-to-uk-ca : dans dist/uk et dist/ca, remplace les /go/az-us-* (et autres
 * marchés hors cible) par az-gb-* / az-ca-* via scripts/go-table.json, ou réécrit l’hôte Amazon.
 * Supprime les fragments #x26;tag= sur les URL Amazon restantes dans le HTML.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const dist = path.resolve(process.argv[2] || 'dist');
const TABLE_FILE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'go-table.json');

const LOCS = {
	uk: { cc: 'gb', host: 'www.amazon.co.uk', tag: 'roboteducatif-21', prefix: 'az-gb' },
	ca: { cc: 'ca', host: 'www.amazon.ca', tag: 'roboteducat03-20', prefix: 'az-ca' },
};

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
		if (!/amazon\./i.test(u.hostname)) return url;
		u.hostname = cfg.host;
		u.searchParams.set('tag', cfg.tag);
		u.hash = '';
		return u.toString();
	} catch {
		return url;
	}
}

function targetAmazonForLoc(oldId, loc) {
	const entry = links[oldId];
	if (!entry?.url) return null;
	return retargetAmazonUrl(entry.url, loc);
}

/** Ne retourne un id que s'il existe déjà dans la table (append-only). */
function goIdForLoc(oldId, loc) {
	const target = targetAmazonForLoc(oldId, loc);
	if (!target) return null;
	const existing = urlToId.get(target);
	return existing && links[existing] ? existing : null;
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
	const cfg = LOCS[loc];
	let html = fs.readFileSync(file, 'utf8');
	const before = html;

	html = html.replace(
		/href=(["'])(\/go\/(az-(?:gb|ca|us|fr|de|it|es|nl|be)-[\w-]+)\/?)\1/gi,
		(full, q, hrefPath, oldId) => {
			const cur = oldId.match(/^az-(\w+)/)?.[1];
			if (cur === cfg.cc) return full;
			const newId = goIdForLoc(oldId, loc);
			if (newId) return `href=${q}/go/${newId}/${q}`;
			const target = targetAmazonForLoc(oldId, loc);
			if (!target) return full;
			return `href=${q}${target}${q}`;
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

if (!total) console.warn('[retarget-go-uk-ca] aucun HTML sous dist/uk ou dist/ca');