import fs from 'node:fs';
const p = 'src/pages/es/primer-programa-mbot.md';
let c = fs.readFileSync(p, 'utf8');
c = c.replace(/^title: ".*"/m, 'title: "Primer programa mBot en mBlock 5 (paso a paso)"');
c = c.replace(/premier_programme\.mblock/g, 'primer_programa.mblock');
c = c.replace(/modo Carga \(Upload \/ subida\)/g, 'modo Carga / subida');
fs.writeFileSync(p, c);
const t = c.match(/^title: "(.*)"/m)[1];
console.log('title', t.length, t);
