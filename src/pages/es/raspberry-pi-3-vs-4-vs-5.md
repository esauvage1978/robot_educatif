---
layout: ../../layouts/EsPost.astro
title: "Raspberry Pi 3 vs 4 vs 5: ¿cuál comprar en 2026?"
description: "Raspberry Pi 3 Model B, Pi 4 Model B y Pi 5 comparadas: CPU, RAM, USB, Ethernet, PCIe y alimentación. Tabla de datos y una recomendación clara para cada uso."
updated: "23 de octubre de 2026"
---

Entre la **Raspberry Pi 3 Model B**, la **Pi 4 Model B** y la **Pi 5** no solo cambia el precio: **USB 3**, **Gigabit Ethernet real**, **dos salidas de vídeo** y luego **PCIe** y hasta **16 GB de RAM** en la Pi 5 cambian lo que puede hacer un proyecto. Los datos proceden de las páginas oficiales de producto de Raspberry Pi ([Pi 3 B](https://www.raspberrypi.com/products/raspberry-pi-3-model-b/), [Pi 4 B](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/), [Pi 5](https://www.raspberrypi.com/products/raspberry-pi-5/)). Nuestra opinión sobre la marca: [Raspberry Pi](/es/marca-raspberry-pi/).

## 1. Tabla de datos

| | **Pi 3 Model B** | **Pi 4 Model B** | **Raspberry Pi 5** |
|---|---|---|---|
| SoC | Broadcom BCM2837 | Broadcom BCM2711 | Broadcom BCM2712 |
| CPU | 4 × Cortex-A53, 1,2 GHz | 4 × Cortex-A72, 1,8 GHz | 4 × Cortex-A76, 2,4 GHz |
| GPU / vídeo | VideoCore IV, 1 × HDMI estándar | VideoCore VI, 2 × micro-HDMI (4K) | VideoCore VII, 2 × micro-HDMI (4Kp60) |
| RAM | 1 GB LPDDR2 | 1 / 2 / 4 / 8 GB LPDDR4-3200 | 1 / 2 / 4 / 8 / 16 GB LPDDR4X-4267 |
| Ethernet | 100 Mbit/s | Gigabit | Gigabit |
| Wi-Fi / Bluetooth | 802.11n, BT 4.1 | 802.11ac, BT 5.0 | 802.11ac, BT 5.0 |
| USB | 4 × USB 2.0 | 2 × USB 3.0 + 2 × USB 2.0 | 2 × USB 3.0 + 2 × USB 2.0 |
| PCIe | no | no | PCIe 2.0 ×1 |
| Alimentación | micro-USB 5 V, 2,5 A | USB-C 5 V, 3 A | USB-C 5 V, 5 A recomendados |
| GPIO | 40 pines | 40 pines | 40 pines |

## 2. Qué cambia en el día a día

- **Pi 3**: fácil de encontrar de segunda mano y muy documentada, pero **1 GB de RAM** y **sin USB 3** frenan la navegación, la compilación y la transferencia de datos.
- **Pi 4**: **USB 3 + Gigabit real** la convierten, a partir de 4 GB, en un NAS pequeño, servidor o escritorio Linux decente.
- **Pi 5**: CPU más reciente, hasta **16 GB**, **PCIe** para almacenamiento rápido, pero más exigente en **refrigeración** y **alimentación**.

## 3. Precios

Los precios de las Raspberry Pi cambian a menudo (stock, márgenes de las tiendas, IVA). No damos cifras: **consulta el precio** en un [distribuidor autorizado](https://www.raspberrypi.com/resellers/). Comprueba siempre la revisión de la placa y el contenido de la caja (fuente de alimentación, disipador).

## 4. ¿Qué Raspberry Pi para cada uso?

**Quédate con la Pi 3** si reutilizas hardware que ya tienes o para un proyecto muy ligero (GPIO, un sensor, un pequeño script).

**Elige la Pi 4** para un NAS casero modesto, un servidor que necesite caudal, discos USB 3 o un escritorio Linux económico para el día a día.

**Opta por la Pi 5** si necesitas margen de CPU, 8 GB o más o el bus PCIe. Prevé refrigeración activa y la fuente oficial de 27 W.

**Para Home Assistant**, una Pi 5 de 4 GB con un dongle Zigbee funciona bien; la alternativa lista para usar es Home Assistant Green.

**Para adolescentes a medio camino entre la placa sola y el robot**, un kit basado en Pi como el [SunFounder PiCar-X](https://www.sunfounder.com/products/picar-x?ref=tpytgtyp) (enlace de afiliación, Pi no incluida) une ambas cosas. Más robots en la guía [mejor robot programable para niños](/es/mejor-robot-programable-para-ninos/).

## 5. ¿Dónde comprar en España?

Raspberry Pi publica sus distribuidores autorizados país por país en la [página oficial de distribuidores](https://www.raspberrypi.com/resellers/). Para la fuente oficial, elige la versión con **enchufe europeo**.

**En resumen:** Pi 3 = la referencia histórica, hoy justa; Pi 4 = el mejor compromiso para red y USB; Pi 5 = máximo rendimiento y más RAM, a costa de calor y precio.
