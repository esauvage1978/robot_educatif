---
layout: ../../../layouts/EsPost.astro
title: "Home Assistant Green vs Raspberry Pi 5: ¿cuál elegir (2026)?"
description: "¿Home Assistant Green o Raspberry Pi 5 como central domótica? Datos oficiales cara a cara, qué trae la caja, qué hay que añadir y para quién es cada uno."
updated: "24 de octubre de 2026"
---

Los dos ejecutan **Home Assistant OS** y los dos son una central domótica local excelente. La diferencia está en **sencillez frente a flexibilidad**. Los datos proceden de las páginas oficiales: [Home Assistant Green](https://www.home-assistant.io/green/) y [Raspberry Pi 5](https://www.raspberrypi.com/products/raspberry-pi-5/) (consultadas el 21 de octubre de 2026). No hemos hecho pruebas de rendimiento propias.

## 1. Los datos cara a cara

| | Home Assistant Green | [Raspberry Pi](/es/marca-raspberry-pi/) 5 (4 GB u 8 GB) |
|---|---|---|
| En la caja | aparato listo: carcasa, almacenamiento, fuente de alimentación | solo la placa |
| Procesador | quad-core Cortex-A55, 1,8 GHz | quad-core Cortex-A76, 2,4 GHz |
| RAM | 4 GB LPDDR4X | 4 u 8 GB LPDDR4X (también 1, 2 y 16 GB) |
| Almacenamiento | 32 GB eMMC integrados | microSD o SSD NVMe mediante expansión PCIe |
| USB | 2 × USB 2.0 | 2 × USB 3.0 + 2 × USB 2.0 |
| Ethernet | Gigabit | Gigabit |
| Wi-Fi | no (solo Ethernet) | integrado (para una central se recomienda igualmente Ethernet) |
| Alimentación | fuente universal incluida | comprar aparte la fuente oficial USB-C de 27 W (existe con enchufe europeo) |
| Refrigeración | sin ventilador | se recomienda el Active Cooler |
| Puesta en marcha | conectar Ethernet y corriente, abrir homeassistant.local:8123 | grabar Home Assistant OS con Raspberry Pi Imager y arrancar |
| Precio | consulta el precio | consulta el precio (solo placa: añadir fuente, carcasa y almacenamiento) |

En Amazon.es: <a href="https://www.amazon.es/dp/B0CK3L9WD3?tag=roboteducat07-21" rel="sponsored nofollow">Raspberry Pi 5 4 GB</a> o <a href="https://www.amazon.es/dp/B0CK2FCG1K?tag=roboteducat07-21" rel="sponsored nofollow">Raspberry Pi 5 8 GB</a> (enlaces de afiliado).

## 2. ¿Para quién es el Green?

- Quieres una **caja silenciosa que simplemente funcione**, con el soporte oficial de Nabu Casa.
- No piensas en ampliaciones exigentes, como el análisis de vídeo de varias cámaras.
- No te apetece comprar y montar por separado fuente, carcasa, disipador y almacenamiento.

## 3. ¿Para quién es una Raspberry Pi 5?

- Ya tienes una Pi 5 o te gusta trastear.
- Quieres **más CPU y RAM** (8 GB) para ampliaciones, o un **SSD NVMe** para una fiabilidad a largo plazo.
- Te interesa el conector GPIO de 40 pines para tus propios sensores.

¿Quieres comparar generaciones? Lee [Raspberry Pi 3 vs 4 vs 5](/es/raspberry-pi-3-vs-4-vs-5/).

## 4. Notas para España

- **Alimentación**: la fuente del Green es universal (100–240 V); para la Pi 5, compra la **fuente oficial con enchufe europeo** en lugar de un cargador de móvil.
- **Disponibilidad**: los dos se venden a través de distribuidores oficiales también en España. El stock varía, así que comprueba la disponibilidad en las páginas oficiales enlazadas arriba.

## 5. En cualquier caso: añade un coordinador Zigbee

Ninguno de los dos trae Zigbee integrado. Conecta un coordinador USB con un alargador corto para reducir interferencias: mira [el mejor dongle Zigbee para Home Assistant](/es/domotica/mejor-dongle-zigbee-home-assistant/).

**En resumen:** Green para no complicarte; Pi 5 para potencia y flexibilidad.

[Todas las guías de domótica](/es/domotica/)
