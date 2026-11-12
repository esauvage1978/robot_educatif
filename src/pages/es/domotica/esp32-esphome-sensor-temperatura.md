---
layout: ../../../layouts/EsPost.astro
title: "Sensor de temperatura ESP32 + ESPHome para Home Assistant: tutorial completo"
description: "Crear sensor DHT22 o BME280 con ESP32 y ESPHome: cableado, YAML, automatizaciones y solución de problemas. Paso a paso."
updated: "24 de octubre de 2026"
---

Montar tu **sensor de temperatura ESP32 + ESPHome** cuesta poco y se integra solo en Home Assistant. Del cableado a la primera automatización, con explicaciones para personalizar.

## Material

**ESP32-C6 DevKitC** (recomendado): Wi-Fi 6, Thread/Zigbee nativos, USB-C ([Amazon.es](https://www.amazon.es/s?k=ESP32-C6+DevKit&tag=roboteducat07-21)).

**Sensor**:
- **DHT22**: ±0,5 °C, sencillo, 1 cable datos  
- **BME280**: I2C, presión atmosférica, mejor precisión con oversampling ([Amazon.es DHT22](https://www.amazon.es/s?k=DHT22&tag=roboteducat07-21), [BME280](https://www.amazon.es/s?k=BME280+modulo&tag=roboteducat07-21))

Breadboard, cables Dupont, resistencia 4,7 kΩ opcional (DHT22), USB 5 V.

## Paso 1: ESPHome en Home Assistant

*Ajustes → Complementos → ESPHome* → Instalar → Iniciar → barra lateral.

## Paso 2: Cableado

**DHT22** → ESP32-C6: VCC 3,3 V, DATA **GPIO4**, GND.

**BME280** I2C: VCC 3,3 V, GND, SDA **GPIO6**, SCL **GPIO7** (comprueba pinout de tu placa).

## Paso 3: Nuevo dispositivo ESPHome

Nombre `sensor-salon`, tipo **ESP32-C6**, Wi-Fi **2,4 GHz** (no 5 GHz), clave API generada.

## Paso 4: Primer flash USB

*Instalar → Enchufar en este ordenador* → elegir puerto → compilar y flashear. Si falla: pulsar **BOOT** al conectar; prueba otro cable USB (datos, no solo carga).

## Paso 5: YAML DHT22 (extracto)

esphome:
  name: sensor-salon
  friendly_name: Sensor salón

esp32:
  board: esp32-c6-devkitc-1
  variant: ESP32C6
  framework:
    type: esp-idf

wifi:
  ssid: "TuSSID"
  password: "TuClave"
  ap:
    ssid: "Sensor-Salon-Respaldo"
    password: "12345678"

api:
  encryption:
    key: "clave-generada"

ota:
  - platform: esphome

logger:

sensor:
  - platform: dht
    pin: GPIO4
    model: DHT22
    temperature:
      name: "Temperatura salón"
      accuracy_decimals: 1
      filters:
        - offset: -0.5
    humidity:
      name: "Humedad salón"
    update_interval: 60s
  - platform: wifi_signal
    name: "Señal WiFi sensor salón"
    update_interval: 120s

button:
  - platform: restart
    name: "Reiniciar sensor salón"

Guardar → *Instalar → Inalámbricamente* (OTA).

## Paso 6: BME280

Sustituye bloque `sensor` por `i2c` + `bme280_i2c` (SDA/SCL, `address: 0x76` o `0x77`, `oversampling: 16x`, entidad presión).

## Paso 7: Home Assistant

Entidades automáticas: temperatura, humedad, señal WiFi. Añade tarjeta *Entidades* o `history-graph` 24 h.

## Automatizaciones

- Encender enchufe radiador si `sensor.temperatura_salon` &lt;19 (6:00–22:00).  
- Apagar si &gt;21.  
- Aviso humedad &gt;70 % 1 h.

## Problemas frecuentes

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Problema</th>
<th scope="col">Solución</th>
</tr></thead><tbody>
<tr>
<td data-label="Problema"><span class="td-val">No conecta Wi-Fi</span></td>
<td data-label="Solución"><span class="td-val">Solo 2,4 GHz; desactiva aislamiento AP invitados</span></td>
</tr>
<tr>
<td data-label="Problema"><span class="td-val">DHT22 NaN</span></td>
<td data-label="Solución"><span class="td-val">Cableado, GPIO distinto, <code>update_interval</code> ≥60 s</span></td>
</tr>
<tr>
<td data-label="Problema"><span class="td-val">BME280 no detectado</span></td>
<td data-label="Solución"><span class="td-val"><code>scan: true</code>, probar 0x77, revisar SDA/SCL</span></td>
</tr>
<tr>
<td data-label="Problema"><span class="td-val">+5 °C de más</span></td>
<td data-label="Solución"><span class="td-val">Aleja DHT del ESP32; <code>offset</code> en filters</span></td>
</tr>
<tr>
<td data-label="Problema"><span class="td-val">OTA falla</span></td>
<td data-label="Solución"><span class="td-val">Usar IP fija en lugar de <code>.local</code></span></td>
</tr>
</tbody>
</table>
</div>

## Opciones avanzadas

Carcasa impresa PETG, batería 18650 + deep sleep (meses de autonomía), uso exterior con Stevenson screen (DHT22 no es IP65).

## FAQ

**C6 vs S3 vs ESP32 clásico**: C6 recomendado en 2026 (Wi-Fi 6, bajo consumo).  
**DHT22 vs BME280**: DHT para probar; BME280 para proyecto serio.  
**Varios ESP32**: un firmware por placa; límite ~50 clientes Wi-Fi del router.

## Más lectura

- [10 proyectos ESP32](/es/domotica/proyectos-esp32-domotica/)  
- [Sensor Zigbee](/es/domotica/sensor-temperatura-zigbee/)  
- [Instalar Home Assistant](/es/domotica/instalar-home-assistant-raspberry-pi-5/)  
- [Puerta garaje ESP32](/es/domotica/puerta-garaje-smartphone-esp32-esphome/)

*Amazon.es tag roboteducat07-21, octubre 2026.*

[Todas las guías](/es/domotica/)
