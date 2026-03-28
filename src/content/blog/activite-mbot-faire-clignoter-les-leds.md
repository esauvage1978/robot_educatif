---
title: "Activité mBot : faire clignoter les leds"
description: "Ce nouvel article avec le mBot va vous faire découvrir les LEDS au travers de 3 activités. 2 simples et une un peu plus complexe."
pubDate: "2020-04-18"
heroImage: "../../assets/mbot/mbot-hero.png"
updatedDate: "2020-04-21"
categories:
  - "Activité"
  - "mBot"
  - "Makeblock"
  - "À partir de 8 ans"
---
le [mBot](https://amzn.to/3eAmt2m?tag=manuso06-21) est un robot qui embarque plusieurs capteurs et LED. Dans cette activité, nous allons nous pencher sur les 2 LEDS qui se trouvent sur la carte mère. Le but sera de les faire clignoter de façon alternative en rouge puis en rouge, vert et bleu et enfin progressivement en utilisant des variables.

Ces 2 LEDS, DELS ou diodes ont la particularité de pouvoir changer de couleur suivant le système de codage des couleurs RGB (Rouge, vert et bleu).

## 1\. Un peu de théorie

Dans le [système de codage de couleur RGB](https://fr.wikipedia.org/wiki/Rouge_vert_bleu), chaque composante de couleur peut prendre une valeur allant de 0 à 255.

Voici quelques couleurs : rouge : 255 – 0 – 0. Vert : 0 – 255 – 0. Bleu : 0 – 0 – 255. Blanc : 255 – 255 – 255

Nous avons donc plus de 16 millions de possibilités de couleur. 16 777 216 pour être précis.

## 2\. Activité 1 : clignotement des LEDS du mBot

L’objectif du premier programme est d’allumer les leds en rouge alternativement à gauche et à droite et ceci 10 fois. Chaque LED doit être allumé 1 seconde.

Une LED une fois allumée ne s’éteint pas seule, il faut donc lui affecter la valeur 0-0-0

Pour se faire, vous aller utiliser les blocs suivants :

![image représentant les Blocs à utiliser pour cette activité](https://robot-educatif.info/wp-content/uploads/2020/04/led1.png)

Voici une des solutions possibles :

![image représentant la solution de l'activité sur les LED pour le mBot](https://robot-educatif.info/wp-content/uploads/2020/04/led2.png)

et vous pouvez télécharger le programme ci-dessous

[https://robot-educatif.info/programmes/led1.mblock](https://robot-educatif.info/programmes/led1.mblock)

## 3\. Activité 2 : changer les couleurs des LEDS du mBot

L’objectif de ce second programme est d’afficher les couleurs rouge, vert et bleu sur les 2 diodes pendant 10 cycles. Ce programme est tout aussi simple que le précédent.

Ci dessous les blocs à utiliser

![](https://robot-educatif.info/wp-content/uploads/2020/04/led3.png)

Pour avoir une solution qui peut être celle ci

![](https://robot-educatif.info/wp-content/uploads/2020/04/led4.png)

La solution est téléchargeable ci-dessous

[https://robot-educatif.info/programmes/led2.mblock](https://robot-educatif.info/programmes/led2.mblock)

## 4\. Activité 3 : affichage progressif des LEDS du mBot

Dans ce dernier programme, je vous demande d’allumer les leds en rouge, en vert et en bleu progressivement (de 0 à 255). Pour vous aider, je vais vous décrire le programme de façon détaillé. Il faudra donc le retranscrire.

Vous allez devoir créer une variable que vous aller initialiser à 0 puis vous la ferait évoluer de 1 avant d’afficher la première couleur soit le rouge. L’affichage d’une nuance est à faire pendant 0.01 seconde. Il faudra reproduire ce bloc pour les 2 autres couleurs.

Pour initialiser une variable ou lui assigner la valeur 0, il faut utiliser le bloc **définir xxx à 0**.

Pour faire évoluer la valeur de la variable de 1, il faut utiliser le bloc **changer xxx par 1**.

Je vous présente une solution possible

![activité d'affichage des leds du mBot](https://robot-educatif.info/wp-content/uploads/2020/04/led5.png)

et si vous ne souhaitez pas le reproduire, voici le programme en téléchargement

[https://robot-educatif.info/programmes/led3.mblock](https://robot-educatif.info/programmes/led3.mblock)

### 4.1 Amélioration du programme

Ce programme fonctionne cependant il ne me satisfait pas pour 2 raisons.

La première raison est que j’ai plus ou moins répété 3 fois la même chose et c’est 2 fois de trop !

La seconde raison est que mes constantes sont elle aussi dupliquées. Dans ce programme j’en ai 2, le **pas** correspondant à l’évolution de la couleur et la durée de la **temporisation**. Si je veux changer une de ces constantes, je vais devoir le faire 3 fois.

Je vous propose de réfléchir à une solution et je vous en donnerai une utilisant un bloc personnalisé avec 3 paramètres.

![](https://robot-educatif.info/wp-content/uploads/2020/04/led6.png)

Les premiers paramètres correspondent à mes deux constantes. Le dernier paramètre sera une variable pouvant contenir les valeurs 0,1 et 2. Si sa valeur est 0 alors j’afficherai le rouge, le 1 pour le vert et le 2 pour le bleu.

Le contenu du bloc est le suivant

![Image représentant un bloc personnalisé avec 3 paramètres en entrée](https://robot-educatif.info/wp-content/uploads/2020/04/blocks.png)

et le programme principal sera le suivant

![Image représentant le programme principal modifié](https://robot-educatif.info/wp-content/uploads/2020/04/blocks2.png)

En terme de nombre de ligne de code, ce programme n’est pas plus court. Cependant il est plus simple à faire évoluer et à paramétrer. Dans le cas d’un projet plus gros, il est indispensable de mettre en oeuvre ces mécanismes.

Pour conclure, dans ces 3 activités, nos avons vu comment jouer avec les LEDS et je vous ai présenté de nouveaux concepts sous mBlock.

## 5\. Apprendre le développement

Je vous ai sélectionné une série de livre pour vous former avec le mBot et l’algorithme
