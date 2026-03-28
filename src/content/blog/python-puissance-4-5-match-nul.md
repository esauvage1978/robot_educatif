---
title: "Puissance 4 en Python (5/6) — match nul et messages"
description: "Console, grille_pleine apres chaque coup ; partie complete deux humains ; .py telechargeable."
pubDate: 2026-03-29
updatedDate: 2026-03-28
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Puissance 4
seriesOrder: 5
tags: ["Python", "Programmation", "Projet"]
relatedLinks:
  - title: "Partie 4 — quatre alignés"
    href: "/python-puissance-4-4-quatre-alignes/"
  - title: "Partie 6 — jeu complet"
    href: "/python-puissance-4-6-jeu-complet/"
categories:
  - "Python"
  - "Programmation"
  - "Puissance 4"
  - "Projet"
---
Après chaque coup réussi : d’abord **`victoire`**, sinon **`grille_pleine`** → **match nul** (42 coups maximum sans 4 alignés). L’ordre est important : on teste la victoire **avant** de changer de joueur.

![Console Python](../../assets/programmation/python-terminal.svg)

## 1. Grille pleine

```python
def grille_pleine(grille):
    return all(grille[0][c] != VIDE for c in range(COLONNES))
```

## 2. Messages et ordre des tests

- Si `victoire(...)` : affiche la grille puis `Joueur X` ou `O` a gagné, puis `return`.
- Sinon si `grille_pleine(grille)` : match nul.
- Sinon seulement alors : `joueur = J2 if joueur == J1 else J1`.

### Script complet à l’issue de cette partie

Intègre ces règles dans une fonction `partie_deux_humains()` comme dans le fichier ci-dessous.

## 3. Script complet du chapitre

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Puissance 4 — Chapitre 5/6 : match nul si grille pleine, messages clairs.
Lancer : python puissance4_chapitre_05.py
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


def ligne_du_dernier_pion(grille, col):
    for ligne in range(LIGNES - 1, -1, -1):
        if grille[ligne][col] != VIDE:
            return ligne
    return -1


def grille_pleine(grille):
    return all(grille[0][c] != VIDE for c in range(COLONNES))


def compte_direction(grille, ligne, col, joueur, dl, dc):
    n = 0
    l, c = ligne, col
    while 0 <= l < LIGNES and 0 <= c < COLONNES and grille[l][c] == joueur:
        n += 1
        l += dl
        c += dc
    return n


def victoire(grille, ligne, col, joueur):
    for dl, dc in [(0, 1), (1, 0), (1, 1), (1, -1)]:
        total = (
            compte_direction(grille, ligne, col, joueur, dl, dc)
            + compte_direction(grille, ligne, col, joueur, -dl, -dc)
            - 1
        )
        if total >= 4:
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


def partie_deux_humains():
    grille = nouvelle_grille()
    joueur = J1
    while True:
        afficher_grille(grille)
        print(f"Joueur {sym(joueur)} — a toi.")
        col = demander_colonne()
        if not jouer_colonne(grille, col, joueur):
            print("Colonne pleine — choisis une autre colonne.")
            continue
        ligne = ligne_du_dernier_pion(grille, col)
        if victoire(grille, ligne, col, joueur):
            afficher_grille(grille)
            print(f"Bravo : le joueur {sym(joueur)} a aligne 4 !")
            return
        if grille_pleine(grille):
            afficher_grille(grille)
            print("Match nul : grille pleine, personne n'a 4 alignes.")
            return
        joueur = J2 if joueur == J1 else J1


if __name__ == "__main__":
    partie_deux_humains()
```

## Exercices

1. Compte les coups joués et affiche-les en fin de partie.
2. Ajoute `effacer_ecran()` avec `os.system("cls")` / `clear` entre les tours (deux humains sur la même machine).
3. Propose **rejouer** après une partie (`input("Encore ? o/n")`).

## Télécharger ce chapitre

**[puissance4_chapitre_05.py](/downloads/puissance4/puissance4_chapitre_05.py)**

## Suite

[Partie 6 — Jeu complet et IA aléatoire](/python-puissance-4-6-jeu-complet/).

## Amazon (partenaire)

- [Python programmation structurée](https://www.amazon.fr/s?k=python+programmation+structur%C3%A9e&tag=manuso06-21)
