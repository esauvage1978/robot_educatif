---
layout: ../../layouts/EnPost.astro
title: "Connect Four in Python, chapter 4: four in a row"
description: "Detect a Connect Four win from the last token: horizontal, vertical and both diagonals."
updated: "11 November 2026"
---

The downloadable script is the same file as on the French page, so its messages stay in French.

After a legal drop, look only around the cell that just changed. A win is four of that player’s tokens in a row. The four axes are horizontal, vertical, and the two diagonals.

`compte_direction(grille, ligne, col, joueur, dl, dc)` counts the consecutive tokens of `joueur` starting at `(ligne, col)` and stepping by `(dl, dc)`. It stops at the edge of the board or at a different value. It includes the starting cell.

A full axis is the count in one direction plus the count in the opposite direction, minus 1, because the starting cell was counted twice. If that total is at least 4, the player has won. The opposite of `(dl, dc)` is `(-dl, -dc)`.

Call this test after `jouer_colonne` returns `True`, and before you switch player. If you switch first, you will congratulate the wrong person.

The chapter’s automatic test builds a horizontal line of four and checks that `victoire` is true. A vertical or diagonal line uses the same function with another step.

## What you should see

The automatic test prints that the horizontal line is detected. Then two humans can play. When a player completes four, the game stops and names that player. A column of three must not stop the game.

## Exercises

1. Write a test that stacks four O in one column and expects a win.
2. Place four tokens on a diagonal by hand and check `victoire`.
3. If the last-token row is −1, the drop failed. Do not call `victoire` in that case.

## The script

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Puissance 4 — Chapitre 4/6 : detection de 4 alignes + partie interactive avec victoire.
Lancer : python puissance4_chapitre_04.py
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


def ligne_du_dernier_pion(grille, col):
    for ligne in range(LIGNES - 1, -1, -1):
        if grille[ligne][col] != VIDE:
            return ligne
    return -1


def compte_direction(grille, ligne, col, joueur, dl, dc):
    n = 0
    l, c = ligne, col
    while 0 <= l < LIGNES and 0 <= c < COLONNES and grille[l][c] == joueur:
        n += 1
        l += dl
        c += dc
    return n


def victoire(grille, ligne, col, joueur):
    for dl, dc in [(0, 1), (1, 0), (1, 1), (1, -1)]:
        total = (
            compte_direction(grille, ligne, col, joueur, dl, dc)
            + compte_direction(grille, ligne, col, joueur, -dl, -dc)
            - 1
        )
        if total >= 4:
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


def test_auto_horizontal():
    g = nouvelle_grille()
    for c in range(4):
        assert jouer_colonne(g, c, J1)
    ligne = ligne_du_dernier_pion(g, 3)
    assert victoire(g, ligne, 3, J1)
    print("Test auto : 4 X en ligne horizontale — OK")


def partie_avec_victoire():
    grille = nouvelle_grille()
    joueur = J1
    while True:
        afficher_grille(grille)
        print(f"Joueur {sym(joueur)}")
        col = demander_colonne()
        if not jouer_colonne(grille, col, joueur):
            print("Colonne pleine.")
            continue
        ligne = ligne_du_dernier_pion(grille, col)
        if victoire(grille, ligne, col, joueur):
            afficher_grille(grille)
            print(f"Joueur {sym(joueur)} a gagne !")
            break
        joueur = J2 if joueur == J1 else J1


if __name__ == "__main__":
    test_auto_horizontal()
    print("\nPartie a deux (Ctrl+C pour arreter) :\n")
    partie_avec_victoire()
```

## Download

**[puissance4_chapitre_04.py](/downloads/puissance4/puissance4_chapitre_04.py)**

## Next

[Chapter 5 — a draw](/en/connect-four-python-5-draw/).

