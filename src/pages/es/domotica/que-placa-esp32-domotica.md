---
layout: ../../../layouts/EsPost.astro
title: "Qué placa ESP32 elegir para domótica: ESP32, S3, C3, C6 o H2"
description: "Comparativa Espressif: núcleos, Wi-Fi, Bluetooth, Thread/Zigbee y GPIO. Elección para ESPHome, cámara o Thread con Home Assistant."
updated: "3 de noviembre de 2026"
---

<nav class="breadcrumb" aria-label="Miga de pan"><a href="/es/domotica/">Domótica</a> · ESP32</nav>

**Respuesta directa (noviembre 2026)** — Para la mayoría de tutoriales [ESPHome](https://esphome.io/) (*firmware open source para microcontroladores*) con [Home Assistant](/es/domotica/) (*plataforma domótica*), la **ESP32 clásica (DevKitC)** sigue siendo la opción más documentada. Elige **ESP32-S3** si necesitas cámara o más GPIO; **ESP32-C6** si quieres **Thread** (*red IPv6 de bajo consumo*) además de Wi-Fi 6.

« ESP32 » hoy es toda una familia de chips **Espressif**. En un proyecto domótico, la elección cambia Bluetooth, Thread, USB nativo, etc. Cinco chips habituales en placas de desarrollo, con datos de [Espressif](https://www.espressif.com/en/products/socs). Si acabas de llegar a la domótica, empieza por [cómo empezar en domótica](/es/domotica/como-empezar/).

![Placa ESP32-C6 DevKit — referencia visual](/images/products/esp32-c6-devkitc.webp)

*Foto: placa ESP32-C6 DevKit (material de referencia producto).*

## Lo esencial en una tabla

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Chip</th>
<th scope="col">Núcleos / frec. máx.</th>
<th scope="col">Wi-Fi</th>
<th scope="col">Bluetooth</th>
<th scope="col">IEEE 802.15.4 (Thread, Zigbee)</th>
<th scope="col">USB nativo</th>
<th scope="col">SRAM</th>
</tr></thead><tbody>
<tr>
<td data-label="Chip"><span class="td-val"><strong>ESP32</strong> (clásico)</span></td>
<td data-label="Núcleos / frec. máx."><span class="td-val">2 × Xtensa LX6, 240 MHz</span></td>
<td data-label="Wi-Fi"><span class="td-val">Wi-Fi 4, 2,4 GHz</span></td>
<td data-label="Bluetooth"><span class="td-val">Classic + BLE 4.2</span></td>
<td data-label="IEEE 802.15.4 (Thread, Zigbee)"><span class="td-val">no</span></td>
<td data-label="USB nativo"><span class="td-val">no</span></td>
<td data-label="SRAM"><span class="td-val">520 KB</span></td>
</tr>
<tr>
<td data-label="Chip"><span class="td-val"><strong>ESP32-S3</strong></span></td>
<td data-label="Núcleos / frec. máx."><span class="td-val">2 × Xtensa LX7, 240 MHz</span></td>
<td data-label="Wi-Fi"><span class="td-val">Wi-Fi 4, 2,4 GHz</span></td>
<td data-label="Bluetooth"><span class="td-val">BLE 5</span></td>
<td data-label="IEEE 802.15.4 (Thread, Zigbee)"><span class="td-val">no</span></td>
<td data-label="USB nativo"><span class="td-val">sí (OTG)</span></td>
<td data-label="SRAM"><span class="td-val">512 KB</span></td>
</tr>
<tr>
<td data-label="Chip"><span class="td-val"><strong>ESP32-C3</strong></span></td>
<td data-label="Núcleos / frec. máx."><span class="td-val">1 × RISC-V, 160 MHz</span></td>
<td data-label="Wi-Fi"><span class="td-val">Wi-Fi 4, 2,4 GHz</span></td>
<td data-label="Bluetooth"><span class="td-val">BLE 5</span></td>
<td data-label="IEEE 802.15.4 (Thread, Zigbee)"><span class="td-val">no</span></td>
<td data-label="USB nativo"><span class="td-val">serie/JTAG</span></td>
<td data-label="SRAM"><span class="td-val">400 KB</span></td>
</tr>
<tr>
<td data-label="Chip"><span class="td-val"><strong>ESP32-C6</strong></span></td>
<td data-label="Núcleos / frec. máx."><span class="td-val">1 × RISC-V 160 MHz + bajo consumo</span></td>
<td data-label="Wi-Fi"><span class="td-val"><strong>Wi-Fi 6</strong>, 2,4 GHz</span></td>
<td data-label="Bluetooth"><span class="td-val">BLE 5</span></td>
<td data-label="IEEE 802.15.4 (Thread, Zigbee)"><span class="td-val"><strong>sí</strong></span></td>
<td data-label="USB nativo"><span class="td-val">serie/JTAG</span></td>
<td data-label="SRAM"><span class="td-val">512 KB</span></td>
</tr>
<tr>
<td data-label="Chip"><span class="td-val"><strong>ESP32-H2</strong></span></td>
<td data-label="Núcleos / frec. máx."><span class="td-val">1 × RISC-V, 96 MHz</span></td>
<td data-label="Wi-Fi"><span class="td-val"><strong>no</strong></span></td>
<td data-label="Bluetooth"><span class="td-val">BLE 5</span></td>
<td data-label="IEEE 802.15.4 (Thread, Zigbee)"><span class="td-val"><strong>sí</strong></span></td>
<td data-label="USB nativo"><span class="td-val">serie/JTAG</span></td>
<td data-label="SRAM"><span class="td-val">320 KB</span></td>
</tr>
</tbody>
</table>
</div>

**Recomendación para empezar: ESP32 clásico (DevKitC).** Muy documentado en ESPHome y suficiente para casi todos los proyectos de [10 proyectos ESP32](/es/domotica/proyectos-esp32-domotica/). **ESP32-S3** para cámara o más pines; **ESP32-C6** si quieres preparar Thread.

## ESP32 clásico: la opción segura

Dos núcleos, Wi-Fi y Bluetooth Classic, muchos GPIO: el chip del [sensor de temperatura ESPHome](/es/domotica/esp32-esphome-sensor-temperatura/) y [puerta de garaje](/es/domotica/puerta-garaje-smartphone-esp32-esphome/). Bluetooth sirve de **proxy BLE** (*puente Bluetooth Low Energy*) en Home Assistant.

## ESP32-S3: más pines y USB

USB OTG, más GPIO, útil para cámara y pantalla. Sin Bluetooth Classic, solo BLE 5.

## ESP32-C3: pequeño y económico

Un núcleo RISC-V, Wi-Fi y BLE 5: basta para sensor o relé. Placas muy compactas.

## ESP32-C6 y H2: radio Thread y Zigbee

El **C6** une **Wi-Fi 6**, BLE 5 e **IEEE 802.15.4** (Thread/Zigbee). El **H2** no tiene Wi-Fi: pensado para Thread/Zigbee a pilas. Soporte en ESPHome aún evoluciona: consulta [documentación ESPHome](https://esphome.io/components/esp32/). Más contexto en [protocolos domóticos](/es/domotica/protocolos-domotica-zigbee-wifi-thread-matter/).

## Flashear ESPHome (primer paso práctico)

1. Instala **ESPHome** en Home Assistant o en un PC con Python.  
2. Crea un YAML mínimo con el chip elegido (`esp32`, `esp32s3`, `esp32c6`, …).  
3. Conecta la placa por USB y lanza **Install** / compilación OTA según el tutorial.  
Guía detallada : [sensor de temperatura ESPHome paso a paso](/es/domotica/esp32-esphome-sensor-temperatura/) (incluye cableado y primer flash).

## Consejos de compra

- **Placa de desarrollo** con USB, regulador y reset.
- **Conector** USB-C o micro-USB y chip USB-serie si hace falta.
- **Flash**: 4 MB para ESPHome; 8 MB+ y PSRAM para cámara.
- **Alimentación**: 5 V USB; uso fijo con buen cargador.

## FAQ

**¿C6 sustituye a un coordinador Zigbee USB?**  
No: el C6 puede participar en **Thread** vía ESPHome, pero un dongle Zigbee dedicado sigue siendo lo habitual — ver [mejor dongle Zigbee](/es/domotica/mejor-dongle-zigbee-home-assistant/).

**¿Puedo reutilizar la misma placa en varios proyectos?**  
Sí, reflasheando el firmware ESPHome cuando cambies de montaje (documenta el pinout).

Luego: [tuto ESPHome](/es/domotica/esp32-esphome-sensor-temperatura/) e ideas en [proyectos ESP32](/es/domotica/proyectos-esp32-domotica/).

[Todas las guías domótica](/es/domotica/)
