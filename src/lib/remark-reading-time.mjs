/** Ajoute `minutesRead` au frontmatter (200 mots par minute). */
function plain(node) {
	if (!node) return '';
	if (node.type === 'text' || node.type === 'inlineCode') return node.value || '';
	if (node.type === 'code') return '';
	if (node.type === 'html' && typeof node.value === 'string') return node.value.replace(/<[^>]+>/g, ' ');
	if (!node.children) return '';
	return node.children.map(plain).join(' ');
}

export function remarkReadingTime() {
	return (tree, file) => {
		const words = plain(tree)
			.trim()
			.split(/\s+/)
			.filter((word) => word.length > 0).length;
		const minutes = Math.max(1, Math.round(words / 200));
		file.data.astro ??= {};
		file.data.astro.frontmatter ??= {};
		file.data.astro.frontmatter.minutesRead = minutes;
	};
}
