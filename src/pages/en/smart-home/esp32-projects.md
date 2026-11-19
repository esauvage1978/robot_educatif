---
layout: ../../../layouts/DomotiqueHub.astro
title: "ESP32 projects with ESPHome and Home Assistant"
description: "ESP32 and ESPHome projects: which board to choose (ESP32, S3, C3, C6, H2), a temperature sensor, a smartphone-controlled garage door and 10 project ideas."
pubDate: 2026-10-23
updatedDate: 2026-11-17
category: esp32
lang: "en"
frSlug: "rub:esp32"
---


<figure>
<a href="/en/smart-home/electrohobby-esp32-kit-unboxing/"><img src="/images/domotique/electrohobby-unboxing/14-colis-ouvert-cartes-electrohobby.webp" alt="Opened ElectroHobby.es parcel with ESP32 boards and memo cards" width="1600" height="2133" /></a>
<figcaption><a href="/en/smart-home/electrohobby-esp32-kit-unboxing/">Unboxing of the ESP32 kit gifted by ElectroHobby.es</a> — 2 ESP32 DevKit boards, an ESP32-C3 Super Mini and sensors.</figcaption>
</figure>

The ESP32 is a small, inexpensive electronic board with built-in Wi-Fi. With [ESPHome](https://esphome.io/), you prepare firmware from a simple YAML file—no full-time C++ coding—and the board plugs straight into [Home Assistant](/en/smart-home/home-assistant/). On **robot-educatif.info** we group our ESP32 smart-home walkthroughs here so you can pick a board, flash a first sensor, then scale to garage doors or energy monitoring.

Some links below are partner links (`/go/`): they may earn a commission at no extra cost. Check the seller page before ordering.

![ESP32 DevKit board running an ESPHome temperature sensor in Home Assistant](/images/illustrations/esp32-esphome-capteur-temperature.webp)

<div class="article-toc" role="navigation" aria-label="On this page">
<p class="article-toc-title">On this page</p>
<ul>
<li><a href="#essentials">Essentials table</a></li>
<li><a href="#boards">Which board first?</a></li>
<li><a href="#buy">Where to buy</a></li>
<li><a href="#faq">FAQ</a></li>
</ul>
</div>

## The essentials in one table {#essentials}

| Guide | Level | What you get |
|---|---|---|
| [ElectroHobby.es kit unboxing](/en/smart-home/electrohobby-esp32-kit-unboxing/) | Overview | contents of the gifted parcel: 2 ESP32 DevKit boards and sensors |
| [Which ESP32 board to choose](/en/smart-home/which-esp32-board-for-smart-home/) | Beginner | the 5 chips compared from Espressif’s datasheets |
| [ESP32 and ESPHome temperature sensor](/en/smart-home/esp32-esphome-temperature-sensor/) | Beginner | your first sensor in Home Assistant |
| [Garage door controlled by smartphone](/en/smart-home/garage-door-smartphone-esp32-esphome/) | Intermediate | an ESP32 relay wired to the door opener |
| [10 ESP32 projects for the smart home](/en/smart-home/esp32-smart-home-project-ideas/) | All levels | ranked ideas, with the parts list |

## Our top pick {#boards}

**A classic ESP32 DevKitC board** is still the best documented choice in ESPHome. Move to the **ESP32-S3** when you need a camera, or to the **ESP32-C6** when you want Thread: see [which ESP32 board to choose](/en/smart-home/which-esp32-board-for-smart-home/).

Your ESP32 will need a server. Most readers start with [Home Assistant Green or a Raspberry Pi 5](/en/smart-home/home-assistant-green-vs-raspberry-pi-5/). For Zigbee devices that sit next to ESPHome nodes, add a [Zigbee USB coordinator](/en/smart-home/best-zigbee-dongle-home-assistant/).

## Where to buy {#buy}

- <a href="/go/az-us-8ba6d0fd8d/" rel="sponsored nofollow noopener">Home Assistant Green — Amazon.com search</a> · <a href="/go/az-gb-c0e0c96683/" rel="sponsored nofollow noopener">SONOFF ZBDongle-E — Amazon.co.uk</a> if you mix Zigbee with ESPHome.
- ESP32 boards: search <a href="/go/az-us-a70604b50e/" rel="sponsored nofollow noopener">ESP32 on Amazon.com</a> or open our [chip comparison](/en/smart-home/which-esp32-board-for-smart-home/) for exact DevKitC / C6 references.

## FAQ {#faq}

### Do I need to solder?

No for a first temperature or door sensor on a breadboard. Permanent installs use screw terminals or GPIO headers—see each project guide.

### ESPHome or Tasmota?

ESPHome integrates natively with Home Assistant and fits our tutorials. Tasmota is fine if you already use MQTT elsewhere.

### Will ESP32 work in a rental flat?

Yes: battery sensors and USB-powered nodes do not require chasing walls. Stick to plug-in relays if you cannot touch fixed wiring.