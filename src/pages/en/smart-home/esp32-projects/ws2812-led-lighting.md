---
layout: ../../../../layouts/EnPost.astro
title: "WS2812 LED lighting on ESP32 with ESPHome"
description: "Addressable WS2812B strip on ESP32-C6 with ESPHome: 5 V supply, data resistor, YAML and Home Assistant light effects."
updated: "30 October 2026"
---

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/en/smart-home/">Smart home guides</a> · <a href="/en/smart-home/esp32-smart-home-project-ideas/">ESP32 projects</a></nav>

**Goal:** drive a **WS2812B** addressable LED strip from **Home Assistant** using an **ESP32** board and **ESPHome**. This tutorial covers supply sizing, common ground, a **330 Ω** data resistor, and a reliable YAML configuration.

Also in French: [WS2812 lighting (FR)](/domotique/projets-esp32-domotique/) (overview hub).

## Before you wire anything

- Use a **5 V** WS2812B strip (not 12 V or 24 V) and count your LEDs.
- Size the PSU: about **60 mA per LED** at full white → a 30-LED metre needs roughly **2 A**; leave **20 % margin**.
- Share **GND** between the ESP32, the strip and the 5 V supply.
- Put a **330 Ω** resistor in series on the **DIN** line near the first pixel.

Prep guides: [ESPHome temperature sensor](/en/smart-home/esp32-esphome-temperature-sensor/) · [ESP32 project ideas](/en/smart-home/esp32-smart-home-project-ideas/) · [Which ESP32 board?](/en/smart-home/which-esp32-board-for-smart-home/) · [Smart home hub](/en/smart-home/).

## Minimal ESPHome YAML (excerpt)

light:
  - platform: neopixelbus
    type: GRB
    variant: WS2812
    pin: GPIO18
    num_leds: 30
    name: "Cabinet strip"
    effects:
      - random:
      - strobe:
      - flicker:

Adopt the device in Home Assistant, then add the light entity to dashboards and automations (sunrise wake-up, movie scene, alert colour).

## Troubleshooting

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Symptom</th>
<th scope="col">Likely cause</th>
<th scope="col">Fix</th>
</tr></thead><tbody>
<tr>
<td data-label="Symptom"><span class="td-val">First LEDs white, rest off</span></td>
<td data-label="Likely cause"><span class="td-val">Undersized 5 V supply</span></td>
<td data-label="Fix"><span class="td-val">Heavier PSU, inject power at both ends on long runs</span></td>
</tr>
<tr>
<td data-label="Symptom"><span class="td-val">Random colours</span></td>
<td data-label="Likely cause"><span class="td-val">Missing/common GND</span></td>
<td data-label="Fix"><span class="td-val">Tie ESP32 GND to strip GND and PSU −</span></td>
</tr>
<tr>
<td data-label="Symptom"><span class="td-val">No data</span></td>
<td data-label="Likely cause"><span class="td-val">Wrong GPIO or no resistor</span></td>
<td data-label="Fix"><span class="td-val">GPIO18 + 330 Ω on DIN; try level shifter on long cables</span></td>
</tr>
<tr>
<td data-label="Symptom"><span class="td-val">Flicker on effects</span></td>
<td data-label="Likely cause"><span class="td-val">Wi-Fi or power sag</span></td>
<td data-label="Fix"><span class="td-val">Separate PSU from USB hub; shorten data wire</span></td>
</tr>
</tbody>
</table>
</div>

## Related tutorials

- [ESP32 smart-home project ideas](/en/smart-home/esp32-smart-home-project-ideas/)
- [ESPHome temperature sensor](/en/smart-home/esp32-esphome-temperature-sensor/) (same ESP32 series)
- [Which ESP32 board?](/en/smart-home/which-esp32-board-for-smart-home/)
- [Smart plugs as Zigbee routers](/en/smart-home/smart-plugs-uk-us/)

[← All smart-home guides](/en/smart-home/)
