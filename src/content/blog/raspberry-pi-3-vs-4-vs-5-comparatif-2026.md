---
title: "Raspberry Pi 3 vs 4 vs 5 : comparatif technique, prix et quel modèle choisir (2026)"
description: "Tableau comparatif Pi 3 / Pi 4 / Pi 5 : CPU, RAM, USB, réseau, vidéo, PCIe. Déclinaisons mémoire, fourchettes de prix en France (mars 2026), cas d’usage et liens vers les guides détaillés."
pubDate: "2026-03-30"
updatedDate: "2026-03-30"
heroImage: "../../assets/blog-heroes/hero-raspberry.png"
amazonPreset: raspberry
categories:
  - "Raspberry Pi"
  - "Comparatif"
  - "Guide"
  - "À partir de 12 ans"
relatedLinks:
  - title: "Raspberry Pi 4 : quelle mémoire acheter ?"
    href: "/raspberry-pi-4-quelle-version-memoire-acheter/"
  - title: "Raspberry Pi 5 : quelle mémoire acheter ?"
    href: "/raspberry-pi-5-quelle-version-memoire-acheter/"
  - title: "Mise en route Raspberry Pi 3"
    href: "/mise-en-route-raspberry-pi-3-modele-b/"
  - title: "Raspberry Pi ou kit robot pour ado"
    href: "/raspberry-pi-ou-kit-robot-ado-guide/"
---

Entre le **Raspberry Pi 3 Modèle B**, le **Pi 4 Modèle B** et le **Pi 5**, l’écart n’est pas qu’une question de **prix** : **USB 3**, **Ethernet véritablement gigabit**, **double sortie vidéo**, puis sur le Pi 5 **PCIe** et des **barrettes jusqu’à 16 Go**, changent la faisabilité de beaucoup de projets. Ce comparatif résume les **fiches techniques**, propose des **fourchettes de prix** observées en France **à la fin mars 2026** (toujours à **recroiser** au moment de l’achat), et aide à **trancher** selon votre scénario.

## 1. La gamme en un clin d’œil

Plusieurs familles de cartes coexistent chez Raspberry Pi (Zero, Pico, format clavier Pi 400, etc.). La photo ci-dessous illustre **l’écart de taille** entre plusieurs de ces plateformes — le **Pi 5** y figure à côté du **Pi 1**, du **Pi 400**, du **Zero 2 W** et du **Pico**.

![Plusieurs cartes Raspberry Pi alignées pour comparaison de format](/images/blog/raspberry-pi-comparatif-2026/gamme-pi-opt.jpg)

*Photo : [SimonWaldherr](https://commons.wikimedia.org/wiki/File:Raspberry_Pi_1,_Pi_5,_Pi_400,_Zero_2_and_Pico.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), via Wikimedia Commons.*

## 2. Tableau technique Pi 3 B vs Pi 4 B vs Pi 5

Les valeurs ci-dessous correspondent aux **références courantes** publiées par Raspberry Pi et à la littérature technique consolidée (fiches produit, documentation communautaire). Les fréquences exactes peuvent évoluer avec les **révisions firmware**.

| Critère | **Pi 3 Modèle B** | **Pi 4 Modèle B** | **Raspberry Pi 5** |
|--------|-------------------|-------------------|---------------------|
| **SoC** | Broadcom **BCM2837** | Broadcom **BCM2711** | Broadcom **BCM2712** |
| **CPU** | Quad **Cortex-A53** ~**1,2 GHz** | Quad **Cortex-A72** ~**1,8 GHz** | Quad **Cortex-A76** ~**2,4 GHz** |
| **GPU / vidéo** | VideoCore IV, HDMI **1080p** typique | VideoCore VI, **2 × micro HDMI** 4K (cadences selon usage) | **VideoCore VII**, **2 × micro HDMI** 4K60 (HDMI 2.1 selon doc.) |
| **RAM disponible** | **1 Go** LPDDR2 | **1 / 2 / 4 / 8 Go** LPDDR4-3200 | **1 / 2 / 4 / 8 / 16 Go** LPDDR4X-4267 |
| **Ethernet** | ~**100 Mbit/s** (via USB interne) | **Gigabit** (puce séparée) | **Gigabit** |
| **Wi‑Fi / BT** | Wi‑Fi **n**, BT **4.1** | Wi‑Fi **ac**, BT **5.0** | Wi‑Fi **ac/n**, BT **5.0** |
| **USB** | 4 × **USB 2.0** | **2 × USB 3.0** + **2 × USB 2.0** | **2 × USB 3.0** + **2 × USB 2.0** |
| **Stockage** | microSD | microSD | microSD **+ contrôleur plus rapide** (modes SD étendus) |
| **PCIe** | Non | Non | **PCIe 2.0 ×1** (extensions NVMe via cartes « HAT+ », etc.) |
| **Alimentation** | **Micro-USB 5 V** (≈ 2,5 A recommandés) | **USB-C 5 V** (≈ **3 A** pour usage typique) | **USB-C**, chargeur **5 V / 5 A** recommandé pour charge pleine ; options PD |
| **GPIO** | 40 broches | 40 broches | 40 broches |

![Schéma pédagogique : USB 3, génération CPU et RAM max](/images/blog/raspberry-pi-comparatif-2026/pi3-pi4-pi5-axes.svg)

### Points qui changent vraiment le quotidien

- **Pi 3** : facile à trouver d’occasion, très **documentation** pour débuter — mais **1 Go de RAM** et **pas d’USB 3** limitent navigateur, compilation et transferts disque.
- **Pi 4** : **USB 3** + **vrai Gigabit** = NAS modeste, serveur, desktop correct dès **4 Go**.
- **Pi 5** : **CPU plus récent**, **jusqu’à 16 Go** de RAM, **PCIe** pour accélérer le stockage ou des accélérateurs — mais **budget**, **dissipation thermique** et **alimentation** plus exigeants.

## 3. Déclinaisons « mémoire » (résumé)

- **Pi 3 B** : une seule déclinaison **1 Go** (hors Pi 3 A+, Pi 3 B+ variantes inchangées sur la RAM de ce tableau comparatif « grand public »).
- **Pi 4 B** : **1, 2, 4 et 8 Go** — voir [Raspberry Pi 4 : quelle mémoire acheter ?](/raspberry-pi-4-quelle-version-memoire-acheter/).
- **Pi 5** : **1, 2, 4, 8 et 16 Go** (le **16 Go** s’appuie sur des révisions SoC / DRAM plus récentes) — voir [Raspberry Pi 5 : quelle mémoire acheter ?](/raspberry-pi-5-quelle-version-memoire-acheter/).

## 4. Prix indicatifs en France (fin mars 2026)

Les montants **bougent chaque semaine** (ruptures, marges revendeur, TVA, promotions). Pour établir une **fourchette**, nous nous appuyons sur des **agrégateurs et guides d’achat** consultés autour du **30 mars 2026** (ex. idealo.fr, Les Numériques, offres marketplaces).

| Modèle | Fourchette indicative TTC (France, mars 2026) | Commentaire |
|--------|-----------------------------------------------|------------|
| **Pi 3 B** (neuf / stock résiduel) | environ **35–55 €** | Souvent **moins** en occasion ; attention aux arnaques « trop belles ». |
| **Pi 4 B** (2 / 4 / 8 Go typiques) | **~55–100+ €** selon barrette | Le **1 Go** existe au catalogue historique mais **peut être introuvable** ou peu pertinent neuf. |
| **Pi 5** **1 Go** | d’environ **65–75 €** | Entrée de gamme « officielle » quand disponible. |
| **Pi 5** **2 Go** | **~75–92 €** | Bon compromis **serveur léger** / **petit desktop**. |
| **Pi 5** **4 Go** | **~95–110 €** | Usage **bureau** / dev **standard**. |
| **Pi 5** **8 Go** | **~145–155 €** | Multi-tâches, **VM légères**, compilation. |
| **Pi 5** **16 Go** | **~205–275 €** | Modèles récents ; prix **très volatil** selon stock. |

*Vérifiez toujours la **fiche vendeur**, la **révision** de la carte et les **accessoires** inclus (absence d’alimentation officielle, coût du dissipateur sur Pi 5, etc.).*

## 5. Quel Raspberry choisir selon le cas d’usage ?

**Rester sur un Pi 3** quand : vous **réutilisez du matériel**, vous ciblez un **projet très léger** (GPIO, sonde, petit script), ou vous acceptez un environnement qui **râle** dès que le navigateur ou les compilations grossissent — voir encore notre [mise en route Raspberry Pi 3](/mise-en-route-raspberry-pi-3-modele-b/).

**Passer au Pi 4** quand : vous voulez un **NAS DIY modeste**, un **serveur** avec du **débit**, du **branchement disque USB 3**, ou un **poste Linux** utilisable au quotidien **sans exploser le budget** du Pi 5.

**Monter au Pi 5** quand : vous avez besoin de **marge CPU**, de **8 Go ou plus** (idéalement **16 Go** pour certains workloads « edge »), ou du **bus PCIe** ; prévoir **refroidissement actif** et **bonne alimentation**.

**Pour un ado hésitant entre « carte nue » et robot** : reprenez aussi [Raspberry Pi ou kit robot pour ado](/raspberry-pi-ou-kit-robot-ado-guide/) — la question est souvent **pédagogie** / **motivation**, pas seulement le brut MIPS.

## 6. Prolongements

- Guide mémoire **Pi 4** : [/raspberry-pi-4-quelle-version-memoire-acheter/](/raspberry-pi-4-quelle-version-memoire-acheter/)
- Guide mémoire **Pi 5** : [/raspberry-pi-5-quelle-version-memoire-acheter/](/raspberry-pi-5-quelle-version-memoire-acheter/)
- Première installation (écrit autour du Pi 3 mais transposable) : [mise en route Imager / SSH](/mise-en-route-raspberry-pi-3-modele-b/)

## Liens Amazon (affiliation)

- [Raspberry Pi 5 Amazon recherche](https://www.amazon.fr/s?k=Raspberry+Pi+5&tag=manuso06-21)
- [Raspberry Pi 4 Amazon recherche](https://www.amazon.fr/s?k=Raspberry+Pi+4+Model+B&tag=manuso06-21)
- [Kit Raspberry Pi alimentation dissipateur](https://www.amazon.fr/s?k=Raspberry+Pi+5+dissipateur+alimentation&tag=manuso06-21)

*Partenaire Amazon — commission possible sur achats éligibles.*

---

**En bref** : **Pi 3** = **référence historique** utile mais **serrée** ; **Pi 4** = **sweet spot** réseau / USB pour beaucoup de projets ; **Pi 5** = **plafond performance et RAM**, au prix de la **complexité thermique** et du **coût**.
