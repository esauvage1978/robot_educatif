---
layout: ../../layouts/EnPost.astro
title: "Advanced Python: iterators, generators, and itertools"
description: "The iterator protocol, yield, generators, itertools.chain and islice, plus lazy streams and memory. Twenty corrected exercises with fold-out solutions."
updated: "29 March 2026"
faqSchema:
  - question: "What is the difference between an iterable and an iterator?"
    answer: "An iterable exposes __iter__ and can start a new walk. An iterator exposes __next__ and raises StopIteration when it is empty. Once consumed, it does not rewind by itself."
  - question: "When should you use a generator?"
    answer: "Use yield when the data is large or of unknown size, so you produce one item at a time instead of building a full list in memory."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

In Python, a **`for` loop** does not magically walk a list: it asks an **iterator** — an object that knows how to produce items **one by one** according to the **iterator protocol**. Once you understand that mechanism, you can write **lazy** code that does not load everything into memory, **compose** data pipelines, and use **generators** (`yield`), which sit at the base of many modern APIs.

## 1. Iterables, iterators, and the `__iter__` method

An **iterable** is anything you can walk with `for`: lists, tuples, strings, files opened in text mode, and so on. Technically, an iterable exposes **`__iter__()`**, which returns an **iterator**. The iterator exposes **`__next__()`** (or `next()` in Python 3) and raises **`StopIteration`** when there are no items left.

```python
it = iter([1, 2, 3])
print(next(it))  # 1
print(next(it))  # 2
```

**Why does this matter?** Because **two independent `for` loops** on the same iterable often create a **new** iterator from the iterable, whereas a **consumed iterator** does not rewind on its own: once it is exhausted, it stays empty.

## 2. Generators and `yield`

A **generator function** uses **`yield`** instead of `return` to pause its execution and hand back a value. On the next call, it **resumes** after the `yield`. The object you get back is a **generator**, which is also an **iterator**: you do not load a whole list into memory.

```python
def compte_jusqua(n):
    i = 0
    while i < n:
        yield i
        i += 1

for x in compte_jusqua(3):
    print(x)
```

**Typical uses**: reading large files line by line, transformation pipelines, infinite combinators bounded by a business condition.

## 3. Generator expressions

The syntax **`(expr for x in it if cond)`** — parentheses, except when it is the only argument of a function call, where the generator’s parentheses can be omitted. This is an anonymous **generator**, not a list.

```python
carres = (x * x for x in range(5))
```

## 4. The `itertools` module

**`itertools`** provides efficient **iterators** combined in C: **`chain`** to chain iterables, **`islice`** to slice without copying the whole sequence, **`cycle`**, **`repeat`**, **`groupby`** (often after a **sort**), **`zip_longest`**, and more. It is the standard toolbox for **composing** streams without huge intermediate lists.

```python
from itertools import chain, islice
list(islice(chain([1, 2], [3, 4]), 3))
```

## 5. Good practice

- Prefer **generators** when the data is **large** or of **unknown** size.
- Careful: a generator is **single-use**. If you need to walk it **several times**, materialize it (`list(...)`) or create the generator again.
- **`itertools.groupby`** groups **identical adjacent** items: you often sort first with **`sorted(iterable, key=...)`**.

## External resources

- **[Glossary — iterator](https://docs.python.org/3/glossary.html#term-iterator)** (official documentation).
- **[itertools](https://docs.python.org/3/library/itertools.html)**.
- **[PEP 255 — Simple Generators](https://peps.python.org/pep-0255/)**: the historical motivation.

## Exercises (20)

The **solutions** are hidden by default.

### Easy

**Exercise 1** — Use **`iter`** and **`next`** on **`"ab"`** to print **`a`** then **`b`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">it = iter("ab")
print(next(it))
print(next(it))</code></pre>
</div>
</details>

**Exercise 2** — Write a generator **`pairs(n)`** that **`yield`s** the even integers **`0, 2, …` strictly less than `n`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def pairs(n):
    i = 0
    while i < n:
        if i % 2 == 0:
            yield i
        i += 1</code></pre>
</div>
</details>

**Exercise 3** — A list comprehension of the squares of **`range(4)`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">[x * x for x in range(4)]</code></pre>
</div>
</details>

**Exercise 4** — The equivalent generator expression, then **`list(...)`** to display it. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">list(x * x for x in range(4))</code></pre>
</div>
</details>

**Exercise 5** — Import **`chain`** and print **`list(chain([1], [2, 3]))`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from itertools import chain
print(list(chain([1], [2, 3])))</code></pre>
</div>
</details>

**Exercise 6** — Use **`islice`** to take the **first 3** items of **`range(100)`** without building the full list. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from itertools import islice
print(list(islice(range(100), 3)))</code></pre>
</div>
</details>

**Exercise 7** — In one sentence, explain why **`list(g)`** then **`list(g)`** on the **same** generator `g` often gives **`[]`** the second time. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># The generator is exhausted after the first walk; the second walk produces nothing.</code></pre>
</div>
</details>

### Intermediate

**Exercise 8** — A generator **`lecture_lignes(chemin)`** that opens a file with **`encoding="utf-8"`** and **`yield`s** each line **without** loading the whole file into memory (use **`open`** and a loop). <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def lecture_lignes(chemin):
    with open(chemin, encoding="utf-8") as f:
        for ligne in f:
            yield ligne.rstrip("\n")</code></pre>
</div>
</details>

**Exercise 9** — Use **`enumerate`** on a generator of **`range(3)`** and print **`(index, value)`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">for t in enumerate(x for x in range(3)):
    print(t)</code></pre>
</div>
</details>

**Exercise 10** — With **`zip`**, combine **`"abc"`** and **`[1, 2, 3]`** into a list of tuples. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">print(list(zip("abc", [1, 2, 3])))</code></pre>
</div>
</details>

**Exercise 11** — Import **`zip_longest`** from **`itertools`** with **`fillvalue=0`** and zip **`[1]`** with **`[1, 2, 3]`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from itertools import zip_longest
print(list(zip_longest([1], [1, 2, 3], fillvalue=0)))</code></pre>
</div>
</details>

**Exercise 12** — **`itertools.count(start=10, step=2)`**: take **`5`** values with **`islice`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from itertools import count, islice
print(list(islice(count(10, 2), 5)))</code></pre>
</div>
</details>

**Exercise 13** — An **infinite** **`fibonacci()`** generator; print the **first 8** terms with **`islice`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from itertools import islice

def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

print(list(islice(fibonacci(), 8)))</code></pre>
</div>
</details>

**Exercise 14** — Give an example where **`[f(x) for x in huge]`** is risky for memory, and the **generator** variant you would prefer. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># A list allocates everything at once. A generator (f(x) for x in huge) does not materialize the full sequence.</code></pre>
</div>
</details>

### Hard

**Exercise 15** — Implement **`grouper_par_deux(iterable)`** that **`yield`s** consecutive tuples **`(a, b)`**; if the length is odd, ignore the last item or handle it with an option (pick a policy and document it). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def grouper_par_deux(iterable):
    it = iter(iterable)
    while True:
        try:
            a = next(it)
            b = next(it)
        except StopIteration:
            break
        yield (a, b)

print(list(grouper_par_deux([1, 2, 3, 4, 5])))  # (5) ignored</code></pre>
</div>
</details>

**Exercise 16** — Use **`groupby`** on **`sorted("abracadabra")`** to print **letter → number of occurrences** (adjacent). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from itertools import groupby
for k, g in groupby(sorted("abracadabra")):
    print(k, len(list(g)))</code></pre>
</div>
</details>

**Exercise 17** — What is the difference between **`yield`** and **`yield from`** in a sub-generator? Give a tiny example. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def inner():
    yield 1
    yield 2

def outer():
    yield from inner()  # delegates without an explicit loop

print(list(outer()))</code></pre>
</div>
</details>

**Exercise 18** — Combine **`chain.from_iterable`** with a list of lists **`[[1, 2], [3]]`**. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from itertools import chain
print(list(chain.from_iterable([[1, 2], [3]])))</code></pre>
</div>
</details>

**Exercise 19** — Write a **generator** that merges **two** sorted iterables into a **sorted stream** (merge-sort style) for integers; assume the inputs are sorted. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def merge_tri(a, b):
    ia, ib = iter(a), iter(b)
    x = next(ia, None)
    y = next(ib, None)
    while x is not None and y is not None:
        if x <= y:
            yield x
            x = next(ia, None)
        else:
            yield y
            y = next(ib, None)
    while x is not None:
        yield x
        x = next(ia, None)
    while y is not None:
        yield y
        y = next(ib, None)

print(list(merge_tri([1, 4], [2, 3])))</code></pre>
</div>
</details>

**Exercise 20** — Explain why **`sum([[1], [2], [3]], [])`** “flattens” but is **inefficient**; suggest **`chain.from_iterable`** instead. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># sum on lists builds intermediate copies, O(n²). chain.from_iterable is linear and lazy.
from itertools import chain
list(chain.from_iterable([[1], [2], [3]]))</code></pre>
</div>
</details>

## Next in the course

[Decorators, wrappers, and functools](/en/python-advanced-decorators/): add behavior without duplicating code.

## Amazon

<a href="https://www.amazon.com/s?k=python+advanced+programming+book&tag=roboteducatif-20" class="btn btn-action" rel="nofollow sponsored noopener" target="_blank">Check today's price on Amazon</a>
