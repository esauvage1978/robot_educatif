---
layout: ../../../layouts/ItPost.astro
title: "Miglior chiavetta Zigbee per Home Assistant (2026): confronto"
description: "SONOFF ZBDongle-E, Home Assistant Connect ZBT-2, SONOFF Dongle Lite MG21 o ConBee II? Chip, supporto Thread e compatibilità con ZHA e Zigbee2MQTT a confronto."
updated: "24 ottobre 2026"
---

Per comandare dispositivi Zigbee da **Home Assistant** serve un **coordinatore Zigbee**: una chiavetta USB con un chip radio. Lo Zigbee trasmette **a 2,4 GHz in tutto il mondo**, quindi le stesse chiavette funzionano anche in Italia; cambiano solo i rivenditori e le scorte. La tabella riporta chip e funzioni secondo le pagine dei produttori; non abbiamo misurato la portata, per questo non indichiamo valori di copertura.

## 1. Tabella di confronto

| Modello | Chip | Antenna | Thread / Matter | ZHA | Zigbee2MQTT | Ideale per |
|---|---|---|---|---|---|---|
| **SONOFF ZBDongle-E** | Silicon Labs EFR32MG21 | esterna | non di serie (firmware Zigbee) | sì | sì | la maggior parte degli utenti: ben documentata |
| **Home Assistant Connect ZBT-2** | Silicon Labs MG24 | interna, in un case ottimizzato | sì (firmware Thread selezionabile) | sì | sì | supporto ufficiale Nabu Casa, pronta per Thread |
| **SONOFF Dongle Lite MG21** | Silicon Labs EFR32MG21 | interna | non di serie | sì | sì | budget minimo, appartamenti piccoli |
| **ConBee II** (dresden elektronik) | firmware deCONZ | interna | no | sì | sì | chi usa già deCONZ / Phoscon |

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
