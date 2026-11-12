---
layout: ../../../layouts/EnPost.astro
title: "Raspberry Pi weather station with BME280 and SQLite history (step-by-step)"
description: "Build an indoor or sheltered outdoor weather logger on Pi 4/5: enable I2C, wire the BME280, Python script, SQLite every 5 min, daily min/max, CSV export."
updated: "4 November 2026"
---

*French version: [station météo BME280](/domotique/raspberry-pi-station-meteo-bme280-historique/).*

> **Direct answer** — A **BME280** module on a **Raspberry Pi** (4 or 5) gives you temperature, humidity and pressure logged every **5 minutes** into a local **SQLite** database. You need four Dupont wires, **I2C** enabled, a Python virtual environment, and about **one hour** for a first run. Smart-home hub: [smart home guides](/en/smart-home/) · Pi brand page: [Raspberry Pi](/en/raspberry-pi-brand/) · complete kit: [Pi 5 kit guide](/kit-raspberry-pi-5-complet/) · CO₂ variant: [SCD41 MQTT](/en/smart-home/raspberry-pi-co2-scd41-home-assistant/) · ESP alternative: [ESPHome BME280](/en/smart-home/esp32-esphome-temperature-sensor/).

![Raspberry Pi with sensors — illustration of a home weather logging setup](/images/illustrations/raspberry-pi-station-meteo-bme280-historique.webp)

*Photo-style illustration: Pi + I2C sensor; keep the chip away from the board’s heat.*

## What you will build

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Step</th>
<th scope="col">Result</th>
</tr></thead><tbody>
<tr>
<td data-label="Step"><span class="td-val">1</span></td>
<td data-label="Result"><span class="td-val"><strong>I2C</strong> bus enabled on Bookworm</span></td>
</tr>
<tr>
<td data-label="Step"><span class="td-val">2</span></td>
<td data-label="Result"><span class="td-val">BME280 wired at <strong>3.3 V</strong> (not 5 V)</span></td>
</tr>
<tr>
<td data-label="Step"><span class="td-val">3</span></td>
<td data-label="Result"><span class="td-val">Address <strong>0x76</strong> or <strong>0x77</strong> confirmed with <code>i2cdetect</code></span></td>
</tr>
<tr>
<td data-label="Step"><span class="td-val">4</span></td>
<td data-label="Result"><span class="td-val">Python script writes to <code>~/meteo.db</code> every 300 s</span></td>
</tr>
<tr>
<td data-label="Step"><span class="td-val">5</span></td>
<td data-label="Result"><span class="td-val"><code>--resume</code> prints <strong>7-day</strong> daily min / max / mean</span></td>
</tr>
<tr>
<td data-label="Step"><span class="td-val">6</span></td>
<td data-label="Result"><span class="td-val"><code>--csv</code> exports for Excel or LibreOffice</span></td>
</tr>
<tr>
<td data-label="Step"><span class="td-val">7</span></td>
<td data-label="Result"><span class="td-val">Optional <strong>systemd</strong> service for boot-time logging</span></td>
</tr>
</tbody>
</table>
</div>

**Level:** beginner to intermediate · **Cost:** one generic BME280 module (check seller price; no subscription).

**I2C** (*Inter-Integrated Circuit*) is a two-wire bus (SDA + SCL). **SQLite** is a single-file database — no server to install.

## Parts list

- Raspberry Pi **4 or 5**, **Raspberry Pi OS Bookworm**.
- **BME280** I2C breakout ([search BME280 I2C on Amazon US](https://www.amazon.com/s?k=BME280+I2C&tag=roboteducatif-20) · [Amazon UK](https://www.amazon.co.uk/s?k=BME280+I2C&tag=roboteducatif-21)). Do **not** buy a **BMP280** if you need humidity — it lacks the humidity channel.
- Four jumper wires. For outdoor use, a **radiation shield** (ventilated, shaded).

## Wiring (copy this table)

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">BME280 pin</th>
<th scope="col">Pi physical pin</th>
<th scope="col">Role</th>
</tr></thead><tbody>
<tr>
<td data-label="BME280 pin"><span class="td-val">VCC / VIN</span></td>
<td data-label="Pi physical pin"><span class="td-val">Pin <strong>1</strong> (3V3)</span></td>
<td data-label="Role"><span class="td-val">Power <strong>3.3 V only</strong></span></td>
</tr>
<tr>
<td data-label="BME280 pin"><span class="td-val">GND</span></td>
<td data-label="Pi physical pin"><span class="td-val">Pin <strong>6</strong> (GND)</span></td>
<td data-label="Role"><span class="td-val">Ground</span></td>
</tr>
<tr>
<td data-label="BME280 pin"><span class="td-val">SDA</span></td>
<td data-label="Pi physical pin"><span class="td-val">Pin <strong>3</strong> (GPIO2 / SDA1)</span></td>
<td data-label="Role"><span class="td-val">I2C data</span></td>
</tr>
<tr>
<td data-label="BME280 pin"><span class="td-val">SCL</span></td>
<td data-label="Pi physical pin"><span class="td-val">Pin <strong>5</strong> (GPIO3 / SCL1)</span></td>
<td data-label="Role"><span class="td-val">I2C clock</span></td>
</tr>
</tbody>
</table>
</div>

![Example wiring diagram context — BME280 module next to GPIO header](/images/blog-thumbnails/raspberry-pi-station-meteo-bme280-historique.webp)

After wiring, run:

sudo raspi-config nonint do_i2c 0
sudo reboot
i2cdetect -y 1

You should see **76** or **77** in the grid. If you see **76**, export `BME280_ADDR=0x76` when running the script.

## Prepare Python (Bookworm-safe)

Bookworm blocks `pip install` outside a venv. Use system GPIO packages via `--system-site-packages`:

sudo apt update
sudo apt install -y python3-venv python3-gpiozero python3-lgpio i2c-tools
mkdir -p ~/capteurs && cd ~/capteurs
python3 -m venv --system-site-packages venv
source venv/bin/activate
pip install adafruit-circuitpython-bme280

Download the full script: [`meteo_bme280_sqlite.py`](/code/raspberry-pi/meteo_bme280_sqlite.py) (same logic as the French tutorial).

## Run the logger

Set **ALTITUDE_M** to your site elevation in metres so pressure can be compared with weather forecasts (sea-level reduction):

cd ~/capteurs && source venv/bin/activate
ALTITUDE_M=150 python meteo_bme280_sqlite.py

In another terminal:

python meteo_bme280_sqlite.py --resume
python meteo_bme280_sqlite.py --csv > meteo.csv

## systemd (optional, keeps logging after logout)

Create `/etc/systemd/system/station-meteo.service` with `Environment=ALTITUDE_M=150` and `Environment=BME280_ADDR=0x76` if needed, then `sudo systemctl enable --now station-meteo.service`.

## 3-hour pressure trend (SQLite one-liner)

sqlite3 ~/meteo.db "SELECT ROUND((SELECT pression FROM mesures ORDER BY ts DESC LIMIT 1) - (SELECT pression FROM mesures WHERE ts <= strftime('%Y-%m-%dT%H:%M:%S', 'now', '-3 hours') ORDER BY ts DESC LIMIT 1), 1);"

A **negative** value means falling pressure locally — a hint only, not a professional forecast.

## Troubleshooting

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Symptom</th>
<th scope="col">Likely cause</th>
<th scope="col">Fix</th>
</tr></thead><tbody>
<tr>
<td data-label="Symptom"><span class="td-val">No device on <code>i2cdetect</code></span></td>
<td data-label="Likely cause"><span class="td-val">Wrong wiring or I2C off</span></td>
<td data-label="Fix"><span class="td-val">Re-check 3V3/GND/SDA/SCL; enable I2C</span></td>
</tr>
<tr>
<td data-label="Symptom"><span class="td-val">Chip ID <strong>0x58</strong></span></td>
<td data-label="Likely cause"><span class="td-val">BMP280, not BME280</span></td>
<td data-label="Fix"><span class="td-val">Replace module</span></td>
</tr>
<tr>
<td data-label="Symptom"><span class="td-val">Temperature +5 °C high</span></td>
<td data-label="Likely cause"><span class="td-val">Sensor on Pi board</span></td>
<td data-label="Fix"><span class="td-val">Move sensor ≥10 cm away</span></td>
</tr>
<tr>
<td data-label="Symptom"><span class="td-val"><code>ModuleNotFoundError</code></span></td>
<td data-label="Likely cause"><span class="td-val">No venv / no pip package</span></td>
<td data-label="Fix"><span class="td-val">Activate venv; <code>pip install adafruit-circuitpython-bme280</code></span></td>
</tr>
</tbody>
</table>
</div>

## FAQ

**BME280 vs DHT22?**  
BME280 adds **barometric pressure** and stable I2C reads; DHT22 is one-wire and slower.

**Can I feed Home Assistant?**  
Yes — MQTT or REST after export; see [Home Assistant Green vs Pi 5](/en/smart-home/home-assistant-green-vs-raspberry-pi-5/) for where a Pi fits in your stack.

**Outdoor mounting?**  
Use a **Stevenson screen** or ventilated shade; never expose the chip to direct sun or rain.

## Next reads

- [All smart-home guides](/en/smart-home/)
- [Zigbee dongle comparison](/en/smart-home/best-zigbee-dongle-home-assistant/) (if you later add sensors to HA)
- French mirror content lives under `/domotique/` on the main site
