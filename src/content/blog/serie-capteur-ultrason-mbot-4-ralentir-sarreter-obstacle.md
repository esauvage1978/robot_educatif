---
title: "Exercice mBot (niveau 4) : ralentir et s’arrêter devant un obstacle | série ultrason"
headline: "Exercice mBot : Ralentir et S’arrêter devant un Obstacle (Niveau 4)"
description: "Partie 4/4 : programme mBot autonome — capteur ultrason, vitesse des moteurs, ralentissement et arrêt. Robot programmable 10 ans et collège, mbot programmation avec mBlock."
pubDate: "2026-03-31"
updatedDate: "2026-04-18"
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
  - title: "Capteur ultrason mBot (2/4) : radar à paliers"
    href: "/serie-capteur-ultrason-mbot-2-radar-recul-paliers/"
  - title: "Capteur ultrason mBot (3/4) : cadence et distance"
    href: "/serie-capteur-ultrason-mbot-3-radar-recul-cadence-distance/"
  - title: "Mon premier programme mBot"
    href: "/mon-premier-programme-mbot/"
  - title: "Installer les blocs du mBot"
    href: "/installer-les-blocs-du-mbot/"
  - title: "mBot : robot éducatif programmable"
    href: "/mbot-mon-premier-robot-educatif/"
faqSchema:
  - question: "Comment faire ralentir un robot mBot ?"
    answer: "En boucle, lire la distance avec le capteur ultrason, puis régler la vitesse des moteurs (ou utiliser un bloc d’avancement à vitesse réglable) : plus l’obstacle est proche, plus la vitesse est faible."
  - question: "Comment arrêter un robot avec un capteur ?"
    answer: "Si la distance mesurée passe sous un seuil (par exemple 10 cm), mettre la vitesse des deux moteurs à 0 ou utiliser un bloc « arrêter les moteurs » selon mBlock."
  - question: "Comment éviter les obstacles avec mBot ?"
    answer: "Combiner lecture ultrason, conditions sur la distance et commande des moteurs : avancer quand c’est libre, ralentir puis s’arrêter quand un obstacle est trop proche ; on peut ensuite ajouter un recul ou une rotation dans des projets plus avancés."
  - question: "Quel robot programmable pour enfant de 10 ans ?"
    answer: "Le mBot est très utilisé à l’école et au collège : blocs mBlock, capteur ultrason, moteurs, et possibilité de monter en difficulté jusqu’à des comportements autonomes comme celui de cet article."
---

<aside class="article-callout" role="note">
<p><strong>Fin de la série « capteur ultrason » (4/4)</strong></p>
<p>Tu as enchaîné : <strong>mesure</strong> (<a href="/serie-capteur-ultrason-mbot-1-mesurer-distance/">partie 1</a>), <strong>conditions / paliers</strong> (<a href="/serie-capteur-ultrason-mbot-2-radar-recul-paliers/">partie 2</a>), <strong>cadence</strong> (<a href="/serie-capteur-ultrason-mbot-3-radar-recul-cadence-distance/">partie 3</a>). Ici, le robot <strong>roule</strong> : vitesse, <strong>ralentissement</strong> et <strong>arrêt</strong> — comportement <strong>autonome</strong> complet.</p>
</aside>

## 🧭 Introduction

Dans la série, tu as appris à **mesurer** une distance, à prendre des **décisions** (conditions), puis à jouer sur le **temps** (cadence des bips). **Dernière étape** : le **mBot** devient **autonome** sur le sol : il **avance**, **ralentit** quand un obstacle se rapproche et **s’arrête** si tu es trop près — comme une aide à la conduite sur **voiture**.

Un **robot programmable** peut **adapter sa vitesse** et **s’arrêter** selon la **distance** d’un **obstacle** pour **limiter le risque de collision** : c’est le cœur de l’**évitement simple** et de la **sécurité** en robotique éducative — et une belle conclusion pour une **mbot programmation** de **collège**.

Ce **programme mBot** (un **programme mbot** « complet » avec **moteurs** et **capteur ultrason mBot**) se teste surtout **téléversé** dans la carte : le robot roule **sans** câble USB — vrai comportement **autonome**. Rappel : [premier téléversement](/mon-premier-programme-mbot/).

<div class="article-cta-row">
<a class="article-cta article-cta--primary" href="/serie-capteur-ultrason-mbot-3-radar-recul-cadence-distance/">Partie 3 — Cadence</a>
<a class="article-cta article-cta--secondary" href="/installer-les-blocs-du-mbot/">Blocs mBot</a>
</div>

---

## 📘 Partie 1 — Consigne (exercice)

### 🎯 Objectif

**Programmer le mBot** pour qu’il :

1. **avance** « normalement » quand le chemin est dégagé ;  
2. **ralentisse** quand un **obstacle** se rapproche ;  
3. **s’arrête complètement** si l’obstacle est **trop proche** ;  
4. **reparte** si l’obstacle **disparaît** (distance à nouveau grande).

### 📋 Matériel

- **Robot mBot**  
- **mBlock** + **blocs mBot** ([installation](/installer-mblock-5-sous-windows-10/))  
- Zone de sol dégagée, obstacle **plat** (carton, livre)

### 📝 Consigne

**Programme ton robot pour :**

1. **Avancer** à **vitesse normale** (même vitesse gauche / droite pour aller droit).  
2. **Si** un obstacle est à **moins de 30 cm** → **ralentir** (vitesse plus faible).  
3. **Si** un obstacle est à **moins de 10 cm** → **arrêter** les moteurs (**vitesse 0**).  
4. **Si** la distance redevient **grande** (obstacle écarté) → **repartir** à vitesse normale.

Les **seuils** 30 / 10 cm sont des **exemples** : la classe peut les noter au tableau et les ajuster.

---

## 📚 Partie 2 — Leçon (concepts clés)

### 🧠 1. Notion de vitesse (nouveau)

Un **robot à roues** peut avancer **plus ou moins vite** :

- **Vitesse élevée** (moteurs à une forte valeur, ex. proche de 100 selon les blocs) → déplacement **rapide**.  
- **Vitesse faible** → déplacement **lent**.  
- **Vitesse nulle** → **arrêt**.

👉 Dans **mBlock**, la **vitesse** se règle souvent avec des blocs **moteurs** (gauche / droit) ou un bloc **avancer** à **puissance** donnée.

### 🧠 2. Logique progressive (important)

Comportement **intelligent** en trois idées :

| Situation | Exemple (distance) | Comportement |
| --- | --- | --- |
| **Loin** | plus de **30 cm** | **rapide** (normal) |
| **Proche** | entre **10 et 30 cm** | **lent** |
| **Très proche** | **moins de 10 cm** | **stop** |

Ce type de **logique** (mesure → seuils → action) est utilisé dans les **robots** et **systèmes automatisés** pour **réduire les collisions** et gérer l’espace.

**Analogie voiture :** loin tu roules à allure normale ; en approchant un obstacle, tu lèves le pied ; très près tu t’arrêtes.

### 🧠 3. Combinaison des concepts (série complète)

Tu utilises **tout** ce que tu as vu :

- **Capteur ultrason** → **mesure** de distance (cm).  
- **Conditions** → **décider** quelle vitesse ou l’arrêt.  
- **Temps** → petits **attendre** dans la boucle pour stabiliser la lecture (comme en [partie 3](/serie-capteur-ultrason-mbot-3-radar-recul-cadence-distance/)).  
- **Vitesse / moteurs** → **action concrète** sur le sol.

👉 C’est la **synthèse** de la série : **percevoir**, **décider**, **agir**.

### 🧠 4. Rappel : capteur ultrason

Le **capteur ultrason mBot** estime la **distance** grâce au **temps de retour** d’une **onde sonore** qui **va et revient** sur l’obstacle. Détail physique : [partie 1](/serie-capteur-ultrason-mbot-1-mesurer-distance/).

---

## 💻 Partie 3 — Réponse (programme mBot)

### 🧪 Logique attendue

**Boucle infinie** :

1. **Lire** `distance_cm` (ultrason).  
2. **Adapter** la **vitesse** des moteurs (ou la consigne « avancer ») selon les seuils.  
3. **Attendre** un court instant pour ne pas saturer le programme (ex. 0,05 à 0,1 s).

### 🧩 Pseudo-code pédagogique

```text
Répéter indéfiniment
  mettre distance_cm = lecture capteur ultrason (cm)

  SI distance_cm < 10
    arrêter les moteurs (vitesse 0)

  SINON SI distance_cm < 30
    avancer lentement (faible vitesse, gauche = droite)

  SINON
    avancer rapidement (vitesse normale, gauche = droite)

  attendre un court instant
```

Quand la distance repasse **au-dessus de 30 cm**, la branche **SINON** (vitesse normale) s’applique à nouveau : le robot **repart** tout seul.

### 🧠 Explication

- Le robot **mesure en continu** devant lui.  
- Il **module sa vitesse** selon la **proximité** de l’obstacle.  
- Il **évite la collision** en s’arrêtant si besoin.

👉 C’est la base d’un **évitement d’obstacle** en **ligne droite**. Pour des parcours plus complexes (tourner, contourner), il faudra d’autres règles — mais la **structure** reste la même.

**Option « plus fluide » (collège avancé) :** entre 10 et 30 cm, tu peux calculer une **vitesse intermédiaire** avec une petite **formule** (proportionnelle à la distance) au lieu de deux vitesses fixes — effet plus « doux », comme dans les versions expertes de cet exercice.

<p class="article-note">Téléversement et dépannage : <a href="/mon-premier-programme-mbot/">Mon premier programme mBot</a>, <a href="/mblock-bluetooth-erreurs-frequentes-depannage/">Bluetooth / mBlock</a>.</p>

---

## 🎯 Partie 4 — Aller plus loin

### 🔥 Défi 1 — Reculer après l’arrêt

Après l’**arrêt** sous le seuil critique, fais **reculer** le robot **lentement** pendant une **durée** fixe, puis **reprendre** la logique d’avance — utile pour se « dégager » d’un obstacle immobile.

### 🔥 Défi 2 — Signal sonore à l’arrêt

Quand tu passes en **arrêt**, joue une **note** ou un **bip** distinct (comme en [partie 2](/serie-capteur-ultrason-mbot-2-radar-recul-paliers/) / [partie 3](/serie-capteur-ultrason-mbot-3-radar-recul-cadence-distance/)) pour entendre l’**alerte** sans regarder le robot.

### 🔥 Défi 3 — Robot autonome « éviteur »

Enchaîne **avance**, **détection**, **arrêt** ou **recul**, puis **rotation** légère pour **contourner** — vers un **parcours autonome** ; tu peux t’inspirer d’activités comme le [détecteur d’intrusion](/activite-mbot-detecteur-dintrusion/) pour la structure en blocs.

---

## 🤖 Résumé rapide

- **Capteur ultrason** = **distance**.  
- **Programme** = **conditions** + **vitesse** (moteurs).  
- **Comportement** = **ralentit** + **s’arrête** pour **éviter** l’obstacle.

---

## 💡 Robot éducatif pour apprendre la programmation

Le **mBot** est un **robot éducatif** et un **robot programmable** adapté **dès 10 ans** (puis **collège** pour des projets comme celui-ci). Idéal pour **apprendre la programmation** avec un **résultat visible** : le robot **bouge** sur le sol. Pour en savoir plus sur le matériel : [mBot — présentation](/mbot-mon-premier-robot-educatif/).

---

## 📊 Bonus : schémas et tableau

### Comportement du robot (schéma)

```text
        obstacle loin          obstacle moyen        obstacle très près
              |                      |                      |
distance :  > 30 cm            10 à 30 cm               < 10 cm
              |                      |                      |
action   :  AVANCE VITE        AVANCE LENT            ARRÊT
```

### Distance → vitesse (exemple pédagogique)

| Distance (exemple) | Action |
| --- | --- |
| **plus de 30 cm** | vitesse **normale** |
| **10 à 30 cm** | vitesse **réduite** |
| **moins de 10 cm** | **arrêt** (0) |

### Exemple concret (voiture)

Comme une **voiture** qui approche d’un mur : loin tu roules normalement ; en t’approchant tu **ralentis** ; tout près tu **t’arrêtes**. Le **programme mBot** imite cette **logique** avec des **nombres** (cm) et des **blocs**.

---

## ❓ FAQ

Les réponses détaillées sont dans le **bloc FAQ structuré** de la page (données enrichies), alignées sur les recherches **mbot programmation**, **ralentir mBot**, **arrêt capteur**, **évitement**, **robot 10 ans**.

---

## 🔗 Série capteur ultrason — bilan

| Partie | Thème | Lien |
| --- | --- | --- |
| **1/4** | Mesurer la distance | [Partie 1](/serie-capteur-ultrason-mbot-1-mesurer-distance/) |
| **2/4** | Conditions / paliers | [Partie 2](/serie-capteur-ultrason-mbot-2-radar-recul-paliers/) |
| **3/4** | Cadence (temps) | [Partie 3](/serie-capteur-ultrason-mbot-3-radar-recul-cadence-distance/) |
| **4/4** | **Vitesse + arrêt** (cet article) | — |

<div class="article-cta-row">
<a class="article-cta article-cta--primary" href="/serie-capteur-ultrason-mbot-1-mesurer-distance/">Revoir la partie 1</a>
<a class="article-cta article-cta--secondary" href="/10-projets-mbot-gratuits-classe-faciles/">10 idées projets mBot (classe)</a>
</div>
