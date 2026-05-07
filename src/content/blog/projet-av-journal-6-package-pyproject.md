---
title: "Projet Journal CLI (6/6) — comment livrer un package pyproject"
headline: "Projet Journal CLI — comment livrer un package avec pyproject"
description: "Projet Python avancé : finaliser pyproject.toml, src layout, entry point journal-stats, pip install -e, build wheel/sdist, TestPyPI, README et checklist."
pubDate: 2026-03-29
updatedDate: 2026-05-06
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Projet Python avancé — Journal CLI
seriesOrder: 6
tags: ["Python", "Projet", "packaging"]
relatedLinks:
  - title: "Hub projet Journal CLI"
    href: "/programmation/projet-python-avance-journal/"
  - title: "Leçon packaging — Python avancé"
    href: "/python-av-packaging-pyproject/"
  - title: "Partie 5 — typage et mypy"
    href: "/projet-av-journal-5-typing-mypy/"
  - title: "Projet Agenda CLI intermédiaire"
    href: "/programmation/projet-python-intermediaire-agenda/"
categories:
  - "Python"
  - "Programmation"
  - "Projet"
  - "Avancé"
---
Cette sixième partie ferme le projet **Journal CLI** : le code n’est plus seulement un ensemble de modules, il devient un **package Python installable** avec une commande `journal-stats`. C’est l’étape qui transforme un exercice avancé en projet présentable dans un portfolio ou réutilisable dans un autre environnement.

L’objectif n’est pas forcément de publier immédiatement sur PyPI. Avant cela, il faut vérifier le packaging local, la commande CLI, les dépendances de développement, le README, les tests et le build wheel/sdist.

<aside class="article-callout" role="note">
<p><strong>Objectif de la partie 6</strong></p>
<ul>
<li>Créer un <code>pyproject.toml</code> propre.</li>
<li>Installer le projet en mode éditable.</li>
<li>Exposer la commande <code>journal-stats</code>.</li>
<li>Construire wheel + sdist et vérifier les métadonnées.</li>
</ul>
</aside>

Pour revoir les bases, consulte la leçon [packaging Python avec pyproject](/python-av-packaging-pyproject/). Cette étape prolonge aussi le typage de la [partie 5](/projet-av-journal-5-typing-mypy/).

<div class="article-toc" role="navigation" aria-label="Sommaire de l’article">
<p class="article-toc-title">Sommaire</p>
<ul>
<li><a href="#pyproject">Finaliser pyproject.toml</a></li>
<li><a href="#installation">Tester l’installation locale</a></li>
<li><a href="#build">Build et TestPyPI</a></li>
<li><a href="#checklist">Checklist de livraison</a></li>
<li><a href="#exercices">Exercices</a></li>
<li><a href="#bilan">Bilan</a></li>
</ul>
</div>

<h2 id="pyproject">Finaliser `pyproject.toml`</h2>

Finalise le **`pyproject.toml`** : **`[project]`** avec **`name = "journal-stats"`** (nom à adapter si déjà pris sur PyPI), **`version`**, **`requires-python`**, **`dependencies`**, **`[project.scripts]`** pour **`journal-stats = "journal_stats.cli:main"`**. Structure **`src/journal_stats/`** pour le **src layout**.

**`python -m build`** produit wheel + sdist ; **`twine upload dist/*`** vers **TestPyPI** pour un essai. Le **README** documente : installation, exemple **`journal-stats analyze a.log b.log`**, options **`--async` / `--no-async`**, **`--json`** pour sortie machine.

<h2 id="installation">Tester l’installation locale</h2>

Avant de construire un package, commence par le mode éditable :

```text
pip install -e .
journal-stats --help
```

Cette étape vérifie deux choses : le package est trouvable par Python, et l’entrée console pointe bien vers `journal_stats.cli:main`. Si la commande ne répond pas, corrige d’abord le packaging local avant de penser publication.

<h2 id="build">Build, wheel, sdist et TestPyPI</h2>

Le build local doit produire deux artefacts :

- une **wheel**, utilisée pour l’installation rapide ;
- une **sdist**, archive source utile pour la publication.

Ensuite, `twine check dist/*` permet de vérifier les métadonnées et le rendu du README. TestPyPI sert à tester le processus sans publier sur le vrai index. Les tokens et fichiers comme `.pypirc` ne doivent jamais être committés.

<h2 id="checklist">Checklist de livraison</h2>

Avant de considérer le projet terminé :

- `pytest` passe ;
- `mypy` passe au niveau choisi ;
- `ruff` ou linter équivalent passe ;
- `journal-stats --help` fonctionne après `pip install -e .` ;
- le README contient installation, exemples, options et limites ;
- le changelog mentionne une première version `0.1.0` ;
- aucun secret de publication n’est dans le dépôt.

<h2 id="exercices">Exercices (12)</h2>

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

<h2 id="bilan">Bilan</h2>

Tu disposes du **fil conducteur** pour un **outil de log** complet : **générateurs**, **décorateurs**, **asyncio** + exécuteur, **typing**, **package**. Adapte le format de ligne à tes vrais fichiers.

Ce projet complète bien le [projet Agenda CLI intermédiaire](/programmation/projet-python-intermediaire-agenda/) : l’Agenda travaille la modélisation et la persistance JSON, tandis que Journal CLI ajoute flux de données, instrumentation, concurrence, typage et packaging.

## Amazon (partenaire)

- [Python packaging professionnel](https://www.amazon.fr/s?k=python+packaging+livre&tag=manuso06-21)

*Partenaire Amazon — commission possible sur achats éligibles, sans surcoût pour vous.*
