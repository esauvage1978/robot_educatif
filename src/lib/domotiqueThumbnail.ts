/**
 * Helper pour charger les thumbnails générés des articles domotique
 */
import type { ImageMetadata } from 'astro';

// Map slug → thumbnail dynamique
const thumbnails = import.meta.glob<{ default: ImageMetadata }>(
	'/public/images/blog-thumbnails/*.png',
	{ eager: false }
);

export async function getDomotiqueThumbnail(slug: string): Promise<ImageMetadata | null> {
	const key = `/public/images/blog-thumbnails/${slug}.png`;
	const loader = thumbnails[key];
	
	if (!loader) {
		console.warn(`[domotiqueThumbnail] No thumbnail found for slug: ${slug}`);
		return null;
	}
	
	try {
		const module = await loader();
		return module.default;
	} catch (e) {
		console.error(`[domotiqueThumbnail] Failed to load thumbnail for ${slug}:`, e);
		return null;
	}
}

// Thumbnail du hub domotique (créé spécialement)
export async function getDomotiqueHubThumbnail(): Promise<ImageMetadata | null> {
	const key = '/public/images/blog-thumbnails/domotique-hub.png';
	const loader = thumbnails[key];
	
	if (!loader) {
		return null;
	}
	
	try {
		const module = await loader();
		return module.default;
	} catch {
		return null;
	}
}

// Map product ID → photo
export const PRODUCT_PHOTOS: Record<string, string> = {
	// Zigbee dongles
	'sonoff-zbdongle-e': '/images/products/sonoff-zbdongle-e.webp',
	'sonoff-dongle-lite-mg21': '/images/products/sonoff-dongle-lite-mg21.webp',
	'home-assistant-connect-zbt-2': '/images/products/sonoff-zbdongle-e.webp', // fallback
	
	// Home Assistant hardware
	'home-assistant-green': '/images/products/home-assistant-green.webp',
	'raspberry-pi-5': '/images/products/raspberry-pi-5.webp',
	'raspberry-pi-5-4gb': '/images/products/raspberry-pi-5-4gb.webp',
	'raspberry-pi-5-8gb': '/images/products/raspberry-pi-5-8gb.webp',
	
	// Capteurs Zigbee
	'sonoff-snzb-02d': '/images/products/sonoff-snzb-02d.webp',
	'sonoff-snzb-03p': '/images/products/sonoff-snzb-03p.webp',
	'sonoff-snzb-04p': '/images/products/sonoff-snzb-04p.webp',
	'aqara-door-window-p2': '/images/products/aqara-door-window-p2.webp',
	'aqara-presence-fp2': '/images/products/aqara-presence-fp2.webp',
	
	// Prises connectées
	'nous-a1z': '/images/products/nous-a1z.webp',
	'tapo-p110': '/images/products/tapo-p110.webp',
	
	// ESP32
	'esp32-c6-devkitc': '/images/products/esp32-c6-devkitc.webp',
	'xiao-esp32c6': '/images/products/esp32-c6-devkitc.webp', // fallback
	
	// Robots aspirateurs
	'roborock-q7-m5': '/images/products/roborock-q7-m5.webp',
	'roborock-qrevo-s5v': '/images/products/roborock-qrevo-s5v.webp',
	'dreame-l10s-ultra-gen2': '/images/products/dreame-l10s-ultra-gen2.webp',
	
	// Autres
	'netatmo-thermostat': '/images/products/netatmo-thermostat.webp',
	'tapo-c200': '/images/products/tapo-c200.webp',
	'tapo-c220': '/images/products/tapo-c220.webp',
	'tapo-l530e': '/images/products/tapo-l530e.webp',
	'm5stack-atom-echo': '/images/products/m5stack-atom-echo.webp',
};

export function getProductPhoto(productId: string): string | null {
	return PRODUCT_PHOTOS[productId] || null;
}
