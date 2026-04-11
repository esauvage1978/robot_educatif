---
title: "Puissance 4 en Python (1/6) — cahier des charges et grille"
headline: "Puissance 4 en Python (1/6) — cahier des charges et grille"
description: "Console, constantes 6×7, nouvelle_grille et grille_pleine ; script .py telechargeable identique au code du chapitre."
pubDate: 2026-03-29
updatedDate: 2026-03-28
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Puissance 4
seriesOrder: 1
tags: ["Python", "Programmation", "Projet"]
relatedLinks:
  - title: "Parcours Python"
    href: "/programmation/python/"
  - title: "Partie 2 — affichage et gravité"
    href: "/python-puissance-4-2-affichage-gravite/"
categories:
  - "Python"
  - "Programmation"
  - "Puissance 4"
  - "Projet"
---
Le **Puissance 4** se joue sur une grille **6 lignes × 7 colonnes** : les jetons tombent dans une colonne jusqu’à la case libre la plus basse. Le premier qui aligne **quatre** pions (horizontal, vertical, diagonal) gagne.

Tu travailles dans un **terminal** (PowerShell, invite de commandes, ou terminal intégré de VS Code / Thonny) : tu lances chaque script avec `python nom_du_fichier.py`.

![Console Python](../../assets/programmation/python-terminal.svg)

## 1. Dimensions et symboles internes

- Indices : `ligne` **0** en **haut**, **5** en bas ; `colonne` **0** à gauche, **6** à droite.
- On note **0** = case vide, **1** = joueur 1 (affiché `X` plus tard), **2** = joueur 2 (`O`).

### Script complet à l’issue de cette partie

```python
VIDE = 0
J1 = 1
J2 = 2
LIGNES = 6
COLONNES = 7
```

## 2. Créer une grille vide

Une **liste de listes** : chaque **ligne** est une liste de `COLONNES` cases.

### Script complet à l’issue de cette partie

```python
VIDE = 0
J1 = 1
J2 = 2
LIGNES = 6
COLONNES = 7


def nouvelle_grille():
    return [[VIDE for _ in range(COLONNES)] for _ in range(LIGNES)]
```

## 3. Grille pleine et démonstration

La partie s’arrête en **match nul** quand la **ligne du haut** n’a plus aucun `0` : aucune colonne n’accepte de nouveau jeton.

### Script complet du chapitre (identique au fichier `.py`)

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

## Exercices

1. Vérifie `len(grille) == 6` et `len(grille[0]) == 7` sur une grille neuve.
2. Remplis **à la main** une colonne avec trois `J1` comme dans le script et affiche `g[-1]`.
3. Que retourne `grille_pleine(nouvelle_grille())` ?

## Télécharger ce chapitre

**[puissance4_chapitre_01.py](/downloads/puissance4/puissance4_chapitre_01.py)** — enregistre le fichier, place-le dans un dossier et exécute : `python puissance4_chapitre_01.py`.

## Suite

[Partie 2 — Afficher la grille et faire tomber un jeton](/python-puissance-4-2-affichage-gravite/).

## Amazon (partenaire)

- [Python — projets et jeux](https://www.amazon.fr/s?k=python+projets+jeux+livre&tag=manuso06-21)
