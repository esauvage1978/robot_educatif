---
layout: ../../layouts/EnPost.astro
title: "Python pathlib: paths and files (Path, UTF-8, glob)"
description: "pathlib tutorial: Path, portable paths, UTF-8 read/write, existence, glob. 20 exercises. Works with plain Python files — no robot required."
updated: "31 October 2026"
---

Some book links below are affiliate links. Check today’s price. This lesson works with plain Python files on your computer — no robot required.

Treating paths as **plain strings** (`"folder" + "\\" + "file.txt"`) quickly leads to bugs: **Windows** separators (`\`) vs **POSIX** (`/`), double slashes, ambiguous **relative** paths depending on the current directory, and forgotten **encoding** on read. The **`pathlib`** module (standard library, stable since Python 3.4+) provides **`Path`** objects that **represent** a path abstractly, then **render** it correctly for the system when needed.

A **`Path`** can be **composed** with the **`/`** operator (overloaded), list a directory, test **file** vs **folder**, and read or write **text** in one line. It has become the **recommended** approach for **new code**; the older **`os.path`** module remains readable in legacy code, but **`pathlib`** unifies the API and improves **readability**.

| Task | `pathlib` | `os.path` (older OS path helpers) |
|------|-----------|-----------|
| Join parts | `Path("a") / "b" / "c.txt"` | `os.path.join("a", "b", "c.txt")` |
| File exists? | `Path("f.txt").exists()` | `os.path.exists("f.txt")` |
| Parent folder | `Path("a/b.txt").parent` | `os.path.dirname("a/b.txt")` |

Prefer `Path / "a" / "b"` over string concatenation for user paths — it is clearer and less error-prone across Windows and POSIX.

## 1. Create and compose a path

**`Path("relative")`** is relative to the current working directory; **`Path("/absolute")`** (on Unix) or **`Path("C:/Users/...")`** (on Windows) fix a root. The **`/`** operator avoids manual concatenation: each segment is a path piece, and the final representation respects the OS.

```python
from pathlib import Path
root = Path(".")
file = root / "data" / "notes.txt"
```

**Best practices**: in **new code**, prefer **`pathlib.Path`** and **`/`** over repeated **`os.path.join`**. For paths **without disk access** (pure logic), **`PurePath`** exists, but **`Path`** is enough most of the time.

## 2. Read and write text

The methods **`read_text`** and **`write_text`** wrap file opening and **full** read/write in memory — handy for **small or medium** files (config, export). For very large files, prefer streaming (`open()` or `Path.open()`).

```python
p = Path("hello.txt")
p.write_text("Hello\n", encoding="utf-8")
print(p.read_text(encoding="utf-8"))
```

**Encoding**: on Windows, the historical default encoding is not always UTF-8; **explicitly set `encoding="utf-8"`** for text to avoid **`UnicodeDecodeError`** when deploying on another OS.

## 3. Existence, type and resolution

Before reading, we often check **`exists()`**; **`is_file()`** and **`is_dir()`** distinguish file and folder. **`resolve()`** can return an **absolute**, **normalised** path (resolving `..`), useful to compare two paths or display them clearly.

```python
if p.exists():
    print("found")
if p.is_file():
    ...
```

## 4. Walk a folder and patterns (`glob`)

**`iterdir()`** enumerates the **direct children** of a directory. **`glob("**/*.py")`** or **`rglob("*.py")`** apply recursive **patterns** — handy to process all files of a type without writing a manual `os.walk` loop.

```python
for child in Path(".").iterdir():
    print(child.name)
```

**Best practices**: remember that **`glob`** depends on the **real disk contents**; in tests, isolate a **temporary directory** (`tmp_path` with **pytest**) to stay reproducible.

## External resources

- **[pathlib — Documentation](https://docs.python.org/3/library/pathlib.html)**: `Path`, `PurePath` types, methods.
- **[pathlib / os.path equivalence](https://docs.python.org/3/library/pathlib.html#corresponding-tools)**: official table.
- **[open() and encoding](https://docs.python.org/3/library/functions.html#open)**: reminder on `encoding` and text mode.

## Exercises (20)

The exercises lock in the **reflexes**: composition with **`/`**, **UTF-8**, existence tests. **Solutions** are hidden by default.

### Easy level

**Exercise 1** — Create **`Path("a.txt")`** and print its **representation** with **`print`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
print(Path("a.txt"))</code></pre>
</div>
</details>

**Exercise 2** — Build the path **`folder/sub/file.txt`** with the **`/`** operator from **`Path("folder")`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
p = Path("folder") / "sub" / "file.txt"
print(p)</code></pre>
</div>
</details>

**Exercise 3** — Write **`"hi"`** into **`out.txt`** with **`write_text`** and **`encoding="utf-8"`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
Path("out.txt").write_text("hi", encoding="utf-8")</code></pre>
</div>
</details>

**Exercise 4** — Read the contents of **`out.txt`** with **`read_text`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
print(Path("out.txt").read_text(encoding="utf-8"))</code></pre>
</div>
</details>

**Exercise 5** — Check whether **`data.txt`** exists with **`.exists()`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
print(Path("data.txt").exists())</code></pre>
</div>
</details>

**Exercise 6** — Print the **file name alone** (**`name`**) for **`/tmp/a/b.txt`** (use **`Path`**). <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
print(Path("/tmp/a/b.txt").name)</code></pre>
</div>
</details>

**Exercise 7** — Print the **parent folder** with **`.parent`** for **`Path("folder/file.py")`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
print(Path("folder/file.py").parent)</code></pre>
</div>
</details>

### Intermediate level

**Exercise 8** — List the **files** in the current directory whose suffix is **`.txt`** (**`iterdir`** loop + **`.suffix`** test). <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
for p in Path(".").iterdir():
    if p.is_file() and p.suffix == ".txt":
        print(p)</code></pre>
</div>
</details>

**Exercise 9** — Use **`glob("*.py")`** in the current folder to list **`.py`** files. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
for p in Path(".").glob("*.py"):
    print(p)</code></pre>
</div>
</details>

**Exercise 10** — Create a **`tmp`** folder with **`Path("tmp").mkdir(exist_ok=True)`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
Path("tmp").mkdir(exist_ok=True)</code></pre>
</div>
</details>

**Exercise 11** — Resolve an **absolute** path with **`.resolve()`** from **`Path("README.md")`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
print(Path("README.md").resolve())</code></pre>
</div>
</details>

**Exercise 12** — Best practice: explain why `Path / "a" / "b"` is better than string concatenation for user paths. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Path normalises separators for the OS and avoids double slashes or missing ones.</code></pre>
</div>
</details>

**Exercise 13** — Open in **binary** with **`Path`**: **`Path("b.bin").read_bytes()`** (or **`write_bytes`**). Print the length of the bytes read. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
p = Path("b.bin")
p.write_bytes(b"\x00\x01")
print(len(p.read_bytes()))</code></pre>
</div>
</details>

**Exercise 14** — Walk **`rglob("*.md")`** from **`Path(".")`** to find **Markdown** files recursively (watch performance on large trees). <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
for p in Path(".").rglob("*.md"):
    print(p)</code></pre>
</div>
</details>

### Hard level

**Exercise 15** — Function **`read_if_exists(path: str) -> str | None`**: return the text or **`None`** if the file does not exist (**`FileNotFoundError`** handled cleanly). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path

def read_if_exists(path: str):
    p = Path(path)
    if not p.exists():
        return None
    return p.read_text(encoding="utf-8")</code></pre>
</div>
</details>

**Exercise 16** — Rename **`old.txt`** to **`new.txt`** with **`.rename`**. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
Path("old.txt").rename(Path("new.txt"))</code></pre>
</div>
</details>

**Exercise 17** — Count the lines of a text file with **`read_text`** and **`splitlines()`** (handle empty files safely). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
def line_count(p):
    return len(Path(p).read_text(encoding="utf-8").splitlines())</code></pre>
</div>
</details>

**Exercise 18** — **`Path.home() / "Documents"`**: what is **`home()`** for? <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># The current user's home directory (varies by OS).</code></pre>
</div>
</details>

**Exercise 19** — Security best practice: why avoid **`eval(Path(...).read_text())`**? <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># A text file may contain arbitrary code that would then execute: uncontrolled code execution.</code></pre>
</div>
</details>

**Exercise 20** — Write a function **`copy_text(src, dst)`** with **`read_text`** / **`write_text`** and **`encoding="utf-8"`** everywhere. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path

def copy_text(src, dst):
    t = Path(src).read_text(encoding="utf-8")
    Path(dst).write_text(t, encoding="utf-8")</code></pre>
</div>
</details>

## Mini file project (pathlib)

Create a `sensor_logs/` folder, write three `.txt` files with `Path.write_text(..., encoding="utf-8")`, then list them with `Path("sensor_logs").glob("*.txt")` and print the line count of each.

## Next in the series

Next: [Classes and OOP](/python-inter-poo-classes/) — structure data and behaviour with classes. When one folder of scripts becomes a project, the [pyproject.toml packaging guide](/en/python-packaging-pyproject/) shows how to declare it. Also in this series: [types and input](/en/python-types-and-input/) · [higher or lower terminal game](/en/python-mini-terminal-game/). Full outline: [intermediate Python course](/programmation/python-intermediaire/).

Practice books (affiliate links):

- [Python pathlib / files — Amazon UK](https://www.amazon.co.uk/s?k=python+pathlib+files+book&tag=roboteducatif-21) · [Amazon.com](https://www.amazon.com/s?k=python+pathlib+files+book&tag=roboteducatif-20)

*Author: Emmanuel Sauvage · updated 31 October 2026.*
