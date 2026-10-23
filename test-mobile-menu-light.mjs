import { chromium } from 'playwright';
import { join } from 'path';

async function testMobileMenuLight() {
	const browser = await chromium.launch({ headless: true });
	const context = await browser.newContext({
		viewport: { width: 375, height: 667 },
		colorScheme: 'light'
	});
	const page = await context.newPage();

	try {
		console.log('📸 Testing mobile menu light mode...');
		await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
		await page.waitForTimeout(300);
		await page.click('#mobile-menu-toggle');
		await page.waitForTimeout(300);
		await page.screenshot({ 
			path: join(process.cwd(), 'screenshots', 'mobile-menu-light-theme.png'),
			fullPage: false
		});

		console.log('✅ Screenshot captured!');
	} finally {
		await browser.close();
	}
}

testMobileMenuLight().catch(console.error);
