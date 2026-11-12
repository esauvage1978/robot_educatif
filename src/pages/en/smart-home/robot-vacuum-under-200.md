---
layout: ../../../layouts/EnPost.astro
title: "Best robot vacuums under £200 / $200 in 2026"
description: "Affordable LiDAR robots: Roborock Q7 M5, Dreame D9 Max Gen 2, Xiaomi S40C. Navigation, suction, Home Assistant integration—without made-up prices."
updated: "24 October 2026"
---

*Also available in [French](/domotique/robot-aspirateur-moins-de-200-euros/).*

A **capable robot under £200 or about $200** is realistic in 2026 if you insist on **LiDAR** and a proper app. We do not quote street prices here—they change daily; check retailers before you order.

## Quick picks

**Top choice — Roborock Q7 M5** ([Amazon UK](https://www.amazon.co.uk/dp/B0DT4FJJXM?tag=roboteducatif-21) · [Amazon US](https://www.amazon.com/dp/B0DT4FJJXM?tag=roboteducatif-20))

- LiDAR mapping (not random bounce)
- Strong suction for the class (maker spec ~4200 Pa)
- Long runtime on paper (~180 min in manufacturer materials)
- Basic drag mop on many SKUs
- **Home Assistant:** official [Roborock](https://www.home-assistant.io/integrations/roborock/) integration, local after setup
- No auto-empty dock at this price—empty the bin yourself

**For who:** Flats around 60–100 m², pets, first robot.

**Alternative — Dreame D9 Max Gen 2**

- LiDAR, similar suction class
- Dreame app; stock varies by region
- **Home Assistant:** community integration (HACS), not official—verify your exact model before buying

**Budget LiDAR — Xiaomi S40C**

- Often the cheapest LiDAR option
- Lower suction—fine on hard floors, weak on thick carpet
- Confirm Home Assistant support for your regional firmware

## Comparison

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Model</th>
<th scope="col">LiDAR</th>
<th scope="col">Suction (maker)</th>
<th scope="col">Runtime (maker)</th>
<th scope="col">Mop</th>
<th scope="col">Home Assistant</th>
</tr></thead><tbody>
<tr>
<td data-label="Model"><span class="td-val"><strong>Roborock Q7 M5</strong></span></td>
<td data-label="LiDAR"><span class="td-val">Yes</span></td>
<td data-label="Suction (maker)"><span class="td-val">~4200 Pa</span></td>
<td data-label="Runtime (maker)"><span class="td-val">~180 min</span></td>
<td data-label="Mop"><span class="td-val">Basic drag</span></td>
<td data-label="Home Assistant"><span class="td-val">Official Roborock</span></td>
</tr>
<tr>
<td data-label="Model"><span class="td-val"><strong>Dreame D9 Max G2</strong></span></td>
<td data-label="LiDAR"><span class="td-val">Yes</span></td>
<td data-label="Suction (maker)"><span class="td-val">~4000 Pa</span></td>
<td data-label="Runtime (maker)"><span class="td-val">~150 min</span></td>
<td data-label="Mop"><span class="td-val">Yes</span></td>
<td data-label="Home Assistant"><span class="td-val">Community</span></td>
</tr>
<tr>
<td data-label="Model"><span class="td-val"><strong>Xiaomi S40C</strong></span></td>
<td data-label="LiDAR"><span class="td-val">Yes</span></td>
<td data-label="Suction (maker)"><span class="td-val">~3000 Pa</span></td>
<td data-label="Runtime (maker)"><span class="td-val">~120 min</span></td>
<td data-label="Mop"><span class="td-val">Often no</span></td>
<td data-label="Home Assistant"><span class="td-val">Check model</span></td>
</tr>
</tbody>
</table>
</div>

## What to look for under £200 / $200

**Navigation:** LiDAR beats camera, gyro and random at this price—do not buy random IR bounce bots.

**Suction:** ~3000 Pa minimum; ~4000+ Pa helps on carpet and pet hair.

**Runtime:** ~120 min covers many flats; ~180 min suits larger single-level homes.

**Mopping:** At this tier expect a **drag pad**, not rotating scrub—fine for daily wipe, not deep stain removal.

## Skip at this price

- Random navigation (infrared bump)
- Unknown brands with no UK/US support or parts
- Specs under ~2000 Pa on carpet

## Home Assistant example

automation:
  - alias: "Vacuum when away"
    trigger:
      platform: state
      entity_id: person.you
      to: "not_home"
      for: "00:15:00"
    action:
      - service: vacuum.start
        target:
          entity_id: vacuum.roborock_q7_m5

Brand table: [robot vacuums in Home Assistant](/en/smart-home/robot-vacuum-home-assistant/). Server setup: [Install Home Assistant on Raspberry Pi 5](/en/smart-home/install-home-assistant-raspberry-pi-5/).

## Prep and maintenance

Before first run: pick up cables, socks and small toys; close doors to excluded rooms; check sofa clearance (~10 cm for many bots).

Weekly: empty dust bin, clear side brush hair, wipe LiDAR dome. Monthly: rinse HEPA if washable; replace main brush per maker schedule.

## FAQ

**Vacuum vs mop?** Vacuum removes dust and hair; mop is a damp pass. Under £200, mop is basic.

**Replace a corded vacuum?** For most floors, yes ~80% of the time—keep a handheld for stairs and upholstery.

**Room scheduling?** With LiDAR Roborock models, the app supports room and no-go zones; exact features depend on firmware region.

[All smart-home guides](/en/smart-home/)
