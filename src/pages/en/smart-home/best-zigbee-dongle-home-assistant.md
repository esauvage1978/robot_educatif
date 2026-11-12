---
layout: ../../../layouts/EnPost.astro
title: "Best Zigbee dongle for Home Assistant (2026): compared"
description: "SONOFF ZBDongle-E, Home Assistant Connect ZBT-2, SONOFF Dongle Lite MG21 or ConBee II? Chips, Thread support, ZHA and Zigbee2MQTT compatibility compared."
updated: "21 October 2026"
---

To control Zigbee devices from **Home Assistant**, you need a **Zigbee coordinator**: a USB stick with a radio chip. Zigbee runs at **2.4 GHz worldwide**, so the same dongles work in the UK and the US; only the shop and stock change. The table below lists chips and features from the manufacturers' pages; range depends a lot on your walls and layout, so we leave it out.

## 1. Comparison table

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Model</th>
<th scope="col">Chip</th>
<th scope="col">Antenna</th>
<th scope="col">Thread / Matter</th>
<th scope="col">ZHA</th>
<th scope="col">Zigbee2MQTT</th>
<th scope="col">Best for</th>
</tr></thead><tbody>
<tr>
<td data-label="Model"><span class="td-val"><strong><a href="/en/sonoff-brand/">SONOFF</a> ZBDongle-E</strong></span></td>
<td data-label="Chip"><span class="td-val">Silicon Labs EFR32MG21</span></td>
<td data-label="Antenna"><span class="td-val">external</span></td>
<td data-label="Thread / Matter"><span class="td-val">not by default (Zigbee firmware)</span></td>
<td data-label="ZHA"><span class="td-val">yes</span></td>
<td data-label="Zigbee2MQTT"><span class="td-val">yes</span></td>
<td data-label="Best for"><span class="td-val">most people: well documented</span></td>
</tr>
<tr>
<td data-label="Model"><span class="td-val"><strong>Home Assistant Connect ZBT-2</strong></span></td>
<td data-label="Chip"><span class="td-val">Silicon Labs MG24</span></td>
<td data-label="Antenna"><span class="td-val">internal, in an optimised case</span></td>
<td data-label="Thread / Matter"><span class="td-val">yes (Thread firmware option)</span></td>
<td data-label="ZHA"><span class="td-val">yes</span></td>
<td data-label="Zigbee2MQTT"><span class="td-val">yes</span></td>
<td data-label="Best for"><span class="td-val">official Nabu Casa support, Thread-ready</span></td>
</tr>
<tr>
<td data-label="Model"><span class="td-val"><strong>SONOFF Dongle Lite MG21</strong></span></td>
<td data-label="Chip"><span class="td-val">Silicon Labs EFR32MG21</span></td>
<td data-label="Antenna"><span class="td-val">internal</span></td>
<td data-label="Thread / Matter"><span class="td-val">not by default</span></td>
<td data-label="ZHA"><span class="td-val">yes</span></td>
<td data-label="Zigbee2MQTT"><span class="td-val">yes</span></td>
<td data-label="Best for"><span class="td-val">smallest budget, small homes</span></td>
</tr>
<tr>
<td data-label="Model"><span class="td-val"><strong>ConBee II</strong> (dresden elektronik)</span></td>
<td data-label="Chip"><span class="td-val">deCONZ firmware</span></td>
<td data-label="Antenna"><span class="td-val">internal</span></td>
<td data-label="Thread / Matter"><span class="td-val">no</span></td>
<td data-label="ZHA"><span class="td-val">yes</span></td>
<td data-label="Zigbee2MQTT"><span class="td-val">yes</span></td>
<td data-label="Best for"><span class="td-val">users already on deCONZ / Phoscon</span></td>
</tr>
</tbody>
</table>
</div>

Official pages: [SONOFF ZBDongle-E](https://sonoff.tech/products/sonoff-zigbee-3-0-usb-dongle-plus-zbdongle-e), [Home Assistant Connect ZBT-2](https://www.home-assistant.io/connect/zbt-2/), [ConBee II](https://phoscon.de/en/conbee2). The price is on the shop page of the chosen country.

## 2. ZHA or Zigbee2MQTT?

- **ZHA** is built into Home Assistant: the simplest route for beginners.
- **Zigbee2MQTT** supports a very wide device list and gives more detail, but needs an MQTT broker add-on.

All four dongles above work with both.

## 3. Set-up tips

1. Use a **USB extension cable** (about 1 m) to move the dongle away from the computer and USB 3 ports, which interfere with 2.4 GHz.
2. Keep Zigbee and Wi-Fi channels apart (for example Zigbee channel 15, 20 or 25).
3. Add **mains-powered Zigbee devices** (plugs) early: they act as repeaters and strengthen the mesh.

## 4. Where to buy in the UK and US

SONOFF and Home Assistant hardware are sold by official resellers and large marketplaces in both countries. Check availability on the official pages above before ordering.

Choosing a hub? See [Home Assistant Green vs Raspberry Pi 5](/en/smart-home/home-assistant-green-vs-raspberry-pi-5/).

[All smart-home guides](/en/smart-home/)
