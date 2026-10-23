#!/usr/bin/env node
/**
 * Vérifie que toutes les images référencées dans dist/ existent
 */
import { readdirSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

const distDir = join(process.cwd(), 'dist');

function checkHtmlFile(filepath) {
	const content = readFileSync(filepath, 'utf-8');
	const imgRegex = /<img[^>]+src=["']([^"']+)["']/g;
	const missing = [];
	
	let match;
	while ((match = imgRegex.exec(content)) !== null) {
		const src = match[1];
		
		// Skip external URLs
		if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
			continue;
		}
		
		// Resolve path
		let imgPath = src.startsWith('/') ? join(distDir, src) : join(distDir, src);
		
		if (!existsSync(imgPath)) {
			missing.push({ file: filepath.replace(distDir + '/', ''), src });
		}
	}
	
	return missing;
}

function walkDir(dir) {
	const files = readdirSync(dir, { withFileTypes: true });
	let allMissing = [];
	
	for (const file of files) {
		const fullPath = join(dir, file.name);
		
		if (file.isDirectory()) {
			allMissing = allMissing.concat(walkDir(fullPath));
		} else if (file.name.endsWith('.html')) {
			const missing = checkHtmlFile(fullPath);
			allMissing = allMissing.concat(missing);
		}
	}
	
	return allMissing;
}

function main() {
	if (!existsSync(distDir)) {
		console.error('❌ dist/ directory not found. Run npm run build first.');
		process.exit(1);
	}
	
	console.log('🔍 Checking for missing images in dist/...\n');
	
	const missing = walkDir(distDir);
	
	if (missing.length === 0) {
		console.log('✅ No missing images found!');
		process.exit(0);
	}
	
	console.error(`❌ Found ${missing.length} missing images:\n`);
	
	// Group by src
	const grouped = {};
	for (const item of missing) {
		if (!grouped[item.src]) {
			grouped[item.src] = [];
		}
		grouped[item.src].push(item.file);
	}
	
	for (const [src, files] of Object.entries(grouped)) {
		console.error(`  ${src} (${files.length}×)`);
		if (files.length <= 3) {
			files.forEach(f => console.error(`    - ${f}`));
		}
	}
	
	process.exit(1);
}

main();
