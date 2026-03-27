---
title: "Bataille navale en Python (5/6) — coulé et victoire"
description: "Parcourir la flotte pour savoir si un navire est entièrement touché ; tester si tous les navires sont coulés."
pubDate: 2026-03-29
updatedDate: 2026-03-28
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Bataille navale
seriesOrder: 5
tags: ["Python", "Programmation", "Projet"]
relatedLinks:
  - title: "Partie 4 — tirs"
    href: "/python-bataille-navale-4-tirs-et-marques/"
  - title: "Partie 6 — jeu complet"
    href: "/python-bataille-navale-6-jeu-complet/"
---

Après un tir **touché** ([partie 4](/python-bataille-navale-4-tirs-et-marques/)), il faut savoir si le navire est **coulé** (toutes ses cases sont `X` sur la grille défense) et si la **flotte entière** est détruite.

![Console Python](../../assets/programmation/python-terminal.svg)

## 1. Une flotte = liste de navires

Chaque navire est une **liste de coordonnées** `(ligne, col)` enregistrée au [placement](/python-bataille-navale-3-placement-bateaux/).

```python
TOUCHE = "X"

def navire_coule(grille_defense, coords_navire):
    for ligne, col in coords_navire:
        if grille_defense[ligne][col] != TOUCHE:
            return False
    return True
```

Juste après un tir qui touche, appelle `navire_coule` **uniquement** pour le navire qui **contient** cette case (voir §2).

## 2. Trouver quel navire a été touché

```python
def navire_contenant(flotte, ligne, col):
    for navire in flotte:
        if (ligne, col) in navire:
            return navire
    return None
```

Si `None`, soit erreur de logique, soit coordonnée hors navires (ne devrait pas arriver si le tir était sur `#` ou déjà `X` cohérent).

## 3. Message après le tir

```python
def resultat_tir_complet(grille_defense, flotte, ligne, col):
    # suppose : la case vient d'être marquée TOUCHE
    nav = navire_contenant(flotte, ligne, col)
    if nav is None:
        return "touche"  # ou erreur
    if navire_coule(grille_defense, nav):
        return "coule"
    return "touche"
```

En français oral : « touché » puis éventuellement « coulé ».

## 4. Partie terminée ?

Compte le nombre de navires coulés, ou vérifie que **chaque** navire est coulé :

```python
def tous_coules(grille_defense, flotte):
    for navire in flotte:
        if not navire_coule(grille_defense, navire):
            return False
    return True
```

Dès que `tous_coules` est vrai pour **ta** flotte, l’**adversaire** a gagné.

## 5. Optimisation (optionnelle)

Pour éviter de parcourir toute la flotte à chaque tir, tu peux maintenir un **compteur de cases touchées** par navire (dictionnaire `id_navire -> touches`). Pour 5 petits navires, le parcours direct suffit largement.

## Exercices

1. Construis à la main une flotte d’**un** torpilleur de 2 cases sur une grille 5×5 ; simule deux tirs sur la même navire et vérifie `navire_coule` après le second.
2. Ajoute un troisième tir sur une **autre** case du même navire (si mal placé) pour tester ta robustesse.
3. Écris `nombre_navires_coules(grille, flotte)` qui retourne un entier entre 0 et 5.

## Suite

[Partie 6 — Assembler la boucle de jeu (2 joueurs ou IA)](/python-bataille-navale-6-jeu-complet/).

## Script complet du chapitre

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Bataille navale — Chapitre 5/6 : coule et flotte entiere.
Lancer : python bataille_chapitre_05.py
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
            print("Toute la flotte est coulee.")
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
            print(">>> Un navire est coule !")
    afficher_grille_lettres(r, "Radar fin de demo")


def main():
    demo_coule()


if __name__ == "__main__":
    main()
```

## Télécharger ce chapitre

**[bataille_chapitre_05.py](/downloads/bataille-navale/bataille_chapitre_05.py)**

## Amazon (partenaire)

- [Structures de données Python](https://www.amazon.fr/s?k=structures+de+donn%C3%A9es+python&tag=manuso06-21)
