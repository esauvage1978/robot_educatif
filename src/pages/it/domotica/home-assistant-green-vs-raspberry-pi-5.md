---
layout: ../../../layouts/ItPost.astro
title: "Home Assistant Green vs Raspberry Pi 5: quale scegliere (2026)?"
description: "Home Assistant Green o Raspberry Pi 5 come centralina domotica? Dati ufficiali a confronto, cosa c'è nella confezione, cosa aggiungere e a chi conviene ciascuno."
updated: "24 ottobre 2026"
---

Entrambi fanno girare **Home Assistant OS** ed entrambi sono un'ottima centralina domotica locale. La differenza sta tutta qui: **semplicità contro flessibilità**. I dati provengono dalle pagine ufficiali: [Home Assistant Green](https://www.home-assistant.io/green/) e [Raspberry Pi 5](https://www.raspberrypi.com/products/raspberry-pi-5/) (consultate il 21 ottobre 2026). Non abbiamo fatto benchmark nostri.

## 1. I dati a confronto

| | Home Assistant Green | [Raspberry Pi](/it/marchio-raspberry-pi/) 5 (4 GB o 8 GB) |
|---|---|---|
| Nella confezione | dispositivo pronto: case, memoria, alimentatore | solo la scheda |
| Processore | quad-core Cortex-A55, 1,8 GHz | quad-core Cortex-A76, 2,4 GHz |
| RAM | 4 GB LPDDR4X | 4 o 8 GB LPDDR4X (esiste anche in 1, 2 e 16 GB) |
| Memoria | 32 GB eMMC integrati | microSD oppure SSD NVMe tramite espansione PCIe |
| USB | 2 × USB 2.0 | 2 × USB 3.0 + 2 × USB 2.0 |
| Ethernet | Gigabit | Gigabit |
| Wi-Fi | assente (solo Ethernet) | integrato (per una centralina è comunque meglio l'Ethernet) |
| Alimentazione | alimentatore universale incluso | da acquistare: alimentatore ufficiale USB-C da 27 W (esiste con spina europea) |
| Raffreddamento | senza ventola | Active Cooler consigliato |
| Configurazione | collegare Ethernet e corrente, aprire homeassistant.local:8123 | scrivere Home Assistant OS con Raspberry Pi Imager, poi avviare |
| Prezzo | verificate il prezzo | verificate il prezzo (solo scheda: da completare con alimentatore, case e memoria) |

Su Amazon.it: <a href="https://www.amazon.it/dp/B0CK3L9WD3?tag=roboteducat0f-21" rel="sponsored nofollow">Raspberry Pi 5 4 GB</a> o <a href="https://www.amazon.it/dp/B0CK2FCG1K?tag=roboteducat0f-21" rel="sponsored nofollow">Raspberry Pi 5 8 GB</a> (link di affiliazione).

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
