---
layout: ../../layouts/EnPost.astro
title: "CLI planner project (1/6): brief and folder layout"
description: "Lock the scope of a planner CLI before you code: functional goals, the src/ layout, the JSON event format, and success criteria. Twelve exercises."
updated: "29 March 2026"
faqSchema:
  - question: "What is the minimum JSON shape for an event?"
    answer: "The file root is an object with an events list. Each event has id, title, start as an ISO string, duration_minutes as an integer or null, and note, which may be empty."
  - question: "Should id be a UUID or an auto-incrementing integer?"
    answer: "A UUID stays unique without a central coordinator if you later merge files. Integers are easier to read on a small local project. Pick one and write down why."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

Before you write code, you **fix the scope**: what to build, for whom, with which **data** and which **files**. This first article is the **brief** for the **planner CLI**: manage **events** (title, start date and time, optional duration, note), store them in a **single JSON file** per user (default path `~/.agenda/agenda.json` or `./data/agenda.json`, whichever you document), and support **commands**: add, list by date range, delete by identifier.

Project hub: [intermediate Python planner CLI](/programmation/projet-python-intermediaire-agenda/).

## Functional goals

1. **Add** an event with an ISO 8601 date (`2026-03-29T14:00:00`) or a simpler format that you document.
2. **List** events between two dates (inclusive).
3. **Delete** an event by a stable **`id`** (UUID or an incrementing integer — pick one and justify it).
4. **Errors**: clear messages if the file is missing (first run), the JSON is corrupt, or the date is invalid.

## Recommended tree

```
agenda_cli/
  pyproject.toml        (optional for this course; requirements.txt is enough)
  README.md
  src/
    agenda_cli/
      __init__.py
      __main__.py       (entry point: python -m agenda_cli)
      model.py          (data structures / minimal validation)
      storage.py        (JSON read and write + pathlib)
      service.py        (business logic)
      cli.py            (argparse)
tests/
  test_model.py
```

This split prepares **unit tests** without launching the CLI every time.

## Data model (draft)

Each event is a **JSON object** with at least: **`id`**, **`title`**, **`start`** (ISO string), **`duration_minutes`** (integer or `null`), **`note`** (string, may be empty). The file root is an **object** with an **`events`** key: a list of objects.

## Exercises (12)

The **solutions** are indicative; adapt them to your format choices.

### Application

**Exercise 1** — In **three sentences**, write the user goal of the planner CLI. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Example: see upcoming appointments from the terminal; add them without a graphical interface; store everything locally in a portable JSON file.</code></pre>
</div>
</details>

**Exercise 2** — List **two** risks if all the code sits in a **single** `main.py`. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Hard to test; no reuse; UI, persistence, and business rules mixed together.</code></pre>
</div>
</details>

**Exercise 3** — Propose a valid **JSON example** with **2** events and the **`events`** key. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-json">{
  "events": [
    {"id": "1", "title": "Meeting", "start": "2026-03-29T10:00:00", "duration_minutes": 60, "note": ""},
    {"id": "2", "title": "Swim", "start": "2026-03-30T18:00:00", "duration_minutes": null, "note": "pool"}
  ]
}</code></pre>
</div>
</details>

**Exercise 4** — Justify **UUID** for **`id`** versus auto-incrementing integers. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">UUID: unique without a central coordinator if you merge files; integers: easier to read on a small local project.</code></pre>
</div>
</details>

**Exercise 5** — Success criterion: how do you check, **without** a graphical interface, that "list between two dates" works? <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Automated tests on service.list_between(d1, d2) with in-memory data or a temporary file.</code></pre>
</div>
</details>

**Exercise 6** — Name one **path** to exclude from the Git repository for the virtual environment. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">.venv/</code></pre>
</div>
</details>

**Exercise 7** — Which **PEP** recalls the order of imports? (an intermediate reminder). <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">PEP 8 (imports section)</code></pre>
</div>
</details>

**Exercise 8** — Write the **outline** of a README: venv install, how to launch, main commands. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-markdown"># Planner CLI
## Installation
python -m venv .venv && pip install -e .
## Usage
agenda add … / python -m agenda_cli …
</code></pre>
</div>
</details>

**Exercise 9** — Define a **business error** (for example an overlap) that you can **postpone** to v2 instead of v1. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">V1: no overlap detection; V2: a warning or a refusal.</code></pre>
</div>
</details>

**Exercise 10** — An optional **config file** sketch: why separate the **data path** from the code? <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">User paths without rebuilding; tests can use a temporary directory.</code></pre>
</div>
</details>

**Exercise 11** — A table **feature → module** (model / storage / service / cli). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Field validation → model; read and write the file → storage; list and delete rules → service; argparse → cli.</code></pre>
</div>
</details>

**Exercise 12** — **Definition of Done**: three criteria before you move on to part 2. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Tree created; sample JSON checked by hand; README with the planned commands.</code></pre>
</div>
</details>

## Next

[Data, pathlib, and loading JSON](/en/python-planner-cli-2-pathlib/)

## Amazon

<a href="https://www.amazon.com/s?k=python+practical+projects+book&tag=roboteducatif-20" class="btn btn-action" rel="nofollow sponsored noopener" target="_blank">Check today's price on Amazon</a>
