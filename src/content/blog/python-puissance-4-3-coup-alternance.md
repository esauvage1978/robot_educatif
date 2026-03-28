---
title: "Puissance 4 en Python (3/6) — coup valide et alternance"
description: "Console, input colonne 1-7, alternance X/O ; demo de plusieurs tours sans detection victoire ; .py telechargeable."
pubDate: 2026-03-29
updatedDate: 2026-03-28
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Puissance 4
seriesOrder: 3
tags: ["Python", "Programmation", "Projet"]
relatedLinks:
  - title: "Partie 2 — affichage et gravité"
    href: "/python-puissance-4-2-affichage-gravite/"
  - title: "Partie 4 — quatre alignés"
    href: "/python-puissance-4-4-quatre-alignes/"
categories:
  - "Python"
  - "Programmation"
  - "Puissance 4"
  - "Projet"
---
Après [jouer_colonne](/python-puissance-4-2-affichage-gravite/), on lit une **colonne au clavier**, on valide, on joue, puis on **passe la main** à l’autre joueur. Ce chapitre ne détecte pas encore la victoire (chapitre 4).

![Console Python](../../assets/programmation/python-terminal.svg)

## 1. Lire une colonne (1 à 7 pour l’humain)

Boucle `while True` avec `try` / `except ValueError` pour refuser les saisies non numériques.

### Script complet à l’issue de cette partie

Reprends **tout** le code du chapitre 2 (constantes, `nouvelle_grille`, `afficher_grille`, `colonne_jouable`, `jouer_colonne`) et ajoute :

```python
def demander_colonne():
    while True:
        raw = input(f"Colonne (1-{COLONNES}) ? ").strip()
        try:
            c = int(raw)
        except ValueError:
            print("Entre un nombre entier.")
            continue
        if 1 <= c <= COLONNES:
            return c - 1
        print("Hors plage.")
```

## 2. Alternance des joueurs

Après un coup **réussi**, `joueur = J2 if joueur == J1 else J1`. Si la colonne est pleine, **ne change pas** de joueur et redemande une colonne.

### Script complet à l’issue de cette partie

Ajoute une fonction `sym(joueur)` qui retourne `"X"` ou `"O"` pour les messages, puis la boucle de démo ci-dessous.

## 3. Script complet du chapitre

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Puissance 4 — Chapitre 3/6 : saisie colonne, alternance J1/J2 (sans detection victoire).
Lancer : python puissance4_chapitre_03.py
"""

VIDE = 0
J1 = 1
J2 = 2
LIGNES = 6
COLONNES = 7
SYM = {0: ".", 1: "X", 2: "O"}


def nouvelle_grille():
    return [[VIDE for _ in range(COLONNES)] for _ in range(LIGNES)]


def afficher_grille(grille):
    print("  " + " ".join(str(c + 1) for c in range(COLONNES)))
    for ligne in grille:
        print("  " + " ".join(SYM[cell] for cell in ligne))


def colonne_jouable(grille, col):
    return 0 <= col < COLONNES and grille[0][col] == VIDE


def jouer_colonne(grille, col, joueur):
    if not colonne_jouable(grille, col):
        return False
    for ligne in range(LIGNES - 1, -1, -1):
        if grille[ligne][col] == VIDE:
            grille[ligne][col] = joueur
            return True
    return False


def demander_colonne():
    while True:
        raw = input(f"Colonne (1-{COLONNES}) ? ").strip()
        try:
            c = int(raw)
        except ValueError:
            print("Entre un nombre entier.")
            continue
        if 1 <= c <= COLONNES:
            return c - 1
        print("Hors plage.")


def sym(joueur):
    return "X" if joueur == J1 else "O"


def demo_partie_rapide():
    """Quelques coups en alternance (pas encore de victoire detectee)."""
    grille = nouvelle_grille()
    joueur = J1
    nb_coups = 0
    max_coups = 8
    while nb_coups < max_coups:
        afficher_grille(grille)
        print(f"Tour du joueur {sym(joueur)}")
        col = demander_colonne()
        if not jouer_colonne(grille, col, joueur):
            print("Colonne pleine ou invalide — rejoue.")
            continue
        nb_coups += 1
        joueur = J2 if joueur == J1 else J1
    afficher_grille(grille)
    print("Demo terminee (chapitre 4 : detection des 4 alignes).")


if __name__ == "__main__":
    demo_partie_rapide()
```

## Exercices

1. Permets de quitter avec `q` au lieu d’un nombre (`demander_colonne` retourne `None` et on arrête la boucle).
2. Affiche le **numéro du coup** à chaque tour.
3. Passe `max_coups` à `42` et observe une partie longue (sans victoire affichée).

## Télécharger ce chapitre

**[puissance4_chapitre_03.py](/downloads/puissance4/puissance4_chapitre_03.py)**

## Suite

[Partie 4 — Détecter quatre jetons alignés](/python-puissance-4-4-quatre-alignes/).

## Amazon (partenaire)

- [Python 3 exercices](https://www.amazon.fr/s?k=python+3+exercices+corrig%C3%A9s&tag=manuso06-21)
