---
layout: ../../../layouts/EnPost.astro
title: "10 ESP32 smart-home projects with ESPHome and Home Assistant"
description: "From DHT22 rooms sensors to mmWave presence, relays, CO₂ and e-paper displays—ESP32 + ESPHome ideas by difficulty."
updated: "2 November 2026"
---

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/en/smart-home/">Smart home guides</a> · ESP32 project ideas</nav>

*Also available in [French](/domotique/projets-esp32-domotique/).*

**ESP32 + ESPHome** turns a cheap Wi-Fi microcontroller into sensors, relays and displays that Home Assistant discovers natively. Ten starter projects by skill level—verify part prices at order time. Hub: [all smart-home guides](/en/smart-home/) · [getting started](/en/smart-home/getting-started/).

In the US, a **5 V USB adapter** (phone charger) is enough for most bench builds; ESPHome pushes firmware over Wi-Fi and Home Assistant sees new nodes on your LAN without a cloud account. Start with one room sensor, then add relays or presence only where DIY saves money versus off-the-shelf Zigbee.

## Recommended dev board

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Part</th>
<th scope="col">Typical use</th>
<th scope="col">Check price (affiliate)</th>
</tr></thead><tbody>
<tr>
<td data-label="Part"><span class="td-val"><strong>ESP32-C6 DevKitC</strong></span></td>
<td data-label="Typical use"><span class="td-val">Wi-Fi 6, Matter-ready, good default in 2026</span></td>
<td data-label="Check price (affiliate)"><span class="td-val"><a href="/en/smart-home/which-esp32-board-for-smart-home/">Which ESP32 board?</a></span></td>
</tr>
<tr>
<td data-label="Part"><span class="td-val">Classic <strong>ESP32 DevKit</strong></span></td>
<td data-label="Typical use"><span class="td-val">Most tutorials and forum examples</span></td>
<td data-label="Check price (affiliate)"><span class="td-val"><a href="/en/smart-home/which-esp32-board-for-smart-home/">Which ESP32 board?</a></span></td>
</tr>
</tbody>
</table>
</div>

We may earn a commission at no extra cost to you. **Guide price: check offers** on the retailer site before you buy.

**Skill key:** *Beginner* = breadboard + USB power; *Intermediate* = mains-safe relay logic or multiple I2C sensors; *Advanced* = displays, voice or air-quality stacks. Each idea below links to a deeper guide where we have one — start with [ESPHome temperature](/en/smart-home/esp32-esphome-temperature-sensor/) for project 1.

## Beginner (1–2 hours)

### 1. Room temperature (DHT22)

ESP32 + DHT22 per room. Full walkthrough: [ESPHome temperature sensor](/en/smart-home/esp32-esphome-temperature-sensor/).

### 2. Panic button

GPIO button fires a Home Assistant event—alarm, notify, “all off” scene.

```yaml
binary_sensor:
  - platform: gpio
    pin: GPIO4
    name: "Panic button"
    on_press:
      - homeassistant.event:
          event: panic_button
```

### 3. Status LED (WS2812)

RGB strip shows house state—green OK, red window open, blue away.

## Intermediate (2–4 hours)

### 4. Local weather node

BME280 (temp, humidity, pressure) + optional BH1750 light—automate blinds from lux.

### 5. Four-channel relay

Drive fan, pump or gate logic—**not** mains unless you know electrical code; prefer certified in-wall relays for 230 V / 120 V loads.

Off-the-shelf Wi-Fi relay alternative: Shelly 1 Gen4 (local integration in HA).

### 6. mmWave presence (LD2410)

Detects still occupants—better than PIR for desks and beds.

## Advanced (4–8 hours)

### 7. E-paper dashboard

2.9″ e-paper shows temp and forecast without a bright always-on LCD.

### 8. CO₂ (MH-Z19B or SCD4x)

Alert and boost ventilation above ~1000 ppm. Pi + SCD41 MQTT path: [Raspberry Pi CO₂](/en/smart-home/raspberry-pi-co2-scd41-home-assistant/).

### 9. Local voice (Atom Echo / HA Voice)

Wake word and commands without Google/Alexa cloud—requires HA voice pipeline setup.

### 10. Pulse counting

Hall sensor on utility meter impulses—track water or (where legal) electricity pulses.

## Bonus ideas

- **ESP32-CAM + relay:** gate or doorbell camera locally in HA  
- **Soil moisture + valve:** garden irrigation when dry  
- **PIR + siren:** DIY alarm entities in HA  
- **BME680 + PMS5003:** indoor air quality stack  

## ESP32 vs Zigbee sensors

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col"> </th>
<th scope="col">ESP32 + ESPHome</th>
<th scope="col">Zigbee</th>
</tr></thead><tbody>
<tr>
<td data-label=""><span class="td-val"><strong>Pros</strong></span></td>
<td data-label="ESP32 + ESPHome"><span class="td-val">Any I2C/GPIO sensor, often cheaper parts</span></td>
<td data-label="Zigbee"><span class="td-val">Battery, no USB cable</span></td>
</tr>
<tr>
<td data-label=""><span class="td-val"><strong>Cons</strong></span></td>
<td data-label="ESP32 + ESPHome"><span class="td-val">Needs 5 V USB (usually)</span></td>
<td data-label="Zigbee"><span class="td-val">Needs coordinator</span></td>
</tr>
</tbody>
</table>
</div>

Docs: [esphome.io](https://esphome.io) · Community: [Home Assistant forum](https://community.home-assistant.io).

Related: [garage door on ESP32](/en/smart-home/garage-door-smartphone-esp32-esphome/) · [Install Home Assistant](/en/smart-home/install-home-assistant-raspberry-pi-5/).

[All smart-home guides](/en/smart-home/)
