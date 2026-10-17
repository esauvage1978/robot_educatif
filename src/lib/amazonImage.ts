import amazonImages from '../data/amazon-images.json';

/**
 * Get product image from PA-API cache or generate SVG placeholder
 */
export function getProductImage(asin: string | null, productName: string, width: number = 250, height: number = 250): string {
	// Try PA-API cached image first
	if (asin && amazonImages[asin as keyof typeof amazonImages]) {
		return amazonImages[asin as keyof typeof amazonImages];
	}
	
	// Fallback to custom SVG placeholder
	return generateProductSvg(productName, width, height);
}

/**
 * Generate custom SVG product placeholder
 * Uses site colors: teal #0F766E / #14B8A6, orange #F97316
 */
export function generateProductSvg(productName: string, width: number = 250, height: number = 250): string {
	// Detect product category from name for colors
	const name = productName.toLowerCase();
	let categoryColor = '#0F766E';
	let iconType = 'robot'; // default
	
	if (name.includes('raspberry') || name.includes('pi')) {
		categoryColor = '#14B8A6';
		iconType = 'board';
	} else if (name.includes('arduino') || name.includes('elegoo')) {
		categoryColor = '#F97316';
		iconType = 'kit';
	} else if (name.includes('cyber') || name.includes('carte')) {
		categoryColor = '#14B8A6';
		iconType = 'board';
	}
	
	// Short product name (max 2-3 words for small sizes)
	const shortName = productName
		.replace(/Makeblock /gi, '')
		.replace(/Kit /gi, '')
		.replace(/Robot /gi, '')
		.replace(/Intelligent /gi, '')
		.replace(/V4\.0/gi, '')
		.split(' ')
		.slice(0, width < 100 ? 2 : 3)
		.join(' ')
		.trim();
	
	// Scale font sizes proportionally (14px at 250px = 5.6% base)
	const baseFontPercent = 0.056; // 14px at 250px
	const fontSize = Math.max(Math.round(width * baseFontPercent), 11);
	const iconSize = width * 0.35;
	const circleRadius = width * 0.28;
	const textY = height * 0.78; // Position text lower to avoid cutting
	
	// Robot icon SVG (vectoriel, teal head + orange antenna)
	const robotIcon = iconType === 'robot' ? `
		<g transform="translate(${width/2 - iconSize/2}, ${height * 0.25})">
			<!-- Head -->
			<rect x="${iconSize * 0.15}" y="${iconSize * 0.2}" width="${iconSize * 0.7}" height="${iconSize * 0.6}" rx="${iconSize * 0.1}" fill="${categoryColor}"/>
			<!-- Antenna -->
			<line x1="${width/2}" y1="${iconSize * 0.1}" x2="${width/2}" y2="${iconSize * 0.2}" stroke="#F97316" stroke-width="${iconSize * 0.06}" stroke-linecap="round"/>
			<circle cx="${width/2}" cy="${iconSize * 0.08}" r="${iconSize * 0.08}" fill="#F97316"/>
			<!-- Eyes -->
			<circle cx="${iconSize * 0.35}" cy="${iconSize * 0.45}" r="${iconSize * 0.08}" fill="white"/>
			<circle cx="${iconSize * 0.65}" cy="${iconSize * 0.45}" r="${iconSize * 0.08}" fill="white"/>
			<!-- Mouth -->
			<rect x="${iconSize * 0.3}" y="${iconSize * 0.65}" width="${iconSize * 0.4}" height="${iconSize * 0.06}" rx="${iconSize * 0.03}" fill="white" opacity="0.8"/>
		</g>
	` : iconType === 'board' ? `
		<g transform="translate(${width/2 - iconSize/2}, ${height * 0.25})">
			<!-- Board outline -->
			<rect x="${iconSize * 0.1}" y="${iconSize * 0.15}" width="${iconSize * 0.8}" height="${iconSize * 0.7}" rx="${iconSize * 0.05}" fill="${categoryColor}" stroke="${categoryColor}" stroke-width="2"/>
			<!-- Chips -->
			<rect x="${iconSize * 0.25}" y="${iconSize * 0.35}" width="${iconSize * 0.25}" height="${iconSize * 0.25}" fill="white" opacity="0.3"/>
			<rect x="${iconSize * 0.55}" y="${iconSize * 0.35}" width="${iconSize * 0.2}" height="${iconSize * 0.15}" fill="white" opacity="0.3"/>
			<!-- Pins -->
			<circle cx="${iconSize * 0.2}" cy="${iconSize * 0.25}" r="${iconSize * 0.04}" fill="#F97316"/>
			<circle cx="${iconSize * 0.4}" cy="${iconSize * 0.25}" r="${iconSize * 0.04}" fill="#F97316"/>
			<circle cx="${iconSize * 0.6}" cy="${iconSize * 0.25}" r="${iconSize * 0.04}" fill="#F97316"/>
			<circle cx="${iconSize * 0.8}" cy="${iconSize * 0.25}" r="${iconSize * 0.04}" fill="#F97316"/>
		</g>
	` : `
		<g transform="translate(${width/2 - iconSize/2}, ${height * 0.25})">
			<!-- Kit box -->
			<rect x="${iconSize * 0.15}" y="${iconSize * 0.2}" width="${iconSize * 0.7}" height="${iconSize * 0.6}" rx="${iconSize * 0.08}" fill="${categoryColor}"/>
			<!-- Tools -->
			<line x1="${iconSize * 0.35}" y1="${iconSize * 0.4}" x2="${iconSize * 0.55}" y2="${iconSize * 0.6}" stroke="white" stroke-width="${iconSize * 0.08}" stroke-linecap="round"/>
			<circle cx="${iconSize * 0.65}" cy="${iconSize * 0.45}" r="${iconSize * 0.1}" fill="white" opacity="0.8"/>
		</g>
	`;
	
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
		<defs>
			<linearGradient id="bg-${width}-${height}" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" style="stop-color:#f0fdfa;stop-opacity:1" />
				<stop offset="100%" style="stop-color:#ecfeff;stop-opacity:1" />
			</linearGradient>
		</defs>
		<rect width="${width}" height="${height}" fill="url(#bg-${width}-${height})"/>
		<circle cx="${width/2}" cy="${height * 0.42}" r="${circleRadius}" fill="${categoryColor}" opacity="0.12"/>
		${robotIcon}
		<text x="${width/2}" y="${textY}" font-family="system-ui, -apple-system, sans-serif" font-size="${fontSize}" font-weight="600" fill="${categoryColor}" text-anchor="middle" dominant-baseline="middle">${shortName}</text>
		<rect x="0" y="0" width="${width}" height="${height}" fill="none" stroke="#e5e7eb" stroke-width="1"/>
	</svg>`;
	
	return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}
