#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Pendu — Chapitre 6/6 : projet complet (menu, stats, chemins robustes).
Lancer : python pendu_chapitre_06.py
"""

import random
import sys
import time
from pathlib import Path

BASE = Path(__file__).resolve().parent
CHEMIN_MOTS_DEFAUT = BASE / "mots_pendu.txt"

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
    mots = [m for m in mots if 3 <= len(m) <= 12]
    if not mots:
        raise ValueError("Aucun mot valide dans le fichier.")
    return mots


def afficher_etat(masque, vies, essayees):
    erreurs = VIES_MAX - vies
    etape = min(erreurs, len(PENDU_ETAPES) - 1)
    print("=" * 40)
    if PENDU_ETAPES[etape]:
        print(PENDU_ETAPES[etape])
    print("\n" + " ".join(masque))
    print(f"Vies : {vies}")
    print("Lettres essayees :", " ".join(sorted(essayees)))


def demander_lettre_valide(essayees):
    while True:
        c = input("Lettre ? (q quitter la partie) ").strip().upper()
        if c == "Q":
            return None
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
    t0 = time.time()
    while True:
        afficher_etat(masque, vies, essayees)
        if "_" not in masque:
            d = time.time() - t0
            print("Bravo !")
            stats["gagnees"] += 1
            print(f"Coups : {coups} | Erreurs : {VIES_MAX - vies} | Duree : {d:.1f} s")
            return
        if vies <= 0:
            print(f"Perdu ! Le mot etait : {secret}")
            return
        lettre = demander_lettre_valide(essayees)
        if lettre is None:
            print("Partie abandonnee.")
            return
        essayees.add(lettre)
        coups += 1
        if lettre not in secret:
            vies -= 1
        else:
            for i, L in enumerate(secret):
                if L == lettre:
                    masque[i] = lettre


def main():
    chemin = CHEMIN_MOTS_DEFAUT
    if len(sys.argv) > 1:
        chemin = Path(sys.argv[1])
    try:
        mots = charger_mots(chemin)
    except FileNotFoundError:
        print("Fichier introuvable :", chemin)
        sys.exit(1)
    except ValueError as e:
        print(e)
        sys.exit(1)

    stats = {"parties": 0, "gagnees": 0}
    print("Pendu — mots depuis :", chemin)
    while True:
        print("\n1 Jouer   q Quitter")
        choix = input("Choix ? ").strip().lower()
        if choix in ("q", "quit"):
            break
        secret = random.choice(mots)
        jouer_une_partie(secret, stats)
    p, g = stats["parties"], stats["gagnees"]
    pct = (100 * g / p) if p else 0.0
    print(f"Session : {g} / {p} victoires ({pct:.0f}%).")


if __name__ == "__main__":
    main()
