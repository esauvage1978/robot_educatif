---
layout: ../../../layouts/EsPost.astro
title: "Mejor dongle Zigbee para Home Assistant (2026): comparativa"
description: "¿SONOFF ZBDongle-E, Home Assistant Connect ZBT-2, SONOFF Dongle Lite MG21 o ConBee II? Chips, soporte de Thread y compatibilidad con ZHA y Zigbee2MQTT comparados."
updated: "24 de octubre de 2026"
---

Para controlar aparatos Zigbee desde **Home Assistant** necesitas un **coordinador Zigbee**: un dongle USB con un chip de radio. Zigbee emite **a 2,4 GHz en todo el mundo**, así que los mismos dongles funcionan en España; solo cambian las tiendas y el stock. La tabla recoge chips y funciones según las páginas de los fabricantes; no hemos medido el alcance, por eso no damos cifras de cobertura.

## 1. Tabla comparativa

| Modelo | Chip | Antena | Thread / Matter | ZHA | Zigbee2MQTT | Ideal para |
|---|---|---|---|---|---|---|
| **SONOFF ZBDongle-E** | Silicon Labs EFR32MG21 | externa | no de serie (firmware Zigbee) | sí | sí | la mayoría: muy bien documentado |
| **Home Assistant Connect ZBT-2** | Silicon Labs MG24 | interna, en carcasa optimizada | sí (firmware Thread seleccionable) | sí | sí | soporte oficial de Nabu Casa, preparado para Thread |
| **SONOFF Dongle Lite MG21** | Silicon Labs EFR32MG21 | interna | no de serie | sí | sí | presupuesto mínimo, pisos pequeños |
| **ConBee II** (dresden elektronik) | firmware deCONZ | interna | no | sí | sí | quien ya usa deCONZ / Phoscon |

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
