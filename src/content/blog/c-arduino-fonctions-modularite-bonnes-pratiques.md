---
title: "Arduino C — fonctions, modularité et bonnes pratiques (DRY, portée) (20 exercices)"
headline: "Fonctions, modularité et bonnes pratiques (DRY, portée) (20 exercices)"
description: "Découper un programme robotique en fonctions, comprendre la portée, éviter les variables globales inutiles, appliquer DRY, et écrire du code lisible. 20 exercices corrigés."
pubDate: 2026-04-02
updatedDate: 2026-04-02
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: "Arduino C"
seriesOrder: 5
tags: ["C", "Arduino", "Robotique", "Programmation"]
relatedLinks:
  - title: "Leçon 4 — boucles et timing"
    href: "/c-arduino-boucles-timing/"
categories:
  - "C"
  - "Arduino"
  - "Programmation"
  - "Débutant"
---

Quand ton programme robotique grandit, il devient difficile à lire : beaucoup de `if`, beaucoup de répétitions, et des constantes un peu partout. Les **fonctions** servent à :

- regrouper une action : `etatVeille()`, `alerteIntrusion()`
- éviter de recopier du code (principe **DRY**)
- tester plus facilement

## 1) DRY (Don’t Repeat Yourself)

DRY = **ne pas répéter la même information** à plusieurs endroits.

Exemple : si tu écris 2 fois `"Mon message"`, tu risques d’en modifier une et pas l’autre. En robotique, ça crée des bugs difficiles à comprendre.

Bonne pratique : une seule source :

```cpp
const char* message = "Mon message";
```

## 2) Portée (scope)

- variable **globale** : visible partout
- variable **locale** : visible dans le bloc où elle est déclarée
- **paramètre** : une valeur “donnée” à une fonction

En robotique, trop de globales = programme difficile à raisonner. On garde des globales pour les **états** nécessaires, et on passe le reste en paramètres.

## 3) Exemple robotique (structure)

```text
loop():
  lire capteur
  si intrusion -> alerteIntrusion()
  sinon -> etatVeille()
```

---

## Exercices (20)

### Niveau simple

**Exercice 1** — Écris une fonction `void etatVeille()` qui affiche `VEILLE` sur Serial. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void etatVeille() {
  Serial.println("VEILLE");
}</code></pre>
</div>
</details>

**Exercice 2** — Écris `void alerteIntrusion()` qui affiche `ALERTE` et joue un “bip” simulé (`Serial.println("bip")`). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void alerteIntrusion() {
  Serial.println("ALERTE");
  Serial.println("bip");
}</code></pre>
</div>
</details>

**Exercice 3** — Appelle `etatVeille()` dans `setup()` (après `Serial.begin`). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void etatVeille() { Serial.println("VEILLE"); }
void setup() {
  Serial.begin(9600);
  etatVeille();
}
void loop() {}</code></pre>
</div>
</details>

**Exercice 4** — DRY : déclare `const int DIST_STOP = 15;` et utilise-la dans une fonction `bool isStop(int d)`. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">const int DIST_STOP = 15;
bool isStop(int d) { return d &lt;= DIST_STOP; }</code></pre>
</div>
</details>

**Exercice 5** — Écris `int absInt(int v)` (valeur absolue) et utilise-la pour un seuil d’intrusion. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int absInt(int v) { return v &lt; 0 ? -v : v; }</code></pre>
</div>
</details>

### Niveau intermédiaire

**Exercice 6** — Écris `bool intrusion(int ref, int mesure, int seuil)` qui renvoie true si `abs(mesure-ref) > seuil`. <span class="exo-badge exo-badge--intermediate">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int absInt(int v) { return v &lt; 0 ? -v : v; }
bool intrusion(int ref, int mesure, int seuil) {
  return absInt(mesure - ref) &gt; seuil;
}</code></pre>
</div>
</details>

**Exercice 7** — Évite une globale : crée `void showCounter(int n)` au lieu d’accéder directement à `intrusions`. <span class="exo-badge exo-badge--intermediate">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void showCounter(int n) {
  Serial.print("intrusions=");
  Serial.println(n);
}</code></pre>
</div>
</details>

**Exercice 8** — Écris `void etatVeille(int nbr_intrusion)` qui affiche un visage/texte simulé différent selon le compteur (si 0 : OK, sinon : attention). <span class="exo-badge exo-badge--intermediate">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void etatVeille(int nbr_intrusion) {
  if (nbr_intrusion == 0) Serial.println("OK");
  else Serial.println("ATTENTION");
}</code></pre>
</div>
</details>

**Exercice 9** — Explique en commentaire : pourquoi passer `nbr_intrusion` en paramètre peut aider la pédagogie même si la variable est globale. <span class="exo-badge exo-badge--intermediate">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">// Pédagogie : on voit quelles infos la fonction utilise (comme f(x)) ;
// bonne pratique : moins dépendre de variables globales rend le code plus testable et lisible.</code></pre>
</div>
</details>

**Exercice 10** — Écris une fonction `unsigned long periodFromDistance(int d)` qui renvoie 1000ms si 35..69, 250ms si &lt;35, sinon 100ms. <span class="exo-badge exo-badge--intermediate">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">unsigned long periodFromDistance(int d) {
  if (d &gt;= 70) return 100;
  if (d &gt;= 35) return 1000;
  return 250;
}</code></pre>
</div>
</details>

### Niveau avancé

**Exercice 11** — Écris `bool every(unsigned long period, unsigned long* last)` (timer générique). <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">bool every(unsigned long period, unsigned long* last) {
  unsigned long now = millis();
  if (now - *last &gt;= period) { *last = now; return true; }
  return false;
}</code></pre>
</div>
</details>

**Exercice 12** — Crée une fonction `int readDistanceFake()` qui renvoie une distance qui descend de 70 à 0 puis remonte (simulation). <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int readDistanceFake() {
  static int d = 70;
  static int step = -1;
  d += step;
  if (d &lt;= 0) { d = 0; step = 1; }
  if (d &gt;= 70) { d = 70; step = -1; }
  return d;
}</code></pre>
</div>
</details>

**Exercice 13** — Écris `void radarTick(int distance_cm)` qui affiche `bip` si distance &lt; 70 (sinon rien). <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void radarTick(int distance_cm) {
  if (distance_cm &lt; 70) Serial.println("bip");
}</code></pre>
</div>
</details>

**Exercice 14** — Mini-architecture : dans `loop`, lis la distance, calcule `period`, puis si `every(period)` alors `radarTick`. <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">unsigned long last = 0;

bool every(unsigned long period, unsigned long* last) {
  unsigned long now = millis();
  if (now - *last &gt;= period) { *last = now; return true; }
  return false;
}

unsigned long periodFromDistance(int d) {
  if (d &gt;= 70) return 100;
  if (d &gt;= 35) return 1000;
  return 250;
}

int readDistanceFake() { static int d = 70; d--; if (d &lt; 0) d = 70; return d; }

void setup() { Serial.begin(9600); }
void loop() {
  int d = readDistanceFake();
  unsigned long p = periodFromDistance(d);
  if (every(p, &amp;last) &amp;&amp; d &lt; 70) Serial.println("bip");
}</code></pre>
</div>
</details>

**Exercice 15** — Écris une fonction `void logKV(const char* k, int v)` et utilise-la pour logger `distance`. <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void logKV(const char* k, int v) {
  Serial.print(k);
  Serial.print('=');
  Serial.println(v);
}</code></pre>
</div>
</details>

**Exercice 16** — DRY : crée `const int SEUIL = 3;` et utilise-le dans 2 endroits (intrusion + alerte) sans recopier le `3`. <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">const int SEUIL = 3;
int absInt(int v) { return v &lt; 0 ? -v : v; }
bool intrusion(int ref, int mesure) { return absInt(mesure - ref) &gt; SEUIL; }</code></pre>
</div>
</details>

**Exercice 17** — Explique en commentaire ce que veut dire “modularité”. <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">// Modularité : découper un programme en blocs/fonctions indépendants et réutilisables,
// chacun avec une responsabilité claire.</code></pre>
</div>
</details>

**Exercice 18** — Crée une fonction `int vitesseFromDistance(int d)` qui renvoie 0 si d<=15, 80 si d>=50, sinon 30. <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int vitesseFromDistance(int d) {
  if (d &lt;= 15) return 0;
  if (d &gt;= 50) return 80;
  return 30;
}</code></pre>
</div>
</details>

**Exercice 19** — Ajoute une fonction `void drive(int v)` qui simule l’envoi vitesse moteur (`Serial.println(v)`). <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void drive(int v) {
  Serial.print("drive=");
  Serial.println(v);
}</code></pre>
</div>
</details>

**Exercice 20** — Mini-projet : dans `loop`, lis une distance simulée, calcule la vitesse via `vitesseFromDistance`, puis appelle `drive(v)` toutes les 200 ms (non-bloquant). <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">unsigned long last = 0;
bool every(unsigned long p, unsigned long* last) {
  unsigned long now = millis();
  if (now - *last &gt;= p) { *last = now; return true; }
  return false;
}
int vitesseFromDistance(int d) {
  if (d &lt;= 15) return 0;
  if (d &gt;= 50) return 80;
  return 30;
}
int readDistanceFake() { static int d = 70; d--; if (d &lt; 0) d = 70; return d; }
void drive(int v) { Serial.print("drive="); Serial.println(v); }

void setup() { Serial.begin(9600); }
void loop() {
  if (every(200, &amp;last)) {
    int d = readDistanceFake();
    int v = vitesseFromDistance(d);
    drive(v);
  }
}</code></pre>
</div>
</details>

