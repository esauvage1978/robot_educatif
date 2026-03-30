---
title: "Projet Agenda CLI (1/6) — cahier des charges et arborescence"
description: "Objectifs fonctionnels, structure de dossiers src/, format JSON des événements, critères de réussite ; 12 exercices."
pubDate: 2026-03-29
updatedDate: 2026-03-29
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Projet Python intermédiaire — Agenda CLI
seriesOrder: 1
tags: ["Python", "Projet", "CLI"]
relatedLinks:
  - title: "Hub du projet Agenda CLI"
    href: "/programmation/projet-python-intermediaire-agenda/"
  - title: "Partie 2 — données et pathlib"
    href: "/projet-inter-agenda-2-donnees-pathlib/"
categories:
  - "Python"
  - "Programmation"
  - "Projet"
  - "Intermédiaire"
---
Avant d’écrire du code, on **fixe le périmètre** : quoi faire, pour qui, avec quelles **données** et quels **fichiers**. Ce premier article pose le **cahier des charges** de l’**agenda CLI** : gestion d’**événements** (titre, date-heure début, durée optionnelle, note), stockage dans un **fichier JSON** unique par utilisateur (chemin par défaut `~/.agenda/agenda.json` ou `./data/agenda.json` selon ton choix documenté), et **commandes** : ajouter, lister par plage de dates, supprimer par identifiant.

## Objectifs fonctionnels

1. **Ajouter** un événement avec date ISO 8601 (`2026-03-29T14:00:00`) ou format simplifié que tu documentes.
2. **Lister** les événements entre deux dates (incluses).
3. **Supprimer** un événement par **`id`** stable (UUID ou entier incrémenté — à trancher et à justifier).
4. **Erreurs** : messages clairs si le fichier est absent (première exécution), JSON corrompu, date invalide.

## Arborescence recommandée

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

## Modèle de données (brouillon)

Chaque événement est un **objet JSON** avec au minimum : **`id`**, **`title`**, **`start`** (chaîne ISO), **`duration_minutes`** (entier ou `null`), **`note`** (chaîne, peut être vide). La racine du fichier est un **objet** avec une clé **`events`** : liste d’objets.

## Exercices (12)

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

## Suite

[Données, pathlib et chargement JSON](/projet-inter-agenda-2-donnees-pathlib/)

## Amazon (partenaire)

- [Python projets](https://www.amazon.fr/s?k=python+projets+pratiques+livre&tag=manuso06-21)
