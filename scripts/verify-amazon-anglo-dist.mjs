#!/usr/bin/env node
/** Contrôles post-go-links sur dist/en, dist/uk, dist/ca (CONSIGNES PR41 v2). */
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve(process.argv[2] || 'dist');
const roots = ['en', 'uk', 'ca'].map((m) => path.join(dist, m)).filter((d) => fs.existsSync(d));
const table = JSON.parse(fs.readFileSync(path.join(path.dirname(new URL(import.meta.url).pathname), 'go-table.json'), 'utf8'));
const links = table.links || table;
const prod = new Set(Object.keys(links));

function walk(d, acc = []) {
	for (const e of fs.readdirSync(d, { withFileTypes: true })) {
		const p = path.join(d, e.name);
		if (e.isDirectory()) walk(p, acc);
		else if (e.name.endsWith('.html')) acc.push(p);
	}
	return acc;
}

const counts = {
	caDp: 0,
	comDp: 0,
	frHost: 0,
	amazonComLabel: 0,
	euro: 0,
	oneAround: 0,
	missingGo: 0,
};
const samples = { caDp: [], comDp: [], frHost: [], amazonComLabel: [], euro: [] };

for (const root of roots) {
	const market = path.basename(root);
	for (const file of walk(root)) {
		const html = fs.readFileSync(file, 'utf8');
		const rel = path.relative(dist, file);
		if (/amazon\.ca\/dp\//i.test(html)) {
			counts.caDp++;
			if (samples.caDp.length < 3) samples.caDp.push(rel);
		}
		if (/amazon\.com\/dp\//i.test(html)) {
			counts.comDp++;
			if (samples.comDp.length < 3) samples.comDp.push(rel);
		}
		if (/amazon\.fr/i.test(html)) {
			counts.frHost++;
			if (samples.frHost.length < 3) samples.frHost.push(rel);
		}
		if (market !== 'en' && /Amazon\.com(?![.\w-])/i.test(html)) {
			counts.amazonComLabel++;
			if (samples.amazonComLabel.length < 3) samples.amazonComLabel.push(rel);
		}
		if (/€|&euro;|&#8364;/i.test(html)) {
			counts.euro++;
			if (samples.euro.length < 3) samples.euro.push(rel);
		}
		if (/1around/i.test(html)) counts.oneAround++;
		for (const m of html.matchAll(/\/go\/(az-[a-z]{2}-[a-f0-9]{10}|aw-\d+-[a-f0-9]{10})\//g)) {
			if (!prod.has(m[1])) counts.missingGo++;
		}
	}
}

const prod2052 = JSON.parse(
	fs.readFileSync(path.join(path.dirname(new URL(import.meta.url).pathname), 'go-table.json'), 'utf8'),
);
// production baseline from git omitted — caller checks separately
console.log(JSON.stringify({ counts, samples }, null, 2));
const bad =
	counts.caDp ||
	counts.comDp ||
	counts.frHost ||
	counts.amazonComLabel ||
	counts.euro ||
	counts.oneAround ||
	counts.missingGo;
if (bad) process.exit(1);