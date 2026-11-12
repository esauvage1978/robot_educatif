import fs from 'node:fs';

const urls = fs
	.readFileSync('C:/Users/emman/a_corriger_re.md', 'utf8')
	.split(/\n/)
	.filter((l) => l.startsWith('## https'));
const long = [];
for (const line of urls) {
	const m = line.match(/robot-educatif\.info\/(en|de|it|es)\/([^/]+)\//);
	if (!m) continue;
	const p = `src/pages/${m[1]}/${m[2]}.md`;
	if (!fs.existsSync(p)) continue;
	const c = fs.readFileSync(p, 'utf8');
	const tm = c.match(/^title:\s*"([^"]+)"/m) || c.match(/^title:\s*'([^']+)'/m);
	if (tm && [...tm[1]].length > 70) long.push({ p, len: [...tm[1]].length, t: tm[1] });
}
console.log(long.map((x) => `${x.len} ${x.p} :: ${x.t}`).join('\n') || 'all titles <=70');
