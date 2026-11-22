#!/usr/bin/env node
/**
 * Chaque URL du snapshot sitemap live doit être :
 * - un fichier dans dist (html ou pdf), ou
 * - une redirection 301 documentée dans scripts/data/sitemap-live-url-treatments.json
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.resolve(process.argv[2] || 'dist');
const snapshotPath = path.join(ROOT, 'scripts/data/sitemap-live-snapshot.json');
const treatmentsPath = path.join(ROOT, 'scripts/data/sitemap-live-url-treatments.json');
const htaccess = fs.readFileSync(path.join(ROOT, 'public/.htaccess'), 'utf8');

const snapshot = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));
const treatments = JSON.parse(fs.readFileSync(treatmentsPath, 'utf8'));
const redirectMap = new Map();
for (const e of treatments.entries || []) {
	if (e.treatment === 'redirect_301' && e.redirectTarget) {
		redirectMap.set(e.path.replace(/\/$/, ''), e.redirectTarget);
	}
}

/** Règles RewriteRule ^source$ dest [R=301] dans .htaccess (chemins sans domaine). */
const htRedirects = new Map();
for (const m of htaccess.matchAll(/RewriteRule\s+\^([^\s]+)\$\s+([^\s]+)\s+\[R=301/gi)) {
	const from = m[1].replace(/\\\//g, '/').replace(/^\^?/, '').replace(/\$$/, '');
	let to = m[2];
	redirectMap.set(from.replace(/\/$/, ''), to);
	htRedirects.set(from, to);
}

function distHasUrl(url) {
	const p = url.replace('https://robot-educatif.info', '').replace(/^\//, '');
	if (!p) return fs.existsSync(path.join(dist, 'index.html'));
	if (p.endsWith('.pdf')) return fs.existsSync(path.join(dist, p));
	const withSlash = p.endsWith('/') ? p.slice(0, -1) : p;
	return (
		fs.existsSync(path.join(dist, withSlash, 'index.html')) ||
		fs.existsSync(path.join(dist, `${withSlash}.html`))
	);
}

function isRedirectCovered(url) {
	const p = url.replace('https://robot-educatif.info/', '').replace(/\/$/, '');
	if (redirectMap.has(p)) return true;
	const alt = p.endsWith('/') ? p.slice(0, -1) : `${p}/`;
	return redirectMap.has(alt);
}

const missing = [];
for (const url of snapshot.urls) {
	if (distHasUrl(url)) continue;
	if (isRedirectCovered(url)) continue;
	missing.push(url);
}

const report = {
	snapshotCount: snapshot.count,
	treatmentsCount: treatments.count,
	uncovered: missing.length,
	missingSample: missing.slice(0, 25),
};
console.log(JSON.stringify(report, null, 2));
if (missing.length) {
	console.error('[verify-sitemap-live-coverage] URLs non couvertes:', missing.length);
	process.exit(1);
}