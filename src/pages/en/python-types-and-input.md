---
layout: ../../layouts/EnPost.astro
title: "Python 3 input: types and asking for a value (lesson 3)"
description: "Python input and types: int, float, str, bool, conversions, strip(). 20 exercises with solutions for asking a value from the keyboard."
updated: "31 October 2026"
faqSchema:
  - question: "How do I ask for a value in Python 3?"
    answer: "Use input(\"message\"). It always returns a string (str). Convert with int() or float() when you need to calculate."
  - question: "Why does input() return text instead of a number?"
    answer: "Because the keyboard sends characters. \"12\" is text; int(\"12\") gives the number 12 for arithmetic."
---

You already know how to display variables ([lesson 2 — variables and printing](/python-variables-affichage/)). Here the program **reacts** to what the user types. In **Python 3**, everything goes through **`input()`**: it **asks for a value**, waits for Enter, and **always** returns a text string (`str`). Converting cleanly to `int` or `float` is essential before [conditions](/python-conditions-if-else/) and projects such as [higher or lower](/en/python-mini-terminal-game/).

**Lesson 3** of the Python track. No robot needed: a terminal or editor console is enough.

![Console showing input() returning str, then int() for calculation](/images/lot2/python-input-console.webp)

*Console session: `input()` returns a text string, then `int()` converts it so the program can calculate.*

## 1. The most useful types at the start

Quick glossary: **`str`** = text string; **`int`** = whole number; **`float`** = decimal number; **`bool`** = `True` / `False`.

Python handles values of different **types**. The first four to master:

| Type    | Short role              | Examples        |
|---------|-------------------------|-----------------|
| `int`   | integer (whole number)  | `42`, `-3`, `0` |
| `float` | decimal number          | `3.14`, `2.0`   |
| `str`   | text string             | `"hello"`, `'x'` |
| `bool`  | true / false            | `True`, `False` |

To **inspect** the type while learning:

```python
x = 10
y = "10"
print(type(x), type(y))  # <class 'int'> <class 'str'>
```

## 2. Explicit conversions

- **`int("42")`** → `42`. Fails on `"3.5"` or `"twelve"` → **`ValueError`**.
- **`float("3.5")`** or **`float("2")`** → decimal number.
- **`str(2026)`** → `"2026"` (to concatenate or build a message).

Practical rule: as soon as you want to **calculate** from keyboard input, convert after `input()`.

## 3. `input()`: always text

```python
answer = input("An integer? ")
n = int(answer)
print(f"The next one is {n + 1}")
```

Leading/trailing spaces are often annoying. Many scripts start with:

```python
text = input("City? ").strip()
```

`strip()` removes spaces (and invisible newlines) at the start and end of the string.

## 4. `bool` and comparisons (preview)

Comparisons (`==`, `<`, …) already produce a boolean. You can also write `bool(0)` → `False`, `bool(1)` → `True` (details come with practice of `if`).

## 5. Classic pitfall: mixing text and maths

`"3" + "5"` gives `"35"`. For a sum:

```python
a = int(input("First number? "))
b = int(input("Second number? "))
print(a + b)
```

If the user enters `3.5` when you expected an `int`, **`int()`** raises an error: [lesson 9 — errors and debugging](/python-erreurs-debogage/) shows how to handle that with `try` / `except`.

## Exercises (20)

Exercises assume you **run the script** and type the requested values in the console. **Solutions** are hidden by default: open **Show the solution** to compare.

### Easy level

**Exercise 1** — Print with `print` the results of `type(7)` and `type("7")` (two values on one line or two `print`s). <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">print(type(7), type("7"))</code></pre>
</div>
</details>

**Exercise 2** — Ask for text with `input("Your first name? ")` (no conversion), store in `name`, then print `Hello` followed by a comma and `name` with **a single** `print` and commas. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">name = input("Your first name? ")
print("Hello,", name)</code></pre>
</div>
</details>

**Exercise 3** — Ask for a sentence with `input()`, chain `.strip()` on the same line as `input`, print the cleaned string between quotes in a message like `You wrote: ...`. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">sentence = input("A sentence: ").strip()
print(f"You wrote: {sentence}")</code></pre>
</div>
</details>

**Exercise 4** — Create a variable `s = "15"`, convert to integer with `int(s)`, print the result and its `type(...)`. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">s = "15"
n = int(s)
print(n, type(n))</code></pre>
</div>
</details>

**Exercise 5** — Create `t = "2.5"`, convert to `float`, print the value multiplied by `2` (no f-string: a single `print` with a comma is enough). <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">t = "2.5"
x = float(t)
print(x * 2)</code></pre>
</div>
</details>

**Exercise 6** — With `n = 2026`, print the string `"Year: "` followed by `str(n)` using **concatenation** with `+`. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = 2026
print("Year: " + str(n))</code></pre>
</div>
</details>

**Exercise 7** — Ask for **two** strings with two `input()` calls (`word1`, `word2`) and print their **direct concatenation** (no space), to show the trap `"3"` + `"5"` → `"35"`. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">word1 = input("First word: ")
word2 = input("Second word: ")
print(word1 + word2)</code></pre>
</div>
</details>

### Intermediate level

**Exercise 8** — Ask for an **integer** with `input`, convert with `int`, print `The next one is` followed by `n + 1` (f-string). <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = int(input("An integer? "))
print(f"The next one is {n + 1}")</code></pre>
</div>
</details>

**Exercise 9** — Ask for a **decimal** number (`float`), print its **double** with an f-string. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">x = float(input("A decimal number? "))
print(f"Double: {x * 2}")</code></pre>
</div>
</details>

**Exercise 10** — Ask for **two integers**, print their **sum** and their **product** on **two lines** (two `print`s or two f-strings). <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">a = int(input("First integer? "))
b = int(input("Second integer? "))
print(f"Sum: {a + b}")
print(f"Product: {a * b}")</code></pre>
</div>
</details>

**Exercise 11** — Ask for a **first name** (string) and an **age** (`int`), then print `… is … years old` with an f-string. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">name = input("First name? ")
age = int(input("Age? "))
print(f"{name} is {age} years old")</code></pre>
</div>
</details>

**Exercise 12** — Ask for a temperature in **°C** as `float`, compute **°F** with `f = c * 9 / 5 + 32` and print the result rounded to **1** decimal with `round(f, 1)` in the message. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">c = float(input("Temperature °C? "))
f = c * 9 / 5 + 32
print(f"In °F: {round(f, 1)}")</code></pre>
</div>
</details>

**Exercise 13** — Ask for a string (do not convert to a number), print its **length** with `len(...)`. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">text = input("A word or sentence: ")
print(len(text))</code></pre>
</div>
</details>

**Exercise 14** — Read a string that represents a decimal (e.g. `"12.5"`) in the code (`s = "12.5"`), convert to `float`, print **three times** the value. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">s = "12.5"
x = float(s)
print(x * 3)</code></pre>
</div>
</details>

### Hard level

**Exercise 15** — Ask for **three integers** in a row, compute the **sum** and the **average** `(a+b+c)/3`, print both with f-strings (the average may show decimals). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">a = int(input("a? "))
b = int(input("b? "))
c = int(input("c? "))
total = a + b + c
average = total / 3
print(f"Sum: {total}")
print(f"Average: {average}")</code></pre>
</div>
</details>

**Exercise 16** — Ask for a `float`, then print the value **rounded to 2 decimals** using `round(x, 2)` **inside** an f-string. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">x = float(input("Number? "))
print(f"Rounded value (2 dec.): {round(x, 2)}")</code></pre>
</div>
</details>

**Exercise 17** — Ask for a string, apply `.strip()`, convert to `int`, then print the **square** `n * n` with an f-string. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = int(input("An integer (spaces allowed): ").strip())
print(f"Square: {n * n}")</code></pre>
</div>
</details>

**Exercise 18** — Ask for **two** numbers as `float`, compute and print the **average** `(a+b)/2` with a clear message. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">a = float(input("First number? "))
b = float(input("Second number? "))
m = (a + b) / 2
print(f"Average: {m}")</code></pre>
</div>
</details>

**Exercise 19** — Ask for a **year of birth** and the **current year** as integers (`int`), compute an approximate **age** `current - birth` and print it (without handling the calendar day: deliberately simplified). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">birth = int(input("Year of birth? "))
current = int(input("Current year? "))
age = current - birth
print(f"Approximate age: {age} years")</code></pre>
</div>
</details>

**Exercise 20** — Chain: `input` of the **first name** with `.strip()`, `input` of a **height** in metres as `float`, then an **f-string** on **one line** like `Paul is about 1.72 m tall` (adapt with your variables). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">name = input("First name? ").strip()
height = float(input("Height in m? "))
print(f"{name} is about {height} m tall")</code></pre>
</div>
</details>

## Next in the track

| Step | Link |
|------|------|
| **Next theory (conditions)** | [Lesson 4 — conditions and if/else](/python-conditions-if-else/) — uses these conversions to test values (even / odd, menus, grades) |
| **Next practice** | [Python mini-project: higher or lower](/en/python-mini-terminal-game/) — apply `input`, `int`, loops and comparisons |
| **Files** | [Python pathlib: paths and files](/en/python-pathlib/) — read and write text once you master conversions |

## Amazon (affiliate)

- [Python exercises and problems — Amazon UK](https://www.amazon.co.uk/s?k=python+exercises+book&tag=roboteducatif-21) · [Amazon.com](https://www.amazon.com/s?k=python+exercises+book&tag=roboteducatif-20) — check today’s price on the listing.
