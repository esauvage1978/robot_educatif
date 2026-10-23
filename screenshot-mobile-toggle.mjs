import { chromium } from 'playwright';

async function screenshot() {
	const browser = await chromium.launch({ headless: true });
	const context = await browser.newContext({
		viewport: { width: 390, height: 844 },
		colorScheme: 'dark'
	});
	const page = await context.newPage();

	await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
	await page.evaluate(() => document.documentElement.dataset.theme = 'dark');
	await page.waitForTimeout(300);
	
	// Open mobile menu
	await page.click('#mobile-menu-toggle');
	await page.waitForTimeout(500);
	
	await page.screenshot({ 
		path: './screenshots/mobile-toggle-390px.png',
		fullPage: false
	});
	
	console.log('✅ Screenshot saved: screenshots/mobile-toggle-390px.png');
	await browser.close();
}

screenshot().catch(console.error);
