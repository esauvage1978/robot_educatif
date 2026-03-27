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
