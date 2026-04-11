---
title: "Quel logiciel pour robot Makeblock : mBlock (app), Web, Python ?"
headline: "Quel logiciel pour robot Makeblock : mBlock (app), Web, Python ?"
description: "mBlock 5 : application bureau, version web, mode Python — quand utiliser quoi pour mBot, mBot2, Codey Rocky et CyberPi. Tableau comparatif, captures et liens vers les tutoriels du site."
pubDate: "2026-03-30"
updatedDate: "2026-03-31"
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
amazonPreset: mbot
categories:
  - "mBlock"
  - "Makeblock"
  - "Installation"
  - "Programmation"
relatedLinks:
  - title: "Installer mBlock 5 sous Windows 10"
    href: "/installer-mblock-5-sous-windows-10/"
  - title: "Premiers pas avec mBlock 5"
    href: "/premier-pas-avec-mblock-5/"
  - title: "Erreurs fréquentes Bluetooth / mBlock"
    href: "/mblock-bluetooth-erreurs-frequentes-depannage/"
  - title: "Installer les blocs du mBot"
    href: "/installer-les-blocs-du-mbot/"
---

**mBlock** est l’environnement de référence pour programmer les robots **Makeblock** en **blocs** (même esprit que **Scratch**), puis en **texte** (**Python**) sur les modèles et versions qui le proposent. La difficulté, c’est qu’il existe **plusieurs façons d’y accéder** : logiciel **installé** sur l’ordinateur, **version web** dans le navigateur, et parfois **éditeur Python** intégré — ce n’est **pas équivalent** : tout dépend si vous **branchez un robot réel**, si vous avez les **droits administrateur**, ou si vous travaillez **sans matériel** un jour donné.

Ci-dessous : **l’interface mBlock en ligne** (navigateur), proche de ce que vous voyez aussi dans l’application bureau — mêmes catégories de blocs, même zone de script.

![Interface de mBlock en ligne (IDE web) : scène, lutins, blocs et zone de script.](/images/blog/guides-2026/mblock-online-wikimedia.png)

> **Crédit image :** capture d’écran de l’IDE [mBlock en ligne](https://ide.mblock.cc/) — Matteo Ruffoni, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:MblockOnline.png), licence [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.fr).

## Vue d’ensemble : trois « portes » vers le même univers

| | **Application (bureau)** | **mBlock Web (navigateur)** | **Python dans mBlock** |
| --- | --- | --- | --- |
| **Idéal si…** | vous **connectez** un robot (USB / Bluetooth), vous mettez à jour le **firmware**, vous voulez le **maximum de fiabilité**. | l’école **interdit** l’installation, atelier **ponctuel**, démo rapide. | les élèves **maîtrisent** déjà les blocs et passent à la **syntaxe** (collège / lycée). |
| **Limites** | nécessite **téléchargement** et parfois droits **admin** (Windows). | **Bluetooth** parfois **instable** selon navigateur et machine ; pas toujours le même confort que l’app. | dépend du **modèle** (mBot2, CyberPi, etc.) et de la **version** ; à réserver quand la **logique** des blocs est comprise. |

Ce n’est **pas** un choix unique pour la vie : beaucoup utilisent l’**app** à la maison ou au labo, et le **Web** sur les postes verrouillés.

## 1. Application mBlock (Windows / macOS / Chromebook / mobile selon version)

**À privilégier** pour tout ce qui touche au **matériel réel** :

- **connexion** du robot en **USB** ou **Bluetooth** ;
- **téléversement** du programme dans la carte du robot ;
- **mise à jour du firmware** (souvent **impossible** ou déconseillée sans USB — voir la doc Makeblock pour votre modèle) ;
- **pilotes** et **stabilité** : moins de surprises qu’un navigateur qui change souvent.

**Sur ce site**, enchaînez les guides [installer mBlock 5 sous Windows](/installer-mblock-5-sous-windows-10/), puis [premiers pas avec mBlock 5](/premier-pas-avec-mblock-5/) pour reconnaître **Appareil**, **blocs**, **zone de script** et **connexion**.

## 2. mBlock dans le navigateur (Web)

La version **web** ([mBlock en ligne](https://ide.mblock.cc/) et équivalents selon période) est **très utile** quand :

- l’ordinateur de la classe **interdit** l’installation de logiciels ;
- vous faites un **atelier ponctuel** sans droits administrateur ;
- vous voulez montrer des **blocs** sans sortir le robot (scène à l’écran).

**Points de vigilance** : le **Bluetooth** peut être **plus capricieux** que dans l’application (droits du navigateur, pile, pilote). En cas de déconnexions ou d’appareil introuvable, suivez [dépannage Bluetooth / mBlock](/mblock-bluetooth-erreurs-frequentes-depannage/).

## 3. Python dans mBlock

Le passage à **Python** arrive souvent **après** une phase **blocs** : intérêt **pédagogique** (syntaxe, indentations, variables) et **continuité** avec l’enseignement secondaire. Ce n’est **pas** le même public ni le même rythme que le collage de blocs au début.

Selon **modèle** (**mBot2**, **CyberPi**, **Codey Rocky**, etc.) et **version** du logiciel, l’accès au mode texte et les **API** disponibles varient — lisez la doc du produit et testez sur **un** robot avant de généraliser en classe. Pour le contexte matériel : [mBot2](/mbot2-de-makeblock-le-robot-educatif-pour-apprendre-la-robotique/), [CyberPi](/decouvrez-makeblock-cyberpi-une-carte-de-developpement-electronique-polyvalente/).

## 4. Extensions et blocs mBot (moteurs, capteurs)

Sans **bonne configuration**, les blocs **moteurs** ou **capteurs** du **mBot** n’apparaissent pas : il faut **ajouter l’appareil** ou l’**extension** correspondante dans mBlock. Procédure pas à pas : [installer les blocs du mBot](/installer-les-blocs-du-mbot/).

## 5. Scratch officiel vs mBlock : ne pas tout mélanger

- **Scratch** ([site officiel](https://scratch.mit.edu/)) : projets **à l’écran**, partage en ligne, écosystème **généraliste**.
- **mBlock** : pensé pour l’**écosystème Makeblock** (robots, cartes, capteurs) avec des **blocs dédiés** et la **connexion** au matériel.

Pour un atelier **robot Makeblock**, on part presque toujours de **mBlock**, pas de Scratch seul.

## 6. Mini-FAQ

**Je dois n’en choisir qu’un ?**  
Non. Utilisez l’**application** dès qu’un **robot réel** est sur la table ; gardez le **Web** pour les postes où vous ne pouvez rien installer ; n’ouvrez le **Python** que lorsque les **blocs** sont **compris**, pas seulement recopiés.

**C’est quoi « Live » vs téléverser ?**  
En **Live** (connecté), vous **testez** souvent en direct. Le **téléversement** envoie le programme **dans** le robot pour qu’il tourne **sans** le câble — utile une fois le script validé.

**mBlock 5 et mBlock 3 : pareil ?**  
Sur les tutoriels récents du site, on part de **mBlock 5** (interface actuelle type Scratch 3). Si vous ouvrez un très vieux tutoriel, les libellés peuvent différer légèrement.

**« Minecraft mblock » ou Minecraft et mBlock : c’est pareil ?**  
**Non.** **Minecraft** est un **jeu** de construction en blocs 3D. **mBlock** est le **logiciel de programmation** Makeblock (blocs de code, robots **mBot**, etc.). Si une recherche ne retourne pas le bon outil, ajoutez **Makeblock** ou **mBot** à votre requête.

## Liens Amazon (affiliation)

- [Robot Makeblock mBot](https://www.amazon.fr/s?k=mBot+Makeblock&tag=manuso06-21)
- [mBot2 Makeblock](https://www.amazon.fr/s?k=mBot2+Makeblock&tag=manuso06-21)
- [Livre Scratch programmation enfant](https://www.amazon.fr/s?k=livre+Scratch+programmation+enfant&tag=manuso06-21)

*Partenaire Amazon — commission possible sur achats éligibles.*

---

**À retenir** : installez l’**application** sur la machine principale du projet robot ; gardez le **Web** pour les postes verrouillés ou les démos rapides ; n’ouvrez le **Python** que quand la **logique des blocs** est solide — le logiciel n’est qu’un outil, le **projet** et la **compréhension** restent au centre.
