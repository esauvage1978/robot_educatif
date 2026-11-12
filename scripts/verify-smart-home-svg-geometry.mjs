#!/usr/bin/env node
/**
 * Vérifie géométrie des schémas domotique : fils vs boîtes, chevauchements texte/badges.
 */
import { SCHEME_IDS, buildSchemeSvgForVerify } from '../src/data/smartHomeWiringGuides.mjs';

const MARGIN = 3;

/** @param {string} svg */
function parseComponentBoxes(svg) {
	const re = /<rect[^>]*data-shuc-comp="1"[^>]*\/?>/g;
	const boxes = [];
	let m;
	while ((m = re.exec(svg))) {
		const tag = m[0];
		const x = num(tag, 'x');
		const y = num(tag, 'y');
		const w = num(tag, 'width');
		const h = num(tag, 'height');
		if (x != null && y != null && w != null && h != null) boxes.push({ x, y, w, h });
	}
	return boxes;
}

function num(tag, attr) {
	const r = new RegExp(`${attr}="([^"]+)"`);
	const m = tag.match(r);
	return m ? parseFloat(m[1]) : null;
}

/** @returns {{ x1: number, y1: number, x2: number, y2: number }[]} */
function parseWireSegments(svg) {
	/** @type {{ x1: number, y1: number, x2: number, y2: number }[]} */
	const segs = [];
	const lineRe = /<line[^>]*data-shuc-wire="1"[^>]*\/?>/g;
	let m;
	while ((m = lineRe.exec(svg))) {
		const t = m[0];
		segs.push({
			x1: num(t, 'x1'),
			y1: num(t, 'y1'),
			x2: num(t, 'x2'),
			y2: num(t, 'y2'),
		});
	}
	const pathRe = /<path[^>]*data-shuc-wire="1"[^>]*d="([^"]+)"[^>]*\/?>/g;
	while ((m = pathRe.exec(svg))) {
		segs.push(...pathToSegments(m[1]));
	}
	return segs.filter((s) => s.x1 != null && s.y1 != null && s.x2 != null && s.y2 != null);
}

/** @param {string} d */
function pathToSegments(d) {
	/** @type {{ x1: number, y1: number, x2: number, y2: number }[]} */
	const segs = [];
	const tokens = d.trim().split(/\s+/);
	let i = 0;
	let cx = 0;
	let cy = 0;
	let sx = 0;
	let sy = 0;
	while (i < tokens.length) {
		const cmd = tokens[i];
		if (cmd === 'M') {
			cx = parseFloat(tokens[++i]);
			cy = parseFloat(tokens[++i]);
			sx = cx;
			sy = cy;
			i++;
		} else if (cmd === 'H') {
			const nx = parseFloat(tokens[++i]);
			segs.push({ x1: cx, y1: cy, x2: nx, y2: cy });
			cx = nx;
			i++;
		} else if (cmd === 'V') {
			const ny = parseFloat(tokens[++i]);
			segs.push({ x1: cx, y1: cy, x2: cx, y2: ny });
			cy = ny;
			i++;
		} else if (cmd.startsWith('M') && cmd.length > 1) {
			// M218130 style rare
			i++;
		} else {
			i++;
		}
	}
	return segs;
}

/** Segment traverse l'intérieur strict de la boîte (pas le bord). */
function segmentCrossesBoxInterior(seg, box) {
	const { x, y, w, h } = box;
	const ix0 = x + MARGIN;
	const iy0 = y + MARGIN;
	const ix1 = x + w - MARGIN;
	const iy1 = y + h - MARGIN;
	if (ix1 <= ix0 || iy1 <= iy0) return false;

	const x1 = seg.x1;
	const y1 = seg.y1;
	const x2 = seg.x2;
	const y2 = seg.y2;

	if (Math.abs(y1 - y2) < 0.01) {
		const yy = y1;
		if (yy <= iy0 || yy >= iy1) return false;
		const lo = Math.min(x1, x2);
		const hi = Math.max(x1, x2);
		return hi > ix0 && lo < ix1;
	}
	if (Math.abs(x1 - x2) < 0.01) {
		const xx = x1;
		if (xx <= ix0 || xx >= ix1) return false;
		const lo = Math.min(y1, y2);
		const hi = Math.max(y1, y2);
		return hi > iy0 && lo < iy1;
	}
	return false;
}

/** @typedef {{ x: number, y: number, w: number, h: number, kind: string }} BBox */

function isFullyInside(b, box, inset = 4) {
	return (
		b.x >= box.x + inset &&
		b.y >= box.y + inset &&
		b.x + b.w <= box.x + box.w - inset &&
		b.y + b.h <= box.y + box.h - inset
	);
}

/** @param {string} svg */
function parseTextAndPillBoxes(svg) {
	/** @type {BBox[]} */
	const boxes = [];
	const textRe = /<text[^>]*>([^<]*)<\/text>/g;
	let m;
	while ((m = textRe.exec(svg))) {
		const tag = m[0];
		if (
			tag.includes('shuc-svg-label') ||
			tag.includes('shuc-svg-title') ||
			tag.includes('shuc-svg-note') ||
			tag.includes('shuc-svg-muted') ||
			tag.includes('shuc-svg-module-text') ||
			tag.includes('shuc-svg-wire-label')
		) {
			continue;
		}
		if (tag.includes('y="384"')) continue;
		const x = num(tag, 'x') ?? 0;
		const y = num(tag, 'y') ?? 0;
		const fs = num(tag, 'font-size') ?? 10;
		const anchor = /text-anchor="([^"]+)"/.exec(tag)?.[1] ?? 'start';
		const text = m[1].trim();
		const w = Math.max(8, text.length * (fs * 0.55));
		const h = fs + 4;
		let left = x;
		if (anchor === 'middle') left = x - w / 2;
		else if (anchor === 'end') left = x - w;
		boxes.push({ x: left, y: y - h + 4, w, h, kind: 'text' });
	}
	const pillRe = /<g class="shuc-svg-pill-group"[^>]*>[\s\S]*?<\/g>/g;
	while ((m = pillRe.exec(svg))) {
		const g = m[0];
		const rectM = /<rect[^>]*class="shuc-svg-pill"[^>]*\/?>/.exec(g);
		if (!rectM) continue;
		const t = rectM[0];
		boxes.push({
			x: num(t, 'x'),
			y: num(t, 'y'),
			w: num(t, 'width'),
			h: num(t, 'height'),
			kind: 'pill',
		});
	}
	return boxes;
}

function overlaps(a, b) {
	return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function inCorridorOrRail(b) {
	const cx = b.x + b.w / 2;
	const cy = b.y + b.h / 2;
	const corr1 = cx >= CORR1_A && cx <= CORR1_B && cy >= 80 && cy <= 308;
	const corr2 = cx >= CORR2_A && cx <= CORR2_B && cy >= 80 && cy <= 308;
	const rail = cy >= 54 && cy <= 70 && cx >= 218 && cx <= 576;
	const below = cy >= 296 && cy <= 308 && cx >= 218 && cx <= 302;
	return corr1 || corr2 || rail || below;
}

const CORR1_A = 218;
const CORR1_B = 302;
const CORR2_A = 492;
const CORR2_B = 576;

function pillAllowed(b, comps) {
	if (inCorridorOrRail(b)) return true;
	for (const c of comps) {
		if (isFullyInside(b, c, 0)) return false;
	}
	return !comps.some((c) => boxBorderOverlap(b, c));
}

function boxBorderOverlap(textBox, comp) {
	const pad = 2;
	const outer = {
		x: comp.x - pad,
		y: comp.y - pad,
		w: comp.w + pad * 2,
		h: comp.h + pad * 2,
	};
	const inner = {
		x: comp.x + MARGIN,
		y: comp.y + MARGIN,
		w: comp.w - MARGIN * 2,
		h: comp.h - MARGIN * 2,
	};
	if (!overlaps(textBox, outer)) return false;
	return !overlaps(textBox, inner);
}

/** @param {string} id */
function verifyScheme(id) {
	const svg = buildSchemeSvgForVerify(id);
	if (!svg) return [`${id}: SVG manquant`];
	const errors = [];
	const comps = parseComponentBoxes(svg);
	const wires = parseWireSegments(svg);
	for (const seg of wires) {
		for (const box of comps) {
			if (segmentCrossesBoxInterior(seg, box)) {
				errors.push(
					`${id}: fil (${seg.x1},${seg.y1})→(${seg.x2},${seg.y2}) traverse boîte [${box.x},${box.y} ${box.w}×${box.h}]`,
				);
			}
		}
	}
	const labels = parseTextAndPillBoxes(svg);
	for (let i = 0; i < labels.length; i++) {
		for (let j = i + 1; j < labels.length; j++) {
			if (overlaps(labels[i], labels[j])) {
				errors.push(`${id}: chevauchement ${labels[i].kind} ↔ ${labels[j].kind}`);
			}
		}
		for (const comp of comps) {
			if (boxBorderOverlap(labels[i], comp) && !inCorridorOrRail(labels[i])) {
				errors.push(`${id}: ${labels[i].kind} chevauche bord boîte [${comp.x},${comp.y}]`);
			}
		}
		if (labels[i].kind === 'pill' && !pillAllowed(labels[i], comps)) {
			errors.push(`${id}: badge pilule hors couloir / rail`);
		}
	}
	return errors;
}

function main() {
	let all = [];
	for (const id of SCHEME_IDS) {
		all = all.concat(verifyScheme(id));
	}
	if (all.length) {
		console.error('ÉCHEC vérification SVG domotique:\n' + all.join('\n'));
		process.exit(1);
	}
	console.log(`OK — ${SCHEME_IDS.length} schémas sans collision fil/boîte ni chevauchement label.`);
}

main();
