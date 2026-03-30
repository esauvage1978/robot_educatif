---
title: "Activité mBot : Faire défiler un texte"
description: "Dans ce nouvel article, je vais vous apprendre à faire défiler un texte sur la matrice LED du robot mBot. Nous allons décomposer le programme pour qu’il soit simple à mettre en oeuvre. A la fin de cette activité, nous auront une fonction pour afficher un message défilant qui pourra être réutilisé dans d’autre projet. […]"
pubDate: "2020-04-20"
heroImage: "../../assets/mbot/mbot-hero.png"
updatedDate: "2020-04-21"
categories:
  - "Activité"
  - "mBot"
  - "Makeblock"
  - "À partir de 8 ans"
---
Dans ce nouvel article, je vais vous apprendre à faire défiler un texte sur la matrice LED du robot mBot. Nous allons décomposer le programme pour qu’il soit simple à mettre en oeuvre. A la fin de cette activité, nous auront une fonction pour afficher un message défilant qui pourra être réutilisé dans d’autre projet.

## 1\. pré requis

Avoir en sa possession le [robot éducatif mBot de chez MakeBlock](/mbot-mon-premier-robot-educatif/)

[Installer l’application mBlock 5](/installer-mblock-5-sous-windows-10/)

S’être familiariser avec l’[interface graphique de mBlock 5](/premier-pas-avec-mblock-5/)

Avoir installé les [blocs d’instruction du mBot](/installer-les-blocs-du-mbot/)

## 2\. première activité : affichage basique du texte

Dans ce premier programme tout simple, nous allons juste afficher le texte **Hello** afin de voir comment se comporte la matrice LED

![Image représentant la première activité d'affichage du texte](https://robot-educatif.info/wp-content/uploads/2020/04/blocks3.png)

Une fois téléverser, il n’y a que les 3 premières lettres du mot **Hello** d’affiché.

Il en va de même pour n’importe quel mot de plus de 3 lettres.

En décalant X à la valeur 10, seule la lettre H sera affichée. Si vous mettez la valeur 15, rien ne sera visible.

On peut en conclure que pour faire défiler le texte, il faut jouer avec la valeur de X.

## 3\. Seconde activité : Faire défiler le texte

Dans cette seconde activité, nous allons inclure l’affichage du message dans une boucle en modifiant la valeur de X. Afin de laisser le temps à l’oeil de lire le message, nous placeront également une temporisation de 0.1 seconde.

La première chose à faire est de définir une variable nommée X et lui affecter la valeur de 15. Cela permettra d’avoir le texte en dehors de l’écran et de commencer l’affichage.

A chaque passage dans la boucle, on retire 1 à la valeur de X pour faire défiler le texte

![l'image représente le défilement d'un texte sur la matrice LED du mBot](https://robot-educatif.info/wp-content/uploads/2020/04/blocks-3.png)

L’objectif est atteint mais ça n’est pas pour autant satisfaisant. D’une part le programme continue de tourner en retranchant 1 à la valeur de X et maintenant j’aimerai que l’on puisse afficher le texte plusieurs fois.

## 4\. troisième activité : faire défiler le texte plusieurs fois

Dans cette troisième activité, nous allons faire défiler le texte plusieurs fois en nous servant du code précédent.

pour que l’enchainement entre 2 textes ne soit pas trop long ou trop court, il faut calculer la longueur du texte, la multiplier par 5 et ajouter 15. Pourquoi 5 ? car les caractères sont codés sur 5 diodes et le 15 correspond au décalage pour avoir le texte en dehors de la matrice.

dans cet activité, je vous conseille de créer une variable pour la longueur de la chaine de caractère (texte à afficher). Et d’imbriquer 2 boucles. celle qui sera à l’intérieure sera pour le défilement du texte. Celle à l’extérieure sera pour la répétition d’affichage

Voici une solution possible avec le message affiché 3 fois :

![image représentant la troisième activité pour défiler le texte 3 fois](https://robot-educatif.info/wp-content/uploads/2020/04/blocks4.png)

Les caractères comportant des accents ne sont pas affichés.

## 5\. Dernière activité : création d’un bloc personnalisé

Un développeur a deux qualités. La première, il n’aime pas réinventer la roue et la seconde c’est un fainéant dans le sens où il va chercher à se confectionner une boîte à outils contenant des fonctions génériques et réutilisable. C’est justement le but de ce chapitre, nous allons modifier le code créé plus tôt pour le rendre générique à l’aide des blocs et ainsi pouvoir le réutiliser dans d’autre projet.

Vous allez donc créer un bloc nommé **defilement\_texte** ayant deux paramètres : le **message** et le **nombre de répétition**.

![](https://robot-educatif.info/wp-content/uploads/2020/04/blocks1.png)

et intégrer le code précédent

![](https://robot-educatif.info/wp-content/uploads/2020/04/blocks5.png)

![](https://robot-educatif.info/wp-content/uploads/2020/04/blocks6.png)

*Fichier defile_final.mblock non hébergé — reconstituez le programme dans mBlock 5 d’après les captures ([Programmes mBlock](/programmes/)).*

Pour conclure, vous êtes maintenant en capacité de faire défiler un texte et de réutiliser le code dans d’autre projet.

## 6\. Apprendre le développement

Je vous ai sélectionné une série de livre pour vous former avec le mBot et l’algorithme
