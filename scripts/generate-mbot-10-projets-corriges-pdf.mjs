/**
 * PDF enseignant : logigrammes (Nassi-Shneiderman simplifie / flowchart)
 * + corrections detaillees — 10 projets mBot.
 * Sortie : public/downloads/mbot/10-projets-mbot-corriges-diagrammes.pdf
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'public', 'downloads', 'mbot');
const outFile = path.join(outDir, '10-projets-mbot-corriges-diagrammes.pdf');

const PAGE_W = 595;
const PAGE_H = 842;
const margin = 42;
const lineH = 12.5;
const maxW = PAGE_W - 2 * margin;

const C_PROC = rgb(0.9, 0.93, 0.99);
const C_DEC = rgb(1, 0.94, 0.82);
const C_BR1 = rgb(0.88, 0.97, 0.9);
const C_BR2 = rgb(0.93, 0.9, 1);
const C_ST = rgb(0.22, 0.22, 0.26);
const C_MUTE = rgb(0.4, 0.4, 0.42);

function wrapLine(font, text, size, maxWidth) {
	const words = String(text).split(/\s+/);
	const lines = [];
	let cur = '';
	for (const w of words) {
		const trial = cur ? `${cur} ${w}` : w;
		if (font.widthOfTextAtSize(trial, size) <= maxWidth) cur = trial;
		else {
			if (cur) lines.push(cur);
			cur = w;
		}
	}
	if (cur) lines.push(cur);
	return lines;
}

function drawParagraph(page, font, text, size, x, y, color, mw = maxW) {
	for (const raw of String(text).split('\n')) {
		if (!raw.trim()) {
			y -= lineH * 0.35;
			continue;
		}
		for (const line of wrapLine(font, raw.trim(), size, mw)) {
			page.drawText(line, { x, y, size, font, color });
			y -= lineH;
		}
	}
	return y;
}

/** Rectangle processus : centre horizontal cx, sommet superieur topY */
function drawProcess(page, font, cx, topY, w, h, text, size = 8) {
	const x = cx - w / 2;
	const yBot = topY - h;
	page.drawRectangle({
		x,
		y: yBot,
		width: w,
		height: h,
		color: C_PROC,
		borderColor: C_ST,
		borderWidth: 0.9,
	});
	const lines = wrapLine(font, text, size, w - 8);
	const lineStep = Math.min(size + 1, h / Math.max(1, lines.length));
	let ty = yBot + (h - lines.length * lineStep) / 2 + lineStep * 0.2;
	for (const ln of lines) {
		const tw = font.widthOfTextAtSize(ln, size);
		page.drawText(ln, { x: cx - tw / 2, y: ty, size, font, color: rgb(0.05, 0.05, 0.08) });
		ty -= lineStep;
	}
	return { topY, yBot, cx, w, h };
}

/** Losange decision : centre (cx, cy), demi-largeur hw, demi-hauteur hh */
function drawDiamond(page, font, cx, cy, hw, hh, text, size = 7) {
	const t = { x: cx, y: cy + hh };
	const r = { x: cx + hw, y: cy };
	const b = { x: cx, y: cy - hh };
	const l = { x: cx - hw, y: cy };
	page.drawRectangle({
		x: cx - hw,
		y: cy - hh,
		width: hw * 2,
		height: hh * 2,
		color: C_DEC,
		borderWidth: 0,
		opacity: 0.28,
	});
	for (const [a, bpt] of [
		[t, r],
		[r, b],
		[b, l],
		[l, t],
	]) {
		page.drawLine({ start: a, end: bpt, thickness: 1, color: C_ST });
	}
	const lines = wrapLine(font, text, size, hw * 2 - 10);
	const ls = Math.min(size + 0.5, (hh * 2 - 4) / Math.max(1, lines.length));
	let ly = cy + (lines.length * ls) / 2 - ls * 0.35;
	for (const ln of lines) {
		const tw = font.widthOfTextAtSize(ln, size);
		page.drawText(ln, { x: cx - tw / 2, y: ly, size, font, color: rgb(0.1, 0.08, 0.02) });
		ly -= ls;
	}
	return { t, r, b, l, cy, hw, hh };
}

function drawLine(page, x1, y1, x2, y2, thick = 1) {
	page.drawLine({
		start: { x: x1, y: y1 },
		end: { x: x2, y: y2 },
		thickness: thick,
		color: C_ST,
	});
}

function drawArrow(page, x1, y1, x2, y2) {
	drawLine(page, x1, y1, x2, y2, 1.1);
	const dx = x2 - x1;
	const dy = y2 - y1;
	const len = Math.hypot(dx, dy) || 1;
	const ux = dx / len;
	const uy = dy / len;
	const px = -uy;
	const py = ux;
	const s = 4;
	page.drawLine({
		start: { x: x2 - ux * 7 + px * s, y: y2 - uy * 7 + py * s },
		end: { x: x2, y: y2 },
		thickness: 1,
		color: C_ST,
	});
	page.drawLine({
		start: { x: x2 - ux * 7 - px * s, y: y2 - uy * 7 - py * s },
		end: { x: x2, y: y2 },
		thickness: 1,
		color: C_ST,
	});
}

function label(page, font, x, y, txt, size = 6.5) {
	page.drawText(txt, { x, y, size, font, color: C_MUTE });
}

/** Point de fusion (cercle) — pdf-lib : drawCircle size = diametre visuel des axes */
function drawMerge(page, cx, cy, r = 3.5) {
	page.drawCircle({
		x: cx,
		y: cy,
		size: r * 2,
		borderColor: C_ST,
		borderWidth: 0.9,
		color: rgb(0.94, 0.94, 0.95),
	});
}

/** --- Diagrammes par projet (coordonnees PDF, y vers le haut) --- */

function diagLineaire(page, font, cx, y0, steps) {
	let top = y0;
	const gap = 12;
	const h = 26;
	const w = 248;
	for (let i = 0; i < steps.length; i++) {
		const r = drawProcess(page, font, cx, top, w, h, steps[i], 8);
		if (i < steps.length - 1) {
			drawArrow(page, cx, r.yBot, cx, r.yBot - gap);
			top = r.yBot - gap;
		} else {
			top = r.yBot;
		}
	}
	return top - 8;
}

/** Boucle + test si / sinon + fusion + retour au corps de boucle */
function diagBoucleDistanceIf(page, font, cx, y0, opts) {
	const wP = 250;
	const hP = 28;
	const wBr = 118;
	const hBr = 40;
	const hw = 58;
	const hh = 22;
	let top = y0;

	let r0 = drawProcess(page, font, cx, top, wP, hP, opts.topLabel, 8);
	drawArrow(page, cx, r0.yBot, cx, r0.yBot - 12);
	top = r0.yBot - 12;

	let r1 = drawProcess(page, font, cx, top, wP, hP, opts.readSensor, 7.5);
	drawArrow(page, cx, r1.yBot, cx, r1.yBot - 14);
	const cyD = r1.yBot - 14 - hh;
	const d = drawDiamond(page, font, cx, cyD, hw, hh, opts.condition, 7);

	const ySplit = d.l.y;
	const xL = 118;
	const xR = PAGE_W - 118;
	drawLine(page, d.l.x, d.l.y, xL, ySplit);
	drawArrow(page, xL, ySplit, xL, ySplit - 28);
	drawLine(page, d.r.x, d.r.y, xR, ySplit);
	drawArrow(page, xR, ySplit, xR, ySplit - 28);

	label(page, font, xL - 4, ySplit + 8, opts.labelOui || 'Vrai', 6.5);
	label(page, font, xR - 18, ySplit + 8, opts.labelNon || 'Faux', 6.5);

	const topL = ySplit - 28;
	const topR = ySplit - 28;
	const rL = drawProcess(page, font, xL, topL, wBr, hBr, opts.branchOui, 7);
	const rR = drawProcess(page, font, xR, topR, wBr, hBr, opts.branchNon, 7);

	const yMerge = Math.min(rL.yBot, rR.yBot) - 16;
	drawLine(page, xL, rL.yBot, xL, yMerge + 6);
	drawLine(page, xR, rR.yBot, xR, yMerge + 6);
	drawLine(page, xL, yMerge + 6, xR, yMerge + 6);
	drawMerge(page, cx, yMerge + 6, 3.5);
	drawArrow(page, cx, yMerge + 6, cx, yMerge);

	const yBotMerge = yMerge - 4;
	drawLine(page, cx, yBotMerge, cx, yBotMerge - 10);
	drawLine(page, cx, yBotMerge - 10, 515, yBotMerge - 10);
	drawLine(page, 515, yBotMerge - 10, 515, r1.topY + 8);
	drawLine(page, 515, r1.topY + 8, cx, r1.topY + 8);
	drawArrow(page, cx, r1.topY + 8, cx, r1.topY + 2);
	label(page, font, 420, yBotMerge - 24, 'Retour debut corps de boucle', 6.5);

	return yBotMerge - 36;
}

/** Si / sinon sans boucle (alarme, luminosite) */
function diagIfElseMerge(page, font, cx, y0, opts) {
	const wP = 248;
	const hP = 26;
	const wBr = 116;
	const hBr = 36;
	const hw = 56;
	const hh = 20;
	let top = y0;

	let r1 = drawProcess(page, font, cx, top, wP, hP, opts.readSensor, 7.5);
	drawArrow(page, cx, r1.yBot, cx, r1.yBot - 12);
	const cyD = r1.yBot - 12 - hh;
	const d = drawDiamond(page, font, cx, cyD, hw, hh, opts.condition, 7);

	const ySplit = d.l.y;
	const xL = 120;
	const xR = PAGE_W - 120;
	drawLine(page, d.l.x, d.l.y, xL, ySplit);
	drawArrow(page, xL, ySplit, xL, ySplit - 24);
	drawLine(page, d.r.x, d.r.y, xR, ySplit);
	drawArrow(page, xR, ySplit, xR, ySplit - 24);
	label(page, font, xL - 2, ySplit + 8, opts.labL, 6.5);
	label(page, font, xR - 22, ySplit + 8, opts.labR, 6.5);

	const topL = ySplit - 24;
	const topR = ySplit - 24;
	drawProcess(page, font, xL, topL, wBr, hBr, opts.leftAct, 7);
	drawProcess(page, font, xR, topR, wBr, hBr, opts.rightAct, 7);
	const yB = Math.min(topL - hBr, topR - hBr);
	drawLine(page, xL, yB, xL, yB - 10);
	drawLine(page, xR, yB, xR, yB - 10);
	drawLine(page, xL, yB - 10, xR, yB - 10);
	drawMerge(page, cx, yB - 10, 3);
	drawArrow(page, cx, yB - 10, cx, yB - 22);
	label(page, font, cx - 40, yB - 8, 'Fin de branche', 6);

	return yB - 30;
}

/** Suiveur : si G noir -> corriger droite ; sinon si D noir -> corriger gauche ; sinon avancer (fusions explicites) */
function diagLigneIR(page, font, cx, y0) {
	const w = 248;
	const h = 26;
	const wAct = 128;
	const hAct = 34;
	const hw = 54;
	const hh = 20;
	const xL = 118;
	const xR = PAGE_W - 118;

	const r0 = drawProcess(page, font, cx, y0, w, h, 'Boucle : lire capteurs ligne (G / D)', 7.5);
	drawArrow(page, cx, r0.yBot, cx, r0.yBot - 12);
	const cy1 = r0.yBot - 12 - 8 - hh;
	const d1 = drawDiamond(page, font, cx, cy1, hw, hh, 'G voit noir ?', 6.5);

	const ySp1 = d1.l.y;
	drawLine(page, d1.l.x, d1.l.y, xL, ySp1);
	drawArrow(page, xL, ySp1, xL, ySp1 - 20);
	const pG = drawProcess(page, font, xL, ySp1 - 20, wAct, hAct, 'Corriger vers la droite (ecart moteurs)', 6.5);
	label(page, font, xL - 2, ySp1 + 7, 'oui', 6);

	const cy2 = d1.b.y - 18 - hh;
	const d2 = drawDiamond(page, font, cx, cy2, hw, hh, 'D voit noir ?', 6.5);
	const yTopD2 = cy2 + hh;
	drawLine(page, d1.r.x, d1.r.y, xR, ySp1);
	drawLine(page, xR, ySp1, xR, yTopD2 + 5);
	drawLine(page, xR, yTopD2 + 5, cx, yTopD2 + 5);
	drawArrow(page, cx, yTopD2 + 5, cx, yTopD2 + 1);
	label(page, font, xR - 22, ySp1 + 7, 'non', 6);

	const ySp2 = d2.l.y;
	drawLine(page, d2.l.x, d2.l.y, xL, ySp2);
	drawArrow(page, xL, ySp2, xL, ySp2 - 20);
	const pD = drawProcess(page, font, xL, ySp2 - 20, wAct, hAct, 'Corriger vers la gauche', 6.5);
	label(page, font, xL - 2, ySp2 + 7, 'oui', 6);

	const topAdv = d2.b.y - 12;
	const yInAdv = topAdv + 5;
	drawLine(page, d2.r.x, d2.r.y, xR, ySp2);
	drawLine(page, xR, ySp2, xR, yInAdv);
	drawLine(page, xR, yInAdv, cx, yInAdv);
	drawArrow(page, cx, yInAdv, cx, topAdv + 0.5);
	const rAdv = drawProcess(page, font, cx, topAdv, w, h, 'Avancer lent (ligne au centre)', 7);
	label(page, font, xR - 22, ySp2 + 7, 'non', 6);

	const yMerge = Math.min(pG.yBot, pD.yBot, rAdv.yBot) - 14;
	drawLine(page, xL, pG.yBot, xL, yMerge + 5);
	drawLine(page, xL, yMerge + 5, cx, yMerge + 5);
	drawLine(page, xL, pD.yBot, xL, yMerge + 5);
	drawLine(page, cx, rAdv.yBot, cx, yMerge + 5);
	drawMerge(page, cx, yMerge + 5, 3.5);
	drawArrow(page, cx, yMerge + 5, cx, yMerge);
	label(page, font, margin + 2, yMerge + 2, 'Fusion puis retour tete de boucle', 6);

	return yMerge - 18;
}

/** Telecommande : plusieurs evenements (schema en bandeau) */
function diagTelecommande(page, font, cx, y0) {
	const steps = [
		'Evenement : touche / code IR recu',
		'Si fleche haut -> moteurs avant',
		'Si fleche bas -> moteurs arriere',
		'Si gauche/droite -> pivoter (vitesses opposees)',
		'Sinon (stop / autre) -> vitesses 0',
	];
	return diagLineaire(page, font, cx, y0, steps);
}

/** LED + bouton : sequence + test */
function diagLEDBouton(page, font, cx, y0) {
	let t = y0;
	const w = 250;
	const h = 24;
	const a = drawProcess(page, font, cx, t, w, h, 'Au demarrage : LED rouge', 7.5);
	drawArrow(page, cx, a.yBot, cx, a.yBot - 10);
	const b = drawProcess(page, font, cx, a.yBot - 10, w, h, 'Attendre 2 s', 8);
	drawArrow(page, cx, b.yBot, cx, b.yBot - 10);
	const c = drawProcess(page, font, cx, b.yBot - 10, w, h, 'LED verte', 7.5);
	drawArrow(page, cx, c.yBot, cx, c.yBot - 12);
	const d = drawDiamond(page, font, cx, c.yBot - 12 - 20, 70, 20, 'Bouton carte presse ?', 7);
	drawLine(page, d.l.x, d.l.y, 130, d.l.y);
	drawArrow(page, 130, d.l.y, 130, d.l.y - 22);
	drawProcess(page, font, 130, d.l.y - 22, 140, 30, 'LED bleue', 7.5);
	drawLine(page, d.r.x, d.r.y, 465, d.r.y);
	drawArrow(page, 465, d.r.y, 465, d.b.y - 8);
	label(page, font, 128, d.l.y + 6, 'oui', 6.5);
	label(page, font, 468, d.r.y + 6, 'non', 6.5);
	return d.b.y - 45;
}

/** Repeter 4 : bloc structure + corps */
function diagCarre(page, font, cx, y0) {
	let t = y0;
	const w = 252;
	const h = 26;
	const r0 = drawProcess(page, font, cx, t, w, h, 'Bloc "repeter n fois" (n = 4)', 7.5);
	drawArrow(page, cx, r0.yBot, cx, r0.yBot - 10);
	const r1 = drawProcess(page, font, cx, r0.yBot - 10, w, h, 'Corps : avancer (duree t1)', 7.5);
	drawArrow(page, cx, r1.yBot, cx, r1.yBot - 10);
	const r2 = drawProcess(page, font, cx, r1.yBot - 10, w, h, 'Corps : pivoter ~90 deg (duree t2)', 7.5);
	label(page, font, margin + 2, r0.yBot + 4, 'Memes t1,t2 pour un carre regulier (ajuster au sol)', 6.5);
	return r2.yBot - 8;
}

const projects = [
	{
		n: 1,
		title: 'Avancer et reculer',
		draw: (page, font, cx, y) =>
			diagLineaire(page, font, cx, y, [
				'Bloc demarrage mBot (une fois)',
				'Moteurs : vitesse + / avancer (duree t1)',
				'Attendre (pause)',
				'Moteurs : vitesse - / reculer (duree t2)',
			]),
		corrige:
			'Structure : sequence lineaire (pas de test).\n' +
			'Blocs types : mouvement / temporisation (mBlock : categorie mBot > moteurs ; controle > attendre).\n' +
			'Correction : vitesses gauche = droite pour ligne droite ; ajuster t1 et t2 separement.\n' +
			'Piege : enchainer deux "avancer" sans pause peut sembler un seul mouvement selon le firmware — garder une pause visible.\n' +
			'Critere : deux mouvements opposes clairement separes sur le sol.',
	},
	{
		n: 2,
		title: 'Eviteur d obstacles',
		draw: (page, font, cx, y) =>
			diagBoucleDistanceIf(page, font, cx, y, {
				topLabel: 'Enveloppe : boucle infinie (tant que mBot sous tension)',
				readSensor: 'Lire distance d (ultrason) en cm',
				condition: 'd < seuil ? (ex. 15 cm)',
				labelOui: 'Oui (trop pres)',
				labelNon: 'Non (libre)',
				branchOui: 'Action evitement : pivoter ou reculer court',
				branchNon: 'Sinon : avancer lentement',
			}),
		corrige:
			'Logique standard : **tant que vrai** -> mesurer -> **si** obstacle **alors** eviter **sinon** avancer -> **retour** en tete de boucle.\n' +
			'mBlock : bloc "pour toujours" entourant lecture capteur + **si ... alors ... sinon** (ou deux tests selon la palette).\n' +
			'Variables : stocker `d` si la version le permet, sinon comparer le bloc "distance" directement au seuil.\n' +
			'Pieges : seuil trop bas (robot touche) ; obstacle reflechissant (mesure fausse) ; boucle trop rapide (vibrations) — ajouter une petite pause.\n' +
			'Critere : le robot ne reste pas bloque contre le mur ; trajectoire observee + explication orale du seuil.',
	},
	{
		n: 3,
		title: 'Suiveur de ligne',
		draw: (page, font, cx, y) => diagLigneIR(page, font, cx, y),
		corrige:
			'Deux familles : (1) bloc ou mode **suivi de ligne** integre si disponible ; (2) **deux tests** sur capteurs IR gauche/droit avec correction differentielle.\n' +
			'Le logigramme montre deux decisions **en serie** (gauche puis droite) — variante courante ; on peut aussi fusionner en une seule decision selon les blocs.\n' +
			'Correction : vitesse basse ; si oscillations, reduire l ecart de vitesse entre les roues.\n' +
			'Piege : contraste insuffisant (ruban trop fin, salle sombre) ; symetrie gauche/droite inversee selon branchement.',
	},
	{
		n: 4,
		title: 'Telecommande',
		draw: (page, font, cx, y) => diagTelecommande(page, font, cx, y),
		corrige:
			'Structure : une pile d **evenements** (ou un grand **si / sinon si** selon mBlock).\n' +
			'Chaque branche ne doit commander les moteurs qu une fois par evenement ; eviter deux scripts qui se lancent en conflit.\n' +
			'IR : codes parasites possibles — prevoir un **stop** ou une vitesse nulle par defaut.\n' +
			'Critere : tableau de verite (touche -> mouvelement) verifie en classe.',
	},
	{
		n: 5,
		title: 'LED et etats',
		draw: (page, font, cx, y) => diagLEDBouton(page, font, cx, y),
		corrige:
			'Sequence puis **test** : les LED suivent un ordre temporel ; le bouton ajoute une **branche**.\n' +
			'Preferer **quand bouton presse** (evenement) si la palette le propose, plutot qu un test dans une boucle rapide qui rebondit.\n' +
			'Piege : oublier d eteindre une couleur avant d allumer la suivante si les blocs sont additifs.',
	},
	{
		n: 6,
		title: 'Melodie (buzzer)',
		draw: (page, font, cx, y) =>
			diagLineaire(page, font, cx, y, [
				'Demarrage',
				'Jouer note / frequence (duree d1)',
				'Pause (d2)',
				'Repetition pour motif 4 notes',
			]),
		corrige:
			'Structure lineaire ou petite **repeter** pour les 4 notes.\n' +
			'Correction : alterner note et silence ; durees courtes pour rester dans la plage audible en salle.\n' +
			'Piege : autre script ou capteur qui interrompt le buzzer.',
	},
	{
		n: 7,
		title: 'Detecteur de distance (alarme)',
		draw: (page, font, cx, y) =>
			diagIfElseMerge(page, font, cx, y, {
				readSensor: 'Lire distance d',
				condition: 'd < seuil alarme ?',
				labL: 'oui',
				labR: 'non',
				leftAct: 'LED rouge + buzzer bref',
				rightAct: 'LED verte (OK)',
			}),
		corrige:
			'Meme squelette **si / sinon** que le projet 2, mais **sans** obligation de boucle externe si vous rafraichissez dans un **pour toujours** pour une alarme continue.\n' +
			'Pour une alarme **ponctuelle**, un seul test peut suffire ; pour **surveillance**, encapsuler dans **pour toujours** comme le projet 2.\n' +
			'Variation : variable `compteur` sur la branche "oui".',
	},
	{
		n: 8,
		title: 'Carre (sequence)',
		draw: (page, font, cx, y) => diagCarre(page, font, cx, y),
		corrige:
			'Structure **repeter 4 fois** : corps = (avancer droit + pivoter). Le pivot **n est pas** exactement 90 deg en temps fixe — **etalonnage** obligatoire.\n' +
			'Correction : noter (t_avancer, t_pivot) au tableau ; comparer les equipes.\n' +
			'Piege : sol glissant -> reduire vitesse ; desequilibre des moteurs -> trajectoire non fermee.',
	},
	{
		n: 9,
		title: 'Luminosite',
		draw: (page, font, cx, y) =>
			diagIfElseMerge(page, font, cx, y, {
				readSensor: 'Lire luminosite L (si capteur present)',
				condition: 'L < seuil sombre ?',
				labL: 'sombre',
				labR: 'clair',
				leftAct: 'Avancer lent',
				rightAct: 'Stop moteurs',
			}),
		corrige:
			'**Si** le materiel n a pas de luminosite : utiliser le projet 7 ou un test **ultrason** a la place.\n' +
			'Sinon : deux seuils ou hysteresis (sombre / clair) pour eviter le papillotement au seuil.\n' +
			'Etalonnage : lampe torche / main qui ombrage.',
	},
	{
		n: 10,
		title: 'Mini-defi equipe',
		draw: (page, font, cx, y) =>
			diagLineaire(page, font, cx, y, [
				'Contrainte (affichee)',
				'Conception : choisir capteurs + structure (seq / si / boucle)',
				'Implementation mBlock',
				'Tests iteratifs',
				'Demonstration + argumentaire',
			]),
		corrige:
			'Pas de corrige unique : grille d evaluation (contrainte respectee, clarte du programme, tests, oral).\n' +
			'Demander un **schema au brouillon** (meme informel) avant le cable : lien avec ce PDF.',
	},
];

async function main() {
	fs.mkdirSync(outDir, { recursive: true });
	const pdf = await PDFDocument.create();
	const font = await pdf.embedFont(StandardFonts.Helvetica);
	const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);
	const black = rgb(0.1, 0.1, 0.1);
	const cx = PAGE_W / 2;

	let page = pdf.addPage([PAGE_W, PAGE_H]);
	let y = 780;
	page.drawText('Corriges enseignants — diagrammes (logigrammes)', {
		x: margin,
		y,
		size: 16,
		font: fontBold,
		color: black,
	});
	y -= 26;
	y = drawParagraph(
		page,
		font,
		'Symboles : rectangle = traitement ; losange = test (decision) ; fil avec etiquette = branche Vrai/Faux ou Oui/Non ; point = fusion des branches.\n' +
			'Boucle : fleche de retour explicite vers le debut du **corps** de boucle.\n' +
			'mBlock : noms des blocs selon version / langue — la logique reste la meme.\n' +
			'Source : robot-educatif.info',
		9,
		margin,
		y,
		rgb(0.35, 0.35, 0.38),
	);

	function newPage() {
		page = pdf.addPage([PAGE_W, PAGE_H]);
		return 758;
	}

	for (const p of projects) {
		let yTop = newPage();
		page.drawText(`Projet ${p.n} — ${p.title}`, {
			x: margin,
			y: yTop,
			size: 13,
			font: fontBold,
			color: black,
		});
		yTop -= 20;
		page.drawText('Logigramme', { x: margin, y: yTop, size: 9, font: fontBold, color: rgb(0.15, 0.25, 0.55) });
		yTop -= 14;

		const yAfter = p.draw(page, font, cx, yTop);

		let yTxt = yAfter - 18;
		if (yTxt < 200) {
			yTxt = newPage();
		}
		page.drawText('Corrige detaille', {
			x: margin,
			y: yTxt,
			size: 9,
			font: fontBold,
			color: rgb(0.1, 0.45, 0.22),
		});
		yTxt -= 12;
		yTxt = drawParagraph(page, font, p.corrige, 9, margin, yTxt, black);
	}

	page = pdf.addPage([PAGE_W, PAGE_H]);
	let ya = 780;
	page.drawText('Legende des symboles (rappel ISO / usage courant)', {
		x: margin,
		y: ya,
		size: 13,
		font: fontBold,
		color: black,
	});
	ya -= 22;
	ya = drawParagraph(
		page,
		font,
			'- Rectangle aux coins droits : **processus** (action, calcul, lecture capteur).\n' +
			'- **Losange** : **decision** — une entree, deux sorties (souvent etiquettees oui/non, vrai/faux).\n' +
			'- **Fusion** : les deux branches se rejoignent avant la suite (ou avant un retour de boucle).\n' +
			'- **Boucle** : traitement repete ; la fleche de retour indique ou reprend le flux (ici : debut de la lecture capteur dans la boucle).\n' +
			'- En mBlock, "pour toujours" correspond souvent a cette enveloppe ; le test "si ... alors ... sinon" correspond au losange.',
		9.5,
		margin,
		ya,
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
