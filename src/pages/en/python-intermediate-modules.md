---
layout: ../../layouts/EnPost.astro
title: "Intermediate Python: modules, packages, and imports"
description: "Python modules and imports: import, from, the role of __main__, and the PEP 8 order. Twenty corrected exercises for a clear, structured program."
updated: "2 November 2026"
faqSchema:
  - question: "What is the difference between import math and from math import sqrt?"
    answer: "import math keeps the math. prefix, which is more explicit. from math import sqrt brings one name into the current namespace, which is shorter when you use that name a lot."
  - question: "Why avoid from module import *?"
    answer: "You do not control the list of imported names, you can overwrite variables, and linters lose track of where each name came from."
  - question: "Where do imports go?"
    answer: "At the top of the file, after the module docstring, grouped as the standard library, then third-party packages, then your project, following PEP 8."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

> **Direct answer (November 2026)** — Split your code into **`.py` files**, import with **`import module`** or **`from module import name`**, and put code that should “run only as a script” under **`if __name__ == "__main__":`**.

> **Intermediate track (1/6)** — [Intermediate Python hub](/en/python-intermediate-course/) · [Lesson 2 — venv and pip](/en/python-intermediate-venv-pip/) · [Lesson 3 — pathlib](/en/python-pathlib/)

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/en/python-intermediate-course/">Intermediate Python</a> · Lesson 1 — modules and imports</nav>

This lesson opens the [intermediate Python](/en/python-intermediate-course/) track: after the basics, you structure a real small project before [venv and pip](/en/python-intermediate-venv-pip/) and the later lessons ([regular expressions](/en/python-intermediate-regex/), [tests](/en/python-intermediate-tests/)).

Once a script grows past a few dozen lines, keeping everything in one file gets hard to read and hard to change. **Splitting it into modules** (`.py` files that group related functions, constants, or classes) serves two goals: **make responsibilities clear** (each file has a role you can name) and **reuse** the same code from several places without copy-paste. In Python, the central mechanism for loading code from another file is the **`import`** statement. It relies on an **import system** (paths, packages, a cache) that you can go deeper on with the resources at the end of this page.

This lesson sets the foundations: how to import the **standard library** or **your own code**, how a file can be both a **module** and a **script** thanks to **`__main__`**, and how to structure a **package** (a folder of modules). You will also see how **PEP 8** helps you write code that is **readable and consistent** with the rest of the Python ecosystem.

## 1. Import a standard module

The standard library provides ready-made modules (`math`, `os`, `json`, and so on). The most explicit import is **`import module_name`**: you then reach functions with the **module prefix**, which avoids ambiguity (you can see that `sqrt` really comes from `math`).

```python
import math
print(math.sqrt(16))
```

**Good practice**: group imports **at the top of the file** (after the module docstring, if there is one), **one import per line** so review and Git diffs stay easy, except for short imports such as `from pathlib import Path`. Do not scatter `import` statements through the middle of the code. That makes reading harder and can hide dependencies.

## 2. `from` … `import` …

The form **`from module import name`** imports one **specific name** into the current namespace. You can then use `Path` directly, with no prefix, which lightens the code when that name is used a lot.

```python
from pathlib import Path
p = Path("notes.txt")
```

**`from module import *`**, on the other hand, is **discouraged**. You do not know exactly which names come in, you risk **overwriting** existing variables, and static analysis tools (linters) have a harder time helping you. Always prefer **named, explicit** imports.

## 3. Your own module

A file **`utils.py`** placed **in the same directory** as a script **`main.py`** is a **module** like any other. Python finds it because it is on the **search path** (the script’s current directory, then `PYTHONPATH`, and so on). You can then import its definitions with **`import utils`** and the `utils.` prefix to call your functions.

```python
# utils.py
def doubler(x):
    return x * 2
```

```python
# main.py
import utils
print(utils.doubler(4))
```

This is the simplest pattern for sharing code between several scripts in a small project, before you introduce a real **package** in a subfolder.

## 4. `if __name__ == "__main__":`

Every Python file has a **`__name__`** variable. When you **run** the file with `python myfile.py`, the interpreter sets **`__name__` to `"__main__"`**. When you **import** the same file from another module, **`__name__`** is the **module name** (for example `"utils"`). The pattern below therefore runs some lines **only in script mode** (a quick test, a demo, a CLI), while the rest of the definitions can be imported **with no side effect** when the file is imported elsewhere.

```python
def saluer():
    print("Hello")

if __name__ == "__main__":
    saluer()
```

This habit is **very widespread**. It makes modules **reusable** and **testable** without always launching the whole program.

## 5. Packages (folders)

A **package** is a folder that groups several modules. Traditionally you put an **`__init__.py`** file in it (often empty or minimal) to mark the folder as a package. Recent Python versions also allow some cases without that file (“namespace” packages), but while you are learning, the layout **`mypackage/__init__.py`** plus **`mypackage/submodule.py`** stays clear. Imports take the form **`import mypackage.submodule`** or **`from mypackage import something`**. For a first project, a single package folder is often enough for a long time, before you complicate the tree.

## What is PEP 8?

**PEP** means **Python Enhancement Proposal**. These are documents that describe changes to the language, the library, or the community’s **conventions**. **[PEP 8](https://peps.python.org/pep-0008/)** is not a compiler rule. Python does not require a precise style in order to run your code. It is a **style guide** — a widely followed convention — that explains how to **name** variables and functions, how to **space** the code (spaces, blank lines), how to **order** imports, what **line length** to aim for so the code stays readable, and so on.

**Why care?** A consistent style makes projects **easier to reread**, for you and for other people, and it matches what you will see in the official documentation, in tutorials, and in most open-source libraries. Tools such as **Flake8**, **Ruff**, or the **Black** formatter often build on these rules (sometimes with variants). In practice, for this lesson, remember especially:

- **Names**: `snake_case` for functions and variables; **`CamelCase`** for classes (see the object-oriented lesson on this track).
- **Lines**: aim for about **79 to 100 characters**, depending on the team (historical PEP 8 says 79 for code; many modern projects go to 88 or 100).
- **Imports**: group the **standard library** first, then a blank line, then **third-party dependencies**, then a blank line, then **your project’s code**. Within each group the order is often **alphabetical**.

## External resources

- **[PEP 8 — Style Guide for Python Code](https://peps.python.org/pep-0008/)**: the reference document on style (names, indentation, spaces, imports). PEP 8 is written in English. Tools and tutorials often quote the important rules word for word.
- **[The Python Tutorial — Modules](https://docs.python.org/3/tutorial/modules.html)** (official documentation): modules, paths, and an introduction to packages.
- **[Tutoriel Python — Modules (FR)](https://docs.python.org/fr/3/tutorial/modules.html)**: the same content in French if you want that edition.
- **[The import system](https://docs.python.org/3/reference/import.html)**: the language reference on how Python loads modules (advanced).
- **[Flake8](https://flake8.pycqa.org/)**: a tool that combines several checks (style close to PEP 8, imports, complexity). Useful as soon as you want to industrialize code quality.

## Exercises (20)

Each exercise extends the lesson. The **solutions** are hidden by default.

### Simple level

**Exercise 1** — Import **`math`** and print **`math.pi`** rounded to **2** decimal places with **`round(math.pi, 2)`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import math
print(round(math.pi, 2))</code></pre>
</div>
</details>

**Exercise 2** — Use **`from random import randint`** and print a random integer between **1** and **6**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from random import randint
print(randint(1, 6))</code></pre>
</div>
</details>

**Exercise 3** — Import the **`sys`** module and print **`sys.version`** (the string that describes the Python version). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import sys
print(sys.version)</code></pre>
</div>
</details>

**Exercise 4** — Create a function **`carre(n)`** in a file **`geo.py`**, then in **`main.py`** do **`import geo`** and print **`geo.carre(5)`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># geo.py
def carre(n):
    return n * n

import geo
print(geo.carre(5))</code></pre>
</div>
</details>

**Exercise 5** — Write a script with **`if __name__ == "__main__":`** that prints **`run directly`** only when the file is executed, not when it is imported. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def f():
    return 1

if __name__ == "__main__":
    print("run directly")</code></pre>
</div>
</details>

**Exercise 6** — Import **`datetime`** and print today’s date with **`datetime.date.today()`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import datetime
print(datetime.date.today())</code></pre>
</div>
</details>

**Exercise 7** — Use **`import math as m`** and then print **`m.factorial(5)`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import math as m
print(m.factorial(5))</code></pre>
</div>
</details>

### Intermediate level

**Exercise 8** — Explain why **`from mymod import *`** is discouraged (two reasons, one sentence each, in a comment at the top of the file). <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># You do not know which names are imported; you can overwrite local variables.
# Tools such as flake8 have a hard time tracing unused star imports.
pass</code></pre>
</div>
</details>

**Exercise 9** — In **`app.py`**, import **`salut`** from **`hello.py`** with **`from hello import salut`**, then call **`salut()`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># hello.py
def salut():
    print("Hello")

from hello import salut
salut()</code></pre>
</div>
</details>

**Exercise 10** — Use **`import os`** and print the **current directory** with **`os.getcwd()`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import os
print(os.getcwd())</code></pre>
</div>
</details>

**Exercise 11** — Group, in comments, three **import sections**: standard (`math`), then a blank, then “local” (an assumed `import monoutil`). <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import math
# import requests  # third-party example
# import monoutil  # project (a file beside this one)
</code></pre>
</div>
</details>

**Exercise 12** — A module **`stats.py`** with **`moyenne(xs)`**; in **`cli.py`**, **`import stats`** and print the mean of **`[2, 4, 6]`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># stats.py
def moyenne(xs):
    return sum(xs) / len(xs)

import stats
print(stats.moyenne([2, 4, 6]))</code></pre>
</div>
</details>

**Exercise 13** — Rewrite the import **`import datetime`** so you only use **`datetime.datetime.now()`** by importing the **`datetime` class** from the **`datetime` module** (watch the identical names). <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from datetime import datetime
print(datetime.now())</code></pre>
</div>
</details>

**Exercise 14** — Inside **`__main__`**, call a function **`main()`** defined above, to follow the habit of “one **`main`** function per script.” <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def main():
    print("ok")

if __name__ == "__main__":
    main()</code></pre>
</div>
</details>

### Hard level

**Exercise 15** — A minimal package: a folder **`pkg/`** with an empty **`__init__.py`** and **`pkg/aide.py`** containing **`def hint(): return "hint"`**. From the project root, **`from pkg.aide import hint`**, then **`print(hint())`**. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># pkg/__init__.py  (empty)
# pkg/aide.py
def hint():
    return "hint"

from pkg.aide import hint
print(hint())</code></pre>
</div>
</details>

**Exercise 16** — Use **`importlib.import_module("math")`** to get the **`math`** module under the name **`m`** dynamically, then **`m.sqrt(9)`**. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import importlib
m = importlib.import_module("math")
print(m.sqrt(9))</code></pre>
</div>
</details>

**Exercise 17** — Document a function with a one-line **docstring** and check that it appears in **`help(my_function)`** or **`my_function.__doc__`**. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def double(x):
    """Return twice x."""
    return x * 2

print(double.__doc__)</code></pre>
</div>
</details>

**Exercise 18** — An **`if __name__ == "__main__":`** condition that calls **`main()`**. Inside **`main()`**, parse **`sys.argv[1]`** as an integer (index **1** if it is present, otherwise **0**). Reminder: **`import sys`**. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import sys

def main():
    if len(sys.argv) > 1:
        n = int(sys.argv[1])
    else:
        n = 0
    print(n)

if __name__ == "__main__":
    main()</code></pre>
</div>
</details>

**Exercise 19** — List the usual public attributes of the **`math`** module with **`dir(math)`** (raw display), then comment on why you would filter names that start with **`_`** in production. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import math
print([x for x in dir(math) if not x.startswith("_")])</code></pre>
</div>
</details>

**Exercise 20** — Good practice: create **`constants.py`** with **`TAILLE_MAX = 100`** and import that constant in **`run.py`** with **`from constants import TAILLE_MAX`**. Print it. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># constants.py
TAILLE_MAX = 100

from constants import TAILLE_MAX
print(TAILLE_MAX)</code></pre>
</div>
</details>

## FAQ

**What is the difference between `import math` and `from math import sqrt`?**  
The first keeps the **`math.` prefix** (more explicit). The second imports one **name** into the current namespace (shorter when you use it a lot).

**Why avoid `from module import *`?**  
You do not control the list of imported names, you risk **overwriting** variables, and linters lose the thread.

**Where do imports go?**  
At the **top of the file**, after the module docstring, grouped as the standard library, third-party packages, then your project (PEP 8).

## What comes next

[Virtual environments and pip](/en/python-intermediate-venv-pip/): isolate dependencies and pin versions so projects can be reproduced.

## On Amazon

- Python software architecture books: <a href="https://www.amazon.com/s?k=python+software+architecture+book&tag=roboteducatif-20" class="btn btn-action" rel="nofollow sponsored noopener" target="_blank">Check today's price on Amazon</a>
