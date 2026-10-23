---
layout: ../../../layouts/DePost.astro
title: "Smart Home für Einsteiger (DE, AT, CH): wo anfangen 2026?"
description: "Ein praktischer erster Smart-Home-Plan für Wohnungen und Häuser im deutschsprachigen Raum: WLAN, Zigbee, Thread und Matter erklärt, was zuerst kaufen und welche Elektro-Regeln gelten."
updated: "22. Oktober 2026"
---

Ein Smart Home muss nicht mit einer großen Zentrale und einem Wochenende voller Verkabelung beginnen. Dieser Ratgeber zeigt einen Weg Schritt für Schritt, der in einer **Mietwohnung** genauso funktioniert wie im **Eigenheim**, und nennt die Punkte, auf die es im deutschsprachigen Raum ankommt: **Stecker, Kennzeichnung und wer was verdrahten darf**.

## 1. Drei Fragen vor dem ersten Kauf

1. **Was wollen Sie zuerst automatisieren?** Licht, Heizung, eine Meldung, wenn die Waschmaschine fertig ist, oder Energiemessung? Beginnen Sie mit einem echten Bedarf.
2. **Wollen Sie basteln?** WLAN-Geräte funktionieren sofort mit einer App; Zigbee und Home Assistant bieten lokale Steuerung, brauchen aber etwas Einrichtung.
3. **Mieten oder besitzen Sie?** Mieter sollten bei **Steckergeräten** und batteriebetriebenen Sensoren bleiben, die keine Spuren hinterlassen.

## 2. Funkstandards einfach erklärt

| Standard | Stärken | Grenzen | Gut für |
|---|---|---|---|
| **WLAN (2,4 GHz)** | keine Zentrale, einfache App | höherer Stromverbrauch, oft abhängig von der Cloud des Herstellers | die erste smarte Steckdose oder Lampe |
| **Zigbee 3.0** | sparsam, Mesh-Netz, funktioniert lokal | braucht einen USB-Koordinator oder eine Zentrale | Sensoren, Steckdosen, Heizkörperthermostate |
| **Thread** | Mesh, sparsam, IP-basiert | bisher weniger Geräte | zukunftssichere Batteriegeräte |
| **Matter** | ein Standard für Apple Home, Google Home, Alexa und SmartThings | noch in Entwicklung; läuft über WLAN oder Thread | Geräte kaufen, ohne sich zu binden |

## 3. Elektrische Grundlagen in Deutschland, Österreich und der Schweiz

| | Deutschland / Österreich | Schweiz |
|---|---|---|
| Stecker / Steckdose | Typ F (Schuko) | Typ J (T13); flache Euro-Stecker (Typ C) passen ebenfalls |
| Netzspannung | 230 V, 50 Hz | 230 V, 50 Hz |
| Kennzeichnung | CE (EU-Konformität) | CE wird in der Regel anerkannt; Schweizer Steckertyp beachten |
| Fest verdrahtete Schalter und Relais | Arbeiten an der festen Installation gehören in die Hände einer Elektrofachkraft | Installationsarbeiten nur durch berechtigte Fachpersonen |

**Praktische Regel:** Kaufen Sie Steckergeräte immer in der **Version für Ihr Land**. Ein Reiseadapter ist keine sichere Dauerlösung, besonders nicht für große Lasten wie Heizlüfter.

## 4. Ein Weg Schritt für Schritt

**Schritt 1: mit WLAN und ohne Zentrale beginnen.** Eine oder zwei smarte Steckdosen mit Energiemessung reichen, um eine Lampe zu planen und zu sehen, was Ihre Geräte wirklich verbrauchen. Shelly bietet Steckdosen in Länderversionen an: siehe das [Shelly-Steckdosensortiment](https://www.shelly.com/collections/smart-plugs) und die EU-Version (Schuko) wählen.

**Schritt 2: eine Zentrale ergänzen.** Für lokale Steuerung installieren Sie [Home Assistant](https://www.home-assistant.io/) auf einem fertigen **Home Assistant Green** oder auf einem **Raspberry Pi 5**: Vergleich in [Home Assistant Green vs Raspberry Pi 5](/de/smart-home/home-assistant-green-vs-raspberry-pi-5/).

**Schritt 3: einen Zigbee-Koordinator und erste Sensoren hinzufügen.** Temperatur-, Tür- und Bewegungssensoren sind günstig und laufen monatelang mit einer Knopfzelle. Siehe [der beste Zigbee-Stick für Home Assistant](/de/smart-home/bester-zigbee-stick-home-assistant/).

**Schritt 4: dort erweitern, wo es hilft.** Relais hinter Schaltern (Aufgabe für eine Elektrofachkraft), Heizkörperthermostate, ein Saugroboter oder selbst gebaute ESP32-Sensoren.

## 5. Fehler, die Sie vermeiden sollten

- Geräte mit fünf verschiedenen Apps kaufen: Bevorzugen Sie **Matter** oder **Zigbee**, damit alles an einem Ort landet.
- Eine billige Steckdose ohne Kennzeichnung für Heizlüfter oder Wasserkocher nutzen: **Nennlast** und **CE-Kennzeichnung** prüfen.
- Lichtschalter ohne entsprechende Qualifikation selbst umverdrahten.

**Weiter:** [Smarte Steckdosen (Schuko)](/de/smart-home/smarte-steckdosen/).

[Alle Smart-Home-Ratgeber](/de/smart-home/)
