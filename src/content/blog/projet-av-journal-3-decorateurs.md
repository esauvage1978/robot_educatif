---
title: "Projet Journal CLI (3/6) — décorateurs pour métriques et journalisation"
description: "Mesurer le temps de parsing, journaliser le nombre de lignes, functools.wraps ; 12 exercices."
pubDate: 2026-03-29
updatedDate: 2026-03-29
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Projet Python avancé — Journal CLI
seriesOrder: 3
tags: ["Python", "Projet", "Décorateurs"]
relatedLinks:
  - title: "Partie 2 — parsing"
    href: "/projet-av-journal-2-parse-generateurs/"
  - title: "Partie 4 — asyncio"
    href: "/projet-av-journal-4-asyncio-batch/"
categories:
  - "Python"
  - "Programmation"
  - "Projet"
  - "Avancé"
---
Enveloppe les fonctions **`parse_lines`** et **`aggregate`** avec un décorateur **`@timed`** qui enregistre la durée via **`logging.info`** ou **`print`** en mode debug. Un second décorateur **`@log_calls`** peut compter les invocations — utile pour vérifier que tu ne **repars** pas le parseur dans une boucle par erreur.

Utilise **`functools.wraps`** pour garder **`__name__`** et la docstring, afin que **`pytest`** et **`help()`** restent lisibles.

## Exercices (12)

**Exercice 1** — Décorateur **`timed`** avec **`time.perf_counter`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import time, functools, logging
def timed(f):
    @functools.wraps(f)
    def wrapper(*a, **k):
        t0 = time.perf_counter()
        out = f(*a, **k)
        logging.info("%s took %.4fs", f.__name__, time.perf_counter() - t0)
        return out
    return wrapper</code></pre>
</div>
</details>

**Exercice 2** — Applique **`@timed`** sur **`aggregate`** uniquement — pourquoi pas sur le générateur **sans** le consommer ? <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># timed sur fonction qui retourne générateur mesure la création, pas le parcours.</code></pre>
</div>
</details>

**Exercice 3** — Décorateur **`count_lines`** sur un générateur qui **incrémente** un **`Counter`** global — piège. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># État global : préférer classe ou closure avec compteur par appel.</code></pre>
</div>
</details>

**Exercice 4** — **`logging.basicConfig(level=logging.DEBUG)`** en **`main`** uniquement. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import logging
logging.basicConfig(level=logging.DEBUG)</code></pre>
</div>
</details>

**Exercice 5** — Test : mock **`logging.info`** et vérifie qu’il est appelé avec **`timed`**. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def test_timed_logs(caplog):
    @timed
    def f():
        return 1
    with caplog.at_level(logging.INFO):
        f()
    assert "took" in caplog.text</code></pre>
</div>
</details>

**Exercice 6** — **`lru_cache`** sur **`parse_line`** si ligne **seule** — pertinent ? <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Peut aider si beaucoup de lignes dupliquées ; sinon mémoire.</code></pre>
</div>
</details>

**Exercice 7** — **`singledispatch`** sur type de **source** — fichier vs stdin. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Deux implémentations parse_lines selon Path vs TextIO.</code></pre>
</div>
</details>

**Exercice 8** — Ordre des décorateurs **`@timed`** et **`@log_calls`** sur **`f`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># @timed @log_calls def f → f = timed(log_calls(f)) — log_calls exécuté en premier à l'appel.</code></pre>
</div>
</details>

**Exercice 9** — Évite les **effets de bord** dans les décorateurs : principe. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Un décorateur ne doit pas casser la signature ni les métadonnées (wraps).</code></pre>
</div>
</details>

**Exercice 10** — **`contextmanager`** pour mesurer un **bloc** dans **`main`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from contextlib import contextmanager
@contextmanager
def timer(name):
    t0 = time.perf_counter()
    yield
    print(name, time.perf_counter() - t0)</code></pre>
</div>
</details>

**Exercice 11** — **`__wrapped__`** après **`wraps`** — usage. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Accéder à la fonction originale décorée.</code></pre>
</div>
</details>

**Exercice 12** — Documente en **README** le flag **`--verbose`** activant les logs décoratifs. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">--verbose : niveau DEBUG pour les durées de parse/aggregate.</code></pre>
</div>
</details>

## Suite

[asyncio et batch de fichiers](/projet-av-journal-4-asyncio-batch/)

## Amazon (partenaire)

- [Python patterns](https://www.amazon.fr/s?k=python+design+patterns+livre&tag=manuso06-21)
