---
layout: ../../layouts/EnPost.astro
title: "CLI planner project (2/6): data, pathlib, and JSON"
description: "Where the planner file lives, how pathlib.Path reads and writes UTF-8 JSON atomically, and what a missing file returns. Twelve exercises."
updated: "2 November 2026"
faqSchema:
  - question: "Why Path.replace instead of overwriting the file directly?"
    answer: "If the process is killed mid-write, a direct overwrite can leave truncated JSON. Write a temporary file in the same folder, then replace. On the same volume that replacement is atomic."
  - question: "Where should the default file live?"
    answer: "Path.home() / \".agenda\" / \"agenda.json\" fits personal use. ./data/agenda.json makes tests and sharing the repository easier. Document the choice in the README."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/programmation/projet-python-intermediaire-agenda/">Planner CLI project</a> · Part 2/6 — data and pathlib</nav>

> **Direct answer (November 2026)** — Store events in **`~/.agenda/agenda.json`** with **`pathlib.Path`**, **`encoding="utf-8"`**, and an **atomic write** (a temporary file, then `replace`) so a crash mid-save does not leave corrupt JSON.

After the [brief](/en/python-planner-cli-1-brief/), this chapter isolates the **`storage`** module of the [planner CLI project](/programmation/projet-python-intermediaire-agenda/): paths, and reliable JSON reads and writes. Next up: [part 3 — model and classes](/en/python-planner-cli-3-model/).

The **`storage`** module owns everything that touches the **disk**: where the file is, and how to **read** and **write** it. You use **`pathlib.Path`** to build paths (`Path.home() / ".agenda" / "agenda.json"`) and **`json.load` / `json.dump`** with **`encoding="utf-8"`**. To avoid a **corrupt** file if the process dies mid-write, a simple strategy is to write a **temporary file** in the same directory, then **`Path.replace`** (atomic on the same volume in the usual case).

## The `storage` module contract

- **`load_events(path: Path) -> dict`**: if the file does not exist, return **`{"events": []}`** (or an equivalent structure you document).
- **`save_events(path: Path, data: dict) -> None`**: serialize with **`indent=2`** so a Git diff stays readable.
- Create **parent directories** with **`path.parent.mkdir(parents=True, exist_ok=True)`** before writing.

## Exercises (12)

**Exercise 1** — Write the expression **`Path.home() / ".agenda" / "agenda.json"`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
p = Path.home() / ".agenda" / "agenda.json"</code></pre>
</div>
</details>

**Exercise 2** — Load JSON with **`json.loads`** from the string **`'{"events":[]}'`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import json
data = json.loads('{"events":[]}')</code></pre>
</div>
</details>

**Exercise 3** — Why **`ensure_ascii=False`** in **`json.dump`** for French text? <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Keep readable Unicode characters instead of escaping them as \uXXXX.</code></pre>
</div>
</details>

**Exercise 4** — Handle **`JSONDecodeError`** on load: a user message and a non-zero CLI exit (sketch). <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">try:
    ...
except json.JSONDecodeError as e:
    print("Invalid JSON file:", e)
    sys.exit(1)</code></pre>
</div>
</details>

**Exercise 5** — Use **`tempfile.NamedTemporaryFile`** or **`mkstemp`** next to the target file, write, then **`replace`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Write to tmp in the same folder; Path(tmp).replace(target) for atomicity.</code></pre>
</div>
</details>

**Exercise 6** — Test **`load_events`** with pytest **`tmp_path`** and a missing file. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def test_load_missing(tmp_path):
    p = tmp_path / "x.json"
    assert load_events(p) == {"events": []}</code></pre>
</div>
</details>

**Exercise 7** — Difference between **`read_text`** and **`open` + `json.load`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># read_text loads everything as str; json.load expects a file opened in text mode.</code></pre>
</div>
</details>

**Exercise 8** — Check that the loaded root really contains the key **`events`** and that it is a **`list`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">if not isinstance(data.get("events"), list):
    raise ValueError("Invalid format")</code></pre>
</div>
</details>

**Exercise 9** — The environment variable **`AGENDA_FILE`** overrides the default path. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import os
from pathlib import Path
def data_path() -> Path:
    return Path(os.environ.get("AGENDA_FILE", Path.home() / ".agenda" / "agenda.json"))</code></pre>
</div>
</details>

**Exercise 10** — **`Path.resolve()`** before you compare paths — a use case. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Normalize .. and symlinks to tell whether two paths point at the same file.</code></pre>
</div>
</details>

**Exercise 11** — **`chmod`** or permissions: why can a file in **`~/.agenda`** be a problem on a multi-user machine? <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">On a shared machine, plan for mode 600 (Unix) — out of scope for v1, but worth noting.</code></pre>
</div>
</details>

**Exercise 12** — Write a test: save, then reload, and you get the **same** data (deep equality). <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def test_roundtrip(tmp_path):
    d = {"events": [{"id": "1", "title": "A", "start": "2026-01-01T12:00:00", "duration_minutes": None, "note": ""}]}
    p = tmp_path / "a.json"
    save_events(p, d)
    assert load_events(p) == d</code></pre>
</div>
</details>

## FAQ

**Why `Path.replace` rather than overwriting the file directly?**
If the process is killed during the write, a direct overwrite can leave truncated JSON. Writing a temporary file in the same folder, then **`replace`**, limits that risk (an atomic operation on the same volume).

**Where should the default file live?**
`Path.home() / ".agenda" / "agenda.json"` fits personal use; `./data/agenda.json` makes tests and sharing the repository easier — document the choice in the README.

**Do you need `indent=2` in `json.dump`?**
Yes, for a file you can read by hand and for clear Git diffs. At very high volume in production you might compact the JSON. That is not the case here.

## Next

[Domain model and classes](/en/python-planner-cli-3-model/)

## Amazon

<a href="https://www.amazon.com/s?k=python+json+files+book&tag=roboteducatif-20" class="btn btn-action" rel="nofollow sponsored noopener" target="_blank">Check today's price on Amazon</a>
