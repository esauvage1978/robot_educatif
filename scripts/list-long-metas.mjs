import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { parse } from 'node-html-parser';

const distDir = 'dist';
const longMetas = [];

async function* walkHTML(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkHTML(path);
    } else if (entry.name.endsWith('.html')) {
      yield path;
    }
  }
}

for await (const htmlPath of walkHTML(distDir)) {
  const html = await readFile(htmlPath, 'utf-8');
  const root = parse(html);
  const relPath = htmlPath.replace(distDir + '/', '').replace('/index.html', '');

  const metaDesc = root.querySelector('meta[name="description"]');
  if (metaDesc) {
    const desc = metaDesc.getAttribute('content') || '';
    if (desc.length > 155) {
      longMetas.push({ slug: relPath, desc, length: desc.length });
    }
  }
}

console.log(`\n${longMetas.length} metas >155:\n`);
longMetas.forEach(({ slug, desc, length }) => {
  console.log(`${slug} (${length}): ${desc}`);
});
