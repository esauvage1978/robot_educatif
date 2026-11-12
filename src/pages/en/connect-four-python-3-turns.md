---
layout: ../../layouts/EnPost.astro
title: "Connect Four in Python, chapter 3: columns and turns"
description: "Read a column from 1 to 7, reject a bad entry, and switch player only after a token really drops."
updated: "11 November 2026"
---

The downloadable script is the same file as on the French page, so its messages stay in French.

The board can now receive a token. This chapter asks a human which column to use, and it alternates X and O. It does not yet know who won. That test is chapter 4.

`demander_colonne` loops until the entry is a whole number from 1 to 7. `input` returns text, so `int` converts it. A word, an empty line or a number outside 1–7 is refused, and the question is asked again. The function then returns the index, which is the number the human typed minus one.

The turn loop calls `jouer_colonne`. Only a `True` result switches the player: `joueur = J2 if joueur == J1 else J1`. If the column is full, the same player is asked again. Switching anyway would give the opponent a free extra turn.

This chapter stops after a fixed number of moves, because it cannot detect a win yet. Do not raise that limit and expect a winner to be announced.

## What you should see

Type `4`, then `4` again. The first token is X at the bottom of column 4, the second is O just above it, and the prompt comes back to the first player. Type `abc`: the program must not crash, and it must ask again.

## Exercises

1. Let the player quit with `q`: `demander_colonne` returns `None` and the loop stops.
2. Print the move number on each turn.
3. Watch a long game with no win message. The announcement arrives in chapter 4.

## The script

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Puissance 4 — Chapitre 3/6 : saisie colonne, alternance J1/J2 (sans detection victoire).
Lancer : python puissance4_chapitre_03.py
"""

VIDE = 0
J1 = 1
J2 = 2
LIGNES = 6
COLONNES = 7
SYM = {0: ".", 1: "X", 2: "O"}


def nouvelle_grille():
    return [[VIDE for _ in range(COLONNES)] for _ in range(LIGNES)]


def afficher_grille(grille):
    print("  " + " ".join(str(c + 1) for c in range(COLONNES)))
    for ligne in grille:
        print("  " + " ".join(SYM[cell] for cell in ligne))


def colonne_jouable(grille, col):
    return 0 <= col < COLONNES and grille[0][col] == VIDE


def jouer_colonne(grille, col, joueur):
    if not colonne_jouable(grille, col):
        return False
    for ligne in range(LIGNES - 1, -1, -1):
        if grille[ligne][col] == VIDE:
            grille[ligne][col] = joueur
            return True
    return False


def demander_colonne():
    while True:
        raw = input(f"Colonne (1-{COLONNES}) ? ").strip()
        try:
            c = int(raw)
        except ValueError:
            print("Entre un nombre entier.")
            continue
        if 1 <= c <= COLONNES:
            return c - 1
        print("Hors plage.")


def sym(joueur):
    return "X" if joueur == J1 else "O"


def demo_partie_rapide():
    """Quelques coups en alternance (pas encore de victoire detectee)."""
    grille = nouvelle_grille()
    joueur = J1
    nb_coups = 0
    max_coups = 8
    while nb_coups < max_coups:
        afficher_grille(grille)
        print(f"Tour du joueur {sym(joueur)}")
        col = demander_colonne()
        if not jouer_colonne(grille, col, joueur):
            print("Colonne pleine ou invalide — rejoue.")
            continue
        nb_coups += 1
        joueur = J2 if joueur == J1 else J1
    afficher_grille(grille)
    print("Demo terminee (chapitre 4 : detection des 4 alignes).")


if __name__ == "__main__":
    demo_partie_rapide()
```

## Download

**[puissance4_chapitre_03.py](/downloads/puissance4/puissance4_chapitre_03.py)**

## Next

[Chapter 4 — detect four in a row](/en/connect-four-python-4-four-in-a-row/).

