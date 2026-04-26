---
title: "Projet Python : bataille navale (4/6) — tirs et résultats (radar / défense)"
headline: "Projet Python : Bataille Navale (4/6) – Gérer les Tirs et les Résultats"
description: "Gestion des tirs en Python : vérifier une case sur une grille 2D, touché ou raté, mise à jour radar. Projet bataille navale, logique conditionnelle et code jouable."
pubDate: 2026-03-29
updatedDate: 2026-04-18
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Bataille navale
seriesOrder: 4
tags: ["Python", "Programmation", "Projet", "débutant", "jeu", "input"]
relatedLinks:
  - title: "Sommaire — série Bataille navale"
    href: "/programmation/bataille-navale/"
  - title: "Partie 1 — cahier des charges"
    href: "/python-bataille-navale-1-cahier-des-charges/"
  - title: "Partie 2 — grille et affichage"
    href: "/python-bataille-navale-2-grille-et-affichage/"
  - title: "Partie 3 — placement des navires"
    href: "/python-bataille-navale-3-placement-bateaux/"
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
  - question: "Comment gérer les tirs dans un jeu Python (bataille navale) ?"
    answer: "Le tireur choisit une case (ligne, colonne) ; le programme lit l’état sur la grille défense adverse : eau → raté, navire intact → touché. On met à jour la grille du défenseur et le radar du tireur avec des symboles distincts, et on refuse de rejouer une case déjà tirée."
  - question: "Comment vérifier une case sur une grille 2D en Python ?"
    answer: "Avec grille[ligne][colonne] : lire le caractère ou la valeur, comparer à des constantes (eau, navire, déjà joué). Tester les indices avant accès si la saisie n’est pas garantie valide."
  - question: "Touché ou coulé : quand le coder ?"
    answer: "Dès la partie 4, on distingue touché (navire touché mais peut-être pas entièrement) et raté. La détection de « coulé » (toutes les cases d’un navire touchées) et la victoire sont traitées à la partie suivante."
  - question: "Radar et grille défense : pourquoi deux grilles ?"
    answer: "La défense adverse contient la vérité (bateaux cachés). Le radar du tireur ne montre que ce qu’il a découvert : inconnu, manqué, touché — sans révéler les navires non touchés."
---

Tu as [placé la flotte](/python-bataille-navale-3-placement-bateaux/) sur une **grille défense** : on peut enfin **jouer**. Ce volet du [projet bataille navale](/programmation/bataille-navale/) répond à : *comment gérer les tirs dans mon jeu Python ?* — avec **interaction utilisateur** (`input`), **conditions** sur le contenu d’une case, et **deux vues** de la bataille : ce que voit le **défenseur** sur sa grille et ce que voit l’**attaquant** sur son **radar**.

La promesse : un **premier gameplay fonctionnel** — tir → **vérifier la case** → **afficher le résultat** (raté / touché) et mettre à jour les grilles. La notion de **« coulé »** (navire entièrement touché) et la **fin de partie** arrivent à la [partie 5 — coulé et victoire](/python-bataille-navale-5-coule-et-victoire/), puis la **boucle complète** à la [partie 6](/python-bataille-navale-6-jeu-complet/).

Dans la bataille navale, **chaque tir** produit un **résultat** : en général on distingue au minimum **raté** (eau) et **touché** (navire). Le **coulé** s’ajoute lorsque le dernier segment d’un navire est touché — nous le formaliserons à la partie 5.

**Prérequis** : [grille et coordonnées](/python-bataille-navale-2-grille-et-affichage/), [placement](/python-bataille-navale-3-placement-bateaux/). Symboles du [cahier des charges](/python-bataille-navale-1-cahier-des-charges/).

![Console Python](../../assets/programmation/python-terminal.svg)

<div class="article-toc" role="navigation" aria-label="Sommaire de l’article">
<p class="article-toc-title">Sommaire</p>
<ul>
<li><a href="#1-principe-des-tirs">1. Principe des tirs</a></li>
<li><a href="#2-demander-un-tir-utilisateur">2. Demander un tir utilisateur</a></li>
<li><a href="#3-mettre-à-jour-la-grille-défense">3. Mettre à jour la grille défense</a></li>
<li><a href="#4-mettre-à-jour-le-radar-de-lattaquant">4. Mettre à jour le radar de l’attaquant</a></li>
<li><a href="#5-enchaîner-un-tir-complet--executer_tir">5. Enchaîner un tir complet : <code>executer_tir</code></a></li>
<li><a href="#6-vers-la-partie-5--coulé-et-boucle">6. Vers la partie 5 : coulé et boucle</a></li>
<li><a href="#7-exercices">7. Exercices</a></li>
<li><a href="#8-résumé">8. Résumé</a></li>
<li><a href="#9-suite-de-la-série">9. Suite de la série</a></li>
<li><a href="#10-script-complet-du-chapitre">10. Script complet du chapitre</a></li>
<li><a href="#11-télécharger-ce-chapitre">11. Télécharger ce chapitre</a></li>
</ul>
</div>

## 1. Principe des tirs

À chaque tour, le **joueur qui attaque** choisit une **case** : en interne, des indices **`(ligne, colonne)`** entre **0** et **9** sur la grille 10×10 (comme en [partie 2](/python-bataille-navale-2-grille-et-affichage/)).

Le **programme** consulte la **grille défense** de l’adversaire (là où ses navires ont été placés en [partie 3](/python-bataille-navale-3-placement-bateaux/)) :

| Contenu de la case | Résultat annoncé (partie 4) | Effet |
|--------------------|----------------------------|--------|
| Eau `.` | **Raté** (manqué) | Marquer l’eau comme déjà tirée |
| Navire `#` (non touché) | **Touché** | Remplacer par « touché » sur la défense |
| Déjà jouée (`X`, `o`, …) | **Interdit** | Ne pas compter comme un nouveau tir |

Le joueur **annonce une coordonnée** ; le programme **compare** à l’état réel de la case — c’est le cœur de la **logique conditionnelle** : `if` / `elif` / `else` sur le symbole lu dans `grille[ligne][colonne]`.

Pour l’instant, **touché** ne distingue pas encore **coulé** : dès qu’on touche un `#`, on affiche « touché ». La [partie 5](/python-bataille-navale-5-coule-et-victoire/) parcourra la **liste des navires** pour savoir si **toutes** les cases d’un bateau sont touchées — puis « **coulé** ».

## 2. Demander un tir utilisateur

Version minimaliste avec **indices 0–9** (ligne puis colonne), pour bien voir le lien avec `grille[ligne][colonne]` :

```python
def demander_tir():
    x = int(input("Ligne (0-9) : "))
    y = int(input("Colonne (0-9) : "))
    return x, y
```

Ici **`x`** est la **ligne** et **`y`** la **colonne** (ordre `(ligne, colonne)` cohérent avec le reste du tutoriel). En production, tu **valideras** la saisie (entiers dans `0..9`, gestion des erreurs `ValueError`) — voir [types et saisie](/python-types-et-saisie/).

Pour une saisie **style plateau** `A1`–`J10`, réutilise le [`parser_case`](/python-bataille-navale-2-grille-et-affichage/) : il renvoie déjà `(ligne, colonne)` en indices Python.

```python
def demander_tir_case():
    texte = input("Case (ex. D5) : ")
    return parser_case(texte)
```

Ensuite : `ligne, col = demander_tir()` puis appel de la fonction qui **applique** le tir sur les grilles (section 5).

## 3. Mettre à jour la grille défense

Côté **défenseur**, la grille reflète la vérité après chaque tir reçu (symboles du [cahier des charges](/python-bataille-navale-1-cahier-des-charges/)) :

- `#` → `X` si un navire est touché à cette case.
- `.` → `o` si l’adversaire tire dans l’eau (sur *ta* grille on note aussi le manqué).

```python
VIDE = "."
NAVIRE = "#"
TOUCHE = "X"
MANQUE_DEFENSE = "o"

def appliquer_tir_defense(grille_defense, ligne, col):
    cell = grille_defense[ligne][col]
    if cell == NAVIRE:
        grille_defense[ligne][col] = TOUCHE
        return "touche"
    if cell == VIDE:
        grille_defense[ligne][col] = MANQUE_DEFENSE
        return "manque"
    return "deja"
```

En jeu sérieux, on **refuse** un tir sur une case déjà marquée `X` ou `o` avant toute modification.

## 4. Mettre à jour le radar de l’attaquant

Le **radar** ne révèle pas les `#` cachés : seulement l’**inconnu** `?`, les **manqués** `O` et les **touchés** `X`.

```python
RADAR_INCONNU = "?"
RADAR_MANQUE = "O"
RADAR_TOUCHE = "X"

def appliquer_tir_radar(grille_radar, ligne, col, resultat):
    if grille_radar[ligne][col] != RADAR_INCONNU:
        return False
    if resultat == "touche":
        grille_radar[ligne][col] = RADAR_TOUCHE
    elif resultat == "manque":
        grille_radar[ligne][col] = RADAR_MANQUE
    else:
        return False
    return True
```

Le défenseur « annonce » le résultat ; le tireur met à jour **son** radar en conséquence. (En [partie 5](/python-bataille-navale-5-coule-et-victoire/), le message pourra préciser **coulé**.)

## 5. Enchaîner un tir complet : `executer_tir`

Une fonction unique évite les oublis : **vérifier** que le radar n’a pas déjà cette case, **lire** l’état sur la défense cible, **écrire** défense + radar, **retourner** une chaîne exploitable par l’affichage ou la boucle de jeu.

```python
def executer_tir(grille_defense_cible, grille_radar_tireur, ligne, col):
    if grille_radar_tireur[ligne][col] != RADAR_INCONNU:
        return "deja"
    etat = grille_defense_cible[ligne][col]
    if etat in (TOUCHE, MANQUE_DEFENSE):
        return "incoherent"
    if etat == NAVIRE:
        grille_defense_cible[ligne][col] = TOUCHE
        grille_radar_tireur[ligne][col] = RADAR_TOUCHE
        return "touche"
    grille_defense_cible[ligne][col] = MANQUE_DEFENSE
    grille_radar_tireur[ligne][col] = RADAR_MANQUE
    return "manque"
```

Tu peux afficher tout de suite un message du type : *Raté !* / *Touché !* selon la valeur retournée — premier **feedback** de **gameplay**.

## 6. Vers la partie 5 : coulé et boucle

- **Coulé** : pour savoir si un navire est entièrement touché, il faut la structure **`flotte`** (liste de listes de coordonnées) de la [partie 3](/python-bataille-navale-3-placement-bateaux/) — à croiser avec les cases marquées `X` sur la défense. C’est l’objet de la [partie 5](/python-bataille-navale-5-coule-et-victoire/).
- **Même joueur rejoue après touché** (règle classique) : une simple condition dans la boucle de partie ([partie 6](/python-bataille-navale-6-jeu-complet/)) : si `executer_tir` renvoie `touche`, ne pas changer de joueur jusqu’à un `manque`.

## 7. Exercices

1. Sur deux grilles mini **3×3** construites à la main, simule **trois tirs** et affiche défense + radar après chaque coup.
2. Écris `tir_valide(radar, ligne, col)` qui vaut `True` seulement si la case radar est encore `?`.
3. Enchaîne `demander_tir()` et `executer_tir(...)` dans une **boucle** `while` avec un compteur de coups maximum pour tester sans fin de partie.

## 8. Résumé

| Élément | Contenu |
|---------|---------|
| **Entrée** | Coordonnées `(ligne, colonne)` via `demander_tir()` ou `parser_case` |
| **Vérification** | Lecture `grille_defense[ligne][col]` — **gestion tir jeu** par conditions |
| **Sortie** | `manque` / `touche` / `deja` ; affichage des **résultats** sur défense et radar |
| **Suite** | **Coulé** + victoire → [partie 5](/python-bataille-navale-5-coule-et-victoire/) |

## 9. Suite de la série

- **Partie 3** : [Placement des bateaux](/python-bataille-navale-3-placement-bateaux/)
- **Partie 5** : [Coulé et victoire](/python-bataille-navale-5-coule-et-victoire/)
- **Index** : [Série bataille navale](/programmation/bataille-navale/)

## 10. Script complet du chapitre

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Bataille navale — Chapitre 4/6 : tirs, défense + radar (démo).
Lancer : python bataille_chapitre_04.py
"""

import random

TAILLE = 10
VIDE = "."
NAVIRE = "#"
TOUCHE = "X"
MANQUE_DEFENSE = "o"
RADAR_INCONNU = "?"
RADAR_MANQUE = "O"
RADAR_TOUCHE = "X"
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


def demander_tir():
    x = int(input("Ligne (0-9) : "))
    y = int(input("Colonne (0-9) : "))
    return x, y


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
            i = random.randrange(TAILLE)
            j = random.randrange(TAILLE)
            coords = essayer_placer(grille, i, j, L, h)
            if coords:
                flotte.append(coords)
                break
        else:
            raise RuntimeError("Placement aléatoire impossible.")
    return flotte


def executer_tir(grille_defense_cible, grille_radar_tireur, ligne, col):
    if grille_radar_tireur[ligne][col] != RADAR_INCONNU:
        return "deja"
    etat = grille_defense_cible[ligne][col]
    if etat in (TOUCHE, MANQUE_DEFENSE):
        return "incoherent"
    if etat == NAVIRE:
        grille_defense_cible[ligne][col] = TOUCHE
        grille_radar_tireur[ligne][col] = RADAR_TOUCHE
        return "touche"
    grille_defense_cible[ligne][col] = MANQUE_DEFENSE
    grille_radar_tireur[ligne][col] = RADAR_MANQUE
    return "manque"


def demo_tirs():
    random.seed()
    defense = nouvelle_grille_defense()
    placement_aleatoire(defense)
    radar = nouvelle_grille_radar()
    afficher_grille_lettres(defense, "(DEBUG) Grille adverse — en vrai tu ne la vois pas")
    for case in ["A1", "E5", "J10"]:
        li, co = parser_case(case)
        res = executer_tir(defense, radar, li, co)
        print(case, "->", res)
    afficher_grille_lettres(radar, "Ton radar après 3 tirs")


def main():
    demo_tirs()


if __name__ == "__main__":
    main()
```

## 11. Télécharger ce chapitre

**[bataille_chapitre_04.py](/downloads/bataille-navale/bataille_chapitre_04.py)**

## Amazon (partenaire)

- [Python — bonnes pratiques](https://www.amazon.fr/s?k=clean+code+python+livre&tag=manuso06-21)
