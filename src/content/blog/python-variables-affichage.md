---
title: "Python — variables et affichage (print)"
description: "Affectation, noms de variables, print (virgules, concaténation), f-strings et expressions ; pièges courants et exercices."
pubDate: 2026-03-28
updatedDate: 2026-03-28
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Python
seriesOrder: 2
tags: ["Python", "Programmation"]
relatedLinks:
  - title: "Leçon 1 — environnement de développement"
    href: "/python-environnement-developpement/"
  - title: "Leçon 3 — types et saisie"
    href: "/python-types-et-saisie/"
---

Après avoir installé Python et ouvert un éditeur ([leçon 1](/python-environnement-developpement/)), tu passes à la **matière première** des programmes : stocker des informations dans des **variables** et les **afficher** à l’écran. Cette leçon reste volontairement sans `input()` : tout est écrit **dans le code** ; la saisie clavier arrive à la [leçon 3](/python-types-et-saisie/).

![Console Python](../../assets/programmation/python-terminal.svg)

## 1. Qu’est-ce qu’une variable ?

Une **variable** est un **nom** (que tu choisis) associé à une **valeur** en mémoire. En Python, on **affecte** avec le signe `=` : la valeur à droite est stockée sous le nom à gauche.

```python
score = 0
pseudo = "Nova"
```

Tu peux **relire** ou **modifier** la valeur plus tard en réutilisant le même nom :

```python
score = score + 10
print(score)  # 10
```

L’ordre compte : `10 = score` est une **erreur** (on ne peut pas affecter un nombre).

## 2. Bien nommer ses variables

Python accepte des noms faits de **lettres**, **chiffres** et **underscores** `_`, à condition de **ne pas commencer par un chiffre**. Évite les **accents** dans les noms (moins portable, parfois source de confusion).

**Style recommandé** : plusieurs mots en **snake_case** : `annee_naissance`, `vitesse_max`.

**À ne pas faire** : réutiliser un **mot réservé** du langage (`if`, `for`, `print`, `True`…). L’éditeur les colore souvent différemment : si ton nom « cloche », change-le.

## 3. Afficher avec `print`

`print` envoie du texte (et des valeurs) vers la **console** — le terminal ou la fenêtre de sortie de ton IDE.

### Plusieurs valeurs séparées par des virgules

Python insère **un espace** entre chaque élément et ajoute un **saut de ligne** à la fin.

```python
nom = "Lina"
print("Bonjour", nom, "!")   # Bonjour Lina !
```

### Concaténation avec `+` (chaînes uniquement)

Le `+` **colle** deux chaînes **sans espace automatique**. Pense aux espaces dans les guillemets.

```python
print("Bonjour " + nom + " !")
```

Si tu mélanges **nombre** et **texte**, `+` provoque une erreur. Utilise des **virgules** dans `print`, ou convertis avec `str()` :

```python
n = 7
print("La réponse est", n)
print("La réponse est " + str(n))
```

### `sep` et `end` (optionnel)

Tu peux changer le séparateur entre arguments et ce qui est affiché **après** (par défaut : saut de ligne).

```python
print("A", "B", "C", sep=" | ")   # A | B | C
print("Suite...", end="")
print(" même ligne.")
```

## 4. Les f-strings (Python 3.6+)

Une **f-string** est une chaîne précédée de `f` ; les **expressions** entre `{` et `}` sont **évaluées** et insérées dans le texte. C’est le moyen le plus lisible pour construire des messages.

```python
nom = "Lina"
age = 12
print(f"{nom} a {age} ans")
print(f"Dans deux ans, {age + 2} ans.")
```

Tu peux mettre des **calculs** ou des **appels de fonctions** courts dans les accolades (sans en abuser pour garder le code clair).

**Guillemets** : si ta f-string utilise des `"`, tu peux délimiter la chaîne avec `'` pour éviter les conflits, ou échapper — exemple :

```python
msg = f'Il a dit "OK" à {nom}.'
```

## 5. Pièges fréquents

- **`NameError`** : tu utilises un nom **avant** de l’avoir défini, ou tu fais une **faute de frappe** (`scor` au lieu de `score`).
- **Oublier les guillemets** pour du texte : `nom = Lina` cherche une variable `Lina`, pas le prénom.
- **`print` sans parenthèses** en Python 3 : écris bien `print(x)`, pas `print x`.

**Astuce** : ajouter un `print` temporaire (`print("ici", variable)`) pour voir où ton programme en est ; tu affineras avec la leçon sur le **débogage** plus tard dans le parcours.

## 6. Mini-parcours : du début à un petit résumé

```python
# Exemple complet sur une seule exécution
prenom = "Sam"
points = 100
bonus = 25
total = points + bonus

print("Joueur :", prenom)
print(f"Score de base : {points}, bonus : {bonus}")
print(f"Total affiché au classement : {total}")
```

Lance le script avec ton éditeur ou `python fichier.py` et vérifie que les trois lignes s’affichent comme prévu.

## Exercices

1. Crée `prenom`, `ville` et affiche exactement : `Je m'appelle … et j'habite …` (une seule phrase ou deux `print`, comme tu préfères).
2. Définis `annee_naissance`, calcule `age` avec `2026 - annee_naissance` et affiche `Tu as … ans` avec une **f-string**.
3. Affiche le résultat de `7 * 8` **sans** écrire `56` dans le code (utilise une expression dans `print` ou une variable).
4. Affiche trois mots sur **une ligne** avec `sep=" → "` (par ex. `Début → Milieu → Fin`).
5. Crée deux variables numériques `a` et `b`, affiche leur somme et leur produit en deux phrases claires avec des f-strings.

## Suite du parcours

La [leçon 3](/python-types-et-saisie/) introduit les **types** (`int`, `float`, `str`…) et la saisie avec **`input()`** : tu pourras alors personnaliser l’affichage selon ce que l’utilisateur tape.

## Amazon (partenaire)

- [Initiation Python livre](https://www.amazon.fr/s?k=python+initiation+livre&tag=manuso06-21)
