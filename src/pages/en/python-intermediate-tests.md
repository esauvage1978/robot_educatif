---
layout: ../../layouts/EnPost.astro
title: "Python intermediate: automated tests and code quality"
description: "Automated tests with assert, unittest, and pytest, plus ruff and flake8. Why you test, official docs, and 20 exercises with solutions."
updated: "29 March 2026"
faqSchema:
  - question: "Why should production checks not rely on assert?"
    answer: "assert raises AssertionError when the condition is false, but Python removes assert statements when you run with python -O. Use assert for quick local checks and for pytest. Use unittest or explicit checks when a failure must still happen in an optimized production run."
  - question: "How is a unit test different from an integration test?"
    answer: "A unit test exercises one isolated piece, often a function or a class with stand-in dependencies. An integration test runs several components together, sometimes with real files or other input and output. This lesson stays on unit-test basics and on linters."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

Writing **automated tests** means capturing the **expected behavior** as code you can **run again** whenever you want (locally, or in **CI** before a merge). When you change a function, the tests report **regressions**: either the behavior changed by mistake, or you need to **update** the test so it matches a new business rule. Without that net, a “small fix” can **break another module** before you notice, sometimes only after release.

People usually separate **unit tests** (one isolated unit, often a function or a class with stand-in dependencies), **integration tests** (several components together), and **end-to-end tests** (the real application). This lesson focuses on the **basics** of unit tests and on **static analysis** (linters). The two complement each other: a linter finds **suspicious** code without running it; tests check the **logic** with examples.

## 1. `assert`: a quick guard

```python
assert doubler(2) == 4
```

An **`assert`** condition raises **`AssertionError`** when it is false. **Careful**: with **`python -O`** (optimize), Python **strips** `assert` statements. Do not rely on them for **security checks** in production. For a serious **test suite**, use **`unittest`** or **`pytest`**.

## 2. `unittest`: a “test class” style

The **`unittest`** module follows **xUnit** conventions: a class inherits from **`TestCase`**, methods named **`test_*`** hold the scenarios, and methods such as **`assertEqual`** produce **structured** failure messages.

```python
import unittest

class TestMath(unittest.TestCase):
    def test_carre(self):
        self.assertEqual(3 * 3, 9)

if __name__ == "__main__":
    unittest.main()
```

**Discovery**: `unittest` finds tests by **name** and by **inheritance**. Running the file executes **`unittest.main()`**.

## 3. `pytest`: plain assertions and discovery

**`pytest`** is widely used in current projects: you can write **`test_*`** functions with plain **`assert`**, with no required subclass. Automatic discovery walks **`test_*.py`** files or a **`tests/`** directory.

File **`test_foo.py`**:

```python
def doubler(x):
    return x * 2

def test_doubler():
    assert doubler(3) == 6
```

Run: **`pytest`** (install it in the venv: **`pip install pytest`**).

**Best practices**: an explicit **`test_*`** name (`test_doubler_positif`); group files in **`tests/`** so **application code** and **test code** stay apart. **pytest fixtures** prepare reusable data — look at those after the basics.

## 4. Static quality (linters)

Tools such as **`ruff`** (fast, many rules) or **`flake8`** (PEP 8 style, imports, complexity) **read the source text** and report inconsistencies, unused imports, or obvious mistakes **without running** the whole program. That is **not** a substitute for tests: “clean” code can still be **functionally wrong**. Combine **linters and tests** for a workable balance of **style and correctness**.

## External resources

- **[unittest — documentation](https://docs.python.org/3/library/unittest.html)**.
- **[pytest — documentation](https://docs.pytest.org/en/stable/)**: getting started and good practice.
- **[Python Packaging User Guide](https://packaging.python.org/)**: installable projects and test dependencies.
- **[Ruff](https://docs.astral.sh/ruff/)**: a fast linter and formatter (a modern alternative to a separate flake8 + isort stack).

## Exercises (20)

The exercises alternate **`assert`**, **`unittest`**, and **`pytest`** sketches. **Solutions** are hidden by default.

### Easy level

**Exercise 1** — Write **`assert 1 + 1 == 2`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">assert 1 + 1 == 2</code></pre>
</div>
</details>

**Exercise 2** — A **`unittest`** test: **`self.assertTrue(3 > 2)`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import unittest

class T(unittest.TestCase):
    def test_ok(self):
        self.assertTrue(3 > 2)</code></pre>
</div>
</details>

**Exercise 3** — **`self.assertEqual(a, b)`** with **`a=5`**, **`b=5`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import unittest
unittest.TestCase().assertEqual(5, 5)</code></pre>
</div>
</details>

**Exercise 4** — A function **`pair(n)`**, and a **`pytest`** test **`assert pair(2) is True`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def pair(n):
    return n % 2 == 0

def test_pair():
    assert pair(2) is True</code></pre>
</div>
</details>

**Exercise 5** — **`self.assertRaises(ValueError, int, "abc")`** in **unittest**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import unittest
unittest.TestCase().assertRaises(ValueError, int, "abc")</code></pre>
</div>
</details>

**Exercise 6** — Name **two** advantages of automated tests (short sentences). <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Catch regressions after a refactor.
# Document the expected behavior with examples you can run.</code></pre>
</div>
</details>

**Exercise 7** — Why not rely only on **`print`** to check a result? <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># You cannot replay it automatically; it is easy to forget before a commit.</code></pre>
</div>
</details>

### Intermediate level

**Exercise 8** — **`pytest.raises`** to check **`ZeroDivisionError`** on **`1/0`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import pytest

def test_zero():
    with pytest.raises(ZeroDivisionError):
        1 / 0</code></pre>
</div>
</details>

**Exercise 9** — A simple **`pytest`** fixture: a function **`donnee()`** that returns **`[1,2,3]`** via **`@pytest.fixture`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import pytest

@pytest.fixture
def donnee():
    return [1, 2, 3]

def test_len(donnee):
    assert len(donnee) == 3</code></pre>
</div>
</details>

**Exercise 10** — **`setUp`** on **`unittest.TestCase`** to initialize a resource. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import unittest

class T(unittest.TestCase):
    def setUp(self):
        self.x = 10

    def test_x(self):
        self.assertEqual(self.x, 10)</code></pre>
</div>
</details>

**Exercise 11** — Best practice: a test should check **one** main thing. Restate that in one sentence. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># A failing test should make clear which assumption is false.</code></pre>
</div>
</details>

**Exercise 12** — A parametrized test with **`pytest.mark.parametrize`**, inputs **`(0,0)`** and **`(1,2)`**, for **`f(a,b)=a+b`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import pytest

@pytest.mark.parametrize("a,b,r", [(0, 0, 0), (1, 2, 3)])
def test_add(a, b, r):
    assert a + b == r</code></pre>
</div>
</details>

**Exercise 13** — The difference between a **unit test** and an **integration test** (a short answer). <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Unit: one isolated function; integration: several modules or real I/O.</code></pre>
</div>
</details>

**Exercise 14** — Why can **`ruff check .`** save time before a commit? <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># It catches typos, unused imports, and style issues before a full run.</code></pre>
</div>
</details>

### Hard level

**Exercise 15** — **`mock.patch`**, the idea only: what is **`unittest.mock`** for when the code under test calls the network? <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Temporarily replace a dependency (for example requests.get) with a fake response.</code></pre>
</div>
</details>

**Exercise 16** — The **TDD** strategy in three step words (a comment). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Red: write a test that fails. Green: the smallest code that passes. Refactor: clean up.</code></pre>
</div>
</details>

**Exercise 17** — Coverage with **`pytest-cov`**: what does **`--cov`** measure? <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># The share of lines executed during the tests (an indicator, not proof of quality).</code></pre>
</div>
</details>

**Exercise 18** — **`approx`** for floats: **`pytest.approx(0.1 + 0.2)`** versus **`0.3`**. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import pytest
assert 0.1 + 0.2 == pytest.approx(0.3)</code></pre>
</div>
</details>

**Exercise 19** — Avoid **nondeterministic** tests: give one example of a bad practice. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># assert time.time() == ... or depending on file order without sorting.</code></pre>
</div>
</details>

**Exercise 20** — A **before-PR** checklist: list **four** items (tests, lint, docs, format). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Tests green locally; ruff/flake8 OK; changelog or docstring updated; black formatting if the team uses it.</code></pre>
</div>
</details>

## Next in the series

[Regular expressions](/en/python-intermediate-regex/): search and check patterns in text.

## Amazon (affiliate)

Python software-testing books:

<a href="https://www.amazon.com/s?k=python+software+testing+book&tag=roboteducatif-20" class="btn btn-action" rel="nofollow sponsored noopener" target="_blank">Check today's price on Amazon</a>
