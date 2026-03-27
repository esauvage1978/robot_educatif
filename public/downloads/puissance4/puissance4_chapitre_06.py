#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Puissance 4 — Chapitre 6/6 : menu, deux humains ou Humain (X) vs IA aleatoire (O).
Lancer : python puissance4_chapitre_06.py
"""

import random

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
        raw = input(f"Colonne (1-{COLONNES}) ou q pour quitter ? ").strip().lower()
        if raw == "q":
            return None
        try:
            c = int(raw)
        except ValueError:
            print("Entre un nombre entier.")
            continue
        if 1 <= c <= COLONNES:
            return c - 1
        print("Hors plage.")


def choix_ia(grille):
    jouables = [c for c in range(COLONNES) if colonne_jouable(grille, c)]
    return random.choice(jouables)


def sym(joueur):
    return "X" if joueur == J1 else "O"


def partie_deux_humains():
    grille = nouvelle_grille()
    joueur = J1
    while True:
        afficher_grille(grille)
        print(f"Joueur {sym(joueur)}")
        col = demander_colonne()
        if col is None:
            print("Partie abandonnee.")
            return
        if not jouer_colonne(grille, col, joueur):
            print("Colonne pleine.")
            continue
        ligne = ligne_du_dernier_pion(grille, col)
        if victoire(grille, ligne, col, joueur):
            afficher_grille(grille)
            print(f"Joueur {sym(joueur)} a gagne !")
            return
        if grille_pleine(grille):
            afficher_grille(grille)
            print("Match nul.")
            return
        joueur = J2 if joueur == J1 else J1


def partie_vs_ia():
    grille = nouvelle_grille()
    joueur = J1
    while True:
        afficher_grille(grille)
        if joueur == J1:
            print("Toi = X")
            col = demander_colonne()
            if col is None:
                print("Abandon.")
                return
        else:
            col = choix_ia(grille)
            print(f"IA (O) joue la colonne {col + 1}")
        if not jouer_colonne(grille, col, joueur):
            if joueur == J1:
                print("Colonne pleine.")
            continue
        ligne = ligne_du_dernier_pion(grille, col)
        if victoire(grille, ligne, col, joueur):
            afficher_grille(grille)
            if joueur == J1:
                print("Tu as gagne !")
            else:
                print("L'IA a gagne.")
            return
        if grille_pleine(grille):
            afficher_grille(grille)
            print("Match nul.")
            return
        joueur = J2 if joueur == J1 else J1


def main():
    print("1 = Deux humains   2 = Toi (X) contre IA (O)")
    choix = input("Ton choix ? ").strip()
    if choix == "2":
        partie_vs_ia()
    else:
        partie_deux_humains()


if __name__ == "__main__":
    main()
