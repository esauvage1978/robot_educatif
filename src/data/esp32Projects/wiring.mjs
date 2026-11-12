/**
 * Générateurs de schémas SVG pour les projets ESP32.
 * - wiringSvg : câblage broche à broche (ESP32 à gauche, périphérique(s) à droite, fils horizontaux alignés).
 * - principleSvg : chaîne de principe (capteur → ESP32 → réseau → Home Assistant).
 *
 * Choix de conception : grille de 38 px, fils strictement horizontaux (aucun croisement),
 * trois niveaux de distinction non basés sur la couleur seule (couleur + style de trait + étiquette),
 * fond blanc intégré pour rester lisible en thème sombre, texte ≥ 13 px dans un viewBox de 480 px de large.
 */

const FONT = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

/** Styles de fils. `dash` distingue les types sans dépendre de la couleur. */
export const WIRE_STYLES = {
	power: { stroke: '#b45309', width: 3.5, dash: null },
	ground: { stroke: '#111827', width: 3.5, dash: '7 5' },
	data: { stroke: '#0f766e', width: 3, dash: null },
	clock: { stroke: '#1d4ed8', width: 3, dash: null },
	aux: { stroke: '#6d28d9', width: 3, dash: '2 5' },
};

const DEFAULT_LEGEND = {
	power: 'Power',
	ground: 'GND',
	data: 'Data / signal',
	clock: 'Clock',
	aux: 'Control',
};

let uid = 0;

function esc(value) {
	return String(value ?? '')
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

function titleSize(text) {
	const n = String(text).length;
	return n > 20 ? 11.5 : n > 16 ? 12.5 : 14;
}

function styleFor(color) {
	if (WIRE_STYLES[color]) return { key: color, ...WIRE_STYLES[color] };
	if (typeof color === 'string' && color.startsWith('#')) return { key: color, stroke: color, width: 3, dash: null };
	return { key: 'data', ...WIRE_STYLES.data };
}

/**
 * @param {{
 *   esp32Label: string,
 *   sensorLabel: string,
 *   pins: { gpio: string, signal: string, color?: string, device?: string }[],
 *   caption: string,
 *   legend?: Record<string, string>,
 * }} opts
 * @returns {string} balise <svg> complète
 */
export function wiringSvg({ esp32Label, sensorLabel, pins, caption, legend = {} }) {
	uid += 1;
	const id = `w${uid}`;
	const W = 480;
	const rowH = 38;
	const headH = 36;
	const gapY = 14;
	const top = 12;
	const leftX = 12;
	const boxW = 148;
	const rightX = W - 12 - boxW;
	const wireX1 = leftX + boxW;
	const wireX2 = rightX;

	// Regroupement des broches consécutives par périphérique.
	const groups = [];
	for (const pin of pins) {
		const device = pin.device ?? sensorLabel;
		const last = groups[groups.length - 1];
		if (last && last.device === device) last.pins.push(pin);
		else groups.push({ device, pins: [pin] });
	}

	let y = top;
	const placed = groups.map((group) => {
		const g = { ...group, y, h: headH + group.pins.length * rowH + 8 };
		y += g.h + gapY;
		return g;
	});
	const bottom = y - gapY;

	const usedKeys = [];
	for (const pin of pins) {
		const key = styleFor(pin.color).key;
		if (!usedKeys.includes(key)) usedKeys.push(key);
	}
	const legendText = { ...DEFAULT_LEGEND, ...legend };
	const legendCols = 3;
	const legendRows = Math.ceil(usedKeys.length / legendCols);
	const legendTop = bottom + 18;
	const H = legendTop + legendRows * 26 + 8;

	const parts = [];
	parts.push(`<rect x="0" y="0" width="${W}" height="${H}" rx="12" fill="#ffffff" stroke="#cbd5e1"/>`);

	// Boîte ESP32 (continue sur toute la hauteur)
	parts.push(`<rect x="${leftX}" y="${top}" width="${boxW}" height="${bottom - top}" rx="10" fill="#f0fdfa" stroke="#0f766e" stroke-width="2"/>`);
	parts.push(
		`<text x="${leftX + boxW / 2}" y="${top + 23}" text-anchor="middle" font-family="${FONT}" font-size="${titleSize(esp32Label)}" font-weight="700" fill="#0f172a">${esc(esp32Label)}</text>`,
	);

	const descParts = [];
	placed.forEach((group) => {
		parts.push(`<rect x="${rightX}" y="${group.y}" width="${boxW}" height="${group.h}" rx="10" fill="#f8fafc" stroke="#475569" stroke-width="2"/>`);
		parts.push(
			`<text x="${rightX + boxW / 2}" y="${group.y + 23}" text-anchor="middle" font-family="${FONT}" font-size="${titleSize(group.device)}" font-weight="700" fill="#0f172a">${esc(group.device)}</text>`,
		);
		group.pins.forEach((pin, index) => {
			const cy = group.y + headH + index * rowH + rowH / 2;
			const st = styleFor(pin.color);
			const dash = st.dash ? ` stroke-dasharray="${st.dash}"` : '';
			parts.push(
				`<line x1="${wireX1}" y1="${cy}" x2="${wireX2}" y2="${cy}" stroke="${st.stroke}" stroke-width="${st.width}" stroke-linecap="round"${dash}/>`,
			);
			parts.push(`<circle cx="${wireX1}" cy="${cy}" r="5" fill="${st.stroke}"/>`);
			parts.push(`<circle cx="${wireX2}" cy="${cy}" r="5" fill="${st.stroke}"/>`);
			parts.push(
				`<text x="${wireX1 - 12}" y="${cy + 5}" text-anchor="end" font-family="${FONT}" font-size="14" font-weight="700" fill="#0f172a">${esc(pin.gpio)}</text>`,
			);
			parts.push(
				`<text x="${wireX2 + 12}" y="${cy + 5}" text-anchor="start" font-family="${FONT}" font-size="14" font-weight="600" fill="#0f172a">${esc(pin.signal)}</text>`,
			);
			descParts.push(`${pin.gpio} → ${group.device} ${pin.signal}`);
		});
	});

	// Légende
	usedKeys.forEach((key, index) => {
		const st = WIRE_STYLES[key] ?? { stroke: key, width: 3, dash: null };
		const col = index % legendCols;
		const row = Math.floor(index / legendCols);
		const lx = 16 + col * 152;
		const ly = legendTop + row * 26 + 10;
		const dash = st.dash ? ` stroke-dasharray="${st.dash}"` : '';
		parts.push(`<line x1="${lx}" y1="${ly}" x2="${lx + 30}" y2="${ly}" stroke="${st.stroke}" stroke-width="${st.width}" stroke-linecap="round"${dash}/>`);
		parts.push(
			`<text x="${lx + 38}" y="${ly + 5}" font-family="${FONT}" font-size="13" fill="#334155">${esc(legendText[key] ?? key)}</text>`,
		);
	});

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="${id}-t ${id}-d" preserveAspectRatio="xMidYMid meet"><title id="${id}-t">${esc(caption)}</title><desc id="${id}-d">${esc(descParts.join('; '))}</desc>${parts.join('')}</svg>`;
}

const TONES = {
	default: { fill: '#ffffff', stroke: '#0f766e', dash: null },
	power: { fill: '#fffbeb', stroke: '#b45309', dash: null },
	aside: { fill: '#f8fafc', stroke: '#64748b', dash: '6 4' },
	ha: { fill: '#eff6ff', stroke: '#1d4ed8', dash: null },
};

function fitTitle(text, max) {
	const t = String(text);
	return t.length > max ? `${t.slice(0, max - 1)}…` : t;
}

/**
 * @param {{
 *   boxes: { title: string, a?: string, b?: string, tone?: 'default'|'power'|'aside'|'ha', s?: string, via?: string }[],
 *   caption: string,
 *   compact?: boolean,
 * }} opts
 * @returns {string} balise <svg>
 */
export function principleSvg({ boxes, caption, compact = false }) {
	uid += 1;
	const id = `p${uid}`;
	const desc = boxes.map((b) => b.title).join(' → ');

	if (compact) {
		// Vignette horizontale : 3 blocs maximum (premier, milieu, dernier), titres courts.
		const picked = boxes.length <= 3 ? boxes : [boxes[0], boxes[Math.floor((boxes.length - 1) / 2)], boxes[boxes.length - 1]];
		const W = 360;
		const H = 84;
		const bw = picked.length === 2 ? 140 : 104;
		const gap = (W - 8 - bw * picked.length) / Math.max(1, picked.length - 1);
		const parts = [`<rect x="0" y="0" width="${W}" height="${H}" rx="10" fill="#f8fafc" stroke="#e2e8f0"/>`];
		picked.forEach((box, i) => {
			const x = 4 + i * (bw + gap);
			const tone = TONES[box.tone ?? 'default'] ?? TONES.default;
			const label = fitTitle(box.s ?? box.title, 16);
			const dash = tone.dash ? ` stroke-dasharray="${tone.dash}"` : '';
			parts.push(`<rect x="${x}" y="14" width="${bw}" height="56" rx="8" fill="${tone.fill}" stroke="${tone.stroke}" stroke-width="2"${dash}/>`);
			parts.push(
				`<text x="${x + bw / 2}" y="47" text-anchor="middle" font-family="${FONT}" font-size="${label.length > 13 ? 12 : 13}" font-weight="700" fill="#0f172a">${esc(label)}</text>`,
			);
			if (i < picked.length - 1) {
				const ax1 = x + bw + 3;
				const ax2 = x + bw + gap - 3;
				parts.push(`<line x1="${ax1}" y1="42" x2="${ax2 - 5}" y2="42" stroke="#0f766e" stroke-width="2.5" stroke-linecap="round"/>`);
				parts.push(`<path d="M${ax2 - 8},36 L${ax2},42 L${ax2 - 8},48 Z" fill="#0f766e"/>`);
			}
		});
		return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="${id}-t"><title id="${id}-t">${esc(caption || desc)}</title>${parts.join('')}</svg>`;
	}

	const W = 480;
	const bx = 20;
	const bw = W - 40;
	const arrowGap = 36;
	let y = 14;
	const parts = [];
	const placed = boxes.map((box) => {
		const lines = 1 + (box.a ? 1 : 0) + (box.b ? 1 : 0);
		const h = 24 + lines * 20;
		const p = { ...box, y, h };
		y += h + arrowGap;
		return p;
	});
	const H = y - arrowGap + 14;
	parts.push(`<rect x="0" y="0" width="${W}" height="${H}" rx="12" fill="#ffffff" stroke="#cbd5e1"/>`);
	placed.forEach((box, i) => {
		const tone = TONES[box.tone ?? 'default'] ?? TONES.default;
		const dash = tone.dash ? ` stroke-dasharray="${tone.dash}"` : '';
		parts.push(`<rect x="${bx}" y="${box.y}" width="${bw}" height="${box.h}" rx="10" fill="${tone.fill}" stroke="${tone.stroke}" stroke-width="2"${dash}/>`);
		let ty = box.y + 28;
		parts.push(`<text x="${bx + 16}" y="${ty}" font-family="${FONT}" font-size="15" font-weight="700" fill="#0f172a">${esc(box.title)}</text>`);
		if (box.a) {
			ty += 20;
			parts.push(`<text x="${bx + 16}" y="${ty}" font-family="${FONT}" font-size="13" fill="#334155">${esc(box.a)}</text>`);
		}
		if (box.b) {
			ty += 20;
			parts.push(`<text x="${bx + 16}" y="${ty}" font-family="${FONT}" font-size="13" fill="#334155">${esc(box.b)}</text>`);
		}
		if (i < placed.length - 1) {
			const next = placed[i + 1];
			const y1 = box.y + box.h + 3;
			const y2 = next.y - 3;
			const color = next.tone === 'power' ? '#b45309' : '#0f766e';
			const cx = W / 2;
			parts.push(`<line x1="${cx}" y1="${y1}" x2="${cx}" y2="${y2 - 6}" stroke="${color}" stroke-width="3" stroke-linecap="round"/>`);
			parts.push(`<path d="M${cx - 7},${y2 - 9} L${cx},${y2} L${cx + 7},${y2 - 9} Z" fill="${color}"/>`);
			if (next.via) {
				parts.push(
					`<text x="${cx + 16}" y="${(y1 + y2) / 2 + 4}" font-family="${FONT}" font-size="13" font-weight="600" fill="#334155">${esc(next.via)}</text>`,
				);
			}
		}
	});
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="${id}-t ${id}-d"><title id="${id}-t">${esc(caption)}</title><desc id="${id}-d">${esc(desc)}</desc>${parts.join('')}</svg>`;
}
