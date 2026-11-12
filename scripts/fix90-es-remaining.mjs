import fs from 'node:fs';

const pairs = [
	[/\bElegid\b/g, 'Elige'],
	[/\bcargad\b/gi, 'carga'],
	[/\bCargad\b/g, 'Carga'],
	[/\bdesconectad\b/gi, 'desconecta'],
	[/\bDesconectad\b/g, 'Desconecta'],
	[/\bpasad\b/gi, 'pasa'],
	[/\bPasad\b/g, 'Pasa'],
	[/\binsertad\b/gi, 'inserta'],
	[/\bInsertad\b/g, 'Inserta'],
	[/\bpulséis\b/g, 'pulses'],
	[/\bos guía\b/g, 'te guía'],
	[/\bEste tutorial os\b/g, 'Este tutorial te'],
	[/\bvuestro\b/g, 'tu'],
	[/\bvuestra\b/g, 'tu'],
	[/\bvuestros\b/g, 'tus'],
	[/\bvuestras\b/g, 'tus'],
	[/\bdebéis\b/g, 'debes'],
	[/\bqueréis\b/g, 'quieres'],
	[/\bpodéis\b/g, 'puedes'],
	[/\btenéis\b/g, 'tienes'],
	[/\bbuscáis\b/g, 'buscas'],
];

for (const rel of [
	'src/pages/es/primer-programa-mbot.md',
	'src/pages/es/software-mblock-cual-elegir.md',
	'src/pages/es/primeros-pasos-mblock-5.md',
	'src/pages/es/actividad-mbot-detector-intrusion.md',
	'src/pages/es/actividad-mbot-medir-distancias.md',
	'src/pages/es/actividad-mbot-hacer-parpadear-leds.md',
	'src/pages/es/proyectos-mbot-una-hora.md',
	'src/pages/es/accesorios-mbot-por-donde-empezar.md',
	'src/pages/es/10-proyectos-mbot-gratis-clase.md',
	'src/pages/es/instalar-bloques-mbot.md',
	'src/pages/es/python-pathlib.md',
	'src/pages/es/raspberry-pi-4-que-ram.md',
	'src/pages/es/raspberry-pi-3-primeros-pasos.md',
	'src/pages/es/mejor-robot-educativo-2026.md',
]) {
	if (!fs.existsSync(rel)) continue;
	let c = fs.readFileSync(rel, 'utf8');
	const o = c;
	for (const [a, b] of pairs) c = c.replace(a, b);
	if (rel.includes('primer-programa')) {
		c = c.replace(/^title: ".*"/m, 'title: "Primer programa mBot en mBlock 5 (paso a paso)"');
		c = c.replace(/premier_programme\.mblock/g, 'primer_programa.mblock');
	}
	if (rel.includes('raspberry-pi-4') || rel.includes('raspberry-pi-3')) {
		if (!c.includes('CSI/') && !c.includes('CSI (')) {
			c = c.replace(/\bCSI\b(?!\/)/, 'CSI (cámara oficial)');
		}
		if (!c.includes('DSI (')) {
			c = c.replace(/\bDSI\b/, 'DSI (pantalla oficial)');
		}
		if (!c.includes('GPIO (')) {
			c = c.replace(/\bGPIO\b/, 'GPIO (pines de entrada/salida)');
		}
		if (!c.includes('HAT (')) {
			c = c.replace(/\bHAT\b/, 'HAT (tarjeta de expansión)');
		}
	}
	if (c !== o) {
		fs.writeFileSync(rel, c);
		console.log('upd', rel);
	} else console.log('ok', rel);
}
