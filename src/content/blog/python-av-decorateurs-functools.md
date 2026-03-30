---
title: "Python avancé — décorateurs, functools et fermetures"
description: "Fermetures, décorateurs simples, @wraps, partial, lru_cache ; ordre d’application ; ressources ; 20 exercices avec solutions repliables."
pubDate: 2026-03-29
updatedDate: 2026-03-29
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Python avancé
seriesOrder: 2
tags: ["Python", "Programmation", "Avancé"]
relatedLinks:
  - title: "Leçon 1 — générateurs et itertools"
    href: "/python-av-generateurs-iterateurs/"
  - title: "Leçon 3 — context managers"
    href: "/python-av-context-managers/"
categories:
  - "Python"
  - "Programmation"
  - "Tutoriel"
  - "Avancé"
---

Un **décorateur** est une **fonction qui prend une fonction** (ou une classe) et renvoie un **substitut** en général enrichi d’un comportement transversal : journalisation, mesure du temps, validation des arguments, mise en cache, etc. C’est du **sucre syntaxique** : `@decor` au-dessus de `def f` équivaut à **`f = decor(f)`** (en première approximation). Combiné au module **`functools`**, tu obtiens des patterns **réutilisables** sans copier-coller.

## 1. Fermetures (closures)

Une fonction interne peut **capturer** des variables de la portée englobante : c’est une **fermeture**. Utile pour **paramétrer** un décorateur (`def decorateur(prefixe): ... def wrapper(f): ...`).

## 2. Premier décorateur manuel

```python
def tracer(f):
    def wrapper(*args, **kwargs):
        print("appel", f.__name__)
        return f(*args, **kwargs)
    return wrapper

@tracer
def add(a, b):
    return a + b
```

Sans `@`, on écrirait **`add = tracer(add)`**.

## 3. `functools.wraps`

Le **`wrapper`** remplace `f` et **perd** souvent `__name__`, `__doc__`, les annotations. **`@functools.wraps(f)`** sur le `def wrapper` **recopie** ces métadonnées — indispensable pour l’**introspection** et la **doc** des outils.

## 4. `functools.partial`

**`partial(func, *args, **kwargs)`** « fige » une partie des arguments pour créer une **nouvelle fonction** callable avec les arguments restants — pratique pour adapter une API à un callback.

```python
from functools import partial
basetwo = partial(int, base=2)
basetwo("10010")  # 18
```

## 5. `functools.lru_cache`

**`@lru_cache(maxsize=128)`** mémorise les résultats d’une fonction **pure** (mêmes entrées → même sortie) pour éviter de recalculer. Utile pour la **récursion** type Fibonacci ou parsers coûteux — attention à la **mémoire** et aux arguments **non hachables**.

## Ressources externes

- **[PEP 318 — Decorators for Functions and Methods](https://peps.python.org/pep-0318/)**
- **[functools](https://docs.python.org/fr/3/library/functools.html)** (FR)

## Exercices (20)

### Niveau simple

**Exercice 1** — Réécris **`@tracer`** sans `@` : assigne **`add = tracer(add)`** après **`def add`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def tracer(f):
    def wrapper(*a, **k):
        print("appel", f.__name__)
        return f(*a, **k)
    return wrapper

def add(a, b):
    return a + b

add = tracer(add)</code></pre>
</div>
</details>

**Exercice 2** — Importe **`wraps`** et décore le **`wrapper`** pour préserver **`__name__`** de **`f`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from functools import wraps

def tracer(f):
    @wraps(f)
    def wrapper(*a, **k):
        print("appel", f.__name__)
        return f(*a, **k)
    return wrapper</code></pre>
</div>
</details>

**Exercice 3** — Utilise **`partial`** pour créer **`mul3 = partial(operator.mul, 3)`** (importe **`operator`**). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import operator
from functools import partial
mul3 = partial(operator.mul, 3)
print(mul3(4))</code></pre>
</div>
</details>

**Exercice 4** — Applique **`@lru_cache`** à une fonction **`fib(n)`** récursive naïve et compare le temps sur **`n=35`** (indication : sans cache, très lent). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(35))</code></pre>
</div>
</details>

**Exercice 5** — Que se passe-t-il si tu empiles **`@a`** puis **`@b`** au-dessus de **`def f`** ? (ordre d’application). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># @a @b def f → f = a(b(f)) : b appliqué en premier, puis a.</code></pre>
</div>
</details>

**Exercice 6** — Décorateur **`retry(n)`** (paramétré) qui réessaie **`n`** fois si une exception **`Exception`** est levée — squelette accepté. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from functools import wraps

def retry(n):
    def deco(f):
        @wraps(f)
        def wrapper(*a, **k):
            for _ in range(n):
                try:
                    return f(*a, **k)
                except Exception:
                    pass
            return f(*a, **k)
        return wrapper
    return deco</code></pre>
</div>
</details>

**Exercice 7** — **`lru_cache`** : pourquoi les arguments doivent-ils être **hachables** ? <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Le cache utilise un dict interne ; clés = tuples d'arguments, doivent être hachables.</code></pre>
</div>
</details>

### Niveau intermédiaire

**Exercice 8** — Décorateur **`timer`** avec **`time.perf_counter`** affichant la durée d’appel. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import time
from functools import wraps

def timer(f):
    @wraps(f)
    def wrapper(*a, **k):
        t0 = time.perf_counter()
        out = f(*a, **k)
        print(time.perf_counter() - t0)
        return out
    return wrapper</code></pre>
</div>
</details>

**Exercice 9** — Utilise **`partial`** pour lier **`open`** en mode **`"r"`**, **`encoding="utf-8"`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from functools import partial
open_utf8 = partial(open, mode="r", encoding="utf-8")</code></pre>
</div>
</details>

**Exercice 10** — Différence entre **`@staticmethod`** et **`@classmethod`** (rappel) : quand les utiliser dans une classe ? <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># staticmethod : pas de self/cls. classmethod : premier arg = classe ; usine alternative, parseurs.</code></pre>
</div>
</details>

**Exercice 11** — Décorateur de classe minimal qui ajoute un attribut **`_tag = "ok"`** à la classe. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def tag(cls):
    cls._tag = "ok"
    return cls

@tag
class Foo:
    pass</code></pre>
</div>
</details>

**Exercice 12** — Pourquoi **`wrapper(*args, **kwargs)`** plutôt que **`wrapper()`** dans un décorateur générique ? <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Pour transmettre toute signature à la fonction décorée.</code></pre>
</div>
</details>

**Exercice 13** — **`lru_cache(maxsize=2)`** : que se passe-t-il quand un **3e** résultat distinct est demandé (politique d’éviction) ? <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># LRU : la moins récemment utilisée est évincée (approximation selon implémentation).</code></pre>
</div>
</details>

**Exercice 14** — Utilise **`functools.reduce`** pour sommer **`[1,2,3,4]`** avec **`operator.add`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import operator
from functools import reduce
print(reduce(operator.add, [1, 2, 3, 4], 0))</code></pre>
</div>
</details>

### Niveau difficile

**Exercice 15** — Décorateur **`typed`** vérifiant que les arguments positionnels respectent les **annotations** simples (`int`, `str`) — version minimale pour **2** paramètres. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from functools import wraps

def typed(f):
    ann = f.__annotations__
    @wraps(f)
    def wrapper(a, b):
        if not isinstance(a, ann.get("a", type(a))):
            raise TypeError
        if not isinstance(b, ann.get("b", type(b))):
            raise TypeError
        return f(a, b)
    return wrapper</code></pre>
</div>
</details>

**Exercice 16** — Implémente **`singledispatch`** sur le **premier** argument pour **`show(x)`** avec branches **`int`** et **`str`**. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from functools import singledispatch

@singledispatch
def show(x):
    return f"autre {x}"

@show.register
def _(x: int):
    return f"int {x}"

@show.register
def _(x: str):
    return f"str {x}"</code></pre>
</div>
</details>

**Exercice 17** — Problème du décorateur qui **modifie** la signature pour **`help()`** : quel outil **`inspect`** ou bibliothèque tierce aide à préserver une signature affichable ? (réponse en une phrase). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># functools.wraps aide ; pour signatures complexes, inspect.signature ou decorator.wraps (tiers).</code></pre>
</div>
</details>

**Exercice 18** — Cache avec **`cache_clear`** : appelle **`fib.cache_clear()`** après plusieurs **`fib(n)`**. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from functools import lru_cache
@lru_cache(maxsize=None)
def fib(n):
    ...
fib.cache_clear()</code></pre>
</div>
</details>

**Exercice 19** — Décorateur **`once`** qui garantit qu’une fonction sans argument n’est exécutée qu’**une** fois et mémorise le résultat. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def once(f):
    r = []
    @wraps(f)
    def wrapper():
        if not r:
            r.append(f())
        return r[0]
    return wrapper</code></pre>
</div>
</details>

**Exercice 20** — Explique pourquoi décorer une fonction **mutée** à chaud (`f = new_f`) peut casser des références gardées par le décorateur — pattern à éviter. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Le wrapper peut fermer sur l'ancienne fonction ; re-décorer ou importer proprement.</code></pre>
</div>
</details>

## Suite du parcours

[Gestionnaires de contexte et contextlib](/python-av-context-managers/) : `with`, setup/teardown propres.

## Amazon (partenaire)

- [Python design patterns](https://www.amazon.fr/s?k=python+design+patterns+livre&tag=manuso06-21)
