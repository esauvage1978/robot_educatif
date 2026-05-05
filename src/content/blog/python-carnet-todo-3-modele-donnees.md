---
title: "Carnet Todo Python (3/6) : modèle de données et opérations CRUD"
headline: "Carnet Todo — fonctions Python pour ajouter, cocher et supprimer des tâches"
description: "ajouter_tache, trouver par id, basculer fait, supprimer ; prochain_id cohérent. Projet python débutant orienté données, avant le menu CLI."
pubDate: 2026-03-29
updatedDate: 2026-04-18
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Carnet Todo
seriesOrder: 3
tags: ["Python", "Programmation", "Projet", "débutant", "JSON"]
relatedLinks:
  - title: "Sommaire — Carnet Todo"
    href: "/programmation/carnet-todo/"
  - title: "Partie 2 — JSON"
    href: "/python-carnet-todo-2-lire-ecrire-json/"
  - title: "Partie 4 — menu CLI"
    href: "/python-carnet-todo-4-menu-cli/"
categories:
  - "Python"
  - "Programmation"
  - "Carnet Todo"
  - "Projet"
faqSchema:
  - question: "Comment générer un id unique pour chaque nouvelle tâche ?"
    answer: "Conserver un entier prochain_id dans le dictionnaire global, l’utiliser comme id de la nouvelle tâche puis l’incrémenter après ajout dans la liste taches."
  - question: "Faut-il réordonner les id après une suppression ?"
    answer: "Ce tutoriel garde des id croissants sans réutilisation pour simplifier ; réordonner est possible mais complique les références externes aux id."
  - question: "Où brancher le menu utilisateur après ce chapitre ?"
    answer: "Dans la partie 4 : boucle while avec options qui appellent ajouter_tache, basculer_fait et supprimer_tache sur le même dictionnaire chargé depuis le fichier JSON."
---
Tu [charges et sauvegardes](/python-carnet-todo-2-lire-ecrire-json/) le dictionnaire global. Ce chapitre concentre la **logique métier** — le cœur d’un **projet données python** — sans encore polir le menu. Pour la qualité du code à long terme, des références type [**clean code Python**](https://www.amazon.fr/s?k=clean+code+python+livre&tag=manuso06-21) peuvent compléter ce tutoriel (partenaire).

Liens utiles : [fonctions](/python-fonctions/), [listes et chaînes](/python-listes-et-chaines/), [sommaire Carnet Todo](/programmation/carnet-todo/).

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

## Résultat attendu

Tu disposes de **fonctions testables** qui modifient le même `data` que tu chargeras depuis le JSON : prêt pour le [menu CLI](/python-carnet-todo-4-menu-cli/). Compare avec un jeu logique comme le [Puissance 4](/programmation/puissance-4/) : ici la complexité est dans les **structures** et la **cohérence des id**.

## Suite

**Étape suivante :** [menu en ligne de commande (boucle while)](/python-carnet-todo-4-menu-cli/).  
**Sommaire :** [Carnet Todo — page pilier](/programmation/carnet-todo/).

## Matériel recommandé (partenaire Amazon)

- [Clean code / bonnes pratiques Python](https://www.amazon.fr/s?k=clean+code+python+livre&tag=manuso06-21)
- [Python orienté objet — bases](https://www.amazon.fr/s?k=python+poo+livre+d%C3%A9butant&tag=manuso06-21)
