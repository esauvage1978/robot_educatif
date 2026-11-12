---
layout: ../../layouts/DePost.astro
title: "Vier gewinnt in Python, Kapitel 1: das Raster 6×7"
description: "Kapitel 1: eine Liste aus sechs Listen mit je sieben Zahlen. 0 ist leer, 1 und 2 sind die Spieler."
updated: "11 November 2026"
---

Die herunterladbare Datei ist dieselbe wie auf der französischen Seite, deshalb bleiben die Meldungen auf Französisch.

Ein Vier-gewinnt-Brett hat 6 Zeilen und 7 Spalten. Dieses Kapitel baut nur das Brett. Es gibt noch keine lesbare Ausgabe und noch kein Fallen: das ist Kapitel 2.

Eine Zelle ist eine ganze Zahl. `0` ist leer, `1` ist der erste Spieler, `2` der zweite. Zahlen lassen sich später einfacher vergleichen als die Texte `"X"` und `"O"`.

`nouvelle_grille` liefert eine Liste von 6 Listen mit je 7 Nullen. Der äußere Index ist die Zeile. **Zeile 0 ist oben**, Zeile 5 ist unten. Kapitel 2 sucht von unten nach oben und bleibt beim ersten leeren Feld stehen.

`grille_pleine` ist nur wahr, wenn in Zeile 0 keine Null mehr steht. Ist die oberste Zeile voll, ist jede Spalte voll, weil die Steine immer so tief wie möglich fallen. Kapitel 5 benutzt die Funktion für das Unentschieden.

Die Demonstration schreibt eine `1` in Zeile 5, Spaltenindex 3. Für einen Menschen ist das die unterste Zeile, Spalte 4, weil die Tastatur später die Spalten 1 bis 7 verwendet.

![PowerShell nach Kapitel 1: Brett erzeugt, unterste Zeile [0, 0, 0, 1, 0, 0, 0], Brett nicht voll.](/images/lot10/puissance4-ch1-terminal-output.webp)

*Ausgabe von `puissance4_chapitre_01.py`. Die Meldungen sind französisch, weil das die veröffentlichte Datei der Reihe ist. Die `1` steht in der letzten Zeile, vierte Spalte.*

## Starten

Speichern Sie das Skript als `puissance4_chapitre_01.py` oder laden Sie die Datei herunter. Im Ordner der Datei:

```text
python puissance4_chapitre_01.py
```

Sie sollten `Grille 6 x 7 creee.` lesen, dann die unterste Zeile `[0, 0, 0, 1, 0, 0, 0]`, dann `Grille pleine ? False`.

## Übungen

1. Geben Sie das ganze Raster zeilenweise aus, bevor Sie zu Kapitel 2 gehen.
2. Legen Sie einen zweiten Stein in Zeile 4 derselben Spalte und prüfen Sie, dass er direkt über dem ersten liegt.
3. Was liefert `grille_pleine`, wenn nur Zeile 5 gefüllt ist? Es muss falsch bleiben: die oberste Zeile ist noch leer.

## Das Skript

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

## Herunterladen

**[puissance4_chapitre_01.py](/downloads/puissance4/puissance4_chapitre_01.py)**

## Weiter

[Kapitel 2 — Brett anzeigen und einen Stein fallen lassen](/de/vier-gewinnt-python-2-anzeige/).

