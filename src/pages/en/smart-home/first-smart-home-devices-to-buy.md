---
layout: ../../../layouts/EnPost.astro
title: "First smart home devices to buy"
description: "What goes in your first smart home basket? Starter kits by goal and budget: sensors, plugs, bulbs, radiator valves, a Zigbee stick and the small extras people forget."
updated: "30 October 2026"
faqSchema:
  - question: "Zigbee or Wi-Fi for my first purchase?"
    answer: "Wi-Fi lets you test without a hub, with one app per brand. Zigbee becomes more interesting as soon as you have a hub and want battery sensors and automations that stay at home. The details are on our protocols page."
  - question: "How many Zigbee repeaters should I plan for?"
    answer: "As a rough guide, a mains-powered Zigbee plug or bulb every eight to ten metres often helps, and you need more if the walls are thick. Rather than a ready-made rule, measure the quality of the radio link in your app (ZHA or Zigbee2MQTT, the two tools that manage Zigbee in Home Assistant)."
  - question: "Can I mix Sonoff, Aqara and IKEA?"
    answer: "Often yes on Zigbee with Home Assistant, but each device has its own small quirks (pairing method, battery, specific behaviour). The compatibility table and the device lists of ZHA and Zigbee2MQTT help you check."
  - question: "Where can I see automations using this equipment?"
    answer: "In our first automations guide. To pick up the general thread again, go back to the complete beginner guide."
---

Buying "a bit of everything" is the quickest way to get discouraged: you end up with five apps, devices that do not talk to each other, and no truly useful rule. The right method is to start from what you want to achieve, then choose only a few objects.

This page offers starter kits by goal (comfort, savings, security, light, heating) and by budget. You will also find the small extras everyone forgets: the USB extension cable, the batteries, the right power supply. By the end, you will know what to put in your basket, and what to leave aside for now.

![A smart plug, a rotating camera, a motion detector, a bulb and another small white box placed together on a light background](/images/debutant/smart-home-devices.webp)

*The objects of a first smart home kit: smart plug, camera, motion detector and bulb. Each answers a different need (measure, watch, detect, light up), which avoids buying the same thing several times. Photo: Jakub Zerdzicki, Pexels, free licence.*

## Go further

- [Which smart home hub for beginners](/en/smart-home/which-smart-home-hub-for-beginners/)
- [Choosing your Zigbee stick](/en/smart-home/best-zigbee-dongle-home-assistant/)
- [Zigbee temperature sensors](/en/smart-home/zigbee-temperature-sensor/)
- [Smart plugs for the UK and US](/en/smart-home/smart-plugs-uk-us/)
- [First smart home automations](/en/smart-home/first-smart-home-automations/)

## How much should you plan to start?

A word on vocabulary before looking at budgets. Zigbee is a low-power radio, perfect for battery sensors. For your hub to understand it, you plug in a small USB stick, called a Zigbee stick or dongle. As for Home Assistant, it is the free software that brings all your devices together in a single app.

| Your starting budget | What you can do |
|---|---|
| Very small | One or two Wi-Fi plugs that measure consumption, and perhaps a smart bulb. No central hub is needed. |
| Medium | A central hub already chosen (or a Raspberry Pi, a small computer the size of a bank card), plus a Zigbee stick, two or three sensors and a mains-powered Zigbee plug that will also act as a relay. |
| Larger | The same base, with radiator valves, a presence detector or a camera added, depending on your goal. |

Before buying, always check that a device is recognised by your hub, using the [compatibility table](/en/smart-home/compatibility-matrix-home-assistant-homey-zigbee-matter/) and the page [which hub to choose](/en/smart-home/which-smart-home-hub-for-beginners/).

## The small extras everyone forgets

A short USB extension cable keeps the Zigbee stick away from your internet router. Both use the same radio frequency and can disturb each other; a few tens of centimetres often fix the problem.

If you choose a Raspberry Pi 5, it needs a sufficiently powerful power supply: our [Home Assistant installation tutorial](/en/smart-home/install-home-assistant-raspberry-pi-5/) says which one.

Plan for batteries of the right type too. Sensors often use CR2032 or CR2450 coin cells; check the product sheet.

A mains-powered Zigbee plug does double duty: it switches a device, and it relays the signal of the other sensors at the same time. It is then called a Zigbee router.

Finally, any module fitted inside a wall or wired to a radiator control must be installed by an electrician if you are not qualified.

## Kits by goal

### For comfort and temperature

A Zigbee temperature and humidity sensor, such as the SONOFF SNZB-02D (see our [temperature sensor guide](/en/smart-home/zigbee-temperature-sensor/)), gives a first view of the house. You can add a plug for a portable heater, but only if the power rating and safety allow it. An alert such as "it is below 16 degrees in the living room" makes an excellent first setting: see [first automations](/en/smart-home/first-smart-home-automations/).

### For energy savings

Plugs with power measurement show what each appliance consumes. The Wi-Fi Tapo P110 is one example, and so are Zigbee plugs from various brands ([plug guide](/en/smart-home/smart-plugs-uk-us/)). Later, you can follow your home's energy meter with a suitable module, depending on what your country's meters offer.

### For security, the light version

A contact sensor on the front door and a motion detector in the hallway are enough to start. Your hub can send a notification to your phone, with no professional alarm panel.

### For lighting

A smart bulb, or a plug into which you connect an existing lamp, is enough. Add a motion detector so that the light comes on when you walk by. Avoid buying ten different Wi-Fi brands: each will have its own app.

### For heating, room by room

Choose thermostatic valves (small heads that screw onto the radiator) in Zigbee or Matter, a common language shared by several brands, and check carefully that the valve's fitting matches your radiator. A temperature sensor placed elsewhere in the room helps if the valve is badly positioned.

### If you rent

Plugs, battery sensors, buttons and thermostatic heads that come off without leaving a trace: the page on [smart home for renters](/en/smart-home/smart-home-renters-no-drilling/) details the options.

## Kits by budget

The descriptions below show what a first month of testing looks like, not prices. Prices change from shop to shop and from country to country: check them with the seller before buying.

### Without a hub: to discover

Two Wi-Fi plugs that measure consumption, and possibly a smart bulb. The outlay is modest, but depends on brands and bundles: confirm it with the seller.

### With Home Assistant: the Zigbee base

You need a brain: the [Home Assistant Green](/en/smart-home/home-assistant-green-vs-raspberry-pi-5/) box or a Raspberry Pi 5. Then you need a Zigbee stick ([stick comparison](/en/smart-home/best-zigbee-dongle-home-assistant/)), a temperature sensor, a contact sensor and a Zigbee plug.

The SONOFF ZBDongle-E is a USB coordinator that works with ZHA or Zigbee2MQTT and has an external antenna. The SONOFF SNZB-02D measures temperature and humidity, has a small screen and runs on a battery. The TP-Link Tapo P110 is a Wi-Fi plug that measures consumption and can be used without a hub at first. Searches on Amazon.co.uk, to check the live price and the model:

- [Home Assistant Green](https://www.amazon.co.uk/s?k=Home+Assistant+Green&tag=roboteducatif-21)
- [SONOFF ZBDongle-E](https://www.amazon.co.uk/s?k=SONOFF+ZBDongle-E&tag=roboteducatif-21)
- [SONOFF SNZB-02D](https://www.amazon.co.uk/s?k=SONOFF+SNZB-02D&tag=roboteducatif-21)
- [TP-Link Tapo P110](https://www.amazon.co.uk/s?k=TP-Link+Tapo+P110&tag=roboteducatif-21)

### With Homey

Take a Homey Pro or Pro mini (see our article on the [Homey Pro mini](/en/smart-home/homey-pro-mini-unboxing-setup/)), then the same types of devices as above. For each device, check that it appears in the Homey app before you buy it.

## What is better not to buy first

Five connected cameras before a single useful sensor will bring you nothing. Also avoid in-wall modules if you rent or are not comfortable with electricity, and brand-specific control accessories when one Zigbee stick and a single piece of software are often enough. Be equally careful with 433 MHz equipment (old remote-control radios) when you do not know whether your hub receives it.

If you have a specific project in mind (garage, shutters...), pick the equipment against the [protocols guide](/en/smart-home/smart-home-protocols-zigbee-wifi-thread-matter/). And if you feel like building some sensors yourself, look at the [ESP32 project ideas](/en/smart-home/esp32-smart-home-project-ideas/).

## Frequently asked questions

**Zigbee or Wi-Fi for my first purchase?**
Wi-Fi lets you test without a hub, with one app per brand. Zigbee becomes more interesting as soon as you have a hub and want battery sensors and automations that stay at home. Details on our [protocols](/en/smart-home/smart-home-protocols-zigbee-wifi-thread-matter/) page.

**How many Zigbee repeaters should I plan for?**
As a rough guide, a mains-powered Zigbee plug or bulb every eight to ten metres often helps, and you need more if the walls are thick. Rather than a ready-made rule, measure the quality of the radio link in your app (ZHA or Zigbee2MQTT, the two tools that manage Zigbee in Home Assistant).

**Can I mix Sonoff, Aqara and IKEA?**
Often yes on Zigbee with Home Assistant, but each device has its own small quirks (pairing method, battery, specific behaviour). The [compatibility table](/en/smart-home/compatibility-matrix-home-assistant-homey-zigbee-matter/) and the device lists of ZHA and Zigbee2MQTT help you check.

**Where can I see automations using this equipment?**
In our [first automations](/en/smart-home/first-smart-home-automations/). To pick up the general thread again, go back to the [complete beginner guide](/en/smart-home/begin-smart-home-complete-guide/).

---

*Affiliate disclosure: Amazon.co.uk links carry the site's tag (roboteducatif-21). If you buy through them, a commission may be paid at no extra cost to you. Check prices with the seller. Author: Emmanuel Sauvage.*
