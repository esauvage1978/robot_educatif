---
title: "Installer mBlock 5 sur Windows 11 : guide complet 2026"
headline: "Installer mBlock 5 sur Windows 11 : guide complet étape par étape (2026)"
description: "Installer mBlock 5 sur Windows 11 : compatibilité, téléchargement officiel, installation PC, SmartScreen, drivers CH340, Bluetooth, connexion mBot et FAQ."
pubDate: 2026-04-18
updatedDate: 2026-05-06
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
amazonPreset: mbot
categories:
  - "mBlock"
  - "Windows"
  - "Installation"
  - "Guide"
relatedLinks:
  - title: "Télécharger mBlock 5 (lien officiel + FAQ)"
    href: "/telecharger-mblock-5-gratuit-guide-2026/"
  - title: "Installer mBlock 5 sous Windows 10"
    href: "/installer-mblock-5-sous-windows-10/"
  - title: "mBlock en ligne"
    href: "/mblock-en-ligne-programmer-sans-installer/"
  - title: "Premiers pas mBlock 5"
    href: "/premier-pas-avec-mblock-5/"
  - title: "10 projets mBot gratuits pour la classe"
    href: "/10-projets-mbot-gratuits-classe-faciles/"
  - title: "Quel robot éducatif choisir en 2026 ?"
    href: "/quel-robot-educatif-choisir-2026/"
  - title: "Apprendre Arduino C/C++"
    href: "/programmation/arduino-c/"
faqSchema:
  - question: "mBlock fonctionne-t-il sur Windows 11 ?"
    answer: "Oui. mBlock fonctionne sur Windows 7 et versions supérieures, donc Windows 11 est compatible. Sur un PC récent, choisissez de préférence la version Windows 64 bits depuis le site officiel mblock.cc."
  - question: "Comment installer mBlock sur Windows 11 ?"
    answer: "Téléchargez mBlock 5 sur la page officielle Makeblock, ouvrez le fichier .exe, acceptez le Contrôle de compte d'utilisateur Windows, suivez l'installation puis lancez mBlock depuis le menu Démarrer ou le raccourci bureau."
  - question: "Pourquoi mBlock ne détecte pas mon robot ?"
    answer: "Le plus souvent, le problème vient du câble USB, du port utilisé, du mauvais appareil sélectionné dans mBlock ou d'un driver série manquant comme CH340. Essayez un câble de données, changez de port USB, puis vérifiez le Gestionnaire de périphériques."
  - question: "Faut-il installer des drivers pour mBlock et mBot ?"
    answer: "Pas toujours. Pour un mBot récent en USB, Windows 11 peut reconnaître le périphérique automatiquement. Si le robot n'apparaît pas, un driver série CH340 ou un pilote fourni par Makeblock peut être nécessaire selon la carte et la version du robot."
  - question: "mBlock est-il gratuit ?"
    answer: "Oui, mBlock 5 est gratuit pour l'installation et l'utilisation de base. Certaines fonctions en ligne peuvent demander un compte Makeblock, mais programmer un mBot ou découvrir la programmation robot avec mBlock ne nécessite pas d'achat logiciel."
---

**mBlock 5** est le logiciel de Makeblock qui permet de programmer un **mBot**, un robot éducatif, une carte CyberPi ou des projets en blocs proches de Scratch. Si vous voulez faire de la **programmation robot** avec un enfant, en classe ou à la maison, c'est souvent le premier outil à installer sur un PC.

Bonne nouvelle : **mBlock Windows 11** fonctionne très bien. La procédure est proche de Windows 10, mais Windows 11 ajoute parfois quelques écrans qui inquiètent les débutants : message SmartScreen, demande de droits administrateur, antivirus trop strict, Bluetooth capricieux ou robot non détecté. Ce guide explique comment **installer mBlock** proprement, télécharger la bonne version, connecter un mBot et résoudre les erreurs fréquentes.

L'objectif est simple : vous devez pouvoir **installer mBlock 5 sur PC**, lancer le logiciel, ajouter votre robot et créer un premier programme sans perdre une soirée dans les menus Windows.

<div class="article-toc" role="navigation" aria-label="Sommaire de l'article">
<p class="article-toc-title">Sommaire</p>
<ul>
<li><a href="#compatibilite-windows-11">1. Compatibilité Windows 11</a></li>
<li><a href="#telecharger-mblock-5">2. Télécharger mBlock 5</a></li>
<li><a href="#installation-pas-a-pas">3. Installation pas à pas</a></li>
<li><a href="#problemes-windows-11">4. Problèmes fréquents Windows 11</a></li>
<li><a href="#connecter-mbot">5. Connecter un mBot</a></li>
<li><a href="#premier-lancement">6. Premier lancement</a></li>
<li><a href="#web-vs-pc">7. Version web vs version PC</a></li>
<li><a href="#liens-internes">8. Aller plus loin</a></li>
<li><a href="#faq">9. FAQ SEO</a></li>
</ul>
</div>

<h2 id="compatibilite-windows-11">1. Compatibilité Windows 11 : mBlock fonctionne-t-il ?</h2>

Oui. mBlock fonctionne sur **Windows 7 et versions supérieures**, ce qui inclut Windows 10 et **Windows 11**. Sur un ordinateur récent, choisissez la version Windows **64 bits** : c'est le cas le plus courant sur les PC vendus avec Windows 11.

Vous n'avez pas besoin d'une version spéciale "Windows 11". Il faut utiliser l'installateur Windows standard proposé par Makeblock. Si vous hésitez entre 32 et 64 bits, ouvrez **Paramètres → Système → Informations système** et regardez la ligne "Type du système".

<aside class="article-callout" role="note">
<p><strong>Configuration recommandée</strong></p>
<ul>
<li><strong>Système :</strong> Windows 11 64 bits à jour.</li>
<li><strong>Droits :</strong> compte administrateur ou mot de passe administrateur.</li>
<li><strong>Disque :</strong> prévoir au moins 1,5 à 2 Go libres.</li>
<li><strong>Connexion :</strong> Internet pour télécharger, USB ou Bluetooth pour le robot.</li>
<li><strong>Matériel :</strong> port USB fiable, câble de données, Bluetooth 4.0 minimum si usage sans fil.</li>
</ul>
</aside>

<h2 id="telecharger-mblock-5">2. Télécharger mBlock 5 sans risque</h2>

Téléchargez mBlock depuis le site officiel Makeblock : <strong><a href="https://www.mblock.cc/en-us/download/">mblock.cc — Download</a></strong>. Évitez les plateformes de téléchargement douteuses, les vieux fichiers partagés sur forums et les installateurs repackagés : ils peuvent être obsolètes, modifiés ou bloqués par Windows.

Sur la page officielle, choisissez **mBlock 5** puis **Windows**. La version PC est recommandée si vous utilisez souvent un mBot en USB, si vous téléversez des programmes vers le robot, ou si vous préparez un atelier en classe. La version web, disponible dans le navigateur, est pratique pour tester sans installation, mais elle peut demander mLink pour communiquer avec certains matériels.

Pour un guide centré téléchargement, consultez aussi <a href="/telecharger-mblock-5-gratuit-guide-2026/">Télécharger mBlock 5 gratuitement</a>. Si vous avez encore un PC Windows 10, gardez le tutoriel dédié : <a href="/installer-mblock-5-sous-windows-10/">installer mBlock 5 sous Windows 10</a>.

<h2 id="installation-pas-a-pas">3. Installer mBlock 5 sur Windows 11 étape par étape</h2>

### Étape 1 : télécharger le fichier

Ouvrez la page officielle, cliquez sur le bouton Windows et attendez la fin du téléchargement. Le fichier arrive souvent dans **Téléchargements**. Dans Edge ou Chrome, `Ctrl + J` ouvre la liste des téléchargements.

### Étape 2 : lancer l'installation

Double-cliquez sur le fichier `.exe`. Si rien ne se passe, faites clic droit puis **Exécuter en tant qu'administrateur**. Sur un PC familial, un parent peut devoir saisir son mot de passe. Sur un PC d'école, demandez au service informatique.

### Étape 3 : autoriser Windows SmartScreen

Windows 11 peut afficher **"Windows a protégé votre PC"**. Ce message ne signifie pas automatiquement que le fichier est dangereux : il apparaît souvent sur des installateurs téléchargés depuis Internet. Vérifiez d'abord que le fichier vient bien de `mblock.cc`. Cliquez ensuite sur **Informations complémentaires**, puis **Exécuter quand même** si la source est correcte.

### Étape 4 : suivre l'assistant

Selon la version, l'installateur peut copier les fichiers directement après l'autorisation Windows, ou afficher quelques écrans intermédiaires. Laissez les options par défaut, sauf consigne particulière. Ne fermez pas la fenêtre pendant la copie.

### Étape 5 : lancer le logiciel

À la fin, ouvrez mBlock depuis le raccourci bureau ou le menu Démarrer. Tapez "mBlock" dans la recherche Windows si vous ne voyez pas l'icône. Au premier lancement, l'interface peut prendre quelques secondes à charger.

<h2 id="problemes-windows-11">4. Problèmes fréquents mBlock Windows 11</h2>

### Problème 1 : mBlock ne s'ouvre pas

Si mBlock ne démarre pas après l'installation, commencez par redémarrer Windows. Ensuite, lancez mBlock en administrateur une seule fois. Si le problème continue, mettez à jour le **driver graphique** depuis Windows Update ou depuis le site du fabricant du PC. Certains écrans noirs ou lancements invisibles viennent d'un pilote GPU trop ancien.

### Problème 2 : écran blanc dans mBlock

Un écran blanc indique souvent un souci d'affichage, de cache ou de rendu graphique. Mettez à jour Windows 11, puis le pilote graphique Intel, AMD ou NVIDIA. Fermez mBlock, redémarrez le PC, puis relancez. Sur un PC d'école très verrouillé, vérifiez aussi que le pare-feu ou un proxy ne bloque pas les ressources utilisées par l'application.

### Problème 3 : le robot n'est pas détecté

Utilisez un **câble USB de données**, pas seulement un câble de charge. Essayez un autre port USB, évitez les hubs, allumez le robot, puis ouvrez mBlock. Dans le logiciel, ajoutez le bon appareil : mBot, mBot2, CyberPi ou autre selon votre matériel.

Si Windows affiche un périphérique inconnu dans le Gestionnaire de périphériques, il peut manquer un driver série, notamment **CH340** sur certaines cartes compatibles. Installez le driver recommandé par Makeblock ou par le fabricant du kit, puis rebranchez le robot.

### Problème 4 : problème Bluetooth

Le Bluetooth fonctionne mieux avec un PC compatible **Bluetooth 4.0 ou supérieur**. Vérifiez que le Bluetooth Windows est activé, que le robot est allumé, proche du PC, et qu'il n'est pas déjà connecté à une tablette ou un autre ordinateur. Si la connexion reste instable, préférez l'USB pour les premières séances : c'est plus fiable pour apprendre.

### Problème 5 : antivirus bloque mBlock

Certains antivirus bloquent les installateurs ou empêchent mBlock de communiquer. Ouvrez l'historique de protection, vérifiez que le fichier vient bien du site officiel, puis autorisez l'application si nécessaire. Ne créez jamais d'exception pour un fichier téléchargé depuis un site inconnu.

<h2 id="connecter-mbot">5. Connecter un mBot à mBlock sur Windows 11</h2>

En **USB**, branchez le mBot avec un câble de données, allumez le robot, ouvrez mBlock, ajoutez l'appareil puis cliquez sur connecter. C'est la méthode la plus stable pour débuter, notamment pour installer des firmwares ou téléverser un programme.

En **Bluetooth**, activez le Bluetooth Windows, rapprochez le robot et suivez la connexion proposée par mBlock. C'est pratique pour éviter les câbles, mais plus sensible aux pilotes et aux interférences.

En **2.4G**, certains packs Makeblock utilisent un dongle USB dédié. Branchez le dongle, allumez le robot et sélectionnez la connexion adaptée dans mBlock. Cette solution est souvent plus simple en classe que le Bluetooth classique.

<h2 id="premier-lancement">6. Premier lancement : interface, robot et premier programme</h2>

Dans mBlock, l'interface se divise généralement en trois zones : les blocs à gauche, la zone de script au centre, et la scène ou l'appareil à droite. Pour programmer un robot mBlock, ajoutez d'abord le bon appareil, connectez-le, puis testez une action simple.

Premier programme recommandé : faire avancer le mBot pendant une seconde, l'arrêter, puis faire clignoter une LED ou jouer un son. Ce mini-test valide trois choses : le logiciel fonctionne, le robot est connecté, et le téléversement ou le pilotage en direct répond correctement.

Pour continuer proprement, enchaînez avec <a href="/premier-pas-avec-mblock-5/">Premier pas avec mBlock 5</a>, puis <a href="/installer-les-blocs-du-mbot/">installer les blocs du mBot</a> et <a href="/mon-premier-programme-mbot/">mon premier programme mBot</a>.

<h2 id="web-vs-pc">7. Version web vs version PC : laquelle choisir ?</h2>

La **version PC** est le meilleur choix si vous utilisez régulièrement un robot, si vous voulez une connexion USB stable, ou si vous animez une séance avec plusieurs enfants. Elle évite de dépendre du navigateur et donne souvent moins de surprises avec le matériel.

La **version web** est utile si vous n'avez pas les droits administrateur, si vous travaillez sur un PC prêté, ou si vous voulez simplement découvrir l'interface. Son inconvénient : la connexion au robot peut demander mLink et dépend davantage du navigateur, des autorisations et du réseau.

En résumé : pour un atelier mBot sérieux, installez l'application Windows. Pour un essai rapide ou un PC verrouillé, utilisez <a href="/mblock-en-ligne-programmer-sans-installer/">mBlock en ligne</a>.

<h2 id="liens-internes">8. Aller plus loin : mBlock, mBot, robot éducatif et Arduino</h2>

Une fois mBlock installé, l'intérêt est de passer vite à la pratique. Commencez par <a href="/premier-pas-avec-mblock-5/">découvrir l'interface mBlock</a>, puis réalisez un programme simple avec <a href="/mon-premier-programme-mbot/">le mBot</a>. Pour garder les élèves engagés, utilisez notre sélection de <a href="/10-projets-mbot-gratuits-classe-faciles/">10 projets mBot gratuits pour la classe</a>.

Si vous hésitez encore sur le matériel, lisez <a href="/quel-robot-educatif-choisir-2026/">quel robot éducatif choisir en 2026</a> ou le guide <a href="/meilleur-robot-educatif-arduino-kit-choisir/">meilleur robot éducatif Arduino</a>. Pour progresser vers le code texte, le parcours <a href="/programmation/arduino-c/">apprendre Arduino C/C++</a> complète très bien mBlock.

<h2 id="faq">9. FAQ SEO</h2>

### mBlock fonctionne-t-il sur Windows 11 ?

Oui. mBlock fonctionne sur Windows 7 et versions supérieures, donc Windows 11 est compatible. Sur un PC récent, choisissez de préférence la version Windows 64 bits depuis le site officiel mblock.cc.

### Comment installer mBlock ?

Téléchargez mBlock 5 sur la page officielle Makeblock, ouvrez le fichier `.exe`, acceptez le Contrôle de compte d'utilisateur Windows, suivez l'installation puis lancez mBlock depuis le menu Démarrer ou le raccourci bureau.

### Pourquoi mBlock ne détecte pas mon robot ?

Le plus souvent, le problème vient du câble USB, du port utilisé, du mauvais appareil sélectionné dans mBlock ou d'un driver série manquant comme CH340. Essayez un câble de données, changez de port USB, puis vérifiez le Gestionnaire de périphériques.

### Faut-il installer des drivers ?

Pas toujours. Pour un mBot récent en USB, Windows 11 peut reconnaître le périphérique automatiquement. Si le robot n'apparaît pas, un driver série CH340 ou un pilote fourni par Makeblock peut être nécessaire selon la carte et la version du robot.

### mBlock est-il gratuit ?

Oui, mBlock 5 est gratuit pour l'installation et l'utilisation de base. Certaines fonctions en ligne peuvent demander un compte Makeblock, mais programmer un mBot ou découvrir la programmation robot avec mBlock ne nécessite pas d'achat logiciel.

## Liens Amazon (affiliation)

- [mBot Makeblock](https://www.amazon.fr/s?k=mBot+Makeblock&tag=manuso06-21)
- [mBot2 Makeblock](https://www.amazon.fr/s?k=mBot2+Makeblock&tag=manuso06-21)
- [Kit robot éducatif Arduino](https://www.amazon.fr/s?k=kit+robot+educatif+arduino&tag=manuso06-21)
- [Adaptateur Bluetooth USB 4.0 / 5.0](https://www.amazon.fr/s?k=adaptateur+bluetooth+usb+pc&tag=manuso06-21)

*Partenaire Amazon — commission possible sur achats éligibles, sans surcoût pour vous.*
