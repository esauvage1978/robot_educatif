---
title: "Bataille navale en Python (3/6) — placement des navires"
description: "Placer les 5 navires sans chevauchement : cases_libres, orientation H/V, saisie clavier ou tirage aléatoire. Chapitre 3 du projet Python."
shareDescription: "Vérifier les limites, éviter le chevauchement, placer en horizontal ou vertical ; construire la liste des flottes."
pubDate: 2026-03-29
updatedDate: 2026-11-04
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
**Réponse directe** — Chaque navire occupe des cases contiguës **horizontalement** ou **verticalement**. Avant d’écrire `#` sur la grille, testez toutes les cases avec `cases_libres`. Mémorisez les coordonnées dans une liste `flotte` pour la partie 4 (tirs).

Ce chapitre fait partie du [projet Bataille navale en Python](/programmation/bataille-navale/) (série 6 parties). Vous savez déjà [créer et afficher une grille](/python-bataille-navale-2-grille-et-affichage/). Il reste à **poser les navires** sur la grille défense.

![Exemple de grille 10×10 avec navires placés au hasard](/images/blog/lot15/pendu-console-exemple.png)

<p><em>Exemple de rendu console — les `#` représentent les cases occupées (17 au total).</em></p>

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

def lire_orientation(texte):
    t = texte.strip().upper()
    if t in ("H", "HORIZONTAL", "O"):
        return True
    if t in ("V", "VERTICAL", "N"):
        return False
    raise ValueError("Orientation H ou V attendue")


def placement_joueur(grille):
    """Demande au joueur la case de départ (ex. B3) et H/V pour chaque navire."""
    flotte = []
    for L in LONGUEURS:
        while True:
            print(f"Navire longueur {L} — case départ (ex. C4) puis H ou V :")
            case_txt = input("Case : ")
            orient_txt = input("H/V : ")
            try:
                ligne, col = parser_case(case_txt)
                horizontal = lire_orientation(orient_txt)
            except ValueError as err:
                print("Erreur :", err)
                continue
            coords = essayer_placer(grille, ligne, col, L, horizontal)
            if coords is None:
                print("Impossible ici (hors grille, chevauchement ou dépassement).")
                continue
            flotte.append(coords)
            afficher_grille_lettres(grille, f"Après placement du navire de {L}")
            break
    return flotte
```

Le **coin avant-bâbord** du navire est la case que vous saisissez ; les autres cases se calculent avec `cases_navire`. Le script téléchargeable ci-dessous inclut `placement_aleatoire` ; remplacez l’appel dans `main()` par `placement_joueur(g)` pour tester la saisie clavier.

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

## Suite

[Partie 4 — Enregistrer un tir et mettre à jour les grilles](/python-bataille-navale-4-tirs-et-marques/) · [Parcours Python robot](/robot-programmable-python/) · [Hub Bataille navale](/programmation/bataille-navale/)

## Exercices

1. Interdis le **chevauchement** : vérifie que ton `cases_libres` refuse deux navires sur la même case.
2. Interdis de **dépasser** : un navire de longueur 5 ne doit pas commencer en colonne `8` en horizontal.
3. Après placement aléatoire, **affiche** la grille et vérifie visuellement le bon nombre de `#` (somme des longueurs = 17).

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

- [Python 3 — exercices corrigés](/go/az-fr-10aa727b99/)
- [Livres programmation Python enfant](/go/az-fr-7dc730fd5d/)
- [Python 3 — exercices corrigés (recherche Amazon)](/go/az-fr-373b67c1cf/)
