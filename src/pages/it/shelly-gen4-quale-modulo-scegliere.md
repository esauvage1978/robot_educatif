---
layout: ../../layouts/ItPost.astro
title: "Shelly Gen4: quale modulo scegliere per la domotica (1, 1PM, 2PM, i4, 1L)"
description: "Confronto dei moduli Shelly Gen4 da incasso: carico massimo, misura dei consumi, neutro, Wi-Fi, Zigbee e Matter. Dati ufficiali Shelly e consigli per Home Assistant."
updated: "17 novembre 2026"
schemaUpdated: "2026-11-17"
faqSchema:
  - question: "Quale Shelly Gen4 per una singola luce con neutro in scatola?"
    answer: "Shelly 1 Gen4 per un semplice comando; Shelly 1PM Gen4 se volete anche la misura dei consumi (scaldabagno, lavatrice)."
  - question: "Cosa scegliere senza filo di neutro?"
    answer: "Shelly 1L Gen4 con bypass incluso, massimo 200 W — adatto a molte installazioni più vecchie."
  - question: "Shelly i4 Gen4 serve a comandare un carico?"
    answer: "No: sono solo quattro ingressi per pulsanti o scenari in Home Assistant, senza relè di potenza."
---

Alcuni link possono essere di affiliazione (Shelly ufficiale o Amazon.it tramite `/go/`).

I moduli **Shelly Gen4** si installano dietro un interruttore o una presa esistente e rendono "smart" luci, tapparelle o apparecchi senza cambiare le placche. Tutti i modelli di questa pagina supportano **Wi-Fi, Bluetooth, Zigbee 3.0 e Matter** e funzionano con l'app Shelly, Home Assistant, Google Home, Alexa e SmartThings. Non li abbiamo testati: i dati qui sotto provengono dalla [knowledge base ufficiale Shelly](https://kb.shelly.cloud/knowledge-base/) e dal [negozio Shelly Italia](https://www.shelly.com/it), consultati il 23 ottobre 2026.

<aside class="article-callout" role="note"><p><strong>Sicurezza</strong></p><p>Questi moduli si collegano alla rete a 230 V. L'installazione nella scatola da incasso va affidata a un elettricista qualificato, nel rispetto della norma CEI 64-8.</p></aside>

## 1. Tabella di confronto (dati del produttore)

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col"> </th>
<th scope="col">Shelly 1 Gen4</th>
<th scope="col">Shelly 1PM Gen4</th>
<th scope="col">Shelly 2PM Gen4</th>
<th scope="col">Shelly i4 Gen4</th>
<th scope="col">Shelly 1L Gen4</th>
</tr></thead><tbody>
<tr>
<td><span class="td-val">Uso tipico</span></td>
<td data-label="Shelly 1 Gen4"><span class="td-val">relè a contatto pulito (luci, cancelli, caldaia)</span></td>
<td data-label="Shelly 1PM Gen4"><span class="td-val">relè con misura dei consumi</span></td>
<td data-label="Shelly 2PM Gen4"><span class="td-val">2 canali o tapparella, con misura</span></td>
<td data-label="Shelly i4 Gen4"><span class="td-val">4 ingressi per pulsanti/scenari (nessun relè)</span></td>
<td data-label="Shelly 1L Gen4"><span class="td-val">luci senza neutro</span></td>
</tr>
<tr>
<td><span class="td-val">Corrente / potenza max</span></td>
<td data-label="Shelly 1 Gen4"><span class="td-val">16 A a 240 V~</span></td>
<td data-label="Shelly 1PM Gen4"><span class="td-val">16 A a 240 V~</span></td>
<td data-label="Shelly 2PM Gen4"><span class="td-val">10 A per canale, 16 A totali</span></td>
<td data-label="Shelly i4 Gen4"><span class="td-val">—</span></td>
<td data-label="Shelly 1L Gen4"><span class="td-val">200 W</span></td>
</tr>
<tr>
<td><span class="td-val">Misura dei consumi</span></td>
<td data-label="Shelly 1 Gen4"><span class="td-val">no</span></td>
<td data-label="Shelly 1PM Gen4"><span class="td-val">sì (tensione, corrente)</span></td>
<td data-label="Shelly 2PM Gen4"><span class="td-val">sì</span></td>
<td data-label="Shelly i4 Gen4"><span class="td-val">no</span></td>
<td data-label="Shelly 1L Gen4"><span class="td-val">no</span></td>
</tr>
<tr>
<td><span class="td-val">Neutro necessario</span></td>
<td data-label="Shelly 1 Gen4"><span class="td-val">sì</span></td>
<td data-label="Shelly 1PM Gen4"><span class="td-val">sì</span></td>
<td data-label="Shelly 2PM Gen4"><span class="td-val">sì</span></td>
<td data-label="Shelly i4 Gen4"><span class="td-val">sì</span></td>
<td data-label="Shelly 1L Gen4"><span class="td-val">no (Shelly Bypass incluso, necessario con LED)</span></td>
</tr>
<tr>
<td><span class="td-val">Alimentazione</span></td>
<td data-label="Shelly 1 Gen4"><span class="td-val">110–240 V~, 24–48 V⎓, 12 V⎓</span></td>
<td data-label="Shelly 1PM Gen4"><span class="td-val">110–240 V~, 24–30 V⎓</span></td>
<td data-label="Shelly 2PM Gen4"><span class="td-val">110–240 V~, 24 V⎓</span></td>
<td data-label="Shelly i4 Gen4"><span class="td-val">110–240 V~</span></td>
<td data-label="Shelly 1L Gen4"><span class="td-val">220–240 V~</span></td>
</tr>
<tr>
<td><span class="td-val">Dimensioni (A×L×P)</span></td>
<td data-label="Shelly 1 Gen4"><span class="td-val">37×42×16 mm</span></td>
<td data-label="Shelly 1PM Gen4"><span class="td-val">37×42×16 mm</span></td>
<td data-label="Shelly 2PM Gen4"><span class="td-val">37×42×16 mm</span></td>
<td data-label="Shelly i4 Gen4"><span class="td-val">37×42×15 mm</span></td>
<td data-label="Shelly 1L Gen4"><span class="td-val">41×42×16 mm</span></td>
</tr>
<tr>
<td><span class="td-val">Wi-Fi</span></td>
<td data-label="Shelly 1 Gen4"><span class="td-val">802.11 b/g/n/ax</span></td>
<td data-label="Shelly 1PM Gen4"><span class="td-val">802.11 b/g/n/ax</span></td>
<td data-label="Shelly 2PM Gen4"><span class="td-val">802.11 b/g/n/ax</span></td>
<td data-label="Shelly i4 Gen4"><span class="td-val">802.11 b/g/n/ax</span></td>
<td data-label="Shelly 1L Gen4"><span class="td-val">802.11 b/g/n</span></td>
</tr>
<tr>
<td><span class="td-val">Zigbee 3.0 / Matter</span></td>
<td data-label="Shelly 1 Gen4"><span class="td-val">sì / sì</span></td>
<td data-label="Shelly 1PM Gen4"><span class="td-val">sì / sì</span></td>
<td data-label="Shelly 2PM Gen4"><span class="td-val">sì / sì</span></td>
<td data-label="Shelly i4 Gen4"><span class="td-val">sì / sì</span></td>
<td data-label="Shelly 1L Gen4"><span class="td-val">sì / sì</span></td>
</tr>
</tbody>
</table>
</div>

![Modulo relè Shelly (esempio di famiglia Plus/Gen4)](/images/models/shelly-plus-1pm.webp)

*Illustrazione di un modulo relè Shelly da incasso (famiglia Plus, aspetto simile ai Gen4 nelle scatole).*

## Sommario

1. [Tabella di confronto](#1-tabella-di-confronto-dati-del-produttore)
2. [Quale scegliere](#2-quale-scegliere)
3. [Home Assistant](#3-con-home-assistant)
4. [Dove comprare](#4-dove-comprare)
5. [FAQ](#domande-frequenti)

Fonti: schede KB [Shelly 1 Gen4](https://kb.shelly.cloud/knowledge-base/shelly-1-gen4), [1PM Gen4](https://kb.shelly.cloud/knowledge-base/shelly-1pm-gen4), [2PM Gen4](https://kb.shelly.cloud/knowledge-base/shelly-2pm-gen4), [i4 Gen4](https://kb.shelly.cloud/knowledge-base/shelly-i4-gen4), [1L Gen4](https://kb.shelly.cloud/knowledge-base/shelly-1l-gen4). Protezione a monte richiesta dal produttore: interruttore magnetotermico curva B o C, max 16 A (10 A per il 1L).

## 2. Quale scegliere?

- **Accendere una luce o comandare un cancello/una caldaia** (contatto pulito): **Shelly 1 Gen4**.
- **Lo stesso, ma vedere i consumi** (scaldabagno, lavatrice, stufetta): **Shelly 1PM Gen4**.
- **Due punti luce o una tapparella**: **Shelly 2PM Gen4** (attenzione al limite di 10 A per canale).
- **Pulsanti che lanciano scenari** in Home Assistant, senza commutare un carico: **Shelly i4 Gen4**.
- **Scatola senza filo di neutro** (frequente negli impianti più vecchi): **Shelly 1L Gen4**, con il Bypass incluso per le lampadine LED, e massimo 200 W.

## 3. Con Home Assistant

I modelli Gen4 sono riconosciuti in locale dall'integrazione Shelly di Home Assistant via Wi-Fi, oppure possono essere aggiunti come dispositivi Zigbee o Matter. Il Wi-Fi permette di usare anche gli script e l'MQTT integrati (indicati nella KB). Per scegliere la base di Home Assistant leggete il nostro confronto [Raspberry Pi 3 vs 4 vs 5](/it/raspberry-pi-3-vs-4-vs-5/) e la procedura [installare Home Assistant su Raspberry Pi 5](/it/domotica/installare-home-assistant-raspberry-pi-5/). Se un modulo non risponde dopo il cablaggio, il [repertorio dei codici errore Shelly, Zigbee e Home Assistant](/it/domotica/codici-errore-risoluzione-zigbee-home-assistant-shelly/) indica il controllo da fare. Per un carico su una presa, senza lavori in muratura, partite dalle [prese smart](/it/domotica/prese-smart/).

## 4. Dove comprare

Tutti i modelli sono venduti sul [negozio ufficiale Shelly Italia](https://www.shelly.com/it) (affiliazione). In alternativa su Amazon.it: <a href="/go/az-it-0671e9bd00/" rel="sponsored nofollow noopener">ricerca moduli Shelly</a> — verificate modello Gen4 e tensione 230 V.

**In breve:** 1 Gen4 per comandare, 1PM Gen4 per comandare e misurare, 2PM per due canali o tapparelle, i4 per i pulsanti, 1L se manca il neutro.

## Domande frequenti

### Posso usare solo Zigbee senza Wi-Fi?

Sì: i Gen4 espongono Zigbee 3.0 e Matter; in Home Assistant aggiungeteli come dispositivi Zigbee o tramite integrazione Shelly Wi-Fi.

### 2PM Gen4 per una tapparella?

Sì, ma rispettate il limite di **10 A per canale** e la protezione magnetotermica indicata dal produttore.

### Serve un elettricista?

Per collegamenti a **230 V** in scatola da incasso, sì — conforme CEI 64-8.

<small>Aggiornato il 17 novembre 2026. Dati produttore consultati il 23 ottobre 2026.</small>
