---
title: "Carnet Todo en Python (4/6) — menu en ligne de commande"
headline: "Carnet Todo en Python (4/6) — menu en ligne de commande"
description: "Boucle while True ; options 1–5 ; input utilisateur ; convertir id avec int et gérer ValueError."
pubDate: 2026-03-29
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Carnet Todo
seriesOrder: 4
tags: ["Python", "Programmation", "Projet"]
relatedLinks:
  - title: "Partie 3 — modèle"
    href: "/python-carnet-todo-3-modele-donnees/"
  - title: "Partie 5 — persistance"
    href: "/python-carnet-todo-5-persistance/"
categories:
  - "Python"
  - "Programmation"
  - "Carnet Todo"
  - "Projet"
---
Le [modèle](/python-carnet-todo-3-modele-donnees/) est prêt : il faut une **interface** texte claire qui appelle les bonnes fonctions et **affiche** les retours.

## 1. Afficher la liste

```python
def afficher_liste(data):
    if not data["taches"]:
        print("(Aucune tâche.)")
        return
    for t in data["taches"]:
        case = "[x]" if t["fait"] else "[ ]"
        print(f"{t['id']:3} {case} {t['titre']}")
```

## 2. Menu principal

```python
def menu():
    print("\n--- Todo ---\n1. Lister\n2. Ajouter\n3. Cocher / décocher\n4. Supprimer\n5. Quitter")

def boucle(data, chemin):
    while True:
        menu()
        choix = input("Choix ? ").strip()
        if choix == "1":
            afficher_liste(data)
        elif choix == "2":
            titre = input("Titre ? ")
            if ajouter_tache(data, titre):
                print("Ajouté.")
            else:
                print("Titre vide.")
        elif choix == "3":
            try:
                tid = int(input("Id ? "))
            except ValueError:
                print("Id invalide.")
                continue
            if basculer_fait(data, tid):
                print("Mis à jour.")
            else:
                print("Id introuvable.")
        elif choix == "4":
            try:
                tid = int(input("Id à supprimer ? "))
            except ValueError:
                print("Id invalide.")
                continue
            if supprimer_tache(data, tid):
                print("Supprimé.")
            else:
                print("Id introuvable.")
        elif choix == "5":
            return
        else:
            print("Option inconnue.")
```

La **sauvegarde** arrive à la [partie 5](/python-carnet-todo-5-persistance/) : à chaque modification ou seulement au quit.

## Exercices

1. Ajoute une option **6** : afficher seulement les tâches **non faites**.
2. Raccourcis : accepter `l` pour lister, `q` pour quitter.
3. Après chaque action réussie, rappelle le **chemin** du fichier JSON utilisé.

## Suite

[Partie 5 — Quand sauvegarder : après chaque action ou à la sortie](/python-carnet-todo-5-persistance/).

## Amazon (partenaire)

- [Exercices Python](https://www.amazon.fr/s?k=exercices+python+livre&tag=manuso06-21)
