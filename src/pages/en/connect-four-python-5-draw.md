---
layout: ../../layouts/EnPost.astro
title: "Connect Four in Python, chapter 5: a draw"
description: "End a Connect Four game on a win or on a full board, and test the win before the draw."
updated: "11 November 2026"
---

The downloadable script is the same file as on the French page, so its messages stay in French.

A game ends in two ways. Someone has four in a row, or the board is full and nobody does. The board holds 42 tokens. If all 42 have been played without a win, the game is a draw.

The order of the tests is the whole point of this chapter. After a successful drop:

1. If `victoire` is true, announce the player who just moved and stop.
2. Else if `grille_pleine` is true, announce a draw and stop.
3. Else switch player and ask for another column.

Testing the full board first would call a winning last move a draw. The 42nd token can complete a line.

The messages in the downloadable file are in French (`gagne`, `match nul`). The rule above is what those messages must follow.

## What you should see

Play a short game and complete four: the win message appears, and the opponent is not asked to play. Fill the board without four in a row: the draw message appears once, not on every turn.

## Exercises

1. Count the moves and print the number when the game ends.
2. Clear the terminal between turns with `os.system("cls")` on Windows or `clear` on macOS and Linux.
3. Ask whether to play again after the game (`o` to restart, anything else to stop).

## The script

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Puissance 4 — Chapitre 5/6 : match nul si grille pleine, messages clairs.
Lancer : python puissance4_chapitre_05.py
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


def grille_pleine(grille):
    return all(grille[0][c] != VIDE for c in range(COLONNES))


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


def partie_deux_humains():
    grille = nouvelle_grille()
    joueur = J1
    while True:
        afficher_grille(grille)
        print(f"Joueur {sym(joueur)} — a toi.")
        col = demander_colonne()
        if not jouer_colonne(grille, col, joueur):
            print("Colonne pleine — choisis une autre colonne.")
            continue
        ligne = ligne_du_dernier_pion(grille, col)
        if victoire(grille, ligne, col, joueur):
            afficher_grille(grille)
            print(f"Bravo : le joueur {sym(joueur)} a aligne 4 !")
            return
        if grille_pleine(grille):
            afficher_grille(grille)
            print("Match nul : grille pleine, personne n'a 4 alignes.")
            return
        joueur = J2 if joueur == J1 else J1


if __name__ == "__main__":
    partie_deux_humains()
```

## Download

**[puissance4_chapitre_05.py](/downloads/puissance4/puissance4_chapitre_05.py)**

## Next

[Chapter 6 — the full game and a random opponent](/en/connect-four-python-6-full-game/).

