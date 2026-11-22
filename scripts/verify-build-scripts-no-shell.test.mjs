#!/usr/bin/env node
/**
 * Les scripts invoqués par npm run prebuild/build ne doivent pas appeler d'outils Unix via le shell.
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));

const NODE_SCRIPT_RE = /\bnode\s+scripts\/([^\s&]+\.mjs)/g;

function buildScriptPaths() {
	const out = new Set();
	for (const cmd of [pkg.scripts?.prebuild, pkg.scripts?.build].filter(Boolean)) {
		for (const m of cmd.matchAll(NODE_SCRIPT_RE)) out.add(m[1]);
	}
	return [...out].sort();
}

const FORBIDDEN = [
	{ name: 'shell true fallback', re: /\|\|\s*true\b/ },
	{ name: 'ripgrep rg', re: /\brg\s+-/ },
	{ name: 'grep command', re: /execSync\s*\([^)]*\bgrep\b/ },
	{ name: 'find command via shell', re: /execSync\s*\([^)]*[`'"]find\s/ },
	{ name: 'sed command', re: /execSync\s*\([^)]*\bsed\b/ },
	{ name: 'rm -rf', re: /\brm\s+-rf\b/ },
	{ name: 'shell: true', re: /\bshell:\s*true\b/ },
	{ name: 'npx via execSync string', re: /execSync\s*\(\s*[`'"]npx\b/ },
	{ name: 'cp via shell string', re: /execSync\s*\(\s*[`'"]cp\s/ },
];

test('scripts npm run build : pas d’outils Unix / shell: true', () => {
	const offenders = [];
	for (const rel of buildScriptPaths()) {
		const abs = path.join(ROOT, 'scripts', rel);
		const src = fs.readFileSync(abs, 'utf8');
		for (const rule of FORBIDDEN) {
			if (rule.re.test(src)) offenders.push(`${rel}: ${rule.name}`);
		}
	}
	assert.deepEqual(offenders, [], offenders.join('\n'));
});

test('slugsFromDist lit le dist courant sans ripgrep', async () => {
	const { slugsFromDist } = await import('./go-legacy-lib.mjs');
	const s = slugsFromDist(path.join(ROOT, 'dist'));
	assert.ok(s.size > 0, 'aucun slug /go/ dans dist');
});