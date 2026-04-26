---
title: "Projet Python : bataille navale (5/6) — coulé, victoire et fin de partie"
headline: "Projet Python : Bataille Navale (5/6) – Couler les Bateaux et Gagner"
description: "Condition de victoire en Python : savoir si un navire est coulé, tester la flotte entière, terminer le jeu. Projet bataille navale complet côté règles."
pubDate: 2026-03-29
updatedDate: 2026-04-18
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Bataille navale
seriesOrder: 5
tags: ["Python", "Programmation", "Projet", "débutant", "jeu", "conditions"]
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
  - question: "Comment terminer un jeu Python avec une condition de victoire ?"
    answer: "On définit un critère clair (ici : tous les navires de la flotte adverse sont coulés), on le teste après chaque action importante (un tir), et on sort d’une boucle while ou on affiche le gagnant quand la condition est vraie."
  - question: "Comment savoir si un bateau est coulé en Python sur une grille ?"
    answer: "Si chaque case du navire est enregistrée comme touchée (par exemple symbole X sur la grille défense), le navire est coulé : il suffit de parcourir la liste des coordonnées du bateau et de vérifier que toutes les cases valent ce symbole."
  - question: "Comment compter les éléments d’une grille Python pour une victoire ?"
    answer: "Soit on parcourt la structure flotte (liste de navires, chaque navire = liste de cases), soit on compte les symboles sur la grille selon les besoins. Pour la bataille navale, le plus fiable est de réutiliser la flotte du placement et de tester chaque navire avec une fonction est_coule."
  - question: "C’est quoi la dernière étape du tutoriel bataille navale ?"
    answer: "La logique coulé et victoire est dans cet article (partie 5). La partie 6 assemble la boucle de jeu complète au terminal (alternance des joueurs, menu), pour un projet jouable de bout en bout."
---

Tu as enchaîné [grille](/python-bataille-navale-2-grille-et-affichage/), [placement](/python-bataille-navale-3-placement-bateaux/) et [tirs](/python-bataille-navale-4-tirs-et-marques/) : il manque la **couche finale** qui transforme des échanges de coups en **vrai jeu** — *touché / coulé* et **condition de victoire**. Cet article répond à : *comment terminer mon jeu Python avec une condition de victoire ?*

**Ce que tu obtiens ici** : une logique **complète côté règles** (savoir si un navire est **coulé**, si **toute la flotte** est détruite), du **code réutilisable**, et un sentiment clair de **projet abouti**. La [partie 6 — jeu complet au terminal](/python-bataille-navale-6-jeu-complet/) enchaîne avec la **boucle de partie** (menu, deux joueurs, rythme de jeu) : la série compte **six volets** ; ce cinquième **boucle la mécanique « qui gagne ? »** avant l’assemblage final.

Le jeu se **termine** lorsque **tous les bateaux** d’un camp sont **coulés** — autrement dit, chaque case de chaque navire adverse a été **touchée**.

**Prérequis** : [partie 4](/python-bataille-navale-4-tirs-et-marques/) (symboles `X`, `o`, radar). [Cahier des charges](/python-bataille-navale-1-cahier-des-charges/) pour la flotte 5–4–3–3–2.

![Console Python](../../assets/programmation/python-terminal.svg)

<div class="article-toc" role="navigation" aria-label="Sommaire de l’article">
<p class="article-toc-title">Sommaire</p>
<ul>
<li><a href="#1-quand-un-bateau-est-il-coulé-">1. Quand un bateau est-il coulé ?</a></li>
<li><a href="#2-vérifier-si-un-bateau-est-coulé">2. Vérifier si un bateau est coulé</a></li>
<li><a href="#3-quel-navire-vient-dêtre-touché-">3. Quel navire vient d’être touché ?</a></li>
<li><a href="#4-touché-coulé-et-message-au-joueur">4. Touché, coulé et message au joueur</a></li>
<li><a href="#5-condition-de-victoire--partie-terminée">5. Condition de victoire : partie terminée</a></li>
<li><a href="#6-aller-plus-loin--améliorations">6. Aller plus loin : améliorations</a></li>
<li><a href="#7-exercices">7. Exercices</a></li>
<li><a href="#8-résumé">8. Résumé</a></li>
<li><a href="#9-suite--partie-6">9. Suite — partie 6</a></li>
<li><a href="#10-script-complet-du-chapitre">10. Script complet du chapitre</a></li>
<li><a href="#11-télécharger-ce-chapitre">11. Télécharger ce chapitre</a></li>
</ul>
</div>

## 1. Quand un bateau est-il coulé ?

Un **navire** occupe **plusieurs cases** alignées (voir [partie 3](/python-bataille-navale-3-placement-bateaux/)). Après les tirs ([partie 4](/python-bataille-navale-4-tirs-et-marques/)), chaque case touchée est marquée **`X`** sur la **grille défense**.

Un bateau est **coulé** lorsque **toutes** ses cases ont été **touchées** — toutes affichent alors **`X`**. Tant qu’il reste au moins une case du navire sur **`#`** (non touchée) ou que la logique n’a pas encore mis à jour la dernière case, le navire n’est pas coulé.

Pour le programme, tu disposes de la **liste des coordonnées** de chaque navire (`positions_bateau` ou entrée dans `flotte`) : il suffit de **vérifier la grille** pour ces cases uniquement — pas besoin de **compter** toute la grille pour savoir si *un* bateau est coulé.

## 2. Vérifier si un bateau est coulé

Approche minimale : pour chaque case du navire, la grille doit contenir le symbole **touché** (ici `"X"`, comme défini en partie 4).

```python
def est_coule(grille, positions_bateau):
    for (x, y) in positions_bateau:
        if grille[x][y] != "X":
            return False
    return True
```

**Convention d’indices** : dans ce tutoriel, le premier indice est la **ligne**, le second la **colonne** — les couples `(x, y)` correspondent à `(ligne, colonne)`, cohérent avec `grille[ligne][colonne]`. En production, utilise une **constante** `TOUCHE = "X"` au lieu du littéral pour une seule source de vérité.

```python
TOUCHE = "X"

def est_coule(grille, positions_bateau):
    for ligne, col in positions_bateau:
        if grille[ligne][col] != TOUCHE:
            return False
    return True
```

C’est le même principe que **compter** des cases « gagnantes » sur une sous-liste de coordonnées : tu **parcours** les éléments attendus et tu **testes** une **condition** à chaque fois — typique d’un **projet Python jeu** avec **logique conditionnelle** claire.

## 3. Quel navire vient d’être touché ?

Après un tir **touché** sur `(ligne, col)`, il faut savoir **quel** navire de la `flotte` contient cette case pour appeler `est_coule` sur **ce** navire seulement :

```python
def navire_contenant(flotte, ligne, col):
    for navire in flotte:
        if (ligne, col) in navire:
            return navire
    return None
```

La structure `flotte` est la **liste des navires** issue du [placement](/python-bataille-navale-3-placement-bateaux/) : chaque `navire` est une liste de tuples `(ligne, colonne)`.

## 4. Touché, coulé et message au joueur

Une fois le tir appliqué sur la grille, si le code retour de ton [tir](/python-bataille-navale-4-tirs-et-marques/) est **touché**, tu peux annoncer **coulé** si `est_coule` est vrai pour le navire concerné :

```python
def message_apres_tir(grille_defense, flotte, ligne, col, code_tir):
    if code_tir != "touche":
        return code_tir
    nav = navire_contenant(flotte, ligne, col)
    if nav is None:
        return "touche"
    if est_coule(grille_defense, nav):
        return "coule"
    return "touche"
```

En français oral : « Touché ! » puis éventuellement « Coulé ! » — **satisfaction** nette pour le joueur.

## 5. Condition de victoire : partie terminée

La **victoire** du tireur : **tous** les navires de la flotte adverse sont **coulés**. On teste chaque navire avec `est_coule` :

```python
def tous_coules(grille_defense, flotte):
    for navire in flotte:
        if not est_coule(grille_defense, navire):
            return False
    return True
```

Dès que `tous_coules` est vrai pour **ta** flotte, l’**adversaire** a **gagné**. Dans ta **boucle de jeu** ([partie 6](/python-bataille-navale-6-jeu-complet/)), tu pourras écrire :

```python
if tous_coules(grille_defense_joueur_1, flotte_joueur_1):
    print("Joueur 2 a gagné !")
    break
```

C’est la **condition de victoire** classique d’un **jeu Python** : un **booléen** qui résume « la partie est-elle finie ? ».

**Optimisation (optionnelle)** : pour de très grosses flottes, un **compteur** de cases touchées par navire peut éviter de tout parcourir ; pour cinq navires sur 10×10, la boucle sur la `flotte` reste **simple et suffisante**.

## 6. Aller plus loin : améliorations

- **IA** : tir aléatoire puis ciblage des voisins après un touché (stratégie simple).
- **Règles** : espacement obligatoire entre navires, temps limite, historique des tirs dans un **fichier** ([fichiers texte](/python-fichiers-texte/)).
- **Qualité** : petits **tests** sur `est_coule` et `tous_coules` avec grilles construites à la main ([tests](/python-inter-tests-qualite/) — niveau intermédiaire).
- **Interface** : tout garder en **fonctions** courtes pour préparer une future **classe** `Joueur` / `Partie` si tu poursuis en programmation orientée objet ([POO](/python-inter-poo-classes/)).

## 7. Exercices

1. Sur une grille **5×5**, une flotte réduite à **un** navire de **2** cases ; simule des tirs jusqu’à **`est_coule` vrai**.
2. Écris `nombre_navires_coules(grille, flotte)` qui retourne un entier entre **0** et **5**.
3. Après chaque tir touché, affiche **uniquement** « Coulé ! » la **première fois** que le navire entier est détruit (évite les répétitions si tu re-touches une case déjà `X` — en principe [partie 4](/python-bataille-navale-4-tirs-et-marques/) interdit de rejouer une case).

## 8. Résumé

| Élément | Contenu |
|---------|---------|
| **Coulé** | Toutes les cases du navire = **`X`** sur la défense |
| **Code clé** | `est_coule`, `navire_contenant`, `tous_coules` |
| **Victoire** | `tous_coules` sur la flotte adverse |
| **Projet** | **Projet Python complet** côté **règles** ; boucle finale en [partie 6](/python-bataille-navale-6-jeu-complet/) |

## 9. Suite — partie 6

Assembler **menu**, **alternance des joueurs** et **boucle** jusqu’à victoire : [Partie 6 — jeu complet au terminal](/python-bataille-navale-6-jeu-complet/).

## 10. Script complet du chapitre

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Bataille navale — Chapitre 5/6 : coulé et victoire (démo aléatoire).
Lancer : python bataille_chapitre_05.py
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


def demo_coule():
    random.seed(42)
    g = nouvelle_grille_defense()
    flotte = placement_aleatoire(g)
    r = nouvelle_grille_radar()
    for _ in range(80):
        if tous_coules(g, flotte):
            print("Toute la flotte est coulée.")
            break
        li = random.randrange(TAILLE)
        co = random.randrange(TAILLE)
        if r[li][co] != RADAR_INCONNU:
            continue
        code = executer_tir(g, r, li, co)
        msg = message_apres_tir(g, flotte, li, co, code)
        if code == "touche":
            print(lettre_ligne(li) + str(co + 1), "->", msg)
        if msg == "coule":
            print(">>> Un navire est coulé !")
    afficher_grille_lettres(r, "Radar fin de démo")


def main():
    demo_coule()


if __name__ == "__main__":
    main()
```

## 11. Télécharger ce chapitre

**[bataille_chapitre_05.py](/downloads/bataille-navale/bataille_chapitre_05.py)**

## Amazon (partenaire)

- [Structures de données Python](https://www.amazon.fr/s?k=structures+de+donn%C3%A9es+python&tag=manuso06-21)
