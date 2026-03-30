/**
 * Répare le mélange Latin-1 / UTF-8 dans les SVG : octets >= 0x80 invalides en UTF-8
 * sont interprétés comme Windows-1252 / Latin-1 et réécrits en séquences UTF-8 valides.
 */
import fs from 'node:fs';
import path from 'node:path';

/**
 * @param {Buffer} bytes
 * @returns {Buffer}
 */
function repairMixedEncoding(bytes) {
	const out = [];
	let i = 0;
	while (i < bytes.length) {
		const b = bytes[i];
		if (b < 0x80) {
			out.push(b);
			i++;
			continue;
		}
		let seqLen = 0;
		if ((b & 0xe0) === 0xc0) seqLen = 2;
		else if ((b & 0xf0) === 0xe0) seqLen = 3;
		else if ((b & 0xf8) === 0xf0) seqLen = 4;

		let validUtf8 = false;
		if (seqLen > 1 && i + seqLen <= bytes.length) {
			validUtf8 = true;
			for (let j = 1; j < seqLen; j++) {
				if ((bytes[i + j] & 0xc0) !== 0x80) {
					validUtf8 = false;
					break;
				}
			}
		}
		if (validUtf8) {
			for (let j = 0; j < seqLen; j++) out.push(bytes[i + j]);
			i += seqLen;
			continue;
		}
		// Octet isolé ou séquence cassée : traiter comme Latin-1 (U+00xx)
		const cp = b;
		const utf8 = Buffer.from(String.fromCodePoint(cp), 'utf8');
		for (const x of utf8) out.push(x);
		i++;
	}
	return Buffer.from(out);
}

const dir = path.join(process.cwd(), 'public/images/blog/installer-mblock');

for (const name of fs.readdirSync(dir)) {
	if (!name.endsWith('.svg')) continue;
	const p = path.join(dir, name);
	const raw = fs.readFileSync(p);
	const fixed = repairMixedEncoding(raw);
	fs.writeFileSync(p, fixed);
	try {
		new TextDecoder('utf-8', { fatal: true }).decode(fixed);
		console.log(`[utf8] OK ${name}`);
	} catch {
		console.error(`[utf8] ÉCHEC ${name}`);
		process.exitCode = 1;
	}
}
