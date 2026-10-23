#!/usr/bin/env node

import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const fontsDir = join(projectRoot, 'public', 'fonts');

mkdirSync(fontsDir, { recursive: true });

/**
 * Download Nunito 800 and Nunito Sans 400,600,700 from Google Fonts API
 */

const fonts = [
	{
		family: 'Nunito',
		weight: 800,
		url: 'https://fonts.googleapis.com/css2?family=Nunito:wght@800&display=swap',
	},
	{
		family: 'Nunito Sans',
		weights: [400, 600, 700],
		url: 'https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap',
	},
];

async function downloadFonts() {
	for (const font of fonts) {
		console.log(`Fetching ${font.family}...`);
		const response = await fetch(font.url, {
			headers: {
				'User-Agent':
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
			},
		});

		const css = await response.text();
		console.log(`Downloaded CSS for ${font.family}`);

		// Extract woff2 URLs and download them
		const woff2Regex = /url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)/g;
		const matches = [...css.matchAll(woff2Regex)];

		for (let i = 0; i < matches.length; i++) {
			const url = matches[i][1];
			console.log(`  Downloading font file ${i + 1}/${matches.length}...`);
			const fontResponse = await fetch(url);
			const buffer = await fontResponse.arrayBuffer();

			// Extract weight from CSS
			const fontFaceBlock = css.substring(0, css.indexOf(matches[i][0]));
			const lastFontWeight = fontFaceBlock.lastIndexOf('font-weight:');
			const weightMatch = fontFaceBlock.substring(lastFontWeight).match(/font-weight:\s*(\d+)/);
			const weight = weightMatch ? weightMatch[1] : '400';

			const filename = `${font.family.toLowerCase().replace(/\s+/g, '-')}-${weight}-${i}.woff2`;
			const filepath = join(fontsDir, filename);
			writeFileSync(filepath, Buffer.from(buffer));
			console.log(`  Saved: ${filename}`);
		}
	}

	console.log('✅ All fonts downloaded successfully!');
}

downloadFonts().catch(console.error);
