---
layout: ../../layouts/EnPost.astro
title: "Python Battleship (5/6): sunk and win"
description: "Detect a sunk ship and a win in Python Battleship: walk the fleet, compare the hit cells, and end the game when every ship on that side is sunk."
updated: "3 November 2026"
faqSchema:
  - question: "What is the difference between a hit and a sunk ship?"
    answer: "A hit means one cell of the ship is X. Sunk means every cell of that ship is X."
  - question: "Who wins when tous_coules is true?"
    answer: "The opponent who fired. Your fleet is entirely destroyed."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/programmation/bataille-navale/">Battleship series</a> · Part 5/6 — sunk and win</nav>

> **Direct answer** — After a **hit** ([part 4](/en/python-battleship-4-shots/)), test whether **every** cell of the ship is marked `X` on the **defense** grid (`navire_coule`). If **every** ship in the fleet is sunk, the defender has lost (`tous_coules`).

After a **hit**, you need to know whether the ship is **sunk** (every one of its cells is `X` on the defense grid) and whether the **whole fleet** is destroyed.

![Grid with a sunk ship and a victory message](/images/illustrations/python-bataille-navale-5-coule-et-victoire.webp)

<p class="image-credit">Credit: site illustration — a sunk ship on an ocean grid</p>

## 1. A fleet is a list of ships

Each ship is a **list of coordinates** `(ligne, col)` recorded at [placement](/en/python-battleship-3-placing-ships/).

```python
TOUCHE = "X"

def navire_coule(grille_defense, coords_navire):
    for ligne, col in coords_navire:
        if grille_defense[ligne][col] != TOUCHE:
            return False
    return True
```

Right after a shot that hits, call `navire_coule` **only** for the ship that **contains** that square (see §2).

## 2. Find which ship was hit

```python
def navire_contenant(flotte, ligne, col):
    for navire in flotte:
        if (ligne, col) in navire:
            return navire
    return None
```

If the result is `None`, you either have a logic error or a coordinate that is not on a ship. That should not happen if the shot landed on `#`, or on an `X` that is already consistent.

## 3. The message after the shot

```python
def resultat_tir_complet(grille_defense, flotte, ligne, col):
    # assumes the square has just been marked TOUCHE
    nav = navire_contenant(flotte, ligne, col)
    if nav is None:
        return "touche"  # or an error
    if navire_coule(grille_defense, nav):
        return "coule"
    return "touche"
```

Said out loud: “hit,” and then, if it applies, “sunk.”

## 4. Is the game over?

Count the sunk ships, or check that **every** ship is sunk:

```python
def tous_coules(grille_defense, flotte):
    for navire in flotte:
        if not navire_coule(grille_defense, navire):
            return False
    return True
```

As soon as `tous_coules` is true for **your** fleet, the **opponent** has won.

## 5. An optional optimization

To avoid walking the whole fleet on every shot, you can keep a **hit-cell counter** per ship (a dictionary `id_navire -> hits`). For 5 small ships, a direct walk is more than enough.

## Exercises

1. By hand, build a fleet of **one** 2-cell destroyer on a 5×5 grid. Simulate two shots on that same ship and check `navire_coule` after the second shot.
2. Add a third shot on **another** cell of the same ship (if it was placed badly) to test how robust your code is.
3. Write `nombre_navires_coules(grille, flotte)`, which returns an integer from 0 to 5.

## Next

[Part 6 — Assemble the game loop (2 players or an AI)](/en/python-battleship-6-complete-game/) · [Battleship hub](/programmation/bataille-navale/) · [Python track](/programmation/python/)

## FAQ

- **What is the difference between a hit and a sunk ship?** A **hit** means one cell of the ship is `X`. **Sunk** means every cell of that ship is `X`.
- **Do I have to walk the whole fleet on every shot?** For 5 small ships, yes. It stays readable. Later, a counter per ship is enough.
- **Who wins when `tous_coules` is true?** The **opponent** who fired. Your fleet is entirely destroyed.

## Full script for this chapter

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Battleship — Chapter 5/6: a sunk ship and the whole fleet.
Run: python bataille_chapitre_05.py
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


def demo_coule():
    random.seed(42)
    g = nouvelle_grille_defense()
    flotte = placement_aleatoire(g)
    r = nouvelle_grille_radar()
    for _ in range(80):
        if tous_coules(g, flotte):
            print("The whole fleet is sunk.")
            break
        li = random.randrange(TAILLE)
        co = random.randrange(TAILLE)
        if r[li][co] != RADAR_INCONNU:
            continue
        code = executer_tir(g, r, li, co)
        msg = message_apres_tir(g, flotte, li, co, code)
        if code == "touche":
            print(lettre_ligne(li) + str(co + 1), "->", msg)
        if msg == "coule":
            print(">>> A ship is sunk!")
    afficher_grille_lettres(r, "Radar at the end of the demo")


def main():
    demo_coule()


if __name__ == "__main__":
    main()
```

## Download this chapter

**[bataille_chapitre_05.py](/downloads/bataille-navale/bataille_chapitre_05.py)**

## Going further (no robot hardware)

- [if/else conditions in Python](/en/python-conditions-if-else/)
- [Lists and for loops](/en/python-loops-for-while/)
- [Programming hub](/programmation/)
- [Programmable Python robots](/robot-programmable-python/) (a buying guide, outside this console series)

<p class="affiliate-footer">Partner links (series sidebar): <a href="https://www.amazon.com/dp/B0919F9CKS?tag=roboteducatif-20" rel="nofollow sponsored noopener" target="_blank">Check today's price on Amazon</a> (mBot2) · <a href="https://www.amazon.com/dp/B0CK2FCG1K?tag=roboteducatif-20" rel="nofollow sponsored noopener" target="_blank">Check today's price on Amazon</a> (Raspberry Pi 5) · <a href="https://www.amazon.com/dp/B0BBZY9L59?tag=roboteducatif-20" rel="nofollow sponsored noopener" target="_blank">Check today's price on Amazon</a> (CyberPi)</p>
