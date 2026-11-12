---
layout: ../../layouts/EnPost.astro
title: "Advanced Python: context managers and contextlib"
description: "Use with, __enter__, __exit__, contextmanager, suppress, and ExitStack in Python, with references and 20 exercises that include collapsible solutions."
updated: "29 March 2026"
faqSchema:
  - question: "What does the with statement guarantee?"
    answer: "The resource is released even when the block raises an exception. That is the context-manager protocol."
  - question: "What happens if __exit__ returns True?"
    answer: "The exception is swallowed. That is rare, and you should document it when you do it."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

The **`with`** statement guarantees that a **resource** (a file, a lock, a connection) is **released** cleanly, even if a **block** raises an exception. That is the **context manager protocol**. You can implement it as a **class** (`__enter__` / `__exit__`) or in a **functional** style with **`contextlib.contextmanager`** and **`yield`**.

## 1. `with` and files

```python
with open("f.txt", encoding="utf-8") as f:
    data = f.read()
# file closed here
```

**`__exit__`** receives the exception type, its value, and the traceback. Returning **`True`** **swallows** the exception (rare, and worth documenting).

## 2. A minimal class

```python
class CM:
    def __enter__(self):
        print("enter")
        return self
    def __exit__(self, exc_type, exc, tb):
        print("exit")
```

## 3. `contextlib.contextmanager`

```python
from contextlib import contextmanager

@contextmanager
def tag(name):
    print("<", name, ">")
    yield
    print("</", name, ">")
```

The code **before** `yield` is the entry. The code **after** is the exit (like `finally`).

## 4. `suppress`, `redirect_stdout`, `ExitStack`

- **`suppress(OSError)`**: ignore the listed exceptions inside the block.
- **`ExitStack`**: open **several** context managers dynamically and close them in reverse order. Useful when the number of contexts varies.

## External resources

- **[contextlib](https://docs.python.org/3/library/contextlib.html)**
- **[PEP 343 — The “with” Statement](https://peps.python.org/pep-0343/)**

## Exercises (20)

### Easy

**Exercise 1** — Use **`with open(...)`** to read **`README`** if it is present (ignore the error with **`try/except`** or **`Path.exists`**). <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
p = Path("README")
if p.exists():
    with p.open(encoding="utf-8") as f:
        print(f.read())</code></pre>
</div>
</details>

**Exercise 2** — A **`Timer`** class that prints **`enter`** / **`exit`** with **`print`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class Timer:
    def __enter__(self):
        print("enter")
        return self
    def __exit__(self, *a):
        print("exit")

with Timer():
    pass</code></pre>
</div>
</details>

**Exercise 3** — **`@contextmanager`**: a **`chdir(path)`** function that changes the current directory and then **restores** the old one (use **`os.chdir`** and **`try/finally`** in the generator). <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import os
from contextlib import contextmanager

@contextmanager
def chdir(path):
    old = os.getcwd()
    os.chdir(path)
    try:
        yield
    finally:
        os.chdir(old)</code></pre>
</div>
</details>

**Exercise 4** — Use **`contextlib.suppress(FileNotFoundError)`** to try **`open("absent.txt")`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from contextlib import suppress
with suppress(FileNotFoundError):
    open("absent.txt")</code></pre>
</div>
</details>

**Exercise 5** — What does **`__enter__`** usually return, and what is that return value for? <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># The value bound to `as x`; often self, or an opened resource.</code></pre>
</div>
</details>

**Exercise 6** — What is the difference between **`finally:`** and **`__exit__`** in a context manager? <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># __exit__ can choose to suppress the exception; finally always runs after the block.</code></pre>
</div>
</details>

**Exercise 7** — **`closing(thing)`** from **`contextlib`**: what is it for when an object has **`.close()`**? <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Calls thing.close() when the with block exits, even if the object is not a native context manager.</code></pre>
</div>
</details>

### Intermediate

**Exercise 8** — Implement a context manager that **counts** how many times you have entered it (simple reentrancy with a counter). <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class Depth:
    def __init__(self):
        self.n = 0
    def __enter__(self):
        self.n += 1
        return self
    def __exit__(self, *a):
        self.n -= 1</code></pre>
</div>
</details>

**Exercise 9** — A **`contextmanager`** that **temporarily** adds a key to a **`dict`** and then removes it. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from contextlib import contextmanager

@contextmanager
def push(d, k, v):
    old = d.get(k, None)
    d[k] = v
    try:
        yield
    finally:
        if old is None:
            del d[k]
        else:
            d[k] = old</code></pre>
</div>
</details>

**Exercise 10** — Use **`ExitStack`** to open **two** temporary files (or **`StringIO`** objects) in a single **`with`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from contextlib import ExitStack
from io import StringIO

with ExitStack() as stack:
    a = stack.enter_context(StringIO("hi"))
    b = stack.enter_context(StringIO("yo"))</code></pre>
</div>
</details>

**Exercise 11** — If **`__exit__`** returns **`False`**, what happens to the exception? <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># It propagates after __exit__.</code></pre>
</div>
</details>

**Exercise 12** — **`contextlib.redirect_stdout`**: redirect **`print`** to a **`StringIO`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from contextlib import redirect_stdout
from io import StringIO
buf = StringIO()
with redirect_stdout(buf):
    print("x")
print(buf.getvalue())</code></pre>
</div>
</details>

**Exercise 13** — Why must **`yield`** in a **`contextmanager`** appear **only once** (in the usual case)? <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># The generator must stop at the first yield; otherwise you get a RuntimeError.</code></pre>
</div>
</details>

**Exercise 14** — Write an **`atomic_write(path)`** context manager: write to a **temporary file**, then **`replace`** atomically (a sketch). <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import tempfile
from pathlib import Path

@contextmanager
def atomic_write(path: Path):
    fd, tmp = tempfile.mkstemp(dir=path.parent)
    try:
        with open(fd, "w", encoding="utf-8", closefd=True) as f:
            yield f
        Path(tmp).replace(path)
    except Exception:
        Path(tmp).unlink(missing_ok=True)
        raise</code></pre>
</div>
</details>

### Hard

**Exercise 15** — An **async** context manager: name the protocol (`__aenter__`). This course does not cover it in detail, but look it up for **asyncio**. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># __aenter__ / __aexit__; async with for asyncio resources.</code></pre>
</div>
</details>

**Exercise 16** — **`nested`** (deprecated) versus **`ExitStack`**: why is **`ExitStack`** preferred? <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># A variable number of contexts, with a guaranteed close order.</code></pre>
</div>
</details>

**Exercise 17** — **`contextlib.aclosing`** (3.10+) for **async generators**: one sentence on how you use it. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Ensures aclose() on an async generator, as closing() does for .close().</code></pre>
</div>
</details>

**Exercise 18** — Test a **`@contextmanager`** that **raises** after **`yield`**. Does the exception reach the implicit **`finally`**? <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Yes, the code after yield runs on the way out; exceptions are handled through GeneratorExit.</code></pre>
</div>
</details>

**Exercise 19** — Implement **`nullcontext`** by hand (an object whose **`__enter__`** returns the argument and whose **`__exit__`** returns None). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class NC:
    def __init__(self, v=None):
        self.v = v
    def __enter__(self):
        return self.v
    def __exit__(self, *a):
        pass</code></pre>
</div>
</details>

**Exercise 20** — Why does **`with lock:`** work with a **`threading.Lock`** (which protocol)? <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Lock implements __enter__ (acquire) and __exit__ (release).</code></pre>
</div>
</details>

## Next in the track

[asyncio: structured concurrency](/en/python-advanced-asyncio/): `async` / `await` and the event loop.

## Amazon

<a href="https://www.amazon.com/s?k=python+concurrent+programming+book&tag=roboteducatif-20" class="btn btn-action" rel="nofollow sponsored noopener" target="_blank">Check today's price on Amazon</a> (Python concurrent programming)
