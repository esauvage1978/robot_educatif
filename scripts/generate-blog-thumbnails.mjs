/**
 * Génère des vignettes 1200×630 visuellement distinctes par article
 * - Détection catégorie robuste (slug + frontmatter)
 * - Fonds variés par catégorie (palette A)
 * - Photos produits OU grandes icônes thématiques visibles
 * - Retours à la ligne équilibrés sans orphelins
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

// Palette A : fonds et accents par catégorie RÉELLE
const CATEGORY_THEMES = {
	'Python': {
		bg: 'linear-gradient(135deg, #0B1F2A 0%, #0F766E 100%)',
		accent: '#14B8A6',
		text: '#F8FAFC',
		icon: 'code'
	},
	'C / Arduino': {
		bg: 'linear-gradient(135deg, #C2410C 0%, #F97316 100%)',
		accent: '#FFEDD5',
		text: '#FFFFFF',
		icon: 'circuit'
	},
	'mBot': {
		bg: 'linear-gradient(135deg, #CCFBF1 0%, #14B8A6 100%)',
		accent: '#0F766E',
		text: '#0B1F2A',
		icon: 'robot'
	},
	'Scratch': {
		bg: 'linear-gradient(135deg, #CCFBF1 0%, #14B8A6 100%)',
		accent: '#0F766E',
		text: '#0B1F2A',
		icon: 'blocks'
	},
	'Raspberry Pi': {
		bg: 'linear-gradient(135deg, #FDF2F8 0%, #F472B6 100%)',
		accent: '#C51A4A',
		text: '#0B1F2A',
		icon: 'circuit'
	},
	'Guide': {
		bg: '#0F766E',
		accent: '#14B8A6',
		text: '#F8FAFC',
		icon: 'robot'
	},
	'Domotique': {
		bg: '#F8FAFC',
		accent: '#0F766E',
		text: '#0B1F2A',
		icon: 'home'
	},
	'default': {
		bg: '#0F766E',
		accent: '#14B8A6',
		text: '#F8FAFC',
		icon: 'robot'
	}
};

// Détecte la catégorie réelle à partir du slug ET du frontmatter
function detectRealCategory(slug, frontmatterCategory) {
	// Priorité au slug (plus fiable que le frontmatter)
	if (slug.startsWith('c-arduino-') || slug.includes('arduino')) {
		return 'C / Arduino';
	}
	if (slug.startsWith('python-')) {
		return 'Python';
	}
	if (slug.includes('scratch') || slug.includes('mblock')) {
		return 'Scratch';
	}
	if (slug.includes('mbot') || slug.includes('cyberpi')) {
		return 'mBot';
	}
	if (slug.includes('domotique') || slug.includes('home-assistant') || 
	    slug.includes('zigbee') || slug.includes('esp32')) {
		return 'Domotique';
	}
	if (slug.includes('raspberry')) {
		return 'Raspberry Pi';
	}
	
	// Fallback sur le frontmatter
	return frontmatterCategory || 'Guide';
}

// Détecte le premier produit cité dans l'article
async function detectProduct(filePath, slug) {
	const content = await fs.readFile(filePath, 'utf-8');
	
	// 1. ProductBox avec preset
	const productBoxMatch = content.match(/<ProductBox[^>]*preset=["']([^"']+)["']/i);
	if (productBoxMatch) {
		return productBoxMatch[1];
	}
	
	// 2. ASIN Amazon
	const asinMatch = content.match(/amazon\.fr[^"'\s]*\/dp\/([A-Z0-9]{10})/);
	if (asinMatch) {
		const productsPath = path.join(__dirname, '../src/data/products.json');
		const productsData = JSON.parse(await fs.readFile(productsPath, 'utf-8'));
		for (const [productSlug, product] of Object.entries(productsData)) {
			if (product.asin === asinMatch[1]) {
				return productSlug;
			}
		}
	}
	
	// 3. Détection spécifique par slug (éviter le mBot générique)
	if (slug.includes('raspberry-pi-5')) return 'raspberry-pi-5-8gb';
	if (slug.includes('raspberry-pi-4')) return 'raspberry-pi-4-4gb';
	if (slug.includes('raspberry-pi-3')) return null; // Pas de photo récente
	if (slug.includes('mbot2')) return 'mbot2';
	if (slug.includes('cyberpi')) return 'cyberpi';
	if (slug.includes('codey-rocky')) return 'codey-rocky';
	if (slug.includes('elegoo') && slug.includes('penguin')) return 'elegoo-penguin';
	if (slug.includes('elegoo')) return 'elegoo-robot-car';
	if (slug.includes('lego') || slug.includes('spike')) return 'lego-spike-essential';
	if (slug.includes('arduino')) return 'arduino-starter-kit';
	
	// 4. Mentions dans titre (en dernier recours)
	const titleMatch = content.match(/title:\s*["'](.+?)["']/);
	if (titleMatch) {
		const title = titleMatch[1].toLowerCase();
		if (title.includes('mbot2')) return 'mbot2';
		if (title.includes('cyberpi')) return 'cyberpi';
		if (title.includes('codey') || title.includes('rocky')) return 'codey-rocky';
		if (title.includes('elegoo')) return 'elegoo-robot-car';
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
		frontmatterCategory: category
	};
}

// Retour à la ligne équilibré sans orphelins
function wrapText(text, maxWidth = 38) {
	const words = text.split(' ');
	if (words.length <= 3) return [text]; // Trop court pour couper
	
	const lines = [];
	let currentLine = '';
	
	for (let i = 0; i < words.length; i++) {
		const word = words[i];
		const testLine = currentLine ? `${currentLine} ${word}` : word;
		
		// Si on dépasse la largeur max
		if (testLine.length > maxWidth) {
			// Vérifier si le mot suivant est court (orphelin potentiel)
			const nextWord = words[i + 1];
			const isLastWord = i === words.length - 1;
			
			// Si le mot suivant est court (< 4 lettres), le garder avec le mot actuel
			if (nextWord && nextWord.length <= 3 && currentLine.length + word.length + nextWord.length + 2 <= maxWidth + 8) {
				currentLine = currentLine ? `${currentLine} ${word} ${nextWord}` : `${word} ${nextWord}`;
				i++; // Sauter le mot suivant
			} else if (currentLine) {
				lines.push(currentLine);
				currentLine = word;
			} else {
				lines.push(word);
			}
		} else {
			currentLine = testLine;
		}
	}
	
	if (currentLine) {
		// Si la dernière ligne est trop courte, essayer de rééquilibrer
		if (lines.length > 0 && currentLine.split(' ').length === 1 && currentLine.length <= 6) {
			// Remonter quelques mots de la ligne précédente
			const prevLine = lines[lines.length - 1];
			const prevWords = prevLine.split(' ');
			if (prevWords.length >= 3) {
				const lastWord = prevWords.pop();
				lines[lines.length - 1] = prevWords.join(' ');
				currentLine = `${lastWord} ${currentLine}`;
			}
		}
		lines.push(currentLine);
	}
	
	return lines.slice(0, 3);
}

function calculateFontSize(titleLength) {
	if (titleLength < 30) return 62;
	if (titleLength < 50) return 56;
	if (titleLength < 70) return 50;
	return 44;
}

// Génère une grande icône SVG thématique (260px)
function generateThematicIcon(iconType, accentColor) {
	const icons = {
		code: `
			<g transform="translate(50, 50)">
				<rect x="20" y="20" width="200" height="160" rx="12" fill="none" stroke="${accentColor}" stroke-width="8" opacity="0.3"/>
				<path d="M 60 70 L 90 100 L 60 130" fill="none" stroke="${accentColor}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/>
				<path d="M 180 70 L 150 100 L 180 130" fill="none" stroke="${accentColor}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/>
				<line x1="110" y1="60" x2="130" y2="140" stroke="${accentColor}" stroke-width="10" stroke-linecap="round" opacity="0.5"/>
			</g>
		`,
		circuit: `
			<g transform="translate(50, 50)">
				<circle cx="120" cy="80" r="15" fill="${accentColor}" opacity="0.4"/>
				<circle cx="180" cy="80" r="15" fill="${accentColor}" opacity="0.4"/>
				<circle cx="120" cy="160" r="15" fill="${accentColor}" opacity="0.4"/>
				<circle cx="180" cy="160" r="15" fill="${accentColor}" opacity="0.4"/>
				<line x1="135" y1="80" x2="165" y2="80" stroke="${accentColor}" stroke-width="6" opacity="0.4"/>
				<line x1="120" y1="95" x2="120" y2="145" stroke="${accentColor}" stroke-width="6" opacity="0.4"/>
				<line x1="180" y1="95" x2="180" y2="145" stroke="${accentColor}" stroke-width="6" opacity="0.4"/>
				<line x1="135" y1="160" x2="165" y2="160" stroke="${accentColor}" stroke-width="6" opacity="0.4"/>
				<rect x="80" y="110" width="30" height="20" rx="4" fill="${accentColor}" opacity="0.4"/>
				<rect x="190" y="110" width="30" height="20" rx="4" fill="${accentColor}" opacity="0.4"/>
			</g>
		`,
		robot: `
			<g transform="translate(70, 50)">
				<rect x="50" y="60" width="120" height="100" rx="15" fill="${accentColor}" opacity="0.35"/>
				<circle cx="90" cy="100" r="12" fill="white" opacity="0.6"/>
				<circle cx="130" cy="100" r="12" fill="white" opacity="0.6"/>
				<rect x="80" y="130" width="60" height="8" rx="4" fill="white" opacity="0.6"/>
				<line x1="110" y1="30" x2="110" y2="60" stroke="${accentColor}" stroke-width="8" stroke-linecap="round" opacity="0.35"/>
				<circle cx="110" cy="25" r="10" fill="${accentColor}" opacity="0.35"/>
				<rect x="30" y="80" width="20" height="40" rx="8" fill="${accentColor}" opacity="0.3"/>
				<rect x="170" y="80" width="20" height="40" rx="8" fill="${accentColor}" opacity="0.3"/>
			</g>
		`,
		blocks: `
			<g transform="translate(60, 60)">
				<rect x="40" y="30" width="80" height="50" rx="8" fill="${accentColor}" opacity="0.4"/>
				<rect x="60" y="90" width="100" height="50" rx="8" fill="${accentColor}" opacity="0.35"/>
				<rect x="50" y="150" width="90" height="40" rx="8" fill="${accentColor}" opacity="0.3"/>
				<circle cx="30" cy="55" r="8" fill="${accentColor}" opacity="0.5"/>
				<circle cx="50" cy="115" r="8" fill="${accentColor}" opacity="0.5"/>
			</g>
		`,
		home: `
			<g transform="translate(60, 50)">
				<path d="M 120 40 L 200 100 L 200 180 L 40 180 L 40 100 Z" fill="${accentColor}" opacity="0.3"/>
				<rect x="90" y="120" width="60" height="60" fill="white" opacity="0.5"/>
				<rect x="160" y="100" width="30" height="30" fill="white" opacity="0.5"/>
				<path d="M 20 100 L 120 30 L 220 100" fill="none" stroke="${accentColor}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"/>
			</g>
		`
	};
	
	return icons[iconType] || icons.robot;
}

async function generateThumbnail(slug, title, realCategory, productSlug) {
	const fontBuffer = await fs.readFile(fontPath);
	const theme = CATEGORY_THEMES[realCategory] || CATEGORY_THEMES.default;
	
	const titleLines = wrapText(title, 38);
	const fontSize = calculateFontSize(title.length);
	
	// Charger photo produit OU générer icône thématique
	let rightElement = null;
	
	if (productSlug) {
		const productImagePath = path.join(productsDir, `${productSlug}.webp`);
		try {
			const productBuffer = await sharp(productImagePath)
				.resize(280, 280, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
				.png()
				.toBuffer();
			const productImageDataUrl = `data:image/png;base64,${productBuffer.toString('base64')}`;
			
			rightElement = {
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
			};
		} catch (err) {
			// Photo non disponible, utiliser icône
		}
	}
	
	// Si pas de photo produit, créer une grande icône thématique
	if (!rightElement) {
		const iconSVG = generateThematicIcon(theme.icon, theme.accent);
		rightElement = {
			type: 'div',
			props: {
				style: {
					position: 'absolute',
					top: '165px',
					right: '50px',
					width: '280px',
					height: '280px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center'
				},
				children: `<svg width="260" height="260" xmlns="http://www.w3.org/2000/svg">${iconSVG}</svg>`
			}
		};
	}
	
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
			children: realCategory
		}
	};
	
	const titleBlock = {
		type: 'div',
		props: {
			style: {
				position: 'absolute',
				top: '180px',
				left: '50px',
				width: '680px',
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
				children: [badge, titleBlock, rightElement, footer].filter(Boolean)
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

async function processCollection(contentDir, collectionName, generated, skipped, categoryStats) {
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
		
		const realCategory = detectRealCategory(slug, frontmatter.frontmatterCategory);
		const productSlug = await detectProduct(filePath, slug);
		
		// Stats par catégorie
		categoryStats[realCategory] = (categoryStats[realCategory] || 0) + 1;
		
		try {
			const pngBuffer = await generateThumbnail(slug, frontmatter.title, realCategory, productSlug);
			await fs.writeFile(outputPath, pngBuffer);
			generated.count++;
			const icon = productSlug ? '🖼️ ' : '🎨';
			console.log(`✅ ${icon}[${collectionName}] ${slug} → ${realCategory}`);
		} catch (error) {
			console.error(`❌ [${collectionName}] ${slug}: ${error.message}`);
		}
	}
	
	return files.length;
}

async function main() {
	console.log('🎨 Generating visually distinct thumbnails (v2 - catégories corrigées)...\n');
	
	await fs.mkdir(outputDir, { recursive: true });
	
	const stats = { count: 0 };
	const skipped = { count: 0 };
	const categoryStats = {};
	
	const blogCount = await processCollection(blogContentDir, 'blog', stats, skipped, categoryStats);
	const domotiqueCount = await processCollection(domotiqueContentDir, 'domotique', stats, skipped, categoryStats);
	
	console.log(`\n📊 Summary:`);
	console.log(`   ✅ Generated: ${stats.count}`);
	console.log(`   ⏭️  Skipped (already exists): ${skipped.count}`);
	console.log(`   📁 Total articles: ${blogCount + domotiqueCount}`);
	console.log(`\n🎨 Par catégorie:`);
	for (const [cat, count] of Object.entries(categoryStats).sort((a, b) => b[1] - a[1])) {
		console.log(`   ${cat}: ${count}`);
	}
	console.log(`\n✨ Thumbnails saved to: ${path.relative(process.cwd(), outputDir)}`);
}

main().catch(console.error);
