---
title: "mBlock et Bluetooth : erreurs fréquentes et dépannage (mBot, mBot2…)"
headline: "MBlock et Bluetooth : dépannage (ordre de vérification)"
description: "Réparer les connexions Bluetooth entre mBlock et un robot Makeblock : pilotes, appairage, portée, versions logicielles. Schéma de dépannage et liens installation Amazon."
pubDate: "2026-03-30"
updatedDate: "2026-04-02"
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
amazonPreset: mbot
categories:
  - "mBlock"
  - "Windows"
  - "FAQ"
  - "Installation"
relatedLinks:
  - title: "Installer mBlock 5 sous Windows 10"
    href: "/installer-mblock-5-sous-windows-10/"
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
Commencez par <strong>valider en USB</strong> (téléversement OK), puis <strong>mBlock à jour</strong>, <strong>firmware</strong> robot, <strong>Bluetooth PC</strong> et <strong>réappairage</strong> Windows avant de suspecter un défaut matériel.</p>

<p>Méthode calée sur la <strong>documentation Makeblock</strong>, les retours <strong>salle de classe</strong> et des dépannages <strong>Windows</strong> classiques.</p>

Le **Bluetooth** entre **mBlock** et un robot (**mBot**, **mBot2**, **Codey Rocky**…) est souvent la première source de frustration : la connexion **USB** marche, mais le **sans-fil** refuse. Les causes se regroupent en quelques familles : **logiciel**, **radio PC**, **appairage**, **environnement**. Voici un **ordre de vérification** qui évite de tout mélanger.

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
<li><a href="#faq">8. FAQ</a></li>
</ul>
</div>

<h2 id="ordre">1. Ordre recommandé (ne pas sauter d’étapes)</h2>

1. **Prouver le robot avec USB** : si le téléversement USB échoue, le Bluetooth n’est pas la priorité.
2. **Mettre à jour mBlock** (version compatible avec votre OS).
3. **Firmware** du robot selon la procédure Makeblock — un firmware ancien bloque parfois le Bluetooth.
4. **Bluetooth PC** : mode avion, touche **Fn**, pilotes.
5. **Réappairer** proprement dans Windows (supprimer l’ancien périphérique puis recréer).
6. **Proximité** et **interférences** (voir section 4).

## 2. Logiciel et firmware

- **mBlock** : installez depuis la source habituelle et vérifiez les **notes de version** pour votre modèle — voir [installation mBlock](/installer-mblock-5-sous-windows-10/) et [premiers pas](/premier-pas-avec-mblock-5/).
- **Firmware** : suivez la doc officielle pour **votre** robot ; après une mise à jour majeure, **redémarrer** robot et PC évite des états bizarres.

<h2 id="pc-bt">3. Bluetooth sur l’ordinateur</h2>

- Sur portable, le **mode avion** ou une **touche Fn** peut couper la radio sans affichage évident.
- Certaines **dongles Bluetooth** USB sont plus stables que la puce intégrée : si les échecs persistent, tester un **adaptateur Bluetooth 5** récent (recherches Amazon ci-dessous).

<h2 id="appairage">4. Appairage Windows</h2>

- Supprimer l’ancien appareil dans **Paramètres → Bluetooth** puis **réappairer** depuis zéro.
- Fermer les **autres applis** qui pourraient prendre le robot (télécommandes, secondes instances de mBlock).

## 5. Portée et interférences

- Tester **près de la machine** d’abord (environ 1 m), sans mur métallique entre le PC et le robot.
- Éloigner les périphériques **USB 3.0** qui peuvent brouiller certaines bandes 2,4 GHz (cas réels mais pas systématiques).

<h2 id="usb-vs-bt">6. USB plutôt que Bluetooth pour quoi ?</h2>

| Situation | Recommandation |
|-----------|----------------|
| Atelier scolaire, **30 élèves** | USB pour **téléverser** ; Bluetooth pour **tests** si la salle le permet. |
| **Compétition** ou démo | USB ou configuration **éprouvée** la veille — pas de première connexion BT le jour J. |
| Dépannage | **Toujours** valider en USB avant d’accuser le robot. |

<h2 id="quel-logiciel">7. Lien avec le choix du logiciel</h2>

La version **navigateur** de mBlock peut se heurter à des **limitations Bluetooth** selon le navigateur — voir [quel logiciel mBlock choisir](/logiciel-mblock-makeblock-mbot-quel-choisir/).

<h2 id="faq">8. FAQ</h2>

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
