---
title: "Bataille navale en Python (2/6) — grille et affichage"
description: "Créer une grille 10×10, afficher avec en-têtes, convertir A1–J10 en indices et l’inverse."
pubDate: 2026-03-29
updatedDate: 2026-03-28
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Bataille navale
seriesOrder: 2
tags: ["Python", "Programmation", "Projet"]
relatedLinks:
  - title: "Partie 1 — cahier des charges"
    href: "/python-bataille-navale-1-cahier-des-charges/"
  - title: "Partie 3 — placement des navires"
    href: "/python-bataille-navale-3-placement-bateaux/"
---

Tu continues le [projet bataille navale](/programmation/bataille-navale/) après la [partie 1](/python-bataille-navale-1-cahier-des-charges/) : cette fois, tout le « moteur d’affichage » minimal pour **voir** les grilles dans le terminal.

![Console Python](../../assets/programmation/python-terminal.svg)

## 1. Créer une grille vide

Une ligne = une liste de `TAILLE` caractères ; la grille = `TAILLE` lignes.

```python
TAILLE = 10
VIDE = "."

def nouvelle_grille_defense():
    return [[VIDE for _ in range(TAILLE)] for _ in range(TAILLE)]

def nouvelle_grille_radar():
    return [["?" for _ in range(TAILLE)] for _ in range(TAILLE)]
```

## 2. Afficher avec des numéros de colonnes

Pour s’y retrouver, on affiche souvent **1–10** en haut et **A–J** à gauche (ou l’inverse). Exemple compact : colonnes numérotées, lignes numérotées `0–9` au début (tu pourras passer aux lettres ensuite).

```python
def afficher_grille(grille, titre="Grille"):
    print(titre)
    print("   " + " ".join(str(c + 1) for c in range(TAILLE)))
    for i, ligne in enumerate(grille):
        print(f"{i:2} " + " ".join(cell for cell in ligne))
```

Pour un rendu « bataille navale papier », remplace l’indice de ligne `i` par une lettre :

```python
def lettre_ligne(i):
    return chr(ord("A") + i)

def afficher_grille_lettres(grille, titre="Grille"):
    print(titre)
    print("    " + " ".join(str(c + 1) for c in range(TAILLE)))
    for i, ligne in enumerate(grille):
        print(f"{lettre_ligne(i):2}  " + "  ".join(cell for cell in ligne))
```

## 3. Parser une saisie du type `B7`

L’utilisateur tape souvent **une lettre** (ligne) et **un nombre** (colonne, souvent 1-based).

```python
def parser_case(texte):
    texte = texte.strip().upper().replace(" ", "")
    if len(texte) < 2:
        raise ValueError("Trop court (ex. B7)")
    lettre = texte[0]
    chiffres = texte[1:]
    if not ("A" <= lettre <= "J"):
        raise ValueError("Ligne A–J")
    ligne = ord(lettre) - ord("A")
    colonne = int(chiffres) - 1  # 1..10 -> 0..9
    if not (0 <= colonne < TAILLE):
        raise ValueError("Colonne 1–10")
    return ligne, colonne
```

**Attention** : si ta grille fait autre chose que 10×10, adapte la plage de lettres (`A` + `TAILLE - 1`).

## 4. Indices → texte (pour les messages)

```python
def case_vers_texte(ligne, colonne):
    return f"{lettre_ligne(ligne)}{colonne + 1}"
```

## 5. Exercices

1. Affiche une grille radar **entièrement** `?` avec `afficher_grille_lettres`.
2. Demande une case avec `input`, utilise `parser_case`, affiche « Tu as visé la ligne … colonne … ».
3. Place **manuellement** (dans le code) trois `#` sur une grille défense et affiche-la : vérifie l’alignement visuel.

## Piège fréquent

Confondre **colonne 0** en Python et **colonne 1** pour le joueur : garde **une seule convention** (ici : interne `0–9`, affichage `1–10`).

## Suite

[Partie 3 — Placer les navires sans chevauchement](/python-bataille-navale-3-placement-bateaux/).

## Script complet du chapitre

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Bataille navale — Chapitre 2/6 : affichage et parser A1–J10.
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
    afficher_grille_lettres(nouvelle_grille_defense(), "Defense (eau)")
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

## Télécharger ce chapitre

**[bataille_chapitre_02.py](/downloads/bataille-navale/bataille_chapitre_02.py)**

## Amazon (partenaire)

- [Algorithmique débutant + Python](https://www.amazon.fr/s?k=algorithmique+python+d%C3%A9butant&tag=manuso06-21)
