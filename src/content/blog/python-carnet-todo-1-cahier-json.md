---
title: "Carnet Todo en Python (1/6) — cahier des charges et JSON"
description: "Pourquoi JSON ; structure du fichier : liste de tâches avec id, titre, fait ; objectifs du menu en ligne de commande."
pubDate: 2026-03-29
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Carnet Todo
seriesOrder: 1
tags: ["Python", "Programmation", "Projet"]
relatedLinks:
  - title: "Parcours Python"
    href: "/programmation/python/"
  - title: "Partie 2 — lire et écrire JSON"
    href: "/python-carnet-todo-2-lire-ecrire-json/"
---

Un **carnet Todo** en console, c’est un programme qui **ajoute**, **liste**, **coche** et **supprime** des tâches, avec une **sauvegarde** sur disque pour ne rien perdre quand tu fermes le terminal. Le format **JSON** est lisible par un humain, standard, et supporté par Python avec le module intégré **`json`**.

## 1. Pourquoi JSON plutôt qu’un inventaire binaire ?

- Tu peux **ouvrir** le fichier dans un éditeur de texte et comprendre le contenu.
- Facile à **éditer** à la main en cas de besoin.
- Réutilisable plus tard pour une **appli web** ou un **mobile** qui lit le même fichier.

## 2. Structure proposée

Fichier `taches.json` :

```json
{
  "prochain_id": 3,
  "taches": [
    {"id": 1, "titre": "Finir le pendu", "fait": false},
    {"id": 2, "titre": "Courses", "fait": true}
  ]
}
```

- **`prochain_id`** : entier pour attribuer un **nouvel** `id` unique à chaque création.
- **`taches`** : liste d’**objets** (dictionnaires Python) avec au minimum `id`, `titre`, `fait`.

Tu pourras ajouter `date_creation` ou `priorite` dans une extension.

## 3. Fonctionnalités du menu (aperçu)

1. Lister les tâches (avec case à cocher visuelle `[ ]` / `[x]`).
2. Ajouter une tâche (saisie du titre).
3. Marquer comme faite / non faite (par **id**).
4. Supprimer une tâche (par **id**).
5. Quitter (sauvegarde automatique avant de sortir).

## 4. Prérequis

- [Fichiers texte](/python-fichiers-texte/) (ouverture, UTF-8).
- [Listes et dictionnaires](/python-listes-et-chaines/) — ici surtout des **dict** imbriqués.

## Exercices

1. Écris à la main un fichier JSON minimal avec **deux** tâches et valide-le sur [jsonlint.com](https://jsonlint.com) (outil en ligne).
2. Liste trois **autres** formats de sérialisation que tu connais ou as entendus (CSV, XML, etc.).
3. Réfléchis : pourquoi chaque tâche a un **`id`** plutôt que seulement un numéro de ligne ?

## Suite

[Partie 2 — Charger et enregistrer le fichier avec le module json](/python-carnet-todo-2-lire-ecrire-json/).

## Amazon (partenaire)

- [Python et données](https://www.amazon.fr/s?k=python+donn%C3%A9es+json+livre&tag=manuso06-21)
