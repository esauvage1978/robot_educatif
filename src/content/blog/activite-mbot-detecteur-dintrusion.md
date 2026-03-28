---
title: "Activité mBot : Détecteur d’intrusion"
description: "Cette activité permet de réaliser un détecteur d’intrusion avec un compteur des intrus. Utilisation du capteur à ultrason , des LED, du capteur sonore et de la matrice LED du mBot. 1. pré requis Avoir en sa possession le robot éducatif mBot de chez MakeBlock Installer l’application mBlock 5 S’être familiariser avec l’interface graphique de […]"
pubDate: "2020-04-28"
heroImage: "../../assets/mbot/mbot-hero.png"
updatedDate: "2020-04-29"
categories:
  - "Activité"
  - "mBot"
  - "Makeblock"
  - "À partir de 8 ans"
---
Cette activité permet de réaliser un détecteur d’intrusion avec un compteur des intrus. Utilisation du capteur à ultrason , des LED, du capteur sonore et de la matrice LED du mBot.

[Prev](#) 1 of 1 [Next](#)

*   [
    
    ![intrusion final](https://i.ytimg.com/vi/7y2WVvbFuQY/sddefault.jpg)
    
    ### intrusion final
    
    ](#7y2WVvbFuQY "intrusion final")

[Prev](#) 1 of 1 [Next](#)

## 1\. pré requis

Avoir en sa possession le [robot éducatif mBot de chez MakeBlock](https://robot-educatif.info/2020/04/06/mbot-mon-premier-robot-educatif/)

[![achetez le robot éducatif mBot sur Amazon](https://robot-educatif.info/wp-content/uploads/2020/04/banniere_mbot.png)](https://amzn.to/3bVU8RR?tag=manuso06-21)

[Installer l’application mBlock 5](https://robot-educatif.info/2020/04/07/installer-mblock-5-sous-windows-10/)

S’être familiariser avec l’[interface graphique de mBlock 5](https://robot-educatif.info/2020/04/07/premier-pas-avec-mblock-5/)

Avoir installé les [blocs d’instruction du mBot](https://robot-educatif.info/2020/04/08/installer-les-blocs-du-mbot/)

## 2\. Capteur à ultrason

Le capteur à ultrason permet de calculer des distances. Il est composé de deux composants : 1 émetteur et 1 récepteur. Le son est envoyé par l’émetteur, lorsque celui ci atteint un obstacle, il rebondit et est capté par le récepteur. La vitesse du son est de 340 m/s. L’obtention de l’information est très rapide.

Ce capteur peut servir à calculer les distances mais également à faire de l’évitement d’obstacle, des détecteurs d’intrusion…

Il fonctionne dans pour des valeurs comprises entre 3 cm et 400 cm.

## 3\. Programme de détection d’intrusion

### 3.1 Programme de base

Ce programme est la première étape à la réalisation du détecteur. Nous allons utiliser le capteur à ultrason pour détecter les intrusions.

Le principe du programme est assez simple. Lors de la mise en route du mBot, il va mesurer la distance avec le premier obstacle et stocker la valeur dans une variable. Si la valeur de la mesure change, c’est qu’il y a eu une intrusion. Cette intrusion sera matérialisée par les LED en rouge, l’affichage des yeux en « colère » et l’émission d’un son pendant 0.25 pulsation.

![Image représentant le robot mBot en attente de détection](https://robot-educatif.info/wp-content/uploads/2020/04/int1-1-1024x871.png)

![Image représentant le robot mBot détectant une intrusion](https://robot-educatif.info/wp-content/uploads/2020/04/int2.png)

![Image représentant le programme de détection basique](https://robot-educatif.info/wp-content/uploads/2020/04/int3-1.png)

la temporisation de 3 secondes au départ permet juste de vous laisser le temps d’allumer le mBot et de le placer à l’endroit désiré.

2 variables sont utilisées. La première sert à stocker la valeur de référence de la zone à contrôler. La seconde permet de stocker la valeur si intrusion.

## 3.2 Ajout de fonctionnalité

Ce programme fonctionne mais comment savoir si une détection a eu lieu ?

Pour répondre à cette question, nous allons modifier le programme en stockant le nombre d’intrusion et en affichant une couleur différente si une intrusion a eu lieu.

![](https://robot-educatif.info/wp-content/uploads/2020/04/blocks-5-838x1024.png)

### 3.3 Refactorisation

Ce programme commence a être long et à devenir un peu illisible.

Nous allons utiliser les blocs pour réduire le programme principal et gagner en visibilité.

![](https://robot-educatif.info/wp-content/uploads/2020/04/int4.png)

## 3.4 Optimisation d’affichage

Le dernier détail est visuel. Lors d’une intrusion, le programme affiche le nombre d’intrusion sur la matrice LED mais en format décimal et ça n’est ni esthétique ni pertinent.

Nous allons donc procéder à une petite modification du code source pour modifier ce point.

1.  Cliquer sur le symbole </>
2.  Copier le code source affiché (CTRL + A puis CTRL + C)
3.  Appuyer sur l’onglet Arduino C
4.  Coller le code
5.  Le modifier le type de la variable intrusion de float à int

### 3.5 téléchargement du programme

Voici le lien pour télécharger le programme complet

[https://robot-educatif.info/programmes/detection\_intrusion.mblock](https://robot-educatif.info/programmes/detection_intrusion.mblock)

## 4\. Apprendre le développement

Je vous ai sélectionné une série de livre pour vous former avec le mBot et l’algorithme
