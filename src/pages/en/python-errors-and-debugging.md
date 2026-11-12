---
layout: ../../layouts/EnPost.astro
title: "Python: errors, exceptions and debugging"
description: "Python errors: read a traceback, isolate the failing case with try and except, then debug without hiding the cause. Twenty corrected exercises."
updated: "29 March 2026"
faqSchema:
  - question: "Which exception should I catch?"
    answer: "Catch the type you know how to handle, such as ValueError when int() cannot convert the text. Avoid a bare except:, which would hide any error and make debugging harder. You can chain except ValueError: and except ZeroDivisionError: for different messages."
  - question: "How do I read a Python traceback?"
    answer: "Read from the bottom upward. The last line gives the error type and a short text. Just above it, the caret ^ often points at the part of the line that failed. Walk back up to see which file and which function chained the calls."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

A **bug** is unwanted behavior; an **exception** is the mechanism by which Python **stops** a line that fails and shows a **traceback**. Knowing how to **read** that message and **wrap** fragile spots with `try` / `except` makes programs more **robust** — as with missing [files](/en/python-text-files/) or **`int(input())`** receiving invalid text.

## 1. Common errors at the start

| Type | Typical cause |
| --- | --- |
| **SyntaxError** | A missing `:` or parenthesis, or a quote left open |
| **IndentationError** | `if` / `for` blocks misaligned (tabs mixed with spaces) |
| **TypeError** | `"3" + 5`, or a function call with the wrong types |
| **ValueError** | `int("abc")`, or `int("3.5")` when you wanted an integer |
| **NameError** | A variable used before assignment, or a typo |
| **ZeroDivisionError** | Division by zero |

## 2. A targeted `try` / `except`

```python
try:
    x = int(input("Whole number? "))
except ValueError:
    print("That is not a valid integer.")
```

- Catch **the error type** you know how to **handle** (here a bad conversion).
- Avoid a bare **`except:`**: you would hide any error and make debugging harder.

You can chain several blocks, **`except ValueError:`**, **`except ZeroDivisionError:`**, and so on, for different messages.

## 3. `else` and `finally` (optional)

- **`else`** (after `except`): runs if **no** exception was raised in the `try`.
- **`finally`**: **always** runs (often to release a resource; with `with` on files, that is already handled).

```python
try:
    n = int(input("Number? "))
except ValueError:
    print("Invalid.")
else:
    print(f"The double is {2 * n}.")
```

## 4. Read the traceback

When Python crashes, the message is read **from the bottom upward**:

- The **last line** gives the error **type** and a short text.
- Just above, the **caret** `^` often points at the **part** of the line that is wrong.
- Walk back up to see **which file** and **which function** chain the calls.

## 5. Debug without embarrassment

- Temporary **`print()`** calls: show the suspect variables and remove them once the bug is fixed.
- An **IDE** (VS Code, Thonny…): **breakpoints**, **step-by-step** execution, inspection of variables.
- Reproduce the bug with the **smallest** script you can.

## Exercises (20)

The **solutions** are hidden by default: click **Show solution** to compare your code.

### Easy

**Exercise 1** — Wrap **`int(input("Number? "))`** with **`try`** / **`except ValueError`** and print **`That is not an integer.`** if the conversion fails. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">try:
    x = int(input("Number? "))
except ValueError:
    print("That is not an integer.")</code></pre>
</div>
</details>

**Exercise 2** — In a **`try`**, compute **`1 / 0`**; in **`except ZeroDivisionError`**, print **`Division by zero is not allowed.`** <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">try:
    x = 1 / 0
except ZeroDivisionError:
    print("Division by zero is not allowed.")</code></pre>
</div>
</details>

**Exercise 3** — Open **`inexistant.txt`** for reading in a **`try`** and catch **`FileNotFoundError`** to print **`File not found.`** <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">try:
    with open("inexistant.txt", "r", encoding="utf-8") as f:
        f.read()
except FileNotFoundError:
    print("File not found.")</code></pre>
</div>
</details>

**Exercise 4** — Use **`try` / `except ValueError` / `else`**: if the **`int(input())`** conversion succeeds, the **`else`** block prints **`OK:`** followed by the value. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">try:
    n = int(input("Integer? "))
except ValueError:
    print("Invalid.")
else:
    print("OK:", n)</code></pre>
</div>
</details>

**Exercise 5** — **`try`** with **`finally`**: in **`finally`**, always print **`End.`** (even after a **`ValueError`** on **`int("abc")`**). <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">try:
    int("abc")
except ValueError:
    print("Conversion error.")
finally:
    print("End.")</code></pre>
</div>
</details>

**Exercise 6** — A **`while True`** loop: ask for an integer with **`int(input())`**; on **`ValueError`**, print **`Try again.`** and continue; on success, **`break`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">while True:
    try:
        n = int(input("Integer? "))
        break
    except ValueError:
        print("Try again.")</code></pre>
</div>
</details>

**Exercise 7** — Catch **`ValueError`** and **`ZeroDivisionError`** in **two** separate **`except`** blocks after a **`try`** that reads **`a`** and **`b`** with **`int`**, then prints **`a / b`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">try:
    a = int(input("a ? "))
    b = int(input("b ? "))
    print(a / b)
except ValueError:
    print("Invalid number.")
except ZeroDivisionError:
    print("b must not be 0.")</code></pre>
</div>
</details>

### Intermediate

**Exercise 8** — Function **`demander_entier()`**: keep asking while **`int(input())`** raises **`ValueError`**, then return the valid integer. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def demander_entier():
    while True:
        try:
            return int(input("Integer? "))
        except ValueError:
            print("Invalid, try again.")</code></pre>
</div>
</details>

**Exercise 9** — Function **`demander_entier_positif()`**: return an integer **at least equal to 1**; handle **`ValueError`** and the case **0** or **negative** with a message and a new prompt. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def demander_entier_positif():
    while True:
        try:
            n = int(input("Integer of at least 1? "))
        except ValueError:
            print("That is not an integer.")
            continue
        if n < 1:
            print("You need an integer of at least 1.")
            continue
        return n</code></pre>
</div>
</details>

**Exercise 10** — **`try`**: convert **`float(input())`**; **`except ValueError`**: print **`Invalid decimal number.`** <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">try:
    x = float(input("Decimal? "))
except ValueError:
    print("Invalid decimal number.")</code></pre>
</div>
</details>

**Exercise 11** — List **`xs = [10, 20]`**: in a **`try`**, print **`xs[5]`**; catch **`IndexError`** and print **`Index out of range.`** <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">xs = [10, 20]
try:
    print(xs[5])
except IndexError:
    print("Index out of range.")</code></pre>
</div>
</details>

**Exercise 12** — Function **`diviser(a, b)`** that returns **`a / b`**; if **`b == 0`**, the **`ZeroDivisionError`** that is raised will be caught by the caller — write a **`try`** / **`except`** at the call site that prints **`Not possible.`** <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def diviser(a, b):
    return a / b

try:
    print(diviser(3, 0))
except ZeroDivisionError:
    print("Not possible.")</code></pre>
</div>
</details>

**Exercise 13** — Combine **`try`** on **`int(input())`** and an **`if`**: if the integer is **negative**, print **`No negatives`** without crashing (do not raise an exception for that). <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">try:
    n = int(input("Integer? "))
except ValueError:
    print("Not an integer.")
else:
    if n < 0:
        print("No negatives")
    else:
        print("OK:", n)</code></pre>
</div>
</details>

**Exercise 14** — Simulate a **debug**: **`x = 3`** then **`print("debug x =", x)`**, then **`if x > 0:`** and **`print("debug after if", x)`** (two traces, as in the lesson). <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">x = 3
print("debug x =", x)
if x > 0:
    print("debug after if", x)</code></pre>
</div>
</details>

### Hard

**Exercise 15** — Function **`lire_entier_ou_none()`**: return **`int(input())`** or **`None`** on **`ValueError`** (no infinite loop). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def lire_entier_ou_none():
    try:
        return int(input("Integer? "))
    except ValueError:
        return None</code></pre>
</div>
</details>

**Exercise 16** — **`try`** / **`except`** / **`else`** / **`finally`**: in **`try`**, **`int(input())`**; **`except ValueError`**: a message; **`else`**: **`Well done`**; **`finally`**: **`Finished.`** <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">try:
    n = int(input("Integer? "))
except ValueError:
    print("Invalid.")
else:
    print("Well done")
finally:
    print("Finished.")</code></pre>
</div>
</details>

**Exercise 17** — Read a file in **`try`** / **`except FileNotFoundError`**; on success, print **`Read.`**, otherwise **`No file.`** <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">try:
    with open("data.txt", "r", encoding="utf-8") as f:
        f.read()
except FileNotFoundError:
    print("No file.")
else:
    print("Read.")</code></pre>
</div>
</details>

**Exercise 18** — A loop with **three tries at most** to read an integer: on each **`ValueError`**, increment a counter; after **3** failures, print **`Give up`** and **`break`**. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">essais = 0
while essais &lt; 3:
    try:
        n = int(input("Integer? "))
        print("OK", n)
        break
    except ValueError:
        essais += 1
        print("Once more.")
else:
    print("Give up")</code></pre>
</div>
</details>

**Exercise 19** — Chain a **`try`**: **`int(input())`** then **`10 / n`**; catch **`ValueError`** and **`ZeroDivisionError`** and print a **different** message for each. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">try:
    n = int(input("Integer? "))
    print(10 / n)
except ValueError:
    print("That is not an integer.")
except ZeroDivisionError:
    print("Division by zero.")</code></pre>
</div>
</details>

**Exercise 20** — Write **`saisir_note_sur_20()`** that returns an **integer between 0 and 20**: loop until success; handle **`ValueError`** and values **out of range** with distinct messages. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def saisir_note_sur_20():
    while True:
        try:
            n = int(input("Grade out of 20? "))
        except ValueError:
            print("An integer is expected.")
            continue
        if n &lt; 0 or n &gt; 20:
            print("The grade must be between 0 and 20.")
            continue
        return n</code></pre>
</div>
</details>

## Next in the track

The [higher-or-lower mini-game](/en/python-mini-terminal-game/) brings together loops, `input`, `random` and a clean `try` / `except` on the input.

## Amazon (affiliate)

Python good-practice books: [Check today's price on Amazon.](https://www.amazon.com/s?k=clean+code+python+book&tag=roboteducatif-20)
