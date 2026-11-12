---
title: "Programme mBot : faire clignoter les LED (mBlock)"
description: "Trois activités mBlock sur les LED RGB du mBot : clignotement rouge, cycle RVB et fondu avec variables. Mode Upload, vérifications et dépannage."
pubDate: "2020-04-18"
heroImage: "../../assets/lot1/mbot-premier-hero.webp"
updatedDate: "2026-10-31"
amazonPreset: mbot
categories:
  - "Activité"
  - "mBot"
  - "Makeblock"
  - "À partir de 8 ans"
relatedLinks:
  - title: "Mon premier programme mBot"
    href: "/mon-premier-programme-mbot/"
  - title: "Installer les blocs du mBot"
    href: "/installer-les-blocs-du-mbot/"
  - title: "Premiers pas avec mBlock 5"
    href: "/premier-pas-avec-mblock-5/"
  - title: "Mesurer des distances"
    href: "/activite-mbot-mesurer-des-distances/"
faqSchema:
  - question: "Comment faire clignoter les LED du mBot ?"
    answer: "Dans mBlock 5, avec l’appareil mBot sélectionné, empilez un événement de démarrage, une boucle, les blocs LED RGB (rouge, vert, bleu de 0 à 255) et un bloc attendre. Téléversez en mode Upload si le robot doit clignoter sans câble USB."
  - question: "Pourquoi une LED reste allumée après mon programme ?"
    answer: "Une LED allumée ne s’éteint pas seule : il faut explicitement lui envoyer la couleur 0, 0, 0 (éteint). Vérifiez aussi que vous avez bien éteint la LED opposée avant d’allumer l’autre dans l’activité 1."
  - question: "Mode Live ou mode Upload pour faire clignoter les LED ?"
    answer: "Le mode Live sert à tester avec le câble USB ou le Bluetooth. Pour une démo sans ordinateur, passez en mode Upload (téléversement) : l’événement devient en général « Lorsque le mBot démarre » au lieu du drapeau vert."
  - question: "Je ne vois pas les blocs LED du mBot, que faire ?"
    answer: "Installez ou réactivez la bibliothèque mBot dans mBlock (Appareil → mBot) et suivez le tutoriel Installer les blocs du mBot. Sans ces blocs orange, vous ne pourrez pas régler les LED RGB."
---

*Lien affilié Amazon — commission possible sur des achats éligibles, sans surcoût pour vous.*

> **Réponse directe (octobre 2026)** — Dans **mBlock 5** (logiciel Makeblock en blocs, proche de **Scratch**), empilez un **démarrage**, une **boucle**, des blocs **LED RGB** et **attendre** pour alterner les couleurs sur le **mBot classique** ; **téléversez** en mode **Upload** si le robot doit clignoter **sans câble USB**.

Le [robot éducatif mBot (Makeblock)](/mbot-mon-premier-robot-educatif/) possède **deux LED RGB** sur la carte **mCore** — la **carte électronique principale** du robot, qui héberge le microcontrôleur, l’alimentation et les connecteurs moteurs/capteurs. Chaque LED est une **diode** (**DEL** : composant qui émet de la lumière) capable de mélanger **rouge, vert et bleu** (système **RGB** : *Red, Green, Blue*). Cette séance propose **trois programmes courts** : clignotement rouge alterné, cycle rouge / vert / bleu, puis **fondu progressif** avec une **variable** (valeur mémorisée dans le programme). Idéal après [mon premier programme mBot](/mon-premier-programme-mbot/) ou en complément des [idées de projets en une heure](/idees-projets-mbot-rapides-une-heure/).

<figure class="article-figure">
  <img src="/images/lot1/mbot-premier-hero.webp" alt="Robot éducatif Makeblock mBot classique vu de face, avec deux LED RGB sur la carte mCore." width="960" height="540" loading="eager" decoding="async" />
  <figcaption>Les deux LED RGB se trouvent sur la carte mCore, à gauche et à droite du bouton central. Photo produit — Emmanuel Sauvage, Robot Éducatif — octobre 2026.</figcaption>
</figure>

<aside class="article-callout" role="note">
<p><strong>mBot classique ou mBot2 ?</strong></p>
<p>Ce tutoriel vise le <strong>mBot avec carte mCore</strong> (modèle bleu le plus répandu). Le <strong>mBot2</strong> utilise une autre carte et d’autres blocs dans mBlock ; les principes RGB restent proches, mais les noms de blocs peuvent différer. Avant d’acheter, consultez le comparatif <a href="/mbot-vs-mbot2-comparaison-des-robots-educatifs-pour-enfants/">mBot vs mBot2</a>.</p>
</aside>

<aside class="article-callout" role="note">
<p><strong>Avant l’activité 1 — mode Upload</strong></p>
<ol>
<li>Branchez le mBot en <strong>USB</strong>, ouvrez mBlock, mode <strong>Appareil</strong> → <strong>mBot</strong>.</li>
<li>Construisez l’activité 1, testez éventuellement en <strong>Live</strong> (temps réel avec le PC, câble ou Bluetooth).</li>
<li>Passez en <strong>Upload</strong> / <strong>Téléverser</strong>, choisissez l’événement <strong>Lorsque le mBot démarre</strong> si mBlock le propose.</li>
<li>Téléversez, débranchez le câble : le clignotement doit continuer seul (voir <a href="/premier-pas-avec-mblock-5/">premiers pas mBlock</a> si le menu diffère).</li>
</ol>
</aside>

| Critère | Détail |
| --- | --- |
| **Difficulté** | Débutant (boucles, temporisations) ; activité 3 : intermédiaire (variable) |
| **Durée** | 30 à 60 minutes pour les trois activités |
| **Matériel** | mBot chargé, PC, câble USB |
| **Logiciel** | <a href="/installer-mblock-5-sous-windows-10/">mBlock 5</a>, blocs <a href="/installer-les-blocs-du-mbot/">mBot activés</a> |
| **Résultat attendu** | LED qui clignotent selon le scénario ; activité 3 : montée progressive de l’intensité couleur |

<aside class="article-callout" role="note">
<p><strong>Prérequis</strong></p>
<ul>
<li>Savoir ouvrir mBlock et sélectionner le <strong>mBot</strong> comme appareil.</li>
<li>Avoir suivi ou parcouru <a href="/installer-les-blocs-du-mbot/">installer les blocs du mBot</a> si la palette « LED » n’apparaît pas.</li>
<li>Optionnel : avoir déjà <a href="/mon-premier-programme-mbot/">téléversé un premier programme</a> pour être à l’aise avec USB et Upload.</li>
</ul>
</aside>

## Matériel et logiciel

- [Présentation du mBot](/mbot-mon-premier-robot-educatif/) · [Installer mBlock 5](/installer-mblock-5-sous-windows-10/) · [Premiers pas](/premier-pas-avec-mblock-5/) · [Blocs mBot](/installer-les-blocs-du-mbot/) · [Choisir mBlock ou Scratch](/mblock-vs-scratch-lequel-choisir/)

<figure class="article-figure">
  <img src="/images/blog/installer-blocs-mbot/etape-04-palette-blocs-mbot.webp" alt="Capture d’écran mBlock 5 : palette orange des blocs mBot, catégorie LED visible." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Les blocs LED se trouvent dans la palette orange « mBot » une fois l’appareil mBot sélectionné. Capture mBlock 5 — Emmanuel Sauvage, Robot Éducatif — octobre 2026.</figcaption>
</figure>

Chaque composante **R**, **G**, **B** va de **0 à 255** ; **0, 0, 0** signifie **éteint**. Ne confondez pas ces **deux LED latérales** avec la **matrice LED** centrale (messages qui défilent) : voir l’activité [faire défiler un texte](/activite-mbot-faire-defiler-un-texte/) si vous voulez afficher du texte.

## 1. Un peu de théorie

Dans le [modèle de couleur RGB](https://fr.wikipedia.org/wiki/Rouge_vert_bleu), chaque composante peut prendre une valeur de 0 à 255.

Exemples : rouge `255, 0, 0` · vert `0, 255, 0` · bleu `0, 0, 255` · blanc `255, 255, 255` · éteint `0, 0, 0`.

Cela donne plus de **16 millions** de combinaisons possibles (**16 777 216**).

## 2. Activité 1 : clignotement rouge alternatif

**Objectif** : allumer les LED en rouge **alternativement** à gauche et à droite, **10 fois**. Chaque LED reste allumée **1 seconde**. Une LED allumée ne s’éteint pas toute seule : il faut lui donner `0, 0, 0`.

<figure class="article-figure">
  <img src="/images/lot3/leds-activite1-clignotement.webp" alt="Schéma pédagogique des blocs mBlock pour le clignotement rouge alternatif des LED du mBot" width="800" height="450" loading="lazy" decoding="async" />
  <figcaption>Enchaînement des blocs pour l’activité 1 (à reproduire dans mBlock 5). Schéma : Emmanuel Sauvage, Robot Éducatif — octobre 2026.</figcaption>
</figure>

**Pseudo-code :**

```text
Lorsque le mBot démarre
  répéter 10 fois
    LED gauche = rouge ; LED droite = éteint
    attendre 1 s
    LED gauche = éteint ; LED droite = rouge
    attendre 1 s
```

**Critère de réussite :** dix cycles visibles, une LED rouge à gauche puis à droite, sans laisser l’autre allumée.

Enregistrez sous `leds_clignotement_1.mblock` (**Fichier → Enregistrer sous…**).

<figure class="article-figure">
  <img src="/capture/premier_programme/12-televersement.png" alt="Capture mBlock 5 : barre de progression ou confirmation après téléversement du programme vers le mBot." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Après un téléversement réussi, débranchez le USB : le robot doit clignoter seul. Capture mBlock 5 — Emmanuel Sauvage, Robot Éducatif — octobre 2026.</figcaption>
</figure>

## 3. Activité 2 : rouge, vert, bleu

**Objectif** : afficher rouge, puis vert, puis bleu sur **les deux** diodes pendant **10 cycles**.

<figure class="article-figure">
  <img src="/images/lot3/leds-activite2-rgb.webp" alt="Schéma pédagogique des blocs mBlock pour le cycle rouge-vert-bleu des LED" width="800" height="450" loading="lazy" decoding="async" />
  <figcaption>Enchaînement des blocs pour l’activité 2. Schéma : Emmanuel Sauvage, Robot Éducatif — octobre 2026.</figcaption>
</figure>

**Pseudo-code :**

```text
Lorsque le mBot démarre
  répéter 10 fois
    les 2 LED en rouge → attendre 1 s
    les 2 LED en vert → attendre 1 s
    les 2 LED en bleu → attendre 1 s
```

**Critère de réussite :** les deux LED passent rouge, vert, bleu dix fois de suite, avec une pause d’environ une seconde entre chaque couleur.

Enregistrez par exemple `leds_rgb.mblock`. Pour une variante créative, enchaînez avec [mesurer des distances](/activite-mbot-mesurer-des-distances/) ou un [détecteur d’intrusion](/activite-mbot-detecteur-dintrusion/) qui combine LED et capteurs.

## 4. Activité 3 : affichage progressif

**Objectif :** faire monter l’intensité du rouge, puis du vert, puis du bleu de **0 à 255** (effet de fondu). Créez une variable (par ex. `intensité`) initialisée à **0**, augmentez-la de **1** à chaque tour, affichez la couleur pendant **0,01 s**, et recommencez jusqu’à 255.

- Initialiser : bloc **définir intensité à 0**
- Incrémenter : bloc **changer intensité par 1**

<figure class="article-figure">
  <img src="/images/lot3/leds-activite3-progressif.webp" alt="Schéma pédagogique du fondu progressif des LED avec une variable intensité" width="800" height="450" loading="lazy" decoding="async" />
  <figcaption>Principe de l’activité 3 : une variable fait monter l’intensité couleur. Schéma : Emmanuel Sauvage, Robot Éducatif — octobre 2026.</figcaption>
</figure>

**Pseudo-code (fondu rouge, à répéter pour vert et bleu) :**

```text
définir intensité à 0
répéter 255 fois
  changer intensité par 1
  LED gauche et droite = (intensité, 0, 0)
  attendre 0,01 s
```

Puis enchaînez des boucles similaires avec `(0, intensité, 0)` pour le vert et `(0, 0, intensité)` pour le bleu. Exportez par exemple `leds_fondu_rgb.mblock`.

**Critère de réussite :** vous voyez une montée progressive de la luminosité sur chaque couleur, sans à-coups brutaux si la temporisation reste à **0,01 s** (ajustez légèrement si votre robot semble trop lent).

### Amélioration : bloc personnalisé

Pour éviter de recopier trois fois la même logique, créez un **bloc personnalisé** avec trois paramètres (pas, temporisation, numéro de couleur 0/1/2). Le programme principal devient alors plus court à maintenir — utile dans les [10 projets mBot pour la classe](/10-projets-mbot-gratuits-classe-faciles/).

Pour conclure : vous avez **manipulé** les LED RGB et vu **boucles**, **variables** et (optionnellement) **blocs personnalisés** dans mBlock.

## 5. Vérifications et dépannage

| Problème | Cause fréquente | Que faire |
| --- | --- | --- |
| Aucune LED ne s’allume | mBot non connecté ou mauvais appareil | Vérifiez USB, piles, appareil **mBot** dans mBlock |
| Une LED reste allumée | Oubli de `0, 0, 0` | Ajoutez un bloc « LED à éteint » après chaque couleur |
| Ça marche en Live, plus après débranchement | Programme non téléversé | Repassez en **Upload** et téléversez à nouveau |
| Blocs LED absents | Bibliothèque mBot inactive | <a href="/installer-les-blocs-du-mbot/">Installer les blocs du mBot</a> |
| Clignotement trop rapide / lent | Mauvaise durée dans **attendre** | Réglez **1 seconde** pour les activités 1 et 2 |
| Couleurs ternes ou incorrectes | Valeurs RGB hors plage | Restez entre **0 et 255** par composante |

Si le Bluetooth pose problème en Live, repassez en **USB** le temps d’apprendre — voir le guide [mBlock et Bluetooth](/mblock-bluetooth-erreurs-frequentes-depannage/).

## FAQ

### Comment faire clignoter les LED du mBot ?

Empilez démarrage, boucle, blocs **LED RGB** et **attendre** dans mBlock 5, puis téléversez si vous voulez un comportement autonome.

### Pourquoi une LED reste allumée ?

Il faut explicitement envoyer **0, 0, 0** ; le robot ne coupe pas la couleur précédente tout seul.

### Live ou Upload ?

**Live** = test avec le PC ; **Upload** = programme stocké dans le robot pour une démo sans câble.

## 6. Pour aller plus loin

- [Mon premier programme mBot](/mon-premier-programme-mbot/)
- [Mesurer des distances](/activite-mbot-mesurer-des-distances/)
- [Programmes mBlock téléchargeables](/programmes/)
- [Détecteur d’intrusion](/activite-mbot-detecteur-dintrusion/)
- [Logiciel mBlock : quel choix ?](/logiciel-mblock-makeblock-mbot-quel-choisir/)

*Emmanuel Sauvage — mis à jour le 31 octobre 2026.*
