---
layout: ../../layouts/EnPost.astro
title: "Python Battleship (3/6): placing the ships"
description: "Place the five ships with no overlap: free cells, horizontal or vertical, keyboard entry or a random draw. Chapter 3 of the Python Battleship project."
updated: "4 November 2026"
faqSchema:
  - question: "What does cases_libres check before you place a ship?"
    answer: "Every future cell must sit inside the grid and still be water, the character \".\". If one cell fails, the placement is refused."
  - question: "Why store the coordinates in flotte?"
    answer: "Part 4 uses that list when you fire. Each ship is the list of squares it occupies."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

**Direct answer** — Each ship occupies adjacent squares, **horizontally** or **vertically**. Before you write `#` on the grid, test every square with `cases_libres`. Store the coordinates in a `flotte` list for part 4 (shots).

This chapter is part of the [Python Battleship project](/programmation/bataille-navale/) (a six-part series). You already know how to [create and display a grid](/en/python-battleship-2-grid-display/). What is left is to **place the ships** on the defense grid.

![Example of a 10×10 grid with ships placed at random](/images/blog/lot15/pendu-console-exemple.png)

<p><em>Example of the console rendering — the `#` marks are occupied squares (17 in total).</em></p>

## 1. Check that a spot is free

Before you place a ship of length `L`, test each future square: it must be inside the grid and it must be **water**, `.`.

```python
VIDE = "."
NAVIRE = "#"
TAILLE = 10

def cases_libres(grille, cases):
    for ligne, col in cases:
        if not (0 <= ligne < TAILLE and 0 <= col < TAILLE):
            return False
        if grille[ligne][col] != VIDE:
            return False
    return True
```

## 2. Build the squares from the orientation

- **Horizontal**: the same `ligne`, columns from `debut_col` through `debut_col + L - 1`.
- **Vertical**: the same `colonne`, rows from `debut_ligne` through `debut_ligne + L - 1`.

```python
def cases_navire(debut_ligne, debut_col, longueur, horizontal):
    coords = []
    for k in range(longueur):
        if horizontal:
            coords.append((debut_ligne, debut_col + k))
        else:
            coords.append((debut_ligne + k, debut_col))
    return coords
```

## 3. Place a ship on the grid

```python
def placer_navire(grille, coords):
    for ligne, col in coords:
        grille[ligne][col] = NAVIRE
```

In practice you chain the steps: compute `coords`, then if `cases_libres` succeeds, call `placer_navire`. You also **return** `coords` so you can store them in your `flotte` structure.

```python
def essayer_placer(grille, debut_ligne, debut_col, longueur, horizontal):
    coords = cases_navire(debut_ligne, debut_col, longueur, horizontal)
    if not cases_libres(grille, coords):
        return None
    placer_navire(grille, coords)
    return coords
```

## 4. Manual placement (two players at the same keyboard)

For a **first prototype**, you can ask, for each ship: row, column, and `H` or `V`. Loop **while** `essayer_placer` returns `None` (a bad position).

```python
LONGUEURS = [5, 4, 3, 3, 2]

def lire_orientation(texte):
    t = texte.strip().upper()
    if t in ("H", "HORIZONTAL", "O"):
        return True
    if t in ("V", "VERTICAL", "N"):
        return False
    raise ValueError("Expected orientation H or V")


def placement_joueur(grille):
    """Asks the player for the starting square (for example B3) and H or V for each ship."""
    flotte = []
    for L in LONGUEURS:
        while True:
            print(f"Ship of length {L} — starting square (for example C4), then H or V:")
            case_txt = input("Square: ")
            orient_txt = input("H/V: ")
            try:
                ligne, col = parser_case(case_txt)
                horizontal = lire_orientation(orient_txt)
            except ValueError as err:
                print("Error:", err)
                continue
            coords = essayer_placer(grille, ligne, col, L, horizontal)
            if coords is None:
                print("Cannot place it here (off the grid, overlap, or it runs past the edge).")
                continue
            flotte.append(coords)
            afficher_grille_lettres(grille, f"After placing the ship of length {L}")
            break
    return flotte
```

The square you type is the ship's **forward port corner**. The other squares are computed with `cases_navire`. The downloadable script below includes `placement_aleatoire`. Replace the call in `main()` with `placement_joueur(g)` to try keyboard entry.

## 5. Random placement (for an AI, or a quick setup)

With the `random` module, draw `debut_ligne`, `debut_col`, and `horizontal` until a placement succeeds. Watch out for an infinite loop if the grid is too full. With 5 ships on a 10×10 grid, that does not happen.

```python
import random

def placement_aleatoire(grille):
    flotte = []
    for L in LONGUEURS:
        for _ in range(2000):  # safety against an infinite loop
            h = random.choice([True, False])
            i = random.randrange(TAILLE)
            j = random.randrange(TAILLE)
            coords = essayer_placer(grille, i, j, L, h)
            if coords:
                flotte.append(coords)
                break
    return flotte
```

## Next

[Part 4 — Record a shot and update the grids](/en/python-battleship-4-shots/) · [Python robot track](/robot-programmable-python/) · [Battleship hub](/programmation/bataille-navale/)

## Exercises

1. Forbid **overlap**: check that your `cases_libres` refuses two ships on the same square.
2. Forbid **running off the grid**: a ship of length 5 must not start in column `8` when placed horizontally.
3. After random placement, **display** the grid and visually check that the number of `#` marks is right (the sum of the lengths is 17).

## Full script for this chapter

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Battleship — Chapter 3/6: placement with no overlap (random demo).
Run: python bataille_chapitre_03.py
"""

import random

TAILLE = 10
VIDE = "."
NAVIRE = "#"
RADAR_INCONNU = "?"
LONGUEURS_NAVIRES = [5, 4, 3, 3, 2]


def nouvelle_grille_defense():
    return [[VIDE for _ in range(TAILLE)] for _ in range(TAILLE)]


def nouvelle_grille_radar():
    return [[RADAR_INCONNU for _ in range(TAILLE)] for _ in range(TAILLE)]


def lettre_ligne(i):
    return chr(ord("A") + i)


def afficher_grille_lettres(grille, titre="Grid"):
    print(titre)
    print("    " + " ".join(str(c + 1) for c in range(TAILLE)))
    for i, ligne in enumerate(grille):
        print(f"{lettre_ligne(i):2}  " + "  ".join(cell for cell in ligne))


def parser_case(texte):
    texte = texte.strip().upper().replace(" ", "")
    if len(texte) < 2:
        raise ValueError("Too short (e.g. B7)")
    lettre = texte[0]
    chiffres = texte[1:]
    derniere = chr(ord("A") + TAILLE - 1)
    if not ("A" <= lettre <= derniere):
        raise ValueError(f"Row A–{derniere}")
    ligne = ord(lettre) - ord("A")
    colonne = int(chiffres) - 1
    if not (0 <= colonne < TAILLE):
        raise ValueError(f"Column 1–{TAILLE}")
    return ligne, colonne


def cases_libres(grille, cases):
    for ligne, col in cases:
        if not (0 <= ligne < TAILLE and 0 <= col < TAILLE):
            return False
        if grille[ligne][col] != VIDE:
            return False
    return True


def cases_navire(debut_ligne, debut_col, longueur, horizontal):
    coords = []
    for k in range(longueur):
        if horizontal:
            coords.append((debut_ligne, debut_col + k))
        else:
            coords.append((debut_ligne + k, debut_col))
    return coords


def placer_navire(grille, coords):
    for ligne, col in coords:
        grille[ligne][col] = NAVIRE


def essayer_placer(grille, debut_ligne, debut_col, longueur, horizontal):
    coords = cases_navire(debut_ligne, debut_col, longueur, horizontal)
    if not cases_libres(grille, coords):
        return None
    placer_navire(grille, coords)
    return coords


def placement_aleatoire(grille):
    flotte = []
    for L in LONGUEURS_NAVIRES:
        for _ in range(5000):
            h = random.choice([True, False])
            i = random.randrange(TAILLE)
            j = random.randrange(TAILLE)
            coords = essayer_placer(grille, i, j, L, h)
            if coords:
                flotte.append(coords)
                break
        else:
            raise RuntimeError("Random placement failed — try again.")
    return flotte


def main():
    random.seed()
    g = nouvelle_grille_defense()
    flotte = placement_aleatoire(g)
    afficher_grille_lettres(g, "Fleet placed at random")
    nb_navire = sum(len(n) for n in flotte)
    print("Number of # squares:", nb_navire, "(expected: 17)")


if __name__ == "__main__":
    main()
```

## Download this chapter

**[bataille_chapitre_03.py](/downloads/bataille-navale/bataille_chapitre_03.py)**

## Amazon

- Python 3, exercises with solutions: <a href="https://www.amazon.com/s?k=python+3+exercises+book&tag=roboteducatif-20" class="btn btn-action" rel="nofollow sponsored noopener" target="_blank">Check today's price on Amazon</a>
- Python programming books for children: <a href="https://www.amazon.com/s?k=python+programming+books+for+kids&tag=roboteducatif-20" class="btn btn-action" rel="nofollow sponsored noopener" target="_blank">Check today's price on Amazon</a>
- Python 3 exercises with solutions (Amazon search): <a href="https://www.amazon.com/s?k=python+3+exercises+with+solutions&tag=roboteducatif-20" class="btn btn-action" rel="nofollow sponsored noopener" target="_blank">Check today's price on Amazon</a>
