---
layout: ../../layouts/EnPost.astro
title: "pyproject.toml: modern Python packaging (guide)"
description: "Learn pyproject.toml (PEP 621): venv, python -m build, wheels, console_scripts and salutcli mini-project. 20 exercises. Updated October 2026."
updated: "31 October 2026"
schemaUpdated: "2026-10-31"
faqSchema:
  - question: "What is pyproject.toml for?"
    answer: "It is the modern configuration file for a Python project: metadata (name, version), dependencies, CLI scripts and build backend choice, as defined by PEP 621."
  - question: "How do I install a project in development mode?"
    answer: "From the project root with an active venv, run pip install -e . (editable install). Source changes are picked up without reinstalling each time."
  - question: "Which command builds a wheel and an sdist?"
    answer: "After pip install build, run python -m build at the project root. Output files appear in dist/ (.whl and .tar.gz)."
---

**Short answer (October 2026):** to make a Python project **installable** with **`pip`** (Python’s package installer), describe it in **`pyproject.toml`** following **PEP 621** — a **PEP** (*Python Enhancement Proposal*, an official language change proposal). Build a **wheel** (`.whl` archive) with **`python -m build`**, then test with **`pip install -e .`** or **`pip install dist/….whl`**. This lesson sits on the [advanced Python track](/programmation/python-avance/) after [advanced typing](/python-av-typing-avance/) and leads into the [CLI journal packaging chapter (6/6)](/projet-av-journal-6-package-pyproject/).

Shipping a library or a **command-line application** means typing commands in a **terminal** (text window). **CLI** stands for *Command Line Interface*. You **package** code in a **standard** way: metadata, a clear **`src/`** layout, a **`console_scripts`** entry (the shell command name after install, e.g. `salutcli`), and **wheels** for **`pip`**. The **`pyproject.toml`** file holds this configuration. A **build backend** (tool that reads `pyproject.toml` and builds the distribution) is declared under **`[build-system]`** — common choices are **`setuptools`**, **`hatchling`**, **`flit`**, and **`poetry`**; this guide uses **setuptools**.

This lesson is **100% Python packaging** — no robot required. An editor and a [venv with pip](/python-inter-venv-pip/) (isolated virtual environment) are enough.

![Python terminal window showing pip and a version check](/images/lot2/python-plus-ou-moins-terminal.webp)

*Screenshot (Emmanuel Sauvage, Robot Éducatif — October 2026): check Python and pip in a terminal, preferably with an active venv.*

| Info | Detail |
| --- | --- |
| **Goal** | Valid `pyproject.toml`, build a wheel, install and run a CLI command |
| **Level** | Intermediate → advanced (exercises 15–20) |
| **Time** | 45–90 minutes (mini-project + exercises) |
| **Prerequisites** | [venv and pip](/python-inter-venv-pip/), Python basics, [pathlib](/en/python-pathlib/) helps |
| **Expected result** | A `dist/` folder with `.whl` + a working `salutcli` command (mini-project) |

<aside class="article-callout" role="note">
<p><strong>Before you start</strong></p>
<ul>
<li><strong>Python 3.10+</strong> installed (<code>python --version</code>).</li>
<li>Isolated environment: <code>python -m venv .venv</code> then activate it.</li>
<li>Build tool: <code>python -m pip install -U pip build</code>.</li>
<li>To publish on **PyPI** (Python Package Index): enable **two-factor authentication (2FA)**; never commit API tokens; use <code>twine</code> only when uploading.</li>
</ul>
</aside>

## 1. Minimal `pyproject.toml` (concept)

Three blocks are enough to start:

```toml
[build-system]
requires = ["setuptools>=61"]
build-backend = "setuptools.build_meta"

[project]
name = "mytool"
version = "0.1.0"
dependencies = ["requests>=2.28"]

[project.scripts]
mytool = "mytool.cli:main"
```

- **`[build-system]`** — which tool builds the wheel (here **setuptools**).
- **`[project]`** — name, version and dependencies (visible on **PyPI** if you publish).
- **`[project.scripts]`** — registers a shell command; **`mytool.cli:main`** points to **`main`** in **`cli.py`**.

## 2. Editable install

**`pip install -e .`** installs in **development** mode (**`-e`** = editable): source changes apply **without** reinstalling each time. The **`.`** is the folder that contains **`pyproject.toml`**.

**Check:** **`pip show mytool`** should list version and install path.

## 3. Wheel and sdist

**`python -m build`** creates two files under **`dist/`**:

- **wheel** (`.whl`) — pre-built archive; fast **`pip install`**.
- **sdist** (`.tar.gz`, source distribution) — source archive rebuilt on the user’s machine (slower).

For learning, a **local wheel** and **`pip install -e .`** are enough — no **PyPI** account required.

<figure>
<img src="/images/illustrations/projet-av-journal-6-package-pyproject.webp" alt="Pedagogical illustration: packaged Python project with pyproject.toml and installable wheel" width="960" height="540" loading="lazy" decoding="async" />
<figcaption>Target outcome: metadata in <code>pyproject.toml</code>, artefacts in <code>dist/</code> — Emmanuel Sauvage, Robot Éducatif, October 2026.</figcaption>
</figure>

## 4. Versions and dependencies

**Semantic versioning** uses **`MAJOR.MINOR.PATCH`** (e.g. **`1.2.3`**). In **`dependencies`**, **`~=`**, **`>=`**, **`<`** are **constraints** for the **`pip`** **resolver** (engine that picks compatible versions).

## Guided mini-project: `salutcli` command

Goal: an installable package that prints “Hello” with an optional name argument. About **30–40 minutes**.

### Folder layout (`src/`)

```text
salutcli/
├── pyproject.toml
├── README.md
└── src/
    └── salutcli/
        ├── __init__.py
        └── cli.py
```

### Files to create

**`src/salutcli/cli.py`**:

```python
import sys

def main() -> None:
    name = sys.argv[1] if len(sys.argv) > 1 else "world"
    print(f"Hello, {name}!")

if __name__ == "__main__":
    main()
```

**`pyproject.toml`** (full example):

```toml
[build-system]
requires = ["setuptools>=61"]
build-backend = "setuptools.build_meta"

[project]
name = "salutcli"
version = "0.1.0"
requires-python = ">=3.10"
dependencies = []

[project.scripts]
salutcli = "salutcli.cli:main"

[tool.setuptools.packages.find]
where = ["src"]
```

### Steps (run inside `salutcli/`)

1. Create the tree and files above.
2. Activate the venv, then **`pip install -e .`**
3. Run **`salutcli Ada`** → should print `Hello, Ada!`
4. Edit `cli.py` without reinstalling — editable mode picks up changes.
5. **`python -m build`** (install **`build`** first if needed).
6. Check **`dist/`** for `.whl` and `.tar.gz`.
7. (Optional) In a **fresh** venv: **`pip install dist/salutcli-0.1.0-py3-none-any.whl`**.

**Check:** `pip show salutcli` lists name, version and install location.

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| `ModuleNotFoundError` after `pip install -e .` | Check `where = ["src"]` and package folder under `src/`; review [venv and pip](/python-inter-venv-pip/) |
| `salutcli` not found | Reactivate the venv; on Windows, open a new terminal after install |
| `python -m build` fails | `pip install build`; validate TOML syntax |
| Wrong version installed | Bump `version` in `[project]` or `pip uninstall salutcli` |
| Imports the wrong package from cwd | Prefer **`src/` layout** |
| `ERROR: File "setup.py" not found` | Expected with **`pyproject.toml` only** — install **`build`** and run **`python -m build`**, not **`python setup.py`** |
| `twine upload` rejected | Check version (not already on PyPI), TestPyPI vs production, and **2FA** |

## FAQ

**Do I need PyPI to learn this?** No. Local wheels and `pip install` are enough. PyPI is for **publishing** to others.

**Wheel vs sdist?** A **wheel** installs as-is; an **sdist** is rebuilt from source on install.

**Do I still need `setup.py`?** For new projects, **`pyproject.toml` only** with setuptools ≥ 61 is standard.

## External resources

- **[Packaging Python](https://packaging.python.org/)**
- **[PEP 621](https://peps.python.org/pep-0621/)** — project metadata in `pyproject.toml`
- **[setuptools](https://setuptools.pypa.io/)**

## Exercises (20)

### Easy level

**Exercise 1** — Name the **two** common artefact files produced by **`python -m build`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">.whl (wheel) and .tar.gz (sdist)</code></pre>
</div>
</details>

**Exercise 2** — What does **`pip install -e .`** do? <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Editable install: pip links to the current project's sources.
# Changes under src/ apply without repeating pip install.</code></pre>
</div>
</details>

**Exercise 3** — Where do you declare a **CLI** `foo` pointing to **`pkg.cli:main`**? <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-toml">[project.scripts]
foo = "pkg.cli:main"</code></pre>
</div>
</details>

**Exercise 4** — Difference between historical setuptools **`install_requires`** and **`[project] dependencies`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># PEP 621 standardises metadata in [project].dependencies;
# setuptools maps them into wheel metadata (replaces legacy install_requires).</code></pre>
</div>
</details>

**Exercise 5** — Why is a **`src/` layout** recommended? <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Avoids accidentally importing the wrong package from the current directory.</code></pre>
</div>
</details>

**Exercise 6** — What is a **`MANIFEST.in`** file for? <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Include non-Python files in the sdist (data, templates).</code></pre>
</div>
</details>

**Exercise 7** — **`[project.optional-dependencies]`**: example **`dev`** with **`pytest`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-toml">[project.optional-dependencies]
dev = ["pytest>=7"]</code></pre>
</div>
</details>

### Intermediate level

**Exercise 8** — **`pip install`** command with the **`dev`** extra. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">pip install ".[dev]"</code></pre>
</div>
</details>

**Exercise 9** — Role of **`__version__`** in **`__init__.py`** vs **`importlib.metadata.version("pkg")`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># importlib.metadata reads the installed version from wheel metadata —
# source of truth after pip install (avoids drift from hard-coded __version__).</code></pre>
</div>
</details>

**Exercise 10** — **`requires-python = ">=3.10"`** in **`[project]`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-toml">requires-python = ">=3.10"</code></pre>
</div>
</details>

**Exercise 11** — Why **`twine upload`** rather than **`pip`** for PyPI? <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Dedicated upload tool with checks and secure HTTPS uploads to the index.</code></pre>
</div>
</details>

**Exercise 12** — **`packages = ["pkg"]`** in setuptools vs automatic **`find:`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># find discovers sub-packages; manual listing is fine for a simple structure.</code></pre>
</div>
</details>

**Exercise 13** — Name a **build backend** other than **setuptools**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">hatchling, flit, poetry-core, pdm-backend</code></pre>
</div>
</details>

**Exercise 14** — **`LICENSE`** file and **`[project] license`** — legal importance. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Clarifies reuse rights; required for a serious publication.</code></pre>
</div>
</details>

**Checkpoint before Hard level**: you can write a minimal `[project]` table, declare a `console_scripts` entry, build with `python -m build`, and install editable with `pip install -e .`. If any step fails, redo the `salutcli` mini-project first.

### Hard level

**Exercise 15** — **`dynamic = ["version"]`** with **`setuptools-scm`** — idea. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-toml">[project]
dynamic = ["version"]

[tool.setuptools_scm]</code></pre>
<p>Version is derived from Git tags (e.g. <code>v1.2.3</code> → <code>1.2.3</code>).</p>
</div>
</details>

**Exercise 16** — A **`pip install`** conflict resolves **two** versions of the same package — how **`pip`** chooses (resolver concept). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Backtracking on constraints; error if the graph is impossible.</code></pre>
</div>
</details>

**Exercise 17** — **`[tool.setuptools.package-data]`** for **non-`.py`** files. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-toml">[tool.setuptools.package-data]
"pkg" = ["data/*.json"]</code></pre>
</div>
</details>

**Exercise 18** — **`pip install --no-deps`**: risk. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Incomplete environment; runtime crash if dependencies are missing.</code></pre>
</div>
</details>

**Exercise 19** — **`uv`** / **`pip-tools compile`**: interest for a pinned **`requirements.txt`**. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Reproducible resolution with hashes for deployments.</code></pre>
</div>
</details>

**Exercise 20** — **Namespace packages** (`pkg.ns`) — one use case. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Plugins shipped separately under the same logical namespace (multiple wheels).</code></pre>
</div>
</details>

## End of the advanced track

Guided project: [CLI log analyser hub](/programmation/projet-python-avance-journal/) — apply this lesson in [packaging chapter 6/6](/projet-av-journal-6-package-pyproject/) (commands and file layout are language-independent).

## Go further (Python on this site)

- [pathlib: paths and files](/en/python-pathlib/)
- [Types and keyboard input](/en/python-types-and-input/)
- [Terminal guessing game mini-project](/en/python-mini-terminal-game/)
- [Advanced Python hub](/programmation/python-avance/)
- [Intermediate Python hub](/programmation/python-intermediaire/)
- [venv and pip lesson](/python-inter-venv-pip/)

## Amazon (affiliate)

Check today’s price on the listing. Partner link — commission possible on qualifying purchases, at no extra cost to you.

- <a href="/go/az-gb-340093262f" rel="sponsored nofollow noopener" class="affiliate-link">Python packaging books — Amazon.co.uk</a> — verify title and edition before buying.

*Emmanuel Sauvage — updated 31 October 2026.*
