#!/usr/bin/env node
/**
 * Vérifie que chaque image locale référencée dans dist HTML existe sous dist/.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { relPosix, toPosixPath } from './rel-posix.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.resolve(process.argv[2] || 'dist');

const SKIP_PREFIX = /^(?:https?:|data:|\/\/|\/pagefind\/|\/_astro\/|mailto:|tel:|javascript:)/i;
const IMAGE_EXT = /\.(?:avif|gif|jpe?g|png|svg|webp)(?:\?|#|$)/i;

function stripQuery(ref) {
	return ref.split('#')[0].split('?')[0];
}

function walkHtml(dir, out = []) {
	for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
		const p = path.join(dir, ent.name);
		if (ent.isDirectory()) walkHtml(p, out);
		else if (ent.name.endsWith('.html')) out.push(p);
	}
	return out;
}

function extractLocalRefs(html) {
	const refs = [];
	const push = (raw) => {
		const u = raw.trim();
		if (!u || u.length < 4 || SKIP_PREFIX.test(u)) return;
		const bare = stripQuery(u);
		if (!IMAGE_EXT.test(bare)) return;
		if (/\.href|location\.|function\s*\(|@import/i.test(u)) return;
		refs.push(u);
	};
	for (const m of html.matchAll(/\b(?:src|data-src)=["']([^"']+)["']/gi)) push(m[1]);
	for (const m of html.matchAll(/\bsrcset=["']([^"']+)["']/gi)) {
		for (const part of m[1].split(',')) push(part.trim().split(/\s+/)[0]);
	}
	for (const m of html.matchAll(
		/<meta[^>]+(?:property=["'](?:og:image|twitter:image)["']|name=["']twitter:image["'])[^>]+content=["']([^"']+)["'][^>]*>/gi,
	)) {
		push(m[1]);
	}
	for (const m of html.matchAll(
		/<meta[^>]+content=["']([^"']+)["'][^>]+(?:property=["'](?:og:image|twitter:image)["']|name=["']twitter:image["'])[^>]*>/gi,
	)) {
		push(m[1]);
	}
	for (const m of html.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)) push(m[1]);
	return refs;
}

function resolveTarget(htmlFile, ref) {
	const clean = stripQuery(ref);
	if (!clean || SKIP_PREFIX.test(clean)) return null;
	if (clean.startsWith('/')) {
		return path.join(dist, clean.replace(/^\//, '').split('/').join(path.sep));
	}
	const base = path.dirname(htmlFile);
	return path.normalize(path.join(base, clean.split('/').join(path.sep)));
}

function isMissing(target) {
	if (!target) return false;
	if (!fs.existsSync(target)) return true;
	try {
		return fs.statSync(target).isDirectory();
	} catch {
		return true;
	}
}

const broken = [];
const seen = new Set();

for (const htmlFile of walkHtml(dist)) {
	const relPage = relPosix(dist, htmlFile);
	const html = fs.readFileSync(htmlFile, 'utf8');
	for (const ref of extractLocalRefs(html)) {
		const target = resolveTarget(htmlFile, ref);
		if (!isMissing(target)) continue;
		const key = `${relPage}\0${stripQuery(ref)}`;
		if (seen.has(key)) continue;
		seen.add(key);
		const targetPosix = target ? toPosixPath(path.relative(dist, target)) : stripQuery(ref);
		broken.push({ page: relPage, ref: stripQuery(ref), target: targetPosix });
	}
}

const report = { dist: toPosixPath(dist), broken: broken.length, samples: broken.slice(0, 30) };
console.log(JSON.stringify(report, null, 2));
if (broken.length) {
	console.error(`[verify-local-images-dist] ${broken.length} image(s) locale(s) cassée(s)`);
	for (const b of broken.slice(0, 15)) {
		console.error(`  ${b.page} → ${b.ref}`);
	}
	process.exit(1);
}