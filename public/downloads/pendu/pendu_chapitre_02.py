#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Pendu — Chapitre 2/6 : charger les mots depuis mots_pendu.txt (UTF-8).
Lancer : python pendu_chapitre_02.py depuis ce dossier, ou place mots_pendu.txt a cote du script.
"""

import random
from pathlib import Path

BASE = Path(__file__).resolve().parent
CHEMIN_MOTS = BASE / "mots_pendu.txt"


def charger_mots(chemin):
    with open(chemin, "r", encoding="utf-8") as f:
        lignes = f.read().splitlines()
    mots = [L.strip().upper() for L in lignes if L.strip()]
    if not mots:
        raise ValueError("Aucun mot dans le fichier.")
    return mots


def main():
    try:
        mots = charger_mots(CHEMIN_MOTS)
    except FileNotFoundError:
        print("Fichier introuvable :", CHEMIN_MOTS)
        print("Copie mots_pendu.txt dans le meme dossier que ce script.")
        return
    secret = random.choice(mots)
    print(len(mots), "mots charges. (Le secret ne s'affiche pas en vrai jeu.)")
    print("Longueur du mot tire :", len(secret))


if __name__ == "__main__":
    main()
