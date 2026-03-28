/**
 * Insère `categories:` (4 entrées) dans le frontmatter des articles qui n’en ont pas encore.
 * Usage : node scripts/assign-article-categories.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');

/** @type {Record<string, string[]>} */
const CATEGORIES_BY_FILE = {
	// Activités mBot
	'activite-mbot-detecteur-dintrusion': ['Activité', 'mBot', 'Makeblock', 'À partir de 8 ans'],
	'activite-mbot-faire-clignoter-les-leds': ['Activité', 'mBot', 'Makeblock', 'À partir de 8 ans'],
	'activite-mbot-faire-defiler-un-texte': ['Activité', 'mBot', 'Makeblock', 'À partir de 8 ans'],
	'activite-mbot-mesurer-des-distances': ['Activité', 'mBot', 'Makeblock', 'À partir de 10 ans'],
	'activite-scratch-le-carre': ['Activité', 'Scratch', 'À partir de 8 ans', 'mBlock'],
	// Scratch / mBlock — guides
	'scratch-creer-un-jeu-video-premiere-partie': ['Scratch', 'Activité', 'Jeu vidéo', 'À partir de 10 ans'],
	'premier-pas-avec-mblock-5': ['mBlock', 'Guide', 'Scratch', 'Débutant'],
	'installer-mblock-5-sous-windows-10': ['mBlock', 'Guide', 'Installation', 'Windows'],
	'installer-les-blocs-du-mbot': ['mBot', 'mBlock', 'Guide', 'Makeblock'],
	'sinscrire-sur-mblock': ['mBlock', 'Scratch', 'Guide', 'Compte'],
	'mon-premier-programme-mbot': ['mBot', 'mBlock', 'Scratch', 'À partir de 8 ans'],
	// Robots & marques
	'mbot-mon-premier-robot-educatif': ['Robot éducatif', 'mBot', 'Makeblock', 'À partir de 8 ans'],
	'mbot2-de-makeblock-le-robot-educatif-pour-apprendre-la-robotique': [
		'Robot éducatif',
		'mBot 2',
		'Makeblock',
		'À partir de 10 ans',
	],
	'mbot-vs-mbot2-comparaison-des-robots-educatifs-pour-enfants': ['Comparatif', 'mBot', 'Makeblock', 'Robot éducatif'],
	'robot-educatif-codey-rocky-makeblock': ['Robot éducatif', 'Codey Rocky', 'Makeblock', 'Programmation'],
	'robot-educatif-eilik-compagnon': ['Robot éducatif', 'Eilik', 'Compagnon', 'Programmation'],
	'decouvrez-makeblock-cyberpi-une-carte-de-developpement-electronique-polyvalente': [
		'CyberPi',
		'Makeblock',
		'Électronique',
		'Programmation',
	],
	// Matatalab / Tale-bot
	'deballage-et-premier-pas-du-robot-tale-bot-de-chez-matatalab': ['Matatalab', 'Déballage', 'Tale Bot', 'À partir de 5 ans'],
	'le-robot-tale-bot-de-chez-matatalab-un-outil-educatif-pour-enfants': [
		'Matatalab',
		'Tale Bot',
		'Robot éducatif',
		'À partir de 5 ans',
	],
	'le-robot-tale-bot-de-chez-matatalab-questions-reponses': ['Matatalab', 'Tale Bot', 'FAQ', 'Robot éducatif'],
	'matatalab-une-entreprise-innovante': ['Matatalab', 'Marque', 'Robotique éducative', 'Entreprise'],
	// Raspberry
	'mise-en-route-raspberry-pi-3-modele-b': ['Raspberry Pi', 'Linux', 'Tutoriel', 'À partir de 12 ans'],
	// Python — parcours bases
	'python-environnement-developpement': ['Python', 'Programmation', 'Tutoriel', 'Débutant'],
	'python-variables-affichage': ['Python', 'Programmation', 'Tutoriel', 'Débutant'],
	'python-types-et-saisie': ['Python', 'Programmation', 'Tutoriel', 'Débutant'],
	'python-conditions-if-else': ['Python', 'Programmation', 'Tutoriel', 'Débutant'],
	'python-boucles-for-while': ['Python', 'Programmation', 'Tutoriel', 'Débutant'],
	'python-fonctions': ['Python', 'Programmation', 'Tutoriel', 'Intermédiaire'],
	'python-listes-et-chaines': ['Python', 'Programmation', 'Tutoriel', 'Intermédiaire'],
	'python-fichiers-texte': ['Python', 'Programmation', 'Fichiers', 'Intermédiaire'],
	'python-erreurs-debogage': ['Python', 'Programmation', 'Débogage', 'Intermédiaire'],
	'python-mini-jeu-terminal': ['Python', 'Programmation', 'Mini-projet', 'Terminal'],
	// Séries projets Python
	'python-carnet-todo-1-cahier-json': ['Python', 'Programmation', 'Carnet Todo', 'Projet'],
	'python-carnet-todo-2-lire-ecrire-json': ['Python', 'Programmation', 'Carnet Todo', 'Projet'],
	'python-carnet-todo-3-modele-donnees': ['Python', 'Programmation', 'Carnet Todo', 'Projet'],
	'python-carnet-todo-4-menu-cli': ['Python', 'Programmation', 'Carnet Todo', 'Projet'],
	'python-carnet-todo-5-persistance': ['Python', 'Programmation', 'Carnet Todo', 'Projet'],
	'python-carnet-todo-6-projet-complet': ['Python', 'Programmation', 'Carnet Todo', 'Projet'],
	'python-puissance-4-1-cahier-grille': ['Python', 'Programmation', 'Puissance 4', 'Projet'],
	'python-puissance-4-2-affichage-gravite': ['Python', 'Programmation', 'Puissance 4', 'Projet'],
	'python-puissance-4-3-coup-alternance': ['Python', 'Programmation', 'Puissance 4', 'Projet'],
	'python-puissance-4-4-quatre-alignes': ['Python', 'Programmation', 'Puissance 4', 'Projet'],
	'python-puissance-4-5-match-nul': ['Python', 'Programmation', 'Puissance 4', 'Projet'],
	'python-puissance-4-6-jeu-complet': ['Python', 'Programmation', 'Puissance 4', 'Projet'],
	'python-bataille-navale-1-cahier-des-charges': ['Python', 'Programmation', 'Bataille navale', 'Projet'],
	'python-bataille-navale-2-grille-et-affichage': ['Python', 'Programmation', 'Bataille navale', 'Projet'],
	'python-bataille-navale-3-placement-bateaux': ['Python', 'Programmation', 'Bataille navale', 'Projet'],
	'python-bataille-navale-4-tirs-et-marques': ['Python', 'Programmation', 'Bataille navale', 'Projet'],
	'python-bataille-navale-5-coule-et-victoire': ['Python', 'Programmation', 'Bataille navale', 'Projet'],
	'python-bataille-navale-6-jeu-complet': ['Python', 'Programmation', 'Bataille navale', 'Projet'],
	'python-pendu-1-cahier-mot-masque': ['Python', 'Programmation', 'Pendu', 'Projet'],
	'python-pendu-2-mots-depuis-fichier': ['Python', 'Programmation', 'Pendu', 'Projet'],
	'python-pendu-3-affichage-lettres': ['Python', 'Programmation', 'Pendu', 'Projet'],
	'python-pendu-4-boucle-partie': ['Python', 'Programmation', 'Pendu', 'Projet'],
	'python-pendu-5-victoire-defaite': ['Python', 'Programmation', 'Pendu', 'Projet'],
	'python-pendu-6-projet-complet': ['Python', 'Programmation', 'Pendu', 'Projet'],
};

function yamlCategories(arr) {
	const lines = ['categories:'];
	for (const c of arr) {
		const safe = String(c).replace(/"/g, '\\"');
		lines.push(`  - "${safe}"`);
	}
	return lines.join('\n');
}

function insertCategories(content, baseName) {
	if (/^categories:\s*$/m.test(content) || /^categories:\s*\[/m.test(content)) {
		return { content, skipped: true };
	}
	const cats = CATEGORIES_BY_FILE[baseName];
	if (!cats || cats.length !== 4) {
		throw new Error(`Missing or invalid categories for: ${baseName}`);
	}
	const parts = content.split(/^---\s*$/m);
	if (parts.length < 3) {
		throw new Error(`Invalid frontmatter for: ${baseName}`);
	}
	const front = parts[1];
	const rest = parts.slice(2).join('---');
	const block = yamlCategories(cats);
	const newFront = front.trimEnd() + '\n' + block + '\n';
	return { content: `---${newFront}---${rest}`, skipped: false };
}

const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md'));
let n = 0;
for (const f of files) {
	const base = f.replace(/\.md$/, '');
	const p = path.join(blogDir, f);
	let text = fs.readFileSync(p, 'utf8');
	const r = insertCategories(text, base);
	if (r.skipped) {
		console.log('skip (already has categories):', f);
		continue;
	}
	fs.writeFileSync(p, r.content, 'utf8');
	n++;
	console.log('updated:', f);
}
console.log('Done. Updated', n, 'files.');
