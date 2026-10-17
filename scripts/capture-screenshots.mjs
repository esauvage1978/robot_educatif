#!/usr/bin/env node
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCREENSHOT_DIR = resolve(__dirname, '../captures-produits');

mkdirSync(SCREENSHOT_DIR, { recursive: true });

const pages = [
	{ name: 'accueil-desktop', url: 'http://localhost:4321/', viewport: { width: 1280, height: 800 } },
	{ name: 'accueil-mobile', url: 'http://localhost:4321/', viewport: { width: 390, height: 844 } },
	{ name: 'guide-noel-desktop', url: 'http://localhost:4321/robot-educatif-cadeau-noel-2026/', viewport: { width: 1280, height: 800 } },
	{ name: 'guide-noel-mobile', url: 'http://localhost:4321/robot-educatif-cadeau-noel-2026/', viewport: { width: 390, height: 844 } },
];

async function main() {
	const browser = await chromium.launch();
	
	for (const page of pages) {
		const context = await browser.newContext({ viewport: page.viewport });
		const pageInstance = await context.newPage();
		
		await pageInstance.goto(page.url, { waitUntil: 'networkidle' });
		await pageInstance.waitForTimeout(2000);
		
		const screenshotPath = resolve(SCREENSHOT_DIR, `${page.name}.png`);
		await pageInstance.screenshot({ path: screenshotPath, fullPage: false });
		
		console.log(`✅ ${page.name}.png`);
		await context.close();
	}
	
	await browser.close();
	console.log(`\n📁 Captures dans ${SCREENSHOT_DIR}/`);
}

main().catch(console.error);
