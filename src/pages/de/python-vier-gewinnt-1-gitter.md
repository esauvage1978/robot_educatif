---
layout: ../../layouts/DePost.astro
title: "Vier gewinnt in Python (1/6) — Gitter 6×7 und Datenmodell"
description: "6×7-Gitter als Liste von Listen, Konstanten VIDE/J1/J2, grille_pleine — puissance4_chapitre_01.py zum Download, Serie Vier gewinnt, Oktober 2026."
updated: "31. Oktober 2026"
schemaUpdated: "2026-10-31"
faqSchema:
  - question: "Warum ein 6×7-Gitter beim Vier gewinnt?"
    answer: "Das entspricht dem klassischen Spiel: Spielsteine fallen in eine Spalte bis zur untersten freien Zelle. Sechs Reihen und sieben Spalten sind der Standard."
  - question: "Was bedeuten VIDE = 0, J1 = 1 und J2 = 2?"
    answer: "Konstanten für leer, Spieler 1 (später X), Spieler 2 (O). Zahlen halten die Logik in der Liste einfach."
  - question: "Wie prüfe ich Kapitel 1?"
    answer: "python puissance4_chapitre_01.py ausführen: Grille 6 x 7 creee, untere Zeile mit einer 1 an Index 3 (drei Steine in derselben Spalte), Grille pleine ? False, OK-Hinweis auf Kapitel 2."
---

Einige Links sind Partnerlinks. **Amazon.de** ist der Standardshop. Preis am Tag des Kaufs prüfen — wir erfinden keine Beträge.

**Kurzantwort (Oktober 2026)** — Du legst das **Fundament** für **Vier gewinnt** in **Python 3**: ein **6×7-Gitter** als **Liste von Listen**, **Konstanten** (`VIDE`, `J1`, `J2`) und **`grille_pleine`** für ein späteres **Remis**. Noch ohne schöne Anzeige — du arbeitest im **Terminal** (Textfenster mit `python datei.py`). **`puissance4_chapitre_01.py`** ist unten **downloadbar**; weiter mit [Kapitel 2 — Anzeige und Schwerkraft](/python-puissance-4-2-affichage-gravite/).

**Serie Vier gewinnt (6 Teile)** — [Übersicht](/programmation/puissance-4/) · **1 — Gitter (diese Seite)** · [2](/python-puissance-4-2-affichage-gravite/) · [3](/python-puissance-4-3-coup-alternance/) · [4](/python-puissance-4-4-quatre-alignes/) · [5](/python-puissance-4-5-match-nul/) · [6 — Komplettspiel](/de/python-vier-gewinnt-6-komplettspiel/)

| Kriterium | Angabe |
| --- | --- |
| **Ziel** | Konstanten, `nouvelle_grille()`, `grille_pleine()` |
| **Niveau** | Einsteiger (nach Listen und Python-Grundlagen) |
| **Dauer** | 30–45 Min. |
| **Material** | PC mit **Python 3** |
| **Voraussetzung** | [Python-Kurs](/programmation/python/), [Listen & Zeichenketten](/python-listes-et-chaines/), [if/else](/de/python-bedingungen-if-else/) |
| **Erfolg** | Skript erzeugt leeres Gitter, Demo-Stapel, „nicht voll“ |

<figure class="article-figure">
  <img src="/images/lot10/puissance4-ch1-terminal-output.webp" alt="Terminal: Ausgabe von puissance4_chapitre_01.py — Gitter erzeugt, untere Zeile mit Einsen." width="920" height="520" loading="eager" decoding="async" />
  <figcaption>Ausgabe nach dem Kapitel-1-Skript (französische Meldungen in der Datei). Credit: Emmanuel Sauvage, Robot Éducatif — Oktober 2026.</figcaption>
</figure>

## Das Spiel, das du programmierst

**Vier gewinnt** (Connect Four / **Puissance 4**) : Spielsteine in **Spalten**, **Schwerkraft** nach unten, **vier in einer Reihe** gewinnt, volles Brett ohne Sieger = **Remis**.

Dieses Kapitel bereitet nur die **Datenstruktur** vor (Kapitel 2–6 bauen darauf). Vom [Terminal-Mini-Spiel](/de/python-mini-terminalspiel/) kennst du schon die Konsole; hier kommt ein **2D-Gitter** dazu.

## Terminal starten

**Windows:** PowerShell, `py puissance4_chapitre_01.py` falls nötig. **Mac/Linux:** `python3`. **VS Code / Thonny:** integriertes Terminal.

## 1. Maße und Konstanten

| Konstante | Wert | Bedeutung |
| --- | --- | --- |
| `LIGNES` | 6 | Zeilen |
| `COLONNES` | 7 | Spalten |
| `VIDE` | 0 | leer |
| `J1` / `J2` | 1 / 2 | Spieler 1 (X) / 2 (O) |

Zeile **0** = **oben**, **5** = **unten**. Spalte **0** links, **6** rechts. Demo: `col_demo = 3` (vierte Spalte für Menschen).

## 2. `nouvelle_grille()`

```python
def nouvelle_grille():
    return [[VIDE for _ in range(COLONNES)] for _ in range(LIGNES)]
```

Bei Unsicherheit: [Listen](/python-listes-et-chaines/), [Schleifen](/python-boucles-for-while/).

## 3. `grille_pleine()`

```python
def grille_pleine(grille):
    return all(grille[0][c] != VIDE for c in range(COLONNES))
```

Einsatz in [Kapitel 5](/python-puissance-4-5-match-nul/).

## 4. Vollständiges Skript

Identisch mit **[puissance4_chapitre_01.py](/downloads/puissance4/puissance4_chapitre_01.py)** (Funktionsnamen auf Französisch — bewusst für die ganze Serie).

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
VIDE, J1, J2 = 0, 1, 2
LIGNES, COLONNES = 6, 7

def nouvelle_grille():
    return [[VIDE for _ in range(COLONNES)] for _ in range(LIGNES)]

def grille_pleine(grille):
    return all(grille[0][c] != VIDE for c in range(COLONNES))

if __name__ == "__main__":
    g = nouvelle_grille()
    print("Grille", LIGNES, "x", COLONNES, "creee.")
    assert len(g) == LIGNES and len(g[0]) == COLONNES
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

## 5. Starten und prüfen

`python puissance4_chapitre_01.py` — erwartete Meldungen wie im Screenshot, kein Traceback.

## 6. Fehlerbehebung

| Symptom | Ursache | Lösung |
| --- | --- | --- |
| `python` unbekannt | kein PATH | Python 3 neu installieren oder `py` |
| `IndentationError` | Tabs | 4 Leerzeichen pro Block |
| Untere Zeile nur Nullen | Demo fehlt | Doppelschleife `range(3)` prüfen |
| `grille_pleine` sofort True | falsche Bedingung | Obere Zeile muss noch `0` haben |

## 7. Übungen

1. `len(g)`, `len(g[0])` auf neuer Gitter? → **6**, **7**.  
2. `grille_pleine(nouvelle_grille())`? → **False**.  
3. Zwei `J2` in Spalte 0 von unten → `g[5][0]` und `g[4][0]` sind **2**.

Weitere Projekte: [Galgenmännchen](/programmation/pendu/), [Schiffe versenken](/programmation/bataille-navale/), [Kapitel 6 Komplettspiel](/de/python-vier-gewinnt-6-komplettspiel/).

## Download

**[puissance4_chapitre_01.py](/downloads/puissance4/puissance4_chapitre_01.py)**

## Weiter

[Kapitel 2 — Anzeige und Schwerkraft](/python-puissance-4-2-affichage-gravite/)

## Amazon (Partner)

- <a href="/go/az-de-06cde53fe7" rel="sponsored nofollow noopener" class="affiliate-link">Python-Spiele- und Projekt-Bücher bei Amazon.de</a>

*Emmanuel Sauvage — Aktualisierung 31. Oktober 2026.*
