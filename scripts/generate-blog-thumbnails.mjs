/**
 * Génère des vignettes 1200×630 PNG + WebP par article
 * - Parseur YAML complet (gray-matter) pour éviter coupures sur apostrophes
 * - PNG pour og:image, WebP pour listes/bannières (qualité 82)
 * - Fonds variés par catégorie, icônes SVG rendues
 */
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import matter from 'gray-matter';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogContentDir = path.join(__dirname, '../src/content/blog');
const domotiqueContentDir = path.join(__dirname, '../src/content/domotique');
const outputDir = path.join(__dirname, '../public/images/blog-thumbnails');
const productsDir = path.join(__dirname, '../public/images/products');
const fontPath = path.join(__dirname, './fonts/Roboto-Bold.ttf');

const CATEGORY_THEMES = {
	'Python': {
		bg: 'linear-gradient(135deg, #0B1F2A 0%, #0F766E 100%)',
		badgeBg: '#14B8A6',
		badgeText: '#0B1F2A',
		text: '#F8FAFC',
		icon: 'code'
	},
	'C / Arduino': {
		bg: 'linear-gradient(135deg, #C2410C 0%, #F97316 100%)',
		badgeBg: '#0B1F2A',
		badgeText: '#FFFFFF',
		text: '#FFFFFF',
		icon: 'circuit'
	},
	'mBot': {
		bg: 'linear-gradient(135deg, #CCFBF1 0%, #14B8A6 100%)',
		badgeBg: '#0F766E',
		badgeText: '#F8FAFC',
		text: '#0B1F2A',
		icon: 'robot'
	},
	'Scratch': {
		bg: 'linear-gradient(135deg, #CCFBF1 0%, #14B8A6 100%)',
		badgeBg: '#0F766E',
		badgeText: '#F8FAFC',
		text: '#0B1F2A',
		icon: 'blocks'
	},
	'Raspberry Pi': {
		bg: 'linear-gradient(135deg, #FDF2F8 0%, #F472B6 100%)',
		badgeBg: '#C51A4A',
		badgeText: '#FFFFFF',
		text: '#0B1F2A',
		icon: 'circuit'
	},
	'Guide': {
		bg: '#0F766E',
		badgeBg: '#14B8A6',
		badgeText: '#0B1F2A',
		text: '#F8FAFC',
		icon: 'robot'
	},
	'Domotique': {
		bg: '#F8FAFC',
		badgeBg: '#0F766E',
		badgeText: '#FFFFFF',
		text: '#0B1F2A',
		icon: 'home'
	},
	'default': {
		bg: '#0F766E',
		badgeBg: '#14B8A6',
		badgeText: '#0B1F2A',
		text: '#F8FAFC',
		icon: 'robot'
	}
};

function detectRealCategory(slug, frontmatterCategory) {
	if (slug.startsWith('c-arduino-') || slug.includes('arduino')) return 'C / Arduino';
	if (slug.startsWith('python-')) return 'Python';
	if (slug.includes('scratch') || slug.includes('mblock')) return 'Scratch';
	if (slug.includes('mbot') || slug.includes('cyberpi')) return 'mBot';
	if (slug.includes('domotique') || slug.includes('home-assistant') || 
	    slug.includes('zigbee') || slug.includes('esp32')) return 'Domotique';
	if (slug.includes('raspberry')) return 'Raspberry Pi';
	return frontmatterCategory || 'Guide';
}

async function detectProduct(filePath, slug) {
	const content = await fs.readFile(filePath, 'utf-8');
	const productBoxMatch = content.match(/<ProductBox[^>]*preset=["']([^"']+)["']/i);
	if (productBoxMatch) return productBoxMatch[1];
	
	const asinMatch = content.match(/amazon\.fr[^"'\s]*\/dp\/([A-Z0-9]{10})/);
	if (asinMatch) {
		const productsPath = path.join(__dirname, '../src/data/products.json');
		const productsData = JSON.parse(await fs.readFile(productsPath, 'utf-8'));
		for (const [productSlug, product] of Object.entries(productsData)) {
			if (product.asin === asinMatch[1]) return productSlug;
		}
	}
	
	if (slug.includes('raspberry-pi-5')) return 'raspberry-pi-5-8gb';
	if (slug.includes('raspberry-pi-4')) return 'raspberry-pi-4-4gb';
	if (slug.includes('mbot2')) return 'mbot2';
	if (slug.includes('cyberpi')) return 'cyberpi';
	if (slug.includes('codey-rocky')) return 'codey-rocky';
	if (slug.includes('elegoo') && slug.includes('penguin')) return 'elegoo-penguin';
	if (slug.includes('elegoo')) return 'elegoo-robot-car';
	if (slug.includes('lego') || slug.includes('spike')) return 'lego-spike-essential';
	if (slug.includes('arduino')) return 'arduino-starter-kit';
	
	return null;
}

async function extractFrontmatter(filePath) {
	const content = await fs.readFile(filePath, 'utf-8');
	
	try {
		// Utiliser gray-matter pour parser correctement le YAML
		const { data } = matter(content);
		
		let category = 'Guide';
		if (data.categories) {
			if (Array.isArray(data.categories)) {
				category = data.categories[0] || 'Guide';
			} else if (typeof data.categories === 'string') {
				category = data.categories;
			}
		}
		
		return {
			title: data.title || 'Article',
			frontmatterCategory: category
		};
	} catch (err) {
		console.warn(`⚠️  Error parsing frontmatter in ${filePath}: ${err.message}`);
		return null;
	}
}

function wrapText(text, maxCharsPerLine = 40) {
	const words = text.split(' ');
	if (words.length <= 2) return [text];
	
	const lines = [];
	let currentLine = '';
	
	for (let i = 0; i < words.length; i++) {
		const word = words[i];
		const testLine = currentLine ? `${currentLine} ${word}` : word;
		
		const width = testLine.split('').reduce((sum, c) => {
			if (c === c.toUpperCase() && c !== c.toLowerCase()) return sum + 1.2;
			if (c === 'i' || c === 'l' || c === 'I') return sum + 0.5;
			if (c === 'm' || c === 'M' || c === 'w' || c === 'W') return sum + 1.3;
			return sum + 1;
		}, 0);
		
		if (width > maxCharsPerLine) {
			const nextWord = words[i + 1];
			
			if (nextWord && /^[:\?\!,]/.test(nextWord)) {
				currentLine = testLine + (nextWord.length > 1 ? ' ' + nextWord : nextWord);
				i++;
			}
			else if (nextWord && nextWord.length <= 3 && currentLine.length + word.length + nextWord.length + 2 <= maxCharsPerLine + 8) {
				currentLine = testLine + ' ' + nextWord;
				i++;
			}
			else if (currentLine) {
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
		if (lines.length > 0 && currentLine.split(' ').length === 1 && currentLine.length <= 6) {
			const prevLine = lines[lines.length - 1];
			const prevWords = prevLine.split(' ');
			if (prevWords.length >= 2) {
				const lastWord = prevWords.pop();
				lines[lines.length - 1] = prevWords.join(' ');
				currentLine = lastWord + ' ' + currentLine;
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

function generateIconDataURL(iconType, color) {
	const icons = {
		code: `<svg width="260" height="260" xmlns="http://www.w3.org/2000/svg">
			<rect x="20" y="40" width="220" height="180" rx="12" fill="none" stroke="${color}" stroke-width="8" opacity="0.35"/>
			<path d="M 70 90 L 100 120 L 70 150" fill="none" stroke="${color}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/>
			<path d="M 190 90 L 160 120 L 190 150" fill="none" stroke="${color}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/>
			<line x1="120" y1="80" x2="140" y2="160" stroke="${color}" stroke-width="12" stroke-linecap="round" opacity="0.5"/>
		</svg>`,
		circuit: `<svg width="260" height="260" xmlns="http://www.w3.org/2000/svg">
			<circle cx="130" cy="90" r="18" fill="${color}" opacity="0.45"/>
			<circle cx="200" cy="90" r="18" fill="${color}" opacity="0.45"/>
			<circle cx="130" cy="180" r="18" fill="${color}" opacity="0.45"/>
			<circle cx="200" cy="180" r="18" fill="${color}" opacity="0.45"/>
			<line x1="148" y1="90" x2="182" y2="90" stroke="${color}" stroke-width="8" opacity="0.4"/>
			<line x1="130" y1="108" x2="130" y2="162" stroke="${color}" stroke-width="8" opacity="0.4"/>
			<line x1="200" y1="108" x2="200" y2="162" stroke="${color}" stroke-width="8" opacity="0.4"/>
			<line x1="148" y1="180" x2="182" y2="180" stroke="${color}" stroke-width="8" opacity="0.4"/>
			<rect x="90" y="125" width="35" height="25" rx="5" fill="${color}" opacity="0.45"/>
			<rect x="210" y="125" width="35" height="25" rx="5" fill="${color}" opacity="0.45"/>
		</svg>`,
		robot: `<svg width="260" height="260" xmlns="http://www.w3.org/2000/svg">
			<rect x="70" y="80" width="120" height="110" rx="15" fill="${color}" opacity="0.4"/>
			<circle cx="110" cy="120" r="14" fill="white" opacity="0.65"/>
			<circle cx="150" cy="120" r="14" fill="white" opacity="0.65"/>
			<rect x="100" y="155" width="60" height="10" rx="5" fill="white" opacity="0.65"/>
			<line x1="130" y1="45" x2="130" y2="80" stroke="${color}" stroke-width="10" stroke-linecap="round" opacity="0.4"/>
			<circle cx="130" cy="38" r="12" fill="${color}" opacity="0.4"/>
			<rect x="45" y="100" width="25" height="50" rx="10" fill="${color}" opacity="0.35"/>
			<rect x="190" y="100" width="25" height="50" rx="10" fill="${color}" opacity="0.35"/>
		</svg>`,
		blocks: `<svg width="260" height="260" xmlns="http://www.w3.org/2000/svg">
			<rect x="60" y="50" width="90" height="55" rx="10" fill="${color}" opacity="0.45"/>
			<rect x="80" y="115" width="110" height="55" rx="10" fill="${color}" opacity="0.4"/>
			<rect x="70" y="180" width="100" height="45" rx="10" fill="${color}" opacity="0.35"/>
			<circle cx="45" cy="77" r="10" fill="${color}" opacity="0.55"/>
			<circle cx="70" cy="142" r="10" fill="${color}" opacity="0.55"/>
			<circle cx="60" cy="202" r="10" fill="${color}" opacity="0.55"/>
		</svg>`,
		home: `<svg width="260" height="260" xmlns="http://www.w3.org/2000/svg">
			<path d="M 130 60 L 220 120 L 220 210 L 40 210 L 40 120 Z" fill="${color}" opacity="0.35"/>
			<rect x="100" y="145" width="60" height="65" fill="white" opacity="0.55"/>
			<rect x="175" y="120" width="35" height="35" fill="white" opacity="0.55"/>
			<path d="M 20 120 L 130 45 L 240 120" fill="none" stroke="${color}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" opacity="0.45"/>
		</svg>`
	};
	
	const svg = icons[iconType] || icons.robot;
	return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

async function generateThumbnail(slug, title, realCategory, productSlug) {
	const fontBuffer = await fs.readFile(fontPath);
	const theme = CATEGORY_THEMES[realCategory] || CATEGORY_THEMES.default;
	
	const titleLines = wrapText(title, 40);
	const fontSize = calculateFontSize(title.length);
	
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
							style: { width: '280px', height: '280px', objectFit: 'contain' }
						}
					}
				}
			};
		} catch (err) {}
	}
	
	if (!rightElement) {
		const iconDataURL = generateIconDataURL(theme.icon, theme.badgeBg);
		rightElement = {
			type: 'div',
			props: {
				style: {
					position: 'absolute',
					top: '185px',
					right: '70px',
					width: '260px',
					height: '260px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center'
				},
				children: {
					type: 'img',
					props: {
						src: iconDataURL,
						width: 260,
						height: 260,
						style: { width: '260px', height: '260px' }
					}
				}
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
				backgroundColor: theme.badgeBg,
				color: theme.badgeText,
				padding: '12px 28px',
				borderRadius: '12px',
				fontSize: '26px',
				fontWeight: 800
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
				fontSize: '28px',
				fontWeight: 800,
				color: theme.badgeBg
			},
			children: 'robot-educatif'
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
			fonts: [{ name: 'Roboto', data: fontBuffer, weight: 700, style: 'normal' }]
		}
	);
	
	const resvg = new Resvg(svg);
	return resvg.render().asPng();
}

async function processCollection(contentDir, collectionName, generated, skipped, categoryStats, truncated) {
	const allFiles = await fs.readdir(contentDir);
	const files = allFiles.filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
	
	for (const file of files) {
		const slug = file.replace(/\.mdx?$/, '');
		const filePath = path.join(contentDir, file);
		const outputPathPng = path.join(outputDir, `${slug}.png`);
		const outputPathWebp = path.join(outputDir, `${slug}.webp`);
		
		try {
			await fs.access(outputPathPng);
			await fs.access(outputPathWebp);
			skipped.count++;
			continue;
		} catch {}
		
		const frontmatter = await extractFrontmatter(filePath);
		if (!frontmatter) continue;
		
		const realCategory = detectRealCategory(slug, frontmatter.frontmatterCategory);
		const productSlug = await detectProduct(filePath, slug);
		categoryStats[realCategory] = (categoryStats[realCategory] || 0) + 1;
		
		// Vérifier si le titre est complet
		const titleLines = wrapText(frontmatter.title, 40);
		const renderedTitle = titleLines.join(' ');
		if (!frontmatter.title.includes(renderedTitle.trim())) {
			console.warn(`⚠️  Possible truncation: "${frontmatter.title}" → "${renderedTitle}"`);
			truncated.push({ slug, original: frontmatter.title, rendered: renderedTitle });
		}
		
		try {
			const pngBuffer = await generateThumbnail(slug, frontmatter.title, realCategory, productSlug);
			
			// Sauvegarder PNG (pour og:image)
			await fs.writeFile(outputPathPng, pngBuffer);
			
			// Générer WebP (pour listes et bannières)
			await sharp(pngBuffer)
				.webp({ quality: 82 })
				.toFile(outputPathWebp);
			
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
	console.log('🎨 Generating thumbnails v4 - gray-matter + WebP...\n');
	
	await fs.mkdir(outputDir, { recursive: true });
	
	const stats = { count: 0 };
	const skipped = { count: 0 };
	const categoryStats = {};
	const truncated = [];
	
	const blogCount = await processCollection(blogContentDir, 'blog', stats, skipped, categoryStats, truncated);
	const domotiqueCount = await processCollection(domotiqueContentDir, 'domotique', stats, skipped, categoryStats, truncated);
	
	console.log(`\n📊 Summary:`);
	console.log(`   ✅ Generated: ${stats.count} (PNG + WebP)`);
	console.log(`   ⏭️  Skipped: ${skipped.count}`);
	console.log(`\n🎨 Par catégorie:`);
	for (const [cat, count] of Object.entries(categoryStats).sort((a, b) => b[1] - a[1])) {
		console.log(`   ${cat}: ${count}`);
	}
	
	if (truncated.length > 0) {
		console.log(`\n⚠️  Titres possiblement tronqués: ${truncated.length}`);
		for (const t of truncated.slice(0, 5)) {
			console.log(`   ${t.slug}:`);
			console.log(`      Original: ${t.original}`);
			console.log(`      Rendu:    ${t.rendered}`);
		}
	}
}

main().catch(console.error);
