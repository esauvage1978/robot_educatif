---
title: "Activité mBot : Mesurer des distances"
description: "Dans cette activité, je vais vous montrer comment mesurer des distances à l’aide du capteur à ultrason du mBot. La distance sera ensuite affichée sur la matrice led. 1. pré requis Avoir en sa possession le robot éducatif mBot de chez MakeBlock Installer l’application mBlock 5 S’être familiariser avec l’interface graphique de mBlock 5 Avoir […]"
pubDate: "2020-04-21"
heroImage: "../../assets/mbot/mbot-hero.png"
updatedDate: "2020-04-28"
categories:
  - "Activité"
  - "mBot"
  - "Makeblock"
  - "À partir de 10 ans"
---
Dans cette activité, je vais vous montrer comment mesurer des distances à l’aide du capteur à ultrason du [mBot](https://amzn.to/3avo9qi?tag=manuso06-21). La distance sera ensuite affichée sur la matrice led.

[Prev](#) 1 of 1 [Next](#)

*   [
    
    ![Activité mBot : Mesure des distances](https://i.ytimg.com/vi/1smaSvnB7Aw/sddefault.jpg)
    
    ### Activité mBot : Mesure des distances
    
    ](#1smaSvnB7Aw "Activité mBot : Mesure des distances")

[Prev](#) 1 of 1 [Next](#)

## 1\. pré requis

Avoir en sa possession le [robot éducatif mBot de chez MakeBlock](https://robot-educatif.info/2020/04/06/mbot-mon-premier-robot-educatif/)

[![achetez le robot éducatif mBot sur Amazon](https://robot-educatif.info/wp-content/uploads/2020/04/banniere_mbot.png)](https://amzn.to/3bVU8RR?tag=manuso06-21)

[Installer l’application mBlock 5](https://robot-educatif.info/2020/04/07/installer-mblock-5-sous-windows-10/)

S’être familiariser avec l’[interface graphique de mBlock 5](https://robot-educatif.info/2020/04/07/premier-pas-avec-mblock-5/)

Avoir installé les [blocs d’instruction du mBot](https://robot-educatif.info/2020/04/08/installer-les-blocs-du-mbot/)

Faire l’[activité sur le défilement d’un texte](/activite-mbot-faire-defiler-un-texte/)

## 2\. Capteur à ultrason

Le capteur à ultrason permet de calculer des distances. Il est composé de deux composants : 1 émetteur et 1 récepteur. Le son est envoyé par l’émetteur, lorsque celui ci atteint un obstacle, il rebondit et est capté par le récepteur. La vitesse du son est de 340 m/s. L’obtention de l’information est très rapide.

Ce capteur peut servir à calculer les distances mais également à faire de l’évitement d’obstacle, des détecteurs d’intrusion…

Il fonctionne dans pour des valeurs comprises entre 3 cm et 400 cm.

## 3\. Première activité : calcul d’une distance

Pour cette première activité, je vais vous montrer comment utiliser le bloc de ce capteur pour l’afficher dans la fenêtre des lutins.

Lorsque une variable est définie, celle ci s’affiche automatiquement dans le fenêtre des lutins, si une valeur lui est affecté, elle sera donc visible.

Pour interagir entre le mBot et la fenêtre des lutins, il faut choisir le mode « **vivre**« .

![image représentant l'utilisation du capteur sonique du mBot](https://robot-educatif.info/wp-content/uploads/2020/04/blocks-4.png)

![](https://robot-educatif.info/wp-content/uploads/2020/04/c1.png)

Lorsque le programme est lancé, la valeur de la variable data est mise à jour et est affichée dans la fenêtre du lutin. La valeur est exprimée en centimètre (cm).

## 3\. Seconde activité : affichage de la distance sur la matrice LED

Dans cette activité, nous allons utiliser la matrice LED pour afficher la distance en mode autonome, c’est à dire sans l’utilisation du PC.

Nous allons reprendre le projet d’affichage d’un texte sur la matrice avec défilement de celui-ci. [/activite-mbot-faire-defiler-un-texte/](/activite-mbot-faire-defiler-un-texte/)

Cependant nous allons rencontrer une difficulté due aux variables. En effet notre bloc attend un message de type texte (String) et la valeur lue par le capteur est un nombre (float).

Je vais faire une analogie, vous avez certainement du jouer avec des encastrement de forme où il fallait faire rentrer la bonne forme dans le bon emplacement. Pour les variables, c’est le même principe.

Je vous propose 2 solutions pour résoudre ce problème. Une simple et une un peu plus complexe

### 3.1 Création d’un nouveau bloc personnalisé

Cette solution est simple dans la mesure où il vous suffit de changer la signature du bloc d’affichage du texte.

Cette solution fonctionne mais si l’on veut afficher du texte dans le même programme, il faudra dupliquer les 2 blocs. Ce qui à mon sens n’est pas pertinent.

### 3.2 Modification du code C

Cette solution vous permettra d’avoir une première approche avec le langage C qui est utilisé pour programmer le [mBot](https://amzn.to/3avo9qi?tag=manuso06-21).

Pour se faire, il faut suivre les étapes suivantes

1.  créer le programme à l’aide des blocs
2.  Cliquer sur le symbole </>
3.  Copier le code source affiché (CTRL + A puis CTRL + C)
4.  Appuyer sur l’onglet Arduino C
5.  Coller le code
6.  Le modifier suivant l’image ci-dessous

![](https://robot-educatif.info/wp-content/uploads/2020/04/c2.png)

\-2-

J’ai juste forcé la conversion de la valeur de date en chaine de caractère avec :

defilement\_texte\_N\_N(String(data) + String(« cm »), 1);

## 4\. Apprendre le développement

Je vous ai sélectionné une série de livre pour vous former avec le mBot et l’algorithme
