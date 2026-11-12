---
layout: ../../../layouts/EnPost.astro
title: "Smart home beginner mistakes (FAQ)"
description: "Do you need to code? Cloud or local? What if the internet goes down? The questions beginners dare not ask about smart homes, with frank answers and advice to avoid the traps."
updated: "30 October 2026"
faqSchema:
  - question: "Do I need to know how to code to start?"
    answer: "No. Home Assistant offers a visual editor, and Homey uses cards you assemble, called Flows. YAML, ESPHome and MQTT come later, when you feel like tinkering. Our ten first automations are done without programming."
  - question: "Cloud or local: what should I choose?"
    answer: "If you want heating and lights to keep working when the internet drops, aim for local: Home Assistant, Homey with local devices, Zigbee, or Shelly modules controlled on your network. The cloud is handy for voice control, but it creates a dependency. Many homes combine both: local first, voice as a complement."
  - question: "What does it really cost to get started?"
    answer: "There is no single figure. A modest outlay is enough with Wi-Fi alone; with a hub, a Zigbee stick and sensors, the total is clearly higher. Optional subscriptions, such as remote access or camera storage, come on top. Check the prices with the seller on the day you buy."
  - question: "What happens if the internet goes down?"
    answer: "Zigbee sensors with a local hub (Home Assistant or Homey) keep running their automations. Plugs that depend on the manufacturer's servers often stop answering, and voice control is unavailable or very limited. Remote access is cut, but everything remains usable from home."
  - question: "Is Home Assistant too difficult for me?"
    answer: "There is a learning curve: updates, vocabulary. The short getting-started path and the complete guide take you through it step by step. Homey remains a less technical alternative."
---

When you start with a smart home, you ask yourself many questions that technical guides do not tackle frankly: will I have to code? What happens if the internet goes down? How much does it really cost? Can I do it if I rent?

This page answers them plainly. You will find the mistakes almost every beginner makes, and how to avoid them before spending a penny. These answers replace neither the safety instructions of the devices, nor a qualified electrician when it comes to touching the electrical installation.

## Go further

- [Which smart home hub for beginners](/en/smart-home/which-smart-home-hub-for-beginners/)
- [Smart home for renters, no drilling](/en/smart-home/smart-home-renters-no-drilling/)
- [Smart home glossary](/en/smart-home/smart-home-glossary/)
- [Device compatibility table](/en/smart-home/compatibility-matrix-home-assistant-homey-zigbee-matter/)

## The seven most common mistakes

1. **Buying before having a goal.** You come home with ten objects and no useful rule. Write down first what you want the house to do.
2. **Multiplying brand apps.** Each has its own app and its own account, and you end up locked into each of them. It is better to have devices that speak a common language (Zigbee, a low-power radio, or Matter, a language understood by several brands) brought together by a single hub.
3. **Forgetting Zigbee relays.** A lone sensor at the far end of the garden will not "hold". You need mains-powered devices, such as a plug, to relay its signal.
4. **Putting Home Assistant straight onto the internet.** Home Assistant is the free software that brings your devices together. To reach it from outside, go through a virtual private network (VPN) or a documented solution such as the Nabu Casa subscription. Choose strong passwords and turn on two-step verification when it exists.
5. **Cutting power to any plug.** Some devices, such as a network hard drive, do not like being cut off abruptly.
6. **Forgetting you are a renter.** Drilling or fitting an in-wall module may be forbidden: read our page on [smart home for renters](/en/smart-home/smart-home-renters-no-drilling/).
7. **Believing Matter solves everything.** Matter is a promising common language, but its catalogue still needs checking device by device; see our article on [protocols in 2027](/en/smart-home/matter-thread-zigbee-wifi-which-protocol-2027/).

## Frequently asked questions

### Do I need to code to start?

No. Home Assistant offers a visual editor, and Homey (a ready-made hub) uses cards you assemble, called Flows. YAML (a text format for writing rules), ESPHome (a tool for programming small electronic boards) and MQTT (a messaging system between devices) come later, when you feel like tinkering. Our [ten first automations](/en/smart-home/first-smart-home-automations/) are done without programming.

### Cloud or local: what should I choose?

The cloud means the manufacturer's servers on the internet. Local means everything stays at home. If you want heating and lights to keep working when the internet drops, aim for local: Home Assistant, Homey with local devices, Zigbee, or Shelly modules controlled on your network. The cloud is handy for voice control and for some manufacturer features, but it creates a dependency. Many homes combine both: local first, voice as a complement.

### How do I know whether a device is compatible?

First look at the manufacturer's sheet, which says whether it works with Matter or Zigbee, or offers local control. Then check the [compatibility table](/en/smart-home/compatibility-matrix-home-assistant-homey-zigbee-matter/) and the device lists of ZHA, Zigbee2MQTT (two tools that manage Zigbee in Home Assistant) and the Homey apps. Be wary of vague promises such as "works with Alexa" if you aim for local operation with Home Assistant.

### I rent: what can I do?

Plenty of things without drilling: plugs, battery sensors, buttons, removable thermostatic heads that screw onto the radiator, sometimes screw-in bulbs. Avoid in-wall modules without the landlord's agreement. Our page on [smart home for renters](/en/smart-home/smart-home-renters-no-drilling/) details all this.

### What does it really cost to get started?

There is no single figure. A modest outlay is enough with Wi-Fi alone; with a hub, a Zigbee stick and sensors, the total is clearly higher. Optional subscriptions, such as remote access or camera storage, come on top. See the comparison in our pages on [choosing a hub](/en/smart-home/which-smart-home-hub-for-beginners/) and on the [first devices](/en/smart-home/first-smart-home-devices-to-buy/), and check the prices with the seller on the day you buy.

### Security and privacy: which habits to adopt?

Use a different password for each account and for the hub, and keep everything updated. For cameras, prefer those whose images stay at home, and find out where the images go if they do not. Never expose the hub's administration interface to the internet without protection. If you know how, isolate the connected objects on a network separate from the rest of the house; if not, start simply, but always change the factory passwords.

### What happens if the internet goes down?

| Your setup | What generally happens |
|---|---|
| Zigbee sensors with a local hub (Home Assistant or Homey) | Automations keep running |
| Plugs that depend on the manufacturer's servers | They often stop answering |
| Voice control (Google, Alexa) | Unavailable or very limited |
| Remote access from outside | Cut, but everything stays usable from home |

### Do I need a hub straight away?

No. Two Wi-Fi plugs to try for a week can be enough. As soon as you want several devices to act together, move on to the [choice of hub](/en/smart-home/which-smart-home-hub-for-beginners/).

### Is Home Assistant too difficult for me?

There is a learning curve: updates, vocabulary. The [short version of the path](/en/smart-home/getting-started/) and the [complete guide](/en/smart-home/begin-smart-home-complete-guide/) take you through it step by step. Homey remains a less technical alternative.

### Can I do everything with Matter alone?

Not yet for every need: the catalogue of devices and the maturity vary. Matter is a bet on compatibility, a useful one, but Zigbee remains very pragmatic in 2026. See the page on [protocols](/en/smart-home/smart-home-protocols-zigbee-wifi-thread-matter/).

### How do I replace a first hub that does not suit me?

If your devices speak Zigbee or Matter, moving to Home Assistant or Homey is realistic. The real trap is devices that depend entirely on their brand's servers. Hence the value of choosing well from the start, with the [complete guide](/en/smart-home/begin-smart-home-complete-guide/).

### Are the "about X" prices found on the web reliable?

Not as a commitment. Take them as orders of magnitude and open the seller's page on the day you buy.

### Are the products recommended on this site sponsored?

Some links are affiliate links (Amazon, Shelly) and are flagged as such. If you buy through them, the site may earn a commission at no extra cost to you. That does not change the standard: no price is invented and the limits of each product are stated.

### Where can I ask for help next?

Start with the official documentation of Home Assistant, Homey or Jeedom, then user communities. On this site, the [error codes and troubleshooting page](/en/smart-home/error-codes-troubleshooting-zigbee-home-assistant-shelly/) and the [ESP32 project ideas](/en/smart-home/esp32-smart-home-project-ideas/) can help you out.

---

*Author: Emmanuel Sauvage.*
