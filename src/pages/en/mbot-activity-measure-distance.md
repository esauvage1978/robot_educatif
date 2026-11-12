---
layout: ../../layouts/EnPost.astro
title: "mBot activity: measure distances (ultrasonic sensor)"
description: "Beginner mBlock tutorial: read the mBot ultrasonic sensor in Live mode, show distance on the LED matrix with join blocks. Upload steps, checks, troubleshooting."
updated: "31 October 2026"
schemaUpdated: "2026-10-31"
faqSchema:
  - question: "How do I read the mBot ultrasonic distance in mBlock?"
    answer: "Create a variable, connect the mBot, enable Live mode, then in a forever loop set the variable to the mBot ultrasonic block reading. The value shows in centimetres near the sprite."
  - question: "Why will the LED matrix not take the distance number directly?"
    answer: "The sensor returns a number; the text scroll block expects a string. Join the distance and unit, for example join(distance, \" cm\")."
  - question: "Live mode or Upload mode for this activity?"
    answer: "Live mode shows the variable on the PC. To display distance without the USB cable, build the block program and upload in Upload mode."
  - question: "The reading shows 0 or jumps wildly — what should I check?"
    answer: "Keep the obstacle between about 3 cm and 400 cm, point at a flat surface, check USB or upload, and confirm mBot blocks are installed."
---

Some links on this page are affiliate links (**Amazon UK** is the default shop for this `/en/` guide; **Amazon.com** is listed below for US readers). We may earn a commission on qualifying purchases, at no extra cost to you.

> **Direct answer (October 2026)** — In **mBlock 5** (Makeblock’s block software, similar to **Scratch**), read the mBot **ultrasonic sensor** into a **variable** in **Live** mode (real time with the PC, without uploading on every click), then show the same distance on the **LED matrix** by turning the **number** into text (**join** + `" cm"`) and **uploading** the program for a cable-free robot.

This **two-part** activity guides you to:

1. **Read the distance** from the <a href="/go/az-gb-b5d4d0b7cd/" rel="sponsored nofollow noopener" class="affiliate-link">Makeblock mBot</a> **ultrasonic sensor** and see it **on the computer** (variable + **Live** mode);
2. **Display that distance on the LED matrix** **without the cable** (program **stored on the robot**), handling **number → text**.

Exact block labels may vary with the **mBlock version** and **interface language**; the **logical sequence** stays the same.

<figure class="article-figure">
  <img src="/capture/activite-mbot-detecteur-dintrusion/robot-mbot-detectant-intrusion.png" alt="Front view of the Makeblock mBot with ultrasonic sensor and LED matrix on the mCore board." width="960" height="540" loading="eager" decoding="async" />
  <figcaption>On the classic mBot the ultrasonic sensor is usually at the front; the LED matrix shows messages or values. Photo: Emmanuel Sauvage, Educational Robotics — October 2026.</figcaption>
</figure>

<aside class="article-callout" role="note">
<p><strong>Classic mBot or mBot2?</strong></p>
<p>This tutorial targets the <strong>mBot with mCore board</strong> and the common RJ25 ultrasonic module. The <strong>mBot2</strong> uses mBuild blocks; the ideas (variable, Live, join, matrix) are similar. Before buying, read our <a href="/en/mbot-vs-mbot2/">mBot vs mBot2 comparison</a>.</p>
</aside>

<aside class="article-callout" role="note">
<p><strong>Live and Upload — two modes to know</strong></p>
<ol>
<li><strong>Live</strong> mode: your script talks to the robot <strong>in real time</strong> from the PC — best to watch the distance variable on screen.</li>
<li><strong>Upload</strong> mode: the program is <strong>saved on the mBot board</strong>; after unplugging USB, the LED matrix can show distance on its own.</li>
<li>Build and test the Live part first, then adapt the script for <strong>when mBot starts</strong> in Upload (see <a href="/en/first-steps-mblock-5/">first steps in mBlock</a> if menus differ).</li>
</ol>
</aside>

| Criterion | Detail |
| --- | --- |
| **Level** | Beginner (variables, sensor); optional C part: intermediate |
| **Time** | About 45–75 minutes (Live + matrix + tests) |
| **Hardware** | Charged mBot, PC, USB cable (Bluetooth optional) |
| **Software** | <a href="/en/install-mblock-5-windows/">mBlock 5</a>, <a href="/en/install-mbot-blocks/">mBot blocks enabled</a> |
| **Success check** | Distance in cm on the PC, then about **`42 cm`** scrolling on the matrix |

<aside class="article-callout" role="note">
<p><strong>For class (secondary)</strong></p>
<p>In one session you can show a <strong>real physical measurement</strong> (distance), <strong>visual feedback</strong> on the mBlock screen, then the same idea with an <strong>autonomous program on the robot</strong> — ideal for sensors, variables, data types and programs that run without a computer.</p>
</aside>

> **Video** — *mBot activity: measuring distances* (French voice-over): [YouTube — step-by-step demo](https://www.youtube.com/watch?v=1smaSvnB7Aw). Turn on **auto subtitles** (YouTube → “CC”) if you prefer reading steps during the demo.

## Hardware and software

- [mBot overview](/en/mbot-my-first-educational-robot/) · [Install mBlock 5](/en/install-mblock-5-windows/) · [First steps](/en/first-steps-mblock-5/) · [mBot blocks](/en/install-mbot-blocks/) · [mBlock vs Scratch](/en/mblock-vs-scratch/)

## 1. Prerequisites

- An [mBot educational robot (Makeblock)](/en/mbot-my-first-educational-robot/).
- [Install mBlock 5](/en/install-mblock-5-windows/) and know the [mBlock 5 interface](/en/first-steps-mblock-5/) (stage, sprites, device, script area).
- [Install / enable mBot blocks](/en/install-mbot-blocks/) to see sensors and the LED matrix.
- Know how to [upload a first program](/en/first-mbot-program/) (**Upload** mode).
- Have followed, or do in parallel, the [scroll text activity](/en/mbot-activity-scroll-text/) on the matrix: you will reuse the same idea for a scrolling **string**.

## 2. The ultrasonic sensor: useful reminder

The **ultrasonic** module measures **distance** by emitting a sound wave and measuring the return time after reflection on an obstacle. On the classic mBot it is usually **at the front**; point the robot at what you want to “see”.

- **Usual range** (manufacturer docs / blocks): often **about 3 cm to 400 cm** — too close or too far, the reading becomes **unreliable** or missing.
- **Uses**: obstacle avoidance, wall following, [intrusion detector](/en/mbot-activity-intrusion-detector/), “stop” game at a given distance, etc.

The speed of sound is used in the board-side calculation; for the activity, the key point is that the block value is in **centimetres (cm)** (check the unit shown in mBlock).

## 3. Part one: distance on screen (Live mode)

**Goal**: a **variable** (e.g. `data` or `distance`) takes the sensor value in a loop; you see it **in the sprite area** on the PC.

1. Create a **variable** and tick display on the stage if mBlock offers it.
2. Connect the mBot (USB or **Bluetooth** — wireless link; see [mBlock Bluetooth help](/en/mblock-bluetooth-troubleshooting/) if the link drops) and switch to **Live** mode — real-time mode where blocks talk to the robot **without** uploading everything on every click.
3. In a **forever** loop, set the variable to the **ultrasonic sensor reading** (block like “distance / ultrasonic sensor” in **mBot** or **Sensors**).
4. A short **wait** (a few tens of ms) avoids saturating the link and stabilises the display.

When you run the script (green flag or Live button depending on version), the variable **updates**: you read the distance in **cm** (as long as the obstacle stays in the valid range).

<figure class="article-figure">
  <img src="/capture/capteur/mblock-capteur-ultrason-variable-lutin.png" alt="mBlock screenshot: loop script that reads the mBot ultrasonic sensor and assigns the value to a variable shown in the sprite area." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Example script: loop → read distance → set variable. mBlock 5 screenshot — Emmanuel Sauvage, Educational Robotics — October 2026.</figcaption>
</figure>

You can also open the sample project [distance_sans_affichage.mblock](/capture/capteur/distance_sans_affichage.mblock) to compare with your script.

**Check without the matrix:** place a sheet about **40 cm** in front of the sensor; the stage variable should show a value near **40**. Say “forty-two centimetres” aloud when it shows **42** — that is the same string you will scroll on the matrix.

## 4. Part two: distance on the LED matrix (standalone)

**Goal**: the robot **alone** shows the distance on the **LED matrix** (often 5×8), ideally with **scrolling** if the number is too long — as in [scroll text on the LED matrix](/en/mbot-activity-scroll-text/).

<figure class="article-figure">
  <img src="/capture/activite-mbot-faire-defiler-un-texte/2.1/photo_affichage_hel.webp" alt="Photo of the mBot showing a word on the LED matrix." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Same LED matrix as for scrolling text: you will display a string like “42 cm”. Photo: Emmanuel Sauvage, Educational Robotics — October 2026.</figcaption>
</figure>

### 4.1 The problem: number vs text

The **text scroll** block usually expects a **string** (text), for example `"42 cm"`.  
The sensor returns a **number** (**integer or decimal**). These are not the same “type”: in Scratch / mBlock you must **convert** or **join** text.

Two common approaches:

### 4.2 Approach A — Blocks only (recommended for beginners)

Stay in the **block** palette — no **Arduino** (text code) tab required.

1. Read the ultrasonic value into a variable (e.g. `distance`).
2. Build a **string** with **join** / **combine**: `join(distance, " cm")` (exact block name depends on the UI language).
3. Pass that string to the same **show / scroll text** pattern used in [scroll text](/en/mbot-activity-scroll-text/).
4. Switch to **Upload** mode so the robot keeps scrolling when the USB cable is removed; use **when mBot starts** as the start event if mBlock offers it.

**Success criterion:** standing about **42 cm** from a wall, the matrix scrolls something like **`42 cm`** (slight sensor noise is normal).

- **Advantage**: everything stays in **blocks** for learners.
- **Drawback**: two procedures if you mix free text and distance — name them (`scroll_distance`, `scroll_message`).

Save the project as `distance_matrix.mblock` before trying Approach B.

### 4.3 Approach B — Via Arduino / C code (optional, secondary+)

Use this only after Approach A works.

mBlock can **generate** code from blocks, then let you edit the **Arduino C** part (button or **Code** tab / `</>` symbol depending on version).

**Typical steps**:

1. Build the program **in blocks** (loop, sensor read, call to scroll).
2. Open the **code** view (`</>` icon or equivalent menu), **select all** and **copy**.
3. Switch to the **Arduino** tab, **paste** then **adapt** the scroll function call to **concatenate** number and unit into a **string**.

```cpp
// scroll_text_… (may appear as defilement_texte_… if mBlock UI was French)
scroll_text_N_N(String(distance) + String(" cm"), 1);
```

Here, `distance` holds the centimetre reading; you form a **string** like `"37 cm"` before the call.

**Safety**: editing C code means **re-uploading** to the board and checking **cable / batteries**. Make a **copy** of the `.mblock` project before changing generated code.

## 5. Extension ideas

- **Filter** outlier values (0, too large) before display.
- **Threshold**: show a different symbol or colour if distance drops below a given cm — see the [intrusion detector activity](/en/mbot-activity-intrusion-detector/).
- Continue with the [ultrasonic sensor series episode 1 (French page, same block logic)](/serie-capteur-ultrason-mbot-1-mesurer-distance/), [one-hour project ideas](/en/mbot-one-hour-project-ideas/) or [blink the RGB LEDs](/en/mbot-activity-blink-leds/).

## 6. Checks and troubleshooting

| Issue | Common cause | What to do |
|-------|----------------|------------|
| Variable frozen or missing | Live mode off or mBot disconnected | Reconnect USB, select **mBot**, restart Live |
| Reading **0** or huge | Obstacle out of range or angled surface | Flat surface at 10–200 cm; avoid absorbent fabric |
| Unstable Bluetooth | Range or low battery | Prefer USB in class; see [mBlock Bluetooth help](/en/mblock-bluetooth-troubleshooting/) |
| Blank matrix after unplugging | Program not uploaded | Use **Upload** again; **when mBot starts** event if offered |
| Sensor blocks missing | mBot library off | [Install mBot blocks](/en/install-mbot-blocks/) |
| Type error on scroll | Number instead of string | **Join** block + `" cm"` before matrix block |
| Value jumps by several cm | Angled obstacle or hand in front of sensor | Flat surface; keep hands out of the beam |

## FAQ

### How do I read the ultrasonic distance in mBlock?

Variable + loop + ultrasonic block in **Live** mode with the variable shown on the stage.

### Why join `" cm"` before the LED matrix?

Scrolling expects **text**; the sensor sends a **number**.

### Live or Upload?

**Live** to test with the PC; **Upload** for a cable-free demo.

## 7. Going further

Continue with the [intrusion detector](/en/mbot-activity-intrusion-detector/) (same sensor family), [blink the LEDs](/en/mbot-activity-blink-leds/), [your first mBot program](/en/first-mbot-program/), and **mBlock** guides in the “Also read” column.

**For class**: our [10 free mBot classroom projects](/en/10-free-mbot-classroom-projects/) offer a full 10-session progression with pupil worksheets and PDF answer keys.

Hardware: <a href="/go/az-gb-b5d4d0b7cd/" rel="sponsored nofollow noopener" class="affiliate-link">mBot on Amazon.co.uk</a> · <a href="/go/az-us-d15f4ee758/" rel="sponsored nofollow noopener" class="affiliate-link">Amazon.com</a> — check today’s price before you order.

*Amazon partner — commission possible on qualifying purchases, at no extra cost to you.*

*Emmanuel Sauvage — updated 31 October 2026.*
