#!/usr/bin/env node
/**
 * Audit refonte pédagogique — 100 pages projets domotiques.
 * Usage: node scripts/verify-pedagogical-overhaul.mjs [distRoot]
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { PROJECT_SLUGS } from '../src/data/smartHomeProjectSlugs.mjs';

const distRoot = process.argv[2] || '/workspace/robot-educatif/dist-v16';
const minStyleBytes = 55_000;
const minStepChars = 350;
const errors = [];
const telegraphRe = /\b(Online|Safe|Cohérent|Config Shelly|Mural OK|Dashboard|Stable)\b/;

const bannedTelegraph = ['Online', 'Safe', 'Cohérent', 'Config Shelly'];

function styleLen(html) {
	const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/);
	return styleMatch ? styleMatch[1].length : 0;
}

/** @param {string} html */
function checkSteps(html, label) {
	const articles = html.match(/<article class="shpp-tutorial-step">[\s\S]*?<\/article>/g) ?? [];
	if (articles.length !== 8) {
		errors.push(`${label}: attendu 8 étapes, trouvé ${articles.length}`);
	}
	for (let i = 0; i < articles.length; i++) {
		const block = articles[i];
		const text = block.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
		if (text.length < minStepChars) {
			errors.push(`${label}: étape ${i + 1} texte ${text.length} car (< ${minStepChars})`);
		}
		if (!block.includes('<ol class="shpp-step-actions"')) {
			errors.push(`${label}: étape ${i + 1} sans liste ordonnée d'actions`);
		}
		for (const w of bannedTelegraph) {
			if (telegraphRe.test(text) && new RegExp(`\\b${w}\\b`).test(text) && text.length < 500) {
				/* only flag if word appears as sole short content in old format */
			}
		}
		if (/>\s*Online\s*</.test(block) || />\s*Safe\s*</.test(block) || />\s*Cohérent\s*</.test(block)) {
			errors.push(`${label}: étape ${i + 1} contient mot télégraphique interdit`);
		}
	}
}

/** @param {string} html @param {string} label */
function checkImages(html, label) {
	const pageDir = join(distRoot, 'domotique', 'projets', label);
	const imgRe = /<img[^>]+src="([^"]+)"/g;
	let m;
	while ((m = imgRe.exec(html))) {
		const src = m[1];
		if (src.startsWith('http') || src.includes('_astro/logo') || src.startsWith('data:')) continue;
		if (src.startsWith('../')) {
			const disk = join(pageDir, src);
			if (!existsSync(disk)) errors.push(`${label}: image manquante ${src}`);
			continue;
		}
		if (src.startsWith('/')) {
			const disk = join(distRoot, src.replace(/^\//, ''));
			if (!existsSync(disk)) errors.push(`${label}: image manquante ${src}`);
		}
	}
}

/** @param {string} html @param {string} label */
function checkPage(html, label) {
	if (styleLen(html) < minStyleBytes) {
		errors.push(`${label}: style ${styleLen(html)} octets (< ${minStyleBytes})`);
	}
	const required = [
		'data-shuc-functional="1"',
		'class="shuc-svg"',
		'id="section-fonctionnement"',
		'id="section-logiciel"',
		'Parcours A',
		'Parcours B',
		'data-shpp-config',
		'data-shpp-dynamic-budget',
		'id="section-glossaire"',
		'shpp-step-actions',
		'Comment vérifier que cela fonctionne',
	];
	for (const r of required) {
		if (!html.includes(r)) errors.push(`${label}: manque « ${r} »`);
	}
	if (!html.includes('data-shpp-tier') || !html.includes('data-shpp-config')) {
		errors.push(`${label}: configurateur URL/tier absent`);
	}
	if (!html.includes('SmartHomeProjectInlineConfigurator')) {
		errors.push(`${label}: bundle configurateur absent`);
	}
	checkSteps(html, label);
	checkImages(html, label);
}

for (const slug of PROJECT_SLUGS) {
	const path = join(distRoot, 'domotique', 'projets', slug, 'index.html');
	if (!existsSync(path)) {
		errors.push(`MISSING page ${slug}`);
		continue;
	}
	checkPage(readFileSync(path, 'utf8'), slug);
}

if (errors.length) {
	console.error('verify-pedagogical-overhaul: ÉCHEC');
	for (const e of errors) console.error(' -', e);
	process.exit(1);
}
console.log(`verify-pedagogical-overhaul: OK — ${PROJECT_SLUGS.length} pages`);
