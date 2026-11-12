import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function upd(rel, fn) {
	const p = path.join(root, rel);
	let c = fs.readFileSync(p, 'utf8');
	const o = c;
	c = fn(c);
	if (c !== o) {
		fs.writeFileSync(p, c);
		console.log('updated', rel);
		return true;
	}
	console.log('nochange', rel);
	return false;
}

upd('src/pages/en/educational-robot-200-500-guide.md', (c) =>
	c
		.replace(/France \/ Europe/g, 'UK/US / Europe (verify local listing)')
		.replace(/ — FR\]/g, ' (French)]')
		.replace(/WRO(?! \()/g, 'WRO (World Robot Olympiad)')
		.replace(/WRO \(World Robot Olympiad\) \(World Robot Olympiad\)/g, 'WRO (World Robot Olympiad)')
);

upd('src/pages/de/lernroboter-200-500-euro.md', (c) =>
	c
		.replace(/Frankreich \/ Europa/g, 'Deutschland / EU')
		.replace(/ — FR\]/g, ' (nur Französisch)]')
);

upd('src/pages/it/robot-educativo-200-500-euro.md', (c) =>
	c
		.replace(/Francia \/ Europa/g, 'Italia / UE')
		.replace(/ — FR\]/g, ' (in francese)]')
);

upd('src/pages/es/robot-educativo-200-500-euros.md', (c) =>
	c
		.replace(/Francia \/ Europa/g, 'España / UE')
		.replace(/ — FR\]/g, ' (versión en francés)]')
);

upd('src/pages/en/mbot-vs-lego-robot.md', (c) =>
	c.replace(
		/French guide — at what age to start programming/g,
		'At what age to start programming (French guide)',
	)
);

upd('src/pages/de/mbot-vs-lego-roboter.md', (c) =>
	c
		.replace(/Richtwerte für Frankreich/g, 'Richtwerte DE/EU — beim Händler prüfen')
		.replace(/\]\(\/marque-lego\/\)/g, '](/de/marke-lego-education/)'),
);

upd('src/pages/it/mbot-vs-lego-robot.md', (c) =>
	c
		.replace(/indicativi per la Francia/g, "indicativi per l'Italia / UE")
		.replace(/\]\(\/marque-lego\/\)/g, '](/it/marchio-lego/)'),
);

upd('src/pages/es/mbot-vs-lego-robot.md', (c) =>
	c
		.replace(/orientativos para Francia/g, 'orientativos para España / UE')
		.replace(/\]\(\/marque-lego\/\)/g, '](/es/marca-lego/)'),
);

const labels = {
	en: ' (French)]',
	de: ' (nur Französisch)]',
	it: ' (in francese)]',
	es: ' (versión en francés)]',
};

let left = 0;
for (const lang of Object.keys(labels)) {
	const dir = path.join(root, 'src/pages', lang);
	for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md') || x.endsWith('.mdx'))) {
		const rel = path.join('src/pages', lang, f);
		const p = path.join(root, rel);
		let c = fs.readFileSync(p, 'utf8');
		const o = c;
		c = c.replace(/ — FR\]/g, labels[lang]);
		if (c !== o) {
			fs.writeFileSync(p, c);
			console.log('frfix', rel);
		}
		if (/— FR/.test(c)) left++;
	}
}
console.log('files still containing — FR:', left);
