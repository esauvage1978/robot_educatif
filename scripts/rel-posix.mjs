#!/usr/bin/env node
import path from 'node:path';

/** Séparateurs POSIX pour regex / startsWith / comparaisons de chemins URL. */
export function toPosixPath(p) {
	return String(p).replace(/\\/g, '/');
}

/** Chemin relatif base → cible, toujours en `/`. */
export function relPosix(baseDir, targetPath) {
	return toPosixPath(path.relative(baseDir, targetPath));
}