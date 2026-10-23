---
layout: ../../layouts/EnPost.astro
title: "mBlock Bluetooth not connecting? A step-by-step fix for mBot"
description: "mBot, mBot2 or Codey Rocky won't connect over Bluetooth in mBlock? Check in the right order: USB first, mBlock and firmware, PC Bluetooth, pairing, range and interference. Table: USB or Bluetooth for each situation."
updated: "23 October 2026"
---

**Bluetooth** between **mBlock** and a robot (**mBot**, **mBot2**, **Codey Rocky**) is often the first source of frustration: USB works, but wireless refuses. The causes fall into a few families: **software**, **PC radio**, **pairing** and **environment**. Here is a checking order that avoids mixing everything up.

## 1. The order to follow (don't skip steps)

| Step | Check | Why |
|---|---|---|
| 1 | **Prove the robot over USB** | if a USB upload fails, Bluetooth is not the problem |
| 2 | **Update mBlock** | use a version compatible with your OS |
| 3 | **Update the robot's firmware** | an old firmware can block Bluetooth |
| 4 | **PC Bluetooth** | airplane mode, Fn key, drivers |
| 5 | **Re-pair cleanly** | remove the old device, then pair again |
| 6 | **Range and interference** | test at about 1 m first |

## 2. Software and firmware

- Install mBlock from the official site and read the release notes for your model: see [installing mBlock 5](/en/install-mblock-5-windows/).
- Update the firmware following [Makeblock](/en/makeblock-brand/)'s documentation for **your** robot. After a major update, restart both the robot and the PC.

## 3. Bluetooth on the computer

- On a laptop, **airplane mode** or an **Fn key** can switch the radio off without an obvious warning.
- Some **USB Bluetooth adapters** are more stable than the built-in chip: if failures persist, try a recent Bluetooth 5 adapter.

## 4. Windows pairing

- Remove the old device in **Settings → Bluetooth & devices**, then pair again from scratch.
- Close other apps that might hold the robot (remote-control apps, a second mBlock window).

## 5. Range and interference

- Test **close to the computer** first (about 1 m), with no metal wall in between.
- Move away **USB 3.0** devices, which can disturb some 2.4 GHz links (real but not systematic).

## 6. USB or Bluetooth?

| Situation | Recommendation |
|---|---|
| Classroom, 30 pupils | USB to **upload**; Bluetooth for tests if the room allows |
| Competition or demo | USB, or a setup **tested the day before**: no first Bluetooth connection on the day |
| Troubleshooting | **always** validate over USB before blaming the robot |

**Our advice:** **USB first** to prove the robot responds; **Bluetooth next**, with mBlock up to date and a clean pairing. Then build your [first mBot program](/en/first-mbot-program/). More guides in [Tutorials](/en/tutorials/).

Affiliate link (check current price): <a href="https://www.amazon.com/s?k=USB+Bluetooth+5.0+adapter&tag=roboteducatif-20" rel="nofollow sponsored">USB Bluetooth 5.0 adapter (Amazon US)</a> / <a href="https://www.amazon.co.uk/s?k=USB+Bluetooth+5.0+adapter&tag=roboteducatif-21" rel="nofollow sponsored">Amazon UK</a>.
