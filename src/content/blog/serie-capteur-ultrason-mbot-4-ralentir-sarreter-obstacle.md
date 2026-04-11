---
title: "Capteur ultrason mBot (4/4) : avancer, ralentir puis s’arrêter si obstacle"
headline: "Capteur ultrason mBot (4/4) : avancer, ralentir puis s’arrêter si obstacle"
description: "Quatrième activité capteur ultrason du mBot : le robot avance en ligne droite, joue des sons, ralentit quand un obstacle approche, puis s’arrête. Progression idéale après les radars de recul."
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
  - title: "Capteur ultrason mBot (3/4) : radar cadence selon distance"
    href: "/serie-capteur-ultrason-mbot-3-radar-recul-cadence-distance/"
  - title: "Mon premier programme mBot (téléversement)"
    href: "/mon-premier-programme-mbot/"
  - title: "Activité mBot : détecteur d’intrusion"
    href: "/activite-mbot-detecteur-dintrusion/"
  - title: "Installer les blocs du mBot"
    href: "/installer-les-blocs-du-mbot/"
---

<aside class="article-callout" role="note">
<p><strong>Objectif pédagogique</strong></p>
<p>Faire un vrai comportement robotique complet : une mesure (distance) influence une commande (vitesse moteurs), et on gère des <strong>seuils</strong> + une <strong>progression</strong> (ralentir → stop).</p>
</aside>

## Énoncé

Tu dois programmer le mBot pour qu’il :

1. **Avance en ligne droite**.
2. **Joue des sons** pendant qu’il avance (ou des bips) pour indiquer qu’il “surveille”.
3. **Ralentit** s’il y a un obstacle devant lui.
4. **S’arrête** si l’obstacle est trop proche.

Important : on veut une progression **douce** (pas juste “avance / stop”).  
On va donc calculer une vitesse à partir de la distance.

---

## 1) Définir des distances de référence (simple et efficace)

Tu peux partir sur :

- `DIST_STOP = 15` cm (en dessous : arrêt)
- `DIST_RALENTI = 50` cm (au-delà : vitesse normale)

Entre 15 et 50 cm, la vitesse diminue progressivement.

### Schéma (zone d’action)

```text
distance_cm :   0 ----- 15 ----------- 50 -------------------->
vitesse     :  stop  ralentit progressif     vitesse normale
```

---

## 2) Construire la logique

Variables conseillées :

- `distance_cm`
- `vitesse` (ex. de 0 à 100)

### 2.1 Mettre à jour la distance en continu

Comme dans les activités précédentes :

- on lit le capteur ultrason régulièrement
- on attend un tout petit peu

### 2.2 Calculer une vitesse “qui descend” quand on approche

On choisit une vitesse normale, par exemple :

- `VITESSE_MAX = 80`
- `VITESSE_MIN = 30` (une vitesse lente mais qui avance encore)

Règle simple :

- si `distance_cm >= 50` → `vitesse = 80`
- si `distance_cm <= 15` → `vitesse = 0` (stop)
- sinon → vitesse intermédiaire (entre 30 et 80)

#### Formule pédagogique (linéaire)

Entre 15 et 50 cm, on mappe la distance vers une vitesse :

`vitesse = VITESSE_MIN + (distance_cm - 15) × (VITESSE_MAX - VITESSE_MIN) / (50 - 15)`

(soit le même calcul avec le dénominateur **35**.)

Ça donne :

- proche de 15 cm → proche de `VITESSE_MIN`
- proche de 50 cm → proche de `VITESSE_MAX`

> Si tu ne veux pas de formule, tu peux aussi faire 3 paliers (vite / moyen / lent / stop), mais ici on vise “ralentit progressivement”.

---

## 3) Commander les moteurs pour avancer en ligne droite

Sur le mBot, avancer droit = mettre la **même vitesse** à gauche et à droite (ou utiliser un bloc “avancer” s’il existe).

Pseudo-logique globale :

```text
au démarrage
  pour toujours
    mettre distance_cm à (distance ultrason)

    si distance_cm <= 15
      mettre vitesse à 0
      arrêter les moteurs
      (jouer une note grave / bip long)
      attendre 0,1 s
    sinon
      si distance_cm >= 50
        mettre vitesse à 80
      sinon
        calculer vitesse intermédiaire (formule)

      avancer (moteur gauche = vitesse, moteur droit = vitesse)
      jouer une note courte (ou un bip) puis attendre un délai court
```

### 3.1 Sons : une règle simple

Tu peux faire très simple :

- un **bip court** toutes les 0,5 s quand ça avance normalement
- des bips plus rapides quand ça ralentit (optionnel, si tu veux mixer avec l’activité 3)
- un son différent quand il s’arrête

Pour rester lisible :

- son court
- puis `attendre` (ex. 0,5 s)

---

## 4) Tests (et réglages qui marchent vraiment)

- Commence en **USB** (plus fiable) puis téléverse.
- Teste avec un obstacle **plat** (livre).
- Si le robot “tremble” (avance / stop / avance) :
  - augmente `DIST_STOP` (15 → 18 cm)
  - ajoute un petit `attendre 0,05 s` après la lecture capteur
  - évite une vitesse trop basse : `VITESSE_MIN` 30–40 est souvent plus stable que 10

---

## 5) Liste des blocs (solution simple)

Blocs nécessaires (forme générale) :

- **Événement mBot** : `lorsque le mBot démarre`
- **Contrôle** : `pour toujours`
- **Variables** :
  - `mettre [distance_cm] à (...)`
  - `mettre [vitesse] à (...)`
- **Capteur mBot** : `distance (capteur ultrason) en cm`
- **Contrôle** : `si ... alors` / `sinon`
- **Opérateurs** :
  - comparaisons `<=`, `>=`
  - calculs `+`, `-`, `*`, `/` (pour la formule de vitesse)
- **Moteurs mBot** :
  - bloc “mettre vitesse moteur gauche/droit”
  - ou bloc “avancer à la vitesse ...” (selon version)
  - bloc “arrêter” (ou vitesse = 0)
- **Son / Buzzer** : `jouer la note (...) pendant (...) pulsations` (ou “jouer un son” équivalent)
- **Contrôle** : `attendre (...) secondes`

---

## Pour aller plus loin

- Ajouter une LED (vert/orange/rouge) selon la distance.
- En faire un “parking assist” complet : si obstacle détecté, reculer lentement puis stop.
