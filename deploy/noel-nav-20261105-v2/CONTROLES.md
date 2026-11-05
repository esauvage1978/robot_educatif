# Contrôles — guide Noël 2026 (passe 2 : prose + sticky sommaire)

Date : 2026-11-05 (UTC)  
Page : `robot-educatif-cadeau-noel-2026/index.html`

## Patch appliqué

### Sommaire (retour Manu)

- Override live : `.guide-sidebar` en `position: static !important` (plus de sticky `top: 20px` sur toute la colonne).
- Sticky uniquement sur `.guide-sidebar__box--quick`, `top: var(--guide-sticky-top)` mesuré sur `.site-header` (+12px).
- `max-height: calc(100vh - var(--guide-sticky-top) - gap)` + défilement interne sur `.guide-sidebar__toc`.
- Mobile ≤1023px : sommaire repliable dans le flux (`is-toc-collapsed`), pas de sticky.
- Scroll-spy aligné sur `--guide-scroll-offset` (tolérance +2px).

### Prose

- Sections « Par âge », « Par budget », FAQ, Erreurs, Conseils, Récap : listes `<ul>` converties en paragraphes (cartes produits, tableaux, pros/cons inchangés).
- « Pourquoi offrir… » : déjà en prose (passe 1).
- FAQ : structure H3 + réponses conservée ; listes courtes fusionnées en phrases.

## Contrôles automatiques

| Contrôle | Résultat |
|----------|----------|
| Header `data-astro-cid` | `lv5sydnc` |
| Liens `/go/` (multiset) | **identiques** (23 URLs, 92 occurrences) |
| Entrées TOC | **8 H2** |
| FAQ dans nav | **1** entrée |
| SHA256 HTML final | `eabce2791a433ad832f59d85df73ffaa4c60d471a7ae187fe60e5689ed990121` |

## Tests viewport (`viewport_test.py`, serveur local `8766`)

Viewports : 375×667, 768×900, **1280×720**, 1280×900, **1440×800**, 1440×900.

| Critère | Résultat |
|---------|----------|
| Overflow horizontal | OK (tous) |
| 8 liens TOC | OK |
| `#par-budget` actif après scroll | OK |
| Desktop : sidebar static, quick sticky sous header | OK |
| Desktop : dernier lien TOC focusable en bas de page | OK |
| Mobile : Enter sur toggle → `aria-expanded=true` | OK |

Détails JSON : `viewport-test-results.json`

## Packaging TRUITE

Archive : `noel-nav-20261105-v2-output.tgz`  
Contenu : `robot-educatif-cadeau-noel-2026/index.html` uniquement.

Pas de déploiement dans cette passe.
