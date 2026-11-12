---
layout: ../../layouts/EnPost.astro
title: "mBlock online (ide.mblock.cc): program without installing"
description: "Program mBot online at ide.mblock.cc with no install: connect, mLink, save .mblock locally. Free 2026 guide for Chrome and Edge."
updated: "30 October 2026"
---

Some links on this page are affiliate links. If you buy through them, we may earn a commission at no extra cost to you. Check today’s price on the shop page — we do not invent prices.

<div class="callout-quick" style="border:2px solid #2563eb;border-radius:12px;padding:1rem 1.25rem;margin:0.75rem 0 1.5rem;background:#eff6ff;color:#1e293b;">
<p style="margin:0 0 0.5rem;font-weight:700;font-size:1.05rem;">Direct access to mBlock online (free, no account required)</p>
<ul style="margin:0 0 0.75rem;padding-left:1.2rem;">
  <li><strong>Official web editor:</strong> <a href="https://ide.mblock.cc/" rel="noopener noreferrer" target="_blank" style="font-weight:700;color:#1d4ed8;">Open ide.mblock.cc in your browser</a> (prefer <strong>Google Chrome</strong> or <strong>Microsoft Edge</strong>).</li>
  <li><strong>Language:</strong> click the <strong>globe</strong> icon at the top left → choose your language (English, French, etc.).</li>
  <li><strong>Save without signing up:</strong> menu <strong>File → Save to your computer</strong> (local <code>.mblock</code> file).</li>
  <li><strong>Prefer the full offline app?</strong> See <a href="/en/download-mblock-5-free/">Download mBlock 5 free (Windows / Mac)</a>.</li>
</ul>
</div>

**mBlock online** (free at **[ide.mblock.cc](https://ide.mblock.cc/)**) lets you program with **Scratch 3–style blocks** and **Python** (on supported devices) **directly in the browser**, without installing the full ~1 GB desktop software. It is ideal on a **Chromebook**, on a **school PC without administrator rights**, or when you need a workshop to start in under 30 seconds.

![mBlock online (ide.mblock.cc) in the browser: Panda stage, Scratch blocks and script area](/images/blog/guides-2026/mblock-online-wikimedia.png)

<h2 id="step-by-step">1. Step-by-step: open ide.mblock.cc in Chrome or Edge</h2>

Here is how to start a session on **mBlock online** in under a minute:

1. **Open Chrome or Edge (recent version)** — Firefox and Safari often restrict serial USB access (**WebSerial** / **WebUSB**). **Google Chrome**, **Microsoft Edge** and **Chromium** support communication with robotics boards natively.
2. **Go to `https://ide.mblock.cc/`** — the workspace loads with the Panda mascot.
3. **Set the interface language** — click the **globe** icon at the top left of the blue bar, then pick **English** (or another language). Categories such as *Motion, Looks, Events, Control, Sensing* update immediately.
4. **Choose your target (Sprites or Devices)**:
   - **Sprites** tab: build an on-screen game or animation like Scratch, with no robot attached.
   - **Devices** tab: program an **mBot**, **mBot2 (CyberPi)**, **mBot Ranger**, **Codey Rocky**, **Halocode** or an **Arduino UNO / Mega** board.

<h2 id="connect-mbot">2. Connect an mBot or mBot2 over USB with mLink / WebUSB</h2>

By default, a browser is isolated from the computer’s hardware for security. For **mBlock online (`ide.mblock.cc`)** to send your program over the robot’s USB cable, two modes coexist:

### Step A — Add the robot in the Devices tab

1. Bottom left under the stage, open the **Devices** tab.
2. If *CyberPi* is shown by default and you use a classic **mBot (v1.1)**, click **+ Add**, select **mBot** in the device library, then confirm with **OK**.
3. To enable extensions (LED matrix, servo, ultrasonic sensor…), click **+ Extension** at the bottom of the blocks column (see [Install mBot blocks](/en/install-mbot-blocks/)).

### Step B — Establish the USB link (mLink 2 or direct Web connection)

1. Plug your **mBot** into the computer with USB and set the robot switch to **ON**.
2. Click the blue **Connect** button at the bottom left of `ide.mblock.cc`.
3. If the **mLink** service is not yet running, mBlock online shows a dialog offering to launch or download **mLink** (a light bridge of about 60 MB for Windows, Mac, Linux, or a Chromebook extension):
   - On **Chromebook**, install the official *mLink* extension from the Chrome Web Store.
   - On **Windows / Mac**, if mLink is already installed, tick **Show all connectable devices**, select the serial port (`COM3`, `COM4` or `/dev/tty.wchusbserial…`) and click **Connect**.
4. Finally choose the mode at the bottom left:
   - **Live mode**: the program runs in real time with the cable attached (ideal for testing with the green flag).
   - **Upload mode**: the code is compiled and flashed into the mBot’s memory so it runs autonomously once the cable is unplugged.

<h2 id="save-without-account">3. Save and reopen a .mblock file without creating an account</h2>

In class or at home, **you do not need a Makeblock account** (which also avoids collecting pupil email addresses):

- **To save your work**: click **File** (top left) → **Save to your computer**. The browser downloads a `.mblock` file to *Downloads* or to a USB stick.
- **To resume a project**: on `ide.mblock.cc`, click **File → Open from your computer** and select your `.mblock` file.
- **Full compatibility**: a `.mblock` file created on `ide.mblock.cc` opens the same way in the desktop [mBlock 5 app](/en/download-mblock-5-free/), and the other way around.

<h2 id="comparison">4. Comparison: mBlock online vs mBlock 5 desktop</h2>

| Criterion | **mBlock online (`ide.mblock.cc`)** | **mBlock 5 desktop (Windows / Mac)** |
|---|---|---|
| **Installation required** | **None** (or a small ~60 MB mLink bridge for USB) | Full installer (~380 MB download, ~1 GB on disk) |
| **Chromebook & locked PCs** | **Well suited** | Not installable on Chromebook |
| **Works offline** | No (must load `ide.mblock.cc`) | **Fully offline** once installed |
| **On-screen Scratch coding** | Immediate, zero setup | Immediate after install |
| **USB upload mBot / mBot2** | Yes via Chrome/Edge + mLink | **Very stable** (CH340 driver included) |
| **Firmware & Bluetooth updates** | More sensitive to browser settings | **Recommended** to restore the default program |

To compare also with the tablet app **mBlock Blockly** and the **Python** editor, see [Which mBlock software to choose](/en/mblock-software-which-to-choose/).

<h2 id="troubleshooting">5. Troubleshooting: why is my mBot not detected online?</h2>

1. **No COM port appears in the Connect window**:
   - Check that the mBot switch is **ON** and that you use a data USB cable (some phone charge cables have no data wires).
   - Tick **Show all connectable devices** in the connection window.
   - If the serial driver is missing on Windows, install the **CH340** driver via mLink or follow [Install mBlock 5 on Windows](/en/install-mblock-5-windows/).
2. **You are using Firefox or Safari**:
   - Open `https://ide.mblock.cc/` in **Google Chrome** or **Microsoft Edge**, the browsers that support Makeblock’s full hardware features.
3. **Bluetooth drops or refuses to pair**:
   - Never pair the mBot in the Windows Bluetooth settings first: go through the **Connect** button in mBlock. Full details: [mBlock Bluetooth troubleshooting](/en/mblock-bluetooth-troubleshooting/).

<h2 id="compatible-robots">6. Compatible robots</h2>

Makeblock’s educational robots can be programmed from `ide.mblock.cc`. Check the listing name and today’s price before buying:

- **[Makeblock mBot (ages ~8–12)](https://www.amazon.co.uk/dp/B07XR98YYQ?tag=roboteducatif-21)** — school classic · Scratch blocks & Arduino · [Amazon.com](https://www.amazon.com/dp/B07XR98YYQ?tag=roboteducatif-20) · [check price on Amazon UK](https://www.amazon.co.uk/dp/B07XR98YYQ?tag=roboteducatif-21)
- **[Makeblock mBot2 CyberPi (ages ~10–14)](https://www.amazon.co.uk/dp/B0919F9CKS?tag=roboteducatif-21)** — colour screen, Wi‑Fi, rechargeable battery · blocks & Python · [Amazon.com](https://www.amazon.com/dp/B0919F9CKS?tag=roboteducatif-20)
- **[Makeblock Codey Rocky (ages ~6–12)](https://www.amazon.co.uk/dp/B07CGH8NZ7?tag=roboteducatif-21)** — ready to play, expressive LED matrix · Scratch & Python · [Amazon.com](https://www.amazon.com/s?k=Makeblock+Codey+Rocky&tag=roboteducatif-20)

<h2 id="faq">7. FAQ — mBlock online</h2>

### How do I open mBlock online for free?

Open **https://ide.mblock.cc** in Chrome or Edge, then click the **globe** icon at the top left and choose your language.

### Can I program a real mBot with mBlock online?

Yes: connect the mBot over USB, click **Connect** at the bottom left of `ide.mblock.cc`, and use the **mLink** bridge (or the Chromebook extension) to upload your code.

### How do I save a project without an account?

Use **File → Save to your computer** to download your `.mblock` file locally.

### When should I prefer the PC/Mac download?

Whenever you work offline or need to update the mBot’s USB firmware: follow [Download mBlock 5 free](/en/download-mblock-5-free/).

## Classroom tips for ide.mblock.cc

On locked school PCs, bookmark **https://ide.mblock.cc/** and install only the **mLink** Chromebook extension or the lightweight Windows/Mac bridge when USB is required. Ask pupils to save a .mblock copy to a USB stick or cloud folder at the end of each session — browser cache alone is not a backup.

If several robots share one room, label each USB cable and COM port. In Live mode, only one browser tab should own the serial port; closing the tab or refreshing often releases it.

When you later need offline firmware restore or frequent Upload sessions without Wi‑Fi, switch to the [desktop download guide](/en/download-mblock-5-free/) and keep the same .mblock files.

## Modes Live vs Upload — when to use which

| Situation | Prefer |
|---|---|
| Debugging blocks with the green flag while watching sensors | **Live** (cable attached) |
| Robot must drive alone on the floor without the PC | **Upload** |
| Updating or restoring default firmware | Prefer **desktop mBlock 5** |
| Quick Scratch game with no hardware | Sprites tab — no Connect needed |

Live mode is ideal for the first lesson of the day. Upload is the goal once the program is stable.

## Product cards (check today’s price)

### Makeblock mBot (~8–12 years)

School classic · Scratch blocks and Arduino path later. Confirm the listing is the Bluetooth/USB educational kit, not a spare board only.

- [Amazon.co.uk — check price](https://www.amazon.co.uk/dp/B07XR98YYQ?tag=roboteducatif-21)
- [Amazon.com — check price](https://www.amazon.com/dp/B07XR98YYQ?tag=roboteducatif-20)

### Makeblock mBot2 CyberPi (~10–14 years)

Colour screen, Wi‑Fi, rechargeable battery · blocks and Python. Ideal when you want one robot that grows with the learner.

- [Amazon.co.uk — check price](https://www.amazon.co.uk/dp/B0919F9CKS?tag=roboteducatif-21)
- [Amazon.com — check price](https://www.amazon.com/dp/B0919F9CKS?tag=roboteducatif-20)

### Makeblock Codey Rocky (~6–12 years)

Ready to play with little or no build · expressive LED matrix · Scratch and Python.

- [Codey Rocky on Amazon.co.uk — £115 on 9 November 2026](https://www.amazon.co.uk/dp/B07CGH8NZ7?tag=roboteducatif-21)
- [Amazon.com search](https://www.amazon.com/s?k=Makeblock+Codey+Rocky&tag=roboteducatif-20)

Related guides: [Which mBlock software](/en/mblock-software-which-to-choose/), [First steps in mBlock 5](/en/first-steps-mblock-5/), [Bluetooth troubleshooting](/en/mblock-bluetooth-troubleshooting/).

## Privacy note for schools

mBlock online can be used **without creating a Makeblock account**. Prefer **File → Save to your computer** so pupil work stays on school storage or a personal stick. If your school policy requires accounts, follow your IT charter and avoid entering personal emails for younger pupils.

WebSerial / WebUSB prompts are browser security dialogs: pupils should only accept them for a robot they physically connected.

## Chromebook workflow (summary)

1. Open Chrome → ide.mblock.cc  
2. Install **mLink** from the Chrome Web Store if USB is needed  
3. Devices → add mBot or mBot2 → Connect  
4. Save .mblock before logging out of the Chromebook session  

This workflow avoids installing the ~1 GB desktop app on managed devices.

## Next steps after connecting

Once Live mode works, try a one-block test: set both RGB LEDs to red for one second. Then open [First steps in mBlock 5](/en/first-steps-mblock-5/) or [Install mBot blocks](/en/install-mbot-blocks/) if extensions are missing. For Bluetooth-only setups, read [Bluetooth troubleshooting](/en/mblock-bluetooth-troubleshooting/) before changing Windows pairing settings.

*Author: Emmanuel Sauvage.*
