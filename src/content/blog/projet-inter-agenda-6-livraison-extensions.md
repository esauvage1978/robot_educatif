---
title: "Projet Agenda CLI (6/6) — livraison, qualité et extensions"
description: "requirements.txt ou pyproject, entrée console, README, idées d’extensions (export ICS, rappels) ; 12 exercices."
pubDate: 2026-03-29
updatedDate: 2026-03-29
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Projet Python intermédiaire — Agenda CLI
seriesOrder: 6
tags: ["Python", "Projet", "packaging"]
relatedLinks:
  - title: "Hub du projet"
    href: "/programmation/projet-python-intermediaire-agenda/"
  - title: "Parcours Python avancé"
    href: "/programmation/python-avance/"
categories:
  - "Python"
  - "Programmation"
  - "Projet"
  - "Intermédiaire"
---
Le **projet est livré** quand un tiers peut **cloner**, créer un venv, **`pip install -e .`** (ou **`pip install -r requirements.txt`**), lancer **`python -m agenda_cli`** ou la commande **`agenda`**, et suivre le **README** sans te poser de questions. Ajoute une **Licence** (MIT si tu veux du simple), un **`.gitignore`** (`.venv`, `__pycache__`, fichiers locaux de test).

## Extensions possibles

- Export **iCalendar** (`.ics`) pour importer dans un calendrier.
- Mode **`--json`** pour sortie machine (automation).
- **Synchronisation** distante (hors scope : API HTTP + auth).

## Exercices (12)

**Exercice 1** — Ligne **`[project.scripts]`** pour commande **`agenda`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-toml">[project.scripts]
agenda = "agenda_cli.cli:main"</code></pre>
</div>
</details>

**Exercice 2** — Checklist **release** : tag Git, version dans **`pyproject.toml`**, changelog. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Bump version ; git tag v0.2.0 ; notes de version dans CHANGELOG.md</code></pre>
</div>
</details>

**Exercice 3** — Pourquoi **`pip install -e .`** facilite le **développement** ? <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Le code source reste la source de vérité ; pas de réinstall à chaque édition.</code></pre>
</div>
</details>

**Exercice 4** — Idée d’**export ICS** : quelle bibliothèque ou format minimal sans dépendance ? <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Générer texte VEVENT minimal RFC 5545 à la main pour un prototype.</code></pre>
</div>
</details>

**Exercice 5** — **`pre-commit`** avec **ruff** — intérêt en équipe. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Hooks avant commit pour style et erreurs évidentes.</code></pre>
</div>
</details>

**Exercice 6** — Critère **« projet terminé »** personnel : trois cases à cocher. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Tests verts ; README à jour ; commandes add/list/remove OK sur machine vierge.</code></pre>
</div>
</details>

**Exercice 7** — Publier sur **PyPI** test — nom de module **unique** requis. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">test.pypi.org pour essais ; nom agenda-cli-<pseudo> souvent libre.</code></pre>
</div>
</details>

**Exercice 8** — **`python -m agenda_cli`** vs script console : différence pour l’utilisateur. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Console ajoute le répertoire Scripts au PATH ; -m nécessite le package importable.</code></pre>
</div>
</details>

**Exercice 9** — **Dockerfile** optionnel : une ligne `CMD` pour l’image. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-dockerfile">CMD ["agenda", "list", "--from", "...", "--to", "..."]</code></pre>
</div>
</details>

**Exercice 10** — Rétrospective : qu’as-tu appris sur **pathlib** vs ce projet ? <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Réponse personnelle — manipulation de chemins utilisateur.</code></pre>
</div>
</details>

**Exercice 11** — Lien vers le **projet avancé** : pourquoi l’agenda reste **synchrone** ? <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">I/O fichier local rapide ; pas besoin d'async pour ce périmètre.</code></pre>
</div>
</details>

**Exercice 12** — Prochaine étape pédagogique : [Journal CLI avancé](/programmation/projet-python-avance-journal/). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Suivre la série « Projet Python avancé — Journal CLI ».</code></pre>
</div>
</details>

## Projet suivant

[Analyseur de journal — projet avancé](/programmation/projet-python-avance-journal/)

## Amazon (partenaire)

- [Python bonnes pratiques](https://www.amazon.fr/s?k=python+bonnes+pratiques+livre&tag=manuso06-21)
