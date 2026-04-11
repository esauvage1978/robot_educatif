---
title: "Arduino C — boucles et timing (delay vs millis) (20 exercices)"
headline: "Boucles et timing (delay vs millis) (20 exercices)"
description: "Boucles for/while, compteurs, et timing en robotique : delay, millis, cadence de capteurs/son, éviter les blocages. 20 exercices corrigés."
pubDate: 2026-04-02
updatedDate: 2026-04-02
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: "Arduino C"
seriesOrder: 4
tags: ["C", "Arduino", "Robotique", "Programmation"]
relatedLinks:
  - title: "Leçon 3 — conditions"
    href: "/c-arduino-conditions-capteurs-actionneurs/"
categories:
  - "C"
  - "Arduino"
  - "Programmation"
  - "Débutant"
---

En robotique, les boucles servent à :

- mesurer en continu (`distance_cm = lireCapteur();`),
- réessayer jusqu’à une condition (attendre un bouton),
- produire une cadence (bips, clignotement).

Mais attention : un robot qui fait `delay(5000)` ne peut plus réagir pendant 5 secondes. D’où l’intérêt de `millis()` pour faire du **timing non-bloquant**.

## 1) `for` : quand tu connais le nombre de tours

```cpp
for (int i = 0; i < 5; i++) {
  Serial.println(i);
}
```

## 2) `while` : tant que

```cpp
int n = 3;
while (n > 0) {
  Serial.println(n);
  n--;
}
```

## 3) Timing

### `delay(ms)` (simple mais bloquant)

```cpp
Serial.println("bip");
delay(1000);
```

### `millis()` (non-bloquant)

Idée :

- stocker `last` (dernier instant),
- agir si `now - last >= periode`.

---

## Exercices (20)

### Niveau simple

**Exercice 1** — Affiche 0 à 9 avec une boucle `for`. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  for (int i = 0; i &lt; 10; i++) Serial.println(i);
}
void loop() {}</code></pre>
</div>
</details>

**Exercice 2** — Affiche un point `.` 5 fois avec `for`, avec `delay(200)` entre chaque. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  for (int i = 0; i &lt; 5; i++) {
    Serial.print('.');
    delay(200);
  }
  Serial.println();
}
void loop() {}</code></pre>
</div>
</details>

**Exercice 3** — Somme : calcule la somme 1..20 avec un `for` et affiche-la. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int total = 0;
  for (int i = 1; i &lt;= 20; i++) total += i;
  Serial.println(total);
}
void loop() {}</code></pre>
</div>
</details>

**Exercice 4** — `while` : compte à rebours de 5 à 1. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int n = 5;
  while (n &gt; 0) {
    Serial.println(n);
    n--;
  }
}
void loop() {}</code></pre>
</div>
</details>

**Exercice 5** — `delay` : affiche `tick` toutes les 500 ms dans `loop()`. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() { Serial.begin(9600); }
void loop() {
  Serial.println("tick");
  delay(500);
}</code></pre>
</div>
</details>

### Niveau intermédiaire

**Exercice 6** — Radar “paliers” : si `d >= 70` ne fais rien, sinon affiche `bip` puis `delay(1000)` si `d >= 35`, sinon `delay(250)`. (Juste sur Serial.) <span class="exo-badge exo-badge--intermediate">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() { Serial.begin(9600); }
void loop() {
  int d = 50; // test
  if (d &gt;= 70) {
    delay(100);
  } else if (d &gt;= 35) {
    Serial.println("bip");
    delay(1000);
  } else {
    Serial.println("bip");
    delay(250);
  }
}</code></pre>
</div>
</details>

**Exercice 7** — Évite de bloquer 3 secondes : affiche `READY` après 3 s en utilisant `millis()` (sans `delay`). <span class="exo-badge exo-badge--intermediate">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">unsigned long t0 = 0;
bool done = false;

void setup() {
  Serial.begin(9600);
  t0 = millis();
}

void loop() {
  if (!done &amp;&amp; (millis() - t0 &gt;= 3000)) {
    Serial.println("READY");
    done = true;
  }
}</code></pre>
</div>
</details>

**Exercice 8** — Cadence non-bloquante : affiche `bip` toutes les 1000 ms avec `millis()` et `last`. <span class="exo-badge exo-badge--intermediate">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">const unsigned long PERIOD = 1000;
unsigned long last = 0;

void setup() { Serial.begin(9600); }
void loop() {
  unsigned long now = millis();
  if (now - last &gt;= PERIOD) {
    Serial.println("bip");
    last = now;
  }
}</code></pre>
</div>
</details>

**Exercice 9** — Deux cadences : affiche `A` toutes les 1000 ms et `B` toutes les 250 ms (deux timers). <span class="exo-badge exo-badge--intermediate">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">unsigned long lastA = 0;
unsigned long lastB = 0;
const unsigned long PA = 1000;
const unsigned long PB = 250;

void setup() { Serial.begin(9600); }
void loop() {
  unsigned long now = millis();
  if (now - lastA &gt;= PA) { Serial.print('A'); lastA = now; }
  if (now - lastB &gt;= PB) { Serial.print('B'); lastB = now; }
}</code></pre>
</div>
</details>

**Exercice 10** — Boucle “lecture capteur” : simule `distance_cm` qui change et affiche-la toutes les 200 ms (non-bloquant). <span class="exo-badge exo-badge--intermediate">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">unsigned long last = 0;
const unsigned long PERIOD = 200;
int distance_cm = 70;

void setup() { Serial.begin(9600); }
void loop() {
  unsigned long now = millis();
  if (now - last &gt;= PERIOD) {
    Serial.println(distance_cm);
    distance_cm--;           // simulation
    if (distance_cm &lt; 0) distance_cm = 70;
    last = now;
  }
}</code></pre>
</div>
</details>

### Niveau avancé

**Exercice 11** — Écris une fonction `bool every(unsigned long period, unsigned long* last)` qui renvoie true quand c’est le moment (timer générique). <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">bool every(unsigned long period, unsigned long* last) {
  unsigned long now = millis();
  if (now - *last &gt;= period) {
    *last = now;
    return true;
  }
  return false;
}</code></pre>
</div>
</details>

**Exercice 12** — Utilise `every` pour afficher `.` toutes les 100 ms. <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">unsigned long last = 0;
bool every(unsigned long period, unsigned long* last) {
  unsigned long now = millis();
  if (now - *last &gt;= period) { *last = now; return true; }
  return false;
}
void setup() { Serial.begin(9600); }
void loop() {
  if (every(100, &amp;last)) Serial.print('.');
}</code></pre>
</div>
</details>

**Exercice 13** — Convertis le radar paliers en non-bloquant (un seul bip à chaque tick). <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">unsigned long last = 0;
void setup() { Serial.begin(9600); }
void loop() {
  int d = 30; // test
  unsigned long period = 100;
  if (d &gt;= 70) period = 100;
  else if (d &gt;= 35) period = 1000;
  else period = 250;

  unsigned long now = millis();
  if (now - last &gt;= period) {
    if (d &lt; 70) Serial.println("bip");
    last = now;
  }
}</code></pre>
</div>
</details>

**Exercice 14** — Écris un `for` avec un pas de 2 (0,2,4,6,8). <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  for (int i = 0; i &lt; 10; i += 2) Serial.println(i);
}
void loop() {}</code></pre>
</div>
</details>

**Exercice 15** — `while(true)` + `break` : cherche le premier multiple de 7 entre 1 et 100 et affiche-le. <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int n = 1;
  while (true) {
    if (n % 7 == 0) { Serial.println(n); break; }
    n++;
  }
}
void loop() {}</code></pre>
</div>
</details>

**Exercice 16** — Explique (commentaire) pourquoi `delay(5000)` est dangereux pour un robot qui doit réagir. <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  // delay bloque la boucle : pendant 5 s, le robot ne lit plus les capteurs
  // => il ne peut pas réagir à un obstacle.
}
void loop() {}</code></pre>
</div>
</details>

**Exercice 17** — Écris une variable `unsigned long period;` qui dépend de la distance (0..70) avec une règle simple (ex. `period = d * 50`). <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int d = 20;
  unsigned long period = (unsigned long)d * 50;
  Serial.println(period);
}
void loop() {}</code></pre>
</div>
</details>

**Exercice 18** — Corrige la règle de l’exercice 17 pour qu’elle n’aille pas à 0 ms (ex. minimum 50 ms). <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">unsigned long clampUL(unsigned long v, unsigned long minV) {
  return v &lt; minV ? minV : v;
}
void setup() {
  Serial.begin(9600);
  int d = 0;
  unsigned long period = (unsigned long)d * 50;
  period = clampUL(period, 50);
  Serial.println(period);
}
void loop() {}</code></pre>
</div>
</details>

**Exercice 19** — Mini-projet : affiche `distance=...` toutes les 100 ms, et `ALERTE` si distance <= 15 (non-bloquant). <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">unsigned long last = 0;
const unsigned long PERIOD = 100;
int distance_cm = 20;

void setup() { Serial.begin(9600); }
void loop() {
  unsigned long now = millis();
  if (now - last &gt;= PERIOD) {
    Serial.print("distance=");
    Serial.println(distance_cm);
    if (distance_cm &lt;= 15) Serial.println("ALERTE");
    last = now;
    distance_cm--;
    if (distance_cm &lt; 0) distance_cm = 20;
  }
}</code></pre>
</div>
</details>

**Exercice 20** — Mini-projet : clignote “virtuellement” une LED : affiche `LED ON` puis `LED OFF` toutes les 500 ms sans `delay` (avec `millis`). <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">unsigned long last = 0;
bool on = false;

void setup() { Serial.begin(9600); }
void loop() {
  unsigned long now = millis();
  if (now - last &gt;= 500) {
    on = !on;
    Serial.println(on ? "LED ON" : "LED OFF");
    last = now;
  }
}</code></pre>
</div>
</details>

