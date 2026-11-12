/** Schémas NFC 15-100 + contenus pédagogiques pour le configurateur domotique. */

import {
	buildFunctionalSvg,
	functionalExplanationPoints,
	functionalLegend,
} from './smartHomeFunctionalDiagrams.mjs';

export const WIRE = {
	L: '#ef4444',
	N: '#2563eb',
	O: '#f97316',
	SW: '#cbd5e1',
	IO: '#10b981',
	FP: '#0f172a',
	PE: '#eab308',
};

const SVG_FONT = 'system-ui,sans-serif';
const VB_W = 780;
const VB_H = 420;

const COL1_X = 28;
const COL1_W = 190;
const COL1_R = 218;
const CORR1_A = 218;
const CORR1_B = 302;
const COL2_L = 302;
const COL2_R = 492;
const CORR2_A = 492;
const CORR2_B = 576;
const COL3_L = 576;
const COL3_W = 176;
const RAIL_Y = 62;
const Y_BOX_TOP = 80;
const Y_BOX_BOT = 288;

const CORR1_X = [242, 260, 278];
const CORR2_X = [506, 524, 542];

/** @type {number[]} */
const TERM_Y = [130, 162, 194, 226, 258];

function escapeAttr(s) {
	return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function svgShell(title, inner, aria, legend = true) {
	const legendMarkup = legend
		? `<g class="shuc-svg-legend" font-family="${SVG_FONT}" font-size="11">
    <rect x="28" y="372" width="14" height="14" fill="${WIRE.L}"/><text x="48" y="384" class="shuc-svg-label" fill="#334155">L Phase</text>
    <rect x="118" y="372" width="14" height="14" fill="${WIRE.N}"/><text x="138" y="384" class="shuc-svg-label" fill="#334155">N Neutre</text>
    <rect x="218" y="372" width="14" height="14" fill="${WIRE.O}"/><text x="238" y="384" class="shuc-svg-label" fill="#334155">O / retour lampe</text>
    <rect x="358" y="372" width="14" height="14" fill="${WIRE.SW}"/><text x="378" y="384" class="shuc-svg-label" fill="#334155">SW / S1</text>
    <rect x="468" y="372" width="14" height="14" fill="${WIRE.IO}"/><text x="488" y="384" class="shuc-svg-label" fill="#334155">I / O contact sec</text>
    <rect x="608" y="372" width="14" height="14" fill="${WIRE.FP}"/><text x="628" y="384" class="shuc-svg-label" fill="#334155">Fil pilote</text>
  </g>`
		: `<text x="390" y="384" text-anchor="middle" font-family="${SVG_FONT}" font-size="12" font-weight="700" fill="#0f766e">Liaison radio Thread, pile CR123A, fixation adhésive.</text>`;
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VB_W} ${VB_H}" class="shuc-svg" role="img" aria-label="${escapeAttr(aria)}">
  <rect class="shuc-svg-bg" width="${VB_W}" height="${VB_H}" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
  <text class="shuc-svg-title" x="390" y="34" text-anchor="middle" font-family="${SVG_FONT}" font-size="15" font-weight="700" fill="#0f172a">${title}</text>
  ${inner}
  ${legendMarkup}
</svg>`;
}

/**
 * Boîte composant avec bandeau en-tête.
 * @param {{ x: number, y: number, w: number, h: number, title: string, subtitle?: string }} opts
 */
function compBox({ x, y, w, h, title, subtitle = '' }) {
	const sub =
		subtitle &&
		`<text x="${x + w / 2}" y="${y + 44}" text-anchor="middle" font-family="${SVG_FONT}" font-size="10" class="shuc-svg-muted" fill="#475569">${subtitle}</text>`;
	return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" class="shuc-svg-module" fill="#ffffff" stroke="#475569" stroke-width="2" data-shuc-comp="1"/>
  <rect x="${x}" y="${y}" width="${w}" height="28" rx="8" class="shuc-svg-header" fill="#0f766e"/>
  <text x="${x + w / 2}" y="${y + 19}" text-anchor="middle" font-family="${SVG_FONT}" font-size="12" font-weight="700" class="shuc-svg-module-text" fill="#ffffff">${title}</text>
  ${sub ?? ''}`;
}

function termRight(cy, label) {
	return `<circle cx="${COL1_R}" cy="${cy}" r="4.5" fill="#fff" stroke="#334155" stroke-width="2" class="shuc-svg-term"/>
  <text x="206" y="${cy + 4}" text-anchor="end" font-family="${SVG_FONT}" font-size="11" font-weight="700" class="shuc-svg-module-text" fill="#0f172a">${label}</text>`;
}

function termLeft(cy, label) {
	return `<circle cx="${COL2_L}" cy="${cy}" r="4.5" fill="#fff" stroke="#334155" stroke-width="2" class="shuc-svg-term"/>
  <text x="314" y="${cy + 4}" text-anchor="start" font-family="${SVG_FONT}" font-size="11" font-weight="700" class="shuc-svg-module-text" fill="#0f172a">${label}</text>`;
}

function termRightMod(cy, label) {
	return `<circle cx="${COL2_R}" cy="${cy}" r="4.5" fill="#fff" stroke="#334155" stroke-width="2" class="shuc-svg-term"/>
  <text x="480" y="${cy + 4}" text-anchor="end" font-family="${SVG_FONT}" font-size="11" font-weight="700" class="shuc-svg-module-text" fill="#0f172a">${label}</text>`;
}

function termLeftLoad(cy, label) {
	return `<circle cx="${COL3_L}" cy="${cy}" r="4.5" fill="#fff" stroke="#334155" stroke-width="2" class="shuc-svg-term"/>
  <text x="588" y="${cy + 4}" text-anchor="start" font-family="${SVG_FONT}" font-size="11" font-weight="700" class="shuc-svg-module-text" fill="#0f172a">${label}</text>`;
}

function pillOnCorr1(label, cy) {
	return pill(label, (CORR1_A + CORR1_B) / 2, cy);
}

function pillOnCorr2(label, cy) {
	return pill(label, (CORR2_A + CORR2_B) / 2, cy);
}

function pillOnRail(label, cx = 420) {
	return pill(label, cx, RAIL_Y - 4);
}

function pill(label, cx, cy) {
	const w = Math.max(40, label.length * 6.2 + 14);
	const x = cx - w / 2;
	return `<g class="shuc-svg-pill-group" data-shuc-pill="1">
  <rect x="${x}" y="${cy - 8}" width="${w}" height="16" rx="4" class="shuc-svg-pill" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2"/>
  <text x="${cx}" y="${cy + 4}" text-anchor="middle" font-family="${SVG_FONT}" font-size="10" font-weight="700" class="shuc-svg-wire-label" fill="#0f172a">${label}</text>
</g>`;
}

function wirePath(d, color, strokeW = 3) {
	return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round" data-shuc-wire="1"/>`;
}

function wireLine(x1, y1, x2, y2, color) {
	return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="3" data-shuc-wire="1"/>`;
}

function wago(cx, cy) {
	return `<circle cx="${cx}" cy="${cy}" r="4.5" fill="#fff" stroke="#334155" stroke-width="2"/>`;
}

/** Col1 → Col2 via couloir 1 (xm dans CORR1). */
function route1to2(fromY, toY, xm, color) {
	return wirePath(`M ${COL1_R} ${fromY} H ${xm} V ${toY} H ${COL2_L}`, color);
}

/** Col2 → Col3 via couloir 2. */
function route2to3(fromY, toY, xm, color) {
	return wirePath(`M ${COL2_R} ${fromY} H ${xm} V ${toY} H ${COL3_L}`, color);
}

/** Col1 → Col3 sans passer module (couloir 2 only). */
function route1to3(fromY, toY, xm1, xm2, color) {
	return wirePath(`M ${COL1_R} ${fromY} H ${xm1} V ${toY} H ${xm2} V ${toY} H ${COL3_L}`, color);
}

/** Neutre : montée rail + passage horizontal + dérivation module + suite charge. */
function neutreRail(col1Y, modY, loadY, tapX = 260) {
	const parts = [
		wirePath(`M ${COL1_R} ${col1Y} H ${tapX} V ${RAIL_Y} H 560 V ${loadY} H ${COL3_L}`, WIRE.N),
		wirePath(`M ${tapX} ${RAIL_Y} V ${modY} H ${COL2_L}`, WIRE.N),
		wago(tapX, modY),
		pill('N', 430, RAIL_Y - 4),
	];
	return parts.join('\n  ');
}

function noteBox(text) {
	return `<rect x="28" y="310" width="724" height="34" rx="8" class="shuc-svg-note-box" fill="#ecfdf5" stroke="#99f6e4" stroke-width="1.5"/>
  <text x="390" y="331" text-anchor="middle" font-family="${SVG_FONT}" font-size="12" font-weight="600" class="shuc-svg-note" fill="#0f766e">${text}</text>`;
}

function col1Supply(title = 'Disjoncteur 10 A / 16 A') {
	return `${compBox({ x: COL1_X, y: 80, w: COL1_W, h: 92, title, subtitle: '230 V · L · N' })}
  ${termRight(TERM_Y[0], 'L')}
  ${termRight(TERM_Y[1], 'N')}`;
}

function col1Switch(title = 'Interrupteur mural') {
	return `${compBox({ x: COL1_X, y: 192, w: COL1_W, h: 96, title, subtitle: 'Commande locale' })}
  ${termRight(TERM_Y[3], '▲')}
  ${termRight(TERM_Y[4], '▼')}`;
}

function col2Module(title, subtitle) {
	return `${compBox({ x: COL2_L, y: 80, w: 190, h: 208, title, subtitle })}`;
}

function col3Load(title, subtitle, h = 120) {
	const y = 80 + (208 - h) / 2;
	return `${compBox({ x: COL3_L, y, w: COL3_W, h, title, subtitle })}`;
}

const SCHEMES = {
	'contact-sec-garage': {
		title: 'Porte garage / portail — contact sec sur bornier poussoir',
		buildSvg: () => {
			const yL = TERM_Y[0];
			const yN = TERM_Y[1];
			const yI = TERM_Y[2];
			const yO = TERM_Y[3];
			const mI = TERM_Y[2];
			const mO = TERM_Y[3];
			const loadI = TERM_Y[2];
			const loadO = TERM_Y[3];
			const bpI = TERM_Y[3];
			const bpO = TERM_Y[4];
			return svgShell(
				'Contact sec en parallèle du bouton poussoir (230 V module / I-O moteur)',
				`
  ${col1Supply('Tableau 230 V')}
  ${compBox({ x: COL1_X, y: 192, w: COL1_W, h: 96, title: 'BP mural', subtitle: 'Parallèle I/O' })}
  ${termRight(bpI, 'I')}
  ${termRight(bpO, 'O')}
  ${col2Module('Shelly 1 Mini / Sonoff ZBMINI-R2', 'L In · N · I · O (sec)')}
  ${termLeft(yL, 'L In')}
  ${termLeft(yN, 'N')}
  ${termLeft(mI, 'I')}
  ${termRightMod(mO, 'O')}
  ${col3Load('Carte moteur garage', 'PB START · bornes 2-7', 140)}
  ${termLeftLoad(loadI, 'I')}
  ${termLeftLoad(loadO, 'O')}
  ${route1to2(yL, yL, CORR1_X[0], WIRE.L)}
  ${pillOnCorr1('L 230 V', yL)}
  ${neutreRail(yN, yN, TERM_Y[1])}
  ${route2to3(mI, loadI, CORR2_X[0], WIRE.IO)}
  ${pillOnCorr2('I', (mI + loadI) / 2)}
  ${route2to3(mO, loadO, CORR2_X[1], WIRE.IO)}
  ${pillOnCorr2('O', (mO + loadO) / 2)}
  ${wirePath(`M ${COL2_R} ${mI} H ${CORR2_X[2]} V 300 H ${CORR1_X[1]} V ${bpI} H ${COL1_R}`, WIRE.IO)}
  ${wirePath(`M ${COL2_R} ${mO} H ${CORR2_X[2]} V 304 H ${CORR1_X[0]} V ${bpO} H ${COL1_R}`, WIRE.IO)}
  ${pill('∥ BP', 260, 302)}
  ${noteBox('Contact sec libre de potentiel (0 V envoyé) — télécommandes et cellules photoélectriques d’origine conservées. Auto-Off 0,5–1 s (impulsion).')}
`,
				'Câblage contact sec porte de garage',
			);
		},
		bornier: () => [
			{ terminal: 'L (In)', wire: 'Phase tableau 230 V', role: 'Alimentation module — VAT = 0 V entre L et N' },
			{ terminal: 'N', wire: 'Neutre', role: 'Neutre commun — continuité N ↔ N tableau' },
			{ terminal: 'I', wire: 'Vers borne + ou PB moteur', role: 'Entrée contact sec — pas de 230 V sur I/O' },
			{ terminal: 'O', wire: 'Vers borne − ou PB moteur', role: 'Sortie relais — impulsion 0,5–1 s max' },
			{ terminal: 'PB moteur', wire: 'Parallèle I/O sur START', role: 'Même fonction que le bouton mural existant' },
		],
	},
	'lighting-with-neutral': {
		title: 'Éclairage avec neutre (Shelly 1PM Mini / Sonoff ZBMINI-R2)',
		buildSvg: () => {
			const yL = TERM_Y[0];
			const yN = TERM_Y[1];
			const yO = TERM_Y[2];
			const ySw = TERM_Y[3];
			return svgShell(
				'Commutation avec neutre en boîte DCL',
				`
  ${col1Supply('Arrivée DCL / disjoncteur éclairage')}
  ${col1Switch('Interrupteur mural')}
  ${col2Module('Shelly 1PM Mini / ZBMINI-R2', 'L In · N · O · S1')}
  ${termLeft(yL, 'L In')}
  ${termLeft(yN, 'N')}
  ${termLeft(yO, 'O')}
  ${termRightMod(ySw, 'S1')}
  ${col3Load('Point lumineux DCL', 'L lampe · N · PE', 130)}
  ${termLeftLoad(TERM_Y[0], 'L lampe')}
  ${termLeftLoad(TERM_Y[1], 'N')}
  ${route1to2(yL, yL, CORR1_X[0], WIRE.L)}
  ${pillOnCorr1('L In', yL)}
  ${neutreRail(yN, yN, TERM_Y[1])}
  ${route2to3(yO, TERM_Y[0], CORR2_X[0], WIRE.O)}
  ${pillOnCorr2('O → lampe', (yO + TERM_Y[0]) / 2)}
  ${route1to2(TERM_Y[3], ySw, CORR1_X[1], WIRE.SW)}
  ${pillOnCorr1('S1 / SW', (TERM_Y[3] + ySw) / 2)}
  ${noteBox('Va-et-vient : 2e fil de commande sur S2 si le module le prévoit.')}
`,
				'Éclairage avec neutre',
			);
		},
		bornier: () => [
			{ terminal: 'L In', wire: 'Phase arrivée boîte', role: 'Phase permanente — couper disjoncteur éclairage' },
			{ terminal: 'N', wire: 'Neutre boîte', role: 'Neutre lampe + module' },
			{ terminal: 'O / L Out', wire: 'Vers phase lampe', role: 'Phase commutée vers le luminaire' },
			{ terminal: 'S1 / SW', wire: 'Fil retour interrupteur', role: 'Commande Edge ou Toggle selon HA' },
			{ terminal: 'Terre', wire: 'PE (jaune/vert)', role: 'Mise à la terre du luminaire — ne pas sur module' },
		],
	},
	'lighting-no-neutral': {
		title: 'Éclairage sans neutre (Sonoff ZBMini-L2)',
		buildSvg: () => {
			const yL = TERM_Y[0];
			const yOut = TERM_Y[1];
			const yS1 = TERM_Y[2];
			return svgShell(
				'Montage sans neutre — uniquement fils phase en boîte',
				`
  ${compBox({ x: COL1_X, y: 80, w: COL1_W, h: 92, title: 'Phase unique boîte', subtitle: 'Pas de neutre DCL' })}
  ${termRight(yL, 'L')}
  ${col1Switch('Interrupteur')}
  ${col2Module('Sonoff ZBMini-L2', 'L In · L Out · S1 — sans N')}
  ${termLeft(yL, 'L In')}
  ${termLeft(yOut, 'L Out')}
  ${termRightMod(yS1, 'S1')}
  ${col3Load('Lampe LED', 'Charge min. 3 W', 110)}
  ${termLeftLoad(TERM_Y[0], 'L')}
  ${route1to2(yL, yL, CORR1_X[0], WIRE.L)}
  ${pillOnCorr1('L In', yL)}
  ${route2to3(yOut, TERM_Y[0], CORR2_X[0], WIRE.O)}
  ${pillOnCorr2('L Out', (yOut + TERM_Y[0]) / 2)}
  ${route1to2(TERM_Y[3], yS1, CORR1_X[2], WIRE.SW)}
  ${pillOnCorr1('S1', (TERM_Y[3] + yS1) / 2)}
  ${noteBox('Pas de neutre en boîte : charge minimale LED compatible requise.')}
`,
				'Éclairage sans neutre',
			);
		},
		bornier: () => [
			{ terminal: 'L In', wire: 'Phase unique boîte', role: 'Arrivée phase — vérifier pas de neutre disponible' },
			{ terminal: 'L Out', wire: 'Phase vers lampe', role: 'Sortie commutée' },
			{ terminal: 'S1', wire: 'Fil vers interrupteur', role: 'Mode Edge recommandé pour sans neutre' },
			{ terminal: '—', wire: 'Pas de borne N', role: 'Ne pas dériver un neutre depuis un autre circuit' },
		],
	},
	'volet-4wire': {
		title: 'Volet roulant 4 fils — Shelly Plus 2PM (mode Cover)',
		buildSvg: () => {
			const yL = TERM_Y[0];
			const yN = TERM_Y[1];
			const yO1 = TERM_Y[2];
			const yO2 = TERM_Y[3];
			const yS1 = TERM_Y[4];
			const yS2 = 258;
			return svgShell(
				'Montée / Descente / Neutre / Terre moteur volet',
				`
  ${col1Supply('Disjoncteur volet 10 A')}
  ${compBox({ x: COL1_X, y: 192, w: COL1_W, h: 96, title: 'BP montée / descente', subtitle: 'S1 · S2 existants' })}
  ${termRight(TERM_Y[3], 'S1 ↑')}
  ${termRight(TERM_Y[4], 'S2 ↓')}
  ${col2Module('Shelly Plus 2PM', 'Cover · O1 · O2 · S1 · S2')}
  ${termLeft(yL, 'L')}
  ${termLeft(yN, 'N')}
  ${termRightMod(yO1, 'O1')}
  ${termRightMod(yO2, 'O2')}
  ${termLeft(yS1, 'S1')}
  ${termLeft(yS2, 'S2')}
  ${col3Load('Moteur tubulaire 4 fils', 'M↑ · M↓ · N · PE', 150)}
  ${termLeftLoad(TERM_Y[0], 'M↑')}
  ${termLeftLoad(TERM_Y[1], 'M↓')}
  ${termLeftLoad(TERM_Y[2], 'N')}
  ${route1to2(yL, yL, CORR1_X[0], WIRE.L)}
  ${pillOnCorr1('L', yL)}
  ${neutreRail(yN, yN, TERM_Y[2])}
  ${route2to3(yO1, TERM_Y[0], CORR2_X[0], WIRE.O)}
  ${pillOnCorr2('O1 Montée', (yO1 + TERM_Y[0]) / 2)}
  ${route2to3(yO2, TERM_Y[1], CORR2_X[1], WIRE.O)}
  ${pillOnCorr2('O2 Desc.', (yO2 + TERM_Y[1]) / 2)}
  ${route1to2(TERM_Y[3], yS1, CORR1_X[2], WIRE.SW)}
  ${pillOnCorr1('S1', (TERM_Y[3] + yS1) / 2)}
  ${wirePath(`M ${COL1_R} ${TERM_Y[4]} H ${CORR1_X[1]} V ${yS2} H ${COL2_L}`, WIRE.SW)}
  ${pillOnCorr1('S2', (TERM_Y[4] + yS2) / 2)}
  ${noteBox('Calibrer course + fins de course dans l’app après 1er cycle complet.')}
`,
				'Volet roulant 4 fils',
			);
		},
		bornier: () => [
			{ terminal: 'L', wire: 'Phase 230 V', role: 'Alimentation moteur via module' },
			{ terminal: 'N', wire: 'Neutre moteur', role: 'Neutre commun' },
			{ terminal: 'O1', wire: 'Fil Montée moteur', role: 'Sortie relais montée — inverser si sens wrong' },
			{ terminal: 'O2', wire: 'Fil Descente moteur', role: 'Sortie relais descente' },
			{ terminal: 'S1 / S2', wire: 'Boutons muraux existants', role: 'Entrées impulsionnelles — conserver BP' },
		],
	},
	'fil-pilote': {
		title: 'Radiateur électrique fil pilote 230 V',
		buildSvg: () => {
			const yL = TERM_Y[0];
			const yN = TERM_Y[1];
			const ySw = TERM_Y[2];
			const yFp = TERM_Y[3];
			return svgShell(
				'Phase + neutre + fil pilote via diode 1N4007',
				`
  ${col1Supply('Disjoncteur radiateur')}
  ${col2Module('Shelly 1PM / relais FP', 'L · N · sortie + diode 1N4007')}
  ${termLeft(yL, 'L In')}
  ${termLeft(yN, 'N')}
  ${termRightMod(ySw, 'Sw')}
  ${col3Load('Radiateur électrique', 'L · N · fil pilote noir', 140)}
  ${termLeftLoad(TERM_Y[0], 'L')}
  ${termLeftLoad(TERM_Y[1], 'N')}
  ${termLeftLoad(yFp, 'FP')}
  ${route1to2(yL, yL, CORR1_X[0], WIRE.L)}
  ${pillOnCorr1('L', yL)}
  ${neutreRail(yN, yN, TERM_Y[1])}
  ${wirePath(`M ${COL2_R} ${yL} H ${CORR2_X[0]} V ${TERM_Y[0]} H ${COL3_L}`, WIRE.L)}
  ${pillOnCorr2('L radiateur', (yL + TERM_Y[0]) / 2)}
  ${wirePath(`M ${COL2_R} ${ySw} H ${CORR2_X[1]} V 170`, WIRE.O)}
  ${pillOnCorr2('1N4007', 166)}
  ${wirePath(`M ${CORR2_X[1]} 170 V ${yFp} H ${COL3_L}`, WIRE.FP)}
  ${pillOnCorr2('Fil pilote', (170 + yFp) / 2)}
  ${noteBox('Ordres 4/6 : module dédié FP ou montage diode validé — sonde Zigbee pour Versatile Thermostat.')}
`,
				'Fil pilote radiateur',
			);
		},
		bornier: () => [
			{ terminal: 'L In', wire: 'Phase radiateur', role: 'Couper disjoncteur radiateur — VAT' },
			{ terminal: 'N', wire: 'Neutre', role: 'Neutre radiateur' },
			{ terminal: 'Sortie commutée', wire: 'Anode 1N4007', role: 'Diode sens passant vers fil pilote noir' },
			{ terminal: 'Fil pilote (noir)', wire: 'Après diode', role: 'Ordre Arrêt / Hors-gel — pas de 230 V direct sur FP' },
			{ terminal: 'Sonde Zigbee', wire: '— (sans fil)', role: 'Température pièce dans Versatile Thermostat HA' },
		],
	},
	'contacteur-hc': {
		title: 'Chauffe-eau — contacteur Heures Creuses',
		buildSvg: () => {
			const yL = TERM_Y[0];
			const yN = TERM_Y[1];
			return svgShell(
				'Commande bobine A1/A2 + mesure puissance',
				`
  ${col1Supply('Disjoncteur 2 A commande')}
  ${col2Module('Shelly Plus 1PM + contacteur HC', 'Bobine A1/A2 · mesure conso')}
  ${termLeft(yL, 'L cmd')}
  ${termLeft(yN, 'N')}
  ${termRightMod(TERM_Y[2], '→ A1/A2')}
  ${termRightMod(TERM_Y[3], 'L charge')}
  ${col3Load('Ballon ECS', 'Après contacteur HC', 120)}
  ${termLeftLoad(TERM_Y[0], 'L')}
  ${termLeftLoad(TERM_Y[1], 'N')}
  ${route1to2(yL, yL, CORR1_X[0], WIRE.L)}
  ${pillOnCorr1('L commande', yL)}
  ${neutreRail(yN, yN, TERM_Y[1])}
  ${route2to3(TERM_Y[3], TERM_Y[0], CORR2_X[0], WIRE.O)}
  ${pillOnCorr2('Phase ballon', (TERM_Y[3] + TERM_Y[0]) / 2)}
  ${noteBox('Disjoncteur 2 A sur circuit commande — intervention tableau par pro si doute.')}
`,
				'Contacteur chauffe-eau',
			);
		},
		bornier: () => [
			{ terminal: 'A1 / A2', wire: 'Bobine contacteur 230 V', role: 'Circuit commande protégé 2 A' },
			{ terminal: 'L charge', wire: 'Phase après contacteur', role: 'Mesure conso sur Shelly 1PM si en série' },
			{ terminal: 'N', wire: 'Neutre bobine + charge', role: 'Neutre commun tableau' },
			{ terminal: 'Télérupteur HC', wire: 'Fil bleu HC (selon contrat)', role: 'Synchroniser automatisation HA sur plages HC' },
		],
	},
	'linky-tic-ct': {
		title: 'Linky / tableau — TIC ou pince CT',
		buildSvg: () =>
			svgShell(
				'Téléinfo I1 I2 A ou tore CT sur phase',
				`
  ${compBox({ x: COL1_X, y: 90, w: COL1_W, h: 100, title: 'Linky / TIC', subtitle: 'I1 · I2 · A' })}
  ${termRight(TERM_Y[2], 'I1-I2')}
  ${col2Module('Shelly Pro 3EM / EM', 'Entrées TIC ou CT')}
  ${termLeft(TERM_Y[2], 'I1/I2')}
  ${termRightMod(TERM_Y[0], 'CT L')}
  ${col3Load('Tore CT', 'K → L · phase unique', 100)}
  ${termLeftLoad(TERM_Y[0], 'K→L')}
  ${route1to2(TERM_Y[2], TERM_Y[2], CORR1_X[1], WIRE.SW)}
  ${pillOnCorr1('TIC', TERM_Y[2])}
  ${route2to3(TERM_Y[0], TERM_Y[0], CORR2_X[1], WIRE.L)}
  ${pillOnCorr2('Phase K→L', TERM_Y[0])}
  ${noteBox('CT : flèche K vers L — un seul fil phase dans le tore.')}
`,
				'Suivi conso Linky ou CT',
			),
		bornier: () => [
			{ terminal: 'I1 / I2 / A', wire: 'Bornier TIC Linky', role: 'Module téléinfo homologué — câble court blindé' },
			{ terminal: 'CT K → L', wire: 'Phase principale', role: 'Sens de mesure — pas de neutre dans le tore' },
			{ terminal: 'N / L module', wire: 'Alimentation 3EM', role: 'Disjoncteur dédié mesure si DIN' },
		],
	},
	'ha-zigbee-usb': {
		title: 'Home Assistant + coordinateur Zigbee USB',
		buildSvg: () =>
			svgShell(
				'Rallonge USB 2.0 blindée ≥ 1 m — loin USB 3 et Wi-Fi 2,4 GHz',
				`
  ${compBox({ x: COL1_X, y: 100, w: COL1_W, h: 88, title: 'HA Green / Pi 5', subtitle: 'Port USB 2.0' })}
  ${termRight(TERM_Y[2], 'USB')}
  ${compBox({ x: COL2_L, y: 118, w: 190, h: 56, title: 'Rallonge USB 2.0', subtitle: 'Blindée ≥ 1 m' })}
  ${termLeft(TERM_Y[2], 'IN')}
  ${termRightMod(TERM_Y[2], 'OUT')}
  ${col3Load('ZBDongle-E / SLZB-06', 'Coordinateur Zigbee EU', 100)}
  ${termLeftLoad(TERM_Y[2], 'USB')}
  ${route1to2(TERM_Y[2], TERM_Y[2], CORR1_X[1], WIRE.SW)}
  ${pillOnCorr1('USB 2.0', TERM_Y[2])}
  ${route2to3(TERM_Y[2], TERM_Y[2], CORR2_X[1], WIRE.SW)}
  ${pillOnCorr2('Dongle', TERM_Y[2])}
  ${noteBox('Canal Zigbee 25 (EU) — clé loin du routeur Wi-Fi · ZHA ou Zigbee2MQTT.')}
`,
				'Coordinateur Zigbee USB',
			),
		bornier: () => [
			{ terminal: 'USB HA', wire: 'Port USB 2.0 (pas 3.0)', role: 'Alimentation dongle 5 V — hub alimenté si besoin' },
			{ terminal: 'Antenne', wire: '—', role: 'Dongle vertical, 1 m du routeur Wi-Fi' },
			{ terminal: 'Ethernet / Wi-Fi', wire: 'Box HA', role: 'IP fixe ou réservation DHCP' },
		],
	},
	'matter-contact': {
		title: 'Capteur d’ouverture Thread / Matter — sans fil',
		buildSvg: () =>
			svgShell(
				'Aqara P2 — pile CR123A, aucun 230 V',
				`
  ${compBox({ x: COL1_X, y: 100, w: COL1_W, h: 88, title: 'Routeur Thread', subtitle: 'Déjà allumé dans la maison' })}
  ${termRight(TERM_Y[2], 'LAN')}
  ${compBox({ x: COL2_L, y: 118, w: 190, h: 72, title: 'Matter', subtitle: 'QR de la notice' })}
  ${termLeft(TERM_Y[2], '◉')}
  ${termRightMod(TERM_Y[2], '◉')}
  ${col3Load('Capteur P2 + aimant', 'Adhésif · volet sec', 110)}
  ${termLeftLoad(TERM_Y[2], '◉')}
  ${wirePath(`M ${COL1_R} ${TERM_Y[2]} H ${CORR1_X[1]} V ${TERM_Y[2]} H ${COL2_L}`, WIRE.IO)}
  ${wirePath(`M ${COL2_R} ${TERM_Y[2]} H ${CORR2_X[1]} V ${TERM_Y[2]} H ${COL3_L}`, WIRE.IO)}
  ${pillOnCorr2('Thread', TERM_Y[2])}
  ${noteBox('Notice : intérieur seulement, hors humidité. Fixation adhésive.')}
`,
				'Capteur de volet, liaison radio',
				false,
			),
		bornier: () => [
			{ terminal: 'Boîtier', wire: 'Aucun fil', role: 'Pile CR123A déjà en place, languette à retirer' },
			{ terminal: 'Aimant plat', wire: 'Ligne d’alignement', role: 'Face au boîtier quand le volet est fermé' },
			{ terminal: 'App Matter', wire: 'QR ou code chiffré', role: 'Routeur de bordure Thread requis — pas de ZHA' },
		],
	},
	'zigbee-sensor': {
		title: 'Capteur Zigbee (ouverture / température)',
		buildSvg: () =>
			svgShell(
				'Capteur sur pile — pas de câblage 230 V',
				`
  ${compBox({ x: COL1_X, y: 100, w: COL1_W, h: 88, title: 'Coordinateur Zigbee', subtitle: 'ZHA / Z2M · canal 25' })}
  ${termRight(TERM_Y[2], 'RF')}
  ${compBox({ x: COL2_L, y: 118, w: 190, h: 72, title: 'Maillage Zigbee', subtitle: '868 MHz · pas de fil' })}
  ${termLeft(TERM_Y[2], '◉')}
  ${termRightMod(TERM_Y[2], '◉')}
  ${col3Load('Capteur Aqara / SONOFF', 'Pile · appairage 1 m', 110)}
  ${termLeftLoad(TERM_Y[2], '◉')}
  ${wirePath(`M ${COL1_R} ${TERM_Y[2]} H ${CORR1_X[1]} V ${TERM_Y[2]} H ${COL2_L}`, WIRE.IO)}
  ${wirePath(`M ${COL2_R} ${TERM_Y[2]} H ${CORR2_X[1]} V ${TERM_Y[2]} H ${COL3_L}`, WIRE.IO)}
  ${pillOnCorr2('Radio Zigbee', TERM_Y[2])}
  ${noteBox('Appairage à 1 m du coordinateur — pile polarité respectée.')}
`,
				'Capteur Zigbee sans fil',
			),
		bornier: () => [
			{ terminal: '—', wire: 'Aucun 230 V', role: 'Fixation mécanique + appairage ZHA / Z2M' },
			{ terminal: 'Pile', wire: 'CR2032 / AAA', role: 'Polarité — remplacement tous les 12–24 mois' },
		],
	},
	'smart-plug': {
		title: 'Prise connectée — suivi conso',
		buildSvg: () =>
			svgShell(
				'Prise entre mur et appareil — pas d’ouverture tableau',
				`
  ${compBox({ x: COL1_X, y: 110, w: COL1_W, h: 78, title: 'Prise murale 230 V', subtitle: 'Standard FR' })}
  ${termRight(TERM_Y[2], 'L')}
  ${col2Module('Shelly / Tapo plug', 'Mesure power_w · ON/OFF')}
  ${termLeft(TERM_Y[2], 'L In')}
  ${termRightMod(TERM_Y[2], 'L Out')}
  ${col3Load('Appareil', 'Lave-linge · TV · charge', 90)}
  ${termLeftLoad(TERM_Y[2], 'L')}
  ${route1to2(TERM_Y[2], TERM_Y[2], CORR1_X[1], WIRE.L)}
  ${pillOnCorr1('L', TERM_Y[2])}
  ${route2to3(TERM_Y[2], TERM_Y[2], CORR2_X[1], WIRE.O)}
  ${pillOnCorr2('Charge', TERM_Y[2])}
  ${noteBox('Seuil alerte conso dans HA (lave-linge, veille TV…).')}
`,
				'Prise mesure conso',
			),
		bornier: () => [
			{ terminal: 'Prise murale', wire: 'Standard FR', role: 'Pas de modification encastrée' },
			{ terminal: 'Entité energy', wire: '—', role: 'Tableau Énergie HA — sensor power_w' },
		],
	},
	'wall-tablet-usb': {
		title: 'Tablette murale — Alimentation 5 V USB-C & Réseau Wi-Fi local',
		buildSvg: () =>
			svgShell(
				'Alimentation USB 5 V (cycle 25–80 %) + Liaison Wi-Fi vers Home Assistant',
				`
  ${compBox({ x: COL1_X, y: 96, w: COL1_W, h: 92, title: 'Prise + Chargeur 5 V', subtitle: 'Smart Plug 25–80 % · USB CE' })}
  ${termRight(TERM_Y[1], '5V')}
  ${compBox({ x: COL1_X, y: 204, w: COL1_W, h: 78, title: 'Serveur Home Assistant', subtitle: 'LAN :8123 · PIR / mmWave' })}
  ${termRight(TERM_Y[3], 'LAN')}
  ${compBox({ x: COL2_L, y: 112, w: 190, h: 120, title: 'Câble coudé 90° & Wi-Fi', subtitle: 'Aucun 230 V encastré' })}
  ${termLeft(TERM_Y[1], 'USB')}
  ${termLeft(TERM_Y[3], 'Wi-Fi')}
  ${termRightMod(TERM_Y[2], '90°')}
  ${col3Load('Tablette murale HA', 'Fully Kiosk · Dashboard', 108)}
  ${termLeftLoad(TERM_Y[2], 'USB-C')}
  ${wirePath(`M ${COL1_R} ${TERM_Y[1]} H ${CORR1_X[0]} V ${TERM_Y[1]} H ${COL2_L}`, WIRE.O)}
  ${pillOnCorr1('5 V USB', TERM_Y[1])}
  ${wirePath(`M ${COL1_R} ${TERM_Y[3]} H ${CORR1_X[2]} V ${TERM_Y[3]} H ${COL2_L}`, WIRE.IO)}
  ${pillOnCorr1('Wi-Fi', TERM_Y[3])}
  ${wirePath(`M ${COL2_R} ${TERM_Y[2]} H ${CORR2_X[1]} V ${TERM_Y[2]} H ${COL3_L}`, WIRE.O)}
  ${pillOnCorr2('Coudé 90°', TERM_Y[2])}
  ${noteBox('Basse tension 5 V USB uniquement — limitez la charge à 80 % (option native ou prise connectée).')}
`,
				'Alimentation USB 5 V et liaison Wi-Fi de la tablette murale Home Assistant',
			),
		bornier: () => [
			{ terminal: 'Port USB-C tablette', wire: 'Connecteur coudé 90°', role: 'Alimentation 5 V sans torsion dans le cadre mural' },
			{ terminal: 'Chargeur USB 5 V', wire: 'Bloc secteur 10–18 W CE', role: 'Branché sur prise existante (ou prise connectée 25–80 %)' },
			{ terminal: 'Réseau Wi-Fi LAN', wire: 'IP fixe (DHCP statique)', role: 'Connexion vers Home Assistant (:8123) et API Fully Kiosk (:2323)' },
		],
	},
};

/** @type {Record<string, string>} */
export const USE_CASE_SCHEME = {
	'garage-porte-smartphone': 'contact-sec-garage',
	'portail-electrique': 'contact-sec-garage',
	'boite-lettres-colis': 'matter-contact',
	'sonnette-carillon-photo': 'zigbee-sensor',
	'volets-roulants-filaires': 'volet-4wire',
	'store-banne-soleil-vent': 'zigbee-sensor',
	'rideaux-switchbot': 'zigbee-sensor',
	'eclairage-sans-neutre': 'lighting-no-neutral',
	'va-et-vient-domotise': 'lighting-with-neutral',
	'presence-couloir-wc': 'lighting-with-neutral',
	'dimmer-spots-led': 'lighting-with-neutral',
	'radiateurs-robinets': 'zigbee-sensor',
	'radiateur-fil-pilote-electric': 'fil-pilote',
	'chaudiere-contact-sec': 'contact-sec-garage',
	'chauffe-eau-heures-creuses': 'contacteur-hc',
	'vmc-humidite-sdb': 'lighting-with-neutral',
	'conso-tableau-solaire': 'linky-tic-ct',
	'alerte-lave-linge': 'smart-plug',
	'coupure-veilles': 'smart-plug',
	'secours-ups-box': 'ha-zigbee-usb',
	'alerte-congelateur-cave': 'zigbee-sensor',
	'camera-solaire-exterieure': 'zigbee-sensor',
	'box-home-assistant-locale': 'ha-zigbee-usb',
	'portillon-gache-electrique-connectee': 'contact-sec-garage',
	'serrure-connectee-cylindre-europeen': 'zigbee-sensor',
	'clavier-code-exterieur-connecte': 'contact-sec-garage',
	'domotiser-interphone-existant': 'contact-sec-garage',
	'ouverture-portail-approche-voiture': 'contact-sec-garage',
	'eclairage-allee-ouverture-portail': 'lighting-with-neutral',
	'detecteur-place-parking-garage': 'zigbee-sensor',
	'alerte-portillon-jardin-ouvert': 'zigbee-sensor',
	'verrouillage-nocturne-porte-garage': 'contact-sec-garage',
	'boite-a-colis-connectee-livraison': 'zigbee-sensor',
	'centraliser-volets-roulants-bouton-unique': 'volet-4wire',
	'volets-automatiques-canicule-soleil': 'zigbee-sensor',
	'motoriser-volet-sangle-manivelle': 'zigbee-sensor',
	'velux-fenetre-toit-pluie-connectee': 'zigbee-sensor',
	'pergola-bioclimatique-connectee': 'volet-4wire',
	'store-enrouleur-interieur-motorise': 'zigbee-sensor',
	'arrosage-automatique-jardin-meteo': 'zigbee-sensor',
	'electrovanne-arrosage-multizone-connectee': 'volet-4wire',
	'sonde-humidite-sol-potager-zigbee': 'zigbee-sensor',
	'serre-jardin-temperature-ouverture': 'zigbee-sensor',
	'porte-poulailler-automatique-connectee': 'contact-sec-garage',
	'robot-tondeuse-meteo-home-assistant': 'zigbee-sensor',
	'domotiser-telerupteur-tableau-electrique': 'lighting-with-neutral',
	'ruban-led-cuisine-detection-mouvement': 'lighting-with-neutral',
	'eclairage-escalier-automatique-nuit': 'lighting-with-neutral',
	'detecteur-presence-radar-mmwave': 'lighting-with-neutral',
	'projecteur-exterieur-detecteur-connecte': 'lighting-with-neutral',
	'eclairage-circadien-biologique-home-assistant': 'lighting-with-neutral',
	'interrupteur-mode-decouple-ampoule-zigbee': 'lighting-no-neutral',
	'creer-va-et-vient-sans-fil-zigbee': 'lighting-with-neutral',
	'eclairage-automatique-placard-dressing': 'lighting-with-neutral',
	'minuterie-cave-couloir-connectee': 'lighting-with-neutral',
	'simulation-presence-eclairage-vacances': 'lighting-with-neutral',
	'eclairage-salle-de-bain-mode-nuit': 'lighting-with-neutral',
	'eclairage-jardin-basse-tension-connecte': 'lighting-with-neutral',
	'piloter-climatisation-pac-air-air': 'contact-sec-garage',
	'connecter-poele-a-granules': 'contact-sec-garage',
	'plancher-chauffant-hydraulique-connecte': 'zigbee-sensor',
	'thermostat-plancher-chauffant-electrique': 'fil-pilote',
	'seche-serviettes-connecte-programmation': 'fil-pilote',
	'couper-chauffage-fenetre-ouverte': 'zigbee-sensor',
	'circulateur-bouclage-ecs-connecte': 'lighting-with-neutral',
	'capteur-co2-qualite-air-interieur': 'zigbee-sensor',
	'deshumidificateur-automatique-cave-buanderie': 'lighting-with-neutral',
	'ventilateur-automatique-temperature-ete': 'smart-plug',
	'chauffage-hors-gel-residence-secondaire': 'zigbee-sensor',
	'chauffage-multizone-sonde-deportee': 'zigbee-sensor',
	'filtration-piscine-temperature-eau-connectee': 'contacteur-hc',
	'routeur-solaire-surplus-chauffe-eau': 'contacteur-hc',
	'suivre-production-kit-solaire-balcon': 'smart-plug',
	'delestage-electrique-automatique-linky': 'linky-tic-ct',
	'prise-renforcee-recharge-voiture-heures-creuses': 'contacteur-hc',
	'alerte-fin-seche-linge-lave-vaisselle': 'smart-plug',
	'compteur-eau-connecte-impulsions': 'smart-plug',
	'niveau-cuve-eau-pluie-ultrason': 'zigbee-sensor',
	'automatisation-edf-tempo-jours-rouges': 'linky-tic-ct',
	'mesurer-consommation-pompe-a-chaleur': 'linky-tic-ct',
	'piscine-filtration-surplus-solaire': 'contacteur-hc',
	'prise-connectee-exterieure-etanche-jardin': 'smart-plug',
	'couper-chargeur-velo-trottinette-fin-charge': 'smart-plug',
	'detecter-talon-consommation-electrique': 'linky-tic-ct',
	'detecteur-fuite-eau-zigbee-alerte': 'zigbee-sensor',
	'vanne-eau-motorisee-coupure-fuite': 'contact-sec-garage',
	'detecteur-fumee-connecte-zigbee': 'zigbee-sensor',
	'detecteur-monoxyde-carbone-connecte': 'zigbee-sensor',
	'alarme-maison-home-assistant-alarmo': 'ha-zigbee-usb',
	'sirene-connectee-zigbee-alarme': 'zigbee-sensor',
	'capteur-vibration-bris-vitre-zigbee': 'zigbee-sensor',
	'sauvegarde-automatique-home-assistant': 'ha-zigbee-usb',
	'acces-distance-securise-home-assistant': 'ha-zigbee-usb',
	'tablette-murale-dashboard-home-assistant': 'wall-tablet-usb',
	'bouton-urgence-senior-maintien-domicile': 'zigbee-sensor',
	'veilleuse-automatique-pied-de-lit': 'lighting-with-neutral',
	'detection-presence-famille-ble-home-assistant': 'ha-zigbee-usb',
	'buanderie-sechage-linge-humidite-connectee': 'lighting-with-neutral',
	'redemarrage-automatique-box-internet-watchdog': 'smart-plug',
	'etendre-portee-reseau-zigbee-routeurs': 'ha-zigbee-usb',
};

function ecoExplanation(eco, tech) {
	if (eco === 'wifi-sans-box')
		return 'Écosystème Wi-Fi local (Shelly / app mobile) : pas de box domotique obligatoire, latence faible, chaque module reste autonome. Idéal pour 1–3 points.';
	if (eco === 'ha-zigbee')
		return 'Home Assistant + Zigbee (ZHA ou Zigbee2MQTT) : automatisations locales, pas de cloud, mesh Zigbee pour capteurs sur pile. Coordinateur USB obligatoire (ZBDongle-E, SLZB-06 ou ZBT-2).';
	if (eco === 'maker-esp32')
		return 'Montage maker ESP32 / ESPHome : coût minimal, câblage relais GPIO — réservé aux profils à l’aise avec firmware et sécurité contact sec.';
	if (tech === 'zigbee-no-n')
		return 'Contrainte sans neutre : module Sonoff ZBMini-L2 ou Shelly Dimmer adapté — jamais de neutre « emprunté » depuis un autre circuit.';
	return 'Choisissez le module compatible avec votre boîte (profondeur 50 mm, chaussette DCL) et la charge (LED, moteur, fil pilote).';
}

function pairingStep(eco) {
	if (eco === 'wifi-sans-box') return 'App Shelly Smart Control ou app Sonoff — ajout Wi-Fi 2,4 GHz, puis intégration optionnelle Home Assistant (intégration native Shelly).';
	if (eco === 'ha-zigbee') return 'Home Assistant → Paramètres → Appareils : ZHA « Ajouter » ou Zigbee2MQTT « Permit join » — maintenir le bouton du module 5 s.';
	return 'Flash ESPHome via USB, Wi-Fi local, entités exposées à Home Assistant.';
}

function yamlFor(ctx) {
	if (ctx.useCaseId === 'boite-lettres-colis') {
		return `# Notification à l'ouverture du volet. Aucune commande.
# Remplacez entity_id par celui de l'intégration Matter.
# Vérifiez dans Outils de développement → États si "on" veut dire ouvert.
# Cet exemple n'a pas été chargé sur une installation du site.
alias: Boite aux lettres — volet ouvert
mode: single
max_exceeded: silent
trigger:
  - platform: state
    entity_id: binary_sensor.boite_aux_lettres
    to: "on"
condition:
  - condition: time
    after: "07:00:00"
    before: "21:00:00"
action:
  - service: notify.mobile_app
    data:
      title: "Boîte aux lettres"
      message: "Le volet vient de s'ouvrir."
  - delay: "00:02:00"
`;
	}
	const id = ctx.useCaseId.replace(/-/g, '_');
	const isGarageLike =
		ctx.useCaseId.includes('garage') ||
		ctx.useCaseId.includes('portail') ||
		ctx.useCaseId === 'chaudiere-contact-sec';
	if (isGarageLike) {
		return `# Sécurité : notification si porte/portail ouvert trop longtemps
# NE JAMAIS déclencher le moteur sur un simple changement d'état du capteur !
alias: ${id}_alerte_ouverture_prolongee
description: Alerte oubli — aucune commande moteur automatique
mode: single
trigger:
  # Capteur reed / contact : état « ouvert »
  - platform: state
    entity_id: binary_sensor.${id}_contact
    to: "on"
    for: "00:15:00"
condition: []
action:
  - service: notify.mobile_app
    data:
      title: "Porte / accès ouvert"
      message: "L'accès reste ouvert depuis 15 minutes — vérifiez manuellement."
  - service: persistent_notification.create
    data:
      title: "Domotique — oubli possible"
      message: "binary_sensor.${id}_contact ouvert > 15 min. Pas d'impulsion moteur envoyée."

# Commande manuelle sécurisée (bouton dashboard uniquement) :
# alias: ${id}_impulsion_manuelle
# trigger: event ou input_button
# action: switch.turn_on → delay 0,5 s → switch.turn_off
`;
	}
	return `# Automatisation locale ${ctx.useCaseTitle.slice(0, 48)}…
alias: domotique_${id}_exemple
mode: single
trigger:
  - platform: state
    entity_id: binary_sensor.${id}_capteur
    to: "on"
condition: []
action:
  - service: notify.mobile_app
    data:
      message: "Événement détecté sur ${id} — adaptez entity_id à vos appareils."
`;
}

/**
 * @param {{ useCaseId: string, ecosystem: string, techId: string | null, useCaseTitle: string }} ctx
 */
export function getWiringGuide(ctx) {
	const schemeId = USE_CASE_SCHEME[ctx.useCaseId] ?? 'zigbee-sensor';
	const scheme = SCHEMES[schemeId];
	const eco = ctx.ecosystem;
	const tech = ctx.techId;

	const isMailbox = ctx.useCaseId === 'boite-lettres-colis';
	const explanation = isMailbox
		? [
				'Capteur à pile, sans fil et sans 230 V. L’Aqara Door and Window Sensor P2 parle Thread et Matter. Il ne s’associe pas à un coordinateur Zigbee.',
				'La notice (DW-S02E / DW-S02D) le réserve à l’intérieur et interdit l’humidité. Une boîte aux lettres de rue exposée à la pluie sort de cet usage.',
			]
		: [
		ecoExplanation(eco, tech),
		scheme.title + ' : le matériel proposé dans votre liste correspond à ce schéma bornier. Vérifiez la notice constructeur (Shelly, Sonoff, motorisation) avant mise sous tension.',
		ctx.useCaseId.includes('garage') || ctx.useCaseId.includes('portail') || schemeId === 'contact-sec-garage'
			? 'Communication : le module reçoit la commande smartphone / HA et ferme le contact sec I–O comme un bouton poussoir (impulsion 0,5–1 s). Un capteur d’ouverture Zigbee remonte l’état réel du battant.'
			: 'Communication : capteurs Zigbee → coordinateur → Home Assistant (MQTT ou ZHA). Actionneurs Wi-Fi ou Zigbee selon recette.',
	];

	const installSteps = isMailbox
		? [
				{
					title: 'Emplacement',
					body: 'Volume sec, à l’intérieur ou sous un abri qui ne prend pas la pluie. Volet qui s’ouvre franchement. Sinon, ne collez pas ce capteur.',
				},
				{
					title: 'Routeur de bordure',
					body: 'Il doit déjà être allumé (Apple TV 4K, HomePod mini, Nest Hub, Echo compatible, Home Assistant avec radio Thread, ou Hub Aqara M3). Un dongle Zigbee ne convient pas.',
				},
				{
					title: 'Appairage',
					body: 'Retirez la languette. Si la diode ne respire pas, maintenez le bouton de réinitialisation 5 secondes jusqu’au clignotement. Scannez le QR Matter.',
				},
				{
					title: 'Collage',
					body: 'Lignes d’alignement face à face, essai à la main avant l’adhésif. Volet fermé = fermé, volet ouvert = ouvert.',
				},
				{
					title: 'Notification',
					body: 'Un message à l’ouverture, mode single et une attente de 2 minutes pour ignorer la fermeture juste après. Aucune commande de relais.',
				},
			]
		: [
		{
			title: 'Sécurité & repérage',
			body: 'Coupez le disjoncteur divisionnaire, contrôlez l’absence de tension (VAT) entre L et N. Repérez L, N, retour lampe / fil pilote dans la boîte (profondeur 50 mm ou chaussette DCL).',
		},
		{
			title: 'Câblage bornier',
			body: 'Raccordez fil par fil selon le tableau ci-dessous. Utilisez des Wago 221, pas de domino vissé desserré. Reserrage vis bornier module 0,5 N·m.',
		},
		{
			title: 'Appairage',
			body: pairingStep(eco),
		},
		{
			title: 'Paramètres indispensables',
			body:
				schemeId === 'contact-sec-garage'
					? 'Type de switch : Momentary / Impulse. Auto-Off 0,5 à 1 s. Edge interdit sur entrée moteur.'
					: schemeId === 'volet-4wire'
						? 'Mode Cover, calibration haut/bas, temps de montée. Conserver boutons S1/S2.'
						: schemeId === 'lighting-no-neutral'
							? 'Type Edge, charge LED compatible min. 3 W.'
							: schemeId === 'fil-pilote'
								? 'Versatile Thermostat + entité fil pilote — consigne hors-gel / confort.'
								: 'Edge ou Toggle selon interrupteur. Ajouter entité energy pour le tableau Énergie HA.',
		},
		{
			title: 'Automatisation',
			body: 'Copiez le YAML ci-dessous dans Éditeur YAML ou Créer automatisation → mode YAML. Adaptez entity_id à vos appareils.',
		},
	];

	const funcCtx = { useCaseId: ctx.useCaseId, ecosystem: eco, useCaseTitle: ctx.useCaseTitle };
	return {
		schemeId,
		schemeTitle: scheme.title,
		explanation,
		functionalSvg: buildFunctionalSvg(funcCtx),
		functionalPoints: functionalExplanationPoints(funcCtx),
		functionalLegend: functionalLegend(funcCtx),
		svg: scheme.buildSvg(),
		bornier: scheme.bornier({ tech, eco }),
		installSteps,
		yaml: yamlFor(ctx),
	};
}

export const REFERENCE_SCHEMES = [
	'contact-sec-garage',
	'lighting-with-neutral',
	'lighting-no-neutral',
	'volet-4wire',
	'fil-pilote',
	'contacteur-hc',
	'linky-tic-ct',
	'ha-zigbee-usb',
];

export function getReferenceScheme(id) {
	const s = SCHEMES[id];
	if (!s) return null;
	return { id, title: s.title, svg: s.buildSvg(), bornier: s.bornier({}) };
}

/** @param {string} id */
export function buildSchemeSvgForVerify(id) {
	const s = SCHEMES[id];
	return s ? s.buildSvg() : null;
}

export const SCHEME_IDS = Object.keys(SCHEMES);
