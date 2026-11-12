---
layout: ../../layouts/EnPost.astro
title: "Python functions: def, return, and parameters"
description: "Define Python functions with def, return, parameters, and local scope. Twenty corrected exercises so you can write your first useful subprograms."
updated: "29 March 2026"
faqSchema:
  - question: "What does return do in a Python function?"
    answer: "return sends a value back to the caller. If you do not write a return, Python gives back None, which means there is no useful result."
  - question: "Where can a variable created inside a function be used?"
    answer: "A name created inside a function is local, so you mainly see it inside that function. Pass arguments in and return a result rather than using global at the start."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

A **function** groups statements under a **name**. You **call** it when you need it, with **arguments** if necessary. That is how you stop **copying and pasting** the same code, and how you test small pieces on their own.

## 1. A minimal definition with `return`

```python
def carre(x):
    return x * x

print(carre(5))   # 25
```

- **`def`** followed by the name and parentheses (parameters).
- A colon **`:`** and an **indented** body.
- **`return`** sends a value back to the caller. With no explicit `return`, Python returns **`None`** (“nothing”).

```python
def dire_bonjour():
    print("Hello!")

dire_bonjour()   # prints only; it does not return a useful value for a calculation
```

## 2. Several parameters

```python
def hypotenuse(a, b):
    return (a * a + b * b) ** 0.5

print(hypotenuse(3, 4))   # 5.0
```

The order of the arguments in the call matches the order in the definition.

## 3. Default parameters

Useful when you want a **usual value** and still want to be able to change it:

```python
def saluer(nom, titre="Mr."):
    print(f"Hello {titre} {nom}")

saluer("Dupont")
saluer("Martin", "Ms.")
```

Parameters **with** a default must come **after** parameters **without** a default in the definition.

## 4. Variable scope (the simple idea)

A variable **created inside** a function is mainly visible **inside** that function (it is **local**). A variable defined **at file level** can be **read** inside a function, but changing it properly needs the `global` keyword (leave that out of a beginner course: avoid it at first and pass **arguments** and a **return** instead).

## 5. Document in one line (a good habit)

```python
def aire_rectangle(largeur, hauteur):
    """Return the area of a rectangle."""
    return largeur * hauteur
```

A short **docstring** helps your future self (and the teachers who read your code).

## Exercises (20)

Each exercise uses the **functions** from this lesson (`def`, `return`, parameters, defaults). The **solutions** are hidden by default: click **Show the solution** to compare your code.

### Easy

**Exercise 1** — Write **`carre(x)`** so that it **returns** the square of **`x`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def carre(x):
    return x * x</code></pre>
</div>
</details>

**Exercise 2** — Write **`aire_rectangle(largeur, hauteur)`** so that it **returns** the area (the product of the two arguments). <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def aire_rectangle(largeur, hauteur):
    return largeur * hauteur</code></pre>
</div>
</details>

**Exercise 3** — Write **`est_pair(n)`** so that it returns **`True`** if **`n`** is even, otherwise **`False`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def est_pair(n):
    return n % 2 == 0</code></pre>
</div>
</details>

**Exercise 4** — Write **`minimum(a, b)`** so that it returns the smaller of the two, **without** using **`min()`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def minimum(a, b):
    if a <= b:
        return a
    return b</code></pre>
</div>
</details>

**Exercise 5** — Write **`perimetre_rectangle(largeur, hauteur)`** so that it returns the **perimeter** `2 * (largeur + hauteur)`. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def perimetre_rectangle(largeur, hauteur):
    return 2 * (largeur + hauteur)</code></pre>
</div>
</details>

**Exercise 6** — Write **`distance(x1, y1, x2, y2)`** so that it returns the **Euclidean distance** between the points `(x1, y1)` and `(x2, y2)` (the square root of the sum of the squares of the differences). <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def distance(x1, y1, x2, y2):
    dx = x2 - x1
    dy = y2 - y1
    return (dx * dx + dy * dy) ** 0.5</code></pre>
</div>
</details>

**Exercise 7** — Write **`dire_bonjour()`** with no parameter: it only **prints** the string `Hello!` (no useful `return`). <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def dire_bonjour():
    print("Hello!")</code></pre>
</div>
</details>

### Intermediate

**Exercise 8** — Write **`valeur_absolue(x)`** so that it returns **`x`** if **`x >= 0`**, otherwise **`-x`**, **without** using **`abs()`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def valeur_absolue(x):
    if x >= 0:
        return x
    return -x</code></pre>
</div>
</details>

**Exercise 9** — Write **`saluer(nom, titre="Mr.")`**: print a sentence such as `Hello Mr. Dupont` with an **`f`** string and parameters (**`titre`** defaults to **`Mr.`**). <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def saluer(nom, titre="Mr."):
    print(f"Hello {titre} {nom}")</code></pre>
</div>
</details>

**Exercise 10** — Write **`repeter(texte, fois=3)`** so that it prints **`texte`** exactly **`fois`** times, one line per print, with a **`for`** loop. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def repeter(texte, fois=3):
    for _ in range(fois):
        print(texte)</code></pre>
</div>
</details>

**Exercise 11** — Write **`est_divisible(a, b)`** so that it returns **`True`** if **`a`** is divisible by **`b`** (**`b`** is not zero; you can assume **`b != 0`**). <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def est_divisible(a, b):
    return a % b == 0</code></pre>
</div>
</details>

**Exercise 12** — Write **`signe(n)`** so that it returns **`1`** if **`n > 0`**, **`-1`** if **`n < 0`**, and **`0`** if **`n == 0`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def signe(n):
    if n > 0:
        return 1
    if n < 0:
        return -1
    return 0</code></pre>
</div>
</details>

**Exercise 13** — Write **`moyenne(a, b)`** so that it returns the arithmetic mean **`(a + b) / 2`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def moyenne(a, b):
    return (a + b) / 2</code></pre>
</div>
</details>

**Exercise 14** — Write **`aire_disque(rayon)`** so that it returns **`π × rayon²`**, taking **`π = 3.14`** (no `import` needed). <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def aire_disque(rayon):
    pi = 3.14
    return pi * rayon * rayon</code></pre>
</div>
</details>

### Hard

**Exercise 15** — Write **`maximum3(a, b, c)`** so that it returns the **largest** of the three integers, **without** using **`max()`**. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
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

**Exercise 16** — Write **`factorielle(n)`** for an integer **`n ≥ 0`**: return **`1 × 2 × … × n`** (by convention **`factorielle(0) == 1`**). Use a loop inside the function. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def factorielle(n):
    p = 1
    for k in range(1, n + 1):
        p *= k
    return p</code></pre>
</div>
</details>

**Exercise 17** — Write **`compter_voyelles(texte)`** so that it returns the number of vowels **`a, e, i, o, u`** in **lowercase** inside **`texte`** (walk character by character; you can test **`c.lower()`**). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
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

**Exercise 18** — Write **`est_palindrome(mot)`** so that it returns **`True`** if the string reads the same **backward** (you can compare with **`mot == mot[::-1]`**). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def est_palindrome(mot):
    return mot == mot[::-1]</code></pre>
</div>
</details>

**Exercise 19** — Write **`puissance(x, n)`** for an integer **`n` ≥ 0**, so that it returns **`x` to the power `n`** with a loop (**without** using `**`). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def puissance(x, n):
    p = 1
    for _ in range(n):
        p *= x
    return p</code></pre>
</div>
</details>

**Exercise 20** — Write **`mention(note)`** for an integer **`note`** out of **20**: return **`"fail"`** if the grade is **below 10**; **`"pass"`** for **10 through 13** inclusive; **`"good"`** for **14 through 15** inclusive; **`"very good"`** for **16 through 20** inclusive. If the grade is **outside 0 to 20**, return **`"invalid"`**. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def mention(note):
    if note < 0 or note > 20:
        return "invalid"
    if note < 10:
        return "fail"
    if note < 14:
        return "pass"
    if note < 16:
        return "good"
    return "very good"</code></pre>
</div>
</details>

## Next in the course

[Lists and strings](/en/python-lists-and-strings/) give you data structures to pass between functions (lists of scores, cleaning up text, and so on).

## Amazon

<a href="https://www.amazon.com/s?k=python+structured+programming+book&tag=roboteducatif-20" class="btn btn-action" rel="nofollow sponsored noopener" target="_blank">Check today's price on Amazon</a>
