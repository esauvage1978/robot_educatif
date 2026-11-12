---
layout: ../../layouts/EnPost.astro
title: "Python Battleship (2/6): grid and display"
description: "Battleship in Python, part 2: a 10×10 grid, a terminal display with headers, and converting squares A1 through J10 into Python indexes for ship placement."
updated: "2 November 2026"
faqSchema:
  - question: "Why are internal columns 0–9 when the player sees 1–10?"
    answer: "Python lists are 0-based. Keep one convention: store 0–9, and show columns as 1–10 (and rows as A–J) only when you print or read input."
  - question: "What if the grid is not 10×10?"
    answer: "Change the letter range. The last row letter is A plus TAILLE minus 1, and the column check uses TAILLE instead of a hard-coded 10."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

**In short** — This lesson adds a **10×10 grid** and **terminal display** to the [Battleship project](/programmation/bataille-navale/) (the track hub). You convert squares **A1–J10** into Python indexes **0–9**.

You continue after [part 1](/en/python-battleship-1-brief/): this time, the smallest “display engine” so you can **see** the grids in the terminal.

![Battleship grid shown in a Python terminal](/images/illustrations/python-bataille-navale-2-grille-et-affichage.webp)

## 1. Create an empty grid

One row = a list of `TAILLE` characters; the grid = `TAILLE` rows.

```python
TAILLE = 10
VIDE = "."

def nouvelle_grille_defense():
    return [[VIDE for _ in range(TAILLE)] for _ in range(TAILLE)]

def nouvelle_grille_radar():
    return [["?" for _ in range(TAILLE)] for _ in range(TAILLE)]
```

## 2. Print with column numbers

To stay oriented, you often print **1–10** across the top and **A–J** down the left (or the other way around). A compact example: numbered columns, and rows numbered `0–9` at first (you can switch to letters next).

```python
def afficher_grille(grille, titre="Grid"):
    print(titre)
    print("   " + " ".join(str(c + 1) for c in range(TAILLE)))
    for i, ligne in enumerate(grille):
        print(f"{i:2} " + " ".join(cell for cell in ligne))
```

For a “paper Battleship” look, replace the row index `i` with a letter:

```python
def lettre_ligne(i):
    return chr(ord("A") + i)

def afficher_grille_lettres(grille, titre="Grid"):
    print(titre)
    print("    " + " ".join(str(c + 1) for c in range(TAILLE)))
    for i, ligne in enumerate(grille):
        print(f"{lettre_ligne(i):2}  " + "  ".join(cell for cell in ligne))
```

## 3. Parse input such as `B7`

The user often types **one letter** (row) and **one number** (column, usually 1-based).

```python
def parser_case(texte):
    texte = texte.strip().upper().replace(" ", "")
    if len(texte) < 2:
        raise ValueError("Too short (e.g. B7)")
    lettre = texte[0]
    chiffres = texte[1:]
    if not ("A" <= lettre <= "J"):
        raise ValueError("Row A–J")
    ligne = ord(lettre) - ord("A")
    colonne = int(chiffres) - 1  # 1..10 -> 0..9
    if not (0 <= colonne < TAILLE):
        raise ValueError("Column 1–10")
    return ligne, colonne
```

**Watch out**: if your grid is not 10×10, adapt the letter range (`A` + `TAILLE - 1`).

## 4. Indexes → text (for messages)

```python
def case_vers_texte(ligne, colonne):
    return f"{lettre_ligne(ligne)}{colonne + 1}"
```

## 5. Exercises

1. Display a radar grid that is **entirely** `?` with `afficher_grille_lettres`.
2. Ask for a square with `input`, use `parser_case`, and print “You aimed at row … column …”.
3. Place **by hand** (in the code) three `#` cells on a defense grid and display it: check the visual alignment.

## A common trap

Mixing up **column 0** in Python and **column 1** for the player: keep **one convention** (here: internal `0–9`, display `1–10`).

## Next

[Part 3 — Place the ships without overlap](/python-bataille-navale-3-placement-bateaux/) · [Battleship hub](/programmation/bataille-navale/) · [Programming track](/programmation/)

## Full script for this chapter

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Battleship — Chapter 2/6: display and A1–J10 parser.
Run: python bataille_chapitre_02.py
"""

TAILLE = 10
VIDE = "."
RADAR_INCONNU = "?"


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


def case_vers_texte(ligne, colonne):
    return f"{lettre_ligne(ligne)}{colonne + 1}"


def main():
    afficher_grille_lettres(nouvelle_grille_radar(), "Radar (all unknown)")
    afficher_grille_lettres(nouvelle_grille_defense(), "Defense (water)")
    while True:
        txt = input("\nSquare (e.g. D5), blank to quit: ").strip()
        if not txt:
            break
        try:
            li, co = parser_case(txt)
            print("Internal indexes: row", li, "column", co, "=>", case_vers_texte(li, co))
        except ValueError as e:
            print("Error:", e)


if __name__ == "__main__":
    main()
```

## Download this chapter

**[bataille_chapitre_02.py](/downloads/bataille-navale/bataille_chapitre_02.py)**

## Amazon

<a href="https://www.amazon.com/s?k=python+algorithms+beginner+book&tag=roboteducatif-20" class="btn btn-action" rel="nofollow sponsored noopener" target="_blank">Check today's price on Amazon</a>
