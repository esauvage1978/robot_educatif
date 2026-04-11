---
title: "Mon premier programme mBot"
headline: "Premier programme mBot : attendre le bouton, jouer une note"
description: "Créer un premier programme mBlock 5 pour le mBot : bouton carte, mélodie, enregistrement, connexion USB ou Bluetooth, firmware et téléversement — avec captures et fichier .mblock."
pubDate: "2020-04-09"
heroImage: "../../assets/mbot/mbot-hero.png"
updatedDate: "2026-04-02"
amazonPreset: mbot
categories:
  - "mBot"
  - "mBlock"
  - "Scratch"
  - "À partir de 8 ans"
relatedLinks:
  - title: "Premiers pas avec mBlock 5"
    href: "/premier-pas-avec-mblock-5/"
  - title: "Installer mBlock 5 (Windows)"
    href: "/installer-mblock-5-sous-windows-10/"
  - title: "Installer les blocs du mBot"
    href: "/installer-les-blocs-du-mbot/"
  - title: "Présentation du robot mBot"
    href: "/mbot-mon-premier-robot-educatif/"
  - title: "Défilement de texte sur la matrice LED"
    href: "/activite-mbot-faire-defiler-un-texte/"
faqSchema:
  - question: "Comment créer mon premier programme mBot dans mBlock 5 ?"
    answer: "En mode Appareil, choisissez le mBot, empilez le bloc « Lorsque le mBot démarre », un « attendre jusqu’à » avec la condition bouton carte pressé, puis « jouer la note ». Enregistrez le .mblock, connectez le robot (USB ou Bluetooth), testez en Live si besoin, puis téléversez."
  - question: "USB ou Bluetooth pour téléverser sur le mBot ?"
    answer: "Le Bluetooth convient pour tester en Live sans fil ; pour un téléversement ou une mise à jour firmware fiables, utilisez en général le câble USB avec piles chargées."
  - question: "Que faire si le téléversement échoue ?"
    answer: "Vérifiez connexion, bon appareil sélectionné, piles, bloc de démarrage présent et blocs bien imbriqués ; repassez le script bloc par bloc puis réessayez."
  - question: "À quoi sert le bloc « Lorsque le mBot (mcore) démarre » ?"
    answer: "C’est le déclencheur pour un programme qui tourne dans le robot : il correspond à la mise sous tension ou au reset de la carte."
  - question: "Comment enregistrer un projet mBlock ?"
    answer: "Fichier → Enregistrer sous, choisir un dossier et un nom avec l’extension .mblock ; utilisez ensuite l’icône disque pour un enregistrement rapide."
---

<p><strong>Premier programme mBot :</strong><br>
Dans mBlock 5 (mode <strong>Appareil</strong>, mBot sélectionné), empiler <strong>« Lorsque le mBot démarre »</strong> → <strong>« attendre jusqu’à »</strong> (bouton carte pressé) → <strong>« jouer la note »</strong>. Enregistrer le <code>.mblock</code>, <strong>connecter</strong> le robot, puis <strong>téléverser</strong> pour que le script tourne sans le PC.</p>

<p>Tutoriel validé sur mBlock 5 et mBot classique ; les libellés exacts des blocs peuvent varier (français / anglais, version du logiciel).</p>

<div class="article-toc" role="navigation" aria-label="Sommaire de l’article">
<p class="article-toc-title">Sommaire</p>
<ul>
<li><a href="#prerequis">Prérequis</a></li>
<li><a href="#construire">Construire le programme</a></li>
<li><a href="#enregistrer">Enregistrer le projet</a></li>
<li><a href="#connecter">Connecter le mBot</a></li>
<li><a href="#firmware">Microprogramme (firmware)</a></li>
<li><a href="#tester">Tester avant téléversement</a></li>
<li><a href="#televerser">Téléverser</a></li>
<li><a href="#fichier-projet">Fichier projet et poursuite</a></li>
<li><a href="#faq">FAQ</a></li>
</ul>
</div>

Ce tutoriel vous guide **pas à pas** : du premier bloc dans mBlock 5 jusqu’au **téléversement** dans le robot. Le programme reste volontairement **simple** : au démarrage, le mBot attend que vous appuyiez sur le **bouton de la carte** ; il joue alors une **note (mélodie courte)**. L’objectif est surtout de comprendre le **enchaînement** (ouvrir le logiciel → empiler les blocs → enregistrer → connecter → tester → envoyer dans le robot), pas encore d’algorithmique avancée.

<p>En prolongement : <a href="/logiciel-mblock-makeblock-mbot-quel-choisir/">quel logiciel mBlock choisir</a>, <a href="/mblock-bluetooth-erreurs-frequentes-depannage/">dépannage Bluetooth</a>, <a href="/activite-mbot-faire-defiler-un-texte/">matrice LED</a>.</p>

<div class="article-cta-row">
<a class="article-cta article-cta--primary" href="/premier-pas-avec-mblock-5/">Interface mBlock 5</a>
<a class="article-cta article-cta--secondary" href="/installer-les-blocs-du-mbot/">Blocs mBot</a>
</div>

<h2 id="prerequis">Prérequis</h2>

- Avoir un [robot éducatif mBot (Makeblock)](/mbot-mon-premier-robot-educatif/).
- [Installer mBlock 5](/installer-mblock-5-sous-windows-10/) sur l’ordinateur.
- Avoir parcouru l’[interface de mBlock 5](/premier-pas-avec-mblock-5/) (lutins, appareil, zone de script).
- [Ajouter les blocs mBot](/installer-les-blocs-du-mbot/) si ce n’est pas déjà fait.

Dans mBlock 5, passez en mode **Appareil** et sélectionnez le **mBot** (carte mCore) comme cible, pour voir les blocs orange « mBot ».

<h2 id="construire">Construire le programme</h2>

### 1. Point d’entrée : au démarrage du robot

Un programme destiné à tourner **dans** le robot doit commencer par le bloc d’événement **« Lorsque le mBot (mcore) démarre »** (catégorie **mBot** / démarrage). C’est le déclencheur qui correspond au **mise sous tension** ou au **reset** de la carte.

![Bloc « Lorsque le mBot (mcore) démarre », premier programme mBlock mBot](/capture/premier_programme/01-bloc-demarrage-mbot.png)

### 2. Attendre une action : le bouton carte

Sous ce bloc, ajoutez la structure **« attendre jusqu’à »** (catégorie **Contrôle**). Le **losange** à l’intérieur attend une **condition** vraie ou fausse : tant que la condition est fausse, le programme **reste** sur cette attente.

![Bloc mBlock « attendre jusqu’à »](/capture/premier_programme/02-attendre-jusqua.png)

### 3. Condition : bouton pressé

Dans le losange, insérez le bloc de **détection** **« sur appui du bouton Carte pressé ? »** (catégorie **Détection** / entrées). Ainsi, dès que l’utilisateur appuie sur le bouton présent sur la **carte mCore**, la condition devient vraie et la suite du script s’exécute.

![Condition bouton carte mBot mBlock](/capture/premier_programme/03-appui-bouton-carte.png)

### 4. Jouer une note

Enfin, sous « attendre jusqu’à », placez un bloc **« jouer la note … pendant … pulsations »** (catégorie **Afficher** / sons). Ici : **note C4** et **0,25 pulsation** — vous pouvez ensuite changer la note ou enchaîner plusieurs blocs pour une petite mélodie.

![Bloc jouer la note C4, programme mBot mBlock](/capture/premier_programme/04-jouer-note-c4.png)

**Comportement obtenu :** au démarrage, le robot ne fait rien d’autre qu’attendre ; **un appui** sur le bouton carte déclenche **une fois** la note. Sans boucle, le programme ne répète pas l’action tout seul.

**Équivalent logique (pour lecture) :**

```text
Au démarrage du mBot :
  attendre jusqu’à (bouton carte pressé)
    jouer la note C4 pendant 0,25 pulsation
```

<h2 id="enregistrer">Enregistrer le projet</h2>

Enregistrez souvent votre travail : **Fichier → Enregistrer sous…**, choisissez un dossier et un nom (extension **.mblock**).

![Barre d’outils mBlock — enregistrer](/capture/premier_programme/05-enregistrement-barre.png)

![Boîte Enregistrer sous — fichier .mblock](/capture/premier_programme/06-save-destination.png)

Les enregistrements suivants sont plus rapides avec le **bouton disque** (enregistrement rapide) dans la barre d’outils.

<h2 id="connecter">Connecter le mBot à l’ordinateur</h2>

Branchez le robot en **USB** (câble fourni) ou préparez le **jumelage Bluetooth** selon votre usage. Allumez le mBot (interrupteur **ON**).

Dans mBlock, cliquez sur **Connecter** : une fenêtre liste les appareils disponibles.

![Bouton Connecter mBlock — choix du robot mBot](/capture/premier_programme/07-connexion-dialogue.png)

Vous pouvez choisir la **connexion USB** ou **Bluetooth** (libellés selon version et pilotes).

![mBlock : choix connexion USB ou Bluetooth mBot](/capture/premier_programme/08-choix-connexion-usb-bluetooth.png)

Quand la connexion est établie, l’interface l’indique (exemples ci-dessous : Bluetooth puis USB).

![Connexion Bluetooth mBot établie dans mBlock](/capture/premier_programme/09-bluetooth-connecte.png)

![Connexion USB mBot établie dans mBlock](/capture/premier_programme/10-usb-connecte.png)

Le **Bluetooth** est pratique pour **essayer** le programme en direct (mode **Live**) sans câble ; pour une **mise à jour du firmware** ou un **téléversement** fiable, le **USB** est en général recommandé.

<h2 id="firmware">Microprogramme (firmware)</h2>

Si mBlock le propose, acceptez une **mise à jour du firmware** de la carte — **uniquement en USB**, robot branché et **piles chargées**. **Ne pas débrancher** le robot pendant l’opération.

![Firmware mBot à jour dans mBlock](/capture/premier_programme/11-firmware-a-jour.png)

<h2 id="tester">Tester avant d’envoyer dans le robot</h2>

Une fois connecté, vous pouvez **cliquer sur les blocs** dans la zone de script (ou utiliser le drapeau vert selon l’interface) pour **vérifier** le comportement **tant que le câble ou le Bluetooth** relie le PC au mBot. Corrigez les blocs si le résultat n’est pas celui attendu.

<h2 id="televerser">Téléverser le programme dans le mBot</h2>

Quand le test vous convient, utilisez **Téléverser** / **Télécharger vers l’appareil** (libellé variable selon la version) pour **écrire le programme dans la mémoire** du robot. Après coupure ou sortie de portée, le mBot pourra **rejouer** le script **sans** l’ordinateur.

![Téléversement du programme mBot depuis mBlock](/capture/premier_programme/12-televersement.png)

Si le téléversement **échoue**, un message d’erreur s’affiche : vérifiez la connexion, que le bon appareil est choisi, puis **repassez le script bloc par bloc** (blocs bien imbriqués, bloc de démarrage présent). Corrigez et réessayez.

<h2 id="fichier-projet">Fichier projet et poursuite</h2>

Vous pouvez **ouvrir directement** le projet décrit dans cet article :

- **[Télécharger `premier_programme.mblock`](/programmes/premier_programme.mblock)** (fichier mBlock 5).

Pour aller plus loin : faites **répéter** la mélodie tant que le bouton est maintenu, ou en boucle, en ajoutant des blocs **répéter** / **pour toujours** (attention aux comportements inattendus — testez au fur et à mesure).

## Aller plus loin avec Scratch

Pour progresser en **Scratch** et en **logique de programme**, des ouvrages grand public ou pédagogiques sur Scratch et la robotique peuvent compléter les tutoriels du site ; commencez par les activités mBot et Scratch déjà publiées sur le blog.

<h2 id="faq">FAQ</h2>

<h3 id="faq-premier-prog">Comment créer mon premier programme mBot dans mBlock 5 ?</h3>

<p>Mode <strong>Appareil</strong>, mBot ciblé : bloc démarrage → <strong>attendre jusqu’à</strong> (bouton carte) → <strong>jouer la note</strong>. Enregistrez, connectez, téléversez.</p>

<h3 id="faq-usb-bt">USB ou Bluetooth pour téléverser sur le mBot ?</h3>

<p><strong>USB</strong> pour firmware et téléversement fiables en général ; <strong>Bluetooth</strong> pratique pour des tests <strong>Live</strong>.</p>

<h3 id="faq-echec">Que faire si le téléversement échoue ?</h3>

<p>Vérifier connexion, appareil, piles, structure des blocs ; corriger et réessayer.</p>

<h3 id="faq-bloc-demarrage">À quoi sert le bloc « Lorsque le mBot (mcore) démarre » ?</h3>

<p>Il lance le script au démarrage du robot (alimentation ou reset).</p>

<h3 id="faq-save">Comment enregistrer un projet mBlock ?</h3>

<p><strong>Fichier → Enregistrer sous</strong>, extension <code>.mblock</code>, puis icône disque pour la suite.</p>

## Liens Amazon (recherche — affiliation)

- [mBot Makeblock](https://www.amazon.fr/s?k=mBot+Makeblock&tag=manuso06-21)

*Partenaire Amazon — commission possible sur achats éligibles, sans surcoût pour vous.*
