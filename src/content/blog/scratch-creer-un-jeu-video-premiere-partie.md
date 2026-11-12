---
title: "Scratch : faire défiler un décor avec les flèches"
description: "Partie 1 : dessiner un sol plus large que la scène, puis le déplacer de 5 pixels avec les flèches, des variables et une borne."
pubDate: "2020-04-12"
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.webp"
updatedDate: "2026-11-12"
categories:
  - "Scratch"
  - "Activité"
  - "Jeu vidéo"
  - "À partir de 10 ans"
---

Cette page est la première d’une série. Elle construit le sol d’un jeu, puis le fait défiler avec les flèches du clavier. Le personnage, les plateformes et le saut ne sont pas ici.

## 1. Avant de commencer

[Installer mBlock 5](/installer-mblock-5-sous-windows-10/), ou ouvrir [Scratch](https://scratch.mit.edu/). Avoir déjà vu la scène, le lutin et les catégories de blocs : [interface de mBlock 5](/premier-pas-avec-mblock-5/). L’[activité du carré](/activite-scratch-le-carre/) montre un premier script attaché à un lutin.

Plusieurs scripts peuvent vivre sur le même lutin, et ils tournent en parallèle. Le script affiché est celui de l’objet sélectionné (lutin ou arrière-plan).

## 2. Dessiner un sol plus large que la scène

Le sol est un **lutin**, pas un arrière-plan. L’arrière-plan n’a pas la catégorie **Mouvement**, donc il ne peut pas changer de x.

1. Dans **Objets** (ou **Sprites** si l’interface est en anglais), cliquez sur **ajouter**, puis **Peinture**.
2. Dessinez une dalle dont le dessus est d’une seule couleur sur tout le parcours.
3. S’il y a plusieurs morceaux, **convertir en bitmap** puis **vectoriser** pour n’en faire qu’un costume.
4. Dupliquez cette dalle (**Ctrl+C**, **Ctrl+V**), alignez cinq copies, sélectionnez tout (**Ctrl+A**) et fusionnez de nouveau.
5. Décalez ce bloc vers le bord droit de la zone de dessin et ajoutez une dalle. Dans la marche d’origine, la largeur passait alors à 841 pixels. Lisez le nombre affiché chez vous : c’est le vôtre.
6. Répétez jusqu’à un costume d’au moins 7 000 pixels de large. La scène Scratch fait 480 pixels : un sol plus court ne laisse presque rien à faire défiler.

## 3. Le programme

La scène va de x = −240 à x = 240. Le x du lutin est le centre du costume. Flèche droite : le sol part de 5 pixels vers la gauche. Flèche gauche : l’inverse.

### Trois variables

Dans **Variables**, créez trois variables **pour cet objet seulement** :

- `decor_largeur` : la largeur lue dans l’éditeur de costumes ;
- `decor_debut` : le x de départ ;
- `decor_fin` : le x de fin.

Quand le drapeau vert est cliqué :

1. mettre `decor_largeur` à cette largeur (7 000 dans l’exemple) ;
2. mettre `decor_debut` à `(decor_largeur / 2) − 240` ;
3. mettre `decor_fin` à `240 − (decor_largeur / 2)` ;
4. aller à x : `decor_debut`, y : 0.

Avec 7 000, le début vaut 3 260 et la fin vaut −3 260. Le bord gauche du costume coïncide alors avec le bord gauche de la scène. Ce calcul n’a pas été rejoué dans Scratch pour cette mise à jour : si le sol ne démarre pas à gauche, le signe ou la largeur lue ne correspond pas à votre costume.

### Flèches et bornes

Le bloc **et** n’exécute le mouvement que si les deux tests sont vrais. Dans **répéter indéfiniment** :

- si **flèche droite pressée** et **abscisse x > decor_fin**, **ajouter −5 à x** ;
- si **flèche gauche pressée** et **abscisse x < decor_debut**, **ajouter 5 à x**.

Contrôle : drapeau vert, le sol est à gauche. La flèche droite le décale, puis s’arrête quand x atteint `decor_fin`. La flèche gauche le ramène et s’arrête à `decor_debut`.

## 4. Continuer

Ouvrez des exemples sur [Scratch](https://scratch.mit.edu/). Sur ce site : [le carré](/activite-scratch-le-carre/), [installer mBlock 5](/installer-mblock-5-sous-windows-10/), [premier programme mBot](/mon-premier-programme-mbot/).
