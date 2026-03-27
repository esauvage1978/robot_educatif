#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Pendu — Chapitre 3/6 : affichage et pendu ASCII (7 etapes).
Lancer : python pendu_chapitre_03.py
"""

import random
from pathlib import Path

BASE = Path(__file__).resolve().parent
CHEMIN_MOTS = BASE / "mots_pendu.txt"

PENDU_ETAPES = [
    "",
    " O ",
    " O\n | ",
    " O\n/| ",
    " O\n/|\\\n",
    " O\n/|\\\n/",
    " O\n/|\\\n/ \\",
]

VIES_MAX = 7


def charger_mots(chemin):
    with open(chemin, "r", encoding="utf-8") as f:
        lignes = f.read().splitlines()
    mots = [L.strip().upper() for L in lignes if L.strip()]
    if not mots:
        raise ValueError("Aucun mot dans le fichier.")
    return mots


def afficher_etat(masque, vies, essayees):
    erreurs = VIES_MAX - vies
    etape = min(erreurs, len(PENDU_ETAPES) - 1)
    if PENDU_ETAPES[etape]:
        print(PENDU_ETAPES[etape])
    print("\n" + " ".join(masque))
    print(f"Vies : {vies}")
    print("Lettres essayees :", " ".join(sorted(essayees)))


def main():
    try:
        mots = charger_mots(CHEMIN_MOTS)
    except FileNotFoundError:
        print("Place mots_pendu.txt a cote du script.")
        return
    secret = random.choice(mots)
    masque = ["_"] * len(secret)
    essayees = set()
    vies = VIES_MAX
    afficher_etat(masque, vies, essayees)
    print("(Demo : un seul affichage — la boucle arrive au chapitre 4.)")


if __name__ == "__main__":
    main()
