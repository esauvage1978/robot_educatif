---
title: "Exercice mBot (niveau 3) : radar de recul intelligent — cadence et distance | mBlock"
headline: "Exercice mBot : Radar de Recul Intelligent (Cadence et Distance) – Niveau 3"
description: "Partie 3/4 : programme mBot avec boucle, conditions et temps (cadence du bip) selon la distance — capteur ultrason, radar réaliste. Robot programmable 10–13 ans, mbot programmation."
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
  - title: "Capteur ultrason mBot (4/4) : ralentir puis s’arrêter"
    href: "/serie-capteur-ultrason-mbot-4-ralentir-sarreter-obstacle/"
  - title: "Mon premier programme mBot"
    href: "/mon-premier-programme-mbot/"
  - title: "Installer les blocs du mBot"
    href: "/installer-les-blocs-du-mbot/"
  - title: "mBot : robot éducatif programmable"
    href: "/mbot-mon-premier-robot-educatif/"
faqSchema:
  - question: "Comment faire une boucle dans mBlock ?"
    answer: "On utilise le bloc « pour toujours » (ou équivalent) sous un événement de démarrage : tout ce qui est à l’intérieur se répète tant que le programme tourne. À l’intérieur, on lit le capteur, on teste la distance, puis on attend un peu avant le prochain tour."
  - question: "Comment gérer le temps en programmation ?"
    answer: "Avec un bloc « attendre » en secondes (ou millisecondes selon la version). La durée entre deux actions change la cadence : plus l’attente est courte, plus l’effet est rapide (bips serrés)."
  - question: "Comment créer un radar de recul avec mBot ?"
    answer: "Lire en boucle la distance du capteur ultrason en cm, puis décider : silence si loin, bip espacé si moyen, bip rapide si très proche — en adaptant le délai entre deux bips."
  - question: "Comment rendre un robot plus intelligent ?"
    answer: "En combinant mesure (capteur), décision (conditions) et temporisation (attendre). Plus on relie la distance à des délais différents, plus le comportement ressemble à un vrai système d’aide à la conduite."
---

<aside class="article-callout" role="note">
<p><strong>Depuis la partie 2</strong></p>
<p>Tu as un <strong>radar à paliers</strong> (<a href="/serie-capteur-ultrason-mbot-2-radar-recul-paliers/">partie 2</a>) : loin / moyen / près = réponses <strong>fixes</strong> (LED, bip…). Ici, niveau <strong>3</strong> : on rend le comportement <strong>plus réaliste</strong> en jouant sur le <strong>temps entre deux bips</strong> — la <strong>cadence</strong>.</p>
</aside>

## 🧭 Introduction

Après avoir **mesuré** une distance ([partie 1](/serie-capteur-ultrason-mbot-1-mesurer-distance/)) puis réagi par **zones** ([partie 2](/serie-capteur-ultrason-mbot-2-radar-recul-paliers/)), tu passes à une logique **plus fine** : le **programme mBot** ne se contente plus de « trois cases » — il fait **varier la vitesse du bip** comme un **radar de voiture** : plus l’**obstacle** est **proche**, plus le signal se **répète vite**.

**Limite de la partie 2 :** avec seulement des paliers, la réaction peut sembler **trop abrupte**. En ajoutant le **temps** (**attendre**), tu obtiens une **progression** plus naturelle — idéal pour un **programme mBot** ou une recherche du type **« mbot programmation »** / **« programme mbot »** menant à un projet **réaliste** en **collège** (10–13 ans).

Le **capteur ultrason mBot** mesure **en continu** la distance devant le robot ; ton script **adapte** la **cadence** des bips à cette mesure. C’est le même principe qu’un **radar de recul** réel : fréquence d’alerte liée à la **proximité**.

<div class="article-cta-row">
<a class="article-cta article-cta--primary" href="/serie-capteur-ultrason-mbot-2-radar-recul-paliers/">Partie 2 — Paliers</a>
<a class="article-cta article-cta--secondary" href="/premier-pas-avec-mblock-5/">mBlock — premiers pas</a>
</div>

---

## 📘 Partie 1 — Consigne (exercice)

### 🎯 Objectif

**Programmer le mBot** pour qu’il :

1. **détecte** la distance avec le **capteur ultrason** ;  
2. **adapte la cadence du bip** : **plus** l’objet est **proche**, **plus** les bips se **succèdent vite** ; **loin** → **pas de bip**.

### 📋 Matériel

- **Robot mBot**  
- **mBlock** ([installation](/installer-mblock-5-sous-windows-10/))  
- Obstacle **plat** pour tester (carton, livre)

### 📝 Consigne

**Programme ton robot pour :**

1. **Lire** la distance (**cm**) avec le **capteur ultrason**.  
2. **Si** l’objet est **loin** (au-delà d’un seuil, ex. **plus de 30 cm**) → **pas de bip** (silence).  
3. **Si** l’objet **se rapproche** (ex. **entre 10 cm et 30 cm**) → **bip lent** (grand **temps** entre deux bips, ex. **1 seconde**).  
4. **Si** l’objet est **très proche** (ex. **moins de 10 cm**) → **bip rapide** (petit **temps** entre deux bips, ex. **0,2 seconde**).

Les **nombres** (30 / 10 / 1 / 0,2) sont des **exemples** : l’enseignant peut les ajuster au tableau pour la classe.

---

## 📚 Partie 2 — Leçon (concepts clés)

### 🧠 1. Notion de boucle (important)

Le robot doit **surveiller** en permanence : on utilise une **boucle infinie** (**pour toujours**).

- À chaque tour : **lire** la distance → **décider** quoi faire → **attendre** un peu.  
- Sans boucle, le programme ne **mettrait pas à jour** la mesure quand tu **déplaces** l’obstacle.

👉 En **programme mBot**, la **boucle** + le **capteur ultrason** = comportement **réactif**.

### 🧠 2. Notion de temps / cadence (nouveau)

La **cadence**, c’est la **vitesse de répétition** d’une action (ici : un **bip**).

- **Attendre 1 seconde** entre deux bips → effet **calme** (**lent**).  
- **Attendre 0,2 seconde** → effet **pressant** (**rapide**).

👉 En programmation, le bloc **attendre** **contrôle** la **vitesse d’exécution** perçue : ce n’est pas seulement une pause, c’est un **réglage du rythme**.

### 🧠 3. Lien distance → temps

Idée clé : **plus la distance est petite**, **plus l’intervalle entre deux bips est court** (dans la zone où tu décides de biper).

Tableau pédagogique (exemple) :

| Situation | Distance (exemple) | Comportement | Temps entre bips (exemple) |
| --- | --- | --- | --- |
| Loin | **plus de 30 cm** | silence | — |
| Moyen | **10 à 30 cm** | bip | **1 s** (lent) |
| Très proche | **moins de 10 cm** | bip | **0,2 s** (rapide) |

*(Tu peux ensuite passer à une **formule** qui calcule un délai à partir de la distance — voir partie 3 — pour coller encore mieux à un « vrai » radar.)*

### 🧠 4. Rappel : capteur ultrason

Le **capteur ultrason** du mBot renvoie une **distance en cm** : un signal part, **rebondit** sur l’obstacle, revient ; le robot en **déduit** la distance grâce au **temps de parcours** du signal. Pour le détail, reprends la [partie 1](/serie-capteur-ultrason-mbot-1-mesurer-distance/).

---

## 💻 Partie 3 — Réponse (programme mBot)

### 🧪 Logique attendue

**Boucle infinie** :

1. **Lire** `distance_cm`.  
2. **Si** assez loin → **ne pas** biper (souvent un petit `attendre` quand même pour ne pas surcharger le processeur).  
3. **Sinon** → **jouer** une note (bip), puis **attendre** un **délai** qui dépend de la **zone** (lent ou rapide).

### 🧩 Pseudo-code pédagogique

```text
Répéter indéfiniment
  mettre distance_cm = lecture ultrason (cm)

  SI distance_cm < 10
    jouer un bip court
    attendre 0,2 seconde

  SINON SI distance_cm < 30
    jouer un bip court
    attendre 1 seconde

  SINON
    (rien — pas de bip)
    attendre 0,1 seconde
```

*(L’ordre des tests est important : on teste d’abord **très proche**, puis **moyen**, puis le reste.)*

### 🧠 Explication

- Le robot **lit** la distance **en continu**.  
- Il **module la fréquence** du bip via **`attendre`**.  
- **Plus** l’objet est **proche**, **plus** le bip est **rapide** — comme un **radar de recul** réel.

**Aller plus loin (option maths / collège) :** tu peux calculer une variable `delai_s` avec une **formule** du type `delai_s = 0,05 × distance_cm` (avec **bornes** pour éviter des délais trop courts). Cela donne une progression **continue** entre deux seuils — voir aussi les réglages dans les versions avancées de cet exercice.

<p class="article-note">Connexion et téléversement : <a href="/mon-premier-programme-mbot/">Mon premier programme mBot</a>.</p>

---

## 🎯 Partie 4 — Aller plus loin

### 🔥 Défi 1 — LED et distance

Faire **varier la luminosité** ou la **couleur** des **LED** (selon les blocs disponibles) **en même temps** que la cadence du bip : **plus** c’est **proche**, **plus** c’est **visible**.

### 🔥 Défi 2 — Reculer si trop proche

Quand la distance passe **sous** un seuil critique, commande les **moteurs** pour **reculer** légèrement — pont vers la **[partie 4 — évitement et arrêt](/serie-capteur-ultrason-mbot-4-ralentir-sarreter-obstacle/)**.

### 🔥 Défi 3 — Alerte combinée

Combiner **alerte visuelle** (LED clignotante) et **sonore** (bip) avec des **cadences** différentes pour deux niveaux d’urgence.

---

## 🤖 Résumé rapide

- **Capteur ultrason** = **distance** en cm.  
- **Programme** = **boucle** + **conditions** + **temps** (**cadence**).  
- **Cadence** = **vitesse de réaction** (intervalle entre deux bips).

---

## 💡 Robot éducatif pour apprendre la programmation facilement

Le **mBot** permet d’enchaîner **mesure**, **décision** et **temps** sans tout écrire en texte : idéal pour un **robot éducatif** et un **robot programmable** dès **10 ans** (puis **collège** pour approfondir). Pour le choix du robot : [mBot — présentation](/mbot-mon-premier-robot-educatif/).

---

## 📊 Bonus : schémas et « graphique »

### Radar réel vs robot (idée)

```text
Voiture (radar)          mBot (ton programme)
----------------         ---------------------
capteur arrière    ~     capteur ultrason AVANT
bips + écran       ~     buzzer (+ LED option)
plus près = plus   ~     plus près = attendre
  vite                     moins longtemps
```

### Distance → vitesse du bip (schéma qualitatif)

```text
distance :  40 cm    25 cm    15 cm     8 cm
             |        |        |         |
bip :        (silence) ... bip ... bip .. bipbipbip
                        lent      moyen    rapide
```

---

## ❓ FAQ

Les questions ci-dessus sont reprises dans les **données structurées** (FAQ) de la page pour le référencement sur **mbot programmation**, **boucle mBlock**, **temps**, **radar**, **robot intelligent**.

---

## 🔗 Série capteur ultrason (maillage)

| Partie | Thème | Lien |
| --- | --- | --- |
| **1/4** | Mesurer la distance | [Partie 1](/serie-capteur-ultrason-mbot-1-mesurer-distance/) |
| **2/4** | Paliers (conditions) | [Partie 2](/serie-capteur-ultrason-mbot-2-radar-recul-paliers/) |
| **3/4** | **Cadence** (vous êtes ici) | — |
| **4/4** | Obstacle complet (moteurs) | [Partie 4](/serie-capteur-ultrason-mbot-4-ralentir-sarreter-obstacle/) |

<div class="article-cta-row">
<a class="article-cta article-cta--primary" href="/serie-capteur-ultrason-mbot-4-ralentir-sarreter-obstacle/">Partie 4 — Évitement obstacle</a>
<a class="article-cta article-cta--secondary" href="/serie-capteur-ultrason-mbot-1-mesurer-distance/">Revoir la partie 1</a>
</div>
