---
layout: ../../layouts/EsPost.astro
title: "Shelly Gen4: qué módulo elegir para domótica (1, 1PM, 2PM, i4, 1L)"
description: "Comparativa de los módulos Shelly Gen4 empotrables: carga máxima, medición de consumo, neutro, Wi-Fi, Zigbee y Matter. Datos oficiales de Shelly y consejos para Home Assistant."
updated: "23 de octubre de 2026"
---

Los módulos **Shelly Gen4** se instalan detrás de un interruptor o enchufe existente y convierten en «inteligentes» luces, persianas o aparatos sin cambiar los mecanismos. Todos los modelos de esta página admiten **Wi-Fi, Bluetooth, Zigbee 3.0 y Matter** y funcionan con la app de Shelly, Home Assistant, Google Home, Alexa y SmartThings. No los hemos probado: los datos proceden de la [base de conocimiento oficial de Shelly](https://kb.shelly.cloud/knowledge-base/) y de la [tienda Shelly España](https://www.shelly.com/es), consultadas el 23 de octubre de 2026.

<aside class="article-callout" role="note"><p><strong>Seguridad</strong></p><p>Estos módulos se conectan a la red de 230 V. La instalación en la caja de mecanismos debe hacerla un instalador electricista autorizado, conforme al REBT.</p></aside>

## 1. Tabla comparativa (datos del fabricante)

| | Shelly 1 Gen4 | Shelly 1PM Gen4 | Shelly 2PM Gen4 | Shelly i4 Gen4 | Shelly 1L Gen4 |
|---|---|---|---|---|---|
| Uso típico | relé de contacto libre de potencial (luces, puertas, caldera) | relé con medición de consumo | 2 canales o persiana, con medición | 4 entradas para pulsadores/escenas (sin relé) | luces sin neutro |
| Corriente / potencia máx. | 16 A a 240 V~ | 16 A a 240 V~ | 10 A por canal, 16 A en total | — | 200 W |
| Medición de consumo | no | sí (tensión, corriente) | sí | no | no |
| Necesita neutro | sí | sí | sí | sí | no (Shelly Bypass incluido, necesario con LED) |
| Alimentación | 110–240 V~, 24–48 V⎓, 12 V⎓ | 110–240 V~, 24–30 V⎓ | 110–240 V~, 24 V⎓ | 110–240 V~ | 220–240 V~ |
| Medidas (al×an×prof) | 37×42×16 mm | 37×42×16 mm | 37×42×16 mm | 37×42×15 mm | 41×42×16 mm |
| Wi-Fi | 802.11 b/g/n/ax | 802.11 b/g/n/ax | 802.11 b/g/n/ax | 802.11 b/g/n/ax | 802.11 b/g/n |
| Zigbee 3.0 / Matter | sí / sí | sí / sí | sí / sí | sí / sí | sí / sí |

Fuentes: fichas KB [Shelly 1 Gen4](https://kb.shelly.cloud/knowledge-base/shelly-1-gen4), [1PM Gen4](https://kb.shelly.cloud/knowledge-base/shelly-1pm-gen4), [2PM Gen4](https://kb.shelly.cloud/knowledge-base/shelly-2pm-gen4), [i4 Gen4](https://kb.shelly.cloud/knowledge-base/shelly-i4-gen4), [1L Gen4](https://kb.shelly.cloud/knowledge-base/shelly-1l-gen4). Protección previa exigida por el fabricante: magnetotérmico curva B o C, máx. 16 A (10 A para el 1L).

## 2. ¿Cuál elegir?

- **Encender una luz o mandar una puerta/caldera** (contacto libre): **Shelly 1 Gen4**.
- **Lo mismo, pero viendo el consumo** (termo, lavadora, radiador): **Shelly 1PM Gen4**.
- **Dos puntos de luz o una persiana**: **Shelly 2PM Gen4** (ojo al límite de 10 A por canal).
- **Pulsadores que lanzan escenas** en Home Assistant, sin conmutar una carga: **Shelly i4 Gen4**.
- **Caja sin cable de neutro** (habitual en instalaciones antiguas): **Shelly 1L Gen4**, con el Bypass incluido para bombillas LED, y como máximo 200 W.

## 3. Con Home Assistant

Los Gen4 se integran en local con la integración Shelly de Home Assistant por Wi-Fi, o se pueden añadir como dispositivos Zigbee o Matter. Por Wi-Fi también se aprovechan los scripts y el MQTT integrados (según la KB). Para elegir el equipo de Home Assistant, lee nuestra comparativa [Raspberry Pi 3 vs 4 vs 5](/es/raspberry-pi-3-vs-4-vs-5/).

## 4. Dónde comprar

Todos los modelos se venden en la tienda oficial Shelly España, que el 23 de octubre de 2026 los mostraba disponibles: [Shelly 1 Gen4](https://www.awin1.com/cread.php?awinmid=121790&awinaffid=3126073&ued=https%3A%2F%2Fwww.shelly.com%2Fes%2Fproducts%2Fshelly-1-gen4), [Shelly 1PM Gen4](https://www.awin1.com/cread.php?awinmid=121790&awinaffid=3126073&ued=https%3A%2F%2Fwww.shelly.com%2Fes%2Fproducts%2Fshelly-1pm-gen4), [Shelly 2PM Gen4](https://www.awin1.com/cread.php?awinmid=121790&awinaffid=3126073&ued=https%3A%2F%2Fwww.shelly.com%2Fes%2Fproducts%2Fshelly-2pm-gen4), [Shelly i4 Gen4](https://www.awin1.com/cread.php?awinmid=121790&awinaffid=3126073&ued=https%3A%2F%2Fwww.shelly.com%2Fes%2Fproducts%2Fshelly-i4-gen4), [Shelly 1L Gen4](https://www.awin1.com/cread.php?awinmid=121790&awinaffid=3126073&ued=https%3A%2F%2Fwww.shelly.com%2Fes%2Fproducts%2Fshelly-1l-gen4) (enlaces de afiliación). Los precios cambian: consulta el precio en la web en el momento de comprar.

**En resumen:** 1 Gen4 para mandar, 1PM Gen4 para mandar y medir, 2PM para dos canales o persianas, i4 para pulsadores, 1L si no hay neutro.
