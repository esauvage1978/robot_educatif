---
title: "Mon premier programme sur mBot avec mBlock 5"
description: "Tutoriel pas à pas : installer mBlock 5 (PC ou web), connecter le mBot, modes Live et Upload, et réaliser un premier programme avec les blocs. Mise à jour pour les versions actuelles du logiciel."
pubDate: "2021-09-18"
updatedDate: "2026-03-27"
heroImage: "../../assets/mbot/mbot-hero.png"
amazonPreset: mbot
relatedLinks:
  - title: "Guide mBlock 5 pour débutants : interface, blocs et premier script"
    href: "/guide-mblock-5-debutant/"
  - title: "Guide mBlock 5 intermédiaire : capteurs, variables et logique"
    href: "/guide-mblock-5-intermediaire/"
  - title: "Comment installer mBlock 5 sur PC, Mac, navigateur et mobile"
    href: "/comment-installer-mblock-5/"
  - title: "mBot, mon premier robot éducatif"
    href: "/mbot-mon-premier-robot-educatif/"
  - title: "mBot2 de Makeblock : le robot éducatif pour apprendre la robotique"
    href: "/mbot2-de-makeblock-le-robot-educatif-pour-apprendre-la-robotique/"
---

Ce guide t’accompagne pour passer de **“mBot allumé”** à **“mBot programmé”** avec **mBlock 5**, l’environnement officiel basé sur Scratch. Il est mis à jour pour les **versions récentes** du logiciel (dont la branche **mBlock 5 V5.x** pour ordinateur, au **2025**).

Pour télécharger et installer le logiciel selon ton ordinateur (Windows, Mac, navigateur, mobile), suis d’abord le guide dédié : [Comment installer mBlock 5 sur PC, Mac, navigateur et mobile](/comment-installer-mblock-5/).

Si tu n’as pas encore monté ou testé le robot, commence par l’article [mBot, mon premier robot éducatif](/mbot-mon-premier-robot-educatif/).

> Cet article contient des liens affiliés Amazon. En tant que Partenaire Amazon, je peux percevoir une commission sur les achats éligibles, sans coût supplémentaire pour vous.

## Quel logiciel utiliser en 2025–2026 ?

Makeblock propose aujourd’hui principalement **mBlock 5** :

| Option | À retenir |
|--------|-----------|
| **Application PC (recommandée pour débuter)** | Windows (64 bits) ou macOS, installation locale, connexion USB / Bluetooth / 2,4 GHz selon ton modèle. |
| **Version web** | Éditeur dans le navigateur ([IDE en ligne](https://ide.mblock.cc/)) ; il faut aussi installer **mLink** sur l’ordinateur pour que le navigateur puisse parler au robot. |
| **Tablette / mobile** | Apps mBlock selon ton appareil ; pratique en mobilité, un peu moins confortable pour les premiers réglages. |
| **mBlock 3** | **N’est plus maintenu** ; privilégie **mBlock 5** pour un mBot récent et les tutoriels actuels. |

La page officielle de téléchargement (versions PC, mLink, applications) est **[mblock.cc — téléchargements](https://www.mblock.cc/fr-fr/download/)**.  
À la rédaction de cette mise à jour, la version **PC** desktop indiquée sur le site est la **V5.6.0** (sortie **8 avril 2025**) : **Windows 64 bits** (fichiers `.exe` / `.msi`) et **macOS 10.12+**, avec un installeur dédié **Apple M1/M2** (architecture ARM64). Les numéros exacts peuvent évoluer : garde l’habitude de reprendre le fichier le plus récent sur la page officielle.

### Version web + mLink

Si tu codes dans le navigateur, installe **mLink** pour ton système (Windows, Mac, Linux, Chromebook — liens sur la [même page téléchargement](https://www.mblock.cc/fr-fr/download/)). Sans mLink, la version web ne pourra généralement pas **connecter** le mBot.

## Avant de brancher : alimentation et câble

- **Piles ou batterie** : le mBot doit être **allumé** pendant la programmation.  
- **Câble USB** : utilise de préférence le câble fourni ; un mauvais câble (charge seule) empêche souvent la connexion.

## Connecter le mBot à mBlock 5

Tu peux connecter le mBot ainsi (selon **la version** de ton kit) :

1. **USB** — brancher le câble sur le PC, allumer le robot. Dans mBlock 5 : onglet **Périphériques** (Devices), **+**, choisir **mBot** dans la bibliothèque, **Connecter** → onglet **USB**.  
2. **Bluetooth 4.0** — uniquement si ton modèle est **Bluetooth** ; sur Windows, un dongle **Bluetooth 4.0** peut être nécessaire.  
3. **Module 2,4 GHz** — dongle USB côté PC et module sur la carte ; **sans appairage**. **Attention** : la **mise à jour du firmware** ne se fait en général **pas** en 2,4 GHz : passe par **USB** si mBlock te demande une mise à jour.

Référence utile côté constructeur : [Programmer mBot avec mBlock 5 (aide Makeblock)](https://support.makeblock.com/hc/en-us/articles/1500003954802-Program-mBot-with-mBlock-5).

## Mode « Live » et mode « Upload »

Deux modes importants :

- **Live** : le programme s’exécute **tant que** le robot reste connecté au PC. Idéal pour **tester** et déboguer.  
- **Upload** : le programme est **envoyé dans la carte** du mBot ; le robot peut continuer à tourner **débranché** (selon le programme).

En pratique : commence en **Live** pour valider ton idée, puis passe en **Upload** pour garder le comportement sans câble.

## Premier programme : « avancer deux secondes »

Objectif : au clic sur le drapeau vert, le mBot **avance** quelques secondes puis **s’arrête**.

1. Ouvre **mBlock 5**, ajoute le périphérique **mBot** et **connecte-le** (USB de préférence pour la première fois).  
2. Choisis le mode **Live**.  
3. Dans la zone de script, assemble par exemple :  
   - **Événement** : « **quand le drapeau vert est cliqué** » ;  
   - **Moteurs** (blocs mBot) : « **régler la vitesse du moteur M1 / M2** » ou équivalent pour avancer (selon l’orientation de ton robot, tu peux devoir **inverser** un côté ; c’est normal sur un premier essai) ;  
   - **Contrôle** : un bloc **attendre 2 secondes** ;  
   - puis **arrêter** les moteurs (vitesse **0**).  
4. Clique sur le **drapeau vert** dans l’interface : observe le robot. Ajuste les vitesses si le trajet n’est pas droit.

**Astuce** : un clic droit sur un bloc → **Aide** donne souvent la signification exacte dans ta version de mBlock.

**Étape suivante** : refais le même enchaînement en mode **Upload**, téléverse (*upload*), débranche le câble (ou éteins/rallumes), et vérifie que le robot replay le comportement en autonome.

## Si ça ne répond pas

- **Pilotage usine** : certains mBot démarrent avec un **programme par défaut** (ligne, télécommande). Reprogramme en **Upload** ou reconnecte-toi en **Live** pour reprendre la main.  
- **Pilote / port COM** : sous Windows, vérifie dans le gestionnaire de périphériques que la carte est bien reconnue.  
- **Firmware** : si mBlock propose une **mise à jour**, fais-la en **USB** (pas en 2,4 GHz).  
- **Version du logiciel** : si un tutoriel ancien ne correspond plus aux menus, compare avec la **[documentation Makeblock](https://support.makeblock.com/)** ou la page **[FAQ / téléchargements](https://www.mblock.cc/fr-fr/download/)**.

## Liens utiles (non affiliés)

- Téléchargements mBlock 5 et mLink : **[mblock.cc/fr-fr/download](https://www.mblock.cc/fr-fr/download/)**  
- IDE web : **[ide.mblock.cc](https://ide.mblock.cc/)**

## Matériel et idées d’approfondissement (Amazon, affiliation)

- <a href="https://www.amazon.fr/s?k=Makeblock+mBot&tag=manuso06-21" target="_blank" rel="noopener sponsored">Rechercher le mBot sur Amazon</a>  
- <a href="https://www.amazon.fr/s?k=mBot+Makeblock+accessoires&tag=manuso06-21" target="_blank" rel="noopener sponsored">Accessoires et extensions mBot</a>  
- <a href="https://www.amazon.fr/s?k=Scratch+robotique+livre+enfant&tag=manuso06-21" target="_blank" rel="noopener sponsored">Livres Scratch / robotique pour aller plus loin</a>

## Conclusion

Avec **mBlock 5** à jour, une connexion **fiable** (souvent **USB** au début) et les modes **Live** puis **Upload**, tu as tout ce qu’il faut pour enchaîner sur des capteurs, des boucles et de vrais petits défis robotiques. Bonne programmation !
