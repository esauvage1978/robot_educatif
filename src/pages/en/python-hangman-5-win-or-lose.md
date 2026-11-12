---
layout: ../../layouts/EnPost.astro
title: "Hangman in Python (5/6): winning, losing and polish"
description: "Write clear win and loss messages, reveal the secret word only on a loss, track simple session statistics, and load optional themes from several files."
updated: "28 March 2026"
faqSchema:
  - question: "When should you reveal the secret word?"
    answer: "Only on a loss. Showing it during the game removes the tension the player is working through."
  - question: "How do you avoid dividing by zero in the win percentage?"
    answer: "Guard the division. If parties is 0, report 0.0 instead of dividing gagnees by parties."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

The [loop](/en/python-hangman-4-game-loop/) works. You can **polish** the player experience and add small **statistics** so the game feels more satisfying.

![Sample output in a Python terminal](/images/blog/lot15/pendu-console-exemple.png)

## 1. End messages

- **Win**: congratulations plus the number of mistakes or turns.
- **Loss**: always show the **secret word** (`print(f"The word was: {secret}")`).

Avoid revealing the word along the way if you want to keep the tension.

## 2. Session statistics

Global variables, or a dictionary `stats = {"parties": 0, "gagnees": 0}`, incremented after each game. Print a **summary** when the user quits (`q` on the menu).

## 3. Themes (several files)

Offer a menu: `1 = animals`, `2 = computing` → paths `mots_animaux.txt`, `mots_info.txt`. Same `charger_mots` function, a different **path** argument.

## 4. Thinking time (optional)

`import time`: record `t0 = time.time()` at the start of the game and print the **duration** at the end.

## Exercises

1. Print a session **win percentage** (`gagnees / parties * 100`, with a guard if `parties == 0`).
2. Save the stats to a small file **`stats_pendu.txt`** (one line per session, or a running total — your choice).
3. Add an **easy mode**: show how many **distinct** letters are still left to find.

## Next

[Part 6 — Assemble the project, file layout and extensions](/en/python-hangman-6-complete/).

## Full script for this chapter

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Hangman — Chapter 5/6: session stats and end messages.
Run: python pendu_chapitre_05.py
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
    filtres = [m for m in mots if 4 <= len(m) <= 8]
    if filtres:
        mots = filtres
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


def jouer_une_partie(secret, stats):
    masque = ["_"] * len(secret)
    essayees = set()
    vies = VIES_MAX
    coups = 0
    stats["parties"] += 1
    while True:
        afficher_etat(masque, vies, essayees)
        if "_" not in masque:
            print("Well done — word found!")
            stats["gagnees"] += 1
            print(f"Turns played: {coups} | Mistakes: {VIES_MAX - vies}")
            return
        if vies <= 0:
            print(f"You lose! The word was: {secret}")
            print(f"Turns played: {coups}")
            return
        lettre = demander_lettre_valide(essayees)
        essayees.add(lettre)
        coups += 1
        if lettre not in secret:
            vies -= 1
        else:
            for i, L in enumerate(secret):
                if L == lettre:
                    masque[i] = lettre


def main():
    stats = {"parties": 0, "gagnees": 0}
    try:
        mots = charger_mots(CHEMIN_MOTS)
    except FileNotFoundError:
        print("Put mots_pendu.txt next to the script.")
        return
    while True:
        secret = random.choice(mots)
        jouer_une_partie(secret, stats)
        if input("\nPlay again? (y/n) ").strip().lower() not in ("o", "oui", "y", "yes"):
            break
    p = stats["parties"]
    g = stats["gagnees"]
    pct = (100 * g / p) if p else 0.0
    print(f"\nSession: {g} win(s) out of {p} game(s) ({pct:.0f}%).")


if __name__ == "__main__":
    main()
```

## Download this chapter

**[pendu_chapitre_05.py](/downloads/pendu/pendu_chapitre_05.py)** — with **[mots_pendu.txt](/downloads/pendu/mots_pendu.txt)**.

## On Amazon

A book search for clean Python practice: [Check today's price on Amazon](https://www.amazon.com/s?k=clean+code+python+book&tag=roboteducatif-20).
