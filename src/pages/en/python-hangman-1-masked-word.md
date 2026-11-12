---
layout: ../../layouts/EnPost.astro
title: "Hangman in Python (1/6): brief and masked word"
description: "Set hangman rules, hardcode a secret word, build a mask of underscores the same length, and reveal each letter when the player guesses it right."
updated: "2 November 2026"
faqSchema:
  - question: "Why store the mask as a list of characters?"
    answer: "You can replace one index when a letter matches. A string is immutable, so a list of the same length is the simplest way to reveal letters in place."
  - question: "Why use a set for letters already guessed?"
    answer: "Membership tests on a set are O(1) on average, so you can reject a repeated letter without scanning a list."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

**Hangman** is a letter game: the computer picks a **secret word**; the player suggests **letters**. Each correct letter reveals its positions; each **wrong** letter costs a **life**. At zero lives, or when the word is fully revealed, the game stops.

This series has **six articles**. This one sets the rules and the **core** with no file: a fixed word in the code.

> **Hangman series (1/6)** — [Contents](/programmation/pendu/) · next: [Part 2 — words from a file](/en/python-hangman-2-word-list/)

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/programmation/pendu/">Hangman series</a> · <a href="/programmation/python/">Python course</a></nav>

You work in a **terminal** (PowerShell, Command Prompt, or the built-in terminal in VS Code / Thonny): you run each script with `python your_file.py`.

Example after a letter is found:

![Sample console output — hangman chapter 1](/images/blog/lot15/pendu-console-exemple.png)

*A teaching screenshot of the terminal output for this tutorial (run locally).*

## 1. Rules you will code

- The word is in **uppercase letters** with no accents, to keep things simple (you can normalize later).
- **7 mistakes** maximum before you lose (the classic hangman drawing count).
- A letter already guessed must **not** be played again (or you ignore it with no penalty — pick one and document it).

## 2. Representing letters found

A simple trick: build a list or a string of the same **length** as the word, with `_` or `-` for unknown letters.

```python
mot = "ROBOT"
masque = ["_"] * len(mot)  # ['_', '_', '_', '_', '_']
```

When the player guesses `O`:

```python
for i, lettre in enumerate(mot):
    if lettre == "O":
        masque[i] = "O"
print(" ".join(masque))   # _ O _ O _
```

## 3. Letters already tried

A **`set`** is a perfect fit: membership tests are **O(1)** on average.

```python
essayees = set()
c = input("A letter: ").strip().upper()
if len(c) != 1 or not c.isalpha():
    print("One letter only.")
elif c in essayees:
    print("Already guessed.")
else:
    essayees.add(c)
```

## 4. One game step (still no infinite loop)

1. Show the mask and how many lives are left.
2. Read a valid letter.
3. If the letter is **in** the word, update the mask; otherwise **lives − 1**.
4. Test for a win (`'_' not in masque`) or a loss (`vies == 0`).

## Exercises

1. With `mot = "CODE"`, walk through two turns by hand: `C`, then `X`.
2. Write a function `mot_termine(masque)` that returns `True` when there is no `_` left.
3. Count how many **distinct** letters `"BATAILLE"` contains (expected result: 6).

## Next

[Part 2 — Load a word list from a text file](/en/python-hangman-2-word-list/). A sample file is on the site: `/examples/mots-pendu.txt` (copy it next to your script locally).

## Full script for this chapter

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Hangman — Chapter 1/6: masked word, one letter, update (no infinite loop).
Run: python pendu_chapitre_01.py
"""

VIES_INIT = 7


def main():
    mot = "ROBOT"
    masque = ["_"] * len(mot)
    essayees = set()
    vies = VIES_INIT

    print("Word:", " ".join(masque), "| Lives:", vies)
    c = input("A letter: ").strip().upper()
    if len(c) != 1 or not c.isalpha():
        print("Enter a single letter A-Z.")
        return
    if c in essayees:
        print("Already guessed.")
        return
    essayees.add(c)
    trouve = False
    for i, lettre in enumerate(mot):
        if lettre == c:
            masque[i] = c
            trouve = True
    if not trouve:
        vies -= 1
    print("After this guess:", " ".join(masque), "| Lives:", vies)
    print("Guessed:", " ".join(sorted(essayees)))
    if "_" not in masque:
        print("Well done, you found the word!")
    elif vies <= 0:
        print("You lose! The word was:", mot)


if __name__ == "__main__":
    main()
```

## Download this chapter

**[pendu_chapitre_01.py](/downloads/pendu/pendu_chapitre_01.py)**

## On Amazon

A book search for Python projects and games: [Check today's price on Amazon](https://www.amazon.com/s?k=python+projects+games+book&tag=roboteducatif-20).
