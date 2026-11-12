#!/usr/bin/env node
/** Liste dist HTML + assets référencés pour le lot 10, archive tar + sha256. */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const listFile = path.join(root, 'REECRITURE90_LOT10_DIST_PATHS.txt');
const outList = path.join(root, 'REECRITURE90_LOT10_DIST_PATHS_ALL.txt');
const archivePath = path.join(root, '_reecriture90_lot10_all.tar');
const archiveMd = path.join(root, '_reecriture_lot10', 'ARCHIVE.md');

const htmlPaths = fs
	.readFileSync(listFile, 'utf8')
	.split(/\r?\n/)
	.map((l) => l.trim())
	.filter(Boolean);

const files = new Set();

function resolveAsset(fromDir, href) {
	if (!href || href.startsWith('data:') || href.startsWith('http')) return null;
	let rel = href.split('?')[0].split('#')[0];
	if (rel.startsWith('/')) rel = rel.slice(1);
	const abs = path.normalize(path.join(fromDir, rel));
	if (!abs.startsWith(dist)) return null;
	if (fs.existsSync(abs)) return path.relative(root, abs).replace(/\\/g, '/');
	return null;
}

for (const hp of htmlPaths) {
	const absHtml = path.join(root, hp.replace(/\//g, path.sep));
	if (!fs.existsSync(absHtml)) {
		console.warn('[lot10-archive] absent:', hp);
		continue;
	}
	files.add(hp.replace(/\\/g, '/'));
	const dir = path.dirname(absHtml);
	const html = fs.readFileSync(absHtml, 'utf8');
	const $ = cheerio.load(html);
	$('[src],[href]').each((_, el) => {
		const att = $(el).attr('src') || $(el).attr('href');
		if (!att) return;
		if (!/\.(webp|png|jpe?g|svg|gif|woff2?|ico)(\?|$)/i.test(att) && !att.includes('_astro/') && !att.includes('/images/')) return;
		const resolved = resolveAsset(dir, att);
		if (resolved) files.add(resolved);
	});
	for (const m of html.matchAll(/srcset=\"([^\"]+)\"/g)) {
		for (const part of m[1].split(',')) {
			const u = part.trim().split(/\s+/)[0];
			const resolved = resolveAsset(dir, u);
			if (resolved) files.add(resolved);
		}
	}
}

const sorted = [...files].sort();
fs.writeFileSync(outList, sorted.join('\n') + '\n');

if (fs.existsSync(archivePath)) fs.unlinkSync(archivePath);
const listPath = path.join(root, '_reecriture_lot10', '_tar_list.txt');
fs.mkdirSync(path.dirname(listPath), { recursive: true });
fs.writeFileSync(listPath, sorted.join('\n'));
try {
	execSync(`tar -cf "${archivePath}" -C "${root}" -T "${listPath}"`, { stdio: 'inherit' });
} catch {
	execSync(`tar.exe -cf "${archivePath}" -C "${root}" -T "${listPath}"`, { stdio: 'inherit' });
}

const hash = crypto.createHash('sha256').update(fs.readFileSync(archivePath)).digest('hex');
const md = [
	'# Archive lot 10 — `_reecriture90_lot10_all.tar`',
	'',
	`- **Fichiers** : ${sorted.length} (HTML + \`_astro/\` + \`images/\` référencés)`,
	`- **Liste** : \`REECRITURE90_LOT10_DIST_PATHS_ALL.txt\``,
	`- **SHA256** : \`${hash}\``,
	`- **Généré** : ${new Date().toISOString()}`,
	'',
].join('\n');
fs.writeFileSync(archiveMd, md);
console.log(`[lot10-archive] ${sorted.length} fichiers, sha256=${hash}`);
