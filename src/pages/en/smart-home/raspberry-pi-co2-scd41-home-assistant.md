---
layout: ../../../layouts/EnPost.astro
title: "Raspberry Pi CO₂ sensor (SCD41) with Home Assistant and MQTT"
description: "Measure CO₂, temperature and humidity with SCD40/SCD41 on Raspberry Pi, publish via MQTT discovery, systemd service and ventilate alerts."
updated: "2 November 2026"
shareTitle: "Raspberry Pi CO₂ SCD41 with Home Assistant"
shareDescription: "Wire SCD41 on I2C, publish MQTT discovery, alert when CO₂ rises—intermediate Pi project."
---

*Also available in [French](/domotique/raspberry-pi-capteur-co2-scd41-home-assistant/).*

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/en/smart-home/">Smart home</a> · CO₂ sensor on Pi</nav>

**Quick answer (November 2026)** — A **SCD41** (or SCD40) breakout measures **CO₂** in **ppm** (*parts per million*: how much carbon dioxide is in the air). Wire it on **I2C** to a Raspberry Pi, run a small Python script, and publish to **MQTT** so **Home Assistant** can alert you to ventilate—typically above **1000 ppm** in a bedroom or office.

This tutorial belongs to the [smart home hub](/en/smart-home/) with [PIR motion lighting](/en/smart-home/raspberry-pi-pir-motion-lighting/), [BME280 weather station](/en/smart-home/raspberry-pi-weather-station-bme280/), and [install Home Assistant on Pi 5](/en/smart-home/install-home-assistant-raspberry-pi-5/).

![SCD41 CO₂ sensor module next to a Raspberry Pi — wiring reference](/images/illustrations/raspberry-pi-capteur-co2-scd41-home-assistant.webp)

*Partner links below may earn a commission at no extra cost to you—verify stock and price on the retailer page.*

High CO₂ in a closed bedroom or office means stale air. This tutorial uses a Raspberry Pi and **SCD40 or SCD41** (photoacoustic CO₂—not a proxy) and sends readings to **Home Assistant** over MQTT so you can alert “open a window”.

## Goal

- Read CO₂ (ppm), temperature and humidity every ~30 s.  
- MQTT with **Home Assistant discovery**.  
- Run as a **systemd** service on boot.

## Time, level, parts

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Time</th>
<th scope="col">Level</th>
<th scope="col">Parts</th>
</tr></thead><tbody>
<tr>
<td data-label="Time"><span class="td-val">~1.5 h</span></td>
<td data-label="Level"><span class="td-val">Intermediate</span></td>
<td data-label="Parts"><span class="td-val">Pi 4/5, SCD4x breakout, MQTT broker (e.g. Mosquitto on HA)</span></td>
</tr>
</tbody>
</table>
</div>

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Term</th>
<th scope="col">Meaning in one line</th>
</tr></thead><tbody>
<tr>
<td data-label="Term"><span class="td-val"><strong>CO₂</strong></span></td>
<td data-label="Meaning in one line"><span class="td-val">Gas we exhale; high levels mean poor ventilation.</span></td>
</tr>
<tr>
<td data-label="Term"><span class="td-val"><strong>I2C</strong></span></td>
<td data-label="Meaning in one line"><span class="td-val">Two-wire bus on the Pi header (SDA/SCL).</span></td>
</tr>
<tr>
<td data-label="Term"><span class="td-val"><strong>MQTT</strong></span></td>
<td data-label="Meaning in one line"><span class="td-val">Lightweight messaging between Pi and Home Assistant.</span></td>
</tr>
</tbody>
</table>
</div>

- Pi: [Amazon UK](https://www.amazon.co.uk/s?k=Raspberry+Pi+5&tag=roboteducatif-21) · [US](https://www.amazon.com/s?k=Raspberry+Pi+5&tag=roboteducatif-20)  
- SCD41 module: [UK](https://www.amazon.co.uk/s?k=SCD41+CO2+sensor&tag=roboteducatif-21) · [US](https://www.amazon.com/s?k=SCD41+CO2+sensor&tag=roboteducatif-20)

## Wiring (I2C 0x62)

Pi GPIO is **3.3 V**—power the breakout at **3.3 V** unless the board docs guarantee 5 V tolerant I2C.

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">SCD4x</th>
<th scope="col">Pi (physical pin)</th>
</tr></thead><tbody>
<tr>
<td data-label="SCD4x"><span class="td-val">VIN</span></td>
<td data-label="Pi (physical pin)"><span class="td-val">1 (3V3)</span></td>
</tr>
<tr>
<td data-label="SCD4x"><span class="td-val">GND</span></td>
<td data-label="Pi (physical pin)"><span class="td-val">6 (GND)</span></td>
</tr>
<tr>
<td data-label="SCD4x"><span class="td-val">SDA</span></td>
<td data-label="Pi (physical pin)"><span class="td-val">3 (GPIO2)</span></td>
</tr>
<tr>
<td data-label="SCD4x"><span class="td-val">SCL</span></td>
<td data-label="Pi (physical pin)"><span class="td-val">5 (GPIO3)</span></td>
</tr>
</tbody>
</table>
</div>

## Pi prep (Bookworm)

sudo apt update
sudo apt install -y python3-venv python3-gpiozero python3-lgpio i2c-tools
sudo raspi-config nonint do_i2c 0
# reboot, then:
i2cdetect -y 1    # expect 62
mkdir -p ~/capteurs && cd ~/capteurs
python3 -m venv --system-site-packages venv
source venv/bin/activate
pip install adafruit-circuitpython-scd4x paho-mqtt

Full script: download [`co2_scd41_mqtt.py`](/code/raspberry-pi/co2_scd41_mqtt.py).

Test: `MQTT_HOST=192.168.x.x MQTT_USER=... MQTT_PASS=... python co2_scd41_mqtt.py` — first reading ~5 s after start.

## Home Assistant

Enable **Mosquitto** add-on and **MQTT** integration. Create a dedicated HA user for the Pi. Discovery creates entities under **MQTT** automatically.

Example alert above 1000 ppm for 5 minutes (adjust entity id):

alias: Living room CO2 alert
triggers:
  - trigger: numeric_state
    entity_id: sensor.raspberry_pi_scd41_living_room_co2
    above: 1000
    for: "00:05:00"
actions:
  - action: notify.notify
    data:
      message: "CO2 above 1000 ppm—ventilate."

**Tip:** add a **derivative** sensor on CO₂ to catch **fast rises** before a fixed threshold—see Sensirion guidance on auto-calibration needing regular fresh air.

## systemd

`/etc/systemd/system/co2-sensor.service` with `ExecStart=/home/pi/capteurs/venv/bin/python .../co2_scd41_mqtt.py`, `Environment=MQTT_HOST=...`, then `sudo systemctl enable --now co2-sensor.service`.

## FAQ

**SCD40 vs SCD41?**  
Both work; SCD41 is the current reference—check your breakout label.

**Is 1000 ppm always bad?**  
It is a common alert threshold for bedrooms; adjust for your room size and occupancy.

**Pi 5 I2C errors?**  
Use Bookworm, enable I2C in `raspi-config`, and share ground between sensor and Pi.

## Troubleshooting

- No `62` on `i2cdetect`: SDA/SCL swap, I2C off, bad jumper.  
- CO₂ drift first days: sensor auto-calibration needs continuous run and periodic outdoor-level air ([Sensirion SCD4x](https://sensirion.com/products/catalog/SCD41)).  
- Temp high: move sensor away from Pi with a longer cable.

Sources: [Adafruit SCD-40/41 learn guide](https://learn.adafruit.com/adafruit-scd-40-and-scd-41) · [HA MQTT discovery](https://www.home-assistant.io/integrations/mqtt/).

Also: [ESP32 smart home ideas](/en/smart-home/esp32-smart-home-project-ideas/) · [CO₂ trends and air quality](/en/smart-home/smart-home-trends-2027-ces-mmwave-local-ai-energy/).

[All smart-home guides](/en/smart-home/)
