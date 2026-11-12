#!/usr/bin/env node
/**
 * Ajoute au sitemap les hreflang (xhtml:link) déclarés dans le <head> de chaque page,
 * uniquement quand le lien est réciproque et que la page cible existe dans le dist.
 * 11/11/2026 : le sitemap n'avait aucun hreflang (part 0 %).
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = process.argv[2] || 'dist';
const site = 'https://robot-educatif.info';

const norm = (u) => {
	try {
		const url = new URL(u, site);
		if (url.host.replace(/^www\./, '') !== 'robot-educatif.info') return '';
		let p = url.pathname.replace(/\/index\.html$/, '/');
		if (!p.endsWith('/') && !/\.[a-z0-9]+$/i.test(p)) p += '/';
		return p;
	} catch { return ''; }
};
const fileFor = (p) => join(dist, decodeURIComponent(p).replace(/^\//, ''), 'index.html');
const cache = new Map();
function alternates(p) {
	if (cache.has(p)) return cache.get(p);
	let out = null;
	const f = fileFor(p);
	if (existsSync(f)) {
		const raw = readFileSync(f, 'utf8');
		const end = raw.search(/<\/head>/i);
		const head = end < 0 ? raw : raw.slice(0, end);
		if (!/<meta[^>]+name=["']robots["'][^>]+noindex/i.test(head)) {
			out = [];
			for (const tag of head.match(/<link\b[^>]*>/gi) || []) {
				if (!/rel=["']alternate["']/i.test(tag)) continue;
				const hl = (tag.match(/hreflang=["']([^"']+)["']/i) || [])[1];
				const href = (tag.match(/href=["']([^"']+)["']/i) || [])[1];
				if (!hl || !href) continue;
				const key = norm(href);
				if (key) out.push({ hl, key });
			}
		}
	}
	cache.set(p, out);
	return out;
}

let urls = 0, withLinks = 0, links = 0;
for (const name of readdirSync(dist)) {
	if (!/^sitemap.*\.xml$/.test(name)) continue;
	const abs = join(dist, name);
	let xml = readFileSync(abs, 'utf8');
	if (!/<urlset\b/i.test(xml)) continue;
	if (!/xmlns:xhtml=/.test(xml)) xml = xml.replace(/<urlset\b/, '<urlset xmlns:xhtml="http://www.w3.org/1999/xhtml"');
	xml = xml.replace(/<url>([\s\S]*?)<\/url>/g, (block, inner) => {
		urls += 1;
		if (/<xhtml:link\b/.test(inner)) return block;
		const loc = (inner.match(/<loc>([^<]+)<\/loc>/) || [])[1];
		const self = loc ? norm(loc) : '';
		const alts = self ? alternates(self) : null;
		if (!alts || alts.length < 2) return block;
		const seen = new Set();
		const kept = [];
		for (const { hl, key } of alts) {
			if (seen.has(hl)) continue;
			if (key !== self) {
				const back = alternates(key);
				if (!back || !back.some((a) => a.key === self)) continue;
			}
			seen.add(hl);
			kept.push(`<xhtml:link rel="alternate" hreflang="${hl}" href="${site}${key}"/>`);
		}
		if (kept.filter((k) => !k.includes('x-default')).length < 2) return block;
		withLinks += 1;
		links += kept.length;
		return `<url>${inner}${kept.join('')}</url>`;
	});
	writeFileSync(abs, xml);
}
console.log(`sitemap-hreflang : ${withLinks}/${urls} URL avec hreflang, ${links} liens`);
