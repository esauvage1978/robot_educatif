---
title: "Python — types de base et saisie clavier (input)"
description: "int, float, str, bool ; vérifier un type, convertir sans planter, input() et strip ; erreurs ValueError et exercices."
pubDate: 2026-03-28
updatedDate: 2026-03-27
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Python
seriesOrder: 3
tags: ["Python", "Programmation"]
relatedLinks:
  - title: "Leçon 2 — variables et affichage"
    href: "/python-variables-affichage/"
  - title: "Leçon 4 — conditions if / else"
    href: "/python-conditions-if-else/"
---

Tu sais déjà afficher des variables ([leçon 2](/python-variables-affichage/)). Ici, le programme **réagit** à ce que tape l’utilisateur : tout passe par **`input()`**, qui renvoie **toujours** une chaîne (`str`). Savoir **convertir** proprement vers `int` ou `float` est indispensable avant d’enchaîner avec les [conditions](/python-conditions-if-else/).

![Console Python](../../assets/programmation/python-terminal.svg)

## 1. Les types les plus utiles au début

Python manipule des valeurs de **types** différents. Les quatre premiers à maîtriser :

| Type    | Rôle court              | Exemples        |
|---------|-------------------------|-----------------|
| `int`   | entier                  | `42`, `-3`, `0` |
| `float` | nombre à virgule        | `3.14`, `2.0`   |
| `str`   | texte                   | `"salut"`, `'x'` |
| `bool`  | vrai / faux             | `True`, `False` |

Pour **inspecter** le type en cours d’apprentissage :

```python
x = 10
y = "10"
print(type(x), type(y))  # <class 'int'> <class 'str'>
```

## 2. Conversions explicites

- **`int("42")`** → `42`. Échoue sur `"3.5"` ou `"douze"` → **`ValueError`**.
- **`float("3.5")`** ou **`float("2")`** → nombre décimal.
- **`str(2026)`** → `"2026"` (pour concaténer ou construire un message).

Règle pratique : dès que tu veux **calculer** à partir d’une saisie, convertis après `input()`.

## 3. `input()` : toujours du texte

```python
reponse = input("Un nombre entier ? ")
n = int(reponse)
print(f"Le suivant est {n + 1}")
```

Les espaces avant/après la frappe sont souvent gênants. Beaucoup de scripts commencent par :

```python
texte = input("Ville ? ").strip()
```

`strip()` enlève les espaces (et retours ligne invisibles) en début et fin de chaîne.

## 4. `bool` et comparaisons (aperçu)

Les comparaisons (`==`, `<`, …) produisent déjà un booléen. Tu peux aussi écrire `bool(0)` → `False`, `bool(1)` → `True` (les détails viendront avec la pratique des `if`).

## 5. Piège classique : mélanger texte et calcul

`"3" + "5"` donne `"35"`. Pour une somme :

```python
a = int(input("Premier nombre ? "))
b = int(input("Deuxième nombre ? "))
print(a + b)
```

Si l’utilisateur entre `3.5` alors que tu attendais un `int`, **`int()`** lève une erreur : on verra à la [leçon 9](/python-erreurs-debogage/) comment gérer ça avec `try` / `except`.

## Exercices

1. Demande **deux entiers**, affiche leur **somme** et leur **produit** (deux `print` ou une f-string).
2. Demande un **prénom** et un **âge** (entier), affiche une phrase du type : `Lina a 12 ans` avec une f-string.
3. Demande une température en **°C** en `float`, calcule les **°F** avec `f = c * 9 / 5 + 32` et affiche le résultat arrondi à l’affichage si tu veux (`round(f, 1)`).
4. Demande une chaîne et affiche sa **longueur** avec `len()` (sans conversion : `len` attend déjà une str).
5. Demande un **float** sous forme de texte (`"12.5"`), convertis en `float`, puis affiche le **double** de la valeur.

## Suite du parcours

La [leçon 4](/python-conditions-if-else/) utilise ces conversions pour **tester** des valeurs : pair / impair, menus, notes, etc.

## Amazon (partenaire)

- [Exercices et problèmes Python](https://www.amazon.fr/s?k=exercices+python+livre&tag=manuso06-21)
