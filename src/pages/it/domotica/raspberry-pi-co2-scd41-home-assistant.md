---
layout: ../../../layouts/ItPost.astro
title: "Sensore CO2 SCD41 su Raspberry Pi + Home Assistant: tutorial con codice"
description: "Misurare CO2, temperatura e umidità con SCD40/SCD41 su Raspberry Pi 4 o 5, pubblicazione MQTT verso Home Assistant, Python e systemd."
updated: "24 ottobre 2026"
---

CO2 alto = aria poco rinnovata (camera, ufficio). Con **SCD40/SCD41** (fotoacustico, non stima) e Raspberry Pi inviate ppm, temperatura e umidità a **Home Assistant** e automate « aerate ».

## Obiettivo

Lettura ogni 30 s, MQTT con discovery HA, servizio all’avvio.

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Durata</th>
<th scope="col">Livello</th>
</tr></thead><tbody>
<tr>
<td data-label="Durata"><span class="td-val">~1 h 30</span></td>
<td data-label="Livello"><span class="td-val">intermedio</span></td>
</tr>
</tbody>
</table>
</div>

## Materiale

- Raspberry Pi 4/5, **Raspberry Pi OS Bookworm**  
- Modulo **SCD40 o SCD41** (I2C 0x62) — [ricerca SCD41 Amazon.it](https://www.amazon.it/s?k=SCD41+CO2&tag=roboteducat0f-21)  
- Broker MQTT (Mosquitto in HA)

## Cablaggio (3,3 V sul Pi)

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">SCD4x</th>
<th scope="col">Pi (pin fisico)</th>
</tr></thead><tbody>
<tr>
<td data-label="SCD4x"><span class="td-val">VIN</span></td>
<td data-label="Pi (pin fisico)"><span class="td-val">3V3 (pin 1)</span></td>
</tr>
<tr>
<td data-label="SCD4x"><span class="td-val">GND</span></td>
<td data-label="Pi (pin fisico)"><span class="td-val">GND (pin 6)</span></td>
</tr>
<tr>
<td data-label="SCD4x"><span class="td-val">SDA</span></td>
<td data-label="Pi (pin fisico)"><span class="td-val">GPIO2 (pin 3)</span></td>
</tr>
<tr>
<td data-label="SCD4x"><span class="td-val">SCL</span></td>
<td data-label="Pi (pin fisico)"><span class="td-val">GPIO3 (pin 5)</span></td>
</tr>
</tbody>
</table>
</div>

sudo apt update
sudo apt install -y python3-venv python3-gpiozero python3-lgpio i2c-tools
sudo raspi-config nonint do_i2c 0
# reboot
i2cdetect -y 1   # deve comparire 62
mkdir -p ~/capteurs && cd ~/capteurs
python3 -m venv --system-site-packages venv
source venv/bin/activate
pip install adafruit-circuitpython-scd4x paho-mqtt

Script completo: scaricare [`/code/raspberry-pi/co2_scd41_mqtt.py`](/code/raspberry-pi/co2_scd41_mqtt.py).

Variabili: `MQTT_HOST`, `MQTT_USER`, `MQTT_PASS`, `DEVICE_ID=pi_scd41_salone`.

## Home Assistant

Add-on **Mosquitto**, integrazione **MQTT**. Entità create via discovery su `homeassistant/sensor/.../config`.

Automazione esempio CO2 > 1000 ppm per 5 min → notifica (adattare `entity_id`).

## systemd

Unit `capteur-co2.service` con `ExecStart=.../venv/bin/python .../co2_scd41_mqtt.py`, `enable --now`.

## Trucco: derivata CO2

Sensore **Derivative** su ppm/h per alert su **salita rapida** prima del soglio fisso.

## Errori

- No `62` su i2cdetect: SDA/SCL, I2C off  
- 5 V senza level shifter su moduli non compatibili: usare 3,3 V  
- Pi spento di notte: auto-calibrazione SCD4x richiede funzionamento continuo  

Vedi [installare HA](/it/domotica/installare-home-assistant-raspberry-pi-5/), [stazione BME280](/it/domotica/raspberry-pi-stazione-meteo-bme280/).

[Tutte le guide](/it/domotica/)
