---
layout: ../../layouts/DePost.astro
title: "Raspberry Pi 5: 2 GB, 4 GB, 8 GB oder 16 GB? Welcher RAM?"
description: "Welche Speichergröße beim Raspberry Pi 5? Wofür jede RAM-Variante taugt, welche Kühlung und welches Netzteil Sie zusätzlich brauchen, und eine schnelle Entscheidungshilfe."
updated: "22. Oktober 2026"
---

Der **Raspberry Pi 5** basiert auf dem Broadcom **BCM2712**: vier **Cortex-A76**-Kerne mit **2,4 GHz**, eine **VideoCore VII**-GPU und der I/O-Controller **RP1**. Er ist außerdem der erste Raspberry Pi in Standardgröße mit einer **PCIe 2.0 ×1**-Schnittstelle, über die sich mit einer Erweiterungsplatine **NVMe-SSDs** anschließen lassen. Daten von der [offiziellen Raspberry-Pi-5-Seite](https://www.raspberrypi.com/products/raspberry-pi-5/).

Dieser Ratgeber erklärt die **Speichervarianten** (Verfügbarkeit je nach Land), was Sie für **Kühlung** und **Stromversorgung** einplanen müssen und wie Sie wählen.

## 1. RAM-Varianten des Raspberry Pi 5

| RAM | Typischer Einsatz |
|---|---|
| **1 GB** | Sehr günstige Edge-Aufgaben: einfache Skripte, ein leichtes Gateway. Wenig Reserve für Browser oder IDE. |
| **2 GB** | Minimale Server, Anzeigen, Bots. Nicht ideal als Familien-Desktop mit vielen Browser-Tabs. |
| **4 GB** | Die Allround-Wahl: Raspberry-Pi-OS-Desktop, Programmieren, kleine Web-Stacks, Home Assistant. |
| **8 GB** | Mehrere Container, Datenbanken, ernsthaftes Kompilieren, Desktop mit vielen Hintergrunddiensten. |
| **16 GB** | Auf einem Einplatinencomputer selten nötig: kleine lokale KI-Modelle, große Builds, Caches. Nur kaufen, wenn Sie wissen, wofür. |

Der Speicher ist beim Pi 5 **LPDDR4X-4267** (beim Pi 4 LPDDR4-3200).

## 2. Was sich gegenüber dem Pi 4 wirklich ändert

- **CPU**: in den meisten Kompilier- und Kodier-Benchmarks deutlich schneller.
- **PCIe**: schnellerer Speicher oder Erweiterungskarten, mit kompatibler Hardware und ausreichender Stromversorgung.
- **Wärme**: Der Pi 5 wird schnell warm; der offizielle **Active Cooler** (oder ein gleichwertiger Kühler) ist bei Dauerlast nahezu Pflicht.
- **Strom**: Raspberry Pi empfiehlt sein **27-W-USB-C-Netzteil (5 V, 5 A)**, um den vollen USB-Strom freizugeben. Schwache Handy-Ladegeräte führen zu Warnungen oder Drosselung. Das offizielle Netzteil gibt es auch mit **EU-Stecker**.

## 3. Welche Variante wählen?

1. **Knappes Budget, kein Desktop**: 2 GB (oder 1 GB, wenn Sie den RAM-Bedarf Ihrer Dienste gemessen haben).
2. **Erster Pi für Familie, Schule oder Basteln**: **4 GB**.
3. **Heimlabor mit Docker** oder mehreren Stacks: **8 GB**.
4. **Große Builds, speicherhungrige Modelle, keine Kompromisse**: 16 GB, nachdem Sie geprüft haben, dass Speicher und Kühlung mithalten.

Preise ändern sich oft und unterscheiden sich je nach Land: **Preis prüfen** bei einem offiziellen Händler. Der Abstand zwischen 4 GB und 16 GB kann groß sein.

## 4. Zubehör, das Sie nicht vergessen sollten

- **Aktive Kühlung** (offizieller Active Cooler oder offizielles Gehäuse mit Lüfter).
- **Netzteil**: offizielles 27-W-USB-C-Netzteil oder ein dokumentiertes gleichwertiges Modell.
- **Schnelle microSD-Karte** oder ein **NVMe**-Laufwerk, wenn Sie eine PCIe-Platine ergänzen.
- **Micro-HDMI-Kabel** für einen oder zwei Bildschirme.

## 5. Wo kaufen?

Der Pi 5 wird über die [zugelassenen Händler](https://www.raspberrypi.com/resellers/) von Raspberry Pi in jedem Land verkauft, auch in Deutschland, Österreich und der Schweiz.

**Raspberry Pi OS** spielen Sie mit dem **Raspberry Pi Imager** auf, genau wie bei früheren Modellen.

**Wichtigste Erkenntnis:** Den Pi 5 zuerst nach **RAM** auswählen (4 GB oder 8 GB für die meisten), dann auf **gutes Netzteil und Kühlung** achten.

Siehe auch: [Raspberry Pi 3 vs 4 vs 5](/de/raspberry-pi-3-vs-4-vs-5/).
