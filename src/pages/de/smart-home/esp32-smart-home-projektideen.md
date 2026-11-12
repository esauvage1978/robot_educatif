---
layout: ../../../layouts/DePost.astro
title: "10 ESP32-Projekte fürs Smart Home mit ESPHome"
description: "Von Temperatur und Notfall-Taster bis CO₂, mmWave und lokalem Sprachassistent — ESP32-Ideen für Home Assistant, Preise beim Händler prüfen, 230-V-Regeln in DE beachten."
updated: "24. Oktober 2026"
---

**ESP32 + ESPHome** macht aus einem WLAN-Mikrocontroller Sensoren, Relais oder Displays für Home Assistant. Zehn Projekte nach Schwierigkeit — **Materialpreise variieren**, vor dem Kauf vergleichen (Amazon.de, Reichelt, Berrybase …).

Board-Tipp: **ESP32-C6 DevKit** — [Welche Platine?](/de/smart-home/welche-esp32-platine-smart-home/). [ESP32-C6 suchen](https://www.amazon.de/s?k=ESP32-C6+DevKit&tag=roboteducat00-21) (Werbelink).

## Einsteiger (1–2 h)

### 1. Temperatur DHT22 / BME280

[Tutorial](/de/smart-home/esp32-esphome-temperatursensor/)

### 2. Notfall-Taster

GPIO-Taster → Event in HA (Alarm, alle Lichter aus).

### 3. Status-LED (WS2812)

Farbe = Hauszustand (z. B. Fenster offen, niemand zu Hause).

## Mittel (2–4 h)

### 4. Wetterstation (BME280 + BH1750)

Lokal wettervorhersagen, Rollläden automatisieren.

### 5. 4-Kanal-Relais

Steuerung von Niederspannungslasten — **kein 230 V ohne Elektrofachkraft**. Fertige WLAN-Relais: Shelly 1 Gen4 (110–240 V, bis 16 A laut [Shelly KB](https://kb.shelly.cloud/knowledge-base/shelly-1-gen4)) nur durch Fachkraft hinter dem Schalter.

### 6. mmWave-Präsenz (LD2410)

Präsenz auch bei Stillstand — besser als PIR im Büro.

## Fortgeschritten (4–8 h)

### 7. E-Paper-Wetterdisplay

### 8. CO₂ (MH-Z19B)

Lüftung/VMC bei > 1000 ppm — präziser CO₂: [SCD41 am Pi](/de/smart-home/raspberry-pi-co2-scd41-home-assistant/)

### 9. Lokaler Sprachassistent (Atom Echo / HA Voice)

Ohne Google/Alexa-Cloud.

### 10. Impulszähler (Wasser/Strom)

Linky/Teleinfo oder Hall-Sensor — Verbrauch in HA.

## Bonus-Ideen

Garagentor ([Tutorial](/de/smart-home/garagentor-smartphone-esp32-esphome/)), Bewässerung, DIY-Alarm, ESP32-CAM-Türklinge, BME680 + Feinstaub.

## ESP32 vs. Zigbee

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">ESP32</th>
<th scope="col">Zigbee</th>
</tr></thead><tbody>
<tr>
<td data-label="ESP32"><span class="td-val">beliebig erweiterbar, oft günstiger in Teilen</span></td>
<td data-label="Zigbee"><span class="td-val">Batterie, kein Kabel, Mesh</span></td>
</tr>
<tr>
<td data-label="ESP32"><span class="td-val">USB 5 V nötig</span></td>
<td data-label="Zigbee"><span class="td-val">Koordinator nötig</span></td>
</tr>
</tbody>
</table>
</div>

Zigbee-Einstieg: [Temperatursensor](/de/smart-home/zigbee-temperatursensor/), [Stick](/de/smart-home/bester-zigbee-stick-home-assistant/).

Ressourcen: [esphome.io](https://esphome.io), [Home-Assistant-Community](https://community.home-assistant.io).

[Alle Smart-Home-Ratgeber](/de/smart-home/)
