---
layout: ../../../layouts/EsPost.astro
title: "Estación meteorológica Raspberry Pi con BME280 e historial SQLite: tutorial"
description: "BME280 en Raspberry Pi 4 o 5: cableado I2C, Python, historial SQLite, resumen diario y export CSV."
updated: "24 de octubre de 2026"
---

El **BME280** mide temperatura, humedad y presión. Con un Raspberry Pi guardas **historial** en SQLite: mínimos/máximos diarios y export CSV. Presión en caída rápida suele anticipar mal tiempo.

## Objetivo

- Medida cada 5 min en `~/meteo.db`.  
- Resumen diario con `--resume`.  
- Export `--csv`.

## Cableado (3,3 V)

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">BME280</th>
<th scope="col">Pi</th>
</tr></thead><tbody>
<tr>
<td data-label="BME280"><span class="td-val">VIN</span></td>
<td data-label="Pi"><span class="td-val">1 (3V3)</span></td>
</tr>
<tr>
<td data-label="BME280"><span class="td-val">GND</span></td>
<td data-label="Pi"><span class="td-val">6 (GND)</span></td>
</tr>
<tr>
<td data-label="BME280"><span class="td-val">SDA</span></td>
<td data-label="Pi"><span class="td-val">3 (GPIO2)</span></td>
</tr>
<tr>
<td data-label="BME280"><span class="td-val">SCL</span></td>
<td data-label="Pi"><span class="td-val">5 (GPIO3)</span></td>
</tr>
</tbody>
</table>
</div>

Dirección **0x77** o **0x76** (`i2cdetect`). No confundir con BMP280 (sin humedad).

pip install adafruit-circuitpython-bme280

Descarga: [meteo_bme280_sqlite.py](/code/raspberry-pi/meteo_bme280_sqlite.py)

ALTITUDE_M=650 python meteo_bme280_sqlite.py   # Madrid ~650 m, ajusta tu altitud
python meteo_bme280_sqlite.py --resume
python meteo_bme280_sqlite.py --csv > meteo.csv

`ALTITUDE_M` corrige presión a nivel del mar como en boletines AEMET.

Servicio systemd `station-meteo.service` con `Environment=ALTITUDE_M=...` y `BME280_ADDR=0x76` si aplica.

## Truco: tendencia barométrica 3 h

Consulta SQLite comparando presión actual con hace 3 horas (caída = posible degradación).

Alternativa ESP32: [ESP32 + ESPHome temperatura](/es/domotica/esp32-esphome-sensor-temperatura/). CO2: [SCD41](/es/domotica/raspberry-pi-co2-scd41-home-assistant/).

[Todas las guías](/es/domotica/)
