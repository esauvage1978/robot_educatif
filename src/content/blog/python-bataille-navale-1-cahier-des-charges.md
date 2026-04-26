---
title: "Projet Python : bataille navale (1/6) — cahier des charges"
headline: "Projet Python : Créer une Bataille Navale (1/6) – Cahier des Charges"
description: "Apprendre Python avec un projet : cahier des charges d’une bataille navale en console. Règles, données, architecture et feuille de route de la série tutorielle."
pubDate: 2026-03-29
updatedDate: 2026-04-18
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Bataille navale
seriesOrder: 1
tags: ["Python", "Programmation", "Projet", "débutant", "jeu"]
relatedLinks:
  - title: "Sommaire — série Bataille navale"
    href: "/programmation/bataille-navale/"
  - title: "Partie 2 — grille et affichage"
    href: "/python-bataille-navale-2-grille-et-affichage/"
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
  - question: "Comment apprendre Python avec un projet ?"
    answer: "Choisir un projet guidé (jeu console, petit outil), poser un cahier des charges court, coder par petites étapes testables, et s’appuyer sur un tutoriel série comme la bataille navale : chaque article ajoute une brique (grille, bateaux, tirs, victoire, boucle de jeu)."
  - question: "Quel projet Python pour débutant ?"
    answer: "Les jeux au terminal (pendu, puissance 4, bataille navale) enseignent listes, boucles et conditions avec un résultat visible. La série bataille navale part d’un niveau « listes et bases » et monte progressivement jusqu’au jeu complet."
  - question: "Combien de temps pour coder une bataille navale en Python ?"
    answer: "En suivant la série article par article, compter plusieurs séances (quelques heures au total) selon le rythme : le cahier des charges prend peu de code ; la majeure partie du temps va à la grille, au placement, aux tirs et à l’assemblage final."
  - question: "Python est-il adapté aux débutants ?"
    answer: "Oui : syntaxe lisible, exécution interactive possible, grande communauté. Pour un premier projet, éviter trop de bibliothèques externes et privilégier la logique (structures de données, fonctions) comme dans cette série console."
---

Apprendre **Python** uniquement sur des **exercices déconnectés**, c’est souvent **décourageant** : on maîtrise la syntaxe sans voir **l’usage**. La solution la plus efficace pour beaucoup de débutants : un **projet concret**, découpé en **étapes**, avec des **tests** à chaque fois.

Ce premier volet pose le **cahier des charges** d’une **bataille navale** jouable au **terminal** — et annonce une **série complète** sur ce site (**six articles**, du cahier des charges au **jeu complet** avec boucle de partie). Le jeu consiste à **deviner la position des navires** sur une grille ; l’objectif est de **couler toute la flotte adverse** avant la sienne.

**Prérequis utiles** : à l’aise avec les [listes](/python-listes-et-chaines/) et les bases du [parcours Python](/programmation/python/) (`input`, boucles, fonctions). Les [fichiers](/python-fichiers-texte/) restent optionnels pour une sauvegarde plus tard.

![Console Python](../../assets/programmation/python-terminal.svg)

<div class="article-toc" role="navigation" aria-label="Sommaire de l’article">
<p class="article-toc-title">Sommaire</p>
<ul>
<li><a href="#1-pourquoi-apprendre-python-avec-un-projet-">1. Pourquoi apprendre Python avec un projet ?</a></li>
<li><a href="#2-présentation-du-jeu--bataille-navale">2. Présentation du jeu : bataille navale</a></li>
<li><a href="#3-cahier-des-charges">3. Cahier des charges</a></li>
<li><a href="#4-architecture-du-code-fichiers-et-modularité">4. Architecture du code (fichiers et modularité)</a></li>
<li><a href="#5-roadmap-de-la-série-6-parties">5. Roadmap de la série (6 parties)</a></li>
<li><a href="#6-maillage--la-suite-du-tutoriel">6. Maillage : la suite du tutoriel</a></li>
<li><a href="#7-résumé">7. Résumé</a></li>
<li><a href="#8-faq">8. FAQ</a></li>
<li><a href="#9-bonus--schéma-checklist-erreurs">9. Bonus : schéma, checklist, erreurs</a></li>
</ul>
</div>

## 1. Pourquoi apprendre Python avec un projet ?

- **Apprentissage actif** : on pose un objectif (afficher une grille, valider un tir), puis on cherche la **bonne structure** de données — pas l’inverse.
- **Logique algorithmique** : conditions, boucles, découpage en **fonctions** deviennent **nécessaires**, pas scolaires.
- **Motivation** : un jeu **jouable** à la fin de la série donne une **preuve visible** de progression.

Des projets comme la **bataille navale** sont classiques en **pédagogie informatique** : règles simples à énoncer, mais assez riches pour toucher **tableaux 2D**, **coordonnées** et **états** (touché, coulé, victoire).

## 2. Présentation du jeu : bataille navale

Jeu **classique** à deux joueurs (dans notre série : **deux humains** au terminal, avec possibilité d’**IA** abordée plus tard) :

- Une **grille** (ici **10 × 10**), des **navires** occupant **plusieurs cases alignées** (horizontal ou vertical).
- Chaque joueur **place** sa flotte (selon les règles retenues), puis les joueurs **annoncent des cases** à bombarder : **à l’eau**, **touché**, ou **coulé** lorsque **toutes** les cases d’un navire sont touchées.
- **Tirs alternés** (dans la version complète) jusqu’à ce que **tous** les navires d’un camp soient coulés — **victoire** du joueur adverse.

Pour le code, on fixe dès maintenant des **règles claires** (modifiables ensuite) :

- Grille **10 × 10** (indices de ligne et colonne **0 à 9** dans le code ; on pourra afficher **A1–J10** pour l’humain — voir [partie 2](/python-bataille-navale-2-grille-et-affichage/)).
- Cinq navires, longueurs **5, 4, 3, 3, 2** cases.
- Navires **en ligne droite**, **horizontaux** ou **verticaux**, **sans chevauchement**. Pour débuter, on **autorise le contact côte à côte** (plus simple qu’une case d’eau obligatoire entre bateaux — règle à ajouter plus tard si besoin).

## 3. Cahier des charges

### Objectif du projet

Créer un **jeu jouable en Python** en **console** (phase 1), avec un **code lisible**, découpé en **fonctions** et, plus tard, une **boucle de partie** claire.

### Fonctionnalités principales (MVP → jeu complet)

| Phase | Contenu |
|-------|---------|
| **MVP** | Grille 10×10 ; **placement** des bateaux (ici **aléatoire** pour l’ordinateur dans les volets suivants, ou manuel selon version) ; **saisie d’un tir** ; réponse **touché / à l’eau / coulé** ; **fin** quand une flotte est entièrement coulée. |
| **Affichage** | Deux logiques de grille : **défense** (mes bateaux + tirs reçus) et **radar** (ce que je sais chez l’adversaire) — détaillé dès la [partie 2](/python-bataille-navale-2-grille-et-affichage/). |

### Logique et données attendues

- **Coordonnées** : une case = **paire** `(ligne, colonne)` — équivalent **(y, x)** si l’on compte les lignes comme ordonnées. Toujours **la même convention** dans tout le projet.
- **Structures** : **liste de listes** pour les grilles 2D ; **liste de coordonnées** par navire pour savoir rapidement si un bateau est **coulé** (voir [parties 4–5](/python-bataille-navale-4-tirs-et-marques/) et [coulé / victoire](/python-bataille-navale-5-coule-et-victoire/)).
- **Symboles** (convention du projet) :

| Symbole | Grille défense (mes bateaux) |
|---------|------------------------------|
| `.` | eau vide |
| `#` | navire **non touché** |
| `X` | navire **touché** |
| `o` | tir adverse dans l’**eau** |

| Symbole | Grille radar (renseignements sur l’ennemi) |
|---------|-------------------------------------------|
| `?` | case non jouée |
| `O` | tir **manqué** |
| `X` | tir **touché** |

### Contraintes techniques

- **Python 3**, **sans bibliothèque lourde** au début (pas de Pygame dans cette série : tout est **terminal**).
- **Code structuré** : constantes en tête ou fichier dédié, **fonctions courtes**, noms explicites.
- **Évolutivité** : une version ultérieure pourrait introduire des **classes** (`Navire`, `Grille`) ; ici on commence **procédural** pour rester pédagogique.

Exemple de **mémoire d’un navire** (liste de tuples) :

```python
torpilleur = [(2, 3), (3, 3)]
flotte = [
    [(0, 0), (0, 1), (0, 2), (0, 3), (0, 4)],  # longueur 5
    # ... autres bateaux
]
```

## 4. Architecture du code (fichiers et modularité)

Dès le début, **anticiper** la forme du dépôt évite le « tout dans un fichier de 800 lignes » :

- **`main.py`** (ou `bataille.py`) : point d’entrée, boucle de jeu — surtout à partir de la [partie 6](/python-bataille-navale-6-jeu-complet/).
- **Constantes** (`TAILLE`, longueurs des navires, symboles) : regroupées pour **une seule source de vérité**.
- **Fonctions** par responsabilité : créer une grille, afficher, convertir coordonnées, placer un navire, appliquer un tir, tester victoire.

Plus tard : **modules** (`grille.py`, `bateaux.py`, …) si le projet grossit ; **classes** si tu veux modéliser explicitement **Navire** et **Joueur** — option avancée, pas requise pour finir la série.

## 5. Roadmap de la série (6 parties)

| Étape | Article | Contenu principal |
|-------|---------|-------------------|
| **1** | **Cet article** | Cahier des charges, règles, données, constantes |
| **2** | [Grille et affichage](/python-bataille-navale-2-grille-et-affichage/) | Grille 10×10, affichage terminal, **A1 → indices** |
| **3** | [Placement des bateaux](/python-bataille-navale-3-placement-bateaux/) | Valider placements, aléatoire ou saisie |
| **4** | [Tirs et marques](/python-bataille-navale-4-tirs-et-marques/) | Lire un tir, mettre à jour défense et radar |
| **5** | [Coulé et victoire](/python-bataille-navale-5-coule-et-victoire/) | Détecter **coulé**, condition de **fin** |
| **6** | [Jeu complet au terminal](/python-bataille-navale-6-jeu-complet/) | Boucle principale, tours, variante **IA** simple |

Index de la série : [programmation — Bataille navale](/programmation/bataille-navale/).

## 6. Maillage : la suite du tutoriel

À lire dans l’ordre après ce cahier des charges :

1. [Partie 2 — Grille et affichage](/python-bataille-navale-2-grille-et-affichage/)
2. [Partie 3 — Placement des navires](/python-bataille-navale-3-placement-bateaux/)
3. [Partie 4 — Tirs et marques](/python-bataille-navale-4-tirs-et-marques/)
4. [Partie 5 — Coulé et victoire](/python-bataille-navale-5-coule-et-victoire/)
5. [Partie 6 — Jeu complet au terminal](/python-bataille-navale-6-jeu-complet/)

Articles voisins sur le même principe « projet guidé » : [Le pendu en Python](/python-pendu-1-cahier-mot-masque/), [Puissance 4](/python-puissance-4-1-cahier-grille/).

## 7. Résumé

Format **synthétique** :

| Élément | Contenu |
|---------|---------|
| **Projet** | Bataille navale **console** en Python |
| **Objectif** | Deux grilles par joueur, tirs, états touché/coulé, victoire |
| **Fonctionnalités clés** | Grille 10×10, flotte 5–4–3–3–2, symboles défense/radar, boucle de jeu en fin de série |
| **Étapes** | Cahier des charges → **grille** → **placement** → **tirs** → **coulé/victoire** → **jeu complet** |

## 8. FAQ

### Comment apprendre Python avec un projet ?

En **découpant** le projet (comme ce cahier des charges), en **codant petit**, en **vérifiant** après chaque étape (taille de grille, un tir, etc.), et en suivant une **série** cohérente plutôt que des extraits décousus.

### Quel projet Python débutant ?

Un **jeu texte** ou **console** : règles claires, peu de dépendances. Cette **bataille navale** est adaptée dès que les **listes** et les **boucles** sont comprises.

### Combien de temps pour coder un jeu ?

Variable : quelques **séances** pour la série complète ; le présent article est surtout de la **conception** — le volume de code augmente surtout à partir de la [partie 2](/python-bataille-navale-2-grille-et-affichage/).

### Python est-il adapté aux débutants ?

Oui : lecture facile, exécution ligne à ligne possible, documentation abondante. L’important est de **pratiquer** sur un objectif **concret**.

---

## 9. Bonus : schéma, checklist, erreurs

### Schéma logique (vue d’ensemble)

```text
[Démarrer]
    → initialiser grilles / constantes
    → placer la flotte (chaque camp)
    → répéter :
          saisir coordonnées de tir
          mettre à jour états (eau / touché / coulé)
          si flotte adverse entièrement coulée → victoire
    → fin
```

### Checklist « cahier des charges validé »

- [ ] Taille de grille et **longueurs** des navires **fixées** et **partagées** dans le code.
- [ ] Convention **(ligne, colonne)** tenue partout.
- [ ] Distinction **grille défense** / **grille radar** comprise.
- [ ] Symboles **documentés** (éviter le mélange `o` / `O` / `0`).
- [ ] Prochaine étape claire : ouvrir la [partie 2](/python-bataille-navale-2-grille-et-affichage/).

### Erreurs fréquentes chez les débutants

- **Trop de fonctionnalités** avant d’afficher une grille vide correctement.
- **Coordonnées inversées** (ligne/colonne) entre saisie et tableau — d’où l’intérêt de la [conversion A1–J10](/python-bataille-navale-2-grille-et-affichage/).
- **Un seul tableau** pour tout mélanger : séparer **défense** et **radar** dès le début.
- **Copier-coller** sans comprendre : chaque article de la série doit laisser un **petit test** manuel au terminal.

---

## Script du chapitre 1 (grilles vides + vérifications)

Tu peux déjà valider **constant**es et **création** de grilles avant la suite :

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Bataille navale — Chapitre 1/6 : constantes et grilles vides (vérification).
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

**[Télécharger bataille_chapitre_01.py](/downloads/bataille-navale/bataille_chapitre_01.py)** — même contenu que le bloc ci-dessus.

### Ressources complémentaires (Amazon — partenaire)

Liens **recherche** pour prolonger hors série (Comparer éditions et avis) :

- [Livre Python débutant projets](https://www.amazon.fr/s?k=livre+Python+d%C3%A9butant+projets&tag=manuso06-21)
- [Python jeux et exercices](https://www.amazon.fr/s?k=python+jeux+exercices+livre&tag=manuso06-21)

*Commission possible sur achats éligibles — sans surcoût pour l’acheteur.*
