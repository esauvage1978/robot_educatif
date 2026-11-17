---
layout: ../../../layouts/ItPost.astro
title: "Zigbee, Wi-Fi, Z-Wave, Thread o Matter: quale protocollo domotico scegliere?"
description: "Protocolli domotici spiegati in modo semplice: frequenze, mesh, gateway, consumi e compatibilità con Home Assistant. Tabella comparativa e consigli per iniziare in Italia."
updated: "17 novembre 2026"
---

Alcuni link sono di affiliazione (`/go/`): possono generare una commissione senza costi aggiuntivi.

<div class="article-toc" role="navigation" aria-label="Sommario">
<p class="article-toc-title">Sommario</p>
<ul>
<li><a href="#tabella">L’essenziale in una tabella</a></li>
<li><a href="#wifi">Wi-Fi</a></li>
<li><a href="#zigbee">Zigbee</a></li>
<li><a href="#zwave">Z-Wave</a></li>
<li><a href="#thread">Thread e Matter</a></li>
<li><a href="#faq">FAQ</a></li>
</ul>
</div>

Prima di comprare il primo sensore, conviene capire **in quale « lingua » parleranno i dispositivi**. Una presa Wi-Fi, un sensore Zigbee e una lampadina Matter non si collegano allo stesso modo, e questa scelta determina quale gateway acquistare. Qui riassumiamo i cinque protocolli che troverete in negozio, basandoci sulle documentazioni ufficiali ([Connectivity Standards Alliance](https://csa-iot.org/all-solutions/matter/), [Thread Group](https://www.threadgroup.org/What-is-Thread/Overview), [Z-Wave Alliance](https://z-wavealliance.org/), [integrazioni Home Assistant](https://www.home-assistant.io/integrations/)).

In Italia lo Zigbee usa la stessa banda **2,4 GHz** del resto d’Europa; le chiavette USB che compri online funzionano senza adattamenti regionali.

## L’essenziale in una tabella {#tabella}

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Protocollo</th>
<th scope="col">Frequenza (Europa / Italia)</th>
<th scope="col">Rete</th>
<th scope="col">Gateway necessario</th>
<th scope="col">Consumo</th>
<th scope="col">In Home Assistant</th>
</tr></thead><tbody>
<tr>
<td data-label="Protocollo"><span class="td-val"><strong>Wi-Fi</strong></span></td>
<td data-label="Frequenza (Europa / Italia)"><span class="td-val">2,4 GHz (a volte 5 GHz)</span></td>
<td data-label="Rete"><span class="td-val">stella intorno al router</span></td>
<td data-label="Gateway necessario"><span class="td-val">no</span></td>
<td data-label="Consumo"><span class="td-val">alto: dispositivi a rete</span></td>
<td data-label="In Home Assistant"><span class="td-val">dipende dal marchio (locale o cloud)</span></td>
</tr>
<tr>
<td data-label="Protocollo"><span class="td-val"><strong>Zigbee</strong></span></td>
<td data-label="Frequenza (Europa / Italia)"><span class="td-val">2,4 GHz (IEEE 802.15.4)</span></td>
<td data-label="Rete"><span class="td-val">mesh: i dispositivi a rete fanno da ripetitori</span></td>
<td data-label="Gateway necessario"><span class="td-val">sì: coordinatore (chiavetta USB)</span></td>
<td data-label="Consumo"><span class="td-val">molto basso: sensori a batteria per mesi</span></td>
<td data-label="In Home Assistant"><span class="td-val">ZHA (integrato) o Zigbee2MQTT</span></td>
</tr>
<tr>
<td data-label="Protocollo"><span class="td-val"><strong>Z-Wave</strong></span></td>
<td data-label="Frequenza (Europa / Italia)"><span class="td-val">868,4 MHz</span></td>
<td data-label="Rete"><span class="td-val">mesh</span></td>
<td data-label="Gateway necessario"><span class="td-val">sì: controller Z-Wave</span></td>
<td data-label="Consumo"><span class="td-val">molto basso</span></td>
<td data-label="In Home Assistant"><span class="td-val">Z-Wave JS</span></td>
</tr>
<tr>
<td data-label="Protocollo"><span class="td-val"><strong>Thread</strong></span></td>
<td data-label="Frequenza (Europa / Italia)"><span class="td-val">2,4 GHz (IEEE 802.15.4)</span></td>
<td data-label="Rete"><span class="td-val">mesh, IPv6</span></td>
<td data-label="Gateway necessario"><span class="td-val">sì: « border router »</span></td>
<td data-label="Consumo"><span class="td-val">molto basso</span></td>
<td data-label="In Home Assistant"><span class="td-val">integrazioni Thread e Matter</span></td>
</tr>
<tr>
<td data-label="Protocollo"><span class="td-val"><strong>Matter</strong></span></td>
<td data-label="Frequenza (Europa / Italia)"><span class="td-val">sopra Wi-Fi, Thread o Ethernet</span></td>
<td data-label="Rete"><span class="td-val">layer applicativo comune</span></td>
<td data-label="Gateway necessario"><span class="td-val">dipende dal trasporto</span></td>
<td data-label="Consumo"><span class="td-val">dipende dal trasporto</span></td>
<td data-label="In Home Assistant"><span class="td-val">integrazione Matter</span></td>
</tr>
</tbody>
</table>
</div>

**La nostra scelta per iniziare: Zigbee**, con una chiavetta coordinatrice collegata a Home Assistant. Il catalogo è ampio, i sensori costano poco e durano a lungo con le pile, e tutto resta in locale. Confronto delle chiavette: [miglior chiavetta Zigbee per Home Assistant](/it/domotica/miglior-chiavetta-zigbee-home-assistant/). Per ordinare: <a href="/go/az-it-6673efde6d/" rel="sponsored nofollow noopener">ricerca SONOFF ZBDongle-E su Amazon.it</a> (verificate versione e prezzo del giorno).

## Wi-Fi: il più semplice, non il più sobrio {#wifi}

Un dispositivo Wi-Fi si collega direttamente al router: nessun gateway da acquistare. Va bene per una [presa smart](/it/domotica/prese-smart/) o una telecamera, sempre collegate alla rete. Il Wi-Fi però consuma troppo per un piccolo sensore a batteria, e ogni apparecchio occupa un posto sulla rete del router. Molti prodotti Wi-Fi entry-level passano dal cloud del produttore: verificate che esista un’integrazione **locale** prima dell’acquisto.

## Zigbee: lo standard dei sensori {#zigbee}

Zigbee usa la radio IEEE 802.15.4 a 2,4 GHz. I dispositivi a rete (prese, lampadine) **inoltro** i messaggi: più ne aggiungete, più la rete copre distanze maggiori. Serve un **coordinatore**, di solito una chiavetta USB; Home Assistant lo gestisce con ZHA o Zigbee2MQTT. Dettagli in [Zigbee2MQTT o ZHA](/it/domotica/zigbee2mqtt-o-zha-home-assistant/). Esempio: il [sensore di temperatura Zigbee](/it/domotica/sensore-temperatura-zigbee/) può durare mesi con una piletta.

Attenzione: Zigbee e Wi-Fi condividono i 2,4 GHz. Allontanate la chiavetta dal router con una prolunga USB e separate i canali.

## Z-Wave: robusto, catalogo più stretto {#zwave}

Z-Wave trasmette intorno a **868,4 MHz** in Europa, lontano dal Wi-Fi, con meno interferenze. Rete mesh e prodotti certificati Z-Wave Alliance. In cambio, meno scelta e prezzi spesso più alti dello Zigbee equivalente. La frequenza cambia per regione (908,4 MHz negli USA): un modulo americano **non** funziona in Italia.

## Thread e Matter: la nuova generazione {#thread}

**Thread** è una mesh a basso consumo su IEEE 802.15.4, con IPv6: ogni dispositivo ha un indirizzo IP. Serve un **border router**; alcuni speaker e router recenti ne integrano uno.

**Matter** non è una radio: è un linguaggio comune (CSA, versione 1.0 da ottobre 2022) sopra Wi-Fi, Thread o Ethernet. Un dispositivo Matter può essere controllato da più ecosistemi (Home Assistant, Apple, Google, Amazon). L’elenco dei tipi supportati cresce a ogni release, ma resta più corto del catalogo Zigbee: controllate la categoria prima di comprare.

## Consiglio in base alla situazione

- **Partite con Home Assistant**: Zigbee per i sensori, Wi-Fi locale per prese e telecamere.
- **Compatibilità con Apple, Google e Amazon insieme**: privilegiate Matter.
- **Casa in cemento, distanze grandi**: Z-Wave o una rete Zigbee con molte prese ripetitore.
- **Volete costruire sensori fai-da-te**: [ESP32 con ESPHome](/it/domotica/esp32-esphome-sensore-temperatura/) usa il Wi-Fi; alcune schede recenti supportano Thread ([quale scheda ESP32](/it/domotica/quale-scheda-esp32-domotica/)).

Per il resto del percorso: [domotica per principianti](/it/domotica/come-iniziare/), la [matrice compatibilità HA / Homey](/it/domotica/matrice-compatibilita-home-assistant-homey-zigbee-matter/) e [Home Assistant, Jeedom, Homey o box commerciali](/it/domotica/home-assistant-jeedom-homey-quale-sistema/).

## FAQ {#faq}

### Meglio Zigbee o Matter per chi inizia con Home Assistant?

Zigbee per sensori a batteria e mesh collaudata; Matter quando volete lo stesso dispositivo anche su Apple Home o Google Home senza dongle extra.

### Serve una chiavetta USB per lo Zigbee?

Sì con Home Assistant su PC o Raspberry Pi: un coordinatore USB (es. ZBDongle-E) oppure un hub tipo Homey che integra già le radio.

### Il Wi-Fi 2,4 GHz interferisce con lo Zigbee?

Spesso sì: usate una prolunga USB e separate i canali Wi-Fi e Zigbee sul router.

[Tutte le guide](/it/domotica/)
