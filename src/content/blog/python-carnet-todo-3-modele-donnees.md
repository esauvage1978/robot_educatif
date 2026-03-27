---
title: "Carnet Todo en Python (3/6) — modèle de données et opérations"
description: "ajouter_tache, trouver par id, basculer fait, supprimer ; garder prochain_id cohérent."
pubDate: 2026-03-29
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Carnet Todo
seriesOrder: 3
tags: ["Python", "Programmation", "Projet"]
relatedLinks:
  - title: "Partie 2 — JSON"
    href: "/python-carnet-todo-2-lire-ecrire-json/"
  - title: "Partie 4 — menu CLI"
    href: "/python-carnet-todo-4-menu-cli/"
---

Tu [charges et sauvegardes](/python-carnet-todo-2-lire-ecrire-json/) le dictionnaire global. Ce chapitre concentre la **logique métier** sans encore polir le menu.

## 1. Ajouter une tâche

```python
def ajouter_tache(data, titre):
    titre = titre.strip()
    if not titre:
        return False
    tid = data["prochain_id"]
    data["taches"].append({"id": tid, "titre": titre, "fait": False})
    data["prochain_id"] = tid + 1
    return True
```

## 2. Trouver par id

```python
def trouver_tache(data, tid):
    for t in data["taches"]:
        if t["id"] == tid:
            return t
    return None
```

Compare avec **`==`** sur l’entier `id` (attention : ne nomme pas ta variable `id` pour ne pas masquer la fonction built-in `id()`).

## 3. Basculer « fait »

```python
def basculer_fait(data, tid):
    t = trouver_tache(data, tid)
    if t is None:
        return False
    t["fait"] = not t["fait"]
    return True
```

## 4. Supprimer

```python
def supprimer_tache(data, tid):
    avant = len(data["taches"])
    data["taches"] = [t for t in data["taches"] if t["id"] != tid]
    return len(data["taches"]) < avant
```

Les **id** des tâches restantes ne sont **pas** réutilisés (plus simple) ; `prochain_id` continue de monter.

## Exercices

1. Écris `nombre_taches_actives(data)` : tâches avec `fait` faux.
2. Interdis les titres de plus de **200** caractères.
3. Ajoute une fonction `reordonner_ids` (option avancée) : réattribue 1..n — réfléchis aux risques si un autre fichier référence les anciens id.

## Suite

[Partie 4 — Menu en ligne de commande (boucle while)](/python-carnet-todo-4-menu-cli/).

## Amazon (partenaire)

- [Bonnes pratiques Python](https://www.amazon.fr/s?k=clean+code+python+livre&tag=manuso06-21)
