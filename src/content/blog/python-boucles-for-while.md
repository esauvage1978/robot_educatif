---
title: "Python — boucles for et while"
description: "range(début, fin, pas), parcourir une chaîne, while avec compteur, break et continue ; quand choisir for ou while."
pubDate: 2026-03-28
updatedDate: 2026-03-27
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Python
seriesOrder: 5
tags: ["Python", "Programmation"]
relatedLinks:
  - title: "Leçon 4 — conditions"
    href: "/python-conditions-if-else/"
  - title: "Leçon 6 — fonctions"
    href: "/python-fonctions/"
categories:
  - "Python"
  - "Programmation"
  - "Tutoriel"
  - "Débutant"
---
Les **boucles** répètent un bloc de code. Après les [conditions](/python-conditions-if-else/), c’est l’outil pour traiter **plusieurs** valeurs, **compter**, ou **réessayer** jusqu’à un bon résultat.

## 1. `for` et `range`

`range(n)` produit les entiers **de 0 à n - 1** :

```python
for i in range(5):
    print(i)   # 0 1 2 3 4
```

**Variantes** :

- `range(debut, fin)` : de `debut` inclus à `fin` **exclu**.
- `range(debut, fin, pas)` : avec un **pas** (positif ou négatif).

```python
for k in range(2, 8, 2):
    print(k)   # 2 4 6

for j in range(10, 0, -1):
    print(j)   # compte à rebours 10 → 1
```

Pour afficher de **1 à 10** inclus : `range(1, 11)`.

## 2. Parcourir une chaîne

Une chaîne est une suite de caractères ; `for lettre in mot:` en affiche un par un :

```python
mot = input("Un mot ? ")
for lettre in mot:
    print(lettre)
```

## 3. `while` : « tant que »

La boucle **continue** tant que la condition reste vraie. Il faut **modifier** quelque chose dans le bloc, sinon boucle **infinie** (à éviter si ce n’est pas voulu).

```python
n = 3
while n > 0:
    print(n)
    n -= 1    # équivalent à n = n - 1
print("Décollage !")
```

## 4. `break` et `continue`

- **`break`** : sort **tout de suite** de la boucle (souvent avec un `if` à l’intérieur).
- **`continue`** : saute le reste du tour **actuel** et repasse au test / à l’itération suivante.

```python
for i in range(10):
    if i == 3:
        continue
    if i == 7:
        break
    print(i)
```

## 5. `for` ou `while` ?

- Tu sais **combien** de tours (ou tu parcours une **liste** / une **chaîne**) → en général **`for`**.
- Tu arrêtes quand un **événement** arrive (bonne réponse, fichier lu, etc.) → souvent **`while`** avec une condition claire, ou **`while True`** + **`break`**.

## Exercices

1. Affiche les **carrés** des entiers de **1 à 10** (`i * i` ou `i ** 2`).
2. Demande un **mot** et affiche chaque **lettre** sur sa propre ligne.
3. **Compte à rebours** : demande un entier **positif** `n`, puis affiche `n, n-1, …, 0` avec un `while`.
4. Avec une boucle `for`, calcule la **somme** des entiers de 1 à 100 (vérifie mentalement : 5050).
5. Demande un **nombre cible** entre 1 et 5 ; avec `while`, redemande **tant que** la saisie n’est pas dans cet intervalle (tu peux utiliser `int(input(...))` et un `try` plus tard ; pour l’instant suppose une saisie valide).

## Suite du parcours

Les [fonctions](/python-fonctions/) permettent de **nommer** un morceau de code réutilisable — par exemple `afficher_carrés(n)` ou `demander_nombre_positif()`.

## Amazon (partenaire)

- [Python 3 exercices corrigés](https://www.amazon.fr/s?k=python+3+exercices+corrig%C3%A9s&tag=manuso06-21)
