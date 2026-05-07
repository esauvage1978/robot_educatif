---
title: "Python avancé — comment packager un projet avec pyproject.toml"
headline: "Python avancé — comment packager un projet avec pyproject.toml"
description: "Packaging Python moderne : pyproject.toml, PEP 621, src layout, wheel, sdist, entrée console, pip install -e, dépendances, PyPI et 20 exercices."
pubDate: 2026-03-29
updatedDate: 2026-05-06
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Python avancé
seriesOrder: 6
tags: ["Python", "Programmation", "Avancé"]
relatedLinks:
  - title: "Leçon 5 — typage avancé"
    href: "/python-av-typing-avance/"
  - title: "Hub Python avancé"
    href: "/programmation/python-avance/"
  - title: "Projet Journal CLI — package pyproject"
    href: "/projet-av-journal-6-package-pyproject/"
  - title: "Python intermédiaire — venv et pip"
    href: "/python-inter-venv-pip/"
categories:
  - "Python"
  - "Programmation"
  - "Tutoriel"
  - "Avancé"
---

Cette leçon clôt le parcours **Python avancé** : après les générateurs, décorateurs, context managers, `asyncio` et le typage, il reste une compétence très concrète à maîtriser : **livrer un projet Python installable**.

Distribuer une bibliothèque ou une **application en ligne de commande** suppose de **packager** le code Python de façon **standard** : métadonnées (nom, version, dépendances), arborescence **`src/`** ou plate, point d’entrée **`console_scripts`**, construction de **wheels** (`.whl`) pour installation rapide. Le fichier **`pyproject.toml`** (PEP 621) centralise aujourd’hui cette configuration ; **`setuptools`**, **`hatchling`**, **`flit`**, **`poetry`** sont des **build backends** possibles.

<aside class="article-callout" role="note">
<p><strong>Objectif de la leçon</strong></p>
<ul>
<li>Comprendre le rôle de <code>pyproject.toml</code>.</li>
<li>Déclarer métadonnées, dépendances et entrée console.</li>
<li>Installer un projet en mode éditable.</li>
<li>Construire wheel et sdist sans confondre packaging et venv.</li>
</ul>
</aside>

Si tu veux replacer cette leçon dans un projet complet, consulte la dernière partie du [Projet Journal CLI — package pyproject](/projet-av-journal-6-package-pyproject/). Pour les bases d’environnement, reviens à [venv et pip](/python-inter-venv-pip/).

<div class="article-toc" role="navigation" aria-label="Sommaire de l’article">
<p class="article-toc-title">Sommaire</p>
<ul>
<li><a href="#minimal-pyproject">Minimal pyproject.toml</a></li>
<li><a href="#editable">Installation en mode éditable</a></li>
<li><a href="#wheel-sdist">Wheel et sdist</a></li>
<li><a href="#versions">Versions et dépendances</a></li>
<li><a href="#checklist">Checklist packaging</a></li>
<li><a href="#ressources">Ressources externes</a></li>
<li><a href="#exercices">Exercices</a></li>
</ul>
</div>

<h2 id="minimal-pyproject">1. Minimal `pyproject.toml` (concept)</h2>

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

Ce fichier répond à deux questions : comment construire le paquet, et quelles métadonnées exposer aux outils Python. La section `[build-system]` choisit le backend ; la section `[project]` décrit le paquet.

<h2 id="editable">2. Installation en mode éditable</h2>

**`pip install -e .`** installe le package en **développement** : les modifications du code source sont **visibles** sans réinstaller à chaque fois — idéal pendant le développement.

Ce mode ne remplace pas un environnement virtuel. En pratique, tu crées d’abord un venv, puis tu installes le projet en éditable dans ce venv. Cela évite de polluer le Python système.

<h2 id="wheel-sdist">3. Wheel et sdist</h2>

- **wheel** : archive préconstruite, installation rapide.
- **sdist** : archive source, build locale à l’install.

Construire les deux formats permet de vérifier que ton projet contient bien ce qui est nécessaire : code, métadonnées, README, licence et fichiers déclarés. Avant une publication, `twine check dist/*` aide à repérer les métadonnées ou descriptions invalides.

<h2 id="versions">4. Versions et dépendances</h2>

**Semantic versioning** (`MAJOR.MINOR.PATCH`) est la convention usuelle ; **`~=`**, **`>=`**, **`<`** dans les dépendances expriment des **contraintes** pour le résolveur de **`pip`**.

Ne fixe pas toutes les dépendances comme dans un `requirements.txt` de déploiement. Pour une bibliothèque, il faut souvent exprimer une plage compatible. Pour une application, tu peux être plus strict si tu veux une installation reproductible.

<h2 id="checklist">Checklist packaging</h2>

Avant de considérer un projet prêt :

- `python -m build` produit wheel et sdist ;
- `pip install -e .` permet de tester pendant le développement ;
- l’entrée console fonctionne si le projet en fournit une ;
- le README explique installation, usage et limites ;
- la licence est claire ;
- aucun token PyPI ou fichier `.pypirc` n’est committé ;
- les tests et le typage passent avant publication.

<h2 id="ressources">Ressources externes</h2>

- **[Packaging Python](https://packaging.python.org/)**
- **[PEP 621](https://peps.python.org/pep-0621/)** — projet dans `pyproject.toml`
- **[setuptools](https://setuptools.pypa.io/)**

<h2 id="exercices">Exercices (20)</h2>

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

Projet guidé : [Analyseur de journal CLI](/programmation/projet-python-avance-journal/) — met en œuvre packaging, typage et modules avancés. Pour reprendre le parcours complet, consulte aussi le [hub Python avancé](/programmation/python-avance/).

## Amazon (partenaire)

- [Python packaging livre](https://www.amazon.fr/s?k=python+packaging+livre&tag=manuso06-21)

*Partenaire Amazon — commission possible sur achats éligibles, sans surcoût pour vous.*
