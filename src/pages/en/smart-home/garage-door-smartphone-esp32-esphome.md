---
layout: ../../../layouts/EnPost.astro
title: "Open your garage door from your phone with ESP32, ESPHome and Home Assistant"
description: "Safe dry-contact wiring on the opener’s push-button input, reed sensor for open/closed, Home Assistant cover entity—with security warnings."
updated: "2 November 2026"
---

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/en/smart-home/">Smart home guides</a></nav>

*Also available in [French](/domotique/ouvrir-porte-garage-smartphone-esp32-esphome/).*

Control the garage from your phone **and** know if it stayed open: a **relay in parallel with the wall button** sends the same short pulse as a physical press; a **reed switch** reports closed when the door is down. Home Assistant shows a garage **cover** in the mobile app.

## Safety — read first

- Confirm in the **opener manual** a **dry-contact / momentary push-button** input (low voltage). If the manual does not describe it, stop.  
- **Never work on mains** inside the opener unless you are qualified—power off before opening the housing; wire only the low-voltage button terminals.  
- Keep **photo eyes, force limits and obstacle detection**—never bypass them.  
- Remote access: use **Home Assistant Cloud**, **Tailscale** or VPN—not a naked port forward. Enable **2FA** on accounts.  
- Add **confirmation** in the dashboard before toggling—pocket taps are real.  
- Only operate remotely when you are sure **no one is under the door**.

## Goal

- Toggle from Home Assistant with confirmation.  
- True open/closed state from reed.  
- Alert if open too long.

## Time, level, parts

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Time</th>
<th scope="col">Level</th>
<th scope="col">Parts</th>
</tr></thead><tbody>
<tr>
<td data-label="Time"><span class="td-val">2–3 h</span></td>
<td data-label="Level"><span class="td-val">Intermediate</span></td>
<td data-label="Parts"><span class="td-val">ESP32, 3.3 V-compatible relay module, wired reed, USB 5 V supply</span></td>
</tr>
</tbody>
</table>
</div>

- ESP32 DevKit — [UK](https://www.amazon.co.uk/s?k=ESP32+DevKit&tag=roboteducatif-21) · [US](https://www.amazon.com/s?k=ESP32+DevKit&tag=roboteducatif-20)  
- **1-channel relay that triggers on 3.3 V logic** (many “5 V” boards fail on ESP32 GPIO)—[UK search](https://www.amazon.co.uk/s?k=relay+module+3.3v&tag=roboteducatif-21) · [US](https://www.amazon.com/s?k=relay+module+3.3v&tag=roboteducatif-20)  
- Wired door reed — [UK](https://www.amazon.co.uk/s?k=garage+door+reed+switch&tag=roboteducatif-21) · [US](https://www.amazon.com/s?k=garage+door+reed+switch&tag=roboteducatif-20)

A Shelly in **dry-contact** mode can substitute for the relay if you follow that device’s manual the same way.

## Wiring

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Part</th>
<th scope="col">Pin</th>
<th scope="col">To</th>
</tr></thead><tbody>
<tr>
<td data-label="Part"><span class="td-val">Relay VCC</span></td>
<td data-label="Pin"><span class="td-val"></span></td>
<td data-label="To"><span class="td-val">ESP32 3V3 (or 5 V per module spec)</span></td>
</tr>
<tr>
<td data-label="Part"><span class="td-val">Relay GND</span></td>
<td data-label="Pin"><span class="td-val"></span></td>
<td data-label="To"><span class="td-val">GND</span></td>
</tr>
<tr>
<td data-label="Part"><span class="td-val">Relay IN</span></td>
<td data-label="Pin"><span class="td-val"></span></td>
<td data-label="To"><span class="td-val"><strong>GPIO26</strong></span></td>
</tr>
<tr>
<td data-label="Part"><span class="td-val">Relay COM / NO</span></td>
<td data-label="Pin"><span class="td-val">dry contact</span></td>
<td data-label="To"><span class="td-val">Opener <strong>button</strong> terminals (parallel with wall button)</span></td>
</tr>
<tr>
<td data-label="Part"><span class="td-val">Reed</span></td>
<td data-label="Pin"><span class="td-val"></span></td>
<td data-label="To"><span class="td-val"><strong>GPIO27</strong> + GND (internal pull-up)</span></td>
</tr>
</tbody>
</table>
</div>

Reed **closed** when door fully down (magnet aligned).

## ESPHome

Install **ESPHome** add-on. Use secrets for Wi-Fi and API keys. Download the full example: [`/code/esphome/porte-garage.yaml`](/code/esphome/porte-garage.yaml) (English labels; French variant: [`porte-garage.yaml`](/code/esphome/porte-garage.yaml)).

Core behaviour:

- **Pulse** relay ~700 ms (adjust 0.5–1 s per opener manual)—never latched (`restore_mode: ALWAYS_OFF`).  
- **Template cover:** `open_action` only if reed says closed; `close_action` only if open—so “open” on an open door does not start closing by mistake.  
- Script `mode: single` debounces double taps.

Flash USB first: `esphome run porte-garage.yaml`; then OTA.

## Home Assistant UI

Dashboard button with confirmation:

type: button
entity: cover.garage_door
name: Garage door
show_state: true
tap_action:
  action: toggle
  confirmation:
    text: "Operate the garage door?"

Alert if open 15 minutes—adapt entity ids to yours.

## After power loss

Firmware runs on the ESP32; relay defaults off at boot—power glitch should not pulse the door.

## Common mistakes

- Relay on **power** terminals instead of **button** input.  
- Relay that needs 5 V on IN while ESP32 outputs 3.3 V.  
- Pulse too long.  
- Exposed HA on the internet without VPN/TLS.

## Verification note

YAML was validated with `esphome config` / compile (ESPHome 2026.9); we did not install on a live door—**your opener manual is authoritative**.

Docs: [ESPHome template cover](https://esphome.io/components/cover/template/) · [HA remote access](https://www.home-assistant.io/docs/configuration/remote/).

Also: [ESPHome temperature](/en/smart-home/esp32-esphome-temperature-sensor/) · [door reed on Pi](/en/smart-home/raspberry-pi-door-sensor-notification/) · [ESP32 projects](/en/smart-home/esp32-smart-home-project-ideas/).

[All smart-home guides](/en/smart-home/)
