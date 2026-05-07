---
title: "Projet Journal CLI (5/6) — comment typer le projet avec mypy"
headline: "Projet Journal CLI — comment typer le projet avec mypy"
description: "Projet Python avancé : typer LogLine et Report avec TypedDict, Literal, Protocol, mypy progressif, py.typed, reveal_type et CI."
pubDate: 2026-03-29
updatedDate: 2026-05-06
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Projet Python avancé — Journal CLI
seriesOrder: 5
tags: ["Python", "Projet", "typing"]
relatedLinks:
  - title: "Partie 4 — asyncio"
    href: "/projet-av-journal-4-asyncio-batch/"
  - title: "Python avancé — typing"
    href: "/python-av-typing-avance/"
  - title: "Python intermédiaire — tests et qualité"
    href: "/python-inter-tests-qualite/"
  - title: "Partie 6 — package"
    href: "/projet-av-journal-6-package-pyproject/"
categories:
  - "Python"
  - "Programmation"
  - "Projet"
  - "Avancé"
---
Après le parsing, les décorateurs et le traitement de plusieurs fichiers, le projet **Journal CLI** commence à avoir plusieurs types de données : lignes de log, rapports partiels, rapports fusionnés, erreurs récupérées, options de CLI. Cette cinquième partie ajoute un filet de sécurité : le **typage Python** vérifié avec **mypy**.

Le but n’est pas de rendre le code verbeux. Le typage sert à clarifier les contrats : ce que retourne `parse_lines`, ce que contient `Report`, quels niveaux de log sont acceptés, et quelles sources peuvent être utilisées en test. C’est particulièrement utile avant la dernière étape, où le projet devient un package installable.

<aside class="article-callout" role="note">
<p><strong>Objectif de la partie 5</strong></p>
<ul>
<li>Définir les types centraux du projet.</li>
<li>Utiliser <code>TypedDict</code>, <code>Literal</code> et <code>Protocol</code>.</li>
<li>Lancer <code>mypy</code> sans bloquer tout le projet d’un coup.</li>
<li>Préparer le packaging avec des annotations exploitables.</li>
</ul>
</aside>

Pour réviser les notions, consulte [typing avancé en Python](/python-av-typing-avance/). Cette étape complète aussi les tests vus dans [tests et qualité Python](/python-inter-tests-qualite/).

<div class="article-toc" role="navigation" aria-label="Sommaire de l’article">
<p class="article-toc-title">Sommaire</p>
<ul>
<li><a href="#types-centraux">Types centraux</a></li>
<li><a href="#mypy">Mypy progressif</a></li>
<li><a href="#protocol">Protocol pour tester</a></li>
<li><a href="#ci">CI et règles d’équipe</a></li>
<li><a href="#exercices">Exercices</a></li>
<li><a href="#suite">Suite du projet</a></li>
</ul>
</div>

<h2 id="types-centraux">Types centraux du projet</h2>

Définis un **`TypedDict`** pour le **rapport JSON** final : **`{"total": int, "by_level": dict[str, int], ...}`**. Utilise **`Literal["INFO", "ERROR", "WARN"]`** pour le niveau dans **`LogLine`**. Un **`Protocol`** **`SupportsReadLines`** peut décrire les sources **testables** sans dépendre de **`Path`** uniquement.

Ces types doivent rester au service du code. Si un type devient trop compliqué, c’est souvent le signe que la structure de données mérite d’être simplifiée ou remplacée par une `dataclass`.

**`mypy`** sur le dossier **`src/`** : commence avec **`disallow_untyped_defs = False`** puis resserre. Intègre **`mypy`** dans **CI** (GitHub Actions ou équivalent) pour **bloquer** les régressions de types.

<h2 id="mypy">Mypy progressif</h2>

Sur un projet existant, activer `--strict` partout dès le premier jour peut décourager. Une meilleure approche consiste à typifier les modules importants d’abord : `parser.py`, `stats.py`, puis `cli.py`. Quand un module devient propre, on peut renforcer les règles.

Bon réflexe : ne pas ajouter des `# type: ignore` en masse. S’il faut ignorer une erreur, indique pourquoi : bibliothèque mal typée, bug de stubs, ou limite assumée.

<h2 id="protocol">Protocol pour tester sans dépendre de Path</h2>

`Protocol` est utile quand plusieurs objets peuvent fournir le même comportement. Par exemple, le parseur peut accepter une source qui expose `readlines()` ou un itérateur de chaînes, sans exiger un vrai fichier sur disque. Cela rend les tests plus simples et garde le code flexible.

Mais attention : n’ajoute pas un `Protocol` pour chaque fonction. Utilise-le quand il exprime une vraie abstraction, pas pour rendre le code “plus avancé”.

<h2 id="ci">CI et règles d’équipe</h2>

Dans une vraie livraison, `mypy` doit être lancé avec les tests et le linter. La CI empêche qu’un refactoring casse silencieusement un contrat de type. Pour ce tutoriel, l’idée est simple : les erreurs de type doivent être visibles avant la partie 6, quand le projet sera empaqueté avec `pyproject.toml`.

<h2 id="exercices">Exercices (12)</h2>

**Exercice 1** — Annoter **`def merge_reports(a: Counter, b: Counter) -> Counter`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from collections import Counter

def merge_reports(a: Counter, b: Counter) -> Counter:
    c = Counter(a)
    c.update(b)
    return c</code></pre>
</div>
</details>

**Exercice 2** — **`Report` TypedDict** avec clés **`total`**, **`by_level`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from typing import TypedDict

class Report(TypedDict):
    total: int
    by_level: dict[str, int]</code></pre>
</div>
</details>

**Exercice 3** — Commande **`mypy src journal_stats`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">mypy src</code></pre>
</div>
</details>

**Exercice 4** — **`# type: ignore`** — quand c’est acceptable ? <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Lib mal typée ; commenter avec ticket ou lien.</code></pre>
</div>
</details>

**Exercice 5** — **`assert isinstance`** pour **narrowing** après **`json.loads`**. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def f(x: object) -> dict[str, object]:
    assert isinstance(x, dict)
    return x</code></pre>
</div>
</details>

**Exercice 6** — **`from __future__ import annotations`** — rappel. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Annotations stockées comme chaînes ; forward refs faciles.</code></pre>
</div>
</details>

**Exercice 7** — **`Protocol`** avec **`def readlines(self) -> list[str]`** — mock en test. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class Fake:
    def readlines(self):
        return ["2026-01-01 00:00:00 INFO hi\n"]</code></pre>
</div>
</details>

**Exercice 8** — **`TypedDict`** avec **`total=False`** pour clés optionnelles. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class R(TypedDict, total=False):
    errors: int</code></pre>
</div>
</details>

**Exercice 9** — **`py.typed`** marker **PEP 561** — pourquoi dans le wheel ? <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Indique que le package fournit des stubs ou annotations.</code></pre>
</div>
</details>

**Exercice 10** — **`reveal_type`** en debug mypy. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">reveal_type(x)  # type: ignore[misc]</code></pre>
</div>
</details>

**Exercice 11** — CI : **`mypy`** échoue sur **warning** — stratégie. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">--strict progressivement ; pas de warnings ignorés en masse.</code></pre>
</div>
</details>

**Exercice 12** — **`Final`** pour le **nom du package** en constante. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from typing import Final
NAME: Final = "journal-stats"</code></pre>
</div>
</details>

<h2 id="suite">Suite</h2>

La dernière étape est la partie 6 : [package et pyproject](/projet-av-journal-6-package-pyproject/). Le typage préparé ici rendra le package plus lisible, plus testable et plus facile à maintenir.

Tu peux aussi consolider avec [typing avancé en Python](/python-av-typing-avance/) avant de passer au packaging.

## Amazon (partenaire)

- [Python typing](https://www.amazon.fr/s?k=python+type+hints+livre&tag=manuso06-21)

*Partenaire Amazon — commission possible sur achats éligibles, sans surcoût pour vous.*
