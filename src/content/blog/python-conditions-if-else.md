---
title: "Python — conditions (if, elif, else)"
description: "Comparer des valeurs, and / or / not, blocs indentés, enchaîner if / elif / else et cas pratiques (note, parité, menus)."
pubDate: 2026-03-28
updatedDate: 2026-03-27
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Python
seriesOrder: 4
tags: ["Python", "Programmation"]
relatedLinks:
  - title: "Leçon 3 — types et saisie"
    href: "/python-types-et-saisie/"
  - title: "Leçon 5 — boucles for et while"
    href: "/python-boucles-for-while/"
---

Les **conditions** choisissent quelle partie du programme s’exécute. En Python, un bloc qui dépend d’un `if` est reconnaissable à **l’indentation** (généralement **4 espaces**) : pas d’accolades `{}` comme en C ou Java.

Tu t’appuies sur les conversions vues en [leçon 3](/python-types-et-saisie/) (`int(input(...))`, etc.) pour comparer des nombres saisis au clavier.

## 1. Comparaisons et opérateurs logiques

**Comparaisons** : `==` (égal), `!=` (différent), `<`, `>`, `<=`, `>=`.

**Combiner** des tests :

- **`and`** : les deux doivent être vrais.
- **`or`** : au moins un vrai.
- **`not`** : inverse le résultat.

```python
age = 14
if 10 <= age <= 18:   # forme pratique « entre » en Python
    print("Collège / lycée")
```

## 2. `if` / `else`

```python
note = int(input("Note sur 20 ? "))
if note >= 10:
    print("Validé")
else:
    print("À retravailler")
```

Le **`:`** après la condition est obligatoire. La ligne suivante **doit** être indentée.

## 3. Enchaîner avec `elif`

Python teste les conditions **dans l’ordre** et exécute le **premier** bloc dont la condition est vraie. Pense à couvrir le cas « reste » avec un **`else`** final si besoin.

```python
note = int(input("Note /20 ? "))
if note >= 16:
    mention = "Très bien"
elif note >= 14:
    mention = "Bien"
elif note >= 12:
    mention = "Assez bien"
elif note >= 10:
    mention = "Passable"
else:
    mention = "Insuffisant"
print(f"Mention : {mention}")
```

Si plusieurs `if` se suivent **sans** `elif`, **plusieurs** blocs pourraient s’exécuter ; avec `elif`, un seul bloc « gagne ».

## 4. « Vrai » ou « faux » implicites

Une valeur « vide » peut servir de condition :

```python
texte = input("Pseudo (Entrée = anonyme) ? ").strip()
if not texte:
    texte = "Invité"
print(f"Bonjour {texte}")
```

(`not texte` est vrai pour `""`, mais attention : `not "0"` est faux car la chaîne n’est pas vide.)

## 5. Imbrications (aperçu)

Tu peux mettre un `if` **dans** un autre : garde l’indentation cohérente. Pour des cas complexes, les [fonctions](/python-fonctions/) (leçon 6) aideront à découper le code.

## Exercices

1. Demande un **entier** et affiche s’il est **pair** ou **impair** (`n % 2 == 0`).
2. **Plus ou moins (une fois)** : l’utilisateur propose un nombre entre 1 et 100 ; compare à un **secret** fixe dans le code (ex. `42`) et affiche `trop petit`, `trop grand` ou `gagné`.
3. Demande une **chaîne** : si elle est vide après `strip()`, affiche un message d’erreur ; sinon affiche `Bienvenue, …`.
4. Demande un **âge** : si `< 0` ou `> 120`, affiche « âge improbable » ; sinon un message adapté mineur / majeur (choisis un seuil, ex. 18).
5. **Menu texte** : affiche « 1 = Salut  2 = Au revoir », demande un choix, affiche le message correspondant ; si le choix n’est ni 1 ni 2, affiche « option inconnue ».

## Suite du parcours

Les [boucles](/python-boucles-for-while/) répètent des actions : par exemple plusieurs essais au « plus ou moins » ou parcourir une liste de notes.

## Amazon (partenaire)

- [Algorithmique et Python débutant](https://www.amazon.fr/s?k=algorithmique+python+d%C3%A9butant&tag=manuso06-21)
