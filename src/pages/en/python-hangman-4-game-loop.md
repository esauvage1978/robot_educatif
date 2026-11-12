---
layout: ../../layouts/EnPost.astro
title: "Hangman in Python (4/6): game loop and input checks"
description: "Use a while True game loop with clear win and loss exits, reject a bad or repeated letter, and play again without restarting the Python script."
updated: "2 November 2026"
faqSchema:
  - question: "Why while True rather than a for loop?"
    answer: "The number of turns depends on the letters found. You break as soon as the mask has no underscore left or lives drop to zero."
  - question: "How do you avoid a crash on an empty guess?"
    answer: "Keep validation inside demander_lettre_valide(). An inner loop runs until the player enters a single new letter from A to Z."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

> **Direct answer (November 2026)** — Wrap each game in a `while True` loop and `break` on a win or a loss, and keep `demander_lettre_valide()` running until you get **one alphabetic letter that has never been guessed**.

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/programmation/pendu/">Hangman series</a> · Part 4/6 — game loop</nav>

You have the **building blocks** ([mask](/en/python-hangman-1-masked-word/), [file](/en/python-hangman-2-word-list/), [display](/en/python-hangman-3-display/)). You need a clean **loop** that chains turns until a win or a loss, without letting the program crash on a clumsy guess. This chapter sits in the [hangman project in Python](/programmation/pendu/) (the hub for the six-part path). Next: [part 5 — winning and losing](/en/python-hangman-5-win-or-lose/).

![Hangman game loop — teaching illustration](/images/illustrations/python-pendu-4-boucle-partie.webp)

## 1. A `while True` structure with `break`

```python
while True:
    afficher_etat(masque, vies, essayees)
    if "_" not in masque:
        print("You win!")
        break
    if vies <= 0:
        print("You lose! The word was:", secret)
        break

    lettre = demander_lettre_valide(essayees)
    # ... update masque / vies / essayees
```

`demander_lettre_valide` loops **internally** until it gets a **new** single letter.

## 2. The `demander_lettre_valide` function

```python
def demander_lettre_valide(essayees):
    while True:
        c = input("Letter? ").strip().upper()
        if len(c) != 1 or not c.isalpha():
            print("One letter only, A-Z.")
            continue
        if c in essayees:
            print("Already guessed.")
            continue
        return c
```

## 3. Playing again

After `break`, ask `Play again? (y/n)`. If the answer is yes, load a new word, reset the mask, lives and `essayees`, and start a **new** loop (or put the whole game in a function `jouer_une_partie()` called from an outer loop).

## Exercises

1. Count the **number of turns** (valid letters played) and print it at the end of the game.
2. Limit the secret word **length** to between 4 and 8 letters by filtering the loaded list.
3. **Hard mode**: only **5** lives — a `vies_initiales` parameter passed to `jouer_une_partie`.

## FAQ

**Why `while True` rather than a `for`?**  
The number of turns depends on the letters found: you `break` as soon as the mask has no `_` left or lives drop to zero.

**How do you avoid a crash on an empty guess?**  
Keep validation inside `demander_lettre_valide()`: an inner loop until you get a single A–Z letter.

**Where does the “play again” loop go?**  
Either an outer loop around `jouer_une_partie()`, or a menu in `main()` — see the full script below.

## Next

[Part 5 — End messages, revealing the word, a complete hangman](/en/python-hangman-5-win-or-lose/).

## Full script for this chapter

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Hangman — Chapter 4/6: full loop plus play again.
Run: python pendu_chapitre_04.py
"""

import random
from pathlib import Path

BASE = Path(__file__).resolve().parent
CHEMIN_MOTS = BASE / "mots_pendu.txt"

PENDU_ETAPES = [
    "",
    " O ",
    " O\n | ",
    " O\n/| ",
    " O\n/|\\\n",
    " O\n/|\\\n/",
    " O\n/|\\\n/ \\",
]

VIES_MAX = 7


def charger_mots(chemin):
    with open(chemin, "r", encoding="utf-8") as f:
        lignes = f.read().splitlines()
    mots = [L.strip().upper() for L in lignes if L.strip()]
    mots = [m for m in mots if len(m) >= 3]
    if not mots:
        raise ValueError("No words in the file.")
    return mots


def afficher_etat(masque, vies, essayees):
    erreurs = VIES_MAX - vies
    etape = min(erreurs, len(PENDU_ETAPES) - 1)
    if PENDU_ETAPES[etape]:
        print(PENDU_ETAPES[etape])
    print("\n" + " ".join(masque))
    print(f"Lives: {vies}")
    print("Letters guessed:", " ".join(sorted(essayees)))


def demander_lettre_valide(essayees):
    while True:
        c = input("Letter? ").strip().upper()
        if len(c) != 1 or not c.isalpha():
            print("One letter only, A-Z.")
            continue
        if c in essayees:
            print("Already guessed.")
            continue
        return c


def jouer_une_partie(secret):
    masque = ["_"] * len(secret)
    essayees = set()
    vies = VIES_MAX
    while True:
        afficher_etat(masque, vies, essayees)
        if "_" not in masque:
            print("You win!")
            return True
        if vies <= 0:
            print("You lose! The word was:", secret)
            return False
        lettre = demander_lettre_valide(essayees)
        essayees.add(lettre)
        if lettre not in secret:
            vies -= 1
        else:
            for i, L in enumerate(secret):
                if L == lettre:
                    masque[i] = lettre


def main():
    try:
        mots = charger_mots(CHEMIN_MOTS)
    except FileNotFoundError:
        print("Put mots_pendu.txt next to the script.")
        return
    while True:
        secret = random.choice(mots)
        jouer_une_partie(secret)
        if input("\nPlay again? (y/n) ").strip().lower() not in ("o", "oui", "y", "yes"):
            break


if __name__ == "__main__":
    main()
```

## Download this chapter

**[pendu_chapitre_04.py](/downloads/pendu/pendu_chapitre_04.py)** — with **[mots_pendu.txt](/downloads/pendu/mots_pendu.txt)**.

## On Amazon

A book search for Python algorithms for beginners: [Check today's price on Amazon](https://www.amazon.com/s?k=python+algorithms+beginner&tag=roboteducatif-20).
