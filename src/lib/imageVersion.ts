/**
 * Ajoute un paramètre de version aux URLs d'images pour le cache
 * Format: /images/blog-thumbnails/slug.png?v=HASH_8CHAR
 * Le hash est calculé sur le contenu du fichier (stable entre builds)
 */

import { createHash } from 'node:crypto';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

// Cache des hashs en mémoire pour éviter de relire les fichiers
const hashCache = new Map<string, string>();

/**
 * Calcule le hash MD5 court (8 caractères) du contenu d'un fichier
 */
function getFileHash(filePath: string): string {
	if (hashCache.has(filePath)) {
		return hashCache.get(filePath)!;
	}
	
	try {
		const publicPath = join(process.cwd(), 'public', filePath.replace(/^\//, ''));
		
		if (!existsSync(publicPath)) {
			// Fichier inexistant, utiliser un hash par défaut
			return '00000000';
		}
		
		const content = readFileSync(publicPath);
		const hash = createHash('md5').update(content).digest('hex').substring(0, 8);
		hashCache.set(filePath, hash);
		return hash;
	} catch (err) {
		return '00000000';
	}
}

/**
 * Ajoute ?v=HASH à une URL d'image
 */
export function withImageVersion(url: string): string {
	if (!url) return url;
	
	// Ne versioner que les images locales
	if (url.startsWith('http://') || url.startsWith('https://')) {
		return url;
	}
	
	// Ajouter ?v= seulement aux images dans /images/
	if (url.includes('/images/')) {
		const hash = getFileHash(url);
		const separator = url.includes('?') ? '&' : '?';
		return `${url}${separator}v=${hash}`;
	}
	
	return url;
}

/**
 * Version spécifique pour les images Astro (ImageMetadata)
 */
export function getImageVersionParam(url: string): string {
	const hash = getFileHash(url);
	return `v=${hash}`;
}
