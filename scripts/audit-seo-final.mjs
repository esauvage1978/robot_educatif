import { readdir, readFile, stat } from 'fs/promises';
import { join } from 'path';
import { parse } from 'node-html-parser';

const distDir = 'dist';
const issues = {
  missingImages: [],
  emptyAlt: [],
  largeImages: [],
  longTitles: [],
  longMetas: [],
};

// Find all HTML files
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

// Check if image exists
async function imageExists(imagePath) {
  const fullPath = join(distDir, imagePath.startsWith('/') ? imagePath.slice(1) : imagePath);
  try {
    await stat(fullPath);
    return true;
  } catch {
    return false;
  }
}

// Get image size
async function getImageSize(imagePath) {
  const fullPath = join(distDir, imagePath.startsWith('/') ? imagePath.slice(1) : imagePath);
  try {
    const stats = await stat(fullPath);
    return stats.size;
  } catch {
    return 0;
  }
}

// Process HTML files
let totalPages = 0;
for await (const htmlPath of walkHTML(distDir)) {
  totalPages++;
  const html = await readFile(htmlPath, 'utf-8');
  const root = parse(html);
  const relPath = htmlPath.replace(distDir + '/', '');

  // Check title length
  const titleEl = root.querySelector('title');
  if (titleEl) {
    const titleText = titleEl.text.trim();
    if (titleText.length > 60) {
      issues.longTitles.push({ page: relPath, title: titleText, length: titleText.length });
    }
  }

  // Check meta description
  const metaDesc = root.querySelector('meta[name="description"]');
  if (metaDesc) {
    const desc = metaDesc.getAttribute('content') || '';
    if (desc.length > 155) {
      issues.longMetas.push({ page: relPath, desc, length: desc.length });
    }
  }

  // Check images
  const images = root.querySelectorAll('img');
  for (const img of images) {
    const src = img.getAttribute('src');
    const alt = img.getAttribute('alt');

    // Check missing images (skip external, data:, and pagefind)
    if (src && !src.startsWith('http') && !src.startsWith('data:') && !src.includes('pagefind')) {
      const exists = await imageExists(src);
      if (!exists) {
        issues.missingImages.push({ page: relPath, src });
      } else {
        // Check image size
        const size = await getImageSize(src);
        if (size > 300 * 1024) {
          issues.largeImages.push({ page: relPath, src, size: Math.round(size / 1024) });
        }
      }
    }

    // Check empty alt (undefined or empty string)
    if (alt === undefined || alt === null) {
      issues.emptyAlt.push({ page: relPath, src: src || 'unknown' });
    }
  }
}

// Report
console.log(`\n=== AUDIT SEO FINAL (${totalPages} pages) ===\n`);

console.log(`📊 Images manquantes (404): ${issues.missingImages.length}`);
if (issues.missingImages.length > 0 && issues.missingImages.length <= 10) {
  issues.missingImages.forEach(({ page, src }) => console.log(`  - ${page}: ${src}`));
}

console.log(`\n📊 Alt manquants/vides: ${issues.emptyAlt.length}`);
if (issues.emptyAlt.length > 0 && issues.emptyAlt.length <= 10) {
  issues.emptyAlt.forEach(({ page, src }) => console.log(`  - ${page}: ${src}`));
}

console.log(`\n📊 Images >300 KB: ${issues.largeImages.length}`);
if (issues.largeImages.length > 0 && issues.largeImages.length <= 10) {
  issues.largeImages.forEach(({ page, src, size }) => console.log(`  - ${page}: ${src} (${size} KB)`));
}

console.log(`\n📊 Titres >60 caractères: ${issues.longTitles.length}`);
if (issues.longTitles.length > 0 && issues.longTitles.length <= 10) {
  issues.longTitles.forEach(({ page, title, length }) => console.log(`  - ${page}: "${title}" (${length} chars)`));
}

console.log(`\n📊 Meta descriptions >155 caractères: ${issues.longMetas.length}`);
if (issues.longMetas.length > 0 && issues.longMetas.length <= 10) {
  issues.longMetas.forEach(({ page, desc, length }) => console.log(`  - ${page}: "${desc.slice(0, 80)}..." (${length} chars)`));
}

console.log(`\n=== RÉSUMÉ ===`);
console.log(`✓ Pages analysées: ${totalPages}`);
console.log(`${issues.missingImages.length === 0 ? '✅' : '❌'} Images manquantes: ${issues.missingImages.length}`);
console.log(`${issues.emptyAlt.length === 0 ? '✅' : '❌'} Alt manquants: ${issues.emptyAlt.length}`);
console.log(`${issues.largeImages.length === 0 ? '✅' : '❌'} Images >300KB: ${issues.largeImages.length}`);
console.log(`${issues.longTitles.length === 0 ? '✅' : '❌'} Titres >60 chars: ${issues.longTitles.length}`);
console.log(`${issues.longMetas.length === 0 ? '✅' : '❌'} Metas >155 chars: ${issues.longMetas.length}`);

const allPerfect = issues.missingImages.length === 0 && 
                   issues.emptyAlt.length === 0 && 
                   issues.largeImages.length === 0 && 
                   issues.longTitles.length === 0 && 
                   issues.longMetas.length === 0;

console.log(`\n${allPerfect ? '🎉 PARFAIT ! Tous les indicateurs à 0' : '⚠️  Il reste des éléments à corriger'}\n`);
process.exit(allPerfect ? 0 : 1);
