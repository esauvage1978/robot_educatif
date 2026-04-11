---
title: "Le pendu en Python (3/6) — affichage, lettres et pendu ASCII"
headline: "Le pendu en Python (3/6) — affichage, lettres et pendu ASCII"
description: "Présenter clairement masque et vies ; tri des lettres essayées ; dessiner le pendu avec une liste de chaînes."
pubDate: 2026-03-29
updatedDate: 2026-03-28
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Le pendu
seriesOrder: 3
tags: ["Python", "Programmation", "Projet"]
relatedLinks:
  - title: "Partie 2 — fichier de mots"
    href: "/python-pendu-2-mots-depuis-fichier/"
  - title: "Partie 4 — boucle de partie"
    href: "/python-pendu-4-boucle-partie/"
categories:
  - "Python"
  - "Programmation"
  - "Pendu"
  - "Projet"
---
Une interface **terminal** lisible change tout : le joueur voit d’un coup d’œil le **mot masqué**, ses **vies** et les lettres **déjà jouées**. Ce court article ajoute aussi un **pendu ASCII** progressif (optionnel mais motivant).

![Console Python](../../assets/programmation/python-terminal.svg)

## 1. En-tête de tour

```python
def afficher_etat(masque, vies, essayees):
    print("\n" + " ".join(masque))
    print(f"Vies : {vies}")
    print("Lettres essayées :", " ".join(sorted(essayees)))
```

`sorted(essayees)` transforme l’ensemble en liste triée pour l’affichage.

## 2. Étapes du pendu (7 erreurs → 7 dessins)

Stocke **7** chaînes multilignes dans une liste `PENDU_ETAPES[0]` … `PENDU_ETAPES[6]` : à l’étape `k`, affiche `PENDU_ETAPES[k]` où `k = erreurs` (de 0 à 6). Tu peux commencer par un dessin minimal :

```python
PENDU_ETAPES = [
    "",
    " O ",
    " O\n | ",
    " O\n/| ",
    " O\n/|\\\n",
    # ... complète jusqu'à 6
]
```

Chaque chaîne peut utiliser des **sauts de ligne** `\n`. Teste avec `print(etape)`.

## 3. Cohérence erreurs / vies

Si tu pars de **7 vies** et qu’une erreur enlève 1 vie, le dessin à afficher peut être `PENDU_ETAPES[7 - vies]` (indices 0 à 6).

## Exercices

1. Dessine **à la main** sur papier les 7 étapes, puis transpose-les en chaînes.
2. Ajoute une **bordure** `===` autour de l’écran de jeu pour séparer les tours.
3. Masque le **nombre exact** de vies et affiche seulement une **barre** `█████░░` (5 blocs sur 7).

## Suite

[Partie 4 — Boucle principale et validation de la saisie](/python-pendu-4-boucle-partie/).

## Script complet du chapitre

```python
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
```

## Télécharger ce chapitre

**[pendu_chapitre_03.py](/downloads/pendu/pendu_chapitre_03.py)** — avec **[mots_pendu.txt](/downloads/pendu/mots_pendu.txt)** dans le même dossier.

## Amazon (partenaire)

- [Exercices Python](https://www.amazon.fr/s?k=exercices+python+livre&tag=manuso06-21)
