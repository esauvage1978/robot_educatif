---
layout: ../../layouts/EnPost.astro
title: "mBlock 5, app or Python: which software for mBot?"
description: "PC, tablet or browser: which Makeblock software should you choose for mBot and mBot2, depending on age and level? A clear comparison."
updated: "31 October 2026"
---

Some links on this page are affiliate links. If you buy through them, we may earn a commission at no extra cost to you. Check today’s price on Amazon UK or Amazon.com before you buy.

You open **mBlock** for the first time and you do not know whether to **install** it, open it **in the browser**, or jump straight to **Python**? This page compares the three entry points in plain words, so that you can choose according to your computer, your administrator rights and your robot (**mBot**, **mBot2**, etc.).

> **Direct answer (October 2026)** — To open the **IDE** (integrated development environment: the window where you assemble the blocks) **without installing anything**, go to [ide.mblock.cc](https://ide.mblock.cc/) and follow [mBlock online](/en/mblock-online-no-install/). For the desktop app: [install mBlock 5](/en/install-mblock-5-windows/) or [download mBlock 5](/en/download-mblock-5-free/). For Scratch alone (no Makeblock robot): [mBlock vs Scratch](/en/mblock-vs-scratch/). Content reviewed on mBlock 5.x (Scratch 3-style interface).

![The mBlock online interface: stage, sprites, blocks and script area.](/images/blog/guides-2026/mblock-online-wikimedia.png)

*Real screenshot of the mBlock online IDE ([ide.mblock.cc](https://ide.mblock.cc/)) — Matteo Ruffoni, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:MblockOnline.png), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.en).*

**mBlock** is used to program **Makeblock** robots with **blocks** (in the same spirit as **Scratch**), and sometimes later with **Python** (a text-based language). The installed application, the web version and Python mode **are not equivalent**: everything depends on the robot you plug in, on admin rights, and on Bluetooth (the wireless link).

**Quick access**

- **Online:** [ide.mblock.cc](https://ide.mblock.cc/) in Chrome or Edge.
- **On a PC:** [official download](https://www.mblock.cc/en-us/download/) + [Windows guide](/en/install-mblock-5-windows/).
- **First try in 2 minutes:** the Panda sprite, the blocks “when green flag clicked” then “say Hello!”, then click the green flag.

## Overview: three “doors” into the same universe

| | **Application (desktop)** | **mBlock Web (browser)** | **Python in mBlock** |
| --- | --- | --- | --- |
| **Ideal if…** | you **connect** a robot (USB / Bluetooth), you update the **firmware** (the robot’s built-in software), you want the **maximum reliability**. | the school **forbids** installations, a **one-off** workshop, a quick demo. | learners already **master** blocks and move on to **syntax** (secondary school). |
| **Limits** | needs a **download** and sometimes **admin** rights (Windows). | **Bluetooth** is sometimes **unstable** depending on the browser and the machine; not always as comfortable as the app. | depends on the **model** (mBot2, CyberPi, etc.) and the **version**; keep it for when the **logic** of blocks is understood. |

This is **not** a choice for life: many people use the **app** at home or in the lab, and the **Web** version on locked computers.

If you then need a compatible robot, use the age guides, which name the model before any shop link: [age 8](/en/best-robot-for-an-8-year-old/), [age 10](/en/best-robot-for-a-10-year-old/), [mBot vs mBot2](/en/mbot-vs-mbot2/). The French ASINs for those robots are not reused here as Amazon.com or Amazon.co.uk product pages.

## 1. The mBlock application (Windows / macOS / Chromebook / mobile depending on the version)

**Prefer it** for everything that involves **real hardware**:

- **connecting** the robot by **USB** or **Bluetooth**;
- **uploading** the program to the robot’s board;
- **updating the firmware** (often **impossible** or not recommended without USB: see the official help for your model on [Makeblock Support](https://support.makeblock.com/));
- **drivers** and **stability**: fewer surprises than a browser that changes often.

**On this site**, follow the guides [install mBlock 5 on Windows](/en/install-mblock-5-windows/), then [first steps with mBlock 5](/en/first-steps-mblock-5/) to recognise **Devices**, **blocks**, the **script area** and the **connection**.

## 2. Browser version with no installation (Chromebook and locked PCs)

The **web** version ([mBlock online](https://ide.mblock.cc/) and equivalents depending on the period) is **very useful** when:

- the classroom computer **forbids** installing software;
- you run a **one-off workshop** without administrator rights;
- you want to show **blocks** without taking the robot out (stage on screen).

**Points to watch:** **Bluetooth** can be **more temperamental** than in the application (browser permissions, battery, driver). To connect a physical robot from the browser you usually need **mLink**, a small Makeblock helper program that links the browser to the USB or Bluetooth connection. If you get disconnections or the device cannot be found, follow [Bluetooth / mBlock troubleshooting](/en/mblock-bluetooth-troubleshooting/).

## 3. Python in mBlock

Moving to **Python** often comes **after** a **blocks** phase: it has **educational** value (syntax, indentation, variables) and gives **continuity** with secondary-school teaching. It is **not** the same audience or the same pace as snapping blocks together at the beginning.

Depending on the **model** (**mBot2**, **CyberPi**, **Codey Rocky**, etc.) and on the software **version**, access to text mode and the available **APIs** (application programming interfaces: the functions you can call to control the hardware) vary. Read the product documentation and test on **one** robot before rolling it out in class. For the hardware context: [mBot vs mBot2](/en/mbot-vs-mbot2/), [CyberPi](/en/makeblock-cyberpi-overview/).

## 4. Extensions and mBot blocks (motors, sensors)

Without the **right setup**, the **motor** or **sensor** blocks of the **mBot** do not appear: you must **add the device** or the matching **extension** in mBlock. Step-by-step procedure: [install the mBot blocks](/en/install-mbot-blocks/).

## 5. Official Scratch vs mBlock: do not mix everything up

- **Scratch** ([official site](https://scratch.mit.edu/)): **on-screen** projects, online sharing, a **general-purpose** ecosystem.
- **mBlock**: designed for the **Makeblock ecosystem** (robots, boards, sensors) with **dedicated blocks** and a **connection** to the hardware.

For a **Makeblock robot** workshop, you almost always start from **mBlock**, not from Scratch alone.

## 6. Mini-FAQ

**Do I have to pick only one?**  
No. Use the **application** as soon as a **real robot** is on the table; keep the **Web** version for computers where you cannot install anything; open **Python** only once the **blocks** are **understood**, not just copied.

**What is “Live” versus uploading?**  
In **Live** mode (connected), you often **test** in real time. **Uploading** sends the program **into** the robot so that it runs **without** the cable. It is useful once the script is validated.

**Are mBlock 5 and mBlock 3 the same?**  
In the recent tutorials of this site, we start from **mBlock 5** (the current Scratch 3-style interface). If you open a very old tutorial, the labels may differ slightly.

**Are “Minecraft mblock” and Minecraft with mBlock the same thing?**  
**No.** **Minecraft** is a 3D block-building **game**. **mBlock** is Makeblock’s **programming software** (code blocks, **mBot** robots, etc.). If a search does not return the right tool, add **Makeblock** or **mBot** to your query.

## Where to check a robot price

No Amazon.com or Amazon.co.uk product page is linked from this article: the mBot and mBot2 ASINs in the French snapshot are not assumed to be the same products abroad. Official software: [mblock.cc](https://www.mblock.cc/) and [ide.mblock.cc](https://ide.mblock.cc/). The buying guide is [mBot vs mBot2](/en/mbot-vs-mbot2/).

---

**Takeaway**: install the **application** on the main machine of the robot project; keep the **Web** version for locked computers or quick demos; open **Python** only when the **block logic** is solid. The software is only a tool: the **project** and **understanding** stay at the centre.

**Also read**: [mBlock or Scratch?](/en/mblock-vs-scratch/)

*Author: Emmanuel Sauvage.*
