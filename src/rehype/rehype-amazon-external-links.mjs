/**
 * Rehype : ouvre les liens Amazon (amazon.*, amzn.to) dans un nouvel onglet avec rel sécurisé + sponsored.
 */
function walk(node, fn) {
	if (!node || typeof node !== 'object') return;
	fn(node);
	const children = node.children;
	if (Array.isArray(children)) {
		for (const child of children) walk(child, fn);
	}
}

function isAmazonHref(href) {
	if (typeof href !== 'string') return false;
	const h = href.toLowerCase();
	return h.includes('amazon.') || h.includes('amzn.to');
}

export function rehypeAmazonExternalLinks() {
	return (tree) => {
		walk(tree, (node) => {
			if (node.type !== 'element' || node.tagName !== 'a') return;
			const href = node.properties?.href;
			if (!isAmazonHref(href)) return;
			node.properties = node.properties || {};
			node.properties.target = '_blank';
			const relParts = ['noopener', 'noreferrer', 'sponsored'];
			const rel = node.properties.rel;
			if (Array.isArray(rel)) {
				node.properties.rel = [...new Set([...rel.map(String), ...relParts])];
			} else if (typeof rel === 'string' && rel.trim()) {
				node.properties.rel = [...new Set([...rel.trim().split(/\s+/), ...relParts])].join(' ');
			} else {
				node.properties.rel = relParts.join(' ');
			}
		});
	};
}
