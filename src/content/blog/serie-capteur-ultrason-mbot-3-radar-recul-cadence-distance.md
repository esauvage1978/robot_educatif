---
title: "Capteur ultrason mBot (3/4) : radar de recul amélioré (cadence liée à la distance)"
headline: "Capteur ultrason mBot (3/4) : radar de recul amélioré (cadence liée à la distance)"
description: "Troisième activité capteur ultrason du mBot : améliorer le radar de recul en calculant un délai (attendre) en fonction de la distance. Plus l’obstacle est proche, plus les bips sont rapides."
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
  - title: "Capteur ultrason mBot (2/4) : radar par paliers"
    href: "/serie-capteur-ultrason-mbot-2-radar-recul-paliers/"
  - title: "Capteur ultrason mBot (4/4) : ralentir puis s’arrêter"
    href: "/serie-capteur-ultrason-mbot-4-ralentir-sarreter-obstacle/"
  - title: "Activité mBot : mesurer des distances (affichage)"
    href: "/activite-mbot-mesurer-des-distances/"
  - title: "Mon premier programme mBot"
    href: "/mon-premier-programme-mbot/"
---

<aside class="article-callout" role="note">
<p><strong>Objectif pédagogique</strong></p>
<p>Passer d’un radar “à paliers” à un radar “continu” : apprendre à <strong>calculer</strong> une valeur (un délai) à partir d’une mesure (la distance) puis l’utiliser dans <strong>attendre</strong>.</p>
</aside>

## Énoncé

Tu dois améliorer le radar de recul :

- Plus l’obstacle est **loin**, plus les bips sont **lents**.
- Plus l’obstacle est **proche**, plus les bips sont **rapides**.

Contraintes simples pour rester pédagogique :

- On garde une zone de **silence** au-delà d’une certaine distance (par ex. ≥ 70 cm).
- Entre 10 cm et 70 cm, on calcule un **délai** entre les bips.
- En-dessous d’une distance minimale (par ex. < 10 cm), on limite le délai pour éviter un son “continu” et pour garder le programme lisible.

> Tu peux reprendre les mêmes seuils que l’activité 2 (70 cm et 35 cm), mais ici l’idée est d’utiliser une formule au lieu de 2 vitesses fixes.

---

## 1) Schéma d’idée (ce qu’on veut ressentir)

```text
distance (cm) : 70 .............. 50 .............. 35 .............. 20 .............. 10
cadence       : silence  bip...bip...bip..bip..bip.bip.bip.bipbipbipbip (de plus en plus vite)
```

---

## 2) Choisir une règle simple (formule)

On cherche un délai en secondes, par exemple `delai_s`, qui diminue quand la distance diminue.

### Option A (très simple à comprendre) : une règle “inverse” + bornes

1. On limite la distance à une zone utile :
   - si `distance_cm` > 70, on ne bip pas
   - sinon, on force `distance_cm` à rester entre 10 et 70
2. On calcule :

`delai_s = 0,05 × distance_cm`

Exemples :

- à 70 cm → `delai_s = 3,5` s (lent)
- à 20 cm → `delai_s = 1` s (plus rapide)
- à 10 cm → `delai_s = 0,5` s (rapide)

Ce n’est pas une loi “physique”, c’est une **règle pédagogique** qui donne un effet sonore clair.

### Option B (plus “radar”) : délai entre 0,25 s et 1 s

Tu peux vouloir rester proche des valeurs de l’activité 2 :

- loin → 1 s
- proche → 0,25 s

Alors tu peux utiliser une interpolation simple (linéaire) entre 10 et 70 cm :

`delai_s = 0,25 + (distance_cm - 10) × (1 - 0,25) / (70 - 10)`

(soit : `delai_s = 0,25 + (distance_cm - 10) × 0,0125`)

Dans les blocs, c’est juste un calcul avec `+`, `-`, `*`, `/`.  
Si tu trouves cette formule trop “maths”, commence par l’Option A.

---

## 3) Construire le programme (solution simple)

Variables conseillées :

- `distance_cm`
- `delai_s`

Pseudo-logique (Option A) :

```text
au démarrage
  pour toujours
    mettre distance_cm à (distance ultrason)

    si distance_cm >= 70
      attendre 0,1 s
    sinon
      si distance_cm < 10
        mettre distance_cm à 10

      mettre delai_s à (0,05 * distance_cm)
      jouer une note (ex. C4) pendant 0,25 pulsation
      attendre delai_s
```

Pourquoi on “force” la distance à 10 ?

- Pour éviter un délai trop petit (ex. 2 cm → 0,1 s) qui deviendrait vite illisible et stressant.

---

## 4) Tests et réglages

- Si c’est **trop lent** : baisse le coefficient (ex. 0,03 au lieu de 0,05).
- Si c’est **trop rapide** quand tu es proche : augmente la distance minimale (10 → 15).
- Si la mesure tremble : ajoute un petit `attendre 0,05 s` juste après la lecture, ou fais la moyenne de 2 mesures (option avancée).

---

## 5) Liste des blocs (solution simple)

- **Événement mBot** : `lorsque le mBot démarre` *(autonome)* ou drapeau vert *(Live)*
- **Contrôle** : `pour toujours`
- **Variables** :
  - `mettre [distance_cm] à (...)`
  - `mettre [delai_s] à (...)`
- **Capteur mBot** : `distance (capteur ultrason) en cm`
- **Contrôle** : `si ... alors` / `sinon` (2 niveaux)
- **Opérateurs** :
  - comparaisons `>=`, `<`
  - calculs `*`, `+`, `-`, `/` (selon la formule choisie)
- **Son / Buzzer mBot** : `jouer la note (...) pendant (...) pulsations`
- **Contrôle** : `attendre (delai_s) secondes` + petit `attendre (0,1)` côté silence

---

## Étape suivante

Dans l’activité 4, on garde l’idée “plus proche = plus d’alerte”, mais au lieu de seulement biper, le robot va **avancer**, puis **ralentir** progressivement, puis **s’arrêter** si un obstacle est détecté.
