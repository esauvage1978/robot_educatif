/**
 * Génère des vignettes 1200×630 visuellement distinctes par article
 * - Fonds variés par catégorie (palette A)
 * - Photos produits détourées/cadrées proprement
 * - Motifs SVG déterministes pour articles sans produit
 * - Titres lisibles avec retours à la ligne propres
 */
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogContentDir = path.join(__dirname, '../src/content/blog');
const domotiqueContentDir = path.join(__dirname, '../src/content/domotique');
const outputDir = path.join(__dirname, '../public/images/blog-thumbnails');
const productsDir = path.join(__dirname, '../public/images/products');
const fontPath = path.join(__dirname, './fonts/Roboto-Bold.ttf');

// Palette A : fonds et accents par catégorie
const CATEGORY_THEMES = {
	'Python': {
		bg: 'linear-gradient(135deg, #0B1F2A 0%, #0F766E 100%)',
		accent: '#14B8A6',
		text: '#F8FAFC'
	},
	'C / Arduino': {
		bg: 'linear-gradient(135deg, #C2410C 0%, #F97316 100%)',
		accent: '#FFEDD5',
		text: '#FFFFFF'
	},
	'Arduino': {
		bg: 'linear-gradient(135deg, #C2410C 0%, #F97316 100%)',
		accent: '#FFEDD5',
		text: '#FFFFFF'
	},
	'mBot': {
		bg: 'linear-gradient(135deg, #CCFBF1 0%, #14B8A6 100%)',
		accent: '#0F766E',
		text: '#0B1F2A'
	},
	'Scratch': {
		bg: 'linear-gradient(135deg, #CCFBF1 0%, #14B8A6 100%)',
		accent: '#0F766E',
		text: '#0B1F2A'
	},
	'Raspberry Pi': {
		bg: 'linear-gradient(135deg, #FDF2F8 0%, #F472B6 100%)',
		accent: '#C51A4A',
		text: '#0B1F2A'
	},
	'Guide': {
		bg: '#0F766E',
		accent: '#14B8A6',
		text: '#F8FAFC'
	},
	'Comparatif': {
		bg: '#0F766E',
		accent: '#14B8A6',
		text: '#F8FAFC'
	},
	'Domotique': {
		bg: '#F8FAFC',
		accent: '#0F766E',
		text: '#0B1F2A'
	},
	'default': {
		bg: '#0F766E',
		accent: '#14B8A6',
		text: '#F8FAFC'
	}
};

// Détecte le premier produit cité dans l'article
async function detectProduct(filePath) {
	const content = await fs.readFile(filePath, 'utf-8');
	
	// 1. Chercher ProductBox avec preset
	const productBoxMatch = content.match(/<ProductBox[^>]*preset=["']([^"']+)["']/i);
	if (productBoxMatch) {
		return productBoxMatch[1];
	}
	
	// 2. Chercher ASIN Amazon
	const asinMatch = content.match(/amazon\.fr[^"'\s]*\/dp\/([A-Z0-9]{10})/);
	if (asinMatch) {
		// Mapper ASIN vers slug produit (charge products.json)
		const productsPath = path.join(__dirname, '../src/data/products.json');
		const productsData = JSON.parse(await fs.readFile(productsPath, 'utf-8'));
		for (const [slug, product] of Object.entries(productsData)) {
			if (product.asin === asinMatch[1]) {
				return slug;
			}
		}
	}
	
	// 3. Chercher mentions dans le frontmatter/titre
	const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
	if (frontmatterMatch) {
		const fm = frontmatterMatch[1];
		const titleMatch = fm.match(/title:\s*["'](.+?)["']/);
		if (titleMatch) {
			const title = titleMatch[1].toLowerCase();
			if (title.includes('mbot2')) return 'mbot2';
			if (title.includes('mbot') && !title.includes('mblock')) return 'mbot';
			if (title.includes('cyberpi')) return 'cyberpi';
			if (title.includes('codey') || title.includes('rocky')) return 'codey-rocky';
			if (title.includes('ranger')) return 'mbot-ranger';
			if (title.includes('elegoo') && title.includes('penguin')) return 'elegoo-penguin';
			if (title.includes('elegoo')) return 'elegoo-robot-car';
			if (title.includes('raspberry pi 5')) return 'raspberry-pi-5-8gb';
			if (title.includes('raspberry pi 4')) return 'raspberry-pi-4-4gb';
			if (title.includes('raspberry')) return 'raspberry-pi-5-8gb';
			if (title.includes('lego') || title.includes('spike')) return 'lego-spike-essential';
			if (title.includes('arduino')) return 'arduino-starter-kit';
		}
	}
	
	return null;
}

async function extractFrontmatter(filePath) {
	const content = await fs.readFile(filePath, 'utf-8');
	const match = content.match(/^---\n([\s\S]*?)\n---/);
	if (!match) return null;
	
	const frontmatter = match[1];
	const titleMatch = frontmatter.match(/title:\s*["'](.+?)["']/);
	
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
	
	return {
		title: titleMatch ? titleMatch[1] : 'Article',
		category
	};
}

// Retour à la ligne intelligent (évite "la / classe")
function wrapText(text, maxCharsPerLine = 42) {
	const words = text.split(' ');
	const lines = [];
	let currentLine = '';
	
	for (const word of words) {
		// Éviter les mots isolés courts en fin de ligne
		const testLine = currentLine ? `${currentLine} ${word}` : word;
		if (testLine.length <= maxCharsPerLine) {
			currentLine = testLine;
		} else {
			// Si le mot actuel est court (< 4 lettres) et qu'on peut le garder avec le précédent
			if (word.length <= 3 && currentLine.length > 0 && currentLine.length + word.length + 1 <= maxCharsPerLine + 5) {
				currentLine = testLine;
			} else {
				if (currentLine) lines.push(currentLine);
				currentLine = word;
			}
		}
	}
	if (currentLine) lines.push(currentLine);
	return lines.slice(0, 3);
}

function calculateFontSize(titleLength) {
	if (titleLength < 30) return 62;
	if (titleLength < 50) return 56;
	if (titleLength < 70) return 50;
	return 44;
}

// Génère un motif SVG déterministe basé sur le slug
function generatePatternSVG(slug, accentColor) {
	const hash = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
	const pattern = hash % 5;
	
	const patterns = {
		0: `<circle cx="950" cy="450" r="180" fill="${accentColor}" opacity="0.15"/>
			<circle cx="1050" cy="250" r="120" fill="${accentColor}" opacity="0.1"/>`,
		1: `<rect x="900" y="200" width="250" height="250" rx="30" fill="${accentColor}" opacity="0.12"/>`,
		2: `<path d="M 950,200 L 1100,400 L 900,500 Z" fill="${accentColor}" opacity="0.12"/>`,
		3: `<circle cx="1000" cy="350" r="200" fill="${accentColor}" opacity="0.1"/>
			<rect x="950" y="300" width="100" height="100" rx="10" fill="${accentColor}" opacity="0.15"/>`,
		4: `<ellipse cx="980" cy="350" rx="200" ry="140" fill="${accentColor}" opacity="0.12"/>`
	};
	
	return patterns[pattern];
}

async function generateThumbnail(slug, title, category, productSlug) {
	const fontBuffer = await fs.readFile(fontPath);
	const theme = CATEGORY_THEMES[category] || CATEGORY_THEMES.default;
	
	const titleLines = wrapText(title, 42);
	const fontSize = calculateFontSize(title.length);
	
	// Charger photo produit détourée
	let productImageDataUrl = null;
	if (productSlug) {
		const productImagePath = path.join(productsDir, `${productSlug}.webp`);
		try {
			// Redimensionner et arrondir les coins
			const productBuffer = await sharp(productImagePath)
				.resize(280, 280, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
				.png()
				.toBuffer();
			productImageDataUrl = `data:image/png;base64,${productBuffer.toString('base64')}`;
		} catch (err) {
			// Photo non disponible
		}
	}
	
	// Badge catégorie (en haut à gauche)
	const badge = {
		type: 'div',
		props: {
			style: {
				position: 'absolute',
				top: '40px',
				left: '50px',
				backgroundColor: theme.accent,
				color: theme.bg.includes('gradient') ? '#FFFFFF' : theme.text,
				padding: '12px 28px',
				borderRadius: '12px',
				fontSize: '26px',
				fontWeight: 800,
				opacity: 0.95
			},
			children: category
		}
	};
	
	// Titre (centré-gauche)
	const titleBlock = {
		type: 'div',
		props: {
			style: {
				position: 'absolute',
				top: productImageDataUrl ? '180px' : '200px',
				left: '50px',
				width: productImageDataUrl ? '680px' : '1000px',
				display: 'flex',
				flexDirection: 'column',
				gap: '12px'
			},
			children: titleLines.map(line => ({
				type: 'div',
				props: {
					style: {
						fontSize: `${fontSize}px`,
						fontWeight: 800,
						color: theme.text,
						lineHeight: 1.1,
						textShadow: theme.text === '#FFFFFF' ? '0 2px 8px rgba(0,0,0,0.3)' : 'none'
					},
					children: line
				}
			}))
		}
	};
	
	// Photo produit (droite, cadre arrondi)
	const productImage = productImageDataUrl ? {
		type: 'div',
		props: {
			style: {
				position: 'absolute',
				top: '175px',
				right: '60px',
				width: '300px',
				height: '300px',
				borderRadius: '24px',
				backgroundColor: 'rgba(255,255,255,0.95)',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
			},
			children: {
				type: 'img',
				props: {
					src: productImageDataUrl,
					style: {
						width: '280px',
						height: '280px',
						objectFit: 'contain'
					}
				}
			}
		}
	} : null;
	
	// Motif SVG pour articles sans produit
	const patternSVG = !productImageDataUrl ? generatePatternSVG(slug, theme.accent) : '';
	
	// Footer
	const footer = {
		type: 'div',
		props: {
			style: {
				position: 'absolute',
				bottom: '40px',
				left: '50px',
				right: '50px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between'
			},
			children: [
				{
					type: 'div',
					props: {
						style: {
							fontSize: '28px',
							fontWeight: 800,
							color: theme.accent
						},
						children: 'robot-educatif'
					}
				},
				{
					type: 'div',
					props: {
						style: {
							width: '50px',
							height: '50px',
							borderRadius: '50%',
							backgroundColor: theme.accent,
							opacity: 0.8
						}
					}
				}
			]
		}
	};
	
	const bgStyle = theme.bg.includes('gradient') 
		? { backgroundImage: theme.bg }
		: { backgroundColor: theme.bg };
	
	const svg = await satori(
		{
			type: 'div',
			props: {
				style: {
					width: '100%',
					height: '100%',
					display: 'flex',
					position: 'relative',
					...bgStyle
				},
				children: [badge, titleBlock, productImage, footer].filter(Boolean)
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
	
	const resvg = new Resvg(svg);
	return resvg.render().asPng();
}

async function processCollection(contentDir, collectionName, generated, skipped, withProduct, withoutProduct) {
	const allFiles = await fs.readdir(contentDir);
	const files = allFiles.filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
	
	for (const file of files) {
		const slug = file.replace(/\.mdx?$/, '');
		const filePath = path.join(contentDir, file);
		const outputPath = path.join(outputDir, `${slug}.png`);
		
		// Check if thumbnail already exists
		try {
			await fs.access(outputPath);
			skipped.count++;
			continue;
		} catch {
			// Generate it
		}
		
		const frontmatter = await extractFrontmatter(filePath);
		if (!frontmatter) {
			console.warn(`⚠️  No frontmatter in ${file}`);
			continue;
		}
		
		const productSlug = await detectProduct(filePath);
		if (productSlug) {
			withProduct.count++;
		} else {
			withoutProduct.count++;
		}
		
		try {
			const pngBuffer = await generateThumbnail(slug, frontmatter.title, frontmatter.category, productSlug);
			await fs.writeFile(outputPath, pngBuffer);
			generated.count++;
			const icon = productSlug ? '🖼️ ' : '🎨';
			console.log(`✅ ${icon}[${collectionName}] ${slug}`);
		} catch (error) {
			console.error(`❌ [${collectionName}] ${slug}: ${error.message}`);
		}
	}
	
	return files.length;
}

async function main() {
	console.log('🎨 Generating visually distinct thumbnails...\n');
	
	await fs.mkdir(outputDir, { recursive: true });
	
	const stats = { count: 0 };
	const skipped = { count: 0 };
	const withProduct = { count: 0 };
	const withoutProduct = { count: 0 };
	
	const blogCount = await processCollection(blogContentDir, 'blog', stats, skipped, withProduct, withoutProduct);
	const domotiqueCount = await processCollection(domotiqueContentDir, 'domotique', stats, skipped, withProduct, withoutProduct);
	
	console.log(`\n📊 Summary:`);
	console.log(`   ✅ Generated: ${stats.count}`);
	console.log(`   🖼️  With product photo: ${withProduct.count}`);
	console.log(`   🎨 With SVG pattern: ${withoutProduct.count}`);
	console.log(`   ⏭️  Skipped (already exists): ${skipped.count}`);
	console.log(`   📁 Total articles: ${blogCount + domotiqueCount}`);
	console.log(`\n✨ Thumbnails saved to: ${path.relative(process.cwd(), outputDir)}`);
}

main().catch(console.error);
