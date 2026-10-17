#!/usr/bin/env node
/**
 * Audit de contraste WCAG AA sur les pages clés du site
 * Teste en mode clair et sombre, desktop et mobile
 */
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const AUDIT_DIR = resolve(__dirname, '../audit-contrast');

const PAGES = [
	{ name: 'accueil', url: 'http://localhost:4321/', selectors: [
		{ name: 'nav-link', selector: '.internal-links a:first-of-type' },
		{ name: 'hero-title', selector: '.hero-content h1' },
		{ name: 'hero-em-teal', selector: '.hero-content h1 em' },
		{ name: 'hero-lead', selector: '.hero-lead' },
		{ name: 'trust-signal', selector: '.trust-signals span' },
		{ name: 'hero-card-title', selector: '.hero-card .card-info strong' },
		{ name: 'section-heading', selector: '.section-header h2' },
		{ name: 'article-card-title', selector: '.article-card h3' },
	]},
	{ name: 'guide-noel', url: 'http://localhost:4321/robot-educatif-cadeau-noel-2026/', selectors: [
		{ name: 'nav-link', selector: '.internal-links a:first-of-type' },
		{ name: 'page-title', selector: 'h1' },
		{ name: 'body-text', selector: 'article p:first-of-type' },
		{ name: 'product-name', selector: '.product-name' },
	]},
	{ name: 'categorie', url: 'http://localhost:4321/programmation/', selectors: [
		{ name: 'nav-link', selector: '.internal-links a:first-of-type' },
		{ name: 'page-title', selector: 'h1' },
		{ name: 'card-title', selector: '.card h3, .article-card h3' },
	]},
	{ name: 'tutoriel', url: 'http://localhost:4321/mbot-detecter-ligne-noire-capteur/', selectors: [
		{ name: 'nav-link', selector: '.internal-links a:first-of-type' },
		{ name: 'page-title', selector: 'h1' },
		{ name: 'body-text', selector: 'article p:first-of-type' },
	]},
];

const VIEWPORTS = [
	{ name: 'desktop', width: 1280, height: 800 },
	{ name: 'mobile', width: 390, height: 844 },
];

const THEMES = ['light', 'dark'];

/**
 * Calcule le contraste relatif selon WCAG 2.1
 * @param {string} fg - couleur foreground RGB "rgb(r, g, b)"
 * @param {string} bg - couleur background RGB "rgb(r, g, b)"
 * @returns {number} ratio de contraste
 */
function getContrastRatio(fg, bg) {
	const parsedFg = parseRgb(fg);
	const parsedBg = parseRgb(bg);
	if (!parsedFg || !parsedBg) return 0;
	
	const l1 = relativeLuminance(parsedFg);
	const l2 = relativeLuminance(parsedBg);
	const [lighter, darker] = l1 > l2 ? [l1, l2] : [l2, l1];
	return (lighter + 0.05) / (darker + 0.05);
}

function parseRgb(rgb) {
	const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
	if (!match) return null;
	return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
}

function relativeLuminance([r, g, b]) {
	const [rs, gs, bs] = [r, g, b].map(c => {
		c = c / 255;
		return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
	});
	return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

async function auditPage(browser, page, viewport, theme) {
	const context = await browser.newContext({
		viewport,
		colorScheme: theme,
	});
	const pageInstance = await context.newPage();
	
	await pageInstance.goto(page.url, { waitUntil: 'networkidle' });
	await pageInstance.waitForTimeout(1000);
	
	const screenshotPath = resolve(AUDIT_DIR, `${page.name}-${viewport.name}-${theme}-before.png`);
	await pageInstance.screenshot({ path: screenshotPath, fullPage: false });
	
	const results = [];
	
	for (const selector of page.selectors) {
		try {
			const element = await pageInstance.locator(selector.selector).first();
			if (await element.count() === 0) continue;
			
			const fgColor = await element.evaluate(el => window.getComputedStyle(el).color);
			const bgColor = await element.evaluate(el => {
				let node = el;
				while (node && node !== document.body) {
					const bg = window.getComputedStyle(node).backgroundColor;
					if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
						return bg;
					}
					node = node.parentElement;
				}
				return window.getComputedStyle(document.body).backgroundColor;
			});
			
			const fontSize = await element.evaluate(el => {
				const size = parseFloat(window.getComputedStyle(el).fontSize);
				const weight = window.getComputedStyle(el).fontWeight;
				return { size, weight: parseInt(weight) };
			});
			
			const ratio = getContrastRatio(fgColor, bgColor);
			const isLargeText = fontSize.size >= 18 || (fontSize.size >= 14 && fontSize.weight >= 700);
			const wcagAA = isLargeText ? 3 : 4.5;
			const pass = ratio >= wcagAA;
			
			results.push({
				selector: selector.name,
				fg: fgColor,
				bg: bgColor,
				ratio: ratio.toFixed(2),
				wcagAA,
				pass,
				fontSize: fontSize.size,
				fontWeight: fontSize.weight,
			});
		} catch (err) {
			console.warn(`Erreur pour ${selector.name} sur ${page.name}:`, err.message);
		}
	}
	
	await context.close();
	return results;
}

async function main() {
	mkdirSync(AUDIT_DIR, { recursive: true });
	
	const browser = await chromium.launch();
	const allResults = {};
	
	console.log('🔍 Démarrage de l\'audit de contraste WCAG AA...\n');
	
	for (const page of PAGES) {
		for (const viewport of VIEWPORTS) {
			for (const theme of THEMES) {
				const key = `${page.name}-${viewport.name}-${theme}`;
				console.log(`📄 ${key}...`);
				allResults[key] = await auditPage(browser, page, viewport, theme);
			}
		}
	}
	
	await browser.close();
	
	const reportPath = resolve(AUDIT_DIR, 'rapport-avant.json');
	writeFileSync(reportPath, JSON.stringify(allResults, null, 2));
	
	console.log('\n✅ Audit terminé!');
	console.log(`📊 Rapport: ${reportPath}`);
	console.log(`📸 Captures: ${AUDIT_DIR}/*.png`);
	
	// Afficher un résumé des échecs
	console.log('\n⚠️  Éléments en échec WCAG AA:\n');
	let failures = 0;
	for (const [key, results] of Object.entries(allResults)) {
		const failed = results.filter(r => !r.pass);
		if (failed.length > 0) {
			console.log(`${key}:`);
			failed.forEach(f => {
				console.log(`  ❌ ${f.selector}: ${f.ratio}:1 (requis: ${f.wcagAA}:1) - ${f.fg} sur ${f.bg}`);
				failures++;
			});
		}
	}
	
	if (failures === 0) {
		console.log('🎉 Aucun échec détecté!');
	} else {
		console.log(`\n❌ Total: ${failures} échecs de contraste`);
	}
}

main().catch(console.error);
