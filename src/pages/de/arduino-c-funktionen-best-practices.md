---
layout: ../../layouts/DePost.astro
title: "Arduino C Lektion 5: Funktionen, Modularität und gute Praktiken"
description: "Funktionen Arduino: Scope, DRY, lesbarer Code, Globale vermeiden. 20 Übungen mit Lösungen."
updated: "31. Oktober 2026"
---

![Arduino-Uno-Platine schräg fotografiert — die Platine, auf der diese Funktionsübungen laufen](/images/lot2/arduino-uno-perspective.webp)

*Die Arduino Uno, die übliche Platine für diesen Kurs. Foto: Creative Tools — [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) — [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Arduino-uno-perspective.jpg) (skaliert / WebP).*

Wenn dein Robotik-Programm wächst, wird es schwer lesbar: viele `if`, viele Wiederholungen und Konstanten überall. **Funktionen** helfen dir dabei:

- eine Aktion zu bündeln: `idleState()`, `raiseAlarm()`
- Code nicht zu kopieren (Prinzip **DRY** (*Don't Repeat Yourself* — Wiederholungen vermeiden))
- leichter zu testen

Das ist Lektion **5** des [Arduino-C-Kurses](/de/arduino-c/). Vorherige Lektionen: [Sketch-Aufbau](/de/arduino-c-sketch-aufbau-serial/), [Datentypen](/de/arduino-c-datentypen-variablen/), [Bedingungen](/de/arduino-c-bedingungen-sensoren/), [Schleifen und Timing](/c-arduino-boucles-timing/). Kurz zur Erinnerung: `delay()` blockiert die Schleife; für parallele Aufgaben eher `millis()` nutzen.

Einige Links auf dieser Seite sind Affiliate-Links: Bei einem Kauf darüber können wir eine Provision erhalten — ohne Mehrkosten für dich. Um die Übungen auf echter Hardware auszuführen, reicht ein **Arduino-Uno-Starterkit** (Platine, USB-Kabel, LEDs, Widerstände, Breadboard) — Tagespreis auf [Amazon.de](https://www.amazon.de/s?k=arduino+uno+starter+kit&tag=roboteducat00-21) prüfen. Bücher zu C für Arduino: [Amazon.de](https://www.amazon.de/s?k=arduino+lernen+c+programmierung&tag=roboteducat00-21).

## 1) DRY (Don't Repeat Yourself — Wiederholungen vermeiden)

DRY bedeutet: **dieselbe Information nicht an mehreren Stellen wiederholen**.

Beispiel: schreibst du `"Meine Nachricht"` zweimal, änderst du vielleicht eine Kopie und vergisst die andere. In der Robotik entstehen so schwer verständliche Bugs.

Gute Praxis: eine einzige Quelle:

```cpp
const char* message = "Meine Nachricht";
```

## 2) Sichtbarkeit (Scope)

- **globale** Variable: überall sichtbar
- **lokale** Variable: nur im Block sichtbar, in dem sie deklariert ist
- **Parameter**: ein Wert, der einer Funktion „gegeben“ wird

In der Robotik machen zu viele Globale das Programm schwer nachvollziehbar. Globale behält man für nötige **Zustände**, den Rest übergibt man als Parameter.

## 3) Robotik-Beispiel (Struktur)

```text
loop():
  Sensor lesen
  wenn Intrusion -> raiseAlarm()
  sonst -> idleState()
```

---

## Übungen (20)

### Einfaches Niveau

**Übung 1** — Schreibe eine Funktion `void idleState()`, die `IDLE` auf Serial ausgibt. <span class="exo-badge exo-badge--simple">Einfach</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void idleState() {
  Serial.println("IDLE");
}</code></pre>
</div>
</details>

**Übung 2** — Schreibe `void raiseAlarm()`, die `ALERT` ausgibt und einen simulierten „Beep“ (`Serial.println("beep")`). <span class="exo-badge exo-badge--simple">Einfach</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void raiseAlarm() {
  Serial.println("ALERT");
  Serial.println("beep");
}</code></pre>
</div>
</details>

**Übung 3** — Rufe `idleState()` in `setup()` auf (nach `Serial.begin`). <span class="exo-badge exo-badge--simple">Einfach</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void idleState() { Serial.println("IDLE"); }
void setup() {
  Serial.begin(9600);
  idleState();
}
void loop() {}</code></pre>
</div>
</details>

**Übung 4** — DRY: deklariere `const int DIST_STOP = 15;` und nutze sie in `bool isStop(int d)`. <span class="exo-badge exo-badge--simple">Einfach</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">const int DIST_STOP = 15;
bool isStop(int d) { return d &lt;= DIST_STOP; }</code></pre>
</div>
</details>

**Übung 5** — Schreibe `int absInt(int v)` (Absolutwert) und nutze sie für eine Intrusionsschwelle. <span class="exo-badge exo-badge--simple">Einfach</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int absInt(int v) { return v &lt; 0 ? -v : v; }</code></pre>
</div>
</details>

### Mittleres Niveau

**Übung 6** — Schreibe `bool intrusion(int ref, int measure, int threshold)`, die true liefert, wenn `abs(measure-ref) > threshold`. <span class="exo-badge exo-badge--intermediate">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int absInt(int v) { return v &lt; 0 ? -v : v; }
bool intrusion(int ref, int measure, int threshold) {
  return absInt(measure - ref) &gt; threshold;
}</code></pre>
</div>
</details>

**Übung 7** — Vermeide eine Globale: erstelle `void showCounter(int n)` statt direkt auf `intrusions` zuzugreifen. <span class="exo-badge exo-badge--intermediate">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void showCounter(int n) {
  Serial.print("intrusions=");
  Serial.println(n);
}</code></pre>
</div>
</details>

**Übung 8** — Schreibe `void idleState(int intrusionCount)`, die je nach Zähler einen anderen Text zeigt (0: OK, sonst: WARNING). <span class="exo-badge exo-badge--intermediate">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void idleState(int intrusionCount) {
  if (intrusionCount == 0) Serial.println("OK");
  else Serial.println("WARNING");
}</code></pre>
</div>
</details>

**Übung 9** — Erkläre im Kommentar: warum ein Parameter `intrusionCount` didaktisch hilft, auch wenn die Variable global ist. <span class="exo-badge exo-badge--intermediate">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">// Didaktik: man sieht, welche Infos die Funktion nutzt (wie f(x));
// gute Praxis: weniger globale Variablen machen Code testbarer und lesbarer.</code></pre>
</div>
</details>

**Übung 10** — Schreibe `unsigned long periodFromDistance(int d)`, die 1000 ms liefert wenn 35..69, 250 ms wenn &lt;35, sonst 100 ms. <span class="exo-badge exo-badge--intermediate">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">unsigned long periodFromDistance(int d) {
  if (d &gt;= 70) return 100;
  if (d &gt;= 35) return 1000;
  return 250;
}</code></pre>
</div>
</details>

### Fortgeschrittenes Niveau

**Übung 11** — Schreibe `bool every(unsigned long period, unsigned long* last)` (generischer Timer). <span class="exo-badge exo-badge--advanced">Fortgeschritten</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">bool every(unsigned long period, unsigned long* last) {
  unsigned long now = millis();
  if (now - *last &gt;= period) { *last = now; return true; }
  return false;
}</code></pre>
</div>
</details>

**Übung 12** — Erstelle `int readDistanceFake()`, die eine Distanz von 70 nach 0 und wieder hoch liefert (Simulation). <span class="exo-badge exo-badge--advanced">Fortgeschritten</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
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

**Übung 13** — Schreibe `void radarTick(int distance_cm)`, die `beep` ausgibt wenn Distanz &lt; 70 (sonst nichts). <span class="exo-badge exo-badge--advanced">Fortgeschritten</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void radarTick(int distance_cm) {
  if (distance_cm &lt; 70) Serial.println("beep");
}</code></pre>
</div>
</details>

**Übung 14** — Mini-Architektur: in `loop` Distanz lesen, `period` berechnen, dann bei `every(period)` `radarTick` aufrufen. <span class="exo-badge exo-badge--advanced">Fortgeschritten</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
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

**Übung 15** — Schreibe `void logKV(const char* k, int v)` und nutze sie zum Loggen von `distance`. <span class="exo-badge exo-badge--advanced">Fortgeschritten</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void logKV(const char* k, int v) {
  Serial.print(k);
  Serial.print('=');
  Serial.println(v);
}</code></pre>
</div>
</details>

**Übung 16** — DRY: erstelle `const int THRESHOLD = 3;` und nutze sie an zwei Stellen (Intrusion + Alarm) ohne die `3` zu kopieren. <span class="exo-badge exo-badge--advanced">Fortgeschritten</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">const int THRESHOLD = 3;
int absInt(int v) { return v &lt; 0 ? -v : v; }
bool intrusion(int ref, int measure) { return absInt(measure - ref) &gt; THRESHOLD; }</code></pre>
</div>
</details>

**Übung 17** — Erkläre im Kommentar, was „Modularität“ bedeutet. <span class="exo-badge exo-badge--advanced">Fortgeschritten</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">// Modularität: ein Programm in unabhängige, wiederverwendbare Blöcke/Funktionen teilen,
// jeweils mit klarer Verantwortung.</code></pre>
</div>
</details>

**Übung 18** — Erstelle `int speedFromDistance(int d)`, die 0 liefert wenn d&lt;=15, 80 wenn d&gt;=50, sonst 30. <span class="exo-badge exo-badge--advanced">Fortgeschritten</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int speedFromDistance(int d) {
  if (d &lt;= 15) return 0;
  if (d &gt;= 50) return 80;
  return 30;
}</code></pre>
</div>
</details>

**Übung 19** — Ergänze `void drive(int v)`, die die Motorgeschwindigkeit simuliert (`Serial.println(v)`). <span class="exo-badge exo-badge--advanced">Fortgeschritten</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void drive(int v) {
  Serial.print("drive=");
  Serial.println(v);
}</code></pre>
</div>
</details>

**Übung 20** — Mini-Projekt: in `loop` simulierte Distanz lesen, Geschwindigkeit mit `speedFromDistance` berechnen, dann `drive(v)` alle 200 ms (nicht blockierend). <span class="exo-badge exo-badge--advanced">Fortgeschritten</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
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

*Autor: Emmanuel Sauvage.*
