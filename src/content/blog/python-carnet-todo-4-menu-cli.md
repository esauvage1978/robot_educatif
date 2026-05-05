---
title: "Carnet Todo Python (4/6) : menu CLI — ligne de commande interactive"
headline: "Python ligne de commande — menu todo avec boucle while et input"
description: "Mini application console Python : boucle while, options 1 à 5, gestion ValueError sur les id. Tutoriel carnet Todo étape menu."
pubDate: 2026-03-29
updatedDate: 2026-04-18
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Carnet Todo
seriesOrder: 4
tags: ["Python", "Programmation", "Projet", "débutant", "CLI"]
relatedLinks:
  - title: "Sommaire — Carnet Todo"
    href: "/programmation/carnet-todo/"
  - title: "Partie 3 — modèle"
    href: "/python-carnet-todo-3-modele-donnees/"
  - title: "Partie 5 — persistance"
    href: "/python-carnet-todo-5-persistance/"
categories:
  - "Python"
  - "Programmation"
  - "Carnet Todo"
  - "Projet"
faqSchema:
  - question: "Comment structurer un menu interactif en Python dans le terminal ?"
    answer: "Une boucle while True avec affichage des options, lecture de input, branchement if ou elif sur les choix valides et break ou return pour quitter."
  - question: "Comment éviter un plantage si l’utilisateur saisit du texte à la place d’un nombre ?"
    answer: "Entourer int(input(...)) d’un try sauf ValueError pour redemander l’identifiant ou le choix."
  - question: "La sauvegarde est-elle traitée dans ce chapitre ?"
    answer: "Ce chapitre peut appeler sauvegarder après chaque action ou seulement à la sortie selon ta version ; la partie 5 détaille robustesse et moment d’écriture sur disque."
---
Le [modèle](/python-carnet-todo-3-modele-donnees/) est prêt : tu ajoutes une **application console Python** qui appelle tes fonctions et affiche les retours — même esprit que le [mini jeu terminal](/python-mini-jeu-terminal/), mais orienté **données**.

[Livres d’exercices Python](https://www.amazon.fr/s?k=exercices+python+livre&tag=manuso06-21) renforcent les automatismes sur input et boucles (partenaire). [Conditions](/python-conditions-if-else/), [parcours Python](/programmation/python/), [sommaire Carnet Todo](/programmation/carnet-todo/).

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

## Résultat attendu

Tu navigues dans un **menu** fonctionnel relié au modèle ; il reste à décider **quand** écrire sur disque sans perdre les données — [persistance](/python-carnet-todo-5-persistance/).

## Suite

**Étape suivante :** [quand sauvegarder — après chaque action ou à la sortie](/python-carnet-todo-5-persistance/).  
**Sommaire :** [Carnet Todo — page pilier](/programmation/carnet-todo/).

## Matériel recommandé (partenaire Amazon)

- [Exercices Python — livres](https://www.amazon.fr/s?k=exercices+python+livre&tag=manuso06-21)
- [Programmation Python console / scripts](https://www.amazon.fr/s?k=python+scripting+livre&tag=manuso06-21)
