/**
 * Rehype : extrait les questions/réponses d'une FAQ réellement visible dans l'article
 * (section introduite par un titre h2 « FAQ », « Mini-FAQ », « Questions fréquentes »…)
 * et les expose dans `file.data.astro.frontmatter.faqSchema` (remarkPluginFrontmatter),
 * pour que le gabarit émette un JSON-LD FAQPage fidèle au contenu affiché.
 *
 * Deux formats reconnus dans la section (jusqu'au h2 suivant) :
 *  - un titre h3 terminé par « ? » suivi de paragraphes / listes (réponse) ;
 *  - un paragraphe commençant par un texte en gras terminé par « ? » (question),
 *    la suite du paragraphe et les blocs suivants formant la réponse.
 * Rien n'est inventé : si aucune paire question/réponse n'est trouvée, rien n'est émis.
 */
const FAQ_HEADING = /\b(faq|questions?\s+fr[ée]quentes|foire\s+aux\s+questions)\b/i;

function text(node) {
	if (!node) return '';
	if (node.type === 'text') return node.value;
	if (node.type === 'element' && node.tagName === 'br') return ' ';
	if (Array.isArray(node.children)) return node.children.map(text).join('');
	return '';
}
const clean = (s) => s.replace(/\s+/g, ' ').trim();
const isEl = (n, tag) => n && n.type === 'element' && n.tagName === tag;
const isBlock = (n) => n && (n.type === 'element' || n.type === 'mdxJsxFlowElement');

function boldQuestion(p) {
	if (!isEl(p, 'p')) return null;
	const kids = (p.children || []).filter((c) => !(c.type === 'text' && !c.value.trim()));
	const first = kids[0];
	if (!isEl(first, 'strong') && !isEl(first, 'b')) return null;
	const q = clean(text(first));
	if (!q.endsWith('?')) return null;
	const idx = p.children.indexOf(first);
	const rest = clean(p.children.slice(idx + 1).map(text).join(''));
	return { q, rest };
}

export function rehypeFaqSchema() {
	return (tree, file) => {
		const nodes = tree.children || [];
		const items = [];
		for (let i = 0; i < nodes.length; i++) {
			const h = nodes[i];
			if (!isEl(h, 'h2') || !FAQ_HEADING.test(text(h))) continue;
			let cur = null;
			const flush = () => {
				if (cur) {
					const a = clean(cur.a.join(' '));
					if (cur.q && a) items.push({ question: cur.q, answer: a });
				}
				cur = null;
			};
			let j = i + 1;
			for (; j < nodes.length && !isEl(nodes[j], 'h2'); j++) {
				const n = nodes[j];
				if (!isBlock(n)) continue;
				if (isEl(n, 'h3') || isEl(n, 'h4')) {
					flush();
					const q = clean(text(n));
					if (q.endsWith('?')) cur = { q, a: [] };
					continue;
				}
				const bq = boldQuestion(n);
				if (bq) {
					flush();
					cur = { q: bq.q, a: bq.rest ? [bq.rest] : [] };
					continue;
				}
				if (cur && (isEl(n, 'p') || isEl(n, 'ul') || isEl(n, 'ol') || isEl(n, 'blockquote'))) {
					const t = clean(text(n));
					if (t) cur.a.push(t);
				}
			}
			flush();
			i = j - 1;
		}
		if (items.length > 0) {
			file.data.astro = file.data.astro || {};
			file.data.astro.frontmatter = file.data.astro.frontmatter || {};
			file.data.astro.frontmatter.faqSchema = items;
		}
	};
}
