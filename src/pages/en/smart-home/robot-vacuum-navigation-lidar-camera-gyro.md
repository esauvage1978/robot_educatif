---
layout: ../../../layouts/EnPost.astro
title: "Robot vacuum navigation: LiDAR, camera or gyro—what actually changes"
description: "Random bounce, gyro, vSLAM camera or LiDAR: mapping, room cleans, dark rooms and smart-home control. Comparison and buying tips."
updated: "2 November 2026"
shareTitle: "Robot vacuum navigation: LiDAR vs camera vs gyro"
shareDescription: "Which navigation type maps your home, cleans by room, and works with Home Assistant?"
---

*Also available in [French](/domotique/robot-aspirateur-navigation-lidar-camera-gyroscope/).*

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/en/smart-home/">Smart home</a> · Vacuum navigation</nav>

**Quick answer (November 2026)** — For most homes, choose **LiDAR** (*Light Detection and Ranging*: a spinning laser that measures distance). You get a reliable floor map, **room-by-room** cleans, and good behaviour in the dark. **Random** and **gyro** bots are cheaper but often miss corners; **camera (vSLAM)** maps well in daylight but can struggle in very dark rooms.

This guide sits in the [smart home hub](/en/smart-home/) next to [robot vacuums in Home Assistant](/en/smart-home/robot-vacuum-home-assistant/), [budget models under £200 / $200](/en/smart-home/robot-vacuum-under-200/), and [getting started with smart home](/en/smart-home/getting-started/).

![Robot vacuum with LiDAR turret — navigation comparison context](/images/blog-thumbnails/robot-aspirateur-navigation-lidar-camera-gyroscope.webp)

*Photo context: a LiDAR turret adds height—measure sofa clearance before you buy.*

Suction watts sell robots on the box. **Navigation** decides whether the whole room gets cleaned or the same strip gets three passes while the hall is skipped. Four technologies you will meet—and what they enable.

## At a glance

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Navigation</th>
<th scope="col">Principle</th>
<th scope="col">Home map</th>
<th scope="col">Room clean</th>
<th scope="col">Works in dark</th>
<th scope="col">Typical tier</th>
</tr></thead><tbody>
<tr>
<td data-label="Navigation"><span class="td-val"><strong>Random</strong></span></td>
<td data-label="Principle"><span class="td-val">Bounce off obstacles</span></td>
<td data-label="Home map"><span class="td-val">No</span></td>
<td data-label="Room clean"><span class="td-val">No</span></td>
<td data-label="Works in dark"><span class="td-val">Yes</span></td>
<td data-label="Typical tier"><span class="td-val">Budget</span></td>
</tr>
<tr>
<td data-label="Navigation"><span class="td-val"><strong>Gyro</strong></span></td>
<td data-label="Principle"><span class="td-val">Motion sensors, parallel lines</span></td>
<td data-label="Home map"><span class="td-val">Rough or none</span></td>
<td data-label="Room clean"><span class="td-val">Rarely</span></td>
<td data-label="Works in dark"><span class="td-val">Yes</span></td>
<td data-label="Typical tier"><span class="td-val">Entry</span></td>
</tr>
<tr>
<td data-label="Navigation"><span class="td-val"><strong>Camera (vSLAM)</strong></span></td>
<td data-label="Principle"><span class="td-val">Visual landmarks (ceiling, furniture)</span></td>
<td data-label="Home map"><span class="td-val">Yes</span></td>
<td data-label="Room clean"><span class="td-val">Yes</span></td>
<td data-label="Works in dark"><span class="td-val">Lighting-dependent</span></td>
<td data-label="Typical tier"><span class="td-val">Mid / high</span></td>
</tr>
<tr>
<td data-label="Navigation"><span class="td-val"><strong>LiDAR</strong></span></td>
<td data-label="Principle"><span class="td-val">Spinning laser, 360° ranges</span></td>
<td data-label="Home map"><span class="td-val">Yes, accurate</span></td>
<td data-label="Room clean"><span class="td-val">Yes</span></td>
<td data-label="Works in dark"><span class="td-val">Yes</span></td>
<td data-label="Typical tier"><span class="td-val">Recent mid-range up</span></td>
</tr>
</tbody>
</table>
</div>

**Our pick: LiDAR.** Accurate map from the first run, works in the dark, room-by-room cleans—including from Home Assistant. It now appears on affordable models: [under £200 / $200](/en/smart-home/robot-vacuum-under-200/).

## Random and gyro: avoid if you can

**Random** bots turn at each bump; a small room eventually gets covered, slowly and unevenly. **Gyro** bots run straighter lines but drift in multi-room homes and rarely keep a useful map.

## Camera (vSLAM)

The robot watches the ceiling or room and tracks landmarks. Good maps and room cleans. Downsides: performance drops in very dark rooms, and an in-home camera raises privacy questions—read the vendor’s image policy.

## LiDAR

The turret spins a laser and measures distances. Fast relocalisation if you move the bot; works in darkness. Trade-off: extra height—measure clearance under sofas before you buy.

## Obstacle avoidance is separate

Navigation is **where am I**; avoidance is **do not eat the cable**. Entry models often only have basic IR; cables and socks still need tidying. High-end units add structured light or front cameras with object recognition.

## Smart home

A reliable map is what lets Home Assistant say “clean the kitchen” instead of “clean everything”. Room cleans depend on brand integration: [robot vacuums in Home Assistant](/en/smart-home/robot-vacuum-home-assistant/). Mops and docks: [mop and station guide](/en/smart-home/robot-vacuum-mop-self-cleaning-dock/).

## FAQ

**Does LiDAR need light?**  
No—the laser works in darkness; cameras often do not.

**Can I start with gyro and upgrade later?**  
Yes, but you will likely replace the whole unit when you want maps and room cleans.

**Which navigation for pets?**  
LiDAR or camera with good obstacle detection; random bots struggle with hair clumps in the same spots.

**Buying in the UK or US?**  
See the [buying guides index](/en/buying-guides/) for robots, Pi, and Zigbee gear in one place.

Sources: [iRobot navigation overview](https://www.irobot.com/) (vendor docs vary by model).

Also: [Matter and protocols in 2027](/en/smart-home/matter-thread-zigbee-wifi-which-protocol-2027/) · [Zigbee temperature sensor](/en/smart-home/zigbee-temperature-sensor/).

[All smart-home guides](/en/smart-home/)
