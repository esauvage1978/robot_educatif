---
title: "Comment réparer le Bluetooth mBlock : dépannage mBot et mBot2"
headline: "Comment réparer le Bluetooth mBlock : dépannage mBot, mBot2 et Makeblock"
description: "Réparer une connexion Bluetooth mBlock avec mBot ou mBot2 : USB d’abord, firmware, appairage Windows, pilotes, portée, dongle Bluetooth et classe."
pubDate: "2026-03-30"
updatedDate: "2026-05-06"
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
amazonPreset: mbot
categories:
  - "mBlock"
  - "Windows"
  - "FAQ"
  - "Installation"
relatedLinks:
  - title: "Installer mBlock 5 sur Windows 11"
    href: "/installer-mblock-windows-11-guide-facile/"
  - title: "Installer mBlock 5 sous Windows 10"
    href: "/installer-mblock-5-sous-windows-10/"
  - title: "mBlock en ligne : limites Bluetooth et USB"
    href: "/mblock-en-ligne-programmer-sans-installer/"
  - title: "Premiers pas avec mBlock 5"
    href: "/premier-pas-avec-mblock-5/"
  - title: "Quel logiciel Makeblock choisir"
    href: "/logiciel-mblock-makeblock-mbot-quel-choisir/"
  - title: "Premier programme mBot"
    href: "/mon-premier-programme-mbot/"
faqSchema:
  - question: "mBlock ne se connecte pas en Bluetooth au mBot : par où commencer ?"
    answer: "Prouver d’abord le téléversement en USB, mettre à jour mBlock et le firmware du robot, puis vérifier le Bluetooth du PC (mode avion, pilotes), réappairer le périphérique dans Windows et tester la portée sans interférences."
  - question: "Pourquoi USB avant Bluetooth ?"
    answer: "Si le robot ne répond pas en USB, le problème n’est souvent pas la radio ; USB isole firmware, câble et logiciel."
  - question: "Le navigateur mBlock a-t-il les mêmes capacités Bluetooth que l’application ?"
    answer: "Pas toujours : selon navigateur et OS, le Web peut être plus limité ; voir le comparatif logiciel mBlock."
  - question: "Un adaptateur Bluetooth USB peut-il aider ?"
    answer: "Oui si la puce intégrée du portable est instable ; un dongle Bluetooth récent peut être plus fiable."
  - question: "Que faire en compétition ou en classe ?"
    answer: "Préparer la configuration la veille, privilégier USB pour téléverser en atelier chargé, éviter la première connexion Bluetooth le jour J."
---

<p><strong>mBlock ne voit pas le robot en Bluetooth ?</strong><br>
Commencez par <strong>valider en USB</strong> (téléversement OK), puis vérifiez <strong>mBlock à jour</strong>, <strong>firmware</strong> robot, <strong>Bluetooth PC</strong> et <strong>réappairage</strong> Windows avant de suspecter un défaut matériel.</p>

<p>Méthode calée sur la <strong>documentation Makeblock</strong>, les retours <strong>salle de classe</strong> et des dépannages <strong>Windows</strong> classiques.</p>

Le **Bluetooth** entre **mBlock** et un robot (**mBot**, **mBot2**, **Codey Rocky**…) est souvent la première source de frustration : la connexion **USB** marche, mais le **sans-fil** refuse. Les causes se regroupent en quelques familles : **logiciel**, **radio PC**, **appairage**, **environnement**. Voici un **ordre de vérification** qui évite de tout mélanger.

Cette page n’a pas pour but de promettre une solution magique. Elle sert plutôt de **checklist de dépannage** : vous éliminez les causes une par une, dans le bon ordre, jusqu’à savoir si le problème vient du robot, du PC, du logiciel, du navigateur ou de l’environnement de classe.

![Ordre de dépannage : USB → mBlock → PC → appairage → environnement](/images/blog/guides-2026/bluetooth-depannage-flow.svg)

<div class="article-toc" role="navigation" aria-label="Sommaire de l’article">
<p class="article-toc-title">Sommaire</p>
<ul>
<li><a href="#ordre">1. Ordre recommandé</a></li>
<li><a href="#logiciel">2. Logiciel et firmware</a></li>
<li><a href="#pc-bt">3. Bluetooth sur l’ordinateur</a></li>
<li><a href="#appairage">4. Appairage Windows</a></li>
<li><a href="#portee">5. Portée et interférences</a></li>
<li><a href="#usb-vs-bt">6. USB plutôt que Bluetooth ?</a></li>
<li><a href="#quel-logiciel">7. Lien avec le choix du logiciel</a></li>
<li><a href="#cas-frequents">8. Cas fréquents</a></li>
<li><a href="#faq">9. FAQ</a></li>
</ul>
</div>

<h2 id="ordre">1. Ordre recommandé (ne pas sauter d’étapes)</h2>

1. **Prouver le robot avec USB** : si le téléversement USB échoue, le Bluetooth n’est pas la priorité.
2. **Mettre à jour mBlock** (version compatible avec votre OS).
3. **Firmware** du robot selon la procédure Makeblock — un firmware ancien bloque parfois le Bluetooth.
4. **Bluetooth PC** : mode avion, touche **Fn**, pilotes.
5. **Réappairer** proprement dans Windows (supprimer l’ancien périphérique puis recréer).
6. **Proximité** et **interférences** (voir section 4).

Le point le plus important : ne changez qu’un élément à la fois. Si vous mettez à jour mBlock, changez de câble, redémarrez Windows et réappairez le robot en même temps, vous ne saurez pas quelle action a corrigé le problème. En atelier, notez rapidement ce qui a été testé : USB OK, firmware OK, robot visible dans Windows, robot visible dans mBlock.

<h2 id="logiciel">2. Logiciel et firmware</h2>

- **mBlock** : installez depuis la source habituelle et vérifiez les **notes de version** pour votre modèle — voir [installation mBlock](/installer-mblock-5-sous-windows-10/) et [premiers pas](/premier-pas-avec-mblock-5/).
- **Firmware** : suivez la doc officielle pour **votre** robot ; après une mise à jour majeure, **redémarrer** robot et PC évite des états bizarres.

Sur **Windows 11**, vérifiez aussi que mBlock a été installé depuis la page officielle et que Windows ne bloque pas l’application au premier lancement. Le guide [installer mBlock 5 sur Windows 11](/installer-mblock-windows-11-guide-facile/) détaille SmartScreen, pilotes et connexion mBot.

Si vous utilisez **mBlock Web**, gardez en tête que les permissions du navigateur, mLink et le Bluetooth Web peuvent varier selon l’OS. Pour une séance avec robot réel, l’application bureau reste souvent plus prévisible que le navigateur.

<h2 id="pc-bt">3. Bluetooth sur l’ordinateur</h2>

- Sur portable, le **mode avion** ou une **touche Fn** peut couper la radio sans affichage évident.
- Certaines **dongles Bluetooth** USB sont plus stables que la puce intégrée : si les échecs persistent, tester un **adaptateur Bluetooth 5** récent (recherches Amazon ci-dessous).
- Sur Windows, ouvrez **Paramètres → Bluetooth et appareils** pour vérifier que la radio est bien active et que le robot n’est pas déjà associé sous un ancien nom.
- Dans le **Gestionnaire de périphériques**, un point d’exclamation sur la carte Bluetooth indique souvent un pilote à mettre à jour.

Un PC ancien peut très bien fonctionner en USB et rester instable en Bluetooth. Dans ce cas, l’adaptateur externe n’est pas une “solution miracle”, mais c’est un test simple quand plusieurs robots échouent sur le même ordinateur.

<h2 id="appairage">4. Appairage Windows</h2>

- Supprimer l’ancien appareil dans **Paramètres → Bluetooth** puis **réappairer** depuis zéro.
- Fermer les **autres applis** qui pourraient prendre le robot (télécommandes, secondes instances de mBlock).
- Éteindre puis rallumer le robot avant de relancer la détection.
- Tester avec un seul robot allumé dans la pièce si plusieurs élèves travaillent en même temps.

En classe, les anciens appairages sont fréquents : un robot peut avoir été associé à un autre PC, une tablette ou un compte utilisateur différent. Avant d’accuser le robot, essayez de repartir d’un appairage propre sur une seule machine.

<h2 id="portee">5. Portée et interférences</h2>

- Tester **près de la machine** d’abord (environ 1 m), sans mur métallique entre le PC et le robot.
- Éloigner les périphériques **USB 3.0** qui peuvent brouiller certaines bandes 2,4 GHz (cas réels mais pas systématiques).
- Éviter de tester au milieu de trente robots allumés : commencez avec un seul robot, puis ajoutez les autres.
- Charger suffisamment le robot : une batterie faible peut rendre les symptômes incohérents.

<h2 id="usb-vs-bt">6. USB plutôt que Bluetooth pour quoi ?</h2>

| Situation | Recommandation |
|-----------|----------------|
| Atelier scolaire, **30 élèves** | USB pour **téléverser** ; Bluetooth pour **tests** si la salle le permet. |
| **Compétition** ou démo | USB ou configuration **éprouvée** la veille — pas de première connexion BT le jour J. |
| Dépannage | **Toujours** valider en USB avant d’accuser le robot. |

<h2 id="quel-logiciel">7. Lien avec le choix du logiciel</h2>

La version **navigateur** de mBlock peut se heurter à des **limitations Bluetooth** selon le navigateur — voir [quel logiciel mBlock choisir](/logiciel-mblock-makeblock-mbot-quel-choisir/) et [mBlock en ligne](/mblock-en-ligne-programmer-sans-installer/).

Pour une découverte sans robot, mBlock Web suffit. Pour un robot réel utilisé régulièrement, surtout avec téléversement et firmware, l’application installée est généralement plus fiable. Si vous préparez une séance, testez le mode choisi avant le jour J.

<h2 id="cas-frequents">8. Cas fréquents et solution rapide</h2>

| Symptôme | Cause probable | Test conseillé |
|---|---|---|
| Robot invisible dans mBlock mais visible dans Windows | Mauvais appareil choisi ou mBlock Web limité | Tester l’application bureau et sélectionner le bon robot |
| Robot visible puis déconnecté | Batterie, distance, interférences | Recharger, rapprocher, tester seul |
| Aucun robot visible sur un PC | Bluetooth désactivé ou pilote instable | Vérifier Windows, mode avion, gestionnaire de périphériques |
| USB fonctionne, Bluetooth jamais | Appairage ou dongle PC | Supprimer l’appareil, réappairer, tester autre PC |
| Tout échoue en USB et Bluetooth | Problème logiciel, câble ou firmware | Reprendre l’installation et le téléversement USB |

<h2 id="faq">9. FAQ</h2>

<h3 id="faq-debut-bt">8.1. Par où commencer si le Bluetooth échoue ?</h3>

<p>USB fonctionnel, mBlock et firmware à jour, puis PC Bluetooth et réappairage, puis test de portée.</p>

<h3 id="faq-usb-dabord">8.2. Pourquoi USB avant Bluetooth ?</h3>

<p>Pour isoler logiciel et robot avant d’accuser la radio.</p>

<h3 id="faq-web">8.3. mBlock Web a-t-il les mêmes capacités ?</h3>

<p>Pas toujours selon navigateur ; l’app bureau est souvent plus prévisible pour téléverser.</p>

<h3 id="faq-dongle">8.4. Un dongle Bluetooth aide-t-il ?</h3>

<p>Oui si la puce du PC est capricieuse ; privilégier un modèle récent.</p>

<h3 id="faq-classe">8.5. Conseil atelier ou compétition ?</h3>

<p>Configurer la veille, USB pour téléverser quand la salle est chargée.</p>

<div class="article-cta-row">
<a class="article-cta article-cta--primary" href="/installer-mblock-5-sous-windows-10/">Installer mBlock</a>
<a class="article-cta article-cta--secondary" href="/logiciel-mblock-makeblock-mbot-quel-choisir/">Quel logiciel mBlock ?</a>
<a class="article-cta article-cta--secondary" href="/mon-premier-programme-mbot/">Premier programme</a>
</div>

## Liens Amazon (affiliation)

- [Adaptateur Bluetooth USB PC](https://www.amazon.fr/s?k=adaptateur+Bluetooth+USB+5.0+PC&tag=manuso06-21)
- [Câble USB robot éducatif](https://www.amazon.fr/s?k=c%C3%A2ble+USB+micro+robot&tag=manuso06-21)
- [mBot Makeblock](https://www.amazon.fr/s?k=mBot+Makeblock&tag=manuso06-21)

*Partenaire Amazon — commission possible sur achats éligibles.*

En résumé : **USB d’abord** pour prouver que le robot répond ; **Bluetooth ensuite** avec mBlock à jour et appairage propre — voir [installation mBlock](/installer-mblock-5-sous-windows-10/).
