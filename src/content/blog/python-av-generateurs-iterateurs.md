---
title: "Python avancé — itérateurs, générateurs et itertools"
description: "Protocole iterator, yield, générateurs, itertools.chain et islice ; flux paresseux et mémoire ; ressources ; 20 exercices avec solutions repliables."
pubDate: 2026-03-29
updatedDate: 2026-03-29
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Python avancé
seriesOrder: 1
tags: ["Python", "Programmation", "Avancé"]
relatedLinks:
  - title: "Vue d’ensemble — Python avancé"
    href: "/programmation/python-avance/"
  - title: "Leçon 2 — décorateurs et functools"
    href: "/python-av-decorateurs-functools/"
categories:
  - "Python"
  - "Programmation"
  - "Tutoriel"
  - "Avancé"
---

En Python, une **boucle `for`** ne parcourt pas magiquement une liste : elle interroge un **itérateur** — un objet qui sait produire les éléments **un par un** selon le **protocole itérateur**. Comprendre ce mécanisme te permet d’écrire du code **paresseux** (lazy) qui ne charge pas tout en mémoire, de **composer** des pipelines de données, et de maîtriser les **générateurs** (`yield`), pierre angulaire de nombreuses API modernes.

## 1. Itérables, itérateurs et la méthode `__iter__`

Un objet **itérable** est tout ce qu’on peut parcourir avec `for` : listes, tuples, chaînes, fichiers ouverts en mode texte, etc. Techniquement, un itérable expose **`__iter__()`**, qui renvoie un **itérateur**. L’itérateur expose **`__next__()`** (ou `next()` en Python 3) et lève **`StopIteration`** quand il n’y a plus d’éléments.

```python
it = iter([1, 2, 3])
print(next(it))  # 1
print(next(it))  # 2
```

**Pourquoi c’est important ?** Parce que **deux boucles `for` indépendantes** sur le même itérable recréent souvent un **nouvel** itérateur depuis l’itérable, alors qu’un **itérateur consommé** ne se « rembobine » pas tout seul : une fois épuisé, il reste vide.

## 2. Générateurs et `yield`

Une **fonction générateur** utilise **`yield`** au lieu de `return` pour « suspendre » son exécution et renvoyer une valeur ; à l’appel suivant, elle **reprend** après le `yield`. L’objet retourné est un **générateur**, qui est à la fois un **itérateur** : tu ne charges pas une liste entière en mémoire.

```python
def compte_jusqua(n):
    i = 0
    while i < n:
        yield i
        i += 1

for x in compte_jusqua(3):
    print(x)
```

**Cas d’usage** : lecture ligne par ligne de gros fichiers, pipelines de transformation, combinateurs infinis bornés par une condition métier.

## 3. Expressions génératrices

Syntaxe **`(expr for x in it if cond)`** — parenthèses sauf si seul argument d’appel de fonction, où les parenthèses du générateur peuvent être omises. C’est un **générateur** anonyme, pas une liste.

```python
carres = (x * x for x in range(5))
```

## 4. Le module `itertools`

**`itertools`** fournit des **itérateurs** combinés efficaces en C : **`chain`** pour enchaîner des itérables, **`islice`** pour découper sans copier toute la séquence, **`cycle`**, **`repeat`**, **`groupby`** (souvent après **tri**), **`zip_longest`**, etc. C’est la boîte à outils standard pour **composer** des flux sans listes intermédiaires géantes.

```python
from itertools import chain, islice
list(islice(chain([1, 2], [3, 4]), 3))
```

## 5. Bonnes pratiques

- Préférer les **générateurs** quand la taille des données est **grande** ou **inconnue**.
- Attention : un générateur **à usage unique** ; si tu dois le parcourir **plusieurs fois**, matérialise (`list(...)`) ou recrée le générateur.
- **`itertools.groupby`** groupe des **éléments adjacents** identiques : trie souvent avant avec **`sorted(iterable, key=...)`**.

## Ressources externes

- **[Glossary — iterator](https://docs.python.org/3/glossary.html#term-iterator)** (documentation officielle).
- **[itertools](https://docs.python.org/fr/3/library/itertools.html)** (FR).
- **[PEP 255 — Simple Generators](https://peps.python.org/pep-0255/)** : motivation historique.

## Exercices (20)

Les **solutions** sont masquées par défaut.

### Niveau simple

**Exercice 1** — Utilise **`iter`** et **`next`** sur **`"ab"`** pour afficher **`a`** puis **`b`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">it = iter("ab")
print(next(it))
print(next(it))</code></pre>
</div>
</details>

**Exercice 2** — Écris un générateur **`pairs(n)`** qui **`yield`** les entiers pairs **`0, 2, …` strictement inférieurs à `n`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def pairs(n):
    i = 0
    while i < n:
        if i % 2 == 0:
            yield i
        i += 1</code></pre>
</div>
</details>

**Exercice 3** — Liste en compréhension des carrés de **`range(4)`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">[x * x for x in range(4)]</code></pre>
</div>
</details>

**Exercice 4** — Expression génératrice équivalente, puis **`list(...)`** pour l’afficher. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">list(x * x for x in range(4))</code></pre>
</div>
</details>

**Exercice 5** — Importe **`chain`** et affiche **`list(chain([1], [2, 3]))`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from itertools import chain
print(list(chain([1], [2, 3])))</code></pre>
</div>
</details>

**Exercice 6** — Utilise **`islice`** pour prendre les **3** premiers éléments de **`range(100)`** sans construire la liste complète. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from itertools import islice
print(list(islice(range(100), 3)))</code></pre>
</div>
</details>

**Exercice 7** — Explique en une phrase pourquoi **`list(g)`** puis **`list(g)`** sur le **même** générateur `g` donne souvent **`[]`** la deuxième fois. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Le générateur est épuisé après le premier parcours ; le second ne produit plus rien.</code></pre>
</div>
</details>

### Niveau intermédiaire

**Exercice 8** — Générateur **`lecture_lignes(chemin)`** ouvrant un fichier en **`encoding="utf-8"`** et **`yield`** chaque ligne **sans** charger tout le fichier en mémoire (utilise **`open`** et une boucle). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def lecture_lignes(chemin):
    with open(chemin, encoding="utf-8") as f:
        for ligne in f:
            yield ligne.rstrip("\n")</code></pre>
</div>
</details>

**Exercice 9** — Utilise **`enumerate`** sur un générateur de **`range(3)`** et affiche **`(index, valeur)`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">for t in enumerate(x for x in range(3)):
    print(t)</code></pre>
</div>
</details>

**Exercice 10** — Avec **`zip`**, combine **`"abc"`** et **`[1, 2, 3]`** en liste de tuples. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">print(list(zip("abc", [1, 2, 3])))</code></pre>
</div>
</details>

**Exercice 11** — Importe **`zip_longest`** depuis **`itertools`** avec **`fillvalue=0`** et zip **`[1]`** avec **`[1,2,3]`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from itertools import zip_longest
print(list(zip_longest([1], [1, 2, 3], fillvalue=0)))</code></pre>
</div>
</details>

**Exercice 12** — **`itertools.count(start=10, step=2)`** : prends **`5`** valeurs avec **`islice`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from itertools import count, islice
print(list(islice(count(10, 2), 5)))</code></pre>
</div>
</details>

**Exercice 13** — Générateur **`fibonacci()`` infini** ; affiche les **8** premiers termes avec **`islice`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from itertools import islice

def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

print(list(islice(fibonacci(), 8)))</code></pre>
</div>
</details>

**Exercice 14** — Donne un exemple où **`[f(x) for x in huge]`** est risqué en mémoire et la variante **génératrice** préférable. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Liste : alloue tout d'un coup. Générateur : (f(x) for x in huge) ne matérialise pas la séquence complète.</code></pre>
</div>
</details>

### Niveau difficile

**Exercice 15** — Implémente **`grouper_par_deux(iterable)`** avec **`yield`** des tuples **`(a, b)`** consécutifs ; si impair, dernier élément ignoré ou géré par option (choisis une politique et documente-la). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def grouper_par_deux(iterable):
    it = iter(iterable)
    while True:
        try:
            a = next(it)
            b = next(it)
        except StopIteration:
            break
        yield (a, b)

print(list(grouper_par_deux([1, 2, 3, 4, 5])))  # (5) ignoré</code></pre>
</div>
</details>

**Exercice 16** — Utilise **`groupby`** sur **`sorted("abracadabra")`** pour afficher **lettre → nombre d’occurrences** (adjacent). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from itertools import groupby
for k, g in groupby(sorted("abracadabra")):
    print(k, len(list(g)))</code></pre>
</div>
</details>

**Exercice 17** — Quelle est la différence entre **`yield`** et **`yield from`** dans un sous-générateur ? Donne un micro-exemple. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def inner():
    yield 1
    yield 2

def outer():
    yield from inner()  # délègue sans boucle explicite

print(list(outer()))</code></pre>
</div>
</details>

**Exercice 18** — Combine **`chain.from_iterable`** avec une liste de listes **`[[1,2],[3]]`**. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from itertools import chain
print(list(chain.from_iterable([[1, 2], [3]])))</code></pre>
</div>
</details>

**Exercice 19** — Écris un **générateur** qui fusionne **deux** itérables triés en **flux trié** (type merge de fusion) pour des entiers ; suppose entrées triées. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def merge_tri(a, b):
    ia, ib = iter(a), iter(b)
    x = next(ia, None)
    y = next(ib, None)
    while x is not None and y is not None:
        if x <= y:
            yield x
            x = next(ia, None)
        else:
            yield y
            y = next(ib, None)
    while x is not None:
        yield x
        x = next(ia, None)
    while y is not None:
        yield y
        y = next(ib, None)

print(list(merge_tri([1, 4], [2, 3])))</code></pre>
</div>
</details>

**Exercice 20** — Explique pourquoi **`sum([[1],[2],[3]], [])`** « aplatit » mais est **peu efficace** ; propose **`chain.from_iterable`** à la place. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># sum avec listes crée des copies intermédiaires O(n²). chain.from_iterable est linéaire et paresseux.
from itertools import chain
list(chain.from_iterable([[1], [2], [3]]))</code></pre>
</div>
</details>

## Suite du parcours

[Décorateurs, wrappers et functools](/python-av-decorateurs-functools/) : composer des comportements sans dupliquer le code.

## Amazon (partenaire)

- [Python avancé programmation](https://www.amazon.fr/s?k=python+avanc%C3%A9+livre&tag=manuso06-21)
