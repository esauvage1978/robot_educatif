---
layout: ../../layouts/DePost.astro
title: "Vier gewinnt in Python, Kapitel 4: vier in einer Reihe"
description: "Einen Sieg vom letzten Stein aus erkennen: waagerecht, senkrecht und beide Diagonalen."
updated: "11 November 2026"
---

Die herunterladbare Datei ist dieselbe wie auf der französischen Seite, deshalb bleiben die Meldungen auf Französisch.

Nach einem gültigen Wurf wird nur das Feld betrachtet, das sich gerade geändert hat. Ein Sieg sind vier Steine dieses Spielers in einer Reihe. Die vier Achsen sind waagerecht, senkrecht und die beiden Diagonalen.

`compte_direction(grille, ligne, col, joueur, dl, dc)` zählt die aufeinanderfolgenden Steine von `joueur` ab `(ligne, col)` mit dem Schritt `(dl, dc)`. Es stoppt am Rand oder bei einem anderen Wert. Das Startfeld zählt mit.

Eine ganze Achse ist die Zahl in einer Richtung plus die Zahl in der Gegenrichtung, minus 1, weil das Startfeld doppelt gezählt wurde. Ist die Summe mindestens 4, hat der Spieler gewonnen. Die Gegenrichtung von `(dl, dc)` ist `(-dl, -dc)`.

Rufen Sie die Prüfung auf, nachdem `jouer_colonne` `True` geliefert hat, und bevor Sie den Spieler wechseln. Wechseln Sie zuerst, gratulieren Sie der falschen Person.

Der automatische Test des Kapitels baut eine waagerechte Viererreihe und erwartet, dass `victoire` wahr ist. Senkrecht und diagonal ist dieselbe Funktion mit einem anderen Schritt.

## Was Sie sehen sollen

Der Test meldet, dass die waagerechte Reihe erkannt wird. Danach können zwei Menschen spielen. Wer vier vervollständigt, beendet die Partie. Drei Steine in einer Spalte dürfen nicht beenden.

## Übungen

1. Schreiben Sie einen Test, der vier O in eine Spalte stapelt und einen Sieg erwartet.
2. Legen Sie vier Steine von Hand auf eine Diagonale und prüfen Sie `victoire`.
3. Ist die Zeile des letzten Steins −1, ist der Wurf misslungen. Rufen Sie dann `victoire` nicht auf.

## Das Skript

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

## Herunterladen

**[puissance4_chapitre_04.py](/downloads/puissance4/puissance4_chapitre_04.py)**

## Weiter

[Kapitel 5 — Unentschieden](/de/vier-gewinnt-python-5-unentschieden/).

