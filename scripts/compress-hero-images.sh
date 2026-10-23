#!/bin/bash
# Compress hero PNG images to WebP <200KB

cd src/assets/blog-heroes

for png in hero-raspberry.png hero-scratch-mblock.png hero-mbot-vs.png hero-cyberpi.png; do
  if [ -f "$png" ]; then
    base="${png%.png}"
    echo "Converting $png to ${base}.webp..."
    
    # Convert to WebP with quality 85, max 1200x630 for OG
    magick "$png" -resize '1200x630>' -quality 85 "${base}.webp"
    
    # Check size and reduce quality if needed
    size=$(stat -f%z "${base}.webp" 2>/dev/null || stat -c%s "${base}.webp" 2>/dev/null)
    
    if [ $size -gt 204800 ]; then
      echo "  Size $size too large, reducing quality..."
      magick "$png" -resize '1200x630>' -quality 75 "${base}.webp"
    fi
    
    echo "  Created ${base}.webp"
  fi
done

echo "Done compressing hero images"
