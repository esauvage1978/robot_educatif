---
layout: ../../../layouts/EnPost.astro
title: "Smart home for beginners (UK & US): where to start in 2026"
description: "A practical first smart home plan for UK and US homes: Wi-Fi, Zigbee, Thread and Matter explained, what to buy first, and the electrical rules that differ between 230V and 120V."
updated: "17 November 2026"
---

Some links are partner links (`/go/`).

<div class="article-toc" role="navigation" aria-label="On this page">
<p class="article-toc-title">On this page</p>
<ul>
<li><a href="#questions">Three questions</a></li>
<li><a href="#standards">Wireless standards</a></li>
<li><a href="#uk-us">UK vs US</a></li>
<li><a href="#steps">Step-by-step</a></li>
<li><a href="#faq">FAQ</a></li>
</ul>
</div>

A smart home doesn't have to start with a big hub and a weekend of wiring. This guide gives you a step-by-step path that works in a **UK flat** or a **US house**, and flags the points where the two countries really differ: **plugs, mains voltage, certification and who is allowed to wire what**.

## 1. Three questions before you buy anything {#questions}

1. **What do you want to automate first?** Lights, heating, a washing-machine alert or energy monitoring? Start with one real need.
2. **Do you want to tinker?** Wi-Fi devices work out of the box with an app; Zigbee and Home Assistant give you local control but need a little set-up.
3. **Do you rent or own?** Renters should stick to **plug-in devices** and battery sensors that leave no trace.

## 2. Wireless standards in plain English {#standards}

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Standard</th>
<th scope="col">Strengths</th>
<th scope="col">Limits</th>
<th scope="col">Good for</th>
</tr></thead><tbody>
<tr>
<td data-label="Standard"><span class="td-val"><strong>Wi-Fi (2.4 GHz)</strong></span></td>
<td data-label="Strengths"><span class="td-val">no hub, simple app</span></td>
<td data-label="Limits"><span class="td-val">uses more power, often relies on the maker's cloud</span></td>
<td data-label="Good for"><span class="td-val">your first smart plug or bulb</span></td>
</tr>
<tr>
<td data-label="Standard"><span class="td-val"><strong>Zigbee 3.0</strong></span></td>
<td data-label="Strengths"><span class="td-val">low power, mesh network, works locally</span></td>
<td data-label="Limits"><span class="td-val">needs a USB coordinator or hub</span></td>
<td data-label="Good for"><span class="td-val">sensors, plugs, radiator valves</span></td>
</tr>
<tr>
<td data-label="Standard"><span class="td-val"><strong>Thread</strong></span></td>
<td data-label="Strengths"><span class="td-val">mesh, low power, IP-based</span></td>
<td data-label="Limits"><span class="td-val">fewer devices so far</span></td>
<td data-label="Good for"><span class="td-val">future-proof battery devices</span></td>
</tr>
<tr>
<td data-label="Standard"><span class="td-val"><strong>Matter</strong></span></td>
<td data-label="Strengths"><span class="td-val">one standard across Apple Home, Google Home, Alexa and SmartThings</span></td>
<td data-label="Limits"><span class="td-val">still maturing; runs over Wi-Fi or Thread</span></td>
<td data-label="Good for"><span class="td-val">buying devices that won't lock you in</span></td>
</tr>
</tbody>
</table>
</div>

## 3. What differs between the UK and the US {#uk-us}

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col"> </th>
<th scope="col">United Kingdom</th>
<th scope="col">United States</th>
</tr></thead><tbody>
<tr>
<td><span class="td-val">Plug / socket</span></td>
<td data-label="United Kingdom"><span class="td-val">Type G (BS 1363), fused plug, 13 A max</span></td>
<td data-label="United States"><span class="td-val">Type A/B (NEMA 1-15 / 5-15), usually 15 A circuits</span></td>
</tr>
<tr>
<td><span class="td-val">Mains voltage</span></td>
<td data-label="United Kingdom"><span class="td-val">230 V, 50 Hz</span></td>
<td data-label="United States"><span class="td-val">120 V, 60 Hz</span></td>
</tr>
<tr>
<td><span class="td-val">Product safety marking</span></td>
<td data-label="United Kingdom"><span class="td-val">UKCA (CE still accepted for many goods)</span></td>
<td data-label="United States"><span class="td-val">FCC for radio devices; UL or ETL listing for mains safety</span></td>
</tr>
<tr>
<td><span class="td-val">Wired switches and relays</span></td>
<td data-label="United Kingdom"><span class="td-val">domestic electrical work must comply with Part P (England and Wales); use a registered electrician for new circuits</span></td>
<td data-label="United States"><span class="td-val">follow local electrical code (NEC); permits and licensed electricians vary by state</span></td>
</tr>
</tbody>
</table>
</div>

**Practical rule:** always buy the **UK or US version** of a plug-in device. An EU plug in a travel adaptor is not a safe permanent solution, especially for high loads such as heaters.

## 4. A step-by-step path {#steps}

**Step 1: start with Wi-Fi and no hub.** One or two smart plugs with energy monitoring let you schedule a lamp and see what your appliances really use. Shelly makes plugs in local versions: see the [Shelly smart plug range](https://www.shelly.com/collections/smart-plugs) and pick the UK or US model.

**Step 2: add a home hub.** For local control, install [Home Assistant](https://www.home-assistant.io/) on a ready-made **Home Assistant Green** or on a **Raspberry Pi 5**: compare them in [Home Assistant Green vs Raspberry Pi 5](/en/smart-home/home-assistant-green-vs-raspberry-pi-5/).

**Step 3: add a Zigbee coordinator and your first sensors.** Temperature, door and motion sensors are cheap and run for months on a coin cell. See [the best Zigbee dongle for Home Assistant](/en/smart-home/best-zigbee-dongle-home-assistant/), our [compatibility matrix](/en/smart-home/compatibility-matrix-home-assistant-homey-zigbee-matter/) and <a href="/go/az-gb-c0e0c96683/" rel="sponsored nofollow noopener">SONOFF ZBDongle-E on Amazon.com</a> (verify listing before order).

**Step 4: expand where it helps.** Relays behind switches (a job for an electrician if you're not qualified), radiator valves, a robot vacuum or DIY ESP32 sensors.

## 5. Mistakes to avoid

- Buying devices from five different apps: favour **Matter** or **Zigbee** so everything ends up in one place.
- Using a cheap uncertified plug for a heater or kettle: check the **rated load** and the **UKCA** or **UL/ETL** marking.
- Rewiring light switches yourself without the right qualifications.

**Next:** [Smart plugs for the UK and US](/en/smart-home/smart-plugs-uk-us/), [ESP32 projects hub](/en/smart-home/esp32-projects/) and [Homey Pro mini unboxing](/en/smart-home/homey-pro-mini-unboxing-setup/).

## FAQ {#faq}

### Do renters need permission for smart plugs?

No for plug-in gear; fixed wiring needs landlord approval and a qualified electrician.

### Zigbee dongle or all-in-one hub?

A USB coordinator with Home Assistant is flexible; Homey Pro mini bundles radios — see [Home Assistant vs Homey](/en/smart-home/home-assistant-jeedom-homey-which-hub/).

### Matter or Zigbee first?

Zigbee for cheap battery sensors today; Matter when you want one label across Apple, Google and Alexa.

[All smart-home guides](/en/smart-home/)
