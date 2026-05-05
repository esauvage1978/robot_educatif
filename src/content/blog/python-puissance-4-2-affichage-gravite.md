---
title: "Puissance 4 Python (2/6) : affichage console et gravité du jeton"
headline: "Puissance 4 en Python — afficher la grille et jouer une colonne"
description: "Python jeu console : symboles X/O, afficher_grille ASCII, jouer_colonne avec gravité. Projet python débutant avec script .py téléchargeable."
pubDate: 2026-03-29
updatedDate: 2026-04-18
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Puissance 4
seriesOrder: 2
tags: ["Python", "Programmation", "Projet", "débutant", "jeu"]
relatedLinks:
  - title: "Sommaire — Puissance 4"
    href: "/programmation/puissance-4/"
  - title: "Partie 1 — cahier des charges"
    href: "/python-puissance-4-1-cahier-grille/"
  - title: "Partie 3 — coup et alternance"
    href: "/python-puissance-4-3-coup-alternance/"
categories:
  - "Python"
  - "Programmation"
  - "Puissance 4"
  - "Projet"
faqSchema:
  - question: "Comment afficher une grille Puissance 4 en Python dans le terminal ?"
    answer: "Construire une chaîne ou imprimer ligne par ligne : indices colonnes 1 à 7 pour le joueur, conversion vers 0 à 6 en interne. Utiliser un dictionnaire SYM pour mapper vide, joueur 1 et joueur 2 vers des caractères lisibles."
  - question: "Comment simuler la gravité des jetons ?"
    answer: "Pour une colonne donnée, parcourir les lignes du bas vers le haut et placer le pion sur la première case vide rencontrée ; si aucune case libre, la colonne est pleine."
  - question: "Pourquoi séparer affichage et logique de la grille ?"
    answer: "Tu peux changer les symboles ou passer plus tard à une interface graphique sans réécrire les règles : la grille reste une liste de listes d’entiers."
---
Tu reprends la grille du [chapitre 1](/python-puissance-4-1-cahier-grille/). Ce chapitre ajoute l’**affichage** lisible dans le terminal et la fonction **`jouer_colonne`** : le pion tombe à la **plus basse** case libre de la colonne — le cœur du **python jeu console** avant les règles de victoire.

Pour aller plus loin hors série, une recherche sur l’**algorithmique en Python** peut appuyer tes révisions ([Amazon](https://www.amazon.fr/s?k=algorithmique+python+d%C3%A9butant&tag=manuso06-21)) ; ici on reste sur le code étape par étape.

![Console Python](../../assets/programmation/python-terminal.svg)

## 1. Affichage ASCII

Le joueur lit les colonnes **1 à 7** ; en interne on utilise les indices **0 à 6**. Le dictionnaire `SYM` associe chaque valeur à un caractère.

### Script complet à l’issue de cette partie

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

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
```

## 2. Gravité : jouer dans une colonne

On parcourt les lignes **de bas en haut** (`range(LIGNES - 1, -1, -1)`) et on place le jeton dans la première case encore `VIDE`. Si `grille[0][col]` est pleine, la colonne refuse tout nouveau pion.

### Script complet à l’issue de cette partie

Même fichier que ci-dessus, plus :

```python
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
```

## 3. Script complet du chapitre (démonstration)

Le bloc suivant est **identique** au fichier téléchargeable : trois coups dans la colonne 4 (indice 3), puis affichage.

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Puissance 4 — Chapitre 2/6 : affichage ASCII, gravite, jouer_colonne.
Lancer : python puissance4_chapitre_02.py
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


if __name__ == "__main__":
    g = nouvelle_grille()
    jouer_colonne(g, 3, J1)
    jouer_colonne(g, 3, J2)
    jouer_colonne(g, 3, J1)
    print("Exemple : trois pions dans la colonne 4 (indice 3)\n")
    afficher_grille(g)
```

## Résultat attendu

Tu lances le script : la **grille s’affiche** avec des symboles clairs, et **`jouer_colonne`** empile correctement les jetons en bas de colonne. Tu peux montrer ton travail à quelqu’un dans le terminal — étape suivante : [alterner deux joueurs](/python-puissance-4-3-coup-alternance/).

## Exercices

1. Ajoute un quatrième coup dans la même colonne et réaffiche la grille.
2. Écris `hauteur_colonne(grille, col)` : nombre de cases non vides dans cette colonne.
3. Que se passe-t-il si on appelle `jouer_colonne` **8 fois** dans la même colonne ?

## Télécharger ce chapitre

**[puissance4_chapitre_02.py](/downloads/puissance4/puissance4_chapitre_02.py)**

## Suite

**Étape suivante :** [alterner les joueurs et lire une colonne valide](/python-puissance-4-3-coup-alternance/).  
**Sommaire :** [Puissance 4 — page pilier](/programmation/puissance-4/).

## Matériel recommandé (partenaire Amazon)

- [Algorithmique et Python débutant](https://www.amazon.fr/s?k=algorithmique+python+d%C3%A9butant&tag=manuso06-21)
- [Livres projets / jeux Python](https://www.amazon.fr/s?k=python+projets+jeux+livre&tag=manuso06-21)
- [Kits Raspberry Pi](https://www.amazon.fr/s?k=raspberry+pi+kit&tag=manuso06-21)
