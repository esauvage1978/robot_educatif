#!/usr/bin/env node
/**
 * Crée des images produits placeholder de haute qualité (600×600 WebP)
 * En attendant les photos officielles des fabricants
 */
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = resolve(__dirname, '../public/images/products');

mkdirSync(OUTPUT_DIR, { recursive: true });

const products = {
	'mbot-neo': {
		name: 'mBot Neo',
		color: '#0F766E',
		category: 'Robot éducatif Scratch/Python'
	},
	'mbot2': {
		name: 'mBot2',
		color: '#14B8A6',
		category: 'Robot avancé Python/IoT'
	},
	'lego-spike-essential': {
		name: 'LEGO SPIKE Essential',
		color: '#FFCF00',
		category: 'Kit robotique LEGO Education'
	},
	'arduino-starter-kit': {
		name: 'Arduino Starter Kit',
		color: '#00979D',
		category: 'Kit électronique Arduino C++'
	}
};

function generateProductSvg(product) {
	const { name, color, category } = product;
	const size = 600;
	
	const svg = `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
	<defs>
		<linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
			<stop offset="0%" style="stop-color:#ffffff"/>
			<stop offset="100%" style="stop-color:#f8fafc"/>
		</linearGradient>
	</defs>
	<rect width="${size}" height="${size}" fill="url(#bg)"/>
	<circle cx="${size/2}" cy="${size/2 - 50}" r="180" fill="${color}" opacity="0.1"/>
	
	<!-- Robot icon -->
	<g transform="translate(${size/2 - 80}, ${size/2 - 120})">
		<rect x="20" y="30" width="120" height="100" rx="15" fill="${color}"/>
		<line x1="80" y1="15" x2="80" y2="30" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
		<circle cx="80" cy="10" r="10" fill="${color}"/>
		<circle cx="55" cy="70" r="12" fill="white"/>
		<circle cx="105" cy="70" r="12" fill="white"/>
		<rect x="60" y="100" width="40" height="8" rx="4" fill="white" opacity="0.8"/>
	</g>
	
	<text x="${size/2}" y="${size - 120}" font-family="system-ui, sans-serif" font-size="36" font-weight="800" fill="${color}" text-anchor="middle">${name}</text>
	<text x="${size/2}" y="${size - 70}" font-family="system-ui, sans-serif" font-size="18" font-weight="600" fill="#64748B" text-anchor="middle">${category}</text>
	<text x="${size/2}" y="${size - 30}" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#94a3b8" text-anchor="middle">Photo officielle à venir</text>
</svg>`;
	
	return svg;
}

async function main() {
	console.log('🎨 Création des images placeholder 600×600...\n');
	
	for (const [id, product] of Object.entries(products)) {
		const svg = generateProductSvg(product);
		const outputPath = resolve(OUTPUT_DIR, `${id}.webp`);
		
		try {
			await sharp(Buffer.from(svg))
				.webp({ quality: 90, effort: 6 })
				.toFile(outputPath);
			
			const stats = await sharp(outputPath).metadata();
			const sizeKb = Math.round(stats.size / 1024);
			console.log(`✅ ${id}.webp : ${sizeKb} Ko`);
		} catch (err) {
			console.error(`❌ ${id} : ${err.message}`);
		}
	}
	
	console.log('\n📁 Images créées dans public/images/products/');
	console.log('💡 Remplacez par les photos officielles des fabricants dès que possible');
}

main().catch(console.error);
