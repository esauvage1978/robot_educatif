---
layout: ../../layouts/EnPost.astro
title: "mBot ultrasonic sensor (1/4): measure a distance"
description: "mBot ultrasonic sensor, part 1: how the echo measures distance, a Live-mode reading in centimeters, and a reliable variable for the later projects."
updated: "2 November 2026"
faqSchema:
  - question: "Why USB rather than Bluetooth at the start?"
    answer: "USB (a cable) avoids radio problems while you learn to read the sensor. Use the mBlock Bluetooth troubleshooting guide after that."
  - question: "Which unit does mBlock use?"
    answer: "Usually centimeters (cm) on the mBot ultrasonic block."
---

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/categorie/mbot/">mBot activities</a> · Ultrasonic sensor series (1/4)</nav>

<aside class="article-callout" role="note">
<p><strong>Learning goal</strong></p>
<p>Understand what an ultrasonic sensor really measures, then <strong>get a reliable distance</strong> into a variable. That is the base for the next three activities (radar, beep rate by distance, braking).</p>
</aside>

![mBot robot with a front ultrasonic sensor](/images/products/mbot.webp)

This series is part of the [coding for kids](/en/when-to-start-coding-with-kids/) track and the guide [My first mBot robot](/en/mbot-my-first-educational-robot/).

## What you will do

- Connect and set up the **mBot** in mBlock.
- Read the **ultrasonic sensor** distance (in **cm**) into a **variable**.
- Show the value continuously so you can check that the reading “moves” when you bring an obstacle closer.

## Prerequisites

- An [mBot](/en/mbot-my-first-educational-robot/) (ultrasonic sensor on the front).
- mBlock installed and working: [installation](/en/install-mblock-5-windows/) then [first steps](/en/first-steps-mblock-5/).
- The mBot blocks are visible (orange blocks): [install the mBot blocks](/en/install-mbot-blocks/).

---

## 1) How an ultrasonic sensor works (simple explanation)

An ultrasonic sensor “sees” a distance in 3 steps:

1. It **sends** a very high sound (ultrasound), which we cannot hear.
2. The wave leaves, hits an obstacle, then **comes back** as an **echo**.
3. The board measures the **time** between sending and return, then calculates the distance.

### Diagram 1 — the “ping → echo” idea

```text
mBot (sensor)                                   Obstacle (wall, box…)
   [sends]  ─────────────── ultrasound ──────────────►
   [receives] ◄──────────── echo ─────────────────────
```

### Diagram 2 — time of flight (out and back)

If the wave takes `t` seconds for the round trip, then:

`distance ≈ (speed of sound × t) / 2`

- **Why /2?** Because `t` is the **trip out plus the trip back** (the wave travels the distance you want to measure **twice**).
- **Speed of sound**: about **343 m/s** at **20 °C**. (It changes a little with temperature, but you can ignore that for these activities.)

### Hands-on tips (to avoid “weird” readings)

- **Too close**: under about **3 cm**, the sensor can answer badly (the echo comes back “too soon”).
- **Too far**: beyond a few meters, the echo becomes too weak.
- **Soft obstacle** (curtain, sweater, plant): the echo is absorbed → unstable distance.
- **Tilted obstacle**: the echo bounces off to the side → a larger distance, or a value that jumps.
- **Useful range**: aim for about **5 cm to 200 cm** at first, with a **flat** obstacle (a book, cardboard).

> Classroom tip: move a sheet of A4 paper in front of the sensor. If the distance changes cleanly, the “sensor → variable” chain is OK.

---

## 2) Activity: measure a distance (cm) in mBlock

### 2.1 Create a distance variable

Create a variable named, for example:

- `distance_cm`

And show it on the stage (the variable’s checkbox).

### 2.2 Read the sensor in a loop

![mBlock Live mode: the distance_cm variable changing](/images/illustrations/mblock-bluetooth-erreurs-frequentes-depannage.webp)

The idea: continuously, you set `distance_cm` to the value returned by the sensor.

Pseudo-logic:

```text
when green flag clicked (or in Live mode)
  forever
    set distance_cm to (ultrasonic sensor distance in cm)
    wait 0.1 s
```

### 2.3 Live vs upload: which one here?

- **Live mode**: ideal for this first test, because you see the value immediately.
- **Upload**: you will use it mainly when you want the robot to “live on its own.”

---

## 3) Mini diagnosis if it does not work

- **The value stays at 0 / does not move**: check that the right **mBot device** is selected (orange blocks), and that the robot is **connected** (USB is the better choice while you troubleshoot).
- **Values that jump**: increase `wait` (for example 0.2 s), and test with a **flat** obstacle.
- **Always very large**: the obstacle may be too far or too tilted.

---

## 4) Block list (simple solution)

Exact names vary a little with your mBlock version, but the minimum solution uses:

- **Events**: `when green flag clicked` *(or an equivalent Live trigger)*
- **Control**: `forever`
- **Variables**: `set [distance_cm] to (...)`
- **mBot sensor**: a block like `ultrasonic sensor distance in cm`
- **Control**: `wait (0.1) seconds`

---

## Next step

In the next activity, you turn `distance_cm` into a **parking radar**: the closer you are, the faster the robot “beeps.”

[Next episode →](/en/mbot-ultrasonic-2-distance-bands/)

## FAQ

**Why USB rather than Bluetooth at the start?**  
**USB** (a cable) avoids radio problems while you learn to read the sensor. See [mBlock Bluetooth troubleshooting](/en/mblock-bluetooth-troubleshooting/) after that.

**Which unit does mBlock use?**  
Usually **centimeters (cm)** on the mBot ultrasonic block.

**The reading jumps: what should I do?**  
Test a **flat** obstacle, keep hands away from the sensor, and increase the `wait` in the loop.

![mBot2 view with sensors](/images/products/mbot2.webp)
