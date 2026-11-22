#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
export const LEGACY_FILE = path.join(SCRIPT_DIR, 'go-table-legacy-aliases.json');

const GO_SLUG_RE = /\/go\/([a-z0-9][a-z0-9-]*)/gi;

/** Page alias /go/<id>/ : redirection interne uniquement (go.php au runtime). */
export function legacyGoPageHtml(id) {
	const goPath = `/go/${id}/`;
	const esc = (s) =>
		String(s)
			.replace(/&/g, '&amp;')
			.replace(/"/g, '&quot;')
			.replace(/</g, '&lt;');
	return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="refresh" content="0;url=${esc(goPath)}">
<link rel="canonical" href="${esc(goPath)}">
<meta name="robots" content="noindex,nofollow">
<title>Redirect</title>
<style>body{font-family:system-ui,sans-serif;margin:2rem}a{word-break:break-all}</style>
</head>
<body><p><a href="${esc(goPath)}" rel="nofollow sponsored noopener">Continue</a></p></body>
</html>
`;
}

export function defaultF41DistDir() {
	return path.join(os.tmpdir(), 'dist-f41');
}

/** Slugs /go/<id> référencés dans les HTML d'un dist (sans ripgrep). */
export function slugsFromDist(distDir) {
	const out = new Set();
	if (!distDir || !fs.existsSync(distDir)) return out;

	function walk(dir) {
		for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
			const p = path.join(dir, ent.name);
			if (ent.isDirectory()) walk(p);
			else if (ent.name.endsWith('.html')) {
				const html = fs.readFileSync(p, 'utf8');
				for (const m of html.matchAll(GO_SLUG_RE)) out.add(m[1]);
			}
		}
	}
	walk(path.resolve(distDir));
	return out;
}

/** Table go-table.json au commit f41bd1e (git, sans shell). */
export function readF41GoTable(rootDir) {
	const cwd = rootDir || path.resolve(SCRIPT_DIR, '..');
	const git = spawnSync('git', ['show', 'f41bd1e:scripts/go-table.json'], {
		cwd,
		encoding: 'utf8',
		maxBuffer: 64 * 1024 * 1024,
	});
	if (git.status !== 0) {
		throw new Error(`git show f41bd1e:scripts/go-table.json : ${git.stderr || git.error || 'échec'}`);
	}
	return JSON.parse(git.stdout);
}

/** Liens Amazon directs avec ?tag= (hors tables go-table), aligné garde-fou PUBLISH. */
const DIRECT_AMAZON_TAG_RE =
	/https?:\/\/(?:[a-z0-9-]+\.)*amazon\.[a-z.]+\/[^"'\s<>]*(?:\?|&)[^"'\s<>]*\btag=/gi;

export function countDirectAmazonTagLinks(distDir, { maxSamples = 5 } = {}) {
	const root = path.resolve(distDir);
	let count = 0;
	const samples = [];

	function walk(dir) {
		for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
			const p = path.join(dir, ent.name);
			if (ent.isDirectory()) {
				walk(p);
				continue;
			}
			const base = ent.name.toLowerCase();
			if (base === 'go-table.php' || base === 'go-table.json') continue;
			if (!base.endsWith('.html') && base !== 'go-table.php') continue;
			const html = fs.readFileSync(p, 'utf8');
			for (const m of html.matchAll(DIRECT_AMAZON_TAG_RE)) {
				count++;
				if (samples.length < maxSamples) {
					samples.push({ file: path.relative(root, p), match: m[0].slice(0, 120) });
				}
			}
		}
	}
	if (fs.existsSync(root)) walk(root);
	return { count, samples };
}

export function loadLegacyAliases() {
	if (!fs.existsSync(LEGACY_FILE)) return new Map();
	const data = JSON.parse(fs.readFileSync(LEGACY_FILE, 'utf8'));
	const links = data.links || data;
	return new Map(Object.entries(links));
}

/** Injecte les alias legacy dans une Map id -> entry (go-links). */
export function applyLegacyToTable(table, urlToId = null) {
	const legacy = loadLegacyAliases();
	for (const [id, entry] of legacy) {
		const { legacyAlias: _drop, ...rest } = entry;
		const row = { ...rest, legacyAlias: true };
		table.set(id, row);
		if (urlToId && row.url && !urlToId.has(row.url)) urlToId.set(row.url, id);
	}
	return legacy.size;
}

export function legacyIdSet() {
	return new Set(loadLegacyAliases().keys());
}