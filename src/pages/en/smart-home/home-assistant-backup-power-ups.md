---
layout: ../../../layouts/EnPost.astro
title: "Backup power for Home Assistant: UPS vs power station, sizing and clean shutdown"
description: "Keep your Pi, Green, router and Zigbee mesh alive through outages: measure loads, estimate runtime, NUT integration and automations."
updated: "24 October 2026"
---

*Also available in [French](/domotique/secours-electrique-home-assistant-onduleur-station/).*

A few seconds without mains reboots Home Assistant, drops your router and weakens Zigbee. Longer outages take alarms, leak sensors and notifications offline when you need them most. This guide helps you **size** backup power, pick **UPS vs portable power station**, surface battery state in HA and **shut down cleanly** before the battery dies.

We budget **device by device**, including **Zigbee routers** on mains-powered plugs.

## Goals

- Measure real watts for the smart-home core.  
- Estimate runtime or required Wh.  
- Pick gear with suitable **transfer time**.  
- Alert on battery and trigger **host shutdown**.

## What must stay on

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Device</th>
<th scope="col">Why</th>
</tr></thead><tbody>
<tr>
<td data-label="Device"><span class="td-val">Home Assistant (Pi 5, Green, etc.)</span></td>
<td data-label="Why"><span class="td-val">Automations, history, notify</span></td>
</tr>
<tr>
<td data-label="Device"><span class="td-val">Zigbee coordinator (USB)</span></td>
<td data-label="Why"><span class="td-val">Already counted with the server</span></td>
</tr>
<tr>
<td data-label="Device"><span class="td-val">Router (+ fibre ONT if separate)</span></td>
<td data-label="Why"><span class="td-val">Phone alerts, remote access</span></td>
</tr>
<tr>
<td data-label="Device"><span class="td-val">Network switch if between router and server</span></td>
<td data-label="Why"><span class="td-val">No LAN without it</span></td>
</tr>
</tbody>
</table>
</div>

**Battery Zigbee sensors** keep working. **Mains-powered Zigbee plugs and bulbs** are mesh **routers**—when they lose power, distant sensors may drop off. Check the ZHA or Zigbee2MQTT map before you rely on sensors across the house during an outage.

## Measure, don’t guess

Use a **plug-in power meter** or a smart plug with energy reporting in HA. Label ratings on PSUs are **maximums**, not typical draw.

Rough references (measure yours):

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Device</th>
<th scope="col">Reference</th>
</tr></thead><tbody>
<tr>
<td data-label="Device"><span class="td-val">Home Assistant Green</span></td>
<td data-label="Reference"><span class="td-val">~1.7 W idle, ~3 W load (official spec)</span></td>
</tr>
<tr>
<td data-label="Device"><span class="td-val">Raspberry Pi 5</span></td>
<td data-label="Reference"><span class="td-val">27 W PSU rating—actual HA load much lower; measure</span></td>
</tr>
<tr>
<td data-label="Device"><span class="td-val">ISP router</span></td>
<td data-label="Reference"><span class="td-val">Often the largest load—read brick label and measure</span></td>
</tr>
</tbody>
</table>
</div>

## Autonomy math

- **P** = sum of average watts (W).  
- **E** = usable Wh ≈ battery Wh × usable fraction × inverter efficiency.  
- **Runtime (h)** = E / P.  
- **Capacity needed for t hours:** C ≈ P × t / (usable × efficiency).

Example (illustrative only—**replace with your measurements**): Green 3 W + router 15 W + switch 2 W → **P = 20 W**. A 300 Wh station at ~90 % usable and ~85 % AC efficiency → E ≈ 230 Wh → **~11 h**. For **24 h** at 20 W AC out you might need **~630 Wh** before margins.

The **router often dominates** the Pi. Unplug TVs and chargers from the backed-up strip.

**DC tip:** Green accepts **12 V DC** (official spec)—a station with a suitable 12 V port can skip one conversion step; verify voltage, current and connector before wiring.

## UPS vs power station

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col"> </th>
<th scope="col">UPS</th>
<th scope="col">Power station</th>
</tr></thead><tbody>
<tr>
<td><span class="td-val">Role</span></td>
<td data-label="UPS"><span class="td-val">Minutes to a few hours + clean shutdown</span></td>
<td data-label="Power station"><span class="td-val">Larger reserve, sometimes portable</span></td>
</tr>
<tr>
<td><span class="td-val">Transfer</span></td>
<td data-label="UPS"><span class="td-val">Designed for fast switchover</span></td>
<td data-label="Power station"><span class="td-val">Only if <strong>UPS/EPS</strong> mode—read spec</span></td>
</tr>
<tr>
<td><span class="td-val">HA integration</span></td>
<td data-label="UPS"><span class="td-val">Often USB HID + <strong>NUT</strong></span></td>
<td data-label="Power station"><span class="td-val">Rarely standard; app/cloud</span></td>
</tr>
<tr>
<td><span class="td-val">Typical 20 W runtime</span></td>
<td data-label="UPS"><span class="td-val">~1–3 h class UPS</span></td>
<td data-label="Power station"><span class="td-val">Half-day to multi-day class</span></td>
</tr>
</tbody>
</table>
</div>

**Pass-through charging ≠ UPS.** Confirm **transfer time** on the datasheet.

Permanent mains charging of a station 24/7: read manufacturer guidance on battery longevity.

Shopping: UPS with USB and [NUT compatibility](https://networkupstools.org/stable-hcl.html)—[Amazon UK UPS search](https://www.amazon.co.uk/s?k=UPS+USB+HID&tag=roboteducatif-21) · [US](https://www.amazon.com/s?k=UPS+USB+HID&tag=roboteducatif-20).

## Test a real outage

Charge fully, plug only HA + router + switch, **unplug the UPS/station from the wall** (not the device power button), confirm no reboot, Zigbee still responds, note % drop over 30 min and recalculate runtime.

## NUT in Home Assistant (UPS path)

1. USB from UPS to HA host.  
2. Install **Network UPS Tools** add-on; configure driver (often `usbhid-ups`).  
3. Add **NUT** integration ([docs](https://www.home-assistant.io/integrations/nut/)).  
4. Entities like `sensor.ups_battery_charge`, `sensor.ups_status`.

Notify on battery:

alias: Mains lost - on battery
triggers:
  - trigger: state
    entity_id: sensor.ups_status
    to: "On Battery, Battery Discharging"
actions:
  - action: notify.mobile_app_your_phone
    data:
      message: "Power cut: smart home on battery."

Shutdown below 25 % **while still on battery**:

alias: Low battery - shutdown HA
triggers:
  - trigger: numeric_state
    entity_id: sensor.ups_battery_charge
    below: 25
conditions:
  - condition: state
    entity_id: sensor.ups_status
    state: "On Battery, Battery Discharging"
actions:
  - action: notify.mobile_app_your_phone
    data:
      message: "Battery under 25%: shutting down in 2 minutes."
  - delay: "00:02:00"
  - action: hassio.host_shutdown

## Power stations without NUT

Use a **witness device** on **non-backed-up** mains—e.g. ESP32 on a normal USB charger going `unavailable` in HA when grid drops ([ESPHome sensor](/en/smart-home/esp32-esphome-temperature-sensor/)). Avoid cloud-only battery apps during internet loss unless the router is also on backup.

## After power returns

After **`hassio.host_shutdown`**, Pi/Green may need a **power cycle** on the backup outlet if the UPS never cut output. Plan a “Home Assistant started” notification.

## Common mistakes

- Sizing from PSU labels.  
- Forgetting router/ONT.  
- Treating pass-through as UPS.  
- Loading heaters or printers on the backup strip.  
- Shutdown automation without “on battery” condition.

Also: [Install Home Assistant](/en/smart-home/install-home-assistant-raspberry-pi-5/) · [CO₂ on Pi](/en/smart-home/raspberry-pi-co2-scd41-home-assistant/) · [solar outdoor camera](/en/smart-home/solar-outdoor-security-camera-iegeek/).

[All smart-home guides](/en/smart-home/)
