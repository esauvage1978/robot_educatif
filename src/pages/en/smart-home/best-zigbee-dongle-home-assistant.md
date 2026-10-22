---
layout: ../../../layouts/EnPost.astro
title: "Best Zigbee dongle for Home Assistant (2026): compared"
description: "SONOFF ZBDongle-E, Home Assistant Connect ZBT-2, SONOFF Dongle Lite MG21 or ConBee II? Chips, Thread support, ZHA and Zigbee2MQTT compatibility compared."
updated: "21 October 2026"
---

To control Zigbee devices from **Home Assistant**, you need a **Zigbee coordinator**: a USB stick with a radio chip. Zigbee runs at **2.4 GHz worldwide**, so the same dongles work in the UK and the US; only the shop and stock change. The table below lists chips and features from the manufacturers' pages; we have not measured range ourselves, so we don't quote range figures.

## 1. Comparison table

| Model | Chip | Antenna | Thread / Matter | ZHA | Zigbee2MQTT | Best for |
|---|---|---|---|---|---|---|
| **SONOFF ZBDongle-E** | Silicon Labs EFR32MG21 | external | not by default (Zigbee firmware) | yes | yes | most people: well documented |
| **Home Assistant Connect ZBT-2** | Silicon Labs MG24 | internal, in an optimised case | yes (Thread firmware option) | yes | yes | official Nabu Casa support, Thread-ready |
| **SONOFF Dongle Lite MG21** | Silicon Labs EFR32MG21 | internal | not by default | yes | yes | smallest budget, small homes |
| **ConBee II** (dresden elektronik) | deCONZ firmware | internal | no | yes | yes | users already on deCONZ / Phoscon |

Official pages: [SONOFF ZBDongle-E](https://sonoff.tech/products/sonoff-zigbee-3-0-usb-dongle-plus-zbdongle-e), [Home Assistant Connect ZBT-2](https://www.home-assistant.io/connect/zbt-2/), [ConBee II](https://phoscon.de/en/conbee2). Prices change often: check the current price at the retailer. US/UK: <a href="https://www.amazon.com/dp/B0B6P22YJC?tag=roboteducatif-20" rel="nofollow sponsored">SONOFF ZBDongle-E (Amazon US)</a> / <a href="https://www.amazon.co.uk/dp/B0B6P22YJC?tag=roboteducatif-21" rel="nofollow sponsored">Amazon UK</a>, <a href="https://www.amazon.com/dp/B0G34ZTW51?tag=roboteducatif-20" rel="nofollow sponsored">Home Assistant Connect ZBT-2 (Amazon US)</a> / <a href="https://www.amazon.co.uk/dp/B0G34ZTW51?tag=roboteducatif-21" rel="nofollow sponsored">Amazon UK</a> (affiliate links).

## 2. ZHA or Zigbee2MQTT?

- **ZHA** is built into Home Assistant: the simplest route for beginners.
- **Zigbee2MQTT** supports a very wide device list and gives more detail, but needs an MQTT broker add-on.

All four dongles above work with both.

## 3. Set-up tips

1. Use a **USB extension cable** (about 1 m) to move the dongle away from the computer and USB 3 ports, which interfere with 2.4 GHz.
2. Keep Zigbee and Wi-Fi channels apart (for example Zigbee channel 15, 20 or 25).
3. Add **mains-powered Zigbee devices** (plugs) early: they act as repeaters and strengthen the mesh.

## 4. Where to buy in the UK and US

SONOFF and Home Assistant hardware are sold by official resellers and large marketplaces in both countries. Check availability on the official pages above before ordering.

Choosing a hub? See [Home Assistant Green vs Raspberry Pi 5](/en/smart-home/home-assistant-green-vs-raspberry-pi-5/).
