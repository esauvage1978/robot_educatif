---
title: "mBlock 5 : app, Web ou Python — quel logiciel pour votre robot ?"
headline: "Quel logiciel pour robot Makeblock : mBlock (app), Web, Python ?"
description: "mBlock 5 : application bureau, version web, mode Python — quand utiliser quoi pour mBot, mBot2, Codey Rocky et CyberPi. Tableau comparatif, captures et liens vers les tutoriels du site."
pubDate: "2026-03-30"
updatedDate: "2026-05-06"
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
amazonPreset: mbot
categories:
  - "mBlock"
  - "Makeblock"
  - "Installation"
  - "Programmation"
relatedLinks:
  - title: "Télécharger mBlock 5 gratuitement (guide officiel)"
    href: "/telecharger-mblock-5-gratuit-guide-2026/"
  - title: "Installer mBlock 5 sous Windows 10"
    href: "/installer-mblock-5-sous-windows-10/"
  - title: "Premiers pas avec mBlock 5"
    href: "/premier-pas-avec-mblock-5/"
  - title: "Erreurs fréquentes Bluetooth / mBlock"
    href: "/mblock-bluetooth-erreurs-frequentes-depannage/"
  - title: "Installer les blocs du mBot"
    href: "/installer-les-blocs-du-mbot/"
  - title: "mBlock en ligne (sans installation)"
    href: "/mblock-en-ligne-programmer-sans-installer/"
  - title: "mBlock vs Scratch"
    href: "/mblock-vs-scratch-lequel-choisir/"
  - title: "mBot vs mBot2"
    href: "/mbot-vs-mbot2-comparaison-des-robots-educatifs-pour-enfants/"
faqSchema:
  - question: "Quel logiciel choisir pour programmer un mBot ?"
    answer: "Pour un mBot réel, l'application mBlock installée sur PC ou Mac reste le choix le plus fiable, surtout en USB, pour téléverser des programmes et gérer les appareils."
  - question: "mBlock Web suffit-il pour débuter ?"
    answer: "Oui pour découvrir les blocs, créer des projets simples ou travailler sur un poste sans droits administrateur. Pour un usage régulier avec robot, l'application bureau est souvent plus stable."
  - question: "Quand passer de mBlock à Python ?"
    answer: "Après une première maîtrise des blocs : conditions, boucles, événements, capteurs. Python devient pertinent au collège, au lycée ou avec des élèves déjà autonomes."
  - question: "mBlock et Scratch sont-ils identiques ?"
    answer: "Non. Scratch est généraliste et centré sur les projets à l'écran ; mBlock reprend la logique des blocs mais ajoute la connexion aux robots Makeblock, aux cartes et aux capteurs."
  - question: "Faut-il installer mLink avec mBlock ?"
    answer: "mLink est surtout utile pour certains usages web et connexions matérielles. Pour l'application mBlock installée, commencez par mBlock 5 puis suivez la documentation Makeblock selon votre robot."
---

**mBlock** est l’environnement de référence pour programmer les robots **Makeblock** en **blocs** (même esprit que **Scratch**), puis en **texte** (**Python**) sur les modèles et versions qui le proposent. La difficulté, c’est qu’il existe **plusieurs façons d’y accéder** : logiciel **installé** sur l’ordinateur, **version web** dans le navigateur, et parfois **éditeur Python** intégré — ce n’est **pas équivalent** : tout dépend si vous **branchez un robot réel**, si vous avez les **droits administrateur**, ou si vous travaillez **sans matériel** un jour donné.

<div class="article-toc" role="navigation" aria-label="Sommaire de l’article">
<p class="article-toc-title">Sommaire</p>
<ul>
<li><a href="#telecharger">Télécharger mBlock 5</a></li>
<li><a href="#comparatif">Comparatif app, web et Python</a></li>
<li><a href="#comment-choisir">Comment choisir selon votre robot</a></li>
<li><a href="#exemples">Exemples d’utilisation</a></li>
<li><a href="#profils">Recommandations par profil</a></li>
<li><a href="#faq">FAQ</a></li>
</ul>
</div>

<h2 id="telecharger">Télécharger mBlock 5 (guide rapide)</h2>

- **Lien officiel** : récupérez l’installateur **gratuit** sur **mblock.cc** — synthèse, FAQ et liens **Windows / Mac / Linux / Web** dans notre page pilier <a href="/telecharger-mblock-5-gratuit-guide-2026/">Télécharger mBlock 5 gratuitement</a>.
- **Installation Windows** : <a href="/installer-mblock-5-sous-windows-10/">tutoriel détaillé Windows 10/11</a> · <a href="/installer-mblock-windows-11-guide-facile/">focus Windows 11</a>.
- **Sans installer** : <a href="/mblock-en-ligne-programmer-sans-installer/">mBlock en ligne</a> (navigateur).

Ci-dessous : **l’interface mBlock en ligne** (navigateur), proche de ce que vous voyez aussi dans l’application bureau — mêmes catégories de blocs, même zone de script.

![Interface de mBlock en ligne (IDE web) : scène, lutins, blocs et zone de script.](/images/blog/guides-2026/mblock-online-wikimedia.png)

> **Crédit image :** capture d’écran de l’IDE [mBlock en ligne](https://ide.mblock.cc/) — Matteo Ruffoni, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:MblockOnline.png), licence [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.fr).

<h2 id="comparatif">Vue d’ensemble : trois « portes » vers le même univers</h2>

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

Pour un atelier **robot Makeblock**, on part presque toujours de **mBlock**, pas de Scratch seul. Approfondir : <a href="/mblock-vs-scratch-lequel-choisir/">mBlock vs Scratch : lequel choisir ?</a>

<h2 id="comment-choisir">Comment choisir selon votre robot et votre objectif</h2>

Pour un **mBot classique**, privilégiez l'application mBlock installée : elle simplifie la connexion USB, l'ajout de l'appareil et les essais en direct. Pour un **mBot2** ou une **CyberPi**, l'application reste préférable si vous utilisez Python, les capteurs et le téléversement régulier. Pour une simple démonstration en classe ou un poste sans droits administrateur, mBlock Web est une bonne solution de secours.

Le choix dépend aussi du niveau. Un enfant ou un débutant doit d'abord réussir des blocs simples : avancer, tourner, détecter, répéter. Un élève plus autonome peut ensuite comparer blocs et Python pour comprendre que la même logique existe sous deux formes.

<h2 id="exemples">Exemples d’utilisation</h2>

- **Application mBlock** : programmer un mBot qui avance, évite un obstacle et téléverse le code dans le robot.
- **mBlock Web** : faire une démonstration rapide de blocs sur un PC verrouillé ou préparer un projet sans matériel.
- **Python dans mBlock** : reprendre un programme de capteur et observer comment les blocs deviennent des instructions texte.

<h2 id="profils">Recommandations par profil</h2>

Pour un **enfant**, commencez par l'application et les blocs. Pour un **débutant adulte**, utilisez l'application pour comprendre le lien entre programme et robot réel, puis testez le Web pour comparer. Pour un **enseignant**, gardez l'application sur les postes de référence et le Web comme solution d'appoint lorsque l'installation est impossible.

<h2 id="faq">6. FAQ</h2>

### Quel logiciel choisir pour programmer un mBot ?

Pour un mBot réel, l'application mBlock installée sur PC ou Mac reste le choix le plus fiable, surtout en USB, pour téléverser des programmes et gérer les appareils.

### mBlock Web suffit-il pour débuter ?

Oui pour découvrir les blocs, créer des projets simples ou travailler sur un poste sans droits administrateur. Pour un usage régulier avec robot, l'application bureau est souvent plus stable.

### Quand passer de mBlock à Python ?

Après une première maîtrise des blocs : conditions, boucles, événements, capteurs. Python devient pertinent au collège, au lycée ou avec des élèves déjà autonomes.

### mBlock et Scratch sont-ils identiques ?

Non. Scratch est généraliste et centré sur les projets à l'écran ; mBlock reprend la logique des blocs mais ajoute la connexion aux robots Makeblock, aux cartes et aux capteurs.

### Faut-il installer mLink avec mBlock ?

mLink est surtout utile pour certains usages web et connexions matérielles. Pour l'application mBlock installée, commencez par mBlock 5 puis suivez la documentation Makeblock selon votre robot.

### Je dois n’en choisir qu’un ?

Non. Utilisez l’**application** dès qu’un **robot réel** est sur la table ; gardez le **Web** pour les postes où vous ne pouvez rien installer ; n’ouvrez le **Python** que lorsque les **blocs** sont **compris**, pas seulement recopiés.

### C’est quoi « Live » vs téléverser ?

En **Live** (connecté), vous **testez** souvent en direct. Le **téléversement** envoie le programme **dans** le robot pour qu’il tourne **sans** le câble — utile une fois le script validé.

### mBlock 5 et mBlock 3 : pareil ?

Sur les tutoriels récents du site, on part de **mBlock 5** (interface actuelle type Scratch 3). Si vous ouvrez un très vieux tutoriel, les libellés peuvent différer légèrement.

### « Minecraft mblock » ou Minecraft et mBlock : c’est pareil ?

**Non.** **Minecraft** est un **jeu** de construction en blocs 3D. **mBlock** est le **logiciel de programmation** Makeblock (blocs de code, robots **mBot**, etc.). Si une recherche ne retourne pas le bon outil, ajoutez **Makeblock** ou **mBot** à votre requête.

## Liens Amazon (affiliation)

- [Robot Makeblock mBot](https://www.amazon.fr/s?k=mBot+Makeblock&tag=manuso06-21)
- [mBot2 Makeblock](https://www.amazon.fr/s?k=mBot2+Makeblock&tag=manuso06-21)
- [Livre Scratch programmation enfant](https://www.amazon.fr/s?k=livre+Scratch+programmation+enfant&tag=manuso06-21)

*Partenaire Amazon — commission possible sur achats éligibles.*

---

**En pratique** : installez l’**application** sur la machine principale du projet robot ; gardez le **Web** pour les postes verrouillés ou les démos rapides ; n’ouvrez le **Python** que quand la **logique des blocs** est solide — le logiciel n’est qu’un outil, le **projet** et la **compréhension** restent au centre.
