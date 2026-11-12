---
layout: ../../layouts/EnPost.astro
title: "Intermediate Python: virtual environments and pip"
description: "Python virtual environments: create a venv, activate it, install with pip, and freeze a requirements file. Twenty corrected exercises, step by step."
updated: "2 November 2026"
faqSchema:
  - question: "Why use venv instead of pip install --user?"
    answer: "--user installs into a user folder shared by all of your scripts. A venv isolates one project so versions do not get mixed."
  - question: "Should I commit the .venv folder to Git?"
    answer: "No. Add .venv/ to .gitignore and commit requirements.txt."
  - question: "pip says externally managed environment on Linux. What should I do?"
    answer: "Some distributions block global pip. Create a venv (recommended) or use the system package (apt install python3-xxx)."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

> **Direct answer (November 2026)** — On Python 3, create an isolated environment with `python -m venv .venv`, activate it (`source .venv/bin/activate`, or `.venv\Scripts\activate` on Windows), then install packages with `pip install`. The usual order is **venv first**, **pip next**, inside the activated environment.

> **Intermediate track (2/6)** — [Intermediate Python hub](/programmation/python-intermediaire/) · [Lesson 1 — modules](/python-inter-modules-imports/) · [Lesson 3 — pathlib](/en/python-pathlib/)

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/programmation/python-intermediaire/">Intermediate Python</a> · venv and pip</nav>

If you install libraries with **`pip`** straight onto the **system Python** or onto **one shared interpreter**, several projects end up **depending on the same packages** at the **same version numbers**. A project that requires **`requests` 2.28** and another that assumes **`requests` 2.32** cannot live cleanly in a single global `site-packages`. The typical result is **“it worked yesterday”** after an update, or **conflicts** with packages managed by the operating system (especially on Linux, where **`sudo pip install`** can **break** distribution tools).

A **virtual environment** (`venv`, a standard-library module since Python 3.3) creates a **self-contained folder** that holds a **copy** (or links) of the Python interpreter, the **`pip`** and **`python`** scripts, and above all a **`site-packages`** directory **dedicated** to that project. You can have **one venv per project**, each with its own version graph, **without touching** the rest of the machine.

## 1. Create a venv

The canonical command is **`python -m venv PATH`**. **`-m venv`** makes sure you create the environment **with the same Python version** as the one you invoke (`python3.11 -m venv .venv` if you want to pin 3.11 explicitly).

```bash
python -m venv .venv
```

**Good practice**: name the folder **`.venv`** or **`venv`** (a convention IDEs recognize widely). **Add that folder to `.gitignore`**: it can be **regenerated** from the source and from **`requirements.txt`**, but it is **large**, **binary**, and **specific to the OS** (Windows paths versus Linux). What you version is the **dependency manifest**, not the installed environment.

## 2. Activate the environment

**Activation** does not “move” files. It **changes `PATH`** (and sometimes other variables) so that the **`python`** and **`pip`** commands in the terminal point at **`.venv\Scripts`** (Windows) or **`.venv/bin`** (Unix). That is why you should **check** which `pip` you are installing with (`where pip` / `which pip`) when something looks odd.

- **Windows (PowerShell)**: `.\.venv\Scripts\Activate.ps1` (if script execution is allowed; otherwise **`cmd`**: `.\.venv\Scripts\activate.bat`).
- **macOS / Linux**: `source .venv/bin/activate`

The prompt often shows **`(.venv)`**. To leave: **`deactivate`** (the shell returns to its configuration from before activation). Without activation, you can still call **`.\.venv\Scripts\python.exe`** (Windows) or **`.venv/bin/python`** by path. That is handy in **CI** or in scripts.

## 3. Install packages and freeze dependencies

**`pip`** is the **package manager** installed in the venv. By default it downloads from **PyPI** (the Python Package Index). Packages are **downloaded** (often prebuilt **wheels**) and then **installed** into the **active venv's** `site-packages`.

```bash
pip install requests
pip freeze > requirements.txt
```

On another machine (or for a teammate):

```bash
python -m venv .venv
# activate the venv
pip install -r requirements.txt
```

**Pin the versions**: a **`requirements.txt`** file produced by **`pip freeze`** lists the whole tree with **exact versions** (`requests==2.31.0`, and so on), which **reproduces** the environment. For a **prototype** or a course, a looser file (`requests>=2.28,<3`) can be enough, but in **production** or when **debugging** an old bug, **pinned versions** avoid “deploys that are not like production.” Tools such as **pip-tools** (`pip-compile`) go further (dependency resolution with comments). That is outside this lesson, and worth knowing about.

**Prefer `python -m pip`** to **`pip`** alone: **`pip`** then runs **with the same interpreter** as **`python`**, which avoids installing into the wrong environment when several Pythons coexist.

## 4. Update without breaking everything

```bash
pip list --outdated
pip install --upgrade requests
```

On a **large project**, a major version bump can **change APIs** or **transitive dependencies**. A sound habit: read the **release notes**, run the **tests** after each targeted update, and avoid **`pip install --upgrade`** on **everything** with no plan. **`pip check`** reports **missing** or **inconsistent dependencies** after a series of manual installs.

## 5. PyPI, trust, and good habits

**PyPI** is the default **public** index; **`pip`** reaches it over HTTPS. You **never** publish **secrets** there (API tokens, passwords). They stay in **environment variables** or a **secrets manager**, not in **`requirements.txt`**. Watch for **typosquatting** (package names close to a known library): check the **official name** in the project's docs. For **private** dependencies, teams set up **private indexes** or URLs — again, with no credentials in Git.

**Note**: **Conda** / **mamba** are another ecosystem (often useful in **data science**). Here we stay with **venv + pip**, the standard for a “classic” **Python application**.

## External resources

- **[venv — documentation](https://docs.python.org/3/library/venv.html)**: creating an environment, folder contents, activation.
- **[Installing packages](https://packaging.python.org/tutorials/installing-packages/)** (Python Packaging User Guide): venv, `pip`, current good practice.
- **[pip user guide](https://pip.pypa.io/en/stable/user_guide/)**: useful options (`install`, `freeze`, constraints).
- **[The Python Package Index (PyPI)](https://pypi.org/)**: package search and official metadata.

## Frequently asked questions

**Why `venv` rather than `pip install --user`?**  
`--user` installs into a user folder **shared** by all of your scripts. A **venv** isolates **one project** so versions do not get mixed.

**Should I commit the `.venv` folder to Git?**  
No. Add `.venv/` to **`.gitignore`** and version **`requirements.txt`**.

**`pip` says “externally managed environment” (Linux)?**  
Some distributions block global `pip`. Create a **venv** (recommended) or use the system package (`apt install python3-xxx`).

## Exercises (20)

Each exercise reuses the **commands and ideas** from the lesson. The **solutions** are hidden by default.

### Easy level

**Exercise 1** — Command to create a venv named **`.venv`** in the current folder. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">python -m venv .venv</code></pre>
</div>
</details>

**Exercise 2** — After you activate the venv, which command prints the path of the **`pip`** in use? (hint: **`where pip`** on Windows, **`which pip`** on Unix). <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">where pip</code></pre>
</div>
</details>

**Exercise 3** — Install the **`colorama`** package (as an example) with **`pip`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">pip install colorama</code></pre>
</div>
</details>

**Exercise 4** — Generate **`requirements.txt`** from the current environment. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">pip freeze > requirements.txt</code></pre>
</div>
</details>

**Exercise 5** — Reinstall everything from **`requirements.txt`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">pip install -r requirements.txt</code></pre>
</div>
</details>

**Exercise 6** — List the packages installed in the active venv. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">pip list</code></pre>
</div>
</details>

**Exercise 7** — Why add **`.venv/`** to **`.gitignore`**? (answer in one sentence in a Python comment). <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># The venv folder is large and can be recreated from requirements.txt; it should not be versioned.
</code></pre>
</div>
</details>

### Intermediate level

**Exercise 8** — **`pip`** command to **uninstall** a package named **`foo`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">pip uninstall foo</code></pre>
</div>
</details>

**Exercise 9** — Show **outdated** packages with pip. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">pip list --outdated</code></pre>
</div>
</details>

**Exercise 10** — Sketch a **`requirements-dev.txt`**: in a comment, explain what belongs there (**test tools**, **linter**) compared with production **`requirements.txt`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text"># requirements.txt: runtime dependencies (for example requests)
# requirements-dev.txt: pytest, black, ruff — for development only, not for deploy.</code></pre>
</div>
</details>

**Exercise 11** — Why can **`pip install`** with no version break an old project? (2 sentences). <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># pip installs the latest compatible version, which can remove an API the code uses.
# That is why you pin versions or put constraints in requirements.</code></pre>
</div>
</details>

**Exercise 12** — Command to show **pip's help** for the **`install`** subcommand. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">pip install --help</code></pre>
</div>
</details>

**Exercise 13** — Name **two** risks of installing packages with **`sudo pip`** on the system Python (Linux). <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Breaks packages managed by the system package manager; mixes permissions and versions.</code></pre>
</div>
</details>

**Exercise 14** — Write the **minimal** sequence (commands) to clone a repository, create a venv, activate it, install **`requirements.txt`**, and run **`python main.py`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">git clone REPO_URL
cd project
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python main.py</code></pre>
</div>
</details>

### Hard level

**Exercise 15** — Use **`python -m pip`** rather than **`pip`** alone: explain the advantage (one sentence). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Makes sure pip matches the same Python interpreter as the one you invoked.</code></pre>
</div>
</details>

**Exercise 16** — Pin **`requests`** at **2.31.0** in **`requirements.txt`** and give the install command. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text"># requirements.txt
requests==2.31.0

# pip install -r requirements.txt</code></pre>
</div>
</details>

**Exercise 17** — What is the difference between **`pip check`** and **`pip list`**? <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># pip list: inventory of installed packages.
# pip check: checks for missing or conflicting dependencies.</code></pre>
</div>
</details>

**Exercise 18** — Good practice: the environment variable **`PIP_DISABLE_PIP_VERSION_CHECK=1`** in CI — what is it for? (short answer). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Avoids interactive or useless messages during automated builds.</code></pre>
</div>
</details>

**Exercise 19** — Propose a Git **branch policy**: when to regenerate **`requirements.txt`** (a team of 2). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Each time you add or update a functional dependency, on the matching feature branch, after local tests.</code></pre>
</div>
</details>

**Exercise 20** — Scenario: you need to **reproduce** a production bug. Why does a **`requirements.txt`** with pinned versions help? <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># You install the same version graph as production and remove gaps caused by a newer dependency.</code></pre>
</div>
</details>

## What comes next

[pathlib](/en/python-pathlib/): work with paths and files without concatenating strings by hand.

## On Amazon

- Python deployment books: <a href="https://www.amazon.com/s?k=python+deployment+book&tag=roboteducatif-20" class="btn btn-action" rel="nofollow sponsored noopener" target="_blank">Check today's price on Amazon</a>
