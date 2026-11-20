---
layout: ../../../layouts/EnPost.astro
title: ESPHome OTA updates without a cable
description: "Update an ESP32 over Wi-Fi with ESPHome: OTA option, password, Home Assistant, safe mode and fixes."
updated: "17 November 2026"
schemaUpdated: "2026-11-17"
faqSchema:
  - question: "Can I update ESPHome without a USB cable?"
    answer: "Yes, after the first USB flash. Add an ota: block with a password in your YAML; later edits compile and upload over Wi-Fi from ESPHome or Home Assistant on the same LAN."
  - question: "What if OTA fails midway?"
    answer: "Move the device closer to the router, retry, or use ESPHome safe mode / fallback AP. If the firmware is broken, reflash once over USB."
  - question: "Is OTA safe on a smart home ESP32?"
    answer: "Keep a strong OTA password, never expose port 3232 to the Internet, and store API keys in secrets.yaml — same LAN-only rule as Home Assistant."
---
**OTA** stands for “Over The Air”: updating the program of an ESP32, a small electronic board with Wi-Fi, over the wireless network, without unplugging it from the wall or carrying it back to the computer to plug in a USB cable. For a sensor fixed in a ceiling void, a wall tablet or a solenoid valve in the garden, this is what makes maintenance practical: you edit your configuration file (the YAML) from your armchair, and the board updates itself.

**Expected result:** a new YAML version installed without a cable, and a recovery procedure if something goes wrong. **Time:** 10 minutes. **Difficulty:** beginner.

![Espressif ESP32-C6-DevKitC-1 board: ESP32-C6-WROOM-1 module, UART and USB ports, BOOT and RESET buttons](/images/products/esp32-c6-devkitc.webp)

After the first USB flash, this **ESP32-C6-DevKitC-1** stays where it is installed. Later program updates use the Wi-Fi path below, without going back to the **UART** port.


## Prerequisites

- A device already flashed once over USB with a YAML containing the `ota:` block ([first flash](/en/smart-home/flash-esp32-esphome/)).
- The device powered, on Wi-Fi and visible in ESPHome (“Online” badge).
- A computer or Home Assistant on the same local network.

## Enable OTA in the YAML

The configurations on this site already contain this block:

```yaml
ota:
  - platform: esphome
    password: !secret ota_password

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
  ap:
    ssid: "my-device Fallback"
    password: !secret ap_password

captive_portal:
```

The password stops any other machine on the network from sending a program to your board. The `ap` and `captive_portal` blocks create a fallback Wi-Fi network if the board cannot find the usual one: see the recovery section.

## Update from ESPHome Device Builder

1. Edit the device’s YAML file, for example by changing a measurement interval.
2. Click **Install** (or **⋮ → Install**).
3. Choose **Wirelessly**.
4. Wait for compilation, then the upload: a progress bar appears, then the board reboots.

On the command line, `esphome run my-device.yaml` offers the same choice and finds the device on the network.

**Check:** in the logs, the board reconnects to Wi-Fi then to Home Assistant. In **Settings → Devices & services**, the device’s ESPHome version is updated on its page.

## What if OTA fails?

The board can almost always be recovered without a cable:

- **Safe mode:** if the board reboots several times in a row (10 by default) without starting properly, ESPHome launches a minimal mode that only accepts OTA. Fix the YAML, then reinstall it wirelessly.
- **Fallback Wi-Fi:** if the usual network cannot be found, connect to the board’s “Fallback” Wi-Fi with the `ap_password` password. The portal page lets you pick a network or upload a `.bin` file.
- **Last resort:** reflash over USB ([tutorial](/en/smart-home/flash-esp32-esphome/)).

## Common problems

| Symptom | Likely cause | Fix |
|---|---|---|
| “Error resolving IP address” | The `.local` name does not resolve (mDNS) | Add `use_address: 192.168.x.x` under `wifi:` and reserve that IP in your router |
| Password refused | The password changed in the YAML | Reflash over USB once with the new password |
| Upload fails midway | Weak Wi-Fi signal | Move the board closer to the router, retry |
| Device “Offline” | Powered off or on another network | Check power and Wi-Fi |
| Compiles but nothing is sent | Firewall or VLAN between computer and board | Allow port 3232 between them |

## Security good practice

Keep an OTA password, never expose it to the Internet (port 3232 must never be forwarded from your router) and store the API encryption key safely. Update ESPHome regularly: each release lists its changes in the [changelog](https://esphome.io/changelog/). After a version jump, read the breaking changes before reinstalling your devices.

Next: [step-by-step ESP32 projects](/en/smart-home/esp32-smart-home-project-ideas/) and [GPIO wiring basics](/en/smart-home/esp32-wiring-gpio-basics/).

Board used in our ESPHome tutorials: <a href="https://www.amazon.com/s?k=ESP32-C6-DevKitC-1&tag=roboteducatif-20" rel="sponsored nofollow noopener">ESP32-C6 DevKitC-1 on Amazon.com</a>.

## FAQ

**Can I update ESPHome without USB after the first flash?**  
Yes — keep the `ota:` block and password in YAML; compile from ESPHome or Home Assistant on the same Wi-Fi.

**OTA upload keeps failing?**  
Check signal, reserve a fixed IP if mDNS fails, and never forward OTA port 3232 from your router.

<small>Updated on 17 November 2026. Source: [ESPHome documentation, OTA platform](https://esphome.io/components/ota/esphome/). Defaults may change between versions.</small>
