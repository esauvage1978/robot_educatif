---
title: "Capteur ultrason mBot (1/4) : mesurer une distance (cm) dans mBlock"
description: "Première activité capteur ultrason du mBot : comprendre le principe (émission, écho, temps de vol), lire une distance en cm dans mBlock, afficher la valeur en Live, puis préparer la suite (radar de recul)."
pubDate: "2026-03-31"
updatedDate: "2026-03-31"
heroImage: "../../assets/mbot/mbot-hero.png"
amazonPreset: mbot
categories:
  - "Activité"
  - "mBot"
  - "mBlock"
  - "Capteur"
relatedLinks:
  - title: "Activité mBot : mesurer des distances (article historique)"
    href: "/activite-mbot-mesurer-des-distances/"
  - title: "Installer les blocs du mBot"
    href: "/installer-les-blocs-du-mbot/"
  - title: "Premiers pas avec mBlock 5"
    href: "/premier-pas-avec-mblock-5/"
  - title: "Capteur ultrason mBot (2/4) : radar de recul (paliers)"
    href: "/serie-capteur-ultrason-mbot-2-radar-recul-paliers/"
---

<aside class="article-callout" role="note">
<p><strong>Objectif pédagogique</strong></p>
<p>Comprendre ce que mesure vraiment un capteur à ultrason, puis <strong>obtenir une distance fiable</strong> dans une variable. C’est la base des 3 activités suivantes (radar, cadence selon distance, freinage).</p>
</aside>

## Ce que tu vas faire

- Brancher/configurer le **mBot** dans mBlock.
- Lire la distance du **capteur à ultrason** (en **cm**) dans une **variable**.
- Afficher la valeur en continu pour vérifier que la mesure « vit » quand on approche un obstacle.

## Prérequis

- Un [mBot](/mbot-mon-premier-robot-educatif/) (capteur ultrason à l’avant).
- mBlock installé et opérationnel : [installation](/installer-mblock-5-sous-windows-10/) puis [prise en main](/premier-pas-avec-mblock-5/).
- Les blocs du mBot sont visibles (blocs orange) : [installer les blocs du mBot](/installer-les-blocs-du-mbot/).

---

## 1) Comment fonctionne un capteur à ultrason (explication simple)

Un capteur à ultrason « voit » une distance en 3 étapes :

1. Il **émet** un son très aigu (ultrason), inaudible pour nous.
2. L’onde part, touche un obstacle, puis **revient** en **écho**.
3. La carte mesure le **temps** entre l’émission et le retour, puis calcule la distance.

### Schéma 1 — l’idée du « ping → écho »

```text
mBot (capteur)                                  Obstacle (mur, boîte…)
   [émet]  ─────────────── ultrason ───────────────►
   [reçoit] ◄────────────── écho ───────────────────
```

### Schéma 2 — temps de vol (aller + retour)

Si l’onde met `t` secondes pour faire l’aller-retour, alors :

`distance ≈ (vitesse du son × t) / 2`

- **Pourquoi /2 ?** Parce que `t` correspond à l’**aller + retour** (l’onde parcourt **deux fois** la distance à mesurer).
- **Vitesse du son** : environ **343 m/s** à **20 °C**. (Elle change un peu avec la température, mais pour nos activités on l’ignore.)

### Pratico-pratique (pour éviter les mesures “bizarres”)

- **Trop près** : sous ~**3 cm**, le capteur peut mal répondre (l’écho revient “trop tôt”).
- **Trop loin** : au-delà de quelques mètres, l’écho devient trop faible.
- **Obstacle mou** (rideau, pull, plante) : l’écho est absorbé → distance instable.
- **Obstacle incliné** : l’écho repart de côté → distance plus grande ou valeur qui saute.
- **Mesure utile** : vise une zone ~**5 cm à 200 cm** au début, avec un obstacle **plat** (livre, carton).

> Astuce classe : fais bouger une feuille A4 devant le capteur. Si la distance change bien, la chaîne “capteur → variable” est OK.

---

## 2) Activité : mesurer une distance (cm) dans mBlock

### 2.1 Créer une variable distance

Crée une variable nommée par exemple :

- `distance_cm`

Et affiche-la dans la scène (case à cocher de la variable).

### 2.2 Lire le capteur en boucle

Le principe : en continu, tu affectes à `distance_cm` la valeur renvoyée par le capteur.

Pseudo-logique :

```text
quand le drapeau vert est cliqué (ou en mode Live)
  pour toujours
    mettre distance_cm à (distance capteur ultrason en cm)
    attendre 0,1 s
```

### 2.3 Live vs téléverser : lequel choisir ici ?

- **Mode Live** : idéal pour ce premier test, car tu vois tout de suite la valeur.
- **Téléverser** : on l’utilisera surtout quand on voudra que le robot “vive tout seul”.

---

## 3) Mini-diagnostic si ça ne marche pas

- **La valeur reste à 0 / ne bouge pas** : vérifie que le bon **appareil mBot** est sélectionné (blocs orange), et que le robot est **connecté** (USB conseillé pour dépanner).
- **Valeurs qui sautent** : augmente `attendre` (ex. 0,2 s), et teste avec un obstacle **plat**.
- **Toujours très grand** : l’obstacle est peut-être trop loin ou trop incliné.

---

## 4) Liste des blocs (solution simple)

Selon ta version de mBlock, les noms exacts varient un peu, mais la solution minimale utilise :

- **Événement** : `quand le drapeau vert est cliqué` *(ou un déclencheur équivalent en Live)*
- **Contrôle** : `pour toujours`
- **Variables** : `mettre [distance_cm] à (...)`
- **Capteur mBot** : bloc du type `distance (capteur ultrason) en cm`
- **Contrôle** : `attendre (0,1) secondes`

---

## Étape suivante

Dans l’activité suivante, tu vas transformer `distance_cm` en un **radar de recul** : plus tu es proche, plus le robot “bipe” vite.
