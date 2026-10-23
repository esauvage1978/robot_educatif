---
layout: ../../layouts/ItPost.astro
title: "Shelly Gen4: quale modulo scegliere per la domotica (1, 1PM, 2PM, i4, 1L)"
description: "Confronto dei moduli Shelly Gen4 da incasso: carico massimo, misura dei consumi, neutro, Wi-Fi, Zigbee e Matter. Dati ufficiali Shelly e consigli per Home Assistant."
updated: "23 ottobre 2026"
---

I moduli **Shelly Gen4** si installano dietro un interruttore o una presa esistente e rendono "smart" luci, tapparelle o apparecchi senza cambiare le placche. Tutti i modelli di questa pagina supportano **Wi-Fi, Bluetooth, Zigbee 3.0 e Matter** e funzionano con l'app Shelly, Home Assistant, Google Home, Alexa e SmartThings. Non li abbiamo testati: i dati qui sotto provengono dalla [knowledge base ufficiale Shelly](https://kb.shelly.cloud/knowledge-base/) e dal [negozio Shelly Italia](https://www.shelly.com/it), consultati il 23 ottobre 2026.

<aside class="article-callout" role="note"><p><strong>Sicurezza</strong></p><p>Questi moduli si collegano alla rete a 230 V. L'installazione nella scatola da incasso va affidata a un elettricista qualificato, nel rispetto della norma CEI 64-8.</p></aside>

## 1. Tabella di confronto (dati del produttore)

| | Shelly 1 Gen4 | Shelly 1PM Gen4 | Shelly 2PM Gen4 | Shelly i4 Gen4 | Shelly 1L Gen4 |
|---|---|---|---|---|---|
| Uso tipico | relè a contatto pulito (luci, cancelli, caldaia) | relè con misura dei consumi | 2 canali o tapparella, con misura | 4 ingressi per pulsanti/scenari (nessun relè) | luci senza neutro |
| Corrente / potenza max | 16 A a 240 V~ | 16 A a 240 V~ | 10 A per canale, 16 A totali | — | 200 W |
| Misura dei consumi | no | sì (tensione, corrente) | sì | no | no |
| Neutro necessario | sì | sì | sì | sì | no (Shelly Bypass incluso, necessario con LED) |
| Alimentazione | 110–240 V~, 24–48 V⎓, 12 V⎓ | 110–240 V~, 24–30 V⎓ | 110–240 V~, 24 V⎓ | 110–240 V~ | 220–240 V~ |
| Dimensioni (A×L×P) | 37×42×16 mm | 37×42×16 mm | 37×42×16 mm | 37×42×15 mm | 41×42×16 mm |
| Wi-Fi | 802.11 b/g/n/ax | 802.11 b/g/n/ax | 802.11 b/g/n/ax | 802.11 b/g/n/ax | 802.11 b/g/n |
| Zigbee 3.0 / Matter | sì / sì | sì / sì | sì / sì | sì / sì | sì / sì |

Fonti: schede KB [Shelly 1 Gen4](https://kb.shelly.cloud/knowledge-base/shelly-1-gen4), [1PM Gen4](https://kb.shelly.cloud/knowledge-base/shelly-1pm-gen4), [2PM Gen4](https://kb.shelly.cloud/knowledge-base/shelly-2pm-gen4), [i4 Gen4](https://kb.shelly.cloud/knowledge-base/shelly-i4-gen4), [1L Gen4](https://kb.shelly.cloud/knowledge-base/shelly-1l-gen4). Protezione a monte richiesta dal produttore: interruttore magnetotermico curva B o C, max 16 A (10 A per il 1L).

## 2. Quale scegliere?

- **Accendere una luce o comandare un cancello/una caldaia** (contatto pulito): **Shelly 1 Gen4**.
- **Lo stesso, ma vedere i consumi** (scaldabagno, lavatrice, stufetta): **Shelly 1PM Gen4**.
- **Due punti luce o una tapparella**: **Shelly 2PM Gen4** (attenzione al limite di 10 A per canale).
- **Pulsanti che lanciano scenari** in Home Assistant, senza commutare un carico: **Shelly i4 Gen4**.
- **Scatola senza filo di neutro** (frequente negli impianti più vecchi): **Shelly 1L Gen4**, con il Bypass incluso per le lampadine LED, e massimo 200 W.

## 3. Con Home Assistant

I modelli Gen4 sono riconosciuti in locale dall'integrazione Shelly di Home Assistant via Wi-Fi, oppure possono essere aggiunti come dispositivi Zigbee o Matter. Il Wi-Fi permette di usare anche gli script e l'MQTT integrati (indicati nella KB). Per scegliere la base di Home Assistant leggete il nostro confronto [Raspberry Pi 3 vs 4 vs 5](/it/raspberry-pi-3-vs-4-vs-5/).

## 4. Dove comprare

Tutti i modelli sono venduti sul negozio ufficiale Shelly Italia, che il 23 ottobre 2026 li indicava come disponibili: [Shelly 1 Gen4](https://www.awin1.com/cread.php?awinmid=121790&awinaffid=3126073&ued=https%3A%2F%2Fwww.shelly.com%2Fit%2Fproducts%2Fshelly-1-gen4), [Shelly 1PM Gen4](https://www.awin1.com/cread.php?awinmid=121790&awinaffid=3126073&ued=https%3A%2F%2Fwww.shelly.com%2Fit%2Fproducts%2Fshelly-1pm-gen4), [Shelly 2PM Gen4](https://www.awin1.com/cread.php?awinmid=121790&awinaffid=3126073&ued=https%3A%2F%2Fwww.shelly.com%2Fit%2Fproducts%2Fshelly-2pm-gen4), [Shelly i4 Gen4](https://www.awin1.com/cread.php?awinmid=121790&awinaffid=3126073&ued=https%3A%2F%2Fwww.shelly.com%2Fit%2Fproducts%2Fshelly-i4-gen4), [Shelly 1L Gen4](https://www.awin1.com/cread.php?awinmid=121790&awinaffid=3126073&ued=https%3A%2F%2Fwww.shelly.com%2Fit%2Fproducts%2Fshelly-1l-gen4) (link di affiliazione). I prezzi cambiano: verificate il prezzo sul sito al momento dell'acquisto.

**In breve:** 1 Gen4 per comandare, 1PM Gen4 per comandare e misurare, 2PM per due canali o tapparelle, i4 per i pulsanti, 1L se manca il neutro.
