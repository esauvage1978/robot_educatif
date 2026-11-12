---
layout: ../../layouts/EnPost.astro
title: "mBot ultrasonic sensor (3/4): a better parking radar"
description: "A better mBot parking radar: beep speed scales with distance. Calculate a wait from centimeters using variables, operators, and a forever loop in mBlock."
updated: "2 November 2026"
faqSchema:
  - question: "Why force the distance up to 10 cm?"
    answer: "So the delay cannot get tiny. At 2 cm, 0.05 times the distance is 0.1 s, which quickly becomes hard to hear as separate beeps and stressful."
  - question: "The beeps are too slow or too fast. What do I change?"
    answer: "If it is too slow, lower the coefficient (for example 0.03 instead of 0.05). If it is too fast when you are close, raise the minimum distance from 10 cm to 15 cm."
---

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/categorie/mbot/">mBot activities</a> · Ultrasonic sensor series (3/4)</nav>

This lesson belongs to the [mBot activities](/categorie/mbot/) and continues the [ultrasonic sensor series](/en/mbot-ultrasonic-1-measure-distance/) (part 3 of 4). If you just finished [part 2 — radar in bands](/en/mbot-ultrasonic-2-distance-bands/), you can reuse the same mBlock blocks.

<aside class="article-callout" role="note">
<p><strong>Learning goal</strong></p>
<p>Move from a “stepped” radar to a “continuous” radar: learn to <strong>calculate</strong> a value (a delay) from a measurement (the distance), then use it in <strong>wait</strong>.</p>
</aside>

## The task

Improve the parking radar:

- The **farther** the obstacle, the **slower** the beeps.
- The **closer** the obstacle, the **faster** the beeps.

Simple constraints so it stays a teaching activity:

- Keep a **silence** zone beyond a certain distance (for example ≥ 70 cm).
- Between 10 cm and 70 cm, calculate a **delay** between beeps.
- Below a minimum distance (for example < 10 cm), cap the delay so the sound does not become “continuous” and so the program stays readable.

> You can reuse the same thresholds as activity 2 (70 cm and 35 cm), but the idea here is to use a formula instead of 2 fixed speeds.

---

## 1) Idea sketch (what you want to hear)

```text
distance (cm) : 70 .............. 50 .............. 35 .............. 20 .............. 10
rate          : silence  beep...beep...beep..beep..beep.beep.beep.beepbeepbeepbeep (faster and faster)
```

---

## 2) Choose a simple rule (a formula)

You want a delay in seconds, for example `delai_s`, that gets smaller as the distance gets smaller.

### Option A (very easy to understand): an “inverse” rule plus bounds

1. Limit the distance to a useful zone:
   - if `distance_cm` > 70, do not beep
   - otherwise, force `distance_cm` to stay between 10 and 70
2. Calculate:

`delai_s = 0.05 × distance_cm`

Examples:

- at 70 cm → `delai_s = 3.5` s (slow)
- at 20 cm → `delai_s = 1` s (faster)
- at 10 cm → `delai_s = 0.5` s (fast)

This is not a “physics” law. It is a **teaching rule** that gives a clear sound effect.

### Option B (more like a “radar”): delay between 0.25 s and 1 s

You may want to stay close to the values from activity 2:

- far → 1 s
- close → 0.25 s

Then you can use a simple (linear) interpolation between 10 and 70 cm:

`delai_s = 0.25 + (distance_cm - 10) × (1 - 0.25) / (70 - 10)`

(that is: `delai_s = 0.25 + (distance_cm - 10) × 0.0125`)

In blocks, that is just a calculation with `+`, `-`, `*`, `/`.  
If the formula feels too “mathy,” start with Option A.

---

## 3) Build the program (simple solution)

![mBlock screenshot: blocks to read the ultrasonic distance and calculate a delay (Option A)](/capture/capteur/mblock-capteur-ultrason-variable-lutin.png)

Suggested variables:

- `distance_cm`
- `delai_s`

Pseudo-logic (Option A):

```text
when started
  forever
    set distance_cm to (ultrasonic distance)

    if distance_cm >= 70
      wait 0.1 s
    else
      if distance_cm < 10
        set distance_cm to 10

      set delai_s to (0.05 * distance_cm)
      play a note (e.g. C4) for 0.25 beats
      wait delai_s
```

Why “force” the distance to 10?

- To avoid a delay that is too small (for example 2 cm → 0.1 s), which quickly becomes unreadable and stressful.

---

## 4) Tests and tuning

- If it is **too slow**: lower the coefficient (for example 0.03 instead of 0.05).
- If it is **too fast** when you are close: raise the minimum distance (10 → 15).
- If the reading jitters: add a small `wait 0.05 s` just after the reading, or average 2 readings (advanced option).

---

## 5) Block list (simple solution)

- **mBot events**: `when mBot starts` *(standalone)* or green flag *(Live)*
- **Control**: `forever`
- **Variables**:
  - `set [distance_cm] to (...)`
  - `set [delai_s] to (...)`
- **mBot sensor**: `ultrasonic sensor distance in cm`
- **Control**: `if ... then` / `else` (2 levels)
- **Operators**:
  - comparisons `>=`, `<`
  - calculations `*`, `+`, `-`, `/` (depending on the formula you chose)
- **mBot sound / buzzer**: `play note (...) for (...) beats`
- **Control**: `wait (delai_s) seconds` + a small `wait (0.1)` on the silent side

---

## Next step

In activity 4, you keep the idea “closer = more alert,” but instead of only beeping, the robot will **drive forward**, then **slow down** gradually, then **stop** if an obstacle is detected.

[← Previous episode](/en/mbot-ultrasonic-2-distance-bands/) · [Next episode →](/en/mbot-ultrasonic-4-slow-stop-obstacle/)
