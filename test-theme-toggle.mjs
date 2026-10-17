import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function testThemeToggle() {
	const browser = await chromium.launch({ headless: true });
	const context = await browser.newContext({
		viewport: { width: 1280, height: 720 },
		colorScheme: 'light'
	});
	const page = await context.newPage();

	try {
		console.log('📸 Testing homepage light mode...');
		await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
		await page.waitForTimeout(500);
		await page.screenshot({ 
			path: join(__dirname, 'screenshots', 'homepage-light-mode.png'),
			fullPage: false
		});

		console.log('📸 Testing homepage with dark mode toggle...');
		await page.click('#theme-toggle');
		await page.waitForTimeout(300);
		await page.screenshot({ 
			path: join(__dirname, 'screenshots', 'homepage-dark-mode.png'),
			fullPage: false
		});

		console.log('📸 Testing /blog/ page...');
		await page.goto('http://localhost:4321/blog/', { waitUntil: 'networkidle' });
		await page.waitForTimeout(500);
		await page.screenshot({ 
			path: join(__dirname, 'screenshots', 'blog-dark-mode.png'),
			fullPage: true
		});

		console.log('📸 Testing mobile menu with theme toggle...');
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
		await page.waitForTimeout(300);
		await page.click('#mobile-menu-toggle');
		await page.waitForTimeout(300);
		await page.screenshot({ 
			path: join(__dirname, 'screenshots', 'mobile-menu-dark-theme.png'),
			fullPage: false
		});

		console.log('✅ All screenshots captured successfully!');
	} catch (error) {
		console.error('❌ Error:', error.message);
		throw error;
	} finally {
		await browser.close();
	}
}

testThemeToggle().catch(console.error);
