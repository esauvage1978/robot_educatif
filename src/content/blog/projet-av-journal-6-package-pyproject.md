---
title: "Projet Journal CLI (6/6) — package, pyproject et livraison"
headline: "Package, pyproject et livraison"
description: "pyproject.toml, setuptools, entrée journal-stats, README, tests et publication ; 12 exercices."
pubDate: 2026-03-29
updatedDate: 2026-03-29
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Projet Python avancé — Journal CLI
seriesOrder: 6
tags: ["Python", "Projet", "packaging"]
relatedLinks:
  - title: "Hub projet Journal CLI"
    href: "/programmation/projet-python-avance-journal/"
  - title: "Leçon packaging — Python avancé"
    href: "/python-av-packaging-pyproject/"
categories:
  - "Python"
  - "Programmation"
  - "Projet"
  - "Avancé"
---
Finalise le **`pyproject.toml`** : **`[project]`** avec **`name = "journal-stats"`** (nom à adapter si déjà pris sur PyPI), **`version`**, **`requires-python`**, **`dependencies`**, **`[project.scripts]`** pour **`journal-stats = "journal_stats.cli:main"`**. Structure **`src/journal_stats/`** pour le **src layout**.

**`python -m build`** produit wheel + sdist ; **`twine upload dist/*`** vers **TestPyPI** pour un essai. Le **README** documente : installation, exemple **`journal-stats analyze a.log b.log`**, options **`--async` / `--no-async`**, **`--json`** pour sortie machine.

## Exercices (12)

**Exercice 1** — Table **`[project.scripts]`** pour **`journal-stats`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-toml">[project.scripts]
journal-stats = "journal_stats.cli:main"</code></pre>
</div>
</details>

**Exercice 2** — **`packages = { find = {} }`** sous **`[tool.setuptools]`** avec **`where = ["src"]`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-toml">[tool.setuptools.packages.find]
where = ["src"]</code></pre>
</div>
</details>

**Exercice 3** — **`pip install -e .`** puis **`journal-stats --help`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">.venv\Scripts\activate ; pip install -e . ; journal-stats --help</code></pre>
</div>
</details>

**Exercice 4** — **`[project.optional-dependencies]`** : **`dev`** avec **`mypy`**, **`pytest`**, **`ruff`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-toml">[project.optional-dependencies]
dev = ["mypy>=1.8", "pytest>=8", "ruff>=0.3"]</code></pre>
</div>
</details>

**Exercice 5** — **`python -m build`** prérequis — paquet **`build`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">pip install build</code></pre>
</div>
</details>

**Exercice 6** — **`twine check dist/*`** — rôle. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Vérifie longue description README et métadonnées.</code></pre>
</div>
</details>

**Exercice 7** — **`[project.urls]`** Home, Repository. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-toml">[project.urls]
Homepage = "https://example.org"
Repository = "https://github.com/..."</code></pre>
</div>
</details>

**Exercice 8** — Évite de publier **secrets** `.pypirc` — où les stocker ? <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">~/.pypirc hors dépôt ; tokens CI secrets.</code></pre>
</div>
</details>

**Exercice 9** — **`uvx`** ou **`pipx install`** pour **CLI isolée** — avantage. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Environnement par outil sans polluer le Python système.</code></pre>
</div>
</details>

**Exercice 10** — **`CHANGELOG.md`** — première entrée **0.1.0**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-markdown">## 0.1.0
- Analyse multi-fichiers, stats par niveau, sortie JSON optionnelle.</code></pre>
</div>
</details>

**Exercice 11** — Comparer ce projet au **projet Agenda** — compétence nouvelle. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Réponse personnelle — asyncio, typage strict, packaging.</code></pre>
</div>
</details>

**Exercice 12** — Poursuivre vers des **contributions open source** — suggestion. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Choisir un bon first issue sur un projet Python typé.</code></pre>
</div>
</details>

## Bilan

Tu disposes du **fil conducteur** pour un **outil de log** complet : **générateurs**, **décorateurs**, **asyncio** + exécuteur, **typing**, **package**. Adapte le format de ligne à tes vrais fichiers.

## Amazon (partenaire)

- [Python packaging professionnel](https://www.amazon.fr/s?k=python+packaging+livre&tag=manuso06-21)
