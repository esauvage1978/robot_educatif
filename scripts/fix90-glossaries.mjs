/**
 * Light-touch first-occurrence glossaries on remaining translated pages.
 * Idempotent: skips if expansion already present nearby.
 */
import fs from 'node:fs';
import path from 'node:path';

const rules = [
	{
		re: /\bGPIO\b(?!\s*\()/,
		insert: {
			en: 'GPIO (General Purpose Input/Output)',
			de: 'GPIO (General Purpose Input/Output — Pins für Sensoren)',
			it: 'GPIO (General Purpose Input/Output — pin per sensori)',
			es: 'GPIO (General Purpose Input/Output — pines de entrada/salida)',
		},
	},
	{
		re: /\bHAT\b(?!\s*=)(?!\s*\()/,
		insert: {
			en: 'HAT (Hardware Attached on Top add-on board)',
			de: 'HAT (Hardware-on-Top-Platine)',
			it: 'HAT (scheda di espansione sui pin GPIO)',
			es: 'HAT (tarjeta de expansión)',
		},
	},
	{
		re: /\bFLL\b(?!\s*\()/,
		insert: {
			en: 'FIRST LEGO League (FLL)',
			de: 'FLL (FIRST LEGO League, Wettbewerb)',
			it: 'FIRST LEGO League (FLL)',
			es: 'FIRST LEGO League (FLL)',
		},
	},
	{
		re: /\bWRO\b(?!\s*\()/,
		insert: {
			en: 'WRO (World Robot Olympiad)',
			de: 'WRO (World Robot Olympiad)',
			it: 'WRO (World Robot Olympiad)',
			es: 'WRO (Olimpiada mundial de robots)',
		},
	},
	{
		re: /\bIoT\b(?!\s*\()/,
		insert: {
			en: 'IoT (Internet of Things)',
			de: 'IoT (Internet der Dinge / vernetzte Geräte)',
			it: 'IoT (Internet delle cose)',
			es: 'IoT (Internet de las cosas)',
		},
	},
	{
		re: /\bSTEM\b(?!\s*\()/,
		insert: {
			en: 'science, technology, engineering and maths (STEM)',
			de: 'MINT / STEM (Mathematik, Informatik, Naturwissenschaft, Technik)',
			it: 'STEM (Science, Technology, Engineering, Mathematics)',
			es: 'STEM (ciencia, tecnología, ingeniería, matemáticas)',
		},
	},
];

const root = process.cwd();
const list = fs
	.readFileSync('C:/Users/emman/a_corriger_re.md', 'utf8')
	.split(/\n/)
	.filter((l) => l.startsWith('## https'))
	.map((l) => {
		const m = l.match(/robot-educatif\.info\/(en|de|it|es)\/([^/]+)\//);
		return m ? { lang: m[1], slug: m[2] } : null;
	})
	.filter(Boolean);

let n = 0;
for (const { lang, slug } of list) {
	const rel = path.join('src/pages', lang, `${slug}.md`);
	const p = path.join(root, rel);
	if (!fs.existsSync(p)) continue;
	let c = fs.readFileSync(p, 'utf8');
	const o = c;
	for (const rule of rules) {
		const ins = rule.insert[lang];
		if (!ins) continue;
		// Only first occurrence
		rule.re.lastIndex = 0;
		const m = rule.re.exec(c);
		if (!m) continue;
		// Skip if already expanded within 80 chars after match
		const after = c.slice(m.index, m.index + 80);
		if (after.includes('(') && after.indexOf('(') < 40) continue;
		c = c.slice(0, m.index) + ins + c.slice(m.index + m[0].length);
	}
	if (c !== o) {
		fs.writeFileSync(p, c);
		n++;
		console.log('gloss', rel);
	}
}
console.log('gloss files updated:', n);
