---
title: "Puissance 4 Python (3/6) : coups valides et alternance des joueurs"
headline: "Puissance 4 en Python — input colonne, tours X et O"
description: "Projet python débutant : input 1–7, validation, alternance sans détection de victoire encore. Exemple python complet téléchargeable pour une partie courte au terminal."
pubDate: 2026-03-29
updatedDate: 2026-04-18
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Puissance 4
seriesOrder: 3
tags: ["Python", "Programmation", "Projet", "débutant", "jeu"]
relatedLinks:
  - title: "Sommaire — Puissance 4"
    href: "/programmation/puissance-4/"
  - title: "Partie 2 — affichage et gravité"
    href: "/python-puissance-4-2-affichage-gravite/"
  - title: "Partie 4 — quatre alignés"
    href: "/python-puissance-4-4-quatre-alignes/"
categories:
  - "Python"
  - "Programmation"
  - "Puissance 4"
  - "Projet"
faqSchema:
  - question: "Comment lire une colonne au clavier pour un Puissance 4 en Python ?"
    answer: "Utiliser input puis int avec gestion des erreurs : boucle tant que la valeur n’est pas entre 1 et 7 ou que la colonne est pleine. Convertir vers l’indice 0 à 6 avant d’appeler jouer_colonne."
  - question: "Pourquoi ce chapitre ne détecte pas encore la victoire ?"
    answer: "Pour isoler la mécanique des tours et la validation des coups ; la série dédie le chapitre 4 aux quatre directions et au test après chaque coup."
  - question: "Comment alterner deux joueurs en Python ?"
    answer: "Une variable joueur qui vaut une constante J1 ou J2 et une réaffectation à chaque coup réussi : joueur = J2 if joueur == J1 else J1."
---
Après [jouer_colonne](/python-puissance-4-2-affichage-gravite/), on lit une **colonne au clavier**, on valide, on joue, puis on **passe la main** à l’autre joueur. Ce chapitre ne détecte pas encore la victoire — [chapitre 4](/python-puissance-4-4-quatre-alignes/) s’en charge : tu construis une **boucle de jeu** lisible avant d’ajouter la logique « quatre alignés ».

Besoin de fiches ou d’exercices hors ligne ? Les [ouvrages Python avec exercices corrigés](https://www.amazon.fr/s?k=python+3+exercices+corrig%C3%A9s&tag=manuso06-21) complètent bien ce tutoriel gratuit.

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

## Résultat attendu

Tu joues plusieurs coups au terminal : la grille se met à jour, les joueurs **alternent**, les colonnes pleines sont refusées. Il manque encore l’arrêt sur victoire — c’est volontaire. Enchaîne avec la [détection des quatre alignés](/python-puissance-4-4-quatre-alignes/).

## Exercices

1. Permets de quitter avec `q` au lieu d’un nombre (`demander_colonne` retourne `None` et on arrête la boucle).
2. Affiche le **numéro du coup** à chaque tour.
3. Passe `max_coups` à `42` et observe une partie longue (sans victoire affichée).

## Télécharger ce chapitre

**[puissance4_chapitre_03.py](/downloads/puissance4/puissance4_chapitre_03.py)**

## Suite

**Étape suivante :** [détecter quatre jetons alignés](/python-puissance-4-4-quatre-alignes/).  
**Sommaire :** [Puissance 4 — page pilier](/programmation/puissance-4/).

## Matériel recommandé (partenaire Amazon)

- [Python 3 — exercices corrigés](https://www.amazon.fr/s?k=python+3+exercices+corrig%C3%A9s&tag=manuso06-21)
- [Projets et jeux Python](https://www.amazon.fr/s?k=python+projets+jeux+livre&tag=manuso06-21)
