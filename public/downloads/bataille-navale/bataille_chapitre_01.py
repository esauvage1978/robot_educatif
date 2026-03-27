#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Bataille navale — Chapitre 1/6 : constantes et grilles vides (verification).
Lancer : python bataille_chapitre_01.py
"""

TAILLE = 10
LONGUEURS_NAVIRES = [5, 4, 3, 3, 2]

VIDE = "."
NAVIRE = "#"
TOUCHE = "X"
MANQUE_DEFENSE = "o"

RADAR_INCONNU = "?"
RADAR_MANQUE = "O"
RADAR_TOUCHE = "X"


def nouvelle_grille_defense():
    return [[VIDE for _ in range(TAILLE)] for _ in range(TAILLE)]


def nouvelle_grille_radar():
    return [[RADAR_INCONNU for _ in range(TAILLE)] for _ in range(TAILLE)]


def main():
    g = nouvelle_grille_defense()
    assert len(g) == TAILLE and len(g[0]) == TAILLE
    r = nouvelle_grille_radar()
    nb_inconnues = sum(row.count(RADAR_INCONNU) for row in r)
    assert nb_inconnues == TAILLE * TAILLE
    print("OK — grille defense", TAILLE, "x", TAILLE, "remplie de", repr(VIDE))
    print("OK — radar :", nb_inconnues, "cases", repr(RADAR_INCONNU))
    print("Navires a placer (longueurs) :", LONGUEURS_NAVIRES)


if __name__ == "__main__":
    main()
