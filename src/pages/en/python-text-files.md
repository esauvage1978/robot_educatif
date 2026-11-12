---
layout: ../../layouts/EnPost.astro
title: "Python: reading and writing text files"
description: "Read and write a text file in Python with open, with, modes r, w, and a, and UTF-8. Twenty corrected exercises so you can practice on real files."
updated: "2 November 2026"
faqSchema:
  - question: "How do you open a text file in Python?"
    answer: "Use with open(path, \"r\", encoding=\"utf-8\") as f, then read() or a loop over the file. The with block closes the file even if an error happens."
  - question: "What is the difference between modes w and a?"
    answer: "Mode w recreates the file and drops the previous contents. Mode a appends at the end and leaves what is already there."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

> **Direct answer (November 2026)** — Open a text file in Python with `open(path, "r", encoding="utf-8")`, read it with `.read()` or a loop over the file, then **close** it, or use `with open(...) as f:` so you do not leak a file descriptor.

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/programmation/python/">Python course</a> · Lesson 8 — files</nav>

This lesson is part of the [beginner Python course](/programmation/python/) (variables, loops, lists, functions). Prerequisite: [lists and strings](/en/python-lists-and-strings/). Next: [errors and debugging](/en/python-errors-and-debugging/).

![Sample text file open in an editor — teaching illustration](/images/illustrations/python-fichiers-texte.webp)

**Files** let you **keep** data between two runs of the program (scores, preferences, logs). In Python you open a file with **`open`**, but the recommended form is the **`with`** block: the file is **closed automatically**, even if an error happens in the middle.

## 1. Where is the file?

By default, Python looks for the file **in the working directory** (often the folder where you run `python script.py`). For the first exercises, put the `.txt` **next to** your script, or give a clear path.

## 2. Read the whole contents

```python
with open("notes.txt", "r", encoding="utf-8") as f:
    contenu = f.read()
print(contenu)
```

- **`"r"`**: read.
- **`encoding="utf-8"`**: accents and special characters come out correctly (a habit to pick up from the start).

## 3. Read line by line

```python
with open("notes.txt", "r", encoding="utf-8") as f:
    for ligne in f:
        print(ligne.strip())
```

Or `lignes = f.readlines()` to get a **list** of strings (often with `\n` at the end: remember `strip()`).

## 4. Write (overwrite or create)

```python
with open("sortie.txt", "w", encoding="utf-8") as f:
    f.write("line 1\n")
    f.write("line 2\n")
```

**`"w"`**: the file is **recreated** (the previous contents are lost). To **add** at the end without wiping everything, use **`"a"`** (append):

```python
with open("invites.txt", "a", encoding="utf-8") as f:
    f.write("New first name\n")
```

## 5. File not found

If the name is wrong or the file is missing, Python raises **`FileNotFoundError`**. You can catch that error with **`try` / `except`** ([lesson 9](/en/python-errors-and-debugging/)).

## Exercises (20)

Put the **files** in the same folder as your script when the prompt assumes that (for example **`notes.txt`**). The **solutions** are hidden by default: click **Show the solution** to compare your code.

### Easy

**Exercise 1** — Open **`hello.txt`** for reading (**`"r"`**, **`encoding="utf-8"`**), read the **whole** contents with **`read()`**, then print them. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">with open("hello.txt", "r", encoding="utf-8") as f:
    contenu = f.read()
print(contenu)</code></pre>
</div>
</details>

**Exercise 2** — Count the **number of lines** in a text file by walking **`for ligne in f:`** (create a **`data.txt`** with several lines first). <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = 0
with open("data.txt", "r", encoding="utf-8") as f:
    for _ in f:
        n += 1
print(n)</code></pre>
</div>
</details>

**Exercise 3** — Create (or overwrite) **`sortie.txt`** in mode **`"w"`** and write **two** lines with **`write`**, ending each line with **`"\n"`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">with open("sortie.txt", "w", encoding="utf-8") as f:
    f.write("line 1\n")
    f.write("line 2\n")</code></pre>
</div>
</details>

**Exercise 4** — **Append** a line **`"new\n"`** at the end of **`log.txt`** in mode **`"a"`** (**append**). <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">with open("log.txt", "a", encoding="utf-8") as f:
    f.write("new\n")</code></pre>
</div>
</details>

**Exercise 5** — Read a file in full and print the **number of characters** in the text you read (**`len`** on the result of **`read()`**). <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">with open("notes.txt", "r", encoding="utf-8") as f:
    contenu = f.read()
print(len(contenu))</code></pre>
</div>
</details>

**Exercise 6** — Walk a file **line by line** and print each line **without** the final newline, using **`strip()`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">with open("data.txt", "r", encoding="utf-8") as f:
    for ligne in f:
        print(ligne.strip())</code></pre>
</div>
</details>

**Exercise 7** — Use **`readlines()`** to get a **list** of lines, then print the **number of items** in that list. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">with open("data.txt", "r", encoding="utf-8") as f:
    lignes = f.readlines()
print(len(lignes))</code></pre>
</div>
</details>

### Intermediate

**Exercise 8** — **Copy** the contents of **`source.txt`** to **`dest.txt`** by reading all the text, then writing it in mode **`"w"`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">with open("source.txt", "r", encoding="utf-8") as f:
    texte = f.read()
with open("dest.txt", "w", encoding="utf-8") as f:
    f.write(texte)</code></pre>
</div>
</details>

**Exercise 9** — Ask the user for a **first name** and **append it** at the end of **`invites.txt`** (mode **`"a"`**), with a **newline** after the name. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">prenom = input("First name? ")
with open("invites.txt", "a", encoding="utf-8") as f:
    f.write(prenom + "\n")</code></pre>
</div>
</details>

**Exercise 10** — Read **`entree.txt`** and print **only the first line** (you can use **`readline()`** or **`read().splitlines()[0]`** if the file is not empty). <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">with open("entree.txt", "r", encoding="utf-8") as f:
    premiere = f.readline().strip()
print(premiere)</code></pre>
</div>
</details>

**Exercise 11** — Print **only the last line** of a non-empty file by walking the lines and **remembering** the last one you read. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">derniere = ""
with open("journal.txt", "r", encoding="utf-8") as f:
    for ligne in f:
        derniere = ligne
print(derniere.strip())</code></pre>
</div>
</details>

**Exercise 12** — Write a **list** of three strings into **`liste.txt`**, **one per line**, with a **`for`** loop and **`write`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">items = ["apple", "pear", "banana"]
with open("liste.txt", "w", encoding="utf-8") as f:
    for x in items:
        f.write(x + "\n")</code></pre>
</div>
</details>

**Exercise 13** — Read the whole file, then use **`splitlines()`** to get a list of lines **without** the end-of-line characters; print that list. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">with open("data.txt", "r", encoding="utf-8") as f:
    texte = f.read()
lignes = texte.splitlines()
print(lignes)</code></pre>
</div>
</details>

**Exercise 14** — Copy **`a.txt`** to **`b.txt`** **line by line** (read with **`for ligne in f`**, write each line into the second file). <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">with open("a.txt", "r", encoding="utf-8") as src, open("b.txt", "w", encoding="utf-8") as dst:
    for ligne in src:
        dst.write(ligne)</code></pre>
</div>
</details>

### Hard

**Exercise 15** — Count the **non-empty** lines (after **`strip()`**, the string must not be empty). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = 0
with open("data.txt", "r", encoding="utf-8") as f:
    for ligne in f:
        if ligne.strip():
            n += 1
print(n)</code></pre>
</div>
</details>

**Exercise 16** — Read **`texte.txt`** and write **`majuscules.txt`** with the same contents passed through **`upper()`**. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">with open("texte.txt", "r", encoding="utf-8") as f:
    contenu = f.read()
with open("majuscules.txt", "w", encoding="utf-8") as f:
    f.write(contenu.upper())</code></pre>
</div>
</details>

**Exercise 17** — Ask for a **file name** and some **text**; create that file in **`"w"`** with that text (a single **`write`**). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">nom = input("File name? ")
texte = input("Contents? ")
with open(nom, "w", encoding="utf-8") as f:
    f.write(texte)</code></pre>
</div>
</details>

**Exercise 18** — From a list **`nombres = [1, 2, 3]`**, write **`nums.txt`** with **one number per line** (convert each item with **`str`** before writing). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">nombres = [1, 2, 3]
with open("nums.txt", "w", encoding="utf-8") as f:
    for n in nombres:
        f.write(str(n) + "\n")</code></pre>
</div>
</details>

**Exercise 19** — Read **`entiers.txt`** (one line = one integer), build a list of **integers** with **`int`** on each **`strip()`** line, then print the **sum** (**`sum`**). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">vals = []
with open("entiers.txt", "r", encoding="utf-8") as f:
    for ligne in f:
        vals.append(int(ligne.strip()))
print(sum(vals))</code></pre>
</div>
</details>

**Exercise 20** — Combine **`read().splitlines()`** and **`" | ".join(...)`** to read a file where each line is a word, then write **`resume.txt`** containing **a single line** with the words separated by **` | `**. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">with open("mots.txt", "r", encoding="utf-8") as f:
    mots = f.read().splitlines()
ligne = " | ".join(mots)
with open("resume.txt", "w", encoding="utf-8") as f:
    f.write(ligne + "\n")</code></pre>
</div>
</details>

## Next in the course

Handling **errors** cleanly ([lesson 9](/en/python-errors-and-debugging/)) keeps your program from crashing hard if a file is missing or a number conversion fails. Next project in the same series: [Todo notebook](/programmation/carnet-todo/) or [Battleship](/programmation/bataille-navale/).

## Amazon

<a href="https://www.amazon.com/s?k=python+data+files+book&tag=roboteducatif-20" class="btn btn-action" rel="nofollow sponsored noopener" target="_blank">Check today's price on Amazon</a>
