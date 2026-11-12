---
layout: ../../../layouts/EnPost.astro
title: "Home Assistant, Jeedom, Homey or voice hubs: which brain for your smart home?"
description: "Home Assistant, Jeedom, Homey Pro, Google Home, Alexa or Apple Home: local vs cloud, protocols, difficulty and who each suits. Comparison table for beginners."
updated: "24 October 2026"
---

*Also available in [French](/domotique/home-assistant-jeedom-homey-quel-systeme-choisir/).*

A connected home needs a **brain**—software or a box that reads sensors and runs automations. That choice fixes everything else: protocols, offline behaviour and day-to-day effort. Here are the main options from their official docs ([Home Assistant](https://www.home-assistant.io/installation/), [Jeedom](https://doc.jeedom.com/), [Homey Pro](https://homey.app/homey-pro/)).

## At a glance

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">System</th>
<th scope="col">Type</th>
<th scope="col">Works without internet</th>
<th scope="col">Native protocols</th>
<th scope="col">Difficulty</th>
<th scope="col">Best for</th>
</tr></thead><tbody>
<tr>
<td data-label="System"><span class="td-val"><strong>Home Assistant</strong></span></td>
<td data-label="Type"><span class="td-val">Open source (Apache 2.0) on Pi, mini-PC or official box</span></td>
<td data-label="Works without internet"><span class="td-val">Yes</span></td>
<td data-label="Native protocols"><span class="td-val">Wi-Fi, Matter; Zigbee, Z-Wave, Thread with a radio stick</span></td>
<td data-label="Difficulty"><span class="td-val">Medium</span></td>
<td data-label="Best for"><span class="td-val">Full local control</span></td>
</tr>
<tr>
<td data-label="System"><span class="td-val"><strong>Jeedom</strong></span></td>
<td data-label="Type"><span class="td-val">French stack, GPL core, official boxes</span></td>
<td data-label="Works without internet"><span class="td-val">Yes</span></td>
<td data-label="Native protocols"><span class="td-val">Via plugins (some paid)</span></td>
<td data-label="Difficulty"><span class="td-val">Medium</span></td>
<td data-label="Best for"><span class="td-val">French community, plugin ecosystem</span></td>
</tr>
<tr>
<td data-label="System"><span class="td-val"><strong>Homey Pro</strong></span></td>
<td data-label="Type"><span class="td-val">All-in-one box</span></td>
<td data-label="Works without internet"><span class="td-val">Yes for local devices</span></td>
<td data-label="Native protocols"><span class="td-val">Zigbee, Z-Wave, Thread, Matter, Wi-Fi, Bluetooth, 433 MHz, IR</span></td>
<td data-label="Difficulty"><span class="td-val">Low</span></td>
<td data-label="Best for"><span class="td-val">Ready-made box, minimal config</span></td>
</tr>
<tr>
<td data-label="System"><span class="td-val"><strong>Google Home / Alexa / Apple Home</strong></span></td>
<td data-label="Type"><span class="td-val">Voice ecosystems</span></td>
<td data-label="Works without internet"><span class="td-val">Partly</span></td>
<td data-label="Native protocols"><span class="td-val">Wi-Fi, Matter, Thread (device-dependent)</span></td>
<td data-label="Difficulty"><span class="td-val">Very low</span></td>
<td data-label="Best for"><span class="td-val">A few plugs and bulbs, voice</span></td>
</tr>
</tbody>
</table>
</div>

**Our pick: Home Assistant** on [Home Assistant Green or Raspberry Pi 5](/en/smart-home/home-assistant-green-vs-raspberry-pi-5/). Free, local, huge integration list—the stack we use in our guides.

## Home Assistant: the open option

Backed by Nabu Casa, Home Assistant installs on a [Raspberry Pi 5](/en/smart-home/install-home-assistant-raspberry-pi-5/), a mini-PC or a Green box. The project lists 1,500+ integrations—from Philips Hue to [robot vacuums](/en/smart-home/robot-vacuum-home-assistant/). A USB stick adds Zigbee or Thread ([dongle guide](/en/smart-home/best-zigbee-dongle-home-assistant/)).

Trade-offs: you will touch configuration sometimes, and monthly updates deserve a quick check. Remote access is DIY or optional [Home Assistant Cloud](https://www.nabucasa.com/).

## Jeedom: francophone alternative

Developed in France with French docs and community. GPL core on Raspberry Pi or official hardware. Features arrive as **plugins**—many free, some paid on the Jeedom Market. A solid fit if you want a French-first plugin world.

## Homey Pro: radios in one box

Homey Pro bundles Zigbee, Z-Wave, Thread, Matter, Wi-Fi, Bluetooth, 433 MHz and IR for legacy kit. Flows are visual; setup is the least technical of the local options. You depend on Homey-published apps for some brands.

We started testing the compact unit: [Homey Pro mini unboxing and setup](/en/smart-home/homey-pro-mini-unboxing-setup/).

## Google Home, Alexa, Apple Home: easy but limited

Voice hubs handle a few plugs, bulbs and thermostats well and are opening to **Matter** ([protocol guide](/en/smart-home/smart-home-protocols-zigbee-wifi-thread-matter/)). Advanced automations and full offline use hit limits quickly. They still complement Home Assistant—HA can expose devices for voice control.

## How to decide

1. **Voice-only for a few lamps:** a voice assistant is enough.
2. **Local home, no subscription:** Home Assistant.
3. **Local but no tinkering:** Homey Pro.
4. **French community and plugins:** Jeedom.

Next: [getting started](/en/smart-home/getting-started/) and [smart home for renters](/en/smart-home/smart-home-renters-no-drilling/).

[All smart-home guides](/en/smart-home/)
