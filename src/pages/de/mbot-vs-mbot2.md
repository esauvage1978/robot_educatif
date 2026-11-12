---
layout: ../../layouts/DePost.astro
title: "mBot vs mBot2: Unterschiede und welcher passt"
description: "Makeblock mBot und mBot2 im Vergleich: mCore- oder CyberPi-Platine, Sensoren, Encodermotoren, WLAN, Python, Akku und Zubehör. Mit Empfehlung nach Alter und Projekt."
updated: "23. Oktober 2026"
---

**mBot** und **mBot2** sind zwei Generationen des Schulroboters von [Makeblock](/de/marke-makeblock/). Beide werden mit **mBlock** (Blöcke im Scratch-Stil) programmiert, doch der mBot2 basiert auf der leistungsstärkeren **CyberPi**-Platine mit WLAN und einem natürlichen Weg zu Python. Die Daten stammen aus Makeblocks [mBot2-Vorstellung](https://www.lemona.lt/Files/Instrukcijos/TI/En/Pdf/mBot2%20introduction.pdf) (Tabelle mBot 1.1 vs mBot2). Prüfen Sie vor dem Kauf immer die offizielle Produktseite: Bausatz-Revisionen unterscheiden sich (Bluetooth-Modul enthalten oder nicht, Lieferumfang).

## 1. Vergleichstabelle

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col"> </th>
<th scope="col"><strong>mBot (klassisch)</strong></th>
<th scope="col"><strong>mBot2</strong></th>
</tr></thead><tbody>
<tr>
<td><span class="td-val">Platine</span></td>
<td data-label="**mBot (klassisch)**"><span class="td-val"><strong>mCore</strong> (Arduino-kompatibel)</span></td>
<td data-label="**mBot2**"><span class="td-val"><strong>CyberPi</strong> (leistungsstärker, WLAN)</span></td>
</tr>
<tr>
<td><span class="td-val">Programmierung</span></td>
<td data-label="**mBot (klassisch)**"><span class="td-val">mBlock-Blöcke; Arduino C für Fortgeschrittene</span></td>
<td data-label="**mBot2**"><span class="td-val">mBlock-Blöcke + <strong>Python</strong> integriert</span></td>
</tr>
<tr>
<td><span class="td-val">Motoren</span></td>
<td data-label="**mBot (klassisch)**"><span class="td-val">zwei Gleichstrommotoren</span></td>
<td data-label="**mBot2**"><span class="td-val"><strong>Encodermotoren</strong> (präzise Bewegungen)</span></td>
</tr>
<tr>
<td><span class="td-val">Typische Sensoren</span></td>
<td data-label="**mBot (klassisch)**"><span class="td-val">Linienfolger, Ultraschall, IR (je nach Bausatz)</span></td>
<td data-label="**mBot2**"><span class="td-val">Ultraschall, Linien-/Farbsensor, Licht, <strong>Gyroskop</strong></span></td>
</tr>
<tr>
<td><span class="td-val">Anzeige / Ton</span></td>
<td data-label="**mBot (klassisch)**"><span class="td-val">RGB-LEDs, Summer</span></td>
<td data-label="**mBot2**"><span class="td-val"><strong>1,44-Zoll-Farbdisplay</strong> (128 × 128) auf der CyberPi, Lautsprecher, Mikrofon</span></td>
</tr>
<tr>
<td><span class="td-val">Verbindung</span></td>
<td data-label="**mBot (klassisch)**"><span class="td-val">Bluetooth oder 2,4G je nach Paket</span></td>
<td data-label="**mBot2**"><span class="td-val"><strong>Bluetooth und WLAN</strong></span></td>
</tr>
<tr>
<td><span class="td-val">Chassis</span></td>
<td data-label="**mBot (klassisch)**"><span class="td-val">Aluminiumlegierung</span></td>
<td data-label="**mBot2**"><span class="td-val">Aluminiumlegierung</span></td>
</tr>
<tr>
<td><span class="td-val">Stromversorgung</span></td>
<td data-label="**mBot (klassisch)**"><span class="td-val">Batteriefach (AA-Zellen, je nach Bausatz)</span></td>
<td data-label="**mBot2**"><span class="td-val">eingebauter <strong>2.500-mAh</strong>-Akku, USB-C</span></td>
</tr>
<tr>
<td><span class="td-val">Ideal für</span></td>
<td data-label="**mBot (klassisch)**"><span class="td-val">erster Roboter, AGs, kleines Budget</span></td>
<td data-label="**mBot2**"><span class="td-val">ab 10 Jahren, längere Projekte, Umstieg auf Python</span></td>
</tr>
</tbody>
</table>
</div>

**Unsere Wahl:** der **mBot** als erster Roboter mit kleinem Budget; der **mBot2**, wenn er mehrere Jahre genutzt werden und den Weg von Blöcken zu Python ohne Neukauf ermöglichen soll.

## 2. Gemeinsamkeiten

- **Dieselbe Software**: mBlock, nah an Scratch, mit vielen Anleitungen. Installation: [mBlock 5 unter Windows installieren](/de/mblock-5-installieren-windows/).
- **Dieselbe Lernidee**: Chassis bauen, Sensoren anschließen, dann Parcours und Hindernisse meistern.
- **Dasselbe Marken-Ökosystem**, aber Zubehör ist zwischen den Generationen **nicht immer kompatibel**.

## 3. Zubehör und Erweiterung

**mBot (klassisch)** nutzt **RJ25**-Anschlüsse und das ältere Zubehör von Makeblock: zusätzliche Sensoren, Greifarme, Ketten, Ersatzteile. Häufigster Fehler: Zubehör kaufen, ohne die Revision des eigenen mBot zu prüfen.

**mBot2** setzt auf **mBuild**-Module für die CyberPi. Halten Sie sich an Makeblocks offizielle Kompatibilitätsliste und investieren Sie erst in Extras, wenn die Grundlagen sitzen.

## 4. Welcher passt?

- **mBot**: solider erster Roboter, riesige Auswahl an Aktivitäten, kleineres Budget, Workshops zu Linie, Hindernis und LEDs.
- **mBot2**: mehrjährige Nutzung, Ton- und Lichtprojekte, präzise Bewegungen, später ernsthaft Python.

Sie vergleichen noch Marken? Siehe unseren [Kaufberater für programmierbare Roboter](/de/bester-programmierbarer-roboter-fuer-kinder/) und [mBot vs Codey Rocky](/de/mbot-vs-codey-rocky/). Alle Vergleiche finden Sie unter [Vergleiche](/de/vergleiche/).

Am 9. November 2026 zeigte Amazon.de **89,99 €** für den [mBot](https://www.amazon.de/dp/B07XR98YYQ?tag=roboteducat00-21) und **158,90 €** für den [mBot2](https://www.amazon.de/dp/B0919F9CKS?tag=roboteducat00-21). Die Beträge ändern sich: den Preis am Kauftag prüfen.
