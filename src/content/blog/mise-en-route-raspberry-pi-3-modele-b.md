---
title: "Mise en route Raspberry Pi 3 Modèle B"
description: "Dans cet article je vais vous présenter une manière d’effectuer la mise en route de Raspberry Pi 3 Modèle B. Mais c’est quoi au fait ? Le rasberry Pi est un nano ordinateur un peu plus grand qu’une carte de crédit et coûtant au environ de 35€. J’en parle sur ce site car, tout comme […]"
pubDate: "2020-05-01"
heroImage: "../../assets/blog-heroes/hero-raspberry.png"
updatedDate: "2023-04-09"
---

Dans cet article je vais vous présenter une manière d’effectuer la mise en route de Raspberry Pi 3 Modèle B.

Mais c’est quoi au fait ? Le rasberry Pi est un nano ordinateur un peu plus grand qu’une carte de crédit et coûtant au environ de 35€.

J’en parle sur ce site car, tout comme l’Arduino, il est à la base de nombreux robots mais pas que. Il permet également de faire une retro console ou une borne arcade, un système de vidéo surveillance, un NAS, un serveur Web, un VPN, de la domotique… bref, vous l’aurez compris, les possibilités sont énormes et très diversifiées.

## 1\. pré requis

Avoir en sa possession le [Raspberry](https://amzn.to/3bTGMWL?tag=manuso06-21) et une [carte SD 32Go](https://amzn.to/35q6Qq2?tag=manuso06-21)

Des kits complets comprenant le Rasberry, la carte SD, l’alimentation, un dissipateur et une coque de protection existent comme celui de chez [LABISTS](https://amzn.to/2KR8Tda?tag=manuso06-21)

## 2\. Distribution Rasbian

Le Pi 3 nécessite un système d’exploitation pour fonctionner. Nous allons utiliser la distribution officielle pour les Pi, à savoir Rasbian.

A partir du lien ci-dessous, récupérez l’application **Raspberry Pi Imager**

https://www.raspberrypi.org/downloads/

Installez celle-ci sur votre système d’exploitation, insérez la carte SD sur votre ordinateur et exécutez l’application.

![Raspberry Pi Imager : Mise en route](https://robot-educatif.info/wp-content/uploads/2020/05/inst1.png)

Le premier bouton **« CHOOSE OS »** va vous permettre de sélectionner le système d’exploitation qui sera sur votre Raspberry Pi

![Raspberry Pi Imager : choix de l'OS](https://robot-educatif.info/wp-content/uploads/2020/05/inst2.png)

J’ai suivi les recommendations et j’ai sélectionné le Raspbian.

Le second bouton **« CHOOSE SD CARD »** permet de choisir la destination de l’installation. La liste doit présenter la carte SD introduite plus tôt.

![Raspberry Pi Imager : choix de la sd card](https://robot-educatif.info/wp-content/uploads/2020/05/inst3.png)

Maintenant, il ne vous reste plus qu’à installer le système d’exploitation sur la carte SD en appuyant sur le bouton **WRITE**

![Raspberry Pi Imager : installation](https://robot-educatif.info/wp-content/uploads/2020/05/inst4.png)

L’installation dure quelques minutes et à la fin vous devrait avoir cette écran

![Raspberry Pi Imager : Fin d'installation](https://robot-educatif.info/wp-content/uploads/2020/05/inst5.png)

Vous pouvez maintenant retirer la carte SD et la mettre dans le port sur le Raspberry Pi.

## 2\. Première mise en route du Raspberry Pi

Lors du premier démarrage, le Raspberry lance un utilitaire pour le paramétrer.

La première fenêtre vous demandera de choisir le pays, la langue et le fuseau horaire. Vous allez pouvoir utiliser le Rasberry dans votre langue.

La seconde fenêtre vous demandera de changer le mot de passe de l’utilisateur ‘**pi**‘ qui par défaut est à ‘**raspberry**‘.

La troisième vous demande de régler l’écran, à savoir plein écran ou non.

La quatrième permet de configurer le wifi. Si vous ne souhaitez pas le connecter, vous pouvez appuyer sur le bouton **skip**.

La dernière fenêtre vous demande de vérifier les mises à jour. Il est conseillé de le faire.

A la fin de la procédure, le Rasberry demandera à redémarrer. Il est maintenant opérationnel.

## 3\. Activer VNC Server

VNC est un système vous permettant de prendre la main à distance sur le Raspberry Pi par un autre ordinateur. Cela vous permettra d’avoir l’environnement graphique sans mettre d’écran sur le Raspberry.

Les avantages d’utiliser VNC sont doubles : Avoir le reflet exact de l’écran du Raspberry et faire des copier / coller de texte depuis votre pc.

A partir du menu principal, allez dans **préférences** \> **Configuration du Raspberry Pi** > Onglet **interfaces** et cocher la case **Activé** de **VNC**

![](https://robot-educatif.info/wp-content/uploads/2020/05/inst6.png)

## 4\. Activer le SSH

Le ssh permet de se connecter en ligne de commande au Rasberry Pi de façon sécurisé. Pour le client, j’utilise l’utilitaire Putty.

A partir du menu principal, allez dans **préférences** \> **Configuration du Raspberry Pi** > Onglet **interfaces** et cocher la case **Activé** de **SSH**

![](https://robot-educatif.info/wp-content/uploads/2020/05/inst6.png)

## 5\. Activer le FTP

L’installation est facile car il suffit de suivre la procédure ci-dessous

sudo apt-get install vsftpd

Appuyez sur `[O]`à la question **Souhaitez-vous continuer ?**.

A la fin de l’installation, nous allons configurer le serveur FTP en modifiant les fichiers de configuration.

Depuis votre terminal, entrez

sudo nano /etc/vsftpd.conf

Maintenant, enlevez le # devant les lignes suivantes :

local\_unmask=022
Write\_enabled=YES
Ascii\_upload\_enabled=YES
Ascii\_download\_enabled=YES

Puis faites `[ctrl]` + `[x]` puis `[o]` puis `[Entrée]`

Voilà, le serveur est près, pour le côté client, je vous conseille l’application filezila.

Pour conclure, j’espère que la mise en route de votre Raspberry Pi c’est bien effectué et à bientôt pour d’autre article sur ce micro ordinateur.
