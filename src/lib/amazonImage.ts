/**
 * Generate Amazon Product Advertising API image URL
 * Compliant with Amazon Associates Program Operating Agreement
 */
export function amazonImageUrl(asin: string | null, size: number = 250): string | null {
	if (!asin) return null;
	
	const sizeFormat = `_SL${size}_`;
	
	return `https://ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=${asin}&Format=${sizeFormat}&ID=AsinImage&MarketPlace=FR&ServiceVersion=20070822&WS=1&tag=manuso06-21`;
}

/**
 * Generate fallback SVG placeholder for products without ASIN
 */
export function generatePlaceholderSvg(productName: string, width: number = 250, height: number = 250): string {
	// Extract first letter for icon
	const initial = productName.charAt(0).toUpperCase();
	
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
		<rect width="${width}" height="${height}" fill="#f3f4f6"/>
		<circle cx="${width/2}" cy="${height/2}" r="${Math.min(width, height) * 0.35}" fill="#0F766E" opacity="0.1"/>
		<text x="${width/2}" y="${height/2}" font-family="system-ui, sans-serif" font-size="${width * 0.3}" font-weight="700" fill="#0F766E" text-anchor="middle" dominant-baseline="central">${initial}</text>
		<text x="${width/2}" y="${height * 0.85}" font-family="system-ui, sans-serif" font-size="${width * 0.06}" fill="#6b7280" text-anchor="middle">Robot éducatif</text>
	</svg>`;
	
	return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}
