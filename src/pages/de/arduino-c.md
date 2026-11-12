---
layout: ../../layouts/DePost.astro
title: "Arduino C lernen — Einsteigerkurs Robotik"
description: "Arduino C Schritt für Schritt lernen: setup und loop, Datentypen, Bedingungen, Schleifen und Funktionen. Kostenloser Kurs mit Übungen für Bildungsrobotik."
updated: "31. Oktober 2026"
faqSchema:
  - question: "Was ist Arduino C?"
    answer: "Arduino C bezeichnet das vereinfachte C/C++ zum Programmieren einer Arduino-Platine. Jedes Programm (Sketch) hat setup() einmal und danach loop() dauerhaft."
  - question: "Wie lerne ich Arduino als kompletter Anfänger?"
    answer: "Folgen Sie diesem Kurs der Reihe nach: Sketch-Aufbau, Datentypen und Variablen, Bedingungen mit Sensoren, Schleifen und Timing, dann Funktionen. Jede Lektion enthält Code und Übungen."
  - question: "Muss ich C schon können, bevor ich starte?"
    answer: "Nein. Dieser Kurs startet bei null und erklärt setup, loop, Basistypen und Sensorwerte, bevor es zu Funktionen geht."
---

Einige Links auf dieser Seite sind Affiliate-Links. Bei einem Kauf können wir eine Provision erhalten — ohne Mehrkosten für Sie. Prüfen Sie den aktuellen Preis auf der Produktseite.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Arduino C lernen — Einsteigerkurs Robotik",
  "description": "Kostenloser Kurs für Arduino C: setup/loop, Datentypen, Bedingungen, Schleifen und Funktionen mit Robotik-Übungen.",
  "url": "https://robot-educatif.info/de/arduino-c/",
  "inLanguage": "de",
  "isAccessibleForFree": true,
  "provider": { "@type": "Organization", "name": "Robot Éducatif", "sameAs": "https://robot-educatif.info/" },
  "hasCourseInstance": { "@type": "CourseInstance", "courseMode": "online", "inLanguage": "de" }
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Arduino-C-Kurs — Lektionen",
  "numberOfItems": 5,
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Sketch-Aufbau, setup/loop, Serial", "url": "https://robot-educatif.info/de/arduino-c-sketch-aufbau-serial/" },
    { "@type": "ListItem", "position": 2, "name": "Datentypen und Variablen", "url": "https://robot-educatif.info/de/arduino-c-datentypen-variablen/" },
    { "@type": "ListItem", "position": 3, "name": "Bedingungen, Sensoren und Aktoren", "url": "https://robot-educatif.info/de/arduino-c-bedingungen-sensoren/" },
    { "@type": "ListItem", "position": 4, "name": "Schleifen und Timing", "url": "https://robot-educatif.info/c-arduino-boucles-timing/" },
    { "@type": "ListItem", "position": 5, "name": "Funktionen, Modularität, gute Praktiken", "url": "https://robot-educatif.info/de/arduino-c-funktionen-best-practices/" }
  ]
}
</script>

![Arduino-Uno-Platine schräg fotografiert — die übliche blaue Platine, die man mit Arduino C programmiert](/images/lot2/arduino-uno-perspective.webp)

*Die Arduino-Uno-Platine, das häufigste Modell für Einsteiger. Sie führt Ihr Programm `setup()` / `loop()` aus. Foto: Creative Tools — [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) — [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Arduino-uno-perspective.jpg) (skaliert / WebP).*

> **In einem Satz.** Die sogenannte „Arduino-Sprache“ ist **C/C++**, vereinfacht für Mikrocontroller-Platinen: Jedes Programm (ein **Sketch**, Datei `.ino`) enthält **`setup()`** (Vorbereitung, einmal) und **`loop()`** (läuft danach dauerhaft). Die offizielle Umgebung kompiliert mit **avr-gcc** (dem Compiler der Arduino-IDE) und lädt das Programm per USB. Erste Lektion: [Sketch-Aufbau](/de/arduino-c-sketch-aufbau-serial/).

Sie möchten Arduino lernen, um eine LED blinken zu lassen, einen Sensor zu lesen oder einen kleinen Roboter zu steuern — aber viele Tutorials springen zu schnell. Dieser kostenlose Kurs führt Sie Lektion für Lektion: Sketch-Struktur, Variablentypen, Bedingungen, Schleifen, dann Funktionen. Jede Seite bietet Code zum Tippen, Übungen und typische Fehler.

Ergänzende Lernressourcen auf [Amazon.de](https://www.amazon.de/s?k=arduino+lernen+c+programmierung&tag=roboteducat00-21) (Affiliate).

## Standard-C vs. Arduino-Sprache — worin liegt der Unterschied?

Beim C-Kurs auf dem PC schreibt man oft eine Funktion **`main()`**. Bei Arduino schreiben Sie **`main()`** nicht selbst: Die IDE erzeugt eine, die zuerst Ihr **`setup()`** aufruft und dann **`loop()`** wiederholt. Ein- und Ausgänge steuern Sie mit **`pinMode`**, **`digitalWrite`**, **`digitalRead`** und **`analogRead`**.

![Schema des Arduino-Zyklus: setup einmal, dann loop mit Sensoren und Ausgängen](/images/lot2/arduino-setup-loop-cycle.svg)

*Beim Start: `setup()` einmal. Danach: `loop()` liest Eingänge (Sensoren), steuert Ausgänge (LEDs, Motoren) und beginnt von vorn.*

## Kompilieren und Hochladen (Schritte)

1. Sketch in der Arduino-IDE öffnen oder anlegen (`.ino`).
2. **Board** (z. B. Uno) und **seriellen Port** wählen (`COM` unter Windows, `/dev/ttyUSB*` unter Linux).
3. Auf **Überprüfen** klicken, um zu kompilieren. Syntaxfehler korrigieren (Semikolon, Typen).
4. Auf **Hochladen** klicken und auf „Done uploading“ / „Hochladen fertig“ warten.

## Häufige Compile- und Upload-Fehler

| Meldung / Symptom | Hinweis |
|---|---|
| `stk500_getsync()` | Falscher Port, Nur-Lade-USB-Kabel, Board nicht gewählt, anderes Programm blockiert den Port |
| Serieller Port fehlt | USB-Treiber installieren (oft CH340/CH341 oder FTDI bei Clone-Boards) |
| `expected ';' before …` | Fehlendes Semikolon am Ende einer C-Zeile |
| Typen / Umwandlung | Vermischung von `int` und `float` — siehe [Datentypen und Variablen](/de/arduino-c-datentypen-variablen/) |

## Minimales kommentiertes Beispiel

```cpp
const int LED = 13;

void setup() {
  pinMode(LED, OUTPUT);  // Pin 13 als Ausgang
}

void loop() {
  digitalWrite(LED, HIGH);  // an
  delay(500);               // 500 ms warten
  digitalWrite(LED, LOW);   // aus
  delay(500);
}
```

Erwartetes Ergebnis: Die eingebaute LED blinkt etwa zweimal pro Sekunde. Passiert nichts, prüfen Sie zuerst Upload und Board-Auswahl.

## Lektionen des Kurses

Reihenfolge einhalten: Jede Lektion baut auf der vorherigen auf.

| # | Lektion | Inhalt |
|---|---|---|
| 1 | [Sketch-Aufbau, setup/loop, Serial](/de/arduino-c-sketch-aufbau-serial/) | Ablauf eines Sketches, Serial Monitor, erste Gewohnheiten |
| 2 | [Datentypen und Variablen](/de/arduino-c-datentypen-variablen/) | `int`, `float`, `bool`, `const`, Sichtbarkeit |
| 3 | [Bedingungen, Sensoren und Aktoren](/de/arduino-c-bedingungen-sensoren/) | `if`/`else`, Schwellwerte, `digitalRead` / `analogRead` |
| 4 | [Schleifen und Timing](/c-arduino-boucles-timing/) | `for`/`while`, `delay` vs. `millis()` |
| 5 | [Funktionen, Modularität, gute Praktiken](/de/arduino-c-funktionen-best-practices/) | DRY, Parameter, wiederverwendbare Helfer |

Verwandter Hardware-Leitfaden: [Arduino](/de/arduino/). Weiterführung Smart Home: [Smart Home Einstieg](/de/smart-home/einstieg/). Alle Programmier-Kurse auf dieser Seite: [Hub Programmierung](/programmation/).

## Warum Arduino C für Robotik lernen?

Robotik-Programme wachsen schnell: Sensoren, Schwellwerte, Motoren, Timing. Mit klarer **Sketch-Struktur**, dann **Typen**, **Bedingungen**, **Schleifen** und **Funktionen** vermeiden Sie Spaghetti-Code und debuggen schneller mit dem Serial Monitor.

Typische Progression nach dem Blink-Beispiel:

1. Digitalen Taster oder Liniensensor lesen.
2. Motor oder LED ansteuern, wenn ein Schwellwert überschritten wird.
3. Blockierendes `delay()` durch `millis()` ersetzen, damit der Roboter weiter reagieren kann.
4. Verhalten in benannte Funktionen aufteilen.

## Checkliste vor dem ersten Upload

- USB-**Daten**kabel (kein Nur-Lade-Kabel).
- Richtiges **Board** in der IDE gewählt (UNO, Mega, Nano…).
- Richtiger **Port** nach dem Einstecken sichtbar.
- Sketch kompiliert mit **Überprüfen**, bevor Sie Hochladen klicken.
- Baudrate im Serial Monitor stimmt mit `Serial.begin(...)` überein.

## FAQ

<details>
<summary>Was ist Arduino C?</summary>

Der Alltagsname für C/C++, angepasst an Arduino-Platinen. Sie schreiben einen Sketch mit `setup()` und `loop()`; die IDE kompiliert und lädt ihn auf die Platine.
</details>

<details>
<summary>Wie lerne ich Arduino von null?</summary>

Folgen Sie diesem Kurs der Reihe nach mit einer Uno (oder kompatibel) und einem Daten-USB-Kabel. Gehen Sie erst weiter, wenn das Beispiel der aktuellen Lektion kompiliert und läuft.
</details>

<details>
<summary>Muss ich die Sprache C schon können?</summary>

Nein. Nützliche Grundlagen (Typen, Bedingungen, Schleifen, Funktionen) kommen nach und nach mit konkreten Robotik-Beispielen.
</details>

*Autor: Emmanuel Sauvage.*
