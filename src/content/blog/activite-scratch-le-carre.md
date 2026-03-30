---
title: "Activité facile avec scratch : le carré"
description: "Aujourd’hui je vous propose votre première activité pour découvrir scratch. Le but sera de déplacer le lutin autour d’un carré"
pubDate: "2020-04-10"
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
updatedDate: "2026-03-29"
categories:
  - "Activité"
  - "Scratch"
  - "À partir de 8 ans"
  - "mBlock"
---
Dans cet article, je vous propose de faire votre première activité très facile pour découvrir [scratch](https://scratch.mit.edu/). Le but sera de déplacer notre petit lutin autour d’un carré de 200 pas de côté.

## 1\. Prérequis

[Installer l’application mBlock 5](/installer-mblock-5-sous-windows-10/) ou scratch

S’être familiariser avec l’[interface graphique de mBlock 5](/premier-pas-avec-mblock-5/)

## 2\. La scène en détail

En premier lieu, pour effectuer cette activité, nous allons tout d’abord voir la scène en détail pour comprendre le placement des lutins sur celle-ci.

Dans la scène, la position de chaque lutin est définie sur un **plan à deux dimensions** : un **repère orthonormé** avec deux axes, **X** (horizontal) et **Y** (vertical).

Les coordonnées d’un point s’écrivent **(x, y)** : d’abord l’abscisse **x**, puis l’ordonnée **y**.

Le croisement des deux axes est l’**origine**, de coordonnées **(0, 0)** — au **centre** de la scène dans Scratch / mBlock.

![Schéma du repère orthonormé de la scène mBlock / Scratch : origine au centre, axe x de −240 à +240, axe y de −180 à +180.](/images/blog/activite-scratch-carre/repere-orthonorme-mblock.svg)

> **Limites de la scène :** pour que le lutin reste **à l’écran**, en pratique **x** doit rester entre **−240** et **+240**, et **y** entre **−180** et **+180** (scène classique 480 × 360 pixels, comme sur le schéma ci-dessus).

## 3\. Placement du lutin

Ensuite, placez le lutin aux coordonnées **(−100, 100)**.

![Placement du lutin aux coordonnées (−100, 100) dans mBlock / Scratch](/capture/carre/01-placement-lutin-moins100-100.png)

Vous pouvez **déplacer le lutin à la souris** sur la scène ou **saisir x et y** dans les champs prévus (panneau du lutin ou zone d’information selon la version).

![Saisie des coordonnées du lutin](/capture/carre/02-saisie-coordonnees-lutin.png)

## 4\. Le carré

Un carré a tous ses côté égaux et pour cette activité sa longueur est de 200 pas.

Sachant que le lutin est placé aux coordonnées (-100,100) quelles sont les coordonnées du carré ? la réponse sera donnée à la fin de ce chapitre.

Pour vous aider à visualiser le déplacement du lutin, vous pouvez ouvrir le projet mBlock déjà préparé (fond en forme de carré) : **[télécharger `carre.mblock`](/capture/carre/carre.mblock)**. Ouvrez le fichier avec **mBlock 5** (Fichier → Ouvrir).

![Scène préparée avec un carré (fond d’arrière-plan)](/capture/carre/03-scene-preparee-carre.png)

Solution : Les coordonnées des quatre coins sont :

*   Point de départ : ( -100 , 100 )
*   Le coin en haut à droite : ( 100 , 100 )
*   celui en bas à droite : ( 100 , -100 )
*   et le dernier en bas à gauche : ( -100 , -100 )

Le lutin devra se déplacer en suivant ces lignes — à vous de programmer le parcours !

## 5\. Le programme

Maintenant que le décor est planté, nous allons passer au programme.

**Comportement attendu :** lorsque l’on appuie sur la **barre espace**, le lutin **glisse** le long du carré dans le **sens horaire** (sens des aiguilles d’une montre), fait le **tour** du carré et revient à sa position de départ.

Le script correspondant est dans le même fichier que la scène : **[`carre.mblock`](/capture/carre/carre.mblock)**. Ouvrez-le dans mBlock 5 pour voir la **zone de script** ; vous pouvez modifier le projet ou recopier les blocs pour vous entraîner.

**Pour lancer :** cliquez sur le **drapeau vert**, puis sur la **barre espace** pour déclencher le déplacement.

En dernier lieu : **bravo** — vous avez réussi ce premier programme avec Scratch !

## 6\. Apprendre scratch

Pour terminer, voici une sélection de **livres** pour aller plus loin avec **Scratch** et l’**algorithmique** — liens vers des recherches sur **Amazon.fr** (affiliation) ; vérifiez la fiche, les avis et le prix au moment de l’achat :

*   [Recherche : coffret ou manuel « J’apprends à coder avec Scratch 3 »](https://www.amazon.fr/s?k=j%27apprends+%C3%A0+coder+avec+scratch+3&tag=manuso06-21) — parcours guidé très utilisé en famille ou en classe.
*   [Recherche : *Scratch pour les kids*](https://www.amazon.fr/s?k=scratch+pour+les+kids&tag=manuso06-21) — initiation ludique aux blocs et aux premiers jeux.
*   [Recherche : programmer des jeux avec Scratch](https://www.amazon.fr/s?k=programmer+jeu+scratch&tag=manuso06-21) — livres orientés **jeux vidéo** et projets pas à pas.
*   [Recherche : Scratch 3 + activités / ateliers](https://www.amazon.fr/s?k=scratch+3+activit%C3%A9s+enfants&tag=manuso06-21) — fiches et défis pour s’entraîner après les tutos du site.
*   [Recherche : algorithmique pour enfants / débutants](https://www.amazon.fr/s?k=algorithmique+enfants+d%C3%A9butant&tag=manuso06-21) — pour lier **logique**, **boucles** et **conditions** au-delà d’un seul logiciel.
