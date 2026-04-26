---
title: "Projet Python : bataille navale (2/6) — grille 2D et affichage"
headline: "Projet Python : Bataille Navale (2/6) – Créer la Grille et l’Afficher"
description: "Liste 2D en Python : créer une grille 10×10, afficher une grille au terminal, coordonnées (ligne, colonne). Projet jeu débutant, étape par étape."
pubDate: 2026-03-29
updatedDate: 2026-04-18
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Bataille navale
seriesOrder: 2
tags: ["Python", "Programmation", "Projet", "débutant", "grille 2D"]
relatedLinks:
  - title: "Sommaire — série Bataille navale"
    href: "/programmation/bataille-navale/"
  - title: "Partie 1 — cahier des charges"
    href: "/python-bataille-navale-1-cahier-des-charges/"
  - title: "Partie 3 — placement des navires"
    href: "/python-bataille-navale-3-placement-bateaux/"
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
  - question: "Comment créer une grille 2D en Python ?"
    answer: "On utilise une liste de listes : chaque sous-liste est une ligne, et chaque élément une case. On remplit souvent avec des boucles imbriquées ou une compréhension de liste, par exemple pour une grille 10×10 de points « eau »."
  - question: "Comment afficher une grille Python au terminal ?"
    answer: "Parcourir chaque ligne avec une boucle, construire une chaîne par ligne (souvent avec join), et afficher un en-tête de colonnes 1–10 et des lettres A–J pour les lignes afin de repérer les cases comme sur une grille papier."
  - question: "Ligne ou colonne en premier en Python pour une grille ?"
    answer: "Convention courante : grille[ligne][colonne], indices souvent notés (ligne, colonne) ou (i, j). Le joueur tape souvent une lettre de ligne et un numéro de colonne ; il faut convertir vers des indices 0-based pour indexer la liste."
---

Tu veux **coder un jeu en Python** et tu te demandes : *comment créer une grille et l’afficher ?* Cet article répond concrètement — avec du **code prêt à lancer** — dans la continuité du [cahier des charges](/python-bataille-navale-1-cahier-des-charges/) (**partie 1** de la série [bataille navale](/programmation/bataille-navale/)).

Après avoir fixé les **règles** et la **structure** du projet, la **grille** est la première brique technique : sans elle, pas de placement de navires ni de tirs. Ici, l’objectif est simple : obtenir une **grille 10×10** lisible dans le **terminal**, avec une convention de **coordonnées** claire — base indispensable avant la [partie 3 — placement des navires](/python-bataille-navale-3-placement-bateaux/).

La bataille navale repose sur une **grille 10×10** pour **localiser** les navires : chaque case est identifiée par une **ligne** et une **colonne**, comme sur un plateau.

**Prérequis utiles** : [listes et chaînes](/python-listes-et-chaines/) et bases du [parcours Python](/programmation/python/) (`for`, fonctions). Si besoin, revoir le [mini-jeu au terminal](/python-mini-jeu-terminal/) pour l’habitude d’afficher du texte avec `print`.

![Console Python](../../assets/programmation/python-terminal.svg)

<div class="article-toc" role="navigation" aria-label="Sommaire de l’article">
<p class="article-toc-title">Sommaire</p>
<ul>
<li><a href="#1-comprendre-la-grille-en-python">1. Comprendre la grille en Python</a></li>
<li><a href="#2-créer-une-grille-en-python">2. Créer une grille en Python</a></li>
<li><a href="#3-afficher-la-grille-dans-le-terminal">3. Afficher la grille dans le terminal</a></li>
<li><a href="#4-coordonnées-a1j10-et-indices-python">4. Coordonnées A1–J10 et indices Python</a></li>
<li><a href="#5-exercices-et-pièges">5. Exercices et pièges</a></li>
<li><a href="#6-résumé">6. Résumé</a></li>
<li><a href="#7-suite-de-la-série">7. Suite de la série</a></li>
<li><a href="#8-script-complet-du-chapitre">8. Script complet du chapitre</a></li>
<li><a href="#9-télécharger-ce-chapitre">9. Télécharger ce chapitre</a></li>
</ul>
</div>

## 1. Comprendre la grille en Python

Une **grille 2D** en Python se modélise naturellement par une **liste de listes** : une **liste externe** = les **lignes** ; chaque **sous-liste** = une ligne, et ses éléments = les **colonnes**.

- **`grille[i]`** : la *i*-ème ligne (souvent notée **ligne** ou **row**).
- **`grille[i][j]`** : la case à la ligne *i*, colonne *j* (**colonne** / **column**).

Les **coordonnées** d’une case sont donc le couple **(ligne, colonne)** — en pratique, on manipule souvent des **tuples** `(ligne, colonne)` ou deux variables `i, j` pour rester explicite. C’est la même idée que sur un tableau : d’abord « quelle rangée », puis « quelle position dans la rangée ».

**Indices en Python** : ils commencent à **0**. Pour une grille 10×10, `i` et `j` vont de **0** à **9**. Le joueur, lui, pense souvent en **1–10** pour les colonnes et **A–J** pour les lignes : il faudra **convertir** (voir section 4).

## 2. Créer une grille en Python

Voici une fonction qui construit une **liste 2D** 10×10 remplie de **`"."`** (eau vide), avec des **boucles imbriquées** — très lisible pour un **projet Python débutant** :

```python
def creer_grille():
    grille = []
    for i in range(10):
        ligne = []
        for j in range(10):
            ligne.append(".")
        grille.append(ligne)
    return grille
```

Chaque tour de la boucle **externe** ajoute une **nouvelle ligne** ; la boucle **interne** remplit **10 cases** pour cette ligne. C’est l’**exemple type** d’une **liste 2D** en Python pour un petit **jeu** au terminal.

**Variante compacte** (équivalente) : `[[ "." for j in range(10)] for i in range(10)]`. Les deux approches créent la même structure ; garde celle que tu commentes le plus facilement en cours de projet.

Pour la suite de la série, on pourra nommer les constantes et distinguer **grille défense** (où seront les bateaux) et **grille radar** (ce que l’adversaire voit) :

```python
TAILLE = 10
VIDE = "."

def nouvelle_grille_defense():
    return [[VIDE for _ in range(TAILLE)] for _ in range(TAILLE)]

def nouvelle_grille_radar():
    return [["?" for _ in range(TAILLE)] for _ in range(TAILLE)]
```

## 3. Afficher la grille dans le terminal

**Afficher une grille Python**, c’est afficher **ligne par ligne** : pour chaque ligne, joindre les caractères des cases (souvent avec des espaces pour l’alignement). Pour s’y retrouver comme sur une grille papier, on ajoute :

- des **numéros de colonnes** 1 à 10 en haut ;
- des **lettres** A à J à gauche pour les lignes (optionnel mais très utile pour la bataille navale).

```python
TAILLE = 10

def lettre_ligne(i):
    return chr(ord("A") + i)

def afficher_grille_lettres(grille, titre="Grille"):
    print(titre)
    print("    " + " ".join(str(c + 1) for c in range(TAILLE)))
    for i, ligne in enumerate(grille):
        print(f"{lettre_ligne(i):2}  " + "  ".join(cell for cell in ligne))
```

Tu peux aussi afficher les indices de ligne en **0–9** au début pour débugger, puis passer aux lettres une fois à l’aise.

## 4. Coordonnées A1–J10 et indices Python

Le joueur tape souvent une **lettre** (ligne) et un **nombre** (colonne **1 à 10**). En interne, on convertit vers **`(ligne, colonne)`** en **0–9** pour indexer `grille[ligne][colonne]`.

```python
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

def case_vers_texte(ligne, colonne):
    return f"{lettre_ligne(ligne)}{colonne + 1}"
```

**Piège fréquent** : mélanger **colonne 0** (Python) et **colonne 1** (affichage joueur). Une seule convention côté code : indices **0-based** partout pour les listes ; conversion uniquement à l’**entrée** / **sortie**.

## 5. Exercices et pièges

1. Affiche une grille **radar** entièrement **`?`** avec `afficher_grille_lettres`.
2. Demande une case avec `input`, utilise `parser_case`, affiche les **indices internes** et la **forme** `case_vers_texte`.
3. Place **manuellement** (dans le code) trois `#` sur une grille défense et affiche-la : vérifie l’alignement visuel.

## 6. Résumé

| Élément | Contenu |
|---------|---------|
| **Problème** | Représenter et afficher une **grille 2D** pour un **jeu Python** au terminal |
| **Structure** | **Liste de listes** ; case = `grille[ligne][colonne]` |
| **Coordonnées** | Souvent **`(ligne, colonne)`** ; joueur **A1–J10** → indices **0–9** |
| **Étapes code** | `creer_grille` / constantes → **affichage** avec en-têtes → **parser** les cases |
| **Suite** | [Placement des navires](/python-bataille-navale-3-placement-bateaux/) sur la grille défense |

## 7. Suite de la série

- **Partie 1** : [Cahier des charges](/python-bataille-navale-1-cahier-des-charges/)
- **Partie 3** : [Placer les navires](/python-bataille-navale-3-placement-bateaux/)
- **Partie 4** : [Tirs et marques](/python-bataille-navale-4-tirs-et-marques/)
- **Index** : [Série bataille navale](/programmation/bataille-navale/)

Articles voisins « projet guidé » : [pendu en Python](/python-pendu-1-cahier-mot-masque/), [Puissance 4](/python-puissance-4-1-cahier-grille/).

## 8. Script complet du chapitre

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Bataille navale — Chapitre 2/6 : grille 2D, affichage, parser A1–J10.
Lancer : python bataille_chapitre_02.py
"""

TAILLE = 10
VIDE = "."
RADAR_INCONNU = "?"


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


def case_vers_texte(ligne, colonne):
    return f"{lettre_ligne(ligne)}{colonne + 1}"


def main():
    afficher_grille_lettres(nouvelle_grille_radar(), "Radar (tout inconnu)")
    afficher_grille_lettres(nouvelle_grille_defense(), "Défense (eau)")
    while True:
        txt = input("\nCase (ex. D5), vide pour quitter : ").strip()
        if not txt:
            break
        try:
            li, co = parser_case(txt)
            print("Indices internes : ligne", li, "colonne", co, "=>", case_vers_texte(li, co))
        except ValueError as e:
            print("Erreur :", e)


if __name__ == "__main__":
    main()
```

## 9. Télécharger ce chapitre

**[bataille_chapitre_02.py](/downloads/bataille-navale/bataille_chapitre_02.py)**

## Amazon (partenaire)

- [Algorithmique débutant + Python](https://www.amazon.fr/s?k=algorithmique+python+d%C3%A9butant&tag=manuso06-21)
