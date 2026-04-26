#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Bataille navale — jeu complet au terminal (série tutoriel 6/6).
Lancer : python bataille_chapitre_06.py

Modes :
  1 — Deux joueurs, placement manuel des flottes
  2 — Deux joueurs, placement aléatoire (rapide)
  3 — Solo : vous vs IA (placement et tirs aléatoires pour l’ordinateur)
"""

import os
import random

# ---------------------------------------------------------------------------
# Constantes (une seule source de vérité pour symboles et tailles)
# ---------------------------------------------------------------------------
TAILLE = 10
VIDE = "."
NAVIRE = "#"
TOUCHE = "X"
MANQUE_DEFENSE = "o"
RADAR_INCONNU = "?"
RADAR_MANQUE = "O"
RADAR_TOUCHE = "X"
LONGUEURS_NAVIRES = [5, 4, 3, 3, 2]


# ---------------------------------------------------------------------------
# Affichage et saisie
# ---------------------------------------------------------------------------
def effacer_ecran():
    """Efface le terminal (Windows : cls, Unix : clear)."""
    os.system("cls" if os.name == "nt" else "clear")


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


# ---------------------------------------------------------------------------
# Grilles
# ---------------------------------------------------------------------------
def nouvelle_grille_defense():
    return [[VIDE for _ in range(TAILLE)] for _ in range(TAILLE)]


def nouvelle_grille_radar():
    return [[RADAR_INCONNU for _ in range(TAILLE)] for _ in range(TAILLE)]


# ---------------------------------------------------------------------------
# Placement des navires
# ---------------------------------------------------------------------------
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


def placement_joueur(grille, nom_joueur):
    flotte = []
    for L in LONGUEURS_NAVIRES:
        while True:
            afficher_grille_lettres(grille, f"{nom_joueur} — navire longueur {L}")
            try:
                case = input("Case de départ (ex. A1) ? ").strip()
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


# ---------------------------------------------------------------------------
# Tirs
# ---------------------------------------------------------------------------
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


# ---------------------------------------------------------------------------
# Coulé et victoire
# ---------------------------------------------------------------------------
def est_coule(grille, positions_bateau):
    for ligne, col in positions_bateau:
        if grille[ligne][col] != TOUCHE:
            return False
    return True


def navire_contenant(flotte, ligne, col):
    for navire in flotte:
        if (ligne, col) in navire:
            return navire
    return None


def tous_coules(grille_defense, flotte):
    for navire in flotte:
        if not est_coule(grille_defense, navire):
            return False
    return True


def message_apres_tir(grille_defense, flotte, ligne, col, code):
    if code != "touche":
        return code
    nav = navire_contenant(flotte, ligne, col)
    if nav is None:
        return "touche"
    if est_coule(grille_defense, nav):
        return "coule"
    return "touche"


def tir_ia_aleatoire(radar_ia):
    """Choisit une case encore inconnue sur le radar de l’IA (mode simple)."""
    inconnues = [
        (i, j)
        for i in range(TAILLE)
        for j in range(TAILLE)
        if radar_ia[i][j] == RADAR_INCONNU
    ]
    return random.choice(inconnues)


# ---------------------------------------------------------------------------
# Boucle : deux humains
# ---------------------------------------------------------------------------
def main_deux_humains(mode_placement):
    random.seed()
    g1, g2 = nouvelle_grille_defense(), nouvelle_grille_defense()
    r1, r2 = nouvelle_grille_radar(), nouvelle_grille_radar()

    if mode_placement == "2":
        f1, f2 = placement_aleatoire(g1), placement_aleatoire(g2)
        print("Flottes placées au hasard (chacun ne voit pas l’autre).")
    else:
        input("Joueur 1 — Entrée quand c’est à toi (Joueur 2 ne regarde pas). ")
        effacer_ecran()
        f1 = placement_joueur(g1, "Joueur 1")
        input("Joueur 1 terminé. Joueur 2 — Entrée (Joueur 1 ne regarde pas). ")
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

        afficher_grille_lettres(radar_local, f"Radar — {nom}")
        case_txt = input(f"{nom}, cible (ex. D5), vide pour quitter ? ").strip()
        if not case_txt:
            print("Partie abandonnée.")
            return
        try:
            li, co = parser_case(case_txt)
        except ValueError as e:
            print(e)
            continue
        code = executer_tir(defense_adv, radar_local, li, co)
        if code == "deja":
            print("Case déjà jouée.")
            continue
        if code == "incoherent":
            print("Erreur interne — réessaie.")
            continue
        msg = message_apres_tir(defense_adv, flotte_adv, li, co, code)
        if msg == "manque":
            print("À l’eau !")
        elif msg == "touche":
            print("Touché !")
        elif msg == "coule":
            print("Touché, coulé !")
        if tous_coules(defense_adv, flotte_adv):
            afficher_grille_lettres(radar_local, f"Radar — {nom}")
            print(f"{nom} a gagné : toute la flotte adverse est coulée !")
            return
        joueur = 3 - joueur


# ---------------------------------------------------------------------------
# Boucle : humain vs IA
# ---------------------------------------------------------------------------
def partie_contre_ia():
    random.seed()
    print("Placement de ta flotte : 1 = manuel, 2 = aléatoire")
    pm = input("? ").strip()
    g_humain, g_ia = nouvelle_grille_defense(), nouvelle_grille_defense()
    r_humain, r_ia = nouvelle_grille_radar(), nouvelle_grille_radar()

    if pm == "2":
        f_h = placement_aleatoire(g_humain)
    else:
        f_h = placement_joueur(g_humain, "Toi")
    effacer_ecran()
    f_ordi = placement_aleatoire(g_ia)
    print("La flotte de l’ordinateur est prête (tu ne la vois pas).")

    # Humain = joueur 1 : tire sur g_ia avec r_humain
    while True:
        afficher_grille_lettres(r_humain, "Ton radar (tirs sur l’ordinateur)")
        case_txt = input("Ta cible (ex. D5), vide pour quitter ? ").strip()
        if not case_txt:
            print("Partie abandonnée.")
            return
        try:
            li, co = parser_case(case_txt)
        except ValueError as e:
            print(e)
            continue
        code = executer_tir(g_ia, r_humain, li, co)
        if code == "deja":
            print("Case déjà jouée.")
            continue
        if code == "incoherent":
            continue
        msg = message_apres_tir(g_ia, f_ordi, li, co, code)
        if msg == "manque":
            print("À l’eau !")
        elif msg == "touche":
            print("Touché !")
        elif msg == "coule":
            print("Touché, coulé !")
        if tous_coules(g_ia, f_ordi):
            print("Tu as gagné !")
            return

        # Tour IA
        li, co = tir_ia_aleatoire(r_ia)
        code = executer_tir(g_humain, r_ia, li, co)
        print(f"L’ordinateur tire en {lettre_ligne(li)}{co + 1} …")
        msg = message_apres_tir(g_humain, f_h, li, co, code)
        if msg == "manque":
            print("L’ordinateur : à l’eau.")
        elif msg == "touche":
            print("L’ordinateur : touché.")
        elif msg == "coule":
            print("L’ordinateur : touché, coulé !")
        if tous_coules(g_humain, f_h):
            print("L’ordinateur a gagné.")
            return


def main():
    print("=== Bataille navale (tutoriel robot-educatif) ===")
    print("1 — Deux joueurs, placement manuel")
    print("2 — Deux joueurs, placement aléatoire")
    print("3 — Solo : toi contre l’ordinateur (IA aléatoire)")
    m = input("Mode ? ").strip()
    if m == "3":
        partie_contre_ia()
    elif m == "2":
        main_deux_humains("2")
    else:
        main_deux_humains("1")


if __name__ == "__main__":
    main()
