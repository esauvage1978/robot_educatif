---
title: "Projet Agenda CLI (5/6) — argparse et interface ligne de commande"
description: "Sous-commandes add, list, remove ; dates ; codes de sortie ; messages utilisateur ; 12 exercices."
pubDate: 2026-03-29
updatedDate: 2026-03-29
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Projet Python intermédiaire — Agenda CLI
seriesOrder: 5
tags: ["Python", "Projet", "CLI"]
relatedLinks:
  - title: "Partie 4 — tests"
    href: "/projet-inter-agenda-4-tests-pytest/"
  - title: "Partie 6 — livraison"
    href: "/projet-inter-agenda-6-livraison-extensions/"
categories:
  - "Python"
  - "Programmation"
  - "Projet"
  - "Intermédiaire"
---
**`argparse`** structure la CLI avec **`ArgumentParser`**, **`add_subparsers`** pour **`agenda add`**, **`agenda list`**, **`agenda remove`**. Chaque sous-commande a ses propres arguments : **`--title`**, **`--start`** (chaîne ISO), **`--from` / `--to`** pour la liste, **`--id`** pour la suppression. Retourne **`sys.exit(1)`** en cas d’erreur utilisateur ou fichier corrompu.

## Bonnes pratiques

- **`prog`** et **`description`** clairs dans le parser principal.
- Messages d’erreur sur **`stderr`** (`print(..., file=sys.stderr)`).
- **`type=`** pour parser les dates avec une petite fonction qui appelle **`datetime.fromisoformat`**.

## Exercices (12)

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

## Suite

[Livraison et extensions](/projet-inter-agenda-6-livraison-extensions/)

## Amazon (partenaire)

- [Python ligne de commande](https://www.amazon.fr/s?k=python+cli+livre&tag=manuso06-21)
