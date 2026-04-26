---
title: "Python bataille navale : jeu complet + code (6/6)"
headline: "Projet Python : Bataille Navale (6/6) – Le Jeu Complet"
description: "Projet Python : bataille navale complète au terminal. Code téléchargeable, 2 joueurs ou IA, grille 10×10, tirs, victoire. Idéal débutants."
pubDate: 2026-03-29
updatedDate: 2026-04-18
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Bataille navale
seriesOrder: 6
tags: ["Python", "Programmation", "Projet", "débutant", "jeu", "terminal"]
relatedLinks:
  - title: "Sommaire — série Bataille navale"
    href: "/programmation/bataille-navale/"
  - title: "Partie 1 — cahier des charges"
    href: "/python-bataille-navale-1-cahier-des-charges/"
  - title: "Partie 2 — grille et affichage"
    href: "/python-bataille-navale-2-grille-et-affichage/"
  - title: "Partie 3 — placement des navires"
    href: "/python-bataille-navale-3-placement-bateaux/"
  - title: "Partie 4 — tirs et marques"
    href: "/python-bataille-navale-4-tirs-et-marques/"
  - title: "Partie 5 — coulé et victoire"
    href: "/python-bataille-navale-5-coule-et-victoire/"
  - title: "Parcours Python (bases)"
    href: "/programmation/python/"
categories:
  - "Python"
  - "Programmation"
  - "Bataille navale"
  - "Projet"
faqSchema:
  - question: "Comment créer un jeu complet en Python ?"
    answer: "Découper le jeu en briques (données, affichage, règles, boucle), coder chaque partie en fonctions testables, puis assembler une fonction main() qui enchaîne placement et tours jusqu’à une condition de victoire — comme dans ce tutoriel bataille navale en un fichier."
  - question: "Combien de temps pour coder un petit jeu en Python ?"
    answer: "Pour un jeu console comme la bataille navale, compter de quelques heures à plusieurs séances selon le niveau : la série en six articles permet d’y arriver étape par étape sans tout coder d’un bloc."
  - question: "Python est-il adapté aux jeux ?"
    answer: "Oui pour les jeux texte, la logique et les prototypes : Python est lisible et rapide à faire évoluer. Les jeux vidéo temps réel lourds utilisent souvent d’autres outils, mais pour apprendre la programmation avec un projet, Python convient très bien."
  - question: "Comment améliorer son projet Python une fois le jeu fonctionnel ?"
    answer: "Ajouter une IA plus maline, une interface graphique (Tkinter, Pygame), des tests automatisés, une sauvegarde de partie, ou séparer le code en plusieurs modules — la fin de cet article liste des pistes concrètes."
---

Tu as suivi la série **[bataille navale](/programmation/bataille-navale/)** depuis le [cahier des charges](/python-bataille-navale-1-cahier-des-charges/) jusqu’au [coulé et à la victoire](/python-bataille-navale-5-coule-et-victoire/) : ce dernier volet **assemble tout** — **grille**, **placement**, **tirs**, **messages**, **fin de partie** — dans un **programme unique** que tu peux **lancer tout de suite**.

**Projet terminé** : tu disposes d’un **exemple de projet Python complet** (jeu en console), **structuré par fonctions**, avec **trois modes** (deux humains manuel ou aléatoire, **solo contre une IA** au tir aléatoire). Le but du jeu : **trouver et couler tous les navires** adverses sur une grille **10×10** ; la partie **s’arrête** lorsque **toute la flotte adverse** est **coulée** ([partie 5](/python-bataille-navale-5-coule-et-victoire/)).

Ce qui suit : **rappel** des briques, **code source complet** (identique au fichier téléchargeable), **découpage pédagogique**, **lancement**, **bilan**, **idées d’évolution** (gameplay, adversaire automatique, interface), **maillage** vers les articles précédents, **synthèse du projet**, **checklist** et **défis**.

![Console Python](../../assets/programmation/python-terminal.svg)

<div class="article-toc" role="navigation" aria-label="Sommaire de l’article">
<p class="article-toc-title">Sommaire</p>
<ul>
<li><a href="#1-récap-du-projet">1. Récap du projet</a></li>
<li><a href="#2-code-python-complet">2. Code Python complet</a></li>
<li><a href="#3-explication-du-code">3. Explication du code</a></li>
<li><a href="#4-comment-lancer-le-jeu">4. Comment lancer le jeu</a></li>
<li><a href="#5-ce-que-vous-avez-appris">5. Ce que vous avez appris</a></li>
<li><a href="#6-améliorations-possibles">6. Améliorations possibles</a></li>
<li><a href="#7-maillage-interne--la-série">7. Maillage interne — la série</a></li>
<li><a href="#8-synthèse-du-projet">8. Synthèse du projet</a></li>
<li><a href="#9-bonus--checklist-et-défis">9. Bonus : checklist et défis</a></li>
<li><a href="#10-télécharger-le-projet">10. Télécharger le projet</a></li>
</ul>
</div>

## 1. Récap du projet

| Brique | Rôle | Détail dans la série |
|--------|------|----------------------|
| **Grille 10×10** | Représenter l’eau, les bateaux, les tirs | [Partie 2](/python-bataille-navale-2-grille-et-affichage/) |
| **Placement** | Flotte 5–4–3–3–2, sans chevauchement | [Partie 3](/python-bataille-navale-3-placement-bateaux/) |
| **Tirs** | Radar + défense, touché / à l’eau | [Partie 4](/python-bataille-navale-4-tirs-et-marques/) |
| **Coulé & victoire** | Navire entier touché, flotte détruite | [Partie 5](/python-bataille-navale-5-coule-et-victoire/) |

Ici, tout est **branché** dans une **`main()`** : choix du mode, **boucle** de tours, test **`tous_coules`**, message de **victoire**.

## 2. Code Python complet

Le fichier ci-dessous est **autonome** (un seul `.py`), **commenté par blocs**, et **aligné** sur le téléchargement. Tu peux le **copier-coller** dans `bataille_chapitre_06.py` ou utiliser le lien en fin d’article.

```python
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

```

## 3. Explication du code

### Grille et affichage

`nouvelle_grille_defense` et `nouvelle_grille_radar` créent des **listes 2D** ; `afficher_grille_lettres` imprime colonnes **1–10** et lignes **A–J**. `parser_case` convertit une saisie du type **`D5`** en indices **`(ligne, colonne)`** pour indexer `grille[ligne][colonne]`.

### Placement

`placement_aleatoire` et `placement_joueur` remplissent la grille avec **`#`** et renvoient une **`flotte`** (liste de navires, chaque navire = liste de coordonnées). `essayer_placer` garantit **bords** et **pas de chevauchement**.

### Tirs

`executer_tir` met à jour **la défense cible** et **le radar du tireur** ; il refuse une case **déjà jouée** sur le radar.

### Victoire

`est_coule`, `navire_contenant`, `message_apres_tir` et `tous_coules` implémentent la logique des [parties 4 et 5](/python-bataille-navale-4-tirs-et-marques/). La **boucle principale** s’arrête dès **`tous_coules(defense_adverse, flotte_adverse)`**.

### Boucle principale

`main_deux_humains` alterne les joueurs **`1`** et **`2`** (`joueur = 3 - joueur`). `partie_contre_ia` enchaîne **ton** tir puis un tir **`tir_ia_aleatoire`** sur une case encore **`?`** sur le radar de l’IA.

## 4. Comment lancer le jeu

1. **Installer Python** (3.8 ou plus récent) depuis [python.org](https://www.python.org/downloads/) et cocher *« Add Python to PATH »* sous Windows si besoin.
2. Enregistrer le script sous `bataille_chapitre_06.py` (ou télécharger le fichier fourni).
3. Ouvrir un **terminal** dans le dossier du fichier :
   - `python bataille_chapitre_06.py`  
   ou `py bataille_chapitre_06.py` selon ton installation.
4. Choisir un **mode** au menu, puis suivre les invites (**cases** type `A1`, **orientation** `H` / `V` en placement manuel).

**À deux sur le même PC** : en placement manuel, faire tourner l’écran ou utiliser `effacer_ecran()` entre les joueurs pour préserver le **fair-play**.

## 5. Ce que vous avez appris

- **Listes 2D** : modéliser un plateau case par case.
- **Conditions** : eau, navire, déjà joué, victoire.
- **Boucles** : tours de jeu, re-tentatives de saisie.
- **Fonctions** : une responsabilité par fonction, code plus facile à **réutiliser** et à **déboguer** ([erreurs et débogage](/python-erreurs-debogage/)).
- **Logique de jeu** : règles claires + données (`flotte`) + état (`grille`).

Tu passes de **lecteur** à **développeur** : tu peux **modifier** une règle, **tracer** des `print`, ou **extraire** un module sans repartir de zéro.

## 6. Améliorations possibles

### Gameplay

- **Double vue** : afficher côte à côte radar + rappel des tirs reçus sur ta défense.
- **Règle « rejoue après touché »** : ne pas changer de joueur tant que le tir touche ([partie 4](/python-bataille-navale-4-tirs-et-marques/)).
- **Chrono** ou **compteur de coups** avec le module `time`.

### IA

- Tir **aléatoire** (déjà présent pour l’ordinateur en mode 3).
- Après un **touché**, limiter les tirs aux **cases voisines** encore inconnues — bon exercice sur listes et ensembles.

### Interface

- **Tkinter** (bibliothèque standard) : boutons pour les cases, fenêtres pour chaque joueur.
- **Pygame** : affichage graphique plus riche pour un **projet portfolio**.

Les projets avancés combinent souvent **logique métier** (comme ici) et **interface** ou **IA** plus élaborée — la base reste la même.

## 7. Maillage interne — la série

1. [Partie 1 — Cahier des charges](/python-bataille-navale-1-cahier-des-charges/)
2. [Partie 2 — Grille et affichage](/python-bataille-navale-2-grille-et-affichage/)
3. [Partie 3 — Placement des navires](/python-bataille-navale-3-placement-bateaux/)
4. [Partie 4 — Tirs et marques](/python-bataille-navale-4-tirs-et-marques/)
5. [Partie 5 — Coulé et victoire](/python-bataille-navale-5-coule-et-victoire/)
6. **Cet article** — jeu complet

Index : [Programmation — bataille navale](/programmation/bataille-navale/). Pour aller plus loin sur Python : [parcours Python](/programmation/python/).

## 8. Synthèse du projet

- **Projet** : jeu de **bataille navale** en **console**, Python 3.
- **Concepts** : **grille 2D**, **flotte** (listes de coordonnées), **tirs** (défense + radar), **conditions** de **coulé** et **victoire**, **boucle** principale, **modes** 2 joueurs / **IA aléatoire**.
- **Résultat** : **fichier unique** exécutable, **fonctions** séparées par thème (affichage, placement, tirs, fin de partie).
- **Objectif pédagogique** : **exemple de projet Python complet** pour **débutants** et **intermédiaires** débutants.

## 9. Bonus : checklist et défis

**Checklist « projet terminé »**

- [ ] Les **cinq** navires sont bien **placés** (17 cases `#` par camp).
- [ ] Impossible de **tirer deux fois** sur la même case (radar).
- [ ] Messages : à l’eau, touché, touché coulé, victoire.
- [ ] Tu sais **où modifier** la flotte, la taille de grille ou une règle.

**Défis supplémentaires**

- **Multijoueur réseau** : deux processus ou sockets (niveau avancé).
- **IA** : chasse en spirale ou probabilités sur les cases restantes.
- **Sauvegarde** : écrire l’état dans un fichier ([fichiers texte](/python-fichiers-texte/)).

## 10. Télécharger le projet

**[bataille_chapitre_06.py](/downloads/bataille-navale/bataille_chapitre_06.py)** — même contenu que le bloc de code ci-dessus.

## Amazon (partenaire)

- [Projets Python — jeux et pratique](https://www.amazon.fr/s?k=python+projets+jeux+livre&tag=manuso06-21)
- [Robotique et STEM — kits pour prolonger la logique « projet »](https://www.amazon.fr/s?k=kit+robotique+STEM+enfant&tag=manuso06-21)
