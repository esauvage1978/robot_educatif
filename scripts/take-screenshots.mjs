#!/usr/bin/env node

import { execSync } from 'child_process';
import { mkdirSync } from 'fs';

const screenshotsDir = '/tmp/redesign-screenshots';
mkdirSync(screenshotsDir, { recursive: true });

const pages = [
	{ url: 'http://localhost:8080/', name: 'homepage-desktop', width: 1280, height: 1024 },
	{ url: 'http://localhost:8080/', name: 'homepage-mobile', width: 390, height: 844 },
	{ url: 'http://localhost:8080/partenariat/', name: 'partenariat-desktop', width: 1280, height: 1024 },
	{ url: 'http://localhost:8080/blog/', name: 'blog-desktop', width: 1280, height: 1024 },
	{ url: 'http://localhost:8080/meilleur-robot-programmable-enfant-2026/', name: 'guide-desktop', width: 1280, height: 1024 },
];

console.log('Taking screenshots with Chrome headless...');

for (const page of pages) {
	const filename = `${screenshotsDir}/${page.name}.png`;
	try {
		console.log(`📸 ${page.name} (${page.width}x${page.height})...`);
		execSync(
			`google-chrome --headless --disable-gpu --screenshot="${filename}" --window-size=${page.width},${page.height} --hide-scrollbars "${page.url}"`,
			{ stdio: 'inherit' }
		);
		console.log(`   ✓ Saved to ${filename}`);
	} catch (error) {
		console.error(`   ✗ Failed: ${error.message}`);
	}
}

console.log('\n✅ Screenshots complete!');
console.log(`📁 Location: ${screenshotsDir}/`);
