---
title: "Arduino C — conditions (if/else) pour capteurs et actionneurs (20 exercices)"
headline: "Conditions (if/else) pour capteurs et actionneurs (20 exercices)"
description: "Apprendre if/else avec des exemples robotique : seuils, états, capteurs (simulés), LED/buzzer (simulés), et bonnes pratiques (constantes, lisibilité). 20 exercices corrigés."
pubDate: 2026-04-02
updatedDate: 2026-04-02
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: "Arduino C"
seriesOrder: 3
tags: ["C", "Arduino", "Robotique", "Programmation"]
relatedLinks:
  - title: "Guide complet — apprendre Arduino C/C++"
    href: "/programmation/arduino-c/"
  - title: "Leçon 2 — types et variables"
    href: "/c-arduino-types-variables/"
  - title: "Leçon 4 — boucles et timing"
    href: "/c-arduino-boucles-timing/"
  - title: "Projet capteur ultrason mBot"
    href: "/serie-capteur-ultrason-mbot-1-mesurer-distance/"
categories:
  - "C"
  - "Arduino"
  - "Programmation"
  - "Débutant"
---

Les **conditions** sont le moment où la programmation Arduino devient vraiment robotique. Avec `if`, `else if` et `else`, ton programme décide quoi faire selon l’état du monde : distance mesurée, bouton pressé, lumière faible, obstacle proche, batterie basse. C’est la base d’un robot Arduino qui ne se contente plus d’exécuter une séquence, mais réagit à ce qu’il mesure.

<aside class="article-callout" role="note">
<p><strong>Fiche rapide</strong></p>
<ul>
<li><strong>Niveau :</strong> débutant confirmé, après variables et constantes.</li>
<li><strong>Durée :</strong> 60 minutes avec les exercices.</li>
<li><strong>Matériel :</strong> Arduino Uno compatible. Un capteur ultrason ou un bouton sera utile pour tester ensuite.</li>
<li><strong>Objectif :</strong> écrire des règles claires pour capteurs et actionneurs.</li>
</ul>
</aside>

Si besoin, revois les [types et variables Arduino](/c-arduino-types-variables/) avant de commencer. Pour le parcours complet, la page [apprendre Arduino C/C++](/programmation/arduino-c/) te montre comment cette leçon mène vers les robots simples.

En robotique, tu écris très souvent des règles du type :

```text
SI distance <= 15 cm → STOP
SINON → AVANCER
```

## 1) Comparaisons (les bases)

- `==` égal (attention : **deux** `=` en C !)
- `!=` différent
- `<`, `>`, `<=`, `>=`

## 2) Combiner des conditions

- `&&` : ET
- `||` : OU
- `!` : NON

Exemple :

```cpp
if (distance_cm <= 15 && vitesse > 0) {
  // obstacle proche + robot en mouvement
}
```

## 3) Bonnes pratiques pour des `if` lisibles

- utilise des **constantes** : `const int DIST_STOP = 15;`
- évite les “pyramides” de `if` imbriqués trop profondes : découpe en fonctions (leçon plus tard)
- mets des noms “verbe + sens” : `isNear`, `isPressed`

---

## Exercices (20)

Pour ces exercices, si tu n’as pas de capteur sous la main, tu peux **simuler** une lecture :

```cpp
int distance_cm = 42; // valeur test
```

### Niveau simple

**Exercice 1** — Avec `int distance_cm = 12;`, affiche `STOP` si `distance_cm <= 15`, sinon `GO`. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int distance_cm = 12;
  if (distance_cm &lt;= 15) Serial.println("STOP");
  else Serial.println("GO");
}
void loop() {}</code></pre>
</div>
</details>

**Exercice 2** — Crée `const int DIST_WARN = 35;` et affiche `WARN` si `distance_cm <= DIST_WARN`. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">const int DIST_WARN = 35;
void setup() {
  Serial.begin(9600);
  int distance_cm = 30;
  if (distance_cm &lt;= DIST_WARN) Serial.println("WARN");
}
void loop() {}</code></pre>
</div>
</details>

**Exercice 3** — Teste l’égalité : si `mode == 1` affiche `MODE 1`, sinon `AUTRE`. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int mode = 1;
  if (mode == 1) Serial.println("MODE 1");
  else Serial.println("AUTRE");
}
void loop() {}</code></pre>
</div>
</details>

**Exercice 4** — Trois zones : `distance >= 70` → `SILENCE`, `distance >= 35` → `BIP LENT`, sinon `BIP RAPIDE`. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int d = 50;
  if (d &gt;= 70) Serial.println("SILENCE");
  else if (d &gt;= 35) Serial.println("BIP LENT");
  else Serial.println("BIP RAPIDE");
}
void loop() {}</code></pre>
</div>
</details>

**Exercice 5** — Écris `bool pressed = true;` puis affiche `CLICK` si `pressed` est vrai. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  bool pressed = true;
  if (pressed) Serial.println("CLICK");
}
void loop() {}</code></pre>
</div>
</details>

### Niveau intermédiaire

**Exercice 6** — Évite `!=` sur du bruit : considère intrusion si `abs(mesure - reference) > 3`. (Tu peux coder une fonction `int absInt(int v)`.) <span class="exo-badge exo-badge--intermediate">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int absInt(int v) { return v &lt; 0 ? -v : v; }

void setup() {
  Serial.begin(9600);
  int reference = 40;
  int mesure = 44;
  if (absInt(mesure - reference) &gt; 3) Serial.println("INTRUSION");
  else Serial.println("RAS");
}
void loop() {}</code></pre>
</div>
</details>

**Exercice 7** — Combine ET : affiche `DANGER` si `distance <= 15` ET `vitesse > 0`. <span class="exo-badge exo-badge--intermediate">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int distance = 12;
  int vitesse = 80;
  if (distance &lt;= 15 &amp;&amp; vitesse &gt; 0) Serial.println("DANGER");
}
void loop() {}</code></pre>
</div>
</details>

**Exercice 8** — Combine OU : affiche `ALERTE` si `distance <= 15` OU `son_detecte == true`. <span class="exo-badge exo-badge--intermediate">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int distance = 50;
  bool son_detecte = true;
  if (distance &lt;= 15 || son_detecte) Serial.println("ALERTE");
}
void loop() {}</code></pre>
</div>
</details>

**Exercice 9** — Refactor : écris une fonction `bool isStop(int d)` qui encapsule `d <= 15`. <span class="exo-badge exo-badge--intermediate">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">const int DIST_STOP = 15;
bool isStop(int d) { return d &lt;= DIST_STOP; }</code></pre>
</div>
</details>

**Exercice 10** — Écris `int vitesse = 80;` puis si `distance <= 50` mets `vitesse = 30`. Affiche la vitesse. <span class="exo-badge exo-badge--intermediate">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int distance = 40;
  int vitesse = 80;
  if (distance &lt;= 50) vitesse = 30;
  Serial.println(vitesse);
}
void loop() {}</code></pre>
</div>
</details>

### Niveau avancé

**Exercice 11** — Écris une petite “machine à états” avec `int etat = 0;` : si `etat==0` affiche `VEILLE`, si `etat==1` affiche `ALERTE`. <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int etat = 0;
  if (etat == 0) Serial.println("VEILLE");
  else if (etat == 1) Serial.println("ALERTE");
  else Serial.println("INCONNU");
}
void loop() {}</code></pre>
</div>
</details>

**Exercice 12** — Ajoute un compteur : si intrusion, `intrusions++`, puis affiche `intrusions`. <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int intrusions = 0;
int absInt(int v) { return v &lt; 0 ? -v : v; }

void setup() {
  Serial.begin(9600);
}

void loop() {
  int reference = 40;
  int mesure = 44;
  if (absInt(mesure - reference) &gt; 3) intrusions++;
  Serial.println(intrusions);
  delay(1000);
}</code></pre>
</div>
</details>

**Exercice 13** — Écris une fonction `int zoneRadar(int d)` qui renvoie 0/1/2 selon les zones (silence/lent/rapide). <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int zoneRadar(int d) {
  if (d &gt;= 70) return 0;
  if (d &gt;= 35) return 1;
  return 2;
}</code></pre>
</div>
</details>

**Exercice 14** — Utilise `zoneRadar(d)` pour afficher le texte correspondant. <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int zoneRadar(int d) {
  if (d &gt;= 70) return 0;
  if (d &gt;= 35) return 1;
  return 2;
}

void setup() {
  Serial.begin(9600);
  int d = 20;
  int z = zoneRadar(d);
  if (z == 0) Serial.println("SILENCE");
  else if (z == 1) Serial.println("BIP LENT");
  else Serial.println("BIP RAPIDE");
}
void loop() {}</code></pre>
</div>
</details>

**Exercice 15** — Évite une répétition : remplace deux tests `d <= 15` par une seule fonction `isStop(d)`. <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">const int DIST_STOP = 15;
bool isStop(int d) { return d &lt;= DIST_STOP; }</code></pre>
</div>
</details>

**Exercice 16** — Écris une condition “plage” : affiche `OK` si `d` est entre 35 et 70 inclus. <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int d = 50;
  if (d &gt;= 35 &amp;&amp; d &lt;= 70) Serial.println("OK");
}
void loop() {}</code></pre>
</div>
</details>

**Exercice 17** — Explique (commentaire) la différence `=` et `==`, puis écris un test correct. <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int mode = 2;
  // = affecte une valeur ; == compare deux valeurs
  if (mode == 2) Serial.println("MODE 2");
}
void loop() {}</code></pre>
</div>
</details>

**Exercice 18** — Écris un “watchdog” simple : si `distance_cm` vaut 0, affiche `MESURE INVALIDE`. <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int distance_cm = 0;
  if (distance_cm == 0) Serial.println("MESURE INVALIDE");
}
void loop() {}</code></pre>
</div>
</details>

**Exercice 19** — Ajoute une “zone rouge” : si `distance <= 10` affiche `ROUGE`, sinon si `distance <= 35` affiche `ORANGE`, sinon `VERT`. <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int d = 22;
  if (d &lt;= 10) Serial.println("ROUGE");
  else if (d &lt;= 35) Serial.println("ORANGE");
  else Serial.println("VERT");
}
void loop() {}</code></pre>
</div>
</details>

**Exercice 20** — Mini-projet : écris une règle “ralentir” : si `distance <= 50` alors `vitesse = 40`, sinon `vitesse = 80`. Affiche `vitesse`. <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int distance = 60;
  int vitesse = 0;
  if (distance &lt;= 50) vitesse = 40;
  else vitesse = 80;
  Serial.println(vitesse);
}
void loop() {}</code></pre>
</div>
</details>

## Amélioration possible

Ajoute une troisième zone : si la distance est inférieure ou égale à 15 cm, la vitesse devient 0. Ton programme aura alors trois comportements : avancer vite, ralentir, s’arrêter. C’est exactement la logique d’un robot éviteur d’obstacles.

## Suite du parcours Arduino

Les conditions deviennent beaucoup plus puissantes quand elles sont répétées en continu. Continue avec les [boucles et le timing Arduino](/c-arduino-boucles-timing/) pour lire un capteur régulièrement sans bloquer le robot. Pour relier cette logique à un cas réel, consulte aussi le projet [capteur ultrason mBot](/serie-capteur-ultrason-mbot-1-mesurer-distance/) et le [guide complet Arduino C/C++](/programmation/arduino-c/).

