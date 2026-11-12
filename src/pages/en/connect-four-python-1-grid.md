---
layout: ../../layouts/EnPost.astro
title: "Connect Four in Python, chapter 1: the 6×7 grid"
description: "Chapter 1 of a terminal Connect Four: a 6×7 list of lists, 0 for empty, 1 and 2 for the players, and a demo token on the bottom row."
updated: "11 November 2026"
---

The downloadable script is the same file as on the French page, so its messages stay in French.

A Connect Four board has 6 rows and 7 columns. This chapter only builds that board. Nothing is printed as a game yet, and nothing falls: gravity is chapter 2.

In this code a cell is an integer. `0` is empty, `1` is the first player, `2` is the second. Using numbers rather than `"X"` and `"O"` keeps the later tests simple: you compare a cell with the current player.

`nouvelle_grille` returns a list of 6 lists. Each inner list has 7 zeros. The outer index is the row. **Row 0 is the top of the board**, and row 5 is the bottom. That choice matters in the next chapter: gravity searches from the bottom upward and stops at the first empty cell.

`grille_pleine` is true only when row 0 has no zero left. If the top row is full, every column is full, because tokens always fall as low as they can. The function is written now so chapter 5 can call it for a draw.

The demonstration writes a `1` at row 5, column index 3. For a human that is the bottom row, column 4, because the keyboard will later use columns 1 to 7.

![PowerShell after chapter 1: board created, bottom row [0, 0, 0, 1, 0, 0, 0], board not full.](/images/lot10/puissance4-ch1-terminal-output.webp)

*Output of `puissance4_chapitre_01.py`. The messages are in French because this is the file published with the series. The `1` sits in the last row, fourth column.*

## Run it

Save the script as `puissance4_chapitre_01.py`, or download the file below. From the folder that contains it:

```text
python puissance4_chapitre_01.py
```

You should read `Grille 6 x 7 creee.`, then the bottom row `[0, 0, 0, 1, 0, 0, 0]`, then `Grille pleine ? False`.

## Exercises

1. Print the whole grid with a loop, one row per line, before you move on to chapter 2.
2. Place a second token at row 4, same column, and check that it sits just above the first.
3. What does `grille_pleine` return if you fill only row 5? It must stay false: the top row is still empty.

## The script

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Puissance 4 — Chapitre 1/6 : constantes, grille 6x7, demo pile dans une colonne.
Lancer : python puissance4_chapitre_01.py
"""

VIDE = 0
J1 = 1
J2 = 2
LIGNES = 6
COLONNES = 7


def nouvelle_grille():
    return [[VIDE for _ in range(COLONNES)] for _ in range(LIGNES)]


def grille_pleine(grille):
    """True si la ligne du haut est pleine (plus aucun coup possible)."""
    return all(grille[0][c] != VIDE for c in range(COLONNES))


if __name__ == "__main__":
    g = nouvelle_grille()
    print("Grille", LIGNES, "x", COLONNES, "creee.")
    assert len(g) == LIGNES and len(g[0]) == COLONNES

    # Demo : empiler trois J1 dans la colonne d'indice 3 (colonne 4 pour l'humain)
    col_demo = 3
    for _ in range(3):
        for ligne in range(LIGNES - 1, -1, -1):
            if g[ligne][col_demo] == VIDE:
                g[ligne][col_demo] = J1
                break

    print("Derniere ligne (bas de la grille) :", g[-1])
    print("Grille pleine ?", grille_pleine(g))
    print("OK — passe au chapitre 2 pour l'affichage et jouer_colonne.")
```

## Download

**[puissance4_chapitre_01.py](/downloads/puissance4/puissance4_chapitre_01.py)**

## Next

[Chapter 2 — display the board and drop a token](/en/connect-four-python-2-display/).

