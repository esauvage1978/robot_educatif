import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicImagesDir = join(__dirname, '..', 'public', 'images');

// Images to optimize (>300KB)
const targetFiles = [
	'blog/raspberry-pi3-mise-en-route/raspberry-pi-3-model-b-sven-petersen-cc-by-sa-4.jpg',
	'blog/inset-mbot2.png',
	'eilik/eilik-atelier.png',
	'blog/inset-cyberpi.png',
	'blog/codey-rocky-mblock-atelier.png',
	'blog/robots-educatif-plus-de-1000-euros-2026/ubtech-ugot-transforming.png',
	'blog/inset-mbot-vs.png',
	'blog/installer-blocs-mbot/etape-02-bibliotheque.png',
	'blog/installer-blocs-mbot/etape-03-mbot-selectionne.png',
	'eilik/eilik-vs-programmable.png',
	'blog/robots-educatif-plus-de-1000-euros-2026/elephant-myagv-pi.png',
	'blog/raspberry-pi-comparatif-2026/pi-4-model-b-top-laserlicht-cc-by-sa-4-opt.jpg',
	'blog/installer-blocs-mbot/etape-04-palette-blocs-mbot.png',
];

async function optimizeImage(filePath) {
	const fullPath = join(publicImagesDir, filePath);
	const ext = extname(filePath).toLowerCase();
	const outputPath = fullPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
	
	try {
		const stats = await stat(fullPath);
		const sizeBefore = (stats.size / 1024 / 1024).toFixed(2);
		
		// Convert to WebP with quality 80
		await sharp(fullPath)
			.webp({ quality: 80, effort: 6 })
			.toFile(outputPath);
		
		const statsAfter = await stat(outputPath);
		const sizeAfter = (statsAfter.size / 1024 / 1024).toFixed(2);
		
		console.log(`✓ ${filePath}`);
		console.log(`  ${sizeBefore} MB → ${sizeAfter} MB (${Math.round((1 - statsAfter.size / stats.size) * 100)}% reduction)`);
		
		return {
			original: filePath,
			webp: filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp'),
			sizeBefore: stats.size,
			sizeAfter: statsAfter.size,
		};
	} catch (error) {
		console.error(`✗ Error optimizing ${filePath}:`, error.message);
		return null;
	}
}

async function main() {
	console.log('Optimizing heavy images to WebP...\n');
	
	const results = [];
	for (const file of targetFiles) {
		const result = await optimizeImage(file);
		if (result) results.push(result);
	}
	
	console.log(`\n✓ Optimized ${results.length} images`);
	
	const totalBefore = results.reduce((sum, r) => sum + r.sizeBefore, 0);
	const totalAfter = results.reduce((sum, r) => sum + r.sizeAfter, 0);
	console.log(`Total size: ${(totalBefore / 1024 / 1024).toFixed(2)} MB → ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
	console.log(`Reduction: ${Math.round((1 - totalAfter / totalBefore) * 100)}%`);
	
	console.log('\nImage mappings (for reference updates):');
	results.forEach(r => {
		console.log(`  ${r.original} → ${r.webp}`);
	});
}

main().catch(console.error);
