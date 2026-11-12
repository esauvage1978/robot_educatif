---
layout: ../../layouts/EnPost.astro
title: "CLI planner project (5/6): argparse and the command line"
description: "Subcommands add, list, and remove, date arguments, exit codes, and messages on stderr. Twelve exercises for an argparse planner CLI."
updated: "29 March 2026"
faqSchema:
  - question: "Why split parse_args from running the service?"
    answer: "You can test dispatch(args) with a namespace you build by hand, without spawning a process or parsing real argv."
  - question: "Where should error messages go?"
    answer: "Print user and file errors on stderr with print(..., file=sys.stderr), and leave the process with a non-zero code such as sys.exit(1)."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

**`argparse`** structures the CLI with **`ArgumentParser`** and **`add_subparsers`** for **`agenda add`**, **`agenda list`**, and **`agenda remove`**. Each subcommand has its own arguments: **`--title`**, **`--start`** (an ISO string), **`--from` / `--to`** for the list, **`--id`** for deletion. Return **`sys.exit(1)`** on a user error or a corrupt file.

Previous chapter: [tests with pytest](/en/python-planner-cli-4-pytest/).

## Good practice

- A clear **`prog`** and **`description`** on the main parser.
- Error messages on **`stderr`** (`print(..., file=sys.stderr)`).
- **`type=`** to parse dates with a small function that calls **`datetime.fromisoformat`**.

## Exercises (12)

**Exercise 1** — Create a parser with an **`add`** subcommand and a **`--title`** argument. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import argparse
p = argparse.ArgumentParser()
sub = p.add_subparsers(required=True)
add = sub.add_parser("add")
add.add_argument("--title", required=True)</code></pre>
</div>
</details>

**Exercise 2** — Parse the fake **`argv`** **`["list", "--from", "2026-01-01T00:00:00"]`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">args = p.parse_args(["list", "--from", "2026-01-01T00:00:00"])</code></pre>
</div>
</details>

**Exercise 3** — A **`main()`** function that returns an **integer code**, and **`sys.exit(main())`** in **`__main__.py`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def main() -> int:
    ...
    return 0

if __name__ == "__main__":
    raise SystemExit(main())</code></pre>
</div>
</details>

**Exercise 4** — **`ArgumentDefaultsHelpFormatter`** so the help text shows defaults. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">argparse.ArgumentParser(formatter_class=argparse.ArgumentDefaultsHelpFormatter)</code></pre>
</div>
</details>

**Exercise 5** — A global **`try/except`** in **`main`** so **`ValueError`** becomes a message and exit code 2. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">try:
    ...
except ValueError as e:
    print(e, file=sys.stderr)
    return 2</code></pre>
</div>
</details>

**Exercise 6** — Why separate **`parse_args`** from **running** the service (testability)? <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># You can test dispatch(args) with a namespace built by hand.</code></pre>
</div>
</details>

**Exercise 7** — A global **`--file`** option for the JSON path (parent parser). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">p.add_argument("--file", type=Path, default=None)</code></pre>
</div>
</details>

**Exercise 8** — A simple table using aligned **`str.format`** or **f-strings**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">for e in events:
    print(f"{e.start:%Y-%m-%d %H:%M}  {e.title}")</code></pre>
</div>
</details>

**Exercise 9** — Automatic **`--help`**: check that it mentions the subcommands. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">python -m agenda_cli --help</code></pre>
</div>
</details>

**Exercise 10** — Reading **stdin** is not required in v1 — a note for v2. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Import events from CSV or JSON on stdin.</code></pre>
</div>
</details>

**Exercise 11** — Avoid **`print`** in the service: pass **results** up to the CLI layer. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># The service returns list[Event]; cli formats it — service tests without capturing stdout.</code></pre>
</div>
</details>

**Exercise 12** — **`argparse` vs `click`**: one advantage of each. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">argparse: stdlib; click: ergonomics, colors, testing with CliRunner.</code></pre>
</div>
</details>

## Next

[Shipping and extensions](/en/python-planner-cli-6-shipping/)

## Amazon

<a href="https://www.amazon.com/s?k=python+command+line+book&tag=roboteducatif-20" class="btn btn-action" rel="nofollow sponsored noopener" target="_blank">Check today's price on Amazon</a>
