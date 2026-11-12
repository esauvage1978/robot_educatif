---
layout: ../../../layouts/EnPost.astro
title: "Raspberry Pi PIR motion sensor for Home Assistant lighting"
description: "HC-SR501 on GPIO, MQTT occupancy to Home Assistant, automation to turn lights on and off—beginner wiring guide with glossary."
updated: "2 November 2026"
shareTitle: "Raspberry Pi PIR motion lighting with Home Assistant"
shareDescription: "Wire HC-SR501 to GPIO4, publish MQTT occupancy, automate hall lights—no mains on the Pi."
---

*Also available in [French](/domotique/raspberry-pi-detecteur-presence-pir-eclairage/).*

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/en/smart-home/">Smart home</a> · PIR motion lighting</nav>

**Quick answer (November 2026)** — A **PIR** (*passive infrared*) module such as the **HC-SR501** detects body heat and sends a **3.3 V** signal on a **GPIO** pin (*general-purpose input/output*: a controllable pin on the Pi header). The Pi does **not** switch mains: it publishes **occupancy** over **MQTT** (*Message Queuing Telemetry Transport*: a lightweight messaging protocol) to **Home Assistant** (open-source home automation), which turns your smart bulbs on and off.

This project fits the [smart home hub](/en/smart-home/) alongside [door notifications](/en/smart-home/raspberry-pi-door-sensor-notification/) and [getting started with Home Assistant](/en/smart-home/getting-started/).

![HC-SR501 PIR module wired to a Raspberry Pi GPIO header — photo for wiring reference](/images/illustrations/raspberry-pi-detecteur-presence-pir-eclairage.webp)

*Wiring diagram: VCC to 5 V, OUT to GPIO4, GND to ground — verify against your module labels before powering on.*

## Goal

- Motion on **GPIO4** (BCM numbering, physical pin 7).  
- MQTT **occupancy** binary sensor in Home Assistant.  
- Turn a light on when motion is detected; off after 2 minutes with no motion.

## Time, level, parts

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Time</th>
<th scope="col">Level</th>
</tr></thead><tbody>
<tr>
<td data-label="Time"><span class="td-val">~45 min</span></td>
<td data-label="Level"><span class="td-val">Beginner</span></td>
</tr>
</tbody>
</table>
</div>

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Term</th>
<th scope="col">Meaning in one line</th>
</tr></thead><tbody>
<tr>
<td data-label="Term"><span class="td-val"><strong>PIR</strong></span></td>
<td data-label="Meaning in one line"><span class="td-val">Detects infrared from moving people (not small pets reliably).</span></td>
</tr>
<tr>
<td data-label="Term"><span class="td-val"><strong>GPIO</strong></span></td>
<td data-label="Meaning in one line"><span class="td-val">Pin on the Pi you read as on/off.</span></td>
</tr>
<tr>
<td data-label="Term"><span class="td-val"><strong>MQTT</strong></span></td>
<td data-label="Meaning in one line"><span class="td-val">How the Pi tells Home Assistant “someone is here”.</span></td>
</tr>
</tbody>
</table>
</div>

HC-SR501 module: [Amazon UK search](https://www.amazon.co.uk/s?k=HC-SR501&tag=roboteducatif-21) · [Amazon US search](https://www.amazon.com/s?k=HC-SR501&tag=roboteducatif-20)

The module runs on **5 V**; **OUT is 3.3 V** — safe on Pi GPIO without a level shifter.

## Wiring

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">PIR pin</th>
<th scope="col">Raspberry Pi (physical pin)</th>
<th scope="col">Role</th>
</tr></thead><tbody>
<tr>
<td data-label="PIR pin"><span class="td-val">VCC</span></td>
<td data-label="Raspberry Pi (physical pin)"><span class="td-val">2 (5V)</span></td>
<td data-label="Role"><span class="td-val">power</span></td>
</tr>
<tr>
<td data-label="PIR pin"><span class="td-val">OUT</span></td>
<td data-label="Raspberry Pi (physical pin)"><span class="td-val">7 (GPIO4)</span></td>
<td data-label="Role"><span class="td-val">motion signal</span></td>
</tr>
<tr>
<td data-label="PIR pin"><span class="td-val">GND</span></td>
<td data-label="Raspberry Pi (physical pin)"><span class="td-val">6 (GND)</span></td>
<td data-label="Role"><span class="td-val">ground</span></td>
</tr>
</tbody>
</table>
</div>

Set jumper **H** (*repeat trigger*): the sensor stays “on” while you keep moving. Turn the time dial **minimum** — Home Assistant handles how long the light stays on. Adjust the sensitivity pot if you get false triggers.

## Prepare the Pi

Target **Raspberry Pi OS Bookworm** on Pi 4 or **Pi 5**. Use a venv with system packages so **gpiozero** and **lgpio** work on Pi 5 (legacy RPi.GPIO does not):

sudo apt update
sudo apt install -y python3-venv python3-gpiozero python3-lgpio
mkdir -p ~/capteurs && cd ~/capteurs
python3 -m venv --system-site-packages venv
source venv/bin/activate
pip install paho-mqtt

## Script

Download [`presence_pir_mqtt.py`](/code/raspberry-pi/presence_pir_mqtt.py). It uses **gpiozero `MotionSensor`** on GPIO4 and publishes to your MQTT broker (same pattern as the [French step-by-step guide](/domotique/raspberry-pi-detecteur-presence-pir-eclairage/)).

## Automation (restart mode)

alias: Hall light on motion
mode: restart
triggers:
  - trigger: state
    entity_id: binary_sensor.raspberry_pi_pir_hall_occupancy
    to: "on"
actions:
  - action: light.turn_on
    target:
      entity_id: light.hall
  - wait_for_trigger:
      - trigger: state
        entity_id: binary_sensor.raspberry_pi_pir_hall_occupancy
        to: "off"
        for: "00:02:00"
  - action: light.turn_off
    target:
      entity_id: light.hall

Replace entity ids. For night dimming on a dimmable bulb:

data:
  brightness_pct: "{{ 15 if now().hour >= 23 or now().hour < 6 else 100 }}"

## systemd

Run the script as a service with MQTT environment variables — same pattern as the [door sensor project](/en/smart-home/raspberry-pi-door-sensor-notification/).

## FAQ

**Light flickers on/off?**  
Use automation **mode: restart** so each new motion resets the off timer.

**False triggers at boot?**  
Wait ~60 s after power-up for PIR warm-up.

**Pi 5 GPIO errors?**  
Install `python3-lgpio`; use venv with `--system-site-packages`.

## Troubleshooting

- **Heat sources:** avoid aiming at radiators or sunny windows.  
- **GPIO busy:** change `PIR_GPIO` in the script if GPIO4 is used for 1-Wire.  
- **No MQTT updates:** check broker address, username, and firewall.

Sources: [Adafruit PIR guide](https://learn.adafruit.com/pir-passive-infrared-proximity-motion-sensor) · [gpiozero MotionSensor](https://gpiozero.readthedocs.io/en/stable/api_input.html#motionsensor).

Also: [Zigbee temperature sensor](/en/smart-home/zigbee-temperature-sensor/) · [Home Assistant Green vs Pi 5](/en/smart-home/home-assistant-green-vs-raspberry-pi-5/).

[All smart-home guides](/en/smart-home/)
