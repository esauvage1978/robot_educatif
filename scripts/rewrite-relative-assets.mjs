/**
 * Après `astro build`, réécrit les URLs absolues vers les assets statiques
 * (`/_astro/`, `/fonts/`, fichiers publics à la racine) en chemins **relatifs**
 * depuis chaque fichier HTML. Fonctionne en WAMP (sous-dossier) et en prod (racine),
 * avec ou sans `ASTRO_BASE` / `base` dans la config Astro.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');

function relativePrefixFromHtmlFile(htmlPath) {
	const rel = path.relative(distDir, htmlPath);
	const dir = path.dirname(rel);
	const depth = dir === '.' ? 0 : dir.split(path.sep).filter(Boolean).length;
	if (depth === 0) return './';
	return '../'.repeat(depth);
}

/**
 * Remplace tout chemin absolu se terminant par /_astro/... par relBase + _astro/...
 */
function rewriteAstroPaths(html, relBase) {
	return html.replace(/(["'])(\/[^"']*?\/_astro\/)([^"']*)/g, (full, quote, _prefix, rest) => {
		if (full.includes('://')) return full;
		return `${quote}${relBase}_astro/${rest}`;
	});
}

function rewriteImagesPaths(html, relBase) {
	return html.replace(/(["'])(\/[^"']*?\/images\/)([^"']*)/g, (full, quote, _prefix, rest) => {
		if (full.includes('://')) return full;
		return `${quote}${relBase}images/${rest}`;
	});
}

function rewriteHtml(html, relBase) {
	let out = html;

	// /_astro/ (racine du domaine) — doit être avant la regex générale
	out = out.replaceAll(`"/_astro/`, `"${relBase}_astro/`);
	out = out.replaceAll(`'/_astro/`, `'${relBase}_astro/`);

	// /quelque/chose/_astro/ (ex. préfixe `base` Astro)
	out = rewriteAstroPaths(out, relBase);

	out = out.replaceAll(`"/fonts/`, `"${relBase}fonts/`);
	out = out.replaceAll(`'/fonts/`, `'${relBase}fonts/`);

	// /images/ (dossier public/) — préfixe base éventuel, puis chemins à la racine /images/
	out = rewriteImagesPaths(out, relBase);
	out = out.replaceAll(`"/images/`, `"${relBase}images/`);
	out = out.replaceAll(`'/images/`, `'${relBase}images/`);

	out = out.replaceAll(`"/capture/`, `"${relBase}capture/`);
	out = out.replaceAll(`'/capture/`, `'${relBase}capture/`);

	// Pagefind : ne pas réécrire (chemins absolus depuis la racine du site, voir recherche.astro).

	const rootPublic = [
		'/favicon.svg',
		'/favicon.png',
		'/favicon.ico',
		'/apple-touch-icon.png',
		'/hero-home.webp',
		'/sitemap-index.xml',
		'/robots.txt',
	];
	for (const rp of rootPublic) {
		const name = rp.slice(1);
		out = out.replaceAll(`"${rp}"`, `"${relBase}${name}"`);
		out = out.replaceAll(`'${rp}'`, `'${relBase}${name}'`);
	}

	out = out.replace(/srcset=(["'])([^"']+)\1/gi, (full, quote, value) => {
		const next = value
			.split(',')
			.map((part) => {
				const t = part.trim();
				const sp = t.lastIndexOf(' ');
				const url = sp === -1 ? t : t.slice(0, sp).trim();
				const rest = sp === -1 ? '' : t.slice(sp);
				if (!url.startsWith('/') || url.startsWith('//')) return t;
				if (url.includes('/_astro/')) {
					const after = url.split('/_astro/')[1];
					return `${relBase}_astro/${after}${rest}`;
				}
				if (url.includes('/images/')) {
					const after = url.split('/images/')[1];
					return `${relBase}images/${after}${rest}`;
				}
				if (url.includes('/capture/')) {
					const after = url.split('/capture/')[1];
					return `${relBase}capture/${after}${rest}`;
				}
				if (url.includes('/programmes/')) {
					const after = url.split('/programmes/')[1];
					return `${relBase}programmes/${after}${rest}`;
				}
				return t;
			})
			.join(', ');
		return `srcset=${quote}${next}${quote}`;
	});

	return out;
}

async function walkHtmlFiles(dir) {
	/** @type {string[]} */
	const out = [];
	const entries = await readdir(dir, { withFileTypes: true });
	for (const ent of entries) {
		const full = path.join(dir, ent.name);
		if (ent.isDirectory()) out.push(...(await walkHtmlFiles(full)));
		else if (ent.isFile() && ent.name.endsWith('.html')) out.push(full);
	}
	return out;
}

async function main() {
	const files = await walkHtmlFiles(distDir);
	let changed = 0;
	for (const htmlPath of files) {
		const relBase = relativePrefixFromHtmlFile(htmlPath);
		const before = await readFile(htmlPath, 'utf8');
		const after = rewriteHtml(before, relBase);
		if (after !== before) {
			await writeFile(htmlPath, after, 'utf8');
			changed++;
		}
	}
	console.log(`[rewrite-relative-assets] ${changed} fichier(s) HTML mis à jour sur ${files.length}.`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
