#!/usr/bin/env node

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
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
const assetsDir = join(rootDir, 'src', 'assets', 'blog-heroes');
const fontsDir = join(__dirname, 'fonts');

const SITE_URL = 'https://robot-educatif.info';
const PINTEREST_WIDTH = 1000;
const PINTEREST_HEIGHT = 1500;

// Charger les polices
const fontRegular = readFileSync(join(fontsDir, 'Roboto-Regular.ttf'));
const fontBold = readFileSync(join(fontsDir, 'Roboto-Bold.ttf'));

const fonts = [
	{
		name: 'Roboto',
		data: fontRegular,
		weight: 400,
		style: 'normal'
	},
	{
		name: 'Roboto',
		data: fontBold,
		weight: 700,
		style: 'normal'
	}
];

// Configuration des pages à créer
const PAGES_CONFIG = [
	{
		slug: 'meilleur-robot-programmable-enfant-2026',
		titles: [
			{ text: 'Meilleur Robot Programmable\nEnfant 2026', subtitle: 'Guide complet par âge et budget' },
			{ text: 'Quel Robot Programmable\nChoisir pour Votre Enfant ?', subtitle: 'Comparatif 2026 des meilleurs modèles' }
		],
		board: 'Robots programmables par âge',
		description: 'Découvrez notre guide 2026 pour choisir le meilleur robot programmable pour enfant selon l\'âge et le budget. Comparatif détaillé, conseils d\'experts.',
		keywords: 'robot programmable, enfant, 2026, guide achat, comparatif',
		isChristmas: false
	},
	{
		slug: 'quel-robot-acheter-enfant-5-ans-guide-achat',
		titles: [
			{ text: 'Quel Robot pour\nun Enfant de 5 Ans ?', subtitle: 'Les meilleurs robots éducatifs' },
			{ text: 'Robots Programmables\n5 Ans', subtitle: 'Apprendre en s\'amusant dès 5 ans' }
		],
		board: 'Robots programmables par âge',
		description: 'Les meilleurs robots éducatifs pour enfants de 5 ans : sélection 2026, critères de choix et conseils pour débuter la programmation.',
		keywords: 'robot 5 ans, enfant, programmation, éducatif',
		isChristmas: false
	},
	{
		slug: 'quel-robot-acheter-enfant-8-ans-guide-achat',
		titles: [
			{ text: 'Robot Programmable\n8 Ans', subtitle: 'Les meilleurs choix pour progresser' },
			{ text: 'Quel Robot Éducatif\npour 8 Ans ?', subtitle: 'Guide d\'achat complet 2026' }
		],
		board: 'Robots programmables par âge',
		description: 'Guide complet des meilleurs robots programmables pour enfants de 8 ans. Découvrez nos recommandations pour apprendre la robotique.',
		keywords: 'robot 8 ans, programmation enfant, robotique',
		isChristmas: false
	},
	{
		slug: 'quel-robot-acheter-enfant-10-ans-guide-achat',
		titles: [
			{ text: 'Robot Programmable\n10 Ans', subtitle: 'Pour aller plus loin en robotique' },
			{ text: 'Meilleurs Robots\npour 10 Ans', subtitle: 'Python, Arduino, projets avancés' }
		],
		board: 'Robots programmables par âge',
		description: 'Robots programmables pour enfants de 10 ans : mBot2, Arduino, Python. Guide complet pour choisir le robot éducatif adapté.',
		keywords: 'robot 10 ans, mbot, arduino, python',
		isChristmas: false
	},
	{
		slug: 'quel-robot-acheter-enfant-12-ans-guide-achat',
		titles: [
			{ text: 'Robot Programmable\n12 Ans et Plus', subtitle: 'Arduino, Raspberry Pi, projets experts' },
			{ text: 'Robotique Ado\n12 Ans et +', subtitle: 'Les meilleurs kits avancés' }
		],
		board: 'Robots programmables par âge',
		description: 'Robots programmables pour ados de 12 ans et plus : Arduino, Raspberry Pi, drones. Guide pour projets robotiques avancés.',
		keywords: 'robot 12 ans, ado, arduino, raspberry pi',
		isChristmas: false
	},
	{
		slug: 'robot-educatif-cadeau-noel-2026',
		titles: [
			{ text: '🎄 Robots Éducatifs\nNoël 2026', subtitle: 'Idées cadeaux par âge et budget' },
			{ text: '🎁 Cadeau Robot\nNoël 2026', subtitle: 'Les meilleurs robots sous le sapin' }
		],
		board: 'Cadeaux robots enfants',
		description: 'Idées cadeaux Noël 2026 : les meilleurs robots éducatifs pour enfants et ados. Sélection par âge, budget et niveau.',
		keywords: 'cadeau noel, robot, enfant, 2026, idées',
		isChristmas: true
	},
	{
		slug: 'cadeau-robot-enfant-8-ans',
		titles: [
			{ text: '🎁 Cadeau Robot\n8 Ans', subtitle: 'Les meilleures idées 2026' },
			{ text: 'Robot Éducatif\nCadeau 8 Ans', subtitle: 'Apprendre en s\'amusant' }
		],
		board: 'Cadeaux robots enfants',
		description: 'Idées cadeaux robots pour enfants de 8 ans : sélection des meilleurs robots éducatifs pour anniversaire ou Noël 2026.',
		keywords: 'cadeau robot 8 ans, anniversaire, programmation',
		isChristmas: true
	},
	{
		slug: 'cadeau-robot-enfant-10-ans',
		titles: [
			{ text: '🎁 Cadeau Robot\n10 Ans', subtitle: 'Pour passionner votre enfant' },
			{ text: 'Robot Programmable\nCadeau 10 Ans', subtitle: 'Idées géniales 2026' }
		],
		board: 'Cadeaux robots enfants',
		description: 'Cadeaux robots pour 10 ans : mBot, Arduino, et autres robots programmables pour passionner votre enfant de robotique.',
		keywords: 'cadeau robot 10 ans, idée cadeau, programmation',
		isChristmas: true
	},
	{
		slug: 'robot-moins-de-50-euros',
		titles: [
			{ text: 'Robots Éducatifs\nMoins de 50 €', subtitle: 'Qualité et petit budget' },
			{ text: 'Robot Programmable\nPas Cher', subtitle: 'Les meilleurs choix à moins de 50 €' }
		],
		board: 'Cadeaux robots enfants',
		description: 'Robots éducatifs à moins de 50 € : notre sélection des meilleurs robots programmables petit budget sans compromis sur la qualité.',
		keywords: 'robot pas cher, moins 50 euros, budget, éducatif',
		isChristmas: false
	},
	{
		slug: 'robot-moins-de-100-euros',
		titles: [
			{ text: 'Robots Programmables\nMoins de 100 €', subtitle: 'Le meilleur rapport qualité-prix' },
			{ text: 'Meilleurs Robots\nAutour de 100 €', subtitle: 'Budget raisonnable, qualité pro' }
		],
		board: 'Cadeaux robots enfants',
		description: 'Robots programmables à moins de 100 € : découvrez notre sélection pour un excellent rapport qualité-prix en robotique éducative.',
		keywords: 'robot 100 euros, budget, rapport qualité prix',
		isChristmas: false
	},
	{
		slug: 'robot-enfant-4-ans',
		titles: [
			{ text: 'Robot Éducatif\n4 Ans', subtitle: 'Premiers pas en programmation' },
			{ text: 'Robots sans Écran\npour 4 Ans', subtitle: 'Apprendre en manipulant' }
		],
		board: 'Robots programmables par âge',
		description: 'Robots éducatifs pour enfants de 4 ans : programmation sans écran, apprentissage par le jeu. Guide des meilleurs modèles 2026.',
		keywords: 'robot 4 ans, sans écran, programmation jeune enfant',
		isChristmas: false
	},
	{
		slug: 'kit-robot-arduino-enfant',
		titles: [
			{ text: 'Kits Robot Arduino\npour Enfants', subtitle: 'Débuter avec Arduino' },
			{ text: 'Meilleurs Kits\nArduino Enfant', subtitle: 'Apprendre l\'électronique et la prog' }
		],
		board: 'Raspberry Pi et Arduino pour ados',
		description: 'Kits robots Arduino pour enfants et ados : comparatif 2026 des meilleurs kits pour débuter l\'électronique et la programmation.',
		keywords: 'arduino, kit robot, enfant, électronique, programmation',
		isChristmas: false
	},
	{
		slug: '10-projets-mbot-gratuits-classe-faciles',
		titles: [
			{ text: '10 Projets mBot\nGratuits', subtitle: 'Faciles pour la classe' },
			{ text: 'Projets mBot\nPour la Classe', subtitle: '10 activités clés en main' }
		],
		board: 'Projets mBot et robotique en classe',
		description: '10 projets mBot gratuits et faciles pour la classe : activités clés en main, progressives, avec fichiers à télécharger.',
		keywords: 'mbot, projets, classe, école, gratuit, activités',
		isChristmas: false
	},
	{
		slug: 'installer-mblock-5-sous-windows-10',
		titles: [
			{ text: 'Installer mBlock 5\nsous Windows 10', subtitle: 'Guide pas à pas complet' },
			{ text: 'Tutoriel mBlock 5\nWindows', subtitle: 'Installation et configuration' }
		],
		board: 'Projets mBot et robotique en classe',
		description: 'Comment installer mBlock 5 sous Windows 10 : guide complet pas à pas avec captures d\'écran et résolution des problèmes courants.',
		keywords: 'mblock, installation, windows 10, tutoriel',
		isChristmas: false
	}
];

// Infographies
const INFOGRAPHICS_CONFIG = [
	{
		slug: 'infographic-robot-par-age',
		title: 'Quel Robot Programmable\nSelon l\'Âge ?',
		items: [
			{ age: '4-6 ans', robots: 'Bee-Bot, Blue-Bot, Matatalab' },
			{ age: '6-8 ans', robots: 'mTiny, Dash, Ozobot' },
			{ age: '8-10 ans', robots: 'mBot, LEGO Boost, Thymio' },
			{ age: '10-12 ans', robots: 'mBot2, LEGO Mindstorms' },
			{ age: '12+ ans', robots: 'Arduino, Raspberry Pi, drones' }
		],
		board: 'Robots programmables par âge',
		description: 'Infographie : quel robot programmable choisir selon l\'âge de l\'enfant ? Guide visuel des meilleurs robots éducatifs de 4 à 14 ans.',
		keywords: 'robot par âge, guide visuel, infographie, éducatif',
		isChristmas: false
	},
	{
		slug: 'infographic-robots-budget',
		title: 'Robots Éducatifs\nPar Budget',
		items: [
			{ budget: 'Moins de 50 €', robots: 'mBot-S, Ozobot Evo Lite' },
			{ budget: '50-100 €', robots: 'mBot, Thymio' },
			{ budget: '100-200 €', robots: 'mBot2, LEGO Boost' },
			{ budget: '200-400 €', robots: 'LEGO Mindstorms, CyberPi' },
			{ budget: '400 € et +', robots: 'Raspberry Pi + périph, drones' }
		],
		board: 'Cadeaux robots enfants',
		description: 'Infographie : robots éducatifs par budget, de moins de 50 € à plus de 400 €. Trouvez le meilleur robot programmable selon votre budget.',
		keywords: 'robot budget, prix, infographie, comparatif',
		isChristmas: false
	},
	{
		slug: 'infographic-projets-mbot-classe',
		title: 'Projets mBot\nPour la Classe',
		items: [
			{ niveau: 'Débutant', projet: 'Faire avancer le robot' },
			{ niveau: 'Débutant', projet: 'Faire clignoter les LEDs' },
			{ niveau: 'Intermédiaire', projet: 'Évitement d\'obstacles' },
			{ niveau: 'Intermédiaire', projet: 'Suiveur de ligne' },
			{ niveau: 'Avancé', projet: 'Détecteur d\'intrusion' }
		],
		board: 'Projets mBot et robotique en classe',
		description: 'Infographie : idées de projets mBot pour la classe, du débutant à l\'avancé. Activités progressives pour l\'apprentissage de la robotique.',
		keywords: 'mbot, projets classe, activités, robotique, éducation',
		isChristmas: false
	}
];

// Fonction pour obtenir l'image hero d'un article
function getHeroImage(slug) {
	try {
		const mdxPath = join(contentDir, `${slug}.mdx`);
		const mdPath = join(contentDir, `${slug}.md`);
		
		let filePath;
		if (existsSync(mdxPath)) {
			filePath = mdxPath;
		} else if (existsSync(mdPath)) {
			filePath = mdPath;
		} else {
			console.warn(`⚠️  Article not found: ${slug}`);
			return null;
		}
		
		const content = readFileSync(filePath, 'utf-8');
		const { data } = matter(content);
		
		if (data.heroImage) {
			// Format: "../../assets/blog-heroes/hero-mbot-vs.png"
			const heroFileName = data.heroImage.split('/').pop();
			const heroPath = join(assetsDir, heroFileName);
			
			if (existsSync(heroPath)) {
				return heroPath;
			}
		}
		
		console.warn(`⚠️  Hero image not found for ${slug}`);
		return null;
	} catch (error) {
		console.error(`Error reading hero image for ${slug}:`, error.message);
		return null;
	}
}

// Fonction pour créer un pin avec satori
async function generatePin({ title, subtitle, imagePath, slug, variantIndex, isChristmas }) {
	const bgColor = isChristmas ? '#165B34' : '#0066CC';
	const accentColor = isChristmas ? '#C41E3A' : '#FF6B35';
	const snowflake = isChristmas ? '❄️ ' : '';
	
	// Préparer l'image si elle existe
	let imageDataUrl = null;
	if (imagePath && existsSync(imagePath)) {
		try {
			const imageBuffer = await sharp(imagePath)
				.resize(900, 500, { fit: 'cover', position: 'center' })
				.toBuffer();
			imageDataUrl = `data:image/png;base64,${imageBuffer.toString('base64')}`;
		} catch (error) {
			console.warn(`⚠️  Could not process image ${imagePath}:`, error.message);
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
					// Image en haut (si disponible)
					imageDataUrl && {
						type: 'div',
						props: {
							style: {
								width: '100%',
								height: '500px',
								display: 'flex',
								position: 'relative'
							},
							children: [
								{
									type: 'img',
									props: {
										src: imageDataUrl,
										style: {
											width: '100%',
											height: '100%',
											objectFit: 'cover'
										}
									}
								}
							]
						}
					},
					// Contenu texte
					{
						type: 'div',
						props: {
							style: {
								flex: 1,
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
								padding: '60px 70px',
								textAlign: 'center',
								color: 'white'
							},
							children: [
								{
									type: 'div',
									props: {
										style: {
											fontSize: '72px',
											fontWeight: 'bold',
											lineHeight: 1.15,
											marginBottom: '30px',
											color: 'white',
											whiteSpace: 'pre-line'
										},
										children: snowflake + title
									}
								},
								{
									type: 'div',
									props: {
										style: {
											fontSize: '40px',
											fontWeight: '600',
											color: accentColor,
											marginBottom: '50px'
										},
										children: subtitle
									}
								},
								{
									type: 'div',
									props: {
										style: {
											fontSize: '38px',
											fontWeight: 'bold',
											color: 'white',
											backgroundColor: accentColor,
											padding: '20px 50px',
											borderRadius: '50px'
										},
										children: 'robot-educatif.info'
									}
								}
							]
						}
					}
				].filter(Boolean)
			}
		},
		{
			width: PINTEREST_WIDTH,
			height: PINTEREST_HEIGHT,
			fonts: fonts
		}
	);
	
	// Convertir SVG en PNG avec resvg
	const resvg = new Resvg(svg, {
		fitTo: {
			mode: 'width',
			value: PINTEREST_WIDTH
		}
	});
	
	const pngData = resvg.render();
	const pngBuffer = pngData.asPng();
	
	// Optimiser avec sharp et convertir en JPG
	const optimizedBuffer = await sharp(pngBuffer)
		.jpeg({ quality: 90, progressive: true })
		.toBuffer();
	
	const outputPath = join(pinterestDir, `${slug}-${variantIndex + 1}.jpg`);
	writeFileSync(outputPath, optimizedBuffer);
	
	console.log(`✅ Generated: ${slug}-${variantIndex + 1}.jpg`);
	return outputPath;
}

// Fonction pour créer une infographie
async function generateInfographic({ slug, title, items, isChristmas }) {
	const bgColor = isChristmas ? '#165B34' : '#0066CC';
	const accentColor = isChristmas ? '#C41E3A' : '#FF6B35';
	
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
					padding: '70px 60px',
					color: 'white'
				},
				children: [
					// Titre
					{
						type: 'div',
						props: {
							style: {
								fontSize: '70px',
								fontWeight: 'bold',
								lineHeight: 1.2,
								marginBottom: '50px',
								textAlign: 'center',
								color: 'white',
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
								gap: '35px',
								justifyContent: 'center'
							},
							children: items.map((item, index) => ({
								type: 'div',
								props: {
									style: {
										display: 'flex',
										flexDirection: 'column',
										backgroundColor: 'rgba(255, 255, 255, 0.1)',
										padding: '30px 40px',
										borderRadius: '20px',
										borderLeft: `8px solid ${accentColor}`
									},
									children: [
										{
											type: 'div',
											props: {
												style: {
													fontSize: '36px',
													fontWeight: 'bold',
													color: accentColor,
													marginBottom: '10px'
												},
												children: item.age || item.budget || item.niveau || `${index + 1}.`
											}
										},
										{
											type: 'div',
											props: {
												style: {
													fontSize: '32px',
													color: 'white',
													fontWeight: '500'
												},
												children: item.robots || item.projet
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
								fontSize: '38px',
								fontWeight: 'bold',
								color: 'white',
								backgroundColor: accentColor,
								padding: '20px 50px',
								borderRadius: '50px',
								textAlign: 'center',
								marginTop: '50px'
							},
							children: 'robot-educatif.info'
						}
					}
				]
			}
		},
		{
			width: PINTEREST_WIDTH,
			height: PINTEREST_HEIGHT,
			fonts: fonts
		}
	);
	
	const resvg = new Resvg(svg, {
		fitTo: {
			mode: 'width',
			value: PINTEREST_WIDTH
		}
	});
	
	const pngData = resvg.render();
	const pngBuffer = pngData.asPng();
	
	const optimizedBuffer = await sharp(pngBuffer)
		.jpeg({ quality: 90, progressive: true })
		.toBuffer();
	
	const outputPath = join(pinterestDir, `${slug}.jpg`);
	writeFileSync(outputPath, optimizedBuffer);
	
	console.log(`✅ Generated infographic: ${slug}.jpg`);
	return outputPath;
}

// Fonction pour générer le CSV
function generateCSV(pins) {
	const headers = ['Title', 'Media URL', 'Pinterest board', 'Description', 'Link', 'Publish date', 'Keywords'];
	const rows = [headers];
	
	pins.forEach(pin => {
		const utmLink = `${SITE_URL}/${pin.slug}/?utm_source=pinterest&utm_medium=social&utm_campaign=${pin.slug}`;
		rows.push([
			pin.title,
			pin.mediaUrl,
			pin.board,
			pin.description,
			utmLink,
			'', // Publish date vide
			pin.keywords
		]);
	});
	
	const csvContent = rows.map(row => 
		row.map(cell => `"${(cell || '').replace(/"/g, '""')}"`).join(',')
	).join('\n');
	
	const csvPath = join(pinterestDir, 'pins.csv');
	writeFileSync(csvPath, csvContent, 'utf-8');
	console.log(`\n✅ Generated CSV: ${csvPath}`);
	console.log(`📊 Total pins: ${pins.length}`);
}

// Fonction principale
async function main() {
	console.log('🎨 Generating Pinterest pins...\n');
	
	const allPins = [];
	
	// Générer les pins pour les pages
	for (const page of PAGES_CONFIG) {
		const heroImage = getHeroImage(page.slug);
		
		for (let i = 0; i < page.titles.length; i++) {
			const { text, subtitle } = page.titles[i];
			
			await generatePin({
				title: text,
				subtitle: subtitle,
				imagePath: heroImage,
				slug: page.slug,
				variantIndex: i,
				isChristmas: page.isChristmas
			});
			
			allPins.push({
				title: `${text.replace(/\n/g, ' ')} - ${subtitle}`,
				mediaUrl: `${SITE_URL}/pinterest/${page.slug}-${i + 1}.jpg`,
				board: page.board,
				description: page.description,
				slug: page.slug,
				keywords: page.keywords
			});
		}
	}
	
	// Générer les infographies
	for (const infographic of INFOGRAPHICS_CONFIG) {
		await generateInfographic(infographic);
		
		allPins.push({
			title: infographic.title.replace(/\n/g, ' '),
			mediaUrl: `${SITE_URL}/pinterest/${infographic.slug}.jpg`,
			board: infographic.board,
			description: infographic.description,
			slug: infographic.slug.replace('infographic-', ''),
			keywords: infographic.keywords
		});
	}
	
	// Générer le CSV
	generateCSV(allPins);
	
	console.log('\n✨ All done! Pinterest pins are ready in public/pinterest/');
	console.log('\n📋 Next steps:');
	console.log('   1. Review the generated pins');
	console.log('   2. Import pins.csv into Pinterest (https://business.pinterest.com/bulk-create-pins)');
	console.log('   3. Create the suggested boards if they don\'t exist');
}

main().catch(console.error);
