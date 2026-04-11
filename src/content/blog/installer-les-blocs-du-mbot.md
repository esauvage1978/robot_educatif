---
title: "Installer les blocs du mBot"
headline: "Blocs orange mBot dans mBlock 5"
description: "Ajouter le robot mBot comme appareil dans mBlock 5 pour afficher les blocs orange (moteurs, capteurs, LED). Guide pas à pas."
pubDate: "2020-04-08"
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
updatedDate: "2026-04-02"
amazonPreset: mbot
categories:
  - "mBot"
  - "mBlock"
  - "Guide"
  - "Makeblock"
relatedLinks:
  - title: "Premiers pas avec mBlock 5"
    href: "/premier-pas-avec-mblock-5/"
  - title: "Installer mBlock 5 sous Windows"
    href: "/installer-mblock-5-sous-windows-10/"
  - title: "Mon premier programme mBot"
    href: "/mon-premier-programme-mbot/"
  - title: "S’inscrire sur mBlock 5"
    href: "/sinscrire-sur-mblock/"
faqSchema:
  - question: "Comment afficher les blocs orange mBot dans mBlock 5 ?"
    answer: "Dans le panneau Appareils, ajouter le mBot depuis la bibliothèque Makeblock, valider, puis vérifier que mBot est l’appareil actif pour que la palette affiche moteurs, capteurs et LED."
  - question: "Faut-il brancher le mBot sur USB pour ajouter les blocs ?"
    answer: "Pas toujours : l’essentiel est de sélectionner le bon modèle dans la bibliothèque ; la connexion USB ou Bluetooth sert surtout au téléversement plus tard."
  - question: "Je ne vois pas « mBot » dans la liste : que faire ?"
    answer: "Mettre mBlock à jour, redémarrer l’application après mise à jour, vérifier que vous n’êtes pas dans un mode qui limite les appareils."
  - question: "Les blocs mBot disparaissent de la palette : pourquoi ?"
    answer: "Un autre appareil est peut-être sélectionné dans Appareils ; recliquez sur mBot pour le réactiver."
---

<p><strong>Comment avoir les blocs mBot (orange) dans mBlock 5 ?</strong><br>
Ajoutez le <strong>mBot</strong> dans la section <strong>Appareils</strong> via la bibliothèque Makeblock, <strong>validez</strong>, puis gardez <strong>mBot</strong> comme appareil <strong>actif</strong> pour voir moteurs, capteurs et LED.</p>

<p>Guide vérifié sur les versions récentes de mBlock ; l’emplacement exact des boutons peut varier légèrement.</p>

Pour programmer le [robot éducatif mBot](https://amzn.to/34eEFtr?tag=manuso06-21) dans **mBlock 5**, il faut d’abord **charger les blocs spécifiques** au mBot : ce sont les blocs **orange** (moteurs, capteurs, buzzer, LED…). Sans cette étape, vous ne verrez que les blocs Scratch « classiques » et pas les commandes pour le robot.

Cette procédure est rapide : elle consiste à **déclarer le mBot comme appareil** dans la bibliothèque Makeblock, puis à valider. L’interface mBlock peut varier légèrement selon la version (5.x, langue, thème), mais le principe reste le même.

<div class="article-toc" role="navigation" aria-label="Sommaire de l’article">
<p class="article-toc-title">Sommaire</p>
<ul>
<li><a href="#prerequis">Prérequis</a></li>
<li><a href="#etape1">1. Ouvrir la zone « Appareils »</a></li>
<li><a href="#etape2">2. Choisir le mBot dans la liste</a></li>
<li><a href="#etape3">3. Valider avec OK</a></li>
<li><a href="#etape4">4. Vérifier les blocs mBot</a></li>
<li><a href="#depannage">Dépannage rapide</a></li>
<li><a href="#faq">FAQ</a></li>
</ul>
</div>

<h2 id="prerequis">Prérequis</h2>

- **mBlock 5** installé sur l’ordinateur. Si besoin, suivez [Installer mBlock 5 sous Windows 10](/installer-mblock-5-sous-windows-10/).
- Une idée de l’interface mBlock : [Premier pas avec mBlock 5](/premier-pas-avec-mblock-5/).
- Le **câble USB** (ou le dongle Bluetooth) si vous branchez le mBot plus tard ; pour **ajouter seulement les blocs**, la connexion du robot n’est pas toujours nécessaire — l’important est de sélectionner le bon **modèle d’appareil** dans la liste.

<h2 id="etape1">1. Ouvrir la zone « Appareils »</h2>

Dans la colonne de gauche, repérez la section **Appareils** (souvent en haut du panneau latéral). C’est là que l’on indique **quel robot** vous programmez, ce qui détermine **quels blocs** sont chargés dans la palette.

![Capture mBlock 5 : panneau latéral Appareils et bouton Ajouter](/images/blog/installer-blocs-mbot/etape-01-zone-appareils.png)

Cliquez sur **Ajouter** (ou **+**) pour ouvrir la **bibliothèque d’appareils** Makeblock.

<h2 id="etape2">2. Choisir le mBot dans la liste</h2>

Une fenêtre (ou panneau) liste les robots et cartes compatibles : **mBot**, **mBot 2**, **Ranger**, etc. **Sélectionnez le modèle qui correspond à votre kit** (mBot « classique » / mBot v1.x pour la plupart des kits bleus à deux moteurs).

![Capture mBlock 5 : bibliothèque d’appareils, ajout du mBot](/images/blog/installer-blocs-mbot/etape-02-bibliotheque.png)

- Utilisez la **recherche** ou faites défiler la liste si vous ne voyez pas « mBot » tout de suite.
- Si vous utilisez plusieurs robots, vous pourrez ajouter d’autres appareils plus tard de la même manière.

<h2 id="etape3">3. Valider avec OK</h2>

Une fois **mBot** (ou le bon modèle) **mis en surbrillance**, confirmez avec **OK**.

![Capture mBlock 5 : mBot sélectionné, fenêtre de validation](/images/blog/installer-blocs-mbot/etape-03-mbot-selectionne.png)

Fermez la fenêtre si un second clic sur **Annuler** ou **OK** est requis selon votre version.

<h2 id="etape4">4. Vérifier les blocs mBot</h2>

Après validation, le mBot apparaît dans **Appareils**, et la palette affiche une **catégorie de blocs orange** (ou équivalent) liée au mBot : **moteurs**, **capteurs de ligne / ultrason**, **LED**, **buzzer**, etc.

![Capture mBlock 5 : palette des blocs mBot (moteurs, capteurs, LED…)](/images/blog/installer-blocs-mbot/etape-04-palette-blocs-mbot.png)

Dans l’onglet **Appareil** (ou équivalent), assurez-vous que le **mBot reste l’appareil actif** pour que les bons blocs restent visibles lorsque vous assemblez votre programme.

Ensuite, vous pouvez enchaîner avec [Mon premier programme mBot](/mon-premier-programme-mbot/) pour tester le robot sur la table.

<h2 id="depannage">Dépannage rapide</h2>

- **Je ne vois pas « mBot » dans la liste** : mettez mBlock à jour, ou vérifiez que vous n’êtes pas en mode **Lite** / hors ligne qui limite certains appareils. Redémarrez mBlock après une mise à jour.
- **Les blocs disparaissent** : un autre appareil est peut‑être sélectionné ; recliquez sur **mBot** dans **Appareils**.
- **Extensions** : pour des capteurs ou kits supplémentaires, utilisez le gestionnaire d’**extensions** Makeblock (selon la version) pour ajouter des blocs complémentaires.

<h2 id="faq">FAQ</h2>

<h3 id="faq-orange">Comment afficher les blocs orange mBot ?</h3>

<p>Ajoutez mBot dans Appareils, validez, puis gardez mBot comme appareil actif.</p>

<h3 id="faq-usb">Faut-il USB pour cette étape ?</h3>

<p>Non systématiquement : l’ajout se fait surtout via la bibliothèque d’appareils.</p>

<h3 id="faq-pas-mbot">Je ne vois pas mBot dans la liste</h3>

<p>Mettez mBlock à jour et redémarrez le logiciel.</p>

<h3 id="faq-disparu">Les blocs disparaissent</h3>

<p>Un autre appareil est peut-être sélectionné ; recliquez sur mBot dans Appareils.</p>

<div class="article-cta-row">
<a class="article-cta article-cta--primary" href="/mon-premier-programme-mbot/">Premier programme mBot</a>
<a class="article-cta article-cta--secondary" href="/premier-pas-avec-mblock-5/">Premiers pas mBlock</a>
<a class="article-cta article-cta--secondary" href="/installer-mblock-5-sous-windows-10/">Installer mBlock</a>
</div>

Pour aller plus loin sur le robot, voir aussi la présentation [mBot, mon premier robot éducatif](/mbot-mon-premier-robot-educatif/).
