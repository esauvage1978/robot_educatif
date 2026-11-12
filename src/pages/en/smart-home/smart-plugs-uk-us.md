---
layout: ../../../layouts/EnPost.astro
title: "Smart plugs for Home Assistant in the UK and US (2026 guide)"
description: "How to choose a smart plug for a UK (Type G, 230V, 13A) or US (Type A/B, 120V, 15A) home: Zigbee vs Wi-Fi vs Matter, energy monitoring, certification and Home Assistant set-up."
updated: "21 October 2026"
---

The smart plug is the easiest first smart home device, but it is also the one where **the country matters most**. A plug designed for French or German sockets (Type E/F) is the wrong product for a UK or US home. This guide explains what to check.

## 1. UK vs US: the electrical basics

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col"> </th>
<th scope="col">United Kingdom</th>
<th scope="col">United States</th>
</tr></thead><tbody>
<tr>
<td><span class="td-val">Socket</span></td>
<td data-label="United Kingdom"><span class="td-val">Type G (BS 1363)</span></td>
<td data-label="United States"><span class="td-val">Type A/B (NEMA 1-15 / 5-15)</span></td>
</tr>
<tr>
<td><span class="td-val">Voltage</span></td>
<td data-label="United Kingdom"><span class="td-val">230 V, 50 Hz</span></td>
<td data-label="United States"><span class="td-val">120 V, 60 Hz</span></td>
</tr>
<tr>
<td><span class="td-val">Typical max load</span></td>
<td data-label="United Kingdom"><span class="td-val">13 A (fused plug), about 3,000 W</span></td>
<td data-label="United States"><span class="td-val">15 A circuit; most smart plugs are rated 15 A, about 1,800 W</span></td>
</tr>
<tr>
<td><span class="td-val">Markings to look for</span></td>
<td data-label="United Kingdom"><span class="td-val">UKCA (or CE), BS 1363 compliance</span></td>
<td data-label="United States"><span class="td-val">FCC ID for the radio; UL or ETL listing for safety</span></td>
</tr>
</tbody>
</table>
</div>

**Always check the rated load** printed on the plug before connecting a heater, kettle or space heater, and avoid daisy-chaining plugs.

## 2. Zigbee, Wi-Fi or Matter?

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Type</th>
<th scope="col">Pros</th>
<th scope="col">Cons</th>
<th scope="col">Choose it if</th>
</tr></thead><tbody>
<tr>
<td data-label="Type"><span class="td-val"><strong>Zigbee</strong></span></td>
<td data-label="Pros"><span class="td-val">local, low power, acts as a mesh repeater</span></td>
<td data-label="Cons"><span class="td-val">needs a Zigbee coordinator</span></td>
<td data-label="Choose it if"><span class="td-val">you run Home Assistant with a <a href="/en/smart-home/best-zigbee-dongle-home-assistant/">Zigbee dongle</a></span></td>
</tr>
<tr>
<td data-label="Type"><span class="td-val"><strong>Wi-Fi</strong></span></td>
<td data-label="Pros"><span class="td-val">no hub, quick app set-up</span></td>
<td data-label="Cons"><span class="td-val">busier Wi-Fi, often cloud-dependent</span></td>
<td data-label="Choose it if"><span class="td-val">you're just starting</span></td>
</tr>
<tr>
<td data-label="Type"><span class="td-val"><strong>Matter (over Wi-Fi or Thread)</strong></span></td>
<td data-label="Pros"><span class="td-val">works with Apple Home, Google Home, Alexa, SmartThings and Home Assistant</span></td>
<td data-label="Cons"><span class="td-val">check the Matter logo and version on the box</span></td>
<td data-label="Choose it if"><span class="td-val">you want to avoid lock-in</span></td>
</tr>
</tbody>
</table>
</div>

## 3. What to check on the spec sheet

- **Energy monitoring** (W, kWh): useful to spot standby power and to trigger "washing machine finished" alerts.
- **Rated load**: 13 A in the UK, usually 15 A in the US.
- **Local control**: can it work without the maker's cloud? Shelly, most Zigbee plugs and Matter plugs can.
- **Physical button and LED**: handy for guests; check that the LED can be turned off in a bedroom.

## 4. Example: Shelly plugs

Shelly sells its plugs in **local versions** (UK Type G, US Type A/B, EU), with Wi-Fi, local control and Home Assistant integration. Choose your country version from the [Shelly smart plug range](https://www.shelly.com/collections/smart-plugs). For hard-wired lighting, the [Shelly 1 Gen4](https://www.shelly.com/products/shelly-1-gen4) relay accepts **110–240 V AC** and switches up to **16 A at 240 V** ([Shelly knowledge base](https://kb.shelly.cloud/knowledge-base/shelly-1-gen4)), so one model suits both countries. It must be installed behind a switch by someone qualified, in line with UK (Part P) or US (local code) rules.

## 5. Adding a plug to Home Assistant

1. **Zigbee plug**: in Home Assistant, open the ZHA or Zigbee2MQTT integration, choose *Add device*, then hold the plug's button until its LED flashes.
2. **Wi-Fi plug**: set it up on your network with the maker's app, then add the matching integration (Shelly is discovered automatically on the local network).
3. **Matter plug**: scan the Matter QR code from the Home Assistant companion app.

## 6. Two useful automations

- **Washing machine finished**: when power drops below a few watts for two minutes, send a phone notification.
- **Kill standby at night**: switch off the TV corner at midnight, back on at 7 am.

Getting started from scratch? Read [smart home for beginners](/en/smart-home/getting-started/).

[All smart-home guides](/en/smart-home/)
