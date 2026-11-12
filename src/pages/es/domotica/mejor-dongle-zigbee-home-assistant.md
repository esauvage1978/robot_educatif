---
layout: ../../../layouts/EsPost.astro
title: "Mejor dongle Zigbee para Home Assistant (2026): comparativa"
description: "¿SONOFF ZBDongle-E, Home Assistant Connect ZBT-2, SONOFF Dongle Lite MG21 o ConBee II? Chips, soporte de Thread y compatibilidad con ZHA y Zigbee2MQTT comparados."
updated: "24 de octubre de 2026"
---

Para controlar aparatos Zigbee desde **Home Assistant** necesitas un **coordinador Zigbee**: un dongle USB con un chip de radio. Zigbee emite **a 2,4 GHz en todo el mundo**, así que los mismos dongles funcionan en España; solo cambian las tiendas y el stock. La tabla recoge chips y funciones según las páginas de los fabricantes; no hemos medido el alcance, por eso no damos cifras de cobertura.

## 1. Tabla comparativa

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Modelo</th>
<th scope="col">Chip</th>
<th scope="col">Antena</th>
<th scope="col">Thread / Matter</th>
<th scope="col">ZHA</th>
<th scope="col">Zigbee2MQTT</th>
<th scope="col">Ideal para</th>
</tr></thead><tbody>
<tr>
<td data-label="Modelo"><span class="td-val"><strong>SONOFF ZBDongle-E</strong></span></td>
<td data-label="Chip"><span class="td-val">Silicon Labs EFR32MG21</span></td>
<td data-label="Antena"><span class="td-val">externa</span></td>
<td data-label="Thread / Matter"><span class="td-val">no de serie (firmware Zigbee)</span></td>
<td data-label="ZHA"><span class="td-val">sí</span></td>
<td data-label="Zigbee2MQTT"><span class="td-val">sí</span></td>
<td data-label="Ideal para"><span class="td-val">la mayoría: muy bien documentado</span></td>
</tr>
<tr>
<td data-label="Modelo"><span class="td-val"><strong>Home Assistant Connect ZBT-2</strong></span></td>
<td data-label="Chip"><span class="td-val">Silicon Labs MG24</span></td>
<td data-label="Antena"><span class="td-val">interna, en carcasa optimizada</span></td>
<td data-label="Thread / Matter"><span class="td-val">sí (firmware Thread seleccionable)</span></td>
<td data-label="ZHA"><span class="td-val">sí</span></td>
<td data-label="Zigbee2MQTT"><span class="td-val">sí</span></td>
<td data-label="Ideal para"><span class="td-val">soporte oficial de Nabu Casa, preparado para Thread</span></td>
</tr>
<tr>
<td data-label="Modelo"><span class="td-val"><strong>SONOFF Dongle Lite MG21</strong></span></td>
<td data-label="Chip"><span class="td-val">Silicon Labs EFR32MG21</span></td>
<td data-label="Antena"><span class="td-val">interna</span></td>
<td data-label="Thread / Matter"><span class="td-val">no de serie</span></td>
<td data-label="ZHA"><span class="td-val">sí</span></td>
<td data-label="Zigbee2MQTT"><span class="td-val">sí</span></td>
<td data-label="Ideal para"><span class="td-val">presupuesto mínimo, pisos pequeños</span></td>
</tr>
<tr>
<td data-label="Modelo"><span class="td-val"><strong>ConBee II</strong> (dresden elektronik)</span></td>
<td data-label="Chip"><span class="td-val">firmware deCONZ</span></td>
<td data-label="Antena"><span class="td-val">interna</span></td>
<td data-label="Thread / Matter"><span class="td-val">no</span></td>
<td data-label="ZHA"><span class="td-val">sí</span></td>
<td data-label="Zigbee2MQTT"><span class="td-val">sí</span></td>
<td data-label="Ideal para"><span class="td-val">quien ya usa deCONZ / Phoscon</span></td>
</tr>
</tbody>
</table>
</div>

Páginas oficiales: [SONOFF ZBDongle-E](https://sonoff.tech/products/sonoff-zigbee-3-0-usb-dongle-plus-zbdongle-e), [Home Assistant Connect ZBT-2](https://www.home-assistant.io/connect/zbt-2/), [ConBee II](https://phoscon.de/en/conbee2). Los precios cambian a menudo: consulta el precio en la tienda.

## 2. ¿ZHA o Zigbee2MQTT?

- **ZHA** viene integrado en Home Assistant: el camino más sencillo para empezar.
- **Zigbee2MQTT** admite una lista de aparatos muy amplia y ofrece más detalle, pero necesita el complemento de un broker MQTT.

Los cuatro dongles de arriba funcionan con ambos.

## 3. Consejos de instalación

1. Usa un **alargador USB** (alrededor de 1 m) para alejar el dongle del ordenador y de los puertos USB 3, que interfieren con los 2,4 GHz.
2. Separa los canales Zigbee y Wi-Fi (por ejemplo, canal Zigbee 15, 20 o 25).
3. Añade pronto **aparatos Zigbee conectados a la red eléctrica** (enchufes): hacen de repetidores y refuerzan la malla.

## 4. ¿Dónde comprar?

El hardware de SONOFF y de Home Assistant se vende en distribuidores oficiales y en los grandes marketplaces también en España. Antes de pedir, comprueba la disponibilidad en las páginas oficiales de arriba.

¿Buscas una central? Mira [Home Assistant Green vs Raspberry Pi 5](/es/domotica/home-assistant-green-vs-raspberry-pi-5/).

[Todas las guías de domótica](/es/domotica/)
