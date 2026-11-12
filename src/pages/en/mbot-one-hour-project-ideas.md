---
layout: ../../layouts/EnPost.astro
title: "mBot programming in 1 hour: challenge ideas and method"
description: "mBot programming for a one-hour session: minute-by-minute plan, 7 challenges (LED, ultrasonic, course) and links to the step-by-step tutorials for class."
updated: "31 October 2026"
faqSchema:
  - question: "How long does an mBot program take in a workshop?"
    answer: "Plan 45 to 60 minutes per challenge: 5 min for the goal, 30 min of coding and testing, 10 min of robustness checks, 5 min for the demo."
  - question: "What can you program on an mBot in one hour?"
    answer: "Short challenges: an LED traffic light, an ultrasonic radar, an intrusion counter, a fixed-duration course, or a mini scenario on the LED matrix."
---

Looking for **mBot programming** ideas (the Makeblock educational robot programmed with blocks) that fit a **one-hour** class, club or home session? This page starts with the **method** (a minute-by-minute plan), then gives a **list of challenges** ready to launch, with links to the step-by-step tutorials on this site.

> **Direct answer (October 2026)** — Plan **45–60 minutes** per mBot challenge: 5 min for the goal, 30 min of code/test, 10 min of robustness, 5 min of demo. Quick ideas: [LED](/en/mbot-activity-blink-leds/), [ultrasonic](/en/mbot-activity-measure-distance/), [intrusion](/en/mbot-activity-intrusion-detector/). Install [mBlock 5](/en/install-mblock-5-windows/) before the session.

Prerequisites: **mBlock** installed, robot **charged** (or batteries OK), and [first steps in mBlock](/en/first-steps-mblock-5/) already done. A few purchase links appear **after** the challenges; they are affiliate links (we may earn a commission). Check today’s price on Amazon.

![Makeblock mBot seen from three quarters, ready for a one-hour challenge](/images/lot1/mbot-premier-hero.webp)

*The classic mBot — well suited to short block-based challenges in Scratch / mBlock. Product photo used for this article.*

## 1. Splitting the hour (a method that works)

| Minutes | Activity |
|---------|----------|
| 0–5 | Recall the goal + **success criterion** (“we stop when…”). |
| 5–35 | Code and **short tests** (no 80-block monster program). |
| 35–50 | **Robustness**: what happens if you move the robot or the obstacle? |
| 50–60 | **Demo** for 2 minutes + one sentence “what we would do next time”. |

This plan stops you spending the whole session chasing a bug without ever showing a result.

## 2. Challenge ideas (mBot programming)

### Express traffic light (~30 min of coding)

Alternate **red / green** (then orange if available) on the LEDs with timings — based on [LED blinking](/en/mbot-activity-blink-leds/).

### “Stop” radar (~30 min)

**Alert** (LED or matrix) when the measured distance drops under a threshold — extends [distance measurement](/en/mbot-activity-measure-distance/).

### Intrusion counter (~35 min)

Combine **ultrasonic + counter + display** — see [intrusion detector](/en/mbot-activity-intrusion-detector/).

### “One minute of silence” challenge (~25 min)

The robot stays still as long as no **sound** above a threshold is detected — **only if** your model has a microphone usable in mBlock (the classic mBot v1 does not ship with one; mBot2 / CyberPi does). Otherwise, swap the trigger for the onboard button or a line sensor.

### Mini narrative scenario (~30 min)

The robot “delivers” a message on the matrix or LEDs between two moves — excellent for an **oral recap** in class. Matrix scrolling: [scroll text](/en/mbot-activity-scroll-text/).

### Set course without a black track (~35 min)

Program **forward / turn / reverse** with fixed durations to exit a chalk maze on the floor — no need for a line follower at the start. Starting point: [first mBot program](/en/first-mbot-program/).

### Traffic light + ultrasonic combined (~45–55 min)

Chain the LED sequence with a distance threshold if the group moves fast: the light stays green while the way is clear and turns red as soon as an obstacle comes closer than the threshold. Keep the demo short.

## Useful equipment (after the challenges)

Once the method and ideas are clear, here is the most common kit for these workshops. Amazon prices change: check the listing on the day you buy.

**Makeblock mBot** — ages about 8–12 · Scratch and Arduino · quick build for a workshop · LEDs and ultrasonic sensor suited to 1-hour challenges · [Amazon UK](https://www.amazon.co.uk/dp/B07XR98YYQ?tag=roboteducatif-21) · [Amazon.com](https://www.amazon.com/dp/B07XR98YYQ?tag=roboteducatif-20)

**ELEGOO Penguin Bot** (budget alternative, not an mBot) — ages about 8–14 · Arduino C · an original two-legged robot for a different kind of workshop · [Amazon UK](https://www.amazon.co.uk/s?k=ELEGOO+Penguin+Bot&tag=roboteducatif-21) · [Amazon.com](https://www.amazon.com/s?k=ELEGOO+Penguin+Bot&tag=roboteducatif-20)

## 3. Next steps

- Robot overview: [mBot, my first educational robot](/en/mbot-my-first-educational-robot/).
- Accessories for later: [mBot accessories — where to start](/en/mbot-accessories-where-to-start/).
- Longer sequence: [10 free mBot projects for the classroom](/en/10-free-mbot-classroom-projects/).

## 4. Pitfalls to avoid in 1 hour

- Goal **too broad** (“let’s do everything”) — prefer **one** finished feature.
- Forgetting the **final demo**: that is what anchors the learning.
- Spending 40 minutes on a USB cable or Bluetooth: test the connection **before** the session ([mBlock Bluetooth troubleshooting](/en/mblock-bluetooth-troubleshooting/) if needed).

## Amazon links (affiliate)

- [Makeblock mBot — Amazon UK](https://www.amazon.co.uk/dp/B07XR98YYQ?tag=roboteducatif-21) · [Amazon.com](https://www.amazon.com/dp/B07XR98YYQ?tag=roboteducatif-20)

*Amazon partner — commission possible on eligible purchases, at no extra cost to you.*

**Tip.** Always end with a **2-minute demo** in front of someone: it fixes the goal and stops you over-complicating the program.

**Also read**: [best educational robot 2026](/en/best-educational-robot-2026/).

*Author: Emmanuel Sauvage · updated 31 October 2026.*
