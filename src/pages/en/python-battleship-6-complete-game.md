---
layout: ../../layouts/EnPost.astro
title: "Python Battleship (6/6): the complete terminal game"
description: "Build the full two-player Python Battleship game in the terminal: a readable main loop, hiding the screen between turns, and a random-AI variant."
updated: "2 November 2026"
faqSchema:
  - question: "How do two players share one computer?"
    answer: "Each player places a fleet in turn. The loop then shows only the current player's radar, applies the shot to the opponent's defense grid, and switches players."
  - question: "How do you hide the grid between turns?"
    answer: "Print many blank lines, or call os.system(\"cls\") on Windows and os.system(\"clear\") on macOS and Linux. Use that sparingly, because it is less portable."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

You have all the **pieces**: the [grid](/en/python-battleship-2-grid-display/), [placement](/en/python-battleship-3-placing-ships/), [shots](/en/python-battleship-4-shots/), and [sunk ships](/en/python-battleship-5-sunk-and-win/). What remains is to **assemble** a readable `main()` and a game loop.

> **Battleship series (6/6)** — [Series contents](/programmation/bataille-navale/) · [Python course](/programmation/python/)

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/programmation/bataille-navale/">Battleship series</a></nav>

The **complete** script below and the file **[bataille_chapitre_06.py](/downloads/bataille-navale/bataille_chapitre_06.py)** are the same: you can copy and paste or download, then run `python bataille_chapitre_06.py`.

![Game over — a victory message in the terminal](/images/blog/lot15/bataille-navale-partie-finie.png)

*Example of the end of a two-player game (teaching screenshot).*

## 1. A recommended project layout

A single file `bataille.py` at the start, or else:

- `constantes.py` — `TAILLE`, symbols, `LONGUEURS_NAVIRES`
- `grille.py` — creation, display, `parser_case`
- `navires.py` — placement, `flotte`
- `tirs.py` — `executer_tir`, messages
- `jeu.py` — `main()`

While you are learning, one file of 200–400 lines, split cleanly into **functions**, works very well.

## 2. Two players on the same computer

1. **Player 1** places their fleet (without Player 2 looking — on your honor, or `input("Press Enter when Player 2 has turned around")`).
2. **Player 2** places theirs.
3. Loop: show the current player’s **radar** (not their defense, except in debug mode), ask for a square, apply the shot to the **opponent’s** grid, announce hit / miss / sunk, and test `tous_coules`.
4. **Switch player** (unless you apply the rule “play again after a hit”).

```python
def main_deux_humains():
    g1 = nouvelle_grille_defense()
    g2 = nouvelle_grille_defense()
    r1 = nouvelle_grille_radar()
    r2 = nouvelle_grille_radar()

    print("=== Player 1 placement ===")
    f1 = placement_joueur(g1)  # to implement: typed input or random
    print("=== Player 2 placement ===")
    f2 = placement_joueur(g2)

    joueur = 1
    while True:
        if joueur == 1:
            defense_adverse, radar_local, flotte_adverse = g2, r1, f2
        else:
            defense_adverse, radar_local, flotte_adverse = g1, r2, f1

        afficher_grille_lettres(radar_local, f"Radar P{joueur}")
        case_txt = input(f"P{joueur}, your target (e.g. D5)? ")
        ligne, col = parser_case(case_txt)
        # ... executer_tir, sunk messages, test tous_coules(flotte_adverse)
        # ... win -> print and return

        joueur = 3 - joueur  # toggles 1 <-> 2
```

Adapt the function names to what you wrote in the earlier articles.

## 3. “Hiding” the grid between turns

In a terminal you cannot force the screen the way a system console can everywhere. Possible tricks:

- several `print("\n" * 40)` to scroll the previous grid away;
- on Windows **PowerShell** / cmd, `os.system("cls")`; on Mac/Linux `os.system("clear")` — use that sparingly (it is less portable).

```python
import os

def effacer_ecran():
    os.system("cls" if os.name == "nt" else "clear")
```

## 4. Variant: a “blind” random AI

The computer fires at **`?`** squares at random until it hits — with no strategy. That is enough to test your engine:

```python
import random

def tir_ia(radar_ia):
    inconnues = [(i, j) for i in range(TAILLE) for j in range(TAILLE) if radar_ia[i][j] == "?"]
    return random.choice(inconnues)
```

A slightly smarter AI could, after a hit, aim at **neighboring** squares that are still `?`: a good extra exercise.

## 5. Handling bad input

Wrap `parser_case` and `int(input())` in **`try` / `except`** ([errors and debugging](/en/python-errors-and-debugging/)): ask for a square again until the input is valid and has not already been played.

## 6. Ideas for extensions

- Save a game to a file ([text files](/en/python-text-files/)).
- Statistics: number of shots, elapsed time (`time` module).
- **Solo** mode: random placement of the enemy fleet plus an AI.

## Final checklist

- [ ] 17 `#` squares per player at the start (5+4+3+3+2).
- [ ] You cannot fire twice at the same radar square.
- [ ] Consistent messages: miss, hit, sunk, win.
- [ ] Code split into functions you can test one by one.

Well done on the **Battleship** course: you can go back to the [series contents](/programmation/bataille-navale/) or the [Python course](/programmation/python/) to review one idea in detail.

## Complete script for this chapter

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Battleship — Chapter 6/6: complete two-player game (placement + shots).
Run: python bataille_chapitre_06.py
"""

import os
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


def effacer_ecran():
    os.system("cls" if os.name == "nt" else "clear")


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


def placement_joueur(grille, nom_joueur):
    flotte = []
    for L in LONGUEURS_NAVIRES:
        while True:
            afficher_grille_lettres(grille, f"{nom_joueur} — ship of length {L}")
            try:
                case = input("Starting square (e.g. A1)? ").strip()
                li, co = parser_case(case)
                ori = input("Orientation H (horizontal) or V (vertical)? ").strip().upper()
                horizontal = not ori.startswith("V")
                coords = essayer_placer(grille, li, co, L, horizontal)
                if coords:
                    flotte.append(coords)
                    break
                print("Cannot place: off the grid, overlap, or ship too long.")
            except ValueError as e:
                print("Invalid input:", e)
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


def navire_coule(grille_defense, coords_navire):
    for ligne, col in coords_navire:
        if grille_defense[ligne][col] != TOUCHE:
            return False
    return True


def navire_contenant(flotte, ligne, col):
    for navire in flotte:
        if (ligne, col) in navire:
            return navire
    return None


def tous_coules(grille_defense, flotte):
    for navire in flotte:
        if not navire_coule(grille_defense, navire):
            return False
    return True


def message_apres_tir(grille_defense, flotte, ligne, col, code):
    if code != "touche":
        return code
    nav = navire_contenant(flotte, ligne, col)
    if nav is None:
        return "touche"
    if navire_coule(grille_defense, nav):
        return "coule"
    return "touche"


def main_deux_humains():
    random.seed()
    print("1 = Manual placement   2 = Random placement for both")
    mode = input("Mode? ").strip()
    g1, g2 = nouvelle_grille_defense(), nouvelle_grille_defense()
    r1, r2 = nouvelle_grille_radar(), nouvelle_grille_radar()
    if mode == "2":
        f1, f2 = placement_aleatoire(g1), placement_aleatoire(g2)
        print("Fleets placed at random (each player does not see the other).")
    else:
        input("Player 1 — press Enter when it is your turn (Player 2, look away).")
        effacer_ecran()
        f1 = placement_joueur(g1, "Player 1")
        input("Player 1 is done. Player 2 — press Enter (Player 1, look away).")
        effacer_ecran()
        f2 = placement_joueur(g2, "Player 2")
        effacer_ecran()

    joueur = 1
    while True:
        if joueur == 1:
            defense_adv, radar_local, flotte_adv = g2, r1, f2
            nom = "Player 1"
        else:
            defense_adv, radar_local, flotte_adv = g1, r2, f1
            nom = "Player 2"

        afficher_grille_lettres(radar_local, f"Radar — {nom}")
        case_txt = input(f"{nom}, target (e.g. D5), blank to quit? ").strip()
        if not case_txt:
            print("Game abandoned.")
            return
        try:
            li, co = parser_case(case_txt)
        except ValueError as e:
            print(e)
            continue
        code = executer_tir(defense_adv, radar_local, li, co)
        if code == "deja":
            print("Square already played.")
            continue
        if code == "incoherent":
            print("Internal error — try again.")
            continue
        msg = message_apres_tir(defense_adv, flotte_adv, li, co, code)
        if msg == "manque":
            print("Miss.")
        elif msg == "touche":
            print("Hit!")
        elif msg == "coule":
            print("Hit and sunk!")
        if tous_coules(defense_adv, flotte_adv):
            afficher_grille_lettres(radar_local, f"Radar — {nom}")
            print(f"{nom} wins — the whole opposing fleet is sunk!")
            return
        joueur = 3 - joueur


if __name__ == "__main__":
    main_deux_humains()
```

## Download this chapter

**[bataille_chapitre_06.py](/downloads/bataille-navale/bataille_chapitre_06.py)** — also download the earlier chapters if you want to compare how the project grows.

## Amazon

<a href="https://www.amazon.com/s?k=python+projects+games+book&tag=roboteducatif-20" class="btn btn-action" rel="nofollow sponsored noopener" target="_blank">Check today's price on Amazon</a>
