---
layout: ../../layouts/DePost.astro
title: "Makeblock mBot Roboter: mein erster Lernroboter"
description: "Der klassische Makeblock mBot für Einsteiger: Aufbau mit einem Erwachsenen, vorinstallierte Modi, Batterien und erste Schritte mit mBlock (Programmierung mit Blöcken im Scratch-Stil)."
updated: "31. Oktober 2026"
faqSchema:
  - question: "Wie funktioniert der Roboter mBot?"
    answer: "Der mBot ist eine kleine fahrbare Plattform. Die Steuerplatine mCore führt ein Programm aus (ein vorinstallierter Modus oder ein aus mBlock gesendetes Skript), steuert Motoren, LEDs und Summer und liest die Sensoren (Ultraschall für den Abstand, Liniensensor unter dem Chassis). Du kannst im Live-Modus testen, solange der Roboter mit dem Computer verbunden ist, oder das Programm auf die Platine hochladen, damit es ohne Kabel läuft."
  - question: "Ist der mBot ein Lernroboter?"
    answer: "Ja. Ein Lernroboter (auch pädagogischer Roboter) dient dazu, Programmieren und Robotik an einem echten Gegenstand zu lernen. Der mBot wird dafür in Familien und Schulen sehr häufig eingesetzt."
  - question: "Was ist der Unterschied zwischen mBot und mBot2?"
    answer: "Der klassische mBot nutzt vor allem die Platine mCore und RJ25-Anschlüsse. Der mBot2 basiert auf der CyberPi-Platine und dem mBuild-Bus und führt natürlicher zu Python."
  - question: "Mein mBot-Programm tut nicht, was ich will. Wo fange ich an?"
    answer: "Prüfe, ob in mBlock das richtige Gerät gewählt ist, ob die Verbindung steht (USB ist zum Testen am besten), und lade nach jeder Änderung erneut hoch. Bei Funkproblemen hilft die Seite zur Bluetooth-Fehlersuche."
  - question: "Wo kaufe ich den klassischen mBot (nicht den mBot2)?"
    answer: "Suche bei Amazon nach „mBot Makeblock“, lies vor der Bestellung den Titel des Angebots (mBot oder mBot2) und die Fotos genau und vergleiche die Händler."
---

Du suchst einen **mBot-Roboter** für den ersten Kontakt mit der Robotik? Der **mBot** von **Makeblock** (manchmal „m bot“ geschrieben) ist ein kleiner Roboter, den man zusammenbaut und anschließend programmiert. Er richtet sich an Einsteiger ab etwa **8–10 Jahren**, wobei ein Erwachsener beim Aufbau hilft. Am Ende dieser Seite weißt du, was in der Box steckt, wie du ihn ohne Löten zusammenbaust, welche Modi ohne Code funktionieren und wie du zu **mBlock** wechselst – der Block-Programmiersoftware von Makeblock, die **Scratch** sehr ähnlich ist (der Blocksprache, die in vielen Schulen verwendet wird).

![Zusammengebauter Lernroboter Makeblock mBot, Schrägansicht](/images/products/mbot.webp)

*Produktfoto des klassischen mBot (Makeblock-Bausatz). Prüfe immer das Händlerangebot: Modell und Packungsinhalt können sich ändern.*

> **Auf das Modell achten** — Dieser Artikel behandelt den **klassischen mBot** (Platine **mCore**, **RJ25**-Anschlüsse). Der **mBot2** ist eine andere Generation (Platine **CyberPi**, Bus **mBuild**). Die Kauflinks unten führen zur Suche nach dem **klassischen mBot**. Den Vergleich findest du hier: [mBot vs mBot2](/de/mbot-vs-mbot2/).

Den aktuellen Preis siehst du auf der [Makeblock-mBot-Seite bei Amazon.de](https://www.amazon.de/dp/B07XR98YYQ?tag=roboteducat00-21) (Affiliate-Link). Preise ändern sich – prüfe das Angebot vor dem Kauf.

Zur Einordnung: der [mBot bei Wikipedia](https://de.wikipedia.org/wiki/MBot) und die offizielle Hilfe auf [Makeblock Support](https://support.makeblock.com/).

**Inhalt dieser Seite**

- [Für wen ist der mBot geeignet?](#für-wen-ist-der-mbot-geeignet)
- [Typischer Inhalt der Box](#1-typischer-inhalt-der-box)
- [Aufbau mit einem Erwachsenen](#2-aufbau-mit-einem-erwachsenen-ohne-stress)
- [Programmieren mit mBlock](#4-programmieren-mit-mblock-nicht-die-scratch-app)

## Für wen ist der mBot geeignet?

Der mBot passt, wenn du Folgendes möchtest:

- einen **Bausatz zum Zusammenbauen** (Schrauben, Chassis, Motoren) statt eines fertigen Roboters;
- einen Einstieg in die **Programmierung mit Blöcken** im Geist von Scratch;
- **sofort nutzbare Modi** (Hindernissen ausweichen, einer Linie folgen), bevor du ein einziges Programm schreibst;
- einen **erweiterbaren** Roboter: Später lassen sich [Makeblock-Zubehör](/de/mbot-zubehoer-einstieg/) (Sensoren, Arm, Ketten) an die Anschlüsse des Bausatzes stecken.

Nicht die beste Wahl ist er, wenn du einen **bildschirmfreien** Roboter für ein sehr junges Kind (3–6 Jahre) suchst. Schau dann lieber auf Lösungen wie den [Tale-Bot Pro von Matatalab](/de/matatalab-tale-bot-lernroboter/).

## 1. Typischer Inhalt der Box

Je nach Paket und Jahr enthält die Box des klassischen mBot im Allgemeinen:

| Teil | Einfache Erklärung |
|--------|-------------|
| **Chassis** und mechanische Teile | Das Gerüst des Roboters (Räder, Halterungen). |
| **Platine mCore** | Das elektronische „Gehirn“ des Roboters. |
| **Zwei Motoren** | Drehen die Räder. |
| **Ultraschallsensor** | Misst den Abstand vor dem Roboter (um Hindernissen auszuweichen). |
| **Liniensensor** | Liest eine schwarze Linie auf dem Boden. |
| **Infrarot-Fernbedienung** | Steuert den Roboter aus der Distanz (benötigt Knopfzellen). |
| **Schrauben, Schraubendreher, Anleitung** | Aufbau ohne Löten. |

Die gedruckte Anleitung bleibt die Referenz für **deine** genaue Revision: Folge ihr Schritt für Schritt. Löten ist nicht nötig.

## 2. Aufbau: mit einem Erwachsenen, ohne Stress

Für den Aufbau braucht man **kleines Werkzeug** (meist mitgeliefert) und **Geduld**. Ein 10-jähriges Kind kann das schaffen, aber **mit einem Erwachsenen**: zum Festhalten der Teile, zum Prüfen der Motorrichtung und damit keine Schraube mit Gewalt angezogen wird.

### Warum ein Erwachsener hilft

- **Sicherheit**: kleine Teile, Werkzeug, Batterien – Aufsicht wird empfohlen.
- **Lernen**: Einen Plan lesen, Schrauben zählen, die Polung prüfen (in welche Richtung eine Batterie oder ein Kabel gehört) – das ist bereits Robotik.
- **Weniger Fehler**: Vertauschte Motoren oder schlecht eingerastete Kabel lassen den Roboter rückwärts fahren; ein zweiter Blick erspart Frust.

Plane einen freien Tisch, eine Schale für die Schrauben und **30 bis 60 Minuten** ein, je nach Erfahrung. Ist ein Schritt der Anleitung unklar, halte an und vergleiche das Foto der Anleitung mit deinem Aufbau, statt etwas zu erzwingen.

### Stromversorgung (Verbrauchsmaterial)

Damit der Roboter fährt, brauchst du:

- **wiederaufladbare Batterien** passend zum Fach des Bausatzes (oft Größe AA – **prüfe die Anleitung**) **oder**
- einen zu Makeblock kompatiblen **LiPo-Akku** (Lithium-Polymer, dieselbe Technik wie in vielen Smartphones) mit passendem Stecker, oft vom Typ **JST** (ein kleiner weißer Stecker mit zwei Drähten), **nur**, wenn dein Modell und die Anleitung das vorsehen;
- **CR2032**-Zellen (Knopfzellen) für die Infrarot-Fernbedienung.

Ohne verlässliche Energie tut selbst das beste Programm nichts: Batterien sind das erste nützliche „Zubehör“.

## 3. Erste Nutzung: vorinstallierte Modi

Ist der mBot montiert und mit Strom versorgt, kann er sich schon **ohne Computer bewegen**, dank **bereits gespeicherter Programme** auf der Platine (je nach Modell und dem Modus, den du am Roboter oder an der Fernbedienung wählst):

- **Hindernissen ausweichen** (der Ultraschallsensor erkennt, was vor ihm liegt);
- **einer schwarzen Linie folgen** auf dem Boden (Sensor unter dem Chassis);
- **manuelle Steuerung** mit der Fernbedienung.

Das ist ideal, um zu prüfen, ob der Aufbau stimmt – **bevor** du Software installierst. Reagiert der Roboter nicht: Batterien, Schalter, Motorkabel, dann die Anleitung prüfen.

## 4. Programmieren mit mBlock (nicht „die Scratch-App“)

Um eigene Verhaltensweisen zu erstellen, nutzt du **mBlock** (meist **mBlock 5**): die Software von Makeblock, **von Scratch inspiriert** (dieselbe Idee bunter Blöcke, die man zusammensteckt). Es ist **nicht** einfach die Website scratch.mit.edu: mBlock ergänzt die **Roboterblöcke** (Motoren, Sensoren, LEDs …).

Empfohlener Weg auf dieser Seite:

1. [mBlock 5 unter Windows installieren](/de/mblock-5-installieren-windows/) (oder die zu deinem Computer passende Version).
2. [Die Oberfläche von mBlock 5 verstehen](/de/erste-schritte-mblock-5/) (Bühne, Paletten, Verbindung).
3. [Die mBot-Blöcke installieren](/de/mbot-bloecke-installieren/), falls die Roboter-Palette nicht erscheint.
4. [Mein erstes mBot-Programm](/de/erstes-mbot-programm/) für ein kurzes, sofort testbares Skript.

In der Klasse oder zu Hause ist die **USB**-Verbindung oft der einfachste Start; **Bluetooth** (eine Funkverbindung) kommt danach – siehe [Bluetooth-Probleme in mBlock](/de/mblock-bluetooth-probleme/).

## 5. Stärken und Grenzen (praktische Einschätzung)

**Stärken**

- Lehrreicher Aufbau (Mechanik plus leichte Elektronik).
- Vorinstallierte Modi für schnelle Erfolgserlebnisse.
- Natürlicher Übergang zu Scratch / mBlock und später zu anderen Makeblock-Robotern.
- Ein Zubehör-Ökosystem, sobald die Grundlagen sitzen.

**Grenzen**

- Zum echten Programmieren brauchst du einen **Computer** (oder ein kompatibles Tablet).
- Der **mBot2** ist neuer (Display, stärkerer Fokus auf Python): Wenn du schwankst, lies den [Vergleich mBot / mBot2](/de/mbot-vs-mbot2/).
- Das **RJ25**-Zubehör des klassischen mBot passt nicht unverändert an den **mBuild**-Bus des mBot2.

Das ist kein Labortest mit Messwerten: Die Einschätzung stützt sich auf die Makeblock-Dokumentation, den üblichen Schuleinsatz des Bausatzes und die Stimmigkeit mit den anderen mBot-Anleitungen dieser Seite. Die Preise der Händler ändern sich; prüfe das Angebot am Kauftag.

## Häufige Fragen

### Wie funktioniert der Roboter mBot?

Der **mBot** ist eine kleine fahrbare Plattform: Die Platine **mCore** führt ein Programm aus (ein vorinstallierter Modus oder ein aus mBlock gesendetes Skript), steuert die **Motoren**, die **LEDs** und den **Summer** (einen kleinen Lautsprecher) und liest die **Sensoren** (Ultraschall für den Abstand, Liniensensor unter dem Chassis). Du kannst im **Live-Modus** testen (Roboter am Computer angeschlossen) oder das Programm auf die Platine **hochladen**, damit es ohne Kabel läuft.

### Lernroboter, pädagogischer Roboter: Ist der mBot einer?

Ja. Ein **Lernroboter** (oder pädagogischer Roboter) dient dazu, Programmieren und Robotik **zu lernen**, indem man einen echten Gegenstand in die Hand nimmt. Der mBot ist dafür in Familien und Schulen sehr verbreitet.

### Was ist der Unterschied zwischen mBot und mBot2?

Der klassische **mBot** nutzt vor allem die Platine **mCore** und **RJ25**-Anschlüsse. Der **mBot2** basiert auf der **CyberPi** und dem **mBuild**-Bus und führt natürlicher zu **Python**. Mehr dazu: [mBot vs mBot2](/de/mbot-vs-mbot2/).

### Mein „mBot-Programm“ tut nicht, was ich will: Wo fange ich an?

Prüfe das **richtige Gerät** in mBlock und die **Verbindung** (USB zum Testen), dann **lade nach jeder Änderung erneut hoch**. Bei Funkproblemen: [Bluetooth-Fehlersuche](/de/mblock-bluetooth-probleme/).

### Wo kaufe ich den klassischen mBot (nicht den mBot2)?

Der Produktlink für den **klassischen mBot** ist dieser: [mBot Makeblock auf Amazon.de](https://www.amazon.de/dp/B07XR98YYQ?tag=roboteducat00-21). Lies vor der Bestellung den **Titel des Angebots** (mBot / mBot2) und die Fotos und vergleiche die Händler.

## Weiterführend

- [mBot-Zubehör: womit anfangen?](/de/mbot-zubehoer-einstieg/)
- [mBot-Projektideen für eine Unterrichtsstunde](/de/mbot-ein-stunden-projekte/)
- [Lernroboter für 10-Jährige: welchen kaufen?](/de/lernroboter-10-jahre/)

*Amazon-Partner — bei qualifizierten Käufen kann eine Provision anfallen, ohne Mehrkosten für dich.*
