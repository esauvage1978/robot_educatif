---
layout: ../../layouts/DePost.astro
title: "Vier gewinnt in Python: sechs Kapitel im Terminal"
description: "Vier gewinnt im Terminal: Raster 6×7, Schwerkraft, Züge, vier in einer Reihe, Unentschieden, dann eine Partie gegen einen zufälligen Gegner."
updated: "11 November 2026"
---

Die herunterladbare Datei ist dieselbe wie auf der französischen Seite, deshalb bleiben die Meldungen auf Französisch.

Zwei Spieler lassen Steine in Spalten fallen. Wer zuerst vier in einer Reihe hat, gewinnt. Das Spiel entsteht in Python 3 im Terminal, ohne Pygame und ohne zusätzliche Bibliothek.

Sie brauchen Listen, Schleifen mit `for` und `while`, und `if`. Die Reihe hat sechs Kapitel. Jedes endet mit einem lauffähigen Skript, das nächste Kapitel baut darauf auf.

Die Meldungen in den Dateien sind auf Französisch (`Grille`, `Colonne`, `Ton choix`). Der Python-Code ist in jeder Sprache derselbe. Die Bilder in Kapitel 1 und 6 zeigen genau diese französische Ausgabe.

Rechnen Sie mit 20 bis 40 Minuten je Kapitel. Am Ende von Kapitel 6 spielen zwei Menschen, oder ein Mensch gegen einen Gegner, der eine noch freie Spalte zufällig wählt. Dieser Gegner rechnet nicht voraus.

## Die sechs Kapitel

1. [Das Raster 6×7](/de/vier-gewinnt-python-1-raster/): leere Felder, Spieler 1 und 2, und warum Zeile 0 oben liegt.
2. [Anzeige und Schwerkraft](/de/vier-gewinnt-python-2-anzeige/): das Brett ausgeben und den Stein ins unterste freie Feld legen.
3. [Züge](/de/vier-gewinnt-python-3-zuege/): eine Spalte einlesen und nur nach einem gültigen Zug wechseln.
4. [Vier in einer Reihe](/de/vier-gewinnt-python-4-vier-in-einer-reihe/): von letzten Stein aus in vier Richtungen zählen.
5. [Unentschieden](/de/vier-gewinnt-python-5-unentschieden/): volles Brett, und warum der Sieg zuerst geprüft wird.
6. [Die ganze Partie](/de/vier-gewinnt-python-6-komplettes-spiel/): Menü, Beenden mit `q`, zufälliger Gegner.

## So prüfen Sie den Anfang

`python puissance4_chapitre_01.py` soll ein Brett 6×7 melden, die unterste Zeile `[0, 0, 0, 1, 0, 0, 0]` und `False` für ein volles Brett. Eine andere Zeile heißt: der Demonstrationsstein liegt nicht in Spaltenindex 3.

