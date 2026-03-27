#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Pendu — Chapitre 1/6 : mot masque, une lettre, mise a jour (sans boucle infinie).
Lancer : python pendu_chapitre_01.py
"""

VIES_INIT = 7


def main():
    mot = "ROBOT"
    masque = ["_"] * len(mot)
    essayees = set()
    vies = VIES_INIT

    print("Mot :", " ".join(masque), "| Vies :", vies)
    c = input("Une lettre : ").strip().upper()
    if len(c) != 1 or not c.isalpha():
        print("Il faut une seule lettre A-Z.")
        return
    if c in essayees:
        print("Deja proposee.")
        return
    essayees.add(c)
    trouve = False
    for i, lettre in enumerate(mot):
        if lettre == c:
            masque[i] = c
            trouve = True
    if not trouve:
        vies -= 1
    print("Apres ce coup :", " ".join(masque), "| Vies :", vies)
    print("Essayees :", " ".join(sorted(essayees)))
    if "_" not in masque:
        print("Bravo, mot trouve !")
    elif vies <= 0:
        print("Perdu ! Le mot etait :", mot)


if __name__ == "__main__":
    main()
