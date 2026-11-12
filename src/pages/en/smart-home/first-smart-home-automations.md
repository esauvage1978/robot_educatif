---
layout: ../../../layouts/EnPost.astro
title: "First useful smart home automations"
description: "Ten simple first automations for your home: light, heating, washing machine, away mode... explained for Home Assistant and for Homey, with no coding required."
updated: "30 October 2026"
faqSchema:
  - question: "Do I need to learn YAML?"
    answer: "Not to start. The Home Assistant visual editor covers these ten cases. YAML becomes useful later, to keep a copy of your rules or for advanced needs."
  - question: "Are Homey Flows and Home Assistant equivalent?"
    answer: "For these ten examples, yes: they produce the same result. Details differ for phone location, rule templates and scripts. Start from the hub you own, or use the hub choice page to help you decide."
  - question: "Why does my automation only work every other time?"
    answer: "The most common causes are a sensor too far from the rest of your radio network, a weak battery, or a condition that is too strict. Look at the device's state history and the quality of the radio link."
  - question: "Where can I find more project ideas?"
    answer: "In our ESP32 project ideas and in the complete beginner guide, which maps the whole path."
---

Your hub is plugged in, your first sensors are recognised, and now what? This is the moment when a smart home becomes truly useful: when the house acts on its own. A good automation answers a real need ("I do not want to heat with the windows open"), not the urge for a gadget.

This page gives you ten simple ideas. For each one, you will know what it is for, what you need, and how to create it in Home Assistant (free software that brings all your devices together) as well as in Homey (a ready-made hub you buy off the shelf). No need to know how to code. The equipment is presented in the [first devices to buy](/en/smart-home/first-smart-home-devices-to-buy/), and unfamiliar words are in the [glossary](/en/smart-home/smart-home-glossary/).

## Go further

- [First smart home devices to buy](/en/smart-home/first-smart-home-devices-to-buy/)
- [Smart home glossary](/en/smart-home/smart-home-glossary/)
- [Homey Pro mini: unboxing and setup](/en/smart-home/homey-pro-mini-unboxing-setup/)
- [Install Home Assistant on a Raspberry Pi 5](/en/smart-home/install-home-assistant-raspberry-pi-5/)

## The principle, in three words

Every automation follows the same pattern: an event triggers it, a condition may specify in which case it should act, and an action does what is asked. The two programs use different words for the same idea.

| What we mean | In Home Assistant | In Homey |
|---|---|---|
| The event that starts the rule (the trigger) | Trigger | "When..." |
| The filter that says in which case to act (the condition) | Condition | "And..." |
| What the house does (the action) | Action | "Then..." |

In Home Assistant, you create a rule from the Settings menu, then Automations & scenes, with a visual editor: the labels may vary slightly with the version. In Homey, you assemble cards in the Flows section. No line of code is needed for these ten cases. The small YAML example further down (a text format for writing a rule by hand) is only an illustration.

## 1. Turn on the light when someone passes

**What it is for:** the hallway lights up at night without you looking for the switch, then goes off when nobody moves any more.  
**What you need:** a motion detector and a light (smart bulb, plug or relay).

In Home Assistant, choose the motion detector as the trigger, add a condition "it is night" (sun below the horizon, or low brightness), then the action of turning on the light. For switching off, create a second rule with a delay after the last detection.

In Homey, assemble a card "When motion is detected", "And it is night", "Then turn on the light". A second Flow, with a delay card, turns the light off.

## 2. Get warned when a window stays open with the heating on

**What it is for:** avoid heating for nothing.  
**What you need:** a contact sensor and a connected heating device (radiator valve, plug or thermostat).

In Home Assistant, trigger the rule when the sensor says "open", add the condition "the heating is active", then send a notification to your phone. You can also lower the temperature or switch the heating off.

In Homey, it is the same chain with a card "When the contact opens", "And the heating is on", "Then send a notification", and if your device allows it, a card to lower the setpoint.

## 3. Know when the washing machine has finished

**What it is for:** receive a message as soon as the cycle ends, so the laundry does not stay damp.  
**What you need:** a plug that measures electricity consumption.

In Home Assistant, the rule fires when the power drops back under a low threshold after having exceeded a high one. The community offers rule templates for this, called blueprints, which save you from building everything by hand. In Homey, a card on the power drawn (depending on your plug's app) is enough, with a notification as the action.

The right thresholds depend on your machine: look at its consumption curve once before setting the values.

## 4. "Away" mode: switch everything off when leaving

**What it is for:** a single gesture, or your leaving the house, switches off the lights and some plugs.  
**What you need:** a wireless button, or your phone's presence detection.

In Home Assistant, trigger the rule when the person leaves the house (or when a virtual "away" switch is turned on), then switch off the chosen lights and plugs, or run a scene (a set of states recalled at once). In Homey, use "When I leave home" (phone location) or the press of a button, then switch off the lights of the zone.

Phone location is never perfect. Always keep a physical button as a backup.

## 5. A night light at a fixed time for the children

**What it is for:** a soft light that comes on at bedtime.  
**What you need:** a dimmable bulb.

In Home Assistant, choose a time as the trigger and turn on the light at low brightness. In Homey, "When the time is...", "Then turn on the light at such a percentage".

## 6. An alert if the temperature gets too low

**What it is for:** detect a risk of frozen pipes, or a lack of heating.  
**What you need:** a temperature sensor.

In Home Assistant, trigger the rule when the temperature falls under a threshold (for example five degrees) and send a notification, possibly while turning on a heater. In Homey, "When the temperature becomes lower than...", "Then send an alert".

## 7. Turn on a lamp at sunset

**What it is for:** a warm atmosphere at the end of the day.  
**What you need:** a connected light.

In Home Assistant, use the "sunset" trigger (you can shift it by a few minutes), then turn on the light. In Homey, "When the sun sets", "Then turn on".

## 8. Cut standby power at night

**What it is for:** save the electricity of devices that stay on for nothing, such as a television and its box.  
**What you need:** plugs that can be controlled remotely.

In Home Assistant, switch the plugs off at 11:30 pm and back on at 7 am if needed. In Homey, take the same idea with "When the time is...".

First check that the device can stand being cut off abruptly: a network hard drive (NAS) or some set-top boxes do not like it at all.

## 9. Get notified when the front door opens

**What it is for:** know who comes in, for example when the children come home alone.  
**What you need:** a contact sensor.

In Home Assistant, send a notification as soon as the sensor opens, with the optional condition "nobody is home". In Homey, "When the door opens", "Then send a notification".

## 10. Remember to air the room

**What it is for:** a reminder to open the windows for ten minutes, at a fixed time or when the air is too stale.  
**What you need:** either nothing, just the time; or a CO₂ sensor, which measures the gas that builds up in a closed room (see [this project with a Raspberry Pi and an SCD41 sensor](/en/smart-home/raspberry-pi-co2-scd41-home-assistant/)).

In Home Assistant, trigger the rule at a regular time, or when the CO₂ level exceeds a threshold, then send a notification. In Homey, "When the time comes" or "When CO₂ is high", then "Then notify".

## A YAML example for Home Assistant

Here is the first automation (the hallway light) written as text. You can copy it into the editor in YAML mode, after replacing the names with those of your own devices.

```yaml
# Illustrative: replace the entity_id values with your own
automation:
  - alias: "Hallway: motion at night"
    trigger:
      - platform: state
        entity_id: binary_sensor.hallway_motion
        to: "on"
    condition:
      - condition: state
        entity_id: sun.sun
        state: "below_horizon"
    action:
      - service: light.turn_on
        target:
          entity_id: light.hallway
```

This example has not been run on your installation. After adapting it, use the check tool of the Home Assistant editor before saving it.

## A few tips so you do not drown

An automation should answer a single need, not three. Give it a meaningful name, such as "Living room window alert with radiator", so you can find it again in six months. Test it first with a simple notification before entrusting it with a heavier action, like cutting the heating. And for the washing machine consumption thresholds, measure before you set them.

To continue the path, move on to the [beginner mistakes](/en/smart-home/smart-home-beginner-mistakes-faq/) or go back to the [complete guide](/en/smart-home/begin-smart-home-complete-guide/).

## Frequently asked questions

**Do I need to learn YAML?**
Not to start. The Home Assistant visual editor covers these ten cases. YAML becomes useful later, to keep a copy of your rules or for advanced needs.

**Are Homey Flows and Home Assistant equivalent?**
For these ten examples, yes: they produce the same result. Details differ for phone location, rule templates and scripts. Start from the hub you own, or use the [hub choice page](/en/smart-home/which-smart-home-hub-for-beginners/) to help you decide.

**Why does my automation only work every other time?**
The most common causes are a sensor too far from the rest of your radio network, a weak battery, or a condition that is too strict. Look at the device's state history and the quality of the radio link.

**Where can I find more project ideas?**
In our [ESP32 project ideas](/en/smart-home/esp32-smart-home-project-ideas/) and in the [complete beginner guide](/en/smart-home/begin-smart-home-complete-guide/), which maps the whole path.

---

*Author: Emmanuel Sauvage. Teaching examples: adapt device names and thresholds to your own installation.*
