---
layout: ../../../layouts/EnPost.astro
title: "ElectroHobby.es kit unboxing: 2 ESP32 DevKit boards, ESP32-C3 Super Mini and sensors (gifted)"
description: "Unboxing of the kit gifted by ElectroHobby.es: 2 ESP32 DevKit WROOM-32 USB-C boards, an ESP32-C3 Super Mini, relays, sensors and jumper wires, plus the ESP32 projects planned on this site."
updated: "19 November 2026"
---

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/en/smart-home/">Smart home guides</a> · ElectroHobby unboxing</nav>

> **Short answer** — On 19 November 2026 we received a parcel **gifted by ElectroHobby.es**, an educational-electronics shop based in Murcia, Spain. This article is an **unboxing**: it describes what was actually in the box and the projects we plan to publish on robot-educatif.info. **Nothing has been tested yet**, so you will not find measurements or a review verdict here.

Amazon links below are **affiliate links** (`/go/`): they may earn a commission at no extra cost. The ElectroHobby.es link is a **direct, non-affiliate** link.

<figure>
<img src="/images/domotique/electrohobby-unboxing/15-colis-papier-bulle.webp" alt="ElectroHobby.es parcel opened, parts still in bubble wrap" width="1600" height="1200" />
<figcaption>The parcel on opening, still in its bubble wrap.</figcaption>
</figure>

## What was in the box

<figure>
<img src="/images/domotique/electrohobby-unboxing/14-colis-ouvert-cartes-electrohobby.webp" alt="Contents of the ElectroHobby.es parcel with ESP32 boards, sensors and two memo cards" width="1600" height="2133" />
<figcaption>Overview of the kit, including the two ElectroHobby memo cards (resistor colour code and Ohm's law).</figcaption>
</figure>

Inventory as checked on 19 November 2026:

- **2 ESP32 DevKit** WROOM-32 boards, USB-C, 30 pins ;
- one **ESP32-C3 Super Mini**, with pin headers ;
- an **expansion board** for the ESP32-C3 Super Mini, with a battery connector ;
- a **2-relay 5 V module** (JQC3F-05VDC-C, with optocouplers) ;
- an **HC-SR04** ultrasonic sensor ;
- a **TEMT6000** light sensor ;
- a **water-level** sensor ;
- an **I2S microphone of the INMP441 type** (SD, VDD, GND, SCK, WS and LR pins) ;
- an **AHT20 + BMP280** module (temperature, humidity and pressure, I2C) ;
- about ten **reed switches** ;
- three ribbons of **Dupont jumper wires** (male-male, male-female, female-female) ;
- two **ElectroHobby memo cards** (resistor colour code, Ohm's law).

## The 2 ESP32 DevKit WROOM-32 USB-C boards

The parcel contains **2 distinct ESP32 DevKit** boards, in the classic 30-pin format, with a **USB-C** socket. This is the style of board we suggest for a first ESPHome project, in [which ESP32 board to choose](/en/smart-home/which-esp32-board-for-smart-home/).

<figure>
<img src="/images/domotique/electrohobby-unboxing/05-esp32-devkit-wroom-32-usbc-1.webp" alt="First ESP32 DevKit WROOM-32 USB-C 30-pin board, front view" width="1600" height="1200" />
<figcaption>The first of the 2 ESP32 DevKit boards.</figcaption>
</figure>

<figure>
<img src="/images/domotique/electrohobby-unboxing/06-esp32-devkit-wroom-32-usbc-2.webp" alt="Second ESP32 DevKit WROOM-32 USB-C board, a separate card" width="1600" height="1200" />
<figcaption>The second ESP32 DevKit — a second board, not another angle of the first one.</figcaption>
</figure>

Two identical boards make it easy to run two projects at once, for example a sensor on one and a relay on the other, without dismantling the first build.

## ESP32-C3 Super Mini and its expansion board

The **ESP32-C3 Super Mini** is a very small RISC-V board with Wi-Fi and Bluetooth Low Energy. It is handy when a project has to fit in a tight enclosure. The pin headers were supplied separately, to be soldered if needed.

<figure>
<img src="/images/domotique/electrohobby-unboxing/01-esp32-c3-super-mini-recto.webp" alt="ESP32-C3 Super Mini front, button and USB-C connector visible" width="1600" height="1200" />
<figcaption>Front of the ESP32-C3 Super Mini.</figcaption>
</figure>

<figure>
<img src="/images/domotique/electrohobby-unboxing/02-esp32-c3-super-mini-verso.webp" alt="ESP32-C3 Super Mini back, metal shield and solder pads" width="1600" height="1200" />
<figcaption>Back of the same board.</figcaption>
</figure>

The kit also includes an **expansion board** for this Super Mini, with a **battery connector**. It should help with off-grid sensor nodes. That will be checked in later builds, not in this unboxing.

<figure>
<img src="/images/domotique/electrohobby-unboxing/12-carte-extension-esp32-c3.webp" alt="Expansion board for the ESP32-C3 Super Mini with a battery connector" width="1600" height="2133" />
<figcaption>Expansion board for the ESP32-C3 Super Mini; the battery connector is visible.</figcaption>
</figure>

## 2-relay 5 V module

The module has two **JQC3F-05VDC-C** relays and optocouplers. This kind of board is used to drive a dry contact — the same need described in our guide to [opening a garage door from a phone with an ESP32](/en/smart-home/garage-door-smartphone-esp32-esphome/). Nothing has been wired yet.

<figure>
<img src="/images/domotique/electrohobby-unboxing/07-module-2-relais-5v.webp" alt="Two-channel 5 V relay module JQC3F-05VDC-C with optocouplers" width="1600" height="1200" />
<figcaption>5 V 2-relay module, with terminal blocks and optocouplers visible.</figcaption>
</figure>

## Sensors and microphone

The sensors suggest several future ESP32 tutorials. We are not drawing any performance conclusions until they have been tried.

<figure>
<img src="/images/domotique/electrohobby-unboxing/10-hc-sr04.webp" alt="HC-SR04 ultrasonic sensor, four pins VCC Trig Echo GND" width="1600" height="2133" />
<figcaption>HC-SR04 ultrasonic sensor, for distance or non-liquid level sensing.</figcaption>
</figure>

<figure>
<img src="/images/domotique/electrohobby-unboxing/03-temt6000.webp" alt="TEMT6000 ambient light sensor on a small breakout board" width="1600" height="1200" />
<figcaption>TEMT6000 light sensor.</figcaption>
</figure>

<figure>
<img src="/images/domotique/electrohobby-unboxing/04-capteur-niveau-eau.webp" alt="Water-level sensor with exposed traces and a three-wire terminal" width="1600" height="1200" />
<figcaption>Water-level sensor, intended for a tank or softener.</figcaption>
</figure>

<figure>
<img src="/images/domotique/electrohobby-unboxing/09-micro-i2s-inmp441.webp" alt="I2S microphone of the INMP441 type with SD, VDD, GND, SCK, WS and LR pins" width="1600" height="1200" />
<figcaption>I2S microphone of the INMP441 type, identified from the SD / VDD / GND / SCK / WS / LR silkscreen.</figcaption>
</figure>

<figure>
<img src="/images/domotique/electrohobby-unboxing/08-aht20-bmp280.webp" alt="Combined AHT20 and BMP280 module, I2C connector" width="1600" height="1200" />
<figcaption>AHT20 + BMP280 module: temperature, humidity and air pressure over I2C.</figcaption>
</figure>

The AHT20 + BMP280 weather module fits alongside our existing [ESP32 + ESPHome temperature sensor tutorial](/en/smart-home/esp32-esphome-temperature-sensor/). The water sensor and the HC-SR04 can support a level monitor. The I2S microphone could later be used for a local voice command.

## Reed switches and Dupont wires

<figure>
<img src="/images/domotique/electrohobby-unboxing/11-interrupteurs-reed-ils.webp" alt="About ten reed switches spread on the desk" width="1600" height="2133" />
<figcaption>Reed switches, for detecting a door or lid opening with a magnet.</figcaption>
</figure>

<figure>
<img src="/images/domotique/electrohobby-unboxing/13-cables-dupont.webp" alt="Three ribbons of Dupont jumper wires, male-male, male-female and female-female" width="1600" height="2133" />
<figcaption>The three supplied Dupont ribbons: male-male, male-female and female-female.</figcaption>
</figure>

Paired with a magnet, reed switches are a simple way to detect a door, window or lid opening. The jumper wires mean the first breadboard tests do not have to start with cutting leads.

## Projects we plan to publish

The kit has not been powered up yet. The following articles are **planned**, not written as tests:

The next build we want to document is a **salt-level controller for a water softener**, with a level reading under the lid of the salt bin and **leak detection** on the floor. This project has not been built yet, so there is no test result to report.

- an ESP32 **weather station** with the AHT20/BMP280, building on the [ESPHome tutorial already online](/en/smart-home/esp32-esphome-temperature-sensor/) ;
- a **water-level monitor** (tank or softener) with the dedicated sensor, possibly plus the HC-SR04 ;
- **opening detection** with the reed switches ;
- a **relay control**, in the spirit of the [garage-door guide](/en/smart-home/garage-door-smartphone-esp32-esphome/) ;
- later, a trial of the **I2S microphone** for local voice control.

More ideas are listed in our [10 ESP32 smart-home projects](/en/smart-home/esp32-smart-home-project-ideas/).

## Where to find these boards and sensors

The parcel was **gifted by** <a href="https://www.electrohobby.es/" rel="sponsored noopener" target="_blank">ElectroHobby.es</a> <small>(direct, non-affiliate link)</small>. The shop, based in Murcia, sells components and kits for educational electronics.

If you want a similar board from a marketplace, an affiliate search already exists on this site, with no price quoted here: <a href="/go/az-us-687e1d0e5e/" rel="sponsored nofollow noopener">ESP32 DevKit on Amazon</a> <small>(affiliate link)</small>. Always check the seller listing (pin count, USB-C or micro-USB, flash size) before you order.

## FAQ

### How do I power the ESP32 boards?

The **ESP32 DevKit** boards (the 30-pin development boards, with a **USB-C** socket — the modern oval USB connector) plug into an ordinary **5 V** phone charger that can supply at least **1 A** (one ampere). You need one charger and one cable per board, left plugged into a wall outlet.

The **2-relay 5 V module** (the small board that opens or closes an electrical contact) does not need a second power supply: once an ESP32 DevKit is already powered over USB, you connect the ESP32 **5 V** pin (often also labelled **VIN**, for "voltage input") to the module's power terminals with the supplied **Dupont jumper wires** (ready-made leads with plug-in ends).

The **ESP32-C3 Super Mini** (the most compact board in the kit) can, in principle, run from a **3.7 V LiPo** battery (a lithium-polymer cell, common in small off-grid gadgets), thanks to its **expansion board** and battery connector. We have not verified this on our kit yet: it will be checked during later builds.

### How do I connect the kit to Homey?

First, install **ESPHome** on the ESP32. ESPHome is firmware that you flash onto the board so it can join your **Wi-Fi** (the home wireless network) and publish its sensors. To get started, open [ESPHome Web](https://web.esphome.io) in a browser, connect the board with a USB cable, then set up Wi-Fi and the sensors.

Next, on **Homey** (the home-automation hub that controls the devices in the house), install the **ESPHome** app by Abe Haverkamp from the Homey App Store (a community app): [ESPHome app page](https://homey.app/en-us/app/io.esphome/). This app works on **Homey Pro** (2023 models and newer), **Homey Pro mini** and a self-hosted Homey server, with Homey software 13.0.0 or newer. It does **not** work on **Homey Cloud** (the offering without a Pro unit at home), nor on older Homey Pro units (2016–2019). Homey then talks to the board locally, on your home network, through ESPHome's **native API** (the built-in communication interface, which must be enabled in the configuration).

Once the app is installed, the ESP32 appears as a Homey device. You can use it in **Flows** (Homey automations: "when this happens, then do that").
