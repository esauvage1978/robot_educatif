/**
 * Génère public/downloads/mbot/10-projets-mbot-classe.pdf
 * Usage : node scripts/generate-mbot-10-projets-pdf.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'public', 'downloads', 'mbot');
const outFile = path.join(outDir, '10-projets-mbot-classe.pdf');

const margin = 50;
const lineH = 14;
const maxW = 495;

function wrapLine(font, text, size, maxWidth) {
	const words = text.split(/\s+/);
	const lines = [];
	let cur = '';
	for (const w of words) {
		const trial = cur ? `${cur} ${w}` : w;
		if (font.widthOfTextAtSize(trial, size) <= maxWidth) {
			cur = trial;
		} else {
			if (cur) lines.push(cur);
			cur = w;
		}
	}
	if (cur) lines.push(cur);
	return lines;
}

function drawParagraph(page, font, text, size, x, y, color) {
	const lines = [];
	for (const raw of text.split('\n')) {
		if (!raw.trim()) {
			lines.push('');
			continue;
		}
		lines.push(...wrapLine(font, raw.trim(), size, maxW));
	}
	for (const line of lines) {
		page.drawText(line, { x, y, size, font, color });
		y -= lineH;
	}
	return y;
}

const projects = [
	{
		n: 1,
		title: 'Avancer et reculer',
		obj: "Comprendre les moteurs gauche/droite et l'ordre des blocs.",
		mat: 'mBot (kit standard), cable USB ou Bluetooth, mBlock.',
		niv: 'Debutant',
		duree: '30 min',
		etapes:
			'1) Nouveau projet mBot. 2) Bloc demarrage mBot. 3) Moteurs: avancer 1 s. 4) Pause 0,5 s. 5) Reculer 1 s. 6) Televerser et tester sur sol plat.',
		comp: 'Sequence, temps, test.',
		astuce: 'Faire predire le mouvement avant d appuyer sur le bouton.',
	},
	{
		n: 2,
		title: 'Eviteur d obstacles',
		obj: 'Lire une distance et reagir (capteur ultrason).',
		mat: 'mBot avec ultrason integre (classique), ruban au sol, obstacle fixe.',
		niv: 'Intermediaire',
		duree: '45 min a 1 h',
		etapes:
			'1) Boucle infinie. 2) Si distance < 15 cm: tourner ou reculer. 3) Sinon: avancer lentement. 4) Ajuster le seuil en groupe.',
		comp: 'Condition, capteur, boucle.',
		astuce: 'Noter le seuil au tableau: une seule "regle" pour toute la classe.',
	},
	{
		n: 3,
		title: 'Suiveur de ligne',
		obj: 'Exploiter les capteurs IR sous le robot.',
		mat: 'mBot, piste ligne (ruban noir large), eclairage stable.',
		niv: 'Intermediaire',
		duree: '45 min a 1 h',
		etapes:
			'1) Mode suivi de ligne si bloc disponible. 2) Sinon: si capteur gauche voit la ligne, corriger la direction. 3) Tester vitesse basse puis augmenter.',
		comp: 'Capteurs, regulation simple.',
		astuce: 'Commencer avec une courbe large; eviter le noir trop fin au debut.',
	},
	{
		n: 4,
		title: 'Robot telecommande',
		obj: 'Lier une entree (touches ou IR) aux moteurs.',
		mat: 'mBot, telecommande IR si fournie, ou blocs clavier selon version.',
		niv: 'Intermediaire',
		duree: '45 min',
		etapes:
			'1) Associer fleche haut = avancer, bas = reculer, gauche/droite = pivoter. 2) Ajouter une touche Stop. 3) Tester puis televerser.',
		comp: 'Evenements, commande.',
		astuce: 'Definir une "conduite" commune: qui tient la telecommande et ou roule le robot.',
	},
	{
		n: 5,
		title: 'LED qui changent d etat',
		obj: 'Piloter les LED RGB / LED du robot selon une condition.',
		mat: 'mBot, programme mBlock.',
		niv: 'Debutant',
		duree: '30 min',
		etapes:
			'1) Allumer en rouge au demarrage. 2) Apres 2 s passer au vert. 3) Au bouton carte: bleu. 4) Montrer le resultat au groupe.',
		comp: 'Sorties, temporisation, entree bouton.',
		astuce: 'Une couleur = un etat: facile a deboguer a l oral.',
	},
	{
		n: 6,
		title: 'Jouer une melodie',
		obj: 'Utiliser le buzzer avec notes ou frequence.',
		mat: 'mBot, mBlock.',
		niv: 'Debutant',
		duree: '30 min',
		etapes:
			'1) Jouer une note au demarrage. 2) Enchainer 4 notes courtes. 3) Ajouter une pause entre les phrases. 4) Faire composer une "signature" 3 notes par equipe.',
		comp: 'Sequence, rythme.',
		astuce: 'Limiter le volume en classe ou prevoir un creneau "concert" unique.',
	},
	{
		n: 7,
		title: 'Detecteur de distance (radar)',
		obj: 'Afficher ou reagir selon la distance mesuree.',
		mat: 'mBot ultrason, obstacle mobile (main ou carton).',
		niv: 'Debutant / intermediaire',
		duree: '40 min',
		etapes:
			'1) Lire la distance en boucle. 2) Si < 20 cm: son bref ou LED rouge. 3) Sinon: silence ou LED verte. 4) Faire deviner la distance sans regarder l ecran.',
		comp: 'Seuil, capteur, decision.',
		astuce: 'Lier a une situation: "feu de recul" ou "alarme entree".',
	},
	{
		n: 8,
		title: 'Sequence automatique',
		obj: 'Enchainer plusieurs actions sans intervention (parcours simple).',
		mat: 'mBot, espace degage avec limites.',
		niv: 'Intermediaire',
		duree: '45 min',
		etapes:
			'1) Avancer 2 s. 2) Tourner 90 degres (ajuster le temps de rotation). 3) Repeter 4 fois pour un carre approximatif. 4) Ajuster les durees au sol reel.',
		comp: 'Repetition, calibration.',
		astuce: 'Tracer au sol le carre attendu pour visualiser l erreur.',
	},
	{
		n: 9,
		title: 'Reaction a la lumiere',
		obj: 'Utiliser le capteur de luminosite si disponible sur le modele.',
		mat: 'mBot (capteur lumiere selon carte), lampe de poche, piece semi-sombre.',
		niv: 'Intermediaire',
		duree: '40 min',
		etapes:
			'1) Lire la luminosite. 2) Si sombre: avancer lentement. 3) Si clair: stop ou reculer. 4) Tester avec la main qui couvre le robot.',
		comp: 'Seuil analogique, capteur.',
		astuce: 'Si le modele na pas ce capteur: proposer le projet 7 a la place.',
	},
	{
		n: 10,
		title: 'Mini-defi en equipe',
		obj: 'Concevoir un comportement court avec contrainte imposee.',
		mat: 'mBot, chronometre, obstacle, ruban.',
		niv: 'Tous niveaux',
		duree: '45 min a 1 h',
		etapes:
			'1) Tirage: "traverse la zone sans toucher le ruban" ou "3 sons differents". 2) Prototype 15 min. 3) Demo 2 min par equipe. 4) Vote le plus clair / le plus robuste.',
		comp: 'Projet, presentation, test.',
		astuce: 'Evaluer le processus (essais) pas seulement le resultat.',
	},
];

async function main() {
	fs.mkdirSync(outDir, { recursive: true });

	const pdf = await PDFDocument.create();
	const font = await pdf.embedFont(StandardFonts.Helvetica);
	const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);
	const black = rgb(0.1, 0.1, 0.1);
	const muted = rgb(0.35, 0.35, 0.35);

	let page = pdf.addPage([595, 842]);
	let y = 780;

	const title = '10 projets mBot a faire en classe';
	page.drawText(title, {
		x: margin,
		y,
		size: 22,
		font: fontBold,
		color: black,
	});
	y -= 36;
	y = drawParagraph(
		page,
		font,
		'Fiches imprimables - Robot educatif.info\n' +
			'Ressource pour enseignants et animateurs STEM : idees courtes, materiel minimal, compatible mBlock.\n' +
			'Gratuit pour usage pedagogique en classe ou club.',
		11,
		margin,
		y,
		muted,
	);
	y -= 20;

	y = drawParagraph(
		page,
		fontBold,
		'Introduction',
		13,
		margin,
		y,
		black,
	);
	y -= 6;
	y = drawParagraph(
		page,
		font,
		'Le mBot est un robot programmable (style Scratch via mBlock). Les projets ci-dessous partent du kit standard; certaines fonctions dependent du modele (capteurs). Ajustez les blocs selon votre version de mBlock et le firmware a jour.',
		11,
		margin,
		y,
		black,
	);
	y -= 24;

	function newPage() {
		page = pdf.addPage([595, 842]);
		return 780;
	}

	for (const p of projects) {
		const block =
			`Projet ${p.n} — ${p.title}\n` +
			`Objectif : ${p.obj}\n` +
			`Materiel : ${p.mat}\n` +
			`Niveau : ${p.niv} | Duree : ${p.duree}\n` +
			`Etapes : ${p.etapes}\n` +
			`Competences : ${p.comp}\n` +
			`Astuce enseignant : ${p.astuce}`;

		const lines = [];
		for (const raw of block.split('\n')) {
			lines.push(...wrapLine(font, raw, 10, maxW));
			lines.push('');
		}
		const needed = lines.length * lineH + 40;
		if (y - needed < margin) {
			y = newPage();
		}

		page.drawText(`Projet ${p.n} — ${p.title}`, {
			x: margin,
			y,
			size: 13,
			font: fontBold,
			color: black,
		});
		y -= 20;

		const body =
			`Objectif : ${p.obj}\n` +
			`Materiel : ${p.mat}\n` +
			`Niveau : ${p.niv} | Duree : ${p.duree}\n` +
			`Etapes : ${p.etapes}\n` +
			`Competences : ${p.comp}\n` +
			`Astuce enseignant : ${p.astuce}`;

		y = drawParagraph(page, font, body, 10, margin, y, black);
		y -= 16;
	}

	if (y < 200) y = newPage();
	else y -= 10;

	page.drawText('Checklist materiel (classe)', {
		x: margin,
		y,
		size: 14,
		font: fontBold,
		color: black,
	});
	y -= 22;
	y = drawParagraph(
		page,
		font,
		'- Robots mBot charges et testes USB avant la seance\n' +
			'- mBlock installe ou version web prevue\n' +
			'- Piste ligne (ruban) ou obstacles legers non tranchants\n' +
			'- Chronometre ou tableau pour les consignes de defi\n' +
			'- Feuille de suivi par equipe (hypothese / test / resultat)',
		11,
		margin,
		y,
		black,
	);
	y -= 24;

	page.drawText('Conseils enseignants', {
		x: margin,
		y,
		size: 14,
		font: fontBold,
		color: black,
	});
	y -= 22;
	y = drawParagraph(
		page,
		font,
		'- Un poste = un robot; prevoir rotation des roles (pilote, chronometre, scribe).\n' +
			'- Faire verbaliser le programme avant televersement.\n' +
			'- Accepter l erreur: premiere iteration = brouillon.\n' +
			'- Partager la ressource PDF avec les collegues (lien vers robot-educatif.info).',
		11,
		margin,
		y,
		black,
	);

	const bytes = await pdf.save();
	fs.writeFileSync(outFile, bytes);
	console.log('OK:', outFile);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
