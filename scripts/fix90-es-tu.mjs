import fs from 'node:fs';

const pairs = [
	[/\bElegid\b/g, 'Elige'],
	[/\bconsultad\b/gi, 'consulta'],
	[/\bConsultad\b/g, 'Consulta'],
	[/\bInstalad\b/g, 'Instala'],
	[/\binstalad\b/g, 'instala'],
	[/\bDescargad\b/g, 'Descarga'],
	[/\bComprobad\b/g, 'Comprueba'],
	[/\bcomprobad\b/g, 'comprueba'],
	[/\bVerificad\b/g, 'Verifica'],
	[/\bverificad\b/g, 'verifica'],
	[/\bcomprad\b/gi, 'compra'],
	[/\bComprad\b/g, 'Compra'],
	[/\bbuscáis\b/g, 'buscas'],
	[/\bqueréis\b/g, 'quieres'],
	[/\bdebéis\b/g, 'debes'],
	[/\bpodéis\b/g, 'puedes'],
	[/\btenéis\b/g, 'tienes'],
	[/\bvuestro\b/g, 'tu'],
	[/\bvuestra\b/g, 'tu'],
	[/\bvuestros\b/g, 'tus'],
	[/\bvuestras\b/g, 'tus'],
	[/\bno os salteis\b/gi, 'no te saltes'],
	[/\bos acompaña\b/g, 'te acompaña'],
	[/\bsin coste extra para vosotros\b/g, 'sin coste extra para ti'],
];

for (const rel of [
	'src/pages/es/raspberry-pi-5-que-ram.md',
	'src/pages/es/mblock-bluetooth-solucion.md',
	'src/pages/es/instalar-mblock-5-windows.md',
]) {
	let c = fs.readFileSync(rel, 'utf8');
	const o = c;
	for (const [a, b] of pairs) c = c.replace(a, b);
	if (rel.includes('raspberry-pi-5')) {
		if (!c.includes('SBC (') && c.includes('SBC')) {
			c = c.replace(/\bSBC\b/, 'SBC (single-board computer / ordenador de placa única)');
		}
		if (!c.includes('PCIe (') && c.includes('PCIe')) {
			c = c.replace(/\bPCIe\b/, 'PCIe (bus de expansión de alta velocidad)');
		}
	}
	if (c !== o) {
		fs.writeFileSync(rel, c);
		console.log('updated', rel);
	} else console.log('nochange', rel);
}
