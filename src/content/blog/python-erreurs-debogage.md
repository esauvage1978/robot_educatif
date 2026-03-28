---
title: "Python — erreurs, exceptions et débogage"
description: "SyntaxError, TypeError, ValueError ; try / except / else / finally ; lire un traceback ; print de debug et pas à pas dans l’IDE."
pubDate: 2026-03-28
updatedDate: 2026-03-27
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Python
seriesOrder: 9
tags: ["Python", "Programmation"]
relatedLinks:
  - title: "Leçon 8 — fichiers texte"
    href: "/python-fichiers-texte/"
  - title: "Leçon 10 — mini-jeu au terminal"
    href: "/python-mini-jeu-terminal/"
categories:
  - "Python"
  - "Programmation"
  - "Débogage"
  - "Intermédiaire"
---
Un **bug** est un comportement non voulu ; une **exception** est le mécanisme par lequel Python **arrête** une ligne qui échoue et affiche un **traceback**. Savoir **lire** ce message et **entourer** les zones fragiles avec `try` / `except` rend les programmes plus **robustes** — comme pour les [fichiers](/python-fichiers-texte/) manquants ou les **`int(input())`** qui reçoivent du texte invalide.

## 1. Erreurs fréquentes au début

| Type                 | Cause typique                                      |
|----------------------|----------------------------------------------------|
| **SyntaxError**      | `:` ou parenthèse oublié, guillemet mal fermé      |
| **IndentationError** | blocs `if` / `for` mal alignés (mélange onglets / espaces) |
| **TypeError**        | `"3" + 5`, appel de fonction avec mauvais types    |
| **ValueError**       | `int("abc")`, `int("3.5")` si tu voulais un entier |
| **NameError**        | variable utilisée avant affectation, faute de frappe |
| **ZeroDivisionError**| division par zéro                                  |

## 2. `try` / `except` ciblé

```python
try:
    x = int(input("Nombre entier ? "))
except ValueError:
    print("Ce n'est pas un entier valide.")
```

- Attrape **le type d’erreur** que tu sais **traiter** (ici une mauvaise conversion).
- Évite **`except:`** tout seul : tu masquerais n’importe quelle erreur et tu compliquerais le débogage.

Tu peux enchaîner plusieurs blocs **`except ValueError:`**, **`except ZeroDivisionError:`**, etc., pour des messages différents.

## 3. `else` et `finally` (optionnel)

- **`else`** (après `except`) : exécuté si **aucune** exception n’a été levée dans le `try`.
- **`finally`** : exécuté **toujours** (souvent pour libérer une ressource ; avec `with` sur les fichiers, c’est déjà géré).

```python
try:
    n = int(input("Nombre ? "))
except ValueError:
    print("Invalide.")
else:
    print(f"Le double est {2 * n}.")
```

## 4. Lire le traceback

Quand Python plante, le message s’affiche **du bas vers le haut** :

- La **dernière ligne** indique le **type** d’erreur et un court texte.
- Juste au-dessus, la **flèche** `^` pointe souvent la **portion** de ligne problématique.
- Remonte pour voir **quel fichier** et **quelle fonction** enchaînent les appels.

## 5. Déboguer sans honte

- **`print()`** temporaires : afficher les variables suspectes et les retirer une fois corrigé.
- **IDE** (VS Code, Thonny…) : **points d’arrêt**, exécution **pas à pas**, inspection des variables.
- Reproduire le bug avec **le plus petit** script possible.

## Exercices

1. Entoure un **`int(input())`** avec **`try` / `except ValueError`** et **redemande** jusqu’à obtenir un entier valide (boucle `while`).
2. Calcule volontairement **`1 / 0`** dans un `try` et affiche un message clair dans **`except ZeroDivisionError`**.
3. Ouvre un fichier **inexistant** en lecture : observe l’erreur, puis entoure avec **`except FileNotFoundError`** et un message utilisateur.
4. Reprends un petit script de la [leçon 4](/python-conditions-if-else/) et ajoute **deux** `print` de debug pour suivre l’évolution d’une variable avant / après un `if`.
5. Écris une fonction **`demander_entier_positif()`** qui redemande tant que la saisie n’est pas un **entier ≥ 1** (gère `ValueError` et le cas `0` ou négatif avec un message).

## Suite du parcours

Le [mini-jeu « plus ou moins »](/python-mini-jeu-terminal/) assemble boucles, `input`, `random` et un `try` / `except` propre sur la saisie.

## Amazon (partenaire)

- [Bonnes pratiques Python](https://www.amazon.fr/s?k=clean+code+python+livre&tag=manuso06-21)
