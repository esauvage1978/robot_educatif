---
title: "Python — listes et chaînes de caractères"
description: "Indices, slicing, méthodes list et str ; parcourir, modifier une liste ; split, join, strip ; idée de compréhension de liste."
pubDate: 2026-03-28
updatedDate: 2026-03-27
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Python
seriesOrder: 7
tags: ["Python", "Programmation"]
relatedLinks:
  - title: "Leçon 6 — fonctions"
    href: "/python-fonctions/"
  - title: "Leçon 8 — fichiers texte"
    href: "/python-fichiers-texte/"
---

Les **listes** regroupent plusieurs valeurs dans un **ordre** (souvent homogènes : des nombres, des noms…). Les **chaînes** (`str`) se manipulent aussi par **indices** et **tranches**, mais sont **immuables** : une méthode comme `lower()` renvoie une **nouvelle** chaîne plutôt que de « modifier sur place » la variable.

## 1. Listes : indices et tranches

L’index du **premier** élément est **0**. L’index **-1** désigne le **dernier**.

```python
scores = [12, 15, 9]
scores.append(18)
print(scores[0])       # 12
print(scores[-1])      # 18
print(scores[1:3])     # [15, 9] — tranche : indice 1 inclus, 3 exclu
```

**Quelques méthodes utiles** : `append(x)`, `pop()` (retire souvent le dernier), `insert(i, x)`, `len(scores)`.

## 2. Parcourir une liste

Avec une [boucle](/python-boucles-for-while/) :

```python
total = 0
for s in scores:
    total += s
print(total)           # ou directement sum(scores)
```

## 3. Chaînes : nettoyage et découpage

```python
s = "  Robot  "
print(s.strip().lower())       # "robot"
morceaux = "a,b,c".split(",")  # ['a', 'b', 'c']
print("-".join(morceaux))      # a-b-c
```

**Tester une sous-chaîne** : `if "bot" in s:`.

## 4. Inverser une chaîne

Deux approches courantes en début de parcours :

```python
mot = "Python"
print(mot[::-1])    # slicing : pas -1 → ordre inverse
```

Ou une boucle qui construit caractère par caractère.

## 5. Compréhension de liste (aperçu)

Façon compacte de construire une liste à partir d’une autre séquence :

```python
nombres = [1, 2, 3, 4, 5]
carres = [n * n for n in nombres]
```

Tu n’es pas obligé de t’en servir tout de suite ; garde l’idée pour alléger certaines boucles plus tard.

## Exercices

1. Crée une liste de **5 nombres**, affiche leur **somme** (boucle ou `sum()`).
2. Demande une **chaîne** et affiche-la **à l’envers** (`[::-1]` ou boucle).
3. Compte combien de fois la lettre **`e`** apparaît dans une phrase (`.count("e")` ou boucle sur les caractères).
4. À partir de `"pomme,poire,banane"`, obtiens une **liste** de trois fruits puis réaffiche-les séparés par ` | ` avec `join`.
5. Crée une liste de notes sur 20, calcule la **moyenne** (somme / `len`).

## Suite du parcours

Lire et écrire des **fichiers texte** ([leçon 8](/python-fichiers-texte/)) permet de sauver des listes (scores, pseudos) sur le disque.

## Amazon (partenaire)

- [Structures de données Python](https://www.amazon.fr/s?k=structures+de+donn%C3%A9es+python&tag=manuso06-21)
