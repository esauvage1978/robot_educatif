---
layout: ../../layouts/EnPost.astro
title: "Hangman in Python (6/6): complete project and extensions"
description: "Organize pendu.py with constants, functions and main, walk through a final checklist, and extend the game with scores or accents via unicodedata."
updated: "2 November 2026"
faqSchema:
  - question: "One file or several modules?"
    answer: "As long as the script stays readable, under about 300 lines, one file is enough. Past that, split mots.py, affichage.py and jeu.py."
  - question: "How can you test without typing every time?"
    answer: "Keep a short list of short words in mots_pendu.txt and play several games in a row with play again."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

> **Direct answer (November 2026)** — Gather your code in `pendu.py` (or a small `pendu/` folder) with constants at the top, the functions tested in chapters 1 to 5, and a `main()` that handles the menu, statistics, and robust file paths through `pathlib`.

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/programmation/pendu/">Hangman series</a> · Part 6/6 — complete project</nav>

You have everything you need to **assemble** the game. This last article suggests a **file layout**, a **checklist**, and **ideas for extensions**. Go back to the [hangman contents](/programmation/pendu/) or the [Python course](/programmation/python/) to continue.

![Hangman project layout — teaching illustration](/images/illustrations/python-pendu-6-projet-complet.webp)

## 1. A typical split

- `pendu.py` — entry point, `if __name__ == "__main__": main()`
- Constants at the top: `VIES_MAX`, default paths, `PENDU_ETAPES`
- Functions: `charger_mots`, `nouveau_masque`, `demander_lettre_valide`, `tour_de_jeu`, `jouer_partie`, `main`

Or a `pendu/` folder with `mots.py`, `affichage.py`, `jeu.py` if the script grows past about 300 lines.

## 2. A word file shipped with the game

Include `mots.txt` next to the script. In `main`, use a path **relative** to the script file if you need to:

```python
from pathlib import Path

BASE = Path(__file__).resolve().parent
CHEMIN_MOTS = BASE / "mots.txt"
```

Copy the sample [mots-pendu.txt](/examples/mots-pendu.txt) from the site as `mots.txt` to test.

## 3. Final checklist

- [ ] Invalid letters and letters already played are handled without a crash.
- [ ] **UTF-8** encoding when you open the file.
- [ ] The secret word is in **UPPERCASE**, consistent with input.
- [ ] Win / loss / play again / quit.
- [ ] (Optional) `try` / `except` if the file is missing.

## 4. Possible extensions

- **Accents**: normalize with `unicodedata` (`NFD` plus filtering combining marks) so `É` counts as `E`.
- **Two-player mode**: a person types the word (hidden on screen with `getpass` once you introduce it).
- **High score** in JSON — see the [todo notebook](/programmation/carnet-todo/) series for inspiration.

Well done on the **Hangman** series: [back to the contents](/programmation/pendu/), or continue with [Connect Four](/en/connect-four-python/) or the [todo notebook](/programmation/carnet-todo/).

## Full script for this chapter

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Hangman — Chapter 6/6: complete project (menu, stats, robust paths).
Run: python pendu_chapitre_06.py
"""

import random
import sys
import time
from pathlib import Path

BASE = Path(__file__).resolve().parent
CHEMIN_MOTS_DEFAUT = BASE / "mots_pendu.txt"

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
    mots = [m for m in mots if 3 <= len(m) <= 12]
    if not mots:
        raise ValueError("No valid words in the file.")
    return mots


def afficher_etat(masque, vies, essayees):
    erreurs = VIES_MAX - vies
    etape = min(erreurs, len(PENDU_ETAPES) - 1)
    print("=" * 40)
    if PENDU_ETAPES[etape]:
        print(PENDU_ETAPES[etape])
    print("\n" + " ".join(masque))
    print(f"Lives: {vies}")
    print("Letters guessed:", " ".join(sorted(essayees)))


def demander_lettre_valide(essayees):
    while True:
        c = input("Letter? (q to quit this game) ").strip().upper()
        if c == "Q":
            return None
        if len(c) != 1 or not c.isalpha():
            print("One letter only, A-Z.")
            continue
        if c in essayees:
            print("Already guessed.")
            continue
        return c


def jouer_une_partie(secret, stats):
    masque = ["_"] * len(secret)
    essayees = set()
    vies = VIES_MAX
    coups = 0
    stats["parties"] += 1
    t0 = time.time()
    while True:
        afficher_etat(masque, vies, essayees)
        if "_" not in masque:
            d = time.time() - t0
            print("Well done!")
            stats["gagnees"] += 1
            print(f"Turns: {coups} | Mistakes: {VIES_MAX - vies} | Time: {d:.1f} s")
            return
        if vies <= 0:
            print(f"You lose! The word was: {secret}")
            return
        lettre = demander_lettre_valide(essayees)
        if lettre is None:
            print("Game abandoned.")
            return
        essayees.add(lettre)
        coups += 1
        if lettre not in secret:
            vies -= 1
        else:
            for i, L in enumerate(secret):
                if L == lettre:
                    masque[i] = lettre


def main():
    chemin = CHEMIN_MOTS_DEFAUT
    if len(sys.argv) > 1:
        chemin = Path(sys.argv[1])
    try:
        mots = charger_mots(chemin)
    except FileNotFoundError:
        print("File not found:", chemin)
        sys.exit(1)
    except ValueError as e:
        print(e)
        sys.exit(1)

    stats = {"parties": 0, "gagnees": 0}
    print("Hangman — words from:", chemin)
    while True:
        print("\n1 Play   q Quit")
        choix = input("Choice? ").strip().lower()
        if choix in ("q", "quit"):
            break
        secret = random.choice(mots)
        jouer_une_partie(secret, stats)
    p, g = stats["parties"], stats["gagnees"]
    pct = (100 * g / p) if p else 0.0
    print(f"Session: {g} / {p} wins ({pct:.0f}%).")


if __name__ == "__main__":
    main()
```

## FAQ

**One file or several modules?**  
As long as the script stays readable (under about 300 lines), one file is enough. Past that, split `mots.py`, `affichage.py` and `jeu.py`.

**How can you test without typing every time?**  
Keep a short list of short words in `mots_pendu.txt` and play several games in a row with “play again”.

**What comes after hangman?**  
Continue with [Connect Four](/en/connect-four-python/) or the [todo notebook](/programmation/carnet-todo/) to practice JSON files and menus.

## Download this chapter

**[pendu_chapitre_06.py](/downloads/pendu/pendu_chapitre_06.py)** — with **[mots_pendu.txt](/downloads/pendu/mots_pendu.txt)**. You can also pass another file: `python pendu_chapitre_06.py path/to/mots.txt`.

## On Amazon

A book search for Python game projects: [Check today's price on Amazon](https://www.amazon.com/s?k=python+projects+games+book&tag=roboteducatif-20).
