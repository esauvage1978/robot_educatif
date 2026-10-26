import { chromium } from 'playwright';
import { join } from 'path';

async function capturePages() {
	const browser = await chromium.launch({ headless: true });
	
	// Desktop context - dark mode
	const desktop = await browser.newContext({
		viewport: { width: 1280, height: 720 },
		colorScheme: 'dark'
	});
	const page = await desktop.newPage();

	console.log('📸 Homepage dark mode...');
	await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
	await page.evaluate(() => document.documentElement.dataset.theme = 'dark');
	await page.waitForTimeout(300);
	await page.screenshot({ 
		path: join(process.cwd(), 'screenshots', 'final-home-dark.png'),
		fullPage: false
	});

	console.log('📸 Blog listing dark mode...');
	await page.goto('http://localhost:4321/blog/', { waitUntil: 'networkidle' });
	await page.waitForTimeout(300);
	await page.screenshot({ 
		path: join(process.cwd(), 'screenshots', 'final-blog-dark.png'),
		fullPage: false
	});

	console.log('📸 Article page dark mode...');
	await page.goto('http://localhost:4321/10-projets-mbot-gratuits-classe-faciles/', { waitUntil: 'networkidle' });
	await page.waitForTimeout(500);
	await page.screenshot({ 
		path: join(process.cwd(), 'screenshots', 'final-article-dark.png'),
		fullPage: false
	});

	console.log('📸 Product guide dark mode...');
	await page.goto('http://localhost:4321/meilleur-robot-programmable-enfant-2026/', { waitUntil: 'networkidle' });
	await page.waitForTimeout(500);
	await page.screenshot({ 
		path: join(process.cwd(), 'screenshots', 'final-product-dark.png'),
		fullPage: false
	});

	// Mobile context - dark mode with toggle
	const mobile = await browser.newContext({
		viewport: { width: 375, height: 667 },
		colorScheme: 'dark'
	});
	const mobilePage = await mobile.newPage();

	console.log('📸 Mobile homepage with theme toggle...');
	await mobilePage.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
	await mobilePage.evaluate(() => document.documentElement.dataset.theme = 'dark');
	await mobilePage.waitForTimeout(300);
	await mobilePage.click('#mobile-menu-toggle');
	await mobilePage.waitForTimeout(300);
	await mobilePage.screenshot({ 
		path: join(process.cwd(), 'screenshots', 'final-mobile-menu-dark.png'),
		fullPage: false
	});

	console.log('📸 Light mode for comparison...');
	await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
	await page.evaluate(() => document.documentElement.dataset.theme = 'light');
	await page.waitForTimeout(300);
	await page.screenshot({ 
		path: join(process.cwd(), 'screenshots', 'final-home-light.png'),
		fullPage: false
	});

	await browser.close();
	console.log('✅ All screenshots captured!');
}

capturePages().catch(console.error);
