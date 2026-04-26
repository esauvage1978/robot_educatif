---
title: "Exercice mBot (mBlock) : capteur ultrason — mesurer une distance | programme débutant"
headline: "Exercice mBot : Mesurer une Distance avec le Capteur Ultrason (Débutant)"
description: "Exercice mBot et mBlock : programme pour lire le capteur ultrason, enregistrer la distance dans une variable et l’afficher. Robot programmable dès 10 ans, idéal pour la classe. Partie 1/4."
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
  - title: "Capteur ultrason mBot (2/4) : radar de recul (paliers)"
    href: "/serie-capteur-ultrason-mbot-2-radar-recul-paliers/"
  - title: "Capteur ultrason mBot (3/4) : cadence selon la distance"
    href: "/serie-capteur-ultrason-mbot-3-radar-recul-cadence-distance/"
  - title: "Capteur ultrason mBot (4/4) : ralentir puis s’arrêter"
    href: "/serie-capteur-ultrason-mbot-4-ralentir-sarreter-obstacle/"
  - title: "Mon premier programme mBot"
    href: "/mon-premier-programme-mbot/"
  - title: "Installer les blocs du mBot"
    href: "/installer-les-blocs-du-mbot/"
  - title: "mBot : présentation du robot éducatif"
    href: "/mbot-mon-premier-robot-educatif/"
faqSchema:
  - question: "Comment programmer mBot ?"
    answer: "Avec mBlock : on assemble des blocs (comme Scratch), on connecte le robot en USB ou Bluetooth, puis on lance le programme en mode Live ou on le téléverse dans la carte. Pour ce tutoriel, il suffit de lire le capteur ultrason et d’afficher la distance dans une variable."
  - question: "Comment fonctionne le capteur ultrason du mBot ?"
    answer: "Il envoie une onde sonore trop aiguë pour nos oreilles, l’onde rebondit sur un obstacle, et le robot mesure le temps entre l’envoi et le retour pour calculer la distance en centimètres."
  - question: "À quoi sert une variable dans un programme mBot ?"
    answer: "C’est une case mémoire avec un nom : on y range la valeur mesurée (par exemple la distance), pour la réutiliser ensuite (affichage, tests, calculs)."
  - question: "Quel robot pour apprendre à coder à 10 ans ?"
    answer: "Le mBot est un robot programmable très utilisé à l’école et au collège : roues, capteurs (dont ultrason), programmation par blocs dans mBlock, et possibilité d’aller plus loin ensuite."
---

<aside class="article-callout" role="note">
<p><strong>Série « capteur ultrason » (4 parties)</strong></p>
<p>Cet exercice est la <strong>partie 1/4</strong> : on pose les bases (distance + variable). Ensuite, la série enchaîne avec des <strong>conditions</strong>, un radar, puis un <strong>obstacle</strong> et un <strong>mini-projet complet</strong>.</p>
</aside>

## 🧭 Introduction

Tu veux **apprendre à programmer un robot** avec un objectif clair : **mesurer une distance** devant le mBot et **voir le résultat** à l’écran. C’est un **programme mBot** accessible **dès 10 ans** (école ou collège), avec le logiciel **mBlock** et des blocs à emboîter. Que tu cherches un **programme mbot** tout prêt ou une entrée en **mbot programmation** en classe, la page suit toujours le même schéma : **consigne**, **leçon courte**, puis **réponse possible**.

**À retenir tout de suite :** le **capteur ultrason** mesure une distance grâce à un **signal sonore** (inaudible) qui part, **rebondit** sur un obstacle, puis revient. Le robot s’appuie sur ce **aller-retour** pour calculer **combien de centimètres** séparent le robot de l’obstacle.

<div class="article-cta-row">
<a class="article-cta article-cta--primary" href="/premier-pas-avec-mblock-5/">Premiers pas mBlock</a>
<a class="article-cta article-cta--secondary" href="/installer-les-blocs-du-mbot/">Blocs mBot dans mBlock</a>
</div>

---

## 📘 Partie 1 — Consigne (exercice)

### 🎯 Objectif de l’exercice

Tu dois réaliser un **programme mBot** qui :

1. **mesure** la distance devant le robot avec le **capteur ultrason** ;
2. **affiche** cette distance (pour vérifier que la mesure change quand tu bouges un obstacle).

### 📋 Matériel

- un **robot mBot** (capteur ultrason à l’avant) ;
- l’ordinateur avec **mBlock** ([installation](/installer-mblock-5-sous-windows-10/), [prise en main](/premier-pas-avec-mblock-5/)) ;
- les **blocs mBot** visibles dans mBlock ([aide à l’installation des blocs](/installer-les-blocs-du-mbot/)).

### 📝 Consigne (ce que tu dois faire)

**Programme ton robot pour :**

1. **Lire** la distance avec le **capteur ultrason** (en centimètres).  
2. **Stocker** cette valeur dans une **variable** (par exemple `distance_cm`).  
3. **Afficher** la distance (variable cochée dans la zone Variables, ou affichage prévu dans ta version de mBlock).

**En classe :** un binôme peut lire la consigne, l’autre place les blocs ; au tableau, notez la **chaîne** : capteur → variable → affichage.

---

## 📚 Partie 2 — Leçon (explication)

### 🧠 1. Comment fonctionne le capteur ultrason ?

En trois idées simples :

1. Le capteur **envoie** un petit « bip » ultrason (on ne l’entend pas).  
2. Le son **se reflète** sur l’obstacle et **revient**.  
3. Le robot **mesure le temps** entre l’envoi et le retour, puis **calcule la distance**.

Le capteur comporte un **émetteur** et un **récepteur** : l’un envoie l’onde, l’autre écoute l’écho. **La distance se déduit du temps de retour du signal** (plus l’obstacle est loin, plus le signal met de temps à revenir).

**Schéma — émission et écho**

```text
Étape 1 — émission          Étape 2 — écho
mBot  ──── ultrason ────►   mur / boîte
mBot  ◄──── retour ─────    (réflexion)
```

### 🧠 2. Notion importante : la variable

Une **variable**, c’est une **mémoire** avec un **nom** tu choisis (ici `distance_cm`).  
Tu y **ranges** le nombre renvoyé par le capteur ; ensuite tu peux **l’afficher**, le **comparer**, ou t’en servir dans un **test** (ce sera utile dans la [partie 2 de la série](/serie-capteur-ultrason-mbot-2-radar-recul-paliers/), avec des **conditions** du type « si la distance est petite… »).

Dans **mBlock**, on utilise une variable pour **enregistrer** la distance mesurée à chaque tour de boucle.

### 🧠 3. Le bloc mBlock à utiliser

Dans la catégorie **capteur / mBot**, cherche le bloc qui donne la **distance du capteur ultrason** (souvent en **cm**).  
En usage courant, la valeur reste souvent dans une plage du type **3 cm à environ 400 cm** selon l’obstacle et l’environnement (trop près ou trop loin peut donner des lectures moins fiables).

**Astuce :** teste avec un **carton plat** face au robot ; bouge la feuille lentement et regarde la valeur changer.

---

## 💻 Partie 3 — Réponse (programme mBot)

### 🧪 Programme attendu (logique)

La structure logique d’un **mbot programme** simple pour cet exercice :

1. **Créer** une variable `distance_cm` (ou un nom clair du même type).  
2. **Lire** le capteur ultrason et **mettre** cette valeur dans la variable.  
3. **Afficher** la variable (et, si besoin, **répéter** en boucle pour voir la mesure vivre).

### 🧩 Exemple de programme (pseudo-blocs)

```text
Quand le programme démarre
  pour toujours
    mettre distance_cm = (distance ultrason en cm)
    attendre un court instant (ex. 0,1 s)
```

*(Les noms exacts des blocs peuvent varier selon la langue et la version de mBlock, mais l’ordre reste le même.)*

### 🧠 Explication du programme

- Le robot **lit** la distance **en continu** (boucle).  
- Il **stocke** le résultat dans **une variable**.  
- Tu **vois** la valeur : c’est la preuve que ton **programme mBot** et le **capteur ultrason mBot** fonctionnent ensemble.

**Live ou téléverser ?** Pour ce premier exercice, le **mode Live** est pratique pour voir les nombres changer tout de suite. Le **téléversement** servira surtout quand le robot devra tourner **sans** le câble USB.

<p class="article-note">Besoin d’un pas à pas connexion / blocs orange ? Voir <a href="/mon-premier-programme-mbot/">Mon premier programme mBot</a>.</p>

---

## 🎯 Partie 4 — Aller plus loin

Quand la mesure est stable, tu peux enchaîner avec la suite de la série :

- **[Partie 2 — conditions et paliers](/serie-capteur-ultrason-mbot-2-radar-recul-paliers/)** : utiliser la distance dans des **tests** (plusieurs zones, bips différents).  
- **[Partie 3 — radar et distance](/serie-capteur-ultrason-mbot-3-radar-recul-cadence-distance/)** : lier la **cadence** des bips à la proximité d’un **obstacle**.  
- **[Partie 4 — projet complet](/serie-capteur-ultrason-mbot-4-ralentir-sarreter-obstacle/)** : avancer, **ralentir**, **s’arrêter** si obstacle.

### 🔥 Défi 1

Afficher la distance sur la **matrice LED** du mBot (si ton modèle et les blocs le permettent), en plus de la zone de texte / variable.

### 🔥 Défi 2

Ajouter une **condition** : **si** la distance est **plus petite que 10 cm** alors afficher **« danger »** (ou un symbole), **sinon** afficher la valeur normale. C’est la porte d’entrée vers la **programmation** avec **si / alors / sinon** — détaillée dans la [partie 2](/serie-capteur-ultrason-mbot-2-radar-recul-paliers/).

---

## 🤖 Résumé rapide (pour l’IA et la révision)

- **mBot** = **robot programmable** avec capteurs.  
- **Capteur ultrason** = mesure une **distance** devant le robot.  
- **Programme** = **variable** + lecture capteur + **affichage** (puis conditions dans les articles suivants).

---

## 💡 Pour les familles et les enseignants

Le **mBot** est un **robot éducatif** très adapté pour **débuter la programmation** vers **10 ans** : on voit tout de suite le lien entre le **programme** sur l’écran et le **robot** qui réagit. Pour choisir un modèle ou un kit : [présentation du mBot](/mbot-mon-premier-robot-educatif/).

---

## 🔢 Étapes numérotées (à imprimer ou au tableau)

1. Ouvrir **mBlock** et ajouter le **mBot**.  
2. Créer la variable **`distance_cm`**.  
3. Placer une boucle **« pour toujours »**.  
4. À l’intérieur : **mettre** `distance_cm` **à** la valeur du **capteur ultrason (cm)**.  
5. Ajouter une petite **pause** (ex. 0,1 s) pour une lecture plus stable.  
6. Lancer en **Live** et bouger un obstacle : la distance doit **changer**.

---

## ❓ FAQ

Les réponses détaillées figurent dans le **bloc FAQ structuré** (données enrichies) de la page, avec notamment : **comment programmer mBot**, **comment fonctionne le capteur ultrason**, **à quoi sert une variable**, **quel robot pour apprendre à coder à 10 ans**.

---

## Liens utiles de la série

| Étape | Lien |
| --- | --- |
| 1/4 Mesurer (vous êtes ici) | Cet article |
| 2/4 Conditions / paliers | [Radar de recul (paliers)](/serie-capteur-ultrason-mbot-2-radar-recul-paliers/) |
| 3/4 Cadence et obstacle | [Radar amélioré](/serie-capteur-ultrason-mbot-3-radar-recul-cadence-distance/) |
| 4/4 Projet complet | [Ralentir et s’arrêter](/serie-capteur-ultrason-mbot-4-ralentir-sarreter-obstacle/) |

<div class="article-cta-row">
<a class="article-cta article-cta--primary" href="/serie-capteur-ultrason-mbot-2-radar-recul-paliers/">Partie 2 — Conditions (paliers)</a>
<a class="article-cta article-cta--secondary" href="/activite-mbot-mesurer-des-distances/">Activité « mesurer des distances » (archive)</a>
</div>
