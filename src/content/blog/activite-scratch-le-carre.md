---
title: "Activité facile avec scratch : le carré"
description: "Aujourd’hui je vous propose votre première activité pour découvrir scratch. Le but sera de déplacer le lutin autour d’un carré"
pubDate: "2020-04-10"
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.webp"
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

S’être familiarisé avec l’[interface graphique de mBlock 5](/premier-pas-avec-mblock-5/)

## 2\. La scène en détail

En premier lieu, pour effectuer cette activité, nous allons tout d’abord voir la scène en détail pour comprendre le placement des lutins sur celle-ci.

Dans la scène, la position de chaque lutin est définie sur un **plan à deux dimensions** : un **repère orthonormé** avec deux axes, **X** (horizontal) et **Y** (vertical).

Les coordonnées d’un point s’écrivent **(x, y)** : d’abord l’abscisse **x**, puis l’ordonnée **y**.

Le croisement des deux axes est l’**origine**, de coordonnées **(0, 0)** — au **centre** de la scène dans Scratch / mBlock.

![Scène mBlock avec repère et contrôles — capture tutoriel](/images/blog/premier-pas-mblock/mblock-scene-controles.png)

*La scène mBlock : le centre est (0, 0), l’axe horizontal est x, l’axe vertical est y.*

Sur une scène classique de 480 × 360 pixels, le lutin reste à l’écran si **x** reste entre **−240** et **+240**, et **y** entre **−180** et **+180**.

## 3\. Placement du lutin

Ensuite, placez le lutin aux coordonnées **(−100, 100)**.

![Placement du lutin aux coordonnées (−100, 100) dans mBlock / Scratch](/capture/carre/01-placement-lutin-moins100-100.png)

Vous pouvez **déplacer le lutin à la souris** sur la scène ou **saisir x et y** dans les champs prévus (panneau du lutin ou zone d’information selon la version).

![Saisie des coordonnées du lutin](/capture/carre/02-saisie-coordonnees-lutin.png)

## 4\. Le carré

Un carré a tous ses côté égaux et pour cette activité sa longueur est de 200 pas.

Sachant que le lutin est placé aux coordonnées (-100,100) quelles sont les coordonnées du carré ? la réponse sera donnée à la fin de ce chapitre.

Le fichier **[carre.mblock](/capture/carre/carre.mblock)** s’ouvre dans mBlock 5 (Fichier, puis Ouvrir). Il contient le script photographié ci-dessous.

![Script mBlock : quand espace est pressée, quatre blocs « glisser 1 seconde » vers (100, 100), (100, −100), (−100, −100) puis (−100, 100).](/capture/carre/03-scene-preparee-carre.png)

*Le script du fichier : espace, puis les quatre coins dans le sens des aiguilles d’une montre.*

Solution : Les coordonnées des quatre coins sont :

*   Point de départ : ( -100 , 100 )
*   Le coin en haut à droite : ( 100 , 100 )
*   celui en bas à droite : ( 100 , -100 )
*   et le dernier en bas à gauche : ( -100 , -100 )

Le lutin devra se déplacer en suivant ces lignes — à vous de programmer le parcours !

## 5\. Le programme

Quand on appuie sur la **barre espace**, le lutin parcourt les quatre côtés dans le **sens des aiguilles d’une montre** et revient au point de départ.

Les blocs sont rangés par couleur dans la colonne de gauche : bleu pour **Mouvement**, orange pour **Contrôle**, jaune pour **Événements**. Le bouton d’**extension**, en bas de cette colonne, ajoute la catégorie **Stylo**.

![Catégories de blocs dans mBlock 5](/images/blog/premier-pas-mblock/mblock-categories-blocs.png)

*Catégories de blocs. Le bouton d’extension, en bas, sert à ajouter le stylo.*

On assemble les blocs dans la zone de script, en les emboîtant les uns sous les autres. Un bloc laissé à côté des autres ne s’exécute pas.

![Zone de script vide de mBlock 5](/images/blog/premier-pas-mblock/mblock-zone-script.png)

*La zone de script, encore vide.*

### Vérifier

Appuyez sur la barre espace. Le parcours est bon si le lutin fait un tour complet, revient en (−100, 100), et si le stylo est baissé, si le trait forme un carré.

Un virage dans l’autre sens (↺ au lieu de ↻) envoie le lutin hors de la scène. Un bloc oublié dans la boucle laisse une forme ouverte. Si rien ne bouge, les blocs ne sont pas accrochés sous « quand la touche espace est pressée ».

### Solution avec les coordonnées

Le fichier **[carre.mblock](/capture/carre/carre.mblock)** contient le panda déjà placé en (−100, 100) et quatre blocs « glisser en 1 seconde à x: y: », dans cet ordre : (100, 100), (100, −100), (−100, −100), (−100, 100). Ouvrez-le avec mBlock 5, menu **Fichier**, puis **Ouvrir**.

### Solution avec le stylo et « répéter 4 fois »

Le lutin regarde à droite (direction 90). Il avance de 200 pas, tourne de 90° vers la droite, et recommence. Quatre quarts de tour font 360°.

```text
quand [espace] est pressée
effacer tout
aller à x: -100 y: 100
s'orienter à 90
stylo en position d'écriture
répéter 4 fois
    avancer de 200 pas
    tourner ↻ de 90 degrés
relever le stylo
```

Les trois lignes après l’événement remettent le lutin au départ : on peut relancer le programme sans que l’ancien trait gêne.

## 6\. Aller plus loin

Changez la longueur du côté, par exemple 100 ou 150 pas. Pour un triangle équilatéral, répétez 3 fois et tournez de 120° (360 divisé par 3). Pour un hexagone, répétez 6 fois et tournez de 60°.

La suite sur un robot est le [premier programme mBot](/mon-premier-programme-mbot/). Pour choisir entre les deux logiciels, lisez [mBlock ou Scratch](/mblock-vs-scratch-lequel-choisir/).
