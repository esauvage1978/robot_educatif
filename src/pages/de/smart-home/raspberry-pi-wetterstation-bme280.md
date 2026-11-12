---
layout: ../../../layouts/DePost.astro
title: "Wetterstation mit BME280 am Raspberry Pi und SQLite-Historie"
description: "Temperatur, Luftfeuchte, Luftdruck per I2C — Python speichert alle 5 Minuten in SQLite, Tagesmin/max und CSV-Export. Für Innenraum oder überdachten Außenplatz."
updated: "24. Oktober 2026"
---

Der **BME280** liefert Temperatur, Luftfeuchte und Druck. Am **Raspberry Pi** wird daraus eine kleine **Wetterstation** mit **SQLite-Historie** — Daten bleiben lokal (DSGVO-freundlich), kein Cloud-Abo.

Ca. 1 h, Anfänger bis Mittel. Modul [bei Amazon.de](https://www.amazon.de/s?k=BME280+I2C&tag=roboteducat00-21) (Werbelink). **BMP280** ohne Feuchte funktioniert nicht mit diesem Code.

## Ziel

- Messung alle 5 Min. in `~/meteo.db`
- Tagesauswertung per `--resume`
- CSV-Export `--csv`

## Verdrahtung (3,3 V)

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">BME280</th>
<th scope="col">Pi</th>
</tr></thead><tbody>
<tr>
<td data-label="BME280"><span class="td-val">VCC</span></td>
<td data-label="Pi"><span class="td-val">3,3 V (Pin 1)</span></td>
</tr>
<tr>
<td data-label="BME280"><span class="td-val">GND</span></td>
<td data-label="Pi"><span class="td-val">GND (Pin 6)</span></td>
</tr>
<tr>
<td data-label="BME280"><span class="td-val">SDA</span></td>
<td data-label="Pi"><span class="td-val">Pin 3</span></td>
</tr>
<tr>
<td data-label="BME280"><span class="td-val">SCL</span></td>
<td data-label="Pi"><span class="td-val">Pin 5</span></td>
</tr>
</tbody>
</table>
</div>

I2C aktivieren, `i2cdetect -y 1` → **76** oder **77**.

pip install adafruit-circuitpython-bme280

Skript: `/code/raspberry-pi/meteo_bme280_sqlite.py`. Optional `ALTITUDE_M` für Druck auf Meereshöhe (Wettertrend).

## Außen

Nur mit **Strahlungsschutz** (Stevenson-Häuschen) und ohne direkte Sonne — sonst zu warm. Alternativ Werte nur in HA anzeigen: MQTT-Erweiterung des Skripts möglich.

Integration HA ohne Pi-Skript: [ESP32 + BME280](/de/smart-home/esp32-esphome-temperatursensor/) oder [Zigbee](/de/smart-home/zigbee-temperatursensor/).

Weiter: [CO₂ SCD41](/de/smart-home/raspberry-pi-co2-scd41-home-assistant/), [Home Assistant installieren](/de/smart-home/home-assistant-raspberry-pi-5-installation/).

[Alle Smart-Home-Ratgeber](/de/smart-home/)
