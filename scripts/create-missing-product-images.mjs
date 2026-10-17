#!/usr/bin/env node
import { writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, '../public/images/products');

const COLORS = {
	darkBg: '#0B1F2A',
	teal: '#0F766E',
	tealLight: '#14B8A6',
	orange: '#F97316',
	white: '#ffffff'
};

const products = [
	{ id: 'mbot', name: 'mBot', color: COLORS.teal },
	{ id: 'cyberpi', name: 'CyberPi', color: COLORS.tealLight },
	{ id: 'mbot-ranger', name: 'mBot Ranger', color: COLORS.teal },
	{ id: 'codey-rocky', name: 'Codey Rocky', color: COLORS.teal },
	{ id: 'elegoo-robot-car', name: 'ELEGOO Smart Car', color: COLORS.orange },
	{ id: 'elegoo-penguin', name: 'ELEGOO Penguin', color: COLORS.orange },
	{ id: 'raspberry-pi-5-4gb', name: 'Raspberry Pi 5 4GB', color: '#C51A4A' },
	{ id: 'raspberry-pi-5-8gb', name: 'Raspberry Pi 5 8GB', color: '#C51A4A' }
];

function generateSvg(product) {
	const size = 600;
	const svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
	<defs>
		<linearGradient id="bg-${product.id}" x1="0%" y1="0%" x2="100%" y2="100%">
			<stop offset="0%" style="stop-color:#ffffff"/>
			<stop offset="100%" style="stop-color:#f8fafc"/>
		</linearGradient>
	</defs>
	<rect width="${size}" height="${size}" fill="url(#bg-${product.id})"/>
	<circle cx="${size/2}" cy="${size/2 - 50}" r="180" fill="${product.color}" opacity="0.1"/>
	<g transform="translate(${size/2 - 80}, ${size/2 - 130})">
		<rect x="20" y="30" width="120" height="100" rx="15" fill="${product.color}"/>
		<line x1="80" y1="15" x2="80" y2="30" stroke="${product.color}" stroke-width="8" stroke-linecap="round"/>
		<circle cx="80" cy="10" r="10" fill="${product.color}"/>
		<circle cx="55" cy="70" r="12" fill="white"/>
		<circle cx="105" cy="70" r="12" fill="white"/>
		<rect x="60" y="100" width="40" height="8" rx="4" fill="white" opacity="0.8"/>
	</g>
	<text x="${size/2}" y="${size - 100}" font-family="system-ui, sans-serif" font-size="40" font-weight="800" fill="${product.color}" text-anchor="middle">${product.name}</text>
	<text x="${size/2}" y="${size - 40}" font-family="system-ui, sans-serif" font-size="18" font-weight="600" fill="#64748B" text-anchor="middle">Photo fabricant à venir</text>
</svg>`;
	return svg;
}

async function main() {
	console.log('🎨 Création images produits manquantes...\n');
	
	for (const product of products) {
		const outputPath = join(OUTPUT_DIR, `${product.id}.webp`);
		
		if (existsSync(outputPath)) {
			console.log(`⏭️  ${product.id}.webp existe déjà`);
			continue;
		}
		
		const svg = generateSvg(product);
		await sharp(Buffer.from(svg))
			.webp({ quality: 90, effort: 6 })
			.toFile(outputPath);
		
		const stats = await sharp(outputPath).metadata();
		const sizeKb = Math.round(stats.size / 1024);
		console.log(`✅ ${product.id}.webp : ${sizeKb} Ko`);
	}
	
	console.log('\n✨ Terminé!');
}

main().catch(console.error);
