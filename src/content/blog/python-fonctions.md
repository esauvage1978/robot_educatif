---
title: "Python — fonctions (def, return, paramètres)"
headline: "Fonctions (def, return, paramètres)"
description: "def, arguments, return et None ; paramètres par défaut ; portée locale ; découper un script en petites fonctions claires ; 20 exercices avec solutions repliables."
pubDate: 2026-03-28
updatedDate: 2026-03-29
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Python
seriesOrder: 6
tags: ["Python", "Programmation"]
relatedLinks:
  - title: "Leçon 5 — boucles"
    href: "/python-boucles-for-while/"
  - title: "Leçon 7 — listes et chaînes"
    href: "/python-listes-et-chaines/"
categories:
  - "Python"
  - "Programmation"
  - "Tutoriel"
  - "Intermédiaire"
---
Une **fonction** regroupe des instructions sous un **nom**. Tu l’**appelles** quand tu en as besoin, avec des **arguments** si nécessaire. C’est la base pour éviter de **copier-coller** le même code et pour tester des petits morceaux isolément.

## 1. Définition minimale avec `return`

```python
def carre(x):
    return x * x

print(carre(5))   # 25
```

- **`def`** suivi du nom et des parenthèses (paramètres).
- Deux-points **`:`** et corps **indenté**.
- **`return`** envoie une valeur à l’appelant ; sans `return` explicite, Python renvoie **`None`** (« rien »).

```python
def dire_bonjour():
    print("Bonjour !")

dire_bonjour()   # affiche seulement, ne « retourne » pas de valeur utile pour un calcul
```

## 2. Plusieurs paramètres

```python
def hypotenuse(a, b):
    return (a * a + b * b) ** 0.5

print(hypotenuse(3, 4))   # 5.0
```

L’ordre des arguments à l’appel correspond à l’ordre de la définition.

## 3. Paramètres par défaut

Utile pour une **valeur habituelle** tout en permettant de la changer :

```python
def saluer(nom, titre="M."):
    print(f"Bonjour {titre} {nom}")

saluer("Dupont")
saluer("Martin", "Mme")
```

Les paramètres **avec** défaut doivent venir **après** ceux **sans** défaut dans la définition.

## 4. Portée des variables (idée simple)

Une variable **créée à l’intérieur** d’une fonction est surtout visible **dans** cette fonction (on dit qu’elle est **locale**). Une variable définie **au niveau du fichier** peut être **lue** dans une fonction, mais la **modifier** proprement demande le mot-clé `global` (hors programme de début : évite au début et passe plutôt des **arguments** et un **return**).

## 5. Documenter en une ligne (bon réflexe)

```python
def aire_rectangle(largeur, hauteur):
    """Retourne l'aire d'un rectangle."""
    return largeur * hauteur
```

Une courte **docstring** aide ton toi du futur (et les enseignants qui lisent ton code).

## Exercices (20)

Chaque exercice reprend les **fonctions** de la leçon (`def`, `return`, paramètres, défauts). Les **solutions** sont masquées par défaut : clique sur **Afficher la solution** pour comparer ton code.

### Niveau simple

**Exercice 1** — Écris **`carre(x)`** qui **retourne** le carré de **`x`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def carre(x):
    return x * x</code></pre>
</div>
</details>

**Exercice 2** — Écris **`aire_rectangle(largeur, hauteur)`** qui **retourne** l’aire (produit des deux arguments). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def aire_rectangle(largeur, hauteur):
    return largeur * hauteur</code></pre>
</div>
</details>

**Exercice 3** — Écris **`est_pair(n)`** qui retourne **`True`** si **`n`** est pair, sinon **`False`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def est_pair(n):
    return n % 2 == 0</code></pre>
</div>
</details>

**Exercice 4** — Écris **`minimum(a, b)`** qui retourne le plus petit des deux, **sans** utiliser **`min()`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def minimum(a, b):
    if a <= b:
        return a
    return b</code></pre>
</div>
</details>

**Exercice 5** — Écris **`perimetre_rectangle(largeur, hauteur)`** qui retourne le **périmètre** `2 * (largeur + hauteur)`. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def perimetre_rectangle(largeur, hauteur):
    return 2 * (largeur + hauteur)</code></pre>
</div>
</details>

**Exercice 6** — Écris **`distance(x1, y1, x2, y2)`** retournant la **distance euclidienne** entre les points `(x1,y1)` et `(x2,y2)` (racine de la somme des carrés des différences). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def distance(x1, y1, x2, y2):
    dx = x2 - x1
    dy = y2 - y1
    return (dx * dx + dy * dy) ** 0.5</code></pre>
</div>
</details>

**Exercice 7** — Écris **`dire_bonjour()`** sans paramètre : elle **affiche** seulement la chaîne `Bonjour !` (pas de `return` utile). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def dire_bonjour():
    print("Bonjour !")</code></pre>
</div>
</details>

### Niveau intermédiaire

**Exercice 8** — Écris **`valeur_absolue(x)`** qui retourne **`x`** si **`x >= 0`**, sinon **`-x`**, **sans** utiliser **`abs()`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def valeur_absolue(x):
    if x >= 0:
        return x
    return -x</code></pre>
</div>
</details>

**Exercice 9** — Écris **`saluer(nom, titre="M.")`** : affiche une phrase du type `Bonjour M. Dupont` avec **`f`** et des paramètres ( **`titre`** par défaut **`M.`** ). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def saluer(nom, titre="M."):
    print(f"Bonjour {titre} {nom}")</code></pre>
</div>
</details>

**Exercice 10** — Écris **`repeter(texte, fois=3)`** qui affiche **`texte`** exactement **`fois`** fois, une ligne par affichage, avec une boucle **`for`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def repeter(texte, fois=3):
    for _ in range(fois):
        print(texte)</code></pre>
</div>
</details>

**Exercice 11** — Écris **`est_divisible(a, b)`** qui retourne **`True`** si **`a`** est divisible par **`b`** (**`b`** non nul ; tu peux supposer **`b != 0`**). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def est_divisible(a, b):
    return a % b == 0</code></pre>
</div>
</details>

**Exercice 12** — Écris **`signe(n)`** qui retourne **`1`** si **`n > 0`**, **`-1`** si **`n < 0`**, **`0`** si **`n == 0`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def signe(n):
    if n > 0:
        return 1
    if n < 0:
        return -1
    return 0</code></pre>
</div>
</details>

**Exercice 13** — Écris **`moyenne(a, b)`** qui retourne la moyenne arithmétique **`(a + b) / 2`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def moyenne(a, b):
    return (a + b) / 2</code></pre>
</div>
</details>

**Exercice 14** — Écris **`aire_disque(rayon)`** qui retourne **`π × rayon²`** en prenant **`π = 3.14`** (pas besoin d’`import`). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def aire_disque(rayon):
    pi = 3.14
    return pi * rayon * rayon</code></pre>
</div>
</details>

### Niveau difficile

**Exercice 15** — Écris **`maximum3(a, b, c)`** qui retourne le **plus grand** des trois entiers, **sans** utiliser **`max()`**. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def maximum3(a, b, c):
    m = a
    if b > m:
        m = b
    if c > m:
        m = c
    return m</code></pre>
</div>
</details>

**Exercice 16** — Écris **`factorielle(n)`** pour un entier **`n ≥ 0`** : retourne **`1 × 2 × … × n`** (par convention **`factorielle(0) == 1`**). Utilise une boucle dans la fonction. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def factorielle(n):
    p = 1
    for k in range(1, n + 1):
        p *= k
    return p</code></pre>
</div>
</details>

**Exercice 17** — Écris **`compter_voyelles(texte)`** qui retourne le nombre de voyelles **`a, e, i, o, u`** en **minuscules** dans **`texte`** (parcours caractère par caractère ; tu peux tester **`c.lower()`**). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def compter_voyelles(texte):
    voy = "aeiou"
    n = 0
    for c in texte:
        if c.lower() in voy:
            n += 1
    return n</code></pre>
</div>
</details>

**Exercice 18** — Écris **`est_palindrome(mot)`** qui retourne **`True`** si la chaîne se lit identique **à l’envers** (tu peux comparer avec **`mot == mot[::-1]`**). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def est_palindrome(mot):
    return mot == mot[::-1]</code></pre>
</div>
</details>

**Exercice 19** — Écris **`puissance(x, n)`** pour **`n`** entier **`≥ 0`**, qui retourne **`x` à la puissance `n`** avec une boucle (**sans** utiliser `**`). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def puissance(x, n):
    p = 1
    for _ in range(n):
        p *= x
    return p</code></pre>
</div>
</details>

**Exercice 20** — Écris **`mention(note)`** pour une **`note`** entière sur **20** : retourne **`"recalé"`** si la note est **en dessous de 10** ; **`"passable"`** pour **10 à 13** inclus ; **`"bien"`** pour **14 à 15** inclus ; **`"très bien"`** pour **16 à 20** inclus. Si la note est **en dehors de 0 à 20**, retourne **`"invalide"`**. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def mention(note):
    if note < 0 or note > 20:
        return "invalide"
    if note < 10:
        return "recalé"
    if note < 14:
        return "passable"
    if note < 16:
        return "bien"
    return "très bien"</code></pre>
</div>
</details>

## Suite du parcours

Les [listes et chaînes](/python-listes-et-chaines/) donnent des structures de données à faire circuler entre fonctions (listes de scores, nettoyage de texte, etc.).

## Amazon (partenaire)

- [Python programmation structurée](https://www.amazon.fr/s?k=python+programmation+structur%C3%A9e&tag=manuso06-21)
