---
title: "Projet Agenda CLI (1/6) — comment définir le cahier des charges"
headline: "Projet Agenda CLI — comment définir le cahier des charges et l’arborescence"
description: "Projet Python intermédiaire : définir le cahier des charges d’un agenda CLI, choisir les commandes, le format JSON, l’arborescence src/ et les critères de réussite."
pubDate: 2026-03-29
updatedDate: 2026-05-06
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Projet Python intermédiaire — Agenda CLI
seriesOrder: 1
tags: ["Python", "Projet", "CLI"]
relatedLinks:
  - title: "Hub du projet Agenda CLI"
    href: "/programmation/projet-python-intermediaire-agenda/"
  - title: "Python intermédiaire — modules et imports"
    href: "/python-inter-modules-imports/"
  - title: "Python intermédiaire — pathlib"
    href: "/python-inter-pathlib/"
  - title: "Partie 2 — données et pathlib"
    href: "/projet-inter-agenda-2-donnees-pathlib/"
categories:
  - "Python"
  - "Programmation"
  - "Projet"
  - "Intermédiaire"
---
Ce projet **Agenda CLI** te fait construire un petit agenda personnel en Python, utilisable depuis le terminal. Avant d’écrire `argparse`, `pathlib` ou des classes, il faut commencer par une étape souvent négligée : définir clairement le **cahier des charges**.

Cette première partie répond à une question simple : qu’est-ce que l’agenda doit faire en version 1, comment organiser les fichiers, et comment savoir que l’étape est terminée ? Si tu poses bien ces décisions maintenant, les parties suivantes seront plus faciles à coder et à tester.

<aside class="article-callout" role="note">
<p><strong>Objectif de la partie 1</strong></p>
<ul>
<li>Définir les commandes principales de l’agenda.</li>
<li>Choisir un format JSON simple pour les événements.</li>
<li>Préparer une arborescence compatible avec les tests.</li>
<li>Limiter volontairement la v1 pour finir le projet.</li>
</ul>
</aside>

Avant d’écrire du code, on **fixe le périmètre** : quoi faire, pour qui, avec quelles **données** et quels **fichiers**. Ce premier article pose le **cahier des charges** de l’**agenda CLI** : gestion d’**événements** (titre, date-heure début, durée optionnelle, note), stockage dans un **fichier JSON** unique par utilisateur (chemin par défaut `~/.agenda/agenda.json` ou `./data/agenda.json` selon ton choix documenté), et **commandes** : ajouter, lister par plage de dates, supprimer par identifiant.

Le projet s’inscrit dans le parcours [Python intermédiaire](/programmation/python-intermediaire/) et complète les notions de [modules et imports](/python-inter-modules-imports/) et de [pathlib](/python-inter-pathlib/). Le sommaire complet est disponible sur le [hub Agenda CLI](/programmation/projet-python-intermediaire-agenda/).

<div class="article-toc" role="navigation" aria-label="Sommaire de l’article">
<p class="article-toc-title">Sommaire</p>
<ul>
<li><a href="#objectifs">Objectifs fonctionnels</a></li>
<li><a href="#arborescence">Arborescence recommandée</a></li>
<li><a href="#modele">Modèle de données</a></li>
<li><a href="#limites">Limites de la v1</a></li>
<li><a href="#exercices">Exercices</a></li>
<li><a href="#suite">Suite du projet</a></li>
</ul>
</div>

<h2 id="objectifs">Objectifs fonctionnels</h2>

1. **Ajouter** un événement avec date ISO 8601 (`2026-03-29T14:00:00`) ou format simplifié que tu documentes.
2. **Lister** les événements entre deux dates (incluses).
3. **Supprimer** un événement par **`id`** stable (UUID ou entier incrémenté — à trancher et à justifier).
4. **Erreurs** : messages clairs si le fichier est absent (première exécution), JSON corrompu, date invalide.

<h2 id="arborescence">Arborescence recommandée</h2>

```
agenda_cli/
  pyproject.toml        (optionnel pour ce cours ; peut rester requirements.txt)
  README.md
  src/
    agenda_cli/
      __init__.py
      __main__.py       (point d’entrée python -m agenda_cli)
      model.py          (structures de données / validation minimale)
      storage.py        (lecture/écriture JSON + pathlib)
      service.py        (logique métier)
      cli.py            (argparse)
tests/
  test_model.py
```

Cette séparation prépare les **tests unitaires** sans lancer la CLI à chaque fois.

<h2 id="modele">Modèle de données (brouillon)</h2>

Chaque événement est un **objet JSON** avec au minimum : **`id`**, **`title`**, **`start`** (chaîne ISO), **`duration_minutes`** (entier ou `null`), **`note`** (chaîne, peut être vide). La racine du fichier est un **objet** avec une clé **`events`** : liste d’objets.

<h2 id="limites">Limites volontaires de la v1</h2>

Pour terminer le projet, il faut accepter de ne pas tout faire. En v1, tu peux reporter les rappels, la synchronisation calendrier, les notifications, l’export ICS ou la détection intelligente des chevauchements. Ces idées sont intéressantes, mais elles compliqueraient trop les premières étapes.

La bonne décision consiste à livrer un noyau fiable : ajouter, lister, supprimer, sauvegarder en JSON et tester les règles principales. Les extensions viendront en partie 6.

<h2 id="exercices">Exercices (12)</h2>

Les **solutions** sont indicatives ; adapte à tes choix de format.

### Application

**Exercice 1** — Rédige en **trois phrases** l’objectif utilisateur de l’agenda CLI. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Exemple : consulter depuis le terminal les rendez-vous à venir ; ajouter sans interface graphique ; tout stocker localement dans un fichier JSON portable.</code></pre>
</div>
</details>

**Exercice 2** — Liste **deux** risques si tout le code est dans **un seul** `main.py`. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Tests difficiles ; pas de réutilisation ; mélange UI / persistance / règles métier.</code></pre>
</div>
</details>

**Exercice 3** — Propose un **exemple JSON** valide avec **2** événements et la clé **`events`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-json">{
  "events": [
    {"id": "1", "title": "Réunion", "start": "2026-03-29T10:00:00", "duration_minutes": 60, "note": ""},
    {"id": "2", "title": "Sport", "start": "2026-03-30T18:00:00", "duration_minutes": null, "note": "piscine"}
  ]
}</code></pre>
</div>
</details>

**Exercice 4** — Justifie l’usage d’**UUID** pour les **`id`** vs entiers auto-incrémentés. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">UUID : unicité sans coordinateur central si fusion de fichiers ; entiers : plus lisibles en petit projet local.</code></pre>
</div>
</details>

**Exercice 5** — Critère de réussite : comment vérifier **sans** interface graphique que « lister entre deux dates » fonctionne ? <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Tests automatisés sur service.list_between(d1, d2) avec données en mémoire ou fichier temporaire.</code></pre>
</div>
</details>

**Exercice 6** — Nomme un **fichier** à exclure du dépôt Git pour l’environnement virtuel. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">.venv/</code></pre>
</div>
</details>

**Exercice 7** — Quelle **PEP** rappelle l’ordre des imports ? (rappel intermédiaire). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">PEP 8 (section imports)</code></pre>
</div>
</details>

**Exercice 8** — Écris le **sommaire** d’un README : installation venv, lancement, commandes principales. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-markdown"># Agenda CLI
## Installation
python -m venv .venv && pip install -e .
## Usage
agenda add … / python -m agenda_cli …
</code></pre>
</div>
</details>

**Exercice 9** — Définis une **erreur métier** (ex. chevauchement) que tu peux **reporter** en v2 plutôt qu’en v1. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">V1 : pas de détection de chevauchement ; V2 : avertissement ou refus.</code></pre>
</div>
</details>

**Exercice 10** — Schéma **fichier de config** optionnel : pourquoi séparer **chemin data** et code ? <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Permet chemins utilisateur sans recompiler ; tests avec répertoire temporaire.</code></pre>
</div>
</details>

**Exercice 11** — Tableau **fonctionnalité → module** (model / storage / service / cli). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Validation des champs → model ; lire/écrire fichier → storage ; règles lister/supprimer → service ; argparse → cli.</code></pre>
</div>
</details>

**Exercice 12** — **Definition of Done** : trois critères avant de passer à la partie 2. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Arborescence créée ; JSON exemple validé à la main ; README avec commandes prévues.</code></pre>
</div>
</details>

<h2 id="suite">Suite</h2>

Continue avec la partie 2 : [données, pathlib et chargement JSON](/projet-inter-agenda-2-donnees-pathlib/). Tu y transformeras le format défini ici en vraies fonctions de lecture et d’écriture.

## Amazon (partenaire)

- [Python projets](https://www.amazon.fr/s?k=python+projets+pratiques+livre&tag=manuso06-21)

*Partenaire Amazon — commission possible sur achats éligibles, sans surcoût pour vous.*
