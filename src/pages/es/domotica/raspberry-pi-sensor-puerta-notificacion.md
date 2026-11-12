---
layout: ../../../layouts/EsPost.astro
title: "Sensor de apertura de puerta (reed) en Raspberry Pi con notificación al móvil"
description: "Contacto magnético en Raspberry Pi 4 o 5: aviso push con ntfy y entidad Puerta en Home Assistant vía MQTT. Código gpiozero completo."
updated: "24 de octubre de 2026"
---

Saber cuándo se abre la puerta de entrada, el trastero o un armario: un **contacto reed** basta. Cero consumo propio, cableado al Pi. El script avisa con **ntfy** (gratis, Android/iOS) y opcionalmente publica en **Home Assistant**.

## Objetivo

- Detectar apertura y cierre.  
- Notificación push al abrir.  
- Opcional: `binary_sensor` Puerta en HA.

## Material y cableado

Pi 4/5 Bookworm, **reed NO** ([Amazon.es](https://www.amazon.es/s?k=sensor+magnetico+reed&tag=roboteducat07-21)), cableado:

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Reed</th>
<th scope="col">Pi</th>
</tr></thead><tbody>
<tr>
<td data-label="Reed"><span class="td-val">fil 1</span></td>
<td data-label="Pi"><span class="td-val">pin 11 (GPIO17)</span></td>
</tr>
<tr>
<td data-label="Reed"><span class="td-val">fil 2</span></td>
<td data-label="Pi"><span class="td-val">pin 9 (GND)</span></td>
</tr>
</tbody>
</table>
</div>

Puerta cerrada: contacto cerrado, GPIO a 0. Sin tensión externa en el reed.

## ntfy

App ntfy, tema **largo y secreto**, p. ej. `NTFY_URL=https://ntfy.sh/puerta-casa-8f3k2q`.

## Código

Descarga: [porte_reed_notification.py](/code/raspberry-pi/porte_reed_notification.py)

Usa `gpiozero.Button` con `pull_up=True`, `bounce_time=0.1`, MQTT discovery para `device_class: door`.

## Home Assistant

Broker Mosquitto + integración MQTT; usuario dedicado para el Pi.

Automatización útil: aviso solo si la puerta **permanece** abierta 5 min (menos ruido que avisar en cada paso).

## systemd

Servicio `porte-reed.service` con `NTFY_URL` y opcionalmente `MQTT_HOST`.

Más: [puerta garaje ESP32](/es/domotica/puerta-garaje-smartphone-esp32-esphome/), [PIR y luces](/es/domotica/raspberry-pi-sensor-movimiento-luces/).

[Todas las guías](/es/domotica/)
