---
layout: ../../../layouts/EsPost.astro
title: "Sensor CO2 SCD41 en Raspberry Pi + Home Assistant: tutorial con código"
description: "Medir CO2, temperatura y humedad con SCD40/SCD41 en Raspberry Pi 4 o 5, publicación MQTT y descubrimiento en Home Assistant. Python y systemd."
updated: "24 de octubre de 2026"
---

CO2 alto en una habitación indica aire poco renovado. Este tutorial convierte un **Raspberry Pi** y un **SCD40 o SCD41** en sonda que envía datos a **Home Assistant** para alertas del tipo «ventila».

## Objetivo

- Leer CO2 (ppm), temperatura y humedad cada 30 s.  
- Publicar MQTT con descubrimiento automático en HA.  
- Servicio al arranque.

## Material

- Raspberry Pi 4 o 5 con Raspberry Pi OS Bookworm ([Amazon.es](https://www.amazon.es/s?k=Raspberry+Pi+5&tag=roboteducat07-21)).  
- Módulo **SCD40/SCD41** I2C ([Amazon.es](https://www.amazon.es/s?k=SCD41+sensor+CO2&tag=roboteducat07-21)).  
- Broker MQTT (Mosquitto en Home Assistant).

## Cableado (3,3 V)

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">SCD4x</th>
<th scope="col">Pi (pin físico)</th>
</tr></thead><tbody>
<tr>
<td data-label="SCD4x"><span class="td-val">VIN</span></td>
<td data-label="Pi (pin físico)"><span class="td-val">1 (3V3)</span></td>
</tr>
<tr>
<td data-label="SCD4x"><span class="td-val">GND</span></td>
<td data-label="Pi (pin físico)"><span class="td-val">6 (GND)</span></td>
</tr>
<tr>
<td data-label="SCD4x"><span class="td-val">SDA</span></td>
<td data-label="Pi (pin físico)"><span class="td-val">3 (GPIO2)</span></td>
</tr>
<tr>
<td data-label="SCD4x"><span class="td-val">SCL</span></td>
<td data-label="Pi (pin físico)"><span class="td-val">5 (GPIO3)</span></td>
</tr>
</tbody>
</table>
</div>

Dirección I2C **0x62**. Activa I2C con `raspi-config`, `i2cdetect -y 1` debe mostrar `62`.

## Entorno

sudo apt update
sudo apt install -y python3-venv python3-gpiozero python3-lgpio i2c-tools
mkdir -p ~/capteurs && cd ~/capteurs
python3 -m venv --system-site-packages venv
source venv/bin/activate
pip install adafruit-circuitpython-scd4x paho-mqtt

Descarga: [co2_scd41_mqtt.py](/code/raspberry-pi/co2_scd41_mqtt.py) — publica en `robotedu/{DEVICE_ID}/state` y discovery en `homeassistant/sensor/.../config`.

Variables: `MQTT_HOST`, `MQTT_USER`, `MQTT_PASS`, `DEVICE_ID`, `INTERVAL=30`.

Automatización ejemplo (adapta `entity_id`):

alias: Alerta CO2 salón
triggers:
  - trigger: numeric_state
    entity_id: sensor.raspberry_pi_scd41_pi_scd41_salon_co2
    above: 1000
    for: "00:05:00"
actions:
  - action: notify.notify
    data:
      message: "CO2 por encima de 1000 ppm: ventila."

## systemd

Servicio `capteur-co2.service` con `ExecStart=.../venv/bin/python .../co2_scd41_mqtt.py`, `Restart=on-failure`.

## Truco: derivada de subida de CO2

Sensor derivado sobre CO2 (subida rápida en 10 min) avisa antes que un umbral fijo en habitaciones pequeñas.

## Errores frecuentes

Alimentación 3,3 V en Pi; esperar `data_ready`; no pegar el sensor al Pi ni a ventana; funcionamiento continuo para autocalibración.

Más: [instalar Home Assistant](/es/domotica/instalar-home-assistant-raspberry-pi-5/), [estación meteo BME280](/es/domotica/raspberry-pi-estacion-meteo-bme280/).

[Todas las guías](/es/domotica/)
