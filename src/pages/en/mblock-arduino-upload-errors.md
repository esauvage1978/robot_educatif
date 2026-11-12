---
layout: ../../layouts/EnPost.astro
title: "mBlock and Arduino: upload errors and mBot fixes"
description: "Fix mBlock and Arduino upload errors on mBot: stk500_getsync(), a missing COM port, a reversed motor, a stuck ultrasonic sensor, and Linux permission denied."
updated: "24 October 2026"
faqSchema:
  - question: "What does stk500_getsync() not in sync mean?"
    answer: "The upload finished without a reply from the board. Check the COM port, use a data USB cable rather than a charge-only cable, close the serial monitor, and power-cycle the mBot."
  - question: "What if mBlock shows no COM port?"
    answer: "On Windows, install the CH340 or CP2102 driver for your board and try a rear USB port. On macOS, allow USB access. On a Chromebook, mBlock Web is not supported on every model, so a Windows or macOS app is the safer choice for class."
---

This guide collects the **error messages** and **symptoms** you see most often when you **upload** an **mBlock** program to an **mBot** (or to an **Arduino** board / **CyberPi**). Each section shows **difficulty**, **time**, **cost** and **tools** before the steps.

Costs below stay in euros, as listed in this guide on 24 October 2026.

Related guides: [install mBlock 5 on Windows](/en/install-mblock-5-windows/), [mBlock Bluetooth troubleshooting](/en/mblock-bluetooth-troubleshooting/), and the wider [error-code catalog](/domotique/codes-erreurs-depannage-zigbee-home-assistant-shelly/).

## Disclaimer and safety

**Disclaimer:** diagnostics and fixes here are for guidance only. Swapping RJ25/mBuild cables, batteries or USB work is your responsibility — power off, remove batteries or unplug USB before changing a sensor. No mains (230 V) work applies to a battery/USB mBot, mBot2 or CyberPi. Robot Éducatif accepts no liability for misuse, voided warranty or damage. When unsure, contact Makeblock support.

If in doubt, contact Makeblock official support (support.makeblock.com) or the brand warranty service — do not open the main board (mCore, CyberPi) yourself.

Software setup, swapping a USB cable or an add-on sensor can be done at home. For defective or in-warranty hardware (hub, failed Shelly/Sonoff module, mCore board), use the manufacturer's official warranty service — do not bypass it.

## Error catalog

A filterable catalog sits on this page (device category, brand, product or model, error code or symptom, and a free-text search). It opens on **educational robots**. The five cases in the sections below are the main mBot and Arduino cards. Three further cards in that same robot category are written out here as well.

### CyberPi / mBot2 — OSError [Errno 28] ENOSPC (mBlock 5)

- **Difficulty:** Easy (2/5)
- **Time:** 15 min
- **Cost:** €0
- **Tools:** mBlock 5
- **Code:** `OSError ENOSPC`

**Symptom:** the firmware update is stuck. On the Makeblock forum, the usual cause is a full CyberPi storage.

**What to do:** delete unused CyberPi projects in mBlock, restore the factory firmware, then flash it again. Free disk space on the PC if the mBlock cache is full.

If in doubt, contact Makeblock official support (support.makeblock.com) or the brand warranty service — do not open the main board (mCore, CyberPi) yourself.

### Arduino Uno R4 WiFi — DFU / bossac upload error

- **Difficulty:** Medium (3/5)
- **Time:** 15 min
- **Cost:** €0
- **Tools:** Arduino IDE
- **Code:** `bossac upload error`

**Symptom:** the upload fails in bossac mode. The IDE asks you to double-tap Reset to enter DFU (Device Firmware Update). A double-click on RESET does nothing useful, or the port is wrong, or the Renesas core is out of date.

**What to do:**

1. Close the serial monitor.
2. Double-tap RESET quickly (the LED fades) and then choose Upload within 8 seconds.
3. Select the board "Arduino UNO R4 WiFi" and the right COM/USB port.
4. Update the **arduino:renesas_uno** core in the board manager.
5. Use a USB **data** cable (not a charge-only cable). Official notes: [Arduino Uno R4 WiFi](https://docs.arduino.cc/hardware/uno-r4-wifi).

If in doubt, contact Makeblock official support (support.makeblock.com) or the brand warranty service — do not open the main board (mCore, CyberPi) yourself.

### Arduino Uno R3 — avrdude stk500_getsync(): not in sync

- **Difficulty:** Easy (2/5)
- **Time:** 10–20 min
- **Cost:** €0
- **Tools:** USB cable
- **Code:** `stk500_getsync()`

**Symptom:** the IDE upload reports `stk500_getsync(): not in sync, resp=0x00`.

**What to do:** close the serial monitor. Pick the correct COM port, and install the CH340 driver if the board is a clone. Press reset just before the upload. Try another cable or a rear USB port.

If in doubt, contact Makeblock official support (support.makeblock.com) or the brand warranty service — do not open the main board (mCore, CyberPi) yourself.

## stk500_getsync() — not in sync

- **Difficulty:** Easy (2/5)
- **Time:** 10–20 min
- **Cost:** €0
- **Tools:** USB cable

**Symptom:** at the end of the upload, mBlock or the Arduino IDE shows `avrdude: stk500_getsync(): not in sync` or "programmer not responding".

**Common causes:** the wrong **COM port** is selected, the USB cable **only charges** (no data), another program is holding the port (the serial monitor is open), or the robot is off or the battery is low.

**What to do:**

1. Plug in with a **direct USB** connection to the PC (skip unpowered hubs).
2. In mBlock, open the device list and choose the port that appears when you **plug in** the cable.
3. Power the mBot off and on, close the serial monitor, and upload again.
4. On Windows 11: check the driver in Device Manager (see [installing mBlock](/en/install-mblock-5-windows/)).

**Caution.** An mCore board or a USB port damaged while under warranty: contact Makeblock support (support.makeblock.com). Do not open the mBot chassis to repair the main board yourself.

## COM port missing (Windows 11 / macOS / Chromebook)

- **Difficulty:** Medium (3/5)
- **Time:** 15–30 min
- **Cost:** €0–12 (cable)
- **Tools:** Device Manager

**Symptom:** no serial port in mBlock. The robot does not appear.

**Windows 11:** install the **CH340/CP2102** driver for your board, and allow the installer in your antivirus. Unplug and plug back into a rear USB port on the PC.

**macOS:** grant USB permission to the browser if you use mBlock Web. In the native app, check *Privacy → USB*.

**Chromebook:** mBlock Web plus the extension. Not every model is supported. Prefer the **Windows/macOS app** for class.

## mBot motor that runs backward

- **Difficulty:** Easy (1/5)
- **Time:** 5 min
- **Cost:** €0
- **Tools:** None

**Symptom:** the robot goes backward when the program asks it to go forward.

**What to do:** in mBlock, reverse the speed value (**negative**) on the motor block in question, or swap the left and right motor connectors if you rewired them. Also check that the "motor" block really targets **M1/M2** on your mBot revision.

## Ultrasonic sensor stuck at 0 cm or 400 cm

- **Difficulty:** Easy (2/5)
- **Time:** 10 min
- **Cost:** €0
- **Tools:** Screwdriver (cover screw)

**Symptom:** the distance variable stays at **0** or **400** (out of range) all the time.

**What to do:**

1. Check the **RJ25** cable on the ultrasonic port (Makeblock pinout).
2. Move the robot away from a wall that is closer than 2 cm (the minimum reading).
3. Update the mBot **firmware** and upload a minimal test program again ([ultrasonic series](/en/mbot-ultrasonic-1-measure-distance/)).
4. If the value stays frozen after a knock, the sensor is damaged. See [compatible parts](/domotique/pieces-detachees-capteurs-compatibles-moins-cher/) or **Makeblock support** if the original sensor is still under warranty.

**Caution.** Replacing an RJ25 cable or a compatible ultrasonic sensor is fine to do yourself. A failed motor or mCore board: official Makeblock support only.

## "Permission denied" or port access (Linux / Raspberry Pi)

- **Difficulty:** Medium (3/5)
- **Time:** 15 min
- **Cost:** €0
- **Tools:** Terminal

Add your user to the `dialout` group (`sudo usermod -aG dialout $USER`), log in again, and retry. Do not run mBlock as root.

## Official manufacturer support and warranty

**Makeblock (mBot / mBlock)**

- [Support portal](https://support.makeblock.com)
- Email: [support@makeblock.com](mailto:support@makeblock.com)
- Phone: [+86 755 2639 2228](tel:+8675526392228)

---

**Go further:** [first steps in mBlock](/en/first-steps-mblock-5/), [10 free mBot projects](/en/10-free-mbot-classroom-projects/), [mBot vs mBot2](/en/mbot-vs-mbot2/).
