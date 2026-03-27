---
title: "Le pendu en Python (6/6) — projet complet et extensions"
description: "Organiser pendu.py : constantes, fonctions, main ; checklist ; idées (scores en ligne, accents avec unicodedata)."
pubDate: 2026-03-29
updatedDate: 2026-03-28
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Le pendu
seriesOrder: 6
tags: ["Python", "Programmation", "Projet"]
relatedLinks:
  - title: "Partie 5 — victoire et défaite"
    href: "/python-pendu-5-victoire-defaite/"
  - title: "Sommaire — le pendu"
    href: "/programmation/pendu/"
---

Tu as tout pour **assembler** le jeu. Ce dernier article propose une **structure de fichiers**, une **checklist** et des **pistes d’extension**.

![Console Python](../../assets/programmation/python-terminal.svg)

## 1. Découpage type

- `pendu.py` — point d’entrée, `if __name__ == "__main__": main()`
- Constantes en tête : `VIES_MAX`, chemins par défaut, `PENDU_ETAPES`
- Fonctions : `charger_mots`, `nouveau_masque`, `demander_lettre_valide`, `tour_de_jeu`, `jouer_partie`, `main`

Ou un dossier `pendu/` avec `mots.py`, `affichage.py`, `jeu.py` si le script dépasse ~300 lignes.

## 2. Fichier de mots livré avec le jeu

Inclus `mots.txt` à côté du script ; dans `main`, utilise un chemin **relatif** au fichier script si besoin :

```python
from pathlib import Path

BASE = Path(__file__).resolve().parent
CHEMIN_MOTS = BASE / "mots.txt"
```

Copie depuis le site l’exemple [mots-pendu.txt](/examples/mots-pendu.txt) sous le nom `mots.txt` pour tester.

## 3. Checklist finale

- [ ] Lettres invalides ou déjà jouées gérées sans crash.
- [ ] Encodage **UTF-8** à l’ouverture du fichier.
- [ ] Mot secret en **MAJUSCULES** cohérent avec la saisie.
- [ ] Victoire / défaite / rejouer / quitter.
- [ ] (Option) `try` / `except` si le fichier manque.

## 4. Extensions possibles

- **Accents** : normaliser avec `unicodedata` (`NFD` + filtrer les signes) pour accepter `É` = `E`.
- **Mode 2 joueurs** : un humain entre le mot (masqué à l’écran avec `getpass` si tu l’introduis).
- **High score** en JSON — voir la série [Carnet Todo](/programmation/carnet-todo/) pour l’inspiration.

Bravo pour la série **Le pendu** : [retour au sommaire](/programmation/pendu/) ou enchaîne avec [Puissance 4](/programmation/puissance-4/) ou [Carnet Todo](/programmation/carnet-todo/).

## Script complet du chapitre

```python
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
```

## Télécharger ce chapitre

**[pendu_chapitre_06.py](/downloads/pendu/pendu_chapitre_06.py)** — avec **[mots_pendu.txt](/downloads/pendu/mots_pendu.txt)**. Tu peux aussi passer un autre fichier : `python pendu_chapitre_06.py chemin/vers/mots.txt`.

## Amazon (partenaire)

- [Projets Python jeux](https://www.amazon.fr/s?k=python+projets+jeux+livre&tag=manuso06-21)
