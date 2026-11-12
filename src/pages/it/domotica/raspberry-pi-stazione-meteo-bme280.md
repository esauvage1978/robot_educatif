---
layout: ../../../layouts/ItPost.astro
title: "Stazione meteo Raspberry Pi con BME280 e storico SQLite: tutorial + codice"
description: "Stazione interna o riparata con BME280 su Pi 4/5: I2C, Python, database SQLite, riepilogo giornaliero ed export CSV."
updated: "24 ottobre 2026"
---

Il **BME280** misura temperatura, umidità e pressione. Con Raspberry Pi registrate ogni 5 minuti in **SQLite** (`~/meteo.db`), consultate min/max giornalieri ed esportate CSV.

## Obiettivo

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Durata</th>
<th scope="col">Livello</th>
</tr></thead><tbody>
<tr>
<td data-label="Durata"><span class="td-val">~1 h</span></td>
<td data-label="Livello"><span class="td-val">principiante–intermedio</span></td>
</tr>
</tbody>
</table>
</div>

## Materiale

- Pi 4/5 Bookworm  
- Modulo **BME280** I2C (non confondere con BMP280 senza umidità) — [Amazon.it BME280](https://www.amazon.it/s?k=BME280+module+I2C&tag=roboteducat0f-21)  
- Esterno: schermatura Stevenson o ombra

## Cablaggio

VIN 3,3V, GND, SDA pin 3, SCL pin 5. Indirizzo **0x77** o **0x76** (`i2cdetect -y 1`).

pip install adafruit-circuitpython-bme280

Script: [`/code/raspberry-pi/meteo_bme280_sqlite.py`](/code/raspberry-pi/meteo_bme280_sqlite.py).

- Esecuzione continua: registrazione ogni `INTERVAL` (default 300 s)  
- `--resume`: tabella ultimi 7 giorni  
- `--csv`: export  

Impostare `ALTITUDE_M` per pressione a livello mare (utile in montagna in Italia).

## systemd

Servizio che lancia lo script nel venv all’avvio.

Integrazione opzionale: pubblicare su MQTT come [CO2 tutorial](/it/domotica/raspberry-pi-co2-scd41-home-assistant/) per grafici in HA.

Alternativa senza Pi dedicato: [ESP32 + BME280](/it/domotica/esp32-esphome-sensore-temperatura/).

[Tutte le guide](/it/domotica/)
