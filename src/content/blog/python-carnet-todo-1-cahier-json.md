---
title: "Carnet Todo Python (1/6) : cahier des charges et fichier JSON"
headline: "Projet carnet Todo en Python — modèle de données et JSON"
description: "Tutoriel projet python débutant : pourquoi JSON, structure tâches (id, titre, fait), menu CLI prévu. Base d’une application utile avec persistance."
pubDate: 2026-03-29
updatedDate: 2026-04-18
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Carnet Todo
seriesOrder: 1
tags: ["Python", "Programmation", "Projet", "débutant", "JSON"]
relatedLinks:
  - title: "Sommaire — Carnet Todo"
    href: "/programmation/carnet-todo/"
  - title: "Parcours Python"
    href: "/programmation/python/"
  - title: "Partie 2 — lire et écrire JSON"
    href: "/python-carnet-todo-2-lire-ecrire-json/"
categories:
  - "Python"
  - "Programmation"
  - "Carnet Todo"
  - "Projet"
faqSchema:
  - question: "Qu’est-ce qu’un carnet Todo en Python ?"
    answer: "Un programme en ligne de commande qui gère une liste de tâches avec identifiant, titre et statut fait ou non, sauvegardée dans un fichier JSON pour retrouver les données après fermeture du terminal."
  - question: "Pourquoi utiliser JSON pour stocker les tâches ?"
    answer: "Le JSON est textuel, lisible dans un éditeur, standard sur le web et les APIs, et lu nativement en Python avec le module json sans bibliothèque tierce."
  - question: "Où trouver le sommaire de la série Carnet Todo ?"
    answer: "Sur la page pilier Carnet Todo en Python du site robot-educatif.info, qui liste les six étapes avec liens vers chaque tutoriel."
---
Tu cherches un **projet python fichier json** concret : pas seulement des exercices, mais un **outil** que tu pourrais encore utiliser dans six mois. Un **carnet Todo** en console **ajoute**, **liste**, **coche** et **supprime** des tâches, avec une **sauvegarde** sur disque. Le format **JSON** est lisible par un humain, standard, et Python le gère avec le module **`json`**.

Pour aller plus loin en parallèle de cette série gratuite, les ouvrages sur [**Python et données**](https://www.amazon.fr/s?k=python+donn%C3%A9es+json+livre&tag=manuso06-21) complètent bien la pratique (partenaire).

Retrouve le **fil rouge** sur la [page pilier Carnet Todo](/programmation/carnet-todo/) — tu y verras aussi le lien avec les autres **projets guidés** ([Puissance 4](/programmation/puissance-4/), [bataille navale](/programmation/bataille-navale/)).

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

## Résultat attendu

Tu as une **vision claire** du fichier `taches.json`, des **champs** de chaque tâche et du **menu** à coder dans les articles suivants. Tu peux expliquer à quelqu’un pourquoi **`prochain_id`** existe sans avoir encore écrit `json.dump`. La suite logique : [charger et enregistrer du JSON](/python-carnet-todo-2-lire-ecrire-json/).

## Exercices

1. Écris à la main un fichier JSON minimal avec **deux** tâches et valide-le sur [jsonlint.com](https://jsonlint.com) (outil en ligne).
2. Liste trois **autres** formats de sérialisation que tu connais ou as entendus (CSV, XML, etc.).
3. Réfléchis : pourquoi chaque tâche a un **`id`** plutôt que seulement un numéro de ligne ?

## Suite

**Étape suivante :** [charger et enregistrer le fichier avec le module json](/python-carnet-todo-2-lire-ecrire-json/).  
**Sommaire :** [Carnet Todo — page pilier](/programmation/carnet-todo/).

## Matériel recommandé (partenaire Amazon)

- [Python, données et JSON — livres](https://www.amazon.fr/s?k=python+donn%C3%A9es+json+livre&tag=manuso06-21)
- [Projets pratiques Python](https://www.amazon.fr/s?k=python+projets+pratiques+livre&tag=manuso06-21)
