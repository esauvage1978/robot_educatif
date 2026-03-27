#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Pendu — Chapitre 5/6 : stats de session et messages de fin.
Lancer : python pendu_chapitre_05.py
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
    filtres = [m for m in mots if 4 <= len(m) <= 8]
    if filtres:
        mots = filtres
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


def demander_lettre_valide(essayees):
    while True:
        c = input("Lettre ? ").strip().upper()
        if len(c) != 1 or not c.isalpha():
            print("Une seule lettre A-Z.")
            continue
        if c in essayees:
            print("Deja essayee.")
            continue
        return c


def jouer_une_partie(secret, stats):
    masque = ["_"] * len(secret)
    essayees = set()
    vies = VIES_MAX
    coups = 0
    stats["parties"] += 1
    while True:
        afficher_etat(masque, vies, essayees)
        if "_" not in masque:
            print("Bravo — mot trouve !")
            stats["gagnees"] += 1
            print(f"Coups joues : {coups} | Erreurs : {VIES_MAX - vies}")
            return
        if vies <= 0:
            print(f"Perdu ! Le mot etait : {secret}")
            print(f"Coups joues : {coups}")
            return
        lettre = demander_lettre_valide(essayees)
        essayees.add(lettre)
        coups += 1
        if lettre not in secret:
            vies -= 1
        else:
            for i, L in enumerate(secret):
                if L == lettre:
                    masque[i] = lettre


def main():
    stats = {"parties": 0, "gagnees": 0}
    try:
        mots = charger_mots(CHEMIN_MOTS)
    except FileNotFoundError:
        print("Place mots_pendu.txt a cote du script.")
        return
    while True:
        secret = random.choice(mots)
        jouer_une_partie(secret, stats)
        if input("\nRejouer ? (o/n) ").strip().lower() not in ("o", "oui", "y", "yes"):
            break
    p = stats["parties"]
    g = stats["gagnees"]
    pct = (100 * g / p) if p else 0.0
    print(f"\nSession : {g} victoire(s) sur {p} partie(s) ({pct:.0f}%).")


if __name__ == "__main__":
    main()
