---
layout: ../../layouts/DePost.astro
title: "Raspberry Pi 3 vs 4 vs 5: welchen 2026 kaufen?"
description: "Raspberry Pi 3 Model B, Pi 4 Model B und Pi 5 im Vergleich: CPU, RAM, USB, Ethernet, PCIe und Stromversorgung. Datentabelle und eine klare Empfehlung für jeden Einsatz."
updated: "22. Oktober 2026"
---

Zwischen **[Raspberry Pi](/de/marke-raspberry-pi/) 3 Model B**, **Pi 4 Model B** und **Pi 5** liegt nicht nur ein Preisunterschied: **USB 3**, **echtes Gigabit-Ethernet**, **zwei Bildschirmausgänge**, dann **PCIe** und bis zu **16 GB RAM** beim Pi 5 verändern, was ein Projekt leisten kann. Die Daten stammen von den offiziellen Produktseiten von Raspberry Pi ([Pi 3 B](https://www.raspberrypi.com/products/raspberry-pi-3-model-b/), [Pi 4 B](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/), [Pi 5](https://www.raspberrypi.com/products/raspberry-pi-5/)).

## 1. Datentabelle

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col"> </th>
<th scope="col"><strong>Pi 3 Model B</strong></th>
<th scope="col"><strong>Pi 4 Model B</strong></th>
<th scope="col"><strong>Raspberry Pi 5</strong></th>
</tr></thead><tbody>
<tr>
<td><span class="td-val">SoC</span></td>
<td data-label="**Pi 3 Model B**"><span class="td-val">Broadcom BCM2837</span></td>
<td data-label="**Pi 4 Model B**"><span class="td-val">Broadcom BCM2711</span></td>
<td data-label="**Raspberry Pi 5**"><span class="td-val">Broadcom BCM2712</span></td>
</tr>
<tr>
<td><span class="td-val">CPU</span></td>
<td data-label="**Pi 3 Model B**"><span class="td-val">4 × Cortex-A53, 1,2 GHz</span></td>
<td data-label="**Pi 4 Model B**"><span class="td-val">4 × Cortex-A72, 1,8 GHz</span></td>
<td data-label="**Raspberry Pi 5**"><span class="td-val">4 × Cortex-A76, 2,4 GHz</span></td>
</tr>
<tr>
<td><span class="td-val">GPU / Video</span></td>
<td data-label="**Pi 3 Model B**"><span class="td-val">VideoCore IV, 1 × HDMI (Standardgröße)</span></td>
<td data-label="**Pi 4 Model B**"><span class="td-val">VideoCore VI, 2 × Micro-HDMI (4K)</span></td>
<td data-label="**Raspberry Pi 5**"><span class="td-val">VideoCore VII, 2 × Micro-HDMI (4Kp60)</span></td>
</tr>
<tr>
<td><span class="td-val">RAM</span></td>
<td data-label="**Pi 3 Model B**"><span class="td-val">1 GB LPDDR2</span></td>
<td data-label="**Pi 4 Model B**"><span class="td-val">1 / 2 / 4 / 8 GB LPDDR4-3200</span></td>
<td data-label="**Raspberry Pi 5**"><span class="td-val">1 / 2 / 4 / 8 / 16 GB LPDDR4X-4267</span></td>
</tr>
<tr>
<td><span class="td-val">Ethernet</span></td>
<td data-label="**Pi 3 Model B**"><span class="td-val">100 Mbit/s</span></td>
<td data-label="**Pi 4 Model B**"><span class="td-val">Gigabit</span></td>
<td data-label="**Raspberry Pi 5**"><span class="td-val">Gigabit</span></td>
</tr>
<tr>
<td><span class="td-val">WLAN / Bluetooth</span></td>
<td data-label="**Pi 3 Model B**"><span class="td-val">802.11n, BT 4.1</span></td>
<td data-label="**Pi 4 Model B**"><span class="td-val">802.11ac, BT 5.0</span></td>
<td data-label="**Raspberry Pi 5**"><span class="td-val">802.11ac, BT 5.0</span></td>
</tr>
<tr>
<td><span class="td-val">USB</span></td>
<td data-label="**Pi 3 Model B**"><span class="td-val">4 × USB 2.0</span></td>
<td data-label="**Pi 4 Model B**"><span class="td-val">2 × USB 3.0 + 2 × USB 2.0</span></td>
<td data-label="**Raspberry Pi 5**"><span class="td-val">2 × USB 3.0 + 2 × USB 2.0</span></td>
</tr>
<tr>
<td><span class="td-val">PCIe</span></td>
<td data-label="**Pi 3 Model B**"><span class="td-val">nein</span></td>
<td data-label="**Pi 4 Model B**"><span class="td-val">nein</span></td>
<td data-label="**Raspberry Pi 5**"><span class="td-val">PCIe 2.0 ×1</span></td>
</tr>
<tr>
<td><span class="td-val">Stromversorgung</span></td>
<td data-label="**Pi 3 Model B**"><span class="td-val">Micro-USB 5 V, 2,5 A</span></td>
<td data-label="**Pi 4 Model B**"><span class="td-val">USB-C 5 V, 3 A</span></td>
<td data-label="**Raspberry Pi 5**"><span class="td-val">USB-C 5 V, 5 A empfohlen</span></td>
</tr>
<tr>
<td><span class="td-val">GPIO</span></td>
<td data-label="**Pi 3 Model B**"><span class="td-val">40 Pins</span></td>
<td data-label="**Pi 4 Model B**"><span class="td-val">40 Pins</span></td>
<td data-label="**Raspberry Pi 5**"><span class="td-val">40 Pins</span></td>
</tr>
</tbody>
</table>
</div>

## 2. Was sich im Alltag ändert

- **Pi 3**: gebraucht leicht zu finden und sehr gut dokumentiert, aber **1 GB RAM** und **kein USB 3** bremsen Surfen, Kompilieren und Datenübertragung.
- **Pi 4**: **USB 3 + echtes Gigabit** machen ihn ab 4 GB zu einem ordentlichen kleinen NAS, Server oder Linux-Desktop.
- **Pi 5**: neuere CPU, bis zu **16 GB**, **PCIe** für schnellen Speicher, aber anspruchsvoller bei **Kühlung** und **Stromversorgung**.

## 3. Preise

Die Preise für Raspberry Pi schwanken oft (Lagerbestand, Händlermargen, Mehrwertsteuer). Vergleichen Sie den **aktuellen Preis** bei einem [zugelassenen Händler](https://www.raspberrypi.com/resellers/). Prüfen Sie immer die Revision der Platine und den Lieferumfang (Netzteil, Kühler).

## 4. Welcher Raspberry Pi für welchen Zweck?

**Beim Pi 3 bleiben**, wenn Sie vorhandene Hardware weiterverwenden oder ein sehr leichtes Projekt betreiben (GPIO, ein Sensor, ein kleines Skript).

**Zum Pi 4 greifen** für ein bescheidenes Selbstbau-NAS, einen Server mit Durchsatzbedarf, USB-3-Laufwerke oder einen günstigen Linux-Desktop für den Alltag.

**Den Pi 5 wählen**, wenn Sie CPU-Reserven, 8 GB oder mehr oder den PCIe-Bus brauchen. Planen Sie aktive Kühlung und das 27-W-Netzteil ein. Unsicher bei der Speichergröße? Lesen Sie [Raspberry Pi 5: welcher RAM?](/de/raspberry-pi-5-welcher-ram/).

**Für Home Assistant** funktioniert ein Pi 5 mit 4 GB plus Zigbee-Stick gut; die fertige Alternative ist Home Assistant Green (siehe [Vergleich](/de/smart-home/home-assistant-green-vs-raspberry-pi-5/)).

**Für Jugendliche zwischen nackter Platine und Roboter** verbindet ein Pi-basierter Bausatz wie der [SunFounder PiCar-X](https://www.sunfounder.com/products/picar-x?ref=tpytgtyp) (Affiliate-Link, Pi nicht enthalten) beides.

## 5. Wo kaufen in Deutschland, Österreich und der Schweiz?

Raspberry Pi führt seine zugelassenen Händler Land für Land auf der [offiziellen Händlerseite](https://www.raspberrypi.com/resellers/). Achten Sie beim offiziellen Netzteil auf die Version mit **EU-Stecker**.

**Kurz gesagt:** Pi 3 = die historische Referenz, heute knapp bemessen; Pi 4 = der beste Kompromiss für Netzwerk und USB; Pi 5 = höchste Leistung und meiste RAM, auf Kosten von Wärme und Preis.
