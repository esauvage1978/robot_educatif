/**
 * Affiche sur stdout les lignes de checklist pour docs/blog-articles-strategie-et-suivi.md
 * (liste alphabétique des .md du blog + P1/P2/P3). Ne modifie aucun fichier.
 *
 * Usage : node scripts/gen-blog-strategie-checklist.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');

const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md')).sort();

const p1 = new Set([
	'quel-robot-educatif-autour-de-200-euros-guide-2026.md',
	'quel-robot-educatif-entre-200-et-500-euros-guide-2026.md',
	'quel-robot-educatif-entre-500-et-1000-euros-guide-2026.md',
	'quel-robot-educatif-plus-de-1000-euros-guide-expert-2026.md',
	'quel-robot-educatif-choisir-2026.md',
	'quel-robot-acheter-enfant-5-ans-guide-achat.md',
	'quel-robot-acheter-enfant-8-ans-guide-achat.md',
	'quel-robot-acheter-enfant-10-ans-guide-achat.md',
	'quel-robot-acheter-enfant-12-ans-guide-achat.md',
	'meilleur-robot-programmable-enfant-2026.md',
	'raspberry-pi-3-vs-4-vs-5-comparatif-2026.md',
	'raspberry-pi-4-quelle-version-memoire-acheter.md',
	'raspberry-pi-5-quelle-version-memoire-acheter.md',
	'raspberry-pi-ou-kit-robot-ado-guide.md',
	'robot-educatif-pas-cher-compromis.md',
	'robot-educatif-sans-ecran-guide.md',
	'idees-cadeaux-robotique-noel-rentree-anniversaire.md',
]);

const p2Prefixes = [
	'mbot-vs',
	'mbot2-vs',
	'mbot2-de',
	'mbot-mon',
	'mbot-avis',
	'robot-educatif-codey',
	'robot-educatif-eilik',
	'accessoires-mbot',
	'programmation-enfant',
	'scratch-ecole',
	'logiciel-mblock',
	'installer-mblock',
	'sinscrire-sur-mblock',
	'decouvrez-makeblock',
	'le-robot-tale',
	'matatalab',
	'mblock-bluetooth',
	'installer-les-blocs',
];

function priority(f) {
	if (p1.has(f)) return 'P1';
	if (p2Prefixes.some((p) => f.startsWith(p))) return 'P2';
	if (
		/^python-|^projet-|^c-arduino-|^activite-|^serie-capteur|^scratch-creer|^mon-premier|^premier-pas|^deballage|^idees-projets-mbot|^python-mini/.test(
			f,
		)
	)
		return 'P3';
	return 'P2';
}

const actions = {
	P1: 'Aligner réf. §1.2 docs/blog-articles-strategie-et-suivi.md',
	P2: 'Meta + description ; sommaire si >5 sections ; FAQ+schema si Q/R ; CTAs si pertinent ; ids stables ; maillage',
	P3: 'Meta ; pas de ** dans HTML ; liens série/hub ; sommaire si très long',
};

for (const f of files) {
	const p = priority(f);
	const tick = f === 'quel-robot-educatif-entre-500-et-1000-euros-guide-2026.md' ? 'x' : ' ';
	console.log(`- [${tick}] \`${f}\` — **${p}** — ${actions[p]}`);
}
