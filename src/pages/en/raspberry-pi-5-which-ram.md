---
layout: ../../layouts/EnPost.astro
title: "Raspberry Pi 5: 2GB, 4GB, 8GB or 16GB? Which RAM to buy"
description: "Which Raspberry Pi 5 memory size should you buy? What each RAM option is good for, the cooling and power supply you also need, and a quick decision tree."
updated: "17 November 2026"
schemaUpdated: "2026-11-17"
faqSchema:
  - question: "4GB or 8GB for a first Raspberry Pi 5?"
    answer: "In 2026, 4GB is the default for Raspberry Pi OS desktop, Python learning, robotics and modest Home Assistant. Choose 8GB if you run several Docker containers, compile often or keep many browser tabs open."
  - question: "Is a fan mandatory on Raspberry Pi 5?"
    answer: "For sessions longer than a few minutes under load, yes — the Pi 5 throttles quickly without active cooling. A short sensor script may run on passive cooling only."
  - question: "Which power supply for Raspberry Pi 5?"
    answer: "USB-C 5 V at 5 A (27 W) per Raspberry Pi’s recommendation. Weak phone chargers trigger under-voltage warnings and limit USB current."
  - question: "Can Raspberry Pi 5 RAM be upgraded later?"
    answer: "No. Memory is soldered. Pick 4GB or 8GB at purchase; only buy 16GB if you already know you will saturate 8GB."
---

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Raspberry Pi 5: which RAM to buy",
  "dateModified": "2026-11-17",
  "inLanguage": "en"
}
</script>

Some links on this page are affiliate links. Check the listing for memory size before you buy.

<p><em>Last updated 17 November 2026.</em></p>

> **Direct answer (November 2026)** — For a **first Pi 5** at home, school or for **Python** robotics, choose **4GB** in most cases. Pick **8GB** if you stack **Docker** containers, compile often or run a busy Linux desktop. **16GB** only when you have measured the need. Plan **active cooling** and a **27 W USB-C PSU** on every new Pi 5.

<div class="article-toc" role="navigation" aria-label="Table of contents">
<p class="article-toc-title">Contents</p>
<ul>
<li><a href="#ram-options">RAM options</a></li>
<li><a href="#vs-pi4">Compared with Pi 4</a></li>
<li><a href="#choose">Which to choose</a></li>
<li><a href="#accessories">Accessories</a></li>
<li><a href="#buy">Where to buy</a></li>
<li><a href="#faq">FAQ</a></li>
</ul>
</div>

The **[Raspberry Pi](/en/raspberry-pi-brand/) 5** is built around the Broadcom **BCM2712**: four **Cortex-A76** cores at **2.4 GHz**, a **VideoCore VII** GPU and the **RP1** I/O controller. It is also the first full-size Raspberry Pi with a **PCIe 2.0 ×1** link, which opens the door to **NVMe SSDs** through an add-on board. Specs from the [official Raspberry Pi 5 page](https://www.raspberrypi.com/products/raspberry-pi-5/).

![Raspberry Pi 5 (4 GB) product photo](/images/products/raspberry-pi-5-4gb.webp)

*Product photo — Raspberry Pi 5 board (4 GB variant).*

This guide covers the **memory options** in the range (availability varies by country), what you must budget for **cooling** and **power**, and how to choose. Compare generations in [Pi 3 vs 4 vs 5](/en/raspberry-pi-3-vs-4-vs-5/); for Pi 4 RAM see [Raspberry Pi 4 which RAM](/en/raspberry-pi-4-which-ram/).

<h2 id="ram-options">1. Raspberry Pi 5 RAM options</h2>

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">RAM</th>
<th scope="col">Typical use</th>
</tr></thead><tbody>
<tr>
<td data-label="RAM"><span class="td-val"><strong>1GB</strong></span></td>
<td data-label="Typical use"><span class="td-val">Ultra-low-cost edge jobs: simple scripts, a light gateway. Little headroom for a web browser or IDE.</span></td>
</tr>
<tr>
<td data-label="RAM"><span class="td-val"><strong>2GB</strong></span></td>
<td data-label="Typical use"><span class="td-val">Minimal servers, displays, bots. Not ideal as a family desktop with many browser tabs.</span></td>
</tr>
<tr>
<td data-label="RAM"><span class="td-val"><strong>4GB</strong></span></td>
<td data-label="Typical use"><span class="td-val">The all-round choice: Raspberry Pi OS desktop, coding, modest web stacks, Home Assistant.</span></td>
</tr>
<tr>
<td data-label="RAM"><span class="td-val"><strong>8GB</strong></span></td>
<td data-label="Typical use"><span class="td-val">Several containers, databases, serious compiling, a desktop with many background services.</span></td>
</tr>
<tr>
<td data-label="RAM"><span class="td-val"><strong>16GB</strong></span></td>
<td data-label="Typical use"><span class="td-val">Rarely needed on a single-board computer: small local AI models, big builds, caches. Only buy it if you know why.</span></td>
</tr>
</tbody>
</table>
</div>

Memory is **LPDDR4X-4267** on the Pi 5 (LPDDR4-3200 on the Pi 4). **RAM is soldered** — you cannot upgrade later.

<h2 id="vs-pi4">2. What really changes compared with the Pi 4</h2>

- **CPU**: clearly faster in most compiling and encoding benchmarks.
- **PCIe**: faster storage or add-on cards, with compatible hardware and enough power.
- **Heat**: the Pi 5 warms up quickly; the official **Active Cooler** (or a serious equivalent) is close to essential for long workloads.
- **Power**: Raspberry Pi recommends its **27W USB-C supply (5V, 5A)** to unlock full USB current. Weak phone chargers cause warnings or throttling. The official supply is sold with UK, US and EU plugs.

<h2 id="choose">3. Which one should you choose?</h2>

1. **Tight budget, no desktop**: 2GB (or 1GB if you have measured your services' RAM use).
2. **First Pi for family, school or making**: **4GB**.
3. **Home lab with Docker** or several stacks: **8GB**.
4. **Big compiles, memory-hungry models, no compromise**: 16GB, after checking that storage and cooling keep up.

UK and US prices differ — verify at purchase time on the [official Raspberry Pi 5 page](https://www.raspberrypi.com/products/raspberry-pi-5/). The gap between 4GB and 16GB can be large. For a **ready-made educational robot** instead of a bare board, see [best programmable robots](/en/best-programmable-robot-for-kids/) and [Arduino robot kits](/en/arduino-robot-kit-for-kids/).

<h2 id="accessories">4. Accessories you shouldn't forget</h2>

- **Active cooling** (official Active Cooler or the official case with fan).
- **Power supply**: official 27W USB-C or a documented equivalent — <a href="https://www.amazon.com/s?k=Raspberry+Pi+5+27W+power+supply&tag=roboteducatif-20" rel="sponsored nofollow noopener">Pi 5 27 W PSU (UK search)</a> · <a href="/go/az-us-765d931f34/" rel="sponsored nofollow noopener">US</a>.
- **Fast microSD card**, or an **NVMe** drive if you add a PCIe board — <a href="https://www.amazon.com/s?k=microSD+A2+Raspberry+Pi&tag=roboteducatif-20" rel="sponsored nofollow noopener">A2 microSD (UK)</a> · <a href="/go/az-us-06848dad09/" rel="sponsored nofollow noopener">A2 microSD (US)</a>.
- **Micro-HDMI cables** for one or two screens.

Flash **Raspberry Pi OS** with **Raspberry Pi Imager** — steps match [Raspberry Pi 3 getting started](/en/raspberry-pi-3-getting-started/).

**Key takeaway:** choose the Pi 5 on **RAM first** (4GB or 8GB for most people), then on a **good power supply and cooling**.

<h2 id="buy">5. Where to buy (affiliate)</h2>

Confirm memory size on the listing before you buy.

**UK**

- <a href="https://www.amazon.com/s?k=Raspberry%20Pi%205%20(4GB)&tag=roboteducatif-20" rel="sponsored nofollow noopener">Raspberry Pi 5 4GB — Amazon.com</a>
- <a href="https://www.amazon.com/s?k=raspberry+pi+5+8gb&tag=roboteducatif-20" rel="sponsored nofollow noopener">Raspberry Pi 5 8GB — UK search</a>
- <a href="https://www.amazon.com/s?k=Raspberry%20Pi%205%20(8GB)&tag=roboteducatif-20" rel="sponsored nofollow noopener">Raspberry Pi 5 8GB board — Amazon.com</a>
- <a href="https://www.amazon.com/s?k=raspberry+pi+5+case&tag=roboteducatif-20" rel="sponsored nofollow noopener">Pi 5 case / cooling — UK search</a>

**US**

- <a href="/go/az-us-a66a9832d5/" rel="sponsored nofollow noopener">Raspberry Pi 5 4GB — Amazon.com</a>
- <a href="/go/az-us-48d07994bc/" rel="sponsored nofollow noopener">Raspberry Pi 5 8GB — Amazon.com</a>
- <a href="/go/az-us-765d931f34/" rel="sponsored nofollow noopener">Pi 5 27 W power supply — US</a>

Approved resellers: [raspberrypi.com/resellers](https://www.raspberrypi.com/resellers/). Smart-home stack: [Install Home Assistant on Pi 5](/en/smart-home/install-home-assistant-raspberry-pi-5/).

*Amazon partner — commission possible on eligible purchases.*

See also: [Raspberry Pi 3 vs 4 vs 5](/en/raspberry-pi-3-vs-4-vs-5/) · [Pi 5 complete kit](/en/raspberry-pi-5-complete-kit/).

<h2 id="faq">FAQ</h2>

### 4GB or 8GB to start?

**4GB** for desktop, learning and robotics; **8GB** if Docker, compiling or many services run together.

### Is a fan mandatory?

Not for a one-minute test script; **practically yes** for desktop, server or compile sessions on Pi 5.

### Can RAM be expanded later?

No — memory is **soldered**.

### Pi 4 or Pi 5?

Pi 5 if budget allows **cooling + 27 W PSU**; otherwise a **Pi 4 4GB/8GB** remains relevant — see [Pi 4 which RAM](/en/raspberry-pi-4-which-ram/).