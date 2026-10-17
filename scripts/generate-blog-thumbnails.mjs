/**
 * Génère une vignette 1200×630 unique par article
 * Utilisée pour cartes blog et og:image
 * - Retour à la ligne propre (mots entiers)
 * - Taille adaptative
 * - Vraie catégorie + photo produit quand disponible
 */
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, '../src/content/blog');
const outputDir = path.join(__dirname, '../public/images/blog-thumbnails');
const productsDir = path.join(__dirname, '../public/images/products');
const fontPath = path.join(__dirname, './fonts/Roboto-Bold.ttf');

const COLORS = {
	darkBg: '#0B1F2A',
	tealPrimary: '#0F766E',
	orangeAccent: '#F97316',
	white: '#FFFFFF'
};

async function extractFrontmatter(filePath) {
	const content = await fs.readFile(filePath, 'utf-8');
	const match = content.match(/^---\n([\s\S]*?)\n---/);
	if (!match) return null;
	
	const frontmatter = match[1];
	const titleMatch = frontmatter.match(/title:\s*["'](.+?)["']/);
	
	// Support format YAML liste (- "Cat") et inline ([Cat1, Cat2])
	let category = 'Guide';
	const categoriesInlineMatch = frontmatter.match(/categories:\s*\[([^\]]+)\]/);
	if (categoriesInlineMatch) {
		category = categoriesInlineMatch[1].split(',')[0].trim().replace(/["']/g, '');
	} else {
		const categoriesListMatch = frontmatter.match(/categories:\s*\n\s*-\s*["']?([^"'\n]+)["']?/);
		if (categoriesListMatch) {
			category = categoriesListMatch[1].trim();
		}
	}
	
	const productMatch = frontmatter.match(/heroImage:\s*['"]*.*?\/products\/([a-z0-9-]+)\.webp/);
	
	// Détecter produit via titre si pas dans heroImage
	let productSlug = productMatch ? productMatch[1] : null;
	if (!productSlug) {
		const title = titleMatch ? titleMatch[1].toLowerCase() : '';
		if (title.includes('mbot2')) productSlug = 'mbot2';
		else if (title.includes('mbot') && !title.includes('mblock')) productSlug = 'mbot';
		else if (title.includes('cyberpi')) productSlug = 'cyberpi';
		else if (title.includes('codey') || title.includes('rocky')) productSlug = 'codey-rocky';
		else if (title.includes('ranger')) productSlug = 'mbot-ranger';
		else if (title.includes('arduino')) productSlug = 'arduino-starter-kit';
		else if (title.includes('raspberry')) productSlug = title.includes('5') ? 'raspberry-pi-5-8gb' : 'raspberry-pi-5-4gb';
		else if (title.includes('elegoo') && title.includes('penguin')) productSlug = 'elegoo-penguin';
		else if (title.includes('elegoo')) productSlug = 'elegoo-robot-car';
		else if (title.includes('lego') || title.includes('spike')) productSlug = 'lego-spike-essential';
	}
	
	return {
		title: titleMatch ? titleMatch[1] : 'Article',
		category,
		productSlug
	};
}

function wrapText(text, maxCharsPerLine = 38) {
	const words = text.split(' ');
	const lines = [];
	let currentLine = '';
	
	for (const word of words) {
		const testLine = currentLine ? `${currentLine} ${word}` : word;
		if (testLine.length <= maxCharsPerLine) {
			currentLine = testLine;
		} else {
			if (currentLine) lines.push(currentLine);
			currentLine = word;
		}
	}
	if (currentLine) lines.push(currentLine);
	return lines.slice(0, 3); // Max 3 lignes
}

function calculateFontSize(titleLength) {
	if (titleLength < 30) return 58;
	if (titleLength < 50) return 52;
	if (titleLength < 70) return 46;
	return 42;
}

async function generateThumbnail(slug, title, category, productSlug) {
	const fontBuffer = await fs.readFile(fontPath);
	
	// Retour à la ligne propre sur mots entiers
	const titleLines = wrapText(title, 38);
	const fontSize = calculateFontSize(title.length);
	
	// Charger la photo produit si disponible
	let productImageDataUrl = null;
	if (productSlug) {
		const productImagePath = path.join(productsDir, `${productSlug}.webp`);
		try {
			const productBuffer = await sharp(productImagePath)
				.resize(320, 320, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
				.png()
				.toBuffer();
			productImageDataUrl = `data:image/png;base64,${productBuffer.toString('base64')}`;
		} catch (err) {
			// Photo produit non disponible
		}
	}
	
	const svg = await satori(
		{
			type: 'div',
			props: {
				style: {
					width: '100%',
					height: '100%',
					display: 'flex',
					backgroundColor: COLORS.darkBg,
					padding: 0
				},
				children: [
					// Zone texte (gauche)
					{
						type: 'div',
						props: {
							style: {
								width: productImageDataUrl ? '800px' : '100%',
								height: '100%',
								display: 'flex',
								flexDirection: 'column',
								padding: '60px',
								justifyContent: 'space-between'
							},
							children: [
								// Category badge
								{
									type: 'div',
									props: {
										style: {
											display: 'flex',
											marginBottom: '30px'
										},
										children: {
											type: 'div',
											props: {
												style: {
													backgroundColor: COLORS.orangeAccent,
													color: COLORS.white,
													padding: '12px 24px',
													borderRadius: '8px',
													fontSize: '28px',
													fontWeight: 800
												},
												children: category
											}
										}
									}
								},
								// Title (multi-ligne propre)
								{
									type: 'div',
									props: {
										style: {
											fontSize: `${fontSize}px`,
											fontWeight: 800,
											color: COLORS.white,
											lineHeight: 1.15,
											flex: 1,
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'center'
										},
										children: titleLines.map(line => ({
											type: 'div',
											props: {
												style: { marginBottom: '8px' },
												children: line
											}
										}))
									}
								},
								// Footer
								{
									type: 'div',
									props: {
										style: {
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'space-between'
										},
										children: [
											{
												type: 'div',
												props: {
													style: {
														fontSize: '30px',
														fontWeight: 800,
														color: COLORS.tealPrimary
													},
													children: 'robot-educatif'
												}
											},
											{
												type: 'div',
												props: {
													style: {
														width: '60px',
														height: '60px',
														borderRadius: '50%',
														backgroundColor: COLORS.tealPrimary
													}
												}
											}
										]
									}
								}
							]
						}
					},
					// Photo produit (droite)
					productImageDataUrl && {
						type: 'div',
						props: {
							style: {
								width: '400px',
								height: '100%',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: COLORS.white
							},
							children: {
								type: 'img',
								props: {
									src: productImageDataUrl,
									style: {
										width: '320px',
										height: '320px',
										objectFit: 'contain'
									}
								}
							}
						}
					}
				].filter(Boolean)
			}
		},
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: 'Roboto',
					data: fontBuffer,
					weight: 700,
					style: 'normal'
				}
			]
		}
	);
	
	const resvg = new Resvg(svg, {
		fitTo: {
			mode: 'width',
			value: 1200
		}
	});
	
	const pngData = resvg.render();
	return pngData.asPng();
}

async function main() {
	console.log('📸 Generating blog thumbnails...\n');
	
	// Create output directory
	await fs.mkdir(outputDir, { recursive: true });
	
	// Find all blog posts
	const allFiles = await fs.readdir(contentDir);
	const files = allFiles.filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
	
	let generated = 0;
	let skipped = 0;
	
	for (const file of files) {
		const slug = file.replace(/\.mdx?$/, '');
		const filePath = path.join(contentDir, file);
		const outputPath = path.join(outputDir, `${slug}.png`);
		
		// Check if thumbnail already exists (skip regeneration)
		try {
			await fs.access(outputPath);
			skipped++;
			continue;
		} catch {
			// File doesn't exist, generate it
		}
		
		const frontmatter = await extractFrontmatter(filePath);
		if (!frontmatter) {
			console.warn(`⚠️  No frontmatter found in ${file}`);
			continue;
		}
		
		try {
			const pngBuffer = await generateThumbnail(slug, frontmatter.title, frontmatter.category, frontmatter.productSlug);
			await fs.writeFile(outputPath, pngBuffer);
			generated++;
			console.log(`✅ ${slug}`);
		} catch (error) {
			console.error(`❌ ${slug}: ${error.message}`);
		}
	}
	
	console.log(`\n📊 Summary:`);
	console.log(`   ✅ Generated: ${generated}`);
	console.log(`   ⏭️  Skipped (already exists): ${skipped}`);
	console.log(`   📁 Total articles: ${files.length}`);
	console.log(`\n✨ Thumbnails saved to: ${path.relative(process.cwd(), outputDir)}`);
}

main().catch(console.error);
