import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

const heroes = [
  'src/assets/blog-heroes/hero-raspberry.png',
  'src/assets/blog-heroes/hero-scratch-mblock.png',
  'src/assets/blog-heroes/hero-mbot-vs.png',
  'src/assets/blog-heroes/hero-cyberpi.png'
];

for (const hero of heroes) {
  try {
    const baseName = hero.replace('.png', '');
    const webpPath = `${baseName}.webp`;
    
    console.log(`Converting ${hero}...`);
    await sharp(hero)
      .resize(1200, 630, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(webpPath);
    
    const stats = await stat(webpPath);
    console.log(`  Created ${webpPath} (${Math.round(stats.size / 1024)}KB)`);
    
    if (stats.size > 204800) {
      console.log(`  Size too large, reducing quality...`);
      await sharp(hero)
        .resize(1200, 630, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 75 })
        .toFile(webpPath);
      const newStats = await stat(webpPath);
      console.log(`  Reduced to ${Math.round(newStats.size / 1024)}KB`);
    }
  } catch (err) {
    console.error(`Error processing ${hero}:`, err.message);
  }
}

console.log('Done compressing hero images');
