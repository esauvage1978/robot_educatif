---
layout: ../../../layouts/DePost.astro
title: "Home Assistant Green vs Raspberry Pi 5: was wählen (2026)?"
description: "Home Assistant Green oder Raspberry Pi 5 als Smart-Home-Zentrale? Offizielle Daten im Vergleich, Lieferumfang, was Sie ergänzen müssen und für wen sich welches Gerät eignet."
updated: "22. Oktober 2026"
---

Beide laufen mit **Home Assistant OS** und beide sind eine ausgezeichnete lokale Smart-Home-Zentrale. Der Unterschied: **Einrichtungsaufwand gegen Flexibilität**. Die Daten stammen von den offiziellen Seiten: [Home Assistant Green](https://www.home-assistant.io/green/) und [Raspberry Pi 5](https://www.raspberrypi.com/products/raspberry-pi-5/) (geprüft am 21. Oktober 2026). Wir haben keine eigenen Benchmarks durchgeführt. Preise vergleichen: [Home Assistant Green bei Amazon.de](https://www.amazon.de/s?k=Home+Assistant+Green&tag=roboteducat00-21) und [Raspberry Pi 5 bei Amazon.de](https://www.amazon.de/s?k=Raspberry+Pi+5&tag=roboteducat00-21) (Werbelinks).

## 1. Daten im Vergleich

| | Home Assistant Green | [Raspberry Pi](/de/marke-raspberry-pi/) 5 (4 GB oder 8 GB) |
|---|---|---|
| Lieferumfang | fertiges Gerät: Gehäuse, Speicher, Netzteil | nur die Platine |
| Prozessor | Quad-Core Cortex-A55, 1,8 GHz | Quad-Core Cortex-A76, 2,4 GHz |
| RAM | 4 GB LPDDR4X | 4 oder 8 GB LPDDR4X (auch 1, 2 und 16 GB) |
| Speicher | 32 GB eMMC, eingebaut | microSD oder NVMe-SSD über PCIe-Erweiterung |
| USB | 2 × USB 2.0 | 2 × USB 3.0 + 2 × USB 2.0 |
| Ethernet | Gigabit | Gigabit |
| WLAN | keines (nur Ethernet) | eingebaut (für eine Zentrale trotzdem Ethernet empfohlen) |
| Netzteil | Universalnetzteil beiliegend | offizielles 27-W-USB-C-Netzteil dazukaufen (auch mit EU-Stecker) |
| Kühlung | lüfterlos | Active Cooler empfohlen |
| Einrichtung | Ethernet und Strom anschließen, homeassistant.local:8123 öffnen | Home Assistant OS mit dem Raspberry Pi Imager aufspielen, dann starten |
| Preis | Preis prüfen | Preis prüfen (nur Platine: Netzteil, Gehäuse, Speicher ergänzen) |

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
