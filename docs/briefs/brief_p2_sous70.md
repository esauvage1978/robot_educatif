# Brief — pages de 2ᵉ page Google, note auto sous 70

À lancer dans un agent Cursor cloud, modèle `composer-2.5`, `{"fast":"false"}`. Ne pas lancer plus de deux agents cloud en même temps. Cet agent ne travaille que sur **un** dépôt.

## Objectif

Améliorer les pages des sites affiliés qui, sur 28 jours GSC (2026-10-19 → 2026-11-15), ont une position moyenne entre 11 et 20 inclus, et une note auto inférieure à 70 (sortie de `score_regle.py` lancée le 17/11/2026 à 10 h 45, terminée à 10 h 56, heure de Paris, dans `C:\Users\emman\grokbot\affiliate\dashboard`). Classement par impressions 28 jours, puis par note.

Périmètre brut : 81 pages éditoriales sur 9 sites (les pages juridiques, cookies, contact, à propos, affiliation et recherche ont été écartées). Un agent ne travaillant que sur un dépôt, le lot ci-dessous est celui qui concentre le plus d’impressions.

## Dépôt et branche de ce lot

- Dépôt : https://github.com/esauvage1978/robot_educatif
- Branche de base (**starting_ref et base de la PR**) : `cursor/gsc-audit-implementation-f5bd`
- **Jamais `master`, jamais la PR #23.** Partir de `cursor/gsc-audit-implementation-f5bd` et ouvrir **une seule PR** vers cette branche.
- Site : robot-educatif.info
- Pages de ce lot : **25** (567 impressions sur 28 jours, sur 26 pages éligibles du site totalisant 568 impressions).


## Règles obligatoires

- Huit langues cohérentes : FR, EN, UK, CA, DE, IT, ES, NL. Si tu enrichis une page, aligne ses variantes linguistiques (hreflang réciproques, même intention, pas de copie EN brute sur UK/CA sans passage par le miroir prévu).
- Sur robot-educatif, la plupart des pages `/uk/` et `/ca/` n’ont pas de fichier source dédié : elles sont copiées depuis `/en/` au build par `scripts/mirror-en-to-uk-ca.mjs`, puis `scripts/uk-ca-geo.mjs` remet la canonique sur l’URL UK/CA elle-même. Dans ce cas, édite la source EN (sauf si un fichier UK ou CA existe déjà : alors ne l’écrase pas).
- De vraies photos uniquement, jamais la photo d’un autre modèle. Si un bloc image n’a pas de visuel valable pour ce modèle, retire le bloc proprement (pas d’image générique « pour faire joli », pas de logo du site comme photo produit).
- Aucun texte destiné au bot ou à Manu sur le site : pas de « Photo à fournir », TODO, FIXME, « lorem », commentaire de chantier, note d’agent.
- Pas d’avis Amazon.
- Maillage interne : au moins 3 liens entrants pertinents depuis d’autres pages éditoriales du site (pas seulement le menu ou le pied de page). Ajoute les liens au bon endroit, dans le contenu.
- Pas de noindex sur les pages de contenu.
- Canonique sur l’URL elle-même (pas vers une autre langue, pas vers une URL qui n’existe pas).
- hreflang réciproques, y compris x-default, et UK/CA en en-GB / en-CA quand les pages existent.
- Le build doit passer (`npm run build`). Ne pas lancer le script de publication ni `push_live.py`.
- Une seule PR vers la branche de base indiquée, avec un résumé par page (ce qui a été changé, ce qui manquait encore).
- Ne pas merger la PR, ne pas publier, ne pas toucher aux autres dépôts.
- Ne jamais afficher un secret, un mot de passe, un jeton ou une clé.


## Consignes de travail

- Lis chaque fichier source indiqué, le gabarit commun s’il y a lieu, et les variantes linguistiques.
- Corrige d’abord un gabarit ou un composant partagé quand le même défaut revient (date de mise à jour, CTA d’affiliation, visuel manquant, hreflang).
- Objectif : faire monter la note auto au-dessus de 70 en traitant les critères manquants et les bloquants (B04 = aucun visuel dans le contenu principal, B08 = trop peu de liens internes dans le contenu, B09 = page orpheline). B04/B08/B09 viennent d’une preuve dans le HTML publié, pas d’un problème d’indexation.
- Ne crée pas d’avis Amazon. N’invente pas de photo. N’ajoute aucun texte de chantier sur le site.
- Le build peut demander `NODE_OPTIONS=--max-old-space-size=8192`.
- Résumé par page dans la description de la PR.

La page `/programmation/puissance-4/` figurait déjà dans le lot B du chantier de nuit du 16/11 (`/workspace/nuit_20261116/`). Vérifie l’état actuel sur la branche de base avant de la réécrire : si le correctif de nuit est déjà là, complète seulement ce qui manque encore (note toujours sous 70, position 16,9 sur 28 jours) au lieu de tout recommencer.


## Pages à traiter (25), triées par impressions 28 jours


### 1. https://robot-educatif.info/en/smart-home/esp32-projects/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/en/smart-home/esp32-projects.md`
- Langue : en · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 61.7
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 18.6
- Impressions 28 jours : 77 · clics 28 jours : 3
- Position 90 jours / impressions 90 jours (info) : 18.6 / 77
- Liens internes entrants (contenu, `in_n`) : 3 · images : 0 · mots : 213
- Critères bloquants : B04
- Critères manquants (auto_gaps) : Illustrations 0.0/10 : 0 image(s) utile(s), 0 SVG, attendu 1 ; aucun visuel ; poids non mesuré (NV) · Affiliation 0.0/6 : aucun lien /go/, Amazon tagué ou rel=sponsored ; bloc produit non exigé (NV) · Profondeur 5.0/14 : 213 mots (seuil plein 700) ; 3 H2, 0 H3

### 2. https://robot-educatif.info/it/domotica/protocolli-domotica-zigbee-wifi-thread-matter/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/it/domotica/protocolli-domotica-zigbee-wifi-thread-matter.md`
- Langue : it · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 62.3
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 12.3
- Impressions 28 jours : 66 · clics 28 jours : 0
- Position 90 jours / impressions 90 jours (info) : 12.3 / 66
- Liens internes entrants (contenu, `in_n`) : 11 · images : 0 · mots : 673
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Affiliation 0.0/6 : aucun lien /go/, Amazon tagué ou rel=sponsored ; bloc produit non exigé (NV) · Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible · Performance GSC 0.0/4 : CTR 0.00% pour une position 12.3 (attendu 1.40%, ratio 0.00)

### 3. https://robot-educatif.info/es/domotica/robot-aspirador-navegacion-lidar/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/es/domotica/robot-aspirador-navegacion-lidar.md`
- Langue : es · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 68.8
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 11.1
- Impressions 28 jours : 61 · clics 28 jours : 0
- Position 90 jours / impressions 90 jours (info) : 11.1 / 61
- Liens internes entrants (contenu, `in_n`) : 4 · images : 1 · mots : 388
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Affiliation 0.0/6 : aucun lien /go/, Amazon tagué ou rel=sponsored ; bloc produit non exigé (NV) · Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible · Performance GSC 0.0/4 : CTR 0.00% pour une position 11.1 (attendu 1.60%, ratio 0.00)

### 4. https://robot-educatif.info/es/domotica/test-homey-pro-mini-unboxing-instalacion/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/es/domotica/test-homey-pro-mini-unboxing-instalacion.md`
- Langue : es · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 69.1
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 12.2
- Impressions 28 jours : 42 · clics 28 jours : 0
- Position 90 jours / impressions 90 jours (info) : 12.2 / 42
- Liens internes entrants (contenu, `in_n`) : 7 · images : 4 · mots : 362
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Structure utile 0.0/8 : pas de tableau ; pas de FAQ ; pas de sommaire · Affiliation 0.0/6 : aucun lien /go/, Amazon tagué ou rel=sponsored ; bloc produit non exigé (NV) · Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible

### 5. https://robot-educatif.info/de/smart-home/smart-home-mietwohnung-ohne-bohren/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/de/smart-home/smart-home-mietwohnung-ohne-bohren.md`
- Langue : de · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 64.0
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 13.8
- Impressions 28 jours : 39 · clics 28 jours : 0
- Position 90 jours / impressions 90 jours (info) : 13.8 / 39
- Liens internes entrants (contenu, `in_n`) : 8 · images : 0 · mots : 460
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Affiliation 0.0/6 : aucun lien /go/, Amazon tagué ou rel=sponsored ; bloc produit non exigé (NV) · Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible · Structure utile 3.0/8 : 1 tableau(x) ; pas de FAQ ; pas de sommaire

### 6. https://robot-educatif.info/de/smart-home/einstieg/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/de/smart-home/einstieg.md`
- Langue : de · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 67.3
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 14.6
- Impressions 28 jours : 37 · clics 28 jours : 0
- Position 90 jours / impressions 90 jours (info) : 14.6 / 37
- Liens internes entrants (contenu, `in_n`) : 17 · images : 0 · mots : 565
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Affiliation 0.0/6 : aucun lien /go/, Amazon tagué ou rel=sponsored ; bloc produit non exigé (NV) · Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible · Illustrations 3.0/10 : 0 image(s) utile(s), 1 SVG, attendu 2 ; aucun visuel ; poids non mesuré (NV)

### 7. https://robot-educatif.info/domotique/quelle-carte-esp32-choisir-domotique/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/content/domotique/quelle-carte-esp32-choisir-domotique.mdx`
- Langue : fr · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 69.7
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 12.6
- Impressions 28 jours : 35 · clics 28 jours : 0
- Position 90 jours / impressions 90 jours (info) : 12.6 / 35
- Liens internes entrants (contenu, `in_n`) : 19 · images : 0 · mots : 563
- Critères bloquants : B04
- Critères manquants (auto_gaps) : Illustrations 0.0/10 : 0 image(s) utile(s), 0 SVG, attendu 2 ; aucun visuel ; poids non mesuré (NV) · Affiliation 0.0/10 : aucun lien /go/, Amazon tagué ou rel=sponsored ; page commerciale sans bloc produit/comparatif · Structure utile 5.0/8 : 1 tableau(x) ; pas de FAQ ; sommaire
- Note source : Routée par le gabarit `src/pages/domotique/[...slug].astro`. Éditer le MDX, pas seulement le gabarit.

### 8. https://robot-educatif.info/programmation/puissance-4/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/programmation/puissance-4/index.astro`
- Langue : fr · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 60.0
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 16.9
- Impressions 28 jours : 28 · clics 28 jours : 0
- Position 90 jours / impressions 90 jours (info) : 11.5 / 98
- Liens internes entrants (contenu, `in_n`) : 23 · images : 1 · mots : 221
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Intention 0.0/8 : aucun mot de « site:robot-educatif.info » dans le title, le H1 ou l'intro · Affiliation 0.0/6 : aucun lien /go/, Amazon tagué ou rel=sponsored ; bloc produit non exigé (NV) · Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible
- Attention : Déjà dans le lot B du chantier de nuit du 16/11. Vérifier l’état actuel avant de réécrire.

### 9. https://robot-educatif.info/en/smart-home/getting-started/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/en/smart-home/getting-started.md`
- Langue : en · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 67.3
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 17.1
- Impressions 28 jours : 26 · clics 28 jours : 0
- Position 90 jours / impressions 90 jours (info) : 17.1 / 26
- Liens internes entrants (contenu, `in_n`) : 22 · images : 0 · mots : 628
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Affiliation 0.0/6 : aucun lien /go/, Amazon tagué ou rel=sponsored ; bloc produit non exigé (NV) · Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible · Illustrations 3.0/10 : 0 image(s) utile(s), 1 SVG, attendu 2 ; aucun visuel ; poids non mesuré (NV)

### 10. https://robot-educatif.info/de/lernroboter-6-jahre/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/de/lernroboter-6-jahre.md`
- Langue : de · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 68.4
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 13
- Impressions 28 jours : 26 · clics 28 jours : 0
- Position 90 jours / impressions 90 jours (info) : 13 / 26
- Liens internes entrants (contenu, `in_n`) : 5 · images : 0 · mots : 569
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible · Langue / hreflang 0.0/4 : aucun hreflang · Illustrations 3.0/10 : 0 image(s) utile(s), 1 SVG, attendu 2 ; aucun visuel ; poids non mesuré (NV)

### 11. https://robot-educatif.info/uk/smart-home/homey-pro-mini-unboxing-setup/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/en/smart-home/homey-pro-mini-unboxing-setup.md`
- Langue : uk · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 65.6
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 13.4
- Impressions 28 jours : 18 · clics 28 jours : 1
- Position 90 jours / impressions 90 jours (info) : 13.4 / 18
- Liens internes entrants (contenu, `in_n`) : 7 · images : 0 · mots : 463
- Critères bloquants : B04
- Critères manquants (auto_gaps) : Illustrations 0.0/10 : 0 image(s) utile(s), 0 SVG, attendu 1 ; aucun visuel ; poids non mesuré (NV) · Affiliation 0.0/6 : aucun lien /go/, Amazon tagué ou rel=sponsored ; bloc produit non exigé (NV) · Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible
- Note source : Pas de fichier UK dédié : miroir EN → UK. Un doublon possible existe dans `src/content/domotique-i18n/en/homey-pro-mini-unboxing-setup.mdx` : vérifier lequel alimente réellement la page avant d’éditer.

### 12. https://robot-educatif.info/es/domotica/matriz-compatibilidad-home-assistant-homey-zigbee-matter/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/es/domotica/matriz-compatibilidad-home-assistant-homey-zigbee-matter.astro`
- Langue : es · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 47.8
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 18.1
- Impressions 28 jours : 17 · clics 28 jours : 0
- Position 90 jours / impressions 90 jours (info) : 18.1 / 17
- Liens internes entrants (contenu, `in_n`) : 7 · images : 0 · mots : 254
- Critères bloquants : B08 B04
- Critères manquants (auto_gaps) : Illustrations 0.0/10 : 0 image(s) utile(s), 0 SVG, attendu 1 ; aucun visuel ; poids non mesuré (NV) · Affiliation 0.0/6 : aucun lien /go/, Amazon tagué ou rel=sponsored ; bloc produit non exigé (NV) · Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible

### 13. https://robot-educatif.info/it/robot-programmabile-6-anni/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/it/robot-programmabile-6-anni.md`
- Langue : it · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 68.4
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 11.2
- Impressions 28 jours : 17 · clics 28 jours : 0
- Position 90 jours / impressions 90 jours (info) : 11.2 / 17
- Liens internes entrants (contenu, `in_n`) : 5 · images : 0 · mots : 525
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible · Langue / hreflang 0.0/4 : aucun hreflang · Illustrations 3.0/10 : 0 image(s) utile(s), 1 SVG, attendu 2 ; aucun visuel ; poids non mesuré (NV)

### 14. https://robot-educatif.info/it/domotica/come-iniziare/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/it/domotica/come-iniziare.md`
- Langue : it · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 61.8
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 12.6
- Impressions 28 jours : 16 · clics 28 jours : 1
- Position 90 jours / impressions 90 jours (info) : 12.6 / 16
- Liens internes entrants (contenu, `in_n`) : 13 · images : 0 · mots : 582
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Affiliation 0.0/6 : aucun lien /go/, Amazon tagué ou rel=sponsored ; bloc produit non exigé (NV) · Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible · Illustrations 3.0/10 : 0 image(s) utile(s), 1 SVG, attendu 2 ; aucun visuel ; poids non mesuré (NV)

### 15. https://robot-educatif.info/categorie/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/categorie/index.astro`
- Langue : fr · type : categorie
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 64.8
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 12.6
- Impressions 28 jours : 11 · clics 28 jours : 0
- Position 90 jours / impressions 90 jours (info) : 7.8 / 68
- Liens internes entrants (contenu, `in_n`) : 69 · images : 3 · mots : 331
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Affiliation 0.0/6 : aucun lien /go/, Amazon tagué ou rel=sponsored ; bloc produit non exigé (NV) · Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible · Performance GSC 0.0/4 : CTR 0.00% pour une position 7.8 (attendu 3.20%, ratio 0.00)
- Note source : Index des catégories. Améliorer le gabarit et le maillage vers les catégories filles.

### 16. https://robot-educatif.info/uk/smart-home/best-zigbee-dongle-home-assistant/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/en/smart-home/best-zigbee-dongle-home-assistant.md`
- Langue : uk · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 62.6
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 16.7
- Impressions 28 jours : 10 · clics 28 jours : 0
- Position 90 jours / impressions 90 jours (info) : 16.7 / 10
- Liens internes entrants (contenu, `in_n`) : 21 · images : 1 · mots : 397
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Affiliation 0.0/10 : aucun lien /go/, Amazon tagué ou rel=sponsored ; page commerciale sans bloc produit/comparatif · Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible · Structure utile 3.0/8 : 1 tableau(x) ; pas de FAQ ; pas de sommaire
- Note source : Pas de fichier UK dédié : page produite au build par `scripts/mirror-en-to-uk-ca.mjs` à partir de la version EN. Modifier la source EN, puis laisser le miroir et `scripts/uk-ca-geo.mjs` poser la canonique sur elle-même.

### 17. https://robot-educatif.info/es/robot-programable-6-anos/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/es/robot-programable-6-anos.md`
- Langue : es · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 65.1
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 12.1
- Impressions 28 jours : 9 · clics 28 jours : 0
- Position 90 jours / impressions 90 jours (info) : 12.1 / 9
- Liens internes entrants (contenu, `in_n`) : 5 · images : 0 · mots : 544
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible · Langue / hreflang 0.0/4 : aucun hreflang · Illustrations 3.0/10 : 0 image(s) utile(s), 1 SVG, attendu 2 ; aucun visuel ; poids non mesuré (NV)

### 18. https://robot-educatif.info/programmes/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/programmes/index.astro`
- Langue : fr · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 66.2
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 13.3
- Impressions 28 jours : 7 · clics 28 jours : 0
- Position 90 jours / impressions 90 jours (info) : 8.4 / 41
- Liens internes entrants (contenu, `in_n`) : 9 · images : 1 · mots : 253
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Affiliation 0.0/6 : aucun lien /go/, Amazon tagué ou rel=sponsored ; bloc produit non exigé (NV) · Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible · Langue / hreflang 0.0/4 : aucun hreflang

### 19. https://robot-educatif.info/de/marke-makeblock/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/de/marke-makeblock.md`
- Langue : de · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 62.9
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 17.4
- Impressions 28 jours : 7 · clics 28 jours : 0
- Position 90 jours / impressions 90 jours (info) : 17.4 / 7
- Liens internes entrants (contenu, `in_n`) : 23 · images : 0 · mots : 325
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Structure utile 0.0/8 : pas de tableau ; pas de FAQ ; pas de sommaire · Affiliation 0.0/6 : aucun lien /go/, Amazon tagué ou rel=sponsored ; bloc produit non exigé (NV) · Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible

### 20. https://robot-educatif.info/uk/smart-home/smart-home-trends-2027-ces-mmwave-local-ai-energy/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/en/smart-home/smart-home-trends-2027-ces-mmwave-local-ai-energy.md`
- Langue : uk · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 67.8
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 11.8
- Impressions 28 jours : 5 · clics 28 jours : 1
- Position 90 jours / impressions 90 jours (info) : 11.8 / 5
- Liens internes entrants (contenu, `in_n`) : 1 · images : 0 · mots : 241
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible · Profondeur 5.0/14 : 241 mots (seuil plein 700) ; 3 H2, 0 H3 · Structure utile 3.0/8 : 1 tableau(x) ; pas de FAQ ; pas de sommaire
- Note source : Pas de fichier UK dédié : miroir EN → UK au build (`scripts/mirror-en-to-uk-ca.mjs`). Éditer la source EN.

### 21. https://robot-educatif.info/uk/educational-robot-christmas-gifts-2026/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/en/educational-robot-christmas-gifts-2026.astro`
- Langue : uk · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 30.0
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 13.5
- Impressions 28 jours : 4 · clics 28 jours : 0
- Position 90 jours / impressions 90 jours (info) : 13.5 / 4
- Liens internes entrants (contenu, `in_n`) : 7 · images : 0 · mots : 0
- Critères bloquants : B08
- Critères manquants (auto_gaps) : Profondeur 0.0/14 : 0 mots seulement (seuil 700) ; 0 H2, 0 H3 · Structure utile 0.0/8 : pas de tableau ; pas de FAQ ; pas de sommaire · Affiliation 0.0/6 : aucun lien /go/, Amazon tagué ou rel=sponsored ; bloc produit non exigé (NV)
- Note source : Pas de fichier UK dédié : miroir EN → UK au build. Une variante CA existe déjà (`src/pages/ca/educational-robot-christmas-gifts-2026.astro`) : ne pas l’écraser. L’audit a lu 0 mot sur l’URL UK : vérifier que le miroir produit bien le contenu, et que la page n’est pas vide.

### 22. https://robot-educatif.info/partenariat/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/partenariat.astro`
- Langue : fr · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 62.6
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 13.7
- Impressions 28 jours : 3 · clics 28 jours : 0
- Position 90 jours / impressions 90 jours (info) : 6 / 49
- Liens internes entrants (contenu, `in_n`) : 170 · images : 3 · mots : 388
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Affiliation 0.0/6 : aucun lien /go/, Amazon tagué ou rel=sponsored ; bloc produit non exigé (NV) · Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible · Langue / hreflang 0.0/4 : aucun hreflang
- Note source : Page institutionnelle de partenariat (pas une fiche produit). Rester factuel ; pas de texte interne.

### 23. https://robot-educatif.info/es/domotica/domotica-alquiler-sin-obras/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/es/domotica/domotica-alquiler-sin-obras.md`
- Langue : es · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 64.1
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 17.3
- Impressions 28 jours : 3 · clics 28 jours : 0
- Position 90 jours / impressions 90 jours (info) : 17.3 / 3
- Liens internes entrants (contenu, `in_n`) : 7 · images : 0 · mots : 521
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Affiliation 0.0/6 : aucun lien /go/, Amazon tagué ou rel=sponsored ; bloc produit non exigé (NV) · Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible · Illustrations 3.0/10 : 0 image(s) utile(s), 1 SVG, attendu 2 ; aucun visuel ; poids non mesuré (NV)

### 24. https://robot-educatif.info/categorie/cadeaux/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/categorie/[slug].astro`
- Langue : fr · type : categorie
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 64.1
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 14
- Impressions 28 jours : 2 · clics 28 jours : 0
- Position 90 jours / impressions 90 jours (info) : 14 / 2
- Liens internes entrants (contenu, `in_n`) : 8 · images : 1 · mots : 143
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Affiliation 0.0/6 : aucun lien /go/, Amazon tagué ou rel=sponsored ; bloc produit non exigé (NV) · Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible · Langue / hreflang 0.0/4 : aucun hreflang
- Note source : Page catégorie générée. Compléter aussi les données dans `src/lib/categories.ts` si le texte ou les liens de la catégorie « cadeaux » y sont définis.

### 25. https://robot-educatif.info/es/socios/cambuy-de/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/es/socios/[partenaire].astro`
- Langue : es · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 55.1
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 12
- Impressions 28 jours : 1 · clics 28 jours : 0
- Position 90 jours / impressions 90 jours (info) : 12 / 1
- Liens internes entrants (contenu, `in_n`) : 1 · images : 0 · mots : 28
- Critères bloquants : B08
- Critères manquants (auto_gaps) : Profondeur 0.0/14 : 28 mots seulement (seuil 700) ; 0 H2, 0 H3 · Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible · Structure utile 2.0/8 : pas de tableau ; pas de FAQ ; sommaire
- Note source : Fiche partenaire générée par le gabarit. Si le contenu est trop mince, enrichir le gabarit commun (toutes langues) et/ou les données du partenaire, sans dupliquer une rustine sur une seule fiche.


## Autres dépôts, pour plus tard (ne pas traiter dans cette PR)

Ils ont aussi des pages en position 11–20 avec une note auto sous 70, mais moins d’impressions que robot-educatif. Un prochain agent par dépôt, toujours vers la branche indiquée.

- **wattbalcon.fr** — 16 pages, 83 impressions sur 28 jours. Dépôt : https://github.com/esauvage1978/wattbalcon — branche `main`. Exemples : `https://wattbalcon.fr/it/fotovoltaico-balcone-normativa/` (19 imp., note 60.7, pos. 18.4, B08 B04), `https://wattbalcon.fr/en/balcony-solar/` (15 imp., note 61.1, pos. 15.1, B04), `https://wattbalcon.fr/ca/balcony-battery/` (8 imp., note 64.4, pos. 12.2, B04), `https://wattbalcon.fr/kit-solaire-balcon/code-erreur/anker-solix-ct-smart-meter/` (7 imp., note 67.8, pos. 12.1, B04), `https://wattbalcon.fr/en/deals/` (5 imp., note 49.4, pos. 19.8, B09 B04).
- **happypetlab.com** — 7 pages, 65 impressions sur 28 jours. Dépôt : https://github.com/esauvage1978/happypetlab — branche `main`. Exemples : `https://happypetlab.com/en/pet-cameras/furbo-nanny-subscription-cost/` (17 imp., note 68.4, pos. 11.4, B04), `https://happypetlab.com/ca/` (15 imp., note 69.1, pos. 15.3), `https://happypetlab.com/litieres-autonettoyantes/code-erreur/tractive-abonnement/` (10 imp., note 66.9, pos. 19.7, B04), `https://happypetlab.com/litieres-autonettoyantes/code-erreur/tractive-offline/` (9 imp., note 67.3, pos. 12.1, B04), `https://happypetlab.com/en/dog-food/grain-free-natural-dog-food-compared/` (9 imp., note 68.4, pos. 17.8, B04).
- **piscinebot.fr** — 10 pages, 63 impressions sur 28 jours. Dépôt : https://github.com/esauvage1978/piscinebot — branche `main`. Exemples : `https://piscinebot.fr/ca/guides/` (23 imp., note 50.0, pos. 19, B09 B04), `https://piscinebot.fr/en/promo-codes/` (12 imp., note 68.9, pos. 12.8, B04), `https://piscinebot.fr/de/ratgeber/poolroboter-kreist/` (8 imp., note 49.6, pos. 16, B08 B04), `https://piscinebot.fr/de/marken/worx/` (6 imp., note 54.0, pos. 16.5, B04), `https://piscinebot.fr/es/codigos-descuento/` (5 imp., note 68.9, pos. 18.8, B04).
- **scan3dlab.com** — 8 pages, 60 impressions sur 28 jours. Dépôt : https://github.com/esauvage1978/scan3dlab — branche `main`. Exemples : `https://scan3dlab.com/es/codigos-descuento/` (21 imp., note 69.6, pos. 13.7, B04), `https://scan3dlab.com/es/filamentos/generador-perfil-filamento-orca-slicer/` (10 imp., note 66.2, pos. 11.3), `https://scan3dlab.com/uk/cutting-engraving/` (9 imp., note 68.0, pos. 19.8, B04), `https://scan3dlab.com/filaments/generateur-profil-orca-slicer-export-json/` (7 imp., note 66.2, pos. 16), `https://scan3dlab.com/de/3d-drucker/fcc-leaks-bambu-lab-p3c-x2d-pro-qidi-smart-5/` (6 imp., note 65.1, pos. 16.2, B04).
- **1piece1ampoule.fr** — 6 pages, 22 impressions sur 28 jours. Dépôt : https://github.com/esauvage1978/1piece1ampoule — branche `main`. Exemples : `https://1piece1ampoule.fr/en/guides/e27-vs-b22/` (7 imp., note 67.7, pos. 15.3), `https://1piece1ampoule.fr/en/guides/gu10-led-flicker-dimmer-diagnosis/` (7 imp., note 69.5, pos. 19.7), `https://1piece1ampoule.fr/partenaires/osram-homelighting-fr/` (3 imp., note 66.1, pos. 13.7), `https://1piece1ampoule.fr/accessoires/` (3 imp., note 68.5, pos. 17.7, B08 B09), `https://1piece1ampoule.fr/ca/guides/smart-led-troubleshooting/` (1 imp., note 63.4, pos. 11).
- **iapourmonmetier.fr** — 2 pages, 8 impressions sur 28 jours. Dépôt : https://github.com/esauvage1978/iapourmonmetier — branche `main`. Exemples : `https://iapourmonmetier.fr/outils/calculateur-quantites-buffet-traiteur/` (7 imp., note 68.4, pos. 15.4), `https://iapourmonmetier.fr/guides/matrice-metier-outil-ia-conformite-rgpd/` (1 imp., note 67.1, pos. 11).
- **saunajardin.fr** — 3 pages, 5 impressions sur 28 jours. Dépôt : https://github.com/esauvage1978/saunajardin — branche `main`. Exemples : `https://saunajardin.fr/en/guides/sauna-heater-cable-breaker-calculator/` (2 imp., note 63.8, pos. 12.5), `https://saunajardin.fr/de/ratgeber/saunaholz-arten/` (2 imp., note 66.3, pos. 17.5), `https://saunajardin.fr/de/saunaofen/infrarot-vs-elektro-vergleich/` (1 imp., note 53.5, pos. 12, B09).
- **droneandrc.com** — 3 pages, 4 impressions sur 28 jours. Dépôt : https://github.com/esauvage1978/droneandrc — branche `main`. Exemples : `https://droneandrc.com/ca/drones/by-budget/` (2 imp., note 62.3, pos. 14.5, B08), `https://droneandrc.com/uk/transmitters-batteries/frequencies/` (1 imp., note 64.9, pos. 12, B08), `https://droneandrc.com/de/drohnen/ab-14-jahren/` (1 imp., note 68.7, pos. 12, B08).

Homebothub, locaihome et kittableur n’avaient aucune page éditoriale dans ce filtre (position 11–20 sur 28 jours et note auto < 70).

## Livrable

Une PR unique vers `cursor/gsc-audit-implementation-f5bd`, build OK, résumé par page, sans publication.
