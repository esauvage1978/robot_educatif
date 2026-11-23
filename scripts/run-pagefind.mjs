/**
 * Indexe le dossier `dist/` avec Pagefind (après astro build + miroir UK/CA).
 * Langues détectées via `<html lang>` — un sous-index par langue, sans --force-language.
 *
 * Respecte ASTRO_BASE : le bundle est servi sous `${BASE_URL}pagefind/`.
 * Déploiement : copier tout `dist/`, y compris `dist/pagefind/`.
 */
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const pagefindCli = path.join(root, 'node_modules', 'pagefind', 'lib', 'runner', 'bin.cjs');

const run = spawnSync(process.execPath, [pagefindCli, '--site', 'dist'], {
	cwd: root,
	stdio: 'inherit',
});

if (run.status !== 0) {
	process.exit(run.status ?? 1);
}