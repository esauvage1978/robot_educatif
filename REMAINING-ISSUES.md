# Problèmes restants à corriger (commit dc2ddf3 + fixes contraste)

## ✅ Correctifs appliqués dans ce commit

### Contraste dark mode amélioré:

1. **Bouton primary (.btn-primary)** 
   - Avant: `var(--accent-warm)` (#F97316) sur blanc = 2.80:1 ❌
   - Après: `#C2410C` sur blanc en dark mode = 4.63:1 ✅

2. **Liens sidebar** (.widget a)
   - Avant: `var(--accent-dark)` = 2.34:1 ❌
   - Après: `#5EEAD4` (teal clair) en dark mode = ~5.5:1 ✅

3. **Bannière cookies**
   - Titre: `#5EEAD4` au lieu de `var(--accent-dark)` ✅
   - Texte: `#E2E8F0` au lieu de couleur par défaut ✅
   - Liens: `#5EEAD4` ✅

4. **Badge hero**
   - Déjà corrigé dans commit précédent: `#C2410C` bg + white text = 4.63:1 ✅

---

## ❌ Problèmes restants NON corrigés

### 1. PHOTOS PRODUITS (CRITIQUE)

Les 8 fichiers `public/images/products/*.webp` créés dans le commit dc2ddf3 sont des **placeholders SVG générés** (cercle + icône robot + "Photo fabricant à venir"), **pas des vraies photos**.

**Manquant:**
- mbot.webp
- mbot2.webp
- mbot-neo.webp
- cyberpi.webp
- mbot-ranger.webp
- codey-rocky.webp
- raspberry-pi-5-8gb.webp
- raspberry-pi-5-4gb.webp
- elegoo-robot-car.webp
- elegoo-penguin.webp
- lego-spike-essential.webp
- arduino-starter-kit.webp

**Requis:**
- Télécharger vraies photos officielles depuis sites fabricants (makeblock.com, education.makeblock.com, raspberrypi.com, elegoo.com, education.lego.com, store.arduino.cc)
- **JAMAIS** d'images amazon.fr ou m.media-amazon.com
- Convertir en WebP 600×600 fond blanc
- Taille ≥ 30 KB typiquement
- Noter source URL dans `src/data/product-image-sources.json`

**Tentative de téléchargement:**
Script `download-photos-temp.mjs` créé mais **ÉCHEC** "unsupported image format" pour toutes les URLs. Problème probable: URLs ne renvoient pas directement les images ou nécessitent authentification/headers spéciaux.

---

### 2. VIGNETTES BLOG UNIQUES (CRITIQUE)

**Problème actuel:** `/blog/` = 71 cartes mais seulement **10 images distinctes** (une image utilisée 21×).

**Requis:**
- Génération au build (satori/sharp) d'une vignette **1200×630 unique** par article
- Contenu: titre de l'article + catégorie
- Style: fond identité A (#0B1F2A/#0F766E), accent #F97316
- Optionnel: photo du produit principal de l'article
- Utilisée aussi comme `og:image` si l'article n'a pas d'image dédiée

**État actuel:**
- Fonction `resolveArticleThumbnail()` existe dans `src/lib/articleThumbnail.ts`
- Génère déjà des SVG uniques via `generateArticleThumbnail()`
- Mais apparemment seulement 10 images distinctes sont utilisées (à vérifier)

**À faire:**
- Script de build qui génère PNG 1200×630 pour chaque article via Satori
- Sauvegarder dans `public/images/blog-thumbnails/`
- Mettre à jour `resolveArticleThumbnail()` pour utiliser ces PNG
- **Vérifier:** `nombre d'images distinctes = nombre de cartes blog`

---

### 3. CONTRASTE - Éléments non testés

**Chips catégorie/tags dans articles:**
- Mentionné comme 3.09:1 par l'utilisateur
- **NON corrigé** (pas trouvé les styles exacts)
- À auditer et corriger

**Autres éléments non couverts:**
- Textes spécifiques dans les callouts/alerts (si présents)
- Boutons secondaires en dark mode
- Tags sur pages catégories

---

### 4. TOGGLE THÈME MOBILE (390px)

**À vérifier:**
- Le toggle doit être **accessible dans le menu hamburger** ou visible dans le header à 390px
- Actuellement implémenté dans `<Header>` desktop + menu mobile
- **Test requis:** screenshot mobile 390px pour confirmer visibilité

---

## 📋 Checklist pour prochain commit

- [ ] Télécharger 12 vraies photos produits (WebP 600×600 ≥ 30 KB)
- [ ] Créer `src/data/product-image-sources.json` avec URLs sources
- [ ] Créer script build génération vignettes blog (Satori → PNG 1200×630)
- [ ] Vérifier 134 vignettes uniques générées
- [ ] Corriger contraste chips catégorie/tags (trouver styles + fix)
- [ ] Audit complet dark mode (bannière cookies incluse)
- [ ] Screenshots mobile 390px (toggle visible?)
- [ ] Screenshots desktop dark mode (tous éléments ≥ 4.5:1)

---

## 🔍 Commandes de vérification

```bash
# Audit contraste automatisé
node audit-dark-mode-contrast.mjs

# Vérifier images distinctes blog
cd dist && find . -name "*.html" -path "*/blog/*" -exec grep -o 'src="[^"]*"' {} \; | sort | uniq -c | sort -rn

# Vérifier taille photos produits
ls -lh public/images/products/*.webp

# Build + check
npm run build
node scripts/check-missing-images.mjs
```
