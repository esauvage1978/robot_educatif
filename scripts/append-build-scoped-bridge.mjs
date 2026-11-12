#!/usr/bin/env node
/** Injecte ou met à jour build-scoped-bridge.css dans le head des pages rel.txt. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(process.argv[2] ?? path.join(__dirname, '../dist'));
const relListPath = path.resolve(process.argv[3] ?? path.join(__dirname, '../../re-ab-20261104/rel.txt'));
const bridge = fs.readFileSync(path.join(__dirname, 'fragments/build-scoped-bridge.css'), 'utf8');
const marker = 'data-build-extra="build-scoped-bridge"';

function upsertBridge(html) {
	const block = `<style ${marker}>${bridge}</style>`;
	const re = new RegExp(`<style[^>]*${marker.replace(/"/g, '\\"')}[^>]*>[\\s\\S]*?<\\/style>`, 'i');
	if (re.test(html)) return html.replace(re, block);
	return html.replace(/<meta charset="utf-8"\s*\/?>/i, (m) => `${m}${block}`);
}

const rels = fs.readFileSync(relListPath, 'utf8').split(/\s+/).filter(Boolean);
let n = 0;
for (const rel of rels) {
	const f = path.join(distDir, rel, 'index.html');
	if (!fs.existsSync(f)) continue;
	const html = fs.readFileSync(f, 'utf8');
	const next = upsertBridge(html);
	if (next !== html) {
		fs.writeFileSync(f, next, 'utf8');
		n++;
	}
}
console.log(`[build-bridge] ${n} page(s) mises à jour, dist=${distDir}`);
