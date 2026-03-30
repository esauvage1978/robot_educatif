/**
 * Sans sauvegarde des fichiers wp-content/uploads, les chemins sous public/ sont illusoires.
 * Ce script pointe les médias vers l’URL canonique WordPress (même arborescence YYYY/MM).
 * Si vous réhébergez les fichiers ailleurs, remplacez la base ci-dessous ou refaites un remplacement global.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const REPLACEMENTS = [
	['/images/blog/wp-import/2020-04/', 'https://robot-educatif.info/wp-content/uploads/2020/04/'],
	['/images/blog/wp-import/2020-05/', 'https://robot-educatif.info/wp-content/uploads/2020/05/'],
	['/images/blog/wp-import/2023-04/', 'https://robot-educatif.info/wp-content/uploads/2023/04/'],
	['/images/blog/wp-import/2023-05/', 'https://robot-educatif.info/wp-content/uploads/2023/05/'],
];

function walkMarkdownFiles(dir, out = []) {
	for (const name of fs.readdirSync(dir)) {
		const p = path.join(dir, name);
		const st = fs.statSync(p);
		if (st.isDirectory()) walkMarkdownFiles(p, out);
		else if (name.endsWith('.md') || name.endsWith('.mdx')) out.push(p);
	}
	return out;
}

function migrateFile(filePath) {
	let s = fs.readFileSync(filePath, 'utf8');
	const before = s;
	for (const [from, to] of REPLACEMENTS) {
		s = s.split(from).join(to);
	}
	if (s !== before) {
		fs.writeFileSync(filePath, s, 'utf8');
		return true;
	}
	return false;
}

const blogDir = path.join(root, 'src', 'content', 'blog');
const files = walkMarkdownFiles(blogDir);
let n = 0;
for (const f of files) {
	if (migrateFile(f)) {
		n++;
		console.log('mis à jour:', path.relative(root, f));
	}
}

console.log(`[migrate-wp-media-urls] ${n} fichier(s) modifié(s).`);
