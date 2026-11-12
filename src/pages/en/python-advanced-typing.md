---
layout: ../../layouts/EnPost.astro
title: "Advanced Python: static typing (typing, Protocol)"
description: "Go beyond int and str in Python: Optional, Union, generics, Protocol, TypedDict, and Literal, a short note on mypy, and 20 exercises with solutions."
updated: "29 March 2026"
faqSchema:
  - question: "Does Python check type annotations while the program runs?"
    answer: "No. Python stays dynamically typed at runtime. Annotations are for static checkers such as mypy, Pyright, and PyCharm."
  - question: "What is a Protocol in typing?"
    answer: "A Protocol describes structural subtyping. Any class with a compatible method or attribute satisfies it, with no explicit inheritance."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

Python stays **dynamically typed** at runtime, but **annotations** (`def f(x: int) -> str`) let you run **static checks** with **mypy**, **Pyright**, **PyCharm**, and similar tools. Beyond **`int`** and **`str`**, the **`typing`** module (and, from 3.9 onward, often the lowercase **builtins** for collections) gives you **`Protocol`** (structural subtyping), **generics** (`TypeVar`), **`TypedDict`** for structured JSON, **`Literal`** for constants, and more.

## 1. Union and Optional

**`Optional[X]`** is the same as **`X | None`** (Python 3.10+). **`Union[A, B]`** is **`A | B`**.

## 2. Protocol (static duck typing)

```python
from typing import Protocol

class Readable(Protocol):
    def read(self, n: int = -1) -> bytes: ...

def consume(r: Readable) -> None:
    r.read(10)
```

Any class with a compatible **`read`** method satisfies **`Readable`** **without explicit inheritance**.

## 3. Generics

```python
from typing import TypeVar, Generic

T = TypeVar("T")

class Box(Generic[T]):
    def __init__(self, x: T) -> None:
        self.x = x
```

## 4. TypedDict and Literal

**`TypedDict`** describes a **dict** with known keys (handy for JSON). **`Literal["r", "w"]`** restricts a value to **constant choices**.

## External resources

- **[typing](https://docs.python.org/3/library/typing.html)**
- **[mypy](https://mypy.readthedocs.io/)**

## Exercises (20)

### Easy

**Exercise 1** — Annotate **`def add(a: int, b: int) -> int`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def add(a: int, b: int) -> int:
    return a + b</code></pre>
</div>
</details>

**Exercise 2** — Rewrite this with **`X | None`** instead of **`Optional[X]`** (3.10+). <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def f(x: int | None) -> str:
    return str(x)</code></pre>
</div>
</details>

**Exercise 3** — **`list[int]`** versus **`List[int]`** imported from **`typing`** (the older style). <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># PEP 585: list[int] is built in from 3.9 onward; List[] is the older style for 3.8.</code></pre>
</div>
</details>

**Exercise 4** — A **`HasName`** Protocol with a **`name: str`** attribute (a **`@property`** or a field). <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from typing import Protocol

class HasName(Protocol):
    @property
    def name(self) -> str: ...</code></pre>
</div>
</details>

**Exercise 5** — **`Literal[1, 2, 3]`** for a **`mode`** parameter. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from typing import Literal

def set_mode(mode: Literal[1, 2, 3]) -> None:
    pass</code></pre>
</div>
</details>

**Exercise 6** — A **`TypedDict`** with keys **`id`** and **`label`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from typing import TypedDict

class Row(TypedDict):
    id: int
    label: str</code></pre>
</div>
</details>

**Exercise 7** — Why does **`Any`** effectively turn off checking for an expression? <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Any is compatible with every type; use it sparingly.</code></pre>
</div>
</details>

### Intermediate

**Exercise 8** — A generic **`Stack[T]`** class with **`push(self, x: T) -> None`** and **`pop(self) -> T`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from typing import Generic, TypeVar

T = TypeVar("T")

class Stack(Generic[T]):
    def __init__(self) -> None:
        self._d: list[T] = []
    def push(self, x: T) -> None:
        self._d.append(x)
    def pop(self) -> T:
        return self._d.pop()</code></pre>
</div>
</details>

**Exercise 9** — A **bounded `TypeVar`**: `T = TypeVar("T", bound=Readable)` (with a **`Readable`** Protocol). <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from typing import Protocol, TypeVar

class Readable(Protocol):
    def read(self, n: int = -1) -> bytes: ...

T = TypeVar("T", bound=Readable)

def load(r: T) -> bytes:
    return r.read()</code></pre>
</div>
</details>

**Exercise 10** — **`overload`** for **`parse`**, accepting **`str` → `int`** and **`bytes` → `int`** (an illustrative signature). <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from typing import overload

@overload
def parse(x: str) -> int: ...
@overload
def parse(x: bytes) -> int: ...
def parse(x: str | bytes) -> int:
    return int(x)</code></pre>
</div>
</details>

**Exercise 11** — **`Final`** and **`ClassVar`**: what each one is for. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Final: a constant you do not reassign. ClassVar: a class attribute, not an instance attribute.</code></pre>
</div>
</details>

**Exercise 12** — **`Annotated[int, "positive"]`**: what it is for (PEP 593). <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Metadata for third-party tools; the type stays int for the checker.</code></pre>
</div>
</details>

**Exercise 13** — **`cast(T, x)`**: when should you use it? <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># When you know the type better than inference does; document it (it is not a runtime conversion).</code></pre>
</div>
</details>

**Exercise 14** — **`Required`** / **`NotRequired`** in a **`TypedDict`** (fully available in 3.11). <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Optional keys typed explicitly in a TypedDict, including total=False and inheritance.</code></pre>
</div>
</details>

### Hard

**Exercise 15** — **`ParamSpec`** / **`Concatenate`** to type a decorator (a sketch). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Preserve *args and **kwargs across wrappers (PEP 612).</code></pre>
</div>
</details>

**Exercise 16** — **`TypeGuard`** for an **`is_str_list`** predicate. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from typing import TypeGuard

def is_str_list(x: list[object]) -> TypeGuard[list[str]]:
    return all(isinstance(i, str) for i in x)</code></pre>
</div>
</details>

**Exercise 17** — The difference between **nominal** and **structural** typing. Give a **`Protocol`** example. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Nominal: declared inheritance. Structural: compatible methods and attributes (static duck typing).</code></pre>
</div>
</details>

**Exercise 18** — Why did **`from __future__ import annotations`** postpone evaluation of annotations? <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Forward references without quotes; that storage behavior is the default from 3.11 onward.</code></pre>
</div>
</details>

**Exercise 19** — A **`mypy.ini`** config with **`strict = True`**: the trade-off. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># More useful errors, but a costly migration on large legacy codebases.</code></pre>
</div>
</details>

**Exercise 20** — **`@runtime_checkable`** on a **`Protocol`**: what it gives you, and the limit. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># isinstance(x, Proto) becomes possible; it only checks that the methods exist, not their signatures.</code></pre>
</div>
</details>

## Next in the track

[Packaging and pyproject.toml](/en/python-packaging-pyproject/): make a project installable.

## Amazon

<a href="https://www.amazon.com/s?k=python+type+hints+book&tag=roboteducatif-20" class="btn btn-action" rel="nofollow sponsored noopener" target="_blank">Check today's price on Amazon</a> (Python static typing)
