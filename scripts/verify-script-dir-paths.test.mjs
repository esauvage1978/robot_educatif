#!/usr/bin/env node
/**
 * Garde-fou : __dirname via fileURLToPath(import.meta.url), pas URL.pathname (Windows).
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath, pathToFileURL } from 'node:url';

test('go-table.json lisible via fileURLToPath(import.meta.url)', () => {
	const table = path.join(path.dirname(fileURLToPath(import.meta.url)), 'go-table.json');
	assert.ok(fs.existsSync(table), table);
});

test('Windows : pathname casse la résolution de go-table.json', { skip: process.platform !== 'win32' }, () => {
	const scriptDir = path.dirname(fileURLToPath(import.meta.url));
	const moduleUrl = pathToFileURL(path.join(scriptDir, 'patch-anglo-post-go.mjs')).href;
	const bad = path.join(path.dirname(new URL(moduleUrl).pathname), 'go-table.json');
	const good = path.join(path.dirname(fileURLToPath(moduleUrl)), 'go-table.json');
	assert.ok(fs.existsSync(good), good);
	assert.ok(!fs.existsSync(bad), `ENOENT attendu pour le chemin pathname : ${bad}`);
});

test('file URL style Windows : pathname absolu /C:/… (ne pas le passer à path.win32.join)', () => {
	const pathname = new URL('file:///C:/Users/u/robot_educatif/scripts/patch-anglo-post-go.mjs').pathname;
	assert.match(pathname, /^\/[A-Za-z]:\//);
});