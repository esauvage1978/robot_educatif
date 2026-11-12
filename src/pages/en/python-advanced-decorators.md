---
layout: ../../layouts/EnPost.astro
title: "Advanced Python: decorators, functools, and closures"
description: "Closures, simple decorators, functools.wraps, partial, and lru_cache in Python, plus the order they apply. Twenty exercises with fold-out solutions."
updated: "2 November 2026"
faqSchema:
  - question: "Can a decorator take arguments?"
    answer: "Yes. @retry(tries=3) usually needs three levels of functions: a factory, then the decorator, then the wrapper."
  - question: "In what order are stacked decorators applied?"
    answer: "From the bottom up. @a then @b above def f means f = a(b(f)): b is applied first, then a."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/programmation/python-avance/">Advanced Python</a> · Lesson 2 — decorators</nav>

> **Direct answer (November 2026)** — A **decorator** is a function that **wraps** another function to add behavior (a trace, a cache, validation). The syntax **`@decor`** above **`def`** is the same as **`f = decor(f)`**. Use **`functools.wraps`** to keep the original function’s name and docstring.

This lesson follows the [advanced Python course](/programmation/python-avance/) after [generators](/en/python-advanced-generators/) and before [context managers](/en/python-advanced-context-managers/). Hub: [programming](/programmation/).

![Python decorators illustration — a wrapper around a function](/images/illustrations/python-av-decorateurs-functools.webp)

A **decorator** is a **function that takes a function** (or a class) and returns an enriched **stand-in**: logging, timing, argument validation, caching, and so on. It is **syntactic sugar**: `@decor` above `def f` is the same as **`f = decor(f)`** (as a first approximation). Combined with the **`functools`** module (Python’s standard library), you get **reusable** patterns without copying and pasting.

## 1. Closures

An inner function can **capture** variables from the enclosing scope: that is a **closure**. Useful when you **parameterize** a decorator (`def decorateur(prefixe): ... def wrapper(f): ...`).

## 2. A first decorator, written by hand

```python
def tracer(f):
    def wrapper(*args, **kwargs):
        print("call", f.__name__)
        return f(*args, **kwargs)
    return wrapper

@tracer
def add(a, b):
    return a + b
```

Without `@`, you would write **`add = tracer(add)`**.

## 3. `functools.wraps`

The **`wrapper`** replaces `f` and often **loses** `__name__`, `__doc__`, and the annotations. **`@functools.wraps(f)`** on `def wrapper` **copies** those metadata — essential for **introspection** and for the **docs** that tools show.

## 4. `functools.partial`

**`partial(func, *args, **kwargs)`** “freezes” part of the arguments to create a **new callable** with the remaining arguments — handy when you adapt an API to a callback.

```python
from functools import partial
basetwo = partial(int, base=2)
basetwo("10010")  # 18
```

## 5. `functools.lru_cache`

**`@lru_cache(maxsize=128)`** remembers the results of a **pure** function (same inputs → same output) so you do not recompute them. Useful for **recursion** such as Fibonacci or for expensive parsers — watch the **memory** use and **unhashable** arguments.

## External resources

- **[PEP 318 — Decorators for Functions and Methods](https://peps.python.org/pep-0318/)**
- **[functools](https://docs.python.org/3/library/functools.html)**

## Exercises (20)

### Easy

**Exercise 1** — Rewrite **`@tracer`** without `@`: assign **`add = tracer(add)`** after **`def add`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def tracer(f):
    def wrapper(*a, **k):
        print("call", f.__name__)
        return f(*a, **k)
    return wrapper

def add(a, b):
    return a + b

add = tracer(add)</code></pre>
</div>
</details>

**Exercise 2** — Import **`wraps`** and decorate the **`wrapper`** so it keeps **`__name__`** from **`f`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from functools import wraps

def tracer(f):
    @wraps(f)
    def wrapper(*a, **k):
        print("call", f.__name__)
        return f(*a, **k)
    return wrapper</code></pre>
</div>
</details>

**Exercise 3** — Use **`partial`** to create **`mul3 = partial(operator.mul, 3)`** (import **`operator`**). <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import operator
from functools import partial
mul3 = partial(operator.mul, 3)
print(mul3(4))</code></pre>
</div>
</details>

**Exercise 4** — Apply **`@lru_cache`** to a naive recursive **`fib(n)`** and compare the time for **`n=35`** (hint: without the cache, it is very slow). <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(35))</code></pre>
</div>
</details>

**Exercise 5** — What happens if you stack **`@a`** then **`@b`** above **`def f`**? (application order). <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># @a @b def f → f = a(b(f)): b is applied first, then a.</code></pre>
</div>
</details>

**Exercise 6** — A parameterized decorator **`retry(n)`** that tries again **`n`** times if an **`Exception`** is raised — a skeleton is fine. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from functools import wraps

def retry(n):
    def deco(f):
        @wraps(f)
        def wrapper(*a, **k):
            for _ in range(n):
                try:
                    return f(*a, **k)
                except Exception:
                    pass
            return f(*a, **k)
        return wrapper
    return deco</code></pre>
</div>
</details>

**Exercise 7** — **`lru_cache`**: why must the arguments be **hashable**? <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># The cache uses an internal dict; keys are argument tuples and must be hashable.</code></pre>
</div>
</details>

### Intermediate

**Exercise 8** — A **`timer`** decorator with **`time.perf_counter`** that prints how long the call took. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import time
from functools import wraps

def timer(f):
    @wraps(f)
    def wrapper(*a, **k):
        t0 = time.perf_counter()
        out = f(*a, **k)
        print(time.perf_counter() - t0)
        return out
    return wrapper</code></pre>
</div>
</details>

**Exercise 9** — Use **`partial`** to bind **`open`** in mode **`"r"`** with **`encoding="utf-8"`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from functools import partial
open_utf8 = partial(open, mode="r", encoding="utf-8")</code></pre>
</div>
</details>

**Exercise 10** — The difference between **`@staticmethod`** and **`@classmethod`** (a reminder): when do you use each inside a class? <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># staticmethod: no self/cls. classmethod: first argument is the class; alternative constructors, parsers.</code></pre>
</div>
</details>

**Exercise 11** — A minimal class decorator that adds an attribute **`_tag = "ok"`** to the class. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def tag(cls):
    cls._tag = "ok"
    return cls

@tag
class Foo:
    pass</code></pre>
</div>
</details>

**Exercise 12** — Why **`wrapper(*args, **kwargs)`** rather than **`wrapper()`** in a generic decorator? <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># So you can forward any signature to the decorated function.</code></pre>
</div>
</details>

**Exercise 13** — **`lru_cache(maxsize=2)`**: what happens when a **3rd** distinct result is requested (eviction policy)? <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># LRU: the least recently used entry is evicted (an approximation, depending on the implementation).</code></pre>
</div>
</details>

**Exercise 14** — Use **`functools.reduce`** to sum **`[1, 2, 3, 4]`** with **`operator.add`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import operator
from functools import reduce
print(reduce(operator.add, [1, 2, 3, 4], 0))</code></pre>
</div>
</details>

### Hard

**Exercise 15** — A **`typed`** decorator that checks positional arguments against simple **annotations** (`int`, `str`) — a minimal version for **2** parameters. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from functools import wraps

def typed(f):
    ann = f.__annotations__
    @wraps(f)
    def wrapper(a, b):
        if not isinstance(a, ann.get("a", type(a))):
            raise TypeError
        if not isinstance(b, ann.get("b", type(b))):
            raise TypeError
        return f(a, b)
    return wrapper</code></pre>
</div>
</details>

**Exercise 16** — Implement **`singledispatch`** on the **first** argument for **`show(x)`**, with **`int`** and **`str`** branches. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from functools import singledispatch

@singledispatch
def show(x):
    return f"other {x}"

@show.register
def _(x: int):
    return f"int {x}"

@show.register
def _(x: str):
    return f"str {x}"</code></pre>
</div>
</details>

**Exercise 17** — The problem of a decorator that **changes** the signature shown by **`help()`**: which **`inspect`** tool or third-party library helps keep a signature you can display? (answer in one sentence). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># functools.wraps helps; for complex signatures, inspect.signature or decorator.wraps (third-party).</code></pre>
</div>
</details>

**Exercise 18** — A cache with **`cache_clear`**: call **`fib.cache_clear()`** after several **`fib(n)`** calls. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from functools import lru_cache
@lru_cache(maxsize=None)
def fib(n):
    ...
fib.cache_clear()</code></pre>
</div>
</details>

**Exercise 19** — An **`once`** decorator that guarantees a function with no arguments runs only **once** and remembers the result. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def once(f):
    r = []
    @wraps(f)
    def wrapper():
        if not r:
            r.append(f())
        return r[0]
    return wrapper</code></pre>
</div>
</details>

**Exercise 20** — Explain why decorating a function that you **rebind** at runtime (`f = new_f`) can break references the decorator still holds — a pattern to avoid. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># The wrapper may close over the old function; decorate again or import cleanly.</code></pre>
</div>
</details>

## Next in the course

[Context managers and contextlib](/en/python-advanced-context-managers/): `with`, and clean setup/teardown.

## Amazon

<a href="https://www.amazon.com/s?k=python+design+patterns+book&tag=roboteducatif-20" class="btn btn-action" rel="nofollow sponsored noopener" target="_blank">Check today's price on Amazon</a>

## FAQ

**Can a decorator take arguments?** Yes: `@retry(tries=3)` often needs **three levels** of functions (factory → decorator → wrapper).

**`lru_cache` on an instance method?** Not recommended: the cache lives on the function, not per object — prefer an explicit cache or **`functools.cached_property`**.

**Order of several `@`?** Applied **from the bottom up**: `@a @b def f` → `f = a(b(f))`.

**How is that different from a plain call `f()`?** The decorator runs **when the function is defined**, not on every call — ideal for registering `f` in a Flask/FastAPI router or for adding a wrapper only once.

**Next in the course** — [asyncio](/en/python-advanced-asyncio/) · [advanced typing](/en/python-advanced-typing/) · [decorators project journal](/en/python-journal-cli-3-decorators/) · [programming hub](/programmation/).
