---
layout: ../../layouts/EnPost.astro
title: "Hangman in Python (2/6): words from a file"
description: "Read a UTF-8 text file with one word per line, skip every blank line, then pick the secret hangman word at random with random.choice for each game."
updated: "28 March 2026"
faqSchema:
  - question: "Why encoding=\"utf-8\"?"
    answer: "So you can read accented words later. At the start, words without accents mean fewer surprises."
  - question: "Relative path or absolute path?"
    answer: "In class, put mots.txt in the same folder as the script. The files lesson covers how those paths work."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

You already know how the [mask](/en/python-hangman-1-masked-word/) works. To vary the games, the words come from a **file**: one **line** = one **word** (no spaces). You reuse the file reading from the [files lesson](/python-fichiers-texte/) and the [hangman hub](/programmation/pendu/).

> **Quick answer** — Create `mots.txt` (one word per line), load it as **UTF-8**, drop blank lines, then use `random.choice` to draw the secret word. Sample file: **`/examples/mots-pendu.txt`**.

![Python terminal illustration](/images/illustrations/python-pendu-2-mots-depuis-fichier.webp)

## 1. File format

Example (`mots.txt`):

```text
ROBOT
PYTHON
LISTE
```

- No accents at first, so encoding surprises stay out of the way. You can add `unicodedata` later.
- Blank lines: **skip** them with `strip()` and `if ligne:`.

## 2. Load the list

```python
def charger_mots(chemin):
    with open(chemin, "r", encoding="utf-8") as f:
        lignes = f.read().splitlines()
    mots = [L.strip().upper() for L in lignes if L.strip()]
    if not mots:
        raise ValueError("No words in the file.")
    return mots
```

## 3. Pick a word at random

```python
import random

mots = charger_mots("mots.txt")
secret = random.choice(mots)
```

On this site a small sample file is available as a static file: **`/examples/mots-pendu.txt`**. Locally, copy it into your working folder or adjust the path (see [files](/python-fichiers-texte/) and relative paths).

## 4. Error handling

If the file **does not exist**, you get `FileNotFoundError`. Wrap the call in `try` / `except` ([errors](/python-erreurs-debogage/)) and print a clear message.

## Exercises

1. Count how many words are in your file after loading.
2. Filter out words shorter than **3** letters before `random.choice`.
3. Ask for the file **path** with `input()` at startup.

## Files and hangman FAQ

**Why `encoding="utf-8"`?**  
So you can read accented words later. At the start, words without accents mean fewer surprises.

**Relative path or absolute path?**  
In class, put `mots.txt` in the same folder as the script; see [file paths](/python-fichiers-texte/).

**How does this relate to the todo notebook?**  
Same file logic: [Todo notebook part 1](/en/python-todo-notebook-1-brief-and-json/).

## Next

[Part 3 — Show the mask, the guessed letters, and a simple hangman](/en/python-hangman-3-display/).

## Full script for this chapter

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Hangman — Chapter 2/6: load words from mots_pendu.txt (UTF-8).
Run: python pendu_chapitre_02.py from this folder, or put mots_pendu.txt next to the script.
"""

import random
from pathlib import Path

BASE = Path(__file__).resolve().parent
CHEMIN_MOTS = BASE / "mots_pendu.txt"


def charger_mots(chemin):
    with open(chemin, "r", encoding="utf-8") as f:
        lignes = f.read().splitlines()
    mots = [L.strip().upper() for L in lignes if L.strip()]
    if not mots:
        raise ValueError("No words in the file.")
    return mots


def main():
    try:
        mots = charger_mots(CHEMIN_MOTS)
    except FileNotFoundError:
        print("File not found:", CHEMIN_MOTS)
        print("Copy mots_pendu.txt into the same folder as this script.")
        return
    secret = random.choice(mots)
    print(len(mots), "words loaded. (A real game does not show the secret.)")
    print("Length of the drawn word:", len(secret))


if __name__ == "__main__":
    main()
```

## Download this chapter

**[pendu_chapitre_02.py](/downloads/pendu/pendu_chapitre_02.py)** — also download **[mots_pendu.txt](/downloads/pendu/mots_pendu.txt)** and put both in the same local folder.

## On Amazon

A book search for Python, data and files: [Check today's price on Amazon](https://www.amazon.com/s?k=python+data+files+book&tag=roboteducatif-20).
