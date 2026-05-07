---
title: "Projet Journal CLI (1/6) — comment concevoir l’architecture"
headline: "Projet Journal CLI — comment concevoir l’architecture et le périmètre"
description: "Projet Python avancé : concevoir l’architecture d’un analyseur de logs en CLI, définir parser/stats/cli, limiter le périmètre et préparer les générateurs."
pubDate: 2026-03-29
updatedDate: 2026-05-06
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Projet Python avancé — Journal CLI
seriesOrder: 1
tags: ["Python", "Projet", "Avancé"]
relatedLinks:
  - title: "Hub projet Journal CLI"
    href: "/programmation/projet-python-avance-journal/"
  - title: "Python avancé — générateurs"
    href: "/python-av-generateurs-iterateurs/"
  - title: "Python avancé — packaging pyproject"
    href: "/python-av-packaging-pyproject/"
  - title: "Partie 2 — parsing générateur"
    href: "/projet-av-journal-2-parse-generateurs/"
categories:
  - "Python"
  - "Programmation"
  - "Projet"
  - "Avancé"
---
Cette première partie pose les bases du projet **Journal CLI**, un projet Python avancé en six étapes. L’objectif est de concevoir un petit outil en ligne de commande, **`journal-stats`** (nom fictif du tutoriel), capable de lire des fichiers de logs et de produire des statistiques utiles sans charger tout le fichier en mémoire.

Avant d’écrire du code, il faut décider ce que l’outil fait, ce qu’il ne fait pas, et comment séparer les responsabilités. C’est le rôle de cette étape : définir le **périmètre**, choisir les modules, préparer la lecture ligne à ligne et éviter le piège du “tout dans `cli.py`”.

<aside class="article-callout" role="note">
<p><strong>Objectif de la partie 1</strong></p>
<ul>
<li>Définir le format minimal des lignes de journal.</li>
<li>Découper le projet en modules testables.</li>
<li>Préparer une architecture compatible avec de gros fichiers.</li>
<li>Documenter les limites avant de passer au parsing par générateurs.</li>
</ul>
</aside>

L’outil lit un ou plusieurs **fichiers texte** au format type **journal** : une ligne par événement, préfixe horodatage optionnel **`YYYY-MM-DD HH:MM:SS`**, niveau **`INFO`**, **`ERROR`**, etc. Le programme produit des **statistiques** : nombre de lignes par niveau, top des messages, erreurs par heure. L’architecture sépare **`parser`** (générateur de lignes / enregistrements), **`stats`** (agrégation), **`cli`** (arguments, **multiples fichiers**), et éventuellement **`io_async`** (lecture concurrente schématique).

Pour suivre confortablement cette série, révise au besoin les [générateurs et itérateurs Python](/python-av-generateurs-iterateurs/) et garde le [hub du projet Journal CLI](/programmation/projet-python-avance-journal/) sous la main.

<div class="article-toc" role="navigation" aria-label="Sommaire de l’article">
<p class="article-toc-title">Sommaire</p>
<ul>
<li><a href="#perimetre">Périmètre du projet</a></li>
<li><a href="#modules-prevus">Modules prévus</a></li>
<li><a href="#decisions">Décisions d’architecture</a></li>
<li><a href="#exercices">Exercices</a></li>
<li><a href="#suite">Suite du projet</a></li>
</ul>
</div>

<h2 id="perimetre">Périmètre du projet</h2>

Dans cette série, on vise un outil réaliste mais volontairement limité. Il analyse des fichiers texte UTF-8, ignore ou signale les lignes mal formées selon une règle documentée, puis calcule des statistiques simples. On ne construit pas un clone de service d’observabilité : pas de base de données, pas d’interface web, pas de traitement temps réel.

Ce périmètre est important. Un projet avancé n’est pas forcément un projet énorme : c’est un projet où les choix techniques sont justifiés. Ici, le choix central est de traiter les fichiers en **flux** avec des itérateurs, pour rester efficace même avec des fichiers volumineux.

<h2 id="modules-prevus">Modules prévus</h2>

- **`journal_stats/parser.py`** : `parse_lines(path) -> Iterator[LogLine]`
- **`journal_stats/stats.py`** : `aggregate(lines: Iterable[LogLine]) -> Report`
- **`journal_stats/cli.py`** : `main()` avec argparse
- **`pyproject.toml`** : point d’entrée (partie 6)

<h2 id="decisions">Décisions d’architecture à poser dès maintenant</h2>

Le module `parser` ne doit pas connaître la ligne de commande. Il transforme un flux de texte en objets ou structures Python. Le module `stats` ne doit pas ouvrir les fichiers : il reçoit des lignes déjà parsées et agrège. Le module `cli` orchestre seulement les arguments, les chemins et l’affichage final.

Ce découpage rend le projet plus facile à tester et prépare les parties suivantes :

- partie 2 : [parsing par générateurs](/projet-av-journal-2-parse-generateurs/) ;
- partie 3 : décorateurs pour métriques et journalisation ;
- partie 4 : traitement de plusieurs fichiers avec `asyncio` ;
- partie 5 : typage et vérification `mypy` ;
- partie 6 : [packaging avec pyproject](/python-av-packaging-pyproject/) et commande installable.

La règle à garder en tête : une couche doit recevoir des données simples et renvoyer un résultat clair. Si une fonction lit un fichier, parse, agrège, affiche et gère les erreurs système, elle sera difficile à tester.

<h2 id="exercices">Exercices (12)</h2>

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

<h2 id="suite">Suite</h2>

Passe ensuite à la partie 2 : [parsing par générateurs](/projet-av-journal-2-parse-generateurs/). C’est là que l’architecture définie ici commence à produire du code concret : lecture ligne à ligne, `yield`, regex précompilée et gestion des lignes invalides.

Si tu veux revoir les notions avant de continuer, lis aussi [générateurs et itérateurs Python](/python-av-generateurs-iterateurs/) et [packaging Python avec pyproject](/python-av-packaging-pyproject/).

## Amazon (partenaire)

- [Python avancé projet](https://www.amazon.fr/s?k=python+architecture+logicielle+livre&tag=manuso06-21)

*Partenaire Amazon — commission possible sur achats éligibles, sans surcoût pour vous.*
