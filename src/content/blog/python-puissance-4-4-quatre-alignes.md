---
title: "Puissance 4 Python (4/6) : détecter 4 jetons alignés"
headline: "Puissance 4 en Python — victoire horizontale, verticale, diagonales"
description: "Apprendre Python facilement avec la logique de victoire : compte_direction, test depuis le dernier coup. Exemple python complet avec script téléchargeable."
pubDate: 2026-03-29
updatedDate: 2026-04-18
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Puissance 4
seriesOrder: 4
tags: ["Python", "Programmation", "Projet", "débutant", "jeu"]
relatedLinks:
  - title: "Sommaire — Puissance 4"
    href: "/programmation/puissance-4/"
  - title: "Partie 3 — alternance"
    href: "/python-puissance-4-3-coup-alternance/"
  - title: "Partie 5 — match nul"
    href: "/python-puissance-4-5-match-nul/"
categories:
  - "Python"
  - "Programmation"
  - "Puissance 4"
  - "Projet"
faqSchema:
  - question: "Comment détecter quatre pions alignés dans un Puissance 4 Python ?"
    answer: "Après chaque coup, partir de la case jouée et compter les pions consécutifs du même joueur dans deux directions opposées pour l’horizontal, la verticale et les deux diagonales ; si au moins quatre au total sur un axe, victoire."
  - question: "Pourquoi compter depuis le dernier coup seulement ?"
    answer: "Un nouveau alignement ne peut passer que par la case où le joueur vient de jouer ; cela évite de rescanner toute la grille à chaque tour."
  - question: "Quelles erreurs éviter dans compte_direction ?"
    answer: "Ne pas dépasser les indices 0 à 5 pour les lignes et 0 à 6 pour les colonnes ; utiliser des pas directionnels (+1,+1), (+1,-1), etc., avec une boucle bornée."
---
Tu passes du « jeu qui tourne » au **premier vrai verdict** : un joueur peut **gagner**. On teste les **quatre directions** (horizontal, vertical, deux diagonales) à partir de la **dernière case jouée** : on compte les pions consécutifs du même joueur dans chaque sens sur un axe — moment clé pour **créer un jeu en python débutant** qui ressemble au vrai Puissance 4.

Pour approfondir les structures utilisées partout dans ce projet, une recherche sur les [structures de données en Python](https://www.amazon.fr/s?k=structures+de+donn%C3%A9es+python&tag=manuso06-21) peut accompagner la série.

![Console Python](../../assets/programmation/python-terminal.svg)

## 1. Compter dans une direction

### Script complet à l’issue de cette partie

Reprends le chapitre 3 **sans** la fonction `demo_partie_rapide`, et ajoute `ligne_du_dernier_pion` + `compte_direction` :

```python
def ligne_du_dernier_pion(grille, col):
    for ligne in range(LIGNES - 1, -1, -1):
        if grille[ligne][col] != VIDE:
            return ligne
    return -1


def compte_direction(grille, ligne, col, joueur, dl, dc):
    n = 0
    l, c = ligne, col
    while 0 <= l < LIGNES and 0 <= c < COLONNES and grille[l][c] == joueur:
        n += 1
        l += dl
        c += dc
    return n
```

## 2. Victoire sur les quatre axes

Pour chaque paire `(dl, dc)` et `(-dl, -dc)`, la longueur de la ligne est `total = a + b - 1` (le pion central compté deux fois).

### Script complet à l’issue de cette partie

Ajoute :

```python
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
```

## 3. Script complet du chapitre

Inclut un **test automatique** (4 `X` horizontaux) puis une **partie** qui s’arrête dès qu’un joueur gagne.

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Puissance 4 — Chapitre 4/6 : detection de 4 alignes + partie interactive avec victoire.
Lancer : python puissance4_chapitre_04.py
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


def test_auto_horizontal():
    g = nouvelle_grille()
    for c in range(4):
        assert jouer_colonne(g, c, J1)
    ligne = ligne_du_dernier_pion(g, 3)
    assert victoire(g, ligne, 3, J1)
    print("Test auto : 4 X en ligne horizontale — OK")


def partie_avec_victoire():
    grille = nouvelle_grille()
    joueur = J1
    while True:
        afficher_grille(grille)
        print(f"Joueur {sym(joueur)}")
        col = demander_colonne()
        if not jouer_colonne(grille, col, joueur):
            print("Colonne pleine.")
            continue
        ligne = ligne_du_dernier_pion(grille, col)
        if victoire(grille, ligne, col, joueur):
            afficher_grille(grille)
            print(f"Joueur {sym(joueur)} a gagne !")
            break
        joueur = J2 if joueur == J1 else J1


if __name__ == "__main__":
    test_auto_horizontal()
    print("\nPartie a deux (Ctrl+C pour arreter) :\n")
    partie_avec_victoire()
```

## Résultat attendu

Une partie s’**arrête dès quatre alignés** : message de victoire, grille finale affichée. Les tests automatiques valident au moins un cas horizontal ; tu peux compléter vertical et diagonales en exercice. Prochaine étape : [match nul et fin de partie propre](/python-puissance-4-5-match-nul/).

## Exercices

1. Écris `test_auto_vertical()` : empile 4 `O` dans une même colonne.
2. Vérifie une **diagonale** avec un petit script qui pose les pions manuellement.
3. Que se passe-t-il si `ligne_du_dernier_pion` retourne `-1` ?

## Télécharger ce chapitre

**[puissance4_chapitre_04.py](/downloads/puissance4/puissance4_chapitre_04.py)**

## Suite

**Étape suivante :** [match nul, messages et fin de partie](/python-puissance-4-5-match-nul/).  
**Sommaire :** [Puissance 4 — page pilier](/programmation/puissance-4/).

## Matériel recommandé (partenaire Amazon)

- [Structures de données Python](https://www.amazon.fr/s?k=structures+de+donn%C3%A9es+python&tag=manuso06-21)
- [Algorithmique débutant](https://www.amazon.fr/s?k=algorithmique+python+d%C3%A9butant&tag=manuso06-21)
