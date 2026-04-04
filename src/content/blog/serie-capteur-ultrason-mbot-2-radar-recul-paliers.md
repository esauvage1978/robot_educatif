---
title: "Capteur ultrason mBot (2/4) : radar de recul (bips par paliers)"
description: "Deuxième activité capteur ultrason du mBot : créer un radar de recul simple avec 3 zones (>=70 cm, 35–70 cm, <35 cm) et des bips à cadence fixe (1 s puis 0,25 s)."
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
  - title: "Capteur ultrason mBot (1/4) : mesurer une distance"
    href: "/serie-capteur-ultrason-mbot-1-mesurer-distance/"
  - title: "Capteur ultrason mBot (3/4) : radar amélioré (cadence selon distance)"
    href: "/serie-capteur-ultrason-mbot-3-radar-recul-cadence-distance/"
  - title: "Mon premier programme mBot (téléverser)"
    href: "/mon-premier-programme-mbot/"
  - title: "Dépannage Bluetooth / mBlock"
    href: "/mblock-bluetooth-erreurs-frequentes-depannage/"
---

<aside class="article-callout" role="note">
<p><strong>Objectif pédagogique</strong></p>
<p>Passer de « je mesure » à « je décide » : transformer une distance en <strong>comportement</strong> grâce à des <strong>conditions</strong> et du <strong>temps</strong> (attendre).</p>
</aside>

## Énoncé (radar de recul à 3 zones)

Tu dois programmer le mBot pour qu’il se comporte comme un **radar de recul** :

- **Si distance ≥ 70 cm** : il ne fait **rien** (silence).
- **Si 35 cm ≤ distance < 70 cm** : il joue une **note** toutes les **1 seconde**.
- **Si 0 cm ≤ distance < 35 cm** : il joue une **note** toutes les **0,25 seconde**.

> Ici on fait volontairement simple : même note, seulement la **cadence** change. Dans l’activité 3, on rendra la cadence “proportionnelle”.

---

## 1) Schéma de décision (à recopier au tableau)

```text
              distance_cm (capteur ultrason)
                         |
        +----------------+-----------------+
        |                                  |
   distance >= 70 ?                    non (donc < 70)
        |                                  |
     rien                              distance >= 35 ?
                                           |        |
                                         oui       non (donc < 35)
                                           |        |
                                   bip toutes      bip toutes
                                     1 s            0,25 s
```

---

## 2) Construire le programme pas à pas

### 2.1 Garder la variable distance_cm

On réutilise la variable de l’activité 1 :

- `distance_cm`

Et on la met à jour en boucle :

- lire le capteur ultrason
- attendre un peu (ex. 0,05 à 0,2 s)

### 2.2 Attention au piège “je bip trop vite”

Si tu écris :

```text
si distance < 35 alors jouer une note
```

dans une boucle **pour toujours** sans temporisation, le robot va “biper” **le plus vite possible** (ça peut devenir un son quasi continu).

Donc ici, **le temps** fait partie du cahier des charges : on met un `attendre` différent selon la zone.

### 2.3 Une solution simple (logique)

Pseudo-logique (facile à traduire en blocs) :

```text
au démarrage
  pour toujours
    mettre distance_cm à (distance ultrason)
    si distance_cm >= 70
      attendre 0,1 s
    sinon
      si distance_cm >= 35
        jouer une note (ex. C4) pendant 0,25 pulsation
        attendre 1 s
      sinon
        jouer une note (ex. C4) pendant 0,25 pulsation
        attendre 0,25 s
```

> Pourquoi un `attendre` dans la zone “rien” ? Pour éviter de marteler le capteur à vitesse max et garder une boucle stable.

---

## 3) Tester (mode Live puis téléversement)

- **En Live** : approche lentement un livre devant le capteur et observe si les bips changent de rythme autour de ~70 cm et ~35 cm.
- **En autonome** : téléverse ensuite le programme (voir [Mon premier programme mBot](/mon-premier-programme-mbot/)).

---

## 4) Améliorations possibles (sans changer l’énoncé)

- Ajouter une **LED** (vert / orange / rouge) selon la zone.
- Filtrer les valeurs “impossibles” (ex. si la mesure vaut 0 ou très grande) en affichant “—” ou en gardant la dernière valeur connue.

---

## 5) Liste des blocs (solution simple)

Blocs typiques nécessaires :

- **Événement mBot** : `lorsque le mBot démarre` *(pour un programme autonome)*  
  ou `quand le drapeau vert est cliqué` *(pour tester en Live)*
- **Contrôle** : `pour toujours`
- **Variables** : `mettre [distance_cm] à (...)`
- **Capteur mBot** : `distance (capteur ultrason) en cm`
- **Contrôle** : `si ... alors` / `sinon` (conditions imbriquées)
- **Opérateurs** : `>=` (comparaisons) + nombres `70` et `35`
- **Son / Buzzer mBot** : `jouer la note (...) pendant (...) pulsations` *(ou bloc équivalent buzzer)*
- **Contrôle** : `attendre (1) s` et `attendre (0,25) s` (+ `attendre (0,1) s` côté silence)

---

## Étape suivante

Dans l’activité 3, on va garder l’idée du radar, mais au lieu de 2 cadences fixes (1 s / 0,25 s), on fera une **cadence qui dépend de la distance** : plus on est proche, plus ça bip vite.
