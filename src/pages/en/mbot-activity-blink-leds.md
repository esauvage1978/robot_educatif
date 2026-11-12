---
layout: ../../layouts/EnPost.astro
title: "mBot program: blink the RGB LEDs (mBlock)"
description: "Three mBlock activities on mBot RGB LEDs: alternate red blink, RGB cycle, and fade with variables. Upload mode, checks, and troubleshooting."
updated: "31 October 2026"
schemaUpdated: "2026-10-31"
faqSchema:
  - question: "How do I make the mBot LEDs blink in mBlock?"
    answer: "In mBlock 5 with the mBot device selected, stack a start event, a loop, RGB LED blocks (red, green, blue from 0 to 255), and wait blocks. Upload in Upload mode if the robot must blink without the USB cable."
  - question: "Why does an LED stay on after my program runs?"
    answer: "An LED does not turn off by itself: you must set colour 0, 0, 0 (off). In activity 1, turn off one side before lighting the other."
  - question: "Live mode or Upload mode for blinking LEDs?"
    answer: "Live mode tests with the PC connected. For a cable-free demo, use Upload mode; the start block is usually when mBot starts instead of the green flag."
  - question: "I cannot find mBot LED blocks — what should I check?"
    answer: "Enable the mBot extension in mBlock (Device → mBot) and follow our install mBot blocks guide. Without the orange mBot blocks you cannot set the RGB LEDs."
---

Some links on this page are affiliate links (Amazon UK for this English edition). If you buy through them, we may earn a commission at no extra cost to you.

> **Direct answer (October 2026)** — In **mBlock 5** (Makeblock’s block software, close to **Scratch**), stack a **start** event, a **loop**, **RGB LED** blocks and **wait** to alternate colours on the **classic mBot**; **upload** in **Upload** mode if the robot must blink **without the USB cable**.

The [Makeblock mBot educational robot](/en/mbot-my-first-educational-robot/) has **two RGB LEDs** on the **mCore** board — the **main control board** of the robot (microcontroller, power and motor/sensor connectors). Each LED is a **light-emitting diode (LED)** that mixes **red, green and blue** (**RGB**: *Red, Green, Blue*). This session offers **three short programs**: alternate red blink, red / green / blue cycle, then a **progressive fade** with a **variable** (a value stored in your script). A good follow-up to [your first mBot program](/en/first-mbot-program/) or our [one-hour project ideas](/en/mbot-one-hour-project-ideas/).

<figure class="article-figure">
  <img src="/images/lot1/mbot-premier-hero.webp" alt="Makeblock classic mBot educational robot, front view, with two RGB LEDs on the mCore board." width="960" height="540" loading="eager" decoding="async" />
  <figcaption>The two RGB LEDs sit on the mCore board, left and right of the centre button. Product photo — Emmanuel Sauvage, Educational Robotics — October 2026.</figcaption>
</figure>

<aside class="article-callout" role="note">
<p><strong>Classic mBot or mBot2?</strong></p>
<p>This tutorial targets the <strong>mBot with mCore board</strong> (the widely used blue kit). The <strong>mBot2</strong> uses a different board and block set in mBlock; RGB ideas are similar but block names may differ. Before buying, read our <a href="/en/mbot-vs-mbot2/">mBot vs mBot2 comparison</a>.</p>
</aside>

<aside class="article-callout" role="note">
<p><strong>Before activity 1 — Upload mode</strong></p>
<ol>
<li>Connect the mBot by <strong>USB</strong>, open mBlock, <strong>Device</strong> mode → <strong>mBot</strong>.</li>
<li>Build activity 1; test in <strong>Live</strong> mode if you like (real time with the PC, cable or Bluetooth).</li>
<li>Switch to <strong>Upload</strong>, use <strong>when mBot starts</strong> as the event if mBlock offers it.</li>
<li>Upload, unplug the cable: blinking should continue on its own (see <a href="/en/first-steps-mblock-5/">first steps in mBlock</a> if menus differ).</li>
</ol>
</aside>

| Criterion | Detail |
| --- | --- |
| **Level** | Beginner (loops, timing); activity 3: intermediate (variable) |
| **Time** | About 30–60 minutes for all three activities |
| **Hardware** | Charged mBot, PC, USB cable |
| **Software** | <a href="/en/install-mblock-5-windows/">mBlock 5</a>, <a href="/en/install-mbot-blocks/">mBot blocks enabled</a> |
| **Success check** | LEDs blink as described; activity 3: smooth colour ramp |

<aside class="article-callout" role="note">
<p><strong>Before you start</strong></p>
<ul>
<li>Know how to open mBlock and select the <strong>mBot</strong> device.</li>
<li>Follow <a href="/en/install-mbot-blocks/">install mBot blocks</a> if LED blocks are missing.</li>
<li>Optional: have <a href="/en/first-mbot-program/">uploaded a first program</a> once.</li>
</ul>
</aside>

## Hardware and software

- [mBot overview](/en/mbot-my-first-educational-robot/) · [Install mBlock 5](/en/install-mblock-5-windows/) · [First steps](/en/first-steps-mblock-5/) · [mBot blocks](/en/install-mbot-blocks/) · [mBlock vs Scratch](/en/mblock-vs-scratch/)

<figure class="article-figure">
  <img src="/images/blog/installer-blocs-mbot/etape-04-palette-blocs-mbot.webp" alt="mBlock 5 screenshot: orange mBot block palette with LED category visible." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>LED blocks live in the orange “mBot” palette once the mBot device is selected. mBlock 5 screenshot — Emmanuel Sauvage, Educational Robotics — October 2026.</figcaption>
</figure>

Each **R**, **G**, **B** value runs from **0 to 255**; **0, 0, 0** means **off**. Do not confuse these **side RGB LEDs** with the **centre LED matrix** (scrolling text): see [scroll text on the matrix](/en/mbot-activity-scroll-text/) if you need text display.

## 1. A little theory

In the [RGB colour model](https://en.wikipedia.org/wiki/RGB_color_model), each component can take a value from **0 to 255**.

Examples: red **255 – 0 – 0**. Green **0 – 255 – 0**. Blue **0 – 0 – 255**. White **255 – 255 – 255**. Off **0 – 0 – 0**.

That gives more than **16 million** colours — exactly **16,777,216**.

## 2. Activity 1: alternate red blink

**Goal:** light the LEDs **alternately left and right in red**, **10 times**. Each LED stays on for **1 second**. Once on, a LED does **not** turn off alone: set **0, 0, 0**.

<figure class="article-figure">
  <img src="/images/lot3/leds-activite1-clignotement.webp" alt="Pedagogical diagram of mBlock blocks for alternate red LED blinking on mBot" width="800" height="450" loading="lazy" decoding="async" />
  <figcaption>Block stack for activity 1 (rebuild in mBlock 5). Diagram — Emmanuel Sauvage, Educational Robotics — October 2026.</figcaption>
</figure>

**Pseudo-code:**

```text
when mBot starts
repeat 10
  left LED red; right LED off
  wait 1 s
  left LED off; right LED red
  wait 1 s
```

**Success criterion:** ten visible cycles, red on the left then on the right, without both staying on.

Save as `blink_leds_1.mblock` (**File → Save as…**).

<figure class="article-figure">
  <img src="/capture/premier_programme/12-televersement.png" alt="mBlock 5 screenshot: upload progress or confirmation after sending the program to the mBot." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>After a successful upload, unplug USB: the robot should blink on its own. mBlock 5 screenshot — Emmanuel Sauvage, Educational Robotics — October 2026.</figcaption>
</figure>

## 3. Activity 2: red, green, blue

**Goal:** show red, then green, then blue on **both** LEDs for **10 cycles**.

<figure class="article-figure">
  <img src="/images/lot3/leds-activite2-rgb.webp" alt="Pedagogical diagram of mBlock blocks for red-green-blue LED cycle" width="800" height="450" loading="lazy" decoding="async" />
  <figcaption>Block stack for activity 2. Diagram — Emmanuel Sauvage, Educational Robotics — October 2026.</figcaption>
</figure>

**Pseudo-code:**

```text
when mBot starts
repeat 10
  both LEDs red → wait 1 s
  both LEDs green → wait 1 s
  both LEDs blue → wait 1 s
```

**Success criterion:** both LEDs cycle red, green, blue ten times with about one second between colours.

Save as `blink_leds_rgb.mblock`. Next steps: [measure distances](/en/mbot-activity-measure-distance/) or an [intrusion detector](/en/mbot-activity-intrusion-detector/) combining LEDs and sensors.

## 4. Activity 3: progressive fade

**Goal:** ramp red, then green, then blue from **0 to 255**. Create a variable (e.g. `intensity`), start at **0**, increase by **1**, show each step for **0.01 s**, up to 255.

- Initialise: **set intensity to 0**
- Increment: **change intensity by 1**

<figure class="article-figure">
  <img src="/images/lot3/leds-activite3-progressif.webp" alt="Pedagogical diagram of progressive LED fade with an intensity variable" width="800" height="450" loading="lazy" decoding="async" />
  <figcaption>Activity 3: a variable ramps colour intensity. Diagram — Emmanuel Sauvage, Educational Robotics — October 2026.</figcaption>
</figure>

**Pseudo-code (red fade — repeat for green and blue):**

```text
set intensity to 0
repeat 255
  change intensity by 1
  left and right LED = (intensity, 0, 0)
  wait 0.01 s
```

Then similar loops with `(0, intensity, 0)` and `(0, 0, intensity)`. Export as `blink_fade_rgb.mblock`.

**Success criterion:** smooth brightness increase on each colour; keep **0.01 s** waits or adjust slightly if the robot feels sluggish.

### Custom block improvement

Avoid copying the same logic three times: create a **custom block** with step size, wait time, and colour index (**0** = red, **1** = green, **2** = blue). Easier to maintain in larger projects such as our [10 free mBot classroom projects](/en/10-free-mbot-classroom-projects/).

To conclude: you **practised** RGB LEDs and used **loops**, **variables**, and optional **custom blocks** in mBlock.

## 5. Checks and troubleshooting

| Issue | Common cause | Fix |
| --- | --- | --- |
| No LED lights up | Not connected or wrong device | Check USB, batteries, **mBot** selected in mBlock |
| One LED stays on | Missing **0, 0, 0** | Add an “off” block after each colour |
| Works in Live, stops after unplug | Not uploaded | Switch to **Upload** and upload again |
| LED blocks missing | mBot library off | <a href="/en/install-mbot-blocks/">Install mBot blocks</a> |
| Blink too fast / slow | Wrong **wait** value | Use **1 second** for activities 1 and 2 |
| Dull or wrong colours | RGB values out of range | Keep each component between **0 and 255** |

If Bluetooth is unreliable in Live, use **USB** while learning — see [mBlock Bluetooth troubleshooting](/en/mblock-bluetooth-troubleshooting/).

## FAQ

### How do I blink the mBot LEDs?

Stack start, loop, **RGB LED** blocks and **wait** in mBlock 5, then upload for standalone behaviour.

### Why does a LED stay on?

Send **0, 0, 0** explicitly; the robot does not clear the previous colour by itself.

### Live or Upload?

**Live** = test with the PC; **Upload** = program stored in the robot for a cable-free demo.

## 6. Going further

- [First mBot program](/en/first-mbot-program/)
- [Measure distances](/en/mbot-activity-measure-distance/)
- [mBlock tutorials](/en/tutorials/)
- [Intrusion detector](/en/mbot-activity-intrusion-detector/)
- [Which mBlock software to choose?](/en/mblock-software-which-to-choose/)

*Emmanuel Sauvage — updated 31 October 2026.*
