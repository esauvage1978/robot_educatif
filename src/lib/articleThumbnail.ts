import type { ImageMetadata } from 'astro';
import type { CollectionEntry } from 'astro:content';

const genericImages = ['mbot-hero.png', 'robots-hero.png', 'hero-placeholder.png'];

// Liste des épingles Pinterest disponibles (générées à la compilation)
const availablePinterestPins = [
	'meilleur-robot-programmable-enfant-2026',
	'quel-robot-acheter-enfant-5-ans-guide-achat',
	'quel-robot-acheter-enfant-8-ans-guide-achat',
	'quel-robot-acheter-enfant-10-ans-guide-achat',
	'quel-robot-acheter-enfant-12-ans-guide-achat',
	'robot-educatif-cadeau-noel-2026',
	'cadeau-robot-enfant-8-ans',
	'cadeau-robot-enfant-10-ans',
	'robot-moins-de-50-euros',
	'robot-moins-de-100-euros',
	'robot-enfant-4-ans',
	'kit-robot-arduino-enfant',
	'10-projets-mbot-gratuits-classe-faciles',
	'installer-mblock-5-sous-windows-10'
];

/**
 * Résout la vignette à utiliser pour un article de blog.
 * Priorité:
 * 1. heroImage si spécifique (pas générique)
 * 2. Épingle Pinterest <slug>-1.jpg
 * 3. Génération SVG avec titre + catégorie (TOUJOURS en fallback)
 */
export function resolveArticleThumbnail(
	post: CollectionEntry<'blog'>,
	heroImage?: ImageMetadata
): { type: 'image'; src: ImageMetadata } | { type: 'pinterest'; slug: string } | { type: 'generated' } {
	
	// 1. heroImage spécifique (pas générique)
	if (heroImage) {
		const isGeneric = genericImages.some(g => heroImage.src.includes(g));
		if (!isGeneric) {
			return { type: 'image', src: heroImage };
		}
	}
	
	// 2. Épingle Pinterest
	const slug = post.id.replace(/\.mdx?$/, '');
	if (availablePinterestPins.includes(slug)) {
		return { type: 'pinterest', slug };
	}
	
	// 3. Génération SVG (TOUJOURS en fallback, garantit qu'aucune carte ne reste sans image)
	return { type: 'generated' };
}

/**
 * Génère un SVG unique pour un article (couverture dynamique)
 */
export function generateArticleThumbnail(post: CollectionEntry<'blog'>): string {
	const title = post.data.title;
	const category = post.data.categories?.[0] || 'Guide';
	
	// Couleurs d'accent par catégorie
	const categoryColors: Record<string, string> = {
		'mBot': '#0F766E',
		'Arduino': '#00979D',
		'Python': '#3776AB',
		'Raspberry Pi': '#C51A4A',
		'LEGO': '#FFCF00',
		'École': '#F97316',
		'Guide': '#14B8A6',
	};
	
	const accentColor = categoryColors[category] || '#14B8A6';
	const iconSize = 80;
	const width = 1200;
	const height = 675;
	
	// Icône robot simple
	const robotIcon = `
		<g transform="translate(${width - 150}, ${height / 2 - iconSize / 2})">
			<rect x="10" y="20" width="60" height="50" rx="5" fill="${accentColor}" opacity="0.2"/>
			<circle cx="25" cy="35" r="4" fill="${accentColor}"/>
			<circle cx="55" cy="35" r="4" fill="${accentColor}"/>
			<rect x="28" y="48" width="24" height="3" rx="1.5" fill="${accentColor}"/>
			<line x1="35" y1="10" x2="35" y2="20" stroke="${accentColor}" stroke-width="3" stroke-linecap="round"/>
			<circle cx="35" cy="8" r="4" fill="${accentColor}"/>
		</g>
	`;
	
	// Échapper les caractères XML
	const escapeXml = (str: string) => 
		str.replace(/&/g, '&amp;')
		   .replace(/</g, '&lt;')
		   .replace(/>/g, '&gt;')
		   .replace(/"/g, '&quot;')
		   .replace(/'/g, '&apos;');
	
	// Découper titre en lignes (max 50 caractères par ligne)
	const words = title.split(' ');
	const lines: string[] = [];
	let currentLine = '';
	
	for (const word of words) {
		const testLine = currentLine ? `${currentLine} ${word}` : word;
		if (testLine.length <= 50) {
			currentLine = testLine;
		} else {
			if (currentLine) lines.push(currentLine);
			currentLine = word;
		}
	}
	if (currentLine) lines.push(currentLine);
	
	// Limiter à 3 lignes
	const displayLines = lines.slice(0, 3);
	if (lines.length > 3) {
		displayLines[2] = displayLines[2].slice(0, 47) + '...';
	}
	
	const titleY = height / 2 - (displayLines.length * 25);
	
	const svg = `
		<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" style="stop-color:#F8FAFC"/>
					<stop offset="100%" style="stop-color:#E2E8F0"/>
				</linearGradient>
			</defs>
			<rect width="${width}" height="${height}" fill="url(#bg)"/>
			<text x="80" y="80" font-family="system-ui, sans-serif" font-size="24" font-weight="700" fill="${accentColor}">${escapeXml(category)}</text>
			${displayLines.map((line, i) => 
				`<text x="80" y="${titleY + i * 60}" font-family="system-ui, sans-serif" font-size="52" font-weight="800" fill="#0B1F2A">${escapeXml(line)}</text>`
			).join('\n')}
			${robotIcon}
			<text x="80" y="${height - 80}" font-family="system-ui, sans-serif" font-size="20" font-weight="600" fill="#64748B">robot-educatif.info</text>
		</svg>
	`;
	
	return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}
