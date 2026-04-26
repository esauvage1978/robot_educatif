---
title: "Projets mBot faciles : 15 idées en 1 heure"
headline: "15 Projets mBot Faciles à Réaliser en 1 Heure (Débutants + Ateliers STEM)"
description: "15 idées de projets mBot faciles en 1 heure : objectifs, matériel, logique mBlock, résultats. Version atelier (enseignants) + matériel recommandé (Amazon)."
pubDate: "2026-03-30"
updatedDate: "2026-03-31"
heroImage: "../../assets/mbot/mbot-hero.png"
amazonPreset: mbot
categories:
  - "mBot"
  - "Activité"
  - "Scratch"
  - "À partir de 8 ans"
relatedLinks:
  - title: "10 projets mBot en classe + PDF gratuit"
    href: "/10-projets-mbot-gratuits-classe-faciles/"
  - title: "Faire clignoter les LED"
    href: "/activite-mbot-faire-clignoter-les-leds/"
  - title: "Mesurer des distances"
    href: "/activite-mbot-mesurer-des-distances/"
  - title: "Détecteur d’intrusion"
    href: "/activite-mbot-detecteur-dintrusion/"
  - title: "Premier programme mBot"
    href: "/mon-premier-programme-mbot/"
---

Un **mBot** est disponible, mais aucune activité “simple et propre” ne sort spontanément ? C’est fréquent : le robot est prêt, le temps est limité, et les idées se transforment vite en programme de 200 blocs.

Ce guide propose **15 projets mBot faciles** au format **1 heure** pour **enseignants**, **parents** et **clubs STEM**. Chaque projet est formulé comme un atelier prêt à dérouler : **objectif**, **difficulté**, **matériel**, **logique mBlock** (Scratch), **résultat attendu**.

## Résumé

- **Format** : une séance = un objectif clair + une démo finale.
- **Compétences** : conditions, boucles, capteurs, variables, tests.
- **Outils** : mBlock (blocs type Scratch).
- **Mots-clés** : *mBot projet*, *idée projet mBot*, *activité mBot 1 heure*, *atelier robotique enfant*, *mBlock projet simple*.

![En une heure : objectif → code → test → mini-démo](/images/blog/guides-2026/mbot-defis-1h.svg)

## 1 — Pourquoi utiliser mBot pour apprendre la robotique (STEM)

- **STEM concret** : capteurs → décision → moteurs/LED/sons.
- **mBlock (Scratch)** : démarrage rapide, peu d’obstacles techniques.
- **Progression naturelle** : variables, conditions, “états” (modes), débogage.
- **Transfert** : logique réutilisable sur Arduino (capteurs, actionneurs, règles).

Liens utiles (affiliation Amazon, intégration pédagogique) :

- Base atelier : [mBot Makeblock (kit)](https://www.amazon.fr/s?k=mBot+Makeblock+kit&tag=manuso06-21)
- Pour distance/obstacles : [capteur ultrason HC‑SR04](https://www.amazon.fr/s?k=HC-SR04&tag=manuso06-21)
- Variantes capteurs : [extensions mBot (capteurs)](https://www.amazon.fr/s?k=mBot+Makeblock+capteur+extension&tag=manuso06-21)

## 2 — 15 projets mBot réalisables en 1 heure

### Tableau récapitulatif (temps / difficulté)

| # | Projet | Temps | Difficulté |
|---:|---|---:|---|
| 1 | Évitement d’obstacles (ultrason) | 45–60 min | ⭐⭐ |
| 2 | Suiveur de ligne (IR) | 45–60 min | ⭐⭐ |
| 3 | Danse synchronisée (LED + sons) | 30–50 min | ⭐ |
| 4 | Feu tricolore intelligent | 35–55 min | ⭐ |
| 5 | Course autonome (règles + vitesse) | 45–60 min | ⭐⭐ |
| 6 | Robot livreur simple | 45–60 min | ⭐⭐ |
| 7 | Alarme anti‑intrusion (compteur) | 45–60 min | ⭐⭐ |
| 8 | Musique interactive (buzzer) | 30–45 min | ⭐ |
| 9 | Labyrinthe automatique (règles) | 50–60 min | ⭐⭐⭐ |
| 10 | Robot télécommandé (IR / Bluetooth) | 45–60 min | ⭐⭐ |
| 11 | Radar “STOP” (seuil) | 30–45 min | ⭐ |
| 12 | Compteur de passages (anti‑rebond) | 40–60 min | ⭐⭐ |
| 13 | Parking automatique (ralentir puis stop) | 45–60 min | ⭐⭐⭐ |
| 14 | Mode “police” (sirène + gyrophares) | 30–45 min | ⭐ |
| 15 | Mode “niveaux” (1→3) | 50–60 min | ⭐⭐⭐ |

> ⭐ = très accessible ; ⭐⭐ = débutant solide ; ⭐⭐⭐ = intermédiaire (plus de réglages/tests).

---

### 1) mBot évitement d’obstacles (obligatoire)

- **Objectif** : avancer et éviter un obstacle détecté à l’ultrason.
- **Difficulté** : ⭐⭐
- **Matériel** : mBot + capteur ultrason.
- **Logique mBlock** :
  - `répéter indéfiniment`
  - `distance ← lire ultrason (cm)`
  - `si distance < 15 alors` → `stop` puis `tourner droite (0,4 s)`
  - `sinon` → `avancer`
- **Résultat attendu** : déplacement autonome + évitement simple.
- **Ressource** : [Mesurer des distances](/activite-mbot-mesurer-des-distances/).

Matériel utile : [HC‑SR04](https://www.amazon.fr/s?k=HC-SR04&tag=manuso06-21).

---

### 2) mBot suiveur de ligne (obligatoire)

- **Objectif** : suivre une piste noire (scotch isolant).
- **Difficulté** : ⭐⭐
- **Matériel** : capteur IR suiveur de ligne + piste.
- **Logique mBlock** :
  - `répéter indéfiniment`
  - `si capteur ligne = noir` → corriger à gauche/droite
  - `sinon` → avancer
- **Résultat attendu** : suivi stable sur grands virages.

---

### 3) mBot danse synchronisée (obligatoire)

- **Objectif** : mini chorégraphie (mouvements + LED + sons).
- **Difficulté** : ⭐
- **Matériel** : LED + buzzer.
- **Logique mBlock** : séquence “avancer / tourner / LED / note”, répétée 2 fois.
- **Résultat attendu** : démo spectaculaire (30 secondes).

---

### 4) mBot feu tricolore intelligent (obligatoire)

- **Objectif** : feu rouge/vert/orange avec règle (timer).
- **Difficulté** : ⭐
- **Matériel** : LED (ou matrice selon modèle).
- **Logique mBlock** :
  - variable `etat` (`ROUGE`, `VERT`, `ORANGE`)
  - boucle : afficher LED selon `etat`, attendre, passer à l’état suivant
- **Résultat attendu** : cycle propre + compréhension “état”.
- **Ressource** : [Faire clignoter les LED](/activite-mbot-faire-clignoter-les-leds/).

---

### 5) mBot course autonome (obligatoire)

- **Objectif** : course courte avec règles (vitesse, stop, obstacle).
- **Difficulté** : ⭐⭐
- **Matériel** : zone de course + obstacle.
- **Logique mBlock** : distance → vitesse (vite/moins vite/stop).
- **Résultat attendu** : comportement régulé, pas “plein gaz”.

---

### 6) mBot robot livreur simple (obligatoire)

- **Objectif** : livrer un objet léger sur un trajet chronométré.
- **Difficulté** : ⭐⭐
- **Matériel** : support simple (carton/élastique).
- **Logique mBlock** : séquence de mouvements (timings fixes) + stop final.
- **Résultat attendu** : trajet reproductible + restitution orale.

---

### 7) mBot alarme anti‑intrusion (obligatoire)

- **Objectif** : déclencher une alarme et compter les intrusions.
- **Difficulté** : ⭐⭐
- **Matériel** : ultrason + variable compteur.
- **Logique mBlock** :
  - `compteur ← 0`
  - déclencher sur transition “loin → proche” (éviter déclenchements multiples)
- **Résultat attendu** : alarme + compteur fiable.
- **Ressource** : [Détecteur d’intrusion](/activite-mbot-detecteur-dintrusion/).

---

### 8) mBot musique interactive (obligatoire)

- **Objectif** : sons différents selon distance ou bouton.
- **Difficulté** : ⭐
- **Matériel** : buzzer + un capteur.
- **Logique mBlock** : `si / sinon si / sinon` → note grave/médium/aiguë.
- **Résultat attendu** : “instrument” simple.

---

### 9) mBot labyrinthe automatique (obligatoire)

- **Objectif** : sortir d’un labyrinthe avec une règle (main droite simplifiée).
- **Difficulté** : ⭐⭐⭐
- **Matériel** : ultrason + labyrinthe (cartons).
- **Logique mBlock** : “si obstacle → tourner ; sinon avancer”, puis variante “tester côté”.
- **Résultat attendu** : progression régulière.

---

### 10) mBot robot télécommandé (obligatoire)

- **Objectif** : contrôle avant/arrière/gauche/droite.
- **Difficulté** : ⭐⭐
- **Matériel** : IR/Bluetooth selon équipement.
- **Logique mBlock** : événements “bouton pressé” → action moteur.
- **Résultat attendu** : conduite stable + arrêt.

---

### 11) Radar “STOP” (seuil + feedback)

- **Objectif** : feedback clair : vert = OK, rouge = stop + bip.
- **Difficulté** : ⭐
- **Matériel** : ultrason + LED/buzzer.
- **Logique mBlock** : `si distance < seuil` → alerte ; sinon OK.
- **Résultat attendu** : compréhension du seuil.

---

### 12) Compteur de passages (capteur + variable)

- **Objectif** : compter les passages d’un objet devant le robot.
- **Difficulté** : ⭐⭐
- **Matériel** : ultrason (ou IR) + variable.
- **Logique mBlock** : transition + anti‑rebond logique (état).
- **Résultat attendu** : compteur juste.

---

### 13) Parking automatique (approche lente)

- **Objectif** : ralentir puis s’arrêter précisément devant un obstacle.
- **Difficulté** : ⭐⭐⭐
- **Matériel** : ultrason.
- **Logique mBlock** : vitesse par paliers selon la distance.
- **Résultat attendu** : arrêt propre sans collision.

---

### 14) Mode “police” (sirène + gyrophares)

- **Objectif** : séquence de sons + LED (option mouvement).
- **Difficulté** : ⭐
- **Matériel** : LED + buzzer.
- **Logique mBlock** : boucle alternée (LED + notes).
- **Résultat attendu** : rendu motivant, rapide.

---

### 15) Mode “niveaux” (progression 1→3)

- **Objectif** : 3 niveaux dans le même programme via variable `niveau`.
- **Difficulté** : ⭐⭐⭐
- **Matériel** : ultrason recommandé.
- **Logique mBlock** :
  - `niveau = 1` → radar
  - `niveau = 2` → évitement
  - `niveau = 3` → évitement + compteur + vitesse variable
- **Résultat attendu** : différenciation facile en classe.

## 3 — Code simplifié mBlock (exemples de blocs)

### Blocs “si / sinon”

- `distance ← lire ultrason`
- `si distance < seuil` → `stop / tourner`
- `sinon` → `avancer`

### Boucle

- `répéter indéfiniment` : capteur → décision → action

### Variables

- `seuil` (ex. 15 cm)
- `vitesse` (ex. 80 / 40 / 0)
- `compteur` (passages / intrusions)

### Anti‑déclenchement multiple (atelier)

- variable `etat` (`LIBRE` / `PROCHE`) pour compter “1 fois par passage”.

## 4 — Matériel recommandé (AFFILIATION AMAZON)

Produits utiles, alignés sur les projets (pas de spam) :

- **mBot** : [mBot Makeblock kit](https://www.amazon.fr/s?k=mBot+Makeblock+kit&tag=manuso06-21) — idéal pour lancer un atelier.
- **Ultrason** : [HC‑SR04](https://www.amazon.fr/s?k=HC-SR04&tag=manuso06-21) — idéal pour évitement/radar/parking.
- **Arduino (prolongement STEM)** : [kit robotique Arduino débutant](https://www.amazon.fr/s?k=kit+robotique+arduino+d%C3%A9butant&tag=manuso06-21)
- **Moteurs DC** : [moteurs DC robotique](https://www.amazon.fr/s?k=moteur+dc+robotique&tag=manuso06-21)
- **Pack STEM** : [pack STEM enfants](https://www.amazon.fr/s?k=kit+STEM+enfant+robotique&tag=manuso06-21)

*Partenaire Amazon — commission possible sur achats éligibles.*

## 5 — Version atelier pédagogique (enseignants)

### Séance 1h

| Minutes | Activité |
|---:|---|
| 0–5 | objectif + critère de réussite |
| 5–35 | code + tests courts |
| 35–50 | robustesse + variante |
| 50–60 | démo + verbalisation |

### Atelier 2h

- Ajout d’une variable `seuil`, d’un `compteur` et d’un mode “niveau 2”.
- Restitution : expliquer le `si / sinon` et le rôle du capteur.

### Projet 1 semaine

- Jour 1 : choix du projet + prototype “fonctionnel”
- Jour 2 : amélioration (stabilité, réglages)
- Jour 3 : mode / variables / compteur
- Jour 4 : documentation (captures blocs)
- Jour 5 : démonstration + mini concours

## 6 — Erreurs fréquentes (débutants)

- **Code trop long** : mur de blocs → capteur / décision / action.
- **Pas de modularité** : valeurs copiées partout → variables.
- **Mauvaise gestion capteurs** : déclenchements multiples → état/anti‑rebond.
- **Boucle saturée** : actions contradictoires → priorité obstacle + règles simples.

## Checklist atelier mBot (prêt à imprimer)

- [ ] mBlock installé et robot connecté (test moteur OK)
- [ ] objectif en 1 phrase + critère de réussite
- [ ] variables : `seuil`, `vitesse` (si utile), `compteur` (si utile)
- [ ] une variante “niveau 2”
- [ ] une démo finale (2 minutes) planifiée

## Mini quiz (élèves)

1) À quoi sert `si / sinon` sur un robot ?  
2) Pourquoi une variable `seuil` est utile ?  
3) Différence capteur / actionneur ?  
4) Exemple de règle d’évitement d’obstacle ?  

## Ressources mBot (maillage interne)

- [Mon premier programme mBot](/mon-premier-programme-mbot/)
- [Faire clignoter les LED](/activite-mbot-faire-clignoter-les-leds/)
- [Mesurer des distances](/activite-mbot-mesurer-des-distances/)
- [Détecteur d’intrusion](/activite-mbot-detecteur-dintrusion/)
- [Accessoires mBot — par où commencer](/accessoires-mbot-par-ou-commencer/)
