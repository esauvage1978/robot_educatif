---
layout: ../../../layouts/EnPost.astro
title: "Install Home Assistant on Raspberry Pi 5 (2026 condensed guide)"
description: "Flash Home Assistant OS on Raspberry Pi 5 with Raspberry Pi Imager, first login, updates, ZHA and backups—plus links to official documentation."
updated: "24 October 2026"
---

*Also available in [French](/domotique/home-assistant-raspberry-pi-5-installation/).*

Running **Home Assistant on a Raspberry Pi 5** is straightforward in 2026: **Raspberry Pi Imager** can write **Home Assistant OS** directly to microSD or NVMe. This page is a **condensed path**; for every option (remote access, HACS, add-ons, troubleshooting), use the official guide: [Home Assistant installation](https://www.home-assistant.io/installation/) and [Home Assistant on Raspberry Pi](https://www.home-assistant.io/installation/raspberrypi/).

Hardware choice: [Home Assistant Green vs Raspberry Pi 5](/en/smart-home/home-assistant-green-vs-raspberry-pi-5/).

## What you need

- **Raspberry Pi 5** (4 GB is enough for most homes; 8 GB if you plan heavy video or many integrations)  
- **Official 27 W USB-C PSU** (under-power causes random freezes)  
- **microSD (32–64 GB, quality brand)** or **NVMe + Pi 5 M.2 HAT** for faster, longer-lived storage  
- **Ethernet cable** (preferred over Wi-Fi for the hub—especially with Zigbee on 2.4 GHz)  
- Optional: **Zigbee USB coordinator**—[best Zigbee dongle](/en/smart-home/best-zigbee-dongle-home-assistant/) (e.g. SONOFF ZBDongle-E: [UK](https://www.amazon.co.uk/dp/B0B6P22YJC?tag=roboteducatif-21) · [US](https://www.amazon.com/dp/B0B6P22YJC?tag=roboteducatif-20))

Search kits: [Pi 5 4 GB on Amazon UK](https://www.amazon.co.uk/s?k=raspberry+pi+5+4gb&tag=roboteducatif-21) · [Amazon US](https://www.amazon.com/s?k=raspberry+pi+5+4gb&tag=roboteducatif-20)

## 1. Flash Home Assistant OS

1. Install [Raspberry Pi Imager](https://www.raspberrypi.com/software/).  
2. **Choose device:** Raspberry Pi 5.  
3. **Choose OS:** Other → **Home Assistant** (pick the current HAOS build).  
4. **Choose storage:** microSD or NVMe (via USB adapter or HAT).  
5. **Advanced options (gear icon):** set hostname `homeassistant`, locale/time zone, and Wi-Fi **only** if you cannot use Ethernet.  
6. Write and wait (~5–10 min).

For NVMe boot details and firmware requirements, follow [Raspberry Pi NVMe boot documentation](https://www.raspberrypi.com/documentation/computers/raspberry-pi.html#nvme-ssd-boot).

## 2. First boot and login

1. Insert storage, connect **Ethernet**, then power.  
2. First boot can take **5–8 minutes** (containers download).  
3. Open **`http://homeassistant.local:8123`** on the same LAN—or find the Pi’s IP on your router and use `http://IP:8123`.  
4. Create the admin account, set home location (for sun automations), units (°C for UK/EU), finish onboarding.

## 3. Update and back up

- **Settings → System → Updates**—install Core, Supervisor and OS updates.  
- **Settings → System → Backups**—create a full backup and download the `.tar` off-box before you experiment.

Official backup docs: [Home Assistant backups](https://www.home-assistant.io/common-tasks/os/#backups).

## 4. Add Zigbee (ZHA)

1. Plug the coordinator via a **USB extension** away from the Pi and router.  
2. **Settings → Devices & services → Add integration → ZHA**.  
3. Select the serial port (`/dev/ttyUSB0` or `/dev/ttyACM0` on many dongles).  
4. **Add device**, put the sensor in pairing mode (e.g. [Zigbee temperature sensor](/en/smart-home/zigbee-temperature-sensor/)).

ZHA vs Zigbee2MQTT: [comparison guide](/en/smart-home/zigbee2mqtt-vs-zha-home-assistant/).

## 5. First automation (example)

When living-room temperature drops below 19 °C between 06:00 and 22:00, turn on a smart plug on a radiator—use the UI automation editor or YAML; see [Home Assistant automations](https://www.home-assistant.io/docs/automation/).

## 6. Go further (official docs)

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Topic</th>
<th scope="col">Official link</th>
</tr></thead><tbody>
<tr>
<td data-label="Topic"><span class="td-val">Add-ons (ESPHome, File editor, Mosquitto)</span></td>
<td data-label="Official link"><span class="td-val"><a href="https://www.home-assistant.io/addons/">Add-on store</a></span></td>
</tr>
<tr>
<td data-label="Topic"><span class="td-val">HACS community store</span></td>
<td data-label="Official link"><span class="td-val"><a href="https://hacs.xyz/docs/setup/download">hacs.xyz</a></span></td>
</tr>
<tr>
<td data-label="Topic"><span class="td-val">Remote access (Nabu Casa, VPN)</span></td>
<td data-label="Official link"><span class="td-val"><a href="https://www.home-assistant.io/docs/configuration/remote/">Remote access</a></span></td>
</tr>
<tr>
<td data-label="Topic"><span class="td-val">ESPHome devices</span></td>
<td data-label="Official link"><span class="td-val"><a href="https://esphome.io/guides/getting_started_hassio.html">ESPHome</a></span></td>
</tr>
</tbody>
</table>
</div>

## Related DIY on Raspberry Pi

- [CO₂ sensor SCD41 + MQTT](/en/smart-home/raspberry-pi-co2-scd41-home-assistant/)  
- [BME280 weather station + SQLite history](/en/smart-home/raspberry-pi-weather-station-bme280/)  
- [Door reed notifications](/en/smart-home/raspberry-pi-door-sensor-notification/)  
- [PIR motion lighting](/en/smart-home/raspberry-pi-pir-motion-lighting/)  
- [Backup power for Home Assistant](/en/smart-home/home-assistant-backup-power-ups/)

[All smart-home guides](/en/smart-home/)
