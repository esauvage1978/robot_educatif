---
layout: ../../layouts/EnPost.astro
title: "CLI journal project (4/6): asyncio and batch reads"
description: "Use gather, a semaphore, and run_in_executor so disk reads of several logs do not block the event loop. Twelve exercises, plus a sync fallback."
updated: "29 March 2026"
faqSchema:
  - question: "Why run_in_executor around open()?"
    answer: "A synchronous open and read blocks the event loop. Running that work in a thread lets the loop keep scheduling other tasks."
  - question: "When does the async version win nothing?"
    answer: "On a slow disk, or with tiny files, scheduling overhead can cancel any gain over a plain synchronous loop."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

When you analyze **several large files**, you can **run the work in parallel**: **`asyncio.gather`** starts tasks that **wait** on I/O. **Careful**: reading a file with synchronous **`open()`** **blocks** the loop. A common pattern is **`await loop.run_in_executor(None, parse_file_sync, path)`**, where **`parse_file_sync`** reads and aggregates in a **thread** (disk I/O often releases the GIL).

A minimal alternative is to stay **fully synchronous** with **`concurrent.futures.ThreadPoolExecutor`** for this project — but **document** the choice: the **advanced course** asks you to illustrate **`asyncio`**.

Previous chapter: [decorators and metrics](/en/python-journal-cli-3-decorators/).

## Recommended sketch

```python
async def process_paths(paths: list[Path]) -> Report:
    loop = asyncio.get_running_loop()
    sem = asyncio.Semaphore(4)

    async def one(p: Path):
        async with sem:
            return await loop.run_in_executor(None, parse_and_count, p)

    parts = await asyncio.gather(*[one(p) for p in paths])
    return merge_reports(parts)
```

## Exercises (12)

**Exercise 1** — Write **`asyncio.run`** plus a **`main()`** coroutine that **`await asyncio.sleep(0)`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import asyncio
async def main():
    await asyncio.sleep(0)
asyncio.run(main())</code></pre>
</div>
</details>

**Exercise 2** — Limit concurrency to **4** files with **`Semaphore(4)`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">sem = asyncio.Semaphore(4)
async with sem:
    ...</code></pre>
</div>
</details>

**Exercise 3** — Why **`run_in_executor`** for **`open`** / reading? <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Avoid blocking the event loop on synchronous I/O.</code></pre>
</div>
</details>

**Exercise 4** — Merge two **`Counter`** objects with **`sum`** or **`counter.update`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from collections import Counter
a = Counter({"INFO": 1})
a.update(Counter({"INFO": 2, "ERROR": 1}))</code></pre>
</div>
</details>

**Exercise 5** — **`gather`** with **`return_exceptions=True`**: the case of a **missing** file. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Collect FileNotFoundError in the list for an error report.</code></pre>
</div>
</details>

**Exercise 6** — **`asyncio.run`** must not be called **inside** a coroutine — why? <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Nested loops are not allowed; await coroutines instead.</code></pre>
</div>
</details>

**Exercise 7** — Benchmark: **sync** versus **async plus executor** on 10 files — when is the gain zero? <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">On a slow disk or with tiny files; scheduling overhead.</code></pre>
</div>
</details>

**Exercise 8** — **`aiofiles`** (third party) — when should you add it? <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Native async read and write without a thread pool; a pip dependency.</code></pre>
</div>
</details>

**Exercise 9** — **`uvloop`** — the context (Linux/macOS). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">A faster alternative event loop; optional.</code></pre>
</div>
</details>

**Exercise 10** — **`asyncio.to_thread`** (3.9+) — equivalent to `run_in_executor`. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">await asyncio.to_thread(parse_and_count, path)</code></pre>
</div>
</details>

**Exercise 11** — A synchronous **`main`** calls **`asyncio.run`** once — a single **entry point**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def main():
    return asyncio.run(amain())</code></pre>
</div>
</details>

**Exercise 12** — Document the **fallback**: if **`--no-async`**, process files sequentially and synchronously. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Works in restricted environments; simpler to debug.</code></pre>
</div>
</details>

## Next

[Typing and mypy](/en/python-journal-cli-5-typing-mypy/)

## Amazon

<a href="https://www.amazon.com/s?k=python+asyncio+book&tag=roboteducatif-20" class="btn btn-action" rel="nofollow sponsored noopener" target="_blank">Check today's price on Amazon</a>
