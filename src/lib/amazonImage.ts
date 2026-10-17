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
	// Detect product category from name for icon
	const name = productName.toLowerCase();
	let icon = '🤖'; // default robot
	let categoryColor = '#0F766E';
	
	if (name.includes('raspberry') || name.includes('pi')) {
		icon = '💻';
		categoryColor = '#14B8A6';
	} else if (name.includes('arduino') || name.includes('elegoo')) {
		icon = '🔧';
		categoryColor = '#F97316';
	} else if (name.includes('cyber') || name.includes('carte')) {
		icon = '🎛️';
		categoryColor = '#14B8A6';
	}
	
	// Short product name (max 3-4 words)
	const shortName = productName
		.replace(/Makeblock /gi, '')
		.replace(/Kit /gi, '')
		.replace(/Robot /gi, '')
		.replace(/Intelligent /gi, '')
		.split(' ')
		.slice(0, 3)
		.join(' ');
	
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
		<defs>
			<linearGradient id="bg-${width}" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" style="stop-color:#f0fdfa;stop-opacity:1" />
				<stop offset="100%" style="stop-color:#ecfeff;stop-opacity:1" />
			</linearGradient>
		</defs>
		<rect width="${width}" height="${height}" fill="url(#bg-${width})"/>
		<circle cx="${width/2}" cy="${height/2 - 10}" r="${Math.min(width, height) * 0.25}" fill="${categoryColor}" opacity="0.12"/>
		<text x="${width/2}" y="${height * 0.4}" font-family="system-ui, sans-serif" font-size="${width * 0.25}" text-anchor="middle" dominant-baseline="middle">${icon}</text>
		<text x="${width/2}" y="${height * 0.7}" font-family="system-ui, -apple-system, sans-serif" font-size="${Math.min(width * 0.08, 14)}" font-weight="600" fill="${categoryColor}" text-anchor="middle" dominant-baseline="middle" style="line-height: 1.2">${shortName}</text>
		<rect x="0" y="0" width="${width}" height="${height}" fill="none" stroke="#e5e7eb" stroke-width="1"/>
	</svg>`;
	
	return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}
