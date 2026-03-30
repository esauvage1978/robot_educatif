---
title: "Projet Journal CLI (1/6) — architecture et périmètre"
description: "Analyse de fichiers log ligne à ligne, modules parser/stats/cli, objectifs et livrables ; 12 exercices."
pubDate: 2026-03-29
updatedDate: 2026-03-29
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Projet Python avancé — Journal CLI
seriesOrder: 1
tags: ["Python", "Projet", "Avancé"]
relatedLinks:
  - title: "Hub projet Journal CLI"
    href: "/programmation/projet-python-avance-journal/"
  - title: "Partie 2 — parsing générateur"
    href: "/projet-av-journal-2-parse-generateurs/"
categories:
  - "Python"
  - "Programmation"
  - "Projet"
  - "Avancé"
---
L’outil **`journal-stats`** (nom fictif du tutoriel) lit un ou plusieurs **fichiers texte** au format type **journal** : une ligne par événement, préfixe horodatage optionnel **`YYYY-MM-DD HH:MM:SS`**, niveau **`INFO`**, **`ERROR`**, etc. Le programme produit des **statistiques** : nombre de lignes par niveau, top des messages, erreurs par heure. L’architecture sépare **`parser`** (générateur de lignes / enregistrements), **`stats`** (agrégation), **`cli`** (arguments, **multiples fichiers**), et éventuellement **`io_async`** (lecture concurrente schématique).

## Modules prévus

- **`journal_stats/parser.py`** : `parse_lines(path) -> Iterator[LogLine]`
- **`journal_stats/stats.py`** : `aggregate(lines: Iterable[LogLine]) -> Report`
- **`journal_stats/cli.py`** : `main()` avec argparse
- **`pyproject.toml`** : point d’entrée (partie 6)

## Exercices (12)

**Exercice 1** — Définis le **format minimal** d’une ligne acceptée (regex ou split). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">2026-03-29 14:00:00 INFO message libre</code></pre>
</div>
</details>

**Exercice 2** — Pourquoi un **`Iterator`** plutôt qu’une **`list`** pour lire un fichier de **1 Go** ? <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Mémoire constante ; traitement par flux.</code></pre>
</div>
</details>

**Exercice 3** — Nomme **deux** risques si tout est dans **`cli.py`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Tests difficiles ; pas de réutilisation ; mélange des couches.</code></pre>
</div>
</details>

**Exercice 4** — **`TypedDict`** ou **`dataclass`** pour **`LogLine`** — avantage respectif. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">dataclass : méthodes et validation ; TypedDict : dict JSON-like.</code></pre>
</div>
</details>

**Exercice 5** — Schéma **UML** texte : **`cli` → `stats` → `parser`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">cli appelle stats.aggregate(parser.parse(path))</code></pre>
</div>
</details>

**Exercice 6** — Critère **performance** : traiter **100 Mo** sans **> 500 Mo** RAM — stratégie. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Itération ligne à ligne ; compteurs entiers ; pas de liste de toutes les lignes.</code></pre>
</div>
</details>

**Exercice 7** — **Fichiers binaires** : hors scope — comment le documenter ? <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">README : UTF-8 texte uniquement ; erreur si décodage impossible.</code></pre>
</div>
</details>

**Exercice 8** — **Journalisation** de l’outil lui-même vs analyse des logs — confusion à éviter. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Utiliser logging pour debug ; stdout pour rapport utilisateur.</code></pre>
</div>
</details>

**Exercice 9** — **Extension** : filtrer par **plage de dates** — où dans l’architecture ? <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Dans parser ou generator dérivé ; stats reçoit déjà filtré.</code></pre>
</div>
</details>

**Exercice 10** — **`__init__.py`** vide suffit pour **package** — quand **`__all__`** ? <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># from pkg import * — à éviter ; __all__ limite l'exposition.</code></pre>
</div>
</details>

**Exercice 11** — **Compatibilité** Python **3.10+** : quelle fonctionnalité typage utiliser ? <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">X | None, list[str], ParamSpec si besoin.</code></pre>
</div>
</details>

**Exercice 12** — **Definition of Done** pour la partie 1. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Arborescence créée ; format de ligne documenté ; README avec objectifs.</code></pre>
</div>
</details>

## Suite

[Parsing par générateurs](/projet-av-journal-2-parse-generateurs/)

## Amazon (partenaire)

- [Python avancé projet](https://www.amazon.fr/s?k=python+architecture+logicielle+livre&tag=manuso06-21)
