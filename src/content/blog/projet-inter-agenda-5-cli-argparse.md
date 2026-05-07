---
title: "Projet Agenda CLI (5/6) — comment créer une CLI avec argparse"
headline: "Projet Agenda CLI — comment créer l’interface en ligne de commande avec argparse"
description: "Projet Python intermédiaire : créer une CLI argparse avec sous-commandes add/list/remove, dates ISO, codes de sortie, stderr, --file et dispatch testable."
pubDate: 2026-03-29
updatedDate: 2026-05-06
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Projet Python intermédiaire — Agenda CLI
seriesOrder: 5
tags: ["Python", "Projet", "CLI"]
relatedLinks:
  - title: "Partie 4 — tests"
    href: "/projet-inter-agenda-4-tests-pytest/"
  - title: "Python mini-jeu terminal"
    href: "/python-mini-jeu-terminal/"
  - title: "Python erreurs et débogage"
    href: "/python-erreurs-debogage/"
  - title: "Partie 6 — livraison"
    href: "/projet-inter-agenda-6-livraison-extensions/"
categories:
  - "Python"
  - "Programmation"
  - "Projet"
  - "Intermédiaire"
---
Après avoir testé le service avec pytest, tu peux exposer l’agenda dans le terminal. Cette partie construit l’interface utilisateur avec **`argparse`** : sous-commandes, arguments, messages d’erreur et codes de sortie.

Le rôle de la CLI est volontairement limité. Elle lit les arguments, appelle `AgendaService`, affiche un résultat lisible, puis retourne un code entier. Les règles métier restent dans le service ; l’affichage reste dans la couche CLI.

<aside class="article-callout" role="note">
<p><strong>Objectif de la partie 5</strong></p>
<ul>
<li>Créer les sous-commandes <code>add</code>, <code>list</code> et <code>remove</code>.</li>
<li>Parser les dates ISO depuis le terminal.</li>
<li>Retourner des codes de sortie cohérents.</li>
<li>Garder une CLI testable sans lancer un vrai subprocess partout.</li>
</ul>
</aside>

Pour réviser la logique terminal, consulte [mini-jeu Python dans le terminal](/python-mini-jeu-terminal/) et [erreurs / débogage Python](/python-erreurs-debogage/).

<div class="article-toc" role="navigation" aria-label="Sommaire de l’article">
<p class="article-toc-title">Sommaire</p>
<ul>
<li><a href="#structure">Structure argparse</a></li>
<li><a href="#bonnes-pratiques">Bonnes pratiques CLI</a></li>
<li><a href="#dispatch">Séparer parsing et exécution</a></li>
<li><a href="#tests">Tests à prévoir</a></li>
<li><a href="#exercices">Exercices</a></li>
<li><a href="#suite">Suite du projet</a></li>
</ul>
</div>

<h2 id="structure">Structure `argparse`</h2>

**`argparse`** structure la CLI avec **`ArgumentParser`**, **`add_subparsers`** pour **`agenda add`**, **`agenda list`**, **`agenda remove`**. Chaque sous-commande a ses propres arguments : **`--title`**, **`--start`** (chaîne ISO), **`--from` / `--to`** pour la liste, **`--id`** pour la suppression. Retourne **`sys.exit(1)`** en cas d’erreur utilisateur ou fichier corrompu.

<h2 id="bonnes-pratiques">Bonnes pratiques</h2>

- **`prog`** et **`description`** clairs dans le parser principal.
- Messages d’erreur sur **`stderr`** (`print(..., file=sys.stderr)`).
- **`type=`** pour parser les dates avec une petite fonction qui appelle **`datetime.fromisoformat`**.

Pense aussi à l’expérience utilisateur. Une commande qui réussit peut afficher un message court sur `stdout` : événement ajouté, nombre d’événements listés, identifiant supprimé. Une erreur doit aller sur `stderr` avec un code de sortie non zéro, afin qu’un script puisse détecter l’échec. Cette séparation sera utile si l’agenda est un jour appelé depuis un autre outil.

<h2 id="dispatch">Séparer parsing et exécution</h2>

Une CLI devient vite difficile à tester si tout est dans `main`. Une structure simple fonctionne mieux :

- `build_parser()` crée le parser ;
- `parse_args(argv)` transforme les chaînes en `Namespace` ;
- `dispatch(args, service)` appelle le bon comportement ;
- `main(argv=None)` orchestre et retourne un code.

Avec ce découpage, tu peux tester `dispatch` avec un faux service ou un `Namespace` construit à la main, sans capturer toute la sortie terminal à chaque test.

<h2 id="tests">Tests à prévoir</h2>

Ajoute au minimum :

- `--help` affiche les sous-commandes ;
- `add` refuse un titre absent ;
- une date invalide donne un message clair ;
- `list` appelle le service avec les bonnes bornes ;
- `remove` transforme un identifiant inconnu en code de sortie non zéro.

Ces tests complètent ceux de la partie 4 : [tests avec pytest](/projet-inter-agenda-4-tests-pytest/).

<h2 id="exercices">Exercices (12)</h2>

**Exercice 1** — Crée un parser avec sous-commande **`add`** et argument **`--title`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import argparse
p = argparse.ArgumentParser()
sub = p.add_subparsers(required=True)
add = sub.add_parser("add")
add.add_argument("--title", required=True)</code></pre>
</div>
</details>

**Exercice 2** — Parse **`argv`** factice **`["list", "--from", "2026-01-01T00:00:00"]`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">args = p.parse_args(["list", "--from", "2026-01-01T00:00:00"])</code></pre>
</div>
</details>

**Exercice 3** — Fonction **`main()`** retournant un **code entier** et **`sys.exit(main())`** dans **`__main__.py`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def main() -> int:
    ...
    return 0

if __name__ == "__main__":
    raise SystemExit(main())</code></pre>
</div>
</details>

**Exercice 4** — **`ArgumentDefaultsHelpFormatter`** pour afficher les défauts. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">argparse.ArgumentParser(formatter_class=argparse.ArgumentDefaultsHelpFormatter)</code></pre>
</div>
</details>

**Exercice 5** — Gestion globale **`try/except`** dans **`main`** pour **`ValueError`** → message + code 2. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">try:
    ...
except ValueError as e:
    print(e, file=sys.stderr)
    return 2</code></pre>
</div>
</details>

**Exercice 6** — Pourquoi séparer **`parse_args`** de l’**exécution** du service (testabilité) ? <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># On peut tester dispatch(args) avec un namespace construit à la main.</code></pre>
</div>
</details>

**Exercice 7** — Option **`--file`** globale pour le chemin JSON (parents parser). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">p.add_argument("--file", type=Path, default=None)</code></pre>
</div>
</details>

**Exercice 8** — Affichage tableau simple avec **`str.format`** ou **f-strings** alignées. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">for e in events:
    print(f"{e.start:%Y-%m-%d %H:%M}  {e.title}")</code></pre>
</div>
</details>

**Exercice 9** — **`--help`** automatique : vérifier qu’elle mentionne les sous-commandes. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">python -m agenda_cli --help</code></pre>
</div>
</details>

**Exercice 10** — Lecture **stdin** non requise en v1 — note pour v2. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Importer des événements depuis CSV/JSON sur stdin.</code></pre>
</div>
</details>

**Exercice 11** — Évite **`print`** dans le service : passe les **résultats** à la couche CLI. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Service retourne list[Event] ; cli formate — tests du service sans capture stdout.</code></pre>
</div>
</details>

**Exercice 12** — **`argparse` vs `click`** : un avantage de chaque. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">argparse : stdlib ; click : ergonomie, couleurs, testing CliRunner.</code></pre>
</div>
</details>

<h2 id="suite">Suite</h2>

Continue avec la partie 6 : [livraison et extensions](/projet-inter-agenda-6-livraison-extensions/). Tu y prépareras README, installation, qualité et idées d’évolution.

## Amazon (partenaire)

- [Python ligne de commande](https://www.amazon.fr/s?k=python+cli+livre&tag=manuso06-21)

*Partenaire Amazon — commission possible sur achats éligibles, sans surcoût pour vous.*
