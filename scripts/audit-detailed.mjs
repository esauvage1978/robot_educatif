import { readdir, readFile, stat } from 'fs/promises';
import { join } from 'path';
import { parse } from 'node-html-parser';

const distDir = 'dist';
const issues = {
  missingImages: [],
  longMetas: [],
};

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

async function imageExists(imagePath) {
  const fullPath = join(distDir, imagePath.startsWith('/') ? imagePath.slice(1) : imagePath);
  try {
    await stat(fullPath);
    return true;
  } catch {
    return false;
  }
}

for await (const htmlPath of walkHTML(distDir)) {
  const html = await readFile(htmlPath, 'utf-8');
  const root = parse(html);
  const relPath = htmlPath.replace(distDir + '/', '');

  const metaDesc = root.querySelector('meta[name="description"]');
  if (metaDesc) {
    const desc = metaDesc.getAttribute('content') || '';
    if (desc.length > 155) {
      issues.longMetas.push({ page: relPath, length: desc.length });
    }
  }

  const images = root.querySelectorAll('img');
  for (const img of images) {
    const src = img.getAttribute('src');
    if (src && !src.startsWith('http') && !src.startsWith('data:') && !src.includes('pagefind')) {
      const exists = await imageExists(src);
      if (!exists) {
        issues.missingImages.push(src);
      }
    }
  }
}

// Count unique missing images
const uniqueMissing = [...new Set(issues.missingImages)];
console.log(`\nImages manquantes uniques (${uniqueMissing.length}):`);
uniqueMissing.slice(0, 30).forEach(src => console.log(`  ${src}`));

console.log(`\nMeta descriptions >155 (${issues.longMetas.length}):`);
issues.longMetas.slice(0, 20).forEach(({ page, length }) => console.log(`  ${page}: ${length} chars`));
