---
title: "Projet Python : bataille navale (3/6) — placer les bateaux sur la grille"
headline: "Projet Python : Bataille Navale (3/6) – Placer les Bateaux sur la Grille"
description: "Placer des bateaux sur une liste 2D en Python : règles, pas de chevauchement, placement aléatoire avec random. Projet bataille navale, code prêt à l’emploi."
pubDate: 2026-03-29
updatedDate: 2026-04-18
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Bataille navale
seriesOrder: 3
tags: ["Python", "Programmation", "Projet", "débutant", "grille 2D", "random"]
relatedLinks:
  - title: "Sommaire — série Bataille navale"
    href: "/programmation/bataille-navale/"
  - title: "Partie 1 — cahier des charges"
    href: "/python-bataille-navale-1-cahier-des-charges/"
  - title: "Partie 2 — grille et affichage"
    href: "/python-bataille-navale-2-grille-et-affichage/"
  - title: "Partie 4 — tirs et marques"
    href: "/python-bataille-navale-4-tirs-et-marques/"
  - title: "Partie 5 — coulé et victoire"
    href: "/python-bataille-navale-5-coule-et-victoire/"
  - title: "Partie 6 — jeu complet au terminal"
    href: "/python-bataille-navale-6-jeu-complet/"
  - title: "Parcours Python (bases)"
    href: "/programmation/python/"
categories:
  - "Python"
  - "Programmation"
  - "Bataille navale"
  - "Projet"
faqSchema:
  - question: "Comment placer des bateaux sur une grille Python sans erreur ?"
    answer: "On calcule la liste des cases occupées par le navire (ligne droite horizontale ou verticale), on vérifie que chaque case est dans la grille et encore vide (eau), puis on écrit le symbole du bateau sur ces cases. On répète pour chaque navire en évitant le chevauchement."
  - question: "Comment faire un placement aléatoire de bateaux en Python ?"
    answer: "Avec le module random : tirage d’une case de départ, d’une orientation (horizontal ou vertical), test du placement avec une fonction qui valide ; en cas d’échec, on retente jusqu’à succès ou jusqu’à une limite de tentatives pour éviter une boucle infinie."
  - question: "Quelles tailles de bateaux pour une bataille navale en projet Python ?"
    answer: "Dans ce tutoriel, la flotte est celle du cahier des charges : cinq navires de longueurs 5, 4, 3, 3 et 2 cases — soit des bateaux entre 2 et 5 cases, au total 17 cases."
  - question: "Pourquoi utiliser une liste 2D pour le placement ?"
    answer: "La grille défense est une liste de listes : chaque case mémorise l’état (eau, navire). Les tirs de la partie 4 réutiliseront les mêmes indices (ligne, colonne) pour lire et mettre à jour une case."
---

Tu sais désormais [créer une grille et l’afficher](/python-bataille-navale-2-grille-et-affichage/) (**partie 2**). L’étape suivante du [projet bataille navale](/programmation/bataille-navale/) : **remplir la grille défense** avec une **flotte** — sans **déborder**, sans **chevauchement**, et avec une logique que tu pourras **réutiliser** pour le joueur humain ou un tirage **automatique**.

La question concrète : *comment placer des bateaux dans une grille Python sans erreur ?* Cet article pose les **règles**, la **validation** case par case, puis un **placement aléatoire** propre — ce qui prépare directement la [partie 4 — tirs et marques](/python-bataille-navale-4-tirs-et-marques/), où chaque tir pointera vers une case de cette même **liste 2D**.

Dans un jeu de bataille navale, les navires doivent être placés **sans se chevaucher** et **entièrement dans la grille** ; chaque tentative de placement doit être **vérifiée** avant d’écrire sur la grille.

**Prérequis** : [grille 2D et affichage](/python-bataille-navale-2-grille-et-affichage/), bases du [parcours Python](/programmation/python/) (`for`, `if`, fonctions). Le [cahier des charges](/python-bataille-navale-1-cahier-des-charges/) fixe la taille de la flotte utilisée ici.

![Console Python](../../assets/programmation/python-terminal.svg)

<div class="article-toc" role="navigation" aria-label="Sommaire de l’article">
<p class="article-toc-title">Sommaire</p>
<ul>
<li><a href="#1-les-règles-de-placement-des-bateaux">1. Les règles de placement des bateaux</a></li>
<li><a href="#2-générer-une-position-aléatoire">2. Générer une position aléatoire</a></li>
<li><a href="#3-de-la-case-au-navire-complet">3. De la case au navire complet</a></li>
<li><a href="#4-valider-et-écrire-sur-la-grille">4. Valider et écrire sur la grille</a></li>
<li><a href="#5-placement-aléatoire-de-toute-la-flotte">5. Placement aléatoire de toute la flotte</a></li>
<li><a href="#6-exercices-et-lien-avec-les-tirs">6. Exercices et lien avec les tirs</a></li>
<li><a href="#7-résumé">7. Résumé</a></li>
<li><a href="#8-suite-de-la-série">8. Suite de la série</a></li>
<li><a href="#9-script-complet-du-chapitre">9. Script complet du chapitre</a></li>
<li><a href="#10-télécharger-ce-chapitre">10. Télécharger ce chapitre</a></li>
</ul>
</div>

## 1. Les règles de placement des bateaux

On suit le [cahier des charges](/python-bataille-navale-1-cahier-des-charges/) de la série :

- **Flotte** : cinq navires, longueurs **5, 4, 3, 3 et 2** cases — en pratique des bateaux dont la taille va **de 2 à 5 cases** (total **17** cases occupées).
- **Forme** : chaque navire occupe des cases **alignées** en **ligne droite**, soit **horizontal**, soit **vertical** (pas de diagonal dans cette version).
- **Contraintes** :
  - **Pas de chevauchement** : une case ne peut appartenir qu’à un seul navire.
  - **Rester dans la grille** : toutes les cases du navire doivent avoir des indices entre **0** et **9** sur une grille **10×10** (indices Python).
- **Contact bord à bord** : pour simplifier le code, on **autorise** ici deux navires **adjacents** (pas d’obligation d’une case d’eau entre eux) ; tu pourras ajouter une règle « gap » plus tard si tu veux coller à une variante papier stricte.

La **gestion des positions** repose sur deux idées : (1) représenter un navire par la **liste des coordonnées** `(ligne, colonne)` de ses cases ; (2) **valider** cette liste avant toute écriture dans la **liste 2D**.

## 2. Générer une position aléatoire

Pour tirer une **case de départ** au hasard sur une grille 10×10, on peut utiliser `random` et renvoyer un **tuple** `(ligne, colonne)` :

```python
import random

def position_aleatoire():
    return random.randint(0, 9), random.randint(0, 9)
```

`randint(0, 9)` donne un indice de ligne ou de colonne **valide** pour une grille indexée de **0** à **9**. C’est la brique minimale pour un **placement aléatoire** : beaucoup de projets Python combinent ce tirage avec une **orientation** (horizontal / vertical) et une **longueur** de navire pour construire toutes les cases à occuper — voir section suivante.

## 3. De la case au navire complet

Une seule case aléatoire ne suffit pas : il faut en déduire **toutes les cases** du navire. Pour un navire de longueur `L` partant de `(debut_ligne, debut_col)` :

- **Horizontal** : même ligne, colonnes `debut_col`, `debut_col + 1`, … jusqu’à `L - 1` pas vers la droite.
- **Vertical** : même colonne, lignes `debut_ligne`, `debut_ligne + 1`, …

```python
TAILLE = 10

def cases_navire(debut_ligne, debut_col, longueur, horizontal):
    coords = []
    for k in range(longueur):
        if horizontal:
            coords.append((debut_ligne, debut_col + k))
        else:
            coords.append((debut_ligne + k, debut_col))
    return coords
```

Si le navire **dépasse** de la grille (ex. horizontal trop près du bord droit), certaines coordonnées auront une colonne `>= TAILLE` : la fonction de validation ci‑dessous les **rejette**.

## 4. Valider et écrire sur la grille

On utilise une grille défense où `.` = **eau vide** et `#` = **navire** (comme dans les parties précédentes).

```python
VIDE = "."
NAVIRE = "#"

def cases_libres(grille, cases):
    for ligne, col in cases:
        if not (0 <= ligne < TAILLE and 0 <= col < TAILLE):
            return False
        if grille[ligne][col] != VIDE:
            return False
    return True


def placer_navire(grille, coords):
    for ligne, col in coords:
        grille[ligne][col] = NAVIRE


def essayer_placer(grille, debut_ligne, debut_col, longueur, horizontal):
    coords = cases_navire(debut_ligne, debut_col, longueur, horizontal)
    if not cases_libres(grille, coords):
        return None
    placer_navire(grille, coords)
    return coords
```

`cases_libres` assure à la fois **les bords** et le **non-chevauchement** : toute case hors grille ou déjà occupée fait échouer le placement. `essayer_placer` ne modifie la grille **que** si tout est valide, et renvoie la liste `coords` pour la stocker dans une structure **`flotte`** (liste de navires, chaque navire = liste de tuples) — ce sera utile pour savoir si un bateau est entièrement touché en [partie 5](/python-bataille-navale-5-coule-et-victoire/).

## 5. Placement aléatoire de toute la flotte

Pour chaque longueur de la flotte, on peut **retenter** jusqu’à trouver un placement valide : tirage d’orientation, utilisation de `position_aleatoire()` pour `(i, j)`, puis `essayer_placer`. Une **limite de tentatives** par navire évite une boucle infinie si la grille était trop pleine (ici, avec 17 cases sur 100, ce n’est pas un problème en pratique).

```python
LONGUEURS_NAVIRES = [5, 4, 3, 3, 2]

def placement_aleatoire(grille):
    flotte = []
    for L in LONGUEURS_NAVIRES:
        for _ in range(5000):
            h = random.choice([True, False])
            i, j = position_aleatoire()
            coords = essayer_placer(grille, i, j, L, h)
            if coords:
                flotte.append(coords)
                break
        else:
            raise RuntimeError("Placement aléatoire impossible — réessaie.")
    return flotte
```

Tu peux aussi proposer un **placement manuel** : pour chaque navire, saisir départ + `H`/`V` avec le [`parser_case`](/python-bataille-navale-2-grille-et-affichage/) pour le point de départ, puis `essayer_placer` dans une boucle **tant que** le retour est `None`.

## 6. Exercices et lien avec les tirs

1. **Chevauchement** : après deux placements, vérifie qu’aucune case n’a été écrasée — `cases_libres` doit tout refuser si une case est déjà `#`.
2. **Bords** : un navire de longueur **5** ne doit pas commencer en colonne **8** en horizontal (sinon dépassement).
3. Après `placement_aleatoire`, **affiche** la grille ([partie 2](/python-bataille-navale-2-grille-et-affichage/)) et compte les `#` : la somme des longueurs doit être **17**.

**Vers la partie 4** : la même grille (mêmes indices `(ligne, colonne)`) servira à **enregistrer un tir** : lire une case, comparer à l’eau ou à un navire, mettre à jour symboles et radar — sans changer la structure de la **liste 2D**.

## 7. Résumé

| Élément | Contenu |
|---------|---------|
| **Objectif** | **Placer bateaux** sur une **liste 2D** sans débordement ni chevauchement |
| **Flotte** | Longueurs **5, 4, 3, 3, 2** (navires de **2 à 5** cases) |
| **Outils** | `cases_navire`, `cases_libres`, `essayer_placer`, **`position_aleatoire`**, boucle `random` |
| **Donnée clé** | Liste **`flotte`** : chaque navire = liste de coordonnées pour la suite (**tirs**, **coulé**) |
| **Suite** | [Tirs et marques](/python-bataille-navale-4-tirs-et-marques/) |

## 8. Suite de la série

- **Partie 2** : [Grille et affichage](/python-bataille-navale-2-grille-et-affichage/)
- **Partie 4** : [Tirs et marques](/python-bataille-navale-4-tirs-et-marques/)
- **Index** : [Série bataille navale](/programmation/bataille-navale/)

## 9. Script complet du chapitre

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Bataille navale — Chapitre 3/6 : placement sans chevauchement (démo aléatoire).
Lancer : python bataille_chapitre_03.py
"""

import random

TAILLE = 10
VIDE = "."
NAVIRE = "#"
RADAR_INCONNU = "?"
LONGUEURS_NAVIRES = [5, 4, 3, 3, 2]


def nouvelle_grille_defense():
    return [[VIDE for _ in range(TAILLE)] for _ in range(TAILLE)]


def nouvelle_grille_radar():
    return [[RADAR_INCONNU for _ in range(TAILLE)] for _ in range(TAILLE)]


def lettre_ligne(i):
    return chr(ord("A") + i)


def afficher_grille_lettres(grille, titre="Grille"):
    print(titre)
    print("    " + " ".join(str(c + 1) for c in range(TAILLE)))
    for i, ligne in enumerate(grille):
        print(f"{lettre_ligne(i):2}  " + "  ".join(cell for cell in ligne))


def parser_case(texte):
    texte = texte.strip().upper().replace(" ", "")
    if len(texte) < 2:
        raise ValueError("Trop court (ex. B7)")
    lettre = texte[0]
    chiffres = texte[1:]
    derniere = chr(ord("A") + TAILLE - 1)
    if not ("A" <= lettre <= derniere):
        raise ValueError(f"Ligne A–{derniere}")
    ligne = ord(lettre) - ord("A")
    colonne = int(chiffres) - 1
    if not (0 <= colonne < TAILLE):
        raise ValueError(f"Colonne 1–{TAILLE}")
    return ligne, colonne


def position_aleatoire():
    return random.randint(0, 9), random.randint(0, 9)


def cases_libres(grille, cases):
    for ligne, col in cases:
        if not (0 <= ligne < TAILLE and 0 <= col < TAILLE):
            return False
        if grille[ligne][col] != VIDE:
            return False
    return True


def cases_navire(debut_ligne, debut_col, longueur, horizontal):
    coords = []
    for k in range(longueur):
        if horizontal:
            coords.append((debut_ligne, debut_col + k))
        else:
            coords.append((debut_ligne + k, debut_col))
    return coords


def placer_navire(grille, coords):
    for ligne, col in coords:
        grille[ligne][col] = NAVIRE


def essayer_placer(grille, debut_ligne, debut_col, longueur, horizontal):
    coords = cases_navire(debut_ligne, debut_col, longueur, horizontal)
    if not cases_libres(grille, coords):
        return None
    placer_navire(grille, coords)
    return coords


def placement_aleatoire(grille):
    flotte = []
    for L in LONGUEURS_NAVIRES:
        for _ in range(5000):
            h = random.choice([True, False])
            i, j = position_aleatoire()
            coords = essayer_placer(grille, i, j, L, h)
            if coords:
                flotte.append(coords)
                break
        else:
            raise RuntimeError("Placement aléatoire impossible — réessaie.")
    return flotte


def main():
    random.seed()
    g = nouvelle_grille_defense()
    flotte = placement_aleatoire(g)
    afficher_grille_lettres(g, "Flotte placée au hasard")
    nb_navire = sum(len(n) for n in flotte)
    print("Nombre de cases # :", nb_navire, "(attendu : 17)")


if __name__ == "__main__":
    main()
```

## 10. Télécharger ce chapitre

**[bataille_chapitre_03.py](/downloads/bataille-navale/bataille_chapitre_03.py)**

## Amazon (partenaire)

- [Python 3 — exercices corrigés](https://www.amazon.fr/s?k=python+3+exercices+corrig%C3%A9s&tag=manuso06-21)
