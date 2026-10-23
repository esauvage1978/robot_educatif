import { readdir, readFile, stat } from 'fs/promises';
import { join, dirname, resolve } from 'path';
import { parse } from 'node-html-parser';

const distDir = 'dist';
const issues = {
  missingImages: new Set(),
  emptyAlt: 0,
  largeImages: [],
  longTitles: [],
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

async function imageExists(imagePath, htmlPath) {
  // Resolve relative paths
  const htmlDir = dirname(htmlPath);
  const fullPath = resolve(htmlDir, imagePath);
  try {
    await stat(fullPath);
    return { exists: true, path: fullPath };
  } catch {
    return { exists: false, path: fullPath };
  }
}

async function getImageSize(fullPath) {
  try {
    const stats = await stat(fullPath);
    return stats.size;
  } catch {
    return 0;
  }
}

let totalPages = 0;
for await (const htmlPath of walkHTML(distDir)) {
  totalPages++;
  const html = await readFile(htmlPath, 'utf-8');
  const root = parse(html);
  const relPath = htmlPath.replace(distDir + '/', '');

  const titleEl = root.querySelector('title');
  if (titleEl) {
    const titleText = titleEl.text.trim();
    if (titleText.length > 60) {
      issues.longTitles.push({ page: relPath, length: titleText.length });
    }
  }

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
    const alt = img.getAttribute('alt');

    if (src && !src.startsWith('http') && !src.startsWith('data:') && !src.includes('pagefind')) {
      const { exists, path: fullPath } = await imageExists(src, htmlPath);
      if (!exists) {
        issues.missingImages.add(src);
      } else {
        const size = await getImageSize(fullPath);
        if (size > 300 * 1024) {
          issues.largeImages.push({ page: relPath, src, size: Math.round(size / 1024) });
        }
      }
    }

    if (alt === undefined || alt === null) {
      issues.emptyAlt++;
    }
  }
}

console.log(`\n=== AUDIT SEO FINAL (${totalPages} pages) ===\n`);
console.log(`${issues.missingImages.size === 0 ? '✅' : '❌'} Images manquantes: ${issues.missingImages.size}`);
console.log(`${issues.emptyAlt === 0 ? '✅' : '❌'} Alt manquants: ${issues.emptyAlt}`);
console.log(`${issues.largeImages.length === 0 ? '✅' : '❌'} Images >300KB: ${issues.largeImages.length}`);
console.log(`${issues.longTitles.length === 0 ? '✅' : '❌'} Titres >60 chars: ${issues.longTitles.length}`);
console.log(`${issues.longMetas.length === 0 ? '✅' : '❌'} Metas >155 chars: ${issues.longMetas.length}`);

if (issues.missingImages.size > 0 && issues.missingImages.size <= 20) {
  console.log('\nImages manquantes:');
  [...issues.missingImages].forEach(src => console.log(`  ${src}`));
}

if (issues.largeImages.length > 0 && issues.largeImages.length <= 10) {
  console.log('\nImages >300KB:');
  issues.largeImages.forEach(({ page, src, size }) => console.log(`  ${src} (${size} KB) on ${page}`));
}

if (issues.longMetas.length > 0 && issues.longMetas.length <= 15) {
  console.log('\nMetas >155:');
  issues.longMetas.forEach(({ page, length }) => console.log(`  ${page} (${length})`));
}

const perfect = issues.missingImages.size === 0 && issues.emptyAlt === 0 && 
                issues.largeImages.length === 0 && issues.longTitles.length === 0 && 
                issues.longMetas.length === 0;

console.log(`\n${perfect ? '🎉 PARFAIT ! Référencement à 100%' : '⚠️  Corrections restantes'}\n`);
process.exit(perfect ? 0 : 1);
