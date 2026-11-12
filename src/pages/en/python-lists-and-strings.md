---
layout: ../../layouts/EnPost.astro
title: "Python: lists and strings"
description: "Python lists and strings: indexes, slices, common methods, split and join. Twenty corrected exercises for working with text one step at a time."
updated: "2 November 2026"
faqSchema:
  - question: "What is the difference between liste[i:j] and liste[i:j:k]?"
    answer: "Both forms are slices. i:j runs from index i inclusive to j exclusive. The third number k is the step: [::-1] reverses the order, which is handy for palindromes (exercise 20)."
  - question: "Why does split(\",\") fail on my CSV?"
    answer: "If a cell contains a comma inside quoted text, a plain split is not enough: you need the csv module (seen later) or stricter rules. For a simple list such as a,b,c, split is the right tool."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

**Lists** group several values in an **order** (often alike: numbers, names…). **Strings** (`str`, short for *string*) are also handled by **indexes** and **slices**, but they are **immutable**: a method such as `lower()` returns a **new** string rather than changing the variable "in place."

> **Python track (7/10)** — [Track contents](/programmation/python/) · [Lesson 6 — functions](/en/python-functions/) · [Lesson 8 — text files](/en/python-text-files/) · [Intermediate Python — venv and pip](/en/python-intermediate-venv-pip/)

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/programmation/python/">Python track</a> · Lists and strings lesson</nav>

**Why this lesson matters**: almost every small game (hangman, scores, nicknames) stores its data in **lists** or **strings**. Knowing how to split a sentence into words (`split`) or join items (`join`) saves you from needlessly complicated loops.

## Before you start: useful reminders

- A **list** is written in square brackets: `[1, 2, 3]`. You can **change** it (`append`, `pop`).
- A **string** is written in quotes: `"Hello"`. You do not change the characters "in place": you **create** a new string (`strip`, `replace`, `lower`).
- The **index** of the first item is **0**; **-1** means the **last** item (true for lists and strings).

## 1. Lists: indexes and slices

The index of the **first** item is **0**. The index **-1** means the **last** item.

```python
scores = [12, 15, 9]
scores.append(18)
print(scores[0])       # 12
print(scores[-1])      # 18
print(scores[1:3])     # [15, 9] — slice: index 1 included, 3 excluded
```

**A few useful methods**: `append(x)`, `pop()` (often removes the last item), `insert(i, x)`, `len(scores)`.

## 2. Walk a list

With a [loop](/en/python-loops-for-while/):

```python
total = 0
for s in scores:
    total += s
print(total)           # or simply sum(scores)
```

## 3. Strings: cleaning and splitting

```python
s = "  Robot  "
print(s.strip().lower())       # "robot"
morceaux = "a,b,c".split(",")  # ['a', 'b', 'c']
print("-".join(morceaux))      # a-b-c
```

**Test for a substring**: `if "bot" in s:`.

## 4. Reverse a string

Two common approaches early in the track:

```python
mot = "Python"
print(mot[::-1])    # slicing: step -1 → reverse order
```

Or a loop that builds the result one character at a time.

## 5. List comprehension (a glimpse)

A compact way to build a list from another sequence:

```python
nombres = [1, 2, 3, 4, 5]
carres = [n * n for n in nombres]
```

You do not have to use it right away; keep the idea for lightening some loops later.

## Exercises (20)

Each exercise uses the **lists** and **strings** from the lesson (indexes, slices, `append`, `split`, `join`, and so on). The **solutions** are hidden by default: click **Show solution** to compare your code.

### Easy

**Exercise 1** — Create **`nombres = [3, 7, 1]`** and print its **length** with **`len`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">nombres = [3, 7, 1]
print(len(nombres))</code></pre>
</div>
</details>

**Exercise 2** — With **`scores = [10, 14, 9]`**, print the **first** and the **last** item (indexes **`0`** and **`-1`**). <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">scores = [10, 14, 9]
print(scores[0])
print(scores[-1])</code></pre>
</div>
</details>

**Exercise 3** — Start from **`xs = [1, 2]`**, add **`5`** at the end with **`append`**, then print the list. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">xs = [1, 2]
xs.append(5)
print(xs)</code></pre>
</div>
</details>

**Exercise 4** — Compute the **sum** of the items in **`[4, 1, 3]`** with a **`for`** loop and a variable **`total`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">total = 0
for x in [4, 1, 3]:
    total += x
print(total)</code></pre>
</div>
</details>

**Exercise 5** — From **`"a,b,c"`**, get a **list** of three strings with **`split(",")`** and print it. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">parts = "a,b,c".split(",")
print(parts)</code></pre>
</div>
</details>

**Exercise 6** — For **`s = "  HELLO  "`**, print the string in **lowercase** with no spaces at the start or the end (**`strip`** and **`lower`**). <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">s = "  HELLO  "
print(s.strip().lower())</code></pre>
</div>
</details>

**Exercise 7** — With **`mots = ["un", "deux", "trois"]`**, print a single line **`un / deux / trois`** using **`join`** with **`" / "`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">mots = ["un", "deux", "trois"]
print(" / ".join(mots))</code></pre>
</div>
</details>

### Intermediate

**Exercise 8** — For **`lettres = ["a", "b", "c", "d", "e"]`**, print the **slice** from index **1** to **3** exclusive (expected result: **`b`** and **`c`**). <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">lettres = ["a", "b", "c", "d", "e"]
print(lettres[1:3])</code></pre>
</div>
</details>

**Exercise 9** — Ask for a **sentence** and print how many times the letter **`a`** appears (lowercase only), with **`.count("a")`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">phrase = input("Sentence? ")
print(phrase.count("a"))</code></pre>
</div>
</details>

**Exercise 10** — Ask for a **string** and print it **reversed** with the **slice** **`[::-1]`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">s = input("Text? ")
print(s[::-1])</code></pre>
</div>
</details>

**Exercise 11** — Create **`nombres = [1, 2, 3, 4, 5]`**, then a new list **`carres`** with a **comprehension**: the square of each **`n`** in **`nombres`**. Print **`carres`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">nombres = [1, 2, 3, 4, 5]
carres = [n * n for n in nombres]
print(carres)</code></pre>
</div>
</details>

**Exercise 12** — Start from **`xs = [10, 20, 30]`**: remove the **last** item with **`pop()`**, print the removed item, then the updated list. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">xs = [10, 20, 30]
dernier = xs.pop()
print(dernier)
print(xs)</code></pre>
</div>
</details>

**Exercise 13** — Insert **`"x"`** at index **0** in **`["a", "b"]`** with **`insert`**, then print the list. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">xs = ["a", "b"]
xs.insert(0, "x")
print(xs)</code></pre>
</div>
</details>

**Exercise 14** — Ask for a **string** `s` and a **word** `m`; print **`yes`** if **`m`** is **contained** in **`s`** (the **`in`** operator), otherwise **`no`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">s = input("Sentence? ")
m = input("Word? ")
if m in s:
    print("yes")
else:
    print("no")</code></pre>
</div>
</details>

### Hard

**Exercise 15** — From **`"pomme,poire,banane"`**, get a **list** of three fruits, then print them again on **one line**, separated by **` | `**, with **`join`**. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">fruits = "pomme,poire,banane".split(",")
print(" | ".join(fruits))</code></pre>
</div>
</details>

**Exercise 16** — List **`notes = [12, 15, 9, 14]`**: compute the **average** (the sum of the items divided by the number of items), as a **`float`**. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">notes = [12, 15, 9, 14]
moyenne = sum(notes) / len(notes)
print(moyenne)</code></pre>
</div>
</details>

**Exercise 17** — Count how many **vowels** (**a, e, i, o, u**, lowercase) appear in an entered string (walk **`for c in texte`** and test **`c.lower()`**). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">texte = input("Text? ")
voy = "aeiou"
n = 0
for c in texte:
    if c.lower() in voy:
        n += 1
print(n)</code></pre>
</div>
</details>

**Exercise 18** — Build a **new list** containing only the **even** numbers from **`[1, 2, 3, 4, 5, 6]`** with a **comprehension** (condition **`n % 2 == 0`**). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">pairs = [n for n in [1, 2, 3, 4, 5, 6] if n % 2 == 0]
print(pairs)</code></pre>
</div>
</details>

**Exercise 19** — Ask for a sentence, split it into **words** with **`split()`** (spaces), and print the **number of words**. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">phrase = input("Sentence? ")
mots = phrase.split()
print(len(mots))</code></pre>
</div>
</details>

**Exercise 20** — Ask for a **string** and say whether it is a **palindrome** (the same reversed), by comparing **`s`** and **`s[::-1]`** (you can lowercase **`s`** to ignore case). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">s = input("Word or sentence? ").strip().lower()
if s == s[::-1]:
    print("palindrome")
else:
    print("no")</code></pre>
</div>
</details>

## Frequently asked questions

**What is the difference between `liste[i:j]` and `liste[i:j:k]`?**  
Both forms are **slices**. `i:j` runs from index `i` **inclusive** to `j` **exclusive**. The third number `k` is the **step**: `[::-1]` reverses the order (very handy for palindromes, exercise 20).

**Why does `split(",")` fail on my CSV?**  
If a cell contains a **comma inside** quoted text, a plain `split` is not enough: you need the **`csv`** module (seen later) or stricter rules. For simple lists (`a,b,c`), `split` is fine.

**A list or a string for storing words?**  
A **list of strings** (`["chat", "chien"]`) lets you change one word without touching the others. One long string is mainly for **display** or **export** (`join`).

**The error `IndexError: list index out of range`?**  
The index you asked for **does not exist** (often `len(liste)` when the last valid index is `len(liste) - 1`). Check with `print(len(scores))` before you read `scores[i]`.

## Next in the track

Reading and writing **text files** ([lesson 8](/en/python-text-files/)) lets you save lists (scores, nicknames) to disk. Next: [errors and debugging](/en/python-errors-and-debugging/) to read the messages when an index or a type is wrong.

## Python resources (affiliate)

- Beginner Python books: [Check today's price on Amazon.](https://www.amazon.com/s?k=learn+python+beginner+book&tag=roboteducatif-20)
- Python exercises and projects: [Check today's price on Amazon.](https://www.amazon.com/s?k=python+exercises+projects+book&tag=roboteducatif-20)
- Python data structures: [Check today's price on Amazon.](https://www.amazon.com/s?k=python+data+structures&tag=roboteducatif-20)
