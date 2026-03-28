---
title: "Carnet Todo en Python (2/6) — lire et écrire du JSON"
description: "json.load et json.dump ; encoding utf-8 ; indent pour lisibilité ; fichier vide ou absent : état par défaut."
pubDate: 2026-03-29
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Carnet Todo
seriesOrder: 2
tags: ["Python", "Programmation", "Projet"]
relatedLinks:
  - title: "Partie 1 — cahier des charges"
    href: "/python-carnet-todo-1-cahier-json/"
  - title: "Partie 3 — modèle de données"
    href: "/python-carnet-todo-3-modele-donnees/"
categories:
  - "Python"
  - "Programmation"
  - "Carnet Todo"
  - "Projet"
---
Le module **`json`** convertit entre **texte JSON** et **objets Python** (`dict`, `list`, `str`, `bool`, `int`, `float`, `None`).

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

## Suite

[Partie 3 — Modèle de données : ajouter une tâche, incrémenter l’id](/python-carnet-todo-3-modele-donnees/).

## Amazon (partenaire)

- [Python fichiers et données](https://www.amazon.fr/s?k=python+donn%C3%A9es+fichiers+livre&tag=manuso06-21)
