---
title: "Mon premier programme mBot"
description: "Créer un premier programme mBlock 5 pour le mBot : bouton carte, mélodie, enregistrement, connexion USB ou Bluetooth, firmware et téléversement — avec captures d’écran et fichier .mblock."
pubDate: "2020-04-09"
heroImage: "../../assets/mbot/mbot-hero.png"
updatedDate: "2026-03-29"
categories:
  - "mBot"
  - "mBlock"
  - "Scratch"
  - "À partir de 8 ans"
---

Ce tutoriel vous guide **pas à pas** : du premier bloc dans mBlock 5 jusqu’au **téléversement** dans le robot. Le programme reste volontairement **simple** : au démarrage, le mBot attend que vous appuyiez sur le **bouton de la carte** ; il joue alors une **note (mélodie courte)**. L’objectif est surtout de comprendre le **enchaînement** (ouvrir le logiciel → empiler les blocs → enregistrer → connecter → tester → envoyer dans le robot), pas encore d’algorithmique avancée.

## Prérequis

- Avoir un [robot éducatif mBot (Makeblock)](/mbot-mon-premier-robot-educatif/).
- [Installer mBlock 5](/installer-mblock-5-sous-windows-10/) sur l’ordinateur.
- Avoir parcouru l’[interface de mBlock 5](/premier-pas-avec-mblock-5/) (lutins, appareil, zone de script).
- [Ajouter les blocs mBot](/installer-les-blocs-du-mbot/) si ce n’est pas déjà fait.

Dans mBlock 5, passez en mode **Appareil** et sélectionnez le **mBot** (carte mCore) comme cible, pour voir les blocs orange « mBot ».

## Construire le programme

### 1. Point d’entrée : au démarrage du robot

Un programme destiné à tourner **dans** le robot doit commencer par le bloc d’événement **« Lorsque le mBot (mcore) démarre »** (catégorie **mBot** / démarrage). C’est le déclencheur qui correspond au **mise sous tension** ou au **reset** de la carte.

![Bloc « Lorsque le mBot (mcore) démarre »](/capture/premier_programme/01-bloc-demarrage-mbot.png)

### 2. Attendre une action : le bouton carte

Sous ce bloc, ajoutez la structure **« attendre jusqu’à »** (catégorie **Contrôle**). Le **losange** à l’intérieur attend une **condition** vraie ou fausse : tant que la condition est fausse, le programme **reste** sur cette attente.

![Bloc « attendre jusqu’à »](/capture/premier_programme/02-attendre-jusqua.png)

### 3. Condition : bouton pressé

Dans le losange, insérez le bloc de **détection** **« sur appui du bouton Carte pressé ? »** (catégorie **Détection** / entrées). Ainsi, dès que l’utilisateur appuie sur le bouton présent sur la **carte mCore**, la condition devient vraie et la suite du script s’exécute.

![Condition « sur appui du bouton Carte pressé ? »](/capture/premier_programme/03-appui-bouton-carte.png)

### 4. Jouer une note

Enfin, sous « attendre jusqu’à », placez un bloc **« jouer la note … pendant … pulsations »** (catégorie **Afficher** / sons). Ici : **note C4** et **0,25 pulsation** — vous pouvez ensuite changer la note ou enchaîner plusieurs blocs pour une petite mélodie.

![Bloc « jouer la note C4 pendant 0,25 pulsations »](/capture/premier_programme/04-jouer-note-c4.png)

**Comportement obtenu :** au démarrage, le robot ne fait rien d’autre qu’attendre ; **un appui** sur le bouton carte déclenche **une fois** la note. Sans boucle, le programme ne répète pas l’action tout seul.

**Équivalent logique (pour lecture) :**

```text
Au démarrage du mBot :
  attendre jusqu’à (bouton carte pressé)
    jouer la note C4 pendant 0,25 pulsation
```

## Enregistrer le projet

Enregistrez souvent votre travail : **Fichier → Enregistrer sous…**, choisissez un dossier et un nom (extension **.mblock**).

![Barre d’outils — enregistrer](/capture/premier_programme/05-enregistrement-barre.png)

![Boîte de dialogue — nom et emplacement du fichier](/capture/premier_programme/06-save-destination.png)

Les enregistrements suivants sont plus rapides avec le **bouton disque** (enregistrement rapide) dans la barre d’outils.

## Connecter le mBot à l’ordinateur

Branchez le robot en **USB** (câble fourni) ou préparez le **jumelage Bluetooth** selon votre usage. Allumez le mBot (interrupteur **ON**).

Dans mBlock, cliquez sur **Connecter** : une fenêtre liste les appareils disponibles.

![Bouton Connecter — fenêtre de choix du robot](/capture/premier_programme/07-connexion-dialogue.png)

Vous pouvez choisir la **connexion USB** ou **Bluetooth** (libellés selon version et pilotes).

![Choix USB ou Bluetooth](/capture/premier_programme/08-choix-connexion-usb-bluetooth.png)

Quand la connexion est établie, l’interface l’indique (exemples ci-dessous : Bluetooth puis USB).

![Connexion Bluetooth établie](/capture/premier_programme/09-bluetooth-connecte.png)

![Connexion USB établie](/capture/premier_programme/10-usb-connecte.png)

Le **Bluetooth** est pratique pour **essayer** le programme en direct (mode **Live**) sans câble ; pour une **mise à jour du firmware** ou un **téléversement** fiable, le **USB** est en général recommandé.

## Microprogramme (firmware)

Si mBlock le propose, acceptez une **mise à jour du firmware** de la carte — **uniquement en USB**, robot branché et **piles chargées**. **Ne pas débrancher** le robot pendant l’opération.

![Firmware à jour](/capture/premier_programme/11-firmware-a-jour.png)

## Tester avant d’envoyer dans le robot

Une fois connecté, vous pouvez **cliquer sur les blocs** dans la zone de script (ou utiliser le drapeau vert selon l’interface) pour **vérifier** le comportement **tant que le câble ou le Bluetooth** relie le PC au mBot. Corrigez les blocs si le résultat n’est pas celui attendu.

## Téléverser le programme dans le mBot

Quand le test vous convient, utilisez **Téléverser** / **Télécharger vers l’appareil** (libellé variable selon la version) pour **écrire le programme dans la mémoire** du robot. Après coupure ou sortie de portée, le mBot pourra **rejouer** le script **sans** l’ordinateur.

![Téléversement du programme](/capture/premier_programme/12-televersement.png)

Si le téléversement **échoue**, un message d’erreur s’affiche : vérifiez la connexion, que le bon appareil est choisi, puis **repassez le script bloc par bloc** (blocs bien imbriqués, bloc de démarrage présent). Corrigez et réessayez.

## Fichier projet et poursuite

Vous pouvez **ouvrir directement** le projet décrit dans cet article :

- **[Télécharger `premier_programme.mblock`](/programmes/premier_programme.mblock)** (fichier mBlock 5).

Pour aller plus loin : faites **répéter** la mélodie tant que le bouton est maintenu, ou en boucle, en ajoutant des blocs **répéter** / **pour toujours** (attention aux comportements inattendus — testez au fur et à mesure).

## Aller plus loin avec Scratch

Pour progresser en **Scratch** et en **logique de programme**, des ouvrages grand public ou pédagogiques sur Scratch et la robotique peuvent compléter les tutoriels du site ; commencez par les activités mBot et Scratch déjà publiées sur le blog.
