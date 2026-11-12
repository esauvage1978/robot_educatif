---
layout: ../../../layouts/EnPost.astro
title: "ESP32 + ESPHome room sensor for Home Assistant"
description: "Build a room temperature and humidity sensor with ESP32, DHT22 or BME280 and ESPHome—wiring sketch, minimal YAML, and links to full ESPHome docs."
updated: "2 November 2026"
---

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/en/smart-home/">Smart home guides</a></nav>

*Also available in [French](/domotique/esp32-esphome-capteur-temperature/).*

A **DIY ESP32 temperature sensor** with [ESPHome](https://esphome.io/) shows up automatically in Home Assistant—good when you want USB power and full control. This is a **short path**; for deep troubleshooting, enclosures and battery builds, see the [full ESPHome getting started with Home Assistant](https://esphome.io/guides/getting_started_hassio.html) and our [ESP32 project ideas](/en/smart-home/esp32-smart-home-project-ideas/).

Board choice: [which ESP32 for smart home](/en/smart-home/which-esp32-board-for-smart-home/).

## Parts

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Item</th>
<th scope="col">Notes</th>
</tr></thead><tbody>
<tr>
<td data-label="Item"><span class="td-val">ESP32 dev board</span></td>
<td data-label="Notes"><span class="td-val">Classic ESP32 or ESP32-C6 DevKit—<a href="https://www.amazon.co.uk/s?k=ESP32+DevKit&amp;amp;tag=roboteducatif-21">search UK</a> · <a href="https://www.amazon.com/s?k=ESP32+DevKit&amp;amp;tag=roboteducatif-20">US</a></span></td>
</tr>
<tr>
<td data-label="Item"><span class="td-val"><strong>DHT22</strong></span></td>
<td data-label="Notes"><span class="td-val">Simple 1-wire, ±0.5 °C typical—<a href="https://www.amazon.co.uk/s?k=DHT22&amp;amp;tag=roboteducatif-21">UK</a> · <a href="https://www.amazon.com/s?k=DHT22&amp;amp;tag=roboteducatif-20">US</a></span></td>
</tr>
<tr>
<td data-label="Item"><span class="td-val"><strong>BME280</strong> (optional)</span></td>
<td data-label="Notes"><span class="td-val">I2C, humidity + <strong>pressure</strong>—<a href="https://www.amazon.co.uk/s?k=BME280+module&amp;amp;tag=roboteducatif-21">UK</a> · <a href="https://www.amazon.com/s?k=BME280+module&amp;amp;tag=roboteducatif-20">US</a></span></td>
</tr>
<tr>
<td data-label="Item"><span class="td-val">Breadboard + dupont wires</span></td>
<td data-label="Notes"><span class="td-val">Prototype before enclosure</span></td>
</tr>
</tbody>
</table>
</div>

Use **2.4 GHz Wi-Fi only** (ESP32 does not join 5 GHz).

## 1. Install ESPHome in Home Assistant

**Settings → Add-ons → ESPHome** → Install → Start → Show in sidebar. Docs: [ESPHome on Home Assistant](https://esphome.io/guides/getting_started_hassio.html).

## 2. Wire DHT22 (example)

DHT22          ESP32
VCC    →       3.3V
DATA   →       GPIO4
GND    →       GND

Optional 4.7 kΩ from DATA to 3.3V if reads are unstable on long wires.

**BME280 (I2C):** VCC/GND to 3.3V/GND; SDA/SCL to board defaults (often GPIO21/22 on classic ESP32, GPIO6/7 on some C6 boards—check your pinout).

## 3. Create and flash

1. ESPHome → **New device** → name `living-room-sensor` → pick chip type.  
2. Enter Wi-Fi SSID/password (2.4 GHz).  
3. **Install → Plug into this computer** (first time USB); hold **BOOT** if flash fails.  
4. Device appears under **Settings → ESPHome**.

## 4. Minimal YAML (DHT22)

Edit the device and add or merge:

sensor:
  - platform: dht
    pin: GPIO4
    model: DHT22
    temperature:
      name: "Living Room Temperature"
    humidity:
      name: "Living Room Humidity"
    update_interval: 60s

**BME280:** use `bme280_i2c` with `i2c:` block—see [ESPHome BME280](https://esphome.io/components/sensor/bme280.html).

Install **wirelessly (OTA)** after the first USB flash.

## 5. Use in Home Assistant

Entities appear as `sensor.living_room_temperature` etc. Add to dashboard; automate heating with a Zigbee plug ([temperature sensors compared](/en/smart-home/zigbee-temperature-sensor/)).

Example: turn on radiator plug when below 19 °C between 06:00–22:00—same pattern as Zigbee sensors in our [getting started](/en/smart-home/getting-started/) path.

## Quick fixes

- **Wi-Fi fails:** wrong band (5 GHz), guest isolation, or charge-only USB cable.  
- **DHT22 NaN:** wiring, GPIO pin, or `update_interval` under 2 s.  
- **Readings high:** sensor too close to the ESP32—extend with 20–30 cm wires; optional `offset` filter in YAML.

Prefer no soldering and battery life? Use [Zigbee temperature sensors](/en/smart-home/zigbee-temperature-sensor/) instead.

More DIY paths: [ESP32 smart home project ideas](/en/smart-home/esp32-smart-home-project-ideas/) · [Getting started with smart home](/en/smart-home/getting-started/) · [All smart-home guides](/en/smart-home/)
