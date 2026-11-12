---
layout: ../../../layouts/ItPost.astro
title: "Quale scheda ESP32 per la domotica? Confronto chip 2026"
description: "ESP32, S3, C3, C6 o H2: core, Wi-Fi, Bluetooth, Thread/Zigbee e GPIO per ESPHome. Quale DevKit comprare per sensori o telecamera."
updated: "2 novembre 2026"
---

<nav class="breadcrumb" aria-label="Fil d'Ariane"><a href="/it/domotica/">Domotica</a> · Scheda ESP32</nav>

> **Risposta diretta (novembre 2026)** — Per la maggior parte dei progetti [ESPHome](https://esphome.io/) in Home Assistant, partite da una **DevKit ESP32 classica** (Wi‑Fi + Bluetooth, documentazione ampia). Passate a **ESP32-S3** per telecamera o più GPIO, a **ESP32-C6** se volete **Thread/Zigbee** oltre al Wi‑Fi.

« ESP32 » oggi indica un’intera famiglia di chip **Espressif** (produttore del silicio). La scelta cambia ciò che la scheda sa fare: **Bluetooth**, **Thread**, USB nativo, numero di pin. Dati dalle [pagine prodotto Espressif](https://www.espressif.com/en/products/socs) (consultate a novembre 2026).

![DevKit ESP32-C6](/images/products/esp32-c6-devkitc.webp)

## L’essenziale in una tabella

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Chip</th>
<th scope="col">Core / freq. max</th>
<th scope="col">Wi‑Fi</th>
<th scope="col">Bluetooth</th>
<th scope="col">IEEE 802.15.4 (Thread, Zigbee)</th>
<th scope="col">USB nativo</th>
<th scope="col">SRAM</th>
</tr></thead><tbody>
<tr>
<td data-label="Chip"><span class="td-val"><strong>ESP32</strong> (classico)</span></td>
<td data-label="Core / freq. max"><span class="td-val">2 × Xtensa LX6, 240 MHz</span></td>
<td data-label="Wi‑Fi"><span class="td-val">Wi‑Fi 4, 2,4 GHz</span></td>
<td data-label="Bluetooth"><span class="td-val">Classic + BLE 4.2</span></td>
<td data-label="IEEE 802.15.4 (Thread, Zigbee)"><span class="td-val">no</span></td>
<td data-label="USB nativo"><span class="td-val">no</span></td>
<td data-label="SRAM"><span class="td-val">520 KB</span></td>
</tr>
<tr>
<td data-label="Chip"><span class="td-val"><strong>ESP32-S3</strong></span></td>
<td data-label="Core / freq. max"><span class="td-val">2 × Xtensa LX7, 240 MHz</span></td>
<td data-label="Wi‑Fi"><span class="td-val">Wi‑Fi 4, 2,4 GHz</span></td>
<td data-label="Bluetooth"><span class="td-val">BLE 5</span></td>
<td data-label="IEEE 802.15.4 (Thread, Zigbee)"><span class="td-val">no</span></td>
<td data-label="USB nativo"><span class="td-val">sì (OTG)</span></td>
<td data-label="SRAM"><span class="td-val">512 KB</span></td>
</tr>
<tr>
<td data-label="Chip"><span class="td-val"><strong>ESP32-C3</strong></span></td>
<td data-label="Core / freq. max"><span class="td-val">1 × RISC-V, 160 MHz</span></td>
<td data-label="Wi‑Fi"><span class="td-val">Wi‑Fi 4, 2,4 GHz</span></td>
<td data-label="Bluetooth"><span class="td-val">BLE 5</span></td>
<td data-label="IEEE 802.15.4 (Thread, Zigbee)"><span class="td-val">no</span></td>
<td data-label="USB nativo"><span class="td-val">serie/JTAG</span></td>
<td data-label="SRAM"><span class="td-val">400 KB</span></td>
</tr>
<tr>
<td data-label="Chip"><span class="td-val"><strong>ESP32-C6</strong></span></td>
<td data-label="Core / freq. max"><span class="td-val">RISC-V + core a basso consumo</span></td>
<td data-label="Wi‑Fi"><span class="td-val"><strong>Wi‑Fi 6</strong>, 2,4 GHz</span></td>
<td data-label="Bluetooth"><span class="td-val">BLE 5</span></td>
<td data-label="IEEE 802.15.4 (Thread, Zigbee)"><span class="td-val"><strong>sì</strong></span></td>
<td data-label="USB nativo"><span class="td-val">serie/JTAG</span></td>
<td data-label="SRAM"><span class="td-val">512 KB</span></td>
</tr>
<tr>
<td data-label="Chip"><span class="td-val"><strong>ESP32-H2</strong></span></td>
<td data-label="Core / freq. max"><span class="td-val">1 × RISC-V, 96 MHz</span></td>
<td data-label="Wi‑Fi"><span class="td-val"><strong>no</strong></span></td>
<td data-label="Bluetooth"><span class="td-val">BLE 5</span></td>
<td data-label="IEEE 802.15.4 (Thread, Zigbee)"><span class="td-val"><strong>sì</strong></span></td>
<td data-label="USB nativo"><span class="td-val">serie/JTAG</span></td>
<td data-label="SRAM"><span class="td-val">320 KB</span></td>
</tr>
</tbody>
</table>
</div>

**Per iniziare: una DevKit ESP32 classica.** È la più documentata in ESPHome e basta per quasi tutti i progetti della pagina [10 progetti ESP32](/it/domotica/progetti-esp32-domotica/). Scegliete **ESP32-S3** per telecamera o più GPIO, **ESP32-C6** se volete prepararvi al **Thread** (protocollo mesh a basso consumo, spesso usato con **Matter**).

## ESP32 classico: la scelta sicura

Due core, Wi‑Fi e Bluetooth (anche Classic), decine di GPIO: è il chip dei tutorial [sensore temperatura ESPHome](/it/domotica/esp32-esphome-sensore-temperatura/) e [porta garage](/it/domotica/porta-garage-smartphone-esp32-esphome/). Il Bluetooth può fare da **proxy BLE** per Home Assistant (inoltro di beacon Bluetooth Low Energy verso il hub).

## ESP32-S3: più GPIO e USB

Due core a 240 MHz, USB OTG, più GPIO e istruzioni vettoriali utili al segnale. Chip di molte board con telecamera. Niente Bluetooth Classic, solo BLE 5.

## ESP32-C3: piccolo ed economico

Un core RISC-V a 160 MHz, Wi‑Fi e BLE 5: sufficiente per sensore o relè. Board spesso minuscule. Meno pin dell’ESP32 classico.

## ESP32-C6 e H2: radio Thread e Zigbee

Il **C6** unisce **Wi‑Fi 6**, BLE 5 e radio **IEEE 802.15.4** (Thread e Zigbee). L’**H2** non ha Wi‑Fi: pensato per dispositivi Thread/Zigbee a batteria. Il supporto in ESPHome evolve: controllate la [documentazione ESPHome](https://esphome.io/components/esp32/) prima di iniziare. Per Thread e Zigbee: [protocolli domotici](/it/domotica/protocolli-domotica-zigbee-wifi-thread-matter/).

## Consigli d’acquisto in Italia

- **DevKit** invece del modulo nudo: USB, regolatore e reset già presenti.
- **Connettore** USB-C o micro-USB; chip USB-seriale se la puce non ha USB nativo.
- **Flash**: 4 MB bastano per ESPHome; 8 MB+ e PSRAM per telecamera.
- **Alimentazione**: 5 V via USB; per uso fisso, alimentatore di qualità.

<p><strong>Acquisto (link affiliato):</strong> <a href="https://www.amazon.it/s?k=ESP32+DevKit&tag=roboteducat00-21" target="_blank" rel="noopener nofollow sponsored">DevKit ESP32 su Amazon.it</a></p>

Scheda scelta? Seguite il [tutorial ESPHome temperatura](/it/domotica/esp32-esphome-sensore-temperatura/) e un’idea tra i [progetti ESP32](/it/domotica/progetti-esp32-domotica/). Confronto hub: [Home Assistant Green vs Raspberry Pi 5](/it/domotica/home-assistant-green-vs-raspberry-pi-5/).

## FAQ

- **ESPHome o firmware custom?** ESPHome per sensori e relè in pochi minuti; Arduino/PlatformIO se volete C++ su misura.
- **Serve il neutro in scatola?** Questa pagina parla solo della **scheda**; per relè dietro interruttore vedete [Shelly Gen4](/it/shelly-gen4-quale-modulo-scegliere/).
- **Quale dongle Zigbee?** Vedi [miglior chiavetta Zigbee per Home Assistant](/it/domotica/miglior-chiavetta-zigbee-home-assistant/).

[Tutte le guide domotica](/it/domotica/)
