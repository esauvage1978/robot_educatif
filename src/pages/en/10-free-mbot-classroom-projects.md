---
layout: ../../layouts/EnPost.astro
title: "10 free mBot classroom projects (PDF worksheets + solutions)"
description: "10 progressive mBot activities for upper primary and lower secondary: duration, skills and challenge for each session, free PDF pupil sheets and mBlock solutions."
updated: "30 October 2026"
---

Some links on this page are affiliate links. If you buy through them, we may earn a commission at no extra cost to you. Check today’s price on Amazon UK or Amazon.com before you buy.

**Makeblock mBot** — ages about 8–12 · Scratch blocks and Arduino · About 15 minutes to assemble · Ideal for class. [Amazon UK](https://www.amazon.co.uk/dp/B07XR98YYQ?tag=roboteducatif-21) · [Amazon.com](https://www.amazon.com/dp/B07XR98YYQ?tag=roboteducatif-20)

> **Direct answer (October 2026)** — This page gathers **10 free mBot activities** for class or home: **15 to 60 min** each, from the first motor program to sensor challenges (reversing radar, line follower, intrusion detector). Each card states **duration**, **skills** and a **challenge** for fast groups. Download the **PDFs** (pupil sheets + mBlock solutions) below; install [mBlock 5](/en/install-mblock-5-windows/) before session 1; plan **1 robot for 2–3 pupils** and rechargeable batteries. Sheets are ready to print or project.

## At a glance

| Project | Concept | Duration |
|--------|--------|-------|
| 1. Make the robot move | Motors, upload | 15–20 min |
| 2. Blink the LEDs | Loops, timing | 20–25 min |
| 3. Move then stop | Sequences | 15–20 min |
| 4. Timed course | Speed, measurement | 30–40 min |
| 5. Obstacle detection | Ultrasonic sensor, IF | 25–30 min |
| 6. Reversing radar | Multiple conditions | 30–35 min |
| 7. Obstacle avoidance | Chaining actions | 35–40 min |
| 8. Line follower | Line sensor | 35–45 min |
| 9. Scrolling message | Display (LED matrix) | 20–25 min |
| 10. Intrusion detector | Several sensors | 45–60 min |

Before the first session, install mBlock on the computers ([mBlock 5 install guide](/en/install-mblock-5-windows/)) and keep our [Bluetooth troubleshooting](/en/mblock-bluetooth-troubleshooting/) handy: that is often where the first session is won or lost.

## Download the activities (PDF)

<div style="margin: 2rem 0; padding: 1.5rem; background: linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%); border: 2px solid #81c784; border-radius: 12px; text-align: center;">
  <h3 style="margin-top: 0; color: #2e7d32;">10 mBot projects for class</h3>
  <p style="margin-bottom: 1.5rem; color: #33691e;">Pupil sheets for all 10 activities: objective, duration, instructions and challenge</p>
  <a 
    href="/downloads/mbot/10-projets-mbot-classe.pdf" 
    download
    style="display: inline-block; padding: 0.75rem 2rem; background: #43a047; color: white; text-decoration: none; font-weight: 700; border-radius: 8px; box-shadow: 0 3px 8px rgba(67,160,71,0.3);"
  >
    Download the full PDF (free)
  </a>
</div>

<div style="margin: 2rem 0; padding: 1.5rem; background: linear-gradient(135deg, #e3f2fd 0%, #e8eaf6 100%); border: 2px solid #64b5f6; border-radius: 12px; text-align: center;">
  <h3 style="margin-top: 0; color: #1565c0;">Solutions with mBlock diagrams</h3>
  <p style="margin-bottom: 1.5rem; color: #283593;">One possible block solution in mBlock for each of the 10 projects</p>
  <a 
    href="/downloads/mbot/corriges-diagrammes.pdf" 
    download
    style="display: inline-block; padding: 0.75rem 2rem; background: #1976d2; color: white; text-decoration: none; font-weight: 700; border-radius: 8px; box-shadow: 0 3px 8px rgba(25,118,210,0.3);"
  >
    Download the solutions (free)
  </a>
</div>

## Why these 10 projects?

These activities mainly suit pupils aged **8 to 12** (upper primary and early secondary). They follow a **progression**: each project introduces **one new idea** while reusing the previous ones, so you can build a sequence of 4 to 6 sessions without reinventing everything.

### Links with the curriculum

The sequence covers what is expected in early programming at primary and in technology at secondary: write a **sequence of instructions**, use a **loop**, a **condition** and **sensors**, then **test and fix** the program. Projects 4 and 8 link well with maths and science (measurement, speed, successive trials).

**Equipment needed**:
- One **mBot** robot per group (1 to 3 pupils)
- A computer with [mBlock 5 installed](/en/install-mblock-5-windows/)
- The USB cable supplied with the mBot
- Rechargeable batteries (recommended)
- For project 8: black tape on a white background (or a printed track)
- For project 9: an LED matrix

No robots yet? Our guide to [choosing a pedagogical robot for school](/robot-pedagogique-ecole/) compares options, and [mBot vs mBot2](/en/mbot-vs-mbot2/) helps you decide between the two models.

## The 10 progressive projects

### Project 1: Make the robot move

**Level**: beginner · **Duration**: 15–20 min · **Prerequisites**: mBlock installed, mBot assembled · **Kit**: mBot, USB, 4× AA or LiPo

**Objective**: Understand the basic motor blocks  
**Skills**: First program, USB upload  
**Expected result**: the robot moves forward/back on an uploaded command (not Live mode only).  
**Quick fix**: robot still → **Upload** vs Live mode; wrong USB port → [first steps in mBlock](/en/first-steps-mblock-5/).  
**Detailed guide**: [first mBot program](/en/first-mbot-program/).

Pupils learn to:
- Open mBlock and connect the mBot
- Use the “move forward” and “move backward” blocks
- Upload the program into the robot
- See the difference between “live” and “upload” mode

**Variant**: Make squares or rectangles by adding turns.

### Project 2: Blink the LEDs

**Objective**: Master loops and timing  
**Duration**: 20–25 minutes  
**Skills**: Loops, wait, RGB LEDs

Full detailed guide in [Blink the mBot LEDs](/en/mbot-activity-blink-leds/).

Pupils discover:
- RGB LED control blocks
- The idea of an infinite loop
- Timing with “wait”
- Custom colours

**Challenge**: Build a traffic light with the right durations.

### Project 3: Move then stop

**Objective**: Sequence actions over time  
**Duration**: 15–20 minutes  
**Skills**: Sequences, stopping motors

A simple but essential program:
1. Move forward for 2 seconds
2. Stop
3. Move backward for 1 second
4. Stop

**Teaching trap**: Many pupils forget the “stop motors” block and the robot runs forever.

### Project 4: Timed course

**Objective**: Adjust speed and time to hit a target  
**Duration**: 30–40 minutes  
**Skills**: Motor speed, measurement, precision

Mark a finish line 1 metre away on the floor. Pupils must:
- Program the mBot to stop exactly on the line
- Try different speeds and durations
- Record results in a table

**Learning**: Link between physics and programming, trial and error.

### Project 5: Basic obstacle detection

**Objective**: Discover the ultrasonic sensor  
**Duration**: 25–30 minutes  
**Skills**: Distance sensor, IF condition

First program with a sensor:
```
Forever
  IF distance < 20 cm THEN
    stop motors
    play a sound
  ELSE
    move forward
```

Full article: [Measure distances with the ultrasonic sensor](/en/mbot-activity-measure-distance/).

### Project 6: Reversing radar

**Level**: intermediate · **Duration**: 30–35 min · **Prerequisites**: projects 1 and 5 · **Kit**: mBot + ultrasonic

**Objective**: Use conditions to adapt behaviour  
**Skills**: Multiple conditions, LEDs as indicators  
**Expected result**: colour and speed change with three distance bands; beep under 15 cm.  
**Quick fix**: only one colour → check IF order (test the closest band first).

A program inspired by cars:
- Distance > 30 cm: green LEDs, move forward
- Distance between 15 and 30 cm: orange LEDs, slow down
- Distance < 15 cm: red LEDs, stop and beep

**Challenge**: add a short reverse when the red band triggers.  
See the full series: [mBot ultrasonic sensor — reversing radar](/serie-capteur-ultrason-mbot-2-radar-recul-paliers/).

### Project 7: Smart obstacle avoidance

**Level**: intermediate · **Duration**: 35–40 min · **Prerequisites**: project 6 · **Kit**: mBot + ultrasonic

**Objective**: Create autonomous behaviour  
**Skills**: Logic, chaining actions  
**Expected result**: robot loops “forward → stop → reverse → turn → resume” without getting stuck against a wall.  
**Quick fix**: endless spin → shorten turn time; never turns → confirm upload mode.

The robot must:
1. Move forward while watching distance
2. If an obstacle is detected: stop
3. Reverse a little
4. Turn right
5. Resume moving forward

**Advanced challenge**: Add a random turn (left or right) to vary paths.

### Project 8: Basic line follower

**Level**: intermediate · **Duration**: 35–45 min · **Prerequisites**: project 1 · **Kit**: mBot + line sensor

**Objective**: Understand the line sensor  
**Skills**: Line-following sensor, real-time corrections  
**Expected result**: robot stays on a black tape loop for at least one full circuit.  
**Quick fix**: zigzag off the line → lower speed; ignores tape → check left/right sensor ports on mCore.

Basic program:
```
Forever
  IF left sensor on black AND right sensor on white
    turn left
  ELSE IF right sensor on black AND left sensor on white
    turn right
  ELSE (both on black or white)
    move straight
```

**Extra materials**: Black tape on a white background (or print a track). **Track template**: print a simple oval or S-curve on A3/A4 white paper and lay black electrical tape along the path (about 15–20 mm wide); keep turns gentle for a first session. Photograph one successful track for the class wall so groups share the same geometry.

### Project 9: Display a scrolling message

**Level**: beginner+ · **Duration**: 20–25 min · **Prerequisites**: project 1 · **Kit**: mBot with LED matrix (or add-on panel)

**Objective**: Use the LED matrix screen (if fitted)  
**Skills**: Display, scrolling text  
**Expected result**: “HELLO” scrolls once; optional distance value updates in a loop.  
**Quick fix**: blank matrix → confirm matrix port / firmware; text cut off → shorten string or wait between scrolls.

Pupils program the mBot to:
- Display scrolling “HELLO”
- Show the measured distance in real time
- Create simple animations (heart, smiley)

**Challenge**: alternate “HELLO” and the live distance every 2 seconds.  
**Note**: Needs an mBot with an LED matrix (or an add-on panel).

### Project 10: Intrusion detector

**Level**: advanced · **Duration**: 45–60 min · **Prerequisites**: projects 5–6 · **Kit**: mBot + ultrasonic (+ matrix optional)

**Objective**: Final project combining several sensors  
**Skills**: Integration, multiple sensors, loops, sounds  
**Expected result**: standby green LEDs; when distance drops below a threshold (e.g. 20 cm or a calibrated reference), red LEDs + beep (+ optional “ALERT” on the matrix); optional intrusion counter.  
**Quick fix**: false alarms → raise the threshold by 2–3 cm; continuous beep → add `wait 1 s` after alert.

**Sensors / actuators**: ultrasonic (watch), RGB LEDs (status), buzzer (alarm), LED matrix (optional message).

The robot stays still and watches:
- If someone passes in front (ultrasonic &lt; 20 cm, or relative to a stored reference)
- Trigger an alarm (sound + flashing red LEDs)
- Display “ALERT” on the matrix when available

**Variant**: count intrusions and show the number (see the full activity).  
**Success criteria**: three deliberate walk-bys trigger three clear alerts; walking beside the beam (outside the cone) does not.

Full article: [Intrusion detector with mBot](/en/mbot-activity-intrusion-detector/).

## Classroom tips

### Session organisation

- **Groups of 2–3 pupils** per robot (encourages peer help)
- Always start with a short **demonstration**
- Leave **10 minutes of free testing** after each project
- Prepare **bonus challenges** for the fastest groups

### Common errors

| Error | Solution |
|--------|----------|
| Robot does not react | Check mode (live vs upload) |
| Motors run the wrong way | Swap left/right parameters |
| Sensor does not work | Check wiring and calibration |
| Program will not upload | Restart the robot and mBlock |

### Assessment

Rather than a mark, prefer:
- A **logbook** where pupils note discoveries
- **Photos or videos** of robots in action
- A **final presentation** of a personalised project

## Going further after the 10 projects

Once these basics are solid, offer:

1. **Open projects**: pupils choose their challenge (cleaner robot, delivery bot, dancer…)
2. **Competitions**: speed race, maze, precision
3. **Extensions**: [mBot accessories](/en/mbot-accessories-where-to-start/) (arm, extra sensors)
4. **Advanced coding**: move toward [Arduino C](/en/arduino-c/) for the most motivated

### Next steps in the mBot sequence

- [First mBot program](/en/first-mbot-program/)
- [mBot project ideas in one hour](/en/mbot-one-hour-project-ideas/)
- [Intrusion detector activity](/en/mbot-activity-intrusion-detector/)
- [Install mBot blocks](/en/install-mbot-blocks/)
- [mBot vs mBot2](/en/mbot-vs-mbot2/)

## FAQ — 10 mBot classroom projects

### How much time for all 10 projects?

Between **4 and 6 sessions of 45 minutes**, depending on pupil level and setup time. Count at least **2 sessions for the first 3 projects** (install, first programs).

### Do I need one mBot per pupil?

No, **1 mBot for 2 to 3 pupils** is ideal. It encourages collaboration and keeps costs down. For a class of 24, **8 robots** are enough.

### Can I adapt these for ages 6–7?

Projects 1 to 3 work from about 6–7 with strong adult support. For younger children, prefer **screen-free** robots such as [Tale-Bot](/en/matatalab-tale-bot-educational-robot/).

### Are the PDFs really free?

Yes, **100% free**. You can download, print and share them freely in an educational setting. No registration required.

### What if I have only one mBot for the whole class?

Use **rotations**: while one group programs the mBot, others work on:
- Designing the program **on paper**
- **Scratch** challenges on computers (similar logic)
- Writing the **logbook**

### Do these activities work with mBot2?

Yes, all projects are **compatible with mBot and mBot2**. mBot2 even offers extra sensors that can enrich projects 5 to 10. See [mBot vs mBot2](/en/mbot-vs-mbot2/).

---

**In short**: these **10 free mBot projects** form a complete sequence to discover classroom robotics, from simple movement to sensors. Each activity prepares the next and opens the door to more ambitious projects.

**Download the PDFs** and start at the next session!
