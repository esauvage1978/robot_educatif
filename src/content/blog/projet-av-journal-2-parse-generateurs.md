---
title: "Projet Journal CLI (2/6) — comment parser des logs avec des générateurs"
headline: "Projet Journal CLI — comment parser des logs avec des générateurs"
description: "Projet Python avancé : parser des fichiers log ligne à ligne avec yield, regex précompilée, Iterator, gestion des lignes invalides et tests simples."
pubDate: 2026-03-29
updatedDate: 2026-05-06
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Projet Python avancé — Journal CLI
seriesOrder: 2
tags: ["Python", "Projet", "Générateurs"]
relatedLinks:
  - title: "Partie 1 — architecture"
    href: "/projet-av-journal-1-architecture/"
  - title: "Python avancé — générateurs et itérateurs"
    href: "/python-av-generateurs-iterateurs/"
  - title: "Python intermédiaire — tests et qualité"
    href: "/python-inter-tests-qualite/"
  - title: "Partie 3 — décorateurs"
    href: "/projet-av-journal-3-decorateurs/"
categories:
  - "Python"
  - "Programmation"
  - "Projet"
  - "Avancé"
---
Dans la partie 1, tu as défini l’architecture du projet **Journal CLI** : `parser`, `stats`, `cli`, puis packaging plus tard. Cette deuxième étape transforme ce découpage en code concret : écrire une fonction qui lit un fichier de logs **ligne par ligne** et renvoie des objets exploitables sans remplir la mémoire.

L’objectif est de construire **`parse_lines(path: Path) -> Iterator[LogLine]`**. Le mot important est `Iterator` : un fichier de logs peut faire quelques kilo-octets ou plusieurs centaines de mégaoctets. Un bon parseur ne commence donc pas par `read_text().splitlines()` ; il lit, parse et produit les résultats progressivement avec `yield`.

<aside class="article-callout" role="note">
<p><strong>Objectif de la partie 2</strong></p>
<ul>
<li>Lire un fichier en flux avec un générateur.</li>
<li>Extraire timestamp, niveau et message.</li>
<li>Décider quoi faire des lignes invalides.</li>
<li>Préparer des tests simples avec <code>tmp_path</code>.</li>
</ul>
</aside>

Si la notion de générateur n’est pas encore fluide, relis [générateurs et itérateurs Python](/python-av-generateurs-iterateurs/). Pour replacer cette étape dans le projet complet, reviens à [l’architecture Journal CLI](/projet-av-journal-1-architecture/) ou au [hub du projet](/programmation/projet-python-avance-journal/).

<div class="article-toc" role="navigation" aria-label="Sommaire de l’article">
<p class="article-toc-title">Sommaire</p>
<ul>
<li><a href="#parse-lines">Implémenter parse_lines</a></li>
<li><a href="#performance">Performance et mémoire</a></li>
<li><a href="#lignes-invalides">Lignes invalides</a></li>
<li><a href="#tests">Tests à prévoir</a></li>
<li><a href="#exercices">Exercices</a></li>
<li><a href="#suite">Suite du projet</a></li>
</ul>
</div>

<h2 id="parse-lines">Implémenter `parse_lines`</h2>

Implémente **`parse_lines(path: Path) -> Iterator[LogLine]`** en ouvrant le fichier en **`encoding="utf-8"`** avec gestion **`errors="replace"`** ou **`strict`** selon politique documentée. Pour chaque ligne non vide, extrais **timestamp**, **niveau**, **message** avec **`re.compile`** précompilée en **constante de module** pour éviter de recompiler à chaque ligne.

Le parseur ne doit pas afficher de rapport utilisateur. Il reçoit un chemin, lit les lignes, puis produit des `LogLine`. L’agrégation viendra ensuite dans `stats.py`, et la ligne de commande restera dans `cli.py`.

<h2 id="performance">Performance</h2>

- **Précompiler** les regex.
- Éviter **`strip()`** répété inutile si le pattern gère les espaces.
- **`yield`** immédiatement : ne pas accumuler `lines` dans une liste.

Le principe à retenir : tant que tu peux traiter une ligne puis l’oublier, ne stocke pas tout le fichier. Cette stratégie rend le projet compatible avec des fichiers volumineux et prépare la suite, où `Counter`, agrégations et lecture multi-fichiers pourront travailler sur un flux.

<h2 id="lignes-invalides">Que faire des lignes invalides ?</h2>

Un vrai fichier de logs contient souvent des lignes imparfaites : stack trace sur plusieurs lignes, message sans date, niveau inconnu, caractères d’encodage. Tu dois choisir une politique simple et la documenter.

Trois options raisonnables :

- ignorer la ligne et incrémenter un compteur `skipped`;
- produire un `LogLine` avec niveau `UNKNOWN` ;
- lever une erreur en mode strict.

Pour ce tutoriel, l’option la plus pédagogique est souvent `UNKNOWN` ou `skipped`, car elle laisse l’outil terminer son analyse sans masquer complètement le problème.

<h2 id="tests">Tests à prévoir</h2>

Avant de passer aux décorateurs, écris au moins quelques tests avec `tmp_path` :

- fichier vide ;
- trois lignes valides ;
- ligne invalide ;
- fichier avec BOM UTF-8 ;
- vérification que `parse_lines` renvoie bien un itérateur.

Les bases sont dans [tests automatisés et qualité Python](/python-inter-tests-qualite/). Même dans un projet avancé, un test simple qui protège une règle métier vaut mieux qu’un gros test fragile.

<h2 id="exercices">Exercices (12)</h2>

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

<h2 id="suite">Suite</h2>

Une fois le parsing en place, passe à la partie 3 : [décorateurs pour métriques](/projet-av-journal-3-decorateurs/). Tu pourras mesurer le temps de parsing, compter les lignes et ajouter une journalisation propre sans mélanger ces préoccupations avec le cœur du parseur.

Tu peux aussi revenir à la [partie 1 — architecture](/projet-av-journal-1-architecture/) si tu veux vérifier que `parser`, `stats` et `cli` restent bien séparés.

## Amazon (partenaire)

- [Python performance](https://www.amazon.fr/s?k=python+performance+livre&tag=manuso06-21)

*Partenaire Amazon — commission possible sur achats éligibles, sans surcoût pour vous.*
