#!/usr/bin/env node
/**
 * Chemins relatifs : toujours POSIX avant regex / startsWith sur des segments /foo/.
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { relPosix, toPosixPath } from './rel-posix.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
const NODE_SCRIPT_RE = /\bnode\s+scripts\/([^\s&]+\.mjs)/g;

function buildScriptPaths() {
	const out = new Set();
	for (const cmd of [pkg.scripts?.prebuild, pkg.scripts?.build].filter(Boolean)) {
		for (const m of cmd.matchAll(NODE_SCRIPT_RE)) out.add(m[1]);
	}
	return [...out];
}

const PATH_SEGMENT_RE = /\.test\s*\(\s*rel\s*\)|\.includes\s*\(\s*rel\s*\)|rel\.startsWith\s*\(\s*['"]\//;

test('toPosixPath : backslashes Windows → slash', () => {
	assert.equal(toPosixPath('uk\\partners\\amazon-ca\\index.html'), 'uk/partners/amazon-ca/index.html');
	assert.ok(/\/partners\//.test(toPosixPath('uk\\partners\\amazon-ca\\index.html')));
});

test('relPosix : filtre partenaires UK/CA', () => {
	const base = path.join(ROOT, 'dist');
	const file = path.join(base, 'uk', 'partners', 'amazon-ca', 'index.html');
	const rel = relPosix(base, file);
	assert.equal(rel, 'uk/partners/amazon-ca/index.html');
	assert.ok(/\/partners\//.test(rel));
});

test('scripts npm run build : path.relative + regex segment sans POSIX interdit', () => {
	const offenders = [];
	for (const rel of buildScriptPaths()) {
		const abs = path.join(ROOT, 'scripts', rel);
		if (!fs.existsSync(abs)) continue;
		const src = fs.readFileSync(abs, 'utf8');
		if (!PATH_SEGMENT_RE.test(src)) continue;
		const usesPosix =
			src.includes("from './rel-posix.mjs'") ||
			src.includes('from "./rel-posix.mjs"') ||
			/path\.relative\([^)]+\)\.replace\(\/\\\\\/g,\s*['"]\/['"]\)/.test(src);
		if (!usesPosix) offenders.push(rel);
	}
	assert.deepEqual(offenders, [], offenders.join('\n'));
});