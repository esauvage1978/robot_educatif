---
title: "Python avancé — packaging moderne avec pyproject.toml"
headline: "Python avancé — packaging moderne avec pyproject.toml"
description: "Structure de projet, PEP 621, build backend, wheel, entrée console ; venv et publication PyPI (concepts) ; ressources ; 20 exercices avec solutions repliables."
pubDate: 2026-03-29
updatedDate: 2026-03-29
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Python avancé
seriesOrder: 6
tags: ["Python", "Programmation", "Avancé"]
relatedLinks:
  - title: "Leçon 5 — typage avancé"
    href: "/python-av-typing-avance/"
  - title: "Hub Python avancé"
    href: "/programmation/python-avance/"
categories:
  - "Python"
  - "Programmation"
  - "Tutoriel"
  - "Avancé"
---

Distribuer une bibliothèque ou une **application en ligne de commande** suppose de **empaqueter** le code Python de façon **standard** : métadonnées (nom, version, dépendances), arborescence **`src/`** ou plate, point d’entrée **`console_scripts`**, construction de **wheels** (`.whl`) pour installation rapide. Le fichier **`pyproject.toml`** (PEP 621) centralise aujourd’hui cette configuration ; **`setuptools`**, **`hatchling`**, **`flit`**, **`poetry`** sont des **build backends** possibles.

## 1. Minimal `pyproject.toml` (concept)

```toml
[build-system]
requires = ["setuptools>=61"]
build-backend = "setuptools.build_meta"

[project]
name = "monoutil"
version = "0.1.0"
dependencies = ["requests>=2.28"]

[project.scripts]
monoutil = "monoutil.cli:main"
```

## 2. Installation en mode éditable

**`pip install -e .`** installe le package en **développement** : les modifications du code source sont **visibles** sans réinstaller à chaque fois — idéal pendant le développement.

## 3. Wheel et sdist

- **wheel** : archive préconstruite, installation rapide.
- **sdist** : archive source, build locale à l’install.

## 4. Versions et dépendances

**Semantic versioning** (`MAJOR.MINOR.PATCH`) est la convention usuelle ; **`~=`**, **`>=`**, **`<`** dans les dépendances expriment des **contraintes** pour le résolveur de **`pip`**.

## Ressources externes

- **[Packaging Python](https://packaging.python.org/)**
- **[PEP 621](https://peps.python.org/pep-0621/)** — projet dans `pyproject.toml`
- **[setuptools](https://setuptools.pypa.io/)**

## Exercices (20)

### Niveau simple

**Exercice 1** — Nomme les **deux** fichiers d’artefacts courants produits par **`python -m build`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">.whl (wheel) et .tar.gz (sdist)</code></pre>
</div>
</details>

**Exercice 2** — Que fait **`pip install -e .`** ? <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Install editable : lien vers les sources du projet courant.</code></pre>
</div>
</details>

**Exercice 3** — Où déclare-t-on une **CLI** `foo` pointant vers **`pkg.cli:main`** ? <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-toml">[project.scripts]
foo = "pkg.cli:main"</code></pre>
</div>
</details>

**Exercice 4** — Différence **`install_requires`** (historique setuptools) vs **`[project] dependencies`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># PEP 621 unifie dans pyproject [project] ; setuptools mappe vers metadata.</code></pre>
</div>
</details>

**Exercice 5** — Pourquoi **`src/` layout** est-il recommandé ? <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Évite d'importer accidentellement le mauvais paquet depuis le répertoire courant.</code></pre>
</div>
</details>

**Exercice 6** — Fichier **`MANIFEST.in`** : à quoi sert-il ? <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Inclure des fichiers non-Python dans le sdist (données, templates).</code></pre>
</div>
</details>

**Exercice 7** — **`[project.optional-dependencies]`** : exemple **`dev`** avec **`pytest`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-toml">[project.optional-dependencies]
dev = ["pytest>=7"]</code></pre>
</div>
</details>

### Niveau intermédiaire

**Exercice 8** — Commande **`pip install`** avec **extra** `dev`. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">pip install ".[dev]"</code></pre>
</div>
</details>

**Exercice 9** — Rôle de **`__version__`** dans **`__init__.py`** vs **`importlib.metadata.version("pkg")`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># metadata lit la version installée depuis les métadonnées du dist — source de vérité post-install.</code></pre>
</div>
</details>

**Exercice 10** — **`requires-python = ">=3.10"`** dans **`[project]`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-toml">requires-python = ">=3.10"</code></pre>
</div>
</details>

**Exercice 11** — Pourquoi **`twine upload`** plutôt que **`pip`** pour PyPI ? <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Outil dédié, vérifications, uploads sécurisés vers l'index.</code></pre>
</div>
</details>

**Exercice 12** — **`packages = ["pkg"]`** en setuptools vs **`find:`** automatique. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># find découvre sous-packages ; manuel si structure simple.</code></pre>
</div>
</details>

**Exercice 13** — Nomme un **build backend** alternatif à **setuptools**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">hatchling, flit, poetry-core, pdm-backend</code></pre>
</div>
</details>

**Exercice 14** — **`LICENSE`** file et **`[project] license`** — importance légale. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Clarifie les droits de réutilisation ; obligatoire pour publication sérieuse.</code></pre>
</div>
</details>

### Niveau difficile

**Exercice 15** — **`dynamic = ["version"]`** avec **`setuptools-scm`** — idée. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Version dérivée des tags Git plutôt que figée à la main.</code></pre>
</div>
</details>

**Exercice 16** — Conflit **`pip install`** résout **deux** versions d’un même paquet — comment **`pip`** choisit (concept de résolveur). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Backtracking sur contraintes ; erreur si graphe impossible.</code></pre>
</div>
</details>

**Exercice 17** — **`[tool.setuptools.package-data]`** pour fichiers **non `.py`**. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-toml">[tool.setuptools.package-data]
"pkg" = ["data/*.json"]</code></pre>
</div>
</details>

**Exercice 18** — **`pip install --no-deps`** : risque. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Environnement incomplet ; crash à l'exécution si dépendances manquantes.</code></pre>
</div>
</details>

**Exercice 19** — **`uv`** / **`pip-tools compile`** : intérêt pour **`requirements.txt`** figé. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Résolution reproductible avec hashes pour déploiements.</code></pre>
</div>
</details>

**Exercice 20** — Schéma **namespace packages** (`pkg.ns`) — un cas d’usage. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Plugins distribués séparément sous le même namespace logique.</code></pre>
</div>
</details>

## Fin du parcours avancé

Projet guidé : [Analyseur de journal CLI](/programmation/projet-python-avance-journal) — met en œuvre packaging, typage et modules avancés.

## Amazon (partenaire)

- [Python packaging livre](https://www.amazon.fr/s?k=python+packaging+livre&tag=manuso06-21)
