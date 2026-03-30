---
title: "Projet Journal CLI (2/6) — parsing par générateurs"
description: "Lecture ligne à ligne, yield, regex ou split, lignes ignorées ; 12 exercices."
pubDate: 2026-03-29
updatedDate: 2026-03-29
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Projet Python avancé — Journal CLI
seriesOrder: 2
tags: ["Python", "Projet", "Générateurs"]
relatedLinks:
  - title: "Partie 1 — architecture"
    href: "/projet-av-journal-1-architecture/"
  - title: "Partie 3 — décorateurs"
    href: "/projet-av-journal-3-decorateurs/"
categories:
  - "Python"
  - "Programmation"
  - "Projet"
  - "Avancé"
---
Implémente **`parse_lines(path: Path) -> Iterator[LogLine]`** en ouvrant le fichier en **`encoding="utf-8"`** avec gestion **`errors="replace"`** ou **`strict`** selon politique documentée. Pour chaque ligne non vide, extrais **timestamp**, **niveau**, **message** avec **`re.compile`** précompilée en **constante de module** pour éviter de recompiler à chaque ligne.

## Performance

- **Précompiler** les regex.
- Éviter **`strip()`** répété inutile si le pattern gère les espaces.
- **`yield`** immédiatement : ne pas accumuler `lines` dans une liste.

## Exercices (12)

**Exercice 1** — Générateur lisant **`path`** avec **`open`** et **`yield`** ligne nettoyée. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def iter_lines(path):
    with path.open(encoding="utf-8") as f:
        for line in f:
            yield line.rstrip("\n")</code></pre>
</div>
</details>

**Exercice 2** — Regex avec **groupes nommés** `ts`, `lvl`, `msg` pour date-heure, niveau et reste de la ligne. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import re
LINE = re.compile(
    r"^(?P&lt;ts&gt;\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) "
    r"(?P&lt;lvl&gt;INFO|ERROR|WARN) (?P&lt;msg&gt;.*)$"
)</code></pre>
</div>
</details>

**Exercice 3** — Si la ligne ne matche pas : **`yield`** un **`LogLine.raw`** ou **ignore** — choix et test. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Option stats : compteur skipped_lines ; ou LogLine(level="UNKNOWN", ...)</code></pre>
</div>
</details>

**Exercice 4** — Parse **`ts`** avec **`datetime.strptime`** pour tri ultérieur. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from datetime import datetime
datetime.strptime(m.group("ts"), "%Y-%m-%d %H:%M:%S")</code></pre>
</div>
</details>

**Exercice 5** — Compteur **`total`** sans matérialiser la liste — **une boucle** sur le générateur. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">sum(1 for _ in parse_lines(p))</code></pre>
</div>
</details>

**Exercice 6** — **`yield from`** pour déléguer à **`iter_lines`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def parse_lines(path):
    for line in iter_lines(path):
        ...
        yield logline</code></pre>
</div>
</details>

**Exercice 7** — Test : fichier **trois** lignes valides → **trois** `LogLine`. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def test_parse(tmp_path):
    p = tmp_path / "l.log"
    p.write_text("...\n...\n...\n", encoding="utf-8")
    assert len(list(parse_lines(p))) == 3</code></pre>
</div>
</details>

**Exercice 8** — **BOM UTF-8** en tête de fichier — comment gérer ? <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># encoding="utf-8-sig" pour supprimer BOM si présent.</code></pre>
</div>
</details>

**Exercice 9** — **Lazy** : `list(parse_lines)` deux fois — comportement. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Relit le fichier deux fois ; deux parcours disque.</code></pre>
</div>
</details>

**Exercice 10** — **`mmap`** (optionnel) : quand utile pour très gros fichiers ? <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Accès par pages OS ; avancé — hors scope v1.</code></pre>
</div>
</details>

**Exercice 11** — **`collections.Counter`** sur niveaux **sans** stocker toutes les lignes — **deux passes** acceptables ? <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Une passe suffit : incrémenter Counter pour chaque LogLine parsée.</code></pre>
</div>
</details>

**Exercice 12** — Documente une **ligne d’erreur** typique (stack trace) **non** conforme au format — comportement. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Compter comme UNKNOWN ou ligne brute ; stat skipped++.</code></pre>
</div>
</details>

## Suite

[Décorateurs pour métriques](/projet-av-journal-3-decorateurs/)

## Amazon (partenaire)

- [Python performance](https://www.amazon.fr/s?k=python+performance+livre&tag=manuso06-21)
