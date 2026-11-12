---
layout: ../../layouts/EnPost.astro
title: "Python intermediate: regular expressions (the re module)"
description: "Python re: search, match, findall, groups, and sub. Raw strings, when a regex is the wrong tool, official docs, and 20 exercises."
updated: "2 November 2026"
faqSchema:
  - question: "When should you use re.search instead of re.match?"
    answer: "re.search scans the whole string and returns the first match. re.match only tests the start of the string. If the text you want can appear anywhere, use search. If the string must begin with the pattern, use match, or fullmatch when the entire string must match."
  - question: "Why do regex patterns use raw strings?"
    answer: "A raw string such as r\"\\d+\" stops Python from treating backslashes as its own escapes before the re engine sees them. That keeps digit classes, word characters, and literal dots easier to read than a doubled backslash."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/programmation/python-intermediaire/">Intermediate Python</a> · Lesson 6 — regular expressions</nav>

> **Direct answer (November 2026)** — Use the **`re`** module with **raw strings** (`r"..."`) to search (`search`), anchor at the start (`match`), list matches (`findall`), or replace (`sub`). Keep patterns **simple**, and write the intent in a comment.

A **regular expression** (**regex**) is a **compact notation** for a **family** of possible strings: “a run of digits,” “a word made of letters,” “a date in YYYY-MM form,” and so on. The standard **`re`** module compiles those patterns and applies them with **search**, **split**, or **replace** functions. It is **very effective** on semi-structured text (logs, exports). **Complex** patterns quickly become **hard to read and hard to maintain**. The rule of thumb: stay **simple**, **name the intent** in a comment, and consider a **parser** (HTML, JSON, or CSV with the **`csv`** module) when the format is rich or still changing.

This lesson is part of [intermediate Python](/programmation/python-intermediaire/) — after [tests and code quality](/en/python-intermediate-tests/), and before other modules on the [programming](/programmation/) track.

## 1. Search: `search` vs `match`

**`re.search(pattern, text)`** walks the **whole** string and returns the **first** match. **`re.match(pattern, text)`** tests only the **start** of the string (as if the pattern were implicitly anchored at the beginning). It matches the same text as `search` only when the pattern matches from the first character.

```python
import re
m = re.search(r"\d+", "abc123def")
if m:
    print(m.group())  # 123
```

**Raw strings**: prefer **`r"\d+"`** to **`"\\d+"`**. The **`r`** prefix limits surprises with **backslashes** (`\` as Python sees it, versus `\` as the regex engine sees it).

## 2. Every match: `findall` and `finditer`

**`findall`** returns a **list** of matches (strings, or tuples when the regex contains **groups**). **`finditer`** yields **`Match` objects** one by one. Use it when you need **positions** (`span()`) or **named groups** without loading every match into memory at once.

```python
re.findall(r"\w+", "a,b,c")  # alphanumeric words plus _
```

## 3. Replace: `sub`

**`re.sub(pattern, replacement, text)`** applies a **replacement** (a string or a function) to each match. A classic example is **collapsing repeated whitespace**.

```python
re.sub(r"\s+", " ", "a   b  c")  # a single space between words
```

## 4. Groups and extraction

**Parentheses** in the pattern define **capturing groups**: **`m.group(1)`** is the first pair, and so on. **Named groups** `(?P<name>...)` make longer patterns easier to read.

```python
m = re.match(r"(\d+)-(\d+)", "2026-03")
m.group(1), m.group(2)
```

**Limits**: validating an **email** or a **URL** “perfectly” with one regex is **hard** and often **imprecise**. In production you combine a **coarse regex** with business validation or a **proven library**. For **HTML** or **JSON**, do not use a regex as the main parser.

## External resources

- **[re — Documentation](https://docs.python.org/3/library/re.html)**: pattern syntax, functions, and flags.
- **[Regular expression syntax](https://docs.python.org/3/library/re.html#regular-expression-syntax)**: metacharacters, quantifiers, and character classes.
- **[Regular Expression HOWTO](https://docs.python.org/3/howto/regex.html)**: a step-by-step tutorial.

## Exercises (20)

The exercises stay on **short patterns**. **Solutions** are hidden by default.

### Easy level

**Exercise 1** — Find the first **digit** with **`re.search(r"\d", s)`** on **`"a7b"`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import re
m = re.search(r"\d", "a7b")
print(m.group())</code></pre>
</div>
</details>

**Exercise 2** — **`re.findall(r"\d+", "price 12 and 3")`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import re
print(re.findall(r"\d+", "price 12 and 3"))</code></pre>
</div>
</details>

**Exercise 3** — Replace **repeated spaces** with **one** space using **`re.sub`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import re
s = re.sub(r"\s+", " ", "a    b")
print(s)</code></pre>
</div>
</details>

**Exercise 4** — **`re.match(r"hi", "hi there")`**: what does **`group()`** return? <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import re
m = re.match(r"hi", "hi there")
print(m.group())  # hi</code></pre>
</div>
</details>

**Exercise 5** — Why does **`re.match`** fail to find **`"x"`** in **`"ax"`**? <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># match anchors at the start of the string; use search to look anywhere.</code></pre>
</div>
</details>

**Exercise 6** — Find **`"cat"`** or **`"dog"`** with **`re.search(r"cat|dog", s)`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import re
print(re.search(r"cat|dog", "my dog").group())</code></pre>
</div>
</details>

**Exercise 7** — **`re.IGNORECASE`** ignores case: **`re.search(r"abc", "ABC", re.I)`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import re
print(re.search(r"abc", "ABC", re.I).group())</code></pre>
</div>
</details>

### Intermediate level

**Exercise 8** — A capturing group: **`re.match(r"(\d{4})-(\d{2})", "2026-03")`**, then **`groups()`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import re
m = re.match(r"(\d{4})-(\d{2})", "2026-03")
print(m.groups())</code></pre>
</div>
</details>

**Exercise 9** — A **simplistic email** pattern **`r"[\w.+-]+@[\w-]+\.\w+"`**. State why it is not enough in production. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Edge cases (IDN, +, comments); prefer a library or server-side validation.</code></pre>
</div>
</details>

**Exercise 10** — **`re.split(r"[;,]", "a;b,c")`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import re
print(re.split(r"[;,]", "a;b,c"))</code></pre>
</div>
</details>

**Exercise 11** — **`re.fullmatch(r"\d+", "1234")`** for the **entire** string. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import re
print(re.fullmatch(r"\d+", "1234") is not None)</code></pre>
</div>
</details>

**Exercise 12** — **`re.sub(r"(\w+)", r"[\1]", "a b")`**. Understand the **backreference** **`\1`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import re
print(re.sub(r"(\w+)", r"[\1]", "a b"))</code></pre>
</div>
</details>

**Exercise 13** — Compile a pattern with **`re.compile(r"\d+")`** and reuse **`.search`**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import re
pat = re.compile(r"\d+")
print(pat.search("x99").group())</code></pre>
</div>
</details>

**Exercise 14** — Best practice: why limit the **length** of the text before a heavy regex on a file? <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Risk of catastrophic backtracking (ReDoS) on poorly chosen patterns.</code></pre>
</div>
</details>

### Hard level

**Exercise 15** — Extract every simplified **`http...` URL** with **`findall`** (a minimal pattern). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import re
texte = "see http://ex.com and https://a.org"
print(re.findall(r"https?://\S+", texte))</code></pre>
</div>
</details>

**Exercise 16** — **`re.DOTALL`**: what does the flag do for **`.`**? <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># The dot also matches a newline.</code></pre>
</div>
</details>

**Exercise 17** — On the string **`"2026-03"`**, use a **named group** for the year (a pattern of the form **`(?P<year>\d{4})`**), then print the year with **`m.group("year")`**. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import re
# Named group "year" (syntax: (?P&lt;name&gt;...) in the Python "re" docs)
m = re.match(r"(?P&lt;year&gt;\d{4})-(\d{2})", "2026-03")
print(m.group("year"))</code></pre>
</div>
</details>

**Exercise 18** — Escape a **literal dot**: match **`"3.14"`** with **`r"\d+\.\d+"`**. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import re
print(re.fullmatch(r"\d+\.\d+", "3.14"))</code></pre>
</div>
</details>

**Exercise 19** — **`re.escape("a+b")`**: what is it for? <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import re
# Escape metacharacters so a user string is searched for literally.
print(re.escape("a+b"))</code></pre>
</div>
</details>

**Exercise 20** — A function **`masquer_emails(texte)`** that replaces **`user@domain.tld`** with **`user@***`** using **`re.sub`** (a simple pattern). <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import re

def masquer_emails(texte):
    return re.sub(r"([\w.+-]+)@([\w.-]+)", r"\1@***", texte)</code></pre>
</div>
</details>

## Next in the series

Back to the [intermediate Python hub](/programmation/python-intermediaire/) · [Lesson 5 — tests](/en/python-intermediate-tests/) · [guided projects](/programmation/) (battleship, hangman, and more).

## Free resources (nothing to buy)

- [Official `re` documentation](https://docs.python.org/3/library/re.html)
- [Python regex HOWTO](https://docs.python.org/3/howto/regex.html)

## Amazon (affiliate, optional)

Python text-processing books:

<a href="https://www.amazon.com/s?k=python+text+processing+book&tag=roboteducatif-20" class="btn btn-action" rel="nofollow sponsored noopener" target="_blank">Check today's price on Amazon</a>
