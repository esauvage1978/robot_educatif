---
layout: ../../layouts/EnPost.astro
title: "Raspberry Pi 3 kit: getting started and OS installation"
description: "Raspberry Pi 3 Model B: micro-USB hardware, Imager, 32-bit Raspberry Pi OS, Wi‑Fi, SSH and troubleshooting. A beginner tutorial."
updated: "31 October 2026"
---

Some links on this page are affiliate links. If you buy through them, we may earn a commission at no extra cost to you. Check today’s price on the shop page — we do not invent prices.

The **Raspberry Pi 3 Model B** (2016) remains an affordable entry into **embedded Linux**, **programming** (Python, C…) and **General Purpose Input/Output (GPIO, 40 pins)** projects (LEDs, sensors, small desk robots). It is no longer the newest board, but the **getting-started workflow** is the same for many Pi boards: **microSD card**, **Raspberry Pi OS**, **network**, **updates**, then **remote access** (**SSH**, Secure Shell: a remote terminal; **VNC**, Virtual Network Computing: a remote desktop).

This tutorial walks you **step by step**. It updates the old name **Raspbian** (today **Raspberry Pi OS**) and uses modern **Imager** options (Wi‑Fi, SSH, user) so you can avoid needing a screen on first boot.

Compare boards: [Pi 3 vs 4 vs 5](/en/raspberry-pi-3-vs-4-vs-5/). RAM choices: [Pi 4 which RAM](/en/raspberry-pi-4-which-ram/), [Pi 5 which RAM](/en/raspberry-pi-5-which-ram/).

## 1. Reminder: what a Raspberry Pi 3 Model B is

| Item | Useful detail |
|------|----------------|
| **CPU** | Broadcom BCM2837, quad-core **~1.2 GHz** (**ARMv8** architecture; Raspberry Pi OS for this board usually runs in **32-bit** userland even though the CPU can do 64-bit — pick the **32-bit OS** image unless you have a clear reason for 64-bit) |
| **Memory** | **1 GB** LPDDR2 RAM |
| **Network** | **100 Mbit/s** Ethernet, **802.11n** Wi‑Fi, **Bluetooth 4.1** |
| **USB** | 4× USB 2.0 ports |
| **Video** | Full-size **HDMI** (not micro-HDMI as on Pi 4/5) |
| **Storage** | **microSD card** (operating system) |
| **GPIO** | **General Purpose Input/Output (GPIO, 40 pins)** — compatible with many cases and **HATs** (**Hardware Attached on Top**: add-on boards that sit on the 40-pin header) |

*In practice*: for **4K multimedia**, a very smooth **desktop** or **USB 3**, a **Pi 4** or **Pi 5** is more comfortable; for **learning**, **light smart home**, a modest **server** or small-scale **robotics**, a Pi 3 can still be enough — especially if you already own one.

**Illustration (real board)** — Raspberry Pi 3 Model B:

![Raspberry Pi 3 Model B, top view — USB, Ethernet, GPIO connectors](/images/blog/raspberry-pi3-mise-en-route/raspberry-pi-3-model-b-sven-petersen-cc-by-sa-4.webp)

*Photo: [Sven.petersen](https://commons.wikimedia.org/wiki/File:9815_-_Raspberry_Pi_3.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), via Wikimedia Commons.*

## 2. Required hardware

- The **Raspberry Pi 3 Model B** board.
- **microSD card**: 16 GB or more, **A1/A2 class** or a reliable brand; 32 GB remains a good compromise.
- **Power supply**: **5 V** via **micro-USB**, current **≥ 2.5 A** recommended (undervoltage = odd screens or reboots).
- **Display + keyboard + mouse** (optional if you prepare everything with **Imager** in headless mode).
- **Network cable** or Wi‑Fi; for the first boot, **wired Ethernet** avoids one troubleshooting step.

Common connection diagram (power, HDMI, SD area):

![Usual Raspberry Pi 3 Model B connections](/images/blog/raspberry-pi3-mise-en-route/connexions-pi3.svg)

## 3. Prepare the SD card with Raspberry Pi Imager

The official **Raspberry Pi Imager** writes **Raspberry Pi OS** (or another image) to the microSD from a Windows, macOS or Linux PC.

1. Download **Imager** from the official page: [https://www.raspberrypi.com/software/](https://www.raspberrypi.com/software/)
2. Install it, insert the **microSD** (USB adapter if needed).
3. Launch Imager; follow **CHOOSE OS → CHOOSE STORAGE → WRITE**.

![Logical flow: OS, storage, write, then insert into the Pi](/images/blog/raspberry-pi3-mise-en-route/imager-etapes.svg)

### 3.1 Which OS for a Pi 3?

<aside class="article-callout" role="note">
<p><strong>32-bit OS vs ARMv8 CPU</strong></p>
<p>The Pi 3 CPU is <strong>ARMv8</strong> (64-bit capable), but for learning and light servers the usual choice is still <strong>Raspberry Pi OS 32-bit</strong>: lighter RAM use and the widest tutorials. Choose <strong>64-bit</strong> only if a package you need requires it and you accept a bit more memory pressure on 1 GB RAM.</p>
</aside>

- **Raspberry Pi OS (32-bit)**: the most **documented** and **lightweight** choice for this board.
- **Raspberry Pi OS (64-bit)**: possible on Pi 3, sometimes a bit more **RAM-hungry**; test according to your use.

Avoid a heavy desktop if you mainly want a **server** or **robotics**: the **Lite** image (no GUI) is ideal for SSH-only setups.

### 3.2 Advanced options (strongly recommended)

Before writing the card, open the **gear icon** (*Advanced options*) in Imager. You can often:

- set the **hostname** (e.g. `raspberrypi.local`);
- enable **SSH** and **password** or **key** authentication;
- configure **Wi‑Fi** (SSID, the name of your Wi‑Fi network, + password);
- create a **user account** and **password** (on recent images, the historic `pi` / `raspberry` pair is **no longer** the forced default — everything is set here or on first boot).

That is what enables a **headless** first boot: the board joins the network, SSH is ready, you connect from another PC.

### 3.3 Write and finish

- Confirm the **selected disk** really is your **microSD** (all content will be erased).
- Wait for writing and **verification** if offered.
- Eject the card cleanly, insert it **into the Pi** (contacts facing up, short side according to the case).

## 4. First boot and wizard

1. Plug in the **display and keyboard** first if you use them, then the micro-USB **power** supply.
2. On first launch, a **wizard** (depending on version) may ask for: **country**, **language**, **timezone**, account **password**, HDMI **fullscreen**, **Wi‑Fi**, software **updates**.

**Tip**: accept the **updates** offered at the end of the wizard, or run them manually (next section).

If you preconfigured everything in Imager and use **SSH only**, this wizard may be minimal or already skipped — depending on the exact image.

## 5. Update the system (essential)

Open a terminal on the Pi (or an SSH session):

```bash
sudo apt update
sudo apt full-upgrade -y
sudo reboot
```

This aligns **Raspberry Pi OS** and packages with security patches. Repeat regularly on a machine exposed to the network.

## 6. Enable SSH and VNC afterwards

If you did not enable SSH in Imager:

- Menu **Preferences** → **Raspberry Pi Configuration** (or `sudo raspi-config`) → **Interfaces** tab:
  - **SSH**: **Enabled** for remote console;
  - **VNC**: **Enabled** for remote desktop (**RealVNC** server built into Raspberry Pi OS with desktop).

Reboot if asked. To connect with VNC from another PC, use **VNC Viewer** (official client) with the Pi’s **IP address** or `raspberrypi.local` (mDNS).

## 7. Connect over SSH from Windows

1. On the Pi: note the **IP address** (`hostname -I` or network menu).
2. On Windows 11, **OpenSSH** is often available: open **PowerShell** or **Terminal** and type `ssh user@ip_address` (replace with the user created at install).
3. Otherwise, **PuTTY** remains a common graphical SSH client.

**Security**: change any default password, and prefer an **SSH key** over a password when exposing the Pi to the Internet.

## 8. Transfer files: prefer SFTP over “classic FTP”

With **SSH** enabled, you already have **SFTP** (SSH File Transfer Protocol): same **port 22**, encryption included.

- **FileZilla**: protocol **SFTP**, host = Pi IP, user / password (or key), port **22**.
- No need to install **vsftpd** for home or classroom use; unencrypted **FTP** (port 21) is **discouraged** on an uncontrolled network.

*(An older version of this article detailed **vsftpd**: still possible for very specific needs, but SFTP covers almost all “send a file to the Pi” cases.)*

## 9. Quick troubleshooting

| Symptom | Hint |
|---------|------|
| **Yellow lightning** icon in a screen corner | Often **undervoltage** or a thin micro-USB cable — try a quality **5 V / 2.5 A** supply. |
| Black screen at boot | Check **HDMI**, sometimes plug it **after** power-on; try another resolution in `raspi-config`. |
| No IP / no Wi‑Fi | Ethernet cable for testing; check SSID / password entered in **Imager**; router that accepts the Pi. |
| SSH “connection refused” | SSH not enabled: attach a screen once or reflash the card with Imager (advanced options). |

## 10. Pi 3 and next steps

Once the **system base** is stable, you can move on to **code projects** (Python, GPIO), **servers** (web, small NAS, home VPN), or compare with an all-in-one **educational robot** if the goal is mainly mechanics and a guided path. For teens choosing between a board and a ready robot, start with [best robot for a 12-year-old](/en/best-robot-for-a-12-year-old/) and [best educational robot 2026](/en/best-educational-robot-2026/).

## Raspberry Pi 3 compatible hardware (affiliate)

This tutorial is about the **Pi 3**: it is powered through **micro-USB** (not USB-C as on the Pi 4 and Pi 5) and a **32-bit** system is recommended to start with. The links below target this hardware. **Check** the connector, the current rating and the compatibility on each product page before buying, because prices change. Kit, microSD and book links are searches so you can compare current offers. The power-supply link points to the official micro-USB 5 V / 2.5 A reference used for the Pi 3; still check the connector on the listing.

- [Raspberry Pi 3 Model B kit — Amazon.co.uk](https://www.amazon.co.uk/s?k=Raspberry+Pi+3+Model+B+kit&tag=roboteducatif-21) · [Amazon.com](https://www.amazon.com/s?k=Raspberry+Pi+3+Model+B+kit&tag=roboteducatif-20)
- [microSD card 32 GB A1 — Amazon.co.uk](https://www.amazon.co.uk/s?k=microSD+32GB+A1+Raspberry+Pi&tag=roboteducatif-21) · [Amazon.com](https://www.amazon.com/s?k=microSD+32GB+A1+Raspberry+Pi&tag=roboteducatif-20)
- [Official 5 V / 2.5 A micro-USB power supply for Pi 3 — Amazon.co.uk](https://www.amazon.co.uk/dp/B01CO1HZJ6?tag=roboteducatif-21) · [Amazon.com](https://www.amazon.com/dp/B01CO1HZJ6?tag=roboteducatif-20)
- [Raspberry Pi beginner book — Amazon.co.uk](https://www.amazon.co.uk/s?k=Raspberry+Pi+beginner+book&tag=roboteducatif-21) · [Amazon.com](https://www.amazon.com/s?k=Raspberry+Pi+beginner+book&tag=roboteducatif-20)

For a more recent board (USB-C), see the [Pi 3 vs 4 vs 5 comparison](/en/raspberry-pi-3-vs-4-vs-5/). Never mix up the power supply of a Pi 5 with that of a Pi 3.

*Amazon partner — commission possible on eligible purchases.*

---

**In short**: **Raspberry Pi Imager** + **Raspberry Pi OS**, **advanced options** for SSH/Wi‑Fi, `apt` **updates**, then **SSH** and **VNC** as needed — you have a solid base for everything that follows on a **Raspberry Pi 3 Model B**.

*Author: Emmanuel Sauvage.*
