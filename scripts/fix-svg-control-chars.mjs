/**
 * Remplace les octets 0x14 et 0x19 (invalides en XML 1.0) dans les SVG du tutoriel mBlock.
 */
import fs from 'node:fs';
import path from 'node:path';

const dir = path.join(process.cwd(), 'public/images/blog/installer-mblock');

for (const name of fs.readdirSync(dir)) {
	if (!name.endsWith('.svg')) continue;
	const filePath = path.join(dir, name);
	const buf = fs.readFileSync(filePath);
	const out = [];
	for (let i = 0; i < buf.length; i++) {
		const b = buf[i];
		if (b === 0x14) {
			// tiret demi-cadratin (séparateur visuel)
			out.push(0xe2, 0x80, 0x93);
		} else if (b === 0x19) {
			out.push(0x27);
		} else {
			out.push(b);
		}
	}
	fs.writeFileSync(filePath, Buffer.from(out));
	console.log(`[fix-svg] ${name}`);
}
