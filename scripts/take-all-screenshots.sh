#!/bin/bash

OUTDIR="/tmp/final-screenshots"
mkdir -p "$OUTDIR"

# Function to take screenshot
take_screenshot() {
    local url="$1"
    local name="$2"
    local width="$3"
    local height="$4"
    
    echo "📸 Taking $name (${width}x${height})..."
    google-chrome \
        --headless \
        --disable-gpu \
        --screenshot="$OUTDIR/$name.png" \
        --window-size=$width,$height \
        --hide-scrollbars \
        --virtual-time-budget=10000 \
        "$url" 2>/dev/null
    
    if [ -f "$OUTDIR/$name.png" ]; then
        echo "   ✓ Saved $(du -h "$OUTDIR/$name.png" | cut -f1)"
    else
        echo "   ✗ Failed"
    fi
}

BASE="http://localhost:8080"

# Desktop 1280x1024
take_screenshot "$BASE/" "homepage-desktop" 1280 3000
take_screenshot "$BASE/robot-educatif-cadeau-noel-2026/" "guide-noel-desktop" 1280 3000
take_screenshot "$BASE/activite-scratch-le-carre/" "article-desktop" 1280 3000
take_screenshot "$BASE/categorie/mbot/" "categorie-desktop" 1280 3000
take_screenshot "$BASE/partenariat/" "partenariat-desktop" 1280 3000

# Mobile 390x844
take_screenshot "$BASE/" "homepage-mobile" 390 3000
take_screenshot "$BASE/robot-educatif-cadeau-noel-2026/" "guide-noel-mobile" 390 3000

# Footer screenshot (just load homepage and crop will happen later)
take_screenshot "$BASE/" "footer-desktop" 1280 2000

echo ""
echo "✅ All screenshots saved to: $OUTDIR/"
ls -lh "$OUTDIR/"
