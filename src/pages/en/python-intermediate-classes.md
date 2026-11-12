---
layout: ../../layouts/EnPost.astro
title: "Intermediate Python: classes and OOP"
description: "Python classes and OOP: __init__, self, methods, a soft underscore, and CapWords (PEP 8). Dataclasses come later. Twenty exercises with solutions."
updated: "2 November 2026"
faqSchema:
  - question: "What does __init__ do in Python?"
    answer: "Calling Point(3, 4) creates an empty instance, then runs __init__(self, 3, 4) to set attributes on self. __init__ is not a C++ constructor: it does not return the object. It configures the instance that was already allocated."
  - question: "Is self a reserved word?"
    answer: "No. It is the conventional name of the first parameter of an instance method, the instance the call is made on. Everyone uses self so the code stays readable. Without that first parameter, Python would not know which object to work on."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/programmation/python/">Intermediate Python track</a> · Lesson 4 — classes and OOP</nav>

> **Direct answer (November 2026)** — A **class** describes a type of object; **`__init__`** initializes each instance; **methods** take **`self`** as their first argument so they can reach the attributes. Start with a simple class (`Point`, `Compteur`) before **dataclasses**.

This lesson is part of the [intermediate Python track](/programmation/python/) (modules, tests, files). A useful prerequisite: [pathlib](/en/python-pathlib/).

In **object-oriented programming** (**OOP**), a **class** is a **model** (a mold) from which you create **instances**: each instance has its own **state** (attribute values) and shares the **behavior** defined by the **methods**. In Python, everything is an **object** (including functions and modules); OOP is not required for every script, but it clarifies large programs: **group** what belongs together, **name** the responsibilities, and **reuse** abstractions (inheritance, composition — outside the minimum scope of this lesson).

Python favors **simplicity**: there is no strict `private` / `public` visibility as in Java; you rely on **conventions** (a `_` prefix) and on team **discipline**. **Dataclasses** (`@dataclass`) from the **`dataclasses`** module cut repetitive code for simple "data containers" — look at them once **`__init__`** is well understood.

## 1. Define a class and the `__init__` initializer

The call **`Point(3, 4)`** first creates an **empty instance**, then invokes **`__init__(self, 3, 4)`** to **set the attributes** on `self` (the instance being built).

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

p = Point(3, 4)
print(p.x, p.y)
```

**`__init__`** is not a **constructor** in the C++ sense: it does not "return" the object; it **configures** the instance that was already allocated. Other special methods (`__new__`) exist for advanced cases.

## 2. Instance methods and `self`

**Methods** defined in the class take **`self`** as their **first parameter**: it is the reference to the **instance** that calls the method (`p.norme()` passes `p` as `self`). Without `self`, Python would not know **which** object to work on.

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def norme(self):
        return (self.x ** 2 + self.y ** 2) ** 0.5
```

**PEP 8**: **class names** use **`CapWords`** (`MaClasse`); **functions and variables** stay in **`snake_case`**. That separates **types** and **values** at a glance.

## 3. `__str__` and readability

By default, `print(p)` shows a form that is hard to read. **`__str__`** returns a **string** meant for the user; **`__repr__`** aims instead at an **unambiguous** representation for debugging (often `FieldNames(...)`). For a first approach, **`__str__`** is enough to make objects **printable** — define it **inside** the class, at the same level as the other methods:

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"Point({self.x}, {self.y})"
```

## 4. "Soft" encapsulation: the `_` prefix

Python does not stop you from reading an "internal" attribute from outside. The convention **`_name`** or **`__name`** (light name mangling for subclasses) signals: **"internal API, do not depend on it from third-party code."** It is a documented **contract**, not cryptographic security.

## External resources

- **[Classes — official tutorial](https://docs.python.org/3/tutorial/classes.html)**: syntax, scope, first objects.
- **[Data model](https://docs.python.org/3/reference/datamodel.html)**: special methods (`__init__`, `__str__`, and so on).
- **[dataclasses — documentation](https://docs.python.org/3/library/dataclasses.html)**: when to generate `__init__` automatically.

## Exercises (20)

The exercises strengthen **`self`**, attributes and methods. The **solutions** are hidden by default.

### Easy

**Exercise 1** — Class **`Compteur`** with **`total = 0`** in **`__init__`** and a method **`plus_un`** that increments **`total`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class Compteur:
    def __init__(self):
        self.total = 0

    def plus_un(self):
        self.total += 1</code></pre>
</div>
</details>

**Exercise 2** — Class **`Personne`** with attributes **`nom`** and **`age`** passed to the initializer. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class Personne:
    def __init__(self, nom, age):
        self.nom = nom
        self.age = age</code></pre>
</div>
</details>

**Exercise 3** — Method **`presenter(self)`** that prints **`I am {nom}`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class Personne:
    def __init__(self, nom):
        self.nom = nom

    def presenter(self):
        print(f"I am {self.nom}")</code></pre>
</div>
</details>

**Exercise 4** — Create **`Rectangle`** with **`largeur`**, **`hauteur`** and a method **`aire(self)`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class Rectangle:
    def __init__(self, largeur, hauteur):
        self.largeur = largeur
        self.hauteur = hauteur

    def aire(self):
        return self.largeur * self.hauteur</code></pre>
</div>
</details>

**Exercise 5** — Implement **`__str__`** on **`Point`** so it displays **`(x, y)`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"({self.x}, {self.y})"</code></pre>
</div>
</details>

**Exercise 6** — A **class** attribute **`nb = 0`** incremented on every **`__init__`** of **`Jeton`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class Jeton:
    nb = 0

    def __init__(self):
        Jeton.nb += 1</code></pre>
</div>
</details>

**Exercise 7** — Method **`deplacer(self, dx, dy)`** on **`Point`** that changes **`x`** and **`y`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def deplacer(self, dx, dy):
        self.x += dx
        self.y += dy</code></pre>
</div>
</details>

### Intermediate

**Exercise 8** — Class **`Banque`** with an initial balance; methods **`depot(montant)`** and **`retrait(montant)`** that refuse the withdrawal when the balance is too low (**`return False`**). <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class Banque:
    def __init__(self, solde=0):
        self.solde = solde

    def depot(self, m):
        self.solde += m

    def retrait(self, m):
        if m > self.solde:
            return False
        self.solde -= m
        return True</code></pre>
</div>
</details>

**Exercise 9** — Optional **`@property`**: turn **`solde`** into read-only access through **`@property`** (a getter with no setter). <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class Compte:
    def __init__(self, solde):
        self._solde = solde

    @property
    def solde(self):
        return self._solde</code></pre>
</div>
</details>

**Exercise 10** — Override **`__eq__`** to compare two **`Point`** objects by their coordinates. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y</code></pre>
</div>
</details>

**Exercise 11** — Simple inheritance: **`Chien(Animal)`** with **`crier`** returning **`"woof"`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class Animal:
    pass

class Chien(Animal):
    def crier(self):
        return "woof"</code></pre>
</div>
</details>

**Exercise 12** — **`super().__init__(...)`** in a subclass that adds a parameter. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class A:
    def __init__(self, x):
        self.x = x

class B(A):
    def __init__(self, x, y):
        super().__init__(x)
        self.y = y</code></pre>
</div>
</details>

**Exercise 13** — Good practice: why is **`self`** not a reserved word but a convention? <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># It is the first parameter of instance methods; everyone uses self for readability.</code></pre>
</div>
</details>

**Exercise 14** — A **`classmethod`** **`from_string(cls, s)`** that parses **`"3,4"`** into a **`Point`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    @classmethod
    def from_string(cls, s):
        a, b = s.split(",")
        return cls(int(a), int(b))</code></pre>
</div>
</details>

### Hard

**Exercise 15** — A dataclass (**`from dataclasses import dataclass`**) for **`Carte(valeur, couleur)`** with an automatic **`__repr__`**. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from dataclasses import dataclass

@dataclass
class Carte:
    valeur: str
    couleur: str</code></pre>
</div>
</details>

**Exercise 16** — **`__slots__`**: explain in one sentence what it is for (memory, fixed attributes). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Limits instance attributes and cuts memory per object.</code></pre>
</div>
</details>

**Exercise 17** — Implement a small **`Stack`** with **`push`**, **`pop`** and **`vide`** (internal list **`_items`**). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class Stack:
    def __init__(self):
        self._items = []

    def push(self, x):
        self._items.append(x)

    def pop(self):
        return self._items.pop()

    def vide(self):
        return len(self._items) == 0</code></pre>
</div>
</details>

**Exercise 18** — Anti-pattern: inherit from **`list`** to add methods — name one risk (short answer). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Exposes the whole list API; prefer composition (an internal list attribute).</code></pre>
</div>
</details>

**Exercise 19** — Special method **`__len__(self)`** so that **`len(obj)`** works on a homemade collection. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class Paquet:
    def __init__(self, items):
        self._items = items

    def __len__(self):
        return len(self._items)</code></pre>
</div>
</details>

**Exercise 20** — Document a class with a multi-line **docstring** (**summary** + **Attributes**). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class Boite:
    """Small named container.

    Attributes:
        nom: str -- name you can display
    """
    def __init__(self, nom):
        self.nom = nom</code></pre>
</div>
</details>

## Next in the track

[Tests and quality](/en/python-intermediate-tests/): automate checks with **`pytest`** or **`unittest`**.

## Amazon (affiliate)

Object-oriented Python books: [Check today's price on Amazon.](https://www.amazon.com/s?k=python+object-oriented+programming+book&tag=roboteducatif-20)
