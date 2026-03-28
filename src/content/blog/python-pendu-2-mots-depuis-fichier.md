---
title: "Le pendu en Python (2/6) — mots depuis un fichier"
description: "Lire un fichier texte UTF-8, une ligne = un mot ; ignorer les lignes vides ; choisir un mot au hasard avec random."
pubDate: 2026-03-29
updatedDate: 2026-03-28
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Le pendu
seriesOrder: 2
tags: ["Python", "Programmation", "Projet"]
relatedLinks:
  - title: "Partie 1 — cahier des charges"
    href: "/python-pendu-1-cahier-mot-masque/"
  - title: "Partie 3 — affichage et lettres"
    href: "/python-pendu-3-affichage-lettres/"
categories:
  - "Python"
  - "Programmation"
  - "Pendu"
  - "Projet"
---
Tu maîtrises le principe du [masque](/python-pendu-1-cahier-mot-masque/). Pour varier les parties, les mots viennent d’un **fichier** : une **ligne** = un **mot** (sans espaces). Tu réutilises la lecture de fichiers vue dans le [parcours](/python-fichiers-texte/).

![Console Python](../../assets/programmation/python-terminal.svg)

## 1. Format du fichier

Exemple (`mots.txt`) :

```text
ROBOT
PYTHON
LISTE
```

- Pas d’accents au début pour éviter les surprises d’encodage ; tu pourras ajouter `unicodedata` plus tard.
- Lignes vides : à **sauter** avec `strip()` et `if ligne:`.

## 2. Charger la liste

```python
def charger_mots(chemin):
    with open(chemin, "r", encoding="utf-8") as f:
        lignes = f.read().splitlines()
    mots = [L.strip().upper() for L in lignes if L.strip()]
    if not mots:
        raise ValueError("Aucun mot dans le fichier.")
    return mots
```

## 3. Choisir un mot au hasard

```python
import random

mots = charger_mots("mots.txt")
secret = random.choice(mots)
```

Sur ce site, un petit fichier d’exemple est disponible en statique : **`/examples/mots-pendu.txt`** — en local, copie-le dans ton dossier de travail ou adapte le chemin (voir [fichiers](/python-fichiers-texte/) et chemins relatifs).

## 4. Gestion d’erreur

Si le fichier **n’existe pas**, `FileNotFoundError` : entoure avec `try` / `except` ([erreurs](/python-erreurs-debogage/)) et affiche un message clair.

## Exercices

1. Compte le nombre de mots dans ton fichier après chargement.
2. Filtre les mots de moins de **3** lettres avant `random.choice`.
3. Demande le **chemin** du fichier avec `input()` au lancement.

## Suite

[Partie 3 — Afficher le masque, les lettres essayées et un pendu simple](/python-pendu-3-affichage-lettres/).

## Script complet du chapitre

```python
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
```

## Télécharger ce chapitre

**[pendu_chapitre_02.py](/downloads/pendu/pendu_chapitre_02.py)** — télécharge aussi **[mots_pendu.txt](/downloads/pendu/mots_pendu.txt)** et mets les deux dans le même dossier en local.

## Amazon (partenaire)

- [Python 3 — fichiers et données](https://www.amazon.fr/s?k=python+donn%C3%A9es+fichiers+livre&tag=manuso06-21)
