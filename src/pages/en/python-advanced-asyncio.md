---
layout: ../../layouts/EnPost.astro
title: "Advanced Python: asyncio, concurrency, and non-blocking I/O"
description: "The event loop, async and await, Task, gather, and sleep; how this differs from threads; GIL limits on CPU work; and 20 exercises with solutions."
updated: "29 March 2026"
faqSchema:
  - question: "Does asyncio spread pure CPU work across several cores?"
    answer: "No. The GIL still applies. For CPU parallelism, use multiprocessing or concurrent.futures.ProcessPoolExecutor."
  - question: "Why is time.sleep a poor fit inside async def?"
    answer: "It blocks the event-loop thread, so every other async task freezes until that sleep returns."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

The **`asyncio`** module gives you an **event loop** that runs **coroutines**: functions declared with **`async def`** and called with **`await`**. Unlike operating-system **threads**, coroutines are **cooperative**. They yield control at **`await`** points, which suits **I/O** (the network, and disk access through async libraries) and **concurrency** across many connections **without** creating thousands of threads.

**Important**: **`asyncio` does not parallelize pure CPU work** across several cores. The **GIL** still applies. For parallel CPU work, see **`multiprocessing`** or **`concurrent.futures.ProcessPoolExecutor`**.

## 1. A first coroutine

```python
import asyncio

async def main():
    print("start")
    await asyncio.sleep(0.1)
    print("end")

asyncio.run(main())
```

**`asyncio.run`** creates the loop, runs **`main()`** to completion, and shuts it down cleanly.

## 2. Tasks and `gather`

**`asyncio.create_task(coro)`** schedules a coroutine as a concurrent **Task**. **`await asyncio.gather(a(), b())`** starts several coroutines and waits until **all** of them finish (exceptions are collected).

## 3. Do not block the loop

Calling a **blocking** function (`time.sleep`, a heavy calculation) **inside** a coroutine **blocks the whole** loop: the other tasks do not run. Use **`await asyncio.sleep`**, or **`loop.run_in_executor`** to hand the work to the **thread pool**.

## External resources

- **[asyncio — documentation](https://docs.python.org/3/library/asyncio.html)**
- **[Coroutines and Tasks](https://docs.python.org/3/library/asyncio-task.html)**

## Exercises (20)

### Easy

**Exercise 1** — A minimal program with **`asyncio.run(hello())`**, where **`hello`** does **`await asyncio.sleep(0)`** and then **`print("ok")`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import asyncio

async def hello():
    await asyncio.sleep(0)
    print("ok")

asyncio.run(hello())</code></pre>
</div>
</details>

**Exercise 2** — **`await asyncio.gather(sleep(0.1), sleep(0.1))`** and check that the total time is **&lt; 0.2** s (order of magnitude). <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import asyncio, time
async def main():
    t0 = time.perf_counter()
    await asyncio.gather(asyncio.sleep(0.1), asyncio.sleep(0.1))
    print(time.perf_counter() - t0)
asyncio.run(main())</code></pre>
</div>
</details>

**Exercise 3** — Use **`asyncio.create_task`** on a coroutine that counts to 3, with **`await sleep(0)`** between each **`print`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import asyncio

async def count():
    for i in range(1, 4):
        await asyncio.sleep(0)
        print(i)

async def main():
    t = asyncio.create_task(count())
    await t

asyncio.run(main())</code></pre>
</div>
</details>

**Exercise 4** — What is the difference between **`async def`** and a normal function that returns a coroutine? <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># async def defines a coroutine; calling it returns a coroutine object, which the loop runs.</code></pre>
</div>
</details>

**Exercise 5** — Why is **`time.sleep(1)`** inside **`async def`** a **bad idea**? <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># It blocks the event-loop thread; every async task freezes.</code></pre>
</div>
</details>

**Exercise 6** — Use **`asyncio.TimeoutError`** in concept with **`wait_for`** around a coroutine that sleeps too long. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import asyncio

async def lent():
    await asyncio.sleep(10)

async def main():
    try:
        await asyncio.wait_for(lent(), timeout=0.05)
    except asyncio.TimeoutError:
        print("timeout")

asyncio.run(main())</code></pre>
</div>
</details>

**Exercise 7** — What does **`asyncio.run`** do, compared with **`loop.run_until_complete`**, from a user's point of view? <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># run is the recommended high-level API: it creates the loop and closes it cleanly.</code></pre>
</div>
</details>

### Intermediate

**Exercise 8** — **`asyncio.Semaphore(2)`** to cap simulated concurrent calls at **2**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import asyncio

async def work(i, sem):
    async with sem:
        print("start", i)
        await asyncio.sleep(0.05)
        print("end", i)

async def main():
    sem = asyncio.Semaphore(2)
    await asyncio.gather(*(work(i, sem) for i in range(5)))

asyncio.run(main())</code></pre>
</div>
</details>

**Exercise 9** — **`asyncio.Queue`**: a producer that **`put`s**, and a consumer that **`get`s**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import asyncio

async def prod(q):
    await q.put(1)
    await q.put(2)

async def cons(q):
    print(await q.get())
    print(await q.get())

async def main():
    q = asyncio.Queue()
    await asyncio.gather(prod(q), cons(q))

asyncio.run(main())</code></pre>
</div>
</details>

**Exercise 10** — **`return_exceptions=True`** in **`gather`**: what happens. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Exceptions become return values instead of propagating.</code></pre>
</div>
</details>

**Exercise 11** — Start a minimal TCP **`asyncio.Server`** (read the docs) — a sketch. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># async def handle(reader, writer): ... ; asyncio.start_server(handle, host, port); serve forever.</code></pre>
</div>
</details>

**Exercise 12** — **`asyncio.shield`**: what is it for? <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Protects a task from cascading cancellation; cancellation does not propagate directly.</code></pre>
</div>
</details>

**Exercise 13** — **`run_in_executor`** to call a blocking **`requests.get`** — a sketch. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># loop = asyncio.get_running_loop(); await loop.run_in_executor(None, requests.get, url)</code></pre>
</div>
</details>

**Exercise 14** — The difference between **concurrency** and **parallelism**, in one sentence. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Concurrency: interleaving. Parallelism: simultaneous execution on several cores.</code></pre>
</div>
</details>

### Hard

**Exercise 15** — A **producer/consumer** pattern with a **`Queue`** and a **`sentinel`** to stop. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Put None at the end; the consumer breaks on None.</code></pre>
</div>
</details>

**Exercise 16** — **`asyncio.CancelledError`**: when is it raised? <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># When the task is cancelled with task.cancel().</code></pre>
</div>
</details>

**Exercise 17** — Why is **`asyncio.get_event_loop()`** outside an async context discouraged in 3.10+? <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Prefer get_running_loop() inside a coroutine so you do not pick an ambiguous loop.</code></pre>
</div>
</details>

**Exercise 18** — **`asyncio.TaskGroup`** (3.11+): the advantage over **`gather`**. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Structured handling of child tasks and cascading cancellation (async with syntax).</code></pre>
</div>
</details>

**Exercise 19** — Measure **wall time** versus **CPU time** for a coroutine that mostly **`sleep`s**. Which one reflects I/O wait? <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Wall time (time.perf_counter) goes up; CPU time barely moves because there is little CPU work.</code></pre>
</div>
</details>

**Exercise 20** — When would you choose **`anyio`** or **`trio`** over **`asyncio`** alone? (a short answer). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Third-party libraries for a unified API, structured timeouts, and nursery patterns, depending on the ecosystem.</code></pre>
</div>
</details>

## Next in the track

[Advanced static typing](/en/python-advanced-typing/): Protocol, generics, Literal.

## Amazon

<a href="https://www.amazon.com/s?k=python+asyncio+book&tag=roboteducatif-20" class="btn btn-action" rel="nofollow sponsored noopener" target="_blank">Check today's price on Amazon</a> (Python asyncio)
