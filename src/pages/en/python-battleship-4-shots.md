---
layout: ../../layouts/EnPost.astro
title: "Python Battleship (4/6): shots and grid marks"
description: "Apply a shot to the opponent's defense grid, update radar and defense marks, and refuse a second shot on the same square in this Python chapter."
updated: "2 November 2026"
faqSchema:
  - question: "Why two grids (defense and radar)?"
    answer: "The defender sees their hidden # cells. The shooter only sees ?, O, and X on their radar."
  - question: "What if a player types the same square again?"
    answer: "Return \"deja\" or \"case_deja_jouee\" without changing the grid. That is the anti-cheat rule."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/programmation/bataille-navale/">Battleship series</a> · Part 4/6</nav>

> **Battleship series (4/6)** — [Series contents](/programmation/bataille-navale/) · [Part 3](/python-bataille-navale-3-placement-bateaux/) · [Part 5](/python-bataille-navale-5-coule-et-victoire/)

You have a **fleet** placed on a defense grid ([part 3](/python-bataille-navale-3-placement-bateaux/)). This article describes what happens when a player **fires** at a square `(row, column)`. If you are new to Python, review [lists and strings](/python-listes-et-chaines/) and [if/else conditions](/en/python-conditions-if-else/) first.

![Radar and defense grids after several shots](/images/illustrations/python-bataille-navale-4-tirs-et-marques.webp)

## 1. Defender’s side: update *my* grid

A reminder of the symbols ([part 1](/en/python-battleship-1-brief/)):

- `#` → `X` when a ship is hit on that square.
- `.` → `o` when the opponent fires into the water (on *your* grid you record the miss).

```python
VIDE = "."
NAVIRE = "#"
TOUCHE = "X"
MANQUE_DEFENSE = "o"

def appliquer_tir_defense(grille_defense, ligne, col):
    cell = grille_defense[ligne][col]
    if cell == NAVIRE:
        grille_defense[ligne][col] = TOUCHE
        return "touche"
    if cell == VIDE:
        grille_defense[ligne][col] = MANQUE_DEFENSE
        return "manque"
    # already played (# should not remain if shots are handled; X or o = a repeat shot)
    return "deja"
```

In a **serious game**, you refuse a shot on a square that is already `X` or `o`: return `"deja"` **before** you change anything, or test the shooter’s radar.

## 2. Attacker’s side: update the radar

The radar does not know the hidden `#` cells: only `?`, `O`, and `X`.

```python
RADAR_INCONNU = "?"
RADAR_MANQUE = "O"
RADAR_TOUCHE = "X"

def appliquer_tir_radar(grille_radar, ligne, col, resultat):
    if grille_radar[ligne][col] != RADAR_INCONNU:
        return False  # square already played on the attacker’s side
    if resultat == "touche":
        grille_radar[ligne][col] = RADAR_TOUCHE
    elif resultat == "manque":
        grille_radar[ligne][col] = RADAR_MANQUE
    else:
        return False
    return True
```

The **defender** announces `touche` / `manque` (and soon `coule` — [part 5](/python-bataille-navale-5-coule-et-victoire/)); the **shooter** updates **their** radar to match.

## 3. A minimal sequence in a `tour` function

```python
def executer_tir(grille_defense_cible, grille_radar_tireur, ligne, col):
    if grille_radar_tireur[ligne][col] != RADAR_INCONNU:
        return "case_deja_jouee"

    etat = grille_defense_cible[ligne][col]
    if etat in (TOUCHE, MANQUE_DEFENSE):
        return "incoherent_defenseur"

    if etat == NAVIRE:
        grille_defense_cible[ligne][col] = TOUCHE
        appliquer_tir_radar(grille_radar_tireur, ligne, col, "touche")
        return "touche"

    grille_defense_cible[ligne][col] = MANQUE_DEFENSE
    appliquer_tir_radar(grille_radar_tireur, ligne, col, "manque")
    return "manque"
```

Adjust this if you prefer **not** to expose the defender’s internal state to the shooter (in a real paper game, the defender answers without showing their grid).

## 4. “Same player shoots again after a hit” (optional)

Classic version: after a **hit**, the same player **shoots again** until they miss. That is a simple condition in your game loop ([part 6](/python-bataille-navale-6-jeu-complet/)): if `executer_tir` returns `touche`, do not switch players.

## Exercises

1. Create two mini **3×3** grids by hand, simulate three shots, and display defense + radar after each shot.
2. Write a function `tir_valide(radar, ligne, col)` that is `True` only when the square is still `?`.
3. Fire **twice** at the same square: your program must refuse it or print a clear message.

## Next

[Part 5 — Detect “sunk” and the end of the game](/python-bataille-navale-5-coule-et-victoire/).

## FAQ

**Why two grids (defense and radar)?**  
The **defender** sees their hidden `#` cells; the **shooter** only sees `?`, `O`, and `X` on their radar.

**What if a player types the same square again?**  
Return `"deja"` or `"case_deja_jouee"` **without** changing the grid — that is an anti-cheat rule.

**After a hit, who plays again?**  
Under the classic rule, the same player continues until a miss ([part 6](/python-bataille-navale-6-jeu-complet/)).

![A game in progress in the terminal](/images/blog/lot15/bataille-navale-partie-finie.png)

## Full script for this chapter

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Battleship — Chapter 4/6: shots on defense + radar.
Run: python bataille_chapitre_04.py
"""

import random

TAILLE = 10
VIDE = "."
NAVIRE = "#"
TOUCHE = "X"
MANQUE_DEFENSE = "o"
RADAR_INCONNU = "?"
RADAR_MANQUE = "O"
RADAR_TOUCHE = "X"
LONGUEURS_NAVIRES = [5, 4, 3, 3, 2]


def nouvelle_grille_defense():
    return [[VIDE for _ in range(TAILLE)] for _ in range(TAILLE)]


def nouvelle_grille_radar():
    return [[RADAR_INCONNU for _ in range(TAILLE)] for _ in range(TAILLE)]


def lettre_ligne(i):
    return chr(ord("A") + i)


def afficher_grille_lettres(grille, titre="Grid"):
    print(titre)
    print("    " + " ".join(str(c + 1) for c in range(TAILLE)))
    for i, ligne in enumerate(grille):
        print(f"{lettre_ligne(i):2}  " + "  ".join(cell for cell in ligne))


def parser_case(texte):
    texte = texte.strip().upper().replace(" ", "")
    if len(texte) < 2:
        raise ValueError("Too short (e.g. B7)")
    lettre = texte[0]
    chiffres = texte[1:]
    derniere = chr(ord("A") + TAILLE - 1)
    if not ("A" <= lettre <= derniere):
        raise ValueError(f"Row A–{derniere}")
    ligne = ord(lettre) - ord("A")
    colonne = int(chiffres) - 1
    if not (0 <= colonne < TAILLE):
        raise ValueError(f"Column 1–{TAILLE}")
    return ligne, colonne


def cases_libres(grille, cases):
    for ligne, col in cases:
        if not (0 <= ligne < TAILLE and 0 <= col < TAILLE):
            return False
        if grille[ligne][col] != VIDE:
            return False
    return True


def cases_navire(debut_ligne, debut_col, longueur, horizontal):
    coords = []
    for k in range(longueur):
        if horizontal:
            coords.append((debut_ligne, debut_col + k))
        else:
            coords.append((debut_ligne + k, debut_col))
    return coords


def placer_navire(grille, coords):
    for ligne, col in coords:
        grille[ligne][col] = NAVIRE


def essayer_placer(grille, debut_ligne, debut_col, longueur, horizontal):
    coords = cases_navire(debut_ligne, debut_col, longueur, horizontal)
    if not cases_libres(grille, coords):
        return None
    placer_navire(grille, coords)
    return coords


def placement_aleatoire(grille):
    flotte = []
    for L in LONGUEURS_NAVIRES:
        for _ in range(5000):
            h = random.choice([True, False])
            i = random.randrange(TAILLE)
            j = random.randrange(TAILLE)
            coords = essayer_placer(grille, i, j, L, h)
            if coords:
                flotte.append(coords)
                break
        else:
            raise RuntimeError("Random placement failed.")
    return flotte


def executer_tir(grille_defense_cible, grille_radar_tireur, ligne, col):
    if grille_radar_tireur[ligne][col] != RADAR_INCONNU:
        return "deja"
    etat = grille_defense_cible[ligne][col]
    if etat in (TOUCHE, MANQUE_DEFENSE):
        return "incoherent"
    if etat == NAVIRE:
        grille_defense_cible[ligne][col] = TOUCHE
        grille_radar_tireur[ligne][col] = RADAR_TOUCHE
        return "touche"
    grille_defense_cible[ligne][col] = MANQUE_DEFENSE
    grille_radar_tireur[ligne][col] = RADAR_MANQUE
    return "manque"


def demo_tirs():
    random.seed()
    defense = nouvelle_grille_defense()
    placement_aleatoire(defense)
    radar = nouvelle_grille_radar()
    afficher_grille_lettres(defense, "(DEBUG) Opponent grid — in a real game you do not see it")
    for case in ["A1", "E5", "J10"]:
        li, co = parser_case(case)
        res = executer_tir(defense, radar, li, co)
        print(case, "->", res)
    afficher_grille_lettres(radar, "Your radar after 3 shots")


def main():
    demo_tirs()


if __name__ == "__main__":
    main()
```

## Download this chapter

**[bataille_chapitre_04.py](/downloads/bataille-navale/bataille_chapitre_04.py)**

## Amazon

<a href="https://www.amazon.com/s?k=clean+code+python+book&tag=roboteducatif-20" class="btn btn-action" rel="nofollow sponsored noopener" target="_blank">Check today's price on Amazon</a>
