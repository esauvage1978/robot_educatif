/**
 * Importe les articles listés dans post-sitemap.xml (robot-educatif.info)
 * via l’API REST WordPress, en créant un fichier .md par slug d’URL.
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'src', 'content', 'blog');

const BASE = 'https://robot-educatif.info';
const SITEMAP_POSTS = `${BASE}/post-sitemap.xml`;

const turndown = new TurndownService({
	headingStyle: 'atx',
	codeBlockStyle: 'fenced',
	emDelimiter: '*',
});
gfm(turndown);

function stripTags(html) {
	if (!html) return '';
	const $ = cheerio.load(html, { decodeEntities: true });
	return $.root().text().replace(/\s+/g, ' ').trim();
}

function prepareHtml(html) {
	const $ = cheerio.load(html, { decodeEntities: false });
	$('#ez-toc-container, .ez-toc-container').remove();
	$('script, style').remove();
	return $.root().html() ?? '';
}

function rewriteSiteLinks(markdown, slugs) {
	let out = markdown;
	const sorted = [...slugs].sort((a, b) => b.length - a.length);
	for (const slug of sorted) {
		const esc = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		out = out.replace(new RegExp(`https?://robot-educatif\\.info/${esc}/`, 'g'), `/${slug}/`);
	}
	// Ne pas remplacer l’origine globalement : les images restent sur robot-educatif.info/wp-content/…
	return out;
}

async function fetchText(url) {
	const res = await fetch(url, { headers: { 'User-Agent': 'robot-educatif-import/1.0' } });
	if (!res.ok) throw new Error(`${res.status} ${url}`);
	return res.text();
}

function parsePostSlugs(xml) {
	const slugs = [];
	const re = /<loc>\s*(https:\/\/robot-educatif\.info\/[^<]+)\s*<\/loc>/gi;
	let m;
	while ((m = re.exec(xml)) !== null) {
		const url = m[1].replace(/\/+$/, '');
		const pathname = new URL(url).pathname.replace(/^\/+|\/+$/g, '');
		if (!pathname) continue;
		slugs.push(pathname);
	}
	return [...new Set(slugs)];
}

async function fetchPost(slug) {
	const url = `${BASE}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed=1`;
	const res = await fetch(url, { headers: { 'User-Agent': 'robot-educatif-import/1.0' } });
	if (!res.ok) throw new Error(`${res.status} ${url}`);
	const data = await res.json();
	return Array.isArray(data) && data[0] ? data[0] : null;
}

function toFrontmatter(post, description) {
	const pub = post.date.slice(0, 10);
	const mod = post.modified.slice(0, 10);
	const lines = ['---'];
	lines.push(`title: ${JSON.stringify(stripTags(post.title.rendered))}`);
	lines.push(`description: ${JSON.stringify(description)}`);
	lines.push(`pubDate: ${JSON.stringify(pub)}`);
	if (mod !== pub) lines.push(`updatedDate: ${JSON.stringify(mod)}`);
	lines.push('---', '');
	return lines.join('\n');
}

async function main() {
	const xml = await fetchText(SITEMAP_POSTS);
	const slugs = parsePostSlugs(xml);
	if (!slugs.length) {
		console.error('Aucun slug trouvé dans le sitemap.');
		process.exit(1);
	}

	fs.mkdirSync(BLOG_DIR, { recursive: true });
	for (const f of fs.readdirSync(BLOG_DIR)) {
		if (f.endsWith('.md') || f.endsWith('.mdx')) {
			fs.unlinkSync(path.join(BLOG_DIR, f));
		}
	}

	let ok = 0;
	for (const slug of slugs) {
		const post = await fetchPost(slug);
		if (!post) {
			console.warn(`Absent de l’API : ${slug}`);
			continue;
		}
		const apiSlug = post.slug;
		if (apiSlug !== slug) {
			console.warn(`Slug API différent (${apiSlug} vs ${slug}), fichier : ${apiSlug}.md`);
		}
		const fileSlug = apiSlug;
		const raw = post.content?.rendered ?? '';
		const cleaned = prepareHtml(raw);
		let md = turndown.turndown(cleaned).trim();
		md = rewriteSiteLinks(md, slugs);

		let description = stripTags(post.excerpt?.rendered ?? '');
		if (!description) description = stripTags(raw).slice(0, 220).trim() + '…';

		const fm = toFrontmatter(post, description);
		const outPath = path.join(BLOG_DIR, `${fileSlug}.md`);
		fs.writeFileSync(outPath, `${fm}\n${md}\n`, 'utf8');
		ok++;
		console.log(`OK ${fileSlug}`);
		await new Promise((r) => setTimeout(r, 150));
	}

	console.log(`\n${ok}/${slugs.length} articles écrits dans src/content/blog/`);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
