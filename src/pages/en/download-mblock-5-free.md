---
layout: ../../layouts/EnPost.astro
title: "Download mBlock 5 free: official link and online IDE"
description: "Download mBlock 5 free from the official Makeblock site (Windows, Mac) or code on ide.mblock.cc with no install. CH340 mBot driver, UAC tips and troubleshooting — Oct 2026 guide."
updated: "31 October 2026"
schemaUpdated: "2026-10-31"
faqSchema:
  - question: "Where can I download mBlock 5 for free?"
    answer: "Use only the official Makeblock page mblock.cc/en-us/download, download the Windows 64-bit .exe (about 380 MB) or macOS .dmg, then run the installer. Switch the interface language with the globe icon at the top left."
  - question: "Do I need an account to use mBlock 5?"
    answer: "No. Offline use, saving projects on your computer and USB upload to an mBot or mBot2 work without registration. A Makeblock account is only for cloud backup."
  - question: "How do I install the mBot USB CH340 driver in 3 minutes?"
    answer: "At the end of the mBlock 5 installation, confirm the Setup_Driver_CH341 window and click Install. Your robot will appear on a COM port when you plug in USB."
  - question: "What if I cannot install anything on the computer?"
    answer: "Open ide.mblock.cc in Chrome or Edge, or follow our mBlock online guide. No 380 MB download is required."
  - question: "What is the difference between mblock.cc and ide.mblock.cc?"
    answer: "mblock.cc/download is for downloading the mBlock 5 desktop app (Windows/Mac). ide.mblock.cc is the online IDE: you program in the browser without installing the desktop app."
  - question: "Is mBlock 5 really free?"
    answer: "Yes. The official Makeblock installer and the browser version are free. Avoid mirror sites and crack links."
---

Some links on this page are affiliate links. If you buy through them, we may earn a commission at no extra cost to you. **Amazon UK** is the default shop below for UK readers; **Amazon.com** buttons are for US buyers. Check today’s listing — we do not invent local prices.

<div class="callout-no-install" style="border:2px solid #0f766e;border-radius:12px;padding:1rem 1.25rem;margin:0.75rem 0 1.5rem;background:#f0fdfa;color:#134e4a;font-size:1.03rem;">
<strong>Prefer not to install anything?</strong> Open the official <strong>IDE</strong> (integrated development environment: the window where you snap blocks together) at <a href="https://ide.mblock.cc/" rel="noopener noreferrer" target="_blank" style="font-weight:700;color:#0f766e;text-decoration:underline;">ide.mblock.cc</a> (mBlock online), then follow our guide <a href="/en/mblock-online-no-install/" style="font-weight:700;color:#0f766e;text-decoration:underline;">mBlock online with no install</a>. This page is only for <strong>downloading</strong> the Windows/Mac desktop app.
</div>

<div class="callout-quick" style="border:2px solid #2b7de9;border-radius:12px;padding:1rem 1.2rem;margin:0 0 1.25rem;background:#f2f7ff;color:#1f2430;">
<strong>Direct answer (October 2026)</strong> — To <strong>download mBlock 5 free</strong>, open the official <a href="https://www.mblock.cc/en-us/download/">Makeblock Download</a> page, get the <strong>Windows 10/11 (64-bit)</strong> or <strong>Mac</strong> installer (~380&nbsp;MB), click <strong>Yes</strong> on the Windows <strong>UAC</strong> prompt (<strong>User Account Control</strong>), let the setup finish, then install the <strong>CH340 driver</strong> to connect an <a href="/en/mbot-my-first-educational-robot/">mBot</a> over USB. No admin rights: use <a href="/en/mblock-online-no-install/">mBlock online</a>.
</div>

<p><strong>Downloading mBlock 5 for free</strong> usually takes **under 3 minutes** for download, UAC confirmation and USB driver setup — copying files depends on your disk speed. Whether you are setting up a family PC on <strong>Windows 10 or Windows 11</strong>, a <strong>Mac (Intel or Apple Silicon M1/M2/M3)</strong> or a classroom, you will find below the <strong>verified official links</strong>, <strong>real screenshots</strong>, steps to install the <strong>USB CH340 driver for mBot</strong> (serial chip so Windows or macOS sees the robot on a <code>COM</code> port), and how to switch the interface to your language <strong>without a mandatory account</strong>.</p>

<h2 id="official-download">1. Verified official links (Windows 10/11, Mac, Linux, tablet)</h2>

Never download mBlock from third-party mirror sites: always get the installer signed by **Makeblock Co., Ltd.** so that the mBot, mBot2 (**CyberPi**: Makeblock’s Wi-Fi control board for mBot2) libraries and the USB serial driver are included automatically.

| Operating system | Recommended official version (2026) | Indicative size | USB CH340 driver included |
|---|---|---|---|
| **PC Windows 10 / Windows 11 (64-bit)** | `mBlock 5 PC Version (.exe)` on [mblock.cc/download](https://www.mblock.cc/en-us/download/) | ~380 MB (≈ 1.05 GB installed) | Yes (automatic) |
| **Mac (macOS Intel & Apple M1/M2/M3)** | `mBlock 5 Mac Version (.dmg/.pkg)` on [mblock.cc/download](https://www.mblock.cc/en-us/download/) | ~390 MB | Yes |
| **Chromebook / locked school PC** | Dedicated guide: <a href="/en/mblock-online-no-install/">program with mBlock online with no install</a> | 0 MB (browser) | Via **WebUSB** (USB from the browser) and **mLink** (Makeblock bridge for the serial port) |
| **iPad (iOS) / Android tablet** | *mBlock* app on App Store / Google Play | ~180 MB | Bluetooth connection |

![Screenshot: official Makeblock download page for mBlock 5 on Windows](/images/blog/installer-mblock/ecran-01-page-makeblock.png)

*Screenshot: Makeblock Download page (mblock.cc), Windows section. Credit: Emmanuel Sauvage, Robot Éducatif — October 2026.*

<div class="article-cta-row" style="display:flex;flex-wrap:wrap;gap:0.75rem;margin:1.25rem 0;">
<a class="article-cta article-cta--primary" href="https://www.mblock.cc/en-us/download/" rel="noopener noreferrer" target="_blank" style="background:#1d4ed8;color:#fff;padding:0.7rem 1.2rem;border-radius:8px;font-weight:700;text-decoration:none;">Open the official Makeblock Download page</a>
<a class="article-cta article-cta--secondary" href="/en/mblock-online-no-install/" style="background:#0f766e;color:#fff;padding:0.7rem 1.2rem;border-radius:8px;font-weight:700;text-decoration:none;">Program with mBlock online (no install)</a>
</div>

<h2 id="windows">2. Install mBlock 5 on Windows 10 and Windows 11</h2>

**Quick prerequisites:** Internet for the ~380 MB download, a Windows **administrator** account (or an adult who can click **Yes** on UAC), about **1.5–2 GB** free on the system drive.

1. **Download the official executable** (`V5.6.x.exe`, about 380 MB) from **mBlock PC version → Download for Windows** on Makeblock’s official page.
2. **Run the `.exe` file** from your *Downloads* folder (`Ctrl + J` in Chrome, Edge or Firefox).

![Screenshot: Windows File Explorer — mBlock installer in Downloads](/capture/installer-mblock-5-sous-windows-10/explorateur_telechargement.png)

*Double-click the `.exe` you just downloaded. Credit: Emmanuel Sauvage, Robot Éducatif — October 2026.*

3. **Confirm the Windows UAC prompt** — **User Account Control** asks whether you allow changes — click **Yes**. Without admin rights, ask for help or use <a href="/en/mblock-online-no-install/">mBlock online</a>.
4. **SmartScreen**: if Windows shows *“Windows protected your PC”*, click **More info** then **Run anyway** only when the publisher is **Makeblock** and the file came from [mblock.cc](https://www.mblock.cc/en-us/download/).
5. **Progress**: recent installers copy files into `Program Files` without extra questions or adware.

![Screenshot: mBlock 5 installation progress on Windows](/images/blog/installer-mblock/ecran-09-progression.png)

*Progress bar while files are copied (Windows 10/11). Credit: Emmanuel Sauvage, Robot Éducatif — October 2026.*

6. **Finish screen**: click **Finish** when the wizard offers it.

![Screenshot: end of the mBlock 5 desktop installer](/capture/installer-mblock-5-sous-windows-10/installation_fin.png)

*End of the setup wizard. Credit: Emmanuel Sauvage, Robot Éducatif — October 2026.*

For extra SmartScreen steps and disk-size checks, see [Install mBlock 5 on Windows 10 and 11 step by step](/en/install-mblock-5-windows/) or [mBlock Bluetooth/USB troubleshooting](/en/mblock-bluetooth-troubleshooting/) if the robot does not show up later.

<h2 id="ch340-driver">3. mBot USB driver (CH340): the key step not to close</h2>

At the end of the mBlock 5 installation, a small window titled **Driver Setup (CH340 / CH341SER)** opens on top of the installer:

- Click **Install** and wait for the message *Driver install success*.
- The **CH340** is a common USB-serial chip on the **mBot mCore board**; this driver is essential so Windows or macOS recognises the robot or an **Arduino UNO / Nano** on a serial port (`COM3`, `COM4`, etc.).
- **No mandatory registration**: when mBlock 5 opens, you do not need to create an account to program, save `.mblock` files to your hard drive, or upload to the robot.

![Screenshot: mBlock 5 installation finished on Windows](/images/blog/installer-mblock/ecran-10-termine.png)

*Screenshot: end of the mBlock 5 desktop installation on Windows. Credit: Emmanuel Sauvage, Robot Éducatif — October 2026.*

<h2 id="macos">4. Installation on Mac (macOS), Linux and Chromebook</h2>

- **On Mac**: open the downloaded `.dmg` or `.pkg` file, drag the **mBlock** icon into the **Applications** folder. On first launch, if macOS blocks opening, go to **System Settings → Privacy & Security → Open Anyway**.
- **On Linux (Ubuntu, Debian, Raspberry Pi OS)**: prefer the browser version with the **mLink** Linux serial bridge (see [mBlock online](/en/mblock-online-no-install/)).
- **On Chromebook**: no `.exe` installer — use [mBlock online](/en/mblock-online-no-install/) with **mLink** in Chrome.

<h2 id="no-install">5. Browser alternative (locked PC or Chromebook)</h2>

If you are on a school computer without an administrator password, or on a Chromebook, there is no need to download the 380 MB installer:

<div class="callout-web-link" style="border-left:4px solid #2563eb;background:#eff6ff;padding:0.9rem 1.15rem;border-radius:8px;margin:1rem 0;">
<strong>Direct browser access:</strong> follow our dedicated tutorial to <a href="/en/mblock-online-no-install/">program with mBlock online with no install</a> (language settings, USB/Bluetooth connection with mLink in Chrome or Edge, and local project saving).
</div>

And if you are still unsure between the desktop PC/Mac version, the mobile/tablet Blockly app and the Python editor, see our comparison [Which mBlock software to choose for mBot?](/en/mblock-software-which-to-choose/).

<h2 id="after-download">6. Set the language and connect the mBot</h2>

1. **Change mBlock 5 language**: click the **globe** icon at the top left of the menu bar and select your language (e.g. English or French).
2. **Select your robot**: in the **Devices** tab (bottom left), click **+ Add**, choose **mBot** (or **CyberPi / mBot2**), then click **OK**.
3. **Connect over USB**: power on the robot, plug in the USB cable, click **Connect** and confirm the detected `COM` port.
4. **Test a first script**: follow our guides [First steps with mBlock 5](/en/first-steps-mblock-5/) and [Install mBot blocks](/en/install-mbot-blocks/).

<h2 id="which-robot">7. Which robot to use with mBlock 5?</h2>

The product box at the bottom of this page summarises mBot / mBot2 links for this tutorial. **The cards below** list popular models with **indicative** UK/US prices (verify on Amazon before you buy).

Downloading mBlock 5 to prepare a gift or equip a workshop? Here are Makeblock robots officially supported:

<div class="merchant-cards-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem;margin:1.25rem 0;">
  <div style="border:1px solid #dce3ee;border-radius:12px;padding:1rem;background:#fff;">
    <h3 style="margin:0 0 0.35rem;font-size:1.1rem;"><a href="https://www.amazon.co.uk/dp/B07XR98YYQ?tag=roboteducatif-21" rel="sponsored nofollow noopener" target="_blank">Makeblock mBot (v1.1 Bluetooth)</a></h3>
    <p style="margin:0 0 0.5rem;font-size:0.92rem;color:#475569;">Ideal from age 8 (mBlock blocks) · About 15 min build</p>
    <p style="margin:0 0 0.75rem;font-weight:700;"><a href="https://www.amazon.co.uk/dp/B07XR98YYQ?tag=roboteducatif-21" rel="sponsored nofollow noopener" target="_blank" style="color:#0f172a;text-decoration:underline;">Indicative: ~£75–95 (check today’s price)</a></p>
    <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
      <a href="https://www.amazon.co.uk/dp/B07XR98YYQ?tag=roboteducatif-21" rel="sponsored nofollow noopener" target="_blank" class="affiliate-link" data-product-id="mbot" data-placement="content" style="background:#ff9900;color:#111;font-weight:700;padding:0.45rem 0.8rem;border-radius:8px;text-decoration:none;font-size:0.88rem;">View on Amazon UK</a>
      <a href="https://www.amazon.com/dp/B07XR98YYQ?tag=roboteducatif-20" rel="sponsored nofollow noopener" target="_blank" class="affiliate-link" data-product-id="mbot" data-placement="content" style="background:#f1f5f9;color:#0f172a;font-weight:700;padding:0.45rem 0.8rem;border-radius:8px;text-decoration:none;font-size:0.88rem;border:1px solid #cbd5e1;">View on Amazon.com</a>
    </div>
  </div>
  <div style="border:1px solid #dce3ee;border-radius:12px;padding:1rem;background:#fff;">
    <h3 style="margin:0 0 0.35rem;font-size:1.1rem;"><a href="https://www.amazon.co.uk/dp/B0919F9CKS?tag=roboteducatif-21" rel="sponsored nofollow noopener" target="_blank">Makeblock mBot2 (with CyberPi Wi-Fi)</a></h3>
    <p style="margin:0 0 0.5rem;font-size:0.92rem;color:#475569;">Ideal ages 10–14 (mBlock blocks + Python) · Built-in battery about 5 h</p>
    <p style="margin:0 0 0.75rem;font-weight:700;"><a href="https://www.amazon.co.uk/dp/B0919F9CKS?tag=roboteducatif-21" rel="sponsored nofollow noopener" target="_blank" style="color:#0f172a;text-decoration:underline;">Indicative: ~£140–165 (check today’s price)</a></p>
    <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
      <a href="https://www.amazon.co.uk/dp/B0919F9CKS?tag=roboteducatif-21" rel="sponsored nofollow noopener" target="_blank" class="affiliate-link" data-product-id="mbot2" data-placement="content" style="background:#ff9900;color:#111;font-weight:700;padding:0.45rem 0.8rem;border-radius:8px;text-decoration:none;font-size:0.88rem;">View on Amazon UK</a>
      <a href="https://www.amazon.com/dp/B0919F9CKS?tag=roboteducatif-20" rel="sponsored nofollow noopener" target="_blank" class="affiliate-link" data-product-id="mbot2" data-placement="content" style="background:#f1f5f9;color:#0f172a;font-weight:700;padding:0.45rem 0.8rem;border-radius:8px;text-decoration:none;font-size:0.88rem;border:1px solid #cbd5e1;">View on Amazon.com</a>
    </div>
  </div>
</div>

<h2 id="troubleshooting">8. Download and install troubleshooting</h2>

| Symptom | Likely cause | What to do |
|---|---|---|
| Download blocked or “suspicious” file | Antivirus, school filter | Download only from [mblock.cc](https://www.mblock.cc/en-us/download/); add an exception after checking the source; or use [mBlock online](/en/mblock-online-no-install/) |
| **No** clicked on UAC | No admin rights | Retry with an admin account or open [ide.mblock.cc](https://ide.mblock.cc/) |
| SmartScreen blocks the installer | Unknown file reputation | **More info → Run anyway** if publisher is **Makeblock** |
| mBot plugged in, no **COM** port | CH340 driver skipped | Re-run **Setup_Driver_CH341** or read [Bluetooth/USB troubleshooting](/en/mblock-bluetooth-troubleshooting/) |
| Interface stuck in English | Default installer language | **Globe icon** → your language; see [First steps with mBlock 5](/en/first-steps-mblock-5/) |
| mBot blocks missing from palette | Extensions not loaded | [Install mBot blocks](/en/install-mbot-blocks/) |

<h2 id="faq">9. FAQ — Download mBlock 5</h2>

### Where can I download mBlock 5 for free?

Go to the official page **mblock.cc/en-us/download**, choose **mBlock PC version** (Windows or Mac) and run the installer. Switch the interface language via the globe icon at the top left.

### Do I need to create an account to use mBlock 5?

**No.** Offline use, saving projects on the computer and USB upload to an mBot or mBot2 work without an account or registration. A Makeblock account is only for cloud backup.

### How do I install the mBot USB CH340 driver in 3 minutes?

Confirm the **Setup_Driver_CH341** window that appears automatically at the end of the mBlock 5 installation. Click **Install**: your robot will be recognised on a COM port from the first USB connection.

### What if I cannot install anything on the computer?

Open **[ide.mblock.cc](https://ide.mblock.cc/)** (mBlock 5 online), or follow our guide to <a href="/en/mblock-online-no-install/">program with mBlock online with no install</a> from Chrome or Edge.

### What is the difference between mblock.cc and ide.mblock.cc?

**mblock.cc/download** is for **downloading** the mBlock 5 desktop app (Windows / Mac). **ide.mblock.cc** is the **online IDE** (integrated development environment): you program in the browser with no ~380 MB install.

### Is mBlock 5 really free?

Yes. The official Makeblock installer and the browser version are free. Avoid mirror sites and “crack” links — use only [Makeblock Download](https://www.mblock.cc/en-us/download/) or [ide.mblock.cc](https://ide.mblock.cc/).

<p style="margin-top:1.5rem;font-size:0.92rem;color:#64748b;">Guide updated 31 October 2026 — <strong>Emmanuel Sauvage</strong>, Robot Éducatif.</p>
