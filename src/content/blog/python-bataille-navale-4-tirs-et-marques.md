---
title: "Bataille navale en Python (4/6) — tirs et marques sur les grilles"
description: "Appliquer un tir sur la grille défense adverse, mettre à jour radar et défense ; interdire de rejouer la même case."
pubDate: 2026-03-29
updatedDate: 2026-03-28
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Bataille navale
seriesOrder: 4
tags: ["Python", "Programmation", "Projet"]
relatedLinks:
  - title: "Partie 3 — placement"
    href: "/python-bataille-navale-3-placement-bateaux/"
  - title: "Partie 5 — coulé et victoire"
    href: "/python-bataille-navale-5-coule-et-victoire/"
categories:
  - "Python"
  - "Programmation"
  - "Bataille navale"
  - "Projet"
---
Tu as une **flotte** posée sur une grille défense ([partie 3](/python-bataille-navale-3-placement-bateaux/)). Cet article décrit ce qui se passe quand un joueur **tire** sur une case `(ligne, colonne)`.

![Console Python](../../assets/programmation/python-terminal.svg)

## 1. Côté défenseur : mettre à jour *ma* grille

Rappel des symboles ([partie 1](/python-bataille-navale-1-cahier-des-charges/)) :

- `#` → `X` si un navire est touché à cette case.
- `.` → `o` si l’adversaire tire dans l’eau (sur *ta* grille on note le manqué).

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
    # déjà joué (# impossible si bien géré, X ou o = re-tir)
    return "deja"
```

En **jeu sérieux**, tu refuses un tir sur une case déjà `X` ou `o` : retourne `"deja"` **avant** de modifier, ou teste le radar du tireur.

## 2. Côté attaquant : mettre à jour le radar

Le radar ne connaît pas les `#` cachés : seulement `?`, `O`, `X`.

```python
RADAR_INCONNU = "?"
RADAR_MANQUE = "O"
RADAR_TOUCHE = "X"

def appliquer_tir_radar(grille_radar, ligne, col, resultat):
    if grille_radar[ligne][col] != RADAR_INCONNU:
        return False  # case déjà jouée côté attaquant
    if resultat == "touche":
        grille_radar[ligne][col] = RADAR_TOUCHE
    elif resultat == "manque":
        grille_radar[ligne][col] = RADAR_MANQUE
    else:
        return False
    return True
```

Le **défenseur** annonce `touche` / `manque` (et bientôt `coule` — [partie 5](/python-bataille-navale-5-coule-et-victoire/)) ; le **tireur** met à jour **son** radar en conséquence.

## 3. Enchaînement minimal dans une fonction `tour`

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

Adapte si tu préfères **ne pas** exposer l’état interne du défenseur au tireur (en vrai jeu papier, le défenseur répond sans montrer sa grille).

## 4. Règle « même joueur rejoue après touché » (option)

Version classique : après un **touché**, le même joueur **rejoue** jusqu’à un manqué. C’est une simple condition dans ta boucle de partie ([partie 6](/python-bataille-navale-6-jeu-complet/)) : si `executer_tir` retourne `touche`, ne pas changer de joueur.

## Exercices

1. Crée deux grilles mini **3×3** à la main, simule trois tirs et affiche défense + radar après chaque coup.
2. Écris une fonction `tir_valide(radar, ligne, col)` qui vaut `True` seulement si la case est encore `?`.
3. Provoque un tir **deux fois** sur la même case : ton programme doit refuser ou afficher un message clair.

## Suite

[Partie 5 — Détecter « coulé » et la fin de partie](/python-bataille-navale-5-coule-et-victoire/).

## Script complet du chapitre

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Bataille navale — Chapitre 4/6 : tirs sur defense + radar.
Lancer : python bataille_chapitre_04.py
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


def afficher_grille_lettres(grille, titre="Grille"):
    print(titre)
    print("    " + " ".join(str(c + 1) for c in range(TAILLE)))
    for i, ligne in enumerate(grille):
        print(f"{lettre_ligne(i):2}  " + "  ".join(cell for cell in ligne))


def parser_case(texte):
    texte = texte.strip().upper().replace(" ", "")
    if len(texte) < 2:
        raise ValueError("Trop court (ex. B7)")
    lettre = texte[0]
    chiffres = texte[1:]
    derniere = chr(ord("A") + TAILLE - 1)
    if not ("A" <= lettre <= derniere):
        raise ValueError(f"Ligne A–{derniere}")
    ligne = ord(lettre) - ord("A")
    colonne = int(chiffres) - 1
    if not (0 <= colonne < TAILLE):
        raise ValueError(f"Colonne 1–{TAILLE}")
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
            raise RuntimeError("Placement aleatoire impossible.")
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
    afficher_grille_lettres(defense, "(DEBUG) Grille adverse — en vrai tu ne la vois pas")
    for case in ["A1", "E5", "J10"]:
        li, co = parser_case(case)
        res = executer_tir(defense, radar, li, co)
        print(case, "->", res)
    afficher_grille_lettres(radar, "Ton radar apres 3 tirs")


def main():
    demo_tirs()


if __name__ == "__main__":
    main()
```

## Télécharger ce chapitre

**[bataille_chapitre_04.py](/downloads/bataille-navale/bataille_chapitre_04.py)**

## Amazon (partenaire)

- [Python — bonnes pratiques](https://www.amazon.fr/s?k=clean+code+python+livre&tag=manuso06-21)
