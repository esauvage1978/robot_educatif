#!/usr/bin/env node
/** W06 : sommaires — retirer FAQ, nettoyer numérotation en double dans les libellés. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src');

const FAQ_HREF =
	/<li>\s*<a\s+href=(["'])#(?:faq|questions-frequentes|domande-frequenti|preguntas-frecuentes|haufige-fragen)\1[^>]*>[\s\S]*?<\/a>\s*<\/li>\s*/gi;

function cleanLinkLabel(label) {
	return label
		.replace(/^\s*\d+\.\s*\d+\.\s*/, '')
		.replace(/^\s*\d+[\.\)\]]\s*/, '')
		.replace(/^\s*\d+\s*[-–—]\s*/, '')
		.trim();
}

function fixTocBlock(block) {
	let b = block.replace(FAQ_HREF, '');
	b = b.replace(
		/<a\s+href=(["'])(#[^"']+)\1([^>]*)>([^<]*)<\/a>/gi,
		(_m, q, hash, rest, label) => {
			const cleaned = cleanLinkLabel(label);
			return `<a href=${q}${hash}${q}${rest}>${cleaned}</a>`;
		},
	);
	return b;
}

function walk(dir, acc = []) {
	for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
		const p = path.join(dir, e.name);
		if (e.isDirectory()) walk(p, acc);
		else if (/\.(md|mdx|astro)$/i.test(e.name)) acc.push(p);
	}
	return acc;
}

let files = 0;
for (const file of walk(SRC)) {
	let text = fs.readFileSync(file, 'utf8');
	if (!text.includes('article-toc')) continue;
	const before = text;
	text = text.replace(/<div class="article-toc"[\s\S]*?<\/div>/gi, (block) => fixTocBlock(block));
	if (text !== before) {
		fs.writeFileSync(file, text, 'utf8');
		files++;
	}
}
console.log(`[fix-article-toc-w06] ${files} fichiers mis à jour`);