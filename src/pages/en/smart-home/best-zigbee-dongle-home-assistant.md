---
layout: ../../../layouts/EnPost.astro
title: "Best Zigbee dongle for Home Assistant (2026): compared"
description: "SONOFF ZBDongle-E, Home Assistant Connect ZBT-2, SONOFF Dongle Lite MG21 or ConBee II? Chips, Thread support, ZHA and Zigbee2MQTT compatibility compared."
updated: "17 November 2026"
---

On **robot-educatif.info**, we compare Zigbee USB coordinators for readers running **Home Assistant** in the UK or the US. To control Zigbee devices, you need a **coordinator**: a USB stick with a 2.4 GHz radio. The table uses manufacturer specs; real range depends on walls and mesh repeaters.

Partner links (`/go/`) may earn a commission at no extra cost. Check stock before checkout.

![SONOFF ZBDongle-E Zigbee USB coordinator for Home Assistant](/images/products/sonoff-zbdongle-e.webp)

<div class="article-toc" role="navigation" aria-label="On this page">
<p class="article-toc-title">On this page</p>
<ul>
<li><a href="#compare">Comparison table</a></li>
<li><a href="#buy">Where to buy</a></li>
<li><a href="#zha">ZHA or Zigbee2MQTT</a></li>
<li><a href="#tips">Set-up tips</a></li>
</ul>
</div>

## 1. Comparison table {#compare}

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

## 2. ZHA or Zigbee2MQTT? {#zha}

- **ZHA** is built into Home Assistant: the simplest route for beginners.
- **Zigbee2MQTT** supports a very wide device list and gives more detail, but needs an MQTT broker add-on.

All four dongles above work with both.

## 3. Set-up tips {#tips}

1. Use a **USB extension cable** (about 1 m) to move the dongle away from the computer and USB 3 ports, which interfere with 2.4 GHz.
2. Keep Zigbee and Wi-Fi channels apart (for example Zigbee channel 15, 20 or 25).
3. Add **mains-powered Zigbee devices** (plugs) early: they act as repeaters and strengthen the mesh.

## 4. Where to buy in the UK and US {#buy}

| Model | UK | US |
|---|---|---|
| SONOFF ZBDongle-E | <a href="https://www.amazon.com/dp/B0B6P22YJC?tag=roboteducatif-20" rel="sponsored nofollow noopener" target="_blank">Amazon.com</a> | <a href="/go/az-us-1d41f4ef62/" rel="sponsored nofollow noopener">Amazon.com</a> |
| Home Assistant Green (hub + Zigbee path) | <a href="https://www.amazon.com/dp/B0B6P22YJC?tag=roboteducatif-20" rel="sponsored nofollow noopener" target="_blank">Home Assistant hardware (UK)</a> | <a href="/go/az-us-8ba6d0fd8d/" rel="sponsored nofollow noopener">Home Assistant Green search</a> |

Official pages remain the reference for firmware: [SONOFF ZBDongle-E](https://sonoff.tech/products/sonoff-zigbee-3-0-usb-dongle-plus-zbdongle-e), [Home Assistant Connect ZBT-2](https://www.home-assistant.io/connect/zbt-2/).

Cross-read: [compatibility matrix](/en/smart-home/compatibility-matrix-home-assistant-homey-zigbee-matter/), [ESP32 projects hub](/en/smart-home/esp32-projects/), [getting started](/en/smart-home/getting-started/).

Choosing a hub? See [Home Assistant Green vs Raspberry Pi 5](/en/smart-home/home-assistant-green-vs-raspberry-pi-5/).

## FAQ {#faq}

### Does any dongle work in the UK and the US?

Yes. Zigbee 3.0 uses 2.4 GHz globally. What changes is the shop, plug type for mains-powered repeaters, and Amazon marketplace.

### ZHA or Zigbee2MQTT for a first home?

Start with **ZHA** if you only use Home Assistant. Pick **Zigbee2MQTT** when you need exotic devices or MQTT logging.

### Do I need Thread on the coordinator?

Not in 2026 for Zigbee-only homes. **ZBT-2** is future-proof if you plan Thread border routing on the same stick later.
