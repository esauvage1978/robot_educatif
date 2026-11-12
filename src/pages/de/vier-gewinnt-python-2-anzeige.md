---
layout: ../../layouts/DePost.astro
title: "Vier gewinnt in Python, Kapitel 2: Anzeige und Schwerkraft"
description: "Das Brett mit . X O ausgeben und einen Stein in das unterste freie Feld einer Spalte legen."
updated: "11 November 2026"
---

Die herunterladbare Datei ist dieselbe wie auf der französischen Seite, deshalb bleiben die Meldungen auf Französisch.

Kapitel 1 speichert das Brett. Dieses Kapitel macht es lesbar und lässt einen Stein fallen.

`afficher_grille` gibt die Spaltennummern 1 bis 7 aus, dann jede Zeile. Das Wörterbuch `SYM` macht aus `0`, `1` und `2` die Zeichen `.`, `X` und `O`. Menschen zählen Spalten ab 1. Die Listen nutzen weiter die Indizes 0 bis 6. Die gedruckte Nummer ist der Index plus eins.

`colonne_jouable` lehnt eine Spalte außerhalb von 0–6 ab und eine Spalte, deren oberstes Feld (`grille[0][col]`) schon belegt ist. Ist oben kein Platz, kann nichts mehr fallen.

`jouer_colonne` geht die Zeilen von unten: `range(LIGNES - 1, -1, -1)` ist 5, 4, 3, 2, 1, 0. Es schreibt die Spielernummer in das erste leere Feld und gibt `True` zurück. Ist kein Feld frei, gibt es `False` zurück. Ein gescheiterter Wurf ist kein Zug. Kapitel 3 lässt deshalb denselben Spieler noch einmal wählen.

Die Demonstration wirft dreimal in Spaltenindex 3: X, dann O, dann X. Auf dem Bildschirm ist das Spalte 4, von unten gestapelt.

## Was Sie sehen sollen

Die unteren drei Felder von Spalte 4 zeigen X, O und X, mit X ganz unten. Die übrigen Felder bleiben `.`. Liegt ein Stein oben, läuft die Schleife von oben nach unten.

## Übungen

1. Werfen Sie einen vierten Stein in dieselbe Spalte und geben Sie das Brett erneut aus.
2. Schreiben Sie `hauteur_colonne(grille, col)`: wie viele Felder dieser Spalte nicht leer sind.
3. Rufen Sie `jouer_colonne` achtmal für dieselbe Spalte auf. Die letzten beiden Aufrufe müssen `False` liefern, und das Brett darf nicht wachsen.

## Das Skript

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Puissance 4 — Chapitre 2/6 : affichage ASCII, gravite, jouer_colonne.
Lancer : python puissance4_chapitre_02.py
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


if __name__ == "__main__":
    g = nouvelle_grille()
    jouer_colonne(g, 3, J1)
    jouer_colonne(g, 3, J2)
    jouer_colonne(g, 3, J1)
    print("Exemple : trois pions dans la colonne 4 (indice 3)\n")
    afficher_grille(g)
```

## Herunterladen

**[puissance4_chapitre_02.py](/downloads/puissance4/puissance4_chapitre_02.py)**

## Weiter

[Kapitel 3 — Spalte lesen und abwechseln](/de/vier-gewinnt-python-3-zuege/). [Kapitel 1](/de/vier-gewinnt-python-1-raster/).

