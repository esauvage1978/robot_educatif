---
title: "Le pendu en Python (5/6) — victoire, défaite et finitions"
description: "Messages clairs, afficher le mot si perdu ; statistiques simples ; option thèmes de mots (plusieurs fichiers)."
pubDate: 2026-03-29
updatedDate: 2026-03-28
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Le pendu
seriesOrder: 5
tags: ["Python", "Programmation", "Projet"]
relatedLinks:
  - title: "Partie 4 — boucle"
    href: "/python-pendu-4-boucle-partie/"
  - title: "Partie 6 — projet complet"
    href: "/python-pendu-6-projet-complet/"
---

La [boucle](/python-pendu-4-boucle-partie/) fonctionne : tu peux **polir** l’expérience joueur et ajouter de petites **statistiques** pour rendre le jeu plus satisfaisant.

![Console Python](../../assets/programmation/python-terminal.svg)

## 1. Messages de fin

- **Victoire** : félicitations + nombre d’erreurs ou de coups.
- **Défaite** : toujours afficher le **mot secret** (`print(f"Le mot était : {secret}")`).

Évite de révéler le mot en cours de route si tu veux garder la tension.

## 2. Statistiques de session

Variables globales ou dictionnaire `stats = {"parties": 0, "gagnees": 0}` incrémentés après chaque partie. Affiche un **résumé** quand l’utilisateur quitte (`q` au menu).

## 3. Thèmes (plusieurs fichiers)

Propose un menu : `1 = animaux`, `2 = informatique` → chemins `mots_animaux.txt`, `mots_info.txt`. Même fonction `charger_mots`, argument **chemin** différent.

## 4. Temps de réflexion (option)

`import time` : enregistre `t0 = time.time()` au début de la partie et affiche la **durée** à la fin.

## Exercices

1. Affiche un **pourcentage** de victoires sur la session (`gagnees / parties * 100` avec garde si `parties == 0`).
2. Sauvegarde les stats dans un petit fichier **`stats_pendu.txt`** (une ligne par session ou cumul — comme tu préfères).
3. Ajoute un mode **facile** : affiche le **nombre** de lettres distinctes restantes à trouver.

## Suite

[Partie 6 — Assembler le projet, structure des fichiers et extensions](/python-pendu-6-projet-complet/).

## Script complet du chapitre

```python
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
```

## Télécharger ce chapitre

**[pendu_chapitre_05.py](/downloads/pendu/pendu_chapitre_05.py)** — avec **[mots_pendu.txt](/downloads/pendu/mots_pendu.txt)**.

## Amazon (partenaire)

- [Python — bonnes pratiques](https://www.amazon.fr/s?k=clean+code+python+livre&tag=manuso06-21)
