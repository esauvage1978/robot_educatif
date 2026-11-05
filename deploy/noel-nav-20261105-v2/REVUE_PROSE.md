# Revue prose — passe 2

## Listes dans le corps article (hors cartes produits / tableaux / pros-cons)

| Métrique | Avant (`index.html.before`) | Après |
|----------|----------------------------|-------|
| `<ul>` | 73 | 9 |
| `<ol>` | 5 | 4 |

## Liens `/go/`

Multiset identique : **92** liens (23 URLs uniques).

## Sticky sommaire

- Sidebar colonne : `position: static` (override live `top: 20px`).
- Boîte « Navigation rapide » seule : sticky avec `--guide-sticky-top` mesuré sur `.site-header`.
- `max-height: calc(100vh - top - gap)` + scroll interne sur `.guide-sidebar__toc`.
- Mobile : repliable (`is-toc-collapsed`), pas de sticky.

## SHA256 `index.html`

`eabce2791a433ad832f59d85df73ffaa4c60d471a7ae187fe60e5689ed990121`
