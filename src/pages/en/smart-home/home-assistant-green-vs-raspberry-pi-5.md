---
layout: ../../../layouts/EnPost.astro
title: "Home Assistant Green vs Raspberry Pi 5: which to choose (2026)"
description: "Home Assistant Green or a Raspberry Pi 5 for your smart home hub? Official specs side by side, what's in the box, what you must add, and who each one suits."
updated: "21 October 2026"
---

Both run **Home Assistant OS** and both make an excellent local smart home hub. The difference is **set-up time versus flexibility**. Specs below come from the official pages: [Home Assistant Green](https://www.home-assistant.io/green/) and [Raspberry Pi 5](https://www.raspberrypi.com/products/raspberry-pi-5/) (checked 21 October 2026). We have not benchmarked them ourselves.

## 1. Specs side by side

| | Home Assistant Green | Raspberry Pi 5 (4GB or 8GB) |
|---|---|---|
| In the box | finished device: case, storage, power supply | bare board only |
| Processor | quad-core Cortex-A55, 1.8 GHz | quad-core Cortex-A76, 2.4 GHz |
| RAM | 4 GB LPDDR4X | 4 or 8 GB LPDDR4X (also 1, 2 and 16 GB) |
| Storage | 32 GB eMMC, built in | microSD, or NVMe SSD via a PCIe add-on |
| USB | 2 × USB 2.0 | 2 × USB 3.0 + 2 × USB 2.0 |
| Ethernet | Gigabit | Gigabit |
| Wi-Fi | none (Ethernet only) | built in (Ethernet still recommended for a hub) |
| Power supply | universal supply included | buy the official 27W USB-C supply (UK, US and EU plugs available) |
| Cooling | fanless | Active Cooler recommended |
| Set-up | plug in Ethernet and power, open homeassistant.local:8123 | flash Home Assistant OS with Raspberry Pi Imager, then boot |
| Price | <a href="https://www.amazon.com/dp/B0CXVKSG19?tag=roboteducatif-20" rel="nofollow sponsored">Home Assistant Green on Amazon.com (US)</a> | <a href="https://www.amazon.com/dp/B0CK3L9WD3?tag=roboteducatif-20" rel="nofollow sponsored">Raspberry Pi 5 4GB on Amazon.com (US)</a> (board only: add supply, case, storage) |

## 2. Who should pick the Green?

- You want a **silent box that just works**, with official support from Nabu Casa.
- You don't plan heavy add-ons such as video analysis for several cameras.
- You'd rather not buy and assemble a power supply, case, cooler and storage.

## 3. Who should pick a Raspberry Pi 5?

- You already own a Pi 5, or like to tinker.
- You want **more CPU and RAM** (8GB) for add-ons, or an **NVMe SSD** for long-term reliability.
- You want the 40-pin GPIO header for your own sensors.

Not sure which Pi 5 memory size? Read [Raspberry Pi 5: which RAM to buy](/en/raspberry-pi-5-which-ram/).

## 4. UK and US notes

- **Power**: the Green's supply is universal (100–240 V); for the Pi 5 buy the **official supply with your local plug** rather than a phone charger.
- **Availability**: both are sold through official resellers in the UK and the US. Stock varies, so check current availability on the official pages linked above.

## 5. Either way, add a Zigbee coordinator

Neither device has Zigbee built in. Plug in a USB coordinator on a short extension cable to reduce interference: see [the best Zigbee dongle for Home Assistant](/en/smart-home/best-zigbee-dongle-home-assistant/).

**Verdict:** Green for zero-hassle; Pi 5 for power and flexibility.
