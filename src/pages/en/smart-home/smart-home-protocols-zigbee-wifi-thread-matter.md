---
layout: ../../../layouts/EnPost.astro
title: "Smart-home protocols: Zigbee, Wi-Fi, Thread, Matter"
description: "Zigbee, Wi-Fi, Z-Wave, Thread and Matter explained: mesh, gateways, battery life and Home Assistant. Comparison table and beginner picks."
updated: "2 November 2026"
---

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/en/smart-home/">Smart home</a> · Protocols</nav>

*Also available in [French](/domotique/protocoles-domotique-zigbee-wifi-thread-matter/).*

> **Quick answer (November 2026)** — For a **local Home Assistant** setup, start with **Zigbee** sensors (USB coordinator + ZHA or Zigbee2MQTT) and **Wi-Fi** only for mains-powered plugs or cameras. Choose **Matter** when you need Apple + Google + Alexa on the same device; **Thread** is the low-power radio Matter often rides on.

This guide is part of our [smart home hub](/en/smart-home/) alongside dongle picks, beginner paths and error-code tools.

Before you buy your first sensor, decide **the language your devices will speak**. A Wi-Fi plug, a Zigbee sensor and a Matter bulb do not join your home the same way—and that choice drives which hub or USB coordinator you need. This page summarises the five protocols you will see on shop shelves, based on official documentation ([Connectivity Standards Alliance](https://csa-iot.org/all-solutions/matter/), [Thread Group](https://www.threadgroup.org/What-is-Thread/Overview), [Z-Wave Alliance](https://z-wavealliance.org/), [Home Assistant integrations](https://www.home-assistant.io/integrations/)).

## At a glance

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Protocol</th>
<th scope="col">Frequency (UK / US)</th>
<th scope="col">Network</th>
<th scope="col">Gateway needed</th>
<th scope="col">Power</th>
<th scope="col">In Home Assistant</th>
</tr></thead><tbody>
<tr>
<td data-label="Protocol"><span class="td-val"><strong>Wi-Fi</strong></span></td>
<td data-label="Frequency (UK / US)"><span class="td-val">2.4 GHz (sometimes 5 GHz)</span></td>
<td data-label="Network"><span class="td-val">Star around your router</span></td>
<td data-label="Gateway needed"><span class="td-val">No</span></td>
<td data-label="Power"><span class="td-val">High: mains-powered devices</span></td>
<td data-label="In Home Assistant"><span class="td-val">Brand-dependent (local or cloud)</span></td>
</tr>
<tr>
<td data-label="Protocol"><span class="td-val"><strong>Zigbee</strong></span></td>
<td data-label="Frequency (UK / US)"><span class="td-val">2.4 GHz (IEEE 802.15.4)</span></td>
<td data-label="Network"><span class="td-val">Mesh: mains devices relay</span></td>
<td data-label="Gateway needed"><span class="td-val">Yes: USB coordinator</span></td>
<td data-label="Power"><span class="td-val">Very low: coin-cell sensors last months</span></td>
<td data-label="In Home Assistant"><span class="td-val">ZHA (built-in) or Zigbee2MQTT</span></td>
</tr>
<tr>
<td data-label="Protocol"><span class="td-val"><strong>Z-Wave</strong></span></td>
<td data-label="Frequency (UK / US)"><span class="td-val">868.4 MHz (UK/EU) / 908.4 MHz (US)</span></td>
<td data-label="Network"><span class="td-val">Mesh</span></td>
<td data-label="Gateway needed"><span class="td-val">Yes: Z-Wave controller</span></td>
<td data-label="Power"><span class="td-val">Very low</span></td>
<td data-label="In Home Assistant"><span class="td-val">Z-Wave JS</span></td>
</tr>
<tr>
<td data-label="Protocol"><span class="td-val"><strong>Thread</strong></span></td>
<td data-label="Frequency (UK / US)"><span class="td-val">2.4 GHz (IEEE 802.15.4)</span></td>
<td data-label="Network"><span class="td-val">Mesh, IPv6</span></td>
<td data-label="Gateway needed"><span class="td-val">Yes: border router</span></td>
<td data-label="Power"><span class="td-val">Very low</span></td>
<td data-label="In Home Assistant"><span class="td-val">Thread and Matter integrations</span></td>
</tr>
<tr>
<td data-label="Protocol"><span class="td-val"><strong>Matter</strong></span></td>
<td data-label="Frequency (UK / US)"><span class="td-val">Runs over Wi-Fi, Thread or Ethernet</span></td>
<td data-label="Network"><span class="td-val">Common application layer</span></td>
<td data-label="Gateway needed"><span class="td-val">Depends on transport</span></td>
<td data-label="Power"><span class="td-val">Depends on transport</span></td>
<td data-label="In Home Assistant"><span class="td-val">Matter integration</span></td>
</tr>
</tbody>
</table>
</div>

**Our pick for starting out: Zigbee**, with a coordinator USB stick on Home Assistant. The catalogue is large, sensors are cheap and long-lived on battery, and everything can stay local. For dongle choices see [the best Zigbee dongle for Home Assistant](/en/smart-home/best-zigbee-dongle-home-assistant/).

## Wi-Fi: simplest, not the most efficient

A Wi-Fi device connects straight to your router—no separate gateway. That suits a [smart plug](/en/smart-home/smart-plugs-uk-us/) or a camera on mains power. Wi-Fi draws too much for a small battery sensor, and each device uses a slot on your LAN. Many budget Wi-Fi products also rely on the maker’s cloud: check that a **local** integration exists in Home Assistant before you buy.

## Zigbee: the sensor standard

Zigbee uses IEEE 802.15.4 at 2.4 GHz. Mains-powered devices (plugs, bulbs) **relay** messages: the more you add, the farther the network reaches. You need a **coordinator**—usually a USB stick—and Home Assistant drives it with ZHA or Zigbee2MQTT. We compare both in [Zigbee2MQTT vs ZHA](/en/smart-home/zigbee2mqtt-vs-zha-home-assistant/). Example: a [Zigbee temperature sensor](/en/smart-home/zigbee-temperature-sensor/) runs for months on a coin cell.

**Watch out:** Zigbee and Wi-Fi share 2.4 GHz. Move the dongle away from the router with a USB extension and pick channels that do not overlap.

## Z-Wave: robust, smaller catalogue

Z-Wave uses **868.4 MHz** in the UK and EU and **908.4 MHz** in the US—away from Wi-Fi, which cuts interference. The mesh is certified by the Z-Wave Alliance. The trade-off is fewer products and typically higher prices than Zigbee. **Region matters:** a US module will not work on a UK hub and vice versa.

## Thread and Matter: the next generation

**Thread** is a low-power mesh on IEEE 802.15.4 with IPv6. It needs a **border router** on your home network; some speakers and routers include one.

**Matter** is not a radio—it is a common language (Connectivity Standards Alliance, v1.0 from October 2022) over Wi-Fi, Thread or Ethernet. One Matter device can be controlled from Home Assistant, Apple Home, Google Home and Alexa. Supported device types grow with each release but still lag behind Zigbee: check your category before buying.

## What we recommend

- **Starting with Home Assistant:** Zigbee for sensors, local Wi-Fi for plugs and cameras.
- **Apple, Google and Amazon at once:** favour Matter-certified gear.
- **Concrete walls, long distances:** Z-Wave or a Zigbee mesh rich in mains-powered relays.
- **DIY sensors:** an [ESP32 with ESPHome](/en/smart-home/esp32-esphome-temperature-sensor/) uses Wi-Fi; some newer boards add Thread ([which ESP32 board](/en/smart-home/which-esp32-board-for-smart-home/)).

For the rest of the journey—budget, first kit, hub choice—see [Smart home for beginners](/en/smart-home/getting-started/), [Home Assistant, Jeedom, Homey or off-the-shelf hubs](/en/smart-home/home-assistant-jeedom-homey-which-hub/) and the [compatibility matrix (Zigbee, Matter, Homey)](/en/smart-home/compatibility-matrix-home-assistant-homey-zigbee-matter/).

[All smart-home guides](/en/smart-home/)
