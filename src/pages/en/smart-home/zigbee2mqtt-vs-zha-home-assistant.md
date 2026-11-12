---
layout: ../../../layouts/EnPost.astro
title: "Zigbee2MQTT or ZHA for Home Assistant: which to choose"
description: "ZHA vs Zigbee2MQTT: architecture, dongles, setup steps, migration traps and who each suits—based on official docs, November 2026."
updated: "2 November 2026"
shareTitle: "ZHA or Zigbee2MQTT for Home Assistant?"
shareDescription: "Pick ZHA for a fast start, Zigbee2MQTT for MQTT tinkerers—dongles, setup order, and common mistakes."
---

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/en/smart-home/">Smart home</a> · Zigbee2MQTT vs ZHA</nav>

> **Quick answer (November 2026)** — For most homes, start with **ZHA** (Zigbee Home Automation—the built-in Home Assistant Zigbee integration). Choose **Zigbee2MQTT** if you already run an **MQTT** broker (Message Queuing Telemetry Transport, a lightweight publish/subscribe bus) for Node-RED or scripts outside Home Assistant. Full hub: [smart-home guides](/en/smart-home/).

*Also available in [French](/domotique/home-assistant-zigbee2mqtt-ou-zha/). Canadian readers: same content on `/ca/smart-home/` with [Amazon.ca buying links](/en/best-programmable-robot-for-kids/).*

You plugged a **Zigbee** (low-power 2.4 GHz mesh radio for sensors and bulbs) **USB stick** into your Pi or Home Assistant Green and Home Assistant offers **ZHA** or **Zigbee2MQTT**. Both run your sensors, plugs and bulbs—but differently. This guide follows the [ZHA integration docs](https://www.home-assistant.io/integrations/zha/) and [Zigbee2MQTT getting started](https://www.zigbee2mqtt.io/guide/getting-started/) (November 2026). We did not benchmark speed or range—no invented performance numbers.

![SONOFF Zigbee dongle and Home Assistant — illustration](/images/illustrations/home-assistant-zigbee2mqtt-ou-zha.webp)

*Illustration: a USB Zigbee coordinator is the “brain” of your mesh; keep it on a short USB extension away from Wi-Fi interference.*

**Readers in Canada:** the same steps apply on Windows, macOS and Home Assistant OS. On `/ca/` URLs, prefer **Amazon.ca** for dongles and accessories—links below include Canadian listings where available. See also our [Canadian buying guides](/en/best-programmable-robot-for-kids/).

## Short answer

- **New and want it working fast?** **ZHA**—built into Home Assistant, no MQTT broker, settings in the usual UI.  
- **Tinkerer, odd devices, or MQTT elsewhere?** **Zigbee2MQTT**—separate service, rich web UI, anything that speaks MQTT can subscribe.  
- **Rule:** **one coordinator, one stack**—never run ZHA and Zigbee2MQTT on the same USB stick.

## Architecture

ZHA:          Zigbee device → USB stick → Home Assistant (ZHA)
Zigbee2MQTT:  Zigbee device → USB stick → Zigbee2MQTT → MQTT (Mosquitto) → Home Assistant

## Comparison

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col"> </th>
<th scope="col"><strong>ZHA</strong></th>
<th scope="col"><strong>Zigbee2MQTT</strong></th>
</tr></thead><tbody>
<tr>
<td><span class="td-val">Runs on</span></td>
<td data-label="**ZHA**"><span class="td-val">Inside Home Assistant</span></td>
<td data-label="**Zigbee2MQTT**"><span class="td-val">Add-on or separate host</span></td>
</tr>
<tr>
<td><span class="td-val">MQTT broker</span></td>
<td data-label="**ZHA**"><span class="td-val">Not needed</span></td>
<td data-label="**Zigbee2MQTT**"><span class="td-val">Required (Mosquitto)</span></td>
</tr>
<tr>
<td><span class="td-val">Setup</span></td>
<td data-label="**ZHA**"><span class="td-val">Few clicks, auto-detect common sticks</span></td>
<td data-label="**Zigbee2MQTT**"><span class="td-val">Mosquitto, repo, add-on, wizard</span></td>
</tr>
<tr>
<td><span class="td-val">UI</span></td>
<td data-label="**ZHA**"><span class="td-val">Home Assistant settings</span></td>
<td data-label="**Zigbee2MQTT**"><span class="td-val">Dedicated Zigbee2MQTT frontend</span></td>
</tr>
<tr>
<td><span class="td-val">Radio families (docs)</span></td>
<td data-label="**ZHA**"><span class="td-val">Silicon Labs (EZSP), TI (ZNP), deCONZ, ZiGate</span></td>
<td data-label="**Zigbee2MQTT**"><span class="td-val">TI (zStack) and Silicon Labs (Ember) recommended; deCONZ supported</span></td>
</tr>
<tr>
<td><span class="td-val">Odd devices</span></td>
<td data-label="**ZHA**"><span class="td-val">“Quirks” in ZHA</span></td>
<td data-label="**Zigbee2MQTT**"><span class="td-val">“Converters” in Z2M</span></td>
</tr>
<tr>
<td><span class="td-val">OTA firmware</span></td>
<td data-label="**ZHA**"><span class="td-val">Limited vendor list</span></td>
<td data-label="**Zigbee2MQTT**"><span class="td-val">Community firmware repo</span></td>
</tr>
<tr>
<td><span class="td-val">Network backup</span></td>
<td data-label="**ZHA**"><span class="td-val">Automatic; migration between some sticks in ZHA</span></td>
<td data-label="**Zigbee2MQTT**"><span class="td-val">Coordinator backup (zStack/Ember); changing stack often means re-pairing</span></td>
</tr>
<tr>
<td><span class="td-val">Use sensors outside HA</span></td>
<td data-label="**ZHA**"><span class="td-val">No</span></td>
<td data-label="**Zigbee2MQTT**"><span class="td-val">Yes—Node-RED, scripts, etc.</span></td>
</tr>
<tr>
<td><span class="td-val">Minimum hardware</span></td>
<td data-label="**ZHA**"><span class="td-val">Same as HA</span></td>
<td data-label="**Zigbee2MQTT**"><span class="td-val">64-bit; Pi 4+ advised for the add-on</span></td>
</tr>
</tbody>
</table>
</div>

## Dongles that work with both

**Silicon Labs** and **Texas Instruments** sticks suit both stacks. The **SONOFF ZBDongle-E** (EFR32MG21) is listed for ZHA; Zigbee2MQTT uses the `ember` adapter — see our [SONOFF brand page](/en/sonoff-brand/) for context on plugs and dongles. **Home Assistant Connect ZBT-2** is the official stick (MG24)—Zigbee or Thread. Details: [best Zigbee dongle](/en/smart-home/best-zigbee-dongle-home-assistant/).

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Dongle</th>
<th scope="col">Notes</th>
</tr></thead><tbody>
<tr>
<td data-label="Dongle"><span class="td-val">SONOFF ZBDongle-E</span></td>
<td data-label="Notes"><span class="td-val">Official Sonoff page. The price is on the shop of the country.</span></td>
</tr>
<tr>
<td data-label="Dongle"><span class="td-val">Home Assistant Connect ZBT-2</span></td>
<td data-label="Notes"><span class="td-val"><a href="https://www.home-assistant.io/connect/zbt-2/">Home Assistant Connect ZBT-2</a></span></td>
</tr>
</tbody>
</table>
</div>

**Zigbee2MQTT tip:** use a **USB extension** so the stick sits away from the Pi—first fix for pairing drops and 2.4 GHz clash with Wi-Fi.

## Install ZHA (summary)

1. Plug stick (extension cable).  
2. **Settings → Devices & services**—configure if discovered, or add **Zigbee Home Automation** and pick serial port.  
3. **Settings → Connectivity → Zigbee → Add device**—reset sensor per manual.

## Install Zigbee2MQTT on Home Assistant OS (summary)

1. Install **Mosquitto broker** add-on and start it.  
2. Add repository `https://github.com/zigbee2mqtt/hassio-zigbee2mqtt`.  
3. Install stable **Zigbee2MQTT** add-on (not Edge unless you know why).  
4. Run the web wizard—pick stick, Wi-Fi channel hint, pair devices.  
5. If ZHA was using the stick, **remove ZHA first**.

Example manual config for ZBDongle-E (port from `ha hardware info`):

adapter: ember
port: /dev/serial/by-id/usb-…-if00-port0

## Switching stacks

Official **migration without re-pairing** is documented **within ZHA** (coordinator stick to stick). Moving **ZHA ↔ Zigbee2MQTT** usually means **re-pairing every device**—decide before you deploy twenty sensors.

### Checklist before you migrate

1. Export a **full Home Assistant backup** (Settings → System → Backups).  
2. Note your **Zigbee channel** and Wi-Fi 2.4 GHz channel (avoid overlap).  
3. **Remove** the old integration (ZHA or Zigbee2MQTT add-on) so the USB stick is released.  
4. Install the new stack, pick the correct **serial by-id path**, pair one test bulb or sensor first.  
5. Only then move production automations—update entity IDs in scripts.

If Zigbee2MQTT logs **ember** or **EZSP** adapter errors on a SONOFF stick, see our troubleshooting pattern (French catalog page mirrors the fix): driver must match **ZBDongle-E** (`ember`) vs **ZBDongle-P** (`zstack`).

## Common mistakes

- Two stacks fighting for one `/dev/tty*`  
- Wi-Fi and Zigbee on overlapping 2.4 GHz channels—fix Wi-Fi channels first, add **mains-powered routers** (plugs, bulbs)  
- Bulbs switched off at the wall—mesh holes  
- `modemmanager` grabbing the stick on generic Linux—ZHA docs say to remove it

## Who should pick what

- **Family, 5–20 mainstream devices:** **ZHA**  
- **Maker publishing MQTT from Pi scripts** ([door sensor tutorial](/en/smart-home/raspberry-pi-door-sensor-notification/) · [PIR lighting project](/en/smart-home/raspberry-pi-pir-motion-sensor-lighting/)): **Zigbee2MQTT**  
- **Specific model in mind:** search it in [Z2M supported devices](https://www.zigbee2mqtt.io/supported-devices/) and ZHA device compatibility **before** you buy

## FAQ

**Can I run ZHA and Zigbee2MQTT on one stick?**  
No—one USB coordinator, one stack. Two sticks means two separate Zigbee networks (rare at home).

**Is Zigbee2MQTT “more pro”?**  
It exposes more detail and MQTT topics; that does not automatically mean better reliability for a family setup.

**Does ZHA need Mosquitto?**  
No. Zigbee2MQTT does.

**Pi 3 enough for Zigbee2MQTT?**  
Official docs recommend at least a **Raspberry Pi 4** for the add-on; ZHA on a Pi 3 can still work for small networks.

**Where to buy dongles in Canada?**  
Use **Amazon.ca** listings in our [best Zigbee dongle](/en/smart-home/best-zigbee-dongle-home-assistant/) table (ZBDongle-E and ZBT-2 rows include CA links).

More: [Install Home Assistant on Pi 5](/en/smart-home/install-home-assistant-raspberry-pi-5/) · [Zigbee temperature sensor](/en/smart-home/zigbee-temperature-sensor/) · [best Zigbee dongle](/en/smart-home/best-zigbee-dongle-home-assistant/) · [smart-home protocols](/en/smart-home/smart-home-protocols-zigbee-wifi-thread-matter/) · [SONOFF brand context](/en/sonoff-brand/).

[All smart-home guides](/en/smart-home/)
