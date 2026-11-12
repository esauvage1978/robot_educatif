---
layout: ../../layouts/EnPost.astro
title: "CLI planner project (4/6): tests with pytest"
description: "tmp_path fixtures, service tests, storage mocks, and coverage of errors such as an empty title or corrupt JSON. Twelve pytest exercises."
updated: "29 March 2026"
faqSchema:
  - question: "Why monkeypatch the current time?"
    answer: "Freezing datetime.now() keeps the test deterministic and avoids flaky failures that depend on the clock."
  - question: "When should you use xfail?"
    answer: "To document a failure you expect until it is fixed. Do not use it to hide real bugs."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

Tests **isolate** **`AgendaService`** with a **temporary file** per test (`tmp_path`, provided by pytest) or an in-memory **fake** `storage`. Aim for **one assertion per behavior**: a successful add, an empty list, deleting an unknown ID, invalid JSON.

Previous chapter: [domain model](/en/python-planner-cli-3-model/).

## `tests/` layout

- **`test_storage.py`**: round trip, missing file.
- **`test_service.py`**: business rules with controlled data.
- **`test_cli.py`** (optional): **click**'s `CliRunner` if you move to click later. With **argparse**, use `subprocess`, or refactor `main()` so you can inject dependencies.

## Exercises (12)

**Exercise 1** — The command that runs pytest in verbose mode. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">pytest -v</code></pre>
</div>
</details>

**Exercise 2** — A pytest fixture that returns an **`AgendaService`** pointing at **`tmp_path / "a.json"`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import pytest

@pytest.fixture
def svc(tmp_path):
    return AgendaService(tmp_path / "a.json")</code></pre>
</div>
</details>

**Exercise 3** — A test with **`pytest.raises(ValueError)`** on an empty title. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">with pytest.raises(ValueError):
    svc.add_event(title=" ", ...)</code></pre>
</div>
</details>

**Exercise 4** — Why **`monkeypatch`** the current time in a deterministic test? <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Freeze datetime.now() to avoid flaky tests.</code></pre>
</div>
</details>

**Exercise 5** — Parametrize three cases for **`from_dict`** (ok, missing key, invalid date). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">@pytest.mark.parametrize("raw,exc", [(good, None), (bad, KeyError)])
def test_from_dict(raw, exc): ...</code></pre>
</div>
</details>

**Exercise 6** — **`coverage run -m pytest`** — what is it for? <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Measure which lines ran; spot branches that were never tested.</code></pre>
</div>
</details>

**Exercise 7** — An integration test: CLI **`add`** then **`list`** with **subprocess** and `tmp_path`. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># subprocess.run([sys.executable, "-m", "agenda_cli", "add", ...], env={**os.environ, "AGENDA_FILE": str(p)})</code></pre>
</div>
</details>

**Exercise 8** — Avoid **order-dependent tests** on UUIDs if you compare **sets** of IDs. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">assert {e.id for e in events} == expected_ids</code></pre>
</div>
</details>

**Exercise 9** — **`xfail`** for a known bug — when do you use it? <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Document an expected failure until it is fixed; do not hide real bugs.</code></pre>
</div>
</details>

**Exercise 10** — **`conftest.py`**: its role at the root of the tests. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Fixtures and hooks shared by every test module.</code></pre>
</div>
</details>

**Exercise 11** — Mock **`save_events`** to check that **you do not save** when validation fails. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def save_events(*a, **k):
    raise AssertionError("should not save")
# with mock.patch.object(storage, "save_events", save_events)</code></pre>
</div>
</details>

**Exercise 12** — A checklist before a PR: green tests, **lint**, **format**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">pytest ; ruff check ; optionally black --check</code></pre>
</div>
</details>

## Next

[CLI with argparse](/en/python-planner-cli-5-argparse/)

## Amazon

<a href="https://www.amazon.com/s?k=pytest+python+book&tag=roboteducatif-20" class="btn btn-action" rel="nofollow sponsored noopener" target="_blank">Check today's price on Amazon</a>
