/**
 * Génère la vignette spéciale du hub domotique
 * Titre: "Domotique : le guide complet"
 * Fond clair avec icône maison et petits capteurs
 */
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, '../public/images/blog-thumbnails');
const fontPath = path.join(__dirname, './fonts/Roboto-Bold.ttf');

// Génère une icône maison SVG comme data URL
function generateHomeIcon() {
	const svg = `<svg width="280" height="280" xmlns="http://www.w3.org/2000/svg">
		<path d="M 140 70 L 240 130 L 240 230 L 40 230 L 40 130 Z" fill="#0F766E" opacity="0.3"/>
		<rect x="100" y="160" width="80" height="70" fill="white" opacity="0.5"/>
		<rect x="190" y="130" width="40" height="40" fill="white" opacity="0.5"/>
		<path d="M 20 130 L 140 50 L 260 130" fill="none" stroke="#0F766E" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"/>
		<circle cx="60" cy="70" r="12" fill="#14B8A6" opacity="0.35"/>
		<rect x="200" y="55" width="24" height="28" rx="4" fill="#14B8A6" opacity="0.35"/>
		<circle cx="230" cy="190" r="14" fill="#14B8A6" opacity="0.35"/>
		<rect x="50" cy="190" width="22" height="30" rx="3" fill="#14B8A6" opacity="0.35"/>
	</svg>`;
	return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

async function generateHubThumbnail() {
	const fontBuffer = await fs.readFile(fontPath);
	const homeIconDataURL = generateHomeIcon();
	
	const badge = {
		type: 'div',
		props: {
			style: {
				position: 'absolute',
				top: '40px',
				left: '50px',
				backgroundColor: '#0F766E',
				color: '#FFFFFF',
				padding: '12px 28px',
				borderRadius: '12px',
				fontSize: '26px',
				fontWeight: 800
			},
			children: 'Domotique'
		}
	};
	
	const titleBlock = {
		type: 'div',
		props: {
			style: {
				position: 'absolute',
				top: '160px',
				left: '50px',
				width: '680px',
				display: 'flex',
				flexDirection: 'column',
				gap: '12px'
			},
			children: [
				{
					type: 'div',
					props: {
						style: {
							fontSize: '62px',
							fontWeight: 800,
							color: '#0B1F2A',
							lineHeight: 1.1
						},
						children: 'Domotique : le guide'
					}
				},
				{
					type: 'div',
					props: {
						style: {
							fontSize: '62px',
							fontWeight: 800,
							color: '#0B1F2A',
							lineHeight: 1.1
						},
						children: 'complet'
					}
				}
			]
		}
	};
	
	const iconElement = {
		type: 'div',
		props: {
			style: {
				position: 'absolute',
				top: '165px',
				right: '60px',
				width: '280px',
				height: '280px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center'
			},
			children: {
				type: 'img',
				props: {
					src: homeIconDataURL,
					width: 280,
					height: 280,
					style: { width: '280px', height: '280px' }
				}
			}
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
				color: '#0F766E'
			},
			children: 'robot-educatif'
		}
	};
	
	const svg = await satori(
		{
			type: 'div',
			props: {
				style: {
					width: '100%',
					height: '100%',
					display: 'flex',
					position: 'relative',
					backgroundColor: '#F8FAFC'
				},
				children: [badge, titleBlock, iconElement, footer]
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

async function main() {
	console.log('🏠 Generating domotique hub thumbnail...');
	
	try {
		const pngBuffer = await generateHubThumbnail();
		
		const outputPathPng = path.join(outputDir, 'domotique-hub.png');
		const outputPathWebp = path.join(outputDir, 'domotique-hub.webp');
		
		await fs.writeFile(outputPathPng, pngBuffer);
		await sharp(pngBuffer).webp({ quality: 82 }).toFile(outputPathWebp);
		
		console.log('✅ Hub thumbnail created:');
		console.log(`   PNG:  ${path.relative(process.cwd(), outputPathPng)}`);
		console.log(`   WebP: ${path.relative(process.cwd(), outputPathWebp)}`);
	} catch (error) {
		console.error('❌ Failed:', error.message);
		process.exit(1);
	}
}

main();
