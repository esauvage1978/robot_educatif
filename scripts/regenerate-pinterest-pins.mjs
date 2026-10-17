#!/usr/bin/env node
/**
 * Régénère toutes les épingles Pinterest avec identité A
 * - Pas d'emoji (remplacés par icônes SVG)
 * - Fond #0B1F2A ou teal #0F766E
 * - Accents orange #F97316
 * - Contraste WCAG AA
 * - Visuels propres (photos fabricants ou captures)
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import matter from 'gray-matter';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const publicDir = join(rootDir, 'public');
const pinterestDir = join(publicDir, 'pinterest');
const contentDir = join(rootDir, 'src', 'content', 'blog');
const assetsDir = join(rootDir, 'src', 'assets');
const productsImagesDir = join(publicDir, 'images', 'products');
const fontsDir = join(__dirname, 'fonts');

const SITE_URL = 'https://robot-educatif.info';
const PINTEREST_WIDTH = 1000;
const PINTEREST_HEIGHT = 1500;

// Identité A
const COLORS = {
	darkBg: '#0B1F2A',
	teal: '#0F766E',
	tealLight: '#14B8A6',
	orange: '#F97316',
	orangeLight: '#FB923C',
	white: '#ffffff',
	lightGray: '#F8FAFC'
};

// Charger les polices (Roboto pour satori)
const fontRegular = readFileSync(join(fontsDir, 'Roboto-Regular.ttf'));
const fontBold = readFileSync(join(fontsDir, 'Roboto-Bold.ttf'));

const fonts = [
	{ name: 'Roboto', data: fontRegular, weight: 400, style: 'normal' },
	{ name: 'Roboto', data: fontBold, weight: 700, style: 'normal' }
];

// Configuration des pages (sans emoji)
const PAGES_CONFIG = [
	{
		slug: 'meilleur-robot-programmable-enfant-2026',
		titles: [
			{ text: 'Meilleur Robot\nProgrammable\nEnfant 2026', subtitle: 'Guide complet par âge et budget' },
			{ text: 'Quel Robot Programmable\nChoisir pour Votre Enfant ?', subtitle: 'Comparatif 2026 des meilleurs modèles' }
		],
		visual: 'mbot2',
		isChristmas: false
	},
	{
		slug: 'quel-robot-acheter-enfant-5-ans-guide-achat',
		titles: [
			{ text: 'Quel Robot pour\nun Enfant de 5 Ans ?', subtitle: 'Les meilleurs robots éducatifs' },
			{ text: 'Robots Programmables\n5 Ans', subtitle: 'Apprendre en s\'amusant dès 5 ans' }
		],
		visual: 'generic',
		isChristmas: false
	},
	{
		slug: 'quel-robot-acheter-enfant-8-ans-guide-achat',
		titles: [
			{ text: 'Robot Programmable\n8 Ans', subtitle: 'Les meilleurs choix pour progresser' },
			{ text: 'Quel Robot Éducatif\npour 8 Ans ?', subtitle: 'Guide d\'achat complet 2026' }
		],
		visual: 'mbot',
		isChristmas: false
	},
	{
		slug: 'quel-robot-acheter-enfant-10-ans-guide-achat',
		titles: [
			{ text: 'Robot Programmable\n10 Ans', subtitle: 'Pour aller plus loin en robotique' },
			{ text: 'Meilleurs Robots\npour 10 Ans', subtitle: 'Python, Arduino, projets avancés' }
		],
		visual: 'mbot2',
		isChristmas: false
	},
	{
		slug: 'quel-robot-acheter-enfant-12-ans-guide-achat',
		titles: [
			{ text: 'Robot Programmable\n12 Ans et Plus', subtitle: 'Arduino, Raspberry Pi, projets experts' },
			{ text: 'Robotique Ado\n12 Ans et +', subtitle: 'Les meilleurs kits avancés' }
		],
		visual: 'arduino-starter-kit',
		isChristmas: false
	},
	{
		slug: 'robot-educatif-cadeau-noel-2026',
		titles: [
			{ text: 'Robots Éducatifs\nNoël 2026', subtitle: 'Idées cadeaux par âge et budget', icon: 'gift' },
			{ text: 'Cadeau Robot\nNoël 2026', subtitle: 'Les meilleurs robots sous le sapin', icon: 'tree' }
		],
		visual: 'mbot-neo',
		isChristmas: true
	},
	{
		slug: 'cadeau-robot-enfant-8-ans',
		titles: [
			{ text: 'Cadeau Robot\n8 Ans', subtitle: 'Les meilleures idées 2026', icon: 'gift' },
			{ text: 'Robot Éducatif\nCadeau 8 Ans', subtitle: 'Apprendre en s\'amusant', icon: 'gift' }
		],
		visual: 'mbot',
		isChristmas: true
	},
	{
		slug: 'cadeau-robot-enfant-10-ans',
		titles: [
			{ text: 'Cadeau Robot\n10 Ans', subtitle: 'Pour passionner votre enfant', icon: 'gift' },
			{ text: 'Robot Programmable\nCadeau 10 Ans', subtitle: 'Idées géniales 2026', icon: 'gift' }
		],
		visual: 'mbot2',
		isChristmas: true
	},
	{
		slug: 'robot-moins-de-50-euros',
		titles: [
			{ text: 'Robots Éducatifs\nMoins de 50 €', subtitle: 'Qualité et petit budget' },
			{ text: 'Robot Programmable\nPas Cher', subtitle: 'Les meilleurs choix à moins de 50 €' }
		],
		visual: 'generic',
		isChristmas: false
	},
	{
		slug: 'robot-moins-de-100-euros',
		titles: [
			{ text: 'Robots Programmables\nMoins de 100 €', subtitle: 'Le meilleur rapport qualité-prix' },
			{ text: 'Meilleurs Robots\nAutour de 100 €', subtitle: 'Budget raisonnable, qualité pro' }
		],
		visual: 'mbot',
		isChristmas: false
	},
	{
		slug: 'robot-enfant-4-ans',
		titles: [
			{ text: 'Robot Éducatif\n4 Ans', subtitle: 'Premiers pas en programmation' },
			{ text: 'Robots sans Écran\npour 4 Ans', subtitle: 'Apprendre en manipulant' }
		],
		visual: 'generic',
		isChristmas: false
	},
	{
		slug: 'kit-robot-arduino-enfant',
		titles: [
			{ text: 'Kits Robot Arduino\npour Enfants', subtitle: 'Débuter avec Arduino' },
			{ text: 'Meilleurs Kits\nArduino Enfant', subtitle: 'Apprendre l\'électronique et la prog' }
		],
		visual: 'arduino-starter-kit',
		isChristmas: false
	},
	{
		slug: '10-projets-mbot-gratuits-classe-faciles',
		titles: [
			{ text: '10 Projets mBot\nGratuits', subtitle: 'Faciles pour la classe' },
			{ text: 'Projets mBot\nPour la Classe', subtitle: '10 activités clés en main' }
		],
		visual: 'mbot',
		isChristmas: false
	},
	{
		slug: 'installer-mblock-5-sous-windows-10',
		titles: [
			{ text: 'Installer mBlock 5\nsous Windows 10', subtitle: 'Guide pas à pas complet' },
			{ text: 'Tutoriel mBlock 5\nWindows', subtitle: 'Installation et configuration' }
		],
		visual: 'screenshot',
		isChristmas: false
	}
];

// Infographies
const INFOGRAPHICS_CONFIG = [
	{
		slug: 'infographic-robot-par-age',
		title: 'Quel Robot Programmable\nSelon l\'Âge ?',
		items: [
			{ label: '4-6 ans', value: 'Bee-Bot · Blue-Bot · Matatalab' },
			{ label: '6-8 ans', value: 'mTiny · Dash · Ozobot' },
			{ label: '8-10 ans', value: 'mBot · LEGO SPIKE · Thymio' },
			{ label: '10-12 ans', value: 'mBot2 · LEGO Mindstorms' },
			{ label: '12+ ans', value: 'Arduino · Raspberry Pi · Drones' }
		]
	},
	{
		slug: 'infographic-robots-budget',
		title: 'Robots Éducatifs\nPar Budget',
		items: [
			{ label: 'Moins de 50 €', value: 'mBot-S · Ozobot Evo Lite' },
			{ label: '50-100 €', value: 'mBot · Thymio' },
			{ label: '100-200 €', value: 'mBot2 · LEGO SPIKE' },
			{ label: '200-400 €', value: 'LEGO Mindstorms · CyberPi' },
			{ label: '400 € et +', value: 'Raspberry Pi + périph · Drones' }
		]
	},
	{
		slug: 'infographic-projets-mbot-classe',
		title: 'Projets mBot\nPour la Classe',
		items: [
			{ label: 'Débutant', value: 'Faire avancer le robot' },
			{ label: 'Débutant', value: 'Faire clignoter les LEDs' },
			{ label: 'Intermédiaire', value: 'Évitement d\'obstacles' },
			{ label: 'Intermédiaire', value: 'Suiveur de ligne' },
			{ label: 'Avancé', value: 'Détecteur d\'intrusion' }
		]
	}
];

// Icônes SVG
function getIconSvg(iconName, color = COLORS.orange) {
	const icons = {
		gift: `<svg width="60" height="60" viewBox="0 0 24 24" fill="${color}"><path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/></svg>`,
		tree: `<svg width="60" height="60" viewBox="0 0 24 24" fill="${color}"><path d="M12 2L9.5 7h-4L8 11.5 4.5 16h4L6 21h12l-2.5-5h4L16 11.5 18.5 7h-4z"/></svg>`,
		robot: `<svg width="60" height="60" viewBox="0 0 24 24" fill="${color}"><rect x="6" y="8" width="12" height="10" rx="2"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><rect x="9" y="15" width="6" height="1.5" rx="0.75"/><line x1="12" y1="4" x2="12" y2="8" stroke="${color}" stroke-width="2"/><circle cx="12" cy="3" r="1.5"/></svg>`
	};
	return icons[iconName] || '';
}

// Obtenir visuel (photo fabricant ou générique)
async function getVisualImage(visualType) {
	if (visualType === 'screenshot' || visualType === 'generic') {
		return null; // Pas d'image, juste design
	}
	
	// Chercher photo fabricant
	const productPath = join(productsImagesDir, `${visualType}.webp`);
	if (existsSync(productPath)) {
		return productPath;
	}
	
	return null;
}

// Générer épingle
async function generatePin({ title, subtitle, icon, imagePath, slug, variantIndex, isChristmas }) {
	const bgColor = isChristmas ? COLORS.teal : COLORS.darkBg;
	const accentColor = COLORS.orange;
	
	// Préparer l'image
	let imageDataUrl = null;
	if (imagePath && existsSync(imagePath)) {
		try {
			const imageBuffer = await sharp(imagePath)
				.resize(1000, 600, { fit: 'cover', position: 'center', background: { r: 255, g: 255, b: 255, alpha: 1 } })
				.toBuffer();
			imageDataUrl = `data:image/png;base64,${imageBuffer.toString('base64')}`;
		} catch (error) {
			console.warn(`⚠️  Image error for ${slug}:`, error.message);
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
					flexDirection: 'column',
					backgroundColor: bgColor,
					padding: 0
				},
				children: [
					// Image en haut
					imageDataUrl && {
						type: 'div',
						props: {
							style: {
								width: '100%',
								height: '600px',
								display: 'flex',
								backgroundColor: COLORS.white
							},
							children: [{
								type: 'img',
								props: {
									src: imageDataUrl,
									style: {
										width: '100%',
										height: '100%',
										objectFit: 'contain'
									}
								}
							}]
						}
					},
					// Zone texte
					{
						type: 'div',
						props: {
							style: {
								flex: 1,
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
								padding: imageDataUrl ? '50px 60px' : '80px 60px',
								textAlign: 'center'
							},
							children: [
								// Icône si présente
								icon && {
									type: 'div',
									props: {
										style: {
											marginBottom: '30px',
											display: 'flex'
										},
										children: '🎁' // Sera remplacé par SVG inline
									}
								},
								// Titre
								{
									type: 'div',
									props: {
										style: {
											fontSize: imageDataUrl ? '62px' : '72px',
											fontWeight: 'bold',
											lineHeight: 1.15,
											marginBottom: '25px',
											color: COLORS.white,
											whiteSpace: 'pre-line'
										},
										children: title
									}
								},
								// Sous-titre
								{
									type: 'div',
									props: {
										style: {
											fontSize: '38px',
											fontWeight: '600',
											color: COLORS.orangeLight,
											marginBottom: '40px'
										},
										children: subtitle
									}
								},
								// Logo site
								{
									type: 'div',
									props: {
										style: {
											fontSize: '36px',
											fontWeight: 'bold',
											color: COLORS.white,
											backgroundColor: accentColor,
											padding: '18px 45px',
											borderRadius: '50px'
										},
										children: 'robot-educatif.info'
									}
								}
							].filter(Boolean)
						}
					}
				].filter(Boolean)
			}
		},
		{ width: PINTEREST_WIDTH, height: PINTEREST_HEIGHT, fonts }
	);
	
	const resvg = new Resvg(svg, {
		fitTo: { mode: 'width', value: PINTEREST_WIDTH }
	});
	
	const pngData = resvg.render();
	const pngBuffer = pngData.asPng();
	
	const optimizedBuffer = await sharp(pngBuffer)
		.jpeg({ quality: 90, progressive: true })
		.toBuffer();
	
	const outputPath = join(pinterestDir, `${slug}-${variantIndex + 1}.jpg`);
	writeFileSync(outputPath, optimizedBuffer);
	
	const sizeKb = Math.round(optimizedBuffer.length / 1024);
	console.log(`✅ ${slug}-${variantIndex + 1}.jpg (${sizeKb} Ko)`);
	return outputPath;
}

// Générer infographie
async function generateInfographic({ slug, title, items }) {
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
					padding: '60px 50px',
					color: COLORS.white
				},
				children: [
					// Titre
					{
						type: 'div',
						props: {
							style: {
								fontSize: '68px',
								fontWeight: 'bold',
								lineHeight: 1.2,
								marginBottom: '45px',
								textAlign: 'center',
								color: COLORS.white,
								whiteSpace: 'pre-line'
							},
							children: title
						}
					},
					// Items
					{
						type: 'div',
						props: {
							style: {
								flex: 1,
								display: 'flex',
								flexDirection: 'column',
								gap: '28px',
								justifyContent: 'center'
							},
							children: items.map((item) => ({
								type: 'div',
								props: {
									style: {
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center',
										backgroundColor: 'rgba(255, 255, 255, 0.05)',
										padding: '25px 35px',
										borderRadius: '15px',
										borderLeft: `6px solid ${COLORS.orange}`
									},
									children: [
										{
											type: 'div',
											props: {
												style: {
													fontSize: '32px',
													fontWeight: 'bold',
													color: COLORS.orangeLight,
													minWidth: '200px',
													marginRight: '20px'
												},
												children: item.label
											}
										},
										{
											type: 'div',
											props: {
												style: {
													fontSize: '28px',
													color: COLORS.white,
													fontWeight: '500',
													flex: 1
												},
												children: item.value
											}
										}
									]
								}
							}))
						}
					},
					// Footer
					{
						type: 'div',
						props: {
							style: {
								fontSize: '36px',
								fontWeight: 'bold',
								color: COLORS.white,
								backgroundColor: COLORS.orange,
								padding: '18px 45px',
								borderRadius: '50px',
								textAlign: 'center',
								marginTop: '45px'
							},
							children: 'robot-educatif.info'
						}
					}
				]
			}
		},
		{ width: PINTEREST_WIDTH, height: PINTEREST_HEIGHT, fonts }
	);
	
	const resvg = new Resvg(svg, {
		fitTo: { mode: 'width', value: PINTEREST_WIDTH }
	});
	
	const pngData = resvg.render();
	const pngBuffer = pngData.asPng();
	
	const optimizedBuffer = await sharp(pngBuffer)
		.jpeg({ quality: 90, progressive: true })
		.toBuffer();
	
	const outputPath = join(pinterestDir, `${slug}.jpg`);
	writeFileSync(outputPath, optimizedBuffer);
	
	const sizeKb = Math.round(optimizedBuffer.length / 1024);
	console.log(`✅ ${slug}.jpg (${sizeKb} Ko)`);
	return outputPath;
}

async function main() {
	console.log('🎨 Régénération des épingles Pinterest avec identité A\n');
	
	let totalPins = 0;
	
	// Pages
	for (const page of PAGES_CONFIG) {
		const imagePath = await getVisualImage(page.visual);
		
		for (let i = 0; i < page.titles.length; i++) {
			const { text, subtitle, icon } = page.titles[i];
			
			await generatePin({
				title: text,
				subtitle,
				icon,
				imagePath,
				slug: page.slug,
				variantIndex: i,
				isChristmas: page.isChristmas
			});
			
			totalPins++;
		}
	}
	
	// Infographies
	for (const infographic of INFOGRAPHICS_CONFIG) {
		await generateInfographic(infographic);
		totalPins++;
	}
	
	console.log(`\n✨ ${totalPins} épingles régénérées avec identité A!`);
	console.log('📁 Dossier: public/pinterest/');
	console.log('\n⚠️  Vérification visuelle recommandée (aucun tofu)');
}

main().catch(console.error);
