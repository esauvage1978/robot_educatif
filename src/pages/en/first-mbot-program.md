---
layout: ../../layouts/EnPost.astro
title: "Your first mBot program in mBlock 5 (step by step)"
description: "Build, test and upload a first mBot program in mBlock 5: start-up event, wait until the on-board button is pressed, play a note, then connect by USB or Bluetooth and upload. Includes the project file."
updated: "23 October 2026"
---

This tutorial takes you **step by step** from the first block in mBlock 5 to **uploading** the program into a [Makeblock](/en/makeblock-brand/) mBot. The program is deliberately simple: at start-up the mBot waits until you press the **button on its board**, then plays a **short note**. The goal is to learn the workflow (open the software → stack blocks → save → connect → test → upload), not advanced algorithms yet.

## Before you start

- An **mBot** (mCore board), batteries charged.
- **mBlock 5** installed: see [how to install mBlock 5 on Windows](/en/install-mblock-5-windows/).
- In mBlock, open the **Devices** tab and add the **mBot** so the orange mBot blocks appear.

## 1. Summary of the program

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

## 2. Save the project

Use **File → Save to your computer**, choose a folder and a name (`.mblock` extension). Save often.

## 3. Connect the mBot

Plug the robot in by **USB** (cable supplied) or prepare a **Bluetooth** pairing, then switch the mBot **ON**. In mBlock, click **Connect** and choose USB or Bluetooth. Bluetooth is handy for **live** tests without a cable; for a **firmware update** or a reliable **upload**, USB is generally recommended.

If Bluetooth refuses to connect, follow our [mBlock Bluetooth troubleshooting](/en/mblock-bluetooth-troubleshooting/) guide.

## 4. Firmware

If mBlock offers a **firmware update**, accept it **over USB only**, with the robot plugged in and batteries charged. Do not unplug the robot during the update.

## 5. Test, then upload

While connected, click the blocks to **check** the behaviour live. When you're happy, switch to **Upload** mode and click **Upload** to write the program into the robot's memory. The mBot then runs the script **without the computer**.

If the upload fails, check the connection and the selected device, then go through the script block by block (blocks properly nested, start-up block present).

## 6. Project file and next steps

Download the project described here: **[premier_programme.mblock](/programmes/premier_programme.mblock)** (mBlock 5 file).

Next, make the tune repeat while the button is held, or forever, with **repeat** / **forever** blocks, and test as you go. Then try the [Arduino C course](/en/arduino/) to write the same logic in code. More guides in [Tutorials](/en/tutorials/).
