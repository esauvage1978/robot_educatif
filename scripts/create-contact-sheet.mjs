#!/usr/bin/env node
import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pinterestDir = join(__dirname, '../public/pinterest');
const outputPath = join(__dirname, '../captures-produits/pinterest-contact-sheet.jpg');

async function main() {
	const pins = readdirSync(pinterestDir)
		.filter(f => f.endsWith('.jpg') && !f.includes('contact'))
		.sort();
	
	console.log(`📸 Création planche contact de ${pins.length} épingles...\n`);
	
	const thumbWidth = 200;
	const thumbHeight = 300;
	const cols = 6;
	const rows = Math.ceil(pins.length / cols);
	
	const canvasWidth = cols * thumbWidth;
	const canvasHeight = rows * thumbHeight;
	
	// Créer canvas blanc
	const canvas = sharp({
		create: {
			width: canvasWidth,
			height: canvasHeight,
			channels: 3,
			background: { r: 255, g: 255, b: 255 }
		}
	});
	
	// Préparer les miniatures
	const composites = [];
	for (let i = 0; i < pins.length; i++) {
		const pinPath = join(pinterestDir, pins[i]);
		const col = i % cols;
		const row = Math.floor(i / cols);
		
		const thumb = await sharp(pinPath)
			.resize(thumbWidth, thumbHeight, { fit: 'cover' })
			.toBuffer();
		
		composites.push({
			input: thumb,
			top: row * thumbHeight,
			left: col * thumbWidth
		});
		
		if ((i + 1) % 10 === 0) {
			console.log(`  ${i + 1}/${pins.length}...`);
		}
	}
	
	await canvas
		.composite(composites)
		.jpeg({ quality: 85 })
		.toFile(outputPath);
	
	console.log(`\n✅ Planche contact créée : captures-produits/pinterest-contact-sheet.jpg`);
	console.log(`📐 ${canvasWidth}×${canvasHeight} (${cols} colonnes × ${rows} lignes)`);
}

main().catch(console.error);
