/**
 * Ajoute heroImage dans le frontmatter des articles listés (idempotent).
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG = path.join(__dirname, '..', 'src', 'content', 'blog');

/** Slug fichier .md → chemin relatif depuis src/content/blog/ vers asset */
const HERO_BY_FILE = {
	'decouvrez-makeblock-cyberpi-une-carte-de-developpement-electronique-polyvalente.md':
		'../../assets/blog-heroes/hero-cyberpi.png',
	'mbot2-de-makeblock-le-robot-educatif-pour-apprendre-la-robotique.md':
		'../../assets/mbot2/mbot2-hero.jpg',
	'mbot-mon-premier-robot-educatif.md': '../../assets/mbot/mbot-hero.png',
	'mbot-vs-mbot2-comparaison-des-robots-educatifs-pour-enfants.md':
		'../../assets/blog-heroes/hero-mbot-vs.png',
	'matatalab-une-entreprise-innovante.md': '../../assets/tale-bot/tale-bot-pro-hero.webp',
	'le-robot-tale-bot-de-chez-matatalab-un-outil-educatif-pour-enfants.md':
		'../../assets/tale-bot/tale-bot-pro-hero.webp',
	'le-robot-tale-bot-de-chez-matatalab-questions-reponses.md':
		'../../assets/tale-bot/tale-bot-pro-hero.webp',
	'deballage-et-premier-pas-du-robot-tale-bot-de-chez-matatalab.md':
		'../../assets/tale-bot/tale-bot-pro-hero.webp',
	'installer-mblock-5-sous-windows-10.md': '../../assets/blog-heroes/hero-scratch-mblock.png',
	'sinscrire-sur-mblock.md': '../../assets/blog-heroes/hero-scratch-mblock.png',
	'installer-les-blocs-du-mbot.md': '../../assets/mbot/mbot-hero.png',
	'activite-mbot-detecteur-dintrusion.md': '../../assets/mbot/mbot-hero.png',
	'activite-mbot-faire-clignoter-les-leds.md': '../../assets/mbot/mbot-hero.png',
	'activite-mbot-faire-defiler-un-texte.md': '../../assets/mbot/mbot-hero.png',
	'activite-mbot-mesurer-des-distances.md': '../../assets/mbot/mbot-hero.png',
	'mon-premier-programme-mbot.md': '../../assets/mbot/mbot-hero.png',
	'premier-pas-avec-mblock-5.md': '../../assets/mbot/mbot-hero.png',
	'mise-en-route-raspberry-pi-3-modele-b.md': '../../assets/blog-heroes/hero-raspberry.png',
	'scratch-creer-un-jeu-video-premiere-partie.md': '../../assets/blog-heroes/hero-scratch-mblock.png',
	'activite-scratch-le-carre.md': '../../assets/blog-heroes/hero-scratch-mblock.png',
};

function injectHero(content, heroPath) {
	if (/\nheroImage:\s/m.test(content)) return content;
	const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
	if (!match) throw new Error('Frontmatter introuvable');
	const lines = match[1].split(/\r?\n/);
	const idxPub = lines.findIndex((l) => l.startsWith('pubDate:'));
	if (idxPub === -1) throw new Error('pubDate introuvable');
	lines.splice(idxPub + 1, 0, `heroImage: "${heroPath}"`);
	return `---\n${lines.join('\n')}\n---\n` + content.slice(match[0].length);
}

for (const [file, hero] of Object.entries(HERO_BY_FILE)) {
	const fp = path.join(BLOG, file);
	if (!fs.existsSync(fp)) {
		console.warn('Manquant:', file);
		continue;
	}
	const before = fs.readFileSync(fp, 'utf8');
	const after = injectHero(before, hero);
	if (after !== before) {
		fs.writeFileSync(fp, after, 'utf8');
		console.log('OK', file);
	} else console.log('skip', file);
}
