/**
 * Génère une vignette 1200×630 unique par article
 * Utilisée pour cartes blog et og:image
 */
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, '../src/content/blog');
const outputDir = path.join(__dirname, '../public/images/blog-thumbnails');
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
	const categoriesMatch = frontmatter.match(/categories:\s*\[([^\]]+)\]/);
	
	return {
		title: titleMatch ? titleMatch[1] : 'Article',
		category: categoriesMatch ? categoriesMatch[1].split(',')[0].trim().replace(/["']/g, '') : 'Guide'
	};
}

async function generateThumbnail(slug, title, category) {
	const fontBuffer = await fs.readFile(fontPath);
	
	// Truncate title if too long
	const displayTitle = title.length > 70 ? title.substring(0, 67) + '...' : title;
	
	const svg = await satori(
		{
			type: 'div',
			props: {
				style: {
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					backgroundColor: COLORS.darkBg,
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
					// Title
					{
						type: 'div',
						props: {
							style: {
								fontSize: '54px',
								fontWeight: 800,
								color: COLORS.white,
								lineHeight: 1.15,
								flex: 1,
								display: 'flex',
								alignItems: 'center'
							},
							children: displayTitle
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
			const pngBuffer = await generateThumbnail(slug, frontmatter.title, frontmatter.category);
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
