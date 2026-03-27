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
