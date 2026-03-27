---
title: "Bataille navale en Python (6/6) — jeu complet au terminal"
description: "Boucle principale, alternance des joueurs, masquer l’écran entre les tours ; variante contre une IA aléatoire."
pubDate: 2026-03-29
updatedDate: 2026-03-28
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Bataille navale
seriesOrder: 6
tags: ["Python", "Programmation", "Projet"]
relatedLinks:
  - title: "Partie 5 — coulé et victoire"
    href: "/python-bataille-navale-5-coule-et-victoire/"
  - title: "Série — sommaire"
    href: "/programmation/bataille-navale/"
---

Tu as toutes les **briques** : [grille](/python-bataille-navale-2-grille-et-affichage/), [placement](/python-bataille-navale-3-placement-bateaux/), [tirs](/python-bataille-navale-4-tirs-et-marques/), [coulé](/python-bataille-navale-5-coule-et-victoire/). Il reste à **assembler** une `main()` lisible et une boucle de partie.

![Console Python](../../assets/programmation/python-terminal.svg)

## 1. Structure recommandée du projet

Un seul fichier `bataille.py` au début, ou bien :

- `constantes.py` — `TAILLE`, symboles, `LONGUEURS_NAVIRES`
- `grille.py` — création, affichage, `parser_case`
- `navires.py` — placement, `flotte`
- `tirs.py` — `executer_tir`, messages
- `jeu.py` — `main()`

Pour apprendre, un fichier unique de 200–400 lignes bien découpé en **fonctions** va très bien.

## 2. Deux joueurs sur le même ordinateur

1. **Joueur 1** place sa flotte (sans que J2 ne regarde — honneur, ou `input("Appuie sur Entrée quand J2 a le dos tourné")`).
2. **Joueur 2** place la sienne.
3. Boucle : afficher le **radar** du joueur actuel (pas sa défense, sauf mode debug), demander une case, appliquer le tir sur la grille **adverse**, annoncer touché / manqué / coulé, tester `tous_coules`.
4. **Changer de joueur** (sauf si tu appliques la règle « rejoue après touché »).

```python
def main_deux_humains():
    g1 = nouvelle_grille_defense()
    g2 = nouvelle_grille_defense()
    r1 = nouvelle_grille_radar()
    r2 = nouvelle_grille_radar()

    print("=== Placement Joueur 1 ===")
    f1 = placement_joueur(g1)  # à implémenter : saisie ou aléatoire
    print("=== Placement Joueur 2 ===")
    f2 = placement_joueur(g2)

    joueur = 1
    while True:
        if joueur == 1:
            defense_adverse, radar_local, flotte_adverse = g2, r1, f2
        else:
            defense_adverse, radar_local, flotte_adverse = g1, r2, f1

        afficher_grille_lettres(radar_local, f"Radar J{joueur}")
        case_txt = input(f"J{joueur}, ta cible (ex. D5) ? ")
        ligne, col = parser_case(case_txt)
        # ... executer_tir, messages coulé, tester tous_coules(flotte_adverse)
        # ... victoire -> print et return

        joueur = 3 - joueur  # alterne 1 <-> 2
```

Adapte les noms de fonctions à ce que tu as écrit dans les articles précédents.

## 3. « Cacher » la grille entre les tours

Au terminal, on ne peut pas forcer l’écran comme sur une console système partout ; astuces possibles :

- plusieurs `print("\n" * 40)` pour faire défiler ;
- sous Windows **PowerShell** / cmd, `os.system("cls")` ; sous Mac/Linux `os.system("clear")` — à utiliser avec modération (moins portable).

```python
import os

def effacer_ecran():
    os.system("cls" if os.name == "nt" else "clear")
```

## 4. Variante : une IA « aveugle » aléatoire

L’ordinateur tire sur des cases **`?`** au hasard jusqu’à toucher — sans stratégie. Suffisant pour tester ton moteur :

```python
import random

def tir_ia(radar_ia):
    inconnues = [(i, j) for i in range(TAILLE) for j in range(TAILLE) if radar_ia[i][j] == "?"]
    return random.choice(inconnues)
```

Une IA un peu plus maline pourrait, après un touché, viser les cases **voisines** encore `?` : bon exercice supplémentaire.

## 5. Gestion des erreurs de saisie

Entoure `parser_case` et `int(input())` avec des **`try` / `except`** ([erreurs et débogage](/python-erreurs-debogage/)) : redemander une case tant que la saisie est invalide ou déjà jouée.

## 6. Idées d’extension

- Sauvegarder une partie dans un fichier ([fichiers texte](/python-fichiers-texte/)).
- Statistiques : nombre de coups, temps (module `time`).
- Mode **solo** : placement aléatoire de la flotte ennemie + IA.

## Check-list finale

- [ ] 17 cases `#` par joueur au départ (5+4+3+3+2).
- [ ] Impossible de tirer deux fois sur la même case radar.
- [ ] Messages cohérents : manqué, touché, coulé, victoire.
- [ ] Code découpé en fonctions testables une par une.

Bravo pour le parcours **Bataille navale** : tu peux revenir au [sommaire de la série](/programmation/bataille-navale/) ou au [parcours Python](/programmation/python/) pour réviser une notion précise.

## Script complet du chapitre

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Bataille navale — Chapitre 6/6 : partie complete 2 joueurs (placement + tirs).
Lancer : python bataille_chapitre_06.py
"""

import os
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


def effacer_ecran():
    os.system("cls" if os.name == "nt" else "clear")


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
            raise RuntimeError("Placement aleatoire impossible.")
    return flotte


def placement_joueur(grille, nom_joueur):
    flotte = []
    for L in LONGUEURS_NAVIRES:
        while True:
            afficher_grille_lettres(grille, f"{nom_joueur} — navire longueur {L}")
            try:
                case = input("Case de depart (ex. A1) ? ").strip()
                li, co = parser_case(case)
                ori = input("Orientation H (horizontal) ou V (vertical) ? ").strip().upper()
                horizontal = not ori.startswith("V")
                coords = essayer_placer(grille, li, co, L, horizontal)
                if coords:
                    flotte.append(coords)
                    break
                print("Impossible : hors grille, chevauchement ou navire trop long.")
            except ValueError as e:
                print("Saisie invalide :", e)
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


def navire_coule(grille_defense, coords_navire):
    for ligne, col in coords_navire:
        if grille_defense[ligne][col] != TOUCHE:
            return False
    return True


def navire_contenant(flotte, ligne, col):
    for navire in flotte:
        if (ligne, col) in navire:
            return navire
    return None


def tous_coules(grille_defense, flotte):
    for navire in flotte:
        if not navire_coule(grille_defense, navire):
            return False
    return True


def message_apres_tir(grille_defense, flotte, ligne, col, code):
    if code != "touche":
        return code
    nav = navire_contenant(flotte, ligne, col)
    if nav is None:
        return "touche"
    if navire_coule(grille_defense, nav):
        return "coule"
    return "touche"


def main_deux_humains():
    random.seed()
    print("1 = Placement manuel   2 = Placement aleatoire pour les deux")
    mode = input("Mode ? ").strip()
    g1, g2 = nouvelle_grille_defense(), nouvelle_grille_defense()
    r1, r2 = nouvelle_grille_radar(), nouvelle_grille_radar()
    if mode == "2":
        f1, f2 = placement_aleatoire(g1), placement_aleatoire(g2)
        print("Flottes placees au hasard (chacun ne voit pas l'autre).")
    else:
        input("Joueur 1 — appuie sur Entree quand c'est a toi (Joueur 2 ne regarde pas).")
        effacer_ecran()
        f1 = placement_joueur(g1, "Joueur 1")
        input("Joueur 1 termine. Joueur 2 — appuie sur Entree (Joueur 1 ne regarde pas).")
        effacer_ecran()
        f2 = placement_joueur(g2, "Joueur 2")
        effacer_ecran()

    joueur = 1
    while True:
        if joueur == 1:
            defense_adv, radar_local, flotte_adv = g2, r1, f2
            nom = "Joueur 1"
        else:
            defense_adv, radar_local, flotte_adv = g1, r2, f1
            nom = "Joueur 2"

        afficher_grille_lettres(radar_local, f"Radar — {nom}")
        case_txt = input(f"{nom}, cible (ex. D5), vide pour quitter ? ").strip()
        if not case_txt:
            print("Partie abandonnee.")
            return
        try:
            li, co = parser_case(case_txt)
        except ValueError as e:
            print(e)
            continue
        code = executer_tir(defense_adv, radar_local, li, co)
        if code == "deja":
            print("Case deja jouee.")
            continue
        if code == "incoherent":
            print("Erreur interne — reessaie.")
            continue
        msg = message_apres_tir(defense_adv, flotte_adv, li, co, code)
        if msg == "manque":
            print("Manque.")
        elif msg == "touche":
            print("Touche !")
        elif msg == "coule":
            print("Touche coule !")
        if tous_coules(defense_adv, flotte_adv):
            afficher_grille_lettres(radar_local, f"Radar — {nom}")
            print(f"{nom} a gagne — toute la flotte adverse est coulee !")
            return
        joueur = 3 - joueur


if __name__ == "__main__":
    main_deux_humains()
```

## Télécharger ce chapitre

**[bataille_chapitre_06.py](/downloads/bataille-navale/bataille_chapitre_06.py)** — pense aussi à télécharger les chapitres précédents si tu compares la progression.

## Amazon (partenaire)

- [Projets Python — jeux et applications](https://www.amazon.fr/s?k=python+projets+jeux+livre&tag=manuso06-21)
