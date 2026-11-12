# Audit contenu IA & SEO — robot-educatif.info

*Généré le 2026-10-28 à partir de `src/` et des exports Bing AI du 28/10/2026.*

## Synthèse exécutive

| Indicateur | Valeur |
|------------|--------|
| Pages inventoriées (blog + domotique + pages statiques) | 232 |
| Pages citées Bing AI (rapport pages) | 106 |
| Articles blog | 149 |
| Guides domotique | 27 |
| Pages Astro (hors dynamiques) | 56 |
| Citations IA totales (somme rapport) | 6217 |

Le site concentre aujourd’hui les citations IA sur **Scratch**, **Arduino C**, **mBot/mBlock**, **Python fonctions** et **guides d’achat robots**. Environ **65** articles blog ne figurent pas encore dans le top 106 Bing AI : opportunité GEO pour élargir le nombre de pages citées (domotique, séries capteurs, pendu Python, comparatifs budget).

## Architecture éditoriale

- **Blog** (`src/content/blog/`) : articles slug racine `/{slug}/`, layouts `BlogPost.astro`, séries Python et Arduino C via champs `series` / `seriesOrder`.
- **Domotique** (`src/content/domotique/`) : préfixe `/domotique/{slug}/`, layout `DomotiquePost.astro`.
- **Hubs programmation** (`src/pages/programmation/`) : index Astro listant les leçons (Python, Arduino C, projets).
- **i18n** : miroirs EN/DE/IT/ES pour smart-home et articles clés ; hreflang via `i18n.mjs`.
- **Affiliation** : `ProductBox`, `ComparisonTable`, presets Amazon — tags existants à conserver.

## Risques de cannibalisation

| Cluster | Pages en concurrence | Recommandation |
|---------|---------------------|----------------|
| Guide achat par âge | 5, 6, 7, 8, 10, 12 ans + meilleur 2026 | Différencier intention (âge vs comparatif marques vs Noël) ; ancres descriptives croisées |
| mBlock installation | Windows 10, Windows 11, en ligne | Canonical distincts ; liens « selon votre OS » en tête |
| mBot vs mBot2 vs CyberPi | 3 comparatifs | Tableaux techniques uniques ; pas dupliquer les mêmes specs |
| Scratch entrée | école/maison, carré, mBlock vs Scratch | Pilier = scratch-ecole-maison ; satellites = activités |

## Qualité & GEO (constats dépôt)

- **Réponses directes sous H1** : déployées sur les lots A–C (oct. 2026) — bloc autonome daté, puis H2 en questions.
- **FAQ** : présente sur plusieurs guides ; éviter répétition mot pour mot entre articles du même cluster.
- **Dépannage structuré** : modèle Symptôme → Diagnostic → Solution sur articles mBlock/forum (`mblock-depannage-codes-erreurs-mbot-arduino.mdx`).
- **Meta descriptions** : contrôle post-build 140–165 caractères via script audit.

## Opportunités contenu (non citées IA mais stratégiques)

- Série **capteur ultrason mBot** (4 articles) : maillage depuis 10 projets.
- **Domotique FR** (27 guides) : faible présence IA actuelle — tableaux protocoles, dates firmware.
- **Télécharger mBlock 5** : requête « mblock installer » partiellement couverte.
- **Python intermédiaire** (venv, fichiers, erreurs) : requêtes Bing présentes, pages mid-tail à renforcer.

## Priorités (P0 → P2)

| P | Action |
|---|--------|
| P0 | Lots A–C : enrichissement GEO + tableaux vérifiés (cette livraison) |
| P1 | Étendre citations : domotique + séries pédagogiques + pages EN alignées |
| P2 | Réduire overlap meta/titles guides âge ; enrichir llms.txt |

## Inventaire complet (extrait structuré)

<details>
<summary>232 URLs sources (cliquer pour développer)</summary>

| Type | URL | Fichier source |
|------|-----|----------------|
| blog | https://robot-educatif.info/10-projets-mbot-gratuits-classe-faciles/ | `src/content/blog/10-projets-mbot-gratuits-classe-faciles.mdx` |
| blog | https://robot-educatif.info/accessoires-mbot-par-ou-commencer/ | `src/content/blog/accessoires-mbot-par-ou-commencer.md` |
| blog | https://robot-educatif.info/activite-mbot-detecteur-dintrusion/ | `src/content/blog/activite-mbot-detecteur-dintrusion.md` |
| blog | https://robot-educatif.info/activite-mbot-faire-clignoter-les-leds/ | `src/content/blog/activite-mbot-faire-clignoter-les-leds.md` |
| blog | https://robot-educatif.info/activite-mbot-faire-defiler-un-texte/ | `src/content/blog/activite-mbot-faire-defiler-un-texte.md` |
| blog | https://robot-educatif.info/activite-mbot-mesurer-des-distances/ | `src/content/blog/activite-mbot-mesurer-des-distances.md` |
| blog | https://robot-educatif.info/activite-scratch-le-carre/ | `src/content/blog/activite-scratch-le-carre.md` |
| blog | https://robot-educatif.info/alternatives-lego-spike-comparatif-2026/ | `src/content/blog/alternatives-lego-spike-comparatif-2026.mdx` |
| blog | https://robot-educatif.info/c-arduino-boucles-timing/ | `src/content/blog/c-arduino-boucles-timing.md` |
| blog | https://robot-educatif.info/c-arduino-conditions-capteurs-actionneurs/ | `src/content/blog/c-arduino-conditions-capteurs-actionneurs.md` |
| blog | https://robot-educatif.info/c-arduino-environnement-structure-sketch/ | `src/content/blog/c-arduino-environnement-structure-sketch.md` |
| blog | https://robot-educatif.info/c-arduino-fonctions-modularite-bonnes-pratiques/ | `src/content/blog/c-arduino-fonctions-modularite-bonnes-pratiques.md` |
| blog | https://robot-educatif.info/c-arduino-types-variables/ | `src/content/blog/c-arduino-types-variables.md` |
| blog | https://robot-educatif.info/cadeau-geek-ado-programmation/ | `src/content/blog/cadeau-geek-ado-programmation.mdx` |
| blog | https://robot-educatif.info/cadeau-robot-enfant-10-ans/ | `src/content/blog/cadeau-robot-enfant-10-ans.mdx` |
| blog | https://robot-educatif.info/cadeau-robot-enfant-8-ans/ | `src/content/blog/cadeau-robot-enfant-8-ans.mdx` |
| blog | https://robot-educatif.info/deballage-et-premier-pas-du-robot-tale-bot-de-chez-matatalab/ | `src/content/blog/deballage-et-premier-pas-du-robot-tale-bot-de-chez-matatalab.md` |
| blog | https://robot-educatif.info/decouvrez-makeblock-cyberpi-une-carte-de-developpement-electronique-polyvalente/ | `src/content/blog/decouvrez-makeblock-cyberpi-une-carte-de-developpement-electronique-polyvalente.md` |
| blog | https://robot-educatif.info/equiper-classe-robots-budget-packs-2026/ | `src/content/blog/equiper-classe-robots-budget-packs-2026.mdx` |
| blog | https://robot-educatif.info/idees-cadeaux-robotique-noel-rentree-anniversaire/ | `src/content/blog/idees-cadeaux-robotique-noel-rentree-anniversaire.md` |
| blog | https://robot-educatif.info/idees-projets-mbot-rapides-une-heure/ | `src/content/blog/idees-projets-mbot-rapides-une-heure.mdx` |
| blog | https://robot-educatif.info/installer-les-blocs-du-mbot/ | `src/content/blog/installer-les-blocs-du-mbot.md` |
| blog | https://robot-educatif.info/installer-mblock-5-sous-windows-10/ | `src/content/blog/installer-mblock-5-sous-windows-10.mdx` |
| blog | https://robot-educatif.info/kit-raspberry-pi-5-complet/ | `src/content/blog/kit-raspberry-pi-5-complet.mdx` |
| blog | https://robot-educatif.info/kit-robotique-adulte-debutant/ | `src/content/blog/kit-robotique-adulte-debutant.mdx` |
| blog | https://robot-educatif.info/le-robot-tale-bot-de-chez-matatalab-questions-reponses/ | `src/content/blog/le-robot-tale-bot-de-chez-matatalab-questions-reponses.md` |
| blog | https://robot-educatif.info/le-robot-tale-bot-de-chez-matatalab-un-outil-educatif-pour-enfants/ | `src/content/blog/le-robot-tale-bot-de-chez-matatalab-un-outil-educatif-pour-enfants.md` |
| blog | https://robot-educatif.info/logiciel-mblock-makeblock-mbot-quel-choisir/ | `src/content/blog/logiciel-mblock-makeblock-mbot-quel-choisir.md` |
| blog | https://robot-educatif.info/marque-elegoo/ | `src/content/blog/marque-elegoo.md` |
| blog | https://robot-educatif.info/marque-lego/ | `src/content/blog/marque-lego.md` |
| blog | https://robot-educatif.info/marque-makeblock/ | `src/content/blog/marque-makeblock.md` |
| blog | https://robot-educatif.info/marque-matatalab/ | `src/content/blog/marque-matatalab.md` |
| blog | https://robot-educatif.info/marque-raspberry-pi/ | `src/content/blog/marque-raspberry-pi.md` |
| blog | https://robot-educatif.info/marque-sonoff/ | `src/content/blog/marque-sonoff.md` |
| blog | https://robot-educatif.info/marques/ | `src/content/blog/marques.md` |
| blog | https://robot-educatif.info/matatalab-une-entreprise-innovante/ | `src/content/blog/matatalab-une-entreprise-innovante.md` |
| blog | https://robot-educatif.info/mblock-bluetooth-erreurs-frequentes-depannage/ | `src/content/blog/mblock-bluetooth-erreurs-frequentes-depannage.md` |
| blog | https://robot-educatif.info/mblock-depannage-codes-erreurs-mbot-arduino/ | `src/content/blog/mblock-depannage-codes-erreurs-mbot-arduino.mdx` |
| blog | https://robot-educatif.info/mblock-en-ligne-programmer-sans-installer/ | `src/content/blog/mblock-en-ligne-programmer-sans-installer.md` |
| blog | https://robot-educatif.info/mblock-vs-scratch-lequel-choisir/ | `src/content/blog/mblock-vs-scratch-lequel-choisir.mdx` |
| blog | https://robot-educatif.info/mbot-avis-faut-il-acheter-pour-un-enfant/ | `src/content/blog/mbot-avis-faut-il-acheter-pour-un-enfant.mdx` |
| blog | https://robot-educatif.info/mbot-mon-premier-robot-educatif/ | `src/content/blog/mbot-mon-premier-robot-educatif.md` |
| blog | https://robot-educatif.info/mbot-vs-codey-rocky-comparatif/ | `src/content/blog/mbot-vs-codey-rocky-comparatif.md` |
| blog | https://robot-educatif.info/mbot-vs-lego-robot-lequel-est-le-meilleur/ | `src/content/blog/mbot-vs-lego-robot-lequel-est-le-meilleur.md` |
| blog | https://robot-educatif.info/mbot-vs-mbot2-comparaison-des-robots-educatifs-pour-enfants/ | `src/content/blog/mbot-vs-mbot2-comparaison-des-robots-educatifs-pour-enfants.md` |
| blog | https://robot-educatif.info/mbot2-de-makeblock-le-robot-educatif-pour-apprendre-la-robotique/ | `src/content/blog/mbot2-de-makeblock-le-robot-educatif-pour-apprendre-la-robotique.md` |
| blog | https://robot-educatif.info/mbot2-vs-cyberpi-comparatif/ | `src/content/blog/mbot2-vs-cyberpi-comparatif.md` |
| blog | https://robot-educatif.info/meilleur-robot-educatif-arduino-kit-choisir/ | `src/content/blog/meilleur-robot-educatif-arduino-kit-choisir.mdx` |
| blog | https://robot-educatif.info/meilleur-robot-programmable-enfant-2026/ | `src/content/blog/meilleur-robot-programmable-enfant-2026.mdx` |
| blog | https://robot-educatif.info/mise-en-route-raspberry-pi-3-modele-b/ | `src/content/blog/mise-en-route-raspberry-pi-3-modele-b.md` |
| blog | https://robot-educatif.info/mon-premier-programme-mbot/ | `src/content/blog/mon-premier-programme-mbot.md` |
| blog | https://robot-educatif.info/premier-pas-avec-mblock-5/ | `src/content/blog/premier-pas-avec-mblock-5.mdx` |
| blog | https://robot-educatif.info/prix-mbot-mbot2-ranger-comparatif-2026/ | `src/content/blog/prix-mbot-mbot2-ranger-comparatif-2026.mdx` |
| blog | https://robot-educatif.info/programmation-enfant-a-quel-age-commencer/ | `src/content/blog/programmation-enfant-a-quel-age-commencer.md` |
| blog | https://robot-educatif.info/projet-av-journal-1-architecture/ | `src/content/blog/projet-av-journal-1-architecture.md` |
| blog | https://robot-educatif.info/projet-av-journal-2-parse-generateurs/ | `src/content/blog/projet-av-journal-2-parse-generateurs.md` |
| blog | https://robot-educatif.info/projet-av-journal-3-decorateurs/ | `src/content/blog/projet-av-journal-3-decorateurs.md` |
| blog | https://robot-educatif.info/projet-av-journal-4-asyncio-batch/ | `src/content/blog/projet-av-journal-4-asyncio-batch.md` |
| blog | https://robot-educatif.info/projet-av-journal-5-typing-mypy/ | `src/content/blog/projet-av-journal-5-typing-mypy.md` |
| blog | https://robot-educatif.info/projet-av-journal-6-package-pyproject/ | `src/content/blog/projet-av-journal-6-package-pyproject.md` |
| blog | https://robot-educatif.info/projet-inter-agenda-1-cahier-des-charges/ | `src/content/blog/projet-inter-agenda-1-cahier-des-charges.md` |
| blog | https://robot-educatif.info/projet-inter-agenda-2-donnees-pathlib/ | `src/content/blog/projet-inter-agenda-2-donnees-pathlib.md` |
| blog | https://robot-educatif.info/projet-inter-agenda-3-modele-poo/ | `src/content/blog/projet-inter-agenda-3-modele-poo.md` |
| blog | https://robot-educatif.info/projet-inter-agenda-4-tests-pytest/ | `src/content/blog/projet-inter-agenda-4-tests-pytest.md` |
| blog | https://robot-educatif.info/projet-inter-agenda-5-cli-argparse/ | `src/content/blog/projet-inter-agenda-5-cli-argparse.md` |
| blog | https://robot-educatif.info/projet-inter-agenda-6-livraison-extensions/ | `src/content/blog/projet-inter-agenda-6-livraison-extensions.md` |
| blog | https://robot-educatif.info/python-av-asyncio/ | `src/content/blog/python-av-asyncio.md` |
| blog | https://robot-educatif.info/python-av-context-managers/ | `src/content/blog/python-av-context-managers.md` |
| blog | https://robot-educatif.info/python-av-decorateurs-functools/ | `src/content/blog/python-av-decorateurs-functools.md` |
| blog | https://robot-educatif.info/python-av-generateurs-iterateurs/ | `src/content/blog/python-av-generateurs-iterateurs.md` |
| blog | https://robot-educatif.info/python-av-packaging-pyproject/ | `src/content/blog/python-av-packaging-pyproject.md` |
| blog | https://robot-educatif.info/python-av-typing-avance/ | `src/content/blog/python-av-typing-avance.md` |
| blog | https://robot-educatif.info/python-bataille-navale-1-cahier-des-charges/ | `src/content/blog/python-bataille-navale-1-cahier-des-charges.md` |
| blog | https://robot-educatif.info/python-bataille-navale-2-grille-et-affichage/ | `src/content/blog/python-bataille-navale-2-grille-et-affichage.md` |
| blog | https://robot-educatif.info/python-bataille-navale-3-placement-bateaux/ | `src/content/blog/python-bataille-navale-3-placement-bateaux.md` |
| blog | https://robot-educatif.info/python-bataille-navale-4-tirs-et-marques/ | `src/content/blog/python-bataille-navale-4-tirs-et-marques.md` |
| blog | https://robot-educatif.info/python-bataille-navale-5-coule-et-victoire/ | `src/content/blog/python-bataille-navale-5-coule-et-victoire.md` |
| blog | https://robot-educatif.info/python-bataille-navale-6-jeu-complet/ | `src/content/blog/python-bataille-navale-6-jeu-complet.md` |
| blog | https://robot-educatif.info/python-boucles-for-while/ | `src/content/blog/python-boucles-for-while.md` |
| blog | https://robot-educatif.info/python-carnet-todo-1-cahier-json/ | `src/content/blog/python-carnet-todo-1-cahier-json.md` |
| blog | https://robot-educatif.info/python-carnet-todo-2-lire-ecrire-json/ | `src/content/blog/python-carnet-todo-2-lire-ecrire-json.md` |
| blog | https://robot-educatif.info/python-carnet-todo-3-modele-donnees/ | `src/content/blog/python-carnet-todo-3-modele-donnees.md` |
| blog | https://robot-educatif.info/python-carnet-todo-4-menu-cli/ | `src/content/blog/python-carnet-todo-4-menu-cli.md` |
| blog | https://robot-educatif.info/python-carnet-todo-5-persistance/ | `src/content/blog/python-carnet-todo-5-persistance.md` |
| blog | https://robot-educatif.info/python-carnet-todo-6-projet-complet/ | `src/content/blog/python-carnet-todo-6-projet-complet.md` |
| blog | https://robot-educatif.info/python-conditions-if-else/ | `src/content/blog/python-conditions-if-else.md` |
| blog | https://robot-educatif.info/python-environnement-developpement/ | `src/content/blog/python-environnement-developpement.md` |
| blog | https://robot-educatif.info/python-erreurs-debogage/ | `src/content/blog/python-erreurs-debogage.md` |
| blog | https://robot-educatif.info/python-fichiers-texte/ | `src/content/blog/python-fichiers-texte.md` |
| blog | https://robot-educatif.info/python-fonctions/ | `src/content/blog/python-fonctions.md` |
| blog | https://robot-educatif.info/python-inter-modules-imports/ | `src/content/blog/python-inter-modules-imports.md` |
| blog | https://robot-educatif.info/python-inter-pathlib/ | `src/content/blog/python-inter-pathlib.md` |
| blog | https://robot-educatif.info/python-inter-poo-classes/ | `src/content/blog/python-inter-poo-classes.md` |
| blog | https://robot-educatif.info/python-inter-regex-re/ | `src/content/blog/python-inter-regex-re.md` |
| blog | https://robot-educatif.info/python-inter-tests-qualite/ | `src/content/blog/python-inter-tests-qualite.md` |
| blog | https://robot-educatif.info/python-inter-venv-pip/ | `src/content/blog/python-inter-venv-pip.md` |
| blog | https://robot-educatif.info/python-listes-et-chaines/ | `src/content/blog/python-listes-et-chaines.md` |
| blog | https://robot-educatif.info/python-mini-jeu-terminal/ | `src/content/blog/python-mini-jeu-terminal.md` |
| blog | https://robot-educatif.info/python-pendu-1-cahier-mot-masque/ | `src/content/blog/python-pendu-1-cahier-mot-masque.md` |
| blog | https://robot-educatif.info/python-pendu-2-mots-depuis-fichier/ | `src/content/blog/python-pendu-2-mots-depuis-fichier.md` |
| blog | https://robot-educatif.info/python-pendu-3-affichage-lettres/ | `src/content/blog/python-pendu-3-affichage-lettres.md` |
| blog | https://robot-educatif.info/python-pendu-4-boucle-partie/ | `src/content/blog/python-pendu-4-boucle-partie.md` |
| blog | https://robot-educatif.info/python-pendu-5-victoire-defaite/ | `src/content/blog/python-pendu-5-victoire-defaite.md` |
| blog | https://robot-educatif.info/python-pendu-6-projet-complet/ | `src/content/blog/python-pendu-6-projet-complet.md` |
| blog | https://robot-educatif.info/python-puissance-4-1-cahier-grille/ | `src/content/blog/python-puissance-4-1-cahier-grille.md` |
| blog | https://robot-educatif.info/python-puissance-4-2-affichage-gravite/ | `src/content/blog/python-puissance-4-2-affichage-gravite.md` |
| blog | https://robot-educatif.info/python-puissance-4-3-coup-alternance/ | `src/content/blog/python-puissance-4-3-coup-alternance.md` |
| blog | https://robot-educatif.info/python-puissance-4-4-quatre-alignes/ | `src/content/blog/python-puissance-4-4-quatre-alignes.md` |
| blog | https://robot-educatif.info/python-puissance-4-5-match-nul/ | `src/content/blog/python-puissance-4-5-match-nul.md` |
| blog | https://robot-educatif.info/python-puissance-4-6-jeu-complet/ | `src/content/blog/python-puissance-4-6-jeu-complet.md` |
| blog | https://robot-educatif.info/python-types-et-saisie/ | `src/content/blog/python-types-et-saisie.md` |
| blog | https://robot-educatif.info/python-variables-affichage/ | `src/content/blog/python-variables-affichage.md` |
| blog | https://robot-educatif.info/quel-robot-acheter-enfant-10-ans-guide-achat/ | `src/content/blog/quel-robot-acheter-enfant-10-ans-guide-achat.mdx` |
| blog | https://robot-educatif.info/quel-robot-acheter-enfant-12-ans-guide-achat/ | `src/content/blog/quel-robot-acheter-enfant-12-ans-guide-achat.mdx` |
| blog | https://robot-educatif.info/quel-robot-acheter-enfant-5-ans-guide-achat/ | `src/content/blog/quel-robot-acheter-enfant-5-ans-guide-achat.mdx` |
| blog | https://robot-educatif.info/quel-robot-acheter-enfant-6-ans-guide-achat/ | `src/content/blog/quel-robot-acheter-enfant-6-ans-guide-achat.mdx` |
| blog | https://robot-educatif.info/quel-robot-acheter-enfant-7-ans-guide-achat/ | `src/content/blog/quel-robot-acheter-enfant-7-ans-guide-achat.mdx` |
| blog | https://robot-educatif.info/quel-robot-acheter-enfant-8-ans-guide-achat/ | `src/content/blog/quel-robot-acheter-enfant-8-ans-guide-achat.md` |
| blog | https://robot-educatif.info/quel-robot-educatif-autour-de-200-euros-guide-2026/ | `src/content/blog/quel-robot-educatif-autour-de-200-euros-guide-2026.mdx` |
| blog | https://robot-educatif.info/quel-robot-educatif-choisir-2026/ | `src/content/blog/quel-robot-educatif-choisir-2026.md` |
| blog | https://robot-educatif.info/quel-robot-educatif-entre-200-et-500-euros-guide-2026/ | `src/content/blog/quel-robot-educatif-entre-200-et-500-euros-guide-2026.mdx` |
| blog | https://robot-educatif.info/quel-robot-educatif-entre-500-et-1000-euros-guide-2026/ | `src/content/blog/quel-robot-educatif-entre-500-et-1000-euros-guide-2026.md` |
| blog | https://robot-educatif.info/quel-robot-educatif-plus-de-1000-euros-guide-expert-2026/ | `src/content/blog/quel-robot-educatif-plus-de-1000-euros-guide-expert-2026.md` |
| blog | https://robot-educatif.info/raspberry-pi-3-vs-4-vs-5-comparatif-2026/ | `src/content/blog/raspberry-pi-3-vs-4-vs-5-comparatif-2026.md` |
| blog | https://robot-educatif.info/raspberry-pi-4-quelle-version-memoire-acheter/ | `src/content/blog/raspberry-pi-4-quelle-version-memoire-acheter.md` |
| blog | https://robot-educatif.info/raspberry-pi-5-quelle-version-memoire-acheter/ | `src/content/blog/raspberry-pi-5-quelle-version-memoire-acheter.mdx` |
| blog | https://robot-educatif.info/raspberry-pi-ou-kit-robot-ado-guide/ | `src/content/blog/raspberry-pi-ou-kit-robot-ado-guide.md` |
| blog | https://robot-educatif.info/robot-educatif-cadeau-noel-2026/ | `src/content/blog/robot-educatif-cadeau-noel-2026.mdx` |
| blog | https://robot-educatif.info/robot-educatif-codey-rocky-makeblock/ | `src/content/blog/robot-educatif-codey-rocky-makeblock.md` |
| blog | https://robot-educatif.info/robot-educatif-eilik-compagnon/ | `src/content/blog/robot-educatif-eilik-compagnon.md` |
| blog | https://robot-educatif.info/robot-educatif-pas-cher-compromis/ | `src/content/blog/robot-educatif-pas-cher-compromis.md` |
| blog | https://robot-educatif.info/robot-educatif-sans-ecran-guide/ | `src/content/blog/robot-educatif-sans-ecran-guide.md` |
| blog | https://robot-educatif.info/robot-enfant-4-ans/ | `src/content/blog/robot-enfant-4-ans.mdx` |
| blog | https://robot-educatif.info/robot-enfant-6-ans/ | `src/content/blog/robot-enfant-6-ans.mdx` |
| blog | https://robot-educatif.info/robot-moins-de-100-euros/ | `src/content/blog/robot-moins-de-100-euros.mdx` |
| blog | https://robot-educatif.info/robot-moins-de-50-euros/ | `src/content/blog/robot-moins-de-50-euros.mdx` |
| blog | https://robot-educatif.info/robot-pedagogique-ecole/ | `src/content/blog/robot-pedagogique-ecole.mdx` |
| blog | https://robot-educatif.info/robot-programmable-14-ans-ado/ | `src/content/blog/robot-programmable-14-ans-ado.mdx` |
| blog | https://robot-educatif.info/robot-programmable-python/ | `src/content/blog/robot-programmable-python.mdx` |
| blog | https://robot-educatif.info/robot-programmable-scratch-lequel-choisir/ | `src/content/blog/robot-programmable-scratch-lequel-choisir.mdx` |
| blog | https://robot-educatif.info/robots-technologie-college-guide/ | `src/content/blog/robots-technologie-college-guide.mdx` |
| blog | https://robot-educatif.info/scratch-creer-un-jeu-video-premiere-partie/ | `src/content/blog/scratch-creer-un-jeu-video-premiere-partie.md` |
| blog | https://robot-educatif.info/scratch-ecole-maison-par-ou-commencer/ | `src/content/blog/scratch-ecole-maison-par-ou-commencer.md` |
| blog | https://robot-educatif.info/serie-capteur-ultrason-mbot-1-mesurer-distance/ | `src/content/blog/serie-capteur-ultrason-mbot-1-mesurer-distance.md` |
| blog | https://robot-educatif.info/serie-capteur-ultrason-mbot-2-radar-recul-paliers/ | `src/content/blog/serie-capteur-ultrason-mbot-2-radar-recul-paliers.md` |
| blog | https://robot-educatif.info/serie-capteur-ultrason-mbot-3-radar-recul-cadence-distance/ | `src/content/blog/serie-capteur-ultrason-mbot-3-radar-recul-cadence-distance.md` |
| blog | https://robot-educatif.info/serie-capteur-ultrason-mbot-4-ralentir-sarreter-obstacle/ | `src/content/blog/serie-capteur-ultrason-mbot-4-ralentir-sarreter-obstacle.md` |
| blog | https://robot-educatif.info/sinscrire-sur-mblock/ | `src/content/blog/sinscrire-sur-mblock.md` |
| blog | https://robot-educatif.info/telecharger-mblock-5-gratuit-guide-2026/ | `src/content/blog/telecharger-mblock-5-gratuit-guide-2026.md` |
| domotique | https://robot-educatif.info/domotique/camera-surveillance-exterieure-solaire-iegeek/ | `src/content/domotique/camera-surveillance-exterieure-solaire-iegeek.mdx` |
| domotique | https://robot-educatif.info/domotique/capteur-temperature-zigbee/ | `src/content/domotique/capteur-temperature-zigbee.mdx` |
| domotique | https://robot-educatif.info/domotique/debuter-domotique-par-ou-commencer/ | `src/content/domotique/debuter-domotique-par-ou-commencer.mdx` |
| domotique | https://robot-educatif.info/domotique/domotique-location-sans-travaux/ | `src/content/domotique/domotique-location-sans-travaux.mdx` |
| domotique | https://robot-educatif.info/domotique/esp32-esphome-capteur-temperature/ | `src/content/domotique/esp32-esphome-capteur-temperature.mdx` |
| domotique | https://robot-educatif.info/domotique/home-assistant-green-vs-raspberry-pi-5/ | `src/content/domotique/home-assistant-green-vs-raspberry-pi-5.mdx` |
| domotique | https://robot-educatif.info/domotique/home-assistant-jeedom-homey-quel-systeme-choisir/ | `src/content/domotique/home-assistant-jeedom-homey-quel-systeme-choisir.mdx` |
| domotique | https://robot-educatif.info/domotique/home-assistant-raspberry-pi-5-installation/ | `src/content/domotique/home-assistant-raspberry-pi-5-installation.mdx` |
| domotique | https://robot-educatif.info/domotique/home-assistant-zigbee2mqtt-ou-zha/ | `src/content/domotique/home-assistant-zigbee2mqtt-ou-zha.mdx` |
| domotique | https://robot-educatif.info/domotique/meilleur-dongle-zigbee-home-assistant/ | `src/content/domotique/meilleur-dongle-zigbee-home-assistant.mdx` |
| domotique | https://robot-educatif.info/domotique/ouvrir-porte-garage-smartphone-esp32-esphome/ | `src/content/domotique/ouvrir-porte-garage-smartphone-esp32-esphome.mdx` |
| domotique | https://robot-educatif.info/domotique/piloter-chauffage-electrique-fil-pilote-zigbee-shelly-home-assistant/ | `src/content/domotique/piloter-chauffage-electrique-fil-pilote-zigbee-shelly-home-assistant.mdx` |
| domotique | https://robot-educatif.info/domotique/prise-connectee-zigbee-home-assistant/ | `src/content/domotique/prise-connectee-zigbee-home-assistant.mdx` |
| domotique | https://robot-educatif.info/domotique/projets-esp32-domotique/ | `src/content/domotique/projets-esp32-domotique.mdx` |
| domotique | https://robot-educatif.info/domotique/protocoles-domotique-zigbee-wifi-thread-matter/ | `src/content/domotique/protocoles-domotique-zigbee-wifi-thread-matter.mdx` |
| domotique | https://robot-educatif.info/domotique/quelle-carte-esp32-choisir-domotique/ | `src/content/domotique/quelle-carte-esp32-choisir-domotique.mdx` |
| domotique | https://robot-educatif.info/domotique/raspberry-pi-capteur-co2-scd41-home-assistant/ | `src/content/domotique/raspberry-pi-capteur-co2-scd41-home-assistant.mdx` |
| domotique | https://robot-educatif.info/domotique/raspberry-pi-capteur-ouverture-porte-notification/ | `src/content/domotique/raspberry-pi-capteur-ouverture-porte-notification.mdx` |
| domotique | https://robot-educatif.info/domotique/raspberry-pi-detecteur-presence-pir-eclairage/ | `src/content/domotique/raspberry-pi-detecteur-presence-pir-eclairage.mdx` |
| domotique | https://robot-educatif.info/domotique/raspberry-pi-station-meteo-bme280-historique/ | `src/content/domotique/raspberry-pi-station-meteo-bme280-historique.mdx` |
| domotique | https://robot-educatif.info/domotique/robot-aspirateur-compatible-home-assistant/ | `src/content/domotique/robot-aspirateur-compatible-home-assistant.mdx` |
| domotique | https://robot-educatif.info/domotique/robot-aspirateur-laveur-serpilliere-station/ | `src/content/domotique/robot-aspirateur-laveur-serpilliere-station.mdx` |
| domotique | https://robot-educatif.info/domotique/robot-aspirateur-moins-de-200-euros/ | `src/content/domotique/robot-aspirateur-moins-de-200-euros.mdx` |
| domotique | https://robot-educatif.info/domotique/robot-aspirateur-navigation-lidar-camera-gyroscope/ | `src/content/domotique/robot-aspirateur-navigation-lidar-camera-gyroscope.mdx` |
| domotique | https://robot-educatif.info/domotique/secours-electrique-home-assistant-onduleur-station-ecoflow-shelly/ | `src/content/domotique/secours-electrique-home-assistant-onduleur-station-ecoflow-shelly.mdx` |
| domotique | https://robot-educatif.info/domotique/secours-electrique-home-assistant-onduleur-station/ | `src/content/domotique/secours-electrique-home-assistant-onduleur-station.mdx` |
| domotique | https://robot-educatif.info/domotique/test-homey-pro-mini-deballage-installation/ | `src/content/domotique/test-homey-pro-mini-deballage-installation.mdx` |
| page | https://robot-educatif.info/404/ | `src/pages/404.astro` |
| page | https://robot-educatif.info/about/ | `src/pages/about.astro` |
| page | https://robot-educatif.info/blog/ | `src/pages/blog/index.astro` |
| page | https://robot-educatif.info/calculateur-budget-robot-classe/ | `src/pages/calculateur-budget-robot-classe.astro` |
| page | https://robot-educatif.info/categorie/ | `src/pages/categorie/index.astro` |
| page | https://robot-educatif.info/codes-promo/ | `src/pages/codes-promo.astro` |
| page | https://robot-educatif.info/compatibilite-makeblock/ | `src/pages/compatibilite-makeblock.astro` |
| page | https://robot-educatif.info/configurateur-kit-robotique-classe/ | `src/pages/configurateur-kit-robotique-classe.astro` |
| page | https://robot-educatif.info/contact/ | `src/pages/contact.astro` |
| page | https://robot-educatif.info/de/ | `src/pages/de/index.astro` |
| page | https://robot-educatif.info/de/smart-home/ersatzteile-sensoren-kompatible-guenstiger/ | `src/pages/de/smart-home/ersatzteile-sensoren-kompatible-guenstiger.astro` |
| page | https://robot-educatif.info/de/smart-home/fehlercodes-stoerungen-zigbee-home-assistant-shelly/ | `src/pages/de/smart-home/fehlercodes-stoerungen-zigbee-home-assistant-shelly.astro` |
| page | https://robot-educatif.info/de/smart-home/kompatibilitaetsmatrix-home-assistant-homey-zigbee-matter/ | `src/pages/de/smart-home/kompatibilitaetsmatrix-home-assistant-homey-zigbee-matter.astro` |
| page | https://robot-educatif.info/domotique/codes-erreurs-depannage-zigbee-home-assistant-shelly/ | `src/pages/domotique/codes-erreurs-depannage-zigbee-home-assistant-shelly.astro` |
| page | https://robot-educatif.info/domotique/configurateur-projet-domotique/ | `src/pages/domotique/configurateur-projet-domotique.astro` |
| page | https://robot-educatif.info/domotique/diagnostic-par-symptome/ | `src/pages/domotique/diagnostic-par-symptome.astro` |
| page | https://robot-educatif.info/domotique/ | `src/pages/domotique/index.astro` |
| page | https://robot-educatif.info/domotique/matrice-compatibilite-home-assistant-homey-zigbee-matter/ | `src/pages/domotique/matrice-compatibilite-home-assistant-homey-zigbee-matter.astro` |
| page | https://robot-educatif.info/domotique/pieces-detachees-capteurs-compatibles-moins-cher/ | `src/pages/domotique/pieces-detachees-capteurs-compatibles-moins-cher.astro` |
| page | https://robot-educatif.info/domotique/tableau-raspberry-hat/ | `src/pages/domotique/tableau-raspberry-hat.astro` |
| page | https://robot-educatif.info/en/ | `src/pages/en/index.astro` |
| page | https://robot-educatif.info/en/smart-home/compatibility-matrix-home-assistant-homey-zigbee-matter/ | `src/pages/en/smart-home/compatibility-matrix-home-assistant-homey-zigbee-matter.astro` |
| page | https://robot-educatif.info/en/smart-home/error-codes-troubleshooting-zigbee-home-assistant-shelly/ | `src/pages/en/smart-home/error-codes-troubleshooting-zigbee-home-assistant-shelly.astro` |
| page | https://robot-educatif.info/en/smart-home/spare-parts-sensors-compatible-budget/ | `src/pages/en/smart-home/spare-parts-sensors-compatible-budget.astro` |
| page | https://robot-educatif.info/es/domotica/codigos-error-solucion-zigbee-home-assistant-shelly/ | `src/pages/es/domotica/codigos-error-solucion-zigbee-home-assistant-shelly.astro` |
| page | https://robot-educatif.info/es/domotica/matriz-compatibilidad-home-assistant-homey-zigbee-matter/ | `src/pages/es/domotica/matriz-compatibilidad-home-assistant-homey-zigbee-matter.astro` |
| page | https://robot-educatif.info/es/domotica/repuestos-sensores-compatibles-baratos/ | `src/pages/es/domotica/repuestos-sensores-compatibles-baratos.astro` |
| page | https://robot-educatif.info/es/ | `src/pages/es/index.astro` |
| page | https://robot-educatif.info/generateur-fiche-seance-robotique-pdf/ | `src/pages/generateur-fiche-seance-robotique-pdf.astro` |
| page | https://robot-educatif.info/gestion-des-cookies/ | `src/pages/gestion-des-cookies.astro` |
| page | https://robot-educatif.info/ | `src/pages/index.astro` |
| page | https://robot-educatif.info/it/domotica/codici-errore-risoluzione-zigbee-home-assistant-shelly/ | `src/pages/it/domotica/codici-errore-risoluzione-zigbee-home-assistant-shelly.astro` |
| page | https://robot-educatif.info/it/domotica/matrice-compatibilita-home-assistant-homey-zigbee-matter/ | `src/pages/it/domotica/matrice-compatibilita-home-assistant-homey-zigbee-matter.astro` |
| page | https://robot-educatif.info/it/domotica/ricambi-sensori-compatibili-economici/ | `src/pages/it/domotica/ricambi-sensori-compatibili-economici.astro` |
| page | https://robot-educatif.info/it/ | `src/pages/it/index.astro` |
| page | https://robot-educatif.info/mentions-legales/ | `src/pages/mentions-legales.astro` |
| page | https://robot-educatif.info/outil-quel-robot-enfant/ | `src/pages/outil-quel-robot-enfant.astro` |
| page | https://robot-educatif.info/parcours-scratch-python-6-semaines/ | `src/pages/parcours-scratch-python-6-semaines.astro` |
| page | https://robot-educatif.info/partenariat/ | `src/pages/partenariat.astro` |
| page | https://robot-educatif.info/politique-de-confidentialite/ | `src/pages/politique-de-confidentialite.astro` |
| page | https://robot-educatif.info/programmation/arduino-c/ | `src/pages/programmation/arduino-c/index.astro` |
| page | https://robot-educatif.info/programmation/bataille-navale/ | `src/pages/programmation/bataille-navale/index.astro` |
| page | https://robot-educatif.info/programmation/carnet-todo/ | `src/pages/programmation/carnet-todo/index.astro` |
| page | https://robot-educatif.info/programmation/ | `src/pages/programmation/index.astro` |
| page | https://robot-educatif.info/programmation/pendu/ | `src/pages/programmation/pendu/index.astro` |
| page | https://robot-educatif.info/programmation/projet-python-avance-journal/ | `src/pages/programmation/projet-python-avance-journal/index.astro` |
| page | https://robot-educatif.info/programmation/projet-python-intermediaire-agenda/ | `src/pages/programmation/projet-python-intermediaire-agenda/index.astro` |
| page | https://robot-educatif.info/programmation/puissance-4/ | `src/pages/programmation/puissance-4/index.astro` |
| page | https://robot-educatif.info/programmation/python/ | `src/pages/programmation/python/index.astro` |
| page | https://robot-educatif.info/programmation/python-avance/ | `src/pages/programmation/python-avance/index.astro` |
| page | https://robot-educatif.info/programmation/python-intermediaire/ | `src/pages/programmation/python-intermediaire/index.astro` |
| page | https://robot-educatif.info/programmes/ | `src/pages/programmes/index.astro` |
| page | https://robot-educatif.info/recherche/ | `src/pages/recherche.astro` |
| page | https://robot-educatif.info/ressources-svg-schemas-mbot-capteurs/ | `src/pages/ressources-svg-schemas-mbot-capteurs.astro` |
| page | https://robot-educatif.info/stats-articles-interne/ | `src/pages/stats-articles-interne.astro` |
| page | https://robot-educatif.info/tableau-reglages-capteurs-mbot2-depannage/ | `src/pages/tableau-reglages-capteurs-mbot2-depannage.astro` |

</details>
