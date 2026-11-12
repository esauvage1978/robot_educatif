---
layout: ../../../layouts/DePost.astro
title: "ESP32-Temperatursensor mit ESPHome für Home Assistant"
description: "Schritt für Schritt: DHT22 oder BME280 am ESP32-C6, Verdrahtung, YAML, OTA und Heiz-Automatisierung — 2,4-GHz-WLAN, ohne Schuko-Eingriff."
updated: "2. November 2026"
shareTitle: "ESP32-Temperatursensor mit ESPHome"
shareDescription: "DHT22 oder BME280 verdrahten, in Home Assistant einbinden, typische Fehler vermeiden."
---

<nav class="breadcrumb" aria-label="Brotkrumen"><a href="/de/smart-home/">Smart Home</a> · ESP32-Temperatursensor</nav>

**Kurzantwort (November 2026)** — Mit **ESP32** (*Espressif 32-Bit-Mikrocontroller mit WLAN*) und **ESPHome** (Firmware-Generator für Sensoren) bauen Sie einen **Raumtemperatur-Sensor**, der automatisch in **Home Assistant** (Smart-Home-Zentrale) erscheint. Sie brauchen nur **2,4-GHz-WLAN** — kein Eingriff in die Schuko-Installation.

Dieses Tutorial gehört zu unserem [Smart-Home-Hub](/de/smart-home/) mit [Zigbee-Temperatursensor](/de/smart-home/zigbee-temperatursensor/), [ESP32-Projektideen](/de/smart-home/esp32-smart-home-projektideen/) und [ESP32-Platinen-Vergleich](/de/smart-home/welche-esp32-platine-smart-home/).

![ESP32-C6 mit Temperatursensor — Verdrahtungsreferenz](/images/illustrations/esp32-esphome-capteur-temperature.webp)

*Werbelinks: Preise beim Händler prüfen — keine festen Beträge hier.*

## Material

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Teil</th>
<th scope="col">Rolle</th>
</tr></thead><tbody>
<tr>
<td data-label="Teil"><span class="td-val"><strong>ESP32-C6 DevKit</strong> (oder S3/classic)</span></td>
<td data-label="Rolle"><span class="td-val">WLAN, ESPHome — <a href="/de/smart-home/welche-esp32-platine-smart-home/">Platinen-Vergleich</a></span></td>
</tr>
<tr>
<td data-label="Teil"><span class="td-val"><strong>DHT22</strong></span></td>
<td data-label="Rolle"><span class="td-val">einfach, 1-Draht-Bus, ±0,5 °C typisch</span></td>
</tr>
<tr>
<td data-label="Teil"><span class="td-val"><strong>BME280</strong></span></td>
<td data-label="Rolle"><span class="td-val">I2C, genauer, plus <strong>Luftdruck</strong></span></td>
</tr>
<tr>
<td data-label="Teil"><span class="td-val">Breadboard, Dupont-Kabel, USB-Netzteil 5 V (Schuko-Adapter)</span></td>
<td data-label="Rolle"><span class="td-val">Prototyp oder Dauerbetrieb</span></td>
</tr>
</tbody>
</table>
</div>

Suche: [ESP32-C6 bei Amazon.de](https://www.amazon.de/s?k=ESP32-C6+DevKit&tag=roboteducat00-21), [BME280 Modul](https://www.amazon.de/s?k=BME280+Modul&tag=roboteducat00-21) (Werbelinks).

## ESPHome in Home Assistant

*Einstellungen → Add-ons → ESPHome* installieren und starten. Offizielle Anleitung: [ESPHome getting started](https://esphome.io/guides/getting_started_hassio.html).

## Verdrahtung DHT22

DHT22 VCC  →  ESP32 3,3 V
DHT22 DATA →  GPIO4
DHT22 GND  →  GND

Optional 4,7 kΩ zwischen VCC und DATA bei langen Leitungen.

## BME280 (I2C)

VCC → 3,3 V | GND → GND | SDA → GPIO6 | SCL → GPIO7

Adresse oft `0x76` oder `0x77` — im YAML anpassen. Pinout am DevKit prüfen (C6 weicht manchmal ab).

## Gerät anlegen und flashen

1. ESPHome → **Neues Gerät** → Name `sensor-wohnzimmer` → Chip **ESP32-C6**
2. **2,4-GHz-WLAN** (ESP32 nutzt kein 5-GHz-WLAN)
3. USB am PC → **Install** → Port wählen (BOOT-Taste halten, falls nötig)
4. Danach erscheint das Gerät unter *Geräte & Dienste*

## YAML-Ausschnitt (DHT22)

sensor:
  - platform: dht
    pin: GPIO4
    model: DHT22
    temperature:
      name: "Temperatur Wohnzimmer"
    humidity:
      name: "Luftfeuchte Wohnzimmer"
    update_interval: 60s

BME280: Plattform `bme280_i2c` mit `address: 0x76`.

Nach **Speichern → Wireless install** OTA-Updates ohne Kabel.

## Automatisierung

Heizung oder [Zigbee-Steckdose](/de/smart-home/smarte-steckdosen/) bei &lt; 19 °C — siehe [Zigbee-Temperatursensor](/de/smart-home/zigbee-temperatursensor/) für YAML-Beispiele (Entitätsnamen anpassen).

## Fehlerbehebung

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Symptom</th>
<th scope="col">Lösung</th>
</tr></thead><tbody>
<tr>
<td data-label="Symptom"><span class="td-val"><strong>WLAN</strong></span></td>
<td data-label="Lösung"><span class="td-val">Nur 2,4 GHz; Gastnetz-Isolation am Router prüfen</span></td>
</tr>
<tr>
<td data-label="Symptom"><span class="td-val"><strong>NaN am DHT22</strong></span></td>
<td data-label="Lösung"><span class="td-val">Verdrahtung, anderes GPIO, <code>update_interval</code> ≥ 60 s</span></td>
</tr>
<tr>
<td data-label="Symptom"><span class="td-val"><strong>BME280 fehlt</strong></span></td>
<td data-label="Lösung"><span class="td-val">I2C-Adresse und SDA/SCL tauschen testen</span></td>
</tr>
<tr>
<td data-label="Symptom"><span class="td-val"><strong>Zu warm gemessen</strong></span></td>
<td data-label="Lösung"><span class="td-val">Sensor vom ESP32-Körper entfernen (Kabel verlängern)</span></td>
</tr>
</tbody>
</table>
</div>

## FAQ

**ESP32 oder fertiger Zigbee-Sensor?**  
**ESP32**: günstig, flexibel, USB-Strom. **Zigbee**: batteriebetrieben, weniger Kabel — [Vergleich Zigbee-Temperatur](/de/smart-home/zigbee-temperatursensor/).

**Brauche ich ESPHome als Add-on?**  
Am einfachsten ja, auf dem gleichen Host wie Home Assistant; alternativ ESPHome CLI auf dem PC.

Plug-and-play ohne Basteln: [Zigbee-Temperatursensor](/de/smart-home/zigbee-temperatursensor/). Mehr Ideen: [ESP32-Projekte](/de/smart-home/esp32-smart-home-projektideen/).

[Alle Smart-Home-Ratgeber](/de/smart-home/)
