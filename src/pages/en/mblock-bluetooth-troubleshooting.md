---
layout: ../../layouts/EnPost.astro
title: "mBlock Bluetooth not connecting? A step-by-step fix for mBot"
description: "mBot, mBot2 or Codey Rocky will not connect in mBlock? Check USB, firmware, PC Bluetooth, pairing, range and interference, in that order. Start with USB."
updated: "23 October 2026"
---

**Bluetooth** between **mBlock** and a robot (**mBot**, **mBot2**, **Codey Rocky**) is often the first source of frustration: USB works, but wireless refuses. The causes fall into a few families: **software**, **PC radio**, **pairing** and **environment**. Here is a checking order that avoids mixing everything up.

## 1. The order to follow (don't skip steps)

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Step</th>
<th scope="col">Check</th>
<th scope="col">Why</th>
</tr></thead><tbody>
<tr>
<td data-label="Step"><span class="td-val">1</span></td>
<td data-label="Check"><span class="td-val"><strong>Prove the robot over USB</strong></span></td>
<td data-label="Why"><span class="td-val">if a USB upload fails, Bluetooth is not the problem</span></td>
</tr>
<tr>
<td data-label="Step"><span class="td-val">2</span></td>
<td data-label="Check"><span class="td-val"><strong>Update mBlock</strong></span></td>
<td data-label="Why"><span class="td-val">use a version compatible with your OS</span></td>
</tr>
<tr>
<td data-label="Step"><span class="td-val">3</span></td>
<td data-label="Check"><span class="td-val"><strong>Update the robot's firmware</strong></span></td>
<td data-label="Why"><span class="td-val">an old firmware can block Bluetooth</span></td>
</tr>
<tr>
<td data-label="Step"><span class="td-val">4</span></td>
<td data-label="Check"><span class="td-val"><strong>PC Bluetooth</strong></span></td>
<td data-label="Why"><span class="td-val">airplane mode, Fn key, drivers</span></td>
</tr>
<tr>
<td data-label="Step"><span class="td-val">5</span></td>
<td data-label="Check"><span class="td-val"><strong>Re-pair cleanly</strong></span></td>
<td data-label="Why"><span class="td-val">remove the old device, then pair again</span></td>
</tr>
<tr>
<td data-label="Step"><span class="td-val">6</span></td>
<td data-label="Check"><span class="td-val"><strong>Range and interference</strong></span></td>
<td data-label="Why"><span class="td-val">test at about 1 m first</span></td>
</tr>
</tbody>
</table>
</div>

## 2. Software and firmware

- Install mBlock from the official site and read the release notes for your model: see [installing mBlock 5](/en/install-mblock-5-windows/).
- Update the firmware following [Makeblock](/en/makeblock-brand/)'s documentation for **your** robot. After a major update, restart both the robot and the PC.

## 3. Bluetooth on the computer

- On a laptop, **airplane mode** or an **Fn key** can switch the radio off without an obvious warning.
- Some **USB Bluetooth adapters** are more stable than the built-in chip: if failures persist, try a recent Bluetooth 5 adapter.

## 4. Windows pairing

- Remove the old device in **Settings → Bluetooth & devices**, then pair again from scratch.
- Close other apps that might hold the robot (remote-control apps, a second mBlock window).

## 5. Range and interference

- Test **close to the computer** first (about 1 m), with no metal wall in between.
- Move away **USB 3.0** devices, which can disturb some 2.4 GHz links (real but not systematic).

## 6. USB or Bluetooth?

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Situation</th>
<th scope="col">Recommendation</th>
</tr></thead><tbody>
<tr>
<td data-label="Situation"><span class="td-val">Classroom, 30 pupils</span></td>
<td data-label="Recommendation"><span class="td-val">USB to <strong>upload</strong>; Bluetooth for tests if the room allows</span></td>
</tr>
<tr>
<td data-label="Situation"><span class="td-val">Competition or demo</span></td>
<td data-label="Recommendation"><span class="td-val">USB, or a setup <strong>tested the day before</strong>: no first Bluetooth connection on the day</span></td>
</tr>
<tr>
<td data-label="Situation"><span class="td-val">Troubleshooting</span></td>
<td data-label="Recommendation"><span class="td-val"><strong>always</strong> validate over USB before blaming the robot</span></td>
</tr>
</tbody>
</table>
</div>

**USB first**, to prove the robot responds. **Bluetooth next**, with mBlock up to date and a clean pairing. Then build the [first mBot program](/en/first-mbot-program/). More guides are in [Tutorials](/en/tutorials/). A USB Bluetooth adapter is only worth trying after the built-in radio has failed these checks. Buy it from a listing that names the adapter, and read that day’s price there.
