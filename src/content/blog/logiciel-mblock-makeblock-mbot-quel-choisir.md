---
title: "mBlock 5, app ou Python : quel logiciel pour mBot ?"
description: "PC, tablette ou navigateur : quel logiciel Makeblock choisir pour mBot et mBot2 selon l'âge et le niveau ? Comparatif clair."
pubDate: "2026-03-30"
updatedDate: "2026-10-31"
heroImage: "../../assets/lot1/mblock-ide-hero.png"
amazonPreset: mbot
categories:
  - "mBlock"
  - "Makeblock"
  - "Installation"
  - "Programmation"
relatedLinks:
  - title: "mBlock en ligne (ide.mblock.cc)"
    href: "/mblock-en-ligne-programmer-sans-installer/"
  - title: "Installer mBlock 5 sous Windows"
    href: "/installer-mblock-5-sous-windows-10/"
  - title: "Télécharger mBlock 5 (lien officiel)"
    href: "/telecharger-mblock-5-gratuit-guide-2026/"
  - title: "mBlock ou Scratch : lequel choisir ?"
    href: "/mblock-vs-scratch-lequel-choisir/"
  - title: "Erreurs fréquentes Bluetooth / mBlock"
    href: "/mblock-bluetooth-erreurs-frequentes-depannage/"
---
Vous ouvrez **mBlock** pour la première fois et vous ne savez pas s’il faut l’**installer**, l’ouvrir **dans le navigateur**, ou passer tout de suite à **Python** ? Cette page compare les trois portes d’entrée, avec des mots simples, pour que vous choisissiez selon votre ordinateur, vos droits administrateur et votre robot (**mBot**, **mBot2**, etc.).

> **Réponse directe (octobre 2026)** — Pour ouvrir l’**IDE** (environnement de développement intégré : la fenêtre où l’on assemble les blocs) **sans installer**, allez sur [ide.mblock.cc](https://ide.mblock.cc/) et suivez [mBlock en ligne](/mblock-en-ligne-programmer-sans-installer/). Pour l’appli bureau : [installer mBlock 5](/installer-mblock-5-sous-windows-10/) ou [télécharger mBlock 5](/telecharger-mblock-5-gratuit-guide-2026/). Pour Scratch seul (sans robot Makeblock) : [mBlock vs Scratch](/mblock-vs-scratch-lequel-choisir/). Contenu relu sur mBlock 5.x (interface type Scratch 3).

![Interface de mBlock en ligne : scène, lutins, blocs et zone de script](/images/blog/guides-2026/mblock-online-wikimedia.png)

*Capture réelle de l’IDE mBlock en ligne ([ide.mblock.cc](https://ide.mblock.cc/)) — Matteo Ruffoni, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:MblockOnline.png), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.fr).*

**mBlock** sert à programmer les robots **Makeblock** en **blocs** (même esprit que **Scratch**), puis parfois en **Python** (langage texte). Application installée, version web et mode Python **ne sont pas équivalents** : tout dépend du robot branché, des droits admin, et du Bluetooth (liaison sans fil).

**Accès rapide**

- **En ligne :** [ide.mblock.cc](https://ide.mblock.cc/) dans Chrome ou Edge.
- **Sur PC :** [téléchargement officiel](https://www.mblock.cc/en-us/download/) + [guide Windows](/installer-mblock-5-sous-windows-10/).
- **Premier essai en 2 minutes :** lutin Panda, blocs « quand le drapeau vert est cliqué » puis « dire Bonjour ! », drapeau vert.

## Vue d’ensemble : trois « portes » vers le même univers

| | **Application (bureau)** | **mBlock Web (navigateur)** | **Python dans mBlock** |
| --- | --- | --- | --- |
| **Idéal si…** | vous **connectez** un robot (USB / Bluetooth), vous mettez à jour le **firmware**, vous voulez le **maximum de fiabilité**. | l’école **interdit** l’installation, atelier **ponctuel**, démo rapide. | les élèves **maîtrisent** déjà les blocs et passent à la **syntaxe** (collège / lycée). |
| **Limites** | nécessite **téléchargement** et parfois droits **admin** (Windows). | **Bluetooth** parfois **instable** selon navigateur et machine ; pas toujours le même confort que l’app. | dépend du **modèle** (mBot2, CyberPi, etc.) et de la **version** ; à réserver quand la **logique** des blocs est comprise. |

Ce n’est **pas** un choix unique pour la vie : beaucoup utilisent l’**app** à la maison ou au labo, et le **Web** sur les postes verrouillés.

Après ce tableau, si vous avez besoin d’un robot compatible : [mBot classique](https://www.amazon.fr/dp/B07XR98YYQ?tag=manuso06-21) ou [mBot2](https://www.amazon.fr/dp/B0919F9CKS?tag=manuso06-21) (liens affiliés — vérifiez le modèle sur la fiche). Guides d’âge : [8 ans](/quel-robot-acheter-enfant-8-ans-guide-achat/), [10 ans](/quel-robot-acheter-enfant-10-ans-guide-achat/).

## 1. Application mBlock (Windows / macOS / Chromebook / mobile selon version)

**À privilégier** pour tout ce qui touche au **matériel réel** :

- **connexion** du robot en **USB** ou **Bluetooth** ;
- **téléversement** du programme dans la carte du robot ;
- **mise à jour du firmware** (souvent **impossible** ou déconseillée sans USB — voir la doc Makeblock pour votre modèle) ;
- **pilotes** et **stabilité** : moins de surprises qu’un navigateur qui change souvent.

**Sur ce site**, enchaînez les guides [installer mBlock 5 sous Windows](/installer-mblock-5-sous-windows-10/), puis [premiers pas avec mBlock 5](/premier-pas-avec-mblock-5/) pour reconnaître **Appareil**, **blocs**, **zone de script** et **connexion**.

## 2. Version navigateur sans installation (Chromebook et PC verrouillés)

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

- [Robot Makeblock mBot](https://www.amazon.fr/dp/B07XR98YYQ?tag=manuso06-21)
- [mBot2 Makeblock](https://www.amazon.fr/dp/B0919F9CKS?tag=manuso06-21)
- [Livre Scratch programmation enfant](https://www.amazon.fr/s?k=livre+Scratch+programmation+enfant&tag=manuso06-21)

<p style="margin:1rem 0;"><a href="https://www.amazon.fr/dp/B0919F9CKS?tag=manuso06-21" class="affiliate-link" data-product-id="mbot2" data-placement="content" rel="sponsored nofollow noopener" target="_blank" style="display:inline-block;background:#ff9900;color:#111;font-weight:700;padding:0.55rem 1rem;border-radius:8px;text-decoration:none;">Voir le prix du jour sur Amazon (mBot2)</a> · <a href="https://www.amazon.fr/dp/B07XR98YYQ?tag=manuso06-21" class="affiliate-link" data-product-id="mbot" data-placement="content" rel="sponsored nofollow noopener" target="_blank" style="display:inline-block;background:#f1f5f9;color:#0f172a;font-weight:700;padding:0.55rem 1rem;border-radius:8px;text-decoration:none;border:1px solid #cbd5e1;">Voir le prix du jour (mBot v1)</a></p>

*Partenaire Amazon — commission possible sur achats éligibles.*

---

**À retenir** : installez l’**application** sur la machine principale du projet robot ; gardez le **Web** pour les postes verrouillés ou les démos rapides ; n’ouvrez le **Python** que quand la **logique des blocs** est solide — le logiciel n’est qu’un outil, le **projet** et la **compréhension** restent au centre.

**À lire aussi** : [mBlock ou Scratch ?](/mblock-vs-scratch-lequel-choisir/)
