---
title: "Python — fonctions (def, return, paramètres)"
description: "def, arguments, return et None ; paramètres par défaut ; portée locale ; découper un script en petites fonctions claires."
pubDate: 2026-03-28
updatedDate: 2026-03-27
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Python
seriesOrder: 6
tags: ["Python", "Programmation"]
relatedLinks:
  - title: "Leçon 5 — boucles"
    href: "/python-boucles-for-while/"
  - title: "Leçon 7 — listes et chaînes"
    href: "/python-listes-et-chaines/"
---

Une **fonction** regroupe des instructions sous un **nom**. Tu l’**appelles** quand tu en as besoin, avec des **arguments** si nécessaire. C’est la base pour éviter de **copier-coller** le même code et pour tester des petits morceaux isolément.

## 1. Définition minimale avec `return`

```python
def carre(x):
    return x * x

print(carre(5))   # 25
```

- **`def`** suivi du nom et des parenthèses (paramètres).
- Deux-points **`:`** et corps **indenté**.
- **`return`** envoie une valeur à l’appelant ; sans `return` explicite, Python renvoie **`None`** (« rien »).

```python
def dire_bonjour():
    print("Bonjour !")

dire_bonjour()   # affiche seulement, ne « retourne » pas de valeur utile pour un calcul
```

## 2. Plusieurs paramètres

```python
def hypotenuse(a, b):
    return (a * a + b * b) ** 0.5

print(hypotenuse(3, 4))   # 5.0
```

L’ordre des arguments à l’appel correspond à l’ordre de la définition.

## 3. Paramètres par défaut

Utile pour une **valeur habituelle** tout en permettant de la changer :

```python
def saluer(nom, titre="M."):
    print(f"Bonjour {titre} {nom}")

saluer("Dupont")
saluer("Martin", "Mme")
```

Les paramètres **avec** défaut doivent venir **après** ceux **sans** défaut dans la définition.

## 4. Portée des variables (idée simple)

Une variable **créée à l’intérieur** d’une fonction est surtout visible **dans** cette fonction (on dit qu’elle est **locale**). Une variable définie **au niveau du fichier** peut être **lue** dans une fonction, mais la **modifier** proprement demande le mot-clé `global` (hors programme de début : évite au début et passe plutôt des **arguments** et un **return**).

## 5. Documenter en une ligne (bon réflexe)

```python
def aire_rectangle(largeur, hauteur):
    """Retourne l'aire d'un rectangle."""
    return largeur * hauteur
```

Une courte **docstring** aide ton toi du futur (et les enseignants qui lisent ton code).

## Exercices

1. Écris **`aire_rectangle(largeur, hauteur)`** qui **retourne** l’aire (pas seulement `print`).
2. Écris **`est_pair(n)`** qui retourne **`True`** ou **`False`** (utilise `%` ou pas, comme tu veux).
3. Écris **`minimum(a, b)`** sans appeler la fonction intégrée **`min()`**.
4. Écris **`distance(x1, y1, x2, y2)`** retournant la distance euclidienne entre deux points du plan (même formule que `hypotenuse` sur les différences).
5. Écris **`repeter(texte, fois=3)`** qui affiche `texte` **fois** fois (boucle `for` dans la fonction).

## Suite du parcours

Les [listes et chaînes](/python-listes-et-chaines/) donnent des structures de données à faire circuler entre fonctions (listes de scores, nettoyage de texte, etc.).

## Amazon (partenaire)

- [Python programmation structurée](https://www.amazon.fr/s?k=python+programmation+structur%C3%A9e&tag=manuso06-21)
