---
layout: ../../layouts/EnPost.astro
title: "CLI journal project (5/6): typing and mypy"
description: "Protocol, TypedDict, and Literal for log levels, then tighten mypy from a loose config toward strict checks in CI. Twelve exercises for the journal CLI."
updated: "29 March 2026"
faqSchema:
  - question: "When is a type: ignore comment acceptable?"
    answer: "When a library is poorly typed. Leave a comment with a ticket or a link so the ignore is not silent."
  - question: "What is the py.typed marker for?"
    answer: "PEP 561 uses that empty file to tell type checkers the wheel ships stubs or inline annotations."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

Define a **`TypedDict`** for the final **JSON report**: **`{"total": int, "by_level": dict[str, int], ...}`**. Use **`Literal["INFO", "ERROR", "WARN"]`** for the level on **`LogLine`**. A **`Protocol`** named **`SupportsReadLines`** can describe **testable** sources without depending on **`Path`** alone.

Run **`mypy`** on the **`src/`** folder: start with **`disallow_untyped_defs = False`**, then tighten. Put **`mypy`** in **CI** (GitHub Actions or the equivalent) so type regressions **fail the build**.

Previous chapter: [asyncio and batch reads](/en/python-journal-cli-4-asyncio/).

## Exercises (12)

**Exercise 1** — Annotate **`def merge_reports(a: Counter, b: Counter) -> Counter`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from collections import Counter

def merge_reports(a: Counter, b: Counter) -> Counter:
    c = Counter(a)
    c.update(b)
    return c</code></pre>
</div>
</details>

**Exercise 2** — A **`Report` TypedDict** with keys **`total`** and **`by_level`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from typing import TypedDict

class Report(TypedDict):
    total: int
    by_level: dict[str, int]</code></pre>
</div>
</details>

**Exercise 3** — The command **`mypy src journal_stats`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">mypy src</code></pre>
</div>
</details>

**Exercise 4** — **`# type: ignore`** — when is it acceptable? <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">A poorly typed library; comment with a ticket or a link.</code></pre>
</div>
</details>

**Exercise 5** — **`assert isinstance`** for **narrowing** after **`json.loads`**. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def f(x: object) -> dict[str, object]:
    assert isinstance(x, dict)
    return x</code></pre>
</div>
</details>

**Exercise 6** — **`from __future__ import annotations`** — a reminder. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Annotations stored as strings; forward references stay easy.</code></pre>
</div>
</details>

**Exercise 7** — A **`Protocol`** with **`def readlines(self) -> list[str]`** — a mock in a test. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class Fake:
    def readlines(self):
        return ["2026-01-01 00:00:00 INFO hi\n"]</code></pre>
</div>
</details>

**Exercise 8** — A **`TypedDict`** with **`total=False`** for optional keys. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class R(TypedDict, total=False):
    errors: int</code></pre>
</div>
</details>

**Exercise 9** — The **`py.typed`** marker, **PEP 561** — why put it in the wheel? <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">It says the package provides stubs or annotations.</code></pre>
</div>
</details>

**Exercise 10** — **`reveal_type`** while debugging with mypy. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">reveal_type(x)  # type: ignore[misc]</code></pre>
</div>
</details>

**Exercise 11** — CI: **`mypy`** fails on a **warning** — a strategy. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Move toward --strict step by step; do not ignore warnings in bulk.</code></pre>
</div>
</details>

**Exercise 12** — **`Final`** for the **package name** as a constant. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from typing import Final
NAME: Final = "journal-stats"</code></pre>
</div>
</details>

## Next

[Package and pyproject](/en/python-journal-cli-6-package/)

## Amazon

<a href="https://www.amazon.com/s?k=python+type+hints+book&tag=roboteducatif-20" class="btn btn-action" rel="nofollow sponsored noopener" target="_blank">Check today's price on Amazon</a>
