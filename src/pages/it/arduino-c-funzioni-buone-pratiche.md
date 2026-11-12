---
layout: ../../layouts/ItPost.astro
title: "Funzioni Arduino: creare e chiamare funzioni in C"
description: "Funzioni Arduino: scope, DRY, codice leggibile, evitare le globali. 20 esercizi con soluzioni."
updated: "31 ottobre 2026"
---

![Scheda Arduino Uno vista di tre quarti — la scheda su cui girano questi esercizi sulle funzioni](/images/lot2/arduino-uno-perspective.webp)

*La scheda Arduino Uno, la più comune per questo percorso. Foto: Creative Tools — [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) — [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Arduino-uno-perspective.jpg) (ridimensionata / WebP).*

Quando il tuo programma robotico cresce, diventa difficile da leggere: tanti `if`, molte ripetizioni e costanti un po’ ovunque. Le **funzioni** servono a:

- raggruppare un’azione: `idleState()`, `raiseAlarm()`
- evitare di ricopiare codice (principio **DRY** = *Don't Repeat Yourself* / non ripetere te stesso)
- testare più facilmente

Questa è la lezione **5** del [percorso Arduino C](/it/arduino-c/). Lezioni precedenti: [struttura dello sketch](/en/arduino-c-sketch-structure-serial/), [tipi e variabili](/en/arduino-c-types-variables/), [condizioni e sensori](/en/arduino-c-conditions-sensors/), [cicli e timing](/c-arduino-boucles-timing/).

Alcuni link di questa pagina sono di affiliazione: se acquisti tramite questi link possiamo ricevere una commissione, senza costi aggiuntivi per te. Per eseguire gli esercizi su hardware reale basta uno **starter kit Arduino Uno** (scheda, cavo USB, LED, resistenze, breadboard) — controlla il prezzo del giorno su [Amazon.it](https://www.amazon.it/s?k=arduino+uno+starter+kit&tag=roboteducat0f-21). Libri sul C per Arduino: [Amazon.it](https://www.amazon.it/s?k=arduino+imparare+c+programmazione&tag=roboteducat0f-21).

## Sommario esercizi

- [Livello semplice](#livello-semplice)
- [Livello intermedio](#livello-intermedio)
- [Livello avanzato](#livello-avanzato)

## 1) DRY (Don’t Repeat Yourself)

DRY = **non ripetere la stessa informazione** in più posti (*Don't Repeat Yourself*).

Esempio: se scrivi 2 volte `"Il mio messaggio"`, rischi di modificarne uno e non l’altro. In robotica questo crea bug difficili da capire.

Buona pratica: un’unica fonte:

```cpp
const char* message = "Il mio messaggio";
```

## 2) Scope (visibilità)

- variabile **globale**: visibile ovunque
- variabile **locale**: visibile nel blocco in cui è dichiarata
- **parametro**: un valore «dato» a una funzione

In robotica, troppe globali = programma difficile da ragionare. Si tengono globali per gli **stati** necessari e si passa il resto come parametri.

## 3) Esempio robotico (struttura)

```text
loop():
  leggi sensore
  se intrusion -> raiseAlarm()
  altrimenti -> idleState()
```

---

## Esercizi (20)

<h3 id="livello-semplice">Livello semplice</h3>

**Esercizio 1** — Scrivi una funzione `void idleState()` che stampa `IDLE` su Serial. <span class="exo-badge exo-badge--simple">Semplice</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void idleState() {
  Serial.println("IDLE");
}</code></pre>
</div>
</details>

**Esercizio 2** — Scrivi `void raiseAlarm()` che stampa `ALERT` e un «bip» simulato (`Serial.println("beep")`). <span class="exo-badge exo-badge--simple">Semplice</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void raiseAlarm() {
  Serial.println("ALERT");
  Serial.println("beep");
}</code></pre>
</div>
</details>

**Esercizio 3** — Chiama `idleState()` in `setup()` (dopo `Serial.begin`). <span class="exo-badge exo-badge--simple">Semplice</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void idleState() { Serial.println("IDLE"); }
void setup() {
  Serial.begin(9600);
  idleState();
}
void loop() {}</code></pre>
</div>
</details>

**Esercizio 4** — DRY: dichiara `const int DIST_STOP = 15;` e usala in `bool isStop(int d)`. <span class="exo-badge exo-badge--simple">Semplice</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">const int DIST_STOP = 15;
bool isStop(int d) { return d &lt;= DIST_STOP; }</code></pre>
</div>
</details>

**Esercizio 5** — Scrivi `int absInt(int v)` (valore assoluto) e usala per una soglia di intrusion. <span class="exo-badge exo-badge--simple">Semplice</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int absInt(int v) { return v &lt; 0 ? -v : v; }</code></pre>
</div>
</details>

<h3 id="livello-intermedio">Livello intermedio</h3>

**Esercizio 6** — Scrivi `bool intrusion(int ref, int measure, int threshold)` che restituisce true se `abs(measure-ref) > threshold`. <span class="exo-badge exo-badge--intermediate">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int absInt(int v) { return v &lt; 0 ? -v : v; }
bool intrusion(int ref, int measure, int threshold) {
  return absInt(measure - ref) &gt; threshold;
}</code></pre>
</div>
</details>

**Esercizio 7** — Evita una globale: crea `void showCounter(int n)` invece di accedere direttamente a `intrusions`. <span class="exo-badge exo-badge--intermediate">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void showCounter(int n) {
  Serial.print("intrusions=");
  Serial.println(n);
}</code></pre>
</div>
</details>

**Esercizio 8** — Scrivi `void idleState(int intrusionCount)` che stampa un testo diverso secondo il contatore (se 0: OK, altrimenti: WARNING). <span class="exo-badge exo-badge--intermediate">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void idleState(int intrusionCount) {
  if (intrusionCount == 0) Serial.println("OK");
  else Serial.println("WARNING");
}</code></pre>
</div>
</details>

**Esercizio 9** — Spiega in un commento: perché passare `intrusionCount` come parametro aiuta la didattica anche se la variabile è globale. <span class="exo-badge exo-badge--intermediate">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">// Didattica: si vede quali dati usa la funzione (come f(x));
// buona pratica: dipendere meno dalle globali rende il codice più testabile e leggibile.</code></pre>
</div>
</details>

**Esercizio 10** — Scrivi `unsigned long periodFromDistance(int d)` che restituisce 1000 ms se 35..69, 250 ms se &lt;35, altrimenti 100 ms. <span class="exo-badge exo-badge--intermediate">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">unsigned long periodFromDistance(int d) {
  if (d &gt;= 70) return 100;
  if (d &gt;= 35) return 1000;
  return 250;
}</code></pre>
</div>
</details>

<h3 id="livello-avanzato">Livello avanzato</h3>

**Esercizio 11** — Scrivi `bool every(unsigned long period, unsigned long* last)` (timer generico). <span class="exo-badge exo-badge--advanced">Avanzato</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">bool every(unsigned long period, unsigned long* last) {
  unsigned long now = millis();
  if (now - *last &gt;= period) { *last = now; return true; }
  return false;
}</code></pre>
</div>
</details>

**Esercizio 12** — Crea `int readDistanceFake()` che restituisce una distanza che scende da 70 a 0 e poi risale (simulazione). <span class="exo-badge exo-badge--advanced">Avanzato</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra soluzione</summary>
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

**Esercizio 13** — Scrivi `void radarTick(int distance_cm)` che stampa `beep` se distanza &lt; 70 (altrimenti nulla). <span class="exo-badge exo-badge--advanced">Avanzato</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void radarTick(int distance_cm) {
  if (distance_cm &lt; 70) Serial.println("beep");
}</code></pre>
</div>
</details>

**Esercizio 14** — Mini-architettura: in `loop`, leggi la distanza, calcola `period`, poi se `every(period)` chiama `radarTick`. <span class="exo-badge exo-badge--advanced">Avanzato</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra soluzione</summary>
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
  if (every(p, &amp;last) &amp;&amp; d &lt; 70) Serial.println("beep");
}</code></pre>
</div>
</details>

**Esercizio 15** — Scrivi `void logKV(const char* k, int v)` e usala per loggare `distance`. <span class="exo-badge exo-badge--advanced">Avanzato</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void logKV(const char* k, int v) {
  Serial.print(k);
  Serial.print('=');
  Serial.println(v);
}</code></pre>
</div>
</details>

**Esercizio 16** — DRY: crea `const int THRESHOLD = 3;` e usalo in 2 posti (intrusion + allarme) senza ricopiare il `3`. <span class="exo-badge exo-badge--advanced">Avanzato</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">const int THRESHOLD = 3;
int absInt(int v) { return v &lt; 0 ? -v : v; }
bool intrusion(int ref, int measure) { return absInt(measure - ref) &gt; THRESHOLD; }</code></pre>
</div>
</details>

**Esercizio 17** — Spiega in un commento cosa significa «modularità». <span class="exo-badge exo-badge--advanced">Avanzato</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">// Modularità: suddividere un programma in blocchi/funzioni indipendenti e riutilizzabili,
// ciascuno con una responsabilità chiara.</code></pre>
</div>
</details>

**Esercizio 18** — Crea `int speedFromDistance(int d)` che restituisce 0 se d&lt;=15, 80 se d&gt;=50, altrimenti 30. <span class="exo-badge exo-badge--advanced">Avanzato</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int speedFromDistance(int d) {
  if (d &lt;= 15) return 0;
  if (d &gt;= 50) return 80;
  return 30;
}</code></pre>
</div>
</details>

**Esercizio 19** — Aggiungi `void drive(int v)` che simula l’invio della velocità motore (`Serial.println(v)`). <span class="exo-badge exo-badge--advanced">Avanzato</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void drive(int v) {
  Serial.print("drive=");
  Serial.println(v);
}</code></pre>
</div>
</details>

**Esercizio 20** — Mini-progetto: in `loop`, leggi una distanza simulata, calcola la velocità con `speedFromDistance`, poi chiama `drive(v)` ogni 200 ms (non bloccante). <span class="exo-badge exo-badge--advanced">Avanzato</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">unsigned long last = 0;
bool every(unsigned long p, unsigned long* last) {
  unsigned long now = millis();
  if (now - *last &gt;= p) { *last = now; return true; }
  return false;
}
int speedFromDistance(int d) {
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
    int v = speedFromDistance(d);
    drive(v);
  }
}</code></pre>
</div>
</details>

*Autore: Emmanuel Sauvage.*
