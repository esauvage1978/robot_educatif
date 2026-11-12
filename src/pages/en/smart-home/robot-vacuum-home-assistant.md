---
layout: ../../../layouts/EnPost.astro
title: "Robot vacuums that work with Home Assistant: brands and how they integrate"
description: "Roborock, Roomba, Ecovacs, SwitchBot, Shark, Xiaomi, Dreame: official or community integrations, local vs cloud, from Home Assistant docs. Table and buying advice."
updated: "24 October 2026"
---

*Also available in [French](/domotique/robot-aspirateur-compatible-home-assistant/).*

A robot vacuum pays off when it runs **on its own**—when the house is empty, after dinner, or only in the kitchen. That means tying it into Home Assistant. Brands integrate differently: some talk locally, others only via the maker’s cloud; some rely on community add-ons. The table below follows [Home Assistant vacuum integrations](https://www.home-assistant.io/integrations/#vacuum) (IoT class on each page, October 2026).

<figure>
<img src="/images/schemas/ha-aspirateur.svg" alt="Two paths: the robot reaches Home Assistant on the local network, or through the manufacturer cloud" width="780" height="672" />
<figcaption>Green arrow: the robot talks to Home Assistant on the local network. Orange arrow: commands go through the manufacturer cloud. The table shows which path the Home Assistant docs describe for each brand.</figcaption>
</figure>

## At a glance

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Brand</th>
<th scope="col">Home Assistant integration</th>
<th scope="col">Connection (HA docs)</th>
<th scope="col">Notes</th>
</tr></thead><tbody>
<tr>
<td data-label="Brand"><span class="td-val"><strong>Roborock</strong></span></td>
<td data-label="Home Assistant integration"><span class="td-val"><a href="https://www.home-assistant.io/integrations/roborock/">Roborock</a> (official)</span></td>
<td data-label="Connection (HA docs)"><span class="td-val">Local polling</span></td>
<td data-label="Notes"><span class="td-val">Roborock account for setup, then local control</span></td>
</tr>
<tr>
<td data-label="Brand"><span class="td-val"><strong>iRobot Roomba / Braava</strong></span></td>
<td data-label="Home Assistant integration"><span class="td-val"><a href="https://www.home-assistant.io/integrations/roomba/">Roomba and Braava</a> (official)</span></td>
<td data-label="Connection (HA docs)"><span class="td-val">Local push</span></td>
<td data-label="Notes"><span class="td-val">Wi-Fi models</span></td>
</tr>
<tr>
<td data-label="Brand"><span class="td-val"><strong>Ecovacs</strong></span></td>
<td data-label="Home Assistant integration"><span class="td-val"><a href="https://www.home-assistant.io/integrations/ecovacs/">Ecovacs</a> (official)</span></td>
<td data-label="Connection (HA docs)"><span class="td-val">Cloud push</span></td>
<td data-label="Notes"><span class="td-val">Depends on Ecovacs cloud</span></td>
</tr>
<tr>
<td data-label="Brand"><span class="td-val"><strong>SwitchBot</strong></span></td>
<td data-label="Home Assistant integration"><span class="td-val"><a href="https://www.home-assistant.io/integrations/switchbot_cloud/">SwitchBot Cloud</a> (official)</span></td>
<td data-label="Connection (HA docs)"><span class="td-val">Cloud polling</span></td>
<td data-label="Notes"><span class="td-val">Docs list K10+, K10+ Pro, K11+, K20+ Pro, S10, S20</span></td>
</tr>
<tr>
<td data-label="Brand"><span class="td-val"><strong>Shark</strong></span></td>
<td data-label="Home Assistant integration"><span class="td-val"><a href="https://www.home-assistant.io/integrations/sharkiq/">Shark IQ</a> (official)</span></td>
<td data-label="Connection (HA docs)"><span class="td-val">Cloud polling</span></td>
<td data-label="Notes"><span class="td-val">Shark IQ range</span></td>
</tr>
<tr>
<td data-label="Brand"><span class="td-val"><strong>Xiaomi (older)</strong></span></td>
<td data-label="Home Assistant integration"><span class="td-val"><a href="https://www.home-assistant.io/integrations/xiaomi_miio/">Xiaomi Miio</a> (official)</span></td>
<td data-label="Connection (HA docs)"><span class="td-val">Local polling</span></td>
<td data-label="Notes"><span class="td-val">Model-dependent</span></td>
</tr>
<tr>
<td data-label="Brand"><span class="td-val"><strong>Dreame</strong></span></td>
<td data-label="Home Assistant integration"><span class="td-val">No official integration</span></td>
<td data-label="Connection (HA docs)"><span class="td-val">—</span></td>
<td data-label="Notes"><span class="td-val">Community via HACS</span></td>
</tr>
<tr>
<td data-label="Brand"><span class="td-val"><strong>Matter robots</strong></span></td>
<td data-label="Home Assistant integration"><span class="td-val"><a href="https://www.home-assistant.io/integrations/matter/">Matter</a></span></td>
<td data-label="Connection (HA docs)"><span class="td-val">Local</span></td>
<td data-label="Notes"><span class="td-val">Vacuum type added in Matter 1.2 (<a href="https://csa-iot.org/newsroom/matter-1-2-arrives-with-nine-new-device-types-improvements-across-the-board/">CSA</a>)</span></td>
</tr>
</tbody>
</table>
</div>

**Our pick: Roborock.** Official integration, local control, room selection, consumables and errors. Budget example: Roborock Q7 M5 in [robot vacuums under £200 / $200](/en/smart-home/robot-vacuum-under-200/).

## Local vs cloud

- **Local:** Home Assistant talks to the robot on your LAN. Commands are fast and survive internet outages or API changes—until the vendor breaks local APIs.
- **Cloud:** Every command goes through the maker’s servers. It works until it does not—a outage or API shutdown can kill integration overnight.

For longevity, prefer integrations marked **Local** in Home Assistant docs.

## What you can automate

Once integrated, the robot appears as a `vacuum` entity. Common patterns:

- Start cleaning when everyone has left (person / zone tracking);
- Clean only the kitchen after meals (room clean if the integration supports it);
- Notify when the bin is full or the robot is stuck;
- Track brush and filter wear.

automation:
  - alias: "Vacuum when house empty"
    trigger:
      - platform: state
        entity_id: zone.home
        to: "0"
        for: "00:15:00"
    action:
      - action: vacuum.start
        target:
          entity_id: vacuum.living_room_robot

Replace `vacuum.living_room_robot` with your entity id.

## Before you buy

1. Search the exact model on the brand’s Home Assistant integration page.
2. Confirm **official** and **local** if possible.
3. Pick navigation: LiDAR maps accurately and enables room cleans ([LiDAR vs camera vs gyro](/en/smart-home/robot-vacuum-navigation-lidar-camera-gyro/)).
4. Mop and dock: [mop types and self-cleaning docks](/en/smart-home/robot-vacuum-mop-self-cleaning-dock/).

No server yet? [Install Home Assistant on Raspberry Pi 5](/en/smart-home/install-home-assistant-raspberry-pi-5/).

[All smart-home guides](/en/smart-home/)
