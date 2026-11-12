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

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Standard</th>
<th scope="col">Stärken</th>
<th scope="col">Grenzen</th>
<th scope="col">Gut für</th>
</tr></thead><tbody>
<tr>
<td data-label="Standard"><span class="td-val"><strong>WLAN (2,4 GHz)</strong></span></td>
<td data-label="Stärken"><span class="td-val">keine Zentrale, einfache App</span></td>
<td data-label="Grenzen"><span class="td-val">höherer Stromverbrauch, oft abhängig von der Cloud des Herstellers</span></td>
<td data-label="Gut für"><span class="td-val">die erste smarte Steckdose oder Lampe</span></td>
</tr>
<tr>
<td data-label="Standard"><span class="td-val"><strong>Zigbee 3.0</strong></span></td>
<td data-label="Stärken"><span class="td-val">sparsam, Mesh-Netz, funktioniert lokal</span></td>
<td data-label="Grenzen"><span class="td-val">braucht einen USB-Koordinator oder eine Zentrale</span></td>
<td data-label="Gut für"><span class="td-val">Sensoren, Steckdosen, Heizkörperthermostate</span></td>
</tr>
<tr>
<td data-label="Standard"><span class="td-val"><strong>Thread</strong></span></td>
<td data-label="Stärken"><span class="td-val">Mesh, sparsam, IP-basiert</span></td>
<td data-label="Grenzen"><span class="td-val">bisher weniger Geräte</span></td>
<td data-label="Gut für"><span class="td-val">zukunftssichere Batteriegeräte</span></td>
</tr>
<tr>
<td data-label="Standard"><span class="td-val"><strong>Matter</strong></span></td>
<td data-label="Stärken"><span class="td-val">ein Standard für Apple Home, Google Home, Alexa und SmartThings</span></td>
<td data-label="Grenzen"><span class="td-val">noch in Entwicklung; läuft über WLAN oder Thread</span></td>
<td data-label="Gut für"><span class="td-val">Geräte kaufen, ohne sich zu binden</span></td>
</tr>
</tbody>
</table>
</div>

## 3. Elektrische Grundlagen in Deutschland, Österreich und der Schweiz

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col"> </th>
<th scope="col">Deutschland / Österreich</th>
<th scope="col">Schweiz</th>
</tr></thead><tbody>
<tr>
<td><span class="td-val">Stecker / Steckdose</span></td>
<td data-label="Deutschland / Österreich"><span class="td-val">Typ F (Schuko)</span></td>
<td data-label="Schweiz"><span class="td-val">Typ J (T13); flache Euro-Stecker (Typ C) passen ebenfalls</span></td>
</tr>
<tr>
<td><span class="td-val">Netzspannung</span></td>
<td data-label="Deutschland / Österreich"><span class="td-val">230 V, 50 Hz</span></td>
<td data-label="Schweiz"><span class="td-val">230 V, 50 Hz</span></td>
</tr>
<tr>
<td><span class="td-val">Kennzeichnung</span></td>
<td data-label="Deutschland / Österreich"><span class="td-val">CE (EU-Konformität)</span></td>
<td data-label="Schweiz"><span class="td-val">CE wird in der Regel anerkannt; Schweizer Steckertyp beachten</span></td>
</tr>
<tr>
<td><span class="td-val">Fest verdrahtete Schalter und Relais</span></td>
<td data-label="Deutschland / Österreich"><span class="td-val">Arbeiten an der festen Installation gehören in die Hände einer Elektrofachkraft</span></td>
<td data-label="Schweiz"><span class="td-val">Installationsarbeiten nur durch berechtigte Fachpersonen</span></td>
</tr>
</tbody>
</table>
</div>

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
