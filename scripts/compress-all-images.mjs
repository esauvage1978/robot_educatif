import sharp from 'sharp';
import { readdir, stat, access } from 'fs/promises';
import { join } from 'path';

const imagesToCompress = [
  // Large blog images
  { src: 'public/images/blog/raspberry-pi3-mise-en-route/raspberry-pi-3-model-b-sven-petersen-cc-by-sa-4.jpg', maxSize: 250000 },
  { src: 'public/images/blog/inset-mbot2.png', maxSize: 250000 },
  { src: 'src/assets/eilik/eilik-hero.png', maxSize: 200000 },
  { src: 'src/assets/eilik/eilik-atelier.png', maxSize: 250000 },
  { src: 'src/assets/eilik/eilik-vs-programmable.png', maxSize: 250000 },
  { src: 'src/assets/codey-rocky/codey-rocky-hero.png', maxSize: 200000 },
  // mBlock captures
  { src: 'public/capture/mblock_add_mbot.png', maxSize: 250000 },
  { src: 'public/capture/mblock_add_mbot_validation.png', maxSize: 250000 },
  { src: 'public/capture/mbot_verification_bloc.png', maxSize: 250000 },
  { src: 'public/images/blog/installer-blocs-mbot/etape-02-bibliotheque.png', maxSize: 250000 },
  { src: 'public/images/blog/installer-blocs-mbot/etape-03-mbot-selectionne.png', maxSize: 250000 },
  { src: 'public/images/blog/installer-blocs-mbot/etape-04-palette-blocs-mbot.png', maxSize: 250000 },
  { src: 'public/images/blog/inset-mbot-vs.png', maxSize: 250000 },
  { src: 'public/images/blog/robots-educatif-plus-de-1000-euros-2026/ubtech-ugot-transforming.png', maxSize: 250000 },
  { src: 'public/images/blog/robots-educatif-plus-de-1000-euros-2026/elephant-myagv-pi.png', maxSize: 250000 },
];

for (const { src, maxSize } of imagesToCompress) {
  try {
    await access(src);
    const stats = await stat(src);
    
    if (stats.size > maxSize) {
      console.log(`Compressing ${src} (${Math.round(stats.size / 1024)}KB)...`);
      
      const ext = src.split('.').pop().toLowerCase();
      const output = src.replace(/\.(png|jpg|jpeg)$/i, '.webp');
      
      let quality = 85;
      await sharp(src)
        .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality })
        .toFile(output);
      
      let newStats = await stat(output);
      
      // Reduce quality if still too large
      if (newStats.size > maxSize) {
        quality = 75;
        await sharp(src)
          .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality })
          .toFile(output);
        newStats = await stat(output);
      }
      
      console.log(`  → ${output} (${Math.round(newStats.size / 1024)}KB, -${Math.round((1 - newStats.size / stats.size) * 100)}%)`);
    }
  } catch (err) {
    console.log(`  ⚠️  ${src} not found, skipping`);
  }
}

console.log('\nDone compressing images');
