---
layout: ../../layouts/EnPost.astro
title: "mBlock Bluetooth not connecting? A step-by-step fix for mBot"
description: "mBot, mBot2 or Codey Rocky will not connect in mBlock? Check USB, firmware, PC Bluetooth, pairing, range and interference, in that order. Start with USB."
updated: "17 November 2026"
schemaUpdated: "2026-11-17"
faqSchema:
  - question: "Should I use USB or Bluetooth first with mBlock?"
    answer: "Always validate the robot over USB before blaming Bluetooth. USB proves the firmware and mBlock device profile; Bluetooth only works reliably after that baseline."
  - question: "Why does mBlock not see my mBot2?"
    answer: "You may have selected mBot (mCore) instead of mBot2 or CyberPi in Devices. Pick the correct generation, update firmware over USB, then pair Bluetooth again."
  - question: "Does low battery break Bluetooth on classic mBot?"
    answer: "Yes. Weak AA cells cause drop-outs. Replace or recharge batteries and test within about one metre of the PC."
  - question: "When is a USB Bluetooth adapter worth trying?"
    answer: "Only after mBlock is current, firmware is updated and Windows pairing was reset. A Bluetooth 5 dongle can beat an old laptop radio."
---

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "mBlock Bluetooth troubleshooting for mBot",
  "dateModified": "2026-11-17",
  "inLanguage": "en"
}
</script>

<p><em>Last updated 17 November 2026.</em></p>

<div class="article-toc" role="navigation" aria-label="Table of contents">
<p class="article-toc-title">Contents</p>
<ul>
<li><a href="#order">Check order</a></li>
<li><a href="#firmware">Software and firmware</a></li>
<li><a href="#pc-bt">PC Bluetooth</a></li>
<li><a href="#windows">Windows pairing</a></li>
<li><a href="#range">Range and interference</a></li>
<li><a href="#usb-vs-bt">USB or Bluetooth?</a></li>
<li><a href="#buy">Hardware links</a></li>
<li><a href="#faq">FAQ</a></li>
</ul>
</div>

**Bluetooth** between **mBlock** and a robot (**mBot**, **mBot2**, **Codey Rocky**) is often the first source of frustration: USB works, but wireless refuses. The causes fall into a few families: **software**, **PC radio**, **pairing** and **environment**. Here is a checking order that avoids mixing everything up.

Not sure which robot you own? Read [mBot vs mBot2](/en/mbot-vs-mbot2/) or [mBot vs Codey Rocky](/en/mbot-vs-codey-rocky/) before you pick the device in mBlock.

<h2 id="order">1. The order to follow (don't skip steps)</h2>

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

![Makeblock mBot with mCore — Bluetooth troubleshooting often starts with USB on this model](/images/models/makeblock-mbot-mcore.webp)

<h2 id="firmware">2. Software and firmware</h2>

- Install mBlock from the official site and read the release notes for your model: see [installing mBlock 5](/en/install-mblock-5-windows/).
- Update the firmware following [Makeblock](/en/makeblock-brand/)'s documentation for **your** robot. After a major update, restart both the robot and the PC.
- Add the correct **device** (mBot mCore, mBot2, Codey Rocky or CyberPi) before connecting.

<h2 id="pc-bt">3. Bluetooth on the computer</h2>

- On a laptop, **airplane mode** or an **Fn key** can switch the radio off without an obvious warning.
- Some **USB Bluetooth adapters** are more stable than the built-in chip: if failures persist, try a recent Bluetooth 5 adapter.

<h2 id="windows">4. Windows pairing</h2>

- Remove the old device in **Settings → Bluetooth & devices**, then pair again from scratch.
- Close other apps that might hold the robot (remote-control apps, a second mBlock window).

<h2 id="range">5. Range and interference</h2>

- Test **close to the computer** first (about 1 m), with no metal wall in between.
- Move away **USB 3.0** devices, which can disturb some 2.4 GHz links (real but not systematic).
- On classic **mBot**, replace **AA** batteries before long Bluetooth sessions.

<h2 id="usb-vs-bt">6. USB or Bluetooth?</h2>

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

**USB first**, to prove the robot responds. **Bluetooth next**, with mBlock up to date and a clean pairing. Then build the [first mBot program](/en/first-mbot-program/). More guides are in [Tutorials](/en/tutorials/).

<h2 id="buy">Hardware links (affiliate)</h2>

- <a href="/go/az-gb-b5d4d0b7cd/" rel="sponsored nofollow noopener">Makeblock mBot — Amazon.com</a>
- <a href="/go/az-gb-a34aebc7e6/" rel="sponsored nofollow noopener">Makeblock mBot2 — Amazon.com</a>
- <a href="/go/az-gb-8919d5eaba" rel="sponsored nofollow noopener">Programmable educational robots — UK search</a>

*Check today's price before ordering.*

<h2 id="faq">FAQ</h2>

### USB or Bluetooth first?

**USB** every time for firmware and first upload.

### mBlock shows the wrong robot

Select **mBot2** or **CyberPi**, not mBot mCore, if you own the new generation.

### Bluetooth drops on classic mBot

Fresh **AA** cells, stay within **1 m**, [install mBlock 5](/en/install-mblock-5-windows/) current.

### Try a Bluetooth dongle?

Only after the six-step table above fails on the built-in radio.