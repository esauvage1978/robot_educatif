---
layout: ../../layouts/EnPost.astro
title: "Python: variables and printing (print)"
description: "Assignment, variable names, print with commas and concatenation, f-strings and expressions. Common pitfalls and exercises with collapsible solutions."
updated: "29 March 2026"
faqSchema:
  - question: "How do you display a variable in Python?"
    answer: "Call print(). A variable stores a value (name = 12). print() sends that value to the console."
  - question: "What is an f-string?"
    answer: "A string prefixed with f. Expressions between { and } are evaluated and inserted into the text. You need Python 3.6 or newer."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

> **Direct answer (October 2026)** — A **variable** stores a value (`name = 12`). You **display** it with `print()`. In Python 3, `input()` always returns a **string** that you convert (`int()`, `float()`) before a calculation.

After you install Python and open an editor ([lesson 1](/en/python-development-environment/)), you move on to the **raw material** of programs: storing information in **variables** and **displaying** it on screen. This lesson deliberately skips `input()`: everything is written **in the code**. Keyboard input arrives in [lesson 3](/en/python-types-and-input/).

![Example output in a Python terminal](/images/blog/lot15/pendu-console-exemple.png)

## 1. What is a variable?

A **variable** is a **name** (you choose it) tied to a **value** in memory. In Python you **assign** with `=`: the value on the right is stored under the name on the left.

```python
score = 0
pseudo = "Nova"
```

You can **read** or **change** the value later by reusing the same name:

```python
score = score + 10
print(score)  # 10
```

Order matters: `10 = score` is an **error** (you cannot assign to a number).

## 2. Naming variables well

Python accepts names made of **letters**, **digits**, and **underscores** `_`, as long as they **do not start with a digit**. Avoid **accented characters** in names (less portable, and sometimes confusing).

**Recommended style**: several words in **snake_case**: `annee_naissance`, `vitesse_max`.

**Do not** reuse a **reserved word** of the language (`if`, `for`, `print`, `True`…). Editors often color them differently: if your name “looks wrong,” change it.

## 3. Display with `print`

`print` sends text (and values) to the **console** — the terminal, or your IDE's output window.

### Several values separated by commas

Python inserts **one space** between each item and adds a **newline** at the end.

```python
nom = "Lina"
print("Hello", nom, "!")   # Hello Lina !
```

### Concatenation with `+` (strings only)

`+` **joins** two strings **with no automatic space**. Put the spaces inside the quotes.

```python
print("Hello " + nom + " !")
```

If you mix a **number** and **text**, `+` raises an error. Use **commas** in `print`, or convert with `str()`:

```python
n = 7
print("The answer is", n)
print("The answer is " + str(n))
```

### `sep` and `end` (optional)

You can change the separator between arguments and what is printed **after** them (the default is a newline).

```python
print("A", "B", "C", sep=" | ")   # A | B | C
print("Continued...", end="")
print(" same line.")
```

## 4. f-strings (Python 3.6+)

An **f-string** is a string prefixed with `f`. **Expressions** between `{` and `}` are **evaluated** and inserted into the text. It is the most readable way to build messages.

```python
nom = "Lina"
age = 12
print(f"{nom} is {age} years old")
print(f"In two years, {age + 2} years old.")
```

You can put **calculations** or short **function calls** inside the braces (do not overdo it if you want the code to stay clear).

**Quotes**: if your f-string uses `"`, you can delimit the string with `'` to avoid clashes, or escape them. For example:

```python
msg = f'He said "OK" to {nom}.'
```

## 5. Common pitfalls

- **`NameError`**: you use a name **before** defining it, or you **mistype** it (`scor` instead of `score`).
- **Forgetting quotes** around text: `nom = Lina` looks for a variable `Lina`, not the first name.
- **`print` without parentheses** in Python 3: write `print(x)`, not `print x`.

**Tip**: add a temporary `print` (`print("here", variable)`) to see where the program is. You will refine that in the **debugging** lesson later in the track.

## 6. Mini walkthrough: from the start to a short summary

The **steps** in this program are the thread for the exercises below: define **text and numeric variables**, compute a **total**, then **display** it with commas and **f-strings**.

```python
# Complete example in a single run
prenom = "Sam"
points = 100
bonus = 25
total = points + bonus

print("Player:", prenom)
print(f"Base score: {points}, bonus: {bonus}")
print(f"Total shown on the leaderboard: {total}")
```

Run the script from your editor or with `python file.py` and check that the three lines appear as expected.

## Exercises (20)

Each exercise is tied to the **ideas** in the lesson (variables, `print`, f-strings, `sep` / `end`, `str()`). **Solutions** are hidden by default: click **Show the solution** to compare your code.

### Easy level

**Exercise 1** — Create a variable `prenom` with a string of your choice, then display it with `print`. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">prenom = "Alex"
print(prenom)</code></pre>
</div>
</details>

**Exercise 2** — Display **two lines**: first `Hello`, then `Python`, with **two** calls to `print`. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">print("Hello")
print("Python")</code></pre>
</div>
</details>

**Exercise 3** — Set `a = 4` and `b = 9`, then display both values **on one line** with **one comma** in `print` (Python will insert a space). <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">a = 4
b = 9
print(a, b)</code></pre>
</div>
</details>

**Exercise 4** — Set `mot = "Hello"` and display `Hello everyone` by **concatenating** with `+` (remember the spaces inside the strings). <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">mot = "Hello"
print(mot + " everyone")</code></pre>
</div>
</details>

**Exercise 5** — Set `largeur = 8` and `hauteur = 3`, compute `aire = largeur * hauteur`, and display `Area:` followed by the value with an **f-string**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">largeur = 8
hauteur = 3
aire = largeur * hauteur
print(f"Area: {aire}")</code></pre>
</div>
</details>

**Exercise 6** — Display the three numbers `10`, `20`, `30` on **one line** with `sep=" → "`. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">print(10, 20, 30, sep=" → ")</code></pre>
</div>
</details>

**Exercise 7** — Set `n = 6` and display a sentence like `Twice 6 is 12` by putting the calculation `n * 2` **inside the braces** of an f-string. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = 6
print(f"Twice {n} is {n * 2}")</code></pre>
</div>
</details>

### Intermediate level

**Exercise 8** — Set `k = 42` and display exactly the string `Answer: 42` using **`+`** and **`str(k)`** (no f-string). <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">k = 42
print("Answer: " + str(k))</code></pre>
</div>
</details>

**Exercise 9** — Display `AB` on **one line** using **two** `print` calls and `end=""` on the first. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">print("A", end="")
print("B")</code></pre>
</div>
</details>

**Exercise 10** — Two grades `note1` and `note2` (integers). Compute the **average** `(note1 + note2) / 2` and display it with an **f-string** (you can leave a `.0` if the result is a whole number). <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">note1 = 14
note2 = 16
moyenne = (note1 + note2) / 2
print(f"Average: {moyenne}")</code></pre>
</div>
</details>

**Exercise 11** — `minutes = 5` and `secondes = 30`: compute the **total number of seconds** in a variable, then display it with an f-string. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">minutes = 5
secondes = 30
total_sec = minutes * 60 + secondes
print(f"Total in seconds: {total_sec}")</code></pre>
</div>
</details>

**Exercise 12** — On **one line**, display `x = 7` and the **double** of `x`, using `print` with **commas** and the **expression** `x * 2` as an argument. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">x = 7
print("x =", x, "double =", x * 2)</code></pre>
</div>
</details>

**Exercise 13** — Set `nom = "Kim"` and display `Kim said "yes"` using an f-string delimited by **single quotes** `'` so you can put `"` inside the text. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">nom = "Kim"
print(f'{nom} said "yes"')</code></pre>
</div>
</details>

**Exercise 14** — Reuse the **structure** of the mini walkthrough (§6) with **other values**: `prenom`, `points`, `bonus`, `total`, then **three** `print` calls as in the example (commas, then two f-strings). <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">prenom = "Noa"
points = 50
bonus = 10
total = points + bonus

print("Player:", prenom)
print(f"Base score: {points}, bonus: {bonus}")
print(f"Total shown on the leaderboard: {total}")</code></pre>
</div>
</details>

### Hard level

**Exercise 15** — Multiple assignment: `a, b, c = 2, 3, 5`. Compute `somme = a + b + c` and display `Sum: 10` with an f-string. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">a, b, c = 2, 3, 5
somme = a + b + c
print(f"Sum: {somme}")</code></pre>
</div>
</details>

**Exercise 16** — `age = 11`: compute `annee_naissance = 2026 - age` and display a sentence like `Born around 2015` with an f-string (use “about” if you prefer). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">age = 11
annee_naissance = 2026 - age
print(f"Born around {annee_naissance}")</code></pre>
</div>
</details>

**Exercise 17** — Set `x = 3` and `y = 4`, then display `Expression: (3+4)*2 = 14` using **only** f-strings and the variables (do not put the literals 3 and 4 in the message if you can take everything from `x` and `y`). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">x = 3
y = 4
print(f"Expression: ({x}+{y})*2 = {(x + y) * 2}")</code></pre>
</div>
</details>

**Exercise 18** — `score = 1200` and `niveau = 5`: display **two lines** with two f-strings, one for `Score: …`, one for `Level: …`. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">score = 1200
niveau = 5
print(f"Score: {score}")
print(f"Level: {niveau}")</code></pre>
</div>
</details>

**Exercise 19** — Display `1|2|3` and then, **on the next line**, `End`, in **two** `print` calls: the first uses `sep="|"` (a newline follows by default); the second displays `End`. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">print(1, 2, 3, sep="|")
print("End")</code></pre>
</div>
</details>

**Exercise 20** — Set `prix_unitaire = 3` and `quantite = 7`, compute `total = prix_unitaire * quantite`, then display **three** lines: one with **commas** (`Item`, quantity), one f-string for the **line total**, one f-string for a message like `Demo total: …` reusing `total`. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">prix_unitaire = 3
quantite = 7
total = prix_unitaire * quantite

print("Item", "tickets", "x", quantite)
print(f"Unit price × quantity = {prix_unitaire} × {quantite}")
print(f"Demo total: {total}")</code></pre>
</div>
</details>

## What comes next

[Lesson 3](/en/python-types-and-input/) introduces **types** (`int`, `float`, `str`…) and input with **`input()`**: you can then tailor what you display to what the user types.

## On Amazon

- An introductory Python book: <a href="https://www.amazon.com/s?k=learn+python+book&tag=roboteducatif-20" class="btn btn-action" rel="nofollow sponsored noopener" target="_blank">Check today's price on Amazon</a>
