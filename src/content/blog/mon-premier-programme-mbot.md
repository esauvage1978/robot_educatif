---
title: "Mon premier programme mBot"
description: "Dans cet article nous allons concevoir notr premier programme pour le robot éducatif mBot. De la conception au téléversement."
pubDate: "2020-04-09"
heroImage: "../../assets/mbot/mbot-hero.png"
updatedDate: "2020-04-21"
categories:
  - "mBot"
  - "mBlock"
  - "Scratch"
  - "À partir de 8 ans"
---
Nous allons faire un premier programme très basique pour notre mBot. Celui ci consistera à jouer une mélodie après avoir appuyé sur le bouton de la carte. Le but n’est pas de vous apprendre l’algorithme mais de vous expliquer le processus de création d’un programme jusqu’au téléversement dans le robot.

## 1\. pré requis

Avoir en sa possession le [robot éducatif mBot de chez MakeBlock](https://robot-educatif.info/2020/04/06/mbot-mon-premier-robot-educatif/)

[![achetez le robot éducatif mBot sur Amazon](https://robot-educatif.info/wp-content/uploads/2020/04/banniere_mbot.png)](https://amzn.to/3bVU8RR?tag=manuso06-21)

[Installer l’application mBlock 5](https://robot-educatif.info/2020/04/07/installer-mblock-5-sous-windows-10/)

S’être familiariser avec l’[interface graphique de mBlock 5](https://robot-educatif.info/2020/04/07/premier-pas-avec-mblock-5/)

Avoir installé les [blocs d’instruction du mBot](https://robot-educatif.info/2020/04/08/installer-les-blocs-du-mbot/)

## 2\. Le programme

Nous allons donc ouvrir l’application mBlock 5 et sélectionner notre robot dans l’onglet **Appareil**.

Un programme **doit** commencer par **Lorsque le mBot(mcore) démarre**

![Premier programme, démarrage](https://robot-educatif.info/wp-content/uploads/2020/04/pg1-1.png)

A partir de la catégorie **contrôle**, déplacez la structure conditionnelle **attendre jusqu’à** vers la zone de script. Celle-ci doit être placée sous le bloc déposé précédemment.

![Ajout du bloc conditionnel](https://robot-educatif.info/wp-content/uploads/2020/04/pg2-1.png)

le **losange orange** signifie que ce bloc attend une **condition.** Une condition peut avoir 2 valeurs, **vrai** ou **faux**. Les instructions qui seront dessous seront exécutées lorsque la condition aura la valeur **vrai**.

A partir de la catégorie **Détection**, remplir la condition avec le bloc **sur appui du bouton Carte pressé ?**.

![Ajout de la condition](https://robot-educatif.info/wp-content/uploads/2020/04/pg3-1-1024x544.png)

Pour terminer, dans la catégorie Afficher, déplacez le bloc **jouer la note C4 pendant 0.25 pulsations** sous la structure conditionnelle. Vous pouvez reproduire cette mélodie.

![Ajout de la mélodie](https://robot-educatif.info/wp-content/uploads/2020/04/pg6.png)

Pour résumer ce programme : Au démarrage du robot, lorsque la touche du bouton carte est pressée la mélodie est jouée une fois. Sans aucune autre action, le robot ne fera rien d’autre.

## 3\. Sauvegarder son programme

Nous allons maintenant enregistrer le programme sur notre ordinateur. Même si celui-ci n’est pas très élaboré, Je vous conseille fortement de prendre l’habitude de faire des enregistrements fréquents. Que ce soit sur mBlock mais également sur tous les logiciels que vous utilisez.

![Enregistrement du programme](https://robot-educatif.info/wp-content/uploads/2020/04/save.png)

Enregistrer sur votre ordinateur

![Destination de l'enregistrement](https://robot-educatif.info/wp-content/uploads/2020/04/save1.png)

Choix de l’emplacement et du nom du fichier

![Enregistrement rapide](https://robot-educatif.info/wp-content/uploads/2020/04/save2.png)

Enregistrement rapide

Par la suite vous allez pouvoir faire un enregistrement rapide en appuyant sur le bouton **enregistrer**

### 3.1 Connexion du mBot

Nous allons maintenant téléverser (injecter) le programme dans notre [mBot](https://amzn.to/34eEFtr?tag=manuso06-21).

Reliez le robot mBot à l’ordinateur à l’aide du câble USB.

Mettre en route votre [mBot](https://amzn.to/34eEFtr?tag=manuso06-21) en mettant l’interrupteur sur **on**

A partir de l’application mBlock 5 , appuyez sur le bouton **connecter**

![Connexion du robot mBot](https://robot-educatif.info/wp-content/uploads/2020/04/conn1.png)

Connexion du mBot

Vous avez le choix entre une connexion filaire avec le câble USB ou une connexion en Bluetooth.

![Connexion en usb](https://robot-educatif.info/wp-content/uploads/2020/04/conn4-1.png)

Le bluetooth sera surtout utilisé dans la phase de création du programme afin de tester (débogger) le programme en live (temps réel).

![Connexion Bluetooth effectuée](https://robot-educatif.info/wp-content/uploads/2020/04/conn3-1.png)

Connexion Bluetooth effectuée

![Connexion USB effectuée](https://robot-educatif.info/wp-content/uploads/2020/04/conn5-1.png)

Connexion USB effectuée

### 3.2 Micro-programme ou firmware

Il se peut qu’une mise à jour du microprogramme soit nécessaire. Il est conseillé de la faire. Cependant cette connexion doit obligatoirement être effectuée avec un câble USB.

ATTENTION, lors de la mise à jour du microprogramme, il ne faut pas débrancher le robot. Veillez également à ce que les piles soient chargées.

![Mise à jour du firmware terminée](https://robot-educatif.info/wp-content/uploads/2020/04/pg7.png)

## 4\. Teste (deboggage) du programme

Une fois le robot connecté, testons notre programme en cliquant sur le bloc présent dans l’espace de travail

![Test du programme](https://robot-educatif.info/wp-content/uploads/2020/04/conn4-1024x223.png)

## 5\. Téléverser le programme

Nous allons maintenant téléverser le programme dans le mBot

![Téléversement du programme](https://robot-educatif.info/wp-content/uploads/2020/04/pg4.png)

Une fois connecté, appuyez sur le bouton **téléverser** et **télécharger**

### 5.1. Erreur dans le programme

Si une erreur est présente, le message suivant sera affiché lors du téléversement du programme

![Erreur lors du téléversement du programme](https://robot-educatif.info/wp-content/uploads/2020/04/pg5.png)

Il vous faudra alors reprendre celui-ci et le corriger.

## 6\. Améliorer le programme

Actuellement la mélodie ne sera jouée qu’une seule fois. Je vous invite donc à trouver comment faire pour le jouer à l’infini dès que le bouton est pressé.

La solution est téléchargeable ci-dessous

[https://robot-educatif.info/programmes/premierProgramme.mblock](https://robot-educatif.info/programmes/premierProgramme.mblock)

## 7\. Apprendre scratch

Je vous ai sélectionné une série de livre pour vous former avec scratch et l’algorithme.
