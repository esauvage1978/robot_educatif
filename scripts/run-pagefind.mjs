/**
 * Indexe le dossier `dist/` avec Pagefind après `astro build`.
 * Contenu traité comme français (`--force-language fr`).
 *
 * Respecte ASTRO_BASE : le bundle est servi sous `${BASE_URL}pagefind/` ;
 * la page `recherche.astro` passe `bundlePath` au Pagefind UI.
 *
 * Déploiement : copier tout le contenu de `dist/` sur le serveur, y compris le dossier
 * `dist/pagefind/` (sinon la page Recherche ne charge pas l’UI).
 */
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const pagefindCli = path.join(root, 'node_modules', 'pagefind', 'lib', 'runner', 'bin.cjs');

const run = spawnSync(process.execPath, [pagefindCli, '--site', 'dist', '--force-language', 'fr'], {
	cwd: root,
	stdio: 'inherit',
});

if (run.status !== 0) {
	process.exit(run.status ?? 1);
}