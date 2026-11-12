---
layout: ../../layouts/EnPost.astro
title: "mBot activity: intrusion detector"
description: "Intrusion detector with mBot: ultrasonic watches a threshold; LEDs and buzzer alert. Variables and conditions."
updated: "30 October 2026"
---

Some links on this page are affiliate links. If you buy through them, we may earn a commission at no extra cost to you.

You are going to turn your **mBot** into a small “guard”:

- It **watches** what is in front of it (with the **ultrasonic sensor**).
- If something moves and “enters” the zone, it triggers an **alert**:
  - **red** LEDs
  - an “unhappy” face on the **LED matrix**
  - a **beep**
- And in the improved version, it **counts** how many intrusions occurred.

## 1. Prerequisites

Before you start, make sure you have:

- An [educational mBot robot (Makeblock)](/en/mbot-my-first-educational-robot/).
- [mBlock 5 installed](/en/install-mblock-5-windows/).
- A first look at the [mBlock 5 interface](/en/first-steps-mblock-5/) (where the blocks are, the script area, the Device tab).
- The [mBot instruction blocks](/en/install-mbot-blocks/) (the **orange** blocks).

**Tip**: to avoid connection trouble, start on **USB** if you can (Bluetooth works, but can be fussier).

**Classroom note**: lower the buzzer volume or use **LEDs only** in quiet rooms (library, exam corridor). A full beep every loop is harsh for neighbours.

## 2. Ultrasonic sensor

The **ultrasonic sensor** measures a **distance**.

### How it works (simple version)

The sensor behaves like a bat:

- It **sends** a short “ping” (an ultrasonic pulse, inaudible).
- It **listens** for the echo that bounces back from an obstacle.
- It computes distance from the **time** between “ping” and “echo”.

```text
mBot (sensor)                          obstacle
  ping  ───────────────────────────────►
        ◄──────────────────────────────  echo
```

### A bit of physics: why sound can measure distance

Sound travels through air at a finite speed: in practice we often use **about 340 m/s** (closer to **~343 m/s at 20 °C**; the exact value depends a little on **temperature** and **humidity**).

On a cosmic scale, 340 m/s is **huge** for a human (like an airliner). On the scale of a **small robot** a few tens of centimetres from an obstacle, it is on the contrary **fairly slow** — and luckily so:

- **light** travels almost **300 000 km per second**: to measure a “living-room / classroom” distance, a light-based sensor (laser, very fast infrared) would see a near-zero delay;
- a **sound wave**, by contrast, takes a **measurable time** for the **round trip**. That delay (a few **microseconds** or milliseconds) is what the sensor board times with an electronic stopwatch.

**Round-trip formula.** If `t` is the time between emitting the ping and receiving the echo, the distance `d` to the obstacle is:

`d = (v_sound × t) / 2`

The **÷2** is because `t` counts the **outbound + return** path: the wave travels **twice** the distance `d`.

**Order-of-magnitude example.** For an obstacle at **34 cm** (0.34 m), the round trip is **0.68 m**; with `v_sound ≈ 340 m/s`, the delay is about `0.68 / 340 ≈ 0.002 s`, i.e. **2 ms**. That is short for us, but **plenty** for an electronic chip — hence the “few centimetres” precision of common ultrasonic sensors.

### Practical tips (for stable readings)

- The sensor usually works well between **~3 cm and ~400 cm**.
- For tests, use a **flat** obstacle (book, box), squarely in front.
- If the obstacle is **soft** (curtain) or **angled**, the reading can “jump”.

In this activity we are not chasing millimetre-perfect measurement: we mainly want to detect a **change** (something appeared / moved).

## 3. Intrusion-detection program

### 3.1 Basic program

**Goal**: the robot stores a “reference” distance at the start, then compares in a loop.  
If it changes a lot, it shouts “intrusion!”.

#### The idea

1. Place the mBot so it faces the zone to watch.
2. It waits 3 seconds (time to set it down).
3. It measures a first distance: that is the **reference**.
4. Then it measures in a loop:
   - if it is almost the same → it stays calm
   - if it is very different → it triggers the alert

### Illustrations (screenshots)

![mBot facing a clear zone in standby: green LEDs, calm matrix face, ultrasonic sensor toward the watched area](/capture/activite-mbot-detecteur-dintrusion/robot-mbot-attente-detection.png)

![mBot reacting to an intrusion: red LEDs, alert face on the LED matrix, person or object in the ultrasonic beam](/capture/activite-mbot-detecteur-dintrusion/robot-mbot-detectant-intrusion.png)

![mBlock 5 basic intrusion script: wait 3 s, set reference distance, forever loop comparing current reading to reference](/capture/activite-mbot-detecteur-dintrusion/programme-detection-basique.png)

#### Why wait 3 seconds at the start?

To give you time to:

- power on the robot,
- place it squarely facing the zone,
- keep your hands out of the sensor while it takes the reference.

#### Variables (plain words)

- `reference`: the “normal” distance at the start.
- `current_reading`: the distance measured now (in older French worksheets you may still see `mesure` — same meaning).

### 3.1 bis Writing the program (mBlock 5) — very guided version

**Create under Variables**:

| Variable | What it is for |
|---|---|
| `reference` | Starting distance (cm) |
| `current_reading` | Current distance (cm) |
| `intrusions` | Counter (for version 3.2) |

**Basic program (simple detection)**:

1. **When the green flag is clicked** *(or “when mBot starts” if you upload)*  
2. **Wait 3 seconds**  
3. **Set `reference` to** the `ultrasonic distance (cm)`  
4. **Forever**:
   - set `current_reading` to the `ultrasonic distance (cm)`
   - **if** `current_reading` is very different from `reference` **then**:
     - **red** LEDs
     - “angry” face
     - play a note (beep) **0.25 beat**
   - **else**:
     - **green** LEDs
     - “calm” face

#### The trick that changes everything (very important)

The sensor can vary a little even when nobody walks by.  
So instead of “≠”, use a **threshold**, for example **3 cm**:

```text
if |current_reading - reference| > 3 then intrusion
```

That way a small measurement “jitter” does not trip the alarm.

> If you do not have an “absolute value” block, you can use a simpler test:  
> “intrusion if `current_reading > reference + 3` OR `current_reading < reference - 3`”.

## 3.2 Adding a feature

The basic program works, but one thing is missing:  
**how many times** did someone pass?

So we will:

- create (or use) the variable `intrusions`,
- increment it on each intrusion,
- show the number on the LED matrix (or scroll it).

![mBlock script with intrusion counter: intrusions variable increments and shows on the LED matrix](/capture/activite-mbot-detecteur-dintrusion/programme-detection-compteur-intrusion.png)

#### What to add in the blocks (simple version)

- At the start: **set `intrusions` to 0**
- In the “intrusion” branch:
  - **change `intrusions` by 1**
  - display `intrusions` on the LED matrix

> Tip: to avoid counting the same intrusion 20 times (when someone stays in front), add a `wait 1 second` after the alert.

### 3.3 Refactoring

When the script grows, it becomes hard to read.

So we tidy actions into “small functions” (in mBlock: **My Blocks**).

**Goal**: keep the main program short and clear.

![mBlock script refactored with My Blocks: Standby state and Intrusion alert custom blocks](/capture/activite-mbot-detecteur-dintrusion/programme-detection-compteur-intrusion-sous-programme.png)

#### Suggested split (very simple)

- **Custom block “Standby state”**:
  - green LEDs
  - calm face
  - *(teaching option)* a `nbr_intrusion` parameter to show the counter even in standby — see the details below
- **Custom block “Intrusion alert”**:
  - red LEDs
  - angry face
  - beep
  - `intrusions = intrusions + 1`
  - show the counter

Then, in the loop, you simply:

- if intrusion → call **Intrusion alert**
- else → call **Standby state**

<details>
<summary><strong>Optional teaching note: variable scope and <code>nbr_intrusion</code></strong> (secondary / Arduino bridge)</summary>

For teaching, the custom block **“Standby state”** can take a **parameter** like `nbr_intrusion`, even though it is **not strictly required**.

In mBlock / Scratch, `intrusions` is usually a **global** variable: once created under *Variables*, the whole program (including inside a custom block) can read and change it without passing it as an argument.

**Scope** means **where in the program a variable exists and is visible**.

- **Global variable**: known everywhere in the project. That is often the case for `intrusions`.
- **Local variable / parameter**: visible only inside a function or custom block.

So **Standby state** *could* use `intrusions` directly. Adding `nbr_intrusion` shows the idea of a **function that receives information** (like \(f(x)\)) and prepares languages where we pass values explicitly instead of relying on globals. In generated **C** (Arduino), that appears as functions with parameters — see also [Arduino C functions](/en/arduino-c-functions-best-practices/).

![C code excerpt: global intrusions variable and nbr_intrusion parameter of the Standby custom block](/capture/activite-mbot-detecteur-dintrusion/code-c-portee-variable.png)

</details>

## 3.4 Display optimisation

One last detail: sometimes the counter shows with **decimals** (e.g. `3.00`).  
For an intrusion counter we want a **whole number**: `1`, `2`, `3`…

### Option 1 (recommended for younger learners): stay in blocks

In many mBlock versions, if you use “change `intrusions` by 1” and display it as-is, it already shows cleanly.

### Option 2 (advanced): go through Arduino code (if needed)

If yours shows decimals, you can fix it on the code side.

1. Click the </> symbol  
2. Copy the displayed source (CTRL + A then CTRL + C)  
3. Open the Arduino C tab  
4. Paste the code  
5. Change the type of `intrusions` from `float` to `int`

> Do this with an adult / teacher if you are young: you are editing “text” code.

### 3.5 mBlock programs (reference, version 3.2 style)

You can download the activity’s mBlock programs (open in **mBlock 5**; rename variables to `current_reading` if you prefer English identifiers):

- Basic program: [`programme_detection_basique.mblock`](/capture/activite-mbot-detecteur-dintrusion/programme_detection_basique.mblock)
- Counter version (3.2): [`programme_detection_compteur intrusion.mblock`](/capture/activite-mbot-detecteur-dintrusion/programme_detection_compteur%20intrusion.mblock)
- “Subroutines” version: [`programme_detection_compteur_intrusion_sous_programme.mblock`](/capture/activite-mbot-detecteur-dintrusion/programme_detection_compteur_intrusion_sous_programme.mblock)

If you prefer to rebuild by hand, follow:

- section **3.1 bis** (basic program),
- then the additions in **3.2** and **3.3**,
- using the screenshots as a guide.

See also: [mBlock programs](/programmes/) (French index).

## 4. Learning to develop

If you want to progress, here is an easy path:

- redo this activity changing only one parameter (threshold 3 cm → 5 cm),
- add an “orange” LED when the obstacle is “in between”,
- then move on to other mBot activities on the site (sensors, motors, small challenges).

And if you want to go further in programming, Scratch/mBlock are a very good doorway: the key is understanding **variables + conditions + loops**.

**For the classroom**: our [10 free mBot classroom projects](/en/10-free-mbot-classroom-projects/) offer a full 10-session progression, with pupil sheets and answer keys in PDF.

[mBot — Amazon UK](https://www.amazon.co.uk/dp/B07XR98YYQ?tag=roboteducatif-21) · [Amazon.com](https://www.amazon.com/dp/B07XR98YYQ?tag=roboteducatif-20)
