---
title: "Carnet Todo Python (2/6) : json.load, json.dump et UTF-8"
headline: "Lire et écrire du JSON en Python — tutoriel carnet Todo"
description: "json python projet débutant : charger un fichier absent, sauvegarder avec indent et encoding utf-8 ; pathlib. Série carnet Todo étape par étape."
pubDate: 2026-03-29
updatedDate: 2026-04-18
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Carnet Todo
seriesOrder: 2
tags: ["Python", "Programmation", "Projet", "débutant", "JSON"]
relatedLinks:
  - title: "Sommaire — Carnet Todo"
    href: "/programmation/carnet-todo/"
  - title: "Partie 1 — cahier des charges"
    href: "/python-carnet-todo-1-cahier-json/"
  - title: "Partie 3 — modèle de données"
    href: "/python-carnet-todo-3-modele-donnees/"
categories:
  - "Python"
  - "Programmation"
  - "Carnet Todo"
  - "Projet"
faqSchema:
  - question: "Comment lire un fichier JSON en Python si le fichier n’existe pas ?"
    answer: "Tester l’existence du chemin avec pathlib ou os.path, puis retourner un dictionnaire par défaut avec prochain_id et une liste taches vide avant tout json.load."
  - question: "Quel encodage utiliser pour les fichiers JSON en français ?"
    answer: "UTF-8 à la lecture et à l’écriture pour les accents dans les titres de tâches ; ouvrir avec encoding=utf-8."
  - question: "À quoi sert indent dans json.dump ?"
    answer: "À formater le fichier avec des retours à la ligne et une indentation lisible pour un humain qui ouvre taches.json dans un éditeur."
---
Après le [cahier des charges](/python-carnet-todo-1-cahier-json/), tu passes au **fil du disque** : le module **`json`** convertit entre **texte JSON** et **objets Python** (`dict`, `list`, etc.). C’est l’étape clé de tout **json python projet** sérieux.

Des ouvrages sur [**Python, fichiers et données**](https://www.amazon.fr/s?k=python+donn%C3%A9es+fichiers+livre&tag=manuso06-21) aident à fixer les bonnes habitudes (partenaire). Pense aussi au [parcours Python](/programmation/python/) et à [erreurs et débogage](/python-erreurs-debogage/) pour anticiper les `JSONDecodeError` de la [partie 5](/python-carnet-todo-5-persistance/).

## 1. Charger

```python
import json
from pathlib import Path

def charger(chemin: Path):
    if not chemin.exists():
        return {"prochain_id": 1, "taches": []}
    with chemin.open("r", encoding="utf-8") as f:
        return json.load(f)
```

Si le fichier **n’existe pas**, retourne une structure **vide** prête à l’emploi.

## 2. Sauvegarder

```python
def sauvegarder(chemin: Path, data):
    with chemin.open("w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
```

- **`ensure_ascii=False`** : conserve les **accents** français dans le fichier.
- **`indent=2`** : JSON **lisible** (lignes et retraits).

## 3. Erreurs possibles

- **JSON mal formé** : `json.JSONDecodeError` — tu peux afficher un message et repartir d’une base vide ([try/except](/python-erreurs-debogage/)).
- **Fichier verrouillé** ou disque plein : rare en exercice ; à garder en tête.

## 4. pathlib (optionnel mais propre)

`Path("taches.json")` évite de mélanger les slash Windows/Unix ; `chemin.exists()` est explicite.

## Exercices

1. Crée `test.json` à la main, charge-le et affiche `type(data)`.
2. Sauvegarde un dictionnaire contenant une **liste de nombres** puis rouvre-le.
3. Simule un fichier **vide** : que fait `json.load` ? Entoure avec `try` / `except`.

## Résultat attendu

Tu sais **charger** un JSON existant ou **démarrer** une structure vide, et **réécrire** le fichier de façon lisible. La [partie 3](/python-carnet-todo-3-modele-donnees/) ajoute les **fonctions métier** sur ces données ; le [sommaire Carnet Todo](/programmation/carnet-todo/) relie toutes les étapes.

## Suite

**Étape suivante :** [modèle de données — ajouter une tâche, incrémenter l’id](/python-carnet-todo-3-modele-donnees/).  
**Sommaire :** [Carnet Todo — page pilier](/programmation/carnet-todo/).

## Matériel recommandé (partenaire Amazon)

- [Python — fichiers et données](https://www.amazon.fr/s?k=python+donn%C3%A9es+fichiers+livre&tag=manuso06-21)
- [pathlib et bonnes pratiques](https://www.amazon.fr/s?k=python+pathlib+livre&tag=manuso06-21)
