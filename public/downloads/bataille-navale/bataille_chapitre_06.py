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
