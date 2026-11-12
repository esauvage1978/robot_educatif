---
layout: ../../../layouts/ItPost.astro
title: "Miglior chiavetta Zigbee per Home Assistant (2026): confronto"
description: "SONOFF ZBDongle-E, Home Assistant Connect ZBT-2, SONOFF Dongle Lite MG21 o ConBee II? Chip, supporto Thread e compatibilità con ZHA e Zigbee2MQTT a confronto."
updated: "24 ottobre 2026"
---

Per comandare dispositivi Zigbee da **Home Assistant** serve un **coordinatore Zigbee**: una chiavetta USB con un chip radio. Lo Zigbee trasmette **a 2,4 GHz in tutto il mondo**, quindi le stesse chiavette funzionano anche in Italia; cambiano solo i rivenditori e le scorte. La tabella riporta chip e funzioni secondo le pagine dei produttori; non abbiamo misurato la portata, per questo non indichiamo valori di copertura.

## 1. Tabella di confronto

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Modello</th>
<th scope="col">Chip</th>
<th scope="col">Antenna</th>
<th scope="col">Thread / Matter</th>
<th scope="col">ZHA</th>
<th scope="col">Zigbee2MQTT</th>
<th scope="col">Ideale per</th>
</tr></thead><tbody>
<tr>
<td data-label="Modello"><span class="td-val"><strong>SONOFF ZBDongle-E</strong></span></td>
<td data-label="Chip"><span class="td-val">Silicon Labs EFR32MG21</span></td>
<td data-label="Antenna"><span class="td-val">esterna</span></td>
<td data-label="Thread / Matter"><span class="td-val">non di serie (firmware Zigbee)</span></td>
<td data-label="ZHA"><span class="td-val">sì</span></td>
<td data-label="Zigbee2MQTT"><span class="td-val">sì</span></td>
<td data-label="Ideale per"><span class="td-val">la maggior parte degli utenti: ben documentata</span></td>
</tr>
<tr>
<td data-label="Modello"><span class="td-val"><strong>Home Assistant Connect ZBT-2</strong></span></td>
<td data-label="Chip"><span class="td-val">Silicon Labs MG24</span></td>
<td data-label="Antenna"><span class="td-val">interna, in un case ottimizzato</span></td>
<td data-label="Thread / Matter"><span class="td-val">sì (firmware Thread selezionabile)</span></td>
<td data-label="ZHA"><span class="td-val">sì</span></td>
<td data-label="Zigbee2MQTT"><span class="td-val">sì</span></td>
<td data-label="Ideale per"><span class="td-val">supporto ufficiale Nabu Casa, pronta per Thread</span></td>
</tr>
<tr>
<td data-label="Modello"><span class="td-val"><strong>SONOFF Dongle Lite MG21</strong></span></td>
<td data-label="Chip"><span class="td-val">Silicon Labs EFR32MG21</span></td>
<td data-label="Antenna"><span class="td-val">interna</span></td>
<td data-label="Thread / Matter"><span class="td-val">non di serie</span></td>
<td data-label="ZHA"><span class="td-val">sì</span></td>
<td data-label="Zigbee2MQTT"><span class="td-val">sì</span></td>
<td data-label="Ideale per"><span class="td-val">budget minimo, appartamenti piccoli</span></td>
</tr>
<tr>
<td data-label="Modello"><span class="td-val"><strong>ConBee II</strong> (dresden elektronik)</span></td>
<td data-label="Chip"><span class="td-val">firmware deCONZ</span></td>
<td data-label="Antenna"><span class="td-val">interna</span></td>
<td data-label="Thread / Matter"><span class="td-val">no</span></td>
<td data-label="ZHA"><span class="td-val">sì</span></td>
<td data-label="Zigbee2MQTT"><span class="td-val">sì</span></td>
<td data-label="Ideale per"><span class="td-val">chi usa già deCONZ / Phoscon</span></td>
</tr>
</tbody>
</table>
</div>

Pagine ufficiali: [SONOFF ZBDongle-E](https://sonoff.tech/products/sonoff-zigbee-3-0-usb-dongle-plus-zbdongle-e), [Home Assistant Connect ZBT-2](https://www.home-assistant.io/connect/zbt-2/), [ConBee II](https://phoscon.de/en/conbee2). I prezzi cambiano spesso: verificate il prezzo presso il rivenditore.

## 2. ZHA o Zigbee2MQTT?

- **ZHA** è integrato in Home Assistant: la strada più semplice per iniziare.
- **Zigbee2MQTT** supporta un elenco di dispositivi molto ampio e mostra più dettagli, ma richiede l'add-on di un broker MQTT.

Tutte e quattro le chiavette qui sopra funzionano con entrambi.

## 3. Consigli di installazione

1. Usate una **prolunga USB** (circa 1 m) per allontanare la chiavetta dal computer e dalle porte USB 3, che disturbano i 2,4 GHz.
2. Separate i canali Zigbee e Wi-Fi (per esempio canale Zigbee 15, 20 o 25).
3. Aggiungete presto **dispositivi Zigbee alimentati da rete** (prese): fanno da ripetitori e rafforzano la rete mesh.

## 4. Dove comprare?

L'hardware SONOFF e Home Assistant è venduto da rivenditori ufficiali e dai grandi marketplace online anche in Italia. Prima di ordinare controllate la disponibilità sulle pagine ufficiali qui sopra.

Cercate una centralina? Vedete [Home Assistant Green vs Raspberry Pi 5](/it/domotica/home-assistant-green-vs-raspberry-pi-5/).

[Tutte le guide alla domotica](/it/domotica/)
