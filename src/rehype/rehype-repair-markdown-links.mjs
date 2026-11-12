/**
 * Les liens Markdown écrits dans un bloc HTML (`<p>… [texte](/url/) …</p>`)
 * ne sont pas interprétés : ils s’affichent en texte brut.
 * Ce plugin les transforme en vrais `<a>` avant la suite du pipeline.
 *
 * Markdown (.md) : le HTML est encore un nœud `raw` (rehype-raw passe après).
 * MDX : rehype-raw a déjà découpé le HTML, le lien est dans un nœud texte.
 */
import { normalizeAstroBase } from '../lib/astroBase.mjs';

const SKIP_TAGS = new Set(['code', 'pre', 'script', 'style', 'a', 'textarea', 'svg']);
const LINK_RE = /(?<![!\\])\[([^\]\n]{1,400})\]\(\s*<?([^>\s)]+)>?(?:\s+["'][^"']*["'])?\s*\)/g;
const SKIP_BLOCK_RE = /<(code|pre|script|style|a|textarea)\b[^>]*>[\s\S]*?<\/\1>/gi;

function basePrefix() {
	const base = normalizeAstroBase(process.env.ASTRO_BASE);
	if (!base || base === '/') return '';
	return base.replace(/\/$/, '');
}

function withBase(href) {
	const prefix = basePrefix();
	if (!prefix || !href.startsWith('/') || href.startsWith('//')) return href;
	if (href.startsWith(`${prefix}/`)) return href;
	return `${prefix}${href}`;
}

function acceptableHref(href) {
	if (!href) return false;
	const h = href.trim();
	if (!h || /[\s<>"]/.test(h)) return false;
	const lower = h.toLowerCase();
	if (lower.startsWith('javascript:') || lower.startsWith('data:')) return false;
	return (
		h.startsWith('/') ||
		h.startsWith('#') ||
		h.startsWith('./') ||
		h.startsWith('../') ||
		h.startsWith('//') ||
		lower.startsWith('http://') ||
		lower.startsWith('https://') ||
		lower.startsWith('mailto:')
	);
}

function isAffiliate(href) {
	const h = href.toLowerCase();
	return h.includes('amazon.') || h.includes('amzn.to') || h.includes('awin1.com');
}

function escText(value) {
	return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escAttr(value) {
	return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function labelToHtml(label) {
	const re = /\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`/g;
	let html = '';
	let last = 0;
	for (const match of label.matchAll(re)) {
		html += escText(label.slice(last, match.index));
		if (match[1] != null) html += `<strong>${escText(match[1])}</strong>`;
		else if (match[2] != null) html += `<em>${escText(match[2])}</em>`;
		else html += `<code>${escText(match[3])}</code>`;
		last = match.index + match[0].length;
	}
	html += escText(label.slice(last));
	return html;
}

function labelToHast(label) {
	const re = /\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`/g;
	const children = [];
	let last = 0;
	const pushText = (value) => {
		if (value) children.push({ type: 'text', value });
	};
	for (const match of label.matchAll(re)) {
		pushText(label.slice(last, match.index));
		if (match[1] != null) {
			children.push({ type: 'element', tagName: 'strong', properties: {}, children: [{ type: 'text', value: match[1] }] });
		} else if (match[2] != null) {
			children.push({ type: 'element', tagName: 'em', properties: {}, children: [{ type: 'text', value: match[2] }] });
		} else {
			children.push({ type: 'element', tagName: 'code', properties: {}, children: [{ type: 'text', value: match[3] }] });
		}
		last = match.index + match[0].length;
	}
	pushText(label.slice(last));
	return children.length ? children : [{ type: 'text', value: label }];
}

function anchorHtml(label, href) {
	const url = withBase(href);
	const affiliate = isAffiliate(url);
	const rel = affiliate ? ' rel="noopener nofollow sponsored"' : '';
	const target = affiliate ? ' target="_blank"' : '';
	return `<a href="${escAttr(url)}"${target}${rel}>${labelToHtml(label)}</a>`;
}

function anchorElement(label, href) {
	const url = withBase(href);
	const properties = { href: url };
	if (isAffiliate(url)) {
		properties.target = '_blank';
		properties.rel = 'noopener nofollow sponsored';
	}
	return {
		type: 'element',
		tagName: 'a',
		properties,
		children: labelToHast(label),
	};
}

function skippedRanges(html) {
	const ranges = [];
	SKIP_BLOCK_RE.lastIndex = 0;
	let match;
	while ((match = SKIP_BLOCK_RE.exec(html))) {
		ranges.push([match.index, match.index + match[0].length]);
	}
	return ranges;
}

function inRanges(index, ranges) {
	return ranges.some(([start, end]) => index >= start && index < end);
}

export function repairHtmlString(html) {
	if (!html || !html.includes('](')) return null;
	const ranges = skippedRanges(html);
	LINK_RE.lastIndex = 0;
	let out = '';
	let last = 0;
	let found = false;
	for (const match of html.matchAll(LINK_RE)) {
		if (inRanges(match.index, ranges)) continue;
		const href = match[2];
		if (!acceptableHref(href)) continue;
		found = true;
		out += html.slice(last, match.index);
		out += anchorHtml(match[1], href);
		last = match.index + match[0].length;
	}
	if (!found) return null;
	out += html.slice(last);
	return out;
}

function textToNodes(value) {
	LINK_RE.lastIndex = 0;
	const nodes = [];
	let last = 0;
	let found = false;
	for (const match of value.matchAll(LINK_RE)) {
		const href = match[2];
		if (!acceptableHref(href)) continue;
		found = true;
		if (match.index > last) nodes.push({ type: 'text', value: value.slice(last, match.index) });
		nodes.push(anchorElement(match[1], href));
		last = match.index + match[0].length;
	}
	if (!found) return null;
	if (last < value.length) nodes.push({ type: 'text', value: value.slice(last) });
	return nodes;
}

function walk(node) {
	if (!node || typeof node !== 'object') return;
	if (node.type === 'raw' && typeof node.value === 'string') {
		const next = repairHtmlString(node.value);
		if (next != null) node.value = next;
		return;
	}
	if (node.type === 'element' && SKIP_TAGS.has(node.tagName)) return;
	const children = node.children;
	if (!Array.isArray(children)) return;
	for (let i = children.length - 1; i >= 0; i--) {
		const child = children[i];
		if (child?.type === 'text' && typeof child.value === 'string' && child.value.includes('](')) {
			const parts = textToNodes(child.value);
			if (parts) {
				children.splice(i, 1, ...parts);
				continue;
			}
		}
		walk(child);
	}
}

export function rehypeRepairMarkdownLinks() {
	return (tree) => {
		walk(tree);
	};
}
