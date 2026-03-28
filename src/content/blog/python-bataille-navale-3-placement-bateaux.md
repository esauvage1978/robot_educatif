---
title: "Bataille navale en Python (3/6) — placement des navires"
description: "Vérifier les limites, éviter le chevauchement, placer en horizontal ou vertical ; construire la liste des flottes."
pubDate: 2026-03-29
updatedDate: 2026-03-28
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Bataille navale
seriesOrder: 3
tags: ["Python", "Programmation", "Projet"]
relatedLinks:
  - title: "Partie 2 — grille et affichage"
    href: "/python-bataille-navale-2-grille-et-affichage/"
  - title: "Partie 4 — tirs et marques"
    href: "/python-bataille-navale-4-tirs-et-marques/"
categories:
  - "Python"
  - "Programmation"
  - "Bataille navale"
  - "Projet"
---
Tu sais [créer et afficher une grille](/python-bataille-navale-2-grille-et-affichage/). Il faut maintenant **poser les navires** sur la grille défense et mémoriser **quelles cases** appartiennent à quel bateau.

![Console Python](../../assets/programmation/python-terminal.svg)

## 1. Vérifier qu’une place est libre

Avant de poser un navire de longueur `L`, on teste chaque case future : elles doivent être dans la grille et être de l’**eau** `.`.

```python
VIDE = "."
NAVIRE = "#"
TAILLE = 10

def cases_libres(grille, cases):
    for ligne, col in cases:
        if not (0 <= ligne < TAILLE and 0 <= col < TAILLE):
            return False
        if grille[ligne][col] != VIDE:
            return False
    return True
```

## 2. Générer les cases selon l’orientation

- **Horizontal** : même `ligne`, colonnes `debut_col` à `debut_col + L - 1`.
- **Vertical** : même `colonne`, lignes `debut_ligne` à `debut_ligne + L - 1`.

```python
def cases_navire(debut_ligne, debut_col, longueur, horizontal):
    coords = []
    for k in range(longueur):
        if horizontal:
            coords.append((debut_ligne, debut_col + k))
        else:
            coords.append((debut_ligne + k, debut_col))
    return coords
```

## 3. Placer un navire sur la grille

```python
def placer_navire(grille, coords):
    for ligne, col in coords:
        grille[ligne][col] = NAVIRE
```

En pratique tu enchaînes : calcul des `coords` → si `cases_libres` → `placer_navire` et tu **retournes** aussi `coords` pour les stocker dans ta structure `flotte`.

```python
def essayer_placer(grille, debut_ligne, debut_col, longueur, horizontal):
    coords = cases_navire(debut_ligne, debut_col, longueur, horizontal)
    if not cases_libres(grille, coords):
        return None
    placer_navire(grille, coords)
    return coords
```

## 4. Placement manuel (deux joueurs au même clavier)

Pour un **premier prototype**, tu peux demander pour chaque navire : ligne, colonne, `H` ou `V`. Boucle **tant que** `essayer_placer` renvoie `None` (mauvaise position).

```python
LONGUEURS = [5, 4, 3, 3, 2]

def placement_joueur(grille):
    flotte = []
    for L in LONGUEURS:
        while True:
            # pseudo-code : input(), parser ligne/colonne/orientation
            # coords = essayer_placer(...)
            # if coords: flotte.append(coords); break
            pass
    return flotte
```

À toi de combiner avec `parser_case` pour le **point de départ** (ex. coin avant-bâbord du navire).

## 5. Placement aléatoire (pour une IA ou setup rapide)

Avec le module `random` : tirages de `debut_ligne`, `debut_col`, `horizontal` jusqu’à ce qu’un placement réussisse (attention : boucle infinie si la grille est trop pleine — avec 5 bateaux sur 10×10 ce n’est pas le cas).

```python
import random

def placement_aleatoire(grille):
    flotte = []
    for L in LONGUEURS:
        for _ in range(2000):  # sécurité anti-boucle infinie
            h = random.choice([True, False])
            i = random.randrange(TAILLE)
            j = random.randrange(TAILLE)
            coords = essayer_placer(grille, i, j, L, h)
            if coords:
                flotte.append(coords)
                break
    return flotte
```

## Exercices

1. Interdis le **chevauchement** : vérifie que ton `cases_libres` refuse deux navires sur la même case.
2. Interdis de **dépasser** : un navire de longueur 5 ne doit pas commencer en colonne `8` en horizontal.
3. Après placement aléatoire, **affiche** la grille et vérifie visuellement le bon nombre de `#` (somme des longueurs = 17).

## Suite

[Partie 4 — Enregistrer un tir et mettre à jour les grilles](/python-bataille-navale-4-tirs-et-marques/).

## Script complet du chapitre

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Bataille navale — Chapitre 3/6 : placement sans chevauchement (aleatoire demo).
Lancer : python bataille_chapitre_03.py
"""

import random

TAILLE = 10
VIDE = "."
NAVIRE = "#"
RADAR_INCONNU = "?"
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
            raise RuntimeError("Placement aleatoire impossible — reessaie.")
    return flotte


def main():
    random.seed()
    g = nouvelle_grille_defense()
    flotte = placement_aleatoire(g)
    afficher_grille_lettres(g, "Flotte placee au hasard")
    nb_navire = sum(len(n) for n in flotte)
    print("Nombre de cases # :", nb_navire, "(attendu : 17)")


if __name__ == "__main__":
    main()
```

## Télécharger ce chapitre

**[bataille_chapitre_03.py](/downloads/bataille-navale/bataille_chapitre_03.py)**

## Amazon (partenaire)

- [Python 3 — exercices corrigés](https://www.amazon.fr/s?k=python+3+exercices+corrig%C3%A9s&tag=manuso06-21)
