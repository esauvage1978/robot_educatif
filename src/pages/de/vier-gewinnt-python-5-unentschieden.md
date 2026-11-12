---
layout: ../../layouts/DePost.astro
title: "Vier gewinnt in Python, Kapitel 5: Unentschieden"
description: "Eine Partie bei vier in einer Reihe oder bei vollem Brett beenden. Den Sieg vor dem Unentschieden prüfen."
updated: "11 November 2026"
---

Die herunterladbare Datei ist dieselbe wie auf der französischen Seite, deshalb bleiben die Meldungen auf Französisch.

Eine Partie endet auf zwei Arten. Jemand hat vier in einer Reihe, oder das Brett ist voll und niemand hat es. Das Brett fasst 42 Steine. Sind alle 42 gelegt und niemand hat gewonnen, ist die Partie unentschieden.

Die Reihenfolge der Prüfungen ist der Inhalt dieses Kapitels. Nach einem erfolgreichen Wurf:

1. Ist `victoire` wahr, den Spieler nennen, der gerade gelegt hat, und stoppen.
2. Sonst, wenn `grille_pleine` wahr ist, Unentschieden melden und stoppen.
3. Sonst den Spieler wechseln und wieder nach einer Spalte fragen.

Prüfen Sie zuerst das volle Brett, wird aus einem siegreichen letzten Stein ein Unentschieden. Der 42. Stein kann eine Reihe schließen.

Die Meldungen in der Datei sind französisch (`gagne`, `match nul`). Die Regel oben ist das, was diese Meldungen ausdrücken müssen.

## Was Sie sehen sollen

Schließen Sie eine Viererreihe: die Siegmeldung erscheint, und der Gegner wird nicht mehr gefragt. Füllen Sie das Brett ohne Viererreihe: die Unentschieden-Meldung erscheint einmal, nicht bei jedem Zug.

## Übungen

1. Zählen Sie die Züge und geben Sie die Zahl am Ende aus.
2. Leeren Sie das Terminal zwischen den Zügen mit `os.system("cls")` unter Windows oder `clear` unter macOS und Linux.
3. Fragen Sie nach der Partie, ob noch einmal gespielt wird.

## Das Skript

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

## Herunterladen

**[puissance4_chapitre_05.py](/downloads/puissance4/puissance4_chapitre_05.py)**

## Weiter

[Kapitel 6 — ganze Partie und zufälliger Gegner](/de/vier-gewinnt-python-6-komplettes-spiel/).

