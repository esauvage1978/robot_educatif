/**
 * Après build : vérifie que chaque HTML dans dist/ a exactement un lien canonical
 * cohérent avec l'URL publique dérivée du chemin du fichier.
 * Prévu pour la prod (`npm run build`, base = /). Un `build:wamp` change les chemins
 * URL : lancer ce script uniquement sur le build production.
 */
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
const SITE = 'https://robot-educatif.info';

/** @param {string} htmlPath absolute path to .html file */
function expectedCanonicalHref(htmlPath) {
	const rel = path.relative(distDir, htmlPath).split(path.sep).join('/');
	if (rel === 'index.html') return `${SITE}/`;
	if (rel === '404.html') return `${SITE}/404/`;
	if (rel.endsWith('/index.html')) {
		const dir = rel.slice(0, -'/index.html'.length);
		return `${SITE}/${dir}/`;
	}
	// Fichier .html seul à la racine (hors 404 déjà traité)
	const base = rel.replace(/\.html$/i, '');
	return `${SITE}/${base}/`;
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

function normalizeUrl(u) {
	try {
		const x = new URL(u);
		x.hash = '';
		return x.href;
	} catch {
		return null;
	}
}

async function main() {
	const files = await walkHtmlFiles(distDir);
	const errors = [];

	for (const htmlPath of files) {
		const raw = await readFile(htmlPath, 'utf8');
		const matches = [...raw.matchAll(/<link\s+[^>]*rel=["']canonical["'][^>]*>/gi)];
		const hrefMatches = [...raw.matchAll(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/gi)];
		const hrefMatches2 = [...raw.matchAll(/<link[^>]+href=["']([^"']+)["'][^>]*rel=["']canonical["']/gi)];
		const hrefs = [...hrefMatches.map((m) => m[1]), ...hrefMatches2.map((m) => m[1])];

		if (hrefs.length === 0) {
			errors.push({ htmlPath, msg: 'aucune balise canonical trouvée' });
			continue;
		}
		if (hrefs.length > 1 && new Set(hrefs).size > 1) {
			errors.push({ htmlPath, msg: `plusieurs href canonical différents: ${hrefs.join(' | ')}` });
			continue;
		}
		const href = hrefs[0];
		const expected = expectedCanonicalHref(htmlPath);
		const nGot = normalizeUrl(href);
		const nExp = normalizeUrl(expected);
		if (nGot !== nExp) {
			errors.push({
				htmlPath: path.relative(distDir, htmlPath),
				msg: `canonical = ${href}, attendu = ${expected}`,
			});
		}

		// Cohérence og:* (même URL que canonical quand présentes)
		const ogUrl = raw.match(/property=["']og:url["']\s+content=["']([^"']+)["']/i)?.[1];
		if (ogUrl && normalizeUrl(ogUrl) !== nGot) {
			errors.push({
				htmlPath: path.relative(distDir, htmlPath),
				msg: `og:url (${ogUrl}) ≠ canonical (${href})`,
			});
		}
	}

	if (errors.length) {
		console.error(`[verify-canonical-html] ${errors.length} problème(s) :`);
		for (const e of errors) {
			console.error(`  - ${e.htmlPath}: ${e.msg}`);
		}
		process.exit(1);
	}
	console.log(
		`[verify-canonical-html] OK — ${files.length} fichier(s), canonical + og:url alignés avec le chemin du fichier.`,
	);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
