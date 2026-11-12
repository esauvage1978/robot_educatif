---
layout: ../../layouts/DePost.astro
title: "Vier gewinnt in Python, Kapitel 3: Spalten und Züge"
description: "Eine Spalte von 1 bis 7 einlesen, eine ungültige Eingabe ablehnen und nur nach einem echten Wurf den Spieler wechseln."
updated: "11 November 2026"
---

Die herunterladbare Datei ist dieselbe wie auf der französischen Seite, deshalb bleiben die Meldungen auf Französisch.

Das Brett kann einen Stein aufnehmen. Dieses Kapitel fragt einen Menschen nach der Spalte und wechselt zwischen X und O. Es erkennt noch keinen Sieg. Das ist Kapitel 4.

`demander_colonne` wiederholt die Frage, bis eine ganze Zahl von 1 bis 7 kommt. `input` liefert Text, `int` wandelt ihn um. Ein Wort, eine leere Zeile oder eine Zahl außerhalb von 1–7 wird abgelehnt. Die Funktion gibt den Index zurück, also die getippte Nummer minus eins.

Die Zugschleife ruft `jouer_colonne` auf. Nur ein Ergebnis `True` wechselt den Spieler: `joueur = J2 if joueur == J1 else J1`. Ist die Spalte voll, ist derselbe Spieler wieder an der Reihe. Ein Wechsel trotzdem würde dem Gegner einen Zug schenken.

Das Kapitel endet nach einer festen Anzahl von Zügen, weil es den Sieg noch nicht kennt. Erhöhen Sie diese Grenze nicht in der Erwartung, dass ein Gewinner gemeldet wird.

## Was Sie sehen sollen

Tippen Sie `4`, dann noch einmal `4`. Der erste Stein ist X unten in Spalte 4, der zweite ist O direkt darüber, und die Frage geht an den ersten Spieler zurück. `abc` darf das Programm nicht abstürzen lassen.

## Übungen

1. Erlauben Sie das Beenden mit `q`: `demander_colonne` gibt `None` zurück und die Schleife stoppt.
2. Geben Sie bei jedem Zug die Zugnummer aus.
3. Spielen Sie eine lange Partie ohne Siegmeldung. Die Meldung kommt in Kapitel 4.

## Das Skript

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

## Herunterladen

**[puissance4_chapitre_03.py](/downloads/puissance4/puissance4_chapitre_03.py)**

## Weiter

[Kapitel 4 — vier in einer Reihe erkennen](/de/vier-gewinnt-python-4-vier-in-einer-reihe/).

