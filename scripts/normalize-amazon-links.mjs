/**
 * Ajoute ?tag= ou &tag= (AMAZON_AFFILIATE_TAG) à tous les liens Amazon / amzn.to dans les .md du blog.
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const BLOG = path.join(ROOT, 'src', 'content', 'blog');
const constsTs = fs.readFileSync(path.join(ROOT, 'src', 'consts.ts'), 'utf8');
const tagMatch = constsTs.match(/AMAZON_AFFILIATE_TAG\s*=\s*['"]([^'"]+)['"]/);
const TAG = tagMatch?.[1] ?? 'manuso06-21';

function hasTag(u) {
	return /[?&]tag=/.test(u);
}

function addTag(u) {
	if (hasTag(u)) return u;
	return u.includes('?') ? `${u}&tag=${TAG}` : `${u}?tag=${TAG}`;
}

function normalizeMarkdown(text) {
	let out = text;
	// amzn.to/xxxxx — évite de matcher une URL déjà suivie de ?tag=
	out = out.replace(/https:\/\/amzn\.to\/[A-Za-z0-9]+/g, (url) => addTag(url));
	// www.amazon.fr/...
	out = out.replace(/https:\/\/www\.amazon\.fr\/[a-zA-Z0-9/?&=%+._~-]*/g, (url) => {
		if (!hasTag(url)) return addTag(url);
		return url;
	});
	return out;
}

for (const name of fs.readdirSync(BLOG)) {
	if (!name.endsWith('.md') && !name.endsWith('.mdx')) continue;
	const fp = path.join(BLOG, name);
	const before = fs.readFileSync(fp, 'utf8');
	const after = normalizeMarkdown(before);
	if (after !== before) {
		fs.writeFileSync(fp, after, 'utf8');
		console.log('mis à jour:', name);
	}
}
