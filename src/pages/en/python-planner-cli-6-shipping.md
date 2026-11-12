---
layout: ../../layouts/EnPost.astro
title: "CLI planner project (6/6): shipping, quality, and extensions"
description: "requirements.txt or pyproject, a console entry point, the README, and extension ideas such as ICS export and reminders. Twelve exercises."
updated: "29 March 2026"
faqSchema:
  - question: "When is the planner project delivered?"
    answer: "When someone else can clone it, create a venv, pip install -e . or pip install -r requirements.txt, run python -m agenda_cli or the agenda command, and follow the README without asking you questions."
  - question: "Why does this planner stay synchronous?"
    answer: "Local file I/O is fast. This scope does not need async."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

The **project is delivered** when someone else can **clone** it, create a venv, run **`pip install -e .`** (or **`pip install -r requirements.txt`**), launch **`python -m agenda_cli`** or the **`agenda`** command, and follow the **README** without asking you questions. Add a **license** (MIT if you want something simple) and a **`.gitignore`** (`.venv`, `__pycache__`, local test files).

Project hub: [intermediate Python planner CLI](/programmation/projet-python-intermediaire-agenda/). Advanced track: [advanced Python](/programmation/python-avance/).

## Possible extensions

- **iCalendar** export (`.ics`) so you can import events into a calendar.
- A **`--json`** mode for machine-readable output (automation).
- Remote **sync** (out of scope: an HTTP API plus auth).

## Exercises (12)

**Exercise 1** — A **`[project.scripts]`** line for the **`agenda`** command. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-toml">[project.scripts]
agenda = "agenda_cli.cli:main"</code></pre>
</div>
</details>

**Exercise 2** — A **release** checklist: a Git tag, the version in **`pyproject.toml`**, a changelog. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Bump the version; git tag v0.2.0; release notes in CHANGELOG.md</code></pre>
</div>
</details>

**Exercise 3** — Why does **`pip install -e .`** make **development** easier? <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># The source tree stays the source of truth; no reinstall on every edit.</code></pre>
</div>
</details>

**Exercise 4** — An **ICS export** idea: which library, or a minimal format with no dependency? <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Generate a minimal RFC 5545 VEVENT by hand for a prototype.</code></pre>
</div>
</details>

**Exercise 5** — **`pre-commit`** with **ruff** — why it helps a team. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Hooks before commit for style and obvious errors.</code></pre>
</div>
</details>

**Exercise 6** — Your personal **“project finished”** criterion: three checkboxes. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Green tests; README up to date; add/list/remove work on a clean machine.</code></pre>
</div>
</details>

**Exercise 7** — Publish to **TestPyPI** — you need a **unique** module name. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">test.pypi.org for trials; a name like agenda-cli-&lt;handle&gt; is often free.</code></pre>
</div>
</details>

**Exercise 8** — **`python -m agenda_cli`** versus a console script: the difference for the user. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">A console script adds the Scripts directory to PATH; -m needs the package to be importable.</code></pre>
</div>
</details>

**Exercise 9** — An optional **Dockerfile**: one `CMD` line for the image. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-dockerfile">CMD ["agenda", "list", "--from", "...", "--to", "..."]</code></pre>
</div>
</details>

**Exercise 10** — Retrospective: what did you learn about **pathlib** on this project? <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">A personal answer — working with user paths.</code></pre>
</div>
</details>

**Exercise 11** — A link to the **advanced project**: why does the planner stay **synchronous**? <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Local file I/O is fast; this scope does not need async.</code></pre>
</div>
</details>

**Exercise 12** — Next teaching step: [advanced journal CLI](/programmation/projet-python-avance-journal/). <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Follow the series “Advanced Python project — journal CLI”.</code></pre>
</div>
</details>

## Next project

[Journal analyzer — advanced project](/programmation/projet-python-avance-journal/)

## Amazon

<a href="https://www.amazon.com/s?k=python+best+practices+book&tag=roboteducatif-20" class="btn btn-action" rel="nofollow sponsored noopener" target="_blank">Check today's price on Amazon</a>
