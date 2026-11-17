---
layout: ../../layouts/EnPost.astro
title: "Your first mBot program in mBlock 5 (step by step)"
description: "Build, test and upload a first mBot program in mBlock 5: start-up event, wait until the on-board button is pressed, play a note, then connect by USB or Bluetooth and upload. Includes the project file."
updated: "17 November 2026"
schemaUpdated: "2026-11-17"
faqSchema:
  - question: "What blocks do I need for a first mBot program?"
    answer: "Use the mBot start-up event, a wait-until block with the on-board button sensing block, then a play-note block. That is enough to prove connect, test and upload in mBlock 5."
  - question: "USB or Bluetooth for the first mBot session?"
    answer: "Start with USB for firmware updates and reliable upload. Bluetooth is fine for live tests once the robot already works over USB."
  - question: "The mBot does not connect in mBlock — what now?"
    answer: "Confirm you added the mBot (mCore) device in mBlock, update firmware over USB, then follow our Bluetooth troubleshooting guide if you switch to wireless."
  - question: "Where is the project file for this tutorial?"
    answer: "Download premier_programme.mblock from this page — the same block stack described in the step-by-step section."
---

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Your first mBot program in mBlock 5 (step by step)",
  "dateModified": "2026-11-17",
  "inLanguage": "en"
}
</script>

Some links on this page are affiliate links. Check today’s price on the shop page before you order.

<p><em>Last updated 17 November 2026.</em></p>

<div class="article-toc" role="navigation" aria-label="Table of contents">
<p class="article-toc-title">Contents</p>
<ul>
<li><a href="#before">Before you start</a></li>
<li><a href="#summary">Program summary</a></li>
<li><a href="#save">Save the project</a></li>
<li><a href="#connect">Connect the mBot</a></li>
<li><a href="#firmware">Firmware</a></li>
<li><a href="#upload">Test and upload</a></li>
<li><a href="#next">Project file and next steps</a></li>
<li><a href="#buy">Where to buy</a></li>
<li><a href="#faq">FAQ</a></li>
</ul>
</div>

This tutorial takes you **step by step** from the first block in mBlock 5 to **uploading** the program into a [Makeblock](/en/makeblock-brand/) mBot. The program is deliberately simple: at start-up the mBot waits until you press the **button on its board**, then plays a **short note**. The goal is to learn the workflow (open the software → stack blocks → save → connect → test → upload), not advanced algorithms yet.

![Makeblock mBot educational robot with mCore board — typical first program on the on-board button](/images/models/makeblock-mbot-mcore.webp)

*Product photo — Makeblock mBot (mCore) for block programming with mBlock.*

<h2 id="before">Before you start</h2>

- An **mBot** (mCore board), batteries charged.
- **mBlock 5** installed: see [how to install mBlock 5 on Windows](/en/install-mblock-5-windows/).
- In mBlock, open the **Devices** tab and add the **mBot** so the orange mBot blocks appear.

New to the hardware? Read [mBot vs mBot2](/en/mbot-vs-mbot2/) if you are unsure which generation you own.

<h2 id="summary">1. Summary of the program</h2>

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Step</th>
<th scope="col">Block (category)</th>
<th scope="col">What it does</th>
</tr></thead><tbody>
<tr>
<td data-label="Step"><span class="td-val">1</span></td>
<td data-label="Block (category)"><span class="td-val"><em>when mBot(mcore) starts up</em> (mBot / events)</span></td>
<td data-label="What it does"><span class="td-val">entry point when the board is powered on or reset</span></td>
</tr>
<tr>
<td data-label="Step"><span class="td-val">2</span></td>
<td data-label="Block (category)"><span class="td-val"><em>wait until ⟨ ⟩</em> (Control)</span></td>
<td data-label="What it does"><span class="td-val">pauses until the condition becomes true</span></td>
</tr>
<tr>
<td data-label="Step"><span class="td-val">3</span></td>
<td data-label="Block (category)"><span class="td-val"><em>when on-board button pressed?</em> (Sensing)</span></td>
<td data-label="What it does"><span class="td-val">becomes true when you press the board's button</span></td>
</tr>
<tr>
<td data-label="Step"><span class="td-val">4</span></td>
<td data-label="Block (category)"><span class="td-val"><em>play note C4 for 0.25 beats</em> (Show / sound)</span></td>
<td data-label="What it does"><span class="td-val">plays one short note</span></td>
</tr>
</tbody>
</table>
</div>

Block labels can vary slightly between mBlock versions and language settings.

```text
When mBot starts up:
  wait until (on-board button pressed)
  play note C4 for 0.25 beats
```

**Result:** at start-up the robot just waits; **one press** on the board button plays the note **once**. There is no loop, so the action does not repeat on its own.

<h2 id="save">2. Save the project</h2>

Use **File → Save to your computer**, choose a folder and a name (`.mblock` extension). Save often.

<h2 id="connect">3. Connect the mBot</h2>

Plug the robot in by **USB** (cable supplied) or prepare a **Bluetooth** pairing, then switch the mBot **ON**. In mBlock, click **Connect** and choose USB or Bluetooth. Bluetooth is handy for **live** tests without a cable; for a **firmware update** or a reliable **upload**, USB is generally recommended.

If Bluetooth refuses to connect, follow our [mBlock Bluetooth troubleshooting](/en/mblock-bluetooth-troubleshooting/) guide.

<h2 id="firmware">4. Firmware</h2>

If mBlock offers a **firmware update**, accept it **over USB only**, with the robot plugged in and batteries charged. Do not unplug the robot during the update.

<h2 id="upload">5. Test, then upload</h2>

While connected, click the blocks to **check** the behaviour live. When you're happy, switch to **Upload** mode and click **Upload** to write the program into the robot's memory. The mBot then runs the script **without the computer**.

If the upload fails, check the connection and the selected device, then go through the script block by block (blocks properly nested, start-up block present).

<h2 id="next">6. Project file and next steps</h2>

Download the project described here: **[premier_programme.mblock](/programmes/premier_programme.mblock)** (mBlock 5 file).

Next, make the tune repeat while the button is held, or forever, with **repeat** / **forever** blocks, and test as you go. Then try the [Arduino C course](/en/arduino/) to write the same logic in code. More guides in [Tutorials](/en/tutorials/) and the [best programmable robot hub](/en/best-programmable-robot-for-kids/).

<h2 id="buy">Where to buy an mBot (affiliate)</h2>

- <a href="/go/az-gb-b5d4d0b7cd/" rel="sponsored nofollow noopener">Makeblock mBot — Amazon UK</a>
- <a href="/go/az-us-d15f4ee758/" rel="sponsored nofollow noopener">Makeblock mBot — Amazon.com</a>

*Amazon partner — commission possible on qualifying purchases.*

<h2 id="faq">FAQ</h2>

### What blocks for a first mBot program?

Start-up event, **wait until** + **on-board button pressed**, then **play note**. That proves the full mBlock workflow.

### USB or Bluetooth first?

**USB** for the first session and any firmware update. Add Bluetooth only after upload works.

### mBlock does not see the robot

Add **mBot (mCore)** in Devices, use a data USB cable, and read [mBlock Bluetooth troubleshooting](/en/mblock-bluetooth-troubleshooting/).

### Where is the sample file?

**[premier_programme.mblock](/programmes/premier_programme.mblock)** on this page — open it in mBlock 5 to compare with your stack.