---
layout: ../../../layouts/DePost.astro
title: "Home Assistant Green vs Raspberry Pi 5: was wählen (2026)?"
description: "Home Assistant Green oder Raspberry Pi 5 als Smart-Home-Zentrale? Offizielle Daten im Vergleich, Lieferumfang, was Sie ergänzen müssen und für wen sich welches Gerät eignet."
updated: "22. Oktober 2026"
---

Beide laufen mit **Home Assistant OS** und beide sind eine ausgezeichnete lokale Smart-Home-Zentrale. Der Unterschied: **Einrichtungsaufwand gegen Flexibilität**. Die Daten stammen von den offiziellen Seiten: [Home Assistant Green](https://www.home-assistant.io/green/) und [Raspberry Pi 5](https://www.raspberrypi.com/products/raspberry-pi-5/) (geprüft am 21. Oktober 2026). Wir haben keine eigenen Benchmarks durchgeführt. Den aktuellen Preis liest man auf diesen Seiten oder im Laden, für das genaue Modell.

## 1. Daten im Vergleich

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col"> </th>
<th scope="col">Home Assistant Green</th>
<th scope="col"><a href="/de/marke-raspberry-pi/">Raspberry Pi</a> 5 (4 GB oder 8 GB)</th>
</tr></thead><tbody>
<tr>
<td><span class="td-val">Lieferumfang</span></td>
<td data-label="Home Assistant Green"><span class="td-val">fertiges Gerät: Gehäuse, Speicher, Netzteil</span></td>
<td data-label="[Raspberry Pi](/de/marke-raspberry-pi/) 5 (4 GB oder 8 GB)"><span class="td-val">nur die Platine</span></td>
</tr>
<tr>
<td><span class="td-val">Prozessor</span></td>
<td data-label="Home Assistant Green"><span class="td-val">Quad-Core Cortex-A55, 1,8 GHz</span></td>
<td data-label="[Raspberry Pi](/de/marke-raspberry-pi/) 5 (4 GB oder 8 GB)"><span class="td-val">Quad-Core Cortex-A76, 2,4 GHz</span></td>
</tr>
<tr>
<td><span class="td-val">RAM</span></td>
<td data-label="Home Assistant Green"><span class="td-val">4 GB LPDDR4X</span></td>
<td data-label="[Raspberry Pi](/de/marke-raspberry-pi/) 5 (4 GB oder 8 GB)"><span class="td-val">4 oder 8 GB LPDDR4X (auch 1, 2 und 16 GB)</span></td>
</tr>
<tr>
<td><span class="td-val">Speicher</span></td>
<td data-label="Home Assistant Green"><span class="td-val">32 GB eMMC, eingebaut</span></td>
<td data-label="[Raspberry Pi](/de/marke-raspberry-pi/) 5 (4 GB oder 8 GB)"><span class="td-val">microSD oder NVMe-SSD über PCIe-Erweiterung</span></td>
</tr>
<tr>
<td><span class="td-val">USB</span></td>
<td data-label="Home Assistant Green"><span class="td-val">2 × USB 2.0</span></td>
<td data-label="[Raspberry Pi](/de/marke-raspberry-pi/) 5 (4 GB oder 8 GB)"><span class="td-val">2 × USB 3.0 + 2 × USB 2.0</span></td>
</tr>
<tr>
<td><span class="td-val">Ethernet</span></td>
<td data-label="Home Assistant Green"><span class="td-val">Gigabit</span></td>
<td data-label="[Raspberry Pi](/de/marke-raspberry-pi/) 5 (4 GB oder 8 GB)"><span class="td-val">Gigabit</span></td>
</tr>
<tr>
<td><span class="td-val">WLAN</span></td>
<td data-label="Home Assistant Green"><span class="td-val">keines (nur Ethernet)</span></td>
<td data-label="[Raspberry Pi](/de/marke-raspberry-pi/) 5 (4 GB oder 8 GB)"><span class="td-val">eingebaut (für eine Zentrale trotzdem Ethernet empfohlen)</span></td>
</tr>
<tr>
<td><span class="td-val">Netzteil</span></td>
<td data-label="Home Assistant Green"><span class="td-val">Universalnetzteil beiliegend</span></td>
<td data-label="[Raspberry Pi](/de/marke-raspberry-pi/) 5 (4 GB oder 8 GB)"><span class="td-val">offizielles 27-W-USB-C-Netzteil dazukaufen (auch mit EU-Stecker)</span></td>
</tr>
<tr>
<td><span class="td-val">Kühlung</span></td>
<td data-label="Home Assistant Green"><span class="td-val">lüfterlos</span></td>
<td data-label="[Raspberry Pi](/de/marke-raspberry-pi/) 5 (4 GB oder 8 GB)"><span class="td-val">Active Cooler empfohlen</span></td>
</tr>
<tr>
<td><span class="td-val">Einrichtung</span></td>
<td data-label="Home Assistant Green"><span class="td-val">Ethernet und Strom anschließen, homeassistant.local:8123 öffnen</span></td>
<td data-label="[Raspberry Pi](/de/marke-raspberry-pi/) 5 (4 GB oder 8 GB)"><span class="td-val">Home Assistant OS mit dem Raspberry Pi Imager aufspielen, dann starten</span></td>
</tr>
<tr>
<td><span class="td-val">Preis</span></td>
<td data-label="Home Assistant Green"><span class="td-val">Preis prüfen</span></td>
<td data-label="[Raspberry Pi](/de/marke-raspberry-pi/) 5 (4 GB oder 8 GB)"><span class="td-val">Preis prüfen (nur Platine: Netzteil, Gehäuse, Speicher ergänzen)</span></td>
</tr>
</tbody>
</table>
</div>

## 2. Für wen eignet sich der Green?

- Sie möchten eine **leise Box, die einfach funktioniert**, mit offiziellem Support von Nabu Casa.
- Sie planen keine aufwendigen Erweiterungen wie Videoanalyse für mehrere Kameras.
- Sie möchten Netzteil, Gehäuse, Kühler und Speicher nicht einzeln kaufen und zusammenbauen.

## 3. Für wen eignet sich ein Raspberry Pi 5?

- Sie besitzen bereits einen Pi 5 oder basteln gern.
- Sie wollen **mehr CPU und RAM** (8 GB) für Erweiterungen oder eine **NVMe-SSD** für langfristige Zuverlässigkeit.
- Sie möchten die 40-polige GPIO-Leiste für eigene Sensoren nutzen.

Unsicher bei der Speichergröße? Lesen Sie [Raspberry Pi 5: welcher RAM?](/de/raspberry-pi-5-welcher-ram/).

## 4. Hinweise für Deutschland, Österreich und die Schweiz

- **Strom**: Das Netzteil des Green ist universell (100–240 V); für den Pi 5 das **offizielle Netzteil mit EU-Stecker** kaufen statt eines Handy-Ladegeräts.
- **Verfügbarkeit**: Beide werden über offizielle Händler im deutschsprachigen Raum verkauft. Der Lagerbestand schwankt, daher Verfügbarkeit auf den oben verlinkten offiziellen Seiten prüfen.

## 5. In jedem Fall: einen Zigbee-Koordinator ergänzen

Keines der beiden Geräte hat Zigbee eingebaut. Stecken Sie einen USB-Koordinator an ein kurzes Verlängerungskabel, um Störungen zu verringern: siehe [der beste Zigbee-Stick für Home Assistant](/de/smart-home/bester-zigbee-stick-home-assistant/).

**Fazit:** Green für null Aufwand; Pi 5 für Leistung und Flexibilität.

[Alle Smart-Home-Ratgeber](/de/smart-home/)
