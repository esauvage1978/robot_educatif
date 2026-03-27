#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Bataille navale — Chapitre 2/6 : affichage et parser A1–J10.
Lancer : python bataille_chapitre_02.py
"""

TAILLE = 10
VIDE = "."
RADAR_INCONNU = "?"


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


def case_vers_texte(ligne, colonne):
    return f"{lettre_ligne(ligne)}{colonne + 1}"


def main():
    afficher_grille_lettres(nouvelle_grille_radar(), "Radar (tout inconnu)")
    afficher_grille_lettres(nouvelle_grille_defense(), "Defense (eau)")
    while True:
        txt = input("\nCase (ex. D5), vide pour quitter : ").strip()
        if not txt:
            break
        try:
            li, co = parser_case(txt)
            print("Indices internes : ligne", li, "colonne", co, "=>", case_vers_texte(li, co))
        except ValueError as e:
            print("Erreur :", e)


if __name__ == "__main__":
    main()
