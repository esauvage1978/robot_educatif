#!/usr/bin/env node
/**
 * Vérifie les 100 pages projet + catalogue (dist robot-educatif).
 * Usage: node scripts/verify-projets-domotiques.mjs [distRoot]
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { PROJECT_SLUGS } from '../src/data/smartHomeProjectSlugs.mjs';

const distRoot = process.argv[2] || '/workspace/robot-educatif/dist-v16';
const minStyleBytes = 55_000;
const errors = [];

function styleLen(html) {
	const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/);
	return styleMatch ? styleMatch[1].length : 0;
}

function checkInternalLinks(html, label) {
	const hrefRe = /href="(\/[^"#?][^"]*)"/g;
	let m;
	const checked = new Set();
	while ((m = hrefRe.exec(html))) {
		const href = m[1];
		if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('/code/')) continue;
		if (checked.has(href)) continue;
		checked.add(href);
		if (href.match(/\.(webp|png|svg|pdf|yaml|xml|woff2)$/)) continue;
		const target = join(distRoot, href.replace(/^\//, ''), 'index.html');
		const targetFile = href.endsWith('.html') ? join(distRoot, href.replace(/^\//, '')) : target;
		if (!existsSync(targetFile) && !existsSync(join(distRoot, href.replace(/^\//, '')))) {
			errors.push(`${label}: lien interne 404 → ${href}`);
		}
	}
}

function checkCatalog(path, label) {
	if (!existsSync(path)) {
		errors.push(`MISSING ${label}: ${path}`);
		return;
	}
	const html = readFileSync(path, 'utf8');
	if (styleLen(html) < minStyleBytes) {
		errors.push(`${label}: bloc <style> ${styleLen(html)} octets (< ${minStyleBytes})`);
	}
	for (const m of ['"@type":"BreadcrumbList"', 'shpc-hero', 'shpc-grid', 'data-shpc-catalog']) {
		if (!html.includes(m)) errors.push(`${label}: manque « ${m} »`);
	}
	checkInternalLinks(html, label);
}

function checkProject(path, label) {
	if (!existsSync(path)) {
		errors.push(`MISSING ${label}: ${path}`);
		return;
	}
	const html = readFileSync(path, 'utf8');
	if (styleLen(html) < minStyleBytes) {
		errors.push(`${label}: bloc <style> ${styleLen(html)} octets (< ${minStyleBytes})`);
	}

	const requiredMarkers = [
		'id="section-presentation"',
		'id="section-configurateur"',
		'id="section-materiel"',
		'id="section-budget"',
		'id="section-schema"',
		'id="section-tutoriel"',
		'id="section-home-assistant"',
		'id="section-depannage"',
		'id="section-faq"',
		'id="section-maillage"',
		'class="shuc-svg"',
		'data-shuc-yaml',
		'rel="sponsored nofollow noopener"',
		'manuso06-21',
		'"@type":"BreadcrumbList"',
		'"@type":"TechArticle"',
		'"@type":"HowTo"',
	];

	for (const m of requiredMarkers) {
		if (!html.includes(m)) errors.push(`${label}: manque « ${m} »`);
	}

	const faqCount = (html.match(/class="shpp-faq-item"/g) || []).length;
	if (faqCount < 5) errors.push(`${label}: seulement ${faqCount} FAQ (min 5)`);

	const stepCount = (html.match(/class="shpp-tutorial-step"/g) || []).length;
	if (stepCount < 8) errors.push(`${label}: seulement ${stepCount} étapes tutoriel (min 8)`);

	checkInternalLinks(html, label);
}

const catalogPath = join(distRoot, 'domotique/configurateur-projet-domotique/index.html');
checkCatalog(catalogPath, 'catalogue');

for (const slug of PROJECT_SLUGS) {
	const p = join(distRoot, 'domotique/projets', slug, 'index.html');
	checkProject(p, `projet/${slug}`);
}

console.log(`Dist: ${distRoot}`);
console.log(`Projets vérifiés: ${PROJECT_SLUGS.length}`);
if (errors.length) {
	console.error(`\n${errors.length} ERREUR(S):`);
	errors.forEach((e) => console.error(' -', e));
	process.exit(1);
}
console.log('OK — toutes les vérifications passées.');
