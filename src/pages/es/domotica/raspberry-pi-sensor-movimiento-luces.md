---
layout: ../../../layouts/EsPost.astro
title: "PIR en Raspberry Pi: luces con Home Assistant"
description: "Sensor HC-SR501 en Raspberry Pi 4/5, MQTT y automatización de luz en pasillo. Cableado GPIO, script Python y FAQ."
updated: "2 de noviembre de 2026"
---

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/es/domotica/">Domótica</a> · PIR y luces</nav>

> **Respuesta rápida (noviembre 2026)** — Un **PIR** (infrarrojo pasivo) en **GPIO** avisa a **Home Assistant (HA)**; HA enciende la luz conectada (Zigbee, Wi-Fi o cableada vía relé). El Pi **no conmuta 230 V** directamente.

Guía del [hub domótica](/es/domotica/). Encender el pasillo o el trastero al pasar, sin interruptor: solución sencilla antes de sensores Zigbee en pilas.

![Esquema típico: módulo PIR HC-SR501 cableado a Raspberry Pi](/images/blog-thumbnails/raspberry-pi-detecteur-presence-pir-eclairage.webp)

*Ilustración: montaje PIR + Pi (consulte la tabla de pines abajo).*

## Objetivo

- Detectar movimiento en **GPIO**.  
- Crear entidad «Presencia» en HA vía **MQTT** (Message Queuing Telemetry Transport).  
- Encender luz y apagar tras 2 min sin movimiento.

## Material y cableado

**HC-SR501** ([Amazon.es](https://www.amazon.es/s?k=HC-SR501&tag=roboteducat07-21)), alimentación 5 V, salida 3,3 V compatible con GPIO:

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">PIR</th>
<th scope="col">Pi (40 pines)</th>
</tr></thead><tbody>
<tr>
<td data-label="PIR"><span class="td-val">VCC</span></td>
<td data-label="Pi (40 pines)"><span class="td-val">pin 2 (5V)</span></td>
</tr>
<tr>
<td data-label="PIR"><span class="td-val">OUT</span></td>
<td data-label="Pi (40 pines)"><span class="td-val">pin 7 (GPIO4)</span></td>
</tr>
<tr>
<td data-label="PIR"><span class="td-val">GND</span></td>
<td data-label="Pi (40 pines)"><span class="td-val">pin 6 (GND)</span></td>
</tr>
</tbody>
</table>
</div>

Jumper en **H** (repetición), temporización del módulo al mínimo; HA gestiona el tiempo de luz. Espere ~1 min de estabilización tras encender el PIR.

## Código

Descarga: [presence_pir_mqtt.py](/code/raspberry-pi/presence_pir_mqtt.py) — usa **gpiozero** (no RPi.GPIO en Pi 5), `device_class: occupancy`.

Automatización recomendada (`mode: restart`):

alias: Luz pasillo con presencia
mode: restart
triggers:
  - trigger: state
    entity_id: binary_sensor.raspberry_pi_pir_pi_pir_couloir_presence
    to: "on"
actions:
  - action: light.turn_on
    target:
      entity_id: light.pasillo
  - wait_for_trigger:
      - trigger: state
        entity_id: binary_sensor.raspberry_pi_pir_pi_pir_couloir_presence
        to: "off"
        for: "00:02:00"
  - action: light.turn_off
    target:
      entity_id: light.pasillo

## Truco: luz nocturna atenuada

Entre 23:00 y 6:00, `brightness_pct: 15` en `light.turn_on` para no despertar a la familia (mejor con bombilla dimmable).

## Errores frecuentes

- **Pi 5:** use gpiozero + lgpio, no RPi.GPIO legacy.  
- **Falsos disparos:** ventana, radiador o corriente de aire en el cono del PIR.  
- **230 V:** nunca soldar red eléctrica al GPIO; use enchufes inteligentes o relés en caja adecuada.

## FAQ

**¿PIR o sensor Zigbee?**  
PIR + Pi = económico y educativo. Zigbee = sin cable USB, ideal habitaciones lejanas: [sensor temperatura Zigbee](/es/domotica/sensor-temperatura-zigbee/).

**¿Necesito MQTT?**  
Recomendado para descubrir entidades en HA; alternativa: script + REST API.

**¿Qué Pi comprar?**  
Compare [Raspberry Pi 3 vs 4 vs 5](/es/raspberry-pi-3-vs-4-vs-5/) — Pi 4 4 GB suele bastar para HA + este script.

Más: [sensor de puerta](/es/domotica/raspberry-pi-sensor-puerta-notificacion/), [cómo empezar](/es/domotica/como-empezar/), [instalar Home Assistant](/es/domotica/instalar-home-assistant-raspberry-pi-5/).

[Todas las guías domótica](/es/domotica/)
