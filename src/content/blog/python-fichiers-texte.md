---
title: "Python — lire et écrire des fichiers texte"
description: "open avec with, modes r / w / a, encoding utf-8, read et readlines, écriture ligne par ligne ; fichier manquant et bonnes habitudes."
pubDate: 2026-03-28
updatedDate: 2026-03-27
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Python
seriesOrder: 8
tags: ["Python", "Programmation"]
relatedLinks:
  - title: "Leçon 7 — listes et chaînes"
    href: "/python-listes-et-chaines/"
  - title: "Leçon 9 — erreurs et débogage"
    href: "/python-erreurs-debogage/"
---

Les **fichiers** permettent de **conserver** des données entre deux exécutions du programme (scores, préférences, journaux). En Python, on ouvre un fichier avec **`open`**, mais la forme recommandée est le bloc **`with`** : le fichier est **fermé automatiquement**, même si une erreur survient au milieu.

## 1. Où se trouve le fichier ?

Par défaut, Python cherche le fichier **dans le répertoire de travail** (souvent le dossier où tu lances `python script.py`). Pour les premiers exercices, mets le `.txt` **à côté** de ton script ou indique un chemin clair.

## 2. Lire tout le contenu

```python
with open("notes.txt", "r", encoding="utf-8") as f:
    contenu = f.read()
print(contenu)
```

- **`"r"`** : lecture (*read*).
- **`encoding="utf-8"`** : accents et caractères spéciaux corrects (habitude à prendre dès le début).

## 3. Lire ligne par ligne

```python
with open("notes.txt", "r", encoding="utf-8") as f:
    for ligne in f:
        print(ligne.strip())
```

Ou `lignes = f.readlines()` pour obtenir une **liste** de chaînes (souvent avec `\n` en fin : pense à `strip()`).

## 4. Écrire (écraser ou créer)

```python
with open("sortie.txt", "w", encoding="utf-8") as f:
    f.write("ligne 1\n")
    f.write("ligne 2\n")
```

**`"w"`** : le fichier est **recréé** (contenu précédent perdu). Pour **ajouter** à la fin sans tout effacer, utilise **`"a"`** (*append*) :

```python
with open("invites.txt", "a", encoding="utf-8") as f:
    f.write("Nouveau prénom\n")
```

## 5. Fichier introuvable

Si le nom est faux ou le fichier absent, Python lève **`FileNotFoundError`**. Tu pourras intercepter cette erreur avec **`try` / `except`** ([leçon 9](/python-erreurs-debogage/)).

## Exercices

1. Crée manuellement **`data.txt`** avec **trois lignes** de texte ; écris un script qui affiche le **nombre de lignes**.
2. **Copie** `data.txt` vers **`copie.txt`** en lisant puis en écrivant (une seule grande chaîne ou ligne par ligne).
3. Demande un **prénom** et **ajoute-le** à la fin de **`invites.txt`** en mode **`"a"`** (lance plusieurs fois pour voir le fichier grossir).
4. Écris un script qui lit un fichier et affiche la **longueur totale** du texte (`len` sur `read()`).
5. Crée **`journal.txt`** avec deux entrées datées à la main, puis un script qui **affiche uniquement** la dernière ligne (indices ou boucle avec mémorisation de la dernière ligne lue).

## Suite du parcours

Gérer proprement les **erreurs** ([leçon 9](/python-erreurs-debogage/)) évite que ton programme plante brutalement si un fichier manque ou si la conversion d’un nombre échoue.

## Amazon (partenaire)

- [Python fichiers données CSV](https://www.amazon.fr/s?k=python+donn%C3%A9es+fichiers+livre&tag=manuso06-21)
