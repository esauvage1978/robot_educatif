#!/usr/bin/env node
import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pinterestDir = join(__dirname, '../public/pinterest');

async function main() {
	const pins = readdirSync(pinterestDir).filter(f => f.endsWith('.jpg'));
	
	console.log('🔍 Vérification dimensions épingles...\n');
	
	let fixed = 0;
	for (const pin of pins) {
		const pinPath = join(pinterestDir, pin);
		const meta = await sharp(pinPath).metadata();
		
		if (meta.width !== 1000 || meta.height !== 1500) {
			console.log(`📐 ${pin} : ${meta.width}×${meta.height} → 1000×1500`);
			
			await sharp(pinPath)
				.resize(1000, 1500, { fit: 'contain', background: { r: 11, g: 31, b: 42, alpha: 1 } })
				.jpeg({ quality: 90, progressive: true })
				.toFile(pinPath + '.tmp');
			
			await sharp(pinPath + '.tmp')
				.toFile(pinPath);
			
			// Cleanup
			const fs = await import('fs');
			fs.unlinkSync(pinPath + '.tmp');
			
			fixed++;
		}
	}
	
	if (fixed === 0) {
		console.log('✅ Toutes les épingles font déjà 1000×1500');
	} else {
		console.log(`\n✅ ${fixed} épingles corrigées`);
	}
}

main().catch(console.error);
