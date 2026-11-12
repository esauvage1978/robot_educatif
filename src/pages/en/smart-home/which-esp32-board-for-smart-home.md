---
layout: ../../../layouts/EnPost.astro
title: "Which ESP32 board for smart home: classic, S3, C3, C6 or H2?"
description: "Espressif ESP32 family compared: cores, Wi-Fi, Bluetooth, Thread/Zigbee, USB and GPIO. Pick the right board for ESPHome sensors, cameras or Thread experiments."
updated: "2 November 2026"
---

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/en/smart-home/">Smart home guides</a> · Which ESP32 board?</nav>

*Also available in [French](/domotique/quelle-carte-esp32-choisir-domotique/).*

![ESP32-C6 DevKit board on a desk](/images/products/esp32-c6-devkitc.webp)

“**ESP32**” today means a whole family of **Espressif** chips (the company that designs them). For **[ESPHome](https://esphome.io/)** (open firmware that talks to **[Home Assistant](https://www.home-assistant.io/)**, a local smart-home hub), the chip you buy decides **Wi-Fi** (wireless internet at home), **Bluetooth**, **Thread** (a low-power mesh protocol), **USB** and how many **GPIO** pins (general-purpose wires on the board) you get. Below are the five **SoCs** (System-on-Chip: processor + radio on one silicon die) most often found on dev boards, with specs taken from [Espressif product pages](https://www.espressif.com/en/products/socs) (checked November 2026).

**Short answer:** start with a **classic ESP32 DevKit** for tutorials; pick **ESP32-S3** for cameras; choose **ESP32-C6** only if you explicitly want **Wi-Fi 6** plus **802.15.4** (Thread/Zigbee radio). See also our [smart-home hub for beginners](/en/smart-home/).

## At a glance

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Chip</th>
<th scope="col">Cores / max clock</th>
<th scope="col">Wi-Fi</th>
<th scope="col">Bluetooth</th>
<th scope="col">IEEE 802.15.4 (Thread, Zigbee)</th>
<th scope="col">Native USB</th>
<th scope="col">SRAM</th>
</tr></thead><tbody>
<tr>
<td data-label="Chip"><span class="td-val"><strong>ESP32</strong> (classic)</span></td>
<td data-label="Cores / max clock"><span class="td-val">2 × Xtensa LX6, 240 MHz</span></td>
<td data-label="Wi-Fi"><span class="td-val">Wi-Fi 4 (802.11n), 2.4 GHz</span></td>
<td data-label="Bluetooth"><span class="td-val">Classic + BLE 4.2</span></td>
<td data-label="IEEE 802.15.4 (Thread, Zigbee)"><span class="td-val">No</span></td>
<td data-label="Native USB"><span class="td-val">No</span></td>
<td data-label="SRAM"><span class="td-val">520 KB</span></td>
</tr>
<tr>
<td data-label="Chip"><span class="td-val"><strong>ESP32-S3</strong></span></td>
<td data-label="Cores / max clock"><span class="td-val">2 × Xtensa LX7, 240 MHz</span></td>
<td data-label="Wi-Fi"><span class="td-val">Wi-Fi 4, 2.4 GHz</span></td>
<td data-label="Bluetooth"><span class="td-val">BLE 5</span></td>
<td data-label="IEEE 802.15.4 (Thread, Zigbee)"><span class="td-val">No</span></td>
<td data-label="Native USB"><span class="td-val">Yes (OTG)</span></td>
<td data-label="SRAM"><span class="td-val">512 KB</span></td>
</tr>
<tr>
<td data-label="Chip"><span class="td-val"><strong>ESP32-C3</strong></span></td>
<td data-label="Cores / max clock"><span class="td-val">1 × RISC-V, 160 MHz</span></td>
<td data-label="Wi-Fi"><span class="td-val">Wi-Fi 4, 2.4 GHz</span></td>
<td data-label="Bluetooth"><span class="td-val">BLE 5</span></td>
<td data-label="IEEE 802.15.4 (Thread, Zigbee)"><span class="td-val">No</span></td>
<td data-label="Native USB"><span class="td-val">Serial/JTAG</span></td>
<td data-label="SRAM"><span class="td-val">400 KB</span></td>
</tr>
<tr>
<td data-label="Chip"><span class="td-val"><strong>ESP32-C6</strong></span></td>
<td data-label="Cores / max clock"><span class="td-val">1 × RISC-V 160 MHz + low-power core</span></td>
<td data-label="Wi-Fi"><span class="td-val"><strong>Wi-Fi 6</strong> (802.11ax), 2.4 GHz only</span></td>
<td data-label="Bluetooth"><span class="td-val">BLE 5</span></td>
<td data-label="IEEE 802.15.4 (Thread, Zigbee)"><span class="td-val"><strong>Yes</strong></span></td>
<td data-label="Native USB"><span class="td-val">Serial/JTAG</span></td>
<td data-label="SRAM"><span class="td-val">512 KB</span></td>
</tr>
<tr>
<td data-label="Chip"><span class="td-val"><strong>ESP32-H2</strong></span></td>
<td data-label="Cores / max clock"><span class="td-val">1 × RISC-V, 96 MHz</span></td>
<td data-label="Wi-Fi"><span class="td-val"><strong>No Wi-Fi</strong></span></td>
<td data-label="Bluetooth"><span class="td-val">BLE 5</span></td>
<td data-label="IEEE 802.15.4 (Thread, Zigbee)"><span class="td-val"><strong>Yes</strong></span></td>
<td data-label="Native USB"><span class="td-val">Serial/JTAG</span></td>
<td data-label="SRAM"><span class="td-val">320 KB</span></td>
</tr>
</tbody>
</table>
</div>

**Our default for beginners: classic ESP32 (DevKitC).** Best documented in ESPHome and forums; enough for most projects on [ESP32 smart-home ideas](/en/smart-home/esp32-smart-home-project-ideas/). Choose **ESP32-S3** for cameras or extra GPIO; **ESP32-C6** if you want to experiment with Thread on the same chip as Wi-Fi.

![Seeed XIAO ESP32-C6 module](/images/products/xiao-esp32c6.webp)

## Classic ESP32: safe default

Two cores, Wi-Fi and Bluetooth (including **Bluetooth Classic**, useful for some audio or legacy gadgets), plenty of GPIO—the chip in our [ESPHome temperature](/en/smart-home/esp32-esphome-temperature-sensor/) and [garage door](/en/smart-home/garage-door-smartphone-esp32-esphome/) guides. Bluetooth also works as a **proxy** so Home Assistant can reach distant **BLE** (Bluetooth Low Energy) sensors.

## ESP32-S3: pins and USB

Dual 240 MHz cores, **native USB OTG** (On-The-Go: plug the board like a USB device without an extra serial chip), more GPIO and vector instructions useful for signal work. Common on camera and display boards. No Bluetooth Classic—BLE 5 only.

## ESP32-C3: small and cheap

Single **RISC-V** core (an open CPU architecture), Wi-Fi and BLE 5—enough for a sensor or relay. Boards are often tiny for enclosures. Fewer pins than classic ESP32.

## ESP32-C6 and H2: Thread and Zigbee radio

The **C6** combines **Wi-Fi 6 on 2.4 GHz**, BLE 5 and **IEEE 802.15.4** (the radio used by **Thread** and **Zigbee**). It does **not** replace your router’s 5 GHz Wi-Fi—it only adds faster 2.4 GHz Wi-Fi and the 802.15.4 radio on one board.

The **H2** has **no Wi-Fi**—built for battery Thread or Zigbee end devices. ESPHome support for these radios is still evolving: check [ESPHome ESP32 docs](https://esphome.io/components/esp32/) before you commit. Background: [smart-home protocols](/en/smart-home/smart-home-protocols-zigbee-wifi-thread-matter/).

![ESPHome temperature sensor project with ESP32](/images/illustrations/esp32-esphome-capteur-temperature.webp)

## Buying tips

- Prefer a **dev board** over a bare module: USB, regulator and reset button included.
- Check **USB-C vs micro-USB** and whether a USB–serial chip is needed.
- **Flash:** 4 MB is enough for ESPHome; 8 MB+ and **PSRAM** (extra RAM for images) for cameras.
- **Power:** 5 V USB; use a decent mains adapter for permanent installs.

Then follow the [ESPHome temperature guide](/en/smart-home/esp32-esphome-temperature-sensor/) and pick a project from [ESP32 smart-home ideas](/en/smart-home/esp32-smart-home-project-ideas/).

## FAQ

**Do I need Thread to use ESPHome?**  
No. Most ESPHome nodes use **Wi-Fi only**. Thread matters if you build a **Matter** or **Thread border router** experiment.

**ESP32-C6 vs classic ESP32 for a temperature sensor?**  
Classic ESP32 is cheaper and better documented. C6 only if you already plan **802.15.4** tests.

**What is BLE?**  
**Bluetooth Low Energy**—low-power wireless for sensors. Home Assistant can read them through an ESP32 **Bluetooth proxy**.

**Can I run Zigbee on ESP32-C6 inside ESPHome today?**  
Support moves quickly; read the current ESPHome release notes before buying hardware for Zigbee-only use.

[All smart-home guides](/en/smart-home/)
