---
title: "Python intermédiaire — expressions régulières (module re)"
description: "Module re : search, match, findall, groupes, sub ; raw strings ; limites des regex ; ressources officielles ; 20 exercices avec solutions repliables."
pubDate: 2026-03-29
updatedDate: 2026-03-29
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Python intermédiaire
seriesOrder: 6
tags: ["Python", "Programmation", "Bonnes pratiques"]
relatedLinks:
  - title: "Leçon 5 — tests et qualité"
    href: "/python-inter-tests-qualite/"
  - title: "Hub Python intermédiaire"
    href: "/programmation/python-intermediaire/"
categories:
  - "Python"
  - "Programmation"
  - "Tutoriel"
  - "Intermédiaire"
---
Une **expression régulière** (regex) est une **notation compacte** pour décrire une **famille** de chaînes possibles : « une suite de chiffres », « un mot composé de lettres », « une date au format AAAA-MM », etc. Le module standard **`re`** compile ces motifs et les applique avec des fonctions de **recherche**, **découpage** ou **remplacement**. C’est un outil **très efficace** pour du texte semi-structuré (logs, exports), mais les motifs **complexes** deviennent vite **difficiles à lire et à maintenir** : règle d’or — rester **simple**, **nommer l’intention** en commentaire, et envisager un **parseur** (HTML, JSON, CSV avec le module **`csv`**) quand le format est riche ou évolutif.

## 1. Chercher : `search` vs `match`

**`re.search(motif, texte)`** parcourt **toute** la chaîne et renvoie la **première** occurrence. **`re.match(motif, texte)`** ne teste que le **début** de la chaîne (comme si le motif était ancré implicitement au début) : même résultat que `search` seulement si le motif correspond dès le premier caractère.

```python
import re
m = re.search(r"\d+", "abc123def")
if m:
    print(m.group())  # 123
```

**Raw strings** : préfère **`r"\d+"`** à **`"\\d+"`** : le préfixe **`r`** limite les surprises avec les **antislashs** (`\` interprété par Python vs par le moteur regex).

## 2. Toutes les occurrences : `findall` et `finditer`

**`findall`** renvoie une **liste** de correspondances (chaînes ou tuples si la regex contient des **groupes**). **`finditer`** fournit des **objets `Match`** un par un — utile pour connaître **positions** (`span()`) ou **groupes nommés** sans tout charger en mémoire d’un coup.

```python
re.findall(r"\w+", "a,b,c")  # mots alphanum + _
```

## 3. Remplacer : `sub`

**`re.sub(motif, remplacement, texte)`** applique un **remplacement** (chaîne ou fonction) à chaque correspondance. Exemple classique : **normaliser les espaces** multiples.

```python
re.sub(r"\s+", " ", "a   b  c")  # un seul espace entre mots
```

## 4. Groupes et extraction

Les **parenthèses** dans le motif définissent des **groupes de capture** : **`m.group(1)`** est la première parenthèse, etc. Les **groupes nommés** `(?P<nom>...)` améliorent la lisibilité pour les motifs un peu longs.

```python
m = re.match(r"(\d+)-(\d+)", "2026-03")
m.group(1), m.group(2)
```

**Limites** : valider un **e-mail** ou une **URL** « à la perfection » avec une seule regex est **ardu** et souvent **imprécis** ; en production on combine **regex grossière** + validation métier ou **bibliothèques** éprouvées. Pour du **HTML** ou du **JSON**, n’utilise pas la regex comme parseur principal.

## Ressources externes

- **[re — Documentation](https://docs.python.org/fr/3/library/re.html)** : syntaxe des motifs, fonctions, flags (FR).
- **[Syntaxe des expressions régulières](https://docs.python.org/fr/3/library/re.html#regular-expression-syntax)** : métacaractères, quantificateurs, classes de caractères.
- **[HOWTO regex](https://docs.python.org/fr/3/howto/regex.html)** : tutoriel pas à pas.

## Exercices (20)

Les exercices restent sur des **motifs courts** ; les **solutions** sont masquées par défaut.

### Niveau simple

**Exercice 1** — Trouve le premier **chiffre** avec **`re.search(r"\d", s)`** sur **`"a7b"`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import re
m = re.search(r"\d", "a7b")
print(m.group())</code></pre>
</div>
</details>

**Exercice 2** — **`re.findall(r"\d+", "prix 12 et 3")`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import re
print(re.findall(r"\d+", "prix 12 et 3"))</code></pre>
</div>
</details>

**Exercice 3** — Remplace les **espaces multiples** par **un** espace avec **`re.sub`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import re
s = re.sub(r"\s+", " ", "a    b")
print(s)</code></pre>
</div>
</details>

**Exercice 4** — **`re.match(r"hi", "hi there")`** : que retourne **`group()`** ? <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import re
m = re.match(r"hi", "hi there")
print(m.group())  # hi</code></pre>
</div>
</details>

**Exercice 5** — Pourquoi **`re.match`** ne trouve-t-il pas **`"x"`** dans **`"ax"`** ? <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># match ancre au début de la chaîne ; utiliser search pour chercher n'importe où.</code></pre>
</div>
</details>

**Exercice 6** — Trouve **`"cat"`** ou **`"dog"`** avec **`re.search(r"cat|dog", s)`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import re
print(re.search(r"cat|dog", "my dog").group())</code></pre>
</div>
</details>

**Exercice 7** — **`re.IGNORECASE`** pour ignorer la casse : **`re.search(r"abc", "ABC", re.I)`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import re
print(re.search(r"abc", "ABC", re.I).group())</code></pre>
</div>
</details>

### Niveau intermédiaire

**Exercice 8** — Groupe capturant : **`re.match(r"(\d{4})-(\d{2})", "2026-03")`** puis **`groups()`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import re
m = re.match(r"(\d{4})-(\d{2})", "2026-03")
print(m.groups())</code></pre>
</div>
</details>

**Exercice 9** — Motif **email simpliste** **`r"[\w.+-]+@[\w-]+\.\w+"`** — rappelle pourquoi ce n’est pas suffisant en prod. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Cas limites (IDN, +, commentaires) ; préférer une lib ou validation serveur.</code></pre>
</div>
</details>

**Exercice 10** — **`re.split(r"[;,]", "a;b,c")`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import re
print(re.split(r"[;,]", "a;b,c"))</code></pre>
</div>
</details>

**Exercice 11** — **`re.fullmatch(r"\d+", "1234")`** pour **toute** la chaîne. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import re
print(re.fullmatch(r"\d+", "1234") is not None)</code></pre>
</div>
</details>

**Exercice 12** — **`re.sub(r"(\w+)", r"[\1]", "a b")`** — comprends le **backreference** **`\\1`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import re
print(re.sub(r"(\w+)", r"[\1]", "a b"))</code></pre>
</div>
</details>

**Exercice 13** — Compile un motif avec **`re.compile(r"\d+")`** et réutilise **`.search`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import re
pat = re.compile(r"\d+")
print(pat.search("x99").group())</code></pre>
</div>
</details>

**Exercice 14** — Bonne pratique : pourquoi limiter la **longueur** du texte avant une grosse regex sur un fichier ? <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Risque de backtracking catastrophique (ReDoS) sur motifs mal choisis.</code></pre>
</div>
</details>

### Niveau difficile

**Exercice 15** — Extraire toutes les **URLs** **`http...`** simplifiées avec **`findall`** (motif minimal). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import re
texte = "voir http://ex.com et https://a.org"
print(re.findall(r"https?://\S+", texte))</code></pre>
</div>
</details>

**Exercice 16** — **`re.DOTALL`** : à quoi sert le flag pour **`.`** ? <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Le point matche aussi le saut de ligne.</code></pre>
</div>
</details>

**Exercice 17** — Sur la chaîne **`"2026-03"`**, utilise un **groupe nommé** pour l’année (motif du type **`(?P<year>\d{4})`**), puis affiche l’année avec **`m.group("year")`**. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import re
# Groupe nommé « year » (syntaxe : (?P&lt;name&gt;...) dans la doc Python « re »)
m = re.match(r"(?P&lt;year&gt;\d{4})-(\d{2})", "2026-03")
print(m.group("year"))</code></pre>
</div>
</details>

**Exercice 18** — Échapper un **point littéral** : matcher **`"3.14"`** avec **`r"\d+\.\d+"`**. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import re
print(re.fullmatch(r"\d+\.\d+", "3.14"))</code></pre>
</div>
</details>

**Exercice 19** — **`re.escape("a+b")`** : à quoi ça sert ? <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import re
# Échapper les métacaractères pour chercher une chaîne utilisateur littéralement.
print(re.escape("a+b"))</code></pre>
</div>
</details>

**Exercice 20** — Fonction **`masquer_emails(texte)`** qui remplace **`user@domain.tld`** par **`user@***`** avec **`re.sub`** (motif simple). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import re

def masquer_emails(texte):
    return re.sub(r"([\w.+-]+)@([\w.-]+)", r"\1@***", texte)</code></pre>
</div>
</details>

## Suite du parcours

Tu peux enchaîner avec les [projets guidés](/programmation/) (bataille navale, pendu, etc.) en appliquant modules, tests et chemins **`Path`**.

## Amazon (partenaire)

- [Python texte et données](https://www.amazon.fr/s?k=python+traitement+texte+livre&tag=manuso06-21)
</think>


<｜tool▁calls▁begin｜><｜tool▁call▁begin｜>
StrReplace