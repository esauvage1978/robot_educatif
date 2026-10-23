# ROBOT éducatif

Site statique [robot-educatif.info](https://robot-educatif.info/) — robotique et programmation éducatives : guides, tutoriels, comparatifs de robots programmables (mBot, mBot 2, CyberPi, Tale-Bot) et cours de programmation (Python, Arduino C).

## Stack technique

- **Framework** : [Astro 6.1](https://astro.build/)
- **Hébergement** : o2switch (Apache)
- **Déploiement** : build statique (`dist/`) + `.htaccess`

## Développement

```bash
# Installation des dépendances
npm install

# Serveur de développement
npm run dev

# Build de production
npm run build

# Prévisualisation du build
npm run preview
```

## Structure

- `src/pages/` : pages du site (Astro, Markdown)
- `src/content/blog/` : articles de blog (Markdown + frontmatter)
- `src/components/` : composants réutilisables
- `src/layouts/` : layouts (BlogPost, etc.)
- `public/` : fichiers statiques (images, fonts, `.htaccess`)

## Licence

Contenu éditorial © 2020-2026 Emmanuel SAUVAGE. Code du site sous licence MIT.
