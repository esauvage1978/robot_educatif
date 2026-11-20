---
layout: ../../../layouts/EnPost.astro
title: "Home Assistant Green vs Raspberry Pi 5: which to choose (2026)"
description: "Home Assistant Green or a Raspberry Pi 5 for your smart home hub? Official specs side by side, what's in the box, what you must add, and who each one suits."
updated: "17 November 2026"
schemaUpdated: "2026-11-17"
faqSchema:
  - question: "Home Assistant Green or Raspberry Pi 5 for a first hub?"
    answer: "Green if you want plug-and-play Home Assistant with case, storage and PSU included; Pi 5 4GB if you accept flashing a card and buying cooling and power for more headroom and NVMe options."
  - question: "Is 4GB enough on Home Assistant Green?"
    answer: "Yes for most homes with dozens of Zigbee devices and few cameras. Heavy camera stacks or many add-ons may need Pi 5 8GB instead."
  - question: "Do I need a Zigbee USB stick on both?"
    answer: "Yes — neither has a built-in coordinator; budget a dongle on a short USB extension for either path."
---

<p><em>Last updated 17 November 2026.</em></p>

Both run **Home Assistant OS** and both make an excellent local smart home hub. The difference is **set-up time versus flexibility**. Specs below come from the official pages: [Home Assistant Green](https://www.home-assistant.io/green/) and [Raspberry Pi 5](https://www.raspberrypi.com/products/raspberry-pi-5/) (checked 21 October 2026). We have not benchmarked them ourselves.

## 1. Specs side by side

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col"> </th>
<th scope="col">Home Assistant Green</th>
<th scope="col"><a href="/en/raspberry-pi-brand/">Raspberry Pi</a> 5 (4GB or 8GB)</th>
</tr></thead><tbody>
<tr>
<td><span class="td-val">In the box</span></td>
<td data-label="Home Assistant Green"><span class="td-val">finished device: case, storage, power supply</span></td>
<td data-label="[Raspberry Pi](/en/raspberry-pi-brand/) 5 (4GB or 8GB)"><span class="td-val">bare board only</span></td>
</tr>
<tr>
<td><span class="td-val">Processor</span></td>
<td data-label="Home Assistant Green"><span class="td-val">quad-core Cortex-A55, 1.8 GHz</span></td>
<td data-label="[Raspberry Pi](/en/raspberry-pi-brand/) 5 (4GB or 8GB)"><span class="td-val">quad-core Cortex-A76, 2.4 GHz</span></td>
</tr>
<tr>
<td><span class="td-val">RAM</span></td>
<td data-label="Home Assistant Green"><span class="td-val">4 GB LPDDR4X</span></td>
<td data-label="[Raspberry Pi](/en/raspberry-pi-brand/) 5 (4GB or 8GB)"><span class="td-val">4 or 8 GB LPDDR4X (also 1, 2 and 16 GB)</span></td>
</tr>
<tr>
<td><span class="td-val">Storage</span></td>
<td data-label="Home Assistant Green"><span class="td-val">32 GB eMMC, built in</span></td>
<td data-label="[Raspberry Pi](/en/raspberry-pi-brand/) 5 (4GB or 8GB)"><span class="td-val">microSD, or NVMe SSD via a PCIe add-on</span></td>
</tr>
<tr>
<td><span class="td-val">USB</span></td>
<td data-label="Home Assistant Green"><span class="td-val">2 × USB 2.0</span></td>
<td data-label="[Raspberry Pi](/en/raspberry-pi-brand/) 5 (4GB or 8GB)"><span class="td-val">2 × USB 3.0 + 2 × USB 2.0</span></td>
</tr>
<tr>
<td><span class="td-val">Ethernet</span></td>
<td data-label="Home Assistant Green"><span class="td-val">Gigabit</span></td>
<td data-label="[Raspberry Pi](/en/raspberry-pi-brand/) 5 (4GB or 8GB)"><span class="td-val">Gigabit</span></td>
</tr>
<tr>
<td><span class="td-val">Wi-Fi</span></td>
<td data-label="Home Assistant Green"><span class="td-val">none (Ethernet only)</span></td>
<td data-label="[Raspberry Pi](/en/raspberry-pi-brand/) 5 (4GB or 8GB)"><span class="td-val">built in (Ethernet still recommended for a hub)</span></td>
</tr>
<tr>
<td><span class="td-val">Power supply</span></td>
<td data-label="Home Assistant Green"><span class="td-val">universal supply included</span></td>
<td data-label="[Raspberry Pi](/en/raspberry-pi-brand/) 5 (4GB or 8GB)"><span class="td-val">buy the official 27W USB-C supply (UK, US and EU plugs available)</span></td>
</tr>
<tr>
<td><span class="td-val">Cooling</span></td>
<td data-label="Home Assistant Green"><span class="td-val">fanless</span></td>
<td data-label="[Raspberry Pi](/en/raspberry-pi-brand/) 5 (4GB or 8GB)"><span class="td-val">Active Cooler recommended</span></td>
</tr>
<tr>
<td><span class="td-val">Set-up</span></td>
<td data-label="Home Assistant Green"><span class="td-val">plug in Ethernet and power, open homeassistant.local:8123</span></td>
<td data-label="[Raspberry Pi](/en/raspberry-pi-brand/) 5 (4GB or 8GB)"><span class="td-val">flash Home Assistant OS with Raspberry Pi Imager, then boot</span></td>
</tr>
<tr>
<td><span class="td-val">Price</span></td>
<td data-label="Home Assistant Green"><span class="td-val"><a href="https://www.home-assistant.io/green/">Home Assistant Green, official page</a>. This English page does not copy a US or UK price.</span></td>
<td data-label="[Raspberry Pi](/en/raspberry-pi-brand/) 5 (4GB or 8GB)"><span class="td-val"><a href="https://www.raspberrypi.com/products/raspberry-pi-5/">Raspberry Pi 5, official page</a>. The board still needs a power supply, a case and storage.</span></td>
</tr>
</tbody>
</table>
</div>

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

![Home Assistant Green smart home hub in its enclosure](/images/products/home-assistant-green.webp)

## Where to buy

- <a href="/go/az-gb-81defa28ab/" rel="sponsored nofollow noopener">Home Assistant Green — Amazon.com</a>
- <a href="/go/az-gb-478e21e86e/" rel="sponsored nofollow noopener">Raspberry Pi 5 4GB — Amazon.com</a> · see [which Pi 5 RAM to buy](/en/raspberry-pi-5-which-ram/)

## FAQ

**Green or Pi 5 if I am new to Home Assistant?**  
Green — one cable and you are in the UI. Pi 5 rewards you later if you want NVMe, GPIO or more RAM.

**Can I move my setup when I rent?**  
Both are small boxes that unplug from the router; see [smart home for renters without drilling](/en/smart-home/smart-home-renters-no-drilling/).

*Amazon Associates — commission possible on eligible purchases.*

[All smart-home guides](/en/smart-home/)
