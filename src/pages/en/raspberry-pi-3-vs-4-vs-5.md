---
layout: ../../layouts/EnPost.astro
title: "Raspberry Pi 3 vs 4 vs 5: which one to buy in 2026?"
description: "Raspberry Pi 3 Model B vs Pi 4 Model B vs Pi 5 compared: CPU, RAM, USB, Ethernet, PCIe and power. Spec table and a clear recommendation for each use case."
updated: "21 October 2026"
---

Between the **[Raspberry Pi](/en/raspberry-pi-brand/) 3 Model B**, the **Pi 4 Model B** and the **Pi 5**, the difference is not just price: **USB 3**, **true Gigabit Ethernet**, **dual video output**, then **PCIe** and up to **16GB of RAM** on the Pi 5 all change what a project can do. Specs below come from Raspberry Pi's official product pages ([Pi 3 B](https://www.raspberrypi.com/products/raspberry-pi-3-model-b/), [Pi 4 B](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/), [Pi 5](https://www.raspberrypi.com/products/raspberry-pi-5/)).

## 1. Spec table

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col"> </th>
<th scope="col"><strong>Pi 3 Model B</strong></th>
<th scope="col"><strong>Pi 4 Model B</strong></th>
<th scope="col"><strong>Raspberry Pi 5</strong></th>
</tr></thead><tbody>
<tr>
<td><span class="td-val">SoC</span></td>
<td data-label="**Pi 3 Model B**"><span class="td-val">Broadcom BCM2837</span></td>
<td data-label="**Pi 4 Model B**"><span class="td-val">Broadcom BCM2711</span></td>
<td data-label="**Raspberry Pi 5**"><span class="td-val">Broadcom BCM2712</span></td>
</tr>
<tr>
<td><span class="td-val">CPU</span></td>
<td data-label="**Pi 3 Model B**"><span class="td-val">4 × Cortex-A53, 1.2 GHz</span></td>
<td data-label="**Pi 4 Model B**"><span class="td-val">4 × Cortex-A72, 1.8 GHz</span></td>
<td data-label="**Raspberry Pi 5**"><span class="td-val">4 × Cortex-A76, 2.4 GHz</span></td>
</tr>
<tr>
<td><span class="td-val">GPU / video</span></td>
<td data-label="**Pi 3 Model B**"><span class="td-val">VideoCore IV, 1 × full-size HDMI</span></td>
<td data-label="**Pi 4 Model B**"><span class="td-val">VideoCore VI, 2 × micro-HDMI (4K)</span></td>
<td data-label="**Raspberry Pi 5**"><span class="td-val">VideoCore VII, 2 × micro-HDMI (4Kp60)</span></td>
</tr>
<tr>
<td><span class="td-val">RAM</span></td>
<td data-label="**Pi 3 Model B**"><span class="td-val">1GB LPDDR2</span></td>
<td data-label="**Pi 4 Model B**"><span class="td-val">1 / 2 / 4 / 8GB LPDDR4-3200</span></td>
<td data-label="**Raspberry Pi 5**"><span class="td-val">1 / 2 / 4 / 8 / 16GB LPDDR4X-4267</span></td>
</tr>
<tr>
<td><span class="td-val">Ethernet</span></td>
<td data-label="**Pi 3 Model B**"><span class="td-val">100 Mbit/s</span></td>
<td data-label="**Pi 4 Model B**"><span class="td-val">Gigabit</span></td>
<td data-label="**Raspberry Pi 5**"><span class="td-val">Gigabit</span></td>
</tr>
<tr>
<td><span class="td-val">Wi-Fi / Bluetooth</span></td>
<td data-label="**Pi 3 Model B**"><span class="td-val">802.11n, BT 4.1</span></td>
<td data-label="**Pi 4 Model B**"><span class="td-val">802.11ac, BT 5.0</span></td>
<td data-label="**Raspberry Pi 5**"><span class="td-val">802.11ac, BT 5.0</span></td>
</tr>
<tr>
<td><span class="td-val">USB</span></td>
<td data-label="**Pi 3 Model B**"><span class="td-val">4 × USB 2.0</span></td>
<td data-label="**Pi 4 Model B**"><span class="td-val">2 × USB 3.0 + 2 × USB 2.0</span></td>
<td data-label="**Raspberry Pi 5**"><span class="td-val">2 × USB 3.0 + 2 × USB 2.0</span></td>
</tr>
<tr>
<td><span class="td-val">PCIe</span></td>
<td data-label="**Pi 3 Model B**"><span class="td-val">No</span></td>
<td data-label="**Pi 4 Model B**"><span class="td-val">No</span></td>
<td data-label="**Raspberry Pi 5**"><span class="td-val">PCIe 2.0 ×1</span></td>
</tr>
<tr>
<td><span class="td-val">Power</span></td>
<td data-label="**Pi 3 Model B**"><span class="td-val">micro-USB 5V, 2.5A</span></td>
<td data-label="**Pi 4 Model B**"><span class="td-val">USB-C 5V, 3A</span></td>
<td data-label="**Raspberry Pi 5**"><span class="td-val">USB-C 5V, 5A recommended</span></td>
</tr>
<tr>
<td><span class="td-val">GPIO</span></td>
<td data-label="**Pi 3 Model B**"><span class="td-val">40 pins</span></td>
<td data-label="**Pi 4 Model B**"><span class="td-val">40 pins</span></td>
<td data-label="**Raspberry Pi 5**"><span class="td-val">40 pins</span></td>
</tr>
</tbody>
</table>
</div>

## 2. What changes day to day

- **Pi 3**: easy to find second-hand and very well documented, but **1GB of RAM** and **no USB 3** limit browsing, compiling and disk transfers.
- **Pi 4**: **USB 3 + real Gigabit** make it a decent small NAS, server or Linux desktop from 4GB.
- **Pi 5**: newer CPU, up to **16GB**, **PCIe** for fast storage, but more demanding on **cooling** and **power**.

## 3. Prices

Raspberry Pi prices move often (stock, reseller margins, VAT or sales tax). **Check the current price** with an [approved reseller](https://www.raspberrypi.com/resellers/). The French Amazon snapshot of 10 November 2026 lists Pi 5 boards under ASINs that belong to amazon.fr; those codes are not reused here as US or UK product pages. Always check the board revision and what is included (power supply, cooler). Dated euro prices for the Pi 5 are on the [French comparison](/raspberry-pi-3-vs-4-vs-5-comparatif-2026/).

## 4. Which Raspberry Pi for which use?

**Stay with a Pi 3** if you are reusing hardware or running a very light project (GPIO, a sensor, a small script).

**Go for a Pi 4** for a modest DIY NAS, a server that needs throughput, USB 3 drives, or an everyday Linux desktop on a budget.

**Choose a Pi 5** if you need CPU headroom, 8GB or more, or the PCIe bus. Plan for active cooling and the 27W supply. Not sure which memory size? Read [Raspberry Pi 5: which RAM to buy](/en/raspberry-pi-5-which-ram/).

**For Home Assistant**, a Pi 5 with 4GB plus a Zigbee dongle works well; the ready-made alternative is Home Assistant Green.

**For a teenager torn between a bare board and a robot**, a Pi-based kit such as the [SunFounder PiCar-X](https://www.sunfounder.com/products/picar-x?ref=tpytgtyp) (affiliate link, Pi not included) mixes both.

## 5. Where to buy in the US and UK

Raspberry Pi lists its approved resellers country by country on the [reseller page](https://www.raspberrypi.com/resellers/).

**In short:** Pi 3 = the historic reference, now tight; Pi 4 = the sweet spot for networking and USB; Pi 5 = top performance and RAM, at the cost of heat and price.
