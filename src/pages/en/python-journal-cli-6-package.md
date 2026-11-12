---
layout: ../../layouts/EnPost.astro
title: "CLI journal project (6/6): package, pyproject, and shipping"
description: "Finish pyproject.toml, the journal-stats script entry, the README, tests, and a trial upload to TestPyPI. Twelve exercises before you ship the CLI."
updated: "29 March 2026"
faqSchema:
  - question: "What does twine check dist/* check?"
    answer: "It checks the long description from the README and the package metadata before you upload."
  - question: "Where should PyPI credentials live?"
    answer: "In ~/.pypirc outside the repository, or in CI secrets. Do not commit them."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

Finish **`pyproject.toml`**: a **`[project]`** table with **`name = "journal-stats"`** (change the name if it is already taken on PyPI), **`version`**, **`requires-python`**, **`dependencies`**, and **`[project.scripts]`** so **`journal-stats = "journal_stats.cli:main"`**. Use a **`src/journal_stats/`** tree for the **src layout**.

**`python -m build`** produces a wheel and an sdist; **`twine upload dist/*`** sends them to **TestPyPI** for a trial. The **README** documents installation, an example **`journal-stats analyze a.log b.log`**, the **`--async` / `--no-async`** options, and **`--json`** for machine-readable output.

The packaging lesson is [pyproject.toml](/en/python-packaging-pyproject/). Project hub: [advanced Python journal CLI](/programmation/projet-python-avance-journal/).

## Exercises (12)

**Exercise 1** — A **`[project.scripts]`** table for **`journal-stats`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-toml">[project.scripts]
journal-stats = "journal_stats.cli:main"</code></pre>
</div>
</details>

**Exercise 2** — **`packages = { find = {} }`** under **`[tool.setuptools]`** with **`where = ["src"]`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-toml">[tool.setuptools.packages.find]
where = ["src"]</code></pre>
</div>
</details>

**Exercise 3** — **`pip install -e .`** then **`journal-stats --help`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">.venv\Scripts\activate ; pip install -e . ; journal-stats --help</code></pre>
</div>
</details>

**Exercise 4** — **`[project.optional-dependencies]`**: a **`dev`** extra with **`mypy`**, **`pytest`**, and **`ruff`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-toml">[project.optional-dependencies]
dev = ["mypy>=1.8", "pytest>=8", "ruff>=0.3"]</code></pre>
</div>
</details>

**Exercise 5** — **`python -m build`** needs the **`build`** package. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">pip install build</code></pre>
</div>
</details>

**Exercise 6** — **`twine check dist/*`** — what it does. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Checks the README long description and the metadata.</code></pre>
</div>
</details>

**Exercise 7** — **`[project.urls]`** for Home and Repository. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-toml">[project.urls]
Homepage = "https://example.org"
Repository = "https://github.com/..."</code></pre>
</div>
</details>

**Exercise 8** — Do not publish **secrets** from `.pypirc` — where do you store them? <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">~/.pypirc outside the repo; CI secret tokens.</code></pre>
</div>
</details>

**Exercise 9** — **`uvx`** or **`pipx install`** for an **isolated CLI** — the advantage. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">One environment per tool, without polluting the system Python.</code></pre>
</div>
</details>

**Exercise 10** — A **`CHANGELOG.md`** — the first **0.1.0** entry. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-markdown">## 0.1.0
- Multi-file analysis, stats by level, optional JSON output.</code></pre>
</div>
</details>

**Exercise 11** — Compare this project with the **planner project** — a skill that is new here. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">A personal answer — asyncio, strict typing, packaging.</code></pre>
</div>
</details>

**Exercise 12** — Keep going toward **open-source contributions** — a suggestion. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Pick a good first issue on a typed Python project.</code></pre>
</div>
</details>

## Wrap-up

You now have the **through-line** for a complete **log tool**: **generators**, **decorators**, **asyncio** plus an executor, **typing**, and a **package**. Adapt the line format to your real files.

## Amazon

<a href="https://www.amazon.com/s?k=python+packaging+book&tag=roboteducatif-20" class="btn btn-action" rel="nofollow sponsored noopener" target="_blank">Check today's price on Amazon</a>
