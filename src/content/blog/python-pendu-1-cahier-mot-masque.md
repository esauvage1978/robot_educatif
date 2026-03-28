---
title: "Le pendu en Python (1/6) — cahier des charges et mot masqué"
description: "Règles du jeu, choisir un mot en dur, construire la chaîne affichée avec des tirets et mettre à jour quand une lettre est trouvée."
pubDate: 2026-03-29
updatedDate: 2026-03-28
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Le pendu
seriesOrder: 1
tags: ["Python", "Programmation", "Projet"]
relatedLinks:
  - title: "Parcours Python"
    href: "/programmation/python/"
  - title: "Partie 2 — mots depuis un fichier"
    href: "/python-pendu-2-mots-depuis-fichier/"
categories:
  - "Python"
  - "Programmation"
  - "Pendu"
  - "Projet"
---
Le **pendu** est un jeu de lettres : l’ordinateur choisit un **mot secret** ; le joueur propose des **lettres**. Chaque bonne lettre révèle ses positions ; chaque **mauvaise** lettre consomme une **vie**. À zéro vie ou mot entièrement découvert, la partie s’arrête.

Cette série comporte **six articles** ; celui-ci pose les règles et le **noyau** sans fichier : mot fixe dans le code.

![Console Python](../../assets/programmation/python-terminal.svg)

## 1. Règles qu’on code

- Mot en **lettres majuscules** sans accent pour simplifier (tu pourras normaliser plus tard).
- **7 erreurs** max avant défaite (nombre classique du dessin du pendu).
- Une lettre déjà proposée ne doit **pas** être rejouée (ou on l’ignore sans pénalité — choisis et documente).

## 2. Représenter les lettres trouvées

Une astuce simple : construire une liste ou une chaîne du même **longueur** que le mot, avec `_` ou `-` pour les lettres inconnues.

```python
mot = "ROBOT"
masque = ["_"] * len(mot)  # ['_', '_', '_', '_', '_']
```

Quand le joueur propose `O` :

```python
for i, lettre in enumerate(mot):
    if lettre == "O":
        masque[i] = "O"
print(" ".join(masque))   # _ O _ O _
```

## 3. Lettres déjà essayées

Un **`set`** (ensemble) convient parfaitement : test d’appartenance en **O(1)** en moyenne.

```python
essayees = set()
c = input("Une lettre : ").strip().upper()
if len(c) != 1 or not c.isalpha():
    print("Une seule lettre.")
elif c in essayees:
    print("Déjà proposée.")
else:
    essayees.add(c)
```

## 4. Une itération de jeu (sans boucle infinie encore)

1. Afficher le masque et le nombre de vies restantes.
2. Lire une lettre valide.
3. Si la lettre est **dans** le mot, mettre à jour le masque ; sinon **vie - 1**.
4. Tester victoire (`'_' not in masque`) ou défaite (`vies == 0`).

## Exercices

1. Avec `mot = "CODE"`, simule à la main deux tours : `C` puis `X`.
2. Écris une fonction `mot_termine(masque)` qui retourne `True` si plus aucun `_`.
3. Compte combien de lettres **distinctes** contient `"BATAILLE"` (résultat attendu : 6).

## Suite

[Partie 2 — Charger une liste de mots depuis un fichier texte](/python-pendu-2-mots-depuis-fichier/). Exemple de fichier fourni sur le site : `/examples/mots-pendu.txt` (à copier à côté de ton script en local).

## Script complet du chapitre

```python
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
```

## Télécharger ce chapitre

**[pendu_chapitre_01.py](/downloads/pendu/pendu_chapitre_01.py)**

## Amazon (partenaire)

- [Python — projets et jeux](https://www.amazon.fr/s?k=python+projets+jeux+livre&tag=manuso06-21)
