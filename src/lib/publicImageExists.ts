import { existsSync } from 'node:fs';
import { join } from 'node:path';

/** Vérifie qu’un fichier existe sous public/ (chemin absolu du site, ex. /images/products/mbot.webp). */
export function publicImageExists(pathname: string): boolean {
	const clean = pathname.split('?')[0].replace(/^\//, '');
	return existsSync(join(process.cwd(), 'public', clean));
}

const REJECT_PREFIXES = [
	'/images/illustrations/',
	'/images/blog-thumbnails/',
	'/_astro/',
];
const REJECT_EXT = /\.svg(?:\?|#|$)/i;

/** Photo produit ou réelle acceptable pour og:image (pas SVG, vignette générée, illustration IA). */
export function isRealProductPhotoPath(path: string | undefined | null): path is string {
	if (!path || typeof path !== 'string') return false;
	const bare = path.split('?')[0];
	if (bare.includes('blog-placeholder')) return false;
	if (REJECT_EXT.test(bare)) return false;
	if (REJECT_PREFIXES.some((p) => bare.startsWith(p))) return false;
	if (!bare.startsWith('/')) return false;
	return publicImageExists(bare);
}