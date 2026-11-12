---
layout: ../../layouts/EnPost.astro
title: "Makeblock CyberPi: review and Python tutorial for beginners"
description: "Review of the Makeblock CyberPi, a programmable board with a screen and sensors: strengths, limits, battery safety and a first Python program with mBlock."
updated: "31 October 2026"
---

You have heard about the **CyberPi** from [Makeblock](/en/makeblock-brand/), and you are wondering what you can really do with this small transparent board with a screen? It interests curious middle-schoolers, technology teachers and parents who want to go a little further than simple video games. In this article we tell you who it suits, what it does well, what it does not do, and then we guide you step by step to write your first program in **Python**, a very widely used programming language that you write as text, as opposed to the coloured blocks you assemble with a mouse.

## What is the CyberPi?

The CyberPi is a **development board**: a small electronic board that you program so that it reacts to what it senses and to what you ask of it. You can think of it as the brain of a project, to which you then add motors, lights or sensors. This is the brain that Makeblock also puts inside the [mBot2](/en/mbot-vs-mbot2/) robot, but the board also exists on its own, without wheels, for projects that stay on the table.

![The Makeblock CyberPi in the CyberPi Go kit: translucent-case board with colour screen and joystick, Pocket Shield extension, USB-C cable and manual](/images/products/cyberpi.webp)

*The CyberPi in Makeblock’s CyberPi Go kit: the board, the Pocket Shield extension, the USB-C cable and the manual. Image: Makeblock.*

On the board itself, there is enough to interact with without plugging anything in:

- a **colour screen** of 1.44 inches (about 3.7 centimetres diagonally), 128 dots by 128;
- a **joystick** and buttons to play or navigate menus;
- a **speaker** and a **microphone**;
- a **light sensor** and a **gyroscope**, the latter measuring the board’s rotations and tilt, as in a phone;
- programmable **coloured lights** (LEDs).

The board’s brain is a chip from the **ESP32** family, very common among electronics hobbyists and able to connect wirelessly. The exact contents of the kit vary depending on the offer: some shops sell the board alone, others sell kits with the Pocket Shield extension or other accessories. Check the exact list before ordering.

## Wi-Fi and Bluetooth: what are they for in practice?

**Wi-Fi** connects the board to your home network, and therefore to the Internet. It lets you, for example, fetch information online or send a message from a project. **Bluetooth** is a short-range wireless link, like the one on a portable speaker: you use it to connect the board to a computer or tablet without a USB cable. To start, the USB cable remains the most reliable way. If the Bluetooth link gives you trouble, our page on [common Bluetooth errors with mBlock](/en/mblock-bluetooth-troubleshooting/) lists the settings to check.

Some presentations of the board also mention artificial intelligence features, such as voice recognition, which go through the Internet. We have not verified them: they depend on the software version and on an online service, so we do not count them in our opinion.

## Power, battery and safety

Used on its own, outside the mBot2 chassis, the CyberPi is powered by its **USB cable** or by a Makeblock-compatible **LiPo battery** (lithium-polymer, the same technology as in many phones). There is **no connection to the 230-volt mains** to make: no electrical panel to touch, neither to use the board nor to change a sensor.

Lithium batteries do call for a few simple precautions, however:

- use the supplied cable and charger, or an ordinary computer or phone-charger USB socket;
- do not recharge the battery unattended, for example overnight;
- stop using any battery that is swollen, damaged or heats up abnormally, and never puncture it;
- do not short-circuit its wires, even briefly.

## mBuild or RJ25: do not mix up the connectors

The CyberPi’s official extensions plug into the **mBuild** system, modules linked by magnetic connectors or by cable. This is **not** the **RJ25** connector of the older [mBot](/en/mbot-my-first-educational-robot/), which looks like a phone socket. Before buying a module, including a second-hand one, check that it is listed for the CyberPi or for mBuild on [Makeblock’s support site](https://support.makeblock.com).

## Our opinion of the CyberPi

This opinion is based on Makeblock’s documentation, on the board’s published specifications and on how the other products in this range are used in class. We have not measured the battery’s runtime, so we give no figure.

**Who is it for?**

- A middle-schooler or teenager who wants to move from blocks to Python on an object they see reacting (from about 10 years old and independent, and from 8 or 9 with an adult for the block part: this is our guideline, not an age set by the manufacturer).
- A teacher who wants compact equipment, usable on a desk, with no playground or robot to move around.
- A parent or maker who wants to explore electronics without soldering.

**Strengths**

- The built-in screen, sound, light and joystick let you succeed at a first project without plugging in anything else.
- You can start with blocks and move to Python in the same software, mBlock, without changing hardware.
- It is compact, light and can later slip into an mBot2 robot.

**Limits**

- On its own, it does not roll: if you want a robot that moves and follows lines, look instead at the [mBot2 and how it compares](/en/mbot-vs-mbot2/).
- It needs a computer or tablet to be programmed.
- The extensions are specific to Makeblock: not every sensor on the market plugs straight into it.
- If you would rather learn Linux and run a small server, a Raspberry Pi-type board suits that need better. Our [Raspberry Pi getting-started guide](/en/raspberry-pi-3-getting-started/) will help you decide.

If you are hesitating for a 10-year-old, our guide to the [best robot for a 10-year-old](/en/best-robot-for-a-10-year-old/) compares the options by profile.

The price changes depending on the offers and kits. No Amazon.com or Amazon.co.uk product page is linked here: the French ASINs for the CyberPi board and the mBot2 are not reused on those marketplaces, and a search for “electronics kit” does not name one listing. The comparison is [mBot vs mBot2](/en/mbot-vs-mbot2/).

## Tutorial: display a message and react to button A in Python

This small program displays a text on the screen, then, every time you press button A, turns the light green, plays a sound and displays “Well done!”.

**Level**: beginner. **Duration**: allow half an hour, excluding the installation of mBlock (an estimate, not timed).

### Prerequisites

- A charged CyberPi.
- A USB-C cable **that carries data**. Some cables sold for charging only do not let the computer see the board.
- **mBlock 5** installed on the computer: if that is not done yet, follow our [guide to downloading mBlock 5](/en/download-mblock-5-free/), then discover the interface with [First steps with mBlock 5](/en/first-steps-mblock-5/).

### Step 1: connect the board

Plug the CyberPi into the computer and switch it on. In mBlock 5, add the **CyberPi** device to the device list, then request the connection. The exact labels depend on the installed version of mBlock. You will know it worked when the software shows the board as connected.

### Step 2: switch to Python

In the programming area, switch from **Blocks** mode to **Python** mode: the editor then shows text instead of blocks.

### Step 3: write the program

Copy the following code. The texts on the screen are written without accents, as a precaution: we have not checked how accented characters display on the board’s screen.

```python
import cyberpi
import time

# Clear the screen, then display two lines of text
cyberpi.console.clear()
cyberpi.console.println("Hello!")
cyberpi.console.println("Press A")

# Endless loop: the program watches button A
while True:
    if cyberpi.controller.is_press("a"):
        cyberpi.led.on(0, 255, 0)      # green light (red 0, green 255, blue 0)
        cyberpi.audio.play("hello")    # pre-recorded sound
        cyberpi.console.println("Well done!")
        time.sleep(1)                  # wait one second
        cyberpi.led.off()              # turn the light off
```

To understand the code:

- `import cyberpi` loads the functions that control the board, and `import time` those that handle pauses.
- `cyberpi.console.println` writes a line on the screen.
- `while True` repeats forever whatever is indented below it, and `if` runs the following lines only if button A is pressed at that moment.
- `cyberpi.led.on(0, 255, 0)` sets the colour with three numbers between 0 and 255: red, green, blue.

### Step 4: run and check

Run the program in live mode, or send it to the board if you want it to keep going without a computer. On the screen, you should see “Hello!” then “Press A”. When you press A, the light turns green, a sound plays and “Well done!” appears. To play with the code, change the three light numbers (for example 255, 0, 0 for red) or the displayed text.

*We did not run this example on a board for this article: it reuses the function names from Makeblock’s CyberPi documentation, but those names may change from one version of mBlock to another. If a line causes an error, compare it with the examples in the CyberPi section of Makeblock’s documentation.*

### If it does not work

- **The board does not appear in mBlock**: try another USB cable, another port, then restart the board and the software.
- **Nothing is displayed or the program no longer obeys**: stop the program, run it again and check that the right device is selected.
- **No sound**: check the board’s volume, because the speaker is small and the sound quiet.
- **Error message on a line**: look at the spaces at the start of lines, because in Python the alignment matters, and at the quotation marks, which must close.

What next? You can add a second button, display the light sensor’s value or, if you want to see your code make a robot roll, discover the [mBot2](/en/mbot-vs-mbot2/). To choose the software suited to your device, read our guide [mBlock 5: desktop app, browser or Python for mBot?](/en/mblock-software-which-to-choose/).

*Amazon Associates — a commission may be earned on eligible purchases, at no extra cost to you.*
