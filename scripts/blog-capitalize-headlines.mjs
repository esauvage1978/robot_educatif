import fs from 'node:fs';
import path from 'node:path';

const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');
const lowerFirst = /^[a-zàâäéèëêïîôùûç]/;

for (const file of fs.readdirSync(blogDir).filter((f) => f.endsWith('.md'))) {
	const fp = path.join(blogDir, file);
	let s = fs.readFileSync(fp, 'utf8');
	const m = s.match(/^headline:\s*"([^"]*)"/m);
	if (!m) continue;
	const h = m[1];
	if (!lowerFirst.test(h)) continue;
	const c = h.charAt(0).toUpperCase() + h.slice(1);
	const escaped = c.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
	s = s.replace(/^headline:\s*"[^"]*"/m, `headline: "${escaped}"`);
	fs.writeFileSync(fp, s);
}
console.log('OK');
