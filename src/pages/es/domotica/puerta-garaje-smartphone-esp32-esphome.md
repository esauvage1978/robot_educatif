---
layout: ../../../layouts/EsPost.astro
title: "Abrir la puerta del garaje desde el móvil con ESP32, ESPHome y Home Assistant"
description: "Tutorial seguro: relé en contacto seco en paralelo al pulsador, sensor reed, entidad cover en la app, YAML ESPHome completo."
updated: "24 de octubre de 2026"
---

Abrir el garaje desde el móvil y **saber si quedó abierto** es uno de los proyectos más útiles. Un **relé** en **paralelo al pulsador mural** imita un pulso corto. Un **sensor reed** indica cerrado/abierto y Home Assistant muestra una puerta de garaje en la app.

## Seguridad: leer antes

- Confirma en la **notice de la motorización** entrada «pulsador» / «contacto seco» / «paso a paso» (bornes baja tensión). Si no aparece, no continúes.
- **No toques 230 V** sin cualificación: corta alimentación antes de abrir la tapa. Solo bornes de baja tensión.
- Mantén **detección de obstáculos y fotocélulas**.
- Acceso remoto: Home Assistant Cloud o VPN; 2FA. No expongas HA a Internet sin protección.
- **Confirmación** en la app antes de accionar.
- Solo a distancia si **nadie puede quedar bajo la puerta**.

## Objetivo, tiempo y nivel

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Duración</th>
<th scope="col">Nivel</th>
<th scope="col">Presupuesto</th>
</tr></thead><tbody>
<tr>
<td data-label="Duración"><span class="td-val">2–3 h</span></td>
<td data-label="Nivel"><span class="td-val">intermedio</span></td>
<td data-label="Presupuesto"><span class="td-val">ESP32, relé y reed habituales en Amazon.es (tag roboteducat07-21)</span></td>
</tr>
</tbody>
</table>
</div>

## Material

- **ESP32 DevKit** ([buscar en Amazon.es](https://www.amazon.es/s?k=ESP32+DevKit&tag=roboteducat07-21))
- **Relé 1 canal 3,3 V** en la entrada IN ([Amazon.es](https://www.amazon.es/s?k=modulo+rele+3.3V&tag=roboteducat07-21))
- **Contacto reed** ([Amazon.es](https://www.amazon.es/s?k=sensor+magnetico+puerta+garaje&tag=roboteducat07-21))
- Fuente USB 5 V

## Cableado

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Elemento</th>
<th scope="col">Pin</th>
<th scope="col">Hacia</th>
</tr></thead><tbody>
<tr>
<td data-label="Elemento"><span class="td-val">Relé VCC</span></td>
<td data-label="Pin"><span class="td-val"></span></td>
<td data-label="Hacia"><span class="td-val">3V3 (o 5 V según módulo)</span></td>
</tr>
<tr>
<td data-label="Elemento"><span class="td-val">Relé GND</span></td>
<td data-label="Pin"><span class="td-val"></span></td>
<td data-label="Hacia"><span class="td-val">GND</span></td>
</tr>
<tr>
<td data-label="Elemento"><span class="td-val">Relé IN</span></td>
<td data-label="Pin"><span class="td-val"></span></td>
<td data-label="Hacia"><span class="td-val"><strong>GPIO26</strong></span></td>
</tr>
<tr>
<td data-label="Elemento"><span class="td-val">Relé COM/NO</span></td>
<td data-label="Pin"><span class="td-val">contacto seco</span></td>
<td data-label="Hacia"><span class="td-val">bornes pulsador motor</span></td>
</tr>
<tr>
<td data-label="Elemento"><span class="td-val">Reed</span></td>
<td data-label="Pin"><span class="td-val"></span></td>
<td data-label="Hacia"><span class="td-val"><strong>GPIO27</strong> y GND</span></td>
</tr>
</tbody>
</table>
</div>

Relé **en paralelo** al pulsador. Reed cerrado con puerta **completamente** cerrada.

## Código ESPHome

Descarga: [porte-garage.yaml](/code/esphome/porte-garage.yaml)

substitutions:
  nom: porte-garage
  gpio_relais: GPIO26
  gpio_reed: GPIO27
  duree_impulsion: 700ms

esphome:
  name: ${nom}
  friendly_name: Puerta garaje

esp32:
  board: esp32dev
  framework:
    type: esp-idf

api:
  encryption:
    key: !secret api_key

ota:
  - platform: esphome
    password: !secret ota_password

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password

binary_sensor:
  - platform: gpio
    id: reed_fermee
    name: "Puerta cerrada (sensor)"
    pin:
      number: ${gpio_reed}
      mode:
        input: true
        pullup: true
      inverted: true
    filters:
      - delayed_on_off: 200ms

switch:
  - platform: gpio
    id: relais
    pin: ${gpio_relais}
    restore_mode: ALWAYS_OFF
    internal: true
    on_turn_on:
      - delay: ${duree_impulsion}
      - switch.turn_off: relais

script:
  - id: impulsion
    mode: single
    then:
      - switch.turn_on: relais
      - delay: 2s

cover:
  - platform: template
    id: garage
    name: "Puerta garaje"
    device_class: garage
    lambda: |-
      return id(reed_fermee).state ? COVER_CLOSED : COVER_OPEN;
    open_action:
      - if:
          condition:
            binary_sensor.is_on: reed_fermee
          then:
            - script.execute: impulsion
    close_action:
      - if:
          condition:
            binary_sensor.is_off: reed_fermee
          then:
            - script.execute: impulsion
    stop_action:
      - script.execute: impulsion

Primer flash por USB; luego OTA. Ajusta `700ms` según manual (0,5–1 s).

## Home Assistant

Tarjeta con confirmación y alerta si lleva 15 min abierta (adapta `entity_id`).

Tras corte de luz el ESP32 reinicia solo; relé en reposo (`ALWAYS_OFF`).

## Truco del tutorial

`open_action` solo impulsa si el reed dice «cerrado» y `close_action` si «abierto», evitando cerrar por error con un solo botón.

Más: [sensor ESP32 ESPHome](/es/domotica/esp32-esphome-sensor-temperatura/), [proyectos ESP32](/es/domotica/proyectos-esp32-domotica/), [sensor de puerta en Raspberry Pi](/es/domotica/raspberry-pi-sensor-puerta-notificacion/).

[Todas las guías](/es/domotica/)
