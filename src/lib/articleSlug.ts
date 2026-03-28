/**
 * Identifiant d’URL d’un article à partir de `post.id` (Content Layer).
 * Sur Windows, `id` peut contenir des backslashes ou un chemin relatif : on ne garde que le nom de fichier.
 */
export function articleSlugFromId(id: string): string {
	const forward = id.replace(/\\/g, '/');
	const base = forward.split('/').pop() ?? forward;
	return base.replace(/\.mdx?$/i, '').replace(/^\/+|\/+$/g, '');
}
