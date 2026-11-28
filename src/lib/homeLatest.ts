/** « Derniers guides » de l'accueil : tri chronologique, une série sur un même produit regroupée en dossier. */
export const SERIES_KEYS = ['osoyoo', 'gmktec', 'homey', 'eilik', 'matatalab', 'electrohobby', 'thymio', 'sphero', 'elegoo', 'freenove', 'sunfounder', 'creality'];
const GENERIC = new Set(['unboxing', 'test', 'prise', 'en', 'main', 'deballage', 'assemblage', 'branchement', 'utilisation', 'le', 'la', 'les', 'de', 'du', 'un', 'une', 'avis', 'agent', 'ia', 'faq', 'kit']);

export function seriesKey(slug: string): string | null {
	const tokens = slug.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
	for (const tok of tokens.slice(0, 4)) {
		if (GENERIC.has(tok)) continue;
		return SERIES_KEYS.includes(tok) ? tok : null;
	}
	return null;
}

export interface RawLatest { href: string; title: string; date: Date; img?: string | null; alt?: string; slug: string }

export function groupLatest(items: RawLatest[], limit = 4) {
	const sorted = [...items].sort((a, b) => b.date.valueOf() - a.date.valueOf());
	const out: any[] = [];
	const byKey = new Map<string, any>();
	for (const it of sorted) {
		const k = seriesKey(it.slug);
		if (k && byKey.has(k)) {
			const card = byKey.get(k);
			card.series.count += 1;
			if (card.series.others.length < 3) card.series.others.push({ href: it.href, title: it.title });
			continue;
		}
		if (out.length >= limit) continue;
		const card = { ...it, series: k ? { count: 1, others: [] as { href: string; title: string }[] } : undefined };
		if (k) byKey.set(k, card);
		out.push(card);
	}
	for (const c of out) if (c.series && c.series.count < 2) delete c.series;
	return out;
}
