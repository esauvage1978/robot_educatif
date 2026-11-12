---
layout: ../../layouts/EnPost.astro
title: "Install mBot blocks in mBlock 5 (real screenshots)"
description: "Add mBot or mBot2 as a device in mBlock 5: real interface captures, orange block palette, model choice and troubleshooting — October 2026."
updated: "31 October 2026"
schemaUpdated: "2026-10-31"
faqSchema:
  - question: "Do I need USB to install mBot blocks?"
    answer: "No. Adding the mBot device in mBlock loads the orange block palette without a cable. USB or Bluetooth is for connecting and uploading your program later."
  - question: "I only see Scratch blocks, not mBot blocks"
    answer: "Open Devices, click Add (+), pick mBot or mBot2 for your kit, confirm OK, then click mBot in the list to keep it active."
  - question: "mBot or mBot2 in the library?"
    answer: "Classic blue two-motor kit with mCore board → mBot. CyberPi or mBot2 chassis → mBot2. See our mBot vs mBot2 page if unsure."
  - question: "mBot blocks disappeared after opening another project"
    answer: "Another device (CyberPi, Ranger…) may be selected under Devices. Click mBot again to restore its block category."
---

Some links on this page are affiliate links. If you buy through them, we may earn a commission at no extra cost to you. **Amazon UK** is the default shop below; **Amazon.com** links are for US buyers. Check today’s listing — we do not invent local prices.

> **Direct answer (October 2026)** — In **mBlock 5** (Makeblock’s **Scratch**-like block editor), open **Devices** → **Add (+)** → choose **mBot** (classic **mCore** kit) or **mBot2** (**CyberPi** board) → **OK**. The palette then shows **orange** robot blocks (motors, sensors, LEDs, buzzer). Without this step, only standard on-screen Scratch blocks appear. Install the app first: [Install mBlock 5 on Windows](/en/install-mblock-5-windows/) or [Download mBlock 5 free](/en/download-mblock-5-free/). Next: [First steps in mBlock 5](/en/first-steps-mblock-5/) and [First mBot program](/en/first-mbot-program/).

<figure class="article-figure">
  <img src="/capture/mblock_add_mbot.webp" alt="Screenshot: mBlock 5 device library with the mBot tile in the Makeblock grid." width="960" height="540" loading="eager" decoding="async" />
  <figcaption>mBlock 5 device library — the **mBot** tile (second row) is the classic blue robot. Screenshot — Emmanuel Sauvage, Educational Robotics — October 2026.</figcaption>
</figure>

| Item | Detail |
| --- | --- |
| **Goal** | Show mBot command blocks in mBlock 5 |
| **Level** | Beginner (software setup) |
| **Time** | 2–5 minutes |
| **Hardware** | PC with [mBlock 5](/en/install-mblock-5-windows/); robot can stay off |
| **Success check** | **mBot** listed under **Devices**; mBot block category visible |

To program the [Makeblock mBot educational robot](/en/mbot-my-first-educational-robot/) in mBlock, you must **register your model** in the Makeblock device library. This is not a separate download: the **active device** loads motor, sensor and LED blocks into the palette. Unsure whether to use the desktop app, browser or Python? Start with the hub guide [Which mBlock software for mBot?](/en/mblock-software-which-to-choose/).

## Which device to pick in mBlock?

| Your kit | Select in mBlock | Do not confuse with |
| --- | --- | --- |
| Blue two-motor kit, **mCore** board | **mBot** | mBot2, Ranger |
| **mBot2**, **CyberPi** chassis | **mBot2** or **CyberPi** | mBot v1 |
| **Ranger** transformable pack | **mBot Ranger** | Classic mBot |

If menus differ from our tutorials, check [mBot vs mBot2](/en/mbot-vs-mbot2/) before buying or lending a robot.

## Prerequisites

- **mBlock 5** on your computer. If needed: [Install mBlock 5 on Windows](/en/install-mblock-5-windows/).
- Know the layout: [First steps in mBlock 5](/en/first-steps-mblock-5/) (sprites, script area, **Devices** tab).
- **USB** or **Bluetooth** helps **later** when you connect the robot; not required **only** to display blocks.

**Tablet / iPad:** this walkthrough is for **desktop mBlock**. On tablets, use the official mBlock app — labels may differ slightly.

## Step 1 — Open the Devices area

In the left column, open the **Devices** tab (often at the top of the side panel). Here you choose **which robot** you program — that choice controls **which blocks** load on the right.

Look for these labels (mBlock 5.x in English): **Devices**, **Add**, **Connect**, **Live** / **Upload**.

<figure class="article-figure">
  <img src="/capture/mblock_appareil.png" alt="Screenshot: mBlock 5 Devices panel with Add (+) button." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>**Devices** panel — **Add (+)** opens the library. Another robot may already show (e.g. CyberPi); the steps are the same to add mBot. Screenshot — Emmanuel Sauvage, Educational Robotics — October 2026.</figcaption>
</figure>

Click **Add** (or **+**) to open the Makeblock **device library**.

## Step 2 — Choose mBot from the list

The **Device library** window lists robots and boards: **mBot**, **mBot2**, **Ranger**, **CyberPi**, etc.

<figure class="article-figure">
  <img src="/capture/mblock_add_mbot.webp" alt="Screenshot: mBlock 5 device library grid with mBot icon." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Find the **mBot** tile (classic blue robot). Use **Search** at the top if the list is long. Screenshot — Emmanuel Sauvage, Educational Robotics — October 2026.</figcaption>
</figure>

- Scroll or type **mBot** in **Search**.
- You can add more robots later the same way.

## Step 3 — Confirm with OK

Click the **mBot** tile (or **mBot2** if that is your model) to highlight it, then **OK**. **Cancel** closes without adding anything.

<figure class="article-figure">
  <img src="/capture/mblock_add_mbot_validation.webp" alt="Screenshot: mBot selected in mBlock device library, OK button active." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>**mBot** highlighted (blue outline) before you click **OK**. Screenshot — Emmanuel Sauvage, Educational Robotics — October 2026.</figcaption>
</figure>

## Step 4 — Check the mBot blocks

After confirmation, **mBot** appears under **Devices**. Click it so it stays the **active device**. The palette should offer robot blocks: **move**, **LED matrix**, **ultrasonic** / **line** sensors, **buzzer**, etc. (exact wording varies by version).

<figure class="article-figure">
  <img src="/capture/mbot_verification_bloc.webp" alt="Screenshot: mBot active under Devices with motor and LED blocks in the script area." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>With **mBot** active, movement and LED blocks appear in the palette and script. Screenshot — Emmanuel Sauvage, Educational Robotics — October 2026.</figcaption>
</figure>

**Quick check**

1. Under **Devices**, **mBot** is highlighted (not another robot).
2. You see blocks mentioning **mBot**, **mCore** or **RJ25** ports — not only Scratch sprite blocks.
3. Continue with [First mBot program](/en/first-mbot-program/) to connect via **USB** and **upload**.

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| No **mBot** in the list | Outdated mBlock or limited mode | Update from [mblock.cc](https://www.mblock.cc/en-us/download/); leave **Lite** mode if enabled; restart mBlock |
| Scratch blocks only | No Makeblock device active | Repeat **Devices → Add → mBot → OK** |
| Blocks vanish | Another device selected | Click **mBot** again under **Devices** |
| UI unlike our screenshots | mBot2 or other generation | Read [mBot vs mBot2](/en/mbot-vs-mbot2/) and pick the right model |
| Robot silent later | Connection, not blocks | [mBlock Bluetooth troubleshooting](/en/mblock-bluetooth-troubleshooting/); try **USB** first |
| No install allowed at school | Browser-only | [mBlock online, no install](/en/mblock-online-no-install/) — device add depends on browser |

**Extensions** (optional sensors): use **Extension** or **+ Extension** at the bottom of the palette — see [Makeblock support](https://support.makeblock.com) for your part number.

## FAQ

**Are blocks enough to move the robot?**  
No. Blocks let you **write** the program; you still **connect** the mBot (**USB** recommended at first) and **upload** or test in **Live** mode — see [First steps in mBlock 5](/en/first-steps-mblock-5/).

**Can I use official Scratch instead?**  
Scratch alone does not drive Makeblock hardware. For mBot, use **mBlock** — compare in [mBlock vs Scratch](/en/mblock-vs-scratch/).

**Do I need a Makeblock account?**  
Often not to add the device locally; sign-in may be required for cloud projects — not for this step.

## Indicative prices (October 2026)

| Product | Where to check |
| --- | --- |
| [Makeblock mBot](https://www.amazon.co.uk/s?k=Makeblock+mBot&tag=roboteducatif-21) | Amazon UK (affiliate) |
| [Makeblock mBot](https://www.amazon.com/s?k=Makeblock+mBot&tag=roboteducatif-20) | Amazon.com (affiliate) |

Verify model (mBot vs mBot2) on the product page before ordering.

---

**Next step:** [First mBot program](/en/first-mbot-program/) — upload, board button and a short beep.

*Reviewed 31 October 2026 — Emmanuel Sauvage.*
