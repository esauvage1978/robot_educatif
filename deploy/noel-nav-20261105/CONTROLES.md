# Contrôles — guide Noël 2026 (nav + prose)

Date : 2026-11-05 (UTC)  
Page : `robot-educatif-cadeau-noel-2026/index.html`

## Patch appliqué (HTML live)

- Script TOC : `h2[id]` uniquement (plus de H3 FAQ / sous-âges / paliers budget).
- Liste sommaire : `<ul>` sans numérotation OL + libellés sans préfixe « 1. ».
- Sidebar : bouton repliable mobile (`data-guide-toc-toggle`, `aria-expanded="false"` statique), panneau ouvert ≥1024px via JS.
- CSS local `data-noel-nav-fix="1"` : styles TOC, `is-active`, layout sidebar.
- Prose : blocs « Pourquoi offrir… » (4 sous-parties) réécrits en paragraphes fluides ; titres H3 sans numéros « 1.–4. ».

## Contrôles automatiques (agent)

| Contrôle | Résultat |
|----------|----------|
| Header `data-astro-cid` | `lv5sydnc` (identique live) |
| Liens `/go/` | 23 avant / 23 après — **identiques** |
| `href` amazon.* `tag=` | aucun |
| Mot entier `Manu` | absent |
| `aria-expanded="true"` hors script/style | absent |
| UTF-8 | OK |
| SHA256 HTML final | `e3781e7a6cac24e3d8f84f350fea2e9b43e404508f4f93380fb870b0c3714c27` |

## Tests viewport (Playwright, serveur local `8765`)

| Largeur | scrollWidth ≤ client | Entrées TOC | FAQ seule | Sous-âges/budget absents | `#par-budget` actif au scroll | Repli clavier mobile |
|---------|----------------------|-------------|-----------|--------------------------|-------------------------------|----------------------|
| 375 | OK | 8 H2 | OK | OK | OK | Enter → `aria-expanded=true` |
| 768 | OK | 8 | OK | OK | OK | OK |
| 1280 | OK | 8 | OK | OK | OK | n/a (ouvert) |
| 1440 | OK | 8 | OK | OK | OK | n/a |

Labels TOC observés :

1. Pourquoi offrir un robot à Noël ?
2. Nos recommandations par âge
3. Par budget
4. FAQ : questions fréquentes
5. Erreurs à éviter
6. Conseils pour commander
7. Conseils d'achat essentiels
8. Récapitulatif : nos recommandations par profil

## Packaging TRUITE

Archive finale : `noel-nav-20261105-output.tgz`  
Contenu : `robot-educatif-cadeau-noel-2026/index.html` uniquement (assets live inchangés).

Le parent exécutera `precheck_truite.sh` sur la box avant envoi TRUITE.
