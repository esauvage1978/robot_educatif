# Brief — pages faibles de robot-educatif

À lancer dans un agent Cursor cloud, modèle `composer-2.5`, `{"fast":"false"}`. Ne pas lancer plus de deux agents cloud en même temps.

## Objectif

Améliorer environ 25 pages faibles de robot-educatif.info (note auto < 70 d’après `score_regle.py` du 17/11/2026, 10 h 56 heure de Paris). Priorité : impressions GSC 28 jours (2026-10-19 → 2026-11-15) décroissantes, puis note auto croissante.

Les 60 pages déjà confiées au chantier de nuit du 16/11 (`/workspace/nuit_20261116/`, lots A et B de `robot-educatif.info.md`) sont **exclues**. Après exclusion et retrait des pages juridiques / recherche, il restait 217 pages éditoriales faibles avec au moins une impression : ce lot en prend les **25** premières par impressions.

## Dépôt et branche

- Dépôt : https://github.com/esauvage1978/robot_educatif
- Branche de base (**starting_ref et base de la PR**) : `cursor/gsc-audit-implementation-f5bd`
- **Jamais `master`, jamais la PR #23.** Partir de `cursor/gsc-audit-implementation-f5bd` et ouvrir **une seule PR** vers cette branche.
- Site : robot-educatif.info
- Pages de ce lot : **25**

- Exclusion : la page `src/pages/en/smart-home/best-zigbee-dongle-home-assistant.md` est traitée par l'autre agent (pages en 2e page de Google notées sous 70) : ne pas la modifier.


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

- Lis chaque fichier source indiqué et les variantes linguistiques. Si une page UK ou CA n’a pas de fichier dédié, édite la source EN ; le miroir `scripts/mirror-en-to-uk-ca.mjs` et `scripts/uk-ca-geo.mjs` produisent les URL `/uk/` et `/ca/` avec une canonique sur elles-mêmes.
- Quand deux URL du lot (EN + CA/UK) partagent la même source, ne fais la correction qu’une fois et vérifie les deux URLs dans le build.
- Corrige d’abord un gabarit ou un composant partagé quand le même défaut revient.
- Objectif : faire monter la note auto au-dessus de 70 en traitant les critères manquants et les bloquants (B04 = aucun visuel dans le contenu principal, B08 = trop peu de liens internes dans le contenu, B09 = page orpheline).
- De vraies photos uniquement ; un bloc sans photo valable est retiré proprement. Pas d’avis Amazon. Aucun texte destiné au bot ou à Manu sur le site.
- Le build peut demander `NODE_OPTIONS=--max-old-space-size=8192`.
- Résumé par page dans la description de la PR. Ne pas merger, ne pas publier.

## Pages à traiter (25), triées par impressions 28 jours puis par note


### 1. https://robot-educatif.info/en/makeblock-cyberpi-overview/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/en/makeblock-cyberpi-overview.md`
- Langue : en · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 68.3
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 6.1
- Impressions 28 jours : 692 · clics 28 jours : 3
- Position 90 jours / impressions 90 jours (info) : 6.1 / 692
- Liens internes entrants (contenu, `in_n`) : 9 · images : 1 · mots : 1595
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Structure utile 0.0/8 : pas de tableau ; pas de FAQ ; pas de sommaire · Affiliation 0.0/6 : aucun lien /go/, Amazon tagué ou rel=sponsored ; bloc produit non exigé (NV) · Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible

### 2. https://robot-educatif.info/en/first-mbot-program/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/en/first-mbot-program.md`
- Langue : en · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 65.5
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 9
- Impressions 28 jours : 576 · clics 28 jours : 6
- Position 90 jours / impressions 90 jours (info) : 9 / 576
- Liens internes entrants (contenu, `in_n`) : 28 · images : 0 · mots : 542
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Affiliation 0.0/6 : aucun lien /go/, Amazon tagué ou rel=sponsored ; bloc produit non exigé (NV) · Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible · Illustrations 3.0/10 : 0 image(s) utile(s), 1 SVG, attendu 2 ; aucun visuel ; poids non mesuré (NV)

### 3. https://robot-educatif.info/en/raspberry-pi-5-which-ram/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/en/raspberry-pi-5-which-ram.md`
- Langue : en · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 62.9
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 7.4
- Impressions 28 jours : 450 · clics 28 jours : 2
- Position 90 jours / impressions 90 jours (info) : 7.4 / 450
- Liens internes entrants (contenu, `in_n`) : 17 · images : 0 · mots : 558
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Affiliation 0.0/6 : aucun lien /go/, Amazon tagué ou rel=sponsored ; bloc produit non exigé (NV) · Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible · Performance GSC 0.0/4 : CTR 0.44% pour une position 7.4 (attendu 3.80%, ratio 0.12)

### 4. https://robot-educatif.info/en/smart-home/best-zigbee-dongle-home-assistant/

- **Ne pas modifier** : cette page est traitée par l'autre agent.

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/en/smart-home/best-zigbee-dongle-home-assistant.md`
- Langue : en · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 66.1
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 9.3
- Impressions 28 jours : 316 · clics 28 jours : 3
- Position 90 jours / impressions 90 jours (info) : 9.3 / 316
- Liens internes entrants (contenu, `in_n`) : 21 · images : 1 · mots : 397
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Affiliation 0.0/10 : aucun lien /go/, Amazon tagué ou rel=sponsored ; page commerciale sans bloc produit/comparatif · Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible · Performance GSC 1.0/4 : CTR 0.95% pour une position 9.3 (attendu 2.60%, ratio 0.37)

### 5. https://robot-educatif.info/en/mbot-vs-mbot2/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/en/mbot-vs-mbot2.md`
- Langue : en · type : comparatif
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 60.8
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 5.5
- Impressions 28 jours : 314 · clics 28 jours : 9
- Position 90 jours / impressions 90 jours (info) : 5.5 / 314
- Liens internes entrants (contenu, `in_n`) : 51 · images : 0 · mots : 526
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Affiliation 0.0/10 : aucun lien /go/, Amazon tagué ou rel=sponsored ; page commerciale sans bloc produit/comparatif · Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible · Illustrations 3.0/10 : 0 image(s) utile(s), 1 SVG, attendu 2 ; aucun visuel ; poids non mesuré (NV)

### 6. https://robot-educatif.info/en/lego-education-computer-science-ai-2026-spike-prime-alternatives/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/en/lego-education-computer-science-ai-2026-spike-prime-alternatives.md`
- Langue : en · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 68.2
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 5.2
- Impressions 28 jours : 267 · clics 28 jours : 9
- Position 90 jours / impressions 90 jours (info) : 5.2 / 267
- Liens internes entrants (contenu, `in_n`) : 4 · images : 0 · mots : 316
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible · Structure utile 3.0/8 : 1 tableau(x) ; pas de FAQ ; pas de sommaire · Profondeur 7.0/14 : 316 mots (seuil plein 700) ; 4 H2, 0 H3

### 7. https://robot-educatif.info/domotique/domotique-location-sans-travaux/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/content/domotique/domotique-location-sans-travaux.mdx`
- Langue : fr · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 66.0
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 3.9
- Impressions 28 jours : 235 · clics 28 jours : 0
- Position 90 jours / impressions 90 jours (info) : 3.9 / 235
- Liens internes entrants (contenu, `in_n`) : 12 · images : 0 · mots : 565
- Critères bloquants : B04
- Critères manquants (auto_gaps) : Illustrations 0.0/10 : 0 image(s) utile(s), 0 SVG, attendu 2 ; aucun visuel ; poids non mesuré (NV) · Affiliation 0.0/6 : aucun lien /go/, Amazon tagué ou rel=sponsored ; bloc produit non exigé (NV) · Performance GSC 0.0/4 : CTR 0.00% pour une position 3.9 (attendu 8.00%, ratio 0.00)
- Note source : Routée par `src/pages/domotique/[...slug].astro`. Éditer le MDX.

### 8. https://robot-educatif.info/en/smart-home/esp32-smart-home-project-ideas/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/en/smart-home/esp32-smart-home-project-ideas.md`
- Langue : en · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 69.8
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 10.2
- Impressions 28 jours : 225 · clics 28 jours : 19
- Position 90 jours / impressions 90 jours (info) : 10.2 / 225
- Liens internes entrants (contenu, `in_n`) : 29 · images : 0 · mots : 541
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Affiliation 0.0/6 : aucun lien /go/, Amazon tagué ou rel=sponsored ; bloc produit non exigé (NV) · Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible · Illustrations 3.0/10 : 0 image(s) utile(s), 1 SVG, attendu 2 ; aucun visuel ; poids non mesuré (NV)

### 9. https://robot-educatif.info/ca/first-mbot-program/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/en/first-mbot-program.md`
- Langue : ca · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 63.4
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 8.8
- Impressions 28 jours : 221 · clics 28 jours : 0
- Position 90 jours / impressions 90 jours (info) : 8.8 / 221
- Liens internes entrants (contenu, `in_n`) : 29 · images : 0 · mots : 542
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Affiliation 0.0/6 : aucun lien /go/, Amazon tagué ou rel=sponsored ; bloc produit non exigé (NV) · Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible · Performance GSC 0.0/4 : CTR 0.00% pour une position 8.8 (attendu 2.60%, ratio 0.00)
- Note source : Pas de fichier CA dédié : miroir EN → CA au build (`scripts/mirror-en-to-uk-ca.mjs`). Éditer la source EN. La page EN est aussi dans ce lot : traiter les deux comme une seule correction.
- Attention : Miroir de `https://robot-educatif.info/en/first-mbot-program/`, aussi dans ce lot. Une seule correction sur la source EN.

### 10. https://robot-educatif.info/de/raspberry-pi-5-welcher-ram/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/de/raspberry-pi-5-welcher-ram.md`
- Langue : de · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 65.0
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 7
- Impressions 28 jours : 219 · clics 28 jours : 4
- Position 90 jours / impressions 90 jours (info) : 7 / 219
- Liens internes entrants (contenu, `in_n`) : 12 · images : 0 · mots : 549
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Affiliation 0.0/6 : aucun lien /go/, Amazon tagué ou rel=sponsored ; bloc produit non exigé (NV) · Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible · Illustrations 3.0/10 : 0 image(s) utile(s), 1 SVG, attendu 2 ; aucun visuel ; poids non mesuré (NV)

### 11. https://robot-educatif.info/en/mblock-bluetooth-troubleshooting/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/en/mblock-bluetooth-troubleshooting.md`
- Langue : en · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 63.4
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 6.7
- Impressions 28 jours : 199 · clics 28 jours : 0
- Position 90 jours / impressions 90 jours (info) : 6.7 / 199
- Liens internes entrants (contenu, `in_n`) : 27 · images : 0 · mots : 444
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Affiliation 0.0/6 : aucun lien /go/, Amazon tagué ou rel=sponsored ; bloc produit non exigé (NV) · Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible · Performance GSC 0.0/4 : CTR 0.00% pour une position 6.7 (attendu 3.80%, ratio 0.00)

### 12. https://robot-educatif.info/de/erstes-mbot-programm/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/de/erstes-mbot-programm.md`
- Langue : de · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 65.5
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 5.9
- Impressions 28 jours : 187 · clics 28 jours : 5
- Position 90 jours / impressions 90 jours (info) : 5.9 / 187
- Liens internes entrants (contenu, `in_n`) : 23 · images : 0 · mots : 530
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Affiliation 0.0/6 : aucun lien /go/, Amazon tagué ou rel=sponsored ; bloc produit non exigé (NV) · Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible · Illustrations 3.0/10 : 0 image(s) utile(s), 1 SVG, attendu 2 ; aucun visuel ; poids non mesuré (NV)

### 13. https://robot-educatif.info/domotique/robot-aspirateur-laveur-serpilliere-station/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/content/domotique/robot-aspirateur-laveur-serpilliere-station.mdx`
- Langue : fr · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 69.7
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 24
- Impressions 28 jours : 172 · clics 28 jours : 0
- Position 90 jours / impressions 90 jours (info) : 24 / 172
- Liens internes entrants (contenu, `in_n`) : 7 · images : 0 · mots : 471
- Critères bloquants : B04
- Critères manquants (auto_gaps) : Illustrations 0.0/10 : 0 image(s) utile(s), 0 SVG, attendu 1 ; aucun visuel ; poids non mesuré (NV) · Affiliation 0.0/6 : aucun lien /go/, Amazon tagué ou rel=sponsored ; bloc produit non exigé (NV) · Performance GSC 0.0/4 : CTR 0.00% pour une position 24.0 (attendu 0.46%, ratio 0.00)
- Note source : Routée par `src/pages/domotique/[...slug].astro`. Éditer le MDX.

### 14. https://robot-educatif.info/de/lego-education-computer-science-ai-2026-spike-prime-alternativen/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/de/lego-education-computer-science-ai-2026-spike-prime-alternativen.md`
- Langue : de · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 66.1
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 8.4
- Impressions 28 jours : 169 · clics 28 jours : 1
- Position 90 jours / impressions 90 jours (info) : 8.4 / 169
- Liens internes entrants (contenu, `in_n`) : 3 · images : 0 · mots : 269
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible · Performance GSC 0.0/4 : CTR 0.59% pour une position 8.4 (attendu 3.20%, ratio 0.18) · Structure utile 3.0/8 : 1 tableau(x) ; pas de FAQ ; pas de sommaire

### 15. https://robot-educatif.info/domotique/installer-esphome-home-assistant/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/content/domotique/installer-esphome-home-assistant.mdx`
- Langue : fr · type : guide
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 67.6
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 22.2
- Impressions 28 jours : 168 · clics 28 jours : 1
- Position 90 jours / impressions 90 jours (info) : 22.2 / 168
- Liens internes entrants (contenu, `in_n`) : 14 · images : 0 · mots : 754
- Critères bloquants : B04
- Critères manquants (auto_gaps) : Illustrations 0.0/10 : 0 image(s) utile(s), 0 SVG, attendu 2 ; aucun visuel ; poids non mesuré (NV) · Affiliation 0.0/6 : aucun lien /go/, Amazon tagué ou rel=sponsored ; bloc produit non exigé (NV) · Intention 3.0/8 : seulement 1/3 mot(s) de « esphome projet devis » présents
- Note source : Routée par `src/pages/domotique/[...slug].astro`. Éditer le MDX.

### 16. https://robot-educatif.info/es/domotica/bases-cableado-esp32-gpio/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/es/domotica/bases-cableado-esp32-gpio.md`
- Langue : es · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 61.8
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 7.1
- Impressions 28 jours : 165 · clics 28 jours : 0
- Position 90 jours / impressions 90 jours (info) : 7.1 / 165
- Liens internes entrants (contenu, `in_n`) : 15 · images : 0 · mots : 865
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Affiliation 0.0/6 : aucun lien /go/, Amazon tagué ou rel=sponsored ; bloc produit non exigé (NV) · Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible · Performance GSC 0.0/4 : CTR 0.00% pour une position 7.1 (attendu 3.80%, ratio 0.00)

### 17. https://robot-educatif.info/ca/smart-home/home-assistant-green-vs-raspberry-pi-5/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/content/domotique/home-assistant-green-vs-raspberry-pi-5.mdx`
- Langue : ca · type : comparatif
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 64.6
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 6.3
- Impressions 28 jours : 164 · clics 28 jours : 1
- Position 90 jours / impressions 90 jours (info) : 6.3 / 164
- Liens internes entrants (contenu, `in_n`) : 16 · images : 1 · mots : 547
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Affiliation 0.0/10 : aucun lien /go/, Amazon tagué ou rel=sponsored ; page commerciale sans bloc produit/comparatif · Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible · Performance GSC 0.0/4 : CTR 0.61% pour une position 6.3 (attendu 4.80%, ratio 0.13)

### 18. https://robot-educatif.info/uk/smart-home/esphome-ota-updates/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/content/domotique-i18n/en/esphome-ota-updates.mdx`
- Langue : uk · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 67.8
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 6.9
- Impressions 28 jours : 158 · clics 28 jours : 0
- Position 90 jours / impressions 90 jours (info) : 6.9 / 158
- Liens internes entrants (contenu, `in_n`) : 14 · images : 1 · mots : 656
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Affiliation 0.0/6 : aucun lien /go/, Amazon tagué ou rel=sponsored ; bloc produit non exigé (NV) · Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible · Performance GSC 0.0/4 : CTR 0.00% pour une position 6.9 (attendu 3.80%, ratio 0.00)

### 19. https://robot-educatif.info/it/shelly-gen4-quale-modulo-scegliere/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/it/shelly-gen4-quale-modulo-scegliere.md`
- Langue : it · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 64.5
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 8.1
- Impressions 28 jours : 152 · clics 28 jours : 2
- Position 90 jours / impressions 90 jours (info) : 8.1 / 152
- Liens internes entrants (contenu, `in_n`) : 4 · images : 0 · mots : 599
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Affiliation 0.0/6 : aucun lien /go/, Amazon tagué ou rel=sponsored ; bloc produit non exigé (NV) · Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible · Illustrations 3.0/10 : 0 image(s) utile(s), 1 SVG, attendu 2 ; aucun visuel ; poids non mesuré (NV)

### 20. https://robot-educatif.info/uk/smart-home/first-smart-home-automations/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/en/smart-home/first-smart-home-automations.md`
- Langue : uk · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 69.1
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 39
- Impressions 28 jours : 150 · clics 28 jours : 0
- Position 90 jours / impressions 90 jours (info) : 39 / 150
- Liens internes entrants (contenu, `in_n`) : 4 · images : 0 · mots : 1541
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Affiliation 0.0/6 : aucun lien /go/, Amazon tagué ou rel=sponsored ; bloc produit non exigé (NV) · Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible · Performance GSC 0.0/4 : CTR 0.00% pour une position 39.0 (attendu 0.30%, ratio 0.00)
- Note source : Pas de fichier UK dédié : miroir EN → UK au build. Éditer la source EN.

### 21. https://robot-educatif.info/en/mbot-vs-codey-rocky/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/en/mbot-vs-codey-rocky.md`
- Langue : en · type : comparatif
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 69.6
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 5.8
- Impressions 28 jours : 141 · clics 28 jours : 1
- Position 90 jours / impressions 90 jours (info) : 5.8 / 141
- Liens internes entrants (contenu, `in_n`) : 16 · images : 1 · mots : 395
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible · Performance GSC 0.0/4 : CTR 0.71% pour une position 5.8 (attendu 4.80%, ratio 0.15) · Profondeur 5.0/14 : 395 mots (seuil plein 1200) ; 6 H2, 0 H3

### 22. https://robot-educatif.info/ca/makeblock-cyberpi-overview/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/en/makeblock-cyberpi-overview.md`
- Langue : ca · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 68.3
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 6.9
- Impressions 28 jours : 138 · clics 28 jours : 0
- Position 90 jours / impressions 90 jours (info) : 6.9 / 138
- Liens internes entrants (contenu, `in_n`) : 9 · images : 1 · mots : 1595
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Structure utile 0.0/8 : pas de tableau ; pas de FAQ ; pas de sommaire · Affiliation 0.0/6 : aucun lien /go/, Amazon tagué ou rel=sponsored ; bloc produit non exigé (NV) · Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible
- Note source : Pas de fichier CA dédié : miroir EN → CA au build. La page EN est aussi dans ce lot : une seule correction sur la source EN.
- Attention : Miroir de `https://robot-educatif.info/en/makeblock-cyberpi-overview/`, aussi dans ce lot. Une seule correction sur la source EN.

### 23. https://robot-educatif.info/tableau-reglages-capteurs-mbot2-depannage/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/tableau-reglages-capteurs-mbot2-depannage.astro`
- Langue : fr · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 60.4
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 4.8
- Impressions 28 jours : 132 · clics 28 jours : 4
- Position 90 jours / impressions 90 jours (info) : 4.8 / 132
- Liens internes entrants (contenu, `in_n`) : 3 · images : 1 · mots : 885
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Intention 0.0/8 : aucun mot de « cane marche pas » dans le title, le H1 ou l'intro · Affiliation 0.0/6 : aucun lien /go/, Amazon tagué ou rel=sponsored ; bloc produit non exigé (NV) · Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible

### 24. https://robot-educatif.info/es/robot-programable-10-anos/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/es/robot-programable-10-anos.md`
- Langue : es · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 68.2
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 7.9
- Impressions 28 jours : 116 · clics 28 jours : 6
- Position 90 jours / impressions 90 jours (info) : 7.9 / 116
- Liens internes entrants (contenu, `in_n`) : 16 · images : 0 · mots : 723
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible · Langue / hreflang 0.0/4 : aucun hreflang · Illustrations 3.0/10 : 0 image(s) utile(s), 1 SVG, attendu 2 ; aucun visuel ; poids non mesuré (NV)

### 25. https://robot-educatif.info/blog/

- Site : `robot-educatif.info`
- Dépôt GitHub : https://github.com/esauvage1978/robot_educatif
- Branche de base : `cursor/gsc-audit-implementation-f5bd`
- Fichier source : `src/pages/blog/index.astro`
- Langue : fr · type : page
- Note auto (score_regle.py, 17/11/2026 10 h 56, heure de Paris) : 62.7
- Position GSC 28 jours (2026-10-19 → 2026-11-15) : 30.1
- Impressions 28 jours : 108 · clics 28 jours : 1
- Position 90 jours / impressions 90 jours (info) : 27.4 / 259
- Liens internes entrants (contenu, `in_n`) : 1 · images : 96 · mots : 1943
- Critères bloquants : aucun
- Critères manquants (auto_gaps) : Structure utile 0.0/8 : pas de tableau ; pas de FAQ ; pas de sommaire · Affiliation 0.0/6 : aucun lien /go/, Amazon tagué ou rel=sponsored ; bloc produit non exigé (NV) · Fraîcheur 0.0/6 : aucune dateModified ni date de mise à jour visible


## Livrable

Une PR unique vers `cursor/gsc-audit-implementation-f5bd`, build OK, résumé par page, sans publication.
