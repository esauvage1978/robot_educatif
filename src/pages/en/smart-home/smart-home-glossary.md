---
layout: ../../../layouts/EnPost.astro
title: "Smart home glossary: essential terms"
description: "Smart home words explained simply: hub, Zigbee, Matter, MQTT, ESPHome, automation, Flow, OTA, mesh... each with a concrete example."
updated: "30 October 2026"
faqSchema:
  - question: "Are box, hub and gateway the same thing?"
    answer: "In everyday language, almost. In detail, the box (or hub) is the brain of the house, while a gateway may only be a translator from one radio language to another."
  - question: "Do I need to know MQTT to start?"
    answer: "No. ZHA works without MQTT. This messaging system becomes useful if you choose Zigbee2MQTT or do a lot of DIY projects."
  - question: "Where do these words show up along the path?"
    answer: "In the choice of hub, the protocols guide and the first automations page."
---

You are reading an article about the smart home and a word stops you: an acronym, an English term or a brand name nobody has taken the time to explain? That is normal. This field has a habit of mixing all of these together.

This glossary is here for that. Each term is explained in a sentence or two, then illustrated with an example taken from a real home. You can browse it letter by letter with the index, or come back whenever a word escapes you. For full specifications, refer to the official documents of manufacturers and standards bodies (Connectivity Standards Alliance, Thread Group, Z-Wave Alliance).

## Go further

- [How your devices talk to each other (protocols)](/en/smart-home/smart-home-protocols-zigbee-wifi-thread-matter/)
- [Your first smart home automations](/en/smart-home/first-smart-home-automations/)
- [Beginner mistakes and their answers](/en/smart-home/smart-home-beginner-mistakes-faq/)
- [Which smart home hub for beginners](/en/smart-home/which-smart-home-hub-for-beginners/)

## Alphabetical index

[4](#chiffres) · [A](#a) · [B](#b) · [C](#c) · [D](#d) · [E](#e) · [F](#f) · [G](#g) · [H](#h) · [I](#i) · [L](#l) · [M](#m) · [O](#o) · [P](#p) · [R](#r) · [S](#s) · [T](#t) · [W](#w) · [Y](#y) · [Z](#z)

## 4

### <span id="chiffres"></span>433 MHz

An older radio band used by many remote-controlled roller shutters, doorbells and plugs. Quality and security vary a lot.  
**Example:** a remote-controlled plug from a few years ago that a receiver, or a Homey, can still drive.

## A

### <span id="a"></span>Action

What your home does when an automation fires: turn on a lamp, send a notification, set the heating.  
**Example:** you receive a message "the washing machine has finished".

### Automation

A rule of the type "if this happens, then do that", sometimes with extra conditions. See our [first automations](/en/smart-home/first-smart-home-automations/).  
**Example:** if there is movement in the hallway and it is dark, the light comes on.

## B

### <span id="b"></span>Bluetooth Low Energy (BLE)

A short-range, low-power radio found in smartwatches, some locks and nearby sensors.  
**Example:** a lock that opens from your phone when you are standing in front of the door.

### Border router

A device that links a Thread network (see below) to your home internet network, so that Thread devices can be controlled.  
**Example:** some recent smart speakers or boxes include this function.

### Box (hub)

The box, or small machine, that centralises your whole home: it receives the information from the sensors and runs your automations. See [which hub to choose](/en/smart-home/which-smart-home-hub-for-beginners/).  
**Example:** Home Assistant Green or Homey Pro mini.

## C

### <span id="c"></span>Cloud and local

The **cloud** means the manufacturer's servers, on the internet. **Local** means everything happens at home, between your devices and your hub.  
**Example:** a plug that can only be controlled by the manufacturer's app stops answering if the service or your connection goes down; a locally controlled plug keeps working.

### Condition

A filter that states in which case the automation must act: a time, a state, a presence.  
**Example:** only turn the heater on between 6 am and 10 pm.

### Coordinator (Zigbee)

The head of the Zigbee network: it accepts the devices and organises their exchanges. In practice, it is most often a small USB stick.  
**Example:** the SONOFF ZBDongle-E stick plugged into a Home Assistant box.

## D

### <span id="d"></span>Dongle

A small USB stick that adds a radio to your hub (Zigbee, Z-Wave or Thread, for example).  
**Example:** our guide to the [best Zigbee dongle](/en/smart-home/best-zigbee-dongle-home-assistant/).

## E

### <span id="e"></span>Entity

In Home Assistant, every piece of information and every command is an entity: a temperature, a switch, a light. Each one has a technical name.  
**Example:** `sensor.living_room_temperature` is the living room temperature.

### ESP32

A small, very cheap programmable electronic board with Wi-Fi and Bluetooth. It lets you build your own sensors or controls.  
**Example:** a home-made temperature sensor built with an ESP32, see our [ESP32 project ideas](/en/smart-home/esp32-smart-home-project-ideas/).

### ESPHome

A free tool to program boards such as the ESP32 and have them recognised by Home Assistant, without writing a real program.  
**Example:** [an ESP32 temperature sensor with ESPHome](/en/smart-home/esp32-esphome-temperature-sensor/).

## F

### <span id="f"></span>Flow (Homey)

The way Homey builds an automation: you assemble visual "When... And... Then..." cards.  
**Example:** when a door opens, and the heating is on, then send a notification.

## G

### <span id="g"></span>Gateway

Hardware or software that translates one language into another, for example radio into your internet network, or cloud into local.  
**Example:** Zigbee2MQTT acts as a gateway between Zigbee and MQTT.

### GPIO

The small metal pins of a board such as the Raspberry Pi, onto which you plug electronic components directly (an LED, a sensor).  
**Example:** connecting a temperature sensor to the pins of a Raspberry Pi.

## H

### <span id="h"></span>Home Assistant

Free software that brings all your connected devices together in a single app, and that runs at home, with no mandatory subscription.  
**Example:** it runs on a Home Assistant Green box or on a Raspberry Pi 5.

### Hub or bridge

Two words often used to talk about the box. A bridge can also be a small module that translates one radio language into another.  
**Example:** the Philips Hue bridge translates the app's commands into orders for the bulbs.

## I

### <span id="i"></span>Integration

A software module that teaches your hub to talk to a given brand or technology.  
**Example:** the Matter integration of Home Assistant.

## L

### <span id="l"></span>Local control

Operating a device without depending on the manufacturer's servers.  
**Example:** a Shelly module controlled directly through its address on your network, or a Zigbee sensor followed by ZHA.

## M

### <span id="m"></span>Matter

A common language, created by several big brands, that travels over Wi-Fi, Thread or a network cable. It lets the same device be understood by several systems.  
**Example:** a Matter bulb visible in both Home Assistant and Google Home (depending on the configuration chosen).

### Mesh

A layout where devices relay their neighbours' messages, like people passing a bucket of water. Zigbee, Z-Wave and Thread work this way.  
**Example:** a Zigbee plug in the hallway passes on the message from the bedroom sensor. See the page on [protocols](/en/smart-home/smart-home-protocols-zigbee-wifi-thread-matter/).

### MQTT

A very light messaging system, widely used by tinkerers. A device "publishes" a piece of information under an address, and the others can read it.  
**Example:** the living room temperature is published under the address `zigbee2mqtt/living_temp`.

## O

### <span id="o"></span>OTA (over the air)

A software update of a device's internal program, sent without a cable.  
**Example:** [OTA updates with ESPHome](/en/smart-home/esphome-ota-updates/).

## P

### <span id="p"></span>Pairing

The step where you "introduce" a new device to your hub, so that it recognises it.  
**Example:** you hold the button of a Zigbee sensor until your software announces "new device found".

## R

### <span id="r"></span>Raspberry Pi

A small computer the size of a bank card, widely used to run Home Assistant.  
**Example:** the Raspberry Pi 5, with a suitable power supply and a storage card.

## S

### <span id="s"></span>Scene

A set of states recalled at once: "movie night", "away".  
**Example:** turn off all the lights and lower the heating in a single gesture.

## T

### <span id="t"></span>Thread

A low-power mesh network. It needs a border router to be linked to your home internet network.  
**Example:** a Matter sensor that uses Thread as its radio.

### Trigger

The event that starts an automation.  
**Example:** a contact sensor changes from "closed" to "open".

## W

### <span id="w"></span>Wi-Fi

The wireless network of your internet router. Wi-Fi devices connect to it directly, with no extra stick, but they use more power and are rarely battery-operated.  
**Example:** a Tapo P110 plug connects to the home Wi-Fi.

## Y

### <span id="y"></span>YAML

A text format used to write rules by hand, with indentation to mark the structure. You can do without it when starting out.  
**Example:** the examples in the [first automations](/en/smart-home/first-smart-home-automations/) show a small YAML block.

## Z

### <span id="z"></span>Z-Wave

A mesh radio that works around 868 MHz in Europe (the frequency differs in other regions), so it is less disturbed by Wi-Fi.  
**Example:** a Z-Wave roller shutter module, driven by a dedicated USB stick.

### ZHA

The Home Assistant built-in way of managing a Zigbee network. The name comes from "Zigbee Home Automation".  
**Example:** to compare, see [ZHA or Zigbee2MQTT](/en/smart-home/zigbee2mqtt-vs-zha-home-assistant/).

### Zigbee

A low-power radio, perfect for sensors that run for months on a battery. It works as a mesh and uses the 2.4 GHz band.  
**Example:** the SONOFF SNZB-02D sensor, connected to Home Assistant through a USB stick.

### Zigbee router

A mains-powered device that relays the Zigbee messages of the others: a plug, a bulb.  
**Example:** a Zigbee plug in the middle of the home makes it possible to reach a distant sensor.

### Zigbee2MQTT

Another way of managing Zigbee in Home Assistant: it translates Zigbee messages into MQTT messages. It is an alternative to ZHA.  
**Example:** the catalogue of compatible devices is very well documented by the community.

## Frequently asked questions

**Are box, hub and gateway the same thing?**
In everyday language, almost. In detail, the box (or hub) is the brain of the house, while a gateway may only be a translator from one radio language to another. To pick up the general thread again, see the [complete beginner guide](/en/smart-home/begin-smart-home-complete-guide/).

**Do I need to know MQTT to start?**
No. ZHA works without MQTT. This messaging system becomes useful if you choose Zigbee2MQTT or do a lot of DIY projects.

**Where do these words show up along the path?**
In the [choice of hub](/en/smart-home/which-smart-home-hub-for-beginners/), the [protocols](/en/smart-home/smart-home-protocols-zigbee-wifi-thread-matter/) and the [automations](/en/smart-home/first-smart-home-automations/).

---

*Author: Emmanuel Sauvage. This glossary explains words for beginners; for full technical details, the specifications of standards bodies (CSA, Thread Group, Z-Wave Alliance) and manufacturers' documentation are the reference.*
