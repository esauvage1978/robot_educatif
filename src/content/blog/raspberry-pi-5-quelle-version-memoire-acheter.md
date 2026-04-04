---
title: "Raspberry Pi 5 : quelle version (1 à 16 Go) acheter ?"
description: "Toutes les déclinaisons RAM du Raspberry Pi 5, spécifications BCM2712, PCIe, refroidissement actif, alimentation 5 A et guide de choix. Photo CC et prix indicatifs France 2026."
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
  - title: "Raspberry Pi 4 : quelle mémoire acheter ?"
    href: "/raspberry-pi-4-quelle-version-memoire-acheter/"
  - title: "Mise en route Raspberry Pi 3"
    href: "/mise-en-route-raspberry-pi-3-modele-b/"
  - title: "Raspberry Pi ou kit robot pour ado"
    href: "/raspberry-pi-ou-kit-robot-ado-guide/"
---

Le **Raspberry Pi 5** (fin 2023 et extensions catalogue 2024–2025) repose sur le **BCM2712** : quatre cœurs **Cortex-A76** à **2,4 GHz** (ordre de grandeur), un GPU **VideoCore VII** beaucoup plus récent que sur Pi 4, et un contrôleur **RP1** côté E/S qui décharge le SoC pour USB, Ethernet, GPIO à bas niveau, etc. C’est aussi la première carte « grande » Raspberry Pi grand public avec un lien **PCIe 2.0 ×1**, ouvrant la voie aux **SSD NVMe** (via cartes extension certifiées) et à d’autres périphériques.

Ce guide liste les **cinq déclinaisons mémoire** annoncées par la gamme (selon disponibilité régionale), ce qu’il faut **absolument budgétiser** en **refroidissement** et **alimentation**, et **comment choisir** la bonne barrette.

![Raspberry Pi 5 — carte nue, vue d’ensemble](/images/blog/raspberry-pi-comparatif-2026/pi-5-sbc-opt.jpg)

*Photo : [SimonWaldherr](https://commons.wikimedia.org/wiki/File:Raspberry_Pi_5_SBC.jpg), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), via Wikimedia Commons.*

## 1. Les déclinaisons RAM du Pi 5

| Variante | Usage typique |
|----------|---------------|
| **1 Go** | **Edge ultra-économique** : scripts bas niveau, passerelle légère, situations où le **prix public** prime. Moins de marge pour navigateur ou IDE lourds. |
| **2 Go** | **Serveurs** minimalistes, afficheurs, bots ; **pas** idéal pour un desktop « famille » riche en onglets. |
| **4 Go** | **Référence polyvalente** 2026 : bureau Raspberry Pi OS, développement, stacks web modérées. |
| **8 Go** | **Multi-conteneurs**, bases de données, compilation sérieuse, bureaux avec beaucoup de services en arrière-plan. |
| **16 Go** | **Charge RAM rare** sur SBC : modèles IA locaux légers, grosses **builds**, caches, **VM** très limitées mais possibles — **surcoût** important ; n’achetez ce format **que si vous savez** pourquoi vous en avez besoin. |

La mémoire est de type **LPDDR4X-4267** sur le Pi 5 (contre LPDDR4-3200 sur Pi 4), ce qui aide le GPU et le CPU dans les scénarios **large bande**.

## 2. Ce qui change vraiment par rapport au Pi 4

- **Performances CPU** nettement supérieures dans la plupart des benchmarks de compilation et d’encodage.
- **PCIe** : accélération **stockage** ou cartes applicatives — conditionné au **matériel compatible** (câbler correctement, alim suffisante).
- **Vidéo** : pipeline **HDMI** modernisé (prise en charge de fonctions récentes selon OS — mettre à jour **Raspberry Pi OS**).
- **Thermique** : le Pi 5 **monte vite en température** ; le **dissipateur actif officiel** (ou équivalent sérieux) est **quasi obligatoire** pour workloads longs.
- **Alimentation** : Raspberry Pi recommande un **adaptateur 5 V / 5 A** pour débloquer toute la tête **USB / consommation** ; les chargeurs « téléphone » faibles mènent à des **warnings** ou du **throttling**.

## 3. Quelle version choisir ? Arbre de décision rapide

1. **Budget serré** + **pas de bureau** : **2 Go** (voire **1 Go** si vous savez mesurer la RAM des services).
2. **Premier achat** « famille / école / maker » : **4 Go**.
3. **Home lab** avec **Docker** ou plusieurs stacks : **8 Go**.
4. Vous compilez des **gros projets**, faites tourner des **modèles** gourmands ou voulez **zéro compromis** : **16 Go** — après avoir vérifié que **stockage et refroidissement** suivent.

Pour l’**écart de prix** entre références, reportez-vous aux **fourchettes** données dans le [comparatif Pi 3 / 4 / 5](/raspberry-pi-3-vs-4-vs-5-comparatif-2026/) : entre **4 Go** et **16 Go**, on peut parfois **doubler ou tripler** le prix de la carte seule.

## 4. Accessoires à ne pas oublier

- **Dissipation active** (ventilateur intégré au kit officiel ou boîtier équivalent).
- **Alimentation** adaptée (**5 V / 5 A** officielle ou équivalent documenté).
- **Carte microSD rapide** (ou **NVMe** si vous investissez dans l’extension PCIe) — la carte SD reste le boot par défaut pour beaucoup d’utilisateurs.
- **Câbles micro-HDMI** si vous sortez sur deux écrans.

## 5. Logiciel et transitions

Vous flashez **Raspberry Pi OS** avec **Imager** comme pour les générations précédentes — mêmes **options avancées** (SSH, Wi‑Fi, utilisateur). Les guides détaillés d’installation restent ceux de la [mise en route Raspberry Pi (Imager)](/mise-en-route-raspberry-pi-3-modele-b/).

## Liens Amazon (affiliation)

- [Raspberry Pi 5](https://www.amazon.fr/s?k=Raspberry+Pi+5&tag=manuso06-21)
- [Dissipateur actif Raspberry Pi 5](https://www.amazon.fr/s?k=dissipateur+actif+Raspberry+Pi+5&tag=manuso06-21)
- [Alimentation 5V 5A Raspberry Pi 5](https://www.amazon.fr/s?k=alimentation+Raspberry+Pi+5+5A&tag=manuso06-21)

*Partenaire Amazon — commission possible sur achats éligibles.*

---

**À retenir** : le Pi 5 se choisit d’abord sur **RAM** (4 ou 8 Go pour la majorité), puis sur **qualité alim + refroidissement** ; le **16 Go** n’est pertinent que pour des usages qui **saturent réellement** la mémoire sur des machines **sans swap NVMe rapide**.
