---
title: "Projet Journal CLI (5/6) — typage et vérification mypy"
headline: "Typage et vérification mypy"
description: "Protocol, TypedDict, Literal pour niveaux de log ; mypy strict progressif ; 12 exercices."
pubDate: 2026-03-29
updatedDate: 2026-03-29
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Projet Python avancé — Journal CLI
seriesOrder: 5
tags: ["Python", "Projet", "typing"]
relatedLinks:
  - title: "Partie 4 — asyncio"
    href: "/projet-av-journal-4-asyncio-batch/"
  - title: "Partie 6 — package"
    href: "/projet-av-journal-6-package-pyproject/"
categories:
  - "Python"
  - "Programmation"
  - "Projet"
  - "Avancé"
---
Définis un **`TypedDict`** pour le **rapport JSON** final : **`{"total": int, "by_level": dict[str, int], ...}`**. Utilise **`Literal["INFO", "ERROR", "WARN"]`** pour le niveau dans **`LogLine`**. Un **`Protocol`** **`SupportsReadLines`** peut décrire les sources **testables** sans dépendre de **`Path`** uniquement.

**`mypy`** sur le dossier **`src/`** : commence avec **`disallow_untyped_defs = False`** puis resserre. Intègre **`mypy`** dans **CI** (GitHub Actions ou équivalent) pour **bloquer** les régressions de types.

## Exercices (12)

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

## Suite

[Package et pyproject](/projet-av-journal-6-package-pyproject/)

## Amazon (partenaire)

- [Python typing](https://www.amazon.fr/s?k=python+type+hints+livre&tag=manuso06-21)
