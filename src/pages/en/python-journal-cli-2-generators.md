---
layout: ../../layouts/EnPost.astro
title: "CLI journal project (2/6): parsing with generators"
description: "Read a log line by line with yield and a precompiled regex. Decide how to treat lines that do not match, without loading the whole file. Twelve exercises."
updated: "29 March 2026"
faqSchema:
  - question: "Why compile the regex once at module level?"
    answer: "A pattern stored in a module constant is compiled once. Recompiling it on every line wastes time on a large file."
  - question: "What happens if you call list(parse_lines) twice?"
    answer: "The generator reads the file again. You get two passes over the disk, not a stored list reused for free."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

Implement **`parse_lines(path: Path) -> Iterator[LogLine]`** by opening the file with **`encoding="utf-8"`** and **`errors="replace"`** or **`strict`**, according to the policy you document. For each non-empty line, extract **timestamp**, **level**, and **message** with a **`re.compile`** pattern stored as a **module constant**, so you do not recompile it on every line.

Previous chapter: [architecture and scope](/en/python-journal-cli-1-architecture/).

## Performance

- **Precompile** the regexes.
- Skip a repeated **`strip()`** when the pattern already handles spaces.
- **`yield`** immediately: do not accumulate `lines` in a list.

## Exercises (12)

**Exercise 1** — A generator that reads **`path`** with **`open`** and **`yield`**s a cleaned line. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def iter_lines(path):
    with path.open(encoding="utf-8") as f:
        for line in f:
            yield line.rstrip("\n")</code></pre>
</div>
</details>

**Exercise 2** — A regex with **named groups** `ts`, `lvl`, and `msg` for the date-time, the level, and the rest of the line. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import re
LINE = re.compile(
    r"^(?P&lt;ts&gt;\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) "
    r"(?P&lt;lvl&gt;INFO|ERROR|WARN) (?P&lt;msg&gt;.*)$"
)</code></pre>
</div>
</details>

**Exercise 3** — If the line does not match: **`yield`** a **`LogLine.raw`** or **ignore** it — choose and test. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Stats option: a skipped_lines counter; or LogLine(level="UNKNOWN", ...)</code></pre>
</div>
</details>

**Exercise 4** — Parse **`ts`** with **`datetime.strptime`** so you can sort later. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from datetime import datetime
datetime.strptime(m.group("ts"), "%Y-%m-%d %H:%M:%S")</code></pre>
</div>
</details>

**Exercise 5** — A **`total`** counter without materializing the list — **one loop** over the generator. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">sum(1 for _ in parse_lines(p))</code></pre>
</div>
</details>

**Exercise 6** — **`yield from`** to delegate to **`iter_lines`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def parse_lines(path):
    for line in iter_lines(path):
        ...
        yield logline</code></pre>
</div>
</details>

**Exercise 7** — Test: a file with **three** valid lines produces **three** `LogLine` values. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def test_parse(tmp_path):
    p = tmp_path / "l.log"
    p.write_text("...\n...\n...\n", encoding="utf-8")
    assert len(list(parse_lines(p))) == 3</code></pre>
</div>
</details>

**Exercise 8** — A **UTF-8 BOM** at the start of the file — how do you handle it? <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># encoding="utf-8-sig" strips a BOM when one is present.</code></pre>
</div>
</details>

**Exercise 9** — **Lazy**: `list(parse_lines)` twice — what happens? <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Reads the file twice; two passes over the disk.</code></pre>
</div>
</details>

**Exercise 10** — **`mmap`** (optional): when is it useful for very large files? <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">OS page-based access; advanced — out of scope for v1.</code></pre>
</div>
</details>

**Exercise 11** — **`collections.Counter`** on levels **without** storing every line — are **two passes** acceptable? <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># One pass is enough: increment the Counter for each parsed LogLine.</code></pre>
</div>
</details>

**Exercise 12** — Document a typical **error line** (a stack trace) that does **not** match the format — what should happen? <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Count it as UNKNOWN or as a raw line; skipped++.</code></pre>
</div>
</details>

## Next

[Decorators for metrics](/en/python-journal-cli-3-decorators/)

## Amazon

<a href="https://www.amazon.com/s?k=python+performance+book&tag=roboteducatif-20" class="btn btn-action" rel="nofollow sponsored noopener" target="_blank">Check today's price on Amazon</a>
