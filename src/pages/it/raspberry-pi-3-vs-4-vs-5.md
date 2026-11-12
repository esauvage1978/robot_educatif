---
layout: ../../layouts/ItPost.astro
title: "Raspberry Pi 3 vs 4 vs 5: quale comprare nel 2026?"
description: "Raspberry Pi 3 Model B, Pi 4 Model B e Pi 5 a confronto: CPU, RAM, USB, Ethernet, PCIe e alimentazione. Tabella dei dati e un consiglio chiaro per ogni uso."
updated: "23 ottobre 2026"
---

Tra **Raspberry Pi 3 Model B**, **Pi 4 Model B** e **Pi 5** non cambia solo il prezzo: **USB 3**, **vero Gigabit Ethernet**, **due uscite video**, poi **PCIe** e fino a **16 GB di RAM** sul Pi 5 cambiano ciò che un progetto può fare. I dati provengono dalle pagine prodotto ufficiali di Raspberry Pi ([Pi 3 B](https://www.raspberrypi.com/products/raspberry-pi-3-model-b/), [Pi 4 B](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/), [Pi 5](https://www.raspberrypi.com/products/raspberry-pi-5/)). Il nostro parere sul marchio: [Raspberry Pi](/it/marchio-raspberry-pi/).

## 1. Tabella dei dati

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col"> </th>
<th scope="col"><strong>Pi 3 Model B</strong></th>
<th scope="col"><strong>Pi 4 Model B</strong></th>
<th scope="col"><strong>Raspberry Pi 5</strong></th>
</tr></thead><tbody>
<tr>
<td><span class="td-val">SoC</span></td>
<td data-label="**Pi 3 Model B**"><span class="td-val">Broadcom BCM2837</span></td>
<td data-label="**Pi 4 Model B**"><span class="td-val">Broadcom BCM2711</span></td>
<td data-label="**Raspberry Pi 5**"><span class="td-val">Broadcom BCM2712</span></td>
</tr>
<tr>
<td><span class="td-val">CPU</span></td>
<td data-label="**Pi 3 Model B**"><span class="td-val">4 × Cortex-A53, 1,2 GHz</span></td>
<td data-label="**Pi 4 Model B**"><span class="td-val">4 × Cortex-A72, 1,8 GHz</span></td>
<td data-label="**Raspberry Pi 5**"><span class="td-val">4 × Cortex-A76, 2,4 GHz</span></td>
</tr>
<tr>
<td><span class="td-val">GPU / video</span></td>
<td data-label="**Pi 3 Model B**"><span class="td-val">VideoCore IV, 1 × HDMI standard</span></td>
<td data-label="**Pi 4 Model B**"><span class="td-val">VideoCore VI, 2 × micro-HDMI (4K)</span></td>
<td data-label="**Raspberry Pi 5**"><span class="td-val">VideoCore VII, 2 × micro-HDMI (4Kp60)</span></td>
</tr>
<tr>
<td><span class="td-val">RAM</span></td>
<td data-label="**Pi 3 Model B**"><span class="td-val">1 GB LPDDR2</span></td>
<td data-label="**Pi 4 Model B**"><span class="td-val">1 / 2 / 4 / 8 GB LPDDR4-3200</span></td>
<td data-label="**Raspberry Pi 5**"><span class="td-val">1 / 2 / 4 / 8 / 16 GB LPDDR4X-4267</span></td>
</tr>
<tr>
<td><span class="td-val">Ethernet</span></td>
<td data-label="**Pi 3 Model B**"><span class="td-val">100 Mbit/s</span></td>
<td data-label="**Pi 4 Model B**"><span class="td-val">Gigabit</span></td>
<td data-label="**Raspberry Pi 5**"><span class="td-val">Gigabit</span></td>
</tr>
<tr>
<td><span class="td-val">Wi-Fi / Bluetooth</span></td>
<td data-label="**Pi 3 Model B**"><span class="td-val">802.11n, BT 4.1</span></td>
<td data-label="**Pi 4 Model B**"><span class="td-val">802.11ac, BT 5.0</span></td>
<td data-label="**Raspberry Pi 5**"><span class="td-val">802.11ac, BT 5.0</span></td>
</tr>
<tr>
<td><span class="td-val">USB</span></td>
<td data-label="**Pi 3 Model B**"><span class="td-val">4 × USB 2.0</span></td>
<td data-label="**Pi 4 Model B**"><span class="td-val">2 × USB 3.0 + 2 × USB 2.0</span></td>
<td data-label="**Raspberry Pi 5**"><span class="td-val">2 × USB 3.0 + 2 × USB 2.0</span></td>
</tr>
<tr>
<td><span class="td-val">PCIe</span></td>
<td data-label="**Pi 3 Model B**"><span class="td-val">no</span></td>
<td data-label="**Pi 4 Model B**"><span class="td-val">no</span></td>
<td data-label="**Raspberry Pi 5**"><span class="td-val">PCIe 2.0 ×1</span></td>
</tr>
<tr>
<td><span class="td-val">Alimentazione</span></td>
<td data-label="**Pi 3 Model B**"><span class="td-val">micro-USB 5 V, 2,5 A</span></td>
<td data-label="**Pi 4 Model B**"><span class="td-val">USB-C 5 V, 3 A</span></td>
<td data-label="**Raspberry Pi 5**"><span class="td-val">USB-C 5 V, 5 A consigliati</span></td>
</tr>
<tr>
<td><span class="td-val">GPIO</span></td>
<td data-label="**Pi 3 Model B**"><span class="td-val">40 pin</span></td>
<td data-label="**Pi 4 Model B**"><span class="td-val">40 pin</span></td>
<td data-label="**Raspberry Pi 5**"><span class="td-val">40 pin</span></td>
</tr>
</tbody>
</table>
</div>

## 2. Cosa cambia nell'uso quotidiano

- **Pi 3**: facile da trovare usato e documentatissimo, ma **1 GB di RAM** e **niente USB 3** rallentano navigazione, compilazione e trasferimento dati.
- **Pi 4**: **USB 3 + vero Gigabit** lo rendono, da 4 GB in su, un discreto piccolo NAS, server o desktop Linux.
- **Pi 5**: CPU più recente, fino a **16 GB**, **PCIe** per archiviazione veloce, ma più esigente su **raffreddamento** e **alimentazione**.

## 3. Prezzi

I prezzi dei Raspberry Pi cambiano spesso (scorte, margini dei rivenditori, IVA). **Verificate il prezzo attuale** presso un [rivenditore autorizzato](https://www.raspberrypi.com/resellers/). Gli ASIN del rilevamento francese del 10 novembre 2026 non sono riusati qui come schede Amazon.it. Controllate sempre la revisione della scheda e il contenuto della confezione (alimentatore, dissipatore).

## 4. Quale Raspberry Pi per quale uso?

**Restate sul Pi 3** se riutilizzate hardware che avete già o per un progetto molto leggero (GPIO, un sensore, un piccolo script).

**Scegliete il Pi 4** per un piccolo NAS fai-da-te, un server con esigenze di banda, dischi USB 3 o un desktop Linux economico per tutti i giorni.

**Prendete il Pi 5** se vi servono margine di CPU, 8 GB o più o il bus PCIe. Prevedete un raffreddamento attivo e l'alimentatore ufficiale da 27 W.

**Per Home Assistant** un Pi 5 da 4 GB con una chiavetta Zigbee funziona bene; l'alternativa pronta all'uso è Home Assistant Green.

**Per ragazzi a metà strada tra scheda nuda e robot**, un kit basato su Pi come il [SunFounder PiCar-X](https://www.sunfounder.com/products/picar-x?ref=tpytgtyp) (link di affiliazione, Pi non incluso) unisce le due cose. Altri robot sono confrontati nella guida [miglior robot programmabile per bambini](/it/miglior-robot-programmabile-per-bambini/).

## 5. Dove comprare in Italia?

Raspberry Pi elenca i rivenditori autorizzati paese per paese sulla [pagina ufficiale dei rivenditori](https://www.raspberrypi.com/resellers/). Per l'alimentatore ufficiale scegliete la versione con **spina europea**.

**In breve:** Pi 3 = il riferimento storico, oggi limitato; Pi 4 = il miglior compromesso per rete e USB; Pi 5 = massime prestazioni e più RAM, a scapito di calore e prezzo.
