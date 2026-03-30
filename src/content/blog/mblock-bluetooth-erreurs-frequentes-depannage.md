---
title: "mBlock et Bluetooth : erreurs fréquentes et dépannage (mBot, mBot2…)"
description: "Réparer les connexions Bluetooth entre mBlock et un robot Makeblock : pilotes, appairage, portée, versions logicielles. Schéma de dépannage et liens installation Amazon."
pubDate: "2026-03-30"
updatedDate: "2026-03-31"
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
---

Le **Bluetooth** entre **mBlock** et un robot (**mBot**, **mBot2**, **Codey Rocky**…) est souvent la première source de frustration : la connexion **USB** marche, mais le **sans-fil** refuse. Les causes se regroupent en quelques familles : **logiciel**, **radio PC**, **appairage**, **environnement**. Voici un **ordre de vérification** qui évite de tout mélanger.

![Ordre de dépannage : USB → mBlock → PC → appairage → environnement](/images/blog/guides-2026/bluetooth-depannage-flow.svg)

## 1. Ordre recommandé (ne pas sauter d’étapes)

1. **Prouver le robot avec USB** : si le téléversement USB échoue, le Bluetooth n’est pas la priorité.
2. **Mettre à jour mBlock** (version compatible avec votre OS).
3. **Firmware** du robot selon la procédure Makeblock — un firmware ancien bloque parfois le Bluetooth.
4. **Bluetooth PC** : mode avion, touche **Fn**, pilotes.
5. **Réappairer** proprement dans Windows (supprimer l’ancien périphérique puis recréer).
6. **Proximité** et **interférences** (voir section 4).

## 2. Logiciel et firmware

- **mBlock** : installez depuis la source habituelle et vérifiez les **notes de version** pour votre modèle — voir [installation mBlock](/installer-mblock-5-sous-windows-10/) et [premiers pas](/premier-pas-avec-mblock-5/).
- **Firmware** : suivez la doc officielle pour **votre** robot ; après une mise à jour majeure, **redémarrer** robot et PC évite des états bizarres.

## 3. Bluetooth sur l’ordinateur

- Sur portable, le **mode avion** ou une **touche Fn** peut couper la radio sans affichage évident.
- Certaines **dongles Bluetooth** USB sont plus stables que la puce intégrée : si les échecs persistent, tester un **adaptateur Bluetooth 5** récent (recherches Amazon ci-dessous).

## 4. Appairage Windows

- Supprimer l’ancien appareil dans **Paramètres → Bluetooth** puis **réappairer** depuis zéro.
- Fermer les **autres applis** qui pourraient prendre le robot (télécommandes, secondes instances de mBlock).

## 5. Portée et interférences

- Tester **près de la machine** d’abord (environ 1 m), sans mur métallique entre le PC et le robot.
- Éloigner les périphériques **USB 3.0** qui peuvent brouiller certaines bandes 2,4 GHz (cas réels mais pas systématiques).

## 6. USB plutôt que Bluetooth pour quoi ?

| Situation | Recommandation |
|-----------|----------------|
| Atelier scolaire, **30 élèves** | USB pour **téléverser** ; Bluetooth pour **tests** si la salle le permet. |
| **Compétition** ou démo | USB ou configuration **éprouvée** la veille — pas de première connexion BT le jour J. |
| Dépannage | **Toujours** valider en USB avant d’accuser le robot. |

## 7. Lien avec le choix du logiciel

La version **navigateur** de mBlock peut se heurter à des **limitations Bluetooth** selon le navigateur — voir [quel logiciel mBlock choisir](/logiciel-mblock-makeblock-mbot-quel-choisir/).

## Liens Amazon (affiliation)

- [Adaptateur Bluetooth USB PC](https://www.amazon.fr/s?k=adaptateur+Bluetooth+USB+5.0+PC&tag=manuso06-21)
- [Câble USB robot éducatif](https://www.amazon.fr/s?k=c%C3%A2ble+USB+micro+robot&tag=manuso06-21)
- [mBot Makeblock](https://www.amazon.fr/s?k=mBot+Makeblock&tag=manuso06-21)

*Partenaire Amazon — commission possible sur achats éligibles.*

---

**En pratique** : **USB d’abord** pour prouver que le robot répond ; **Bluetooth ensuite** avec mBlock à jour et appairage propre — voir aussi [installation mBlock](/installer-mblock-5-sous-windows-10/).
