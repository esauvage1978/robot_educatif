---
layout: ../../layouts/DePost.astro
title: "Arduino C Lektion 2: Datentypen, Variablen und Konstanten"
description: "int, unsigned long, float, bool, char und const char*: welcher Arduino-Datentyp für Geschwindigkeit, Abstand, Zeit und Zustände, dazu Gültigkeitsbereich und Konstanten. Lektion 2 unseres Arduino-C-Kurses, 12 Übungen mit Lösungen."
updated: "23. Oktober 2026"
---

In der Robotik arbeitest du mit vielen **Zahlen** (Geschwindigkeit, Abstand, Zeit) und **Zuständen** (an/aus). In Arduino C macht der richtige **Datentyp** das Programm klarer und vermeidet Fehler. Dies ist Lektion 2 unseres [Arduino-Kurses](/de/arduino/).

## 1. Die wichtigsten Datentypen

- **`int`**: Ganzzahl (Zähler, Geschwindigkeit, Schwellwert). Auf einem UNO 16 Bit, von −32.768 bis 32.767 ([Arduino-Referenz](https://docs.arduino.cc/language-reference/en/variables/data-types/int/)).
- **`unsigned long`**: Zeit aus `millis()`, das genau diesen Typ zurückgibt.
- **`float`**: Kommazahl (Messwert, Mittelwert, Berechnung).
- **`bool`**: wahr/falsch (Zustand, Flag).
- **`char`**: ein Zeichen (`'A'`).
- **`const char*`**: konstanter Text, praktisch für Meldungen.

> Faustregel: Wer Ereignisse zählt, braucht eine Ganzzahl, also `int`, nicht `float`.

## 2. Globale und lokale Variablen (Gültigkeitsbereich)

- **Global**: außerhalb jeder Funktion deklariert, überall sichtbar.
- **Lokal**: innerhalb einer Funktion deklariert, nur in diesem Block sichtbar.

```text
int global;        ← sichtbar in setup() und loop()

void loop() {
  int local;       ← nur in loop() sichtbar
}
```

## 3. Konstanten statt magischer Zahlen

```cpp
const int LED_PIN = 13;
const int BAUD = 9600;
const int DELAY_MS = 100;
```

Wähle Namen, die sagen, **warum** es diese Zahl gibt.

## 4. Häufige Umwandlungen

- `int n = 3; float f = n;` funktioniert (aus 3 wird 3.0).
- `float f = 3.7; int n = (int)f;` schneidet ab (aus 3.7 wird 3).

Für Textausgaben behältst du Zahlen als `int` und gibst sie mit `Serial.print` aus, statt globale `String`-Objekte zu bauen.

## Übungen (12)

Die Lösungen sind verborgen: Klicke auf **Lösung anzeigen**.

### Leicht

**Übung 1**: Deklariere `int counter = 0;` und erhöhe die Variable in `loop()`. <span class="exo-badge exo-badge--simple">Leicht</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int counter = 0;
void setup() {}
void loop() { counter++; }</code></pre>
</div>
</details>

**Übung 2**: Deklariere `bool alarm = false;` und setze sie in `setup()` auf `true`. <span class="exo-badge exo-badge--simple">Leicht</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">bool alarm = false;
void setup() { alarm = true; }
void loop() {}</code></pre>
</div>
</details>

**Übung 3**: Deklariere `unsigned long t0 = 0;` und speichere in `setup()` den Wert von `millis()`. <span class="exo-badge exo-badge--simple">Leicht</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">unsigned long t0 = 0;
void setup() { t0 = millis(); }
void loop() {}</code></pre>
</div>
</details>

**Übung 4**: Gib einen `int` und einen `float` mit `Serial.print` in einer Zeile aus. <span class="exo-badge exo-badge--simple">Leicht</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int n = 7;
float f = 3.5;
void setup() {
  Serial.begin(9600);
  Serial.print("n=");
  Serial.print(n);
  Serial.print(" f=");
  Serial.println(f);
}
void loop() {}</code></pre>
</div>
</details>

### Mittel

**Übung 5**: Gültigkeitsbereich: Deklariere eine lokale Variable `int x` in `loop()` und erkläre im Kommentar, warum `setup()` sie nicht verwenden kann. <span class="exo-badge exo-badge--intermediate">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  // x does not exist here if it is declared in loop()
  // Scope: a local variable is only visible inside its block.
}
void loop() {
  int x = 0;
  x++;
}</code></pre>
</div>
</details>

**Übung 6**: Deklariere einen Text `const char* msg = "OK";` und gib ihn beim Start aus. <span class="exo-badge exo-badge--intermediate">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">const char* msg = "OK";
void setup() {
  Serial.begin(9600);
  Serial.println(msg);
}
void loop() {}</code></pre>
</div>
</details>

**Übung 7**: Umwandlung: Berechne mit `float d = 12.9;` den Wert `int n = (int)d;` und gib `n` aus (Ergebnis: 12). <span class="exo-badge exo-badge--intermediate">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  float d = 12.9;
  int n = (int)d;
  Serial.println(n); // 12
}
void loop() {}</code></pre>
</div>
</details>

**Übung 8**: Schreibe `int clampInt(int v, int minV, int maxV)`, die `v` zwischen min und max hält. <span class="exo-badge exo-badge--intermediate">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int clampInt(int v, int minV, int maxV) {
  if (v &lt; minV) return minV;
  if (v &gt; maxV) return maxV;
  return v;
}</code></pre>
</div>
</details>

### Fortgeschritten

**Übung 9**: Erkläre im Kommentar, warum `millis()` in einem `unsigned long` gespeichert werden muss. <span class="exo-badge exo-badge--advanced">Fortgeschritten</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  // millis() returns a large positive number (ms since start-up)
  // unsigned long matches its return type and keeps the full range.
  unsigned long t = millis();
  Serial.begin(9600);
  Serial.println(t);
}
void loop() {}</code></pre>
</div>
</details>

**Übung 10**: Schreibe `bool isNear(int distanceCm, int threshold)`, die true zurückgibt, wenn `distanceCm <= threshold`. <span class="exo-badge exo-badge--advanced">Fortgeschritten</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">bool isNear(int distanceCm, int threshold) {
  return distanceCm &lt;= threshold;
}</code></pre>
</div>
</details>

**Übung 11**: `static`: Schreibe eine Funktion, die zählt, wie oft sie aufgerufen wurde. <span class="exo-badge exo-badge--advanced">Fortgeschritten</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int countCalls() {
  static int c = 0;
  c++;
  return c;
}</code></pre>
</div>
</details>

**Übung 12**: Mini-Projekt: Gib mit `int distance_cm = 42;` den Text `Distance: 42 cm` aus. <span class="exo-badge exo-badge--advanced">Fortgeschritten</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int distance_cm = 42;
  Serial.print("Distance: ");
  Serial.print(distance_cm);
  Serial.println(" cm");
}
void loop() {}</code></pre>
</div>
</details>

---

← Zurück: [Lektion 1: Aufbau eines Sketches und Serial](/de/arduino-c-sketch-aufbau-serial/) · Weiter: [Lektion 3: Bedingungen, Sensoren und Aktoren](/de/arduino-c-bedingungen-sensoren/) → · [Zur Kursübersicht](/de/arduino/)
