#!/usr/bin/env node
/**
 * Vérifie les cartes ProductBox des blocs GSC (pick / compact) dans dist :
 * - image locale ou webp (pas .svg)
 * - montant sans date de relevé interdit
 * - pas d’avis / étoiles Amazon
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { load as loadHtml } from 'cheerio';
import { GSC_INTENT_PATHS } from '../src/data/gscIntentPageConfig.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.resolve(root, process.argv[2] || 'dist');

const errors = [];

function checkFile(urlPath, file) {
	const html = fs.readFileSync(file, 'utf8');
	const $ = loadHtml(html);
	const sections = $('.gsc-intent-pick, .gsc-pick-compact, .gsc-intent-conclusion');
	if (!sections.length) return;
	sections.each((_, sec) => {
		const $sec = $(sec);
		$sec.find('.product-box').each((__, box) => {
			const $box = $(box);
			const id = $box.attr('data-product-id') || $box.find('[data-product-id]').attr('data-product-id') || '?';
			const img = $box.find('.product-box-img img, .product-image img, img').first().attr('src') || '';
			if (!img || img.endsWith('.svg') || img.includes('.svg?')) {
				errors.push({ path: urlPath, id, issue: 'image_svg_or_missing', img });
			} else if (img.startsWith('/images/')) {
				const rel = img.replace(/^\//, '').split('?')[0];
				const disk = path.join(dist, rel);
				if (!fs.existsSync(disk)) {
					errors.push({ path: urlPath, id, issue: 'image_missing_dist', img });
				}
			}
			const priceMode = $box.find('.product-price').attr('data-mode');
			if (priceMode === 'amount') {
				const dateEl = $box.find('.product-price-date').text().trim();
				if (!dateEl) {
					errors.push({ path: urlPath, id, issue: 'price_without_date' });
				}
			}
			const text = $box.text();
			if (/\b(\d+([.,]\d+)?\s*(out of|sur)\s*5|Amazon\s+rating|étoiles?\s+Amazon)/i.test(text)) {
				errors.push({ path: urlPath, id, issue: 'amazon_rating_text' });
			}
		});
	});
}

for (const urlPath of Object.keys(GSC_INTENT_PATHS)) {
	const rel = urlPath.replace(/^\//, '').replace(/\/$/, '');
	const file = path.join(dist, rel, 'index.html');
	if (!fs.existsSync(file)) continue;
	checkFile(urlPath, file);
}

// Hubs comparatif (pick compact hors GSC_INTENT_PATHS layout inject)
for (const hub of [
	'/meilleur-robot-programmable-enfant-2026/',
	'/de/bester-programmierbarer-roboter-fuer-kinder/',
	'/it/miglior-robot-programmabile-per-bambini/',
	'/es/mejor-robot-programable-para-ninos/',
]) {
	const rel = hub.replace(/^\//, '').replace(/\/$/, '');
	const file = path.join(dist, rel, 'index.html');
	if (fs.existsSync(file)) checkFile(hub, file);
}

if (errors.length) {
	console.error(JSON.stringify({ ok: false, count: errors.length, errors }, null, 2));
	process.exit(1);
}
console.log(JSON.stringify({ ok: true, checked: 'gsc-cta-cards' }));