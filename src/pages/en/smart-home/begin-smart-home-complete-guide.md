---
layout: ../../../layouts/EnPost.astro
title: "Begin smart home: the complete beginner guide"
description: "New to smart home? This guide walks you through what to decide, buy and set up first so your home reacts on its own, in plain words and in the right order."
updated: "30 October 2026"
faqSchema:
  - question: "Where should I start if I only have an hour?"
    answer: "Read steps 1 and 2, pick one clear goal, then move on to the short getting-started path. Above all, do not buy five different Wi-Fi brands on day one: you would end up managing five apps."
  - question: "Do I have to use Home Assistant?"
    answer: "No. For two plugs and a bulb, the manufacturer's app or Matter (a common language understood by many brands) can be enough. Home Assistant or Homey becomes useful when you want your devices to act together and keep working without internet."
  - question: "Will everything keep working if the internet goes down?"
    answer: "Locally controlled devices keep working: Zigbee sensors, a local hub, automations. Anything that goes through a manufacturer's servers (the cloud) stops, and so does voice control. The details are in the beginner mistakes page."
  - question: "Where can I find the meaning of a technical word I do not understand?"
    answer: "In the smart home glossary. Each term is explained in a sentence or two, with an example taken from a real home."
---

You would like your home to take care of small things for you: turn the heating down when a window stays open, switch on the hallway light at night, warn you when the front door opens. That is exactly what a smart home does: connected devices that react on their own, following rules you choose.

This guide takes you through it step by step. By the end you will know what to start with, what to buy first (and what to leave on the shelf), and how to create your first automatic rule. You do not need to know the vocabulary: every technical word is explained the first time it appears.

![A hand holding a smartphone that shows the app of a smart lock fitted to a white door](/images/debutant/living-room-tech.webp)

*A smart lock controlled from a phone: the first reflex of a smart home, a household object that you operate remotely or program. Photo: Sebastian Scholz (Nuki), Unsplash License.*

## Go further

- [Which smart home hub for beginners](/en/smart-home/which-smart-home-hub-for-beginners/)
- [Smart home protocols explained simply](/en/smart-home/smart-home-protocols-zigbee-wifi-thread-matter/)
- [First smart home devices to buy](/en/smart-home/first-smart-home-devices-to-buy/)
- [Smart home glossary](/en/smart-home/smart-home-glossary/)
- [Your first smart home automations](/en/smart-home/first-smart-home-automations/)
- [Beginner mistakes and their answers](/en/smart-home/smart-home-beginner-mistakes-faq/)
- [The short version: where to start](/en/smart-home/getting-started/)

## The essentials in a few lines

If you want automations that work without a subscription, and even when the internet is down, a simple base is enough. It has three parts.

The first is a brain. That is Home Assistant, free software that brings all your devices together in a single app. It runs on a small box: either the [Home Assistant Green](/en/smart-home/home-assistant-green-vs-raspberry-pi-5/), a plug-and-play box, or a Raspberry Pi 5, a computer the size of a bank card.

The second is a radio stick, also called a dongle or coordinator: a small USB stick that lets the brain talk to wireless sensors. It uses Zigbee, a low-power radio language that suits sensors running for months on a single battery. Our [Zigbee dongle guide](/en/smart-home/best-zigbee-dongle-home-assistant/) helps you choose one.

The third is a handful of sensors and smart plugs, chosen for a single goal: comfort, energy savings or security.

Would you rather not install anything yourself? Homey is a ready-made hub that combines several radios and is set up from an app: see our [Homey Pro mini unboxing and setup](/en/smart-home/homey-pro-mini-unboxing-setup/). And if you rent your home, start with the [no-drilling path for renters](/en/smart-home/smart-home-renters-no-drilling/).

Shopping searches, to check the live price and the plug type for your country:

- [Home Assistant Green on Amazon.co.uk](https://www.amazon.co.uk/s?k=Home+Assistant+Green&tag=roboteducatif-21)
- [Homey Pro mini on Amazon.co.uk](https://www.amazon.co.uk/s?k=Homey+Pro+mini&tag=roboteducatif-21)
- [SONOFF ZBDongle-E on Amazon.co.uk](https://www.amazon.co.uk/s?k=SONOFF+ZBDongle-E&tag=roboteducatif-21)

## Step 1: know what you really want

Before buying anything, write one sentence. For example: "I want the heating to cut out when a window is open" or "I want the hallway light to come on at night". Everything else, the brand as much as the hardware, follows from that sentence.

Three questions help you see clearly.

| Question | Why it changes everything |
|---|---|
| Do you rent or own? | A renter avoids drilling or touching the electrical installation, and turns to plugs, battery sensors and radiator valves that screw onto the radiator. An owner can also fit modules hidden in the walls. |
| Do you like tinkering, or do you want it turnkey? | Tinkering means installing software on a Raspberry Pi or building a sensor with an ESP32 board (a small programmable electronic board with Wi-Fi). Turnkey means a Home Assistant Green or a Homey, ready to use. |
| What is your starting budget? | On a small budget, begin with Wi-Fi devices and no central box. With a bit more, go straight for a hub and a Zigbee stick. |

A word you do not know? The [glossary](/en/smart-home/smart-home-glossary/) explains them all, with an example. The questions people hesitate to ask ("do I need to code?", "what if the internet drops?") are answered on the [beginner mistakes](/en/smart-home/smart-home-beginner-mistakes-faq/) page.

## Step 2: choose the conductor of the house (the hub)

![Close-up of several green Raspberry Pi circuit boards with their USB and network ports](/images/debutant/raspberry-pi.webp)

*Several Raspberry Pi boards up close. This small computer can become the brain of your home as soon as Home Assistant is installed on it. Photo: Craig Dennis, Pexels, free licence.*

The hub, sometimes called a box or controller, is the conductor. It receives information from your sensors ("the door has just opened") and triggers the actions you planned ("turn on the hallway light").

You do not have to buy one straight away. You can start with each manufacturer's app and bring everything together later, if you feel like it.

| Your profile | What suits you best |
|---|---|
| You want to save on heating or track your consumption | Home Assistant, with temperature sensors and plugs that measure energy use |
| You want an alert when something happens | Home Assistant or Homey, with door and motion sensors |
| You simply want to control a few lamps | Wi-Fi bulbs or plugs with no central box, then Home Assistant later if needed |
| You rent | Plugs, battery sensors and thermostatic radiator valves that screw onto the radiator |
| You like tinkering | Home Assistant on a Raspberry Pi or a mini PC, with [ESP32](/en/smart-home/esp32-smart-home-project-ideas/) boards |

For each goal, the budget ranges and the traps to avoid (such as a hidden subscription) are on the page [which smart home hub for beginners](/en/smart-home/which-smart-home-hub-for-beginners/). If you want to compare the software itself, read our [Home Assistant, Jeedom and Homey comparison](/en/smart-home/home-assistant-jeedom-homey-which-hub/).

The Home Assistant Green is the simplest way to start: Home Assistant comes preinstalled, it runs locally and it needs no mandatory subscription. Check the current price with the seller before you buy.

Would you rather have a ready-made hub that you set up entirely from an app? The Homey Pro mini by Athom is the simplest alternative. It speaks Zigbee, Thread and Matter out of the box (the radio languages explained in our [glossary](/en/smart-home/smart-home-glossary/)) and runs locally, even when the internet is down. Z-Wave, Bluetooth and infrared need the Homey Bridge, sold separately; the more expensive Homey Pro has them built in. The Homey Pro mini is currently being tested by us: see our [unboxing and step-by-step setup](/en/smart-home/homey-pro-mini-unboxing-setup/). [Check the Homey Pro mini price on Amazon.co.uk](https://www.amazon.co.uk/s?k=Homey+Pro+mini&tag=roboteducatif-21).

## Step 3: understand how your devices talk to each other

Every connected device uses a radio language to exchange messages with the house. That language is called a protocol. The most common are Wi-Fi (the one from your internet router) and Zigbee, which we have already mentioned. Then come Z-Wave, a cousin of Zigbee that uses a different radio frequency, Thread, a low-power network, and Matter, a common language that more and more brands understand. You will also meet Bluetooth and 433 MHz, an older radio found on some older roller shutters.

These languages are not interchangeable. They differ in range, in appetite for power (a battery sensor cannot use Wi-Fi for long) and in the extra hardware you need.

Keep one idea in mind: with Zigbee, devices plugged into a mains socket act as relays. Each one passes on its neighbour's message, a bit like a chain of people passing buckets of water. This is called a mesh network. The more mains-powered devices you add, the sturdier the network becomes.

Three reads to go deeper:

- The guide [Zigbee, Wi-Fi, Thread and Matter explained simply](/en/smart-home/smart-home-protocols-zigbee-wifi-thread-matter/), with a table to keep at hand.
- The article [Matter, Thread, Zigbee, Wi-Fi: which protocol in 2027](/en/smart-home/matter-thread-zigbee-wifi-which-protocol-2027/), to see where the market is heading.
- The [compatibility table between brands and hubs](/en/smart-home/compatibility-matrix-home-assistant-homey-zigbee-matter/), to check that a device will be recognised.

Our starting rule: Zigbee for battery sensors, local Wi-Fi for plugs and modules on mains power (for example the Shelly brand, which can be controlled without going through the internet), and Matter when you do not want to depend on a single brand.

## Step 4: buy your first devices, a kit rather than a warehouse

A good starter kit is a short list: a Zigbee stick if you choose that radio, one or two sensors, one or two plugs, and perhaps a bulb or a radiator valve. The page [first smart home devices to buy](/en/smart-home/first-smart-home-devices-to-buy/) offers kits by goal and by budget, as ranges only, with no invented fixed prices.

The SONOFF ZBDongle-E is a USB Zigbee coordinator that works with ZHA or Zigbee2MQTT, the two ways of connecting Zigbee to Home Assistant, and it has a large catalogue of compatible sensors. The coordinator is the part that runs the home's Zigbee network. Prices vary from shop to shop, so check them with the seller before buying.

## Step 5: create your first automations

An automation is a rule of the type "if this happens, then do that". It is made of a trigger (what happens), optional conditions (in which case) and actions (what the house does).

Example: when the hallway detector spots movement (trigger) and it is dark (condition), the light comes on (action).

The page [first smart home automations](/en/smart-home/first-smart-home-automations/) gives ten concrete ideas, from a light that switches on by itself to an alert when the washing machine has finished, for Home Assistant and for Homey.

## And then?

Once the base is in place, here is where to dig deeper:

- Install Home Assistant: the [Raspberry Pi 5 tutorial](/en/smart-home/install-home-assistant-raspberry-pi-5/), or the [Green versus Pi 5 comparison](/en/smart-home/home-assistant-green-vs-raspberry-pi-5/) if you hesitate.
- Choose Homey: [Pro mini unboxing and setup](/en/smart-home/homey-pro-mini-unboxing-setup/).
- Build your own sensors: the [ESP32 project ideas](/en/smart-home/esp32-smart-home-project-ideas/) and the [ESP32 projects hub](/en/smart-home/esp32-projects/).
- Choose between two ways of connecting Zigbee to Home Assistant: [Zigbee2MQTT or ZHA](/en/smart-home/zigbee2mqtt-vs-zha-home-assistant/).
- Browse all our beginner articles: the [beginner guides hub](/en/smart-home/getting-started-guides/).

## Frequently asked questions

**Where should I start if I only have an hour?**
Read steps 1 and 2, pick a single goal, then move on to the [short getting-started path](/en/smart-home/getting-started/). Above all, do not buy five different Wi-Fi brands on day one: you would end up with five apps to manage.

**Do I have to use Home Assistant?**
No. For two plugs and a bulb, the manufacturer's app or Matter (a common language understood by many brands) can be enough. Home Assistant, or Homey, becomes useful when you want your devices to act together and keep working even without internet.

**Will everything keep working if the internet goes down?**
Locally controlled devices keep working: Zigbee sensors, a local hub, automations. However, anything that goes through a manufacturer's servers (the cloud) stops, as does voice control. The details are on the [beginner mistakes](/en/smart-home/smart-home-beginner-mistakes-faq/) page.

**Where can I find the meaning of a technical word I do not understand?**
In the [smart home glossary](/en/smart-home/smart-home-glossary/). Each term is explained in a sentence or two, with an example taken from a real home.

---

*Affiliate disclosure: Amazon.co.uk links carry the site's tag (roboteducatif-21). If you buy through them, a commission may be paid at no extra cost to you. Check current prices and availability with the seller. Author: Emmanuel Sauvage.*
