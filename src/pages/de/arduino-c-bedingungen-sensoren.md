---
layout: ../../layouts/DePost.astro
title: "Arduino C Lektion 3: if/else-Bedingungen für Sensoren und Aktoren"
description: "Vergleiche, UND/ODER/NICHT und else if: die Regeln, mit denen ein Roboter anhand eines Abstandswerts anhält, bremst oder piept. Lektion 3 unseres Arduino-C-Kurses, 12 Übungen mit Lösungen."
updated: "23. Oktober 2026"
---

**Bedingungen** (`if`, `else if`, `else`) entscheiden, was je nach Lage passiert: gemessener Abstand, gedrückter Taster, wenig Licht. Dies ist Lektion 3 unseres [Arduino-Kurses](/de/arduino/).

In der Robotik schreibst du ständig Regeln wie:

```text
WENN Abstand <= 15 cm → STOPP
SONST → VORWÄRTS
```

## 1. Vergleiche

- `==` gleich (Achtung: in C **zwei** `=`)
- `!=` ungleich
- `<`, `>`, `<=`, `>=`

## 2. Bedingungen verknüpfen

- `&&`: UND
- `||`: ODER
- `!`: NICHT

```cpp
if (distance_cm <= 15 && speed > 0) {
  // Hindernis nah und Roboter fährt
}
```

## 3. Lesbare `if`-Anweisungen

- **Konstanten** verwenden: `const int DIST_STOP = 15;`
- tiefe „Pyramiden“ verschachtelter `if` vermeiden: in Funktionen aufteilen;
- Hilfsfunktionen wie Fragen benennen: `isNear`, `isPressed`.

Am echten Roboter kommt der Abstand meist von einem Ultraschallsensor wie dem HC-SR04, der in den meisten [Arduino-Roboterautos](/de/arduino-roboter-bausatz-fuer-kinder/) steckt.

## Übungen (12)

Ohne Sensor kannst du einen Messwert **simulieren**:

```cpp
int distance_cm = 42; // Testwert
```

### Leicht

**Übung 1**: Gib mit `int distance_cm = 12;` `STOP` aus, wenn `distance_cm <= 15`, sonst `GO`. <span class="exo-badge exo-badge--simple">Leicht</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
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

**Übung 2**: Lege `const int DIST_WARN = 35;` an und gib `WARN` aus, wenn `distance_cm <= DIST_WARN`. <span class="exo-badge exo-badge--simple">Leicht</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
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

**Übung 3**: Drei Zonen: `d >= 70` gibt `SILENT` aus, `d >= 35` `SLOW BEEP`, sonst `FAST BEEP`. <span class="exo-badge exo-badge--simple">Leicht</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int d = 50;
  if (d &gt;= 70) Serial.println("SILENT");
  else if (d &gt;= 35) Serial.println("SLOW BEEP");
  else Serial.println("FAST BEEP");
}
void loop() {}</code></pre>
</div>
</details>

**Übung 4**: Gib mit `bool pressed = true;` `CLICK` aus, wenn `pressed` wahr ist. <span class="exo-badge exo-badge--simple">Leicht</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  bool pressed = true;
  if (pressed) Serial.println("CLICK");
}
void loop() {}</code></pre>
</div>
</details>

### Mittel

**Übung 5**: Verrauschter Sensor: Werte es nur als Eindringen, wenn `abs(reading - reference) > 3` (schreibe `int absInt(int v)`). <span class="exo-badge exo-badge--intermediate">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int absInt(int v) { return v &lt; 0 ? -v : v; }

void setup() {
  Serial.begin(9600);
  int reference = 40;
  int reading = 44;
  if (absInt(reading - reference) &gt; 3) Serial.println("INTRUSION");
  else Serial.println("OK");
}
void loop() {}</code></pre>
</div>
</details>

**Übung 6**: UND: Gib `DANGER` aus, wenn `distance <= 15` UND `speed > 0`. <span class="exo-badge exo-badge--intermediate">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int distance = 12;
  int speed = 80;
  if (distance &lt;= 15 &amp;&amp; speed &gt; 0) Serial.println("DANGER");
}
void loop() {}</code></pre>
</div>
</details>

**Übung 7**: ODER: Gib `ALERT` aus, wenn `distance <= 15` ODER `soundDetected` wahr ist. <span class="exo-badge exo-badge--intermediate">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int distance = 50;
  bool soundDetected = true;
  if (distance &lt;= 15 || soundDetected) Serial.println("ALERT");
}
void loop() {}</code></pre>
</div>
</details>

**Übung 8**: Setze mit `int speed = 80;` den Wert `speed = 30`, wenn `distance <= 50`, und gib die Geschwindigkeit aus. <span class="exo-badge exo-badge--intermediate">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int distance = 40;
  int speed = 80;
  if (distance &lt;= 50) speed = 30;
  Serial.println(speed);
}
void loop() {}</code></pre>
</div>
</details>

### Fortgeschritten

**Übung 9**: Schreibe `int radarZone(int d)`, die 0, 1 oder 2 zurückgibt (still, langsam, schnell), und gib den passenden Text aus. <span class="exo-badge exo-badge--advanced">Fortgeschritten</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int radarZone(int d) {
  if (d &gt;= 70) return 0;
  if (d &gt;= 35) return 1;
  return 2;
}

void setup() {
  Serial.begin(9600);
  int z = radarZone(20);
  if (z == 0) Serial.println("SILENT");
  else if (z == 1) Serial.println("SLOW BEEP");
  else Serial.println("FAST BEEP");
}
void loop() {}</code></pre>
</div>
</details>

**Übung 10**: Bereich: Gib `OK` aus, wenn `d` zwischen 35 und 70 liegt (einschließlich). <span class="exo-badge exo-badge--advanced">Fortgeschritten</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int d = 50;
  if (d &gt;= 35 &amp;&amp; d &lt;= 70) Serial.println("OK");
}
void loop() {}</code></pre>
</div>
</details>

**Übung 11**: Erkläre `=` und `==` im Kommentar und schreibe einen korrekten Vergleich. <span class="exo-badge exo-badge--advanced">Fortgeschritten</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int mode = 2;
  // = assigns a value; == compares two values
  if (mode == 2) Serial.println("MODE 2");
}
void loop() {}</code></pre>
</div>
</details>

**Übung 12**: Mini-Projekt, Bremsregel: Wenn `distance <= 50`, dann `speed = 40`, sonst `speed = 80`. Gib `speed` aus. <span class="exo-badge exo-badge--advanced">Fortgeschritten</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int distance = 60;
  int speed = 0;
  if (distance &lt;= 50) speed = 40;
  else speed = 80;
  Serial.println(speed);
}
void loop() {}</code></pre>
</div>
</details>

---

← Zurück: [Lektion 2: Datentypen, Variablen und Konstanten](/de/arduino-c-datentypen-variablen/) · [Zur Kursübersicht](/de/arduino/)
