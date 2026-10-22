---
layout: ../../layouts/DePost.astro
title: "Raspberry Pi 3 vs 4 vs 5: welchen 2026 kaufen?"
description: "Raspberry Pi 3 Model B, Pi 4 Model B und Pi 5 im Vergleich: CPU, RAM, USB, Ethernet, PCIe und Stromversorgung. Datentabelle und eine klare Empfehlung für jeden Einsatz."
updated: "22. Oktober 2026"
---

Zwischen **Raspberry Pi 3 Model B**, **Pi 4 Model B** und **Pi 5** liegt nicht nur ein Preisunterschied: **USB 3**, **echtes Gigabit-Ethernet**, **zwei Bildschirmausgänge**, dann **PCIe** und bis zu **16 GB RAM** beim Pi 5 verändern, was ein Projekt leisten kann. Die Daten stammen von den offiziellen Produktseiten von Raspberry Pi ([Pi 3 B](https://www.raspberrypi.com/products/raspberry-pi-3-model-b/), [Pi 4 B](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/), [Pi 5](https://www.raspberrypi.com/products/raspberry-pi-5/)).

## 1. Datentabelle

| | **Pi 3 Model B** | **Pi 4 Model B** | **Raspberry Pi 5** |
|---|---|---|---|
| SoC | Broadcom BCM2837 | Broadcom BCM2711 | Broadcom BCM2712 |
| CPU | 4 × Cortex-A53, 1,2 GHz | 4 × Cortex-A72, 1,8 GHz | 4 × Cortex-A76, 2,4 GHz |
| GPU / Video | VideoCore IV, 1 × HDMI (Standardgröße) | VideoCore VI, 2 × Micro-HDMI (4K) | VideoCore VII, 2 × Micro-HDMI (4Kp60) |
| RAM | 1 GB LPDDR2 | 1 / 2 / 4 / 8 GB LPDDR4-3200 | 1 / 2 / 4 / 8 / 16 GB LPDDR4X-4267 |
| Ethernet | 100 Mbit/s | Gigabit | Gigabit |
| WLAN / Bluetooth | 802.11n, BT 4.1 | 802.11ac, BT 5.0 | 802.11ac, BT 5.0 |
| USB | 4 × USB 2.0 | 2 × USB 3.0 + 2 × USB 2.0 | 2 × USB 3.0 + 2 × USB 2.0 |
| PCIe | nein | nein | PCIe 2.0 ×1 |
| Stromversorgung | Micro-USB 5 V, 2,5 A | USB-C 5 V, 3 A | USB-C 5 V, 5 A empfohlen |
| GPIO | 40 Pins | 40 Pins | 40 Pins |

## 2. Was sich im Alltag ändert

- **Pi 3**: gebraucht leicht zu finden und sehr gut dokumentiert, aber **1 GB RAM** und **kein USB 3** bremsen Surfen, Kompilieren und Datenübertragung.
- **Pi 4**: **USB 3 + echtes Gigabit** machen ihn ab 4 GB zu einem ordentlichen kleinen NAS, Server oder Linux-Desktop.
- **Pi 5**: neuere CPU, bis zu **16 GB**, **PCIe** für schnellen Speicher, aber anspruchsvoller bei **Kühlung** und **Stromversorgung**.

## 3. Preise

Die Preise für Raspberry Pi schwanken oft (Lagerbestand, Händlermargen, Mehrwertsteuer). Wir nennen keine Zahlen: **Preis prüfen** bei einem [zugelassenen Händler](https://www.raspberrypi.com/resellers/). Prüfen Sie immer die Revision der Platine und den Lieferumfang (Netzteil, Kühler).

## 4. Welcher Raspberry Pi für welchen Zweck?

**Beim Pi 3 bleiben**, wenn Sie vorhandene Hardware weiterverwenden oder ein sehr leichtes Projekt betreiben (GPIO, ein Sensor, ein kleines Skript).

**Zum Pi 4 greifen** für ein bescheidenes Selbstbau-NAS, einen Server mit Durchsatzbedarf, USB-3-Laufwerke oder einen günstigen Linux-Desktop für den Alltag.

**Den Pi 5 wählen**, wenn Sie CPU-Reserven, 8 GB oder mehr oder den PCIe-Bus brauchen. Planen Sie aktive Kühlung und das 27-W-Netzteil ein. Unsicher bei der Speichergröße? Lesen Sie [Raspberry Pi 5: welcher RAM?](/de/raspberry-pi-5-welcher-ram/).

**Für Home Assistant** funktioniert ein Pi 5 mit 4 GB plus Zigbee-Stick gut; die fertige Alternative ist Home Assistant Green (siehe [Vergleich](/de/smart-home/home-assistant-green-vs-raspberry-pi-5/)).

**Für Jugendliche zwischen nackter Platine und Roboter** verbindet ein Pi-basierter Bausatz wie der [SunFounder PiCar-X](https://www.sunfounder.com/products/picar-x?ref=tpytgtyp) (Affiliate-Link, Pi nicht enthalten) beides.

## 5. Wo kaufen in Deutschland, Österreich und der Schweiz?

Raspberry Pi führt seine zugelassenen Händler Land für Land auf der [offiziellen Händlerseite](https://www.raspberrypi.com/resellers/). Achten Sie beim offiziellen Netzteil auf die Version mit **EU-Stecker**.

**Kurz gesagt:** Pi 3 = die historische Referenz, heute knapp bemessen; Pi 4 = der beste Kompromiss für Netzwerk und USB; Pi 5 = höchste Leistung und meiste RAM, auf Kosten von Wärme und Preis.
