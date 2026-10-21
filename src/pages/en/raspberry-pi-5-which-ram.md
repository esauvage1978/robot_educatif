---
layout: ../../layouts/EnPost.astro
title: "Raspberry Pi 5: 2GB, 4GB, 8GB or 16GB? Which RAM to buy"
description: "Which Raspberry Pi 5 memory size should you buy? What each RAM option is good for, the cooling and power supply you also need, and a quick decision tree."
updated: "21 October 2026"
---

The **Raspberry Pi 5** is built around the Broadcom **BCM2712**: four **Cortex-A76** cores at **2.4 GHz**, a **VideoCore VII** GPU and the **RP1** I/O controller. It is also the first full-size Raspberry Pi with a **PCIe 2.0 ×1** link, which opens the door to **NVMe SSDs** through an add-on board. Specs from the [official Raspberry Pi 5 page](https://www.raspberrypi.com/products/raspberry-pi-5/).

This guide covers the **memory options** in the range (availability varies by country), what you must budget for **cooling** and **power**, and how to choose.

## 1. Raspberry Pi 5 RAM options

| RAM | Typical use |
|---|---|
| **1GB** | Ultra-low-cost edge jobs: simple scripts, a light gateway. Little headroom for a web browser or IDE. |
| **2GB** | Minimal servers, displays, bots. Not ideal as a family desktop with many browser tabs. |
| **4GB** | The all-round choice: Raspberry Pi OS desktop, coding, modest web stacks, Home Assistant. |
| **8GB** | Several containers, databases, serious compiling, a desktop with many background services. |
| **16GB** | Rarely needed on a single-board computer: small local AI models, big builds, caches. Only buy it if you know why. |

Memory is **LPDDR4X-4267** on the Pi 5 (LPDDR4-3200 on the Pi 4).

## 2. What really changes compared with the Pi 4

- **CPU**: clearly faster in most compiling and encoding benchmarks.
- **PCIe**: faster storage or add-on cards, with compatible hardware and enough power.
- **Heat**: the Pi 5 warms up quickly; the official **Active Cooler** (or a serious equivalent) is close to essential for long workloads.
- **Power**: Raspberry Pi recommends its **27W USB-C supply (5V, 5A)** to unlock full USB current. Weak phone chargers cause warnings or throttling. The official supply is sold with UK, US and EU plugs.

## 3. Which one should you choose?

1. **Tight budget, no desktop**: 2GB (or 1GB if you have measured your services' RAM use).
2. **First Pi for family, school or making**: **4GB**.
3. **Home lab with Docker** or several stacks: **8GB**.
4. **Big compiles, memory-hungry models, no compromise**: 16GB, after checking that storage and cooling keep up.

Prices move often and differ between the UK and the US: **check current price** with an official reseller. US: <a href="https://www.amazon.com/dp/=roboteducatif-20" rel="nofollow sponsored">Raspberry Pi 5 4GB on Amazon.com</a> or <a href="https://www.amazon.com/dp/=roboteducatif-20" rel="nofollow sponsored">Raspberry Pi 5 8GB on Amazon.com</a> (affiliate links). The gap between 4GB and 16GB can be large.

## 4. Accessories you shouldn't forget

- **Active cooling** (official Active Cooler or the official case with fan).
- **Power supply**: official 27W USB-C or a documented equivalent.
- **Fast microSD card**, or an **NVMe** drive if you add a PCIe board.
- **Micro-HDMI cables** for one or two screens.

## 5. Where to buy

The Pi 5 is sold through Raspberry Pi's [approved resellers](https://www.raspberrypi.com/products/raspberry-pi-5/) in each country. In the US, SparkFun is one of them: [Raspberry Pi 5 at SparkFun](https://www.sparkfun.com/catalogsearch/result/?q=raspberry+pi+5&affiliate_code=WRBz4h1uMN) (affiliate link).

Flash **Raspberry Pi OS** with **Raspberry Pi Imager**, exactly as on earlier models.

**Key takeaway:** choose the Pi 5 on **RAM first** (4GB or 8GB for most people), then on a **good power supply and cooling**.

See also: [Raspberry Pi 3 vs 4 vs 5](/en/raspberry-pi-3-vs-4-vs-5/).
