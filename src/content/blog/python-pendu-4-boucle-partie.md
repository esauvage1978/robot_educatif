---
title: "Le pendu en Python (4/6) — boucle de partie et validation"
headline: "Le pendu en Python (4/6) — boucle de partie et validation"
description: "while True avec conditions de sortie ; redemander une lettre invalide ; rejouer une partie sans redémarrer le script."
pubDate: 2026-03-29
updatedDate: 2026-03-28
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Le pendu
seriesOrder: 4
tags: ["Python", "Programmation", "Projet"]
relatedLinks:
  - title: "Partie 3 — affichage"
    href: "/python-pendu-3-affichage-lettres/"
  - title: "Partie 5 — victoire et défaite"
    href: "/python-pendu-5-victoire-defaite/"
categories:
  - "Python"
  - "Programmation"
  - "Pendu"
  - "Projet"
---
Tu as les **briques** ([masque](/python-pendu-1-cahier-mot-masque/), [fichier](/python-pendu-2-mots-depuis-fichier/), [affichage](/python-pendu-3-affichage-lettres/)). Il faut une **boucle** propre qui enchaîne les tours jusqu’à victoire ou défaite, sans laisser le programme planter sur une saisie bancale.

![Console Python](../../assets/programmation/python-terminal.svg)

## 1. Structure `while True` avec `break`

```python
while True:
    afficher_etat(masque, vies, essayees)
    if "_" not in masque:
        print("Gagné !")
        break
    if vies <= 0:
        print("Perdu ! Le mot était :", secret)
        break

    lettre = demander_lettre_valide(essayees)
    # ... mettre à jour masque / vies / essayees
```

`demander_lettre_valide` boucle **internement** jusqu’à obtenir une **nouvelle** lettre unique.

## 2. Fonction `demander_lettre_valide`

```python
def demander_lettre_valide(essayees):
    while True:
        c = input("Lettre ? ").strip().upper()
        if len(c) != 1 or not c.isalpha():
            print("Une seule lettre A-Z.")
            continue
        if c in essayees:
            print("Déjà essayée.")
            continue
        return c
```

## 3. Rejouer

Après `break`, demande `Rejouer ? (o/n)` : si oui, recharge un nouveau mot, réinitialise masque / vies / `essayees`, et relance une **nouvelle** boucle (ou place toute la partie dans une fonction `jouer_une_partie()` appelée dans une boucle externe).

## Exercices

1. Compte le **nombre de coups** (lettres valides jouées) et affiche-le en fin de partie.
2. Limite la **longueur** du mot secret entre 4 et 8 lettres en filtrant la liste chargée.
3. Mode **difficile** : seulement **5** vies — paramètre `vies_initiales` passé à `jouer_une_partie`.

## Suite

[Partie 5 — Messages de fin, révélation du mot, pendu complet](/python-pendu-5-victoire-defaite/).

## Script complet du chapitre

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Pendu — Chapitre 4/6 : boucle complete + rejouer.
Lancer : python pendu_chapitre_04.py
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
    mots = [m for m in mots if len(m) >= 3]
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


def jouer_une_partie(secret):
    masque = ["_"] * len(secret)
    essayees = set()
    vies = VIES_MAX
    while True:
        afficher_etat(masque, vies, essayees)
        if "_" not in masque:
            print("Gagne !")
            return True
        if vies <= 0:
            print("Perdu ! Le mot etait :", secret)
            return False
        lettre = demander_lettre_valide(essayees)
        essayees.add(lettre)
        if lettre not in secret:
            vies -= 1
        else:
            for i, L in enumerate(secret):
                if L == lettre:
                    masque[i] = lettre


def main():
    try:
        mots = charger_mots(CHEMIN_MOTS)
    except FileNotFoundError:
        print("Place mots_pendu.txt a cote du script.")
        return
    while True:
        secret = random.choice(mots)
        jouer_une_partie(secret)
        if input("\nRejouer ? (o/n) ").strip().lower() not in ("o", "oui", "y", "yes"):
            break


if __name__ == "__main__":
    main()
```

## Télécharger ce chapitre

**[pendu_chapitre_04.py](/downloads/pendu/pendu_chapitre_04.py)** — avec **[mots_pendu.txt](/downloads/pendu/mots_pendu.txt)**.

## Amazon (partenaire)

- [Algorithmique Python](https://www.amazon.fr/s?k=algorithmique+python+d%C3%A9butant&tag=manuso06-21)
