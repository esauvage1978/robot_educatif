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
	
	// Préparer les miniatures (grille complète, cellules vides = blanc)
	const composites = [];
	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			const i = row * cols + col;
			
			if (i < pins.length) {
				const pinPath = join(pinterestDir, pins[i]);
				
				const thumb = await sharp(pinPath)
					.resize(thumbWidth, thumbHeight, { fit: 'cover' })
					.toBuffer();
				
				composites.push({
					input: thumb,
					top: row * thumbHeight,
					left: col * thumbWidth
				});
			}
			// Cellules vides = déjà blanches (fond canvas)
		}
		
		if ((row + 1) % 2 === 0) {
			console.log(`  ${Math.min((row + 1) * cols, pins.length)}/${pins.length}...`);
		}
	}
	
	await canvas
		.composite(composites)
		.jpeg({ quality: 85 })
		.toFile(outputPath);
	
	console.log(`\n✅ Planche contact créée : captures-produits/pinterest-contact-sheet.jpg`);
	console.log(`📐 ${canvasWidth}×${canvasHeight} (${cols} colonnes × ${rows} lignes)`);
	console.log(`📊 ${pins.length} épingles + ${rows * cols - pins.length} cellules vides`);
}

main().catch(console.error);
