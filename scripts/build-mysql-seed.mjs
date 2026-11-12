#!/usr/bin/env node
/**
 * Génère sql/seed_re.sql et public/api/errors-fallback.json depuis unifiedErrorCatalog.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
	BRANDS,
	DEVICE_CATEGORIES,
	PRODUCTS,
	buildCatalogErrors,
} from '../src/data/unifiedErrorCatalog.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sqlPath = join(root, 'sql', 'seed_re.sql');
const jsonPath = join(root, 'public', 'api', 'errors-fallback.json');

const LANGS = ['fr', 'en', 'de', 'it', 'es'];

function sqlEscape(value) {
	if (value === null || value === undefined) return 'NULL';
	if (typeof value === 'number') return String(value);
	return `'${String(value).replace(/\\/g, '\\\\').replace(/'/g, "''").replace(/\n/g, '\\n').replace(/\r/g, '')}'`;
}

function upsert(table, columns, rows, updateCols) {
	if (!rows.length) return '';
	const cols = columns.join(', ');
	const values = rows
		.map((row) => `(${columns.map((c) => sqlEscape(row[c])).join(', ')})`)
		.join(',\n');
	const updates = updateCols.map((c) => `${c}=VALUES(${c})`).join(', ');
	return `INSERT INTO \`${table}\` (${cols}) VALUES\n${values}\nON DUPLICATE KEY UPDATE ${updates};\n\n`;
}

const catRows = DEVICE_CATEGORIES.map((c) => ({
	slug: c.slug,
	name_fr: c.name_fr,
	name_en: c.name_en,
	name_de: c.name_de,
	name_it: c.name_it,
	name_es: c.name_es,
	sort_order: c.sort_order,
}));

const brandRows = BRANDS.map((b) => ({
	slug: b.slug,
	name: b.name,
	is_affiliate_partner: b.is_affiliate_partner,
	priority_rank: b.priority_rank,
	official_site_url: b.official_site_url,
	support_url: b.support_url,
	support_email: b.support_email,
	support_phone: b.support_phone,
	affiliate_default_url: b.affiliate_default_url,
}));

const brandSlugToId = Object.fromEntries(brandRows.map((b, i) => [b.slug, i + 1]));
const catSlugToId = Object.fromEntries(catRows.map((c, i) => [c.slug, i + 1]));

const productRows = PRODUCTS.map((p) => ({
	slug: p.slug,
	brand_id: brandSlugToId[p.brand_slug],
	category_id: catSlugToId[p.category_slug],
	name: p.name,
	protocol: p.protocol,
	official_doc_url: p.official_doc_url || null,
	affiliate_url_fr: null,
	affiliate_url_en: null,
	affiliate_url_de: null,
	affiliate_url_it: null,
	affiliate_url_es: null,
	image_url: p.image_url,
}));

const productSlugToId = Object.fromEntries(productRows.map((p, i) => [p.slug, i + 1]));

const errors = buildCatalogErrors();
const errorRows = errors.map((e) => ({
	slug: e.slug,
	category_id: catSlugToId[e.category_slug],
	brand_id: brandSlugToId[e.brand_slug],
	product_id: e.product_slug ? productSlugToId[e.product_slug] : null,
	error_code: e.error_code,
	difficulty: e.difficulty,
	estimated_time: e.time,
	estimated_cost: e.cost,
	requires_official_sav: e.savNote ? 1 : 0,
	title_fr: e.title.fr,
	title_en: e.title.en,
	title_de: e.title.de,
	title_it: e.title.it,
	title_es: e.title.es,
	symptom_fr: e.symptoms.fr,
	symptom_en: e.symptoms.en,
	symptom_de: e.symptoms.de,
	symptom_it: e.symptoms.it,
	symptom_es: e.symptoms.es,
	solution_fr: e.fix.fr,
	solution_en: e.fix.en,
	solution_de: e.fix.de,
	solution_it: e.fix.it,
	solution_es: e.fix.es,
	tools_fr: e.tools?.fr || null,
	tools_en: e.tools?.en || null,
	tools_de: e.tools?.de || null,
	tools_it: e.tools?.it || null,
	tools_es: e.tools?.es || null,
	safety_warning_fr: e.caution?.fr || null,
	safety_warning_en: e.caution?.en || null,
	safety_warning_de: e.caution?.de || null,
	safety_warning_it: e.caution?.it || null,
	safety_warning_es: e.caution?.es || null,
}));

let sql = `-- robot-educatif.info seed — généré ${new Date().toISOString()}\nSET NAMES utf8mb4;\n\n`;

sql += upsert(
	'device_categories',
	['slug', 'name_fr', 'name_en', 'name_de', 'name_it', 'name_es', 'sort_order'],
	catRows,
	['name_fr', 'name_en', 'name_de', 'name_it', 'name_es', 'sort_order'],
);

sql += upsert(
	'brands',
	[
		'slug',
		'name',
		'is_affiliate_partner',
		'priority_rank',
		'official_site_url',
		'support_url',
		'support_email',
		'support_phone',
		'affiliate_default_url',
	],
	brandRows,
	[
		'name',
		'is_affiliate_partner',
		'priority_rank',
		'official_site_url',
		'support_url',
		'support_email',
		'support_phone',
		'affiliate_default_url',
	],
);

sql += upsert(
	'products',
	[
		'slug',
		'brand_id',
		'category_id',
		'name',
		'protocol',
		'official_doc_url',
		'affiliate_url_fr',
		'affiliate_url_en',
		'affiliate_url_de',
		'affiliate_url_it',
		'affiliate_url_es',
		'image_url',
	],
	productRows,
	['brand_id', 'category_id', 'name', 'protocol', 'official_doc_url', 'image_url'],
);

sql += upsert(
	'error_codes',
	[
		'slug',
		'category_id',
		'brand_id',
		'product_id',
		'error_code',
		'difficulty',
		'estimated_time',
		'estimated_cost',
		'requires_official_sav',
		'title_fr',
		'title_en',
		'title_de',
		'title_it',
		'title_es',
		'symptom_fr',
		'symptom_en',
		'symptom_de',
		'symptom_it',
		'symptom_es',
		'solution_fr',
		'solution_en',
		'solution_de',
		'solution_it',
		'solution_es',
		'tools_fr',
		'tools_en',
		'tools_de',
		'tools_it',
		'tools_es',
		'safety_warning_fr',
		'safety_warning_en',
		'safety_warning_de',
		'safety_warning_it',
		'safety_warning_es',
	],
	errorRows,
	[
		'category_id',
		'brand_id',
		'product_id',
		'error_code',
		'difficulty',
		'estimated_time',
		'estimated_cost',
		'requires_official_sav',
		'title_fr',
		'title_en',
		'title_de',
		'title_it',
		'title_es',
		'symptom_fr',
		'symptom_en',
		'symptom_de',
		'symptom_it',
		'symptom_es',
		'solution_fr',
		'solution_en',
		'solution_de',
		'solution_it',
		'solution_es',
		'tools_fr',
		'tools_en',
		'tools_de',
		'tools_it',
		'tools_es',
		'safety_warning_fr',
		'safety_warning_en',
		'safety_warning_de',
		'safety_warning_it',
		'safety_warning_es',
	],
);

sql += 'DELETE FROM `error_code_applicable_products`;\n\n';
const applicablePairs = [];
for (const e of errors) {
	for (const productSlug of e.applicable_products || []) {
		if (!productSlugToId[productSlug]) continue;
		applicablePairs.push({ error_slug: e.slug, product_slug: productSlug });
	}
}
for (const pair of applicablePairs) {
	sql += `INSERT INTO \`error_code_applicable_products\` (\`error_code_id\`, \`product_id\`) SELECT e.id, p.id FROM \`error_codes\` e, \`products\` p WHERE e.slug = ${sqlEscape(pair.error_slug)} AND p.slug = ${sqlEscape(pair.product_slug)} ON DUPLICATE KEY UPDATE \`product_id\` = VALUES(\`product_id\`);\n`;
}
sql += '\n';

function localizedName(row, lang, prefix = 'name') {
	if (prefix === 'name') {
		return row[`name_${lang}`] ?? row.name_fr;
	}
	return row[`${prefix}_${lang}`] ?? row[`${prefix}_fr`];
}

function buildApiPayload(lang = 'fr') {
	const categories = DEVICE_CATEGORIES.map((c, i) => ({
		id: i + 1,
		slug: c.slug,
		name: c[`name_${lang}`],
		sort_order: c.sort_order,
	}));

	const brands = [...BRANDS]
		.sort((a, b) => {
			if (b.is_affiliate_partner !== a.is_affiliate_partner) return b.is_affiliate_partner - a.is_affiliate_partner;
			return a.priority_rank - b.priority_rank;
		})
		.map((b, i) => ({
			id: brandSlugToId[b.slug],
			slug: b.slug,
			name: b.name,
			is_affiliate_partner: b.is_affiliate_partner,
			priority_rank: b.priority_rank,
			official_site_url: b.official_site_url,
			support_url: b.support_url,
			support_email: b.support_email,
			support_phone: b.support_phone,
			affiliate_default_url: b.affiliate_default_url,
		}));

	const products = PRODUCTS.map((p) => ({
		id: productSlugToId[p.slug],
		slug: p.slug,
		brand_id: brandSlugToId[p.brand_slug],
		brand_slug: p.brand_slug,
		category_id: catSlugToId[p.category_slug],
		category_slug: p.category_slug,
		name: p.name,
		protocol: p.protocol,
		image_url: p.image_url,
		image_credit: p.image_credit,
	}));

	const apiErrors = errors.map((e, i) => ({
		id: i + 1,
		slug: e.slug,
		category_id: catSlugToId[e.category_slug],
		category_slug: e.category_slug,
		brand_id: brandSlugToId[e.brand_slug],
		brand_slug: e.brand_slug,
		product_id: e.product_slug ? productSlugToId[e.product_slug] : null,
		product_slug: e.product_slug,
		applicable_products: e.applicable_products || [],
		error_code: e.error_code,
		difficulty: e.difficulty,
		estimated_time: e.time,
		estimated_cost: e.cost,
		requires_official_sav: Boolean(e.savNote),
		title: e.title[lang],
		symptom: e.symptoms[lang],
		solution: e.fix[lang],
		tools: e.tools?.[lang] || e.tools?.fr || '',
		safety_warning: e.caution?.[lang] || null,
		sav_note: e.savNote?.[lang] || null,
	}));

	return {
		source: 'fallback',
		lang,
		categories,
		brands,
		products,
		errors: apiErrors,
	};
}

mkdirSync(dirname(jsonPath), { recursive: true });
writeFileSync(sqlPath, sql, 'utf8');

const fallback = {};
for (const lang of LANGS) {
	fallback[lang] = buildApiPayload(lang);
}
writeFileSync(jsonPath, JSON.stringify(fallback, null, 2), 'utf8');

console.log(`Wrote ${sqlPath} (${errorRows.length} errors, ${productRows.length} products)`);
console.log(`Wrote ${jsonPath}`);
