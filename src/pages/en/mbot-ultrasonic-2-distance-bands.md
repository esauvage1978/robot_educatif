---
layout: ../../layouts/EnPost.astro
title: "mBot ultrasonic sensor (2/4): parking radar in bands"
description: "mBot parking radar, part 2: three ultrasonic zones, silence past 70 cm, then a beep every 1 second and every 0.25 seconds in a guided mBlock activity."
updated: "2 November 2026"
faqSchema:
  - question: "The sensor always shows 0 cm. What should I check?"
    answer: "Check the RJ25 plug, move anything stuck against the sensor horns, test in mBlock Live mode, then upload again."
  - question: "The beeps never change rhythm. Why?"
    answer: "Confirm you compare distance_cm with the thresholds 70 and 35, and that each beep branch contains a wait block. Without it, the loop runs too fast."
---

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/categorie/mbot/">mBot activities</a> · Ultrasonic sensor series (2/4)</nav>

> **Direct answer (November 2026)** — With the **ultrasonic sensor** plugged into the mBot **RJ25** port, program **three zones**: beyond **70 cm**, silence; between **35 and 70 cm**, one beep every **1 s**; below **35 cm**, one beep every **0.25 s**. You reuse the `distance_cm` variable from [part 1](/en/mbot-ultrasonic-1-measure-distance/) and add **`wait`** blocks so the rhythm holds.

This lesson is part of the [mBot activities](/categorie/mbot/) hub and the [ultrasonic sensor series](/en/mbot-ultrasonic-1-measure-distance/) (episode 2 of 4). If you are new to mBlock, see [My first mBot robot](/en/mbot-my-first-educational-robot/) and the [mBot vs mBot2 comparison](/en/mbot-vs-mbot2/).

![Makeblock mBot with the ultrasonic sensor on the front port](/images/products/mbot.webp)

*Product photo: the ultrasonic sensor plugs into the ultrasonic connector on the mBot chassis (cable included in the kit).*

![mBlock interface — ultrasonic sensor blocks and conditions](/images/products/mbot2.webp)

*In mBlock 5, find the blocks “ultrasonic sensor distance in cm,” “if … then,” and “play note” in the mBot category.*

<aside class="article-callout" role="note">
<p><strong>Learning goal</strong></p>
<p>Move from “I measure” to “I decide”: turn a distance into a <strong>behavior</strong> with <strong>conditions</strong> and <strong>time</strong> (wait).</p>
</aside>

## The task (3-zone parking radar)

Program the mBot so it behaves like a **parking radar**:

- **If distance ≥ 70 cm**: it does **nothing** (silence).
- **If 35 cm ≤ distance < 70 cm**: it plays a **note** every **1 second**.
- **If 0 cm ≤ distance < 35 cm**: it plays a **note** every **0.25 seconds**.

> Keep this one simple on purpose: the same note, only the **rate** changes. In activity 3, the rate becomes “proportional.”

---

## 1) Decision diagram (copy it on the board)

```text
              distance_cm (ultrasonic sensor)
                         |
        +----------------+-----------------+
        |                                  |
   distance >= 70 ?                    no (so < 70)
        |                                  |
     nothing                           distance >= 35 ?
                                           |        |
                                          yes      no (so < 35)
                                           |        |
                                   beep every      beep every
                                     1 s            0.25 s
```

---

## 2) Build the program step by step

### 2.1 Keep the distance_cm variable

Reuse the variable from activity 1:

- `distance_cm`

And update it in a loop:

- read the ultrasonic sensor
- wait a little (for example 0.05 to 0.2 s)

### 2.2 The trap: “I beep too fast”

If you write:

```text
if distance < 35 then play a note
```

inside a **forever** loop with no pause, the robot will “beep” **as fast as it can** (it can turn into an almost continuous sound).

So here, **time** is part of the brief: you put a different `wait` in each zone.

### 2.3 A simple solution (logic)

Pseudo-logic (easy to turn into blocks):

```text
when started
  forever
    set distance_cm to (ultrasonic distance)
    if distance_cm >= 70
      wait 0.1 s
    else
      if distance_cm >= 35
        play a note (e.g. C4) for 0.25 beats
        wait 1 s
      else
        play a note (e.g. C4) for 0.25 beats
        wait 0.25 s
```

> Why a `wait` in the “nothing” zone? So you do not hammer the sensor at full speed, and so the loop stays stable.

---

## 3) Test (Live mode, then upload)

- **In Live**: slowly bring a book toward the sensor and watch whether the beeps change rhythm around ~70 cm and ~35 cm.
- **On its own**: then upload the program (see [My first mBot program](/en/first-mbot-program/)).

---

## 4) Possible improvements (without changing the task)

- Add an **LED** (green / orange / red) for each zone.
- Filter “impossible” values (for example if the reading is 0 or very large) by showing “—” or by keeping the last known value.

---

## 5) Block list (simple solution)

Typical blocks you need:

- **mBot events**: `when mBot starts` *(for a standalone program)*  
  or `when green flag clicked` *(to test in Live)*
- **Control**: `forever`
- **Variables**: `set [distance_cm] to (...)`
- **mBot sensor**: `ultrasonic sensor distance in cm`
- **Control**: `if ... then` / `else` (nested conditions)
- **Operators**: `>=` (comparisons) + the numbers `70` and `35`
- **mBot sound / buzzer**: `play note (...) for (...) beats` *(or the equivalent buzzer block)*
- **Control**: `wait (1) s` and `wait (0.25) s` (plus `wait (0.1) s` on the silent side)

---

## Next step

In activity 3, you keep the radar idea, but instead of 2 fixed rates (1 s / 0.25 s), you make a **rate that depends on the distance**: the closer you are, the faster it beeps.

## Quick FAQ

**The sensor always shows 0 cm** — Check the RJ25 connection, move obstacles stuck against the “horns,” test in [mBlock Live](/en/mblock-bluetooth-troubleshooting/), then upload again.

**The beeps never change rhythm** — Check that you really compare `distance_cm` with the thresholds **70** and **35**, and that each “beep” branch contains a **`wait`** block (otherwise the loop runs too fast).

**mBot or mBot2?** — The activity works on both with the Makeblock ultrasonic sensor; see [mBot vs mBot2](/en/mbot-vs-mbot2/).

**Rest of the series** — [One-hour mBot activities](/en/mbot-one-hour-project-ideas/) for more challenges once the four ultrasonic episodes are done.

[← Previous episode](/en/mbot-ultrasonic-1-measure-distance/) · [Next episode →](/en/mbot-ultrasonic-3-parking-sensor/)
