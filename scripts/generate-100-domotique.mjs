#!/usr/bin/env node
/**
 * Passe le catalogue domotique à 100 projets (23 + 77).
 * node scripts/generate-100-domotique.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { USE_CASES as existing23 } from '../src/data/smartHomeUseCases.mjs';
import { USE_CASE_ID_TO_SLUG as existingSlugs } from '../src/data/smartHomeProjectSlugs.mjs';
import { NEW_SMART_HOME_PROJECTS } from './smart-home-77-new-projects.mjs';

const z = (note) => ({ productId: 'zbdongle-e', qty: 1, note: note ?? 'Coordinateur Zigbee USB.' });
const w = (n = 1) => ({ productId: 'wago-221', qty: n });

function clone(uc, patch) {
	return {
		...uc,
		...patch,
		meta: { ...uc.meta, ...(patch.meta ?? {}) },
		techOptions: patch.techOptions ?? uc.techOptions,
		wiring: patch.wiring ?? uc.wiring,
		recipes: patch.recipes ?? uc.recipes,
		tutorialHref: patch.tutorialHref ?? uc.tutorialHref,
		tutorialLabel: patch.tutorialLabel ?? uc.tutorialLabel,
	};
}

function templateFor(id) {
	const t = existing23.find((u) => u.id === id);
	if (!t) throw new Error(`Template inconnu: ${id}`);
	return t;
}

const newUseCases = NEW_SMART_HOME_PROJECTS.map((p) => {
	const t = templateFor(p.template);
	return clone(t, {
		id: p.id,
		category: p.category,
		emoji: p.emoji,
		title: p.title,
		shortDesc: p.shortDesc,
		keywords: p.keywords,
		mainRole: p.mainRole ?? t.mainRole,
		qtyLabel: p.qtyLabel ?? t.qtyLabel,
		meta: p.meta ?? t.meta,
	});
});

const allCases = [...existing23, ...newUseCases];
if (allCases.length !== 100) {
	throw new Error(`Total USE_CASES: attendu 100, reçu ${allCases.length}`);
}

function serialise(value, depth = 0) {
	const pad = '\t'.repeat(depth);
	const padIn = '\t'.repeat(depth + 1);
	if (typeof value === 'function') {
		return value.toString();
	}
	if (Array.isArray(value)) {
		if (value.length === 0) return '[]';
		return (
			'[\n' +
			value.map((v) => padIn + serialise(v, depth + 1)).join(',\n') +
			'\n' +
			pad +
			']'
		);
	}
	if (value && typeof value === 'object') {
		const entries = Object.entries(value);
		const keyStr = (k) => (/^[a-zA-Z_$][\w$]*$/.test(k) ? k : JSON.stringify(k));
		return (
			'{\n' +
			entries.map(([k, v]) => padIn + keyStr(k) + ': ' + serialise(v, depth + 1)).join(',\n') +
			'\n' +
			pad +
			'}'
		);
	}
	return JSON.stringify(value);
}

function padBlock(block) {
	return block
		.split('\n')
		.map((line) => '\t' + line)
		.join('\n');
}

const useCasesOut = `// 100 cas d'usage — généré par scripts/generate-100-domotique.mjs\nexport const USE_CASES = [\n${allCases
	.map((c) => padBlock(serialise(c, 1)))
	.join(',\n')}\n];\n`;

writeFileSync(new URL('../src/data/smartHomeUseCases.mjs', import.meta.url), useCasesOut);

const slugMap = { ...existingSlugs };
for (const p of NEW_SMART_HOME_PROJECTS) {
	slugMap[p.id] = p.slug;
}
const schemeMap = {};
for (const p of NEW_SMART_HOME_PROJECTS) {
	schemeMap[p.id] = p.scheme;
}

const slugsOut = `/** Mapping permanent SEO : id cas d’usage → slug URL \`/domotique/projets/<slug>/\` */
export const USE_CASE_ID_TO_SLUG = ${JSON.stringify(slugMap, null, '\t')};

/** @type {Record<string, string>} */
export const SLUG_TO_USE_CASE_ID = Object.fromEntries(
	Object.entries(USE_CASE_ID_TO_SLUG).map(([id, slug]) => [slug, id]),
);

export const PROJECT_SLUGS = Object.values(USE_CASE_ID_TO_SLUG);

/** @param {string} useCaseId */
export function slugForUseCase(useCaseId) {
	return USE_CASE_ID_TO_SLUG[useCaseId] ?? useCaseId;
}

/** @param {string} slug */
export function useCaseIdForSlug(slug) {
	return SLUG_TO_USE_CASE_ID[slug] ?? null;
}

/** @param {string} slug */
export function projectPagePath(slug) {
	return \`/domotique/projets/\${slug}/\`;
}

/** Ancres legacy configurateur → slug projet */
export const LEGACY_ANCHOR_TO_SLUG = Object.fromEntries(
	Object.entries(USE_CASE_ID_TO_SLUG).map(([id, slug]) => [\`shuc-ref-\${id}\`, slug]),
);
`;

writeFileSync(new URL('../src/data/smartHomeProjectSlugs.mjs', import.meta.url), slugsOut);

// Patch USE_CASE_SCHEME dans smartHomeWiringGuides.mjs
const wiringPath = new URL('../src/data/smartHomeWiringGuides.mjs', import.meta.url);
let wiringSrc = readFileSync(wiringPath, 'utf8');
const schemeStart = wiringSrc.indexOf('export const USE_CASE_SCHEME = {');
const schemeEnd = wiringSrc.indexOf('};', schemeStart) + 2;
const existingSchemeBlock = wiringSrc.slice(schemeStart, schemeEnd);
const existingSchemeMatch = existingSchemeBlock.match(/\{([\s\S]*)\}/);
const existingSchemeLines = existingSchemeMatch[1].trim();
const mergedSchemeEntries = { ...Object.fromEntries(
	existingSchemeLines
		.split('\n')
		.map((l) => l.trim())
		.filter((l) => l && !l.startsWith('//'))
		.map((l) => {
			const m = l.match(/^['"]([^'"]+)['"]:\s*['"]([^'"]+)['"],?/);
			if (!m) return null;
			return [m[1], m[2]];
		})
		.filter(Boolean),
), ...schemeMap };

const newSchemeBlock = `export const USE_CASE_SCHEME = ${JSON.stringify(mergedSchemeEntries, null, '\t').replace(/"/g, "'")};`;
// JSON uses double quotes - wiring file uses single quotes for keys - use manual format
const schemeLines = Object.entries(mergedSchemeEntries)
	.map(([k, v]) => `\t'${k}': '${v}',`)
	.join('\n');
const schemeBlock = `export const USE_CASE_SCHEME = {\n${schemeLines}\n};`;
wiringSrc = wiringSrc.slice(0, schemeStart) + schemeBlock + wiringSrc.slice(schemeEnd);
writeFileSync(wiringPath, wiringSrc);

console.log('OK —', allCases.length, 'USE_CASES,', Object.keys(slugMap).length, 'slugs,', Object.keys(mergedSchemeEntries).length, 'scheme mappings');
