---
layout: ../../../layouts/ItPost.astro
title: "Sensore apertura porta (reed) su Raspberry Pi con notifica smartphone"
description: "Contatto magnetico su Raspberry Pi 4 o 5: push gratuito con ntfy ed entità Home Assistant via MQTT. Codice gpiozero completo."
updated: "24 ottobre 2026"
---

Avviso quando si apre ingresso, ripostiglio o armadio: **reed** filare sul Pi, notifica **ntfy** (open source, app iOS/Android) e opzionale sensore « Porta » in Home Assistant.

## Obiettivo

Apertura/chiusura, push su apertura, MQTT opzionale.

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Durata</th>
<th scope="col">Livello</th>
</tr></thead><tbody>
<tr>
<td data-label="Durata"><span class="td-val">~45 min</span></td>
<td data-label="Livello"><span class="td-val">principiante</span></td>
</tr>
</tbody>
</table>
</div>

## Materiale

- Pi 4/5 Bookworm  
- Reed **normally open** ([Amazon.it reed porta](https://www.amazon.it/s?k=sensore+magnetico+porta+reed&tag=roboteducat0f-21))  
- Cavo 2 fili

## Cablaggio

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Reed</th>
<th scope="col">Pi</th>
</tr></thead><tbody>
<tr>
<td data-label="Reed"><span class="td-val">filo 1</span></td>
<td data-label="Pi"><span class="td-val">GPIO17 (pin 11)</span></td>
</tr>
<tr>
<td data-label="Reed"><span class="td-val">filo 2</span></td>
<td data-label="Pi"><span class="td-val">GND (pin 9)</span></td>
</tr>
</tbody>
</table>
</div>

Porta chiusa = aimant = contatto chiuso = GPIO a 0.

## Preparazione Pi

Stesso venv comune dei tutorial (`python3-venv`, `gpiozero`, `lgpio`). `pip install paho-mqtt` se usate HA.

**ntfy**: app + topic **lungo e segreto** — es. `NTFY_URL=https://ntfy.sh/porta-casa-xxxxx`. Topic pubblici su ntfy.sh sono leggibili da chi conosce il nome.

Script: [`/code/raspberry-pi/porte_reed_notification.py`](/code/raspberry-pi/porte_reed_notification.py).

## systemd

Servizio utente `pi`, variabili `NTFY_URL`, `MQTT_HOST`, ecc.

## Privacy

Notifiche solo per **vostro** ingresso; rispettare regolamento condominio e [Garante privacy](https://www.garanteprivacy.it) se combinate con telecamere.

Vedi [PIR e luci](/it/domotica/raspberry-pi-sensore-movimento-luci/), [Zigbee2MQTT](/it/domotica/zigbee2mqtt-o-zha-home-assistant/).

[Tutte le guide](/it/domotica/)
