---
layout: ../../layouts/EnPost.astro
title: "CLI journal project (1/6): architecture and scope"
description: "A CLI that reads log files line by line. This chapter sets the parser, stats, and CLI modules, the line format, memory limits, and what done looks like."
updated: "29 March 2026"
faqSchema:
  - question: "Why an Iterator instead of a list for a 1 GB log?"
    answer: "An iterator keeps memory roughly constant and processes the file as a stream. A list would hold every line in memory at once."
  - question: "Where does a date-range filter belong?"
    answer: "In the parser, or in a generator derived from it, so stats already receives filtered lines."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

The **`journal-stats`** tool (the tutorial's made-up name) reads one or more **text files** in a **log-like** format: one line per event, an optional timestamp prefix **`YYYY-MM-DD HH:MM:SS`**, and a level such as **`INFO`** or **`ERROR`**. The program produces **statistics**: line counts by level, the top messages, and errors by hour. The architecture splits **`parser`** (a generator of lines / records), **`stats`** (aggregation), **`cli`** (arguments, **several files**), and optionally **`io_async`** (a sketch of concurrent reading).

Project hub: [advanced Python journal CLI](/programmation/projet-python-avance-journal/).

## Planned modules

- **`journal_stats/parser.py`**: `parse_lines(path) -> Iterator[LogLine]`
- **`journal_stats/stats.py`**: `aggregate(lines: Iterable[LogLine]) -> Report`
- **`journal_stats/cli.py`**: `main()` with argparse
- **`pyproject.toml`**: the entry point (part 6)

## Exercises (12)

**Exercise 1** — Define the **minimum format** of an accepted line (regex or split). <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">2026-03-29 14:00:00 INFO free-form message</code></pre>
</div>
</details>

**Exercise 2** — Why an **`Iterator`** rather than a **`list`** when reading a **1 GB** file? <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Constant memory; stream processing.</code></pre>
</div>
</details>

**Exercise 3** — Name **two** risks if everything lives in **`cli.py`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Hard to test; no reuse; layers mixed together.</code></pre>
</div>
</details>

**Exercise 4** — **`TypedDict`** or **`dataclass`** for **`LogLine`** — the advantage of each. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">dataclass: methods and validation; TypedDict: a JSON-like dict.</code></pre>
</div>
</details>

**Exercise 5** — A text **UML** sketch: **`cli` → `stats` → `parser`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">cli calls stats.aggregate(parser.parse(path))</code></pre>
</div>
</details>

**Exercise 6** — A **performance** criterion: process **100 MB** without using **more than 500 MB** of RAM — what strategy? <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Iterate line by line; integer counters; do not keep a list of every line.</code></pre>
</div>
</details>

**Exercise 7** — **Binary files** are out of scope — how do you document that? <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">README: UTF-8 text only; error if decoding fails.</code></pre>
</div>
</details>

**Exercise 8** — The tool's own **logging** versus analyzing logs — a mix-up to avoid. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Use logging for debug; stdout for the user report.</code></pre>
</div>
</details>

**Exercise 9** — **Extension**: filter by **date range** — where in the architecture? <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">In the parser or a derived generator; stats already receives filtered lines.</code></pre>
</div>
</details>

**Exercise 10** — An empty **`__init__.py`** is enough for a **package** — when do you use **`__all__`**? <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># from pkg import * — avoid it; __all__ limits what is exposed.</code></pre>
</div>
</details>

**Exercise 11** — **Compatibility** with Python **3.10+**: which typing feature should you use? <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">X | None, list[str], ParamSpec if you need it.</code></pre>
</div>
</details>

**Exercise 12** — **Definition of Done** for part 1. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Tree created; line format documented; README with the goals.</code></pre>
</div>
</details>

## Next

[Parsing with generators](/en/python-journal-cli-2-generators/)

## Amazon

<a href="https://www.amazon.com/s?k=python+software+architecture+book&tag=roboteducatif-20" class="btn btn-action" rel="nofollow sponsored noopener" target="_blank">Check today's price on Amazon</a>
