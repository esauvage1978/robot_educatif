---
title: "Python avancé — typage statique avancé (typing, Protocol)"
headline: "Python avancé — typage statique avancé (typing, Protocol)"
description: "Optional, Union, generics, Protocol, TypedDict, Literal ; mypy en bref ; ressources ; 20 exercices avec solutions repliables."
pubDate: 2026-03-29
updatedDate: 2026-03-29
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Python avancé
seriesOrder: 5
tags: ["Python", "Programmation", "Avancé"]
relatedLinks:
  - title: "Leçon 4 — asyncio"
    href: "/python-av-asyncio/"
  - title: "Leçon 6 — packaging"
    href: "/python-av-packaging-pyproject/"
categories:
  - "Python"
  - "Programmation"
  - "Tutoriel"
  - "Avancé"
---

Python reste **dynamiquement typé** à l’exécution, mais les **annotations** (`def f(x: int) -> str`) permettent des **vérifications statiques** avec **mypy**, **pyright**, **PyCharm**, etc. Au-delà de **`int`** et **`str`**, le module **`typing`** (et depuis 3.9+ souvent les **builtins** en minuscules pour les collections) offre **`Protocol`** (structural subtyping), **génériques** (`TypeVar`), **`TypedDict`** pour JSON structuré, **`Literal`** pour constantes, etc.

## 1. Union et Optional

**`Optional[X]`** équivaut à **`X | None`** (Python 3.10+). **`Union[A, B]`** = **`A | B`**.

## 2. Protocol (duck typing statique)

```python
from typing import Protocol

class Readable(Protocol):
    def read(self, n: int = -1) -> bytes: ...

def consume(r: Readable) -> None:
    r.read(10)
```

Toute classe avec une méthode **`read`** compatible satisfait **`Readable`** **sans héritage explicite**.

## 3. Generics

```python
from typing import TypeVar, Generic

T = TypeVar("T")

class Box(Generic[T]):
    def __init__(self, x: T) -> None:
        self.x = x
```

## 4. TypedDict et Literal

**`TypedDict`** décrit des **dict** avec clés connues (pratique pour JSON). **`Literal["r", "w"]`** restreint à des **valeurs constantes**.

## Ressources externes

- **[typing](https://docs.python.org/fr/3/library/typing.html)** (FR)
- **[mypy](https://mypy.readthedocs.io/)**

## Exercices (20)

### Niveau simple

**Exercice 1** — Annoter **`def add(a: int, b: int) -> int`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def add(a: int, b: int) -> int:
    return a + b</code></pre>
</div>
</details>

**Exercice 2** — Réécris avec **`X | None`** au lieu de **`Optional[X]`** (3.10+). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def f(x: int | None) -> str:
    return str(x)</code></pre>
</div>
</details>

**Exercice 3** — **`list[int]`** vs **`List[int]`** depuis **`typing`** (historique). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># PEP 585 : list[int] natif en 3.9+ ; List[] ancien style pour 3.8.</code></pre>
</div>
</details>

**Exercice 4** — Protocol **`HasName`** avec attribut **`name: str`** (**`@property`** ou champ). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from typing import Protocol

class HasName(Protocol):
    @property
    def name(self) -> str: ...</code></pre>
</div>
</details>

**Exercice 5** — **`Literal[1, 2, 3]`** pour un paramètre **`mode`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from typing import Literal

def set_mode(mode: Literal[1, 2, 3]) -> None:
    pass</code></pre>
</div>
</details>

**Exercice 6** — **`TypedDict`** avec clés **`id`**, **`label`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from typing import TypedDict

class Row(TypedDict):
    id: int
    label: str</code></pre>
</div>
</details>

**Exercice 7** — Pourquoi **`Any`** désactive-t-il en pratique la vérification sur une expression ? <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># any est compatible avec tout ; à utiliser avec parcimonie.</code></pre>
</div>
</details>

### Niveau intermédiaire

**Exercice 8** — Classe générique **`Stack[T]`** avec **`push(self, x: T) -> None`** et **`pop(self) -> T`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from typing import Generic, TypeVar

T = TypeVar("T")

class Stack(Generic[T]):
    def __init__(self) -> None:
        self._d: list[T] = []
    def push(self, x: T) -> None:
        self._d.append(x)
    def pop(self) -> T:
        return self._d.pop()</code></pre>
</div>
</details>

**Exercice 9** — **`TypeVar` borné** `T = TypeVar("T", bound=Readable)` (avec Protocol **`Readable`**). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from typing import Protocol, TypeVar

class Readable(Protocol):
    def read(self, n: int = -1) -> bytes: ...

T = TypeVar("T", bound=Readable)

def load(r: T) -> bytes:
    return r.read()</code></pre>
</div>
</details>

**Exercice 10** — **`overload`** pour **`parse`** acceptant **`str` → `int`** et **`bytes` → `int`** (signature illustrative). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from typing import overload

@overload
def parse(x: str) -> int: ...
@overload
def parse(x: bytes) -> int: ...
def parse(x: str | bytes) -> int:
    return int(x)</code></pre>
</div>
</details>

**Exercice 11** — **`Final`** et **`ClassVar`** : usages. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Final : constante non réassignée ; ClassVar : attribut de classe, pas d'instance.</code></pre>
</div>
</details>

**Exercice 12** — **`Annotated[int, "positive"]`** — rôle (PEP 593). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Métadonnées pour outils tiers ; le type reste int pour le vérificateur.</code></pre>
</div>
</details>

**Exercice 13** — **`cast(T, x)`** : quand l’utiliser ? <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Quand tu sais le type mieux que l'inférence ; à documenter (pas une conversion runtime).</code></pre>
</div>
</details>

**Exercice 14** — **`Required`** / **`NotRequired`** dans **`TypedDict`** (3.11 total). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Clés optionnelles typées explicitement dans TypedDict total=False héritage.</code></pre>
</div>
</details>

### Niveau difficile

**Exercice 15** — **`ParamSpec`** / **`Concatenate`** pour typer un décorateur (schéma). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Préserver *args **kwargs à travers les wrappers (PEP 612).</code></pre>
</div>
</details>

**Exercice 16** — **`TypeGuard`** pour un prédicat **`is_str_list`**. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from typing import TypeGuard

def is_str_list(x: list[object]) -> TypeGuard[list[str]]:
    return all(isinstance(i, str) for i in x)</code></pre>
</div>
</details>

**Exercice 17** — Différence **nominal** vs **structural** en typage — donne un exemple **`Protocol`**. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Nominal : héritage déclaré. Structural : méthodes/attributs compatibles (duck typing statique).</code></pre>
</div>
</details>

**Exercice 18** — Pourquoi **`from __future__ import annotations`** retardait l’évaluation des annotations ? <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Forward references sans quotes ; désormais comportement par défaut en 3.11+ pour stockage.</code></pre>
</div>
</details>

**Exercice 19** — Config **`mypy.ini`** : **`strict = True`** — trade-off. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Plus d'erreurs utiles mais migration coûteuse sur grosses bases legacy.</code></pre>
</div>
</details>

**Exercice 20** — **`@runtime_checkable`** sur **`Protocol`** : utilité et limite. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># isinstance(x, Proto) possible ; vérifie seulement présence des méthodes, pas les signatures.</code></pre>
</div>
</details>

## Suite du parcours

[Packaging et pyproject.toml](/python-av-packaging-pyproject/) : rendre un projet installable.

## Amazon (partenaire)

- [Python typage statique](https://www.amazon.fr/s?k=python+type+hints+livre&tag=manuso06-21)
