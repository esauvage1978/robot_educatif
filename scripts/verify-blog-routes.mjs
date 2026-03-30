/**
 * Après `astro build`, vérifie que chaque article `src/content/blog/*.md`
 * a bien une page `dist/<slug>/index.html` (évite les 404 silencieux si le slug diverge).
 * À lancer systématiquement après ajout / renommage d’articles.
 */
import { access, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const blogDir = join(root, 'src', 'content', 'blog');
const distDir = join(root, 'dist');

function slugFromFilename(name) {
	return name.replace(/\.mdx?$/i, '');
}

async function main() {
	let files;
	try {
		files = await readdir(blogDir);
	} catch (e) {
		console.error('[verify-blog-routes] Impossible de lire', blogDir, e);
		process.exit(1);
	}

	const mds = files.filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
	const missing = [];

	for (const f of mds) {
		const slug = slugFromFilename(f);
		const htmlPath = join(distDir, slug, 'index.html');
		try {
			await access(htmlPath);
		} catch {
			missing.push(slug);
		}
	}

	if (missing.length > 0) {
		console.error(
			`[verify-blog-routes] ÉCHEC : ${missing.length} article(s) sans dist/<slug>/index.html :`,
			missing.join(', '),
		);
		process.exit(1);
	}

	console.log(`[verify-blog-routes] OK — ${mds.length} article(s) présents dans dist/.`);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
