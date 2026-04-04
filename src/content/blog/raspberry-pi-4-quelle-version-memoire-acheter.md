---
title: "Raspberry Pi 4 Modèle B : quelle version (1 / 2 / 4 / 8 Go) acheter ?"
description: "Déclinaisons RAM du Pi 4, spécifications, refroidissement, dual HDMI, et guide de choix par usage (serveur, bureau, rétro, GPIO). Photo et prix indicatifs France 2026."
pubDate: "2026-03-30"
updatedDate: "2026-03-30"
heroImage: "../../assets/blog-heroes/hero-raspberry.png"
amazonPreset: raspberry
categories:
  - "Raspberry Pi"
  - "Linux"
  - "Guide"
  - "À partir de 12 ans"
relatedLinks:
  - title: "Comparatif Pi 3 vs 4 vs 5"
    href: "/raspberry-pi-3-vs-4-vs-5-comparatif-2026/"
  - title: "Raspberry Pi 5 : quelle mémoire acheter ?"
    href: "/raspberry-pi-5-quelle-version-memoire-acheter/"
  - title: "Mise en route Raspberry Pi 3"
    href: "/mise-en-route-raspberry-pi-3-modele-b/"
  - title: "Raspberry Pi ou kit robot pour ado"
    href: "/raspberry-pi-ou-kit-robot-ado-guide/"
---

Le **Raspberry Pi 4 Modèle B** (2019, révisions ultérieures) se distingue du Pi 3 surtout par **deux ports USB 3.0**, un **Ethernet Gigabit** indépendant, **jusqu’à 8 Go de RAM** en LPDDR4-3200 et **deux sorties micro-HDMI** capables de pousser des définitions bien plus élevées qu’un simple écran de bureau 1080p — selon usage et refroidissement.

Ce guide détaille les **quatre déclinaisons mémoire** courantes, **quand choisir l’une ou l’autre**, et ce qu’il faut prévoir au **panier** (alim, câbles, dissipation).

![Raspberry Pi 4 Modèle B — vue de dessus avec annotations](/images/blog/raspberry-pi-comparatif-2026/pi-4-model-b-top-laserlicht-cc-by-sa-4-opt.jpg)

*Photo : [Laserlicht](https://commons.wikimedia.org/wiki/File:Raspberry_Pi_4_Model_B_-_Top.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), via Wikimedia Commons.*

## 1. Les quatre déclinaisons « RAM »

Sur une même carte **Pi 4 Modèle B**, seule la **quantité de mémoire** change ; le **SoC BCM2711** (quad **Cortex-A72** ~**1,8 GHz**, 64 bits) est **identique**.

| Variante | RAM | Profil d’acheteur typique |
|----------|-----|---------------------------|
| **1 Go** | 1 Go LPDDR4 | Projets **minimalistes** (capteur, petite appli headless). **Peu prioritaire** neuf en 2026 si le **Pi 5 1 Go** ou un **occasion** plus riche existe au même prix. |
| **2 Go** | 2 Go | **Serveur léger**, **kiosk**, **monitoring** ; bureau graphique **serré** (onglets limités). |
| **4 Go** | 4 Go | **Sweet spot** : bureau Raspberry Pi OS, développement **Python**, usage quotidien raisonnable. |
| **8 Go** | 8 Go | **Multiples services Docker**, compilation, **gros IDE** distant, tampons pour bases de données modestes. |

Toutes les variantes offrent **GPIO 40 broches**, **CSI / DSI** (caméra / écran officiels en overlay), **Wi‑Fi ac** et **Bluetooth 5.0**, **carte microSD** comme stockage principal.

## 2. Spécifications utiles pour ne pas se tromper de projet

- **Vidéo** : deux **micro-HDMI** — prévoir **câbles ou adaptateurs** (souvent **micro-HDMI → HDMI**).
- **USB** : **2 × USB 3** (disque, clef rapide) + **2 × USB 2** (clavier / souris).
- **Alimentation** : entrée **USB-C 5 V** ; un bloc **3 A** « de qualité » est un bon plan si vous alimentez des périphériques gourmands en aval.
- **Thermique** : sans boîtier ventilé ni dissipateurs, le CPU **throttle** vite ; pour charge longue, viser **boîtier avec ventilateur** ou **heat sinks**.

## 3. Quelle mémoire pour quel usage ?

**1 Go** — scripts **systemd**, **MQTT**, petit **Node** ou **Python** sans interface, **réutilisation** d’un stock vieilli. **Évitez** un desktop avec navigateur moderne.

**2 Go** — **Pi-hole**, **AdGuard**, **reverse proxy** léger, **Git** maison, petites API. Un bureau reste utilisable pour **admin ponctuelle**, pas pour un enfant qui jongle avec YouTube + Scratch en ligne en parallèle.

**4 Go** — la recommandation **par défaut** pour un **poste Linux** polyvalent, la **robotique** avec stack un peu grosse, ou l’**apprentissage**. Bon compromis **prix / confort** encore en 2026.

**8 Go** — compilation **Rust** / **C++** plus confortable, **conteneurs**, bases **SQLite** ou **PostgreSQL** « home lab », ou desktop avec **beaucoup d’onglets** si le stockage SD reste rapide.

## 4. Pi 4 ou Pi 5 ?

Si votre budget permet un **Pi 5** avec **dissipateur actif** et **bon chargeur**, le Pi 5 apporte **CPU plus véloce**, **RAM jusqu’à 16 Go** et **PCIe**. Sinon, le **Pi 4 4 Go** ou **8 Go** reste **extrêmement pertinent** pour ne pas sur-investir — tableau détaillé dans le [comparatif Pi 3 / 4 / 5](/raspberry-pi-3-vs-4-vs-5-comparatif-2026/).

## 5. Prix indicatifs (France, fin mars 2026)

Les **Pi 4** se trouvent souvent entre **~55 €** (variantes 2 Go, promos) et **~100 € ou plus** pour le **8 Go** selon revendeur. Vérifiez si le prix inclut **carte SD**, **boîtier** et **alimentation** — trois postes qui gonflent vite le total sans être « dans la boîte ».

## 6. Installation logicielle

La procédure est la même que pour les autres Pi récents : **Raspberry Pi Imager** sur PC, choix de **Raspberry Pi OS** (Desktop ou Lite), options **SSH / Wi‑Fi / utilisateur** dans l’engrenage — voir notre guide pas à pas : [mise en route Raspberry Pi 3](/mise-en-route-raspberry-pi-3-modele-b/) (les étapes Imager sont **identiques** sur Pi 4).

## Liens Amazon (affiliation)

- [Raspberry Pi 4 Model B](https://www.amazon.fr/s?k=Raspberry+Pi+4+Model+B&tag=manuso06-21)
- [Boîtier ventilateur Raspberry Pi 4](https://www.amazon.fr/s?k=bo%C3%AEtier+Raspberry+Pi+4+ventilateur&tag=manuso06-21)
- [Alimentation USB-C Raspberry Pi 4](https://www.amazon.fr/s?k=alimentation+USB-C+Raspberry+Pi+4+officielle&tag=manuso06-21)

*Partenaire Amazon — commission possible sur achats éligibles.*

---

**En résumé** : pour **démarrer** ou pour un **usage mixte**, visez **4 Go** ; montez à **8 Go** si vous servez **plusieurs applis** ou compilez souvent ; **2 Go** pour du **réseau / headless** ; **1 Go** seulement si le **prix** et le **besoin** sont **minimalistes**.
