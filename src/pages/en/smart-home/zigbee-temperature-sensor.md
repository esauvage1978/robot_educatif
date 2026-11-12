---
layout: ../../../layouts/EnPost.astro
title: "Zigbee temperature sensors for Home Assistant (2026)"
description: "Compare SNZB-02D, Aqara T1 and Tuya Zigbee temperature sensors: accuracy, battery, placement and heating automations for Home Assistant."
updated: "2 November 2026"
shareTitle: "Zigbee temperature sensors for Home Assistant"
shareDescription: "SNZB-02D vs Aqara vs Tuya: accuracy, battery life, placement and YAML heating examples for Home Assistant."
---

*Also available in [French](/domotique/capteur-temperature-zigbee/).*

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/en/smart-home/">Smart home</a> · Zigbee temperature sensors</nav>

> **Quick answer (November 2026)** — For most homes: **SONOFF SNZB-02D** (LCD display, ±0.2 °C claimed, CR2450 ~2 years). Need atmospheric pressure or e-ink? **Aqara T1**. Minimum budget without display: **Tuya TS0201**.

Part of our [smart home hub](/en/smart-home/). **Zigbee** is a low-power 2.4 GHz mesh; **Home Assistant (HA)** is your local automation server; **ZHA** is Zigbee built into HA; **Zigbee2MQTT** is an alternative stack with an MQTT broker.

A **Zigbee temperature sensor** in each heated room lets you automate heating, spot dry air and get freeze alerts. This guide compares five common Zigbee 3.0 models — no fixed prices; check retailers when you buy.

![SONOFF SNZB-02D Zigbee temperature and humidity sensor with LCD](/images/products/sonoff-snzb-02d.webp)

*Product photo: SONOFF SNZB-02D (typical retail packaging).*

## Comparison table

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Model</th>
<th scope="col">Measures</th>
<th scope="col">Display</th>
<th scope="col">Accuracy (maker)</th>
<th scope="col">Battery (maker)</th>
<th scope="col">Cell</th>
<th scope="col">Best for</th>
</tr></thead><tbody>
<tr>
<td data-label="Model"><span class="td-val"><strong>SONOFF SNZB-02D</strong></span></td>
<td data-label="Measures"><span class="td-val">Temp, humidity</span></td>
<td data-label="Display"><span class="td-val">LCD</span></td>
<td data-label="Accuracy (maker)"><span class="td-val">±0.2 °C, ±2 % RH</span></td>
<td data-label="Battery (maker)"><span class="td-val">~2 years</span></td>
<td data-label="Cell"><span class="td-val">CR2450</span></td>
<td data-label="Best for"><span class="td-val"><strong>Top pick</strong>—display, accuracy, battery</span></td>
</tr>
<tr>
<td data-label="Model"><span class="td-val"><strong>Aqara T1 (WSDCGQ11LM)</strong></span></td>
<td data-label="Measures"><span class="td-val">Temp, humidity, pressure</span></td>
<td data-label="Display"><span class="td-val">E-ink</span></td>
<td data-label="Accuracy (maker)"><span class="td-val">±0.3 °C, ±3 % RH</span></td>
<td data-label="Battery (maker)"><span class="td-val">1–2 years</span></td>
<td data-label="Cell"><span class="td-val">CR2032</span></td>
<td data-label="Best for"><span class="td-val">Compact, pressure trend</span></td>
</tr>
<tr>
<td data-label="Model"><span class="td-val"><strong>SONOFF SNZB-02P</strong></span></td>
<td data-label="Measures"><span class="td-val">Temp, humidity</span></td>
<td data-label="Display"><span class="td-val">None</span></td>
<td data-label="Accuracy (maker)"><span class="td-val">±0.4 °C, ±4 % RH</span></td>
<td data-label="Battery (maker)"><span class="td-val">~1.5 years</span></td>
<td data-label="Cell"><span class="td-val">CR2477</span></td>
<td data-label="Best for"><span class="td-val">Budget, no display</span></td>
</tr>
<tr>
<td data-label="Model"><span class="td-val"><strong>Tuya TS0201</strong></span></td>
<td data-label="Measures"><span class="td-val">Temp, humidity</span></td>
<td data-label="Display"><span class="td-val">None</span></td>
<td data-label="Accuracy (maker)"><span class="td-val">±0.5 °C, ±5 % RH</span></td>
<td data-label="Battery (maker)"><span class="td-val">~1 year</span></td>
<td data-label="Cell"><span class="td-val">2× AAA</span></td>
<td data-label="Best for"><span class="td-val">Cheapest, AAA cells</span></td>
</tr>
<tr>
<td data-label="Model"><span class="td-val"><strong>Aqara FP2 (mmWave)</strong></span></td>
<td data-label="Measures"><span class="td-val">Temp, humidity, <strong>presence</strong></span></td>
<td data-label="Display"><span class="td-val">None</span></td>
<td data-label="Accuracy (maker)"><span class="td-val">±0.5 °C (secondary)</span></td>
<td data-label="Battery (maker)"><span class="td-val">Mains USB-C</span></td>
<td data-label="Cell"><span class="td-val">—</span></td>
<td data-label="Best for"><span class="td-val">Presence first, temp bonus</span></td>
</tr>
</tbody>
</table>
</div>

**Buy (affiliate — check price):** [SNZB-02D Amazon UK](https://www.amazon.co.uk/dp/B0BYZP8NK2?tag=roboteducatif-21) · [Amazon US](https://www.amazon.com/dp/B0BYZP8NK2?tag=roboteducatif-20) · [2-pack UK](https://www.amazon.co.uk/dp/B0BZCV658S?tag=roboteducatif-21)

## SONOFF SNZB-02D — our pick

- LCD shows temp and humidity without opening the app  
- Best claimed accuracy in this list  
- CR2450 often lasts ~2 years (maker figure; room temperature affects life)  
- Min/max last 24 h on display  
- Works with **ZHA** and **Zigbee2MQTT**

## How many sensors?

- **Studio:** 1  
- **~50 m² flat:** 2 (living + bedroom)  
- **~80 m²:** 3  
- **~120 m² house:** 4–5 (skip hall, WC, cupboards)

One per **heated or monitored** room is enough—you do not need one in every closet.

## Placement

**Good:** centre of room, 1.2–1.8 m height, away from direct sun.  
**Avoid:** above radiators, in front of open windows, inside steamy bathrooms (condensation on the sensor).

**Range:** ~10–15 m indoors through a couple of walls—add **mains Zigbee routers** (smart plugs) if farther: [smart plugs](/en/smart-home/smart-plugs-uk-us/) and [Zigbee dongle](/en/smart-home/best-zigbee-dongle-home-assistant/).

## Pair with ZHA (step by step)

1. Home Assistant → **Settings → Devices & services → Zigbee (ZHA) → Add device**  
2. Pull battery tab on SNZB-02D  
3. Hold button **5 s** until LED blinks  
4. Rename entity and assign **area** (e.g. Living room)  

Entities: `sensor.*_temperature`, `sensor.*_humidity`, battery %.

## Useful automations

**Heat below 19 °C (daytime only):**

automation:
  - alias: "Living room heat below 19C"
    trigger:
      - platform: numeric_state
        entity_id: sensor.living_room_temperature
        below: 19
    condition:
      - condition: time
        after: "06:00"
        before: "22:00"
    action:
      - service: switch.turn_on
        target:
          entity_id: switch.radiator_plug_living_room

**Nursery alert outside 17–24 °C** and **humidity above 70 % for an hour** follow the same pattern with `notify.mobile_app`.

## Troubleshooting

- **Won’t pair:** fresh battery, within 3 m of coordinator, 10 s reset if needed.  
- **Wrong reading:** move away from sun or radiator; calibrate with a template sensor if consistently ~1 °C off.  
- **Humidity stuck at 99 %:** dry the sensor; avoid permanent install in very wet rooms.

## FAQ

**Zigbee vs Wi-Fi sensor?**  
Zigbee: coin cell, mesh, local. Wi-Fi: often cloud-only and heavier on the router.

**Do I need Zigbee2MQTT?**  
No — **ZHA** is enough for these models. See [Zigbee2MQTT vs ZHA](/en/smart-home/zigbee2mqtt-vs-zha-home-assistant/).

**Thread or Matter temperature sensors?**  
Growing in 2026; our tested path remains **Zigbee + HA** for price and battery life.

## Zigbee vs DIY ESP32

**Zigbee:** coin cell, no cable, months–years on battery. **ESP32 + ESPHome:** USB power, cheaper parts, fully custom—[ESPHome temperature guide](/en/smart-home/esp32-esphome-temperature-sensor/).

Also: [SONOFF brand page](/en/sonoff-brand/) · [PIR lighting on Raspberry Pi](/en/smart-home/raspberry-pi-pir-motion-lighting/) · [Install Home Assistant on Pi 5](/en/smart-home/install-home-assistant-raspberry-pi-5/).

[All smart-home guides](/en/smart-home/)
