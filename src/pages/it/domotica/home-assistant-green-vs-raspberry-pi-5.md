---
layout: ../../../layouts/ItPost.astro
title: "Home Assistant Green vs Raspberry Pi 5: quale scegliere (2026)?"
description: "Home Assistant Green o Raspberry Pi 5 come centralina domotica? Dati ufficiali a confronto, cosa c'è nella confezione, cosa aggiungere e a chi conviene ciascuno."
updated: "24 ottobre 2026"
---

Entrambi fanno girare **Home Assistant OS** ed entrambi sono un'ottima centralina domotica locale. La differenza sta tutta qui: **semplicità contro flessibilità**. I dati provengono dalle pagine ufficiali: [Home Assistant Green](https://www.home-assistant.io/green/) e [Raspberry Pi 5](https://www.raspberrypi.com/products/raspberry-pi-5/) (consultate il 21 ottobre 2026). Non abbiamo fatto benchmark nostri.

## 1. I dati a confronto

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col"> </th>
<th scope="col">Home Assistant Green</th>
<th scope="col"><a href="/it/marchio-raspberry-pi/">Raspberry Pi</a> 5 (4 GB o 8 GB)</th>
</tr></thead><tbody>
<tr>
<td><span class="td-val">Nella confezione</span></td>
<td data-label="Home Assistant Green"><span class="td-val">dispositivo pronto: case, memoria, alimentatore</span></td>
<td data-label="[Raspberry Pi](/it/marchio-raspberry-pi/) 5 (4 GB o 8 GB)"><span class="td-val">solo la scheda</span></td>
</tr>
<tr>
<td><span class="td-val">Processore</span></td>
<td data-label="Home Assistant Green"><span class="td-val">quad-core Cortex-A55, 1,8 GHz</span></td>
<td data-label="[Raspberry Pi](/it/marchio-raspberry-pi/) 5 (4 GB o 8 GB)"><span class="td-val">quad-core Cortex-A76, 2,4 GHz</span></td>
</tr>
<tr>
<td><span class="td-val">RAM</span></td>
<td data-label="Home Assistant Green"><span class="td-val">4 GB LPDDR4X</span></td>
<td data-label="[Raspberry Pi](/it/marchio-raspberry-pi/) 5 (4 GB o 8 GB)"><span class="td-val">4 o 8 GB LPDDR4X (esiste anche in 1, 2 e 16 GB)</span></td>
</tr>
<tr>
<td><span class="td-val">Memoria</span></td>
<td data-label="Home Assistant Green"><span class="td-val">32 GB eMMC integrati</span></td>
<td data-label="[Raspberry Pi](/it/marchio-raspberry-pi/) 5 (4 GB o 8 GB)"><span class="td-val">microSD oppure SSD NVMe tramite espansione PCIe</span></td>
</tr>
<tr>
<td><span class="td-val">USB</span></td>
<td data-label="Home Assistant Green"><span class="td-val">2 × USB 2.0</span></td>
<td data-label="[Raspberry Pi](/it/marchio-raspberry-pi/) 5 (4 GB o 8 GB)"><span class="td-val">2 × USB 3.0 + 2 × USB 2.0</span></td>
</tr>
<tr>
<td><span class="td-val">Ethernet</span></td>
<td data-label="Home Assistant Green"><span class="td-val">Gigabit</span></td>
<td data-label="[Raspberry Pi](/it/marchio-raspberry-pi/) 5 (4 GB o 8 GB)"><span class="td-val">Gigabit</span></td>
</tr>
<tr>
<td><span class="td-val">Wi-Fi</span></td>
<td data-label="Home Assistant Green"><span class="td-val">assente (solo Ethernet)</span></td>
<td data-label="[Raspberry Pi](/it/marchio-raspberry-pi/) 5 (4 GB o 8 GB)"><span class="td-val">integrato (per una centralina è comunque meglio l'Ethernet)</span></td>
</tr>
<tr>
<td><span class="td-val">Alimentazione</span></td>
<td data-label="Home Assistant Green"><span class="td-val">alimentatore universale incluso</span></td>
<td data-label="[Raspberry Pi](/it/marchio-raspberry-pi/) 5 (4 GB o 8 GB)"><span class="td-val">da acquistare: alimentatore ufficiale USB-C da 27 W (esiste con spina europea)</span></td>
</tr>
<tr>
<td><span class="td-val">Raffreddamento</span></td>
<td data-label="Home Assistant Green"><span class="td-val">senza ventola</span></td>
<td data-label="[Raspberry Pi](/it/marchio-raspberry-pi/) 5 (4 GB o 8 GB)"><span class="td-val">Active Cooler consigliato</span></td>
</tr>
<tr>
<td><span class="td-val">Configurazione</span></td>
<td data-label="Home Assistant Green"><span class="td-val">collegare Ethernet e corrente, aprire homeassistant.local:8123</span></td>
<td data-label="[Raspberry Pi](/it/marchio-raspberry-pi/) 5 (4 GB o 8 GB)"><span class="td-val">scrivere Home Assistant OS con Raspberry Pi Imager, poi avviare</span></td>
</tr>
<tr>
<td><span class="td-val">Prezzo</span></td>
<td data-label="Home Assistant Green"><span class="td-val">verificate il prezzo</span></td>
<td data-label="[Raspberry Pi](/it/marchio-raspberry-pi/) 5 (4 GB o 8 GB)"><span class="td-val">verificate il prezzo (solo scheda: da completare con alimentatore, case e memoria)</span></td>
</tr>
</tbody>
</table>
</div>

Il prezzo del Raspberry Pi 5 si legge sulla [scheda ufficiale](https://www.raspberrypi.com/products/raspberry-pi-5/). La scheda va completata con alimentatore, case e memoria.

## 2. A chi conviene il Green?

- Volete una **scatola silenziosa che funziona e basta**, con il supporto ufficiale di Nabu Casa.
- Non prevedete estensioni pesanti, come l'analisi video di più telecamere.
- Non avete voglia di comprare e assemblare a parte alimentatore, case, dissipatore e memoria.

## 3. A chi conviene un Raspberry Pi 5?

- Avete già un Pi 5 o vi piace smanettare.
- Volete **più CPU e RAM** (8 GB) per le estensioni, oppure un **SSD NVMe** per un'affidabilità di lungo periodo.
- Vi interessa il connettore GPIO a 40 pin per collegare i vostri sensori.

Volete confrontare le generazioni? Leggete [Raspberry Pi 3 vs 4 vs 5](/it/raspberry-pi-3-vs-4-vs-5/).

## 4. Note per l'Italia

- **Alimentazione**: l'alimentatore del Green è universale (100–240 V); per il Pi 5 prendete l'**alimentatore ufficiale con spina europea** invece di un caricabatterie da telefono.
- **Disponibilità**: entrambi sono venduti da rivenditori ufficiali anche in Italia. Le scorte variano, quindi controllate la disponibilità sulle pagine ufficiali indicate sopra.

## 5. In ogni caso: aggiungete un coordinatore Zigbee

Nessuno dei due ha lo Zigbee integrato. Collegate un coordinatore USB tramite una breve prolunga per ridurre le interferenze: vedete [la miglior chiavetta Zigbee per Home Assistant](/it/domotica/miglior-chiavetta-zigbee-home-assistant/).

**In sintesi:** Green per zero sbattimenti; Pi 5 per potenza e flessibilità.

[Tutte le guide alla domotica](/it/domotica/)
