---
title: "Exercice mBot (niveau 2) : radar de recul par paliers | conditions mBlock"
headline: "Exercice mBot : Créer un Radar de Recul avec le Capteur Ultrason (Niveau 2)"
description: "Partie 2/4 : programme mBot avec conditions (si / sinon) et paliers de distance — LED et buzzer selon la proximité. Robot programmable 10–12 ans, capteur ultrason mBot, idée radar de voiture."
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
  - title: "Capteur ultrason mBot (3/4) : cadence selon la distance"
    href: "/serie-capteur-ultrason-mbot-3-radar-recul-cadence-distance/"
  - title: "Capteur ultrason mBot (4/4) : ralentir puis s’arrêter"
    href: "/serie-capteur-ultrason-mbot-4-ralentir-sarreter-obstacle/"
  - title: "Mon premier programme mBot"
    href: "/mon-premier-programme-mbot/"
  - title: "Installer les blocs du mBot"
    href: "/installer-les-blocs-du-mbot/"
  - title: "mBot : robot éducatif programmable"
    href: "/mbot-mon-premier-robot-educatif/"
faqSchema:
  - question: "Comment programmer une condition sur mBot ?"
    answer: "Dans mBlock, on utilise les blocs « si … alors », « sinon », et parfois « sinon si » ou des conditions imbriquées : on compare la distance (variable) à un nombre avec des opérateurs comme inférieur à, supérieur à, puis on exécute une action différente (LED, buzzer, rien)."
  - question: "Comment utiliser un capteur ultrason avec mBot ?"
    answer: "On lit la distance en centimètres avec le bloc du capteur ultrason, on la met dans une variable, puis on teste cette variable dans des conditions pour décider quoi faire (silence, LED, bip)."
  - question: "Comment faire un robot éviteur d’obstacle ?"
    answer: "Il faut lire la distance en boucle et, selon les cas, changer la direction ou la vitesse des moteurs. Ce radar à paliers prépare la logique « si trop près alors … » ; l’évitement complet est enchaîné dans la partie 4 de la série."
  - question: "Quel robot programmable pour enfant de 10 ans ?"
    answer: "Le mBot est un choix fréquent à l’école et au collège : programmation par blocs dans mBlock, capteurs dont l’ultrason, et possibilité de progresser vers des projets plus avancés."
---

<aside class="article-callout" role="note">
<p><strong>Après la partie 1</strong></p>
<p>Tu sais déjà <strong>mesurer une distance</strong> (<a href="/serie-capteur-ultrason-mbot-1-mesurer-distance/">exercice 1</a>). Ici, niveau <strong>2</strong> : le robot <strong>décide</strong> grâce aux <strong>conditions</strong> et aux <strong>paliers</strong> — comme un <strong>radar de recul</strong> de voiture : plus l’obstacle est proche, plus on alerte.</p>
</aside>

## 🧭 Introduction

Dans la **partie 1**, tu as appris un **programme mBot** qui **affiche** la distance mesurée par le **capteur ultrason mBot**.  
**Maintenant**, on monte d’un cran : le robot **réagit** selon cette distance — c’est une vraie étape de **programme mBot** : **conditions** (**si** / **sinon**). Si tu cherchais des idées sous « **mbot programmation** » ou « **programme mbot** » avec un objectif concret, tu es au bon endroit.

Pense au **radar de recul** d’une voiture : quand il n’y a personne derrière, silence ; quand ça se rapproche, des bips plus fréquents. Ici, on simplifie avec des **zones** (paliers) : loin, moyen, trop près.

Le **capteur ultrason** continue de **mesurer la distance** ; la nouveauté, c’est que le **programme mBot** **adapte le comportement** (LED, buzzer, ou rien) **selon** cette mesure — dès qu’il y a un **obstacle** à portée.

<div class="article-cta-row">
<a class="article-cta article-cta--primary" href="/serie-capteur-ultrason-mbot-1-mesurer-distance/">Partie 1 — Mesurer la distance</a>
<a class="article-cta article-cta--secondary" href="/installer-les-blocs-du-mbot/">Blocs mBot dans mBlock</a>
</div>

---

## 📘 Partie 1 — Consigne (exercice)

### 🎯 Objectif

**Programmer le mBot** pour qu’il :

1. **détecte** un obstacle devant lui (via la distance) ;  
2. **réagisse différemment** selon que l’obstacle est **loin**, **assez proche** ou **très proche** (idée de **paliers**).

### 📋 Matériel

- un **robot mBot** (ultrason à l’avant) ;  
- **mBlock** sur l’ordinateur ([installation](/installer-mblock-5-sous-windows-10/), [premiers pas](/premier-pas-avec-mblock-5/)) ;  
- un obstacle **plat** (livre, carton) pour tester.

### 📝 Consigne

**Programme ton robot pour :**

1. **Lire** la distance avec le **capteur ultrason** (en cm) et la mettre dans une **variable** (ex. `distance_cm`).  
2. **Si** un obstacle est **loin** → **ne rien faire** de spécial (pas d’alerte, ou LED éteinte selon les blocs).  
3. **Si** un obstacle est **proche** (zone « attention ») → **allumer une LED** (par exemple orange ou jaune).  
4. **Si** un obstacle est **très proche** (zone « danger ») → **faire un bip** avec le **buzzer**.

**Seuils proposés pour la classe** (modifiables au tableau) :

| Zone | Condition (exemple) | Comportement |
| --- | --- | --- |
| OK — loin | distance **supérieure à 20 cm** | rien (silence) |
| Attention — proche | entre **10 cm** et **20 cm** | **LED** |
| Danger — très proche | **moins de 10 cm** | **bip** |

*(Tu peux aussi utiliser d’autres nombres, par exemple 70 cm / 35 cm, si ton enseignant préfère des zones plus larges — l’important est la **logique** des **paliers**.)*

---

## 📚 Partie 2 — Leçon (concepts clés)

### 🧠 1. Notion de condition (important)

Une **condition**, c’est une **question** que le programme pose au robot :

- **Si** la réponse est oui → on fait **une** action.  
- **Sinon** → on peut faire **autre chose** ou poser **une autre** question (**sinon si**).

Exemple simple :

- **SI** distance **inférieure à 10** → **danger** (bip).  
- **SINON** → on regarde une autre règle (par exemple la LED pour la zone « attention »).

👉 Le robot **prend une décision** : ce n’est plus seulement un nombre affiché, c’est un **comportement**.

### 🧠 2. Notion de paliers (niveau supérieur)

Les **paliers**, ce sont **plusieurs niveaux** de réaction pour **une même** mesure :

- **Loin** → tout va bien (souvent : pas d’alerte).  
- **Intermédiaire** → prévenir (souvent : **LED**).  
- **Très près** → alerter fort (souvent : **buzzer**).

Schéma **radar de recul** (vu du dessus) :

```text
        [ loin — OK ]    [ proche — LED ]    [ très près — BIP ]
              |                  |                     |
    ----------+------------------+---------------------+-----> vers l’obstacle
              20 cm              10 cm                 0 cm
```

Le **capteur ultrason** donne la **distance** ; le **programme** compare cette valeur aux **seuils** et choisit la **bonne** branche.

### 🧠 3. Capteurs et actionneurs

- **Capteur** : il **détecte** (ici l’**ultrason** mesure une **distance**).  
- **Actionneur** : il **agit** — **LED** (lumière), **buzzer** (son), plus tard les **moteurs** pour rouler.

Ensemble, ils permettent au robot de **percevoir** puis **réagir** — base de toute **programmation** de **robot programmable** pour **enfants** et **collège** (souvent à partir de **10 ans**, jusqu’à **12 ans** et plus pour approfondir).

---

## 💻 Partie 3 — Réponse (programme mBot)

### 🧪 Logique attendue

Structure logique (à traduire en blocs mBlock) :

```text
Quand le programme démarre
  pour toujours
    lire la distance → mettre dans distance_cm
    SI distance_cm < 10
      alors buzzer (court bip)
    SINON SI distance_cm < 20
      alors allumer la LED « attention »
    SINON
      alors éteindre LED / pas de bip
    attendre un peu (ex. 0,1 s)
```

*(Selon ta version de mBlock, tu auras « si / sinon » **imbriqués** ou une suite **si → sinon si → sinon** — les deux mènent au même raisonnement.)*

### 🧩 Pseudo-code simple (paliers)

```text
SI distance < 10 cm
  → bip (danger)

SINON SI distance < 20 cm
  → LED allumée (attention)

SINON
  → rien (ou LED éteinte)
```

### 🧠 Explication

- Le robot **compare** la distance à des **seuils**.  
- Il **choisit une seule** branche adaptée (la plus « urgente » d’abord : **très proche** avant **proche**).  
- Plus l’objet est **proche**, plus la **réaction** est **forte** — d’où l’analogie **radar de recul**.

**Piège fréquent :** dans une boucle **sans** `attendre`, le buzzer ou la lecture peuvent « saturer ». Garde un petit **pause** (0,05 à 0,2 s) pour un comportement stable.

<p class="article-note">Premier téléversement ou aide connexion : <a href="/mon-premier-programme-mbot/">Mon premier programme mBot</a>.</p>

---

## 🎯 Partie 4 — Aller plus loin

### 🔥 Défi 1 — LED qui « pulse »

Faire **clignoter** la LED **plus vite** quand l’obstacle est **plus proche** (toujours dans la zone « attention »). Tu joues sur un bloc **attendre** entre deux changements d’état de la LED.

### 🔥 Défi 2 — Vrai radar : bip de plus en plus rapide

**Plus** l’objet est **proche**, **plus** le **bip** est **rapide** — sans paliers fixes uniquement : c’est exactement le thème de la **[partie 3 — radar, cadence selon la distance](/serie-capteur-ultrason-mbot-3-radar-recul-cadence-distance/)** (suite logique après ce niveau 2).

### 🔥 Défi 3 — Reculer automatiquement

Quand la distance devient **très faible**, commande les **moteurs** pour **reculer** un peu au lieu de seulement biper — vers un **éviteur d’obstacle** complet : voir la **[partie 4 — projet complet obstacle](/serie-capteur-ultrason-mbot-4-ralentir-sarreter-obstacle/)**.

---

## 🤖 Résumé rapide

- **mBot** = **robot programmable** (idéal **dès 10 ans** en **programme mBot** au collège).  
- **Capteur ultrason** = mesure la **distance**.  
- **Programme** = **conditions** (**si / sinon**) + **paliers** + **réactions** (LED, buzzer).

---

## 💡 Robot éducatif pour enfant débutant

Le **mBot** reste une **référence** pour **débuter** : on voit tout de suite le lien entre **blocs**, **capteurs** et **comportement**. Pour le choix du kit ou du modèle : [mBot, présentation](/mbot-mon-premier-robot-educatif/).

---

## ❓ FAQ

Les questions ci-dessus sont reprises dans les **données structurées** de la page (FAQ) pour aider au référencement sur **comment programmer une condition sur mBot**, **capteur ultrason**, **éviteur d’obstacle** et **robot pour 10 ans**.

---

## 🔗 Série capteur ultrason (maillage)

| Partie | Contenu | Lien |
| --- | --- | --- |
| **1/4** | Mesurer une distance | [Partie 1](/serie-capteur-ultrason-mbot-1-mesurer-distance/) |
| **2/4** | **Radar à paliers** (vous êtes ici) | — |
| **3/4** | Cadence / obstacle (bip lié à la distance) | [Partie 3](/serie-capteur-ultrason-mbot-3-radar-recul-cadence-distance/) |
| **4/4** | Projet complet (ralentir, s’arrêter) | [Partie 4](/serie-capteur-ultrason-mbot-4-ralentir-sarreter-obstacle/) |

<div class="article-cta-row">
<a class="article-cta article-cta--primary" href="/serie-capteur-ultrason-mbot-3-radar-recul-cadence-distance/">Partie 3 — Bip et distance</a>
<a class="article-cta article-cta--secondary" href="/serie-capteur-ultrason-mbot-4-ralentir-sarreter-obstacle/">Partie 4 — Obstacle complet</a>
</div>
