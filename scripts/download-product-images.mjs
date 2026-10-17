#!/usr/bin/env node
/**
 * Télécharge les photos officielles des fabricants et les convertit en WebP 600×600
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import https from 'https';
import http from 'http';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SOURCES_FILE = resolve(__dirname, '../src/data/product-image-sources.json');
const OUTPUT_DIR = resolve(__dirname, '../public/images/products');
const CREDITS_FILE = resolve(__dirname, '../src/data/product-image-credits.json');

mkdirSync(OUTPUT_DIR, { recursive: true });

const sources = JSON.parse(readFileSync(SOURCES_FILE, 'utf-8'));

async function downloadImage(url) {
	return new Promise((resolve, reject) => {
		const protocol = url.startsWith('https:') ? https : http;
		const chunks = [];
		
		protocol.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
			if (res.statusCode === 301 || res.statusCode === 302) {
				return downloadImage(res.headers.location).then(resolve).catch(reject);
			}
			if (res.statusCode !== 200) {
				return reject(new Error(`HTTP ${res.statusCode}`));
			}
			res.on('data', chunk => chunks.push(chunk));
			res.on('end', () => resolve(Buffer.concat(chunks)));
			res.on('error', reject);
		}).on('error', reject);
	});
}

async function convertToWebP(inputBuffer, outputPath) {
	const image = sharp(inputBuffer);
	await image
		.resize(600, 600, {
			fit: 'contain',
			background: { r: 255, g: 255, b: 255, alpha: 1 }
		})
		.flatten({ background: '#ffffff' })
		.webp({ quality: 85, effort: 6 })
		.toFile(outputPath);
}

async function main() {
	console.log('🖼️  Téléchargement des photos officielles...\n');
	
	const credits = {};
	const results = { success: [], failed: [], skipped: [] };
	
	for (const [productId, source] of Object.entries(sources)) {
		const outputPath = resolve(OUTPUT_DIR, `${productId}.webp`);
		
		if (existsSync(outputPath) && !process.argv.includes('--force')) {
			console.log(`⏭️  ${productId} : déjà téléchargé`);
			results.skipped.push(productId);
			credits[productId] = {
				name: source.name,
				manufacturer: source.manufacturer,
				sourcePageUrl: source.sourceUrl,
				imageSourceUrl: source.imageUrl,
				downloadedAt: new Date().toISOString().split('T')[0],
				note: source.note
			};
			continue;
		}
		
		try {
			console.log(`📥 ${productId}...`);
			const imageBuffer = await downloadImage(source.imageUrl);
			await convertToWebP(imageBuffer, outputPath);
			const sizeKb = Math.round(statSync(outputPath).size / 1024);
			console.log(`✅ ${productId} : ${sizeKb} Ko`);
			
			credits[productId] = {
				name: source.name,
				manufacturer: source.manufacturer,
				sourcePageUrl: source.sourceUrl,
				imageSourceUrl: source.imageUrl,
				downloadedAt: new Date().toISOString().split('T')[0],
				fileSizeKb: sizeKb,
				note: source.note
			};
			
			results.success.push(productId);
			await new Promise(r => setTimeout(r, 500));
			
		} catch (err) {
			console.error(`❌ ${productId} : ${err.message}`);
			results.failed.push({ productId, error: err.message });
		}
	}
	
	writeFileSync(CREDITS_FILE, JSON.stringify(credits, null, 2));
	console.log(`\n✅ ${results.success.length} téléchargés, ${results.skipped.length} ignorés, ${results.failed.length} échecs`);
}

main().catch(console.error);
