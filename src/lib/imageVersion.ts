/**
 * Ajoute un paramètre de version aux URLs d'images pour le cache
 * Format: /images/blog-thumbnails/slug.png?v=BUILD_TIME
 */

// Timestamp du build (constant pendant toute la build)
const BUILD_TIME = Date.now().toString(36);

/**
 * Ajoute ?v= à une URL d'image
 */
export function withImageVersion(url: string): string {
	if (!url) return url;
	
	// Ne versioner que les images locales
	if (url.startsWith('http://') || url.startsWith('https://')) {
		return url;
	}
	
	// Ajouter ?v= seulement aux images dans /images/
	if (url.includes('/images/')) {
		const separator = url.includes('?') ? '&' : '?';
		return `${url}${separator}v=${BUILD_TIME}`;
	}
	
	return url;
}

/**
 * Version spécifique pour les images Astro (ImageMetadata)
 */
export function getImageVersionParam(): string {
	return `v=${BUILD_TIME}`;
}
