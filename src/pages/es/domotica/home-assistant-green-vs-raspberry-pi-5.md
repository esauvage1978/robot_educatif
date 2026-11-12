---
layout: ../../../layouts/EsPost.astro
title: "Home Assistant Green vs Raspberry Pi 5: ¿cuál elegir (2026)?"
description: "¿Home Assistant Green o Raspberry Pi 5 como central domótica? Datos oficiales cara a cara, qué trae la caja, qué hay que añadir y para quién es cada uno."
updated: "24 de octubre de 2026"
---

Los dos ejecutan **Home Assistant OS** y los dos son una central domótica local excelente. La diferencia está en **sencillez frente a flexibilidad**. Los datos proceden de las páginas oficiales: [Home Assistant Green](https://www.home-assistant.io/green/) y [Raspberry Pi 5](https://www.raspberrypi.com/products/raspberry-pi-5/) (consultadas el 21 de octubre de 2026). No hemos hecho pruebas de rendimiento propias.

## 1. Los datos cara a cara

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col"> </th>
<th scope="col">Home Assistant Green</th>
<th scope="col"><a href="/es/marca-raspberry-pi/">Raspberry Pi</a> 5 (4 GB u 8 GB)</th>
</tr></thead><tbody>
<tr>
<td><span class="td-val">En la caja</span></td>
<td data-label="Home Assistant Green"><span class="td-val">aparato listo: carcasa, almacenamiento, fuente de alimentación</span></td>
<td data-label="[Raspberry Pi](/es/marca-raspberry-pi/) 5 (4 GB u 8 GB)"><span class="td-val">solo la placa</span></td>
</tr>
<tr>
<td><span class="td-val">Procesador</span></td>
<td data-label="Home Assistant Green"><span class="td-val">quad-core Cortex-A55, 1,8 GHz</span></td>
<td data-label="[Raspberry Pi](/es/marca-raspberry-pi/) 5 (4 GB u 8 GB)"><span class="td-val">quad-core Cortex-A76, 2,4 GHz</span></td>
</tr>
<tr>
<td><span class="td-val">RAM</span></td>
<td data-label="Home Assistant Green"><span class="td-val">4 GB LPDDR4X</span></td>
<td data-label="[Raspberry Pi](/es/marca-raspberry-pi/) 5 (4 GB u 8 GB)"><span class="td-val">4 u 8 GB LPDDR4X (también 1, 2 y 16 GB)</span></td>
</tr>
<tr>
<td><span class="td-val">Almacenamiento</span></td>
<td data-label="Home Assistant Green"><span class="td-val">32 GB eMMC integrados</span></td>
<td data-label="[Raspberry Pi](/es/marca-raspberry-pi/) 5 (4 GB u 8 GB)"><span class="td-val">microSD o SSD NVMe mediante expansión PCIe</span></td>
</tr>
<tr>
<td><span class="td-val">USB</span></td>
<td data-label="Home Assistant Green"><span class="td-val">2 × USB 2.0</span></td>
<td data-label="[Raspberry Pi](/es/marca-raspberry-pi/) 5 (4 GB u 8 GB)"><span class="td-val">2 × USB 3.0 + 2 × USB 2.0</span></td>
</tr>
<tr>
<td><span class="td-val">Ethernet</span></td>
<td data-label="Home Assistant Green"><span class="td-val">Gigabit</span></td>
<td data-label="[Raspberry Pi](/es/marca-raspberry-pi/) 5 (4 GB u 8 GB)"><span class="td-val">Gigabit</span></td>
</tr>
<tr>
<td><span class="td-val">Wi-Fi</span></td>
<td data-label="Home Assistant Green"><span class="td-val">no (solo Ethernet)</span></td>
<td data-label="[Raspberry Pi](/es/marca-raspberry-pi/) 5 (4 GB u 8 GB)"><span class="td-val">integrado (para una central se recomienda igualmente Ethernet)</span></td>
</tr>
<tr>
<td><span class="td-val">Alimentación</span></td>
<td data-label="Home Assistant Green"><span class="td-val">fuente universal incluida</span></td>
<td data-label="[Raspberry Pi](/es/marca-raspberry-pi/) 5 (4 GB u 8 GB)"><span class="td-val">comprar aparte la fuente oficial USB-C de 27 W (existe con enchufe europeo)</span></td>
</tr>
<tr>
<td><span class="td-val">Refrigeración</span></td>
<td data-label="Home Assistant Green"><span class="td-val">sin ventilador</span></td>
<td data-label="[Raspberry Pi](/es/marca-raspberry-pi/) 5 (4 GB u 8 GB)"><span class="td-val">se recomienda el Active Cooler</span></td>
</tr>
<tr>
<td><span class="td-val">Puesta en marcha</span></td>
<td data-label="Home Assistant Green"><span class="td-val">conectar Ethernet y corriente, abrir homeassistant.local:8123</span></td>
<td data-label="[Raspberry Pi](/es/marca-raspberry-pi/) 5 (4 GB u 8 GB)"><span class="td-val">grabar Home Assistant OS con Raspberry Pi Imager y arrancar</span></td>
</tr>
<tr>
<td><span class="td-val">Precio</span></td>
<td data-label="Home Assistant Green"><span class="td-val">consulta el precio</span></td>
<td data-label="[Raspberry Pi](/es/marca-raspberry-pi/) 5 (4 GB u 8 GB)"><span class="td-val">consulta el precio (solo placa: añadir fuente, carcasa y almacenamiento)</span></td>
</tr>
</tbody>
</table>
</div>

El precio de la Raspberry Pi 5 está en la [página oficial](https://www.raspberrypi.com/products/raspberry-pi-5/). La placa se completa con fuente, carcasa y almacenamiento.

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
