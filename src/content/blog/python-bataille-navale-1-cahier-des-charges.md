---
title: "Bataille navale en Python (1/6) — cahier des charges et données"
description: "Règles simplifiées, taille de grille, tailles des navires, et choix des structures : grille 2D, listes de cases."
pubDate: 2026-03-29
updatedDate: 2026-03-28
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Bataille navale
seriesOrder: 1
tags: ["Python", "Programmation", "Projet"]
relatedLinks:
  - title: "Parcours Python (bases)"
    href: "/programmation/python/"
  - title: "Partie 2 — grille et affichage"
    href: "/python-bataille-navale-2-grille-et-affichage/"
categories:
  - "Python"
  - "Programmation"
  - "Bataille navale"
  - "Projet"
---
Ce projet s’étale sur **six articles**. Tu vas coder une **bataille navale** jouable au **terminal**, en réutilisant ce que tu as vu dans le [parcours Python](/programmation/python/) : listes, boucles, `input`, fonctions, conditions.

**Niveau conseillé** : à l’aise jusqu’aux articles sur les [listes](/python-listes-et-chaines/) et idéalement les [fichiers](/python-fichiers-texte/) (optionnel pour sauvegarder une partie plus tard).

![Console Python](../../assets/programmation/python-terminal.svg)

## 1. Règles qu’on fixe pour le code

On se donne des règles **claires** (tu pourras les modifier ensuite) :

- Grille **10 × 10** (lignes `0` à `9`, colonnes `0` à `9`).
- Cinq navires, longueurs **5, 4, 3, 3, 2** cases (comme dans beaucoup de boîtes classiques).
- Les bateaux sont **en ligne droite**, **horizontaux** ou **verticaux**, sans chevauchement, **sans** coller par le côté si tu veux la règle « case d’eau entre deux bateaux » — pour commencer, on autorise le **contact côte à côte** (plus simple à coder) ; tu pourras ajouter une condition « une case d’écart » plus tard.
- À chaque tour, un joueur annonce une case : **touché** ou **manqué** ; si **toutes** les cases d’un navire sont touchées, on annonce **coulé**.
- La partie s’arrête quand **tous** les navires d’un camp sont coulés.

## 2. Deux grilles par joueur

Chaque joueur manipule en pratique :

1. **Sa grille « défense »** : où sont **ses** bateaux et où l’adversaire a tiré (eau touchée ou navire touché).
2. **Sa grille « radar »** (souvent séparée) : ce qu’il sait sur la zone adverse — cases **pas encore jouées**, **à l’eau**, **touchées**.

Pour l’apprentissage, on représente les deux par des **listes de listes** (matrices), même taille que la mer.

## 3. Symboles (convention du projet)

| Symbole | Grille défense (mes bateaux)        |
|---------|-------------------------------------|
| `.`     | eau vide                            |
| `#`     | partie de navire **non touchée**  |
| `X`     | navire **touché**                   |
| `o`     | tir adverse dans l’**eau** (manqué) |

| Symbole | Grille radar (ce que je sais chez l’ennemi) |
|---------|-----------------------------------------------|
| `?`     | case non encore ciblée                        |
| `O`     | tir **manqué** (confirmé)                     |
| `X`     | tir **touché** (au moins une partie de navire)|

Le radar ne montre pas où sont les `#` cachés : seulement tes propres tirs.

## 4. Repérer un navire dans la mémoire

En plus de la grille, il est très pratique de stocker chaque bateau comme la **liste de ses coordonnées** `(ligne, colonne)`. Exemple pour un torpilleur vertical en `(2,3)`, `(3,3)` :

```python
torpilleur = [(2, 3), (3, 3)]
flotte = [
    [(0, 0), (0, 1), (0, 2), (0, 3), (0, 4)],  # longueur 5
    # ... autres bateaux
]
```

Quand l’adversaire tire sur `(2, 3)`, tu marques cette case comme touchée sur la grille **et** tu peux vérifier si **toutes** les cases de `torpilleur` sont touchées → **coulé**.

Nous implémenterons cette logique aux [parties 4 et 5](/python-bataille-navale-4-tirs-et-marques/).

## 5. Constantes utiles dès maintenant

Tu peux déjà créer un fichier `constantes.py` ou en-tête de ton futur `bataille.py` :

```python
TAILLE = 10
LONGUEURS_NAVIRES = [5, 4, 3, 3, 2]

VIDE = "."
NAVIRE = "#"
TOUCHE = "X"
MANQUE_DEFENSE = "o"

RADAR_INCONNU = "?"
RADAR_MANQUE = "O"
RADAR_TOUCHE = "X"
```

## 6. Ce que tu peux faire avant la partie 2

Sans encore afficher joliment la grille :

1. Crée une liste de listes `10 × 10` remplie de `VIDE`.
2. Vérifie avec un petit `print` d’une ligne (ou deux) que `len(grille) == 10` et `len(grille[0]) == 10`.

## Suite

[Partie 2 — Grille, affichage et coordonnées « style A1 »](/python-bataille-navale-2-grille-et-affichage/) : fonctions pour créer la mer, l’afficher au terminal et convertir `B7` en indices.

## Script complet du chapitre

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Bataille navale — Chapitre 1/6 : constantes et grilles vides (verification).
Lancer : python bataille_chapitre_01.py
"""

TAILLE = 10
LONGUEURS_NAVIRES = [5, 4, 3, 3, 2]

VIDE = "."
NAVIRE = "#"
TOUCHE = "X"
MANQUE_DEFENSE = "o"

RADAR_INCONNU = "?"
RADAR_MANQUE = "O"
RADAR_TOUCHE = "X"


def nouvelle_grille_defense():
    return [[VIDE for _ in range(TAILLE)] for _ in range(TAILLE)]


def nouvelle_grille_radar():
    return [[RADAR_INCONNU for _ in range(TAILLE)] for _ in range(TAILLE)]


def main():
    g = nouvelle_grille_defense()
    assert len(g) == TAILLE and len(g[0]) == TAILLE
    r = nouvelle_grille_radar()
    nb_inconnues = sum(row.count(RADAR_INCONNU) for row in r)
    assert nb_inconnues == TAILLE * TAILLE
    print("OK — grille defense", TAILLE, "x", TAILLE, "remplie de", repr(VIDE))
    print("OK — radar :", nb_inconnues, "cases", repr(RADAR_INCONNU))
    print("Navires a placer (longueurs) :", LONGUEURS_NAVIRES)


if __name__ == "__main__":
    main()
```

## Télécharger ce chapitre

**[bataille_chapitre_01.py](/downloads/bataille-navale/bataille_chapitre_01.py)** — même contenu que le bloc ci-dessus.

## Amazon (partenaire)

- [Python — projets et jeux](https://www.amazon.fr/s?k=python+projets+jeux+livre&tag=manuso06-21)
