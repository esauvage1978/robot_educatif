---
layout: ../../../layouts/EnPost.astro
title: Install ESPHome in Home Assistant
description: "Install ESPHome Device Builder: add-on, secrets.yaml, encryption key, first ESP32-C6 and adoption in Home Assistant."
updated: "30 October 2026"
---
**ESPHome** is software that turns an ESP32 board, a small electronic board with Wi-Fi, into a smart home device: you describe what the board must do in a simple configuration file called YAML, and ESPHome turns it into the board’s program, without you writing any code. In Home Assistant, the free software that gathers your connected devices, the **ESPHome Device Builder** add-on provides the editor, the compiler (the tool that builds the program) and the update tool. Once installed, it serves all your ESP32 projects.

**Expected result:** ESPHome open in the sidebar, a `secrets.yaml` file and a first device ready to flash. **Time:** 20 minutes. **Difficulty:** beginner.

![Espressif ESP32-C6-DevKitC-1 board: ESP32-C6-WROOM-1 module, UART and USB ports, BOOT and RESET buttons](/images/products/esp32-c6-devkitc.webp)

The first device this add-on is meant to flash is an **ESP32-C6-DevKitC-1**. The **UART** port is the one used for that first USB install.


## Which installation method?

Add-ons exist only on **Home Assistant OS** (Green, Yellow, Raspberry Pi, virtual machine) and **Supervised**. On a **Container** or **Core** install, ESPHome is installed separately, as described below. If you do not know which variant you run, open **Settings → System → About**: the “Installation type” line tells you.

## Method A: add-on (Home Assistant OS)

1. Open **Settings → Add-ons**, then **Add-on Store** at the bottom right.
2. Search for **ESPHome Device Builder** and click **Install**.
3. Once installed, turn on **Show in sidebar**, then click **Start**.
4. Open **ESPHome** in the sidebar: the dashboard appears, empty at first.

**Check:** the ESPHome dashboard loads without error and offers the **+ New Device** button.

## Method B: Container or Core

Without add-ons, install ESPHome on any Linux, macOS or Windows machine with Python:

```bash
pip install esphome
esphome dashboard config/
```

The dashboard then opens at `http://localhost:6052`. An official Docker image is also available (`ghcr.io/esphome/esphome`, with `--net=host` so network discovery works): follow the [ESPHome installation documentation](https://esphome.io/guides/installing_esphome/).

## Prepare the secrets.yaml file

In ESPHome, click **Secrets** (top right). This file keeps your passwords out of the device files, so you can share those without leaking them:

```yaml
wifi_ssid: "YourNetworkName"
wifi_password: "wifi-password"
ap_password: "fallback-password"
api_encryption_key: "PASTE-A-GENERATED-KEY"
ota_password: "ota-password"
```

Generate the encryption key with `openssl rand -base64 32` (or any generator of 32 bytes in base64). Your network must be **2.4 GHz**: the ESP32-C6 does not join a 5 GHz-only network. Never publish this file.

## Create the first device

1. Click **+ New Device**, then **Continue**.
2. Give it a lowercase name without spaces, for example `test-esp32`, and confirm.
3. Choose **ESP32-C6** as the board type. The wizard creates the device file; close the install window without flashing for now.
4. Click **Edit** and replace the content with a minimal base:

```yaml
esphome:
  name: test-esp32

esp32:
  board: esp32-c6-devkitc-1
  framework:
    type: esp-idf

logger:

api:
  encryption:
    key: !secret api_encryption_key

ota:
  - platform: esphome
    password: !secret ota_password

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
  ap:
    ssid: "test-esp32 Fallback"
    password: !secret ap_password

captive_portal:
```

Click **Validate**: the “Configuration is valid” message confirms the syntax. This file was not run on a board for this article; it follows the standard structure from the ESPHome documentation.

## Flash and adopt the device in Home Assistant

The first flash goes over a USB cable: follow [flash an ESP32 with ESPHome](/en/smart-home/flash-esp32-esphome/). Home Assistant then detects the device: open **Settings → Devices & services**, click **Configure** on the discovered ESPHome card and paste the encryption key. Later updates go [without a cable, over OTA](/en/smart-home/esphome-ota-updates/).

## Common problems

| Symptom | Likely cause | Fix |
|---|---|---|
| The ESPHome add-on is missing | Container or Core install | Use method B |
| “Invalid key” on adoption | Key differs from the YAML’s | Copy the exact `api_encryption_key` value |
| Very long compile | First build, empty cache | Wait: later ones are faster |
| “secret not defined” error | Entry missing from `secrets.yaml` | Add the missing line |
| Device never discovered | 5 GHz Wi-Fi, separate VLAN or blocked mDNS | Use 2.4 GHz and the same network as Home Assistant |

Next: pick an [ESP32 project](/en/smart-home/esp32-smart-home-project-ideas/) and review [GPIO wiring basics](/en/smart-home/esp32-wiring-gpio-basics/).

<small>Updated on 30 October 2026. Sources: [ESPHome documentation](https://esphome.io/) and [Home Assistant documentation](https://www.home-assistant.io/). Check menu names on your version.</small>
