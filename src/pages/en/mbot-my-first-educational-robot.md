---
layout: ../../layouts/EnPost.astro
title: "Makeblock mBot robot: my first educational robot"
description: "The classic Makeblock mBot for beginners: building it with an adult, preloaded modes, batteries, and first steps with mBlock (a Scratch-style programming tool)."
updated: "31 October 2026"
faqSchema:
  - question: "How does the mBot robot work?"
    answer: "The mBot is a small mobile platform. Its mCore board runs a program (a preloaded mode or a script sent from mBlock), drives the motors, LEDs and buzzer, and reads the sensors (ultrasonic for distance, a line sensor under the chassis). You can test in live mode with the robot connected to the computer, or upload the program to the board so it runs without a cable."
  - question: "Is the mBot an educational robot?"
    answer: "Yes. An educational robot is used to learn programming and robotics by handling a real object. The mBot is widely used in families and schools for exactly that."
  - question: "What is the difference between the mBot and the mBot2?"
    answer: "The classic mBot mainly uses the mCore board and RJ25 connectors. The mBot2 is built around the CyberPi board and the mBuild bus, with a more natural path towards Python."
  - question: "My mBot program does not do what I want. Where do I start?"
    answer: "Check that the right device is selected in mBlock, check the connection (USB is best for testing), and upload again after every change. For wireless problems, see the Bluetooth troubleshooting page."
  - question: "Where can I buy the classic mBot (not the mBot2)?"
    answer: "On Amazon, search for 'mBot Makeblock', read the listing title (mBot or mBot2) and the photos carefully before ordering, and compare sellers."
---

Are you looking for an **mBot robot** for a first taste of robotics? The **mBot** from **Makeblock** (sometimes written “m bot”) is a small robot that you build and then program. It is designed for beginners from about **8–10 years old**, with an adult helping with the assembly. By the end of this page you will know what is in the box, how to put it together without any soldering, which modes work without writing code, and how to move on to **mBlock**, Makeblock’s block-based programming software (very close to **Scratch**, the block language used in many schools).

![Assembled Makeblock mBot educational robot, three-quarter view](/images/products/mbot.webp)

*Product photo of the classic mBot (Makeblock kit). Always check the seller’s listing: the exact model and box contents can change over time.*

> **Check the model** — This article is about the **classic mBot** (**mCore** board, **RJ25** connectors). The **mBot2** is a different generation (**CyberPi** board, **mBuild** bus). The shopping links below lead to the **classic mBot**. To compare the two: [mBot vs mBot2](/en/mbot-vs-mbot2/).

You can see today’s price of the [Makeblock mBot on Amazon UK](https://www.amazon.co.uk/dp/B07XR98YYQ?tag=roboteducatif-21) or on [Amazon.com](https://www.amazon.com/dp/B07XR98YYQ?tag=roboteducatif-20) (affiliate links, UK first). Prices change, so check the listing before you buy.

## Who is the mBot for?

The mBot is a good fit if you want:

- a **kit to assemble** (screws, chassis, motors) rather than a ready-made robot;
- an entry into **block programming** in the same spirit as Scratch;
- **ready-to-use modes** (avoid obstacles, follow a line) before writing a single program;
- a robot that can **grow**: later on, [Makeblock accessories](/en/mbot-accessories-where-to-start/) (sensors, arm, tracks) plug into the kit’s ports.

It is not the best choice if you want a **screen-free** robot for a very young child (3–6 years old). Look instead at solutions such as the [Matatalab Tale-Bot Pro](/en/matatalab-tale-bot-educational-robot/).

## 1. What is typically in the box

Depending on the pack and the year, the box of the classic mBot generally contains:

| Item | Simple role |
|--------|-------------|
| **Chassis** and mechanical parts | The structure of the robot (wheels, supports). |
| **mCore board** | The electronic “brain” of the robot. |
| **Two motors** | Turn the wheels. |
| **Ultrasonic sensor** | Measures the distance in front of the robot (to avoid obstacles). |
| **Line-follower sensor** | Reads a black line on the floor. |
| **Infrared remote control** | Drives the robot from a distance (needs button-cell batteries). |
| **Screws, screwdriver, manual** | Assembly without soldering. |

The paper manual remains the reference for **your** exact revision: follow it step by step. No soldering is needed.

## 2. Assembly: with an adult, without stress

Assembly needs **small tools** (often supplied) and some **patience**. A 10-year-old can manage it, but **with an adult**: to hold parts, check the direction of the motors and avoid forcing a screw.

### Why an adult helps

- **Safety**: small parts, tools and batteries — supervision is recommended.
- **Learning**: reading a diagram, counting screws and checking polarity (which way a battery or wire is oriented) is already robotics.
- **Fewer mistakes**: reversed motors or badly clipped cables make the robot drive backwards; a second pair of eyes avoids frustration.

Plan for a clear table, a bowl for the screws, and **30 to 60 minutes** depending on experience. If a step in the manual is unclear, stop and compare the manual’s photo with your build rather than forcing anything.

### Power (consumables)

To make the robot run, plan for:

- **rechargeable batteries** that fit the kit’s compartment (often AA size — **check the manual**) **or**
- a Makeblock-compatible **LiPo battery** (lithium-polymer, the same technology as in many phones) with a matching connector, often a **JST** type (a small white plug with two wires), **only** if your model and manual allow it;
- **CR2032** cells (button batteries) for the infrared remote.

Without reliable power, even the best program will do nothing: batteries are the first useful “accessory”.

## 3. First use: preloaded modes

Once assembled and powered, the mBot can already **move without a computer**, thanks to **programs already stored** on the board (depending on the model and the mode you pick on the robot or the remote):

- **avoid obstacles** (the ultrasonic sensor detects what is ahead);
- **follow a black line** on the floor (sensor under the chassis);
- **manual driving** with the remote.

This is ideal for checking that the build is correct **before** installing any software. If the robot does not react: check the batteries, the switch, the motor cables, then the manual.

## 4. Programming with mBlock (not “the Scratch app”)

To create your own behaviours you use **mBlock** (usually **mBlock 5**): this is Makeblock’s software, **inspired by Scratch** (the same idea of coloured blocks that snap together). It is **not** just the scratch.mit.edu website: mBlock adds the **robot blocks** (motors, sensors, LEDs…).

Recommended path on this site:

1. [Install mBlock 5 on Windows](/en/install-mblock-5-windows/) (or the version suited to your computer).
2. [Understand the mBlock 5 interface](/en/first-steps-mblock-5/) (stage, palettes, connection).
3. [Install the mBot blocks](/en/install-mbot-blocks/) if the robot palette does not appear.
4. [My first mBot program](/en/first-mbot-program/) for a short script you can test straight away.

At school or at home, the **USB** connection is often the simplest way to start; **Bluetooth** (a wireless link) comes later — see [mBlock Bluetooth troubleshooting](/en/mblock-bluetooth-troubleshooting/).

## 5. Strengths and limits (practical opinion)

**Strengths**

- An educational build (mechanics plus light electronics).
- Preloaded modes for a quick success.
- A natural step towards Scratch / mBlock, then later towards other Makeblock robots.
- An ecosystem of accessories once the basics are mastered.

**Limits**

- You need a **computer** (or a compatible tablet) to really program it.
- The **mBot2** is more recent (screen, Python more prominent): if you are hesitating, read the [mBot / mBot2 comparison](/en/mbot-vs-mbot2/).
- The **RJ25** accessories of the classic mBot cannot be plugged as they are into the mBot2’s **mBuild** bus.

This is not a numbered lab test: the opinion is based on Makeblock’s documentation, the kit’s common use in schools and consistency with the other mBot guides on this site. Prices shown by sellers change; check the listing on the day you buy.

## Frequently asked questions

### How does the mBot robot work?

The **mBot** is a small mobile platform: the **mCore** board runs a program (a preloaded mode or a script sent from mBlock), controls the **motors**, the **LEDs** and the **buzzer** (a small speaker), and reads the **sensors** (ultrasonic for distance, a line sensor under the chassis). You can test in **live** mode (robot connected to the computer) or **upload** the program to the board so it runs without a cable.

### Educational robot: is the mBot one?

Yes. An **educational robot** (also called a pedagogical robot) is used to **learn** programming and robotics by handling a real object. The mBot is very common in families and schools for this purpose.

### What is the difference between the mBot and the mBot2?

The classic **mBot** mainly uses the **mCore** board and **RJ25** connectors. The **mBot2** is built around the **CyberPi** and the **mBuild** bus, with a more natural path towards **Python**. More detail: [mBot vs mBot2](/en/mbot-vs-mbot2/).

### My “mBot program” does not do what I want: where do I start?

Check the **right device** in mBlock and the **connection** (USB for testing), then **upload** again after every change. For wireless problems: [Bluetooth troubleshooting](/en/mblock-bluetooth-troubleshooting/).

### Where can I buy the classic mBot (not the mBot2)?

On Amazon, the tracked product link for the **classic mBot** is this one: [Makeblock mBot on Amazon UK](https://www.amazon.co.uk/dp/B07XR98YYQ?tag=roboteducatif-21) (or [Amazon.com](https://www.amazon.com/dp/B07XR98YYQ?tag=roboteducatif-20)). Read the **listing title** (mBot / mBot2) and the photos before ordering, and compare the sellers.

## Going further

- [mBot accessories: where to start](/en/mbot-accessories-where-to-start/)
- [mBot project ideas for a one-hour session](/en/mbot-one-hour-project-ideas/)
- [Best robot for a 10-year-old](/en/best-robot-for-a-10-year-old/)

*Amazon Associates — a commission may be earned on eligible purchases, at no extra cost to you.*
