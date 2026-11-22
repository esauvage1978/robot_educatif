#!/usr/bin/env node
/**
 * Compte les pages dist dont og:image / twitter:image pointent encore vers blog-placeholder-1.
 * Produit un rapport JSON (corrigées vs placeholder restants par famille de chemins).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { relPosix, toPosixPath } from './rel-posix.mjs';

const PLACEHOLDER_RE = /blog-placeholder-1/i;
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.resolve(process.argv[2] || 'dist');

function walkHtml(dir, out = []) {
	for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
		const p = path.join(dir, ent.name);
		if (ent.isDirectory()) walkHtml(p, out);
		else if (ent.name.endsWith('.html')) out.push(p);
	}
	return out;
}

function extractOgImage(html) {
	const m1 = html.match(
		/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i,
	);
	if (m1) return m1[1];
	const m2 = html.match(
		/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["'][^>]*>/i,
	);
	return m2?.[1] ?? '';
}

function pageFamily(rel) {
	if (rel.includes('/code-erreur/') || rel.includes('/smart-home/error/')) return 'error_code';
	if (rel.includes('/domotique/') || rel.includes('/smart-home/') || rel.includes('/domotica/')) {
		if (rel.includes('/projets/') || rel.includes('/projects/') || rel.includes('/proyectos/') || rel.includes('/progetti/'))
			return 'domotique_project';
		if (rel.includes('configurateur') || rel.includes('diagnostic') || rel.includes('matrice') || rel.includes('matrix') || rel.includes('pieces') || rel.includes('spare'))
			return 'domotique_hub_tool';
		return 'domotique_article';
	}
	if (rel.includes('/projets-esp32/') || rel.includes('/esp32-projects/') || rel.includes('/esp32-smart-home'))
		return 'esp32';
	if (rel.startsWith('blog/') || rel.includes('/en/blog')) return 'blog_fr';
	if (rel.match(/^(en|de|it|es|nl|uk|ca)\//)) return 'i18n_md';
	if (rel.startsWith('categorie/')) return 'categorie';
	if (rel.match(/^(outil-|calculateur|compatibilite|configurateur-kit|generateur|parcours-|tableau-reglages|ressources-svg)/))
		return 'robot_tool';
	if (rel === 'index.html') return 'home';
	return 'other';
}

const htmlFiles = walkHtml(dist);
const byType = {};
let placeholder = 0;
let fixed = 0;
const placeholderSamples = [];

for (const file of htmlFiles) {
	const rel = relPosix(dist, file);
	const og = extractOgImage(fs.readFileSync(file, 'utf8'));
	const fam = pageFamily(rel);
	if (!byType[fam]) byType[fam] = { total: 0, placeholder: 0 };
	byType[fam].total += 1;
	const isPh = PLACEHOLDER_RE.test(og);
	if (isPh) {
		placeholder += 1;
		byType[fam].placeholder += 1;
		if (placeholderSamples.length < 40) placeholderSamples.push({ page: rel, og });
	} else {
		fixed += 1;
	}
}

const report = {
	dist: toPosixPath(dist),
	totalHtml: htmlFiles.length,
	withRealOg: fixed,
	stillPlaceholder: placeholder,
	byType,
	placeholderSamples,
};
console.log(JSON.stringify(report, null, 2));
process.exit(0);