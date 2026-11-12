---
layout: ../../../layouts/DePost.astro
title: "ESP32-Platine fürs Smart Home: ESP32, S3, C3, C6, H2"
description: "Espressif-Chips für ESPHome: Kerne, WLAN, Bluetooth, Thread/Zigbee und GPIO. Welche DevKit für Sensor, Kamera oder Thread?"
updated: "2. November 2026"
---

<nav class="breadcrumb" aria-label="Brotkrumen"><a href="/de/smart-home/">Smart Home</a> · ESP32-Platinen</nav>

> **Kurzantwort (November 2026)** — Für die meisten [ESPHome](https://esphome.io/)-Projekte in Home Assistant reicht eine **klassische ESP32 DevKit** (WLAN + Bluetooth, beste Doku). **ESP32-S3** für Kamera/mehr GPIO, **ESP32-C6** wenn Sie **Thread/Zigbee** neben WLAN planen.

„ESP32“ bezeichnet heute eine ganze Familie von **Espressif**-Chips. Für [ESPHome](https://esphome.io/) in Home Assistant entscheidet der Chip über Bluetooth, Thread, natives USB und GPIO. Fünf gängige Chips laut [Espressif-Produktseiten](https://www.espressif.com/en/products/socs):

![ESP32-C6 DevKit](/images/products/esp32-c6-devkitc.webp)

## Kurzvergleich

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Chip</th>
<th scope="col">Kerne / max. Takt</th>
<th scope="col">WLAN</th>
<th scope="col">Bluetooth</th>
<th scope="col">IEEE 802.15.4 (Thread, Zigbee)</th>
<th scope="col">USB nativ</th>
<th scope="col">SRAM</th>
</tr></thead><tbody>
<tr>
<td data-label="Chip"><span class="td-val"><strong>ESP32</strong> (klassisch)</span></td>
<td data-label="Kerne / max. Takt"><span class="td-val">2 × Xtensa LX6, 240 MHz</span></td>
<td data-label="WLAN"><span class="td-val">Wi-Fi 4, 2,4 GHz</span></td>
<td data-label="Bluetooth"><span class="td-val">Classic + BLE 4.2</span></td>
<td data-label="IEEE 802.15.4 (Thread, Zigbee)"><span class="td-val">nein</span></td>
<td data-label="USB nativ"><span class="td-val">nein</span></td>
<td data-label="SRAM"><span class="td-val">520 KB</span></td>
</tr>
<tr>
<td data-label="Chip"><span class="td-val"><strong>ESP32-S3</strong></span></td>
<td data-label="Kerne / max. Takt"><span class="td-val">2 × Xtensa LX7, 240 MHz</span></td>
<td data-label="WLAN"><span class="td-val">Wi-Fi 4, 2,4 GHz</span></td>
<td data-label="Bluetooth"><span class="td-val">BLE 5</span></td>
<td data-label="IEEE 802.15.4 (Thread, Zigbee)"><span class="td-val">nein</span></td>
<td data-label="USB nativ"><span class="td-val">ja (OTG)</span></td>
<td data-label="SRAM"><span class="td-val">512 KB</span></td>
</tr>
<tr>
<td data-label="Chip"><span class="td-val"><strong>ESP32-C3</strong></span></td>
<td data-label="Kerne / max. Takt"><span class="td-val">1 × RISC-V, 160 MHz</span></td>
<td data-label="WLAN"><span class="td-val">Wi-Fi 4, 2,4 GHz</span></td>
<td data-label="Bluetooth"><span class="td-val">BLE 5</span></td>
<td data-label="IEEE 802.15.4 (Thread, Zigbee)"><span class="td-val">nein</span></td>
<td data-label="USB nativ"><span class="td-val">Seriell/JTAG</span></td>
<td data-label="SRAM"><span class="td-val">400 KB</span></td>
</tr>
<tr>
<td data-label="Chip"><span class="td-val"><strong>ESP32-C6</strong></span></td>
<td data-label="Kerne / max. Takt"><span class="td-val">RISC-V + Low-Power-Kern</span></td>
<td data-label="WLAN"><span class="td-val"><strong>Wi-Fi 6</strong>, 2,4 GHz</span></td>
<td data-label="Bluetooth"><span class="td-val">BLE 5</span></td>
<td data-label="IEEE 802.15.4 (Thread, Zigbee)"><span class="td-val"><strong>ja</strong></span></td>
<td data-label="USB nativ"><span class="td-val">Seriell/JTAG</span></td>
<td data-label="SRAM"><span class="td-val">512 KB</span></td>
</tr>
<tr>
<td data-label="Chip"><span class="td-val"><strong>ESP32-H2</strong></span></td>
<td data-label="Kerne / max. Takt"><span class="td-val">1 × RISC-V, 96 MHz</span></td>
<td data-label="WLAN"><span class="td-val"><strong>nein</strong></span></td>
<td data-label="Bluetooth"><span class="td-val">BLE 5</span></td>
<td data-label="IEEE 802.15.4 (Thread, Zigbee)"><span class="td-val"><strong>ja</strong></span></td>
<td data-label="USB nativ"><span class="td-val">Seriell/JTAG</span></td>
<td data-label="SRAM"><span class="td-val">320 KB</span></td>
</tr>
</tbody>
</table>
</div>

**Einstieg:** klassische **ESP32 DevKit** — in ESPHome und Foren am besten dokumentiert, reicht für die meisten [ESP32-Projektideen](/de/smart-home/esp32-smart-home-projektideen/). **S3** für Kamera und mehr Pins; **C6** wenn Sie **Thread** (Mesh-Protokoll, oft mit **Matter**) vorbereiten wollen.

## Drei typische Projekte (Reihenfolge)

1. **Raumtemperatur** — BME280 oder DHT22, alle 60 s an **Home Assistant** senden ([ESPHome-Tutorial](/de/smart-home/esp32-esphome-temperatursensor/)).
2. **Garagentor-Status** — Reed-Kontakt + optional Relais, alles lokal ohne Cloud ([Garagentor ESPHome](/de/smart-home/garagentor-smartphone-esp32-esphome/)).
3. **BLE-Proxy** — klassischer **ESP32** leitet Bluetooth-Beacons an HA weiter (nützlich für Herzfrequenzgurte oder Tile-Tracker).

Übersicht Smart Home: [Smart-Home-Hub](/de/smart-home/) · Protokolle: [Zigbee, Wi‑Fi, Thread, Matter](/de/smart-home/smart-home-protokolle-zigbee-wifi-thread-matter/).

## ESP32 klassisch

Zwei Kerne, WLAN und Bluetooth Classic, viele GPIO: Basis unserer Tutorials [Temperatursensor ESPHome](/de/smart-home/esp32-esphome-temperatursensor/) und [Garagentor per Smartphone](/de/smart-home/garagentor-smartphone-esp32-esphome/). Bluetooth eignet sich als **BLE-Proxy** für Home Assistant.

## ESP32-S3

USB OTG, mehr GPIO, Vektorinstruktionen — typisch für Kamera-Boards. Kein Bluetooth Classic, nur BLE 5.

## ESP32-C3

Klein, günstig, ein RISC-V-Kern — Sensor oder Relais. Weniger Pins als der klassische ESP32.

## ESP32-C6 und H2

**C6:** Wi-Fi 6, BLE 5 und **802.15.4** (Thread/Zigbee). **H2:** ohne WLAN, für batteriebetriebene Thread/Zigbee-Geräte. ESPHome-Unterstützung entwickelt sich — [ESPHome ESP32-Doku](https://esphome.io/components/esp32/) prüfen. Hintergrund: [Smart-Home-Protokolle](/de/smart-home/smart-home-protokolle-zigbee-wifi-thread-matter/).

## Kaufhinweise

- **Entwicklungsboard** statt nacktem Modul (USB, Regler, Reset).
- USB-C oder Micro-USB und USB-UART-Chip, falls kein natives USB.
- Flash: 4 MB für ESPHome; 8 MB+ und PSRAM für Kamera.
- Dauerbetrieb: stabiles 5-V-USB-Netzteil (Schuko-Steckernetzteil in DE/AT).

<p><strong>Kaufen (Werbelink):</strong> <a href="https://www.amazon.de/s?k=ESP32+DevKit&tag=roboteducat00-21" target="_blank" rel="noopener nofollow sponsored">ESP32 DevKit bei Amazon.de</a></p>

Danach: [ESPHome-Temperatursensor](/de/smart-home/esp32-esphome-temperatursensor/), [Projektideen](/de/smart-home/esp32-smart-home-projektideen/). Hub-Vergleich: [Home Assistant Green vs Raspberry Pi 5](/de/smart-home/home-assistant-green-vs-raspberry-pi-5/).

## FAQ

- **ESPHome oder Arduino IDE?** **ESPHome** (YAML-Konfiguration, OTA-Updates) für schnelle Sensoren; **Arduino IDE** wenn Sie C++ selbst schreiben wollen.
- **Welcher Zigbee-Stick?** Siehe [bester Zigbee-Stick für Home Assistant](/de/smart-home/bester-zigbee-stick-home-assistant/).
- **Raspberry Pi oder ESP32?** Der **Pi** ist ein vollständiger Linux-Server (Home Assistant OS); der **ESP32** ist ein günstiger **WLAN-Mikrocontroller** für einen einzelnen Sensor — oft **beides** im Haus.
- **Flash 4 MB reicht?** Ja für Temperatur/Relais; **Kamera** braucht oft **8 MB + PSRAM**.

[Alle Smart-Home-Ratgeber](/de/smart-home/)
