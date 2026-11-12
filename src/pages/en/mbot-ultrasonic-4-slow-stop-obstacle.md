---
layout: ../../layouts/EnPost.astro
title: "mBot ultrasonic sensor (4/4): slow down and stop at an obstacle"
description: "mBlock tutorial (4/4): the mBot drives, slows down and stops before a flat obstacle — cm thresholds, motor speed, USB upload tests."
updated: "31 October 2026"
faqSchema:
  - question: "Do I need Arduino code or mBlock blocks?"
    answer: "mBlock / mBot blocks only. Stack events, ultrasonic sensor, conditions and motors. No Arduino sketch is required for this activity."
  - question: "What does the mBot ultrasonic sensor measure?"
    answer: "The distance in centimetres to an obstacle in front of the robot. Your program turns that value into motor speed using the thresholds you set."
  - question: "Does the mBot2 work with this tutorial?"
    answer: "Yes, if mBot blocks are enabled and the front ultrasonic module is connected. Use the same cm thresholds as a starting point and tune them on your floor."
---

Some links on this page are affiliate links. If you buy through them, we may earn a commission at no extra cost to you.

> **Direct answer (October 2026)** — In **mBlock 5** (Makeblock’s block software, close to **Scratch**), read the **ultrasonic distance** in **cm** (centimetres), compute a **motor speed** between two thresholds (e.g. stop at 15 cm, full speed beyond 50 cm), and set **left and right motors** to the same speed. **Upload** over **USB** (data cable from PC to the board), place a **flat book** in front: the robot should **slow down** then **stop** without hitting it. No **Arduino** text code is required.

You are finishing the **ultrasonic sensor** track on the [Makeblock mBot educational robot](/en/mbot-my-first-educational-robot/): the front module that measures distance in centimetres. Goal: the robot **drives**, **slows down** as an obstacle approaches, then **stops**. Everything runs in **mBlock** with **mBot blocks**.

<aside class="article-callout" role="note">
<p><strong>Learning goal</strong></p>
<p>Build a full robot behaviour in <strong>mBlock blocks</strong>: a measurement (distance) drives motor speed, with <strong>thresholds</strong> and a smooth progression (slow down → stop).</p>
</aside>

<aside class="article-callout" role="note">
<p><strong>Before you start</strong></p>
<ul>
<li>Be comfortable reading the ultrasonic sensor — complete <a href="/en/mbot-activity-measure-distance/">measure distances</a> and the <a href="/en/mbot-activity-intrusion-detector/">intrusion detector</a> first (same sensor family, full steps in English).</li>
<li>Optional extra depth (French pages, same block logic): <a href="/serie-capteur-ultrason-mbot-1-mesurer-distance/">series episode 1 — measure</a>, <a href="/serie-capteur-ultrason-mbot-2-radar-recul-paliers/">episode 2 — speed steps</a>, <a href="/serie-capteur-ultrason-mbot-3-radar-recul-cadence-distance/">episode 3 — beeping radar</a>.</li>
<li><a href="/en/install-mblock-5-windows/">mBlock 5 installed</a>, <a href="/en/install-mbot-blocks/">mBot blocks enabled</a>, charged batteries, flat obstacle.</li>
<li>Know how to <a href="/en/first-mbot-program/">upload a program</a> to the board (Upload mode, not Live only).</li>
</ul>
<p>This walkthrough targets the <strong>classic mBot</strong> (mCore board). The <strong>mBot2</strong> works too when the ultrasonic module is fitted and recognised in mBlock.</p>
</aside>

| Item | Detail |
|---|---|
| **Level** | Intermediate (loop, conditions, simple formula) |
| **Time** | About 45–75 minutes |
| **Hardware** | mBot with front ultrasonic sensor, PC, USB cable, flat obstacle |
| **Software** | mBlock 5, Device mode → mBot, then Upload |
| **Success check** | Fast above ~50 cm, slower between 50 and 15 cm, full stop near 15 cm |

## Brief

With mBot blocks in mBlock, program the robot so that it:

1. **Drives straight ahead**.
2. **Plays sounds** while moving (beeps) to show it is “watching”.
3. **Slows down** if there is an obstacle ahead.
4. **Stops** if the obstacle is too close.

We want a **smooth** progression, not only “go / stop”. Speed is computed from distance.

---

## 1) Reference distances

Start with:

- `DIST_STOP = 15` cm (below: stop)
- `DIST_SLOW = 50` cm (beyond: normal speed)

Between 15 and 50 cm, speed decreases gradually.

### Speed zones

| Distance in front of the sensor | mBot behaviour |
|----------------------------------|----------------|
| **≥ 50 cm** | Normal speed (e.g. 80 %) |
| **Between 15 and 50 cm** | Progressive slowdown |
| **≤ 15 cm** | Stop (speed 0) |

<figure class="article-figure">
  <img src="/capture/activite-mbot-detecteur-dintrusion/robot-mbot-detectant-intrusion.png" alt="Makeblock mBot facing a flat obstacle; the front ultrasonic sensor measures distance in centimetres." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Flat obstacle test: aim the ultrasonic module straight at the surface. Photo: Emmanuel Sauvage, Robot Éducatif — October 2026.</figcaption>
</figure>

---

## 2) Build the logic

Suggested variables:

- `distance_cm`
- `speed` (0 to 100)

### 2.1 Update distance continuously

As in [measure distances](/en/mbot-activity-measure-distance/):

- read the ultrasonic sensor inside a **forever** loop ;
- add a short `wait` after each read.

<figure class="article-figure">
  <img src="/capture/capteur/mblock-capteur-ultrason-variable-lutin.png" alt="mBlock screenshot: loop reading the mBot ultrasonic sensor into a distance variable." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>mBlock example: store ultrasonic distance in a variable (same idea as episode 1). Screenshot: Emmanuel Sauvage, Robot Éducatif — October 2026. Block labels depend on mBlock language; the logic stays the same.</figcaption>
</figure>

### 2.2 Speed that drops as you approach

Example speeds:

- `SPEED_MAX = 80`
- `SPEED_MIN = 30` (still moving, but slow)

Rules:

- if `distance_cm >= 50` → `speed = 80`
- if `distance_cm <= 15` → `speed = 0`
- else → intermediate speed (30–80)

#### Linear teaching formula

Between 15 and 50 cm:

`speed = SPEED_MIN + (distance_cm - 15) × (SPEED_MAX - SPEED_MIN) / (50 - 15)`

(denominator **35**.)

Prefer steps instead? Use 3–4 speed **steps** like in [episode 2 (French)](/serie-capteur-ultrason-mbot-2-radar-recul-paliers/) — here we target smooth slowdown.

---

## 3) Drive straight

Straight ahead = **same speed** on left and right motors (or a “move forward” block).

Global pseudo-logic:

```text
on start
  forever
    set distance_cm to (ultrasonic distance)

    if distance_cm <= 15
      set speed to 0
      stop motors
      play long low note / beep
      wait 0.1 s
    else
      if distance_cm >= 50
        set speed to 80
      else
        set speed using formula (between SPEED_MIN and SPEED_MAX)

      move forward (left motor = speed, right motor = speed)
      play short beep
      wait 0.5 s (or shorter when slowing)
```

### 3.1 Sounds

- short beep every 0.5 s when driving normally ;
- faster beeps when slowing (optional, links to [episode 3 cadence (French)](/serie-capteur-ultrason-mbot-3-radar-recul-cadence-distance/)) ;
- different sound when stopped.

Keep it readable: play note, then `wait`.

---

## 4) Tests that work on the floor

- Start on **USB**, then **upload** the program to the board.
- Use a **flat** obstacle (book), sensor facing it squarely.
- If the robot **jitters** (go / stop / go):
  - raise `DIST_STOP` to 18 cm ;
  - add `wait 0.05 s` after the sensor read ;
  - keep `SPEED_MIN` around 30–40 instead of 10.

**Success:** at ~40 cm it moves fast; near 25 cm you hear or see slowdown; near 15 cm it stops without a bump.

---

## 5) Block checklist

- **mBot event**: when mBot starts
- **Control**: forever, if / else, wait
- **Variables**: set `distance_cm`, set `speed`
- **Sensor**: ultrasonic distance in cm
- **Operators**: `<=`, `>=`, `+`, `-`, `*`, `/`
- **Motors**: set speeds or move forward / stop
- **Sound**: play note for beats

Stuck on mBlock? See [first steps with mBlock 5](/en/first-steps-mblock-5/) or [Bluetooth troubleshooting](/en/mblock-bluetooth-troubleshooting/).

---

## Troubleshooting

| Symptom | Likely cause | What to try |
|---------|--------------|-------------|
| Distance stuck at **0** or **400+** | Obstacle too close/far, or tilted / soft surface | Flat target 20–80 cm away; sensor perpendicular |
| No slowdown | Speed not wired to both motors | Check left **and** right motor blocks use `speed` |
| **Stuttering** near obstacle | Stop threshold too low | `DIST_STOP` → 18 cm; small wait after sensor |
| No beeps | Buzzer block missing or volume | Test a single “play note” before the loop |
| Robot not found in mBlock | USB/charge-only cable or wrong mode | [First upload guide](/en/first-mbot-program/) |

Before buying a spare sensor, check the front **RJ25** port (Makeblock colour-coded connector) — see [mBot accessories: where to start](/en/mbot-accessories-where-to-start/) if your kit is incomplete.

---

## Going further

- LED colour by distance (green / orange / red).
- “Parking assist”: reverse slowly then stop if too close.
- Compare [mBlock and Scratch](/en/mblock-vs-scratch/) for classroom software choices.

---

## FAQ

### Do I need Arduino code or mBlock blocks?

**mBlock / mBot blocks only.** No Arduino sketch is required for this session.

### What does the ultrasonic sensor measure?

Distance in **centimetres** to an obstacle ahead. Your thresholds turn that into **motor speed**.

### Does the mBot2 work here?

Yes, with mBot blocks and a working front ultrasonic module. Tune cm thresholds on your own floor.

---

## Hardware (indicative links)

[mBot on Amazon.co.uk](/go/az-gb-b5d4d0b7cd/) · [Amazon.com (US)](/go/az-us-d15f4ee758/) — check today’s price. Amazon partner — commission possible on qualifying purchases, at no extra cost to you.

---

## Series navigation

[← Episode 3 — beeping radar (French)](/serie-capteur-ultrason-mbot-3-radar-recul-cadence-distance/) · [Measure distances (English)](/en/mbot-activity-measure-distance/) · [First mBot program](/en/first-mbot-program/) · [Install mBot blocks](/en/install-mbot-blocks/)

*Emmanuel Sauvage — updated 31 October 2026.*
