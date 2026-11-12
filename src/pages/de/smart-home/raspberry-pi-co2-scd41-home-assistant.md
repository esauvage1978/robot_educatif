---
layout: ../../../layouts/DePost.astro
title: "CO₂-Messung mit SCD41 am Raspberry Pi und Home Assistant (MQTT)"
description: "Echter CO₂-Sensor SCD40/SCD41 per I2C am Pi 4/5, Python-Skript, Mosquitto und MQTT-Discovery — Lüftungshinweis für Büro und Kinderzimmer in DE."
updated: "24. Oktober 2026"
---

Hoher **CO₂-Gehalt** bedeutet schlecht gelüftete Räume. Mit **Raspberry Pi** und **SCD40/SCD41** (photoakustisch, nicht nur geschätzt) messen Sie CO₂, Temperatur und Luftfeuchte und senden die Werte per **MQTT** an Home Assistant — z. B. für die Meldung „Fenster auf“.

**Keine Preise:** SCD41-Module sind teurer als Temperatur-Sensoren — Preis beim Kauf prüfen. [SCD41 bei Amazon.de](https://www.amazon.de/s?k=SCD41+CO2+Sensor&tag=roboteducat00-21) (Werbelink).

## Ziel

- Alle 30 s messen und per MQTT veröffentlichen
- Automatische Entitäten in HA (Discovery)
- systemd-Dienst am Boot

Dauer ca. 1,5 h, Niveau: mittel. Pi kann derselbe sein wie [Home Assistant](/de/smart-home/home-assistant-raspberry-pi-5-installation/) (separates OS) oder ein zweiter Pi mit Raspberry Pi OS Bookworm.

## Material

- Raspberry Pi 4 oder 5, Bookworm
- Breakout **SCD40/SCD41** (VIN, GND, SCL, SDA)
- Mosquitto (Add-on in HA oder auf dem Pi)
- Dupont-Kabel

## Verdrahtung I2C (3,3 V)

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">SCD4x</th>
<th scope="col">Pi (phys. Pin)</th>
</tr></thead><tbody>
<tr>
<td data-label="SCD4x"><span class="td-val">VIN</span></td>
<td data-label="Pi (phys. Pin)"><span class="td-val">3,3 V (Pin 1)</span></td>
</tr>
<tr>
<td data-label="SCD4x"><span class="td-val">GND</span></td>
<td data-label="Pi (phys. Pin)"><span class="td-val">GND (Pin 6)</span></td>
</tr>
<tr>
<td data-label="SCD4x"><span class="td-val">SDA</span></td>
<td data-label="Pi (phys. Pin)"><span class="td-val">GPIO2 / SDA (Pin 3)</span></td>
</tr>
<tr>
<td data-label="SCD4x"><span class="td-val">SCL</span></td>
<td data-label="Pi (phys. Pin)"><span class="td-val">GPIO3 / SCL (Pin 5)</span></td>
</tr>
</tbody>
</table>
</div>

Adresse **0x62**. I2C aktivieren: `sudo raspi-config` → Interface I2C → `i2cdetect -y 1` muss `62` zeigen.

## Python-Umgebung (Bookworm)

sudo apt update
sudo apt install -y python3-venv python3-gpiozero python3-lgpio i2c-tools
mkdir -p ~/capteurs && cd ~/capteurs
python3 -m venv --system-site-packages venv
source venv/bin/activate
pip install adafruit-circuitpython-scd4x paho-mqtt

Vollständiges Skript: Download `/code/raspberry-pi/co2_scd41_mqtt.py` im Projekt (gleicher Code wie FR-Tutorial). Umgebungsvariablen: `MQTT_HOST`, `DEVICE_ID`, `INTERVAL=30`.

## Home Assistant

Mosquitto-Integration aktiv, Discovery eingeschaltet — Entitäten `carbon_dioxide`, `temperature`, `humidity` erscheinen.

Automatisierung bei CO₂ > 1000 ppm: Push an die Handy-App.

## Hinweis Pi 5

**gpiozero + lgpio**, nicht veraltetes RPi.GPIO — wie in den anderen Pi-Tutorials dieser Reihe.

Weiter: [Wetterstation BME280](/de/smart-home/raspberry-pi-wetterstation-bme280/), [Türsensor](/de/smart-home/raspberry-pi-tuersensor-benachrichtigung/), [Notstrom](/de/smart-home/home-assistant-notstrom-usv/).

[Alle Smart-Home-Ratgeber](/de/smart-home/)
