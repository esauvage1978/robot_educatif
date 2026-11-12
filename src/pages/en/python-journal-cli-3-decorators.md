---
layout: ../../layouts/EnPost.astro
title: "CLI journal project (3/6): decorators and metrics"
description: "Time parse_lines and aggregate, log how many lines you saw, and keep __name__ with functools.wraps. Twelve decorator exercises for the journal CLI."
updated: "29 March 2026"
faqSchema:
  - question: "Why not put @timed on the generator function alone?"
    answer: "If the function only returns a generator, the decorator times creation of that generator, not the walk over the lines."
  - question: "What does functools.wraps keep?"
    answer: "It copies __name__ and the docstring onto the wrapper so pytest and help() still show the original function."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

Wrap **`parse_lines`** and **`aggregate`** with a **`@timed`** decorator that records the duration through **`logging.info`** or **`print`** in debug mode. A second decorator, **`@log_calls`**, can count invocations — useful when you want to check that you are not **parsing again** inside a loop by mistake.

Use **`functools.wraps`** so **`__name__`** and the docstring stay intact, and so **`pytest`** and **`help()`** remain readable.

Previous chapter: [parsing with generators](/en/python-journal-cli-2-generators/).

## Exercises (12)

**Exercise 1** — A **`timed`** decorator with **`time.perf_counter`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import time, functools, logging
def timed(f):
    @functools.wraps(f)
    def wrapper(*a, **k):
        t0 = time.perf_counter()
        out = f(*a, **k)
        logging.info("%s took %.4fs", f.__name__, time.perf_counter() - t0)
        return out
    return wrapper</code></pre>
</div>
</details>

**Exercise 2** — Apply **`@timed`** to **`aggregate`** only — why not to the generator **without** consuming it? <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># timed on a function that returns a generator measures creation, not the walk.</code></pre>
</div>
</details>

**Exercise 3** — A **`count_lines`** decorator on a generator that **increments** a global **`Counter`** — the trap. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Global state: prefer a class, or a closure with a counter per call.</code></pre>
</div>
</details>

**Exercise 4** — **`logging.basicConfig(level=logging.DEBUG)`** in **`main`** only. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import logging
logging.basicConfig(level=logging.DEBUG)</code></pre>
</div>
</details>

**Exercise 5** — Test: mock **`logging.info`** and check that it is called with **`timed`**. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def test_timed_logs(caplog):
    @timed
    def f():
        return 1
    with caplog.at_level(logging.INFO):
        f()
    assert "took" in caplog.text</code></pre>
</div>
</details>

**Exercise 6** — **`lru_cache`** on **`parse_line`** when the line is **alone** — is it relevant? <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Can help when many lines are duplicates; otherwise it costs memory.</code></pre>
</div>
</details>

**Exercise 7** — **`singledispatch`** on the **source** type — file versus stdin. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Two parse_lines implementations, one for Path and one for TextIO.</code></pre>
</div>
</details>

**Exercise 8** — Order of the decorators **`@timed`** and **`@log_calls`** on **`f`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># @timed @log_calls def f → f = timed(log_calls(f)) — log_calls runs first on the call.</code></pre>
</div>
</details>

**Exercise 9** — Avoid **side effects** in decorators: the principle. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">A decorator must not break the signature or the metadata (wraps).</code></pre>
</div>
</details>

**Exercise 10** — A **`contextmanager`** to time a **block** inside **`main`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from contextlib import contextmanager
@contextmanager
def timer(name):
    t0 = time.perf_counter()
    yield
    print(name, time.perf_counter() - t0)</code></pre>
</div>
</details>

**Exercise 11** — **`__wrapped__`** after **`wraps`** — what it is for. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Reach the original decorated function.</code></pre>
</div>
</details>

**Exercise 12** — Document in the **README** the **`--verbose`** flag that turns the decorator logs on. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">--verbose: DEBUG level for parse and aggregate durations.</code></pre>
</div>
</details>

## Next

[asyncio and a batch of files](/en/python-journal-cli-4-asyncio/)

## Amazon

<a href="https://www.amazon.com/s?k=python+design+patterns+book&tag=roboteducatif-20" class="btn btn-action" rel="nofollow sponsored noopener" target="_blank">Check today's price on Amazon</a>
