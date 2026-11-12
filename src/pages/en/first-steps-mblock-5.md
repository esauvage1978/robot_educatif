---
layout: ../../layouts/EnPost.astro
title: "First steps with mBlock 5: understanding the environment"
description: "mBlock 5 for beginners: stage, sprites, block palettes and robot connection. A step-by-step guide for children and parents opening their first program."
updated: "31 October 2026"
---

Some links on this page are affiliate links. If you buy through them, we may earn a commission at no extra cost to you. Check today’s price on Amazon UK or Amazon.com before you buy.

> **Direct answer (October 2026)** — **mBlock 5** is an environment close to **Scratch** (programming with coloured blocks) plus blocks for Makeblock robots. After [installing it](/en/install-mblock-5-windows/), add your device (for example an **mBot**), connect it by **USB** or **Bluetooth** (a wireless link), then choose **Live mode** (instant testing as long as the cable or Bluetooth link is active) or **Upload** (the program is saved inside the robot). Common blockers: the wrong mode, or the wrong **COM port** (the name Windows gives to the USB serial cable); see [Bluetooth troubleshooting](/en/mblock-bluetooth-troubleshooting/).

You have just opened **mBlock 5** and the window looks full of mysterious areas? This guide shows you, with **real screenshots** of the interface, where the **stage**, the **sprites**, the **block palettes** and the robot **connection** are — before you buy anything and before you write a long program.

**mBlock 5** is Makeblock’s block programming application. It is close to Scratch, but designed to connect robots (**mBot**, **mBot2**, Codey Rocky, **CyberPi**, etc.) as well as to animate sprites on the screen. Once [mBlock is installed](/en/install-mblock-5-windows/), find your bearings here, then move on to the [first mBot program](/en/first-mbot-program/).

## 1. A “Scratch-type” screen and a robot: what mBlock allows

mBlock is **not** split into two strips in the window: it is **one** piece of software, with **zones** (stage, scripts, block palettes) that look like Scratch.

**On the screen side**, you use the **stage**, the **sprites** (the characters and objects you animate) and the backdrops as in Scratch: animating characters, scenery and small games. Everything stays **inside** the mBlock window.

**On the robot side**, it is not “another half” of the interface: once a **Makeblock device** has been added (mBot, etc.) and **connected** by USB or Bluetooth, **extra blocks** appear for the real hardware: motors, LEDs, sensors, buzzer, and so on. As long as you have not added a device, you only see the **sprites / stage** part. After adding one, you program with the **robot-specific** blocks, alone or **in addition to** sprites if the project mixes the two (for example a score on screen while the robot moves).

In practice: **without a robot**, you stay with on-screen animation as in Scratch. **With a robot**, you often concentrate on the **device** blocks, and the stage can wait. **Both** can also be combined in the same project.

## 2. Overall view of the window

![Overall view of the mBlock 5 window: title bar, stage, palettes, script area](/images/blog/premier-pas-mblock/mblock-vue-globale.png)

Going through the interface from left to right and from top to bottom, you will generally find:

1. **Menu bar**: file, edit, settings, language, help, sometimes a Makeblock account.
2. **Stage**: a preview of the visual project (sprites, backdrop).
3. **Controls under the stage**: the **green flag** (start), **stop**, sometimes **full screen** and **block size**.
4. **Sprites / devices area**: tabs to choose **who** is being programmed (a sprite, the robot…).
5. **Block categories**: coloured columns (Motion, Looks, etc., plus **mBot** or other device categories once added).
6. **Script area**: the large central space where you **snap** blocks together to form the program.

The exact labels may vary with the **language** and the **version** of mBlock; the **logic** of the zones stays the same.

## 3. The main menu

![Menu bar: New, Open, Save, language, tutorial](/images/blog/premier-pas-mblock/mblock-menu-principal.png)

What to know from the start:

- **New / Open / Save**: your projects are often **.mblock** files (remember to save often).
- **Language**: switch the interface to **English** (or another language) if needed, often in the preferences or the menu.
- **Tutorial or online help**: a useful shortcut during the first week.
- **Sign-in / account**: optional depending on use; to drive a robot, what matters is the **connection to the device** (see below), not necessarily a cloud account.

## 4. The stage and the playback controls

![Stage with a sprite, green flag, stop, block size setting](/images/blog/premier-pas-mblock/mblock-scene-controles.png)

- **Stage**: the “theatre” of the sprites. Coordinates, size, layer order: the same idea as on [scratch.mit.edu](https://scratch.mit.edu/).
- **Green flag**: starts the scripts that begin with the “when green flag clicked” block.
- **Stop button**: stops everything, which is essential if a loop never ends.
- **Block size**: enlarge or reduce the blocks for younger children or for demonstrations on a projector.

## 5. Sprites, devices and the three tabs

![Device, Object (sprites) and Backdrop tabs](/images/blog/premier-pas-mblock/mblock-onglets-lutins-appareil.png)

Under or beside the stage, the area that manages **who** is selected often has three tabs:

| Tab | Use |
|--------|--------|
| **Device** | Add a Makeblock robot (mBot, etc.), **connect** it (USB / Bluetooth), then use its dedicated **blocks**. |
| **Object** (sprites) | Choose the active sprite, create or import one; its position on the stage. |
| **Backdrop** | Choose or import the stage background. |

For the [mBot](/en/mbot-my-first-educational-robot/), start by **adding the device**, then [install the mBot blocks](/en/install-mbot-blocks/) if the palette does not appear. The **USB** connection is the simplest for troubleshooting; **Bluetooth** is handy because it is wireless but more sensitive to interference: see [Bluetooth troubleshooting](/en/mblock-bluetooth-troubleshooting/).

## 6. Block categories and colour

![Column of categories and block palette for the selected sprite or device](/images/blog/premier-pas-mblock/mblock-categories-blocs.png)

- The **categories** group the blocks by theme: motion, looks, sound, control, sensing, and so on.
- The **robot** blocks only appear when the matching **device** is **added** and **selected**.
- The **“My Blocks”** category (or equivalent) is used to create your **own** blocks from reusable scripts, which is useful later to organise large projects.

The **colours** help you quickly find a family of commands. They are not just decoration: they are a **visual landmark** in class.

## 7. The script area

![Script area with snapped blocks](/images/blog/premier-pas-mblock/mblock-zone-script.png)

This is where you **build** the program:

- Blocks **snap together** like puzzle pieces; only some assemblies are valid (compatible shapes).
- Execution generally follows the **top-to-bottom flow** of a stack of blocks (unless you use more advanced control structures).
- You can have **several scripts** side by side (several stacks that start on different events).

**Tip:** always start with a **trigger** block (green flag, key, message, robot event…) so that you know **when** the program starts.

## 8. Python mode (overview)

On some versions and devices, mBlock offers a path to **Python** (a text-based programming language). It is not needed for your first steps with blocks. It is the logical next step when text syntax becomes a goal, as with [mBot2](/en/mbot-vs-mbot2/) or [CyberPi](/en/makeblock-cyberpi-overview/). To know when to open the Python editor, read [which mBlock software to choose](/en/mblock-software-which-to-choose/).

## Compatible hardware (once you understand the interface)

When the environment is clear, here are two robots often used with mBlock 5. Price ranges change: check the current product page. **IoT** here means “connected objects” (projects that go through the Wi‑Fi network, for example).

- **Makeblock mBot2** — ages 10–14 · Scratch and Python · CyberPi board with a colour screen · Wi‑Fi and connected projects · well suited to learning mBlock 5.
- **Makeblock CyberPi** — ages 10 and up · Scratch and Python · programmable board with a built-in screen, Wi‑Fi and several sensors · useful for connected projects with mBlock.

Dated UK prices for mBot and mBot2 are in the [buying guide](/en/best-programmable-robot-for-kids/).

## 9. Connecting the robot: what to check

Before clicking “connect”:

1. The **robot is switched on** and the **battery** or batteries are sufficiently charged.
2. The **USB cable** is firmly plugged in *or* **Bluetooth** is paired on the Windows side (see [software: app vs Web](/en/mblock-software-which-to-choose/)).
3. In mBlock, the **right device** is selected in the list (avoid mixing up two identical robots in class).

Then, depending on the mode:

- **Live execution**: the program runs **as long as** the link with the PC is active (useful for testing).
- **Upload**: the program is **saved inside the robot** so that it works **without** the cable, as detailed in the [first mBot program](/en/first-mbot-program/).

## 10. Mini-FAQ

### Are mBlock 5 and online Scratch the same?

**Almost**, for the sprites and stage part. The major difference is the **Makeblock hardware**: drivers, robot blocks, **firmware** updates (the robot’s built-in software). For pure Scratch without a robot, the official site is enough; for an **mBot**, mBlock is the right tool.

### I cannot see my robot’s blocks

First add the **device** in the tab provided, then check the [mBot extension procedure](/en/install-mbot-blocks/). Without a recognised device, the specific blocks do not appear.

### The interface is in another language

Look for **Language** / **Preferences** / **Settings** in the menu (the location varies with the version) and choose **English**.

### mBlock crashes at first launch

Update **Windows**, **mBlock** and the **drivers**; try once as **administrator**; if an antivirus is blocking it, see the FAQ of the [installation article](/en/install-mblock-5-windows/).

### What is an “mblock program”?

In mBlock, a **program** is the **block script** (one or more stacks) that you assemble in the **script area**, often saved in a **`.mblock`** project file. To see an example on an **mBot robot**, follow [First mBot program](/en/first-mbot-program/).

### Do “mBlock 5 web” and the installed app do the same thing?

The **interface** (stage, blocks, script area) looks alike in **[mBlock online](https://ide.mblock.cc/)** and in the **desktop app**. However, **connecting the robot**, **Bluetooth** and **uploading** are often **more reliable** in the application: details in [Which mBlock software](/en/mblock-software-which-to-choose/).

---

## Where to check the price

The price is on the retailer’s page for the exact model. Dated UK prices for mBot and mBot2 are in the [buying guide](/en/best-programmable-robot-for-kids/).

---

**Next step:** continue with [installing the mBot blocks](/en/install-mbot-blocks/) if needed, then the [first mBot program](/en/first-mbot-program/) to link the **interface**, the **connection** and the **upload**.

**Also read**: [mBlock or Scratch?](/en/mblock-vs-scratch/)

*Author: Emmanuel Sauvage.*
