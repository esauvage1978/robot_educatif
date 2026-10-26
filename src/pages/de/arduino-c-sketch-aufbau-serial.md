---
layout: ../../layouts/DePost.astro
title: "Arduino C Lektion 1: Aufbau eines Sketches, setup() und loop(), serieller Monitor"
description: "So ist ein Arduino-Sketch aufgebaut: setup() läuft einmal, loop() wiederholt sich endlos, und Serial gibt Debug-Meldungen aus. Lektion 1 unseres Arduino-C-Kurses mit 12 Übungen und Lösungen."
updated: "23. Oktober 2026"
---

**Arduino C** ist C/C++ für Mikrocontroller. In der Robotik ist die Idee einfach: Dein Programm läuft auf der Platine **in einer Schleife**, liest **Sensoren** und steuert **Aktoren** (LEDs, Motoren, Summer). Dies ist Lektion 1 unseres [Arduino-Kurses](/de/arduino/); der Code läuft auf jeder UNO-kompatiblen Platine, auch auf der eines [Arduino-Roboterbausatzes](/de/arduino-roboter-bausatz-fuer-kinder/).

In dieser Lektion lernst du:

- den Aufbau eines **Sketches** (`setup()` / `loop()`);
- wie du prüfst, ob er kompiliert;
- wie du **Serial** zur Fehlersuche nutzt;
- ein paar gute Gewohnheiten von Anfang an.

> Auf einem Makeblock mBot (mCore-Platine), der über mBlock in Arduino C programmiert wird, gilt dieselbe Logik, ergänzt um die Makeblock-Bibliotheken.

## 1. Aufbau: `setup()` und `loop()`

Fast jeder Arduino-Sketch enthält:

- `setup()`: läuft beim Start **einmal**;
- `loop()`: läuft **immer wieder**.

```text
Platine startet
  └── setup() (einmal)
        └── loop() (endlos wiederholt)
```

```cpp
void setup() {
  // läuft einmal
}

void loop() {
  // läuft endlos
}
```

## 2. Überprüfen und hochladen

- **Überprüfen / Kompilieren** findet Fehler, ohne den Roboter anzufassen.
- **Hochladen** überträgt das Programm auf die Platine.

Ändere **wenig auf einmal**, kompiliere oft und teste Schritt für Schritt. Die [Arduino IDE](https://www.arduino.cc/en/software) ist für Windows, macOS und Linux kostenlos.

## 3. Fehlersuche mit `Serial`

`Serial` schreibt Meldungen an den Computer (serieller Monitor). Das ist das Arduino-Gegenstück zu `print()` in Python.

```cpp
void setup() {
  Serial.begin(9600);
  Serial.println("Hallo!");
}

void loop() {
  Serial.println("Running");
  delay(1000);
}
```

- Rufe `Serial.begin(...)` immer in `setup()` auf und stelle im seriellen Monitor dieselbe Geschwindigkeit ein.
- Überflute die Schnittstelle nicht: füge ein `delay(...)` ein oder nutze später `millis()`.

## 4. Gute Gewohnheiten von Anfang an

- **Klare Namen**: `counter`, `distance_cm`, `state`.
- `const` für Konstanten: `const int LED_PIN = 13;`
- Keine „magischen Zahlen“ (`9600`, `13`, `1000`) im Code verteilen: lieber benannte Konstanten.

## Übungen (12)

Die Lösungen sind verborgen: Klicke auf **Lösung anzeigen**.

### Leicht

**Übung 1**: Schreibe einen leeren Sketch, der kompiliert: leere `setup()` und `loop()`. <span class="exo-badge exo-badge--simple">Leicht</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {}
void loop() {}</code></pre>
</div>
</details>

**Übung 2**: Starte `Serial` mit 9600 Baud in `setup()`. <span class="exo-badge exo-badge--simple">Leicht</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
}
void loop() {}</code></pre>
</div>
</details>

**Übung 3**: Gib beim Start einmal `Hallo` aus. <span class="exo-badge exo-badge--simple">Leicht</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  Serial.println("Hello");
}
void loop() {}</code></pre>
</div>
</details>

**Übung 4**: Gib in `loop()` alle 2 Sekunden `Running` aus. <span class="exo-badge exo-badge--simple">Leicht</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
}
void loop() {
  Serial.println("Running");
  delay(2000);
}</code></pre>
</div>
</details>

### Mittel

**Übung 5**: Deklariere eine Konstante `const int BAUD = 9600;` und verwende sie. <span class="exo-badge exo-badge--intermediate">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">const int BAUD = 9600;

void setup() {
  Serial.begin(BAUD);
}
void loop() {}</code></pre>
</div>
</details>

**Übung 6**: Lege eine globale Variable `int counter = 0;` an, gib sie jede Sekunde aus und erhöhe sie dann. <span class="exo-badge exo-badge--intermediate">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int counter = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.println(counter);
  counter++;
  delay(1000);
}</code></pre>
</div>
</details>

**Übung 7**: Gib `counter=` und den Wert in derselben Zeile aus. <span class="exo-badge exo-badge--intermediate">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int counter = 0;

void setup() { Serial.begin(9600); }

void loop() {
  Serial.print("counter=");
  Serial.println(counter);
  counter++;
  delay(1000);
}</code></pre>
</div>
</details>

**Übung 8**: Zähle nur von 0 bis 9, gib dann `ENDE` aus und halte an (gewollte Endlosschleife). <span class="exo-badge exo-badge--intermediate">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int counter = 0;

void setup() { Serial.begin(9600); }

void loop() {
  if (counter &lt;= 9) {
    Serial.println(counter);
    counter++;
    delay(500);
  } else {
    Serial.println("END");
    while (true) {
      // stop
    }
  }
}</code></pre>
</div>
</details>

### Fortgeschritten

**Übung 9**: Gib jede Sekunde `millis()` aus (Millisekunden seit dem Start). <span class="exo-badge exo-badge--advanced">Fortgeschritten</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
}
void loop() {
  Serial.println(millis());
  delay(1000);
}</code></pre>
</div>
</details>

**Übung 10**: Gib ohne `delay` nach 3 Sekunden einmal `READY` aus, mit `millis()` (Tipp: Startzeit speichern). <span class="exo-badge exo-badge--advanced">Fortgeschritten</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">unsigned long t0 = 0;
bool shown = false;

void setup() {
  Serial.begin(9600);
  t0 = millis();
}

void loop() {
  if (!shown &amp;&amp; (millis() - t0 &gt;= 3000)) {
    Serial.println("READY");
    shown = true;
  }
}</code></pre>
</div>
</details>

**Übung 11**: Schreibe eine Funktion `void logValue(const char* name, int v)`, die `name=v` ausgibt. <span class="exo-badge exo-badge--advanced">Fortgeschritten</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void logValue(const char* name, int v) {
  Serial.print(name);
  Serial.print('=');
  Serial.println(v);
}

void setup() {
  Serial.begin(9600);
  logValue("score", 42);
}
void loop() {}</code></pre>
</div>
</details>

**Übung 12**: Erkläre `Serial.print` und `Serial.println` in einem Kommentar und verwende beide. <span class="exo-badge exo-badge--advanced">Fortgeschritten</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  // print: no line break
  // println: adds a line break at the end
  Serial.print("A");
  Serial.print("B");
  Serial.println("C"); // end of line here
}
void loop() {}</code></pre>
</div>
</details>

---

Weiter: [Lektion 2: Datentypen, Variablen und Konstanten](/de/arduino-c-datentypen-variablen/) → · [Zur Kursübersicht](/de/arduino/)
