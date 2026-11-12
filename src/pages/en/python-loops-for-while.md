---
layout: ../../layouts/EnPost.astro
title: "Python loops: for and while"
description: "range(start, stop, step), walking a string, while with a counter, break and continue, and when to choose for or while. Twenty exercises with solutions."
updated: "29 March 2026"
faqSchema:
  - question: "When should you use for instead of while?"
    answer: "Use for when you know how many turns you need, or when you walk a list or a string. Use while when you stop because an event happens, such as a correct answer."
  - question: "What is the difference between break and continue?"
    answer: "break leaves the loop immediately. continue skips the rest of the current turn and moves on to the next test or the next iteration."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

**Loops** repeat a block of code. After [conditions](/en/python-conditions-if-else/), they are the tool for handling **several** values, **counting**, or **trying again** until you get a good result.

## 1. `for` and `range`

`range(n)` produces the integers **from 0 to n − 1**:

```python
for i in range(5):
    print(i)   # 0 1 2 3 4
```

**Variants**:

- `range(start, stop)`: from `start` inclusive to `stop` **exclusive**.
- `range(start, stop, step)`: with a **step** (positive or negative).

```python
for k in range(2, 8, 2):
    print(k)   # 2 4 6

for j in range(10, 0, -1):
    print(j)   # countdown 10 → 1
```

To print from **1 to 10** inclusive: `range(1, 11)`.

## 2. Walking a string

A string is a sequence of characters. `for lettre in mot:` prints them one by one:

```python
mot = input("A word? ")
for lettre in mot:
    print(lettre)
```

## 3. `while`: “as long as”

The loop **keeps going** while the condition stays true. You must **change** something inside the block, or you get an **infinite** loop (avoid that unless you mean it).

```python
n = 3
while n > 0:
    print(n)
    n -= 1    # same as n = n - 1
print("Liftoff!")
```

## 4. `break` and `continue`

- **`break`**: leaves the loop **immediately** (often with an `if` inside).
- **`continue`**: skips the rest of the **current** turn and goes back to the test / the next iteration.

```python
for i in range(10):
    if i == 3:
        continue
    if i == 7:
        break
    print(i)
```

## 5. `for` or `while`?

- You know **how many** turns you need (or you walk a **list** / a **string**) → usually **`for`**.
- You stop when an **event** happens (a correct answer, a file has been read, and so on) → often **`while`** with a clear condition, or **`while True`** plus **`break`**.

## Exercises (20)

Each exercise uses the **loops** from this lesson (`for`, `range`, `while`, `break`, `continue`). The **solutions** are hidden by default: click **Show the solution** to compare your code.

### Easy

**Exercise 1** — With a `for` over `range(5)`, print the integers **0** through **4** (one per line). <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">for i in range(5):
    print(i)</code></pre>
</div>
</details>

**Exercise 2** — Print the integers from **1** to **10** inclusive with `range` (one per line). <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">for i in range(1, 11):
    print(i)</code></pre>
</div>
</details>

**Exercise 3** — With a `for`, compute the **sum** of the integers from **1** to **20** and print the result (variable `total` starting at `0`). <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">total = 0
for i in range(1, 21):
    total += i
print(total)</code></pre>
</div>
</details>

**Exercise 4** — Walk the string `"code"` with `for lettre in ...` and print each character on its own line. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">for lettre in "code":
    print(lettre)</code></pre>
</div>
</details>

**Exercise 5** — With a `while`, print **3**, **2**, **1**, **0** (one value per line), starting from `n = 3` and counting down until you print **0**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = 3
while n >= 0:
    print(n)
    n -= 1</code></pre>
</div>
</details>

**Exercise 6** — Print the **even integers** from **0** to **10** inclusive using `range` with a **step** of **2**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">for i in range(0, 11, 2):
    print(i)</code></pre>
</div>
</details>

**Exercise 7** — Print the **squares** of the integers **1** through **10** (one line per value: `1`, `4`, `9`, …). <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">for i in range(1, 11):
    print(i * i)</code></pre>
</div>
</details>

### Intermediate

**Exercise 8** — Loop `for i in range(15)`: print `i`, but **`break`** as soon as `i == 6` (you must not print the later values). <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">for i in range(15):
    print(i)
    if i == 6:
        break</code></pre>
</div>
</details>

**Exercise 9** — Print the integers **0** through **9** except **5**: use `continue` to skip that value. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">for i in range(10):
    if i == 5:
        continue
    print(i)</code></pre>
</div>
</details>

**Exercise 10** — Ask for a **sentence** (a string) and count how many times the letter **`e`** or **`E`** appears (a `for` loop over the characters). <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">phrase = input("Sentence? ")
n = 0
for c in phrase:
    if c == "e" or c == "E":
        n += 1
print(n)</code></pre>
</div>
</details>

**Exercise 11** — With a `while`, **ask again** for an integer until it **is** in the range **1** to **10** inclusive; then print `OK:` followed by the value. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = int(input("Number from 1 to 10? "))
while n < 1 or n > 10:
    n = int(input("Again: "))
print("OK:", n)</code></pre>
</div>
</details>

**Exercise 12** — Compute the **sum** of the **multiples of 5** from **5** to **50** inclusive (`5 + 10 + … + 50`) with a `for` loop. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">total = 0
for x in range(5, 51, 5):
    total += x
print(total)</code></pre>
</div>
</details>

**Exercise 13** — Compute **6!** = `1 × 2 × … × 6` with a `for` loop (variable `p` starting at **1**). <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">p = 1
for k in range(1, 7):
    p *= k
print(p)</code></pre>
</div>
</details>

**Exercise 14** — Print a **countdown**: **10**, **8**, **6**, … down to **0** (one number per line) with `range` and a **negative step**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">for x in range(10, -1, -2):
    print(x)</code></pre>
</div>
</details>

### Hard

**Exercise 15** — Print the **multiplication table for 7**: one line per multiplier from **1** to **10** (`7 x 1 = 7`, …). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">for m in range(1, 11):
    print(f"7 x {m} = {7 * m}")</code></pre>
</div>
</details>

**Exercise 16** — A **`while True`** loop: each turn, ask for a word; if the user types **`stop`**, **leave** the loop with `break`; otherwise print `again`. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">while True:
    s = input("Word (stop to finish)? ")
    if s == "stop":
        break
    print("again")</code></pre>
</div>
</details>

**Exercise 17** — Print a **rectangle** of **5** rows and **8** columns of **`#`** characters using **two nested `for` loops** (each row ends with a newline). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">for ligne in range(5):
    for col in range(8):
        print("#", end="")
    print()</code></pre>
</div>
</details>

**Exercise 18** — Ask for a **string** and print its **reversed version** by rebuilding it in a `for` loop (without using `[::-1]` or `reversed`). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">s = input("Text? ")
inv = ""
for c in s:
    inv = c + inv
print(inv)</code></pre>
</div>
</details>

**Exercise 19** — Ask for two positive integers **`x`** and **`n`** and compute **x to the power n** with a loop (without the `**` operator). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">x = int(input("x? "))
n = int(input("n? "))
p = 1
for _ in range(n):
    p *= x
print(p)</code></pre>
</div>
</details>

**Exercise 20** — **Higher or lower**: secret integer **40** in the code; in a **`while`** loop, ask for a guess, print `too low`, `too high`, or `won`, and **stop** when the guess is right. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">secret = 40
while True:
    t = int(input("Guess? "))
    if t < secret:
        print("too low")
    elif t > secret:
        print("too high")
    else:
        print("won")
        break</code></pre>
</div>
</details>

## Next in the course

[Functions](/en/python-functions/) let you **name** a reusable piece of code — for example `afficher_carrés(n)` or `demander_nombre_positif()`.

## Amazon

<a href="https://www.amazon.com/s?k=python+3+exercises+book&tag=roboteducatif-20" class="btn btn-action" rel="nofollow sponsored noopener" target="_blank">Check today's price on Amazon</a>
