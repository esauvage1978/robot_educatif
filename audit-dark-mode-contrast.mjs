import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { join } from 'path';

function getLuminance(r, g, b) {
	const [rs, gs, bs] = [r, g, b].map(c => {
		c = c / 255;
		return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
	});
	return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(rgb1, rgb2) {
	const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
	const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
	const lighter = Math.max(l1, l2);
	const darker = Math.min(l1, l2);
	return (lighter + 0.05) / (darker + 0.05);
}

function parseRgb(rgbString) {
	const match = rgbString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
	if (!match) return null;
	return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
}

async function checkElement(page, selector, description, minRatio = 4.5) {
	try {
		const element = await page.locator(selector).first();
		if (!(await element.isVisible())) {
			return { selector, description, status: 'skipped', reason: 'not visible' };
		}

		const color = await element.evaluate(el => window.getComputedStyle(el).color);
		const bgColor = await element.evaluate(el => {
			let current = el;
			while (current && current !== document.body) {
				const bg = window.getComputedStyle(current).backgroundColor;
				if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
					return bg;
				}
				current = current.parentElement;
			}
			return window.getComputedStyle(document.body).backgroundColor;
		});

		const textRgb = parseRgb(color);
		const bgRgb = parseRgb(bgColor);

		if (!textRgb || !bgRgb) {
			return { selector, description, status: 'error', reason: 'could not parse colors' };
		}

		const ratio = getContrastRatio(textRgb, bgRgb);
		const passes = ratio >= minRatio;

		return {
			selector,
			description,
			color,
			bgColor,
			ratio: ratio.toFixed(2),
			minRatio,
			status: passes ? 'pass' : 'fail'
		};
	} catch (error) {
		return { selector, description, status: 'error', reason: error.message };
	}
}

async function auditPage(page, url, pageName) {
	console.log(`\n🔍 Auditing ${pageName} (${url})...`);
	await page.goto(url, { waitUntil: 'networkidle' });
	await page.evaluate(() => {
		document.documentElement.dataset.theme = 'dark';
	});
	await page.waitForTimeout(300);

	const checks = [
		// Headers and navigation
		{ selector: 'header nav a', desc: 'Navigation links', minRatio: 4.5 },
		{ selector: 'header .brand', desc: 'Brand link', minRatio: 4.5 },
		
		// Main content text
		{ selector: 'h1', desc: 'Main heading (h1)', minRatio: 3.0 },
		{ selector: 'h2', desc: 'Subheading (h2)', minRatio: 3.0 },
		{ selector: 'h3', desc: 'Subheading (h3)', minRatio: 3.0 },
		{ selector: 'p', desc: 'Paragraph text', minRatio: 4.5 },
		{ selector: 'a', desc: 'Links in content', minRatio: 4.5 },
		
		// Buttons and CTAs
		{ selector: 'button', desc: 'Buttons', minRatio: 4.5 },
		{ selector: '.cta, .button', desc: 'CTA buttons', minRatio: 4.5 },
		
		// Product cards
		{ selector: '.product-card h3', desc: 'Product card title', minRatio: 3.0 },
		{ selector: '.product-card p', desc: 'Product card text', minRatio: 4.5 },
		{ selector: '.product-card .price', desc: 'Product price', minRatio: 4.5 },
		
		// Article cards
		{ selector: '.article-card h3', desc: 'Article card title', minRatio: 3.0 },
		{ selector: '.article-card p', desc: 'Article card description', minRatio: 4.5 },
		{ selector: '.article-card time', desc: 'Article date', minRatio: 4.5 },
		
		// Badges
		{ selector: '.badge', desc: 'Badges', minRatio: 4.5 },
		{ selector: '.tag', desc: 'Tags', minRatio: 4.5 },
		
		// Footer
		{ selector: 'footer a', desc: 'Footer links', minRatio: 4.5 },
		{ selector: 'footer p', desc: 'Footer text', minRatio: 4.5 },
		
		// Tables
		{ selector: 'table th', desc: 'Table headers', minRatio: 4.5 },
		{ selector: 'table td', desc: 'Table cells', minRatio: 4.5 },
		
		// Callouts/Alerts
		{ selector: '.callout', desc: 'Callouts', minRatio: 4.5 },
		{ selector: '.alert', desc: 'Alerts', minRatio: 4.5 },
		
		// Secondary text
		{ selector: '.text-secondary, .secondary', desc: 'Secondary text', minRatio: 4.5 },
		{ selector: '.text-muted, .muted', desc: 'Muted text', minRatio: 4.5 },
	];

	const results = [];
	for (const check of checks) {
		const result = await checkElement(page, check.selector, check.desc, check.minRatio);
		results.push(result);
		
		const icon = result.status === 'pass' ? '✅' : result.status === 'fail' ? '❌' : '⚠️';
		console.log(`${icon} ${result.description}: ${result.status === 'pass' || result.status === 'fail' ? `${result.ratio}:1 (min: ${result.minRatio}:1)` : result.reason || result.status}`);
	}

	return { pageName, url, results };
}

async function runAudit() {
	const browser = await chromium.launch({ headless: true });
	const context = await browser.newContext({
		viewport: { width: 1280, height: 720 },
		colorScheme: 'dark'
	});
	const page = await context.newPage();

	const allResults = [];

	try {
		// Test homepage
		const homeResults = await auditPage(page, 'http://localhost:4321/', 'Homepage');
		allResults.push(homeResults);
		await page.screenshot({ 
			path: join(process.cwd(), 'screenshots', 'audit-home-dark.png'),
			fullPage: false
		});

		// Test blog listing
		const blogResults = await auditPage(page, 'http://localhost:4321/blog/', 'Blog Listing');
		allResults.push(blogResults);
		await page.screenshot({ 
			path: join(process.cwd(), 'screenshots', 'audit-blog-dark.png'),
			fullPage: true
		});

		// Test an article
		const articleResults = await auditPage(page, 'http://localhost:4321/10-projets-mbot-gratuits-classe-faciles/', 'Article Page');
		allResults.push(articleResults);
		await page.screenshot({ 
			path: join(process.cwd(), 'screenshots', 'audit-article-dark.png'),
			fullPage: true
		});

		// Test a product page
		const productResults = await auditPage(page, 'http://localhost:4321/meilleur-robot-programmable-enfant-2026/', 'Product Guide');
		allResults.push(productResults);
		await page.screenshot({ 
			path: join(process.cwd(), 'screenshots', 'audit-product-dark.png'),
			fullPage: true
		});

		// Generate summary
		console.log('\n\n📊 AUDIT SUMMARY\n================');
		let totalChecks = 0;
		let passedChecks = 0;
		let failedChecks = 0;
		const failures = [];

		for (const pageResult of allResults) {
			console.log(`\n${pageResult.pageName}:`);
			const pagePassed = pageResult.results.filter(r => r.status === 'pass').length;
			const pageFailed = pageResult.results.filter(r => r.status === 'fail').length;
			const pageTotal = pageResult.results.filter(r => r.status !== 'skipped' && r.status !== 'error').length;
			
			console.log(`  ✅ Passed: ${pagePassed}/${pageTotal}`);
			console.log(`  ❌ Failed: ${pageFailed}/${pageTotal}`);

			totalChecks += pageTotal;
			passedChecks += pagePassed;
			failedChecks += pageFailed;

			pageResult.results.filter(r => r.status === 'fail').forEach(r => {
				failures.push({ page: pageResult.pageName, ...r });
			});
		}

		console.log(`\n🎯 TOTAL: ${passedChecks}/${totalChecks} passed (${((passedChecks/totalChecks)*100).toFixed(1)}%)`);

		if (failures.length > 0) {
			console.log('\n❌ FAILURES TO FIX:\n');
			failures.forEach(f => {
				console.log(`${f.page} - ${f.description}`);
				console.log(`  Selector: ${f.selector}`);
				console.log(`  Current: ${f.ratio}:1 (needs ${f.minRatio}:1)`);
				console.log(`  Text: ${f.color} on ${f.bgColor}\n`);
			});
		}

		// Write detailed report
		writeFileSync(
			join(process.cwd(), 'dark-mode-contrast-report.json'),
			JSON.stringify({ allResults, summary: { totalChecks, passedChecks, failedChecks, failures } }, null, 2)
		);

		console.log('\n✅ Full report saved to dark-mode-contrast-report.json');

	} catch (error) {
		console.error('❌ Audit failed:', error);
		throw error;
	} finally {
		await browser.close();
	}
}

runAudit().catch(console.error);
